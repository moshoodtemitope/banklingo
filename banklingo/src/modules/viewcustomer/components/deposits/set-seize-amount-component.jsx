import * as React from "react";
// import {Router} from "react-router";

import { connect } from "react-redux";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import Alert from "react-bootstrap/Alert";
import { Formik } from "formik";
// import  TableComponent from '../../../shared/elements/table'
import "../../customerprofile.scss";

import { numberWithCommas, getDateFromISO } from "../../../../shared/utils";
import { administrationConstants } from "../../../../redux/actiontypes/administration/administration.constants";
import { loanAndDepositsConstants } from "../../../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants";
import { loanActions } from "../../../../redux/actions/loans/loans.action";
import { depositActions } from "../../../../redux/actions/deposits/deposits.action";

import { default as DatePickerFilter } from "react-datepicker";
import DatePickerFieldType from "../../../../_helpers/DatePickerFieldType";
import DatePicker from "react-datepicker";

export class SiezeAmountModal extends React.Component {
  constructor(props) {
    super(props);
    // this.clientEncodedKey = this.props.match.params.id;
    this.state = {
      // showModal:false,
    };
  }

  componentDidMount() {
    // this.loadInitialCustomerData();
  }

  render() {
    const {
      ctaText,
      newStateHeading,
      newStateUpdate,

      showDepositFundsForm,
    } = this.state;
    let seizeLockAmountRequest = this.props.LockAmountReducer,
      getAClientDepositAccountRequest = this.props
        .getAClientDepositAccountReducer.request_data.response.data;

    let customerLoanAccounts = this.props.getClientLoansReducer.request_data
      .response.data;
    let customerDepositAccounts = this.props.getClientDepositsReducer
      .request_data.response.data;
    let searchForAccountsWithCustomerKeyRequest = this.props
      .searchForAccountsWithCustomerKeyReducer;
    let adminGetTransactionChannelsRequest = this.props
        .adminGetTransactionChannels,
      allChannels = [],
      allAccountOfCurrentCustomer = [],
      channelsList;

    let searchAccountNumberRequest = this.props.searchAccountNumbersReducer;
    if (customerLoanAccounts.result !== null) {
      customerLoanAccounts.result.map((eachLoanAccount, index) => {
        if (
          eachLoanAccount.loanState === 5 ||
          eachLoanAccount.loanState === 6
        ) {
          allAccountOfCurrentCustomer.push({
            label: `${eachLoanAccount.productName} - ${eachLoanAccount.accountNumber}`,
            value: eachLoanAccount.encodedKey,
          });
        }
      });
    }

    if (customerDepositAccounts.result !== null) {
      customerDepositAccounts.result.map((eachDepositAccount, index) => {
        if (
          (eachDepositAccount.accountState === 3 ||
            eachDepositAccount.accountState === 5) &&
          eachDepositAccount.accountNumber !==
            getAClientDepositAccountRequest.accountNumber
        ) {
          allAccountOfCurrentCustomer.push({
            label: `${eachDepositAccount.productName} - ${eachDepositAccount.accountNumber}`,
            value: eachDepositAccount.encodedKey,
          });
        }
      });
    }

    if (
      adminGetTransactionChannelsRequest.request_status ===
        administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS &&
      adminGetTransactionChannelsRequest.request_data.response.data.result
        .length >= 1
    ) {
      channelsList =
        adminGetTransactionChannelsRequest.request_data.response.data.result;

      channelsList.map((channel, id) => {
        allChannels.push({ label: channel.name, value: channel.encodedKey });
      });
    }

    let changeDepositStateValidationSchema = Yup.object().shape({
      notes: Yup.string().min(2, "Valid notes required"),
      depositChannelEncodedKey: Yup.string().required("Required"),
    });

    return (
      <Modal
        backdrop="static"
        show={this.props.showModal}
        onHide={this.props.handleHideModal}
        size="lg"
        centered="true"
        dialogClassName={"modal-40w withcentered-heading"}
        animation={false}
      >
        <Formik
          initialValues={{
            allowBackDate: false,
            showBookingDate: false,
            depositChannelEncodedKey: "",
            blockReference: "",
            amountToWithdraw: "",
            transactionExternalReference: "",
            notes: "",
            currentCustomerChosenAccount: "",
            amountToTransfer: "",
          }}
          validationSchema={changeDepositStateValidationSchema}
          onSubmit={(values, { resetForm }) => {
            let seizeAmountPayload = {
              accountEncodedKey: this.props.depositEncodedKey,
              transactionExternalReference: values.transactionExternalReference,
              accountNumber: getAClientDepositAccountRequest.accountNumber,
              blockReference: this.props.blockReference,
              channelEncodedKey: values.depositChannelEncodedKey,
            };
            this.props
              .handleLockAmountState(seizeAmountPayload, "seize")
              .then(() => {
                if (
                  this.props.LockAmountReducer.request_status ===
                  loanAndDepositsConstants.LOCK_AMOUNT_SUCCESS
                ) {
                  resetForm();
                  setTimeout(() => {
                    this.props.dispatch(
                      depositActions.changeDepositState("CLEAR")
                    );
                    this.props.handleHideModal();
                    this.props.getCustomerDepositAccountDetails(
                      this.props.depositEncodedKey
                    );
                  }, 3000);
                }

                if (
                  this.props.LockAmountReducer.request_status ===
                  loanAndDepositsConstants.LOCK_AMOUNT_FAILURE
                ) {
                  resetForm();
                  setTimeout(() => {
                    this.props.dispatch(
                      depositActions.changeDepositState("CLEAR")
                    );
                  }, 3000);
                }
              });
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            resetForm,
            values,
            setFieldValue,
            setFieldTouched,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit} className="">
              <Modal.Header>
                <Modal.Title>{"Seize Amount"}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <Form.Group>
                    <Form.Row>
                      <Col>
                        <Form.Label className="block-level">
                          Present State
                        </Form.Label>
                        <span className="form-text">Locked Amount</span>
                      </Col>
                      <Col>
                        <Form.Label className="block-level">
                          New State
                        </Form.Label>
                        <span className="form-text">Seize</span>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                </div>
                <div>
                  <Form.Group>
                    <Form.Row>
                      <Col>
                        <Form.Label className="block-level">
                          Amount{" "}
                          {this.props.CurCode ? `(${this.props.CurCode})` : ""}
                        </Form.Label>
                        <span className="form-text">
                          {numberWithCommas(this.props.amount)}
                        </span>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Row>
                    <Col>
                      <Form.Group className="mb-0">
                        <Form.Label className="block-level">
                          Transaction Channel
                        </Form.Label>
                        {allChannels.length >= 1 && (
                          <div>
                            <Select
                              options={allChannels}
                              onChange={(selected) => {
                                setFieldValue(
                                  "depositChannelEncodedKey",
                                  selected.value
                                );
                              }}
                              onBlur={() =>
                                setFieldTouched(
                                  "depositChannelEncodedKey",
                                  true
                                )
                              }
                              className={
                                errors.depositChannelEncodedKey &&
                                touched.depositChannelEncodedKey
                                  ? "is-invalid"
                                  : null
                              }
                              name="depositChannelEncodedKey"
                            />
                            {errors.depositChannelEncodedKey ||
                            (errors.depositChannelEncodedKey &&
                              touched.depositChannelEncodedKey) ? (
                              <span className="invalid-feedback">
                                {errors.depositChannelEncodedKey}
                              </span>
                            ) : null}
                          </div>
                        )}
                        {adminGetTransactionChannelsRequest.request_status ===
                          administrationConstants.GET_TRANSACTION_CHANNELS_FAILURE && (
                          <div className="errormsg">
                            {" "}
                            Unable to load Disbursment channels
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                    <Col></Col>
                  </Form.Row>
                </div>
                <div>
                  <Form.Group>
                    <Form.Label className="block-level">
                      Reference (Optional)
                    </Form.Label>
                    <Form.Control
                      type="textarea"
                      autoComplete="off"
                      onChange={handleChange}
                      value={values.transactionExternalReference}
                      className={
                        errors.transactionExternalReference &&
                        touched.transactionExternalReference
                          ? "is-invalid h-38px"
                          : "h-38px"
                      }
                      name="transactionExternalReference"
                    />
                    {errors.transactionExternalReference &&
                    touched.transactionExternalReference ? (
                      <span className="invalid-feedback">
                        {errors.transactionExternalReference}
                      </span>
                    ) : null}
                  </Form.Group>
                </div>
                <Form.Group>
                  <Form.Label className="block-level">Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    onChange={handleChange}
                    name="notes"
                    value={values.notes}
                    className={
                      errors.notes && touched.notes
                        ? "is-invalid form-control form-control-sm"
                        : null
                    }
                  />
                  {errors.notes && touched.notes ? (
                    <span className="invalid-feedback">{errors.notes}</span>
                  ) : null}
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="light" onClick={this.props.handleHideModal}>
                  Cancel
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  disabled={seizeLockAmountRequest.is_request_processing}
                >
                  {seizeLockAmountRequest.is_request_processing
                    ? "Please wait..."
                    : `Sieze`}
                </Button>
              </Modal.Footer>
              <div className="footer-alert">
                {seizeLockAmountRequest.request_status ===
                  loanAndDepositsConstants.LOCK_AMOUNT_SUCCESS && (
                  <Alert variant="success" className="w-65 mlr-auto">
                    {seizeLockAmountRequest.request_data.response.data.message}
                  </Alert>
                )}
                {seizeLockAmountRequest.request_status ===
                  loanAndDepositsConstants.LOCK_AMOUNT_FAILURE &&
                  seizeLockAmountRequest.request_data.error && (
                    <Alert variant="danger" className="w-65 mlr-auto">
                      {seizeLockAmountRequest.request_data.error}
                    </Alert>
                  )}
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    adminGetTransactionChannels:
      state.administrationReducers.adminGetTransactionChannelsReducer,
    getAClientReducer: state.clientsReducers.getAClientReducer,
    getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
    getClientLoansReducer: state.loansReducers.getClientLoansReducer,
    getAClientDepositAccountReducer:
      state.depositsReducers.getAClientDepositAccountReducer,
    getADepositAccountActivitiesReducer:
      state.depositsReducers.getADepositAccountActivitiesReducer,
    getADepositAccountCommunicationsReducer:
      state.depositsReducers.getADepositAccountCommunicationsReducer,
    getAccountDepositTransactionReducer:
      state.depositsReducers.getAccountDepositTransactionReducer,
    getAClientDepositAccountCommentsReducer:
      state.depositsReducers.getAClientDepositAccountCommentsReducer,
    createADepositCommentReducer:
      state.depositsReducers.createADepositCommentReducer,
    getADepositAccountAttachmentsReducer:
      state.depositsReducers.getADepositAccountAttachmentsReducer,
    createADepositAttachmentReducer:
      state.depositsReducers.createADepositAttachmentReducer,
    LockAmountReducer: state.depositsReducers.LockAmountReducer,
    searchAccountNumbersReducer:
      state.depositsReducers.searchAccountNumbersReducer,
    searchCustomerAccountReducer:
      state.depositsReducers.searchCustomerAccountReducer,
    searchForAccountsWithCustomerKeyReducer:
      state.depositsReducers.searchForAccountsWithCustomerKeyReducer,
  };
}

export default connect(mapStateToProps)(SiezeAmountModal);
