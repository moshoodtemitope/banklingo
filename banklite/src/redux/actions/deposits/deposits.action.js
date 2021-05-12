import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
import { history } from "./../../../_helpers/history";
import { loanAndDepositsConstants } from "../../actiontypes/LoanAndDeposits/loananddeposits.constants";
import { handleRequestErrors } from "../../../shared/utils";

export const depositActions = {
  getDeposits,
  exportDeposits,
  getClientDeposits,
  getDepositTransaction,
  exportDepositTransaction,
  getAccountDepositTransaction,
  createDepositAccount,
  getAClientDepositAccount,
  getADepositAcountActivities,
  getADepositAccountCommunications,
  getDepositAccountComments,
  getLockedAmount,
  lockAmountState,
  getSettlementAccount,
  creatADepositComment,
  getAccountDepositAttachments,
  creatADepositAttachment,
  changeDepositState,
  searchAccountNumbers,
  searchCustomerAccount,
  searchForAccountsWithCustomerKey,
};

function getDeposits(params, tempData) {
  return (dispatch) => {
    let consume = ApiService.request(
      routes.HIT_DEPOSITS + `?${params}`,
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
      return { type: loanAndDepositsConstants.GET_DEPOSITS_PENDING, user };
    }
    if (tempData !== undefined) {
      return {
        type: loanAndDepositsConstants.GET_DEPOSITS_PENDING,
        user,
        tempData,
      };
    }
  }

  // function request(user) { return { type: loanAndDepositsConstants.GET_DEPOSITS_PENDING, user } }
  function success(response) {
    return { type: loanAndDepositsConstants.GET_DEPOSITS_SUCCESS, response };
  }
  function failure(error) {
    return { type: loanAndDepositsConstants.GET_DEPOSITS_FAILURE, error };
  }
}

function exportDeposits(params, tempData) {
  return (dispatch) => {
    let consume = ApiService.request(
      routes.HIT_DEPOSITS + `/depositsexport?${params}`,
      "GET",
      "",
      "",
      "",
      "blob"
    );
    dispatch(request(consume, tempData));
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
          link.setAttribute("download", "deposit-accounts.xlsx");
        }

        if (filename !== undefined) {
          link.setAttribute("download", filename);
        }

        document.body.appendChild(link);
        link.click();
        link.remove();

        dispatch(success(response));
      })
      .catch((error) => {
        dispatch(failure(handleRequestErrors(error)));
      });
  };

  function request(user, tempData) {
    if (tempData === undefined) {
      return { type: loanAndDepositsConstants.EXPORT_DEPOSITS_PENDING, user };
    }
    if (tempData !== undefined) {
      return {
        type: loanAndDepositsConstants.EXPORT_DEPOSITS_PENDING,
        user,
        tempData,
      };
    }
  }

  // function request(user) { return { type: loanAndDepositsConstants.EXPORT_DEPOSITS_PENDING, user } }
  function success(response) {
    return { type: loanAndDepositsConstants.EXPORT_DEPOSITS_SUCCESS, response };
  }
  function failure(error) {
    return { type: loanAndDepositsConstants.EXPORT_DEPOSITS_FAILURE, error };
  }
}

function getClientDeposits(clientId, params, tempData) {
  return (dispatch) => {
    let consume = ApiService.request(
      routes.HIT_DEPOSITS + `/client/${clientId}?${params}`,
      "GET",
      null
    );
    dispatch(request(consume, tempData));
    return consume
      .then((response) => {
        if (response.status === 200) {
          dispatch(success(response));
        } else {
          dispatch(
            failure(
              handleRequestErrors("Unable to get the requested Deposit client")
            )
          );
        }
      })
      .catch((error) => {
        dispatch(failure(handleRequestErrors(error)));
      });
  };

  function request(user, tempData) {
    if (tempData === undefined) {
      return {
        type: loanAndDepositsConstants.GET_CLIENTDEPOSITS_PENDING,
        user,
      };
    }
    if (tempData !== undefined) {
      return {
        type: loanAndDepositsConstants.GET_CLIENTDEPOSITS_PENDING,
        user,
        tempData,
      };
    }
  }

  // function request(user) { return { type: loanAndDepositsConstants.GET_CLIENTDEPOSITS_PENDING, user } }
  function success(response) {
    return {
      type: loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return { type: loanAndDepositsConstants.GET_CLIENTDEPOSITS_FAILURE, error };
  }
}

function getDepositTransaction(params, tempData) {
  return (dispatch) => {
    let consume = ApiService.request(
      routes.HIT_DEPOSITS_TRANSACTIONS + `?${params}`,
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
      return {
        type: loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_PENDING,
        user,
      };
    }
    if (tempData !== undefined) {
      return {
        type: loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_PENDING,
        user,
        tempData,
      };
    }
  }

  // function request(user) { return { type: loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_PENDING, user } }
  function success(response) {
    return {
      type: loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_FAILURE,
      error,
    };
  }
}

function exportDepositTransaction(params, tempData) {
  return (dispatch) => {
    let consume = ApiService.request(
      routes.HIT_DEPOSITS_TRANSACTIONS + `/deposittransactionsexport?${params}`,
      "GET",
      "",
      "",
      "",
      "blob"
    );
    dispatch(request(consume, tempData));
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
          link.setAttribute("download", "deposit-transactions.xlsx");
        }

        if (filename !== undefined) {
          link.setAttribute("download", filename);
        }

        document.body.appendChild(link);
        link.click();
        link.remove();
        dispatch(success(response));
      })
      .catch((error) => {
        dispatch(failure(handleRequestErrors(error)));
      });
  };

  function request(user, tempData) {
    if (tempData === undefined) {
      return {
        type: loanAndDepositsConstants.EXPORT_DEPOSIT_TRANSACTION_PENDING,
        user,
      };
    }
    if (tempData !== undefined) {
      return {
        type: loanAndDepositsConstants.EXPORT_DEPOSIT_TRANSACTION_PENDING,
        user,
        tempData,
      };
    }
  }

  // function request(user) { return { type: loanAndDepositsConstants.EXPORT_DEPOSIT_TRANSACTION_PENDING, user } }
  function success(response) {
    return {
      type: loanAndDepositsConstants.EXPORT_DEPOSIT_TRANSACTION_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: loanAndDepositsConstants.EXPORT_DEPOSIT_TRANSACTION_FAILURE,
      error,
    };
  }
}

function getAccountDepositTransaction(accountEncodedKey, params, tempData) {
  return (dispatch) => {
    let consume = ApiService.request(
      routes.HIT_DEPOSITS_TRANSACTIONS +
        `/account/${accountEncodedKey}?${params}`,
      "GET",
      null
    );
    dispatch(request(consume, tempData));
    return consume
      .then((response) => {
        if (response.status === 200) {
          dispatch(success(response));
        } else {
          dispatch(
            failure(
              handleRequestErrors(
                "Unable to get the requested Deposit Account Transactions"
              )
            )
          );
        }
      })
      .catch((error) => {
        dispatch(failure(handleRequestErrors(error)));
      });
  };

  function request(user, tempData) {
    if (tempData === undefined) {
      return {
        type: loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_PENDING,
        user,
      };
    }
    if (tempData !== undefined) {
      return {
        type: loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_PENDING,
        user,
        tempData,
      };
    }
  }

  function success(response) {
    return {
      type: loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_FAILURE,
      error,
    };
  }
}

function createDepositAccount(depositAccountDetailsPayload, accountType) {
  if (depositAccountDetailsPayload !== "CLEAR") {
    return (dispatch) => {
      let consume = ApiService.request(
        routes.HIT_DEPOSITS + `/${accountType}`,
        "POST",
        depositAccountDetailsPayload
      );
      dispatch(request(consume));
      return consume
        .then((response) => {
          // console.log("resultpppp", response);
          dispatch(success(response));
          history.push(
            `/customer/${response.data.result.clientEncodedKey}/savingsaccount/${response.data.result.encodedKey}`
          );
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
    return {
      type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_PENDING,
      user,
    };
  }
  function success(response) {
    return {
      type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_FAILURE,
      error,
    };
  }
  function clear() {
    return {
      type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_RESET,
      clear_data: "",
    };
  }
}

function getAClientDepositAccount(accountEncodedKey) {
  return (dispatch) => {
    let consume = ApiService.request(
      routes.HIT_DEPOSITS + `/${accountEncodedKey}`,
      "GET",
      null
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

  function request(user) {
    return {
      type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_DETAILS_PENDING,
      user,
    };
  }
  function success(response) {
    return {
      type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_DETAILS_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_DETAILS_FAILURE,
      error,
    };
  }
}

function getADepositAcountActivities(
  despositAccountEncodedKey,
  params,
  tempData
) {
  return (dispatch) => {
    let consume = ApiService.request(
      routes.HIT_ACTIVITIES +
        `/deposit/${despositAccountEncodedKey}?&${params}`,
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
      return {
        type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_PENDING,
        user,
      };
    }
    if (tempData !== undefined) {
      return {
        type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_PENDING,
        user,
        tempData,
      };
    }
  }

  // function request(user) { return { type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_PENDING, user } }
  function success(response) {
    return {
      type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_FAILURE,
      error,
    };
  }
}

function getADepositAccountCommunications(AccountEncodedKey, params, tempData) {
  return (dispatch) => {
    let consume = ApiService.request(
      routes.HIT_DEPOSITS +
        `/communications?AccountEncodedKey=${AccountEncodedKey}&${params}`,
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
      return {
        type:
          loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_PENDING,
        user,
      };
    }
    if (tempData !== undefined) {
      return {
        type:
          loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_PENDING,
        user,
        tempData,
      };
    }
  }

  // function request(user) { return { type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_PENDING, user } }
  function success(response) {
    return {
      type:
        loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type:
        loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_FAILURE,
      error,
    };
  }
}

function getDepositAccountComments(params, tempData) {
  return (dispatch) => {
    let consume = ApiService.request(
      routes.HIT_DEPOSITS + `/comments?${params}`,
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
      return {
        type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_PENDING,
        user,
      };
    }
    if (tempData !== undefined) {
      return {
        type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_PENDING,
        user,
        tempData,
      };
    }
  }

  // function request(user) { return { type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_PENDING, user } }
  function success(response) {
    return {
      type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_FAILURE,
      error,
    };
  }
}

function creatADepositComment(creatADepositCommentPayload) {
  if (creatADepositCommentPayload !== "CLEAR") {
    return (dispatch) => {
      let url = routes.HIT_DEPOSITS + `/addcomment`;
      delete creatADepositCommentPayload.encodedKey;
      let consume = ApiService.request(
        url,
        "POST",
        creatADepositCommentPayload
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
    return {
      type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_PENDING,
      user,
    };
  }
  function success(response) {
    return {
      type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_FAILURE,
      error,
    };
  }
  function clear() {
    return {
      type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_RESET,
      clear_data: "",
    };
  }
}

function getAccountDepositAttachments(params, tempData) {
  return (dispatch) => {
    let consume = ApiService.request(
      routes.HIT_DEPOSITS + `/attachments?${params}`,
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
      return {
        type:
          loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_PENDING,
        user,
      };
    }
    if (tempData !== undefined) {
      return {
        type:
          loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_PENDING,
        user,
        tempData,
      };
    }
  }

  // function request(user) { return { type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_PENDING, user } }
  function success(response) {
    return {
      type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_FAILURE,
      error,
    };
  }
}

function creatADepositAttachment(createDepositAttachmentPayload) {
  if (createDepositAttachmentPayload !== "CLEAR") {
    return (dispatch) => {
      let url = routes.HIT_DEPOSITS + `/addattachment`;
      delete createDepositAttachmentPayload.encodedKey;
      let consume = ApiService.request(
        url,
        "POST",
        createDepositAttachmentPayload
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
    return {
      type:
        loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_PENDING,
      user,
    };
  }
  function success(response) {
    return {
      type:
        loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type:
        loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_FAILURE,
      error,
    };
  }
  function clear() {
    return {
      type: loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_RESET,
      clear_data: "",
    };
  }
}

function changeDepositState(newDepositStatePayload, newState) {
  if (newDepositStatePayload !== "CLEAR") {
    return (dispatch) => {
      let url = routes.HIT_DEPOSIT_STATE + `/${newState}`;

      if (
        newState === "setmaximumwithdrawalamount" ||
        newState === "setrecommendeddepositamount" ||
        newState === "makewithdrawal" ||
        newState === "beginmaturity" ||
        newState === "transfer"
      ) {
        if (newState === "makewithdrawal") {
          url = routes.HIT_DEPOSITS + `/withdraw`;
        } else {
          url = routes.HIT_DEPOSITS + `/${newState}`;
        }
      }

      let consume = ApiService.request(url, "POST", newDepositStatePayload);

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
    return { type: loanAndDepositsConstants.CHANGE_DEPOSITSTATE_PENDING, user };
  }
  function success(response) {
    return {
      type: loanAndDepositsConstants.CHANGE_DEPOSITSTATE_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: loanAndDepositsConstants.CHANGE_DEPOSITSTATE_FAILURE,
      error,
    };
  }
  function clear() {
    return {
      type: loanAndDepositsConstants.CHANGE_DEPOSITSTATE_RESET,
      clear_data: "",
    };
  }
}

function searchAccountNumbers(params) {
  if (params !== "CLEAR") {
    return (dispatch) => {
      let consume = ApiService.request(
        routes.HIT_GLOBAL_SEARCH + `/items?SearchText=${params}`,
        "GET",
        null
      );
      // let consume = ApiService.request(routes.HIT_GLOBAL_SEARCH+`/depositandloanitems?AccountNumberSubString=${params}`, "GET", null);
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
    return {
      type: loanAndDepositsConstants.SEARCH_ACCOUNT_NUMBERS_PENDING,
      user,
    };
  }
  function success(response) {
    return {
      type: loanAndDepositsConstants.SEARCH_ACCOUNT_NUMBERS_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: loanAndDepositsConstants.SEARCH_ACCOUNT_NUMBERS_FAILURE,
      error,
    };
  }
  function clear() {
    return {
      type: loanAndDepositsConstants.SEARCH_ACCOUNT_NUMBERS_RESET,
      clear_data: "",
    };
  }
}

function searchCustomerAccount(params) {
  if (params !== "CLEAR") {
    return (dispatch) => {
      let consume = ApiService.request(
        routes.HIT_GLOBAL_SEARCH + `/items?SearchText=${params}`,
        "GET",
        null
      );
      // let consume = ApiService.request(routes.HIT_GLOBAL_SEARCH+`/clients?SearchText=${params}`, "GET", null);
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
    return {
      type: loanAndDepositsConstants.SEARCH_CUSTOMER_ACCOUNT_PENDING,
      user,
    };
  }
  function success(response) {
    return {
      type: loanAndDepositsConstants.SEARCH_CUSTOMER_ACCOUNT_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: loanAndDepositsConstants.SEARCH_CUSTOMER_ACCOUNT_FAILURE,
      error,
    };
  }
  function clear() {
    return {
      type: loanAndDepositsConstants.SEARCH_CUSTOMER_ACCOUNT_RESET,
      clear_data: "",
    };
  }
}

function searchForAccountsWithCustomerKey(params) {
  if (params !== "CLEAR") {
    return (dispatch) => {
      let consume = ApiService.request(
        routes.HIT_GLOBAL_SEARCH + `/items?SearchText=${params}`,
        "GET",
        null
      );
      // let consume = ApiService.request(routes.HIT_GLOBAL_SEARCH+`/customerdepositandloanitems?CustomerEncodedKey=${params}`, "GET", null);
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
    return {
      type:
        loanAndDepositsConstants.SEARCH_FOR_ACCOUNTS_WITH_CUSTOMERKEY_PENDING,
      user,
    };
  }
  function success(response) {
    return {
      type:
        loanAndDepositsConstants.SEARCH_FOR_ACCOUNTS_WITH_CUSTOMERKEY_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type:
        loanAndDepositsConstants.SEARCH_FOR_ACCOUNTS_WITH_CUSTOMERKEY_FAILURE,
      error,
    };
  }
  function clear() {
    return {
      type: loanAndDepositsConstants.SEARCH_FOR_ACCOUNTS_WITH_CUSTOMERKEY_RESET,
      clear_data: "",
    };
  }
}

function lockAmountState(newLockAmountPayload, newState) {
  if (newLockAmountPayload !== "CLEAR") {
    return (dispatch) => {
      let url = routes.HIT_LOCK_AMOUNT_STATE + `/${newState}`;

      let consume = ApiService.request(url, "POST", newLockAmountPayload);

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
    return { type: loanAndDepositsConstants.LOCK_AMOUNT_PENDING, user };
  }
  function success(response) {
    return {
      type: loanAndDepositsConstants.LOCK_AMOUNT_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: loanAndDepositsConstants.LOCK_AMOUNT_FAILURE,
      error,
    };
  }
  function clear() {
    return {
      type: loanAndDepositsConstants.LOCK_AMOUNT_RESET,
      clear_data: "",
    };
  }
}

function getLockedAmount(params) {
  return (dispatch) => {
    let consume = ApiService.request(
      routes.HIT_LOCK_AMOUNT_STATE + `?${params}`,
      "GET",
      null
    );
    dispatch(request(consume));
    return consume
      .then((response) => {
        if (response.status === 200) {
          dispatch(success(response));
        } else {
          dispatch(
            failure(handleRequestErrors("Unable to get the Lock Amount"))
          );
        }
      })
      .catch((error) => {
        dispatch(failure(handleRequestErrors(error)));
      });
  };

  function request(user) {
    if (params === undefined) {
      return {
        type: loanAndDepositsConstants.GET_LOCK_AMOUNT_PENDING,
        user,
      };
    }
    if (params !== undefined) {
      return {
        type: loanAndDepositsConstants.GET_LOCK_AMOUNT_PENDING,
        user,
        params,
      };
    }
  }

  function success(response) {
    return {
      type: loanAndDepositsConstants.GET_LOCK_AMOUNT_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: loanAndDepositsConstants.GET_LOCK_AMOUNT_FAILURE,
      error,
    };
  }
}

function getSettlementAccount(params) {
  return (dispatch) => {
    let consume = ApiService.request(
      routes.HIT_LOAN + `?${params}`,
      "GET",
      null
    );
    dispatch(request(consume));
    return consume
      .then((response) => {
        if (response.status === 200) {
          dispatch(success(response));
        } else {
          dispatch(
            failure(handleRequestErrors("Unable to get the settlement Account"))
          );
        }
      })
      .catch((error) => {
        dispatch(failure(handleRequestErrors(error)));
      });
  };

  function request(user) {
    if (params === undefined) {
      return {
        type: loanAndDepositsConstants.GET_SETTLEMENT_ACCOUNT_PENDING,
        user,
      };
    }
    if (params !== undefined) {
      return {
        type: loanAndDepositsConstants.GET_SETTLEMENT_ACCOUNT_PENDING,
        user,
        params,
      };
    }
  }

  function success(response) {
    return {
      type: loanAndDepositsConstants.GET_SETTLEMENT_ACCOUNT_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: loanAndDepositsConstants.GET_SETTLEMENT_ACCOUNT_FAILURE,
      error,
    };
  }
}
