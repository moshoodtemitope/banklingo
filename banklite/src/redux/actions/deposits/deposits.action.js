import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {loanAndDepositsConstants} from '../../actiontypes/LoanAndDeposits/loananddeposits.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const depositActions = {
    getDeposits,
    getClientDeposits,
    getDepositTransaction,
    getAccountDepositTransaction,
    createDepositAccount
}

function getDeposits(params , tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_DEPOSITS + `?${params}`, "GET", null);
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
            return { type: loanAndDepositsConstants.GET_DEPOSITS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET_DEPOSITS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET_DEPOSITS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_DEPOSITS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_DEPOSITS_FAILURE, error } }

}

function getClientDeposits(clientId,params, tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_DEPOSITS + `/client/${clientId}?${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                if(response.status===200){
                    dispatch(success(response));
                }else{
                    dispatch(failure(handleRequestErrors("Unable to get the requested Deposit client")));
                }
                
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.GET_CLIENTDEPOSITS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.GET_CLIENTDEPOSITS_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: loanAndDepositsConstants.GET_CLIENTDEPOSITS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_CLIENTDEPOSITS_FAILURE, error } }

}

function getDepositTransaction(params) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_DEPOSITS_TRANSACTIONS +`?${params}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }


    function request(user) { return { type: loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_FAILURE, error } }

}

function getAccountDepositTransaction(accountEncodedKey,params, tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_DEPOSITS_TRANSACTIONS + `/account/${accountEncodedKey}?${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                if(response.status===200){
                    dispatch(success(response));
                }else{
                    dispatch(failure(handleRequestErrors("Unable to get the requested Deposit Account Transactions")));
                }
                
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_PENDING, user, tempData } 
        }
    }


    function request(user) { return { type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_FAILURE, error } }

}

function createDepositAccount(depositAccountDetailsPayload,accountType) {
    if(depositAccountDetailsPayload!=="CLEAR"){
        return dispatch => {

            let consume = ApiService.request(routes.HIT_DEPOSITS + `/${accountType}`, "POST", depositAccountDetailsPayload);
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
    


    function request(user) { return { type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_FAILURE, error } }
    function clear() { return { type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_RESET, clear_data:""} }
}