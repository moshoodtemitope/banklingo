import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {loanAndDepositsConstants} from '../../actiontypes/LoanAndDeposits/loananddeposits.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const depositActions = {
    getDeposits,
    getClientDeposits,
    getDepositTransaction,
    getAccountDepositTransaction
}

function getDeposits(params) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_DEPOSITS + `?${params}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }


    function request(user) { return { type: loanAndDepositsConstants.GET_DEPOSITS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_DEPOSITS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_DEPOSITS_FAILURE, error } }

}

function getClientDeposits(clientId,params) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_DEPOSITS + `/client/${clientId}?${params}`, "GET", null);
        dispatch(request(consume));
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


    function request(user) { return { type: loanAndDepositsConstants.GET_CLIENTDEPOSITS_PENDING, user } }
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

function getAccountDepositTransaction(params) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_DEPOSITS_TRANSACTIONS + `/account/${params.accountEncodedKey}?${params}`, "GET", null);
        dispatch(request(consume));
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


    function request(user) { return { type: loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_FAILURE, error } }

}