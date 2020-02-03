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
    loanProducts} from "./export";

import {LoginReducer} from "./auth/auth.reducer";

const rootReducer = (state, action)=>{
   
    // if(action.type === userConstants.LOGOUT)
    //     { 
    //           state = undefined;   
    //          }
    return appReducer(state, action)

};




const administrationReducers = combineReducers({
    adminGetUsersReducer: administration.getUsersReducer, 
    adminGetAllUsersReducer: administration.getAllUsersReducer, 
    adminGetAUserReducer: administration.getAUserReducer, 
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
   
})

const depositsReducers = combineReducers({
    getDepositsReducer: deposits.getDepositsReducer, 
    getClientDepositsReducer: deposits.getClientDepositsReducer, 
    getDepositTransactionReducer: deposits.getDepositTransactionReducer, 
    getAccountDepositTransactionReducer: deposits.getAccountDepositTransactionReducer, 
   
})

const loansReducers = combineReducers({
    getLoansReducer: loans.getLoansReducer, 
    getClientLoansReducer: loans.getClientLoansReducer, 
    getLoanTransactionsReducer: loans.getLoanTransactionsReducer, 
    getAccountLoanTransactionReducer: loans.getAccountLoanTransactionReducer, 
   
})

const authReducers = combineReducers({
    LoginReducer: auth.LoginReducer, 
   
})

const dashboardReducers = combineReducers({
    getDashboardStatReducer: dashboard.getDashboardStatReducer, 
    getActivitiesReducer: dashboard.getActivitiesReducer, 
   
})



const clientsReducers = combineReducers({
    getClientsReducer: clients.getClientsReducer, 
    getAllClientsReducer: clients.getAllClientsReducer, 
    createAClientReducer: clients.createAClientReducer, 
    getAClientReducer: clients.getAClientReducer, 
    updateAClientReducer: clients.updateAClientReducer, 
   
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

const loanProductReducers = combineReducers({
    createLoanProductReducer: loanProducts.createLoanProductReducer, 
    getAllLoanProductsReducer: loanProducts.getAllLoanProductsReducer, 
    getSingleLoanProductsReducer: loanProducts.getSingleLoanProductsReducer, 
    
})



const appReducer = combineReducers({
    administrationReducers,
    accountingReducers,
    depositsReducers,
    loansReducers,
    clientsReducers,
    disbursmentReducers,
    // LoginReducer,
    loanProductReducers,
    authReducers,
    dashboardReducers
})



export default rootReducer;