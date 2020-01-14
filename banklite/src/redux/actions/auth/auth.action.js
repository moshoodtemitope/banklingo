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
        return dispatch =>{
            let consume = ApiService.request(routes.LOGIN_USER, "POST", loginPayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    console.log("++++",response.data);
                    if(response.data.token!==undefined){
                        localStorage.setItem('user', JSON.stringify(response.data));
                        history.push('/dashboard');
                        dispatch(success(response.data));
                    }else{
                        localStorage.setItem('user', JSON.stringify(response.data));
                        history.push('/dashboard');
                        dispatch(success(response.data));
                        // dispatch(failure(handleRequestErrors(response.data.message)))
                    }
                    
                    
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


