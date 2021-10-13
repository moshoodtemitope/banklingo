import {accountingConstants} from '../../actiontypes/accounting/accounting.constants'

export function getGLAccountsReducer(state=[], action) {
    switch (action.type) {
        case accountingConstants.GET_GLACCOUNTS_PENDING:
            return {
                request_status: accountingConstants.GET_GLACCOUNTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case accountingConstants.GET_GLACCOUNTS_SUCCESS:
            return {
                request_status: accountingConstants.GET_GLACCOUNTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case accountingConstants.GET_GLACCOUNTS_FAILURE:
            return {
                request_status: accountingConstants.GET_GLACCOUNTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getAllGLAccountsReducer(state=[], action) {
    switch (action.type) {
        case accountingConstants.GET_ALL_GLACCOUNTS_PENDING:
            return {
                request_status: accountingConstants.GET_ALL_GLACCOUNTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case accountingConstants.GET_ALL_GLACCOUNTS_SUCCESS:
            return {
                request_status: accountingConstants.GET_ALL_GLACCOUNTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case accountingConstants.GET_ALL_GLACCOUNTS_FAILURE:
            return {
                request_status: accountingConstants.GET_ALL_GLACCOUNTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function createGLAccountsReducer(state=[], action) {
    switch (action.type) {
        case accountingConstants.CREATE_GLACCOUNTS_PENDING:
            return {
                request_status: accountingConstants.CREATE_GLACCOUNTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case accountingConstants.CREATE_GLACCOUNTS_SUCCESS:
            return {
                request_status: accountingConstants.CREATE_GLACCOUNTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case accountingConstants.CREATE_GLACCOUNTS_FAILURE:
            return {
                request_status: accountingConstants.CREATE_GLACCOUNTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case accountingConstants.CREATE_GLACCOUNTS_RESET:
            return {
                request_status: accountingConstants.CREATE_GLACCOUNTS_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function updateGLAccountReducer(state=[], action) {
    switch (action.type) {
        case accountingConstants.UPDATE_GLACCOUNTS_PENDING:
            return {
                request_status: accountingConstants.UPDATE_GLACCOUNTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case accountingConstants.UPDATE_GLACCOUNTS_SUCCESS:
            return {
                request_status: accountingConstants.UPDATE_GLACCOUNTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case accountingConstants.UPDATE_GLACCOUNTS_FAILURE:
            return {
                request_status: accountingConstants.UPDATE_GLACCOUNTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case accountingConstants.UPDATE_GLACCOUNTS_RESET:
            return {
                request_status: accountingConstants.UPDATE_GLACCOUNTS_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}


export function getJournalEntriesReducer(state=[], action) {
    switch (action.type) {
        case accountingConstants.GET_JOURNAL_ENTRY_PENDING:
            return {
                request_status: accountingConstants.GET_JOURNAL_ENTRY_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case accountingConstants.GET_JOURNAL_ENTRY_SUCCESS:
            return {
                request_status: accountingConstants.GET_JOURNAL_ENTRY_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case accountingConstants.GET_JOURNAL_ENTRY_FAILURE:
            return {
                request_status: accountingConstants.GET_JOURNAL_ENTRY_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function createJournalEntriesReducer(state=[], action) {
    switch (action.type) {
        case accountingConstants.CREATE_JOURNAL_ENTRY_PENDING:
            return {
                request_status: accountingConstants.CREATE_JOURNAL_ENTRY_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case accountingConstants.CREATE_JOURNAL_ENTRY_SUCCESS:
            return {
                request_status: accountingConstants.CREATE_JOURNAL_ENTRY_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case accountingConstants.CREATE_JOURNAL_ENTRY_FAILURE:
            return {
                request_status: accountingConstants.CREATE_JOURNAL_ENTRY_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case accountingConstants.CREATE_JOURNAL_ENTRY_RESET:
            return {
                request_status: accountingConstants.CREATE_JOURNAL_ENTRY_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getTrialBalanceReducer(state=[], action) {
    switch (action.type) {
        case accountingConstants.GET_TRIAL_BALANCE_PENDING:
            return {
                request_status: accountingConstants.GET_TRIAL_BALANCE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case accountingConstants.GET_TRIAL_BALANCE_SUCCESS:
            return {
                request_status: accountingConstants.GET_TRIAL_BALANCE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case accountingConstants.GET_TRIAL_BALANCE_FAILURE:
            return {
                request_status: accountingConstants.GET_TRIAL_BALANCE_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getTrialBalanceBasicReducer(state=[], action) {
    switch (action.type) {
        case accountingConstants.GET_TRIAL_BALANCE_BASIC_PENDING:
            return {
                request_status: accountingConstants.GET_TRIAL_BALANCE_BASIC_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case accountingConstants.GET_TRIAL_BALANCE_BASIC_SUCCESS:
            return {
                request_status: accountingConstants.GET_TRIAL_BALANCE_BASIC_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case accountingConstants.GET_TRIAL_BALANCE_BASIC_FAILURE:
            return {
                request_status: accountingConstants.GET_TRIAL_BALANCE_BASIC_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getProfitAndLossReducer(state=[], action) {
    switch (action.type) {
        case accountingConstants.GET_PROFIT_AND_LOSS_PENDING:
            return {
                request_status: accountingConstants.GET_PROFIT_AND_LOSS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case accountingConstants.GET_PROFIT_AND_LOSS_SUCCESS:
            return {
                request_status: accountingConstants.GET_PROFIT_AND_LOSS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case accountingConstants.GET_PROFIT_AND_LOSS_FAILURE:
            return {
                request_status: accountingConstants.GET_PROFIT_AND_LOSS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getBalanceSheetReducer(state=[], action) {
    switch (action.type) {
        case accountingConstants.GET_BALANCE_SHEET_PENDING:
            return {
                request_status: accountingConstants.GET_BALANCE_SHEET_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case accountingConstants.GET_BALANCE_SHEET_SUCCESS:
            return {
                request_status: accountingConstants.GET_BALANCE_SHEET_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case accountingConstants.GET_BALANCE_SHEET_FAILURE:
            return {
                request_status: accountingConstants.GET_BALANCE_SHEET_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}





