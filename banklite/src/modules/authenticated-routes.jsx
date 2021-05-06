import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { Redirect, Router } from "react-router";
import {history} from "../_helpers/history";
import { connect } from 'react-redux';
import { Fragment } from "react";
import DashboardLanding from './dashboard/new-index'
import LoginWrap from './onboarding/login/login'

import ChangePassword from './profile/change-password'
import ChangePin from './profile/change-pin'

import ClientsListDisplay from './clients/client-list-display'
import ClientsManagement from './clients'
import InactiveClients from './clients/inactive'
import ActiveClients from './clients/active'
import ClientsPendingApproval from './clients/pending-approval'
import ClientsExited from './clients/clients-exited'
import ClientsBlacklisted from './clients/blacklisted'
import NewClient from './clients/new-client'
import NewGroupClient from './groups/new-group'
import EditAClient from './clients/edit-client'

import ViewAllTasks from './all-tasks'

import LoansManagement from './loanmanagement'
import ActiveLoans from './loanmanagement/active'
import ApprovedLoans from './loanmanagement/approved'
import LoansInArrears from './loanmanagement/arrears'
import ClosedLoans from './loanmanagement/closed'
import ClosedWithDrawnLoans from './loanmanagement/closed-withdrawn'
import ClosedWrittenOffLoans from './loanmanagement/closed-writtenoff'

import PendingLoans from './loanmanagement/pending'
import PendingLoansApproval from './loanmanagement/pending-approval/pending'
import PendingLoansApprovalMgt from './loanmanagement/pending-approval/pending-management'
import LoansPendingAcceptance from './loanmanagement/pending-approval/pending-acceptance'

import RejectedLoans from './loanmanagement/rejected'
import LoanClient from './loanmanagement/loan-client'
import NewLoanAccount from './loanmanagement/newloanaccount'
import EditALoanAccount from './loanmanagement/edit-loan'

import RefinanceALoanAccount from './loanmanagement/refinance-loan'
import RescheduleALoanAccount from './loanmanagement/reschedule-loan'

import AllDisbursements from './disbursements/all'
import DisbursementManagement from './disbursements'
import InitiateDisbursement from './disbursements/initiate-disbursements'
import InitiatedDisbursmentBatches from './disbursements/initiated'
import ViewADisbursmentBatch from './disbursements/view-batch'
import DisbursementPendingReview from './disbursements/pending-review'
import DisbursementPendingApproval from './disbursements/pending-approval'
import NipRequests from './disbursements/nip-request'
import NipOutwardsRequests from './disbursements/nip-outwards'

import DepositManagement from './depositmanagement'
import DepositClient from './depositmanagement/deposit-client'
import NewDepositAccount from './depositmanagement/newdepositaccount'

import AllLoanSchedules from './all-loan-schedules'
import LoanPAR from './loan-PAR'

import DepositTransactionsManagement from './deposittransactions/deposit-transaction-account'
import LoanTransactionsManagement from './loantransactions/loan-account-transactions'
// import DepositTransactions from './deposittransactions'
import DepositTransactionAccount from './deposittransactions/deposit-transaction-account'
import Activties from './activities'
import BranchesManagement from './branches'
import UserManagement from './usermanagement'


import CommunicationsManagement from './communications'
import EmailCommunications from './communications/emails'
import SMSCommunications from './communications/sms'
import WebhooksCommunications from './communications/webhooks'

import AccountManagement from './accountsmanagement'
import TrialBalanceBasic from './accountsmanagement/trial-balance-basic'
import TrialBalance from './accountsmanagement/trial-balance'
import JournalEntries from './accountsmanagement/journal-entries'
import ProfitAndLoss from './accountsmanagement/profit-loss'
import BalanceSheet from './accountsmanagement/balance-sheet'


import AdminManagement from './administration'

import UploadData from './administration/uploaddata'

import GeneralOrganization from './administration/general-organization'
import RiskLevels from './administration/general-risks-levels'
import Notifications from './administration/general-notifications'
import TransactionServices from './administration/general-transaction-services'


import ManageCustomerWhitelist from './platform/customer-whitelist'
import ManageCompanyInfo from './platform/company-info'
import ManageEmployeeInfo from './platform/employee-info'
import ManageBankInfo from './platform/bank-info'



import GeneralCurrency from './administration/general-currency'
import GeneralTxtChannels from './administration/general-txtchannels'
import NewTxtChannels from './administration/general-txtchannels-new'
//import GeneralCustomerTypes from './administration/customertypes/general-customertypes'
import CustomerTypesAdministration from './administration/customertypes/customertypes-management-list'
import GeneralInternalControl from './administration/general-internalcontrol'
import GeneralBranding from './administration/general-branding'

import BranchListManagement from './administration/branchmanagement/branch-management-list'
import NewBranch from './administration/branchmanagement/organization-branches-new'
import EditBranch from './administration/branchmanagement/organization-edit-branch'

import OrganizationBranchesClosures from './administration/branchmanagement/organization-branches-closures'
import OrganizationBranchesOpen from './administration/branchmanagement/organization-branches-opened'
import OrganizationBranchesClosed from './administration/branchmanagement/organization-branches-closed'
import OrganizationCenters from './administration/organization-centers'
import NewCenter from './administration/organization-centers-new'

import SMSSettings from './administration/sms-settings'
import EmailSettings from './administration/email-settings'

import ProductLoans from './administration/products-loans'
import NewLoanProduct from './administration/products-newloans'
import EditLoanProduct from './administration/products-editloan2'
import ProductDeposits from './administration/products-deposits'
import NewDepositsProduct from './administration/products-newdeposits-product'
import EditADepositsProduct from './administration/products-editdeposits-product'

import AccessRoles from './administration/access-roles'
import CreateNewRole from './administration/access-newrole'
import EditRole from './administration/access-editrole'

// import AccessUsers from './administration/access-users/usermanagement'
import CreateNewUser from './administration/access-newuser'
import EditUser from './administration/access-edituser'

import AccessPreferences from './administration/access-preferences'
import AccessAuth from './administration/access-authentication'

import PlatformCardProvider from './administration/platform-cardprovider'
import PlatformPayrollGroup from './administration/platform-payroll-group'


import CustomerAccountContainer from './viewcustomer/customeraccount-container'

// import ViewCustomer from './viewcustomer'
// import ViewCustomerAttachments from './viewcustomer/attachments'
// import ViewCustomerComments from './viewcustomer/comments'
// import ViewCustomerCommunications from './viewcustomer/communications'
import ViewUserTasks from './viewuser/my-tasks'
// import NewCustomerAccount from './viewcustomer/newcustomer'
// import EditCustomerAccount from './viewcustomer/editcustomer'
// import NewInvestmentCustomerAccount from './viewcustomer/new-investmentcustomer'

// import ViewLoanAccount from './viewcustomer/viewloanaccount'
// import ViewSavingsAccount from './viewcustomer/viewsavingsaccount'
// import ViewClosedAccounts from './viewcustomer/viewallclosedaccounts'
// import ViewClosedAccount from './viewcustomer/viewclosedaccount'

import UserAccountContainer from './viewuser/useraccount-container'


import DepositProductInfoContainer from './view-depositproduct/product-container'

import LoanProductInfoContainer from './view-loanproduct/product-container'

import PageNotFound from './pagenot-found'
// import AccessRestricted from './access-restriced'
import ForbiddenPage from './unauthed-page'
import unAuthedPage from './unauthed-page/un-authed'
import {authActions} from '../redux/actions/auth/auth.action';
import { clientsConstants } from '../redux/actions/clients/clients.action';
import { ClientStateConstants, DepositStateConstants, LoanStateConstants, LoanSubStateConstants } from '../redux/actions/clients/client-states-constants';
import LoanListDisplay from './loanmanagement/loan-list-display';
import AccessUsers from './administration/usermanagement/access-users';
import GroupListDisplay from './clients/group-list-display';


// var permissionsList = JSON.parse(localStorage.getItem('x-u-perm'));

function PrivateRoute({ component: Component, authed,accessRequired, ...rest }) {

    if(authed && Object.keys(authed).length>=1 ){
        //Authorization is required to access route
        let userPermissions =  JSON.parse(localStorage.getItem("x-u-perm"));
        if(userPermissions){

            let allUSerPermissions =[];//all permission codes
                userPermissions.map(eachPermission=>{
                    allUSerPermissions.push(eachPermission.permissionCode)
                })



            if(accessRequired && allUSerPermissions.indexOf(accessRequired) >-1){
                return (
                    <Route
                        {...rest}
                        render={
                            (props) => authed && Object.keys(authed).length>=1
                            ? <Component  {...rest} {...props} />
                            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
                    />
                )
            }

            if(accessRequired && allUSerPermissions.indexOf(accessRequired) === -1){
                return (
                    <Route
                        {...rest}
                        render={
                            (props) => <Redirect to={{ pathname: '/forbidden-access', state: { from: props.location } }} />}
                    />
                )
            }
            if(!accessRequired){
                return (
                    <Route
                        {...rest}
                        render={
                            (props) => authed && Object.keys(authed).length>=1
                            ? <Component  {...rest} {...props} />
                            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
                    />
                )
            }
        }else{
            return (
                <Route
                    {...rest}
                    render={
                        (props) =>  <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
                />
            )
        }
    }else{

        return (
            <Route
                {...rest}
                render={
                    (props) =>  <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
            />
        )
    }

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

                        {/* <Route exact path='/' render={(props) => <UserLogin  />} />  */}
                        <Route exact path='/' render={(props) => <LoginWrap  />} />

                        <PrivateRoute path='/profile/change-password' {...this.props} authed={this.props.user} component={ChangePassword} />
                        <PrivateRoute path='/profile/change-pin' {...this.props} authed={this.props.user} component={ChangePin} />

                        <PrivateRoute path='/dashboard' {...this.props} authed={this.props.user} component={DashboardLanding} />
                        {/* <Route exact path='/dashboard' render={(props) => <DashboardLanding {...this.props} />} />  */}

                                {/* <Route exact path='/clients' render={(props) => <ClientsManagement {...this.props} />} /> */}

                        <PrivateRoute accessRequired="bnk_create_client" exact path='/clients/new/:customertype/:custTypeid'  authed={this.props.user} component={NewClient} />
                        
                        <PrivateRoute accessRequired="bnk_create_client" exact path='/groups/new/:customertype/:custTypeid'  authed={this.props.user} component={NewGroupClient} />
                        <PrivateRoute accessRequired="bnk_create_client" exact path='/groups/new'  authed={this.props.user} component={NewGroupClient} />
                        <Route exact path='/clients/new' render={(props) => <NewClient {...this.props} />} />

                        <PrivateRoute accessRequired="bnk_edit_client" exact path='/clients/edit/:encodedkey'    authed={this.props.user} component={EditAClient} />
                        {/* <PrivateRoute path='/clients/edit/:encodedkey' exact  encodedKey={this.props.computedMatch.params.encodedkey} authed={this.props.user} component={EditAClient} /> */}
                        {/* <Route exact path='/clients/edit/:encodedkey'  render={(props) => <EditAClient encodedKey={props.match.params.encodedkey} {...this.props} />} /> */}

                       
                        
                        {/* <Route exact path='/active-clients' render={(props) => <ClientsManagement {...this.props} />} /> */}
                        {/* <Route exact path='/inactive-clients' render={(props) => <InactiveClients {...this.props} />} /> */}
                        {/* <Route exact path='/active-clients' render={(props) => <ActiveClients {...this.props} />} /> */}
                        <PrivateRoute accessRequired="bnk_view_clients"  exact path='/clients' {...this.props} authed={this.props.user} clientState={ClientStateConstants.ALL_CLIENTS} component={ClientsListDisplay}  />
                        <PrivateRoute accessRequired="bnk_view_clients"  exact path='/groups'  {...this.props} authed={this.props.user} clientState={ClientStateConstants.ALL_CLIENTS} component={GroupListDisplay}  />
                        <PrivateRoute accessRequired="bnk_view_clients" exact path='/active-clients' {...this.props} authed={this.props.user} clientState={ClientStateConstants.ACTIVE} component={ClientsListDisplay} />
                        <PrivateRoute accessRequired="bnk_view_clients" exact path='/inactive-clients' {...this.props} authed={this.props.user} clientState={ClientStateConstants.INACTIVE} component={ClientsListDisplay} />
                        <PrivateRoute accessRequired="bnk_view_clients" exact path='/clients-pending-approval' {...this.props} authed={this.props.user}  clientState={ClientStateConstants.PENDING_APPROVAL} component={ClientsListDisplay} />
                        <PrivateRoute accessRequired="bnk_view_clients" exact path='/clients-exited' {...this.props} authed={this.props.user}  clientState={ClientStateConstants.EXITED} component={ClientsListDisplay} />
                        <PrivateRoute accessRequired="bnk_view_clients" exact path='/clients-blacklisted' {...this.props} authed={this.props.user}  clientState={ClientStateConstants.BLACKLISTED} component={ClientsListDisplay} />

                    
                        {/* <Route exact path='/clients-pending-approval' render={(props) => <ClientsPendingApproval {...this.props} />} /> */}
 {/* <Route exact path='/clients-exited' render={(props) => <ClientsExited {...this.props} />} /> */}

                                           {/* <Route exact path='/clients-blacklisted' render={(props) => <ClientsBlacklisted {...this.props} />} /> */}

                        <PrivateRoute accessRequired="bnk_view_loan_accounts" exact path='/all-loans/all' {...this.props} authed={this.props.user} loanState={LoanStateConstants.ALL_LOANS} component={LoanListDisplay} />  


                        <PrivateRoute accessRequired="bnk_view_loan_accounts" exact path='/all-loans/pending' {...this.props} authed={this.props.user} loanState={LoanStateConstants.PENDING_APPROVAL} loanSubState={LoanSubStateConstants.All} component={LoanListDisplay} />  
                        <PrivateRoute accessRequired="bnk_view_loan_accounts" exact path='/all-loans/pending/pending-approval' {...this.props} authed={this.props.user} loanState={LoanStateConstants.PENDING_APPROVAL} loanSubState={LoanSubStateConstants.Pending_1stLevel_Approval} component={LoanListDisplay} />  
                        <PrivateRoute accessRequired="bnk_view_loan_accounts" exact path='/all-loans/pending/pending-management' {...this.props} authed={this.props.user} loanState={LoanStateConstants.PENDING_APPROVAL} loanSubState={LoanSubStateConstants.Pending_2ndLevel_Approval} component={LoanListDisplay} />  
                        <PrivateRoute accessRequired="bnk_view_loan_accounts" exact path='/all-loans/pending/pending-acceptance' {...this.props} authed={this.props.user} loanState={LoanStateConstants.PENDING_APPROVAL} loanSubState={LoanSubStateConstants.Pending_Client_Acceptance} component={LoanListDisplay} />  
                    
                        <PrivateRoute accessRequired="bnk_view_loan_accounts" exact path='/all-loans/approved' {...this.props} authed={this.props.user} loanState={LoanStateConstants.APPROVED} component={LoanListDisplay} />  
                        <PrivateRoute accessRequired="bnk_view_loan_accounts" exact path='/all-loans/rejected' {...this.props} authed={this.props.user} loanState={LoanStateConstants.REJECTED} component={LoanListDisplay} />  
                        <PrivateRoute accessRequired="bnk_view_loan_accounts" exact path='/all-loans/active' {...this.props} authed={this.props.user} loanState={LoanStateConstants.ACTIVE} component={LoanListDisplay} />  
                        <PrivateRoute accessRequired="bnk_view_loan_accounts" exact path='/all-loans/arrears' {...this.props} authed={this.props.user} loanState={LoanStateConstants.IN_ARREARS} component={LoanListDisplay} />  
                        <PrivateRoute accessRequired="bnk_view_loan_accounts" exact path='/all-loans/closed' {...this.props} authed={this.props.user} loanState={LoanStateConstants.CLOSED} component={LoanListDisplay} />  
                        <PrivateRoute accessRequired="bnk_view_loan_accounts" exact path='/all-loans/closed-off' {...this.props} authed={this.props.user} loanState={LoanStateConstants.CLOSED_WRITTEN_OFF} component={LoanListDisplay} />  
                        <PrivateRoute accessRequired="bnk_view_loan_accounts" exact path='/all-loans/closed-withdrawn' {...this.props} authed={this.props.user} loanState={LoanStateConstants.CLOSED_WITHDRAWN} component={LoanListDisplay} />  
                        <PrivateRoute accessRequired="bnk_view_loan_accounts" exact path='/all-loans/partial-application' {...this.props} authed={this.props.user} loanState={LoanStateConstants.PARTIAL_APPLICATION} component={LoanListDisplay} />  


                        {/* ALL:0,  
    Partial_Application:1, 
    Pending_Approval:2, 
    Approved:3, 
    REJECTED:4, 
    ACTIVE:5, 
    IN_ARREARS:6, 
    CLOSED:7,
    CLOSED_WRITTEN_OFF:8,
    DORMANT:9,
    LOCKED:10,
    MARTURED:11, */}
                        <PrivateRoute accessRequired="bnk_view_deposit_accounts" exact path='/deposits/all' {...this.props} authed={this.props.user} depositState={DepositStateConstants.ALL} component={DepositManagement} />
                        <PrivateRoute accessRequired="bnk_view_deposit_accounts" exact path='/deposits/partial-applications' {...this.props} authed={this.props.user}  depositState={DepositStateConstants.Partial_Application} component={DepositManagement} />
                        <PrivateRoute accessRequired="bnk_view_deposit_accounts" exact path='/deposits/pending-approval' {...this.props} authed={this.props.user}  depositState={DepositStateConstants.Pending_Approval} component={DepositManagement} />
                        <PrivateRoute accessRequired="bnk_view_deposit_accounts" exact path='/deposits/approved' {...this.props} authed={this.props.user}  depositState={DepositStateConstants.Approved} component={DepositManagement} />
                        <PrivateRoute accessRequired="bnk_view_deposit_accounts" exact path='/deposits/active' {...this.props} authed={this.props.user}  depositState={DepositStateConstants.ACTIVE} component={DepositManagement} />
                        <PrivateRoute accessRequired="bnk_view_deposit_accounts" exact path='/deposits/locked' {...this.props} authed={this.props.user}  depositState={DepositStateConstants.LOCKED} component={DepositManagement} />
                        <PrivateRoute accessRequired="bnk_view_deposit_accounts" exact path='/deposits/closed' {...this.props} authed={this.props.user}  depositState={DepositStateConstants.CLOSED} component={DepositManagement} />
                        <PrivateRoute accessRequired="bnk_view_deposit_accounts" exact path='/deposits/matured' {...this.props} authed={this.props.user} depositState={DepositStateConstants.MARTURED}  component={DepositManagement} />
                        <PrivateRoute accessRequired="bnk_view_deposit_accounts" exact path='/deposits/rejected' {...this.props} authed={this.props.user}  depositState={DepositStateConstants.REJECTED} component={DepositManagement} />
                  
                        {/* <Route exact path='/deposits' render={(props) => <DepositManagement {...this.props} />} /> */}


                        <PrivateRoute accessRequired="bnk_create_loan" exact path='/all-loans/newloan-account' {...this.props} authed={this.props.user} component={NewLoanAccount} />  
                        <PrivateRoute accessRequired="bnk_create_loan" exact path='/all-loans/newloan-account/:clientId' {...this.props} authed={this.props.user} component={NewLoanAccount} />  


                        <PrivateRoute accessRequired="bnk_edit_loan_account" exact path='/all-loans/:clientId/:loanId/edit' {...this.props} authed={this.props.user} component={EditALoanAccount} />  


                        <PrivateRoute accessRequired="bnk_refinance_loan_account" exact path='/all-loans/:clientId/:loanId/refinance' {...this.props} authed={this.props.user} component={RefinanceALoanAccount} />  
                        <PrivateRoute accessRequired="bnk_reschedule_loan_account" exact path='/all-loans/:clientId/:loanId/reschedule' {...this.props} authed={this.props.user} component={RescheduleALoanAccount} />  
                        
                        <PrivateRoute accessRequired="bnk_view_clients" exact path='/all-loans/:clientId' {...this.props} authed={this.props.user} component={LoanClient} />  
                        {/* <Route exact path='/all-loans/:clientId' render={(props) => <LoanClient clientId={props.match.params.clientId} {...this.props} />} /> */}

                        {/* <Route exact path='/all-loans/newloan-account' render={(props) => <NewLoanAccount {...this.props} />} /> */}


                        <PrivateRoute accessRequired="bnk_view_disbursements" exact path='/disbursements/all-items' {...this.props} authed={this.props.user} component={AllDisbursements} />
                        <PrivateRoute accessRequired="bnk_view_disbursements" exact path='/disbursements/all' {...this.props} authed={this.props.user} component={DisbursementManagement} />
                        <PrivateRoute accessRequired="bnk_initiate_disbursements" exact path='/disbursements/initiate' {...this.props} authed={this.props.user} component={InitiateDisbursement} />
                        <PrivateRoute accessRequired="bnk_view_disbursements" exact path='/disbursements/partial' {...this.props} authed={this.props.user} component={InitiatedDisbursmentBatches} />

                        <PrivateRoute accessRequired="bnk_view_disbursements" exact  path='/disbursements/all/:batchRef' {...this.props} authed={this.props.user} component={ViewADisbursmentBatch} />
                        <PrivateRoute accessRequired="bnk_view_disbursements" exact path='/disbursements/partial/:batchRef' {...this.props} authed={this.props.user} component={ViewADisbursmentBatch} />
                        <PrivateRoute accessRequired="bnk_view_disbursements" exact path='/disbursements/pending-review/:batchRef' {...this.props} authed={this.props.user} component={ViewADisbursmentBatch} />
                        <PrivateRoute accessRequired="bnk_view_disbursements" exact path='/disbursements/pending-approval/:batchRef' {...this.props} authed={this.props.user} component={ViewADisbursmentBatch} />
                        <PrivateRoute accessRequired="bnk_view_disbursements" exact path='/disbursements/pending-review' {...this.props} authed={this.props.user} component={DisbursementPendingReview} />
                        <PrivateRoute accessRequired="bnk_view_disbursements" exact path='/disbursements/pending-approval' {...this.props} authed={this.props.user} component={DisbursementPendingApproval} />
                        <PrivateRoute accessRequired="bnk_view_nip_requests" exact path='/disbursements/nip-requests' {...this.props} authed={this.props.user} component={NipRequests} />
                        <PrivateRoute accessRequired="bnk_view_nip_requests" exact path='/disbursements/nip-requests/outwards' {...this.props} authed={this.props.user} component={NipOutwardsRequests} />

                        
                        <PrivateRoute accessRequired="bnk_create_deposit" exact path='/deposits/newaccount' {...this.props} authed={this.props.user} component={NewDepositAccount} />
                        <PrivateRoute accessRequired="bnk_create_deposit" exact path='/deposits/newaccount/:clientId' {...this.props} authed={this.props.user} component={NewDepositAccount} />
                        <PrivateRoute accessRequired="bnk_view_clients" exact path='/deposits/:clientId' {...this.props} authed={this.props.user} component={DepositClient} />
                        {/* <Route exact path='/deposits/:clientId' render={(props) => <DepositClient clientId={props.match.params.clientId} {...this.props} />} /> */}


                        <PrivateRoute accessRequired="bnk_view_all_loan_schedules" exact path='/reports/loans/' {...this.props} authed={this.props.user} component={AllLoanSchedules} />
                        <PrivateRoute accessRequired="bnk_view_all_loan_schedules" exact path='/reports/loans/loans-par' {...this.props} authed={this.props.user} component={LoanPAR} />

                        <PrivateRoute accessRequired="bnk_view_all_loan_transactions" exact path='/loan-transactions' {...this.props} authed={this.props.user} component={LoanTransactionsManagement} />
                        <PrivateRoute accessRequired="bnk_view_all_loan_transactions" exact path='/loan-transactions/:accountEncodedKey' {...this.props} authed={this.props.user} component={LoanTransactionsManagement} />
                        {/* <Route exact path='/loan-transactions/:accountEncodedKey' render={(props) => <LoanAccountTransactions accountEncodedKey={props.match.params.accountEncodedKey} {...this.props} />} /> */}

                        <PrivateRoute accessRequired="bnk_view_all_deposit_transactions" exact path='/deposit-transactions' {...this.props} authed={this.props.user} component={DepositTransactionsManagement} />
                        <PrivateRoute accessRequired="bnk_view_all_deposit_transactions" exact path='/deposit-transactions/:accountEncodedKey' {...this.props} authed={this.props.user} component={DepositTransactionsManagement} />
                        {/* <Route exact path='/deposit-transactions/:accountEncodedKey' render={(props) => <DepositTransactionAccount accountEncodedKey={props.match.params.accountEncodedKey} {...this.props} />} /> */}

                        <PrivateRoute accessRequired="bnk_view_activities" exact path='/activities' {...this.props} authed={this.props.user} component={Activties} />
                        <PrivateRoute accessRequired="bnk_view_branches" exact path='/branches' {...this.props} authed={this.props.user} component={BranchesManagement} />
                        <PrivateRoute accessRequired="bnk_view_all_users" exact path='/user-management' {...this.props} authed={this.props.user} component={UserManagement} />
                        <PrivateRoute accessRequired="bnk_view_all_communications" exact path='/communications/all' {...this.props} authed={this.props.user} component={CommunicationsManagement} />
                        <PrivateRoute accessRequired="bnk_view_email_communications" exact path='/communications/emails' {...this.props} authed={this.props.user} component={EmailCommunications} />
                        <PrivateRoute accessRequired="bnk_view_sms_communications" exact path='/communications/sms' {...this.props} authed={this.props.user} component={SMSCommunications} />
                        <PrivateRoute accessRequired="bnk_view_web_hooks" exact path='/communications/webhooks' {...this.props} authed={this.props.user} component={WebhooksCommunications} />

                        <PrivateRoute accessRequired="bnk_view_charts_of_accounts" exact path='/accounts' {...this.props} authed={this.props.user} component={AccountManagement} />
                        <PrivateRoute accessRequired="bnk_view_journal_entries" exact path='/journals' {...this.props} authed={this.props.user} component={JournalEntries} />
                        <PrivateRoute accessRequired="bnk_view_trial_balance" exact path='/trial-balance-basic' {...this.props} authed={this.props.user} component={TrialBalanceBasic} />
                        <PrivateRoute accessRequired="bnk_view_trial_balance" exact path='/trial-balance' {...this.props} authed={this.props.user} component={TrialBalance} />
                        <PrivateRoute accessRequired="bnk_view_profit_and_loss" exact path='/profit-loss' {...this.props} authed={this.props.user} component={ProfitAndLoss} />
                        <PrivateRoute accessRequired="bnk_view_balance_sheet" exact path='/balancesheet' {...this.props} authed={this.props.user} component={BalanceSheet} />
                        {/* <PrivateRoute accessRequired="bnk_view_branches" exact path='/balancesheet' {...this.props} authed={this.props.user} component={BalanceSheet} />  */}

                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/platform/customer-whitelist' {...this.props} authed={this.props.user} component={ManageCustomerWhitelist} />
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/platform/company-info' {...this.props} authed={this.props.user} component={ManageCompanyInfo} />
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/platform/payroll-info' {...this.props} authed={this.props.user} component={ManageEmployeeInfo} />
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/platform/bank-info' {...this.props} authed={this.props.user} component={ManageBankInfo} />

                        {/* <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/platform/payroll-info' {...this.props} authed={this.props.user} component={Notifications} />
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/platform/bank-info' {...this.props} authed={this.props.user} component={TransactionServices} /> */}


                        {/* <PrivateRoute accessRequired="bnk_view_branches" exact path='/administration' {...this.props} authed={this.props.user} component={AdminManagement} />  */}
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/general' {...this.props} authed={this.props.user} component={GeneralOrganization} />
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/general/risk-levels' {...this.props} authed={this.props.user} component={RiskLevels} />
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/general/notifications' {...this.props} authed={this.props.user} component={Notifications} />
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/general/transaction' {...this.props} authed={this.props.user} component={TransactionServices} />


                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/general/currency' {...this.props} authed={this.props.user} component={GeneralCurrency} />
                        <PrivateRoute accessRequired="bnk_manage_transaction_channels" exact path='/administration/general/txt-channels' {...this.props} authed={this.props.user} component={GeneralTxtChannels} />
                        <PrivateRoute accessRequired="bnk_manage_transaction_channels" exact path='/administration/general/new-txt-channels' {...this.props} authed={this.props.user} component={NewTxtChannels} />
                        <PrivateRoute accessRequired="bnk_manage_customer_types" exact path='/administration/general/customer-types' {...this.props} authed={this.props.user} component={CustomerTypesAdministration} />
                        <PrivateRoute accessRequired="bnk_manage_internal_control" exact path='/administration/general/control' {...this.props} authed={this.props.user} component={GeneralInternalControl} />
                        {/* <PrivateRoute accessRequired="bnk_view_branches" exact path='/administration/general/branding' {...this.props} authed={this.props.user} component={GeneralBranding} />  */}
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/uploaddata' {...this.props} authed={this.props.user} component={UploadData} />

                        {/* <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/organization' {...this.props} authed={this.props.user} component={OrganizationBranches} /> */}
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/organization' {...this.props} authed={this.props.user} component={BranchListManagement} />
                       
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/organization/newbranch' {...this.props} authed={this.props.user} component={NewBranch} />
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/organization/editbranch/:encodedkey' {...this.props} authed={this.props.user} component={EditBranch} />
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/branch-closures' {...this.props} authed={this.props.user} component={OrganizationBranchesClosures} />
                        {/* <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/organization/branch-closures' {...this.props} authed={this.props.user} component={OrganizationBranchesClosures} /> */}
                        {/* <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/organization/branch-closures/open' {...this.props} authed={this.props.user} component={OrganizationBranchesOpen} />
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/organization/branch-closures/closed' {...this.props} authed={this.props.user} component={OrganizationBranchesClosed} /> */}
                        {/* <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/organization/centers' {...this.props} authed={this.props.user} component={OrganizationCenters} />
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/organization/new-centers' {...this.props} authed={this.props.user} component={NewCenter} />  */}
                        <PrivateRoute accessRequired="bnk_manage_sms_provider" exact path='/administration/sms' {...this.props} authed={this.props.user} component={SMSSettings} />
                        <PrivateRoute accessRequired="bnk_manage_email_provider" exact path='/administration/email' {...this.props} authed={this.props.user} component={EmailSettings} />

                        <PrivateRoute accessRequired="bnk_manage_products" exact path='/administration/products' {...this.props} authed={this.props.user} component={ProductLoans} />
                        <PrivateRoute accessRequired="bnk_manage_products" exact path='/administration/products/deposits' {...this.props} authed={this.props.user} component={ProductDeposits} />
                        <PrivateRoute accessRequired="bnk_manage_products" exact path='/administration/products/deposit/edit/:encodedKey' {...this.props} authed={this.props.user} component={EditADepositsProduct} />
                        <PrivateRoute accessRequired="bnk_manage_products" exact path='/administration/products/newdeposits-product' {...this.props} authed={this.props.user} component={NewDepositsProduct} />
                        <PrivateRoute accessRequired="bnk_manage_products" exact path='/administration/products/newloan-product' {...this.props} authed={this.props.user} component={NewLoanProduct} />
                        <PrivateRoute accessRequired="bnk_manage_products" exact path='/administration/products/loans/edit/:encodedKey' {...this.props} authed={this.props.user} component={EditLoanProduct} />

                        <PrivateRoute accessRequired="bnk_manage_role" exact path='/administration/access' {...this.props} authed={this.props.user} component={AccessRoles} />
                        {/* <PrivateRoute  exact path='/administration/access' {...this.props} authed={this.props.user} component={AccessRoles} />  */}
                        <PrivateRoute accessRequired="bnk_manage_role" exact path='/administration/access/new-role' {...this.props} authed={this.props.user} component={CreateNewRole} />
                        <PrivateRoute accessRequired="bnk_manage_role" exact path='/administration/access/edit-role/:roleId' {...this.props} authed={this.props.user} component={EditRole} />
                        {/* <PrivateRoute  exact path='/administration/access/edit-role/:roleId' {...this.props} authed={this.props.user} component={EditRole} />  */}

                        <PrivateRoute accessRequired="bnk_manage_users" exact path='/administration/access/users' {...this.props} authed={this.props.user} component={AccessUsers} />
                        <PrivateRoute accessRequired="bnk_manage_users" exact path='/administration/access/new-user' {...this.props} authed={this.props.user} component={CreateNewUser} />
                        {/* <Route accessRequired="bnk_manage_users" exact path='/administration/access/new-user' render={(props) => <CreateNewUser {...this.props} />} /> */}
                        <PrivateRoute accessRequired="bnk_manage_users" exact path='/administration/access/edit-user/:encodedKey' {...this.props} authed={this.props.user} component={EditUser} />

                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/platform' {...this.props} authed={this.props.user} component={PlatformCardProvider} />
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/platform/payroll-group' {...this.props} authed={this.props.user} component={PlatformPayrollGroup} />

                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/access/preferences' {...this.props} authed={this.props.user} component={AccessPreferences} />
                        <PrivateRoute accessRequired="bnk_manage_organisation" exact path='/administration/access/authentication' {...this.props} authed={this.props.user} component={AccessAuth} />


                        <PrivateRoute accessRequired="bnk_view_clients" path='/customer/:id' isGroupAccount={false} {...this.props} authed={this.props.user} component={CustomerAccountContainer} />
                        <PrivateRoute accessRequired="bnk_view_clients" path='/group/:id' isGroupAccount={true} {...this.props} authed={this.props.user} component={CustomerAccountContainer} />
                        <PrivateRoute accessRequired="bnk_view_all_users" path='/user/:userid' {...this.props} authed={this.props.user} component={UserAccountContainer} />
                        <PrivateRoute accessRequired="bnk_view_all_users" exact path='/my-profile' {...this.props} authed={this.props.user} component={UserAccountContainer} />
                        <PrivateRoute accessRequired="bnk_manage_products" path='/depositproduct/:productid' {...this.props} authed={this.props.user} component={DepositProductInfoContainer} />
                        <PrivateRoute accessRequired="bnk_manage_products" path='/loanproduct/:productid' {...this.props} authed={this.props.user} component={LoanProductInfoContainer} />
                        <PrivateRoute  exact path='/forbidden-access' {...this.props} authed={this.props.user} component={ForbiddenPage} />
                        <PrivateRoute  exact path='/not-found' {...this.props} authed={this.props.user} component={unAuthedPage} />
                        <PrivateRoute  exact path='/access-restricted' {...this.props} authed={this.props.user} component={unAuthedPage} />
                        <PrivateRoute exact path='/my-profile/tasks' {...this.props} authed={this.props.user} component={ViewUserTasks} />
                        <PrivateRoute exact path='/all-tasks' {...this.props} authed={this.props.user} component={ViewAllTasks} />
                      
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
