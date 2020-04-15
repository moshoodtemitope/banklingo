import * as React from "react";
// import {Router} from "react-router";
import { connect } from 'react-redux';
import {Fragment} from "react";


import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'
import Select from 'react-select';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

import { Formik } from 'formik';
import * as Yup from 'yup';

import {acoountingActions} from '../../redux/actions/accounting/accounting.action';
import {accountingConstants} from '../../redux/actiontypes/accounting/accounting.constants'

import { numberWithCommas, allowNumbersOnly, numberWithoutDecimals} from '../../shared/utils';

import Alert from 'react-bootstrap/Alert'
import { productActions } from '../../redux/actions/products/products.action';
import { productsConstants } from '../../redux/actiontypes/products/products.constants'

import {noWhiteSpaces} from "../../shared/utils"
import "./administration.scss"; 
class NewLoanProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

    }

    componentDidMount(){
        this.getAllGLAccounts();
     }

    getAllGLAccounts = () =>{
        const {dispatch} = this.props;

        dispatch(acoountingActions.getAllGLAccounts());
    }

    handleCreateNewLoanProduct = async(newLoanProductPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(productActions.createLoanProduct(newLoanProductPayload));

    }


    renderCreateLoanProduct =()=>{
        let createLoanProductRequest = this.props.createLoanProductReducer,
            getAllGLAccountsRequest = this.props.getAllGLAccountsReducer;

        let loanProductValidationSchema = Yup.object().shape({
            key: Yup.string()
                .min(1, 'Response required')
                .required('Required'),
            productName:  Yup.string()
                .min(2, 'Valid response required')
                .required('Required'),
            loanProductType: Yup.string()
                .required('Required'),
            description:  Yup.string()
                .min(5, 'Valid response required')
                // .required('Required'),
          });

        let allProductTypes = [
                { value: '0', label: 'Fixed Term Loan' },
                { value: '1', label: 'Dynamic Term Loan' },
                { value: '2', label: 'Interest Free Loan' },
                { value: '3', label: 'Tranched Loan' },
                { value: '4', label: 'Revolving Credit' },
            ],
            arrearsDaysCalculation=[
                { value: '1', label: 'Date Arrears first went Into Arrears' },
                { value: '2', label: 'Date Of The Oldest Currently Late Repayment' },
            ],
            interestRateTermsOptions=[
                { value: '1', label: '% per year' },
                { value: '2', label: '% per month' },
                { value: '3', label: '% per 4 weeks' },
                { value: '4', label: '% per week' },
                { value: '5', label: '% per day' },
            ],
            interestBalanceCalculationOptions=[
                { value: '1', label: 'Flat' },
                { value: '2', label: 'Declining Balance' },
                { value: '3', label: 'Declining Balance Equal Installments' }
            ],
            repaymentPeriodOptions=[
                { value: '1', label: 'Years' },
                { value: '2', label: 'Months' },
                { value: '3', label: 'Weeks' },
                { value: '4', label: 'Days' }
            ];
        
        switch(getAllGLAccountsRequest.request_status){
            case (accountingConstants.GET_ALL_GLACCOUNTS_PENDING):
                return (
                    <div className="loading-content card"> 
                        <div className="loading-text">Please wait... </div>
                    </div>
                )
            case (accountingConstants.GET_ALL_GLACCOUNTS_SUCCESS):
                let allGlAccounts = [],
                    glAccountsList;
                    

                    

                if(getAllGLAccountsRequest.request_data.response.data.length>=1){
                    glAccountsList= getAllGLAccountsRequest.request_data.response.data;
                    glAccountsList.map((channel, id)=>{
                        allGlAccounts.push({label: channel.accountDescription, value:channel.id, accType:channel.accountTypeId});
                    })
                    let portfolioControlAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===1),
                        transactionSourceAccount =allGlAccounts.filter(glAccount=>glAccount.accType===1),
                        writeOffExpenseAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===5),
                        interestReceivableAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===1),
                        feeReceivableAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===1),
                        penaltyReceivableAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===1),
                        feeIncomeAccounts =[],
                        interestIncomeAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===4),
                        penaltyIncomeAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===4);
                        // console.log("+++++", penaltyIncomeAccounts)
                    return(
                        
                            <Formik
                            initialValues={{
                                key: '',
                                productName: '',
                                loanProductType: '',
                                description: '',
                                portfolioControlAccountId: '',
                                transactionSourceAccountId: '',
                                writeOffExpenseAccountId: '',
                                interestReceivableAccountId: '',
                                feeReceivableAccountId: '',
                                penaltyReceivableAccountId: '',
                                feeIncomeAccountId: '',
                                interestIncomeAccountId: '',
                                penaltyIncomeAccountId: '',
                                arearsTolerancePeriodInDaysDefault:'',
                                arearsTolerancePeriodInDaysMin:'',
                                arearsTolerancePeriodInDaysMax:'',
                                arrearsDaysCalculationChosen:'',
                                defaultLoanAmount:'',
                                minimumLoanAmount:'',
                                maximumLoanAmount:'',
                                methodology: 0,
                                isActive: true,
                                interestPaid:true,
                                interestRateTerms:'',
                                interestBalanceCalculation:'',
                                interestRateDefault:'',
                                interestRateMin:'',
                                interestRateMax:'',
                                repaymentEvery:'',
                                repaymentPeriod:'',
                                interestBalanceCalculationSelected:'',
                                firstDueDateOffsetConstraintDefault:'',
                                firstDueDateOffsetConstraintMin:'',
                                firstDueDateOffsetConstraintMax:'',
                                installmentsDefault:'',
                                installmentsMin:'',
                                installmentsMax:'',
                                collectPrincipalEveryRepayments:'',
                            }}

                            validationSchema={loanProductValidationSchema}
                            onSubmit={(values, { resetForm }) => {

                                let createNewLoanProductPayload = {
                                    key: values.key,
                                    productName: values.productName,
                                    loanProductType: parseInt(values.loanProductType),
                                    description: values.description,
                                    loanProductAccountingRuleModel :{
                                        id:0,
                                        portfolioControlAccountId: parseInt(values.portfolioControlAccountId),
                                        transactionSourceAccountId: parseInt(values.transactionSourceAccountId),
                                        writeOffExpenseAccountId: parseInt(values.writeOffExpenseAccountId),
                                        interestReceivableAccountId: parseInt(values.interestReceivableAccountId),
                                        feeReceivableAccountId: parseInt(values.feeReceivableAccountId),
                                        penaltyReceivableAccountId: parseInt(values.penaltyReceivableAccountId),
                                        feeIncomeAccountId: parseInt(values.feeIncomeAccountId),
                                        interestIncomeAccountId: parseInt(values.interestIncomeAccountId),
                                        penaltyIncomeAccountId: parseInt(values.penaltyIncomeAccountId),
                                    },
                                    arrearsSetting: {
                                        arearsTolerancePeriodInDaysDefault: parseInt(values.arearsTolerancePeriodInDaysDefault),
                                        arrearsDaysCalculatedFrom: parseInt(values.arrearsDaysCalculationChosen),
                                        arearsTolerancePeriodInDaysMin: parseInt(values.arearsTolerancePeriodInDaysMin.replace(/,/g, '')),
                                        arearsTolerancePeriodInDaysMax: parseInt(values.arearsTolerancePeriodInDaysMax.replace(/,/g, ''))
                                    },
                                    loanProductInterestSetting: {
                                        interestPaid: values.interestPaid,
                                        interestRateTerms: parseInt(values.interestRateTerms),
                                        interestBalanceCalculation: parseInt(values.interestBalanceCalculation),
                                        interestRateDefault: parseFloat(values.interestRateDefault.replace(/,/g, '')),
                                        interestRateMin: parseFloat(values.interestRateMin.replace(/,/g, '')),
                                        interestRateMax: parseFloat(values.interestRateMax.replace(/,/g, '')),
                                      },
                                    loanAmountSetting: {
                                        loanAmountDefault: parseFloat(values.defaultLoanAmount.replace(/,/g, '')),
                                        loanAmountMinimun: parseFloat(values.minimumLoanAmount.replace(/,/g, '')),
                                        loanAmountMaximum: parseFloat(values.maximumLoanAmount.replace(/,/g, ''))
                                    },

                                    repaymentReschedulingModel: {
                                        repaymentEvery: parseInt(values.repaymentEvery),
                                        repaymentPeriod: parseInt(values.repaymentPeriod),
                                        interestBalanceCalculation: parseInt(values.interestBalanceCalculationSelected),
                                        firstDueDateOffsetConstraintDefault: parseInt(values.firstDueDateOffsetConstraintDefault.replace(/,/g, '')),
                                        firstDueDateOffsetConstraintMin: parseInt(values.firstDueDateOffsetConstraintMin.replace(/,/g, '')),
                                        firstDueDateOffsetConstraintMax: parseInt(values.firstDueDateOffsetConstraintMax.replace(/,/g, '')),
                                        installmentsDefault: parseFloat(values.installmentsDefault.replace(/,/g, '')),
                                        installmentsMin: parseFloat(values.installmentsMin.replace(/,/g, '')),
                                        installmentsMax: parseFloat(values.installmentsMax.replace(/,/g, '')),
                                        collectPrincipalEveryRepayments: parseInt(values.collectPrincipalEveryRepayments)
                                    },

                                    methodology: parseInt(values.methodology),
                                    isActive: values.isActive
                                    
                                }



                                this.handleCreateNewLoanProduct(createNewLoanProductPayload)
                                    .then(
                                        () => {

                                            if (this.props.createLoanProductReducer.request_status === productsConstants.CREATE_A_LOAN_PRODUCT_SUCCESS) {
                                                setTimeout(() => {
                                                    resetForm();
                                                    this.props.dispatch(productActions.createLoanProduct("CLEAR"))
                                                }, 3000);
                                            }else{
                                                setTimeout(() => {
                                                    this.props.dispatch(productActions.createLoanProduct("CLEAR"))
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
                                touched,
                                setFieldValue,
                                setFieldTouched,
                                isValid,
                                errors, }) => (
                            <Form 
                                noValidate 
                                onSubmit={handleSubmit}
                                className="form-content card">
                                <div className="form-heading">
                                    <h3>Create A New Loan Product</h3>
                                </div>
                                <Form.Row>
                                    <Col>
                                        <Form.Label className="block-level">Product Name</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            onChange={handleChange}
                                            value={values.productName}
                                            className={errors.productName && touched.productName ? "is-invalid" : null}
                                            name="productName" required />
                                        {errors.productName && touched.productName ? (
                                            <span className="invalid-feedback">{errors.productName}</span>
                                        ) : null}
                                    </Col>
                                    <Col>
                                        <Form.Label className="block-level">Product Key</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            onChange={handleChange}
                                            value={noWhiteSpaces(values.key)}
                                            className={errors.key && touched.key ? "is-invalid" : null}
                                            name="key" required />
                                        {errors.key && touched.key ? (
                                            <span className="invalid-feedback">{errors.key}</span>
                                        ) : null}
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <Form.Label className="block-level">Product Type</Form.Label>
                                        
                                        <Select
                                            options={allProductTypes}
                                            onChange={(selectedProductType) => {
                                                
                                                // errors.loanProductType = null
                                                // values.loanProductType = selectedProductType.value
                                                setFieldValue('loanProductType', selectedProductType.value)
                                            }}
                                            className={errors.loanProductType && touched.loanProductType ? "is-invalid" : null}
                                            
                                            
                                            name="loanProductType"
                                            
                                            required
                                        />
                                        {errors.loanProductType && touched.loanProductType ? (
                                            <span className="invalid-feedback">{errors.loanProductType}</span>
                                        ) : null}
                                    </Col>
                                    <Col>
                                    </Col>
                                </Form.Row>
                                
                                <Form.Row>
                                    <Col>
                                    
                                        <div className="checkbox-wrap">
                                            <input type="checkbox" 
                                                id="isActive" 
                                                checked={values.isActive? values.isActive:null}
                                                name="isActive"
                                                onChange={handleChange} 
                                                value={values.isActive}  />
                                            <label htmlFor="isActive">Active state</label>
                                        </div>
                                    </Col>
                                    <Col>
                                        
                                    </Col>
                                </Form.Row>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Loan Product Description 
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div className="each-formsection">
                                            <Form.Group>
                                                <Form.Control as="textarea" rows="3"
                                                    onChange={handleChange}
                                                    value={values.description}
                                                    className={errors.description && touched.description ? "is-invalid" : null}
                                                    name="description"  />
                                                {errors.description && touched.description ? (
                                                    <span className="invalid-feedback">{errors.description}</span>
                                                ) : null}
                                            </Form.Group>
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>

                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Loan Amount Settings
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div className="each-formsection">
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Default Loan Amount</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithCommas(values.defaultLoanAmount)}
                                                        className={errors.defaultLoanAmount && touched.defaultLoanAmount ? "is-invalid" : null}
                                                        name="defaultLoanAmount" required />
                                                    {errors.defaultLoanAmount && touched.defaultLoanAmount ? (
                                                        <span className="invalid-feedback">{errors.defaultLoanAmount}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Minimum Loan Amount</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithCommas(values.minimumLoanAmount)}
                                                        className={errors.minimumLoanAmount && touched.minimumLoanAmount ? "is-invalid" : null}
                                                        name="minimumLoanAmount" required />
                                                    {errors.minimumLoanAmount && touched.minimumLoanAmount ? (
                                                        <span className="invalid-feedback">{errors.minimumLoanAmount}</span>
                                                    ) : null}
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Maximum Loan Amount</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithCommas(values.maximumLoanAmount)}
                                                        className={errors.maximumLoanAmount && touched.maximumLoanAmount ? "is-invalid" : null}
                                                        name="maximumLoanAmount" required />
                                                    {errors.maximumLoanAmount && touched.maximumLoanAmount ? (
                                                        <span className="invalid-feedback">{errors.maximumLoanAmount}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                </Col>
                                            </Form.Row>
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Arrears Settings
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div className="each-formsection">
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Arrears Tolerance Period (days) Default</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithoutDecimals(values.arearsTolerancePeriodInDaysDefault)}
                                                        className={errors.arearsTolerancePeriodInDaysDefault && touched.arearsTolerancePeriodInDaysDefault ? "is-invalid" : null}
                                                        name="arearsTolerancePeriodInDaysDefault" required />
                                                    {errors.arearsTolerancePeriodInDaysDefault && touched.arearsTolerancePeriodInDaysDefault ? (
                                                        <span className="invalid-feedback">{errors.arearsTolerancePeriodInDaysDefault}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Arrears Tolerance Period (days) Minimum</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithoutDecimals(values.arearsTolerancePeriodInDaysMin)}
                                                        className={errors.arearsTolerancePeriodInDaysMin && touched.arearsTolerancePeriodInDaysMin ? "is-invalid" : null}
                                                        name="arearsTolerancePeriodInDaysMin" required />
                                                    {errors.arearsTolerancePeriodInDaysMin && touched.arearsTolerancePeriodInDaysMin ? (
                                                        <span className="invalid-feedback">{errors.arearsTolerancePeriodInDaysMin}</span>
                                                    ) : null}
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Arrears Tolerance Period (days) Maximum</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithoutDecimals(values.arearsTolerancePeriodInDaysMax)}
                                                        className={errors.arearsTolerancePeriodInDaysMax && touched.arearsTolerancePeriodInDaysMax ? "is-invalid" : null}
                                                        name="arearsTolerancePeriodInDaysMax" required />
                                                    {errors.arearsTolerancePeriodInDaysMax && touched.arearsTolerancePeriodInDaysMax ? (
                                                        <span className="invalid-feedback">{errors.arearsTolerancePeriodInDaysMax}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Arrears Days Calculated From</Form.Label>
                                        
                                                    <Select
                                                        options={arrearsDaysCalculation}
                                                        onChange={(selectedArrearsDaysCalculation) => {
                                                            // this.setState({ selectedArrearsDaysCalculation });
                                                            // errors.arrearsDaysCalculationChosen = null
                                                            // values.arrearsDaysCalculationChosen = selectedArrearsDaysCalculation.value
                                                            setFieldValue('arrearsDaysCalculationChosen', selectedArrearsDaysCalculation.value)
                                                        }}
                                                        className={errors.arrearsDaysCalculationChosen && touched.arrearsDaysCalculationChosen ? "is-invalid" : null}
                                                        
                                                        
                                                        name="arrearsDaysCalculationChosen"
                                                        
                                                        required
                                                    />
                                                    {errors.arrearsDaysCalculationChosen && touched.arrearsDaysCalculationChosen ? (
                                                        <span className="invalid-feedback">{errors.arrearsDaysCalculationChosen}</span>
                                                    ) : null}
                                                </Col>
                                            </Form.Row>
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>

                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Interest Rate
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div className="each-formsection">
                                            <Form.Row>
                                                <Col>
                                                    <div className="checkbox-wrap">
                                                        <input type="checkbox"
                                                            id="interestPaid"
                                                            checked={values.interestPaid ? values.interestPaid : null}
                                                            name="interestPaid"
                                                            onChange={handleChange}
                                                            value={values.interestPaid} />
                                                        <label htmlFor="interestPaid">Interest Paid</label>
                                                    </div>
                                                </Col>
                                            </Form.Row>
                                            {values.interestPaid===true &&
                                                <div>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Interest Calculation Method</Form.Label>
                                                            <Select
                                                                options={interestBalanceCalculationOptions}
                                                                onChange={(selectedInterestBalanceCalculationOptions) => {
                                                                    // this.setState({ selectedInterestBalanceCalculationOptions });
                                                                    // errors.interestBalanceCalculation = null
                                                                    // values.interestBalanceCalculation = selectedInterestBalanceCalculationOptions.value
                                                                    setFieldValue('interestBalanceCalculation', selectedInterestBalanceCalculationOptions.value)
                                                                }}
                                                                className={errors.interestBalanceCalculation && touched.interestBalanceCalculation ? "is-invalid" : null}


                                                                name="interestBalanceCalculation"

                                                                required
                                                            />
                                                            {errors.interestBalanceCalculation && touched.interestBalanceCalculation ? (
                                                                <span className="invalid-feedback">{errors.interestBalanceCalculation}</span>
                                                            ) : null}
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">How is the Interest rate charged?</Form.Label>

                                                            <Select
                                                                options={interestRateTermsOptions}
                                                                onChange={(selectedInterestRateTermsOptions) => {
                                                                    // this.setState({ selectedInterestRateTermsOptions });
                                                                    // errors.interestRateTerms = null
                                                                    // values.interestRateTerms = selectedInterestRateTermsOptions.value
                                                                    setFieldValue('interestRateTerms', selectedInterestRateTermsOptions.value)
                                                                }}
                                                                className={errors.interestRateTerms && touched.interestRateTerms ? "is-invalid" : null}


                                                                name="interestRateTerms"

                                                                required
                                                            />
                                                            {errors.interestRateTerms && touched.interestRateTerms ? (
                                                                <span className="invalid-feedback">{errors.interestRateTerms}</span>
                                                            ) : null}
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Interest Rate Default (%)</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={numberWithCommas(values.interestRateDefault)}
                                                                className={errors.interestRateDefault && touched.interestRateDefault ? "is-invalid" : null}
                                                                name="interestRateDefault" required />
                                                            {errors.interestRateDefault && touched.interestRateDefault ? (
                                                                <span className="invalid-feedback">{errors.interestRateDefault}</span>
                                                            ) : null}
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">Interest Rate Minimum (%)</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={numberWithCommas(values.interestRateMin)}
                                                                className={errors.interestRateMin && touched.interestRateMin ? "is-invalid" : null}
                                                                name="interestRateMin" required />
                                                            {errors.interestRateMin && touched.interestRateMin ? (
                                                                <span className="invalid-feedback">{errors.interestRateMin}</span>
                                                            ) : null}
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Interest Rate Maximum (%)</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={numberWithCommas(values.interestRateMax)}
                                                                className={errors.interestRateMax && touched.interestRateMax ? "is-invalid" : null}
                                                                name="interestRateMax" required />
                                                            {errors.interestRateMax && touched.interestRateMax ? (
                                                                <span className="invalid-feedback">{errors.interestRateMax}</span>
                                                            ) : null}
                                                        </Col>
                                                        <Col>
                                                        </Col>
                                                    </Form.Row>
                                                </div>
                                            }
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Repayment Scheduling
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Repayments Are Made Every</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithoutDecimals(values.repaymentEvery)}
                                                        className={errors.repaymentEvery && touched.repaymentEvery ? "is-invalid" : null}
                                                        name="repaymentEvery" required />
                                                    {errors.repaymentEvery && touched.repaymentEvery ? (
                                                        <span className="invalid-feedback">{errors.repaymentEvery}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Repayments Period</Form.Label>

                                                    <Select
                                                        options={repaymentPeriodOptions}
                                                        onChange={(selectedRepaymentPeriodOptions) => {
                                                            // this.setState({ selectedRepaymentPeriodOptions });
                                                            // errors.repaymentPeriod = null
                                                            // values.repaymentPeriod = selectedRepaymentPeriodOptions.value
                                                            setFieldValue('repaymentPeriod', selectedRepaymentPeriodOptions.value)
                                                        }}
                                                        className={errors.repaymentPeriod && touched.repaymentPeriod ? "is-invalid" : null}


                                                        name="repaymentPeriod"

                                                        required
                                                    />
                                                    {errors.repaymentPeriod && touched.repaymentPeriod ? (
                                                        <span className="invalid-feedback">{errors.repaymentPeriod}</span>
                                                    ) : null}
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Interest Calculation Method</Form.Label>
                                                    <Select
                                                        options={interestBalanceCalculationOptions}
                                                        onChange={(selectedInterestBalanceCalculation) => {
                                                            // this.setState({ selectedInterestBalanceCalculation });
                                                            // errors.interestBalanceCalculationSelected = null
                                                            // values.interestBalanceCalculationSelected = selectedInterestBalanceCalculation.value

                                                            setFieldValue('interestBalanceCalculationSelected', selectedInterestBalanceCalculation.value)
                                                        }}
                                                        className={errors.interestBalanceCalculationSelected && touched.interestBalanceCalculationSelected ? "is-invalid" : null}


                                                        name="interestBalanceCalculationSelected"

                                                        required
                                                    />
                                                    {errors.interestBalanceCalculationSelected && touched.interestBalanceCalculationSelected ? (
                                                        <span className="invalid-feedback">{errors.interestBalanceCalculationSelected}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">First Due Date Offset Default (days)</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithoutDecimals(values.firstDueDateOffsetConstraintDefault)}
                                                        className={errors.firstDueDateOffsetConstraintDefault && touched.firstDueDateOffsetConstraintDefault ? "is-invalid" : null}
                                                        name="firstDueDateOffsetConstraintDefault" required />
                                                    {errors.firstDueDateOffsetConstraintDefault && touched.firstDueDateOffsetConstraintDefault ? (
                                                        <span className="invalid-feedback">{errors.firstDueDateOffsetConstraintDefault}</span>
                                                    ) : null}
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">First Due Date Offset Minimum (days)</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithoutDecimals(values.firstDueDateOffsetConstraintMin)}
                                                        className={errors.firstDueDateOffsetConstraintMin && touched.firstDueDateOffsetConstraintMin ? "is-invalid" : null}
                                                        name="firstDueDateOffsetConstraintMin" required />
                                                    {errors.firstDueDateOffsetConstraintMin && touched.firstDueDateOffsetConstraintMin ? (
                                                        <span className="invalid-feedback">{errors.firstDueDateOffsetConstraintMin}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">First Due Date Offset Maximum (days)</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithoutDecimals(values.firstDueDateOffsetConstraintMax)}
                                                        className={errors.firstDueDateOffsetConstraintMax && touched.firstDueDateOffsetConstraintMax ? "is-invalid" : null}
                                                        name="firstDueDateOffsetConstraintMax" required />
                                                    {errors.firstDueDateOffsetConstraintMax && touched.firstDueDateOffsetConstraintMax ? (
                                                        <span className="invalid-feedback">{errors.firstDueDateOffsetConstraintMax}</span>
                                                    ) : null}
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Installments  Default </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithoutDecimals(values.installmentsDefault)}
                                                        className={errors.installmentsDefault && touched.installmentsDefault ? "is-invalid" : null}
                                                        name="installmentsDefault" required />
                                                    {errors.installmentsDefault && touched.installmentsDefault ? (
                                                        <span className="invalid-feedback">{errors.installmentsDefault}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Installments  Minimum </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithoutDecimals(values.installmentsMin)}
                                                        className={errors.installmentsMin && touched.installmentsMin ? "is-invalid" : null}
                                                        name="installmentsMin" required />
                                                    {errors.installmentsMin && touched.installmentsMin ? (
                                                        <span className="invalid-feedback">{errors.installmentsMin}</span>
                                                    ) : null}
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Installments  Maximum </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithoutDecimals(values.installmentsMax)}
                                                        className={errors.installmentsMax && touched.installmentsMax ? "is-invalid" : null}
                                                        name="installmentsMax" required />
                                                    {errors.installmentsMax && touched.installmentsMax ? (
                                                        <span className="invalid-feedback">{errors.installmentsMax}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Collect Principal Every </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithoutDecimals(values.collectPrincipalEveryRepayments)}
                                                        className={errors.collectPrincipalEveryRepayments && touched.collectPrincipalEveryRepayments ? "is-invalid" : null}
                                                        name="collectPrincipalEveryRepayments" required />
                                                        <small>Repayments</small>
                                                    {errors.collectPrincipalEveryRepayments && touched.collectPrincipalEveryRepayments ? (
                                                        <span className="invalid-feedback">{errors.collectPrincipalEveryRepayments}</span>
                                                    ) : null}
                                                </Col>
                                            </Form.Row>
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>
                                
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Loan Product Rules
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            <Form.Group as={Row} className="center-aligned">
                                                <Form.Label column sm={4} className="block-level">Methodology</Form.Label>
                                                <Col sm={6}>
                                                    
                                                <select id="toshow" 
                                                        name="methodology"
                                                        onChange={handleChange}
                                                        value={values.methodology}
                                                        className="countdropdown form-control form-control-sm">
                                                    <option value="0">None</option>
                                                    <option value="1">Cash</option>
                                                    <option value="2">Accrual</option>
                                                </select>
                                                </Col>
                                                <Col sm={2}>
                                                    
                                                </Col>
                                            </Form.Group>


                                            <Form.Group as={Row} className="center-aligned">
                                                <Form.Label column sm={4} className="block-level">Portfolio Control Account</Form.Label>
                                                <Col sm={6}>
                                                    
                                                    <Select
                                                        options={portfolioControlAccounts}
                                                        onChange={(selectedPortfolioAcct) => {
                                                            // this.setState({ selectedPortfolioAcct });
                                                            // errors.portfolioControlAccountId = null
                                                            // values.portfolioControlAccountId = selectedPortfolioAcct.value

                                                            setFieldValue('portfolioControlAccountId', selectedPortfolioAcct.value)
                                                        }}
                                                        className={errors.portfolioControlAccountId && touched.portfolioControlAccountId ? "is-invalid" : null}
                                                        
                                                        noOptionsMessage ={() => "No accounts available"}
                                                        name="portfolioControlAccountId"
                                                        
                                                        
                                                    />
                                                </Col>
                                                <Col sm={2}>
                                                    <span>Asset</span>
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="center-aligned">
                                                <Form.Label column sm={4} className="block-level">Transaction Control Account</Form.Label>
                                                <Col sm={6}>
                                                <Select
                                                        options={transactionSourceAccount}
                                                        onChange={(selectedTxtSourceAcct) => {
                                                            // this.setState({ selectedTxtSourceAcct });
                                                            // errors.transactionSourceAccountId = null
                                                            // values.transactionSourceAccountId = selectedTxtSourceAcct.value

                                                            setFieldValue('transactionSourceAccountId', selectedTxtSourceAcct.value)
                                                        }}
                                                        className={errors.transactionSourceAccountId && touched.transactionSourceAccountId ? "is-invalid" : null}
                                                        noOptionsMessage ={() => "No accounts available"}
                                                        
                                                        name="transactionSourceAccountId"
                                                        
                                                        
                                                    />
                                                </Col>
                                                <Col sm={2}>
                                                    <span>Asset</span>
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="center-aligned">
                                                <Form.Label column sm={4} className="block-level">Write-off Expense Account</Form.Label>
                                                <Col sm={6}>
                                                <Select
                                                        options={writeOffExpenseAccounts}
                                                        onChange={(selectedWriteOffExpenseAcct) => {
                                                            // this.setState({ selectedWriteOffExpenseAcct });
                                                            // errors.writeOffExpenseAccountId = null
                                                            // values.writeOffExpenseAccountId = selectedWriteOffExpenseAcct.value
                                                            setFieldValue('writeOffExpenseAccountId', selectedWriteOffExpenseAcct.value)
                                                        }}
                                                        className={errors.writeOffExpenseAccountId && touched.writeOffExpenseAccountId ? "is-invalid" : null}
                                                        noOptionsMessage ={() => "No accounts available"}
                                                        
                                                        name="writeOffExpenseAccountId"
                                                        
                                                        
                                                    />
                                                </Col>
                                                <Col sm={2}>
                                                    <span>Expense</span>
                                                </Col>
                                            </Form.Group>
                                            { values.methodology!=="1" && 
                                            <div>
                                            <Form.Group as={Row} className="center-aligned">
                                                <Form.Label column sm={4} className="block-level">Interest Receivable Account</Form.Label>
                                                <Col sm={6}>
                                                <Select
                                                        options={interestReceivableAccounts}
                                                        onChange={(selectedInterestReceivableAcct) => {
                                                            // this.setState({ selectedInterestReceivableAcct });
                                                            // errors.interestReceivableAccountId = null
                                                            // values.interestReceivableAccountId = selectedInterestReceivableAcct.value

                                                            setFieldValue('interestReceivableAccountId', selectedInterestReceivableAcct.value)
                                                        }}
                                                        className={errors.interestReceivableAccountId && touched.interestReceivableAccountId ? "is-invalid" : null}
                                                        noOptionsMessage ={() => "No accounts available"}
                                                        
                                                        name="interestReceivableAccountId"
                                                        
                                                        
                                                    />
                                                </Col>
                                                <Col sm={2}>
                                                    <span>Asset</span>
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="center-aligned">
                                                <Form.Label column sm={4} className="block-level">Fee Receivable Account</Form.Label>
                                                <Col sm={6}>
                                                <Select
                                                        options={feeReceivableAccounts}
                                                        onChange={(selectedFeeReceivableAcct) => {
                                                            // this.setState({ selectedFeeReceivableAcct });
                                                            // errors.feeReceivableAccountId = null
                                                            // values.feeReceivableAccountId = selectedFeeReceivableAcct.value

                                                            setFieldValue('feeReceivableAccountId', selectedFeeReceivableAcct.value)
                                                        }}
                                                        className={errors.feeReceivableAccountId && touched.feeReceivableAccountId ? "is-invalid" : null}
                                                        noOptionsMessage ={() => "No accounts available"}
                                                        
                                                        name="feeReceivableAccountId"
                                                        
                                                        
                                                    />
                                                </Col>
                                                <Col sm={2}>
                                                    <span>Asset</span>
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="center-aligned">
                                                <Form.Label column sm={4} className="block-level">Penalty Receivable Account</Form.Label>
                                                <Col sm={6}>
                                                <Select
                                                        options={penaltyReceivableAccounts}
                                                        onChange={(selectedPenaltyReceivableAcct) => {
                                                            // this.setState({ selectedPenaltyReceivableAcct });
                                                            // errors.penaltyReceivableAccountId = null
                                                            // values.penaltyReceivableAccountId = selectedPenaltyReceivableAcct.value

                                                            setFieldValue('penaltyReceivableAccountId', selectedPenaltyReceivableAcct.value)
                                                        }}
                                                        className={errors.penaltyReceivableAccountId && touched.penaltyReceivableAccountId ? "is-invalid" : null}
                                                        noOptionsMessage ={() => "No accounts available"}
                                                        
                                                        name="penaltyReceivableAccountId"
                                                        
                                                        
                                                    />
                                                </Col>
                                                <Col sm={2}>
                                                    <span>Asset</span>
                                                </Col>
                                            </Form.Group>
                                            </div>
                                            }

                                            <Form.Group as={Row} className="center-aligned">
                                                <Form.Label column sm={4} className="block-level">Fee Income Account</Form.Label>
                                                <Col sm={6}>
                                                <Select
                                                        options={allGlAccounts}
                                                        onChange={(selectedFeeIncomeAcct) => {
                                                            // this.setState({ selectedFeeIncomeAcct });
                                                            // errors.feeIncomeAccountId = null
                                                            // values.feeIncomeAccountId = selectedFeeIncomeAcct.value

                                                            setFieldValue('feeIncomeAccountId', selectedFeeIncomeAcct.value)
                                                        }}
                                                        className={errors.feeIncomeAccountId && touched.feeIncomeAccountId ? "is-invalid" : null}
                                                        noOptionsMessage ={() => "No accounts available"}
                                                        
                                                        name="feeIncomeAccountId"
                                                        
                                                        
                                                    />
                                                </Col>
                                                <Col sm={2}>
                                                    <span>Any GL Account</span>
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="center-aligned">
                                                <Form.Label column sm={4} className="block-level">Interest Income Account</Form.Label>
                                                <Col sm={6}>
                                                <Select
                                                        options={interestIncomeAccounts}
                                                        onChange={(selectedInterestIncomeAcct) => {
                                                            // this.setState({ selectedInterestIncomeAcct });
                                                            // errors.interestIncomeAccountId = null
                                                            // values.interestIncomeAccountId = selectedInterestIncomeAcct.value

                                                            setFieldValue('interestIncomeAccountId', selectedInterestIncomeAcct.value)
                                                        }}
                                                        className={errors.interestIncomeAccountId && touched.interestIncomeAccountId ? "is-invalid" : null}
                                                        noOptionsMessage ={() => "No accounts available"}
                                                        
                                                        name="interestIncomeAccountId"
                                                        
                                                        
                                                    />
                                                </Col>
                                                <Col sm={2}>
                                                    <span>Income</span>
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="center-aligned">
                                                <Form.Label column sm={4} className="block-level">Penalty Income Account</Form.Label>
                                                <Col sm={6}>
                                                <Select
                                                        options={penaltyIncomeAccounts}
                                                        onChange={(selectedPenaltyIncomeAcct) => {
                                                            // this.setState({ selectedPenaltyIncomeAcct });
                                                            // errors.penaltyIncomeAccountId = null
                                                            // values.penaltyIncomeAccountId = selectedPenaltyIncomeAcct.value

                                                            setFieldValue('penaltyIncomeAccountId', selectedPenaltyIncomeAcct.value)
                                                        }}
                                                        className={errors.penaltyIncomeAccountId && touched.penaltyIncomeAccountId ? "is-invalid" : null}
                                                        noOptionsMessage ={() => "No accounts available"}
                                                        
                                                        name="penaltyIncomeAccountId"
                                                        
                                                        
                                                    />
                                                </Col>
                                                <Col sm={2}>
                                                    <span>Income</span>
                                                </Col>
                                            </Form.Group>
                                        
                                           
                                            
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>

                            





                                <div className="footer-with-cta toleft">
                                    
                                    <NavLink to={'/administration/products'} className="btn btn-secondary grayed-out">Cancel</NavLink>
                                    <Button
                                        type="submit"
                                        disabled={createLoanProductRequest.is_request_processing}>
                                        {createLoanProductRequest.is_request_processing?"Please wait...": "Create Product"}
                                    </Button>
                                </div>
                                {createLoanProductRequest.request_status === productsConstants.CREATE_A_LOAN_PRODUCT_SUCCESS && 
                                    <Alert variant="success">
                                        {createLoanProductRequest.request_data.response.data.message}
                                    </Alert>
                                }
                                {createLoanProductRequest.request_status === productsConstants.CREATE_A_LOAN_PRODUCT_FAILURE && 
                                    <Alert variant="danger">
                                        {createLoanProductRequest.request_data.error}
                                    </Alert>
                                }
                            </Form>
                        
                        
                        )}
                        </Formik>
                        
                    )
                }else{
                    return(
                        <div className="loading-content card"> 
                            <div>No GL Account found</div>
                        </div>
                    )
                }

            case (accountingConstants.GET_ALL_GLACCOUNTS_FAILURE):
                return (
                    <div className="loading-content card"> 
                        <div>{getAllGLAccountsRequest.request_data.error}</div>
                    </div>
                )
            default :
            return null;
        }
    }

    render() {
        
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    <div className="content-wrapper">
                        <div className="module-content">
                            <div className="content-container">
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="middle-content">
                                            <div className="full-pageforms w-60">
                                                {this.renderCreateLoanProduct()}
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
        createLoanProductReducer : state.productReducers.createLoanProductReducer,
        getAllGLAccountsReducer : state.accountingReducers.getAllGLAccountsReducer,
    };
}


export default connect(mapStateToProps)(NewLoanProduct);