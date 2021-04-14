import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion'
import Col from 'react-bootstrap/Col'
// import Select from 'react-select';
import Form from 'react-bootstrap/Form'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
// import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { Formik } from 'formik';
import * as Yup from 'yup';
import CreateNewTask from '../../shared/components/new-task'
import Alert from 'react-bootstrap/Alert'

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'

class ViewAllTasks extends React.Component {
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
        this.getAllTasks();
    }



    getAllTasks = ()=>{
        const {dispatch} = this.props;

        let { PageSize, CurrentPage } = this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;

        dispatch(administrationActions.fetchAllTasks(params));
    }

    

    handleTaskClose = () => this.setState({showNewTask:false});
    
    handleTaskShow = () => this.setState({showNewTask:true});

    

    setPagesize = (PageSize, tempData)=>{
        // console.log('----here', PageSize.target.value);
        const {dispatch} = this.props;
        let {CurrentPage}= this.state;
        

        let sizeOfPage = PageSize.target.value;

        this.setState({PageSize: sizeOfPage});
        
        
        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;

        

        if(tempData){
            dispatch(administrationActions.fetchAllTasks(params, tempData))
            
        }else{
            dispatch(administrationActions.fetchAllTasks(params));
        }
        
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize} = this.state;

        
        let params= `PageSize=${PageSize}&CurrentPage=${nextPage}`;

        if(tempData){
            dispatch(administrationActions.fetchAllTasks(params,tempData));
        }else{
            dispatch(administrationActions.fetchAllTasks(params));
        }
    }

    renderHeading = ()=>{
        
        return(
            <div>
                <div className="module-heading">
                    <div className="module-title">
                        
                        <div className="content-container">
                                    
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="">
                                        <h2>
                                           Application Tasks
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
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
        let fetchAllTasksRequest =  this.props.fetchAllTasksReducer;
        let saveRequestData= fetchAllTasksRequest.request_data!==undefined?fetchAllTasksRequest.request_data.tempData:null;
        if(fetchAllTasksRequest.request_status===administrationConstants.GET_ALL_TASKS_PENDING){
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

        if(fetchAllTasksRequest.request_status===administrationConstants.GET_ALL_TASKS_SUCCESS){
            let fetchAllTasksRequestData = fetchAllTasksRequest.request_data.response.data.result;
            
            if(fetchAllTasksRequestData.length>=1){
                return(
                    <div className=""> 
                        <div className="heading-with-cta ">
                            <Form className="one-liner">

                            </Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow" 
                                    onChange={(e)=>this.setPagesize(e, fetchAllTasksRequestData)}
                                    value={this.state.PageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={fetchAllTasksRequestData.totalPages}
                                    currPage={fetchAllTasksRequestData.currentPage}
                                    currRecordsCount={fetchAllTasksRequestData.length}
                                    totalRows={fetchAllTasksRequestData.totalRows}
                                    tempData={fetchAllTasksRequestData}
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
                                    fetchAllTasksRequestData.map((eachTask, index)=>{
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

        if(fetchAllTasksRequest.request_status===administrationConstants.GET_ALL_TASKS_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{fetchAllTasksRequest.request_data.error}</div>
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
                        {this.renderHeading()}
                        <CreateNewTask source="client"   closeNewTask={this.handleCloseNewTask} showNewTask={this.state.displayNewTask} />
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
        fetchAllTasksReducer: state.administrationReducers.fetchAllTasksReducer,
        
    };
}

export default connect(mapStateToProps)(ViewAllTasks);