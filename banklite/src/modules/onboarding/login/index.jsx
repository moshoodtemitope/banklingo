import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik';
import * as Yup from 'yup';


import {authActions} from '../../../redux/actions/auth/auth.action';
import {authConstants} from '../../../redux/actiontypes/auth/auth.constants';

import Alert from 'react-bootstrap/Alert'
import loginIcon from '../../../assets/img/enter.svg'

import "../onboarding.scss"; 
class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        }

        
    }

    

    handleLoginForm = async (loginPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(authActions.Login(loginPayload));
    } 

    renderLoginForm = ()=>{
        let loginRequest = this.props.loginRequest;
        let loginValidationSchema = Yup.object().shape({
            userEmail: Yup.string()
                .required('Required'),
            userPassword:  Yup.string()
                .required('Required'),
          });
        return(
            <div className="login-page">
                <Formik
                        initialValues={{
                            userEmail:'',
                            userPassword:''
                        }}
                        validationSchema={loginValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            
                            let loginPayload ={
                                username: values.userEmail,
                                password:values.userPassword
                            }

                            this.handleLoginForm(loginPayload)
                                        .then(
                                            () => {
                
                                                // if (this.props.updateAClient.request_status === clientsConstants.UPDATE_A_CLIENT_SUCCESS) {
                                                //     resetForm();
                                                // }
                
                                                // setTimeout(() => {
                                                //     this.props.dispatch(authActions.Login("CLEAR"))
                                                // }, 3000);
                
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
                                    
                                    <div className="logo-wrap">
                                        <h4>Sign In</h4>
                                        <img src={loginIcon} alt="" />
                                    </div>
                                    <Form.Row>
                                        
                                            <Form.Label className={errors.userEmail && touched.userEmail? "witherror block-level": "block-level"}>
                                                Username 
                                                {errors.userEmail && touched.userEmail ? (
                                                    <span className="invalid-feedback">{errors.userEmail}</span>
                                            ) : null}
                                            </Form.Label>
                                            
                                            <Form.Control 
                                                type="text" 
                                                name="userEmail"
                                                onChange={handleChange} 
                                                value={values.userEmail}
                                                className={errors.userEmail && touched.userEmail ? "is-invalid": null}
                                                required />
                                            
                                    </Form.Row>
                                    <Form.Row>
                                            <Form.Label className={errors.userPassword && touched.userPassword? "witherror block-level": "block-level"}>
                                                Password
                                                {errors.userPassword && touched.userPassword ? (
                                                        <span className="invalid-feedback">{errors.userPassword}</span>
                                                ) : null}
                                            </Form.Label>
                                            <Form.Control 
                                                type="password" 
                                                name="userPassword"
                                                onChange={handleChange} 
                                                value={values.userPassword}
                                                className={errors.userPassword && touched.userPassword ? "is-invalid": null}
                                                required />
                                            
                                            
                                        
        
                                    </Form.Row>
        
        
                                    <div className=" form-cta">
                                        <Button variant="success" type="submit"
                                            disabled={loginRequest.is_request_processing}
                                            className="ml-20"
                                        >
                                            {loginRequest.is_request_processing ? "Please wait..." : "Log In"}
                                        </Button>

                                        {/* <NavLink to={'/dashboard'} className="btn btn-success">Log In</NavLink> */}
                                        
                                    </div>
                                    
                                {loginRequest.request_status === authConstants.LOGIN_USER_SUCCESS &&
                                    <Alert variant="success mt-20">
                                        {loginRequest.request_data.response.data.message}
                                    </Alert>
                                }
                                {loginRequest.request_status === authConstants.LOGIN_USER_FAILURE &&
                                    <Alert variant="danger mt-20">
                                        {loginRequest.request_data.error}

                                    </Alert>
                                }
                                   
        
                                </Form>
                            )}
                    </Formik>
            </div>
        )
    }


    render(){
        return (
            <Fragment>
                {this.renderLoginForm()}
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        loginRequest : state.authReducers.LoginReducer
    };
}

export default  connect(mapStateToProps)(UserLogin);