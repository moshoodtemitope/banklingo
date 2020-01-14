import * as React from 'react';
import { Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {Fragment} from "react";
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
// import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import {NavLink} from 'react-router-dom';
// import {Nav, NavDropdown, Navbar, Form, Button, FormControl} from 'react-bootstrap'
import "./mainheader.scss"; 
class MainHeader extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            user:JSON.parse(localStorage.getItem("user")),
            activeBranch:'Head Office',
            showDropdown: false
        }
       
    }

    handleCurrentBranchClicked = () =>{
        
        this.setState({showDropdown: true})
    }

    chooseBranch = (e)=>{
        console.log('value is', e.target.value)
        this.setState({showDropdown: false, activeBranch: e.target.value})
    }


    renderHeadingWrap(){
        
        const {user} = this.state;
        console.log('======',user);
        return(
            <div className="mainheader-wrap">
                
                <Navbar  expand="lg">
                    <Navbar.Brand as={Link} to="/">Empire Trust</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="heading-nav">
                        {/* <Nav className="">
                            <Nav.Link href="/"></Nav.Link>
                        </Nav> */}
                        <div className="user-branch">
                            {this.state.showDropdown===false && 
                                <div className="branch-text" 
                                    onClick={this.handleCurrentBranchClicked}> <div className="activebranch"></div>  {this.state.activeBranch}</div>
                            }
                            { this.state.showDropdown &&
                                    <div className="branch-dropdown">
                                        <select name="" id="" onChange={this.chooseBranch}>
                                            <option value="Epe">Epe</option>
                                            <option value="Ikorodu">Ikorodu</option>
                                            <option value="Lagos Island">Lagos Island</option>
                                            <option value="Badagry">Badagry</option>
                                            <option value="Surulere">Surulere</option>
                                        </select>
                                    </div>
                                }
                        </div>
                        <div className="other-headingitems">
                            <DropdownButton
                                size="sm"
                                variant="secondary"
                                title="View"
                                className="headingmenu-dropdown"
                            >
                                <NavLink to={'/clients'}>Customers</NavLink>
                                {/* <NavLink to={'/dashboard'}>Groups</NavLink> */}
                                {/* <NavLink to={'/dashboard'}>Credit Arrangements</NavLink> */}
                                <NavLink to={'/all-loans'}>Loan Accounts</NavLink>
                                <NavLink to={'/loan-transactions'}>Loan Transactions</NavLink>
                                {/* <NavLink to={'/dashboard'}>Installments</NavLink> */}
                                <NavLink to={'/deposits'}>Deposit Accounts</NavLink>
                                <NavLink to={'/deposits-transactions'}>Deposit Transactions</NavLink>
                                <NavLink to={'/activities'}>System Activities</NavLink>
                                <NavLink to={'/branches'}>Branches</NavLink>
                                <NavLink to={'/dashboard'}>Centers</NavLink>
                                <NavLink to={'/user-management'}>Users</NavLink>
                                <NavLink to={'/communications'}>Communications</NavLink>
                            </DropdownButton>
                            <DropdownButton
                                size="sm"
                                variant="secondary"
                                title="Create"
                                className="headingmenu-dropdown"
                            >
                                <NavLink exact to={'/createnewcustomer'}>Customer</NavLink>
                                <NavLink to={'/create-investmentcustomer'}>Investment Customer</NavLink>
                                <NavLink to={'/dashboard'}>MoneyPal-Nano Customer</NavLink>
                                <NavLink to={'/dashboard'}>Payrolla Customer</NavLink>
                                <NavLink to={'/dashboard'}>Group</NavLink>
                                <NavLink to={'/all-loans/newloan-account'}>Loan Account</NavLink>
                                <NavLink to={'/deposits/newaccount'}>Deposit Account</NavLink>
                                <NavLink to={'/administration/access/new-user'}>User</NavLink>
                            </DropdownButton>
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2 noborder-input heading-searchInput" />
                                <NavDropdown title={user.displayName!==undefined?user.displayName:'Unverified Account'} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action">Update profile</NavDropdown.Item>
                                    <NavDropdown.Item href="#action">Account settings</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action">Logout</NavDropdown.Item>
                                </NavDropdown>
                                {/* <Button variant="outline-success">Search</Button> */}
                            </Form>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
                {/* <ul>
                    <li><NavLink to="/">Banklite</NavLink></li>
                    <li><NavLink to="/profile">Segun Owa</NavLink></li>
                </ul> */}
            </div>
        )
    }

  
    componentDidMount() {
    }


    render() {
        
        
        return (
            <Fragment>
                
                <div className="mainheading content-container">
                    <div className="row">
                        {this.renderHeadingWrap()}

                    </div>
                </div>
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    return {
        user : state.authReducers.LoginReducer
    };
}

export default connect(mapStateToProps)(MainHeader);