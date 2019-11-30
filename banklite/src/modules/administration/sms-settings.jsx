import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class SMSSettings extends React.Component {
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
                                                <NavLink exact to={'/administration/sms'}>Settings</NavLink>
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
                                                <Form className="form-content w-40 card">
                                                    <Form.Group controlId="sms-gateway">
                                                        <Form.Label className="block-level">SMS Gateway</Form.Label>
                                                        <Form.Control as="select" size="sm">
                                                            <option>None</option>
                                                            <option selected>Twilio</option>
                                                            <option value="">Infobip</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                    {/* display when other than none is picked */}
                                                    <Form.Group controlId="acct-name">
                                                        <Form.Label className="block-level">Account Username</Form.Label>
                                                        <Form.Control type="text" />
                                                    </Form.Group>
                                                    <Form.Group controlId="acct-password">
                                                        <Form.Label className="block-level">Account Password</Form.Label>
                                                        <Form.Control type="password" />
                                                    </Form.Group>
                                                    <Form.Group controlId="acct-password">
                                                        <Form.Label className="block-level">Phone Number</Form.Label>
                                                        <Form.Control type="text" />
                                                    </Form.Group>
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

export default SMSSettings;