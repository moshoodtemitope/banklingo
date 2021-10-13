// import * as React from "react";
// // import {Router} from "react-router";

// import {Fragment} from "react";
// import AdminNav from './_menu'
// import { connect } from 'react-redux';

// import { NavLink} from 'react-router-dom';
// import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// // import Form from 'react-bootstrap/Form'
// // import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
// import  TableComponent from '../../shared/elements/table'
// import  TablePagination from '../../shared/elements/table/pagination'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

// import {administrationActions} from '../../redux/actions/administration/administration.action';
// import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
// // import Alert from 'react-bootstrap/Alert'
// // import  SidebarElement from '../../shared/elements/sidebar'
// import "./administration.scss"; 
// class OrganizationBranches extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state={
//             user:'',
//             PageSize:25,
//             FullDetails: false,
//             CurrentPage:1,
//             CurrentSelectedPage:1
//         }

        
//     }

//     componentDidMount(){
//         this.loadInitialData();
//     }

//     loadInitialData=()=>{
//         let {PageSize, CurrentPage}= this.state;
//         let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
//         this.getAllBranches(params);
//     }

//     getAllBranches = (paramters)=>{
//         const {dispatch} = this.props;

//         dispatch(administrationActions.getAllBranches(paramters));
//     }

//     setPagesize = (PageSize, tempData)=>{
//         const {dispatch} = this.props;
//         let sizeOfPage = PageSize.target.value,
//             {FullDetails, CurrentPage, CurrentSelectedPage} = this.state;

//         this.setState({PageSize: sizeOfPage});

//         let params= `FullDetails=${FullDetails}&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;
//         // this.getAllBranches(params);

//         if(tempData){
//             dispatch(administrationActions.getAllBranches(params, tempData));
//         }else{
//             dispatch(administrationActions.getAllBranches(params));
//         }
//     }

//     loadNextPage = (nextPage, tempData)=>{
        
//         const {dispatch} = this.props;
//         let {PageSize} = this.state;

//         // this.setState({PageSize: sizeOfPage});

//         let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
//         // this.getTransactionChannels(params);


//         if(tempData){
//             dispatch(administrationActions.getAllBranches(params,tempData));
//         }else{
//             dispatch(administrationActions.getAllBranches(params));
//         }
//     }

//     setShowDetails = (FullDetails,tempData)=>{
//         const {dispatch} = this.props;
//         // console.log('----here', PageSize.target.value);
//         let showDetails = FullDetails.target.checked,
//             {CurrentPage, CurrentSelectedPage, PageSize} = this.state;

//         this.setState({FullDetails: showDetails});

//         let params= `FullDetails=${showDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;
//         // this.getAllBranches(params);
//         if(tempData){
//             dispatch(administrationActions.getAllBranches(params, tempData));
//         }else{
//             dispatch(administrationActions.getAllBranches(params));
//         }
        
//     }

//     renderAllBranches =()=>{
//         let adminGetAllBranchesRequest = this.props.adminGetAllBranches;

//         let saveRequestData= adminGetAllBranchesRequest.request_data!==undefined?adminGetAllBranchesRequest.request_data.tempData:null;

//             switch (adminGetAllBranchesRequest.request_status){
//                 case (administrationConstants.GET_ALL_BRANCHES_PENDING):
                    
//                     if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
//                         return (
//                             <div className="loading-content"> 
//                                 <div className="heading-with-cta">
//                                     <Form className="one-liner">

//                                         <Form.Group controlId="filterDropdown" className="no-margins pr-10">
//                                             <Form.Control as="select" size="sm">
//                                                 <option>No Filter</option>
//                                                 <option>Add New Filter</option>
//                                                 <option>Custom Filter</option>
//                                             </Form.Control>
//                                         </Form.Group>
//                                         <Button className="no-margins" variant="primary" type="submit">Filter</Button>
//                                     </Form>

//                                     <div className="pagination-wrap">
//                                         <label htmlFor="toshow">Show</label>
//                                         <select id="toshow" className="countdropdown form-control form-control-sm">
//                                             <option value="10">10</option>
//                                             <option value="25">25</option>
//                                             <option value="50">50</option>
//                                             <option value="200">200</option>
//                                         </select>
                                        
//                                     </div>
//                                 </div>


                                
//                                 <TableComponent classnames="striped bordered hover">
//                                     <thead>
//                                         <tr>
//                                             <th>Branch Name</th>
//                                             <th>Branch State</th>
//                                             <th>Created</th>
//                                             <th>Last Modified</th>
//                                             <th></th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td></td>
//                                             <td></td>
//                                             <td></td>
//                                             <td></td>
//                                             <td></td>
//                                         </tr>
//                                     </tbody>
//                                 </TableComponent>
//                                 <div className="loading-text">Please wait... </div>
//                             </div>
//                         )
//                     }else{
//                         return(
//                             <div>
//                                 <div className="heading-with-cta">
//                                     <Form className="one-liner">

//                                         <Form.Group controlId="filterDropdown" className="no-margins pr-10">
//                                             <Form.Control as="select" size="sm">
//                                                 <option>No Filter</option>
//                                                 <option>Add New Filter</option>
//                                                 <option>Custom Filter</option>
//                                             </Form.Control>
//                                         </Form.Group>
//                                         <Button className="no-margins" variant="primary" type="submit">Filter</Button>
//                                     </Form>

//                                     <div className="pagination-wrap">
//                                         <label htmlFor="toshow">Show</label>
//                                         <select id="toshow" 
//                                             // onChange={this.setPagesize}
//                                             value={this.state.PageSize}
//                                             className="countdropdown form-control form-control-sm">
//                                             <option value="10">10</option>
//                                             <option value="25">25</option>
//                                             <option value="50">50</option>
//                                             <option value="200">200</option>
//                                         </select>
                                        
//                                     </div>
//                                 </div>
//                                 <div className="loading-text">Please wait... </div>
//                                 <TableComponent classnames="striped bordered hover">
//                                     <thead>
//                                         <tr>
//                                             <th>Branch Name</th>
//                                             <th>Branch State</th>
//                                             {this.state.FullDetails && <th>Address</th> }
//                                             {this.state.FullDetails && <th>Contact</th> }
//                                             <th>Created</th>
//                                             <th>Last Modified</th>
//                                             <th></th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {
//                                             saveRequestData.map((eachBranch, index)=>{
//                                                 return(
//                                                     <Fragment key={index}>
//                                                         <tr>
//                                                             <td>{eachBranch.name}</td>
//                                                             <td>{eachBranch.objectStateDescription}</td>
//                                                             {this.state.FullDetails && <th>{eachBranch.address}</th> }
//                                                             {this.state.FullDetails && <th>{eachBranch.contact}</th> }
//                                                             <td>{eachBranch.dateCreated}</td>
//                                                             <td>{eachBranch.lastUpdated}</td>
//                                                             <td>
//                                                                 <DropdownButton
//                                                                     size="sm"
//                                                                     title="Actions"
//                                                                     key="activeCurrency"
//                                                                     className="customone"
//                                                                 >
//                                                                     <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink>
//                                                                     {/* <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
//                                                                     <Dropdown.Item eventKey="1">Edit</Dropdown.Item> */}
//                                                                 </DropdownButton>
//                                                             </td>
//                                                         </tr>
//                                                     </Fragment>
//                                                 )
//                                             })
//                                         }
//                                     </tbody>
//                                 </TableComponent>
//                             </div>
//                         )
//                     }
                
//                 case(administrationConstants.GET_ALL_BRANCHES_SUCCESS):
//                     let allBranchesData = adminGetAllBranchesRequest.request_data.response.data;
//                     if(allBranchesData!==undefined){
//                         if(allBranchesData.result.length>=1){
//                             return(
//                                 <div>
//                                     <div className="heading-with-cta">
//                                         <Form className="one-liner">

//                                             <Form.Group controlId="filterDropdown" className="no-margins pr-10">
//                                                 <Form.Control as="select" size="sm">
//                                                     <option>No Filter</option>
//                                                     <option>Add New Filter</option>
//                                                     <option>Custom Filter</option>
//                                                 </Form.Control>
//                                             </Form.Group>
//                                             <Button className="no-margins" variant="primary" type="submit">Filter</Button>
//                                         </Form>

//                                         <div className="pagination-wrap">
//                                             <label htmlFor="toshow">Show</label>
//                                             <select id="toshow" 
//                                                 onChange={(e)=>this.setPagesize(e, allBranchesData.result)}
//                                                 value={this.state.PageSize}
//                                                 className="countdropdown form-control form-control-sm">
//                                                 <option value="10">10</option>
//                                                 <option value="25">25</option>
//                                                 <option value="50">50</option>
//                                                 <option value="200">200</option>
//                                             </select>
//                                             <TablePagination
//                                                     totalPages={allBranchesData.totalPages}
//                                                     currPage={allBranchesData.currentPage}
//                                                     currRecordsCount={allBranchesData.result.length}
//                                                     totalRows={allBranchesData.totalRows}
//                                                     tempData={allBranchesData.result}
//                                                     pagesCountToshow={4}
//                                                     refreshFunc={this.loadNextPage}
//                                                 />
//                                         </div>
//                                     </div>
//                                     <div className="table-helper mb-10">
//                                         <input type="checkbox" name="" 
//                                              onChange={(e)=>this.setShowDetails(e, allBranchesData.result)}
                                           
//                                             checked={this.state.FullDetails}
//                                             id="showFullDetails" />
//                                         <label htmlFor="showFullDetails">Show full details</label>
//                                     </div>
                                    
//                                     <TableComponent classnames="striped bordered hover">
//                                         <thead>
//                                             <tr>
//                                                 <th>Branch Name</th>
//                                                 <th>Branch State</th>
//                                                 {this.state.FullDetails && <th>Address</th> }
//                                                 {this.state.FullDetails && <th>Contact</th> }
//                                                 <th>Created</th>
//                                                 <th>Last Modified</th>
//                                                 <th></th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {
//                                                 allBranchesData.result.map((eachBranch, index)=>{
//                                                     return(
//                                                         <Fragment key={index}>
//                                                             <tr>
//                                                                 <td>{eachBranch.name}</td>
//                                                                 <td>{eachBranch.objectStateDescription}</td>
//                                                                 {this.state.FullDetails && <th>{eachBranch.address}</th> }
//                                                                 {this.state.FullDetails && <th>{eachBranch.contact}</th> }
//                                                                 <td>{eachBranch.dateCreated}</td>
//                                                                 <td>{eachBranch.lastUpdated}</td>
//                                                                 <td>
//                                                                     <DropdownButton
//                                                                         size="sm"
//                                                                         title="Actions"
//                                                                         key="activeCurrency"
//                                                                         className="customone"
//                                                                     >
//                                                                         <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink>
//                                                                         {/* <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
//                                                                         <Dropdown.Item eventKey="1">Edit</Dropdown.Item> */}
//                                                                     </DropdownButton>
//                                                                 </td>
//                                                             </tr>
//                                                         </Fragment>
//                                                     )
//                                                 })
//                                             }
//                                         </tbody>
//                                     </TableComponent>
//                                     <div className="footer-with-cta toleft">
//                                         <NavLink to={'/administration/organization/newbranch'} className="btn btn-primary">New Branch</NavLink>
//                                     </div>
//                                 </div>
//                             )
//                         }else{
//                             return(
//                                 <div className="no-records">
//                                     <div className="heading-with-cta">
//                                         <Form className="one-liner">

//                                             <Form.Group controlId="filterDropdown" className="no-margins pr-10">
//                                                 <Form.Control as="select" size="sm">
//                                                     <option>No Filter</option>
//                                                     <option>Add New Filter</option>
//                                                     <option>Custom Filter</option>
//                                                 </Form.Control>
//                                             </Form.Group>
//                                             <Button className="no-margins" variant="primary" type="submit">Filter</Button>
//                                         </Form>

//                                         <div className="pagination-wrap">
//                                             <label htmlFor="toshow">Show</label>
//                                             <select id="toshow" className="countdropdown form-control form-control-sm">
//                                                 <option value="10">10</option>
//                                                 <option value="25">25</option>
//                                                 <option value="50">50</option>
//                                                 <option value="200">200</option>
//                                             </select>
                                            
//                                         </div>
//                                     </div>
//                                     <TableComponent classnames="striped bordered hover">
//                                         <thead>
//                                             <tr>
//                                                 <th>Branch Name</th>
//                                                 <th>Branch State</th>
//                                                 <th>Created</th>
//                                                 <th>Last Modified</th>
//                                                 {/* <th></th> */}
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             <tr>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                                 <td></td>
//                                             </tr>
//                                         </tbody>
//                                     </TableComponent>
//                                     <div className="footer-with-cta toleft">
//                                         <NavLink to={'/administration/organization/newbranch'} className="btn btn-primary">New Branch</NavLink>
//                                     </div>
//                                 </div>
//                             )
//                         }
//                     }else{
//                         return null;
//                     }

//                 case (administrationConstants.GET_ALL_BRANCHES_FAILURE):
//                     return (
//                         <div className="loading-content errormsg"> 
//                             <div>{adminGetAllBranchesRequest.request_data.error}</div>
//                         </div>
//                     )
//                 default :
//                 return null;
//             }
//     }

    



//     render() {
//         return (
//             <Fragment>
//                 <InnerPageContainer {...this.props}>
//                     <div className="content-wrapper">
//                         <div className="module-heading">
//                             <div className="module-title">
//                                 <div className="content-container">
//                                     <div className="row">
//                                         <div className="col-sm-12">
//                                             <div className="">
//                                                 <h2>Administration</h2>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="module-submenu">
//                                 <div className="content-container">
//                                     <AdminNav />
//                                     <div className="lowerlevel-menu">
//                                         <ul className="nav">
//                                             <li>
//                                                 {/* <NavLink to={'/administration-generalorganization'}>Organization</NavLink> */}
//                                                 <NavLink exact to={'/administration/organization'}>Branches</NavLink>
//                                             </li>
//                                             {/* <li>
//                                                 <NavLink to={'/administration/organization/centers'}>Centers</NavLink>
                                                
//                                             </li> */}
//                                         </ul>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="module-content">
//                                 <div className="content-container">
//                                     <div className="row">
                                        
//                                         <div className="col-sm-12">
//                                             <div className="middle-content">
//                                                 {this.renderAllBranches()}
                                               
                                                
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </InnerPageContainer>
//             </Fragment>
//         );
//     }
// }

// function mapStateToProps(state) {
//     return {
//         adminGetAllBranches : state.administrationReducers.adminGetAllBranchesReducer,
//     };
// }

// export default connect(mapStateToProps)(OrganizationBranches);