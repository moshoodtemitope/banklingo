import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'
// import Select from 'react-select';
import Form from 'react-bootstrap/Form'
// import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert'

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import "./administration.scss"; 
class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }

    componentDidMount() {

        // this.getAllPermissions();
        this.getAUser(this.props.encodedKey);
    }

    getAUser =  (encodedKey)=>{
        const {dispatch} = this.props;
       
         dispatch(administrationActions.getAUser(encodedKey, true));
    }

    updateUserRequest = async (payload)=>{
        const {dispatch} = this.props;
        
        await dispatch(administrationActions.updateAUser(payload));
    }

    renderUpdateUserForm =(userData,roles, branches)=>{
        let adminUpdateAUserRequest = this.props.adminUpdateAUserRequest,
            allRoles =[],
            allBranches =[],
            updateUserValidationSchema = Yup.object().shape({
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
                contactEmail: Yup.string()
                    .email('Valid email  required')
                    .max(100, 'Max limit reached'),
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

            let currentRole = roles.filter(eachrole=>eachrole.roleId===userData.roleId)[0],
                userAddress=userData.address,
                userContact=userData.contact;

                console.log('role is', currentRole);

        return(
            <Formik
                initialValues={{
                    firstName: userData.firstName!==null?userData.firstName:'',
                    lastName: userData.lastName!==null?userData.lastName:'',
                    title: userData.title,
                    roleId: userData.roleId,
                    userIsTeller: userData.isTeller,
                    userIsAccountOfficer: userData.isAccountOfficer,
                    userIsAdministrator: userData.isAdministrator,
                    userIsPortalAdministrator: userData.isPortalAdministrator,
                    userHasApiAccessRight: userData.isAccountOfficer,
                    note: userData.notes.notes!==null?userData.notes.notes:'',
                    addressLine1: userAddress.addressLine1!==null?userAddress.addressLine1:'',
                    addressLine2: userAddress.addressLine2!==null?userAddress.addressLine2:'',
                    addressCity: userAddress.addressCity!==null?userAddress.addressCity:'',
                    addressState: userAddress.addressState!==null?userAddress.addressState:'',
                    addressCountry: userAddress.addressCountry!==null?userAddress.addressCountry:'',
                    zipCode: userAddress.zipCode!==null?userAddress.zipCode:'',
                    contactMobile: userContact.contactMobile!==null?userContact.contactMobile:'',
                    contactEmail: userContact.contactEmail!==null?userContact.contactEmail:'',
                    userName: userData.userName,
                    emailAddress: userData.emailAddress,
                    password: '',
                    branchId: userData.branchId!==null?userData.branchId:'',
                }}

                validationSchema={updateUserValidationSchema}
                onSubmit={(values, { resetForm }) => {

                    let updateNewUserPayload = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        title: values.title,
                        roleId: values.roleId,
                        isAccountOfficer: values.userIsAccountOfficer,
                        isTeller: values.userIsTeller,
                        isApiAccess: values.userHasApiAccessRight,
                        isPortalAdministrator: values.userIsPortalAdministrator,
                        isAdministrator: values.userIsAdministrator,
                        contact:{
                            // contactMobile:values.contactMobile,
                            // contactEmail:values.contactEmail,
                        },
                        address:{
                            // addressLine1: values.addressLine1,
                            // addressLine2: values.addressLine2,
                            // addressCity: values.addressCity,
                            // addressState: values.addressState,
                            // addressCountry: values.addressCountry,
                            // zipCode: values.zipCode,
                        },
                        userName: values.userName,
                        emailAddress: values.emailAddress,
                        password: values.password,
                        branchId: values.branchId,
                        note: values.note,
                        encodedKey: this.props.encodedKey
                    };
                    if(values.addressLine1!==''){
                        updateNewUserPayload.address.addressLine1 =values.addressLine1;
                    }
                    if(values.addressLine2!==''){
                        updateNewUserPayload.address.addressLine2 =values.addressLine2;
                    }
                    if(values.addressCity!==''){
                        updateNewUserPayload.address.addressCity =values.addressCity;
                    }
                    if(values.addressState!==''){
                        updateNewUserPayload.address.addressState =values.addressState;
                    }
                    if(values.addressCountry!==''){
                        updateNewUserPayload.address.addressCountry =values.addressCountry;
                    }
                    if(values.zipCode!==''){
                        updateNewUserPayload.address.zipCode =values.zipCode;
                    }

                    if(values.contactMobile!==''){
                        updateNewUserPayload.contact.contactMobile =values.contactMobile;
                    }

                    if(values.contactEmail!==''){
                        updateNewUserPayload.contact.contactEmail =values.contactEmail;
                    }

                    console.log('payload is ',updateNewUserPayload);

                    this.updateUserRequest(updateNewUserPayload)
                        .then(
                            () => {

                                if (this.props.adminUpdateAUserRequest.request_status === administrationConstants.UPDATE_A_USER_SUCCESS) {


                                    setTimeout(() => {
                                        this.props.dispatch(administrationActions.updateAUser("CLEAR"));
                                        resetForm();
                                    }, 3000);
                                } else {
                                    setTimeout(() => {
                                        this.props.dispatch(administrationActions.updateAUser("CLEAR"))
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
                                <h3>Editing {userData.name}</h3>
                            </div>
                            <Form.Row>
                                <Col>
                                    <Form.Label className="block-level">First Names</Form.Label>
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
                                        defaultValue ={{label:currentRole.name, value: currentRole.roleId}}
                                        onChange={(selectedRole) => {
                                            this.setState({ selectedRole });
                                            errors.roleId = null
                                            values.roleId = selectedRole.value
                                        }}
                                        className={errors.roleId && touched.roleId ? "is-invalid" : null}
                                        // value="roleId"
                                        name="roleId"
                                        // value={values.roleId}
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
                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="3">
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
                                                <Form.Label className="block-level">Email Address</Form.Label>
                                                <Form.Control type="email"
                                                    onChange={handleChange}
                                                    value={values.contactEmail}
                                                    className={errors.contactEmail && touched.contactEmail ? "is-invalid": null}
                                                    name="contactEmail" />
                                                {errors.contactEmail && touched.contactEmail ? (
                                                    <span className="invalid-feedback">{errors.contactEmail}</span>
                                                ) : null}
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
                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="3">
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
                                        <Form.Row>
                                            
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
                                                    // defaultValue ={{label:currentRole.name, value: currentRole.roleId}}
                                                    onChange={(selectedBranch) => {
                                                        this.setState({ selectedBranch });
                                                        errors.branchId = null
                                                        values.branchId = selectedBranch.value
                                                    }}
                                                    className={errors.branchId && touched.branchId ? "is-invalid" : null}
                                                    
                                                    name="branchId"
                                                    required
                                                />
                                                {errors.branchId && touched.branchId ? (
                                                    <span className="invalid-feedback">{errors.branchId}</span>
                                                ) : null} 
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
                                <NavLink to={'/administration/access/users'} className="btn btn-secondary grayed-out">Cancel</NavLink>
                                <Button 
                                    type="submit"
                                    disabled={adminUpdateAUserRequest.is_request_processing} 
                                    className="mr-20">{adminUpdateAUserRequest.is_request_processing?'Please wait...': 'Update User'}</Button>
                            </div>
                            {adminUpdateAUserRequest.request_status === administrationConstants.UPDATE_A_USER_SUCCESS && 
                                <Alert variant="success">
                                    {adminUpdateAUserRequest.request_data.response.data.message}
                                </Alert>
                            }
                            {adminUpdateAUserRequest.request_status === administrationConstants.UPDATE_A_USER_FAILURE && 
                                <Alert variant="danger">
                                    {adminUpdateAUserRequest.request_data.error}
                            
                                </Alert>
                            }
                        </Form>
                    )}
            </Formik>
        )
    }

    renderUpdateUser = ()=>{
        let adminGetAUser = this.props.adminGetAUserRequest;
            switch (adminGetAUser.request_status){
                case (administrationConstants.GET_A_USER_PENDING):
                    return (
                        <div className="loading-content"> 
                            <div className="loading-text">Please wait... </div>
                        </div>
                    )
                
                case(administrationConstants.GET_A_USER_SUCCESS):
                    let userData = adminGetAUser.request_data.response.data,
                        rolesDataData = adminGetAUser.request_data.response2.data,
                        branchesData = adminGetAUser.request_data.response3.data;
                        if(rolesDataData!==undefined && branchesData!==undefined){
                            if(rolesDataData.length>=1){
                                if(branchesData.length>=1){
                                    return(
                                        this.renderUpdateUserForm(userData, rolesDataData, branchesData)
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
                case (administrationConstants.GET_A_USER_FAILURE):
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{adminGetAUser.request_data.error}</div>
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
                                               {this.renderUpdateUser()}
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
        adminGetAUserRequest : state.administrationReducers.adminGetAUserReducer,
        adminUpdateAUserRequest : state.administrationReducers.adminUpdateAUserReducer,
        
    };
}

export default connect(mapStateToProps)(EditUser);