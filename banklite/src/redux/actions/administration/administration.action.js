import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {administrationConstants} from '../../actiontypes/administration/administration.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const administrationActions = {
    getUsers,
    createUser,
    getAUser,
    getAllUsers,
    updateAUser,
    addARole,
    updateARole,
    getRoles,
    getARole,
    getAllRoles,
    getAllPermissions,
    getOrganizationDetails,
    updateOrganizationDetails,
    getCustomerTypes,
    getAllCustomerTypes,
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
    setCurrencyConversionRate,
    getNotifications,
    uploadData
}

function getUsers  (params){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_USERS+`?${params}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

function request(user) { return { type: administrationConstants.GET_USERS_PENDING, user } }
function success(response) { return { type: administrationConstants.GET_USERS_SUCCESS, response } }
function failure(error) { return { type: administrationConstants.GET_USERS_FAILURE, error } }

}

function getAUser  (encodedKey, isEdit){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_USERS+`/${encodedKey}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                if(response.status===200){
                
                    if(isEdit){
                        let consume2 = ApiService.request(routes.HIT_ROLE+`/all`, "GET", null);
                            dispatch(request(consume2));
                            return consume2
                                .then(response2 =>{
                                    
                                    
                                        let consume3 = ApiService.request(routes.GET_BRANCHES + `/all`, "GET", null);
                                        dispatch(request(consume3));
                                        return consume3
                                            .then(response3 => {
                                                dispatch(success(response, response2, response3));
                                            })
                                            .catch(error => {

                                                dispatch(failure(handleRequestErrors(error)));
                                            });
                                    
                                }).catch(error =>{
                                    dispatch(failure(handleRequestErrors(error)));
                                });
                    }else{
                        dispatch(success(response));
                    }
                }else{
                    dispatch(failure(handleRequestErrors("Unable to get the requested User")));
                
                }
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

function request(user) { return { type: administrationConstants.GET_A_USER_PENDING, user } }
function success(response, response2, response3) { 
            if(isEdit){
                return { type: administrationConstants.GET_A_USER_SUCCESS, response,response2, response3 } 
            }else{
                return { type: administrationConstants.GET_A_USER_SUCCESS, response } 
            }
}
            
function failure(error) { return { type: administrationConstants.GET_A_USER_FAILURE, error } }

}

function getAllUsers  (RoleSearchType){
    
    return dispatch =>{
        let consume
        if(RoleSearchType!==null && RoleSearchType!==undefined){
            consume = ApiService.request(routes.HIT_USERS+`/all?RoleSearchType=${RoleSearchType}`, "GET", null);
        }else{
            consume = ApiService.request(routes.HIT_USERS+`/all`, "GET", null);
        }
         
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

function createUser   (newUserPayload){
    if(newUserPayload!=="CLEAR"){
        return dispatch =>{
            if(Object.keys(newUserPayload.address).length>=1){
                let consume = ApiService.request(routes.HIT_USERS, "POST", newUserPayload);
                dispatch(request(consume));
                return consume
                    .then(response =>{
                        dispatch(success(response));
                    }).catch(error =>{
                        
                        dispatch(failure(handleRequestErrors(error)));
                    });
                }else{
                    dispatch(failure(handleRequestErrors("Provide Address information")));
                }
        }
        
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }

    function request(user) { return { type: administrationConstants.CREATE_A_USER_PENDING, user } }
    function success(response) { return { type: administrationConstants.CREATE_A_USER_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.CREATE_A_USER_FAILURE, error } }
    function clear() { return { type: administrationConstants.CREATE_A_USER_RESET, clear_data:""} }

}

function updateAUser   (updateUserPayload){
    if(updateUserPayload!=="CLEAR"){
        return dispatch =>{
            let url = routes.HIT_USERS+`/${updateUserPayload.encodedKey}`;
            delete updateUserPayload.encodedKey;
            let consume = ApiService.request(url, "POST", updateUserPayload);
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

    function request(user) { return { type: administrationConstants.UPDATE_A_USER_PENDING, user } }
    function success(response) { return { type: administrationConstants.UPDATE_A_USER_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.UPDATE_A_USER_FAILURE, error } }
    function clear() { return { type: administrationConstants.UPDATE_A_USER_RESET, clear_data:""} }

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

function getTransactionChannels  (params){
    
    return dispatch =>{
        // let {PageSize, CurrentPage}= payload;
        let consume = ApiService.request(routes.HIT_TRANSACTION_CHANNEL+`?${params}`, "GET", null);
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
            let consume = ApiService.request(routes.HIT_ROLE, "POST", rolePayload);
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
    function clear() { return { type: administrationConstants.CREATE_A_ROLE_RESET, clear_data:""} }
}

function updateARole  (updateRolePayload){
    if(updateRolePayload!=="CLEAR"){
        return dispatch =>{
            let url = routes.HIT_ROLE+`/${updateRolePayload.id}`;
            delete updateRolePayload.id;
            let consume = ApiService.request(url, "POST", updateRolePayload);

           
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


    function request(user) { return { type: administrationConstants.UPDATE_A_ROLE_PENDING, user } }
    function success(response) { return { type: administrationConstants.UPDATE_A_ROLE_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.UPDATE_A_ROLE_FAILURE, error } }
    function clear() { return { type: administrationConstants.UPDATE_A_ROLE_RESET, clear_data:""} }
}

function getRoles  (getRolesPayload){
    
    return dispatch =>{
        let {PageSize, CurrentPage}= getRolesPayload;
        let consume = ApiService.request(routes.HIT_ROLE+`?PageSize=${PageSize}&CurrentPage=${CurrentPage}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
        
    

    function request(user) { return { type: administrationConstants.GET_ROLES_PENDING, user } }
    function success(response) { return { type: administrationConstants.GET_ROLES_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.GET_ROLES_FAILURE, error } }

}

function getARole  (id){
    
    return dispatch =>{
        let consume = ApiService.request(routes.HIT_ROLE+`/${id}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                
                if(response.status===200){
                    let consume2 = ApiService.request(routes.HIT_ROLE+`/permissions`, "GET", null);
                    dispatch(request(consume2));
                    return consume2
                        .then(response2 =>{
                            dispatch(success(response, response2));
                        }).catch(error =>{
                            dispatch(failure(handleRequestErrors(error)));
                        });
                }else{
                    
                    
                    
                    dispatch(failure(handleRequestErrors("Unable to get requested Role")));
                   
                }
                

                // dispatch(success(response));
            }).catch(error =>{
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
        
    

    function request(user) { return { type: administrationConstants.GET_A_ROLE_PENDING, user } }
    function success(response, response2) { return { type: administrationConstants.GET_A_ROLE_SUCCESS, response,response2 } }
    function failure(error) { return { type: administrationConstants.GET_A_ROLE_FAILURE, error } }

}

function getAllRoles  (withBranches){
    
    return dispatch =>{
        let consume = ApiService.request(routes.HIT_ROLE+`/all`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                if(withBranches===undefined||withBranches===null || withBranches===false){
                    dispatch(success(response));
                }
                if(withBranches===true){
                    let consume2 = ApiService.request(routes.GET_BRANCHES + `/all`, "GET", null);
                    dispatch(request(consume2));
                    return consume2
                        .then(response2 => {
                            dispatch(success(response, response2));
                        })
                        .catch(error => {

                            dispatch(failure(handleRequestErrors(error)));
                        });
                }
            }).catch(error =>{
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
        
    

    function request(user) { return { type: administrationConstants.GET_ALL_ROLES_PENDING, user } }
    function success(response, response2) { 
                                if(!response2){
                                    return { type: administrationConstants.GET_ALL_ROLES_SUCCESS, response } 
                                }else{
                                    return { type: administrationConstants.GET_ALL_ROLES_SUCCESS, response, response2 } 
                                }
                                    
                                }
    function failure(error) { return { type: administrationConstants.GET_ALL_ROLES_FAILURE, error } }

}

function getAllPermissions  (){
    
    return dispatch =>{
        let consume = ApiService.request(routes.HIT_ROLE+`/permissions`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
        
    

    function request(user) { return { type: administrationConstants.GET_ROLE_PERMISSIONS_PENDING, user } }
    function success(response) { return { type: administrationConstants.GET_ROLE_PERMISSIONS_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.GET_ROLE_PERMISSIONS_FAILURE, error } }

}

function getCustomerTypes  (customerTypesPayload, tempData){
    
        return dispatch =>{
            // let {PageSize, CurrentPage}= customerTypesPayload;
            let consume = ApiService.request(routes.HIT_CUSTOMER_TYPES+`/customertypes?${customerTypesPayload}`, "GET", null);
            dispatch(request(consume, tempData));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    

    

    function request(user, tempData) {
       
        if(tempData===undefined){
            return { type: administrationConstants.GET_CUSTOMERTYPES_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: administrationConstants.GET_CUSTOMERTYPES_PENDING, user, tempData } 
        }
         
    }
    function success(response) { return { type: administrationConstants.GET_CUSTOMERTYPES_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.GET_CUSTOMERTYPES_FAILURE, error } }
    
}

function getAllCustomerTypes  (){
    
        return dispatch =>{
            
            let consume = ApiService.request(routes.HIT_CUSTOMER_TYPES+`/all`, "GET", null);
            dispatch(request(consume));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        
    

    function request(user) { return { type: administrationConstants.GET_ALL_CUSTOMERTYPES_PENDING, user } }
    function success(response) { return { type: administrationConstants.GET_ALL_CUSTOMERTYPES_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.GET_ALL_CUSTOMERTYPES_FAILURE, error } }
    
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
            let url = routes.HIT_CUSTOMER_TYPES+`/customertypes/${updatedCustomerTypePayload.id}`;
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

function getAllCurrencies  (tempData){
    
        return dispatch =>{
            let consume = ApiService.request(routes.GET_ALL_CURRENCIES, "GET", null);
            dispatch(request(consume,tempData));
            return consume
                .then(response =>{
                    dispatch(success(response));
                }).catch(error =>{
                    
                    dispatch(failure(handleRequestErrors(error)));
                });
            
        }
        


    function request(user, tempData) {
        if(tempData===undefined){
            return { type: administrationConstants.GET_ALLCURRENCIES_PENDING, user }
        }
        if(tempData!==undefined){
            return { type: administrationConstants.GET_ALLCURRENCIES_PENDING, user, tempData}
        }
         
    }
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
            // if(Object.keys(accessPreferencePayload).length >1 
            //     && accessPreferencePayload.automaticExpiryOfPassword ===true
            //     && accessPreferencePayload.lockUserAfterFailedLogin ===true)
            
            if(Object.keys(accessPreferencePayload).length >1){
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

function getNotifications(params) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_NOTIFICATIONS +`?${params}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }


    function request(user) { return { type: administrationConstants.GET_NOTIFICATIONS_PENDING, user } }
    function success(response) { return { type: administrationConstants.GET_NOTIFICATIONS_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.GET_NOTIFICATIONS_FAILURE, error } }

}

function uploadData  (uploadDataPayload){
    if(uploadDataPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_UPLOAD_DATA, "POST", uploadDataPayload);
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

    function request(user) { return { type: administrationConstants.UPLOAD_DATA_PENDING, user } }
    function success(response) { return { type: administrationConstants.UPLOAD_DATA_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.UPLOAD_DATA_FAILURE, error } }
    function clear() { return { type: administrationConstants.UPLOAD_DATA_RESET, clear_data:""} }

}