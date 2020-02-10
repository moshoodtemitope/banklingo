import * as React from "react";
// import {Router} from "react-router";
import { connect } from 'react-redux';
import {Fragment} from "react";
import AdminNav from './_menu'

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'
import Select from 'react-select';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Formik } from 'formik';
import * as Yup from 'yup';

import {acoountingActions} from '../../redux/actions/accounting/accounting.action';
import {accountingConstants} from '../../redux/actiontypes/accounting/accounting.constants'

import Alert from 'react-bootstrap/Alert'
import { productActions } from '../../redux/actions/products/products.action';
import { productsConstants } from '../../redux/actiontypes/products/products.constants'
import "./administration.scss"; 
class NewDepositsProduct extends React.Component {
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

    handleCreateNewDepositProduct = async(newDepositProductPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(productActions.createDepositProduct(newDepositProductPayload));

    }


    renderCreateDepositProduct =()=>{
        let createDepositProductRequest = this.props.createDepositProductReducer,
            getAllGLAccountsRequest = this.props.getAllGLAccountsReducer;

        let depositProductValidationSchema = Yup.object().shape({
            key: Yup.string()
                .min(1, 'Response required')
                .required('Required'),
            productName:  Yup.string()
                .min(2, 'Valid response required')
                .required('Required'),
            depositAccountType:  Yup.string()
                .min(5, 'Valid response required')
                .required('Required'),
          });

        let allProductTypes =[
            {value: '1', label: 'Current Account'},
            {value: '2', label: 'Fixed Deposit'},
            {value: '3', label: 'Funding Account'},
            {value: '4', label: 'Savings Account'},
            {value: '5', label: 'Savings Plan'},
        ];

        let methodologyList =[
            {value: '0', label: 'None'},
            {value: '1', label: 'Cash'},
            {value: '2', label: 'Accrual'},
        ];


        let interestRateTerms =[
            {value: 1, label: '% per year'},
            {value: 2, label: '% per month'},
            {value: 3, label: '% per 4 weeks'},
            {value: 4, label: '% per week'},
            {value: 5, label: '% per x days'},
        ];

        let interestBalanceCalculations =[
            {value: '1', label: 'Minimum Daily Balance'},
            {value: '2', label: 'Maximum Daily Balance'},
            {value: '3', label: 'End of Day Balance'},
        ];


        let interestAccruedMethodList =[
            {value: '1', label: 'Daily'},
            {value: '2', label: 'Monthly'},
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
                    let savingsControlAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===1),
                        transactionSourceAccount =allGlAccounts.filter(glAccount=>glAccount.accType===1),
                        interestExpenseAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===5),
                        interestReceivableAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===1),
                        feeReceivableAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===1),
                        penaltyReceivableAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===1),
                        feeIncomeAccounts =[];
                        // interestIncomeAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===4),
                        // penaltyIncomeAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===4);
                        // console.log("+++++", penaltyIncomeAccounts)
                    return(
                        
                            <Formik
                            initialValues={{
                                key: '',
                                productName: '',
                                depositAccountType: '',
                                description: '',
                                savingsControlAccountId: '',
                                transactionSourceAccountId: '',
                                interestExpenseAccountId: '',
                                feeIncomeAccountId: '',
                                interestAccruedMethod: '',
                                methodology: 0,
                                isActive: true,
                                currencyCode:'',
                                automaticallySetAccountAsDormant:false,
                                dormancyAfterXDays:'',
                                // interestAccruedMethod:'',
                                maximumWithdrawalAmount:'',
                                recommendedDepositAmount:'',
                                interestPaid:true,
                                interestRateTerms:'',
                                interestBalanceCalculation:'',
                                interestRateDefault:'',
                                interestRateMin:'',
                                interestRateMax:'',
                                xInterestDays:'',
                                defaultOpeningBalance:'',
                                minimumOpeningBalance:'',
                                maxmimumOpeningBalance:'',
                                term:'',
                                defaultTermLength:'',
                                minimumTermLength:'',
                                maxmimumTermLength:'',
                            }}

                            validationSchema={depositProductValidationSchema}
                            onSubmit={(values, { resetForm }) => {

                                let createNewDepositProductPayload = {
                                    key: values.key,
                                    productName: values.productName,
                                    depositAccountType: values.depositAccountType,
                                    description: values.description,
                                    depositProductAccountingRule:{
                                        savingsControlAccountId: values.savingsControlAccountId,
                                        transactionSourceAccountId: values.transactionSourceAccountId,
                                        interestExpenseAccountId: values.interestExpenseAccountId,
                                        feeIncomeAccountId: values.feeIncomeAccountId,
                                        interestAccruedMethod: values.interestAccruedMethod,
                                    },
                                    methodology: values.methodology,
                                    isActive: values.isActive,
                                    currencyCode: values.currencyCode,
                                    automaticallySetAccountAsDormant: values.automaticallySetAccountAsDormant,
                                    dormancyAfterXDays: values.dormancyAfterXDays,
                                    interestAccruedMethod: values.interestAccruedMethod,
                                    depositSavingsSettingModel:{
                                        maximumWithdrawalAmount: values.maximumWithdrawalAmount,
                                        recommendedDepositAmount: values.recommendedDepositAmount,
                                    },
                                    depositProductInterestSettingModel:{
                                        interestPaid: values.interestPaid,
                                        interestRateTerms: values.interestRateTerms,
                                        interestBalanceCalculation: values.interestBalanceCalculation,
                                        interestRateDefault: values.interestRateDefault,
                                        interestRateMin: values.interestRateMin,
                                        interestRateMax: values.interestRateMax,
                                        xInterestDays: values.xInterestDays,
                                    },
                                    depositFixedSettingModel:{
                                        defaultOpeningBalance: values.defaultOpeningBalance,
                                        minimumOpeningBalance: values.minimumOpeningBalance,
                                        maxmimumOpeningBalance: values.maxmimumOpeningBalance,
                                        term: values.term,
                                        defaultTermLength: values.defaultTermLength,
                                        minimumTermLength: values.minimumTermLength,
                                        maxmimumTermLength: values.maxmimumTermLength,
                                    },
                                    
                                }



                                this.handleCreateNewDepositProduct(createNewDepositProductPayload)
                                    .then(
                                        () => {

                                            if (this.props.createDepositProductReducer.request_status === productsConstants.CREATE_A_DEPOSIT_PRODUCT_SUCCESS) {
                                                setTimeout(() => {
                                                    resetForm();
                                                    this.props.dispatch(productActions.createDepositProduct("CLEAR"))
                                                }, 3000);
                                            }else{
                                                setTimeout(() => {
                                                    this.props.dispatch(productActions.createDepositProduct("CLEAR"))
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
                                isValid,
                                errors, }) => (
                            <Form 
                                noValidate 
                                onSubmit={handleSubmit}
                                className="form-content card">
                                <div className="form-heading">
                                    <h3>Create A New Deposit Product</h3>
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
                                            value={values.key}
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
                                                this.setState({ selectedProductType });
                                                errors.depositAccountType = null
                                                values.depositAccountType = selectedProductType.value
                                            }}
                                            className={errors.depositAccountType && touched.depositAccountType ? "is-invalid" : null}
                                            
                                            
                                            name="depositAccountType"
                                            
                                            required
                                        />
                                        {errors.depositAccountType && touched.depositAccountType ? (
                                            <span className="invalid-feedback">{errors.depositAccountType}</span>
                                        ) : null}
                                    </Col>
                                    <Col>
                                    </Col>
                                </Form.Row>
                                
                                

                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Deposit Product Description
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
                                        Deposit Product Rules
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Savings Control Account</Form.Label>
                                                    <Select
                                                        options={savingsControlAccounts}
                                                        onChange={(selectedSavingsControlAcct) => {
                                                            this.setState({ selectedSavingsControlAcct });
                                                            errors.savingsControlAccountId = null
                                                            values.savingsControlAccountId = selectedSavingsControlAcct.value
                                                        }}
                                                        className={errors.savingsControlAccountId && touched.savingsControlAccountId ? "is-invalid" : null}
                                                        
                                                        noOptionsMessage ={() => "No accounts available"}
                                                        name="savingsControlAccountId"
                                                        
                                                        
                                                    />
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Transaction Source Account</Form.Label>
                                                    <Select
                                                        options={transactionSourceAccount}
                                                        onChange={(selectedTxtSourceAcct) => {
                                                            this.setState({ selectedTxtSourceAcct });
                                                            errors.transactionSourceAccountId = null
                                                            values.transactionSourceAccountId = selectedTxtSourceAcct.value
                                                        }}
                                                        className={errors.transactionSourceAccountId && touched.transactionSourceAccountId ? "is-invalid" : null}
                                                        noOptionsMessage ={() => "No accounts available"}
                                                        
                                                        name="transactionSourceAccountId"
                                                        
                                                        
                                                    />
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Interest Expense Account</Form.Label>
                                                    <Select
                                                        options={interestExpenseAccounts}
                                                        onChange={(selectedInterestExpenseAccount) => {
                                                            this.setState({ selectedInterestExpenseAccount });
                                                            errors.interestExpenseAccountId = null
                                                            values.interestExpenseAccountId = selectedInterestExpenseAccount.value
                                                        }}
                                                        className={errors.interestExpenseAccountId && touched.interestExpenseAccountId ? "is-invalid" : null}
                                                        noOptionsMessage ={() => "No accounts available"}
                                                        
                                                        name="interestExpenseAccountId"
                                                        
                                                        
                                                    />
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Fee Income Account</Form.Label>
                                                    <Select
                                                        options={allGlAccounts}
                                                        onChange={(selectedFeeIncomeAcct) => {
                                                            this.setState({ selectedFeeIncomeAcct });
                                                            errors.feeIncomeAccountId = null
                                                            values.feeIncomeAccountId = selectedFeeIncomeAcct.value
                                                        }}
                                                        className={errors.feeIncomeAccountId && touched.feeIncomeAccountId ? "is-invalid" : null}
                                                        noOptionsMessage ={() => "No accounts available"}
                                                        
                                                        name="feeIncomeAccountId"
                                                        
                                                        
                                                    />
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Interest Accrued Method</Form.Label>
                                                    <Select
                                                        options={interestAccruedMethodList}
                                                        onChange={(selectedInterestAccruedMethod) => {
                                                            this.setState({ selectedInterestAccruedMethod });
                                                            errors.interestAccruedMethod = null
                                                            values.interestAccruedMethod = selectedInterestAccruedMethod.value
                                                        }}
                                                        className={errors.interestAccruedMethod && touched.interestAccruedMethod ? "is-invalid" : null}
                                                        name="interestAccruedMethod"
                                                        
                                                        
                                                    />
                                                </Col>
                                                <Col></Col>
                                            </Form.Row>
                                            
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Deposit Savings Settings
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Maximum Withdrawal Amount</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.maximumWithdrawalAmount}
                                                        className={errors.maximumWithdrawalAmount && touched.maximumWithdrawalAmount ? "is-invalid" : null}
                                                        name="maximumWithdrawalAmount"  />
                                                    {errors.maximumWithdrawalAmount && touched.maximumWithdrawalAmount ? (
                                                        <span className="invalid-feedback">{errors.maximumWithdrawalAmount}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Recommended Deposit Amount</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.recommendedDepositAmount}
                                                        className={errors.recommendedDepositAmount && touched.recommendedDepositAmount ? "is-invalid" : null}
                                                        name="recommendedDepositAmount" />
                                                    {errors.recommendedDepositAmount && touched.recommendedDepositAmount ? (
                                                        <span className="invalid-feedback">{errors.recommendedDepositAmount}</span>
                                                    ) : null}
                                                </Col>
                                               
                                            </Form.Row>
                                            
                                            
                                            
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Deposit Product Interest Settings
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            <Form.Row>
                                                <Col>
                                                    <div className="checkbox-wrap">
                                                        <input type="checkbox" 
                                                            id="interestPaid" 
                                                            checked={values.interestPaid? values.interestPaid:null}
                                                            name="interestPaid"
                                                            onChange={handleChange} 
                                                            value={values.interestPaid}  />
                                                        <label htmlFor="interestPaid">Is interest paid</label>
                                                    </div>
                                                </Col>
                                               
                                            </Form.Row>
                                            {values.interestPaid===true &&
                                                <div>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Interest rate terms</Form.Label>
                                                            <Select
                                                                options={interestRateTerms}
                                                                onChange={(selectedInterestRateTerm) => {
                                                                    this.setState({ selectedInterestRateTerm });
                                                                    errors.interestRateTerms = null
                                                                    values.interestRateTerms = selectedInterestRateTerm.value
                                                                }}
                                                                className={errors.interestRateTerms && touched.interestRateTerms ? "is-invalid" : null}
                                                                // noOptionsMessage ={() => "No accounts available"}
                                                                
                                                                name="interestRateTerms"
                                                                
                                                                
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">Interest Balance Calculation</Form.Label>
                                                            <Select
                                                                options={interestBalanceCalculations}
                                                                onChange={(selectedBalanceCalculation) => {
                                                                    this.setState({ selectedBalanceCalculation });
                                                                    errors.interestBalanceCalculation = null
                                                                    values.interestBalanceCalculation = selectedBalanceCalculation.value
                                                                }}
                                                                className={errors.interestBalanceCalculation && touched.interestBalanceCalculation ? "is-invalid" : null}
                                                                // noOptionsMessage ={() => "No accounts available"}
                                                                
                                                                name="interestBalanceCalculation"
                                                                
                                                                
                                                            />
                                                        </Col>
                                                        
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Interest Rate Default</Form.Label>
                                                            <Form.Control 
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={values.interestRateDefault}
                                                                className={errors.interestRateDefault && touched.interestRateDefault ? "is-invalid" : null}
                                                                name="interestRateDefault"  />
                                                            {errors.interestRateDefault && touched.interestRateDefault ? (
                                                                <span className="invalid-feedback">{errors.interestRateDefault}</span>
                                                            ) : null}
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">Interest Rate Min</Form.Label>
                                                            <Form.Control 
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={values.interestRateMin}
                                                                className={errors.interestRateMin && touched.interestRateMin ? "is-invalid" : null}
                                                                name="interestRateMin"  />
                                                            {errors.interestRateMin && touched.interestRateMin ? (
                                                                <span className="invalid-feedback">{errors.interestRateMin}</span>
                                                            ) : null}
                                                        </Col>

                                                        

                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Interest Rate Max</Form.Label>
                                                            <Form.Control 
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={values.interestRateMax}
                                                                className={errors.interestRateMax && touched.interestRateMax ? "is-invalid" : null}
                                                                name="interestRateMax"  />
                                                            {errors.interestRateMax && touched.interestRateMax ? (
                                                                <span className="invalid-feedback">{errors.interestRateMax}</span>
                                                            ) : null}
                                                        </Col>
                                                        {values.interestRateTerms!==5 && 
                                                            <Col>
                                                            </Col>
                                                        }
                                                        {values.interestRateTerms===5  &&
                                                        <Col>
                                                            <Form.Label className="block-level">Number of Interest Days</Form.Label>
                                                            <Form.Control 
                                                                type="text"
                                                                onChange={handleChange}
                                                                value={values.xInterestDays}
                                                                className={errors.xInterestDays && touched.xInterestDays ? "is-invalid" : null}
                                                                name="xInterestDays"  />
                                                            {errors.xInterestDays && touched.xInterestDays ? (
                                                                <span className="invalid-feedback">{errors.xInterestDays}</span>
                                                            ) : null}
                                                        </Col>
                                                        }

                                                    </Form.Row>
                                                </div>
                                            }
                                            
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>

                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Deposit Fixed Settings
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Default Opening Balance</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.defaultOpeningBalance}
                                                        className={errors.defaultOpeningBalance && touched.defaultOpeningBalance ? "is-invalid" : null}
                                                        name="defaultOpeningBalance"  />
                                                    {errors.defaultOpeningBalance && touched.defaultOpeningBalance ? (
                                                        <span className="invalid-feedback">{errors.defaultOpeningBalance}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Minimum Opening Balance</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.minimumOpeningBalance}
                                                        className={errors.minimumOpeningBalance && touched.minimumOpeningBalance ? "is-invalid" : null}
                                                        name="minimumOpeningBalance"  />
                                                    {errors.minimumOpeningBalance && touched.minimumOpeningBalance ? (
                                                        <span className="invalid-feedback">{errors.minimumOpeningBalance}</span>
                                                    ) : null}
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Maximum Opening Balance</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.maxmimumOpeningBalance}
                                                        className={errors.maxmimumOpeningBalance && touched.maxmimumOpeningBalance ? "is-invalid" : null}
                                                        name="maxmimumOpeningBalance"  />
                                                    {errors.maxmimumOpeningBalance && touched.maxmimumOpeningBalance ? (
                                                        <span className="invalid-feedback">{errors.maxmimumOpeningBalance}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Term</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.term}
                                                        className={errors.term && touched.term ? "is-invalid" : null}
                                                        name="term"  />
                                                    {errors.term && touched.term ? (
                                                        <span className="invalid-feedback">{errors.term}</span>
                                                    ) : null}
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Default Term Length</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.defaultTermLength}
                                                        className={errors.defaultTermLength && touched.defaultTermLength ? "is-invalid" : null}
                                                        name="defaultTermLength"  />
                                                    {errors.defaultTermLength && touched.defaultTermLength ? (
                                                        <span className="invalid-feedback">{errors.defaultTermLength}</span>
                                                    ) : null}
                                                </Col>

                                                <Col>
                                                    <Form.Label className="block-level">Minimum Term Length</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.minimumTermLength}
                                                        className={errors.minimumTermLength && touched.minimumTermLength ? "is-invalid" : null}
                                                        name="minimumTermLength"  />
                                                    {errors.minimumTermLength && touched.minimumTermLength ? (
                                                        <span className="invalid-feedback">{errors.minimumTermLength}</span>
                                                    ) : null}
                                                </Col>

                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Maxmimum Term Length</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.maxmimumTermLength}
                                                        className={errors.maxmimumTermLength && touched.maxmimumTermLength ? "is-invalid" : null}
                                                        name="maxmimumTermLength"  />
                                                    {errors.maxmimumTermLength && touched.maxmimumTermLength ? (
                                                        <span className="invalid-feedback">{errors.maxmimumTermLength}</span>
                                                    ) : null}
                                                </Col>

                                                <Col>
                                                </Col>

                                            </Form.Row>
                                            
                                            
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>
                                <Form.Row>
                                    <Col>
                                        <Form.Label className="block-level">Methodology</Form.Label>
                                        <Select
                                            options={methodologyList}
                                            onChange={(selectedMethodology) => {
                                                this.setState({ selectedMethodology });
                                                errors.methodology = null
                                                values.methodology = selectedMethodology.value
                                            }}
                                            className={errors.methodology && touched.methodology ? "is-invalid" : null}
                                            
                                            
                                            name="methodology"
                                            
                                            
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Label className="block-level">Currency</Form.Label>
                                        <Select
                                            options={methodologyList}
                                            onChange={(selectedMethodology) => {
                                                this.setState({ selectedMethodology });
                                                errors.methodology = null
                                                values.methodology = selectedMethodology.value
                                            }}
                                            className={errors.methodology && touched.methodology ? "is-invalid" : null}
                                            
                                            
                                            name="methodology"
                                            
                                            
                                        />
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    <Col>
                                        <div className="checkbox-wrap">
                                            <input type="checkbox" 
                                                id="automaticallySetAccountAsDormant" 
                                                checked={values.automaticallySetAccountAsDormant? values.automaticallySetAccountAsDormant:null}
                                                name="automaticallySetAccountAsDormant"
                                                onChange={handleChange} 
                                                value={values.automaticallySetAccountAsDormant}  />
                                            <label htmlFor="automaticallySetAccountAsDormant">Automatically set account as dormant</label>
                                        </div>
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
                                        <Form.Label className="block-level">Interest Accrued Method</Form.Label>
                                        <Select
                                            options={interestAccruedMethodList}
                                            onChange={(selectedInterestAccruedMethod) => {
                                                this.setState({ selectedInterestAccruedMethod });
                                                errors.interestAccruedMethod = null
                                                values.interestAccruedMethod = selectedInterestAccruedMethod.value
                                            }}
                                            className={errors.interestAccruedMethod && touched.interestAccruedMethod ? "is-invalid" : null}
                                            name="interestAccruedMethod"
                                            
                                            
                                        />
                                    </Col>
                                </Form.Row>
                                <Form.Row>
                                    
                                    <Col>
                                        {values.automaticallySetAccountAsDormant===true && 
                                            <div>
                                                <Form.Label className="block-level">Dormant after how many days</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.dormancyAfterXDays}
                                                    className={errors.dormancyAfterXDays && touched.dormancyAfterXDays ? "is-invalid" : null}
                                                    name="dormancyAfterXDays"  />
                                                {errors.dormancyAfterXDays && touched.dormancyAfterXDays ? (
                                                    <span className="invalid-feedback">{errors.dormancyAfterXDays}</span>
                                                ) : null}
                                            </div>
                                        }
                                        
                                    </Col>
                                    <Col></Col>
                                </Form.Row>

                            





                                <div className="footer-with-cta toleft">
                                    
                                    <NavLink to={'/administration/products'} className="btn btn-secondary grayed-out">Cancel</NavLink>
                                    <Button
                                        type="submit"
                                        disabled={createDepositProductRequest.is_request_processing}>
                                        {createDepositProductRequest.is_request_processing?"Please wait...": "Save Product"}
                                    </Button>
                                </div>
                                {createDepositProductRequest.request_status === productsConstants.CREATE_A_DEPOSIT_PRODUCT_SUCCESS && 
                                    <Alert variant="success">
                                        {createDepositProductRequest.request_data.response.data.message}
                                    </Alert>
                                }
                                {createDepositProductRequest.request_status === productsConstants.CREATE_A_DEPOSIT_PRODUCT_FAILURE && 
                                    <Alert variant="danger">
                                        {createDepositProductRequest.request_data.error}
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
                                                {this.renderCreateDepositProduct()}
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
        createDepositProductReducer : state.productReducers.createDepositProductReducer,
        getAllGLAccountsReducer : state.accountingReducers.getAllGLAccountsReducer,
    };
}


export default connect(mapStateToProps)(NewDepositsProduct);