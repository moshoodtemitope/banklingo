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
        this.getAllGLAccounts();
        
        this.getALoanProduct(this.props.match.params.encodedKey)
     }

    getAllGLAccounts = () =>{
        const {dispatch} = this.props;

        dispatch(acoountingActions.getAllGLAccounts());
    }

    getALoanProduct =  (encodedKey)=>{
        const {dispatch} = this.props;
       
        
         dispatch(productActions.getSingleLoanProduct(encodedKey));
    }

    

    handleUpdateLoanProduct = async(updateLoanProductPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(productActions.updateLoanProduct(updateLoanProductPayload, this.props.match.params.encodedKey));

    }

    renderUpdateLoanProduct =()=>{
        let updateLoanProductRequest = this.props.updateLoanProductReducer,
            getSingleLoanProductRequest = this.props.getSingleLoanProductsReducer,
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

          let allProductTypes =[
            {value: '0', label: 'Fixed Term Loan'},
            {value: '1', label: 'Dynamic Term Loan'},
            {value: '2', label: 'Interest Free Loan'},
            {value: '3', label: 'Tranched Loan'},
            {value: '4', label: 'Revolving Credit'},
        ];

        let methodologyList =[
            {value: '0', label: 'None'},
            {value: '1', label: 'Cash'},
            {value: '2', label: 'Accrual'},
        ];

        if (getAllGLAccountsRequest.request_status ===accountingConstants.GET_ALL_GLACCOUNTS_PENDING ||
            getSingleLoanProductRequest.request_status ===productsConstants.GET_A_LOAN_PRODUCT_PENDING){
            return (
                <div className="loading-content card"> 
                    <div className="loading-text">Please wait... </div>
                </div>
            )
        }

        if (getAllGLAccountsRequest.request_status ===accountingConstants.GET_ALL_GLACCOUNTS_SUCCESS ||
            getSingleLoanProductRequest.request_status ===productsConstants.GET_A_LOAN_PRODUCT_SUCCESS){
                let allGlAccounts = [],
                glAccountsList,
                loanProductDetails = getSingleLoanProductRequest.request_data.response.data; 
                

            // console.log("Data dskdns", getSingleLoanProductRequest.request_data.response.data);

            if(getAllGLAccountsRequest.request_data.response.data.length>=1){
                glAccountsList= getAllGLAccountsRequest.request_data.response.data;


                let productTypeSelect =allProductTypes.filter(eachType=>parseInt(eachType.value)===loanProductDetails.loanProductType)[0];
                        // this.productDesc= productTypeSelect.desc;
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


                let txtSrcReturned = transactionSourceAccount.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.transactionSourceAccountId)[0],
                    portfolioControlAccountReturned = portfolioControlAccounts.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.portfolioControlAccountId)[0],
                    writeOffExpenseAccountReturned = writeOffExpenseAccounts.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.writeOffExpenseAccountId)[0],
                    interestReceivableAccountReturned = interestReceivableAccounts.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.interestReceivableAccountId)[0],
                    feeReceivableAccountReturned = feeReceivableAccounts.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.feeReceivableAccountId)[0],
                    penaltyReceivableAccountReturned = penaltyReceivableAccounts.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.penaltyReceivableAccountId)[0],
                    feeIncomeAccReturned = allGlAccounts.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.feeIncomeAccountId)[0],
                    interestIncomeAccountReturned = interestIncomeAccounts.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.interestIncomeAccountId)[0],
                    penaltyIncomeAccountReturned = penaltyIncomeAccounts.filter(eachItem=>eachItem.value===loanProductDetails.loanProductAccountingRuleModel.penaltyIncomeAccountId)[0],
                    methodologyReturned = methodologyList.filter(eachItem=>eachItem.value===loanProductDetails.methodology.toString())[0];
                return(
                    
                        <Formik
                        initialValues={{
                            key: (loanProductDetails.key!==undefined && loanProductDetails.key!==null)?loanProductDetails.key:'',
                            productName: (loanProductDetails.productName!==undefined && loanProductDetails.productName!==null)?loanProductDetails.productName:'',
                            loanProductType: (loanProductDetails.loanProductType!==undefined && loanProductDetails.loanProductType!==null)?loanProductDetails.loanProductType:'',
                            description: (loanProductDetails.description!==undefined && loanProductDetails.description!==null)?loanProductDetails.description:'',
                            portfolioControlAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null)?loanProductDetails.loanProductAccountingRuleModel.portfolioControlAccountId.toString():0,
                            transactionSourceAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null)?loanProductDetails.loanProductAccountingRuleModel.transactionSourceAccountId.toString():0,
                            writeOffExpenseAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null)?loanProductDetails.loanProductAccountingRuleModel.writeOffExpenseAccountId.toString():0,
                            interestReceivableAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null)?loanProductDetails.loanProductAccountingRuleModel.interestReceivableAccountId.toString():0,
                            feeReceivableAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null)?loanProductDetails.loanProductAccountingRuleModel.feeReceivableAccountId.toString():0,
                            penaltyReceivableAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null)?loanProductDetails.loanProductAccountingRuleModel.penaltyReceivableAccountId.toString():0,
                            feeIncomeAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null)?loanProductDetails.loanProductAccountingRuleModel.feeIncomeAccountId.toString():0,
                            interestIncomeAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null)?loanProductDetails.loanProductAccountingRuleModel.interestIncomeAccountId.toString():0,
                            penaltyIncomeAccountId: (loanProductDetails.loanProductAccountingRuleModel!==undefined && loanProductDetails.loanProductAccountingRuleModel!==null)?loanProductDetails.loanProductAccountingRuleModel.penaltyIncomeAccountId.toString():0,
                            methodology: (loanProductDetails.methodology!==undefined && loanProductDetails.methodology!==null)?loanProductDetails.methodology:'',
                            isActive: (loanProductDetails.isActive!==undefined && loanProductDetails.isActive!==null)?loanProductDetails.isActive:'',
                        }}

                        // validationSchema={loanProductValidationSchema}
                        validator={() => ({})}
                        onSubmit={(values, { resetForm }) => {

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
                                methodology: parseInt(values.methodology),
                                isActive: values.isActive
                                
                            }



                            this.handleUpdateLoanProduct(updateLoanProductPayload)
                                .then(
                                    () => {

                                        if (this.props.updateLoanProductReducer.request_status === productsConstants.EDIT_A_LOAN_PRODUCT_SUCCESS) {
                                            setTimeout(() => {
                                                resetForm();
                                                this.props.dispatch(productActions.updateLoanProduct("CLEAR"))
                                            }, 3000);
                                        }else{
                                            setTimeout(() => {
                                                this.props.dispatch(productActions.updateLoanProduct("CLEAR"))
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
                                        defaultValue ={{label:portfolioControlAccountReturned!==null?portfolioControlAccountReturned.label:null, 
                                            value:portfolioControlAccountReturned!==null? portfolioControlAccountReturned.value:null}}
                                        onChange={(selectedProductType) => {
                                            this.setState({ selectedProductType });
                                            errors.loanProductType = null
                                            values.loanProductType = selectedProductType.value
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
                                    Loan Product Rules
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <div>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Portfolio Control Account</Form.Label>
                                                <Select
                                                    options={portfolioControlAccounts}
                                                    defaultValue ={{label:portfolioControlAccountReturned!==null?portfolioControlAccountReturned.label:null, 
                                                        value:portfolioControlAccountReturned!==null? portfolioControlAccountReturned.value:null}}
                                                    onChange={(selectedPortfolioAcct) => {
                                                        this.setState({ selectedPortfolioAcct });
                                                        errors.portfolioControlAccountId = null
                                                        values.portfolioControlAccountId = selectedPortfolioAcct.value
                                                    }}
                                                    className={errors.portfolioControlAccountId && touched.portfolioControlAccountId ? "is-invalid" : null}
                                                    
                                                    noOptionsMessage ={() => "No accounts available"}
                                                    name="portfolioControlAccountId"
                                                    
                                                    
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">Transaction Source Account</Form.Label>
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
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Write-off Expense Account</Form.Label>
                                                <Select
                                                    options={writeOffExpenseAccounts}
                                                    defaultValue ={{label:writeOffExpenseAccountReturned!==null?writeOffExpenseAccountReturned.label:null, 
                                                        value:writeOffExpenseAccountReturned!==null? writeOffExpenseAccountReturned.value:null}}
                                                    onChange={(selectedWriteOffExpenseAcct) => {
                                                        this.setState({ selectedWriteOffExpenseAcct });
                                                        errors.writeOffExpenseAccountId = null
                                                        values.writeOffExpenseAccountId = selectedWriteOffExpenseAcct.value
                                                    }}
                                                    className={errors.writeOffExpenseAccountId && touched.writeOffExpenseAccountId ? "is-invalid" : null}
                                                    noOptionsMessage ={() => "No accounts available"}
                                                    
                                                    name="writeOffExpenseAccountId"
                                                    
                                                    
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">Interest Receivable Account</Form.Label>
                                                <Select
                                                    options={interestReceivableAccounts}
                                                    defaultValue ={{label:interestReceivableAccountReturned!==null?interestReceivableAccountReturned.label:null, 
                                                        value:interestReceivableAccountReturned!==null? interestReceivableAccountReturned.value:null}}
                                                    onChange={(selectedInterestReceivableAcct) => {
                                                        this.setState({ selectedInterestReceivableAcct });
                                                        errors.interestReceivableAccountId = null
                                                        values.interestReceivableAccountId = selectedInterestReceivableAcct.value
                                                    }}
                                                    className={errors.interestReceivableAccountId && touched.interestReceivableAccountId ? "is-invalid" : null}
                                                    noOptionsMessage ={() => "No accounts available"}
                                                    
                                                    name="interestReceivableAccountId"
                                                    
                                                    
                                                />
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Fee Receivable Account</Form.Label>
                                                <Select
                                                    options={feeReceivableAccounts}
                                                    defaultValue ={{label:feeReceivableAccountReturned!==null?feeReceivableAccountReturned.label:null, 
                                                        value:feeReceivableAccountReturned!==null? feeReceivableAccountReturned.value:null}}
                                                    onChange={(selectedFeeReceivableAcct) => {
                                                        this.setState({ selectedFeeReceivableAcct });
                                                        errors.feeReceivableAccountId = null
                                                        values.feeReceivableAccountId = selectedFeeReceivableAcct.value
                                                    }}
                                                    className={errors.feeReceivableAccountId && touched.feeReceivableAccountId ? "is-invalid" : null}
                                                    noOptionsMessage ={() => "No accounts available"}
                                                    
                                                    name="feeReceivableAccountId"
                                                    
                                                    
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">Penalty Receivable Account</Form.Label>
                                                <Select
                                                    options={penaltyReceivableAccounts}
                                                    defaultValue ={{label:penaltyReceivableAccountReturned!==null?penaltyReceivableAccountReturned.label:null, 
                                                        value:penaltyReceivableAccountReturned!==null? penaltyReceivableAccountReturned.value:null}}
                                                    onChange={(selectedPenaltyReceivableAcct) => {
                                                        this.setState({ selectedPenaltyReceivableAcct });
                                                        errors.penaltyReceivableAccountId = null
                                                        values.penaltyReceivableAccountId = selectedPenaltyReceivableAcct.value
                                                    }}
                                                    className={errors.penaltyReceivableAccountId && touched.penaltyReceivableAccountId ? "is-invalid" : null}
                                                    noOptionsMessage ={() => "No accounts available"}
                                                    
                                                    name="penaltyReceivableAccountId"
                                                    
                                                    
                                                />
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Fee Income Account</Form.Label>
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
                                            <Col>
                                                <Form.Label className="block-level">Interest Income Account</Form.Label>
                                                <Select
                                                    options={interestIncomeAccounts}
                                                    defaultValue ={{label:interestIncomeAccountReturned!==null?interestIncomeAccountReturned.label:null, 
                                                        value:interestIncomeAccountReturned!==null? interestIncomeAccountReturned.value:null}}
                                                    onChange={(selectedInterestIncomeAcct) => {
                                                        this.setState({ selectedInterestIncomeAcct });
                                                        errors.interestIncomeAccountId = null
                                                        values.interestIncomeAccountId = selectedInterestIncomeAcct.value
                                                    }}
                                                    className={errors.interestIncomeAccountId && touched.interestIncomeAccountId ? "is-invalid" : null}
                                                    noOptionsMessage ={() => "No accounts available"}
                                                    
                                                    name="interestIncomeAccountId"
                                                    
                                                    
                                                />
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Penalty Income Account</Form.Label>
                                                <Select
                                                    options={penaltyIncomeAccounts}
                                                    defaultValue ={{label:penaltyIncomeAccountReturned!==null?penaltyIncomeAccountReturned.label:null, 
                                                        value:penaltyIncomeAccountReturned!==null? penaltyIncomeAccountReturned.value:null}}
                                                    onChange={(selectedPenaltyIncomeAcct) => {
                                                        this.setState({ selectedPenaltyIncomeAcct });
                                                        errors.penaltyIncomeAccountId = null
                                                        values.penaltyIncomeAccountId = selectedPenaltyIncomeAcct.value
                                                    }}
                                                    className={errors.penaltyIncomeAccountId && touched.penaltyIncomeAccountId ? "is-invalid" : null}
                                                    noOptionsMessage ={() => "No accounts available"}
                                                    
                                                    name="penaltyIncomeAccountId"
                                                    
                                                    
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">Methodology</Form.Label>
                                                {/* <select id="toshow" 
                                                        // defaultValue={methodologyReturned}
                                                        onChange={handleChange}
                                                        value={values.methodology}
                                                        className="countdropdown form-control form-control-sm">
                                                    <option value="0">None</option>
                                                    <option value="1">Cash</option>
                                                    <option value="2">Accrual</option>
                                                </select> */}
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
                                    </div>
                                </Accordion.Collapse>
                            </Accordion>

                        





                            <div className="footer-with-cta toleft">
                                
                                <NavLink to={'/administration/products'} className="btn btn-secondary grayed-out">Cancel</NavLink>
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
    };
}

export default connect(mapStateToProps) (EditLoanProduct);