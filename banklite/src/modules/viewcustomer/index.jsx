import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
// import  SidebarElement from '../../shared/elements/sidebar'
// import "./administration.scss"; 
class ViewCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }
        // console.log('props are', this.props.match.params)
    }
    

    render() {
        
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
                                            <div className="row">
                                                <div className="col-sm-8">
                                                    <div className="main-details">
                                                    <TableComponent classnames="striped bordered hover">
                                                        <thead>
                                                            <tr>
                                                                <th>Account Name</th>
                                                                <th>Type</th>
                                                                <th>State</th>
                                                                <th>Balance</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Payroll- Private 348046272</td>
                                                                <td>Loan</td>
                                                                <td>In Arrears</td>
                                                                <td>₦1,336,928.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Settlement Account 77339322</td>
                                                                <td>Deposit</td>
                                                                <td>Approved</td>
                                                                <td>-</td>
                                                            </tr>
                                                            <tr>
                                                                <td colSpan="3">Total</td>
                                                                <td>₦1,336,928.00</td>
                                                            </tr>
                                                        </tbody>
                                                    </TableComponent>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="leftside-items">
                                                        <h6>Latest Activity </h6>
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
                                                    </div>
                                                </div>
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

export default ViewCustomer;