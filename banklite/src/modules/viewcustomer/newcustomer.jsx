import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./customerprofile.scss"; 
class NewCustomerAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }

    render() {
        return (
            <Fragment>
                {/* <InnerPageContainer {...this.props}> */}
                    <div className="content-wrapper">
                        <div className="module-content">
                            <div className="content-container">
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="middle-content">
                                            <div className="full-pageforms w-60">
                                                <Form className="form-content card">
                                                    <div className="form-heading">
                                                        <h3>Creating A Customer</h3>
                                                    </div>

                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            General
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">First Names</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Middle Names</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Last Name</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">ID</Form.Label>
                                                                        <Form.Control type="text" value="107157568"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Customer Type</Form.Label>
                                                                        <span className="form-text">Customer</span>
                                                                    </Col>
                                                                    <Col></Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Details
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Row>
                                                                    <Col className="date-wrap">
                                                                        <Form.Label className="block-level">Birth Date</Form.Label>
                                                                        <DatePicker placeholderText="Choose  date" selected={this.state.dob} 
                                                                            onChange={this.handleDatePicker}
                                                                            onChangeRaw={(e)=>this.handleChange(e)}
                                                                            dateFormat="d MMMM, yyyy"
                                                                            className="form-control form-control-sm"
                                                                            peekNextMonth
                                                                            showMonthDropdown
                                                                            showYearDropdown
                                                                            dropdownMode="select"
                                                                            maxDate={new Date()}
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Gender</Form.Label>
                                                                        <select className="form-control form-control-sm">
                                                                            <option value="">Female</option>
                                                                            <option value="">Male</option>
                                                                        </select>
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    
                                                                    <Col>
                                                                        <Form.Label className="block-level">Mobile Phone</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Email Address</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    
                                                                    <Col>
                                                                        <Form.Label className="block-level">Home Phone</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Preferred Language</Form.Label>
                                                                        <select className="form-control form-control-sm">
                                                                            <option value="English">English</option>
                                                                            <option value="Portuguese">Portuguese</option>
                                                                            <option value="Spanish">Spanish</option>
                                                                            <option value="Russian">Russian</option>
                                                                            <option value="French">French</option>
                                                                            <option value="Georgian">Georgian</option>
                                                                            <option value="Chinese">Chinese</option>
                                                                            <option value="Indonesian">Indonesian</option>
                                                                            <option value="Romanian">Romanian</option>
                                                                            <option value="Burmese">Burmese</option>
                                                                        </select>
                                                                    </Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Address
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                        <div className="each-formsection">
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Street Address - Line 1</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    
                                                                    <Col>
                                                                        <Form.Label className="block-level">Street Address - Line 2</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    
                                                                    <Col>
                                                                        <Form.Label className="block-level">City</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">State/Province/Region</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    
                                                                    <Col>
                                                                        <Form.Label className="block-level">Zip Postal Code</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Country</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            PERSONAL INFORMATION
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                               
                                                               
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">BVN</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Title</Form.Label>
                                                                        {/* Search with dropdown of titles */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Level of Education</Form.Label>
                                                                        {/* Search with dropdown of education level */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">State</Form.Label>
                                                                        {/* Search with dropdown of states */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Local Government Area</Form.Label>
                                                                        {/* Search with dropdown of LGAs */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Landmark</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">BVN Validation Status</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Marital Status</Form.Label>
                                                                        {/* Search with dropdown Marital Status */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            EMPLOYMENT INFORMATION
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Employment Status</Form.Label>
                                                                        {/* Search with dropdown of Employment Status */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Employer</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Sector</Form.Label>
                                                                        {/* Search with dropdown of Sector */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Subsector</Form.Label>
                                                                        {/* Search with dropdown of sub Sector */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Employment Date</Form.Label>
                                                                        <DatePicker placeholderText="Choose  date" selected={this.state.dob} 
                                                                            onChange={this.handleDatePicker}
                                                                            onChangeRaw={(e)=>this.handleChange(e)}
                                                                            dateFormat="d MMMM, yyyy"
                                                                            className="form-control form-control-sm"
                                                                            peekNextMonth
                                                                            showMonthDropdown
                                                                            showYearDropdown
                                                                            dropdownMode="select"
                                                                            maxDate={new Date()}
                                                                        />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Employer Address</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">City</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Employer Landmark</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Pay Date</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                        <span className="form-text">Format: ##</span>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Monthly Income</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Official Email</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Employer Phone</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Staff ID</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Tax No</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Pension No</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Months in Previous Employment</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Employer Category</Form.Label>
                                                                        {/* Search dropown */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Employer Name</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Employer State</Form.Label>
                                                                        {/* Search dropown */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Employer Type</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Email Confirmation Status</Form.Label>
                                                                        {/* Search dropown */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col className="date-wrap">
                                                                        <Form.Label className="block-level">Contract Expiration Date</Form.Label>
                                                                        <DatePicker placeholderText="Choose  date" selected={this.state.dob} 
                                                                            onChange={this.handleDatePicker}
                                                                            onChangeRaw={(e)=>this.handleChange(e)}
                                                                            dateFormat="d MMMM, yyyy"
                                                                            className="form-control form-control-sm"
                                                                            peekNextMonth
                                                                            showMonthDropdown
                                                                            showYearDropdown
                                                                            dropdownMode="select"
                                                                            maxDate={new Date()}
                                                                        />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Staff ID Validation Status</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col></Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            OTHER INFORMATION
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Bank Name (to receive disbursement)</Form.Label>
                                                                        {/* Search with dropdown of Employment Status */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Bank Account Number</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Outstanding Loan</Form.Label>
                                                                        {/* Search with dropdown */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Repayment on Existing Loan</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Residential Status</Form.Label>
                                                                        {/* Search with dropdown */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Number of Children</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Household Count</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Building Description</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Route Description</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Account Validation Status</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            NEXT OF KIN INFORMATION
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Next of Kin Title</Form.Label>
                                                                        {/* Search with dropdown */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Next of Kin Full Name</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Next of Kin Home Address</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Next of Kin Landmark</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Next of Kin Phone Number</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Next of Kin Email</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Next of Kin Relationship</Form.Label>
                                                                        {/* Search dropdown */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Next of Kin Employer</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col></Col>
                                                                </Form.Row>
                                                                
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            GEMINI AUDIT
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Group>
                                                                    <Form.Label className="block-level">Gemini Credit Officer</Form.Label>
                                                                    <Form.Control type="text"  />
                                                                </Form.Group>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Identification Documents
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">ID Template</Form.Label>
                                                                        <select className="form-control form-control-sm">
                                                                            <option value="8a858e2460c74d550160d72b4e514ea5">Drivers License</option>
                                                                            <option value="8a858e2460c74d550160d72b4e514ea6">National ID</option>
                                                                            <option value="8a858e2460c74d550160d72b4e514ea7">Voters Card</option>
                                                                            <option value="8a858eba60c0fbda0160c736b2843eab">International Passport</option>
                                                                        </select>
                                                                    </Col>
                                                                    <Col></Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Document Type</Form.Label>
                                                                        {/* Display what is selected above */}
                                                                        <span className="form-text">Voters Card</span>
                                                                        {/* if others is selected display text box */}
                                                                        {/* <Form.Control type="text" value="107157568"  /> */}
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Issuing Authority</Form.Label>
                                                                        <span className="form-text">Nigerian Government</span>
                                                                        {/* if others is selected display text box */}
                                                                        {/* <Form.Control type="text" value="107157568"  /> */}
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Document ID</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col className="date-wrap">
                                                                        <Form.Label className="block-level">Valid Until</Form.Label>
                                                                        <DatePicker placeholderText="Choose  date" selected={this.state.dob} 
                                                                            onChange={this.handleDatePicker}
                                                                            onChangeRaw={(e)=>this.handleChange(e)}
                                                                            dateFormat="d MMMM, yyyy"
                                                                            className="form-control form-control-sm"
                                                                            peekNextMonth
                                                                            showMonthDropdown
                                                                            showYearDropdown
                                                                            dropdownMode="select"
                                                                            maxDate={new Date()}
                                                                        />
                                                                    </Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    
                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Association
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Branch</Form.Label>
                                                                        {/* Search with dropdown */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Centre</Form.Label>
                                                                        {/* Search with dropdown */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Account Officer</Form.Label>
                                                                        {/* Search with dropdown */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Groups</Form.Label>
                                                                        
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Profile Notes
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
                                                        <div className="checkbox-wrap">
                                                            <input type="checkbox" name="" id="create-another" />
                                                            <label htmlFor="create-another">Create Another</label>                                            
                                                        </div>
                                                        <NavLink to={'/clients'} className="btn btn-secondary grayed-out">Cancel</NavLink>
                                                        <Button>Create  Customer</Button>
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
                {/* </InnerPageContainer> */}
            </Fragment>
        );
    }
}

export default NewCustomerAccount;