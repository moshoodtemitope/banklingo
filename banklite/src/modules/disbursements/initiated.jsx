import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Formik} from 'formik';
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert'

import Modal from 'react-bootstrap/Modal'
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer';
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import "./disbursements.scss"; 

import Accordion from 'react-bootstrap/Accordion'
import {numberWithCommas, getDateFromISO, allowNumbersOnly} from '../../shared/utils';

import {disbursementActions} from '../../redux/actions/disbursment/disbursment.action';
import {disbursmentConstants} from '../../redux/actiontypes/disbursment/disbursment.constants'
import DisbursementNav from './_menu'

class InitiatedDisbursmentBatches extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:25,
            CurrentPage:1,
            show: false,
            showDetails:false,
            confirmDeleteBatch: false,
            endDate: "",
            startDate: "",
            SearchText:"",
            securityCode:""
        }

        this.userPermissions =  JSON.parse(localStorage.getItem("x-u-perm"));
        
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

        dispatch(disbursementActions.getInitiatedDisbursements(paramters, true));
    }

    clearDeleteData = ()=>{
        const {dispatch} = this.props;

        dispatch(disbursementActions.deleteADisbursement("CLEAR"));
    }

    deleteABatch = async (batchInfo) => {
        const { dispatch } = this.props;

        await dispatch(disbursementActions.deleteADisbursement(batchInfo));
    }

    performDeletion = (batchInfo)=>{
        this.deleteABatch(batchInfo)
                .then(()=>{
                    setTimeout(() => {
                        if (this.props.deleteADisbursementReducer.request_status === disbursmentConstants.DELETE_A_BATCH_SUCCESS) {
                            this.clearDeleteData();
                            this.handleCloseDelete();
                            this.loadInitialData();
                        }
                    }, 3500);
                    
                })
    }

    handleCloseDelete = () =>{
        let deleteADisbursementRequest = this.props.deleteADisbursementReducer;
        if(deleteADisbursementRequest.request_status !== disbursmentConstants.DELETE_A_BATCH_PENDING){
            this.setState({confirmDeleteBatch:false})
        }
    }
    handleShowDelete = ()=>{
        this.clearDeleteData();
        this.setState({confirmDeleteBatch:true})
    }

    deleteABatchConfirm = () =>{
        let {confirmDeleteBatch, batchToDelete, securityCode, batchIdToDelete} = this.state;
        let deleteADisbursementRequest = this.props.deleteADisbursementReducer;
        
        
        return(
            <Modal show={confirmDeleteBatch} onHide={this.handleCloseDelete}  size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={true}>
                <Modal.Header>
                    Delete Batch 
                </Modal.Header>
                <Modal.Body>
                    
                    
                    {deleteADisbursementRequest.request_status === disbursmentConstants.DELETE_A_BATCH_PENDING && 
                        <div className="text-center ">
                            Deleting Batch - {batchIdToDelete}
                            
                        </div>
                    }
                    {(deleteADisbursementRequest.request_status === disbursmentConstants.DELETE_A_BATCH_RESET 
                        || deleteADisbursementRequest.request_status === disbursmentConstants.DELETE_A_BATCH_FAILURE) &&
                            <Form.Group >
                                                                    
                                <Form.Label className="block-level">Security Code</Form.Label>
                                <Form.Control type="password"
                                    name="securityCode"
                                    onChange={(e)=>this.setState({securityCode: e.target.value})}
                                    placeholder="Enter your security code"
                                    value={allowNumbersOnly(securityCode)}
                                    // className={errors.securityCode && touched.securityCode ? "is-invalid" : null}
                                    required />
                                
                                
                            </Form.Group>
                    }
                    {deleteADisbursementRequest.request_status === disbursmentConstants.DELETE_A_BATCH_FAILURE && 
                        <div className="text-center errortxt">
                            {deleteADisbursementRequest.request_data.error}
                        </div>
                    }
                    {deleteADisbursementRequest.request_status === disbursmentConstants.DELETE_A_BATCH_SUCCESS && 
                       <div className="text-center">
                           {deleteADisbursementRequest.request_data.response.data.message}
                        </div>
                    }
                </Modal.Body>
                {(deleteADisbursementRequest.request_status !== disbursmentConstants.DELETE_A_BATCH_SUCCESS) && 
                    <Modal.Footer>
                        <div className="footer-with-cta toleft">
                            <Button 
                                variant="secondary"
                                type="button"
                                onClick={this.handleCloseDelete}
                                disabled={deleteADisbursementRequest.is_request_processing}
                            >
                                Cancel
                                
                                
                            </Button>
                            
                            <Button 
                                variant="success"
                                type="submit"
                                disabled={deleteADisbursementRequest.is_request_processing}
                                onClick={()=>{ 
                                    if(securityCode!==""){
                                        let payload={
                                            batchReference: batchToDelete,
                                            securityCode: securityCode.replace(/\D/g, '')
                                        }
                                        this.performDeletion(payload)
                                    }
                                    
                                }}
                            >
                                Confirm Delete
                                
                                
                            </Button>
                        </div>

                    </Modal.Footer>
                }
                {(deleteADisbursementRequest.request_status === disbursmentConstants.DELETE_A_BATCH_SUCCESS ) && 
                    <Modal.Footer>

                        
                        <Button 
                            variant="success"
                            type="button"
                            onClick={this.handleCloseDelete}
                        >
                            Okay
                            
                            
                        </Button>

                    </Modal.Footer>
                }
            </Modal>
        )
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
        const {dispatch} = this.props;
        let sizeOfPage = PageSize.target.value,
            {CurrentPage} = this.state;

        this.setState({PageSize: sizeOfPage});

        let params= `&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;

        if(tempData){
            dispatch(disbursementActions.getDisbursement(params,tempData));
        }else{
            dispatch(disbursementActions.getDisbursement(params));
        }

        
    }

    loadNextPage = (nextPage, tempData)=>{
        const {dispatch} = this.props;
        let {PageSize} = this.state;


        let params= `&PageSize=${PageSize}&CurrentPage=${nextPage}`;

        if(tempData){
            dispatch(disbursementActions.getDisbursement(params,tempData));
        }else{
            dispatch(disbursementActions.getDisbursement(params));
        }

        
    }
    handleBackToEdit = ()=>{
        this.setState({showDetails: false})
    }

    handleClose = () => this.setState({show:false});
    
    handleShow = () => this.setState({show:true});

   

    showDetails=(transactionReference)=>{
        let getDisbursementsRequest = this.props.getDisbursementsReducer,
            allDisbursments = getDisbursementsRequest.request_data.response.data.result,
            transacTionSelected = allDisbursments.filter(txt=>txt.transactionReference===transactionReference)[0];

            this.setState({transacTionSelected, showDetails:true})
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
                dispatch(disbursementActions.getInitiatedDisbursements(params,tempData));
            }else{
                dispatch(disbursementActions.getInitiatedDisbursements(params));
            }
        }
    }

    renderPendingDisbursment=()=>{
        let getDisbursementsRequest = this.props.getInitiatedDisbursementsReducer;
        let {confirmDeleteBatch} = this.state;
        let saveRequestData= getDisbursementsRequest.request_data!==undefined?getDisbursementsRequest.request_data.tempData:null;
            switch (getDisbursementsRequest.request_status){
                case (disbursmentConstants.GET_INITIATED_BATCHES_PENDING):
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

                                             <th>Batch Description</th>
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
                                        </tr>
                                    </tbody>
                                </TableComponent>
                                <div className="loading-text">Please wait... </div>
                            </div>
                        )
                    }else{
                        return(
                            <div>
                                <div className="heading-actions">
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
                                        </Form.Group>
                                        <Button className="no-margins" variant="primary" type="submit" >Filter</Button>
                                    </Form>
                                    <div className="actions-wrap">
                                        <Button className="action-icon" variant="outline-secondary" type="button">
                                            <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg==" width="16" height="16" />
                                        </Button>
                                        <Button className="action-icon" variant="outline-secondary" type="button">
                                            <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPklEQVR42q2SMY6CQBiFvc/ewVBQWHgFRAkRQwLxAKjTUVh5BKOhEDtiTaFBCAXE0GJjTYgWJFRvGQuyrLOSTXzJ6ybf++f9f6fzafX7fU6SJGia1vB4PMZoNHJbAYqioCgKsHQ4HDCZTMhbgGEYKMuS6SiK0O12XwFZln2JouhW9JfRWZZlGZZlqTVgOp0Sx3HQpjzPcTwecbvdQL9aA+hYcRy3Au73O4IgwOPxgK7r/wf81GcBHMeRMAyhqioEQcBwOGS6KhqDwQA0jL6tAev1mqxWK1yvV8zn8z9TkySBbdu4XC5YLBZorHK5XBLTNJ+A3W73kk5X53nes/3ZbOZWW+OYh0QB1V0gTdOG6XQ0mXlIvwG+72Oz2TS83W5xOp3aAbQcWhLL+/0ePM+/B1RlEprCcq/XI+fzufH3b1NUA2h4gmflAAAAAElFTkSuQmCC" width="16" height="16" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="heading-with-cta">
                                    

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
                                            <th>Total Amount</th>
                                            <th>Date Initiated</th>
                                            <th>Batch Status</th>
                                            <th>Initiated by</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            saveRequestData.result.map((eachDisburment, index)=>{
                                                return(
                                                    <Fragment key={index}>
                                                        <tr>     
                                                            <td>{eachDisburment.batchDescription}</td>
                                                            <td>{numberWithCommas(eachDisburment.totalAmount, true, true)}</td>
                                                            <td>{getDateFromISO(eachDisburment.dateInitiated)}</td>
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
                case(disbursmentConstants.GET_INITIATED_BATCHES_SUCCESS):
                    let allDisbursments = getDisbursementsRequest.request_data.response.data;
                        
                        if(allDisbursments!==undefined){
                            if(allDisbursments.result.length>=1){
                                return(
                                    <div>
                                        {confirmDeleteBatch && this.deleteABatchConfirm()}
                                        {/* <div className="heading-actions"> */}
                                            
                                            {/* <div className="actions-wrap">
                                                <Button className="action-icon" variant="outline-secondary" type="button">
                                                    <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg==" width="16" height="16" />
                                                </Button>
                                                <Button className="action-icon" variant="outline-secondary" type="button">
                                                    <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPklEQVR42q2SMY6CQBiFvc/ewVBQWHgFRAkRQwLxAKjTUVh5BKOhEDtiTaFBCAXE0GJjTYgWJFRvGQuyrLOSTXzJ6ybf++f9f6fzafX7fU6SJGia1vB4PMZoNHJbAYqioCgKsHQ4HDCZTMhbgGEYKMuS6SiK0O12XwFZln2JouhW9JfRWZZlGZZlqTVgOp0Sx3HQpjzPcTwecbvdQL9aA+hYcRy3Au73O4IgwOPxgK7r/wf81GcBHMeRMAyhqioEQcBwOGS6KhqDwQA0jL6tAev1mqxWK1yvV8zn8z9TkySBbdu4XC5YLBZorHK5XBLTNJ+A3W73kk5X53nes/3ZbOZWW+OYh0QB1V0gTdOG6XQ0mXlIvwG+72Oz2TS83W5xOp3aAbQcWhLL+/0ePM+/B1RlEprCcq/XI+fzufH3b1NUA2h4gmflAAAAAElFTkSuQmCC" width="16" height="16" />
                                                </Button>
                                            </div> */}
                                        {/* </div> */}
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
                                                        return(
                                                            <Fragment key={index}>
                                                                <tr>
                                                                    <td>{eachDisburment.batchDescription}</td>
                                                                    <td>{numberWithCommas(eachDisburment.totalAmount, true, true)}</td>
                                                                    <td>{getDateFromISO(eachDisburment.dateInitiated)}</td>
                                                                    <td>{eachDisburment.batchStatusDescription}</td>
                                                                    <td>{eachDisburment.initiatedBy}</td>
                                                                    <td>
                                                                        <DropdownButton
                                                                                size="sm"
                                                                                title="Actions"
                                                                                key="action"
                                                                                className="customone"
                                                                            >
                                                                                <NavLink className="dropdown-item" to={`/disbursements/partial/${eachDisburment.batchReference}`}>View Batch</NavLink>
                                                                                <Dropdown.Item eventKey="1" 
                                                                                    onClick={()=>{
                                                                                    this.handleShowDelete();
                                                                                    this.setState({batchToDelete:eachDisburment.batchReference, batchIdToDelete:eachDisburment.id})}} >Delete Batch</Dropdown.Item>
                                                                                {/* <Dropdown.Item eventKey="1" onClick={()=>this.resetUserPIN({"encodedKey":eachDisburment.batchReference }, eachDisburment.batchReference)}>Delete Batch</Dropdown.Item> */}
                                                                                
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
                                                <th>Batch Description</th>
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
                                            </tr>
                                        </tbody>
                                    </TableComponent>
                                    </div>
                                )
                            }
                        }else{
                            return null;
                        }

                case (disbursmentConstants.GET_INITIATED_BATCHES_FAILURE):
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
        const {transacTionSelected, showDetails}=this.state;
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
                                                <h2>Partial Applications</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <DisbursementNav />
                                    
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {(showDetails===false) && this.renderPendingDisbursment()}
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
        getInitiatedDisbursementsReducer : state.disbursmentReducers.getInitiatedDisbursementsReducer,
        deleteADisbursementReducer : state.disbursmentReducers.deleteADisbursementReducer,
    };
}
export default connect(mapStateToProps)(InitiatedDisbursmentBatches);