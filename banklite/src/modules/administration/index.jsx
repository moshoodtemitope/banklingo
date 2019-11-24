import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class AdminManagement extends React.Component {
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
                                            <NavLink to={'/administration'}>General</NavLink>
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
                                                <NavLink to={'/administration'}>Organization</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/currency'}>Currency</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/txt-channels'}>Transaction Channels</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/customer-types'}>Customer Types</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/control'}>Internal Control</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/branding'}>Branding</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <div className="row">
                                        <div className="col-sm-3">
                                            <SidebarElement>
                                                <ul>
                                                    <li>
                                                        <NavLink to={'/administration/general'}>General</NavLink>
                                                        <ul>
                                                            <li>
                                                                <NavLink to={'/administration/general/organization'}>Organization</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/administration/general/currency'}>Currency</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/administration/general/channels'}>Transaction Channels</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/administration/general/customer-types'}>Customer Types</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/administration/general/internal-control'}>Internal Control</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/administration/general/branding'}>Branding</NavLink>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/administration/organization'}>Organization</NavLink>
                                                        <ul>
                                                            <li>
                                                                <NavLink to={'/administration/organization/branches'}>Branches</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/administration/organization/centers'}>Centers</NavLink>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/administration/access'}>Access</NavLink>
                                                        <ul>
                                                            <li>
                                                                <NavLink to={'/administration/access/roles'}>Roles</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/administration/access/users'}>Users</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/administration/access/preferences'}>Preferences</NavLink>
                                                            </li>
                                                        </ul>
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
                                            </SidebarElement>
                                        </div>
                                    </div> */}
                                    <Form className="form-content w-40 card">
                                        <Form.Group controlId="institutionName">
                                            <Form.Label className="block-level">Institution Name</Form.Label>
                                            <Form.Control type="text"  />
                                        </Form.Group>
                                        <Form.Group controlId="streetAddress">
                                            <Form.Label className="block-level">Street Address - Line 1</Form.Label>
                                            <Form.Control type="text"  />
                                        </Form.Group>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Input Field</Form.Label>
                                                <Form.Control type="text"  />
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">Input Field</Form.Label>
                                                <Form.Control type="text"  />
                                            </Col>
                                        </Form.Row>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Input Field</Form.Label>
                                                <Form.Control type="text"  />
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">Input Field</Form.Label>
                                                <Form.Control type="text"  />
                                            </Col>
                                        </Form.Row>
                                            <div className="form-ctas horizontal">
                                                <Button variant="success" className="mr-20px" type="submit"> Save Changes</Button>
                                                <Button variant="light" type="button"> Cancel</Button>
                                            </div>
                                            
                                        <Form.Row>
                                            <Col>
                                                
                                            </Col>
                                            <Col>
                                                
                                            </Col>
                                        </Form.Row>

                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </InnerPageContainer>
            </Fragment>
        );
    }
}

export default AdminManagement;