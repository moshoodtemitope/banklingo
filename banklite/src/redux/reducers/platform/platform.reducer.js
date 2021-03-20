import {platformConstants} from '../../actiontypes/platform/platform.constants'

export function fetchAllCreditScoreByPassReducer(state=[], action) {
    switch (action.type) {
        case platformConstants.FETCH_ALLCREDIT_SCORE_BYPASS_PENDING:
            return {
                request_status: platformConstants.FETCH_ALLCREDIT_SCORE_BYPASS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.FETCH_ALLCREDIT_SCORE_BYPASS_SUCCESS:
            return {
                request_status: platformConstants.FETCH_ALLCREDIT_SCORE_BYPASS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.FETCH_ALLCREDIT_SCORE_BYPASS_FAILURE:
            return {
                request_status: platformConstants.FETCH_ALLCREDIT_SCORE_BYPASS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.FETCH_ALLCREDIT_SCORE_BYPASS_RESET:
            return {
                request_status: platformConstants.FETCH_ALLCREDIT_SCORE_BYPASS_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function fetchSingleCreditScoreByPassReducer(state=[], action) {
    switch (action.type) {
        case platformConstants.FETCH_SINGLECREDIT_SCORE_BYPASS_PENDING:
            return {
                request_status: platformConstants.FETCH_SINGLECREDIT_SCORE_BYPASS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.FETCH_SINGLECREDIT_SCORE_BYPASS_SUCCESS:
            return {
                request_status: platformConstants.FETCH_SINGLECREDIT_SCORE_BYPASS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.FETCH_SINGLECREDIT_SCORE_BYPASS_FAILURE:
            return {
                request_status: platformConstants.FETCH_SINGLECREDIT_SCORE_BYPASS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.FETCH_SINGLECREDIT_SCORE_BYPASS_RESET:
            return {
                request_status: platformConstants.FETCH_SINGLECREDIT_SCORE_BYPASS_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function createCreditScoreByPassReducer(state=[], action) {
    switch (action.type) {
        case platformConstants.CREATE_CREDIT_SCORE_BYPASS_PENDING:
            return {
                request_status: platformConstants.CREATE_CREDIT_SCORE_BYPASS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.CREATE_CREDIT_SCORE_BYPASS_SUCCESS:
            return {
                request_status: platformConstants.CREATE_CREDIT_SCORE_BYPASS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.CREATE_CREDIT_SCORE_BYPASS_FAILURE:
            return {
                request_status: platformConstants.CREATE_CREDIT_SCORE_BYPASS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.CREATE_CREDIT_SCORE_BYPASS_RESET:
            return {
                request_status: platformConstants.CREATE_CREDIT_SCORE_BYPASS_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function updateCreditScoreByPassReducer(state=[], action) {
    switch (action.type) {
        case platformConstants.UPDATE_CREDIT_SCORE_BYPASS_PENDING:
            return {
                request_status: platformConstants.UPDATE_CREDIT_SCORE_BYPASS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.UPDATE_CREDIT_SCORE_BYPASS_SUCCESS:
            return {
                request_status: platformConstants.UPDATE_CREDIT_SCORE_BYPASS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.UPDATE_CREDIT_SCORE_BYPASS_FAILURE:
            return {
                request_status: platformConstants.UPDATE_CREDIT_SCORE_BYPASS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.UPDATE_CREDIT_SCORE_BYPASS_RESET:
            return {
                request_status: platformConstants.UPDATE_CREDIT_SCORE_BYPASS_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}


export function getAllCompanyInfoReducer(state=[], action) {
    switch (action.type) {
        case platformConstants.GET_ALL_COMPANY_INFO_PENDING:
            return {
                request_status: platformConstants.GET_ALL_COMPANY_INFO_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.GET_ALL_COMPANY_INFO_SUCCESS:
            return {
                request_status: platformConstants.GET_ALL_COMPANY_INFO_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_ALL_COMPANY_INFO_FAILURE:
            return {
                request_status: platformConstants.GET_ALL_COMPANY_INFO_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_ALL_COMPANY_INFO_RESET:
            return {
                request_status: platformConstants.GET_ALL_COMPANY_INFO_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function getACompanyInfoReducer(state=[], action) {
    switch (action.type) {
        case platformConstants.GET_A_COMPANY_INFO_PENDING:
            return {
                request_status: platformConstants.GET_A_COMPANY_INFO_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.GET_A_COMPANY_INFO_SUCCESS:
            return {
                request_status: platformConstants.GET_A_COMPANY_INFO_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_A_COMPANY_INFO_FAILURE:
            return {
                request_status: platformConstants.GET_A_COMPANY_INFO_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_A_COMPANY_INFO_RESET:
            return {
                request_status: platformConstants.GET_A_COMPANY_INFO_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function newCompanyInfoReducer(state=[], action) {
    switch (action.type) {
        case platformConstants.ADD_A_COMPANY_INFO_PENDING:
            return {
                request_status: platformConstants.ADD_A_COMPANY_INFO_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.ADD_A_COMPANY_INFO_SUCCESS:
            return {
                request_status: platformConstants.ADD_A_COMPANY_INFO_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.ADD_A_COMPANY_INFO_FAILURE:
            return {
                request_status: platformConstants.ADD_A_COMPANY_INFO_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.ADD_A_COMPANY_INFO_RESET:
            return {
                request_status: platformConstants.ADD_A_COMPANY_INFO_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function updateCompanyInfoReducer(state=[], action) {
    switch (action.type) {
        case platformConstants.UPDATE_A_COMPANY_INFO_PENDING:
            return {
                request_status: platformConstants.UPDATE_A_COMPANY_INFO_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.UPDATE_A_COMPANY_INFO_SUCCESS:
            return {
                request_status: platformConstants.UPDATE_A_COMPANY_INFO_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.UPDATE_A_COMPANY_INFO_FAILURE:
            return {
                request_status: platformConstants.UPDATE_A_COMPANY_INFO_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.UPDATE_A_COMPANY_INFO_RESET:
            return {
                request_status: platformConstants.UPDATE_A_COMPANY_INFO_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}


//Payroll Groups
export function fetchAllPayrollGroupsReducer(state=[], action) {
    switch (action.type) {
        case platformConstants.GET_ALL_PAYROLLGROUP_PENDING:
            return {
                request_status: platformConstants.GET_ALL_PAYROLLGROUP_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.GET_ALL_PAYROLLGROUP_SUCCESS:
            return {
                request_status: platformConstants.GET_ALL_PAYROLLGROUP_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_ALL_PAYROLLGROUP_FAILURE:
            return {
                request_status: platformConstants.GET_ALL_PAYROLLGROUP_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_ALL_PAYROLLGROUP_RESET:
            return {
                request_status: platformConstants.GET_ALL_PAYROLLGROUP_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function getAPayrollGroupReducer(state=[], action) {
    switch (action.type) {
        case platformConstants.GET_A_PAYROLLGROUP_PENDING:
            return {
                request_status: platformConstants.GET_A_PAYROLLGROUP_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.GET_A_PAYROLLGROUP_SUCCESS:
            return {
                request_status: platformConstants.GET_A_PAYROLLGROUP_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_A_PAYROLLGROUP_FAILURE:
            return {
                request_status: platformConstants.GET_A_PAYROLLGROUP_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_A_PAYROLLGROUP_RESET:
            return {
                request_status: platformConstants.GET_A_PAYROLLGROUP_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function createAPayrollGroupReducer(state=[], action) {
    switch (action.type) {
        case platformConstants.ADD_A_PAYROLLGROUP_PENDING:
            return {
                request_status: platformConstants.ADD_A_PAYROLLGROUP_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.ADD_A_PAYROLLGROUP_SUCCESS:
            return {
                request_status: platformConstants.ADD_A_PAYROLLGROUP_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.ADD_A_PAYROLLGROUP_FAILURE:
            return {
                request_status: platformConstants.ADD_A_PAYROLLGROUP_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.ADD_A_PAYROLLGROUP_RESET:
            return {
                request_status: platformConstants.ADD_A_PAYROLLGROUP_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function updateAPayrollGroupReducer(state=[], action) {
    switch (action.type) {
        case platformConstants.UPDATE_A_PAYROLLGROUP_PENDING:
            return {
                request_status: platformConstants.UPDATE_A_PAYROLLGROUP_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.UPDATE_A_PAYROLLGROUP_SUCCESS:
            return {
                request_status: platformConstants.UPDATE_A_PAYROLLGROUP_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.UPDATE_A_PAYROLLGROUP_FAILURE:
            return {
                request_status: platformConstants.UPDATE_A_PAYROLLGROUP_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.UPDATE_A_PAYROLLGROUP_RESET:
            return {
                request_status: platformConstants.UPDATE_A_PAYROLLGROUP_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

//Payroll Groups
export function fetchAllCardProvider(state=[], action) {
    switch (action.type) {
        case platformConstants.GET_ALL_CARDPROVIDER_PENDING:
            return {
                request_status: platformConstants.GET_ALL_CARDPROVIDER_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.GET_ALL_CARDPROVIDER_SUCCESS:
            return {
                request_status: platformConstants.GET_ALL_CARDPROVIDER_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_ALL_CARDPROVIDER_FAILURE:
            return {
                request_status: platformConstants.GET_ALL_CARDPROVIDER_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_ALL_CARDPROVIDER_RESET:
            return {
                request_status: platformConstants.GET_ALL_CARDPROVIDER_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function getACardProvider(state=[], action) {
    switch (action.type) {
        case platformConstants.GET_A_CARDPROVIDER_PENDING:
            return {
                request_status: platformConstants.GET_A_CARDPROVIDER_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.GET_A_CARDPROVIDER_SUCCESS:
            return {
                request_status: platformConstants.GET_A_CARDPROVIDER_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_A_CARDPROVIDER_FAILURE:
            return {
                request_status: platformConstants.GET_A_CARDPROVIDER_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_A_CARDPROVIDER_RESET:
            return {
                request_status: platformConstants.GET_A_CARDPROVIDER_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function createACardProvider(state=[], action) {
    switch (action.type) {
        case platformConstants.ADD_A_CARDPROVIDER_PENDING:
            return {
                request_status: platformConstants.ADD_A_CARDPROVIDER_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.ADD_A_CARDPROVIDER_SUCCESS:
            return {
                request_status: platformConstants.ADD_A_CARDPROVIDER_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.ADD_A_CARDPROVIDER_FAILURE:
            return {
                request_status: platformConstants.ADD_A_CARDPROVIDER_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.ADD_A_CARDPROVIDER_RESET:
            return {
                request_status: platformConstants.ADD_A_CARDPROVIDER_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function updateACardProvider(state=[], action) {
    switch (action.type) {
        case platformConstants.UPDATE_A_CARDPROVIDER_PENDING:
            return {
                request_status: platformConstants.UPDATE_A_CARDPROVIDER_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.UPDATE_A_CARDPROVIDER_SUCCESS:
            return {
                request_status: platformConstants.UPDATE_A_CARDPROVIDER_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.UPDATE_A_CARDPROVIDER_FAILURE:
            return {
                request_status: platformConstants.UPDATE_A_CARDPROVIDER_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.UPDATE_A_CARDPROVIDER_RESET:
            return {
                request_status: platformConstants.UPDATE_A_CARDPROVIDER_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

//Employee Payroll Info
export function fetchAllEmployeeInfo(state=[], action) {
    switch (action.type) {
        case platformConstants.GET_ALL_PAYROLLINFO_PENDING:
            return {
                request_status: platformConstants.GET_ALL_PAYROLLINFO_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.GET_ALL_PAYROLLINFO_SUCCESS:
            return {
                request_status: platformConstants.GET_ALL_PAYROLLINFO_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_ALL_PAYROLLINFO_FAILURE:
            return {
                request_status: platformConstants.GET_ALL_PAYROLLINFO_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_ALL_PAYROLLINFO_RESET:
            return {
                request_status: platformConstants.GET_ALL_PAYROLLINFO_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function fetchSingleEmployeeInfo(state=[], action) {
    switch (action.type) {
        case platformConstants.GET_A_PAYROLLINFO_PENDING:
            return {
                request_status: platformConstants.GET_A_PAYROLLINFO_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.GET_A_PAYROLLINFO_SUCCESS:
            return {
                request_status: platformConstants.GET_A_PAYROLLINFO_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_A_PAYROLLINFO_FAILURE:
            return {
                request_status: platformConstants.GET_A_PAYROLLINFO_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_A_PAYROLLINFO_RESET:
            return {
                request_status: platformConstants.GET_A_PAYROLLINFO_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function createEmployeeInfo(state=[], action) {
    switch (action.type) {
        case platformConstants.ADD_A_PAYROLLINFO_PENDING:
            return {
                request_status: platformConstants.ADD_A_PAYROLLINFO_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.ADD_A_PAYROLLINFO_SUCCESS:
            return {
                request_status: platformConstants.ADD_A_PAYROLLINFO_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.ADD_A_PAYROLLINFO_FAILURE:
            return {
                request_status: platformConstants.ADD_A_PAYROLLINFO_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.ADD_A_PAYROLLINFO_RESET:
            return {
                request_status: platformConstants.ADD_A_PAYROLLINFO_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function updateEmployeeInfo(state=[], action) {
    switch (action.type) {
        case platformConstants.UPDATE_A_PAYROLLINFO_PENDING:
            return {
                request_status: platformConstants.UPDATE_A_PAYROLLINFO_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.UPDATE_A_PAYROLLINFO_SUCCESS:
            return {
                request_status: platformConstants.UPDATE_A_PAYROLLINFO_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.UPDATE_A_PAYROLLINFO_FAILURE:
            return {
                request_status: platformConstants.UPDATE_A_PAYROLLINFO_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.UPDATE_A_PAYROLLINFO_RESET:
            return {
                request_status: platformConstants.UPDATE_A_PAYROLLINFO_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}


//Bank  Info
export function fetchAllBankInfoReducer(state=[], action) {
    switch (action.type) {
        case platformConstants.GET_ALL_BANKINFO_PENDING:
            return {
                request_status: platformConstants.GET_ALL_BANKINFO_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.GET_ALL_BANKINFO_SUCCESS:
            return {
                request_status: platformConstants.GET_ALL_BANKINFO_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_ALL_BANKINFO_FAILURE:
            return {
                request_status: platformConstants.GET_ALL_BANKINFO_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_ALL_BANKINFO_RESET:
            return {
                request_status: platformConstants.GET_ALL_BANKINFO_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function fetchSingleBankInfoReducer(state=[], action) {
    switch (action.type) {
        case platformConstants.GET_A_BANKINFO_PENDING:
            return {
                request_status: platformConstants.GET_A_BANKINFO_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.GET_A_BANKINFO_SUCCESS:
            return {
                request_status: platformConstants.GET_A_BANKINFO_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_A_BANKINFO_FAILURE:
            return {
                request_status: platformConstants.GET_A_BANKINFO_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.GET_A_BANKINFO_RESET:
            return {
                request_status: platformConstants.GET_A_BANKINFO_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function createBankInfoReducer(state=[], action) {
    switch (action.type) {
        case platformConstants.ADD_A_BANKINFO_PENDING:
            return {
                request_status: platformConstants.ADD_A_BANKINFO_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.ADD_A_BANKINFO_SUCCESS:
            return {
                request_status: platformConstants.ADD_A_BANKINFO_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.ADD_A_BANKINFO_FAILURE:
            return {
                request_status: platformConstants.ADD_A_BANKINFO_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.ADD_A_BANKINFO_RESET:
            return {
                request_status: platformConstants.ADD_A_BANKINFO_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function updateBankInfoReducer(state=[], action) {
    switch (action.type) {
        case platformConstants.UPDATE_A_BANKINFO_PENDING:
            return {
                request_status: platformConstants.UPDATE_A_BANKINFO_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case platformConstants.UPDATE_A_BANKINFO_SUCCESS:
            return {
                request_status: platformConstants.UPDATE_A_BANKINFO_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.UPDATE_A_BANKINFO_FAILURE:
            return {
                request_status: platformConstants.UPDATE_A_BANKINFO_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case platformConstants.UPDATE_A_BANKINFO_RESET:
            return {
                request_status: platformConstants.UPDATE_A_BANKINFO_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}
