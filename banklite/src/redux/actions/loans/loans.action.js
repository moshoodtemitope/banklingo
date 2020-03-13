import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {loanAndDepositsConstants} from '../../actiontypes/LoanAndDeposits/loananddeposits.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const loanActions = {
    getLoans,
    getClientLoans,
    getLoanTransactions,
    getAccountLoanTransaction,
    createLoanAccount
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