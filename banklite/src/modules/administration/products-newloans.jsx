import * as React from "react";

import { connect } from 'react-redux';
import {Fragment} from "react";


import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'

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
        this.getAllDepositProducts();
     }

    getAllGLAccounts = () =>{
        const {dispatch} = this.props;

        dispatch(acoountingActions.getAllGLAccounts());
    }

    getAllDepositProducts = ()=>{
        const {dispatch} = this.props;

        dispatch(productActions.getAllDepositProducts());
    }

    handleCreateNewLoanProduct = async(newLoanProductPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(productActions.createLoanProduct(newLoanProductPayload));

    }


    renderCreateLoanProduct =()=>{
        let createLoanProductRequest = this.props.createLoanProductReducer,
            getAllGLAccountsRequest = this.props.getAllGLAccountsReducer,
            getAllDepositProductsRequest = this.props.getAllDepositProductsReducer;

        let loanProductValidationSchema = Yup.object().shape({
            key: Yup.string()
                .min(1, 'Response required')
                .required('Required'),
            productName:  Yup.string()
                .min(2, 'Valid response required')
                .required('Required'),
            loanProductType: Yup.string()
                .required('Required'),
            repaymentEvery: Yup.string()
                .required('Required'),
            repaymentPeriod: Yup.string()
                .required('Required'),
            collectPrincipalEveryRepayments: Yup.string()
                .required('Required'),
            description:  Yup.string()
                .min(5, 'Valid response required')
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
            ],
            settlementOptionsList=[
                { value: 0, label: 'No Automated Transfers' },
                { value: 1, label: 'Allow Partial Transfers' },
                { value: 2, label: 'Only Transfer Full Due' }
            ];
        
        
            if (getAllGLAccountsRequest.request_status === accountingConstants.GET_ALL_GLACCOUNTS_PENDING
                || getAllDepositProductsRequest.request_status===productsConstants.GET_ALL_DEPOSIT_PRODUCTS_PENDING ){
                return (
                    <div className="loading-content card"> 
                        <div className="loading-text">Please wait... </div>
                    </div>
                )
            }
            if ( getAllGLAccountsRequest.request_status === accountingConstants.GET_ALL_GLACCOUNTS_SUCCESS
                && getAllDepositProductsRequest.request_status===productsConstants.GET_ALL_DEPOSIT_PRODUCTS_SUCCESS){
                let allGlAccounts = [],
                    glAccountsList;
                
                let allDepositProducts = getAllDepositProductsRequest.request_data.response.data,
                    allDepositProductsList      =[
                        {
                            label: "ANY",
                            value: "ANY"
                        }
                    ];
                
                allDepositProducts.map((product, id)=>{
                    allDepositProductsList.push({label: product.productName, value:product.productEncodedKey});
                })
                    

                if(getAllGLAccountsRequest.request_data.response.data.length>=0){
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
                        

                        // public enum SettlementOptions
                        // {
                        //     No_Automated_Transfers = 0,
                        //     Allow_Partial_Transfers = 1,
                        //     Only_Transfer_Full_Due = 2
                    
                        // }
                    return(
                        
                            <Formik
                            initialValues={{
                                key: '',
                                productName: '',
                                loanProductType: '',
                                description: '',
                                portfolioControlAccountId: null,
                                transactionSourceAccountId: null,
                                writeOffExpenseAccountId: null,
                                interestReceivableAccountId: null,
                                feeReceivableAccountId: null,
                                penaltyReceivableAccountId: null,
                                feeIncomeAccountId: null,
                                interestIncomeAccountId: null,
                                penaltyIncomeAccountId: null,
                                arearsTolerancePeriodInDaysDefault:null,
                                arearsTolerancePeriodInDaysMin:null,
                                arearsTolerancePeriodInDaysMax:null,
                                arrearsDaysCalculationChosen:null,
                                defaultLoanAmount:null,
                                minimumLoanAmount:null,
                                maximumLoanAmount:null,
                                methodology: '0',
                                isActive: true,
                                interestPaid:true,
                                interestRateTerms:null,
                                interestBalanceCalculation:null,
                                interestRateDefault:null,
                                interestRateMin:null,
                                interestRateMax:null,
                                repaymentEvery:'',
                                repaymentPeriod:'',
                                interestBalanceCalculationSelected:null,
                                firstDueDateOffsetConstraintDefault:null,
                                firstDueDateOffsetConstraintMin:null,
                                firstDueDateOffsetConstraintMax:null,
                                installmentsDefault:null,
                                installmentsMin:null,
                                installmentsMax:null,
                                collectPrincipalEveryRepayments:'',
                                isEnableLinking:false,
                                depositProductEncodedKey:allDepositProductsList!==null?allDepositProductsList[0].value:null,
                                settlementOptions:0, 
                                autoSetSettlementAccountOnCreation:false,
                                autoCreateSettlementAccount: false
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
                                        portfolioControlAccountId: values.portfolioControlAccountId!==null? parseInt(values.portfolioControlAccountId): null,
                                        transactionSourceAccountId: values.transactionSourceAccountId!==null? parseInt(values.transactionSourceAccountId) : null,
                                        writeOffExpenseAccountId: values.writeOffExpenseAccountId!==null? parseInt(values.writeOffExpenseAccountId): null,
                                        interestReceivableAccountId: values.interestReceivableAccountId!==null? parseInt(values.interestReceivableAccountId): null,
                                        feeReceivableAccountId: values.feeReceivableAccountId!==null ? parseInt(values.feeReceivableAccountId) : null,
                                        penaltyReceivableAccountId:values.penaltyReceivableAccountId!==null? parseInt(values.penaltyReceivableAccountId): null,
                                        feeIncomeAccountId: values.feeIncomeAccountId!==null? parseInt(values.feeIncomeAccountId) : null,
                                        interestIncomeAccountId: values.interestIncomeAccountId!==null? parseInt(values.interestIncomeAccountId) : null,
                                        penaltyIncomeAccountId: values.penaltyIncomeAccountId!==null ? parseInt(values.penaltyIncomeAccountId) : null,
                                    },
                                    arrearsSetting: {
                                        arearsTolerancePeriodInDaysDefault: values.arearsTolerancePeriodInDaysDefault!==null ? parseInt(values.arearsTolerancePeriodInDaysDefault) : null,
                                        arrearsDaysCalculatedFrom: values.arrearsDaysCalculationChosen!==null? parseInt(values.arrearsDaysCalculationChosen) : null,
                                        arearsTolerancePeriodInDaysMin: values.arearsTolerancePeriodInDaysMin!==null? parseInt(values.arearsTolerancePeriodInDaysMin.replace(/,/g, '')): null,
                                        arearsTolerancePeriodInDaysMax:values.arearsTolerancePeriodInDaysMax!==null ? parseInt(values.arearsTolerancePeriodInDaysMax.replace(/,/g, '')) : null,
                                    },
                                    loanProductInterestSetting: {
                                        interestPaid: values.interestPaid!==null ?  values.interestPaid : null,
                                        interestRateTerms:values.interestRateTerms!==null? parseInt(values.interestRateTerms) : null,
                                        interestBalanceCalculation:values.interestBalanceCalculation!==null?  parseInt(values.interestBalanceCalculation) : null,
                                        interestRateDefault:values.interestRateDefault!==null? parseFloat(values.interestRateDefault.replace(/,/g, '')): null,
                                        interestRateMin: values.interestRateMin!==null ? parseFloat(values.interestRateMin.replace(/,/g, '')) : null,
                                        interestRateMax: values.interestRateMax!==null ? parseFloat(values.interestRateMax.replace(/,/g, '')) : null,
                                      },
                                    loanAmountSetting: {
                                        loanAmountDefault:values.defaultLoanAmount!==null ? parseFloat(values.defaultLoanAmount.replace(/,/g, '')) : null,
                                        loanAmountMinimun:values.minimumLoanAmount!==null? parseFloat(values.minimumLoanAmount.replace(/,/g, '')) : null,
                                        loanAmountMaximum: values.maximumLoanAmount!==null? parseFloat(values.maximumLoanAmount.replace(/,/g, '')) : null
                                    },

                                    repaymentReschedulingModel: {
                                        repaymentEvery:values.repaymentEvery!==null ? parseInt(values.repaymentEvery) : null,
                                        repaymentPeriod: values.repaymentPeriod!==null?  parseInt(values.repaymentPeriod) : null,
                                        interestBalanceCalculation: values.interestBalanceCalculationSelected!==null? parseInt(values.interestBalanceCalculationSelected) : null,
                                        firstDueDateOffsetConstraintDefault: values.firstDueDateOffsetConstraintDefault!==null? parseInt(values.firstDueDateOffsetConstraintDefault.replace(/,/g, '')): null,
                                        firstDueDateOffsetConstraintMin: values.firstDueDateOffsetConstraintMin!==null ? parseInt(values.firstDueDateOffsetConstraintMin.replace(/,/g, '')) : null,
                                        firstDueDateOffsetConstraintMax: values.firstDueDateOffsetConstraintMax!==null? parseInt(values.firstDueDateOffsetConstraintMax.replace(/,/g, '')): null,
                                        installmentsDefault: values.installmentsDefault!==null? parseFloat(values.installmentsDefault.replace(/,/g, '')) : null,
                                        installmentsMin: values.installmentsMin!==null ? parseFloat(values.installmentsMin.replace(/,/g, '')): null,
                                        installmentsMax: values.installmentsMax!==null ? parseFloat(values.installmentsMax.replace(/,/g, '')) : null,
                                        collectPrincipalEveryRepayments: values.collectPrincipalEveryRepayments!==null? parseInt(values.collectPrincipalEveryRepayments) : null
                                    },

                                    methodology: parseInt(values.methodology),
                                    isActive: values.isActive
                                    
                                }


                                if(values.isEnableLinking===false){
                                    createNewLoanProductPayload.loanProductLinkModel={
                                        enableLinking: false,
                                        depositProductEncodedKey: null,
                                        settlementOptions: null,
                                        autoSetSettlementAccountOnCreation: null,
                                        autoCreateSettlementAccount: null
                                    }
                                }

                                if(values.isEnableLinking===true){
                                    createNewLoanProductPayload.loanProductLinkModel={
                                        enableLinking: true,
                                        depositProductEncodedKey: values.depositProductEncodedKey,
                                        settlementOptions: values.settlementOptions,
                                        autoSetSettlementAccountOnCreation: values.autoSetSettlementAccountOnCreation,
                                        autoCreateSettlementAccount: values.autoCreateSettlementAccount
                                    }
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
                                        Product Links
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div className="each-formsection">
                                            <Form.Row>
                                                <Col>
                                                    <div className="checkbox-wrap">
                                                        <input type="checkbox"
                                                            id="isEnableLinking"
                                                            checked={values.isEnableLinking ? values.isEnableLinking : null}
                                                            name="isEnableLinking"
                                                            onChange={handleChange}
                                                            value={values.isEnableLinking} />
                                                        <label htmlFor="isEnableLinking">Enable Linking</label>
                                                    </div>
                                                </Col>
                                            </Form.Row>
                                            {values.isEnableLinking===true &&
                                                <div>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Linked Deposit Product</Form.Label>
                                                            <Select
                                                                options={allDepositProductsList}
                                                                defaultValue ={{label:allDepositProductsList!==null?allDepositProductsList[0].label:null, 
                                                                    value:allDepositProductsList!==null? allDepositProductsList[0].value:null}}
                                                                onChange={(selectedDepositProduct) => {
                                                                    setFieldValue('depositProductEncodedKey', selectedDepositProduct.value)
                                                                }}
                                                                className={errors.depositProductEncodedKey && touched.depositProductEncodedKey ? "is-invalid" : null}


                                                                name="depositProductEncodedKey"

                                                                required
                                                            />
                                                            {errors.depositProductEncodedKey && touched.depositProductEncodedKey ? (
                                                                <span className="invalid-feedback">{errors.depositProductEncodedKey}</span>
                                                            ) : null}
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">Deposit Account Options</Form.Label>
                                                            <div className="checkbox-wrap">
                                                                <input type="checkbox"
                                                                    id="autoSetSettlementAccountOnCreation"
                                                                    checked={values.autoSetSettlementAccountOnCreation ? values.autoSetSettlementAccountOnCreation : null}
                                                                    name="autoSetSettlementAccountOnCreation"
                                                                    onChange={handleChange}
                                                                    value={values.autoSetSettlementAccountOnCreation} />
                                                                <label htmlFor="autoSetSettlementAccountOnCreation">Auto-Set Settlement Accounts on Creation</label>
                                                            </div>
                                                            <div className="checkbox-wrap">
                                                                <input type="checkbox"
                                                                    id="autoCreateSettlementAccount"
                                                                    checked={values.autoCreateSettlementAccount ? values.autoCreateSettlementAccount : null}
                                                                    name="autoCreateSettlementAccount"
                                                                    onChange={handleChange}
                                                                    value={values.autoCreateSettlementAccount} />
                                                                <label htmlFor="autoCreateSettlementAccount">Auto-Create Settlement Account</label>
                                                            </div>
                                                            
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                        <Form.Label className="block-level">Settlement Options</Form.Label>
                                                            <Select
                                                                options={settlementOptionsList}
                                                                onChange={(selectedsettlementOption) => {
                                                                    
                                                                    setFieldValue('settlementOptions', selectedsettlementOption.value)
                                                                }}
                                                                defaultValue={{label:settlementOptionsList[0].label, value: settlementOptionsList[0].value}}
                                                                className={errors.settlementOptions && touched.settlementOptions ? "is-invalid" : null}


                                                                name="settlementOptions"

                                                                required
                                                            />
                                                            {errors.settlementOptions && touched.settlementOptions ? (
                                                                <span className="invalid-feedback">{errors.settlementOptions}</span>
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
                                            <div>
                                            { values.methodology!=="0" && 
                                                    <div>
                                                        <Form.Group as={Row} className="center-aligned">
                                                            <Form.Label column sm={4} className="block-level">Portfolio Control Account</Form.Label>
                                                            <Col sm={6}>
                                                                
                                                                <Select
                                                                    options={portfolioControlAccounts}
                                                                    onChange={(selectedPortfolioAcct) => {
                                                                        

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
                                            }
                                            </div>
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
            }

            if (getAllGLAccountsRequest.request_status ===  accountingConstants.GET_ALL_GLACCOUNTS_FAILURE){
                return (
                    <div className="loading-content card"> 
                        <div>{getAllGLAccountsRequest.request_data.error}</div>
                    </div>
                )
            }

            if(getAllDepositProductsRequest.request_status===productsConstants.GET_ALL_DEPOSIT_PRODUCTS_FAILURE){
                return (
                    <div className="loading-content card"> 
                        <div>{getAllDepositProductsRequest.request_data.error}</div>
                    </div>
                )
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
        getAllDepositProductsReducer : state.productReducers.getAllDepositProductsReducer,
    };
}


export default connect(mapStateToProps)(NewLoanProduct);