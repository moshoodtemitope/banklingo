import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
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
            PageSize:'50',
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

    setPagesize = (PageSize)=>{
        // console.log('----here', PageSize.target.value);
        const {dispatch} = this.props;
        let sizeOfPage = PageSize.target.value,
            {CurrentPage} = this.state;

        this.setState({PageSize: sizeOfPage});

        let params ={
            PageSize:sizeOfPage
            ,CurrentPage
        };
       
        dispatch(administrationActions.getRoles(params));
    }

    renderRoles =()=>{
        let GetRolesRequest = this.props.GetRoles;

        switch (GetRolesRequest.request_status){
            case (administrationConstants.GET_ROLES_PENDING):
                return (
                    <div className="loading-content"> 
                        <div className="loading-text">Please wait... </div>
                    </div>
                )
            case(administrationConstants.GET_ROLES_SUCCESS):
                let rolesDataData = GetRolesRequest.request_data.response.data;

                if(rolesDataData!==undefined){
                    if(rolesDataData.length>=1){
                        return(
                            <div>
                                
                                <div className="heading-with-cta toleft">
                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow"
                                            onChange={this.setPagesize}
                                            value={this.state.PageSize}
                                            className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                        {/* <div className="move-page-actions">
                                            <div className="each-page-action">
                                                <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                                            </div>
                                            <div className="each-page-action">
                                                <img alt="go backward" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAAJ0lEQVR42mNgoBj09PT8xyqIIQETRJFAFoRLoAsS1oHXDryuQvcHAJqKQewTJHmSAAAAAElFTkSuQmCC" width="6" height="11" />
                                            </div>
                                            <div className="page-count">
                                                <span>1-{this.state.PageSize}</span>  of <span>{allBranchesData.totalRows}</span>
                                            </div>
                                            <div className="each-page-action">
                                                <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" />
                                            </div>
                                            <div className="each-page-action">
                                                <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                                            </div>
                                        </div> */}
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
                                No Role has been created
                                <div className="footer-with-cta centered">
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
                            <div>An error occured please try again</div>
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
                                    <ul className="nav">
                                        <li>
                                            {/* <NavLink to={'/administration-generalorganization'}>General</NavLink> */}
                                            <NavLink to={'/administration/general'}>General</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/organization'}>Organization</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/access'}>Access</NavLink>
                                        </li>
                                        {/* <li>
                                            <NavLink to={'/administration/products'}>Products</NavLink>
                                        </li> */}
                                        <li>
                                            <NavLink to={'/administration/sms'}>SMS</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/email'}>Email</NavLink>
                                        </li>
                                    </ul>
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