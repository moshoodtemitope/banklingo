import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer';
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./disbursements.scss"; 

import {disbursementActions} from '../../redux/actions/disbursment/disbursment.action';
import {disbursmentConstants} from '../../redux/actiontypes/disbursment/disbursment.constants'

class NipOutwardsRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:25,
            CurrentPage:1,
            isRefresh:false,
            endDate: new Date(),
            // startDate : new Date (new Date().setDate(today.getDate()-30)),
            startDate : new Date (),
            searchText: "",
        }

        
    }

    componentDidMount(){
        this.loadInitialData();
    }

    loadInitialData=()=>{
        let {PageSize, CurrentPage,startDate, endDate, searchText}= this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&&StartDate=${startDate.toISOString()}&EndDate=${endDate.toISOString()}&SearchText=${searchText}`;
        this.getOutwardsNIPData(params);
    }

    getOutwardsNIPData = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(disbursementActions.getOutwardsNIP(paramters));
    }

    handleDateChangeRaw = (e) => {
        e.preventDefault();
    }
    handleStartDatePicker = (startDate) => {
        startDate.setHours(startDate.getHours() + 1);
        
        this.setState({ startDate }, ()=>{
            if(this.state.endDate!==""){
                // this.loadInitialData();
            }
        });
    }

    handleEndDatePicker = (endDate) => {
        endDate.setHours(endDate.getHours() + 1);
       
        this.setState({ endDate }, ()=>{
                if(this.state.startDate!==""){
                    // this.getHistory();
                }
        });
    }
    setPagesize = (PageSize, tempData)=>{
        // console.log('----here', PageSize.target.value);
        const {dispatch} = this.props;
        // let {CurrentPage}= this.state;
        

        let sizeOfPage = PageSize.target.value;

        this.setState({PageSize: sizeOfPage, isRefresh: true});
        let {CurrentPage,startDate, endDate, searchText}= this.state;
        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&&StartDate=${startDate.toISOString()}&EndDate=${endDate.toISOString()}&SearchText=${searchText}`;
        // let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;
        

        if(tempData){
            dispatch(disbursementActions.getOutwardsNIP(params, tempData));
        }else{
            dispatch(disbursementActions.getOutwardsNIP(params));
        }
        
       
        // dispatch(disbursementActions.getOutwardsNIP(params));
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        // let {PageSize} = this.state;

        // this.setState({PageSize: sizeOfPage});

        // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);
        let {PageSize,CurrentPage,startDate, endDate, searchText}= this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&&StartDate=${startDate.toISOString()}&EndDate=${endDate.toISOString()}&SearchText=${searchText}`;

        // let params = `PageSize=${PageSize}&CurrentPage=${nextPage}`;
        

        if(tempData){
           dispatch(disbursementActions.getOutwardsNIP(params,tempData));
        }else{
           dispatch(disbursementActions.getOutwardsNIP(params));
        }
    }

    renderOutWardsRequest=()=>{
        let getOutwardsNIPRequestData = this.props.getOutwardsNIPReducer,
            {isRefresh} = this.state;

        let saveRequestData= getOutwardsNIPRequestData.request_data!==undefined?getOutwardsNIPRequestData.request_data.tempData:null;
        if(getOutwardsNIPRequestData.request_status ===disbursmentConstants.GET_NIP_OUTWARDS_PENDING
            ){
                if(saveRequestData===undefined){
                    return(
                        <div className="loading-content">
                            <div className="loading-text">Please wait... </div>
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

                                        className="countdropdown form-control form-control-sm">
                                        <option value="10">10</option>
                                        <option value="25" >25</option>
                                        <option value="50">50</option>
                                        <option value="200">200</option>
                                    </select>
                                    
                                </div>
                            </div>
                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>Transaction Date</th>
                                        <th>Source Account Number</th>
                                        <th>Source Account Name</th>
                                        <th>Source Bank</th>
                                        <th>Destination Account Number</th>
                                        <th>Destination Account Name</th>
                                        <th>Destination Bank</th>
                                        <th>Amount</th>
                                        <th>Fee</th>
                                        <th>Narration</th>
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
                                    </tr>
                                </tbody>
                            </TableComponent>
                        </div>
                    )
                }else{
                    
                    return(
                        <div className="loading-content">
                            <div className="loading-text">Please wait... </div>
                            <div className="heading-with-cta">
                                <Form className="one-liner">

                                            <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                                <Form.Control as="select" size="sm">
                                                    <option>No Filter</option>
                                                    <option>Add New Filter</option>
                                                    <option>Custom Filter</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group className="table-filters">
                                                <DatePicker
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleStartDatePicker}
                                                    selected={this.state.startDate}
                                                    dateFormat="d MMMM, yyyy"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    placeholderText="Start date"
                                                    maxDate={new Date()}
                                                    // className="form-control form-control-sm h-38px"
                                                    className="form-control form-control-sm "

                                                />
                                                <DatePicker placeholderText="End  date"
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleEndDatePicker}
                                                    selected={this.state.endDate}
                                                    dateFormat="d MMMM, yyyy"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    maxDate={new Date()}
                                                    // className="form-control form-control-sm h-38px"
                                                    className="form-control form-control-sm"

                                                />
                                                <input type="text"
                                                    className="form-control-sm search-table form-control"
                                                    placeholder="Search text"
                                                />
                                                {/* {errors.startDate && touched.startDate ? (
                                                <span className="invalid-feedback">{errors.startDate}</span>
                                            ) : null} */}
                                            </Form.Group>
                                            <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                        </Form>

                                <div className="pagination-wrap">
                                    <label htmlFor="toshow">Show</label>
                                    <select id="toshow" 
                                            value={this.state.PageSize}
                                            className="countdropdown form-control form-control-sm">
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
                                        <th>Transaction Date</th>
                                        <th>Source Account Number</th>
                                        <th>Source Account Name</th>
                                        <th>Source Bank</th>
                                        <th>Destination Account Number</th>
                                        <th>Destination Account Name</th>
                                        <th>Destination Bank</th>
                                        <th>Amount</th>
                                        <th>Fee</th>
                                        <th>Narration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        saveRequestData.map((eachActivity, index)=>{
                                            return(
                                                <Fragment key={index}>
                                                    <tr>
                                                        {/* <td>{eachActivity.id}</td> */}
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
                                                </Fragment>
                                            )
                                        })
                                    }
                                    
                                </tbody>
                            </TableComponent>

                        </div>
                    )
                }
        }

        if(getOutwardsNIPRequestData.request_status ===disbursmentConstants.GET_NIP_OUTWARDS_SUCCESS
            ){
                let allActivitiesData = getOutwardsNIPRequestData.request_data.response.data;

                if(allActivitiesData.result!==undefined){
                    if(allActivitiesData.result.length>=1){
                        return(
                            <div>
                                <div className="heading-with-cta">
                                    <Form className="one-liner">

                                            <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                                <Form.Control as="select" size="sm">
                                                    <option>No Filter</option>
                                                    <option>Add New Filter</option>
                                                    <option>Custom Filter</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group className="table-filters">
                                                <DatePicker
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleStartDatePicker}
                                                    selected={this.state.startDate}
                                                    dateFormat="d MMMM, yyyy"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    placeholderText="Start date"
                                                    maxDate={new Date()}
                                                    // className="form-control form-control-sm h-38px"
                                                    className="form-control form-control-sm "

                                                />
                                                <DatePicker placeholderText="End  date"
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleEndDatePicker}
                                                    selected={this.state.endDate}
                                                    dateFormat="d MMMM, yyyy"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    maxDate={new Date()}
                                                    // className="form-control form-control-sm h-38px"
                                                    className="form-control form-control-sm"

                                                />
                                                <input type="text"
                                                    className="form-control-sm search-table form-control"
                                                    placeholder="Search text"
                                                />
                                                {/* {errors.startDate && touched.startDate ? (
                                                <span className="invalid-feedback">{errors.startDate}</span>
                                            ) : null} */}
                                            </Form.Group>
                                            <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                        </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow" 
                                                onChange={(e)=>this.setPagesize(e, allActivitiesData.result)}
                                                value={this.state.PageSize}
                                                className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                        <TablePagination
                                            totalPages={allActivitiesData.totalPages}
                                            currPage={allActivitiesData.currentPage}
                                            currRecordsCount={allActivitiesData.result.length}
                                            totalRows={allActivitiesData.totalRows}
                                            tempData={allActivitiesData.result}
                                            pagesCountToshow={4}
                                            refreshFunc={this.loadNextPage}
                                        />
                                    </div>
                                </div>
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Transaction Date</th>
                                            <th>Source Account Number</th>
                                            <th>Source Account Name</th>
                                            <th>Source Bank</th>
                                            <th>Destination Account Number</th>
                                            <th>Destination Account Name</th>
                                            <th>Destination Bank</th>
                                            <th>Amount</th>
                                            <th>Fee</th>
                                            <th>Narration</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allActivitiesData.result.map((eachActivity, index)=>{
                                                return(
                                                    <Fragment key={index}>
                                                        <tr>
                                                            {/* <td>{eachActivity.id}</td> */}
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
                                                    </Fragment>
                                                )
                                            })
                                        }
                                       
                                    </tbody>
                                </TableComponent>

                            </div>
                        )
                    }else{
                        return(
                            <div>
                                <div className="heading-with-cta">
                                    <Form className="one-liner">

                                            <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                                <Form.Control as="select" size="sm">
                                                    <option>No Filter</option>
                                                    <option>Add New Filter</option>
                                                    <option>Custom Filter</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group className="table-filters">
                                                <DatePicker
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleStartDatePicker}
                                                    selected={this.state.startDate}
                                                    dateFormat="d MMMM, yyyy"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    placeholderText="Start date"
                                                    maxDate={new Date()}
                                                    // className="form-control form-control-sm h-38px"
                                                    className="form-control form-control-sm "

                                                />
                                                <DatePicker placeholderText="End  date"
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleEndDatePicker}
                                                    selected={this.state.endDate}
                                                    dateFormat="d MMMM, yyyy"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    maxDate={new Date()}
                                                    // className="form-control form-control-sm h-38px"
                                                    className="form-control form-control-sm"

                                                />
                                                <input type="text"
                                                    className="form-control-sm search-table form-control"
                                                    placeholder="Search text"
                                                />
                                                {/* {errors.startDate && touched.startDate ? (
                                                <span className="invalid-feedback">{errors.startDate}</span>
                                            ) : null} */}
                                            </Form.Group>
                                            <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                        </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow"
                                                // onChange={this.setPagesize}
                                                value={this.state.PageSize}
                                            className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25" >25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                    </div>
                                </div>
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Transaction Date</th>
                                            <th>Source Account Number</th>
                                            <th>Source Account Name</th>
                                            <th>Source Bank</th>
                                            <th>Destination Account Number</th>
                                            <th>Destination Account Name</th>
                                            <th>Destination Bank</th>
                                            <th>Amount</th>
                                            <th>Fee</th>
                                            <th>Narration</th>
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
                                        </tr>
                                    </tbody>
                                </TableComponent>
                            </div>
                        )
                    }
                }else{
                    return null
                }
        }

        if (getOutwardsNIPRequestData.request_status === disbursmentConstants.GET_NIP_OUTWARDS_FAILURE
        ) {
            return (
                <div className="loading-content errormsg">
                    <div>{getOutwardsNIPRequestData.request_data.error}</div>
                </div>
            )
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
                                                <h2>Nip Outwards Requests</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <ul className="nav">
                                        <li>
                                            <NavLink exact to={'/disbursements'}>Disbursements</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/initiate'}>Initiate Disbursement</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/pending-review'}>Pending Review</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/pending-approval'}>Pending Approval</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/nip-requests'}>NIP Requests</NavLink>
                                            {/* <ul>
                                                <li>
                                                    <NavLink to={'/disbursements/transfer-requests'}>Transfer Requests</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/disbursements/account-block'}>Account Block</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/disbursements/amount-block'}>Amount Block</NavLink>
                                                </li>
                                            </ul> */}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    
                                    <div className="lowerlevel-menu">
                                        <ul className="nav">
                                            <li>
                                                {/* <NavLink to={'/administration-generalorganization'}>Organization</NavLink> */}
                                                <NavLink exact to={'/disbursements/nip-requests'}>Inwards</NavLink>
                                            </li>
                                            <li>
                                                <NavLink exact to={'/disbursements/nip-requests/outwards'}>Outwards</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {/* <div className="heading-with-cta">
                                                    <h3 className="section-title">Disbursement</h3>
                                                </div> */}
                                                {this.renderOutWardsRequest()}
                                                   {/* <div className="heading-with-cta">
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
                                                            <th></th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>

                                                        </tr>
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
        getOutwardsNIPReducer : state.disbursmentReducers.getOutwardsNIPReducer,
    };
}

export default connect(mapStateToProps) (NipOutwardsRequests);