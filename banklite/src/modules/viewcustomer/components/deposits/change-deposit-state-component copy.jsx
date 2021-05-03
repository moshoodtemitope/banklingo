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


import { loanAndDepositsConstants } from "../../../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants";
import { depositActions } from "../../../../redux/actions/deposits/deposits.action";

export class ChangeDepositStateModal extends React.Component {
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


    changeDepositStateBox = (depositDetails)=>{
      
        let  changeDepositStateRequest = this.props.changeDepositStateReducer,
            getAClientDepositAccountRequest = this.props.getAClientDepositAccountReducer.request_data.response.data;

    
        let   changeDepositStateValidationSchema = Yup.object().shape({
                comment:  Yup.string()
                    .min(2, 'Valid comments required'),
                notes:  Yup.string()
                    .min(2, 'Valid notes required'),

            });
       

        return(
            <Modal  backdrop="static"  show={this.props.showModal} onHide={this.props.handleHideModal} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                <Formik
                    initialValues={{
                        comment:"",
                        notes:""
                    }}

                    validationSchema={changeDepositStateValidationSchema}
                    onSubmit={(values, { resetForm }) => {

                        let changeDepositStatePayload = {
                                comment:values.comment,
                                accountEncodedKey:this.props.depositEncodedKey
                            }
                      

                       

                        // return false;

                        this.props.handleNewDepositState(changeDepositStatePayload,this.props.newStateUpdate )
                            .then(
                                () => {

                                    if (this.props.changeDepositStateReducer.request_status === loanAndDepositsConstants.CHANGE_DEPOSITSTATE_SUCCESS) {
                                        resetForm();
                                        // value = {null}

                                        setTimeout(() => {
                                            this.props.dispatch(depositActions.changeDepositState("CLEAR"))
                                            this.props.handleHideModal();
                                            this.props.getCustomerDepositAccountDetails(this.depositEncodedKey);
                                        }, 3000);
                                    }

                                    if(this.props.changeDepositStateReducer.request_status === loanAndDepositsConstants.CHANGE_DEPOSITSTATE_FAILURE) {
                                        resetForm();
                                        // value = {null}

                                        setTimeout(() => {
                                            this.props.dispatch(depositActions.changeDepositState("CLEAR"))
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
                                    <Modal.Title>{this.props.newStateHeading}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                 
                                        <Form.Group>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Present State</Form.Label>
                                                    <span className="form-text">{depositDetails.accountStateDescription} </span>
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">New State</Form.Label>
                                                    <span className="form-text">{this.props.                                                                                                                                                                                                                                                                                                                                         newState}</span>
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

                                    <Button variant="light" onClick={this.props.handleHideModal}>
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="success"
                                        type="submit"
                                        disabled={changeDepositStateRequest.is_request_processing}
                                    >
                                        {changeDepositStateRequest.is_request_processing?"Please wait...":`${this.props.ctaText}`}

                                    </Button>

                                </Modal.Footer>
                                <div className="footer-alert">
                                    {changeDepositStateRequest.request_status === loanAndDepositsConstants.CHANGE_DEPOSITSTATE_SUCCESS &&
                                        <Alert variant="success" className="w-65 mlr-auto">
                                            {changeDepositStateRequest.request_data.response.data.message}
                                        </Alert>
                                    }
                                    {(changeDepositStateRequest.request_status === loanAndDepositsConstants.CHANGE_DEPOSITSTATE_FAILURE && changeDepositStateRequest.request_data.error )&&
                                        <Alert variant="danger" className="w-65 mlr-auto">
                                            {changeDepositStateRequest.request_data.error}
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

export default connect(mapStateToProps)(ChangeDepositStateModal);
