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
import {numberWithCommas} from '../../shared/utils';

import {disbursementActions} from '../../redux/actions/disbursment/disbursment.action';
import {disbursmentConstants} from '../../redux/actiontypes/disbursment/disbursment.constants'

class DisbursementPendingReview extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:25,
            CurrentPage:1,
            show: false,
            showDetails:false,
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

        dispatch(disbursementActions.getPendingReviewDisbursement(paramters, true));
    }

    approveOrRejectReviewedDisbursementRequest = async (actionPayload)=>{
        const {dispatch} = this.props;

        await dispatch(disbursementActions.approveOrRejectReviewedDisbursement(actionPayload));
    }

    rejectDisburmentRequest = async (rejectionPayload)=>{
        const {dispatch} = this.props;

        await dispatch(disbursementActions.rejectPostDisbursement(rejectionPayload));
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
            dispatch(disbursementActions.getPendingReviewDisbursement(params,tempData));
        }else{
            dispatch(disbursementActions.getPendingReviewDisbursement(params));
        }

        // this.getDisbursements(params);
    }

    loadNextPage = (nextPage, tempData)=>{
        const {dispatch} = this.props;
        let {PageSize} = this.state;


        let params= `&PageSize=${PageSize}&CurrentPage=${nextPage}`;

        if(tempData){
            dispatch(disbursementActions.getPendingReviewDisbursement(params,tempData));
        }else{
            dispatch(disbursementActions.getPendingReviewDisbursement(params));
        }

        // this.getDisbursements(params);
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
                dispatch(disbursementActions.getPendingReviewDisbursement(params,tempData));
            }else{
                dispatch(disbursementActions.getPendingReviewDisbursement(params));
            }
        }
    }
    handleBackToEdit = ()=>{
        this.setState({showDetails: false})
    }

    handleClose = () => this.setState({show:false});
    
    handleShow = () => this.setState({show:true});

    renderFullDetails=(transactionToProcess)=>{
        const {show}= this.state;
       let  approveOrRejectReviewedDisbursementRequest= this.props.approveOrRejectReviewedDisbursementReducer,
            rejectPostDisbursementRequest= this.props.rejectPostDisbursementReducer,
            processDisburmentValidationSchema = Yup.object().shape({
                securityCode: Yup.string()
                    .min(1, 'Vailid response required')
                    .max(50, 'Valid response required')
                    .required('Security Code is required'),
                comment: Yup.string()
                    .min(1, 'Please provide account number')
                    .required('Comment is required'),
            })
        return(
            <Modal show={show} onHide={this.handleClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={true}>
                        <Modal.Header>
                            <Modal.Title>Disbursment request details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Formik
                                initialValues={{
                                    securityCode: '',
                                    comment: '',
                                }}
                               validationSchema={processDisburmentValidationSchema}
                                onSubmit={(values, { resetForm }) => {
                                    
                                    
                                    let processPayload = {
                                        transactionReference: transactionToProcess.transactionReference,
                                        securityCode: values.securityCode,
                                        comment: values.comment,
                                        actionToPerform: this.state.actionToPerform
                                    }
                                
                                    
                                    
                                    this.approveOrRejectReviewedDisbursementRequest(processPayload)
                                        .then(
                                            () => {
                                                if(this.props.approveOrRejectReviewedDisbursementReducer.request_status === disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_SUCCESS){
                                                    const {dispatch} = this.props;
                                                    let  {CurrentPage, PageSize} = this.state;

                                                    this.setState({PageSize: PageSize});

                                                    let params= `&PageSize=${PageSize}&CurrentPage=${CurrentPage}`;

                                                    let getDisbursementsRequest = this.props.getDisbursementsReducer;

                                                    let saveRequestData= getDisbursementsRequest.request_data!==undefined?getDisbursementsRequest.request_data.tempData:null;

                                                    

                                                    
                                                    setTimeout(() => {
                                                        resetForm();
                                                        dispatch(disbursementActions.getPendingReviewDisbursement(params,saveRequestData));
                                                        this.props.dispatch(disbursementActions.approveOrRejectReviewedDisbursement("CLEAR"));
                                                        this.handleClose();
                                                    }, 2000);
                                                }else{
                                                    if (this.props.approveOrRejectReviewedDisbursementReducer.request_status === disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_FAILURE) {
                                                        setTimeout(() => {
                                                            resetForm();
                                                        }, 2000);
                                                    }
                                                    // setTimeout(() => {
                                                    //     this.props.dispatch(administrationActions.updateTransactionChannel("CLEAR"))
                                                    // }, 2000);
                                                }
                                                
                                                

                                            }
                                        )
                                    
                                        
                                

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
                                            
                                            
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                            Sender Details
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <div>
                                                
                                                <Form.Row>

                                                    {/* <Col>
                                                        <Form.Label className="block-level">Transaction Source</Form.Label>


                                                        <span className="form-text disabled-field">{selectedTxtSourceText}</span>
                                                    </Col> */}
                                                    <Col>
                                                        <Form.Label className="block-level">Source Account</Form.Label>
                                                        <span className="form-text disabled-field">{transactionToProcess.sourceAccount}</span>
                                                    </Col>
                                                    <Col></Col>
                                                </Form.Row>
                                            </div>
                                        </Accordion.Collapse>
                                    </Accordion>
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                            Recipient Details
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <div>
                                                
                                                <Form.Row>
                                                    <Col>
                                                        <Form.Group >
                                                            <Form.Label className="block-level">Destination Bank</Form.Label>
                                                            <span className="form-text disabled-field">{transactionToProcess.destinationBank}</span>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col>
                                                        <Form.Group >
                                                            <Form.Label className="block-level">Destination Account </Form.Label>
                                                            <span className="form-text disabled-field">{transactionToProcess.destinationAccount}</span>
                                                        </Form.Group>
                                                    </Col>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Col>
                                                        <Form.Label className="block-level">Amount</Form.Label>
                                                        <span className="form-text disabled-field">{numberWithCommas(transactionToProcess.amount)}</span>
                                                    </Col>
                                                    <Col>
                                                        {/* <Form.Label className="block-level">Narration</Form.Label>
                                                        <span className="form-text disabled-field">{postDisbursementpayload.narration}</span> */}
                                                    </Col>

                                                </Form.Row>

                                            </div>
                                        </Accordion.Collapse>
                                    </Accordion>

                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                            Provide Confirmation details
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <div>
                                                
                                                
                                                <Form.Row>
                                                    <Col>
                                                        <Form.Group>

                                                            <Form.Label className="block-level">Comments</Form.Label>
                                                            <Form.Control
                                                                as="textarea" rows="3"
                                                                onChange={handleChange}
                                                                value={values.comment}
                                                                className={errors.comment && touched.comment ? "is-invalid" : null}
                                                                name="comment"
                                                            />
                                                            {errors.comment && touched.comment ? (
                                                                <span className="invalid-feedback">{errors.comment}</span>
                                                            ) : null}

                                                        </Form.Group>
                                                    </Col>
                                                </Form.Row>
                                                <Form.Row>

                                                    <Col>
                                                        <Form.Group >
                                                            
                                                            <Form.Label className="block-level">Security Code</Form.Label>
                                                            <Form.Control type="password"
                                                                name="securityCode"
                                                                onChange={handleChange}
                                                                placeholder="Enter the security code sent to you"
                                                                value={values.securityCode}
                                                                className={errors.securityCode && touched.securityCode ? "is-invalid" : null}
                                                                required />
                                                            {errors.securityCode && touched.securityCode ? (
                                                                <span className="invalid-feedback">{errors.securityCode}</span>
                                                            ) : null}
                                                            
                                                        </Form.Group>
                                                    </Col>
                                                </Form.Row>


                                            </div>
                                        </Accordion.Collapse>
                                    </Accordion>
                                            
                                                
                                            {approveOrRejectReviewedDisbursementRequest.request_status !== disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_SUCCESS && 
                                                <div className="footer-with-cta toleft">
                                                    {/* <Button variant="secondary" className="grayed-out" onClick={this.handleCloseEdit}>Cancel</Button> */}
                                                    <Button
                                                        type="submit"
                                                        onClick={()=>this.setState({actionToPerform: "approve"})}
                                                        disabled={approveOrRejectReviewedDisbursementRequest.is_request_processing}>
                                                            {approveOrRejectReviewedDisbursementRequest.is_request_processing && this.state.actionToPerform==="approve"?"Please wait...": "Approve"}
                                                        </Button>

                                                        <Button
                                                        type="submit"
                                                        onClick={()=>this.setState({actionToPerform: "reject"})}
                                                        disabled={approveOrRejectReviewedDisbursementRequest.is_request_processing}>
                                                            {approveOrRejectReviewedDisbursementRequest.is_request_processing && this.state.actionToPerform==="reject"?"Please wait...": "Reject"}
                                                        </Button>
                                                </div>
                                            }
                                        </Form>
                                    )}
                            </Formik>
                            {approveOrRejectReviewedDisbursementRequest.request_status === disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_SUCCESS && 
                                <Alert variant="success">
                                    {approveOrRejectReviewedDisbursementRequest.request_data.response.data.message}
                                </Alert>
                            }
                            {approveOrRejectReviewedDisbursementRequest.request_status === disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_FAILURE && 
                                <Alert variant="danger">
                                    {approveOrRejectReviewedDisbursementRequest.request_data.error}
                                </Alert>
                            }

                            {/* {rejectPostDisbursementRequest.request_status === disbursmentConstants.REJECT_DISBURSMENT_SUCCESS && 
                                <Alert variant="success">
                                    {rejectPostDisbursementRequest.request_data.response.data.message}
                                </Alert>
                            }
                            {rejectPostDisbursementRequest.request_status === disbursmentConstants.REJECT_DISBURSMENT_FAILURE && 
                                <Alert variant="danger">
                                    {rejectPostDisbursementRequest.request_data.error}
                                </Alert>
                            } */}
                        </Modal.Body>
                    </Modal>
        )
    }

    showDetails=(transactionReference)=>{
        let getDisbursementsRequest = this.props.getDisbursementsReducer,
            allDisbursments = getDisbursementsRequest.request_data.response.data.result,
            transacTionSelected = allDisbursments.filter(txt=>txt.transactionReference===transactionReference)[0];

            this.setState({transacTionSelected, showDetails:true})
    }

    renderPendingDisbursment=()=>{
        let getDisbursementsRequest = this.props.getDisbursementsReducer;

        let saveRequestData= getDisbursementsRequest.request_data!==undefined?getDisbursementsRequest.request_data.tempData:null;
            switch (getDisbursementsRequest.request_status){
                case (disbursmentConstants.GET_PENDING_REVIEW_DISBURSMENTS_PENDING):
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

                                            <th>Transaction Ref</th>
                                            <th>Request Date</th>
                                            <th>Source Account</th>
                                            <th>Sender Name</th>
                                            <th>Destination Account</th>
                                            <th>Destination Bank</th>
                                            <th>Recipient Name</th>
                                            <th>Amount</th>
                                            <th>Inititated By</th>
                                            <th>Approved By</th>
                                            <th>Status</th>
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
                                            {/* {errors.startDate && touched.startDate ? (
<span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
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
                                    {/* <Form className="one-liner">

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
                                                className="form-control form-control-sm"

                                            />
                                            <input type="text"
                                                className="form-control-sm search-table form-control"
                                                placeholder="Search text"
                                            />
                                        </Form.Group>
                                        <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                    </Form> */}

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
                                           
                                            <th>Transaction Ref</th>
                                            <th>Request Date</th>
                                            <th>Source Account</th>
                                            <th>Sender Name</th>
                                            <th>Destination Account</th>
                                            <th>Destination Bank</th>
                                            <th>Recipient Name</th>
                                            <th>Amount (NGN)</th>
                                            <th>Inititated By</th>
                                            {/* <th>Approved By</th> */}
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            saveRequestData.result.map((eachDisburment, index)=>{
                                                return(
                                                    <Fragment key={index}>
                                                        <tr>
                                                            
                                                            <td>
                                                                <span className="txt-cta" onClick={()=>this.showDetails(eachDisburment.transactionReference)} >{eachDisburment.transactionReference}</span> 
                                                            </td>
                                                            <td>{eachDisburment.createdDate}</td>
                                                            <td>{eachDisburment.sourceAccount}</td>
                                                            <td>{eachDisburment.senderName}</td>
                                                            <td>{eachDisburment.destinationAccount}</td>
                                                            <td>{eachDisburment.destinationBank}</td>
                                                            <td>{eachDisburment.recipientName}</td>
                                                            <td>{numberWithCommas(eachDisburment.amount, true)}</td>
                                                            <td>{eachDisburment.initiatedBy}</td>
                                                            {/* <td>{eachDisburment.approvedBy}</td> */}
                                                            <td>{eachDisburment.disbursmentStatusDescription}</td>
                                                            {/* <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    className="customone"
                                                                >
                                                                    
                                                                    <Dropdown.Item eventKey="1">Approve</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="2">Reject</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td> */}
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
                case(disbursmentConstants.GET_PENDING_REVIEW_DISBURSMENTS_SUCCESS):
                    let allDisbursments = getDisbursementsRequest.request_data.response.data;
                        
                        if(allDisbursments!==undefined){
                            if(allDisbursments.result.length>=1){
                                return(
                                    <div>
                                        <div className="heading-actions">
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
                                            {/* <Form className="one-liner">

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
                                                        className="form-control form-control-sm"

                                                    />
                                                    <input type="text"
                                                        className="form-control-sm search-table form-control"
                                                        placeholder="Search text"
                                                    />

                                                </Form.Group>
                                                <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                            </Form> */}

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
                                                   
                                                    <th>Transaction Ref</th>
                                                    <th>Request Date</th>
                                                    <th>Source Account</th>
                                                    <th>Sender Name</th>
                                                    <th>Destination Account</th>
                                                    <th>Destination Bank</th>
                                                    <th>Recipient Name</th>
                                                    <th>Amount (NGN)</th>
                                                    <th>Inititated By</th>
                                                    {/* <th>Approved By</th> */}
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allDisbursments.result.map((eachDisburment, index)=>{
                                                        return(
                                                            <Fragment key={index}>
                                                                <tr>
                                                                    
                                                                    <td>
                                                                        <span className="txt-cta" onClick={()=>this.showDetails(eachDisburment.transactionReference)} >{eachDisburment.transactionReference}</span> 
                                                                    </td>
                                                                    <td>{eachDisburment.createdDate}</td>
                                                                    <td>{eachDisburment.sourceAccount}</td>
                                                                    <td>{eachDisburment.senderName}</td>
                                                                    <td>{eachDisburment.destinationAccount}</td>
                                                                    <td>{eachDisburment.destinationBank}</td>
                                                                    <td>{eachDisburment.recipientName}</td>
                                                                    <td>{numberWithCommas(eachDisburment.amount, true)}</td>
                                                                    <td>{eachDisburment.initiatedBy}</td>
                                                                    {/* <td>{eachDisburment.approvedBy}</td> */}
                                                                    <td>{eachDisburment.disbursmentStatusDescription}</td>
                                                                    {/* <td>
                                                                        <DropdownButton
                                                                            size="sm"
                                                                            title="Actions"
                                                                            className="customone"
                                                                        >
                                                                            
                                                                            <Dropdown.Item eventKey="1">Approve</Dropdown.Item>
                                                                            <Dropdown.Item eventKey="2">Reject</Dropdown.Item>
                                                                        </DropdownButton>
                                                                    </td> */}
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
                                                
                                                <th>Transaction Ref</th>
                                                <th>Request Date</th>
                                                <th>Source Account</th>
                                                <th>Sender Name</th>
                                                <th>Destination Account</th>
                                                <th>Destination Bank</th>
                                                <th>Recipient Name</th>
                                                <th>Amount</th>
                                                <th>Inititated By</th>
                                                <th>Approved By</th>
                                                <th>Status</th>
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
                            }
                        }else{
                            return null;
                        }

                case (disbursmentConstants.GET_PENDING_REVIEW_DISBURSMENTS_FAILURE):
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{getDisbursementsRequest.request_data.error}</div>
                        </div>
                    )
                default :
                return null;
            }
    }

    renderDisbursment =(transactionToProcess)=>{
        let  approveOrRejectReviewedDisbursementRequest= this.props.approveOrRejectReviewedDisbursementReducer,
        rejectPostDisbursementRequest= this.props.rejectPostDisbursementReducer,
        processDisburmentValidationSchema = Yup.object().shape({
            securityCode: Yup.string()
                .min(1, 'Vailid response required')
                .max(50, 'Valid response required')
                .required('Security Code is required'),
            comment: Yup.string()
                .min(1, 'Please provide account number')
                .required('Comment is required'),
        })
        return(
            <div>
                <Formik
                    initialValues={{
                        securityCode: '',
                        comment: '',
                    }}
                    validationSchema={processDisburmentValidationSchema}
                    onSubmit={(values, { resetForm }) => {


                        let processPayload = {
                            transactionReference: transactionToProcess.transactionReference,
                            securityCode: values.securityCode,
                            comment: values.comment,
                            actionToPerform: this.state.actionToPerform
                        }



                        this.approveOrRejectReviewedDisbursementRequest(processPayload)
                            .then(
                                () => {
                                    
                                    if (this.props.approveOrRejectReviewedDisbursementReducer.request_status === disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_SUCCESS) {
                                        const {dispatch} = this.props;
                                                    let {CurrentPage, PageSize} = this.state;

                                                    this.setState({PageSize: PageSize});

                                                    let params= `&PageSize=${PageSize}&CurrentPage=${CurrentPage}`;

                                                    let getDisbursementsRequest = this.props.getDisbursementsReducer;

                                                    let saveRequestData= getDisbursementsRequest.request_data!==undefined?getDisbursementsRequest.request_data.tempData:null;

                                        setTimeout(() => {
                                            resetForm();
                                            this.setState({showDetails:false})
                                            // this.loadInitialData();
                                            dispatch(disbursementActions.getPendingReviewDisbursement(params,saveRequestData));
                                            this.props.dispatch(disbursementActions.approveOrRejectReviewedDisbursement("CLEAR"));
                                            this.handleClose();
                                        }, 2000);
                                    } else {
                                        if (this.props.approveOrRejectReviewedDisbursementReducer.request_status === disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_FAILURE) {
                                            setTimeout(() => {
                                                resetForm();
                                            }, 2000);
                                        }
                                        // setTimeout(() => {
                                        //     this.props.dispatch(administrationActions.updateTransactionChannel("CLEAR"))
                                        // }, 2000);
                                    }



                                }
                            )




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
                                className="form-content w-40 card"
                                onSubmit={handleSubmit}>


                                <Accordion defaultActiveKey="0" className="mb-0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Sender Details
                                        </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>

                                            <Form.Row>

                                                <Col xs={6}>
                                                        <Form.Label className="block-level">Sender Name</Form.Label>


                                                        <span className="form-text disabled-field">{transactionToProcess.senderName}</span>
                                                    </Col>
                                                <Col xs={6}>
                                                    <Form.Label className="block-level">Source Account</Form.Label>
                                                    <span className="form-text disabled-field">{transactionToProcess.sourceAccount}</span>
                                                </Col>
                                                <Col></Col>
                                            </Form.Row>
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>
                                <Accordion defaultActiveKey="0" className="mb-0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Recipient Details
                                        </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>

                                            <Form.Row className="mb-0">
                                                <Col xs={6}>
                                                    <Form.Group >
                                                        <Form.Label className="block-level">Destination Bank</Form.Label>
                                                        <span className="form-text disabled-field">{transactionToProcess.destinationBank}</span>
                                                    </Form.Group>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Group  className="mb-0">
                                                        <Form.Label className="block-level">Destination Account </Form.Label>
                                                        <span className="form-text disabled-field">{transactionToProcess.destinationAccount}</span>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col xs={6}>
                                                    <Form.Label className="block-level">Recipient Name</Form.Label>
                                                        <span className="form-text disabled-field">{transactionToProcess.recipientName}</span>
                                                </Col>
                                                <Col xs={6}>
                                                    <Form.Label className="block-level">Amount</Form.Label>
                                                    <span className="form-text disabled-field">&#8358;{numberWithCommas(transactionToProcess.amount, true)}</span>
                                                </Col>

                                            </Form.Row>

                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>

                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Provide Confirmation details
                                        </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            

                                            <Form.Row>
                                                <Col>
                                                    <Form.Group className="mb-0">

                                                        <Form.Label className="block-level">Comments</Form.Label>
                                                        <Form.Control
                                                            as="textarea" rows="3"
                                                            onChange={handleChange}
                                                            value={values.comment}
                                                            className={errors.comment && touched.comment ? "is-invalid" : null}
                                                            name="comment"
                                                        />
                                                        {errors.comment && touched.comment ? (
                                                            <span className="invalid-feedback">{errors.comment}</span>
                                                        ) : null}

                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>
                                            <Form.Row className="mb-0">

                                                <Col>
                                                    <Form.Group className="mb-0">

                                                        <Form.Label className="block-level">Security Code</Form.Label>
                                                        <Form.Control type="password"
                                                            name="securityCode"
                                                            onChange={handleChange}
                                                            placeholder="Enter the security code sent to you"
                                                            value={values.securityCode}
                                                            className={errors.securityCode && touched.securityCode ? "is-invalid" : null}
                                                            required />
                                                        {errors.securityCode && touched.securityCode ? (
                                                            <span className="invalid-feedback">{errors.securityCode}</span>
                                                        ) : null}

                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>

                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>


                                {approveOrRejectReviewedDisbursementRequest.request_status !== disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_SUCCESS &&
                                    <div>
                                        <div className="footer-with-cta centered approvalctas">
                                            {/* <Button variant="secondary" className="grayed-out" onClick={this.handleCloseEdit}>Cancel</Button> */}
                                            <Button
                                                type="submit"
                                                className="redvariant"
                                                onClick={() => this.setState({ actionToPerform: "approve" })}
                                                disabled={approveOrRejectReviewedDisbursementRequest.is_request_processing}>
                                                {approveOrRejectReviewedDisbursementRequest.is_request_processing && this.state.actionToPerform === "approve" ? "Please wait..." : "Send for Approval"}
                                            </Button>

                                            <Button
                                                type="submit"
                                                // className="ml-50"
                                                onClick={() => this.setState({ actionToPerform: "reject" })}
                                                disabled={approveOrRejectReviewedDisbursementRequest.is_request_processing}>
                                                {approveOrRejectReviewedDisbursementRequest.is_request_processing && this.state.actionToPerform === "reject" ? "Please wait..." : "Reject"}
                                            </Button>
                                        </div>
                                        <div className="back-cta centered" onClick={this.handleBackToEdit}>
                                            <span className="back-link">Back</span>
                                        </div>
                                    </div>
                                }

                                {approveOrRejectReviewedDisbursementRequest.request_status === disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_SUCCESS &&
                                    <Alert variant="success">
                                        {approveOrRejectReviewedDisbursementRequest.request_data.response.data.message}
                                    </Alert>
                                }
                                {approveOrRejectReviewedDisbursementRequest.request_status === disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_FAILURE &&
                                    <Alert variant="danger">
                                        {approveOrRejectReviewedDisbursementRequest.request_data.error}
                                    </Alert>
                                }
                            </Form>
                        )}
                </Formik>

            </div>   
        )
    }

    render() {
        const {transacTionSelected, showDetails}=this.state;
        let  approveOrRejectReviewedDisbursementRequest= this.props.approveOrRejectReviewedDisbursementReducer;
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
                                                <h2>Pending Review</h2>
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
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {(showDetails===false) && this.renderPendingDisbursment()}
                                                {
                                                    (this.props.getDisbursementsReducer.request_status ===disbursmentConstants.GET_PENDING_REVIEW_DISBURSMENTS_SUCCESS 
                                                        && showDetails===true && approveOrRejectReviewedDisbursementRequest.request_status!==disbursmentConstants.APPROVE_OR_REJECT_REVIEWED_DISBURSMENT_RESET)
                                                    && this.renderDisbursment(transacTionSelected)
                                                }
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
        getDisbursementsReducer : state.disbursmentReducers.getPendingReviewDisbursementReducer,
        approveOrRejectReviewedDisbursementReducer : state.disbursmentReducers.approveOrRejectReviewedDisbursementReducer,
        rejectPostDisbursementReducer : state.disbursmentReducers.rejectPostDisbursementReducer,
    };
}
export default connect(mapStateToProps)(DisbursementPendingReview);