import {loanAndDepositsConstants} from '../../actiontypes/LoanAndDeposits/loananddeposits.constants'

export function getLoansReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_LOANS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_LOANS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_LOANS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_LOANS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_LOANS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_LOANS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getClientLoansReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_CLIENTLOANS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_CLIENTLOANS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_CLIENTLOANS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_CLIENTLOANS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getLoanTransactionsReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getAccountLoanTransactionReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function createLoanAccountReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_PENDING:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_FAILURE:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_RESET:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}











