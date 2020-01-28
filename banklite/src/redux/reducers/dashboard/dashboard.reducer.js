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


