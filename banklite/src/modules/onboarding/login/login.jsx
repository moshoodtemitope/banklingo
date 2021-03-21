import * as React from 'react';

import { connect } from 'react-redux';
import { Fragment } from "react";




import { Helmet } from 'react-helmet';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CardBg from '../../../assets/img/cardbg.svg';
import Preload from '../../../assets/img/logo-ico.svg';
import CardIco from '../../../assets/img/card-ico.svg';
import OnboardingContainer from '../../../shared/templates/onboarding'
import { history } from '../../../_helpers/history';
import Alert from 'react-bootstrap/Alert'
import {authActions} from '../../../redux/actions/auth/auth.action';
import {authConstants} from '../../../redux/actiontypes/auth/auth.constants';
class LoginWrap extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            
        }



    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(authActions.initStore());
        this.checkTenancy();
    }

    handleLoginForm = async (loginPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(authActions.Login(loginPayload));
    }

    checkTenancy = async ()=>{
        
        let getTenant = localStorage.getItem("lingoAuthTenant")? JSON.parse(localStorage.getItem("lingoAuthTenant")): null;
        // if(getTenant===null){
            localStorage.clear();
            // let tenantPayload = {domain: "https://cititrustliberia.banklingo.app"};
            let tenantPayload = {domain: window.location.origin};
            
            
            const {dispatch} = this.props;
       
            await dispatch(authActions.confirmTenant(tenantPayload));
        // }
    }

    renderPreloader = ()=>{
        
        return(
            <div className="preload-wrap">
                <div className="preloading-ico">
                    <img src={Preload} alt=""/>
                </div>
            </div>
        )
    }



    renderFormWrap = ()=>{
        let loginRequest = this.props.loginRequest;
        let getTenant = localStorage.getItem("lingoAuthTenant")? JSON.parse(localStorage.getItem("lingoAuthTenant")): null;
        let 
            validationSchema = Yup.object().shape({
                email: Yup.string()
                    // .email('Please provide valid email')
                    .required('Required'),
                password: Yup.string()
                    .required('Required'),
            });

        return(
            <div>
                <div className="form-heading">
                    {/* <img src={CardIco} alt=""/> */}
                    {getTenant && <h3>{getTenant.productName}</h3>}
                    {!getTenant && <h3>BankLingo CBS</h3>}
                </div>
                <Formik
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                      
                        let loginPayload ={
                            username: values.email,
                            password:values.password
                        }
                        this.handleLoginForm(loginPayload)
                            .then(
                                () => {         
                                    if(this.props.loginRequest.request_status===authConstants.LOGIN_USER_SUCCESS){
                                        // this.props.dispatch(authActions.Login("CLEAR"));
                                    }
    
                                }
                            )




                    }}
                >
                    {({ handleSubmit,
                        handleChange,
                        handleBlur,
                        resetForm,
                        setFieldValue,
                        setFieldTouched,
                        values,
                        touched,
                        isValid,
                        errors, }) => (
                        <Form noValidate
                            onSubmit={handleSubmit}>

                            <Form.Group>
                                <Form.Label className="block-level">Email</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="Enter your username"
                                    className={errors.email && touched.email ? "is-invalid" : null}
                                    required />

                                    {errors.email && touched.email ? (
                                        <span className="invalid-feedback">{errors.email}</span>
                                    ) : null}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="block-level">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    placeholder="Enter your password"
                                    onChange={handleChange}
                                    className={errors.password && touched.password ? "is-invalid" : null}
                                    required />

                                    {errors.password && touched.password ? (
                                        <span className="invalid-feedback">{errors.password}</span>
                                    ) : null}
                            </Form.Group>

                            {loginRequest.request_status === authConstants.LOGIN_USER_FAILURE &&
                                    <Alert variant="danger">
                                        {loginRequest.request_data.error}
                                    </Alert>
                                }
                            <div className="form-cta   full-width">
                                
                                <Button
                                    type="submit"
                                    disabled={loginRequest.is_request_processing}
                                >
                                    {loginRequest.is_request_processing ? "Please wait..." : "Sign In"}
                                </Button>

                                <div className="copy-info">
                                    Copyright &copy; Nidcom Solutions
                                </div>
                            </div>

                           

                            {/* {submitVentureProposalRequest.request_status === inappConstants.SUBMIT_VENTURE_PROPOSAL_FAILURE &&
                                <Alert variant="danger">
                                    {submitVentureProposalRequest.request_data.error}
                                </Alert>
                            }

                            {submitVentureProposalRequest.request_status === inappConstants.SUBMIT_VENTURE_PROPOSAL_SUCCESS &&
                                <Alert variant="success">
                                    {submitVentureProposalRequest.request_data.response.responseFriendlyMessage}
                                </Alert>
                            } */}

                            
                        </Form>
                    )}
                </Formik>

            </div>
        )
    }



    renderPageWrap =()=>{
        return(
            <div className="login-wrapper">
                <div className="login-img">
                    <div className="cardicon">
                        <img src={CardBg} alt=""/>
                    </div>
                </div>
                <div className="login-form">
                    <div className="form-wrap">
                        {this.renderFormWrap()}
                    </div>
                </div>
            </div>
        )
    }

    

    







    renderPageContent = () => {
        
        return (
            <div>

                {this.renderPageWrap()}
            </div>
        )
    }

    renderContentWrap = ()=>{
        let confirmTenantRequest = this.props.confirmTenantRequest;
        if(confirmTenantRequest.request_status===authConstants.GET_TENANCY_PENDING){
            return(
                this.renderPreloader()
            )
        }
        if(confirmTenantRequest.request_status===authConstants.GET_TENANCY_SUCCESS){
            return(
                <OnboardingContainer>
                    {
                        this.renderPageContent()
                    }
                </OnboardingContainer>
            )
        }
        if(confirmTenantRequest.request_status===authConstants.GET_TENANCY_FAILURE){
            return(
                <div className="failed-tenancy">
                    <div className="tenancy-error-wrap">
                        <div className="heading-txt">Sorry</div>
                        <div className="tenancy-error">
                            {confirmTenantRequest.request_data.error}
                        </div>
                    </div>
                </div>
            )
        }
    }



    render() {
        let getTenant = localStorage.getItem("lingoAuthTenant")? JSON.parse(localStorage.getItem("lingoAuthTenant")): null;
        
        

        return (
            <Fragment>
                <Helmet>
                    {(getTenant===null) && <title>BankLingo </title>}
                    {(getTenant) && <title>BankLingo | {getTenant.companyName} </title>}
                    {/* <title>BankLingo | Card Generator </title> */}
                </Helmet>
                {/* {
                    this.renderContentWrap()
                } */}
                <OnboardingContainer>
                    {
                        this.renderPageContent()
                    }
                </OnboardingContainer>

            </Fragment>
        );
    }
}



function mapStateToProps(state) {
    return {
        loginRequest : state.authReducers.LoginReducer,
        confirmTenantRequest : state.authReducers.confirmTenantReducer
        
    };
}

export default connect(mapStateToProps)(LoginWrap);