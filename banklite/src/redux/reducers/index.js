import {combineReducers} from "redux";
import { 
    administration} from "./export";

const rootReducer = (state, action)=>{
   
    // if(action.type === userConstants.LOGOUT)
    //     { 
    //           state = undefined;   
    //          }
    return appReducer(state, action)

};




const administrationReducers = combineReducers({
    adminCreateRoleReducer: administration.createRoleReducer, 
    adminCreateCustomerTypeReducer: administration.createCustomerTypeReducer,   
    adminCreateTransactionChannelReducer :administration.createTransactionChannelReducer,
    adminCreateNewCurrencyReducer :administration.createNewCurrencyReducer
})



const appReducer = combineReducers({
    administrationReducers
})



export default rootReducer;