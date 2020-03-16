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
    }

    getAllDepositProducts = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(productActions.getAllDepositProducts(paramters, true));
    }

    getSingleDepositProduct = async(encodedKey)=>{
        const {dispatch} = this.props;
       
        await dispatch(productActions.getSingleDepositProduct(encodedKey));
        
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
            {selectedDepositProductDetails} = this.state;

            switch(getAllDepositProductsRequest.request_status){
                case (productsConstants.GET_ALL_DEPOSIT_PRODUCTS_PENDING):
                    return (
                        <div className="loading-content card"> 
                            <div className="loading-text">Please wait... </div>
                        </div>
                    )
                case (productsConstants.GET_ALL_DEPOSIT_PRODUCTS_SUCCESS):

                    if(getAllDepositProductsRequest.request_data.response.data.length>=1){
                        let allDepositProducts = getAllDepositProductsRequest.request_data.response.data,
                            allDepositProductsList =[];

                            allDepositProducts.map((product, id)=>{
                                allDepositProductsList.push({label: product.productName, value:product.productEncodedKey});
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

                        if(selectedDepositProductDetails===undefined){
                            if(getAllDepositProductsRequest.request_data.response2){
                                this.selectedDepositProductDetails =getAllDepositProductsRequest.request_data.response2.data
                            }
                        }else{
                            this.selectedDepositProductDetails = selectedDepositProductDetails;
                        }

                        console.log("produc info", this.selectedDepositProductDetails);

                        let depositProductType = allProductTypes.filter((eachType)=>eachType.value=== this.selectedDepositProductDetails.depositAccountType.toString())[0];
                        
                        let depositInterestCalculation = interestBalanceCalculations.filter((eachType)=>eachType.value=== this.selectedDepositProductDetails.depositProductInterestSettingModel.interestBalanceCalculation.toString())[0];

                        let depositAccountValidationSchema = Yup.object().shape({
                       
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
                                maximumWithdrawalAmount:this.selectedDepositProductDetails.depositSavingsSettingModel.maximumWithdrawalAmount.toString(),
                                recommendedDepositAmount:'',
                                interestRate:this.selectedDepositProductDetails.depositProductInterestSettingModel.interestRateDefault.toString(),
                            }}

                            validationSchema={depositAccountValidationSchema}
                            onSubmit={(values, { resetForm }) => {



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
                                                    // onChange={(selectedLoanProduct) => {
                                                    //     this.setState({ selectedLoanProduct });
                                                    //     errors.depositProductEncodedKey = null
                                                    //     values.depositProductEncodedKey = selectedLoanProduct.value
                                                    // }}
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
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Interest Rate</Form.Label>
                                                            <Form.Control type="text"
                                                                onChange={handleChange}
                                                                value={values.interestRate}
                                                                className={errors.interestRate && touched.interestRate ? "is-invalid h-38px" : "h-38px"}
                                                                name="interestRate" required/>
                                                            <span className="input-helptext">Min: {numberWithCommas(this.selectedDepositProductDetails.depositProductInterestSettingModel.interestRateMin.toString())}% 
                                                                    Max: {numberWithCommas(this.selectedDepositProductDetails.depositProductInterestSettingModel.interestRateMax.toString())}%
                                                            </span>
                                                            {errors.interestRate && touched.interestRate ? (
                                                                <span className="invalid-feedback">{errors.interestRate}</span>
                                                            ) : null}
                                                        </Col>
                                                        <Col>
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Interest Calculated Using</Form.Label>
                                                            <span className="form-text">{depositInterestCalculation}</span>
                                                        </Col>
                                                        <Col>
                                                            {/* <Form.Label className="block-level">Maximum Balance (₦)</Form.Label>
                                                            <Form.Control type="text" /> */}
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Interest paid into account</Form.Label>
                                                            <span className="form-text">On Account Maturity</span>
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">Opening Balance</Form.Label>
                                                            <span className="form-text">Min: ₦{numberWithCommas(this.selectedDepositProductDetails.depositFixedSettingModel.minimumOpeningBalance.toString())}</span>
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Term Length</Form.Label>
                                                            <span className="form-text">Any</span>
                                                        </Col>
                                                        {/* Display this two alone if settlement product is chosen */}
                                                        <Col>
                                                            <Form.Label className="block-level">Maximum Withdrawal Amount(₦)</Form.Label>
                                                            <Form.Control type="text" 
                                                                onChange={handleChange}
                                                                value={numberWithCommas(values.maximumWithdrawalAmount)}
                                                                className={errors.maximumWithdrawalAmount && touched.maximumWithdrawalAmount ? "is-invalid h-38px" : "h-38px"}
                                                                name="maximumWithdrawalAmount" 
                                                                required/>
                                                            {errors.maximumWithdrawalAmount && touched.maximumWithdrawalAmount ? (
                                                                <span className="invalid-feedback">{errors.maximumWithdrawalAmount}</span>
                                                            ) : null}
                                                        </Col>
                                                        {/* uncomment this when product select unchange is handled */}
                                                        {/* <Col>
                                                                    <Form.Label className="block-level">Recommended Deposit Amount(₦)</Form.Label>
                                                                    <Form.Control type="text" />
                                                                </Col> */}
                                                        {/* Display this two alone if settlement product is chosen */}
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Interest Rate Terms: Fixed</Form.Label>
                                                        </Col>
                                                        <Col>
                                                        </Col>
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

                                                        <Form.Control as="textarea" rows="3" />
                                                    </Form.Group>
                                                </div>
                                            </Accordion.Collapse>
                                        </Accordion>






                                        <div className="footer-with-cta toleft">
                                            <NavLink to={'/deposits'} className="btn btn-secondary grayed-out">Cancel</NavLink>
                                            <Button>Create Deposit Account</Button>
                                        </div>

                                    </Form>
                                )}
                        </Formik>
                        )
                    }else{
                        return(
                            <div className="loading-content card"> 
                                <div className="loading-text">No Deposit Products Found</div>
                            </div>
                        )
                    }

                case (productsConstants.GET_ALL_DEPOSIT_PRODUCTS_FAILURE):
                    return (
                        <div className="loading-content card"> 
                            <div>{getAllDepositProductsRequest.request_data.error}</div>
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
        createDepositAccountReducer : state.productReducers.createDepositAccountReducer,
        getAllDepositProductsReducer : state.productReducers.getAllDepositProductsReducer,
    };
}

export default connect(mapStateToProps)(NewDepositAccount);