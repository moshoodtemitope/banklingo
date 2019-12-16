import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class GeneralCustomerTypes extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            show:false,
            customerTypeName: '',
            customerTypeDesc:'',
            customerTypeId:''
        }

        
    }

    handleClose = () => this.setState({show:false});
    
    handleShow = () => this.setState({show:true});

    customerTypePopUp = () =>{
       
        const {show} = this.state;
        return(
            <Modal show={show} onHide={this.handleClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>Add Customer Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="customerTypeName">
                            <Form.Label className="block-level">Name</Form.Label>
                            <Form.Control type="text" onChan />
                        </Form.Group>
                        <Form.Group controlId="customerTypeId">
                            <Form.Label className="block-level">Id</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                        {/* <Form.Label className="block-level">Usage</Form.Label>
                            <div className="checkbox-wrap">
                                <input type="checkbox" name="" id="pick-1" />
                                <label htmlFor="pick-1">Allow opening accounts</label>
                            </div>
                            <div className="checkbox-wrap">
                                <input type="checkbox" name="" id="pick-2" />
                                <label htmlFor="pick-2">Allow as guarantor</label>
                            </div>
                            <div className="checkbox-wrap">
                                <input type="checkbox" name="" id="pick-3" />
                                <label htmlFor="pick-3">Require identification documents</label>
                            </div>
                            <div className="checkbox-wrap">
                                <input type="checkbox" name="" id="pick-3" />
                                <label htmlFor="pick-3">Show default address fields</label>
                            </div> */}
                        <Form.Group controlId="customerTypeDesc">
                            <Form.Label className="block-level">Description</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                        <div className="footer-with-cta toleft">
                            <Button variant="secondary" className="grayed-out" onClick={this.handleClose}>Cancel</Button>
                            <Button>Save Changes</Button>
                        </div>
                    </Form>
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

export default GeneralCustomerTypes;