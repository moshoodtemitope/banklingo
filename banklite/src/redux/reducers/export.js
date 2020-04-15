

import{
    getUsersReducer,
    getAllUsersReducer,
    getAUserReducer,
    getAUserActivitiesReducer,
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
    createLoanAccountReducer,
    getLoanSchedulePreviewReducer,
    getAClientLoanAccountReducer,
    getAClientLoanAccountScheduleReducer,
    getAClientLoanAccountCommentsReducer,
    createALoanCommentReducer,
    getALoanAccountActivitiesReducer,
    getALoanAccountAttachmentsReducer,
    createALoanAttachmentReducer,
    getALoanAccountCommunicationsReducer,
    changeLoanStateReducer
    
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
    getActivitiesReducer,
    getLoggedInUserActivitiesReducer,
    globalSearchAnItemReducer
    
} from './dashboard/dashboard.reducer'

import{
    getDepositsReducer,
    getClientDepositsReducer,
    getDepositTransactionReducer,
    getAccountDepositTransactionReducer,
    createDepositAccountReducer,
    getAClientDepositAccountReducer,
    getADepositAccountActivitiesReducer,
    getADepositAccountCommunicationsReducer,
    getAClientDepositAccountCommentsReducer,
    createADepositCommentReducer,
    getADepositAccountAttachmentsReducer,
    createADepositAttachmentReducer
    
} from './deposits/deposits.reducer'


import{
    getClientsReducer,
    getAllClientsReducer,
    createAClientReducer,
    getAClientReducer,
    updateAClientReducer,
    getAClientCommentsReducer,
    createAClientCommentReducer,
    getAClientAttachmentsReducer,
    createAClientAttachmentsReducer,
    getAClientCommunicationsReducer,
    changeClientStateReducer,
    getAClientActivitiesReducer,
    createAClientTaskReducer,
    getAClientTasksReducer
    
} from './clients/clients.reducer'




export const administration ={
    getUsersReducer,
    getAllUsersReducer,
    getAUserReducer,
    getAUserActivitiesReducer,
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
    createLoanAccountReducer,
    getLoanSchedulePreviewReducer,
    getAClientLoanAccountReducer,
    getAClientLoanAccountScheduleReducer,
    getAClientLoanAccountCommentsReducer,
    createALoanCommentReducer,
    getALoanAccountActivitiesReducer,
    getALoanAccountAttachmentsReducer,
    createALoanAttachmentReducer,
    getALoanAccountCommunicationsReducer,
    changeLoanStateReducer
}

export const auth = {
    LoginReducer,
}

export const dashboard = {
    getDashboardStatReducer,
    getActivitiesReducer,
    getLoggedInUserActivitiesReducer,
    globalSearchAnItemReducer
}

export const deposits = {
    getDepositsReducer,
    getClientDepositsReducer,
    getDepositTransactionReducer,
    getAccountDepositTransactionReducer,
    createDepositAccountReducer,
    getAClientDepositAccountReducer,
    getADepositAccountActivitiesReducer,
    getADepositAccountCommunicationsReducer,
    getAClientDepositAccountCommentsReducer,
    createADepositCommentReducer,
    getADepositAccountAttachmentsReducer,
    createADepositAttachmentReducer
}

export const clients ={
    getClientsReducer,
    getAllClientsReducer,
    createAClientReducer,
    getAClientReducer,
    updateAClientReducer,
    getAClientCommentsReducer,
    createAClientCommentReducer,
    getAClientAttachmentsReducer,
    createAClientAttachmentsReducer,
    getAClientCommunicationsReducer,
    changeClientStateReducer,
    getAClientActivitiesReducer,
    createAClientTaskReducer,
    getAClientTasksReducer
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