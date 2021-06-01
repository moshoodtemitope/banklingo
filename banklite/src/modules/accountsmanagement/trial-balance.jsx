import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";
import  DatePickerEx from "react-datepicker";

import Form from 'react-bootstrap/Form'
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
// import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import {allowNumbersOnly, numberWithCommas} from '../../shared/utils';
import DropdownButton from 'react-bootstrap/DropdownButton'
import {acoountingActions} from '../../redux/actions/accounting/accounting.action';
import {accountingConstants} from '../../redux/actiontypes/accounting/accounting.constants'

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import {branchActions, branchConstants} from '../../redux/actions/administration/branch-management.actions';
import Alert from 'react-bootstrap/Alert'
import "./accountsmanagement.scss"; 
import AccountingNav from './_menu'

// import {branchActions,branchConstants} from '../../redux/actions/administration/branch-management.actions';



class TrialBalance extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            dob:'',
            startDate:'',
            endDate:'',
            branchId:'',
            invalidDate:false,
            isPrintable:false,
            selectedCurrency: "000"
        }

        
    }

    componentDidMount(){
        this.fetchBranchesList();
    }

    fetchBranchesList = (tempData) =>{
        const {dispatch} = this.props;
        
        // dispatch(branchActions.fetchBranchesList("CLEAR"));
        dispatch(branchActions.fetchBranchesList(true));

        dispatch(acoountingActions.getTrialBalance("CLEAR"));
        
    }

    // setStartDate=(e)=>{

    //     this.setState({startDate:e.target.value});
    // }

    // setEndDate=(e)=>{

    //     this.setState({endDate:e.target.value});
    // }

    handleStartDatePicker = (startDate) => {
        startDate.setHours(startDate.getHours() + 1);
        
        this.setState({ startDate });
    }

    handleEndDatePicker = (endDate) => {
        endDate.setHours(endDate.getHours() + 1);
       
        this.setState({ endDate });
    }

    

    fetchTrialBalance = (payload, tempData)=>{
        
        const {dispatch} = this.props;
            // let {endDate,startDate,PageSize,CurrentPage,branchId}= this.state;

            // dispatch(acoountingActions.getProfitAndLoss(payload));

        // if(endDate!=="" && startDate!==""){
        //     let payload ={
        //         branchId: branchId,
        //         Month:parseInt(endDate),
        //         Year:parseInt(startDate),
        //         PageSize:parseInt(PageSize),
        //         CurrentPage:parseInt(CurrentPage),
        //     }

            if(tempData){
                dispatch(acoountingActions.getTrialBalance(payload, tempData));
            }else{
                dispatch(acoountingActions.getTrialBalance(payload));
            }
        // }else{
        //     return false;
        // }
        
    }

    

    exportTrialBalance = () => {
        const { dispatch } = this.props;
        let
            {branchId, startDate, endDate } = this.state;
        if(endDate!=="" && startDate!=="" && branchId!==""){
            // if(endDate!==undefined){
            //     endDate = endDate.toISOString()
            // }
            // if(startDate!==undefined){
            //     startDate = startDate.toISOString()
            // }
            endDate = endDate.toISOString();
            startDate = startDate.toISOString();
            let payload = {
                    branchId: branchId.value,
                    StartDate: startDate,
                    EndDate: endDate,
            }

            let payloadSend = `BranchId=${payload.branchId}&StartDate=${payload.StartDate}&EndDate=${payload.EndDate}&PageSize=50&CurrentPage=1`;
            dispatch(acoountingActions.exportTrialBalance(payloadSend));
        }

    }

    selectACurrency = (selectedCurrency)=>{
        
        if(this.props.getTrialBalanceReducer.is_request_processing===false){
            
            this.setState({selectedCurrency})
        }
    }

    renderSubTabs =(allTabData)=>{
        let {selectedCurrency} = this.state;
        
        // this.setState({selectedCurrency: allTabData[0].code})
        return(
            <div className='subMenu'>
                <div className='content-container'>
                    <ul className='nav'>
                        <li>
                            <div onClick={()=>this.selectACurrency("000")} className={this.state.selectedCurrency==="000"?"eachtab-option active-tab-option": "eachtab-option"}>All Currencies</div>
                        </li>
                        {Array.isArray(allTabData) && allTabData.map((eachData, index) => (
                            <li key={eachData.name}>
                                <div onClick={()=>this.selectACurrency(eachData.code)} className={this.state.selectedCurrency===eachData.code?"eachtab-option active-tab-option": "eachtab-option"}>{eachData.name}({eachData.code})</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
    
    makePrintable =()=>{
        this.setState({isPrintable:true});
    }
    renderOptions = ()=>{
        let getTrialBalanceRequest = this.props.getTrialBalanceReducer,
            fetchBranchesListRequest = this.props.fetchBranchesListReducer;
        

        switch (fetchBranchesListRequest.request_status){
            case (branchConstants.FETCH_BRANCHES_LIST_PENDING):
                return(
                    <div className="loading-content"> 
                        <div className="loading-text mb-20">Please wait... </div>
                    </div>
                )
            case (branchConstants.FETCH_BRANCHES_LIST_SUCCESS):
                let  validationSchema = Yup.object().shape({
                    endDate: Yup.string()
                        .required('Please select end date').nullable(),
                    startDate: Yup.string()
                        .required('Please select start date').nullable(),
                    branchId: Yup.string()
                        .required('Please select a branch').nullable()
                });
                if(fetchBranchesListRequest.request_data.response2){
                    let branchList = fetchBranchesListRequest.request_data.response.data;
                    let currencyList = fetchBranchesListRequest.request_data.response2.data;
                    if(branchList.length>=1){
                        let branchData = [];

                        branchList.map((eachBranch, index)=>{
                            branchData.push({value:eachBranch.id, label:eachBranch.name})
                        })
                        return (
                            <div>
                                {this.renderSubTabs(currencyList)}
                                <div className="heading-actions mt-20">
                                    <Formik
                                        initialValues={{
                                            branchId: '',
                                            endDate: '',
                                            startDate: ''
                                        }}
                                        validationSchema={Yup.object().shape({
                                            endDate: Yup.string()
                                                .required('Please select end date').nullable(),
                                            startDate: Yup.string()
                                                .required('Please select start date').nullable(),
                                            branchId: Yup.string()
                                                .required('Please select a branch').nullable()
                                        })}
                                        // validateOnMount ={true}
                                        isValid={false}
                                        onSubmit={(values, { resetForm }, errors, ) => {
                                            
                                            let startDateTemp = new Date(this.state.startDate),
                                                endDateTemp = new Date(this.state.endDate);

                                            let {branchId}= this.state;

                                                if (startDateTemp <= endDateTemp) {

                                                    this.setState({ invalidDate: false, branchId:values.branchId.value });

                                                    
                                                    let payload = {
                                                        branchId: values.branchId.value,
                                                        // StartDate: values.startDate.toISOString(),
                                                        StartDate: this.state.startDate.toISOString(),
                                                        EndDate: this.state.endDate.toISOString(),
                                                        CurrencyCode: this.state.selectedCurrency,
                                                        // EndDate: values.endDate.toISOString(),
                                                    }

                                                    // console.log("-----", values.endDate);
                                                    let saveRequestData = this.props.getTrialBalanceReducer.request_data !== undefined && this.props.getTrialBalanceReducer.request_data.response !== undefined && this.props.getTrialBalanceReducer.request_data.response.data !== undefined ? this.props.getTrialBalanceReducer.request_data.response.data : null;
                                                    // let saveRequestData= this.props.getProfitAndLossReducer.request_data!==undefined ?this.props.getProfitAndLossReducer.request_data.data:null;

                                                    if (saveRequestData !== null) {

                                                        this.fetchTrialBalance(payload, saveRequestData.result);
                                                    } else {

                                                        this.fetchTrialBalance(payload);
                                                    }


                                                } else {
                                                    this.setState({ invalidDate: true })
                                                }


                                        }}
                                    >
                                        {({ handleSubmit,
                                            handleChange,
                                            handleBlur,
                                            resetForm,
                                            values,
                                            setFieldValue,
                                            setFieldTouched,
                                            touched,
                                            isValid,
                                            errors, }) => (

                                                <Form className="one-liner"
                                                    noValidate
                                                    onSubmit={handleSubmit}>
                                                    
                                                    <Form.Group controlId="periodOptionChosen"
                                                        className={(errors.branchId && touched.branchId) || this.state.invalidBranch ? "has-invaliderror" : null}
                                                    >
                                                        <Form.Label>Branch</Form.Label>
                                                        {/* <select id="branchId"
                                                            onChange={handleChange}
                                                            name="branchId"
                                                            value={values.branchId}
                                                            required
                                                            className="countdropdown form-control form-control-sm">
                                                            {branchData.map((eachBranch, index)=>{
                                                                return(
                                                                    <option  key={`br-${index}`} value={eachBranch.value}>{eachBranch.label}</option>
                                                                )
                                                            })}

                                                            
                                                        </select>
                                                        {errors.branchId && touched.branchId ? (
                                                            <span className="invalid-feedback">{errors.branchId}</span>
                                                        ) : null} */}
                                                        <Select
                                                            options={branchData}
                                                            // onBlur={setFieldValue}
                                                            onChange={(value) => {
                                                                setFieldValue('branchId', value)
                                                                this.setState({branchId: value})
                                                            }}
                                                            onBlur={()=> setFieldTouched('branchId', true)}
                                                            // onChange={setFieldValue}
                                                            // onBlur={setFieldTouched}
                                                            // onChange={(selectedBranch) => {
                                                            //     this.setState({ selectedBranch, branchId:parseInt(selectedBranch.value), invalidBranch:false });
                                                            //     errors.branchId = null;
                                                            //     values.branchId = selectedBranch.value;

                                                            //     // handleChange("branchId")(selectedBranch.value);
                                                            // }}
                                                            // onChange={setFieldValue}
                                                            
                                                            className={(errors.branchId && touched.branchId) || this.state.invalidBranch ? "is-invalid branchfilter" : "branchfilter"}
                                                            // value="branchId"
                                                            name="branchId"
                                                            // value={this.state.branchId}
                                                            required
                                                        />
                                                        {errors.branchId && touched.branchId ? (
                                                            <span className="invalid-feedback">{errors.branchId}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                    <Form.Group controlId="periodOptionChosen"
                                                        className={errors.startDate && touched.startDate ? "has-invaliderror" : null}
                                                    >
                                                        <Form.Label>From</Form.Label>

                                                        <DatePickerEx placeholderText="Choose start date"
                                                            onChangeRaw={this.handleDateChangeRaw}
                                                            onChange={(e)=>{this.handleStartDatePicker(e); setFieldValue('startDate', e)}}
                                                            selected={this.state.startDate}
                                                            dateFormat={window.dateformat}
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            placeholderText="Start date"
                                                                autoComplete="new-password"
                                                            maxDate={new Date()}
                                                            className={errors.startDate && touched.startDate ? "is-invalid form-control form-control-sm" : "form-control form-control-sm"}
                                                        />
                                                        {errors.startDate && touched.startDate ? (
                                                            <span className="invalid-feedback">{errors.startDate}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                    <Form.Group controlId="monthsDropdown"
                                                        className={errors.endDate && touched.endDate ? "has-invaliderror" : null}
                                                    >
                                                        <Form.Label>To</Form.Label>
                                                        <DatePickerEx placeholderText="Choose end date"
                                                            onChangeRaw={this.handleDateChangeRaw}
                                                            onChange={(e)=>{this.handleEndDatePicker(e); setFieldValue('endDate', e)}}
                                                            selected={this.state.endDate}
                                                            dateFormat={window.dateformat}
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            maxDate={new Date()}
                                                            // className="form-control form-control-sm h-38px"
                                                            className={errors.endDate && touched.endDate ? "is-invalid form-control form-control-sm" : "form-control form-control-sm"}
                                                        />
                                                        {errors.endDate && touched.endDate ? (
                                                            <span className="invalid-feedback">{errors.endDate}</span>
                                                        ) : null}
                                                    </Form.Group>

                                                    <Button variant="secondary" type="button">More >> </Button>
                                                    <Button variant="primary"
                                                        id="fetch-btn"
                                                        type="submit"
                                                        disabled={getTrialBalanceRequest.is_request_processing}>{getTrialBalanceRequest.is_request_processing ? "Generating..." : " Generate Trial Balance"}</Button>
                                                    <div className="actions-wrap">
                                                        <Button onClick={this.exportTrialBalance} className="action-icon" variant="outline-secondary" type="button">
                                                            <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg==" width="16" height="16" />
                                                        </Button>
                                                    </div>

                                                </Form>


                                            )}
                                    </Formik>
                                    {getTrialBalanceRequest.request_status === accountingConstants.GET_TRIAL_BALANCE_SUCCESS &&
                                        <div className="actions-wrap">
                                            {/* <Button className="action-icon" variant="outline-secondary" type="button">
                                                <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg==" width="16" height="16" />
                                            </Button> */}
                                            <Button className="action-icon" onClick={this.makePrintable} variant="outline-secondary" type="button">
                                                <img alt="download print" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPklEQVR42q2SMY6CQBiFvc/ewVBQWHgFRAkRQwLxAKjTUVh5BKOhEDtiTaFBCAXE0GJjTYgWJFRvGQuyrLOSTXzJ6ybf++f9f6fzafX7fU6SJGia1vB4PMZoNHJbAYqioCgKsHQ4HDCZTMhbgGEYKMuS6SiK0O12XwFZln2JouhW9JfRWZZlGZZlqTVgOp0Sx3HQpjzPcTwecbvdQL9aA+hYcRy3Au73O4IgwOPxgK7r/wf81GcBHMeRMAyhqioEQcBwOGS6KhqDwQA0jL6tAev1mqxWK1yvV8zn8z9TkySBbdu4XC5YLBZorHK5XBLTNJ+A3W73kk5X53nes/3ZbOZWW+OYh0QB1V0gTdOG6XQ0mXlIvwG+72Oz2TS83W5xOp3aAbQcWhLL+/0ePM+/B1RlEprCcq/XI+fzufH3b1NUA2h4gmflAAAAAElFTkSuQmCC" width="16" height="16" />
                                            </Button>
                                        </div>
                                    }
                                </div>
                                <div className="heading-with-cta toright compact">
                                    <div className="eachitem">
                                        <input type="checkbox" name="" id="opening-balance" />
                                        <label htmlFor="opening-balance">Opening Balance</label>
                                    </div>
                                    <div className="eachitem">
                                        <input type="checkbox" name="" id="net-change" />
                                        <label htmlFor="net-change">Net Change</label>
                                    </div>
                                    <div className="eachitem">
                                        <input type="checkbox" name="" id="closing-balance" />
                                        <label htmlFor="closing-balance">Closing Balance</label>
                                    </div>
                                </div>
                            </div>
                        )
                        
                    }else{
                        return(
                            <div className="loading-content"> 
                                <div className="loading-text mb-20">No branches found</div>
                            </div>
                        )
                    }
                }
            case (branchConstants.FETCH_BRANCHES_LIST_FAILURE):
                return (
                    <div className="loading-content errormsg"> 
                        <div>{fetchBranchesListRequest.request_data.error}</div>
                    </div>
                )
            default :
            return null;
        }

        
    }

    renderTrialBalance =()=>{
        let getTrialBalanceRequest = this.props.getTrialBalanceReducer;
        let {isPrintable} = this.state;
        let saveRequestData= getTrialBalanceRequest.request_data!==undefined?getTrialBalanceRequest.request_data.tempData:null;

        // if()
        switch(getTrialBalanceRequest.request_status){
            case (accountingConstants.GET_TRIAL_BALANCE_PENDING):
                if(saveRequestData===null || saveRequestData===undefined){
                    return(
                        <div className="">
                            <div className="loading-text mb-20">Please wait... </div>
                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>GL Code</th>
                                        <th>Account Name</th>
                                        <th>Opening Balance</th>
                                        <th>Branch Name</th>
                                        <th>Currency</th>
                                        <th>Debits</th>
                                        <th>Credits</th>
                                        <th>Net Change</th>
                                        <th>Closing Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>

                                    </tr>
                                </tbody>
                            </TableComponent>
                        </div>
                    )
                }else{
                    let openingBalanceTotal=0,
                        debitTotal=0,
                        creditTotal=0,
                        netChangeTotal=0,
                        closingBalanceTotal=0;
                    return(
                        <div className="">
                            <div className="loading-text mb-20">Please wait... </div>
                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>GL Code</th>
                                        <th>Account Name</th>
                                        <th>Opening Balance</th>
                                        <th>Branch Name</th>
                                        <th>Currency</th>
                                        <th>Debits</th>
                                        <th>Credits</th>
                                        <th>Net Change</th>
                                        <th>Closing Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        saveRequestData.map((eachResult, index)=>{
                                            if(typeof eachResult.openingBalance=== "number"){
                                                openingBalanceTotal+=eachResult.openingBalance;
                                            }

                                            if(typeof eachResult.debits=== "number"){
                                                debitTotal+=eachResult.debits;
                                            }
                                            if(typeof eachResult.credits=== "number"){
                                                creditTotal+=eachResult.credits;
                                            }
                                            if(typeof eachResult.netChange=== "number"){
                                                netChangeTotal+=eachResult.netChange;
                                            }
                                            if(typeof eachResult.closingBalance=== "number"){
                                                closingBalanceTotal+=eachResult.closingBalance;
                                            }

                                            return(
                                                <tr key={`key-${index}`}>
                                                    <td>{eachResult.glCode}</td>
                                                    <td>{eachResult.accountName}</td>
                                                    <td>{numberWithCommas(eachResult.openingBalance, true, true)}</td>
                                                    <td>{eachResult.branchName}</td>
                                                    <td>{eachResult.currencyCode}</td>
                                                    <td>{numberWithCommas(eachResult.debits, true, true)}</td>
                                                    <td>{numberWithCommas(eachResult.credits, true, true)}</td>
                                                    <td>{eachResult.isNetInBracket===false? numberWithCommas(eachResult.netChange, true, true):`(${numberWithCommas(eachResult.netChange, true, true)})`}</td>
                                                    <td>{eachResult.isNetInBracket===false? numberWithCommas(eachResult.closingBalance, true, true):`(${numberWithCommas(eachResult.closingBalance, true, true)})`}</td>
                                                    {/* <td>{numberWithCommas(eachResult.closingBalance)}</td> */}

                                                </tr>
                                            )
                                        })
                                    }
                                    <tr className="totalrow netrow">
                                        <td></td>
                                        <td>Totals</td>
                                        <td>{numberWithCommas(openingBalanceTotal, true, true)}</td>
                                        <td>{numberWithCommas(debitTotal,true, true)}</td>
                                        <td>{numberWithCommas(creditTotal,true, true)}</td>
                                        <td>{numberWithCommas(netChangeTotal,true, true)}</td>
                                        <td>{numberWithCommas(closingBalanceTotal,true, true)}</td>
                                    </tr>
                                </tbody>
                            </TableComponent>
                        </div>
                    )
                }

            case (accountingConstants.GET_TRIAL_BALANCE_SUCCESS):
                let trialBalanceData = getTrialBalanceRequest.request_data.response.data,
                    trialBalanceResult = trialBalanceData.result;
                
                // console.log("data is", profitAndLossData);
                if(trialBalanceResult.length>=1){
                    
                    let openingBalanceTotal=0,
                    debitTotal=0,
                    creditTotal=0,
                    netChangeTotal=0,
                    closingBalanceTotal=0;
                    return (
                        <div className={isPrintable?'is-printable':''}>
                            {isPrintable &&
                                <div className="form-ctas centered">
                                    <Button variant="light" 
                                        onClick={()=>this.setState({isPrintable:false})}
                                        className="btn btn-light"> Cancel</Button>
                                    <Button variant="success"
                                        className="mr-20px"
                                        onClick={()=>window.print()}
                                        type="button">
                                        Print
                                    </Button>
                                    
                                
                                </div>
                            }
                            <div className="tablewrapper">
                                
                                <TableComponent>
                                    <thead>
                                        <tr>
                                            <th>GL Code</th>
                                            <th>Account Name</th>
                                            <th>Opening Balance</th>
                                            <th>Opening Balance</th>
                                            <th>Branch Name</th>
                                            <th>Currency</th>
                                            <th>Debits</th>
                                            <th>Credits</th>
                                            <th>Net Change</th>
                                            <th>Closing Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            trialBalanceResult.map((eachResult, index) => {
                                                if (typeof eachResult.openingBalance === "number") {
                                                    openingBalanceTotal += eachResult.openingBalance;
                                                }

                                                if (typeof eachResult.debits === "number") {
                                                    debitTotal += eachResult.debits;
                                                }
                                                if (typeof eachResult.credits === "number") {
                                                    creditTotal += eachResult.credits;
                                                }
                                                if (typeof eachResult.netChange === "number") {
                                                    netChangeTotal += eachResult.netChange;
                                                }
                                                if (typeof eachResult.closingBalance === "number") {
                                                    closingBalanceTotal += eachResult.closingBalance;
                                                }

                                                return (
                                                    <tr key={`key-${index}`}>
                                                        <td>{eachResult.glCode}</td>
                                                        <td>{eachResult.accountName}</td>
                                                        <td>{numberWithCommas(eachResult.openingBalance,true, true)}</td>
                                                        <td>{eachResult.branchName}</td>
                                                        <td>{eachResult.currencyCode}</td>
                                                        <td>{numberWithCommas(eachResult.debits,true, true)}</td>
                                                        <td>{numberWithCommas(eachResult.credits,true, true)}</td>
                                                        <td>{eachResult.isNetInBracket === false ? numberWithCommas(eachResult.netChange,true, true) : `(${numberWithCommas(eachResult.netChange,true, true)})`}</td>
                                                        <td>{eachResult.isNetInBracket === false ? numberWithCommas(eachResult.closingBalance,true, true) : `(${numberWithCommas(eachResult.closingBalance,true, true)})`}</td>
                                                        {/* <td>{numberWithCommas(eachResult.closingBalance)}</td> */}

                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr className="totalrow netrow">
                                            <td></td>
                                            <td>Totals</td>
                                            <td>{numberWithCommas(openingBalanceTotal,true, true)}</td>
                                            <td>{numberWithCommas(debitTotal,true, true)}</td>
                                            <td>{numberWithCommas(creditTotal,true, true)}</td>
                                            <td>{numberWithCommas(netChangeTotal,true, true)}</td>
                                            <td>{numberWithCommas(closingBalanceTotal,true, true)}</td>
                                        </tr>
                                    </tbody>
                                </TableComponent>
                            </div>
                        </div>
                    )
                    

                }else{
                    return(
                        <div className="">
                            <TableComponent>
                                <thead>
                                    <tr>
                                        <th>GL Code</th>
                                        <th>Account Name</th>
                                        <th>Opening Balance</th>
                                        <th>Opening Balance</th>
                                        <th>Branch Name</th>
                                        <th>Currency</th>
                                        <th>Branch Name</th>
                                        <th>Debits</th>
                                        <th>Credits</th>
                                        <th>Net Change</th>
                                        <th>Closing Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>

                                    </tr>
                                </tbody>
                            </TableComponent>
                        </div>
                    )
                }

            case (accountingConstants.GET_TRIAL_BALANCE_FAILURE):
                return (
                    <div className="loading-content"> 
                        <div>{getTrialBalanceRequest.request_data.error}</div>
                    </div>
                )
            default :
            return null;
        }
    }

    render() {
        let {invalidDate, invalidBranch}= this.state;
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
                                                <h2>Trial Balance</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <AccountingNav />
                                    {/* <ul className="nav">
                                        <li>
                                            <NavLink to={'/balancesheet'}>Balance Sheet</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/profit-loss'}>Profit & Loss</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/trial-balance'}>Trial Balance</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/journals'}>Journal Entries</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/accounts'}>Charts of Accounts</NavLink>
                                            
                                        </li>
                                    </ul> */}
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        {/* <div className="col-sm-3">
                                            <AccountsSidebar/>
                                        </div> */}
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                <div className="heading-with-cta">
                                                    {/* <h3 className="section-title">Trial Balance</h3> */}
                                                    {/* <Button>New Journal Entry</Button> */}
                                                </div>
                                                {this.renderOptions()}

                                                {invalidDate && 
                                                    <Alert variant="danger">
                                                    Start date must be earlier than End date
                                                </Alert>
                                                }
                                                {invalidBranch && 
                                                    <Alert variant="danger">
                                                        Please Select Branch
                                                    </Alert>
                                                }
                                                {this.renderTrialBalance()}
                                                
                                                
                                                {/* <TableComponent classnames="striped bordered hover">
                                                    <thead>
                                                        <tr>
                                                            <th>GL Code</th>
                                                            <th>Account Name</th>
                                                            <th>Debits</th>
                                                            <th>Credits</th>
                                                            <th>Net Change</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>some text</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>

                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>

                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>

                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>

                                                        </tr>
                                                    </tbody>
                                                </TableComponent> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
        getProfitAndLossReducer : state.accountingReducers.getProfitAndLossReducer,
        getTrialBalanceReducer : state.accountingReducers.getTrialBalanceReducer,
        fetchBranchesListReducer : state.administrationReducers.fetchBranchesListReducer,
    };
}
export default connect(mapStateToProps)(TrialBalance);