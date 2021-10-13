import {dashboardConstants} from '../../actiontypes/dashboard/dashboard.constants'

export function getDashboardStatReducer(state=[], action) {
    switch (action.type) {
        case dashboardConstants.GET_DASHOBOARD_DATA_PENDING:
            return {
                request_status: dashboardConstants.GET_DASHOBOARD_DATA_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case dashboardConstants.GET_DASHOBOARD_DATA_SUCCESS:
            return {
                request_status: dashboardConstants.GET_DASHOBOARD_DATA_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.GET_DASHOBOARD_DATA_FAILURE:
            return {
                request_status: dashboardConstants.GET_DASHOBOARD_DATA_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}



export function getActivitiesReducer(state=[], action) {
    switch (action.type) {
        case dashboardConstants.GET_ACTIVITIES_DATA_PENDING:
            return {
                request_status: dashboardConstants.GET_ACTIVITIES_DATA_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case dashboardConstants.GET_ACTIVITIES_DATA_SUCCESS:
            return {
                request_status: dashboardConstants.GET_ACTIVITIES_DATA_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.GET_ACTIVITIES_DATA_FAILURE:
            return {
                request_status: dashboardConstants.GET_ACTIVITIES_DATA_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getLoggedInUserActivitiesReducer(state=[], action) {
    switch (action.type) {
        case dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_PENDING:
            return {
                request_status: dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_SUCCESS:
            return {
                request_status: dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_FAILURE:
            return {
                request_status: dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function globalSearchAnItemReducer(state=[], action) {
    switch (action.type) {
        case dashboardConstants.GLOBAL_SEARCH_ITEM_PENDING:
            return {
                request_status: dashboardConstants.GLOBAL_SEARCH_ITEM_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case dashboardConstants.GLOBAL_SEARCH_ITEM_SUCCESS:
            return {
                request_status: dashboardConstants.GLOBAL_SEARCH_ITEM_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.GLOBAL_SEARCH_ITEM_FAILURE:
            return {
                request_status: dashboardConstants.GLOBAL_SEARCH_ITEM_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.GLOBAL_SEARCH_ITEM_RESET:
            return {
                request_status: dashboardConstants.GLOBAL_SEARCH_ITEM_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function searchForCustomerReducer(state=[], action) {
    switch (action.type) {
        case dashboardConstants.SEARCH_FOR_CUSTOMER_PENDING:
            return {
                request_status: dashboardConstants.SEARCH_FOR_CUSTOMER_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case dashboardConstants.SEARCH_FOR_CUSTOMER_SUCCESS:
            return {
                request_status: dashboardConstants.SEARCH_FOR_CUSTOMER_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.SEARCH_FOR_CUSTOMER_FAILURE:
            return {
                request_status: dashboardConstants.SEARCH_FOR_CUSTOMER_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.SEARCH_FOR_CUSTOMER_RESET:
            return {
                request_status: dashboardConstants.SEARCH_FOR_CUSTOMER_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function reverseATransactionReducer(state=[], action) {
    switch (action.type) {
        case dashboardConstants.REVERSE_TRANSACTION_PENDING:
            return {
                request_status: dashboardConstants.REVERSE_TRANSACTION_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case dashboardConstants.REVERSE_TRANSACTION_SUCCESS:
            return {
                request_status: dashboardConstants.REVERSE_TRANSACTION_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.REVERSE_TRANSACTION_FAILURE:
            return {
                request_status: dashboardConstants.REVERSE_TRANSACTION_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.REVERSE_TRANSACTION_RESET:
            return {
                request_status: dashboardConstants.REVERSE_TRANSACTION_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function postATransactionReducer(state=[], action) {
    switch (action.type) {
        case dashboardConstants.POST_TRANSACTION_PENDING:
            return {
                request_status: dashboardConstants.POST_TRANSACTION_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case dashboardConstants.POST_TRANSACTION_SUCCESS:
            return {
                request_status: dashboardConstants.POST_TRANSACTION_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.POST_TRANSACTION_FAILURE:
            return {
                request_status: dashboardConstants.POST_TRANSACTION_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.POST_TRANSACTION_RESET:
            return {
                request_status: dashboardConstants.POST_TRANSACTION_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function openATillReducer(state=[], action) {
    switch (action.type) {
        case dashboardConstants.OPEN_A_TILL_PENDING:
            return {
                request_status: dashboardConstants.OPEN_A_TILL_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case dashboardConstants.OPEN_A_TILL_SUCCESS:
            return {
                request_status: dashboardConstants.OPEN_A_TILL_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.OPEN_A_TILL_FAILURE:
            return {
                request_status: dashboardConstants.OPEN_A_TILL_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.OPEN_A_TILL_RESET:
            return {
                request_status: dashboardConstants.OPEN_A_TILL_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function addRemoveCashToTillReducer(state=[], action) {
    switch (action.type) {
        case dashboardConstants.ADD_REMOVE_CASH_TO_TILL_PENDING:
            return {
                request_status: dashboardConstants.ADD_REMOVE_CASH_TO_TILL_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case dashboardConstants.ADD_REMOVE_CASH_TO_TILL_SUCCESS:
            return {
                request_status: dashboardConstants.ADD_REMOVE_CASH_TO_TILL_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.ADD_REMOVE_CASH_TO_TILL_FAILURE:
            return {
                request_status: dashboardConstants.ADD_REMOVE_CASH_TO_TILL_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.ADD_REMOVE_CASH_TO_TILL_RESET:
            return {
                request_status: dashboardConstants.ADD_REMOVE_CASH_TO_TILL_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function closeUndoCloseToTillReducer(state=[], action) {
    switch (action.type) {
        case dashboardConstants.CLOSE_UNDOCLOSE_TILL_PENDING:
            return {
                request_status: dashboardConstants.CLOSE_UNDOCLOSE_TILL_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case dashboardConstants.CLOSE_UNDOCLOSE_TILL_SUCCESS:
            return {
                request_status: dashboardConstants.CLOSE_UNDOCLOSE_TILL_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.CLOSE_UNDOCLOSE_TILL_FAILURE:
            return {
                request_status: dashboardConstants.CLOSE_UNDOCLOSE_TILL_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.CLOSE_UNDOCLOSE_TILL_RESET:
            return {
                request_status: dashboardConstants.CLOSE_UNDOCLOSE_TILL_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function fetchTillTransactionsReducer(state=[], action) {
    switch (action.type) {
        case dashboardConstants.GET_TILL_TRANSACTIONS_PENDING:
            return {
                request_status: dashboardConstants.GET_TILL_TRANSACTIONS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case dashboardConstants.GET_TILL_TRANSACTIONS_SUCCESS:
            return {
                request_status: dashboardConstants.GET_TILL_TRANSACTIONS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.GET_TILL_TRANSACTIONS_FAILURE:
            return {
                request_status: dashboardConstants.GET_TILL_TRANSACTIONS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.GET_TILL_TRANSACTIONS_RESET:
            return {
                request_status: dashboardConstants.GET_TILL_TRANSACTIONS_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function fetchLoggedonTillsReducer(state=[], action) {
    switch (action.type) {
        case dashboardConstants.GET_LOGGEDON_TILLS_PENDING:
            return {
                request_status: dashboardConstants.GET_LOGGEDON_TILLS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case dashboardConstants.GET_LOGGEDON_TILLS_SUCCESS:
            return {
                request_status: dashboardConstants.GET_LOGGEDON_TILLS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.GET_LOGGEDON_TILLS_FAILURE:
            return {
                request_status: dashboardConstants.GET_LOGGEDON_TILLS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.GET_LOGGEDON_TILLS_RESET:
            return {
                request_status: dashboardConstants.GET_LOGGEDON_TILLS_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function fetchAllTillsReducer(state=[], action) {
    switch (action.type) {
        case dashboardConstants.GET_ALL_TILLS_PENDING:
            return {
                request_status: dashboardConstants.GET_ALL_TILLS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case dashboardConstants.GET_ALL_TILLS_SUCCESS:
            return {
                request_status: dashboardConstants.GET_ALL_TILLS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.GET_ALL_TILLS_FAILURE:
            return {
                request_status: dashboardConstants.GET_ALL_TILLS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.GET_ALL_TILLS_RESET:
            return {
                request_status: dashboardConstants.GET_LOGGEDON_TILLS_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}


export function fetchManadateReducer(state=[], action) {
    switch (action.type) {
        case dashboardConstants.FETCH_MANDATE_PENDING:
            return {
                request_status: dashboardConstants.FETCH_MANDATE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case dashboardConstants.FETCH_MANDATE_SUCCESS:
            return {
                request_status: dashboardConstants.FETCH_MANDATE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.FETCH_MANDATE_FAILURE:
            return {
                request_status: dashboardConstants.FETCH_MANDATE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.FETCH_MANDATE_RESET:
            return {
                request_status: dashboardConstants.FETCH_MANDATE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getAReportReducer(state=[], action) {
    switch (action.type) {
        case dashboardConstants.GET_A_REPORT_PENDING:
            return {
                request_status: dashboardConstants.GET_A_REPORT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case dashboardConstants.GET_A_REPORT_SUCCESS:
            return {
                request_status: dashboardConstants.GET_A_REPORT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.GET_A_REPORT_FAILURE:
            return {
                request_status: dashboardConstants.GET_A_REPORT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case dashboardConstants.GET_A_REPORT_RESET:
            return {
                request_status: dashboardConstants.GET_A_REPORT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

