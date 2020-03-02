import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import AdminNav from './_menu'
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
// import  SidebarElement from '../../shared/elements/sidebar'
import {getDateFromISO} from '../../shared/utils';
import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import "./administration.scss"; 
class AccessRoles extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:25,
            CurrentPage:1,
        }

        
    }

    componentDidMount(){
        this.getRoles();
    }

    getRoles = ()=>{
        const {dispatch} = this.props;
        let {PageSize, CurrentPage} = this.state,
            params ={
                PageSize,CurrentPage
            }
        dispatch(administrationActions.getRoles(params));
    }

    setPagesize = (PageSize, tempData)=>{
        
        const {dispatch} = this.props;
        let sizeOfPage = PageSize.target.value,
            {CurrentPage} = this.state;

        this.setState({PageSize: sizeOfPage});

        let params ={
            PageSize:sizeOfPage
            ,CurrentPage
        };

        if(tempData){
            
            dispatch(administrationActions.getRoles(params,tempData));
        }else{
            dispatch(administrationActions.getRoles(params));
        }
       
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize, CurrentPage} = this.state;

        // this.setState({PageSize: sizeOfPage});

        // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);

        let params ={
            PageSize
            ,CurrentPage
        };

        if(tempData){
            dispatch(administrationActions.getRoles(params,tempData));
        }else{
            dispatch(administrationActions.getRoles(params));
        }
    }

    renderRoles =()=>{
        let GetRolesRequest = this.props.GetRoles;

        let saveRequestData= GetRolesRequest.request_data!==undefined?GetRolesRequest.request_data.tempData:null;

        switch (GetRolesRequest.request_status){
            
            case (administrationConstants.GET_ROLES_PENDING):
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
                                        <th>Role Name</th>
                                        <th>Created</th>
                                        {/* <th></th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
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
                                        <th>Role Name</th>
                                        <th>Created</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        saveRequestData.map((eachRole, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <tr>
                                                        <td>{eachRole.roleName}</td>
                                                        <td>{getDateFromISO(eachRole.dateCreated)}</td>
                                                        <td>
                                                            <DropdownButton
                                                                size="sm"
                                                                title="Actions"
                                                                key="editRole"
                                                                className="customone"
                                                            >
                                                                <NavLink className="dropdown-item" to={`/administration/access/edit-role/${eachRole.id}`}>Edit</NavLink>
                                                                {/* <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="1">Edit</Dropdown.Item> */}
                                                            </DropdownButton>
                                                        </td>
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
            case(administrationConstants.GET_ROLES_SUCCESS):
                let rolesDataData = GetRolesRequest.request_data.response.data;

                if(rolesDataData!==undefined){
                    if(rolesDataData.result.length>=1){
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
                                            onChange={(e)=>this.setPagesize(e, rolesDataData)}
                                            value={this.state.PageSize}
                                            className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                        <TablePagination
                                            totalPages={rolesDataData.totalPages}
                                            currPage={rolesDataData.currentPage}
                                            currRecordsCount={rolesDataData.result.length}
                                            totalRows={rolesDataData.totalRows}
                                            tempData={rolesDataData.result}
                                            pagesCountToshow={4}
                                            refreshFunc={this.loadNextPage}
                                        />
                                    </div>
                                </div>
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Role Name</th>
                                            <th>Created</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            rolesDataData.map((eachRole, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <tr>
                                                            <td>{eachRole.roleName}</td>
                                                            <td>{getDateFromISO(eachRole.dateCreated)}</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="editRole"
                                                                    className="customone"
                                                                >
                                                                    <NavLink className="dropdown-item" to={`/administration/access/edit-role/${eachRole.id}`}>Edit</NavLink>
                                                                    {/* <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
                                                                        <Dropdown.Item eventKey="1">Edit</Dropdown.Item> */}
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </tbody>
                                </TableComponent>
                                <div className="footer-with-cta toleft">
                                    <NavLink to={'/administration/access/new-role'} className="btn btn-primary">Add Role</NavLink>
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
                                            <th>Role Name</th>
                                            <th>Created</th>
                                            {/* <th></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </TableComponent>
                                <div className="footer-with-cta toleft">
                                <NavLink to={'/administration/access/new-role'} className="btn btn-primary">Add Role</NavLink>
                                </div>
                            </div>
                        )
                    }
                }else{
                        return null;
                }
            case (administrationConstants.GET_ROLES_FAILURE):
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{GetRolesRequest.request_data.error}</div>
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
                                    <div className="lowerlevel-menu">
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
                                            {/* <li>
                                                <NavLink to={'/administration/access/authentication'}>Federated Authentication</NavLink>
                                            </li> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                               {this.renderRoles()}
                                                
                                                {/* <TableComponent classnames="striped bordered hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Roles</th>
                                                            <th>Users</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Operations - Rectify Adjustment</td>
                                                            <td>3</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <NavLink className="dropdown-item" to={'/administration/access/edit-role'}>Edit</NavLink>
                                                                    <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Team Lead - Contact Centre</td>
                                                            <td>3</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <NavLink className="dropdown-item" to={'/administration/access/edit-role'}>Edit</NavLink>
                                                                    <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Collection and Recovery (Team Lead)</td>
                                                            <td>3</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <NavLink className="dropdown-item" to={'/administration/access/edit-role'}>Edit</NavLink>
                                                                    <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Managing Director</td>
                                                            <td>3</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <NavLink className="dropdown-item" to={'/administration/access/edit-role'}>Edit</NavLink>
                                                                    <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </TableComponent>
                                                <div className="footer-with-cta toleft">
                                                    <NavLink to={'/administration/access/new-role'} className="btn btn-primary">Add Role</NavLink>
                                                </div> */}
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
        GetRoles : state.administrationReducers.adminGetRolesReducer,
    };
}

export default connect(mapStateToProps)(AccessRoles);