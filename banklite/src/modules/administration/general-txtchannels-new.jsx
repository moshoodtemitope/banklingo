import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

// import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./administration.scss"; 
class NewTxtChannels extends React.Component {
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
                                                        <h3>Add Transaction Channel</h3>
                                                    </div>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Name</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">ID</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Col>
                                                    </Form.Row>
                                                    
                                                    <Accordion defaultActiveKey="0">
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Loan Constraints
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection w-40">
                                                                <Form.Control as="select" size="sm">
                                                                    <option>Unconstrained Usage</option>
                                                                    <option>Limited Usage</option>
                                                                </Form.Control>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion defaultActiveKey="2">
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="2">
                                                            Savings Constraints
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="2">
                                                            <div className="each-formsection w-40">
                                                                <Form.Control as="select" size="sm">
                                                                    <option>Unconstrained Usage</option>
                                                                    <option>Limited Usage</option>
                                                                </Form.Control>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion defaultActiveKey="3">
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="3">
                                                            Accounting
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="3">
                                                            <div className="each-formsection w-40">
                                                                <Form.Control as="select" size="sm">
                                                                    <option>1100100 - Cash Imprest - Head Office</option>
                                                                    <option>1100100 - Cash Imprest - Akure</option>
                                                                    <option>1100100 - Cash Imprest - Akure</option>
                                                                    <option>1100100 - Cash Imprest - Akure</option>
                                                                </Form.Control>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion defaultActiveKey="3">
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="3">
                                                            Usage Rights
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="3">
                                                            <div>
                                                                <div className="each-formsection ">
                                                                    <div className="checkbox-wrap">
                                                                        <input type="checkbox" name="" id="pick-1" />
                                                                        <label htmlFor="pick-1">All Users</label>
                                                                    </div>
                                                                    <div className="checkbox-wrap">
                                                                        <input type="checkbox" name="" id="pick-2" />
                                                                        <label htmlFor="pick-2">Chief Financial Officer</label>
                                                                    </div>
                                                                </div>
                                                                <div className="each-formsection two-sided">
                                                                    <div className="checkbox-wrap">
                                                                        <input type="checkbox" name="" id="pick-3" />
                                                                        <label htmlFor="pick-3">Customer Engagement (Document Manager)</label>
                                                                    </div>
                                                                    <div className="checkbox-wrap">
                                                                        <input type="checkbox" name="" id="pick-4" />
                                                                        <label htmlFor="pick-4">Operations - Rectify Adjustment</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <div className="footer-with-cta toleft">
                                                        <Button variant="secondary" className="grayed-out">Cancel</Button>
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

export default NewTxtChannels;