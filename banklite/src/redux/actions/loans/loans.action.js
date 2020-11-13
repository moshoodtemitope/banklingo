import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {loanAndDepositsConstants} from '../../actiontypes/LoanAndDeposits/loananddeposits.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const loanActions = {
    getLoans,
    getClientLoans,
    getPendingLoans,
    getApprovedLoans,
    getRejectedLoans,
    getActiveLoans,
    getLoansInArrears,
    getClosedLoans,
    getClosedWrittenOffLoans,
    getClosedWithdrawnLoans,
    getLoanTransactions,
    exportLoanTransactions,
    exportLoansAccounts,
    getAccountLoanTransaction,
    createLoanAccount,
    getLoanSchedulePreview,
    getAClientLoanAccount,
    getAccountLoanschedule,
    getAccountLoansComments,
    creatALoanComment,
    getALoanActivities,
    getAccountLoanAttachments,
    creatALoanAttachment,
    getALoanCommunications,
    changeLoanState
}

function getLoans(params,tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN +`?${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET_LOANS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET_LOANS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET_LOANS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_LOANS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_LOANS_FAILURE, error } }

}

function getPendingLoans(params,tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN +`?${params}&LoanState=2`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET__PENDING_LOANS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET__PENDING_LOANS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET__PENDING_LOANS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET__PENDING_LOANS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET__PENDING_LOANS_FAILURE, error } }

}

function getApprovedLoans(params,tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN +`?${params}&LoanState=3`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET__APPROVED_LOANS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET__APPROVED_LOANS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET__APPROVED_LOANS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET__APPROVED_LOANS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET__APPROVED_LOANS_FAILURE, error } }

}

function getRejectedLoans(params,tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN +`?${params}&LoanState=4`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET__REJECTED_LOANS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET__REJECTED_LOANS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET__REJECTED_LOANS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET__REJECTED_LOANS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET__REJECTED_LOANS_FAILURE, error } }

}

function getActiveLoans(params,tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN +`?${params}&LoanState=5`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET__ACTIVE_LOANS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET__ACTIVE_LOANS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET__ACTIVE_LOANS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET__ACTIVE_LOANS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET__ACTIVE_LOANS_FAILURE, error } }

}

function getLoansInArrears(params,tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN +`?${params}&LoanState=6`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET__ARREARS_LOANS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET__ARREARS_LOANS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET__ARREARS_LOANS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET__ARREARS_LOANS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET__ARREARS_LOANS_FAILURE, error } }

}

function getClosedLoans(params,tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN +`?${params}&LoanState=7`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET__CLOSED_LOANS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET__CLOSED_LOANS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET__CLOSED_LOANS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET__CLOSED_LOANS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET__CLOSED_LOANS_FAILURE, error } }

}

function getClosedWrittenOffLoans(params,tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN +`?${params}&LoanState=8`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET__CLOSEDWRITTENOFF_LOANS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET__CLOSEDWRITTENOFF_LOANS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET__CLOSEDWRITTENOFF_LOANS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET__CLOSEDWRITTENOFF_LOANS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET__CLOSEDWRITTENOFF_LOANS_FAILURE, error } }

}

function getClosedWithdrawnLoans(params,tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN +`?${params}&LoanState=9`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET__CLOSEDWITHDRAWN_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET__CLOSEDWITHDRAWN_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET__CLOSEDWITHDRAWN_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET__CLOSEDWITHDRAWN_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET__CLOSEDWITHDRAWN_FAILURE, error } }

}


function getClientLoans(clientId,params,tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN + `/client/${clientId}?${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET_CLIENTLOANS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET_CLIENTLOANS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET_CLIENTLOANS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_CLIENTLOANS_FAILURE, error } }

}

function getLoanTransactions(params, tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN_TRANSACTIONS +`?${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_FAILURE, error } }

}

function exportLoanTransactions(params, tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN_TRANSACTIONS +`/loantransactionsexport?${params}`, "GET", '','','', "blob");
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
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
                    link.setAttribute('download', 'loan-transactions.xlsx');
                }

                if(filename !== undefined){
                    link.setAttribute('download', filename);
                }

                
                document.body.appendChild(link);
                link.click();
                link.remove();
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.EXPORT_LOAN_TRANSACTIONS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.EXPORT_LOAN_TRANSACTIONS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.EXPORT_LOAN_TRANSACTIONS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.EXPORT_LOAN_TRANSACTIONS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.EXPORT_LOAN_TRANSACTIONS_FAILURE, error } }

}

function exportLoansAccounts(params, tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN +`/loanexport?${params}`, "GET", '','','', "blob");
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
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
                    link.setAttribute('download', 'loan-accounts.xlsx');
                }

                if(filename !== undefined){
                    link.setAttribute('download', filename);
                }

                
                document.body.appendChild(link);
                link.click();
                link.remove();
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.EXPORT_LOAN_ACCOUNTS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.EXPORT_LOAN_ACCOUNTS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.EXPORT_LOAN_ACCOUNTS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.EXPORT_LOAN_ACCOUNTS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.EXPORT_LOAN_ACCOUNTS_FAILURE, error } }

}

function getAccountLoanTransaction(accountEncodedKey,params,tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN_TRANSACTIONS + `/account/${accountEncodedKey}?${params}`, "GET", null);
        dispatch(request(consume, tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_FAILURE, error } }

}


function createLoanAccount(loanDetailsPayload,loanType) {
    if(loanDetailsPayload!=="CLEAR"){
        return dispatch => {

            let consume = ApiService.request(routes.HIT_LOAN + `/${loanType}`, "POST", loanDetailsPayload);
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
    


    function request(user) { return { type: loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_FAILURE, error } }
    function clear() { return { type: loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_RESET, clear_data:""} }
}

function getLoanSchedulePreview(params) {
    // console.log("sdsds", params);
    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN + `/previewschedules`, "POST", params);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }



    function request(user) { return { type: loanAndDepositsConstants.PREVIEW_LOAN_SCHEDULE_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.PREVIEW_LOAN_SCHEDULE_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.PREVIEW_LOAN_SCHEDULE_FAILURE, error } }

}

function getAClientLoanAccount(accountEncodedKey) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN + `/${accountEncodedKey}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    


    function request(user) { return { type: loanAndDepositsConstants.GET_A_LOAN_ACCOUNT_DETAILS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_A_LOAN_ACCOUNT_DETAILS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_A_LOAN_ACCOUNT_DETAILS_FAILURE, error } }

}

function getAccountLoanschedule(params,tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN + `/loanschedules?${params}`, "GET", null);
        dispatch(request(consume, tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_FAILURE, error } }

}

function getAccountLoansComments(params,tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN + `/comments?${params}`, "GET", null);
        dispatch(request(consume, tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET_A_LOAN_COMMENTS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET_A_LOAN_COMMENTS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET_A_LOAN_COMMENTS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_A_LOAN_COMMENTS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_A_LOAN_COMMENTS_FAILURE, error } }

}

function creatALoanComment   (creatALoanCommentPayload){
    if(creatALoanCommentPayload!=="CLEAR"){
        return dispatch =>{
            let url = routes.HIT_LOAN+`/addcomment`;
            delete creatALoanCommentPayload.encodedKey;
            let consume = ApiService.request(url, "POST", creatALoanCommentPayload);
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

    function request(user) { return { type: loanAndDepositsConstants.CREATE_A_LOAN_COMMENT_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.CREATE_A_LOAN_COMMENT_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.CREATE_A_LOAN_COMMENT_FAILURE, error } }
    function clear() { return { type: loanAndDepositsConstants.CREATE_A_LOAN_COMMENT_RESET, clear_data:""} }

}


function getALoanActivities  (LoanEncodedKey, params, tempData){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_ACTIVITIES+`/loan/${LoanEncodedKey}?&${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET_A_LOAN_ACTIVITIES_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET_A_LOAN_ACTIVITIES_PENDING, user, tempData } 
        }
    }
        

    // function request(user) { return { type: loanAndDepositsConstants.GET_A_LOAN_ACTIVITIES_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_A_LOAN_ACTIVITIES_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_A_LOAN_ACTIVITIES_FAILURE, error } }

}

function getAccountLoanAttachments(params,tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN + `/attachments?${params}`, "GET", null);
        dispatch(request(consume, tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET_A_LOAN_ATTACHMENTS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET_A_LOAN_ATTACHMENTS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET_A_LOAN_ATTACHMENTS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_A_LOAN_ATTACHMENTS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_A_LOAN_ATTACHMENTS_FAILURE, error } }

}

function creatALoanAttachment   (createLoanAttachmentPayload){
    if(createLoanAttachmentPayload!=="CLEAR"){
        return dispatch =>{
            let url = routes.HIT_LOAN+`/addattachment`;
            delete createLoanAttachmentPayload.encodedKey;
            let consume = ApiService.request(url, "POST", createLoanAttachmentPayload);
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

    function request(user) { return { type: loanAndDepositsConstants.CREATE_A_LOAN_ATTACHMENT_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.CREATE_A_LOAN_ATTACHMENT_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.CREATE_A_LOAN_ATTACHMENT_FAILURE, error } }
    function clear() { return { type: loanAndDepositsConstants.CREATE_A_LOAN_ATTACHMENT_RESET, clear_data:""} }

}

function getALoanCommunications  (AccountEncodedKey, params, tempData){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_LOAN+`/communications?AccountEncodedKey=${AccountEncodedKey}&${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET_A_LOAN_COMMUNICATIONS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET_A_LOAN_COMMUNICATIONS_PENDING, user, tempData } 
        }
    }
        

    // function request(user) { return { type: loanAndDepositsConstants.GET_A_LOAN_COMMUNICATIONS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_A_LOAN_COMMUNICATIONS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_A_LOAN_COMMUNICATIONS_FAILURE, error } }

}


function changeLoanState   (newLoanStatePayload, newState){
    if(newLoanStatePayload!=="CLEAR"){
        return dispatch =>{
            let 
            url = routes.HIT_LOAN_STATE+`/${newState}`,
                
            consume = ApiService.request(url, "POST", newLoanStatePayload);

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

    function request(user) { return { type: loanAndDepositsConstants.CHANGE_LOANSTATE_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.CHANGE_LOANSTATE_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.CHANGE_LOANSTATE_FAILURE, error } }
    function clear() { return { type: loanAndDepositsConstants.CHANGE_LOANSTATE_RESET, clear_data:""} }

}