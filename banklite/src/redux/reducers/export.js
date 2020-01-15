

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
    getAllCustomerTypesReducer,
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
    getDisbursementsReducer,
    postDisbursementReducer,
    confirmPostDisbursementReducer,
    approvePostDisbursementReducer,
    rejectPostDisbursementReducer,
    getDisbursementByRefReducer
    
} from './disbursment/disbursment.reducer'



import{
    LoginReducer,
    
} from './auth/auth.reducer'

import{
    getDashboardStatReducer,
    
} from './dashboard/dashboard.reducer'

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
    getAClientReducer,
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
    getAllCustomerTypesReducer,
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

export const auth = {
    LoginReducer,
}

export const dashboard = {
    getDashboardStatReducer,
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
    getAClientReducer,
    updateAClientReducer,
}

export const disbursment ={
    getDisbursementsReducer,
    postDisbursementReducer,
    confirmPostDisbursementReducer,
    approvePostDisbursementReducer,
    rejectPostDisbursementReducer,
    getDisbursementByRefReducer
}