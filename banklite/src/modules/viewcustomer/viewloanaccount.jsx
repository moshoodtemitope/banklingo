import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'
// import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Select from 'react-select';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import "./customerprofile.scss"; 
import { loanActions } from '../../redux/actions/loans/loans.action';


import DatePicker from '../../_helpers/datepickerfield'
import "react-datepicker/dist/react-datepicker.css";

import Modal from 'react-bootstrap/Modal'
import { numberWithCommas, getDateFromISO} from '../../shared/utils';

import { Formik } from 'formik';
import * as Yup from 'yup';

import {clientsActions} from '../../redux/actions/clients/clients.action';
import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'

import Alert from 'react-bootstrap/Alert'


import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'
class ViewLoanAccount extends React.Component {
    constructor(props) {
        super(props);
        this.loanEncodedKey = this.props.match.params.loanid;
        this.state={
            user:'',
            FullDetails:true,
            PageSize: 100,
            CurrentPage: 1,

            loanSchedulePageSize: 100,
            loanScheduleCurrentPage: 1,

            loanTransactionPageSize: 100,
            loanTransactionCurrentPage: 1,

            showAmountExpected: false,
            showAmountPaid: false,
            showAmountDue: true,

            CommentsPageSize: 100,
            CommentsCurrentPage: 1,
            showAddComment:false,

            ActivitiesPageSize: 100,
            ActivitiesCurrentPage: 1,

            AttachmentPageSize: 100,
            AttachmentCurrentPage: 1,

            showAddAttachment:false,
            isDocAdded: null,
            filename:null,
            docuploaded:'',

            CommunicationsPageSize: 100,
            CommunicationsCurrentPage: 1,
            NotificationType:0,

            changeLoanState: false,
            showDisburseLoanForm: false
        }

        
    }

    componentDidMount() {
       
        this.loadInitialCustomerData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.loanid !== this.props.match.params.loanid) {
        
        this.loanEncodedKey = nextProps.match.params.loanid;
            this.loadInitialCustomerData();
        }
    }

    loadInitialCustomerData = ()=>{
        this.getCustomerLoanAccountDetails(this.loanEncodedKey);
        this.getTransactionChannels();
        // this.getCustomerLoanSchedule();
        // this.getCustomerLoanTransactions();
        // this.getALoanComments();
        // this.getALoanActivities();
        // this.getACustomerLoanAttachments();
        // this.getALoanCommunications();
    }

    getTransactionChannels = ()=>{
        const {dispatch} = this.props;
        let params = `PageSize=200&CurrentPage=1`;

        dispatch(administrationActions.getTransactionChannels(params));
    }

    getCustomerLoanAccountDetails = (clientEncodedKey )=>{
        const { dispatch } = this.props;

        dispatch(loanActions.getAClientLoanAccount(clientEncodedKey));
    }

    getCustomerLoanSchedule = ()=>{
        const { dispatch } = this.props;
        let { loanSchedulePageSize, loanScheduleCurrentPage } = this.state;

        let params = `PageSize=${loanSchedulePageSize}&CurrentPage=${loanScheduleCurrentPage}&LoanAccountEncodedKey=${this.loanEncodedKey}`;

        dispatch(loanActions.getAccountLoanschedule(params));
    }

    getALoanActivities = ()=>{
        const {dispatch} = this.props;

        let { ActivitiesPageSize, ActivitiesCurrentPage } = this.state;

        let params = `PageSize=${ActivitiesPageSize}&CurrentPage=${ActivitiesCurrentPage}`;

        dispatch(loanActions.getALoanActivities(this.loanEncodedKey, params));
    }

    getALoanCommunications = ()=>{
        const { dispatch } = this.props;

        let { CommunicationsPageSize, CommunicationsCurrentPage,NotificationType } = this.state;

        let params = `PageSize=${CommunicationsPageSize}&CurrentPage=${CommunicationsCurrentPage}&NotificationType=${NotificationType}`;
        dispatch(loanActions.getALoanCommunications(this.loanEncodedKey,params));
    }
    
    

    getCustomerLoanTransactions = ()=>{
        const { dispatch } = this.props;
        let { loanTransactionPageSize, loanTransactionCurrentPage } = this.state;

        let params = `PageSize=${loanTransactionPageSize}&CurrentPage=${loanTransactionCurrentPage}&accountEncodedKey=${this.loanEncodedKey}`;

        dispatch(loanActions.getAccountLoanTransaction(this.loanEncodedKey, params));
    }

    getALoanComments = ()=>{
        const { dispatch } = this.props;
        let { CommentsPageSize, CommentsCurrentPage } = this.state;

        let params = `PageSize=${CommentsPageSize}&CurrentPage=${CommentsCurrentPage}&AccountEncodedKey=${this.loanEncodedKey}`;
        dispatch(loanActions.getAccountLoansComments(params));
    }

    getACustomerLoanAttachments = ()=>{
        const { dispatch } = this.props;

        let {AttachmentPageSize, AttachmentCurrentPage} = this.state
        let params = `PageSize=${AttachmentPageSize}&CurrentPage=${AttachmentCurrentPage}&AccountEncodedKey=${this.loanEncodedKey}`;
        dispatch(loanActions.getAccountLoanAttachments(params));
    }

    setScheduleFilter = (filterState, filterItem)=>{
        
        this.setState({[filterItem]:filterState.target.checked})
    }

    setTransactionRequestPagesize = (PageSize, tempData) => {
        // console.log('----here', PageSize.target.value);
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value;

        

        this.setState({ loanTransactionPageSize: sizeOfPage });

        
        
        let {loanTransactionCurrentPage } = this.state;

        let params = `PageSize=${sizeOfPage}&CurrentPage=${loanTransactionCurrentPage}&accountEncodedKey=${this.loanEncodedKey}`;

        // dispatch(loanActions.getAccountLoanTransaction(this.loanEncodedKey, params));

        if(tempData){
            dispatch(loanActions.getAccountLoanTransaction(this.loanEncodedKey,params, tempData));
            
        }else{
            dispatch(loanActions.getAccountLoanTransaction(this.loanEncodedKey,params));
        }
    }

    setTransactionRequestNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        

        

        
        
        let {loanTransactionPageSize} = this.state;

        let params = `PageSize=${loanTransactionPageSize}&CurrentPage=${nextPage}&accountEncodedKey=${this.loanEncodedKey}`;
        if(tempData){
            dispatch(loanActions.getAccountLoanTransaction(this.loanEncodedKey,params, tempData));
        }else{
            dispatch(loanActions.getAccountLoanTransaction(this.loanEncodedKey,params));
        }
    }

    setAttachmentRequestPagesize = (PageSize, tempData) => {
        // console.log('----here', PageSize.target.value);
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value;


        this.setState({ AttachmentPageSize: sizeOfPage });

        
        
        let {AttachmentCurrentPage } = this.state;

       

        let params = `PageSize=${sizeOfPage}&CurrentPage=${AttachmentCurrentPage}&AccountEncodedKey=${this.loanEncodedKey}`;
        

        if(tempData){
            dispatch(loanActions.getAccountLoanAttachments(params, tempData));
            
        }else{
            dispatch(loanActions.getAccountLoanAttachments(params));
        }
    }

    setAttachmentRequestNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        

        let {AttachmentPageSize } = this.state;

       

        let params = `PageSize=${AttachmentPageSize}&CurrentPage=${nextPage}&AccountEncodedKey=${this.loanEncodedKey}`;

        

       
        if(tempData){
            dispatch(loanActions.getAccountLoanAttachments(params, tempData));
        }else{
            dispatch(loanActions.getAccountLoanAttachments(params));
        }
    }

    setCommentsRequestPagesize = (PageSize, tempData) => {
        // console.log('----here', PageSize.target.value);
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value;


        this.setState({ CommentsPageSize: sizeOfPage });

        
        
        let {CommentsCurrentPage } = this.state;

        let params = `PageSize=${sizeOfPage}&CurrentPage=${CommentsCurrentPage}&AccountEncodedKey=${this.loanEncodedKey}`;
        

        if(tempData){
            dispatch(loanActions.getAccountLoansComments(params, tempData));
            
        }else{
            dispatch(loanActions.getAccountLoansComments(params));
        }
    }

    setCommentsRequestNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        

        let {CommentsPageSize } = this.state;

        let params = `PageSize=${CommentsPageSize}&CurrentPage=${nextPage}&AccountEncodedKey=${this.loanEncodedKey}`;

       
       
        if(tempData){
            dispatch(loanActions.getAccountLoansComments(params, tempData));
        }else{
            dispatch(loanActions.getAccountLoansComments(params));
        }
    }

    setCommunicationsRequestPagesize = (PageSize, tempData) => {
        // console.log('----here', PageSize.target.value);
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value;


        this.setState({ CommunicationsPageSize: sizeOfPage });

        
        
        
        

        let {CommunicationsCurrentPage,NotificationType } = this.state;

        let params = `PageSize=${sizeOfPage}&CurrentPage=${CommunicationsCurrentPage}&NotificationType=${NotificationType}`;
        

        if(tempData){
            dispatch(loanActions.getALoanCommunications(this.loanEncodedKey, params, tempData));
            
        }else{
            dispatch(loanActions.getALoanCommunications(this.loanEncodedKey, params));
        }
    }

    setCommunicationsRequestNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        


        let {CommunicationsPageSize,NotificationType } = this.state;

        let params = `PageSize=${CommunicationsPageSize}&CurrentPage=${nextPage}&NotificationType=${NotificationType}`;
       
       
        if(tempData){
            dispatch(loanActions.getALoanCommunications(this.loanEncodedKey, params, tempData));
        }else{
            dispatch(loanActions.getALoanCommunications(this.loanEncodedKey, params));
        }
    }


    setActivitiesRequestPagesize = (PageSize, tempData) => {
        // console.log('----here', PageSize.target.value);
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value;


        this.setState({ ActivitiesPageSize: sizeOfPage });

       

       
        
        
        let {ActivitiesCurrentPage } = this.state;

        let params = `PageSize=${sizeOfPage}&CurrentPage=${ActivitiesCurrentPage}`;
        

        if(tempData){
            dispatch(loanActions.getALoanActivities(this.loanEncodedKey,params, tempData));
            
        }else{
            dispatch(loanActions.getALoanActivities(this.loanEncodedKey,params));
        }
    }

    setActivitiesRequestNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        

        let {ActivitiesPageSize } = this.state;

        let params = `PageSize=${ActivitiesPageSize}&CurrentPage=${nextPage}`;

       
       
        if(tempData){
            dispatch(loanActions.getALoanActivities(this.loanEncodedKey, params, tempData));
        }else{
            dispatch(loanActions.getALoanActivities(this.loanEncodedKey, params));
        }
    }

    renderLoanActivities =()=>{
        // this.getALoanActivities();

        let getALoanAccountActivitiesRequest = this.props.getALoanAccountActivitiesReducer;

        let saveRequestData= getALoanAccountActivitiesRequest.request_data!==undefined?getALoanAccountActivitiesRequest.request_data.tempData:null;
        if(getALoanAccountActivitiesRequest.request_status===loanAndDepositsConstants.GET_A_LOAN_ACTIVITIES_PENDING){
            if(saveRequestData===undefined){
                return(
                    <div className="loading-content">
                        <div className="loading-text">Please wait... </div>
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

                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25" >25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                
                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    {/* <th>Id</th> */}
                                    <th>Date Created</th>
                                    <th>Username</th>
                                    <th>Action</th>
                                    <th>Affected Customer</th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <td></td> */}
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
                    <div className="loading-content">
                        <div className="loading-text">Please wait... </div>
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
                                        value={this.state.ActivitiesPageSize}
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
                                    {/* <th>Id</th> */}
                                    <th>Date Created</th>
                                    <th>Username</th>
                                    <th>Action</th>
                                    <th>Affected Customer</th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    saveRequestData.map((eachActivity, index)=>{
                                        return(
                                            <Fragment key={index}>
                                                <tr>
                                                    {/* <td>{eachActivity.id}</td> */}
                                                    <td>{eachActivity.creationDate}</td>
                                                    <td>{eachActivity.userName}</td>
                                                    <td>{eachActivity.action}</td>
                                                    <td>{eachActivity.affectedCustomerName}</td>
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


        if(getALoanAccountActivitiesRequest.request_status===loanAndDepositsConstants.GET_A_LOAN_ACTIVITIES_SUCCESS){
            let loanAccountActivitiesData = getALoanAccountActivitiesRequest.request_data.response.data;
            
            if(loanAccountActivitiesData.result.length>=1){
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
                                        onChange={(e)=>this.setActivitiesRequestPagesize(e, loanAccountActivitiesData.result)}
                                        value={this.state.ActivitiesPageSize}
                                        className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={loanAccountActivitiesData.totalPages}
                                    currPage={loanAccountActivitiesData.currentPage}
                                    currRecordsCount={loanAccountActivitiesData.result.length}
                                    totalRows={loanAccountActivitiesData.totalRows}
                                    tempData={loanAccountActivitiesData.result}
                                    pagesCountToshow={4}
                                    refreshFunc={this.setActivitiesRequestNextPage}
                                />
                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    {/* <th>Id</th> */}
                                    <th>Date Created</th>
                                    <th>Username</th>
                                    <th>Action</th>
                                    <th>Affected Customer</th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    loanAccountActivitiesData.result.map((eachActivity, index)=>{
                                        return(
                                            <Fragment key={index}>
                                                <tr>
                                                    {/* <td>{eachActivity.id}</td> */}
                                                    <td>{eachActivity.creationDate}</td>
                                                    <td>{eachActivity.userName}</td>
                                                    <td>{eachActivity.action}</td>
                                                    <td>{eachActivity.affectedCustomerName}</td>
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
                                        // onChange={this.setPagesize}
                                        value={this.state.ActivitiesPageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25" >25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    {/* <th>Id</th> */}
                                    <th>Date Created</th>
                                    <th>Username</th>
                                    <th>Action</th>
                                    <th>Affected Customer</th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <td></td> */}
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
            
            
            // if(loanAccountActivitiesData.result.length>=1){
            //     return(
            //         <div className="activities-wrap">
            //             {
            //                 loanAccountActivitiesData.result.map((eachActivity,  index)=>{
            //                     return(
            //                         <div className="each-activity">
            //                             <span>
            //                                 <NavLink to='/customer/20/savingsaccount/77339322'>Payroll - Private 2073458499</NavLink>
            //                             </span>
            //                             <span className="activity-action">{eachActivity.action}</span>
            //                             <div>
            //                                 <span className="action-date">{eachActivity.creationDate}</span>
            //                                 <span className="action-by"> <NavLink to='/customer/20/savingsaccount/77339322'>{eachActivity.affectedUserName}</NavLink></span>
            //                             </div>
            //                         </div>
            //                     )
            //                 })
            //             }
            //         </div>
            //     )
            // }else{
            //     return(
            //         <div className="activities-wrap">
            //             <div>No activities to display</div>
            //         </div>
            //     )
            // }
        }



        if(getALoanAccountActivitiesRequest.request_status===loanAndDepositsConstants.GET_A_LOAN_ACTIVITIES_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getALoanAccountActivitiesRequest.request_data.error}</div>
            </div>
            )
        }
    }

    renderALoanCommunicatons=()=>{
        let getALoanAccountCommunicationsRequest =  this.props.getALoanAccountCommunicationsReducer;
        let saveRequestData= getALoanAccountCommunicationsRequest.request_data!==undefined?getALoanAccountCommunicationsRequest.request_data.tempData:null;
        if(getALoanAccountCommunicationsRequest.request_status===loanAndDepositsConstants.GET_A_LOAN_COMMUNICATIONS_PENDING){
            if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
                return(
                    <div className="loading-content">
                        <div className="loading-text">Please wait... </div>
                        <div className="heading-with-cta ">
                            <Form className="one-liner"></Form>
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
            }else{
                return(
                    <div>
                        <div className="loading-text">Please wait... </div>
                        <div className="heading-with-cta ">
                        <Form className="one-liner"></Form>
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
                                    <th>ID</th>
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
                                   saveRequestData.map((eachCommunication, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{eachCommunication.id} </td>
                                                <td>{eachCommunication.sentBy} </td>
                                                <td>{eachCommunication.destination} </td>
                                                <td>{eachCommunication.message} </td>
                                                <td>{eachCommunication.communicationTypeDescription} </td>
                                                <td>{eachCommunication.communicationStateDescription} </td>
                                                <td>{eachCommunication.dateSent} </td>
                                                <td>{eachCommunication.failureReason} </td>
                                            </tr>
                                        )
                                   }) 
                                }
                            </tbody>
                        </TableComponent>
                    </div>
                )
            }
        }

        if(getALoanAccountCommunicationsRequest.request_status===loanAndDepositsConstants.GET_A_LOAN_COMMUNICATIONS_SUCCESS){
            let getALoanAccountCommunicationsInfo = getALoanAccountCommunicationsRequest.request_data.response.data;
            let getALoanAccountCommunicationsData = getALoanAccountCommunicationsRequest.request_data.response.data.result;

            if(getALoanAccountCommunicationsData.length>=1){


                return(
                    <div>
                        <div className="heading-with-cta ">
                            <Form className="one-liner"></Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    onChange={(e)=>this.setCommunicationsRequestPagesize(e, getALoanAccountCommunicationsData)}
                                    value={this.state.CommunicationsPageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={getALoanAccountCommunicationsInfo.totalPages}
                                    currPage={getALoanAccountCommunicationsInfo.currentPage}
                                    currRecordsCount={getALoanAccountCommunicationsInfo.length}
                                    totalRows={getALoanAccountCommunicationsInfo.totalRows}
                                    tempData={getALoanAccountCommunicationsData}
                                    pagesCountToshow={4}
                                    refreshFunc={this.setCommunicationsRequestNextPage}
                                />
                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
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
                                   getALoanAccountCommunicationsData.map((eachCommunication, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{eachCommunication.id} </td>
                                                <td>{eachCommunication.sentBy} </td>
                                                <td>{eachCommunication.destination} </td>
                                                <td>{eachCommunication.message} </td>
                                                <td>{eachCommunication.communicationTypeDescription} </td>
                                                <td>{eachCommunication.communicationStateDescription} </td>
                                                <td>{eachCommunication.dateSent} </td>
                                                <td>{eachCommunication.failureReason} </td>
                                            </tr>
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
                        <div className="heading-with-cta ">
                            <Form className="one-liner"></Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    onChange={(e)=>this.setCommunicationsRequestPagesize(e, getALoanAccountCommunicationsData)}
                                    value={this.state.CommunicationsPageSize}
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

        if(getALoanAccountCommunicationsRequest.request_status===loanAndDepositsConstants.GET_A_LOAN_COMMUNICATIONS_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getALoanAccountCommunicationsRequest.request_data.error}</div>
            </div>
            )
        }
    }



    renderLoanSchedule = ()=>{
        // this.getCustomerLoanSchedule();
        let getAClientLoanAccountScheduleRequest = this.props.getAClientLoanAccountScheduleReducer;

        let saveRequestData= getAClientLoanAccountScheduleRequest.request_data!==undefined?getAClientLoanAccountScheduleRequest.request_data.tempData:null;
        if(getAClientLoanAccountScheduleRequest.request_status===loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_PENDING){
            if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
                return(
                    <div className="loading-content">
                        <div className="loading-text">Please wait... </div>
                        {/* <div className="heading-with-cta ">
                            <Form className="one-liner"></Form>
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
                        </div> */}
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Due</th>
                                    <th>Payment Due</th>
                                    <th>Total Balance</th>
                                    <th>Expected Principal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
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
                    <div className="loading-content">
                        <div className="loading-text">Please wait... </div>
                        {/* <div className="heading-with-cta ">
                            <Form className="one-liner"></Form>
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
                        </div> */}
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                <th>#</th>
                                    <th>Due</th>
                                    <th>Payment Due</th>
                                    <th>Total Balance</th>
                                    <th>Expected Principal</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
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

        if(getAClientLoanAccountScheduleRequest.request_status===loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_SUCCESS){
            let getAClientLoanAccountScheduleInfo = getAClientLoanAccountScheduleRequest.request_data.response.data;
            let getAClientLoanAccountScheduleData = getAClientLoanAccountScheduleRequest.request_data.response.data.result;

            // if(getAClientLoanAccountScheduleInfo.length>=1){
            if(getAClientLoanAccountScheduleInfo!==null && getAClientLoanAccountScheduleInfo.loanScheduleModels.length>=1 ){
                return(
                    <div>
                         {/* <div className="heading-with-cta ">
                            <Form className="one-liner"></Form>
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
                        </div> */}
                        <div className="table-helper">
                            <input type="checkbox" name="" 
                                onChange={(e)=>this.setScheduleFilter(e, 'showAmountExpected')}
                                checked={this.state.showAmountExpected}
                                id="showAmountExpected" />
                            <label htmlFor="showAmountExpected">Amount Expected</label>
                            <input type="checkbox" name="" 
                                onChange={(e)=>this.setScheduleFilter(e, 'showAmountPaid')}
                                checked={this.state.showAmountPaid}
                                id="showAmountPaid" />
                            <label htmlFor="showAmountPaid">Amount Paid</label>
                            <input type="checkbox" name="" 
                                onChange={(e)=>this.setScheduleFilter(e, 'showAmountDue')}
                                checked={this.state.showAmountDue}
                                id="showAmountDue" />
                            <label htmlFor="showAmountDue">Amount Due</label>
                        </div>
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Due</th>
                                    <th>Payment Due</th>
                                    {/* <th>Interest Rate</th> */}
                                    {this.state.showAmountExpected===true && 
                                        <th className="borderdleft">Expected Principal</th>
                                    }
                                    {this.state.showAmountExpected===true && 
                                        <th>Expected Interest</th>
                                    }
                                    {this.state.showAmountExpected===true && 
                                        <th>Expected Fees</th>
                                    }
                                    {this.state.showAmountExpected===true && 
                                        <th className="borderdright">Expected Penalty</th>
                                    }
                                    {this.state.showAmountPaid && 
                                        <th className="borderdleft">Principal Paid</th>
                                    }
                                    {this.state.showAmountPaid && 
                                        <th>Fees Paid</th>
                                    }
                                    {this.state.showAmountPaid && 
                                        <th>Interest Paid</th>
                                    }
                                    {this.state.showAmountPaid && 
                                        <th className="borderdright">Penalty Paid</th>
                                    }
                                    {this.state.showAmountDue && 
                                        <th className="borderdleft">Principal Due</th>
                                    }
                                    {this.state.showAmountDue && 
                                        <th>Interest Due</th>
                                    }
                                    {this.state.showAmountDue && 
                                        <th>Fee Due</th>
                                    }
                                    {this.state.showAmountDue && 
                                        <th>Penalty Due</th>
                                    }
                                    {this.state.showAmountDue && 
                                        <th className="borderdright">Total Due</th>
                                    }
                                    <th>Total Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getAClientLoanAccountScheduleInfo.loanScheduleModels.map((eachSchedule, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{index}</td>
                                                <td>{(eachSchedule.installmentDate!==null && eachSchedule.installmentDate!=="")? getDateFromISO(eachSchedule.installmentDate):"-"}</td>
                                                <td>{(eachSchedule.paymentDue!==null && eachSchedule.paymentDue>0)? numberWithCommas(eachSchedule.paymentDue, true): "-"}</td>
                                                {/* <td>{numberWithCommas(eachSchedule.interestRate)}</td> */}
                                                {this.state.showAmountExpected===true && 
                                                    <td className="borderdleft">{( eachSchedule.loanScheduleExpected.expectedPrincipal!==null && eachSchedule.loanScheduleExpected.expectedPrincipal>0) ? numberWithCommas(eachSchedule.loanScheduleExpected.expectedPrincipal, true) : "-"}</td>
                                                }
                                                {this.state.showAmountExpected===true && 
                                                    <td>{(eachSchedule.loanScheduleExpected.expectedInterest !==null && eachSchedule.loanScheduleExpected.expectedInterest>0) ? numberWithCommas(eachSchedule.loanScheduleExpected.expectedInterest, true) : "-"}</td>
                                                }
                                                {this.state.showAmountExpected===true && 
                                                    <td>{(eachSchedule.loanScheduleExpected.expectedFees!==null && eachSchedule.loanScheduleExpected.expectedFees >0)? numberWithCommas(eachSchedule.loanScheduleExpected.expectedFees, true) : "-"}</td>
                                                }
                                                {this.state.showAmountExpected===true && 
                                                    <td className="borderdright">{(eachSchedule.loanScheduleExpected.expectedPenalty!==null && eachSchedule.loanScheduleExpected.expectedPenalty>0)? numberWithCommas(eachSchedule.loanScheduleExpected.expectedPenalty, true):"-"}</td>
                                                }
                                                {this.state.showAmountPaid && 
                                                    <td className="borderdleft">{(eachSchedule.loanSchedulePaid.principalPaid!==null && eachSchedule.loanSchedulePaid.principalPaid>0)? numberWithCommas(eachSchedule.loanSchedulePaid.principalPaid, true):"-"}</td>
                                                }
                                                {this.state.showAmountPaid && 
                                                    <td>{(eachSchedule.loanSchedulePaid.feesPaid!==null && eachSchedule.loanSchedulePaid.feesPaid>0)? numberWithCommas(eachSchedule.loanSchedulePaid.feesPaid, true):"-"}</td>
                                                }
                                                {this.state.showAmountPaid && 
                                                    <td>{(eachSchedule.loanSchedulePaid.interestPaid!==null && eachSchedule.loanSchedulePaid.interestPaid>0)? numberWithCommas(eachSchedule.loanSchedulePaid.interestPaid, true):"-"}</td>
                                                }
                                                {this.state.showAmountPaid && 
                                                    <td className="borderdright">{(eachSchedule.loanSchedulePaid.penalyPaid!==null && eachSchedule.loanSchedulePaid.penalyPaid >0)? numberWithCommas(eachSchedule.loanSchedulePaid.penalyPaid, true):"-"}</td>
                                                }
                                                {this.state.showAmountDue && 
                                                    <td className="borderdleft">{(eachSchedule.loanScheduleDue.principalDue!==null && eachSchedule.loanScheduleDue.principalDue>0)? numberWithCommas(eachSchedule.loanScheduleDue.principalDue, true):"-"}</td>
                                                }
                                                {this.state.showAmountDue && 
                                                    <td>{(eachSchedule.loanScheduleDue.interestDue!==null && eachSchedule.loanScheduleDue.interestDue>0)? numberWithCommas(eachSchedule.loanScheduleDue.interestDue, true):"-"}</td>
                                                }
                                                {this.state.showAmountDue && 
                                                    <td>{(eachSchedule.loanScheduleDue.feesDue!==null && eachSchedule.loanScheduleDue.feesDue>0)? numberWithCommas(eachSchedule.loanScheduleDue.feesDue, true):"-"}</td>
                                                }
                                                {this.state.showAmountDue && 
                                                    <td>{(eachSchedule.loanScheduleDue.penalyDue!==null && eachSchedule.loanScheduleDue.penalyDue>0)? numberWithCommas(eachSchedule.loanScheduleDue.penalyDue, true):"-"}</td>
                                                }
                                                {this.state.showAmountDue && 
                                                    <td className="borderdright">{(eachSchedule.loanScheduleDue.totalDue!==null && eachSchedule.loanScheduleDue.totalDue>0)? numberWithCommas(eachSchedule.loanScheduleDue.totalDue):"-"}</td>
                                                }
                                                <td>{(eachSchedule.totalBalance !==null && eachSchedule.totalBalance>0) ? numberWithCommas(eachSchedule.totalBalance, true) : "-"}</td>
                                            </tr>
                                        )
                                    })
                                }

                                <tr>
                                    <td colSpan="3" className="bolden borderdright">Totals</td>
                                    {this.state.showAmountExpected===true && 
                                        <td className="">{(getAClientLoanAccountScheduleInfo.loanScheduleExpected.expectedPrincipal!==null && getAClientLoanAccountScheduleInfo.loanScheduleExpected.expectedPrincipal>0)? numberWithCommas(getAClientLoanAccountScheduleInfo.loanScheduleExpected.expectedPrincipal, true) : "-"} </td>
                                    }
                                    {this.state.showAmountExpected===true && 
                                        <td className="">{(getAClientLoanAccountScheduleInfo.loanScheduleExpected.expectedInterest!==null && getAClientLoanAccountScheduleInfo.loanScheduleExpected.expectedInterest>0)? numberWithCommas(getAClientLoanAccountScheduleInfo.loanScheduleExpected.expectedInterest, true) : "-"} </td>
                                    }
                                    {this.state.showAmountExpected===true && 
                                        <td className="">{(getAClientLoanAccountScheduleInfo.loanScheduleExpected.expectedFees!==null && getAClientLoanAccountScheduleInfo.loanScheduleExpected.expectedFees>0)? numberWithCommas(getAClientLoanAccountScheduleInfo.loanScheduleExpected.expectedFees, true) : "-"} </td>
                                    }
                                    {this.state.showAmountExpected===true && 
                                        <td className="borderdright">{(getAClientLoanAccountScheduleInfo.loanScheduleExpected.expectedPenalty!==null && getAClientLoanAccountScheduleInfo.loanScheduleExpected.expectedPenalty>0)? numberWithCommas(getAClientLoanAccountScheduleInfo.loanScheduleExpected.expectedPenalty, true) : "-"} </td>
                                    }
                                    {this.state.showAmountPaid===true && 
                                        <td className="">{(getAClientLoanAccountScheduleInfo.loanSchedulePaid.principalPaid!==null && getAClientLoanAccountScheduleInfo.loanSchedulePaid.principalPaid>0)? numberWithCommas(getAClientLoanAccountScheduleInfo.loanSchedulePaid.principalPaid, true) : "-"} </td>
                                    }
                                    {this.state.showAmountPaid===true && 
                                        <td className="">{(getAClientLoanAccountScheduleInfo.loanSchedulePaid.feesPaid!==null && getAClientLoanAccountScheduleInfo.loanSchedulePaid.feesPaid>0)? numberWithCommas(getAClientLoanAccountScheduleInfo.loanSchedulePaid.feesPaid, true) : "-"} </td>
                                    }
                                    {this.state.showAmountPaid===true && 
                                        <td className="">{(getAClientLoanAccountScheduleInfo.loanSchedulePaid.interestPaid!==null && getAClientLoanAccountScheduleInfo.loanSchedulePaid.interestPaid>0)? numberWithCommas(getAClientLoanAccountScheduleInfo.loanSchedulePaid.interestPaid, true) : "-"} </td>
                                    }
                                    {this.state.showAmountPaid===true && 
                                        <td className="borderdright">{(getAClientLoanAccountScheduleInfo.loanSchedulePaid.penalyPaid!==null && getAClientLoanAccountScheduleInfo.loanSchedulePaid.penalyPaid>0)? numberWithCommas(getAClientLoanAccountScheduleInfo.loanSchedulePaid.penalyPaid, true) : "-"} </td>
                                    }
                                    {this.state.showAmountDue===true && 
                                        <td className="">{(getAClientLoanAccountScheduleInfo.loanScheduleDue.principalDue!==null && getAClientLoanAccountScheduleInfo.loanScheduleDue.principalDue>0)? numberWithCommas(getAClientLoanAccountScheduleInfo.loanScheduleDue.principalDue, true) : "-"} </td>
                                    }
                                    {this.state.showAmountDue===true && 
                                        <td className="">{(getAClientLoanAccountScheduleInfo.loanScheduleDue.interestDue!==null && getAClientLoanAccountScheduleInfo.loanScheduleDue.interestDue>0)? numberWithCommas(getAClientLoanAccountScheduleInfo.loanScheduleDue.interestDue, true) : "-"} </td>
                                    }
                                    {this.state.showAmountDue===true && 
                                        <td className="">{(getAClientLoanAccountScheduleInfo.loanScheduleDue.feesDue!==null && getAClientLoanAccountScheduleInfo.loanScheduleDue.feesDue>0)? numberWithCommas(getAClientLoanAccountScheduleInfo.loanScheduleDue.feesDue, true) : "-"} </td>
                                    }
                                    {this.state.showAmountDue===true && 
                                        <td className="">{(getAClientLoanAccountScheduleInfo.loanScheduleDue.penalyDue!==null && getAClientLoanAccountScheduleInfo.loanScheduleDue.penalyDue>0)? numberWithCommas(getAClientLoanAccountScheduleInfo.loanScheduleDue.penalyDue, true) : "-"} </td>
                                    }
                                    {this.state.showAmountDue===true && 
                                        <td className="borderdright">{(getAClientLoanAccountScheduleInfo.loanScheduleDue.totalDue!==null && getAClientLoanAccountScheduleInfo.loanScheduleDue.totalDue>0)? numberWithCommas(getAClientLoanAccountScheduleInfo.loanScheduleDue.totalDue, true) : "-"} </td>
                                    }
                                    <td className="">-</td>
                                </tr>
                                
                            </tbody>
                        </TableComponent>
                    </div>
                )
            }else{
                return(
                    <div>
                        <div className="heading-with-cta ">
                            <Form className="one-liner"></Form>
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
                                    <th>#</th>
                                    <th>Due</th>
                                    <th>Principal Due</th>
                                    <th>Interest Due</th>
                                    <th>Fees Due</th>
                                    <th>Penalty Due</th>
                                    <th>Total Due</th>
                                    <th>State</th>
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
                                    <td></td>
                                </tr>
                            </tbody>
                        </TableComponent>
                    </div>
                )
            }
        }


        if(getAClientLoanAccountScheduleRequest.request_status===loanAndDepositsConstants.GET_A_LOAN_SCHEDULE_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getAClientLoanAccountScheduleRequest.request_data.error}</div>
            </div>
            )
        }

        
    }

    renderLoanTransaction = ()=>{
        let getAccountLoanTransactionRequest =  this.props.getAccountLoanTransactionReducer;
        let saveRequestData= getAccountLoanTransactionRequest.request_data!==undefined?getAccountLoanTransactionRequest.request_data.tempData:null;
        if(getAccountLoanTransactionRequest.request_status===loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_PENDING){
            if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
                return(
                    <div>
                        <div className="loading-text">Please wait... </div>
                        <div className="heading-with-cta ">
                            <div></div>
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
                                    <th>Customer Name</th>
                                    <th>Transaction Date</th>
                                    <th>Entry Date</th>
                                    <th>Type</th>
                                    <th>Transaction Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
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
                    <div>
                        <div className="loading-text">Please wait... </div>
                        <div className="heading-with-cta ">
                            <div></div>
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
                                    <th>Customer Name</th>
                                    <th>Transaction Date</th>
                                    <th>Entry Date</th>
                                    <th>Type</th>
                                    <th>Transaction Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    saveRequestData.map((eachTxt, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{eachTxt.accountHolderName} </td>
                                                <td>{getDateFromISO(eachTxt.transactionDate)}</td>
                                                <td>{getDateFromISO(eachTxt.entryDate)}</td>
                                                <td>{eachTxt.typeDescription}</td>
                                                <td>{eachTxt.transactionAmount}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </TableComponent>
                    </div>
                )
            }
        }

        if(getAccountLoanTransactionRequest.request_status===loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_SUCCESS){
            let getAccountLoanTransactionInfo = getAccountLoanTransactionRequest.request_data.response.data;
            let getAccountLoanTransactionData = getAccountLoanTransactionRequest.request_data.response.data.result;

            if(getAccountLoanTransactionData.length>=1){
                return(
                    <div>
                        <div className="heading-with-cta ">
                            <div></div>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select 
                                    id="toshow" 
                                    className="countdropdown form-control form-control-sm"
                                    onChange={(e)=>this.setTransactionRequestPagesize(e, getAccountLoanTransactionData)}
                                    value={this.state.loanTransactionPageSize}>
                                    
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={getAccountLoanTransactionInfo.totalPages}
                                    currPage={getAccountLoanTransactionInfo.currentPage}
                                    currRecordsCount={getAccountLoanTransactionInfo.length}
                                    totalRows={getAccountLoanTransactionInfo.totalRows}
                                    tempData={getAccountLoanTransactionData}
                                    pagesCountToshow={4}
                                    refreshFunc={this.setTransactionRequestNextPage}
                                />
                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>Customer Name</th>
                                    <th>Transaction Date</th>
                                    <th>Entry Date</th>
                                    <th>Type</th>
                                    <th>Transaction Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    getAccountLoanTransactionData.map((eachTxt, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{eachTxt.accountHolderName} </td>
                                                <td>{getDateFromISO(eachTxt.transactionDate)}</td>
                                                <td>{getDateFromISO(eachTxt.entryDate)}</td>
                                                <td>{eachTxt.typeDescription}</td>
                                                <td>{eachTxt.transactionAmount}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </TableComponent>
                    </div>
                )
            }else{
                return(
                    <div>
                        <div className="heading-with-cta ">
                            <div></div>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select 
                                    id="toshow" 
                                    className="countdropdown form-control form-control-sm"
                                    onChange={(e)=>this.setTransactionRequestPagesize(e, getAccountLoanTransactionData)}
                                    value={this.state.loanTransactionPageSize}>
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
                                    <th>Customer Name</th>
                                    <th>Transaction Date</th>
                                    <th>Entry Date</th>
                                    <th>Type</th>
                                    <th>Transaction Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
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
    }
    
    renderLoanAccountDetails = (loanAccountData)=>{


        return(
            <div>
                <div className="amounts-wrap w-65">
                    <div className="eachamount">
                        <h6>Total Balance</h6>
                        <div className="amounttext">&#8358;{numberWithCommas(loanAccountData.loanAmount)}</div>
                    </div>
                    <div className="eachamount">
                        <h6>Total Due</h6>
                        <div className="amounttext">&#8358;{numberWithCommas(loanAccountData.totalDue)}</div>
                    </div>
                    <div className="eachamount">
                        <h6>Total Paid</h6>
                        <div className="amounttext">&#8358;{numberWithCommas(loanAccountData.totalPaid)}</div>
                    </div>
                    <div className="eachamount">
                        <h6>Installments</h6>
                        <div className="amounttext">{loanAccountData.installments}</div>
                    </div>
                </div>
                <div className="overview-wrap">
                    <div className="each-overview">
                        <h6>General</h6>
                        <TableComponent classnames="striped bordered hover">

                            <tbody>
                                <tr>
                                    <td>Account ID</td>
                                    <td>{loanAccountData.accountNumber}</td>
                                </tr>
                                <tr>
                                    <td>Assigned to Branch</td>
                                    <td>{loanAccountData.branchEncodedKey}</td>
                                </tr>
                                <tr>
                                    <td>Account State</td>
                                    <td>{loanAccountData.loanStateDescription}</td>
                                </tr>
                                <tr>
                                    <td>Account Officer</td>
                                    <td>{loanAccountData.accountOfficerName}</td>
                                </tr>
                                <tr>
                                    <td>Currency</td>
                                    <td> NGN</td>
                                </tr>
                                <tr>
                                    <td>First repayment Date</td>
                                    <td>{getDateFromISO(loanAccountData.firstRepaymentDate)}</td>
                                </tr>
                                <tr>
                                    <td>Date Created</td>
                                    <td>{loanAccountData.dateCreated}</td>
                                </tr>
                                
                            </tbody>
                        </TableComponent>
                    </div>
                    <div className="each-overview">
                        <h6>Details</h6>
                        <TableComponent classnames="striped bordered hover">

                            <tbody>
                                <tr>
                                    <td>Principal Paid</td>
                                    <td>&#8358;{numberWithCommas(loanAccountData.principalPaid)}</td>
                                </tr>
                                <tr>
                                    <td>Principal Due</td>
                                    <td>&#8358;{numberWithCommas(loanAccountData.principalDue)}</td>
                                </tr>
                                <tr>
                                    <td>Interest Paid</td>
                                    <td>&#8358;{numberWithCommas(loanAccountData.interestPaid)}</td>
                                </tr>
                                <tr>
                                    <td>Interest Due</td>
                                    <td>&#8358;{numberWithCommas(loanAccountData.interestDue)}</td>
                                </tr>
                                <tr>
                                    <td>Penalty Due</td>
                                    <td>&#8358;{numberWithCommas(loanAccountData.penaltyDue)}</td>
                                </tr>
                                <tr>
                                    <td>Penalty Paid</td>
                                    <td>&#8358;{numberWithCommas(loanAccountData.penaltyPaid)}</td>
                                </tr>
                                <tr>
                                    <td>Fee Due</td>
                                    <td>&#8358;{numberWithCommas(loanAccountData.feeDue)}</td>
                                </tr>
                                <tr>
                                    <td>Fee Paid</td>
                                    <td>&#8358;{numberWithCommas(loanAccountData.feePaid)}</td>
                                </tr>
                            </tbody>
                        </TableComponent>
                    </div>
                </div>
            </div>
        )
    }

    handleCommentsBoxClose = () => this.setState({showAddComment:false});
    handleCommentsBoxShow = () => this.setState({showAddComment:true});

    handleAttachmentBoxClose = () => this.setState({showAddAttachment:false});
    handleAttachmentBoxShow = () => this.setState({showAddAttachment:true});

    handleAddLoanComments = async (addLoanCommentsPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(loanActions.creatALoanComment(addLoanCommentsPayload));
    } 
    addNewCommentBox = ()=>{
        const {showAddComment} = this.state;
        let  createALoanCommentRequest = this.props.createALoanCommentReducer;
        let addLoanCommentsValidationSchema = Yup.object().shape({
                comment:  Yup.string()
                    .required('Required'),
            
           });
        return(
            <Modal show={showAddComment} onHide={this.handleCommentsBoxClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={false}>
                <Formik
                    initialValues={{
                        comment:""
                    }}

                    validationSchema={addLoanCommentsValidationSchema}
                    onSubmit={(values, { resetForm }) => {

                        let addCustomerCommentsPayload = {
                            comment:values.comment,
                            accountEncodedKey:this.loanEncodedKey
                        }




                        this.handleAddLoanComments(addCustomerCommentsPayload)
                            .then(
                                () => {

                                    if (this.props.createALoanCommentReducer.request_status === loanAndDepositsConstants.CREATE_A_LOAN_COMMENT_SUCCESS) {
                                        resetForm();
                                        // value = {null}

                                        setTimeout(() => {
                                            this.props.dispatch(loanActions.creatALoanComment("CLEAR"))
                                            this.handleCommentsBoxClose();
                                            this.getALoanComments();
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
                        touched,
                        isValid,
                        errors, }) => (
                            <Form
                                noValidate
                                onSubmit={handleSubmit}
                                className="">
                                <Modal.Header>
                                    <Modal.Title>Add Loan comment</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Group >
                                        <Form.Label className="block-level">Comments</Form.Label>
                                        <Form.Control as="textarea"
                                            rows="3"
                                            onChange={handleChange}
                                            name="comment"
                                            value={values.comment}
                                            className={errors.comment && touched.comment ? "is-invalid form-control form-control-sm" : null} />

                                        {errors.comment && touched.comment ? (
                                            <span className="invalid-feedback">{errors.comment}</span>
                                        ) : null}
                                    </Form.Group>
                                </Modal.Body>
                                <Modal.Footer>

                                    <Button variant="light" onClick={this.handleCommentsBoxClose}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        variant="success"
                                        type="submit"
                                        disabled={createALoanCommentRequest.is_request_processing}
                                    >
                                        {createALoanCommentRequest.is_request_processing?"Please wait...":"Save Comment"}
                                        
                                    </Button>

                                </Modal.Footer>

                                {createALoanCommentRequest.request_status === loanAndDepositsConstants.CREATE_A_LOAN_COMMENT_SUCCESS && 
                                    <Alert variant="success" className="w-65 mlr-auto">
                                        {createALoanCommentRequest.request_data.response.data.message}
                                    </Alert>
                                }
                                {createALoanCommentRequest.request_status === loanAndDepositsConstants.CREATE_A_LOAN_COMMENT_FAILURE && 
                                    <Alert variant="danger" className="w-65 mlr-auto">
                                        {createALoanCommentRequest.request_data.error}
                                    </Alert>
                                }
                            </Form>
                        )}
                </Formik>

                
            </Modal>
        )
    }
    
    HandleFileUpLoad = (event) => {
        let filename = event.target.files[0].name,
            ext = event.target.files[0].type;
        

       
     
 
        this.setState({docuploaded: event.target.files[0], filename,isDocAdded:true});
    }

    handleAddAttachment = async (addAttachmentPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(loanActions.creatALoanAttachment(addAttachmentPayload));
    } 

    addNewAttachmentBox = ()=>{
        const {showAddAttachment, docuploaded,isDocAdded} = this.state;
        let  createALoanAttachmentRequest = this.props.createALoanAttachmentReducer;
        let addLoanAttachmentsValidationSchema = Yup.object().shape({
            Title:  Yup.string()
                    .min(2, 'Valid response required')
                    .required('Required'),
            Description: Yup.string()
                    .required('Required')
                    .min(3, 'Valid response required'),
            
           });
        return(
            <Modal show={showAddAttachment} onHide={this.handleAttachmentBoxClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={false}>
                <Formik
                    initialValues={{
                        Description:"",
                        Title:""
                    }}

                    validationSchema={addLoanAttachmentsValidationSchema}
                    onSubmit={(values, { resetForm }) => {

                        // let addCustomerAttachmentPayload = {
                        //     comment:values.comment,
                        //     ClientEncodedKey:this.clientEncodedKey
                        // }

                        if(docuploaded!==''){
                            this.setState({isDocAdded:true});

                            const attachmentFormData = new FormData();
                            attachmentFormData.append('DocumentFile', this.state.docuploaded);
                            attachmentFormData.append('AccountEncodedKey', this.loanEncodedKey);
                            attachmentFormData.append('Description', values.Description);
                            attachmentFormData.append('Title', values.Title);


                            // return false;

                            this.handleAddAttachment(attachmentFormData)
                                .then(
                                    () => {

                                        if (this.props.createALoanAttachmentReducer.request_status === loanAndDepositsConstants.CREATE_A_LOAN_ATTACHMENT_SUCCESS) {
                                            resetForm();
                                            // value = {null}

                                            setTimeout(() => {
                                                this.props.dispatch(loanActions.creatALoanAttachment("CLEAR"))
                                                this.setState({docuploaded: '', filename:'', isDocAdded:false});
                                                this.handleAttachmentBoxClose();
                                                this.getACustomerLoanAttachments();;
                                            }, 3000);
                                        }

                                        

                                    }
                                )
                        }else{
                            this.setState({isDocAdded:false})
                        }

                    }}
                >
                    {({ handleSubmit,
                        handleChange,
                        handleBlur,
                        resetForm,
                        values,
                        setFieldValue,
                        touched,
                        isValid,
                        errors, }) => (
                            <Form
                                noValidate
                                onSubmit={handleSubmit}
                                className="">
                                <Modal.Header>
                                    <Modal.Title>Upload Document</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Group>
                                        <Form.Label className="block-level">Title</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            onChange={handleChange}
                                            name="Title"
                                            value={values.Title}
                                            className={errors.Title && touched.Title ? "is-invalid form-control form-control-sm" : null} />
                                            
                                            {errors.Title && touched.Title ? (
                                            <span className="invalid-feedback">{errors.Title}</span>
                                            ) : null}
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Label className="block-level">Description</Form.Label>
                                        <Form.Control as="textarea"
                                            rows="3"
                                            onChange={handleChange}
                                            name="Description"
                                            value={values.Description}
                                            className={errors.Description && touched.Description ? "is-invalid form-control form-control-sm" : null} />

                                        {errors.Description && touched.Description ? (
                                            <span className="invalid-feedback">{errors.Description}</span>
                                        ) : null}
                                        <div className="footer-with-cta">
                                            <label htmlFor="file-upload3" className="btn btn-primary">Choose file</label>
                                            <input name="docuploaded"  type="file" id="file-upload3"  onChange={this.HandleFileUpLoad}/>
                                        </div>

                                        {this.state.filename!==null && 
                                
                                            <div className="filename">
                                              File: <span>{this.state.filename}</span>  
                                            </div>
                                        }
                                    </Form.Group>
                                    {isDocAdded ===false &&
                                        <Alert variant="danger" className="w-65 mlr-auto">
                                            Please upload document
                                        </Alert>
                                    }
                                </Modal.Body>
                                <Modal.Footer>

                                    <Button variant="light" onClick={this.handleAttachmentBoxClose}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        variant="success"
                                        type="submit"
                                        disabled={createALoanAttachmentRequest.is_request_processing}
                                    >
                                        {createALoanAttachmentRequest.is_request_processing?"Please wait...":"Upload attachment"}
                                        
                                    </Button>

                                </Modal.Footer>

                                {createALoanAttachmentRequest.request_status === loanAndDepositsConstants.CREATE_A_LOAN_ATTACHMENT_SUCCESS && 
                                    <Alert variant="success" className="w-65 mlr-auto">
                                        {createALoanAttachmentRequest.request_data.response.data.message}
                                    </Alert>
                                }
                                {createALoanAttachmentRequest.request_status === loanAndDepositsConstants.CREATE_A_LOAN_ATTACHMENT_FAILURE && 
                                    <Alert variant="danger" className="w-65 mlr-auto">
                                        {createALoanAttachmentRequest.request_data.error}
                                    </Alert>
                                }
                            </Form>
                        )}
                </Formik>

                
            </Modal>
        )
    }

    renderAloanAttachments=()=>{
        let getALoanAccountAttachmentsRequest =  this.props.getALoanAccountAttachmentsReducer;

        let saveRequestData= getALoanAccountAttachmentsRequest.request_data!==undefined?getALoanAccountAttachmentsRequest.request_data.tempData:null;
        if(getALoanAccountAttachmentsRequest.request_status===loanAndDepositsConstants.GET_A_LOAN_ATTACHMENTS_PENDING){
            if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
                return(
                    <div className="loading-content">
                        <div className="loading-text">Please wait... </div>
                        <div className="heading-with-cta ">
                            <Form className="one-liner"></Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
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
                                    <th>Title</th>
                                    <th>Filename</th>
                                    <th>Description</th>
                                    <th>Created by</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </TableComponent>
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleAttachmentBoxShow}>Upload Document</Button>
                        </div>
                    </div>
                )
            }else{
                return(
                    <div>
                        <div className="loading-text">Please wait... </div>
                        <div className="heading-with-cta ">
                        <Form className="one-liner"></Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    value={this.state.AttachmentPageSize}
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
                                    <th>Title</th>
                                    <th>Filename</th>
                                    <th>Description</th>
                                    <th>Created by</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   saveRequestData.map((eachAttachment, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{eachAttachment.title} </td>
                                                <td>{eachAttachment.fileName} </td>
                                                <td>{eachAttachment.description} </td>
                                                <td>{eachAttachment.createdByUserName} </td>
                                                <td>{getDateFromISO(eachAttachment.timeStamp)} </td>
                                            </tr>
                                        )
                                   }) 
                                }
                            </tbody>
                        </TableComponent>
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleAttachmentBoxShow}>Upload Document</Button>
                        </div>
                    </div>
                )
            }
        }

        if(getALoanAccountAttachmentsRequest.request_status===loanAndDepositsConstants.GET_A_LOAN_ATTACHMENTS_SUCCESS){
            let getALoanAttachmentsInfo = getALoanAccountAttachmentsRequest.request_data.response.data;
            let getALoanAttachmentsData = getALoanAccountAttachmentsRequest.request_data.response.data.result;

            if(getALoanAttachmentsData.length>=1){


                return(
                    <div>
                        <div className="heading-with-cta ">
                        <Form className="one-liner"></Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    onChange={(e)=>this.setAttachmentRequestPagesize(e, getALoanAttachmentsData)}
                                    value={this.state.AttachmentPageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={getALoanAttachmentsInfo.totalPages}
                                    currPage={getALoanAttachmentsInfo.currentPage}
                                    currRecordsCount={getALoanAttachmentsInfo.length}
                                    totalRows={getALoanAttachmentsInfo.totalRows}
                                    tempData={getALoanAttachmentsData}
                                    pagesCountToshow={4}
                                    refreshFunc={this.setAttachmentRequestNextPage}
                                />
                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Filename</th>
                                    <th>Description</th>
                                    <th>Created by</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   getALoanAttachmentsData.map((eachAttachment, index)=>{
                                        return(
                                            <tr key={index}>
                                                <td>{eachAttachment.title} </td>
                                                <td>{eachAttachment.fileName} </td>
                                                <td>{eachAttachment.description} </td>
                                                <td>{eachAttachment.createdByUserName} </td>
                                                <td>{getDateFromISO(eachAttachment.timeStamp)} </td>
                                            </tr>
                                        )
                                   }) 
                                }
                            </tbody>
                        </TableComponent>
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleAttachmentBoxShow}>Upload Document</Button>
                        </div>
                    </div>
                )
            }else{

                return(
                    <div className="no-records">
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
                                    <th>Title</th>
                                    <th>Filename</th>
                                    <th>Description</th>
                                    <th>Created by</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </TableComponent>
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleAttachmentBoxShow}>Upload Document</Button>
                        </div>
                    </div>
                )
            }

           
        }

        if(getALoanAccountAttachmentsRequest.request_status===loanAndDepositsConstants.GET_A_LOAN_ATTACHMENTS_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getALoanAccountAttachmentsRequest.request_data.error}</div>
            </div>
            )
        }
    }

    renderLoanAccountComments =()=>{
        let getAClientLoanAccountCommentsRequest =  this.props.getAClientLoanAccountCommentsReducer;

        let saveRequestData= getAClientLoanAccountCommentsRequest.request_data!==undefined?getAClientLoanAccountCommentsRequest.request_data.tempData:null;

        if(getAClientLoanAccountCommentsRequest.request_status===loanAndDepositsConstants.GET_A_LOAN_COMMENTS_PENDING){
            if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
                return(
                    <div className="loading-content">
                         {this.addNewCommentBox()}
                        <div className="loading-text">Please wait... </div>
                        <div className="heading-with-cta ">
                            <Form className="one-liner">

                            </Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>

                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover ">
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>Comment</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <td></td> */}
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </TableComponent>
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleCommentsBoxShow}>New Comment</Button>
                        </div>
                        
                    </div>
                )
            }else{
                return(
                    <div>
                        {this.addNewCommentBox()}
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
                        <TableComponent classnames="striped bordered hover ">
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>Comment</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   saveRequestData.map((eachComments, index)=>{
                                        return(
                                            <tr key={index}>
                                                {/* <td>{eachComments.id} </td> */}
                                                <td>{eachComments.comment} </td>
                                                <td>{getDateFromISO(eachComments.timeStamp)} </td>
                                            </tr>
                                        )
                                   }) 
                                }
                            </tbody>
                        </TableComponent>
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleCommentsBoxShow}>Add Comment</Button>
                        </div>
                    </div>
                )
            }
        }

        if(getAClientLoanAccountCommentsRequest.request_status===loanAndDepositsConstants.GET_A_LOAN_COMMENTS_SUCCESS){
            let getALoanCommentsInfo = getAClientLoanAccountCommentsRequest.request_data.response.data;
            let getALoanCommentsData = getAClientLoanAccountCommentsRequest.request_data.response.data.result;

            if(getALoanCommentsData.length>=1){


                return(
                    <div>
                        {this.addNewCommentBox()}
                        <div className="heading-with-cta ">
                        <Form className="one-liner">

                        </Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    onChange={(e)=>this.setCommentsRequestPagesize(e, getALoanCommentsData)}
                                    value={this.state.CommentsPageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={getALoanCommentsInfo.totalPages}
                                    currPage={getALoanCommentsInfo.currentPage}
                                    currRecordsCount={getALoanCommentsInfo.length}
                                    totalRows={getALoanCommentsInfo.totalRows}
                                    tempData={getALoanCommentsData}
                                    pagesCountToshow={4}
                                    refreshFunc={this.setCommentsRequestNextPage}
                                />
                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover ">
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>Comment</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   getALoanCommentsData.map((eachComments, index)=>{
                                        return(
                                            <tr key={index}>
                                                {/* <td>{eachComments.id} </td> */}
                                                <td>{eachComments.comment} </td>
                                                <td>{getDateFromISO(eachComments.timeStamp)} </td>
                                            </tr>
                                        )
                                   }) 
                                }
                            </tbody>
                        </TableComponent>
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleCommentsBoxShow}>Add Comment</Button>
                        </div>
                    </div>
                )
            }else{

                return(
                    <div className="no-records">
                        {this.addNewCommentBox()}
                        <div className="heading-with-cta ">
                        <Form className="one-liner">

                        </Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    onChange={(e)=>this.setCommentsRequestPagesize(e, getALoanCommentsData)}
                                    value={this.state.CommentsPageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>

                            </div>
                        </div>
                        <TableComponent classnames="striped bordered hover ">
                            <thead>
                                <tr>
                                    {/* <th>ID</th> */}
                                    <th>Comment</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {/* <td></td> */}
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </TableComponent>
                        <div className="footer-with-cta toright">
                            <Button onClick={this.handleCommentsBoxShow}>Add Comment</Button>
                        </div>
                    </div>
                )
            }

        }

        if(getAClientLoanAccountCommentsRequest.request_status===loanAndDepositsConstants.GET_A_LOAN_COMMENTS_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getAClientLoanAccountCommentsRequest.request_data.error}</div>
            </div>
            )
        }
    }


    handleLoanChangeStateClose = () => this.setState({changeLoanState:false, showDisburseLoanForm:false});
    
    handleLoanChangeStateShow = () => this.setState({changeLoanState:true});

    handleNewLoanState = async (changeLoanStatePayload, newStateUpdate)=>{
        const {dispatch} = this.props;
       
        await dispatch(loanActions.changeLoanState(changeLoanStatePayload, newStateUpdate));
    } 

    changeLoanStateBox = (loanDetails)=>{
        const {changeLoanState, newState,ctaText, newStateUpdate, showDisburseLoanForm} = this.state;
        let  changeLoanStateRequest = this.props.changeLoanStateReducer;
        let getAClientLoanAccountRequest = this.props.getAClientLoanAccountReducer,
            adminGetTransactionChannelsRequest = this.props.adminGetTransactionChannels,
            allChannels =[], 
            channelsList;
        // this.props.dispatch(loanActions.changeLoanState("CLEAR"));

        if(adminGetTransactionChannelsRequest.request_status=== administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS
            && adminGetTransactionChannelsRequest.request_data.response.data.result.length>=1){
                channelsList = adminGetTransactionChannelsRequest.request_data.response.data.result;

                channelsList.map((channel, id)=>{
                    allChannels.push({label: channel.name, value:channel.encodedKey});
                })
        }

        let changeLoanStateValidationSchema;
        if(showDisburseLoanForm!==true){
            changeLoanStateValidationSchema = Yup.object().shape({
                comment:  Yup.string()
                    .min(2, 'Valid comments required'),
                notes:  Yup.string()
                    .min(2, 'Valid notes required'),
            
            });
        }

        if(showDisburseLoanForm===true){
            changeLoanStateValidationSchema = Yup.object().shape({
                    notes:  Yup.string()
                        .min(2, 'Valid notes required'),
                    disbursementChannelEncodedKey:  Yup.string()
                        .required('Required'),
                    firstRepaymentDate:  Yup.string()
                        .when('showFirstRepayment',{
                            is:(value)=>value===true,
                            then: Yup.string()
                                .required('Required')
                        }),
                    backDateChosen:  Yup.string()
                        .when('allowBackDate',{
                            is:(value)=>value===true,
                            then: Yup.string()
                                .required('Required')
                        }),
                    bookingDateChosen:  Yup.string()
                        .when('showBookingDate',{
                            is:(value)=>value===true,
                            then: Yup.string()
                                .required('Required')
                        }),
                
            });
        }

        return(
            <Modal show={changeLoanState} onHide={this.handleLoanChangeStateClose} size="lg" centered="true" dialogClassName={showDisburseLoanForm!==true?"modal-40w withcentered-heading": "modal-50w withcentered-heading"}  animation={false}>
                <Formik
                    initialValues={{
                        comment:"",
                        showFirstRepayment:false,
                        allowBackDate:false,
                        showBookingDate:false,
                        disbursementChannelEncodedKey:"",
                        firstRepaymentDate:"",
                        backDateChosen:"",
                        bookingDateChosen:"",
                        notes:""
                    }}

                    validationSchema={changeLoanStateValidationSchema}
                    onSubmit={(values, { resetForm }) => {

                        let changeLoanStatePayload;
                        if(showDisburseLoanForm!==true){
                            changeLoanStatePayload = {
                                comment:values.comment,
                                accountEncodedKey:this.loanEncodedKey
                            }
                        }

                        if(showDisburseLoanForm===true){
                            changeLoanStatePayload = {
                                accountEncodedKey:this.loanEncodedKey,
                                notes:values.notes,
                                channelEncodedKey:values.disbursementChannelEncodedKey,
                                isBackDated:values.allowBackDate,
                                backDateValueDate: values.backDateChosen!==""? values.backDateChosen.toISOString():null,
                                isBookingDate: values.showBookingDate,
                                bookingDate: values.bookingDateChosen!==""? values.bookingDateChosen.toISOString() : null,
                            }
                        }

                        // let changeLoanStatePayload = `Comment=${values.Comment}&ClientEncodedKey=${this.clientEncodedKey}`;


                        

                        this.handleNewLoanState(changeLoanStatePayload,newStateUpdate )
                            .then(
                                () => {

                                    if (this.props.changeLoanStateReducer.request_status === loanAndDepositsConstants.CHANGE_LOANSTATE_SUCCESS) {
                                        resetForm();
                                        // value = {null}

                                        setTimeout(() => {
                                            this.props.dispatch(loanActions.changeLoanState("CLEAR"))
                                            this.handleLoanChangeStateClose();
                                            this.getCustomerLoanAccountDetails(this.loanEncodedKey);
                                        }, 3000);
                                    }

                                    if(this.props.changeLoanStateReducer.request_status === loanAndDepositsConstants.CHANGE_LOANSTATE_FAILURE) {
                                        resetForm();
                                        // value = {null}

                                        setTimeout(() => {
                                            this.props.dispatch(loanActions.changeLoanState("CLEAR"))
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
                                    <Modal.Title>Change Loan State</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form.Group>
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Present State</Form.Label>
                                                <span className="form-text">{loanDetails.loanStateDescription} </span>
                                            </Col>
                                            <Col>
                                                <Form.Label className="block-level">New State</Form.Label>
                                                <span className="form-text">{newState}</span>
                                            </Col>
                                        </Form.Row>
                                    </Form.Group>
                                    {showDisburseLoanForm!==true &&
                                        <Form.Group>
                                            <Form.Label className="block-level">Comments</Form.Label>
                                            <Form.Control as="textarea"
                                                rows="3"
                                                onChange={handleChange}
                                                name="comment"
                                            value={values.comment}
                                            className={errors.comment && touched.comment ? "is-invalid form-control form-control-sm" : null} 
                                            />
                                            {errors.comment && touched.comment ? (
                                                <span className="invalid-feedback">{errors.comment}</span>
                                            ) : null}
                                        </Form.Group>
                                    }
                                    {showDisburseLoanForm===true &&
                                        <div>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Amount</Form.Label>
                                                    <h5>&#8358;{getAClientLoanAccountRequest.request_data.response.data.loanAmount}</h5>
                                                </Col>
                                                <Col>
                                                    
                                                </Col>
                                            </Form.Row>
                                            <Form.Row className="mb-10">
                                                <Col>
                                                    <Form.Group className="mb-0">
                                                        <Form.Label className="block-level mb-10">Transaction Channel</Form.Label>
                                                        {allChannels.length >=1 &&
                                                            <div>
                                                                <Select
                                                                    options={allChannels}
                                                                    
                                                                    onChange={(selected) => {
                                                                        setFieldValue('disbursementChannelEncodedKey', selected.value)
                                                                    }}
                                                                    onBlur={()=> setFieldTouched('disbursementChannelEncodedKey', true)}
                                                                    className={errors.disbursementChannelEncodedKey && touched.disbursementChannelEncodedKey ? "is-invalid" : null}
                                                                    name="disbursementChannelEncodedKey"
                                                                />
                                                                {errors.disbursementChannelEncodedKey || (errors.disbursementChannelEncodedKey && touched.disbursementChannelEncodedKey) ? (
                                                                    <span className="invalid-feedback">{errors.disbursementChannelEncodedKey}</span>
                                                                ) : null}
                                                            </div>
                                                        }
                                                        {adminGetTransactionChannelsRequest.request_status=== administrationConstants.GET_TRANSACTION_CHANNELS_FAILURE &&
                                                            <div className="errormsg"> Unable to load Disbursment channels</div>
                                                        }
                                                        {/* <Form.Control
                                                            type="text"
                                                            onChange={handleChange}
                                                            value={numberWithCommas(values.collectPrincipalEveryRepayments)}
                                                            className={errors.collectPrincipalEveryRepayments && touched.collectPrincipalEveryRepayments ? "is-invalid h-38px" : "h-38px"}
                                                            name="collectPrincipalEveryRepayments" required /> */}
                                                        
                                                    </Form.Group>
                                                </Col>
                                                <Col className="date-wrap">
                                                    <Form.Group className="table-helper m-b-5">
                                                        <input type="checkbox"
                                                        name="showFirstRepayment" 
                                                        onChange={handleChange} 
                                                        checked={values.showFirstRepayment? values.showFirstRepayment:null}
                                                        value={values.showFirstRepayment}
                                                        id="firstRepaymentDate"/>
                                                        <label htmlFor="firstRepaymentDate">First Repayment Date</label>
                                                    </Form.Group>
                                                    {values.showFirstRepayment===true &&
                                                        <Form.Group className="mb-0 date-wrap">
                                                            <DatePicker placeholderText="Choose  date" 
                                                                dateFormat="d MMMM, yyyy"
                                                                className="form-control form-control-sm h-38px"
                                                                peekNextMonth
                                                                showMonthDropdown
                                                                name="firstRepaymentDate"
                                                                value={values.firstRepaymentDate}
                                                                onChange={setFieldValue}
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                minDate={new Date()}
                                                                className={errors.firstRepaymentDate && touched.firstRepaymentDate ? "is-invalid form-control form-control-sm h-38px" : "form-control h-38px form-control-sm"}
                                                            />
                                                            {errors.firstRepaymentDate && touched.firstRepaymentDate ? (
                                                                <span className="invalid-feedback">{errors.firstRepaymentDate}</span>
                                                            ) : null}
                                                        </Form.Group>
                                                    }
                                                </Col>
                                            </Form.Row>
                                            <Form.Row className="mb-10">
                                                <Col className="date-wrap">
                                                    <Form.Group className="table-helper m-b-5">
                                                        <input type="checkbox"
                                                        name="allowBackDate" 
                                                        onChange={handleChange} 
                                                        checked={values.allowBackDate? values.allowBackDate:null}
                                                        value={values.allowBackDate}
                                                        id="allowBackDate"/>
                                                        <label htmlFor="allowBackDate">Backdate</label>
                                                    </Form.Group>
                                                    {values.allowBackDate===true &&
                                                        <Form.Group className="mb-0 date-wrap">
                                                            <DatePicker placeholderText="Choose  date" 
                                                                dateFormat="d MMMM, yyyy"
                                                                className="form-control form-control-sm"
                                                                peekNextMonth
                                                                showMonthDropdown
                                                                name="backDateChosen"
                                                                value={values.backDateChosen}
                                                                onChange={setFieldValue}
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                minDate={new Date()}
                                                                className={errors.backDateChosen && touched.backDateChosen ? "is-invalid form-control form-control-sm h-38px" : "form-control h-38px form-control-sm"}
                                                            />
                                                            {errors.backDateChosen && touched.backDateChosen ? (
                                                                <span className="invalid-feedback">{errors.backDateChosen}</span>
                                                            ) : null}
                                                        </Form.Group>
                                                    }
                                                </Col>
                                                <Col className="date-wrap">
                                                    <Form.Group className="table-helper m-b-5">
                                                        <input type="checkbox"
                                                        name="showBookingDate" 
                                                        onChange={handleChange} 
                                                        checked={values.showBookingDate? values.showBookingDate:null}
                                                        value={values.showBookingDate}
                                                        id="showBookingDate"/>
                                                        <label htmlFor="showBookingDate">Booking Date</label>
                                                    </Form.Group>
                                                    {values.showBookingDate===true &&
                                                        <Form.Group className="mb-0 date-wrap">
                                                            <DatePicker placeholderText="Choose  date" 
                                                                dateFormat="d MMMM, yyyy"
                                                                className="form-control form-control-sm"
                                                                peekNextMonth
                                                                showMonthDropdown
                                                                name="bookingDateChosen"
                                                                value={values.bookingDateChosen}
                                                                onChange={setFieldValue}
                                                                showYearDropdown
                                                                dropdownMode="select"
                                                                minDate={new Date()}
                                                                className={errors.bookingDateChosen && touched.bookingDateChosen ? "is-invalid form-control form-control-sm h-38px" : "form-control form-control-sm h-38px"}
                                                            />
                                                            {errors.bookingDateChosen && touched.bookingDateChosen ? (
                                                                <span className="invalid-feedback">{errors.bookingDateChosen}</span>
                                                            ) : null}
                                                        </Form.Group>
                                                    }
                                                </Col>
                                            </Form.Row>
                                            
                                            <Form.Group>
                                                <Form.Label className="block-level">Notes</Form.Label>
                                                <Form.Control as="textarea"
                                                    rows="3"
                                                    onChange={handleChange}
                                                    name="notes"
                                                value={values.notes}
                                                className={errors.notes && touched.notes ? "is-invalid form-control form-control-sm" : null} 
                                                />
                                                {errors.notes && touched.notes ? (
                                                    <span className="invalid-feedback">{errors.notes}</span>
                                                ) : null}
                                            </Form.Group>
                                        </div>
                                    }
                                </Modal.Body>
                                <Modal.Footer>

                                    <Button variant="light" onClick={this.handleLoanChangeStateClose}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        variant="success"
                                        type="submit"
                                        disabled={changeLoanStateRequest.is_request_processing}
                                    >
                                        {changeLoanStateRequest.is_request_processing?"Please wait...":`${ctaText}`}
                                        
                                    </Button>

                                </Modal.Footer>
                                <div className="footer-alert">
                                    {changeLoanStateRequest.request_status === loanAndDepositsConstants.CHANGE_LOANSTATE_SUCCESS && 
                                        <Alert variant="success" className="w-65 mlr-auto">
                                            {changeLoanStateRequest.request_data.response.data.message}
                                        </Alert>
                                    }
                                    {(changeLoanStateRequest.request_status === loanAndDepositsConstants.CHANGE_LOANSTATE_FAILURE && changeLoanStateRequest.request_data.error )&& 
                                        <Alert variant="danger" className="w-65 mlr-auto">
                                            {changeLoanStateRequest.request_data.error}
                                        </Alert>
                                    }
                                </div>
                            </Form>
                        )}
                </Formik>
            </Modal>
        )
    }

    renderLoanCtas =(loanDetails)=>{
    //     public enum LoanStateEnum
    // {
    //     [Description("Partial Application")]
    //     Partial_Application = 1,
    //     [Description("Pending Approval")]
    //     Pending_Approval = 2,
    //     [Description("Approved")]
    //     Approved = 3,
    //     [Description("Rejected")]
    //     Rejected = 4,
    //     [Description("Active")]
    //     Active = 5,
    //     [Description("In Arears")]
    //     In_Arears = 6,
    //     [Description("Closed")]
    //     Closed = 7,
    //     [Description("Closed Written Off")]
    //     Closed_Written_Off = 8,
    //     Closed_Withdrawn = 9
    // }
        return(
            <div className="heading-ctas">
                <ul className="nav">
                    {(loanDetails.loanState ===2) &&
                        <li>
                            <Button size="sm"
                                onClick={()=>{
                                    this.setState({newState: "Approved", newStateUpdate: "approve", ctaText:"Approve Loan"})
                                    this.handleLoanChangeStateShow()
                                }}
                            >Approve</Button>
                        </li>
                    }
                    {(loanDetails.loanState ===2) &&
                        <li>
                            <Button size="sm" 
                                onClick={()=>{
                                    this.setState({newState: "Set Incomplete", newStateUpdate: "settopartialapplication", ctaText:"Set Incomplete"})
                                    this.handleLoanChangeStateShow()
                                }}
                            >Set Incomplete</Button>
                        </li>
                    }
                    {(loanDetails.loanState ===5) &&
                        <li>
                            <Button size="sm" >Enter Repayment</Button>
                        </li>
                    }
                    {(loanDetails.loanState ===1) &&
                        <li>
                            <Button size="sm" 
                                onClick={()=>{
                                    this.setState({newState: "Request Approval", newStateUpdate: "requestapproval", ctaText:"Request Approval"})
                                    this.handleLoanChangeStateShow()
                                }}
                            >Request Approval</Button>
                        </li>
                    }

                    {(loanDetails.loanState ===3) &&
                        <li>
                            <Button size="sm"
                                 onClick={()=>{
                                    this.setState({newState: "Disbursed", newStateUpdate: "disburseloan", ctaText:"Disburse Loan", showDisburseLoanForm:true})
                                    this.handleLoanChangeStateShow()
                                }}
                            >Disburse Loan</Button>
                        </li>
                    }
                    {(loanDetails.loanState ===1 || loanDetails.loanState ===2 || loanDetails.loanState ===3) &&
                        <li>
                            <DropdownButton
                                size="sm"
                                title="Close"
                                key="inActiveCurrency"
                                className="customone"
                                alignRight
                            >
                                {(loanDetails.loanState ===1 || loanDetails.loanState ===2) &&
                                    <Dropdown.Item eventKey="1"
                                        onClick={()=>{
                                            this.setState({newState: "Rejected", newStateUpdate: "reject", ctaText:"Reject"})
                                            this.handleLoanChangeStateShow()
                                        }}
                                    >Reject</Dropdown.Item>
                                }
                                {(loanDetails.loanState ===1 || loanDetails.loanState ===2 || loanDetails.loanState ===3) &&
                                    <Dropdown.Item eventKey="1"
                                        onClick={()=>{
                                            this.setState({newState: "Closed(Withdrawn)", newStateUpdate: "withdraw", ctaText:"Withdraw"})
                                            this.handleLoanChangeStateShow()
                                        }}
                                    >Withdraw</Dropdown.Item>
                                }
                                {(loanDetails.loanState ===5) &&
                                    <Dropdown.Item eventKey="1">Pay Off</Dropdown.Item>
                                }
                                {(loanDetails.loanState ===5) &&
                                    <Dropdown.Item eventKey="1">Write Off</Dropdown.Item>
                                }
                            </DropdownButton>
                        </li>
                    }
                   
                    
                </ul>
            </div>
        )
    }

    renderPage = ()=>{
        let getAClientRequest = this.props.getAClientReducer,
            getClientLoansRequest = this.props.getClientLoansReducer,
            getAClientLoanAccountRequest = this.props.getAClientLoanAccountReducer,
            getClientDepositsRequest = this.props.getClientDepositsReducer;

            if(getAClientLoanAccountRequest.request_status ===loanAndDepositsConstants.GET_A_LOAN_ACCOUNT_DETAILS_SUCCESS){
                return(
                    <div className="row">
                        {this.changeLoanStateBox(getAClientLoanAccountRequest.request_data.response.data)}
                        <div className="col-sm-12">
                            <div className="middle-content">
                                <div className="customerprofile-tabs">
                                    <Tab.Container defaultActiveKey="details" mountOnEnter={true}>

                                        <Nav variant="pills" >
                                            <Nav.Item>
                                                <Nav.Link eventKey="details">Details</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="schedule" onSelect={this.getCustomerLoanSchedule} >Schedule</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="transactions" onSelect={this.getCustomerLoanTransactions} >Transactions</Nav.Link>
                                            </Nav.Item>
                                            {/* <Nav.Item>
                                                <Nav.Link eventKey="securities">Securities</Nav.Link>
                                            </Nav.Item> */}
                                            <Nav.Item>
                                                <Nav.Link eventKey="activity" onSelect={this.getALoanActivities}>Activity</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="attachments" onSelect={this.getACustomerLoanAttachments}>Attachments</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="comments" onSelect={this.getALoanComments}>Comments</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="communications" onSelect={this.getALoanCommunications}>Communications</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        {this.renderLoanCtas(getAClientLoanAccountRequest.request_data.response.data)}
                                        <Tab.Content>
                                            <Tab.Pane eventKey="details">
                                                {this.renderLoanAccountDetails(getAClientLoanAccountRequest.request_data.response.data)}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="schedule" mountOnEnter={true}>
                                                
                                                {this.renderLoanSchedule()}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="transactions">
                                                {this.renderLoanTransaction()}
                                            </Tab.Pane>
                                            
                                            <Tab.Pane eventKey="activity">
                                                {this.renderLoanActivities()}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="attachments">
                                                {this.addNewAttachmentBox()}
                                                {this.renderAloanAttachments()}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="comments">
                                                {this.renderLoanAccountComments()}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="communications">
                                                {this.renderALoanCommunicatons()}
                                            </Tab.Pane>
                                        </Tab.Content>

                                    </Tab.Container>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            if((getAClientRequest.request_status===clientsConstants.GET_A_CLIENT_SUCCESS
                &&  getClientLoansRequest.request_status ===loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS
                && getClientDepositsRequest.request_status ===loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS)
                &&
                getAClientLoanAccountRequest.request_status ===loanAndDepositsConstants.GET_A_LOAN_ACCOUNT_DETAILS_PENDING){
    
                return(
                    <div className="loading-text mt-30">Please wait... </div>
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
        adminGetTransactionChannels : state.administrationReducers.adminGetTransactionChannelsReducer,
        getAClientReducer: state.clientsReducers.getAClientReducer,
        getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        getClientLoansReducer: state.loansReducers.getClientLoansReducer,
        getAClientLoanAccountReducer: state.loansReducers.getAClientLoanAccountReducer,
        getAClientLoanAccountScheduleReducer: state.loansReducers.getAClientLoanAccountScheduleReducer,
        getAccountLoanTransactionReducer: state.loansReducers.getAccountLoanTransactionReducer,
        getAClientLoanAccountCommentsReducer: state.loansReducers.getAClientLoanAccountCommentsReducer,
        createALoanCommentReducer: state.loansReducers.createALoanCommentReducer,
        getALoanAccountActivitiesReducer: state.loansReducers.getALoanAccountActivitiesReducer,
        getALoanAccountAttachmentsReducer: state.loansReducers.getALoanAccountAttachmentsReducer,
        createALoanAttachmentReducer: state.loansReducers.createALoanAttachmentReducer,
        getALoanAccountCommunicationsReducer: state.loansReducers.getALoanAccountCommunicationsReducer,
        changeLoanStateReducer: state.loansReducers.changeLoanStateReducer,
    };
}

export default connect(mapStateToProps)(ViewLoanAccount);