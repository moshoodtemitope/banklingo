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

export function getPendingLoansReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET__PENDING_LOANS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET__PENDING_LOANS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET__PENDING_LOANS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET__PENDING_LOANS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET__PENDING_LOANS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET__PENDING_LOANS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getAllLoanSchedulesReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_ALL_LOAN_SCHEDULES_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_ALL_LOAN_SCHEDULES_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_ALL_LOAN_SCHEDULES_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_ALL_LOAN_SCHEDULES_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_ALL_LOAN_SCHEDULES_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_ALL_LOAN_SCHEDULES_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function exportLoansSchedulesReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.EXPORT_ALL_LOAN_SCHEDULES_PENDING:
            return {
                request_status: loanAndDepositsConstants.EXPORT_ALL_LOAN_SCHEDULES_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.EXPORT_ALL_LOAN_SCHEDULES_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.EXPORT_ALL_LOAN_SCHEDULES_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.EXPORT_ALL_LOAN_SCHEDULES_FAILURE:
            return {
                request_status: loanAndDepositsConstants.EXPORT_ALL_LOAN_SCHEDULES_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}


export function getApprovedLoansReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET__APPROVED_LOANS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET__APPROVED_LOANS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET__APPROVED_LOANS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET__APPROVED_LOANS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET__APPROVED_LOANS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET__APPROVED_LOANS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getRejectedLoansReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET__REJECTED_LOANS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET__REJECTED_LOANS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET__REJECTED_LOANS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET__REJECTED_LOANS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET__REJECTED_LOANS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET__REJECTED_LOANS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getActiveLoansReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET__ACTIVE_LOANS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET__ACTIVE_LOANS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET__ACTIVE_LOANS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET__ACTIVE_LOANS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET__ACTIVE_LOANS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET__ACTIVE_LOANS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getLoansInArrearsReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET__ARREARS_LOANS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET__ARREARS_LOANS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET__ARREARS_LOANS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET__ARREARS_LOANS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET__ARREARS_LOANS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET__ARREARS_LOANS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getClosedLoansReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET__CLOSED_LOANS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET__CLOSED_LOANS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET__CLOSED_LOANS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET__CLOSED_LOANS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET__CLOSED_LOANS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET__CLOSED_LOANS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getClosedWrittenOffLoansReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET__CLOSEDWRITTENOFF_LOANS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET__CLOSEDWRITTENOFF_LOANS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET__CLOSEDWRITTENOFF_LOANS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET__CLOSEDWRITTENOFF_LOANS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET__CLOSEDWRITTENOFF_LOANS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET__CLOSEDWRITTENOFF_LOANS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getClosedWithdrawnLoansReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET__CLOSEDWITHDRAWN_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET__CLOSEDWITHDRAWN_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET__CLOSEDWITHDRAWN_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET__CLOSEDWITHDRAWN_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET__CLOSEDWITHDRAWN_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET__CLOSEDWITHDRAWN_FAILURE,
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

export function exportLoanTransactionsReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.EXPORT_LOAN_TRANSACTIONS_PENDING:
            return {
                request_status: loanAndDepositsConstants.EXPORT_LOAN_TRANSACTIONS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.EXPORT_LOAN_TRANSACTIONS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.EXPORT_LOAN_TRANSACTIONS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.EXPORT_LOAN_TRANSACTIONS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.EXPORT_LOAN_TRANSACTIONS_FAILURE,
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

export function getLoanSchedulePreviewReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.PREVIEW_LOAN_SCHEDULE_PENDING:
            return {
                request_status: loanAndDepositsConstants.PREVIEW_LOAN_SCHEDULE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.PREVIEW_LOAN_SCHEDULE_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.PREVIEW_LOAN_SCHEDULE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.PREVIEW_LOAN_SCHEDULE_FAILURE:
            return {
                request_status: loanAndDepositsConstants.PREVIEW_LOAN_SCHEDULE_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getAClientLoanAccountReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_A_LOAN_ACCOUNT_DETAILS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_ACCOUNT_DETAILS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_LOAN_ACCOUNT_DETAILS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_ACCOUNT_DETAILS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_LOAN_ACCOUNT_DETAILS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_ACCOUNT_DETAILS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getAClientLoanAccountScheduleReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getAClientLoanAccountCommentsReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_A_LOAN_COMMENTS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_COMMENTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_LOAN_COMMENTS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_COMMENTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_LOAN_COMMENTS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_COMMENTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function createALoanCommentReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.CREATE_A_LOAN_COMMENT_PENDING:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_LOAN_COMMENT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_LOAN_COMMENT_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_LOAN_COMMENT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_LOAN_COMMENT_FAILURE:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_LOAN_COMMENT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_LOAN_COMMENT_RESET:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_LOAN_COMMENT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getALoanAccountActivitiesReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_A_LOAN_ACTIVITIES_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_ACTIVITIES_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_LOAN_ACTIVITIES_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_ACTIVITIES_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_LOAN_ACTIVITIES_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_ACTIVITIES_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getALoanAccountAttachmentsReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_A_LOAN_ATTACHMENTS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_ATTACHMENTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_LOAN_ATTACHMENTS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_ATTACHMENTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_LOAN_ATTACHMENTS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_ATTACHMENTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function createALoanAttachmentReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.CREATE_A_LOAN_ATTACHMENT_PENDING:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_LOAN_ATTACHMENT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_LOAN_ATTACHMENT_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_LOAN_ATTACHMENT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_LOAN_ATTACHMENT_FAILURE:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_LOAN_ATTACHMENT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.CREATE_A_LOAN_ATTACHMENT_RESET:
            return {
                request_status: loanAndDepositsConstants.CREATE_A_LOAN_ATTACHMENT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getALoanAccountCommunicationsReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.GET_A_LOAN_COMMUNICATIONS_PENDING:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_COMMUNICATIONS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_LOAN_COMMUNICATIONS_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_COMMUNICATIONS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.GET_A_LOAN_COMMUNICATIONS_FAILURE:
            return {
                request_status: loanAndDepositsConstants.GET_A_LOAN_COMMUNICATIONS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function changeLoanStateReducer(state=[], action) {
    switch (action.type) {
        case loanAndDepositsConstants.CHANGE_LOANSTATE_PENDING:
            return {
                request_status: loanAndDepositsConstants.CHANGE_LOANSTATE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case loanAndDepositsConstants.CHANGE_LOANSTATE_SUCCESS:
            return {
                request_status: loanAndDepositsConstants.CHANGE_LOANSTATE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.CHANGE_LOANSTATE_FAILURE:
            return {
                request_status: loanAndDepositsConstants.CHANGE_LOANSTATE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case loanAndDepositsConstants.CHANGE_LOANSTATE_RESET:
            return {
                request_status: loanAndDepositsConstants.CHANGE_LOANSTATE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}









