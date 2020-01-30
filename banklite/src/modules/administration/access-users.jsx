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

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
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

    setPagesize = (PageSize)=>{
        // console.log('----here', PageSize.target.value);
        const {dispatch} = this.props;
        let {CurrentPage}= this.state;
        

        let sizeOfPage = PageSize.target.value;

        this.setState({PageSize: sizeOfPage, refresh: true});
        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;

        
       
        dispatch(administrationActions.getUsers(params));
    }

    getUsers = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(administrationActions.getUsers(paramters));
    }

    renderAllUsers =()=>{
        let adminGetUsersRequest = this.props.adminGetUsers;

            switch (adminGetUsersRequest.request_status){
                case (administrationConstants.GET_USERS_PENDING):
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
                                    <div className="move-page-actions">
                                        <div className="each-page-action">
                                            <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                                        </div>
                                        <div className="each-page-action">
                                            <img alt="go backward" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAAJ0lEQVR42mNgoBj09PT8xyqIIQETRJFAFoRLoAsS1oHXDryuQvcHAJqKQewTJHmSAAAAAElFTkSuQmCC" width="6" height="11" />
                                        </div>
                                        <div className="page-count">
                                            <span>1-20</span>  of <span>20000</span>
                                        </div>
                                        <div className="each-page-action">
                                            <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" />
                                        </div>
                                        <div className="each-page-action">
                                            <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                                        </div>
                                    </div>
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
                                        {/* <th></th> */}
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

                case(administrationConstants.GET_USERS_SUCCESS):
                    let allUsersData = adminGetUsersRequest.request_data.response.data;
                        if(allUsersData!==undefined){
                            if(allUsersData.length>=1){
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
                                                    onChange={this.setPagesize}
                                                    value={this.state.PageSize}
                                                    className="countdropdown form-control form-control-sm">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="200">200</option>
                                                </select>
                                                <div className="move-page-actions">
                                                    <div className="each-page-action">
                                                        <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                                                    </div>
                                                    <div className="each-page-action">
                                                        <img alt="go backward" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAAJ0lEQVR42mNgoBj09PT8xyqIIQETRJFAFoRLoAsS1oHXDryuQvcHAJqKQewTJHmSAAAAAElFTkSuQmCC" width="6" height="11" />
                                                    </div>
                                                    <div className="page-count">
                                                        <span>1-20</span>  of <span>20000</span>
                                                    </div>
                                                    <div className="each-page-action">
                                                        <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" />
                                                    </div>
                                                    <div className="each-page-action">
                                                        <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                                                    </div>
                                                </div>
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
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            allUsersData.map((eachUser, index)=>{
                                                                return(
                                                                    <Fragment key={index}>
                                                                        <tr>
                                                                            <td>{eachUser.name}</td>
                                                                            <td>{eachUser.userName}</td>
                                                                            <td>{eachUser.title}</td>
                                                                            <td>{eachUser.emailAddress}</td>
                                                                            <td>{eachUser.role}</td>
                                                                            <td>{eachUser.lastUpdated}</td>
                                                                            <td>{eachUser.objectStateDescription}</td>
                                                                            <td>
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
                                                <div className="move-page-actions">
                                                    <div className="each-page-action">
                                                        <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                                                    </div>
                                                    <div className="each-page-action">
                                                        <img alt="go backward" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAAJ0lEQVR42mNgoBj09PT8xyqIIQETRJFAFoRLoAsS1oHXDryuQvcHAJqKQewTJHmSAAAAAElFTkSuQmCC" width="6" height="11" />
                                                    </div>
                                                    <div className="page-count">
                                                        <span>1-20</span>  of <span>20000</span>
                                                    </div>
                                                    <div className="each-page-action">
                                                        <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" />
                                                    </div>
                                                    <div className="each-page-action">
                                                        <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                                                    </div>
                                                </div>
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
                                                    {/* <th></th> */}
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
                                                {this.renderAllUsers()}
                                                {/* <div className="table-helper">
                                                    <input type="checkbox" name="" id="showDeactivted"/>
                                                    <label htmlFor="showDeactivted">Show deactivated/locked users</label>
                                                </div>
                                                <div className="pagination-wrap">
                                                    <label htmlFor="toshow">Show</label>
                                                    <select id="toshow" className="countdropdown form-control form-control-sm">
                                                        <option value="10">10</option>
                                                        <option value="25">25</option>
                                                        <option value="50">50</option>
                                                        <option value="200">200</option>
                                                    </select>
                                                    <div className="move-page-actions">
                                                        <div className="each-page-action">
                                                            <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                                                        </div>
                                                        <div className="each-page-action">
                                                            <img alt="go backward" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAAJ0lEQVR42mNgoBj09PT8xyqIIQETRJFAFoRLoAsS1oHXDryuQvcHAJqKQewTJHmSAAAAAElFTkSuQmCC" width="6" height="11" />
                                                        </div>
                                                        <div className="page-count">
                                                            <span>1-20</span>  of <span>20000</span>
                                                        </div>
                                                        <div className="each-page-action">
                                                            <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" />
                                                        </div>
                                                        <div className="each-page-action">
                                                            <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11"  />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <TableComponent classnames="striped bordered hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Display Name</th>
                                                            <th>User Name</th>
                                                            <th>Title</th>
                                                            <th>Email</th>
                                                            <th>Last Login</th>
                                                            <th>Role</th>
                                                            <th>Administrator</th>
                                                            <th>Teller</th>
                                                            <th>Account Officer</th>
                                                            <th>Mambu Access</th>
                                                            <th>API 1.0 Access</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Yekin Olanrewaju</td>
                                                            <td>yekin.olanrewaju</td>
                                                            <td></td>
                                                            <td>yekin.olanrewaju@zedvance.com</td>
                                                            <td>Never</td>
                                                            <td>Marketing</td>
                                                            <td className="text-center">
                                                                <input type="checkbox" name="" id="" disabled/>
                                                            </td>
                                                            <td className="text-center">
                                                                <input type="checkbox" name="" id="" disabled/>
                                                            </td>
                                                            <td className="text-center">
                                                                <input type="checkbox" name="" checked disabled/>
                                                            </td>
                                                            <td className="text-center">
                                                                <input type="checkbox" name="" checked disabled/>
                                                            </td>
                                                            <td className="text-center">
                                                                <input type="checkbox" name="" id="" disabled/>
                                                            </td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <NavLink className="dropdown-item" to={'/administration/access/edit-user'}>Edit</NavLink>
                                                                    <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Yekin Olanrewaju</td>
                                                            <td>yekin.olanrewaju</td>
                                                            <td></td>
                                                            <td>yekin.olanrewaju@zedvance.com</td>
                                                            <td>Never</td>
                                                            <td>Marketing</td>
                                                            <td className="text-center">
                                                                <input type="checkbox" name="" id="" disabled/>
                                                            </td>
                                                            <td className="text-center">
                                                                <input type="checkbox" name="" id="" disabled/>
                                                            </td>
                                                            <td className="text-center">
                                                                <input type="checkbox" name="" checked disabled/>
                                                            </td>
                                                            <td className="text-center">
                                                                <input type="checkbox" name="" checked disabled/>
                                                            </td>
                                                            <td className="text-center">
                                                                <input type="checkbox" name="" id="" disabled/>
                                                            </td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <NavLink className="dropdown-item" to={'/administration/access/edit-user'}>Edit</NavLink>
                                                                    <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Yekin Olanrewaju</td>
                                                            <td>yekin.olanrewaju</td>
                                                            <td></td>
                                                            <td>yekin.olanrewaju@zedvance.com</td>
                                                            <td>Never</td>
                                                            <td>Marketing</td>
                                                            <td className="text-center">
                                                                <input type="checkbox" name="" id="" disabled/>
                                                            </td>
                                                            <td className="text-center">
                                                                <input type="checkbox" name="" id="" disabled/>
                                                            </td>
                                                            <td className="text-center">
                                                                <input type="checkbox" name="" checked disabled/>
                                                            </td>
                                                            <td className="text-center">
                                                                <input type="checkbox" name="" checked disabled/>
                                                            </td>
                                                            <td className="text-center">
                                                                <input type="checkbox" name="" id="" disabled/>
                                                            </td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <NavLink className="dropdown-item" to={'/administration/access/edit-user'}>Edit</NavLink>
                                                                    <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </TableComponent> 
                                                <div className="footer-with-cta toleft">
                                                <NavLink to={'/administration/access/new-user'} className="btn btn-primary">Create New User</NavLink>
                                                </div>*/}
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