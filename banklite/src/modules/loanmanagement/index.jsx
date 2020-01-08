import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import Button from 'react-bootstrap/Button'

import "./loanmanagement.scss"; 
class LoansManagement extends React.Component {
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
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Loan Accounts</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        {/* <div className="col-sm-3">
                                            <AccountsSidebar/>
                                        </div> */}
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                <div className="heading-with-cta">
                                                    {/* <h3 className="section-title">Journal Entries</h3> */}
                                                    <div className="filter-wrap"></div>
                                                    <Button>Edit Columns</Button>
                                                </div>
                                                
                                                <TableComponent classnames="striped bordered hover">
                                                    <thead>
                                                        <tr>
                                                        <th>Loan Name</th>
                                                        <th>Account ID</th>
                                                        <th>Account Holder Name</th>
                                                        <th>Account State</th>
                                                        <th>Loan Amount</th>
                                                        <th>Principal Due</th>
                                                        <th>Total Due</th>
                                                        <th>Total Paid</th>
                                                        <th>Last Modified</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td><NavLink to={'/customer/464738/loanaccount/348046272'}>MoneyPal</NavLink></td>
                                                            <td><NavLink to={'/customer/464738'}>464738</NavLink></td>
                                                            <td><NavLink to={'/customer/464738'}>Matt Randuks</NavLink></td>
                                                            <td>Active</td>
                                                            <td>₦40,000</td>
                                                            <td>₦0.00</td>
                                                            <td>₦0.00</td>
                                                            <td>₦0.00</td>
                                                            <td>16-09-2019</td>
                                                        </tr>
                                                        <tr>
                                                            <td><NavLink to={'/customer/464738/loanaccount/348046272'}>MoneyPal</NavLink></td>
                                                            <td><NavLink to={'/customer/73633'}>73633</NavLink></td>
                                                            <td><NavLink to={'/customer/73633'}>Joshua Wale</NavLink></td>
                                                            <td>Closed</td>
                                                            <td>₦30,000</td>
                                                            <td>₦0.00</td>
                                                            <td>₦0.00</td>
                                                            <td>₦0.00</td>
                                                            <td>26-08-2019</td>
                                                        </tr>
                                                        <tr>
                                                            <td><NavLink to={'/customer/464738/loanaccount/348046272'}>MoneyPal</NavLink></td>
                                                            <td><NavLink to={'/customer/35223'}>35223</NavLink></td>
                                                            <td><NavLink to={'/customer/35223'}>Dan Jones</NavLink></td>
                                                            <td>Rejected</td>
                                                            <td>₦100,000</td>
                                                            <td>₦0.00</td>
                                                            <td>₦0.00</td>
                                                            <td>₦0.00</td>
                                                            <td>16-07-20190</td>
                                                        </tr>
                                                        <tr>
                                                            <td><NavLink to={'/customer/464738/loanaccount/348046272'}>MoneyPal</NavLink></td>
                                                            <td><NavLink to={'/customer/33939'}>33939</NavLink></td>
                                                            <td><NavLink to={'/customer/33939'}>Mark Jones</NavLink></td>
                                                            <td>Closed(Written Off)</td>
                                                            <td>₦400,000</td>
                                                            <td>₦0.00</td>
                                                            <td>₦0.00</td>
                                                            <td>3₦0.000</td>
                                                            <td>30-07-2019</td>
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
                </InnerPageContainer>
            </Fragment>
        );
    }
}

export default LoansManagement;