import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'
// import Tabs from 'react-bootstrap/Tabs'
// import Tab from 'react-bootstrap/Tab'
// import Nav from 'react-bootstrap/Nav'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
// import  SidebarElement from '../../shared/elements/sidebar'
// import "./administration.scss"; 
class ViewClosedAccounts extends React.Component {
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
                        {/* <CustomerHeading {...this.props}/> */}
                        <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                <div className="customerprofile-tabs">
                                                    <div className="closedaccounts">
                                                        <div className="amounts-wrap w-65">
                                                            <div className="eachamount">
                                                                <h6>Max Loan Size</h6>
                                                                <div className="amounttext">₦205,800.00</div>
                                                            </div>
                                                            <div className="eachamount">
                                                                <h6>On Time Repayment Rate</h6>
                                                                <div className="amounttext">0.00%</div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h6>General</h6>
                                                            <TableComponent classnames="striped bordered hover">
                                                                <thead>
                                                                    <th>Account </th>
                                                                    <th>Account</th>
                                                                    <th>On Time Repayment Rate</th>
                                                                    <th>Closure Date</th>
                                                                    <th>Closure Reason</th>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <NavLink to="/customer/3223/closedaccounts/4384393">
                                                                                2001014672 - MoneyPal Regular
                                                                            </NavLink>
                                                                        </td>
                                                                        <td>₦205,800.00</td>
                                                                        <td>0.00%</td>
                                                                        <td>18-02-2019</td>
                                                                        <td>Written Off</td>
                                                                    </tr>
                                                                </tbody>
                                                            </TableComponent>
                                                        </div>
                                                    </div>
                                                    
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

export default ViewClosedAccounts;