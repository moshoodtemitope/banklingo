import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import  TableComponent from '../../shared/elements/table'
import "./customerprofile.scss"; 
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'

import {clientsActions} from '../../redux/actions/clients/clients.action';
import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'

import { loanActions } from '../../redux/actions/loans/loans.action';
import { depositActions } from '../../redux/actions/deposits/deposits.action';
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'


import ViewCustomer from '.'
import ViewCustomerAttachments from './attachments'
import ViewCustomerComments from './comments'
import ViewCustomerCommunications from './communications'
import ViewCustomerTasks from './tasks'
import NewCustomerAccount from './newcustomer'
import EditCustomerAccount from './editcustomer'
import NewInvestmentCustomerAccount from './new-investmentcustomer'
import ViewCustomerActivites from './activities'

import ViewLoanAccount from './viewloanaccount'
import ViewSavingsAccount from './viewsavingsaccount'
import ViewClosedAccounts from './viewallclosedaccounts'
import ViewClosedLoanAccount from './viewclosedloanaccount'
import ViewClosedSavingsAccount from './viewclosedsavingsaccount'



class AccountContainer extends React.Component {
    constructor(props) {
        super(props);

        // this.clientEncodedKey = this.props.match.params.id;
        this.state={
            user:'',
        }
        

        
    }


    

    render() {
        
        let {generatedRoutes} = this.state;
        return (
             <Fragment>
                    <div className="content-wrapper">
                        
                        {this.props.children}
                        <Route  exact path='/customer/:id'  component={ViewCustomer} /> 
                        <Route  path='/createnewcustomer'                render={(props) => <NewCustomerAccount {...props} />} /> 
                        <Route  path='/create-investmentcustomer'        render={(props) => <NewInvestmentCustomerAccount {...props} />} /> 
                        <Route  path='/editcustomer'                     render={(props) => <EditCustomerAccount {...props} />}  /> 
                        <Route  path='/customer/:id/attachments'         render={(props) => <ViewCustomerAttachments {...props} />} /> 
                        <Route  path='/customer/:id/tasks'               render={(props) => <ViewCustomerTasks {...props} />} /> 
                        <Route  path='/customer/:id/activities'               render={(props) => <ViewCustomerActivites {...props} />} /> 
                        <Route  path='/customer/:id/communications'      render={(props) => <ViewCustomerCommunications {...props} />} /> 
                        <Route  path='/customer/:id/comments'            render={(props) => <ViewCustomerComments {...props} />}  /> 
                        <Route exact  path='/customer/:id/closedaccounts'      render={(props) => <ViewClosedAccounts {...props} />} /> 
                        <Route  path='/customer/:id/loanaccount/:loanid'       render={(props) => <ViewLoanAccount {...props} />} /> 
                        <Route  path='/customer/:id/savingsaccount/:accountid' render={(props) => <ViewSavingsAccount {...props} />} /> 
                        
                        {/* <Route  path='/customer/:id/closedaccounts/:accountid' render={(props) => <ViewClosedLoanAccount {...props} />} /> */}
                        <Route  path='/customer/:id/closedaccounts/loan/:accountid' render={(props) => <ViewClosedLoanAccount {...props} />} />
                        <Route  path='/customer/:id/closedaccounts/savings/:accountid' render={(props) => <ViewClosedSavingsAccount {...props} />} />
                    </div>
             </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        getAClientReducer: state.clientsReducers.getAClientReducer,
        getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        getClientLoansReducer: state.loansReducers.getClientLoansReducer,
    };
}

export default connect(mapStateToProps)(AccountContainer);