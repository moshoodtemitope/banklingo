import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { Fragment } from "react";
import DashboardLanding from './dashboard'
import ClientsManagement from './clients'
import InactiveClients from './clients/inactive'
import ActiveClients from './clients/active'
import ClientsPendingApproval from './clients/pending-approval'
import ClientsExited from './clients/clients-exited'
import ClientsBlacklisted from './clients/blacklisted'

import LoansManagement from './loanmanagement'

import DisbursementManagement from './disbursements'
import InitiateDisbursement from './disbursements/initiate-disbursements'
import DisbursementPendingApproval from './disbursements/pending-approval'
import NipRequests from './disbursements/nip-request'

import DepositManagement from './depositmanagement'
import LoanTransactions from './loantransactions'
import DepositTransactions from './deposittransactions'
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
import OrganizationCenters from './administration/organization-centers'
import NewCenter from './administration/organization-centers-new'

import SMSSettings from './administration/sms-settings'
import EmailSettings from './administration/email-settings'

import ProductLoans from './administration/products-loans'
import NewLoanProduct from './administration/products-newloans'
import EditLoanProduct from './administration/products-editloan'
import ProductDeposits from './administration/products-deposits'

import AccessRoles from './administration/access-roles'
import AccessUsers from './administration/access-users'
import AccessPreferences from './administration/access-preferences'
import AccessAuth from './administration/access-authentication'

import PageNotFound from './pagenot-found'



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
                    <Switch>
                        <Route exact path='/' render={(props) => <DashboardLanding {...this.props} />} /> 
                        <Route exact path='/dashboard' render={(props) => <DashboardLanding {...this.props} />} /> 

                        <Route exact path='/clients' render={(props) => <ClientsManagement {...this.props} />} />
                        <Route exact path='/inactive-clients' render={(props) => <InactiveClients {...this.props} />} />
                        <Route exact path='/active-clients' render={(props) => <ActiveClients {...this.props} />} />
                        <Route exact path='/clients-pending-approval' render={(props) => <ClientsPendingApproval {...this.props} />} />
                        <Route exact path='/clients-exited' render={(props) => <ClientsExited {...this.props} />} />
                        <Route exact path='/clients-blacklisted' render={(props) => <ClientsBlacklisted {...this.props} />} />

                        <Route exact path='/all-loans' render={(props) => <LoansManagement {...this.props} />} />

                        <Route exact path='/disbursements' render={(props) => <DisbursementManagement {...this.props} />} />
                        <Route  path='/disbursements-initiate' render={(props) => <InitiateDisbursement {...this.props} />} />
                        <Route  path='/disbursements-pending-approval' render={(props) => <DisbursementPendingApproval {...this.props} />} />
                        <Route  path='/disbursements-nip-requests' render={(props) => <NipRequests {...this.props} />} />

                        <Route exact path='/deposits' render={(props) => <DepositManagement {...this.props} />} />
                        <Route exact path='/loan-transactions' render={(props) => <LoanTransactions {...this.props} />} />
                        <Route exact path='/deposit-transactions' render={(props) => <DepositTransactions {...this.props} />} />
                        <Route exact path='/activities' render={(props) => <Activties {...this.props} />} />
                        <Route exact path='/branches' render={(props) => <BranchesManagement {...this.props} />} />
                        <Route exact path='/user-management' render={(props) => <UserManagement {...this.props} />} />

                        <Route exact path='/communications' render={(props) => <CommunicationsManagement {...this.props} />} />
                        <Route exact path='/communications/emails' render={(props) => <EmailCommunications {...this.props} />} />
                        <Route exact path='/communications/sms' render={(props) => <SMSCommunications {...this.props} />} />
                        <Route exact path='/communications/webhooks' render={(props) => <WebhooksCommunications {...this.props} />} />

                        <Route exact path='/accounts' render={(props) => <AccountManagement {...this.props} />} />
                        <Route exact path='/journals' render={(props) => <JournalEntries {...this.props} />} />
                        <Route exact path='/trial-balance' render={(props) => <TrialBalance {...this.props} />} />
                        <Route exact path='/profit-loss' render={(props) => <ProfitAndLoss {...this.props} />} />
                        <Route exact path='/balancesheet' render={(props) => <BalanceSheet {...this.props} />} />
                        
                        <Route exact path='/administration'  render={(props) => <AdminManagement {...this.props} />} />
                        {/* <Route exact path='/administration-generalorganization'  render={(props) => <GeneralOrganization {...this.props} />} /> */}
                        <Route exact path='/administration/general'  render={(props) => <GeneralOrganization {...this.props} />} />
                        <Route exact path='/administration/general/currency'  render={(props) => <GeneralCurrency {...this.props} />} />
                        <Route exact path='/administration/general/txt-channels'  render={(props) => <GeneralTxtChannels {...this.props} />} />
                        <Route exact path='/administration/general/new-txt-channels'  render={(props) => <NewTxtChannels {...this.props} />} />
                        <Route exact path='/administration/general/customer-types'  render={(props) => <GeneralCustomerTypes {...this.props} />} />
                        <Route exact path='/administration/general/control'  render={(props) => <GeneralInternalControl {...this.props} />} />
                        <Route exact path='/administration/general/branding'  render={(props) => <GeneralBranding {...this.props} />} />

                        
                        {/* <Route exact path='/administration-generalorganization'  render={(props) => <GeneralOrganization {...this.props} />} /> */}
                        <Route exact path='/administration/organization'  render={(props) => <OrganizationBranches {...this.props} />} />
                        <Route exact path='/administration/organization/newbranch'  render={(props) => <NewBranch {...this.props} />} />
                        <Route exact path='/administration/organization/centers'  render={(props) => <OrganizationCenters {...this.props} />} />
                        <Route exact path='/administration/organization/new-centers'  render={(props) => <NewCenter {...this.props} />} />
                        
                        <Route exact path='/administration/sms'  render={(props) => <SMSSettings {...this.props} />} />
                        <Route exact path='/administration/email'  render={(props) => <EmailSettings {...this.props} />} />
                        
                        <Route exact path='/administration/products'  render={(props) => <ProductLoans {...this.props} />} />
                        <Route exact path='/administration/products/deposits'  render={(props) => <ProductDeposits {...this.props} />} />
                        <Route exact path='/administration/products/newloan-product'  render={(props) => <NewLoanProduct {...this.props} />} />
                        <Route exact path='/administration/products/editloan-product'  render={(props) => <EditLoanProduct {...this.props} />} />
                        
                        <Route exact path='/administration/access'  render={(props) => <AccessRoles {...this.props} />} />
                        <Route exact path='/administration/access/users'  render={(props) => <AccessUsers {...this.props} />} />
                        <Route exact path='/administration/access/preferences'  render={(props) => <AccessPreferences {...this.props} />} />
                        <Route exact path='/administration/access/authentication'  render={(props) => <AccessAuth {...this.props} />} />
                        
                        {/* <Route exact path='/administration/administration-generalcurrency'  render={(props) => <GeneralCurrency {...this.props} />} /> */}
                        
                        <Route  render={(props) => <PageNotFound {...this.props} />} />
                    </Switch>
                    {/* <Route  path='/clients' component={ClientsManagement} /> */}
                </Fragment>

        )
    }
}


export default AuthenticatedRoutes;
