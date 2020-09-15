import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'

import "./communications.scss"; 
class SMSCommunications extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            NotificationType:2,
            PageSize: 25,
            CurrentPage:1,
            endDate: "",
            startDate: "",
        }
    }
        componentDidMount(){
            this.loadInitialData();
        }
    
        loadInitialData=()=>{
            let {PageSize, CurrentPage, NotificationType}= this.state;
            let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&NotificationType=${NotificationType}`;
            this.getNotifications(params);
        }
    
        getNotifications = (paramters)=>{
            const {dispatch} = this.props;
    
            dispatch(administrationActions.getNotifications(paramters));
        }
    
        setPagesize = (PageSize, tempData)=>{
            const {dispatch} = this.props;
            let sizeOfPage = PageSize.target.value,
                {CurrentPage, NotificationType} = this.state;
    
            this.setState({PageSize: sizeOfPage});
    
            let params= `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&NotificationType=${NotificationType}`;
            // this.getNotifications(params);

            if(tempData){
                dispatch(administrationActions.getNotifications(params,tempData));
            }else{
                dispatch(administrationActions.getNotifications(params));
            }
        }

        loadNextPage = (nextPage, tempData)=>{
        
            const {dispatch} = this.props;
            let {PageSize,CurrentPage,NotificationType} = this.state;
    
            // this.setState({PageSize: sizeOfPage});
    
            // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
            // this.getTransactionChannels(params);
            let params= `PageSize=${PageSize}&CurrentPage=${nextPage}&NotificationType=${NotificationType}`;
    
            if(tempData){
                dispatch(administrationActions.getNotifications(params,tempData));
            }else{
                dispatch(administrationActions.getNotifications(params));
            }
        }
    
        handleDateChangeRaw = (e) => {
            e.preventDefault();
        }
        handleStartDatePicker = (startDate) => {
            startDate.setHours(startDate.getHours() + 1);
            
            this.setState({ startDate }, ()=>{
                if(this.state.endDate!==""){
                    //this.getHistory();
                }
            });
        }
    
        handleEndDatePicker = (endDate) => {
            endDate.setHours(endDate.getHours() + 1);
           
            this.setState({ endDate }, ()=>{
                    if(this.state.startDate!==""){
                        //this.getHistory();
                    }
            });
        }


        renderAllNotifications =()=>{
            let adminGetNotificationsRequest = this.props.adminGetNotifications;

            let saveRequestData= adminGetNotificationsRequest.request_data!==undefined?adminGetNotificationsRequest.request_data.tempData:null;
                switch (adminGetNotificationsRequest.request_status){
                    case (administrationConstants.GET_NOTIFICATIONS_PENDING):
                        if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.result.length<1)){
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
                                                <th>Sent By</th>
                                                <th>Destination</th>
                                                <th>Message</th>
                                                <th>Type</th>
                                                <th>Status</th>
                                                <th>Date Sent</th>
                                                <th>Failure reason</th>
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
                                    <div className="loading-text">Please wait... </div>
                                </div>
                            )
                        }else{

                            return(
                                <div>
                                        <div className="table-helper">
                                            {/* <input type="checkbox" name="" 
                                                onChange={this.setShowDetails}
                                                checked={this.state.FullDetails}
                                                id="showFullDetails" /> */}
                                            {/* <label htmlFor="showFullDetails">Show full details</label> */}
                                            {/* <Form className="one-liner">
                                                        
                                                <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                                <Form.Label>Filter </Form.Label>
                                                    <Form.Control as="select" size="sm">
                                                        <option>No Filter</option>
                                                        <option>Add New Filter</option>
                                                        <option>Custom Filter</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                            </Form> */}
                                        </div>
                                        <div className="heading-with-cta">
                                            <Form className="one-liner">

                                            <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                                <Form.Control as="select" size="sm">
                                                    <option>No Filter</option>
                                                    <option>Add New Filter</option>
                                                    <option>Custom Filter</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group className="table-filters">
                                                <DatePicker
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleStartDatePicker}
                                                    selected={this.state.startDate}
                                                    dateFormat="d MMMM, yyyy"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    placeholderText="Start date"
                                                    maxDate={new Date()}
                                                    // className="form-control form-control-sm h-38px"
                                                    className="form-control form-control-sm "

                                                />
                                                <DatePicker placeholderText="End  date"
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleEndDatePicker}
                                                    selected={this.state.endDate}
                                                    dateFormat="d MMMM, yyyy"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    maxDate={new Date()}
                                                    // className="form-control form-control-sm h-38px"
                                                    className="form-control form-control-sm"

                                                />
                                                <input type="text"
                                                    className="form-control-sm search-table form-control"
                                                    placeholder="Search text"
                                                />
                                                {/* {errors.startDate && touched.startDate ? (
                                                <span className="invalid-feedback">{errors.startDate}</span>
                                            ) : null} */}
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
                                                    <th>Sent By</th>
                                                    <th>Destination</th>
                                                    <th>Message</th>
                                                    <th>Type</th>
                                                    <th>Status</th>
                                                    <th>Date Sent</th>
                                                    <th>Failure reason</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    saveRequestData.result.map((eachNotification, index)=>{
                                                        return(
                                                            <Fragment key={index}>
                                                                <tr>
                                                                    <td>{eachNotification.sentBy}</td>
                                                                    <td>{eachNotification.destination}</td>
                                                                    <td>{eachNotification.message}</td>
                                                                    <td>{eachNotification.communicationTypeDescription}</td>
                                                                    <td>{eachNotification.communicationStateDescription}</td>
                                                                    <td>{eachNotification.dateSent}</td>
                                                                    <td>{eachNotification.failureReason}</td>
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
                    
                    case(administrationConstants.GET_NOTIFICATIONS_SUCCESS):
                        let allNotificationsData = adminGetNotificationsRequest.request_data.response.data;
                        if(allNotificationsData!==undefined){
                            if(allNotificationsData.result.length>=1){
                                return(
                                    <div>
                                        <div className="table-helper">
                                            {/* <input type="checkbox" name="" 
                                                onChange={this.setShowDetails}
                                                checked={this.state.FullDetails}
                                                id="showFullDetails" /> */}
                                            {/* <label htmlFor="showFullDetails">Show full details</label> */}
                                            {/* <Form className="one-liner">
                                                        
                                                <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                                <Form.Label>Filter </Form.Label>
                                                    <Form.Control as="select" size="sm">
                                                        <option>No Filter</option>
                                                        <option>Add New Filter</option>
                                                        <option>Custom Filter</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                            </Form> */}
                                        </div>
                                        <div className="heading-with-cta">
                                            <Form className="one-liner">

                                            <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                                <Form.Control as="select" size="sm">
                                                    <option>No Filter</option>
                                                    <option>Add New Filter</option>
                                                    <option>Custom Filter</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group className="table-filters">
                                                <DatePicker
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleStartDatePicker}
                                                    selected={this.state.startDate}
                                                    dateFormat="d MMMM, yyyy"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    placeholderText="Start date"
                                                    maxDate={new Date()}
                                                    // className="form-control form-control-sm h-38px"
                                                    className="form-control form-control-sm "

                                                />
                                                <DatePicker placeholderText="End  date"
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleEndDatePicker}
                                                    selected={this.state.endDate}
                                                    dateFormat="d MMMM, yyyy"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    maxDate={new Date()}
                                                    // className="form-control form-control-sm h-38px"
                                                    className="form-control form-control-sm"

                                                />
                                                <input type="text"
                                                    className="form-control-sm search-table form-control"
                                                    placeholder="Search text"
                                                />
                                                {/* {errors.startDate && touched.startDate ? (
                                                <span className="invalid-feedback">{errors.startDate}</span>
                                            ) : null} */}
                                            </Form.Group>
                                            <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                        </Form>

                                            <div className="pagination-wrap">
                                                <label htmlFor="toshow">Show</label>
                                                <select id="toshow" 
                                                    onChange={(e)=>this.setPagesize(e, allNotificationsData)}
                                                    value={this.state.PageSize}
                                                    className="countdropdown form-control form-control-sm">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="200">200</option>
                                                </select>
                                                <TablePagination
                                                    totalPages={allNotificationsData.totalPages}
                                                    currPage={allNotificationsData.currentPage}
                                                    currRecordsCount={allNotificationsData.result.length}
                                                    totalRows={allNotificationsData.totalRows}
                                                    tempData={allNotificationsData.result}
                                                    pagesCountToshow={4}
                                                    refreshFunc={this.loadNextPage}
                                                />
                                            </div>
                                        </div>
                                        <TableComponent classnames="striped bordered hover">
                                            <thead>
                                                <tr>
                                                    <th>Sent By</th>
                                                    <th>Destination</th>
                                                    <th>Message</th>
                                                    <th>Type</th>
                                                    <th>Status</th>
                                                    <th>Date Sent</th>
                                                    <th>Failure reason</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allNotificationsData.result.map((eachNotification, index)=>{
                                                        return(
                                                            <Fragment key={index}>
                                                                <tr>
                                                                    <td>{eachNotification.sentBy}</td>
                                                                    <td>{eachNotification.destination}</td>
                                                                    <td>{eachNotification.message}</td>
                                                                    <td>{eachNotification.communicationTypeDescription}</td>
                                                                    <td>{eachNotification.communicationStateDescription}</td>
                                                                    <td>{eachNotification.dateSent}</td>
                                                                    <td>{eachNotification.failureReason}</td>
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
                                    <div className="no-records">
                                        <div className="heading-with-cta">
                                            <Form className="one-liner">

                                            <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                                <Form.Control as="select" size="sm">
                                                    <option>No Filter</option>
                                                    <option>Add New Filter</option>
                                                    <option>Custom Filter</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group className="table-filters">
                                                <DatePicker
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleStartDatePicker}
                                                    selected={this.state.startDate}
                                                    dateFormat="d MMMM, yyyy"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    placeholderText="Start date"
                                                    maxDate={new Date()}
                                                    // className="form-control form-control-sm h-38px"
                                                    className="form-control form-control-sm "

                                                />
                                                <DatePicker placeholderText="End  date"
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleEndDatePicker}
                                                    selected={this.state.endDate}
                                                    dateFormat="d MMMM, yyyy"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    maxDate={new Date()}
                                                    // className="form-control form-control-sm h-38px"
                                                    className="form-control form-control-sm"

                                                />
                                                <input type="text"
                                                    className="form-control-sm search-table form-control"
                                                    placeholder="Search text"
                                                />
                                                {/* {errors.startDate && touched.startDate ? (
                                                <span className="invalid-feedback">{errors.startDate}</span>
                                            ) : null} */}
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
                                                    <th>Sent By</th>
                                                    <th>Destination</th>
                                                    <th>Message</th>
                                                    <th>Type</th>
                                                    <th>Status</th>
                                                    <th>Date Sent</th>
                                                    <th>Failure reason</th>
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
                        }else{
                            return null;
                        }
    
                    case (administrationConstants.GET_NOTIFICATIONS_FAILURE):
                        return (
                            <div className="loading-content errormsg"> 
                                <div>{adminGetNotificationsRequest.request_data.error}</div>
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
                                                <h2>SMS</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <ul className="nav">
                                        <li>
                                            <NavLink exact to={'/communications'}>All</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/communications/emails'}>Emails</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/communications/sms'}>SMS</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/communications/webhooks'}>Webhooks</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {this.renderAllNotifications()}
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
        adminGetNotifications : state.administrationReducers.getNotificationsReducer,
    };
}

export default connect(mapStateToProps)(SMSCommunications);