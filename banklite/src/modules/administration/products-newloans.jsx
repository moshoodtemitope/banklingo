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

          let allProductTypes =[
            {value: '0', label: 'Fixed Term Loan'},
            {value: '1', label: 'Dynamic Term Loan'},
            {value: '2', label: 'Interest Free Loan'},
            {value: '3', label: 'Tranched Loan'},
            {value: '4', label: 'Revolving Credit'},
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
                                methodology: 0,
                                isActive: true,
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
                                                            this.setState({ selectedPortfolioAcct });
                                                            errors.portfolioControlAccountId = null
                                                            values.portfolioControlAccountId = selectedPortfolioAcct.value
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
                                                <Form.Label column sm={4} className="block-level">Write-off Expense Account</Form.Label>
                                                <Col sm={6}>
                                                <Select
                                                        options={writeOffExpenseAccounts}
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
                                                            this.setState({ selectedInterestReceivableAcct });
                                                            errors.interestReceivableAccountId = null
                                                            values.interestReceivableAccountId = selectedInterestReceivableAcct.value
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
                                                            this.setState({ selectedFeeReceivableAcct });
                                                            errors.feeReceivableAccountId = null
                                                            values.feeReceivableAccountId = selectedFeeReceivableAcct.value
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
                                                            this.setState({ selectedPenaltyReceivableAcct });
                                                            errors.penaltyReceivableAccountId = null
                                                            values.penaltyReceivableAccountId = selectedPenaltyReceivableAcct.value
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
                                                <Form.Label column sm={4} className="block-level">Interest Income Account</Form.Label>
                                                <Col sm={6}>
                                                <Select
                                                        options={interestIncomeAccounts}
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
                                                            this.setState({ selectedPenaltyIncomeAcct });
                                                            errors.penaltyIncomeAccountId = null
                                                            values.penaltyIncomeAccountId = selectedPenaltyIncomeAcct.value
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
        createLoanProductReducer : state.productReducers.createLoanProductReducer,
        getAllGLAccountsReducer : state.accountingReducers.getAllGLAccountsReducer,
    };
}


export default connect(mapStateToProps)(NewLoanProduct);