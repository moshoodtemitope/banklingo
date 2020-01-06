import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'
// import Select from 'react-select';
import Form from 'react-bootstrap/Form'
// import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import "./administration.scss"; 
class CreateNewUser extends React.Component {
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
                        <div className="module-content">
                            <div className="content-container">
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="middle-content">
                                            <div className="full-pageforms w-60">
                                                <Form className="form-content card">
                                                    <div className="form-heading">
                                                        <h3>Creating A New User</h3>
                                                    </div>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">First Names</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">Last Name</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Title</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">Role</Form.Label>
                                                            <Form.Control as="select" size="sm">
                                                                <option value="8a858eb960648f00016069e9f407190f">Audit</option>
                                                                <option value="8a858eb960648f00016069e9f407190d">Branch Advisor</option>
                                                                <option value="8a858fbc6734dfbb01673568db9c2370">Chief Financial Officer</option>
                                                                <option value="8a858f3d61cecfc20161d13916447d04">Chief Operating Officer</option>
                                                                <option value="8a858eb960648f0001606a0bcdf3352d">Collections and Recovery</option>
                                                                <option value="8a858eb960648f0001606a0bcdf3352f">Contact Center</option>
                                                            </Form.Control>
                                                        </Col>
                                                    </Form.Row>
                                                    
                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            User Rights
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <Form.Row>
                                                                    
                                                                    <Col>
                                                                        <Form.Label>Type</Form.Label>
                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-1" disabled />
                                                                            <label htmlFor="pick-1">Administrator</label>
                                                                        </div>
                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-20"  />
                                                                            <label htmlFor="pick-20">Teller</label>
                                                                        </div>
                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-4" />
                                                                            <label htmlFor="pick-4">Account Officer</label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col>
                                                                    <Form.Label>Access Rights</Form.Label>
                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-13" disabled />
                                                                            <label htmlFor="pick-13">Mambu</label>
                                                                        </div>
                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-25"  />
                                                                            <label htmlFor="pick-25">API</label>
                                                                        </div>
                                                                    </Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion  >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Permissions
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <div className="searchbox-wrap">
                                                                    <Form.Control type="text" size="sm" placeholder="search permissions" />
                                                                </div>

                                                                <div className="each-permissiongroup">
                                                                    <Accordion>
                                                                        <Accordion.Toggle variant="link"  as={Button} eventKey="2">
                                                                            <span className="permissiondrop">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" srcSet=""/>
                                                                            </span>
                                                                        </Accordion.Toggle>
                                                                        <input type="checkbox" name="" id="pick-292"  />
                                                                        <label htmlFor="pick-1">General</label>
                                                                        <Accordion.Collapse eventKey="2">
                                                                            <div className="inner-permissions">
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-1" disabled />
                                                                                    <label htmlFor="pick-1">Audit Transactions</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Create Index Rate</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-4" />
                                                                                    <label htmlFor="pick-4">View Comments</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-41" />
                                                                                    <label htmlFor="pick-41">Create Comments</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-41" />
                                                                                    <label htmlFor="pick-41">Edit Comments</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-41" />
                                                                                    <label htmlFor="pick-41">Download Backups</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-41" />
                                                                                    <label htmlFor="pick-41">Import Data</label>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Collapse>
                                                                    </Accordion>
                                                                </div>

                                                                <div className="each-permissiongroup">
                                                                    <Accordion>
                                                                        <Accordion.Toggle variant="link"  as={Button} eventKey="2">
                                                                            <span className="permissiondrop">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" srcSet=""/>
                                                                            </span>
                                                                        </Accordion.Toggle>
                                                                        <input type="checkbox" name="" id="pick-292"  />
                                                                        <label htmlFor="pick-1">Administration</label>
                                                                        <Accordion.Collapse eventKey="2">
                                                                            <div className="inner-permissions">
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-1" disabled />
                                                                                    <label htmlFor="pick-1">Audit Transactions</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Create Index Rate</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-4" />
                                                                                    <label htmlFor="pick-4">View Comments</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-41" />
                                                                                    <label htmlFor="pick-41">Create Comments</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-41" />
                                                                                    <label htmlFor="pick-41">Edit Comments</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-41" />
                                                                                    <label htmlFor="pick-41">Download Backups</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-41" />
                                                                                    <label htmlFor="pick-41">Import Data</label>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Collapse>
                                                                    </Accordion>
                                                                </div>

                                                                <div className="each-permissiongroup">
                                                                    <Accordion>
                                                                        <Accordion.Toggle variant="link"  as={Button} eventKey="2">
                                                                            <span className="permissiondrop">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" srcSet=""/>
                                                                            </span>
                                                                        </Accordion.Toggle>
                                                                        <input type="checkbox" name="" id="pick-292"  />
                                                                        <label htmlFor="pick-1">Communications</label>
                                                                        <Accordion.Collapse eventKey="2">
                                                                            <div className="inner-permissions">
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-1" disabled />
                                                                                    <label htmlFor="pick-1">Resend Failed Messages</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">View Communication History</label>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Collapse>
                                                                    </Accordion>
                                                                </div>


                                                                <div className="each-permissiongroup">
                                                                    <Accordion>
                                                                        <Accordion.Toggle variant="link"  as={Button} eventKey="2">
                                                                            <span className="permissiondrop">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" srcSet=""/>
                                                                            </span>
                                                                        </Accordion.Toggle>
                                                                        <input type="checkbox" name="" id="pick-292"  />
                                                                        <label htmlFor="pick-1">Customers</label>
                                                                        <Accordion.Collapse eventKey="2">
                                                                            <div className="inner-permissions">
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-1" disabled />
                                                                                    <label htmlFor="pick-1">View Customer Details</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Create Customers</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Edit Customers</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Delete Customers</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Change Customer Type</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Approve Customers</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Reject Customers</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Exit Customers</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Blacklist Customers</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Undo Customer State Changed</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Anonymize Client Data</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Manage Customer Association</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">	Edit Customer Id</label>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Collapse>
                                                                    </Accordion>
                                                                </div>

                                                                <div className="each-permissiongroup">
                                                                    <Accordion>
                                                                        <Accordion.Toggle variant="link"  as={Button} eventKey="2">
                                                                            <span className="permissiondrop">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" srcSet=""/>
                                                                            </span>
                                                                        </Accordion.Toggle>
                                                                        <input type="checkbox" name="" id="pick-292"  />
                                                                        <label htmlFor="pick-1">Groups</label>
                                                                        <Accordion.Collapse eventKey="2">
                                                                            <div className="inner-permissions">
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-1" disabled />
                                                                                    <label htmlFor="pick-1">View Group Details</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Create Groups</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Edit Groups</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Change Group Type</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Manage Group Association</label>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Collapse>
                                                                    </Accordion>
                                                                </div>
                                                                <div className="each-permissiongroup">
                                                                    <Accordion>
                                                                        <Accordion.Toggle variant="link"  as={Button} eventKey="2">
                                                                            <span className="permissiondrop">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" srcSet=""/>
                                                                            </span>
                                                                        </Accordion.Toggle>
                                                                        <input type="checkbox" name="" id="pick-292"  />
                                                                        <label htmlFor="pick-1">Credit Arrangements</label>
                                                                        <Accordion.Collapse eventKey="2">
                                                                            <div className="inner-permissions">
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-1" disabled />
                                                                                    <label htmlFor="pick-1">Create Credit Arrangements</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Edit Credit Arrangements</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">View Credit Arrangements Details</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Add Accounts To Credit Arrangement</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Remove Accounts From Credit Arrangement</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Approve Credit Arrangements</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Undo Approve Credit Arrangements</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Withdraw Credit Arrangements</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Undo Withdraw Credit Arrangements</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Reject Credit Arrangements</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Undo Reject Credit Arrangements</label>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Collapse>
                                                                    </Accordion>
                                                                </div>
                                                                <div className="each-permissiongroup">
                                                                    <Accordion>
                                                                        <Accordion.Toggle variant="link"  as={Button} eventKey="2">
                                                                            <span className="permissiondrop">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" srcSet=""/>
                                                                            </span>
                                                                        </Accordion.Toggle>
                                                                        <input type="checkbox" name="" id="pick-292"  />
                                                                        <label htmlFor="pick-1">Loan Accounts</label>
                                                                        <Accordion.Collapse eventKey="2">
                                                                            <div className="inner-permissions">
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-1" disabled />
                                                                                    <label htmlFor="pick-1">Create Credit Arrangements</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Edit Credit Arrangements</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">View Credit Arrangements Details</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Add Accounts To Credit Arrangement</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Remove Accounts From Credit Arrangement</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Approve Credit Arrangements</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Undo Approve Credit Arrangements</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Withdraw Credit Arrangements</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Undo Withdraw Credit Arrangements</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Reject Credit Arrangements</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Undo Reject Credit Arrangements</label>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Collapse>
                                                                    </Accordion>
                                                                </div>
                                                                <div className="each-permissiongroup">
                                                                    <Accordion>
                                                                        <Accordion.Toggle variant="link"  as={Button} eventKey="2">
                                                                            <span className="permissiondrop">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" srcSet=""/>
                                                                            </span>
                                                                        </Accordion.Toggle>
                                                                        <input type="checkbox" name="" id="pick-292"  />
                                                                        <label htmlFor="pick-1">Deposit Accounts</label>
                                                                        <Accordion.Collapse eventKey="2">
                                                                            <div className="inner-permissions">
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-1" disabled />
                                                                                    <label htmlFor="pick-1">Create Credit Arrangements</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Edit Credit Arrangements</label>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Collapse>
                                                                    </Accordion>
                                                                </div>
                                                                <div className="each-permissiongroup">
                                                                    <Accordion>
                                                                        <Accordion.Toggle variant="link"  as={Button} eventKey="2">
                                                                            <span className="permissiondrop">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" srcSet=""/>
                                                                            </span>
                                                                        </Accordion.Toggle>
                                                                        <input type="checkbox" name="" id="pick-292"  />
                                                                        <label htmlFor="pick-1">Cards</label>
                                                                        <Accordion.Collapse eventKey="2">
                                                                            <div className="inner-permissions">
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-1" disabled />
                                                                                    <label htmlFor="pick-1">Create Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">View Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Delete Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Reverse Card Transactions</label>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Collapse>
                                                                    </Accordion>
                                                                </div>
                                                                <div className="each-permissiongroup">
                                                                    <Accordion>
                                                                        <Accordion.Toggle variant="link"  as={Button} eventKey="2">
                                                                            <span className="permissiondrop">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" srcSet=""/>
                                                                            </span>
                                                                        </Accordion.Toggle>
                                                                        <input type="checkbox" name="" id="pick-292"  />
                                                                        <label htmlFor="pick-1">Authorization Holds</label>
                                                                        <Accordion.Collapse eventKey="2">
                                                                            <div className="inner-permissions">
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-1" disabled />
                                                                                    <label htmlFor="pick-1">Create Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">View Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Delete Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Reverse Card Transactions</label>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Collapse>
                                                                    </Accordion>
                                                                </div>
                                                                <div className="each-permissiongroup">
                                                                    <Accordion>
                                                                        <Accordion.Toggle variant="link"  as={Button} eventKey="2">
                                                                            <span className="permissiondrop">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" srcSet=""/>
                                                                            </span>
                                                                        </Accordion.Toggle>
                                                                        <input type="checkbox" name="" id="pick-292"  />
                                                                        <label htmlFor="pick-1">Documents</label>
                                                                        <Accordion.Collapse eventKey="2">
                                                                            <div className="inner-permissions">
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-1" disabled />
                                                                                    <label htmlFor="pick-1">Create Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">View Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Delete Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Reverse Card Transactions</label>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Collapse>
                                                                    </Accordion>
                                                                </div>
                                                                <div className="each-permissiongroup">
                                                                    <Accordion>
                                                                        <Accordion.Toggle variant="link"  as={Button} eventKey="2">
                                                                            <span className="permissiondrop">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" srcSet=""/>
                                                                            </span>
                                                                        </Accordion.Toggle>
                                                                        <input type="checkbox" name="" id="pick-292"  />
                                                                        <label htmlFor="pick-1">Tasks</label>
                                                                        <Accordion.Collapse eventKey="2">
                                                                            <div className="inner-permissions">
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-1" disabled />
                                                                                    <label htmlFor="pick-1">Create Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">View Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Delete Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Reverse Card Transactions</label>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Collapse>
                                                                    </Accordion>
                                                                </div>
                                                                <div className="each-permissiongroup">
                                                                    <Accordion>
                                                                        <Accordion.Toggle variant="link"  as={Button} eventKey="2">
                                                                            <span className="permissiondrop">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" srcSet=""/>
                                                                            </span>
                                                                        </Accordion.Toggle>
                                                                        <input type="checkbox" name="" id="pick-292"  />
                                                                        <label htmlFor="pick-1">Reporting</label>
                                                                        <Accordion.Collapse eventKey="2">
                                                                            <div className="inner-permissions">
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-1" disabled />
                                                                                    <label htmlFor="pick-1">Create Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">View Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Delete Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Reverse Card Transactions</label>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Collapse>
                                                                    </Accordion>
                                                                </div>
                                                                <div className="each-permissiongroup">
                                                                    <Accordion>
                                                                        <Accordion.Toggle variant="link"  as={Button} eventKey="2">
                                                                            <span className="permissiondrop">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" srcSet=""/>
                                                                            </span>
                                                                        </Accordion.Toggle>
                                                                        <input type="checkbox" name="" id="pick-292"  />
                                                                        <label htmlFor="pick-1">Accounting</label>
                                                                        <Accordion.Collapse eventKey="2">
                                                                            <div className="inner-permissions">
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-1" disabled />
                                                                                    <label htmlFor="pick-1">Create Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">View Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Delete Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Reverse Card Transactions</label>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Collapse>
                                                                    </Accordion>
                                                                </div>
                                                                <div className="each-permissiongroup">
                                                                    <Accordion>
                                                                        <Accordion.Toggle variant="link"  as={Button} eventKey="2">
                                                                            <span className="permissiondrop">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" srcSet=""/>
                                                                            </span>
                                                                        </Accordion.Toggle>
                                                                        <input type="checkbox" name="" id="pick-292"  />
                                                                        <label htmlFor="pick-1">Tellering</label>
                                                                        <Accordion.Collapse eventKey="2">
                                                                            <div className="inner-permissions">
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-1" disabled />
                                                                                    <label htmlFor="pick-1">Create Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">View Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Delete Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Reverse Card Transactions</label>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Collapse>
                                                                    </Accordion>
                                                                </div>
                                                                <div className="each-permissiongroup">
                                                                    <Accordion>
                                                                        <Accordion.Toggle variant="link"  as={Button} eventKey="2">
                                                                            <span className="permissiondrop">
                                                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAArElEQVR42mNgGPogr6KzIbeiM7q+vp6NZM1AjVfyKjv/5Fd0bsmv6o4hzeaqzsNA2/9D8WegQbtyKrpCibO5svNkXmXXf6AmCIYY8gHooiN55R3++G2u7DqF0Nz1H6gJjMFiFZ1fgeLL8fgZpBmuGG57fmXXSyA9M7u6Rx6vs2G2QWzsvA8Mh9n5ZZ3qhAOsvPM8VNNdoKapBWWdmqRE1Qqg86bnV7SbMgxfAAAt/HbnjJn53wAAAABJRU5ErkJggg==" alt="toggle" srcSet=""/>
                                                                            </span>
                                                                        </Accordion.Toggle>
                                                                        <input type="checkbox" name="" id="pick-292"  />
                                                                        <label htmlFor="pick-1">Funds</label>
                                                                        <Accordion.Collapse eventKey="2">
                                                                            <div className="inner-permissions">
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-1" disabled />
                                                                                    <label htmlFor="pick-1">Create Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">View Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Delete Cards</label>
                                                                                </div>
                                                                                <div className="checkbox-wrap">
                                                                                    <input type="checkbox" name="" id="pick-20"  />
                                                                                    <label htmlFor="pick-20">Reverse Card Transactions</label>
                                                                                </div>
                                                                            </div>
                                                                        </Accordion.Collapse>
                                                                    </Accordion>
                                                                </div>
                                                                

                                                                
                                                                
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    
                                                    
                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="3">
                                                            User Access
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="3">
                                                            <div>
                                                                <div className="checkbox-wrap">
                                                                    <input type="checkbox" name="" id="pick-1" disabled/>
                                                                    <label htmlFor="pick-1">Federated Authentication</label>
                                                                </div>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Username</Form.Label>
                                                                        <Form.Control type="text" />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Password</Form.Label>
                                                                        <Form.Control type="password" />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Confirm Password</Form.Label>
                                                                        <Form.Control type="password" />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Mambu Display Language</Form.Label>
                                                                        <Form.Control as="select" size="sm">
                                                                            <option value="English">English</option>
                                                                            <option value="Portuguese">Portuguese</option>
                                                                            <option value="Spanish">Spanish</option>
                                                                            <option value="Russian">Russian</option>
                                                                            <option value="French">French</option>
                                                                            <option value="Georgian">Georgian</option>
                                                                        </Form.Control>
                                                                    </Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="3">
                                                            Access Rights
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="3">
                                                            <div>
                                                                <div className="checkbox-wrap">
                                                                    <input type="checkbox" name="" id="pick-1" disabled/>
                                                                    <label htmlFor="pick-1">Can access all branches</label>
                                                                </div>
                                                                <Form.Label>Branch</Form.Label>
                                                                <div className="each-formsection branchselection">
                                                                        
                                                                    <Form.Control as="select" size="sm">
                                                                        <option>Ikeja</option>
                                                                        <option>Head office</option>
                                                                        <option>Badagry</option>
                                                                        <option>Thursday</option>
                                                                        <option>Marina</option>
                                                                    </Form.Control>
                                                                    <Button className="btn small-btnprimary">Add Branch Access</Button>
                                                                </div>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="3">
                                                            Contact
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="3">
                                                            <div>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Mobile Phone</Form.Label>
                                                                        <Form.Control type="text" />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Home Phone</Form.Label>
                                                                        <Form.Control type="text" />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Email Address</Form.Label>
                                                                        <Form.Control type="text" />
                                                                    </Col>
                                                                    <Col></Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="3">
                                                            Transaction Limits
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="3">
                                                            <div>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Mobile Phone</Form.Label>
                                                                        <Form.Control as="select" size="sm">
                                                                            <option value="Approve Loan">Approve Loan</option>
                                                                            <option value="Disburse Loan">Disburse Loan</option>
                                                                            <option value="Apply Fee">Apply Fee</option>
                                                                            <option value="Make Deposit">Make Deposit</option>
                                                                            <option value="Make Withdrawal">Make Withdrawal</option>
                                                                            <option value="Make Repayment">Make Repayment</option>
                                                                        </Form.Control>
                                                                    </Col>
                                                                    <Col>
                                                                        {/* <Form.Label className="block-level"></Form.Label> */}
                                                                        <Form.Control type="text" />
                                                                    </Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Notes
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                               <Form.Group>
                                                                    <Form.Control as="textarea" rows="3" 
                                                                    />
                                                               </Form.Group>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                                                  

                                                    <div className="footer-with-cta toleft">
                                                        {/* <Button variant="secondary" className="grayed-out">Cancel</Button> */}
                                                        <NavLink to={'/administration/access/users'} className="btn btn-secondary grayed-out">Cancel</NavLink>
                                                        <Button>Save Changes</Button>
                                                    </div>
                                                </Form>
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

export default CreateNewUser;