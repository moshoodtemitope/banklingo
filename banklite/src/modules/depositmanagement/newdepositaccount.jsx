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
import Row from 'react-bootstrap/Row'
import { Formik } from 'formik';
import * as Yup from 'yup';

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { numberWithCommas, allowNumbersOnly} from '../../shared/utils';

import Alert from 'react-bootstrap/Alert'
import { productActions } from '../../redux/actions/products/products.action';
import { productsConstants } from '../../redux/actiontypes/products/products.constants'

import {clientsActions} from '../../redux/actions/clients/clients.action';
import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'

import {depositActions} from '../../redux/actions/deposits/deposits.action';
import {loanAndDepositsConstants} from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'
import "./depositmanagement.scss"; 
class NewDepositAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:100,
            CurrentPage:1,
        }

        this.selectedDepositProductDetails="";
    }

    componentDidMount(){
        this.loadInitialData();
    }

    loadInitialData=()=>{
        let {PageSize, CurrentPage}= this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
        this.getAllDepositProducts(params);
        this.getAllClients(params);
    }


    getAllClients = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(clientsActions.getAllClients(paramters));
    }

    getAllDepositProducts = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(productActions.getAllDepositProducts(paramters, true));
    }

    getSingleDepositProduct = async(encodedKey)=>{
        const {dispatch} = this.props;
       
        await dispatch(productActions.getSingleDepositProduct(encodedKey));
        
    }

    createDepositAccount = async(accouuntPayload, accountType)=>{
        const {dispatch} = this.props;
       
        await dispatch(depositActions.createDepositAccount(accouuntPayload, accountType));
        
    }

    getADepositProduct =  (encodedKey)=>{
        // const {dispatch} = this.props;
       
        
        //  dispatch(productActions.getSingleDepositProduct(encodedKey));
         this.getSingleDepositProduct(encodedKey)
            .then(productDetails=>{
                
                this.selectedDepositProductDetails = this.props.getSingleDepositProductsReducer.request_data.response.data;
                this.setState({selectedDepositProductDetails: this.selectedDepositProductDetails})
            })
    }


    renderCreateDepositAccount =()=>{
        let getAllDepositProductsRequest = this.props.getAllDepositProductsReducer,
            createDepositAccountRequest = this.props.createDepositAccountReducer,
            getClientsRequest = this.props.getAllClientsReducer,
            {selectedDepositProductDetails} = this.state;

           
                if(getAllDepositProductsRequest.request_status===productsConstants.GET_ALL_DEPOSIT_PRODUCTS_PENDING 
                    ||getClientsRequest.request_status=== clientsConstants.GET_ALL_CLIENTS_PENDING){
                        return (
                            <div className="loading-content card"> 
                                <div className="loading-text">Please wait... </div>
                            </div>
                        )
                }
                
            
                if(getAllDepositProductsRequest.request_status===productsConstants.GET_ALL_DEPOSIT_PRODUCTS_SUCCESS 
                    && getClientsRequest.request_status=== clientsConstants.GET_ALL_CLIENTS_SUCCESS){
                        
                        if(getAllDepositProductsRequest.request_data.response.data.length>=1){
                            if(getClientsRequest.request_data.response.data.length>=1){
                                let allDepositProducts = getAllDepositProductsRequest.request_data.response.data,
                                    allCustomers = getClientsRequest.request_data.response.data,
                                    allCustomersList =[],
                                    allDepositProductsList =[];

                                    

                                    allDepositProducts.map((product, id)=>{
                                        allDepositProductsList.push({label: product.productName, value:product.productEncodedKey});
                                    })

                                    allCustomers.map((customer, id)=>{
                                        allCustomersList.push({label: customer.clientName, value:customer.clientEncodedKey});
                                    })

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

                                let interestBalanceCalculations =[
                                    {value: '1', label: 'Minimum Daily Balance'},
                                    {value: '2', label: 'Maximum Daily Balance'},
                                    {value: '3', label: 'End of Day Balance'},
                                ];

                                let interestRateTerms =[
                                    {value: 1, label: '% per year'},
                                    {value: 2, label: '% per month'},
                                    {value: 3, label: '% per 4 weeks'},
                                    {value: 4, label: '% per week'},
                                    {value: 5, label: '% per x days'},
                                ];

                                let whenInterestIsPaidList =[
                                    {value: '1', label: 'First day of every month'},
                                    {value: '2', label: 'Every week'},
                                    {value: '3', label: 'Every other week'},
                                    {value: '4', label: 'Every month'},
                                    {value: '5', label: 'Every three months'},
                                ];

                                if(selectedDepositProductDetails===undefined){
                                    if(getAllDepositProductsRequest.request_data.response2){
                                        this.selectedDepositProductDetails =getAllDepositProductsRequest.request_data.response2.data
                                    }
                                }else{
                                    this.selectedDepositProductDetails = selectedDepositProductDetails;
                                }

                                // console.log("produc info", this.selectedDepositProductDetails);

                                let depositProductType = allProductTypes.filter((eachType)=>eachType.value=== this.selectedDepositProductDetails.depositAccountType.toString())[0];
                                
                                let depositInterestCalculation = interestBalanceCalculations.filter((eachType)=>eachType.value === this.selectedDepositProductDetails.depositProductInterestSettingModel.interestBalanceCalculation.toString())[0];

                                let whenInterestIsPaidReturned = whenInterestIsPaidList.filter(eachItem=>eachItem.value===this.selectedDepositProductDetails.depositProductInterestSettingModel.whenInterestIsPaid.toString())[0]||null;
                                
                                let interestRateTermsReturned = interestRateTerms.filter(eachItem=>eachItem.value===this.selectedDepositProductDetails.depositProductInterestSettingModel.interestRateTerms)[0]||null;
                                // console.log("sdsdsds", depositInterestCalculation);
                                let depositAccountValidationSchema = Yup.object().shape({
                                    clientEncodedKey: Yup.string()
                                        .min(1, 'Response required')
                                        .required('Required'),
                                    depositProductEncodedKey:  Yup.string()
                                        .min(2, 'Valid response required')
                                        .required('Required'),
                                    depositProductName:  Yup.string()
                                        .min(1, 'Valid response required')
                                        .required('Required'),
                                    notes:  Yup.string()
                                        .min(3, 'Valid response required'),
                                });
                                return(
                                    <Formik
                                    initialValues={{
                                        // productEncodedKey :'',
                                        // productDisplayName:  allLoanProductsList[0].label,
                                        // interestRate:this.selectedLoanProductDetails.loanProductInterestSetting.interestRateDefault!==null ? this.selectedLoanProductDetails.loanProductInterestSetting.interestRateDefault : '',
                                        clientEncodedKey:'',
                                        depositProductEncodedKey:'',
                                        depositProductName:allDepositProductsList[0].label,
                                        notes:'',
                                        depositProductName:allDepositProductsList!==null?allDepositProductsList[0].label:null,
                                        // maximumWithdrawalAmount:this.selectedDepositProductDetails.depositSavingsSettingModel.maximumWithdrawalAmount.toString(),
                                        maximumWithdrawalAmount:this.selectedDepositProductDetails.depositSavingsSettingModel.maximumWithdrawalAmount!==null ? this.selectedDepositProductDetails.depositSavingsSettingModel.maximumWithdrawalAmount.toString() : '',
                                        recommendedDepositAmount:this.selectedDepositProductDetails.depositSavingsSettingModel.recommendedDepositAmount!==null ? this.selectedDepositProductDetails.depositSavingsSettingModel.recommendedDepositAmount.toString() : '',
                                        interestRate:this.selectedDepositProductDetails.depositProductInterestSettingModel.interestRateDefault!==null ? this.selectedDepositProductDetails.depositProductInterestSettingModel.interestRateDefault.toString() : '',
                                    }}

                                    validationSchema={depositAccountValidationSchema}
                                    onSubmit={(values, { resetForm }) => {

                                        let accountPayload;
                                        let accountType;

                                        if(depositProductType.value==='2'){

                                            accountPayload ={
                                                clientEncodedKey : values.clientEncodedKey,
                                                depositProductEncodedKey: values.depositProductEncodedKey,
                                                depositProductName: values.depositProductName,
                                                notes: values.notes,
                                                maximumWithdrawalAmount:parseFloat(values.maximumWithdrawalAmount.replace(/,/g, '')),
                                                interestRate :parseFloat(values.interestRate.replace(/,/g, ''))
                                            };
                                            
                                            accountType='fixed';
                                        }

                                        if(depositProductType.value==='4'){
                                            accountPayload ={
                                                clientEncodedKey : values.clientEncodedKey,
                                                depositProductEncodedKey: values.depositProductEncodedKey,
                                                depositProductName: values.depositProductName,
                                                notes: values.notes,
                                                maximumWithdrawalAmount:parseFloat(values.interestRate.replace(/,/g, '')),
                                                interestRate :parseFloat(values.interestRate.replace(/,/g, '')),
                                                recommendedDepositAmount :parseFloat(values.recommendedDepositAmount.replace(/,/g, ''))
                                            };
                                            
                                            accountType='savingsaccount';
                                        }

                                        if(depositProductType.value==='5'){
                                            accountPayload ={
                                                clientEncodedKey : values.clientEncodedKey,
                                                depositProductEncodedKey: values.depositProductEncodedKey,
                                                depositProductName: values.depositProductName,
                                                notes: values.notes,
                                                maximumWithdrawalAmount:parseFloat(values.interestRate.replace(/,/g, '')),
                                                recommendedDepositAmount :parseFloat(values.recommendedDepositAmount.replace(/,/g, ''))
                                            }
                                            
                                            accountType='savingsplan';
                                        }


                                        this.createDepositAccount(accountPayload, accountType)
                                        .then(
                                            () => {

                                                if (this.props.createDepositAccountReducer.request_status === loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_SUCCESS) {
                                                    setTimeout(() => {
                                                        resetForm();
                                                        this.props.dispatch(depositActions.createDepositAccount("CLEAR"))
                                                    }, 3000);
                                                }

                                                if (this.props.createDepositAccountReducer.request_status === loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_FAILURE) {
                                                    setTimeout(() => {
                                                        resetForm();
                                                        this.props.dispatch(depositActions.createDepositAccount("CLEAR"))
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
                                                    <h3>Creating A New Deposit Account</h3>
                                                </div>
                                                <Form.Row>
                                                    <Col>
                                                        <Form.Label className="block-level">Customer Name</Form.Label>
                                                        <Select
                                                            options={allCustomersList}
                                                            onChange={(selected) => {
                                                                
                                                                
                                                                setFieldValue('clientEncodedKey', selected.value)
                                                            }}
                                                            placeholder="Search Customer"
                                                            onBlur={()=> setFieldTouched('clientEncodedKey', true)}
                                                            className={errors.clientEncodedKey && touched.clientEncodedKey ? "is-invalid" : null}
                                                            
                                                            
                                                            name="clientEncodedKey"
                                                            
                                                            required
                                                        />
                                                        {errors.clientEncodedKey && touched.clientEncodedKey ? (
                                                            <span className="invalid-feedback">{errors.clientEncodedKey}</span>
                                                        ) : null}
                                                    </Col>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Col>
                                                        <Form.Label className="block-level">Product</Form.Label>
                                                        <Select
                                                            options={allDepositProductsList}
                                                            defaultValue ={{label:allDepositProductsList!==null?allDepositProductsList[0].label:null, 
                                                                value:allDepositProductsList!==null? allDepositProductsList[0].value:null}}
                                                            
                                                            onChange={(selected) => {
                                                                
                                                                values.depositProductName = selected.label;
                                                                setFieldValue('depositProductEncodedKey', selected.value)
                                                                this.getADepositProduct(selected.value)
                                                            }}
                                                            onBlur={()=> setFieldTouched('depositProductEncodedKey', true)}
                                                            className={errors.depositProductEncodedKey && touched.depositProductEncodedKey ? "is-invalid" : null}
                                                            
                                                            
                                                            name="depositProductEncodedKey"
                                                            
                                                            required
                                                        />
                                                        {errors.depositProductEncodedKey && touched.depositProductEncodedKey ? (
                                                            <span className="invalid-feedback">{errors.depositProductEncodedKey}</span>
                                                        ) : null}
                                                    </Col>
                                                    <Col>
                                                        <Form.Label className="block-level">Display Name</Form.Label>
                                                        <Form.Control type="text" 
                                                            onChange={handleChange}
                                                            value={values.depositProductName}
                                                            className={errors.depositProductName && touched.depositProductName ? "is-invalid h-38px" : "h-38px"}
                                                            name="depositProductName" 
                                                            required/>
                                                        {errors.depositProductName && touched.depositProductName ? (
                                                            <span className="invalid-feedback">{errors.depositProductName}</span>
                                                        ) : null}
                                                    </Col>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Col>
                                                        <Form.Label className="block-level">Product Type</Form.Label>
                                                        <span className="form-text">{depositProductType.label} </span>
                                                        {/* <span className="form-text">Simulation of TBills</span> */}
                                                    </Col>
                                                    <Col>
                                                        <Form.Label className="block-level">Currency</Form.Label>
                                                        <span className="form-text">{this.selectedDepositProductDetails.currencyCode}</span>
                                                    </Col>
                                                </Form.Row>

                                                <Accordion defaultActiveKey="0">
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        Deposit Account Terms
                                                            </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div className="each-formsection">
                                                            {depositProductType.value!=='4' &&
                                                                <div>
                                                                    <Form.Row>
                                                                        <Col sm={6}>
                                                                            <Form.Label className="block-level">Interest Rate</Form.Label>
                                                                            <Form.Control type="text"
                                                                                onChange={handleChange}
                                                                                value={values.interestRate}
                                                                                className={errors.interestRate && touched.interestRate ? "is-invalid h-38px" : "h-38px"}
                                                                                name="interestRate" required />
                                                                            <span className="input-helptext">Min: {numberWithCommas(this.selectedDepositProductDetails.depositProductInterestSettingModel.interestRateMin.toString())}%
                                                                                    Max: {numberWithCommas(this.selectedDepositProductDetails.depositProductInterestSettingModel.interestRateMax.toString())}%
                                                                            </span>
                                                                            {errors.interestRate && touched.interestRate ? (
                                                                                <span className="invalid-feedback">{errors.interestRate}</span>
                                                                            ) : null}
                                                                        </Col>
                                                                    </Form.Row>
                                                                    <Form.Row>
                                                                        <Col sm={6}>
                                                                            <Form.Label className="block-level">Interest Calculated Using</Form.Label>
                                                                            <span className="form-text">{(depositInterestCalculation !== undefined && depositInterestCalculation !== null) ? depositInterestCalculation.label : "N/A"}</span>
                                                                        </Col>
                                                                        <Col sm={6}>
                                                                            <Form.Label className="block-level">Opening Balance</Form.Label>
                                                                            <span className="form-text">Min: ₦{this.selectedDepositProductDetails.depositFixedSettingModel.defaultOpeningBalance!==null?`₦${numberWithCommas(this.selectedDepositProductDetails.depositFixedSettingModel.defaultOpeningBalance.toString())}`:"N/A"}
                                                                            </span>
                                                                        </Col>
                                                                    </Form.Row>
                                                                    <Form.Row>
                                                                        <Col sm={6}>
                                                                            <Form.Label className="block-level">Interest paid into account</Form.Label>
                                                                            <span className="form-text">{whenInterestIsPaidReturned!==null?whenInterestIsPaidReturned.label:"N/A"}</span>
                                                                        </Col>
                                                                        
                                                                    </Form.Row>
                                                                </div>
                                                            }
                                                            <Form.Row>
                                                                
                                                                {/* Display this two alone if settlement product is chosen */}
                                                                <Col sm={6}>
                                                                    <Form.Label className="block-level">Maximum Withdrawal Amount(₦)</Form.Label>
                                                                    <Form.Control type="text" 
                                                                        onChange={handleChange}
                                                                        value={numberWithCommas(values.maximumWithdrawalAmount)}
                                                                        className={errors.maximumWithdrawalAmount && touched.maximumWithdrawalAmount ? "is-invalid h-38px" : "h-38px"}
                                                                        name="maximumWithdrawalAmount" 
                                                                        required/>
                                                                    <span className="input-helptext">Max: {this.selectedDepositProductDetails.depositSavingsSettingModel.maximumWithdrawalAmount!==null?`₦${numberWithCommas(this.selectedDepositProductDetails.depositSavingsSettingModel.maximumWithdrawalAmount.toString())}`:"N/A"}</span>
                                                                    {errors.maximumWithdrawalAmount && touched.maximumWithdrawalAmount ? (
                                                                        <span className="invalid-feedback">{errors.maximumWithdrawalAmount}</span>
                                                                    ) : null}
                                                                </Col>
                                                                {depositProductType.value==='4' &&
                                                                    <Col sm={6}>
                                                                        <Form.Label className="block-level">Recommended Deposit Amount(₦)</Form.Label>
                                                                        <Form.Control 
                                                                            onChange={handleChange}
                                                                            value={numberWithCommas(values.recommendedDepositAmount)}
                                                                            className={errors.recommendedDepositAmount && touched.recommendedDepositAmount ? "is-invalid h-38px" : "h-38px"}
                                                                            name="recommendedDepositAmount" 
                                                                            required />
                                                                        {errors.recommendedDepositAmount && touched.recommendedDepositAmount ? (
                                                                            <span className="invalid-feedback">{errors.recommendedDepositAmount}</span>
                                                                        ) : null}
                                                                    </Col>
                                                                }
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Col sm={6}>
                                                                    <Form.Label className="block-level">Interest Rate Terms: 
                                                                        <span> {interestRateTermsReturned!==null?interestRateTermsReturned.label:"N/A"}</span>
                                                                    </Form.Label>
                                                                </Col>
                                                                {depositProductType.value!=='4' &&
                                                                    <Col sm={6}>
                                                                        <Form.Label className="block-level">Term Length</Form.Label>
                                                                        <span className="form-text">{this.selectedDepositProductDetails.depositTermSettingModel.defaultTermLength!==null?`${numberWithCommas(this.selectedDepositProductDetails.depositTermSettingModel.defaultTermLength.toString())}`:"N/A"}</span>
                                                                    </Col>
                                                                }
                                                            </Form.Row>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>

                                                <Accordion defaultActiveKey="0">
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        Account Notes
                                                            </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div className="each-formsection">
                                                            <Form.Group>

                                                                <Form.Control as="textarea" rows="3"
                                                                    onChange={handleChange}
                                                                    value={values.notes}
                                                                    className={errors.notes && touched.notes ? "is-invalid" : null}
                                                                    name="notes" 
                                                                    required  />
                                                                    {errors.notes && touched.notes ? (
                                                                            <span className="invalid-feedback">{errors.notes}</span>
                                                                    ) : null}
                                                            </Form.Group>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>






                                                <div className="footer-with-cta toleft">
                                                    <NavLink to={'/deposits'} className="btn btn-secondary grayed-out">Cancel</NavLink>
                                                    <Button
                                                        type="submit"
                                                        disabled={createDepositAccountRequest.is_request_processing}>
                                                        {createDepositAccountRequest.is_request_processing?"Please wait...": "Create Deposit Account"}
                                                    </Button>
                                                </div>
                                                {createDepositAccountRequest.request_status === loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_SUCCESS && 
                                                    <Alert variant="success">
                                                        {createDepositAccountRequest.request_data.response.data.message}
                                                    </Alert>
                                                }
                                                {createDepositAccountRequest.request_status === loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_FAILURE && 
                                                    <Alert variant="danger">
                                                        {createDepositAccountRequest.request_data.error}
                                                    </Alert>
                                                }
                                            </Form>
                                            
                                        )}
                                    
                                </Formik>
                                )
                            }else{
                                return(
                                    <div className="loading-content card"> 
                                        <div className="loading-text">No Customers Found</div>
                                    </div>
                                )
                            }
                        }else{
                            return(
                                <div className="loading-content card"> 
                                    <div className="loading-text">No Deposit Products Found</div>
                                </div>
                            )
                        }
                }

            
                if(getAllDepositProductsRequest.request_status===productsConstants.GET_ALL_DEPOSIT_PRODUCTS_FAILURE){
                    return (
                        <div className="loading-content card"> 
                            <div>{getAllDepositProductsRequest.request_data.error}</div>
                        </div>
                    )
                }

                if(getClientsRequest.request_status===clientsConstants.GET_ALL_CLIENTS_FAILURE){
                    return (
                        <div className="loading-content card"> 
                            <div>{getClientsRequest.request_data.error}</div>
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
                                                {this.renderCreateDepositAccount()}
                                                {/* <div className="footer-with-cta toleft">
                                                    <Button variant="secondary" className="grayed-out">Rearrange</Button>
                                                    <Button >Add Channel</Button>
                                                </div> */}
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
        createDepositAccountReducer : state.depositsReducers.createDepositAccountReducer,
        getAllDepositProductsReducer : state.productReducers.getAllDepositProductsReducer,
        getAllClientsReducer : state.clientsReducers.getAllClientsReducer,
    };
}

export default connect(mapStateToProps)(NewDepositAccount);