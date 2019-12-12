import {administrationConstants} from '../../actiontypes/administration/administration.constants'


export function createRoleReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.CREATE_A_ROLE_PENDING:
            return {
                request_status: administrationConstants.CREATE_A_ROLE_PENDING,
                request_data: action
            };
        case administrationConstants.CREATE_A_ROLE_SUCCESS:
            return {
                request_status: administrationConstants.CREATE_A_ROLE_SUCCESS,
                request_data: action
            };
        case administrationConstants.CREATE_A_ROLE_FAILURE:
            return {
                request_status: administrationConstants.CREATE_A_ROLE_FAILURE,
                request_data: action
            };

        default:
            return { ...state }
    }
}