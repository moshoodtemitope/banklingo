import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer';
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import "./disbursements.scss"; 
import DropdownButton from 'react-bootstrap/DropdownButton'
import closeIcon from '../../assets/img/close.svg'
import { numberWithCommas, getDateFromISO} from '../../shared/utils';
import {disbursementActions} from '../../redux/actions/disbursment/disbursment.action';
import {disbursmentConstants} from '../../redux/actiontypes/disbursment/disbursment.constants'

import DisbursementNav from './_menu'
class DisbursementManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:25,
            CurrentPage:1,
            showDetails: false,
            endDate: "",
            startDate: "",
            SearchText:""
        }

        
    }

    componentDidMount(){
        this.loadInitialData();
    }

    loadInitialData=()=>{
        let {PageSize, CurrentPage}= this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
        this.getDisbursements(params);
    }

    getDisbursements = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(disbursementActions.getDisbursement(paramters));
    }

    handleDateChangeRaw = (e) => {
        e.preventDefault();
    }
    handleStartDatePicker = (startDate) => {
        startDate.setHours(startDate.getHours() + 1);
        
        this.setState({ startDate }, ()=>{
            if(this.state.endDate!==""){
                //this.getHistory();
            }
        });
    }

    handleEndDatePicker = (endDate) => {
        endDate.setHours(endDate.getHours() + 1);
       
        this.setState({ endDate }, ()=>{
                if(this.state.startDate!==""){
                    //this.getHistory();
                }
        });
    }

    setPagesize = (PageSize, tempData)=>{
        // console.log('----here', PageSize.target.value);
        const {dispatch} = this.props;
        let sizeOfPage = PageSize.target.value,
            {CurrentPage} = this.state;

        this.setState({PageSize: sizeOfPage});

        let params= `&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;
        // this.getDisbursements(params);

        if(tempData){
            dispatch(disbursementActions.getDisbursement(params,false,tempData));
        }else{
            dispatch(disbursementActions.getDisbursement(params, false));
        }
    }

    getADisbursment =(transactionReference)=>{
        const {dispatch} =  this.props;

        dispatch(disbursementActions.getDisbursementByRef(transactionReference))
    }

    showDetails = (transactionReference)=>{
        
        this.setState({showDetails: true, transactionReference})
        this.getADisbursment(transactionReference);
       
    }

    exportDisbursmentBatches=()=>{
        let {PageSize,CurrentPage, SearchText, endDate, startDate} = this.state;
        
        if(endDate!==""){
            endDate = endDate.toISOString()
        }
        if(startDate!==""){
            startDate = startDate.toISOString()
        }
        let paramters= `PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
        const {dispatch} = this.props;

        dispatch(disbursementActions.exportDisbursmentBatches(paramters));
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize,CurrentPage} = this.state;

        // this.setState({PageSize: sizeOfPage});

        // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);
        let params= `&PageSize=${PageSize}&CurrentPage=${nextPage}`;

        if(tempData){
            dispatch(disbursementActions.getDisbursement(params,tempData));
        }else{
            dispatch(disbursementActions.getDisbursement(params));
        }
    }

    searchTxtn = (e,tempData)=>{
        e.preventDefault()
        const {dispatch} = this.props;
        let {PageSize,CurrentPage, BranchId, SearchText, endDate, startDate} = this.state;

        // this.setState({PageSize: sizeOfPage});

        // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);
        if(SearchText!=="" || endDate!=="" || startDate!==""){
            if(endDate!==""){
                endDate = endDate.toISOString()
            }
            if(startDate!==""){
                startDate = startDate.toISOString()
            }
            let params= `PageSize=${PageSize}&CurrentPage=${CurrentPage}&BranchId=${BranchId}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;

            if(tempData){
                dispatch(disbursementActions.getDisbursement(params,tempData));
            }else{
                dispatch(disbursementActions.getDisbursement(params));
            }
        }
    }

    
    closeDetails = ()=>{
        this.setState({showDetails:false});
    }

    renderADisbursment =(transactionReference)=>{
        
        
        let getDisbursementByRefRequest = this.props.getDisbursementByRefReducer;

        switch (getDisbursementByRefRequest.request_status){
            case (disbursmentConstants.GET_A_DISBURSMENT_PENDING):
                return (
                    <div className="card form-content details-wrap w-40">
                        <div className="close-icon" onClick={this.closeDetails}>
                            <img src={closeIcon} alt="" />
                        </div>
                        <div className="loading-content">
                            <div className="loading-text">Please wait... </div>
                        </div>
                    </div>
                   
                )
            case(disbursmentConstants.GET_A_DISBURSMENT_SUCCESS):
                let disbursmentData = getDisbursementByRefRequest.request_data.response.data;
                
                if(disbursmentData!==undefined){
                    if(disbursmentData.length>=1){
                        return(
                            <div className="">
                                <div className="card form-content details-wrap  w-40">
                                    <div className="form-heading centered mb-20">
                                        <h4>Disbursment details</h4>
                                        <div className="close-icon" onClick={this.closeDetails}>
                                            <img src={closeIcon} alt="" />
                                        </div>
                                    </div>
                                    <Row>
                                        {
                                            disbursmentData.map((eachInfo, index)=>{
                                                return(
                                                    <Col xs={6} className="mb-10" key={index}>
                                                        <div className="dissburseInfo">
                                                            <Form.Label className="block-level">{eachInfo.key}</Form.Label>
                                                            <span className="form-text disabled-field">{
                                                                (eachInfo.value!=='' && eachInfo.value!==null)?
                                                                    (eachInfo.key==="Amount")?`₦${numberWithCommas(eachInfo.value, true)}`:eachInfo.value
                                                                :'N/A'}
                                                            </span>
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                </div>
                            </div>
                        )
                    }else{
                        return(
                            <div className="card form-content details-wrap w-40">
                                <div className="close-icon" onClick={this.closeDetails}>
                                    <img src={closeIcon} alt="" />
                                </div>
                                <div className="no-records">
                                    No records found
                                </div>
                            </div>
                        )
                    }
                }else{
                    return null;
                }

            case (disbursmentConstants.GET_A_DISBURSMENT_FAILURE):
                return (
                    <div className="card form-content w-40">
                       <div className="loading-content errormsg"> 
                            <div>{getDisbursementByRefRequest.request_data.error}</div>
                        </div>
                    </div>
                    
                )
            default :
            return null;
        }
    }

    renderAllDisbursments=()=>{
        let getDisbursementsRequest = this.props.getDisbursementsReducer;
        let saveRequestData= getDisbursementsRequest.request_data!==undefined?getDisbursementsRequest.request_data.tempData:null;
            switch (getDisbursementsRequest.request_status){
                
                case (disbursmentConstants.GET_DISBURSMENTS_PENDING):
                    if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.result.length<1)){
                        return (
                            <div className="loading-content"> 
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
                                            value={this.state.PageSize}
                                        >
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

                                            <th>Batch Description</th>
                                            <th>Batch Reference</th>
                                            <th>Total Amount</th>
                                            <th>Date Initiated</th>
                                            <th>Batch Status</th>
                                            <th>Initiated by</th>
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
                                        </tr>
                                    </tbody>
                                </TableComponent>
                                <div className="loading-text">Please wait... </div>
                            </div>
                        )
                    }else{
                        return(
                            <div>

                                <div className="heading-with-cta">
                                    <Form className="one-liner" onSubmit={(e) => this.searchTxtn(e, saveRequestData)} >

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
                                                value={this.state.SearchText}
                                                onChange={(e) => {
                                                    this.setState({ SearchText: e.target.value.trim() })
                                                }}
                                            />
                                            {/* {errors.startDate && touched.startDate ? (
<span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
                                        </Form.Group>
                                        <Button className="no-margins" variant="primary" type="submit" >Filter</Button>
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

                                            <th>Batch Description</th>
                                            <th>Batch Reference</th>
                                            <th>Total Amount</th>
                                            <th>Date Initiated</th>
                                            <th>Batch Status</th>
                                            <th>Initiated by</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            saveRequestData.result.map((eachDisburment, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <tr>     
                                                            <td>{eachDisburment.batchDescription}</td>
                                                            <td>{eachDisburment.batchReference}</td>
                                                            <td>{numberWithCommas(eachDisburment.totalAmount, true, true)}</td>
                                                            <td>{getDateFromISO(eachDisburment.dateInitiated, true)}</td>
                                                            <td>{eachDisburment.batchStatusDescription}</td>
                                                            <td>{eachDisburment.initiatedBy}</td>
                                                            
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
                case(disbursmentConstants.GET_DISBURSMENTS_SUCCESS):
                    let allDisbursments = getDisbursementsRequest.request_data.response.data,
                        currentItemState;
                        
                        if(allDisbursments!==undefined){
                            if(allDisbursments.result.length>=1){
                                return(
                                    <div>
                                        
                                        <div className="heading-with-cta">
                                            <Form className="one-liner" onSubmit={(e) => this.searchTxtn(e, allDisbursments.result)} >

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
                                                        value={this.state.SearchText}
                                                        onChange={(e) => {
                                                            this.setState({ SearchText: e.target.value.trim() })
                                                        }}
                                                    />
                                                    {/* {errors.startDate && touched.startDate ? (
<span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
                                                </Form.Group>
                                                <Button className="no-margins" variant="primary" type="submit" >Filter</Button>
                                                <div className="actions-wrap">
                                            <Button onClick={this.exportDisbursmentBatches} className="action-icon" variant="outline-secondary" type="button">
                                                <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg==" width="16" height="16" />
                                            </Button>
                                        </div>
                                            </Form>

                                            <div className="pagination-wrap">
                                                <label htmlFor="toshow">Show</label>
                                                <select id="toshow" 
                                                    onChange={(e)=>this.setPagesize(e, allDisbursments)}
                                                    value={this.state.PageSize}
                                                    className="countdropdown form-control form-control-sm">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="200">200</option>
                                                </select>
                                                <TablePagination
                                                    totalPages={allDisbursments.totalPages}
                                                    currPage={allDisbursments.currentPage}
                                                    currRecordsCount={allDisbursments.result.length}
                                                    totalRows={allDisbursments.totalRows}
                                                    tempData={allDisbursments.result}
                                                    pagesCountToshow={4}
                                                    refreshFunc={this.loadNextPage}
                                                />
                                            </div>
                                        </div>
                                        <TableComponent classnames="striped bordered hover">
                                            <thead>
                                                <tr>
                                                
                                                <th>Batch Description</th>
                                                <th>Batch Reference</th>
                                                <th>Total Amount</th>
                                                <th>Date Initiated</th>
                                                <th>Batch Status</th>
                                                <th>Initiated by</th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allDisbursments.result.map((eachDisburment, index)=>{
                                                        if(eachDisburment.batchStatus ===1 || eachDisburment.batchStatus ===0){
                                                            currentItemState = "partial"
                                                        }
                                                        if(eachDisburment.batchStatus ===2){
                                                            currentItemState = "pending-review"
                                                        }
                                                        if(eachDisburment.batchStatus ===3){
                                                            currentItemState = "all"
                                                        }
                                                        if(eachDisburment.batchStatus ===4){
                                                            currentItemState = "pending-approval"
                                                        }
                                                        if(eachDisburment.batchStatus ===5){
                                                            currentItemState = "all"
                                                        }
                                                        if(eachDisburment.batchStatus ===6){
                                                            currentItemState = "all"
                                                        }
                                                        if(eachDisburment.batchStatus ===7){
                                                            currentItemState = "all"
                                                        }
                                                        return(
                                                            <Fragment key={index}>
                                                                <tr>
                                                                    <td>{eachDisburment.batchDescription}</td>
                                                                    <td>{eachDisburment.batchReference}</td>
                                                                    <td>{numberWithCommas(eachDisburment.totalAmount, true, true)}</td>
                                                                    <td>{getDateFromISO(eachDisburment.dateInitiated, true)}</td>
                                                                    <td>{eachDisburment.batchStatusDescription}</td>
                                                                    <td>{eachDisburment.initiatedBy}</td>
                                                                    <td>
                                                                        <DropdownButton
                                                                            size="sm"
                                                                            title="Actions"
                                                                            key="action"
                                                                            className="customone"
                                                                        >
                                                                            <NavLink className="dropdown-item" to={`/disbursements/${currentItemState}/${eachDisburment.batchReference}`}>View Batch</NavLink>

                                                                           

                                                                        </DropdownButton>
                                                                    </td>
                                                                    {/* <td><NavLink to={`/disbursements/partial/${eachDisburment.batchReference}`}> {eachDisburment.id} </NavLink> </td> */}
                                                                    {/* <td>{numberWithCommas(eachDisburment.totalAmount, true, true)}</td> */}
                                                                    {/* <td>{getDateFromISO(eachDisburment.lastUpdated)}</td> */}

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
                                            <Form className="one-liner" onSubmit={(e) => this.searchTxtn(e, allDisbursments.result)} >

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
                                                        value={this.state.SearchText}
                                                        onChange={(e) => {
                                                            this.setState({ SearchText: e.target.value.trim() })
                                                        }}
                                                    />
                                                    {/* {errors.startDate && touched.startDate ? (
<span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
                                                </Form.Group>
                                                <Button className="no-margins" variant="primary" type="submit" >Filter</Button>
                                            </Form>

                                            <div className="pagination-wrap">
                                                <label htmlFor="toshow">Show</label>
                                                <select id="toshow" 
                                                    className="countdropdown form-control form-control-sm"
                                                    value={this.state.PageSize}    
                                                >
                                                    <option value="10">10</option>
                                                    /partial
                                                    <option value="50">50</option>
                                                    <option value="200">200</option>
                                                </select>
                                            </div>
                                        </div>
                                        <TableComponent classnames="striped bordered hover">
                                            <thead>
                                                <tr>
                                                    <th>Batch Description</th>
                                                    <th>Batch Reference</th>
                                                    <th>Total Amount</th>
                                                    <th>Date Initiated</th>
                                                    <th>Batch Status</th>
                                                    <th>Initiated by</th>
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
                                                </tr>
                                            </tbody>
                                        </TableComponent>
                                    </div>
                                )
                            }
                        }else{
                            return null;
                        }

                case (disbursmentConstants.GET_DISBURSMENTS_FAILURE):
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{getDisbursementsRequest.request_data.error}</div>
                        </div>
                    )
                default :
                return null;
            }
    }

    render() {
        const {showDetails,transactionReference}  = this.state;
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
                                                <h2>Disbursements</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <DisbursementNav />
                                    {/* <ul className="nav">
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
                                            
                                        </li>
                                    </ul> */}
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {this.renderAllDisbursments()}

                                               {showDetails===true && this.renderADisbursment(transactionReference)}
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
        getDisbursementsReducer : state.disbursmentReducers.getDisbursementsReducer,
        getDisbursementByRefReducer : state.disbursmentReducers.getDisbursementByRefReducer,
    };
}

export default connect(mapStateToProps)(DisbursementManagement);