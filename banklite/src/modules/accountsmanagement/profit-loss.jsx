import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select';
import DatePicker from '../../_helpers/datepickerfield'
import "react-datepicker/dist/react-datepicker.css";

import Form from 'react-bootstrap/Form'
import { Formik } from 'formik';
import * as Yup from 'yup';
// import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import {allowNumbersOnly, numberWithCommas} from '../../shared/utils';
import DropdownButton from 'react-bootstrap/DropdownButton'
import {acoountingActions} from '../../redux/actions/accounting/accounting.action';
import {accountingConstants} from '../../redux/actiontypes/accounting/accounting.constants'

import Alert from 'react-bootstrap/Alert'
import "./accountsmanagement.scss"; 

class ProfitAndLoss extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            startDate:'',
            endDate:'',
            branchId:1,
            invalidDate:false
        }

        
    }

    setStartDate=(e)=>{

        this.setState({startDate:e.target.value});
    }

    setEndDate=(e)=>{

        this.setState({endDate:e.target.value});
    }

    fetchProfitAndLoss = (payload, tempData)=>{
        
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
                dispatch(acoountingActions.getProfitAndLoss(payload, tempData));
            }else{
                dispatch(acoountingActions.getProfitAndLoss(payload));
            }
        // }else{
        //     return false;
        // }
        
    }

    renderOptions = ()=>{
        let getProfitAndLossRequest = this.props.getProfitAndLossReducer
        let {branchId, invalidDate}= this.state;

        let  validationSchema = Yup.object().shape({
                endDate: Yup.string()
                    .required('Please select end date'),
                startDate: Yup.string()
                    .required('Please select start date')
            });
        return(
            <div className="heading-actions">
                <Formik
                        initialValues={{
                            // entryDate: '',
                            endDate: '',
                            startDate:''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }, errors,) => {
                            let startDateTemp = new Date(values.startDate),
                                endDateTemp = new Date(values.endDate);
                            if(startDateTemp <= endDateTemp){
                                
                                this.setState({invalidDate:false});

                                let payload ={
                                    branchId: branchId,
                                    StartDate:values.startDate.toISOString(),
                                    EndDate:values.endDate.toISOString(),
                                }
    
                                // console.log("-----", values.endDate);
                                let saveRequestData= this.props.getProfitAndLossReducer.request_data!==undefined && this.props.getProfitAndLossReducer.request_data.response!==undefined && this.props.getProfitAndLossReducer.request_data.response.data!==undefined ? this.props.getProfitAndLossReducer.request_data.response.data:null;
                                // let saveRequestData= this.props.getProfitAndLossReducer.request_data!==undefined ?this.props.getProfitAndLossReducer.request_data.data:null;
                               
                                    if(saveRequestData!==null){
                                        
                                        this.fetchProfitAndLoss(payload, saveRequestData.result);
                                    }else{
                                        
                                        this.fetchProfitAndLoss(payload);
                                    }

                                
                            }else{
                                this.setState({invalidDate:true})
                            }
                            
                            

                        }}
                    >
                        {({ handleSubmit,
                            handleChange,
                            handleBlur,
                            resetForm,
                            values,
                            setFieldValue,
                            touched,
                            isValid,
                            errors, }) => (

                            <Form className="one-liner"
                                noValidate
                                onSubmit={handleSubmit}>
                                <Form.Group controlId="periodOptionChosen"
                                            className={errors.startDate && touched.startDate ? "has-invaliderror" : null}
                                >
                                    <Form.Label>From</Form.Label>

                                    <DatePicker placeholderText="Choose start date"
                                        // selected={this.state.startDate} 
                                        onChange={setFieldValue}
                                        value={values.startDate}
                                        // onChangeRaw={(e)=>this.handleChange(e)}
                                        dateFormat="d MMMM, yyyy"
                                        className="form-control form-control-sm"
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        name="startDate"
                                        className={errors.startDate && touched.startDate ? "is-invalid form-control form-control-sm" : "form-control form-control-sm"}
                                        dropdownMode="select"
                                        maxDate={new Date()}
                                    />
                                    {errors.startDate && touched.startDate ? (
                                        <span className="invalid-feedback">{errors.startDate}</span>
                                    ) : null}
                                </Form.Group>
                                <Form.Group controlId="monthsDropdown"
                                            className={errors.endDate && touched.endDate ? "has-invaliderror" : null}
                                >
                                    <Form.Label>To</Form.Label>
                                    <DatePicker placeholderText="Choose end date"
                                        // selected={this.state.endDate} 
                                        onChange={setFieldValue}
                                        value={values.endDate}
                                        // onChangeRaw={(e)=>this.handleChange(e)}
                                        dateFormat="d MMMM, yyyy"
                                        className="form-control form-control-sm"
                                        peekNextMonth
                                        showMonthDropdown
                                        showYearDropdown
                                        dropdownMode="select"
                                        name="endDate"
                                        className={errors.endDate && touched.endDate ? "is-invalid form-control form-control-sm" : "form-control form-control-sm"}
                                        maxDate={new Date()}
                                    />
                                    {errors.endDate && touched.endDate ? (
                                        <span className="invalid-feedback">{errors.endDate}</span>
                                    ) : null}
                                </Form.Group>

                                <Button variant="secondary" type="button">More >> </Button>
                                <Button variant="primary"
                                     type="submit"
                                     disabled={getProfitAndLossRequest.is_request_processing}>{getProfitAndLossRequest.is_request_processing?"Generating...":" Generate Profit & Loss"}</Button>

                                
                            </Form>
                           
                            
                    )}
                </Formik>
                <div className="actions-wrap">
                    <Button className="action-icon" variant="outline-secondary" type="button">
                        <img alt="download excel"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg==" width="16" height="16" /> 
                    </Button>
                    <Button className="action-icon" variant="outline-secondary" type="button">
                        <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPklEQVR42q2SMY6CQBiFvc/ewVBQWHgFRAkRQwLxAKjTUVh5BKOhEDtiTaFBCAXE0GJjTYgWJFRvGQuyrLOSTXzJ6ybf++f9f6fzafX7fU6SJGia1vB4PMZoNHJbAYqioCgKsHQ4HDCZTMhbgGEYKMuS6SiK0O12XwFZln2JouhW9JfRWZZlGZZlqTVgOp0Sx3HQpjzPcTwecbvdQL9aA+hYcRy3Au73O4IgwOPxgK7r/wf81GcBHMeRMAyhqioEQcBwOGS6KhqDwQA0jL6tAev1mqxWK1yvV8zn8z9TkySBbdu4XC5YLBZorHK5XBLTNJ+A3W73kk5X53nes/3ZbOZWW+OYh0QB1V0gTdOG6XQ0mXlIvwG+72Oz2TS83W5xOp3aAbQcWhLL+/0ePM+/B1RlEprCcq/XI+fzufH3b1NUA2h4gmflAAAAAElFTkSuQmCC" width="16" height="16" /> 
                    </Button>
                </div>
            </div>
        )
    }

    

    

    renderBalanceSheet =()=>{
        let getProfitAndLossRequest = this.props.getProfitAndLossReducer;

        let saveRequestData= getProfitAndLossRequest.request_data!==undefined?getProfitAndLossRequest.request_data.tempData:null;

        // if()
        switch(getProfitAndLossRequest.request_status){
            case (accountingConstants.GET_PROFIT_AND_LOSS_PENDING):
                if(saveRequestData===null || saveRequestData===undefined){
                    return(
                        <div className="">
                            <div className="loading-text mb-20">Please wait... </div>
                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>GL Code</th>
                                        <th>Account Name</th>
                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </TableComponent>
                        </div>
                    )
                }else{
                    
                    return(
                        <div className="">
                            <div className="loading-text mb-20">Please wait... </div>
                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>GL Code</th>
                                        <th>Account Name</th>
                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        saveRequestData.incomes.map((eachResult, index)=>{
                                            return(
                                                <tr key={`datakey-${index}`}>
                                                    <td>{eachResult.glCode}</td>
                                                    <td>{eachResult.accountName}</td>
                                                    <td>{numberWithCommas(eachResult.amount)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr className="totalrow">
                                        <td></td>
                                        <td>Total Income</td>
                                        <td>{numberWithCommas(saveRequestData.totalIncome)}</td>
                                    </tr>
                                    {
                                        saveRequestData.expenses.map((eachResult, index)=>{
                                            return(
                                                <tr key={`datakey-${index}`}>
                                                    <td>{eachResult.glCode}</td>
                                                    <td>{eachResult.accountName}</td>
                                                    <td>{numberWithCommas(eachResult.amount)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    <tr className="totalrow">
                                        <td></td>
                                        <td>Total Expenses</td>
                                        <td>{numberWithCommas(saveRequestData.totalExpense)}</td>
                                    </tr>

                                    <tr className="totalrow netrow">
                                        <td></td>
                                        <td>NET Income</td>
                                        <td>{numberWithCommas(saveRequestData.netIncome)}</td>
                                    </tr>
                                    
                                </tbody>
                            </TableComponent>
                        </div>
                    )
                }

            case (accountingConstants.GET_PROFIT_AND_LOSS_SUCCESS):
                let profitAndLossData = getProfitAndLossRequest.request_data.response.data,
                    profitAndLossResult = profitAndLossData.result;
                
                // console.log("data is", profitAndLossData);
                if(profitAndLossResult.incomes.length>=1 && profitAndLossResult.expenses.length>=1  ){
                    
                        return(
                            <div className="">
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>GL Code</th>
                                            <th>Account Name</th>
                                            <th></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            profitAndLossResult.incomes.map((eachResult, index)=>{
                                                return(
                                                    <tr key={`datakey-${index}`}>
                                                        <td>{eachResult.glCode}</td>
                                                        <td>{eachResult.accountName}</td>
                                                        <td>{numberWithCommas(eachResult.amount)}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr className="totalrow">
                                            <td></td>
                                            <td>Total Income</td>
                                            <td>{numberWithCommas(profitAndLossResult.totalIncome)}</td>
                                        </tr>
                                        {
                                            profitAndLossResult.expenses.map((eachResult, index)=>{
                                                return(
                                                    <tr key={`datakey-${index}`}>
                                                        <td>{eachResult.glCode}</td>
                                                        <td>{eachResult.accountName}</td>
                                                        <td>{numberWithCommas(eachResult.amount)}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tr className="totalrow">
                                            <td></td>
                                            <td>Total Expenses</td>
                                            <td>{numberWithCommas(profitAndLossResult.totalExpense)}</td>
                                        </tr>
                                        <tr className="totalrow netrow">
                                            <td></td>
                                            <td>NET Income</td>
                                            <td>{numberWithCommas(profitAndLossResult.netIncome)}</td>
                                        </tr>
                                    </tbody>
                                </TableComponent>
                            </div>
                        )
                    

                }else{
                    return(
                        <div className="">
                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>GL Code</th>
                                        <th>Account Name</th>
                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </TableComponent>
                        </div>
                    )
                }

            case (accountingConstants.GET_PROFIT_AND_LOSS_FAILURE):
                return (
                    <div className="loading-content"> 
                        <div>{getProfitAndLossRequest.request_data.error}</div>
                    </div>
                )
            default :
            return null;
        }
    }

    render() {
        let {invalidDate}= this.state;
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
                                                <h2>Accounting</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <ul className="nav">
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
                                            {/* <NavLink to={'/accounts/journal'}>Journal Entries</NavLink> */}
                                            <NavLink to={'/journals'}>Journal Entries</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/accounts'}>Charts of Accounts</NavLink>
                                            {/* <ul>
                                                <li>
                                                    <NavLink to={'/accounts/charts/all'}>All</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/accounts/charts/liabilities'}>Liabilities</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/accounts/charts/equity'}>Equity</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/accounts/charts/income'}>Income</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/accounts/charts/expenses'}>Expenses</NavLink>
                                                </li>
                                            </ul> */}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                               
                                                {this.renderOptions()}
                                                {invalidDate && 
                                                    <Alert variant="danger">
                                                    Start date must be earlier than End date
                                                </Alert>
                                                }
                                                {this.renderBalanceSheet()}
                                                
                                                {/* <TableComponent classnames="striped bordered hover">
                                                    <thead>
                                                        <tr>
                                                            <th>GL Code</th>
                                                            <th>Account Name</th>
                                                            <th></th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>some text</td>

                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>

                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>

                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>

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
    };
}
export default connect(mapStateToProps)(ProfitAndLoss);