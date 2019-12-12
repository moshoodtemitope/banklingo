import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./depositmanagement.scss"; 
class NewDepositAccount extends React.Component {
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
                                                        <h3>Creating A New Deposit Account</h3>
                                                    </div>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Product</Form.Label>
                                                            {/* <Form.Control type="text" /> */}
                                                            <select id="toshow" className="countdropdown form-control form-control-sm">
                                                                <option value="10">Settlement Account</option>
                                                                <option value="25">TBills and Bonds</option>
                                                                <option value="50">50</option>
                                                                <option value="200">200</option>
                                                            </select>
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">Display Name</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Product Type</Form.Label>
                                                            <span className="form-text">Fixed Deposit</span>
                                                            <span className="form-text">Simulation of TBills</span>
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">Currency</Form.Label>
                                                            <span className="form-text">Nigerian naira(NGN)</span>
                                                        </Col>
                                                    </Form.Row>
                                                    
                                                    <Accordion defaultActiveKey="0">
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Deposit Account Terms
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Interest Rate</Form.Label>
                                                                        <Form.Control type="text" value="2" />
                                                                        <span className="input-helptext">Min: 2% Max: 5%</span>
                                                                    </Col>
                                                                    <Col>
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Interest Calculated Using</Form.Label>
                                                                        <span className="form-text">End of Day Balance</span>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Maximum Balance (₦)</Form.Label>
                                                                        <Form.Control type="text" />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Interest paid into account</Form.Label>
                                                                        <span className="form-text">On Account Maturity</span>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Opening Balance</Form.Label>
                                                                        <span className="form-text">Min: ₦0.00</span>
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Term Length</Form.Label>
                                                                        <span className="form-text">Any</span>
                                                                    </Col>
                                                                    {/* Display this two alone if settlement product is chosen */}
                                                                    <Col>
                                                                        <Form.Label className="block-level">Maximum Withdrawal Amount(₦)</Form.Label>
                                                                        <Form.Control type="text" />
                                                                    </Col>
                                                                    {/* uncomment this when product select unchange is handled */}
                                                                    {/* <Col>
                                                                        <Form.Label className="block-level">Recommended Deposit Amount(₦)</Form.Label>
                                                                        <Form.Control type="text" />
                                                                    </Col> */}
                                                                     {/* Display this two alone if settlement product is chosen */}
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Interest Rate Terms: Fixed</Form.Label>
                                                                    </Col>
                                                                    <Col>
                                                                    </Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    
                                                    <Accordion defaultActiveKey="0">
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Account Notes
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                               <Form.Group>
                                                                        
                                                                        <Form.Control as="textarea" rows="3" />
                                                               </Form.Group>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                   

                                                    


                                                    <div className="footer-with-cta toleft">
                                                    <NavLink to={'/deposits'} className="btn btn-secondary grayed-out">Cancel</NavLink>
                                                        <Button>Create Deposit Account</Button>
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

export default NewDepositAccount;