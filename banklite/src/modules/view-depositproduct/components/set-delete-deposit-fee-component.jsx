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

export class SetDeleteDepositFeeModal extends React.Component {
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
    let deleteDepositFeeRequestData = this.props.deleteDepositFeeRequestData;
    // let deleteDepositFeeValidationSchema = Yup.object().shape({
    //   depositSavingFeeId: Yup.number()
    //     .min(2, "Valid response required")
    //     .required("Required"),
    // });
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
            depositSavingFeeId: 0,
          }}
          onSubmit={(values, { resetForm }) => {
            let deleteDepositFeePayload = {
              depositSavingFeeId: this.props.depositSavingFeeId,
            };
            this.props
              .handleDeleteDepositFee(
                deleteDepositFeePayload,
                "deleteproductfee",
                this.props.accountEncodedKey
              )
              .then(() => {
                if (
                  this.props.deleteDepositFeeRequestData.request_status ===
                  productsConstants.DELETE_A_DEPOSIT_PRODUCT_FEE_SUCCESS
                ) {
                  resetForm();
                  setTimeout(() => {
                    this.props.dispatch(
                      productActions.deleteDespositFee("CLEAR")
                    );
                    this.props.handleHideModal();
                    this.props.loadInitialUserData();
                  }, 3000);
                }

                if (
                  this.props.deleteDepositFeeRequestData.request_status ===
                  productsConstants.DELETE_A_DEPOSIT_PRODUCT_FEE_FAILURE
                ) {
                  resetForm();
                  setTimeout(() => {
                    this.props.dispatch(
                      productActions.deleteDespositFee("CLEAR")
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
                <Modal.Title>{"Delete Deposit Fee"}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="text-center ">
                  Are you sure you want to proceed?
                </div>
                {deleteDepositFeeRequestData.request_status ===
                  productsConstants.DELETE_A_DEPOSIT_PRODUCT_FEE_SUCCESS && (
                  <Alert variant="success" className="w-65 mlr-auto">
                    {
                      deleteDepositFeeRequestData.request_data.response.data
                        .message
                    }
                  </Alert>
                )}
                {deleteDepositFeeRequestData.request_status ===
                  productsConstants.DELETE_A_DEPOSIT_PRODUCT_FEE_FAILURE &&
                  deleteDepositFeeRequestData.request_data.error && (
                    <Alert variant="danger" className="w-65 mlr-auto">
                      {deleteDepositFeeRequestData.request_data.error}
                    </Alert>
                  )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="light" onClick={this.props.handleHideModal}>
                  Cancel
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  disabled={deleteDepositFeeRequestData.is_request_processing}
                >
                  {deleteDepositFeeRequestData.is_request_processing
                    ? "Please wait..."
                    : `Delete`}
                </Button>
              </Modal.Footer>
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

export default connect(mapStateToProps)(SetDeleteDepositFeeModal);
