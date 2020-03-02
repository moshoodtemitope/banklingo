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
import { history } from '../../../_helpers/history';
import {authActions} from '../../../redux/actions/auth/auth.action';

import {saveRouteForRedirect} from "../../utils";
// import {Nav, NavDropdown, Navbar, Form, Button, FormControl} from 'react-bootstrap'

import {administrationActions} from '../../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../../redux/actiontypes/administration/administration.constants'
import "./mainheader.scss"; 
class MainHeader extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            user:JSON.parse(localStorage.getItem("user")),
            activeBranch:JSON.parse(localStorage.getItem("user")).BranchName,
            showDropdown: false
        }
    //    if(Object.keys(this.props.user).length<=1){
    //         history.push('/');
    //    }
    
    }

    componentDidMount(){
        this.getCustomerTypes();
    }

    handleCurrentBranchClicked = () =>{
        let {user} = this.state;
        if(user.AllowedBranches.length>1){
            this.setState({showDropdown: true})
        }
        
    }

    chooseBranch = (e)=>{
        
        let user = JSON.parse(localStorage.getItem("user"));
            user.BranchId = e.target.value;
            localStorage.setItem('user', JSON.stringify(user));
            let selectedBranch = user.AllowedBranches(branch=>branch.id===parseInt(e.target.value))[0].name;
        this.setState({showDropdown: false, 
                        activeBranch: selectedBranch
                    })
    }

    logout =()=>{
        const { dispatch } = this.props;
        // let currentRoute = window.location.pathname;

        // dispatch(authActions.Logout("timeout",currentRoute));

        dispatch(authActions.Logout());
        
        localStorage.removeItem("user");
        history.push('/');
    }

    getCustomerTypes = ()=>{
        const {dispatch} = this.props;
        
        dispatch(administrationActions.getAllCustomerTypes());
    }

    renderCreateMenu =()=>{
        let adminGetCustomerTypesRequest = this.props.adminGetCustomerTypes;
        switch(adminGetCustomerTypesRequest.request_status){
            case (administrationConstants.GET_ALL_CUSTOMERTYPES_SUCCESS):{
                let allCustomerTypesData = adminGetCustomerTypesRequest.request_data.response.data||adminGetCustomerTypesRequest.request_data.response,
                    allCustomerTypes=[];
                    // console.log("====", allCustomerTypesData);
                if(allCustomerTypesData.length>=1){
                    return(
                    
                        <DropdownButton
                            size="sm"
                            variant="secondary"
                            title="Create"
                            className="headingmenu-dropdown"
                            >
                                {
                                    allCustomerTypesData.map((eachType, id)=>{
                                        // allCustomerTypes.push({label: eachType.name, value:eachType.id});
                                        let custType = eachType.name.split(' ').join('');
                                        return(
                                            <NavLink className="menu-grouplist" key={id} exact to={`/clients/new/${custType}/${eachType.id}`}>{eachType.name}</NavLink>
                                        )
                                        //  return( <NavLink to={'/dashboard'}>dsdhsjdhshjd</NavLink>)
                                    })
                                }
                                <NavLink to={'/dashboard'}>Group</NavLink>
                                <NavLink exact to={'/all-loans/newloan-account'}>Loan Account</NavLink>
                                <NavLink to={'/deposits/newaccount'}>Deposit Account</NavLink>
                                <NavLink to={'/administration/access/new-user'}>User</NavLink>
                            </DropdownButton>
                    )
                }
            }
            default :
            return null;
        }
        // return( <NavLink to={'/dashboard'}>dsdhsjdhshjd</NavLink>)
    }

    renderAllowedBranches =()=>{
        let {AllowedBranches} = this.state.user;
        console.log('branches are', AllowedBranches);
        return(
            <select name="" id="" onBlur={this.chooseBranch} onChange={this.chooseBranch}>
                {
                    AllowedBranches.map(eachBranch=>{
                        return(
                            <option key={eachBranch.id} value={eachBranch.id}>{eachBranch.name}</option>
                        )
                        
                    })
                }
                
            </select>
        )
    }

    renderHeadingWrap(){
        // let adminGetCustomerTypesRequest = this.props.adminGetCustomerTypes;
        const {user} = this.state;
        return(
            <div className="mainheader-wrap">
                
                <Navbar  expand="lg">
                    <Navbar.Brand as={Link} to="/dashboard">Empire Trust</Navbar.Brand>
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
                                        {this.renderAllowedBranches()}
                                        
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
                                <NavLink to={'/deposit-transactions'}>Deposit Transactions</NavLink>
                                <NavLink to={'/activities'}>System Activities</NavLink>
                                <NavLink to={'/branches'}>Branches</NavLink>
                                {/* <NavLink to={'/dashboard'}>Centers</NavLink> */}
                                <NavLink to={'/user-management'}>Users</NavLink>
                                <NavLink to={'/communications'}>Communications</NavLink>
                            </DropdownButton>
                            {/* <DropdownButton
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
                            </DropdownButton> */}
                            {this.renderCreateMenu()}
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2 noborder-input heading-searchInput" />
                                <NavDropdown title={user.displayName!==undefined?user.displayName:'Unverified Account'} id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action">Update profile</NavDropdown.Item>
                                    <NavDropdown.Item href="#action">Account settings</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item  onClick={()=>this.logout()}>Logout</NavDropdown.Item>
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
        user : state.authReducers.LoginReducer,
        adminGetCustomerTypes : state.administrationReducers.getAllCustomerTypesReducer,
    };
}

export default connect(mapStateToProps)(MainHeader);