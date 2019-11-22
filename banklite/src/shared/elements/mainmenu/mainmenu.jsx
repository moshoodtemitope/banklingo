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
                        <NavLink to={'/clients'}>Clients</NavLink>
                        <ul>
                            <li>
                                <NavLink to="/dsdsd">Active</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dsds">Inactive</NavLink>
                            </li>
                            <li>
                                <NavLink to="/ewr">Pending approval</NavLink>
                            </li>
                            <li>
                                <NavLink to="/fdds">Exited</NavLink>
                            </li>
                            <li>
                                <NavLink to="/fdfd">Blacklisted</NavLink>
                            </li>
                            <li>
                                <NavLink to="/fdrer">All customers</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/loans'}>Loans</NavLink>
                        <ul>
                            <li>
                                <NavLink to="/dsdsd">All Loans</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/deposits'}>Deposits</NavLink>
                        <ul>
                            <li>
                                <NavLink to="/deposits">All Deposits</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/disbursements'}>Disbursement</NavLink>
                        <ul>
                            <li>
                                <NavLink to="/disbursements">All Disbursements</NavLink>
                            </li>
                        </ul>

                    </li>
                    <li className="nav-item">
                        <NavLink to={'/loan-transactions'}>Loan Transactions</NavLink>
                        <ul>
                            <li>
                                <NavLink to="/loan-transactions">All Loan Transactions</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/deposit-transactions'}>Deposit Transactions</NavLink>
                        <ul>
                            <li>
                                <NavLink to="/deposit-transactions">All Deposit Transactions</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/activities'}>Activities</NavLink>
                        <ul>
                            <li>
                                <NavLink to="/activities">All Activities</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/branches'}>Branches</NavLink>
                        <ul>
                            <li>
                                <NavLink to="/branches">All Branches</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/user-management'}>Users</NavLink>
                        <ul>
                            <li>
                                <NavLink to="/user-management">All Users</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/communications'}>Communications</NavLink>
                        <ul>
                            <li>
                                <NavLink to="/communications">All Communications</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/accounts'}>Accounting</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/administration'}>Administration</NavLink>
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