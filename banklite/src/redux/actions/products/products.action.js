import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {productsConstants} from '../../actiontypes/products/products.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const productActions = {
    getLoanProducts,
    getAllLoanProducts,
    getSingleLoanProduct,
    createLoanProduct,
    updateLoanProduct,
    getDepositProducts,
    getAllDepositProducts,
    getSingleDepositProduct,
    createDepositProduct,
    updateDespositProduct
}

function getLoanProducts  (params, tempData){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_LOAN_PRODUCTS+`?${params}`, "GET", null);
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
            return { type: productsConstants.GET_LOAN_PRODUCTS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: productsConstants.GET_LOAN_PRODUCTS_PENDING, user, tempData } 
        }
        
    }
    

    // function request(user) { return { type: productsConstants.GET_LOAN_PRODUCTS_PENDING, user } }
    function success(response) { return { type: productsConstants.GET_LOAN_PRODUCTS_SUCCESS, response } }
    function failure(error) { return { type: productsConstants.GET_LOAN_PRODUCTS_FAILURE, error } }

}

function getAllLoanProducts  (params, fetchDetailsOfFirstProduct){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_LOAN_PRODUCTS+`/all?${params}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{

                if(response.status===200){
                    if(fetchDetailsOfFirstProduct===true && response.data.length>=1){
                        let encodedKey = response.data[0].loanProductEncodedKey;
                        

                        let consume2 = ApiService.request(routes.HIT_LOAN_PRODUCTS+`/${encodedKey}`, "GET", null);
                        dispatch(request(consume2));
                        return consume2
                            .then(response2 =>{
                                dispatch(success(response, response2));
                            }).catch(error =>{
                                
                                dispatch(failure(handleRequestErrors(error)));
                            });
                    }else{

                        dispatch(success(response));
                    }


                }else{
                    dispatch(failure("No results found"));
                }
                
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

    function request(user) { return { type: productsConstants.GET_ALL_LOAN_PRODUCTS_PENDING, user } }
    function success(response, response2) { 
        if(response2){
            return { type: productsConstants.GET_ALL_LOAN_PRODUCTS_SUCCESS, response, response2 }     
        }
        return { type: productsConstants.GET_ALL_LOAN_PRODUCTS_SUCCESS, response } 
    }
    function failure(error) { return { type: productsConstants.GET_ALL_LOAN_PRODUCTS_FAILURE, error } }

}

function getSingleLoanProduct  (encodedKey){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_LOAN_PRODUCTS+`/${encodedKey}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

    function request(user) { return { type: productsConstants.GET_A_LOAN_PRODUCT_PENDING, user } }
    function success(response) { return { type: productsConstants.GET_A_LOAN_PRODUCT_SUCCESS, response } }
    function failure(error) { return { type: productsConstants.GET_A_LOAN_PRODUCT_FAILURE, error } }

}


function createLoanProduct  (loanProductPayload){
    if(loanProductPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_LOAN_PRODUCTS, "POST", loanProductPayload);
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

    function request(user) { return { type: productsConstants.CREATE_A_LOAN_PRODUCT_PENDING, user } }
    function success(response) { return { type: productsConstants.CREATE_A_LOAN_PRODUCT_SUCCESS, response } }
    function failure(error) { return { type: productsConstants.CREATE_A_LOAN_PRODUCT_FAILURE, error } }
    function clear() { return { type: productsConstants.CREATE_A_LOAN_PRODUCT_RESET, clear_data:""} }

}

function updateLoanProduct  (loanProductPayload, encodedKey){
    if(loanProductPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_LOAN_PRODUCTS+`/${encodedKey}`, "POST", loanProductPayload);
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

    function request(user) { return { type: productsConstants.EDIT_A_LOAN_PRODUCT_PENDING, user } }
    function success(response) { return { type: productsConstants.EDIT_A_LOAN_PRODUCT_SUCCESS, response } }
    function failure(error) { return { type: productsConstants.EDIT_A_LOAN_PRODUCT_FAILURE, error } }
    function clear() { return { type: productsConstants.EDIT_A_LOAN_PRODUCT_RESET, clear_data:""} }

}


function getDepositProducts  (params, tempData){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_DEPOSIT_PRODUCTS+`?${params}`, "GET", null);
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
            return { type: productsConstants.GET_DEPOSIT_PRODUCTS_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: productsConstants.GET_DEPOSIT_PRODUCTS_PENDING, user, tempData } 
        }
        
    }
    

    // function request(user) { return { type: productsConstants.GET_DEPOSIT_PRODUCTS_PENDING, user } }
    function success(response) { return { type: productsConstants.GET_DEPOSIT_PRODUCTS_SUCCESS, response } }
    function failure(error) { return { type: productsConstants.GET_DEPOSIT_PRODUCTS_FAILURE, error } }

}


function getAllDepositProducts  (params){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_DEPOSIT_PRODUCTS+`/all?${params}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

    function request(user) { return { type: productsConstants.GET_ALL_DEPOSIT_PRODUCTS_PENDING, user } }
    function success(response) { return { type: productsConstants.GET_ALL_DEPOSIT_PRODUCTS_SUCCESS, response } }
    function failure(error) { return { type: productsConstants.GET_ALL_DEPOSIT_PRODUCTS_FAILURE, error } }

}

function getSingleDepositProduct  (encodedKey){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_DEPOSIT_PRODUCTS+`/${encodedKey}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                console.log("####", response);
                if(response.status===200){
                    dispatch(success(response));
                }
                if(response.status===204){
                    dispatch(failure("The Deposit Product you requested does not exist"));
                }
                
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

    function request(user) { return { type: productsConstants.GET_A_DEPOSIT_PRODUCT_PENDING, user } }
    function success(response) { return { type: productsConstants.GET_A_DEPOSIT_PRODUCT_SUCCESS, response } }
    function failure(error) { return { type: productsConstants.GET_A_DEPOSIT_PRODUCT_FAILURE, error } }

}


function createDepositProduct  (depositProductPayload){
    if(depositProductPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_DEPOSIT_PRODUCTS, "POST", depositProductPayload);
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

    function request(user) { return { type: productsConstants.CREATE_A_DEPOSIT_PRODUCT_PENDING, user } }
    function success(response) { return { type: productsConstants.CREATE_A_DEPOSIT_PRODUCT_SUCCESS, response } }
    function failure(error) { return { type: productsConstants.CREATE_A_DEPOSIT_PRODUCT_FAILURE, error } }
    function clear() { return { type: productsConstants.CREATE_A_DEPOSIT_PRODUCT_RESET, clear_data:""} }

}

function updateDespositProduct  (depositProductPayload, encodedKey){
    if(depositProductPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.HIT_DEPOSIT_PRODUCTS+`/${encodedKey}`, "POST", depositProductPayload);
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

    function request(user) { return { type: productsConstants.EDIT_A_DEPOSIT_PRODUCT_PENDING, user } }
    function success(response) { return { type: productsConstants.EDIT_A_DEPOSIT_PRODUCT_SUCCESS, response } }
    function failure(error) { return { type: productsConstants.EDIT_A_DEPOSIT_PRODUCT_FAILURE, error } }
    function clear() { return { type: productsConstants.EDIT_A_DEPOSIT_PRODUCT_RESET, clear_data:""} }

}
