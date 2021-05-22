import * as React from "react";
// import {Router} from "react-router";


import { connect } from 'react-redux';
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Select from 'react-select';
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import * as Yup from 'yup';
import "react-datepicker/dist/react-datepicker.css";
import Alert from 'react-bootstrap/Alert'

import DatePicker from '../../../../_helpers/datepickerfield'
import { Formik } from 'formik';
import  TableComponent from '../../../../shared/elements/table'
import "../../customerprofile.scss"; 

import { numberWithCommas, getDateFromISO} from '../../../../shared/utils';
import { administrationConstants } from "../../../../redux/actiontypes/administration/administration.constants";
import { loanAndDepositsConstants } from "../../../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants";
import { loanActions } from "../../../../redux/actions/loans/loans.action";

export class ApplyFeeModal extends React.Component {
    constructor(props) {
        super(props);
       // this.clientEncodedKey = this.props.match.params.id;
        this.state={
           // showModal:false,
           isScheduleUpdate:false
        }
        this.scheduleFeeApplicationModels = [];
        this.totalFeeUpdated = 0;
    }



    componentDidMount() {
        // this.loadInitialCustomerData();
    }

    updateFeeModels = (scheduleInfo)=>{
        let existingItem = this.scheduleFeeApplicationModels.filter(eachItem=>eachItem.scheduleId!==scheduleInfo.id);
        this.scheduleFeeApplicationModels = existingItem;
        this.scheduleFeeApplicationModels.push({
            scheduleId: scheduleInfo.id,
            feeAmount: scheduleInfo.feeAmount
        })
        
    }

//payOffALoanRequest,adminGetTransactionChannelsRequest
    renderLoanSchedule = () => {
        // this.getCustomerLoanSchedule();
        let getAClientLoanAccountScheduleRequest = this.props
            .getAClientLoanAccountScheduleReducer;

        let saveRequestData =
            getAClientLoanAccountScheduleRequest.request_data !== undefined
                ? getAClientLoanAccountScheduleRequest.request_data.tempData
                : null;
        if (
            getAClientLoanAccountScheduleRequest.request_status ===
            loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_PENDING
        ) {
            
            return (
                <div className="loading-content">
                    <div className="loading-text">Please wait... </div>

                    <TableComponent classnames="striped bordered hover">
                        <thead>
                            <tr>
                                <th>Due</th>
                                <th>Principal</th>
                                <th>Fee</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </TableComponent>
                </div>
            );
             
        }

        if (
            getAClientLoanAccountScheduleRequest.request_status ===
            loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_SUCCESS
        ) {
            let getAClientLoanAccountScheduleInfo =
                getAClientLoanAccountScheduleRequest.request_data.response.data;
            let getAClientLoanAccountScheduleData =
                getAClientLoanAccountScheduleRequest.request_data.response.data.result;

            // if(getAClientLoanAccountScheduleInfo.length>=1){
            if (
                getAClientLoanAccountScheduleInfo !== null &&
                getAClientLoanAccountScheduleInfo.loanScheduleModels.length >= 1
            ) {
                return (
                    <div>
                       
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>Due</th>
                                    <th>Principal</th>
                                    <th>Fee</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getAClientLoanAccountScheduleInfo.loanScheduleModels.map(
                                    (eachSchedule, index) => {
                                        
                                        let scheduleInfo = {
                                            id : eachSchedule.id,
                                            feeAmount: eachSchedule.loanScheduleExpected.expectedFees
                                        }

                                        if(!this.state.isScheduleUpdate && (eachSchedule.state===1 || eachSchedule.state===2)){
                                        // if(eachSchedule.state===4){
                                            this.updateFeeModels(scheduleInfo)
                                        }
                                        
                                        return (
                                            <tr key={index}>
                                               
                                                <td>
                                                    {eachSchedule.installmentDate !== null &&
                                                        eachSchedule.installmentDate !== ""
                                                        ? getDateFromISO(eachSchedule.installmentDate)
                                                        : "-"}
                                                </td>
                                              
                                               
                                                <td>
                                                    {eachSchedule.loanScheduleExpected.expectedPrincipal !==
                                                        null &&
                                                        eachSchedule.loanScheduleExpected.expectedPrincipal > 0
                                                        ? `${numberWithCommas(
                                                            eachSchedule.loanScheduleExpected.expectedPrincipal,
                                                            true
                                                        )}`
                                                        : "-"}
                                                </td>
                                                <td>
                                                    {/* {(eachSchedule.state===4) && */}
                                                    {(eachSchedule.state===1 || eachSchedule.state===2) &&

                                                        <Form.Control
                                                            type="text"
                                                            autoComplete="off"
                                                            onChange={(e)=>{
                                                                this.setState({isScheduleUpdate: true})
                                                                e.target.value = numberWithCommas(e.target.value)
                                                                this.updateFeeModels({
                                                                    id : eachSchedule.id,
                                                                    feeAmount:  parseFloat(e.target.value.replace(/,/g, ''))
                                                                })
                                                            }}
                                                            defaultValue={(eachSchedule.loanScheduleExpected.expectedFees && eachSchedule.loanScheduleExpected.expectedFees>0) ? eachSchedule.loanScheduleExpected.expectedFees : ""}
                                                            // value={numberWithCommas(values.feeAmount)}
                                                            className= "h-38px"
                                                            // className={errors.feeAmount && touched.feeAmount ? "is-invalid h-38px" : "h-38px"}
                                                            name="feeAmount" 
                                                            required />
                                                       
                                                    }

                                                    {(eachSchedule.state!==1 && eachSchedule.state!==2) &&
                                                        <Form.Control
                                                            type="text"
                                                            autoComplete="off"
                                                            disabled={true}
                                                            onChange={(e)=>{
                                                                
                                                                e.target.value = numberWithCommas(eachSchedule.loanScheduleExpected.expectedFees, true)
                                                            }}
                                                            defaultValue={(eachSchedule.loanScheduleExpected.expectedFees || eachSchedule.loanScheduleExpected.expectedFees===0) ? numberWithCommas(eachSchedule.loanScheduleExpected.expectedFees, true) : ""}
                                                            // value={numberWithCommas(values.feeAmount)}
                                                            className= "h-38px"
                                                            // className={errors.feeAmount && touched.feeAmount ? "is-invalid h-38px" : "h-38px"}
                                                            name="feeAmount" 
                                                            required />
                                                    }

                                                </td>
                                                

                                            </tr>
                                        );
                                    }
                                )}

                            </tbody>
                        </TableComponent>
                    </div>
                );
            } else {
                return (
                    <div>
                        
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>Due</th>
                                    <th>Principal</th>
                                    <th>Fee</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </TableComponent>
                    </div>
                );
            }
        }

        if (
            getAClientLoanAccountScheduleRequest.request_status ===
            loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_FAILURE
        ) {
            return (
                <div className="loading-content errormsg">
                    <div>{getAClientLoanAccountScheduleRequest.request_data.error}</div>
                </div>
            );
        }
    };

    render() {

        const { changeLoanState, ctaText, newStateUpdate, showDisburseLoanForm } = this.state;
        let changeLoanStateRequest = this.props.changeLoanStateReducer;
        let getAClientLoanAccountRequest = this.props.getAClientLoanAccountReducer,
            adminGetTransactionChannelsRequest = this.props.adminGetTransactionChannels,
            allFees = [],
            whenFeeIsDue = [],
            channelsList;
        // this.props.dispatch(loanActions.changeLoanState("CLEAR"));

        // if (adminGetTransactionChannelsRequest.request_status === administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS
        //     && adminGetTransactionChannelsRequest.request_data.response.data.result.length >= 1) {
        //     channelsList = adminGetTransactionChannelsRequest.request_data.response.data.result;

        //     channelsList.map((channel) => {
        //         allChannels.push({ label: channel.name, value: channel.encodedKey });
        //     })
        // }
        allFees = [
            {
                label: "Accrued Interest",
                value: 0
            },
            {
                label: "Delayed Repayment",
                value: 1
            }
        ]
        whenFeeIsDue = [
            {
                label: "Next Repayment",
                value: 0
            },
            {
                label: "Last Repayment",
                value: 1
            },
            {
                label: "Other",
                value: 2
            }
        ]





        let changeLoanStateValidationSchema = Yup.object().shape({

            feeToPay: Yup.string()
                .required('Required'),
            feeAmount: Yup.string()
                .required('Required'),
            feeDue: Yup.string()
                .required('Required'),


        });


        return (
            <Modal backdrop="static" show={this.props.showApplyFeeModal} onHide={this.props.closeModal} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={false}>
                <Formik
                    initialValues={{
                        feeToPay: "",
                        feeDue: "",
                        notes: "",
                        feeAmount: ""
                    }}

                    validationSchema={changeLoanStateValidationSchema}
                    onSubmit={(values, { resetForm }) => {

                        let changeLoanStatePayload = {
                            loanAccountEncodedKey: this.props.loanEncodedKey,
                            notes: values.notes,
                            feeAmount: parseFloat(values.feeAmount.replace(/,/g, '')),
                            feeApplicationSchedule: values.feeDue,
                            scheduleFeeApplicationModels: this.scheduleFeeApplicationModels.length>=1?this.scheduleFeeApplicationModels: null
                            
                        }
                        this.totalFeeUpdated = 0;
                        this.scheduleFeeApplicationModels.map(eachFee=>{
                            this.totalFeeUpdated  += eachFee.feeAmount
                        })

                        console.log("here now", this.totalFeeUpdated)
                        
                        if(this.totalFeeUpdated > 0){
                            this.setState({
                                totalFeeError: changeLoanStatePayload.feeAmount !== this.totalFeeUpdated
                            })
                        }else{
                            this.totalFeeUpdated =parseFloat(values.feeAmount.replace(/,/g, ''))
                        }

                       


                        if(changeLoanStatePayload.feeAmount === this.totalFeeUpdated){
                            this.props.handleNewLoanState(changeLoanStatePayload, this.props.newStateUpdate)
                                .then(
                                    () => {

                                        if (this.props.changeLoanStateReducer.request_status === loanAndDepositsConstants.CHANGE_LOANSTATE_SUCCESS) {
                                            resetForm();
                                            // value = {null}

                                            setTimeout(() => {
                                                // this.props.dispatch(loanActions.changeLoanState("CLEAR"))
                                                // this.props.closeModal();
                                                this.props.getCustomerLoanAccountDetails(this.props.loanEncodedKey);
                                            }, 3000);
                                        }

                                        



                                    }
                                )
                        }

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
                                Apply Fee
                            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>




                                    <Form.Row className="mb-10">
                                        <Col>
                                            <Form.Group className="mb-0">
                                                <Form.Label className="block-level mb-10">Fee</Form.Label>

                                                <div>
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
                                                </div>


                                            </Form.Group>
                                        </Col>
                                        <Col className="date-wrap">
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">Fee Amount ({getAClientLoanAccountRequest.request_data.response.data.currencyCode})</Form.Label>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                onChange={handleChange}
                                                value={numberWithCommas(values.feeAmount)}
                                                className={errors.feeAmount && touched.feeAmount ? "is-invalid h-38px" : "h-38px"}
                                                name="feeAmount" required />
                                            {errors.feeAmount && touched.feeAmount ? (
                                                <span className="invalid-feedback">{errors.feeAmount}</span>
                                            ) : null}
                                        </Col>
                                        <Col></Col>
                                    </Form.Row>
                                    <Form.Row className="mb-10">
                                        <Col>
                                            <Form.Group className="mb-0">
                                                <Form.Label className="block-level mb-10">Due On</Form.Label>

                                                <div>
                                                    <Select
                                                        options={whenFeeIsDue}
                                                        onChange={(selected) => {
                                                            setFieldValue('feeDue', selected.value)
                                                            if (selected.value === 2) {
                                                                this.props.fetchSchedules();
                                                            }
                                                        }}
                                                        onBlur={() => setFieldTouched('feeDue', true)}
                                                        className={errors.feeDue && touched.feeDue ? "is-invalid" : ""}
                                                        name="feeDue"
                                                    />
                                                    {errors.feeDue || (errors.feeDue && touched.feeDue) ? (
                                                        <span className="invalid-feedback">{errors.feeDue}</span>
                                                    ) : null}
                                                </div>


                                            </Form.Group>
                                        </Col>
                                        <Col className="">
                                        </Col>
                                    </Form.Row>
                                    {values.feeDue ===2 &&
                                    <div className="schedule-wrap">
                                        {this.renderLoanSchedule()}
                                    </div>
                                    }



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
                                    {changeLoanStateRequest.is_request_processing ? "Please wait..." : `${this.props.ctaText}`}

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
                                { this.state.totalFeeError &&
                                    <Alert variant="danger" className="w-65 mlr-auto">
                                        {`Total Fee must be equal to ${numberWithCommas(values.feeAmount, true)}`}
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
        adminGetTransactionChannels: state.administrationReducers.adminGetTransactionChannelsReducer,
        // getAClientReducer: state.clientsReducers.getAClientReducer,
        // getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        // getClientLoansReducer: state.loansReducers.getClientLoansReducer,
        // getAClientLoanAccountReducer: state.loansReducers.getAClientLoanAccountReducer,
        getAClientLoanAccountScheduleReducer: state.loansReducers.getAClientLoanAccountScheduleReducer,
        // getAccountLoanTransactionReducer: state.loansReducers.getAccountLoanTransactionReducer,
        // getAClientLoanAccountCommentsReducer: state.loansReducers.getAClientLoanAccountCommentsReducer,
        // createALoanCommentReducer: state.loansReducers.createALoanCommentReducer,
        // getALoanAccountActivitiesReducer: state.loansReducers.getALoanAccountActivitiesReducer,
        // getALoanAccountAttachmentsReducer: state.loansReducers.getALoanAccountAttachmentsReducer,
        // createALoanAttachmentReducer: state.loansReducers.createALoanAttachmentReducer,
        // getALoanAccountCommunicationsReducer: state.loansReducers.getALoanAccountCommunicationsReducer,
        changeLoanStateReducer: state.loansReducers.changeLoanStateReducer,
        // writeOffALoanReducer: state.loansReducers.writeOffALoanReducer,       
        payOffALoanReducer: state.loansReducers.payOffALoanReducer,
    };
}

export default connect(mapStateToProps)(ApplyFeeModal);