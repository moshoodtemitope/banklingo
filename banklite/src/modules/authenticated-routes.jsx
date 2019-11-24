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
                        <Route exact path='/dashboard' render={(props) => <DashboardLanding {...this.props} />} /> 

                        <Route exact path='/clients' render={(props) => <ClientsManagement {...this.props} />} />
                        <Route exact path='/inactive-clients' render={(props) => <InactiveClients {...this.props} />} />
                        <Route exact path='/active-clients' render={(props) => <ActiveClients {...this.props} />} />
                        <Route exact path='/clients-pending-approval' render={(props) => <ClientsPendingApproval {...this.props} />} />
                        <Route exact path='/clients-exited' render={(props) => <ClientsExited {...this.props} />} />
                        <Route exact path='/clients-blacklisted' render={(props) => <ClientsBlacklisted {...this.props} />} />

                        <Route exact path='/all-loans' render={(props) => <LoansManagement {...this.props} />} />
                        <Route exact path='/disbursements' render={(props) => <DisbursementManagement {...this.props} />} />
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
                        <Route  render={(props) => <PageNotFound {...this.props} />} />
                    </Switch>
                    {/* <Route  path='/clients' component={ClientsManagement} /> */}
                </Fragment>

        )
    }
}


export default AuthenticatedRoutes;
