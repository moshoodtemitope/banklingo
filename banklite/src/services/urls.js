// const URL = 'http://52.170.209.118';
// const URL = 'http://40.76.69.211/Banklot';
// const URL = 'http://40.76.69.211/Fintech.CBS.Backend';

// const URL = process.env.NODE_ENV === 'development' ? 'https://theprojectsplash.com/Fintech.CBS.Backend' : 'https://theprojectsplash.com/Fintech.CBS.Backend'

//Teanancy BASE
let URL = "",
  BASEURL = "",
  getTenant = "";

getTenant = localStorage.getItem("lingoAuthTenant")
  ? JSON.parse(localStorage.getItem("lingoAuthTenant"))
  : null;

// if(getTenant===null){
//     URL = process.env.NODE_ENV === 'development' ? 'https://theprojectsplash.com/Fintech.CBS.Backend' : 'https://theprojectsplash.com/Fintech.CBS.Backend'
// }

// const URL = process.env.NODE_ENV === 'development' ? 'https://theprojectsplash.com/Fintech.CBS.Backend' : 'https://theprojectsplash.com/Fintech.CBS.Backend'
// const URL = process.env.NODE_ENV === 'development' ? 'https://banklingoapi.monee.ng/Fintech.CBS.Backend' : 'https://banklingoapi.monee.ng/Fintech.CBS.Backend'
// const URL = process.env.API_URL
// https://theprojectsplash.com/Fintech.CBS.Backend/swagger/index.html
BASEURL = URL;

export const routesA = {
  GET_TENANCY: "https://cb-api.banklingo.app/api/Login/confirmtenant",
};

export const routes = {
  // BASEURL: BASEURL,
  // BASEURL: localStorage.getItem("lingoAuthTenant") ? 'https://'+JSON.parse(localStorage.getItem("lingoAuthTenant").beApi : null,
  // GET_TENANCY:'https://cb-api.banklingo.app/api/Login/confirmtenant',
  // Administration endpoints

  LOGIN_USER: BASEURL + "/api/Login",
  REFRESH_TOKEN: BASEURL + "/api/Login/refreshtoken",
  CHANGE_PASSWORD: BASEURL + "/api/Login/changepassword",
  RESET_PIN: BASEURL + "/api/Login/resetpin",
  RESET_PASSWORD_FOR_USER: BASEURL + "/api/Login/resetpasswordforuser",
  CHANGE_PIN: BASEURL + "/api/Login/changepin",
  ACTIVATE_USER: BASEURL + "/api/Login/activateuser",
  DEACTIVATE_USER: BASEURL + "/api/Login/deactivateuser",
  HIT_DASHBOARD: BASEURL + "/api/Dashboard",

  // Disbursement endpoints

  HIT_DISBURSEMENT: BASEURL + "/api/Disbursment",

  // NIP endpoints
  HIT_NIP: BASEURL + "/api/NIPRequest",

  // Administration endpoints

  GET_BRANCHES: BASEURL + "/api/branch",
  ADD_BRANCH: BASEURL + "/api/branch",

  HIT_USERS: BASEURL + "/api/user",

  GET_ORGANIZATION_DETAILS: BASEURL + "/api/Administration/organization",
  UPDATE_ORGANIZATION_DETAILS:
    BASEURL + "/api/Administration/updateorganization",


    INTER_BRANCH_GL: BASEURL + "/api/Interbranch",

  ADD_CURRENCY: BASEURL + "/api/Administration/currency",
  UPDATE_CURRENCY: BASEURL + "/api/Administration/updatecurrency",
  GET_ALL_CURRENCIES: BASEURL + "/api/Administration/currencies",

  ADD_CUSTOMER_TYPE: BASEURL + "/api/CustomerType/customertype",
  HIT_CUSTOMER_TYPES: BASEURL + "/api/CustomerType",

  ADD_EXCHANGE_RATE: BASEURL + "/api/Account/exchangerate",
  GET_EXCHANGE_RATE: BASEURL + "/api/Account/exchangerates",
  GET_CONVERSION_TABLE: BASEURL + "/api/Account/conversiontable",

  HIT_ROLE: BASEURL + "/api/Role", //works

  // ADD_TRANSACTION_CHANNEL: BASEURL + '/api/Account/transactionchannel',

  ADD_TRANSACTION_CHANNEL:
    BASEURL + "/api/TransactionChannel/transactionchannel",
  HIT_TRANSACTION_CHANNEL:
    BASEURL + "/api/TransactionChannel/transactionchannels",

  GET_ACCESS_PREFERENCE: BASEURL + "/api/Administration/accesspreference",
  UPDATE_ACCESS_PREFERENCE: BASEURL + "/api/Administration/accesspreference",

  UPDATE_EMAIL_SETTINGS: BASEURL + "/api/Communication/emailsetting",
  GET_EMAIL_SETTINGS: BASEURL + "/api/Communication/emailsetting/",
  HIT_INTERNAL_CONTROL: BASEURL + "/api/internal",
  GET_SMS_SETTINGS: BASEURL + "/api/Communication/smssetting/",
  UPDATE_SMS_SETTINGS: BASEURL + "/api/Communication/smssetting",

  JOURNAL_ENTRIES: BASEURL + "/api/JournalEntries",

  //Accounting Endpoints
  HIT_GLACCOUNTS_BASE: BASEURL + "/api/GLAccount",
  HIT_GLACCOUNTS: BASEURL + "/api/GLAccount/glaccounts",
  ALL_GLACCOUNTS: BASEURL + "/api/GLAccount/allglaccounts",
  CREATE_GLACCOUNT: BASEURL + "/api/GLAccount/glaccount",

  //Deposits Endpoints
  HIT_DEPOSITS: BASEURL + "/api/Deposits",



  //Deposits Transactions Endpoints
  HIT_DEPOSITS_TRANSACTIONS: BASEURL + "/api/DepositTransactions",

  //LOAN Endpoints
  HIT_BASE_URL:BASEURL,
  HIT_LOAN: BASEURL + "/api/Loans",

  //Loan Transactions Endpoints
  HIT_LOAN_TRANSACTIONS: BASEURL + "/api/LoanTransactions",

  //Notification Endpoints
  HIT_NOTIFICATIONS: BASEURL + "/api/Notifications",

  //Clients Endpoints
  HIT_CLIENTS: BASEURL + "/api/Clients",
  HIT_CLIENT_GROUP: BASEURL + "/api/ClientGroup",

  //Activities Endpoints
  HIT_ACTIVITIES: BASEURL + "/api/Activities",

  //Search Endpoints
  HIT_GLOBAL_SEARCH: BASEURL + "/api/Search",

  //Reverse Transaction
  REVERSE_TRANSACTION: BASEURL + "/api/Deposits/reversetransaction",

  TELLER_MANAGEMENT: BASEURL + "/api/TellerManagement",

  CHEQUE_MANAGEMENT: BASEURL + "/api/ChequeTransaction",

  //Task Endpoints
  HIT_TASKS: BASEURL + "/api/ApplicationTasks",

  //Change Client state Endpoints
  HIT_CLIENT_STATE: BASEURL + "/api/ChangeCustomerState",

  //Change Client state Endpoints
  HIT_LOAN_STATE: BASEURL + "/api/ChangeLoanState",

  //Pay Off Loan
  PAY_OFF_LOAN: BASEURL + "/api/ChangeLoanState",

  //Write Off Loan
  WRITE_OFF_LOAN: BASEURL + "/api/ChangeLoanState",

  //Reschedule  Loan
  RESCHEDULE_LOAN: BASEURL + "/api/ChangeLoanState",

  //Refinance  Loan
  REFINANCE_LOAN: BASEURL + "/api/ChangeLoanState",

  //Change Client state Endpoints
  HIT_DEPOSIT_STATE: BASEURL + "/api/ChangeDepositState",

  //Lock Amount state Endpoints
  HIT_LOCK_AMOUNT_STATE: BASEURL + "/api/LockAmount",

  //Upload Data Endpoints
  HIT_UPLOAD_DATA: BASEURL + "/api/Upload",

  //Loan Product Endpoints
  HIT_LOAN_PRODUCTS: BASEURL + "/api/LoanProducts",

  //Loan Deposit Endpoints
  HIT_DEPOSIT_PRODUCTS: BASEURL + "/api/DepositProducts",

  //Balance sheet Report Endpoints
  HIT_BALANCE_SHEET: BASEURL + "/api/AccountingReport/balancesheet",
  HIT_BALANCE_SHEET_EXPORT:
    BASEURL + "/api/AccountingReport/balancesheetexport",

  //Trial Balance Endpoints
  HIT_TRIAL_BALANCE: BASEURL + "/api/AccountingReport/trialbalance",
  HIT_TRIAL_BALANCE_EXPORT:
    BASEURL + "/api/AccountingReport/trialbalanceexport",

  //Profit Loss Endpoints
  HIT_PROFIT_LOSS: BASEURL + "/api/AccountingReport/profitandloss",
  HIT_PROFIT_LOSS_EXPORT: BASEURL + "/api/AccountingReport/profitandlossexport",

  //Whitelist
  HIT_LOAN_CREDIT_SCORE_PASS: BASEURL + "/api/LoanCreditScoreByPass",

  //Whitelist
  HIT_CARD_PROVIDER: BASEURL + "/api/CardProvider",

  //Payroll Group
  HIT_PAYROLL_GORUP: BASEURL + "/api/PayrollGroup",

  //Employee Payroll Info
  HIT_EMPLOYEE_PAYROLL_INFO: BASEURL + "/api/PayrollEmployeeInformation",

  //Employee Payroll Info
  HIT_BANK_INFO: BASEURL + "/api/BankAccount",

  //Employee Payroll Info
  // HIT_BANK_INFO: BASEURL + '/api/BankAccount',

  //Notification Templates
  HIT_NOTIFICATIONS_TEMPLATE: BASEURL + "/api/NotificationTemplate",

  //Transaction Services
  HIT_TRANASACTION_SERVICES: BASEURL + "/api/ChannelService",

  //Risk Levels
  HIT_RISK_LEVEL: BASEURL + "/api/RiskLevel",

  //Download
  GET_DOWNLOAD: BASEURL + "/api/Downloads/download?",

  //Company Info
  HIT_COMPANY_INFO: BASEURL + "/api/CompanyInformation",
};
