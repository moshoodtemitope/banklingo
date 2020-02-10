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

    handleCreateNewLoanProduct = async(newLoanProductPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(productActions.createLoanProduct(newLoanProductPayload));

    }


    renderCreateLoanProduct =()=>{
        let createLoanProductRequest = this.props.createDepositProductReducer,
            getAllGLAccountsRequest = this.props.getAllGLAccountsReducer;

        let loanProductValidationSchema = Yup.object().shape({
            key: Yup.string()
                .min(1, 'Response required')
                .required('Required'),
            productName:  Yup.string()
                .min(2, 'Valid response required')
                .required('Required'),
            depositAccountTypeEnum: Yup.string()
                .required('Required'),
            description:  Yup.string()
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
                                loanProductType: '',
                                description: '',
                                savingsControlAccountId: '',
                                transactionSourceAccountId: '',
                                interestExpenseAccountId: '',
                                interestReceivableAccountId: '',
                                feeReceivableAccountId: '',
                                penaltyReceivableAccountId: '',
                                feeIncomeAccountId: '',
                                interestAccruedMethod: '',
                                // penaltyIncomeAccountId: '',
                                methodology: 0,
                                isActive: true,
                            }}

                            validationSchema={loanProductValidationSchema}
                            onSubmit={(values, { resetForm }) => {

                                let createNewLoanProductPayload = {
                                    key: values.key,
                                    productName: values.productName,
                                    loanProductType: values.loanProductType,
                                    description: values.description,
                                    loanProductAccountingRuleModel :{
                                        id:0,
                                        portfolioControlAccountId: values.portfolioControlAccountId,
                                        transactionSourceAccountId: values.transactionSourceAccountId,
                                        writeOffExpenseAccountId: values.writeOffExpenseAccountId,
                                        interestReceivableAccountId: values.interestReceivableAccountId,
                                        feeReceivableAccountId: values.feeReceivableAccountId,
                                        penaltyReceivableAccountId: values.penaltyReceivableAccountId,
                                        feeIncomeAccountId: values.feeIncomeAccountId,
                                        interestIncomeAccountId: values.interestIncomeAccountId,
                                    },
                                    methodology: values.methodology,
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
                                                errors.depositAccountTypeEnum = null
                                                values.depositAccountTypeEnum = selectedProductType.value
                                            }}
                                            className={errors.depositAccountTypeEnum && touched.depositAccountTypeEnum ? "is-invalid" : null}
                                            
                                            
                                            name="depositAccountTypeEnum"
                                            
                                            required
                                        />
                                        {errors.depositAccountTypeEnum && touched.depositAccountTypeEnum ? (
                                            <span className="invalid-feedback">{errors.depositAccountTypeEnum}</span>
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
                                                        value={values.productName}
                                                        className={errors.productName && touched.productName ? "is-invalid" : null}
                                                        name="productName" required />
                                                    {errors.productName && touched.productName ? (
                                                        <span className="invalid-feedback">{errors.productName}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Recommended Deposit Amount</Form.Label>
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
                                        <Form.Label className="block-level">Dormant after how many days</Form.Label>
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
                                        <div className="checkbox-wrap">
                                            <input type="checkbox" 
                                                id="isActive" 
                                                checked={values.isActive? values.isActive:null}
                                                name="isActive"
                                                onChange={handleChange} 
                                                value={values.isActive}  />
                                            <label htmlFor="isActive">Automatically setAccount as dormant</label>
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
                                </Form.Row>

                            





                                <div className="footer-with-cta toleft">
                                    
                                    <NavLink to={'/administration/products'} className="btn btn-secondary grayed-out">Cancel</NavLink>
                                    <Button
                                        type="submit"
                                        disabled={createLoanProductRequest.is_request_processing}>
                                        {createLoanProductRequest.is_request_processing?"Please wait...": "Save Product"}
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
        createDepositProductReducer : state.loanProductReducers.createDepositProductReducer,
        getAllGLAccountsReducer : state.accountingReducers.getAllGLAccountsReducer,
    };
}


export default connect(mapStateToProps)(NewDepositsProduct);