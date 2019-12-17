import {administrationConstants} from '../../actiontypes/administration/administration.constants'


export function createRoleReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.CREATE_A_ROLE_PENDING:
            return {
                request_status: administrationConstants.CREATE_A_ROLE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.CREATE_A_ROLE_SUCCESS:
            return {
                request_status: administrationConstants.CREATE_A_ROLE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.CREATE_A_ROLE_FAILURE:
            return {
                request_status: administrationConstants.CREATE_A_ROLE_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function createCustomerTypeReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.CREATE_CUSTOMERTYPE_PENDING:
            return {
                request_status: administrationConstants.CREATE_CUSTOMERTYPE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.CREATE_CUSTOMERTYPE_SUCCESS:
            return {
                request_status: administrationConstants.CREATE_CUSTOMERTYPE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.CREATE_CUSTOMERTYPE_FAILURE:
            return {
                request_status: administrationConstants.CREATE_CUSTOMERTYPE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.CREATE_CUSTOMERTYPE_RESET:
            return {
                request_status: administrationConstants.CREATE_CUSTOMERTYPE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function createTransactionChannelReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.CREATE_TRANSACTION_CHANNEL_PENDING:
            return {
                request_status: administrationConstants.CREATE_TRANSACTION_CHANNEL_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.CREATE_TRANSACTION_CHANNEL_SUCCESS:
            return {
                request_status: administrationConstants.CREATE_TRANSACTION_CHANNEL_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.CREATE_TRANSACTION_CHANNEL_FAILURE:
            return {
                request_status: administrationConstants.CREATE_TRANSACTION_CHANNEL_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.CREATE_TRANSACTION_CHANNEL_RESET:
            return {
                request_status: administrationConstants.CREATE_TRANSACTION_CHANNEL_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}


