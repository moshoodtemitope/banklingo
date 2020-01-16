import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {disbursmentConstants} from '../../actiontypes/disbursment/disbursment.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const disbursementActions = {
    getDisbursement,
    getDisbursementBanks,
    postDisbursement,
    confirmPostDisbursement,
    approvePostDisbursement,
    rejectPostDisbursement,
    getDisbursementByRef
}

function getDisbursement  (payload, type){
    
    return dispatch =>{
        let url;
            if(type===undefined){
                // console.log('----',payload);
                url = routes.HIT_DISBURSEMENT+`?${payload}`;
            }
            if(type===true){
                url = routes.HIT_DISBURSEMENT+`/pendingapproval?${payload}`;   
            }

            // url = routes.HIT_DISBURSEMENT+`/pendingapproval?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}`;

        let consume = ApiService.request(url, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

    function request(user) { return { type: disbursmentConstants.GET_DISBURSMENTS_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.GET_DISBURSMENTS_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.GET_DISBURSMENTS_FAILURE, error } }

}

function getDisbursementBanks  (){
    
    return dispatch =>{
       
        let consume = ApiService.request(routes.HIT_DISBURSEMENT+`/banks`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

    function request(user) { return { type: disbursmentConstants.GET_DISBURSMENTS_BANKS_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.GET_DISBURSMENTS_BANKS_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.GET_DISBURSMENTS_BANKS_FAILURE, error } }

}

function postDisbursement   (postPayload, dataToEdit){
    if(postPayload!=="CLEAR" && postPayload!=="EDIT"){
        // if(postPayload)
        let errorMesage = '';

        for(var param in postPayload){
            if(postPayload[param]==='' || postPayload[param]===null){
                errorMesage = 'All fields are required';
            }
        }

        if(errorMesage===''){
            return dispatch =>{
                let consume = ApiService.request(routes.HIT_DISBURSEMENT, "POST", postPayload);
                dispatch(request(consume));
                return consume
                    .then(response =>{
                        dispatch(success(response));
                    }).catch(error =>{
                        // console.log('error is', error)
                        dispatch(failure(handleRequestErrors(error)));
                    });
                
            }
        }else{
            return dispatch =>{
                return dispatch(failure(handleRequestErrors(errorMesage)));
            }
            
        }
        
    }

    if(postPayload==="CLEAR"){
        return dispatch =>{
        
            dispatch(clear());
            
        }
    }
    if(postPayload==="EDIT" && dataToEdit!==undefined){
        return dispatch =>{
        
            dispatch(edit());
            
        }
    }

    

    function request(user) { return { type: disbursmentConstants.POST_DISBURSMENT_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.POST_DISBURSMENT_SUCCESS, response, postPayload } }
    function failure(error) { return { type: disbursmentConstants.POST_DISBURSMENT_FAILURE, error } }
    function clear() { return { type: disbursmentConstants.POST_DISBURSMENT_RESET, clear_data:""} }
    function edit() { return { type: disbursmentConstants.POST_DISBURSMENT_EDIT, dataToEdit} }

}

function confirmPostDisbursement   (confirmDisbursmentPayload){
    if(confirmDisbursmentPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_DISBURSEMENT+'/confirm', "POST", confirmDisbursmentPayload);
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

    function request(user) { return { type: disbursmentConstants.CONFIRM_DISBURSMENT_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.CONFIRM_DISBURSMENT_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.CONFIRM_DISBURSMENT_FAILURE, error } }
    function clear() { return { type: disbursmentConstants.CONFIRM_DISBURSMENT_RESET, clear_data:""} }

}

function approvePostDisbursement   (approveDisbursmentPayload){
    if(approveDisbursmentPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_DISBURSEMENT+'/approve', "POST", approveDisbursmentPayload);
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

    function request(user) { return { type: disbursmentConstants.APPROVE_DISBURSMENT_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.APPROVE_DISBURSMENT_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.APPROVE_DISBURSMENT_FAILURE, error } }
    function clear() { return { type: disbursmentConstants.APPROVE_DISBURSMENT_RESET, clear_data:""} }

}

function rejectPostDisbursement   (rejectDisbursmentPayload){
    if(rejectDisbursmentPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_DISBURSEMENT+'/reject', "POST", rejectDisbursmentPayload);
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

    function request(user) { return { type: disbursmentConstants.REJECT_DISBURSMENT_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.REJECT_DISBURSMENT_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.REJECT_DISBURSMENT_FAILURE, error } }
    function clear() { return { type: disbursmentConstants.REJECT_DISBURSMENT_RESET, clear_data:""} }

}

function getDisbursementByRef   (disbursmentReference){
    
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_DISBURSEMENT+`/${disbursmentReference}`, "POST", null);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    // console.log('error is', error)
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    


    function request(user) { return { type: disbursmentConstants.GET_A_DISBURSMENT_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.GET_A_DISBURSMENT_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.GET_A_DISBURSMENT_FAILURE, error } }

}


