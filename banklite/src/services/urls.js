
const URL = 'http://52.170.209.118';

const BASEURL = URL;  

export const routes = {
    BASEURL: BASEURL,

    // Administration endpoints
    
    LOGIN_USER: BASEURL + '/Dars.Administration/api/Login',
    HIT_DASHBOARD: BASEURL + '/Dars.Administration/api/Dashboard',


    // Disbursement endpoints
    
    HIT_DISBURSEMENT: BASEURL + '/Dars.Administration/api/Disbursment',


    // Administration endpoints
    
    GET_BRANCHES: BASEURL + '/Dars.Administration/api/branch',
    ADD_BRANCH: BASEURL + '/Dars.Administration/api/branch',
    
    HIT_USERS: BASEURL + '/Dars.Administration/api/user',
    
    GET_ORGANIZATION_DETAILS: BASEURL + '/Dars.Administration/api/Administration/organization',
    UPDATE_ORGANIZATION_DETAILS: BASEURL + '/Dars.Administration/api/Administration/updateorganization',
    
    ADD_CURRENCY: BASEURL + '/Dars.Administration/api/Administration/currency',
    UPDATE_CURRENCY: BASEURL + '/Dars.Administration/api/Administration/updatecurrency',
    GET_ALL_CURRENCIES: BASEURL + '/Dars.Administration/api/Administration/currencies',
    
    ADD_CUSTOMER_TYPE: BASEURL + '/Dars.Administration/api/CustomerType/customertype',
    HIT_CUSTOMER_TYPES: BASEURL + '/Dars.Administration/api/CustomerType',
    
    ADD_EXCHANGE_RATE: BASEURL + '/Dars.Administration/api/Account/exchangerate',
    
    HIT_ROLE: BASEURL + '/Dars.Administration/api/Role', //works
    // ADD_TRANSACTION_CHANNEL: BASEURL + '/Dars.Administration/api/Account/transactionchannel',
    
    ADD_TRANSACTION_CHANNEL: BASEURL + '/Dars.Administration/api/TransactionChannel/transactionchannel',
    HIT_TRANSACTION_CHANNEL: BASEURL + '/Dars.Administration/api/TransactionChannel/transactionchannels',
   
    GET_ACCESS_PREFERENCE: BASEURL + '/Dars.Administration/api/Administration/accesspreference',
    UPDATE_ACCESS_PREFERENCE: BASEURL + '/Dars.Administration/api/Administration/accesspreference',
    
    UPDATE_EMAIL_SETTINGS: BASEURL + '/Dars.Administration/api/Communication/emailsetting',
    GET_EMAIL_SETTINGS: BASEURL + '/Dars.Administration/api/Communication/emailsetting/',
    HIT_INTERNAL_CONTROL: BASEURL + '/Dars.Administration/api/internal',
    GET_SMS_SETTINGS: BASEURL + '/Dars.Administration/api/Communication/smssetting/',
    UPDATE_SMS_SETTINGS: BASEURL + '/Dars.Administration/api/Communication/smssetting',
    
    JOURNAL_ENTRIES: BASEURL + '/Dars.Administration/api/JournalEntries',

    //Accounting Endpoints
    HIT_GLACCOUNTS: BASEURL + '/Dars.Administration/api/GLAccount/glaccounts',
    ALL_GLACCOUNTS: BASEURL + '/Dars.Administration/api/GLAccount/allglaccounts',
    CREATE_GLACCOUNT: BASEURL + '/Dars.Administration/api/GLAccount/glaccount',

    //Deposits Endpoints
    HIT_DEPOSITS: BASEURL + '/Dars.Administration/api/Deposits',

    //Deposits Transactions Endpoints
    HIT_DEPOSITS_TRANSACTIONS: BASEURL + '/Dars.Administration/api/DepositTransactions',

    //LOAN Endpoints
    HIT_LOAN: BASEURL + '/Dars.Administration/api/Loans',

    //Loan Transactions Endpoints
    HIT_LOAN_TRANSACTIONS: BASEURL + '/Dars.Administration/api/LoanTransactions',

    //Notification Endpoints
    HIT_NOTIFICATIONS: BASEURL + '/Dars.Administration/api/Notifications',

    //Clients Endpoints
    HIT_CLIENTS: BASEURL + '/Dars.Administration/api/Clients',
}