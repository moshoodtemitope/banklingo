import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {administrationConstants} from '../../actiontypes/administration/administration.constants'
import { handleRequestErrors } from "../../../shared/utils";


export const administrationActions = {
    getUsers,
    createUser,
    getAUser,
    getAUserActivities,
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
    
    getInterBranchTransferList,
    interbranchGlActions,

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
    // getAllBranches,
    // getBranchesClosures,
    // getBranchesOpen,
    // getBranchesClosed,
    // openABranch,
    // closeABranch,
    // fetchBranchesList,
    // getABranch,
    // createNewBranch,
    // updateABranch,
    getAllCurrencies,
    updateCurrency,
    setCurrencyConversionRate,
    getNotifications,
    uploadData,
    fetchAllCreditScoreByPass,
    fetchSingleCreditScoreByPass,
    createCreditScoreByPass,
    updateCreditScoreByPass,
    fetchAllNotificationTemplate,
    getANotificationTemplate,
    createANotificationTemplate,
    updateANotificationTemplate,
    fetchAllChannelServices,
    getAChannelServices,
    createAChannelServices,
    updateAChannelServices,
    fetchAllRiskLevel,
    getARiskLevel,
    createARiskLevel,
    updateARiskLevel,
    fetchAllTasks
}

function getUsers  (params, tempData){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_USERS+`?${params}`, "GET", null);
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
        return { type: administrationConstants.GET_USERS_PENDING, user } 
    }
    if(tempData!==undefined){
        return { type: administrationConstants.GET_USERS_PENDING, user, tempData } 
    }
    
}
    

// function request(user) { return { type: administrationConstants.GET_USERS_PENDING, user } }
function success(response) { return { type: administrationConstants.GET_USERS_SUCCESS, response } }
function failure(error) { return { type: administrationConstants.GET_USERS_FAILURE, error } }

}

function getAUser  (encodedKey, isEdit){
    
    return dispatch =>{
        let url;
        if(encodedKey!==null && encodedKey!==undefined){
            url = `${routes.HIT_USERS}/${encodedKey}`;
        }else{
            url = `${routes.HIT_USERS}/myuserdetails`;
        }   
        let consume = ApiService.request(url, "GET", null);
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

function getAUserActivities  (userEncodedKey, params){
    
    return dispatch =>{
        let consume = ApiService.request(`${routes.HIT_ACTIVITIES}/user/${userEncodedKey}?${params}`, "GET", null);
        
         
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

function request(user) { return { type: administrationConstants.GET_A_USER_ACTIVITIES_PENDING, user } }
function success(response) { return { type: administrationConstants.GET_A_USER_ACTIVITIES_SUCCESS, response } }
function failure(error) { return { type: administrationConstants.GET_A_USER_ACTIVITIES_FAILURE, error } }

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
            // if(Object.keys(newUserPayload.address).length>=1){
                let consume = ApiService.request(routes.HIT_USERS, "POST", newUserPayload);
                dispatch(request(consume));
                return consume
                    .then(response =>{
                        dispatch(success(response));
                    }).catch(error =>{
                        
                        dispatch(failure(handleRequestErrors(error)));
                    });
            // }else{
            //     dispatch(failure("Provide Address information"));
            // }
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

function getInterBranchTransferList() {

    return dispatch => {

        let consume = ApiService.request(`${routes.GET_BRANCHES}/allowedbranches`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response => {
                let consume2 = ApiService.request(routes.INTER_BRANCH_GL, "GET", null);
                dispatch(request(consume2));
                return consume2
                    .then(response2 => {
                        let consume3 = ApiService.request(routes.GET_ALL_CURRENCIES, "GET", null);
                        dispatch(request(consume3));
                        return consume3
                            .then(response3 => {
                                let consume4 = ApiService.request(routes.ALL_GLACCOUNTS, "GET", null);
                                dispatch(request(consume4));
                                return consume4
                                    .then(response4 => {
                                        dispatch(success(response, response2, response3, response4));
                                    }).catch(error => {

                                        dispatch(failure(handleRequestErrors(error)));
                                    });
                            }).catch(error => {

                                dispatch(failure(handleRequestErrors(error)));
                            });

                    }).catch(error => {

                        dispatch(failure(handleRequestErrors(error)));
                    });

            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }


    function request(user) { return { type: administrationConstants.GET_ALL_INTER_BRANCH_GL_PENDING, user } }
    function success(response, response2, response3, response4) { return { type: administrationConstants.GET_ALL_INTER_BRANCH_GL_SUCCESS, response, response2, response3, response4 } }
    function failure(error) { return { type: administrationConstants.GET_ALL_INTER_BRANCH_GL_FAILURE, error } }

}

function interbranchGlActions   (requestPayload, action){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume;

            
            if(action==="create"){
                consume = ApiService.request(`${routes.INTER_BRANCH_GL}/addinterbranch`, "POST", requestPayload);
            }

            if(action==="remove"){
                consume = ApiService.request(`${routes.INTER_BRANCH_GL}/removeinterbranchcontrol`, "POST", requestPayload);
            }
            
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

    function request(user) { return { type: administrationConstants.INTER_BRANCHGL_ACTION_PENDING, user } }
    function success(response) { return { type: administrationConstants.INTER_BRANCHGL_ACTION_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.INTER_BRANCHGL_ACTION_FAILURE, error } }
    function clear() { return { type: administrationConstants.INTER_BRANCHGL_ACTION_RESET, clear_data:""} }

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

function getTransactionChannels  (params, tempData){
   
    return dispatch =>{
        // let {PageSize, CurrentPage}= payload;
        var tempValue = tempData;
        let consume = ApiService.request(routes.HIT_TRANSACTION_CHANNEL+`?${params}`, "GET", null);
        dispatch(request(consume, tempData));
        // let tempValue = tempData;
        return consume
            .then(response =>{
                
                let consume2 = ApiService.request(routes.ALL_GLACCOUNTS, "GET", null);

                // console.log("ddsdsbd", tempValue);
                dispatch(request(consume2, tempValue));

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
    

function request(user, tempData) { 
    if(tempData===undefined){
        return { type: administrationConstants.GET_TRANSACTION_CHANNELS_PENDING, user } 
    }
    if(tempData!==undefined){
        return { type: administrationConstants.GET_TRANSACTION_CHANNELS_PENDING, user, tempData } 
    }
    
}
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

function getRoles  (getRolesPayload, tempData, isAll){
    
    return dispatch =>{
        let PageSize, CurrentPage;
        if(!isAll){
            PageSize= getRolesPayload.PageSize;
            CurrentPage=getRolesPayload.CurrentPage;
        }
        let consume;
        if(!isAll){
            consume = ApiService.request(routes.HIT_ROLE+`?PageSize=${PageSize}&CurrentPage=${CurrentPage}`, "GET", null);
        }else{
            consume = ApiService.request(routes.HIT_ROLE+'/all', "GET", null);
        }
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
            return { type: administrationConstants.GET_ROLES_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: administrationConstants.GET_ROLES_PENDING, user, tempData } 
        }
        
    }

    
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

function getAllRoles  (withBranches, withCurrencies){
    
    return dispatch =>{
        let consume = ApiService.request(routes.HIT_ROLE+`/all`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                if(withBranches===undefined||withBranches===null || withBranches===false){
                    dispatch(success(response, null, null));
                }
                if(withBranches===true){
                    let consume2 = ApiService.request(routes.GET_BRANCHES + `/all`, "GET", null);
                    dispatch(request(consume2));
                    return consume2
                        .then(response2 => {
                            // dispatch(success(response, response2));
                            if(withCurrencies===true){
                                let consume3 = ApiService.request(routes.GET_ALL_CURRENCIES, "GET", null);
                                dispatch(request(consume3));
                                return consume3
                                    .then(response3 => {
                                        dispatch(success(response, response2, response3));
                                    })
                                    .catch(error => {
            
                                        dispatch(failure(handleRequestErrors(error)));
                                    });
                            }else{
                                dispatch(success(response, response2, null));
                            }
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
    function success(response, response2, response3) { 
                                    // if(!response2){
                                    //     return { type: administrationConstants.GET_ALL_ROLES_SUCCESS, response } 
                                    // }else{
                                    //     return { type: administrationConstants.GET_ALL_ROLES_SUCCESS, response, response2 } 
                                    // }

                                    return { type: administrationConstants.GET_ALL_ROLES_SUCCESS, response, response2, response3 } 
                                    
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

function getAllCurrencies  (tempData, isOnlyCurrencies){
    
        return dispatch =>{
            let consume = ApiService.request(routes.GET_ALL_CURRENCIES, "GET", null);
            dispatch(request(consume,tempData));
            return consume
                .then(response =>{
                    // dispatch(success(response));
                    if (!isOnlyCurrencies) {
                        let consume2 = ApiService.request(routes.GET_EXCHANGE_RATE, "GET", null);
                        dispatch(request(consume2, tempData));
                        return consume2
                            .then(response2 => {
                                // dispatch(success(response2));
                                let consume3 = ApiService.request(routes.GET_CONVERSION_TABLE, "GET", null);
                                dispatch(request(consume3, tempData));
                                return consume3
                                    .then(response3 => {
                                        dispatch(success(response, response2, response3));
                                    }).catch(error => {

                                        dispatch(failure(handleRequestErrors(error)));
                                    });
                            }).catch(error => {

                                dispatch(failure(handleRequestErrors(error)));
                            });
                    }else{
                        dispatch(success(response));
                    }
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
    function success(response, response2, response3) { return { type: administrationConstants.GET_ALLCURRENCIES_SUCCESS, response, response2, response3 } }
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





// function getAllBranches  (params, tempData){
    
//     return dispatch =>{
        
//         let consume = ApiService.request(routes.GET_BRANCHES+'?'+params, "GET", null);
//         dispatch(request(consume, tempData));
//         return consume
//             .then(response =>{
//                 dispatch(success(response));
//             }).catch(error =>{
                
//                 dispatch(failure(handleRequestErrors(error)));
//             });
        
//     }

//     function request(user, tempData) { 
//         if(tempData===undefined){
//             return { type: administrationConstants.GET_ALL_BRANCHES_PENDING, user } 
//         }
//         if(tempData!==undefined){
//             return { type: administrationConstants.GET_ALL_BRANCHES_PENDING, user, tempData } 
//         }
        
//     }

//     // function request(user) { return { type: administrationConstants.GET_ALL_BRANCHES_PENDING, user } }
//     function success(response) { return { type: administrationConstants.GET_ALL_BRANCHES_SUCCESS, response } }
//     function failure(error) { return { type: administrationConstants.GET_ALL_BRANCHES_FAILURE, error } }

// }
function getNotifications(params,tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_NOTIFICATIONS +`?${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: administrationConstants.GET_NOTIFICATIONS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: administrationConstants.GET_NOTIFICATIONS_PENDING, user, tempData } 
        }
        
    }


    // function request(user) { return { type: administrationConstants.GET_NOTIFICATIONS_PENDING, user } }
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


function fetchAllCreditScoreByPass  (params){
    if(params!=="CLEAR"){
        return dispatch =>{
            
            let consume = ApiService.request(routes.HIT_LOAN_CREDIT_SCORE_PASSS+`?${params}`, "GET", null);
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

    function request(user) { return { type: administrationConstants.FETCH_ALLCREDIT_SCORE_BYPASS_PENDING, user } }
    function success(response) { return { type: administrationConstants.FETCH_ALLCREDIT_SCORE_BYPASS_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.FETCH_ALLCREDIT_SCORE_BYPASS_FAILURE, error } }
    function clear() { return { type: administrationConstants.FETCH_ALLCREDIT_SCORE_BYPASS_RESET, clear_data:""} }
}

function fetchSingleCreditScoreByPass  (params){
    if(params!=="CLEAR"){
        return dispatch =>{
            
            let consume = ApiService.request(routes.HIT_LOAN_CREDIT_SCORE_PASSS+`/${params}`, "GET", null);
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

    function request(user) { return { type: administrationConstants.FETCH_SINGLECREDIT_SCORE_BYPASS_PENDING, user } }
    function success(response) { return { type: administrationConstants.FETCH_SINGLECREDIT_SCORE_BYPASS_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.FETCH_SINGLECREDIT_SCORE_BYPASS_FAILURE, error } }
    function clear() { return { type: administrationConstants.FETCH_SINGLECREDIT_SCORE_BYPASS_RESET, clear_data:""} }
}

function createCreditScoreByPass  (requestPayload){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_LOAN_CREDIT_SCORE_PASSS, "POST", requestPayload);
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

    function request(user) { return { type: administrationConstants.CREATE_CREDIT_SCORE_BYPASS_PENDING, user } }
    function success(response) { return { type: administrationConstants.CREATE_CREDIT_SCORE_BYPASS_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.CREATE_CREDIT_SCORE_BYPASS_FAILURE, error } }
    function clear() { return { type: administrationConstants.CREATE_CREDIT_SCORE_BYPASS_RESET, clear_data:""} }

}

function updateCreditScoreByPass  (requestPayload){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_LOAN_CREDIT_SCORE_PASSS+`/${requestPayload}`, "POST", requestPayload);
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

    function request(user) { return { type: administrationConstants.UPDATE_CREDIT_SCORE_BYPASS_PENDING, user } }
    function success(response) { return { type: administrationConstants.UPDATE_CREDIT_SCORE_BYPASS_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.UPDATE_CREDIT_SCORE_BYPASS_FAILURE, error } }
    function clear() { return { type: administrationConstants.UPDATE_CREDIT_SCORE_BYPASS_RESET, clear_data:""} }

}


///Notification templates
function fetchAllNotificationTemplate  (params,tempData){
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_NOTIFICATIONS_TEMPLATE+`/NotificationTemplates?${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response =>{
                dispatch(success(response,));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    
    
    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: administrationConstants.GET_ALL_NOTIFICATION_TEMPLATE_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: administrationConstants.GET_ALL_NOTIFICATION_TEMPLATE_PENDING, user, tempData } 
        }
    }

    
    function success(response) { return { type: administrationConstants.GET_ALL_NOTIFICATION_TEMPLATE_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.GET_ALL_NOTIFICATION_TEMPLATE_FAILURE, error } }
    
}

function getANotificationTemplate  (encodedKey){
    if(encodedKey!=="CLEAR"){
        return dispatch =>{
            
            let consume = ApiService.request(routes.HIT_NOTIFICATIONS_TEMPLATE+`/NotificationTemplate/${encodedKey}`, "GET", null);
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

        

    function request(user) { return { type: administrationConstants.GET_A_NOTIFICATION_TEMPLATE_PENDING, user } }
    function success(response) { return { type: administrationConstants.GET_A_NOTIFICATION_TEMPLATE_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.GET_A_NOTIFICATION_TEMPLATE_FAILURE, error } }
    function clear() { return { type: administrationConstants.GET_A_NOTIFICATION_TEMPLATE_RESET, clear_data:""} }
}

function createANotificationTemplate  (requestPayload){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_NOTIFICATIONS_TEMPLATE+'/NotificationTemplate', "POST", requestPayload);
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

    function request(user) { return { type: administrationConstants.ADD_A_NOTIFICATION_TEMPLATE_PENDING, user } }
    function success(response) { return { type: administrationConstants.ADD_A_NOTIFICATION_TEMPLATE_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.ADD_A_NOTIFICATION_TEMPLATE_FAILURE, error } }
    function clear() { return { type: administrationConstants.ADD_A_NOTIFICATION_TEMPLATE_RESET, clear_data:""} }

}

function updateANotificationTemplate  (requestPayload, encodedKey){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_NOTIFICATIONS_TEMPLATE+`/NotificationTemplate/${encodedKey}`, "POST", requestPayload);
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

    function request(user) { return { type: administrationConstants.UPDATE_A_NOTIFICATION_TEMPLATE_PENDING, user } }
    function success(response) { return { type: administrationConstants.UPDATE_A_NOTIFICATION_TEMPLATE_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.UPDATE_A_NOTIFICATION_TEMPLATE_FAILURE, error } }
    function clear() { return { type: administrationConstants.UPDATE_A_NOTIFICATION_TEMPLATE_RESET, clear_data:""} }

}

///Channel Services
function fetchAllChannelServices  (params,tempData){
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_TRANASACTION_SERVICES+`/ChannelServices?${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                
                let consume2 = ApiService.request(routes.ALL_GLACCOUNTS, "GET", null);
                dispatch(request(consume2, tempData));
                return consume2
                    .then(response2 => {
                        dispatch(success(response, response2));
                    }).catch(error => {
                        dispatch(success(response));
                        // dispatch(failure(handleRequestErrors(error)));
                    });
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    
    
    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: administrationConstants.GET_ALL_CHANNEL_SERVICE_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: administrationConstants.GET_ALL_CHANNEL_SERVICE_PENDING, user, tempData } 
        }
    }

    
    function success(response, response2) { return { type: administrationConstants.GET_ALL_CHANNEL_SERVICE_SUCCESS, response, response2 } }
    function failure(error) { return { type: administrationConstants.GET_ALL_CHANNEL_SERVICE_FAILURE, error } }
    
}

function getAChannelServices  (encodedKey){
    if(encodedKey!=="CLEAR"){
        return dispatch =>{
            
            let consume = ApiService.request(routes.HIT_TRANASACTION_SERVICES+`/ChannelServices/${encodedKey}`, "GET", null);
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

        

    function request(user) { return { type: administrationConstants.GET_A_CHANNEL_SERVICE_PENDING, user } }
    function success(response) { return { type: administrationConstants.GET_A_CHANNEL_SERVICE_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.GET_A_CHANNEL_SERVICE_FAILURE, error } }
    function clear() { return { type: administrationConstants.GET_A_CHANNEL_SERVICE_RESET, clear_data:""} }
}

function createAChannelServices  (requestPayload){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_TRANASACTION_SERVICES+`/ChannelService`, "POST", requestPayload);
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

    function request(user) { return { type: administrationConstants.ADD_A_CHANNEL_SERVICE_PENDING, user } }
    function success(response) { return { type: administrationConstants.ADD_A_CHANNEL_SERVICE_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.ADD_A_CHANNEL_SERVICE_FAILURE, error } }
    function clear() { return { type: administrationConstants.ADD_A_CHANNEL_SERVICE_RESET, clear_data:""} }

}

function updateAChannelServices  (requestPayload, encodedKey){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_TRANASACTION_SERVICES+`/ChannelService/${encodedKey}`, "POST", requestPayload);
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

    function request(user) { return { type: administrationConstants.UPDATE_A_CHANNEL_SERVICE_PENDING, user } }
    function success(response) { return { type: administrationConstants.UPDATE_A_CHANNEL_SERVICE_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.UPDATE_A_CHANNEL_SERVICE_FAILURE, error } }
    function clear() { return { type: administrationConstants.UPDATE_A_CHANNEL_SERVICE_RESET, clear_data:""} }

}

//Risk Levels
function fetchAllRiskLevel  (params,tempData){
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_RISK_LEVEL+`/RiskLevels?${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                
                let consume2 = ApiService.request(routes.ALL_GLACCOUNTS, "GET", null);
                dispatch(request(consume2, tempData));
                return consume2
                    .then(response2 => {
                        dispatch(success(response, response2));
                    }).catch(error => {
                        dispatch(success(response));
                        // dispatch(failure(handleRequestErrors(error)));
                    });
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    
    
    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: administrationConstants.GET_ALL_RISK_LEVEL_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: administrationConstants.GET_ALL_RISK_LEVEL_PENDING, user, tempData } 
        }
    }

    
    function success(response, response2) { return { type: administrationConstants.GET_ALL_RISK_LEVEL_SUCCESS, response, response2 } }
    function failure(error) { return { type: administrationConstants.GET_ALL_RISK_LEVEL_FAILURE, error } }
    
}

function getARiskLevel  (encodedKey){
    if(encodedKey!=="CLEAR"){
        return dispatch =>{
            
            let consume = ApiService.request(routes.HIT_RISK_LEVEL+`/RiskLevels/${encodedKey}`, "GET", null);
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

        

    function request(user) { return { type: administrationConstants.GET_A_RISK_LEVEL_PENDING, user } }
    function success(response) { return { type: administrationConstants.GET_A_RISK_LEVEL_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.GET_A_RISK_LEVEL_FAILURE, error } }
    function clear() { return { type: administrationConstants.GET_A_RISK_LEVEL_RESET, clear_data:""} }
}

function createARiskLevel  (requestPayload){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_RISK_LEVEL+`/RiskLevel`, "POST", requestPayload);
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

    function request(user) { return { type: administrationConstants.ADD_A_RISK_LEVEL_PENDING, user } }
    function success(response) { return { type: administrationConstants.ADD_A_RISK_LEVEL_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.ADD_A_RISK_LEVEL_FAILURE, error } }
    function clear() { return { type: administrationConstants.ADD_A_RISK_LEVEL_RESET, clear_data:""} }

}

function updateARiskLevel  (requestPayload, encodedKey){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_RISK_LEVEL+`/RiskLevels/${encodedKey}`, "POST", requestPayload);
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

    function request(user) { return { type: administrationConstants.UPDATE_A_RISK_LEVEL_PENDING, user } }
    function success(response) { return { type: administrationConstants.UPDATE_A_RISK_LEVEL_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.UPDATE_A_RISK_LEVEL_FAILURE, error } }
    function clear() { return { type: administrationConstants.UPDATE_A_RISK_LEVEL_RESET, clear_data:""} }

}

function fetchAllTasks  (params,tempData){
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_TASKS+`?${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response => {
                dispatch(success(response));
                
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    
    
    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: administrationConstants.GET_ALL_TASKS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: administrationConstants.GET_ALL_TASKS_PENDING, user, tempData } 
        }
    }

    
    function success(response) { return { type: administrationConstants.GET_ALL_TASKS_SUCCESS, response } }
    function failure(error) { return { type: administrationConstants.GET_ALL_TASKS_FAILURE, error } }
    
}