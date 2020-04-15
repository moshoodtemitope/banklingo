import * as React from "react";
// import {Router} from "react-router";

import { connect } from 'react-redux';
import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { numberWithCommas, allowNumbersOnly} from '../../shared/utils';

import Alert from 'react-bootstrap/Alert'

import {clientsActions} from '../../redux/actions/clients/clients.action';
import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'

import { productActions } from '../../redux/actions/products/products.action';
import { productsConstants } from '../../redux/actiontypes/products/products.constants'

import {loanActions} from '../../redux/actions/loans/loans.action';
import {loanAndDepositsConstants} from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {noWhiteSpaces} from "../../shared/utils"

import "./loanmanagement.scss"; 
class NewLoanAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:100,
            CurrentPage:1,
        }
        this.selectedLoanProductDetails="";
        
    }

    componentDidMount(){
        this.loadInitialData();
    }

    loadInitialData=()=>{
        let {PageSize, CurrentPage}= this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
        this.getAllLoanProducts(params);
        this.getFullLoanProducts();

        this.getAllClients(params);
    }

    getAllClients = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(clientsActions.getAllClients(paramters));
    }


    getAllLoanProducts = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(productActions.getAllLoanProducts(paramters, true));
    }

    getFullLoanProducts = ()=>{
        const {dispatch} = this.props;

        dispatch(productActions.getFullLoanProducts());
    }

    getSingleLoanProduct = async(encodedKey)=>{
        const {dispatch} = this.props;
       
        await dispatch(productActions.getSingleLoanProduct(encodedKey));
        
    }

    getALoanProduct =  (encodedKey)=>{
        // const {dispatch} = this.props;
       
        
        //  dispatch(productActions.getSingleDepositProduct(encodedKey));
         this.getSingleLoanProduct(encodedKey)
            .then(productDetails=>{
                
                this.selectedLoanProductDetails = this.props.getSingleLoanProductsReducer.request_data.response.data;
                this.setState({selectedLoanProductDetails: this.selectedLoanProductDetails})
            })
    }

    createLoanAccount = async(accouuntPayload, accountType)=>{
        const {dispatch} = this.props;
       
        await dispatch(loanActions.createLoanAccount(accouuntPayload, accountType));
        
    }

    renderCreateLoanAccount = ()=>{
        let getAllLoanProductsRequest = this.props.getAllLoanProductsReducer,
            createLoanAccountRequest = this.props.createLoanAccountReducer,
            getClientsRequest = this.props.getAllClientsReducer,
            {selectedLoanProductDetails} = this.state;
        

            if(getAllLoanProductsRequest.request_status===productsConstants.GET_ALL_LOAN_PRODUCTS_PENDING 
                ||getClientsRequest.request_status=== clientsConstants.GET_ALL_CLIENTS_PENDING){
                return (
                    <div className="loading-content card"> 
                        <div className="loading-text">Please wait... </div>
                    </div>
                )
            }


            if(getAllLoanProductsRequest.request_status===productsConstants.GET_ALL_LOAN_PRODUCTS_SUCCESS 
                ||getClientsRequest.request_status=== clientsConstants.GET_ALL_CLIENTS_PENDING){
                
                    if(getAllLoanProductsRequest.request_data.response.data.length>=1){
                        if(getClientsRequest.request_data.response.data.length>=1){
                            let allLoanProducts = getAllLoanProductsRequest.request_data.response.data,
                                allCustomers = getClientsRequest.request_data.response.data,
                                allCustomersList =[],
                                allLoanProductsList =[];

                                allCustomers.map((customer, id)=>{
                                    allCustomersList.push({label: customer.clientName, value:customer.clientEncodedKey});
                                })

                                allLoanProducts.map((product, id)=>{
                                    allLoanProductsList.push({label: product.loanProductName, value:product.loanProductEncodedKey});
                                })
                            let allProductTypes = [
                                { value: '0', label: 'Fixed Term Loan' },
                                { value: '1', label: 'Dynamic Term Loan' },
                                { value: '2', label: 'Interest Free Loan' },
                                { value: '3', label: 'Tranched Loan' },
                                { value: '4', label: 'Revolving Credit' },
                            ],
                            interestRateTermsOptions=[
                                { value: '1', label: '% per year' },
                                { value: '2', label: '% per month' },
                                { value: '3', label: '% per 4 weeks' },
                                { value: '4', label: '% per week' },
                                { value: '5', label: '% per x days' },
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
                            // defaultProduct = getAllLoanProductsRequest.request_data.response2 ? getAllLoanProductsRequest.request_data.response2.data:null;
                            
                            // console.log("default",defaultProduct);
                            if(selectedLoanProductDetails===undefined){
                                if(getAllLoanProductsRequest.request_data.response2){
                                    this.selectedLoanProductDetails =getAllLoanProductsRequest.request_data.response2.data
                                }
                            }else{
                                this.selectedLoanProductDetails = selectedLoanProductDetails;
                            }

                            let loanProductType = allProductTypes.filter((eachType)=>eachType.value=== this.selectedLoanProductDetails.loanProductType.toString())[0];

                            // console.log("prod data", this.selectedLoanProductDetails);
                            
                            let loanAccountValidationSchema = Yup.object().shape({
                            
                            });
                            return (
                                <Formik
                                    initialValues={{
                                        productEncodedKey :'',
                                        productDisplayName:  allLoanProductsList[0].label,
                                        interestRate:this.selectedLoanProductDetails.loanProductInterestSetting.interestRateDefault!==null ? this.selectedLoanProductDetails.loanProductInterestSetting.interestRateDefault : '',
                                    }}

                                    validationSchema={loanAccountValidationSchema}
                                    onSubmit={(values, { resetForm }) => {

                                        let loanAccountPayload;
                                        let accountType;

                                        loanAccountPayload = {
                                            clientEncodedKey: "string",
                                            productEncodedKey: "string",
                                            productDisplayName: "string",
                                            notes: "string",
                                            loanAmount: 0,
                                            installments: 0,
                                            interestRate: 0,
                                            maximumWithdrawalAmount: 0,
                                            accountOfficerEncodedKey: "string",
                                            associatedBranchEncodedKey: "string",
                                            transactionChannel: {
                                            id: 0,
                                            name: "string",
                                            key: "string",
                                            glAccountId: 0,
                                            linkedGLAccount: {
                                                id: 0,
                                                glCode: "string",
                                                accountName: "string",
                                                accountTypeId: 0,
                                                accountUsageId: 1,
                                                inUse: true,
                                                manualEntriesAllowed: true,
                                                dateCreated: "2020-03-26T05:24:32.514Z",
                                                lastUpdated: "2020-03-26T05:24:32.514Z"
                                            },
                                            dateCreated: "2020-03-26T05:24:32.514Z",
                                            objectState: 0,
                                            lastUpdated: "2020-03-26T05:24:32.514Z",
                                            encodedKey: "string",
                                            createdBy: "string",
                                            createdByEncodedKey: "string"
                                            }
                                        }

                                        accountType='fixed';


                                        this.createLoanAccount(loanAccountPayload, accountType)
                                        .then(
                                            () => {

                                                if (this.props.createLoanAccountReducer.request_status === loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_SUCCESS) {
                                                    setTimeout(() => {
                                                        resetForm();
                                                        this.props.dispatch(loanActions.createLoanAccount("CLEAR"))
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
                                                    <h3>Creating A New Loan Account</h3>
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
                                                            options={allLoanProductsList}
                                                            defaultValue ={{label:allLoanProductsList!==null?allLoanProductsList[0].label:null, 
                                                                value:allLoanProductsList!==null? allLoanProductsList[0].value:null}}
                                                            
                                                            onChange={(selected) => {
                                                                values.productDisplayName = selected.label;
                                                                setFieldValue('productEncodedKey', selected.value)
                                                                this.getALoanProduct(selected.value);
                                                            }}
                                                            onBlur={()=> setFieldTouched('productEncodedKey', true)}
                                                            // onChange={(selectedLoanProduct) => {
                                                            //     this.setState({ selectedLoanProduct });
                                                            //     errors.productEncodedKey = null
                                                            //     values.productEncodedKey = selectedLoanProduct.value
                                                            // }}
                                                            className={errors.productEncodedKey && touched.productEncodedKey ? "is-invalid" : null}
                                                            
                                                            
                                                            name="productEncodedKey"
                                                            
                                                            required
                                                        />
                                                        {errors.productEncodedKey && touched.productEncodedKey ? (
                                                            <span className="invalid-feedback">{errors.productEncodedKey}</span>
                                                        ) : null}
                                                    </Col>
                                                    <Col>
                                                        <Form.Label className="block-level">Display Name</Form.Label>
                                                        {/* Display chosen loan Type text here */}
                                                        <Form.Control 
                                                            type="text"
                                                            onChange={handleChange}
                                                            value={values.productDisplayName}
                                                            className={errors.productDisplayName && touched.productDisplayName ? "is-invalid h-38px" : "h-38px"}
                                                            name="productDisplayName" required />
                                                        {errors.productDisplayName && touched.productDisplayName ? (
                                                            <span className="invalid-feedback">{errors.productDisplayName}</span>
                                                        ) : null}
                                                        {/* Display chosen loan Type text here */}
                                                    </Col>
                                                </Form.Row>
                                                <Form.Row>
                                                    <Col>
                                                        <Form.Label className="block-level">Product Type</Form.Label>
                                                        <span className="form-text">{loanProductType.label} </span>
                                                    </Col>
                                                    <Col>
                                                    </Col>
                                                </Form.Row>
                                                {/* Help text based on selected loan type */}
                                                {/* <div className="hint-text">
                                                    Loans granted to staff members of Zedcrest Capital Group for the purchase of Cars
                                                                        </div> */}
                                                {/* Help text based on selected loan type */}

                                                <Accordion defaultActiveKey="0">
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        Account Terms
                                                                            </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div className="each-formsection">
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Loan Amount (&#8358;)</Form.Label>
                                                                    <Form.Control type="text" />
                                                                    <span className="input-helptext form-text">
                                                                        {this.selectedLoanProductDetails.loanAmountSetting.loanAmountMinimun!==null &&
                                                                            <span>Min: &#8358;{this.selectedLoanProductDetails.loanAmountSetting.loanAmountMinimun}</span>
                                                                        }
                                                                        {this.selectedLoanProductDetails.loanAmountSetting.loanAmountMaximum!==null &&
                                                                            <span>  Max: &#8358;{this.selectedLoanProductDetails.loanAmountSetting.loanAmountMaximum}</span>
                                                                        }

                                                                        {this.selectedLoanProductDetails.loanAmountSetting.loanAmountMinimun===null &&
                                                                            <span>Min: N/A</span>
                                                                        }
                                                                        {this.selectedLoanProductDetails.loanAmountSetting.loanAmountMaximum===null &&
                                                                            <span>  Max: N/A</span>
                                                                        }
                                                                        
                                                                    </span>
                                                                </Col>
                                                                <Col>
                                                                    <Form.Label className="block-level">Interest Rate (% per month)</Form.Label>
                                                                <Form.Control 
                                                                        type="text"
                                                                        onChange={handleChange}
                                                                        value={numberWithCommas(values.interestRate)}
                                                                        className={errors.interestRate && touched.interestRate ? "is-invalid h-38px" : "h-38px"}
                                                                        name="interestRate" required />
                                                                    {errors.interestRate && touched.interestRate ? (
                                                                        <span className="invalid-feedback">{errors.interestRate}</span>
                                                                    ) : null}
                                                                    <span className="input-helptext form-text">
                                                                        {this.selectedLoanProductDetails.loanProductInterestSetting.interestRateMin!==null &&
                                                                            <span >Min: %{this.selectedLoanProductDetails.loanProductInterestSetting.interestRateMin}</span>
                                                                        }
                                                                        {this.selectedLoanProductDetails.loanProductInterestSetting.interestRateMax!==null &&
                                                                            <span>  Max: %{this.selectedLoanProductDetails.loanProductInterestSetting.interestRateMax}</span>
                                                                        }

                                                                        {this.selectedLoanProductDetails.loanProductInterestSetting.interestRateMin===null &&
                                                                            <span>Min: N/A</span>
                                                                        }
                                                                        {this.selectedLoanProductDetails.loanProductInterestSetting.interestRateMax===null &&
                                                                            <span>  Max: N/A</span>
                                                                        }
                                                                        
                                                                    </span>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Repaid Every</Form.Label>
                                                                    <Form.Control type="text" />
                                                                    <span className="input-helptext">Months</span>
                                                                </Col>
                                                                <Col>
                                                                    <Form.Label className="block-level">Over (Installments)</Form.Label>
                                                                    <Form.Control type="text" />
                                                                    <span className="input-helptext">Min: 1 Max: 48</span>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Arrears Tolerance Period (days)</Form.Label>
                                                                    <Form.Control type="text" />
                                                                    <span className="form-text">Min: 3 days Max: 3 days</span>
                                                                </Col>
                                                                <Col>
                                                                    <Form.Label className="block-level">Interest Calculation Method</Form.Label>
                                                                    <span className="form-text">Flat</span>
                                                                </Col>
                                                            </Form.Row>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>

                                                <Accordion >
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        Disbursement Details
                                                                            </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div className="each-formsection">
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Channels</Form.Label>
                                                                    <select id="toshow" className="countdropdown form-control form-control-sm">
                                                                        <option value="access_bank3_account">Access Bank 3 Account</option>
                                                                        <option value="access_bank3_settlement_account">ACCESS BANK 3 SETTLEMENT ACCOUNT</option>
                                                                        <option value="diamond_bank3_account">DIAMOND BANK 3 ACCOUNT</option>
                                                                        <option value="fidelity_bank3_account">FIDELITY BANK 3 ACCOUNT</option>
                                                                    </select>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Col className="date-wrap">
                                                                    <Form.Label className="block-level">Anticipated Disbursement</Form.Label>
                                                                    <DatePicker placeholderText="Choose  date" selected={this.state.dob}
                                                                        onChange={this.handleDatePicker}
                                                                        onChangeRaw={(e) => this.handleChange(e)}
                                                                        dateFormat="d MMMM, yyyy"
                                                                        className="form-control form-control-sm"
                                                                        peekNextMonth
                                                                        showMonthDropdown
                                                                        showYearDropdown
                                                                        dropdownMode="select"
                                                                        maxDate={new Date()}
                                                                    />
                                                                </Col>
                                                                <Col className="date-wrap">
                                                                    <Form.Label className="block-level">First Repayment Date</Form.Label>
                                                                    <DatePicker placeholderText="Choose  date" selected={this.state.dob}
                                                                        onChange={this.handleDatePicker}
                                                                        onChangeRaw={(e) => this.handleChange(e)}
                                                                        dateFormat="d MMMM, yyyy"
                                                                        className="form-control form-control-sm"
                                                                        peekNextMonth
                                                                        showMonthDropdown
                                                                        showYearDropdown
                                                                        dropdownMode="select"
                                                                        maxDate={new Date()}
                                                                    />
                                                                </Col>
                                                            </Form.Row>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>
                                                <Accordion >
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        Schedule Preview
                                                                            </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div className="each-formsection">
                                                            <Button size="sm" variant="secondary" className="grayed-out">Preview Schedule</Button>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>
                                                <Accordion>
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        Guarantors
                                                                            </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div className="each-formsection">
                                                            <Form.Group controlId="periodOptionChosen" className="">
                                                                <Form.Label className="block-level">Source</Form.Label>
                                                                {/* search dropdown of Guarantors */}
                                                                <Form.Control type="text" />
                                                                {/* search dropdown of Guarantors */}
                                                            </Form.Group>

                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Account</Form.Label>
                                                                    <select id="toshow" className="countdropdown form-control form-control-sm">

                                                                    </select>
                                                                </Col>
                                                                <Col>
                                                                    <Form.Label className="block-level">Amount(₦)</Form.Label>
                                                                    <Form.Control type="text" />
                                                                </Col>
                                                            </Form.Row>
                                                            <div className="footer-with-cta toleft">
                                                                <Button size="sm" variant="secondary" className="grayed-out">Add Guarantor</Button>
                                                            </div>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>
                                                <Accordion>
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        RISK ASSESSMENT
                                                                            </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div className="each-formsection">
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Loan Bought Over</Form.Label>
                                                                    <div className="checkbox-wrap">
                                                                        <input type="checkbox" name="" id="closing-balance" />
                                                                        {/* display if unchecked */}
                                                                        <label htmlFor="loan-bought">No</label>
                                                                        {/* display if checked */}
                                                                        {/* <label htmlFor="loan-bought">Yes</label> */}
                                                                    </div>


                                                                </Col>
                                                                <Col>
                                                                    <Form.Label className="block-level">Bought over from</Form.Label>
                                                                    <Form.Control type="text" />
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Loan Liquidation Amount</Form.Label>
                                                                    <Form.Control type="text" />
                                                                </Col>
                                                                <Col>
                                                                    <Form.Label className="block-level">Bank Name (Repayment Account)</Form.Label>
                                                                    <Form.Control type="text" />
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Bank Account Number (Repayment)</Form.Label>
                                                                    <Form.Control type="text" />
                                                                    <span className="form-text">Format: ##########</span>
                                                                </Col>
                                                                <Col>
                                                                    <Form.Label className="block-level">Late Payment Fee (Penalty)</Form.Label>
                                                                    <Form.Control type="text" />
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Col className="date-wrap">
                                                                    <Form.Label className="block-level">Last Penalty Application Date</Form.Label>
                                                                    <DatePicker placeholderText="Choose  date" selected={this.state.dob}
                                                                        onChange={this.handleDatePicker}
                                                                        onChangeRaw={(e) => this.handleChange(e)}
                                                                        dateFormat="d MMMM, yyyy"
                                                                        className="form-control form-control-sm"
                                                                        peekNextMonth
                                                                        showMonthDropdown
                                                                        showYearDropdown
                                                                        dropdownMode="select"
                                                                        maxDate={new Date()}
                                                                    />
                                                                </Col>
                                                                <Col>
                                                                    <Form.Label className="block-level">Requires Guarantor</Form.Label>
                                                                    <select id="toshow" className="countdropdown form-control form-control-sm">
                                                                        <option value="yes">Yes</option>
                                                                        <option value="no">No</option>
                                                                    </select>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Write Off Balance</Form.Label>
                                                                    <Form.Control type="text" />
                                                                </Col>
                                                            </Form.Row>
                                                            <div className="footer-with-cta toleft">
                                                                <Button size="sm" variant="secondary" className="grayed-out">Add Field</Button>
                                                            </div>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>
                                                {/* <Accordion>
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        GEMINI AUDIT
                                                                            </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div className="each-formsection">


                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Loan Type</Form.Label>
                                                                    <select id="toshow" className="countdropdown form-control form-control-sm">
                                                                        <option value="10">Normal</option>
                                                                        <option value="25">Topup</option>
                                                                    </select>
                                                                </Col>
                                                                <Col></Col>
                                                            </Form.Row>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion> */}

                                                <Accordion>
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        ACCOUNT OFFICER DETAIL
                                                                            </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div className="each-formsection">
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Loan Officer</Form.Label>
                                                                    {/* select dropdown search of acount officers */}
                                                                    <Form.Control type="text" />
                                                                </Col>
                                                                <Col>
                                                                    <Form.Label className="block-level">Loan Officer Branch</Form.Label>
                                                                    {/* select dropdown search of acount officers branches*/}
                                                                    <Form.Control type="text" />
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Acquisition Channel</Form.Label>
                                                                    {/* select dropdown search of channels*/}
                                                                    <Form.Control type="text" />
                                                                </Col>
                                                                <Col>
                                                                    <Form.Label className="block-level">Customer was Introduced By</Form.Label>
                                                                    {/* select dropdown search of who introduced customer*/}
                                                                    <Form.Control type="text" />
                                                                </Col>
                                                            </Form.Row>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>
                                                <Accordion>
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        DISBURSEMENT REQUIREMENTS
                                                                            </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div className="each-formsection">
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Repayment Method</Form.Label>
                                                                    <select id="toshow" className="countdropdown form-control form-control-sm">
                                                                        <option value="10">Bank Transfer</option>
                                                                        <option value="25">Cash</option>
                                                                        <option value="50">Cheque</option>
                                                                        <option value="200">Direct Debit</option>
                                                                        <option value="200">Remita</option>
                                                                    </select>
                                                                </Col>
                                                                <Col>
                                                                    <Form.Label className="block-level">Repayment Instrument Status</Form.Label>
                                                                   
                                                                    <Form.Control type="text" />
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Offer Letter Status</Form.Label>
                                                                    <select id="toshow" className="countdropdown form-control form-control-sm">
                                                                        <option value="10">Offer Accepted</option>
                                                                        <option value="25">Offer Cancelled</option>
                                                                        <option value="50">Offer Declined</option>
                                                                        <option value="200">Offer Sent</option>
                                                                    </select>
                                                                </Col>
                                                                <Col>
                                                                    <Form.Label className="block-level">Disbursement Bank</Form.Label>
                                                                    
                                                                    <Form.Control type="text" />
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Disbursement Account Number</Form.Label>

                                                                    <Form.Control type="text" />
                                                                    <span className="form-text">Format: ##########</span>
                                                                </Col>
                                                                <Col>
                                                                    <Form.Label className="block-level">Auto Disburse</Form.Label>
                                                                    <select id="toshow" className=" form-control form-control-sm">
                                                                        <option value="10">Yes</option>
                                                                        <option value="25">No</option>
                                                                    </select>
                                                                </Col>
                                                            </Form.Row>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>
                                                <Accordion>
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        Association
                                                                            </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div className="each-formsection">
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Branch</Form.Label>
                                                                    
                                                                    <Form.Control type="text" />
                                                                </Col>
                                                                <Col></Col>
                                                            </Form.Row>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>

                                                <Accordion >
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        Account Notes
                                                                            </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div className="each-formsection">
                                                            <Form.Group>

                                                                <Form.Control as="textarea" rows="3" />
                                                            </Form.Group>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>






                                                <div className="footer-with-cta toleft">
                                                    <div className="checkbox-wrap">
                                                        <input type="checkbox" name="" id="create-another" />
                                                        <label htmlFor="create-another">Create Another</label>
                                                    </div>
                                                    <NavLink to={'/deposits'} className="btn btn-secondary grayed-out">Cancel</NavLink>
                                                    <Button>Create  Account</Button>
                                                </div>
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
                                <div className="loading-text">No Loan Products Found</div>
                            </div>
                        )
                    }
            }
            

            if(getClientsRequest.request_status===clientsConstants.GET_ALL_CLIENTS_FAILURE){
                return (
                    <div className="loading-content card"> 
                        <div>{getClientsRequest.request_data.error}</div>
                    </div>
                )
            }


            if(getAllLoanProductsRequest.request_status===productsConstants.GET_ALL_LOAN_PRODUCTS_FAILURE){
                return (
                    <div className="loading-content card"> 
                        <div>{getAllLoanProductsRequest.request_data.error}</div>
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
                                                {this.renderCreateLoanAccount()}
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
        createLoanAccountReducer : state.loansReducers.createLoanAccountReducer,
        getAllLoanProductsReducer : state.productReducers.getAllLoanProductsReducer,
        getSingleLoanProductsReducer : state.productReducers.getSingleLoanProductsReducer,
        getFullLoanProductsReducer : state.loansReducers.getFullLoanProductsReducer,
        getAllClientsReducer : state.clientsReducers.getAllClientsReducer,
    };
}

export default connect(mapStateToProps)(NewLoanAccount);