import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'
// import Tabs from 'react-bootstrap/Tabs'
// import Tab from 'react-bootstrap/Tab'
// import Nav from 'react-bootstrap/Nav'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
// import  SidebarElement from '../../shared/elements/sidebar'
// import "./administration.scss"; 
import { numberWithCommas, getDateFromISO} from '../../shared/utils';
import "./customerprofile.scss"; 
// import  SidebarElement from '../../shared/elements/sidebar'
// import "./administration.scss"; 
import {clientsActions} from '../../redux/actions/clients/clients.action';

import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'
class ViewClosedAccounts extends React.Component {
    constructor(props) {
        super(props);
        this.clientEncodedKey = this.props.match.params.id;
        this.state={
            user:''
            
        }

        
    }

    renderPage = ()=>{
        let getAClientRequest = this.props.getAClientReducer,
            getClientLoansRequest = this.props.getClientLoansReducer,
            getClientDepositsRequest = this.props.getClientDepositsReducer;

            if(getAClientRequest.request_status===clientsConstants.GET_A_CLIENT_SUCCESS
                &&  getClientLoansRequest.request_status ===loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS
                && getClientDepositsRequest.request_status ===loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS){

                    let customerDetails = getAClientRequest.request_data.response.data;
                    let   customerLoanAccounts = getClientLoansRequest.request_data.response.data;
                    let   customerDepositAccounts = getClientDepositsRequest.request_data.response.data;

                    
                    
                    return(
                        <div className="row">

                            <div className="col-sm-12">
                                <div className="middle-content">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="main-details">
                                                <TableComponent classnames="striped bordered hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Account Name</th>
                                                            <th>Product</th>
                                                            <th>Type</th>
                                                            <th>State</th>
                                                            <th>Balance</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {customerLoanAccounts.result!==null && (customerLoanAccounts.result.length>=1) &&
                                                            customerLoanAccounts.result.map((eachAccount, index)=>{
                                                                if(eachAccount.loanStateDescription==="Rejected" || eachAccount.loanStateDescription==="Closed Withdrawn" || eachAccount.loanStateDescription==="Closed"){
                                                                    return(
                                                                        <tr key={index}>
                                                                            <td>{eachAccount.clientName}</td>
                                                                            <td>
                                                                            <NavLink exact to={`/customer/${this.clientEncodedKey}/closedaccounts/${eachAccount.encodedKey}`}>
                                                                                {(eachAccount.productName!==null && eachAccount.productName!=="")?
                                                                                        `${eachAccount.productName} - `:""} 
                                                                                {eachAccount.accountNumber}
                                                                            </NavLink>
                                                                            </td>
                                                                            <td>Loan</td>
                                                                            <td>{eachAccount.loanStateDescription}</td>
                                                                            <td>₦{numberWithCommas(eachAccount.loanAmount, true)}</td>
                                                                        </tr>
                                                                    ) 
                                                                }
                                                            })
                                                        }


                                                        {/* {customerDepositAccounts.result!==null && (customerDepositAccounts.result.length>=1) &&
                                                            customerDepositAccounts.result.map((eachAccount, index)=>{
                                                               return(
                                                                <tr key={index}>
                                                                    <td>{eachAccount.accountHolderName}</td>
                                                                    <td>
                                                                    {(eachAccount.productName!==null && eachAccount.productName!=="")?
                                                                            `${eachAccount.productName} - `:""} 
                                                                    {eachAccount.accountNumber}
                                                                    </td>
                                                                    <td>Deposit</td>
                                                                    <td>{eachAccount.accountStateDescription}</td>
                                                                    <td>₦{eachAccount.depositBalance}</td>
                                                                </tr>
                                                               ) 
                                                            })
                                                        } */}
                                                   
                                                    </tbody>
                                                </TableComponent>
                                            </div>
                                            
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
            }
    }
    renderClosedAccounts = ()=>{
        return (
            <div className="row">

                <div className="col-sm-12">
                    <div className="middle-content">
                        <div className="customerprofile-tabs">
                            <div className="closedaccounts">
                                <div className="amounts-wrap w-65">
                                    <div className="eachamount">
                                        <h6>Max Loan Size</h6>
                                        <div className="amounttext">₦205,800.00</div>
                                    </div>
                                    <div className="eachamount">
                                        <h6>On Time Repayment Rate</h6>
                                        <div className="amounttext">0.00%</div>
                                    </div>
                                </div>
                                <div>
                                    <h6>General</h6>
                                    <TableComponent classnames="striped bordered hover">
                                        <thead>
                                            <th>Account </th>
                                            <th>Account</th>
                                            <th>On Time Repayment Rate</th>
                                            <th>Closure Date</th>
                                            <th>Closure Reason</th>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <NavLink to="/customer/3223/closedaccounts/4384393">
                                                        2001014672 - MoneyPal Regular
                                                                            </NavLink>
                                                </td>
                                                <td>₦205,800.00</td>
                                                <td>0.00%</td>
                                                <td>18-02-2019</td>
                                                <td>Written Off</td>
                                            </tr>
                                        </tbody>
                                    </TableComponent>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
    

    render() {
        
        return (
            <Fragment>
                {/* <InnerPageContainer {...this.props}> */}
                    <div className="content-wrapper">
                        {/* <CustomerHeading {...this.props}/> */}
                        <div className="module-content">
                                <div className="content-container">
                                    {this.renderPage()}
                                </div>
                            </div>
                    </div>
                {/* </InnerPageContainer> */}
            </Fragment>
        );
    }
}
function mapStateToProps(state) {
    return {
        getAClientReducer: state.clientsReducers.getAClientReducer,
        getAClientActivitiesReducer: state.clientsReducers.getAClientActivitiesReducer,
        getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        getClientLoansReducer: state.loansReducers.getClientLoansReducer,
    };
}

export default connect(mapStateToProps)(ViewClosedAccounts);