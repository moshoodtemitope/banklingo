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





