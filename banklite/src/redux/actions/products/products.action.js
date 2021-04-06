import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {productsConstants} from '../../actiontypes/products/products.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const productActions = {
    getLoanProducts,
    getAllLoanProducts,
    getFullLoanProducts,
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
        let consume;

        if(fetchDetailsOfFirstProduct===true){
            consume = ApiService.request(routes.HIT_LOAN_PRODUCTS+`?${params}`, "GET", null);
        }else{
         consume = ApiService.request(routes.HIT_LOAN_PRODUCTS+`/all?${params}`, "GET", null);
        }
        dispatch(request(consume));
        return consume
            .then(response =>{

                if(response.status===200){
                    let allLoanProducts;
                    if(response.data.result!==undefined && response.data.result!==null){
                        allLoanProducts = response.data.result;
                    }else{
                        allLoanProducts = response.data;
                    }
                     
                    if(fetchDetailsOfFirstProduct===true && response.data.result!==undefined && response.data.result!==null && response.data.result.length>=1){
                        
                        allLoanProducts = allLoanProducts.filter(product=>product.loanProductType===0)[0];
                        // let encodedKey = response.data[0].loanProductEncodedKey;
                        let encodedKey = allLoanProducts.productEncodedKey;
                        // console.log("aaaaaa", allLoanProducts);

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

function getFullLoanProducts  (){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_LOAN_PRODUCTS+`/loanproductsfull`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{

                if(response.status===200){
                    dispatch(success(response));
                }else{
                    dispatch(failure("No results found"));
                }
                
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

    function request(user) { return { type: productsConstants.GET_FULL_LOAN_PRODUCTS_PENDING, user } }
    function success(response, ) { return { type: productsConstants.GET_FULL_LOAN_PRODUCTS_SUCCESS, response } }
    function failure(error) { return { type: productsConstants.GET_FULL_LOAN_PRODUCTS_FAILURE, error } }

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


function getAllDepositProducts  (fetchDetailsOfFirstProduct, fetchCurrency){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_DEPOSIT_PRODUCTS+`/all`, "GET", null);

        let filteredProduct=[];
        dispatch(request(consume));
        return consume
            .then(response =>{
                if(response.status===200){
                    if(fetchDetailsOfFirstProduct===true && response.data.length>=1){
                        // filteredProduct = response.data.filter(eachProduct.)
                        
                        let encodedKey = response.data[0].productEncodedKey;
                        

                        let consume2 = ApiService.request(routes.HIT_DEPOSIT_PRODUCTS+`/${encodedKey}`, "GET", null);
                        dispatch(request(consume2));
                        return consume2
                            .then(response2 =>{
                                if(!fetchCurrency){
                                    dispatch(success(response, response2, null));
                                }
                                if(fetchCurrency===true){
                                    let consume3 = ApiService.request(routes.GET_ALL_CURRENCIES, "GET", null);
                                    dispatch(request(consume3));
                                    return consume3
                                        .then(response3 =>{
                                            dispatch(success(response, response2, response3));
                                        }).catch(error =>{
                                            
                                            dispatch(failure(handleRequestErrors(error)));
                                        });
                                }
                            }).catch(error =>{
                                
                                dispatch(failure(handleRequestErrors(error)));
                            });
                    }else{
                        // console.log("####", response)
                        // dispatch(success(response));
                        if(!fetchCurrency){
                            dispatch(success(response));
                        }
                        if(fetchCurrency===true){
                            let consume3 = ApiService.request(routes.GET_ALL_CURRENCIES, "GET", null);
                            dispatch(request(consume3));
                            return consume3
                                .then(response3 =>{
                                    dispatch(success(response, null, response3));
                                }).catch(error =>{
                                    
                                    dispatch(failure(handleRequestErrors(error)));
                                });
                        }
                    }


                }else{
                    dispatch(failure("No results found"));
                }
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

    function request(user) { return { type: productsConstants.GET_ALL_DEPOSIT_PRODUCTS_PENDING, user } }
    function success(response, response2, response3) { 
        if(response3){
            return { type: productsConstants.GET_ALL_DEPOSIT_PRODUCTS_SUCCESS, response, response2, response3 }     
        }
        if(response2){
            return { type: productsConstants.GET_ALL_DEPOSIT_PRODUCTS_SUCCESS, response, response2 }     
        }
        return { type: productsConstants.GET_ALL_DEPOSIT_PRODUCTS_SUCCESS, response } 
    }
    // function success(response) { return { type: productsConstants.GET_ALL_DEPOSIT_PRODUCTS_SUCCESS, response } }
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
