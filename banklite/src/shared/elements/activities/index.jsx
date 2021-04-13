import * as React from 'react';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import {Fragment} from "react";
import InfoIco from '../../../assets/img/info.svg';
import  ActivityPagination from './pagination'
import { getDateFromISO, numberWithCommas} from '../../utils';
import { dashboardActions } from '../../../redux/actions/dashboard/dashboard.action';
import { dashboardConstants } from '../../../redux/actiontypes/dashboard/dashboard.constants'
import {clientsActions} from '../../../redux/actions/clients/clients.action';

import {clientsConstants} from '../../../redux/actiontypes/clients/clients.constants'

import "./index.scss"; 
class ActivitiesBox extends React.Component{
    constructor(props) {
        super(props);
        
        this.state={
            PageSize: 5,
            CurrentPage: 1,
        }
       
    }


    componentDidMount() {
        this.getActivities()
    }


    getDashboardActivities = ()=>{
        const {dispatch} = this.props;

        let { PageSize, CurrentPage } = this.state;

        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;

        dispatch(dashboardActions.getLoggedInUserActivitiesData(params));
    }

    getClientActivities = ()=>{
        const {dispatch} = this.props;

        let { PageSize, CurrentPage } = this.state;

        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;

        dispatch(clientsActions.getAClientActivities(this.props.clientEncodedKey, params));
    }

    getActivities = ()=>{
        if(this.props.activityType==="logged"){
            this.getDashboardActivities()
        }

        if(this.props.activityType==="client"){
            this.getClientActivities()
        }
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize,CurrentPage} = this.state;

        // this.setState({PageSize: sizeOfPage});

        // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);
        let params = `PageSize=${PageSize}&CurrentPage=${nextPage}&CurrentSelectedPage=${nextPage}`;

        if(tempData){
            if(this.props.activityType==="logged"){
                dispatch(dashboardActions.getLoggedInUserActivitiesData(params, tempData));
            }
            if(this.props.activityType==="client"){
                dispatch(clientsActions.getAClientActivities(this.props.clientEncodedKey, params, tempData));
            }
        }else{
            if(this.props.activityType==="logged"){
                dispatch(dashboardActions.getLoggedInUserActivitiesData(params));
            }
            if(this.props.activityType==="client"){
                dispatch(clientsActions.getAClientActivities(this.props.clientEncodedKey, params));
            }
        }
    }

    renderActivities = ()=>{
        if(this.props.activityType==="logged"){
            return(
                this.renderLoggedUserActivities()
            )
        }
        if(this.props.activityType==="client"){
            return(
                this.renderCustomerActivities()
            )
        }
    }

    setPagesize = (PageSize,tempData) => {
        const {dispatch} = this.props;
        let sizeOfPage = PageSize.target.value,
            {  CurrentPage, CurrentSelectedPage } = this.state;

        this.setState({ PageSize: sizeOfPage });

        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;

        if(tempData){
            if(this.props.activityType==="logged"){
                dispatch(dashboardActions.getLoggedInUserActivitiesData(params, tempData));
            }
            if(this.props.activityType==="client"){
                dispatch(clientsActions.getAClientActivities(this.props.clientEncodedKey, params, tempData));
            }
        }else{
            if(this.props.activityType==="logged"){
                dispatch(dashboardActions.getLoggedInUserActivitiesData(params));
            }
            if(this.props.activityType==="client"){
                dispatch(clientsActions.getAClientActivities(this.props.clientEncodedKey, params));
            }
        }
    }

    renderLoggedUserActivities = ()=>{
        let getLoggedInUserActivitiesRequest = this.props.getLoggedInUserActivitiesReducer;
        let saveRequestData= getLoggedInUserActivitiesRequest.request_data!==undefined?getLoggedInUserActivitiesRequest.request_data.tempData:null;
        
        if(getLoggedInUserActivitiesRequest.request_status===dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_PENDING){
            
            if ((saveRequestData === undefined) || (saveRequestData !== undefined && saveRequestData.result !== undefined && saveRequestData.result.length < 1)){
                return(
                    <div className="each-card-content centered-item">
                        <div className="loading-text">Please wait... </div>
                    </div>
                )
            }else{
                return(
                    <div className="each-card-content">
                        <div className="loading-text">Please wait... </div>
                        <div className="all-activity-items">
                            {
                                saveRequestData.map((eachActivity, index) => {
                                    return (



                                        <div className="each-activity-item" key={index}>
                                            <div className="activity-icon">
                                                <img src={InfoIco} alt="" />
                                            </div>
                                            <div className="activity-wrap">
                                                <div className="action-info">
                                                    <span className="username"><NavLink to={`/user/${eachActivity.affectedCustomerEncodedKey}`}>{eachActivity.userName}</NavLink></span>
                                                    <span className="activity-item">{eachActivity.action}</span>
                                                </div>
                                                <div className="timing">
                                                    <span>{eachActivity.creationDate}</span>
                                                </div>
                                            </div>
                                        </div>


                                    )
                                })
                            }
                        </div>
                        
                    </div>
                )
            }
        }


        if(getLoggedInUserActivitiesRequest.request_status===dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_SUCCESS){
            let customerActivitiesData = getLoggedInUserActivitiesRequest.request_data.response.data;
            if(customerActivitiesData.result.length>=1){
                return(
                    <div className="each-card-content">
                        <div className="all-activity-items">
                            {
                                customerActivitiesData.result.map((eachActivity, index) => {
                                    return (



                                        <div className="each-activity-item" key={index}>
                                            <div className="activity-icon">
                                                <img src={InfoIco} alt="" />
                                            </div>
                                            <div className="activity-wrap">
                                                <div className="action-info">
                                                    <span className="username"><NavLink to={`/user/${eachActivity.affectedCustomerEncodedKey}`}>{eachActivity.userName}</NavLink></span>
                                                    <span className="activity-item">{eachActivity.action}</span>
                                                </div>
                                                <div className="timing">
                                                    <span>{eachActivity.creationDate}</span>
                                                </div>
                                            </div>
                                        </div>


                                    )
                                })
                            }
                        </div>
                        <div className="pagination-wrap foractivity">
                            <div className="toshow">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    onChange={(e) => this.setPagesize(e, customerActivitiesData.result)}
                                    value={this.state.PageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                            </div>
                            <ActivityPagination
                                totalPages={customerActivitiesData.totalPages}
                                currPage={customerActivitiesData.currentPage}
                                currRecordsCount={customerActivitiesData.result.length}
                                totalRows={customerActivitiesData.totalRows}
                                tempData={customerActivitiesData.result}
                                pagesCountToshow={4}
                                refreshFunc={this.loadNextPage}
                            />
                        </div>
                        
                    </div>
                )
            }else{
                return(
                    <div className="each-card-content centered-item">
                        <div>No activities to display</div>
                    </div>
                )
            }
        }



        if(getLoggedInUserActivitiesRequest.request_status===dashboardConstants.GET_DASHBOARD_ACTIVITIES_DATA_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getLoggedInUserActivitiesRequest.request_data.error}</div>
            </div>
            )
        }
    }

    renderCustomerActivities =()=>{
        let getAClientActivitiesRequest = this.props.getAClientActivitiesReducer;
        let saveRequestData= getAClientActivitiesRequest.request_data!==undefined?getAClientActivitiesRequest.request_data.tempData:null;
       
        if(getAClientActivitiesRequest.request_status===clientsConstants.GET_A_CLIENT_ACTIVITIES_PENDING){
            if ((saveRequestData === undefined) || (saveRequestData !== undefined && saveRequestData.result !== undefined && saveRequestData.result.length < 1)){
                return(
                    <div className="each-card-content centered-item">
                        <div className="loading-text">Please wait... </div>
                    </div>
                )
            }else{
                return(
                    <div className="each-card-content">
                         <div className="loading-text">Please wait... </div>
                        <div className="all-activity-items">
                            {
                                saveRequestData.map((eachActivity, index) => {
                                    return (



                                        <div className="each-activity-item" key={index}>
                                            <div className="activity-icon">
                                                <img src={InfoIco} alt="" />
                                            </div>
                                            <div className="activity-wrap">
                                                <div className="action-info">
                                                    <span className="username"><NavLink to={`/user/${eachActivity.affectedCustomerEncodedKey}`}>{eachActivity.userName}</NavLink></span>
                                                    <span className="activity-item">{eachActivity.action}</span>
                                                </div>
                                                <div className="timing">
                                                    <span>{eachActivity.creationDate}</span>
                                                </div>
                                            </div>
                                        </div>


                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        }


        if(getAClientActivitiesRequest.request_status===clientsConstants.GET_A_CLIENT_ACTIVITIES_SUCCESS){
            let customerActivitiesData = getAClientActivitiesRequest.request_data.response.data;
            if(customerActivitiesData.result.length>=1){
                return(
                    <div className="each-card-content">
                        <div className="all-activity-items">
                            {
                                customerActivitiesData.result.map((eachActivity, index) => {
                                    return (



                                        <div className="each-activity-item" key={index}>
                                            <div className="activity-icon">
                                                <img src={InfoIco} alt="" />
                                            </div>
                                            <div className="activity-wrap">
                                                <div className="action-info">
                                                    <span className="username"><NavLink to={`/user/${eachActivity.affectedCustomerEncodedKey}`}>{eachActivity.userName}</NavLink></span>
                                                    <span className="activity-item">{eachActivity.action}</span>
                                                </div>
                                                <div className="timing">
                                                    <span>{eachActivity.creationDate}</span>
                                                </div>
                                            </div>
                                        </div>


                                    )
                                })
                            }
                        </div>
                        <div className="pagination-wrap foractivity">
                            <div className="toshow">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    onChange={(e) => this.setPagesize(e, customerActivitiesData.result)}
                                    value={this.state.PageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                            </div>
                            <ActivityPagination
                                totalPages={customerActivitiesData.totalPages}
                                currPage={customerActivitiesData.currentPage}
                                currRecordsCount={customerActivitiesData.result.length}
                                totalRows={customerActivitiesData.totalRows}
                                tempData={customerActivitiesData.result}
                                pagesCountToshow={4}
                                refreshFunc={this.loadNextPage}
                            />
                        </div>
                    </div>
                )
            }else{
                return(
                    <div className="each-card-content centered-item">
                        <div>No activities to display</div>
                    </div>
                )
            }
        }



        if(getAClientActivitiesRequest.request_status===clientsConstants.GET_A_CLIENT_ACTIVITIES_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getAClientActivitiesRequest.request_data.error}</div>
            </div>
            )
        }
    }

    

  


    render() {
        
        
        return (
            <Fragment>
                <div className={this.props.activityType==="logged"?"each-card mt-20": "each-card"}>
                    <div className="each-card-heading">
                        <h4>Latest Activity</h4>
                    </div>
                    {this.renderActivities()}
                </div>
                
               
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        getLoggedInUserActivitiesReducer: state.dashboardReducers.getLoggedInUserActivitiesReducer,
        getAClientActivitiesReducer: state.clientsReducers.getAClientActivitiesReducer,
    };
}



export default connect(mapStateToProps)(ActivitiesBox)
