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

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Alert from 'react-bootstrap/Alert'
import AdminNav from './_menu'
import "./administration.scss"; 
class AccessPreferences extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }

    componentDidMount(){
        this.getAccessPreferences();
    }


    updatePreferences = async  (updatePreferencesPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(administrationActions.accessPreferences(updatePreferencesPayload));
    }


    preferenceValidationSchema = Yup.object().shape({
        timeOutSession: Yup.string()
            .min(1, 'Response required')
            .max(10, 'Max limit reached')
            .matches(/^[0-9]*$/, 'Invalid repsonse')
            .required('Required'),
        minPasswordLength:  Yup.string()
            .min(1, 'Response required')
            .matches(/^[0-9]*$/, 'Invalid repsonse')
            .required('Required'),
        automaticExpiryOfPassword: Yup.boolean()
            .oneOf([true, false], null),
        passwordExpiryDays:  Yup.number()
            .when('automaticExpiryOfPassword',{
                is:(value)=>value===true,
                then: Yup.number()
                    .min(1, 'Valid response required')
                    .required('Required')
            }),
        lockUserAfterFailedLogin: Yup.boolean()
            .oneOf([true, false], null)
            .required('Required'),
        failedLoginAttemptsMins:  Yup.number()
            .when('lockUserAfterFailedLogin',{
                is:(value)=>value===true,
                then: Yup.number()
                    .min(1, 'Valid response required')
                    .required('Required')
            }),
            // .min(1, 'Response required')
            // .matches(/^[0-9]*$/, 'Invalid repsonse')
            // .required('Required'),
      });


    getAccessPreferences = ()=>{
        const {dispatch} = this.props;

        dispatch(administrationActions.getAccessPreferences());
    }


    renderAccessPreference = () =>{
        let adminAccessPreferencesRequest = this.props.adminAccessPreferences,
            adminGetAccessPreferencesRequest = this.props.adminGetAccessPreferences;
        
        switch (adminGetAccessPreferencesRequest.request_status){
            case (administrationConstants.GET_ACCESS_PREFERENCE_PENDING):
                return (
                    <div className="loading-content"> 
                        <div className="loading-text">Please wait... </div>
                    </div>
                )

            case(administrationConstants.GET_ACCESS_PREFERENCE_SUCCESS):
            let adminAccessPreferencesData = adminGetAccessPreferencesRequest.request_data.response.data;
            if(adminAccessPreferencesData!==undefined){
                return(

                    <Formik
                        initialValues={{
                            timeOutSession: adminAccessPreferencesData!==''?adminAccessPreferencesData.timeOutSession:'',
                            minPasswordLength: adminAccessPreferencesData!==''?adminAccessPreferencesData.minPasswordLenght:'',
                            automaticExpiryOfPassword: adminAccessPreferencesData!==''?adminAccessPreferencesData.automaticExpiryOfPassword:'',
                            passwordExpiryDays: adminAccessPreferencesData!==''?adminAccessPreferencesData.passwordExpiryDays:'',
                            lockUserAfterFailedLogin: adminAccessPreferencesData!==''?adminAccessPreferencesData.lockUserAfterFailedLogin:'',
                            failedLoginAttemptsMins: adminAccessPreferencesData!==''?adminAccessPreferencesData.failedLoginAttemptsMins:'',
                        }}
                        validationSchema={this.preferenceValidationSchema}
                        onSubmit={(values, { resetForm }) => {
        
                            let updatePreferencesPayload = {
                                    timeOutSession: values.timeOutSession,
                                    minPasswordLength: values.minPasswordLength,
                                    automaticExpiryOfPassword: values.automaticExpiryOfPassword,
                                    passwordExpiryDays: parseInt(values.passwordExpiryDays),
                                    lockUserAfterFailedLogin: values.lockUserAfterFailedLogin,
                                    failedLoginAttemptsMins: parseInt(values.failedLoginAttemptsMins)
                            };
                            if(values.automaticExpiryOfPassword===false){
                                updatePreferencesPayload.passwordExpiryDays=0;
                            }

                            if(values.lockUserAfterFailedLogin===false){
                                updatePreferencesPayload.failedLoginAttemptsMins=0;
                            }
        
        
                            this.updatePreferences(updatePreferencesPayload)
                                .then(
                                    () => {
        
                                        if (this.props.adminAccessPreferences.request_status === administrationConstants.UPDATE_ACCESS_PREFERENCE_SUCCESS) {
                                            // resetForm();
                                            
                                            // setTimeout(() => {
                                            //     this.getAccessPreferences();
                                            // }, 3000);
                                        }
        
                                        setTimeout(() => {
                                            this.props.dispatch(administrationActions.accessPreferences("CLEAR"))
                                        }, 2000);
        
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
                                            <Form.Label className={errors.timeOutSession && touched.timeOutSession? "witherror block-level": "block-level"}>
                                                Timeout Session 
                                                {errors.timeOutSession && touched.timeOutSession ? (
                                                    <span className="invalid-feedback">{errors.timeOutSession}</span>
                                            ) : null}
                                            </Form.Label>
                                            
                                            <Form.Control 
                                                type="text" 
                                                name="timeOutSession"
                                                onChange={handleChange} 
                                                value={values.timeOutSession}
                                                className={errors.timeOutSession && touched.timeOutSession ? "is-invalid": null}
                                                required />
                                            <span className="hinttext">minutes</span>
                                            
                                        </Col>
                                        <Col>
                                            <Form.Label className={errors.timeOutSession && touched.timeOutSession? "witherror block-level": "block-level"}>
                                                Min Password Length
                                                {errors.minPasswordLength && touched.minPasswordLength ? (
                                                        <span className="invalid-feedback">{errors.minPasswordLength}</span>
                                                ) : null}
                                            </Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="minPasswordLength"
                                                onChange={handleChange} 
                                                value={values.minPasswordLength}
                                                className={errors.minPasswordLength && touched.minPasswordLength ? "is-invalid": null}
                                                required />
                                            <span className="hinttext">characters</span>
                                            
                                        </Col>
        
                                    </Form.Row>
        
                                    <div className="table-helper">
                                        <input 
                                            type="checkbox" 
                                            id="showAutoLock" 
                                             checked={values.lockUserAfterFailedLogin? values.lockUserAfterFailedLogin:null}
                                            name="lockUserAfterFailedLogin"
                                            onChange={handleChange} 
                                            value={values.lockUserAfterFailedLogin}
                                            className={errors.lockUserAfterFailedLogin && touched.lockUserAfterFailedLogin ? "is-invalid": null}
                                            required />
                                        <label htmlFor="showAutoLock" 
                                                className={errors.lockUserAfterFailedLogin && touched.lockUserAfterFailedLogin? "invalid-label":null }>Lock User After Failed Logins</label>
                                    </div>
                                    {values.lockUserAfterFailedLogin ===true &&
                                        <Form.Row>
                                            <Col className="one-liner login-attempts">
                                                {/* <div className="wrap-input">
                                                    <Form.Control type="text" />
                                                </div>
                                                <span className="hinttext"> failed login attempts </span> */}
                                                <div className={errors.timeOutSession && touched.timeOutSession? "witherror wrap-input": "wrap-input"}>
                                                    {errors.failedLoginAttemptsMins && touched.failedLoginAttemptsMins ? (
                                                        <span className="invalid-feedback">{errors.failedLoginAttemptsMins}</span>
                                                    ) : null}
                                                    <Form.Control 
                                                        type="text"
                                                        name="failedLoginAttemptsMins"
                                                        onChange={handleChange} 
                                                        value={values.failedLoginAttemptsMins}
                                                        className={errors.failedLoginAttemptsMins && touched.failedLoginAttemptsMins ? "is-invalid": null}
                                                        required />
                                                        
                                                </div>
                                                <span className="hinttext">minutes</span>
                                                
                                            </Col>
                                        </Form.Row>
                                    }
                                    <Form.Row>
                                        <Col>
                                            <div className="table-helper">
                                                <input 
                                                    type="checkbox" 
                                                    id="autoPasswordExpire" 
                                                    checked={values.automaticExpiryOfPassword? values.automaticExpiryOfPassword:null}
                                                    name="automaticExpiryOfPassword"
                                                    onChange={handleChange} 
                                                    value={values.automaticExpiryOfPassword}
                                                    className={errors.automaticExpiryOfPassword && touched.automaticExpiryOfPassword ? "is-invalid": null}
                                                    required />
                                                <label htmlFor="autoPasswordExpire"
                                                       className={errors.automaticExpiryOfPassword && touched.automaticExpiryOfPassword? "invalid-label":null } 
                                                >
                                                    Password should automatically expire after</label>
                                            </div>
                                            {values.automaticExpiryOfPassword === true &&
                                                <div className={errors.passwordExpiryDays && touched.passwordExpiryDays? "witherror wrap-input": "wrap-input"}>
                                                    {errors.passwordExpiryDays && touched.passwordExpiryDays ? (
                                                                <span className="invalid-feedback">{errors.passwordExpiryDays}</span>
                                                    ) : null}
                                                    <Form.Control 
                                                        type="text"
                                                        name="passwordExpiryDays"
                                                        onChange={handleChange} 
                                                        value={values.passwordExpiryDays}
                                                        className={errors.passwordExpiryDays && touched.passwordExpiryDays ? "is-invalid": null}
                                                        required />
                                                    
                                                    <span className="hinttext">days</span>
                                                    
                                                </div>
                                            }   
                                        </Col>
                                        <Col>
                                    
                                        </Col>
                                    </Form.Row>
        
                                   
        
        
                                    <div className="form-ctas horizontal">
                                        <Button 
                                            variant="success" 
                                            className="mr-20px" 
                                            type="submit"
                                            disabled={adminAccessPreferencesRequest.is_request_processing}>
                                                {adminAccessPreferencesRequest.is_request_processing?"Please wait...": "Save Changes"}
                                        </Button>
                                        <Button variant="light" type="button"> Cancel</Button>
                                    </div>
        
                                    {adminAccessPreferencesRequest.request_status === administrationConstants.UPDATE_ACCESS_PREFERENCE_SUCCESS && 
                                        <Alert variant="success">
                                            {adminAccessPreferencesRequest.request_data.response.data.message}
                                        </Alert>
                                    }
                                    {adminAccessPreferencesRequest.request_status === administrationConstants.UPDATE_ACCESS_PREFERENCE_FAILURE && 
                                        <Alert variant="danger">
                                            {adminAccessPreferencesRequest.request_data.error}
                                    
                                        </Alert>
                                    }
        
                                </Form>
                            )}
                    </Formik>
                )
            }else{
                return null;
            }
            case (administrationConstants.GET_ACCESS_PREFERENCE_FAILURE):
                return (
                    <div className="loading-content errormsg"> 
                        <div>{adminAccessPreferencesData.request_data.error}</div>
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
                                                <NavLink exact to={'/administration/access'}>Roles</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/access/users'}>Users</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/access/preferences'}>Preferences</NavLink>
                                            </li>
                                            {/* <li>
                                                <NavLink to={'/administration/access/authentication'}>Federated Authentication</NavLink>
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
                                               {this.renderAccessPreference()}
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
        adminAccessPreferences : state.administrationReducers.adminAccessPreferencesReducer,
        adminGetAccessPreferences : state.administrationReducers.adminGetAccessPreferencesReducer,
    };
}

export default connect(mapStateToProps)(AccessPreferences);