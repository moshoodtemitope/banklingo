import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {accountingConstants} from '../../actiontypes/accounting/accounting.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const acoountingActions = {
    getGLAccounts,
    createGLAccount,
    updateGLAccount,
    getAllGLAccounts,
}

function getGLAccounts  (payload){
    
    return dispatch =>{
        let url;
            // if(id===undefined){
            //     url = routes.GET_GLACCOUNTS;
            // }else{
                
            // }

            url = routes.HIT_GLACCOUNTS+`?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}`;

        let consume = ApiService.request(url, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

    function request(user) { return { type: accountingConstants.GET_GLACCOUNTS_PENDING, user } }
    function success(response) { return { type: accountingConstants.GET_GLACCOUNTS_SUCCESS, response } }
    function failure(error) { return { type: accountingConstants.GET_GLACCOUNTS_FAILURE, error } }

}

function getAllGLAccounts  (){
    
    return dispatch =>{
        let url;
            // if(id===undefined){
            //     url = routes.GET_GLACCOUNTS;
            // }else{
                
            // }

            url = routes.ALL_GLACCOUNTS;

        let consume = ApiService.request(url, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

    function request(user) { return { type: accountingConstants.GET_ALL_GLACCOUNTS_PENDING, user } }
    function success(response) { return { type: accountingConstants.GET_ALL_GLACCOUNTS_SUCCESS, response } }
    function failure(error) { return { type: accountingConstants.GET_ALL_GLACCOUNTS_FAILURE, error } }

}


function createGLAccount   (createGLPayload){
    if(createGLPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.CREATE_GLACCOUNT, "POST", createGLPayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    // console.log('error is', error)
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: accountingConstants.CREATE_GLACCOUNTS_PENDING, user } }
    function success(response) { return { type: accountingConstants.CREATE_GLACCOUNTS_SUCCESS, response } }
    function failure(error) { return { type: accountingConstants.CREATE_GLACCOUNTS_FAILURE, error } }
    function clear() { return { type: accountingConstants.CREATE_GLACCOUNTS_RESET, clear_data:""} }

}

function updateGLAccount   (updateGLPayload){
    if(updateGLPayload!=="CLEAR"){
        return dispatch =>{
            let {idToUpdate} = updateGLPayload;
            delete updateGLPayload.idToUpdate;
            let consume = ApiService.request(routes.HIT_GLACCOUNTS+`/${idToUpdate}`, "POST", updateGLPayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    // console.log('error is', error)
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: accountingConstants.UPDATE_GLACCOUNTS_PENDING, user } }
    function success(response) { return { type: accountingConstants.UPDATE_GLACCOUNTS_SUCCESS, response } }
    function failure(error) { return { type: accountingConstants.UPDATE_GLACCOUNTS_FAILURE, error } }
    function clear() { return { type: accountingConstants.UPDATE_GLACCOUNTS_RESET, clear_data:""} }

}



