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
    fetchAllTills,
    fetchManadate,
    
    // getReportFilters,
    getAReport
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
                // dispatch(success(response));
                let consume2 = ApiService.request(`${routes.HIT_TASKS}/mytasksummary`, "GET", null);
                dispatch(request(consume2));
                return consume2
                    .then(response2 => {
                        dispatch(success(response, response2));
                        
                    }).catch(error => {
                        dispatch(success(response, null));
                        // dispatch(failure(handleRequestErrors(error)));
                    });
                
                
            }).catch(error => {

                dispatch(failure(handleRequestErrors(error)));
            });

    }


    function request(user) { return { type: dashboardConstants.GET_DASHOBOARD_DATA_PENDING, user } }
    function success(response, response2) { return { type: dashboardConstants.GET_DASHOBOARD_DATA_SUCCESS, response, response2 } }
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



    function request(user) { return { type: dashboardConstants.SEARCH_FOR_CUSTOMER_PENDING, user } }
    function success(response) { return { type: dashboardConstants.SEARCH_FOR_CUSTOMER_SUCCESS, response } }
    function failure(error) { return { type: dashboardConstants.SEARCH_FOR_CUSTOMER_FAILURE, error } }
    function clear() { return { type: dashboardConstants.SEARCH_FOR_CUSTOMER_RESET, clear_data:""} }

}

function fetchManadate(params, isaccountInfo) {
    if(params!=="CLEAR"){
        return dispatch => {
            console.log("hahaha laiko", isaccountInfo)
            let consume = ApiService.request(routes.HIT_CLIENTS+`/${params}`, "GET", null);
            dispatch(request(consume));
            return consume
                .then(response => {
                    // dispatch(success(response));
                    let consume2 = ApiService.request(routes.HIT_CLIENTS+`/fetchmandate/${params}`, "GET", null);
                    dispatch(request(consume2));
                    return consume2
                        .then(response2 => {
                            let consume3 = ApiService.request(routes.HIT_CLIENTS+`/passport/${params}`, "GET", null);
                            dispatch(request(consume3));
                            return consume3
                                .then(response3 => {
                                    // dispatch(success(response, response2, response3));
                                    if (isaccountInfo) {
                                        let consume4;
                                        if (isaccountInfo.searchItemType === 3) {
                                            consume4 = ApiService.request(routes.HIT_DEPOSITS + `/${isaccountInfo.searchItemEncodedKey}`, "GET", null);
                                        }

                                        if (isaccountInfo.searchItemType === 2) {
                                            consume4 = ApiService.request(routes.HIT_LOAN + `/loandetails/${isaccountInfo.searchItemEncodedKey}`, "GET", null);
                                        }

                                        dispatch(request(consume4));
                                        return consume4
                                            .then(response4 => {
                                                dispatch(success(response, response2, response3, response4));
                                            }).catch(error => {

                                                dispatch(failure(handleRequestErrors(error)));
                                            });
                                    }else{
                                        dispatch(success(response, response2, response3));
                                    }
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
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }



    function request(user) { return { type: dashboardConstants.FETCH_MANDATE_PENDING, user } }
    function success(response,response2,response3, response4) { return { type: dashboardConstants.FETCH_MANDATE_SUCCESS, response,response2,response3, response4 } }
    function failure(error) { return { type: dashboardConstants.FETCH_MANDATE_FAILURE, error } }
    function clear() { return { type: dashboardConstants.FETCH_MANDATE_RESET, clear_data:""} }

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
            let consume;

                
                if(transactiontype === "chequedepositwithteller" 
                    || transactiontype === "chequewithdrawalwithteller"){
                        consume = ApiService.request(`${routes.CHEQUE_MANAGEMENT}/${transactiontype}`, "POST", txtnPayload);
                }else{
                        consume = ApiService.request(`${routes.TELLER_MANAGEMENT}/${transactiontype}`, "POST", txtnPayload);
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
                    // dispatch(success(response));
                    if(response.data.result.length>=1){
                        let consume2 = ApiService.request(`${routes.TELLER_MANAGEMENT}/transactions/${response.data.result[0].tillId}`, "GET", null);
                        dispatch(request(consume2));
                        return consume2
                            .then(response2 => {
                                dispatch(success(response, response2));
                            }).catch(error => {
                                dispatch(success(response, null));
                            });
                    }
                    else{
                        dispatch(success(response, null));
                    }
                }).catch(error => {
                    
                    dispatch(failure(handleRequestErrors(error)));
                });

        }
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }



    function request(user) { return { type: dashboardConstants.GET_LOGGEDON_TILLS_PENDING, user } }
    function success(response, response2) { return { type: dashboardConstants.GET_LOGGEDON_TILLS_SUCCESS, response, response2 } }
    function failure(error) { return { type: dashboardConstants.GET_LOGGEDON_TILLS_FAILURE, error } }
    function clear() { return { type: dashboardConstants.GET_LOGGEDON_TILLS_RESET, clear_data:""} }

}

function fetchAllTills(includeClosed) {
    let requestPayload = `?includeClosed=${includeClosed}&pageSize=1000&currentPage=1`;
    
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

// function getReportFilters(params) {

//     return dispatch => {

//         let consume = ApiService.request(routes.HIT_ACTIVITIES+`/?${params}`, "GET", null);
//         dispatch(request(consume, tempData));
//         return consume
//             .then(response => {
//                 dispatch(success(response));
//             }).catch(error => {

//                 dispatch(failure(handleRequestErrors(error)));
//             });

//     }

//     function request(user, tempData) { 
//         if(tempData===undefined){
//             return { type: dashboardConstants.GET_ACTIVITIES_DATA_PENDING, user } 
//         }
//         if(tempData!==undefined){
//             return { type: dashboardConstants.GET_ACTIVITIES_DATA_PENDING, user, tempData } 
//         }
//     }


//     // function request(user) { return { type: dashboardConstants.GET_ACTIVITIES_DATA_PENDING, user } }
//     function success(response) { return { type: dashboardConstants.GET_ACTIVITIES_DATA_SUCCESS, response } }
//     function failure(error) { return { type: dashboardConstants.GET_ACTIVITIES_DATA_FAILURE, error } }

// }


function getAReport(params, reportType, ExportFileType) {
    
    if(ExportFileType!=="CLEAR"){
        return dispatch => {

            let consume = ApiService.request(`${routes.ALL_REPORTS}/${reportType}?${params}`, 
            "GET",
            "",
            "",
            "",
            "blob");
            dispatch(request(consume));
            return consume
                .then((response) => {
                    let disposition = response.headers["content-disposition"],
                    filename;
            
                    if (disposition && disposition.indexOf("attachment") !== -1) {
                    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    var matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) {
                        filename = matches[1].replace(/['"]/g, "");
                    }
                    }
            
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement("a");
                    link.href = url;
                    if (filename === undefined) {
                        let nameOfDownload;

                        if(ExportFileType===0){
                            nameOfDownload = `${reportType}.xlsx`
                        }
                        if(ExportFileType===1){
                            nameOfDownload = `${reportType}.pdf`
                        }
                    link.setAttribute("download", nameOfDownload);
                    }
            
                    if (filename !== undefined) {
                        link.setAttribute("download", filename);
                    }
                    if(ExportFileType===0){
            
                        document.body.appendChild(link);
                        link.click();
                        link.remove();
                    }
            
                    dispatch(success(response, url));
                })
                .catch((error) => {
                    dispatch(failure(handleRequestErrors(error)));
                });

        }
    }

    return dispatch =>{
        
        dispatch(clear());
        
    }



    function request(user) { return { type: dashboardConstants.GET_A_REPORT_PENDING, user } }
    function success(response, url) { return { 
        type: dashboardConstants.GET_A_REPORT_SUCCESS, 
        response ,
        url: ExportFileType===1?url: null
    } }
    function failure(error) { return { type: dashboardConstants.GET_A_REPORT_FAILURE, error } }
    function clear() { return { type: dashboardConstants.GET_A_REPORT_RESET, clear_data:""} }

}