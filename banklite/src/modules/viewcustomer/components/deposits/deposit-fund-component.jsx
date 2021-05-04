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
import { Formik } from 'formik';
// import  TableComponent from '../../../shared/elements/table'
import "../../customerprofile.scss"; 

import { numberWithCommas, getDateFromISO} from '../../../../shared/utils';
import { administrationConstants } from "../../../../redux/actiontypes/administration/administration.constants";
import { loanAndDepositsConstants } from "../../../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants";
import { loanActions } from "../../../../redux/actions/loans/loans.action";

import {default as DatePickerFilter} from "react-datepicker";
import { depositActions } from "../../../../redux/actions/deposits/deposits.action";

export class MakeAccountDepositModal extends React.Component {
    constructor(props) {
        super(props);
       // this.clientEncodedKey = this.props.match.params.id;
        this.state={
           // showModal:false,
        }
        
    }


    componentDidMount() {
        // this.loadInitialCustomerData();
    }


  render ()
  {
    // const {
    //         selectOtherCustomerAccount,
    //         ctaText,
    //         newStateHeading,
    //         // newStateUpdate
    //     } = this.state;

            let newStateUpdate=this.props.newStateUpdate;


    let  changeDepositStateRequest = this.props.changeDepositStateReducer,
        getAClientDepositAccountRequest = this.props.getAClientDepositAccountReducer.request_data.response.data;

    let   customerLoanAccounts = this.props.getClientLoansReducer.request_data.response.data;
    let   customerDepositAccounts = this.props.getClientDepositsReducer.request_data.response.data;
    let   searchForAccountsWithCustomerKeyRequest =  this.props.searchForAccountsWithCustomerKeyReducer;
    let adminGetTransactionChannelsRequest = this.props.adminGetTransactionChannels,
        allChannels =[],
        allAccountOfCurrentCustomer =[],
        channelsList;

    let searchAccountNumberRequest = this.props.searchAccountNumbersReducer;
        if(customerLoanAccounts.result!==null){
            customerLoanAccounts.result.map((eachLoanAccount,  index)=>{
                if(eachLoanAccount.loanState ===5 || eachLoanAccount.loanState ===6){
                    allAccountOfCurrentCustomer.push({label: `${eachLoanAccount.productName} - ${eachLoanAccount.accountNumber}`, value:eachLoanAccount.encodedKey});
                }
            })
        }

        if(customerDepositAccounts.result!==null){
            customerDepositAccounts.result.map((eachDepositAccount,  index)=>{
                if((eachDepositAccount.accountState ===3 || eachDepositAccount.accountState ===5) && eachDepositAccount.accountNumber !==getAClientDepositAccountRequest.accountNumber ){
                    allAccountOfCurrentCustomer.push({label: `${eachDepositAccount.productName} - ${eachDepositAccount.accountNumber}`, value:eachDepositAccount.encodedKey});
                }
            })
        }


    if(adminGetTransactionChannelsRequest.request_status=== administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS
        && adminGetTransactionChannelsRequest.request_data.response.data.result.length>=1){
            channelsList = adminGetTransactionChannelsRequest.request_data.response.data.result;

            channelsList.map((channel, id)=>{
                allChannels.push({label: channel.name, value:channel.encodedKey});
            })
    }

    // let changeDepositStateValidationSchema;
    // if(showDepositFundsForm!==true){
    //     changeDepositStateValidationSchema = Yup.object().shape({
    //         comment:  Yup.string()
    //             .min(2, 'Valid comments required'),
    //         notes:  Yup.string()
    //             .min(2, 'Valid notes required'),

    //     });
    // }

    // if(newStateUpdate==="beginmaturity"){
    //     changeDepositStateValidationSchema = Yup.object().shape({
    //         notes:  Yup.string()
    //             .min(2, 'Valid notes required'),
    //         maturityDate:  Yup.string()
    //             .required('Required'),

    //     });
    // }

    // if(showDepositFundsForm===true){
     let   changeDepositStateValidationSchema = Yup.object().shape({
                notes:  Yup.string()
                    .min(2, 'Valid notes required'),
                depositChannelEncodedKey:  Yup.string()
                    .required('Required'),
                amountToDeposit:  Yup.string()
                    .required('Required'),
                backDateChosen:  Yup.string()
                    .when('allowBackDate',{
                        is:(value)=>value===true,
                        then: Yup.string()
                            .required('Required')
                    }),
                bookingDateChosen:  Yup.string()
                    .when('showBookingDate',{
                        is:(value)=>value===true,
                        then: Yup.string()
                            .required('Required')
                    }),

        });
    // }

    // if(newStateUpdate === "makewithdrawal"){
    //     changeDepositStateValidationSchema = Yup.object().shape({
    //             notes:  Yup.string()
    //                 .min(2, 'Valid notes required'),
    //             depositChannelEncodedKey:  Yup.string()
    //                 .required('Required'),
    //             amountToWithdraw:  Yup.string()
    //                 .required('Required'),
    //             backDateChosen:  Yup.string()
    //                 .when('allowBackDate',{
    //                     is:(value)=>value===true,
    //                     then: Yup.string()
    //                         .required('Required')
    //                 }),

    //     });
    // }

    // if(newStateUpdate==="setmaximumwithdrawalamount" || newStateUpdate==="setrecommendeddepositamount"){
    //     changeDepositStateValidationSchema = Yup.object().shape({
    //             notes:  Yup.string()
    //                 .min(2, 'Valid notes required'),
    //             amountToDeposit:  Yup.string()
    //                 .required('Required'),

    //     });
    // }

    // if(newStateUpdate === "transfer"){
    //     if(typeOfTransfer ==="currentcustomer"){
    //         changeDepositStateValidationSchema = Yup.object().shape({
    //                 notes:  Yup.string()
    //                     .min(2, 'Valid notes required'),
    //                 currentCustomerChosenAccount:  Yup.string()
    //                     .required('Required'),
    //                 amountToTransfer:  Yup.string()
    //                     .required('Required'),

    //         });
    //     }
    //     if(typeOfTransfer ==="anothercustomer"){
    //         changeDepositStateValidationSchema = Yup.object().shape({
    //                 notes:  Yup.string()
    //                     .min(2, 'Valid notes required'),
    //                 chosenAccountNum:  Yup.string()
    //                     .required('Required'),
    //                 // chosenCustomerEncodedKey:  Yup.string()
    //                 //     .required('Required'),
    //                 amountToTransfer:  Yup.string()
    //                     .required('Required'),

    //         });
    //     }
    // }

    return(
        <Modal  backdrop="static"  show={this.props.showModal} onHide={this.props.handleHideModal} size="lg" centered="true" dialogClassName= "modal-50w withcentered-heading"  animation={false}>
            <Formik
                initialValues={{
                    comment:"",
                    allowBackDate:false,
                    showBookingDate:false,
                    depositChannelEncodedKey:"",
                    backDateChosen:"",
                    bookingDateChosen:"",
                    notes:"",
                    amountToDeposit:"",
                    amountToTransfer:""
                }}
                validationSchema={changeDepositStateValidationSchema}
                onSubmit={(values, { resetForm }) => {

                   
                      let  changeDepositStatePayload = {
                            accountEncodedKey: this.props.depositEncodedKey,
                            notes:values.notes,
                            amount: parseFloat(values.amountToDeposit.replace(/,/g, '')),
                            channelEncodedKey:values.depositChannelEncodedKey,
                            isBackDated:values.allowBackDate,
                            backDateValueDate: values.backDateChosen!==""? values.backDateChosen.toISOString():null,
                            isBookingDate: values.showBookingDate,
                            bookingDate: values.bookingDateChosen!==""? values.bookingDateChosen.toISOString() : null,
                        }
                   

                    this.props.handleNewDepositState(changeDepositStatePayload,newStateUpdate )
                        .then(
                            () => {

                                if (this.props.changeDepositStateReducer.request_status === loanAndDepositsConstants.CHANGE_DEPOSITSTATE_SUCCESS) {
                                    resetForm();
                                    // value = {null}

                                    setTimeout(() => {
                                        this.props.dispatch(depositActions.changeDepositState("CLEAR"))
                                        this.props.handleHideModal();
                                        this.props.getCustomerDepositAccountDetails(this.props.depositEncodedKey);
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
                                <Modal.Title>{"Deposit Fund"}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                    <div>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Amount {this.props.CurCode? `(${this.props.CurCode})`: ""} </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    autoComplete="off"
                                                    onChange={handleChange}
                                                    value={numberWithCommas(values.amountToDeposit)}
                                                    className={errors.amountToDeposit && touched.amountToDeposit ? "is-invalid h-38px" : "h-38px"}
                                                    name="amountToDeposit" required />
                                                {errors.amountToDeposit && touched.amountToDeposit ? (
                                                    <span className="invalid-feedback">{errors.amountToDeposit}</span>
                                                ) : null}
                                            </Col>
                                            <Col>
                                                <Form.Group className="mb-0">
                                                    <Form.Label className="block-level">Transaction Channel</Form.Label>
                                                    {allChannels.length >=1 &&
                                                        <div>
                                                            <Select
                                                                options={allChannels}

                                                                onChange={(selected) => {
                                                                    setFieldValue('depositChannelEncodedKey', selected.value)
                                                                }}
                                                                onBlur={()=> setFieldTouched('depositChannelEncodedKey', true)}
                                                                className={errors.depositChannelEncodedKey && touched.depositChannelEncodedKey ? "is-invalid" : null}
                                                                name="depositChannelEncodedKey"
                                                            />
                                                            {errors.depositChannelEncodedKey || (errors.depositChannelEncodedKey && touched.depositChannelEncodedKey) ? (
                                                                <span className="invalid-feedback">{errors.depositChannelEncodedKey}</span>
                                                            ) : null}
                                                        </div>
                                                    }
                                                    {adminGetTransactionChannelsRequest.request_status=== administrationConstants.GET_TRANSACTION_CHANNELS_FAILURE &&
                                                        <div className="errormsg"> Unable to load Disbursment channels</div>
                                                    }


                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                        <Form.Row className="mb-10">
                                            <Col className="date-wrap">
                                                <Form.Group className="table-helper m-b-5">
                                                    <input type="checkbox"
                                                    name="allowBackDate"
                                                    onChange={handleChange}
                                                    checked={values.allowBackDate? values.allowBackDate:null}
                                                    value={values.allowBackDate}
                                                    id="allowBackDate"/>
                                                    <label htmlFor="allowBackDate">Backdate</label>
                                                </Form.Group>
                                                {values.allowBackDate===true &&
                                                    <Form.Group className="mb-0 date-wrap">
                                                         <DatePickerFilter
                                                         placeholderText="Choose  date"
                                                        autoComplete="new-password"
                                                            dateFormat={window.dateformat}
                                                            className="form-control form-control-sm"
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            name="backDateChosen"
                                                            value={values.backDateChosen}
                                                            onChange={setFieldValue}
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            maxDate={new Date()}
                                                            className={errors.backDateChosen && touched.backDateChosen ? "is-invalid form-control form-control-sm h-38px" : "form-control h-38px form-control-sm"}
                                                        />
                                                        {errors.backDateChosen && touched.backDateChosen ? (
                                                            <span className="invalid-feedback">{errors.backDateChosen}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                }
                                            </Col>
                                            <Col className="date-wrap">
                                                <Form.Group className="table-helper m-b-5">
                                                    <input type="checkbox"
                                                    name="showBookingDate"
                                                    onChange={handleChange}
                                                    checked={values.showBookingDate? values.showBookingDate:null}
                                                    value={values.showBookingDate}
                                                    id="showBookingDate"/>
                                                    <label htmlFor="showBookingDate">Booking Date</label>
                                                </Form.Group>
                                                {values.showBookingDate===true &&
                                                    <Form.Group className="mb-0 date-wrap">
                                                         <DatePickerFilter
                                                         placeholderText="Choose  date"
                                                        autoComplete="new-password"
                                                            dateFormat={window.dateformat}
                                                            className="form-control form-control-sm"
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            name="bookingDateChosen"
                                                            value={values.bookingDateChosen}
                                                            onChange={setFieldValue}
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            maxDate={new Date()}
                                                            className={errors.bookingDateChosen && touched.bookingDateChosen ? "is-invalid form-control form-control-sm h-38px" : "form-control form-control-sm h-38px"}
                                                        />
                                                        {errors.bookingDateChosen && touched.bookingDateChosen ? (
                                                            <span className="invalid-feedback">{errors.bookingDateChosen}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                }
                                            </Col>
                                        </Form.Row>


                                    </div>
                              
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
                                {/* } */}
                                


                            </Modal.Body>
                            <Modal.Footer>

                                <Button variant="light" onClick={this.props.handleHideModal}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="success"
                                    type="submit"
                                    disabled={changeDepositStateRequest.is_request_processing}>
                                    {changeDepositStateRequest.is_request_processing?"Please wait...":`${"Deposit"}`}

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
        adminGetTransactionChannels : state.administrationReducers.adminGetTransactionChannelsReducer,
        getAClientReducer: state.clientsReducers.getAClientReducer,
        getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        getClientLoansReducer: state.loansReducers.getClientLoansReducer,
        getAClientDepositAccountReducer: state.depositsReducers.getAClientDepositAccountReducer,
        getADepositAccountActivitiesReducer: state.depositsReducers.getADepositAccountActivitiesReducer,
        getADepositAccountCommunicationsReducer: state.depositsReducers.getADepositAccountCommunicationsReducer,
        getAccountDepositTransactionReducer: state.depositsReducers.getAccountDepositTransactionReducer,
        getAClientDepositAccountCommentsReducer: state.depositsReducers.getAClientDepositAccountCommentsReducer,
        createADepositCommentReducer: state.depositsReducers.createADepositCommentReducer,
        getADepositAccountAttachmentsReducer: state.depositsReducers.getADepositAccountAttachmentsReducer,
        createADepositAttachmentReducer: state.depositsReducers.createADepositAttachmentReducer,
        changeDepositStateReducer: state.depositsReducers.changeDepositStateReducer,
        searchAccountNumbersReducer: state.depositsReducers.searchAccountNumbersReducer,
        searchCustomerAccountReducer: state.depositsReducers.searchCustomerAccountReducer,
        searchForAccountsWithCustomerKeyReducer: state.depositsReducers.searchForAccountsWithCustomerKeyReducer,
    };
}

export default connect(mapStateToProps)(MakeAccountDepositModal);