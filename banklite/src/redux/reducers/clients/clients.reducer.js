import {clientsConstants} from '../../actiontypes/clients/clients.constants'

export function getClientsReducer(state=[], action) {
    switch (action.type) {
        case clientsConstants.GET_CLIENTS_PENDING:
            return {
                request_status: clientsConstants.GET_CLIENTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case clientsConstants.GET_CLIENTS_SUCCESS:
            return {
                request_status: clientsConstants.GET_CLIENTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.GET_CLIENTS_FAILURE:
            return {
                request_status: clientsConstants.GET_CLIENTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getAllClientsReducer(state=[], action) {
    switch (action.type) {
        case clientsConstants.GET_ALL_CLIENTS_PENDING:
            return {
                request_status: clientsConstants.GET_ALL_CLIENTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case clientsConstants.GET_ALL_CLIENTS_SUCCESS:
            return {
                request_status: clientsConstants.GET_ALL_CLIENTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.GET_ALL_CLIENTS_FAILURE:
            return {
                request_status: clientsConstants.GET_ALL_CLIENTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function createAClientReducer(state=[], action) {
    switch (action.type) {
        case clientsConstants.CREATE_A_CLIENT_PENDING:
            return {
                request_status: clientsConstants.CREATE_A_CLIENT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case clientsConstants.CREATE_A_CLIENT_SUCCESS:
            return {
                request_status: clientsConstants.CREATE_A_CLIENT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.CREATE_A_CLIENT_FAILURE:
            return {
                request_status: clientsConstants.CREATE_A_CLIENT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.CREATE_A_CLIENT_RESET:
            return {
                request_status: clientsConstants.CREATE_A_CLIENT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function updateAClientReducer(state=[], action) {
    switch (action.type) {
        case clientsConstants.UPDATE_A_CLIENT_PENDING:
            return {
                request_status: clientsConstants.UPDATE_A_CLIENT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case clientsConstants.UPDATE_A_CLIENT_SUCCESS:
            return {
                request_status: clientsConstants.UPDATE_A_CLIENT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.UPDATE_A_CLIENT_FAILURE:
            return {
                request_status: clientsConstants.UPDATE_A_CLIENT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.UPDATE_A_CLIENT_RESET:
            return {
                request_status: clientsConstants.UPDATE_A_CLIENT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}
