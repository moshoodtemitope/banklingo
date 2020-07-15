import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
// import  SidebarElement from '../../shared/elements/sidebar'
import "./customerprofile.scss"; 
import { numberWithCommas, getDateFromISO} from '../../shared/utils';


import {clientsActions} from '../../redux/actions/clients/clients.action';

import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'
class ViewCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.clientEncodedKey = this.props.match.params.id;
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            FullDetails:true,
            PageSize: 100,
            CurrentPage: 1,
        }
        // console.log('props are', this.props.match.params)
    }

    componentDidMount() {
        this.loadInitialCustomerData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
        
            this.clientEncodedKey = nextProps.match.params.id;
        }

    }

    loadInitialCustomerData = ()=>{
        let { PageSize, CurrentPage,FullDetails } = this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&FullDetails=${FullDetails}`;

        this.getClientActivities(this.clientEncodedKey, params);
    }


    getClientActivities = (clientEncodedKey, params)=>{
        const {dispatch} = this.props;

        dispatch(clientsActions.getAClientActivities(clientEncodedKey, params));
    }

    renderCustomerActivities =()=>{
        let getAClientActivitiesRequest = this.props.getAClientActivitiesReducer;

        if(getAClientActivitiesRequest.request_status===clientsConstants.GET_A_CLIENT_ACTIVITIES_PENDING){
            return(
                <div className="loading-text">Please wait... </div>
            )
        }


        if(getAClientActivitiesRequest.request_status===clientsConstants.GET_A_CLIENT_ACTIVITIES_SUCCESS){
            let customerActivitiesData = getAClientActivitiesRequest.request_data.response.data;
            if(customerActivitiesData.result.length>=1){
                return(
                    <div className="activities-wrap">
                        {
                            customerActivitiesData.result.map((eachActivity,  index)=>{
                                return(
                                    <div className="each-activity" key={index}>
                                        <span>
                                            {/* <NavLink to='/customer/20/savingsaccount/77339322'>Payroll - Private 2073458499</NavLink> */}
                                        </span>
                                        <span className="activity-action">{eachActivity.action}</span>
                                        <div>
                                            <span className="action-date">{eachActivity.creationDate}</span>
                                            <span className="action-by"> <NavLink to='/customer/20/savingsaccount/77339322'>{eachActivity.affectedUserName}</NavLink></span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }else{
                return(
                    <div className="activities-wrap">
                        <div>No activities to display</div>
                    </div>
                )
            }
        }



        if(getAClientActivitiesRequest.request_status===clientsConstants.GET_A_CLIENT_ACTIVITIES_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getAClientActivitiesRequest.request_data.error}</div>
            </div>
            )
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

                    let customerTypeVal = this.state.user.custTypes.filter(eachType=>eachType.id===customerDetails.clientTypeId)[0];
                    
                    return(
                        <div className="row">

                            <div className="col-sm-12">
                                <div className="middle-content">
                                    <div className="row">
                                        <div className="col-sm-8">
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
                                                                if(eachAccount.loanStateDescription!=="Rejected" && eachAccount.loanStateDescription!=="Closed Withdrawn" && eachAccount.loanStateDescription!=="Closed"){
                                                                    return(
                                                                        <tr key={index}>
                                                                            <td>{eachAccount.clientName}</td>
                                                                            <td>
                                                                            {(eachAccount.productName!==null && eachAccount.productName!=="")?
                                                                                    `${eachAccount.productName} - `:""} 
                                                                            {eachAccount.accountNumber}
                                                                            </td>
                                                                            <td>Loan</td>
                                                                            <td>{eachAccount.loanStateDescription}</td>
                                                                            <td>₦{numberWithCommas(eachAccount.loanAmount, true)}</td>
                                                                        </tr>
                                                                    ) 
                                                                }
                                                            })
                                                        }


                                                        {customerDepositAccounts.result!==null && (customerDepositAccounts.result.length>=1) &&
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
                                                        }
                                                   
                                                        {/* <tr>
                                                            <td>Payroll- Private 348046272</td>
                                                            <td>Loan</td>
                                                            <td>In Arrears</td>
                                                            <td>₦1,336,928.00</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Settlement Account 77339322</td>
                                                            <td>Deposit</td>
                                                            <td>Approved</td>
                                                            <td>-</td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="3">Total</td>
                                                            <td>₦1,336,928.00</td>
                                                        </tr> */}
                                                    </tbody>
                                                </TableComponent>
                                            </div>
                                            <div className="main-details mt-20">
                                                <div className="overview-wrap profile-overview">
                                                    <div className="each-overview">
                                                        <h6>General Information</h6>
                                                        <TableComponent classnames="striped bordered hover">

                                                            <tbody>
                                                                <tr>
                                                                    <td>Customer ID</td>
                                                                    <td>{customerDetails.clientCode}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Assigned Branch</td>
                                                                    <td>{customerDetails.branchName}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Assigned Account Officer</td>
                                                                    <td>{customerDetails.accountOfficer}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Customer Type</td>
                                                                    <td>{customerTypeVal.name}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Created</td>
                                                                    <td>{customerDetails.createdDate}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Last modified</td>
                                                                    <td>{customerDetails.lastUpdated}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Customer State</td>
                                                                    <td>{customerDetails.clientStateDescription}</td>
                                                                </tr>

                                                            </tbody>
                                                        </TableComponent>
                                                    </div>
                                                    <div className="each-overview">
                                                        <h6>Personal Information</h6>
                                                        <TableComponent classnames="striped bordered hover">

                                                            <tbody>
                                                                <tr>
                                                                    <td>Gender</td>
                                                                    <td>{customerDetails.gender}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Date Of Birth</td>
                                                                    <td>{getDateFromISO(customerDetails.dateOfBirth)} </td>
                                                                </tr>
                                                                <tr>
                                                                    <td>BVN</td>
                                                                    <td>{customerDetails.bvn}</td>
                                                                </tr>
                                                            </tbody>
                                                        </TableComponent>
                                                    </div>
                                                    <div className="each-overview">
                                                        <h6>Contact</h6>
                                                        <TableComponent classnames="striped bordered hover">

                                                            <tbody>
                                                                <tr>
                                                                    <td>Mobile</td>
                                                                    <td>{customerDetails.contact.contactMobile}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Email</td>
                                                                    <td>{customerDetails.contact.contactEmail}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Address</td>
                                                                    <td>{customerDetails.address.addressLine1},{customerDetails.address.addressState},{customerDetails.address.addressCountry}</td>
                                                                </tr>
                                                            </tbody>
                                                        </TableComponent>
                                                    </div>
                                                    <div className="each-overview">
                                                        <h6>Next of Kin</h6>
                                                        <TableComponent classnames="striped bordered hover">

                                                            <tbody>
                                                                <tr>
                                                                    <td>Name</td>
                                                                    <td>{customerDetails.nextOfKin.nextOfKinFullName}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Phone number</td>
                                                                    <td>{customerDetails.nextOfKin.nextOfKinMobileNumber}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Home address</td>
                                                                    <td>{customerDetails.nextOfKin.nextofKinHomeAddress}</td>
                                                                </tr>
                                                            </tbody>
                                                        </TableComponent>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="leftside-items">
                                                <h6>Latest Activity </h6>
                                                {this.renderCustomerActivities()}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
            }
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

export default connect(mapStateToProps)(ViewCustomer);