import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'
// import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
// import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
// import  SidebarElement from '../../shared/elements/sidebar'
// import "./administration.scss"; 
class ViewClosedAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }
    

    render() {
        console.log('props are', this.props)
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    <div className="content-wrapper">
                        <CustomerHeading {...this.props}/>
                        <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                <div className="customerprofile-tabs">
                                                    <Tab.Container  defaultActiveKey="details">
                                                        
                                                        <Nav variant="pills" >
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="details">Details</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="schedule">Schedule</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="transactions">Transactions</Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="securities">Securities</Nav.Link>
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
                                                                <div className="amounts-wrap w-65">
                                                                    <div className="eachamount">
                                                                        <h6>Account State</h6>
                                                                        <div className="amounttext">Closed (Written Off)</div>
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
                                                                        <h6>Details</h6>
                                                                        <TableComponent classnames="striped bordered hover">
                                                                            
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>Principal Balance</td>
                                                                                    <td>₦1,019,000.00</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Interest Balance</td>
                                                                                    <td>₦317,928.00</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Interest Accrued</td>
                                                                                    <td>₦18,545.80</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Fee Balance</td>
                                                                                    <td>₦0.00</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Penalty Balance</td>
                                                                                    <td>₦0.00</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Principal Due</td>
                                                                                    <td>₦679,333.36</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </TableComponent>
                                                                    </div>
                                                                </div>
                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="schedule">
                                                                <TableComponent classnames="striped bordered hover">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>#</th>
                                                                            <th>Due</th>
                                                                            <th>Principal Due</th>
                                                                            <th>Interest Due</th>
                                                                            <th>Fees Due</th>
                                                                            <th>Penalty Due</th>
                                                                            <th>Total Due</th>
                                                                            <th>State</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>1</td>
                                                                            <td>25-03-2019 00:00:00</td>
                                                                            <td>₦84,916.67</td>
                                                                            <td>₦39,741.00</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>₦124,657.67</td>
                                                                            <td>Late</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>2</td>
                                                                            <td>25-03-2019 00:00:00</td>
                                                                            <td>₦84,916.67</td>
                                                                            <td>₦39,741.00</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>₦124,657.67</td>
                                                                            <td>Pending</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>3</td>
                                                                            <td>25-03-2019 00:00:00</td>
                                                                            <td>₦84,916.67</td>
                                                                            <td>₦39,741.00</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>₦124,657.67</td>
                                                                            <td>Pending</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td></td>
                                                                            <td>Total</td>
                                                                            <td>₦1,019,000.00	</td>
                                                                            <td>₦476,892.00	</td>
                                                                            <td>-</td>
                                                                            <td>-</td>
                                                                            <td>₦124,657.67</td>
                                                                            <td></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </TableComponent>
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
                                                                    <div className="move-page-actions">
                                                                        <div className="each-page-action">
                                                                            <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                                                                        </div>
                                                                        <div className="each-page-action">
                                                                            <img alt="go backward" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAAJ0lEQVR42mNgoBj09PT8xyqIIQETRJFAFoRLoAsS1oHXDryuQvcHAJqKQewTJHmSAAAAAElFTkSuQmCC" width="6" height="11" />
                                                                        </div>
                                                                        <div className="page-count">
                                                                            <span>1-20</span>  of <span>20000</span>
                                                                        </div>
                                                                        <div className="each-page-action">
                                                                            <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" />
                                                                        </div>
                                                                        <div className="each-page-action">
                                                                            <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11"  />
                                                                        </div>
                                                                    </div>
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
                                                            <Tab.Pane eventKey="securities">
                                                                <div className="amounts-wrap">
                                                                    <div className="eachamount">
                                                                        <h6>Amount Guaranteed</h6>
                                                                        <div className="amounttext">₦0.00</div>
                                                                    </div>
                                                                    <div className="eachamount">
                                                                        <h6>Outstanding Principal Guaranteed</h6>
                                                                        <div className="amounttext">0%</div>
                                                                    </div>
                                                                </div>
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

export default ViewClosedAccount;