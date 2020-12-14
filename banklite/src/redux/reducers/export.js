

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
    getTrialBalanceBasicReducer,
    getProfitAndLossReducer,
    getBalanceSheetReducer
    
    
} from './accounting/accounting.reducer'




import{
    getLoansReducer,
    getPendingLoansReducer,
    getApprovedLoansReducer,
    getRejectedLoansReducer,
    getActiveLoansReducer,
    getLoansInArrearsReducer,
    getClosedLoansReducer,
    getClosedWrittenOffLoansReducer,
    getClosedWithdrawnLoansReducer,
    getClientLoansReducer,
    getLoanTransactionsReducer,
    exportLoanTransactionsReducer,
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
    changeLoanStateReducer,
    getAllLoanSchedulesReducer,
    exportLoansSchedulesReducer,
    getLoanPARReducer,
    exportLoanPARReducer
    
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
    getPendingApprovalDisbursementReducer,
    getPendingReviewDisbursementReducer,
    postDisbursementReducer,
    postNewDisbursementBatchReducer,
    getADisbursementBatchReducer,
    performActionOnDisbursementBatchReducer,
    getInitiatedDisbursementsReducer,
    deleteADisbursementReducer,
    getDisbursementBanksReducer,
    confirmPostDisbursementReducer,
    approveOrRejectPostDisbursementReducer,
    approveOrRejectReviewedDisbursementReducer,
    rejectPostDisbursementReducer,
    getDisbursementByRefReducer,
    getInwardsNIPReducer,
    exportInwardsNIPReducer,
    getOutwardsNIPReducer,
    exportOutwardsNIPReducer
    
} from './disbursment/disbursment.reducer'





import{
    LoginReducer,
    ChangePasswordReducer,
    ChangePinReducer,
    ResetPinReducer,
    ResetPasswordReducer,
    ActivateDeactivateUserReducer
    
} from './auth/auth.reducer'

import{
    getDashboardStatReducer,
    getActivitiesReducer,
    getLoggedInUserActivitiesReducer,
    globalSearchAnItemReducer
    
} from './dashboard/dashboard.reducer'

import{
    getDepositsReducer,
    exportDepositsReducer,
    getClientDepositsReducer,
    getDepositTransactionReducer,
    exportDepositTransactionReducer,
    getAccountDepositTransactionReducer,
    createDepositAccountReducer,
    getAClientDepositAccountReducer,
    getADepositAccountActivitiesReducer,
    getADepositAccountCommunicationsReducer,
    getAClientDepositAccountCommentsReducer,
    createADepositCommentReducer,
    getADepositAccountAttachmentsReducer,
    createADepositAttachmentReducer,
    changeDepositStateReducer,
    searchAccountNumbersReducer,
    searchCustomerAccountReducer,
    searchForAccountsWithCustomerKeyReducer
    
} from './deposits/deposits.reducer'


import{
    getClientsReducer,
    exportClientsReducer,
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
    getTrialBalanceBasicReducer,
    getProfitAndLossReducer,
    getBalanceSheetReducer
    
}

export const loans = {
    getLoansReducer,
    getPendingLoansReducer,
    getApprovedLoansReducer,
    getRejectedLoansReducer,
    getActiveLoansReducer,
    getLoansInArrearsReducer,
    getClosedLoansReducer,
    getClosedWrittenOffLoansReducer,
    getClosedWithdrawnLoansReducer,
    getClientLoansReducer,
    getLoanTransactionsReducer,
    exportLoanTransactionsReducer,
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
    changeLoanStateReducer,
    getAllLoanSchedulesReducer,
    exportLoansSchedulesReducer,
    getLoanPARReducer,
    exportLoanPARReducer
}

export const auth = {
    LoginReducer,
    ChangePasswordReducer,
    ChangePinReducer,
    ResetPinReducer,
    ResetPasswordReducer,
    ActivateDeactivateUserReducer
}

export const dashboard = {
    getDashboardStatReducer,
    getActivitiesReducer,
    getLoggedInUserActivitiesReducer,
    globalSearchAnItemReducer
}

export const deposits = {
    getDepositsReducer,
    exportDepositsReducer,
    getClientDepositsReducer,
    getDepositTransactionReducer,
    exportDepositTransactionReducer,
    getAccountDepositTransactionReducer,
    createDepositAccountReducer,
    getAClientDepositAccountReducer,
    getADepositAccountActivitiesReducer,
    getADepositAccountCommunicationsReducer,
    getAClientDepositAccountCommentsReducer,
    createADepositCommentReducer,
    getADepositAccountAttachmentsReducer,
    createADepositAttachmentReducer,
    changeDepositStateReducer,
    searchAccountNumbersReducer,
    searchCustomerAccountReducer,
    searchForAccountsWithCustomerKeyReducer
}

export const clients ={
    getClientsReducer,
    exportClientsReducer,
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
    getPendingApprovalDisbursementReducer,
    getPendingReviewDisbursementReducer,
    getDisbursementBanksReducer,
    postDisbursementReducer,
    postNewDisbursementBatchReducer,
    getADisbursementBatchReducer,
    performActionOnDisbursementBatchReducer,
    getInitiatedDisbursementsReducer,
    deleteADisbursementReducer,
    confirmPostDisbursementReducer,
    approveOrRejectPostDisbursementReducer,
    approveOrRejectReviewedDisbursementReducer,
    rejectPostDisbursementReducer,
    getDisbursementByRefReducer,
    getInwardsNIPReducer,
    exportInwardsNIPReducer,
    getOutwardsNIPReducer,
    exportOutwardsNIPReducer
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