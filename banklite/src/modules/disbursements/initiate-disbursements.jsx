import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer';
import  TableComponent from '../../shared/elements/table'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import "./disbursements.scss"; 


import { Formik} from 'formik';
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert'
import {numberWithCommas, accountNumber} from '../../shared/utils';
import Accordion from 'react-bootstrap/Accordion'
import Select from 'react-select';
import {disbursementActions} from '../../redux/actions/disbursment/disbursment.action';
import {disbursmentConstants} from '../../redux/actiontypes/disbursment/disbursment.constants'
import {banksList} from '../../shared/banks'
class InitiateDisbursement extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }
    componentDidMount(){
        if(this.props.postDisbursementReducer.request_status!==undefined && this.props.postDisbursementReducer.request_status===disbursmentConstants.POST_DISBURSMENT_EDIT){
            this.props.dispatch(disbursementActions.postDisbursement("EDIT"))
        }else{
            this.props.dispatch(disbursementActions.postDisbursement("CLEAR"))
        }
        // this.props.dispatch(disbursementActions.postDisbursement("CLEAR"))
        this.getDisbursementBanks();
    }

    getDisbursementBanks = ()=>{
        const {dispatch} = this.props;

        dispatch(disbursementActions.getDisbursementBanks());
    }
    

    initiateDisburmentRequest = async (inititationPayload)=>{
        const {dispatch} = this.props;

        await dispatch(disbursementActions.postDisbursement(inititationPayload));
    }
    confirmPostDisbursement = async (confirmationPayload)=>{
        const {dispatch} = this.props;

        await dispatch(disbursementActions.confirmPostDisbursement(confirmationPayload));
    }

    handleBackToEdit = ()=>{
        let postDisbursementRequest = this.props.postDisbursementReducer;
        this.props.dispatch(disbursementActions.postDisbursement("EDIT", postDisbursementRequest.request_data.postPayload));
    }


    renderInitiateDisburment =()=>{
        let postDisbursementRequest = this.props.postDisbursementReducer,
            getDisbursementBanksRequest = this.props.getDisbursementBanksReducer,
            initiateDisburmentValidationSchema = Yup.object().shape({
                bankCode: Yup.string()
                    .min(1, 'Please select a Bank')
                    .required('Please select a Bank'),
                destinationAccount: Yup.string()
                    .min(1, 'Please provide account number')
                    .max(10, 'Max Limit reached')
                    .required('Account number is required'),
                amount: Yup.string()
                    .min(1, 'Please provide amount')
                    .max(9, 'Max limit reached')
                    .required('Amount is required'),
                transactionSource: Yup.string()
                    .min(1, 'Please select source')
                    .required('Transaction source is required'),
                narration: Yup.string()
                    .min(1, 'Please provide narration')
                    .max(20, 'Max Limit reached')
                    .required('Narration is required'),
                sourceAccount: Yup.string()
                    .min(1, 'Please provide a valid source account')
                    .max(10, 'Max Limit reached')
                    .required('Source account is required'),
            }),
            allBanksList=[],
            transactionSourceList = [
                {label: "BankOne" , value:1},
                {label: "Mini-CoreBanking" , value:2}
            ],
            dataToEdit=null,
            destinationBankToEdit=null,
            txtSourceToEdit=null;
            // console.log('banks are', banksList);


            if(postDisbursementRequest.request_status===disbursmentConstants.POST_DISBURSMENT_EDIT){
                
                dataToEdit = postDisbursementRequest.request_data.dataToEdit;
                destinationBankToEdit = getDisbursementBanksRequest.request_data.response.data.filter(bank=>bank.bankCode===dataToEdit.bankCode)[0];
                txtSourceToEdit = transactionSourceList.filter(source=>source.value===dataToEdit.transactionSource)[0];
            }
            
        
            switch (getDisbursementBanksRequest.request_status){
                case (disbursmentConstants.GET_DISBURSMENTS_BANKS_PENDING):
                    return (
                        <div className="loading-content"> 
                            <div className="loading-text">Please wait... </div>
                        </div>
                    )
                    case(disbursmentConstants.GET_DISBURSMENTS_BANKS_SUCCESS):
                        let allbanks = getDisbursementBanksRequest.request_data.response.data;
                        const {selectedBank, selectedTxtSource} = this.state;
                        if(allbanks!==undefined){
                            if(allbanks.length>=1){
                                allbanks.map(eachBank=>{
                                    allBanksList.push({label: eachBank.bankName, value:eachBank.bankCode})
                                })
                                return(
                                    <div>
                                        <Formik
                                            initialValues={{
                                                bankCode: dataToEdit!==null?destinationBankToEdit.bankCode:'',
                                                destinationAccount: dataToEdit!==null?dataToEdit.destinationAccount:'',
                                                amount: dataToEdit!==null?numberWithCommas(dataToEdit.amount, true):'',
                                                transactionSource: dataToEdit!==null?parseInt(txtSourceToEdit.value):'',
                                                narration: dataToEdit!==null?dataToEdit.narration:'',
                                                sourceAccount: dataToEdit!==null?dataToEdit.sourceAccount:'',
                                            }}
                                            validationSchema={initiateDisburmentValidationSchema}
                                            onSubmit={(values, { resetForm }) => {
                                                let initiationPayload = {
                                                        bankCode:values.bankCode,
                                                        destinationAccount:  values.destinationAccount,
                                                        amount: parseFloat(values.amount.replace(/,/g, '')),
                                                        transactionSource:parseInt(values.transactionSource),
                                                        narration: values.narration,
                                                        sourceAccount: values.sourceAccount,
                                                };
                        
                                                // console.log('data', initiationPayload);
                        
                                                this.initiateDisburmentRequest(initiationPayload)
                                                    .then(
                                                        () => {
                                                            // resetForm();
                                                            setTimeout(() => {
                                                                if(this.props.postDisbursementReducer.request_status===disbursmentConstants.POST_DISBURSMENT_SUCCESS){
                                                                    // this.props.dispatch(disbursementActions.postDisbursement("CLEAR"))
                                                                    this.setState({transactionState: true});
                                                                }
                                                               
                                                            }, 3000);
                        
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
                                                        className="form-content w-60 card"
                                                        noValidate
                                                        onSubmit={handleSubmit}
                                                        >
                                                        <Accordion defaultActiveKey="0">
                                                            <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                                Sender Details
                                                            </Accordion.Toggle>
                                                            <Accordion.Collapse eventKey="0">
                                                                <div>
                                                                    <Form.Row>
                        
                                                                        <Col>
                                                                            <Form.Label className="block-level">Transaction Source</Form.Label>
                                                                            {/* <Form.Control
                                                                                type="text"
                                                                                name="transactionSource"
                                                                                onChange={handleChange}
                                                                                value={values.transactionSource}
                                                                                className={errors.transactionSource && touched.transactionSource ? "is-invalid" : null} /> */}
                                                                                {dataToEdit!==null &&
                                                                                    <Select
                                                                                        options={transactionSourceList}
                                                                                        className={errors.transactionSource && touched.transactionSource ? "is-invalid" : null}
                                                                                        // onBlur={handleBlur}
                                                                                        defaultValue ={{label:txtSourceToEdit.label, value: txtSourceToEdit.value}}
                                                                                        // onChange={(selectedTxtSource) => {
                                                                                        //     this.setState({ selectedTxtSource });
                                                                                        //     errors.transactionSource = null
                                                                                        //     touched.transactionSource = true
                                                                                        //     values.transactionSource = selectedTxtSource.value
                                                                                        // }}
                                                                                        
                                                                                        onChange={(selected) => setFieldValue('transactionSource', selected.value)}
                                                                                        onBlur={()=> setFieldTouched('transactionSource', true)}
                                                                                        name="transactionSource"
                                                                                        required
                                                                                    />
                                                                                }

                                                                                {dataToEdit===null &&
                                                                                    <Select
                                                                                        options={transactionSourceList}
                                                                                        className={errors.transactionSource && touched.transactionSource ? "is-invalid" : null}
                                                                                        // onBlur={handleBlur}
                                                                                        // onChange={(selectedTxtSource) => {
                                                                                        //     this.setState({ selectedTxtSource });
                                                                                        //     errors.transactionSource = null
                                                                                        //     touched.transactionSource = true
                                                                                        //     values.transactionSource = selectedTxtSource.value
                                                                                        // }}
                                                                                        onChange={(selected) => setFieldValue('transactionSource', selected.value)}
                                                                                        onBlur={()=> setFieldTouched('transactionSource', true)}
                                                                                        name="transactionSource"
                                                                                        required
                                                                                    />
                                                                                }
                                                                                {/* <Select
                                                                                    options={transactionSourceList}
                                                                                    className={errors.transactionSource && touched.transactionSource ? "is-invalid" : null}
                                                                                    onBlur={handleBlur}
                                                                                    
                                                                                    onChange={(selectedTxtSource) => {
                                                                                        this.setState({ selectedTxtSource });
                                                                                        errors.transactionSource = null
                                                                                        touched.transactionSource = true
                                                                                        values.transactionSource = selectedTxtSource.value
                                                                                    }}
                                                                                    name="transactionSource"
                                                                                    required
                                                                                /> */}
                                                                            {errors.transactionSource && touched.transactionSource ? (
                                                                                <span className="invalid-feedback">{errors.transactionSource}</span>
                                                                            ) : null}
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Source Account</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                name="sourceAccount"
                                                                                onBlur={handleBlur}
                                                                                onChange={handleChange}
                                                                                // onChange={(value)=>{
                                                                                    
                                                                                //     // values.branchId = selectedBranch.value;
                                                                                //     handleChange("sourceAccount")(value);
                                                                                //     errors.sourceAccount = null;
                                                                                // }}
                                                                                // onChange={(value) => setFieldValue('sourceAccount', accountNumber(values.sourceAccount, 15))}
                                                                                // onBlur={()=> setFieldTouched('sourceAccount', true)}
                                                                                value={accountNumber(values.sourceAccount, 10)}
                                                                                className={errors.sourceAccount && touched.sourceAccount ? "is-invalid withcustom" : "withcustom"} />
                        
                                                                            {errors.sourceAccount && touched.sourceAccount ? (
                                                                                <span className="invalid-feedback">{errors.sourceAccount}</span>
                                                                            ) : null}
                                                                        </Col>
                                                                    </Form.Row>
                                                                </div>
                                                            </Accordion.Collapse>
                                                        </Accordion>
                        
                                                        <Accordion defaultActiveKey="0">
                                                            <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                                Recipient Details
                                                            </Accordion.Toggle>
                                                            <Accordion.Collapse eventKey="0">
                                                                <div>
                                                                    <Form.Row>
                                                                        <Col>
                                                                            <Form.Group controlId="bankCode">
                                                                                <Form.Label className="block-level">Destination Bank</Form.Label>
                        
                                                                                {dataToEdit!==null &&
                                                                                    <Select
                                                                                        options={allBanksList}
                                                                                        className={errors.bankCode && touched.bankCode ? "is-invalid" : null}
                                                                                        defaultValue ={{label:destinationBankToEdit.bankName, value: destinationBankToEdit.bankCode}}
                                                                                        // onBlur={handleBlur}
                                                                                        // onChange={(selectedBank) => {
                                                                                        //     this.setState({ selectedBank });
                                                                                        //     errors.bankCode = null
                                                                                        //     touched.bankCode = true
                                                                                        //     values.bankCode = selectedBank.value
                                                                                        // }}
                                                                                        onChange={(selected) => setFieldValue('bankCode', selected.value)}
                                                                                        onBlur={()=> setFieldTouched('bankCode', true)}
                                                                                        name="bankCode"
                                                                                        required
                                                                                    />
                                                                                }

                                                                                {dataToEdit===null &&
                                                                                    <Select
                                                                                        options={allBanksList}
                                                                                        className={errors.bankCode && touched.bankCode ? "is-invalid" : null}
                                                                                        // onBlur={handleBlur}
                                                                                        // onChange={(selectedBank) => {
                                                                                        //     this.setState({ selectedBank });
                                                                                        //     errors.bankCode = null
                                                                                        //     touched.bankCode = true
                                                                                        //     values.bankCode = selectedBank.value
                                                                                        // }}
                                                                                        onChange={(selected) => setFieldValue('bankCode', selected.value)}
                                                                                        onBlur={()=> setFieldTouched('bankCode', true)}
                                                                                        name="bankCode"
                                                                                        required
                                                                                    />
                                                                                }
                        
                                                                                {errors.bankCode && touched.bankCode ? (
                                                                                    <span className="invalid-feedback">{errors.bankCode}</span>
                                                                                ) : null}
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Group controlId="destinationAccount">
                                                                                <Form.Label className="block-level">Destination Account </Form.Label>
                                                                                <Form.Control
                                                                                    type="text"
                                                                                    name="destinationAccount"
                                                                                    onBlur={handleBlur}
                                                                                    // maxLength="10"
                                                                                    onChange={handleChange}
                                                                                    // onChange={(value) => setFieldValue('destinationAccount', value)}
                                                                                    // onBlur={()=> setFieldTouched('destinationAccount', true)}
                                                                                    value={accountNumber(values.destinationAccount, 10)}
                                                                                    className={errors.destinationAccount && touched.destinationAccount ? "is-invalid withcustom" : "withcustom"} />
                        
                                                                                {errors.destinationAccount && touched.destinationAccount ? (
                                                                                    <span className="invalid-feedback">{errors.destinationAccount}</span>
                                                                                ) : null}
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Form.Row>
                                                                    <Form.Row>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Amount</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                maxLength="9"
                                                                                name="amount"
                                                                                // onChange={
                                                                                //     (e)=>{
                                                                                //         if(!Number(e.target.value))
                                                                                //         console.log("tttttt", e.target.value)
                                                                                //     }
                                                                                // }
                                                                                onChange={handleChange}
                                                                                // pattern="\d+((\.|,)\d+)?"
                                                                                value={numberWithCommas(values.amount)}
                                                                                className={errors.amount && touched.amount ? "is-invalid" : null} />
                        
                                                                            {errors.amount && touched.amount ? (
                                                                                <span className="invalid-feedback">{errors.amount}</span>
                                                                            ) : null}
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Narration</Form.Label>
                                                                            <Form.Control
                                                                                type="text"
                                                                                name="narration"
                                                                                onChange={handleChange}
                                                                                value={values.narration}
                                                                                className={errors.narration && touched.narration ? "is-invalid" : null} />
                        
                                                                            {errors.narration && touched.narration ? (
                                                                                <span className="invalid-feedback">{errors.narration}</span>
                                                                            ) : null}
                                                                        </Col>
                                                                       
                                                                    </Form.Row>
                                                                </div>
                                                            </Accordion.Collapse>
                                                        </Accordion>
                        
                                                        
                                                        
                                                        <div className="form-ctas horizontal">
                                                            <Button variant="success"
                                                               
                                                                type="submit"
                                                                onClick={handleSubmit}
                                                                disabled={postDisbursementRequest.is_request_processing}>
                                                                {postDisbursementRequest.is_request_processing ? "Please wait..." : "Inititate Disburment"}
                                                            </Button>
                                                            {/* <Button variant="light" type="button"> Cancel</Button> */}
                                                        </div>
                                                        {/* {postDisbursementRequest.request_status === disbursmentConstants.POST_DISBURSMENT_SUCCESS &&
                                                            <Alert variant="success">
                                                                {postDisbursementRequest.request_data.response.data.message}
                                                            </Alert>
                                                        } */}
                                                        {postDisbursementRequest.request_status === disbursmentConstants.POST_DISBURSMENT_FAILURE &&
                                                            <Alert variant="danger">
                                                                {postDisbursementRequest.request_data.error}
                                                            </Alert>
                                                        }
                                                    </Form>
                        
                                                )}
                                        </Formik>
                                    </div>
                                )
                            }return(
                                <div className="no-records">
                                    Unable to get Destination Banks
                                </div>
                            )

                        }else{
                            return null;
                        }
                            
                    case (disbursmentConstants.GET_DISBURSMENTS_BANKS_FAILURE):
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{getDisbursementBanksRequest.request_data.error}</div>
                        </div>
                    )
                default :
                return null;
            }
        
    }

    renderConfirmDisburment = ()=>{
        let confirmPostDisbursementReducer = this.props.confirmPostDisbursementReducer,
            postDisbursementResponse = this.props.postDisbursementReducer.request_data.response.data,
            getDisbursementBanksRequest = this.props.getDisbursementBanksReducer,
            postDisbursementpayload = this.props.postDisbursementReducer.request_data.postPayload,
            confirmDisburmentValidationSchema = Yup.object().shape({
                securityCode: Yup.string()
                    .min(1, 'Valid response required')
                    .required('Please provide security sent to you')
            }),
            allbanks = getDisbursementBanksRequest.request_data.response.data,
            allBanksList=[],
            selectedTxtSourceCode = postDisbursementpayload.transactionSource,
            selectedDestinationBankCode = postDisbursementpayload.bankCode,
            transactionSourceList=[
                {label: "BankOne" , value:1},
                {label: "Mini-CoreBanking" , value:2}
            ],
            selectedTxtSourceText = transactionSourceList.filter(source=>source.value==selectedTxtSourceCode)[0].label;
            
            allbanks.map(eachBank=>{
                allBanksList.push({label: eachBank.bankName, value:eachBank.bankCode})
            })

            let selectedDestinationBankText = allBanksList.filter(bank=>bank.value===selectedDestinationBankCode)[0].label;

            

        return (
            <div>
                <Formik
                    initialValues={{
                        securityCode: '',
                    }}
                    // validationSchema={confirmDisburmentValidationSchema}
                    onSubmit={(values, { resetForm }) => {
                        let confirmPayload = {
                            securityCode: values.securityCode,
                            transactionReference: postDisbursementResponse.transactionReference
                        };

                        

                        this.confirmPostDisbursement(confirmPayload)
                            .then(
                                () => {
                                    // resetForm();
                                    setTimeout(() => {
                                        if (this.props.confirmPostDisbursementReducer.request_status === disbursmentConstants.CONFIRM_DISBURSMENT_SUCCESS) {
                                            this.props.dispatch(disbursementActions.postDisbursement("CLEAR"))
                                            this.props.dispatch(disbursementActions.confirmPostDisbursement("CLEAR"))
                                        }

                                    }, 3000);

                                }
                            )

                    }}
                >
                    {({ handleSubmit,
                        handleChange,
                        handleBlur,
                        resetForm,
                        values,
                        touched,
                        isValid,
                        errors, }) => (
                            <Form
                                className="form-content w-60 card"
                                // noValidate
                                onSubmit={handleSubmit}
                            >
                                <div className="form-heading">
                                    <h3>Confirm Disbursment</h3>
                                </div>
                                <div className="back-cta centered" onClick={this.handleBackToEdit}>
                                    <span className="back-link">Edit</span>
                                </div>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Sender Details
                                                            </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Sender Name</Form.Label>
                                                    <span className="form-text disabled-field">{postDisbursementResponse.senderName}</span>
                                                </Col>
                                                <Col></Col>
                                            </Form.Row>
                                            <Form.Row>

                                                <Col>
                                                    <Form.Label className="block-level">Transaction Source</Form.Label>
                                                    

                                                    <span className="form-text disabled-field">{selectedTxtSourceText}</span>
                                                </Col>
                                                <Col>
                                                    <Form.Label  className="block-level">Source Account</Form.Label>
                                                    <span className="form-text disabled-field">{postDisbursementpayload.sourceAccount}</span>
                                                </Col>
                                            </Form.Row>
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>

                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Recipient Details
                                                            </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Recipient Name</Form.Label>
                                                    <span className="form-text disabled-field">{postDisbursementResponse.recipientName}</span>
                                                </Col>
                                                <Col></Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Group controlId="bankCode">
                                                        <Form.Label className="block-level">Destination Bank</Form.Label>
                                                        <span className="form-text disabled-field">{selectedDestinationBankText}</span>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group controlId="destinationAccount">
                                                        <Form.Label className="block-level">Destination Account </Form.Label>
                                                        <span className="form-text disabled-field">{postDisbursementpayload.destinationAccount}</span>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Amount</Form.Label>
                                                    <span className="form-text disabled-field">&#8358;{numberWithCommas(postDisbursementpayload.amount, true)}</span>
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Narration</Form.Label>
                                                    <span className="form-text disabled-field">{postDisbursementpayload.narration}</span>
                                                </Col>

                                            </Form.Row>
                                            
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Provide Confirmation details
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            <Form.Row>
                                               
                                                <Col>
                                                    <Form.Group controlId="destinationAccount">
                                                        <Form.Label className="block-level">Security Code</Form.Label>
                                                        <Form.Control type="password"
                                                            name="securityCode"
                                                            onChange={handleChange}
                                                            placeholder="Enter the security code sent to you" 
                                                            value={values.securityCode}
                                                            className={errors.securityCode && touched.securityCode ? "is-invalid": null}
                                                            required  />
                                                        {errors.securityCode && touched.securityCode ? (
                                                            <span className="invalid-feedback">{errors.securityCode}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                </Col>
                                                <Col></Col>
                                            </Form.Row>
                                           
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>


                                {this.props.confirmPostDisbursementReducer.request_status !== disbursmentConstants.CONFIRM_DISBURSMENT_SUCCESS &&
                                    <div className="form-ctas horizontal">
                                        <Button variant="success"
                                            className="mr-20px"
                                            type="submit"
                                            onClick={handleSubmit}
                                            disabled={confirmPostDisbursementReducer.is_request_processing}>
                                            {confirmPostDisbursementReducer.is_request_processing ? "Please wait..." : "Confirm Disburment"}
                                        </Button>
                                        <Button variant="light" className="btn btn-light" onClick={this.handleBackToEdit}> Edit</Button>
                                        {/* <Button variant="light" type="button"> Cancel</Button> */}
                                    </div>
                                }
                                {/* <div className="back-cta centered" onClick={this.handleBackToEdit}>
                                    <span className="back-link">Edit</span>
                                </div> */}
                                {confirmPostDisbursementReducer.request_status === disbursmentConstants.CONFIRM_DISBURSMENT_SUCCESS &&
                                    <Alert variant="success">
                                        {confirmPostDisbursementReducer.request_data.response.data.message}
                                    </Alert>
                                }
                                {confirmPostDisbursementReducer.request_status === disbursmentConstants.CONFIRM_DISBURSMENT_FAILURE &&
                                    <Alert variant="danger">
                                        {confirmPostDisbursementReducer.request_data.error}
                                    </Alert>
                                }
                            </Form>

                        )}
                </Formik>
            </div>
        )
    }

    render() {
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    <div className="content-wrapper">
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Initiate Disbursements</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <ul className="nav">
                                        <li>
                                            <NavLink exact to={'/disbursements'}>Disbursements</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/initiate'}>Initiate Disbursement</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/pending-review'}>Pending Review</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/pending-approval'}>Pending Approval</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/nip-requests'}>NIP Requests</NavLink>
                                            {/* <ul>
                                                <li>
                                                    <NavLink to={'/disbursements/transfer-requests'}>Transfer Requests</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/disbursements/account-block'}>Account Block</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/disbursements/amount-block'}>Amount Block</NavLink>
                                                </li>
                                            </ul> */}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {/* <div className="heading-with-cta">
                                                    <h3 className="section-title">Disbursement</h3>
                                                </div> */}
                                                {this.props.postDisbursementReducer.request_status!==disbursmentConstants.POST_DISBURSMENT_SUCCESS &&
                                                    this.renderInitiateDisburment()
                                                }
                                                {this.props.postDisbursementReducer.request_status===disbursmentConstants.POST_DISBURSMENT_SUCCESS &&
                                                    this.renderConfirmDisburment()
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </InnerPageContainer>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        postDisbursementReducer : state.disbursmentReducers.postDisbursementReducer,
        confirmPostDisbursementReducer : state.disbursmentReducers.confirmPostDisbursementReducer,
        getDisbursementBanksReducer : state.disbursmentReducers.getDisbursementBanksReducer,
    };
}

export default connect(mapStateToProps)(InitiateDisbursement);