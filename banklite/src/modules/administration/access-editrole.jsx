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

const CheckboxField = ({checked, onChange}) => {
    return (
      <input type="checkbox" checked={checked} onChange={ev => onChange(ev.target.checked)} />
    );
  };
class EditRole extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            showError: false,
            errorMessage:'',
            storedPermissionsSelected:null
        }

        this.permissionsSelected=[];
        
    }


    componentDidMount() {

        // this.getAllPermissions();

        this.getARole(this.props.match.params.roleId);
        // this.storeAllPermissions()
    }


    getAllPermissions = ()=>{
        const {dispatch} = this.props;
        dispatch(administrationActions.getAllPermissions());
    }

    getARole =  (roleId)=>{
        // const {dispatch} = this.props;
        // let getARoleRequest = this.props.adminGetARole;
        
        //  dispatch(administrationActions.getARole(roleId));
        this.fetchRole(roleId)
            .then(()=>{
                this.storeAllPermissions()
            })

    }
    fetchRole =async (roleId)=>{
        const {dispatch} = this.props;
       
        
        await dispatch(administrationActions.getARole(roleId))
    }

    updateARoleRequest = async (payload)=>{
        const {dispatch} = this.props;
        
        await dispatch(administrationActions.updateARole(payload));
    }
    
    handlePermissionsCheckboxChange(checked, option) {
        const {options} = this.state;
        
        var cOptions = [...options];
        for(var i in cOptions) {
          if(cOptions[i].id == option.id) {
            cOptions[i].checked = checked;
          }
        }
        this.setState({
          options: cOptions
        });
      }

    storeAllPermissions = ()=>{
        let getARoleRequest = this.props.adminGetARole;
        if(administrationConstants.GET_A_ROLE_SUCCESS){
            let roleData = getARoleRequest.request_data.response.data;

            roleData.permissions.map((permission, index) => {
                // permissiondData.map((permission, index)=>{
                
                if (permission.enabled === true && this.permissionsSelected.indexOf(permission.permissionCode) === -1) {
                    this.permissionsSelected.push(permission.permissionCode);
                    
                }

                // allPermissionsList[permission.permissionCode] = permission.enabled;
                // allPermissionsList.push({
                //     [permission.permissionCode]: permission.enabled
                // })
            })
        }
    }

    renderUpdateRoleForm = (permissiondData, roleData)=>{
        let updateARoleRequest = this.props.adminUpdateARole;
        let permissionGroups = [],
            // permissionsSelected=[],
            allPermissionsList={},
            testList =[],
            {showError, errorMessage, storedPermissionsSelected} = this.state,
            permissionsEnabled = roleData.permissions,
            createRoleValidationSchema = Yup.object().shape({
                roleName: Yup.string()
                    .min(2, 'Valid role name required')
                    .max(30, 'Max limit reached')
                    .required('Required'),
                note:  Yup.string()
                    .min(5, 'Provide detailed notes'),
              });

            roleData.permissions.map((permission, index) => {
                // permissiondData.map((permission, index)=>{
                if (permissionGroups.indexOf(permission.groupName) === -1) {
                    permissionGroups.push(permission.groupName);
                }
               

                allPermissionsList[permission.permissionCode] = permission.enabled;
                
            })
           
        
        return(
            <Formik
                initialValues={{
                    roleName:roleData.roleName,
                    roleIsTeller: roleData.isTeller,
                    roleIsAdministrator: roleData.isAdministrator,
                    roleHasPortalAccessRight: roleData.hasPortalAccessRight,
                    roleHasApiAccessRight: roleData.hasApiAccessRight,
                    note: roleData.note,
                    ...allPermissionsList
                }}

                validationSchema={createRoleValidationSchema}
                onSubmit={(values, { resetForm }) => {
                    let updateRolePayload
                    if(this.permissionsSelected.length>=1){
                        this.setState({showError:false, errorMessage:""})
                         updateRolePayload = {
                            name: values.roleName,
                            isTeller: values.roleIsTeller,
                            isAdministrator: values.roleIsAdministrator,
                            hasPortalAccessRight: values.roleHasPortalAccessRight,
                            hasApiAccessRight: values.roleHasApiAccessRight,
                            note:values.note,
                            permissionCodes:this.state.storedPermissionsSelected!==null? this.state.storedPermissionsSelected : this.permissionsSelected,
                            id:this.props.match.params.roleId
                        }
                    


                       
                        this.updateARoleRequest(updateRolePayload)
                            .then(
                                () => {

                                    if(this.props.adminUpdateARole.request_status === administrationConstants.UPDATE_A_ROLE_SUCCESS) {
                                    

                                        setTimeout(() => {
                                            
                                            this.props.dispatch(administrationActions.updateARole("CLEAR"));
                                            
                                            
                                        }, 3000);
                                    }else{
                                        setTimeout(() => {
                                            this.props.dispatch(administrationActions.updateARole("CLEAR"))
                                        }, 3000);
                                    }

                                }
                            )

                    }else{
                        this.setState({showError:true, errorMessage:"Please select a permission for this role"})
                    }

                }}
            >
                {({ handleSubmit,
                    handleChange,
                    handleBlur,
                    resetForm,
                    setFieldValue,
                    values,
                    touched,
                    isValid,
                    errors, }) => (
                        <Form
                            noValidate 
                            onSubmit={handleSubmit} 
                            className="form-content card">
                            <div className="form-heading">
                            <h3>Edit Role- {values.roleName}</h3>
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
                                        {/* <div>{JSON.stringify(values, null, 2)} </div> */}

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
                                                                        roleData.permissions.map((permission, index)=>{
                                                                            // permissiondData.map((permission, index)=>{
                                                                            if(permission.groupName===permissionGroup){
                                                                               
                                                                               
                                                                                return(
                                                                                    <div className="checkbox-wrap" key={`permission-${index}`}>
                                                                                        <input 
                                                                                            type="checkbox" 
                                                                                            // checked={permission.enabled}
                                                                                            // checked={this.state[`permission-${permission.permissionCode}`]}
                                                                                            // value={permission.enabled}
                                                                                            // ref={`permission-${permission.permissionCode}`}
                                                                                            data-permissioncode={permission.permissionCode}
                                                                                            // id={`permit-${permission.permissionCode}`} 
                                                                                            id={`permit-${permission.permissionCode}-${index}`}
                                                                                            checked={values[permission.permissionCode]}
                                                                                            name={permission.permissionCode}
                                                                                            // onChange={handleChange} 
                                                                                            value={values[permission.permissionCode]}

                                                                                            onChange={(event)=>{
                                                                                                // event.stopImmediatePropagation();
                                                                                                let permitCode = event.target.getAttribute('data-permissioncode');
                                                                                                // this.setState({
                                                                                                //     [`permission-${permission.permissionCode}`]: !this.state[`permission-${permission.permissionCode}`]
                                                                                                // })
                                                                                               
                                                                                                this.setState({showError:false, errorMessage:""})
                                                                                                setFieldValue(`${permission.permissionCode}`, event.target.checked)


                                                                                                if(event.target.checked ===true){
                                                                                                    
                                                                                                    if(this.permissionsSelected.indexOf(permitCode) === -1){
                                                                                                        this.permissionsSelected.push(permitCode);
                                                                                                        
                                                                                                    }
                                                                                                }

                                                                                                if(event.target.checked ===false){
                                                                                                    
                                                                                                    if(this.permissionsSelected.indexOf(permitCode) > -1){
                                                                                                        this.permissionsSelected.splice(this.permissionsSelected.indexOf(permitCode), 1)
                                                                                                        
                                                                                                        
                                                                                                    }
                                                                                                }

                                                                                               


                                                                                                // testList = this.permissionsSelected
                                                                                                
                                                                                                if(this.permissionsSelected.length>=1){
                                                                                                    this.setState({storedPermissionsSelected: this.permissionsSelected})
                                                                                                }else{
                                                                                                    this.setState({storedPermissionsSelected: null})
                                                                                                }
                                                                                                
                                                                                                // if(permissionsSelected.indexOf(permitCode) > -1){
                                                                                                //     permissionsSelected.splice(permissionsSelected.indexOf(permitCode), 1)
                                                                                                // }else{
                                                                                                //     if(event.target.checked ===true){
                                                                                                //         permissionsSelected.push(permitCode);
                                                                                                //     }
                                                                                                // }
                                                                                            }}

                                                                                            // type="checkbox" 
                                                                                            

                                                                                        />
                                                                                        <label htmlFor={`permit-${permission.permissionCode}-${index}`} onClick={e=>{e.stopPropagation()}} className="check-label" >{permission.permissionName}</label>
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
                                {/* <NavLink to={'/administration/access'} className="btn btn-secondary grayed-out">Cancel</NavLink> */}
                                <Button variant="light" 
                                        className="btn btn-secondary grayed-out"
                                        onClick={()=>this.props.history.goBack()}
                                >
                                    Cancel</Button>
                                <Button
                                    type="submit"
                                    disabled={updateARoleRequest.is_request_processing} 
                                    className="mr-20">{updateARoleRequest.is_request_processing?'Please wait...': 'Update Role'}</Button>
                            </div>
                            {updateARoleRequest.request_status === administrationConstants.UPDATE_A_ROLE_SUCCESS && 
                                <Alert variant="success">
                                    {updateARoleRequest.request_data.response.data.message}
                                </Alert>
                            }
                            {updateARoleRequest.request_status === administrationConstants.UPDATE_A_ROLE_FAILURE && 
                                <Alert variant="danger">
                                    {updateARoleRequest.request_data.error}
                            
                                </Alert>
                            }
                            {showError && 
                                <Alert variant="danger">
                                    {errorMessage}
                            
                                </Alert>
                            }
                        </Form>
                        )}
            </Formik>
        )
    }

    renderUpdateRole = ()=>{
        let getARoleRequest = this.props.adminGetARole;

            switch (getARoleRequest.request_status){
                case (administrationConstants.GET_A_ROLE_PENDING):
                    return (
                        <div className="loading-content"> 
                            <div className="loading-text">Please wait... </div>
                        </div>
                    )
                case(administrationConstants.GET_A_ROLE_SUCCESS):
               
                    let permissionData = getARoleRequest.request_data.response2.data,
                        roleData = getARoleRequest.request_data.response.data;
                        
                    if(permissionData!==undefined){
                        if(permissionData.length>=1){
                            return(
                                this.renderUpdateRoleForm(permissionData,roleData)
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
                case (administrationConstants.GET_A_ROLE_FAILURE):
                    let requestError = getARoleRequest.request_data.error;
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{requestError}</div>
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
                                                {this.renderUpdateRole()}
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
        adminUpdateARole : state.administrationReducers.adminUpdateARoleReducer,
        adminGetARole : state.administrationReducers.adminGetARoleReducer,
        adminGetAllPermissions : state.administrationReducers.adminGetAllPermissionsReducer,
    };
}

export default connect(mapStateToProps)(EditRole);