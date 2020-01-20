import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
import { history } from './../../../_helpers/history';
import {authConstants} from '../../actiontypes/auth/auth.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const authActions = {
    Login,
    Logout,
    initStore
}



function Login   (loginPayload){
    if(loginPayload!=="CLEAR"){
        let userData;
        return dispatch =>{
            let consume = ApiService.request(routes.LOGIN_USER, "POST", loginPayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    if(response.data.token!==undefined){
                        localStorage.setItem('user', JSON.stringify(response.data));
                        userData = response.data;
                        let consume2 = ApiService.request(routes.ADD_BRANCH+'/allowedbranches', "GET", null);
                        dispatch(request(consume2));

                        return consume2
                        .then(response2 =>{
                            // localStorage.setItem('user', JSON.stringify(response.data));
                            let user = JSON.parse(localStorage.getItem("user"));
                                user.AllowedBranches = response2.data;
                                user.BranchId = response2.data[0].id;
                                user.BranchName = response2.data[0].name;
                                localStorage.setItem('user', JSON.stringify(user));
                        
                            dispatch(success(response2.data));
                            history.push('/dashboard');
                        })
                        .catch(error =>{
                            
                            if(error.response.status===401){
                                dispatch(failure(handleRequestErrors("Unable to login. Please try again")))
                            }else{
                                dispatch(failure(handleRequestErrors(error)));
                            }
                            
                            
                        });

                        
                    }
                    // else{
                    //     localStorage.setItem('user', JSON.stringify(response.data));
                       
                    //     dispatch(success(response.data));
                    //     history.push('/dashboard');
                    //     // dispatch(failure(handleRequestErrors(response.data.message)))
                    // }
                    
                    
                }).catch(error =>{
                    // console.log('error is', error)
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: authConstants.LOGIN_USER_PENDING, user } }
    function success(response) { return { type: authConstants.LOGIN_USER_SUCCESS, response } }
    function failure(error) { return { type: authConstants.LOGIN_USER_FAILURE, error } }
    function clear() { return { type: authConstants.LOGIN_USER_RESET, clear_data:""} }

}


function Logout(type) {
    // userService.logout();
    //console.error("We are logging you out...");
    localStorage.clear();
    history.push('/');
    // window.location.reload();
    return (dispatch) => {
        dispatch(logout());
    }

    function logout() { return { type: authConstants.LOGOUT } }
}

function initStore() {
    localStorage.clear();
    return (dispatch) => {
        dispatch(logout());
    }
    function logout() { return { type: authConstants.LOGOUT } }
}


