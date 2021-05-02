import * as React from 'react';

import { connect } from 'react-redux';
import { Fragment } from "react";
import { Link } from 'react-router-dom';


import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal'

import Alert from 'react-bootstrap/Alert'

import { numberWithCommas, getDateFromISO} from '../../utils';
import { dashboardActions } from '../../../redux/actions/dashboard/dashboard.action';
import { dashboardConstants } from '../../../redux/actiontypes/dashboard/dashboard.constants'

import "./styles.scss"; 
class ReverseTransaction extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            
        }



    }

    componentDidMount(){
    
    }

    reverseTxt = async (payload) => {
        const { dispatch } = this.props;



        await dispatch(dashboardActions.reverseATransaction(payload));


    }
    

    reverseATransactionBox = (transactionDetails) => {
        // const { showWriteOffLoan  } = this.state;
        let reverseATransactionRequest = this.props.reverseATransactionReducer;

        
        let transactionType = this.props.transactionType;

        if(transactionType.charAt(transactionType.length-1) =="s"){
            transactionType = transactionType.replace(/.$/,"");
        }
           
        
            console.log("transactionDetails", transactionType.charAt(transactionType.length-1));

        return (
            // <Modal show={this.props.showReverseTransaction}  size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={false}>
            <Modal show={this.props.showReverseTransaction} onHide={this.props.handleCloseReverse} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={false}>
                <Formik
                    initialValues={{
                        reason:""
                    }}

                    // validationSchema={loanStateValidationSchema}
                    onSubmit={(values, { resetForm }) => {

                        let reversalPayload ={
                            transactionKey: this.props.transactionKey,
                            reason: values.reason
                        };
                        
                        // console.log("reversalPayload", reversalPayload)




                        this.reverseTxt(reversalPayload)
                            .then(
                                () => {

                                    if (this.props.reverseATransactionReducer.request_status === dashboardConstants.REVERSE_TRANSACTION_SUCCESS) {
                                        resetForm();
                                        // value = {null}

                                        setTimeout(() => {
                                            // this.props.dispatch(loanActions.payOffALoan("CLEAR"))
                                            
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
                                   Reverse {transactionType}
                                    </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                
                                {this.props.transactionMode==="Loan" &&
                                    <div className="transaction-infowrap">
                                        {transactionDetails.transactionAmount && 
                                            <div className="eachtype-info">
                                                <div className="info-title">Transaction Amount</div>
                                                <div className="info-value">{numberWithCommas(transactionDetails.transactionAmount, true)} </div>
                                            </div>
                                        }
                                        {transactionDetails.userName && 
                                            <div className="eachtype-info">
                                                <div className="info-title">Performed by</div>
                                                <div className="info-value">{transactionDetails.userName} </div>
                                            </div>
                                        }
                                        {transactionDetails.transactionEntryTypeDescription &&
                                            <div className="eachtype-info">
                                                <div className="info-title">Entry Type</div>
                                                <div className="info-value">{transactionDetails.transactionEntryTypeDescription} </div>
                                            </div>
                                        }
                                        {transactionDetails.entryDate &&
                                            <div className="eachtype-info">
                                                <div className="info-title">Entry Date</div>
                                                <div className="info-value">{transactionDetails.entryDate} </div>
                                            </div>
                                        }       
                                        {transactionDetails.typeDescription &&
                                            <div className="eachtype-info">
                                                <div className="info-title">Transaction Type</div>
                                                <div className="info-value">{transactionDetails.typeDescription} </div>
                                            </div>
                                        }
                                        {transactionDetails.transactionDate &&
                                            <div className="eachtype-info">
                                                <div className="info-title">Transaction Date</div>
                                                <div className="info-value">{transactionDetails.transactionDate} </div>
                                            </div>
                                        }
                                    </div>
                                
                                }
                                {this.props.transactionMode==="Deposit" &&
                                    <div className="transaction-infowrap">
                                        {transactionDetails.depositAccountNumber && 
                                            <div className="eachtype-info">
                                                <div className="info-title">Account Number</div>
                                                <div className="info-value">{transactionDetails.depositAccountNumber} </div>
                                            </div>
                                        }
                                        {transactionDetails.transactionAmount && 
                                            <div className="eachtype-info">
                                                <div className="info-title">Transaction Amount</div>
                                                <div className="info-value">{numberWithCommas(transactionDetails.transactionAmount, true)} </div>
                                            </div>
                                        }
                                        {transactionDetails.userName && 
                                            <div className="eachtype-info">
                                                <div className="info-title">Performed by</div>
                                                <div className="info-value">{transactionDetails.userName} </div>
                                            </div>
                                        }
                                        {transactionDetails.entryType &&
                                            <div className="eachtype-info">
                                                <div className="info-title">Entry Type</div>
                                                <div className="info-value">{transactionDetails.entryType} </div>
                                            </div>
                                        }
                                        {transactionDetails.entryDate &&
                                            <div className="eachtype-info">
                                                <div className="info-title">Entry Date</div>
                                                <div className="info-value">{getDateFromISO(transactionDetails.entryDate)} </div>
                                            </div>
                                        }       
                                        {transactionDetails.typeDescription &&
                                            <div className="eachtype-info">
                                                <div className="info-title">Transaction Type</div>
                                                <div className="info-value">{transactionDetails.typeDescription} </div>
                                            </div>
                                        }
                                        {transactionDetails.dateCreated &&
                                            <div className="eachtype-info">
                                                <div className="info-title">Date Created</div>
                                                <div className="info-value">{transactionDetails.dateCreated} </div>
                                            </div>
                                        }
                                    </div>
                                
                                }
                                {/* <div>
                                    <div className="modal-notes grayed">Outstanding Balances</div>
                                    <div className="each-msg bolden">
                                       <span>Total</span> 
                                       <span>CurCode{numberWithCommas(loanDetails.totalExpected, true)}</span> 
                                    </div>
                                    <div className="each-msg">
                                       <span>Principal</span> 
                                       <span>CurCode{numberWithCommas(loanDetails.interestExpected, true)}</span> 
                                    </div>
                                    <div className="each-msg">
                                       <span>Interest</span> 
                                       <span>CurCode{numberWithCommas(loanDetails.principalExpected, true)}</span> 
                                    </div>
                                    <div className="each-msg">
                                       <span>Fees</span> 
                                       <span>CurCode{numberWithCommas(loanDetails.feesExpected, true)}</span> 
                                    </div>
                                    <div className="each-msg">
                                       <span>Penalty</span> 
                                       <span>CurCode{numberWithCommas(loanDetails.penaltyExpected, true)}</span> 
                                    </div>

                                    <Form.Group className="mt-20">
                                        <Form.Label className="block-level">Write Off Amount</Form.Label>
                                        
                                        <h4>CurCode{numberWithCommas(loanDetails.totalExpected, true)}</h4>
                                    </Form.Group>
                                </div> */}
                                
                                
                                <Form.Group>
                                    <Form.Label className="block-level">Reason for reversal</Form.Label>
                                    <Form.Control as="textarea" rows="3"
                                        onChange={handleChange}
                                        value={values.reason}
                                        className={errors.reason && touched.reason ? "is-invalid" : null}
                                        name="reason"  />
                                    {errors.reason && touched.reason ? (
                                        <span className="invalid-feedback">{errors.reason}</span>
                                    ) : null}
                                </Form.Group>
                                
                               
                            </Modal.Body>
                            <Modal.Footer>

                                
                                <Button variant="light" onClick={this.props.handleCloseReverse}>
                                    Cancel
                                </Button>
                                {reverseATransactionRequest.request_status !== dashboardConstants.REVERSE_TRANSACTION_SUCCESS &&
                                    <Button
                                        variant="success"
                                        type="submit"
                                        disabled={reverseATransactionRequest.is_request_processing}
                                    >
                                        {reverseATransactionRequest.is_request_processing ? "Please wait..." : `Reverse ${transactionType}`}

                                    </Button>
                                }

                            </Modal.Footer>
                            <div className="footer-alert">
                                {reverseATransactionRequest.request_status === dashboardConstants.REVERSE_TRANSACTION_SUCCESS &&
                                    <Alert variant="success" className="w-65 mlr-auto">
                                        {reverseATransactionRequest.request_data.response.data.message}
                                    </Alert>
                                }
                                {(reverseATransactionRequest.request_status === dashboardConstants.REVERSE_TRANSACTION_FAILURE && reverseATransactionRequest.request_data.error) &&
                                    <Alert variant="danger" className="w-65 mlr-auto">
                                        {reverseATransactionRequest.request_data.error}
                                    </Alert>
                                }
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        )
    }
    






    render() {
        
        let {openedState} = this.state;

        return (
            <Fragment>
                {this.props.showReverseTransaction=== true && this.reverseATransactionBox(this.props.transactionDetails, this.props.transactionType, this.props.transactionKey)}
            </Fragment>
        );
    }
}



function mapStateToProps(state) {
    return {
        reverseATransactionReducer: state.dashboardReducers.reverseATransactionReducer,
    };
}

export default connect(mapStateToProps)(ReverseTransaction);