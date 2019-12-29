

import{
    getAllUsersReducer,
    createRoleReducer,
    updateOrganizationDetailsReducer,
    getOrganizationDetailsReducer,
    createCustomerTypeReducer,
    getTransactionChannelsReducer,
    createTransactionChannelReducer,
    createNewCurrencyReducer,
    updateCurrencyReducer,
    getAllCurrenciesReducer,
    setCurrencyConversionRateReducer,
    smsSettingsReducer,
    getSmsSettingsReducer,
    emailSettingsReducer,
    getEmailSettingsReducer,
    getAccessPreferencesReducer,
    accessPreferencesReducer,
    internalControlReducer,
    getAllBranchesReducer,
    createNewBranchReducer
} from './administration/administration.reducer'


import{
    getGLAccountsReducer,
    createGLAccountsReducer,
    updateGLAccountReducer,
    getAllGLAccountsReducer,
} from './accounting/accounting.reducer'




export const administration ={
    getAllUsersReducer,
    createRoleReducer,
    updateOrganizationDetailsReducer,
    getOrganizationDetailsReducer,
    createCustomerTypeReducer,
    getTransactionChannelsReducer,
    createTransactionChannelReducer,
    createNewCurrencyReducer,
    updateCurrencyReducer,
    getAllCurrenciesReducer,
    setCurrencyConversionRateReducer,
    smsSettingsReducer,
    getSmsSettingsReducer,
    emailSettingsReducer,
    getEmailSettingsReducer,
    getAccessPreferencesReducer,
    accessPreferencesReducer,
    internalControlReducer,
    getAllBranchesReducer,
    createNewBranchReducer
}

export const accounting = {
    getGLAccountsReducer,
    createGLAccountsReducer,
    updateGLAccountReducer,
    getAllGLAccountsReducer,
}