import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {administrationConstants} from '../../actiontypes/administration/administration.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const administrationActions = {
    addARole,
    addCustomerType,
    addTransactionChannel,
    addNewCurrency,
    smsSettings,
    emailSettings
}


function addARole  (rolePayload){
    if(rolePayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.ADD_ROLE, "POST", rolePayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }


    function request(user) { return { type: administrationConstants.CREATE_A_ROLE_PENDING, user } }
    function success(response) { return { type: administrationConstants.CREATE_A_ROLE_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.CREATE_A_ROLE_FAILURE, error } }
    function clear() { return { type: administrationConstants.CREATE_A_ROLE_CLEAR, clear_data:""} }
}

function addCustomerType  (customerTypePayload){
    if(customerTypePayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.ADD_CUSTOMER_TYPE, "POST", customerTypePayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: administrationConstants.CREATE_CUSTOMERTYPE_PENDING, user } }
    function success(response) { return { type: administrationConstants.CREATE_CUSTOMERTYPE_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.CREATE_CUSTOMERTYPE_FAILURE, error } }
    function clear() { return { type: administrationConstants.CREATE_CUSTOMERTYPE_RESET, clear_data:""} }

}

function addTransactionChannel  (transactionChannelPayload){
    if(transactionChannelPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.ADD_TRANSACTION_CHANNEL, "POST", transactionChannelPayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: administrationConstants.CREATE_TRANSACTION_CHANNEL_PENDING, user } }
    function success(response) { return { type: administrationConstants.CREATE_TRANSACTION_CHANNEL_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.CREATE_TRANSACTION_CHANNEL_FAILURE, error } }
    function clear() { return { type: administrationConstants.CREATE_TRANSACTION_CHANNEL_RESET, clear_data:""} }

}

function addNewCurrency  (newCurrencyPayload){
    if(newCurrencyPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.ADD_CURRENCY, "POST", newCurrencyPayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    // console.log('error is', error)
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: administrationConstants.CREATE_NEWCURRENCY_PENDING, user } }
    function success(response) { return { type: administrationConstants.CREATE_NEWCURRENCY_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.CREATE_NEWCURRENCY_FAILURE, error } }
    function clear() { return { type: administrationConstants.CREATE_NEWCURRENCY_RESET, clear_data:""} }

}

function smsSettings  (smsSettingsPayload){
    if(smsSettingsPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.UPDATE_SMS_SETTINGS, "POST", smsSettingsPayload);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    // console.log('error is', error)
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: administrationConstants.SMS_SETTINGS_PENDING, user } }
    function success(response) { return { type: administrationConstants.SMS_SETTINGS_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.SMS_SETTINGS_FAILURE, error } }
    function clear() { return { type: administrationConstants.SMS_SETTINGS_RESET, clear_data:""} }

}

function emailSettings  (emailSettingsPayload){
    if(emailSettingsPayload!=="CLEAR"){
        return dispatch =>{
            console.log('payaloe sent', Object.keys(emailSettingsPayload).length);
            if(Object.keys(emailSettingsPayload).length >1){
                let consume = ApiService.request(routes.UPDATE_EMAIL_SETTINGS, "POST", emailSettingsPayload);
                dispatch(request(consume));
                return consume
                    .then(response =>{
                        dispatch(success(response));
                    }).catch(error =>{
                        // console.log('error is', error)
                        dispatch(failure(handleRequestErrors(error)));
                    });
            }
            else{
                dispatch(failure(handleRequestErrors("Please select a valid email server option")));
            }
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: administrationConstants.EMAIL_SETTINGS_PENDING, user } }
    function success(response) { return { type: administrationConstants.EMAIL_SETTINGS_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.EMAIL_SETTINGS_FAILURE, error } }
    function clear() { return { type: administrationConstants.EMAIL_SETTINGS_RESET, clear_data:""} }

}