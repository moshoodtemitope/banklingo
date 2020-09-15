import * as React from 'react';
// import { NavLink} from 'react-router-dom';
import {Fragment} from "react";
import {NavLink} from 'react-router-dom';
import "./mainmenu.scss"; 
class MainMenu extends React.Component{
    constructor(props) {
        super(props);
        
        this.state={
            user:''
        }
       
    }


    renderMainNav(){
        
        return(
            <div className="mainmenu-wrap">
                <ul className="nav">
                    <li className="nav-item">
                        <NavLink to={'/dashboard'}>Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <span>Clients</span>
                        <ul>
                            <li>
                                <NavLink to="/active-clients">Active</NavLink>
                            </li>
                            <li>
                                <NavLink to="/inactive-clients">Inactive</NavLink>
                            </li>
                            <li>
                                <NavLink to="/clients-pending-approval">Pending approval</NavLink>
                            </li>
                            <li>
                                <NavLink to="/clients-exited">Exited</NavLink>
                            </li>
                            <li>
                                <NavLink to="/clients-blacklisted">Blacklisted</NavLink>
                            </li>
                            <li>
                                <NavLink to="/clients">All customers</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <span>Loans</span>
                       
                        <ul>
                            <li>
                                <NavLink exact to="/all-loans/pending">Pending Approval</NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/all-loans/approved">Approved</NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/all-loans/rejected">Rejected</NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/all-loans/active">Active</NavLink>
                            </li>
                            
                            <li>
                                <NavLink exact to="/all-loans/arrears">In Arears</NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/all-loans/closed">Closed</NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/all-loans/closed-off">Closed Written Off</NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/all-loans/closed-withdrawn">Closed Withdrawn</NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/all-loans">All Loans</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <span>Deposits</span>
                        <ul>
                            <li>
                                <NavLink to="/deposits">All Deposits</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <span>Disbursement</span>
                        <ul>
                            <li>
                                <NavLink exact to="/disbursements">All Disbursements</NavLink>
                                <NavLink exact to="/disbursements/initiate">Initiate Disbursements</NavLink>
                                <NavLink exact to="/disbursements/pending-review">Pending Review</NavLink>
                                <NavLink exact to="/disbursements/pending-approval">Pending Approval</NavLink>
                                <NavLink exact to="/disbursements/nip-requests">NIP Request</NavLink>
                            </li>
                        </ul>

                    </li>
                    <li className="nav-item">
                        <span>Loan Transactions</span>
                        <ul>
                            <li>
                                <NavLink to="/loan-transactions">All Loan Transactions</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <span>Deposit Transactions</span>
                        <ul>
                            <li>
                                <NavLink to="/deposit-transactions">All Deposit Transactions</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <span>Activities</span>
                        <ul>
                            <li>
                                <NavLink to="/activities">All Activities</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <span>Branches</span>
                        <ul>
                            <li>
                                <NavLink to="/branches">All Branches</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <span>Users</span>
                        <ul>
                            <li>
                                <NavLink to="/user-management">All Users</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <span>Communications</span>
                        <ul>
                            <li>
                                <NavLink exact to="/communications">All Communications</NavLink>
                                <NavLink to="/communications/emails">Email</NavLink>
                                <NavLink to="/communications/sms">SMS</NavLink>
                                <NavLink to="/communications/webhooks">Web Hooks</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/accounts'}>Accounting</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/administration/general'}>Administration</NavLink>
                    </li>
                </ul>
                
            </div>
        )
        

    }

  
    componentDidMount() {
    }


    render() {
        
        
        return (
            <Fragment>
                
                <div className="menu-container">
                    <div className="content-container">
                        <div className="row">
                            {this.renderMainNav()}

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}




export default MainMenu;