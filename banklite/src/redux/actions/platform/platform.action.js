import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
import { history } from '../../../_helpers/history';
import {platformConstants} from '../../actiontypes/platform/platform.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const platformActions = {
    getAllCompanyInfo,
    getACompanyInfo,
    newCompanyInfo,
    updateCompanyInfo,
    fetchAllCreditScoreByPass,
    fetchSingleCreditScoreByPass,
    createCreditScoreByPass,
    updateCreditScoreByPass,
    fetchAllPayrollGroups,
    getAPayrollGroup,
    createAPayrollGroup,
    updateAPayrollGroup,
    fetchAllCardProvider,
    getACardProvider,
    createACardProvider,
    updateACardProvider,
    fetchAllEmployeeInfo,
    fetchSingleEmployeeInfo,
    createEmployeeInfo,
    updateEmployeeInfo,
    fetchAllBankInfo,
    fetchSingleBankInfo,
    createBankInfo,
    updateBankInfo
}

///Company Info
function getAllCompanyInfo  (params, tempData){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_COMPANY_INFO+`?${params}`, "GET", null);
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
            return { type: platformConstants.GET_ALL_COMPANY_INFO_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: platformConstants.GET_ALL_COMPANY_INFO_PENDING, user, tempData } 
        }
    }
        

    
    function success(response) { return { type: platformConstants.GET_ALL_COMPANY_INFO_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.GET_ALL_COMPANY_INFO_FAILURE, error } }

}

function getACompanyInfo  (encodedKey){
    if(encodedKey!=="CLEAR"){
        return dispatch =>{
            
            let consume = ApiService.request(routes.HIT_COMPANY_INFO+`/${encodedKey}`, "GET", null);
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

        

    function request(user) { return { type: platformConstants.GET_A_COMPANY_INFO_PENDING, user } }
    function success(response) { return { type: platformConstants.GET_A_COMPANY_INFO_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.GET_A_COMPANY_INFO_FAILURE, error } }
    function clear() { return { type: platformConstants.GET_A_COMPANY_INFO_RESET, clear_data:""} }
}

function newCompanyInfo  (payload){
    if(payload!=="CLEAR"){
        return dispatch =>{
            
            let consume = ApiService.request(routes.HIT_COMPANY_INFO, "POST", payload);
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

        

    function request(user) { return { type: platformConstants.ADD_A_COMPANY_INFO_PENDING, user } }
    function success(response) { return { type: platformConstants.ADD_A_COMPANY_INFO_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.ADD_A_COMPANY_INFO_FAILURE, error } }
    function clear() { return { type: platformConstants.ADD_A_COMPANY_INFO_RESET, clear_data:""} }
}

function updateCompanyInfo  (payload, encodedKey){
    if(payload!=="CLEAR"){
        return dispatch =>{
            
            let consume = ApiService.request(routes.HIT_COMPANY_INFO+`/${encodedKey}`, "POST", payload);
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

        

    function request(user) { return { type: platformConstants.UPDATE_A_COMPANY_INFO_PENDING, user } }
    function success(response) { return { type: platformConstants.UPDATE_A_COMPANY_INFO_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.UPDATE_A_COMPANY_INFO_FAILURE, error } }
    function clear() { return { type: platformConstants.UPDATE_A_COMPANY_INFO_RESET, clear_data:""} }
}

///WhiteList
function fetchAllCreditScoreByPass  (params,tempData){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_LOAN_CREDIT_SCORE_PASS+`?${params}`, "GET", null);
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
            return { type: platformConstants.FETCH_ALLCREDIT_SCORE_BYPASS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: platformConstants.FETCH_ALLCREDIT_SCORE_BYPASS_PENDING, user, tempData } 
        }
    }

    
    function success(response) { return { type: platformConstants.FETCH_ALLCREDIT_SCORE_BYPASS_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.FETCH_ALLCREDIT_SCORE_BYPASS_FAILURE, error } }
    
}

function fetchSingleCreditScoreByPass  (params){
    if(params!=="CLEAR"){
        return dispatch =>{
            
            let consume = ApiService.request(routes.HIT_LOAN_CREDIT_SCORE_PASS+`/${params}`, "GET", null);
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

    function request(user) { return { type: platformConstants.FETCH_SINGLECREDIT_SCORE_BYPASS_PENDING, user } }
    function success(response) { return { type: platformConstants.FETCH_SINGLECREDIT_SCORE_BYPASS_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.FETCH_SINGLECREDIT_SCORE_BYPASS_FAILURE, error } }
    function clear() { return { type: platformConstants.FETCH_SINGLECREDIT_SCORE_BYPASS_RESET, clear_data:""} }
}

function createCreditScoreByPass  (requestPayload){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_LOAN_CREDIT_SCORE_PASS, "POST", requestPayload);
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

    function request(user) { return { type: platformConstants.CREATE_CREDIT_SCORE_BYPASS_PENDING, user } }
    function success(response) { return { type: platformConstants.CREATE_CREDIT_SCORE_BYPASS_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.CREATE_CREDIT_SCORE_BYPASS_FAILURE, error } }
    function clear() { return { type: platformConstants.CREATE_CREDIT_SCORE_BYPASS_RESET, clear_data:""} }

}

function updateCreditScoreByPass  (requestPayload, bypasstype){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_LOAN_CREDIT_SCORE_PASS+`/${bypasstype}`, "POST", requestPayload);
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

    function request(user) { return { type: platformConstants.UPDATE_CREDIT_SCORE_BYPASS_PENDING, user } }
    function success(response) { return { type: platformConstants.UPDATE_CREDIT_SCORE_BYPASS_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.UPDATE_CREDIT_SCORE_BYPASS_FAILURE, error } }
    function clear() { return { type: platformConstants.UPDATE_CREDIT_SCORE_BYPASS_RESET, clear_data:""} }

}

///PAYROLL GROUP
function fetchAllPayrollGroups  (params,tempData){
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_PAYROLL_GORUP+`?${params}`, "GET", null);
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
            return { type: platformConstants.GET_ALL_PAYROLLGROUP_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: platformConstants.GET_ALL_PAYROLLGROUP_PENDING, user, tempData } 
        }
    }

    
    function success(response) { return { type: platformConstants.GET_ALL_PAYROLLGROUP_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.GET_ALL_PAYROLLGROUP_FAILURE, error } }
    
}

function getAPayrollGroup  (encodedKey){
    if(encodedKey!=="CLEAR"){
        return dispatch =>{
            
            let consume = ApiService.request(routes.HIT_PAYROLL_GORUP+`/${encodedKey}`, "GET", null);
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

        

    function request(user) { return { type: platformConstants.GET_A_PAYROLLGROUP_PENDING, user } }
    function success(response) { return { type: platformConstants.GET_A_PAYROLLGROUP_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.GET_A_PAYROLLGROUP_FAILURE, error } }
    function clear() { return { type: platformConstants.GET_A_PAYROLLGROUP_RESET, clear_data:""} }
}


function createAPayrollGroup  (requestPayload){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_PAYROLL_GORUP, "POST", requestPayload);
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

    function request(user) { return { type: platformConstants.ADD_A_PAYROLLGROUP_PENDING, user } }
    function success(response) { return { type: platformConstants.ADD_A_PAYROLLGROUP_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.ADD_A_PAYROLLGROUP_FAILURE, error } }
    function clear() { return { type: platformConstants.ADD_A_PAYROLLGROUP_RESET, clear_data:""} }

}

function updateAPayrollGroup  (requestPayload, encodedKey){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_PAYROLL_GORUP+`/${encodedKey}`, "POST", requestPayload);
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

    function request(user) { return { type: platformConstants.UPDATE_A_PAYROLLGROUP_PENDING, user } }
    function success(response) { return { type: platformConstants.UPDATE_A_PAYROLLGROUP_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.UPDATE_A_PAYROLLGROUP_FAILURE, error } }
    function clear() { return { type: platformConstants.UPDATE_A_PAYROLLGROUP_RESET, clear_data:""} }

}

///Card Provider
function fetchAllCardProvider  (params,tempData){
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_CARD_PROVIDER+`?${params}`, "GET", null);
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
            return { type: platformConstants.GET_ALL_CARDPROVIDER_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: platformConstants.GET_ALL_CARDPROVIDER_PENDING, user, tempData } 
        }
    }

    
    function success(response) { return { type: platformConstants.GET_ALL_CARDPROVIDER_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.GET_ALL_CARDPROVIDER_FAILURE, error } }
    
}

function getACardProvider  (encodedKey){
    if(encodedKey!=="CLEAR"){
        return dispatch =>{
            
            let consume = ApiService.request(routes.HIT_CARD_PROVIDER+`/${encodedKey}`, "GET", null);
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

        

    function request(user) { return { type: platformConstants.GET_A_CARDPROVIDER_PENDING, user } }
    function success(response) { return { type: platformConstants.GET_A_CARDPROVIDER_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.GET_A_CARDPROVIDER_FAILURE, error } }
    function clear() { return { type: platformConstants.GET_A_CARDPROVIDER_RESET, clear_data:""} }
}

function createACardProvider  (requestPayload){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_CARD_PROVIDER, "POST", requestPayload);
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

    function request(user) { return { type: platformConstants.ADD_A_CARDPROVIDER_PENDING, user } }
    function success(response) { return { type: platformConstants.ADD_A_CARDPROVIDER_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.ADD_A_CARDPROVIDER_FAILURE, error } }
    function clear() { return { type: platformConstants.ADD_A_CARDPROVIDER_RESET, clear_data:""} }

}

function updateACardProvider  (requestPayload, encodedKey){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_CARD_PROVIDER+`/${encodedKey}`, "POST", requestPayload);
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

    function request(user) { return { type: platformConstants.UPDATE_A_CARDPROVIDER_PENDING, user } }
    function success(response) { return { type: platformConstants.UPDATE_A_CARDPROVIDER_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.UPDATE_A_CARDPROVIDER_FAILURE, error } }
    function clear() { return { type: platformConstants.UPDATE_A_CARDPROVIDER_RESET, clear_data:""} }

}

///Employee Info
function fetchAllEmployeeInfo  (params,tempData){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_EMPLOYEE_PAYROLL_INFO+`?${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response =>{
                let consume2 = ApiService.request(`${routes.HIT_PAYROLL_GORUP}?PageSize=5000&CurrentPage=1&ShowDeactivated=true`, "GET", null);
                dispatch(request(consume2, tempData));
                return consume2
                    .then(response2 => {
                        // dispatch(success(response, response2));
                        let consume3 = ApiService.request(`${routes.HIT_DISBURSEMENT}/banks`, "GET", null);
                            dispatch(request(consume3, tempData));
                            return consume3
                                .then(response3 => {
                                    dispatch(success(response, response2, response3));
                                }).catch(error => {
                                    dispatch(success(response));
                                    // dispatch(failure(handleRequestErrors(error)));
                                });
                    }).catch(error => {
                        dispatch(success(response));
                        // dispatch(failure(handleRequestErrors(error)));
                    });
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    
    
    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: platformConstants.GET_ALL_PAYROLLINFO_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: platformConstants.GET_ALL_PAYROLLINFO_PENDING, user, tempData } 
        }
    }

    
    function success(response, response2, response3) { return { type: platformConstants.GET_ALL_PAYROLLINFO_SUCCESS, response, response2, response3 } }
    function failure(error) { return { type: platformConstants.GET_ALL_PAYROLLINFO_FAILURE, error } }
    
}

function fetchSingleEmployeeInfo  (params){
    if(params!=="CLEAR"){
        return dispatch =>{
            
            let consume = ApiService.request(routes.HIT_EMPLOYEE_PAYROLL_INFO+`/${params}`, "GET", null);
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

    function request(user) { return { type: platformConstants.GET_A_PAYROLLINFO_PENDING, user } }
    function success(response) { return { type: platformConstants.GET_A_PAYROLLINFO_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.GET_A_PAYROLLINFO_FAILURE, error } }
    function clear() { return { type: platformConstants.GET_A_PAYROLLINFO_RESET, clear_data:""} }
}

function createEmployeeInfo  (requestPayload){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_EMPLOYEE_PAYROLL_INFO, "POST", requestPayload);
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

    function request(user) { return { type: platformConstants.ADD_A_PAYROLLINFO_PENDING, user } }
    function success(response) { return { type: platformConstants.ADD_A_PAYROLLINFO_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.ADD_A_PAYROLLINFO_FAILURE, error } }
    function clear() { return { type: platformConstants.ADD_A_PAYROLLINFO_RESET, clear_data:""} }

}

function updateEmployeeInfo  (requestPayload, encodedKey){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_EMPLOYEE_PAYROLL_INFO+`/${encodedKey}`, "POST", requestPayload);
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

    function request(user) { return { type: platformConstants.UPDATE_A_PAYROLLINFO_PENDING, user } }
    function success(response) { return { type: platformConstants.UPDATE_A_PAYROLLINFO_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.UPDATE_A_PAYROLLINFO_FAILURE, error } }
    function clear() { return { type: platformConstants.UPDATE_A_PAYROLLINFO_RESET, clear_data:""} }

}

///Banks Info
function fetchAllBankInfo  (params,tempData){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_BANK_INFO+`?${params}`, "GET", null);
        dispatch(request(consume,tempData));
        return consume
            .then(response =>{
                let consume3 = ApiService.request(`${routes.HIT_DISBURSEMENT}/banks`, "GET", null);
                    dispatch(request(consume3, tempData));
                    return consume3
                        .then(response3 => {
                            dispatch(success(response, response3));
                        }).catch(error => {
                            dispatch(success(response));
                            // dispatch(failure(handleRequestErrors(error)));
                        });
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    
    
    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: platformConstants.GET_ALL_BANKINFO_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: platformConstants.GET_ALL_BANKINFO_PENDING, user, tempData } 
        }
    }

    
    function success(response, response2) { return { type: platformConstants.GET_ALL_BANKINFO_SUCCESS, response, response2 } }
    // function success(response, response3) { return { type: platformConstants.GET_ALL_BANKINFO_SUCCESS, response, response3 } }
    function failure(error) { return { type: platformConstants.GET_ALL_BANKINFO_FAILURE, error } }
    
}

function fetchSingleBankInfo  (params){
    if(params!=="CLEAR"){
        return dispatch =>{
            
            let consume = ApiService.request(routes.HIT_BANK_INFO+`/${params}`, "GET", null);
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

    function request(user) { return { type: platformConstants.GET_A_BANKINFO_PENDING, user } }
    function success(response) { return { type: platformConstants.GET_A_BANKINFO_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.GET_A_BANKINFO_FAILURE, error } }
    function clear() { return { type: platformConstants.GET_A_BANKINFO_RESET, clear_data:""} }
}

function createBankInfo  (requestPayload){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_BANK_INFO, "POST", requestPayload);
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

    function request(user) { return { type: platformConstants.ADD_A_BANKINFO_PENDING, user } }
    function success(response) { return { type: platformConstants.ADD_A_BANKINFO_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.ADD_A_BANKINFO_FAILURE, error } }
    function clear() { return { type: platformConstants.ADD_A_BANKINFO_RESET, clear_data:""} }

}

function updateBankInfo  (requestPayload, encodedKey){
    if(requestPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_BANK_INFO+`/${encodedKey}`, "POST", requestPayload);
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

    function request(user) { return { type: platformConstants.UPDATE_A_BANKINFO_PENDING, user } }
    function success(response) { return { type: platformConstants.UPDATE_A_BANKINFO_SUCCESS, response } }
    function failure(error) { return { type: platformConstants.UPDATE_A_BANKINFO_FAILURE, error } }
    function clear() { return { type: platformConstants.UPDATE_A_BANKINFO_RESET, clear_data:""} }

}


