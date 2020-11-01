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
class ChangePin extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }

    componentDidMount(){
       
    }
    


    handlePINUpdates = async (changePINPayload) =>{
        
        const {dispatch} = this.props;
       
        await dispatch(authActions.ChangePIN(changePINPayload));

        
    }
    
    

    renderChangePin =()=>{
        let changePINRequest = this.props.ChangePinReducer;
           
        let newPwValidationSchema = Yup.object().shape({
            currentPIN: Yup.string()
                .required('Required')
                .max(6, '6 Digits PIN allowed')
                .min(6, '6 Digits PIN allowed'),
            newPIN: Yup.string()
                .max(6, '6 Digits PIN allowed')
                .min(6, '6 Digits PIN allowed')
                .required('Required'),
            confirmNewPIN: Yup.string()
                .required('Required')
                .oneOf([Yup.ref('newPIN'), null], 'PIN must match'),
          });
        return(
            <Formik
                initialValues={{
                    currentPIN:'',
                    newPIN:'',
                    confirmNewPIN:''
                }}
                validationSchema={newPwValidationSchema}
                
                onSubmit={(values, { resetForm }) => {

                    
                    let changePINPayload ={
                        "oldPin": values.currentPIN,
                        "newPin": values.newPIN,
                    }
                

                    this.handlePINUpdates(changePINPayload)
                        .then(
                            () => {

                                if (this.props.ChangePinReducer.request_status === authConstants.CHANGE_PIN_SUCCESS) {
                                    resetForm();
                                    setTimeout(() => {
                                        this.props.dispatch(authActions.ChangePIN("CLEAR"))
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
                                
                                    <Form.Label className="block-level">Current PIN</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="currentPIN"
                                        onChange={handleChange}
                                        value={values.currentPIN}
                                        required
                                        className={errors.currentPIN && touched.currentPIN ? "is-invalid" : null}
                                    />
                                    {errors.currentPIN && touched.currentPIN ? (
                                        <span className="invalid-feedback">{errors.currentPIN}</span>
                                    ) : null}
                                
                            </Form.Group>
                            <Form.Group>
                                
                                    <Form.Label className="block-level">New PIN</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="newPIN"
                                        onChange={handleChange}
                                        value={values.newPIN}
                                        required
                                        className={errors.newPIN && touched.newPIN ? "is-invalid" : null}
                                    />
                                    {errors.newPIN && touched.newPIN ? (
                                        <span className="invalid-feedback">{errors.newPIN}</span>
                                    ) : null}
                                
                            </Form.Group>
                            <Form.Group>
                                
                                    <Form.Label className="block-level">Confirm New PIN</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmNewPIN"
                                        onChange={handleChange}
                                        value={values.confirmNewPIN}
                                        required
                                        className={errors.confirmNewPIN && touched.confirmNewPIN ? "is-invalid" : null}
                                    />
                                    {errors.confirmNewPIN && touched.confirmNewPIN ? (
                                        <span className="invalid-feedback">{errors.confirmNewPIN}</span>
                                    ) : null}
                                
                            </Form.Group>
                        <div className="form-ctas horizontal">
                            <Button 
                                variant="success" 
                                className="mr-20px" 
                                type="submit"
                                disabled={changePINRequest.is_request_processing}
                            > 
                                {changePINRequest.is_request_processing?"Please wait...": "Update New PIN"}
                            </Button>
                           
                        </div>
                        {changePINRequest.request_status === authConstants.CHANGE_PIN_SUCCESS && 
                            <Alert variant="success">
                                {changePINRequest.request_data.response.data.message}
                            </Alert>
                        }
                        {changePINRequest.request_status === authConstants.CHANGE_PIN_FAILURE && 
                            <Alert variant="danger">
                                {changePINRequest.request_data.error}
                        
                                {/* {changePINRequest.error} */}
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
                                                <h2>Change PIN</h2>
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
                                                {this.renderChangePin()}
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
        ChangePinReducer : state.authReducers.ChangePinReducer,
    };
}

export default connect(mapStateToProps)(ChangePin);