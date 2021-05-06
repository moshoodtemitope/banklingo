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

export class LoanPayOffModal extends React.Component {
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




    // let showPayOffLoan   = this.props.showPayOffLoan;
    let loanDetails=this.props.loanDetails;

      if(loanDetails==null) return null;
    let payOffALoanRequest = this.props.payOffALoanReducer;
    let adminGetTransactionChannelsRequest = this.props.adminGetTransactionChannels;
  

        
    console.log(this.props.showPayOffLoan+' - '+payOffALoanRequest+' - '+adminGetTransactionChannelsRequest);
      let  allChannels = [],
        channelsList,
        payoffAmount = loanDetails.interestExpected + loanDetails.principalExpected;

      

    // if(showPayOffLoan){
    //     this.props.dispatch(loanActions.payOffALoan("CLEAR"));
    // }

    if (adminGetTransactionChannelsRequest.request_status === administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS
        && adminGetTransactionChannelsRequest.request_data.response.data.result.length >= 1) {
        channelsList = adminGetTransactionChannelsRequest.request_data.response.data.result;

        channelsList.map((channel, id) => {
            allChannels.push({ label: channel.name, value: channel.encodedKey });
        })
    }

    let loanStateValidationSchema = Yup.object().shape({
            txtChannelEncodedKey: Yup.string()
                .required('Required'),
            notes: Yup.string()
                .min(2, 'Valid notes required').required('Note is required'),

        });



    return (
        <Modal backdrop="static" show={this.props.showPayOffLoan} onHide={this.props.closeModal} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={false}>
            <Formik initialValues={{
                    txtChannelEncodedKey: "",
                    notes: "",
                }}

                validationSchema={loanStateValidationSchema}
                onSubmit={(values, { resetForm }) => {

                    let changeLoanStatePayload ={
                        accountEncodedKey:this.props.loanEncodedKey,
                        clientEncodedKey:this.props.match.params.id,
                        channelEncodedKey:values.txtChannelEncodedKey,
                        notes:values.notes
                    };





                    this.props.handlePayOffLoan(changeLoanStatePayload)
                        .then(
                            () => {

                                if (this.props.payOffALoanReducer.request_status === loanAndDepositsConstants.PAYOFF_LOAN_SUCCESS) {
                                    resetForm();
                                    // value = {null}

                                    setTimeout(() => {
                                        // this.props.dispatch(loanActions.payOffALoan("CLEAR"))
                                        this.props.getCustomerLoanAccountDetails(this.props.loanEncodedKey);
                                        this.props.closeModal();
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
                                Pay Off Loan
                                </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="modal-notes">
                                Remaining balance will be paid off and the account will be closed
                            </div>
                            <Form.Row>
                                <Col>
                                    <Form.Label className="block-level">Principal Balance</Form.Label>

                                    <h5> {numberWithCommas(loanDetails.principalExpected,true)} {loanDetails.currencyCode} </h5>
                                </Col>
                                <Col>
                                    <Form.Label className="block-level">Interest Balance</Form.Label>

                                    <h5>{numberWithCommas(loanDetails.interestExpected,true)} {loanDetails.currencyCode}</h5>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label className="block-level">Pay Off Amount</Form.Label>

                                    <h5>{numberWithCommas(payoffAmount,true)} {loanDetails.currencyCode}</h5>
                                </Col>
                                <Col>

                                </Col>
                            </Form.Row>
                            <Form.Row>
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
                                            <div className="errormsg"> Unable to load channels</div>
                                        }


                                    </Form.Group>
                                </Col>
                                <Col>

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


                        </Modal.Body>
                        <Modal.Footer>

                            <Button variant="light" onClick={this.props.closeModal}>
                                Cancel
                            </Button>
                            {payOffALoanRequest.request_status !== loanAndDepositsConstants.PAYOFF_LOAN_SUCCESS &&
                                <Button
                                    variant="success"
                                    type="submit"
                                    disabled={payOffALoanRequest.is_request_processing}
                                >
                                    {payOffALoanRequest.is_request_processing ? "Please wait..." : "Pay Off"}

                                </Button>
                            }

                        </Modal.Footer>
                        <div className="footer-alert">
                            {payOffALoanRequest.request_status === loanAndDepositsConstants.PAYOFF_LOAN_SUCCESS &&
                                <Alert variant="success" className="w-65 mlr-auto">
                                    {payOffALoanRequest.request_data.response.data.message}
                                </Alert>
                            }
                            {(payOffALoanRequest.request_status === loanAndDepositsConstants.PAYOFF_LOAN_FAILURE && payOffALoanRequest.request_data.error) &&
                                <Alert variant="danger" className="w-65 mlr-auto">
                                    {payOffALoanRequest.request_data.error}
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
        // writeOffALoanReducer: state.loansReducers.writeOffALoanReducer,
       
       
        payOffALoanReducer: state.loansReducers.payOffALoanReducer,
    };
}

export default connect(mapStateToProps)(LoanPayOffModal);