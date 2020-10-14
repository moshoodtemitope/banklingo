import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import Modal from 'react-bootstrap/Modal'
import Select from 'react-select';
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

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'

import Alert from 'react-bootstrap/Alert'
import "./accountsmanagement.scss"; 
import AccountingNav from './_menu'

class BalanceSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            yearProvided:'',
            monthProvided:'',
            CurrentPage: 1,
            PageSize: 25,
            branchId:1
        }

        
    }

    componentDidMount(){
        this.fetchBranchesList();
    }

    fetchBranchesList = (tempData) =>{
        const {dispatch} = this.props;
        

        dispatch(administrationActions.fetchBranchesList());
        
    }

    setYear=(e)=>{

        this.setState({yearProvided:e.target.value});
    }

    setMonth=(e)=>{

        this.setState({monthProvided:e.target.value});
    }

    renderYears =(startYear)=>{
        let currentYear = new Date().getFullYear(), 
            years = [];
            startYear = startYear || 1980;  
            while ( startYear <= currentYear ) {
                years.push(startYear++);
            }   
            return years;
    } 

    setPagesize = (PageSize, tempData)=>{
        const {dispatch} = this.props;
        this.setState({PageSize: PageSize.target.value})
        let {monthProvided,yearProvided,CurrentPage,branchId}= this.state;


        let payload ={
            branchId:branchId,
            Month:parseInt(monthProvided),
            Year:yearProvided,
            PageSize:parseInt(PageSize.target.value),
            CurrentPage:parseInt(CurrentPage),
        }

        if(tempData){
            dispatch(acoountingActions.getBalanceSheet(payload, tempData));
        }else{
            dispatch(acoountingActions.getBalanceSheet(payload));
        }
    }

    exportBalanceSheet = () => {
        const { dispatch } = this.props;
        let {monthProvided,yearProvided,PageSize,CurrentPage,branchId}= this.state;
        if(monthProvided!=="" && yearProvided!==""){
            let payload ={
                branchId: branchId,
                Month:parseInt(monthProvided),
                Year:parseInt(yearProvided),
                PageSize:parseInt(PageSize),
                CurrentPage:parseInt(CurrentPage),
            }
            dispatch(acoountingActions.exportBalanceSheet(payload));
        }


    }

    fetchBalanceSheet = (e,tempData)=>{
        e.preventDefault();
        const {dispatch} = this.props;
            let {monthProvided,yearProvided,PageSize,CurrentPage,branchId}= this.state;

            let getBalanceSheetRequest = this.props.getBalanceSheetReducer;

            let saveRequestData= getBalanceSheetRequest.request_data!==undefined?getBalanceSheetRequest.request_data.response.data.result:null;

            
    
        if(monthProvided!=="" && yearProvided!==""){
            let payload ={
                branchId: branchId,
                Month:parseInt(monthProvided),
                Year:parseInt(yearProvided),
                PageSize:parseInt(PageSize),
                CurrentPage:parseInt(CurrentPage),
            }
           
            if(tempData){
                dispatch(acoountingActions.getBalanceSheet(payload, tempData));
            }else{
                if(saveRequestData){
                    dispatch(acoountingActions.getBalanceSheet(payload, saveRequestData));
                }else{
                    dispatch(acoountingActions.getBalanceSheet(payload));
                }
                
            }

        }else{
            return false;
        }
        
    }

    renderOptions = (e)=>{
        let getBalanceSheetRequest = this.props.getBalanceSheetReducer;
        let {yearProvided}= this.state;
        
        let allYears = this.renderYears(2019);
        return(
            <div className="heading-actions">
                <Form 
                    className="one-liner"
                    noValidate 
                    onSubmit={this.fetchBalanceSheet}>
                    {/* <Form.Group controlId="periodOptionChosen">
                        <Form.Label>Show</Form.Label>
                        <Form.Control as="select" size="sm">
                            <option>Month</option>
                            <option>Date</option>
                        </Form.Control>
                    </Form.Group> */}
                    <Form.Group controlId="monthsDropdown">
                        <Form.Label>Month</Form.Label>
                        <Form.Control 
                            as="select" 
                            size="sm"
                            onChange={this.setMonth}
                        >
                            <option>Choose month</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="periodOptionChosen">
                        <Form.Label>Year</Form.Label>
                        <Form.Control 
                            as="select" 
                            size="sm"
                            onChange={this.setYear}
                        >
                            <option>Choose year</option>
                            {
                                allYears.map((eachYear,index)=>{
                                    return(
                                        <option value={eachYear}>{eachYear}</option>
                                    )
                                })
                            }
                            
                        </Form.Control>
                        {/* <Form.Control 
                            type="text" 
                            value={allowNumbersOnly(yearProvided, 4)}
                            onChange={this.setYear} 
                            size="sm" /> */}
                    </Form.Group>
                    {/* <Button variant="secondary" type="button">More >> </Button> */}
                    <Button variant="primary"
                        disabled={getBalanceSheetRequest.is_request_processing}
                         type="submit">{getBalanceSheetRequest.is_request_processing?"Generating...":"Generate Balance Sheet"} </Button>
                         
                </Form>
                <div className="actions-wrap">
                    <Button onClick={this.exportBalanceSheet} className="action-icon" variant="outline-secondary" type="button">
                        <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg==" width="16" height="16" />
                    </Button>
                </div>
                {/* <div className="actions-wrap">
                    <Button className="action-icon" variant="outline-secondary" type="button">
                        <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg==" width="16" height="16" />
                    </Button>
                    <Button className="action-icon" variant="outline-secondary" type="button">
                        <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPklEQVR42q2SMY6CQBiFvc/ewVBQWHgFRAkRQwLxAKjTUVh5BKOhEDtiTaFBCAXE0GJjTYgWJFRvGQuyrLOSTXzJ6ybf++f9f6fzafX7fU6SJGia1vB4PMZoNHJbAYqioCgKsHQ4HDCZTMhbgGEYKMuS6SiK0O12XwFZln2JouhW9JfRWZZlGZZlqTVgOp0Sx3HQpjzPcTwecbvdQL9aA+hYcRy3Au73O4IgwOPxgK7r/wf81GcBHMeRMAyhqioEQcBwOGS6KhqDwQA0jL6tAev1mqxWK1yvV8zn8z9TkySBbdu4XC5YLBZorHK5XBLTNJ+A3W73kk5X53nes/3ZbOZWW+OYh0QB1V0gTdOG6XQ0mXlIvwG+72Oz2TS83W5xOp3aAbQcWhLL+/0ePM+/B1RlEprCcq/XI+fzufH3b1NUA2h4gmflAAAAAElFTkSuQmCC" width="16" height="16" />
                    </Button>
                </div> */}
            </div>
        )
    }

    renderBalanceSheet =()=>{
        let getBalanceSheetRequest = this.props.getBalanceSheetReducer;

        let saveRequestData= getBalanceSheetRequest.request_data!==undefined?getBalanceSheetRequest.request_data.tempData:null;

        // if()
        switch(getBalanceSheetRequest.request_status){
            case (accountingConstants.GET_BALANCE_SHEET_PENDING):
                if((saveRequestData===null || saveRequestData===undefined) || (saveRequestData!==null && saveRequestData!==undefined && saveRequestData.length<1) ){
                    return(
                        <div className="loading-content">
                            <div className="loading-text mb-20">Please wait... </div>
                            
                            <div className="heading-with-cta">
                                <Form className="one-liner">

                                    <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                        <Form.Control as="select" size="sm">
                                            <option>No Filter</option>
                                            <option>Add New Filter</option>
                                            <option>Custom Filter</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                </Form>

                                <div className="pagination-wrap">
                                    <label htmlFor="toshow">Show</label>
                                    <select id="toshow" className="countdropdown form-control form-control-sm">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="200">200</option>
                                    </select>
                                    
                                </div>
                            </div>

                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>GL Code</th>
                                        <th>Account Name</th>
                                        <th>Balance</th>

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
                            
                            <div className="heading-with-cta">
                            </div>
                            
                            <div className="heading-with-cta">
                                <Form className="one-liner">

                                    <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                        <Form.Control as="select" size="sm">
                                            <option>No Filter</option>
                                            <option>Add New Filter</option>
                                            <option>Custom Filter</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                </Form>

                                <div className="pagination-wrap">
                                    <label htmlFor="toshow">Show</label>
                                    <select id="toshow" 
                                        className="countdropdown form-control form-control-sm"
                                        onChange={this.setPagesize}
                                        value={this.state.PageSize}>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="200">200</option>
                                    </select>
                                    
                                </div>
                            </div>
                            <div className="loading-text mb-20">Please wait... </div>

                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>GL Code</th>
                                        <th>Account Name</th>
                                        <th>Balance</th>

                                    </tr>
                                </thead>
                                {/* <tbody> */}
                                    {
                                        saveRequestData.map((eachResult, index)=>{
                                            return(
                                                <tbody key={`key-${index}`}>
                                                    <tr className="sheetheading">
                                                        <td colSpan="3"> <h5>{eachResult.accountTypeDescription}</h5></td>
                                                    </tr>
                                                    {
                                                        eachResult.balanceSheetModels.map((eachModelData, keyIndex)=>{
                                                            if(eachModelData.glCode!==null){
                                                                return(
                                                                    <tr key={`datakey-${keyIndex}`}>
                                                                        <td>{eachModelData.glCode}</td>
                                                                        <td>{eachModelData.accountName}</td>
                                                                        <td>&#8358;{numberWithCommas(eachModelData.balance, true)}</td>

                                                                    </tr>
                                                                )
                                                            }
                                                        })
                                                    }
                                                    <tr className="totalrow">
                                                        <td></td>
                                                        <td>Total {eachResult.accountTypeDescription}</td>
                                                        <td>&#8358;{numberWithCommas(eachResult.totalBalance, true)}</td>
                                                    </tr>
                                                </tbody>
                                            )
                                        })
                                    }
                                    
                                    {/* <tr>
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
                                </tbody> */}
                            </TableComponent>
                        </div>
                    )
                }

            case (accountingConstants.GET_BALANCE_SHEET_SUCCESS):
                let getBalanceSheetData = getBalanceSheetRequest.request_data.response.data,
                    getBalanceSheetResult = getBalanceSheetData.result;
                
                // console.log("data is", getBalanceSheetData);
                if(getBalanceSheetResult.length>=1){
                    
                        return(
                            <div className="">
                                <div className="heading-with-cta">
                                    {/* <h3 className="section-title">Balance Sheet</h3> */}
                                    {/* <Button>New Journal Entry</Button> */}
                                </div>
                                
                                <div className="heading-with-cta">
                                    <Form className="one-liner">

                                        <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                            <Form.Control as="select" size="sm">
                                                <option>No Filter</option>
                                                <option>Add New Filter</option>
                                                <option>Custom Filter</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                        <div className="actions-wrap">
                                            <Button onClick={this.exportBalanceSheet} className="action-icon" variant="outline-secondary" type="button">
                                                <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg==" width="16" height="16" />
                                            </Button>
                                        </div>
                                    </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow" 
                                            className="countdropdown form-control form-control-sm"
                                            onChange={(e)=>this.setPagesize(e, getBalanceSheetResult)}
                                            value={this.state.PageSize}>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                        
                                    </div>
                                </div>

                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>GL Code</th>
                                            <th>Account Name</th>
                                            <th>Balance</th>

                                        </tr>
                                    </thead>
                                    {/* <tbody> */}
                                        {
                                            getBalanceSheetResult.map((eachResult, index)=>{
                                                return(
                                                    <tbody key={`key-${index}`}>
                                                        <tr className="sheetheading">
                                                            <td colSpan="3"> <h5>{eachResult.accountTypeDescription}</h5></td>
                                                        </tr>
                                                        {
                                                            eachResult.balanceSheetModels.map((eachModelData, keyIndex)=>{
                                                                if(eachModelData.glCode!==null){
                                                                    return(
                                                                        <tr key={`datakey-${keyIndex}`}>
                                                                            <td>{eachModelData.glCode}</td>
                                                                            <td>{eachModelData.accountName}</td>
                                                                            <td>&#8358;{numberWithCommas(eachModelData.balance, true)}</td>

                                                                        </tr>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                        <tr className="totalrow">
                                                            <td></td>
                                                            <td>Total {eachResult.accountTypeDescription}</td>
                                                            <td>&#8358;{numberWithCommas(eachResult.totalBalance, true)}</td>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })
                                        }
                                        
                                        {/* <tr>
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
                                    </tbody> */}
                                </TableComponent>
                            </div>
                        )
                    

                }else{
                    return(
                        <div className="">
                       
                        
                            <div className="heading-with-cta">
                                <Form className="one-liner">

                                    <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                        <Form.Control as="select" size="sm">
                                            <option>No Filter</option>
                                            <option>Add New Filter</option>
                                            <option>Custom Filter</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                </Form>

                                <div className="pagination-wrap">
                                    <label htmlFor="toshow">Show</label>
                                    <select id="toshow" className="countdropdown form-control form-control-sm">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="200">200</option>
                                    </select>
                                   
                                </div>
                            </div>

                            <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>GL Code</th>
                                    <th>Account Name</th>
                                    <th>Balance</th>

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

            case (accountingConstants.GET_BALANCE_SHEET_FAILURE):
                return (
                    <div className="loading-content"> 
                        <div>{getBalanceSheetRequest.request_data.error}</div>
                    </div>
                )
            default :
            return null;
        }
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
                                                <h2>Accounting</h2>
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
                                                {this.renderOptions()}
                                                {this.renderBalanceSheet()}
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
        getBalanceSheetReducer : state.accountingReducers.getBalanceSheetReducer,
        fetchBranchesListReducer : state.accountingReducers.fetchBranchesListReducer,
    };
}

export default connect(mapStateToProps)(BalanceSheet);