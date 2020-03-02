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


import {getRouteForRedirect} from "../../../shared/utils";

import Alert from 'react-bootstrap/Alert'
import bankIcon from '../../../assets/img/bank-icon.svg'
import loginBg from '../../../assets/img/loginbg.png'
import bgLogin from '../../../assets/img/bglogin.png'

import "../onboarding.scss"; 
class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        }


        let returnUrl  =  getRouteForRedirect().getPreviousRoute;
        this.redirectType  =  getRouteForRedirect().redirectType;
        
        // console.log("jsdhjs", returnUrl);
        if(window.location.href.indexOf("#")===-1 && returnUrl!==null){
            // if(window.location.href.indexOf("retUrl")===-1 && returnUrl!==null){
            // window.location = `${window.location.href}?type=${redirectType}&retUrl=${returnUrl}`;
            // window.location = `${window.location.href}?retUrl=${returnUrl}`;
            window.location = `${window.location.href}#${returnUrl}`;
            this.state.redirectType = this.redirectType;
        }
       
        
    }

    

     

    componentDidMount=()=>{
        const { dispatch } = this.props;
        // console.log("props are", this.props.loginRequest);
        
          dispatch(authActions.initStore());
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
        
        let loggoutType, currentUrl;
        
        // if(window.location.href.indexOf("type")>-1){
        //     loggoutType = window.location.href.split('type=')[1].split('&retUrl')[0];
        //     console.log("types is", loggoutType);
        // }

        if(getRouteForRedirect().getPreviousRoute!==undefined && getRouteForRedirect().getPreviousRoute!==null){
            loggoutType  =  getRouteForRedirect().redirectType;
        }
        
        return(
            <div className="login-page">
                <div className="loginbg-wrap">
                    {/* <img className="loginbg" src={bgLogin} /> */}
                </div>
                
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
                                                    if(this.props.loginRequest.request_status===authConstants.LOGIN_USER_SUCCESS){
                                                        this.props.dispatch(authActions.Login("CLEAR"));
                                                    }
                                                    
                                                // }, 1500);
                
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
                                    className="form-content w-30 ">
                                        
                                    
                                    <div className="login-wrap card">
                                        <div className="login-heading">
                                            <img src={bankIcon} alt="" /> 
                                            <h3> Core Banking</h3>
                                        </div>
                                    
                                        <div className="subheading-wrap">
                                            <h4>Welcome back!</h4>
                                            <div className="heading-txt">Enter email address to login.</div>
                                        </div>
                                    <Form.Row>
                                        
                                            <Form.Label className={errors.userEmail && touched.userEmail? "witherror block-level": "block-level"}>
                                                {/* Username  */}
                                                {errors.userEmail && touched.userEmail ? (
                                                    <span className="invalid-feedback">{errors.userEmail}</span>
                                            ) : null}
                                            </Form.Label>
                                            
                                            <Form.Control 
                                                type="text" 
                                                name="userEmail"
                                                placeholder="Email"
                                                onChange={handleChange} 
                                                value={values.userEmail}
                                                className={errors.userEmail && touched.userEmail ? "is-invalid": null}
                                                required />
                                            
                                    </Form.Row>
                                    <Form.Row>
                                            <Form.Label className={errors.userPassword && touched.userPassword? "witherror block-level": "block-level"}>
                                                {/* Password */}
                                                {errors.userPassword && touched.userPassword ? (
                                                        <span className="invalid-feedback">{errors.userPassword}</span>
                                                ) : null}
                                            </Form.Label>
                                            <Form.Control 
                                                type="password" 
                                                name="userPassword"
                                                placeholder="Password"
                                                onChange={handleChange} 
                                                value={values.userPassword}
                                                className={errors.userPassword && touched.userPassword ? "is-invalid": null}
                                                required />
                                            
                                            
                                        
        
                                    </Form.Row>
        
        
                                    <div className=" form-cta">
                                        <Button  type="submit"
                                            disabled={loginRequest.is_request_processing}
                                            className="ml-20 btn-block submitbtn"
                                        >
                                            {loginRequest.is_request_processing ? "Please wait..." : "Log In"}
                                        </Button>

                                        {/* <NavLink to={'/dashboard'} className="btn btn-success">Log In</NavLink> */}
                                        
                                    </div>
                                    
                                
                                {loginRequest.request_status === authConstants.LOGIN_USER_FAILURE &&
                                    <Alert variant="danger mt-20">
                                        {loginRequest.request_data.error!==undefined?loginRequest.request_data.error:null}
                                        

                                    </Alert>
                                }
                                {this.redirectType!==null && this.redirectType==="timeout" && 
                                    loginRequest.request_status !== authConstants.LOGIN_USER_FAILURE &&
                                    loginRequest.request_status !== authConstants.LOGIN_USER_PENDING &&
                                    loginRequest.request_status !== authConstants.LOGIN_USER_SUCCESS &&
                                     <Alert variant="danger mt-20">
                                         You were logged out because you were inactive

                                    </Alert>
                                }

                                {this.redirectType!==null && this.redirectType==="unauthorized" && 
                                    loginRequest.request_status !== authConstants.LOGIN_USER_FAILURE &&
                                    loginRequest.request_status !== authConstants.LOGIN_USER_PENDING &&
                                    loginRequest.request_status !== authConstants.LOGIN_USER_SUCCESS &&
                                     <Alert variant="danger mt-20">
                                        Please log in to authorize your activities

                                    </Alert>
                                }
                                   
                                   </div>
                                   <div className="poweredby-txt">Powered by NIDCOM Solutions</div>
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