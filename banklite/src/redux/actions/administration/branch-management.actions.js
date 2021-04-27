import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
import { handleRequestErrors } from "../../../shared/utils";



export const branchActions = {
  
    getAllBranches
}


export const branchConstants = {
  

  GET_ALL_BRANCHES_SUCCESS : 'GET_ALL_BRANCHES_SUCCESS',
  GET_ALL_BRANCHES_PENDING : 'GET_ALL_BRANCHES_PENDING',
  GET_ALL_BRANCHES_FAILURE : 'GET_ALL_BRANCHES_FAILURE',

  FETCH_BRANCHES_LIST_SUCCESS : 'FETCH_BRANCHES_LIST_SUCCESS',
  FETCH_BRANCHES_LIST_PENDING : 'FETCH_BRANCHES_LIST_PENDING',
  FETCH_BRANCHES_LIST_FAILURE : 'FETCH_BRANCHES_LIST_FAILURE',

  GET_A_BRANCH_SUCCESS : 'GET_A_BRANCH_SUCCESS',
  GET_A_BRANCH_PENDING : 'GET_A_BRANCH_PENDING',
  GET_A_BRANCH_FAILURE : 'GET_A_BRANCH_FAILURE',

  UPDATE_A_BRANCH_SUCCESS : 'UPDATE_A_BRANCH_SUCCESS',
  UPDATE_A_BRANCH_PENDING : 'UPDATE_A_BRANCH_PENDING',
  UPDATE_A_BRANCH_FAILURE : 'UPDATE_A_BRANCH_FAILURE',
  UPDATE_A_BRANCH_RESET : 'UPDATE_A_BRANCH_RESET',

  CREATE_NEW_BRANCH_SUCCESS : 'CREATE_NEW_BRANCH_SUCCESS',
  CREATE_NEW_BRANCH_PENDING : 'CREATE_NEW_BRANCH_PENDING',
  CREATE_NEW_BRANCH_FAILURE : 'CREATE_NEW_BRANCH_FAILURE',
  CREATE_NEW_BRANCH_RESET :   'CREATE_NEW_BRANCH__RESET',

  
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
      return { type: branchConstants.GET_ALL_BRANCHES_PENDING, user };
    }
    
    if (tempData !== undefined) {
      return {
        type: branchConstants.GET_ALL_BRANCHES_PENDING,
        user,
        tempData,
      };
    }
  }
  // function request(user) { return { type: branchConstants.GET_ALL_BRANCHES_PENDING, user } }
  function success(response) {
    return { type: branchConstants.GET_ALL_BRANCHES_SUCCESS, response };
  }
  function failure(error) {
    return { type: branchConstants.GET_ALL_BRANCHES_FAILURE, error };
  }
}


