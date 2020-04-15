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

export function createDepositAccountReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_PENDING:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_FAILURE:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_RESET:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}


export function getAClientDepositAccountReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_DETAILS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_DETAILS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_DETAILS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_DETAILS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_DETAILS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_DETAILS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getADepositAccountActivitiesReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getADepositAccountCommunicationsReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getAClientDepositAccountCommentsReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function createADepositCommentReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_PENDING:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_FAILURE:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_RESET:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getADepositAccountAttachmentsReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function createADepositAttachmentReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_PENDING:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_FAILURE:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_RESET:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}




