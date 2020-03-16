import {productsConstants} from '../../actiontypes/products/products.constants'

export function getLoanProductsReducer(state=[], action) {
    switch (action.type) {
        case productsConstants.GET_LOAN_PRODUCTS_PENDING:
            return {
                request_status: productsConstants.GET_LOAN_PRODUCTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case productsConstants.GET_LOAN_PRODUCTS_SUCCESS:
            return {
                request_status: productsConstants.GET_LOAN_PRODUCTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case productsConstants.GET_LOAN_PRODUCTS_FAILURE:
            return {
                request_status: productsConstants.GET_LOAN_PRODUCTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getAllLoanProductsReducer(state=[], action) {
    switch (action.type) {
        case productsConstants.GET_ALL_LOAN_PRODUCTS_PENDING:
            return {
                request_status: productsConstants.GET_ALL_LOAN_PRODUCTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case productsConstants.GET_ALL_LOAN_PRODUCTS_SUCCESS:
            return {
                request_status: productsConstants.GET_ALL_LOAN_PRODUCTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case productsConstants.GET_ALL_LOAN_PRODUCTS_FAILURE:
            return {
                request_status: productsConstants.GET_ALL_LOAN_PRODUCTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getFullLoanProductsReducer(state=[], action) {
    switch (action.type) {
        case productsConstants.GET_FULL_LOAN_PRODUCTS_PENDING:
            return {
                request_status: productsConstants.GET_FULL_LOAN_PRODUCTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case productsConstants.GET_FULL_LOAN_PRODUCTS_SUCCESS:
            return {
                request_status: productsConstants.GET_FULL_LOAN_PRODUCTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case productsConstants.GET_FULL_LOAN_PRODUCTS_FAILURE:
            return {
                request_status: productsConstants.GET_FULL_LOAN_PRODUCTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}


export function getSingleLoanProductsReducer(state=[], action) {
    switch (action.type) {
        case productsConstants.GET_A_LOAN_PRODUCT_PENDING:
            return {
                request_status: productsConstants.GET_A_LOAN_PRODUCT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case productsConstants.GET_A_LOAN_PRODUCT_SUCCESS:
            return {
                request_status: productsConstants.GET_A_LOAN_PRODUCT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case productsConstants.GET_A_LOAN_PRODUCT_FAILURE:
            return {
                request_status: productsConstants.GET_A_LOAN_PRODUCT_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}


export function createLoanProductReducer(state=[], action) {
    switch (action.type) {
        case productsConstants.CREATE_A_LOAN_PRODUCT_PENDING:
            return {
                request_status: productsConstants.CREATE_A_LOAN_PRODUCT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case productsConstants.CREATE_A_LOAN_PRODUCT_SUCCESS:
            return {
                request_status: productsConstants.CREATE_A_LOAN_PRODUCT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case productsConstants.CREATE_A_LOAN_PRODUCT_FAILURE:
            return {
                request_status: productsConstants.CREATE_A_LOAN_PRODUCT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case productsConstants.CREATE_A_LOAN_PRODUCT_RESET:
            return {
                request_status: productsConstants.CREATE_A_LOAN_PRODUCT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}


export function updateLoanProductReducer(state=[], action) {
    switch (action.type) {
        case productsConstants.EDIT_A_LOAN_PRODUCT_PENDING:
            return {
                request_status: productsConstants.EDIT_A_LOAN_PRODUCT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case productsConstants.EDIT_A_LOAN_PRODUCT_SUCCESS:
            return {
                request_status: productsConstants.EDIT_A_LOAN_PRODUCT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case productsConstants.EDIT_A_LOAN_PRODUCT_FAILURE:
            return {
                request_status: productsConstants.EDIT_A_LOAN_PRODUCT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case productsConstants.EDIT_A_LOAN_PRODUCT_RESET:
            return {
                request_status: productsConstants.EDIT_A_LOAN_PRODUCT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}


export function getDepositProductsReducer(state=[], action) {
    switch (action.type) {
        case productsConstants.GET_DEPOSIT_PRODUCTS_PENDING:
            return {
                request_status: productsConstants.GET_DEPOSIT_PRODUCTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case productsConstants.GET_DEPOSIT_PRODUCTS_SUCCESS:
            return {
                request_status: productsConstants.GET_DEPOSIT_PRODUCTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case productsConstants.GET_DEPOSIT_PRODUCTS_FAILURE:
            return {
                request_status: productsConstants.GET_DEPOSIT_PRODUCTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}


export function getAllDepositProductsReducer(state=[], action) {
    switch (action.type) {
        case productsConstants.GET_ALL_DEPOSIT_PRODUCTS_PENDING:
            return {
                request_status: productsConstants.GET_ALL_DEPOSIT_PRODUCTS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case productsConstants.GET_ALL_DEPOSIT_PRODUCTS_SUCCESS:
            return {
                request_status: productsConstants.GET_ALL_DEPOSIT_PRODUCTS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case productsConstants.GET_ALL_DEPOSIT_PRODUCTS_FAILURE:
            return {
                request_status: productsConstants.GET_ALL_DEPOSIT_PRODUCTS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getSingleDepositProductsReducer(state=[], action) {
    switch (action.type) {
        case productsConstants.GET_A_DEPOSIT_PRODUCT_PENDING:
            return {
                request_status: productsConstants.GET_A_DEPOSIT_PRODUCT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case productsConstants.GET_A_DEPOSIT_PRODUCT_SUCCESS:
            return {
                request_status: productsConstants.GET_A_DEPOSIT_PRODUCT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case productsConstants.GET_A_DEPOSIT_PRODUCT_FAILURE:
            return {
                request_status: productsConstants.GET_A_DEPOSIT_PRODUCT_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}


export function createDepositProductReducer(state=[], action) {
    switch (action.type) {
        case productsConstants.CREATE_A_DEPOSIT_PRODUCT_PENDING:
            return {
                request_status: productsConstants.CREATE_A_DEPOSIT_PRODUCT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case productsConstants.CREATE_A_DEPOSIT_PRODUCT_SUCCESS:
            return {
                request_status: productsConstants.CREATE_A_DEPOSIT_PRODUCT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case productsConstants.CREATE_A_DEPOSIT_PRODUCT_FAILURE:
            return {
                request_status: productsConstants.CREATE_A_DEPOSIT_PRODUCT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case productsConstants.CREATE_A_DEPOSIT_PRODUCT_RESET:
            return {
                request_status: productsConstants.CREATE_A_DEPOSIT_PRODUCT_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}


export function updateDepositProductReducer(state=[], action) {
    switch (action.type) {
        case productsConstants.EDIT_A_DEPOSIT_PRODUCT_PENDING:
            return {
                request_status: productsConstants.EDIT_A_DEPOSIT_PRODUCT_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case productsConstants.EDIT_A_DEPOSIT_PRODUCT_SUCCESS:
            return {
                request_status: productsConstants.EDIT_A_DEPOSIT_PRODUCT_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case productsConstants.EDIT_A_DEPOSIT_PRODUCT_FAILURE:
            return {
                request_status: productsConstants.EDIT_A_DEPOSIT_PRODUCT_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case productsConstants.EDIT_A_DEPOSIT_PRODUCT_RESET:
            return {
                request_status: productsConstants.EDIT_A_DEPOSIT_PRODUCT_RESET,
                is_request_processing: false,
                request_data: {}
            };
            
            
        default:
            return { ...state }
    }
}







