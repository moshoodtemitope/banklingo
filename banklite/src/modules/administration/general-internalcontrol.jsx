import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import { Formik } from 'formik';
import * as Yup from 'yup';

import {numberWithCommas} from '../../shared/utils';
import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Alert from 'react-bootstrap/Alert'

import "./administration.scss"; 
class GeneralInternalControl extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }

    componentDidMount(){
        this.getInternalControl();
    }

    getInternalControl = ()=>{
        const {dispatch} = this.props;

        dispatch(administrationActions.getInternalControl());
    }

    handleInternalControlSetting = async (internalControlPayload)=>{
        const {dispatch} = this.props;
       
        
        await dispatch(administrationActions.updateInternalControlSettings(internalControlPayload));
    }

    internalControlValidationSchema = Yup.object().shape({
        maximumExposureToCustomer: Yup.string()
            .min(1, 'Response required')
            .max(10, 'Max limit reached')
            .matches(/^[0-9]*$/, 'Invalid repsonse')
            .required('Required'),
        customerMultipleLoans:  Yup.string()
            .min(1, 'Response required')
            .matches(/^[0-9]*$/, 'Invalid repsonse')
            .required('Required'),
        customerMoreThanOneGroup: Yup.string()
            .min(1, 'Response required')
            .matches(/^[0-9]*$/, 'Invalid repsonse')
            .required('Required'),
        minimumDaysoBeforeWriteOff:  Yup.string()
            .min(1, 'Response required')
            .matches(/^[0-9]*$/, 'Invalid repsonse')
            .required('Required'),
        newCustomerInitialState: Yup.string()
            .min(1, 'Response required')
            .matches(/^[0-9]*$/, 'Invalid repsonse')
            .required('Required'),
        maximumDaysBeforeUndoCloseLoan:  Yup.string()
            .min(1, 'Response required')
            .matches(/^[0-9]*$/, 'Invalid repsonse')
            .required('Required'),
        creditArrangementInitialState:  Yup.string()
            .min(1, 'Response required')
            .matches(/^[0-9]*$/, 'Invalid repsonse')
            .required('Required'),
        separateUsersForApprovalsAndDisbursals:  Yup.boolean()
            .oneOf([true], null)
            .required('Required'),
        maximumExposureToCustomerAmount:  Yup.string()
            .when('maximumExposureToCustomer',{
                is:(value)=>value!=='1',
                then: Yup.string()
                    .min(1, 'Response required')
                    .matches(/^[1-9]\d*(\.\d{1,2})?$/, 'Invalid repsonse')
                    .required('Required')
            }),
      });


    renderInternalControlSettings =()=>{
        let adminInternalControlRequest = this.props.adminInternalControl,
            adminGetInternalControlRequest = this.props.adminGetInternalControl;
        
        switch (adminGetInternalControlRequest.request_status){
            case (administrationConstants.GET_INTERNAL_CONTROL_PENDING):
                return (
                    <div className="loading-content"> 
                        <div className="loading-text">Please wait... </div>
                    </div>
                )
            
            case(administrationConstants.GET_INTERNAL_CONTROL_SUCCESS):
                let controlDetails = adminGetInternalControlRequest.request_data.response.data;

                if(controlDetails!==undefined){
                    return (
                        <Formik
                            initialValues={{
                                maximumExposureToCustomer: controlDetails.maximumExposureToCustomer !== '' ? controlDetails.maximumExposureToCustomer : '',
                                customerMultipleLoans: controlDetails.customerMultipleLoans !== '' ? controlDetails.customerMultipleLoans : '',
                                customerMoreThanOneGroup: controlDetails.customerMoreThanOneGroup !== '' ? controlDetails.customerMoreThanOneGroup : '',
                                minimumDaysoBeforeWriteOff: controlDetails.minimumDaysoBeforeWriteOff !== '' ? controlDetails.minimumDaysoBeforeWriteOff : '',
                                newCustomerInitialState: controlDetails.newCustomerInitialState !== '' ? controlDetails.newCustomerInitialState : '',
                                maximumDaysBeforeUndoCloseLoan: controlDetails.maximumDaysBeforeUndoCloseLoan !== '' ? controlDetails.maximumDaysBeforeUndoCloseLoan : '',
                                creditArrangementInitialState: controlDetails.creditArrangementInitialState !== '' ? controlDetails.creditArrangementInitialState : '',
                                separateUsersForApprovalsAndDisbursals: controlDetails.separateUsersForApprovalsAndDisbursals === 0 ? false : true,
                                maximumExposureToCustomerAmount: controlDetails.maximumExposureToCustomerAmount !== '' ? controlDetails.maximumExposureToCustomerAmount : '',
                            }} 
            
                            validationSchema={this.internalControlValidationSchema}
                            onSubmit={(values, { resetForm }) => {
            
                                let internalControlSettingsPayload ={
                                    maximumExposureToCustomer: parseInt(values.maximumExposureToCustomer),
                                    customerMultipleLoans     : parseInt(values.customerMultipleLoans),
                                    customerMoreThanOneGroup  : parseInt(values.customerMoreThanOneGroup),
                                    minimumDaysoBeforeWriteOff: parseInt(values.minimumDaysoBeforeWriteOff),
                                    newCustomerInitialState   : parseInt(values.newCustomerInitialState),
                                    maximumDaysBeforeUndoCloseLoan: parseInt(values.maximumDaysBeforeUndoCloseLoan),
                                    creditArrangementInitialState: parseInt(values.creditArrangementInitialState),
                                    separateUsersForApprovalsAndDisbursals: 
                                        values.separateUsersForApprovalsAndDisbursals===true ? 1: 0,
                                    maximumExposureToCustomerAmount: parseFloat(values.maximumExposureToCustomerAmount.replace(/,/g, ''))
                                }
            
                                if(parseInt(values.maximumExposureToCustomer)===1){
                                    internalControlSettingsPayload.maximumExposureToCustomerAmount=0;
                                    values.maximumExposureToCustomerAmount=0;
                                }
            
            
                                this.handleInternalControlSetting(internalControlSettingsPayload)
                                    .then(
                                        () => {
            
            
                                            setTimeout(() => {
                                                this.props.dispatch(administrationActions.updateInternalControlSettings("CLEAR"))
                                            }, 3000);
            
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
                                        className="form-content w-60 card">
                                        <Form.Row>
                                            <Col>
                                                <Form.Group controlId="maximumExposureToCustomer">
                                                    <Form.Label className="block-level">Maximum Exposure To A Customer</Form.Label>
                                                    <Form.Control as="select" size="sm"
                                                        name="maximumExposureToCustomer"
                                                        onChange={handleChange} 
                                                        value={values.maximumExposureToCustomer}
                                                        className={errors.maximumExposureToCustomer && touched.maximumExposureToCustomer ? "is-invalid": null}
                                                        required 
                                                    >
                                                        <option></option>
                                                        <option value="1">Unlimited</option>
                                                        <option value="2">Sum Of All Loans</option>
                                                        <option value="3">Sum Of All Loans Minus Deposits Balance</option>
                                                    </Form.Control>
                                                    {errors.maximumExposureToCustomer && touched.maximumExposureToCustomer ? (
                                                            <span className="invalid-feedback">{errors.maximumExposureToCustomer}</span>
                                                    ) : null}
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="customerMultipleLoans">
                                                    <Form.Label className="block-level">Customers Can Receive Multiple Loans</Form.Label>
                                                    <Form.Control as="select" size="sm"
                                                        name="customerMultipleLoans"
                                                        onChange={handleChange} 
                                                        value={values.customerMultipleLoans}
                                                        className={errors.customerMultipleLoans && touched.customerMultipleLoans ? "is-invalid": null}
                                                        required 
                                                    >   
                                                        <option></option>
                                                        {/* <option value="1">Yes, Unlimited Number Of Active Loans</option> */}
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                        {/* <option value="2">No, Only One Active Loan Per Customer</option> */}
                                                    </Form.Control>
                                                    {errors.customerMultipleLoans && touched.customerMultipleLoans ? (
                                                            <span className="invalid-feedback">{errors.customerMultipleLoans}</span>
                                                    ) : null}
                                                </Form.Group>
                                            </Col>
                                        </Form.Row>
                                        {(values.maximumExposureToCustomer !==1 && values.maximumExposureToCustomer !=='')  &&
                                            <Form.Row>
            
                                                <Col>
                                                    <Form.Group controlId="minimum-days">
                                                        <Form.Label className="block-level">Maximum Amount for Maximum Exposure To A Customer</Form.Label>
                                                        <Form.Control type="text" size="sm" 
                                                            name="maximumExposureToCustomerAmount"
                                                            onChange={handleChange} 
                                                            value={numberWithCommas(values.maximumExposureToCustomerAmount)}
                                                            className={errors.maximumExposureToCustomerAmount && touched.maximumExposureToCustomerAmount ? "is-invalid": null}
                                                            required />
                                                    </Form.Group>
                                                    {errors.maximumExposureToCustomerAmount && touched.maximumExposureToCustomerAmount ? (
                                                        <span className="invalid-feedback">{errors.maximumExposureToCustomerAmount}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                </Col>
                                            </Form.Row>
                                        }
                                        <Form.Row>
                                            <Col>
                                                <Form.Group controlId="customerMoreThanOneGroup">
                                                    <Form.Label className="block-level">Customers May Be In More Than One Group</Form.Label>
                                                    <Form.Control as="select" size="sm"
                                                        name="customerMoreThanOneGroup"
                                                        onChange={handleChange} 
                                                        value={values.customerMoreThanOneGroup}
                                                        className={errors.customerMoreThanOneGroup && touched.customerMoreThanOneGroup ? "is-invalid": null}
                                                        required 
                                                    >
                                                        <option></option>
                                                        <option value="1">Yes</option>
                                                        <option value="2">No</option>
                                                    </Form.Control>
                                                    {errors.customerMoreThanOneGroup && touched.customerMoreThanOneGroup ? (
                                                            <span className="invalid-feedback">{errors.customerMoreThanOneGroup}</span>
                                                    ) : null}
                                                </Form.Group>
                                            </Col>
            
                                           
                                            <Col>
                                                <Form.Group controlId="minimum-days">
                                                    <Form.Label className="block-level">Minimum Days In Arrears Before Write-Off</Form.Label>
                                                    <Form.Control type="text" size="sm" 
                                                        name="minimumDaysoBeforeWriteOff"
                                                        onChange={handleChange} 
                                                        value={values.minimumDaysoBeforeWriteOff}
                                                        className={errors.minimumDaysoBeforeWriteOff && touched.minimumDaysoBeforeWriteOff ? "is-invalid": null}
                                                        required />
                                                </Form.Group>
                                                {errors.minimumDaysoBeforeWriteOff && touched.minimumDaysoBeforeWriteOff ? (
                                                    <span className="invalid-feedback">{errors.minimumDaysoBeforeWriteOff}</span>
                                                ) : null}
                                            </Col>
                                        </Form.Row>
            
                                        <Form.Row>
                                            
                                            <Col>
                                                <Form.Group controlId="maximum-days">
                                                    <Form.Label className="block-level">Maximum Days Before Undo Close Loans</Form.Label>
                                                    <Form.Control type="text" size="sm" 
                                                        name="maximumDaysBeforeUndoCloseLoan"
                                                        onChange={handleChange} 
                                                        value={values.maximumDaysBeforeUndoCloseLoan}
                                                        className={errors.maximumDaysBeforeUndoCloseLoan && touched.maximumDaysBeforeUndoCloseLoan ? "is-invalid": null}
                                                        required 
                                                    />
                                                </Form.Group>
                                                {errors.maximumDaysBeforeUndoCloseLoan && touched.maximumDaysBeforeUndoCloseLoan ? (
                                                    <span className="invalid-feedback">{errors.maximumDaysBeforeUndoCloseLoan}</span>
                                                ) : null}
                                            </Col>
                                            <Col>
                                                
                                                <Form.Group controlId="customer-state">
                                                    <Form.Label className="block-level">New Customer Initial State</Form.Label>
                                                    <Form.Control as="select" size="sm"
                                                        name="newCustomerInitialState"
                                                        onChange={handleChange} 
                                                        value={values.newCustomerInitialState}
                                                        className={errors.newCustomerInitialState && touched.newCustomerInitialState ? "is-invalid": null}
                                                        required 
                                                    >
                                                        <option></option>
                                                        <option value="1">Pending Approval</option>
                                                        <option value="2">Inactive</option>
                                                    </Form.Control>
                                                    {errors.newCustomerInitialState && touched.newCustomerInitialState ? (
                                                        <span className="invalid-feedback">{errors.newCustomerInitialState}</span>
                                                    ) : null}
                                                </Form.Group>
                                            </Col>
            
                                        </Form.Row>
            
                                        <Form.Row>
            
                                            <Col>
                                                <Form.Group controlId="credit-arrangement">
                                                    <Form.Label className="block-level">New Credit Arrangement Initial State</Form.Label>
                                                    <Form.Control as="select" size="sm"
                                                        name="creditArrangementInitialState"
                                                        onChange={handleChange} 
                                                        value={values.creditArrangementInitialState}
                                                        className={errors.creditArrangementInitialState && touched.creditArrangementInitialState ? "is-invalid": null}
                                                        required 
                                                    >
                                                        <option></option>
                                                        <option value="1">Pending Approval</option>
                                                        <option value="2">Approved</option>
                                                    </Form.Control>
                                                    {errors.creditArrangementInitialState && touched.creditArrangementInitialState ? (
                                                        <span className="invalid-feedback">{errors.creditArrangementInitialState}</span>
                                                    ) : null}
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Form.Group controlId="twoman-rules">
                                                    <Form.Label className="block-level">Two-Man Rules</Form.Label>
                                                    <div className="each-settingitem">
                                                        <input type="checkbox" id="check-separate"
                                                            checked={values.separateUsersForApprovalsAndDisbursals}
                                                            name="separateUsersForApprovalsAndDisbursals"
                                                            onChange={handleChange} 
                                                            value={values.separateUsersForApprovalsAndDisbursals}
                                                            required
                                                        />
                                                        <label htmlFor="check-separate"
                                                        className={errors.separateUsersForApprovalsAndDisbursals && touched.separateUsersForApprovalsAndDisbursals? "invalid-label":null }>Required separate users for approvals and disbursals</label>
                                                    </div>
                                                </Form.Group>
                                            </Col>
            
                                        </Form.Row>
                                        <div className="form-ctas horizontal">
                                            <Button variant="success" className="mr-20px" type="submit"
                                                disabled={adminInternalControlRequest.is_request_processing}    
                                            > 
                                                {adminInternalControlRequest.is_request_processing?"Please wait...": "Save Changes"}
                                            </Button>
                                            <Button variant="light" type="button"> Cancel</Button>
                                        </div>
                                        
                                        {adminInternalControlRequest.request_status === administrationConstants.UPDATE_INTERNAL_CONTROL_SUCCESS && 
                                            <Alert variant="success">
                                                {adminInternalControlRequest.request_data.response.data.message}
                                            </Alert>
                                        }
                                        {adminInternalControlRequest.request_status === administrationConstants.UPDATE_INTERNAL_CONTROL_FAILURE && 
                                            <Alert variant="danger">
                                                {adminInternalControlRequest.request_data.error}
                                        
                                            </Alert>
                                        }
            
                                    </Form>
            
                                )}
                        </Formik>
                    )
                }else{
                    return null;
                }
            case (administrationConstants.GET_INTERNAL_CONTROL_FAILURE):
                return (
                    <div className="loading-content errormsg"> 
                        <div>{adminGetInternalControlRequest.request_data.error}</div>
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
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Administration</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <ul className="nav">
                                        <li>
                                            {/* <NavLink to={'/administration-generalorganization'}>General</NavLink> */}
                                            <NavLink to={'/administration/general'}>General</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/organization'}>Organization</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/access'}>Access</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/products'}>Products</NavLink>
                                        </li> 
                                        <li>
                                            <NavLink to={'/administration/sms'}>SMS</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/email'}>Email</NavLink>
                                        </li>
                                    </ul>
                                    <div className="lowerlevel-menu">
                                        <ul className="nav">
                                            <li>
                                                {/* <NavLink to={'/administration-generalorganization'}>Organization</NavLink> */}
                                                <NavLink exact to={'/administration/general'}>Organization</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/currency'}>Currency</NavLink>
                                                {/* <NavLink to={'/administration/administration-generalcurrency'}>Currency</NavLink> */}
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/txt-channels'}>Transaction Channels</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/customer-types'}>Customer Types</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/control'}>Internal Control</NavLink>
                                            </li>
                                            {/* <li>
                                                <NavLink to={'/administration/general/branding'}>Branding</NavLink>
                                            </li> */}
                                        </ul>
                                    </div>
                                   
                                    
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                               {this.renderInternalControlSettings()}
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
        adminInternalControl : state.administrationReducers.adminInternalControlReducer,
        adminGetInternalControl : state.administrationReducers.adminGetInternalControlReducer,
    };
}

export default connect(mapStateToProps)(GeneralInternalControl);