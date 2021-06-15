import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
import { handleRequestErrors } from "../../../shared/utils";



export const branchActions = {
  
    getAllBranches,
    getBranchesClosures,
    getBranchesOpen,
    getBranchesClosed,
    openABranch,
    closeABranch,
    fetchBranchesList,
    getABranch,
    createNewBranch,
    updateABranch,
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


  GET_BRANCH_CLOSURES_SUCCESS : 'GET_BRANCH_CLOSURES_SUCCESS',
  GET_BRANCH_CLOSURES_PENDING : 'GET_BRANCH_CLOSURES_PENDING',
  GET_BRANCH_CLOSURES_FAILURE : 'GET_BRANCH_CLOSURES_FAILURE',

  GET_BRANCHES_OPEN_SUCCESS : 'GET_BRANCHES_OPEN_SUCCESS',
  GET_BRANCHES_OPEN_PENDING : 'GET_BRANCHES_OPEN_PENDING',
  GET_BRANCHES_OPEN_FAILURE : 'GET_BRANCHES_OPEN_FAILURE',

  GET_BRANCHES_CLOSED_SUCCESS : 'GET_BRANCHES_CLOSED_SUCCESS',
  GET_BRANCHES_CLOSED_PENDING : 'GET_BRANCHES_CLOSED_PENDING',
  GET_BRANCHES_CLOSED_FAILURE : 'GET_BRANCHES_CLOSED_FAILURE',

  OPEN_A_BRANCH_SUCCESS : 'OPEN_A_BRANCH_SUCCESS',
  OPEN_A_BRANCH_PENDING : 'OPEN_A_BRANCH_PENDING',
  OPEN_A_BRANCH_FAILURE : 'OPEN_A_BRANCH_FAILURE',
  OPEN_A_BRANCH_RESET :   'OPEN_A_BRANCH__RESET',

  CLOSE_A_BRANCH_SUCCESS : 'CLOSE_A_BRANCH_SUCCESS',
  CLOSE_A_BRANCH_PENDING : 'CLOSE_A_BRANCH_PENDING',
  CLOSE_A_BRANCH_FAILURE : 'CLOSE_A_BRANCH_FAILURE',
  CLOSE_A_BRANCH_RESET :   'CLOSE_A_BRANCH__RESET',

  
}

function getAllBranches(params, tempData, isAll, showAllowable) {
  return (dispatch) => {

    let consume;
    if(showAllowable){
        consume = ApiService.request(
            routes.GET_BRANCHES + "/allowedbranches",
            "GET",
            null
        );
    }else{
        if(!isAll){
            consume = ApiService.request(
                routes.GET_BRANCHES + "?" + params,
                "GET",
                null
            );
        }else{
            consume = ApiService.request(
                `${routes.GET_BRANCHES}/all`,
                "GET",
                null
            );
        }
    }
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







function getBranchesClosures  (params, tempData){
    
  return dispatch =>{
      
      let consume = ApiService.request(`${routes.GET_BRANCHES}/branchclosures?${params}`, "GET", null);
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
          return { type: branchConstants.GET_BRANCH_CLOSURES_PENDING, user } 
      }
      if(tempData!==undefined){
          return { type: branchConstants.GET_BRANCH_CLOSURES_PENDING, user, tempData } 
      }
      
  }

  // function request(user) { return { type: branchConstants.GET_BRANCH_CLOSURES_PENDING, user } }
  function success(response) { return { type: branchConstants.GET_BRANCH_CLOSURES_SUCCESS, response } }
  function failure(error) { return { type: branchConstants.GET_BRANCH_CLOSURES_FAILURE, error } }

}

function getBranchesOpen  (params, tempData){
  
  return dispatch =>{
      
      let consume = ApiService.request(`${routes.GET_BRANCHES}/branchclosures?${params}`, "GET", null);
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
          return { type: branchConstants.GET_BRANCHES_OPEN_PENDING, user } 
      }
      if(tempData!==undefined){
          return { type: branchConstants.GET_BRANCHES_OPEN_PENDING, user, tempData } 
      }
      
  }

  // function request(user) { return { type: branchConstants.GET_BRANCHES_OPEN_PENDING, user } }
  function success(response) { return { type: branchConstants.GET_BRANCHES_OPEN_SUCCESS, response } }
  function failure(error) { return { type: branchConstants.GET_BRANCHES_OPEN_FAILURE, error } }

}

function getBranchesClosed  (params, tempData){
  
  return dispatch =>{
      
      let consume = ApiService.request(`${routes.GET_BRANCHES}/branchclosures?${params}`, "GET", null);
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
          return { type: branchConstants.GET_BRANCHES_CLOSED_PENDING, user } 
      }
      if(tempData!==undefined){
          return { type: branchConstants.GET_BRANCHES_CLOSED_PENDING, user, tempData } 
      }
      
  }

  // function request(user) { return { type: branchConstants.GET_BRANCHES_CLOSED_PENDING, user } }
  function success(response) { return { type: branchConstants.GET_BRANCHES_CLOSED_SUCCESS, response } }
  function failure(error) { return { type: branchConstants.GET_BRANCHES_CLOSED_FAILURE, error } }

}

function openABranch  (branchPayload, branchAction){
  if(branchPayload!=="CLEAR"){
      return dispatch =>{
          
         
          let consume = ApiService.request(`${routes.GET_BRANCHES}/branchclosure/${branchAction.toLowerCase()}`, "POST", branchPayload);
        //   let consume = ApiService.request(`${routes.GET_BRANCHES}/branchclosure/open`, "POST", branchPayload);
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

  function request(user) { return { type: branchConstants.OPEN_A_BRANCH_PENDING, user } }
  function success(response) { return { type: branchConstants.OPEN_A_BRANCH_SUCCESS, response } }
  function failure(error) { return { type: branchConstants.OPEN_A_BRANCH_FAILURE, error } }
  function clear() { return { type: branchConstants.OPEN_A_BRANCH_RESET, clear_data:""} }

}

function closeABranch  (branchPayload){
  if(branchPayload!=="CLEAR"){
      return dispatch =>{
          
         
          let consume = ApiService.request(`${routes.GET_BRANCHES}/branchclosure/close`, "POST", branchPayload);
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

  function request(user) { return { type: branchConstants.CLOSE_A_BRANCH_PENDING, user } }
  function success(response) { return { type: branchConstants.CLOSE_A_BRANCH_SUCCESS, response } }
  function failure(error) { return { type: branchConstants.CLOSE_A_BRANCH_FAILURE, error } }
  function clear() { return { type: branchConstants.CLOSE_A_BRANCH_RESET, clear_data:""} }

}

function fetchBranchesList  (requiresCurrency, forFiltering){
  
  return dispatch =>{
      
      let consume;
      if(!forFiltering){
        consume = ApiService.request(routes.GET_BRANCHES+'/all', "GET", null);
      }else{
        consume = ApiService.request(routes.GET_BRANCHES+'/allowedbranches', "GET", null);
      }
      dispatch(request(consume));
      return consume
          .then(response =>{
              if(!requiresCurrency){
                dispatch(success(response));
              }else{
                let consume2 = ApiService.request(routes.GET_ALL_CURRENCIES, "GET", null);
                dispatch(request(consume2));
                return consume2
                    .then(response2 =>{
                        dispatch(success(response, response2));
                        
                    }).catch(error =>{
                        
                        dispatch(failure(handleRequestErrors(error)));
                    });
              }
              
          }).catch(error =>{
              
              dispatch(failure(handleRequestErrors(error)));
          });
      
  }
  

  function request(user) { return { type: branchConstants.FETCH_BRANCHES_LIST_PENDING, user } }
  function success(response, response2) { return { type: branchConstants.FETCH_BRANCHES_LIST_SUCCESS, response, response2 } }
  function failure(error) { return { type: branchConstants.FETCH_BRANCHES_LIST_FAILURE, error } }

}

function getABranch  (encodedKey){
  
  return dispatch =>{
      
      let consume = ApiService.request(routes.GET_BRANCHES+'/'+encodedKey, "GET", null);
      dispatch(request(consume));
      return consume
          .then(response =>{
              dispatch(success(response));
          }).catch(error =>{
              
              dispatch(failure(handleRequestErrors(error)));
          });
      
  }
  

function request(user) { return { type: branchConstants.GET_A_BRANCH_PENDING, user } }
function success(response) { return { type: branchConstants.GET_A_BRANCH_SUCCESS, response } }
function failure(error) { return { type: branchConstants.GET_A_BRANCH_FAILURE, error } }

}

function createNewBranch  (createNewBranchPayload){
  if(createNewBranchPayload!=="CLEAR"){
      return dispatch =>{
          
          if(Object.keys(createNewBranchPayload).length >1){
              let consume = ApiService.request(routes.ADD_BRANCH, "POST", createNewBranchPayload);
              dispatch(request(consume));
              return consume
                  .then(response =>{
                      dispatch(success(response));
                  }).catch(error =>{
                     
                      dispatch(failure(handleRequestErrors(error)));
                  });
          }
          else{
              dispatch(failure(handleRequestErrors("Please provide all required details")));
          }
          
      }
      
  }

  return dispatch =>{
      
      dispatch(clear());
      
  }

  function request(user) { return { type: branchConstants.CREATE_NEW_BRANCH_PENDING, user } }
  function success(response) { return { type: branchConstants.CREATE_NEW_BRANCH_SUCCESS, response } }
  function failure(error) { return { type: branchConstants.CREATE_NEW_BRANCH_FAILURE, error } }
  function clear() { return { type: branchConstants.CREATE_NEW_BRANCH_RESET, clear_data:""} }

}

function updateABranch  (updateABranchPayload){
  if(updateABranchPayload!=="CLEAR"){
      return dispatch =>{
          let url = routes.ADD_BRANCH+`/${updateABranchPayload.encodedKey}`
          if(Object.keys(updateABranchPayload).length >1){

              delete updateABranchPayload.encodedKey;

              let consume = ApiService.request(url, "POST", updateABranchPayload);
              dispatch(request(consume));
              return consume
                  .then(response =>{
                      dispatch(success(response));
                  }).catch(error =>{
                     
                      dispatch(failure(handleRequestErrors(error)));
                  });
          }
          else{
              dispatch(failure(handleRequestErrors("Please provide all required details")));
          }
          
      }
      
  }

  return dispatch =>{
      
      dispatch(clear());
      
  }

  function request(user) { return { type: branchConstants.UPDATE_A_BRANCH_PENDING, user } }
  function success(response) { return { type: branchConstants.UPDATE_A_BRANCH_SUCCESS, response } }
  function failure(error) { return { type: branchConstants.UPDATE_A_BRANCH_FAILURE, error } }
  function clear() { return { type: branchConstants.UPDATE_A_BRANCH_RESET, clear_data:""} }

}
