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
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import "./disbursements.scss"; 

import Accordion from 'react-bootstrap/Accordion'

import {disbursementActions} from '../../redux/actions/disbursment/disbursment.action';
import {disbursmentConstants} from '../../redux/actiontypes/disbursment/disbursment.constants'

class DisbursementPendingApproval extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:30,
            CurrentPage:1,
            show: false
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

        dispatch(disbursementActions.getDisbursement(paramters, true));
    }

    approveOrRejectPostDisbursementRequest = async (actionPayload)=>{
        const {dispatch} = this.props;

        await dispatch(disbursementActions.approveOrRejectPostDisbursement(actionPayload));
    }

    rejectDisburmentRequest = async (rejectionPayload)=>{
        const {dispatch} = this.props;

        await dispatch(disbursementActions.rejectPostDisbursement(rejectionPayload));
    }

    setPagesize = (PageSize)=>{
        // console.log('----here', PageSize.target.value);
        let sizeOfPage = PageSize.target.value,
            {CurrentPage} = this.state;

        this.setState({PageSize: sizeOfPage});

        let params= `&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;
        this.getDisbursements(params);
    }

    handleClose = () => this.setState({show:false});
    
    handleShow = () => this.setState({show:true});

    renderFullDetails=(transactionToProcess)=>{
        const {show}= this.state;
       let  approveOrRejectPostDisbursementRequest= this.props.approveOrRejectPostDisbursementReducer,
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
                                
                                    
                                    console.log("-----", processPayload);
                                    this.approveOrRejectPostDisbursementRequest(processPayload)
                                        .then(
                                            () => {
                                                if(this.props.approveOrRejectPostDisbursementReducer.request_status === disbursmentConstants.APPROVE_OR_REJECT_DISBURSMENT_SUCCESS){
                                                    
                                                    
                                                    setTimeout(() => {
                                                        this.loadInitialData();
                                                        this.props.dispatch(disbursementActions.approveOrRejectPostDisbursement("CLEAR"));
                                                        this.handleClose();
                                                    }, 2000);
                                                }else{
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
                                                        <span className="form-text disabled-field">{transactionToProcess.amount}</span>
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


                                            </div>
                                        </Accordion.Collapse>
                                    </Accordion>
                                            
                                                
                                            {approveOrRejectPostDisbursementRequest.request_status !== disbursmentConstants.APPROVE_OR_REJECT_DISBURSMENT_SUCCESS && 
                                                <div className="footer-with-cta toleft">
                                                    {/* <Button variant="secondary" className="grayed-out" onClick={this.handleCloseEdit}>Cancel</Button> */}
                                                    <Button
                                                        type="submit"
                                                        onClick={()=>this.setState({actionToPerform: "approve"})}
                                                        disabled={approveOrRejectPostDisbursementRequest.is_request_processing}>
                                                            {approveOrRejectPostDisbursementRequest.is_request_processing && this.state.actionToPerform==="approve"?"Please wait...": "Approve"}
                                                        </Button>

                                                        <Button
                                                        type="submit"
                                                        onClick={()=>this.setState({actionToPerform: "reject"})}
                                                        disabled={approveOrRejectPostDisbursementRequest.is_request_processing}>
                                                            {approveOrRejectPostDisbursementRequest.is_request_processing && this.state.actionToPerform==="reject"?"Please wait...": "Reject"}
                                                        </Button>
                                                </div>
                                            }
                                        </Form>
                                    )}
                            </Formik>
                            {approveOrRejectPostDisbursementRequest.request_status === disbursmentConstants.APPROVE_OR_REJECT_DISBURSMENT_SUCCESS && 
                                <Alert variant="success">
                                    {approveOrRejectPostDisbursementRequest.request_data.response.data.message}
                                </Alert>
                            }
                            {approveOrRejectPostDisbursementRequest.request_status === disbursmentConstants.APPROVE_OR_REJECT_DISBURSMENT_FAILURE && 
                                <Alert variant="danger">
                                    {approveOrRejectPostDisbursementRequest.request_data.error}
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
            allDisbursments = getDisbursementsRequest.request_data.response.data,
            transacTionSelected = allDisbursments.filter(txt=>txt.transactionReference===transactionReference)[0];

            this.setState({transacTionSelected, show:true})
    }

    renderPendingDisbursment=()=>{
        let getDisbursementsRequest = this.props.getDisbursementsReducer;
            switch (getDisbursementsRequest.request_status){
                case (disbursmentConstants.GET_DISBURSMENTS_PENDING):
                    return (
                        <div className="loading-content"> 
                            <div className="loading-text">Please wait... </div>
                        </div>
                    )
                case(disbursmentConstants.GET_DISBURSMENTS_SUCCESS):
                    let allDisbursments = getDisbursementsRequest.request_data.response.data;
                        
                        if(allDisbursments!==undefined){
                            if(allDisbursments.length>=1){
                                return(
                                    <div>
                                        <div className="heading-actions">
                                            <Form className="one-liner">
                                                {/* <Form.Group controlId="periodOptionChosen">
                                                    <Form.Label>From</Form.Label>

                                                    <DatePicker placeholderText="Choose start date" selected={this.state.dob}
                                                        onChange={this.handleDatePicker}
                                                        onChangeRaw={(e) => this.handleChange(e)}
                                                        dateFormat="d MMMM, yyyy"
                                                        className="form-control form-control-sm"
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        maxDate={new Date()}
                                                    />
                                                </Form.Group>
                                                <Form.Group controlId="monthsDropdown">
                                                    <Form.Label>To</Form.Label>
                                                    <DatePicker placeholderText="Choose end date" selected={this.state.dob}
                                                        onChange={this.handleDatePicker}
                                                        onChangeRaw={(e) => this.handleChange(e)}
                                                        dateFormat="d MMMM, yyyy"
                                                        className="form-control form-control-sm"
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        maxDate={new Date()}
                                                    />
                                                </Form.Group> */}

                                                {/* <Button variant="secondary" type="button">More >> </Button>
                                                <Button variant="primary" type="submit">Generate Profit &amp; Loss</Button> */}
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
                                        <div className="pagination-wrap">
                                            <label htmlFor="toshow">Show</label>
                                            <select id="toshow"
                                                    onChange={this.setPagesize}
                                                    value={this.state.PageSize}
                                                     className="countdropdown form-control form-control-sm">
                                                <option value="10">10</option>
                                                <option value="30">30</option>
                                                <option value="50">50</option>
                                                <option value="200">200</option>
                                            </select>
                                            <div className="move-page-actions">
                                                <div className="each-page-action">
                                                    <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                                                </div>
                                                <div className="each-page-action">
                                                    <img alt="go backward" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAAJ0lEQVR42mNgoBj09PT8xyqIIQETRJFAFoRLoAsS1oHXDryuQvcHAJqKQewTJHmSAAAAAElFTkSuQmCC" width="6" height="11" />
                                                </div>
                                                <div className="page-count">
                                                    <span>1-{this.state.PageSize}</span>  of <span>20000</span>
                                                </div>
                                                <div className="each-page-action">
                                                    <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" />
                                                </div>
                                                <div className="each-page-action">
                                                    <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                                                </div>
                                            </div>
                                        </div>
                                        <TableComponent classnames="striped bordered hover">
                                            <thead>
                                                <tr>
                                                   
                                                    <th>Transaction Ref</th>
                                                    <th>Source Account</th>
                                                    <th>Destination Account</th>
                                                    <th>Destination Bank</th>
                                                    <th>Amount</th>
                                                    <th>Inititated By</th>
                                                    {/* <th>Approved By</th> */}
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allDisbursments.map((eachDisburment, index)=>{
                                                        return(
                                                            <Fragment key={index}>
                                                                <tr>
                                                                    
                                                                    <td>
                                                                        <span className="txt-cta" onClick={()=>this.showDetails(eachDisburment.transactionReference)} >{eachDisburment.transactionReference}</span> 
                                                                    </td>
                                                                    <td>{eachDisburment.sourceAccount}</td>
                                                                    <td>{eachDisburment.destinationAccount}</td>
                                                                    <td>{eachDisburment.destinationBank}</td>
                                                                    <td>{eachDisburment.amount}</td>
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
                                    <TableComponent classnames="striped bordered hover">
                                                <thead>
                                                    <tr>
                                                        
                                                        <th>Transaction Ref</th>
                                                        <th>Source Account</th>
                                                        <th>Destination Account</th>
                                                        <th>Destination Bank</th>
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
                                                    </tr>
                                                </tbody>
                                    </TableComponent>
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
        const {transacTionSelected}=this.state;
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
                                                <h2>Pending Approval</h2>
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
                                                {this.renderPendingDisbursment()}
                                                {
                                                    this.props.getDisbursementsReducer.request_status ===disbursmentConstants.GET_DISBURSMENTS_SUCCESS
                                                    && this.renderFullDetails(transacTionSelected)
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
        getDisbursementsReducer : state.disbursmentReducers.getDisbursementsReducer,
        approveOrRejectPostDisbursementReducer : state.disbursmentReducers.approveOrRejectPostDisbursementReducer,
        rejectPostDisbursementReducer : state.disbursmentReducers.rejectPostDisbursementReducer,
    };
}
export default connect(mapStateToProps)(DisbursementPendingApproval);