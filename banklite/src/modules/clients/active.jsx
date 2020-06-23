import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'

import {clientsActions} from '../../redux/actions/clients/clients.action';
import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'
import "./clients.scss"; 

class ActiveClients extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:'10',
            FullDetails: false,
            CurrentPage:1,
            BranchId: JSON.parse(localStorage.getItem("user")).BranchId,
            ClientState:1
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

    setPagesize = (PageSize, tempData)=>{
        // console.log('----here', PageSize.target.value);
        const {dispatch} = this.props;
        let sizeOfPage = PageSize.target.value,
            {FullDetails, CurrentPage, BranchId,ClientState} = this.state;

        this.setState({PageSize: sizeOfPage});

        let params= `FullDetails=${FullDetails}&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&BranchId=${BranchId}&ClientState=${ClientState}`;
        // this.getClients(params);

        if(tempData){
            dispatch(clientsActions.getClients(params,tempData));
        }else{
            dispatch(clientsActions.getClients(params));
        }
        
    }
    setShowDetails = (FullDetails,tempData)=>{
        const {dispatch} = this.props;
        // console.log('----here', PageSize.target.value);
        let showDetails = FullDetails.target.checked,
            {CurrentPage, PageSize, BranchId,ClientState} = this.state;

        this.setState({FullDetails: showDetails});

        let params= `FullDetails=${showDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&BranchId=${BranchId}&ClientState=${ClientState}`;
        // this.getClients(params);

        if(tempData){
            dispatch(clientsActions.getClients(params,tempData));
        }else{
            dispatch(clientsActions.getClients(params));
        }

    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize,CurrentPage,FullDetails, BranchId, ClientState} = this.state;

        // this.setState({PageSize: sizeOfPage});

        // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);
        let params= `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${nextPage}&BranchId=${BranchId}&ClientState=${ClientState}`;

        if(tempData){
            dispatch(clientsActions.getClients(params,tempData));
        }else{
            dispatch(clientsActions.getClients(params));
        }
    }

    renderClients =()=>{
        let getClientsRequest = this.props.getClientsReducer;

        let saveRequestData= getClientsRequest.request_data!==undefined?getClientsRequest.request_data.tempData:null;
            switch (getClientsRequest.request_status){
                case (clientsConstants.GET_CLIENTS_PENDING):
                    if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
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
                                        
                                    </div>
                                </div>
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Customer Name</th>
                                            <th>Customer ID</th>
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
                                <div className="table-helper">
                                    <input type="checkbox" name=""
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
                                           onChange={(e)=>this.setPagesize(e, saveRequestData)}
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
                                            <th>Customer Name</th>
                                            <th>Customer ID</th>
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
                                            saveRequestData.map((eachClient, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <tr>
                                                            <td><NavLink to={`/customer/${eachClient.clientEncodedKey}`}>{eachClient.firstName} {eachClient.lastName}</NavLink></td>
                                                            <td><NavLink to={`/customer/${eachClient.clientEncodedKey}`}>{eachClient.clientCode}</NavLink></td>
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
                            </div>
                        )
                    }
                
                case(clientsConstants.GET_CLIENTS_SUCCESS):
                    let allClientsData = getClientsRequest.request_data.response.data;
                    if(allClientsData!==undefined){
                        if(allClientsData.result.length>=1){
                            return(
                                <div>
                                    <div className="table-helper">
                                        <input type="checkbox" name="" 
                                            onChange={(e)=>this.setShowDetails(e, allClientsData.result)}
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
                                                onChange={(e)=>this.setPagesize(e, allClientsData.result)}
                                                value={this.state.PageSize}
                                                className="countdropdown form-control form-control-sm">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="200">200</option>
                                            </select>
                                            <TablePagination
                                                totalPages={allClientsData.totalPages}
                                                currPage={allClientsData.currentPage}
                                                currRecordsCount={allClientsData.result.length}
                                                totalRows={allClientsData.totalRows}
                                                tempData={allClientsData.result}
                                                pagesCountToshow={4}
                                                refreshFunc={this.loadNextPage}
                                            />
                                        </div>
                                    </div>
                                    <TableComponent classnames="striped bordered hover">
                                        <thead>
                                            <tr>
                                                <th>Customer Name</th>
                                                <th>Customer ID</th>
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
                                                allClientsData.result.map((eachClient, index)=>{
                                                    return(
                                                        <Fragment key={index}>
                                                            <tr>
                                                                <td><NavLink to={`/customer/${eachClient.clientEncodedKey}`}>{eachClient.firstName} {eachClient.lastName}</NavLink></td>
                                                                <td><NavLink to={`/customer/${eachClient.clientEncodedKey}`}>{eachClient.clientCode}</NavLink></td>
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
                                                
                                                value={this.state.PageSize}
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
                                                <th>Customer Name</th>
                                                <th>Customer ID</th>
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
                                                <h2>Active Customers</h2>
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


export default connect(mapStateToProps)(ActiveClients);