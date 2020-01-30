import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import AdminNav from './_menu'

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class ProductLoans extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
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
                                                <NavLink exact to={'/administration/products'}>Loans</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/products/deposits'}>Deposits</NavLink>
                                                {/* <NavLink to={'/administration/administration-generalcurrency'}>Currency</NavLink> */}
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
                                                            <th>Product</th>
                                                            <th>ID</th>
                                                            <th>Product Type</th>
                                                            <th>Last Modified</th>
                                                            <th>Active</th>
                                                            {/* <th></th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                        {/* <tr>
                                                            <td>(Discontinued)Payrolla - Private</td>
                                                            <td>payrolla_private</td>
                                                            <td>Fixed Term Loan</td>
                                                            <td>03-12-2018</td>
                                                            <td>Activated</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <NavLink className="dropdown-item" to={'/administration/products/editloan-product'}>Edit</NavLink>
                                                                    <NavLink className="dropdown-item" to={'/administration/products/newloan-product'}>Copy Product</NavLink>
                                                                    <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>(Discontinued)Payrolla - Private</td>
                                                            <td>payrolla_private</td>
                                                            <td>Fixed Term Loan</td>
                                                            <td>03-12-2018</td>
                                                            <td>Activated</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <NavLink className="dropdown-item" to={'/administration/products/editloan-product'}>Edit</NavLink>
                                                                    <NavLink className="dropdown-item" to={'/administration/products/newloan-product'}>Copy Product</NavLink>
                                                                    <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>(Discontinued)Payrolla - Private</td>
                                                            <td>payrolla_private</td>
                                                            <td>Fixed Term Loan</td>
                                                            <td>03-12-2018</td>
                                                            <td>Activated</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <NavLink className="dropdown-item" to={'/administration/products/editloan-product'}>Edit</NavLink>
                                                                    <NavLink className="dropdown-item" to={'/administration/products/newloan-product'}>Copy Product</NavLink>
                                                                    <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr> */}
                                                    </tbody>
                                                </TableComponent>
                                                {/* <div className="footer-with-cta toleft">
                                                    <NavLink to={'/administration/products/newloan-product'} className="btn btn-primary">New Loan Product</NavLink>
                                                    
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

export default ProductLoans;