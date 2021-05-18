import * as React from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { productActions } from "../../../redux/actions/products/products.action";
import { productsConstants } from "../../../redux/actiontypes/products/products.constants";
import { acoountingActions } from "../../../redux/actions/accounting/accounting.action";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import Alert from "react-bootstrap/Alert";
// import Alert from "react-bootstrap/Alert";
import { Formik } from "formik";
import "../../viewcustomer/customerprofile.scss";
import { numberWithCommas } from "../../../shared/utils";
import { accountingConstants } from "../../../redux/actiontypes/accounting/accounting.constants";

export class SetEditDepositFeeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getAllGLAccounts();
  }

  getAllGLAccounts = () => {
    const { dispatch } = this.props;

    dispatch(acoountingActions.getAllGLAccounts());
  };

  render() {
    let glAccountRequest = this.props.getAllGLAccountsReducer;
    let depositSavingFee = this.props.depositSavingFee;
    let glAccountsList = [];
    let updateDepositProductFeeRequestData = this.props
      .updateDepositProductFeeRequestData;
    let editDepositFeeValidationSchema = Yup.object().shape({
      name: Yup.string().min(2, "Valid response required").required("Required"),
      //   type: Yup.string().min(1, "Select Type").required("Required"),
      //   feePayment: Yup.string().min(1, "Select Type").required("Required"),
      // feeApplyDate: Yup.string().min(1, "Select Type").required("Required"),
      //   feeIncomeId: Yup.string()
      //     .min(1, "Select Type")
      //     .required("Required"),
      //   amount: Yup.string().required("Required"),
    });

    let typeList = [
      { value: 0, label: "Manual" },
      { value: 1, label: "Monthly" },
    ];

    let feeList = [
      { value: 0, label: "FLAT" },
      { value: 1, label: "PERCENT" },
    ];

    let applyDateList = [
      { value: 1, label: "Monthly from activation date" },
      { value: 2, label: "First day of every month" },
    ];

    let allGlAccount = [];
    switch (glAccountRequest.request_status) {
      case accountingConstants.GET_ALL_GLACCOUNTS_SUCCESS:
        glAccountsList = glAccountRequest.request_data?.response?.data;
        glAccountsList.map((channel, id) => {
          allGlAccount.push({
            label: channel.accountDescription,
            value: channel.id,
          });
        });
        break;
    }

    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.handleHideModal}
        size="lg"
        centered="true"
        dialogClassName="modal-40w withcentered-heading"
        animation={false}
        backdrop="static"
      >
        <Formik
          initialValues={{
            name: depositSavingFee?.name.toString(),
            amount: depositSavingFee?.amount.toString(),
            type: depositSavingFee?.depositFeeType,
            feePayment: depositSavingFee?.feePayment,
            feeApplyDate: depositSavingFee?.feeApplyDate,
            feeIncomeId: depositSavingFee?.feeIncomeId,
          }}
          validationSchema={editDepositFeeValidationSchema}
          onSubmit={(values, { resetForm }) => {
            let addDepositFeePayload = {
              name: values.name,
              amount: parseFloat(values.amount.replace(/,/g, "")),
              depositFeeType: values.type,
              feePayment: values.feePayment,
              feeApplyDate: values.type === 0 ? 0 : values.feeApplyDate,
              feeIncomeId:
                values.feeIncomeId !== "" ? values.feeIncomeId : null,
              depositSavingFeeId: this.props.depositSavingFee.id,
            };
            this.props
              .handleEditDepositFee(
                addDepositFeePayload,
                "updateproductfee",
                this.props.accountEncodedKey
              )
              .then(() => {
                if (
                  this.props.updateDepositProductFeeRequestData
                    .request_status ===
                  productsConstants.EDIT_A_DEPOSIT_PRODUCT_FEE_SUCCESS
                ) {
                  resetForm();
                  setTimeout(() => {
                    this.props.dispatch(
                      productActions.updateDespositFee("CLEAR")
                    );
                    this.props.handleHideModal();
                    this.props.loadInitialUserData();
                  }, 3000);
                }

                if (
                  this.props.updateDepositProductFeeRequestData
                    .request_status ===
                  productsConstants.EDIT_A_DEPOSIT_PRODUCT_FEE_FAILURE
                ) {
                  resetForm();
                  setTimeout(() => {
                    this.props.dispatch(
                      productActions.updateDespositFee("CLEAR")
                    );
                  }, 2000);
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
                <Modal.Title>
                  {"Edit Deposit "}
                  {depositSavingFee?.name}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <Form.Group>
                    <Form.Label className="block-level">Name</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      value={values.name}
                      className={
                        errors.name && touched.name ? "is-invalid" : null
                      }
                      name="name"
                      required
                    />
                    {errors.name && touched.name ? (
                      <span className="invalid-feedback">{errors.name}</span>
                    ) : null}
                  </Form.Group>
                </div>
                <Form.Group>
                  <Form.Label className="block-level">Type</Form.Label>
                  <Select
                    options={typeList}
                    defaultValue={{
                      label: depositSavingFee?.depositFeeTypeDescription,
                      value: depositSavingFee?.depositFeeType,
                    }}
                    onChange={(selected) =>
                      setFieldValue("type", selected.value)
                    }
                    onBlur={() => setFieldTouched("type", true)}
                    className={
                      errors.type && touched.type ? "is-invalid" : null
                    }
                    name="type"
                  />
                  {errors.type && touched.type ? (
                    <span className="invalid-feedback">{errors.type}</span>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label className="block-level">Fees Payment</Form.Label>
                  <Select
                    options={feeList}
                    defaultValue={{
                      label: depositSavingFee?.feePaymentDescription,
                      value: depositSavingFee?.feePayment,
                    }}
                    onChange={(selected) =>
                      setFieldValue("feePayment", selected.value)
                    }
                    onBlur={() => setFieldTouched("feePayment", true)}
                    className={
                      errors.feePayment && touched.feePayment
                        ? "is-invalid"
                        : null
                    }
                    name="feePayment"
                  />
                  {errors.feePayment && touched.feePayment ? (
                    <span className="invalid-feedback">
                      {errors.feePayment}
                    </span>
                  ) : null}
                </Form.Group>
                <div>
                  <Form.Group>
                    <Form.Label className="block-level">Amount</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={handleChange}
                      rows="3"
                      name="amount"
                      value={numberWithCommas(values.amount)}
                      className={
                        errors.amount && touched.amount ? "is-invalid" : null
                      }
                    />
                    {errors.amount && touched.amount ? (
                      <span className="invalid-feedback">{errors.amount}</span>
                    ) : null}
                  </Form.Group>
                </div>
                <Form.Group>
                  <Form.Label className="block-level">Fee Income</Form.Label>
                  <Select
                    options={allGlAccount}
                    defaultValue={{
                      label: depositSavingFee?.feeIncome,
                      value: depositSavingFee?.feeIncomeId,
                    }}
                    onChange={(selected) =>
                      setFieldValue("feeIncomeId", selected.value)
                    }
                    onBlur={() => setFieldTouched("feeIncomeId", true)}
                    className={
                      errors.feeIncomeId && touched.feeIncomeId
                        ? "is-invalid"
                        : null
                    }
                    name="feeIncomeId"
                  />
                  {errors.feeIncomeId && touched.feeIncomeId ? (
                    <span className="invalid-feedback">
                      {errors.feeIncomeId}
                    </span>
                  ) : null}
                </Form.Group>
                {values.type === 1 ? (
                  <Form.Group>
                    <Form.Label className="block-level">
                      Fee Apply Date
                    </Form.Label>
                    <Select
                      options={applyDateList}
                      defaultValue={{
                        label: depositSavingFee?.feeApplyDateDescription,
                        value: depositSavingFee?.feeApplyDate,
                      }}
                      onChange={(selected) =>
                        setFieldValue("feeApplyDate", selected.value)
                      }
                      onBlur={() => setFieldTouched("feeApplyDate", true)}
                      className={
                        errors.feeApplyDate && touched.feeApplyDate
                          ? "is-invalid"
                          : null
                      }
                      name="feeApplyDate"
                    />
                    {errors.feeApplyDate && touched.feeApplyDate ? (
                      <span className="invalid-feedback">
                        {errors.feeApplyDate}
                      </span>
                    ) : null}
                  </Form.Group>
                ) : null}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="light" onClick={this.props.handleHideModal}>
                  Cancel
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  disabled={
                    updateDepositProductFeeRequestData.is_request_processing
                  }
                >
                  {updateDepositProductFeeRequestData.is_request_processing
                    ? "Please wait..."
                    : `Submit`}
                </Button>
              </Modal.Footer>
              <div className="footer-alert">
                {updateDepositProductFeeRequestData.request_status ===
                  productsConstants.EDIT_A_DEPOSIT_PRODUCT_FEE_SUCCESS && (
                  <Alert variant="success" className="w-65 mlr-auto">
                    {
                      updateDepositProductFeeRequestData.request_data.response
                        .data.message
                    }
                  </Alert>
                )}
                {updateDepositProductFeeRequestData.request_status ===
                  productsConstants.EDIT_A_DEPOSIT_PRODUCT_FEE_FAILURE &&
                  updateDepositProductFeeRequestData.request_data.error && (
                    <Alert variant="danger" className="w-65 mlr-auto">
                      {updateDepositProductFeeRequestData.request_data.error}
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
    getAllGLAccountsReducer: state.accountingReducers.getAllGLAccountsReducer,
  };
}

export default connect(mapStateToProps)(SetEditDepositFeeModal);
