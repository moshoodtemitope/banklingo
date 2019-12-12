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
import "./loanmanagement.scss"; 
class NewLoanAccount extends React.Component {
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
                                                        <h3>Creating A New Loan Account</h3>
                                                    </div>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Product</Form.Label>
                                                            {/* <Form.Control type="text" /> */}
                                                            <select id="toshow" className="countdropdown form-control form-control-sm">
                                                                <option value="8a858ee161cd08460161ced7edf96969">(Discontinued)Payrolla - Private</option>
                                                                <option value="8a858f5f60d6c7b10160da0e108e542f">Staff Auto-Loan</option>
                                                                <option value="8a858f5f60d6c7b10160da06839f4f0a" selected>Staff Loan</option>
                                                                <option value="8a85874e6bb77426016bb8c7e21e0d7b">Travel Loan</option>
                                                                <option value="8a858ea660c1299d0160c752c1736b3c">Empire Trust Nano</option>
                                                                <option value="8a858ec863daa4480163df0aa2007f9c">Empire Trust Nano - 15 Days</option>
                                                                <option value="8a8586c76d639765016d639908fd0056">Empire Trust Nano Plus</option>
                                                                <option value="8a858ea660c1299d0160c78b39fd7cd0">Empire Trust Payroll - Federal</option>
                                                                <option value="8a858f1f60a7ff390160b673ed1313f6">Empire Trust Payroll - Private</option>
                                                                <option value="8a858f8f66e4572c0166e4befdc92b24">Empire Trust Payroll - Remita</option>
                                                                <option value="8a858ea660c1299d0160c763cf8d707e">Empire Trust Payroll - State</option>
                                                                <option value="8a858ea660c1299d0160c74c09b96911">Empire Trust Payroll - Zed 6.6</option>
                                                            </select>
                                                        </Col>
                                                        <Col>
                                                            <Form.Label className="block-level">Display Name</Form.Label>
                                                            {/* Display chosen loan Type text here */}
                                                            <Form.Control type="text" />
                                                            {/* Display chosen loan Type text here */}
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Product Type</Form.Label>
                                                            <span className="form-text">Fixed Term Loan</span>
                                                            <span className="form-text">Simulation of TBills</span>
                                                        </Col>
                                                        <Col>
                                                        </Col>
                                                    </Form.Row>
                                                    {/* Help text based on selected loan type */}
                                                    <div className="hint-text">
                                                        Loans granted to staff members of Zedcrest Capital Group for the purchase of Cars
                                                    </div>
                                                     {/* Help text based on selected loan type */}

                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Account Terms
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Loan Amount (₦)</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                        <span className="input-helptext">Min: ₦500,000.00 Max: ₦20,000,000.00</span>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Interest Rate (% per month)</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                        <span className="input-helptext">Min: 0% Max: 6%</span>
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Repaid Every</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                        <span className="input-helptext">Months</span>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Over (Installments)</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                        <span className="input-helptext">Min: 1 Max: 48</span>
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Arrears Tolerance Period (days)</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                        <span className="form-text">Min: 3 days Max: 3 days</span>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Interest Calculation Method</Form.Label>
                                                                        <span className="form-text">Flat</span>
                                                                    </Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Disbursement Details
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Channels</Form.Label>
                                                                        <select id="toshow" className="countdropdown form-control form-control-sm">
                                                                            <option value="access_bank3_account">Access Bank 3 Account</option>
                                                                            <option value="access_bank3_settlement_account">ACCESS BANK 3 SETTLEMENT ACCOUNT</option>
                                                                            <option value="diamond_bank3_account">DIAMOND BANK 3 ACCOUNT</option>
                                                                            <option value="fidelity_bank3_account">FIDELITY BANK 3 ACCOUNT</option>
                                                                        </select>
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Anticipated Disbursement</Form.Label>
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
                                                                        <Form.Label className="block-level">First Repayment Date</Form.Label>
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
                                                            Schedule Preview
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Button size="sm" variant="secondary" className="grayed-out">Preview Schedule</Button>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Guarantors
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Group controlId="periodOptionChosen" className="">
                                                                    <Form.Label className="block-level">Source</Form.Label>
                                                                    {/* search dropdown of Guarantors */}
                                                                    <Form.Control type="text"  />
                                                                    {/* search dropdown of Guarantors */}
                                                                </Form.Group>
                                                               
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Account</Form.Label>
                                                                        <select id="toshow" className="countdropdown form-control form-control-sm">
                                                                            
                                                                        </select>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Amount(₦)</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <div className="footer-with-cta toleft">
                                                                    <Button size="sm" variant="secondary" className="grayed-out">Add Guarantor</Button>
                                                                </div>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            RISK ASSESSMENT
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Loan Bought Over</Form.Label>
                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="closing-balance" />
                                                                            {/* display if unchecked */}
                                                                            <label htmlFor="loan-bought">No</label>
                                                                            {/* display if checked */}
                                                                            {/* <label htmlFor="loan-bought">Yes</label> */}                                              
                                                                        </div>

                                                                        
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Bought over from</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Loan Liquidation Amount</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Bank Name (Repayment Account)</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Bank Account Number (Repayment)</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                        <span className="form-text">Format: ##########</span>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Late Payment Fee (Penalty)</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col className="date-wrap">
                                                                        <Form.Label className="block-level">Last Penalty Application Date</Form.Label>
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
                                                                        <Form.Label className="block-level">Requires Guarantor</Form.Label>
                                                                        <select id="toshow" className="countdropdown form-control form-control-sm">
                                                                            <option value="yes">Yes</option>
                                                                            <option value="no">No</option>
                                                                        </select>
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Write Off Balance</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <div className="footer-with-cta toleft">
                                                                    <Button size="sm" variant="secondary" className="grayed-out">Add Field</Button>
                                                                </div>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        GEMINI AUDIT
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                               
                                                                
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Loan Type</Form.Label>
                                                                        <select id="toshow" className="countdropdown form-control form-control-sm">
                                                                            <option value="10">Normal</option>
                                                                            <option value="25">Topup</option>
                                                                        </select>
                                                                    </Col>
                                                                    <Col></Col>
                                                                </Form.Row>
                                                                {/* <div className="footer-with-cta toleft">
                                                                    <Button size="sm" variant="secondary" className="grayed-out">Add Field</Button>
                                                                </div> */}
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            ACCOUNT OFFICER DETAIL
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Loan Officer</Form.Label>
                                                                        {/* select dropdown search of acount officers */}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Loan Officer Branch</Form.Label>
                                                                         {/* select dropdown search of acount officers branches*/}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Acquisition Channel</Form.Label>
                                                                        {/* select dropdown search of channels*/}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Customer was Introduced By</Form.Label>
                                                                         {/* select dropdown search of who introduced customer*/}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            DISBURSEMENT REQUIREMENTS
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Repayment Method</Form.Label>
                                                                        <select id="toshow" className="countdropdown form-control form-control-sm">
                                                                            <option value="10">Bank Transfer</option>
                                                                            <option value="25">Cash</option>
                                                                            <option value="50">Cheque</option>
                                                                            <option value="200">Direct Debit</option>
                                                                            <option value="200">Remita</option>
                                                                        </select>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Repayment Instrument Status</Form.Label>
                                                                         {/* select dropdown search of Repayment Instrument Status*/}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Offer Letter Status</Form.Label>
                                                                        <select id="toshow" className="countdropdown form-control form-control-sm">
                                                                            <option value="10">Offer Accepted</option>
                                                                            <option value="25">Offer Cancelled</option>
                                                                            <option value="50">Offer Declined</option>
                                                                            <option value="200">Offer Sent</option>
                                                                        </select>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Disbursement Bank</Form.Label>
                                                                         {/* select dropdown search of  Banks*/}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Disbursement Account Number</Form.Label>
                                                                         
                                                                        <Form.Control type="text"  />
                                                                        <span className="form-text">Format: ##########</span>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Auto Disburse</Form.Label> 
                                                                        <select id="toshow" className=" form-control form-control-sm">
                                                                            <option value="10">Yes</option>
                                                                            <option value="25">No</option>
                                                                        </select>
                                                                    </Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Association
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Branch</Form.Label>
                                                                         {/* select dropdown search of Branches*/}
                                                                        <Form.Control type="text"  />
                                                                    </Col>
                                                                    <Col></Col>
                                                                </Form.Row>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                    
                                                    <Accordion >
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
                                                        <div className="checkbox-wrap">
                                                            <input type="checkbox" name="" id="create-another" />
                                                            <label htmlFor="create-another">Create Another</label>                                            
                                                        </div>
                                                        <NavLink to={'/deposits'} className="btn btn-secondary grayed-out">Cancel</NavLink>
                                                        <Button>Create  Account</Button>
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

export default NewLoanAccount;