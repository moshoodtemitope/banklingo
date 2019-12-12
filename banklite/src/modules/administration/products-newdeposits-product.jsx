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
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import "./administration.scss"; 
class NewDepositsProduct extends React.Component {
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
                                                        <h3>Creating A New Deposit Product</h3>
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
                                                                <option>Current Account</option>
                                                                <option>Savings Account</option>
                                                                <option>Fixed Deposit</option>
                                                                <option>Savings Plan</option>
                                                                <option>Funding Account</option>
                                                            </Form.Control>
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Label className="block-level">State</Form.Label>
                                                    <div className="checkbox-wrap">
                                                        <input type="checkbox" name="" id="pick-1" />
                                                        <label htmlFor="pick-1">Active</label>
                                                        <div className="hint-text">
                                                            A transactional account where a customer may perform regular deposit and withdrawals, accrue interest and may optionally be allowed to go into overdraft.
                                                        </div>
                                                    </div>
                                                    
                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        Product Description
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
                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Product Availability
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <Form.Label>Product Availability</Form.Label>
                                                                
                                                                <div className="checkbox-wrap">
                                                                    <input type="checkbox" name="" id="pick-1" checked />
                                                                    <label htmlFor="pick-1">Customers</label>
                                                                </div>
                                                                <div className="checkbox-wrap">
                                                                    <input type="checkbox" name="" id="pick-2" checked />
                                                                    <label htmlFor="pick-2">Groups</label>
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

                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            New Account Settings
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">ID Type</Form.Label>
                                                                        <Form.Control as="select" size="sm">
                                                                            <option>Incremental Number</option>
                                                                            <option>Random Pattern</option>
                                                                        </Form.Control>
                                                                    </Col>
                                                                    <Col>
                                                                         <Form.Group>
                                                                            <Form.Label className="block-level">Using template</Form.Label>
                                                                                <Form.Control type="text" value="@@@@###" />
                                                                        </Form.Group>
                                                                        {/* if Incremental is selected */}
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Starting from</Form.Label>
                                                                                <Form.Control type="text"  />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Form.Row>
                                                                
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Currencies
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                    <Form.Group className="w-60">
                                                                        <Form.Label className="block-level">Currency</Form.Label>
                                                                        <Form.Control as="select" size="sm">
                                                                            <option>Nigerian naira (NGN)</option>
                                                                            <option>CFA Franc BCEAO (XOF)</option>
                                                                        </Form.Control>
                                                                    </Form.Group>
                                                                
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Interest Rate
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <div className="checkbox-wrap">
                                                                    <input type="checkbox" name="" id="pick-11" />
                                                                    <label htmlFor="pick-11">Interest paid into account</label>
                                                                </div>
                                                                {/* If Interest paid is checked */}
                                                                    <Form.Row>
                                                                        
                                                                        <Col>
                                                                            <div className="each-formsection no-margins">
                                                                                <Form.Label>
                                                                                    Interest Rate Terms
                                                                                </Form.Label>
                                                                                <Form.Control as="select" size="sm">
                                                                                    <option value="FIXED">Fixed</option>
                                                                                    <option value="TIERED">Tiered per Balance</option>
                                                                                    <option value="TIERED_PERIOD">Tiered per Period</option>
                                                                                </Form.Control>
                                                                            </div>
                                                                        </Col>
                                                                        <Col>
                                                                            <div className="each-formsection no-margins">
                                                                                <Form.Label>
                                                                                    How is the Interest rate charged?
                                                                                </Form.Label>
                                                                                <Form.Control as="select" size="sm">
                                                                                    <option>% per year</option>
                                                                                    <option>% per month</option>
                                                                                    <option selected>% per 4 weeks</option>
                                                                                    <option>% per week</option>
                                                                                    <option>% per days</option>
                                                                                </Form.Control>
                                                                            </div>
                                                                        </Col>
                                                                    </Form.Row>

                                                                    {/* if fixed is selected from rate terms */}
                                                                        <Form.Label>Interest Rate Constraints (%)</Form.Label>
                                                                        <Form.Row>
                                                                            <Col>
                                                                                <Form.Group>
                                                                                    <Form.Label className="block-level">Default</Form.Label>
                                                                                        <Form.Control type="text"  />
                                                                                </Form.Group>
                                                                                <Form.Group>
                                                                                    <Form.Label className="block-level">Min</Form.Label>
                                                                                        <Form.Control type="text"   />
                                                                                </Form.Group>
                                                                            </Col>
                                                                            <Col>
                                                                                <Form.Group>
                                                                                    <Form.Label className="block-level">Max</Form.Label>
                                                                                        <Form.Control type="text"   />
                                                                                </Form.Group>
                                                                            </Col>
                                                                        </Form.Row>
                                                                        {/* if fixed is selected from rate terms */}

                                                                     {/* if fixed is NOT selected from rate terms */}
                                                                    <Form.Group as={Row} className="center-aligned">

                                                                        <Form.Label column sm={2} className="block-level">Tier 1</Form.Label>
                                                                        <Col sm={2}>
                                                                            <Form.Control type="text" size="sm" />
                                                                        </Col>
                                                                        <Form.Label column sm={1} className="block-level">to</Form.Label>
                                                                        <Col sm={2}>
                                                                            <Form.Control type="text" size="sm" />
                                                                        </Col>
                                                                        <Form.Label column sm={2} className="block-level">days</Form.Label>
                                                                        <Col sm={2}>
                                                                            <Form.Control type="text" size="sm" />
                                                                        </Col>
                                                                        <Form.Label column sm={2} className="block-level">% per 4weeks</Form.Label>
                                                                        <div className="add-new">
                                                                            <img alt="add" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqElEQVR42sWT3Q6CMAyF+5K8ragENsfPNkUT9Zrn2Mq6BLihQITEJr1ZTr+22SlACGvbREjVpZcMT+frYpJG3FRHNTAUbymcA0UIdeZEjTZY1pqF0CTAdZeqQu89OucwywU7BXB0be44BME43bGAQiqsws6U7893BLTP1/hOmlmAsY+481qQhqY7HrB7hf/9Am+kcpuRlqxcRys3vJVD7f5j+umc5XTOPaW2ScUMEqMjAAAAAElFTkSuQmCC" width="16" height="16"/>
                                                                        </div>
                                                                    </Form.Group>
                                                                    {/* if fixed is NOT selected from rate terms */}

                                                                    <Form.Row>
                                                                        
                                                                        <Col>
                                                                            <div className="each-formsection no-margins">
                                                                                <Form.Label>
                                                                                    What Account Balance is Used for Calculations?
                                                                                </Form.Label>
                                                                                <Form.Control as="select" size="sm">
                                                                                    <option value="MINIMUM">Minimum daily balance</option>
                                                                                    <option value="AVERAGE">Average daily balance</option>
                                                                                    <option value="END_OF_DAY">End of Day Balance</option>
                                                                                </Form.Control>
                                                                            </div>
                                                                        </Col>
                                                                        <Col>
                                                                            <div className="each-formsection no-margins">
                                                                                <Form.Label>
                                                                                    When is the Interest Paid Into the Account?
                                                                                </Form.Label>
                                                                                <Form.Control as="select" size="sm">
                                                                                    <option value="FIRST_DAY_OF_MONTH">First day of every month</option>
                                                                                    <option value="EVERY_WEEK">Every week</option>
                                                                                    <option value="EVERY_OTHER_WEEK">Every other week</option>
                                                                                    <option value="EVERY_MONTH">Every month</option>
                                                                                    <option value="EVERY_3_MONTHS">Every three months</option>
                                                                                    <option value="ON_FIXED_DATES">On Fixed Dates</option>
                                                                                </Form.Control>
                                                                            </div>
                                                                        </Col>
                                                                    </Form.Row>

                                                                    <Form.Row>
                                                                        
                                                                        <Col>
                                                                            <div className="each-formsection no-margins w-40">
                                                                                <Form.Label>
                                                                                    Days In Year
                                                                                </Form.Label>
                                                                                <Form.Control as="select" size="sm">
                                                                                    <option value="ACTUAL_365_FIXED">Actual/365 Fixed (365 days)</option>
                                                                                    <option value="ACTUAL_360">Actual/360 (360 days)</option>
                                                                                    <option value="ACTUAL_ACTUAL_ISDA">Actual/Actual ISDA</option>
                                                                                    <option value="E30_360">30E/360 ISDA (30/360 German)</option>
                                                                                </Form.Control>
                                                                            </div>
                                                                        </Col>
                                                                    </Form.Row>


                                                                {/* If Interest paid is checked */}
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion  >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Deposits and Withdrawals
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Recommended Deposit Amount</Form.Label>
                                                                        <Form.Control type="text"  />
                                                                        <span>CFA</span>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Maximum Withdrawal Amount</Form.Label>
                                                                            <Form.Control type="text"  />
                                                                            <span>CFA</span>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Form.Row>
                                                                
                                                                
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Overdraft Conditions
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <div className="checkbox-wrap">
                                                                    <input type="checkbox" name="" id="pick-81" />
                                                                    <label htmlFor="pick-81">Allow Overdrafts</label>
                                                                </div>
                                                                <div className="checkbox-wrap">
                                                                    <input type="checkbox" name="" id="pick-34" />
                                                                    <label htmlFor="pick-34">Allow Technical Overdrafts</label>
                                                                </div>
                                                                <Form.Row>

                                                                    <Col>
                                                                        <div className="each-formsection no-margins">
                                                                            <Form.Label>
                                                                                Interest Rate Terms
                                                                        </Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option value="FIXED">Fixed</option>
                                                                                <option value="TIERED">Tiered per Balance</option>
                                                                            </Form.Control>
                                                                        </div>
                                                                    </Col>
                                                                    <Col>
                                                                        <div className="each-formsection no-margins">
                                                                            <Form.Label>
                                                                                How is the Interest rate charged?
                                                                        </Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option value="ANNUALIZED">% per year</option>
                                                                                <option value="EVERY_MONTH">% per month</option>
                                                                                <option value="EVERY_FOUR_WEEKS">% per 4 weeks</option>
                                                                                <option value="EVERY_WEEK">% per week</option>
                                                                                <option value="EVERY_X_DAYS" selected>% per X days</option>
                                                                            </Form.Control>
                                                                        </div>
                                                                    </Col>
                                                                </Form.Row>
                                                                {/* if Fixed Interest Rate Terms is selected */}
                                                                <Form.Label>Interest Rate Constraints (%)</Form.Label>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Default</Form.Label>
                                                                            <Form.Control type="text" />
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Min</Form.Label>
                                                                            <Form.Control type="text" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Max</Form.Label>
                                                                            <Form.Control type="text" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Form.Row>
                                                                {/* if Fixed Interest Rate Terms is selected */}

                                                                {/* if Tiered per Balance Interest Rate Terms is selected */}

                                                                <Form.Group as={Row} className="center-aligned">

                                                                    <Form.Label column sm={2} className="block-level">Tier 1</Form.Label>
                                                                    <Col sm={2}>
                                                                        <Form.Control type="text" size="sm" value="0.00" />
                                                                    </Col>
                                                                    <Form.Label column sm={1} className="block-level">to</Form.Label>
                                                                    <Col sm={2}>
                                                                        <Form.Control type="text" size="sm" value="0.00" />
                                                                    </Col>
                                                                    <Form.Label column sm={2} className="block-level">days</Form.Label>
                                                                    <Col sm={2}>
                                                                        <Form.Control type="text" size="sm" />
                                                                    </Col>
                                                                    <Form.Label column sm={2} className="block-level">% per 4weeks</Form.Label>
                                                                    <div className="add-new">
                                                                        <img alt="add" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqElEQVR42sWT3Q6CMAyF+5K8ragENsfPNkUT9Zrn2Mq6BLihQITEJr1ZTr+22SlACGvbREjVpZcMT+frYpJG3FRHNTAUbymcA0UIdeZEjTZY1pqF0CTAdZeqQu89OucwywU7BXB0be44BME43bGAQiqsws6U7893BLTP1/hOmlmAsY+481qQhqY7HrB7hf/9Am+kcpuRlqxcRys3vJVD7f5j+umc5XTOPaW2ScUMEqMjAAAAAElFTkSuQmCC" width="16" height="16" />
                                                                    </div>
                                                                </Form.Group>

                                                                <Form.Group className="w-40">
                                                                    <Form.Label className="block-level">Max Overdraft Limit (₦)</Form.Label>
                                                                    <Form.Control type="text" />
                                                                </Form.Group>

                                                                <Form.Row>
                                                                    <Col>
                                                                        <div className="each-formsection no-margins">
                                                                            <Form.Label>
                                                                                Days In Year
                                                                        </Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option value="ACTUAL_365_FIXED">Actual/365 Fixed (365 days)</option>
                                                                                <option value="ACTUAL_360">Actual/360 (360 days)</option>
                                                                                <option value="ACTUAL_ACTUAL_ISDA">Actual/Actual ISDA</option>
                                                                                <option value="E30_360">30E/360 ISDA (30/360 German)</option>
                                                                            </Form.Control>
                                                                        </div>
                                                                    </Col>
                                                                    <Col>
                                                                        <div className="each-formsection no-margins">
                                                                            <Form.Label>
                                                                                Accounts managed under Credit Arrangement
                                                                        </Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option value="OPTIONAL">Optional</option>
                                                                                <option value="REQUIRED">Required</option>
                                                                                <option value="NOT_REQUIRED">No</option>
                                                                            </Form.Control>
                                                                        </div>
                                                                    </Col>
                                                                </Form.Row>



                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    
                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Internal Controls
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <div className="checkbox-wrap">
                                                                    <input type="checkbox" name="" id="pick-1" />
                                                                    <label htmlFor="pick-1">Automatically set accounts as Dormant after</label>
                                                                </div>
                                                                <Form.Control className="w-20" type="text" />
                                                                <span>days</span>
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Product Fees
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <Form.Row>
                                                                    <Col>
                                                                    <div className="checkbox-wrap">
                                                                        <input type="checkbox" name="" id="pick-29" />
                                                                        <label htmlFor="pick-29">Allow Arbitrary Fees</label>
                                                                    </div>
                                                                    </Col>
                                                                    <Col>
                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-2c" />
                                                                            <label htmlFor="pick-1">Show Inactive Fees</label>
                                                                            <Button variant="secondary"  className="grayed-out custom">Add Fee</Button>
                                                                        </div>
                                                                    </Col>
                                                                </Form.Row>
                                                               
                                                                <div className="new-fee-wrap">
                                                                    <Form.Row>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Name</Form.Label>
                                                                            <Form.Control type="text" />
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Type</Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>Manual</option>
                                                                                <option>Monthly Fee</option>
                                                                            </Form.Control>
                                                                        </Col>
                                                                    </Form.Row>
                                                                    <Form.Row>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Fee Payment</Form.Label>
                                                                            <span>Flat (CFA)</span>
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Amount (₦)</Form.Label>
                                                                            <Form.Control type="text" />
                                                                            <span>CFA</span>
                                                                        </Col>
                                                                        
                                                                    </Form.Row>
                                                                    {/* If monthly fee is selected */}
                                                                    <Form.Group className="w-50">
                                                                        <Form.Label className="block-level">Apply Date Method</Form.Label>
                                                                        <Form.Control as="select" size="sm">
                                                                            <option>Monthly from Activation</option>
                                                                            <option>First Day of Every Month</option>
                                                                        </Form.Control>
                                                                    </Form.Group>
                                                                     {/* If monthly fee is selected */}
                                                                    

                                                                </div>
                                                                 
                                                                
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    
                                                    
                                                    
                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Accounting Rules
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <Form.Group as={Row} className="center-aligned">
                                                                    <Form.Label column sm={4} className="block-level">Methodology</Form.Label>
                                                                    <Col sm={7}>
                                                                        <Form.Control as="select" size="sm">
                                                                            <option>None</option>
                                                                            <option>Cash</option>
                                                                            <option>Accrual</option>
                                                                        </Form.Control>
                                                                    </Col>
                                                                </Form.Group>

                                                                <Form.Group as={Row} className="center-aligned">
                                                                    <Form.Label column sm={4} className="block-level">Transaction Source</Form.Label>
                                                                    <Col sm={6}>
                                                                        <Form.Control as="select" size="sm">
                                                                            <option value="">----------</option>
                                                                            <option value="110100100">110100100 - CASH IMPREST - HEAD OFFICE</option>
                                                                            <option value="110100101">110100101 - CASH IMPREST - AKURE</option>
                                                                            <option value="110100102">110100102 - CASH IMPREST - IKEJA</option>
                                                                            <option value="110100103">110100103 - CASH IMPREST - IBADAN</option>
                                                                            <option value="110100104">110100104 - CASH IMPREST - ABUJA</option>
                                                                            <option value="110100105">110100105 - CASH IMPREST - IKORODU</option>
                                                                            <option value="110100106">110100106 - CASH IMPREST - EPE</option>
                                                                            <option value="110100107">110100107 - CASH IMPREST - BADAGRY</option>
                                                                            <option value="110101001">110101001 - INTERBRANCH  CASH  ACCOUNT (CMU)</option>
                                                                            <option value="110101002">110101002 - Branch Suspense Account</option>
                                                                            <option value="112010001">112010001 - BALANCE WITH CBN</option>
                                                                        </Form.Control>
                                                                    </Col>
                                                                    <Col sm={2}>
                                                                        <span>Asset</span>
                                                                    </Col>
                                                                </Form.Group>
                                                                <Form.Group as={Row} className="center-aligned">
                                                                    <Form.Label column sm={4} className="block-level">Savings Control</Form.Label>
                                                                    <Col sm={6}>
                                                                        <Form.Control as="select" size="sm">
                                                                            <option value="">----------</option>
                                                                            <option value="110100100">110100100 - CASH IMPREST - HEAD OFFICE</option>
                                                                            <option value="110100101">110100101 - CASH IMPREST - AKURE</option>
                                                                            <option value="110100102">110100102 - CASH IMPREST - IKEJA</option>
                                                                            <option value="110100103">110100103 - CASH IMPREST - IBADAN</option>
                                                                            <option value="110100104">110100104 - CASH IMPREST - ABUJA</option>
                                                                            <option value="110100105">110100105 - CASH IMPREST - IKORODU</option>
                                                                            <option value="110100106">110100106 - CASH IMPREST - EPE</option>
                                                                            <option value="110100107">110100107 - CASH IMPREST - BADAGRY</option>
                                                                            <option value="110101001">110101001 - INTERBRANCH  CASH  ACCOUNT (CMU)</option>
                                                                            <option value="110101002">110101002 - Branch Suspense Account</option>
                                                                            <option value="112010001">112010001 - BALANCE WITH CBN</option>
                                                                        </Form.Control>
                                                                    </Col>
                                                                    <Col sm={2}>
                                                                        <span>Liability</span>
                                                                    </Col>
                                                                </Form.Group>
                                                                <Form.Group as={Row} className="center-aligned">
                                                                    <Form.Label column sm={4} className="block-level">Interest Expense</Form.Label>
                                                                    <Col sm={6}>
                                                                        <Form.Control as="select" size="sm">
                                                                            <option value="">----------</option>
                                                                            <option value="110100100">110100100 - CASH IMPREST - HEAD OFFICE</option>
                                                                            <option value="110100101">110100101 - CASH IMPREST - AKURE</option>
                                                                            <option value="110100102">110100102 - CASH IMPREST - IKEJA</option>
                                                                            <option value="110100103">110100103 - CASH IMPREST - IBADAN</option>
                                                                            <option value="110100104">110100104 - CASH IMPREST - ABUJA</option>
                                                                            <option value="110100105">110100105 - CASH IMPREST - IKORODU</option>
                                                                            <option value="110100106">110100106 - CASH IMPREST - EPE</option>
                                                                            <option value="110100107">110100107 - CASH IMPREST - BADAGRY</option>
                                                                            <option value="110101001">110101001 - INTERBRANCH  CASH  ACCOUNT (CMU)</option>
                                                                            <option value="110101002">110101002 - Branch Suspense Account</option>
                                                                            <option value="112010001">112010001 - BALANCE WITH CBN</option>
                                                                        </Form.Control>
                                                                    </Col>
                                                                    <Col sm={2}>
                                                                        <span>Expense</span>
                                                                    </Col>
                                                                </Form.Group>
                                                                <Form.Group as={Row} className="center-aligned">
                                                                    <Form.Label column sm={4} className="block-level">Fee Income</Form.Label>
                                                                    <Col sm={6}>
                                                                        <Form.Control as="select" size="sm">
                                                                            <option value="">----------</option>
                                                                            <option value="110100100">110100100 - CASH IMPREST - HEAD OFFICE</option>
                                                                            <option value="110100101">110100101 - CASH IMPREST - AKURE</option>
                                                                            <option value="110100102">110100102 - CASH IMPREST - IKEJA</option>
                                                                            <option value="110100103">110100103 - CASH IMPREST - IBADAN</option>
                                                                            <option value="110100104">110100104 - CASH IMPREST - ABUJA</option>
                                                                            <option value="110100105">110100105 - CASH IMPREST - IKORODU</option>
                                                                            <option value="110100106">110100106 - CASH IMPREST - EPE</option>
                                                                            <option value="110100107">110100107 - CASH IMPREST - BADAGRY</option>
                                                                            <option value="110101001">110101001 - INTERBRANCH  CASH  ACCOUNT (CMU)</option>
                                                                            <option value="110101002">110101002 - Branch Suspense Account</option>
                                                                            <option value="112010001">112010001 - BALANCE WITH CBN</option>
                                                                        </Form.Control>
                                                                    </Col>
                                                                    <Col sm={2}>
                                                                        <span>Any GL Account</span>
                                                                    </Col>
                                                                </Form.Group>
                                                                <Form.Group as={Row} className="center-aligned">
                                                                    <Form.Label column sm={4} className="block-level">Overdraft Write-Off Expense</Form.Label>
                                                                    <Col sm={6}>
                                                                        <Form.Control as="select" size="sm">
                                                                            <option value="">----------</option>
                                                                            <option value="110100100">110100100 - CASH IMPREST - HEAD OFFICE</option>
                                                                            <option value="110100101">110100101 - CASH IMPREST - AKURE</option>
                                                                            <option value="110100102">110100102 - CASH IMPREST - IKEJA</option>
                                                                            <option value="110100103">110100103 - CASH IMPREST - IBADAN</option>
                                                                            <option value="110100104">110100104 - CASH IMPREST - ABUJA</option>
                                                                            <option value="110100105">110100105 - CASH IMPREST - IKORODU</option>
                                                                            <option value="110100106">110100106 - CASH IMPREST - EPE</option>
                                                                            <option value="110100107">110100107 - CASH IMPREST - BADAGRY</option>
                                                                            <option value="110101001">110101001 - INTERBRANCH  CASH  ACCOUNT (CMU)</option>
                                                                            <option value="110101002">110101002 - Branch Suspense Account</option>
                                                                            <option value="112010001">112010001 - BALANCE WITH CBN</option>
                                                                        </Form.Control>
                                                                    </Col>
                                                                    <Col sm={2}>
                                                                        <span>Expense</span>
                                                                    </Col>
                                                                </Form.Group>
                                                                <Form.Group as={Row} className="center-aligned">
                                                                    <Form.Label column sm={4} className="block-level">Overdraft Control</Form.Label>
                                                                    <Col sm={6}>
                                                                        <Form.Control as="select" size="sm">
                                                                            <option value="">----------</option>
                                                                            <option value="110100100">110100100 - CASH IMPREST - HEAD OFFICE</option>
                                                                            <option value="110100101">110100101 - CASH IMPREST - AKURE</option>
                                                                            <option value="110100102">110100102 - CASH IMPREST - IKEJA</option>
                                                                            <option value="110100103">110100103 - CASH IMPREST - IBADAN</option>
                                                                            <option value="110100104">110100104 - CASH IMPREST - ABUJA</option>
                                                                            <option value="110100105">110100105 - CASH IMPREST - IKORODU</option>
                                                                            <option value="110100106">110100106 - CASH IMPREST - EPE</option>
                                                                            <option value="110100107">110100107 - CASH IMPREST - BADAGRY</option>
                                                                            <option value="110101001">110101001 - INTERBRANCH  CASH  ACCOUNT (CMU)</option>
                                                                            <option value="110101002">110101002 - Branch Suspense Account</option>
                                                                            <option value="112010001">112010001 - BALANCE WITH CBN</option>
                                                                        </Form.Control>
                                                                    </Col>
                                                                    <Col sm={2}>
                                                                        <span>Asset</span>
                                                                    </Col>
                                                                </Form.Group>
                                                                {/* if acrual is selcted */}
                                                                <Form.Group as={Row} className="center-aligned">
                                                                    <Form.Label column sm={4} className="block-level">Overdraft Interest Receivable</Form.Label>
                                                                    <Col sm={6}>
                                                                        <Form.Control as="select" size="sm">
                                                                            <option value="">----------</option>
                                                                            <option value="110100100">110100100 - CASH IMPREST - HEAD OFFICE</option>
                                                                            <option value="110100101">110100101 - CASH IMPREST - AKURE</option>
                                                                            <option value="110100102">110100102 - CASH IMPREST - IKEJA</option>
                                                                            <option value="110100103">110100103 - CASH IMPREST - IBADAN</option>
                                                                            <option value="110100104">110100104 - CASH IMPREST - ABUJA</option>
                                                                            <option value="110100105">110100105 - CASH IMPREST - IKORODU</option>
                                                                            <option value="110100106">110100106 - CASH IMPREST - EPE</option>
                                                                            <option value="110100107">110100107 - CASH IMPREST - BADAGRY</option>
                                                                            <option value="110101001">110101001 - INTERBRANCH  CASH  ACCOUNT (CMU)</option>
                                                                            <option value="110101002">110101002 - Branch Suspense Account</option>
                                                                            <option value="112010001">112010001 - BALANCE WITH CBN</option>
                                                                        </Form.Control>
                                                                    </Col>
                                                                    <Col sm={2}>
                                                                        <span>Asset</span>
                                                                    </Col>
                                                                </Form.Group>
                                                                {/* if acrual is selcted */}
                                                                <Form.Group as={Row} className="center-aligned">
                                                                    <Form.Label column sm={4} className="block-level">Overdraft Interest Income</Form.Label>
                                                                    <Col sm={6}>
                                                                        <Form.Control as="select" size="sm">
                                                                            <option value="">----------</option>
                                                                            <option value="110100100">110100100 - CASH IMPREST - HEAD OFFICE</option>
                                                                            <option value="110100101">110100101 - CASH IMPREST - AKURE</option>
                                                                            <option value="110100102">110100102 - CASH IMPREST - IKEJA</option>
                                                                            <option value="110100103">110100103 - CASH IMPREST - IBADAN</option>
                                                                            <option value="110100104">110100104 - CASH IMPREST - ABUJA</option>
                                                                            <option value="110100105">110100105 - CASH IMPREST - IKORODU</option>
                                                                            <option value="110100106">110100106 - CASH IMPREST - EPE</option>
                                                                            <option value="110100107">110100107 - CASH IMPREST - BADAGRY</option>
                                                                            <option value="110101001">110101001 - INTERBRANCH  CASH  ACCOUNT (CMU)</option>
                                                                            <option value="110101002">110101002 - Branch Suspense Account</option>
                                                                            <option value="112010001">112010001 - BALANCE WITH CBN</option>
                                                                        </Form.Control>
                                                                    </Col>
                                                                    <Col sm={2}>
                                                                        <span>Income</span>
                                                                    </Col>
                                                                </Form.Group>
                                                                {/* if acrual is selcted */}
                                                                <Form.Group as={Row} className="center-aligned">
                                                                    <Form.Label column sm={4} className="block-level">Interest Accrued Method</Form.Label>
                                                                    <Col sm={6}>
                                                                        <Form.Control as="select" size="sm">
                                                                            <option value="">----------</option>
                                                                            <option value="110100100">Daily</option>
                                                                            <option value="110100101">Monthly</option>
                                                                        </Form.Control>
                                                                    </Col>
                                                                </Form.Group>
                                                                {/* if acrual is selcted */}
                                                                
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>
                                                   

                                                    <div className="footer-with-cta toleft">
                                                        {/* <Button variant="secondary" className="grayed-out">Cancel</Button> */}
                                                        <NavLink to={'/administration/products/deposits'} className="btn btn-secondary grayed-out">Cancel</NavLink>
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

export default NewDepositsProduct;