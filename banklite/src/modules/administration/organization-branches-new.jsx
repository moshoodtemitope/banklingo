import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import AdminNav from './_menu'
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'

import { Formik } from 'formik';
import * as Yup from 'yup';

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Alert from 'react-bootstrap/Alert'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./administration.scss"; 
class NewBranch extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }


    handleCreateNewBranch = async (createNewBranchPayload)=>{
        const {dispatch} = this.props;
       
        
        await dispatch(administrationActions.createNewBranch(createNewBranchPayload));
    } 

    createBranchValidationSchema = Yup.object().shape({
        key: Yup.string()
            .min(1, 'Response required')
            .max(30, 'Max limit reached')
            .required('Required'),
        name:  Yup.string()
            .min(2, 'Valid response required')
            .max(30, 'Max limit reached')
            .required('Required'),
        addressLine1: Yup.string()
            .min(2, 'Valid response required')
            .max(70, 'Max limit reached')
            .required('Required'),
        addressLine2:  Yup.string()
            .min(2, 'Valid response required')
            .max(70, 'Max limit reached'),
        addressCity: Yup.string()
            .min(2, 'Valid response required')
            .max(40, 'Max limit reached')
            .required('Required'),
        addressState:  Yup.string()
            .min(2, 'Valid response required')
            .max(40, 'Max limit reached')
            .required('Required'),
        addressCountry:  Yup.string()
            .min(2, 'Valid response required')
            .max(35, 'Max limit reached')
            .required('Required'),
        zipCode:  Yup.string()
            .min(2, 'Valid response required')
            .max(10, 'Max limit reached'),
        contactMobile:  Yup.string()
            .min(8, 'Valid response required')
            .max(17, 'Max limit reached'),
        contactEmail:  Yup.string()
            .min(8, 'Valid response required')
            .max(50, 'Max limit reached'),
      });

    renderCreateNewBranch = ()=>{
        let adminCreateNewBranchRequest = this.props.adminCreateNewBranch;
        return (
            <Formik
                initialValues={{
                    key: '',
                    name: '',
                    addressLine1: '',
                    addressLine2: '',
                    addressCity: '',
                    addressState: '',
                    addressCountry: '',
                    zipCode: '',
                    contactMobile: '',
                    contactEmail: ''
                }}

                validationSchema={this.createBranchValidationSchema}
                onSubmit={(values, { resetForm }) => {

                    let createNewBranchPayload = {
                        key: values.key,
                        name: values.name,
                        address :{
                            addressLine1: values.addressLine1,
                            addressLine2: values.addressLine2,
                            addressCity: values.addressCity,
                            addressState: values.addressState,
                            addressCountry: values.addressCountry,
                            zipCode: values.zipCode,
                        },
                        contact: {
                            contactMobile: values.contactMobile,
                            contactEmail: values.contactEmail
                        },
                    }



                    this.handleCreateNewBranch(createNewBranchPayload)
                        .then(
                            () => {

                                if (this.props.adminCreateNewBranch.request_status === administrationConstants.CREATE_NEW_BRANCH_SUCCESS) {


                                    setTimeout(() => {
                                        this.props.dispatch(administrationActions.createNewBranch("CLEAR"))
                                        resetForm();
                                    }, 3000);
                                } else {
                                    setTimeout(() => {
                                        this.props.dispatch(administrationActions.createNewBranch("CLEAR"))
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
                            className="form-content card">
                            <div className="form-heading">
                                <h3>Creating A New Branch</h3>
                            </div>
                            <Form.Row>
                                <Col>
                                    <Form.Label className="block-level">Branch Name</Form.Label>
                                    <Form.Control type="text"
                                        name="name"
                                        onChange={handleChange} 
                                        value={values.name}
                                        className={errors.name && touched.name ? "is-invalid": null}
                                        required  />
                                    {errors.name && touched.name ? (
                                        <span className="invalid-feedback">{errors.name}</span>
                                    ) : null}
                                </Col>
                                <Col>
                                    <Form.Label className="block-level">ID</Form.Label>
                                    <Form.Control type="text"
                                         name="key"
                                         onChange={handleChange} 
                                         value={values.key}
                                         className={errors.key && touched.key ? "is-invalid": null}
                                         required />
                                    {errors.key && touched.key ? (
                                        <span className="invalid-feedback">{errors.key}</span>
                                    ) : null}
                                </Col>
                            </Form.Row>

                            <Accordion defaultActiveKey="0">
                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                    Address
                            </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <div className="each-formsection">
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Street Address - Line 1</Form.Label>
                                                <Form.Control type="text"
                                                    name="addressLine1"
                                                    onChange={handleChange} 
                                                    value={values.addressLine1}
                                                    className={errors.addressLine1 && touched.addressLine1 ? "is-invalid": null} />
                                                {errors.addressLine1 && touched.addressLine1 ? (
                                                    <span className="invalid-feedback">{errors.addressLine1}</span>
                                                ) : null}
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">Street Address - Line 2</Form.Label>
                                                <Form.Control type="text"
                                                    name="addressLine2"
                                                    onChange={handleChange} 
                                                    value={values.addressLine2}
                                                    className={errors.addressLine2 && touched.addressLine2 ? "is-invalid": null} />
                                                {errors.addressLine2 && touched.addressLine2 ? (
                                                    <span className="invalid-feedback">{errors.addressLine2}</span>
                                                ) : null}
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">City</Form.Label>
                                                <Form.Control type="text"
                                                    name="addressCity"
                                                    onChange={handleChange} 
                                                    value={values.addressCity}
                                                    className={errors.addressCity && touched.addressCity ? "is-invalid": null} />
                                                {errors.addressCity && touched.addressCity ? (
                                                    <span className="invalid-feedback">{errors.addressCity}</span>
                                                ) : null}
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">State/Province/Region</Form.Label>
                                                <Form.Control type="text" 
                                                     name="addressState"
                                                     onChange={handleChange} 
                                                     value={values.addressState}
                                                     className={errors.addressState && touched.addressState ? "is-invalid": null} />
                                                 {errors.addressState && touched.addressState ? (
                                                     <span className="invalid-feedback">{errors.addressState}</span>
                                                 ) : null}
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Zip Postal Code</Form.Label>
                                                <Form.Control type="text" 
                                                    name="zipCode"
                                                    onChange={handleChange} 
                                                    value={values.zipCode}
                                                    className={errors.zipCode && touched.zipCode ? "is-invalid": null} />
                                                {errors.zipCode && touched.zipCode ? (
                                                    <span className="invalid-feedback">{errors.zipCode}</span>
                                                ) : null}
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">Country</Form.Label>
                                                <Form.Control type="text" 
                                                    name="addressCountry"
                                                    onChange={handleChange} 
                                                    value={values.addressCountry}
                                                    className={errors.addressCountry && touched.addressCountry ? "is-invalid": null} />
                                                {errors.addressCountry && touched.addressCountry ? (
                                                    <span className="invalid-feedback">{errors.addressCountry}</span>
                                                ) : null}
                                            </Col>
                                        </Form.Row>
                                    </div>
                                </Accordion.Collapse>
                            </Accordion>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                    Contact
                            </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <div className="each-formsection">
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Phone Number</Form.Label>
                                                <Form.Control type="text" 
                                                    name="contactMobile"
                                                    onChange={handleChange} 
                                                    value={values.contactMobile}
                                                    className={errors.contactMobile && touched.contactMobile ? "is-invalid": null} />
                                                {errors.contactMobile && touched.contactMobile ? (
                                                    <span className="invalid-feedback">{errors.contactMobile}</span>
                                                ) : null}
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">Email Address</Form.Label>
                                                <Form.Control type="text" 
                                                    name="contactEmail"
                                                    onChange={handleChange} 
                                                    value={values.contactEmail}
                                                    className={errors.contactEmail && touched.contactEmail ? "is-invalid": null} />
                                                {errors.contactEmail && touched.contactEmail ? (
                                                    <span className="invalid-feedback">{errors.contactEmail}</span>
                                                ) : null}
                                            </Col>
                                        </Form.Row>
                                    </div>
                                </Accordion.Collapse>
                            </Accordion>
                            {/* <Accordion defaultActiveKey="0">
                            <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                Notes
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <div className="each-formsection">
                                   <Form.Group>
                                            <Form.Label className="block-level">Phone Number</Form.Label>
                                            <Form.Control as="textarea" rows="3" />
                                   </Form.Group>
                                </div>
                            </Accordion.Collapse>
                        </Accordion> */}






                            <div className="footer-with-cta toleft">
                                {/* <Button variant="light" className="btn btn-light">
                                    Cancel</Button> */}
                                <NavLink to={'/administration/organization'} className="btn btn-secondary grayed-out">Cancel</NavLink>
                                <Button variant="success" type="submit"
                                    disabled={adminCreateNewBranchRequest.is_request_processing} 
                                    className="mr-20"   
                                    > 
                                        {adminCreateNewBranchRequest.is_request_processing?"Please wait...": "Create Branch"}
                                </Button>

                                
                            </div>
                            {adminCreateNewBranchRequest.request_status === administrationConstants.CREATE_NEW_BRANCH_SUCCESS && 
                                <Alert variant="success">
                                    {adminCreateNewBranchRequest.request_data.response.data.message}
                                </Alert>
                            }
                            {adminCreateNewBranchRequest.request_status === administrationConstants.CREATE_NEW_BRANCH_FAILURE && 
                                <Alert variant="danger">
                                    {adminCreateNewBranchRequest.request_data.error}
                            
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
                        <div className="module-content">
                            <div className="content-container">
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="middle-content">
                                            <div className="full-pageforms w-60">
                                                
                                                {/* <div className="footer-with-cta toleft">
                                                    <Button variant="secondary" className="grayed-out">Rearrange</Button>
                                                    <Button >Add Channel</Button>
                                                </div> */}
                                                {this.renderCreateNewBranch()}
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
        adminCreateNewBranch : state.administrationReducers.adminCreateNewBranchReducer,
    };
}

export default connect(mapStateToProps)(NewBranch);