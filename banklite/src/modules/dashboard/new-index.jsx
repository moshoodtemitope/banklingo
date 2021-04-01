import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import { NavLink} from 'react-router-dom';
import ListIco from '../../assets/img/list.svg';
import AddIco from '../../assets/img/addnew.svg';
import InfoIco from '../../assets/img/info.svg';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import { numberWithCommas} from '../../shared/utils';
import { dashboardActions } from '../../redux/actions/dashboard/dashboard.action';
import { dashboardConstants } from '../../redux/actiontypes/dashboard/dashboard.constants'

import "./dashboard.scss"; 
import { Form } from "react-bootstrap";
class DashboardLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize: 100,
            CurrentPage: 1,
            defaultOptions:null,
            selectedCustomer:"",
        }

        
    }

    componentDidMount() {
        this.loadInitialData();
    }

    loadInitialData = () => {
        this.getDashboardData();
        this.getDashboardActivities();
    }

    getDashboardData = () => {
        const { dispatch } = this.props;

        dispatch(dashboardActions.getDashboardData());
    }

    getDashboardActivities = ()=>{
        const {dispatch} = this.props;

        let { PageSize, CurrentPage } = this.state;

        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;

        dispatch(dashboardActions.getLoggedInUserActivitiesData(params));
    }

    renderDashboardStats(){
        let getDashboardStatsRequest = this.props.getDashboardStats;

        switch (getDashboardStatsRequest.request_status) {
            case (dashboardConstants.GET_DASHOBOARD_DATA_PENDING):
                return (
                    <div className="loading-content">
                        <div className="loading-text">Please wait... </div>
                        
                        
                    </div>
                )

            case (dashboardConstants.GET_DASHOBOARD_DATA_SUCCESS):
                let allDashboardStat = getDashboardStatsRequest.request_data.response.data;
                if(allDashboardStat !== undefined){
                    // console.log("-----",allDashboardStat);
                    return (
                        <div className="all-stats-wrap">
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{numberWithCommas(allDashboardStat.activeCustomers)}</h4>
                                    <span className="stat-text">Active Customers</span>
                                </div>
                            </div>
                            {/* <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{allDashboardStat.activeCustomers}</h4>
                                    <span className="stat-text">Number Of Groups</span>
                                </div>
                            </div> */}
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{numberWithCommas(allDashboardStat.loansAwaitingApproval)}</h4>
                                    <span className="stat-text">Loans Awaiting Approval</span>
                                </div>
                            </div>
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{numberWithCommas(allDashboardStat.totalDeposits, true)}</h4>
                                    <span className="stat-text">Total Deposits</span>
                                </div>
                            </div>
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{numberWithCommas(allDashboardStat.activeSavings)}</h4>
                                    <span className="stat-text">Active Savings</span>
                                </div>
                            </div>
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{numberWithCommas(allDashboardStat.users)}</h4>
                                    <span className="stat-text">Users</span>
                                </div>
                            </div>
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{numberWithCommas(allDashboardStat.totalLoanPortfolio)}</h4>
                                    <span className="stat-text">Total Loan Portfolio</span>
                                </div>
                            </div>
                            {/* <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">0.00</h4>
                                    <span className="stat-text">Total Overdrafts</span>
                                </div>
                            </div>
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">1,475,235,576.64</h4>
                                    <span className="stat-text">Gross Loan Portfolio</span>
                                </div>
                            </div>
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">99.89%</h4>
                                    <span className="stat-text">PAR > 30 Days</span>
                                </div>
                            </div> */}
                        </div>
                    )
                }else {
                    return null;
                }

            case (dashboardConstants.GET_DASHOBOARD_DATA_FAILURE):
                return (
                    <div className="loading-content errormsg">
                        <div>{getDashboardStatsRequest.request_data.error}</div>
                    </div>
                )
            default:
                return null;
        }
    }

    renderLoggedInUserActivities =()=>{
        let getLoggedInUserActivitiesRequest = this.props.getLoggedInUserActivitiesReducer;

        if(getLoggedInUserActivitiesRequest.request_status===dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_PENDING){
            return(
                <div className="loading-text">Please wait... </div>
            )
        }


        if(getLoggedInUserActivitiesRequest.request_status===dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_SUCCESS){
            let customerActivitiesData = getLoggedInUserActivitiesRequest.request_data.response.data;
            if(customerActivitiesData.result.length>=1){
                return(
                    <div className="activities-wrap">
                        {
                            customerActivitiesData.result.map((eachActivity,  index)=>{
                                return(
                                    <div className="each-activity">
                                        <span>
                                            <NavLink to={`/customer/${eachActivity.affectedCustomerEncodedKey}`}>{eachActivity.affectedCustomerName}</NavLink>
                                        </span>
                                        <span className="activity-action">
                                            {eachActivity.action} </span>
                                        <div>
                                            <span className="action-date">{eachActivity.creationDate}</span>
                                            {/* <span className="action-by"> <NavLink to='/customer/20/savingsaccount/77339322'>{eachActivity.affectedUserName}</NavLink></span> */}
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



        if(getLoggedInUserActivitiesRequest.request_status===dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getLoggedInUserActivitiesRequest.request_data.error}</div>
            </div>
            )
        }
    }

    loadSearchResults = (inputValue, callback) => {
        return this.getSearchedCustomerResults(inputValue)
                .then(()=>{
                    if(this.props.searchForCustomerReducer.request_status===dashboardConstants.SEARCH_FOR_CUSTOMER_SUCCESS){
                        let searchResults = this.props.searchForCustomerReducer.request_data.response.data;
                        this.setState({defaultOptions:searchResults })
                        return searchResults;
                    }
                })
    }

    


    getSearchedCustomerResults = async (inputValue)=> {
        const {dispatch} = this.props;

        if (!inputValue || inputValue.length===0) {
          return null;
        }
       

         await dispatch(dashboardActions.searchForCustomer(inputValue));

        
    }

    //Search Customer
    handleSearchCustomerChange =(inputValue)=>{
        const customerSearchText = inputValue.replace(/\W/g, '');

        this.setState({customerSearchText})

    }

    handleSelectedCustomer =(inputValue)=>{
        

        this.setState({selectedCustomer: inputValue})
        
    }

    renderDashboardWrap = () => {
        let allTxtn =[
            {label: "Repayment", value:1},
            {label: "Deposit", value:2},
            {label: "Withdrawal", value:3}
        ];
        let {
            selectedCustomer,
            defaultOptions} = this.state;
        return (
            <div className="dashboard-container">
                <div className="dashboard-section fullheight">
                    <div className="each-card">
                        <div className="each-card-heading">
                            <h4>Your Task</h4>
                            <div className="card-actions">
                                <div className="each-cardaction">
                                    <div className="cardaction-ico">
                                        <img src={AddIco} alt="" />
                                    </div>
                                    <div className="cardaction-txt">New Task</div>
                                </div>
                                <div className="each-cardaction">
                                    <div className="cardaction-ico">
                                        <img src={ListIco} alt="" />
                                    </div>
                                    <div className="cardaction-txt">All Tasks</div>
                                </div>
                            </div>
                        </div>
                        <div className="each-card-content">
                            <div className="task-stats">
                                <div className="each-task-stat">
                                    <h4>0</h4>
                                    <div className="stat-xtxt">OVERDUE</div>
                                </div>
                                <div className="each-task-stat">
                                    <h4>0</h4>
                                    <div className="stat-xtxt">DUE TODAY</div>
                                </div>
                                <div className="each-task-stat">
                                    <h4>0</h4>
                                    <div className="stat-xtxt">UPCOMING</div>
                                </div>
                            </div>
                            <div className="task-stat-msg">You don't have any tasks due at the moment</div>
                        </div>
                    </div>
                    <div className="each-card mt-20">
                        <div className="each-card-heading">
                            <h4>Indicators</h4>
                        </div>
                        <div className="each-card-content">
                            <div className="all-indicators">
                                <div className="each-indicator">
                                    <div>
                                        <h4>56,090.09</h4>
                                        <div className="indicator-txt">Active Customers</div>
                                    </div>
                                </div>
                                <div className="each-indicator">
                                    <div>
                                        <h4>56</h4>
                                        <div className="indicator-txt">Number of Groups</div>
                                    </div>
                                </div>
                                <div className="each-indicator">
                                    <div>
                                        <h4>322</h4>
                                        <div className="indicator-txt">Loans Awaiting Approval</div>
                                    </div>
                                </div>
                                <div className="each-indicator">
                                    <div>
                                        <h4>232.22</h4>
                                        <div className="indicator-txt">Total deposit</div>
                                    </div>
                                </div>
                                <div className="each-indicator">
                                    <div>
                                        <h4>930</h4>
                                        <div className="indicator-txt">Overdrafts</div>
                                    </div>
                                </div>
                                <div className="each-indicator">
                                    <div>
                                        <h4>19022.23</h4>
                                        <div className="indicator-txt">Gross loan portfolio</div>
                                    </div>
                                </div>
                                <div className="each-indicator">
                                    <div>
                                        <h4>97397.30</h4>
                                        <div className="indicator-txt">PAR&gt;30 Days</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="each-card mt-20">
                        <div className="each-card-heading">
                            <h4>Latest Activity</h4>
                        </div>
                        <div className="each-card-content">
                            <div className="all-activity-items">
                                <div className="each-activity-item">
                                    <div className="activity-icon">
                                        <img src={InfoIco} alt="" />
                                    </div>
                                    <div className="activity-wrap">
                                        <div className="action-info">
                                            <span className="username">Innocent Orji</span>
                                            <span className="activity-item">logged In</span>
                                        </div>
                                        <div className="timing">
                                            <span>1 hr ago</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="each-activity-item">
                                    <div className="activity-icon">
                                        <img src={InfoIco} alt="" />
                                    </div>
                                    <div className="activity-wrap">
                                        <div className="action-info">
                                            <span className="username">Innocent Orji</span>
                                            <span className="activity-item">logged In</span>
                                        </div>
                                        <div className="timing">
                                            <span>1 hr ago</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="each-activity-item">
                                    <div className="activity-icon">
                                        <img src={InfoIco} alt="" />
                                    </div>
                                    <div className="activity-wrap">
                                        <div className="action-info">
                                            <span className="username">Innocent Orji</span>
                                            <span className="activity-item">logged In</span>
                                        </div>
                                        <div className="timing">
                                            <span>1 hr ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-section">
                    <div className="each-card">
                        <div className="each-card-heading">
                            <h4>Tellering</h4>
                            <div className="card-actions">
                                <div className="each-cardaction">
                                    <div className="cardaction-ico">
                                        <img src={AddIco} alt="" />
                                    </div>
                                    <div className="cardaction-txt">New Task</div>
                                </div>
                                <div className="each-cardaction">
                                    <div className="cardaction-ico">
                                        <img src={ListIco} alt="" />
                                    </div>
                                    <div className="cardaction-txt">All Tasks</div>
                                </div>
                            </div>
                        </div>
                        <div className="each-card-content">
                            <div className="tellering-section">
                                <div className="tiller-record-form">
                                    <Formik
                                        initialValues={{
                                            clientEncodedKey: '',
                                            accountNumber: '',
                                            txtnType: '',
                                            amount: '',
                                        }}
                                        // validationSchema={currencyValidationSchema}
                                        onSubmit={(values, { resetForm }) => {
                                            // same shape as initial values





                                        }}
                                    >
                                        {({ handleSubmit,
                                            handleChange,
                                            handleBlur,
                                            resetForm,
                                            values,
                                            touched,
                                            isValid,
                                            errors, }) => (
                                            <Form noValidate
                                                onSubmit={handleSubmit}>
                                                <Form.Group>
                                                    <div className="withasync">
                                                        <Form.Label className="block-level">Customer</Form.Label>
                                                        <div>
                                                            <div>
                                                                <AsyncSelect
                                                                    cacheOptions
                                                                    value={selectedCustomer}
                                                                    getOptionLabel={e => e.clientName}
                                                                    getOptionValue={e => e.clientEncodedKey}
                                                                    loadOptions={this.loadSearchResults}
                                                                    defaultOptions={defaultOptions}
                                                                    name="clientEncodedKey"
                                                                    placeholder="Enter customer name"
                                                                    className={errors.clientEncodedKey && touched.clientEncodedKey ? "is-invalid" : null}
                                                                    // onChange={(e)=> {
                                                                    //     setFieldValue("clientEncodedKey", )
                                                                    //     this.handleSelectedCustomer(e.target.value)

                                                                    // }}
                                                                    onChange={this.handleSelectedCustomer}
                                                                    // onChange={(selectedCustomer) => {
                                                                    //     this.setState({ selectedCustomer });
                                                                    //     errors.clientEncodedKey = null
                                                                    //     values.clientEncodedKey = selectedCustomer.value
                                                                    //     setFieldValue('clientEncodedKey', selectedCustomer.value);
                                                                    // }}
                                                                    onInputChange={this.handleSearchCustomerChange}
                                                                />


                                                                {errors.clientEncodedKey && touched.clientEncodedKey ? (
                                                                    <span className="invalid-feedback">{errors.clientEncodedKey}</span>
                                                                ) : null}
                                                            </div>
                                                            <span>View Customer</span>
                                                        </div>
                                                    </div>
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label className="block-level">Account</Form.Label>
                                                    <div className="txtn-wrap">
                                                        <div className="select-drop foraccount">
                                                            <Select
                                                                options={allTxtn}

                                                                onChange={(selectedTxtn) => {
                                                                    this.setState({ selectedTxtn });
                                                                    errors.txtnType = null
                                                                    values.txtnType = selectedTxtn.value
                                                                }}
                                                                className={errors.txtnType && touched.txtnType ? "is-invalid" : null}
                                                                name="txtnType"
                                                                required
                                                            />

                                                            {errors.txtnType && touched.txtnType ? (
                                                                <span className="invalid-feedback">{errors.txtnType}</span>
                                                            ) : null}
                                                        </div>
                                                        <span>View Account</span>
                                                    </div>
                                                    
                                                </Form.Group>
                                                <Form.Group>
                                                    <Form.Label className="block-level">Transaction</Form.Label>
                                                   
                                                    <div className="select-drop pr-10">
                                                        <Select
                                                            options={allTxtn}

                                                            onChange={(selectedTxtn) => {
                                                                this.setState({ selectedTxtn });
                                                                errors.txtnType = null
                                                                values.txtnType = selectedTxtn.value
                                                            }}
                                                            className={errors.txtnType && touched.txtnType ? "is-invalid" : null}
                                                            name="txtnType"
                                                            required
                                                        />

                                                        {errors.txtnType && touched.txtnType ? (
                                                            <span className="invalid-feedback">{errors.txtnType}</span>
                                                        ) : null}
                                                    </div>
                                                        
                                                </Form.Group>
                                                <Form.Group className="mr-10">
                                                    <Form.Label className="block-level">Amount</Form.Label>
                                                    <Form.Control type="text"
                                                        name="amount"
                                                        value={values.amount}
                                                        onChange={handleChange}
                                                        className={errors.amount && touched.amount ? "is-invalid" : null}
                                                        required />

                                                    {errors.amount && touched.amount ? (
                                                        <span className="invalid-feedback">{errors.amount}</span>
                                                    ) : null}
                                                </Form.Group>
                                               
                                                <div className="mr-10">
                                                    <div className="footer-with-cta">
                                                        <Button
                                                            type="submit"
                                                            // disabled={adminCreateNewCurrencyRequest.is_request_processing}
                                                            >
                                                                Post transaction
                                                            {/* {adminCreateNewCurrencyRequest.is_request_processing ? "Please wait..." : "Save"} */}
                                                        </Button>
                                                        <Button variant="secondary"  onClick={this.handleClose}>Clear</Button>
                                                    </div>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                            <div className="tellering-section">
                                <div className="till-details">
                                    <div className="each-card mt-20">
                                        <div className="each-card-heading">
                                            <h4>Till Details</h4>
                                        </div>
                                        <div className="each-card-content">
                                            <div className="all-indicators">
                                                <div className="each-indicator">
                                                    <div>
                                                        <h4>BEA56G</h4>
                                                        <div className="indicator-txt">Till ID</div>
                                                    </div>
                                                </div>
                                                <div className="each-indicator">
                                                    <div>
                                                        <h4>3</h4>
                                                        <div className="indicator-txt">Transactions</div>
                                                    </div>
                                                </div>
                                                <div className="each-indicator">
                                                    <div>
                                                        <h4>322,233.23</h4>
                                                        <div className="indicator-txt">Expected cash till</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tellering-section">
                                <div className="txtn-logs">
                                    <div className="each-card mt-20">
                                        <div className="each-card-heading">
                                            <h4>Transaction Log</h4>
                                        </div>
                                        <div className="each-card-heading for-logs">
                                            <table className="table txtn-log">
                                                <thead>
                                                    <tr>
                                                        <th>Time</th>
                                                        <th>Account</th>
                                                        <th>Transaction</th>
                                                        <th>ID</th>
                                                        <th>Amount</th>
                                                        <th>Action</th>
                                                        {/* <th></th> */}
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div className="log-info">
                                            <table className="table txtn-log">
                                                
                                                <tbody>
                                                    <tr>
                                                        <td>15-03-2021 18:14:23</td>
                                                        <td>11090282022</td>
                                                        <td>Deposit</td>
                                                        <td>9698494</td>
                                                        <td>5,000.00</td>
                                                        <td>
                                                            <div className="actions-drop">
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="actionDrop"

                                                                    className="customone"
                                                                >
                                                                    {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                                                                    
                                                                    <Dropdown.Item eventKey="2"> <span>View Till</span> </Dropdown.Item>
                                                                    

                                                                </DropdownButton>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>15-03-2021 18:14:23</td>
                                                        <td>11090282022</td>
                                                        <td>Deposit</td>
                                                        <td>9698494</td>
                                                        <td>5,000.00</td>
                                                        <td>
                                                            <div className="actions-drop">
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="actionDrop"

                                                                    className="customone"
                                                                >
                                                                    {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                                                                    
                                                                    <Dropdown.Item eventKey="2"> <span>View Till</span> </Dropdown.Item>
                                                                    

                                                                </DropdownButton>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>15-03-2021 18:14:23</td>
                                                        <td>11090282022</td>
                                                        <td>Deposit</td>
                                                        <td>9698494</td>
                                                        <td>5,000.00</td>
                                                        <td>
                                                            <div className="actions-drop">
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="actionDrop"

                                                                    className="customone"
                                                                >
                                                                    {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                                                                    
                                                                    <Dropdown.Item eventKey="2"> <span>View Till</span> </Dropdown.Item>
                                                                    

                                                                </DropdownButton>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="each-card mt-20">
                        <div className="each-card-heading">
                            <h4>Teller</h4>
                            <div className="card-actions at-end">
                                <div className="each-cardaction">
                                    <div className="cardaction-ico">
                                        <img src={AddIco} alt="" />
                                    </div>
                                    <div className="cardaction-txt">Open Till</div>
                                </div>
                            </div>
                        </div>
                        <div className="each-card-content">
                            <div className="all-indicators forteller">
                                <div className="each-indicator">
                                    <div>
                                        <h4>1</h4>
                                        <div className="indicator-txt">Open Tills</div>
                                    </div>
                                </div>
                                <div className="each-indicator">
                                    <div>
                                        <h4>10,000.00</h4>
                                        <div className="indicator-txt">Opening Balance</div>
                                    </div>
                                </div>
                                <div className="each-indicator">
                                    <div>
                                        <h4>56,090.09</h4>
                                        <div className="indicator-txt">Expected Cash in Tills</div>
                                    </div>
                                </div>
                                <div className="each-indicator with-actions">
                                    <div>
                                        <h4><span>Orji Innocent</span> <span>N10,000,000</span> </h4>
                                        <div className="indicator-txt">
                                            <div>
                                                Opened:15-03-2021 15:67:08
                                                                    <div>ID: BEATS987</div>
                                            </div>
                                            <div className="actions-drop">
                                                <DropdownButton
                                                    size="sm"
                                                    title="Actions"
                                                    key="actionDrop"

                                                    className="customone"
                                                >
                                                    {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                                                    <Dropdown.Item eventKey="1"> <span className="hasborder">View Till</span> </Dropdown.Item>
                                                    <Dropdown.Item eventKey="2"> <span>Add Cash</span> </Dropdown.Item>
                                                    <Dropdown.Item eventKey="3"> <span className="hasborder">Remove Cash</span> </Dropdown.Item>
                                                    <Dropdown.Item eventKey="4"> <span>Undo Open Till</span> </Dropdown.Item>
                                                    <Dropdown.Item eventKey="5"> <span>Close Till</span> </Dropdown.Item>

                                                </DropdownButton>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="each-indicator with-actions">
                                    <div>
                                        <h4><span>Orji Innocent</span> <span>N10,000,000</span> </h4>
                                        <div className="indicator-txt">
                                            <div>
                                                Opened:15-03-2021 15:67:08
                                                                    <div>ID: BEATS987</div>
                                            </div>
                                            <div className="actions-drop">
                                                <DropdownButton
                                                    size="sm"
                                                    title="Actions"
                                                    key="actionDrop"
                                                    // menuAlign="left"
                                                    className="customone"
                                                >
                                                    {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                                                    <Dropdown.Item eventKey="1"> <span className="hasborder">View Till</span> </Dropdown.Item>
                                                    <Dropdown.Item eventKey="2"> <span>Add Cash</span> </Dropdown.Item>
                                                    <Dropdown.Item eventKey="3"> <span className="hasborder">Remove Cash</span> </Dropdown.Item>
                                                    <Dropdown.Item eventKey="4"> <span>Undo Open Till</span> </Dropdown.Item>
                                                    <Dropdown.Item eventKey="5"> <span>Close Till</span> </Dropdown.Item>

                                                </DropdownButton>
                                            </div>
                                        </div>

                                    </div>
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
                <InnerPageContainer {...this.props}>
                    <div className="content-wrapper">
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Dashboard</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        {/* <div className="module-content "> */}
                        <div className="module-content grayed-bg">
                            <div className="content-container">
                                {this.renderDashboardWrap()}
                                {/* <div className="row">
                                    <div className="col-sm-12">
                                        <div className="middle-content">
                                            <div className="row">
                                                <div className="col-sm-8">
                                                    <div className="dashboardstats">
                                                        <div className="all-stats-wrap">
                                                            {this.renderDashboardStats()}
                                                           
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="activities-items">
                                                        <h6>Latest Activity </h6>
                                                        {this.renderLoggedInUserActivities()}
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </InnerPageContainer>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        getDashboardStats: state.dashboardReducers.getDashboardStatReducer,
        getLoggedInUserActivitiesReducer: state.dashboardReducers.getLoggedInUserActivitiesReducer,
        searchForCustomerReducer : state.dashboardReducers.searchForCustomerReducer,
    };
}

export default connect(mapStateToProps)(DashboardLanding);