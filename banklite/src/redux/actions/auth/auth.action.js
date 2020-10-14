import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
import { history } from './../../../_helpers/history';
import {authConstants} from '../../actiontypes/auth/auth.constants'
import { handleRequestErrors, saveRouteForRedirect, removeRouteForRedirect } from "../../../shared/utils";

export const authActions = {
    Login,
    Logout,
    ResfreshToken,
    initStore,
    ChangePassword,
    ForbiddenAccess
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
                        userData = {...response.data};
                        userData.lastLogForAuth = Date.now();
                        
                        localStorage.setItem('lingoAuth', JSON.stringify(userData));
                        // userData = response.data;
                        let consume2 = ApiService.request(routes.ADD_BRANCH+'/allowedbranches', "GET", null);
                        dispatch(request(consume2));

                        return consume2
                        .then(response2 =>{
                            // localStorage.setItem('lingoAuth', JSON.stringify(response.data));
                            let user = JSON.parse(localStorage.getItem('lingoAuth'));
                                user.AllowedBranches = response2.data;
                                user.BranchId = response2.data[0].id;
                                user.BranchName = response2.data[0].name;
                                localStorage.setItem('lingoAuth', JSON.stringify(user));
                            
                                let consume3 = ApiService.request(routes.HIT_ROLE+'/mypermissions', "GET", null);
                                dispatch(request(consume3));
                                return consume3
                                .then(response3 =>{
                                    // console.log("Permissions are", response3.data);
                                    localStorage.setItem('x-u-perm', JSON.stringify(response3.data));
                                    dispatch(success(response2.data));

                            
                                    if(window.location.href.indexOf('#')>-1){
                                        // if(window.location.href.indexOf('retUrl=')>-1){
                                        // let retUrl = window.location.href.split('retUrl=');
                                        let retUrl = window.location.href.split('#');
                                        
                                        if(retUrl.length===2){
                                            history.push(retUrl[1]);
                                            removeRouteForRedirect();
                                        }
                                    }else{
                                        history.push('/dashboard');
                                    }
                                })
                                .catch(error =>{
                            
                                    if(error.response.status===401){
                                        dispatch(failure(handleRequestErrors("Unable to login. Please try again")))
                                    }else{
                                        dispatch(failure(handleRequestErrors(error)));
                                    }
                                    
                                    
                                });
                                
                            
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
                    //     localStorage.setItem('lingoAuth', JSON.stringify(response.data));
                       
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


function ResfreshToken   (refreshTokenPayload){
    
    if(refreshTokenPayload!=="CLEAR"){
        
        let userData;
        return dispatch =>{
            let consume = ApiService.request(routes.REFRESH_TOKEN, "POST", refreshTokenPayload);
            dispatch(request(consume));
            
            return consume
                .then(response =>{
                    // console.log("response is",response.status);
                    if(response.status===200){
                        if(response.data.token!==undefined){
                            
                            userData = JSON.parse(localStorage.getItem('lingoAuth'));
                            userData.lastLogForAuth = Date.now();
                            userData.statusCode = response.status;
                            userData.token = response.data.token;
                            localStorage.setItem('lingoAuth', JSON.stringify(userData));
                            // let consume2 = ApiService.request(routes.ADD_BRANCH+'/allowedbranches', "GET", null);
                            // dispatch(request(consume2));
                            dispatch(success(userData));
                            // return consume2
                            // .then(response2 =>{
                                
                            //     let user = JSON.parse(localStorage.getItem('lingoAuth');
                            //         user.AllowedBranches = response2.data;
                            //         user.BranchId = response2.data[0].id;
                            //         user.BranchName = response2.data[0].name;
                            //         localStorage.setItem('lingoAuth', JSON.stringify(user));
                            

                                
                                
                                
                            // })
                            // .catch(error =>{
                                
                                
                            // });

                            
                        }
                    }else{
                        let userInfo = JSON.parse(localStorage.getItem('lingoAuth'))
                        userInfo.lastLogForAuth = Date.now();
                        localStorage.setItem('lingoAuth', JSON.stringify(userInfo));
                    }
                    
                    
                }).catch(error =>{
                   this.Logout();
                });
            
        }
        
    }

    // return dispatch =>{
        
    //     dispatch(clear());
        
    // }

    function request(user) { return { type: authConstants.REFRESH_TOKEN_PENDING, user } }
    function success(response) { return { type: authConstants.REFRESH_TOKEN_SUCCESS, response } }
    function failure(error) { return { type: authConstants.REFRESH_TOKEN_FAILURE, error } }
    function clear() { return { type: authConstants.REFRESH_TOKEN_RESET, clear_data:""} }

}

function ChangePassword   (changePasswordPayload){
    if(changePasswordPayload!=="CLEAR"){
        return dispatch =>{
            let url = routes.CHANGE_PASSWORD;
            console.log("hgfghjkljhgfgdh",changePasswordPayload);
            let consume = ApiService.request(url, "POST", changePasswordPayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                    
                }).catch(error =>{
                    
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: authConstants.CHANGE_PASSWORD_PENDING, user } }
    function success(response) { return { type: authConstants.CHANGE_PASSWORD_SUCCESS, response } }
    function failure(error) { return { type: authConstants.CHANGE_PASSWORD_FAILURE, error } }
    function clear() { return { type: authConstants.CHANGE_PASSWORD_RESET, clear_data:""} }

}

function Logout(redirectType,retUrl) {
    
    localStorage.clear();
    // console.log("testwe",retUrl);
    
    if(retUrl!==undefined){
        
        saveRouteForRedirect(redirectType,retUrl);
    }

    history.push('/');
    return (dispatch) => {
        dispatch(logout(redirectType,retUrl));
    }
    
    
    function logout(redirectType,retUrl) { 
        if(retUrl===undefined ||retUrl===null ){
            return { type: authConstants.LOGOUT } 
        }
        if(retUrl!==undefined){
            return { type: authConstants.LOGOUT, retUrl } 
        }
        
    }
}

function ForbiddenAccess(retUrl) {
    
   

    history.push('/forbidden-access');
    // return (dispatch) => {
    //     dispatch(forbidAccess(retUrl));
    // }
    
    
    // function forbidAccess(retUrl) { 
    //     if(retUrl===undefined ||retUrl===null ){
    //         return { type: authConstants.LOGOUT } 
    //     }
    //     if(retUrl!==undefined){
    //         return { type: authConstants.LOGOUT, retUrl } 
    //     }
        
    // }
}

function initStore() {
    localStorage.clear();
    return (dispatch) => {
        dispatch(logout());
    }
    function logout() { return { type: authConstants.LOGOUT } }
}


