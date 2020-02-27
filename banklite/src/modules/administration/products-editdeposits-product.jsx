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
import Row from 'react-bootstrap/Row'

import { Formik } from 'formik';
import * as Yup from 'yup';

import {acoountingActions} from '../../redux/actions/accounting/accounting.action';
import {accountingConstants} from '../../redux/actiontypes/accounting/accounting.constants'

import { numberWithCommas, allowNumbersOnly} from '../../shared/utils';
import Alert from 'react-bootstrap/Alert'
import { productActions } from '../../redux/actions/products/products.action';
import { productsConstants } from '../../redux/actiontypes/products/products.constants'

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'


import {noWhiteSpaces} from "../../shared/utils"
import "./administration.scss"; 
class EditADepositsProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            typeDesc:null
        }
        this.productDesc ="";

    }

    componentDidMount(){
        this.getAllGLAccounts();
        this.getAllCurrencies();
        
        this.getADepositProduct(this.props.match.params.encodedKey)
     }

    getAllGLAccounts = () =>{
        const {dispatch} = this.props;

        dispatch(acoountingActions.getAllGLAccounts());
    }

    getADepositProduct =  (encodedKey)=>{
        const {dispatch} = this.props;
       
        
         dispatch(productActions.getSingleDepositProduct(encodedKey));
    }

    getAllCurrencies = (tempData) =>{
        const {dispatch} = this.props;
        if(tempData){
            dispatch(administrationActions.getAllCurrencies(tempData));
        }else{
            dispatch(administrationActions.getAllCurrencies());
        }
    }

    handleUpdateDepositProduct = async(updateDepositProductPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(productActions.updateDespositProduct(updateDepositProductPayload, this.props.match.params.encodedKey));

    }


    renderEditDepositProduct =()=>{
        let updateDepositProductRequest = this.props.updateDepositProductReducer,
            getAllGLAccountsRequest = this.props.getAllGLAccountsReducer,
            getSingleDepositProductsRequest =  this.props.getSingleDepositProductsReducer,
            getAllCurrencies =  this.props.adminGetAllCurrencies;

        let depositProductValidationSchema = Yup.object().shape({
            key: Yup.string()
                .min(1, 'Response required')
                .required('Required'),
            productName:  Yup.string()
                .min(2, 'Valid response required')
                .required('Required'),
            depositAccountType:  Yup.string()
                .min(1, 'Valid response required')
                .required('Required'),
          });

        let allProductTypes =[
            {   value: '1', 
                label: 'Current Account', 
                desc:   'A transactional account where a customer may perform regular deposit and withdrawals, accrue interest and may optionally be allowed to go into overdraft.'
            },
            {   value: '2', 
                label: 'Fixed Deposit',
                desc:   'A type of deposit where an account is being opened with a certain balance and is fixed for a certain time period with a given interest rate after which point the customer may withdraw their money.'
            },
            {   value: '3', 
                label: 'Funding Account',
                desc:   'A type of account used for investing funds in other borrowers loan accounts. The customer earns interest after loan investments, instead of the traditional interest paid into account by the organization.'
            },
            {   value: '4', 
                label: 'Savings Account',
                desc:   'A standard savings account where a customer may perform regular deposit and withdrawals and accrue interest over time.'
            },
            {   value: '5', 
                label: 'Savings Plan',
                desc:   'A type of deposit product with a maturity before which withdrawals cannot be made. Ideally, a certain amount is deposited into the account at regular interval to reach a deposit goal.'
            },
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
        
        // switch(getAllGLAccountsRequest.request_status){
            if (getAllGLAccountsRequest.request_status ===accountingConstants.GET_ALL_GLACCOUNTS_PENDING ||
                getAllCurrencies.request_status === administrationConstants.GET_ALLCURRENCIES_PENDING ||
                getSingleDepositProductsRequest.request_status ===productsConstants.GET_A_DEPOSIT_PRODUCT_PENDING){
                return (
                    <div className="loading-content card"> 
                        <div className="loading-text">Please wait... </div>
                    </div>
                )
            }
            if (getAllGLAccountsRequest.request_status === accountingConstants.GET_ALL_GLACCOUNTS_SUCCESS &&
                getAllCurrencies.request_status === administrationConstants.GET_ALLCURRENCIES_SUCCESS &&
                getSingleDepositProductsRequest.request_status ===productsConstants.GET_A_DEPOSIT_PRODUCT_SUCCESS){
                    let allGlAccounts = [],
                        allCurrencies = [],
                        glAccountsList,
                        currenciesList,
                        depositProductDetails;
                        

                        

                    if(getAllGLAccountsRequest.request_data.response.data.length>=1 &&
                        getAllCurrencies.request_data.response.data.length>=1){

                        glAccountsList= getAllGLAccountsRequest.request_data.response.data;
                        currenciesList = getAllCurrencies.request_data.response.data;
                        depositProductDetails = getSingleDepositProductsRequest.request_data.response.data;

                        
                        let productTypeSelect =allProductTypes.filter(eachType=>parseInt(eachType.value)===depositProductDetails.depositAccountType)[0];
                        this.productDesc= productTypeSelect.desc;
                        
                        let rateTerms = interestRateTerms.filter(eachTerm=>eachTerm.value===depositProductDetails.depositProductInterestSettingModel.interestRateTerms)[0];
                        let interestCalc = interestBalanceCalculations.filter(eachItem=>eachItem.value===depositProductDetails.depositProductInterestSettingModel.interestBalanceCalculation.toString())[0];
                        

                        // this.setState({ selectedProductType:productTypeSelect, typeDesc: productTypeSelect.desc});
                        glAccountsList.map((channel, id)=>{
                            allGlAccounts.push({label: channel.accountDescription, value:channel.id, accType:channel.accountTypeId});
                        })

                        currenciesList.map((currency, id)=>{
                            allCurrencies.push({label: `${currency.name} (${currency.symbol})`, value:currency.code});
                        })
                        
                        let currencyData = allCurrencies.filter(eachCurrrency=>eachCurrrency.value===depositProductDetails.currencyCode)[0];

                        // console.log("===", currencyData);
                        

                        let savingsControlAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===2),
                            transactionSourceAccount =allGlAccounts.filter(glAccount=>glAccount.accType===1),
                            interestExpenseAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===5);
                            // interestIncomeAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===4),
                            // penaltyIncomeAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===4);
                            

                            let methodologyReturned = methodologyList.filter(eachItem=>eachItem.value===depositProductDetails.methodology.toString())[0];
                            let txtSrcReturned = transactionSourceAccount.filter(eachItem=>eachItem.value===depositProductDetails.depositProductAccountingRule.transactionSourceAccountId)[0];
                            let savingsAccReturned = savingsControlAccounts.filter(eachItem=>eachItem.value===depositProductDetails.depositProductAccountingRule.savingsControlAccountId)[0];
                            let interestExpenseAccReturned = interestExpenseAccounts.filter(eachItem=>eachItem.value===depositProductDetails.depositProductAccountingRule.interestExpenseAccountId)[0];
                            let feeIncomeAccReturned = allGlAccounts.filter(eachItem=>eachItem.value===depositProductDetails.depositProductAccountingRule.feeIncomeAccountId)[0];
                            let incomeAcruedMethodReturned = interestAccruedMethodList.filter(eachItem=>eachItem.value===depositProductDetails.depositProductAccountingRule.interestAccruedMethod.toString())[0];
                        return(
                            
                                <Formik
                                initialValues={{
                                    key: (depositProductDetails.key!==undefined && depositProductDetails.key!==null)?depositProductDetails.key:'',
                                    productName: (depositProductDetails.productName!==undefined && depositProductDetails.productName!==null)?depositProductDetails.productName.toString():'',
                                    depositAccountType: (depositProductDetails.depositAccountType!==undefined && depositProductDetails.depositAccountType!==null)?depositProductDetails.depositAccountType:'',
                                    description: (depositProductDetails.description!==undefined && depositProductDetails.description!==null)?depositProductDetails.description.toString():'',
                                    savingsControlAccountId: (depositProductDetails.depositProductAccountingRule.savingsControlAccountId!==undefined && depositProductDetails.depositProductAccountingRule.savingsControlAccountId!==null)?depositProductDetails.depositProductAccountingRule.savingsControlAccountId:'',
                                    transactionSourceAccountId: (depositProductDetails.depositProductAccountingRule.transactionSourceAccountId!==undefined && depositProductDetails.depositProductAccountingRule.transactionSourceAccountId!==null)?depositProductDetails.depositProductAccountingRule.transactionSourceAccountId:'',
                                    interestExpenseAccountId: (depositProductDetails.depositProductAccountingRule.interestExpenseAccountId!==undefined && depositProductDetails.depositProductAccountingRule.interestExpenseAccountId!==null)?depositProductDetails.depositProductAccountingRule.interestExpenseAccountId:'',
                                    feeIncomeAccountId: (depositProductDetails.depositProductAccountingRule.feeIncomeAccountId!==undefined && depositProductDetails.depositProductAccountingRule.feeIncomeAccountId!==null)?depositProductDetails.depositProductAccountingRule.feeIncomeAccountId:'',
                                    interestAccruedMethod: (depositProductDetails.depositProductAccountingRule.interestAccruedMethod!==undefined && depositProductDetails.depositProductAccountingRule.interestAccruedMethod!==null)?depositProductDetails.depositProductAccountingRule.interestAccruedMethod:'',
                                    methodology: (depositProductDetails.methodology!==undefined && depositProductDetails.methodology!==null)?depositProductDetails.methodology:'',
                                    isActive: (depositProductDetails.isActive!==undefined && depositProductDetails.isActive!==null)?depositProductDetails.isActive:'',
                                    currencyCode:(depositProductDetails.currencyCode!==undefined && depositProductDetails.currencyCode!==null)?depositProductDetails.currencyCode:'',
                                    automaticallySetAccountAsDormant:(depositProductDetails.automaticallySetAccountAsDormant!==undefined && depositProductDetails.automaticallySetAccountAsDormant!==null)?depositProductDetails.automaticallySetAccountAsDormant:'',
                                    dormancyAfterXDays: (depositProductDetails.dormancyAfterXDays!==undefined && depositProductDetails.dormancyAfterXDays!==null)?depositProductDetails.dormancyAfterXDays.toString():'',
                                    // interestAccruedMethod:'',
                                    maximumWithdrawalAmount:(depositProductDetails.depositSavingsSettingModel!==undefined && depositProductDetails.depositSavingsSettingModel!==null)?depositProductDetails.depositSavingsSettingModel.maximumWithdrawalAmount.toString():0,
                                    recommendedDepositAmount:(depositProductDetails.depositSavingsSettingModel!==undefined && depositProductDetails.depositSavingsSettingModel!==null)?depositProductDetails.depositSavingsSettingModel.recommendedDepositAmount.toString():0,
                                    interestPaid:(depositProductDetails.depositProductInterestSettingModel!==undefined && depositProductDetails.depositProductInterestSettingModel!==null)?depositProductDetails.depositProductInterestSettingModel.interestPaid:'',
                                    interestRateTerms:(depositProductDetails.depositProductInterestSettingModel.interestRateTerms!==undefined && depositProductDetails.depositProductInterestSettingModel.interestRateTerms!==null)?depositProductDetails.depositProductInterestSettingModel.interestRateTerms:'',
                                    interestBalanceCalculation:(depositProductDetails.depositProductInterestSettingModel.interestBalanceCalculation!==undefined && depositProductDetails.depositProductInterestSettingModel.interestBalanceCalculation!==null)?depositProductDetails.depositProductInterestSettingModel.interestBalanceCalculation:'',
                                    interestRateDefault:(depositProductDetails.depositProductInterestSettingModel!==undefined && depositProductDetails.depositProductInterestSettingModel!==null)?depositProductDetails.depositProductInterestSettingModel.interestRateDefault.toString():0,
                                    interestRateMin:(depositProductDetails.depositProductInterestSettingModel!==undefined && depositProductDetails.depositProductInterestSettingModel!==null)?depositProductDetails.depositProductInterestSettingModel.interestRateMin.toString():0,
                                    interestRateMax:(depositProductDetails.depositProductInterestSettingModel!==undefined && depositProductDetails.depositProductInterestSettingModel!==null)?depositProductDetails.depositProductInterestSettingModel.interestRateMax.toString():0,
                                    xInterestDays:(depositProductDetails.depositProductInterestSettingModel!==undefined && depositProductDetails.depositProductInterestSettingModel!==null)?depositProductDetails.depositProductInterestSettingModel.xInterestDays.toString():0,
                                    defaultOpeningBalance:  (depositProductDetails.depositFixedSettingModel!==undefined && depositProductDetails.depositFixedSettingModel!==null)?depositProductDetails.depositFixedSettingModel.defaultOpeningBalance.toString():'',
                                    minimumOpeningBalance:(depositProductDetails.depositFixedSettingModel!==undefined && depositProductDetails.depositFixedSettingModel!==null)?depositProductDetails.depositFixedSettingModel.minimumOpeningBalance.toString():'',
                                    maxmimumOpeningBalance: (depositProductDetails.depositFixedSettingModel!==undefined && depositProductDetails.depositFixedSettingModel!==null)?depositProductDetails.depositFixedSettingModel.maxmimumOpeningBalance.toString():'',
                                    term:(depositProductDetails.depositFixedSettingModel!==undefined && depositProductDetails.depositFixedSettingModel!==null)?depositProductDetails.depositFixedSettingModel.term.toString():'',
                                    defaultTermLength:(depositProductDetails.depositFixedSettingModel!==undefined && depositProductDetails.depositFixedSettingModel!==null)?depositProductDetails.depositFixedSettingModel.defaultTermLength.toString():'',
                                    minimumTermLength:(depositProductDetails.depositFixedSettingModel!==undefined && depositProductDetails.depositFixedSettingModel!==null)?depositProductDetails.depositFixedSettingModel.minimumTermLength.toString():'',
                                    maxmimumTermLength:(depositProductDetails.depositFixedSettingModel!==undefined && depositProductDetails.depositFixedSettingModel!==null)?depositProductDetails.depositFixedSettingModel.maxmimumTermLength.toString():'',
                                }}
                                // enableReinitialize={true}
                                // validationSchema={depositProductValidationSchema}
                                validator={() => ({})}
                                onSubmit={(values, { resetForm }) => {

                                    let updateDepositProductPayload = {
                                        key: values.key,
                                        productName: values.productName,
                                        depositAccountType: parseInt(values.depositAccountType),
                                        description: values.description,
                                        depositProductAccountingRule:{
                                            savingsControlAccountId: values.savingsControlAccountId,
                                            transactionSourceAccountId: values.transactionSourceAccountId,
                                            interestExpenseAccountId: values.interestExpenseAccountId,
                                            feeIncomeAccountId: values.feeIncomeAccountId,
                                            interestAccruedMethod: values.interestAccruedMethod!=='' ? parseInt(values.interestAccruedMethod):'',
                                        },
                                        methodology:values.methodology!==''? parseInt(values.methodology):'',
                                        isActive: values.isActive,
                                        currencyCode: values.currencyCode,
                                        automaticallySetAccountAsDormant: values.automaticallySetAccountAsDormant,
                                        dormancyAfterXDays:values.dormancyAfterXDays!==''? parseInt(values.dormancyAfterXDays):0,
                                        // interestAccruedMethod: values.interestAccruedMethod,
                                        depositSavingsSettingModel:{
                                            maximumWithdrawalAmount:values.maximumWithdrawalAmount!==''? parseFloat(values.maximumWithdrawalAmount.replace(/,/g, '')):0,
                                            recommendedDepositAmount: values.recommendedDepositAmount!==''? parseFloat(values.recommendedDepositAmount.replace(/,/g, '')):0,
                                        },
                                        depositProductInterestSettingModel:{
                                            interestPaid: values.interestPaid,
                                            interestRateTerms: values.interestRateTerms,
                                            interestBalanceCalculation: values.interestBalanceCalculation!==''? parseInt(values.interestBalanceCalculation):0,
                                            interestRateDefault: values.interestRateDefault!==''? parseFloat(values.interestRateDefault.replace(/,/g, '')):0,
                                            interestRateMin:values.interestRateMin!==''? parseFloat(values.interestRateMin.replace(/,/g, '')):0,
                                            interestRateMax:values.interestRateMax!==''? parseFloat(values.interestRateMax.replace(/,/g, '')):0,
                                            xInterestDays: values.xInterestDays !=='' ? parseInt(values.xInterestDays):0,
                                        },
                                        depositFixedSettingModel:{
                                            defaultOpeningBalance:values.defaultOpeningBalance!=='' ? parseFloat(values.defaultOpeningBalance.replace(/,/g, '')):0,
                                            minimumOpeningBalance:values.minimumOpeningBalance!==''? parseFloat(values.minimumOpeningBalance.replace(/,/g, '')):0,
                                            maxmimumOpeningBalance:values.maxmimumOpeningBalance!==''? parseFloat(values.maxmimumOpeningBalance.replace(/,/g, '')):0,
                                            term:values.term!==''? parseInt(values.term):0,
                                            defaultTermLength:values.defaultTermLength!==''? parseFloat(values.defaultTermLength.replace(/,/g, '')):0,
                                            minimumTermLength:values.minimumTermLength!==''? parseFloat(values.minimumTermLength.replace(/,/g, '')):0,
                                            maxmimumTermLength:values.maxmimumTermLength!==''? parseFloat(values.maxmimumTermLength.replace(/,/g, '')):0,
                                        },
                                        
                                    }


                                    // console.log("--+++----", updateDepositProductPayload);
                                    // console.log("+++++", depositProductDetails);
                                    // console.log("=====", updateDepositProductPayload);

                                    this.handleUpdateDepositProduct(updateDepositProductPayload)
                                        .then(
                                            () => {

                                                if (this.props.updateDepositProductReducer.request_status === productsConstants.EDIT_A_DEPOSIT_PRODUCT_SUCCESS) {
                                                    setTimeout(() => {
                                                        resetForm();
                                                        this.props.dispatch(productActions.updateDespositProduct("CLEAR"))
                                                    }, 3000);
                                                }else{
                                                    setTimeout(() => {
                                                        this.props.dispatch(productActions.updateDespositProduct("CLEAR"))
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
                                    // noValidate 
                                    // validate={true}
                                    onSubmit={handleSubmit}
                                    className="form-content card">
                                    <div className="form-heading">
                                    <h3>Edit {depositProductDetails.productName}</h3>
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
                                                defaultValue ={{label:productTypeSelect!==null?productTypeSelect.label:null, 
                                                    value:productTypeSelect!==null? productTypeSelect.value:null}}
                                                onChange={(selectedProductType) => {
                                                    this.productDesc= selectedProductType.desc;
                                                    this.setState({ selectedProductType, typeDesc: selectedProductType.desc});
                                                    errors.depositAccountType = null
                                                    values.depositAccountType = selectedProductType.value;
                                                    
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
                                            {/* <Form.Label className="block-level">Methodology</Form.Label>
                                            <Select
                                                options={methodologyList}
                                                onChange={(selectedMethodology) => {
                                                    this.setState({ selectedMethodology });
                                                    errors.methodology = null
                                                    values.methodology = selectedMethodology.value
                                                }}
                                                className={errors.methodology && touched.methodology ? "is-invalid" : null}
                                                
                                                
                                                name="methodology"
                                                
                                                
                                            /> */}
                                        </Col>
                                    </Form.Row>
                                        <Form.Label className="block-level">State</Form.Label>
                                            <div className="checkbox-wrap">
                                                <input type="checkbox" 
                                                    id="isActive" 
                                                    checked={values.isActive? values.isActive:null}
                                                    name="isActive"
                                                    onChange={handleChange} 
                                                    value={values.isActive}  />
                                                <label htmlFor="isActive">Active state</label>
                                                <div className="hint-text">
                                                    {/* {this.state.typeDesc} */}
                                                    {this.state.typeDesc || this.productDesc}
                                                </div>
                                            </div>
                                    

                                    <Accordion>
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
                                    <Accordion>
                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                            Currencies
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <div>
                                                <Form.Row>
                                                    <Col>
                                                        <Form.Label className="block-level">Currency</Form.Label>
                                                        <Select
                                                            options={allCurrencies}
                                                            defaultValue ={{label:currencyData!==null?currencyData.label:null, 
                                                                value:currencyData!==null? currencyData.value:null}}
                                                            onChange={(selectedCurrency) => {
                                                                this.setState({ selectedCurrency });
                                                                errors.currencyCode = null
                                                                values.currencyCode = selectedCurrency.value
                                                            }}
                                                            className={errors.currencyCode && touched.currencyCode ? "is-invalid" : null}


                                                            name="currencyCode"


                                                        />
                                                    </Col>
                                                    <Col></Col>
                                                </Form.Row>
                                            </div>
                                        </Accordion.Collapse>
                                    </Accordion>
                                    <Accordion>
                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                            Interest Rates
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
                                                                    defaultValue ={{label:rateTerms!==null?rateTerms.label:null, 
                                                                        value:rateTerms!==null? rateTerms.value:null}}
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
                                                                    defaultValue ={{label:interestCalc!==null?interestCalc.label:null, 
                                                                        value:interestCalc!==null? interestCalc.value:null}}
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
                                                                    value={numberWithCommas(values.interestRateDefault)}
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
                                                                    value={numberWithCommas(values.interestRateMin)}
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
                                                                    value={numberWithCommas(values.interestRateMax)}
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
                                                                    value={numberWithCommas(values.xInterestDays)}
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
                                    <Accordion>
                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                            Opening Balance
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <div>
                                                <Form.Row>
                                                    <Col>
                                                        <Form.Label className="block-level">Default Opening Balance</Form.Label>
                                                        <Form.Control 
                                                            type="text"
                                                            onChange={handleChange}
                                                            value={numberWithCommas(values.defaultOpeningBalance)}
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
                                                            value={numberWithCommas(values.minimumOpeningBalance)}
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
                                                            value={numberWithCommas(values.maxmimumOpeningBalance)}
                                                            className={errors.maxmimumOpeningBalance && touched.maxmimumOpeningBalance ? "is-invalid" : null}
                                                            name="maxmimumOpeningBalance"  />
                                                        {errors.maxmimumOpeningBalance && touched.maxmimumOpeningBalance ? (
                                                            <span className="invalid-feedback">{errors.maxmimumOpeningBalance}</span>
                                                        ) : null}
                                                    </Col>
                                                    <Col></Col>
                                                </Form.Row>
                                            </div>
                                        </Accordion.Collapse>
                                    </Accordion>
                                    <Accordion >
                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                            Term Length
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <div>
                                                <Form.Row>
                                                    <Col>
                                                        <Form.Label className="block-level">Term</Form.Label>
                                                        <Form.Control 
                                                            type="text"
                                                            onChange={handleChange}
                                                            value={numberWithCommas(values.term)}
                                                            className={errors.term && touched.term ? "is-invalid" : null}
                                                            name="term"  />
                                                        {errors.term && touched.term ? (
                                                            <span className="invalid-feedback">{errors.term}</span>
                                                        ) : null}
                                                    </Col>
                                                    <Col>
                                                        <Form.Label className="block-level">Maxmimum Term Length</Form.Label>
                                                        <Form.Control 
                                                            type="text"
                                                            onChange={handleChange}
                                                            value={numberWithCommas(values.maxmimumTermLength)}
                                                            className={errors.maxmimumTermLength && touched.maxmimumTermLength ? "is-invalid" : null}
                                                            name="maxmimumTermLength"  />
                                                        {errors.maxmimumTermLength && touched.maxmimumTermLength ? (
                                                            <span className="invalid-feedback">{errors.maxmimumTermLength}</span>
                                                        ) : null}
                                                    </Col>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Col>
                                                        <Form.Label className="block-level">Default Term Length</Form.Label>
                                                        <Form.Control 
                                                            type="text"
                                                            onChange={handleChange}
                                                            value={numberWithCommas(values.defaultTermLength)}
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
                                                            value={numberWithCommas(values.minimumTermLength)}
                                                            className={errors.minimumTermLength && touched.minimumTermLength ? "is-invalid" : null}
                                                            name="minimumTermLength"  />
                                                        {errors.minimumTermLength && touched.minimumTermLength ? (
                                                            <span className="invalid-feedback">{errors.minimumTermLength}</span>
                                                        ) : null}
                                                    </Col>

                                                </Form.Row>
                                            </div>
                                        </Accordion.Collapse>
                                    </Accordion>
                                    <Accordion >
                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                            Internal Controls
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
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
                                                    
                                                    
                                                </Col>
                                                {values.automaticallySetAccountAsDormant===true && 
                                                    <Col>
                                                        <Form.Label className="block-level">Dormant after how many days</Form.Label>
                                                        <Form.Control 
                                                            type="text"
                                                            onChange={handleChange}
                                                            value={allowNumbersOnly(values.dormancyAfterXDays)}
                                                            className={errors.dormancyAfterXDays && touched.dormancyAfterXDays ? "is-invalid" : null}
                                                            name="dormancyAfterXDays"  />
                                                         <span>days</span>
                                                        {errors.dormancyAfterXDays && touched.dormancyAfterXDays ? (
                                                            <span className="invalid-feedback">{errors.dormancyAfterXDays}</span>
                                                        ) : null}
                                                        
                                                    </Col>
                                                }
                                                {values.automaticallySetAccountAsDormant===false  && <Col></Col>}
                                            </Form.Row>
                                            {/* <div>
                                                <div className="checkbox-wrap">
                                                    <input type="checkbox" name="" id="pick-1" />
                                                    <label htmlFor="pick-1">Automatically set accounts as Dormant after</label>
                                                </div>
                                                <Form.Control className="w-20" type="text" />
                                                <span>days</span>
                                            </div> */}
                                        </Accordion.Collapse>
                                    </Accordion>
                                    <Accordion>
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
                                                            value={numberWithCommas(values.maximumWithdrawalAmount)}
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
                                                            value={numberWithCommas(values.recommendedDepositAmount)}
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
                                            Accounting Rules
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <div>
                                                <Form.Group as={Row} className="center-aligned">
                                                    <Form.Label column sm={4} className="block-level">Methodology</Form.Label>
                                                    <Col sm={7}>
                                                        
                                                        <Select
                                                            options={methodologyList}
                                                            defaultValue ={{label:methodologyReturned!==null?methodologyReturned.label:null, 
                                                                value:methodologyReturned!==null? methodologyReturned.value:null}}
                                                            onChange={(selectedMethodology) => {
                                                                this.setState({ selectedMethodology });
                                                                errors.methodology = null
                                                                values.methodology = selectedMethodology.value
                                                            }}
                                                            className={errors.methodology && touched.methodology ? "is-invalid" : null}
                                                            
                                                            
                                                            name="methodology"
                                                            
                                                            
                                                        />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="center-aligned">
                                                    <Form.Label column sm={4} className="block-level">Transaction Source</Form.Label>
                                                    <Col sm={6}>
                                                        
                                                            <Select
                                                                options={transactionSourceAccount}
                                                                defaultValue ={{label:txtSrcReturned!==null?txtSrcReturned.label:null, 
                                                                    value:txtSrcReturned!==null? txtSrcReturned.value:null}}
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
                                                    <Col sm={2}>
                                                        <span>Asset</span>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="center-aligned">
                                                    <Form.Label column sm={4} className="block-level">Savings Control Account</Form.Label>
                                                    <Col sm={6}>
                                                        <Select
                                                            options={savingsControlAccounts}
                                                            defaultValue ={{label:savingsAccReturned!==null?savingsAccReturned.label:null, 
                                                                value:savingsAccReturned!==null? savingsAccReturned.value:null}}
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
                                                    <Col sm={2}>
                                                        <span>Liability</span>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="center-aligned">
                                                    <Form.Label column sm={4} className="block-level">Interest Expense Account</Form.Label>
                                                    <Col sm={6}>
                                                        <Select
                                                            options={interestExpenseAccounts}
                                                            defaultValue ={{label:interestExpenseAccReturned!==null?interestExpenseAccReturned.label:null, 
                                                                value:interestExpenseAccReturned!==null? interestExpenseAccReturned.value:null}}
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
                                                    <Col sm={2}>
                                                        <span>Expense</span>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="center-aligned">
                                                    <Form.Label column sm={4} className="block-level">Fee Income</Form.Label>
                                                    <Col sm={6}>
                                                        <Select
                                                            options={allGlAccounts}
                                                            defaultValue ={{label:feeIncomeAccReturned!==null?feeIncomeAccReturned.label:null, 
                                                                value:feeIncomeAccReturned!==null? feeIncomeAccReturned.value:null}}
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
                                                    <Col sm={2}>
                                                        <span>Any GL Account</span>
                                                    </Col>
                                                </Form.Group>
                                                <Form.Group as={Row} className="center-aligned">
                                                    <Form.Label column sm={4} className="block-level">Interest Accrued Method</Form.Label>
                                                    <Col sm={6}>
                                                        <Select
                                                            options={interestAccruedMethodList}
                                                            defaultValue ={{label:incomeAcruedMethodReturned!==null?incomeAcruedMethodReturned.label:null, 
                                                                value:incomeAcruedMethodReturned!==null? incomeAcruedMethodReturned.value:null}}
                                                            onChange={(selectedInterestAccruedMethod) => {
                                                                this.setState({ selectedInterestAccruedMethod });
                                                                errors.interestAccruedMethod = null
                                                                values.interestAccruedMethod = selectedInterestAccruedMethod.value
                                                            }}
                                                            className={errors.interestAccruedMethod && touched.interestAccruedMethod ? "is-invalid" : null}
                                                            name="interestAccruedMethod"
                                                            
                                                            
                                                        />
                                                    </Col>
                                                    {/* <Col sm={2}>
                                                        <span>Expense</span>
                                                    </Col> */}
                                                </Form.Group>
                                                
                                                
                                                
                                                
                                                
                                            </div>
                                        </Accordion.Collapse>
                                    </Accordion>
                                    
                                    

                                    
                                    
                                    

                                





                                    <div className="footer-with-cta toleft">
                                        
                                        <NavLink to={'/administration/products/deposits'} className="btn btn-secondary grayed-out">Cancel</NavLink>
                                        <Button
                                            type="submit"
                                            disabled={updateDepositProductRequest.is_request_processing}>
                                            {updateDepositProductRequest.is_request_processing?"Please wait...": "Save Product"}
                                        </Button>
                                    </div>
                                    {updateDepositProductRequest.request_status === productsConstants.EDIT_A_DEPOSIT_PRODUCT_SUCCESS && 
                                        <Alert variant="success">
                                            {updateDepositProductRequest.request_data.response.data.message}
                                        </Alert>
                                    }
                                    {updateDepositProductRequest.request_status === productsConstants.EDIT_A_DEPOSIT_PRODUCT_FAILURE && 
                                        <Alert variant="danger">
                                            {updateDepositProductRequest.request_data.error}
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
            if (getAllGLAccountsRequest.request_status === accountingConstants.GET_ALL_GLACCOUNTS_FAILURE){
                return (
                    <div className="loading-content card"> 
                        <div>{getAllGLAccountsRequest.request_data.error}</div>
                    </div>
                )
            }
            if(getAllCurrencies.request_status === administrationConstants.GET_ALLCURRENCIES_FAILURE){
                return (
                    <div className="loading-content card"> 
                        <div>{getAllCurrencies.request_data.error}</div>
                    </div>
                )
            }

            if(getSingleDepositProductsRequest.request_status === productsConstants.GET_A_DEPOSIT_PRODUCT_FAILURE){
                return (
                    <div className="loading-content card"> 
                        <div>{getSingleDepositProductsRequest.request_data.error}</div>
                    </div>
                )
            }
        // }
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
                                                {this.renderEditDepositProduct()}
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
        getSingleDepositProductsReducer : state.productReducers.getSingleDepositProductsReducer,
        updateDepositProductReducer : state.productReducers.updateDepositProductReducer,
        adminGetAllCurrencies : state.administrationReducers.adminGetAllCurrenciesReducer,
        getAllGLAccountsReducer : state.accountingReducers.getAllGLAccountsReducer,
    };
}

export default connect(mapStateToProps)(EditADepositsProduct);