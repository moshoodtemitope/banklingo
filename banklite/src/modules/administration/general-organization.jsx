import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Alert from 'react-bootstrap/Alert'

// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class GeneralOrganization extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }

    componentDidMount(){
        this.getOrganizationDetails();
    }

    getOrganizationDetails = ()=>{
        const {dispatch} = this.props;

        dispatch(administrationActions.getOrganizationDetails());
    }

    updateOrgDetails = async (updateOrgPayload)=>{
        const {dispatch} = this.props;

        await dispatch(administrationActions.updateOrganizationDetails(updateOrgPayload));
    }

    renderOrganizationDetails =()=>{
        let adminGetOrganizationRequest = this.props.adminGetOrganizationDetails;
        
        switch (adminGetOrganizationRequest.request_status){
            case (administrationConstants.GET_ORGANIZATION_DETAILS_PENDING):
                return (
                    <div className="loading-content"> 
                        <div className="loading-text">Please wait... </div>
                    </div>
                )

            case(administrationConstants.GET_ORGANIZATION_DETAILS_SUCCESS):
                let organizationDetails = adminGetOrganizationRequest.request_data.response.data,
                    adminUpdateOrganizationDetailsRequest = this.props.adminUpdateOrganizationDetails,
                orgDetailsValidationSchema = Yup.object().shape({
                    institutionName: Yup.string()
                      .min(2, 'Min of two characters')
                      .max(50, 'Max Limit reached')
                      .required('Please provide name'),
                    streetAddress: Yup.string()
                      .min(1, 'Please provide valid address')
                      .max(200, 'Max Limit reached')
                      .required('Address is required'),
                    institutionCity: Yup.string()
                      .min(1, 'Please provide valid city')
                      .max(200, 'Max Limit reached')
                      .required('City is required'),
                    institutionState: Yup.string()
                      .min(1, 'Please provide valid state')
                      .max(200, 'Max Limit reached')
                      .required('State is required'),
                    institutionCountry: Yup.string()
                      .min(1, 'Please provide valid country')
                      .max(200, 'Max Limit reached')
                      .required('country is required'),
                    institutionEmail: Yup.string()
                      .min(1, 'Please provide valid email')
                      .max(150, 'Max Limit reached')
                      .required('Email is required'),
                    institutionDateFormat: Yup.string()
                      .min(1, 'Please provide valid format'),
                    institutionDateTimeFormat: Yup.string()
                      .min(1, 'Please provide valid datetime format')
                });
                    if(organizationDetails!==undefined){
                        return(
                            <div>
                            <Formik
                                initialValues={{
                                    institutionName: organizationDetails.organizationName !== '' ? organizationDetails.organizationName : '',
                                    streetAddress: organizationDetails.streetAddress !== '' ? organizationDetails.streetAddress : '',
                                    institutionCity: organizationDetails.city !== '' ? organizationDetails.city : '',
                                    institutionState: organizationDetails.state !== '' ? organizationDetails.state : '',
                                    institutionCountry: organizationDetails.country !== '' ? organizationDetails.country : '',
                                    institutionEmail: organizationDetails.email !== '' ? organizationDetails.email : '',
                                    institutionDateFormat: organizationDetails.localDateFormat !== '' ? organizationDetails.localDateFormat : '',
                                    institutionDateTimeFormat: organizationDetails.localDateTimeFormat !== '' ? organizationDetails.localDateTimeFormat : '',
                                }}
                                validationSchema={orgDetailsValidationSchema}
                                onSubmit={(values, { resetForm }) => {
                                    let updateOrgPayload = {
                                        email: values.institutionEmail,
                                        organizationName: values.institutionName,
                                        streetAddress: values.streetAddress,
                                        city: values.institutionCity,
                                        state: values.institutionState,
                                        country: values.institutionCountry,
                                        localDateFormat: values.institutionDateFormat,
                                        localDateTimeFormat: values.institutionDateTimeFormat,
                                    };
                                
                                    this.updateOrgDetails(updateOrgPayload)
                                    .then(
                                        () => {
                                            // resetForm();
                                            setTimeout(() => {
                                                // this.getOrganizationDetails();
                                                this.props.dispatch(administrationActions.updateOrganizationDetails("CLEAR"))
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
                                            className="form-content w-60 card"
                                            noValidate 
                                            onSubmit={handleSubmit}>


                                            <Form.Group controlId="institutionName">
                                                <Form.Label className="block-level">Institution Name</Form.Label>
                                                <Form.Control 
                                                    name="institutionName"
                                                    onChange={handleChange} 
                                                    value={values.institutionName}
                                                    className={errors.institutionName && touched.institutionName ? "is-invalid": null}
                                                    type="text" />

                                                {errors.institutionName && touched.institutionName ? (
                                                    <span className="invalid-feedback">{errors.institutionName}</span>
                                                ) : null}
                                            </Form.Group>
                                            <Form.Group controlId="streetAddress">
                                                <Form.Label className="block-level">Street Address</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    name="streetAddress"
                                                    onChange={handleChange} 
                                                    value={values.streetAddress}
                                                    className={errors.streetAddress && touched.streetAddress ? "is-invalid": null}/>

                                                    {errors.streetAddress && touched.streetAddress ? (
                                                        <span className="invalid-feedback">{errors.streetAddress}</span>
                                                    ) : null}
                                            </Form.Group>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">City</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        name="institutionCity"
                                                        onChange={handleChange} 
                                                        value={values.institutionCity}
                                                        className={errors.institutionCity && touched.institutionCity ? "is-invalid": null} />

                                                    {errors.institutionCity && touched.institutionCity ? (
                                                        <span className="invalid-feedback">{errors.institutionCity}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">State/Province/Region</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        name="institutionState"
                                                        onChange={handleChange} 
                                                        value={values.institutionState}
                                                        className={errors.institutionState && touched.institutionState ? "is-invalid": null} />

                                                    {errors.institutionState && touched.institutionState ? (
                                                        <span className="invalid-feedback">{errors.institutionState}</span>
                                                    ) : null}
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                {/* <Col>
                                                    <Form.Label className="block-level">Zip Postal Code</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        name="institutionZipCode"
                                                        onChange={handleChange} 
                                                        value={values.institutionZipCode}
                                                        className={errors.institutionZipCode && touched.institutionZipCode ? "is-invalid": null} />
                                                </Col> */}
                                                <Col>
                                                    <Form.Label className="block-level">Country</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        name="institutionCountry"
                                                        onChange={handleChange} 
                                                        value={values.institutionCountry}
                                                        className={errors.institutionCountry && touched.institutionCountry ? "is-invalid": null} />
                                                        
                                                    {errors.institutionCountry && touched.institutionCountry ? (
                                                        <span className="invalid-feedback">{errors.institutionCountry}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Email</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        name="institutionEmail"
                                                        onChange={handleChange} 
                                                        value={values.institutionEmail}
                                                        className={errors.institutionEmail && touched.institutionEmail ? "is-invalid": null} />
                                                    
                                                    {errors.institutionEmail && touched.institutionEmail ? (
                                                        <span className="invalid-feedback">{errors.institutionEmail}</span>
                                                    ) : null} 
                                                </Col>
                                            </Form.Row>
                                            {/* <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Mobile Phone</Form.Label>
                                                    <Form.Control type="text" />
                                                </Col>
                                                
                                            </Form.Row> */}
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Currency</Form.Label>
                                                    <span className="form-text">{organizationDetails.defaultCurrencyCode !== '' ? organizationDetails.defaultCurrencyCode : ''}</span>
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Time Zone</Form.Label>
                                                    <span className="form-text">{organizationDetails.timeZone !== '' ? organizationDetails.timeZone : ''}</span>
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Local Date Format</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        name="institutionDateFormat"
                                                        onChange={handleChange} 
                                                        value={values.institutionDateFormat}
                                                        className={errors.institutionDateFormat && touched.institutionDateFormat ? "is-invalid": null}
                                                        placeholder="e.g dd-MM-yyyy" />
                                                        {errors.institutionDateFormat && touched.institutionDateFormat ? (
                                                            <span className="invalid-feedback">{errors.institutionDateFormat}</span>
                                                        ) : null} 
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Local Date/Time Format </Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        name="institutionDateTimeFormat"
                                                        onChange={handleChange} 
                                                        value={values.institutionDateTimeFormat}
                                                        className={errors.institutionDateTimeFormat && touched.institutionDateTimeFormat ? "is-invalid": null}
                                                        placeholder="e.g dd-MM-yyyy HH:mm:ss" />
                                                        {errors.institutionDateTimeFormat && touched.institutionDateTimeFormat ? (
                                                            <span className="invalid-feedback">{errors.institutionDateTimeFormat}</span>
                                                        ) : null} 
                                                </Col>
                                                
                                            </Form.Row>
                                            <div className="form-ctas horizontal">
                                                <Button variant="success" 
                                                    className="mr-20px" 
                                                    type="submit"
                                                    disabled={adminUpdateOrganizationDetailsRequest.is_request_processing}>
                                                        {adminUpdateOrganizationDetailsRequest.is_request_processing?"Please wait...": "Update"}
                                                </Button>
                                                <Button variant="light" type="button"> Cancel</Button>
                                            </div>
                                            {adminUpdateOrganizationDetailsRequest.request_status === administrationConstants.UPDATE_ORGANIZATION_DETAILS_SUCCESS && 
                                                <Alert variant="success">
                                                    {adminUpdateOrganizationDetailsRequest.request_data.response.data.message}
                                                </Alert>
                                            }
                                            {adminUpdateOrganizationDetailsRequest.request_status === administrationConstants.UPDATE_ORGANIZATION_DETAILS_FAILURE && 
                                                <Alert variant="danger">
                                                    {adminUpdateOrganizationDetailsRequest.request_data.error}
                                                </Alert>
                                            }
                                        </Form>
                                        
                                    )}
                            </Formik>
                            
                            </div>
                        )
                    }else{
                        return null;
                    }


            case (administrationConstants.GET_ORGANIZATION_DETAILS_FAILURE):
                return (
                    <div className="loading-content errormsg"> 
                        <div>{adminGetOrganizationRequest.request_data.error}</div>
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
                                                <NavLink to={'/administration/general'}>Organization</NavLink>
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
                                                {this.renderOrganizationDetails()}
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
        adminGetOrganizationDetails : state.administrationReducers.adminGetOrganizationDetailsReducer,
        adminUpdateOrganizationDetails : state.administrationReducers.adminUpdateOrganizationDetailsReducer
    };
}

export default connect(mapStateToProps)(GeneralOrganization);