import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {administrationConstants} from '../../actiontypes/administration/administration.constants'


export const administrationActions = {
    addARole,
    addCustomerType
}


function addARole  (rolePayload){
    return dispatch =>{
        let consume = ApiService.request(routes.ADD_ROLE, "POST", rolePayload);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                console.log('error occured', error);
                dispatch(failure(error));
            });
        
    }
    function request(user) { return { type: administrationConstants.CREATE_A_ROLE_PENDING, user } }
    function success(response) { return { type: administrationConstants.CREATE_A_ROLE_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.CREATE_A_ROLE_FAILURE, error } }
}

function addCustomerType  (customerTypePayload){
    return dispatch =>{
        let consume = ApiService.request(routes.ADD_CURRENCY_TYPE, "POST", customerTypePayload);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                console.log('error occured', error);
                dispatch(failure(error));
            });
        
    }
    function request(user) { return { type: administrationConstants.CREATE_CUSTOMERTYPE_PENDING, user } }
    function success(response) { return { type: administrationConstants.CREATE_CUSTOMERTYPE_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.CREATE_CUSTOMERTYPE_FAILURE, error } }
}