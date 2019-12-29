import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Alert from 'react-bootstrap/Alert'

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class SMSSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            selectedGateway:''
        }

        
    }

    componentDidMount(){
        this.getSmsSettings();
    }

    smsSettingsvalidationSchema = Yup.object().shape({
      smsSettingsUsername: Yup.string()
        .min(2, 'Min of two characters')
        .max(30, 'Max Limit reached')
        .required('Username is required'),
      smsSettingsPassword: Yup.string()
        .min(5, 'Min of five characters')
        .required('Password is required'),
      smsSettingsPhone: Yup.string()
        .min(11, 'Please provide a valid phone number')
        .max(11, 'Please provide a valid phone number')
        .required('Phone number is required'),
      smsSettingsGateway: Yup.string()
        .required('Gateway is required')
    });


    handleSmsSettings = async (smsSettingsPayload) =>{
        
        const {dispatch} = this.props;
       
        await dispatch(administrationActions.smsSettings(smsSettingsPayload));

        
    }

    getSmsSettings = ()=>{
        const {dispatch} = this.props;

        dispatch(administrationActions.getSmsSettings());
    }

    renderSmsSettings = ()=>{
        let adminSmsSettingsRequest = this.props.adminSmsSettings,
            adminGetSmsSettingsRequest = this.props.adminGetSmsSettings;

        switch (adminGetSmsSettingsRequest.request_status){
            case (administrationConstants.GET_SMS_SETTINGS_PENDING):
                return (
                    <div className="loading-content"> 
                        <div className="loading-text">Please wait... </div>
                    </div>
                )
            case(administrationConstants.GET_SMS_SETTINGS_SUCCESS):
                    let smsSettingsData = adminGetSmsSettingsRequest.request_data.response.data;
                if(smsSettingsData!==undefined){
                    return(
                        <Formik
                            initialValues={{
                                smsSettingsUsername: smsSettingsData!==''?smsSettingsData.accountUsername:'',
                                smsSettingsPassword: '',
                                smsSettingsGateway: smsSettingsData!==''?smsSettingsData.channel:'',
                                smsSettingsPhone: smsSettingsData!==''?smsSettingsData.phoneNumber:'',
                            }}
                            validationSchema={this.smsSettingsvalidationSchema}
                            onSubmit={(values, { resetForm }) => {

                                let smsSettingsPayload = {
                                    userName: values.smsSettingsUsername,
                                    password: values.smsSettingsPassword,
                                    phoneNumber: values.smsSettingsPhone,
                                    channelId: values.smsSettingsGateway
                                };


                                this.handleSmsSettings(smsSettingsPayload)
                                    .then(
                                        () => {
                                            
                                            if(this.props.adminSmsSettings.request_status===administrationConstants.SMS_SETTINGS_SUCCESS){
                                                resetForm();
                                            }
                                            
                                            setTimeout(() => {
                                                this.props.dispatch(administrationActions.smsSettings("CLEAR"))
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
                                        className="form-content w-40 card">
                                        <Form.Group controlId="sms-gateway">
                                            <Form.Label className="block-level">SMS Gateway</Form.Label>
                                            <Form.Control 
                                                as="select" 
                                                size="sm"
                                                name="smsSettingsGateway"
                                                onChange={handleChange} 
                                                value={values.smsSettingsGateway}
                                                className={errors.smsSettingsGateway && touched.smsSettingsGateway ? "is-invalid": null}
                                                    required>
                                                <option>Select gateway</option>
                                                <option value="1">Twilio</option>
                                                <option value="2">Infobip</option>
                                            </Form.Control>
                                            {errors.smsSettingsGateway && touched.smsSettingsGateway ? (
                                                <span className="invalid-feedback">{errors.smsSettingsGateway}</span>
                                            ) : null}
                                        </Form.Group>
                                        {/* display when other than none is picked */}
                                        <Form.Group controlId="acct-name">
                                            <Form.Label className="block-level">Account Username</Form.Label>
                                            <Form.Control 
                                                    name="smsSettingsUsername"
                                                    onChange={handleChange} 
                                                    value={values.smsSettingsUsername}
                                                    className={errors.smsSettingsUsername && touched.smsSettingsUsername ? "is-invalid": null}
                                                type="text" />

                                                {errors.smsSettingsUsername && touched.smsSettingsUsername ? (
                                                    <span className="invalid-feedback">{errors.smsSettingsUsername}</span>
                                                ) : null}
                                        </Form.Group>
                                        <Form.Group controlId="acct-password">
                                            <Form.Label className="block-level">Account Password</Form.Label>
                                            <Form.Control
                                                name="smsSettingsPassword"
                                                onChange={handleChange} 
                                                value={values.smsSettingsPassword}
                                                className={errors.smsSettingsPassword && touched.smsSettingsPassword ? "is-invalid": null}
                                                type="password" required />

                                                {errors.smsSettingsPassword && touched.smsSettingsPassword ? (
                                                    <span className="invalid-feedback">{errors.smsSettingsPassword}</span>
                                                ) : null}
                                        </Form.Group>
                                        <Form.Group controlId="acct-phone">
                                            <Form.Label className="block-level">Phone Number</Form.Label>
                                            <Form.Control 
                                                name="smsSettingsPhone"
                                                onChange={handleChange} 
                                                value={values.smsSettingsPhone}
                                                className={errors.smsSettingsPhone && touched.smsSettingsPhone ? "is-invalid": null}
                                                type="text" />

                                                {errors.smsSettingsPhone && touched.smsSettingsPhone ? (
                                                    <span className="invalid-feedback">{errors.smsSettingsPhone}</span>
                                                ) : null}
                                        </Form.Group>
                                        <div className="form-ctas horizontal">
                                            <Button 
                                                variant="success" 
                                                className="mr-20px" 
                                                type="submit"
                                                disabled={adminSmsSettingsRequest.is_request_processing}>

                                                    {adminSmsSettingsRequest.is_request_processing?"Please wait...": "Save Changes"}
                                                </Button>
                                            <Button variant="light" type="button"> Cancel</Button>
                                        </div>
                                        {adminSmsSettingsRequest.request_status === administrationConstants.SMS_SETTINGS_SUCCESS && 
                                            <Alert variant="success">
                                                {adminSmsSettingsRequest.request_data.response.data.message}
                                            </Alert>
                                        }
                                        {adminSmsSettingsRequest.request_status === administrationConstants.SMS_SETTINGS_FAILURE && 
                                            <Alert variant="danger">
                                                {adminSmsSettingsRequest.request_data.error}
                                            </Alert>
                                        }


                                    </Form>
                                )}
                        </Formik>
                    )
                }else{
                    return null;
                }
            
            case (administrationConstants.GET_SMS_SETTINGS_FAILURE):
                return (
                    <div className="loading-content errormsg"> 
                        <div>An error occured please try again</div>
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
                                        {/* <li>
                                            <NavLink to={'/administration/products'}>Products</NavLink>
                                        </li> */}
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
                                                <NavLink exact to={'/administration/sms'}>Settings</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {this.renderSmsSettings()}
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
        adminSmsSettings : state.administrationReducers.adminSmsSettingsReducer,
        adminGetSmsSettings : state.administrationReducers.adminGetSmsSettingsReducer,
    };
}

export default connect(mapStateToProps)(SMSSettings);