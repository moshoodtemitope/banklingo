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

import {default as DatePickerFilter} from "react-datepicker";
import { depositActions } from "../../../../redux/actions/deposits/deposits.action";

export class BeginMaturityModal extends React.Component {
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
      selectOtherCustomerAccount,
      ctaText,
      newStateHeading,
    //   newStateUpdate,
      showDepositFundsForm,
    } = this.state;


    let newStateUpdate=this.props.newStateUpdate;
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

    // let changeDepositStateValidationSchema;
    // if (showDepositFundsForm !== true) {
    //   changeDepositStateValidationSchema = Yup.object().shape({
    //     comment: Yup.string().min(2, "Valid comments required"),
    //     notes: Yup.string().min(2, "Valid notes required"),
    //   });
    // }

    // if (newStateUpdate === "beginmaturity") {
     let changeDepositStateValidationSchema = Yup.object().shape({
        notes: Yup.string().min(2, "Valid notes required"),
        maturityDate: Yup.string().required("Required"),
      });
    // }

    // if (showDepositFundsForm === true) {
    //   changeDepositStateValidationSchema = Yup.object().shape({
    //     notes: Yup.string().min(2, "Valid notes required"),
    //     depositChannelEncodedKey: Yup.string().required("Required"),
    //     amountToDeposit: Yup.string().required("Required"),
    //     backDateChosen: Yup.string().when("allowBackDate", {
    //       is: (value) => value === true,
    //       then: Yup.string().required("Required"),
    //     }),
    //     bookingDateChosen: Yup.string().when("showBookingDate", {
    //       is: (value) => value === true,
    //       then: Yup.string().required("Required"),
    //     }),
    //   });
    // }

    // if (newStateUpdate === "makewithdrawal") {
    //   changeDepositStateValidationSchema = Yup.object().shape({
    //     notes: Yup.string().min(2, "Valid notes required"),
    //     depositChannelEncodedKey: Yup.string().required("Required"),
    //     amountToWithdraw: Yup.string().required("Required"),
    //     backDateChosen: Yup.string().when("allowBackDate", {
    //       is: (value) => value === true,
    //       then: Yup.string().required("Required"),
    //     }),
    //   });
    // }

    // if (
    //   newStateUpdate === "setmaximumwithdrawalamount" ||
    //   newStateUpdate === "setrecommendeddepositamount"
    // ) {
    //   changeDepositStateValidationSchema = Yup.object().shape({
    //     notes: Yup.string().min(2, "Valid notes required"),
    //     amountToDeposit: Yup.string().required("Required"),
    //   });
    // }

    // if (newStateUpdate === "transfer") {
    //   if (typeOfTransfer === "currentcustomer") {
    //     changeDepositStateValidationSchema = Yup.object().shape({
    //       notes: Yup.string().min(2, "Valid notes required"),
    //       currentCustomerChosenAccount: Yup.string().required("Required"),
    //       amountToTransfer: Yup.string().required("Required"),
    //     });
    //   }
    //   if (typeOfTransfer === "anothercustomer") {
    //     changeDepositStateValidationSchema = Yup.object().shape({
    //       notes: Yup.string().min(2, "Valid notes required"),
    //       chosenAccountNum: Yup.string().required("Required"),
    //       // chosenCustomerEncodedKey:  Yup.string()
    //       //     .required('Required'),
    //       amountToTransfer: Yup.string().required("Required"),
    //     });
    //   }
    // }

    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.handleHideModal}
        size="lg"
        centered="true"
        dialogClassName={"modal-40w withcentered-heading"}
        animation={false}
      >
        <Formik
          initialValues={{
            maturityDate: "",
            notes: "",
            // chosenAccountNum:
            //   selectOtherCustomerAccount !== "" ? selectOtherCustomerAccount.searchItemEncodedKey: "",
            // chosenCustomerEncodedKey: selectOtherCustomerAccount !== "" ? selectOtherCustomerAccount.clientEncodedKey: "",
          }}
          validationSchema={changeDepositStateValidationSchema}
          onSubmit={(values, { resetForm }) => {
            // let changeDepositStatePayload;
            // if (showDepositFundsForm !== true) {
            //   changeDepositStatePayload = {
            //     comment: values.comment,
            //     accountEncodedKey: this.depositEncodedKey,
            //   };
            // }
            // if (newStateUpdate === "beginmaturity") {
              let changeDepositStatePayload = {
                notes: values.notes,
                accountEncodedKey: this.props.depositEncodedKey,
                maturityDate: values.maturityDate.toISOString(),
              };
            // }

            // if (showDepositFundsForm === true) {
            //   changeDepositStatePayload = {
            //     accountEncodedKey: this.depositEncodedKey,
            //     notes: values.notes,
            //     amount: parseFloat(values.amountToDeposit.replace(/,/g, "")),
            //     channelEncodedKey: values.depositChannelEncodedKey,
            //     isBackDated: values.allowBackDate,
            //     backDateValueDate:
            //       values.backDateChosen !== ""
            //         ? values.backDateChosen.toISOString()
            //         : null,
            //     isBookingDate: values.showBookingDate,
            //     bookingDate:
            //       values.bookingDateChosen !== ""
            //         ? values.bookingDateChosen.toISOString()
            //         : null,
            //   };
            // }

            // if (newStateUpdate === "makewithdrawal") {
            //   changeDepositStatePayload = {
            //     accountEncodedKey: this.depositEncodedKey,
            //     notes: values.notes,
            //     amount: parseFloat(values.amountToWithdraw.replace(/,/g, "")),
            //     channelEncodedKey: values.depositChannelEncodedKey,
            //     isBackDated: values.allowBackDate,
            //     backDateValueDate:
            //       values.backDateChosen !== ""
            //         ? values.backDateChosen.toISOString()
            //         : null,
            //   };
            // }

            // if (
            //   newStateUpdate === "setmaximumwithdrawalamount" ||
            //   newStateUpdate === "setrecommendeddepositamount"
            // ) {
            //   changeDepositStatePayload = {
            //     accountEncodedKey: this.depositEncodedKey,
            //     notes: values.notes,
            //     amount: parseFloat(values.amountToDeposit.replace(/,/g, "")),
            //   };
            // }

            // if (newStateUpdate === "transfer") {
            //   changeDepositStatePayload = {
            //     accountEncodedKey: this.depositEncodedKey,
            //     notes: values.notes,
            //     amount: parseFloat(values.amountToTransfer.replace(/,/g, "")),
            //   };

            //   if (typeOfTransfer === "currentcustomer") {
            //     changeDepositStatePayload.destinationCustomerEncodedKey =
            //       getAClientDepositAccountRequest.clientEncodedKey;
            //     changeDepositStatePayload.destinationAccountEncodedKey =
            //       values.currentCustomerChosenAccount;
            //   }

            //   if (
            //     typeOfTransfer === "anothercustomer" &&
            //     selectOtherCustomerAccount !== ""
            //   ) {
            //     changeDepositStatePayload.destinationCustomerEncodedKey =
            //       selectOtherCustomerAccount.clientEncodedKey;
            //     changeDepositStatePayload.destinationAccountEncodedKey =
            //       selectOtherCustomerAccount.searchItemEncodedKey;
            //   }
            // }

            // let changeDepositStatePayload = `Comment=${values.Comment}&ClientEncodedKey=${this.clientEncodedKey}`;

            // return false;

            this.props.handleNewDepositState(
              changeDepositStatePayload,
              newStateUpdate
            ).then(() => {
              if (
                this.props.changeDepositStateReducer.request_status ===
                loanAndDepositsConstants.CHANGE_DEPOSITSTATE_SUCCESS
              ) {
                resetForm();
                // value = {null}

                setTimeout(() => {
                  this.props.dispatch(
                    depositActions.changeDepositState("CLEAR")
                  );
                  this.props.handleHideModal();
                  this.props.getCustomerDepositAccountDetails(this.depositEncodedKey);
                }, 3000);
              }

              if (
                this.props.changeDepositStateReducer.request_status ===
                loanAndDepositsConstants.CHANGE_DEPOSITSTATE_FAILURE
              ) {
                resetForm();
                // value = {null}

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
                <Modal.Title>{newStateHeading}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
               
                  <Form.Row className="mb-10">
                    <Col className="date-wrap">
                      <Form.Label className="block-level">
                        Maturity Date
                      </Form.Label>
                      <Form.Group className="mb-0 date-wrap">
                        <DatePickerFilter
                          placeholderText="Choose  date"
                          autoComplete="new-password"
                          dateFormat={window.dateformat}
                          className="form-control form-control-sm"
                          peekNextMonth
                          showMonthDropdown
                          name="maturityDate"
                          value={values.maturityDate}
                          onChange={setFieldValue}
                          showYearDropdown
                          dropdownMode="select"
                          minDate={new Date()}
                          className={
                            errors.maturityDate && touched.maturityDate
                              ? "is-invalid form-control form-control-sm h-38px"
                              : "form-control h-38px form-control-sm"
                          }
                        />
                        {errors.maturityDate && touched.maturityDate ? (
                          <span className="invalid-feedback">
                            {errors.maturityDate}
                          </span>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Form.Row>
               
               
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="light"
                  onClick={this.props.handleHideModal}
                >
                  Cancel
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  disabled={changeDepositStateRequest.is_request_processing}
                >
                  {changeDepositStateRequest.is_request_processing
                    ? "Please wait..."
                    : `${ctaText}`}
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

export default connect(mapStateToProps)(BeginMaturityModal);
