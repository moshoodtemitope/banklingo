import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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

    setPagesize = (PageSize)=>{
        // console.log('----here', PageSize.target.value);
        const {dispatch} = this.props;
        let {CurrentPage}= this.state;
        

        let sizeOfPage = PageSize.target.value;

        this.setState({PageSize: sizeOfPage});
        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;

        
       
        dispatch(administrationActions.getUsers(params));
    }

    getUsers = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(administrationActions.getUsers(paramters));
    }

    renderAllUsers =()=>{
        let adminGetAllUsers = this.props.adminGetAllUsers;

            switch (adminGetAllUsers.request_status){
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
                                    </tr>
                                </tbody>
                            </TableComponent>
                            <div className="loading-text">Please wait... </div>
                        </div>
                    )

                case(administrationConstants.GET_USERS_SUCCESS):
                    let allUsersData = adminGetAllUsers.request_data.response.data;
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
                                                            allUsersData.map((eachUser, index)=>{
                                                                return(
                                                                    <Fragment key={index}>
                                                                        <tr>
                                                                        <td>{eachUser.name}</td>
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