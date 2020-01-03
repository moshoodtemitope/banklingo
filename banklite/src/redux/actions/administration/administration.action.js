import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {administrationConstants} from '../../actiontypes/administration/administration.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const administrationActions = {
    getAllUsers,
    addARole,
    getOrganizationDetails,
    updateOrganizationDetails,
    getCustomerTypes,
    addCustomerType,
    updateCustomerType,
    getTransactionChannels,
    addTransactionChannel,
    updateTransactionChannel,
    addNewCurrency,
    smsSettings,
    getSmsSettings,
    emailSettings,
    getEmailSettings,
    getAccessPreferences,
    accessPreferences,
    getInternalControl,
    updateInternalControlSettings,
    getAllBranches,
    getABranch,
    createNewBranch,
    updateABranch,
    getAllCurrencies,
    updateCurrency,
    setCurrencyConversionRate
}

function getAllUsers  (params){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.GET_USERS+params, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

function request(user) { return { type: administrationConstants.GET_ALL_USERS_PENDING, user } }
function success(response) { return { type: administrationConstants.GET_ALL_USERS_SUCCESS, response } }
function failure(error) { return { type: administrationConstants.GET_ALL_USERS_FAILURE, error } }

}

function getOrganizationDetails  (){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.GET_ORGANIZATION_DETAILS, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

function request(user) { return { type: administrationConstants.GET_ORGANIZATION_DETAILS_PENDING, user } }
function success(response) { return { type: administrationConstants.GET_ORGANIZATION_DETAILS_SUCCESS, response } }
function failure(error) { return { type: administrationConstants.GET_ORGANIZATION_DETAILS_FAILURE, error } }

}

function updateOrganizationDetails   (updateOrgPayload){
    if(updateOrgPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.UPDATE_ORGANIZATION_DETAILS, "POST", updateOrgPayload);
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

    function request(user) { return { type: administrationConstants.UPDATE_ORGANIZATION_DETAILS_PENDING, user } }
    function success(response) { return { type: administrationConstants.UPDATE_ORGANIZATION_DETAILS_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.UPDATE_ORGANIZATION_DETAILS_FAILURE, error } }
    function clear() { return { type: administrationConstants.UPDATE_ORGANIZATION_DETAILS_RESET, clear_data:""} }

}

function getTransactionChannels  (payload){
    
    return dispatch =>{
        let {PageSize, CurrentPage}= payload;
        let consume = ApiService.request(routes.HIT_TRANSACTION_CHANNEL+`?PageSize=${PageSize}&CurrentPage=${CurrentPage}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                let consume2 = ApiService.request(routes.ALL_GLACCOUNTS, "GET", null);

                dispatch(request(consume2));

                return consume2
                    .then(response2 =>{
                        dispatch(success(response,response2));
                    })
                    .catch(error =>{
                    
                        dispatch(failure(handleRequestErrors(error)));
                    });

                // dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

function request(user) { return { type: administrationConstants.GET_TRANSACTION_CHANNELS_PENDING, user } }
function success(response, response2) { return { type: administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS, response, response2 } }
function failure(error) { return { type: administrationConstants.GET_TRANSACTION_CHANNELS_FAILURE, error } }

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

function getCustomerTypes  (customerTypesPayload){
    if(customerTypesPayload!=="CLEAR"){
        return dispatch =>{
            let {PageSize, CurrentPage}= customerTypesPayload;
            let consume = ApiService.request(routes.HIT_CUSTOMER_TYPES+`?PageSize=${PageSize}&CurrentPage=${CurrentPage}`, "GET", null);
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

    function request(user) { return { type: administrationConstants.GET_CUSTOMERTYPES_PENDING, user } }
    function success(response) { return { type: administrationConstants.GET_CUSTOMERTYPES_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.GET_CUSTOMERTYPES_FAILURE, error } }
    function clear() { return { type: administrationConstants.GET_CUSTOMERTYPES_RESET, clear_data:""} }

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

function updateCustomerType  (updatedCustomerTypePayload){
    if(updatedCustomerTypePayload!=="CLEAR"){
        return dispatch =>{
            let url = routes.HIT_CUSTOMER_TYPES+`/${updatedCustomerTypePayload.id}`;
            delete updatedCustomerTypePayload.id;
            let consume = ApiService.request(url, "POST", updatedCustomerTypePayload);
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

    function request(user) { return { type: administrationConstants.UPDATE_CUSTOMERTYPE_PENDING, user } }
    function success(response) { return { type: administrationConstants.UPDATE_CUSTOMERTYPE_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.UPDATE_CUSTOMERTYPE_FAILURE, error } }
    function clear() { return { type: administrationConstants.UPDATE_CUSTOMERTYPE_RESET, clear_data:""} }

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

function updateTransactionChannel  (transactionChannelPayload){
    if(transactionChannelPayload!=="CLEAR"){
        return dispatch =>{
            let url = routes.ADD_TRANSACTION_CHANNEL+`/${transactionChannelPayload.encodedKey}`;
            if(transactionChannelPayload.key==='' || 
                transactionChannelPayload.name===''){
                    dispatch(failure(handleRequestErrors('Please provide all details')));
                    return false;
            }

            delete transactionChannelPayload.encodedKey;
            let consume = ApiService.request(url, "POST", transactionChannelPayload);
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

    function request(user) { return { type: administrationConstants.UPDATE_TRANSACTION_CHANNEL_PENDING, user } }
    function success(response) { return { type: administrationConstants.UPDATE_TRANSACTION_CHANNEL_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.UPDATE_TRANSACTION_CHANNEL_FAILURE, error } }
    function clear() { return { type: administrationConstants.UPDATE_TRANSACTION_CHANNEL_RESET, clear_data:""} }

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

function updateCurrency  (updateCurrencyPayload){
    if(updateCurrencyPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.UPDATE_CURRENCY, "POST", updateCurrencyPayload);
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

    function request(user) { return { type: administrationConstants.UPDATE_CURRENCY_PENDING, user } }
    function success(response) { return { type: administrationConstants.UPDATE_CURRENCY_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.UPDATE_CURRENCY_FAILURE, error } }
    function clear() { return { type: administrationConstants.UPDATE_CURRENCY_RESET, clear_data:""} }

}

function getAllCurrencies  (){
    
        return dispatch =>{
            let consume = ApiService.request(routes.GET_ALL_CURRENCIES, "GET", null);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    // console.log('error is', error)
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        


    function request(user) { return { type: administrationConstants.GET_ALLCURRENCIES_PENDING, user } }
    function success(response) { return { type: administrationConstants.GET_ALLCURRENCIES_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.GET_ALLCURRENCIES_FAILURE, error } }
    // function clear() { return { type: administrationConstants.CREATE_NEWCURRENCY_RESET, clear_data:""} }

}

function setCurrencyConversionRate (conversionPayload){
    if(conversionPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.ADD_EXCHANGE_RATE, "POST", conversionPayload);
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
    


function request(user) { return { type: administrationConstants.SET_CONVERSION_RATE_PENDING, user } }
function success(response) { return { type: administrationConstants.SET_CONVERSION_RATE_SUCCESS, response } }
function failure(error) { return { type: administrationConstants.SET_CONVERSION_RATE_FAILURE, error } }
function clear() { return { type: administrationConstants.SET_CONVERSION_RATE_RESET, clear_data:""} }

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

function getSmsSettings  (){
    
    return dispatch =>{
        let consume = ApiService.request(routes.GET_SMS_SETTINGS+`1?Channel=1`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                // console.log('error is', error)
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user) { return { type: administrationConstants.GET_SMS_SETTINGS_PENDING, user } }
    function success(response) { return { type: administrationConstants.GET_SMS_SETTINGS_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.GET_SMS_SETTINGS_FAILURE, error } }
    // function clear() { return { type: administrationConstants.SMS_SETTINGS_RESET, clear_data:""} }

}


function getEmailSettings  (){
    
    return dispatch =>{
        let consume = ApiService.request(routes.GET_EMAIL_SETTINGS+`1?Channel=1`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                // console.log('error is', error)
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }

    function request(user) { return { type: administrationConstants.GET_EMAIL_SETTINGS_PENDING, user } }
    function success(response) { return { type: administrationConstants.GET_EMAIL_SETTINGS_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.GET_EMAIL_SETTINGS_FAILURE, error } }
    // function clear() { return { type: administrationConstants.SMS_SETTINGS_RESET, clear_data:""} }

}

function emailSettings  (emailSettingsPayload){
    if(emailSettingsPayload!=="CLEAR"){
        return dispatch =>{
            
            if(Object.keys(emailSettingsPayload).length >1){
                let consume = ApiService.request(routes.UPDATE_EMAIL_SETTINGS, "POST", emailSettingsPayload);
                dispatch(request(consume));
                return consume
                    .then(response =>{
                        dispatch(success(response));
                    }).catch(error =>{
                       
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

function getAccessPreferences  (){
    
        return dispatch =>{
            
            let consume = ApiService.request(routes.GET_ACCESS_PREFERENCE, "GET", null);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        

    function request(user) { return { type: administrationConstants.GET_ACCESS_PREFERENCE_PENDING, user } }
    function success(response) { return { type: administrationConstants.GET_ACCESS_PREFERENCE_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.GET_ACCESS_PREFERENCE_FAILURE, error } }
   
}

function accessPreferences  (accessPreferencePayload){
    if(accessPreferencePayload!=="CLEAR"){
        
        return dispatch =>{
            console.log('lalalal', accessPreferencePayload);
            if(Object.keys(accessPreferencePayload).length >1 
                && accessPreferencePayload.automaticExpiryOfPassword ===true
                && accessPreferencePayload.lockUserAfterFailedLogin ===true){
                let consume = ApiService.request(routes.UPDATE_ACCESS_PREFERENCE, "POST", accessPreferencePayload);
                dispatch(request(consume));
                return consume
                    .then(response =>{
                        dispatch(success(response));
                    }).catch(error =>{
                       
                        dispatch(failure(handleRequestErrors(error)));
                    });
            }
            else{
                dispatch(failure(handleRequestErrors("Please provide all required details")));
            }
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: administrationConstants.UPDATE_ACCESS_PREFERENCE_PENDING, user } }
    function success(response) { return { type: administrationConstants.UPDATE_ACCESS_PREFERENCE_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.UPDATE_ACCESS_PREFERENCE_FAILURE, error } }
    function clear() { return { type: administrationConstants.UPDATE_ACCESS_PREFERENCE_RESET, clear_data:""} }

}

function getInternalControl  (params){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_INTERNAL_CONTROL, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

function request(user) { return { type: administrationConstants.GET_INTERNAL_CONTROL_PENDING, user } }
function success(response) { return { type: administrationConstants.GET_INTERNAL_CONTROL_SUCCESS, response } }
function failure(error) { return { type: administrationConstants.GET_INTERNAL_CONTROL_FAILURE, error } }

}


function updateInternalControlSettings  (internalControlSettingsPayload){
    if(internalControlSettingsPayload!=="CLEAR"){
        return dispatch =>{
            
            if(Object.keys(internalControlSettingsPayload).length >1){
                let consume = ApiService.request(routes.HIT_INTERNAL_CONTROL, "POST", internalControlSettingsPayload);
                dispatch(request(consume));
                return consume
                    .then(response =>{
                        dispatch(success(response));
                    }).catch(error =>{
                       
                        dispatch(failure(handleRequestErrors(error)));
                    });
            }
            else{
                dispatch(failure(handleRequestErrors("Please provide all required details")));
            }
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: administrationConstants.UPDATE_INTERNAL_CONTROL_PENDING, user } }
    function success(response) { return { type: administrationConstants.UPDATE_INTERNAL_CONTROL_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.UPDATE_INTERNAL_CONTROL_FAILURE, error } }
    function clear() { return { type: administrationConstants.UPDATE_INTERNAL_CONTROL_RESET, clear_data:""} }

}



function getAllBranches  (params){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.GET_BRANCHES+'?'+params, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

function request(user) { return { type: administrationConstants.GET_ALL_BRANCHES_PENDING, user } }
function success(response) { return { type: administrationConstants.GET_ALL_BRANCHES_SUCCESS, response } }
function failure(error) { return { type: administrationConstants.GET_ALL_BRANCHES_FAILURE, error } }

}

function getABranch  (encodedKey){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.GET_BRANCHES+'/'+encodedKey, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

function request(user) { return { type: administrationConstants.GET_A_BRANCH_PENDING, user } }
function success(response) { return { type: administrationConstants.GET_A_BRANCH_SUCCESS, response } }
function failure(error) { return { type: administrationConstants.GET_A_BRANCH_FAILURE, error } }

}

function createNewBranch  (createNewBranchPayload){
    if(createNewBranchPayload!=="CLEAR"){
        return dispatch =>{
            
            if(Object.keys(createNewBranchPayload).length >1){
                let consume = ApiService.request(routes.ADD_BRANCH, "POST", createNewBranchPayload);
                dispatch(request(consume));
                return consume
                    .then(response =>{
                        dispatch(success(response));
                    }).catch(error =>{
                       
                        dispatch(failure(handleRequestErrors(error)));
                    });
            }
            else{
                dispatch(failure(handleRequestErrors("Please provide all required details")));
            }
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: administrationConstants.CREATE_NEW_BRANCH_PENDING, user } }
    function success(response) { return { type: administrationConstants.CREATE_NEW_BRANCH_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.CREATE_NEW_BRANCH_FAILURE, error } }
    function clear() { return { type: administrationConstants.CREATE_NEW_BRANCH_RESET, clear_data:""} }

}

function updateABranch  (updateABranchPayload){
    if(updateABranchPayload!=="CLEAR"){
        return dispatch =>{
            let url = routes.ADD_BRANCH+`/${updateABranchPayload.encodedKey}`
            if(Object.keys(updateABranchPayload).length >1){

                delete updateABranchPayload.encodedKey;

                let consume = ApiService.request(url, "POST", updateABranchPayload);
                dispatch(request(consume));
                return consume
                    .then(response =>{
                        dispatch(success(response));
                    }).catch(error =>{
                       
                        dispatch(failure(handleRequestErrors(error)));
                    });
            }
            else{
                dispatch(failure(handleRequestErrors("Please provide all required details")));
            }
            
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: administrationConstants.UPDATE_A_BRANCH_PENDING, user } }
    function success(response) { return { type: administrationConstants.UPDATE_A_BRANCH_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.UPDATE_A_BRANCH_FAILURE, error } }
    function clear() { return { type: administrationConstants.UPDATE_A_BRANCH_RESET, clear_data:""} }

}