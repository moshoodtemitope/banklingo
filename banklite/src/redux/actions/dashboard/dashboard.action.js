import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
import { history } from '../../../_helpers/history';
import {dashboardConstants} from '../../actiontypes/dashboard/dashoboard.constants'
import { handleRequestErrors } from "../../../shared/utils";

export const dashboardActions = {
    getDashboardData,
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

