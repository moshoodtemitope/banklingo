import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import "./branches.scss"; 
class BranchesManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:30,
            FullDetails: false,
            CurrentPage:1,
            CurrentSelectedPage:1
        }
        
    }

    componentDidMount(){
        this.loadInitialData();
    }

    loadInitialData=()=>{
        // let params = `PageSize=30`;

        let params= `FullDetails=${this.state.FullDetails}&PageSize=${this.state.PageSize}&CurrentPage=${this.state.CurrentPage}&CurrentSelectedPage=${this.state.CurrentSelectedPage}`;
        this.getAllBranches(params);
    }

    getAllBranches = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(administrationActions.getAllBranches(paramters));
    }

    setPagesize = (PageSize, tempData)=>{
        const {dispatch} = this.props;
        let sizeOfPage = PageSize.target.value,
            {FullDetails, CurrentPage, CurrentSelectedPage} = this.state;

        this.setState({PageSize: sizeOfPage});

        let params= `FullDetails=${FullDetails}&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;
        // this.getAllBranches(params);

        if(tempData){
            
            dispatch(administrationActions.getAllBranches(params,tempData));
        }else{
            dispatch(administrationActions.getAllBranches(params));
        }
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize,CurrentPage,FullDetails} = this.state;

        // this.setState({PageSize: sizeOfPage});

        // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);
        let params= `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${nextPage}`;

        if(tempData){
            dispatch(administrationActions.getAllBranches(params,tempData));
        }else{
            dispatch(administrationActions.getAllBranches(params));
        }
    }

    setShowDetails = (FullDetails, tempData)=>{
        const {dispatch} = this.props;
        let showDetails = FullDetails.target.checked,
            {CurrentPage, CurrentSelectedPage, PageSize} = this.state;

        this.setState({FullDetails: showDetails});

        let params= `FullDetails=${showDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;
        if(tempData){
            dispatch(administrationActions.getAllBranches(params,tempData));
        }else{
            dispatch(administrationActions.getAllBranches(params));
        }
        
        // this.getAllBranches(params);
    }

    renderAllBranches =()=>{
        let adminGetAllBranchesRequest = this.props.adminGetAllBranches;

        let saveRequestData= adminGetAllBranchesRequest.request_data!==undefined?adminGetAllBranchesRequest.request_data.tempData:null;
            switch (adminGetAllBranchesRequest.request_status){
                case (administrationConstants.GET_ALL_BRANCHES_PENDING):
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
                                            <th>Branch Name</th>
                                            <th>Branch State</th>
                                            <th>Created</th>
                                            <th>Last Modified</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
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
                                            <th>Branch Name</th>
                                            <th>Branch State</th>
                                            {this.state.FullDetails && <th>Address</th> }
                                            {this.state.FullDetails && <th>Contact</th> }
                                            <th>Created</th>
                                            <th>Last Modified</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            saveRequestData.map((eachBranch, index)=>{
                                                return(
                                                    <Fragment key={index}>
                                                        <tr>
                                                            <td>{eachBranch.name}</td>
                                                            <td>{eachBranch.objectStateDescription}</td>
                                                            {this.state.FullDetails && <th>{eachBranch.address}</th> }
                                                            {this.state.FullDetails && <th>{eachBranch.contact}</th> }
                                                            <td>{eachBranch.dateCreated}</td>
                                                            <td>{eachBranch.lastUpdated}</td>
                                                            
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
                
                case(administrationConstants.GET_ALL_BRANCHES_SUCCESS):
                    let allBranchesData = adminGetAllBranchesRequest.request_data.response.data;
                    if(allBranchesData!==undefined){
                        if(allBranchesData.result.length>=1){
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
                                                onChange={(e)=>this.setPagesize(e, allBranchesData)}
                                                value={this.state.PageSize}
                                                className="countdropdown form-control form-control-sm">
                                                <option value="10">10</option>
                                                <option value="25">25</option>
                                                <option value="50">50</option>
                                                <option value="200">200</option>
                                            </select>
                                            <TablePagination
                                                totalPages={allBranchesData.totalPages}
                                                currPage={allBranchesData.currentPage}
                                                currRecordsCount={allBranchesData.result.length}
                                                totalRows={allBranchesData.totalRows}
                                                tempData={allBranchesData.result}
                                                pagesCountToshow={4}
                                                refreshFunc={this.loadNextPage}
                                            />
                                        </div>
                                    </div>
                                    <div className="table-helper mb-20">
                                        <input type="checkbox" name="" 
                                            onChange={(e)=>this.setShowDetails(e, allBranchesData)}
                                            
                                            checked={this.state.FullDetails}
                                            id="showFullDetails" />
                                        <label htmlFor="showFullDetails">Show full details</label>
                                    </div>
                                   
                                    <TableComponent classnames="striped bordered hover">
                                        <thead>
                                            <tr>
                                                <th>Branch Name</th>
                                                <th>Branch State</th>
                                                {this.state.FullDetails && <th>Address</th> }
                                                {this.state.FullDetails && <th>Contact</th> }
                                                <th>Created</th>
                                                <th>Last Modified</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                allBranchesData.result.map((eachBranch, index)=>{
                                                    return(
                                                        <Fragment key={index}>
                                                            <tr>
                                                                <td>{eachBranch.name}</td>
                                                                <td>{eachBranch.objectStateDescription}</td>
                                                                {this.state.FullDetails && <th>{eachBranch.address}</th> }
                                                                {this.state.FullDetails && <th>{eachBranch.contact}</th> }
                                                                <td>{eachBranch.dateCreated}</td>
                                                                <td>{eachBranch.lastUpdated}</td>
                                                                
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
                                    <TableComponent classnames="striped bordered hover">
                                        <thead>
                                            <tr>
                                                <th>Branch Name</th>
                                                <th>Branch State</th>
                                                <th>Created</th>
                                                <th>Last Modified</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
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

                case (administrationConstants.GET_ALL_USERS_FAILURE):
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{adminGetAllBranchesRequest.request_data.error}</div>
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
                                                <h2>Branches</h2>
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
                                            {this.renderAllBranches()}
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
        adminGetAllBranches : state.administrationReducers.adminGetAllBranchesReducer,
    };
}

export default connect(mapStateToProps)(BranchesManagement);