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
                currencyCode:  Yup.string()
                    .min(1, 'Valid response required')
                    .required('Required'),
                interestRateTerms: Yup.string()
                    .when('interestPaid',{
                        is:(value)=>value===true,
                        then: Yup.string()
                            .required('Required')
                    }),
                interestBalanceCalculation: Yup.string()
                    .when('interestPaid',{
                        is:(value)=>value===true,
                        then: Yup.string()
                            .required('Required')
                    }),
                whenInterestIsPaid: Yup.string()
                    .when('interestPaid',{
                        is:(value)=>value===true,
                        then: Yup.string()
                            .required('Required')
                    }),
              });

        let allProductTypes =[
            {   value: '', 
                label: 'Select', 
                desc:   ''
            },
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
                desc:   'A type of account used for investing funds in other borrowers loan accounts. The client earns interest after loan investments, instead of the traditional interest paid into account by the organization.'
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

        let termsOptions =[
            {value: '1', label: 'Days'},
            {value: '2', label: 'Weeks'},
            {value: '3', label: 'Months'},
        ];


        let interestAccruedMethodList =[
            {value: '1', label: 'Daily'},
            {value: '2', label: 'Monthly'},
        ];

        let whenInterestIsPaidList =[
            {value: '1', label: 'First day of every month'},
            {value: '2', label: 'Every week'},
            {value: '3', label: 'Every other week'},
            {value: '4', label: 'Every month'},
            {value: '5', label: 'Every three months'},
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
                        allCurrencies = [{label: "Select", value:""}],
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
                        
                        let rateTerms = interestRateTerms.filter(eachTerm=>eachTerm.value===depositProductDetails.depositProductInterestSettingModel.interestRateTerms)[0]||null;
                        let interestCalc = interestBalanceCalculations.filter(eachItem=>eachItem.value===depositProductDetails.depositProductInterestSettingModel.interestBalanceCalculation.toString())[0]||null;
                        

                        // this.setState({ selectedProductType:productTypeSelect, typeDesc: productTypeSelect.desc});
                        glAccountsList.map((channel, id)=>{
                            allGlAccounts.push({label: channel.accountDescription, value:channel.id, accType:channel.accountTypeId});
                        })

                        currenciesList.map((currency, id)=>{
                            allCurrencies.push({label: `${currency.name} (${currency.symbol})`, value:currency.code});
                        })
                        
                        let currencyData = allCurrencies.filter(eachCurrrency=>eachCurrrency.value===depositProductDetails.currencyCode)[0];

                        // console.log("==dssdds=", rateTerms);
                        

                        let savingsControlAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===2),
                            transactionSourceAccount =allGlAccounts.filter(glAccount=>glAccount.accType===1),
                            interestExpenseAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===5),
                            interestPayableAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===2);
                            // interestIncomeAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===4),
                            // penaltyIncomeAccounts =allGlAccounts.filter(glAccount=>glAccount.accType===4);
                            

                            let methodologyReturned = methodologyList.filter(eachItem=>eachItem.value===depositProductDetails.methodology.toString())[0];
                            let txtSrcReturned = transactionSourceAccount.filter(eachItem=>eachItem.value===depositProductDetails.depositProductAccountingRule.transactionSourceAccountId)[0]||null;
                            let savingsAccReturned = savingsControlAccounts.filter(eachItem=>eachItem.value===depositProductDetails.depositProductAccountingRule.savingsControlAccountId)[0]||null;
                            let interestExpenseAccReturned = interestExpenseAccounts.filter(eachItem=>eachItem.value===depositProductDetails.depositProductAccountingRule.interestExpenseAccountId)[0]||null;
                            let feeIncomeAccReturned = allGlAccounts.filter(eachItem=>eachItem.value===depositProductDetails.depositProductAccountingRule.feeIncomeAccountId)[0]||null;
                            let incomeAcruedMethodReturned = interestAccruedMethodList.filter(eachItem=>eachItem.value===depositProductDetails.depositProductAccountingRule.interestAccruedMethod.toString())[0]||null;
                            let termsOptionsReturned = termsOptions.filter(eachItem=>eachItem.value===depositProductDetails.depositTermSettingModel.term.toString())[0]||null;
                            let whenInterestIsPaidReturned = whenInterestIsPaidList.filter(eachItem=>eachItem.value===depositProductDetails.depositProductInterestSettingModel.whenInterestIsPaid.toString())[0]||null;
                            let interestPayableAccountReturned = depositProductDetails.depositProductAccountingRule.interestPayableAccountId!==null ? interestPayableAccounts.filter(eachItem=>eachItem.value===depositProductDetails.depositProductAccountingRule.interestPayableAccountId.toString())[0]:null;

                            
                        return(
                            
                                <Formik
                                initialValues={{
                                    key: (depositProductDetails.key!==undefined && depositProductDetails.key!==null)?depositProductDetails.key:'',
                                    productName: (depositProductDetails.productName!==undefined && depositProductDetails.productName!==null)?depositProductDetails.productName.toString():'',
                                    depositAccountType: (depositProductDetails.depositAccountType!==undefined && depositProductDetails.depositAccountType!==null)?depositProductDetails.depositAccountType.toString():'',
                                    description: (depositProductDetails.description!==undefined && depositProductDetails.description!==null)?depositProductDetails.description.toString():'',
                                  
                                    savingsControlAccountId: (depositProductDetails.depositProductAccountingRule.savingsControlAccountId!==undefined && depositProductDetails.depositProductAccountingRule.savingsControlAccountId!==null)?depositProductDetails.depositProductAccountingRule.savingsControlAccountId:null,
                                    transactionSourceAccountId: (depositProductDetails.depositProductAccountingRule.transactionSourceAccountId!==undefined && depositProductDetails.depositProductAccountingRule.transactionSourceAccountId!==null)?depositProductDetails.depositProductAccountingRule.transactionSourceAccountId:null,
                                    interestExpenseAccountId: (depositProductDetails.depositProductAccountingRule.interestExpenseAccountId!==undefined && depositProductDetails.depositProductAccountingRule.interestExpenseAccountId!==null)?depositProductDetails.depositProductAccountingRule.interestExpenseAccountId:null,
                                    feeIncomeAccountId: (depositProductDetails.depositProductAccountingRule.feeIncomeAccountId!==undefined && depositProductDetails.depositProductAccountingRule.feeIncomeAccountId!==null)?depositProductDetails.depositProductAccountingRule.feeIncomeAccountId:null,
                                    interestPayableAccountId:(depositProductDetails.depositProductAccountingRule.interestPayableAccountId!==undefined && depositProductDetails.depositProductAccountingRule.interestPayableAccountId!==null)?depositProductDetails.depositProductAccountingRule.interestPayableAccountId:null,

                                    // savingsControlAccountId: null,
                                    // transactionSourceAccountId: null,
                                    // interestPayableAccountId:null,
                                    // interestExpenseAccountId: null,
                                    // feeIncomeAccountId: null,

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
                                    whenInterestIsPaid:(depositProductDetails.depositProductInterestSettingModel.whenInterestIsPaid!==undefined && depositProductDetails.depositProductInterestSettingModel.whenInterestIsPaid!==null)?depositProductDetails.depositProductInterestSettingModel.whenInterestIsPaid:'',
                                    interestBalanceCalculation:(depositProductDetails.depositProductInterestSettingModel.interestBalanceCalculation!==undefined && depositProductDetails.depositProductInterestSettingModel.interestBalanceCalculation!==null)?depositProductDetails.depositProductInterestSettingModel.interestBalanceCalculation:'',
                                    interestRateDefault:(depositProductDetails.depositProductInterestSettingModel!==undefined && depositProductDetails.depositProductInterestSettingModel!==null)?depositProductDetails.depositProductInterestSettingModel.interestRateDefault.toString():0,
                                    interestRateMin:(depositProductDetails.depositProductInterestSettingModel!==undefined && depositProductDetails.depositProductInterestSettingModel!==null)?depositProductDetails.depositProductInterestSettingModel.interestRateMin.toString():0,
                                    interestRateMax:(depositProductDetails.depositProductInterestSettingModel!==undefined && depositProductDetails.depositProductInterestSettingModel!==null)?depositProductDetails.depositProductInterestSettingModel.interestRateMax.toString():0,
                                    xInterestDays:(depositProductDetails.depositProductInterestSettingModel!==undefined && depositProductDetails.depositProductInterestSettingModel!==null)?depositProductDetails.depositProductInterestSettingModel.xInterestDays.toString():0,
                                    defaultOpeningBalance:  (depositProductDetails.depositFixedSettingModel!==undefined && depositProductDetails.depositFixedSettingModel!==null)?depositProductDetails.depositFixedSettingModel.defaultOpeningBalance.toString():'',
                                    minimumOpeningBalance:(depositProductDetails.depositFixedSettingModel!==undefined && depositProductDetails.depositFixedSettingModel!==null)?depositProductDetails.depositFixedSettingModel.minimumOpeningBalance.toString():'',
                                    maxmimumOpeningBalance: (depositProductDetails.depositFixedSettingModel!==undefined && depositProductDetails.depositFixedSettingModel!==null)?depositProductDetails.depositFixedSettingModel.maxmimumOpeningBalance.toString():'',
                                    term:(depositProductDetails.depositTermSettingModel!==undefined && depositProductDetails.depositTermSettingModel!==null)?depositProductDetails.depositTermSettingModel.term.toString():'',
                                    defaultTermLength:(depositProductDetails.depositTermSettingModel!==undefined && depositProductDetails.depositTermSettingModel!==null)?depositProductDetails.depositTermSettingModel.defaultTermLength.toString():'',
                                    minimumTermLength:(depositProductDetails.depositTermSettingModel!==undefined && depositProductDetails.depositTermSettingModel!==null)?depositProductDetails.depositTermSettingModel.minimumTermLength.toString():'',
                                    maxmimumTermLength:(depositProductDetails.depositTermSettingModel!==undefined && depositProductDetails.depositTermSettingModel!==null)?depositProductDetails.depositTermSettingModel.maxmimumTermLength.toString():'',
                                }}
                                // enableReinitialize={true}
                                validationSchema={depositProductValidationSchema}
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
                                            interestPayableAccountId: values.interestPayableAccountId,
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
                                            whenInterestIsPaid: values.whenInterestIsPaid!==''? parseInt(values.whenInterestIsPaid):0,
                                            interestBalanceCalculation: values.interestBalanceCalculation!==''? parseInt(values.interestBalanceCalculation):0,
                                            interestRateDefault: values.interestRateDefault!==''? parseFloat(values.interestRateDefault.replace(/,/g, '')):0,
                                            interestRateMin:values.interestRateMin!==''? parseFloat(values.interestRateMin.replace(/,/g, '')):0,
                                            interestRateMax:values.interestRateMax!==''? parseFloat(values.interestRateMax.replace(/,/g, '')):0,
                                            xInterestDays: values.xInterestDays !=='' ? parseInt(values.xInterestDays):0,
                                        },
                                        depositTermSettingModel:{
                                            term:values.term!==''? parseInt(values.term):0,
                                            defaultTermLength:values.defaultTermLength!==''? parseFloat(values.defaultTermLength.replace(/,/g, '')):0,
                                            minimumTermLength:values.minimumTermLength!==''? parseFloat(values.minimumTermLength.replace(/,/g, '')):0,
                                            maxmimumTermLength:values.maxmimumTermLength!==''? parseFloat(values.maxmimumTermLength.replace(/,/g, '')):0,
                                        },

                                        depositFixedSettingModel:{
                                            defaultOpeningBalance:values.defaultOpeningBalance!=='' ? parseFloat(values.defaultOpeningBalance.replace(/,/g, '')):0,
                                            minimumOpeningBalance:values.minimumOpeningBalance!==''? parseFloat(values.minimumOpeningBalance.replace(/,/g, '')):0,
                                            maxmimumOpeningBalance:values.maxmimumOpeningBalance!==''? parseFloat(values.maxmimumOpeningBalance.replace(/,/g, '')):0,
                                            
                                            
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
                                                        // resetForm();
                                                        this.props.dispatch(productActions.updateDespositProduct("CLEAR"))
                                                    }, 3000);
                                                }
                                                // else{
                                                //     setTimeout(() => {
                                                //         this.props.dispatch(productActions.updateDespositProduct("CLEAR"))
                                                //     }, 3000);
                                                // }

                                            

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
                                                
                                                onChange={(selected) => {
                                                    setFieldValue('depositAccountType', selected.value)
                                                    this.setState({ typeDesc: selected.desc})
                                                }}
                                                onBlur={()=> setFieldTouched('depositAccountType', true)}
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

                                                            onChange={(selected) => setFieldValue('currencyCode', selected.value)}
                                                            onBlur={()=> setFieldTouched('currencyCode', true)}
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
                                                            <Col sm={6}>
                                                                <Form.Label className="block-level">Interest rate terms</Form.Label>
                                                                <Select
                                                                    options={interestRateTerms}
                                                                    defaultValue ={{label:rateTerms!==null?rateTerms.label:null, 
                                                                        value:rateTerms!==null? rateTerms.value:null}}

                                                                    onChange={(selected) => setFieldValue('interestRateTerms', selected.value)}
                                                                    onBlur={()=> setFieldTouched('interestRateTerms', true)}
                                                                    className={errors.interestRateTerms && touched.interestRateTerms ? "is-invalid" : null}
                                                                    // noOptionsMessage ={() => "No accounts available"}
                                                                    
                                                                    name="interestRateTerms"
                                                                    
                                                                    
                                                                />
                                                                {errors.interestRateTerms && touched.interestRateTerms ? (
                                                                    <span className="invalid-feedback">{errors.interestRateTerms}</span>
                                                                ) : null}
                                                            </Col>
                                                            {values.interestRateTerms===5  &&
                                                                <Col sm={6}>
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
                                                            <Col sm={6}  className={values.interestRateTerms===5?"mt-20":""}>
                                                                <Form.Label className="block-level">Interest Balance Calculation</Form.Label>
                                                                <Select
                                                                    options={interestBalanceCalculations}
                                                                    defaultValue ={{label:interestCalc!==null?interestCalc.label:null, 
                                                                        value:interestCalc!==null? interestCalc.value:null}}
                                                                    
                                                                    onChange={(selected) => setFieldValue('interestBalanceCalculation', selected.value)}
                                                                    onBlur={()=> setFieldTouched('interestBalanceCalculation', true)}

                                                                    className={errors.interestBalanceCalculation && touched.interestBalanceCalculation ? "is-invalid" : null}
                                                                    // noOptionsMessage ={() => "No accounts available"}
                                                                    
                                                                    name="interestBalanceCalculation"
                                                                    
                                                                    
                                                                />
                                                                 {errors.interestBalanceCalculation && touched.interestBalanceCalculation ? (
                                                                    <span className="invalid-feedback">{errors.interestBalanceCalculation}</span>
                                                                ) : null}
                                                            </Col>
                                                            
                                                        </Form.Row>
                                                        <Form.Row>
                                                            <Col sm={6} className="mt-20">
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
                                                            <Col sm={6} className="mt-20">
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
                                                            <Col sm={6} className="mt-20">
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
                                                            
                                                            <Col sm={6} className="mt-20">
                                                                <Form.Label className="block-level">When is the interest paid into the account?</Form.Label>
                                                                <Select
                                                                    options={whenInterestIsPaidList}
                                                                    defaultValue ={{label:whenInterestIsPaidReturned!==null?whenInterestIsPaidReturned.label:null, 
                                                                        value:whenInterestIsPaidReturned!==null? whenInterestIsPaidReturned.value:null}}
                                                                     
                                                                    onChange={(selected) => setFieldValue('whenInterestIsPaid', selected.value)}
                                                                    onBlur={()=> setFieldTouched('whenInterestIsPaid', true)}
                                                                    className={errors.whenInterestIsPaid && touched.whenInterestIsPaid ? "is-invalid" : null}
                                                                    name="whenInterestIsPaid"
                                                                    
                                                                    
                                                                />
                                                                {errors.whenInterestIsPaid && touched.whenInterestIsPaid ? (
                                                                    <span className="invalid-feedback">{errors.whenInterestIsPaid}</span>
                                                                ) : null}
                                                            </Col>

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
                                    {(parseInt(values.depositAccountType)===2 || parseInt(values.depositAccountType)===5) &&
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
                                                            <Select
                                                                options={termsOptions} 
                                                                defaultValue ={{label:termsOptionsReturned!==null?termsOptionsReturned.label:null, 
                                                                    value:termsOptionsReturned!==null? termsOptionsReturned.value:null}}
                                                                
                                                                onChange={(selected) => setFieldValue('term', selected.value)}
                                                                onBlur={()=> setFieldTouched('term', true)}
                                                                className={errors.term && touched.term ? "is-invalid" : null}
                                                                
                                                                
                                                                name="term"
                                                                
                                                                
                                                            />
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
                                    }
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
                                    {(values.depositAccountType !=='3' && values.depositAccountType !=='2') &&
                                        <Accordion>
                                            <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                Deposits and Withdrawals
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
                                    }
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
                                                            
                                                            onChange={(selected) => setFieldValue('methodology', selected.value)}
                                                            onBlur={()=> setFieldTouched('methodology', true)}
                                                            className={errors.methodology && touched.methodology ? "is-invalid" : null}
                                                            
                                                            
                                                            name="methodology"
                                                            
                                                            
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                {values.methodology!==0 && 
                                                    <div>
                                                        <Form.Group as={Row} className="center-aligned">
                                                            <Form.Label column sm={4} className="block-level">Transaction Source</Form.Label>
                                                            <Col sm={6}>
                                                                
                                                                    <Select
                                                                        options={transactionSourceAccount}
                                                                        defaultValue ={{label:txtSrcReturned!==null?txtSrcReturned.label:null, 
                                                                            value:txtSrcReturned!==null? txtSrcReturned.value:null}}
                                                                        onChange={(selected) => setFieldValue('transactionSourceAccountId', selected.value)}
                                                                        onBlur={()=> setFieldTouched('transactionSourceAccountId', true)}
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
                                                                    onChange={(selected) => setFieldValue('savingsControlAccountId', selected.value)}
                                                                    onBlur={()=> setFieldTouched('savingsControlAccountId', true)}

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
                                                                    onChange={(selected) => setFieldValue('interestExpenseAccountId', selected.value)}
                                                                    onBlur={()=> setFieldTouched('interestExpenseAccountId', true)}
                                                                    className={errors.interestExpenseAccountId && touched.interestExpenseAccountId ? "is-invalid" : null}
                                                                    noOptionsMessage ={() => "No accounts available"}
                                                                    
                                                                    name="interestExpenseAccountId"
                                                                        
                                                                        
                                                                    />
                                                            </Col>
                                                            <Col sm={2}>
                                                                <span>Expense</span>
                                                            </Col>
                                                        </Form.Group>
                                                        {(values.methodology==='2' && values.interestPaid===true) &&
                                                            <Form.Group as={Row} className="center-aligned">
                                                                <Form.Label column sm={4} className="block-level">Interest Payable Account</Form.Label>
                                                                <Col sm={6}>
                                                                    <Select 
                                                                        options={interestPayableAccounts}
                                                                        defaultValue ={{label:interestPayableAccountReturned!==null?interestPayableAccountReturned.label:null, 
                                                                            value:interestPayableAccountReturned!==null? interestPayableAccountReturned.value:null}}
                                                                        
                                                                        onChange={(selected) => setFieldValue('interestPayableAccountId', selected.value)}
                                                                        onBlur={()=> setFieldTouched('interestPayableAccountId', true)}
                                                                        className={errors.interestPayableAccountId && touched.interestPayableAccountId ? "is-invalid" : null}
                                                                        noOptionsMessage ={() => "No accounts available"}
                                                                        
                                                                        name="interestPayableAccountId"
                                                                            
                                                                            
                                                                        />
                                                                </Col>
                                                                <Col sm={2}>
                                                                    <span>Liability</span>
                                                                </Col>
                                                            </Form.Group>
                                                        }
                                                        <Form.Group as={Row} className="center-aligned">
                                                            <Form.Label column sm={4} className="block-level">Fee Income</Form.Label>
                                                            <Col sm={6}>
                                                                <Select
                                                                    options={allGlAccounts}
                                                                    defaultValue ={{label:feeIncomeAccReturned!==null?feeIncomeAccReturned.label:null, 
                                                                        value:feeIncomeAccReturned!==null? feeIncomeAccReturned.value:null}}
                                                                    onChange={(selected) => setFieldValue('feeIncomeAccountId', selected.value)}
                                                                    onBlur={()=> setFieldTouched('feeIncomeAccountId', true)}
                                                                    className={errors.feeIncomeAccountId && touched.feeIncomeAccountId ? "is-invalid" : null}
                                                                    noOptionsMessage ={() => "No accounts available"}
                                                                    
                                                                    name="feeIncomeAccountId"
                                                                        
                                                                        
                                                                    />
                                                            </Col>
                                                            <Col sm={2}>
                                                                <span>Any GL Account</span>
                                                            </Col>
                                                        </Form.Group>
                                                        {(values.methodology==='2' && values.interestPaid===true) && 
                                                            <Form.Group as={Row} className="center-aligned">
                                                                <Form.Label column sm={4} className="block-level">Interest Accrued Method</Form.Label>
                                                                <Col sm={6}>
                                                                    <Select
                                                                        options={interestAccruedMethodList}
                                                                        defaultValue ={{label:(incomeAcruedMethodReturned!==null)?incomeAcruedMethodReturned.label:null, 
                                                                            value:incomeAcruedMethodReturned!==null? incomeAcruedMethodReturned.value:null}}
                                                                        onChange={(selected) => setFieldValue('interestAccruedMethod', selected.value)}
                                                                        onBlur={()=> setFieldTouched('interestAccruedMethod', true)}
                                                                        
                                                                        className={errors.interestAccruedMethod && touched.interestAccruedMethod ? "is-invalid" : null}
                                                                        name="interestAccruedMethod"
                                                                        
                                                                        
                                                                    />
                                                                </Col>
                                                                {/* <Col sm={2}>
                                                                    <span>Expense</span>
                                                                </Col> */}
                                                            </Form.Group>
                                                        }
                                                    </div>
                                                }
                                                
                                                
                                                
                                                
                                            </div>
                                        </Accordion.Collapse>
                                    </Accordion>
                                    
                                    

                                    
                                    
                                    

                                





                                    <div className="footer-with-cta toleft">
                                        
                                        {/* <NavLink to={'/administration/products/deposits'} className="btn btn-secondary grayed-out">Cancel</NavLink> */}
                                        <Button variant="light" 
                                                        className="btn btn-secondary grayed-out"
                                                        onClick={()=>this.props.history.goBack()}
                                                >
                                                    Cancel</Button>
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