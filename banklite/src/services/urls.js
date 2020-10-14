
// const URL = 'http://52.170.209.118';
// const URL = 'http://40.76.69.211/Banklot';
// const URL = 'http://40.76.69.211/Fintech.CBS.Backend';
const URL = process.env.NODE_ENV === 'development' ? 'http://40.76.69.211/Fintech.CBS.Backend' : 'https://banklingoapi.monee.ng/Fintech.CBS.Backend/'
// const URL = process.env.API_URL

const BASEURL = URL;  

export const routes = {
    BASEURL: BASEURL,

    // Administration endpoints
    
    LOGIN_USER: BASEURL + '/api/Login',
    REFRESH_TOKEN: BASEURL + '/api/Login/refreshtoken',
    CHANGE_PASSWORD: BASEURL + '/api/Login/changepassword',
    HIT_DASHBOARD: BASEURL + '/api/Dashboard',


    // Disbursement endpoints
    
    HIT_DISBURSEMENT: BASEURL + '/api/Disbursment',


     // NIP endpoints
    HIT_NIP: BASEURL + '/api/NIPRequest',


    // Administration endpoints
    
    GET_BRANCHES: BASEURL + '/api/branch',
    ADD_BRANCH: BASEURL + '/api/branch',
    
    HIT_USERS: BASEURL + '/api/user',
    
    GET_ORGANIZATION_DETAILS: BASEURL + '/api/Administration/organization',
    UPDATE_ORGANIZATION_DETAILS: BASEURL + '/api/Administration/updateorganization',
    
    ADD_CURRENCY: BASEURL + '/api/Administration/currency',
    UPDATE_CURRENCY: BASEURL + '/api/Administration/updatecurrency',
    GET_ALL_CURRENCIES: BASEURL + '/api/Administration/currencies',
    
    ADD_CUSTOMER_TYPE: BASEURL + '/api/CustomerType/customertype',
    HIT_CUSTOMER_TYPES: BASEURL + '/api/CustomerType',
    
    ADD_EXCHANGE_RATE: BASEURL + '/api/Account/exchangerate',
    
    HIT_ROLE: BASEURL + '/api/Role', //works

    
    // ADD_TRANSACTION_CHANNEL: BASEURL + '/api/Account/transactionchannel',
    
    ADD_TRANSACTION_CHANNEL: BASEURL + '/api/TransactionChannel/transactionchannel',
    HIT_TRANSACTION_CHANNEL: BASEURL + '/api/TransactionChannel/transactionchannels',
   
    GET_ACCESS_PREFERENCE: BASEURL + '/api/Administration/accesspreference',
    UPDATE_ACCESS_PREFERENCE: BASEURL + '/api/Administration/accesspreference',
    
    UPDATE_EMAIL_SETTINGS: BASEURL + '/api/Communication/emailsetting',
    GET_EMAIL_SETTINGS: BASEURL + '/api/Communication/emailsetting/',
    HIT_INTERNAL_CONTROL: BASEURL + '/api/internal',
    GET_SMS_SETTINGS: BASEURL + '/api/Communication/smssetting/',
    UPDATE_SMS_SETTINGS: BASEURL + '/api/Communication/smssetting',
    
    JOURNAL_ENTRIES: BASEURL + '/api/JournalEntries',

    //Accounting Endpoints
    HIT_GLACCOUNTS_BASE: BASEURL + '/api/GLAccount',
    HIT_GLACCOUNTS: BASEURL + '/api/GLAccount/glaccounts',
    ALL_GLACCOUNTS: BASEURL + '/api/GLAccount/allglaccounts',
    CREATE_GLACCOUNT: BASEURL + '/api/GLAccount/glaccount',

    //Deposits Endpoints
    HIT_DEPOSITS: BASEURL + '/api/Deposits',

    //Deposits Transactions Endpoints
    HIT_DEPOSITS_TRANSACTIONS: BASEURL + '/api/DepositTransactions',

    //LOAN Endpoints
    HIT_LOAN: BASEURL + '/api/Loans',

    //Loan Transactions Endpoints
    HIT_LOAN_TRANSACTIONS: BASEURL + '/api/LoanTransactions',

    //Notification Endpoints
    HIT_NOTIFICATIONS: BASEURL + '/api/Notifications',

    //Clients Endpoints
    HIT_CLIENTS: BASEURL + '/api/Clients',

    //Activities Endpoints
    HIT_ACTIVITIES: BASEURL + '/api/Activities',

    //Search Endpoints
    HIT_GLOBAL_SEARCH: BASEURL + '/api/Search',

    //Task Endpoints
    HIT_TASKS: BASEURL + '/api/ApplicationTasks',

    //Change Client state Endpoints
    HIT_CLIENT_STATE: BASEURL + '/api/ChangeCustomerState',

    //Change Client state Endpoints
    HIT_LOAN_STATE: BASEURL + '/api/ChangeLoanState',

    //Change Client state Endpoints
    HIT_DEPOSIT_STATE: BASEURL + '/api/ChangeDepositState',

    //Upload Data Endpoints
    HIT_UPLOAD_DATA: BASEURL + '/api/Upload',

    //Loan Product Endpoints
    HIT_LOAN_PRODUCTS: BASEURL + '/api/LoanProducts',

    //Loan Deposit Endpoints
     HIT_DEPOSIT_PRODUCTS: BASEURL + '/api/DepositProducts',

    //Balance sheet Report Endpoints
    HIT_BALANCE_SHEET: BASEURL + '/api/AccountingReport/balancesheet',
    HIT_BALANCE_SHEET_EXPORT: BASEURL + '/api/AccountingReport/balancesheetexport',

    //Trial Balance Endpoints
    HIT_TRIAL_BALANCE: BASEURL + '/api/AccountingReport/trialbalance',
    HIT_TRIAL_BALANCE_EXPORT: BASEURL + '/api/AccountingReport/trialbalanceexport',

    //Profit Loss Endpoints
    HIT_PROFIT_LOSS: BASEURL + '/api/AccountingReport/profitandloss',
    HIT_PROFIT_LOSS_EXPORT: BASEURL + '/api/AccountingReport/profitandlossexport',

    //Download
    GET_DOWNLOAD: BASEURL + '/api/Downloads/download?',
}