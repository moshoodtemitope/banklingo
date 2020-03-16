

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
    fetchBranchesListReducer,
    getABranchReducer,
    createNewBranchReducer,
    updateABranchReducer,
    getNotificationsReducer,
    uploadDataReducer
}
 from './administration/administration.reducer'


import{
    getGLAccountsReducer,
    createGLAccountsReducer,
    updateGLAccountReducer,
    getAllGLAccountsReducer,
    getJournalEntriesReducer,
    createJournalEntriesReducer,
    getTrialBalanceReducer,
    getProfitAndLossReducer,
    getBalanceSheetReducer
    
    
} from './accounting/accounting.reducer'




import{
    getLoansReducer,
    getClientLoansReducer,
    getLoanTransactionsReducer,
    getAccountLoanTransactionReducer,
    createLoanAccountReducer
    
} from './loans/loans.reducer'

import{
    getLoanProductsReducer,
    getDepositProductsReducer,
    getAllLoanProductsReducer,
    getFullLoanProductsReducer,
    getSingleLoanProductsReducer,
    createLoanProductReducer,
    updateLoanProductReducer,
    getAllDepositProductsReducer,
    getSingleDepositProductsReducer,
    createDepositProductReducer,
    updateDepositProductReducer
    
} from './products/products.reducer'


import{
    getDisbursementsReducer,
    postDisbursementReducer,
    getDisbursementBanksReducer,
    confirmPostDisbursementReducer,
    approveOrRejectPostDisbursementReducer,
    rejectPostDisbursementReducer,
    getDisbursementByRefReducer
    
} from './disbursment/disbursment.reducer'





import{
    LoginReducer,
    
} from './auth/auth.reducer'

import{
    getDashboardStatReducer,
    getActivitiesReducer
    
} from './dashboard/dashboard.reducer'

import{
    getDepositsReducer,
    getClientDepositsReducer,
    getDepositTransactionReducer,
    getAccountDepositTransactionReducer,
    createDepositAccountReducer
    
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
    fetchBranchesListReducer,
    getABranchReducer,
    createNewBranchReducer,
    updateABranchReducer,
    getNotificationsReducer,
    uploadDataReducer
}

export const accounting = {
    getGLAccountsReducer,
    createGLAccountsReducer,
    updateGLAccountReducer,
    getAllGLAccountsReducer,
    getJournalEntriesReducer,
    createJournalEntriesReducer,
    getTrialBalanceReducer,
    getProfitAndLossReducer,
    getBalanceSheetReducer
    
}

export const loans = {
    getLoansReducer,
    getClientLoansReducer,
    getLoanTransactionsReducer,
    getAccountLoanTransactionReducer,
    createLoanAccountReducer
}

export const auth = {
    LoginReducer,
}

export const dashboard = {
    getDashboardStatReducer,
    getActivitiesReducer
}

export const deposits = {
    getDepositsReducer,
    getClientDepositsReducer,
    getDepositTransactionReducer,
    getAccountDepositTransactionReducer,
    createDepositAccountReducer
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
    getDisbursementBanksReducer,
    postDisbursementReducer,
    confirmPostDisbursementReducer,
    approveOrRejectPostDisbursementReducer,
    rejectPostDisbursementReducer,
    getDisbursementByRefReducer
}

export const products ={
    getLoanProductsReducer,
    getDepositProductsReducer,
    getAllLoanProductsReducer,
    getFullLoanProductsReducer,
    getSingleLoanProductsReducer,
    createLoanProductReducer,
    updateLoanProductReducer,
    getSingleDepositProductsReducer,
    getAllDepositProductsReducer,
    createDepositProductReducer,
    updateDepositProductReducer
}