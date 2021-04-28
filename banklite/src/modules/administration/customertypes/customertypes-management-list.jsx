import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import AdminNav from '../_menu'
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import  InnerPageContainer from '../../../shared/templates/authed-pagecontainer'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Formik } from 'formik';
import * as Yup from 'yup';
import  TableComponent from '../../../shared/elements/table'
import  TablePagination from '../../../shared/elements/table/pagination'
import {customerTypeActions,customerTypeConstants} from '../../../redux/actions/administration/customer-types-management.actions';
import Alert from 'react-bootstrap/Alert'

import GeneralNav from '../menus/_general-menu'
import "../administration.scss"; 
import { setTimeout } from "timers";
class CustomerTypesAdministration extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            show:false,
            showEdit: false,
            FullDetails: false,
            PageSize: 25,
            CurrentPage:1
        }
        
    }


    componentDidMount(){
        this.retrieveFromApi();
    }

  
    setPagesize = (event, tempData)=>{
        const {dispatch} = this.props;
       
        this.setState({PageSize: event.target.value});
        this.retrieveFromApi(tempData);
      
    }

    retrieveFromApi = (tempData)=>{

        const {dispatch} = this.props;        
        let  {PageSize,FullDetails, CurrentPage} = this.state;
        let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentPage}`;
        
        if(tempData){
            dispatch(customerTypeActions.getCustomerTypes(params, tempData));
        }else{
            dispatch(customerTypeActions.getCustomerTypes(params));
        }
        
    }
    loadNextPage = (nextPage, tempData)=>{
        //next Page and tempData are properties of the TablePagination
        const {dispatch} = this.props;
        
        this.setState({CurrentPage: nextPage});
        this.retrieveFromApi(tempData);
       
    }



    setShowDetails = (event,tempData)=>{
        const {dispatch} = this.props;
        // console.log('----here', PageSize.target.value);
        let showDetails = event.target.checked = this.state;
        this.setState({FullDetails: showDetails});
           this.retrieveFromApi(tempData);

    }

    
    retrieveFromApi = (tempData)=>{

        const {dispatch} = this.props;        
        let  {PageSize,FullDetails, CurrentPage} = this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
        
        if(tempData){
            dispatch(customerTypeActions.getCustomerTypes(params, tempData));
        }else{
            dispatch(customerTypeActions.getCustomerTypes(params));
        }
        
    }




    
fetchForEmptyState=()=>{
    //This function returns the biew for empty list                                                                                                                                   
    let adminGetCustomerTypesRequest = this.props.adminGetCustomerTypes;

    console.log('test_user_card: '+adminGetCustomerTypesRequest.request_status);
    
    switch (adminGetCustomerTypesRequest.request_status){
        case (customerTypeConstants.GET_CUSTOMERTYPES_PENDING):
            
    return (<tbody><tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr></tbody>);
    default: return null;
    }
}

fetchErrorState(){
    let adminGetCustomerTypesRequest = this.props.adminGetCustomerTypes;

    
    console.log('test_user_card: '+adminGetCustomerTypesRequest.request_status);

    switch(adminGetCustomerTypesRequest.request_status){
        case (customerTypeConstants.GET_CUSTOMERTYPES_FAILURE):
            return (
                <div className="loading-content errormsg"> 
                    <div>{adminGetCustomerTypesRequest.request_data.error}</div>
                </div>
            );
            default: return null;

    };
    
}


    fetchForBusyState(){
        
        let adminGetCustomerTypesRequest = this.props.adminGetCustomerTypes;

        switch (adminGetCustomerTypesRequest.request_status){
            case (customerTypeConstants.GET_CUSTOMERTYPES_PENDING):

                return (  <div className="loading-content">
                     <div className="loading-text">Please wait...</div></div>);
        default: return null;
        }
    }


    

    fetchForDataState=()=> {
        let adminGetCustomerTypesRequest = this.props.adminGetCustomerTypes;

        switch(adminGetCustomerTypesRequest.request_status){
        case(customerTypeConstants.GET_CUSTOMERTYPES_SUCCESS):
                       
         let saveRequestData= adminGetCustomerTypesRequest.request_data!==undefined? adminGetCustomerTypesRequest.request_data.response.data:null;

            return (<tbody>{
                saveRequestData.result.map((eachCustomerype, index)=>{
                    return(
                        <Fragment key={index}><tr>
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
                            </tr></Fragment>
                    )
                })
            }</tbody>);
      
        default: return null;
    }
        }
    fetchPageList() {
        
        let adminGetCustomerTypesRequest = this.props.adminGetCustomerTypes;


        let responseData = adminGetCustomerTypesRequest.request_data?.response?.data;

        return(
        <div>
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
                        onChange={(e)=>this.setPagesize(e, responseData?.result)}
                        value={this.state.PageSize}
                        className="countdropdown form-control form-control-sm">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="200">200</option>
                    </select>
                    <TablePagination
                            totalPages={responseData?.totalPages??0}
                            currPage={responseData?.currentPage??0}
                            currRecordsCount={responseData?.result.length??0}
                            totalRows={responseData?.totalRows??0}
                            tempData={responseData?.result??0}
                            pagesCountToshow={4}
                            refreshFunc={this.loadNextPage}
                        />
                </div>
            </div>
            <div className="table-helper mb-10">
                <input type="checkbox" name="" 
                     onChange={(e)=>this.setShowDetails(e, responseData.result)}
                   
                    checked={this.state.FullDetails}
                    id="showFullDetails" />
                <label htmlFor="showFullDetails">Show full details</label>
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
              {this.fetchForEmptyState()}  
              {this.fetchErrorState()}
              {this.fetchForDataState()}
            </TableComponent>
            {this.fetchForBusyState()}
            
            <div className="footer-with-cta toleft">
            <Button onClick={this.handleShow}>Add Type</Button>
            </div>
        </div>
    );
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


    handleClose = () => this.setState({show:false});
    
    handleShow = () => this.setState({show:true});

    handleCloseEdit = () => this.setState({showEdit:false});
    
    handleShowEdit = (selectedCustTypeId) => this.setState({showEdit:true, selectedCustTypeId});

    

    handleCreateNewType = async (typePayload) =>{
        
        const {dispatch} = this.props;       
        await dispatch(customerTypeActions.addCustomerType(typePayload));


        
    }

    handleUpdateType = async (typePayload) =>{
        
        const {dispatch} = this.props;
       
        await dispatch(customerTypeActions.updateCustomerType(typePayload));

        
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
                                            
                                            if(this.props.adminUpdateCustomerType.request_status === customerTypeConstants.UPDATE_CUSTOMERTYPE_SUCCESS){
                                                this.handleCloseEdit();
                                                // this.getCustomerTypes(allCustomerTypesData);
                                                let {PageSize, CurrentPage}= this.state;
                                                let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
                                                setTimeout(() => {
                                                    this.getCustomerTypes(params,allCustomerTypesData);
                                                    
                                                    this.props.dispatch(customerTypeActions.updateCustomerType("CLEAR"))
                                                    
                                                }, 2000);
                                                 
                                            }else{
                                                setTimeout(() => {
                                                    this.props.dispatch(customerTypeActions.updateCustomerType("CLEAR"))
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
                        
                        {/* {adminUpdateCustomerTypeRequest.request_status === customerTypeConstants.UPDATE_CUSTOMERTYPE_SUCCESS && 
                            <Alert variant="success">
                            {adminUpdateCustomerTypeRequest.request_data.response.data.message}
                            </Alert>
                        } */}
                        {adminUpdateCustomerTypeRequest.request_status === customerTypeConstants.UPDATE_CUSTOMERTYPE_FAILURE && 
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


                                        if(this.props.adminCreateCustomerType.request_status === customerTypeConstants.CREATE_CUSTOMERTYPE_SUCCESS){
                                            resetForm();
                                            this.handleClose();
                                            setTimeout(() => {
                                                let {PageSize, CurrentPage}= this.state;
                                                let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
                                                this.getCustomerTypes(params,allCustomerTypesData);
                                                
                                                this.props.dispatch(customerTypeActions.addCustomerType("CLEAR"))
                                                
                                            }, 2000);
                                             
                                        }else{
                                            setTimeout(() => {
                                                this.props.dispatch(customerTypeActions.addCustomerType("CLEAR"))
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
                    
                    {/* {adminCreateCustomerTypeRequest.request_status === customerTypeConstants.CREATE_CUSTOMERTYPE_SUCCESS && 
                        <Alert variant="success">
                           {adminCreateCustomerTypeRequest.request_data.response.data.message}
                        </Alert>
                    } */}
                    {adminCreateCustomerTypeRequest.request_status === customerTypeConstants.CREATE_CUSTOMERTYPE_FAILURE && 
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
                        this.props.adminGetCustomerTypes.request_status ===customerTypeConstants.GET_CUSTOMERTYPES_SUCCESS
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
                                    <GeneralNav />
                            
                                    
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                
                                                {this.fetchPageList()}
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

export default  connect(mapStateToProps)(CustomerTypesAdministration);