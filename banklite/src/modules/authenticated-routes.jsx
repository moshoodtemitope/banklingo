import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { Redirect, Router } from "react-router";
import {history} from "../_helpers/history";
import { connect } from 'react-redux';
import { Fragment } from "react";
import DashboardLanding from './dashboard'
import UserLogin from './onboarding/login'
import ClientsManagement from './clients'
import InactiveClients from './clients/inactive'
import ActiveClients from './clients/active'
import ClientsPendingApproval from './clients/pending-approval'
import ClientsExited from './clients/clients-exited'
import ClientsBlacklisted from './clients/blacklisted'
import NewClient from './clients/new-client'
import EditAClient from './clients/edit-client'

import LoansManagement from './loanmanagement'
import LoanClient from './loanmanagement/loan-client'
import NewLoanAccount from './loanmanagement/newloanaccount'

import DisbursementManagement from './disbursements'
import InitiateDisbursement from './disbursements/initiate-disbursements'
import DisbursementPendingApproval from './disbursements/pending-approval'
import NipRequests from './disbursements/nip-request'

import DepositManagement from './depositmanagement'
import DepositClient from './depositmanagement/deposit-client'
import NewDepositAccount from './depositmanagement/newdepositaccount'

import LoanTransactions from './loantransactions'
import LoanAccountTransactions from './loantransactions/loan-account-transactions'
import DepositTransactions from './deposittransactions'
import DepositTransactionAccount from './deposittransactions/deposit-transaction-account'
import Activties from './activities'
import BranchesManagement from './branches'
import UserManagement from './usermanagement'

import CommunicationsManagement from './communications'
import EmailCommunications from './communications/emails'
import SMSCommunications from './communications/sms' 
import WebhooksCommunications from './communications/webhooks' 

import AccountManagement from './accountsmanagement'
import TrialBalance from './accountsmanagement/trial-balance'
import JournalEntries from './accountsmanagement/journal-entries'
import ProfitAndLoss from './accountsmanagement/profit-loss'
import BalanceSheet from './accountsmanagement/balance-sheet'


import AdminManagement from './administration'

import GeneralOrganization from './administration/general-organization'
import GeneralCurrency from './administration/general-currency'
import GeneralTxtChannels from './administration/general-txtchannels'
import NewTxtChannels from './administration/general-txtchannels-new'
import GeneralCustomerTypes from './administration/general-customertypes'
import GeneralInternalControl from './administration/general-internalcontrol'
import GeneralBranding from './administration/general-branding'

import OrganizationBranches from './administration/organization-branches'
import NewBranch from './administration/organization-branches-new'
import EditBranch from './administration/organization-edit-branch'
import OrganizationCenters from './administration/organization-centers'
import NewCenter from './administration/organization-centers-new'

import SMSSettings from './administration/sms-settings'
import EmailSettings from './administration/email-settings'

import ProductLoans from './administration/products-loans'
import NewLoanProduct from './administration/products-newloans'
import EditLoanProduct from './administration/products-editloan'
import ProductDeposits from './administration/products-deposits'
import NewDepositsProduct from './administration/products-newdeposits-product'
import EditADepositsProduct from './administration/products-editdeposits-product'

import AccessRoles from './administration/access-roles'
import CreateNewRole from './administration/access-newrole'
import EditRole from './administration/access-editrole'

import AccessUsers from './administration/access-users'
import CreateNewUser from './administration/access-newuser'
import EditUser from './administration/access-edituser'

import AccessPreferences from './administration/access-preferences'
import AccessAuth from './administration/access-authentication'


import ViewCustomer from './viewcustomer'
import ViewCustomerAttachments from './viewcustomer/attachments'
import ViewCustomerComments from './viewcustomer/comments'
import ViewCustomerCommunications from './viewcustomer/communications'
import ViewCustomerTasks from './viewcustomer/tasks'
import NewCustomerAccount from './viewcustomer/newcustomer'
import EditCustomerAccount from './viewcustomer/editcustomer'
import NewInvestmentCustomerAccount from './viewcustomer/new-investmentcustomer'

import ViewLoanAccount from './viewcustomer/viewloanaccount'
import ViewSavingsAccount from './viewcustomer/viewsavingsaccount'
import ViewClosedAccounts from './viewcustomer/viewallclosedaccounts'
import ViewClosedAccount from './viewcustomer/viewclosedaccount'

import PageNotFound from './pagenot-found'
import {authActions} from '../redux/actions/auth/auth.action';


var user = JSON.parse(localStorage.getItem("user"));
//console.log("ouside", user);
function PrivateRoute({ component: Component, authed, ...rest }) {
    
    return (
        <Route
            {...rest}
            render={(props) => authed && Object.keys(authed).length>=1 ? <Component  {...rest} {...props} />
                : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
        />
    )
}

class AuthenticatedRoutes extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

    }
    


    render() {
        
        return (
               
                <Fragment>
                    <Router history={history}>
                    <Switch>
                        
                        <Route exact path='/' render={(props) => <UserLogin  />} /> 

                        <PrivateRoute path='/dashboard' {...this.props} authed={this.props.user} component={DashboardLanding} />
                        {/* <Route exact path='/dashboard' render={(props) => <DashboardLanding {...this.props} />} />  */}

                        <PrivateRoute exact path='/clients' {...this.props} authed={this.props.user} component={ClientsManagement} />
                        {/* <Route exact path='/clients' render={(props) => <ClientsManagement {...this.props} />} /> */}

                        <PrivateRoute exact path='/clients/new/:customertype/:custTypeid'  authed={this.props.user} component={NewClient} />
                        {/* <Route exact path='/clients/new' render={(props) => <NewClient {...this.props} />} /> */}

                        <PrivateRoute exact path='/clients/edit/:encodedkey'    authed={this.props.user} component={EditAClient} />
                        {/* <PrivateRoute path='/clients/edit/:encodedkey' exact  encodedKey={this.props.computedMatch.params.encodedkey} authed={this.props.user} component={EditAClient} /> */}
                        {/* <Route exact path='/clients/edit/:encodedkey'  render={(props) => <EditAClient encodedKey={props.match.params.encodedkey} {...this.props} />} /> */}

                        <PrivateRoute exact path='/active-clients' {...this.props} authed={this.props.user} component={ClientsManagement} />
                        <Route exact path='/active-clients' render={(props) => <ClientsManagement {...this.props} />} />

                        <PrivateRoute exact path='/inactive-clients' {...this.props} authed={this.props.user} component={InactiveClients} />
                        {/* <Route exact path='/inactive-clients' render={(props) => <InactiveClients {...this.props} />} /> */}
                       
                        {/* <Route exact path='/active-clients' render={(props) => <ActiveClients {...this.props} />} /> */}
                        <PrivateRoute exact path='/clients-pending-approval' {...this.props} authed={this.props.user} component={ClientsPendingApproval} />
                        {/* <Route exact path='/clients-pending-approval' render={(props) => <ClientsPendingApproval {...this.props} />} /> */}


                        <PrivateRoute exact path='/clients-exited' {...this.props} authed={this.props.user} component={ClientsExited} />
                        {/* <Route exact path='/clients-exited' render={(props) => <ClientsExited {...this.props} />} /> */}

                        <PrivateRoute exact path='/clients-blacklisted' {...this.props} authed={this.props.user} component={ClientsBlacklisted} />            
                        {/* <Route exact path='/clients-blacklisted' render={(props) => <ClientsBlacklisted {...this.props} />} /> */}

                        <PrivateRoute exact path='/all-loans' {...this.props} authed={this.props.user} component={LoansManagement} />  


                        <PrivateRoute exact path='/all-loans/:clientId' {...this.props} authed={this.props.user} component={LoanClient} />  
                        {/* <Route exact path='/all-loans/:clientId' render={(props) => <LoanClient clientId={props.match.params.clientId} {...this.props} />} /> */}

                        {/* <Route exact path='/all-loans/newloan-account' render={(props) => <NewLoanAccount {...this.props} />} /> */}
                        <PrivateRoute exact path='/all-loans/newloan-account' {...this.props} authed={this.props.user} component={NewLoanAccount} />  

                        <PrivateRoute exact path='/disbursements' {...this.props} authed={this.props.user} component={DisbursementManagement} />  
                        <PrivateRoute exact path='/disbursements/initiate' {...this.props} authed={this.props.user} component={InitiateDisbursement} />  

                        <PrivateRoute exact path='/disbursements/pending-approval' {...this.props} authed={this.props.user} component={DisbursementPendingApproval} /> 
                        <PrivateRoute exact path='/disbursements/nip-requests' {...this.props} authed={this.props.user} component={NipRequests} /> 
                        
                        <PrivateRoute exact path='/deposits' {...this.props} authed={this.props.user} component={DepositManagement} /> 
                        {/* <Route exact path='/deposits' render={(props) => <DepositManagement {...this.props} />} /> */}

                        <PrivateRoute exact path='/deposits/:clientId' {...this.props} authed={this.props.user} component={DepositClient} /> 
                        {/* <Route exact path='/deposits/:clientId' render={(props) => <DepositClient clientId={props.match.params.clientId} {...this.props} />} /> */}
                        <PrivateRoute exact path='/deposits/newaccount' {...this.props} authed={this.props.user} component={NewDepositAccount} /> 
                       
                        <PrivateRoute exact path='/loan-transactions' {...this.props} authed={this.props.user} component={LoanTransactions} /> 
                        <PrivateRoute exact path='/loan-transactions/:accountEncodedKey' {...this.props} authed={this.props.user} component={LoanAccountTransactions} /> 
                        {/* <Route exact path='/loan-transactions/:accountEncodedKey' render={(props) => <LoanAccountTransactions accountEncodedKey={props.match.params.accountEncodedKey} {...this.props} />} /> */}

                        <PrivateRoute exact path='/deposit-transactions' {...this.props} authed={this.props.user} component={DepositTransactions} /> 
                        <PrivateRoute exact path='/deposit-transactions/:accountEncodedKey' {...this.props} authed={this.props.user} component={DepositTransactionAccount} /> 
                        {/* <Route exact path='/deposit-transactions/:accountEncodedKey' render={(props) => <DepositTransactionAccount accountEncodedKey={props.match.params.accountEncodedKey} {...this.props} />} /> */}

                        <PrivateRoute exact path='/activities' {...this.props} authed={this.props.user} component={Activties} /> 
                        <PrivateRoute exact path='/branches' {...this.props} authed={this.props.user} component={BranchesManagement} /> 
                        <PrivateRoute exact path='/user-management' {...this.props} authed={this.props.user} component={UserManagement} /> 
                        <PrivateRoute exact path='/communications' {...this.props} authed={this.props.user} component={CommunicationsManagement} /> 
                        <PrivateRoute exact path='/communications/emails' {...this.props} authed={this.props.user} component={EmailCommunications} /> 
                        <PrivateRoute exact path='/communications/sms' {...this.props} authed={this.props.user} component={SMSCommunications} /> 
                        <PrivateRoute exact path='/communications/webhooks' {...this.props} authed={this.props.user} component={WebhooksCommunications} /> 
                        
                        <PrivateRoute exact path='/accounts' {...this.props} authed={this.props.user} component={AccountManagement} /> 
                        <PrivateRoute exact path='/journals' {...this.props} authed={this.props.user} component={JournalEntries} /> 
                        <PrivateRoute exact path='/trial-balance' {...this.props} authed={this.props.user} component={TrialBalance} /> 
                        <PrivateRoute exact path='/profit-loss' {...this.props} authed={this.props.user} component={ProfitAndLoss} /> 
                        <PrivateRoute exact path='/balancesheet' {...this.props} authed={this.props.user} component={BalanceSheet} /> 
                        <PrivateRoute exact path='/balancesheet' {...this.props} authed={this.props.user} component={BalanceSheet} /> 
                        
                        <PrivateRoute exact path='/administration' {...this.props} authed={this.props.user} component={AdminManagement} /> 
                        <PrivateRoute exact path='/administration/general' {...this.props} authed={this.props.user} component={GeneralOrganization} /> 
                        <PrivateRoute exact path='/administration/general/currency' {...this.props} authed={this.props.user} component={GeneralCurrency} /> 
                        <PrivateRoute exact path='/administration/general/txt-channels' {...this.props} authed={this.props.user} component={GeneralTxtChannels} /> 
                        <PrivateRoute exact path='/administration/general/new-txt-channels' {...this.props} authed={this.props.user} component={NewTxtChannels} /> 
                        <PrivateRoute exact path='/administration/general/customer-types' {...this.props} authed={this.props.user} component={GeneralCustomerTypes} /> 
                        <PrivateRoute exact path='/administration/general/control' {...this.props} authed={this.props.user} component={GeneralInternalControl} /> 
                        <PrivateRoute exact path='/administration/general/branding' {...this.props} authed={this.props.user} component={GeneralBranding} /> 
                        
                        <PrivateRoute exact path='/administration/organization' {...this.props} authed={this.props.user} component={OrganizationBranches} /> 
                        <PrivateRoute exact path='/administration/organization/newbranch' {...this.props} authed={this.props.user} component={NewBranch} /> 
                        <PrivateRoute exact path='/administration/organization/editbranch/:encodedkey' {...this.props} authed={this.props.user} component={EditBranch} /> 
                        <PrivateRoute exact path='/administration/organization/centers' {...this.props} authed={this.props.user} component={OrganizationCenters} /> 
                        <PrivateRoute exact path='/administration/organization/new-centers' {...this.props} authed={this.props.user} component={NewCenter} /> 
                        <PrivateRoute exact path='/administration/sms' {...this.props} authed={this.props.user} component={SMSSettings} /> 
                        <PrivateRoute exact path='/administration/email' {...this.props} authed={this.props.user} component={EmailSettings} /> 
                        
                        <PrivateRoute exact path='/administration/products' {...this.props} authed={this.props.user} component={ProductLoans} /> 
                        <PrivateRoute exact path='/administration/products/deposits' {...this.props} authed={this.props.user} component={ProductDeposits} /> 
                        <PrivateRoute exact path='/administration/products/edita-depositsproduct' {...this.props} authed={this.props.user} component={EditADepositsProduct} /> 
                        <PrivateRoute exact path='/administration/products/newdeposits-product' {...this.props} authed={this.props.user} component={NewDepositsProduct} /> 
                        <PrivateRoute exact path='/administration/products/newloan-product' {...this.props} authed={this.props.user} component={NewLoanProduct} /> 
                        <PrivateRoute exact path='/administration/products/editloan-product' {...this.props} authed={this.props.user} component={EditLoanProduct} /> 
                        
                        <PrivateRoute exact path='/administration/access' {...this.props} authed={this.props.user} component={AccessRoles} /> 
                        <PrivateRoute exact path='/administration/access/new-role' {...this.props} authed={this.props.user} component={CreateNewRole} /> 
                        <PrivateRoute exact path='/administration/access/edit-role/:roleId' {...this.props} authed={this.props.user} component={EditRole} /> 
                        
                        <PrivateRoute exact path='/administration/access/users' {...this.props} authed={this.props.user} component={AccessUsers} /> 
                        <PrivateRoute exact path='/administration/access/new-user' {...this.props} authed={this.props.user} component={CreateNewUser} /> 
                        {/* <Route exact path='/administration/access/new-user' render={(props) => <CreateNewUser {...this.props} />} /> */}
                        <PrivateRoute exact path='/administration/access/edit-user/:encodedKey' {...this.props} authed={this.props.user} component={EditUser} /> 
                        
                        <PrivateRoute exact path='/administration/access/preferences' {...this.props} authed={this.props.user} component={AccessPreferences} /> 
                        <PrivateRoute exact path='/administration/access/authentication' {...this.props} authed={this.props.user} component={AccessAuth} /> 
                        
                        <PrivateRoute exact path='/customer/:id' {...this.props} authed={this.props.user} component={ViewCustomer} /> 
                        <PrivateRoute exact path='/createnewcustomer' {...this.props} authed={this.props.user} component={NewCustomerAccount} /> 
                        <PrivateRoute exact path='/create-investmentcustomer' {...this.props} authed={this.props.user} component={NewInvestmentCustomerAccount} /> 
                        <PrivateRoute exact path='/editcustomer' {...this.props} authed={this.props.user} component={EditCustomerAccount} /> 
                        <PrivateRoute exact path='/customer/:id/attachments' {...this.props} authed={this.props.user} component={ViewCustomerAttachments} /> 
                        <PrivateRoute exact path='/customer/:id/tasks' {...this.props} authed={this.props.user} component={ViewCustomerTasks} /> 
                        <PrivateRoute exact path='/customer/:id/communications' {...this.props} authed={this.props.user} component={ViewCustomerCommunications} /> 
                        <PrivateRoute exact path='/customer/:id/comments' {...this.props} authed={this.props.user} component={ViewCustomerComments} /> 
                        <PrivateRoute exact path='/customer/:id/closedaccounts' {...this.props} authed={this.props.user} component={ViewClosedAccounts} /> 
                        <PrivateRoute exact path='/customer/:id/loanaccount/:loanid' {...this.props} authed={this.props.user} component={ViewLoanAccount} /> 
                        <PrivateRoute exact path='/customer/:id/savingsaccount/:accountid' {...this.props} authed={this.props.user} component={ViewSavingsAccount} /> 
                        
                        <PrivateRoute exact path='/customer/:id/closedaccounts/:accountid' {...this.props} authed={this.props.user} component={ViewClosedAccount} /> 
                        

                        

                        {/* <Route exact path='/administration/organization/editbranch/:encodedkey'  render={(props) => <EditBranch encodedKey={props.match.params.encodedkey} {...this.props} />} /> */}
                        {/* <Route exact path='/administration/access/edit-user/:encodedKey'  render={(props) => <EditUser encodedKey={props.match.params.encodedKey} {...this.props} />} /> */}
                        
                        
                        
                        {/* <Route exact path='/administration/administration-generalcurrency'  render={(props) => <GeneralCurrency {...this.props} />} /> */}
                        
                        <Route  render={(props) => <PageNotFound {...this.props} />} />
                    </Switch>
                    {/* <Route  path='/clients' component={ClientsManagement} /> */}
                    </Router>
                </Fragment>

        )
    }
}
function mapStateToProps(state) {
    return {
        // user : state.authReducers.LoginReducer
        user : state.authReducers.LoginReducer
    };
}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(authActions.Logout()),
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(AuthenticatedRoutes);
