import {administrationConstants} from '../../actiontypes/administration/administration.constants'

export function getAllUsersReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_ALL_USERS_PENDING:
            return {
                request_status: administrationConstants.GET_ALL_USERS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_ALL_USERS_SUCCESS:
            return {
                request_status: administrationConstants.GET_ALL_USERS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ALL_USERS_FAILURE:
            return {
                request_status: administrationConstants.GET_ALL_USERS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function createRoleReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.CREATE_A_ROLE_PENDING:
            return {
                request_status: administrationConstants.CREATE_A_ROLE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.CREATE_A_ROLE_SUCCESS:
            return {
                request_status: administrationConstants.CREATE_A_ROLE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.CREATE_A_ROLE_FAILURE:
            return {
                request_status: administrationConstants.CREATE_A_ROLE_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getOrganizationDetailsReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_ORGANIZATION_DETAILS_PENDING:
            return {
                request_status: administrationConstants.GET_ORGANIZATION_DETAILS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_ORGANIZATION_DETAILS_SUCCESS:
            return {
                request_status: administrationConstants.GET_ORGANIZATION_DETAILS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ORGANIZATION_DETAILS_FAILURE:
            return {
                request_status: administrationConstants.GET_ORGANIZATION_DETAILS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function updateOrganizationDetailsReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.UPDATE_ORGANIZATION_DETAILS_PENDING:
            return {
                request_status: administrationConstants.UPDATE_ORGANIZATION_DETAILS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.UPDATE_ORGANIZATION_DETAILS_SUCCESS:
            return {
                request_status: administrationConstants.UPDATE_ORGANIZATION_DETAILS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_ORGANIZATION_DETAILS_FAILURE:
            return {
                request_status: administrationConstants.UPDATE_ORGANIZATION_DETAILS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_ORGANIZATION_DETAILS_RESET:
            return {
                request_status: administrationConstants.UPDATE_ORGANIZATION_DETAILS_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function createCustomerTypeReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.CREATE_CUSTOMERTYPE_PENDING:
            return {
                request_status: administrationConstants.CREATE_CUSTOMERTYPE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.CREATE_CUSTOMERTYPE_SUCCESS:
            return {
                request_status: administrationConstants.CREATE_CUSTOMERTYPE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.CREATE_CUSTOMERTYPE_FAILURE:
            return {
                request_status: administrationConstants.CREATE_CUSTOMERTYPE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.CREATE_CUSTOMERTYPE_RESET:
            return {
                request_status: administrationConstants.CREATE_CUSTOMERTYPE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getTransactionChannelsReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_TRANSACTION_CHANNELS_PENDING:
            return {
                request_status: administrationConstants.GET_TRANSACTION_CHANNELS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS:
            return {
                request_status: administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_TRANSACTION_CHANNELS_FAILURE:
            return {
                request_status: administrationConstants.GET_TRANSACTION_CHANNELS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_TRANSACTION_CHANNELS_RESET:
            return {
                request_status: administrationConstants.GET_TRANSACTION_CHANNELS_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function createTransactionChannelReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.CREATE_TRANSACTION_CHANNEL_PENDING:
            return {
                request_status: administrationConstants.CREATE_TRANSACTION_CHANNEL_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.CREATE_TRANSACTION_CHANNEL_SUCCESS:
            return {
                request_status: administrationConstants.CREATE_TRANSACTION_CHANNEL_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.CREATE_TRANSACTION_CHANNEL_FAILURE:
            return {
                request_status: administrationConstants.CREATE_TRANSACTION_CHANNEL_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.CREATE_TRANSACTION_CHANNEL_RESET:
            return {
                request_status: administrationConstants.CREATE_TRANSACTION_CHANNEL_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function createNewCurrencyReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.CREATE_NEWCURRENCY_PENDING:
            return {
                request_status: administrationConstants.CREATE_NEWCURRENCY_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.CREATE_NEWCURRENCY_SUCCESS:
            return {
                request_status: administrationConstants.CREATE_NEWCURRENCY_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.CREATE_NEWCURRENCY_FAILURE:
            return {
                request_status: administrationConstants.CREATE_NEWCURRENCY_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.CREATE_NEWCURRENCY_RESET:
            return {
                request_status: administrationConstants.CREATE_NEWCURRENCY_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function updateCurrencyReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.UPDATE_CURRENCY_PENDING:
            return {
                request_status: administrationConstants.UPDATE_CURRENCY_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.UPDATE_CURRENCY_SUCCESS:
            return {
                request_status: administrationConstants.UPDATE_CURRENCY_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_CURRENCY_FAILURE:
            return {
                request_status: administrationConstants.UPDATE_CURRENCY_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_CURRENCY_RESET:
            return {
                request_status: administrationConstants.UPDATE_CURRENCY_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getAllCurrenciesReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_ALLCURRENCIES_PENDING:
            return {
                request_status: administrationConstants.GET_ALLCURRENCIES_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_ALLCURRENCIES_SUCCESS:
            return {
                request_status: administrationConstants.GET_ALLCURRENCIES_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ALLCURRENCIES_FAILURE:
            return {
                request_status: administrationConstants.GET_ALLCURRENCIES_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ALLCURRENCIES_RESET:
            return {
                request_status: administrationConstants.GET_ALLCURRENCIES_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function setCurrencyConversionRateReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.SET_CONVERSION_RATE_PENDING:
            return {
                request_status: administrationConstants.SET_CONVERSION_RATE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.SET_CONVERSION_RATE_SUCCESS:
            return {
                request_status: administrationConstants.SET_CONVERSION_RATE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.SET_CONVERSION_RATE_FAILURE:
            return {
                request_status: administrationConstants.SET_CONVERSION_RATE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.SET_CONVERSION_RATE_RESET:
            return {
                request_status: administrationConstants.SET_CONVERSION_RATE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getSmsSettingsReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_SMS_SETTINGS_PENDING:
            return {
                request_status: administrationConstants.GET_SMS_SETTINGS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_SMS_SETTINGS_SUCCESS:
            return {
                request_status: administrationConstants.GET_SMS_SETTINGS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_SMS_SETTINGS_FAILURE:
            return {
                request_status: administrationConstants.GET_SMS_SETTINGS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_SMS_SETTINGS_RESET:
            return {
                request_status: administrationConstants.GET_SMS_SETTINGS_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function smsSettingsReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.SMS_SETTINGS_PENDING:
            return {
                request_status: administrationConstants.SMS_SETTINGS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.SMS_SETTINGS_SUCCESS:
            return {
                request_status: administrationConstants.SMS_SETTINGS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.SMS_SETTINGS_FAILURE:
            return {
                request_status: administrationConstants.SMS_SETTINGS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.SMS_SETTINGS_RESET:
            return {
                request_status: administrationConstants.SMS_SETTINGS_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getEmailSettingsReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_EMAIL_SETTINGS_PENDING:
            return {
                request_status: administrationConstants.GET_EMAIL_SETTINGS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_EMAIL_SETTINGS_SUCCESS:
            return {
                request_status: administrationConstants.GET_EMAIL_SETTINGS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_EMAIL_SETTINGS_FAILURE:
            return {
                request_status: administrationConstants.GET_EMAIL_SETTINGS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_EMAIL_SETTINGS_RESET:
            return {
                request_status: administrationConstants.GET_EMAIL_SETTINGS_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function emailSettingsReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.EMAIL_SETTINGS_PENDING:
            return {
                request_status: administrationConstants.EMAIL_SETTINGS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.EMAIL_SETTINGS_SUCCESS:
            return {
                request_status: administrationConstants.EMAIL_SETTINGS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.EMAIL_SETTINGS_FAILURE:
            return {
                request_status: administrationConstants.EMAIL_SETTINGS_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.EMAIL_SETTINGS_RESET:
            return {
                request_status: administrationConstants.EMAIL_SETTINGS_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getAccessPreferencesReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_ACCESS_PREFERENCE_PENDING:
            return {
                request_status: administrationConstants.GET_ACCESS_PREFERENCE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_ACCESS_PREFERENCE_SUCCESS:
            return {
                request_status: administrationConstants.GET_ACCESS_PREFERENCE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ACCESS_PREFERENCE_FAILURE:
            return {
                request_status: administrationConstants.GET_ACCESS_PREFERENCE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ACCESS_PREFERENCE_RESET:
            return {
                request_status: administrationConstants.GET_ACCESS_PREFERENCE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function accessPreferencesReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.UPDATE_ACCESS_PREFERENCE_PENDING:
            return {
                request_status: administrationConstants.UPDATE_ACCESS_PREFERENCE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.UPDATE_ACCESS_PREFERENCE_SUCCESS:
            return {
                request_status: administrationConstants.UPDATE_ACCESS_PREFERENCE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_ACCESS_PREFERENCE_FAILURE:
            return {
                request_status: administrationConstants.UPDATE_ACCESS_PREFERENCE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_ACCESS_PREFERENCE_RESET:
            return {
                request_status: administrationConstants.UPDATE_ACCESS_PREFERENCE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function internalControlReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.UPDATE_INTERNAL_CONTROL_PENDING:
            return {
                request_status: administrationConstants.UPDATE_INTERNAL_CONTROL_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.UPDATE_INTERNAL_CONTROL_SUCCESS:
            return {
                request_status: administrationConstants.UPDATE_INTERNAL_CONTROL_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_INTERNAL_CONTROL_FAILURE:
            return {
                request_status: administrationConstants.UPDATE_INTERNAL_CONTROL_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_INTERNAL_CONTROL_RESET:
            return {
                request_status: administrationConstants.UPDATE_INTERNAL_CONTROL_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function getAllBranchesReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_ALL_BRANCHES_PENDING:
            return {
                request_status: administrationConstants.GET_ALL_BRANCHES_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_ALL_BRANCHES_SUCCESS:
            return {
                request_status: administrationConstants.GET_ALL_BRANCHES_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ALL_BRANCHES_FAILURE:
            return {
                request_status: administrationConstants.GET_ALL_BRANCHES_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ALL_BRANCHES_RESET:
            return {
                request_status: administrationConstants.GET_ALL_BRANCHES_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function createNewBranchReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.CREATE_NEW_BRANCH_PENDING:
            return {
                request_status: administrationConstants.CREATE_NEW_BRANCH_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.CREATE_NEW_BRANCH_SUCCESS:
            return {
                request_status: administrationConstants.CREATE_NEW_BRANCH_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.CREATE_NEW_BRANCH_FAILURE:
            return {
                request_status: administrationConstants.CREATE_NEW_BRANCH_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.CREATE_NEW_BRANCH_RESET:
            return {
                request_status: administrationConstants.CREATE_NEW_BRANCH_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}


