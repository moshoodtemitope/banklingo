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

export function exportClientsReducer(state=[], action) {
    switch (action.type) {
        case clientsConstants.EXPORT_CLIENTS_PENDING:
            return {
                request_status: clientsConstants.EXPORT_CLIENTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case clientsConstants.EXPORT_CLIENTS_SUCCESS:
            return {
                request_status: clientsConstants.EXPORT_CLIENTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.EXPORT_CLIENTS_FAILURE:
            return {
                request_status: clientsConstants.EXPORT_CLIENTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getAClientReducer(state=[], action) {
    switch (action.type) {
        case clientsConstants.GET_A_CLIENT_PENDING:
            return {
                request_status: clientsConstants.GET_A_CLIENT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case clientsConstants.GET_A_CLIENT_SUCCESS:
            return {
                request_status: clientsConstants.GET_A_CLIENT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.GET_A_CLIENT_FAILURE:
            return {
                request_status: clientsConstants.GET_A_CLIENT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.GET_A_CLIENT_RESET:
            return {
                request_status: clientsConstants.GET_A_CLIENT_RESET,
                is_request_processing: false,
                request_data: {}
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

export function getAClientCommentsReducer(state=[], action) {
    switch (action.type) {
        case clientsConstants.GET_A_CLIENT_COMMENTS_PENDING:
            return {
                request_status: clientsConstants.GET_A_CLIENT_COMMENTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case clientsConstants.GET_A_CLIENT_COMMENTS_SUCCESS:
            return {
                request_status: clientsConstants.GET_A_CLIENT_COMMENTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.GET_A_CLIENT_COMMENTS_FAILURE:
            return {
                request_status: clientsConstants.GET_A_CLIENT_COMMENTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function createAClientCommentReducer(state=[], action) {
    switch (action.type) {
        case clientsConstants.CREATE_A_CLIENT_COMMENT_PENDING:
            return {
                request_status: clientsConstants.CREATE_A_CLIENT_COMMENT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case clientsConstants.CREATE_A_CLIENT_COMMENT_SUCCESS:
            return {
                request_status: clientsConstants.CREATE_A_CLIENT_COMMENT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.CREATE_A_CLIENT_COMMENT_FAILURE:
            return {
                request_status: clientsConstants.CREATE_A_CLIENT_COMMENT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.CREATE_A_CLIENT_COMMENT_RESET:
            return {
                request_status: clientsConstants.CREATE_A_CLIENT_COMMENT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getAClientAttachmentsReducer(state=[], action) {
    switch (action.type) {
        case clientsConstants.GET_A_CLIENT_ATTACHMENTS_PENDING:
            return {
                request_status: clientsConstants.GET_A_CLIENT_ATTACHMENTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case clientsConstants.GET_A_CLIENT_ATTACHMENTS_SUCCESS:
            return {
                request_status: clientsConstants.GET_A_CLIENT_ATTACHMENTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.GET_A_CLIENT_ATTACHMENTS_FAILURE:
            return {
                request_status: clientsConstants.GET_A_CLIENT_ATTACHMENTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function createAClientAttachmentsReducer(state=[], action) {
    switch (action.type) {
        case clientsConstants.CREATE_A_CLIENT_ATTACHMENTS_PENDING:
            return {
                request_status: clientsConstants.CREATE_A_CLIENT_ATTACHMENTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case clientsConstants.CREATE_A_CLIENT_ATTACHMENTS_SUCCESS:
            return {
                request_status: clientsConstants.CREATE_A_CLIENT_ATTACHMENTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.CREATE_A_CLIENT_ATTACHMENTS_FAILURE:
            return {
                request_status: clientsConstants.CREATE_A_CLIENT_ATTACHMENTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.CREATE_A_CLIENT_ATTACHMENTS_RESET:
            return {
                request_status: clientsConstants.CREATE_A_CLIENT_ATTACHMENTS_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getAClientCommunicationsReducer(state=[], action) {
    switch (action.type) {
        case clientsConstants.GET_A_CLIENT_COMMUNICATIONS_PENDING:
            return {
                request_status: clientsConstants.GET_A_CLIENT_COMMUNICATIONS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case clientsConstants.GET_A_CLIENT_COMMUNICATIONS_SUCCESS:
            return {
                request_status: clientsConstants.GET_A_CLIENT_COMMUNICATIONS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.GET_A_CLIENT_COMMUNICATIONS_FAILURE:
            return {
                request_status: clientsConstants.GET_A_CLIENT_COMMUNICATIONS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function changeClientStateReducer(state=[], action) {
    switch (action.type) {
        case clientsConstants.CHANGE_CLIENT_STATE_PENDING:
            return {
                request_status: clientsConstants.CHANGE_CLIENT_STATE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case clientsConstants.CHANGE_CLIENT_STATE_SUCCESS:
            return {
                request_status: clientsConstants.CHANGE_CLIENT_STATE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.CHANGE_CLIENT_STATE_FAILURE:
            return {
                request_status: clientsConstants.CHANGE_CLIENT_STATE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.CHANGE_CLIENT_STATE_RESET:
            return {
                request_status: clientsConstants.CHANGE_CLIENT_STATE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getAClientActivitiesReducer(state=[], action) {
    switch (action.type) {
        case clientsConstants.GET_A_CLIENT_ACTIVITIES_PENDING:
            return {
                request_status: clientsConstants.GET_A_CLIENT_ACTIVITIES_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case clientsConstants.GET_A_CLIENT_ACTIVITIES_SUCCESS:
            return {
                request_status: clientsConstants.GET_A_CLIENT_ACTIVITIES_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.GET_A_CLIENT_ACTIVITIES_FAILURE:
            return {
                request_status: clientsConstants.GET_A_CLIENT_ACTIVITIES_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function createAClientTaskReducer(state=[], action) {
    switch (action.type) {
        case clientsConstants.CREATE_A_CLIENT_TASK_PENDING:
            return {
                request_status: clientsConstants.CREATE_A_CLIENT_TASK_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case clientsConstants.CREATE_A_CLIENT_TASK_SUCCESS:
            return {
                request_status: clientsConstants.CREATE_A_CLIENT_TASK_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.CREATE_A_CLIENT_TASK_FAILURE:
            return {
                request_status: clientsConstants.CREATE_A_CLIENT_TASK_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.CREATE_A_CLIENT_TASK_RESET:
            return {
                request_status: clientsConstants.CREATE_A_CLIENT_TASK_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getAClientTasksReducer(state=[], action) {
    switch (action.type) {
        case clientsConstants.GET_A_CLIENT_TASKS_PENDING:
            return {
                request_status: clientsConstants.GET_A_CLIENT_TASKS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case clientsConstants.GET_A_CLIENT_TASKS_SUCCESS:
            return {
                request_status: clientsConstants.GET_A_CLIENT_TASKS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case clientsConstants.GET_A_CLIENT_TASKS_FAILURE:
            return {
                request_status: clientsConstants.GET_A_CLIENT_TASKS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}
