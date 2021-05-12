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
import { accountNumber, numberWithCommas } from "../../../../shared/utils";
import { loanAndDepositsConstants } from "../../../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants";
import { depositActions } from "../../../../redux/actions/deposits/deposits.action";

export class SetUnlockAmountModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // const { ctaText, newStateHeading, newStateUpdate } = this.state;
    let LockAmountReducer = this.props.LockAmountReducer;
    console.log(">>>>>>>>>>>", LockAmountReducer);
    let getAClientDepositAccountRequest = this.props
      .getAClientDepositAccountReducer.request_data.response.data;
    let lockAccountValidationSchema = Yup.object().shape({
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
            lockReason: "",
          }}
          validationSchema={lockAccountValidationSchema}
          onSubmit={(values, { resetForm }) => {
            let unLockAmountPayload = {
              accountNumber: this.props.depositEncodedKey,
              blockReference: this.props.blockReference,
              notes: values.lockReason,
            };
            console.log("values>>>>>>>", unLockAmountPayload);
            this.props
              .handleLockAmountState(unLockAmountPayload, "delete")
              .then(() => {
                if (
                  this.props.LockAmountReducer.request_status ===
                  loanAndDepositsConstants.LOCK_AMOUNT_PENDING
                ) {
                  resetForm();
                  setTimeout(() => {
                    this.props.dispatch(
                      depositActions.lockAmountState("CLEAR")
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
                      depositActions.lockAmountState("CLEAR")
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
                <Modal.Title>{"Unlock Amount"}</Modal.Title>
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
                          <span className="form-text">Locked Amount</span>
                        </Col>
                        <Col>
                          <Form.Label className="block-level">
                            New State
                          </Form.Label>
                          <span className="form-text">Unlock Amount</span>
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
                  disabled={LockAmountReducer.is_request_processing}
                >
                  {LockAmountReducer.is_request_processing
                    ? "Please wait....."
                    : `Unlock Amount`}
                </Button>
              </Modal.Footer>
              <div className="footer-alert">
                {LockAmountReducer.request_status ===
                  loanAndDepositsConstants.LOCK_AMOUNT_SUCCESS && (
                  <Alert variant="success" className="w-65 mlr-auto">
                    {LockAmountReducer.request_data.response.data.message}
                  </Alert>
                )}
                {LockAmountReducer.request_status ===
                  loanAndDepositsConstants.LOCK_AMOUNT_FAILURE &&
                  LockAmountReducer.request_data.error && (
                    <Alert variant="danger" className="w-65 mlr-auto">
                      {LockAmountReducer.request_data.error}
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

export default SetUnlockAmountModal;
