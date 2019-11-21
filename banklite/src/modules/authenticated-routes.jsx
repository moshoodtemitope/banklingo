import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import { Fragment } from "react";
import DashboardLanding from './dashboard'
import ClientsManagement from './clients'
import LoansManagement from './loanmanagement'
import DisbursementManagement from './disbursements'
import DepositManagement from './depositmanagement'
import LoanTransactions from './loantransactions'
import DepositTransactions from './deposittransactions'
import Activties from './activities'
import BranchesManagement from './branches'
import UserManagement from './usermanagement'
import CommunicationsManagement from './communications'
import AccountManagement from './accountsmanagement'
import JournalEntries from './accountsmanagement/journal-entries'
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
                        <Route exact path='/loans' render={(props) => <LoansManagement {...this.props} />} />
                        <Route exact path='/disbursements' render={(props) => <DisbursementManagement {...this.props} />} />
                        <Route exact path='/deposits' render={(props) => <DepositManagement {...this.props} />} />
                        <Route exact path='/loan-transactions' render={(props) => <LoanTransactions {...this.props} />} />
                        <Route exact path='/deposit-transactions' render={(props) => <DepositTransactions {...this.props} />} />
                        <Route exact path='/activities' render={(props) => <Activties {...this.props} />} />
                        <Route exact path='/branches' render={(props) => <BranchesManagement {...this.props} />} />
                        <Route exact path='/user-management' render={(props) => <UserManagement {...this.props} />} />
                        <Route exact path='/communications' render={(props) => <CommunicationsManagement {...this.props} />} />
                        <Route exact path='/accounts' render={(props) => <AccountManagement {...this.props} />} />
                        <Route exact path='/journals' render={(props) => <JournalEntries {...this.props} />} />
                        <Route exact path='/administration'  render={(props) => <AdminManagement {...this.props} />} />
                        <Route  render={(props) => <PageNotFound {...this.props} />} />
                    </Switch>
                    {/* <Route  path='/clients' component={ClientsManagement} /> */}
                </Fragment>

        )
    }
}


export default AuthenticatedRoutes;
