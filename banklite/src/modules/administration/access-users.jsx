import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import AdminNav from './_menu'
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'

import AccessNav from './menus/_access-menu'
// import Alert from 'react-bootstrap/Alert'
// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class AccessUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:25,
            CurrentPage:1,
            refresh: false
        }

        
    }

    componentDidMount(){
        this.loadInitialData();
    }

    loadInitialData=()=>{
        let {PageSize, CurrentPage}= this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
        this.getUsers(params);
    }

    setPagesize = (PageSize, tempData)=>{
        // console.log('----here', PageSize.target.value);
        const {dispatch} = this.props;
        let {CurrentPage}= this.state;
        

        let sizeOfPage = PageSize.target.value;

        this.setState({PageSize: sizeOfPage, refresh: true});
        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;

        if(tempData){
            
            dispatch(administrationActions.getUsers(params,tempData));
        }else{
            dispatch(administrationActions.getUsers(params));
        }
        
       
    }


    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize, CurrentPage} = this.state;

        // this.setState({PageSize: sizeOfPage});

        let params = `PageSize=${PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);


        if(tempData){
            dispatch(administrationActions.getUsers(params,tempData));
        }else{
            dispatch(administrationActions.getUsers(params));
        }
    }

    getUsers = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(administrationActions.getUsers(paramters));
    }

    renderAllUsers =()=>{
        let adminGetUsersRequest = this.props.adminGetUsers;

        let saveRequestData= adminGetUsersRequest.request_data!==undefined?adminGetUsersRequest.request_data.tempData:null;
            switch (adminGetUsersRequest.request_status){
                case (administrationConstants.GET_USERS_PENDING):
                    if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.result.length<1)){
                        return (
                            <div className="loading-content"> 
                                <div className="heading-with-cta">
                                    <Form className="one-liner">

                                        <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                            <Form.Control as="select" size="sm">
                                                <option>No Filter</option>
                                                <option>Add New Filter</option>
                                                <option>Custom Filter</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                    </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow" className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                    </div>
                                </div>
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Fullname</th>
                                            <th>User Name</th>
                                            <th>Title</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Last updated</th>
                                            <th>State</th>
                                            <th>Created by</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </TableComponent>
                                <div className="loading-text">Please wait... </div>
                            </div>
                        )
                    }else{
                        return(
                            <div>
                                <div className="heading-with-cta">
                                    <Form className="one-liner">

                                        <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                            <Form.Control as="select" size="sm">
                                                <option>No Filter</option>
                                                <option>Add New Filter</option>
                                                <option>Custom Filter</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                    </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow" 
                                            // onChange={this.setPagesize}
                                            value={this.state.PageSize}
                                            className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                        
                                    </div>
                                </div>
                                <div className="loading-text">Please wait... </div>
                                <TableComponent classnames="striped bordered hover">
                                            <thead>
                                                <tr>
                                                    <th>Fullname</th>
                                                    <th>User Name</th>
                                                    <th>Title</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th>Last updated</th>
                                                    <th>State</th>
                                                    <th>Created by</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    saveRequestData.result.map((eachUser, index)=>{
                                                        return(
                                                            <Fragment key={index}>
                                                                <tr>
                                                                    <td>
                                                                       <NavLink to={`/user/${eachUser.encodedKey}`}> {eachUser.name}</NavLink>
                                                                    </td>
                                                                    <td>
                                                                        <NavLink to={`/user/${eachUser.encodedKey}`}>{eachUser.userName}</NavLink>
                                                                    </td>
                                                                    <td>{eachUser.title}</td>
                                                                    <td>{eachUser.emailAddress}</td>
                                                                    <td>{eachUser.role}</td>
                                                                    <td>{eachUser.lastUpdated}</td>
                                                                    <td>{eachUser.objectStateDescription}</td>
                                                                    <td>{(eachUser.createdBy!=="" && eachUser.createdBy!==null)?eachUser.createdBy: "-"}</td>
                                                                    <td>
                                                                        {eachUser.encodedKey !==null &&
                                                                        <DropdownButton
                                                                            size="sm"
                                                                            title="Actions"
                                                                            key="editUser"
                                                                            className="customone"
                                                                        >
                                                                            <NavLink className="dropdown-item" to={`/administration/access/edit-user/${eachUser.encodedKey}`}>Edit</NavLink>
                                                                            {/* <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
                                                                                <Dropdown.Item eventKey="1">Edit</Dropdown.Item> */}
                                                                        </DropdownButton>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            </Fragment>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                            
                                </TableComponent>
                                <div className="footer-with-cta toleft">
                                    <NavLink to={'/administration/access/new-user'} className="btn btn-primary">Create New User</NavLink>
                                </div>

                            </div>
                        )
                    }

                case(administrationConstants.GET_USERS_SUCCESS):
                    let allUsersData = adminGetUsersRequest.request_data.response.data;
                        if(allUsersData!==undefined){
                            if(allUsersData.result.length>=1){
                                return(
                                    <div>
                                        <div className="heading-with-cta">
                                            <Form className="one-liner">

                                                <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                                    <Form.Control as="select" size="sm">
                                                        <option>No Filter</option>
                                                        <option>Add New Filter</option>
                                                        <option>Custom Filter</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                            </Form>

                                            <div className="pagination-wrap">
                                                <label htmlFor="toshow">Show</label>
                                                <select id="toshow" 
                                                    onChange={(e)=>this.setPagesize(e, allUsersData)}
                                                    value={this.state.PageSize}
                                                    className="countdropdown form-control form-control-sm">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="200">200</option>
                                                </select>
                                                <TablePagination
                                                    totalPages={allUsersData.totalPages}
                                                    currPage={allUsersData.currentPage}
                                                    currRecordsCount={allUsersData.result.length}
                                                    totalRows={allUsersData.totalRows}
                                                    tempData={allUsersData.result}
                                                    pagesCountToshow={4}
                                                    refreshFunc={this.loadNextPage}
                                                />
                                            </div>
                                        </div>
                                        <TableComponent classnames="striped bordered hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Fullname</th>
                                                            <th>User Name</th>
                                                            <th>Title</th>
                                                            <th>Email</th>
                                                            <th>Role</th>
                                                            <th>Last updated</th>
                                                            <th>State</th>
                                                            <th>Created by</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            allUsersData.result.map((eachUser, index)=>{
                                                                return(
                                                                    <Fragment key={index}>
                                                                        <tr>
                                                                            <td>
                                                                               <NavLink to={`/user/${eachUser.encodedKey}`}> {eachUser.name}</NavLink>
                                                                            </td>
                                                                            <td>
                                                                                <NavLink to={`/user/${eachUser.encodedKey}`}>{eachUser.userName}</NavLink>
                                                                            </td>
                                                                            <td>{eachUser.title}</td>
                                                                            <td>{eachUser.emailAddress}</td>
                                                                            <td>{eachUser.role}</td>
                                                                            <td>{eachUser.lastUpdated}</td>
                                                                            <td>{eachUser.objectStateDescription}</td>
                                                                            {
                                                                                (eachUser.createdByUserEncodedKey!=="" && eachUser.createdByUserEncodedKey!==null) &&
                                                                                <td>
                                                                                    <NavLink to={`/user/${eachUser.createdByUserEncodedKey}`}>
                                                                                        {(eachUser.createdBy!=="" && eachUser.createdBy!==null)?eachUser.createdBy: "-"}
                                                                                    </NavLink>
                                                                                </td>
                                                                            }
                                                                             {
                                                                                (eachUser.createdByUserEncodedKey==="" || eachUser.createdByUserEncodedKey===null) &&
                                                                                <td>{(eachUser.createdBy!=="" && eachUser.createdBy!==null)?eachUser.createdBy: "-"}</td>
                                                                            }
                                                                            
                                                                            <td>
                                                                            {eachUser.encodedKey !==null &&
                                                                                <DropdownButton
                                                                                    size="sm"
                                                                                    title="Actions"
                                                                                    key="editUser"
                                                                                    className="customone"
                                                                                >
                                                                                    <NavLink className="dropdown-item" to={`/administration/access/edit-user/${eachUser.encodedKey}`}>Edit</NavLink>
                                                                                    {/* <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
                                                                                        <Dropdown.Item eventKey="1">Edit</Dropdown.Item> */}
                                                                                </DropdownButton>
                                                                            }
                                                                            </td>
                                                                        </tr>
                                                                    </Fragment>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                    
                                        </TableComponent>
                                        <div className="footer-with-cta toleft">
                                            <NavLink to={'/administration/access/new-user'} className="btn btn-primary">Create New User</NavLink>
                                        </div>

                                    </div>
                                )
                            }else{
                                return(
                                        <div className="no-records">
                                            <div className="heading-with-cta">
                                            <Form className="one-liner">

                                                <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                                    <Form.Control as="select" size="sm">
                                                        <option>No Filter</option>
                                                        <option>Add New Filter</option>
                                                        <option>Custom Filter</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                            </Form>

                                            <div className="pagination-wrap">
                                                <label htmlFor="toshow">Show</label>
                                                <select id="toshow" className="countdropdown form-control form-control-sm">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="200">200</option>
                                                </select>
                                                
                                            </div>
                                        </div>
                                        <TableComponent classnames="striped bordered hover">
                                            <thead>
                                                <tr>
                                                    <th>FullName</th>
                                                    <th>User Name</th>
                                                    <th>Title</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th>Last updated</th>
                                                    <th>State</th>
                                                    <th>Created by</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </TableComponent>
                                            <div className="footer-with-cta toleft">
                                                <NavLink to={'/administration/access/new-user'} className="btn btn-primary">Create New User</NavLink>
                                            </div>
                                        </div>
                                    
                                )
                            }
                        }
                        else{
                            return null;
                        }

                case (administrationConstants.GET_USERS_FAILURE):
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{adminGetUsersRequest.request_data.error}</div>
                        </div>
                    )
                default :
                return null;
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
                                                <h2>Administration</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <AdminNav />
                                    <AccessNav />
                                    {/* <div className="lowerlevel-menu">
                                        <ul className="nav">
                                            <li>
                                                <NavLink exact to={'/administration/access'}>Roles</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/access/users'}>Users</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/access/preferences'}>Preferences</NavLink>
                                            </li>
                                            
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {this.renderAllUsers()}
                                                
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

function mapStateToProps(state) {
    return {
        adminGetUsers : state.administrationReducers.adminGetUsersReducer,
    };
}

export default connect(mapStateToProps) (AccessUsers);