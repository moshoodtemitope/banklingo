import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import { NavLink} from 'react-router-dom';
import { history } from '../../_helpers/history';
import ListIco from '../../assets/img/list.svg';
import AddIco from '../../assets/img/addnew.svg';
import InfoIco from '../../assets/img/info.svg';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  ActivitiesBox from '../../shared/elements/activities'
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import CreateNewTask from '../../shared/components/new-task'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import PictureIco from '../../assets/img/picture.svg';
import { depositActions } from '../../redux/actions/deposits/deposits.action';
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'

import { getDateFromISO, numberWithCommas} from '../../shared/utils';
import { dashboardActions } from '../../redux/actions/dashboard/dashboard.action';
import { dashboardConstants } from '../../redux/actiontypes/dashboard/dashboard.constants'

import "./dashboard.scss"; 
import { Form } from "react-bootstrap";
class DashboardLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize: 5,
            CurrentPage: 1,
            defaultOptions:null,
            selectedOption:null,
            selectedCustomer:"",
            showNewTill:false,
            includeClosed:false,
            addCashToTill:false,
            selectedTill: "",
            selectedTillData: false,
            preloadedTillData: false,
            selectedTxtn: null,
            txtOption:"cash"
        }

        this.selectRef = null;
        this.selectRef2 = null;
        this.selectRef3 = null;
        this.selectRef4 = null;
console.log('dashboard load');
        this.userPermissions = JSON.parse(localStorage.getItem("x-u-perm"));

        this.allUSerPermissions = [];
        this.userPermissions.map(eachPermission => {
            this.allUSerPermissions.push(eachPermission.permissionCode)
        })
    }
    _isMounted = false;
    componentWillUnmount() {
        this._isMounted = false;
      }
    componentDidMount() {
       this. _isMounted=true;
  
       this.loadInitialData();

  
    }

    loadInitialData = () => {
        this.getDashboardData();
        this.getDashboardActivities();
        this.getLoggedTills()
                .then(()=>{
                    if(this.props.fetchLoggedonTillsReducer.request_status===dashboardConstants.GET_LOGGEDON_TILLS_SUCCESS){
                        let allLoggedOnTills = this.props.fetchLoggedonTillsReducer.request_data.response.data.result;
                        if(allLoggedOnTills.length>=1){
                             if (this._isMounted) this.setState({selectedTillData:allLoggedOnTills[0], preloadedTillData:true, selectedTill:allLoggedOnTills[0].tillId })
                        }
                    }
                })


        if(
            this.allUSerPermissions.indexOf("bnk_till_supervisor_add_cash") > -1 ||
            this.allUSerPermissions.indexOf("bnk_till_supervisor_view") > -1 ||
            this.allUSerPermissions.indexOf("bnk_till_supervisor_remove_cash") > -1 ||
            this.allUSerPermissions.indexOf("bnk_till_supervisor_undo_close") > -1){
            this.fetchAllTills();
        }
    }

    getDashboardData = () => {
        const { dispatch } = this.props;
        
       
        dispatch(dashboardActions.postATransaction("CLEAR"));
        dispatch(dashboardActions.getDashboardData());
    }

    getLoggedTills = async() => {
        const { dispatch } = this.props;
        
       
        dispatch(dashboardActions.postATransaction("CLEAR"));
        await dispatch(dashboardActions.fetchLoggedonTills());
    }

    fetchAllTills = () => {
        const { dispatch } = this.props;
        
       
        // dispatch(dashboardActions.postATransaction("CLEAR"));
        dispatch(dashboardActions.fetchAllTills(this.state.includeClosed??false));
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
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{numberWithCommas(allDashboardStat.numberOfGroups)}</h4>
                                    <span className="stat-text">Number of Groups</span>
                                </div>
                            </div>
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{numberWithCommas(allDashboardStat.numberOfOverDrafts)}</h4>
                                    <span className="stat-text">Total Overdrafts</span>
                                </div>
                            </div>
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{numberWithCommas(allDashboardStat.parAbove30Days)}</h4>
                                    <span className="stat-text">PAR &gt; 30 Days</span>
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

    getSearchedAccountResults = async (inputValue)=> {
        const {dispatch} = this.props;

        if (!inputValue || inputValue.length===0) {
          return null;
        }
        

         await dispatch(depositActions.searchAccountNumbers(inputValue));

        
    }

    postNewTransaction = async (txtnPayload, transactiontype)=>{
        const {dispatch} = this.props;
       
        await dispatch(dashboardActions.postATransaction(txtnPayload, transactiontype));
    } 

    showOpenTill = ()=> {
        this.props.dispatch(dashboardActions.openATill("CLEAR"))
         if (this._isMounted) this.setState({showNewTill: true})
    }

    closeAddCashToTill = ()=> {
         if (this._isMounted) this.setState({addCashToTill: false})
    }

    showAddRemoveCashToTill = (tillAction, tillActionData,)=> {
        this.props.dispatch(dashboardActions.addRemoveCashToTill("CLEAR"))
         if (this._isMounted) this.setState({tillAction, addCashToTill: true, tillActionData })
    }

    hideCloseTill = ()=> {
         if (this._isMounted) this.setState({closeUndoCloseTill: false})
    }

    showCloseTill = (tillAction, tillActionData)=> {
        this.props.dispatch(dashboardActions.closeUndoCloseToTill("CLEAR"))
         if (this._isMounted) this.setState({tillAction, closeUndoCloseTill: true, tillActionData })
    }

    hideViewTill = ()=> {
         if (this._isMounted) this.setState({closeViewTill: false})
    }

    showViewTill = (tillToView, allTills)=> {
        let tillsFiltered;
        
         if (this._isMounted) this.setState({ closeViewTill: true, tillToView, allTills })
    }

    hideViewCutomer = ()=> {
         if (this._isMounted) this.setState({closeViewCustomer: false})
    }

    showViewCustomer = ()=> {
            
         if (this._isMounted) this.setState({ closeViewCustomer: true, })
    }

    hideViewAccount = ()=> {
         if (this._isMounted) this.setState({closeViewAccount: false})
    }

    showViewAccount = ()=> {
        
        
         if (this._isMounted) this.setState({ closeViewAccount: true })
    }

    closeOpenTill = ()=> {
         if (this._isMounted) this.setState({showNewTill: false})
    }

    

    handleOpenTill = async (requestPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(dashboardActions.openATill(requestPayload));
    } 
    handlecloseUndoCloseToTill = async (requestPayload, action)=>{
        const {dispatch} = this.props;
       
        await dispatch(dashboardActions.closeUndoCloseToTill(requestPayload, action));
    }   
    handleAddRemoveCashToTill = async (requestPayload, action)=>{
        const {dispatch} = this.props;
       
        await dispatch(dashboardActions.addRemoveCashToTill(requestPayload, action));
    }     

 isEmptyOrSpaces(str){
        return str === null || str.match(/^ *$/) !== null;
    }

    renderOpenTillWrap = ()=>{
        if(this.props.fetchAllTillsReducer.request_status===dashboardConstants.GET_ALL_TILLS_SUCCESS){
            let 
                validationSchema = Yup.object().shape({
                    userEncodedKey: Yup.string()
                        .required('Required'),
                    currencyCode: Yup.string()
                        .required('Required'),
                    // mimimumbalance: Yup.string()
                    //     .required('Required'),
                    // maximumBalance: Yup.string()
                    //     .required('Required'),
                    openingAmount: Yup.string()
                        .required('Required').nullable(),
                        
                    tillBalanceConstraintType: Yup.string()
                        .required('Required').nullable(),
                });


                let tellersData =  this.props.fetchAllTillsReducer.request_data.response4.data,
                    currencyData =  this.props.fetchAllTillsReducer.request_data.response5.data,
                    allTellers = [],
                    allCurrencies = [],
                    openATillRequest = this.props.openATillReducer;

                let allOptions =[
                    {label: "None", value:0},
                    {label: "Soft", value:1},
                    {label: "Hard", value:2}
                ];

                tellersData.map(eachData=>{
                    allTellers.push({label:eachData.name, value: eachData.key})
                })

                currencyData.map(eachData=>{
                    allCurrencies.push({label:`${eachData.name}- (${eachData.symbol})`, value: eachData.code})
                })


                
                
                    const selectStyle =  {
                        control: base => ({
                            ...base,
                            // border: 0,
                            // This line disable the blue border
                            boxShadow: "none",
                            height: '54px',
                            borderRadius: "unset",
                            border: "1px solid #B6C1DE",
                            // '&:hover': { borderColor: '#01216C' },
                            '&:active': { borderColor: '#01216C' },
                            '&:focus': { borderColor: '#01216C' },
                            minHeight: '54px',
                        })
                    };
            return(
                <div className="slidein-wrap">
                    <div className="slide-wrap-overlay"></div>
                    <div className="slidein-form" ref={this.setWrapperRef}>
                        <div className="slide-in-heading">
                            <h3>Open Till</h3> 
                            <div className="close-slidein" onClick={this.closeOpenTill}>X</div>
                        </div>
                        
                        <div className="slidein-formwrap">
                            <Formik
                                initialValues={{
                                    // tillId: "",
                                    openingAmount:null,
                                    maximumBalance:null,
                                    mimimumbalance:null,
                                    tillBalanceConstraintType:"",
                                    currencyCode:"",
                                    userEncodedKey:"",
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, { resetForm }) => {
                                 
                                    let requestPayload = {
                                        userEncodedKey: values.userEncodedKey,
                                        maximumBalance: values.maximumBalance==="" ||  values.maximumBalance===null? null:parseFloat(values.maximumBalance.replace(/,/g, '')),
                                        mimimumbalance: values.mimimumbalance===""  || values.mimimumbalance===null? null:parseFloat(values.mimimumbalance.replace(/,/g, '')),
                                        openingBalance: parseFloat(values.openingAmount.replace(/,/g, '')),
                                        tillBalanceConstraintType: values.tillBalanceConstraintType,
                                        currencyCode: values.currencyCode
                                    }

                                
                                    this.handleOpenTill(requestPayload)
                                        .then(()=>{
                                            if(this.props.openATillReducer.request_status ===dashboardConstants.OPEN_A_TILL_SUCCESS){
                                                this.selectRef2.select.clearValue();
                                                this.selectRef3.select.clearValue();
                                                this.selectRef4.select.clearValue();
                                                resetForm()
                                                this.getDashboardData();
                                            }
                                        })



                                }}
                            >
                                {({ handleSubmit,
                                    handleChange,
                                    handleBlur,
                                    resetForm,
                                    setFieldValue,
                                    setFieldTouched,
                                    values,
                                    touched,
                                    isValid,
                                    errors, }) =>{
                                        
                                        
                                        console.log(errors);
                                        
                                        
                                        return (

                                        
                                    <Form noValidate
                                        onSubmit={handleSubmit}>

                                        <Form.Group>
                                            <Form.Label className="block-level">Teller</Form.Label>
                                            <div className="select-drop">
                                                <Select
                                                    options={allTellers}
                                                    ref={ref => {
                                                        this.selectRef2 = ref;
                                                    }}
                                                    onChange={(selectedOption) => {
                                                        this.setState({ selectedOption });
                                                        if(selectedOption){
                                                          //  errors.userEncodedKey = null
                                                            values.userEncodedKey = selectedOption.value
                                                        }
                                                    }}
                                                    className={errors.userEncodedKey && touched.userEncodedKey ? "is-invalid" : ""}
                                                    name="userEncodedKey"
                                                    required
                                                />

                                                {errors.userEncodedKey && touched.userEncodedKey ? (
                                                    <span className="invalid-feedback">{errors.userEncodedKey}</span>
                                                ) : null}
                                            </div>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="block-level">Currency</Form.Label>
                                            <div className="select-drop">
                                                <Select
                                                    options={allCurrencies}
                                                    ref={ref => {
                                                        this.selectRef3 = ref;
                                                    }}
                                                    onChange={(selectedOption) => {
                                                        this.setState({ selectedOption });
                                                        if(selectedOption){
                                                          //  errors.currencyCode = null
                                                            values.currencyCode = selectedOption.value
                                                        }
                                                    }}
                                                    className={errors.currencyCode && touched.currencyCode ? "is-invalid" : ""}
                                                    name="currencyCode"
                                                    required
                                                />

                                                {errors.currencyCode && touched.currencyCode ? (
                                                   
                                                    <span className="invalid-feedback">{errors.currencyCode}</span>
                                                ) : null}
                                            </div>
                                         
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label className="block-level">Opening amount</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="openingAmount"
                                                value={numberWithCommas(values.openingAmount)??""}
                                                onChange={handleChange}
                                                className={errors.openingAmount && touched.openingAmount ? "is-invalid" : ""}
                                                required />

                                            {errors.openingAmount && touched.openingAmount ? (
                                                <span className="invalid-feedback">{errors.openingAmount}</span>
                                            ) : null}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="block-level">Maximum Balance</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="maximumBalance"
                                                value={numberWithCommas(values.maximumBalance)??""}
                                                onChange={handleChange}
                                                className={errors.maximumBalance && touched.maximumBalance ? "is-invalid" : ""}
                                                required />

                                            {errors.maximumBalance && touched.maximumBalance ? (
                                                <span className="invalid-feedback">{errors.maximumBalance}</span>
                                            ) : null}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="block-level">Minimum Balance</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="mimimumbalance"
                                                value={numberWithCommas(values.mimimumbalance)??""}
                                                onChange={handleChange}
                                                className={errors.mimimumbalance && touched.mimimumbalance ? "is-invalid" : ""}
                                                required />

                                            {errors.mimimumbalance && touched.mimimumbalance ? (
                                                <span className="invalid-feedback">{errors.mimimumbalance}</span>
                                            ) : null}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="block-level">Balance Constraint Type</Form.Label>
                                            <div className="select-drop">
                                                <Select
                                                    options={allOptions}
                                                    ref={ref => {
                                                        this.selectRef4 = ref;
                                                    }}
                                                    onChange={(selectedOption) => {
                                                        this.setState({ selectedOption });
                                                        if(selectedOption){
                                                         //   errors.tillBalanceConstraintType = null
                                                            values.tillBalanceConstraintType = selectedOption.value
                                                        }
                                                    }}
                                                    className={errors.tillBalanceConstraintType && touched.tillBalanceConstraintType ? "is-invalid" : ""}
                                                    name="tillBalanceConstraintType"
                                                    required
                                                />

                                                {errors.tillBalanceConstraintType && touched.tillBalanceConstraintType ? (
                                                    <span className="invalid-feedback">{errors.tillBalanceConstraintType}</span>
                                                ) : null}
                                            </div>
                                        </Form.Group>
                                        
                                        
                                        
                                        
                                        
                                        
                                            

                                        <div className="mt-50">
                                            <div className="footer-with-cta">
                                                {openATillRequest.request_status !== dashboardConstants.OPEN_A_TILL_SUCCESS && 
                                                    <Button
                                                        type="submit"
                                                        disabled={openATillRequest.is_request_processing}
                                                    >
                                                        
                                                        {openATillRequest.is_request_processing ? "Please wait..." : "Open Till"}
                                                    </Button>
                                                }
                                                <Button variant="secondary" 
                                                    disabled={openATillRequest.is_request_processing}
                                                    onClick={this.closeOpenTill}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                        {openATillRequest.request_status === dashboardConstants.OPEN_A_TILL_SUCCESS && 
                                            <Alert variant="success">
                                                {openATillRequest.request_data.response.data.message && openATillRequest.request_data.response.data.message}
                                                {!openATillRequest.request_data.response.data.message && `Till ${openATillRequest.request_data.response.data.tillId} was successfully opened`}
                                            </Alert>
                                        }
                                        {openATillRequest.request_status === dashboardConstants.OPEN_A_TILL_FAILURE && 
                                            <Alert variant="danger">
                                                {openATillRequest.request_data.error}
                                            </Alert>
                                        }



                                        


                                    </Form>
                                )}}
                            </Formik>
                        </div>
                    </div>
                </div>
            )
        }
    }

    renderAddRemoveCashToTillWrap = (tillData, action)=>{
        let 
            validationSchema = Yup.object().shape({
                // tillId: Yup.string()
                //     .required('Required'),
                amount: Yup.string()
                    .required('Required'),
            });
            let addRemoveCashToTillRequest = this.props.addRemoveCashToTillReducer,
                ctaText;

                if(action ==="add"){
                    ctaText = "Add Funds";
                }
                if(action ==="remove"){
                    ctaText = "Remove Funds";
                }
                

           


           
            

            
                
        return(
            <div className="slidein-wrap">
                <div className="slide-wrap-overlay"></div>
                <div className="slidein-form" ref={this.setWrapperRef}>
                    <div className="slide-in-heading">
                        {action ==="add" &&
                            <h3>Add Cash - {tillData.tillId}</h3> 
                        }
                        {action ==="remove" &&
                            <h3>Remove Cash - {tillData.tillId}</h3> 
                        }
                        
                        <div className="close-slidein" onClick={this.closeAddCashToTill}>X</div>
                    </div>
                    {this.props.addRemoveCashToTillReducer.request_status !== dashboardConstants.ADD_REMOVE_CASH_TO_TILL_SUCCESS &&
                        <div className="formdetails">
                            <div className="each-detail">
                                <div className="detail-title">Till ID</div>
                                <div className="detail-value">{tillData.tillId}</div>
                            </div>
                            <div className="each-detail">
                                <div className="detail-title">Teller</div>
                                <div className="detail-value">{tillData.tillUser}</div>
                            </div>
                            <div className="each-detail">
                                <div className="detail-title">Expected cash in Till</div>
                                <div className="detail-value">{numberWithCommas(tillData.balance, true)}</div>
                            </div>
                        </div>
                    }
                    
                    <div className="slidein-formwrap">
                        <Formik
                            initialValues={{
                                // tillId: "",
                                amount:""
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }) => {
                                // if(uploadedData && invalidType===false){
                                //     let savedData = {
                                //         batchName: values.batchName,
                                //         cardProgramBinEncodedKey: values.cardProgramBinEncodedKey,
                                //         batchDescription: values.batchDescription,
                                //         uploadedData
                                //     }
                                //     history.push("/batches/new/details", {savedData})
                                // }

                                
                                let requestPayload = {
                                    tillEncodedKey: tillData.encodedKey,
                                    amount: parseFloat(values.amount.replace(/,/g, '')),
                                    comment: values.comment
                                }

                                
                                

                                this.handleAddRemoveCashToTill(requestPayload, action)
                                    .then(()=>{
                                        if(this.props.addRemoveCashToTillReducer.request_status === dashboardConstants.ADD_REMOVE_CASH_TO_TILL_SUCCESS) {
                                            this.fetchAllTills()
                                        }
                                    })



                            }}
                        >
                            {({ handleSubmit,
                                handleChange,
                                handleBlur,
                                resetForm,
                                setFieldValue,
                                setFieldTouched,
                                values,
                                touched,
                                isValid,
                                errors, }) => (
                                <Form noValidate
                                    onSubmit={handleSubmit}>
                                    {this.props.addRemoveCashToTillReducer.request_status !== dashboardConstants.ADD_REMOVE_CASH_TO_TILL_SUCCESS &&
                                        <div>
                                            <Form.Group>
                                                <Form.Label className="block-level">Amount</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="amount"
                                                    value={numberWithCommas(values.amount)}
                                                    onChange={handleChange}
                                                    className={errors.amount && touched.amount ? "is-invalid" : ""}
                                                    required />

                                                {errors.amount && touched.amount ? (
                                                    <span className="invalid-feedback">{errors.amount}</span>
                                                ) : null}
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label className="block-level">Comments</Form.Label>
                                                <Form.Control as="textarea"
                                                    rows="3"
                                                    onChange={handleChange}
                                                    name="comment"
                                                    value={values.comment}
                                                    className={errors.comment && touched.comment ? "is-invalid form-control form-control-sm" : null}
                                                />
                                                {errors.comment && touched.comment ? (
                                                    <span className="invalid-feedback">{errors.comment}</span>
                                                ) : null}
                                            </Form.Group>


                                            <div className="mt-50">
                                                <div className="footer-with-cta">
                                                    {addRemoveCashToTillRequest.request_status !== dashboardConstants.ADD_REMOVE_CASH_TO_TILL_SUCCESS &&
                                                        <Button
                                                            type="submit"
                                                            disabled={addRemoveCashToTillRequest.is_request_processing}
                                                        >

                                                            {(addRemoveCashToTillRequest.is_request_processing) ? "Please wait..." : `${ctaText}`}

                                                        </Button>
                                                    }
                                                    <Button variant="secondary"
                                                        disabled={addRemoveCashToTillRequest.is_request_processing}
                                                        onClick={this.closeAddCashToTill}>
                                                        Cancel
                                            </Button>

                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {addRemoveCashToTillRequest.request_status === dashboardConstants.ADD_REMOVE_CASH_TO_TILL_SUCCESS && 
                                        <Alert variant="success">
                                            {addRemoveCashToTillRequest.request_data.response.data.message}
                                        </Alert>
                                    }
                                    {addRemoveCashToTillRequest.request_status === dashboardConstants.ADD_REMOVE_CASH_TO_TILL_FAILURE && 
                                        <Alert variant="danger">
                                            {addRemoveCashToTillRequest.request_data.error}
                                        </Alert>
                                    }



                                    


                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }

    renderCloseUndoCloseTillWrap = (tillData, action)=>{
        let 
            validationSchema = Yup.object().shape({
                // tillId: Yup.string()
                //     .required('Required'),
                amount: Yup.string()
                    .required('Required'),
            });
            let closeUndoCloseToTillRequest = this.props.closeUndoCloseToTillReducer,
                ctaText;

                if(this.state.tillAction ==="closeTill"){
                    ctaText = "Close Till";
                }
                if(this.state.tillAction ==="undoCloseTill"){
                    ctaText = "Undo Close Till";
                }
                
                
        return(
            <div className="slidein-wrap">
                <div className="slide-wrap-overlay"></div>
                <div className="slidein-form" ref={this.setWrapperRef}>
                    <div className="slide-in-heading">
                        {this.state.tillAction ==="closeTill" &&
                            <h3>Confirm Close Till - {tillData.tillId}</h3> 
                        }
                        {this.state.tillAction ==="undoCloseTill" &&
                            <h3>Confirm Undo Close Till - {tillData.tillId}</h3> 
                        }
                        
                        <div className="close-slidein" onClick={this.hideCloseTill}>X</div>
                    </div>
                    {this.props.closeUndoCloseToTillReducer.request_status === dashboardConstants.CLOSE_UNDOCLOSE_TILL_SUCCESS &&
                        <div className="formdetails">
                            <div className="each-detail">
                                <div className="detail-title">Till ID</div>
                                <div className="detail-value">{tillData.tillId}</div>
                            </div>
                            <div className="each-detail">
                                <div className="detail-title">Teller</div>
                                <div className="detail-value">{tillData.tillUser}</div>
                            </div>
                            <div className="each-detail">
                                <div className="detail-title">Expected cash in Till</div>
                                <div className="detail-value">{numberWithCommas(tillData.balance, true)}</div>
                            </div>
                        </div>
                    }
                    
                    <div className="slidein-formwrap">
                        
                        <div className="mt-50">
                            <div className="footer-with-cta">
                                {closeUndoCloseToTillRequest.request_status !== dashboardConstants.CLOSE_UNDOCLOSE_TILL_SUCCESS && 
                                    <Button
                                        type="button"
                                        disabled={closeUndoCloseToTillRequest.is_request_processing}
                                        onClick={()=>{
                                            let requestPayload = {
                                                tillEncodedKey: tillData.encodedKey
                                            }
            
                                            // console.log("gakaka", this.state.tillAction)
                                            
            
                                            this.handlecloseUndoCloseToTill(requestPayload, this.state.tillAction)
                                                    .then(()=>{
                                                        if(this.props.closeUndoCloseToTillReducer.request_status === dashboardConstants.CLOSE_UNDOCLOSE_TILL_SUCCESS){
                                                            this.fetchAllTills()
                                                        }
                                                    })
                                        }}
                                    >
                                        
                                        {(closeUndoCloseToTillRequest.is_request_processing) ? "Please wait..." : `${ctaText}`}
                                        
                                    </Button>
                                }
                                <Button variant="secondary" 
                                    disabled={closeUndoCloseToTillRequest.is_request_processing}
                                    onClick={this.hideCloseTill}>
                                    Cancel
                                </Button>
                                
                            </div>
                        </div>
                        {closeUndoCloseToTillRequest.request_status === dashboardConstants.CLOSE_UNDOCLOSE_TILL_SUCCESS && 
                            <Alert variant="success">
                                {closeUndoCloseToTillRequest.request_data.response.data.message}
                            </Alert>
                        }
                        {closeUndoCloseToTillRequest.request_status === dashboardConstants.CLOSE_UNDOCLOSE_TILL_FAILURE && 
                            <Alert variant="danger">
                                {closeUndoCloseToTillRequest.request_data.error}
                            </Alert>
                        }
                    </div>
                </div>
            </div>
        )
    }

    renderViewTillWrap = (tillId, tillData )=>{
        
           

                

           


           
            

            
                
        return(
            <div className="slidein-wrap">
                <div className="slide-wrap-overlay"></div>
                <div className="slidein-form" ref={this.setWrapperRef}>
                    <div className="slide-in-heading">
                        
                            <h3>View Till - {tillId}</h3> 
                        
                        
                        
                        <div className="close-slidein" onClick={this.hideViewTill}>X</div>
                    </div>
                    
                    <div className="formdetails">
                        <div className="each-detail">
                            <div className="detail-title">Till Account State</div>
                            <div className="detail-value">{tillData.tillAccountStateDescription}</div>
                        </div>
                        {tillData.tillAccountState===1 &&
                            <div className="each-detail">
                                <div className="detail-title">Date Opened</div>
                                <div className="detail-value">{getDateFromISO(tillData.dateOpened)}</div>
                            </div>
                        }
                        {tillData.tillAccountState===2 &&
                            <div className="each-detail">
                                <div className="detail-title">Date Closed</div>
                                <div className="detail-value">{getDateFromISO(tillData.dateClosed)}</div>
                            </div>
                        }
                        <div className="each-detail">
                            <div className="detail-title">Teller</div>
                            <div className="detail-value">{tillData.tillUser}</div>
                        </div>
                        <div className="each-detail">
                            <div className="detail-title">Expected cash in Till</div>
                            <div className="detail-value">{numberWithCommas(tillData.balance, true)} {tillData.currencyCode}</div>
                        </div>
                        <div className="each-detail">
                            <div className="detail-title">Minimum Balance</div>
                            <div className="detail-value">{numberWithCommas(tillData.mimimumbalance, true)} {tillData.currencyCode}</div>
                        </div>
                        <div className="each-detail">
                            <div className="detail-title">Maximum Balance</div>
                            <div className="detail-value">{numberWithCommas(tillData.maximumBalance, true)} {tillData.currencyCode}</div>
                        </div>
                    </div>
                
                    
                    <div className="slidein-formwrap">
                        <Formik
                            initialValues={{
                                
                            }}
                            // validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }) => {
                               


                            }}
                        >
                            {({ handleSubmit,
                                
                                errors, }) => (
                                <Form noValidate
                                    onSubmit={handleSubmit}>

                                    
                                    
                                       

                                    <div className="mt-50">
                                        <div className="footer-with-cta">
                                           
                                            <Button variant="secondary" 
                                               
                                                onClick={this.hideViewTill}>
                                                Cancel
                                            </Button>
                                            
                                        </div>
                                    </div>
                                    



                                    


                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }

    renderViewCustomerWrap = ( )=>{
        let {mandateInfo} = this.state,
            customerDetails = mandateInfo.response.data,
            customerBvnPassport = mandateInfo.response3.data,
            manadateData = mandateInfo.response2.data;

                
        return(
            <div className="slidein-wrap">
                <div className="slide-wrap-overlay"></div>
                <div className="slidein-form" ref={this.setWrapperRef}>
                    <div className="slide-in-heading">
                        
                            <h3>Customer Information</h3> 
                        
                        
                        
                        <div className="close-slidein" onClick={this.hideViewCutomer}>X</div>
                    </div>
                    
                    <div className="formdetails">
                        <div className="mandate-imgs">
                            <div className="each-mandate">
                                {manadateData.isPassportAvailable &&
                                    <img src={manadateData.passport} alt="" />
                                }
                                {!manadateData.isPassportAvailable &&
                                    <img className="no-mandate" src={PictureIco} alt="" />
                                }
                                <div className="mandate-title">Customer Photo</div>
                                {/* <Button
                                    variant="success btn-sm"
                                    onClick={this.displayAddPhoto}
                                >
                                    {!manadateData.isPassportAvailable ? "Upload Photo" : "Update Photo"}

                                </Button> */}
                            </div>
                            <div className="each-mandate">
                                {manadateData.isSignatureAvailable &&
                                    <img src={manadateData.signature} alt="" />
                                }
                                {!manadateData.isSignatureAvailable &&
                                    <img className="no-mandate" src={PictureIco} alt="" />
                                }
                                <div className="mandate-title">Customer Signature</div>
                                {/* <Button
                                    variant="success btn-sm"
                                    onClick={this.displayAddSignature}
                                >
                                    {!manadateData.isSignatureAvailable ? "Upload Signature" : "Update Signature"}
                                </Button> */}
                            </div>
                        </div>
                        <div className="each-detail">
                            <div className="detail-title">First name</div>
                            <div className="detail-value">{customerDetails.firstName}</div>
                        </div>
                        <div className="each-detail">
                            <div className="detail-title">Last name</div>
                            <div className="detail-value">{customerDetails.lastName}</div>
                        </div>
                        <div className="each-detail">
                            <div className="detail-title">Account Number</div>
                            <div className="detail-value">{customerDetails.clientCode}</div>
                        </div>
                        <div className="each-detail">
                            <div className="detail-title">Account Balance</div>
                            <div className="detail-value">{numberWithCommas(customerDetails.totalBalance,true)}</div>
                        </div> 
                        <div className="each-detail">
                            <div className="detail-title">Date Registered</div>
                            <div className="detail-value">{customerDetails.createdDate}</div>
                        </div>
                        <div className="each-detail">
                            <div className="detail-title">Phone number</div>
                            <div className="detail-value">{customerDetails.contact.contactMobile}</div>
                        </div>
                        <div className="each-detail">
                            <div className="detail-title">Biometric ID</div>
                            <div className="detail-value">{customerDetails.bvn}</div>
                        </div>
                        {/* <div className="each-detail">
                            <div className="detail-title">Account Status</div>
                            <div className="detail-value">{customerToView.stateDescription}</div>
                        </div> */}
                       
                    </div>
                
                    
                    <div className="slidein-formwrap">
                        <Formik
                            initialValues={{
                                
                            }}
                            // validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }) => {
                               


                            }}
                        >
                            {({ handleSubmit,
                                
                                errors, }) => (
                                <Form noValidate
                                    onSubmit={handleSubmit}>

                                    <div className="mt-50">
                                        <div className="footer-with-cta">
                                           
                                            <Button variant="secondary" 
                                               
                                                onClick={this.hideViewCutomer}>
                                                Close
                                            </Button>
                                            
                                        </div>
                                    </div>
                                    



                                    


                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }

    renderAllActivies = ()=>{
        let getLoggedInUserActivitiesRequest = this.props.getLoggedInUserActivitiesReducer;

        if(getLoggedInUserActivitiesRequest.request_status===dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_PENDING){
            return(
                <div className="each-card-content centered-item">
                    <div className="loading-text">Please wait... </div>
                </div>
            )
        }


        if(getLoggedInUserActivitiesRequest.request_status===dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_SUCCESS){
            let customerActivitiesData = getLoggedInUserActivitiesRequest.request_data.response.data;
            if(customerActivitiesData.result.length>=1){
                return(
                    <div className="each-card-content">
                    <div className="all-activity-items">
                        {
                            customerActivitiesData.result.map((eachActivity,  index)=>{
                                return(
                                    
                                        
                                            
                                    <div className="each-activity-item" key={index}>
                                        <div className="activity-icon">
                                            <img src={InfoIco} alt="" />
                                        </div>
                                        <div className="activity-wrap">
                                            <div className="action-info">
                                                <span className="username"><NavLink to={`/user/${eachActivity.affectedCustomerEncodedKey}`}>{eachActivity.userName}</NavLink></span>
                                                <span className="activity-item">{eachActivity.action}</span>
                                            </div>
                                            <div className="timing">
                                                <span>{eachActivity.creationDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                        
                                    
                                    // <div className="each-activity">
                                    //     <span>
                                    //         <NavLink to={`/customer/${eachActivity.affectedCustomerEncodedKey}`}>{eachActivity.affectedCustomerName}</NavLink>
                                    //     </span>
                                    //     <span className="activity-action">
                                    //         {eachActivity.action} </span>
                                    //     <div>
                                    //         <span className="action-date">{eachActivity.creationDate}</span>
                                    //         {/* <span className="action-by"> <NavLink to='/customer/20/savingsaccount/77339322'>{eachActivity.affectedUserName}</NavLink></span> */}
                                    //     </div>
                                    // </div>
                                )
                            })
                        }
                    </div>
                    </div>
                )
            }else{
                return(
                    <div className="each-card-content centered-item">
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

    

    renderViewAccountWrap = (accountToView )=>{
        
                
        return(
            <div className="slidein-wrap">
                <div className="slide-wrap-overlay"></div>
                <div className="slidein-form" ref={this.setWrapperRef}>
                    <div className="slide-in-heading">
                        
                            <h3>{accountToView.searchItemTypeDesc} Account</h3> 
                           
                        
                        
                        
                        <div className="close-slidein" onClick={this.hideViewAccount}>X</div>
                    </div>
                    
                    <div className="formdetails">
                        <div className="each-detail">
                            <div className="detail-title">Client Name</div>
                            <div className="detail-value">{accountToView.clientName}</div>
                        </div>
                        <div className="each-detail">
                            <div className="detail-title">Account Number</div>
                            <div className="detail-value">{accountToView.searchKey}</div>
                        </div>
                        <div className="each-detail">
                            <div className="detail-title">Account Status</div>
                            <div className="detail-value">{accountToView.stateDescription}</div>
                        </div>
                       
                    </div>
                
                    
                    <div className="slidein-formwrap">
                        <Formik
                            initialValues={{
                                
                            }}
                            // validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }) => {
                               


                            }}
                        >
                            {({ handleSubmit,
                                
                                errors, }) => (
                                <Form noValidate
                                    onSubmit={handleSubmit}>

                                    <div className="mt-50">
                                        <div className="footer-with-cta">
                                           
                                            <Button variant="secondary" 
                                               
                                                onClick={this.hideViewAccount}>
                                                Close
                                            </Button>
                                            
                                        </div>
                                    </div>
                                    



                                    


                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }

    initiateAccountSearch =(inputValue)=>{
        this.setState({defaultAccountOptions:"", 
                        selectOtherCustomerAccount:"",
                        // firstChosenTransferCriteria:"accounts",
                        isCustommerAccountsFetchedWithKey:""});
        
        let searchAccountNumberRequest = this.props.searchAccountNumbersReducer;
            // getAClientDepositAccountRequest = this.props.getAClientDepositAccountReducer.request_data.response.data;
        this.props.dispatch(depositActions.searchAccountNumbers("CLEAR"));
        if(inputValue.length>=1){
            return this.getSearchedAccountResults(inputValue)
                    .then(
                        ()=>{
                            
                        if (this.props.searchAccountNumbersReducer.request_status === loanAndDepositsConstants.SEARCH_ACCOUNT_NUMBERS_SUCCESS) {
                            
                            let searchResultsData = this.props.searchAccountNumbersReducer.request_data.response.data;
                            
                            
                            searchResultsData = searchResultsData.filter(eachResult=>(
                                    (
                                        (eachResult.searchItemType===3)
                                        // (eachResult.searchItemType===3 && (eachResult.state===3 || eachResult.state===5))
                                        ||
                                        (eachResult.searchItemType===2)
                                        // (eachResult.searchItemType===2 && (eachResult.state===6 || eachResult.state===5))
                                    )
                                    // && eachResult.searchKey !==getAClientDepositAccountRequest.accountNumber
                                    // && eachResult.clientEncodedKey !==getAClientDepositAccountRequest.clientEncodedKey
                                    ))
                            
                            this.setState({isCustommerAccountsFetchedWithKey:false, defaultAccountOptions:searchResultsData })
                            
                            
                            return searchResultsData;
                        }
                        
                    })
        }else{
            return null;
        }
           
        

                
    }




    loadSearchResults = (inputValue, callback) => {
        return this.getSearchedCustomerResults(inputValue)
                .then(()=>{
                    if(this.props.searchForCustomerReducer.request_status===dashboardConstants.SEARCH_FOR_CUSTOMER_SUCCESS){
                        let searchResults = this.props.searchForCustomerReducer.request_data.response.data;
                        

                        searchResults = searchResults.filter(eachResult=>eachResult.searchItemType===0);
                        console.log("search items", searchResults);
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

    loadCustomerAccounts = (selectedClientEncodedKey, isCustomer)=>{
        let   searchForAccountsWithCustomerKeyRequest =  this.props.searchForAccountsWithCustomerKeyReducer;
        if(isCustomer){
            this.getAccountsOfSelectedCustomer(selectedClientEncodedKey)
                .then( 
                    ()=>{
                        if(this.props.searchForAccountsWithCustomerKeyReducer.request_status === loanAndDepositsConstants.SEARCH_FOR_ACCOUNTS_WITH_CUSTOMERKEY_SUCCESS){
                            
                            let loadedCustomerAccounts = this.props.searchForAccountsWithCustomerKeyReducer.request_data.response.data,
                                customerAccounts =[];

                            if(loadedCustomerAccounts.length>=1){
                                loadedCustomerAccounts.map((eachAccount, index)=>{
                                    if(
                                        (eachAccount.searchItemType===2 && (eachAccount.state===5 || eachAccount.state===6))
                                        ||
                                        (eachAccount.searchItemType===3 && (eachAccount.state===3 || eachAccount.state===5))
                                    )
                                    {
                                        customerAccounts.push({label:eachAccount.searchText, value:eachAccount.searchItemEncodedKey})
                                    }
                                })
                                this.setState({defaultAccountOptions:loadedCustomerAccounts, isCustommerAccountsFetchedWithKey: true})
                            }
                        }
                    }
                )
        }
        
            this.fetchMandateOfSelectedCustomer(selectedClientEncodedKey)
                    .then(()=>{
                        if(this.props.fetchManadateReducer.request_status === dashboardConstants.FETCH_MANDATE_SUCCESS){
                            this.setState({showMandateLink: true, 
                                            mandateInfo:this.props.fetchManadateReducer.request_data,
                                            selectedCustomer: {
                                                                clientEncodedKey: this.props.fetchManadateReducer.request_data.response.data.clientEncodedKey,
                                                                clientName: `${this.props.fetchManadateReducer.request_data.response.data.firstName} ${this.props.fetchManadateReducer.request_data.response.data.lastName}`
                                                                
                                                                }
                                        })
                        }
                    })
        
    }

    getAccountsOfSelectedCustomer = async (selectedClientEncodedKey)=>{
        const {dispatch} = this.props;
      return  await dispatch(depositActions.searchForAccountsWithCustomerKey(selectedClientEncodedKey));
    }

    fetchMandateOfSelectedCustomer = async (selectedClientEncodedKey)=>{
        const {dispatch} = this.props;
      return  await dispatch(dashboardActions.fetchManadate(selectedClientEncodedKey));
    }

    fetchTillTransactions = async (tillId)=>{
        const {dispatch} = this.props;
      return  await dispatch(dashboardActions.fetchTillTransactions(tillId));
    }

    

    handleSelectedCustomer =(inputValue)=>{
        
        
        // console.log("customer is", inputValue);
        this.loadCustomerAccounts(inputValue.clientEncodedKey, true);
        this.setState({
            selectedCustomer: inputValue,
            selectACustomerAccount: inputValue,
            // firstChosenTransferCriteria:"customer",
            selectOtherCustomerAccount:""
        });
        
    }

    handleSelectedAccount =(inputValue)=>{
        
        
        // console.log("customer is", inputValue);
        this.loadCustomerAccounts(inputValue.clientEncodedKey, false);
        
        
    }

    getSearchForCustomerOptionValue = (option) => option.clientEncodedKey; 
    getSearchOptionForCustomerLabel = (option) => option.clientName || option.searchText; 
    
    getSearchForAccountOptionValue = (option) => option.searchItemEncodedKey; // maps the result 'id' as the 'value'
    getSearchOptionForAccountLabel = (option) => `${option.searchText} ${option.searchKey}`; // maps the result 'name' as the 'label'
    noOptionsForAccountMessage(inputValue) {
        
        return ""
    }
    noOptionsForCustomerMessage(inputValue) {
        
        return "No Customers found"
    }

    renderTillTransactions = ()=>{
        let fetchTillTransactionsRequest =  this.props.fetchTillTransactionsReducer

        if(this.state.selectedTillData && !this.state.preloadedTillData){
            //  console.log("heere");
            if(fetchTillTransactionsRequest.request_status ===dashboardConstants.GET_TILL_TRANSACTIONS_PENDING){
                return (
                    <div className="tellering-section">
                        <div className="txtn-logs">
                            <div className="each-card mt-20">
                                <div className="each-card-heading">
                                    <h4>Transaction Log</h4>
                                </div>
                                
                                <div className="log-info">
                                    
                                    <div className="loading-text">Please wait...</div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }


            if(fetchTillTransactionsRequest.request_status ===dashboardConstants.GET_TILL_TRANSACTIONS_SUCCESS){
                let fetchTillTransactionsData = fetchTillTransactionsRequest.request_data.response.data;
                return (
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
                                                <th>User</th>
                                                <th>Transaction</th>
                                                <th>ID</th>
                                                <th>Amount</th>
                                                
                                                {/* <th></th> */}
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className="log-info">
                                    <table className="table txtn-log">
        
                                        <tbody>
                                            {
                                                fetchTillTransactionsData.result.map((eachData, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{eachData.dateCreated}</td>
                                                            <td>{eachData.userName}</td>
                                                            <td>{eachData.typeDescription}</td>
                                                            <td>{eachData.tillId}</td>
                                                            <td>{numberWithCommas(eachData.transactionAmount, true)}</td>
                                                            {/* <td>
                                                                <div className="actions-drop">
                                                                    <DropdownButton
                                                                        size="sm"
                                                                        title="Actions"
                                                                        key="actionDrop"

                                                                        className="customone"
                                                                    >
                                                                       

                                                                        <Dropdown.Item eventKey="2"
                                                                            onClick={()=>{
                                                                                this.showViewTill(eachData.tillId, this.state.selectedTillData)
                                                                            }}
                                                                        > <span>View Till</span> </Dropdown.Item>


                                                                    </DropdownButton>
                                                                </div>
                                                            </td> */}
                                                        </tr>
                                                    )
                                                })
                                            }
                                            
                                            
                                            {/* <tr>
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
                                                            
        
                                                            <Dropdown.Item eventKey="2"> <span>View Till</span> </Dropdown.Item>
        
        
                                                        </DropdownButton>
                                                    </div>
                                                </td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            if(fetchTillTransactionsRequest.request_status ===dashboardConstants.GET_TILL_TRANSACTIONS_FAILURE){
                return(
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
                                                {/* <th>Action</th> */}
                                                {/* <th></th> */}
                                            </tr>
                                            <tr>
                                                <td>
                                                
                                                </td>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className="log-info">
                                    <table className="table txtn-log">
        
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Alert variant="danger">
                                                        {fetchTillTransactionsRequest.request_data.error}
                                                    </Alert></td>
                                            </tr>
                                            
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                )
            }
        }

        if(this.state.preloadedTillData && (this.props.fetchLoggedonTillsReducer.request_status===dashboardConstants.GET_LOGGEDON_TILLS_SUCCESS && this.props.fetchLoggedonTillsReducer.request_data.response2)){
            let fetchTillTransactionsData = this.props.fetchLoggedonTillsReducer.request_data.response2.data;
                return (
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
                                                <th>User</th>
                                                <th>Transaction</th>
                                                <th>ID</th>
                                                <th>Amount</th>
                                                {/* <th>Action</th> */}
                                                {/* <th></th> */}
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className="log-info">
                                    <table className="table txtn-log">
        
                                        <tbody>
                                            {
                                                fetchTillTransactionsData.result.map((eachData, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{eachData.dateCreated}</td>
                                                            <td>{eachData.userName}</td>
                                                            <td>{eachData.typeDescription}</td>
                                                            <td>{eachData.tillId}</td>
                                                            <td>{numberWithCommas(eachData.transactionAmount, true)}</td>
                                                            {/* <td>
                                                                <div className="actions-drop">
                                                                    <DropdownButton
                                                                        size="sm"
                                                                        title="Actions"
                                                                        key="actionDrop"

                                                                        className="customone"
                                                                    >
                                                                        

                                                                        <Dropdown.Item eventKey="2"
                                                                            onClick={()=>{
                                                                                this.showViewTill(eachData.tillId, this.state.selectedTillData)
                                                                            }}
                                                                        > <span>View Till</span> </Dropdown.Item>


                                                                    </DropdownButton>
                                                                </div>
                                                            </td> */}
                                                        </tr>
                                                    )
                                                })
                                            }
                                            
                                            
                                            {/* <tr>
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
                                                            
        
                                                            <Dropdown.Item eventKey="2"> <span>View Till</span> </Dropdown.Item>
        
        
                                                        </DropdownButton>
                                                    </div>
                                                </td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )
        }
    }

    renderPostTransaction = ()=>{
        let {
            selectedCustomer,
            defaultAccountOptions,
            showNewTill,
            addCashToTill,
            txtOption,
            selectedTxtn,
            closeUndoCloseTill,
            selectedOption,
            selectOtherCustomerAccount,
            defaultOptions} = this.state;
        let allTxtn;
            let postATransactionRequest =this.props.postATransactionReducer;
            let 
                validationSchema = Yup.object().shape({
                    // tillId: Yup.string()
                    //     .required('Required'),
                    chosenAccountNum: Yup.string()
                        .required('Required'),
                    txtnType: Yup.string()
                        .required('Required'),
                    clientEncodedKey: Yup.string()
                        .required('Required'),
                    amount: Yup.string()
                        .required('Required'),
                });

                if(this.state.txtOption==="cheque"){
                    validationSchema = Yup.object().shape({
                        // tillId: Yup.string()
                        //     .required('Required'),
                        chosenAccountNum: Yup.string()
                            .required('Required'),
                        txtnType: Yup.string()
                            .required('Required'),
                        clientEncodedKey: Yup.string()
                            .required('Required'),
                        chequeNo: Yup.string()
                            .required('Required'),
                        amount: Yup.string()
                            .required('Required'),
                        referenceID: Yup.string()
                            .required('Required'),
                    });
                }
                // if(this.state.selectedTxtn && (this.state.selectedTxtn.value === 4 || this.state.selectedTxtn.value === 5)){
                //     validationSchema = Yup.object().shape({
                //         // tillId: Yup.string()
                //         //     .required('Required'),
                //         chosenAccountNum: Yup.string()
                //             .required('Required'),
                //         clientEncodedKey: Yup.string()
                //             .required('Required'),
                //         txtnType: Yup.string()
                //             .required('Required'),
                //         chequeNo: Yup.string()
                //             .required('Required'),
                //     });
                // }
           

                let allLoggedOnTills = this.props.fetchLoggedonTillsReducer.request_data.response.data.result,
                    allMyTills = [];

                    allLoggedOnTills.map(eachtill=>{
                        allMyTills.push(eachtill.tillId)
                    })

                    // if(txtOption!=="cheque"){
                    //     allTxtn =[
                    //         {label: "Repayment", value:1},
                    //         {label: "Deposit", value:2},
                    //         {label: "Withdrawal", value:3}
                    //     ]
                    // }

                    if(this.state.selectedOption && this.state.selectedOption.searchItemType===2){
                        allTxtn =[
                            {label: "Repayment", value:1},
                            // {label: "Deposit", value:2},
                            
                        ];
                    }
                    if(this.state.selectedOption && this.state.selectedOption.searchItemType===3){
                        allTxtn =[
                            {label: "Deposit", value:2},
                            {label: "Withdrawal", value:3}
                        ];
                    }

                    if(txtOption==="cheque"){
                        allTxtn =[
                            {label: "Deposit Cheque", value:4},
                            {label: "Withdrawal with Cheque", value:5},
                            // {label: "Clear Cheque", value:6}
                        ];
                    }
        return (
            <div className="tellering-section">
                <div className="tiller-record-form">
                    <Formik
                        initialValues={{
                            clientEncodedKey: '',
                            chosenAccountNum: '',
                            txtnType: '',
                            amount: '',
                            remarks:'',
                            referenceID:'',
                            chequeNo:''
                        }}
                        // validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // same shape as initial values
                            // console.log("txtnType", values.txtnType)
                            let transactionAction;
                            if (values.txtnType === 1) {
                                transactionAction = "loanrepaymentwithteller"
                            }
                            if (values.txtnType === 2) {
                                transactionAction = "accountdepositwithteller"
                            }
                            if (values.txtnType === 3) {
                                transactionAction = "accountwithdrawalwithteller"
                            }

                            if (values.txtnType === 4) {
                                transactionAction = "chequedepositwithteller"
                            }
                            if (values.txtnType === 5) {
                                transactionAction = "chequewithdrawalwithteller"
                            }
                            // if (values.txtnType === 6) {
                            //     transactionAction = "clearcheque"
                            // }

                            let requestPayload = {
                                tillId: this.state.selectedTillData.tillId,
                                accountEncodedKey: values.chosenAccountNum,
                                amount: parseFloat(values.amount.replace(/,/g, '')),
                                clientEncodedKey: selectedCustomer.clientEncodedKey,
                            }

                            if (values.txtnType === 1) {
                                requestPayload.transactionReference = values.referenceID
                                requestPayload.referenceID = values.referenceID
                                requestPayload.remarks = values.remarks
                            }

                            if (values.txtnType === 2) {
                                requestPayload.referenceID = values.referenceID
                                requestPayload.remarks = values.remarks
                                requestPayload.accountNumber = selectOtherCustomerAccount.searchKey
                            }

                            if (values.txtnType === 3) {
                                requestPayload.transactionReference = values.referenceID
                                requestPayload.referenceID = values.referenceID
                                requestPayload.notes = values.remarks
                            }

                            if (values.txtnType === 4 || values.txtnType === 5) {
                                delete requestPayload.accountEncodedKey;
                                requestPayload.chequeNo = values.referenceID
                                requestPayload.accountNumber = selectOtherCustomerAccount.searchKey
                                requestPayload.remarks = values.remarks
                                requestPayload.referenceID = values.referenceID
                            }

                           

                            if (values.txtnType === 6) {
                                requestPayload  = {
                                    accountNumber : selectOtherCustomerAccount.searchKey,
                                    externalReferenceId : values.referenceID
                                }
                            }

                            this.postNewTransaction(requestPayload, transactionAction)
                                .then(() => {
                                    if (this.props.postATransactionReducer.request_status === dashboardConstants.POST_TRANSACTION_SUCCESS) {
                                        resetForm()
                                        this.setState({selectOtherCustomerAccount:null, selectedCustomer: null, showMandateLink:false})
                                        this.fetchTillTransactions(this.state.selectedTillData.tillId)
                                    }
                                })

                            // console.log("lalala", requestPayload);

                        }}
                    >
                        {({ handleSubmit,
                            handleChange,
                            setFieldValue,
                            handleBlur,
                            resetForm,
                            setErrors,
                            values,
                            touched,
                            isValid,
                            errors, }) => 
                            {
                            return (
                            <Form noValidate
                                onSubmit={handleSubmit}>
                                
                                <div className="transaction-options">
                                    <div className={txtOption==="cash" ?"eachtxtn-option active-txtn" :"eachtxtn-option"} 
                                        onClick={()=>{
                                            setErrors({})
                                            this.setState({txtOption:"cash"})
                                        }}
                                    >
                                        <div>Cash Transaction </div>
                                    </div>
                                    <div className={txtOption==="cheque" ?"eachtxtn-option active-txtn" :"eachtxtn-option"} 
                                        onClick={()=>{
                                            setErrors({})
                                            this.setState({txtOption:"cheque"})
                                        }}
                                    >
                                        <div>Cheque Transaction</div>
                                    </div>
                                </div>
                                {txtOption==="cash" &&
                                    <div>
                                        <Form.Group>
                                            <div className="withasync">
                                                <Form.Label className="block-level">Client</Form.Label>
                                                <div>
                                                    <div>
                                                        <AsyncSelect
                                                            cacheOptions
                                                            value={selectedCustomer}
                                                            // getOptionLabel={e => e.clientName}
                                                            getOptionLabel={this.getSearchOptionForCustomerLabel}
                                                            getOptionValue={this.getSearchForCustomerOptionValue}
                                                            // getOptionValue={e => e.clientEncodedKey}
                                                            noOptionsMessage={this.noOptionsForCustomerMessage}
                                                            loadOptions={this.loadSearchResults}
                                                            defaultOptions={defaultOptions}
                                                            name="clientEncodedKey"
                                                            placeholder="Search Client Name"
                                                            className={errors.clientEncodedKey && touched.clientEncodedKey ? "is-invalid custom" : null}
                                                            onChange={(e) => {

                                                                setFieldValue("clientEncodedKey", e.clientEncodedKey)
                                                                this.handleSelectedCustomer(e)

                                                            }}
                                                            // onChange={this.handleSelectedCustomer}
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
                                                    {this.state.showMandateLink && <span onClick={() => this.showViewCustomer(this.selectedCustomer)}>View Client</span>}
                                                </div>
                                            </div>
                                        </Form.Group>
                                        <Form.Group>
                                            <div className="withasync">
                                                <Form.Label className="block-level">Account</Form.Label>
                                                <div className="txtn-wrap">
                                                    <div className="select-drop foraccount">
                                                        <AsyncSelect
                                                            cacheOptions
                                                            value={selectOtherCustomerAccount}
                                                            noOptionsMessage={this.noOptionsForAccountMessage}
                                                            getOptionValue={this.getSearchForAccountOptionValue}
                                                            getOptionLabel={this.getSearchOptionForAccountLabel}
                                                            defaultOptions={defaultAccountOptions !== "" ? defaultAccountOptions : null}
                                                            loadOptions={this.initiateAccountSearch}
                                                            placeholder="Search Accounts"
                                                            name="chosenAccountNum"
                                                            className={errors.chosenAccountNum && touched.chosenAccountNum ? "is-invalid" : ""}
                                                            onChange={(selectedOption) => {
                                                                setFieldValue('chosenAccountNum', selectedOption.searchItemEncodedKey);
                                                                // console.log("calleded", selectedOption)
                                                                
                                                                if(values.clientEncodedKey===""){
                                                                    setFieldValue("clientEncodedKey", selectedOption.clientEncodedKey)
                                                                    this.handleSelectedAccount(selectedOption)
                                                                }
                                                                
                                                                // this.getSearchOptionForCustomerLabel(selectedOption)
                                                                // this.getSearchForCustomerOptionValue(selectedOption)
                                                                // if (this.state.isCustommerAccountsFetchedWithKey !== true) {


                                                                this.setState({
                                                                    selectedOption,
                                                                    selectedCustomer: selectedOption,
                                                                    selectOtherCustomerAccount: selectedOption,

                                                                });

                                                            }} />

                                                        {errors.chosenAccountNum && touched.chosenAccountNum ? (
                                                            <span className="invalid-feedback">{errors.chosenAccountNum}</span>
                                                        ) : null}
                                                    </div>
                                                    {(this.state.showMandateLink && values.chosenAccountNum!=="")  && <span onClick={() => { this.showViewCustomer() }}>View Account</span>}
                                                    {/* {this.state.selectedOption && <span onClick={() => { this.showViewAccount(this.state.selectedCustomer) }}>View Account</span>} */}
                                                </div>
                                            </div>

                                        </Form.Group>
                                        {/* {this.state.selectedOption && */}
                                            <Form.Group>
                                                <Form.Label className="block-level">Transaction</Form.Label>

                                                <div className="select-drop pr-10">
                                                    <Select
                                                        options={ allTxtn}
                                                        // options={this.state.selectedOption ? allTxtn : []}
                                                        ref={ref => {
                                                            this.selectRef = ref;
                                                        }}

                                                        onChange={(selectedTxtn) => {
                                                            this.setState({ selectedTxtn });
                                                            if (selectedTxtn) {
                                                                // errors.txtnType = null
                                                                values.txtnType = selectedTxtn.value
                                                            }
                                                        }}
                                                        noOptionsMessage={() => 'Account must be selected'}
                                                        className={errors.txtnType && touched.txtnType ? "is-invalid" : ""}
                                                        name="txtnType"
                                                        required
                                                    />

                                                    {errors.txtnType && touched.txtnType ? (
                                                        <span className="invalid-feedback">{errors.txtnType}</span>
                                                    ) : null}
                                                </div>

                                            </Form.Group>
                                        {/* } */}
                                        <Form.Group className="mr-10">
                                            <Form.Label className="block-level">Amount</Form.Label>
                                            <Form.Control type="text"
                                                name="amount"
                                                value={numberWithCommas(values.amount)}
                                                onChange={handleChange}
                                                className={errors.amount && touched.amount ? "is-invalid" : ""}
                                                required />

                                            {errors.amount && touched.amount ? (
                                                <span className="invalid-feedback">{errors.amount}</span>
                                            ) : null}
                                        </Form.Group>
                                        <Form.Group className="mr-10">
                                            <Form.Label className="block-level">Reference ID(Slip No)</Form.Label>
                                            <Form.Control type="text"
                                                name="referenceID"
                                                value={values.referenceID}
                                                onChange={handleChange}
                                                className={errors.referenceID && touched.referenceID ? "is-invalid" : ""}
                                                required />

                                            {errors.referenceID && touched.referenceID ? (
                                                <span className="invalid-feedback">{errors.referenceID}</span>
                                            ) : null}
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label className="block-level">Remarks</Form.Label>
                                            <Form.Control as="textarea"
                                                rows="3"
                                                onChange={handleChange}
                                                name="remarks"
                                                value={values.remarks}
                                                className={errors.remarks && touched.remarks ? "is-invalid form-control form-control-sm" : null}
                                            />
                                            {errors.remarks && touched.remarks ? (
                                                <span className="invalid-feedback">{errors.remarks}</span>
                                            ) : null}
                                        </Form.Group>

                                        <div className="mr-10">
                                            <div className="footer-with-cta">
                                                <Button
                                                    type="submit"
                                                    disabled={postATransactionRequest.is_request_processing}
                                                >

                                                    {postATransactionRequest.is_request_processing ? "Please wait..." : "Post transaction"}
                                                </Button>
                                                <Button variant="secondary"
                                                    disabled={postATransactionRequest.is_request_processing}
                                                    onClick={() => {
                                                        this.selectRef.select.clearValue();
                                                        this.setState({ selectOtherCustomerAccount: null, selectedTxtn: null, selectedCustomer: null, showMandateLink: false })
                                                        resetForm()
                                                    }}>
                                                    Clear
                                            </Button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {txtOption==="cheque" &&
                                    <div>
                                        <Form.Group>
                                            <div className="withasync">
                                                <Form.Label className="block-level">Client</Form.Label>
                                                <div>
                                                    <div>
                                                        <AsyncSelect
                                                            cacheOptions
                                                            value={selectedCustomer}
                                                            // getOptionLabel={e => e.clientName}
                                                            getOptionLabel={this.getSearchOptionForCustomerLabel}
                                                            getOptionValue={this.getSearchForCustomerOptionValue}
                                                            // getOptionValue={e => e.clientEncodedKey}
                                                            noOptionsMessage={this.noOptionsForCustomerMessage}
                                                            loadOptions={this.loadSearchResults}
                                                            defaultOptions={defaultOptions}
                                                            name="clientEncodedKey"
                                                            placeholder="Search Client Name"
                                                            className={errors.clientEncodedKey && touched.clientEncodedKey ? "is-invalid custom" : null}
                                                            onChange={(e) => {

                                                                setFieldValue("clientEncodedKey", e.clientEncodedKey)
                                                                this.handleSelectedCustomer(e)

                                                            }}
                                                            // onChange={this.handleSelectedCustomer}
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
                                                    {this.state.showMandateLink && <span onClick={() => this.showViewCustomer(this.selectedCustomer)}>View Client</span>}
                                                </div>
                                            </div>
                                        </Form.Group>
                                        <Form.Group>
                                            <div className="withasync">
                                                <Form.Label className="block-level">Account</Form.Label>
                                                <div className="txtn-wrap">
                                                    <div className="select-drop foraccount">
                                                        <AsyncSelect
                                                            cacheOptions
                                                            value={selectOtherCustomerAccount}
                                                            noOptionsMessage={this.noOptionsForAccountMessage}
                                                            getOptionValue={this.getSearchForAccountOptionValue}
                                                            getOptionLabel={this.getSearchOptionForAccountLabel}
                                                            defaultOptions={defaultAccountOptions !== "" ? defaultAccountOptions : null}
                                                            loadOptions={this.initiateAccountSearch}
                                                            placeholder="Search Accounts"
                                                            name="chosenAccountNum"
                                                            className={errors.chosenAccountNum && touched.chosenAccountNum ? "is-invalid" : ""}
                                                            onChange={(selectedOption) => {
                                                               
                                                                setFieldValue('chosenAccountNum', selectedOption.searchItemEncodedKey);
                                                                errors.chosenAccountNum = null;
                                                                touched.chosenAccountNum = null;
                                                                // console.log("calleded", selectedOption)
                                                                // setFieldValue("clientEncodedKey", selectedOption.clientEncodedKey)
                                                                // this.handleSelectedAccount(selectedOption)
                                                                if(values.clientEncodedKey===""){
                                                                    setFieldValue("clientEncodedKey", selectedOption.clientEncodedKey)
                                                                    this.handleSelectedAccount(selectedOption)
                                                                }else{


                                                                    
                                                                }

                                                                // this.getSearchOptionForCustomerLabel(selectedOption)
                                                                // this.getSearchForCustomerOptionValue(selectedOption)
                                                                // if (this.state.isCustommerAccountsFetchedWithKey !== true) {


                                                                this.setState({
                                                                    selectedOption,
                                                                    selectedCustomer: selectedOption,
                                                                    selectOtherCustomerAccount: selectedOption,

                                                                });

                                                            }} />

                                                        {errors.chosenAccountNum && touched.chosenAccountNum ? (
                                                            <span className="invalid-feedback">{errors.chosenAccountNum}</span>
                                                        ) : null}
                                                    </div>
                                                    {(this.state.showMandateLink && values.chosenAccountNum!=="") && <span onClick={() => { this.showViewCustomer() }}>View Account</span>}
                                                    {/* {this.state.selectedOption && <span onClick={() => { this.showViewAccount(this.state.selectedCustomer) }}>View Account</span>} */}
                                                </div>
                                            </div>

                                        </Form.Group>
                                        {/* {this.state.selectedOption && */}
                                            <Form.Group>
                                                <Form.Label className="block-level">Transaction</Form.Label>

                                                <div className="select-drop pr-10">
                                                    <Select
                                                        options={allTxtn}
                                                        ref={ref => {
                                                            this.selectRef = ref;
                                                        }}

                                                        onChange={(selectedTxtn) => {
                                                            this.setState({ selectedTxtn });
                                                            if (selectedTxtn) {
                                                                errors.txtnType = null
                                                                values.txtnType = selectedTxtn.value
                                                            }
                                                        }}
                                                        className={errors.txtnType && touched.txtnType ? "is-invalid" : ""}
                                                        name="txtnType"
                                                        required
                                                    />

                                                    {errors.txtnType && touched.txtnType ? (
                                                        <span className="invalid-feedback">{errors.txtnType}</span>
                                                    ) : null}
                                                </div>

                                            </Form.Group>
                                        {/* } */}
                                        {/* {(values.txtnType !== "" && values.txtnType !== 6  ) && */}
                                            <Form.Group className="mr-10">
                                                <Form.Label className="block-level">Amount</Form.Label>
                                                <Form.Control type="text"
                                                    name="amount"
                                                    value={numberWithCommas(values.amount)}
                                                    onChange={handleChange}
                                                    className={errors.amount && touched.amount ? "is-invalid" : ""}
                                                    required />

                                                {errors.amount && touched.amount ? (
                                                    <span className="invalid-feedback">{errors.amount}</span>
                                                ) : null}
                                            </Form.Group>
                                        {/* } */}
                                        
                                            <Form.Group className="mr-10">
                                                <Form.Label className="block-level">Cheque Number</Form.Label>
                                                <Form.Control type="text"
                                                    name="chequeNo"
                                                    value={values.chequeNo}
                                                    onChange={handleChange}
                                                    className={errors.chequeNo && touched.chequeNo ? "is-invalid" : ""}
                                                    required />

                                                {errors.chequeNo && touched.chequeNo ? (
                                                    <span className="invalid-feedback">{errors.chequeNo}</span>
                                                ) : null}
                                            </Form.Group>
                                        
                                        
                                            <Form.Group className="mr-10">
                                                <Form.Label className="block-level">Reference ID</Form.Label>
                                                <Form.Control type="text"
                                                    name="referenceID"
                                                    value={values.referenceID}
                                                    onChange={handleChange}
                                                    className={errors.referenceID && touched.referenceID ? "is-invalid" : ""}
                                                    required />

                                                {errors.referenceID && touched.referenceID ? (
                                                    <span className="invalid-feedback">{errors.referenceID}</span>
                                                ) : null}
                                            </Form.Group>
                                        
                                        
                                            <Form.Group>
                                                <Form.Label className="block-level">Remarks</Form.Label>
                                                <Form.Control as="textarea"
                                                    rows="3"
                                                    onChange={handleChange}
                                                    name="remarks"
                                                    value={values.remarks}
                                                    className={errors.remarks && touched.remarks ? "is-invalid form-control form-control-sm" : null}
                                                />
                                                {errors.remarks && touched.remarks ? (
                                                    <span className="invalid-feedback">{errors.remarks}</span>
                                                ) : null}
                                            </Form.Group>
                                        

                                        <div className="mr-10">
                                            <div className="footer-with-cta">
                                                <Button
                                                    type="submit"
                                                    disabled={postATransactionRequest.is_request_processing}
                                                >

                                                    {postATransactionRequest.is_request_processing ? "Please wait..." : "Post transaction"}
                                                </Button>
                                                <Button variant="secondary"
                                                    disabled={postATransactionRequest.is_request_processing}
                                                    onClick={() => {
                                                        this.selectRef.select.clearValue();
                                                        this.setState({ selectOtherCustomerAccount: null, selectedTxtn: null, selectedCustomer: null, showMandateLink: false })
                                                        resetForm()
                                                    }}>
                                                    Clear
                                            </Button>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {postATransactionRequest.request_status === dashboardConstants.POST_TRANSACTION_SUCCESS &&
                                    <Alert variant="success">
                                        {postATransactionRequest.request_data.response.data.message && postATransactionRequest.request_data.response.data.message}
                                        {!postATransactionRequest.request_data.response.data.message && `Transaction was posted`}
                                    </Alert>
                                }
                                {postATransactionRequest.request_status === dashboardConstants.POST_TRANSACTION_FAILURE &&
                                    <Alert variant="danger">
                                        {postATransactionRequest.request_data.error}
                                    </Alert>
                                }
                            </Form>
                        )}
                            }
                    </Formik>
                </div>
            </div>
        )
    }

    renderSelectedTillDetails = ()=>{
        return(
            <div>
                {(this.state.selectedTillData  && !this.state.preloadedTillData && this.props.fetchTillTransactionsReducer.request_status === dashboardConstants.GET_TILL_TRANSACTIONS_SUCCESS) &&
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
                                                <h4>{this.state.selectedTillData.tillId}</h4>
                                                <div className="indicator-txt">Till ID</div>
                                            </div>
                                        </div>
                                        <div className="each-indicator">
                                            <div>
                                                <h4>{this.props.fetchTillTransactionsReducer.request_data.response.data.result.length}</h4>
                                                <div className="indicator-txt">Transactions</div>
                                            </div>
                                        </div>
                                        <div className="each-indicator">
                                            <div>
                                                <h4>{numberWithCommas(this.state.selectedTillData.balance, true)}</h4>
                                                <div className="indicator-txt">Expected cash till</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {(this.state.selectedTillData  && this.state.preloadedTillData) &&
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
                                                <h4>{this.state.selectedTillData.tillId}</h4>
                                                <div className="indicator-txt">Till ID</div>
                                            </div>
                                        </div>
                                        <div className="each-indicator">
                                            <div>
                                                <h4>{this.props.fetchLoggedonTillsReducer.request_data.response2.data.result.length}</h4>
                                                <div className="indicator-txt">Transactions</div>
                                            </div>
                                        </div>
                                        <div className="each-indicator">
                                            <div>
                                                <h4>{numberWithCommas(this.state.selectedTillData.balance, true)}</h4>
                                                <div className="indicator-txt">Expected cash till</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

                {(this.state.selectedTillData && !this.state.preloadedTillData)  && 
                    this.renderTillTransactions()
                }

                {(this.state.preloadedTillData && (this.props.fetchLoggedonTillsReducer.request_status===dashboardConstants.GET_LOGGEDON_TILLS_SUCCESS && this.props.fetchLoggedonTillsReducer.request_data.response2) ) && 
                    this.renderTillTransactions()
                }

            </div>
        )
    }

    renderManageTellersPending = ()=>{
        if(this.props.fetchAllTillsReducer.request_status===dashboardConstants.GET_ALL_TILLS_PENDING){
            return (
                    <div className="each-card-content">
                        <div className="loading-text">Please wait...</div>
                    </div>
               
            )
        }else return null;

    }

    renderManageTellersSuccess = ()=>{

        if(this.props.fetchAllTillsReducer.request_status===dashboardConstants.GET_ALL_TILLS_SUCCESS){
        return ( <div className="each-card-content">
                        <div className="all-indicators forteller">
                            <div className="each-indicator">
                                <div>
                                    <h4>{this.props.fetchAllTillsReducer.request_data.response2.data.openedTills}</h4>
                                    <div className="indicator-txt">Open Tills</div>
                                </div>
                            </div>
                            <div className="each-indicator">
                                <div>
                                    <h4>{numberWithCommas(this.props.fetchAllTillsReducer.request_data.response2.data.openedBalance, true)}</h4>
                                    <div className="indicator-txt">Opening Balance</div>
                                </div>
                            </div>
                            <div className="each-indicator">
                                <div>
                                    <h4>{numberWithCommas(this.props.fetchAllTillsReducer.request_data.response2.data.totalBalance, true)}</h4>
                                    <div className="indicator-txt">Expected Cash in Tills</div>
                                </div>
                            </div>
                            {
                                this.props.fetchAllTillsReducer.request_data.response2.data.result.map((eachData, index) => {
                                    return (
                                        <div className="each-indicator with-actions" key={index}>
                                            <div>
                                                <h4><span>{eachData.tillUser}</span> <span> {numberWithCommas(eachData.balance, true)} {eachData.currencyCode}</span> </h4>
                                                <div className="indicator-txt">
    
                                                    {eachData.tillAccountState === 1 &&
                                                        <div>
                                                            Opened:{getDateFromISO(eachData.dateOpened)}
                                                            <div>ID: {eachData.tillId}</div>
                                                        </div>
                                                    }
                                                    {eachData.tillAccountState === 2 &&
                                                        <div>
                                                            Closed:{getDateFromISO(eachData.dateClosed)}
                                                            <div>ID: {eachData.tillId}</div>
                                                        </div>
                                                    }
                                                    <div className="actions-drop">
                                                        <DropdownButton
                                                            size="sm"
                                                            title="Actions"
                                                            key="actionDrop"
    
                                                            className="customone"
                                                        >
                                                            {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                                                            {this.allUSerPermissions.indexOf("bnk_till_supervisor_view") > -1 &&
                                                                <Dropdown.Item eventKey="1"
                                                                    onClick={() => {
                                                                        this.showViewTill(eachData.tillId, eachData)
                                                                    }}
                                                                > <span className="hasborder">View Till</span> </Dropdown.Item>
                                                            }
                                                            {(eachData.tillAccountState === 1 && this.allUSerPermissions.indexOf("bnk_till_supervisor_add_cash") > -1) &&
                                                                <Dropdown.Item eventKey="2" onClick={() => {
                                                                    this.showAddRemoveCashToTill("add", eachData)
                                                                }}> <span>Add Cash</span> </Dropdown.Item>
                                                            }
                                                            {(eachData.tillAccountState === 1 && this.allUSerPermissions.indexOf("bnk_till_supervisor_remove_cash") > -1) &&
                                                                <Dropdown.Item eventKey="3" onClick={() => {
                                                                    this.showAddRemoveCashToTill("remove", eachData)
                                                                }}> <span className="hasborder">Remove Cash</span> </Dropdown.Item>
                                                            }
                                                            {(eachData.tillAccountState === 2 && this.allUSerPermissions.indexOf("bnk_till_supervisor_undo_close") > -1) &&
                                                                <Dropdown.Item eventKey="4" onClick={() => {
                                                                    this.showCloseTill("undoCloseTill", eachData)
                                                                }}> <span>Undo Cose Till</span> </Dropdown.Item>
                                                            }
                                                            {eachData.tillAccountState === 1 &&
                                                                <Dropdown.Item eventKey="5" onClick={() => {
                                                                    this.showCloseTill("closeTill", eachData)
                                                                }}> <span>Close Till</span> </Dropdown.Item>
                                                            }
    
                                                        </DropdownButton>
                                                    </div>
                                                </div>
    
                                            </div>
                                        </div>
                                    )
                                })
                            }
    
    
    
                        </div>
                    </div>
        )
                        }
                        else return null;

    }

    renderManageTellersFailure = ()=>{
        if(this.props.fetchAllTillsReducer.request_status===dashboardConstants.GET_ALL_TILLS_FAILURE){
return (<div className="each-card-content">
        <Alert variant="danger">
            {this.props.fetchAllTillsReducer.request_data.error}
        </Alert>
    </div>);
        }

    }
    renderManageTellers = ()=>{
      
            return (
                <div className="each-card mt-20">
                    <div className="each-card-heading">
                        <h4>Teller Management</h4>
                        <div className="table-helper mb-10">
                                        <input type="checkbox" name="" 
                                             onChange={(e)=>{this.setState({includeClosed:e.target.checked},()=>{this.fetchAllTills();});}}
                                           
                                            checked={this.state.includeClosed??false}
                                            id="showFullDetails" />
                                        <label htmlFor="showFullDetails">Include closed Till?</label>
                                    </div>
                    </div>
                   {this.renderManageTellersPending()}
                   {this.renderManageTellersSuccess()}
                   {this.renderManageTellersFailure()}
                </div>
            )
        
        
    }

    renderLoggedOnTillsAndTxtn = ()=>{
        if(this.props.fetchLoggedonTillsReducer.request_status===dashboardConstants.GET_LOGGEDON_TILLS_PENDING){
            return(
                <div>
                    <div className="each-card centered-item">
                        <div className="loading-text">Please wait...</div>
                    </div>
                </div>
            )
        }

        if(this.props.fetchLoggedonTillsReducer.request_status===dashboardConstants.GET_LOGGEDON_TILLS_SUCCESS){
            let allTxtn;
           
            

                let allLoggedOnTills = this.props.fetchLoggedonTillsReducer.request_data.response.data.result,
                    allMyTills = [];

                    allLoggedOnTills.map(eachtill=>{
                        allMyTills.push(eachtill.tillId)
                    })

                    
                   

                 
                    return (
                        <div >
                            {allMyTills.length>=1 && 
                                <div className="each-card">
                                    <div className="each-card-heading">
                                        <h4>Tellering</h4>
                                        <div className="tellerid-wrap">
                                            {this.state.selectedTill && 
                                                <div className="selected-id">
                                                    {this.state.selectedTill}
                                                </div>
                                            }

                                            {allMyTills.length>=1 &&
                                                <div className="select-tillid">
                                                    <select id="tildId"
                                                        onChange={(e)=>{
                                                            let selectedTillData = allLoggedOnTills.filter(eachTill=>eachTill.tillId===e.target.value)[0];
                                                            // console.log("zelect is", selectedTillData)
                                                            this.fetchTillTransactions(e.target.value);
                                                            this.setState({selectedTill: e.target.value, selectedTillData, preloadedTillData: false})
                                                        }}
                                                        name="selectedTill"
                                                        defaultValue={allMyTills.length>=1 ? allMyTills[0] : null}
                                                        value={this.state.selectedTill}
                                                    
                                                        
                                                        className="countdropdown form-control form-control-sm">
                                                            
                                                            {allMyTills.map((eachTill, index)=>{
                                                                
                                                                return(
                                                                        <option  key={index} value={eachTill}>{eachTill}</option>
                                                                    )
                                                                })
                                                            }
                                                        
                                                    </select>
                                                </div>
                                            }
                                        </div>
                                        
                                    </div>
                                    {this.state.selectedTill && 
                                        <div className="each-card-content">
                                            {this.renderPostTransaction()}
                                            
                                            {this.renderSelectedTillDetails()}
                                            
                                        </div>
                                    }
                                </div>
                            }
                            {/* {this.props.getDashboardStats.request_status ===dashboardConstants.GET_DASHOBOARD_DATA_SUCCESS &&
                                this.renderManageTellers()
                            } */}
                        </div>
                    )
        }

        if(this.props.fetchLoggedonTillsReducer.request_status===dashboardConstants.GET_LOGGEDON_TILLS_FAILURE){
            return(
                <div >
                    <div className="each-card">
                        <Alert variant="danger">
                            {this.props.fetchLoggedonTillsReducer.request_data.error}
                        </Alert>
                    </div>
                </div>
            )
        }
        
    }

    renderTellerManagement = ()=>{
        return(
            <div>
                {this.renderLoggedOnTillsAndTxtn()}
                {(this.allUSerPermissions.indexOf("bnk_till_supervisor_add_cash") > -1 ||
                    this.allUSerPermissions.indexOf("bnk_till_supervisor_view") > -1 ||
                    this.allUSerPermissions.indexOf("bnk_till_supervisor_remove_cash") > -1 ||
                    this.allUSerPermissions.indexOf("bnk_till_supervisor_undo_close") > -1) &&
                    this.renderManageTellers()
                }
            </div>
        )
    }

    renderIndicators = ()=>{
        let getDashboardStatsRequest = this.props.getDashboardStats;
        if(getDashboardStatsRequest.request_status===dashboardConstants.GET_DASHOBOARD_DATA_PENDING){
            return(
                <div className="each-card mt-20">
                    <div className="each-card-heading">
                        <h4>Indicators</h4>
                    </div>
                    <div className="each-card-content centered-item">
                        <div className="loading-text">Please wait... </div>
                    </div>
                </div>
            )
        }
        if(getDashboardStatsRequest.request_status===dashboardConstants.GET_DASHOBOARD_DATA_SUCCESS){
            let dashboardData =  this.props.getDashboardStats.request_data.response.data;
            return (
                <div className="each-card mt-20">
                    <div className="each-card-heading">
                        <h4>Indicators</h4>
                    </div>
                    <div className="each-card-content">
                        <div className="all-indicators">
                            <div className="each-indicator">
                                <div>
                                    <h4>{numberWithCommas(dashboardData.activeCustomers)} </h4>
                                    <div className="indicator-txt">Active Customers</div>
                                </div>
                            </div>
                            <div className="each-indicator">
                                <div>
                                    <h4>{numberWithCommas(dashboardData.users)}</h4>
                                    <div className="indicator-txt">Number of Users</div>
                                </div>
                            </div>
                            <div className="each-indicator">
                                <div>
                                    <h4>{numberWithCommas(dashboardData.loansAwaitingApproval)}</h4>
                                    <div className="indicator-txt">Loans Awaiting Approval</div>
                                </div>
                            </div>
                            <div className="each-indicator">
                                <div>
                                    <h4>{numberWithCommas(dashboardData.totalDeposits, true)}</h4>
                                    <div className="indicator-txt">Total deposit</div>
                                </div>
                            </div>

                            <div className="each-indicator">
                                <div>
                                    <h4>{numberWithCommas(dashboardData.totalLoanPortfolio, true)}</h4>
                                    <div className="indicator-txt">Gross loan portfolio</div>
                                </div>
                            </div>
                            <div className="each-indicator">
                                <div>
                                    <h4>{numberWithCommas(dashboardData.activeSavings, true)}</h4>
                                    <div className="indicator-txt">Active Savings</div>
                                </div>
                            </div>
                            <div className="each-indicator">
                                <div>
                                    <h4>{numberWithCommas(dashboardData.parAbove30Days)}</h4>
                                    <div className="indicator-txt">PAR &gt; 30 Days</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            )
        }

        if(getDashboardStatsRequest.request_status===dashboardConstants.GET_DASHOBOARD_DATA_FAILURE){
            return (
                <div className="each-card mt-20">
                    <div className="each-card-heading">
                        <h4>Indicators</h4>
                    </div>
                    <div className="each-card-content">
                        {(this.props.getDashboardStatsRequest && this.props.getDashboardStatsRequest.request_data) &&
                            <Alert variant="danger">
                                {this.props.getDashboardStatsRequest.request_data.error}
                            </Alert>
                        }
                    </div>
                </div>
            )
        }
    }

    renderTaskSummary = ()=>{
        let getDashboardStatsRequest = this.props.getDashboardStats;
        if(getDashboardStatsRequest.request_status===dashboardConstants.GET_DASHOBOARD_DATA_PENDING){
            return (
                <div className="each-card">
                    <div className="each-card-heading">
                        <h4>Your Task</h4>
                        <div className="card-actions">
                            <div className="each-cardaction" onClick={this.handleShowNewTask}>
                                <div className="cardaction-ico">
                                    <img src={AddIco} alt="" />
                                </div>
                                <div className="cardaction-txt">New Task</div>
                            </div>
                            <div className="each-cardaction" onClick={()=>history.push("/my-profile/tasks")}>
                                <div className="cardaction-ico">
                                    <img src={ListIco} alt="" />
                                </div>
                                <div className="cardaction-txt">All Tasks</div>
                            </div>
                        </div>
                    </div>
                    <div className="each-card-content centered-item">
                        <div className="loading-text">Please wait... </div>
                    </div>
                </div>
            )
        }
        if(getDashboardStatsRequest.request_status===dashboardConstants.GET_DASHOBOARD_DATA_SUCCESS){
            let dashboardData =  this.props.getDashboardStats.request_data.response2;
            if(dashboardData){
                return (
                    <div className="each-card">
                        <div className="each-card-heading">
                            <h4>Your Task</h4>
                            <div className="card-actions">
                                <div className="each-cardaction" onClick={this.handleShowNewTask}>
                                    <div className="cardaction-ico">
                                        <img src={AddIco} alt="" />
                                    </div>
                                    <div className="cardaction-txt">New Task</div>
                                </div>
                                <div className="each-cardaction" onClick={()=>history.push("/my-profile/tasks")}>
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
                                    <h4>{numberWithCommas(dashboardData.data.overdue)}</h4>
                                    <div className="stat-xtxt">OVERDUE</div>
                                </div>
                                <div className="each-task-stat">
                                    <h4>{numberWithCommas(dashboardData.data.dueToday)}</h4>
                                    <div className="stat-xtxt">DUE TODAY</div>
                                </div>
                                <div className="each-task-stat">
                                    <h4>{numberWithCommas(dashboardData.data.upcoming)}</h4>
                                    <div className="stat-xtxt">UPCOMING</div>
                                </div>
                                <div className="each-task-stat">
                                    <h4>{numberWithCommas(dashboardData.data.closed)}</h4>
                                    <div className="stat-xtxt">CLOSED</div>
                                </div>
                            </div>
                            {dashboardData.data.dueToday===0 &&
                                <div className="task-stat-msg">You don't have any tasks due at the moment</div>
                            }   
                            
                        </div>
                    </div>
                )
                
            } else {
                return (
                    <div className="each-card">
                        <div className="each-card-heading">
                            <h4>Your Task</h4>
                            <div className="card-actions">
                                <div className="each-cardaction" onClick={this.handleShowNewTask}>
                                    <div className="cardaction-ico">
                                        <img src={AddIco} alt="" />
                                    </div>
                                    <div className="cardaction-txt">New Task</div>
                                </div>
                            </div>
                        </div>
                        <div className="each-card-content">
                            <div className="task-stat-msg">Unable to load tasks at the moment</div>
                        </div>
                    </div>
                )
            }
        }
    }


    renderDashboardWrap = () => {
        
        return (
            <div className="dashboard-container">
                <div className="dashboard-section">
                    {this.renderTaskSummary()}
                    {this.renderIndicators()}
                    {/* <div className="each-card mt-20">
                        <div className="each-card-heading">
                            <h4>Latest Activity</h4>
                        </div>
                        {this.renderAllActivies()}
                    </div> */}
                    <ActivitiesBox
                        activityType = "logged"
                    />
                </div>
                <div className="dashboard-section">
                    {this.renderTellerManagement()}
                </div>
                
                
                
                
            </div>
        )
    }

    handleShowNewTask = () => {
        // if(this.props.writeOffALoanReducer.is_request_processing===false){
            // this.props.dispatch(loanActions.writeOffALoan("CLEAR"));
            this.setState({ displayNewTask: true })
        // }
    };
    handleCloseNewTask = () => {
        // this.props.dispatch(dashboardActions.reverseATransaction("CLEAR"));
        this.setState({ displayNewTask: false  })
    };

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
                        <CreateNewTask source="dashboard"   closeNewTask={this.handleCloseNewTask} showNewTask={this.state.displayNewTask} />
                        {this.state.showNewTill && this.renderOpenTillWrap()}
                        {this.state.addCashToTill && this.renderAddRemoveCashToTillWrap(this.state.tillActionData,this.state.tillAction)}
                        {this.state.closeUndoCloseTill && this.renderCloseUndoCloseTillWrap(this.state.tillActionData,this.state.tillAction)}
                        {this.state.closeViewTill && this.renderViewTillWrap(this.state.tillToView, this.state.allTills)}
                        {this.state.closeViewCustomer && this.renderViewCustomerWrap(this.state.selectedCustomer)}
                        {this.state.closeViewAccount && this.renderViewAccountWrap(this.state.selectedCustomer)}
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
        postATransactionReducer: state.dashboardReducers.postATransactionReducer,
        getLoggedInUserActivitiesReducer: state.dashboardReducers.getLoggedInUserActivitiesReducer,
        searchForCustomerReducer : state.dashboardReducers.searchForCustomerReducer,
        getAClientDepositAccountReducer: state.depositsReducers.getAClientDepositAccountReducer,
        searchAccountNumbersReducer: state.depositsReducers.searchAccountNumbersReducer,
        searchCustomerAccountReducer: state.depositsReducers.searchCustomerAccountReducer,
        searchForAccountsWithCustomerKeyReducer: state.depositsReducers.searchForAccountsWithCustomerKeyReducer,
        
        fetchLoggedonTillsReducer: state.dashboardReducers.fetchLoggedonTillsReducer,
        fetchAllTillsReducer: state.dashboardReducers.fetchAllTillsReducer,
        openATillReducer: state.dashboardReducers.openATillReducer,
        fetchTillTransactionsReducer: state.dashboardReducers.fetchTillTransactionsReducer,
        addRemoveCashToTillReducer: state.dashboardReducers.addRemoveCashToTillReducer,
        closeUndoCloseToTillReducer: state.dashboardReducers.closeUndoCloseToTillReducer,
        
        fetchManadateReducer: state.dashboardReducers.fetchManadateReducer,
    };
}

export default connect(mapStateToProps)(DashboardLanding);