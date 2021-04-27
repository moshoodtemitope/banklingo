import {combineReducers} from "redux";
import { 
    auth,
    dashboard,
    administration,
    accounting,
    loans,
    deposits,
    clients,
    disbursment,
    platform,
    products} from "./export";

import {LoginReducer} from "./auth/auth.reducer";
import { authConstants } from "../actiontypes/auth/auth.constants";

const rootReducer = (state, action)=>{
   
    if(action.type === authConstants.LOGOUT)
        { 
            state = undefined;   
        }
    return appReducer(state, action)

};




const administrationReducers = combineReducers({
    adminGetUsersReducer: administration.getUsersReducer, 
    adminGetAllUsersReducer: administration.getAllUsersReducer, 
    adminGetAUserReducer: administration.getAUserReducer, 
    getAUserActivitiesReducer: administration.getAUserActivitiesReducer, 
    adminCreateAUserReducer: administration.createAUserReducer, 
    adminUpdateAUserReducer: administration.updateAUserReducer, 
    adminCreateRoleReducer: administration.createRoleReducer, 
    adminUpdateARoleReducer: administration.updateARoleReducer, 
    adminGetRolesReducer: administration.getRolesReducer, 
    adminGetARoleReducer: administration.getARoleReducer, 
    adminGetAllRolesReducer: administration.getAllRolesReducer, 
    adminGetAllPermissionsReducer: administration.getAllPermissionsReducer, 
    adminGetOrganizationDetailsReducer: administration.getOrganizationDetailsReducer, 
    adminUpdateOrganizationDetailsReducer: administration.updateOrganizationDetailsReducer, 
    adminCreateCustomerTypeReducer: administration.createCustomerTypeReducer,   
    adminGetCustomerTypesReducer: administration.getCustomerTypesReducer,   
    getAllCustomerTypesReducer: administration.getAllCustomerTypesReducer,   
    adminUpdateCustomerTypeReducer: administration.updateCustomerTypeReducer,   
    adminGetTransactionChannelsReducer :administration.getTransactionChannelsReducer,
    adminCreateTransactionChannelReducer :administration.createTransactionChannelReducer,
    adminUpdateTransactionChannelReducer :administration.updateTransactionChannelReducer,
    adminCreateNewCurrencyReducer :administration.createNewCurrencyReducer,
    adminSmsSettingsReducer :administration.smsSettingsReducer,
    adminGetSmsSettingsReducer :administration.getSmsSettingsReducer,
    adminEmailSettingsReducer :administration.emailSettingsReducer,
    adminGetEmailSettingsReducer :administration.getEmailSettingsReducer,
    adminAccessPreferencesReducer :administration.accessPreferencesReducer,
    adminGetAccessPreferencesReducer :administration.getAccessPreferencesReducer,
    adminGetInternalControlReducer :administration.getInternalControlReducer,
    adminInternalControlReducer: administration.internalControlReducer,
    adminCreateNewBranchReducer: administration.createNewBranchReducer,
    adminUpdateABranchReducer: administration.updateABranchReducer,

    
    adminGetAllBranchesReducer: administration.getAllBranchesReducer,


    fetchBranchesListReducer: administration.fetchBranchesListReducer,
    adminGetABranchReducer: administration.getABranchReducer,
    adminGetAllCurrenciesReducer: administration.getAllCurrenciesReducer,
    adminUpdateCurrencyReducer: administration.updateCurrencyReducer,
    adminSetCurrencyConversionRateReducer: administration.setCurrencyConversionRateReducer,
    getNotificationsReducer: administration.getNotificationsReducer,
    uploadDataReducer: administration.uploadDataReducer,
    fetchAllNotificationTemplate: administration.fetchAllNotificationTemplate,
    getANotificationTemplate: administration.getANotificationTemplate,
    createANotificationTemplate: administration.createANotificationTemplate,
    updateANotificationTemplate: administration.updateANotificationTemplate,
    fetchAllChannelServices: administration.fetchAllChannelServices,
    getAChannelServices: administration.getAChannelServices,
    createAChannelServices : administration.createAChannelServices,
    updateAChannelServices : administration.updateAChannelServices,
    fetchAllRiskLevel: administration.fetchAllRiskLevel,
    getARiskLevel: administration.getARiskLevel,
    createARiskLevel: administration.createARiskLevel,
    updateARiskLevel: administration.updateARiskLevel,
    fetchAllTasksReducer: administration.fetchAllTasksReducer,
    getBranchClosuresReducer: administration.getBranchClosuresReducer,
    getBranchesOpenReducer: administration.getBranchesOpenReducer,
    getBranchesClosedReducer: administration.getBranchesClosedReducer,
    openABranchReducer: administration.openABranchReducer,
    closeABranchReducer: administration.closeABranchReducer,
})

const accountingReducers = combineReducers({
    getGLAccountsReducer: accounting.getGLAccountsReducer, 
    createGLAccountsReducer: accounting.createGLAccountsReducer, 
    updateGLAccountReducer: accounting.updateGLAccountReducer, 
    getAllGLAccountsReducer: accounting.getAllGLAccountsReducer, 
    getJournalEntriesReducer: accounting.getJournalEntriesReducer, 
    createJournalEntriesReducer: accounting.createJournalEntriesReducer, 

    getTrialBalanceReducer: accounting.getTrialBalanceReducer, 
    getTrialBalanceBasicReducer: accounting.getTrialBalanceBasicReducer, 
    getProfitAndLossReducer: accounting.getProfitAndLossReducer, 
    getBalanceSheetReducer: accounting.getBalanceSheetReducer, 
   
})

const depositsReducers = combineReducers({
    getDepositsReducer: deposits.getDepositsReducer, 
    exportDepositsReducer: deposits.exportDepositsReducer, 
    getClientDepositsReducer: deposits.getClientDepositsReducer, 
    getDepositTransactionReducer: deposits.getDepositTransactionReducer, 
    exportDepositTransactionReducer: deposits.exportDepositTransactionReducer, 
    getAccountDepositTransactionReducer: deposits.getAccountDepositTransactionReducer, 
    createDepositAccountReducer: deposits.createDepositAccountReducer, 
    getAClientDepositAccountReducer: deposits.getAClientDepositAccountReducer, 
    getADepositAccountActivitiesReducer: deposits.getADepositAccountActivitiesReducer, 
    getADepositAccountCommunicationsReducer: deposits.getADepositAccountCommunicationsReducer, 
    getAClientDepositAccountCommentsReducer: deposits.getAClientDepositAccountCommentsReducer, 
    createADepositCommentReducer: deposits.createADepositCommentReducer, 
    getADepositAccountAttachmentsReducer: deposits.getADepositAccountAttachmentsReducer, 
    createADepositAttachmentReducer: deposits.createADepositAttachmentReducer, 
    changeDepositStateReducer: deposits.changeDepositStateReducer, 
    searchAccountNumbersReducer: deposits.searchAccountNumbersReducer, 
    searchCustomerAccountReducer: deposits.searchCustomerAccountReducer, 
    searchForAccountsWithCustomerKeyReducer: deposits.searchForAccountsWithCustomerKeyReducer, 
   
})

const loansReducers = combineReducers({
    getLoansReducer: loans.getLoansReducer, 
    getPendingLoansReducer: loans.getPendingLoansReducer, 
    getPendingApprovalLoansReducer: loans.getPendingApprovalLoansReducer, 
    getPendingApprovalMgtLoansReducer: loans.getPendingApprovalMgtLoansReducer, 
    getApprovedLoansReducer: loans.getApprovedLoansReducer, 
    getRejectedLoansReducer: loans.getRejectedLoansReducer, 
    getPendingAcceptanceLoansReducer: loans.getPendingAcceptanceLoansReducer, 
    getActiveLoansReducer: loans.getActiveLoansReducer, 
    getLoansInArrearsReducer: loans.getLoansInArrearsReducer, 
    getClosedLoansReducer: loans.getClosedLoansReducer, 
    getClosedWrittenOffLoansReducer: loans.getClosedWrittenOffLoansReducer, 
    getClosedWithdrawnLoansReducer: loans.getClosedWithdrawnLoansReducer, 
    getClientLoansReducer: loans.getClientLoansReducer, 
    getLoanTransactionsReducer: loans.getLoanTransactionsReducer, 
    exportLoanTransactionsReducer: loans.exportLoanTransactionsReducer, 
    getAccountLoanTransactionReducer: loans.getAccountLoanTransactionReducer, 
    createLoanAccountReducer: loans.createLoanAccountReducer, 
    getLoanSchedulePreviewReducer: loans.getLoanSchedulePreviewReducer, 
    getAClientLoanAccountReducer: loans.getAClientLoanAccountReducer, 
    getAClientLoanAccountScheduleReducer: loans.getAClientLoanAccountScheduleReducer, 
    getAClientLoanAccountCommentsReducer: loans.getAClientLoanAccountCommentsReducer, 
    createALoanCommentReducer: loans.createALoanCommentReducer, 
    getALoanAccountActivitiesReducer: loans.getALoanAccountActivitiesReducer, 
    getALoanAccountAttachmentsReducer: loans.getALoanAccountAttachmentsReducer, 
    createALoanAttachmentReducer: loans.createALoanAttachmentReducer, 
    getALoanAccountCommunicationsReducer: loans.getALoanAccountCommunicationsReducer, 
    changeLoanStateReducer: loans.changeLoanStateReducer, 
    getAllLoanSchedulesReducer: loans.getAllLoanSchedulesReducer, 
    exportLoansSchedulesReducer: loans.exportLoansSchedulesReducer, 
    getLoanPARReducer: loans.getLoanPARReducer, 
    exportLoanPARReducer: loans.exportLoanPARReducer, 
    payOffALoanReducer: loans.payOffALoanReducer, 
    writeOffALoanReducer: loans.writeOffALoanReducer, 
    rescheduleALoanReducer: loans.rescheduleALoanReducer, 
    refianceALoanReducer: loans.refianceALoanReducer, 
    editALoanReducer: loans.editALoanReducer, 
   
})

const authReducers = combineReducers({
    confirmTenantReducer: auth.confirmTenantReducer, 
    LoginReducer: auth.LoginReducer, 
    ChangePasswordReducer: auth.ChangePasswordReducer, 
    ChangePinReducer: auth.ChangePinReducer, 
    ResetPinReducer: auth.ResetPinReducer, 
    ResetPasswordReducer: auth.ResetPasswordReducer, 
    ActivateDeactivateUserReducer: auth.ActivateDeactivateUserReducer, 
   
})

const dashboardReducers = combineReducers({
    getDashboardStatReducer: dashboard.getDashboardStatReducer, 
    getActivitiesReducer: dashboard.getActivitiesReducer, 
    getLoggedInUserActivitiesReducer: dashboard.getLoggedInUserActivitiesReducer, 
    globalSearchAnItemReducer: dashboard.globalSearchAnItemReducer, 
    searchForCustomerReducer: dashboard.searchForCustomerReducer, 
    reverseATransactionReducer: dashboard.reverseATransactionReducer, 
    postATransactionReducer: dashboard.postATransactionReducer, 
    openATillReducer: dashboard.openATillReducer, 
    addRemoveCashToTillReducer: dashboard.addRemoveCashToTillReducer, 
    closeUndoCloseToTillReducer: dashboard.closeUndoCloseToTillReducer, 
    fetchTillTransactionsReducer: dashboard.fetchTillTransactionsReducer, 
    fetchLoggedonTillsReducer: dashboard.fetchLoggedonTillsReducer, 
    fetchAllTillsReducer: dashboard.fetchAllTillsReducer, 
    fetchManadateReducer: dashboard.fetchManadateReducer, 
   
})

const platformReducers = combineReducers({
    fetchAllCreditScoreByPassReducer: platform.fetchAllCreditScoreByPassReducer,
    fetchSingleCreditScoreByPassReducer: platform.fetchSingleCreditScoreByPassReducer,
    createCreditScoreByPassReducer: platform.createCreditScoreByPassReducer,
    updateCreditScoreByPassReducer: platform.updateCreditScoreByPassReducer,
    getAllCompanyInfoReducer: platform.getAllCompanyInfoReducer,
    getACompanyInfoReducer: platform.getACompanyInfoReducer,
    newCompanyInfoReducer: platform.newCompanyInfoReducer,
    updateCompanyInfoReducer: platform.updateCompanyInfoReducer,
    fetchAllPayrollGroupsReducer: platform.fetchAllPayrollGroupsReducer,
    getAPayrollGroupReducer: platform.getAPayrollGroupReducer,
    createAPayrollGroupReducer: platform.createAPayrollGroupReducer,
    updateAPayrollGroupReducer: platform.updateAPayrollGroupReducer,
    fetchAllCardProvider: platform.fetchAllCardProvider,
    getACardProvider: platform.getACardProvider,
    createACardProvider: platform.createACardProvider,
    updateACardProvider: platform.updateACardProvider,
    fetchAllEmployeeInfo: platform.fetchAllEmployeeInfo,
    fetchSingleEmployeeInfo: platform.fetchSingleEmployeeInfo,
    createEmployeeInfo: platform.createEmployeeInfo,
    updateEmployeeInfo: platform.updateEmployeeInfo,
    fetchAllBankInfoReducer: platform.fetchAllBankInfoReducer,
    fetchSingleBankInfoReducer: platform.fetchSingleBankInfoReducer,
    createBankInfoReducer: platform.createBankInfoReducer,
    updateBankInfoReducer: platform.updateBankInfoReducer,
   
})



const clientsReducers = combineReducers({
    getClientsReducer: clients.getClientsReducer, 
    exportClientsReducer: clients.exportClientsReducer, 
    getAllClientsReducer: clients.getAllClientsReducer, 
    createAClientReducer: clients.createAClientReducer, 
    getAClientReducer: clients.getAClientReducer, 
    updateAClientReducer: clients.updateAClientReducer, 
    getAClientCommentsReducer: clients.getAClientCommentsReducer, 
    createAClientCommentReducer: clients.createAClientCommentReducer, 
    createAClientAttachmentsReducer: clients.createAClientAttachmentsReducer, 
    getAClientAttachmentsReducer: clients.getAClientAttachmentsReducer, 
    getAClientCommunicationsReducer: clients.getAClientCommunicationsReducer, 
    changeClientStateReducer: clients.changeClientStateReducer, 
    getAClientActivitiesReducer: clients.getAClientActivitiesReducer, 
    createAClientTaskReducer: clients.createAClientTaskReducer, 
    getAClientTasksReducer: clients.getAClientTasksReducer, 
    addAClientSignatureReducer: clients.addAClientSignatureReducer, 
    addAClientPassportReducer: clients.addAClientPassportReducer, 
    getAUserTasksReducer: clients.getAUserTasksReducer, 
   
})

const disbursmentReducers = combineReducers({
    getDisbursementsReducer: disbursment.getDisbursementsReducer, 
    getPendingApprovalDisbursementReducer: disbursment.getPendingApprovalDisbursementReducer, 
    getPendingReviewDisbursementReducer: disbursment.getPendingReviewDisbursementReducer, 
    getDisbursementBanksReducer: disbursment.getDisbursementBanksReducer, 
    postDisbursementReducer: disbursment.postDisbursementReducer, 
    postNewDisbursementBatchReducer: disbursment.postNewDisbursementBatchReducer, 
    getADisbursementBatchReducer: disbursment.getADisbursementBatchReducer, 
    confirmPostDisbursementReducer: disbursment.confirmPostDisbursementReducer, 
    performActionOnDisbursementBatchReducer: disbursment.performActionOnDisbursementBatchReducer, 
    getInitiatedDisbursementsReducer: disbursment.getInitiatedDisbursementsReducer, 
    approveOrRejectPostDisbursementReducer: disbursment.approveOrRejectPostDisbursementReducer, 
    deleteADisbursementReducer: disbursment.deleteADisbursementReducer, 
    approveOrRejectReviewedDisbursementReducer: disbursment.approveOrRejectReviewedDisbursementReducer, 
    rejectPostDisbursementReducer: disbursment.rejectPostDisbursementReducer, 
    getDisbursementByRefReducer: disbursment.getDisbursementByRefReducer, 
    getInwardsNIPReducer: disbursment.getInwardsNIPReducer, 
    exportInwardsNIPReducer: disbursment.exportInwardsNIPReducer, 
    getOutwardsNIPReducer: disbursment.getOutwardsNIPReducer, 
    exportOutwardsNIPReducer: disbursment.exportOutwardsNIPReducer, 
    getAllDisbursementsReducer: disbursment.getAllDisbursementsReducer, 
})

const productReducers = combineReducers({
    createLoanProductReducer: products.createLoanProductReducer, 
    getLoanProductsReducer: products.getLoanProductsReducer, 
    getAllLoanProductsReducer: products.getAllLoanProductsReducer, 
    getFullLoanProductsReducer: products.getFullLoanProductsReducer, 
    getSingleLoanProductsReducer: products.getSingleLoanProductsReducer, 
    updateLoanProductReducer: products.updateLoanProductReducer, 
    getDepositProductsReducer: products.getDepositProductsReducer, 
    getAllDepositProductsReducer: products.getAllDepositProductsReducer, 
    getSingleDepositProductsReducer: products.getSingleDepositProductsReducer, 
    createDepositProductReducer: products.createDepositProductReducer, 
    updateDepositProductReducer: products.updateDepositProductReducer, 
})



const appReducer = combineReducers({
    administrationReducers,
    accountingReducers,
    depositsReducers,
    loansReducers,
    clientsReducers,
    disbursmentReducers,
    // LoginReducer,
    productReducers,
    authReducers,
    dashboardReducers,
    platformReducers
})



export default rootReducer;