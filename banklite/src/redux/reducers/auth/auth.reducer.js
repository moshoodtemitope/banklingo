import {authConstants} from '../../actiontypes/auth/auth.constants'



let user = JSON.parse(localStorage.getItem('user'));

const initialState = (user && user.AllowedBranches!==undefined) ? { loggedIn: true, user } : {};

export function LoginReducer(state=initialState, action) {
    
    switch (action.type) {
        case authConstants.LOGIN_USER_PENDING:
            return {
                request_status: authConstants.LOGIN_USER_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case authConstants.LOGIN_USER_SUCCESS:
            return {
                request_status: authConstants.LOGIN_USER_SUCCESS,
                loggedIn: true,
                is_request_processing: false,
                request_data: action
            };
        case authConstants.LOGIN_USER_FAILURE:
            return {
                request_status: authConstants.LOGIN_USER_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case authConstants.LOGIN_USER_RESET:
            return {
                request_status: authConstants.LOGIN_USER_RESET,
                is_request_processing: false,
                request_data: {},
            };
        
        case authConstants.LOGOUT:
            return {
                // test:"dsdsds",
                // request_data: action,
                ...state
              };
            
        case authConstants.LOGOUT_USER_SUCCESS:
                return {
                  ...state
                };

        default:
            return { ...state }
    }
}





