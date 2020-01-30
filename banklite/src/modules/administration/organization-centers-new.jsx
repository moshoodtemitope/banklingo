import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import AdminNav from './_menu'

// import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./administration.scss"; 
class NewCenter extends React.Component {
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
                                                        <h3>Creating A New Center</h3>
                                                    </div>
                                                    <Form.Group>
                                                        <Form.Label className="block-level">Center Name</Form.Label>
                                                            <Form.Control type="text" />
                                                    </Form.Group>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Branch</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">ID</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Col>
                                                    </Form.Row>
                                                    
                                                    <Accordion defaultActiveKey="0">
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Weekly Meeting Day
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Label>Weekly Meeting Day</Form.Label>
                                                                <Form.Control as="select" size="sm">
                                                                    <option>Monday</option>
                                                                    <option>Tuesday</option>
                                                                    <option>Wednesday</option>
                                                                    <option>Thursday</option>
                                                                    <option>Friday</option>
                                                                    <option>Saturday</option>
                                                                    <option>Sunday</option>
                                                                </Form.Control>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion defaultActiveKey="0">
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Address
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Street Address - Line 1</Form.Label>
                                                                        <Form.Control type="text" />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Street Address - Line 2</Form.Label>
                                                                        <Form.Control type="text" />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">City</Form.Label>
                                                                        <Form.Control type="text" />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">State/Province/Region</Form.Label>
                                                                        <Form.Control type="text" />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Zip Postal Code</Form.Label>
                                                                        <Form.Control type="text" />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Country</Form.Label>
                                                                        <Form.Control type="text" />
                                                                    </Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion defaultActiveKey="0">
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Notes
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                               <Form.Group>
                                                                        <Form.Label className="block-level">Phone Number</Form.Label>
                                                                        <Form.Control as="textarea" rows="3" />
                                                               </Form.Group>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                   

                                                    


                                                    <div className="footer-with-cta toleft">
                                                        <Button variant="secondary" className="grayed-out">Cancel</Button>
                                                        <Button>Create Center</Button>
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

export default NewCenter;