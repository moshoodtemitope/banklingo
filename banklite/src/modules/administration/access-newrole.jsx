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
// import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik';
import * as Yup from 'yup';

import Alert from 'react-bootstrap/Alert'

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import "./administration.scss"; 
class CreateNewRole extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }

    componentDidMount() {

        this.getAllPermissions();
    }

    getAllPermissions = ()=>{
        const {dispatch} = this.props;
        dispatch(administrationActions.getAllPermissions());
    }


    createRoleRequest = async (payload)=>{
        const {dispatch} = this.props;
        
        await dispatch(administrationActions.addARole(payload));
    }

    renderCreaRoleForm = (permissiondData)=>{
        let createARoleRequest = this.props.adminCreateRole;
        let permissionGroups = [],
            permissionsSelected=[],
            createRoleValidationSchema = Yup.object().shape({
                roleName: Yup.string()
                    .min(2, 'Valid role name required')
                    .max(30, 'Max limit reached')
                    .required('Required'),
                note:  Yup.string()
                    .min(5, 'Provide detailed notes'),
              });

            permissiondData.map((permission, index)=>{
                if(permissionGroups.indexOf(permission.groupName)===-1){
                    permissionGroups.push(permission.groupName);
                }
            })
        
        return(
            <Formik
                initialValues={{
                    roleName:'',
                    roleIsTeller: false,
                    roleIsAdministrator: false,
                    roleHasPortalAccessRight: false,
                    roleHasApiAccessRight: false,
                    isAccountOfficer:false,
                    note: ''
                }}

                validationSchema={createRoleValidationSchema}
                onSubmit={(values, { resetForm }) => {

                    let createNewRolePayload = {
                        name: values.roleName,
                        isTeller: values.roleIsTeller,
                        isAdministrator: values.roleIsAdministrator,
                        hasPortalAccessRight: values.roleHasPortalAccessRight,
                        hasApiAccessRight: values.roleHasApiAccessRight,
                        isAccountOfficer:values.isAccountOfficer,
                        note:values.note,
                        permissionCodes:permissionsSelected
                    }


                    
                    this.createRoleRequest(createNewRolePayload)
                        .then(
                            () => {

                                if(this.props.adminCreateRole.request_status === administrationConstants.CREATE_A_ROLE_SUCCESS) {
                                   

                                    setTimeout(() => {
                                        this.props.dispatch(administrationActions.addARole("CLEAR"));
                                        this.getAllPermissions();
                                        resetForm();
                                    }, 3000);
                                }else{
                                    setTimeout(() => {
                                        this.props.dispatch(administrationActions.addARole("CLEAR"))
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
                                <h3>Create Role</h3>
                            </div>
                            <Form.Group className="w-40">
                                <Form.Label className="block-level">Role Name</Form.Label>
                                <Form.Control 
                                    type="text"
                                    onChange={handleChange}
                                    value={values.roleName}
                                    className={errors.roleName && touched.roleName ? "is-invalid": null}
                                    name="roleName"
                                    required  />
                                 
                                 {errors.roleName && touched.roleName ? (
                                    <span className="invalid-feedback">{errors.roleName}</span>
                                ) : null}
                            </Form.Group>

                            <Accordion defaultActiveKey="0" >
                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                    User Rights
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <div>
                                        <Form.Row>

                                            <Col>
                                                <Form.Label>Type</Form.Label>
                                                <div className="checkbox-wrap">
                                                    <input 
                                                        type="checkbox" 
                                                        id="roleIsAdministrator" 
                                                        checked={values.roleIsAdministrator? values.roleIsAdministrator:null}
                                                        name="roleIsAdministrator"
                                                        onChange={handleChange} 
                                                        value={values.roleIsAdministrator} 
                                                    />
                                                    
                                                    <label htmlFor="roleIsAdministrator">Administrator</label>
                                                </div>
                                                <div className="checkbox-wrap">
                                                    <input 
                                                         type="checkbox" 
                                                         id="roleIsTeller" 
                                                         checked={values.roleIsTeller? values.roleIsTeller:null}
                                                         name="roleIsTeller"
                                                         onChange={handleChange} 
                                                         value={values.roleIsTeller}  />
                                                    <label htmlFor="roleIsTeller">Teller</label>
                                                </div>
                                                <div className="checkbox-wrap">
                                                    <input 
                                                        type="checkbox" 
                                                        id="isAccountOfficer" 
                                                        checked={values.isAccountOfficer? values.isAccountOfficer:null}
                                                        name="isAccountOfficer"
                                                        onChange={handleChange} 
                                                        value={values.isAccountOfficer}  />
                                                    <label htmlFor="isAccountOfficer">Account Officer</label>
                                                </div>
                                            </Col>
                                            <Col>
                                                <Form.Label>Access Rights</Form.Label>
                                                <div className="checkbox-wrap">
                                                    <input 
                                                        type="checkbox" 
                                                        id="roleHasPortalAccessRight" 
                                                        checked={values.roleHasPortalAccessRight? values.roleHasPortalAccessRight:null}
                                                        name="roleHasPortalAccessRight"
                                                        onChange={handleChange} 
                                                        value={values.roleHasPortalAccessRight}  />
                                                    <label htmlFor="roleHasPortalAccessRight">Portal Access</label>
                                                </div>
                                                <div className="checkbox-wrap">
                                                    <input 
                                                        type="checkbox" 
                                                        id="roleHasApiAccessRight" 
                                                        checked={values.roleHasApiAccessRight? values.roleHasApiAccessRight:null}
                                                        name="roleHasApiAccessRight"
                                                        onChange={handleChange} 
                                                        value={values.roleHasApiAccessRight}  />
                                                    <label htmlFor="roleHasApiAccessRight">API</label>
                                                </div>
                                            </Col>
                                            
                                        </Form.Row>
                                    </div>
                                </Accordion.Collapse>
                            </Accordion>

                            <Accordion defaultActiveKey="0" >
                                <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                    Permissions
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <div>
                                        {/* <div className="searchbox-wrap">
                                            <Form.Control type="text" size="sm" placeholder="search permissions" />
                                        </div> */}

                                        {
                                            permissionGroups.map((permissionGroup, index)=>{
                                                return(
                                                    <div key={index} className="each-permissiongroup">
                                                         <Accordion>
                                                            <Accordion.Toggle className="togglestyle" variant="link" as={Button} eventKey={`group-${index}`}>
                                                                <span className="permissiondrop">
                                                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" />
                                                                </span>
                                                                <label htmlFor="pick-1">{permissionGroup}</label>
                                                            </Accordion.Toggle>
                                                            {/* <input type="checkbox" name="" id="pick-292" /> */}
                                                           
                                                            <Accordion.Collapse eventKey={`group-${index}`}>
                                                                <div className="inner-permissions">
                                                                    {
                                                                        permissiondData.map((permission, index)=>{
                                                                            if(permission.groupName===permissionGroup){
                                                                                return(
                                                                                    <div className="checkbox-wrap" key={`permission-${index}`}>
                                                                                        <input 
                                                                                            type="checkbox" 
                                                                                            name="" 
                                                                                            data-permissioncode={permission.permissionCode}
                                                                                            id={`permit-${permission.permissionCode}`} 
                                                                                            onChange={(event)=>{
                                                                                                let permitCode = event.target.getAttribute('data-permissioncode');
                                                                                                
                                                                                                if(permissionsSelected.indexOf(permitCode) > -1){
                                                                                                    permissionsSelected.splice(permissionsSelected.indexOf(permitCode), 1)
                                                                                                }else{
                                                                                                    permissionsSelected.push(permitCode);
                                                                                                }
                                                                                                
                                                                                            }}
                                                                                        />
                                                                                        <label htmlFor={`permit-${permission.permissionCode}`} >{permission.permissionName}</label>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        })
                                                                    }
                                                                </div>
                                                            </Accordion.Collapse>
                                                         </Accordion>
                                                    </div>
                                                )
                                            })
                                        }

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
                                                as="textarea" 
                                                rows="3"
                                                name="note"
                                                onChange={handleChange} 
                                                value={values.note}
                                                className={errors.note && touched.note ? "is-invalid": null}
                                                
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
                                <NavLink to={'/administration/access'} className="btn btn-secondary grayed-out">Cancel</NavLink>
                                <Button
                                    type="submit"
                                    disabled={createARoleRequest.is_request_processing} 
                                    className="mr-20">{createARoleRequest.is_request_processing?'Please wait...': 'Create Role'}</Button>
                            </div>
                            {createARoleRequest.request_status === administrationConstants.CREATE_A_ROLE_SUCCESS && 
                                <Alert variant="success">
                                    {createARoleRequest.request_data.response.data.message}
                                </Alert>
                            }
                            {createARoleRequest.request_status === administrationConstants.CREATE_A_ROLE_FAILURE && 
                                <Alert variant="danger">
                                    {createARoleRequest.request_data.error}
                            
                                </Alert>
                            }
                        </Form>
                        )}
            </Formik>
        )
    }

    renderCreateRole = ()=>{
        let getAllPermissionsRequest = this.props.adminGetAllPermissions;

            switch (getAllPermissionsRequest.request_status){
                case (administrationConstants.GET_ROLE_PERMISSIONS_PENDING):
                    return (
                        <div className="loading-content"> 
                            <div className="loading-text">Please wait... </div>
                        </div>
                    )
                case(administrationConstants.GET_ROLE_PERMISSIONS_SUCCESS):
               
                    let permissionData = getAllPermissionsRequest.request_data.response.data;
                    if(permissionData!==undefined){
                        if(permissionData.length>=1){
                            return(
                                this.renderCreaRoleForm(permissionData)
                            )
                            
                        }else{
                            return(
                                <div className="no-records">
                                    No permissions found
                                </div>
                            )
                        }
                    }else{
                        return null;
                    }
                case (administrationConstants.GET_ROLE_PERMISSIONS_FAILURE):
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{getAllPermissionsRequest.request_data.error}</div>
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
                                                {this.renderCreateRole()}
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
        adminCreateRole : state.administrationReducers.adminCreateRoleReducer,
        adminGetAllPermissions : state.administrationReducers.adminGetAllPermissionsReducer,
    };
}

export default connect(mapStateToProps)(CreateNewRole);