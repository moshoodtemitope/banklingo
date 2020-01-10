

import{
    getUsersReducer,
    getAllUsersReducer,
    getAUserReducer,
    createAUserReducer,
    updateAUserReducer,
    createRoleReducer,
    updateARoleReducer,
    getRolesReducer,
    getARoleReducer,
    getAllRolesReducer,
    getAllPermissionsReducer,
    updateOrganizationDetailsReducer,
    getOrganizationDetailsReducer,
    getCustomerTypesReducer,
    createCustomerTypeReducer,
    updateCustomerTypeReducer,
    getTransactionChannelsReducer,
    createTransactionChannelReducer,
    updateTransactionChannelReducer,
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
    getInternalControlReducer,
    internalControlReducer,
    getAllBranchesReducer,
    getABranchReducer,
    createNewBranchReducer,
    updateABranchReducer,
    getNotificationsReducer
}
 from './administration/administration.reducer'


import{
    getGLAccountsReducer,
    createGLAccountsReducer,
    updateGLAccountReducer,
    getAllGLAccountsReducer,
    getJournalEntriesReducer,
    createJournalEntriesReducer,
    
} from './accounting/accounting.reducer'




import{
    getLoansReducer,
    getClientLoansReducer,
    getLoanTransactionsReducer,
    getAccountLoanTransactionReducer,
    
} from './loans/loans.reducer'

import{
    getDepositsReducer,
    getClientDepositsReducer,
    getDepositTransactionReducer,
    getAccountDepositTransactionReducer,
    
} from './deposits/deposits.reducer'


import{
    getClientsReducer,
    getAllClientsReducer,
    createAClientReducer,
    updateAClientReducer,
    
} from './clients/clients.reducer'




export const administration ={
    getUsersReducer,
    getAllUsersReducer,
    getAUserReducer,
    createAUserReducer,
    updateAUserReducer,
    createRoleReducer,
    updateARoleReducer,
    getRolesReducer,
    getARoleReducer,
    getAllRolesReducer,
    getAllPermissionsReducer,
    updateOrganizationDetailsReducer,
    getOrganizationDetailsReducer,
    getCustomerTypesReducer,
    createCustomerTypeReducer,
    updateCustomerTypeReducer,
    getTransactionChannelsReducer,
    createTransactionChannelReducer,
    updateTransactionChannelReducer,
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
    getInternalControlReducer,
    internalControlReducer,
    getAllBranchesReducer,
    getABranchReducer,
    createNewBranchReducer,
    updateABranchReducer,
    getNotificationsReducer
}

export const accounting = {
    getGLAccountsReducer,
    createGLAccountsReducer,
    updateGLAccountReducer,
    getAllGLAccountsReducer,
    getJournalEntriesReducer,
    createJournalEntriesReducer,
}

export const loans = {
    getLoansReducer,
    getClientLoansReducer,
    getLoanTransactionsReducer,
    getAccountLoanTransactionReducer,
}

export const deposits = {
    getDepositsReducer,
    getClientDepositsReducer,
    getDepositTransactionReducer,
    getAccountDepositTransactionReducer,
}

export const clients ={
    getClientsReducer,
    getAllClientsReducer,
    createAClientReducer,
    updateAClientReducer,
}