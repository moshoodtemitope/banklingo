
const URL = 'http://52.170.209.118';

const BASEURL = URL;  

export const routes = {
    BASEURL: BASEURL,

    // Administration endpoints
    
    ADD_BRANCH: BASEURL + '/Dars.Administration/api/Account/branch',
    ADD_CURRENCY: BASEURL + '/Dars.Administration/Account/currency',
    ADD_CURRENCY_TYPE: BASEURL + '/Dars.Administration/Account/customertype',
    ADD_EXCHANGE_RATE: BASEURL + '/Dars.Administration/Account/exchangerate',
    ADD_ROLE: BASEURL + '/Dars.Administration/Account/role', //works
    ADD_TRANSACTION_CHANNEL: BASEURL + '/Dars.Administration/Account/transactionchannel',
    UPDATE_ACCESS_PREFERENCE: BASEURL + '/Dars.Administration/Account/accesspreference',
    UPDATE_EMAIL_SETTINGS: BASEURL + '/Dars.Administration/Account/emailsetting',
    UPDATE_INTERNAL_CONTROL: BASEURL + '/Dars.Administration/Account/internalcontrol',
    UPDATE_SMS_SETTINGS: BASEURL + '/Dars.Administration/Account/smssetting',
}