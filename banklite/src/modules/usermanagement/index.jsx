import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { NavLink} from 'react-router-dom';

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'

import "./usermanagement.scss"; 
class UserManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:'50',
            CurrentPage:1,
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

        this.setState({PageSize: sizeOfPage});
        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;


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
        let adminGetAllUsers = this.props.adminGetAllUsers;

        let saveRequestData= adminGetAllUsers.request_data!==undefined?adminGetAllUsers.request_data.tempData:null;
            switch (adminGetAllUsers.request_status){
                case (administrationConstants.GET_USERS_PENDING):
                    if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
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
                                            <th>Fullame</th>
                                            <th>User Name</th>
                                            <th>Title</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Last updated</th>
                                            <th>State</th>
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
                                            // value={this.state.PageSize}
                                            className="countdropdown form-control form-control-sm">
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
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    saveRequestData.result.map((eachUser, index)=>{
                                                        return(
                                                            <Fragment key={index}>
                                                                <tr>
                                                                    <td>
                                                                        <NavLink to={`/user/${eachUser.encodedKey}`}>{eachUser.name}</NavLink>
                                                                    </td>
                                                                    <td>
                                                                        <NavLink to={`/user/${eachUser.encodedKey}`}>{eachUser.userName}</NavLink>
                                                                    </td>
                                                                    
                                                                    <td>{eachUser.title}</td>
                                                                    <td>{eachUser.emailAddress}</td>
                                                                    <td>{eachUser.role}</td>
                                                                    <td>{eachUser.lastUpdated}</td>
                                                                    <td>{eachUser.objectStateDescription}</td>
                                                                </tr>
                                                            </Fragment>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                </TableComponent>
                                

                            </div>
                        )
                    }

                case(administrationConstants.GET_USERS_SUCCESS):
                    let allUsersData = adminGetAllUsers.request_data.response.data;
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
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            allUsersData.result.map((eachUser, index)=>{
                                                                return(
                                                                    <Fragment key={index}>
                                                                        <tr>
                                                                            <td>
                                                                                <NavLink to={`/user/${eachUser.encodedKey}`}>{eachUser.name}</NavLink>
                                                                            </td>
                                                                            <td>
                                                                                <NavLink to={`/user/${eachUser.encodedKey}`}>{eachUser.userName}</NavLink>
                                                                            </td>
                                                                            
                                                                            <td>{eachUser.title}</td>
                                                                            <td>{eachUser.emailAddress}</td>
                                                                            <td>{eachUser.role}</td>
                                                                            <td>{eachUser.lastUpdated}</td>
                                                                            <td>{eachUser.objectStateDescription}</td>
                                                                        </tr>
                                                                    </Fragment>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                        </TableComponent>
                                        

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
                                                    <th>Fullname</th>
                                                    <th>User Name</th>
                                                    <th>Title</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th>Last updated</th>
                                                    <th>State</th>
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
                                                </tr>
                                            </tbody>
                                        </TableComponent>
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
                            <div>{adminGetAllUsers.request_data.error}</div>
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
                                                <h2>Users</h2>
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
                                                {/* <div className="heading-with-cta">
                                                    <Form className="one-liner">
                                                        
                                                        <Form.Group controlId="filterDropdown">
                                                        <Form.Label> </Form.Label>
                                                            <Form.Control as="select" size="sm">
                                                                <option>No Filter</option>
                                                                <option>Add New Filter</option>
                                                                <option>Custom Filter</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                        <Button variant="primary" type="submit">Filter</Button>
                                                    </Form>
                                                    <Button>Edit Columns</Button>
                                                </div> */}
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
        adminGetAllUsers : state.administrationReducers.adminGetUsersReducer,
    };
}

export default connect(mapStateToProps) (UserManagement);