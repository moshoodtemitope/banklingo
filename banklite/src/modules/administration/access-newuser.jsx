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
// import Select from 'react-select';

import Form from 'react-bootstrap/Form'
import { Formik } from 'formik';
import * as Yup from 'yup';
// import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import Select from 'react-select';

import Alert from 'react-bootstrap/Alert'

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import "./administration.scss"; 
class CreateNewUser extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }

    componentDidMount(){
        this.getRoles();
    }

    getRoles = ()=>{
        const {dispatch} = this.props;
        
        dispatch(administrationActions.getAllRoles(true));
    }

    createUserRequest = async (payload)=>{
        const {dispatch} = this.props;
        
        await dispatch(administrationActions.createUser(payload));
    }
    
    

    renderCreateUserForm =(roles, branches)=>{
        let adminCreateAUserRequest = this.props.adminCreateAUserReducer,
            allRoles =[],
            allBranches =[],
            createUserValidationSchema = Yup.object().shape({
                firstName: Yup.string()
                    .min(2, 'Valid firstname required')
                    .max(40, 'Max limit reached')
                    .required('Required'),
                lastName: Yup.string()
                    .min(2, 'Valid lasttname required')
                    .max(40, 'Max limit reached')
                    .required('Required'),
                title: Yup.string()
                    .min(2, 'Valid title required')
                    .max(40, 'Max limit reached')
                    .required('Required'),
                roleId: Yup.string()
                    .min(1, 'Valid Role required')
                    .max(40, 'Max limit reached')
                    .required('Required'),
                addressLine1: Yup.string()
                    .min(2, 'Valid address required')
                    .max(100, 'Max limit reached'),
                addressLine2: Yup.string()
                    .min(2, 'Valid address required')
                    .max(100, 'Max limit reached'),
                addressCity: Yup.string()
                    .min(2, 'Valid address city required')
                    .max(100, 'Max limit reached'),
                addressState: Yup.string()
                    .min(2, 'Valid address state required')
                    .max(100, 'Max limit reached'),
                addressCountry: Yup.string()
                    .min(1, 'Valid address Country required')
                    .max(100, 'Max limit reached'),
                zipCode: Yup.string()
                    .min(2, 'Valid Zip Code  required')
                    .max(100, 'Max limit reached'),
                contactMobile: Yup.string()
                    .min(7, 'Valid Contact mobile  required')
                    .max(100, 'Max limit reached'),
                // contactEmail: Yup.string()
                //     .email('Valid email  required')
                //     .max(100, 'Max limit reached'),
                userName: Yup.string()
                    .min(2, 'Valid Username  required')
                    .max(100, 'Max limit reached')
                    .required('Required'),
                emailAddress: Yup.string()
                    .email('Valid email  required')
                    .max(100, 'Max limit reached')
                    .required('Required'),
                password: Yup.string()
                    .min(2, 'Valid password  required')
                    .max(100, 'Max limit reached')
                    .required('Required'),
                branchId: Yup.string()
                    .min(1, 'Branch  required')
                    .max(100, 'Max limit reached')
                    .required('Required'),
                note:  Yup.string()
                    .min(5, 'Provide detailed notes'),
            });

            roles.map((eachRole, index)=>{
                allRoles.push({value:eachRole.roleId, label:eachRole.name})
            })

            branches.map((eachBranch, index)=>{
                allBranches.push({value:eachBranch.id, label:eachBranch.name})
            })

        return(
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    title: '',
                    roleId: '',
                    userIsTeller: false,
                    userIsAccountOfficer: false,
                    userIsAdministrator: false,
                    userIsPortalAdministrator: false,
                    userHasApiAccessRight: false,
                    note: '',
                    addressLine1: '',
                    addressLine2: '',
                    addressCity: '',
                    addressState: '',
                    addressCountry: '',
                    zipCode: '',
                    contactMobile: '',
                    // contactEmail: '',
                    userName: '',
                    emailAddress: '',
                    password: '',
                    branchId: '',
                    canAccessAllBranches:false
                }}

                validationSchema={createUserValidationSchema}
                onSubmit={(values, { resetForm }) => {

                    let createNewUserPayload = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        title: values.title !==''? values.title:null,
                        roleId: values.roleId!==''? values.roleId:null,
                        isAccountOfficer: values.userIsAccountOfficer!==""? values.userIsAccountOfficer:null ,
                        isTeller: values.userIsTeller!==''? values.userIsTeller : null,
                        isApiAccess: values.userHasApiAccessRight!==""? values.userHasApiAccessRight: null,
                        isPortalAdministrator: values.userIsPortalAdministrator!==""? values.userIsPortalAdministrator: null,
                        isAdministrator: values.userIsAdministrator!==""?values.userIsAdministrator: null ,
                        contact:{
                            contactMobile:values.contactMobile !==""? values.contactMobile: null,
                            contactEmail:values.contactEmail!=="" ? values.contactEmail:null,
                        },
                        address:{
                            addressLine1: values.addressLine1 !==""? values.addressLine1: null,
                            addressLine2: values.addressLine2!==""? values.addressLine2: null,
                            addressCity: values.addressCity !==""? values.addressCity: null,
                            addressState: values.addressState!==""? values.addressState: null,
                            addressCountry: values.addressCountry !==""? values.addressCountry :null,
                            zipCode: values.zipCode!==""? values.zipCode: null,
                        },
                        userName: values.userName!==""? values.userName: null,
                        emailAddress: values.emailAddress!=="" ? values.emailAddress: null,
                        password: values.password!==""? values.password: null,
                        branchId: values.branchId!==""? values.branchId: null,
                        note: values.note!==""? values.note: null,
                        canAccessAllBranches: values.canAccessAllBranches!==""? values.canAccessAllBranches: null
                    };
                    // if(values.addressLine1!==''){
                    //     createNewUserPayload.address.addressLine1 =values.addressLine1;
                    // }
                    // if(values.addressLine2!==''){
                    //     createNewUserPayload.address.addressLine2 =values.addressLine2;
                    // }
                    // if(values.addressCity!==''){
                    //     createNewUserPayload.address.addressCity =values.addressCity;
                    // }
                    // if(values.addressState!==''){
                    //     createNewUserPayload.address.addressState =values.addressState;
                    // }
                    // if(values.addressCountry!==''){
                    //     createNewUserPayload.address.addressCountry =values.addressCountry;
                    // }
                    // if(values.zipCode!==''){
                    //     createNewUserPayload.address.zipCode =values.zipCode;
                    // }

                    // if(values.contactMobile!==''){
                    //     createNewUserPayload.contact.contactMobile =values.contactMobile;
                    // }

                    // createNewUserPayload.contact.contactEmail =values.emailAddress;
                    // if(values.contactEmail!==''){
                    //     createNewUserPayload.contact.contactEmail =values.emailAddress;
                    //     // createNewUserPayload.contact.contactEmail =values.contactEmail;
                    // }

                    

                    this.createUserRequest(createNewUserPayload)
                        .then(
                            () => {

                                if (this.props.adminCreateAUserReducer.request_status === administrationConstants.CREATE_A_USER_SUCCESS) {


                                    setTimeout(() => {
                                        this.props.dispatch(administrationActions.createUser("CLEAR"));
                                        resetForm();
                                        values.roleId = null;
                                    }, 3000);
                                } else {
                                    setTimeout(() => {
                                        // this.props.dispatch(administrationActions.createUser("CLEAR"))
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
                        <Form noValidate 
                            onSubmit={handleSubmit} 
                            className="form-content card">
                            <div className="form-heading">
                                <h3>Creating A New User</h3>
                            </div>
                            <Form.Row>
                                <Col>
                                    <Form.Label className="block-level">First Name</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        onChange={handleChange}
                                        value={values.firstName}
                                        className={errors.firstName && touched.firstName ? "is-invalid": null}
                                        name="firstName" />
                                    {errors.firstName && touched.firstName ? (
                                        <span className="invalid-feedback">{errors.firstName}</span>
                                    ) : null}
                                </Col>
                                <Col>
                                    <Form.Label className="block-level">Last Name</Form.Label>
                                    <Form.Control type="text"
                                        onChange={handleChange}
                                        value={values.lastName}
                                        className={errors.lastName && touched.lastName ? "is-invalid": null}
                                        name="lastName" />
                                    {errors.lastName && touched.lastName ? (
                                        <span className="invalid-feedback">{errors.lastName}</span>
                                    ) : null}
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Col>
                                    <Form.Label className="block-level">Title</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        onChange={handleChange}
                                        value={values.title}
                                        className={errors.title && touched.title ? "is-invalid": null}
                                        name="title"  />
                                    {errors.title && touched.title ? (
                                        <span className="invalid-feedback">{errors.title}</span>
                                    ) : null}
                                </Col>
                                <Col>
                                    <Form.Label className="block-level">Role</Form.Label>
                                    <Select
                                        options={allRoles}
                                        onChange={(selectedRole) => {
                                            this.setState({ selectedRole });
                                            errors.roleId = null
                                            values.roleId = selectedRole.value
                                        }}
                                        className={errors.roleId && touched.roleId ? "is-invalid" : null}
                                        // value="roleId"
                                        name="roleId"
                                        // value={values.roleId || ''}
                                        required
                                    />
                                    {errors.roleId && touched.roleId ? (
                                        <span className="invalid-feedback">{errors.roleId}</span>
                                    ) : null} 
                                    
                                </Col>
                            </Form.Row>

                            <Accordion defaultActiveKey="0">
                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                    User Rights
                                                        </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <div>
                                        <Form.Row>

                                            <Col>
                                                <Form.Label>Type</Form.Label>
                                                <div className="checkbox-wrap">
                                                    <input type="checkbox" 
                                                        id="userIsAdministrator" 
                                                        checked={values.userIsAdministrator? values.userIsAdministrator:null}
                                                        name="userIsAdministrator"
                                                        onChange={handleChange} 
                                                        value={values.userIsAdministrator}  />
                                                    <label htmlFor="userIsAdministrator">Administrator</label>
                                                </div>
                                                <div className="checkbox-wrap">
                                                    <input type="checkbox" 
                                                        id="userIsTeller" 
                                                        checked={values.userIsTeller? values.userIsTeller:null}
                                                        name="userIsTeller"
                                                        onChange={handleChange} 
                                                        value={values.userIsTeller} />
                                                    <label htmlFor="userIsTeller">Teller</label>
                                                </div>
                                                <div className="checkbox-wrap">
                                                    <input type="checkbox" 
                                                        id="userIsAccountOfficer" 
                                                        checked={values.userIsAccountOfficer? values.userIsAccountOfficer:null}
                                                        name="userIsAccountOfficer"
                                                        onChange={handleChange} 
                                                        value={values.userIsAccountOfficer}/>
                                                    <label htmlFor="userIsAccountOfficer">Account Officer</label>
                                                </div>
                                            </Col>
                                            <Col>
                                                {/* <Form.Label>Access Rights</Form.Label> */}
                                                <div className="checkbox-wrap">
                                                    <input type="checkbox" 
                                                        id="userIsPortalAdministrator" 
                                                        checked={values.userIsPortalAdministrator? values.userIsPortalAdministrator:null}
                                                        name="userIsPortalAdministrator"
                                                        onChange={handleChange} 
                                                        value={values.userIsPortalAdministrator} />
                                                    <label htmlFor="userIsPortalAdministrator">Portal Administrator</label>
                                                </div>
                                                <div className="checkbox-wrap">
                                                    <input type="checkbox" 
                                                            id="userHasApiAccessRight" 
                                                            checked={values.userHasApiAccessRight? values.userHasApiAccessRight:null}
                                                            name="userHasApiAccessRight"
                                                            onChange={handleChange} 
                                                            value={values.userHasApiAccessRight} />
                                                    <label htmlFor="userHasApiAccessRight">API Access</label>
                                                </div>
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
                                    <div>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Mobile Phone</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.contactMobile}
                                                    className={errors.contactMobile && touched.contactMobile ? "is-invalid": null}
                                                    name="contactMobile" />
                                                    {errors.contactMobile && touched.contactMobile ? (
                                                        <span className="invalid-feedback">{errors.contactMobile}</span>
                                                    ) : null}
                                            </Col>
                                            <Col>
                                                {/* <Form.Label className="block-level">Email Address</Form.Label>
                                                <Form.Control type="email"
                                                    onChange={handleChange}
                                                    value={values.contactEmail}
                                                    className={errors.contactEmail && touched.contactEmail ? "is-invalid": null}
                                                    name="contactEmail" />
                                                {errors.contactEmail && touched.contactEmail ? (
                                                    <span className="invalid-feedback">{errors.contactEmail}</span>
                                                ) : null} */}
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            
                                            <Col>
                                                <Form.Label className="block-level">Address Line1</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.addressLine1}
                                                    className={errors.addressLine1 && touched.addressLine1 ? "is-invalid" : null}
                                                    name="addressLine1" />
                                                {errors.addressLine1 && touched.addressLine1 ? (
                                                    <span className="invalid-feedback">{errors.addressLine1}</span>
                                                ) : null}
                                            </Col>
                                            <Col>
                                            <Form.Label className="block-level">Address Line2</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.addressLine2}
                                                    className={errors.addressLine2 && touched.addressLine2 ? "is-invalid" : null}
                                                    name="addressLine2" />
                                                {errors.addressLine2 && touched.addressLine2 ? (
                                                    <span className="invalid-feedback">{errors.addressLine2}</span>
                                                ) : null}
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            
                                            <Col>
                                                <Form.Label className="block-level">Address City</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.addressCity}
                                                    className={errors.addressCity && touched.addressCity ? "is-invalid" : null}
                                                    name="addressCity" />
                                                {errors.addressCity && touched.addressCity ? (
                                                    <span className="invalid-feedback">{errors.addressCity}</span>
                                                ) : null}
                                            </Col>
                                            <Col>
                                            <Form.Label className="block-level">Address State</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.addressState}
                                                    className={errors.addressState && touched.addressState ? "is-invalid" : null}
                                                    name="addressState" />
                                                {errors.addressState && touched.addressState ? (
                                                    <span className="invalid-feedback">{errors.addressState}</span>
                                                ) : null}
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            
                                            <Col>
                                                <Form.Label className="block-level">Address Country</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.addressCountry}
                                                    className={errors.addressCountry && touched.addressCountry ? "is-invalid" : null}
                                                    name="addressCountry" />
                                                {errors.addressCountry && touched.addressCountry ? (
                                                    <span className="invalid-feedback">{errors.addressCountry}</span>
                                                ) : null}
                                            </Col>
                                            <Col>
                                            <Form.Label className="block-level">Zip Code</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.zipCode}
                                                    className={errors.zipCode && touched.zipCode ? "is-invalid" : null}
                                                    name="zipCode" />
                                                {errors.zipCode && touched.zipCode ? (
                                                    <span className="invalid-feedback">{errors.zipCode}</span>
                                                ) : null}
                                            </Col>
                                        </Form.Row>
                                    </div>
                                </Accordion.Collapse>
                            </Accordion>

                            <Accordion defaultActiveKey="0">
                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                    Login Details
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <div>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Username</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    onChange={handleChange}
                                                    value={values.userName}
                                                    className={errors.userName && touched.userName ? "is-invalid": null}
                                                    name="userName" />
                                                    {errors.userName && touched.userName ? (
                                                        <span className="invalid-feedback">{errors.userName}</span>
                                                    ) : null}
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">User Email Address</Form.Label>
                                                <Form.Control type="email"
                                                    onChange={handleChange}
                                                    value={values.emailAddress}
                                                    className={errors.emailAddress && touched.emailAddress ? "is-invalid": null}
                                                    name="emailAddress" />
                                                {errors.emailAddress && touched.emailAddress ? (
                                                    <span className="invalid-feedback">{errors.emailAddress}</span>
                                                ) : null}
                                            </Col>
                                        </Form.Row>
                                        <Form.Row className="mb-0">
                                            
                                            <Col>
                                                <Form.Label className="block-level">Password</Form.Label>
                                                <Form.Control 
                                                    type="password"
                                                    onChange={handleChange}
                                                    value={values.password}
                                                    className={errors.password && touched.password ? "is-invalid" : null}
                                                    name="password" />
                                                {errors.password && touched.password ? (
                                                    <span className="invalid-feedback">{errors.password}</span>
                                                ) : null}
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">Branch</Form.Label>
                                                <Select
                                                    options={allBranches}
                                                    onChange={(selectedBranch) => {
                                                        this.setState({ selectedBranch });
                                                        errors.branchId = null
                                                        values.branchId = selectedBranch.value
                                                    }}
                                                    className={errors.branchId && touched.branchId ? "is-invalid" : null}
                                                    // value="branchId"
                                                    name="branchId"
                                                    // value={values.branchId || ''}
                                                    required
                                                />
                                                {errors.branchId && touched.branchId ? (
                                                    <span className="invalid-feedback">{errors.branchId}</span>
                                                ) : null} 
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <div className="checkbox-wrap">
                                                    <input type="checkbox" 
                                                        id="canAccessAllBranches" 
                                                        checked={values.canAccessAllBranches? values.canAccessAllBranches:null}
                                                        name="canAccessAllBranches"
                                                        onChange={handleChange} 
                                                        value={values.canAccessAllBranches}  />
                                                    <label className="mb-0" htmlFor="canAccessAllBranches">Can access all branches</label>
                                                </div>
                                            </Col>
                                        </Form.Row>
                                    </div>
                                </Accordion.Collapse>
                            </Accordion>
                            
                            

                            <Accordion defaultActiveKey="0">
                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                    Notes
                                                        </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <div className="each-formsection">
                                        <Form.Group>
                                            <Form.Control 
                                                as="textarea" rows="3"
                                                onChange={handleChange}
                                                value={values.note}
                                                className={errors.note && touched.note ? "is-invalid" : null}
                                                name="note"
                                            />
                                            {errors.note && touched.note ? (
                                                <span className="invalid-feedback">{errors.note}</span>
                                            ) : null}
                                        </Form.Group>
                                    </div>
                                </Accordion.Collapse>
                            </Accordion>



                            <div className="footer-with-cta toleft">
                                {/* <Button variant="secondary" className="grayed-out">Cancel</Button> */}
                                <Button variant="light" 
                                        className="btn btn-secondary grayed-out"
                                        onClick={()=>this.props.history.goBack()}
                                >
                                    Cancel</Button>
                                {/* <NavLink to={'/administration/access/users'} className="btn btn-secondary grayed-out">Cancel</NavLink> */}
                                <Button 
                                    type="submit"
                                    disabled={adminCreateAUserRequest.is_request_processing} 
                                    className="mr-20">{adminCreateAUserRequest.is_request_processing?'Please wait...': 'Create User'}</Button>
                            </div>
                            {adminCreateAUserRequest.request_status === administrationConstants.CREATE_A_USER_SUCCESS && 
                                <Alert variant="success">
                                    {adminCreateAUserRequest.request_data.response.data.message}
                                </Alert>
                            }
                            {adminCreateAUserRequest.request_status === administrationConstants.CREATE_A_USER_FAILURE && 
                                <Alert variant="danger">
                                    {adminCreateAUserRequest.request_data.error}
                            
                                </Alert>
                            }
                        </Form>
                    )}
            </Formik>
        )
    }

    renderCreateUser = ()=>{
        let getRolesRequest = this.props.GetRoles;
            switch (getRolesRequest.request_status){
                case (administrationConstants.GET_ALL_ROLES_PENDING):
                    return (
                        <div className="loading-content"> 
                            <div className="loading-text">Please wait... </div>
                        </div>
                    )
                
                case(administrationConstants.GET_ALL_ROLES_SUCCESS):
                    let rolesDataData = getRolesRequest.request_data.response.data,
                        branchesData = getRolesRequest.request_data.response2.data;
                        if(rolesDataData!==undefined && branchesData!==undefined){
                            if(rolesDataData.length>=0){
                                if(branchesData.length>=0){
                                    return(
                                        this.renderCreateUserForm(rolesDataData, branchesData)
                                    )
                                }else{
                                    return(
                                        <div className="no-records">
                                            No Branches has been created
                                            <div className="footer-with-cta centered">
                                                <NavLink to={'/administration/organization/newbranch'} className="btn btn-primary">Add Role</NavLink>
                                            </div>
                                        </div>
                                    )
                                }
                            }else{
                                return(
                                    <div className="no-records">
                                        No Role has been created
                                        <div className="footer-with-cta centered">
                                            <NavLink to={'/administration/access/new-role'} className="btn btn-primary">Add Role</NavLink>
                                        </div>
                                    </div>
                                )
                            }

                        }else{
                            return null;
                        }
                case (administrationConstants.GET_ALL_ROLES_FAILURE):
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{getRolesRequest.request_data.error}</div>
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
                        <div className="module-content">
                            <div className="content-container">
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="middle-content">
                                            <div className="full-pageforms w-60">
                                                {this.renderCreateUser()}
                                                {/* <div className="footer-with-cta toleft">
                                                    <Button variant="secondary" className="grayed-out">Rearrange</Button>
                                                    <Button >Add Channel</Button>
                                                </div> */}
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
        adminCreateAUserReducer : state.administrationReducers.adminCreateAUserReducer,
        GetRoles : state.administrationReducers.adminGetAllRolesReducer,
    };
}

export default connect(mapStateToProps)(CreateNewUser);