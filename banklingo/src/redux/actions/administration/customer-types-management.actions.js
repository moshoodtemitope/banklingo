import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
import { handleRequestErrors } from "../../../shared/utils";

export const customerTypeActions = {
  getCustomerTypes,
  getAllCustomerTypes,
  addCustomerType,
  updateCustomerType,
};

export const customerTypeConstants = {
  CREATE_CUSTOMERTYPE_SUCCESS: "CREATE_CUSTOMERTYPE_SUCCESS",
  CREATE_CUSTOMERTYPE_PENDING: "CREATE_CUSTOMERTYPE_PENDING",
  CREATE_CUSTOMERTYPE_FAILURE: "CREATE_CUSTOMERTYPE_FAILURE",
  CREATE_CUSTOMERTYPE_RESET: "CREATE_CUSTOMERTYPE_RESET",

  GET_CUSTOMERTYPES_SUCCESS: "GET_CUSTOMERTYPES_SUCCESS",
  GET_CUSTOMERTYPES_PENDING: "GET_CUSTOMERTYPES_PENDING",
  GET_CUSTOMERTYPES_FAILURE: "GET_CUSTOMERTYPES_FAILURE",

  GET_ALL_CUSTOMERTYPES_SUCCESS: "GET_ALL_CUSTOMERTYPES_SUCCESS",
  GET_ALL_CUSTOMERTYPES_PENDING: "GET_ALL_CUSTOMERTYPES_PENDING",
  GET_ALL_CUSTOMERTYPES_FAILURE: "GET_ALL_CUSTOMERTYPES_FAILURE",

  UPDATE_CUSTOMERTYPE_SUCCESS: "UPDATE_CUSTOMERTYPE_SUCCESS",
  UPDATE_CUSTOMERTYPE_PENDING: "UPDATE_CUSTOMERTYPE_PENDING",
  UPDATE_CUSTOMERTYPE_FAILURE: "UPDATE_CUSTOMERTYPE_FAILURE",
  UPDATE_CUSTOMERTYPE_RESET: "UPDATE_CUSTOMERTYPE_RESET",
};

function getCustomerTypes(customerTypesPayload, tempData) {
  return (dispatch) => {
    // let {PageSize, CurrentPage}= customerTypesPayload;
    let consume = ApiService.request(
      routes.HIT_CUSTOMER_TYPES + `/customertypes?${customerTypesPayload}`,
      "GET",
      null
    );
    dispatch(request(consume, tempData));
    return consume
      .then((response) => {
        dispatch(success(response));
      })
      .catch((error) => {
        dispatch(failure(handleRequestErrors(error)));
      });
  };

  function request(user, tempData) {
    if (tempData === undefined) {
      return { type: customerTypeConstants.GET_CUSTOMERTYPES_PENDING, user };
    }
    if (tempData !== undefined) {
      return {
        type: customerTypeConstants.GET_CUSTOMERTYPES_PENDING,
        user,
        tempData,
      };
    }
  }
  function success(response) {
    return { type: customerTypeConstants.GET_CUSTOMERTYPES_SUCCESS, response };
  }
  function failure(error) {
    return { type: customerTypeConstants.GET_CUSTOMERTYPES_FAILURE, error };
  }
}

function getAllCustomerTypes() {
  let userInfo = JSON.parse(localStorage.getItem("lingoAuth"));
  return (dispatch) => {
    if (userInfo.custTypes === null || userInfo.custTypes === undefined) {
      let consume = ApiService.request(
        routes.HIT_CUSTOMER_TYPES + `/all`,
        "GET",
        null
      );
      dispatch(request(consume));
      return consume
        .then((response) => {
          userInfo.custTypes = response.data;
          localStorage.setItem("lingoAuth", JSON.stringify(userInfo));
          dispatch(success(response));


          if (userInfo.groupTypes === null || userInfo.groupTypes === undefined) {
            let consume2 = ApiService.request(
              routes.HIT_CUSTOMER_TYPES + `/customertypes?ClientClassification=1&PageSize=1000&CurrentPage=1`,
              "GET",
              null
            );
            dispatch(request(consume2));
            return consume2
              .then((response2) => {
                userInfo.groupTypes = response2.data.result;
                localStorage.setItem("lingoAuth", JSON.stringify(userInfo));
                dispatch(success(response));
              })
              .catch((error) => {
                dispatch(failure(handleRequestErrors(error)));
              });
          }
        })
        .catch((error) => {
          dispatch(failure(handleRequestErrors(error)));
        });
    } else {
      dispatch(success(userInfo.custTypes));
    }
  };

  function request(user) {
    return { type: customerTypeConstants.GET_ALL_CUSTOMERTYPES_PENDING, user };
  }
  function success(response) {
    return {
      type: customerTypeConstants.GET_ALL_CUSTOMERTYPES_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return { type: customerTypeConstants.GET_ALL_CUSTOMERTYPES_FAILURE, error };
  }
}

function addCustomerType(customerTypePayload) {
  if (customerTypePayload !== "CLEAR") {
    return (dispatch) => {
      let consume = ApiService.request(
        routes.ADD_CUSTOMER_TYPE,
        "POST",
        customerTypePayload
      );
      dispatch(request(consume));
      return consume
        .then((response) => {
          dispatch(success(response));
        })
        .catch((error) => {
          dispatch(failure(handleRequestErrors(error)));
        });
    };
  }

  return (dispatch) => {
    dispatch(clear());
  };

  function request(user) {
    return { type: customerTypeConstants.CREATE_CUSTOMERTYPE_PENDING, user };
  }
  function success(response) {
    return {
      type: customerTypeConstants.CREATE_CUSTOMERTYPE_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return { type: customerTypeConstants.CREATE_CUSTOMERTYPE_FAILURE, error };
  }
  function clear() {
    return {
      type: customerTypeConstants.CREATE_CUSTOMERTYPE_RESET,
      clear_data: "",
    };
  }
}

function updateCustomerType(updatedCustomerTypePayload) {
  if (updatedCustomerTypePayload !== "CLEAR") {
    return (dispatch) => {
      let url =
        routes.HIT_CUSTOMER_TYPES +
        `/customertypes/${updatedCustomerTypePayload.id}`;
      delete updatedCustomerTypePayload.id;
      let consume = ApiService.request(url, "POST", updatedCustomerTypePayload);
      dispatch(request(consume));
      return consume
        .then((response) => {
          dispatch(success(response));
        })
        .catch((error) => {
          dispatch(failure(handleRequestErrors(error)));
        });
    };
  }

  return (dispatch) => {
    dispatch(clear());
  };

  function request(user) {
    return { type: customerTypeConstants.UPDATE_CUSTOMERTYPE_PENDING, user };
  }
  function success(response) {
    return {
      type: customerTypeConstants.UPDATE_CUSTOMERTYPE_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return { type: customerTypeConstants.UPDATE_CUSTOMERTYPE_FAILURE, error };
  }
  function clear() {
    return {
      type: customerTypeConstants.UPDATE_CUSTOMERTYPE_RESET,
      clear_data: "",
    };
  }
}
