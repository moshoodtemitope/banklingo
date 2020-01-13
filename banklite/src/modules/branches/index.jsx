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
import "./branches.scss"; 
class BranchesManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:'30',
            FullDetails: false,
            CurrentPage:1,
            CurrentSelectedPage:1
        }
        
    }

    componentDidMount(){
        this.loadInitialData();
    }

    loadInitialData=()=>{
        let params = `PageSize=30`;
        this.getAllBranches(params);
    }

    getAllBranches = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(administrationActions.getAllBranches(paramters));
    }

    setPagesize = (PageSize)=>{
        // console.log('----here', PageSize.target.value);
        let sizeOfPage = PageSize.target.value,
            {FullDetails, CurrentPage, CurrentSelectedPage} = this.state;

        this.setState({PageSize: sizeOfPage});

        let params= `FullDetails=${FullDetails}&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;
        this.getAllBranches(params);
    }

    setShowDetails = (FullDetails)=>{
        // console.log('----here', PageSize.target.value);
        let showDetails = FullDetails.target.checked,
            {CurrentPage, CurrentSelectedPage, PageSize} = this.state;

        this.setState({FullDetails: showDetails});

        let params= `FullDetails=${showDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;
        this.getAllBranches(params);
    }

    renderAllBranches =()=>{
        let adminGetAllBranchesRequest = this.props.adminGetAllBranches;
            switch (adminGetAllBranchesRequest.request_status){
                case (administrationConstants.GET_ALL_BRANCHES_PENDING):
                    return (
                        <div className="loading-content"> 
                            <div className="loading-text">Please wait... </div>
                        </div>
                    )
                
                case(administrationConstants.GET_ALL_BRANCHES_SUCCESS):
                    let allBranchesData = adminGetAllBranchesRequest.request_data.response.data;
                    if(allBranchesData!==undefined){
                        if(allBranchesData.length>=1){
                            return(
                                <div>
                                    <div className="table-helper">
                                        <input type="checkbox" name="" 
                                            onChange={this.setShowDetails}
                                            checked={this.state.FullDetails}
                                            id="showFullDetails" />
                                        <label htmlFor="showFullDetails">Show full details</label>
                                    </div>
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
                                            <div className="move-page-actions">
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
                                            </div>
                                        </div>
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
                                                allBranchesData.map((eachBranch, index)=>{
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
                                <div className="no-records">No branch has been created</div>
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