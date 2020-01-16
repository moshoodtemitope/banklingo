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
import {numberWithCommas} from '../../shared/utils';
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
        this.props.dispatch(disbursementActions.postDisbursement("CLEAR"))
    }

    initiateDisburmentRequest = async (inititationPayload)=>{
        const {dispatch} = this.props;

        await dispatch(disbursementActions.postDisbursement(inititationPayload));
    }


    renderInitiateDisburment =()=>{
        let postDisbursementRequest = this.props.postDisbursementReducer,
            initiateDisburmentValidationSchema = Yup.object().shape({
                bankCode: Yup.string()
                    .min(1, 'Please select a Bank')
                    .max(50, 'Valid response required')
                    .required('Please select a Bank'),
                destinationAccount: Yup.string()
                    .min(1, 'Please provide account number')
                    .max(10, 'Max Limit reached')
                    .required('Account number is required'),
                amount: Yup.string()
                    .min(1, 'Please provide amount')
                    .max(15, 'Max Limit reached')
                    .required('Amount is required'),
                transactionSource: Yup.string()
                    .min(1, 'Please select source')
                    .max(200, 'Valid response required')
                    .required('Transaction source is required'),
                narration: Yup.string()
                    .min(1, 'Please provide narration')
                    .max(20, 'Max Limit reached')
                    .required('Narration is required'),
                sourceAccount: Yup.string()
                    .min(1, 'Please provide a valid source account')
                    .max(15, 'Valid response required'),
            }),
            allBanksList=[];
            // console.log('banks are', banksList);

            banksList.map((eachbank, id)=>{
                allBanksList.push({label: eachbank.BankName, value:eachbank.BankCode});
            })
        return(
            <div>
                <Formik
                    initialValues={{
                        bankCode: '',
                        destinationAccount: '',
                        amount: '',
                        transactionSource: '',
                        narration: '',
                        sourceAccount: '',
                    }}
                    validationSchema={initiateDisburmentValidationSchema}
                    onSubmit={(values, { resetForm }) => {
                        let initiationPayload = {
                                bankCode: values.bankCode,
                                destinationAccount: values.destinationAccount,
                                amount: parseFloat(values.amount.replace(/,/g, '')),
                                transactionSource: parseInt(values.transactionSource),
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
                                            this.props.dispatch(disbursementActions.postDisbursement("CLEAR"))
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

                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="bankCode">
                                            <Form.Label className="block-level">Destination Bank</Form.Label>
                                           

                                            <Select
                                                options={allBanksList}
                                                className={errors.bankCode && touched.bankCode ? "is-invalid" : null}
                                                onBlur={handleBlur}
                                                onChange={(selectedBank) => {
                                                    this.setState({ selectedBank });
                                                    errors.bankCode = null
                                                    touched.bankCode = true
                                                    values.bankCode = selectedBank.value
                                                }}
                                                name="bankCode"
                                                required
                                            />

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
                                                onChange={handleChange}
                                                value={values.destinationAccount}
                                                className={errors.destinationAccount && touched.destinationAccount ? "is-invalid" : null} />

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
                                            name="amount"
                                            onChange={handleChange}
                                            value={numberWithCommas(values.amount)}
                                            className={errors.amount && touched.amount ? "is-invalid" : null} />

                                        {errors.amount && touched.amount ? (
                                            <span className="invalid-feedback">{errors.amount}</span>
                                        ) : null}
                                    </Col>
                                    <Col>
                                        <Form.Label className="block-level">Transaction Source</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="transactionSource"
                                            onChange={handleChange}
                                            value={values.transactionSource}
                                            className={errors.transactionSource && touched.transactionSource ? "is-invalid" : null} />

                                        {errors.transactionSource && touched.transactionSource ? (
                                            <span className="invalid-feedback">{errors.transactionSource}</span>
                                        ) : null}
                                    </Col>
                                </Form.Row>
                                <Form.Row>
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
                                    <Col>
                                        <Form.Label className="block-level">Source Account</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="sourceAccount"
                                            onChange={handleChange}
                                            value={values.sourceAccount}
                                            className={errors.sourceAccount && touched.sourceAccount ? "is-invalid" : null} />

                                        {errors.sourceAccount && touched.sourceAccount ? (
                                            <span className="invalid-feedback">{errors.sourceAccount}</span>
                                        ) : null}
                                    </Col>
                                </Form.Row>
                                
                                <div className="form-ctas horizontal">
                                    <Button variant="success"
                                        className="mr-20px"
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
    }

    renderConfirmDisburment = ()=>{
        return(
            <div>

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
                                                {this.renderInitiateDisburment()}
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
        postDisbursementReducer : state.disbursmentReducers.postDisbursementReducer
    };
}

export default connect(mapStateToProps)(InitiateDisbursement);