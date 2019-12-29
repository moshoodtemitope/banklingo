
const URL = 'http://52.170.209.118';

const BASEURL = URL;  

export const routes = {
    BASEURL: BASEURL,

    // Administration endpoints
    
    GET_BRANCHES: BASEURL + '/Dars.Administration/api/Administration/branches?',
    ADD_BRANCH: BASEURL + '/Dars.Administration/api/Administration/branch',
    GET_USERS: BASEURL + '/Dars.Administration/api/Account/users?',
    GET_ORGANIZATION_DETAILS: BASEURL + '/Dars.Administration/api/Administration/organization',
    UPDATE_ORGANIZATION_DETAILS: BASEURL + '/Dars.Administration/api/Administration/updateorganization',
    ADD_CURRENCY: BASEURL + '/Dars.Administration/api/Administration/currency',
    UPDATE_CURRENCY: BASEURL + '/Dars.Administration/api/Administration/updatecurrency',
    GET_ALL_CURRENCIES: BASEURL + '/Dars.Administration/api/Administration/currencies',
    ADD_CUSTOMER_TYPE: BASEURL + '/Dars.Administration/api/Account/customertype',
    ADD_EXCHANGE_RATE: BASEURL + '/Dars.Administration/api/Account/exchangerate',
    ADD_ROLE: BASEURL + '/Dars.Administration/api/Account/role', //works
    // ADD_TRANSACTION_CHANNEL: BASEURL + '/Dars.Administration/api/Account/transactionchannel',
    ADD_TRANSACTION_CHANNEL: BASEURL + '/Dars.Administration/api/Administration/transactionchannel',
    GET_TRANSACTION_CHANNEL: BASEURL + '/Dars.Administration/api/Administration/transactionchannels',
    GET_ACCESS_PREFERENCE: BASEURL + '/Dars.Administration/api/Administration/accesspreference',
    UPDATE_ACCESS_PREFERENCE: BASEURL + '/Dars.Administration/api/Administration/accesspreference',
    UPDATE_EMAIL_SETTINGS: BASEURL + '/Dars.Administration/api/Administration/emailsetting',
    GET_EMAIL_SETTINGS: BASEURL + '/Dars.Administration/api/Administration/emailsetting/',
    UPDATE_INTERNAL_CONTROL: BASEURL + '/Dars.Administration/api/Account/internalcontrol',
    GET_SMS_SETTINGS: BASEURL + '/Dars.Administration/api/Administration/smssetting/',
    UPDATE_SMS_SETTINGS: BASEURL + '/Dars.Administration/api/Administration/smssetting',

    //Accounting Endpoints
    HIT_GLACCOUNTS: BASEURL + '/Dars.Administration/api/GLAccount/glaccounts',
    ALL_GLACCOUNTS: BASEURL + '/Dars.Administration/api/GLAccount/allglaccounts',
    CREATE_GLACCOUNT: BASEURL + '/Dars.Administration/api/GLAccount/glaccount',
}