import * as React from "react";
// import {Router} from "react-router";


import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form'

import Button from 'react-bootstrap/Button'
import Select from 'react-select';
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import * as Yup from 'yup';
import "react-datepicker/dist/react-datepicker.css";
import Alert from 'react-bootstrap/Alert'


import { Formik } from 'formik';

import "../../customerprofile.scss"; 

import { numberWithCommas, getDateFromISO} from '../../../../shared/utils';
import { administrationConstants } from "../../../../redux/actiontypes/administration/administration.constants";
import { loanAndDepositsConstants } from "../../../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants";
import { loanActions } from "../../../../redux/actions/loans/loans.action";

export class LinkSettlementAccount extends React.Component {
    constructor(props) {
        super(props);
       // this.clientEncodedKey = this.props.match.params.id;
        this.state={
        }
       
    }



    componentDidMount() {
        // this.loadInitialCustomerData();
    }

 


    render() {

        
        let changeLoanStateRequest = this.props.changeLoanStateReducer;
        let getAClientLoanAccountRequest = this.props.getAClientLoanAccountReducer;
       
       let allSavings = this.props.savingsWallets.request_data.response.data.result,
            savingsAccountList = [];

            console.log("LinkSettlementAccount props", allSavings, this.props.loanDetails)

            allSavings.map((eachItem)=>{
                if(this.props.loanDetails.currencyCode===eachItem.currencyCode){
                    savingsAccountList.push({
                        label: `${eachItem.depositAccountName} - ${eachItem.accountNumber}`,
                        value: eachItem.encodedKey
                    })
                }
            })


        let changeLoanStateValidationSchema = Yup.object().shape({

            feeToPay: Yup.string()
                .required('Required'),


        });

        

        return (
            <Modal backdrop="static" show={this.props.showLinkSettlementModal} onHide={this.props.closeModal} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={false}>
                <Formik
                    initialValues={{
                        
                    }}

                    validationSchema={changeLoanStateValidationSchema}
                    onSubmit={(values, { resetForm }) => {

                        let changeLoanStatePayload = {
                            loanAccountEncodedKey: this.props.loanEncodedKey,
                        }
                       
                       


                       
                            // this.props.handleNewLoanState(changeLoanStatePayload, this.props.newStateUpdate)
                            //     .then(
                            //         () => {

                            //             if (this.props.changeLoanStateReducer.request_status === loanAndDepositsConstants.CHANGE_LOANSTATE_SUCCESS) {
                            //                 resetForm();
                            //                 // value = {null}

                            //                 setTimeout(() => {
                                                
                            //                     this.props.getCustomerLoanAccountDetails(this.props.loanEncodedKey);
                            //                 }, 3000);
                            //             }

                            //         }
                            //     )
                        

                    }}
                >


                    {({ handleSubmit,
                        handleChange,
                        values,
                        setFieldValue,
                        setFieldTouched,
                        touched,
                        errors, }) => (
                        <Form
                            noValidate
                            onSubmit={handleSubmit}
                            className="">
                            <Modal.Header>
                                <Modal.Title>
                                    {/* {newState !== "repayloan" ? "Change Loan State" : "Apply A Repayment"} */}
                                Set Settlement Account
                            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>




                                   
                                            <Form.Group className="mb-20">
                                                <Form.Label className="block-level mb-10">Loan Account</Form.Label>
                                                <Form.Label className="block-level bolden">{this.props.loanDetails.accountNumber}</Form.Label>

                                                {/* <div>
                                                    <Select
                                                        options={allFees}
                                                        onChange={(selected) => {
                                                            setFieldValue('feeToPay', selected.value)
                                                        }}
                                                        onBlur={() => setFieldTouched('feeToPay', true)}
                                                        className={errors.feeToPay && touched.feeToPay ? "is-invalid" : ""}
                                                        name="feeToPay"
                                                    />
                                                    {errors.feeToPay || (errors.feeToPay && touched.feeToPay) ? (
                                                        <span className="invalid-feedback">{errors.feeToPay}</span>
                                                    ) : null}
                                                </div> */}


                                            </Form.Group>

                                            <Form.Group className="mb-0">
                                                <Form.Label className="block-level">Settlment Account</Form.Label>
                                                <Form.Label className="block-level bolden mb-10">{this.props.loanDetails.linkedSettlementProductAccountNumber || "No account linked"}</Form.Label>
                                                <div>
                                                    <Form.Label className="block-level">Link Account</Form.Label>
                                                    <Select
                                                        options={savingsAccountList}
                                                        onChange={(selected) => {
                                                            setFieldValue('accountToLink', selected.value)
                                                        }}
                                                        onBlur={() => setFieldTouched('accountToLink', true)}
                                                        className={errors.accountToLink && touched.accountToLink ? "is-invalid" : ""}
                                                        name="accountToLink"
                                                    />
                                                    {errors.accountToLink || (errors.accountToLink && touched.accountToLink) ? (
                                                        <span className="invalid-feedback">{errors.accountToLink}</span>
                                                    ) : null}
                                                </div>
                                                {/* <div>
                                                    <Select
                                                        options={allFees}
                                                        onChange={(selected) => {
                                                            setFieldValue('feeToPay', selected.value)
                                                        }}
                                                        onBlur={() => setFieldTouched('feeToPay', true)}
                                                        className={errors.feeToPay && touched.feeToPay ? "is-invalid" : ""}
                                                        name="feeToPay"
                                                    />
                                                    {errors.feeToPay || (errors.feeToPay && touched.feeToPay) ? (
                                                        <span className="invalid-feedback">{errors.feeToPay}</span>
                                                    ) : null}
                                                </div> */}


                                            </Form.Group>
                                  
                            
                                </div>
                                {/*  } */}
                            </Modal.Body>
                            <Modal.Footer>

                                <Button variant="light" onClick={this.props.closeModal}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="success"
                                    type="submit"
                                    disabled={changeLoanStateRequest.is_request_processing}
                                >
                                    {changeLoanStateRequest.is_request_processing ? "Please wait..." : `Save Changes`}

                                </Button>

                            </Modal.Footer>
                            <div className="footer-alert">
                                {changeLoanStateRequest.request_status === loanAndDepositsConstants.CHANGE_LOANSTATE_SUCCESS &&
                                    <Alert variant="success" className="w-65 mlr-auto">
                                        {changeLoanStateRequest.request_data.response.data.message}
                                    </Alert>
                                }
                                {(changeLoanStateRequest.request_status === loanAndDepositsConstants.CHANGE_LOANSTATE_FAILURE && changeLoanStateRequest.request_data.error) &&
                                    <Alert variant="danger" className="w-65 mlr-auto">
                                        {changeLoanStateRequest.request_data.error}
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
        
        
        getAClientLoanAccountScheduleReducer: state.loansReducers.getAClientLoanAccountScheduleReducer,
        
        changeLoanStateReducer: state.loansReducers.changeLoanStateReducer,
        
        
    };
}

export default connect(mapStateToProps)(LinkSettlementAccount);