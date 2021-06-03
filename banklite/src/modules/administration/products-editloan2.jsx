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

import {noWhiteSpaces} from "../../shared/utils"
import "./administration.scss";
class EditLoanProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            typeDesc:null
        }
        this.productDesc ="";

    }

    componentDidMount(){
        this.props.dispatch(productActions.updateLoanProduct("CLEAR"));
        this.getAllGLAccounts();
        this.getAllDepositProducts();
        this.getALoanProduct(this.props.match.params.encodedKey);
        
     }

    getAllGLAccounts = () =>{
        const {dispatch} = this.props;

        dispatch(acoountingActions.getAllGLAccounts());
    }

    getALoanProduct =  (encodedKey)=>{
        const {dispatch} = this.props;


         dispatch(productActions.getSingleLoanProduct(encodedKey));
    }

    getAllDepositProducts = ()=>{
        const {dispatch} = this.props;

        dispatch(productActions.getAllDepositProducts(null, true));
    }

    handleUpdateLoanProduct = async(updateLoanProductPayload)=>{
        const {dispatch} = this.props;

        await dispatch(productActions.updateLoanProduct(updateLoanProductPayload, this.props.match.params.encodedKey));

    }




    handleCreateNewLoanProduct = async(newLoanProductPayload)=>{
        const {dispatch} = this.props;

        await dispatch(productActions.createLoanProduct(newLoanProductPayload));

    }


    renderUpdateLoanProduct =()=>{
        // let createLoanProductRequest = this.props.createLoanProductReducer,
        //     getAllGLAccountsRequest = this.props.getAllGLAccountsReducer;

        let updateLoanProductRequest = this.props.updateLoanProductReducer,
            getSingleLoanProductRequest = this.props.getSingleLoanProductsReducer,
            getAllGLAccountsRequest = this.props.getAllGLAccountsReducer;
           let getAllDepositProductsRequest = this.props.getAllDepositProductsReducer

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
                { value: 0, label: 'Fixed Term Loan' },
                { value: 1, label: 'Dynamic Term Loan' },
                { value: 2, label: 'Interest Free Loan' },
                { value: 3, label: 'Tranched Loan' },
                { value: 4, label: 'Revolving Credit' },
            ],
            arrearsDaysCalculation=[
                { value: 1, label: 'Date Arrears first went Into Arrears' },
                { value: 2, label: 'Date Of The Oldest Currently Late Repayment' },
            ],
            interestRateTermsOptions=[
                { value: 1, label: '% per year' },
                { value: 2, label: '% per month' },
                { value: 3, label: '% per 4 weeks' },
                { value: 4, label: '% per week' },
                { value: 5, label: '% per x days' },
            ],
            interestBalanceCalculationOptions=[
                { value: 1, label: 'Flat' },
                { value: 2, label: 'Declining Balance' },
                { value: 3, label: 'Declining Balance Equal Installments' }
            ],
            repaymentPeriodOptions=[
                { value: 1, label: 'Years' },
                { value: 2, label: 'Months' },
                { value: 3, label: 'Weeks' },
                { value: 4, label: 'Days' }
            ],
            settlementOptionsList=[
                { value: 0, label: 'No Automated Transfers' },
                { value: 1, label: 'Allow Partial Transfers' },
                { value: 2, label: 'Only Transfer Full Due' }
            ];



            if (getAllGLAccountsRequest.request_status ===accountingConstants.GET_ALL_GLACCOUNTS_PENDING ||
                getSingleLoanProductRequest.request_status ===productsConstants.GET_A_LOAN_PRODUCT_PENDING){
                return (
                    <div className="loading-content card">
                        <div className="loading-text">Please wait... </div>
                    </div>
                )
            }

            if (getAllGLAccountsRequest.request_status ===accountingConstants.GET_ALL_GLACCOUNTS_SUCCESS &&
                    getSingleLoanProductRequest.request_status ===productsConstants.GET_A_LOAN_PRODUCT_SUCCESS
                    && getAllDepositProductsRequest.request_status===productsConstants.GET_ALL_DEPOSIT_PRODUCTS_SUCCESS
                    ){
                let allGlAccounts = [],
                    glAccountsList,
                    loanProductDetails = getSingleLoanProductRequest.request_data.response.data;



                  
                 
                    let allDepositProducts = getAllDepositProductsRequest.request_data.response.data,
                    allCurrencies = getAllDepositProductsRequest.request_data.response3.data,
                    allDepositProductsList      =[
                        {
                            label: "ANY",
                            value: "ANY"
                        }
                    ];
                
                allDepositProducts.map((product, id)=>{
                    allDepositProductsList.push({label: product.productName, value:product.productEncodedKey});
                })

                    

                if(getAllGLAccountsRequest.request_data.response.data.length>=1){
                    glAccountsList= getAllGLAccountsRequest.request_data.response.data;

                    // let productTypeSelect =allProductTypes.filter(eachType=>parseInt(eachType.value)===loanProductDetails.loanProductType)[0];
                    //     this.productDesc= productTypeSelect.desc;

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



                    let txtSrcReturned = transactionSourceAccount.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.transactionSourceAccountId)[0]||null;
                    let  portfolioControlAccountReturned = portfolioControlAccounts.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.portfolioControlAccountId)[0]||null;
                    let    writeOffExpenseAccountReturned = writeOffExpenseAccounts.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.writeOffExpenseAccountId)[0]||null;
                    let interestReceivableAccountReturned = interestReceivableAccounts.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.interestReceivableAccountId)[0]||null;
                    let feeReceivableAccountReturned = feeReceivableAccounts.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.feeReceivableAccountId)[0]||null;
                    let penaltyReceivableAccountReturned = penaltyReceivableAccounts.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.penaltyReceivableAccountId)[0]||null;
                    let feeIncomeAccReturned = allGlAccounts.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.feeIncomeAccountId)[0]||null;
                    let interestIncomeAccountReturned = interestIncomeAccounts.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.interestIncomeAccountId)[0]||null;
                    let penaltyIncomeAccountReturned = penaltyIncomeAccounts.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.penaltyIncomeAccountId)[0]||null;


                    let productTypeReturned = allProductTypes.filter(eachItem=>eachItem.value===loanProductDetails.loanProductType)[0]||null;
                    let interestRateTermReturned = interestRateTermsOptions.filter(eachItem=>eachItem.value===loanProductDetails.loanProductInterestSetting.interestRateTerms)[0]||null;
                    let interestBalanceCalculationReturned = interestBalanceCalculationOptions.filter(eachItem=>eachItem.value===loanProductDetails.loanProductInterestSetting.interestBalanceCalculation)[0]||null;
                    let repaymentPeriodReturned = repaymentPeriodOptions.filter(eachItem=>eachItem.value===loanProductDetails.repaymentReschedulingModel.repaymentPeriod)[0]||null;
                    let arrearsDaysCalculationReturned = arrearsDaysCalculation.filter(eachItem=>eachItem.value===loanProductDetails.arrearsSetting.arrearsDaysCalculatedFrom)[0]||null;



                     //"loanProductLinkModel":{"enableLinking":true,"depositProductEncodedKey":"bb476975-2ee1-4927-b35e-200a62614d34","settlementOptions":1,"autoSetSettlementAccountOnCreation":false,"autoCreateSettlementAccount":false}

                        // console.log("+++++", transactionSourceAccount);
                        // methodologyReturned = methodologyList.filter(eachItem=>eachItem.value===loanProductDetails.methodology.toString())[0]||null;

                    return(

                            <Formik
                            initialValues={{
                                key: (loanProductDetails.key!==undefined && loanProductDetails.key!==null)?loanProductDetails.key:'',
                                productName: (loanProductDetails.productName!==undefined && loanProductDetails.productName!==null)?loanProductDetails.productName:'',
                                loanProductType: (loanProductDetails.loanProductType!==undefined && loanProductDetails.loanProductType!==null)?loanProductDetails.loanProductType:'',
                                description: (loanProductDetails.description!==undefined && loanProductDetails.description!==null)?loanProductDetails.description:'',
                                portfolioControlAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null && loanProductDetails.loanProductAccountingRuleModel.portfolioControlAccountId!==null)
                                                                ?loanProductDetails.loanProductAccountingRuleModel.portfolioControlAccountId.toString():0,
                                transactionSourceAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null && loanProductDetails.loanProductAccountingRuleModel.transactionSourceAccountId!==null)
                                                                ?loanProductDetails.loanProductAccountingRuleModel.transactionSourceAccountId.toString():0,
                                writeOffExpenseAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null && loanProductDetails.loanProductAccountingRuleModel.writeOffExpenseAccountId!==null)
                                                                ?loanProductDetails.loanProductAccountingRuleModel.writeOffExpenseAccountId.toString():0,
                                interestReceivableAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null && loanProductDetails.loanProductAccountingRuleModel.interestReceivableAccountId!==null)
                                                                ?loanProductDetails.loanProductAccountingRuleModel.interestReceivableAccountId.toString():0,
                                feeReceivableAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null && loanProductDetails.loanProductAccountingRuleModel.feeReceivableAccountId!==null)
                                                                ?loanProductDetails.loanProductAccountingRuleModel.feeReceivableAccountId.toString():0,
                                penaltyReceivableAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null && loanProductDetails.loanProductAccountingRuleModel.penaltyReceivableAccountId!==null)
                                                                ?loanProductDetails.loanProductAccountingRuleModel.penaltyReceivableAccountId.toString():0,
                                feeIncomeAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null && loanProductDetails.loanProductAccountingRuleModel.feeIncomeAccountId!==null)
                                                                ?loanProductDetails.loanProductAccountingRuleModel.feeIncomeAccountId.toString():0,
                                interestIncomeAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null && loanProductDetails.loanProductAccountingRuleModel.interestIncomeAccountId!==null)
                                                                ?loanProductDetails.loanProductAccountingRuleModel.interestIncomeAccountId.toString():0,
                                penaltyIncomeAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null && loanProductDetails.loanProductAccountingRuleModel.penaltyIncomeAccountId!==null)
                                                                ?loanProductDetails.loanProductAccountingRuleModel.penaltyIncomeAccountId.toString():0,
                                arearsTolerancePeriodInDaysDefault: loanProductDetails.arrearsSetting && loanProductDetails.arrearsSetting.arearsTolerancePeriodInDaysDefault
                                                                    ? loanProductDetails.arrearsSetting.arearsTolerancePeriodInDaysDefault.toString() : null,
                                arearsTolerancePeriodInDaysMin: loanProductDetails.arrearsSetting && loanProductDetails.arrearsSetting.arearsTolerancePeriodInDaysMin
                                                                    ? loanProductDetails.arrearsSetting.arearsTolerancePeriodInDaysMin.toString() : null,
                                arearsTolerancePeriodInDaysMax: loanProductDetails.arrearsSetting && loanProductDetails.arrearsSetting.arearsTolerancePeriodInDaysMax
                                                                    ? loanProductDetails.arrearsSetting.arearsTolerancePeriodInDaysMax.toString() : null,
                                arrearsDaysCalculationChosen: loanProductDetails.arrearsSetting && loanProductDetails.arrearsSetting.arrearsDaysCalculatedFrom
                                                                    ? loanProductDetails.arrearsSetting.arrearsDaysCalculatedFrom.toString() : null,
                                defaultLoanAmount: loanProductDetails.loanAmountSetting && loanProductDetails.loanAmountSetting.loanAmountDefault
                                                        ? loanProductDetails.loanAmountSetting.loanAmountDefault.toString() : null,
                                minimumLoanAmount: loanProductDetails.loanAmountSetting && loanProductDetails.loanAmountSetting.loanAmountMinimun
                                                    ? loanProductDetails.loanAmountSetting.loanAmountMinimun.toString() : null,
                                maximumLoanAmount: loanProductDetails.loanAmountSetting && loanProductDetails.loanAmountSetting.loanAmountMaximum
                                                        ? loanProductDetails.loanAmountSetting.loanAmountMaximum.toString() : null,
                                methodology: (loanProductDetails.methodology!==undefined && loanProductDetails.methodology!==null)?loanProductDetails.methodology.toString():'',
                                isActive: (loanProductDetails.isActive!==undefined && loanProductDetails.isActive!==null)?loanProductDetails.isActive:'',
                                interestPaid:(loanProductDetails.loanProductInterestSetting!==undefined && loanProductDetails.loanProductInterestSetting!==null && loanProductDetails.loanProductInterestSetting.interestPaid!==null)
                                                    ?loanProductDetails.loanProductInterestSetting.interestPaid:false,
                                interestRateTerms:(loanProductDetails.loanProductInterestSetting!==undefined && loanProductDetails.loanProductInterestSetting!==null && loanProductDetails.loanProductInterestSetting.interestRateTerms!==null)
                                                        ?loanProductDetails.loanProductInterestSetting.interestRateTerms:0,
                                interestBalanceCalculation: (loanProductDetails.loanProductInterestSetting!==undefined && loanProductDetails.loanProductInterestSetting!==null && loanProductDetails.loanProductInterestSetting.interestBalanceCalculation!==null)
                                                                ?loanProductDetails.loanProductInterestSetting.interestBalanceCalculation:0,
                                interestRateDefault: loanProductDetails.loanProductInterestSetting && loanProductDetails.loanProductInterestSetting.interestRateDefault
                                                        ? loanProductDetails.loanProductInterestSetting.interestRateDefault : null,
                                interestRateMin: loanProductDetails.loanProductInterestSetting && loanProductDetails.loanProductInterestSetting.interestRateMin
                                                    ? loanProductDetails.loanProductInterestSetting.interestRateMin : null,
                                interestRateMax: loanProductDetails.loanProductInterestSetting && loanProductDetails.loanProductInterestSetting.interestRateMax
                                                    ? loanProductDetails.loanProductInterestSetting.interestRateMax : null,
                                repaymentEvery: loanProductDetails.repaymentReschedulingModel && loanProductDetails.repaymentReschedulingModel.repaymentEvery
                                                    ? loanProductDetails.repaymentReschedulingModel.repaymentEvery : null,
                                repaymentPeriod: loanProductDetails.repaymentReschedulingModel && loanProductDetails.repaymentReschedulingModel.repaymentPeriod
                                                    ? loanProductDetails.repaymentReschedulingModel.repaymentPeriod : null,
                                interestBalanceCalculationSelected: (loanProductDetails.repaymentReschedulingModel!==undefined && loanProductDetails.repaymentReschedulingModel!==null && loanProductDetails.repaymentReschedulingModel.interestBalanceCalculation!==null)
                                                                        ?loanProductDetails.repaymentReschedulingModel.interestBalanceCalculation:0,
                                firstDueDateOffsetConstraintDefault: loanProductDetails.repaymentReschedulingModel && loanProductDetails.repaymentReschedulingModel.firstDueDateOffsetConstraintDefault
                                                                        ? loanProductDetails.repaymentReschedulingModel.firstDueDateOffsetConstraintDefault : null,
                                firstDueDateOffsetConstraintMin: loanProductDetails.repaymentReschedulingModel && loanProductDetails.repaymentReschedulingModel.firstDueDateOffsetConstraintMin
                                                                    ? loanProductDetails.repaymentReschedulingModel.firstDueDateOffsetConstraintMin : null,
                                firstDueDateOffsetConstraintMax: loanProductDetails.repaymentReschedulingModel && loanProductDetails.repaymentReschedulingModel.firstDueDateOffsetConstraintMax
                                                                    ? loanProductDetails.repaymentReschedulingModel.firstDueDateOffsetConstraintMax : null,
                                installmentsDefault: loanProductDetails.repaymentReschedulingModel && loanProductDetails.repaymentReschedulingModel.installmentsDefault
                                                        ? loanProductDetails.repaymentReschedulingModel.installmentsDefault : null,
                                installmentsMin: loanProductDetails.repaymentReschedulingModel && loanProductDetails.repaymentReschedulingModel.installmentsMin
                                                    ? loanProductDetails.repaymentReschedulingModel.installmentsMin : null,
                                installmentsMax: loanProductDetails.repaymentReschedulingModel && loanProductDetails.repaymentReschedulingModel.installmentsMax
                                                    ? loanProductDetails.repaymentReschedulingModel.installmentsMax : null,
                                collectPrincipalEveryRepayments:(loanProductDetails.repaymentReschedulingModel!==undefined && loanProductDetails.repaymentReschedulingModel!==null && loanProductDetails.repaymentReschedulingModel.collectPrincipalEveryRepayments!==null)
                                                                    ?loanProductDetails.repaymentReschedulingModel.collectPrincipalEveryRepayments:0,


                                                                    isEnableLinking:loanProductDetails.loanProductLinkModel.enableLinking,
                                                                    depositProductEncodedKey: loanProductDetails.loanProductLinkModel.depositProductEncodedKey,//allDepositProductsList!==null?allDepositProductsList[0].value:null,
                                                                    settlementOptions:loanProductDetails.loanProductLinkModel.settlementOptions, 
                                                                    autoSetSettlementAccountOnCreation:loanProductDetails.loanProductLinkModel.autoSetSettlementAccountOnCreation,
                                                                    autoCreateSettlementAccount: loanProductDetails.loanProductLinkModel.autoCreateSettlementAccount
                            }}

                            validationSchema={loanProductValidationSchema}
                            onSubmit={(values, { resetForm }) => {

                                console.log("sdsds",values.interestRateDefault);
                              
                                let updateLoanProductPayload = {
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
                                        arearsTolerancePeriodInDaysMin: parseInt(values.arearsTolerancePeriodInDaysMin),
                                        arearsTolerancePeriodInDaysMax: parseInt(values.arearsTolerancePeriodInDaysMax)
                                    },
                                    loanProductInterestSetting: {
                                        interestPaid: values.interestPaid,
                                        interestRateTerms: parseInt(values.interestRateTerms),
                                        interestBalanceCalculation: parseInt(values.interestBalanceCalculation),
                                        interestRateDefault: parseFloat(values.interestRateDefault.toString().replace(/,/g, '')),
                                        interestRateMin: parseFloat(values.interestRateMin.toString().replace(/,/g, '')),
                                        interestRateMax: parseFloat(values.interestRateMax.toString().replace(/,/g, '')),
                                      },
                                    loanAmountSetting: {
                                        loanAmountDefault: parseFloat(values.defaultLoanAmount.toString().replace(/,/g, '')),
                                        loanAmountMinimun: parseFloat(values.minimumLoanAmount.toString().replace(/,/g, '')),
                                        loanAmountMaximum: parseFloat(values.maximumLoanAmount.toString().replace(/,/g, ''))
                                    },

                                    repaymentReschedulingModel: {
                                        repaymentEvery: parseInt(values.repaymentEvery),
                                        repaymentPeriod: parseInt(values.repaymentPeriod),
                                        interestBalanceCalculation: parseInt(values.interestBalanceCalculationSelected),
                                        firstDueDateOffsetConstraintDefault: parseInt(values.firstDueDateOffsetConstraintDefault),
                                        firstDueDateOffsetConstraintMin: parseInt(values.firstDueDateOffsetConstraintMin),
                                        firstDueDateOffsetConstraintMax: parseInt(values.firstDueDateOffsetConstraintMax),
                                        installmentsDefault: parseFloat(values.installmentsDefault.toString().replace(/,/g, '')),
                                        installmentsMin: parseFloat(values.installmentsMin.toString().replace(/,/g, '')),
                                        installmentsMax: parseFloat(values.installmentsMax.toString().replace(/,/g, '')),
                                        collectPrincipalEveryRepayments: parseInt(values.collectPrincipalEveryRepayments)
                                    },
                                    // loanProductLinkModel:{
                                    //     enableLinking
                                    // }
                                    methodology: parseInt(values.methodology),
                                    isActive: values.isActive

                                }

                                //"loanProductLinkModel":{"enableLinking":true,"depositProductEncodedKey":"bb476975-2ee1-4927-b35e-200a62614d34","settlementOptions":1,"autoSetSettlementAccountOnCreation":false,"autoCreateSettlementAccount":false}

                                if(values.isEnableLinking===false){
                                    updateLoanProductPayload.loanProductLinkModel={
                                        enableLinking: values.isEnableLinking,
                                        depositProductEncodedKey: null,
                                        settlementOptions: 0,
                                        autoSetSettlementAccountOnCreation: false,
                                        // autoSetSettlementAccountOnCreation: null,
                                        // autoCreateSettlementAccount: null
                                        autoCreateSettlementAccount: false
                                    }
                                }

                                if(values.isEnableLinking===true){
                                    updateLoanProductPayload.loanProductLinkModel={
                                        enableLinking: true,
                                        depositProductEncodedKey: values.depositProductEncodedKey,
                                        settlementOptions: values.settlementOptions,
                                        autoSetSettlementAccountOnCreation: values.autoSetSettlementAccountOnCreation,
                                        autoCreateSettlementAccount: values.autoCreateSettlementAccount
                                    }
                                }

                                this.handleUpdateLoanProduct(updateLoanProductPayload)
                                    .then(
                                        () => {

                                            if (this.props.updateLoanProductReducer.request_status === productsConstants.EDIT_A_LOAN_PRODUCT_SUCCESS) {
                                                setTimeout(() => {
                                                    // resetForm();
                                                    this.props.dispatch(productActions.updateLoanProduct("CLEAR"))
                                                }, 3000);
                                            }else{
                                                // setTimeout(() => {
                                                //     this.props.dispatch(productActions.updateLoanProduct("CLEAR"))
                                                // }, 3000);
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
                                    <h3>Edit {loanProductDetails.productName}</h3>
                                </div>
                                <Form.Row>
                                    <Col>
                                        <Form.Label className="block-level">Product Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            onChange={handleChange}
                                            value={values.productName}
                                            className={errors.productName && touched.productName ? "is-invalid" : ""}
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
                                            className={errors.key && touched.key ? "is-invalid" : ""}
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
                                            defaultValue ={{label:productTypeReturned!==null?productTypeReturned.label:null,
                                                value:productTypeReturned!==null? productTypeReturned.value:null}}
                                            // onChange={(selectedProductType) => {
                                            //     this.setState({ selectedProductType });
                                            //     errors.loanProductType = null
                                            //     values.loanProductType = selectedProductType.value
                                            // }}
                                            onChange={(selected) => setFieldValue('loanProductType', selected.value)}
                                            onBlur={()=> setFieldTouched('loanProductType', true)}
                                            className={errors.loanProductType && touched.loanProductType ? "is-invalid" : ""}


                                            name="loanProductType"

                                            required
                                        />
                                        {errors.loanProductType && touched.loanProductType ? (
                                            <span className="invalid-feedback">{errors.loanProductType}</span>
                                        ) : null}
                                    </Col>
                                    <Col>
                                        <Form.Label className="block-level">Currency</Form.Label>
                                        <Form.Control
                                            type="text"
                                            disabled={true}
                                            className="h-38px"
                                            onChange={()=>{}}
                                            value={loanProductDetails.currencyCode}
                                             />
                                        
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
                                                    className={errors.description && touched.description ? "is-invalid" : ""}
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
                                                    <Form.Label className="block-level">Default Loan Amount ({loanProductDetails.currencyCode}) </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithCommas(values.defaultLoanAmount)}
                                                        className={errors.defaultLoanAmount && touched.defaultLoanAmount ? "is-invalid" : ""}
                                                        name="defaultLoanAmount" required />
                                                    {errors.defaultLoanAmount && touched.defaultLoanAmount ? (
                                                        <span className="invalid-feedback">{errors.defaultLoanAmount}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Minimum Loan Amount ({loanProductDetails.currencyCode})</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithCommas(values.minimumLoanAmount)}
                                                        className={errors.minimumLoanAmount && touched.minimumLoanAmount ? "is-invalid" : ""}
                                                        name="minimumLoanAmount" required />
                                                    {errors.minimumLoanAmount && touched.minimumLoanAmount ? (
                                                        <span className="invalid-feedback">{errors.minimumLoanAmount}</span>
                                                    ) : null}
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Maximum Loan Amount ({loanProductDetails.currencyCode})</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithCommas(values.maximumLoanAmount)}
                                                        className={errors.maximumLoanAmount && touched.maximumLoanAmount ? "is-invalid" : ""}
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
                                                        value={numberWithCommas(values.arearsTolerancePeriodInDaysDefault)}
                                                        className={errors.arearsTolerancePeriodInDaysDefault && touched.arearsTolerancePeriodInDaysDefault ? "is-invalid" : ""}
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
                                                        value={numberWithCommas(values.arearsTolerancePeriodInDaysMin)}
                                                        className={errors.arearsTolerancePeriodInDaysMin && touched.arearsTolerancePeriodInDaysMin ? "is-invalid" : ""}
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
                                                        value={numberWithCommas(values.arearsTolerancePeriodInDaysMax)}
                                                        className={errors.arearsTolerancePeriodInDaysMax && touched.arearsTolerancePeriodInDaysMax ? "is-invalid" : ""}
                                                        name="arearsTolerancePeriodInDaysMax" required />
                                                    {errors.arearsTolerancePeriodInDaysMax && touched.arearsTolerancePeriodInDaysMax ? (
                                                        <span className="invalid-feedback">{errors.arearsTolerancePeriodInDaysMax}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Arrears Days Calculated From</Form.Label>

                                                    <Select
                                                        options={arrearsDaysCalculation}
                                                        defaultValue ={{label:arrearsDaysCalculationReturned!==null?arrearsDaysCalculationReturned.label:null,
                                                            value:arrearsDaysCalculationReturned!==null? arrearsDaysCalculationReturned.value:null}}
                                                        // onChange={(selectedArrearsDaysCalculation) => {
                                                        //     this.setState({ selectedArrearsDaysCalculation });
                                                        //     errors.arrearsDaysCalculationChosen = null
                                                        //     values.arrearsDaysCalculationChosen = selectedArrearsDaysCalculation.value
                                                        // }}
                                                        onChange={(selected) => setFieldValue('arrearsDaysCalculationChosen', selected.value)}
                                                        onBlur={()=> setFieldTouched('arrearsDaysCalculationChosen', true)}
                                                        className={errors.arrearsDaysCalculationChosen && touched.arrearsDaysCalculationChosen ? "is-invalid" : ""}


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
                                                                defaultValue ={{label:interestBalanceCalculationReturned!==null?interestBalanceCalculationReturned.label:null,
                                                                    value:interestBalanceCalculationReturned!==null? interestBalanceCalculationReturned.value:null}}

                                                                onChange={(selected) => setFieldValue('interestBalanceCalculation', selected.value)}
                                                                onBlur={()=> setFieldTouched('interestBalanceCalculation', true)}
                                                                className={errors.interestBalanceCalculation && touched.interestBalanceCalculation ? "is-invalid" : ""}


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
                                                                defaultValue ={{label:interestRateTermReturned!==null?interestRateTermReturned.label:null,
                                                                    value:interestRateTermReturned!==null? interestRateTermReturned.value:null}}
                                                                // onChange={(selectedInterestRateTermsOptions) => {
                                                                //     this.setState({ selectedInterestRateTermsOptions });
                                                                //     errors.interestRateTerms = null
                                                                //     values.interestRateTerms = selectedInterestRateTermsOptions.value
                                                                // }}
                                                                onChange={(selected) => setFieldValue('interestRateTerms', selected.value)}
                                                                onBlur={()=> setFieldTouched('interestRateTerms', true)}
                                                                className={errors.interestRateTerms && touched.interestRateTerms ? "is-invalid" : ""}


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
                                                                className={errors.interestRateDefault && touched.interestRateDefault ? "is-invalid" : ""}
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
                                                                className={errors.interestRateMin && touched.interestRateMin ? "is-invalid" : ""}
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
                                                                className={errors.interestRateMax && touched.interestRateMax ? "is-invalid" : ""}
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
                                                                className={errors.depositProductEncodedKey && touched.depositProductEncodedKey ? "is-invalid" : ""}


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
                                                        {/* //"loanProductLinkModel":{"enableLinking":true,"depositProductEncodedKey":"bb476975-2ee1-4927-b35e-200a62614d34","settlementOptions":1,"autoSetSettlementAccountOnCreation":false,"autoCreateSettlementAccount":false} */}
                                                        {/* isEnableLinking:loanProductDetails.loanProductLinkModel.enableLinking,
                                                                    depositProductEncodedKey: loanProductDetails.loanProductLinkModel.depositProductEncodedKey,//allDepositProductsList!==null?allDepositProductsList[0].value:null,
                                                                    settlementOptions:loanProductDetails.loanProductLinkModel.settlementOptions, 
                                                                    autoSetSettlementAccountOnCreation:loanProductDetails.loanProductLinkModel.autoSetSettlementAccountOnCreation,
                                                                    autoCreateSettlementAccount: loanProductDetails.loanProductLinkModel.autoCreateSettlementAccount */}
                                                        <Form.Label className="block-level">Settlement Options</Form.Label>
                                                            <Select
                                                                options={settlementOptionsList}
                                                                onChange={(selectedsettlementOption) => {
                                                                    
                                                                    setFieldValue('settlementOptions', selectedsettlementOption.value)
                                                                }}
                                                                defaultValue={{label:settlementOptionsList[0].label, value: settlementOptionsList[0].value}}
                                                                className={errors.settlementOptions && touched.settlementOptions ? "is-invalid" : ""}


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
                                                        value={numberWithCommas(values.repaymentEvery)}
                                                        className={errors.repaymentEvery && touched.repaymentEvery ? "is-invalid" : ""}
                                                        name="repaymentEvery" required />
                                                    {errors.repaymentEvery && touched.repaymentEvery ? (
                                                        <span className="invalid-feedback">{errors.repaymentEvery}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Repayments Period</Form.Label>

                                                    <Select
                                                        options={repaymentPeriodOptions}
                                                        defaultValue ={{label:repaymentPeriodReturned!==null?repaymentPeriodReturned.label:null,
                                                            value:repaymentPeriodReturned!==null? repaymentPeriodReturned.value:null}}
                                                        // onChange={(selectedRepaymentPeriodOptions) => {
                                                        //     this.setState({ selectedRepaymentPeriodOptions });
                                                        //     errors.repaymentPeriod = null
                                                        //     values.repaymentPeriod = selectedRepaymentPeriodOptions.value
                                                        // }}
                                                        onChange={(selected) => setFieldValue('repaymentPeriod', selected.value)}
                                                        onBlur={()=> setFieldTouched('repaymentPeriod', true)}
                                                        className={errors.repaymentPeriod && touched.repaymentPeriod ? "is-invalid" : ""}


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
                                                        defaultValue ={{label:interestBalanceCalculationReturned!==null?interestBalanceCalculationReturned.label:null,
                                                            value:interestBalanceCalculationReturned!==null? interestBalanceCalculationReturned.value:null}}
                                                        // onChange={(selectedInterestBalanceCalculation) => {
                                                        //     this.setState({ selectedInterestBalanceCalculation });
                                                        //     errors.interestBalanceCalculationSelected = null
                                                        //     values.interestBalanceCalculationSelected = selectedInterestBalanceCalculation.value
                                                        // }}
                                                        onChange={(selected) => setFieldValue('interestBalanceCalculationSelected', selected.value)}
                                                        onBlur={()=> setFieldTouched('interestBalanceCalculationSelected', true)}
                                                        className={errors.interestBalanceCalculationSelected && touched.interestBalanceCalculationSelected ? "is-invalid" : ""}


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
                                                        value={numberWithCommas(values.firstDueDateOffsetConstraintDefault)}
                                                        className={errors.firstDueDateOffsetConstraintDefault && touched.firstDueDateOffsetConstraintDefault ? "is-invalid" : ""}
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
                                                        value={numberWithCommas(values.firstDueDateOffsetConstraintMin)}
                                                        className={errors.firstDueDateOffsetConstraintMin && touched.firstDueDateOffsetConstraintMin ? "is-invalid" : ""}
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
                                                        value={numberWithCommas(values.firstDueDateOffsetConstraintMax)}
                                                        className={errors.firstDueDateOffsetConstraintMax && touched.firstDueDateOffsetConstraintMax ? "is-invalid" : ""}
                                                        name="firstDueDateOffsetConstraintMax" required />
                                                    {errors.firstDueDateOffsetConstraintMax && touched.firstDueDateOffsetConstraintMax ? (
                                                        <span className="invalid-feedback">{errors.firstDueDateOffsetConstraintMax}</span>
                                                    ) : null}
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Installments Default </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithCommas(values.installmentsDefault)}
                                                        className={errors.installmentsDefault && touched.installmentsDefault ? "is-invalid" : ""}
                                                        name="installmentsDefault" required />
                                                    {errors.installmentsDefault && touched.installmentsDefault ? (
                                                        <span className="invalid-feedback">{errors.installmentsDefault}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Installments Minimum </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithCommas(values.installmentsMin)}
                                                        className={errors.installmentsMin && touched.installmentsMin ? "is-invalid" : ""}
                                                        name="installmentsMin" required />
                                                    {errors.installmentsMin && touched.installmentsMin ? (
                                                        <span className="invalid-feedback">{errors.installmentsMin}</span>
                                                    ) : null}
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Installments Maximum</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={numberWithCommas(values.installmentsMax)}
                                                        className={errors.installmentsMax && touched.installmentsMax ? "is-invalid" : ""}
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
                                                        value={numberWithCommas(values.collectPrincipalEveryRepayments)}
                                                        className={errors.collectPrincipalEveryRepayments && touched.collectPrincipalEveryRepayments ? "is-invalid" : ""}
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


                                          {values.methodology !== "0" && (
                                            <>
                                              <Form.Group as={Row} className="center-aligned">
                                                <Form.Label column sm={4} className="block-level">Portfolio Control
                                                  Account</Form.Label>
                                                <Col sm={6}>

                                                  <Select
                                                    options={portfolioControlAccounts}
                                                    defaultValue={{
                                                      label: portfolioControlAccountReturned !== null ? portfolioControlAccountReturned.label : null,
                                                      value: portfolioControlAccountReturned !== null ? portfolioControlAccountReturned.value : null
                                                    }}
                                                    // onChange={(selectedPortfolioAcct) => {
                                                    //     this.setState({ selectedPortfolioAcct });
                                                    //     errors.portfolioControlAccountId = null
                                                    //     values.portfolioControlAccountId = selectedPortfolioAcct.value
                                                    // }}
                                                    onChange={(selected) => setFieldValue('portfolioControlAccountId', selected.value)}
                                                    onBlur={() => setFieldTouched('portfolioControlAccountId', true)}
                                                    className={errors.portfolioControlAccountId && touched.portfolioControlAccountId ? "is-invalid" : ""}

                                                    noOptionsMessage={() => "No accounts available"}
                                                    name="portfolioControlAccountId"


                                                  />
                                                </Col>
                                                <Col sm={2}>
                                                  <span>Asset</span>
                                                </Col>
                                              </Form.Group>

                                              <Form.Group as={Row} className="center-aligned">
                                                <Form.Label column sm={4} className="block-level">Transaction Control
                                                  Account</Form.Label>
                                                <Col sm={6}>
                                                  <Select
                                                    options={transactionSourceAccount}
                                                    defaultValue={{
                                                      label: txtSrcReturned !== null ? txtSrcReturned.label : null,
                                                      value: txtSrcReturned !== null ? txtSrcReturned.value : null
                                                    }}
                                                    // onChange={(selectedTxtSourceAcct) => {
                                                    //     this.setState({ selectedTxtSourceAcct });
                                                    //     errors.transactionSourceAccountId = null
                                                    //     values.transactionSourceAccountId = selectedTxtSourceAcct.value
                                                    // }}
                                                    onChange={(selected) => setFieldValue('transactionSourceAccountId', selected.value)}
                                                    onBlur={() => setFieldTouched('transactionSourceAccountId', true)}
                                                    className={errors.transactionSourceAccountId && touched.transactionSourceAccountId ? "is-invalid" : ""}
                                                    noOptionsMessage={() => "No accounts available"}

                                                    name="transactionSourceAccountId"


                                                  />
                                                </Col>
                                                <Col sm={2}>
                                                  <span>Asset</span>
                                                </Col>
                                              </Form.Group>

                                              <Form.Group as={Row} className="center-aligned">
                                                <Form.Label column sm={4} className="block-level">Write-off Expense
                                                  Account</Form.Label>
                                                <Col sm={6}>
                                                  <Select
                                                    options={writeOffExpenseAccounts}
                                                    defaultValue={{
                                                      label: writeOffExpenseAccountReturned !== null ? writeOffExpenseAccountReturned.label : null,
                                                      value: writeOffExpenseAccountReturned !== null ? writeOffExpenseAccountReturned.value : null
                                                    }}
                                                    // onChange={(selectedWriteOffExpenseAcct) => {
                                                    //     this.setState({ selectedWriteOffExpenseAcct });
                                                    //     errors.writeOffExpenseAccountId = null
                                                    //     values.writeOffExpenseAccountId = selectedWriteOffExpenseAcct.value
                                                    // }}
                                                    onChange={(selected) => setFieldValue('writeOffExpenseAccountId', selected.value)}
                                                    onBlur={() => setFieldTouched('writeOffExpenseAccountId', true)}
                                                    className={errors.writeOffExpenseAccountId && touched.writeOffExpenseAccountId ? "is-invalid" : ""}
                                                    noOptionsMessage={() => "No accounts available"}

                                                    name="writeOffExpenseAccountId"


                                                  />
                                                </Col>
                                                <Col sm={2}>
                                                  <span>Expense</span>
                                                </Col>
                                              </Form.Group>
                                              {values.methodology !== "1" &&
                                              <div>
                                                <Form.Group as={Row} className="center-aligned">
                                                  <Form.Label column sm={4} className="block-level">Interest Receivable
                                                    Account</Form.Label>
                                                  <Col sm={6}>
                                                    <Select
                                                      options={interestReceivableAccounts}
                                                      defaultValue={{
                                                        label: interestReceivableAccountReturned !== null ? interestReceivableAccountReturned.label : null,
                                                        value: interestReceivableAccountReturned !== null ? interestReceivableAccountReturned.value : null
                                                      }}
                                                      // onChange={(selectedInterestReceivableAcct) => {
                                                      //     this.setState({ selectedInterestReceivableAcct });
                                                      //     errors.interestReceivableAccountId = null
                                                      //     values.interestReceivableAccountId = selectedInterestReceivableAcct.value
                                                      // }}
                                                      onChange={(selected) => setFieldValue('interestReceivableAccountId', selected.value)}
                                                      onBlur={() => setFieldTouched('interestReceivableAccountId', true)}
                                                      className={errors.interestReceivableAccountId && touched.interestReceivableAccountId ? "is-invalid" : ""}
                                                      noOptionsMessage={() => "No accounts available"}

                                                      name="interestReceivableAccountId"


                                                    />
                                                  </Col>
                                                  <Col sm={2}>
                                                    <span>Asset</span>
                                                  </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="center-aligned">
                                                  <Form.Label column sm={4} className="block-level">Fee Receivable
                                                    Account</Form.Label>
                                                  <Col sm={6}>
                                                    <Select
                                                      options={feeReceivableAccounts}
                                                      defaultValue={{
                                                        label: feeReceivableAccountReturned !== null ? feeReceivableAccountReturned.label : null,
                                                        value: feeReceivableAccountReturned !== null ? feeReceivableAccountReturned.value : null
                                                      }}
                                                      // onChange={(selectedFeeReceivableAcct) => {
                                                      //     this.setState({ selectedFeeReceivableAcct });
                                                      //     errors.feeReceivableAccountId = null
                                                      //     values.feeReceivableAccountId = selectedFeeReceivableAcct.value
                                                      // }}
                                                      onChange={(selected) => setFieldValue('feeReceivableAccountId', selected.value)}
                                                      onBlur={() => setFieldTouched('feeReceivableAccountId', true)}
                                                      className={errors.feeReceivableAccountId && touched.feeReceivableAccountId ? "is-invalid" : ""}
                                                      noOptionsMessage={() => "No accounts available"}

                                                      name="feeReceivableAccountId"


                                                    />
                                                  </Col>
                                                  <Col sm={2}>
                                                    <span>Asset</span>
                                                  </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="center-aligned">
                                                  <Form.Label column sm={4} className="block-level">Penalty Receivable
                                                    Account</Form.Label>
                                                  <Col sm={6}>
                                                    <Select
                                                      options={penaltyReceivableAccounts}
                                                      defaultValue={{
                                                        label: penaltyReceivableAccountReturned !== null ? penaltyReceivableAccountReturned.label : null,
                                                        value: penaltyReceivableAccountReturned !== null ? penaltyReceivableAccountReturned.value : null
                                                      }}
                                                      // onChange={(selectedPenaltyReceivableAcct) => {
                                                      //     this.setState({ selectedPenaltyReceivableAcct });
                                                      //     errors.penaltyReceivableAccountId = null
                                                      //     values.penaltyReceivableAccountId = selectedPenaltyReceivableAcct.value
                                                      // }}
                                                      onChange={(selected) => setFieldValue('penaltyReceivableAccountId', selected.value)}
                                                      onBlur={() => setFieldTouched('penaltyReceivableAccountId', true)}
                                                      className={errors.penaltyReceivableAccountId && touched.penaltyReceivableAccountId ? "is-invalid" : ""}
                                                      noOptionsMessage={() => "No accounts available"}

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
                                                <Form.Label column sm={4} className="block-level">Fee Income
                                                  Account</Form.Label>
                                                <Col sm={6}>
                                                  <Select
                                                    options={allGlAccounts}
                                                    defaultValue={{
                                                      label: feeIncomeAccReturned !== null ? feeIncomeAccReturned.label : null,
                                                      value: feeIncomeAccReturned !== null ? feeIncomeAccReturned.value : null
                                                    }}
                                                    // onChange={(selectedFeeIncomeAcct) => {
                                                    //     this.setState({ selectedFeeIncomeAcct });
                                                    //     errors.feeIncomeAccountId = null
                                                    //     values.feeIncomeAccountId = selectedFeeIncomeAcct.value
                                                    // }}
                                                    onChange={(selected) => setFieldValue('feeIncomeAccountId', selected.value)}
                                                    onBlur={() => setFieldTouched('feeIncomeAccountId', true)}
                                                    className={errors.feeIncomeAccountId && touched.feeIncomeAccountId ? "is-invalid" : ""}
                                                    noOptionsMessage={() => "No accounts available"}

                                                    name="feeIncomeAccountId"


                                                  />
                                                </Col>
                                                <Col sm={2}>
                                                  <span>Any GL Account</span>
                                                </Col>
                                              </Form.Group>

                                              <Form.Group as={Row} className="center-aligned">
                                                <Form.Label column sm={4} className="block-level">Interest Income
                                                  Account</Form.Label>
                                                <Col sm={6}>
                                                  <Select
                                                    options={interestIncomeAccounts}
                                                    defaultValue={{
                                                      label: interestIncomeAccountReturned !== null ? interestIncomeAccountReturned.label : null,
                                                      value: interestIncomeAccountReturned !== null ? interestIncomeAccountReturned.value : null
                                                    }}
                                                    // onChange={(selectedInterestIncomeAcct) => {
                                                    //     this.setState({ selectedInterestIncomeAcct });
                                                    //     errors.interestIncomeAccountId = null
                                                    //     values.interestIncomeAccountId = selectedInterestIncomeAcct.value
                                                    // }}
                                                    onChange={(selected) => setFieldValue('interestIncomeAccountId', selected.value)}
                                                    onBlur={() => setFieldTouched('interestIncomeAccountId', true)}
                                                    className={errors.interestIncomeAccountId && touched.interestIncomeAccountId ? "is-invalid" : ""}
                                                    noOptionsMessage={() => "No accounts available"}

                                                    name="interestIncomeAccountId"


                                                  />
                                                </Col>
                                                <Col sm={2}>
                                                  <span>Income</span>
                                                </Col>
                                              </Form.Group>

                                              <Form.Group as={Row} className="center-aligned">
                                                <Form.Label column sm={4} className="block-level">Penalty Income
                                                  Account</Form.Label>
                                                <Col sm={6}>
                                                  <Select
                                                    options={penaltyIncomeAccounts}
                                                    defaultValue={{
                                                      label: penaltyIncomeAccountReturned !== null ? penaltyIncomeAccountReturned.label : null,
                                                      value: penaltyIncomeAccountReturned !== null ? penaltyIncomeAccountReturned.value : null
                                                    }}
                                                    // onChange={(selectedPenaltyIncomeAcct) => {
                                                    //     this.setState({ selectedPenaltyIncomeAcct });
                                                    //     errors.penaltyIncomeAccountId = null
                                                    //     values.penaltyIncomeAccountId = selectedPenaltyIncomeAcct.value
                                                    // }}
                                                    onChange={(selected) => setFieldValue('penaltyIncomeAccountId', selected.value)}
                                                    onBlur={() => setFieldTouched('penaltyIncomeAccountId', true)}
                                                    className={errors.penaltyIncomeAccountId && touched.penaltyIncomeAccountId ? "is-invalid" : ""}
                                                    noOptionsMessage={() => "No accounts available"}

                                                    name="penaltyIncomeAccountId"


                                                  />
                                                </Col>
                                                <Col sm={2}>
                                                  <span>Income</span>
                                                </Col>
                                              </Form.Group>
                                            </>
                                          )}


                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>







                                <div className="footer-with-cta toleft">

                                    {/* <NavLink to={'/administration/products'} className="btn btn-secondary grayed-out">Cancel</NavLink> */}
                                    <Button variant="light"
                                        className="btn btn-secondary grayed-out"
                                        onClick={()=>this.props.history.goBack()}
                                >
                                    Cancel</Button>
                                    <Button
                                        type="submit"
                                        disabled={updateLoanProductRequest.is_request_processing}>
                                        {updateLoanProductRequest.is_request_processing?"Please wait...": "Save Product"}
                                    </Button>
                                </div>
                                {updateLoanProductRequest.request_status === productsConstants.EDIT_A_LOAN_PRODUCT_SUCCESS &&
                                    <Alert variant="success">
                                        {updateLoanProductRequest.request_data.response.data.message}
                                    </Alert>
                                }
                                {updateLoanProductRequest.request_status === productsConstants.EDIT_A_LOAN_PRODUCT_FAILURE &&
                                    <Alert variant="danger">
                                        {updateLoanProductRequest.request_data.error}
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

            if (getSingleLoanProductRequest.request_status === productsConstants.GET_A_LOAN_PRODUCT_FAILURE){
                return (
                    <div className="loading-content card">
                        <div>{getSingleLoanProductRequest.request_data.error}</div>
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
                                                {this.renderUpdateLoanProduct()}
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
        getSingleLoanProductsReducer : state.productReducers.getSingleLoanProductsReducer,
        updateLoanProductReducer : state.productReducers.updateLoanProductReducer,
        adminGetAllCurrencies : state.administrationReducers.adminGetAllCurrenciesReducer,
        getAllGLAccountsReducer : state.accountingReducers.getAllGLAccountsReducer,
        getAllDepositProductsReducer : state.productReducers.getAllDepositProductsReducer,

        createLoanProductReducer : state.productReducers.createLoanProductReducer,
    };
}


export default connect(mapStateToProps)(EditLoanProduct);
