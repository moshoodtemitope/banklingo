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

export class WriteOffLoanModal extends React.Component {
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
    //const { showWriteOffLoan  } = this.state;
    var loanDetails= this.props.loanDetails;
    let writeOffALoanRequest = this.props.writeOffALoanReducer,

        adminGetTransactionChannelsRequest = this.props.adminGetTransactionChannels,
        allChannels = [],
        channelsList;

    // if(showWriteOffLoan){
    //     this.props.dispatch(loanActions.payOffALoan("CLEAR"));
    // }

    // console.log("props info", this.props.match.params);
    // console.log("loanDetails", loanDetails);

    if (adminGetTransactionChannelsRequest.request_status === administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS
        && adminGetTransactionChannelsRequest.request_data.response.data.result.length >= 1) {
        channelsList = adminGetTransactionChannelsRequest.request_data.response.data.result;

        channelsList.map((channel, id) => {
            allChannels.push({ label: channel.name, value: channel.encodedKey });
        })
    }

    let loanStateValidationSchema = Yup.object().shape({
            notes: Yup.string()
                .min(2, 'Valid notes required'),

        });



    return (
        <Modal backdrop="static" show={this.props.showWriteOffLoan} onHide={this.props.handleShowWriteOffClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={false}>
            <Formik
                initialValues={{

                    notes: "",
                }}

                validationSchema={loanStateValidationSchema}
                onSubmit={(values, { resetForm }) => {

                    let changeLoanStatePayload ={
                        accountEncodedKey:loanDetails.encodedKey,
                        clientEncodedKey:this.props.match.params.id,
                        notes:values.notes
                    };





                    this.props.handleWriteOffLoan(changeLoanStatePayload)
                        .then(
                            () => {

                                if (this.props.writeOffALoanReducer.request_status === loanAndDepositsConstants.WRITEOFF_LOAN_SUCCESS) {
                                    resetForm();
                                    // value = {null}

                                    setTimeout(() => {
                                        // this.props.dispatch(loanActions.payOffALoan("CLEAR"))
                                        this.props.getCustomerLoanAccountDetails(this.loanEncodedKey);
                                        this.props.handleShowWriteOffClose()
                                    }, 5000);
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
                                Write Off Loan Account
                                </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="modal-section">
                                <Form.Group>
                                    <Form.Label className="block-level">Account Recipient</Form.Label>

                                    <h5>{loanDetails.clientName}</h5>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className="block-level">Loan Account</Form.Label>

                                    <h5>{loanDetails.productName}</h5>
                                </Form.Group>
                            </div>
                            <div>
                                <div className="modal-notes grayed">Outstanding Balances</div>
                                <div className="each-msg bolden">
                                   <span>Total</span>
                                   <span>{numberWithCommas(loanDetails.totalExpected, true)} {loanDetails.currencyCode}</span>
                                </div>
                                <div className="each-msg">
                                   <span>Principal</span>
                                   <span>{numberWithCommas(loanDetails.interestExpected, true)} {loanDetails.currencyCode}</span>
                                </div>
                                <div className="each-msg">
                                   <span>Interest</span>
                                   <span>{numberWithCommas(loanDetails.principalExpected, true)} {loanDetails.currencyCode}</span>
                                </div>
                                <div className="each-msg">
                                   <span>Fees</span>
                                   <span>{numberWithCommas(loanDetails.feesExpected, true)} {loanDetails.currencyCode}</span>
                                </div>
                                <div className="each-msg">
                                   <span>Penalty</span>
                                   <span>{numberWithCommas(loanDetails.penaltyExpected, true)} {loanDetails.currencyCode}</span>
                                </div>

                                <Form.Group className="mt-20">
                                    <Form.Label className="block-level">Write Off Amount</Form.Label>

                                    <h4>{numberWithCommas(loanDetails.totalExpected, true)} {loanDetails.currencyCode}</h4>
                                </Form.Group>
                            </div>


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


                        </Modal.Body>
                        <Modal.Footer>

                            <Button variant="light" onClick={this.props.handleShowWriteOffClose}>
                                Cancel
                            </Button>
                            {writeOffALoanRequest.request_status !== loanAndDepositsConstants.WRITEOFF_LOAN_SUCCESS &&
                                <Button
                                    variant="success"
                                    type="submit"
                                    disabled={writeOffALoanRequest.is_request_processing}
                                >
                                    {writeOffALoanRequest.is_request_processing ? "Please wait..." : "Write Off"}

                                </Button>
                            }

                        </Modal.Footer>
                        <div className="footer-alert">
                            {writeOffALoanRequest.request_status === loanAndDepositsConstants.WRITEOFF_LOAN_SUCCESS &&
                                <Alert variant="success" className="w-65 mlr-auto">
                                    {writeOffALoanRequest.request_data.response.data.message}
                                </Alert>
                            }
                            {(writeOffALoanRequest.request_status === loanAndDepositsConstants.WRITEOFF_LOAN_FAILURE && writeOffALoanRequest.request_data.error) &&
                                <Alert variant="danger" className="w-65 mlr-auto">
                                    {writeOffALoanRequest.request_data.error}
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
        // changeLoanStateReducer: state.loansReducers.changeLoanStateReducer,
        writeOffALoanReducer: state.loansReducers.writeOffALoanReducer,
       
       
        //payOffALoanReducer: state.loansReducers.payOffALoanReducer,
    };
}

export default connect(mapStateToProps)(WriteOffLoanModal);