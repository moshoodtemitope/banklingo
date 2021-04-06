import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
import { history } from '../../../_helpers/history';
import {dashboardConstants} from '../../actiontypes/dashboard/dashboard.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const dashboardActions = {
    getDashboardData,
    getActivitiesData,
    getLoggedInUserActivitiesData,
    globalSearchAnItem,
    searchForCustomer,
    reverseATransaction,
    postATransaction,
    openATill,
    addRemoveCashToTill,
    closeUndoCloseToTill,
    fetchTillTransactions,
    fetchLoggedonTills,
    fetchAllTills
}



function getDashboardData() {
    // let requestPayload = {
    //     includeClosed: true,
    //     pageSize: 1000,
    //     currentPage: 1
    // };
    let requestPayload = `?includeClosed=true&pageSize=1000&currentPage=1`;
    return dispatch => {

        let consume = ApiService.request(routes.HIT_DASHBOARD, "GET", null);
        dispatch(request(consume));
        return consume
            .then(response => {
                dispatch(success(response));
                
                
                
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }


    function request(user) { return { type: dashboardConstants.GET_DASHOBOARD_DATA_PENDING, user } }
    function success(response) { return { type: dashboardConstants.GET_DASHOBOARD_DATA_SUCCESS, response } }
    function failure(error) { return { type: dashboardConstants.GET_DASHOBOARD_DATA_FAILURE, error } }

}

function getActivitiesData(params, tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_ACTIVITIES+`/?${params}`, "GET", null);
        dispatch(request(consume, tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: dashboardConstants.GET_ACTIVITIES_DATA_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: dashboardConstants.GET_ACTIVITIES_DATA_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: dashboardConstants.GET_ACTIVITIES_DATA_PENDING, user } }
    function success(response) { return { type: dashboardConstants.GET_ACTIVITIES_DATA_SUCCESS, response } }
    function failure(error) { return { type: dashboardConstants.GET_ACTIVITIES_DATA_FAILURE, error } }

}

function getLoggedInUserActivitiesData(params, tempData) {

    return dispatch => {

        let consume = ApiService.request(routes.HIT_ACTIVITIES+`/loggedinuseractivities?${params}`, "GET", null);
        dispatch(request(consume, tempData));
        return consume
            .then(response => {
                dispatch(success(response));
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }

    function request(user, tempData) { 
        if(tempData===undefined){
            return { type: dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_PENDING, user } 
        }
        if(tempData!==undefined){
            return { type: dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_PENDING, user, tempData } 
        }
    }


    // function request(user) { return { type: dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_PENDING, user } }
    function success(response) { return { type: dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_SUCCESS, response } }
    function failure(error) { return { type: dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_FAILURE, error } }

}

function globalSearchAnItem(params) {
    if(params!=="CLEAR"){
        return dispatch => {

            let consume = ApiService.request(routes.HIT_GLOBAL_SEARCH+`/items?SearchText=${params}`, "GET", null);
            dispatch(request(consume));
            return consume
                .then(response => {
                    dispatch(success(response));
                }).catch(error => {

                    dispatch(failure(handleRequestErrors(error)));
                });

        }
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }



    function request(user) { return { type: dashboardConstants.GLOBAL_SEARCH_ITEM_PENDING, user } }
    function success(response) { return { type: dashboardConstants.GLOBAL_SEARCH_ITEM_SUCCESS, response } }
    function failure(error) { return { type: dashboardConstants.GLOBAL_SEARCH_ITEM_FAILURE, error } }
    function clear() { return { type: dashboardConstants.GLOBAL_SEARCH_ITEM_RESET, clear_data:""} }

}

function searchForCustomer(params) {
    if(params!=="CLEAR"){
        return dispatch => {

            let consume = ApiService.request(routes.HIT_GLOBAL_SEARCH+`/clients?SearchText=${params}`, "GET", null);
            dispatch(request(consume));
            return consume
                .then(response => {
                    dispatch(success(response));
                }).catch(error => {

                    dispatch(failure(handleRequestErrors(error)));
                });

        }
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }



    function request(user) { return { type: dashboardConstants.SEARCH_FOR_CUSTOMER_PENDING, user } }
    function success(response) { return { type: dashboardConstants.SEARCH_FOR_CUSTOMER_SUCCESS, response } }
    function failure(error) { return { type: dashboardConstants.SEARCH_FOR_CUSTOMER_FAILURE, error } }
    function clear() { return { type: dashboardConstants.SEARCH_FOR_CUSTOMER_RESET, clear_data:""} }

}

function reverseATransaction  (depositProductPayload){
    if(depositProductPayload!=="CLEAR"){
        return dispatch =>{
            let consume = ApiService.request(routes.REVERSE_TRANSACTION, "POST", depositProductPayload);
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

    function request(user) { return { type: dashboardConstants.REVERSE_TRANSACTION_PENDING, user } }
    function success(response) { return { type: dashboardConstants.REVERSE_TRANSACTION_SUCCESS, response } }
    function failure(error) { return { type: dashboardConstants.REVERSE_TRANSACTION_FAILURE, error } }
    function clear() { return { type: dashboardConstants.REVERSE_TRANSACTION_RESET, clear_data:""} }

}

function postATransaction  (txtnPayload, transactiontype){
    if(txtnPayload!=="CLEAR"){

        return dispatch =>{
            let consume = ApiService.request(`${routes.TELLER_MANAGEMENT}/${transactiontype}`, "POST", txtnPayload);
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

    function request(user) { return { type: dashboardConstants.POST_TRANSACTION_PENDING, user } }
    function success(response) { return { type: dashboardConstants.POST_TRANSACTION_SUCCESS, response } }
    function failure(error) { return { type: dashboardConstants.POST_TRANSACTION_FAILURE, error } }
    function clear() { return { type: dashboardConstants.POST_TRANSACTION_RESET, clear_data:""} }

}

function openATill  (txtnPayload){
    if(txtnPayload!=="CLEAR"){

        return dispatch =>{
            let consume = ApiService.request(`${routes.TELLER_MANAGEMENT}/opentillcommand`, "POST", txtnPayload);
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

    function request(user) { return { type: dashboardConstants.OPEN_A_TILL_PENDING, user } }
    function success(response) { return { type: dashboardConstants.OPEN_A_TILL_SUCCESS, response } }
    function failure(error) { return { type: dashboardConstants.OPEN_A_TILL_FAILURE, error } }
    function clear() { return { type: dashboardConstants.OPEN_A_TILL_RESET, clear_data:""} }

}

function addRemoveCashToTill  (txtnPayload, action){
    if(txtnPayload!=="CLEAR"){
        let url;
            if(action ==="add"){
                url=`/addcashtotill`;
            }
            if(action ==="remove"){
                url=`/removecashfromtill`;
            }
        return dispatch =>{
            let consume = ApiService.request(`${routes.TELLER_MANAGEMENT}${url}`, "POST", txtnPayload);
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

    function request(user) { return { type: dashboardConstants.ADD_REMOVE_CASH_TO_TILL_PENDING, user } }
    function success(response) { return { type: dashboardConstants.ADD_REMOVE_CASH_TO_TILL_SUCCESS, response } }
    function failure(error) { return { type: dashboardConstants.ADD_REMOVE_CASH_TO_TILL_FAILURE, error } }
    function clear() { return { type: dashboardConstants.ADD_REMOVE_CASH_TO_TILL_RESET, clear_data:""} }

}

function closeUndoCloseToTill  (txtnPayload, action){
    if(txtnPayload!=="CLEAR"){
        
        let url;
            if(action ==="closeTill"){
                url=`/closetill`;
            }
            if(action ==="undoCloseTill"){
                url=`/undoclosetill`;
            }
        return dispatch =>{
            let consume = ApiService.request(`${routes.TELLER_MANAGEMENT}${url}`, "POST", txtnPayload);
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

    function request(user) { return { type: dashboardConstants.CLOSE_UNDOCLOSE_TILL_PENDING, user } }
    function success(response) { return { type: dashboardConstants.CLOSE_UNDOCLOSE_TILL_SUCCESS, response } }
    function failure(error) { return { type: dashboardConstants.CLOSE_UNDOCLOSE_TILL_FAILURE, error } }
    function clear() { return { type: dashboardConstants.CLOSE_UNDOCLOSE_TILL_RESET, clear_data:""} }

}

function fetchTillTransactions(params) {
    let requestPayload = `?includeClosed=true&pageSize=1000&currentPage=1`;
    if(params!=="CLEAR"){
        return dispatch => {

            let consume = ApiService.request(routes.TELLER_MANAGEMENT+`/transactions/${params}`, "GET", null);
            dispatch(request(consume));
            return consume
                .then(response => {
                    dispatch(success(response));
                }).catch(error => {

                    dispatch(failure(handleRequestErrors(error)));
                });

        }
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }



    function request(user) { return { type: dashboardConstants.GET_TILL_TRANSACTIONS_PENDING, user } }
    function success(response) { return { type: dashboardConstants.GET_TILL_TRANSACTIONS_SUCCESS, response } }
    function failure(error) { return { type: dashboardConstants.GET_TILL_TRANSACTIONS_FAILURE, error } }
    function clear() { return { type: dashboardConstants.GET_TILL_TRANSACTIONS_RESET, clear_data:""} }

}

function fetchLoggedonTills(params) {
    let requestPayload = `?includeClosed=true&pageSize=1000&currentPage=1`;
    if(params!=="CLEAR"){
        return dispatch => {

            let consume = ApiService.request(`${routes.TELLER_MANAGEMENT}/fetchloggedontellertills${requestPayload}`, "GET", null);
            dispatch(request(consume));
            return consume
                .then(response => {
                    dispatch(success(response));
                }).catch(error => {

                    dispatch(failure(handleRequestErrors(error)));
                });

        }
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }



    function request(user) { return { type: dashboardConstants.GET_LOGGEDON_TILLS_PENDING, user } }
    function success(response) { return { type: dashboardConstants.GET_LOGGEDON_TILLS_SUCCESS, response } }
    function failure(error) { return { type: dashboardConstants.GET_LOGGEDON_TILLS_FAILURE, error } }
    function clear() { return { type: dashboardConstants.GET_LOGGEDON_TILLS_RESET, clear_data:""} }

}

function fetchAllTills(params) {
    let requestPayload = `?includeClosed=true&pageSize=1000&currentPage=1`;
    
    return dispatch => {
        let consume2 = ApiService.request(`${routes.TELLER_MANAGEMENT}/fetchtills${requestPayload}`, "GET", null);
                dispatch(request(consume2));
                return consume2
                    .then(response2 => {
                       
                        let consume4 = ApiService.request(`${routes.HIT_USERS}/all?RoleSearchType=2`, "GET", null);
                
                                dispatch(request(consume4));
                                return consume4
                                    .then(response4 => {
                                        let consume5 = ApiService.request(`${routes.GET_ALL_CURRENCIES}`, "GET", null);
                
                                        dispatch(request(consume5));
                                        return consume5
                                            .then(response5 => {
                                                dispatch(success( response2, response4, response5));
                                            }).catch(error4 => {
                
                                                dispatch(failure(handleRequestErrors(error4)));
                                            });
                                        // dispatch(success(response, response2, response3, response4));
                                    }).catch(error3 => {
        
                                        dispatch(failure(handleRequestErrors(error3)));
                                    });
                    }).catch(error2 => {

                        dispatch(failure(handleRequestErrors(error2)));
                    });
    }
    



    function request(user) { return { type: dashboardConstants.GET_ALL_TILLS_PENDING, user } }
    function success(response2,  response4,response5) { return { type: dashboardConstants.GET_ALL_TILLS_SUCCESS,  response2,  response4,response5 } }
    function failure(error) { return { type: dashboardConstants.GET_ALL_TILLS_FAILURE, error } }
    // function clear() { return { type: dashboardConstants.GET_ALL_TILLS_RESET, clear_data:""} }

}