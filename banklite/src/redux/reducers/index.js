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
})

const accountingReducers = combineReducers({
    getGLAccountsReducer: accounting.getGLAccountsReducer, 
    createGLAccountsReducer: accounting.createGLAccountsReducer, 
    updateGLAccountReducer: accounting.updateGLAccountReducer, 
    getAllGLAccountsReducer: accounting.getAllGLAccountsReducer, 
    getJournalEntriesReducer: accounting.getJournalEntriesReducer, 
    createJournalEntriesReducer: accounting.createJournalEntriesReducer, 

    getTrialBalanceReducer: accounting.getTrialBalanceReducer, 
    getProfitAndLossReducer: accounting.getProfitAndLossReducer, 
    getBalanceSheetReducer: accounting.getBalanceSheetReducer, 
   
})

const depositsReducers = combineReducers({
    getDepositsReducer: deposits.getDepositsReducer, 
    getClientDepositsReducer: deposits.getClientDepositsReducer, 
    getDepositTransactionReducer: deposits.getDepositTransactionReducer, 
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
    getClientLoansReducer: loans.getClientLoansReducer, 
    getLoanTransactionsReducer: loans.getLoanTransactionsReducer, 
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
   
})

const authReducers = combineReducers({
    LoginReducer: auth.LoginReducer, 
    ChangePasswordReducer: auth.ChangePasswordReducer, 
   
})

const dashboardReducers = combineReducers({
    getDashboardStatReducer: dashboard.getDashboardStatReducer, 
    getActivitiesReducer: dashboard.getActivitiesReducer, 
    getLoggedInUserActivitiesReducer: dashboard.getLoggedInUserActivitiesReducer, 
    globalSearchAnItemReducer: dashboard.globalSearchAnItemReducer, 
   
})



const clientsReducers = combineReducers({
    getClientsReducer: clients.getClientsReducer, 
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
   
})

const disbursmentReducers = combineReducers({
    getDisbursementsReducer: disbursment.getDisbursementsReducer, 
    getDisbursementBanksReducer: disbursment.getDisbursementBanksReducer, 
    postDisbursementReducer: disbursment.postDisbursementReducer, 
    confirmPostDisbursementReducer: disbursment.confirmPostDisbursementReducer, 
    approveOrRejectPostDisbursementReducer: disbursment.approveOrRejectPostDisbursementReducer, 
    rejectPostDisbursementReducer: disbursment.rejectPostDisbursementReducer, 
    getDisbursementByRefReducer: disbursment.getDisbursementByRefReducer, 
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
    dashboardReducers
})



export default rootReducer;