import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import DatePicker from '../../_helpers/datepickerfield'
import "react-datepicker/dist/react-datepicker.css";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import CreateNewTask from '../../shared/components/new-task'

import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'

import { getDateFromISO} from '../../shared/utils';
import {clientsActions} from '../../redux/actions/clients/clients.action';
import Alert from 'react-bootstrap/Alert'



import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'




class ViewUserTasks extends React.Component {
    constructor(props) {
        super(props);
        this.clientEncodedKey = this.props.match.params.id;
        this.state={
            user:JSON.parse(localStorage.getItem('lingoAuth')),
            showNewTask:false,
            PageSize: 10,
            CurrentPage: 1,
        }

       
    }

    componentDidMount() {
        this.loadInitialCustomerData();
    }


    loadInitialCustomerData = ()=>{
        

        this.getMyTasks();
        // this.getAllUsers();
    }

    // getUserInfo = async(userEncodedKey)=>{
    //     const {dispatch} = this.props;

    //    await dispatch(administrationActions.getAUser(userEncodedKey, true));
    // }


    getMyTasks = (clientEncodedKey)=>{
        const {dispatch} = this.props;

        let { PageSize, CurrentPage } = this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;

        dispatch(clientsActions.getAUserTask(params));
    }

    

    handleTaskClose = () => this.setState({showNewTask:false});
    
    handleTaskShow = () => this.setState({showNewTask:true});

    handleClientTasks = async (addCommentsPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(clientsActions.createClientTask(addCommentsPayload));
    } 

    setPagesize = (PageSize, tempData)=>{
        // console.log('----here', PageSize.target.value);
        const {dispatch} = this.props;
        let {CurrentPage}= this.state;
        

        let sizeOfPage = PageSize.target.value;

        this.setState({PageSize: sizeOfPage});
        
        
        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;

        

        if(tempData){
            dispatch(clientsActions.getAClientTask(this.clientEncodedKey, params, tempData))
            
        }else{
            dispatch(clientsActions.getAClientTask(this.clientEncodedKey, params));
        }
        
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize} = this.state;

        
        let params= `PageSize=${PageSize}&CurrentPage=${nextPage}`;

        if(tempData){
            dispatch(clientsActions.getAClientTask(this.clientEncodedKey, params,tempData));
        }else{
            dispatch(clientsActions.getAClientTask(this.clientEncodedKey, params));
        }
    }

    renderUserDetailsHeading = ()=>{
        let {user}= this.state;
        return(
            <div>
                <div className="module-heading">
                    <div className="module-title">
                        
                        <div className="content-container">
                                    
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="">
                                        <h2>
                                           {user.displayName}
                                            
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.renderSubMenu()}
                </div>
            </div>
        )
    }

    renderSubMenu = ()=>{
        
        return(
            <div className="module-submenu">
                <div className="content-container">
                    
                    
                    <ul className="nav">
                        <li>
                            <NavLink exact to='/my-profile'>Overview</NavLink>
                        </li>
                        <li>
                            <NavLink exact to='/my-profile/tasks'>My Tasks</NavLink>
                        </li>
                    </ul>
                    
                    
                </div>
            </div>
        )
    }
  

    renderTaskWrap =()=>{
        return(
            <div>
                
                {this.renderAUserTasks()}
            </div>
        )
    }

    renderAUserTasks =()=>{
        let getAUserTasksRequest =  this.props.getAUserTasksReducer;
        let saveRequestData= getAUserTasksRequest.request_data!==undefined?getAUserTasksRequest.request_data.tempData:null;
        if(getAUserTasksRequest.request_status===clientsConstants.GET_MY_TASKS_PENDING){
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
                                    <th>Summary</th>
                                    <th>Status</th>
                                    <th>Assigned To</th>
                                    <th>Due Date</th>
                                    <th>Created By</th>
                                    <th>Notes</th>
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
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleShowNewTask}>New Task</Button>
                        </div>
                        
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
                                    <th>Summary</th>
                                    <th>Status</th>
                                    <th>Assigned To</th>
                                    <th>Due Date</th>
                                    <th>Created By</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    saveRequestData.map((eachTask, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{eachTask.summary}</td>
                                                <td>{eachTask.communicationStateDescription}</td>
                                                <td>{eachTask.assignedToUserName}</td>
                                                <td>{eachTask.dueDate}</td>
                                                <td>{eachTask.createdByUserName}</td>
                                                <td>{eachTask.notes}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </TableComponent>
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleShowNewTask}>New Task</Button>
                        </div>
                        
                    </div>
                )
            }
        }

        if(getAUserTasksRequest.request_status===clientsConstants.GET_MY_TASKS_SUCCESS){
            let getAUserTasksRequestData = getAUserTasksRequest.request_data.response.data.result;
            
            if(getAUserTasksRequestData.length>=1){
                return(
                    <div className=""> 
                        <div className="heading-with-cta ">
                            <Form className="one-liner">

                            </Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow" 
                                    onChange={(e)=>this.setPagesize(e, getAUserTasksRequestData)}
                                    value={this.state.PageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={getAUserTasksRequestData.totalPages}
                                    currPage={getAUserTasksRequestData.currentPage}
                                    currRecordsCount={getAUserTasksRequestData.length}
                                    totalRows={getAUserTasksRequestData.totalRows}
                                    tempData={getAUserTasksRequestData}
                                    pagesCountToshow={4}
                                    refreshFunc={this.loadNextPage}
                                />
                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>Summary</th>
                                    <th>Status</th>
                                    <th>Assigned To</th>
                                    <th>Due Date</th>
                                    <th>Created By</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getAUserTasksRequestData.map((eachTask, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{eachTask.summary}</td>
                                                <td>{eachTask.communicationStateDescription}</td>
                                                <td>{eachTask.assignedToUserName}</td>
                                                <td>{eachTask.dueDate}</td>
                                                <td>{eachTask.createdByUserName}</td>
                                                <td>{eachTask.notes}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </TableComponent>
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleShowNewTask}>New Task</Button>
                        </div>
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
                                    <th>Summary</th>
                                    <th>Status</th>
                                    <th>Assigned To</th>
                                    <th>Due Date</th>
                                    <th>Created By</th>
                                    <th>Notes</th>
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
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleShowNewTask}>New Task</Button>
                        </div>
                    </div>
                )
            }
        }

        if(getAUserTasksRequest.request_status===clientsConstants.GET_MY_TASKS_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getAUserTasksRequest.request_data.error}</div>
            </div>
            )
        }
    }

    handleShowNewTask = () => {
        // if(this.props.writeOffALoanReducer.is_request_processing===false){
            // this.props.dispatch(loanActions.writeOffALoan("CLEAR"));
            this.setState({ displayNewTask: true })
        // }
    };
    handleCloseNewTask = () => {
        // this.props.dispatch(dashboardActions.reverseATransaction("CLEAR"));
        this.setState({ displayNewTask: false  })
    };

    render() {
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    
                    <div className="content-wrapper">
                        {this.renderUserDetailsHeading()}
                        <CreateNewTask source="client"  clientEncodedKey={this.clientEncodedKey} closeNewTask={this.handleCloseNewTask} showNewTask={this.state.displayNewTask} />
                        {/* <CreateNewTask clientName={`${customerDetails.firstName} ${customerDetails.lastName}`} clientEncodedKey={this.clientEncodedKey} closeNewTask={this.handleCloseNewTask} showNewTask={this.state.displayNewTask} /> */}
                        <div className="module-content">
                            <div className="content-container">
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="middle-content">
                                           {this.renderTaskWrap()}
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
        
        createAClientTaskReducer: state.clientsReducers.createAClientTaskReducer,
        getAUserTasksReducer: state.clientsReducers.getAUserTasksReducer,
        
    };
}

export default connect(mapStateToProps)(ViewUserTasks);