import * as React from 'react';

import { connect } from 'react-redux';
import { Fragment } from "react";
import { Link } from 'react-router-dom';


import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AsyncSelect from 'react-select/async';
import Alert from 'react-bootstrap/Alert'
import DatePicker from '../../../_helpers/datepickerfield'
import "react-datepicker/dist/react-datepicker.css";

import { numberWithCommas, getDateFromISO} from '../../utils';
import { depositActions } from "../../../redux/actions/deposits/deposits.action";
import { loanAndDepositsConstants } from "../../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants";


import "./index.scss"; 
class ViewACheque extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            PageSize: 25,
            CurrentPage: 1,

            endDate: '',
            startDate: '',
            SearchText: '',
        }

        

        // this.clientEncodedKey = this.props.clientEncodedKey? this.props.clientEncodedKey :null
        // this.clientName = this.props.clientName? this.props.clientName :""

    }

    componentDidMount(){
        
    }

    // loadInitialData = () => {
    //     let { PageSize, CurrentPage } = this.state;
    //     let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
    //     this.getCheques(params);
    // };
    
    // getCheques = (paramters) => {
    //     const { dispatch } = this.props;

    //     dispatch(depositActions.getAllCheques(paramters, "uncleared"));
    // };
 

   

    handleUpdateACheque = async (requestPayload, transactiontype)=>{
        const {dispatch} = this.props;
       
        await dispatch(depositActions.updateACheque(requestPayload, transactiontype));
    } 

    renderChequeDetails = (transactionDetails) => {
        
       
        let chequeSelected =  this.props.chequeSelected;
        let updateAChequeRequest =  this.props.updateAChequeReducer;  
        let {
            selectedCustomer,
            defaultUserOptions,
            selectedUser,
            defaultOptions} = this.state;
                
                

                
                    
            return(
                <div className="slidein-wrap">
                    <div className="slide-wrap-overlay"></div>
                    <div className="slidein-form" ref={this.setWrapperRef}>
                        <div className="slide-in-heading">
                            <h3>{this.props.headingText}</h3> 
                            <div className="close-slidein" onClick={this.props.closeViewCheque}>X</div>
                        </div>
                        
                        <div className="slidein-formwrap">
                            <Formik
                                initialValues={{
                                    notes:""
                                }}
                                onSubmit={(values, { resetForm }) => {
                                    
                                    let requestPayload = {
                                        clearingEncodedKey: chequeSelected.encodedKey,
                                        notes: values.notes!==""? values.notes: null,
                                    }

                                    if(this.props.chequeAction==="clearcheque"){
                                        requestPayload.externalReferenceId = chequeSelected.referenceId
                                    }

                                   

                                    this.handleUpdateACheque(requestPayload, this.props.chequeAction)
                                            .then(()=>{
                                                if(this.props.updateAChequeReducer.request_status===loanAndDepositsConstants.UPDATE_A_CHEQUE_SUCCESS){
                                                    resetForm()

                                                    this.props.getCheques()       
                                                }
                                            })
                                    

                                    



                                }}
                            >
                                {({ handleSubmit,
                                    handleChange,
                                    handleBlur,
                                    resetForm,
                                    setFieldValue,
                                    setFieldTouched,
                                    values,
                                    touched,
                                    isValid,
                                    errors, }) => (
                                    <Form noValidate
                                        onSubmit={handleSubmit}>

                                        
                                        <div className="formdetails">
                                            <div className="each-detail">
                                                <div className="detail-title">Cheque Number</div>
                                                <div className="detail-value">{chequeSelected.chequeNo}</div>
                                            </div>
                                            <div className="each-detail">
                                                <div className="detail-title">Cheque Amount</div>
                                                <div className="detail-value">{numberWithCommas(chequeSelected.chequeAmount, true, true)} {chequeSelected.currencyCode}</div>
                                            </div>
                                            <div className="each-detail">
                                                <div className="detail-title">Cheque State</div>
                                                <div className="detail-value">{chequeSelected.chequeClearingStateDesc}</div>
                                            </div>
                                            <div className="each-detail">
                                                <div className="detail-title">Cheque Request Date</div>
                                                <div className="detail-value">{getDateFromISO(chequeSelected.requestDate)}</div>
                                            </div>
                                            <div className="each-detail">
                                                <div className="detail-title">Cheque Deposit Account Number</div>
                                                <div className="detail-value">{chequeSelected.depositAccountNumber}</div>
                                            </div>
                                            <div className="each-detail">
                                                <div className="detail-title">Cheque Reference</div>
                                                <div className="detail-value">{chequeSelected.referenceId}</div>
                                            </div>
                                            <div className="each-detail">
                                                <div className="detail-title">Transaction ID</div>
                                                <div className="detail-value">{chequeSelected.transactionId}</div>
                                            </div>
                                            <div className="each-detail">
                                                <div className="detail-title">Remarks</div>
                                                <div className="detail-value">{chequeSelected.remarks || "N/A"}</div>
                                            </div>
                                        </div>
                                        {this.props.chequeAction &&
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
                                        }
                                                   

                                        <div className="mt-50">
                                            <div className="footer-with-cta">
                                                <Button variant="secondary" 
                                                    disabled={updateAChequeRequest.is_request_processing}
                                                    onClick={this.props.closeViewCheque}>
                                                    Cancel
                                                </Button>
                                                
                                                {/* {updateAChequeRequest.request_status !== clientsConstants.CREATE_A_CLIENT_TASK_SUCCESS &&  */}
                                                {this.props.chequeAction &&
                                                    <Button
                                                        type="submit"
                                                        disabled={updateAChequeRequest.is_request_processing}
                                                    >
                                                        
                                                        {updateAChequeRequest.is_request_processing ? "Please wait..." : `${this.props.headingText}`}
                                                    </Button>
                                                }
                                                
                                            </div>
                                        </div>
                                        {updateAChequeRequest.request_status === loanAndDepositsConstants.UPDATE_A_CHEQUE_SUCCESS && 
                                            <Alert variant="success">
                                                {updateAChequeRequest.request_data.response.data.message && updateAChequeRequest.request_data.response.data.message}
                                                {!updateAChequeRequest.request_data.response.data.message && `Task was successfully created`}
                                            </Alert>
                                        }
                                        {updateAChequeRequest.request_status === loanAndDepositsConstants.UPDATE_A_CHEQUE_FAILURE && 
                                            <Alert variant="danger">
                                                {updateAChequeRequest.request_data.error}
                                            </Alert>
                                        }



                                        


                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )
    }
    






    render() {
        
        let {openedState} = this.state;

        return (
            <Fragment>
                {this.props.displayCheque=== true && this.renderChequeDetails()}
            </Fragment>
        );
    }
}



function mapStateToProps(state) {
    return {
        
        updateAChequeReducer: state.depositsReducers.updateAChequeReducer,
    };
}

export default connect(mapStateToProps)(ViewACheque);