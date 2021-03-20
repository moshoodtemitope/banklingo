import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'

// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
// import  SidebarElement from '../../shared/elements/sidebar'
import "./styles.scss"; 
import { numberWithCommas , getDateFromISO} from '../../shared/utils';


import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'

class MyProfile extends React.Component {
    constructor(props) {
        super(props);
        this.userEncodedKey = this.props.match.params.userid||null;
        this.state={
            user:JSON.parse(localStorage.getItem('lingoAuth')),
            PageSize: 100,
            CurrentPage: 1,
        }
        // console.log('props are', this.props.match.params)
    }

    componentDidMount() {
        this.loadInitialUserData();
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.match.params.userid !== this.props.match.params.userid) {
        
    //         this.userEncodedKey = nextProps.match.params.userid;
    //     }

    // }


    loadInitialUserData = ()=>{
        let { PageSize, CurrentPage} = this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`; 
        const {dispatch} = this.props;
        let adminGetAUserRequest = this.props.adminGetAUserReducer;

        if(this.props.adminGetAUserReducer.request_status === administrationConstants.GET_A_USER_SUCCESS){
            dispatch(administrationActions.getAUserActivities(adminGetAUserRequest.request_data.response.data.encodedKey, params));
        }else{
            // console.log("here mow")
        }

        // this.getUserActivities(null, params);
    }

    getUserActivities = (userEncodedKey, params)=>{
        const {dispatch} = this.props;

        let adminGetAUserRequest = this.props.adminGetAUserReducer;
        if(adminGetAUserRequest.request_status === administrationConstants.GET_A_USER_SUCCESS){
            dispatch(administrationActions.getAUserActivities(adminGetAUserRequest.request_data.response.data.encodedKey, params));
        }
    }



    renderUserActivities =()=>{
        let getAUserActivitiesRequest = this.props.getAUserActivitiesReducer;

        if(getAUserActivitiesRequest.request_status===administrationConstants.GET_A_USER_ACTIVITIES_PENDING){
            return(
                <div className="loading-text">Please wait... </div>
            )
        }


        if(getAUserActivitiesRequest.request_status===administrationConstants.GET_A_USER_ACTIVITIES_SUCCESS){
            let customerActivitiesData = getAUserActivitiesRequest.request_data.response.data;
            if(customerActivitiesData.result.length>=1){
                return(
                    <div className="activities-wrap">
                        {
                            customerActivitiesData.result.map((eachActivity,  index)=>{
                                return(
                                    <div className="each-activity" key={index}>
                                        {/* <span>
                                            <NavLink to='/customer/20/savingsaccount/77339322'>Payroll - Private 2073458499</NavLink>
                                        </span> */}
                                        <span className="activity-action">{eachActivity.action}</span>
                                        <div>
                                            <span className="action-date">{eachActivity.creationDate}</span>
                                            <span className="action-by"> <NavLink to={`/user/${eachActivity.affectedUserNameEncodedKey}`}>{eachActivity.affectedUserName}</NavLink></span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }else{
                return(
                    <div className="activities-wrap">
                        <div>No activities to display</div>
                    </div>
                )
            }
        }



        if(getAUserActivitiesRequest.request_status===administrationConstants.GET_A_USER_ACTIVITIES_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getAUserActivitiesRequest.request_data.error}</div>
            </div>
            )
        }
    }

    
    renderPage = ()=>{
        let adminGetAUserRequest = this.props.adminGetAUserReducer;



        if(adminGetAUserRequest.request_status===administrationConstants.GET_A_USER_SUCCESS){
            let 
                rolesDataData = adminGetAUserRequest.request_data.response2.data,
                branchesData = adminGetAUserRequest.request_data.response3.data,
                allRoles =[],
                allBranches =[];


            rolesDataData.map((eachRole, index)=>{
                allRoles.push({value:eachRole.roleId, label:eachRole.name})
            })

            branchesData.map((eachBranch, index)=>{
                allBranches.push({value:eachBranch.id, label:eachBranch.name})
            })

            let currentRole = rolesDataData.filter(eachrole=>eachrole.roleId===adminGetAUserRequest.request_data.response.data.roleId)[0],
                currentBranch;
                if(adminGetAUserRequest.request_data.response.data.branchId!==null){
                    currentBranch = branchesData.filter(branch=>branch.id===adminGetAUserRequest.request_data.response.data.branchId)[0];
                }else{
                    currentBranch =null;
                }
                    let userDetails = adminGetAUserRequest.request_data.response.data;

                    
                    return(
                        <div className="row">

                            <div className="col-sm-12">
                                <div className="middle-content">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            
                                            <div className="main-details mt-20">
                                                <div className="overview-wrap profile-overview">
                                                    <div className="each-overview">
                                                        <h6>General Information</h6>
                                                        <TableComponent classnames="striped bordered hover">

                                                            <tbody>

                                                                <tr>
                                                                    <td>User Role</td>
                                                                    <td>{currentRole ? currentRole.name:""}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>User Branch</td>
                                                                    <td>{currentBranch ? currentBranch.name:""}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Created</td>
                                                                    <td>{userDetails.dateCreated}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Last Modified</td>
                                                                    <td>{userDetails.lastUpdated}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>User Status</td>
                                                                    <td>{userDetails.objectStateDescription}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Created By</td>
                                                                    <td>{userDetails.createdBy}</td>
                                                                </tr>

                                                            </tbody>
                                                        </TableComponent>
                                                    </div>
                                                    
                                                    <div className="each-overview">
                                                        <h6>Contact</h6>
                                                        <TableComponent classnames="striped bordered hover">

                                                            <tbody>
                                                                <tr>
                                                                    <td>Mobile</td>
                                                                    <td>{userDetails.contact.contactMobile}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Email</td>
                                                                    <td>{userDetails.emailAddress}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Address</td>
                                                                    <td>{userDetails.address.addressLine1},{userDetails.address.addressState},{userDetails.address.addressCountry}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Zip Code</td>
                                                                    <td>{userDetails.address.zipCode}</td>
                                                                </tr>
                                                            </tbody>
                                                        </TableComponent>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="leftside-items">
                                                <h6>Latest Activity </h6>
                                                {this.renderUserActivities()}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
            }
    }
    

    render() {
        
        return (
            <Fragment>
                {/* <InnerPageContainer {...this.props}> */}
                    <div className="content-wrapper">
                        <div className="module-content">
                            <div className="content-container">
                                {this.renderPage()}
                            </div>
                        </div>
                    </div>
                {/* </InnerPageContainer> */}
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        adminGetAUserReducer: state.administrationReducers.adminGetAUserReducer,  
        getAUserActivitiesReducer: state.administrationReducers.getAUserActivitiesReducer, 
    };
}

export default connect(mapStateToProps)(MyProfile);