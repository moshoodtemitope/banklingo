import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import AdminNav from '../_menu'
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../../shared/templates/authed-pagecontainer'

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../../shared/elements/table'
import  TablePagination from '../../../shared/elements/table/pagination'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import {branchActions,branchConstants} from '../../../redux/actions/administration/branch-management.actions';

import "../administration.scss"; 
class BranchListManagement extends React.Component {
    constructor(props) {
        super(props);

        //Adding state to the class
        this.state={
            user:'',
            PageSize:25,
            FullDetails: false,
            CurrentPage:1,
            CurrentSelectedPage:1
        }
    }


    componentDidMount(){
        this.retrieveFromApi();
    }

  
    setPagesize = (event, tempData)=>{
        const {dispatch} = this.props;
       
        this.setState({PageSize: event.target.value});
        this.retrieveFromApi(tempData);
      
    }

    retrieveFromApi = (tempData)=>{

        const {dispatch} = this.props;        
        let  {PageSize,FullDetails, CurrentPage, CurrentSelectedPage} = this.state;
        let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;
        
        if(tempData){
            dispatch(branchActions.getAllBranches(params, tempData));
        }else{
            dispatch(branchActions.getAllBranches(params));
        }
        
    }
    loadNextPage = (nextPage, tempData)=>{
        //next Page and tempData are properties of the TablePagination
        const {dispatch} = this.props;
        
        this.setState({CurrentPage: nextPage});
        this.retrieveFromApi(tempData);
       
    }



    setShowDetails = (event,tempData)=>{
        const {dispatch} = this.props;
        // console.log('----here', PageSize.target.value);
        let showDetails = event.target.checked, {CurrentPage, CurrentSelectedPage, PageSize} = this.state;
        this.setState({FullDetails: showDetails});
           this.retrieveFromApi(tempData);

    }



    
fetchForEmptyState=()=>{
    //This function returns the biew for empty list                                                                                                                                   
    let adminGetAllBranchesRequest = this.props.adminGetAllBranches;
    let saveRequestData= adminGetAllBranchesRequest.request_data!==undefined? adminGetAllBranchesRequest.request_data.tempData: null;
    switch (adminGetAllBranchesRequest.request_status){
        case (branchConstants.GET_ALL_BRANCHES_PENDING):
            
    return (<tbody><tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr></tbody>);
    default: return  (<tbody></tbody>);
    }
}

fetchErrorState(){
    let adminGetAllBranchesRequest = this.props.adminGetAllBranches;
  //  let saveRequestData= adminGetAllBranchesRequest.request_data!==undefined? adminGetAllBranchesRequest.request_data.tempData: null;

    switch(adminGetAllBranchesRequest.request_status){
        case (branchConstants.GET_ALL_BRANCHES_FAILURE):
            return (
                <div className="loading-content errormsg"> 
                    <div>{adminGetAllBranchesRequest.request_data.error}</div>
                </div>
            );
            default: return null;

    };
    
}


    fetchForDataState=()=> {
    let adminGetAllBranchesRequest = this.props.adminGetAllBranches;
   // let allBranchesData = adminGetAllBranchesRequest.request_data.response.data;
    
    switch(adminGetAllBranchesRequest.request_status){
    case(branchConstants.GET_ALL_BRANCHES_SUCCESS):
     let allBranchesData = adminGetAllBranchesRequest.request_data.response.data;
                   
    
        return (     <tbody>{
            
          
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
                            <td>
                                <DropdownButton
                                    size="sm"
                                    title="Actions"
                                    key="activeCurrency"
                                    className="customone"
                                >
                                    <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink>
                                   
                                </DropdownButton>
                            </td>
                        </tr>
                    </Fragment>
                )
            })
        }</tbody>);
  
    default: return null;
}
    }

    fetchForBusyState(){
        

        let adminGetAllBranchesRequest = this.props.adminGetAllBranches;

        switch (adminGetAllBranchesRequest.request_status){
            case (branchConstants.GET_ALL_BRANCHES_PENDING):

                return (  <div className="loading-content">
                     <div className="loading-text">Please wait...</div></div>);
        default: return null;
        }
    }

    fetchPageList() {
        
        let adminGetAllBranchesRequest = this.props.adminGetAllBranches;


        let responseData = adminGetAllBranchesRequest.request_data?.response?.data;

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
                        onChange={(e)=>this.setPagesize(e, responseData?.result)}
                        value={this.state.PageSize}
                        className="countdropdown form-control form-control-sm">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="200">200</option>
                    </select>
                    <TablePagination
                            totalPages={responseData?.totalPages??0}
                            currPage={responseData?.currentPage??0}
                            currRecordsCount={responseData?.result.length??0}
                            totalRows={responseData?.totalRows??0}
                            tempData={responseData?.result??0}
                            pagesCountToshow={4}
                            refreshFunc={this.loadNextPage}
                        />
                </div>
            </div>
            <div className="table-helper mb-10">
                <input type="checkbox" name="" 
                     onChange={(e)=>this.setShowDetails(e, responseData.result)}
                   
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
                        <th></th>
                    </tr>
                </thead>
            


              {this.fetchForEmptyState()}  
              {this.fetchErrorState()}
              {this.fetchForDataState()}
             

                
            </TableComponent>
            {this.fetchForBusyState()}
            
            <div className="footer-with-cta toleft">
                <NavLink to={'/administration/organization/newbranch'} className="btn btn-primary">New Branch</NavLink>
            </div>
        </div>
    );
        }

   

    render() {
        return (
            // This section below excludes the applications main menu
            <Fragment>
                <InnerPageContainer {...this.props}>
                    <div className="content-wrapper">
                        <div className="module-heading">

                            {/* Below is the section for the module main title */}
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
                                    {/* Below is the navigation bar for the component */}
                                    <AdminNav /> 
                                    <div className="lowerlevel-menu">
                                        <ul className="nav">
                                            <li>
                                                {/* <NavLink to={'/administration-generalorganization'}>Organization</NavLink> */}
                                                <NavLink exact to={'/administration/organization'}>Branches</NavLink>
                                            </li>
                                            {/* <li>
                                                <NavLink to={'/administration/organization/centers'}>Centers</NavLink>
                                                
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
                                                {
                                                // The section below is now for the main content of the page where you have the tables
                                                this.fetchPageList()
                                                }
                                               
                                                
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

export default connect(mapStateToProps)(BranchListManagement);