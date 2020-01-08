import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {loanAndDepositsConstants} from '../../actiontypes/LoanAndDeposits/loananddeposits.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const loanActions = {
    getLoans,
    getClientLoans,
    getLoanTransactions,
    getAccountLoanTransaction
}

function getLoans(params) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN +`?${params}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }


    function request(user) { return { type: loanAndDepositsConstants.GET_LOANS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_LOANS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_LOANS_FAILURE, error } }

}

function getClientLoans(params) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN + `/client/${params.clientId}?${params}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }


    function request(user) { return { type: loanAndDepositsConstants.GET_CLIENTLOANS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_CLIENTLOANS_FAILURE, error } }

}

function getLoanTransactions(params) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN_TRANSACTIONS +`?${params}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }


    function request(user) { return { type: loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_FAILURE, error } }

}

function getAccountLoanTransaction(params) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_LOAN_TRANSACTIONS + `/account/${params.accountEncodedKey}?${params}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }


    function request(user) { return { type: loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_PENDING, user } }
    function success(response) { return { type: loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_SUCCESS, response } }
    function failure(error) { return { type: loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_FAILURE, error } }

}