import { ApiService } from "../../../services/apiService";
import { routes } from "../../../services/urls";
// import { history } from './../../../_helpers/history';
import { accountingConstants } from "../../actiontypes/accounting/accounting.constants";
import { handleRequestErrors } from "../../../shared/utils";

export const acoountingActions = {
  getGLAccounts,
  exportGLAccounts,
  createGLAccount,
  updateGLAccount,
  getAllGLAccounts,
  getJournalEntries,
  exportJournalEntries,
  createJournalEntry,

  getTrialBalance,
  getTrialBalanceBasic,
  exportTrialBalance,
  exportTrialBalanceBasic,
  getProfitAndLoss,
  exportProfitLoss,
  getBalanceSheet,
  exportBalanceSheet,
};

function getGLAccounts(payload, tempData) {
  return (dispatch) => {
    let url;
    url =
      routes.HIT_GLACCOUNTS +
      `?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}&AccountTypeId=${payload.AccountTypeId}`;

    let consume = ApiService.request(url, "GET", null);
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
      return { type: accountingConstants.GET_GLACCOUNTS_PENDING, user };
    }
    if (tempData !== undefined) {
      return {
        type: accountingConstants.GET_GLACCOUNTS_PENDING,
        user,
        tempData,
      };
    }
  }
  function success(response) {
    return { type: accountingConstants.GET_GLACCOUNTS_SUCCESS, response };
  }
  function failure(error) {
    return { type: accountingConstants.GET_GLACCOUNTS_FAILURE, error };
  }
}

function exportGLAccounts(payload, tempData) {
  return (dispatch) => {
    let url;
    // if(id===undefined){
    //     url = routes.GET_GLACCOUNTS;
    // }else{

    // }

    url =
      routes.HIT_GLACCOUNTS_BASE +
      `/glaccountsexport?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}&AccountTypeId=${payload.AccountTypeId}`;

    let consume = ApiService.request(url, "GET", "", "", "", "blob");
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
          link.setAttribute("download", "GlAccounts-report.xlsx");
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
      return { type: accountingConstants.EXPORT_GLACCOUNTS_PENDING, user };
    }
    if (tempData !== undefined) {
      return {
        type: accountingConstants.EXPORT_GLACCOUNTS_PENDING,
        user,
        tempData,
      };
    }
  }
  function success(response) {
    return { type: accountingConstants.EXPORT_GLACCOUNTS_SUCCESS, response };
  }
  function failure(error) {
    return { type: accountingConstants.EXPORT_GLACCOUNTS_FAILURE, error };
  }
}

function getAllGLAccounts() {
  return (dispatch) => {
    let url;
    url = routes.ALL_GLACCOUNTS;
    let consume = ApiService.request(url, "GET", null);
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
    return { type: accountingConstants.GET_ALL_GLACCOUNTS_PENDING, user };
  }
  function success(response) {
    return { type: accountingConstants.GET_ALL_GLACCOUNTS_SUCCESS, response };
  }
  function failure(error) {
    return { type: accountingConstants.GET_ALL_GLACCOUNTS_FAILURE, error };
  }
}

function createGLAccount(createGLPayload) {
  if (createGLPayload !== "CLEAR") {
    return (dispatch) => {
      let consume = ApiService.request(
        routes.CREATE_GLACCOUNT,
        "POST",
        createGLPayload
      );
      dispatch(request(consume));
      return consume
        .then((response) => {
          dispatch(success(response));
        })
        .catch((error) => {
          // console.log('error is', error)
          dispatch(failure(handleRequestErrors(error)));
        });
    };
  }

  return (dispatch) => {
    dispatch(clear());
  };

  function request(user) {
    return { type: accountingConstants.CREATE_GLACCOUNTS_PENDING, user };
  }
  function success(response) {
    return { type: accountingConstants.CREATE_GLACCOUNTS_SUCCESS, response };
  }
  function failure(error) {
    return { type: accountingConstants.CREATE_GLACCOUNTS_FAILURE, error };
  }
  function clear() {
    return {
      type: accountingConstants.CREATE_GLACCOUNTS_RESET,
      clear_data: "",
    };
  }
}

function updateGLAccount(updateGLPayload) {
  if (updateGLPayload !== "CLEAR") {
    return (dispatch) => {
      let { idToUpdate } = updateGLPayload;
      delete updateGLPayload.idToUpdate;
      let consume = ApiService.request(
        routes.HIT_GLACCOUNTS + `/${idToUpdate}`,
        "POST",
        updateGLPayload
      );
      dispatch(request(consume));
      return consume
        .then((response) => {
          dispatch(success(response));
        })
        .catch((error) => {
          // console.log('error is', error)
          dispatch(failure(handleRequestErrors(error)));
        });
    };
  }

  return (dispatch) => {
    dispatch(clear());
  };

  function request(user) {
    return { type: accountingConstants.UPDATE_GLACCOUNTS_PENDING, user };
  }
  function success(response) {
    return { type: accountingConstants.UPDATE_GLACCOUNTS_SUCCESS, response };
  }
  function failure(error) {
    return { type: accountingConstants.UPDATE_GLACCOUNTS_FAILURE, error };
  }
  function clear() {
    return {
      type: accountingConstants.UPDATE_GLACCOUNTS_RESET,
      clear_data: "",
    };
  }
}

function getJournalEntries(payload, tempData) {
  return (dispatch) => {
    let url;
    // if(id===undefined){
    //     url = routes.GET_GLACCOUNTS;
    // }else{

    // }

    // url = routes.JOURNAL_ENTRIES+`?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}`;
    url = routes.JOURNAL_ENTRIES + `?${payload}`;

    let consume = ApiService.request(url, "GET", null);
    dispatch(request(consume, tempData));
    return consume
      .then((response) => {
        let consume2 = ApiService.request(routes.ALL_GLACCOUNTS, "GET", null);
        dispatch(request(consume2, tempData));
        return consume2
          .then((response2) => {
            let consume3 = ApiService.request(
              routes.GET_BRANCHES + `/all`,
              "GET",
              null
            );
            dispatch(request(consume3, tempData));
            return consume3
              .then((response3) => {
                // dispatch(success(response,response2, response3));
                let consume4 = ApiService.request(
                  routes.GET_ALL_CURRENCIES,
                  "GET",
                  null
                );
                dispatch(request(consume4, tempData));
                return consume4
                  .then((response4) => {
                    dispatch(
                      success(response, response2, response3, response4)
                    );
                  })
                  .catch((error) => {
                    dispatch(failure(handleRequestErrors(error)));
                  });
              })
              .catch((error) => {
                dispatch(failure(handleRequestErrors(error)));
              });
          })
          .catch((error) => {
            dispatch(failure(handleRequestErrors(error)));
          });
      })
      .catch((error) => {
        dispatch(failure(handleRequestErrors(error)));
      });
  };

  function request(user, tempData) {
    if (tempData === undefined) {
      return { type: accountingConstants.GET_JOURNAL_ENTRY_PENDING, user };
    }

    if (tempData !== undefined) {
      return {
        type: accountingConstants.GET_JOURNAL_ENTRY_PENDING,
        user,
        tempData,
      };
    }
  }
  function success(response, response2, response3, response4) {
    return {
      type: accountingConstants.GET_JOURNAL_ENTRY_SUCCESS,
      response,
      response2,
      response3,
      response4,
    };
  }
  function failure(error) {
    return { type: accountingConstants.GET_JOURNAL_ENTRY_FAILURE, error };
  }
}

function exportJournalEntries(payload, tempData) {
  return (dispatch) => {
    let url;
    // if(id===undefined){
    //     url = routes.GET_GLACCOUNTS;
    // }else{

    // }

    // url = routes.JOURNAL_ENTRIES+`?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}`;
    url = routes.JOURNAL_ENTRIES + `/journalentriesexport?${payload}`;

    let consume = ApiService.request(url, "GET", "", "", "", "blob");
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
          link.setAttribute("download", "journal-entries.xlsx");
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
      return { type: accountingConstants.EXPORT_JOURNAL_ENTRY_PENDING, user };
    }

    if (tempData !== undefined) {
      return {
        type: accountingConstants.EXPORT_JOURNAL_ENTRY_PENDING,
        user,
        tempData,
      };
    }
  }
  function success(response) {
    return { type: accountingConstants.EXPORT_JOURNAL_ENTRY_SUCCESS, response };
  }
  function failure(error) {
    return { type: accountingConstants.EXPORT_JOURNAL_ENTRY_FAILURE, error };
  }
}

function exportTrialBalance(payload, tempData) {
  return (dispatch) => {
    let url;
    // if(id===undefined){
    //     url = routes.GET_GLACCOUNTS;
    // }else{

    // }

    // url = routes.JOURNAL_ENTRIES+`?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}`;
    url = routes.HIT_TRIAL_BALANCE_EXPORT + `?${payload}`;

    let consume = ApiService.request(url, "GET", "", "", "", "blob");
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
          link.setAttribute("download", "Trial-balance.xlsx");
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
      return { type: accountingConstants.EXPORT_TRIAL_BALANCE_PENDING, user };
    }

    if (tempData !== undefined) {
      return {
        type: accountingConstants.EXPORT_TRIAL_BALANCE_PENDING,
        user,
        tempData,
      };
    }
  }
  function success(response) {
    return { type: accountingConstants.EXPORT_TRIAL_BALANCE_SUCCESS, response };
  }
  function failure(error) {
    return { type: accountingConstants.EXPORT_TRIAL_BALANCE_FAILURE, error };
  }
}

function exportTrialBalanceBasic(payload, tempData) {
  return (dispatch) => {
    let url;
    // if(id===undefined){
    //     url = routes.GET_GLACCOUNTS;
    // }else{

    // }

    // url = routes.JOURNAL_ENTRIES+`?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}`;
    url = routes.HIT_TRIAL_BALANCE_EXPORT + `?${payload}`;

    let consume = ApiService.request(url, "GET", "", "", "", "blob");
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
          link.setAttribute("download", "Trial-balance.xlsx");
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
        type: accountingConstants.EXPORT_TRIAL_BALANCE_BASIC_PENDING,
        user,
      };
    }

    if (tempData !== undefined) {
      return {
        type: accountingConstants.EXPORT_TRIAL_BALANCE_BASIC_PENDING,
        user,
        tempData,
      };
    }
  }
  function success(response) {
    return {
      type: accountingConstants.EXPORT_TRIAL_BALANCE_BASIC_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: accountingConstants.EXPORT_TRIAL_BALANCE_BASIC_FAILURE,
      error,
    };
  }
}

function createJournalEntry(createJournalEntryPayload) {
  if (createJournalEntryPayload !== "CLEAR") {
    return (dispatch) => {
      let consume = ApiService.request(
        routes.JOURNAL_ENTRIES,
        "POST",
        createJournalEntryPayload
      );
      // console.log('payload is',createJournalEntryPayload )
      // if(createJournalEntryPayload.jornalEntryModel.glAccountId!==''
      //     && createJournalEntryPayload.jornalEntryModel.amount!==null
      //     && createJournalEntryPayload.jornalEntryModel.journalEntryType!==''
      //     && createJournalEntryPayload.jornalEntryModel.branchId!==''
      //     && createJournalEntryPayload.jornalEntryModel.bookingDate!==''){

      //         console.log('payload is',createJournalEntryPayload )
      dispatch(request(consume));
      return consume
        .then((response) => {
          dispatch(success(response));
        })
        .catch((error) => {
          dispatch(failure(handleRequestErrors(error)));
        });
      // }else{
      //     dispatch(failure(handleRequestErrors('Please provide all details')));
      // }
    };
  }

  return (dispatch) => {
    dispatch(clear());
  };

  function request(user) {
    return { type: accountingConstants.CREATE_JOURNAL_ENTRY_PENDING, user };
  }
  function success(response) {
    return { type: accountingConstants.CREATE_JOURNAL_ENTRY_SUCCESS, response };
  }
  function failure(error) {
    return { type: accountingConstants.CREATE_JOURNAL_ENTRY_FAILURE, error };
  }
  function clear() {
    return {
      type: accountingConstants.CREATE_JOURNAL_ENTRY_RESET,
      clear_data: "",
    };
  }
}

function getTrialBalance(payload, tempData) {
  return (dispatch) => {
    let url;
    // branchId = parseInt(JSON.parse(localStorage.getItem('lingoAuth').BranchId)

    url =
      routes.HIT_TRIAL_BALANCE +
      `?BranchId=${payload.branchId}&CurrencyCode=${payload.CurrencyCode}&StartDate=${payload.StartDate}&EndDate=${payload.EndDate}&PageSize=50&CurrentPage=1`;
    // url = routes.HIT_TRIAL_BALANCE+`?BranchId=${branchId}&StartDate=${payload.StartDate}&EndDate=${payload.EndDate}`;

    let consume = ApiService.request(url, "GET", null);
    dispatch(request(consume, tempData));
    return consume
      .then((response) => {
        dispatch(success(response));
      })
      .catch((error) => {
        dispatch(failure(handleRequestErrors(error)));
      });
  };

  // return dispatch =>{

  //     dispatch(clear());

  // }

  function request(user, tempData) {
    if (tempData === undefined) {
      return { type: accountingConstants.GET_TRIAL_BALANCE_PENDING, user };
    }
    if (tempData !== undefined) {
      return {
        type: accountingConstants.GET_TRIAL_BALANCE_PENDING,
        user,
        tempData,
      };
    }
  }
  function success(response) {
    return { type: accountingConstants.GET_TRIAL_BALANCE_SUCCESS, response };
  }
  function failure(error) {
    return { type: accountingConstants.GET_TRIAL_BALANCE_FAILURE, error };
  }
}

function getTrialBalanceBasic(payload, tempData) {
  return (dispatch) => {
    let url;
    // branchId = parseInt(JSON.parse(localStorage.getItem('lingoAuth').BranchId)

    url =
      routes.HIT_TRIAL_BALANCE +
      `?BranchId=${payload.branchId}&CurrencyCode=${payload.CurrencyCode}&EndDate=${payload.EndDate}&PageSize=50&CurrentPage=1`;
    // url = routes.HIT_TRIAL_BALANCE+`?BranchId=${payload.branchId}&StartDate=${payload.StartDate}&EndDate=${payload.EndDate}&PageSize=50&CurrentPage=1`;
    // url = routes.HIT_TRIAL_BALANCE+`?BranchId=${branchId}&StartDate=${payload.StartDate}&EndDate=${payload.EndDate}`;

    let consume = ApiService.request(url, "GET", null);
    dispatch(request(consume, tempData));
    return consume
      .then((response) => {
        dispatch(success(response));
      })
      .catch((error) => {
        dispatch(failure(handleRequestErrors(error)));
      });
  };

  // return dispatch =>{

  //     dispatch(clear());

  // }

  function request(user, tempData) {
    if (tempData === undefined) {
      return {
        type: accountingConstants.GET_TRIAL_BALANCE_BASIC_PENDING,
        user,
      };
    }
    if (tempData !== undefined) {
      return {
        type: accountingConstants.GET_TRIAL_BALANCE_BASIC_PENDING,
        user,
        tempData,
      };
    }
  }
  function success(response) {
    return {
      type: accountingConstants.GET_TRIAL_BALANCE_BASIC_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return { type: accountingConstants.GET_TRIAL_BALANCE_BASIC_FAILURE, error };
  }
}

function getProfitAndLoss(payload, tempData) {
  return (dispatch) => {
    let url;

    url =
      routes.HIT_PROFIT_LOSS +
      `?BranchId=${payload.branchId}&StartDate=${payload.StartDate}&EndDate=${payload.EndDate}`;

    let consume = ApiService.request(url, "GET", null);
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
      return { type: accountingConstants.GET_PROFIT_AND_LOSS_PENDING, user };
    }
    if (tempData !== undefined) {
      return {
        type: accountingConstants.GET_PROFIT_AND_LOSS_PENDING,
        user,
        tempData,
      };
    }
  }
  function success(response) {
    return { type: accountingConstants.GET_PROFIT_AND_LOSS_SUCCESS, response };
  }
  function failure(error) {
    return { type: accountingConstants.GET_PROFIT_AND_LOSS_FAILURE, error };
  }
}

function getBalanceSheet(payload, tempData) {
  return (dispatch) => {
    let url;

    url =
      routes.HIT_BALANCE_SHEET +
      `?BranchId=${payload.branchId}&Month=${payload.Month}&Year=${payload.Year}&BalanceSheetDate=${payload.BalanceSheetDate}&PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}`;

    let consume = ApiService.request(url, "GET", null);
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
      return { type: accountingConstants.GET_BALANCE_SHEET_PENDING, user };
    }
    if (tempData !== undefined) {
      return {
        type: accountingConstants.GET_BALANCE_SHEET_PENDING,
        user,
        tempData,
      };
    }
  }
  function success(response) {
    return { type: accountingConstants.GET_BALANCE_SHEET_SUCCESS, response };
  }
  function failure(error) {
    return { type: accountingConstants.GET_BALANCE_SHEET_FAILURE, error };
  }
}

function exportBalanceSheet(payload, tempData) {
  return (dispatch) => {
    let url;
    // if(id===undefined){
    //     url = routes.GET_GLACCOUNTS;
    // }else{

    // }

    // url = routes.JOURNAL_ENTRIES+`?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}`;
    url = routes.HIT_BALANCE_SHEET_EXPORT + `/?${payload}`;

    let consume = ApiService.request(url, "GET", "", "", "", "blob");
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
          link.setAttribute("download", "Balance-sheet.xlsx");
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
        type: accountingConstants.EXPORT_JOURNAL_BALANCESHEET_PENDING,
        user,
      };
    }

    if (tempData !== undefined) {
      return {
        type: accountingConstants.EXPORT_JOURNAL_BALANCESHEET_PENDING,
        user,
        tempData,
      };
    }
  }
  function success(response) {
    return {
      type: accountingConstants.EXPORT_JOURNAL_BALANCESHEET_SUCCESS,
      response,
    };
  }
  function failure(error) {
    return {
      type: accountingConstants.EXPORT_JOURNAL_BALANCESHEET_FAILURE,
      error,
    };
  }
}

function exportProfitLoss(payload, tempData) {
  return (dispatch) => {
    let url;
    // if(id===undefined){
    //     url = routes.GET_GLACCOUNTS;
    // }else{

    // }

    // url = routes.JOURNAL_ENTRIES+`?PageSize=${payload.PageSize}&CurrentPage=${payload.CurrentPage}`;
    url = routes.HIT_PROFIT_LOSS_EXPORT + `/?${payload}`;

    let consume = ApiService.request(url, "GET", "", "", "", "blob");
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
          link.setAttribute("download", "Profit-loss.xlsx");
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
      return { type: accountingConstants.EXPORT_PROFIT_LOSS_PENDING, user };
    }

    if (tempData !== undefined) {
      return {
        type: accountingConstants.EXPORT_PROFIT_LOSS_PENDING,
        user,
        tempData,
      };
    }
  }
  function success(response) {
    return { type: accountingConstants.EXPORT_PROFIT_LOSS_SUCCESS, response };
  }
  function failure(error) {
    return { type: accountingConstants.EXPORT_PROFIT_LOSS_FAILURE, error };
  }
}
