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
class AccessPreferences extends React.Component {
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
                                                <NavLink exact to={'/administration/access'}>Roles</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/access/users'}>Users</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/access/preferences'}>Preferences</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/access/authentication'}>Federated Authentication</NavLink>
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
                                                            <Form.Label className="block-level">Timeout Session </Form.Label>
                                                            <Form.Control type="text" value="60" /> 
                                                            <span className="hinttext">minutes</span>
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">Min Password Length</Form.Label>
                                                            <Form.Control type="text"  value="8"/>
                                                            <span className="hinttext">characters</span>
                                                        </Col>
                                                        
                                                    </Form.Row>
                                                    
                                                    <div className="table-helper">
                                                        <input type="checkbox" name="" id="showAutoLock" checked/>
                                                        <label htmlFor="showAutoLock">Lock User After Failed Logins</label>
                                                    </div>
                                                    <Form.Row>
                                                        <Col className="one-liner login-attempts">
                                                            <Form.Control type="text"  />
                                                            <span className="hinttext"> failed login attempts </span>
                                                            <Form.Control type="text"  />
                                                            <span className="hinttext">minutes</span>
                                                        </Col>
                                                        {/* <Col>
                                                            
                                                        </Col> */}
                                                    </Form.Row>
                                                    
                                                    <Form.Row>
                                                        <Col className="checked-wrap">
                                                            <Form.Label className="block-level">IP Access Restrictions</Form.Label>
                                                            <input type="checkbox" name="" id="showIpRestriction" checked/>
                                                            <label htmlFor="showIpRestriction">Restrict User Access by IP Address</label>
                                                        </Col>
                                                        <Col className="checked-wrap">
                                                            <Form.Label className="block-level">Critical Actions Re-Authentication</Form.Label>
                                                            <input type="checkbox" name="" id="showReAuth" checked/>
                                                            <label htmlFor="showReAuth">Require Admin Password</label>
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

export default AccessPreferences;