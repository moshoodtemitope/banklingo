import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
// import Col from 'react-bootstrap/Col'
// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class GeneralInternalControl extends React.Component {
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
                                                <Form className="form-content w-60 card">
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Group controlId="institutionName">
                                                                <Form.Label className="block-level">Maximum Exposure To A Customer</Form.Label>
                                                                <Form.Control as="select" size="sm">
                                                                    <option>Sum Of All Loans</option>
                                                                    <option>Sum Of All Loans Minus Deposits Balance</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group controlId="institutionName">
                                                                <Form.Label className="block-level">Customers Can Receive Multiple Loans</Form.Label>
                                                                <Form.Control as="select" size="sm">
                                                                    <option>Yes, Unlimited Number Of Active Loans</option>
                                                                    <option>No, Only One Active Loan Per Customer</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Group controlId="customerGroup">
                                                                <Form.Label className="block-level">Customers May Be In More Than One Group</Form.Label>
                                                                <Form.Control as="select" size="sm">
                                                                    <option>Yes</option>
                                                                    <option>No</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>

                                                        <Col>
                                                            <Form.Group controlId="customerAssignment">
                                                                <Form.Label className="block-level">Customer and Group Required Assignments</Form.Label>
                                                                <div className="each-settingitem">
                                                                    <input type="checkbox" name="" id="checkbranch"/>
                                                                    <label htmlFor="checkbranch">Branch</label>
                                                                </div>
                                                                <div className="each-settingitem">
                                                                    <input type="checkbox" name="" id="checkcenter"/>
                                                                    <label htmlFor="checkcenter">Centre</label>
                                                                </div>
                                                                <div className="each-settingitem">
                                                                    <input type="checkbox" name="" id="check-acct-officer"/>
                                                                    <label htmlFor="check-acct-officer">Account Officer</label>
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Group controlId="duplicatecustomer-check">
                                                                <Form.Label className="block-level">Duplicate Customer Checks</Form.Label>
                                                                <Form.Control as="select" size="sm">
                                                                    <option>None</option>
                                                                    <option>Warning</option>
                                                                    <option>Error</option>
                                                                </Form.Control>
                                                                <div className="each-settingitem">
                                                                    <input type="checkbox" name="" id="check-doc-id"/>
                                                                    <label htmlFor="check-doc-id">Document ID and Type</label>
                                                                </div>
                                                                <div className="each-settingitem">
                                                                    <input type="checkbox" name="" id="check-homephone"/>
                                                                    <label htmlFor="check-homephone">Home Phone</label>
                                                                </div>
                                                                <div className="each-settingitem">
                                                                    <input type="checkbox" name="" id="check-mobilephone"/>
                                                                    <label htmlFor="check-mobilephone">Mobile Phone</label>
                                                                </div>
                                                                <div className="each-settingitem">
                                                                    <input type="checkbox" name="" id="check-email"/>
                                                                    <label htmlFor="check-email">Email</label>
                                                                </div>
                                                                <div className="each-settingitem">
                                                                    <input type="checkbox" name="" id="check-fname-lname"/>
                                                                    <label htmlFor="check-fname-lname">First Names and Last Name</label>
                                                                </div>
                                                                <div className="each-settingitem">
                                                                    <input type="checkbox" name="" id="check-lname-dob"/>
                                                                    <label htmlFor="check-lname-dob">Last Name and Birth Date</label>
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group controlId="minimum-days">
                                                                <Form.Label className="block-level">Minimum Days In Arrears Before Write-Off</Form.Label>
                                                                <Form.Control type="text" size="sm" value="0" />
                                                            </Form.Group>
                                                            <Form.Group controlId="maximum-days">
                                                                <Form.Label className="block-level">Maximum Days Before Undo Close Loans</Form.Label>
                                                                <Form.Control type="text" size="sm" value="200" />
                                                            </Form.Group>
                                                        </Col>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Group controlId="group-limit">
                                                                <Form.Label className="block-level">Group Size Limit Type</Form.Label>
                                                                <Form.Control as="select" size="sm">
                                                                    <option>Hard</option>
                                                                    <option>Warning</option>
                                                                    <option>None</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                            <Form.Group controlId="customer-state">
                                                                <Form.Label className="block-level">New Customer Initial State</Form.Label>
                                                                <Form.Control as="select" size="sm">
                                                                    <option>Pending Approval</option>
                                                                    <option>Inactive</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col>
                                                            <Form.Group controlId="credit-arrangement">
                                                                <Form.Label className="block-level">New Credit Arrangement Initial State</Form.Label>
                                                                <Form.Control as="select" size="sm">
                                                                    <option>Pending Approval</option>
                                                                    <option>Approved</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                            <Form.Group controlId="twoman-rules">
                                                                <Form.Label className="block-level">Two-Man Rules</Form.Label>
                                                                <div className="each-settingitem">
                                                                    <input type="checkbox" name="" id="check-separate"/>
                                                                    <label htmlFor="check-separate">Required separate users for approvals and disbursals</label>
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        
                                                    </Form.Row>
                                                    <div className="form-ctas horizontal">
                                                        <Button variant="success" className="mr-20px" type="submit"> Save Changes</Button>
                                                        <Button variant="light" type="button"> Cancel</Button>
                                                    </div>


                                                </Form>
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

export default GeneralInternalControl;