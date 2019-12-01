import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'
import Select from 'react-select';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./administration.scss"; 
class NewLoanProduct extends React.Component {
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
                                                        <h3>Creating A New Loan Product</h3>
                                                    </div>
                                                    <Form.Group>
                                                        <Form.Label className="block-level">Product</Form.Label>
                                                            <Form.Control type="text" />
                                                    </Form.Group>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">ID</Form.Label>
                                                            <Form.Control type="text" />
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">Product Type</Form.Label>
                                                            <Form.Control as="select" size="sm">
                                                                    <option>Fixed Term Loan</option>
                                                                    <option>Dynamic Term Loan</option>
                                                                    <option>Interest-Free Loan</option>
                                                                    <option>Tranched Loan</option>
                                                                    <option>Revolving Credit</option>
                                                            </Form.Control>
                                                        </Col>
                                                    </Form.Row>
                                                    
                                                    <Accordion defaultActiveKey="0">
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        Product Description
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                               <Form.Group>
                                                                    <Form.Control as="textarea" rows="3" />
                                                               </Form.Group>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion defaultActiveKey="0">
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Product Availability
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <Form.Label>Product Availability</Form.Label>
                                                                
                                                                <div className="checkbox-wrap">
                                                                    <input type="checkbox" name="" id="pick-1" />
                                                                    <label htmlFor="pick-1">Customers</label>
                                                                </div>
                                                                <div className="checkbox-wrap">
                                                                    <input type="checkbox" name="" id="pick-2" />
                                                                    <label htmlFor="pick-2">Groups</label>
                                                                </div>
                                                            
                                                                <div className="checkbox-wrap">
                                                                    <input type="checkbox" name="" id="pick-5" disabled />
                                                                    <label htmlFor="pick-5">Groups (Solidarity)</label>
                                                                </div>
                                                                <div className="checkbox-wrap">
                                                                    <input type="checkbox" name="" id="pick-4" />
                                                                    <label htmlFor="pick-4">All Branches</label>
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
                                                                    <Button className="btn small-btnprimary">Add Branch</Button>
                                                                </div>
                                                                <div className="each-formsection addedbranches">
                                                                   <div className="eachbranch">
                                                                       <div className="branchname">Ikeja</div>
                                                                       <div className="removebranch"></div>
                                                                   </div>
                                                                   <div className="eachbranch">
                                                                       <div className="branchname">Badagry</div>
                                                                       <div className="removebranch"></div>
                                                                   </div>
                                                                </div>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    
                                                    <Accordion defaultActiveKey="0">
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Product Links
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <div className="checkbox-wrap">
                                                                    <input type="checkbox" name="" id="pick-3"/>
                                                                    <label htmlFor="pick-3">Enable Linking</label>
                                                                </div>
                                                                <div className="each-formsection  two-sided">
                                                                    <div>
                                                                        <Form.Label>Linked Deposit Product</Form.Label>
                                                                        <Form.Control as="select" size="sm">
                                                                            <option>Any</option>
                                                                            <option>NIGTB 02-SEP-2019</option>
                                                                        </Form.Control>
                                                                    </div>
                                                                    {/* Display if NIGTB 02-SEP-2019 is selected */}
                                                                    <div className="pl-20">
                                                                        <Form.Label>Deposit Account Options</Form.Label>
                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-6" />
                                                                            <label htmlFor="pick-6">Auto-Set Settlement Accounts on Creation</label>
                                                                        </div>
                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-6" />
                                                                            <label htmlFor="pick-6">Auto-Create Settlement Account</label>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="each-formsection w-40">
                                                                    <Form.Label>Settlement Options</Form.Label>
                                                                    <Form.Control as="select" size="sm">
                                                                        <option>Only transfer full dues</option>
                                                                        <option>Allow partial transfers</option>
                                                                        <option>No automated transfers</option>
                                                                    </Form.Control>
                                                                </div>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                   

                                                    


                                                    <div className="footer-with-cta toleft">
                                                        {/* <Button variant="secondary" className="grayed-out">Cancel</Button> */}
                                                        <NavLink to={'/administration/products'} className="btn btn-secondary grayed-out">Cancel</NavLink>
                                                        <Button>Save Product</Button>
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

export default NewLoanProduct;