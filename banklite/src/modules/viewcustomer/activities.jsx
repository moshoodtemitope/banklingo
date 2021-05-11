import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import DatePicker from '../../_helpers/datepickerfield'
import "react-datepicker/dist/react-datepicker.css";

// import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
// import "./administration.scss"; 
import { getDateFromISO} from '../../shared/utils';
import {clientsActions} from '../../redux/actions/clients/clients.action';
import Alert from 'react-bootstrap/Alert'

import Select from 'react-select';

import { Formik } from 'formik';
import * as Yup from 'yup';

import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
class ViewCustomerActivites extends React.Component {
    constructor(props) {
        super(props);
        this.clientEncodedKey = this.props.match.params.id;
        this.state={
            user:'',
            PageSize: 10,
            CurrentPage: 1,
        }

       
    }

    componentDidMount() {
        this.loadInitialCustomerData();
    }


    loadInitialCustomerData = ()=>{
        

        this.getClientActivities(this.clientEncodedKey);
        this.getAllUsers();
    }


    getClientActivities = (clientEncodedKey)=>{
        const {dispatch} = this.props;

        let { PageSize, CurrentPage } = this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;

        dispatch(clientsActions.getAClientActivities(clientEncodedKey, params));
    }

    getAllUsers = ()=>{
        const {dispatch} = this.props;
        
        dispatch(administrationActions.getAllUsers(0));
    }

    

    setPagesize = (PageSize, tempData)=>{
        // console.log('----here', PageSize.target.value);
        const {dispatch} = this.props;
        let {CurrentPage}= this.state;
        

        let sizeOfPage = PageSize.target.value;

        this.setState({PageSize: sizeOfPage});
        
        
        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;

        

        if(tempData){
            dispatch(clientsActions.getAClientActivities(this.clientEncodedKey, params, tempData))
            
        }else{
            dispatch(clientsActions.getAClientActivities(this.clientEncodedKey, params));
        }
        
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize} = this.state;

        
        let params= `PageSize=${PageSize}&CurrentPage=${nextPage}`;

        if(tempData){
            dispatch(clientsActions.getAClientActivities(this.clientEncodedKey, params,tempData));
        }else{
            dispatch(clientsActions.getAClientActivities(this.clientEncodedKey, params));
        }
    }

   

    renderActivityWrap =()=>{
        let getAClientRequest = this.props.getAClientReducer,
            getClientLoansRequest = this.props.getClientLoansReducer,
            getClientDepositsRequest = this.props.getClientDepositsReducer;

            

            if(getAClientRequest.request_status===clientsConstants.GET_A_CLIENT_SUCCESS
                &&  getClientLoansRequest.request_status ===loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS
                && getClientDepositsRequest.request_status ===loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS){

                    return(
                        <div>
                            {this.renderAClientActivties()}
                        </div>
                    )
                    
                }
    }

    renderAClientActivties =()=>{
        let getAClientActivitiesRequest = this.props.getAClientActivitiesReducer;
        let saveRequestData= getAClientActivitiesRequest.request_data!==undefined?getAClientActivitiesRequest.request_data.tempData:null;
        if(getAClientActivitiesRequest.request_status===clientsConstants.GET_A_CLIENT_ACTIVITIES_PENDING){
            if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
                return(
                    <div className=""> 
                        <div className="loading-text">Please wait... </div>
                        <div className="heading-with-cta ">
                            <Form className="one-liner">

                            </Form>
                        </div>
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>Activity Description</th>
                                    <th>Date Created</th>
                                    <th>Username</th>
                                    <th>Action</th>
                                    <th>Affected Client</th>
                                    <th>Affected Item Name</th>
                                    <th>Affected Item Id</th>
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
            }else{
                return(
                    <div className=""> 
                        <div className="loading-text">Please wait... </div>
                        <div className="heading-with-cta ">
                            <Form className="one-liner">

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
                                    <th>Activity Description</th>
                                    <th>Date Created</th>
                                    <th>Username</th>
                                    <th>Action</th>
                                    <th>Affected Client</th>
                                    <th>Affected Item Name</th>
                                    <th>Affected Item Id</th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    saveRequestData.result.map((eachActivity, index)=>{
                                        return(
                                            <Fragment key={index}>
                                                <tr>
                                                    <td>{eachActivity.activityDescription}</td>
                                                    <td>{getDateFromISO(eachActivity.creationDate, true)}</td>
                                                    <td>{eachActivity.userName}</td>
                                                    <td>{eachActivity.action}</td>
                                                    <td>{eachActivity.affectedCustomerName}</td>
                                                    <td>{eachActivity.affectedItemName}</td>
                                                    <td>{eachActivity.affectedItemId}</td>
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
        }

        if(getAClientActivitiesRequest.request_status===clientsConstants.GET_A_CLIENT_ACTIVITIES_SUCCESS){
            let getAClientActivitiesRequestData = getAClientActivitiesRequest.request_data.response.data.result;
            
            if(getAClientActivitiesRequestData.length>=1){
                return(
                    <div className=""> 
                        <div className="heading-with-cta ">
                            <Form className="one-liner">

                            </Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow" 
                                    onChange={(e)=>this.setPagesize(e, getAClientActivitiesRequestData)}
                                    value={this.state.PageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={getAClientActivitiesRequestData.totalPages}
                                    currPage={getAClientActivitiesRequestData.currentPage}
                                    currRecordsCount={getAClientActivitiesRequestData.length}
                                    totalRows={getAClientActivitiesRequestData.totalRows}
                                    tempData={getAClientActivitiesRequestData}
                                    pagesCountToshow={4}
                                    refreshFunc={this.loadNextPage}
                                />
                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>Activity Description</th>
                                    <th>Date Created</th>
                                    <th>Username</th>
                                    <th>Action</th>
                                    <th>Affected Client</th>
                                    <th>Affected Item Name</th>
                                    <th>Affected Item Id</th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getAClientActivitiesRequestData.map((eachActivity, index)=>{
                                        return(
                                            <Fragment key={index}>
                                                <tr>
                                                    <td>{eachActivity.activityDescription}</td>
                                                    <td>{getDateFromISO(eachActivity.creationDate, true)}</td>
                                                    <td>{eachActivity.userName}</td>
                                                    <td>{eachActivity.action}</td>
                                                    <td>{eachActivity.affectedCustomerName}</td>
                                                    <td>{eachActivity.affectedItemName}</td>
                                                    <td>{eachActivity.affectedItemId}</td>
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
                    <div className=""> 
                        <div className="heading-with-cta ">
                            <Form className="one-liner">

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
                                    <th>Activity Description</th>
                                    <th>Date Created</th>
                                    <th>Username</th>
                                    <th>Action</th>
                                    <th>Affected Client</th>
                                    <th>Affected Item Name</th>
                                    <th>Affected Item Id</th>
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
                {/* <InnerPageContainer {...this.props}> */}
                    
                    <div className="content-wrapper">
                        {/* <CustomerHeading {...this.props}/> */}
                        <div className="module-content">
                            <div className="content-container">
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="middle-content">
                                           {this.renderActivityWrap()}
                                        </div>
                                    </div>
                                </div>
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
        getAllUsers : state.administrationReducers.adminGetAllUsersReducer,
        getAClientReducer: state.clientsReducers.getAClientReducer,
        getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        getClientLoansReducer: state.loansReducers.getClientLoansReducer,
        getAClientActivitiesReducer: state.clientsReducers.getAClientActivitiesReducer,
    };
}

export default connect(mapStateToProps)(ViewCustomerActivites);