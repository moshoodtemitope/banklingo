import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'

import {clientsActions} from '../../redux/actions/clients/clients.action';
import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'
import "./clients.scss"; 

class ClientsManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:'30',
            FullDetails: false,
            CurrentPage:1,
            BranchId: JSON.parse(localStorage.getItem("user")).BranchId,
            ClientState:0
        }
    }

    componentDidMount(){
        this.loadInitialData();
    }

    loadInitialData=()=>{
        let {PageSize, CurrentPage, BranchId,ClientState, FullDetails}= this.state;
        let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&BranchId=${BranchId}&ClientState=${ClientState}`;
        this.getClients(params);
    }

    getClients = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(clientsActions.getClients(paramters));
    }

    setPagesize = (PageSize)=>{
        // console.log('----here', PageSize.target.value);
        let sizeOfPage = PageSize.target.value,
            {FullDetails, CurrentPage, BranchId,ClientState} = this.state;

        this.setState({PageSize: sizeOfPage});

        let params= `FullDetails=${FullDetails}&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&BranchId=${BranchId}&ClientState=${ClientState}`;
        this.getClients(params);
    }
    setShowDetails = (FullDetails)=>{
        // console.log('----here', PageSize.target.value);
        let showDetails = FullDetails.target.checked,
            {CurrentPage, PageSize, BranchId,ClientState} = this.state;

        this.setState({FullDetails: showDetails});

        let params= `FullDetails=${showDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&BranchId=${BranchId}&ClientState=${ClientState}`;
        this.getClients(params);
    }

    renderClients =()=>{
        let getClientsRequest = this.props.getClientsReducer;
            switch (getClientsRequest.request_status){
                case (clientsConstants.GET_CLIENTS_PENDING):
                    return (
                        <div className="loading-content"> 
                           <div className="heading-with-cta ">
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
                                        <th>Customer Name</th>
                                        <th>Customer Status</th>
                                        <th>Account Officer</th>
                                        <th>Account Currency</th>
                                        <th>Account Balance</th>
                                        <th>Date Created</th>
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
                                    </tr>
                                </tbody>
                            </TableComponent>
                            <div className="loading-text">Please wait... </div>
                        </div>
                    )
                
                case(clientsConstants.GET_CLIENTS_SUCCESS):
                    let allClientsData = getClientsRequest.request_data.response.data;
                    if(allClientsData!==undefined){
                        if(allClientsData.length>=1){
                            return(
                                <div>
                                    <div className="table-helper">
                                        <input type="checkbox" name="" 
                                            onChange={this.setShowDetails}
                                            checked={this.state.FullDetails}
                                            id="showFullDetails" />
                                        <label htmlFor="showFullDetails">Show full details</label>
                                    </div>
                                    <div className="heading-with-cta ">
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
                                                <th>Customer Name</th>
                                                <th>Customer Status</th>
                                                <th>Account Officer</th>
                                                <th>Account Currency</th>
                                                <th>Account Balance</th>
                                                <th>Date Created</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allClientsData.map((eachClient, index)=>{
                                                    return(
                                                        <Fragment key={index}>
                                                            <tr>
                                                                <td>{eachClient.firstName} {eachClient.lastName}</td>
                                                                <td>{eachClient.clientStateDescription}</td>
                                                                <td>{eachClient.accountOfficer}</td>
                                                                <td>{eachClient.currency}</td>
                                                                <td>{eachClient.totalBalance}</td>
                                                                <td>{eachClient.lastUpdated}</td>
                                                                <td>
                                                                    <DropdownButton
                                                                        size="sm"
                                                                        title="Actions"
                                                                        key="activeCurrency"
                                                                        className="customone"
                                                                    >
                                                                        <NavLink className="dropdown-item" to={`/clients/edit/${eachClient.clientEncodedKey}`}>Edit</NavLink>
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
                                    {/* <div className="footer-with-cta toleft">
                                        <NavLink to={'/clients/new'} className="btn btn-primary">New Customer</NavLink>
                                    </div> */}
                                </div>
                            )
                        }else{
                            return(
                                <div className="no-records">

                                    <div className="heading-with-cta ">
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
                                                <th>Customer Name</th>
                                                <th>Customer Status</th>
                                                <th>Account Officer</th>
                                                <th>Account Currency</th>
                                                <th>Account Balance</th>
                                                <th>Date Created</th>
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
                                            </tr>
                                        </tbody>
                                    </TableComponent>
                                </div>
                            )
                        }
                    }else{
                        return null;
                    }

                case (clientsConstants.GET_CLIENTS_FAILURE):
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{getClientsRequest.request_data.error}</div>
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
                                                <h2>All Customers</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <ul className="nav">
                                        
                                        <li>
                                            <NavLink to={'/clients'}>All</NavLink>
                                        </li>
                                        <li>
                                            <NavLink exact to={'/active-clients'}>Active</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/inactive-clients'}>Inactive</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/clients-pending-approval'}>Pending Approval</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/clients-exited'}>Exited</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/clients-blacklisted'}>Blacklisted</NavLink>
                                        </li>
                                    </ul>
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
                                            <div className="heading-with-cta">
                                                    {/* <h3 className="section-title">Journal Entries</h3> */}
                                                    {/* <Form className="one-liner">
                                                        <Form.Group controlId="periodOptionChosen">
                                                            <Form.Label>Account Officer</Form.Label>
                                                                <Form.Control type="text" size="sm" />
                                                        </Form.Group>
                                                        <Form.Group controlId="filterDropdown">
                                                        <Form.Label> </Form.Label>
                                                            <Form.Control as="select" size="sm">
                                                                <option>No Filter</option>
                                                                <option>Add New Filter</option>
                                                                <option>Custom Filter</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                        <Button variant="primary" type="submit">Filter</Button>
                                                    </Form> */}
                                                    {/* <Button>Edit Columns</Button> */}
                                                </div>
                                               {this.renderClients()}
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
        getClientsReducer : state.clientsReducers.getClientsReducer,
    };
}

export default connect(mapStateToProps)(ClientsManagement);