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
import { Formik } from 'formik';
// import  TableComponent from '../../../shared/elements/table'
import "../../customerprofile.scss"; 

import { numberWithCommas, getDateFromISO} from '../../../../shared/utils';
import { administrationConstants } from "../../../../redux/actiontypes/administration/administration.constants";
import { loanAndDepositsConstants } from "../../../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants";
import { loanActions } from "../../../../redux/actions/loans/loans.action";

export class ChangeLoanStateModal extends React.Component {
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

    let loanDetails=this.props.loanDetails;
    let newStateUpdate =this.props.newStateUpdate;
    let newState =this.props.newState;
    // const {  newState, newStateUpdate } = this.state;
    let changeLoanStateRequest = this.props.changeLoanStateReducer;
    let adminGetTransactionChannelsRequest = this.props.adminGetTransactionChannels,
        allChannels = [],
        channelsList;
    // this.props.dispatch(loanActions.changeLoanState("CLEAR"));

    if (adminGetTransactionChannelsRequest.request_status === administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS
        && adminGetTransactionChannelsRequest.request_data.response.data.result.length >= 1) {
        channelsList = adminGetTransactionChannelsRequest.request_data.response.data.result;

        channelsList.map((channel, id) => {
            allChannels.push({ label: channel.name, value: channel.encodedKey });
        })
    }

    let changeLoanStateValidationSchema
         = Yup.object().shape({
            comment: Yup.string()
                .min(2, 'Valid comments required'),
            notes: Yup.string()
                .min(2, 'Valid notes required')
        });
    


    return (
        <Modal backdrop="static" show={this.props.changeLoanState} onHide={this.props.handleLoanChangeStateClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
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
                            comment: values.comment,
                            accountEncodedKey: this.loanEncodedKey
                        }
                    

                   if (changeLoanStatePayload.amount) {
                            delete changeLoanStatePayload.amount;
                    }
                    


                    // let changeLoanStatePayload = `Comment=${values.Comment}&ClientEncodedKey=${this.clientEncodedKey}`;
                    this.handleNewLoanState(changeLoanStatePayload, newStateUpdate)
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
                    handleBlur,
                    resetForm,
                    values,
                    setFieldValue,
                    setFieldTouched,
                    touched,
                    isValid,
                    errors, }) => (
                    <Form
                        noValidate
                        onSubmit={handleSubmit}
                        className="">
                        <Modal.Header>
                            <Modal.Title>
                               Change Loan State
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                           
                                <Form.Group>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">Present State</Form.Label>
                                            <span className="form-text">{loanDetails.loanStateDescription} </span>
                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">New State</Form.Label>
                                            <span className="form-text">{this.props.newState}</span>
                                        </Col>
                                    </Form.Row>
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
                        </Modal.Body>
                        <Modal.Footer>

                            <Button variant="light" onClick={this.props.handleLoanChangeStateClose}>
                                Cancel
                                </Button>
                            <Button
                                variant="success"
                                type="submit"
                                disabled={changeLoanStateRequest.is_request_processing}
                            >
                                {changeLoanStateRequest.is_request_processing ? "Please wait..." : `${this.props.newState}`}

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

export default connect(mapStateToProps)(ChangeLoanStateModal);