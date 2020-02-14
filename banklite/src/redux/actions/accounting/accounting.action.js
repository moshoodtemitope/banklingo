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
    getJournalEntries,
    createJournalEntry,
}

function getGLAccounts  (payload, tempData){
    
    return dispatch =>{
        let url;
            // if(id===undefined){
            //     url = routes.GET_GLACCOUNTS;
            // }else{
                
            // }

            url = routes.HIT_GLACCOUNTS+`?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}&AccountTypeId=${payload.AccountTypeId}`;

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
            return { type: accountingConstants.GET_GLACCOUNTS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: accountingConstants.GET_GLACCOUNTS_PENDING, user, tempData } 
        }
    }
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

function getJournalEntries  (payload, tempData){
    
    return dispatch =>{
        let url;
            // if(id===undefined){
            //     url = routes.GET_GLACCOUNTS;
            // }else{
                
            // }

            url = routes.JOURNAL_ENTRIES+`?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}`;

        let consume = ApiService.request(url, "GET", null);
        dispatch(request(consume, tempData));
        return consume
            .then(response =>{
                let consume2 = ApiService.request(routes.ALL_GLACCOUNTS, "GET", null);
                    dispatch(request(consume2, tempData));
                    return consume2
                        .then(response2 =>{
                            let consume3 = ApiService.request(routes.GET_BRANCHES+`/all`, "GET", null);
                            dispatch(request(consume3, tempData));
                            return consume3
                                .then(response3 =>{
                                    dispatch(success(response,response2, response3));
                                })
                                .catch(error =>{
                        
                                    dispatch(failure(handleRequestErrors(error)));
                                });
                        })
                        .catch(error =>{
                        
                            dispatch(failure(handleRequestErrors(error)));
                        });
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: accountingConstants.GET_JOURNAL_ENTRY_PENDING, user }
        }

        if(tempData!==undefined){
            return { type: accountingConstants.GET_JOURNAL_ENTRY_PENDING, user, tempData }
        }

         
    }
    function success(response,response2, response3) { return { type: accountingConstants.GET_JOURNAL_ENTRY_SUCCESS, response,response2, response3 } }
    function failure(error) { return { type: accountingConstants.GET_JOURNAL_ENTRY_FAILURE, error } }

}

function createJournalEntry   (createJournalEntryPayload){
    if(createJournalEntryPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.JOURNAL_ENTRIES, "POST", createJournalEntryPayload);
            // console.log('payload is',createJournalEntryPayload )
            // if(createJournalEntryPayload.jornalEntryModel.glAccountId!==''
            //     && createJournalEntryPayload.jornalEntryModel.amount!==null
            //     && createJournalEntryPayload.jornalEntryModel.journalEntryType!==''
            //     && createJournalEntryPayload.jornalEntryModel.branchId!==''
            //     && createJournalEntryPayload.jornalEntryModel.bookingDate!==''){
                
            //         console.log('payload is',createJournalEntryPayload )
                dispatch(request(consume));
                return consume
                    .then(response =>{
                        dispatch(success(response));
                    }).catch(error =>{
                        dispatch(failure(handleRequestErrors(error)));
                    });
            // }else{
            //     dispatch(failure(handleRequestErrors('Please provide all details')));
            // }
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: accountingConstants.CREATE_JOURNAL_ENTRY_PENDING, user } }
    function success(response) { return { type: accountingConstants.CREATE_JOURNAL_ENTRY_SUCCESS, response } }
    function failure(error) { return { type: accountingConstants.CREATE_JOURNAL_ENTRY_FAILURE, error } }
    function clear() { return { type: accountingConstants.CREATE_JOURNAL_ENTRY_RESET, clear_data:""} }

}


