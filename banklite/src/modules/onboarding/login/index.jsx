import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik';
import * as Yup from 'yup';

import Alert from 'react-bootstrap/Alert'
import loginIcon from '../../../assets/img/enter.svg'

import "../onboarding.scss"; 
class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        }

        
    }

    handleLoginForm = ()=>{

    }

    renderLoginForm = ()=>{
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
                        validationSchema={this.loginValidationSchema}
                        onSubmit={(values, { resetForm }) => {
    
        
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
                                                type="text" 
                                                name="userPassword"
                                                onChange={handleChange} 
                                                value={values.userPassword}
                                                className={errors.userPassword && touched.userPassword ? "is-invalid": null}
                                                required />
                                            
                                            
                                        
        
                                    </Form.Row>
        
        
                                    <div className=" form-cta">
                                        

                                        <NavLink to={'/dashboard'} className="btn btn-success">Log In</NavLink>
                                        
                                    </div>
        
                                   
        
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
        
    };
}

export default  connect(mapStateToProps)(UserLogin);