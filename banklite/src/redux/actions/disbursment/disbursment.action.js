import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
import { history } from './../../../_helpers/history';
import {disbursmentConstants} from '../../actiontypes/disbursment/disbursment.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const disbursementActions = {
    getDisbursement,
    getPendingApprovalDisbursement,
    getPendingReviewDisbursement,
    getDisbursementBanks,
    postDisbursement,
    getInwardsNIP,
    getOutwardsNIP,
    exportInwardsNIP,
    exportOutwardsNIP,
    confirmPostDisbursement,
    approveOrRejectPostDisbursement,
    approveOrRejectReviewedDisbursement,
    rejectPostDisbursement,
    getDisbursementByRef,
    postNewDisbursementBatch,
    getADisbursementBatch,
    performActionOnDisbursementBatch,
    getInitiatedDisbursements,
    deleteADisbursement
}

function getDisbursement  (payload, type, tempData){
    
    return dispatch =>{
        let url;
            if(type!==true){
                // console.log('----',payload);
                url = routes.HIT_DISBURSEMENT+`?${payload}`;
            }
            if(type===true){
                url = routes.HIT_DISBURSEMENT+`/pendingapproval?${payload}`;   
            }

            // url = routes.HIT_DISBURSEMENT+`/pendingapproval?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}`;

        let consume = ApiService.request(url, "GET", null);
        dispatch(request(consume, tempData));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: disbursmentConstants.GET_DISBURSMENTS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: disbursmentConstants.GET_DISBURSMENTS_PENDING, user, tempData } 
        }
    }
    

    // function request(user) { return { type: disbursmentConstants.GET_DISBURSMENTS_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.GET_DISBURSMENTS_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.GET_DISBURSMENTS_FAILURE, error } }

}

function getPendingApprovalDisbursement  (payload, type, tempData){
    
    return dispatch =>{
        let 
            url = routes.HIT_DISBURSEMENT+`/pendingapproval?${payload}`;  

            // url = routes.HIT_DISBURSEMENT+`/pendingapproval?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}`;

        let consume = ApiService.request(url, "GET", null);
        dispatch(request(consume, tempData));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: disbursmentConstants.GET_PENDING_APPROVAL_DISBURSMENTS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: disbursmentConstants.GET_PENDING_APPROVAL_DISBURSMENTS_PENDING, user, tempData } 
        }
    }
    

    // function request(user) { return { type: disbursmentConstants.GET_PENDING_APPROVAL_DISBURSMENTS_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.GET_PENDING_APPROVAL_DISBURSMENTS_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.GET_PENDING_APPROVAL_DISBURSMENTS_FAILURE, error } }

}

function getInwardsNIP  (payload, tempData){
    
    return dispatch =>{
        let 
            url = routes.HIT_NIP+`/inwardrequests?${payload}`;  

            // url = routes.HIT_DISBURSEMENT+`/pendingapproval?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}`;

        let consume = ApiService.request(url, "GET", null);
        dispatch(request(consume, tempData));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: disbursmentConstants.GET_NIP_INWARDS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: disbursmentConstants.GET_NIP_INWARDS_PENDING, user, tempData } 
        }
    }
    

    // function request(user) { return { type: disbursmentConstants.GET_NIP_INWARDS_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.GET_NIP_INWARDS_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.GET_NIP_INWARDS_FAILURE, error } }

}

function exportInwardsNIP  (payload, tempData){
    
    return dispatch =>{
        let 
            url = routes.HIT_NIP+`/inwardrequestsexport?${payload}`;  

            
        let consume = ApiService.request(url, "GET", '','','', "blob");
        // let consume = ApiService.request(url, "GET", null);
        dispatch(request(consume, tempData));
        return consume
            .then(response =>{
                    
                let disposition = response.headers['content-disposition'],
                filename;
                
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    var matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) { 
                    filename = matches[1].replace(/['"]/g, '');
                    }
                }
                
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                if(filename === undefined){
                    link.setAttribute('download', 'NIP-INWARDS.xlsx');
                }

                if(filename !== undefined){
                    link.setAttribute('download', filename);
                }

                
                document.body.appendChild(link);
                link.click();
                link.remove();
                
                dispatch(success(response));
            }).catch(error =>{
            
                dispatch(failure(handleRequestErrors(error)));
            });
            
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: disbursmentConstants.EXPORT_NIP_INWARDS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: disbursmentConstants.EXPORT_NIP_INWARDS_PENDING, user, tempData } 
        }
    }
    

    // function request(user) { return { type: disbursmentConstants.EXPORT_NIP_INWARDS_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.EXPORT_NIP_INWARDS_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.EXPORT_NIP_INWARDS_FAILURE, error } }

}

function getOutwardsNIP  (payload, tempData){
    
    return dispatch =>{
        let 
            url = routes.HIT_NIP+`/outwardrequests?${payload}`;  

            // url = routes.HIT_DISBURSEMENT+`/pendingapproval?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}`;

        let consume = ApiService.request(url, "GET", null);
        dispatch(request(consume, tempData));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: disbursmentConstants.GET_NIP_OUTWARDS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: disbursmentConstants.GET_NIP_OUTWARDS_PENDING, user, tempData } 
        }
    }
    

    // function request(user) { return { type: disbursmentConstants.GET_NIP_OUTWARDS_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.GET_NIP_OUTWARDS_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.GET_NIP_OUTWARDS_FAILURE, error } }

}

function exportOutwardsNIP  (payload, tempData){
    
    return dispatch =>{
        let 
            url = routes.HIT_NIP+`/outwardrequestsexport?${payload}`;  

            

            let consume = ApiService.request(url, "GET", '','','', "blob");
        dispatch(request(consume, tempData));
        return consume
            .then(response =>{
                    
                let disposition = response.headers['content-disposition'],
                filename;
                
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    var matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) { 
                    filename = matches[1].replace(/['"]/g, '');
                    }
                }
                
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                if(filename === undefined){
                    link.setAttribute('download', 'NIP-OUTWARDS.xlsx');
                }

                if(filename !== undefined){
                    link.setAttribute('download', filename);
                }

                
                document.body.appendChild(link);
                link.click();
                link.remove();
                // console.log("shkddsd")
                dispatch(success(response));
            }).catch(error =>{
            
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: disbursmentConstants.EXPORT_NIP_OUTWARDS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: disbursmentConstants.EXPORT_NIP_OUTWARDS_PENDING, user, tempData } 
        }
    }
    

    // function request(user) { return { type: disbursmentConstants.EXPORT_NIP_OUTWARDS_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.EXPORT_NIP_OUTWARDS_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.EXPORT_NIP_OUTWARDS_FAILURE, error } }

}

function getPendingReviewDisbursement  (payload, type, tempData){
    
    return dispatch =>{
        let 
            url = routes.HIT_DISBURSEMENT+`/pendingreview?${payload}`;  

            // url = routes.HIT_DISBURSEMENT+`/pendingapproval?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}`;

        let consume = ApiService.request(url, "GET", null);
        dispatch(request(consume, tempData));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: disbursmentConstants.GET_PENDING_REVIEW_DISBURSMENTS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: disbursmentConstants.GET_PENDING_REVIEW_DISBURSMENTS_PENDING, user, tempData } 
        }
    }
    

    // function request(user) { return { type: disbursmentConstants.GET_PENDING_REVIEW_DISBURSMENTS_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.GET_PENDING_REVIEW_DISBURSMENTS_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.GET_PENDING_REVIEW_DISBURSMENTS_FAILURE, error } }

}

function getInitiatedDisbursements  (payload, type, tempData){
    
    return dispatch =>{
        let 
            url = routes.HIT_DISBURSEMENT+`/initiatedbatch?${payload}`;  

            // url = routes.HIT_DISBURSEMENT+`/pendingapproval?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}`;

        let consume = ApiService.request(url, "GET", null);
        dispatch(request(consume, tempData));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: disbursmentConstants.GET_INITIATED_BATCHES_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: disbursmentConstants.GET_INITIATED_BATCHES_PENDING, user, tempData } 
        }
    }
    

    // function request(user) { return { type: disbursmentConstants.GET_INITIATED_BATCHES_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.GET_INITIATED_BATCHES_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.GET_INITIATED_BATCHES_FAILURE, error } }

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

function postNewDisbursementBatch   (newDisbursmentBatch){
    if(newDisbursmentBatch!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_DISBURSEMENT, "POST", newDisbursmentBatch);
            dispatch(request(consume));
            return consume
                .then(response => {
                    dispatch(success(response));
                    // getADisbursementBatch(response.data.batchReference)
                    history.push(`/disbursements/batch/${response.data.batchReference}`)

                    

                }).catch(error => {
                    // console.log('error is', error)
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: disbursmentConstants.NEW_DISBURSMENT_BATCH_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.NEW_DISBURSMENT_BATCH_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.NEW_DISBURSMENT_BATCH_FAILURE, error } }
    function clear() { return { type: disbursmentConstants.NEW_DISBURSMENT_BATCH_RESET, clear_data:""} }

}

function performActionOnDisbursementBatch   (disbursmentBatchActionPayload, action){
    if(disbursmentBatchActionPayload!=="CLEAR"){
        return dispatch =>{
            let url;
            if(action==="validate"){
                url = `${routes.HIT_DISBURSEMENT}/validatebatchaccount`
            }
            if(action==="confirm"){
                url = `${routes.HIT_DISBURSEMENT}/confirm`
            }
            if(action==="approvereview"){
                url = `${routes.HIT_DISBURSEMENT}/approvereview`
            }
            if(action==="rejectreview"){
                url = `${routes.HIT_DISBURSEMENT}/rejectreview`
            }
            if(action==="approve"){
                url = `${routes.HIT_DISBURSEMENT}/approve`
            }
            if(action==="reject"){
                url = `${routes.HIT_DISBURSEMENT}/reject`
            }
            // console.log("payload", disbursmentBatchActionPayload)
            let consume = ApiService.request(url, "POST", disbursmentBatchActionPayload);
            dispatch(request(consume));
            return consume
                .then(response => {
                    dispatch(success(response));
                   

                    

                }).catch(error => {
                   
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_FAILURE, error } }
    function clear() { return { type: disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_RESET, clear_data:""} }

}

function getADisbursementBatch   (batchReference){
    if(batchReference!=="CLEAR"){
        return dispatch =>{
            let consume2 = ApiService.request(`${routes.HIT_DISBURSEMENT}/getdisbursmentbatchitem/${batchReference}`, "GET", null);
                    dispatch(request(consume2));
                    return consume2
                        .then(response2 => {
                            dispatch(success(response2));
                            
                        }).catch(error => {
                            dispatch(failure(handleRequestErrors(error)));
                        });
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: disbursmentConstants.GET_A_DISBURSMENT_BATCH_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.GET_A_DISBURSMENT_BATCH_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.GET_A_DISBURSMENT_BATCH_FAILURE, error } }
    function clear() { return { type: disbursmentConstants.GET_A_DISBURSMENT_BATCH_RESET, clear_data:""} }

}

function deleteADisbursement   (deleteBatchPayload){
    if(deleteBatchPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_DISBURSEMENT+'/cancelbatch', "POST", deleteBatchPayload);
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

    function request(user) { return { type: disbursmentConstants.DELETE_A_BATCH_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.DELETE_A_BATCH_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.DELETE_A_BATCH_FAILURE, error } }
    function clear() { return { type: disbursmentConstants.DELETE_A_BATCH_RESET, clear_data:""} }

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



function approveOrRejectPostDisbursement   (actionDisbursmentPayload){
    if(actionDisbursmentPayload!=="CLEAR"){
        return dispatch =>{
            let url;

            if(actionDisbursmentPayload.actionToPerform==="approve"){
                url = routes.HIT_DISBURSEMENT+'/approve';
            }
            if(actionDisbursmentPayload.actionToPerform==="reject"){
                url = routes.HIT_DISBURSEMENT+'/reject';
            }
            delete actionDisbursmentPayload.actionToPerform
            let consume = ApiService.request(url, "POST", actionDisbursmentPayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    if(response.status===200){
                        dispatch(success(response));
                    }else{
                        dispatch(failure(handleRequestErrors("Unable to complete action")));
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

    function request(user) { return { type: disbursmentConstants.APPROVE_OR_REJECT_DISBURSMENT_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.APPROVE_OR_REJECT_DISBURSMENT_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.APPROVE_OR_REJECT_DISBURSMENT_FAILURE, error } }
    function clear() { return { type: disbursmentConstants.APPROVE_OR_REJECT_DISBURSMENT_RESET, clear_data:""} }

}

function approveOrRejectReviewedDisbursement   (actionDisbursmentPayload){
    if(actionDisbursmentPayload!=="CLEAR"){
        return dispatch =>{
            let url;

            if(actionDisbursmentPayload.actionToPerform==="approve"){
                url = routes.HIT_DISBURSEMENT+'/approvereview';
            }
            if(actionDisbursmentPayload.actionToPerform==="reject"){
                url = routes.HIT_DISBURSEMENT+'/rejectreview';
            }
            delete actionDisbursmentPayload.actionToPerform
            let consume = ApiService.request(url, "POST", actionDisbursmentPayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    if(response.status===200){
                        dispatch(success(response));
                    }else{
                        dispatch(failure(handleRequestErrors("Unable to complete action")));
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

    function request(user) { return { type: disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_PENDING, user } }
    function success(response) { return { type: disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_SUCCESS, response } }
    function failure(error) { return { type: disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_FAILURE, error } }
    function clear() { return { type: disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_RESET, clear_data:""} }

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
            let consume = ApiService.request(routes.HIT_DISBURSEMENT+`/${disbursmentReference}`, "GET", null);
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


