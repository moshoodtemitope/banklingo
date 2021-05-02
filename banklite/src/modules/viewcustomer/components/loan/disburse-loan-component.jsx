import * as React from "react";
// import {Router} from "react-router";


import { connect } from 'react-redux';
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Select from 'react-select';
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import * as Yup from 'yup';
import "react-datepicker/dist/react-datepicker.css";
import Alert from 'react-bootstrap/Alert'

import DatePicker from '../../../../_helpers/datepickerfield'
import { Formik } from 'formik';
// import  TableComponent from '../../../shared/elements/table'
import "../../customerprofile.scss"; 

import { numberWithCommas, getDateFromISO} from '../../../../shared/utils';
import { administrationConstants } from "../../../../redux/actiontypes/administration/administration.constants";
import { loanAndDepositsConstants } from "../../../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants";
import { loanActions } from "../../../../redux/actions/loans/loans.action";

export class DisburseLoanModal extends React.Component {
    constructor(props) {
        super(props);
       // this.clientEncodedKey = this.props.match.params.id;
        this.state={
           // showModal:false,
        }
        
    }



    componentDidMount() {
        // this.loadInitialCustomerData();
    }

//payOffALoanRequest,adminGetTransactionChannelsRequest
   

  render (){

    const { changeLoanState, ctaText, newStateUpdate, showDisburseLoanForm } = this.state;
    let changeLoanStateRequest = this.props.changeLoanStateReducer;
    let getAClientLoanAccountRequest = this.props.getAClientLoanAccountReducer,
        adminGetTransactionChannelsRequest = this.props.adminGetTransactionChannels,
        allChannels = [],
        channelsList;
    // this.props.dispatch(loanActions.changeLoanState("CLEAR"));

    if (adminGetTransactionChannelsRequest.request_status === administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS
        && adminGetTransactionChannelsRequest.request_data.response.data.result.length >= 1) {
        channelsList = adminGetTransactionChannelsRequest.request_data.response.data.result;

        channelsList.map((channel) => {
            allChannels.push({ label: channel.name, value: channel.encodedKey });
        })
    }

   
    let changeLoanStateValidationSchema   = Yup.object().shape({
            notes: Yup.string()
                .min(2, 'Valid notes required'),
            txtChannelEncodedKey: Yup.string()
                .required('Required'),
            firstRepaymentDate: Yup.string()
                .when('showFirstRepayment', {
                    is: (value) => value === true,
                    then: Yup.string()
                        .required('Required')
                }),
            backDateChosen: Yup.string()
                .when('allowBackDate', {
                    is: (value) => value === true,
                    then: Yup.string()
                        .required('Required')
                }),
            bookingDateChosen: Yup.string()
                .when('showBookingDate', {
                    is: (value) => value === true,
                    then: Yup.string()
                        .required('Required')
                }),

        });
    


    return (
        <Modal backdrop="static" show={this.props.showDisbursementModal} onHide={this.props.handleCloseDisbursementModal} size="lg" centered="true" dialogClassName= "modal-40w withcentered-heading" animation={false}>
            <Formik
                initialValues={{
                    comment: "",
                    showFirstRepayment: false,
                    allowBackDate: false,
                    showBookingDate: false,
                    txtChannelEncodedKey: "",
                    firstRepaymentDate: "",
                    backDateChosen: "",
                    bookingDateChosen: "",
                    notes: "",
                    amountToRepay: ""
                }}

                validationSchema={changeLoanStateValidationSchema}
                onSubmit={(values, { resetForm }) => {

                        let changeLoanStatePayload = {
                            accountEncodedKey: this.loanEncodedKey,
                            notes: values.notes,
                            channelEncodedKey: values.txtChannelEncodedKey,
                            isBackDated: values.allowBackDate,
                            backDateValueDate: values.backDateChosen !== "" ? values.backDateChosen.toISOString() : null,
                            isBookingDate: values.showBookingDate,
                            bookingDate: values.bookingDateChosen !== "" ? values.bookingDateChosen.toISOString() : null,
                        }
                  
              
                    this.props.handleNewLoanState(changeLoanStatePayload, this.props.newStateUpdate)
                        .then(
                            () => {

                                if (this.props.changeLoanStateReducer.request_status === loanAndDepositsConstants.CHANGE_LOANSTATE_SUCCESS) {
                                    resetForm();
                                    // value = {null}

                                    setTimeout(() => {
                                        this.props.dispatch(loanActions.changeLoanState("CLEAR"))
                                        this.props.handleLoanChangeStateClose();
                                        this.props.getCustomerLoanAccountDetails(this.loanEncodedKey);
                                    }, 3000);
                                }

                                if (this.props.changeLoanStateReducer.request_status === loanAndDepositsConstants.CHANGE_LOANSTATE_FAILURE) {
                                    resetForm();
                                    // value = {null}

                                    setTimeout(() => {
                                        this.props.dispatch(loanActions.changeLoanState("CLEAR"))
                                    }, 3000);
                                }



                            }
                        )

                }}
            >


                {({ handleSubmit,
                    handleChange,
                    values,
                    setFieldValue,
                    setFieldTouched,
                    touched,
                    errors, }) => (
                    <Form
                        noValidate
                        onSubmit={handleSubmit}
                        className="">
                        <Modal.Header>
                            <Modal.Title>
                                {/* {newState !== "repayloan" ? "Change Loan State" : "Apply A Repayment"} */}
                               Disburse Loan
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <div>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Amount</Form.Label>
                                                <h5>{getAClientLoanAccountRequest.request_data.response.data.loanAmount} {getAClientLoanAccountRequest.request_data.response.data.currencyCode}</h5>
                                            </Col>
                                            <Col>

                                            </Col>
                                        </Form.Row>
                                        <Form.Row className="mb-10">
                                            <Col>
                                                <Form.Group className="mb-0">
                                                    <Form.Label className="block-level mb-10">Transaction Channel</Form.Label>
                                                    {allChannels.length >= 1 &&
                                                        <div>
                                                            <Select
                                                                options={allChannels}

                                                                onChange={(selected) => {
                                                                    setFieldValue('txtChannelEncodedKey', selected.value)
                                                                }}
                                                                onBlur={() => setFieldTouched('txtChannelEncodedKey', true)}
                                                                className={errors.txtChannelEncodedKey && touched.txtChannelEncodedKey ? "is-invalid" : null}
                                                                name="txtChannelEncodedKey"
                                                            />
                                                            {errors.txtChannelEncodedKey || (errors.txtChannelEncodedKey && touched.txtChannelEncodedKey) ? (
                                                                <span className="invalid-feedback">{errors.txtChannelEncodedKey}</span>
                                                            ) : null}
                                                        </div>
                                                    }
                                                    {adminGetTransactionChannelsRequest.request_status === administrationConstants.GET_TRANSACTION_CHANNELS_FAILURE &&
                                                        <div className="errormsg"> Unable to load Disbursment channels</div>
                                                    }
                                                
                                                </Form.Group>
                                            </Col>
                                            <Col className="date-wrap">
                                                <Form.Group className="table-helper m-b-5">
                                                    <input type="checkbox"
                                                        name="showFirstRepayment"
                                                        onChange={handleChange}
                                                        checked={values.showFirstRepayment ? values.showFirstRepayment : null}
                                                        value={values.showFirstRepayment}
                                                        id="firstRepaymentDate" />
                                                    <label htmlFor="firstRepaymentDate">First Repayment Date</label>
                                                </Form.Group>
                                                {values.showFirstRepayment === true &&
                                                    <Form.Group className="mb-0 date-wrap">
                                                        <DatePicker
                                                         placeholderText="Choose  date"
                                                            autoComplete="new-password"
                                                            dateFormat={window.dateformat}
                                                            className="form-control form-control-sm h-38px"
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            name="firstRepaymentDate"
                                                            value={values.firstRepaymentDate}
                                                            onChange={setFieldValue}
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            minDate={new Date()}
                                                            className={errors.firstRepaymentDate && touched.firstRepaymentDate ? "is-invalid form-control form-control-sm h-38px" : "form-control h-38px form-control-sm"}
                                                        />
                                                        {errors.firstRepaymentDate && touched.firstRepaymentDate ? (
                                                            <span className="invalid-feedback">{errors.firstRepaymentDate}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                }
                                            </Col>
                                        </Form.Row>
                                        <Form.Row className="mb-10">
                                            <Col className="date-wrap">
                                                <Form.Group className="table-helper m-b-5">
                                                    <input type="checkbox"
                                                        name="allowBackDate"
                                                        onChange={handleChange}
                                                        checked={values.allowBackDate ? values.allowBackDate : null}
                                                        // value={values.allowBackDate}
                                                        id="allowBackDate" 
                                                        />
                                                    <label htmlFor="allowBackDate">Backdate</label>
                                                </Form.Group>
                                                {values.allowBackDate === true &&
                                                    <Form.Group className="mb-0 date-wrap">
                                                        <DatePicker
                                                            placeholderText="Choose  date"
                                                            autoComplete="new-password"
                                                            dateFormat={window.dateformat}
                                                            className="form-control form-control-sm"
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            name="backDateChosen"
                                                            value={values.backDateChosen}
                                                            onChange={setFieldValue}
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            minDate={new Date()}
                                                            className={errors.backDateChosen && touched.backDateChosen ? "is-invalid form-control form-control-sm h-38px" : "form-control h-38px form-control-sm"}
                                                        />
                                                        {errors.backDateChosen && touched.backDateChosen ? (
                                                            <span className="invalid-feedback">{errors.backDateChosen}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                }
                                            </Col>
                                            <Col className="date-wrap">
                                                <Form.Group className="table-helper m-b-5">
                                                    <input type="checkbox"
                                                        name="showBookingDate"
                                                        onChange={handleChange}
                                                        checked={values.showBookingDate ? values.showBookingDate : null}
                                                        value={values.showBookingDate}
                                                        id="showBookingDate" />
                                                    <label htmlFor="showBookingDate">Booking Date</label>
                                                </Form.Group>
                                                {values.showBookingDate === true &&
                                                    <Form.Group className="mb-0 date-wrap">
                                                        <DatePicker
                                                         placeholderText="Choose  date"
                                                            autoComplete="new-password"
                                                            dateFormat={window.dateformat}
                                                            className="form-control form-control-sm"
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            name="bookingDateChosen"
                                                            value={values.bookingDateChosen}
                                                            onChange={setFieldValue}
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            minDate={new Date()}
                                                            className={errors.bookingDateChosen && touched.bookingDateChosen ? "is-invalid form-control form-control-sm h-38px" : "form-control form-control-sm h-38px"}
                                                        />
                                                        {errors.bookingDateChosen && touched.bookingDateChosen ? (
                                                            <span className="invalid-feedback">{errors.bookingDateChosen}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                }
                                            </Col>
                                        </Form.Row>

                                        <Form.Group>
                                            <Form.Label className="block-level">Notes</Form.Label>
                                            <Form.Control as="textarea"
                                                rows="3"
                                                onChange={handleChange}
                                                name="notes"
                                                value={values.notes}
                                                className={errors.notes && touched.notes ? "is-invalid form-control form-control-sm" : null}
                                            />
                                            {errors.notes && touched.notes ? (
                                                <span className="invalid-feedback">{errors.notes}</span>
                                            ) : null}
                                        </Form.Group>
                                    </div>
                            {/*  } */}
                        </Modal.Body>
                        <Modal.Footer>

                            <Button variant="light" onClick={this.props.handleCloseDisbursementModal}>
                                Cancel
                                </Button>
                            <Button
                                variant="success"
                                type="submit"
                                disabled={changeLoanStateRequest.is_request_processing}
                            >
                                {changeLoanStateRequest.is_request_processing ? "Please wait..." : `${this.props.ctaText}`}

                            </Button>

                        </Modal.Footer>
                        <div className="footer-alert">
                            {changeLoanStateRequest.request_status === loanAndDepositsConstants.CHANGE_LOANSTATE_SUCCESS &&
                                <Alert variant="success" className="w-65 mlr-auto">
                                    {changeLoanStateRequest.request_data.response.data.message}
                                </Alert>
                            }
                            {(changeLoanStateRequest.request_status === loanAndDepositsConstants.CHANGE_LOANSTATE_FAILURE && changeLoanStateRequest.request_data.error) &&
                                <Alert variant="danger" className="w-65 mlr-auto">
                                    {changeLoanStateRequest.request_data.error}
                                </Alert>
                            }
                        </div>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}
 
}


function mapStateToProps(state) {
    return {
        adminGetTransactionChannels: state.administrationReducers.adminGetTransactionChannelsReducer,
        // getAClientReducer: state.clientsReducers.getAClientReducer,
        // getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        // getClientLoansReducer: state.loansReducers.getClientLoansReducer,
        // getAClientLoanAccountReducer: state.loansReducers.getAClientLoanAccountReducer,
        // getAClientLoanAccountScheduleReducer: state.loansReducers.getAClientLoanAccountScheduleReducer,
        // getAccountLoanTransactionReducer: state.loansReducers.getAccountLoanTransactionReducer,
        // getAClientLoanAccountCommentsReducer: state.loansReducers.getAClientLoanAccountCommentsReducer,
        // createALoanCommentReducer: state.loansReducers.createALoanCommentReducer,
        // getALoanAccountActivitiesReducer: state.loansReducers.getALoanAccountActivitiesReducer,
        // getALoanAccountAttachmentsReducer: state.loansReducers.getALoanAccountAttachmentsReducer,
        // createALoanAttachmentReducer: state.loansReducers.createALoanAttachmentReducer,
        // getALoanAccountCommunicationsReducer: state.loansReducers.getALoanAccountCommunicationsReducer,
        changeLoanStateReducer: state.loansReducers.changeLoanStateReducer,
        // writeOffALoanReducer: state.loansReducers.writeOffALoanReducer,       
        payOffALoanReducer: state.loansReducers.payOffALoanReducer,
    };
}

export default connect(mapStateToProps)(DisburseLoanModal);