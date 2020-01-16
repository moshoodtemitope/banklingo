import {disbursmentConstants} from '../../actiontypes/disbursment/disbursment.constants'

export function getDisbursementsReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.GET_DISBURSMENTS_PENDING:
            return {
                request_status: disbursmentConstants.GET_DISBURSMENTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.GET_DISBURSMENTS_SUCCESS:
            return {
                request_status: disbursmentConstants.GET_DISBURSMENTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.GET_DISBURSMENTS_FAILURE:
            return {
                request_status: disbursmentConstants.GET_DISBURSMENTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getDisbursementBanksReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.GET_DISBURSMENTS_BANKS_PENDING:
            return {
                request_status: disbursmentConstants.GET_DISBURSMENTS_BANKS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.GET_DISBURSMENTS_BANKS_SUCCESS:
            return {
                request_status: disbursmentConstants.GET_DISBURSMENTS_BANKS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.GET_DISBURSMENTS_BANKS_FAILURE:
            return {
                request_status: disbursmentConstants.GET_DISBURSMENTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function postDisbursementReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.POST_DISBURSMENT_PENDING:
            return {
                request_status: disbursmentConstants.POST_DISBURSMENT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.POST_DISBURSMENT_SUCCESS:
            return {
                request_status: disbursmentConstants.POST_DISBURSMENT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.POST_DISBURSMENT_FAILURE:
            return {
                request_status: disbursmentConstants.POST_DISBURSMENT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.POST_DISBURSMENT_EDIT:
            return {
                request_status: disbursmentConstants.POST_DISBURSMENT_EDIT,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.POST_DISBURSMENT_RESET:
            return {
                request_status: disbursmentConstants.POST_DISBURSMENT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function confirmPostDisbursementReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.CONFIRM_DISBURSMENT_PENDING:
            return {
                request_status: disbursmentConstants.CONFIRM_DISBURSMENT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.CONFIRM_DISBURSMENT_SUCCESS:
            return {
                request_status: disbursmentConstants.CONFIRM_DISBURSMENT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.CONFIRM_DISBURSMENT_FAILURE:
            return {
                request_status: disbursmentConstants.CONFIRM_DISBURSMENT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        
        case disbursmentConstants.CONFIRM_DISBURSMENT_RESET:
            return {
                request_status: disbursmentConstants.CONFIRM_DISBURSMENT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function approvePostDisbursementReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.APPROVE_DISBURSMENT_PENDING:
            return {
                request_status: disbursmentConstants.APPROVE_DISBURSMENT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.APPROVE_DISBURSMENT_SUCCESS:
            return {
                request_status: disbursmentConstants.APPROVE_DISBURSMENT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.APPROVE_DISBURSMENT_FAILURE:
            return {
                request_status: disbursmentConstants.APPROVE_DISBURSMENT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.APPROVE_DISBURSMENT_RESET:
            return {
                request_status: disbursmentConstants.APPROVE_DISBURSMENT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function rejectPostDisbursementReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.REJECT_DISBURSMENT_PENDING:
            return {
                request_status: disbursmentConstants.REJECT_DISBURSMENT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.REJECT_DISBURSMENT_SUCCESS:
            return {
                request_status: disbursmentConstants.REJECT_DISBURSMENT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.REJECT_DISBURSMENT_FAILURE:
            return {
                request_status: disbursmentConstants.REJECT_DISBURSMENT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.REJECT_DISBURSMENT_RESET:
            return {
                request_status: disbursmentConstants.REJECT_DISBURSMENT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getDisbursementByRefReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.GET_A_DISBURSMENT_PENDING:
            return {
                request_status: disbursmentConstants.GET_A_DISBURSMENT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.GET_A_DISBURSMENT_SUCCESS:
            return {
                request_status: disbursmentConstants.GET_A_DISBURSMENT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.GET_A_DISBURSMENT_FAILURE:
            return {
                request_status: disbursmentConstants.GET_A_DISBURSMENT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.GET_A_DISBURSMENT_RESET:
            return {
                request_status: disbursmentConstants.GET_A_DISBURSMENT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}







