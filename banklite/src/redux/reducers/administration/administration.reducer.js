import {administrationConstants} from '../../actiontypes/administration/administration.constants'

export function getUsersReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_USERS_PENDING:
            return {
                request_status: administrationConstants.GET_USERS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_USERS_SUCCESS:
            return {
                request_status: administrationConstants.GET_USERS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_USERS_FAILURE:
            return {
                request_status: administrationConstants.GET_USERS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

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

export function getAUserReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_A_USER_PENDING:
            return {
                request_status: administrationConstants.GET_A_USER_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_A_USER_SUCCESS:
            return {
                request_status: administrationConstants.GET_A_USER_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_A_USER_FAILURE:
            return {
                request_status: administrationConstants.GET_A_USER_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getAUserActivitiesReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_A_USER_ACTIVITIES_PENDING:
            return {
                request_status: administrationConstants.GET_A_USER_ACTIVITIES_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_A_USER_ACTIVITIES_SUCCESS:
            return {
                request_status: administrationConstants.GET_A_USER_ACTIVITIES_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_A_USER_ACTIVITIES_FAILURE:
            return {
                request_status: administrationConstants.GET_A_USER_ACTIVITIES_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function createAUserReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.CREATE_A_USER_PENDING:
            return {
                request_status: administrationConstants.CREATE_A_USER_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.CREATE_A_USER_SUCCESS:
            return {
                request_status: administrationConstants.CREATE_A_USER_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.CREATE_A_USER_FAILURE:
            return {
                request_status: administrationConstants.CREATE_A_USER_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.CREATE_A_USER_RESET:
            return {
                request_status: administrationConstants.CREATE_A_USER_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function updateAUserReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.UPDATE_A_USER_PENDING:
            return {
                request_status: administrationConstants.UPDATE_A_USER_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.UPDATE_A_USER_SUCCESS:
            return {
                request_status: administrationConstants.UPDATE_A_USER_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_A_USER_FAILURE:
            return {
                request_status: administrationConstants.UPDATE_A_USER_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_A_USER_RESET:
            return {
                request_status: administrationConstants.UPDATE_A_USER_RESET,
                is_request_processing: false,
                request_data: {}
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
        case administrationConstants.CREATE_A_ROLE_RESET:
            return {
                request_status: administrationConstants.CREATE_A_ROLE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function updateARoleReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.UPDATE_A_ROLE_PENDING:
            return {
                request_status: administrationConstants.UPDATE_A_ROLE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.UPDATE_A_ROLE_SUCCESS:
            return {
                request_status: administrationConstants.UPDATE_A_ROLE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_A_ROLE_FAILURE:
            return {
                request_status: administrationConstants.UPDATE_A_ROLE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_A_ROLE_RESET:
            return {
                request_status: administrationConstants.UPDATE_A_ROLE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }
}

export function getRolesReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_ROLES_PENDING:
            return {
                request_status: administrationConstants.GET_ROLES_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_ROLES_SUCCESS:
            return {
                request_status: administrationConstants.GET_ROLES_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ROLES_FAILURE:
            return {
                request_status: administrationConstants.GET_ROLES_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getARoleReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_A_ROLE_PENDING:
            return {
                request_status: administrationConstants.GET_A_ROLE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_A_ROLE_SUCCESS:
            return {
                request_status: administrationConstants.GET_A_ROLE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_A_ROLE_FAILURE:
            return {
                request_status: administrationConstants.GET_A_ROLE_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getAllRolesReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_ALL_ROLES_PENDING:
            return {
                request_status: administrationConstants.GET_ALL_ROLES_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_ALL_ROLES_SUCCESS:
            return {
                request_status: administrationConstants.GET_ALL_ROLES_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ALL_ROLES_FAILURE:
            return {
                request_status: administrationConstants.GET_ALL_ROLES_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getAllPermissionsReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_ROLE_PERMISSIONS_PENDING:
            return {
                request_status: administrationConstants.GET_ROLE_PERMISSIONS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_ROLE_PERMISSIONS_SUCCESS:
            return {
                request_status: administrationConstants.GET_ROLE_PERMISSIONS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ROLE_PERMISSIONS_FAILURE:
            return {
                request_status: administrationConstants.GET_ROLE_PERMISSIONS_FAILURE,
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

export function getCustomerTypesReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_CUSTOMERTYPES_PENDING:
            return {
                request_status: administrationConstants.GET_CUSTOMERTYPES_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_CUSTOMERTYPES_SUCCESS:
            return {
                request_status: administrationConstants.GET_CUSTOMERTYPES_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_CUSTOMERTYPES_FAILURE:
            return {
                request_status: administrationConstants.GET_CUSTOMERTYPES_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }
}

export function getAllCustomerTypesReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_ALL_CUSTOMERTYPES_PENDING:
            return {
                request_status: administrationConstants.GET_ALL_CUSTOMERTYPES_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_ALL_CUSTOMERTYPES_SUCCESS:
            return {
                request_status: administrationConstants.GET_ALL_CUSTOMERTYPES_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ALL_CUSTOMERTYPES_FAILURE:
            return {
                request_status: administrationConstants.GET_ALL_CUSTOMERTYPES_FAILURE,
                is_request_processing: false,
                request_data: action
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

export function updateCustomerTypeReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.UPDATE_CUSTOMERTYPE_PENDING:
            return {
                request_status: administrationConstants.UPDATE_CUSTOMERTYPE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.UPDATE_CUSTOMERTYPE_SUCCESS:
            return {
                request_status: administrationConstants.UPDATE_CUSTOMERTYPE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_CUSTOMERTYPE_FAILURE:
            return {
                request_status: administrationConstants.UPDATE_CUSTOMERTYPE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_CUSTOMERTYPE_RESET:
            return {
                request_status: administrationConstants.UPDATE_CUSTOMERTYPE_RESET,
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

export function updateTransactionChannelReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.UPDATE_TRANSACTION_CHANNEL_PENDING:
            return {
                request_status: administrationConstants.UPDATE_TRANSACTION_CHANNEL_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.UPDATE_TRANSACTION_CHANNEL_SUCCESS:
            return {
                request_status: administrationConstants.UPDATE_TRANSACTION_CHANNEL_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_TRANSACTION_CHANNEL_FAILURE:
            return {
                request_status: administrationConstants.UPDATE_TRANSACTION_CHANNEL_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_TRANSACTION_CHANNEL_RESET:
            return {
                request_status: administrationConstants.UPDATE_TRANSACTION_CHANNEL_RESET,
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

export function getInternalControlReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_INTERNAL_CONTROL_PENDING:
            return {
                request_status: administrationConstants.GET_INTERNAL_CONTROL_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_INTERNAL_CONTROL_SUCCESS:
            return {
                request_status: administrationConstants.GET_INTERNAL_CONTROL_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_INTERNAL_CONTROL_FAILURE:
            return {
                request_status: administrationConstants.GET_INTERNAL_CONTROL_FAILURE,
                is_request_processing: false,
                request_data: action
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

export function fetchBranchesListReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.FETCH_BRANCHES_LIST_PENDING:
            return {
                request_status: administrationConstants.FETCH_BRANCHES_LIST_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.FETCH_BRANCHES_LIST_SUCCESS:
            return {
                request_status: administrationConstants.FETCH_BRANCHES_LIST_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.FETCH_BRANCHES_LIST_FAILURE:
            return {
                request_status: administrationConstants.FETCH_BRANCHES_LIST_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }

}

export function getABranchReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_A_BRANCH_PENDING:
            return {
                request_status: administrationConstants.GET_A_BRANCH_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_A_BRANCH_SUCCESS:
            return {
                request_status: administrationConstants.GET_A_BRANCH_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_A_BRANCH_FAILURE:
            return {
                request_status: administrationConstants.GET_A_BRANCH_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_A_BRANCH_RESET:
            return {
                request_status: administrationConstants.GET_A_BRANCH_RESET,
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

export function updateABranchReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.UPDATE_A_BRANCH_PENDING:
            return {
                request_status: administrationConstants.UPDATE_A_BRANCH_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.UPDATE_A_BRANCH_SUCCESS:
            return {
                request_status: administrationConstants.UPDATE_A_BRANCH_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_A_BRANCH_FAILURE:
            return {
                request_status: administrationConstants.UPDATE_A_BRANCH_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_A_BRANCH_RESET:
            return {
                request_status: administrationConstants.UPDATE_A_BRANCH_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}


export function getNotificationsReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_NOTIFICATIONS_PENDING:
            return {
                request_status: administrationConstants.GET_NOTIFICATIONS_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_NOTIFICATIONS_SUCCESS:
            return {
                request_status: administrationConstants.GET_NOTIFICATIONS_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_NOTIFICATIONS_FAILURE:
            return {
                request_status: administrationConstants.GET_NOTIFICATIONS_FAILURE,
                is_request_processing: false,
                request_data: action
            };

        default:
            return { ...state }
    }

}


export function uploadDataReducer(state=[], action) {
    switch (action.type) {
        case administrationConstants.UPLOAD_DATA_PENDING:
            return {
                request_status: administrationConstants.UPLOAD_DATA_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.UPLOAD_DATA_SUCCESS:
            return {
                request_status: administrationConstants.UPLOAD_DATA_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPLOAD_DATA_FAILURE:
            return {
                request_status: administrationConstants.UPLOAD_DATA_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPLOAD_DATA_RESET:
            return {
                request_status: administrationConstants.UPLOAD_DATA_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}


//Notification Templates
export function fetchAllNotificationTemplate(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_ALL_NOTIFICATION_TEMPLATE_PENDING:
            return {
                request_status: administrationConstants.GET_ALL_NOTIFICATION_TEMPLATE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_ALL_NOTIFICATION_TEMPLATE_SUCCESS:
            return {
                request_status: administrationConstants.GET_ALL_NOTIFICATION_TEMPLATE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ALL_NOTIFICATION_TEMPLATE_FAILURE:
            return {
                request_status: administrationConstants.GET_ALL_NOTIFICATION_TEMPLATE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ALL_NOTIFICATION_TEMPLATE_RESET:
            return {
                request_status: administrationConstants.GET_ALL_NOTIFICATION_TEMPLATE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function getANotificationTemplate(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_A_NOTIFICATION_TEMPLATE_PENDING:
            return {
                request_status: administrationConstants.GET_A_NOTIFICATION_TEMPLATE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_A_NOTIFICATION_TEMPLATE_SUCCESS:
            return {
                request_status: administrationConstants.GET_A_NOTIFICATION_TEMPLATE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_A_NOTIFICATION_TEMPLATE_FAILURE:
            return {
                request_status: administrationConstants.GET_A_NOTIFICATION_TEMPLATE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_A_NOTIFICATION_TEMPLATE_RESET:
            return {
                request_status: administrationConstants.GET_A_NOTIFICATION_TEMPLATE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function createANotificationTemplate(state=[], action) {
    switch (action.type) {
        case administrationConstants.ADD_A_NOTIFICATION_TEMPLATE_PENDING:
            return {
                request_status: administrationConstants.ADD_A_NOTIFICATION_TEMPLATE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.ADD_A_NOTIFICATION_TEMPLATE_SUCCESS:
            return {
                request_status: administrationConstants.ADD_A_NOTIFICATION_TEMPLATE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.ADD_A_NOTIFICATION_TEMPLATE_FAILURE:
            return {
                request_status: administrationConstants.ADD_A_NOTIFICATION_TEMPLATE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.ADD_A_NOTIFICATION_TEMPLATE_RESET:
            return {
                request_status: administrationConstants.ADD_A_NOTIFICATION_TEMPLATE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function updateANotificationTemplate(state=[], action) {
    switch (action.type) {
        case administrationConstants.UPDATE_A_NOTIFICATION_TEMPLATE_PENDING:
            return {
                request_status: administrationConstants.UPDATE_A_NOTIFICATION_TEMPLATE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.UPDATE_A_NOTIFICATION_TEMPLATE_SUCCESS:
            return {
                request_status: administrationConstants.UPDATE_A_NOTIFICATION_TEMPLATE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_A_NOTIFICATION_TEMPLATE_FAILURE:
            return {
                request_status: administrationConstants.UPDATE_A_NOTIFICATION_TEMPLATE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_A_NOTIFICATION_TEMPLATE_RESET:
            return {
                request_status: administrationConstants.UPDATE_A_NOTIFICATION_TEMPLATE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

//Channel Services
export function fetchAllChannelServices(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_ALL_CHANNEL_SERVICE_PENDING:
            return {
                request_status: administrationConstants.GET_ALL_CHANNEL_SERVICE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_ALL_CHANNEL_SERVICE_SUCCESS:
            return {
                request_status: administrationConstants.GET_ALL_CHANNEL_SERVICE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ALL_CHANNEL_SERVICE_FAILURE:
            return {
                request_status: administrationConstants.GET_ALL_CHANNEL_SERVICE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ALL_CHANNEL_SERVICE_RESET:
            return {
                request_status: administrationConstants.GET_ALL_CHANNEL_SERVICE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function getAChannelServices(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_A_CHANNEL_SERVICE_PENDING:
            return {
                request_status: administrationConstants.GET_A_CHANNEL_SERVICE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_A_CHANNEL_SERVICE_SUCCESS:
            return {
                request_status: administrationConstants.GET_A_CHANNEL_SERVICE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_A_CHANNEL_SERVICE_FAILURE:
            return {
                request_status: administrationConstants.GET_A_CHANNEL_SERVICE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_A_CHANNEL_SERVICE_RESET:
            return {
                request_status: administrationConstants.GET_A_CHANNEL_SERVICE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function createAChannelServices(state=[], action) {
    switch (action.type) {
        case administrationConstants.ADD_A_CHANNEL_SERVICE_PENDING:
            return {
                request_status: administrationConstants.ADD_A_CHANNEL_SERVICE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.ADD_A_CHANNEL_SERVICE_SUCCESS:
            return {
                request_status: administrationConstants.ADD_A_CHANNEL_SERVICE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.ADD_A_CHANNEL_SERVICE_FAILURE:
            return {
                request_status: administrationConstants.ADD_A_CHANNEL_SERVICE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.ADD_A_CHANNEL_SERVICE_RESET:
            return {
                request_status: administrationConstants.ADD_A_CHANNEL_SERVICE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function updateAChannelServices(state=[], action) {
    switch (action.type) {
        case administrationConstants.UPDATE_A_CHANNEL_SERVICE_PENDING:
            return {
                request_status: administrationConstants.UPDATE_A_CHANNEL_SERVICE_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.UPDATE_A_CHANNEL_SERVICE_SUCCESS:
            return {
                request_status: administrationConstants.UPDATE_A_CHANNEL_SERVICE_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_A_CHANNEL_SERVICE_FAILURE:
            return {
                request_status: administrationConstants.UPDATE_A_CHANNEL_SERVICE_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_A_CHANNEL_SERVICE_RESET:
            return {
                request_status: administrationConstants.UPDATE_A_CHANNEL_SERVICE_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

//Risk Level
export function fetchAllRiskLevel(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_ALL_RISK_LEVEL_PENDING:
            return {
                request_status: administrationConstants.GET_ALL_RISK_LEVEL_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_ALL_RISK_LEVEL_SUCCESS:
            return {
                request_status: administrationConstants.GET_ALL_RISK_LEVEL_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ALL_RISK_LEVEL_FAILURE:
            return {
                request_status: administrationConstants.GET_ALL_RISK_LEVEL_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_ALL_RISK_LEVEL_RESET:
            return {
                request_status: administrationConstants.GET_ALL_RISK_LEVEL_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function getARiskLevel(state=[], action) {
    switch (action.type) {
        case administrationConstants.GET_A_RISK_LEVEL_PENDING:
            return {
                request_status: administrationConstants.GET_A_RISK_LEVEL_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.GET_A_RISK_LEVEL_SUCCESS:
            return {
                request_status: administrationConstants.GET_A_RISK_LEVEL_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_A_RISK_LEVEL_FAILURE:
            return {
                request_status: administrationConstants.GET_A_RISK_LEVEL_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.GET_A_RISK_LEVEL_RESET:
            return {
                request_status: administrationConstants.GET_A_RISK_LEVEL_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function createARiskLevel(state=[], action) {
    switch (action.type) {
        case administrationConstants.ADD_A_RISK_LEVEL_PENDING:
            return {
                request_status: administrationConstants.ADD_A_RISK_LEVEL_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.ADD_A_RISK_LEVEL_SUCCESS:
            return {
                request_status: administrationConstants.ADD_A_RISK_LEVEL_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.ADD_A_RISK_LEVEL_FAILURE:
            return {
                request_status: administrationConstants.ADD_A_RISK_LEVEL_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.ADD_A_RISK_LEVEL_RESET:
            return {
                request_status: administrationConstants.ADD_A_RISK_LEVEL_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}

export function updateARiskLevel(state=[], action) {
    switch (action.type) {
        case administrationConstants.UPDATE_A_RISK_LEVEL_PENDING:
            return {
                request_status: administrationConstants.UPDATE_A_RISK_LEVEL_PENDING,
                is_request_processing: true,
                request_data: action
            };
        case administrationConstants.UPDATE_A_RISK_LEVEL_SUCCESS:
            return {
                request_status: administrationConstants.UPDATE_A_RISK_LEVEL_SUCCESS,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_A_RISK_LEVEL_FAILURE:
            return {
                request_status: administrationConstants.UPDATE_A_RISK_LEVEL_FAILURE,
                is_request_processing: false,
                request_data: action
            };
        case administrationConstants.UPDATE_A_RISK_LEVEL_RESET:
            return {
                request_status: administrationConstants.UPDATE_A_RISK_LEVEL_RESET,
                is_request_processing: false,
                request_data: {}
            };

        default:
            return { ...state }
    }

}


