import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
// import  SidebarElement from '../../shared/elements/sidebar'
// import "./administration.scss"; 
class ViewSavingsAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            showSetDeposit:false,
            showSetMaxWithdrawal:false,
            showChangeAccountState:false,
            showChangeHistory:false,
        }

        
    }
    handleSetDepositClose = () => this.setState({showSetDeposit:false});
    
    handleSetDepositShow = () => this.setState({showSetDeposit:true});

    handleSetMaxWithdrawalClose = () => this.setState({showSetMaxWithdrawal:false});
    
    handleSetMaxWithdrawalShow = () => this.setState({showSetMaxWithdrawal:true});

    handleChangeAccountStateModalClose = () => this.setState({showChangeAccountState:false});
    
    handleChangeAccountStateModalShow = () => this.setState({showChangeAccountState:true});

    handleChangeHistoryClose = () => this.setState({showChangeHistory:false});
    
    handleChangeHistoryShow = () => this.setState({showChangeHistory:true});

    setDepositBox = ()=>{
        const {showSetDeposit} = this.state;
        return(
            <Modal show={showSetDeposit} onHide={this.handleSetDepositClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>Recommended Deposit Amount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Form.Label className="block-level">Recommended Deposit Amount (₦)</Form.Label>
                                {/* Search dropdown of staff list */}
                                <Form.Control type="text"  />
                            </Col>
                            <Col className="date-wrap">
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="debitLocation">
                            <Form.Label className="block-level">Notes</Form.Label>
                            <Form.Control as="textarea" rows="2" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="light" onClick={this.handleSetDepositClose}>
                        Cancel
                    </Button>
                    <Button variant="secondary">
                        Save Changes
                    </Button>
                
                </Modal.Footer>
            </Modal>
        )
    }

    setMaxWithdrawalBox = ()=>{
        const {showSetMaxWithdrawal} = this.state;
        return(
            <Modal show={showSetMaxWithdrawal} onHide={this.handleSetMaxWithdrawalClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>Maximum Withdrawal Amount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Form.Label className="block-level">Maximum Withdrawal Amount (₦)</Form.Label>
                                {/* Search dropdown of staff list */}
                                <Form.Control type="text"  />
                            </Col>
                            <Col className="date-wrap">
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="debitLocation">
                            <Form.Label className="block-level">Notes</Form.Label>
                            <Form.Control as="textarea" rows="2" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="light" onClick={this.handleSetMaxWithdrawalClose}>
                        Cancel
                    </Button>
                    <Button variant="secondary">
                        Save Changes
                    </Button>
                
                </Modal.Footer>
            </Modal>
        )
    }

    changeAccountStateBox = ()=>{
        const {showChangeAccountState} = this.state;
        return(
            <Modal show={showChangeAccountState} onHide={this.handleChangeAccountStateModalClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>Changing Account State</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Form.Label className="block-level">Previous State</Form.Label>
                                <span className="form-text">Active</span>
                            </Col>
                            <Col>
                                <Form.Label className="block-level">New State</Form.Label>
                                {/* Display clicked state here closed or locked */}
                                <span className="form-text">Closed</span>
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="debitLocation">
                            <Form.Label className="block-level">Comments</Form.Label>
                            <Form.Control as="textarea" rows="2" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="light" onClick={this.handleChangeAccountStateModalClose}>
                        Cancel
                    </Button>
                    <Button variant="secondary">
                        Change Status
                    </Button>
                
                </Modal.Footer>
            </Modal>
        )
    }

    changeHistoryBox = ()=>{
        const {showChangeHistory} = this.state;
        return(
            <Modal show={showChangeHistory} onHide={this.handleChangeHistoryClose} size="lg" centered="true" dialogClassName="modal-45w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>History Change Log</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="select-wrap w-40">
                            <label>Changed Fields</label>
                            <select className="form-control form-control-sm w-20" name="" id="">
                                <option value="">All</option>
                            </select>
                        </div>
                        
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>Change</th>
                                    <th>Original Value</th>
                                    <th>New Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>Employer</p>
                                        <small>Daniel Ugheghe</small>
                                        <small>11-09-2019 15:20:24</small>
                                    </td>
                                    <td></td>
                                    <td>ADMINISTRATIVE STAFF COLLEGE OF NIGERIA</td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Employer Category</p>
                                        <small>API</small>
                                        <small>11-09-2019 15:20:24</small>
                                    </td>
                                    <td>-</td>
                                    <td>GENERAL</td>
                                </tr>
                            </tbody>
                        </TableComponent>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="light" onClick={this.handleChangeHistoryClose}>
                        Cancel
                    </Button>
                    <Button variant="secondary">
                        Save Changes
                    </Button>
                
                </Modal.Footer>
            </Modal>
        )
    }
    

    render() {
        
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    <div className="content-wrapper">
                        {this.setDepositBox()}
                        {this.changeAccountStateBox()}
                        {this.setMaxWithdrawalBox()}
                        {this.changeHistoryBox()}
                        <CustomerHeading {...this.props}/>
                        <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                <div className="heading-ctas">
                                                    <ul className="nav">
                                                        <li>
                                                            <Button size="sm">Deposit</Button>
                                                        </li>
                                                        <li>
                                                            <DropdownButton
                                                                size="sm"
                                                                title="Close"
                                                                key="inActiveCurrency"
                                                                className="customone"
                                                                alignRight
                                                            >
                                                               <Dropdown.Item eventKey="1" onClick={this.handleChangeAccountStateModalShow} >Close</Dropdown.Item>
                                                                
                                                            </DropdownButton>
                                                        </li>
                                                        <li>
                                                            <DropdownButton
                                                                size="sm"
                                                                title="More"
                                                                key="inActiveCurrency"
                                                                className="customone"
                                                                alignRight
                                                            >
                                                                <Dropdown.Item eventKey="1">Apply Fee</Dropdown.Item>
                                                                <Dropdown.Item eventKey="1">Add Field</Dropdown.Item>
                                                                <NavLink className="dropdown-item" to='/editcustomer'>Edit Account</NavLink>
                                                                <Dropdown.Item eventKey="1" onClick={this.handleSetDepositShow}>Set Recommended Deposit</Dropdown.Item>
                                                                <Dropdown.Item eventKey="1" onClick={this.handleSetMaxWithdrawalShow}>Set Max Withdrawal Amount</Dropdown.Item>
                                                                <Dropdown.Item eventKey="1" onClick={this.handleChangeHistoryShow}>View Change History</Dropdown.Item>
                                                                <Dropdown.Item eventKey="1" onClick={this.handleChangeAccountStateModalShow}>Lock Deposit Account</Dropdown.Item>
                                                            </DropdownButton>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="customerprofile-tabs">
                                                    <Tab.Container  defaultActiveKey="details">
                                                        
                                                        <Nav variant="pills" >
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="details">Details</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="transactions">Transactions</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="activity">Activity</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="attachments">Attachments</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="comments">Comments</Nav.Link>
                                                            </Nav.Item>
                                                        </Nav>
                                                    
                                                        <Tab.Content>
                                                        <Tab.Pane eventKey="details">
                                                            <div className="amounts-wrap w-40 centered">
                                                                
                                                                <div className="eachamount">
                                                                    <h6>Account State</h6>
                                                                    <div className="amounttext">Approved</div>
                                                                </div>
                                                            </div>
                                                            <div className="overview-wrap">
                                                                <div className="each-overview">
                                                                    <h6>General</h6>
                                                                    <TableComponent classnames="striped bordered hover">
                                                                        
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>Account ID</td>
                                                                                <td>2073458499</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Assigned to Branch</td>
                                                                                <td>Head Office Lagos</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Account State</td>
                                                                                <td>In Arrears</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Risk Level</td>
                                                                                <td>Lost</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Currency</td>
                                                                                <td>₦ NGN</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>Activation Date</td>
                                                                                <td>25-03-2019</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </TableComponent>
                                                                </div>
                                                                <div className="each-overview">
                                                                    <h6>Settlement Accounts</h6>
                                                                    <TableComponent classnames="striped bordered hover">
                                                                        
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>Payroll - Private</td>
                                                                                <td>2073458499</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </TableComponent>
                                                                </div>
                                                            </div>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="transactions">
                                                                <div className="pagination-wrap">
                                                                    <label htmlFor="toshow">Show</label>
                                                                    <select id="toshow" className="countdropdown form-control form-control-sm">
                                                                        <option value="10">10</option>
                                                                        <option value="25">25</option>
                                                                        <option value="50">50</option>
                                                                        <option value="200">200</option>
                                                                    </select>
                                                                    
                                                                </div>
                                                                <TableComponent classnames="striped bordered hover">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>User</th>
                                                                            <th>ID</th>
                                                                            <th>Value Date (Entry Date)</th>
                                                                            <th>Type</th>
                                                                            <th>Amount</th>
                                                                            <th>Principal Balance</th>
                                                                            <th>Arrears Position</th>
                                                                            <th>Total Balance</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>Mayokun Malomo</td>
                                                                            <td>1346858</td>
                                                                            <td>25-03-2019 00:00:00</td>
                                                                            <td>Disbursement</td>
                                                                            <td>₦1,000,000.00</td>
                                                                            <td>₦1,019,000.00</td>
                                                                            <td>₦0.00</td>
                                                                            <td>₦1,019,000.00</td>
                                                                            <td>₦1,019,000.00</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Mayokun Malomo</td>
                                                                            <td>1346858</td>
                                                                            <td>25-03-2019 00:00:00</td>
                                                                            <td>Interest Applied</td>
                                                                            <td>₦1,000,000.00</td>
                                                                            <td>₦1,019,000.00</td>
                                                                            <td>₦-373,973.01</td>
                                                                            <td>₦1,019,000.00</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Mayokun Malomo</td>
                                                                            <td>1346858</td>
                                                                            <td>25-03-2019 00:00:00</td>
                                                                            <td>Interest Applied</td>
                                                                            <td>₦1,000,000.00</td>
                                                                            <td>₦1,019,000.00</td>
                                                                            <td>₦-373,973.01</td>
                                                                            <td>₦1,019,000.00</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </TableComponent>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="activity">
                                                                <div className="activities-wrap">
                                                                    <div className="each-activity">
                                                                        <span>
                                                                            <NavLink to='/customer/20/savingsaccount/77339322'>Payroll - Private 2073458499</NavLink>
                                                                        </span>
                                                                        <span className="activity-action">is now in arrears</span>
                                                                        <div>
                                                                            <span className="action-date">29-04-2019</span>
                                                                            <span className="action-by"> <NavLink to='/customer/20/savingsaccount/77339322'>Mayokun Malomo</NavLink></span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="each-activity">
                                                                        <span>
                                                                            <NavLink to='/customer/20/savingsaccount/77339322'>Payroll - Private 2073458499</NavLink>
                                                                        </span>
                                                                        <span className="activity-action">is now in arrears</span>
                                                                        <div>
                                                                            <span className="action-date">29-04-2019</span>
                                                                            <span className="action-by"> <NavLink to='/customer/20/savingsaccount/77339322'>Mayokun Malomo</NavLink></span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="each-activity">
                                                                        <span>
                                                                            <NavLink to='/customer/20/savingsaccount/77339322'>Payroll - Private 2073458499</NavLink>
                                                                        </span>
                                                                        <span className="activity-action">has been disbursed</span>
                                                                        <div>
                                                                            <span className="action-date">29-04-2019</span>
                                                                            <span className="action-by"> <NavLink to='/customer/20/savingsaccount/77339322'>Mayokun Malomo</NavLink></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="attachments">
                                                                <TableComponent classnames="striped bordered hover">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>Document</th>
                                                                            <th>File Type</th>
                                                                            <th>Size</th>
                                                                            <th>Last Modified</th>
                                                                            <th>Added By</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </TableComponent>
                                                                <div className="footer-with-cta toright">
                                                                    <Button >Upload Document</Button>
                                                                </div>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="comments">
                                                                <div className="footer-with-cta toright">
                                                                    <Button>Add Comment</Button>
                                                                </div>
                                                            </Tab.Pane>
                                                        </Tab.Content>
                                                            
                                                    </Tab.Container>
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

export default ViewSavingsAccount;