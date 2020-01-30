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

import { Formik } from 'formik';
import * as Yup from 'yup';

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Alert from 'react-bootstrap/Alert'

// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class EmailSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }

    componentDidMount(){
        this.getEmailSettings();
    }
    


    handleEmailSettings = async (emailSettingsPayload) =>{
        
        const {dispatch} = this.props;
       
        await dispatch(administrationActions.emailSettings(emailSettingsPayload));

        
    }
    
    getEmailSettings = ()=>{
        const {dispatch} = this.props;

        dispatch(administrationActions.getEmailSettings());
    }

    renderEmailSettings =()=>{
        let adminEmailSettingsRequest = this.props.adminEmailSettings,
            adminGetEmailSettingsRequest = this.props.adminGetEmailSettings;
        
        switch (adminGetEmailSettingsRequest.request_status){
            case (administrationConstants.GET_EMAIL_SETTINGS_PENDING):
                return (
                    <div className="loading-content"> 
                        <div className="loading-text">Please wait... </div>
                    </div>
                )
            case(administrationConstants.GET_EMAIL_SETTINGS_SUCCESS):
                let emailSettingsData = adminGetEmailSettingsRequest.request_data.response.data;
                    if(emailSettingsData!==undefined){
                        console.log('details is', emailSettingsData);
                        return(
                            <Formik
                                initialValues={{
                                    fromName: emailSettingsData.fromName!==''?emailSettingsData.fromName:'',
                                    fromEmail: emailSettingsData.fromEmail!==''?emailSettingsData.fromEmail:'',
                                    replyToEmail: emailSettingsData.replyToEmail!==''?emailSettingsData.replyToEmail:'',
                                    smtpHost: emailSettingsData.smtpHost!==''?emailSettingsData.smtpHost:'',
                                    smtpPort: emailSettingsData.smtpPort!==''?emailSettingsData.smtpPort:'',
                                    encryptionMethod: emailSettingsData.transportEncryptionMethod!==''?emailSettingsData.transportEncryptionMethod:'',
                                    username: '',
                                    password: '',
                                    channelId:'1'
                                }}
                                // validationSchema={this.emailSettingsvalidationSchema}
                                validationSchema={(props)=>{
                                    // console.log('channel is ', values.channelId);
                                    return  Yup.lazy(values => { 
                                    
                                                if(values.channelId!=="0"){
                                                    return Yup.object().shape({
                                                            fromName: Yup.string()
                                                                .min(2, 'Min of two characters')
                                                                .max(30, 'Max Limit reached')
                                                                .required('Sender name is required'),
                                                            fromEmail: Yup.string()
                                                                .email('Please provide a valid email')
                                                                .required('Sender emal is required'),
                                                            replyToEmail: Yup.string()
                                                                .email('Please provide a valid email')
                                                                .required('Reply-to email is required'),
                                                            smtpHost: Yup.string()
                                                                .required('SMTP Host is required'),
                                                            smtpPort: Yup.string()
                                                                .required('SMTP Port is required'),
                                                            username: Yup.string()
                                                                .required('username is required'),
                                                            password: Yup.string()
                                                                .required('password is required'),
                                                            encryptionMethod: Yup.string()
                                                                .required('encryption method is required'),
                                                            channelId: Yup.string()
                                                                .required('Email server is required'),
                                                        });
                                                }else{
                                                    return Yup.object().shape({
                                                        channelId: Yup.string()
                                                            .required('Email server is required')
                                                    });
                                                }

                                            })
                                }}
                                onSubmit={(values, { resetForm }) => {

                                    let emailSettingsPayload;

                                    if(values.channelId!=="0"){
                                        emailSettingsPayload = {
                                            channelId: parseInt(values.channelId),
                                            fromName: values.fromName,
                                            fromEmail: values.fromEmail,
                                            replyToEmail: values.replyToEmail,
                                            smtpHost: values.smtpHost,
                                            smtpPort: values.smtpPort,
                                            userName: values.username,
                                            password: values.password,
                                            transportEncryptionMethod: values.encryptionMethod,
                                        };
                                    }
                                    else{
                                        emailSettingsPayload = {
                                            channelId: values.channelId
                                        };
                                    }

                                    // console.log("payload", emailSettingsPayload);

                                    this.handleEmailSettings(emailSettingsPayload)
                                        .then(
                                            () => {

                                                if (this.props.adminEmailSettings.request_status === administrationConstants.EMAIL_SETTINGS_SUCCESS) {
                                                    // resetForm();
                                                }

                                                setTimeout(() => {
                                                    this.props.dispatch(administrationActions.emailSettings("CLEAR"))
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
                                            <Form.Group controlId="customer-state">
                                                <Form.Label className="block-level">Email Server</Form.Label>
                                                <Form.Control 
                                                    as="select" 
                                                    size="sm"
                                                    name="channelId"
                                                    onChange={handleChange} 
                                                    value={values.channelId}
                                                    className={errors.channelId && touched.channelId ? "is-invalid": null}
                                                    required
                                                >
                                                    <option value="0" >None</option>
                                                    <option value="1" >Default</option>
                                                </Form.Control>
                                                {errors.channelId && touched.channelId ? (
                                                    <span className="invalid-feedback">{errors.channelId}</span>
                                                ) : null}
                                            </Form.Group>
                                            { values.channelId !=="0" && 
                                                <div>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">From Name</Form.Label>
                                                            <Form.Control 
                                                                type="text" 
                                                                name="fromName"
                                                                onChange={handleChange} 
                                                                value={values.fromName}
                                                                required
                                                                className={errors.fromName && touched.fromName ? "is-invalid": null}
                                                            />
                                                            {errors.fromName && touched.fromName ? (
                                                                <span className="invalid-feedback">{errors.fromName}</span>
                                                            ) : null}
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">From Email</Form.Label>
                                                            <Form.Control 
                                                                name="fromEmail"
                                                                onChange={handleChange} 
                                                                value={values.fromEmail}
                                                                required
                                                                className={errors.fromEmail && touched.fromEmail ? "is-invalid": null}
                                                                type="text" 
                                                            />
                                                            {errors.fromEmail && touched.fromEmail ? (
                                                                <span className="invalid-feedback">{errors.fromEmail}</span>
                                                            ) : null}
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Reply-to email</Form.Label>
                                                            <Form.Control 
                                                                name="replyToEmail"
                                                                onChange={handleChange} 
                                                                value={values.replyToEmail}
                                                                required
                                                                className={errors.replyToEmail && touched.replyToEmail ? "is-invalid": null}
                                                                type="text" 
                                                            />
                                                            {errors.replyToEmail && touched.replyToEmail ? (
                                                                <span className="invalid-feedback">{errors.replyToEmail}</span>
                                                            ) : null}
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">SMTP Host</Form.Label>
                                                            <Form.Control 
                                                                type="text" 
                                                                name="smtpHost"
                                                                onChange={handleChange} 
                                                                value={values.smtpHost}
                                                                required
                                                                className={errors.smtpHost && touched.smtpHost ? "is-invalid": null}
                                                            />
                                                            {errors.smtpHost && touched.smtpHost ? (
                                                                <span className="invalid-feedback">{errors.smtpHost}</span>
                                                            ) : null}
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">SMTP Port</Form.Label>
                                                            <Form.Control 
                                                                type="text" 
                                                                name="smtpPort"
                                                                onChange={handleChange} 
                                                                value={values.smtpPort}
                                                                required
                                                                className={errors.smtpPort && touched.smtpPort ? "is-invalid": null}
                                                            />
                                                            {errors.smtpPort && touched.smtpPort ? (
                                                                <span className="invalid-feedback">{errors.smtpPort}</span>
                                                            ) : null}
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">Transport Encryption Method</Form.Label>
                                                            <Form.Control 
                                                                as="select" 
                                                                size="sm"
                                                                name="encryptionMethod"
                                                                onChange={handleChange} 
                                                                value={values.encryptionMethod}
                                                                required
                                                                className={errors.encryptionMethod && touched.encryptionMethod ? "is-invalid": null}
                                                            >
                                                                <option value="0">None</option>
                                                                <option value="1">STARTTLS</option>
                                                                <option value="2">SSL/TLS</option>
                                                            </Form.Control>
                                                            {errors.encryptionMethod && touched.encryptionMethod ? (
                                                                <span className="invalid-feedback">{errors.encryptionMethod}</span>
                                                            ) : null}
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Username</Form.Label>
                                                            <Form.Control 
                                                                type="text" 
                                                                name="username"
                                                                onChange={handleChange} 
                                                                value={values.username}
                                                                required
                                                                className={errors.username && touched.username ? "is-invalid": null}
                                                            />
                                                            {errors.username && touched.username ? (
                                                                <span className="invalid-feedback">{errors.username}</span>
                                                            ) : null}
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">Password</Form.Label>
                                                            <Form.Control 
                                                                type="password" 
                                                                name="password"
                                                                onChange={handleChange} 
                                                                value={values.password}
                                                                required
                                                                className={errors.password && touched.password ? "is-invalid": null}
                                                            />
                                                            {errors.password && touched.password ? (
                                                                <span className="invalid-feedback">{errors.password}</span>
                                                            ) : null}
                                                        </Col>
                                                    </Form.Row>
                                                </div>
                                            }
                                            <div className="form-ctas horizontal">
                                                <Button 
                                                    variant="success" 
                                                    className="mr-20px" 
                                                    type="submit"
                                                    disabled={adminEmailSettingsRequest.is_request_processing}
                                                > 
                                                    {adminEmailSettingsRequest.is_request_processing?"Please wait...": "Save Changes"}
                                                </Button>
                                                {/* <Button variant="light" type="button"> Send Test Email</Button> */}
                                                {/* <Button variant="light" type="button"> Cancel</Button> */}
                                            </div>
                                            {adminEmailSettingsRequest.request_status === administrationConstants.EMAIL_SETTINGS_SUCCESS && 
                                                <Alert variant="success">
                                                    {adminEmailSettingsRequest.request_data.response.data.message}
                                                </Alert>
                                            }
                                            {adminEmailSettingsRequest.request_status === administrationConstants.EMAIL_SETTINGS_FAILURE && 
                                                <Alert variant="danger">
                                                    {adminEmailSettingsRequest.request_data.error}
                                            
                                                    {/* {adminEmailSettingsRequest.error} */}
                                                </Alert>
                                            }

                                        </Form>
                                    )}
                            </Formik>
                        )
                    }else{
                        return null;
                    }
            case (administrationConstants.GET_EMAIL_SETTINGS_FAILURE):
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{adminGetEmailSettingsRequest.request_data.error}</div>
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
                                    <div className="lowerlevel-menu">
                                        <ul className="nav">
                                            <li>
                                                {/* <NavLink to={'/administration-generalorganization'}>Organization</NavLink> */}
                                                <NavLink exact to={'/administration/email'}>Settings</NavLink>
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
                                                {this.renderEmailSettings()}
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
        adminEmailSettings : state.administrationReducers.adminEmailSettingsReducer,
        adminGetEmailSettings : state.administrationReducers.adminGetEmailSettingsReducer,
    };
}

export default connect(mapStateToProps)(EmailSettings);