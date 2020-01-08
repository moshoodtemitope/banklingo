import {loanAndDepositsConstants} from '../../actiontypes/LoanAndDeposits/loananddeposits.constants'

export function getDepositsReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_DEPOSITS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_DEPOSITS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_DEPOSITS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_DEPOSITS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_DEPOSITS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_DEPOSITS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getClientDepositsReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_CLIENTDEPOSITS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_CLIENTDEPOSITS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_CLIENTDEPOSITS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_CLIENTDEPOSITS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getDepositTransactionReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}


export function getAccountDepositTransactionReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}







