import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {productsConstants} from '../../actiontypes/products/products.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const productActions = {
    getAllLoanProducts,
    getSingleLoanProduct,
    createLoanProduct
    
}

function getAllLoanProducts  (params){
    
    return dispatch =>{
        
        let consume = ApiService.request(routes.HIT_LOAN_PRODUCTS+`/all?${params}`, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response =>{
                dispatch(success(response));
            }).catch(error =>{
                
                dispatch(failure(handleRequestErrors(error)));
            });
        
    }
    

    function request(user) { return { type: productsConstants.GET_ALL_LOAN_PRODUCTS_PENDING, user } }
    function success(response) { return { type: productsConstants.GET_ALL_LOAN_PRODUCTS_SUCCESS, response } }
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
