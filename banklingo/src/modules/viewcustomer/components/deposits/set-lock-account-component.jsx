import * as React from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import Alert from "react-bootstrap/Alert";
import { Formik } from "formik";
import "../../customerprofile.scss";

import { accountNumber } from "../../../../shared/utils";

import { administrationConstants } from "../../../../redux/actiontypes/administration/administration.constants";
import { loanAndDepositsConstants } from "../../../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants";
import { loanActions } from "../../../../redux/actions/loans/loans.action";
import { depositActions } from "../../../../redux/actions/deposits/deposits.action";

export class SetLockAccountModal extends React.Component {
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
    const { ctaText, newStateHeading, newStateUpdate } = this.state;
    let changeDepositStateRequest = this.props.changeDepositStateReducer,
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
    let lockAccountValidationSchema = Yup.object().shape({
      accountNumber: Yup.string().min(2, "Valid Account Number required"),
      lockReason: Yup.string().required("Required"),
    });

    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.handleHideModal}
        size="lg"
        centered="true"
        dialogClassName="modal-40w withcentered-heading"
        animation={false}
      >
        <Formik
          initialValues={{
            accountNumber: getAClientDepositAccountRequest.accountNumber,
            lockReason: "",
          }}
          validationSchema={lockAccountValidationSchema}
          onSubmit={(values, { resetForm }) => {
            let lockAccountPayload = {
              accountNumber: this.props.depositEncodedKey,
              lockReason: values.lockReason,
            };
            this.props
              .handleNewDepositState(lockAccountPayload, "lockaccount")
              .then(() => {
                if (
                  this.props.changeDepositStateReducer.request_status ===
                  loanAndDepositsConstants.CHANGE_DEPOSITSTATE_SUCCESS
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
                  this.props.changeDepositStateReducer.request_status ===
                  loanAndDepositsConstants.CHANGE_DEPOSITSTATE_FAILURE
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
                <Modal.Title>{"Lock Account"}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <Form.Group>
                    <Form.Group>
                      <Form.Row>
                        <Col>
                          <Form.Label className="block-level">
                            Present State
                          </Form.Label>
                          <span className="form-text">
                            {this.props.oldState}{" "}
                          </span>
                        </Col>
                        <Col>
                          <Form.Label className="block-level">
                            New State
                          </Form.Label>
                          <span className="form-text">Lock</span>
                        </Col>
                      </Form.Row>
                    </Form.Group>
                  </Form.Group>
                </div>
                <Form.Group>
                  <Form.Label className="block-level">Note</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    onChange={handleChange}
                    name="lockReason"
                    value={values.lockReason}
                    className={
                      errors.lockReason && touched.lockReason
                        ? "is-invalid form-control form-control-sm"
                        : null
                    }
                  />
                  {errors.lockReason && touched.lockReason ? (
                    <span className="invalid-feedback">
                      {errors.lockReason}
                    </span>
                  ) : null}
                </Form.Group>
                {/* } */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="light" onClick={this.props.handleHideModal}>
                  Cancel
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  disabled={changeDepositStateRequest.is_request_processing}
                >
                  {changeDepositStateRequest.is_request_processing
                    ? "Please wait....."
                    : `Lock Account`}
                </Button>
              </Modal.Footer>
              <div className="footer-alert">
                {changeDepositStateRequest.request_status ===
                  loanAndDepositsConstants.CHANGE_DEPOSITSTATE_SUCCESS && (
                  <Alert variant="success" className="w-65 mlr-auto">
                    {
                      changeDepositStateRequest.request_data.response.data
                        .message
                    }
                  </Alert>
                )}
                {changeDepositStateRequest.request_status ===
                  loanAndDepositsConstants.CHANGE_DEPOSITSTATE_FAILURE &&
                  changeDepositStateRequest.request_data.error && (
                    <Alert variant="danger" className="w-65 mlr-auto">
                      {changeDepositStateRequest.request_data.error}
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
    changeDepositStateReducer: state.depositsReducers.changeDepositStateReducer,
    searchAccountNumbersReducer:
      state.depositsReducers.searchAccountNumbersReducer,
    searchCustomerAccountReducer:
      state.depositsReducers.searchCustomerAccountReducer,
    searchForAccountsWithCustomerKeyReducer:
      state.depositsReducers.searchForAccountsWithCustomerKeyReducer,
  };
}

export default connect(mapStateToProps)(SetLockAccountModal);
