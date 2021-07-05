import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import AdminNav from './_menu'
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import { Formik } from 'formik';
import * as Yup from 'yup';

import {numberWithCommas} from '../../shared/utils';
import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Alert from 'react-bootstrap/Alert'
import GeneralNav from './menus/_general-menu'
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
        whiteListedIP: Yup.string()
            .when('enforceIPRestriction', {
                is: (value) => value === true,
                then: Yup.string()
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
                                enforceIPRestriction:controlDetails.enforceIPRestriction,
                                blockGeneralAccess:controlDetails.blockGeneralAccess,
                                whiteListedIP:controlDetails.whiteListedIP,
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
                                    maximumExposureToCustomerAmount: parseFloat(values.maximumExposureToCustomerAmount.toString().replace(/,/g, '')),
                                    whiteListedIP: values.whiteListedIP,
                                    blockGeneralAccess: values.blockGeneralAccess,
                                    enforceIPRestriction: values.enforceIPRestriction,
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
                                                    <Form.Label className="block-level">Maximum Exposure To A Client</Form.Label>
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
                                                        {/* <option value="2">No, Only One Active Loan Per Client</option> */}
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
                                                    <Form.Group controlId="minimum-days-2">
                                                        <Form.Label className="block-level">Maximum Amount for Maximum Exposure To A Client</Form.Label>
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

                                        
                                        <Form.Row>
                                            <Col>
                                                <Accordion defaultActiveKey="0">
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        Duplicates Check
                                                    </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div className="each-formsection">
                                                            <Form.Group>
                                                                <div className="heading-with-cta toright compact">
                                                                    <div className="eachitem">
                                                                        <input type="checkbox" name="" id="opening-balance" />
                                                                        <label htmlFor="opening-balance">Unique Mobile Number</label>
                                                                    </div>
                                                                    <div className="eachitem">
                                                                        <input type="checkbox" name="" id="net-change" />
                                                                        <label htmlFor="net-change">Unique Email</label>
                                                                    </div>
                                                                    <div className="eachitem">
                                                                        <input type="checkbox" name="" id="closing-balance" />
                                                                        <label htmlFor="closing-balance">Unique (Email and Mobile)</label>
                                                                    </div>
                                                                </div>
                                                            </Form.Group>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <Accordion defaultActiveKey="1">
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        Accessibility
                                                    </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="1">
                                                        <div className="each-formsection">
                                                            <Form.Group>
                                                                <div className="heading-with-cta unset">
                                                                    <div className="eachitem mb-10">
                                                                        <input type="checkbox" name="" id="user-access" 
                                                                            checked={values.blockGeneralAccess}
                                                                            onChange={handleChange} 
                                                                            value={values.blockGeneralAccess}
                                                                            required
                                                                        />
                                                                        <label htmlFor="user-access">Block User Access</label>
                                                                    </div>
                                                                    <div className="eachitem">
                                                                        <input type="checkbox" name="enforceIPRestriction" id="eforce-ip" 
                                                                            checked={values.enforceIPRestriction}
                                                                            onChange={handleChange} 
                                                                            value={values.enforceIPRestriction}
                                                                            required
                                                                        />
                                                                        <label htmlFor="eforce-ip">Enforce IP restrction</label>
                                                                        {values.enforceIPRestriction &&
                                                                        <Form.Row>

                                                                            <Col>
                                                                                <Form.Group controlId="maximum-days">
                                                                                    <Form.Label className="block-level">Enter list of IPs (separated by commas) </Form.Label>
                                                                                    <Form.Control as="textarea" rows="3"
                                                                                        name="whiteListedIP"
                                                                                        onChange={handleChange}
                                                                                        value={values.whiteListedIP}
                                                                                        className={errors.whiteListedIP && touched.whiteListedIP ? "is-invalid" : null}
                                                                                        
                                                                                    />
                                                                                </Form.Group>
                                                                                {errors.whiteListedIP && touched.whiteListedIP ? (
                                                                                    <span className="invalid-feedback">{errors.whiteListedIP}</span>
                                                                                ) : null}
                                                                            </Col>
                                                                            <Col></Col>
                                                                        </Form.Row>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </Form.Group>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>
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
                                    <AdminNav />
                                    <GeneralNav />
                                    {/* <div className="lowerlevel-menu">
                                        <ul className="nav">
                                            <li>
                                                <NavLink exact to={'/administration/general'}>Organization</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/currency'}>Currency</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/txt-channels'}>Transaction Channels</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/customer-types'}>Client Types</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/control'}>Internal Control</NavLink>
                                            </li>
                                        </ul>
                                    </div> */}
                                   
                                    
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