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
import CreateNewTask from '../../shared/components/new-task'
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
class ViewCustomerTasks extends React.Component {
    constructor(props) {
        super(props);
        this.clientEncodedKey = this.props.match.params.id;
        this.state={
            user:'',
            showNewTask:false,
            PageSize: 10,
            CurrentPage: 1,
        }

       
    }

    componentDidMount() {
        this.loadInitialCustomerData();
    }


    loadInitialCustomerData = ()=>{
        

        this.getClientTasks(this.clientEncodedKey);
        this.getAllUsers();
    }


    getClientTasks = (clientEncodedKey)=>{
        const {dispatch} = this.props;

        let { PageSize, CurrentPage } = this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;

        dispatch(clientsActions.getAClientTask(clientEncodedKey, params));
    }

    getAllUsers = ()=>{
        const {dispatch} = this.props;
        
        dispatch(administrationActions.getAllUsers(0));
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

    newTask = ()=>{
        const {showNewTask} = this.state;
        let getAllUsersRequest = this.props.getAllUsers;
        let createAClientTaskRequest =  this.props.createAClientTaskReducer;
        let getAClientRequest = this.props.getAClientReducer.request_data.response.data;

        let addClientTaskValidationSchema = Yup.object().shape({
            Notes:  Yup.string()
                .min(3, 'Valid response required'),
            dueDate: Yup.string()
                .required('Required'),
            assignedToUserName: Yup.string()
                .required('Required'),
            summary: Yup.string()
                .min(3, 'Valid response required')
                .required('Required'),
        
       });
      
       if(getAllUsersRequest.request_status ===administrationConstants.GET_ALL_USERS_SUCCESS){
            let usersList = getAllUsersRequest.request_data.response.data,
                allUserDataList=[];

            if(usersList.length>=1){
                usersList.map((eachUser, id)=>{
                    allUserDataList.push({label: eachUser.name, value:eachUser.key});
                })
                return(
                    <Modal show={showNewTask} onHide={this.handleTaskClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                
                        
                        <Formik
                            initialValues={{
                                summary:"",
                                dueDate:"",
                                Notes:"",
                                assignedToEncodedKey:"",
                                assignedToUserName:"",
                                clientEncodedKey:this.clientEncodedKey,
                                CustomerName:`${getAClientRequest.firstName} ${getAClientRequest.lastName} ${getAClientRequest.middleName}`
                            }}

                            validationSchema={addClientTaskValidationSchema}
                            onSubmit={(values, { resetForm }) => {

                                let addCustomerCommentsPayload = {
                                    assignedToEncodedKey:values.assignedToEncodedKey,
                                    assignedToUserName:values.assignedToUserName,
                                    clientEncodedKey:values.clientEncodedKey,
                                    dueDate:values.dueDate.toISOString(),
                                    summary:values.summary,
                                    Notes:values.Notes
                                }




                                this.handleClientTasks(addCustomerCommentsPayload)
                                    .then(
                                        () => {

                                            if (this.props.createAClientTaskReducer.request_status === clientsConstants.CREATE_A_CLIENT_TASK_SUCCESS) {
                                                resetForm();
                                                // value = {null}

                                                setTimeout(() => {
                                                    this.props.dispatch(clientsActions.createClientTask("CLEAR"))
                                                    this.getClientTasks(this.clientEncodedKey);
                                                    this.handleTaskClose();
                                                }, 3000);
                                            }

                                            

                                        }
                                    )

                            }}
                        >
                            {({ handleSubmit,
                                handleChange,
                                handleBlur,
                                resetForm,
                                values,
                                setFieldValue,
                                setFieldTouched,
                                touched,
                                isValid,
                                errors, }) => (
                                    <Form
                                        noValidate
                                        onSubmit={handleSubmit}
                                        className="">
                                        <Modal.Header>
                                            <Modal.Title>Create Task</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form.Group>
                                                <Form.Label className="block-level">Summary</Form.Label>
                                                <Form.Control 
                                                    type="text"
                                                    onChange={handleChange}
                                                    name="summary"
                                                    value={values.summary}
                                                    className={errors.summary && touched.summary ? "is-invalid form-control form-control-sm" : null} />
                                                    
                                                    {errors.summary && touched.summary ? (
                                                    <span className="invalid-feedback">{errors.summary}</span>
                                                    ) : null}
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label className="block-level">Linked To</Form.Label>
                                                {/* Search dropdown of staff list */}
                                                <Form.Control 
                                                    type="text"
                                                    onChange={handleChange}
                                                    name="CustomerName"
                                                    value={values.CustomerName}
                                                    disabled
                                                    readOnly
                                                    className={errors.CustomerName && touched.CustomerName ? "is-invalid form-control form-control-sm" : null}
                                                />
                                                {errors.CustomerName && touched.CustomerName ? (
                                                    <span className="invalid-feedback">{errors.CustomerName}</span>
                                                ) : null}
                                            </Form.Group>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Assigned To</Form.Label>
                                                    <Select
                                                        options={allUserDataList}
                                                        onChange={(selected) => {
                                                            this.setState({ selected });
                                                            errors.assignedToUserName = null
                                                            values.assignedToUserName = selected.label
                                                            setFieldValue('assignedToEncodedKey',selected.value )
                                                            setFieldValue('assignedToUserName', selected.label)
                                                        }}
                                                        onBlur={()=> 
                                                            {
                                                                setFieldTouched('assignedToUserName', true)
                                                            }
                                                        }
                                                        className={errors.assignedToUserName && touched.assignedToUserName ? "is-invalid" : null}
                                                        // value={values.accountUsage}
                                                        name="assignedToUserName"
                                                        // value={values.currencyCode}
                                                        required
                                                    />

                                                    {errors.assignedToUserName && touched.assignedToUserName ? (
                                                        <span className="invalid-feedback">{errors.assignedToUserName}</span>
                                                    ) : null}
                                                </Col>
                                                <Col className="date-wrap">
                                                    <Form.Label className="block-level">Due Date</Form.Label>
                                                    <DatePicker
                                                     placeholderText="Choose entry date"
                                                        dateFormat={window.dateformat}
                                                        className="form-control form-control-sm"
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        minDate={new Date()}
                                                        name="dueDate"
                                                        value={values.dueDate}
                                                        onChange={setFieldValue}
                                                        className={errors.dueDate && touched.dueDate ? "is-invalid form-control form-control-sm" : "form-control form-control-sm"}
                                                    />
                                                    {errors.dueDate && touched.dueDate ? (
                                                        <span className="invalid-feedback">{errors.dueDate}</span>
                                                    ) : null}
                                                </Col>
                                            </Form.Row>
                                            <Form.Group controlId="debitLocation">
                                                <Form.Label className="block-level">Notes</Form.Label>
                                                <Form.Control 
                                                    as="textarea" rows="3"
                                                    onChange={handleChange}
                                                    value={values.Notes}
                                                    className={errors.Notes && touched.Notes ? "is-invalid" : null}
                                                    name="Notes" 
                                                    required  />
                                                    {errors.Notes && touched.Notes ? (
                                                            <span className="invalid-feedback">{errors.Notes}</span>
                                                    ) : null}
                                            </Form.Group>
                                        </Modal.Body>
                                        <Modal.Footer>

                                            <Button variant="light" onClick={this.handleTaskClose}>
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="success"
                                                type="submit"
                                                disabled={createAClientTaskRequest.is_request_processing}
                                            >
                                                {createAClientTaskRequest.is_request_processing ? "Please wait..." : "Save Task"}

                                            </Button>

                                        </Modal.Footer>

                                        {createAClientTaskRequest.request_status === clientsConstants.CREATE_A_CLIENT_TASK_SUCCESS &&
                                            <Alert variant="success" className="w-65 mlr-auto">
                                                {createAClientTaskRequest.request_data.response.data.message}
                                            </Alert>
                                        }
                                        {createAClientTaskRequest.request_status === clientsConstants.CREATE_A_CLIENT_TASK_FAILURE &&
                                            <Alert variant="danger" className="w-65 mlr-auto">
                                                {createAClientTaskRequest.request_data.error}
                                            </Alert>
                                        }
                                    </Form>
                                )}
                        </Formik>
                    </Modal>
                )   
            }else{
                return(
                    <Modal show={showNewTask} onHide={this.handleTaskClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                        <Modal.Header>
                            <Modal.Title>Contact Admin</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="loading-content">No user to assign tasks. Please contact Admin</div>
                        </Modal.Body>
                    </Modal>
                )
            }

       }

        if(getAllUsersRequest.request_status ===administrationConstants.GET_ALL_USERS_PENDING){
            return(
                <Modal show={showNewTask} onHide={this.handleTaskClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                    <Modal.Header>
                        <Modal.Title>Loading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="loading-content">Please wait...</div>
                    </Modal.Body>
                        
                </Modal>
            )
        }

        if(getAllUsersRequest.request_status ===administrationConstants.GET_ALL_USERS_FAILURE){
            return(
                <Modal show={showNewTask} onHide={this.handleTaskClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                    <Modal.Header>
                        <Modal.Title>Contact Admin</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="loading-content">{getAllUsersRequest.request_data.error}</div>
                    </Modal.Body>
                        
                </Modal>
            )
        }
        
        
    }

    renderTaskWrap =()=>{
        let getAClientRequest = this.props.getAClientReducer,
            getClientLoansRequest = this.props.getClientLoansReducer,
            getClientDepositsRequest = this.props.getClientDepositsReducer;

            if(getAClientRequest.request_status===clientsConstants.GET_A_CLIENT_SUCCESS
                &&  getClientLoansRequest.request_status ===loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS
                && getClientDepositsRequest.request_status ===loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS){

                    return(
                        <div>
                            {this.newTask()}
                            {this.renderAClientTasks()}
                        </div>
                    )
                    
                }
    }

    renderAClientTasks =()=>{
        let getAClientTasksRequest =  this.props.getAClientTasksReducer;
        let saveRequestData= getAClientTasksRequest.request_data!==undefined?getAClientTasksRequest.request_data.tempData:null;
        if(getAClientTasksRequest.request_status===clientsConstants.GET_A_CLIENT_TASKS_PENDING){
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

        if(getAClientTasksRequest.request_status===clientsConstants.GET_A_CLIENT_TASKS_SUCCESS){
            let getAClientTasksRequestData = getAClientTasksRequest.request_data.response.data.result;
            
            if(getAClientTasksRequestData.length>=1){
                return(
                    <div className=""> 
                        <div className="heading-with-cta ">
                            <Form className="one-liner">

                            </Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow" 
                                    onChange={(e)=>this.setPagesize(e, getAClientTasksRequestData)}
                                    value={this.state.PageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={getAClientTasksRequestData.totalPages}
                                    currPage={getAClientTasksRequestData.currentPage}
                                    currRecordsCount={getAClientTasksRequestData.length}
                                    totalRows={getAClientTasksRequestData.totalRows}
                                    tempData={getAClientTasksRequestData}
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
                                    getAClientTasksRequestData.map((eachTask, index)=>{
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

        if(getAClientTasksRequest.request_status===clientsConstants.GET_A_CLIENT_TASKS_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getAClientTasksRequest.request_data.error}</div>
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
                {/* <InnerPageContainer {...this.props}> */}
                    
                    <div className="content-wrapper">
                        {/* <CustomerHeading {...this.props}/> */}
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
                {/* </InnerPageContainer> */}
            </Fragment>
        );
    }
}
function mapStateToProps(state) {
    return {
        getAllUsers : state.administrationReducers.adminGetAllUsersReducer,
        getAClientReducer: state.clientsReducers.getAClientReducer,
        createAClientTaskReducer: state.clientsReducers.createAClientTaskReducer,
        getAClientTasksReducer: state.clientsReducers.getAClientTasksReducer,
        getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        getClientLoansReducer: state.loansReducers.getClientLoansReducer,
    };
}

export default connect(mapStateToProps)(ViewCustomerTasks);