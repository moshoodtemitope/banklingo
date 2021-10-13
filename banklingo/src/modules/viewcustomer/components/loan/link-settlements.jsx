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
import {
    DepositStateConstants,
  } from "../../../../redux/actions/clients/client-states-constants";

import { loanAndDepositsConstants } from "../../../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants";


export class LinkSettlementAccount extends React.Component {
    constructor(props) {
        super(props);
       // this.clientEncodedKey = this.props.match.params.id;
        this.state={
            settleAction:"linksettlement"
        }
       
        console.log("detailssss", this.props.loanDetails);
    }



    componentDidMount() {
        // this.loadInitialCustomerData();
    }
    closeModal = ()=>{
        if(this.props.changeLoanStateReducer.request_status === loanAndDepositsConstants.CHANGE_LOANSTATE_SUCCESS){
            this.props.getCustomerLoanAccountDetails(this.props.loanEncodedKey)
            this.props.closeModal()
        }else{
            this.props.closeModal()
        }
    }
    

    settlementAction = ()=>{
        let payload, {settleAction, selectedAccount} = this.state;
        
        if(settleAction==="linksettlement"){
            if(selectedAccount){
                this.setState({errorMessage: ""})
                payload = {
                    loanAccountEncodedKey: this.props.loanDetails.encodedKey,
                    depositAccountEncodedKey: selectedAccount.value
                }
                console.log("payload is ", payload);
                this.props.handleNewLoanState(payload, settleAction)
                        .then(()=>{
                            // if(this.props.changeLoanStateReducer.request_status === loanAndDepositsConstants.CHANGE_LOANSTATE_SUCCESS){
                            //     this.props.getCustomerLoanAccountDetails(this.props.loanEncodedKey)
                            //     this.props.closeModal()
                            // }
                        })
            }else{
                this.setState({errorMessage: "Selected an account"})
            }
        }
        if(settleAction==="unlinksettlement"){
            this.setState({errorMessage: ""})
            payload = {
                loanAccountEncodedKey: this.props.loanDetails.encodedKey,
                clientEncodedKey: this.props.loanDetails.clientKey
            }
            console.log("payload is ", payload);
            this.props.handleNewLoanState(payload, settleAction)
                        .then(()=>{
                            // if(this.props.changeLoanStateReducer.request_status === loanAndDepositsConstants.CHANGE_LOANSTATE_SUCCESS){
                            //     this.props.getCustomerLoanAccountDetails(this.props.loanEncodedKey)
                            //     this.props.closeModal()
                            // }
                        })
        }
        
    }
 


    render() {

        
        let changeLoanStateRequest = this.props.changeLoanStateReducer;
        let {settleAction, errorMessage} = this.state;
       
       let allSavings = this.props.savingsWallets.request_data.response.data.result,
            savingsAccountList = [];

            // console.log("LinkSettlementAccount props", allSavings, this.props.loanDetails);

            allSavings.map((eachItem)=>{
                if(this.props.loanDetails.currencyCode===eachItem.currencyCode 
                    && eachItem.accountNumber!==this.props.loanDetails.linkedSettlementProductAccountNumber
                    && (eachItem.accountState===DepositStateConstants.Approved
                        ||eachItem.accountState===DepositStateConstants.Pending_Approval
                        ||eachItem.accountState===DepositStateConstants.ACTIVE)){
                    savingsAccountList.push({
                        label: `${eachItem.depositAccountName} - ${eachItem.accountNumber}`,
                        value: eachItem.encodedKey
                    })
                }
            })



        

        return (
            <Modal backdrop="static" show={this.props.showLinkSettlementModal} onHide={this.closeModal} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={false}>
                <Form
                >
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
                            </Form.Group>

                            <Form.Group className="mb-0">
                                <Form.Label className="block-level">Settlment Account</Form.Label>
                                <Form.Label className="block-level bolden mb-10">
                                    {this.props.loanDetails.linkedSettlementProductAccountNumber || "No account linked"}
                                    {this.props.loanDetails.linkedSettlementProductAccountNumber 
                                        && 
                                        <span className="unlink-cta" onClick={()=>{
                                            this.setState({ settleAction:"unlinksettlement", errorMessage: ""})
                                        }}>Unlink account</span>
                                    }
                                </Form.Label>
                                <div>
                                    <Form.Label className="block-level">
                                        {this.props.loanDetails.linkedSettlementProductAccountNumber ? "Link another account" : "Link an account"}
                                    </Form.Label>
                                    <Select
                                        options={savingsAccountList}
                                        onChange={(selectedAccount) => {
                                            this.setState({ selectedAccount, settleAction:"linksettlement", errorMessage: ""})
                                        }}
                                        // onBlur={(selectedAccount) => this.setState({ selectedAccount })}
                                        name="accountToLink"
                                    />
                                </div>



                            </Form.Group>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="light" onClick={this.closeModal}>
                            Close
                        </Button>
                        {changeLoanStateRequest.request_status !== loanAndDepositsConstants.CHANGE_LOANSTATE_SUCCESS &&
                            <Button
                                variant="success"
                                type="button"
                                onClick={this.settlementAction}
                                disabled={changeLoanStateRequest.is_request_processing}
                            >
                                {
                                    settleAction === "linksettlement"
                                        ?
                                        changeLoanStateRequest.is_request_processing ? "Please wait..." : `Save Changes`
                                        : ""
                                }
                                {
                                    settleAction === "unlinksettlement"
                                        ?
                                        changeLoanStateRequest.is_request_processing ? "Please wait..." : `Confirm Account Unlink`
                                        : ""
                                }

                                {/* {(changeLoanStateRequest.is_request_processing && settleAction==="linksettlement") ? "Please wait..." : `Save Changes`}
                            {changeLoanStateRequest.is_request_processing && settleAction==="unlinksettlement" ? "Please wait..." : `Confirm Account Unlink`} */}

                            </Button>
                        }

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

                        {errorMessage &&
                            <Alert variant="danger" className="w-65 mlr-auto">
                                {errorMessage}
                            </Alert>
                        }

                    </div>
                </Form>
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