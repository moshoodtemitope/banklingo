import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

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
            // customerTypeName: '',
            // customerTypeDesc:'',
            // customerTypeId:'',
            // custTypepayload:''
        }

        

        
    }

    validationSchema = Yup.object().shape({
        custTypeName: Yup.string()
          .min(2, 'Min of two characters')
          .max(30, 'Max Limit reached')
          .required('Please provide name'),
        custTypeId: Yup.string()
          .max(6, 'Max Limit reached')
          .required('Id is required'),
        custTypeDesc: Yup.string()
          .min(2, 'Please provide detailed information')
          .required('Description is required')
    });

    handleClose = () => this.setState({show:false});
    
    handleShow = () => this.setState({show:true});

    

    handleCreateNewType = async (typePayload) =>{
        
        const {dispatch} = this.props;
       
        await dispatch(administrationActions.addCustomerType(typePayload));

        
    }

    


    customerTypePopUp = () =>{
       
        const {show} = this.state;
        let adminCreateCustomerTypeRequest = this.props.adminCreateCustomerType;
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
                                        resetForm();
                                        // console.log('response is', adminCreateCustomerTypeRequest)
                                        setTimeout(() => {
                                            this.props.dispatch(administrationActions.addCustomerType("CLEAR"))
                                        }, 3000);
                                        
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
                                <Form.Label className="block-level">Id</Form.Label>
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
                    
                    {adminCreateCustomerTypeRequest.request_status === administrationConstants.CREATE_CUSTOMERTYPE_SUCCESS && 
                        <Alert variant="success">
                           {adminCreateCustomerTypeRequest.request_data.response.data.message}
                        </Alert>
                    }
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
                                    <ul className="nav">
                                        <li>
                                            {/* <NavLink to={'/administration-generalorganization'}>General</NavLink> */}
                                            <NavLink to={'/administration/general'}>General</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/organization'}>Organization</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/access'}>Access</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/products'}>Products</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/sms'}>SMS</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/email'}>Email</NavLink>
                                        </li>
                                    </ul>
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
                                            <li>
                                                <NavLink to={'/administration/general/branding'}>Branding</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                
                                                <div className="heading-with-cta">
                                                    {/* <h3 className="section-title">Journal Entries</h3> */}
                                                    <Form className="one-liner">
                                                        <Form.Group className="sameline-label" controlId="filterDropdown">
                                                            <Form.Label> Type</Form.Label>
                                                            <Form.Control as="select" size="sm">
                                                                <option>Customer</option>
                                                                <option>Group</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                    </Form>
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
                                                        <tr>
                                                            <td>Customer <span className="default-channel">DEFAULT</span> </td>
                                                            <td>29-11-2017</td>
                                                            <td>Admin</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <Dropdown.Item eventKey="1" onClick={this.handleShow}>Edit</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Investment Customer</td>
                                                            <td>29-11-2017</td>
                                                            <td>Bayonle Amzat</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <Dropdown.Item eventKey="1" onClick={this.handleShow}>Edit</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="3">Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>MoneyPal-Nano Customer</td>
                                                            <td>29-11-2017</td>
                                                            <td>Bayonle Amzat</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <Dropdown.Item eventKey="1" onClick={this.handleShow}>Edit</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="3">Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Payrolla Customer</td>
                                                            <td>29-11-2017</td>
                                                            <td>Bayonle Amzat</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <Dropdown.Item eventKey="1" onClick={this.handleShow}>Edit</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="3">Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </TableComponent>
                                                <div className="footer-with-cta toleft">
                                                    <Button variant="secondary" className="grayed-out">Rearrange</Button>
                                                    <Button onClick={this.handleShow}>Add Type</Button>
                                                </div>
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
    };
}

export default  connect(mapStateToProps)(GeneralCustomerTypes);