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


