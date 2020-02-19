import * as React from "react";
// import {Router} from "react-router";
import { connect } from 'react-redux';
import {Fragment} from "react";
import AdminNav from './_menu'

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'
import Select from 'react-select';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Formik } from 'formik';
import * as Yup from 'yup';

import {acoountingActions} from '../../redux/actions/accounting/accounting.action';
import {accountingConstants} from '../../redux/actiontypes/accounting/accounting.constants'

import Alert from 'react-bootstrap/Alert'
import { productActions } from '../../redux/actions/products/products.action';
import { productsConstants } from '../../redux/actiontypes/products/products.constants'

import "./administration.scss"; 
class EditLoanProduct extends React.Component {
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
                                                        <h3>Edit Zedvance Nano</h3>
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
                                                            <span>Fixed Term Loan</span>
                                                        </Col>
                                                    </Form.Row>
                                                    <Form.Label className="block-level">State</Form.Label>
                                                    <div className="checkbox-wrap">
                                                        <input type="checkbox" name="" id="pick-1" />
                                                        <label htmlFor="pick-1">Active</label>
                                                    </div>
                                                    
                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        Product Description
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="each-formsection">
                                                               <Form.Group>
                                                                    <Form.Control as="textarea" rows="3" 
                                                                        value="Fully automated and instant loan product on mobile app (account number template: 209)"
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

                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            New Account Settings
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">ID Type</Form.Label>
                                                                        <span>Random Pattern</span>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Using</Form.Label>
                                                                                <Form.Control type="text" value="209#######" />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Initial Account State</Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>Pending Approval</option>
                                                                                <option>Partial Application</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Form.Row>
                                                                
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Loan Amount
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <Form.Label>Loan Amount Constraints (₦)</Form.Label>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Default</Form.Label>
                                                                                <Form.Control type="text"  />
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Min</Form.Label>
                                                                                <Form.Control type="text" value="1,000.00"  />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Max</Form.Label>
                                                                                <Form.Control type="text" value="50000.00"  />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    
                                                                    <Col>
                                                                        <Form.Group className="w-60">
                                                                            <Form.Label className="block-level">Accounts managed under Credit Arrangement</Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>Optional</option>
                                                                                <option>Required</option>
                                                                                <option>No</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Form.Row>
                                                                
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Interest Rate
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Interest Calculation Method</Form.Label>
                                                                        <span>Flat</span>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Accrued Interest Posting Frequency</Form.Label>
                                                                        <span>On Repayment</span>
                                                                    </Col>
                                                                </Form.Row>
                                                                    <Form.Row>
                                                                        
                                                                        <Col>
                                                                            <div className="checkbox-wrap">
                                                                                <input type="checkbox" name="" id="pick-11" />
                                                                                <label htmlFor="pick-11">Accrue Interest After Maturity</label>
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
                                                                                    <option>% per 4 weeks</option>
                                                                                    <option>% per week</option>
                                                                                    <option>% per day</option>
                                                                                </Form.Control>
                                                                            </div></Col>
                                                                    </Form.Row>

                                                                    <Form.Label>Interest Rate Constraints (%)</Form.Label>
                                                                    <Form.Row>
                                                                        <Col>
                                                                            <Form.Group>
                                                                                <Form.Label className="block-level">Default</Form.Label>
                                                                                    <Form.Control type="text" value="1" />
                                                                            </Form.Group>
                                                                            <Form.Group>
                                                                                <Form.Label className="block-level">Min</Form.Label>
                                                                                    <Form.Control type="text" value="1"  />
                                                                            </Form.Group>
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Group>
                                                                                <Form.Label className="block-level">Max</Form.Label>
                                                                                    <Form.Control type="text" value="1"  />
                                                                            </Form.Group>
                                                                        </Col>
                                                                    </Form.Row>
                                                                    
                                                                    <Form.Row>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Days In Year</Form.Label>
                                                                            <span>30E/360 ISDA (30/360 German)</span>
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Repayments Interest Calculation</Form.Label>
                                                                            <span>Using Repayment Periodicity</span>
                                                                        </Col>
                                                                    </Form.Row>
                                                                </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Repayment Scheduling
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Payment Interval Method</Form.Label>
                                                                        <span>Interval</span>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Repayments Are Made Every</Form.Label>
                                                                            <Form.Control type="text" value="1" className="w-20" />
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>Days</option>
                                                                                <option>Weeks</option>
                                                                                <option>Months</option>
                                                                                <option>Years</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Label>Installments Constraints (#)</Form.Label>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Default</Form.Label>
                                                                                <Form.Control type="text" value="1" />
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Min</Form.Label>
                                                                                <Form.Control type="text" value="1"  />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Max</Form.Label>
                                                                                <Form.Control type="text" value="1"  />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Label>First Due Date Offset Constraints (days)</Form.Label>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Default</Form.Label>
                                                                                <Form.Control type="text" />
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Min</Form.Label>
                                                                                <Form.Control type="text"  />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Max</Form.Label>
                                                                                <Form.Control type="text" value="15"  />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Form.Row>
                                                                
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Collect Principal Every</Form.Label>
                                                                            <Form.Control type="text" value="1" />
                                                                            <span>Repayments</span>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Grace Period</Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>No Grace Period</option>
                                                                                <option>Principal Grace Period</option>
                                                                                <option>Pure Grace Period</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Form.Row>
                                                                {/* If No Grace Period is not selected */}
                                                                <Form.Label>Grace Period Constraints (#)</Form.Label>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Default</Form.Label>
                                                                                <Form.Control type="text"/>
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
                                                                {/* If No Grace Period is not selected */}
                                                                
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Rounding of Repayment Schedules</Form.Label>
                                                                        <span>Round Principal Remainder into Last Repayment</span>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Rounding of Repayment Currency</Form.Label>
                                                                        <span>No Rounding</span>
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label>Repayments Schedule Editing</Form.Label>

                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-19" checked />
                                                                            <label htmlFor="pick-19">Adjust Payment Dates</label>
                                                                        </div>
                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-20" checked />
                                                                            <label htmlFor="pick-20">Adjust Principal Payment Schedule</label>
                                                                        </div>

                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-15" disabled />
                                                                            <label htmlFor="pick-15">Adjust Interest Payment Schedule</label>
                                                                        </div>
                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-14" />
                                                                            <label htmlFor="pick-14">Adjust Fee Payment Schedule</label>
                                                                        </div>
                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-18" />
                                                                            <label htmlFor="pick-18">Adjust Penalty Payment Schedule</label>
                                                                        </div>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Non Working Days Rescheduling</Form.Label>
                                                                        <span>Do not reschedule repayments</span>
                                                                    </Col>
                                                                </Form.Row>
                                                                
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion  >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Repayment Collection
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <Form.Label>Loan Amount Constraints (₦)</Form.Label>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Payment Allocation Method</Form.Label>
                                                                        <span>Horizontal</span>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Group className="w-60">
                                                                            <Form.Label className="block-level">Pre-Payments Acceptance</Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>Accept Pre-Payments</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    
                                                                    <Col>
                                                                        <Form.Group className="w-60">
                                                                            <Form.Label className="block-level">Accept Pre-Payment of Future Interest</Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>Accept Interest Pre-Payments</option>
                                                                                <option>Accept Postdated Payments</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Label className="block-level">Payment Allocation Method</Form.Label>
                                                                        <div className="items-list">
                                                                            <div>Fee</div>
                                                                            <div>Penalty</div>
                                                                            <div>Interest</div>
                                                                            <div>Principal</div>
                                                                        </div>
                                                                    </Col>
                                                                </Form.Row>
                                                                
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Arrears Settings
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <Form.Label>Arrears Tolerance Period (days)</Form.Label>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Default</Form.Label>
                                                                                <Form.Control type="text" value="0"  />
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Min</Form.Label>
                                                                                <Form.Control type="text" value="0"  />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Max</Form.Label>
                                                                                <Form.Control type="text" value="0"  />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Arrears Days Calculated From</Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>Date Account First Went Into Arrears</option>
                                                                                <option>Date of Oldest Currently Late Repayment</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Non-Working Days in Arrears Tolerance Period and Penalty Calculation Method</Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>Include Non-Working Days</option>
                                                                                <option>Exclude Non-Working Days</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Form.Row>
                                                                
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Penalties Settings
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <Form.Group>
                                                                    <Form.Label className="block-level">Penalty Calculation Method</Form.Label>
                                                                    <Form.Control as="select" size="sm">
                                                                        <option>No Penalty</option>
                                                                        <option>Overdue Principal * # of Late Days * Penalty Rate</option>
                                                                        <option>(Overdue Principal + Overdue Interest) * # of Late Days * Penalty Rate</option>
                                                                        <option>Outstanding Principal * # of Late Days * Penalty Rate</option>
                                                                    </Form.Control>
                                                                </Form.Group>
                                                                    {/* Display when no Penalty is not selected */}
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Penalty Tolerance Period</Form.Label>
                                                                            <Form.Control type="text" />
                                                                            <span>days</span>
                                                                        </Form.Group>
                                                                        
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">How is the penalty rate charged?</Form.Label>
                                                                            <span>% per day</span>
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Label> Penalty Rate Constraints (%)</Form.Label>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Default</Form.Label>
                                                                                <Form.Control type="text" value="0"  />
                                                                        </Form.Group>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Min</Form.Label>
                                                                                <Form.Control type="text" value="0"  />
                                                                        </Form.Group>
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Group>
                                                                            <Form.Label className="block-level">Max</Form.Label>
                                                                                <Form.Control type="text" value="0"  />
                                                                        </Form.Group>
                                                                    </Col>
                                                                </Form.Row>
                                                                {/* Display when no Penalty is not selected */}
                                                                
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion >
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Internal Controls
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-21" />
                                                                            <label htmlFor="pick-21">Close Dormant Accounts</label>
                                                                        </div>
                                                                        {/* if close is checked */}
                                                                        <Form.Group>
                                                                            <Form.Control type="text" className="w-20"   />
                                                                            <span>days</span>
                                                                        </Form.Group>
                                                                        {/* if close is checked */}
                                                                    </Col>
                                                                    <Col>
                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-27" />
                                                                            <label htmlFor="pick-27">Lock Arrears Accounts after</label>
                                                                        </div>
                                                                        {/* if lock is checked */}
                                                                        <Form.Group>
                                                                            <Form.Control type="text" className="w-20"   />
                                                                            <span>days</span>
                                                                        </Form.Group>
                                                                        {/* if lock is checked */}
                                                                    </Col>
                                                                </Form.Row>
                                                                <Form.Row>
                                                                    <Col>
                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-26" />
                                                                            <label htmlFor="pick-26">Cap Charges more than</label>
                                                                        </div>
                                                                        {/* if cap charges is checked */}
                                                                        <Form.Control type="text" className="w-20"   />
                                                                        <Form.Control as="select" size="sm">
                                                                                <option>% of Outstanding Principal</option>
                                                                                <option>% of Original Principal</option>
                                                                        </Form.Control>
                                                                        <Form.Group className="w-60">
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>Soft Cap</option>
                                                                                <option>Hard Cap</option>
                                                                            </Form.Control>
                                                                        </Form.Group>
                                                                        <div className="checkbox-wrap">
                                                                            <input type="checkbox" name="" id="pick-39" />
                                                                            <label htmlFor="pick-39">Apply accrued charges before lock (capping)</label>
                                                                        </div>
                                                                        {/* if cap charges is checked */}
                                                                    </Col>
                                                                    
                                                                </Form.Row>
                                                                    
                                                                
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    <Accordion>
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
                                                                {/* if add fee is clicked */}
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
                                                                                <option>Deducted Disbursement</option>
                                                                                <option>Capitalized Disbursement</option>
                                                                                <option>Upfront Disbursement</option>
                                                                                <option>Late Repayment</option>
                                                                                <option>Payment Due (Applied Upfront)</option>
                                                                            </Form.Control>
                                                                        </Col>
                                                                    </Form.Row>
                                                                    <Form.Row>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Fee Payment</Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>Flat (₦)</option>
                                                                                <option>% of Disbursed Amount</option>
                                                                            </Form.Control>
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Amount (₦)</Form.Label>
                                                                            <Form.Control type="text" />
                                                                        </Col>
                                                                        
                                                                    </Form.Row>
                                                                    <Form.Row>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Amortization Profile</Form.Label>
                                                                            <Form.Control as="select" size="sm" className="w-40">
                                                                                <option>None</option>
                                                                                <option>Straight Line</option>
                                                                                <option>Effective Interest Rate</option>
                                                                            </Form.Control>
                                                                        </Col>
                                                                    </Form.Row>
                                                                    <Form.Row>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Fee Income</Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>Use Product Default</option>
                                                                                <option>110100101 - CASH IMPREST - AKURE</option>
                                                                                <option>110100102 - CASH IMPREST - IKEJA</option>
                                                                            </Form.Control>
                                                                            <span>Any GL Account</span>
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Fee Receivable</Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>Use Product Default</option>
                                                                                <option>110100101 - CASH IMPREST - AKURE</option>
                                                                                <option>110100102 - CASH IMPREST - IKEJA</option>
                                                                            </Form.Control>
                                                                            <span>Asset</span>
                                                                        </Col>
                                                                    </Form.Row>
                                                                     {/* Display if straight line is  selected from Amortization */}
                                                                    <Form.Row>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Amortization Frequency</Form.Label>
                                                                            <span>Custom Interval</span>
                                                                        </Col>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Amortized every</Form.Label>
                                                                            <Form.Control type="text" />
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>Days</option>
                                                                                <option>Weeks</option>
                                                                                <option>Months</option>
                                                                                <option>Years</option>
                                                                            </Form.Control>
                                                                            <span>over</span>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>Predefined Intervals</option>
                                                                                <option>The Full Term of the Loan</option>
                                                                            </Form.Control>
                                                                            <Form.Control type="text" />
                                                                            <span>intervals</span>
                                                                        </Col>
                                                                    </Form.Row>
                                                                    {/* Display if straight line is  selected from Amortization */}


                                                                     {/* Display if Effective Interest Rate is  selected from Amortization */}
                                                                     <Form.Row>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Amortization Frequency</Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>Account Installments Due Dates</option>
                                                                                <option>Custom Interval</option>
                                                                            </Form.Control>
                                                                        </Col>
                                                                        {/* also if  Custom Interval from Amortization Frequency is chosen */}
                                                                            <Col>
                                                                                <Form.Label className="block-level">Amortized every</Form.Label>
                                                                                <Form.Control type="text" />
                                                                                <Form.Control as="select" size="sm">
                                                                                    <option>Days</option>
                                                                                    <option>Weeks</option>
                                                                                    <option>Months</option>
                                                                                    <option>Years</option>
                                                                                </Form.Control>
                                                                                <span>over</span>
                                                                                <Form.Control type="text" />
                                                                                <span>intervals</span>
                                                                            </Col>
                                                                        {/* if  Custom Interval from Amortization Frequency is chosen */}
                                                                        {/* If Account Installments Due Dates from Amortization Frequency is chosen */}
                                                                        <Col>
                                                                            <Form.Label className="block-level">Fee Amortization Upon Reschedule/Refinance</Form.Label>
                                                                            <Form.Control as="select" size="sm">
                                                                                <option>End amortization on the Original Account</option>
                                                                                <option>Continue amortization on the Rescheduled/Refinanced Account</option>
                                                                            </Form.Control>
                                                                        </Col>
                                                                        {/* If Account Installments Due Dates from Amortization Frequency is chosen */}

                                                                       
                                                                    </Form.Row>
                                                                    {/* Display if Effective Interest Rate is  selected from Amortization */}


                                                                    {/* Display if none is not selected from Amortization */}
                                                                    <Form.Row>
                                                                        <Col>
                                                                            <Form.Label className="block-level">Deferred Fee Income</Form.Label>
                                                                            <Form.Control as="select" size="sm" className="w-40">
                                                                                <option>Use Product Default</option>
                                                                                <option>110100101 - CASH IMPREST - AKURE</option>
                                                                                <option>110100102 - CASH IMPREST - IKEJA</option>
                                                                            </Form.Control>
                                                                            <span>Liability</span>
                                                                        </Col>
                                                                    </Form.Row>
                                                                     {/* Display if none is not selected from Amortization */}
                                                                </div>
                                                                 {/* if add fee is clicked */}
                                                                
                                                            </div>
                                                        </Accordion.Collapse>
                                                    </Accordion>

                                                    
                                                    
                                                    
                                                    <Accordion>
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
                                                   
                                                    <Accordion>
                                                        <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                            Securities
                                                        </Accordion.Toggle>
                                                        <Accordion.Collapse eventKey="0">
                                                            <div className="w-40">
                                                                <div className="checkbox-wrap">
                                                                    <input type="checkbox" name="" id="pick-1" />
                                                                    <label htmlFor="pick-1">Enable Guarantors</label>
                                                                </div>
                                                                {/* Display when enable is checked */}
                                                                    <Form.Label className="block-level">Required Securities</Form.Label>
                                                                    <Form.Control type="text"  />
                                                                    <span>% of Loan Amount</span>
                                                                {/* Display when enable is checked */}
                                                                
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

export default EditLoanProduct;