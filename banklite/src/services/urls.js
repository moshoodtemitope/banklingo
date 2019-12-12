
const URL = 'http://52.170.209.118';

const BASEURL = URL;  

export const routes = {
    BASEURL: BASEURL,

    // Administration endpoints
    
    ADD_BRANCH: BASEURL + '/Dars.Administration/api/Account/branch',
    ADD_CURRENCY: BASEURL + '/Dars.Administration/api/Account/currency',
    ADD_CURRENCY_TYPE: BASEURL + '/Dars.Administration/api/Account/customertype',
    ADD_EXCHANGE_RATE: BASEURL + '/Dars.Administration/api/Account/exchangerate',
    ADD_ROLE: BASEURL + '/Dars.Administration/api/Account/role', //works
    ADD_TRANSACTION_CHANNEL: BASEURL + '/Dars.Administration/api/Account/transactionchannel',
    UPDATE_ACCESS_PREFERENCE: BASEURL + '/Dars.Administration/api/Account/accesspreference',
    UPDATE_EMAIL_SETTINGS: BASEURL + '/Dars.Administration/api/Account/emailsetting',
    UPDATE_INTERNAL_CONTROL: BASEURL + '/Dars.Administration/api/Account/internalcontrol',
    UPDATE_SMS_SETTINGS: BASEURL + '/Dars.Administration/api/Account/smssetting',
}