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

import {authActions} from '../../redux/actions/auth/auth.action';
import {authConstants} from '../../redux/actiontypes/auth/auth.constants'
import Alert from 'react-bootstrap/Alert'

// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }

    componentDidMount(){
       
    }
    


    handlePasswordUpdates = async (changePasswordPayload) =>{
        
        const {dispatch} = this.props;
       
        await dispatch(authActions.ChangePassword(changePasswordPayload));

        
    }
    
    

    renderChangePassword =()=>{
        let changePasswordRequest = this.props.changePasswordReducer;
           
        let newPwValidationSchema = Yup.object().shape({
            currentPassword: Yup.string()
                .required('Required'),
            newPassword: Yup.string()
                .min(6, 'Minimum of 6 characters')
                .required('Required'),
            confirmNewPassword: Yup.string()
                .required('Required')
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
          });
        return(
            <Formik
                initialValues={{
                    currentPassword:'',
                    newPassword:'',
                    confirmNewPassword:''
                }}
                validationSchema={newPwValidationSchema}
                
                onSubmit={(values, { resetForm }) => {

                    
                    let changePasswordPayload ={
                        "oldPassword": values.currentPassword,
                        "newPassword": values.newPassword,
                    }
                

                    this.handlePasswordUpdates(changePasswordPayload)
                        .then(
                            () => {

                                if (this.props.changePasswordReducer.request_status === authConstants.CHANGE_PASSWORD_SUCCESS) {
                                    resetForm();
                                    setTimeout(() => {
                                        this.props.dispatch(authActions.ChangePassword("CLEAR"))
                                    }, 3000);
                                }

                                

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
                        
                            <Form.Group>
                                
                                    <Form.Label className="block-level">Current Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="currentPassword"
                                        onChange={handleChange}
                                        value={values.currentPassword}
                                        required
                                        className={errors.currentPassword && touched.currentPassword ? "is-invalid" : null}
                                    />
                                    {errors.currentPassword && touched.currentPassword ? (
                                        <span className="invalid-feedback">{errors.currentPassword}</span>
                                    ) : null}
                                
                            </Form.Group>
                            <Form.Group>
                                
                                    <Form.Label className="block-level">New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="newPassword"
                                        onChange={handleChange}
                                        value={values.newPassword}
                                        required
                                        className={errors.newPassword && touched.newPassword ? "is-invalid" : null}
                                    />
                                    {errors.newPassword && touched.newPassword ? (
                                        <span className="invalid-feedback">{errors.newPassword}</span>
                                    ) : null}
                                
                            </Form.Group>
                            <Form.Group>
                                
                                    <Form.Label className="block-level">Confirm New Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmNewPassword"
                                        onChange={handleChange}
                                        value={values.confirmNewPassword}
                                        required
                                        className={errors.confirmNewPassword && touched.confirmNewPassword ? "is-invalid" : null}
                                    />
                                    {errors.confirmNewPassword && touched.confirmNewPassword ? (
                                        <span className="invalid-feedback">{errors.confirmNewPassword}</span>
                                    ) : null}
                                
                            </Form.Group>
                        <div className="form-ctas horizontal">
                            <Button 
                                variant="success" 
                                className="mr-20px" 
                                type="submit"
                                disabled={changePasswordRequest.is_request_processing}
                            > 
                                {changePasswordRequest.is_request_processing?"Please wait...": "Save New Password"}
                            </Button>
                           
                        </div>
                        {changePasswordRequest.request_status === authConstants.CHANGE_PASSWORD_SUCCESS && 
                            <Alert variant="success">
                                {changePasswordRequest.request_data.response.data.message}
                            </Alert>
                        }
                        {changePasswordRequest.request_status === authConstants.CHANGE_PASSWORD_FAILURE && 
                            <Alert variant="danger">
                                {changePasswordRequest.request_data.error}
                        
                                {/* {changePasswordRequest.error} */}
                            </Alert>
                        }

                    </Form>
                )}
        </Formik>
        )
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
                                                <h2>Change Password</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {this.renderChangePassword()}
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
        changePasswordReducer : state.authReducers.ChangePasswordReducer,
    };
}

export default connect(mapStateToProps)(ChangePassword);