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
    searchForCustomer
}



function getDashboardData() {

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
