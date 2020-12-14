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

export function getPendingApprovalDisbursementReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.GET_PENDING_APPROVAL_DISBURSMENTS_PENDING:
            return {
                request_status: disbursmentConstants.GET_PENDING_APPROVAL_DISBURSMENTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.GET_PENDING_APPROVAL_DISBURSMENTS_SUCCESS:
            return {
                request_status: disbursmentConstants.GET_PENDING_APPROVAL_DISBURSMENTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.GET_PENDING_APPROVAL_DISBURSMENTS_FAILURE:
            return {
                request_status: disbursmentConstants.GET_PENDING_APPROVAL_DISBURSMENTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getInwardsNIPReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.GET_NIP_INWARDS_PENDING:
            return {
                request_status: disbursmentConstants.GET_NIP_INWARDS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.GET_NIP_INWARDS_SUCCESS:
            return {
                request_status: disbursmentConstants.GET_NIP_INWARDS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.GET_NIP_INWARDS_FAILURE:
            return {
                request_status: disbursmentConstants.GET_NIP_INWARDS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function exportInwardsNIPReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.EXPORT_NIP_INWARDS_PENDING:
            return {
                request_status: disbursmentConstants.EXPORT_NIP_INWARDS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.EXPORT_NIP_INWARDS_SUCCESS:
            return {
                request_status: disbursmentConstants.EXPORT_NIP_INWARDS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.EXPORT_NIP_INWARDS_FAILURE:
            return {
                request_status: disbursmentConstants.EXPORT_NIP_INWARDS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}


export function getOutwardsNIPReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.GET_NIP_OUTWARDS_PENDING:
            return {
                request_status: disbursmentConstants.GET_NIP_OUTWARDS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.GET_NIP_OUTWARDS_SUCCESS:
            return {
                request_status: disbursmentConstants.GET_NIP_OUTWARDS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.GET_NIP_OUTWARDS_FAILURE:
            return {
                request_status: disbursmentConstants.GET_NIP_OUTWARDS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function exportOutwardsNIPReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.EXPORT_NIP_OUTWARDS_PENDING:
            return {
                request_status: disbursmentConstants.EXPORT_NIP_OUTWARDS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.EXPORT_NIP_OUTWARDS_SUCCESS:
            return {
                request_status: disbursmentConstants.EXPORT_NIP_OUTWARDS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.EXPORT_NIP_OUTWARDS_FAILURE:
            return {
                request_status: disbursmentConstants.EXPORT_NIP_OUTWARDS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getPendingReviewDisbursementReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.GET_PENDING_REVIEW_DISBURSMENTS_PENDING:
            return {
                request_status: disbursmentConstants.GET_PENDING_REVIEW_DISBURSMENTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.GET_PENDING_REVIEW_DISBURSMENTS_SUCCESS:
            return {
                request_status: disbursmentConstants.GET_PENDING_REVIEW_DISBURSMENTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.GET_PENDING_REVIEW_DISBURSMENTS_FAILURE:
            return {
                request_status: disbursmentConstants.GET_PENDING_REVIEW_DISBURSMENTS_FAILURE,
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

export function postNewDisbursementBatchReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.NEW_DISBURSMENT_BATCH_PENDING:
            return {
                request_status: disbursmentConstants.NEW_DISBURSMENT_BATCH_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.NEW_DISBURSMENT_BATCH_SUCCESS:
            return {
                request_status: disbursmentConstants.NEW_DISBURSMENT_BATCH_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.NEW_DISBURSMENT_BATCH_FAILURE:
            return {
                request_status: disbursmentConstants.NEW_DISBURSMENT_BATCH_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.NEW_DISBURSMENT_BATCH_RESET:
            return {
                request_status: disbursmentConstants.NEW_DISBURSMENT_BATCH_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getADisbursementBatchReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.GET_A_DISBURSMENT_BATCH_PENDING:
            return {
                request_status: disbursmentConstants.GET_A_DISBURSMENT_BATCH_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.GET_A_DISBURSMENT_BATCH_SUCCESS:
            return {
                request_status: disbursmentConstants.GET_A_DISBURSMENT_BATCH_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.GET_A_DISBURSMENT_BATCH_FAILURE:
            return {
                request_status: disbursmentConstants.GET_A_DISBURSMENT_BATCH_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.GET_A_DISBURSMENT_BATCH_RESET:
            return {
                request_status: disbursmentConstants.GET_A_DISBURSMENT_BATCH_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getInitiatedDisbursementsReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.GET_INITIATED_BATCHES_PENDING:
            return {
                request_status: disbursmentConstants.GET_INITIATED_BATCHES_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.GET_INITIATED_BATCHES_SUCCESS:
            return {
                request_status: disbursmentConstants.GET_INITIATED_BATCHES_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.GET_INITIATED_BATCHES_FAILURE:
            return {
                request_status: disbursmentConstants.GET_INITIATED_BATCHES_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.GET_INITIATED_BATCHES_RESET:
            return {
                request_status: disbursmentConstants.GET_INITIATED_BATCHES_RESET,
                is_request_processing: false,
                request_data: {}
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

export function performActionOnDisbursementBatchReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_PENDING:
            return {
                request_status: disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_SUCCESS:
            return {
                request_status: disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_FAILURE:
            return {
                request_status: disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_RESET:
            return {
                request_status: disbursmentConstants.PERFORMACTION_ON_DISBURSMENT_BATCH_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function deleteADisbursementReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.DELETE_A_BATCH_PENDING:
            return {
                request_status: disbursmentConstants.DELETE_A_BATCH_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.DELETE_A_BATCH_SUCCESS:
            return {
                request_status: disbursmentConstants.DELETE_A_BATCH_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.DELETE_A_BATCH_FAILURE:
            return {
                request_status: disbursmentConstants.DELETE_A_BATCH_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.DELETE_A_BATCH_RESET:
            return {
                request_status: disbursmentConstants.DELETE_A_BATCH_RESET,
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

export function approveOrRejectPostDisbursementReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.APPROVE_OR_REJECT_DISBURSMENT_PENDING:
            return {
                request_status: disbursmentConstants.APPROVE_OR_REJECT_DISBURSMENT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.APPROVE_OR_REJECT_DISBURSMENT_SUCCESS:
            return {
                request_status: disbursmentConstants.APPROVE_OR_REJECT_DISBURSMENT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.APPROVE_OR_REJECT_DISBURSMENT_FAILURE:
            return {
                request_status: disbursmentConstants.APPROVE_OR_REJECT_DISBURSMENT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.APPROVE_OR_REJECT_DISBURSMENT_RESET:
            return {
                request_status: disbursmentConstants.APPROVE_OR_REJECT_DISBURSMENT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function approveOrRejectReviewedDisbursementReducer(state=[], action) {
    switch (action.type) {
        case disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_PENDING:
            return {
                request_status: disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_SUCCESS:
            return {
                request_status: disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_FAILURE:
            return {
                request_status: disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_RESET:
            return {
                request_status: disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_RESET,
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







