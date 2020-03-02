import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import AdminNav from './_menu'

import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Formik } from 'formik';
import * as Yup from 'yup';
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Alert from 'react-bootstrap/Alert'

// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
import { setTimeout } from "timers";
class GeneralCustomerTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            show:false,
            showEdit: false,
            // customerTypeName: '',
            // customerTypeDesc:'',
            // customerTypeId:'',
            // custTypepayload:''
            PageSize: 30,
            CurrentPage:1
        }

        

        
    }

    componentDidMount(){
        this.loadInitialData();
    }

    validationSchema = Yup.object().shape({
        custTypeName: Yup.string()
          .min(2, 'Min of two characters')
          .max(30, 'Max Limit reached')
          .required('Please provide name'),
        custTypeId: Yup.string()
        //   .max(6, 'Max Limit reached')
          .required('Id is required'),
        custTypeDesc: Yup.string()
          .min(2, 'Please provide detailed information')
          .required('Description is required')
    });

    loadInitialData=()=>{
        let {PageSize, CurrentPage}= this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
        this.getCustomerTypes(params);
    }

    getCustomerTypes = (params, tempData)=>{
        const {dispatch} = this.props;
        // let payload ={
        //     PageSize:20,
        //     CurrentPage:1
        // }
        let {PageSize, CurrentPage}= this.state;
        // let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
        if(tempData){
            dispatch(administrationActions.getCustomerTypes(params, tempData));
        }else{
            dispatch(administrationActions.getCustomerTypes(params));
        }
        
    }

    setPagesize = (PageSize, tempData)=>{
        // console.log('----here', PageSize.target.value);
        const {dispatch} = this.props;
        let sizeOfPage = PageSize.target.value,
            {CurrentPage} = this.state;
        
        

        this.setState({PageSize: sizeOfPage});

        let params= `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;

        if(tempData){
            dispatch(administrationActions.getCustomerTypes(params, tempData));
        }else{
            dispatch(administrationActions.getCustomerTypes(params));
        }
        
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize} = this.state;

        // this.setState({PageSize: sizeOfPage});

        let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);


        if(tempData){
            dispatch(administrationActions.getCustomerTypes(params,tempData));
        }else{
            dispatch(administrationActions.getCustomerTypes(params));
        }
    }

    handleClose = () => this.setState({show:false});
    
    handleShow = () => this.setState({show:true});

    handleCloseEdit = () => this.setState({showEdit:false});
    
    handleShowEdit = (selectedCustTypeId) => this.setState({showEdit:true, selectedCustTypeId});

    

    handleCreateNewType = async (typePayload) =>{
        
        const {dispatch} = this.props;
       
        await dispatch(administrationActions.addCustomerType(typePayload));

        
    }

    handleUpdateType = async (typePayload) =>{
        
        const {dispatch} = this.props;
       
        await dispatch(administrationActions.updateCustomerType(typePayload));

        
    }

    
    

    
    renderAllCustomerTypes =()=>{
        let adminGetCustomerTypesRequest = this.props.adminGetCustomerTypes,
            adminUpdateCustomerTypeRequest = this.props.adminUpdateCustomerType;
        
        let adminCreateCustomerTypeRequest = this.props.adminCreateCustomerType;
        let saveRequestData= adminGetCustomerTypesRequest.request_data!==undefined?adminGetCustomerTypesRequest.request_data.tempData:null;

        
        switch(adminGetCustomerTypesRequest.request_status){
            case(administrationConstants.GET_CUSTOMERTYPES_PENDING):
            
                if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
                    return (
                        <div className="loading-content"> 
                            <div className="heading-with-cta">
                                <Form className="one-liner">

                                    <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                        <Form.Control as="select" size="sm">
                                            <option>No Filter</option>
                                            <option>Add New Filter</option>
                                            <option>Custom Filter</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                </Form>

                                <div className="pagination-wrap">
                                    <label htmlFor="toshow">Show</label>
                                    <select id="toshow" className="countdropdown form-control form-control-sm">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="200">200</option>
                                    </select>
                                    
                                </div>
                            </div>
                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Created</th>
                                        <th>Created by</th>
                                        {/* <th></th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </TableComponent>
                            <div className="loading-text">Please wait... </div>
                        </div>
                    )
                }else{
                    
                    return(
                        <div>
                            {adminUpdateCustomerTypeRequest.request_status === administrationConstants.UPDATE_CUSTOMERTYPE_SUCCESS && 
                                <Alert variant="success">
                                    {adminUpdateCustomerTypeRequest.request_data.response.data.message}
                                </Alert>
                            }
                            {adminCreateCustomerTypeRequest.request_status === administrationConstants.CREATE_CUSTOMERTYPE_SUCCESS && 
                                <Alert variant="success">
                                {adminCreateCustomerTypeRequest.request_data.response.data.message}
                                </Alert>
                            }
                            <div className="heading-with-cta">
                                    <Form className="one-liner">

                                        <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                            <Form.Control as="select" size="sm">
                                                <option>No Filter</option>
                                                <option>Add New Filter</option>
                                                <option>Custom Filter</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                    </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow" className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                        
                                    </div>
                                </div>
                            <div className="loading-text">Please wait... </div>
                            <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Created</th>
                                            <th>Created by</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            saveRequestData.map((eachCustomerype, index)=>{
                                                return(
                                                    <Fragment key={index}>
                                                        <tr>
                                                            <td>{eachCustomerype.name}</td>
                                                            <td>{eachCustomerype.dateCreated}</td>
                                                            <td>{eachCustomerype.createdBy}</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <Dropdown.Item eventKey="1" onClick={()=>this.handleShowEdit(eachCustomerype.id)}>Edit</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </tbody>
                                </TableComponent>
                        </div>
                    )
                }
                
            case(administrationConstants.GET_CUSTOMERTYPES_SUCCESS):
                let allCustomerTypesData = adminGetCustomerTypesRequest.request_data.response.data;

                if(allCustomerTypesData!==undefined){
                    if(allCustomerTypesData.result.length>=1){
                        // saveRequestData = allCustomerTypesData;
                        return (
                            <div>
                                {adminUpdateCustomerTypeRequest.request_status === administrationConstants.UPDATE_CUSTOMERTYPE_SUCCESS && 
                                    <Alert variant="success">
                                        {adminUpdateCustomerTypeRequest.request_data.response.data.message}
                                    </Alert>
                                }

                                {adminCreateCustomerTypeRequest.request_status === administrationConstants.CREATE_CUSTOMERTYPE_SUCCESS && 
                                    <Alert variant="success">
                                    {adminCreateCustomerTypeRequest.request_data.response.data.message}
                                    </Alert>
                                }
                                <div className="heading-with-cta">
                                    <Form className="one-liner">

                                        <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                            <Form.Control as="select" size="sm">
                                                <option>No Filter</option>
                                                <option>Add New Filter</option>
                                                <option>Custom Filter</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                    </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow" 
                                            onChange={(e)=>this.setPagesize(e, allCustomerTypesData)}
                                            value={this.state.PageSize}
                                            className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                        <TablePagination
                                                totalPages={allCustomerTypesData.totalPages}
                                                currPage={allCustomerTypesData.currentPage}
                                                currRecordsCount={allCustomerTypesData.result.length}
                                                totalRows={allCustomerTypesData.totalRows}
                                                tempData={allCustomerTypesData.result}
                                                pagesCountToshow={4}
                                                refreshFunc={this.loadNextPage}
                                            />
                                    </div>
                                </div>

                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Created</th>
                                            <th>Created by</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allCustomerTypesData.result.map((eachCustomerype, index)=>{
                                                return(
                                                    <Fragment key={index}>
                                                        <tr>
                                                            <td>{eachCustomerype.name}</td>
                                                            <td>{eachCustomerype.dateCreated}</td>
                                                            <td>{eachCustomerype.createdBy}</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <Dropdown.Item eventKey="1" onClick={()=>this.handleShowEdit(eachCustomerype.id)}>Edit</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </tbody>
                                </TableComponent>
                                <div className="footer-with-cta toleft">
                                    {/* <Button variant="secondary" className="grayed-out">Rearrange</Button> */}
                                    <Button onClick={this.handleShow}>Add Type</Button>
                                </div>
                            </div>
                        )
                    }else{
                        return(
                            <div className="no-records">
                                <div className="heading-with-cta">
                                    <Form className="one-liner">

                                        <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                            <Form.Control as="select" size="sm">
                                                <option>No Filter</option>
                                                <option>Add New Filter</option>
                                                <option>Custom Filter</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                    </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow" 
                                            className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                        <div className="move-page-actions">
                                            <div className="each-page-action">
                                                <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                                            </div>
                                            <div className="each-page-action">
                                                <img alt="go backward" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAAJ0lEQVR42mNgoBj09PT8xyqIIQETRJFAFoRLoAsS1oHXDryuQvcHAJqKQewTJHmSAAAAAElFTkSuQmCC" width="6" height="11" />
                                            </div>
                                            <div className="page-count">
                                                <span>1-20</span>  of <span>20000</span>
                                            </div>
                                            <div className="each-page-action">
                                                <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" />
                                            </div>
                                            <div className="each-page-action">
                                                <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Created</th>
                                            <th>Created by</th>
                                            {/* <th></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </TableComponent>
                            </div>
                        )
                    }
                }else{
                    return null;
                }


            case (administrationConstants.GET_CUSTOMERTYPES_FAILURE):
                return (
                    <div className="loading-content errormsg"> 
                        <div>{adminGetCustomerTypesRequest.request_data.error}</div>
                    </div>
                )
            default :
            return null;
        }
    }

    editCustomerType = ()=>{
        const {showEdit, selectedCustTypeId} = this.state;
        let adminUpdateCustomerTypeRequest = this.props.adminUpdateCustomerType,
            adminGetCustomerTypesRequest = this.props.adminGetCustomerTypes.request_data.response.data,
            selectedCustType = adminGetCustomerTypesRequest.result.filter((custType, index)=>custType.id===selectedCustTypeId)[0];

            let allCustomerTypesData = this.props.adminGetCustomerTypes.request_data.response!==undefined? this.props.adminGetCustomerTypes.request_data.response.data :null;
        
        if(selectedCustType!==undefined){
            return(
                <Modal show={showEdit} onHide={this.handleCloseEdit} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                    <Modal.Header>
                        <Modal.Title>Editing Customer Type</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                custTypeName: selectedCustType.name,
                                custTypeId: selectedCustType.key,
                                custTypeDesc: selectedCustType.description,
                            }}
                            validationSchema={this.validationSchema}
                            onSubmit={ (values, { resetForm}) => {
                                // same shape as initial values
                                let custTypepayload ={
                                    id:selectedCustTypeId,
                                    key:values.custTypeId,
                                    name:values.custTypeName,
                                    description: values.custTypeDesc
                                }
                            


                                this.handleUpdateType(custTypepayload)
                                    .then(
                                        ()=>{
                                            
                                            if(this.props.adminUpdateCustomerType.request_status === administrationConstants.UPDATE_CUSTOMERTYPE_SUCCESS){
                                                this.handleCloseEdit();
                                                // this.getCustomerTypes(allCustomerTypesData);
                                                let {PageSize, CurrentPage}= this.state;
                                                let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
                                                setTimeout(() => {
                                                    this.getCustomerTypes(params,allCustomerTypesData);
                                                    
                                                    this.props.dispatch(administrationActions.updateCustomerType("CLEAR"))
                                                    
                                                }, 2000);
                                                 
                                            }else{
                                                setTimeout(() => {
                                                    this.props.dispatch(administrationActions.updateCustomerType("CLEAR"))
                                                }, 2000);
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
                            // <Form>
                            <Form noValidate className="newtype-form" 
                                    onSubmit={handleSubmit}>
                                <Form.Group controlId="customerTypeName">
                                    <Form.Label className="block-level">Name</Form.Label>
                                    <Form.Control  
                                        name="custTypeName" 
                                        onChange={handleChange}
                                        value={values.custTypeName}
                                        className={errors.custTypeName && touched.custTypeName ? "is-invalid": null}
                                        type="text" required />
                                    {errors.custTypeName && touched.custTypeName ? (
                                        <span className="invalid-feedback">{errors.custTypeName}</span>
                                    ) : null}
                                    
                                </Form.Group>
                                <Form.Group controlId="customerTypeId">
                                    <Form.Label className="block-level">Key</Form.Label>
                                    <Form.Control 
                                        name="custTypeId" 
                                        onChange={handleChange}
                                        value={values.custTypeId}
                                        className={errors.custTypeId && touched.custTypeId ? "is-invalid": null}
                                        type="text" required />
                                    {/* <Form.Control.Feedback type="invalid"> */}
                                    {errors.custTypeId && touched.custTypeId ? (
                                        <span className="invalid-feedback">{errors.custTypeId}</span>
                                    ) : null}      
                                    {/* </Form.Control.Feedback> */}
                                </Form.Group>
                            
                                <Form.Group controlId="customerTypeDesc">
                                    <Form.Label className="block-level">Description</Form.Label>
                                    <Form.Control 
                                        name="custTypeDesc" 
                                        onChange={handleChange}
                                        value={values.custTypeDesc}
                                        className={errors.custTypeDesc && touched.custTypeDesc ? "is-invalid": null}
                                        as="textarea" rows="3" />
                                    {errors.custTypeDesc && touched.custTypeDesc ? (
                                        <span className="invalid-feedback">{errors.custTypeDesc}</span>
                                    ) : null}   
                                </Form.Group>
                                <div className="footer-with-cta toleft">
                                    <Button variant="secondary" className="grayed-out" onClick={this.handleCloseEdit}>Cancel</Button>
                                    <Button 
                                        type="submit" 
                                        disabled={adminUpdateCustomerTypeRequest.is_request_processing}>
                                        {adminUpdateCustomerTypeRequest.is_request_processing?"Please wait...": "Save Changes"}
                                    </Button>
                                </div>
                            </Form>
                            )}
                        </Formik>
                        
                        {/* {adminUpdateCustomerTypeRequest.request_status === administrationConstants.UPDATE_CUSTOMERTYPE_SUCCESS && 
                            <Alert variant="success">
                            {adminUpdateCustomerTypeRequest.request_data.response.data.message}
                            </Alert>
                        } */}
                        {adminUpdateCustomerTypeRequest.request_status === administrationConstants.UPDATE_CUSTOMERTYPE_FAILURE && 
                            <Alert variant="danger">
                            {adminUpdateCustomerTypeRequest.request_data.error}
                            </Alert>
                        }
                    </Modal.Body>
                </Modal>
            )
        }
    }

    customerTypePopUp = () =>{
       
        const {show} = this.state;
        let adminCreateCustomerTypeRequest = this.props.adminCreateCustomerType;
        let allCustomerTypesData = (this.props.adminGetCustomerTypes.request_data!==undefined && this.props.adminGetCustomerTypes.request_data.response!==undefined)
                                        ? this.props.adminGetCustomerTypes.request_data.response.data :null;
        return(
            <Modal show={show} onHide={this.handleClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>Add Customer Type</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Formik
                        initialValues={{
                            custTypeName: '',
                            custTypeId: '',
                            custTypeDesc: '',
                        }}
                        validationSchema={this.validationSchema}
                        onSubmit={ (values, { resetForm}) => {
                            // same shape as initial values
                            let custTypepayload ={
                                key:values.custTypeId,
                                name:values.custTypeName,
                                description: values.custTypeDesc
                            }
                           


                            this.handleCreateNewType(custTypepayload)
                                .then(
                                    ()=>{
                                        // resetForm();
                                        // this.handleClose();
                                        // this.getCustomerTypes(allCustomerTypesData);
                                        // setTimeout(() => {
                                        //     this.getCustomerTypes();
                                            
                                        // }, 2000);


                                        if(this.props.adminCreateCustomerType.request_status === administrationConstants.CREATE_CUSTOMERTYPE_SUCCESS){
                                            resetForm();
                                            this.handleClose();
                                            setTimeout(() => {
                                                this.getCustomerTypes(allCustomerTypesData);
                                                
                                                this.props.dispatch(administrationActions.addCustomerType("CLEAR"))
                                                
                                            }, 2000);
                                             
                                        }else{
                                            setTimeout(() => {
                                                this.props.dispatch(administrationActions.addCustomerType("CLEAR"))
                                            }, 2000);
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
                        // <Form>
                        <Form noValidate className="newtype-form" 
                                 onSubmit={handleSubmit}>
                            <Form.Group controlId="customerTypeName">
                                <Form.Label className="block-level">Name</Form.Label>
                                <Form.Control  
                                    name="custTypeName" 
                                    onChange={handleChange}
                                    value={values.custTypeName}
                                    className={errors.custTypeName && touched.custTypeName ? "is-invalid": null}
                                    type="text" required />
                                {errors.custTypeName && touched.custTypeName ? (
                                    <span className="invalid-feedback">{errors.custTypeName}</span>
                                ) : null}
                                
                            </Form.Group>
                            <Form.Group controlId="customerTypeId">
                                <Form.Label className="block-level">Key</Form.Label>
                                <Form.Control 
                                     name="custTypeId" 
                                     onChange={handleChange}
                                     value={values.custTypeId}
                                     className={errors.custTypeId && touched.custTypeId ? "is-invalid": null}
                                     type="text" required />
                                {/* <Form.Control.Feedback type="invalid"> */}
                                {errors.custTypeId && touched.custTypeId ? (
                                    <span className="invalid-feedback">{errors.custTypeId}</span>
                                ) : null}      
                                {/* </Form.Control.Feedback> */}
                            </Form.Group>
                           
                            <Form.Group controlId="customerTypeDesc">
                                <Form.Label className="block-level">Description</Form.Label>
                                <Form.Control 
                                    name="custTypeDesc" 
                                    onChange={handleChange}
                                    value={values.custTypeDesc}
                                    className={errors.custTypeDesc && touched.custTypeDesc ? "is-invalid": null}
                                    as="textarea" rows="3" />
                                {errors.custTypeDesc && touched.custTypeDesc ? (
                                    <span className="invalid-feedback">{errors.custTypeDesc}</span>
                                ) : null}   
                            </Form.Group>
                            <div className="footer-with-cta toleft">
                                <Button variant="secondary" className="grayed-out" onClick={this.handleClose}>Cancel</Button>
                                <Button 
                                    type="submit" 
                                    disabled={adminCreateCustomerTypeRequest.is_request_processing}>
                                       {adminCreateCustomerTypeRequest.is_request_processing?"Please wait...": "Save Changes"}
                                </Button>
                            </div>
                        </Form>
                        )}
                    </Formik>
                    
                    {/* {adminCreateCustomerTypeRequest.request_status === administrationConstants.CREATE_CUSTOMERTYPE_SUCCESS && 
                        <Alert variant="success">
                           {adminCreateCustomerTypeRequest.request_data.response.data.message}
                        </Alert>
                    } */}
                    {adminCreateCustomerTypeRequest.request_status === administrationConstants.CREATE_CUSTOMERTYPE_FAILURE && 
                        <Alert variant="danger">
                          {adminCreateCustomerTypeRequest.request_data.error}
                        </Alert>
                    }
                </Modal.Body>
            </Modal>
        )
    }

    render() {
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    {this.customerTypePopUp()}
                    {
                        this.props.adminGetCustomerTypes.request_status ===administrationConstants.GET_CUSTOMERTYPES_SUCCESS
                        && this.editCustomerType()
                    }
                    <div className="content-wrapper">
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Administration</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <AdminNav />
                                    <div className="lowerlevel-menu">
                                        <ul className="nav">
                                            <li>
                                                {/* <NavLink to={'/administration-generalorganization'}>Organization</NavLink> */}
                                                <NavLink exact to={'/administration/general'}>Organization</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/currency'}>Currency</NavLink>
                                                {/* <NavLink to={'/administration/administration-generalcurrency'}>Currency</NavLink> */}
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/txt-channels'}>Transaction Channels</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/customer-types'}>Customer Types</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/control'}>Internal Control</NavLink>
                                            </li>
                                            {/* <li>
                                                <NavLink to={'/administration/general/branding'}>Branding</NavLink>
                                            </li> */}
                                        </ul>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                
                                                {this.renderAllCustomerTypes()}
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
        adminCreateCustomerType : state.administrationReducers.adminCreateCustomerTypeReducer,
        adminGetCustomerTypes : state.administrationReducers.adminGetCustomerTypesReducer,
        adminUpdateCustomerType : state.administrationReducers.adminUpdateCustomerTypeReducer,
    };
}

export default  connect(mapStateToProps)(GeneralCustomerTypes);