import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import {administrationConstants} from '../../actiontypes/administration/administration.constants'
import { handleRequestErrors } from "../../../shared/utils";



export const administrationActions = {
  
    getAllBranches
}

function getAllBranches(params, tempData) {
  return (dispatch) => {


    let consume = ApiService.request(
      routes.GET_BRANCHES + "?" + params,
      "GET",
      null
    );
    //quickly return to caller
    dispatch(request(consume, tempData));
   
   
    return consume.then((response) => {
        dispatch(success(response));
      })
      .catch((error) => {
        dispatch(failure(handleRequestErrors(error)));
      });
  };

  function request(user, tempData) {
    if (tempData === undefined) {
      return { type: administrationConstants.GET_ALL_BRANCHES_PENDING, user };
    }
    
    if (tempData !== undefined) {
      return {
        type: administrationConstants.GET_ALL_BRANCHES_PENDING,
        user,
        tempData,
      };
    }
  }
  // function request(user) { return { type: administrationConstants.GET_ALL_BRANCHES_PENDING, user } }
  function success(response) {
    return { type: administrationConstants.GET_ALL_BRANCHES_SUCCESS, response };
  }
  function failure(error) {
    return { type: administrationConstants.GET_ALL_BRANCHES_FAILURE, error };
  }
}
