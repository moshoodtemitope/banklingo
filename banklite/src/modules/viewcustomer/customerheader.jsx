import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
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
// import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'

import {clientsActions} from '../../redux/actions/clients/clients.action';
import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'

import { loanActions } from '../../redux/actions/loans/loans.action';
import { depositActions } from '../../redux/actions/deposits/deposits.action';
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'

class CustomerHeading extends React.Component {
    constructor(props) {
        super(props);

        this.clientEncodedKey = this.props.match.params.id;
        this.state={
            user:'',
            generatedRoutes :{
                customer: `/customer/${this.clientEncodedKey}`,
                attachments: `/customer/${this.clientEncodedKey}/attachments`,
                activities: `/customer/${this.clientEncodedKey}/activities`,
                tasks: `/customer/${this.clientEncodedKey}/tasks`,
                communications: `/customer/${this.clientEncodedKey}/communications`,
                comments: `/customer/${this.clientEncodedKey}/comments`,
                
                allclosedaccounts: `/customer/${this.clientEncodedKey}/closedaccounts`,
            },
            showNewTask:false,
            showSetNotification:false,
            showChangeHistory:false,
            showAddField:false,
            FullDetails:true,
            PageSize: 100,
            CurrentPage: 1,

        }
        

        
    }


    componentDidMount() {
        this.loadInitialCustomerData();
    }


    loadInitialCustomerData = ()=>{
        let { PageSize, CurrentPage,FullDetails } = this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&FullDetails=${FullDetails}`;

        this.getCustomerDepositAccounts(this.clientEncodedKey, params);
        this.getCustomerLoanAccounts(this.clientEncodedKey, params);
        this.getClientInfo(this.clientEncodedKey);
    }


    getCustomerDepositAccounts = (clientEncodedKey , params)=>{
        const { dispatch } = this.props;

        dispatch(depositActions.getClientDeposits(clientEncodedKey,params));
    } 

    getCustomerLoanAccounts = (clientEncodedKey , params)=>{
        const { dispatch } = this.props;

        dispatch(loanActions.getClientLoans(clientEncodedKey,params));
    } 

    getClientInfo = (clientEncodedKey)=>{
        const {dispatch} = this.props;

        dispatch(clientsActions.getAClient(clientEncodedKey));
    }




    handleTaskClose = () => this.setState({showNewTask:false});
    
    handleTaskShow = () => this.setState({showNewTask:true});

    handleAddFieldClose = () => this.setState({showAddField:false});
    
    handleAddFieldShow = () => this.setState({showAddField:true});

    handleSetNotificationClose = () => this.setState({showSetNotification:false});
    
    handleSetNotificationShow = () => this.setState({showSetNotification:true});

    handleChangeHistoryClose = () => this.setState({showChangeHistory:false});
    
    handleChangeHistoryShow = () => this.setState({showChangeHistory:true});

    newTask = ()=>{
        const {showNewTask} = this.state;
        return(
            <Modal show={showNewTask} onHide={this.handleTaskClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>Creating Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label className="block-level">Summary</Form.Label>
                            <Form.Control type="text"  />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="block-level">Linked To</Form.Label>
                            {/* Search dropdown of staff list */}
                            <Form.Control type="text"  />
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Label className="block-level">Assigned To</Form.Label>
                                {/* Search dropdown of staff list */}
                                <Form.Control type="text"  />
                            </Col>
                            <Col className="date-wrap">
                                <Form.Label className="block-level">Due Date</Form.Label>
                                <DatePicker placeholderText="Choose entry date" selected={this.state.dob} 
                                    onChange={this.handleDatePicker}
                                    onChangeRaw={(e)=>this.handleChange(e)}
                                    dateFormat="d MMMM, yyyy"
                                    className="form-control form-control-sm"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    maxDate={new Date()}
                                />
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="debitLocation">
                            <Form.Label className="block-level">Notes</Form.Label>
                            <Form.Control as="textarea" rows="4" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="light" onClick={this.handleTaskClose}>
                        Cancel
                    </Button>
                    <Button variant="secondary">
                        Save Task
                    </Button>
                
                </Modal.Footer>
            </Modal>
        )
    }

    addFieldBox = ()=>{
        const {showAddField} = this.state;
        return(
            <Modal show={showAddField} onHide={this.handleAddFieldClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>Add Field</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label className="block-level">Field Set</Form.Label>
                            {/* Search dropdown of field items */}
                            <Form.Control type="text"  />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="block-level">Field Name</Form.Label>
                            {/* Search dropdown of field names */}
                            <Form.Control type="text"  />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="light" onClick={this.handleAddFieldClose}>
                        Cancel
                    </Button>
                    <Button variant="secondary">
                        Add Field
                    </Button>
                
                </Modal.Footer>
            </Modal>
        )
    }

    setNotificationBox = ()=>{
        const {showSetNotification} = this.state;
        return(
            <Modal show={showSetNotification} onHide={this.handleSetNotificationClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>Notification Requests</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="checkbox-wrap">
                            <input type="checkbox" name="" id="pick-2" disabled checked />
                            <label htmlFor="pick-2">Loan Account Rejection (Email)</label>
                        </div>
                        <div className="checkbox-wrap">
                            <input type="checkbox" name="" id="pick-3" disabled checked />
                            <label htmlFor="pick-3">Account In Arrears (SMS)</label>
                        </div>
                        <div className="checkbox-wrap">
                            <input type="checkbox" name="" id="pick-4" disabled checked />
                            <label htmlFor="pick-4">Loan Account Refinanced (Web Hook)</label>
                        </div>
                        <div className="checkbox-wrap">
                            <input type="checkbox" name="" id="pick-5"  checked />
                            <label htmlFor="pick-5">Loan Disbursement (Web Hook)</label>
                        </div>
                        <div className="checkbox-wrap">
                            <input type="checkbox" name="" id="pick-6"  checked />
                            <label htmlFor="pick-6">Loan Account Created (SMS)</label>
                        </div>
                        <div className="checkbox-wrap">
                            <input type="checkbox" name="" id="pick-7"  checked disabled />
                            <label htmlFor="pick-7">Unpaid Repayment Due (Email)</label>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="light" onClick={this.handleSetNotificationClose}>
                        Cancel
                    </Button>
                    <Button variant="secondary">
                        Save Changes
                    </Button>
                
                </Modal.Footer>
            </Modal>
        )
    }

    changeHistoryBox = ()=>{
        const {showChangeHistory} = this.state;
        return(
            <Modal show={showChangeHistory} onHide={this.handleChangeHistoryClose} size="lg" centered="true" dialogClassName="modal-45w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>History Change Log</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="select-wrap w-40">
                            <label>Changed Fields</label>
                            <select className="form-control form-control-sm w-20" name="" id="">
                                <option value="">All</option>
                            </select>
                        </div>
                        
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>Change</th>
                                    <th>Original Value</th>
                                    <th>New Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>Employer</p>
                                        <small>Daniel Ugheghe</small>
                                        <small>11-09-2019 15:20:24</small>
                                    </td>
                                    <td></td>
                                    <td>ADMINISTRATIVE STAFF COLLEGE OF NIGERIA</td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Employer Category</p>
                                        <small>API</small>
                                        <small>11-09-2019 15:20:24</small>
                                    </td>
                                    <td>-</td>
                                    <td>GENERAL</td>
                                </tr>
                            </tbody>
                        </TableComponent>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="light" onClick={this.handleChangeHistoryClose}>
                        Cancel
                    </Button>
                    <Button variant="secondary">
                        Save Changes
                    </Button>
                
                </Modal.Footer>
            </Modal>
        )
    }

    renderHeadingCtas =()=>{

        return(
            <div className="heading-ctas">
                <ul className="nav">
                    <li>
                        <Button size="sm" onClick={this.handleTaskShow}>New Task</Button>
                    </li>
                    <li>
                        <DropdownButton
                            size="sm"
                            title="New Acccount"
                            key="inActiveCurrency"
                            className="customone"
                            alignRight
                        >
                            <NavLink className="dropdown-item" to='/all-loans/newloan-account'>New Loan Account</NavLink>
                            <NavLink className="dropdown-item" to='/deposits/newaccount'>New Deposit Account</NavLink>
                            {/* <Dropdown.Item eventKey="1" onClick={this.handleShow}>New Deposit Account</Dropdown.Item> */}
                            {/* <Dropdown.Item eventKey="1">New Credit Arrangement</Dropdown.Item> */}
                        </DropdownButton>
                    </li>
                    <li>
                        <Button size="sm">
                            <NavLink to='/editcustomer'>Edit</NavLink>
                        </Button>
                    </li>
                    <li>
                        <DropdownButton
                            size="sm"
                            title="More"
                            key="inActiveCurrency"
                            className="customone"
                            alignRight
                        >
                            <Dropdown.Item eventKey="1" onClick={this.handleAddFieldShow}>Add Field</Dropdown.Item>
                            <Dropdown.Item eventKey="1" onClick={this.handleSetNotificationShow}>Set Notifications</Dropdown.Item>
                            <Dropdown.Item eventKey="1" onClick={this.handleChangeHistoryShow}>View Change History</Dropdown.Item>
                            <Dropdown.Item eventKey="1">Blacklist Customer</Dropdown.Item>
                        </DropdownButton>
                    </li>
                </ul>
            </div>
        )
    }
    renderLoanAccountsNav = (loanAccounts)=>{
        return(
            loanAccounts.result.map((eachLoanAccount,  index)=>{
                return(
                    <li key={index}>
                        <NavLink to={`/customer/${this.clientEncodedKey}/loanaccount/${eachLoanAccount.encodedKey}`}>
                        {(eachLoanAccount.productName!==null && eachLoanAccount.productName!=="")?
                                    `${eachLoanAccount.productName} - `:""}
                            {eachLoanAccount.accountNumber}
                        </NavLink>
                    </li>
                )
            })
        )
    }

    renderDepositAccountsNav = (savingsAccounts)=>{
        return(
            savingsAccounts.result.map((eachDepositAccount,  index)=>{
                if(eachDepositAccount.accountNumber!=="" && eachDepositAccount.accountNumber!==null){
                    return(
                        <li key={index}>
                            <NavLink to={`/customer/${this.clientEncodedKey}/savingsaccount/${eachDepositAccount.encodedKey}`}>
                            {(eachDepositAccount.productName!==null && eachDepositAccount.productName!=="")?
                                        `${eachDepositAccount.productName} - `:""}
                                {eachDepositAccount.accountNumber}
                            </NavLink>
                        </li>
                    )
                }
            })
        )
    }

    renderSubMenu = (loanAccounts, savingsAccounts)=>{
        let {generatedRoutes} = this.state;
        return(
            <div className="module-submenu">
                <div className="content-container">
                    <ul className="nav">
                        <li>
                            <NavLink exact to={generatedRoutes.customer}>Overview</NavLink>
                        </li>
                        {this.renderLoanAccountsNav(loanAccounts)}
                        {this.renderDepositAccountsNav(savingsAccounts)}
                        <li>
                            <NavLink to={generatedRoutes.activities}>Activities</NavLink>
                        </li>
                        <li>
                            <NavLink to={generatedRoutes.attachments}>Attachments</NavLink>
                        </li>
                        <li>
                            <NavLink to={generatedRoutes.tasks}>Tasks</NavLink>
                        </li>
                        <li>
                            <NavLink to={generatedRoutes.communications}>Communications</NavLink>
                        </li>
                        <li>
                            <NavLink to={generatedRoutes.comments}>Comments</NavLink>
                        </li>
                    </ul>
                    
                </div>
            </div>
        )
    }

    renderCustomerName =(customerDetails)=>{
        return(
            <div className="content-container">
                                    
                <div className="row">
                    <div className="col-sm-12">
                        <div className="">
                            <h2>
                                {(customerDetails.firstName!==null && customerDetails.firstName!=="")?
                                    customerDetails.firstName:""}&nbsp;
                                {(customerDetails.lastName!==null && customerDetails.lastName!=="")?
                                customerDetails.lastName:""}&nbsp;
                                {(customerDetails.middleName!==null && customerDetails.middleName!=="")?
                                customerDetails.middleName:""}
                                
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderCustomerHeading = ()=>{
        let getAClientRequest = this.props.getAClientReducer,
            getClientLoansRequest = this.props.getClientLoansReducer,
            getClientDepositsRequest = this.props.getClientDepositsReducer;


        if(getAClientRequest.request_status===clientsConstants.GET_A_CLIENT_PENDING
            || getClientLoansRequest.request_status ===loanAndDepositsConstants.GET_CLIENTLOANS_PENDING
            ||getClientDepositsRequest.request_status ===loanAndDepositsConstants.GET_CLIENTDEPOSITS_PENDING){

            return(
                <div className="loading-text">Please wait... </div>
            )
        }

        if(getAClientRequest.request_status===clientsConstants.GET_A_CLIENT_SUCCESS
            &&  getClientLoansRequest.request_status ===loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS
            && getClientDepositsRequest.request_status ===loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS){
                
                // console.log("dsdsdsdsd", getAClientRequest);
                let customerDetails = getAClientRequest.request_data.response.data;
                let   customerLoanAccounts = getClientLoansRequest.request_data.response.data;
                let    customerDepositAccounts = getClientDepositsRequest.request_data.response.data;

                   
            return(
                <div>
                    {this.newTask()}
                    {this.addFieldBox()}
                    {this.setNotificationBox()}
                    {this.changeHistoryBox()}
                    <div className="module-heading">
                        <div className="module-title">
                            {this.renderHeadingCtas()}
                            {this.renderCustomerName(customerDetails)}
                        </div>
                        {this.renderSubMenu(customerLoanAccounts, customerDepositAccounts)}
                    </div>
                </div>
            )
        }

    }
    

    render() {
        
        let {generatedRoutes} = this.state;
        return (
            // <Fragment>
            //     {/* <InnerPageContainer {...this.props}> */}
                    <div className="content-wrapper">
                        {this.renderCustomerHeading()} 
                        {/* {this.newTask()}
                        {this.addFieldBox()}
                        {this.setNotificationBox()}
                        {this.changeHistoryBox()}
                        {this.renderCustomerHeading()} */}
                        {/* <div className="module-heading">
                            <div className="module-title">
                                {this.renderHeadingCtas()}
                                {this.renderCustomerName()}
                            </div>
                            {this.renderSubMenu()}
                        </div> */}
                    </div>
            //     {/* </InnerPageContainer> */}
            // </Fragment>
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

export default connect(mapStateToProps)(CustomerHeading);