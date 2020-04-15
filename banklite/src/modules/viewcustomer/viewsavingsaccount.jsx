import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
// import  SidebarElement from '../../shared/elements/sidebar'
// import "./administration.scss"; 
import Modal from 'react-bootstrap/Modal'
import { Formik } from 'formik';
import * as Yup from 'yup';

import Alert from 'react-bootstrap/Alert'

import { depositActions } from '../../redux/actions/deposits/deposits.action';

import { numberWithCommas, getDateFromISO} from '../../shared/utils';

import {clientsActions} from '../../redux/actions/clients/clients.action';
import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'

import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'
class ViewSavingsAccount extends React.Component {
    constructor(props) {
        super(props);
        this.depositEncodedKey = this.props.match.params.accountid;
        this.state={
            user:'',
            showSetDeposit:false,
            showSetMaxWithdrawal:false,
            showChangeAccountState:false,
            showChangeHistory:false,
            FullDetails:true,
            PageSize: 100,
            CurrentPage: 1,


            depositTransactionPageSize: 100,
            depositTransactionCurrentPage: 1,

            showAmountExpected: false,
            showAmountPaid: false,
            showAmountDue: false,

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
            NotificationType:0
        }

        
    }


    componentDidMount() {
        this.loadInitialCustomerData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.accountid !== this.props.match.params.accountid) {
        
        this.depositEncodedKey = nextProps.match.params.accountid;
            this.loadInitialCustomerData();
        }
    }

    loadInitialCustomerData = ()=>{
        this.getCustomerDepositAccountDetails(this.depositEncodedKey);
        this.getADepositActivities();
        this.getADepositCommunications();
        this.getCustomerDepositTransactions();
        this.getADepositComments();
        this.getACustomerDepositAttachments();
    }

    getCustomerDepositAccountDetails = (clientEncodedKey )=>{
        const { dispatch } = this.props;

        dispatch(depositActions.getAClientDepositAccount(clientEncodedKey));
    }

    getADepositActivities = ()=>{
        const {dispatch} = this.props;

        let { ActivitiesPageSize, ActivitiesCurrentPage } = this.state;

        let params = `PageSize=${ActivitiesPageSize}&CurrentPage=${ActivitiesCurrentPage}`;

        dispatch(depositActions.getADepositAcountActivities(this.depositEncodedKey, params));
    }

    getADepositCommunications = ()=>{
        const { dispatch } = this.props;

        let { CommunicationsPageSize, CommunicationsCurrentPage,NotificationType } = this.state;

        let params = `PageSize=${CommunicationsPageSize}&CurrentPage=${CommunicationsCurrentPage}&NotificationType=${NotificationType}`;
        dispatch(depositActions.getADepositAccountCommunications(this.depositEncodedKey,params));
    }
    setCommunicationsRequestPagesize = (PageSize, tempData) => {
        // console.log('----here', PageSize.target.value);
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value;


        this.setState({ CommunicationsPageSize: sizeOfPage });

        
        
        
        

        let {CommunicationsCurrentPage,NotificationType } = this.state;

        let params = `PageSize=${sizeOfPage}&CurrentPage=${CommunicationsCurrentPage}&NotificationType=${NotificationType}`;
        

        if(tempData){
            dispatch(depositActions.getADepositAccountCommunications(this.depositEncodedKey, params, tempData));
            
        }else{
            dispatch(depositActions.getADepositAccountCommunications(this.depositEncodedKey,params));
        }
    }

    setCommunicationsRequestNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        


        let {CommunicationsPageSize,NotificationType } = this.state;

        let params = `PageSize=${CommunicationsPageSize}&CurrentPage=${nextPage}&NotificationType=${NotificationType}`;
       
       
        if(tempData){
            dispatch(depositActions.getADepositAccountCommunications(this.depositEncodedKey, params, tempData));
        }else{
            dispatch(depositActions.getADepositAccountCommunications(this.depositEncodedKey,params));
        }
    }

    getCustomerDepositTransactions = ()=>{
        const { dispatch } = this.props;
        let { depositTransactionPageSize, depositTransactionCurrentPage } = this.state;

        let params = `PageSize=${depositTransactionPageSize}&CurrentPage=${depositTransactionCurrentPage}`;

        dispatch(depositActions.getAccountDepositTransaction(this.depositEncodedKey, params));
    }

    setTransactionRequestPagesize = (PageSize, tempData) => {
        // console.log('----here', PageSize.target.value);
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value;

        

        this.setState({ depositTransactionPageSize: sizeOfPage });

        
        
        let {depositTransactionCurrentPage } = this.state;

        let params = `PageSize=${sizeOfPage}&CurrentPage=${depositTransactionCurrentPage}&accountEncodedKey=${this.depositEncodedKey}`;

        // dispatch(loanActions.getDepositTransaction(this.depositEncodedKey, params));

        if(tempData){
            dispatch(depositActions.getAccountDepositTransaction(this.depositEncodedKey,params, tempData));
            
        }else{
            dispatch(depositActions.getAccountDepositTransaction(this.depositEncodedKey,params));
        }
    }

    setTransactionRequestNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        

        

        
        
        let {depositTransactionPageSize} = this.state;

        let params = `PageSize=${depositTransactionPageSize}&CurrentPage=${nextPage}&accountEncodedKey=${this.depositEncodedKey}`;
        if(tempData){
            dispatch(depositActions.getAccountDepositTransaction(this.depositEncodedKey,params, tempData));
        }else{
            dispatch(depositActions.getAccountDepositTransaction(this.depositEncodedKey,params));
        }
    }

    handleCommentsBoxClose = () => this.setState({showAddComment:false});
    handleCommentsBoxShow = () => this.setState({showAddComment:true});

    getADepositComments = ()=>{
        const { dispatch } = this.props;
        let { CommentsPageSize, CommentsCurrentPage } = this.state;

        let params = `PageSize=${CommentsPageSize}&CurrentPage=${CommentsCurrentPage}&AccountEncodedKey=${this.depositEncodedKey}`;
        dispatch(depositActions.getDepositAccountComments(params));
    }

    setCommentsRequestPagesize = (PageSize, tempData) => {
        // console.log('----here', PageSize.target.value);
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value;


        this.setState({ CommentsPageSize: sizeOfPage });

        
        
        let {CommentsCurrentPage } = this.state;

        let params = `PageSize=${sizeOfPage}&CurrentPage=${CommentsCurrentPage}&AccountEncodedKey=${this.depositEncodedKey}`;
        

        if(tempData){
            dispatch(depositActions.getDepositAccountComments(params, tempData));
            
        }else{
            dispatch(depositActions.getDepositAccountComments(params));
        }
    }

    setCommentsRequestNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        

        let {CommentsPageSize } = this.state;

        let params = `PageSize=${CommentsPageSize}&CurrentPage=${nextPage}&AccountEncodedKey=${this.depositEncodedKey}`;

       
       
        if(tempData){
            dispatch(depositActions.getDepositAccountComments(params, tempData));
        }else{
            dispatch(depositActions.getDepositAccountComments(params));
        }
    }

    getACustomerDepositAttachments = ()=>{
        const { dispatch } = this.props;

        let {AttachmentPageSize, AttachmentCurrentPage} = this.state
        let params = `PageSize=${AttachmentPageSize}&CurrentPage=${AttachmentCurrentPage}&AccountEncodedKey=${this.depositEncodedKey}`;
        dispatch(depositActions.getAccountDepositAttachments(params));
    }

    setAttachmentRequestPagesize = (PageSize, tempData) => {
        // console.log('----here', PageSize.target.value);
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value;


        this.setState({ AttachmentPageSize: sizeOfPage });

        
        
        let {AttachmentCurrentPage } = this.state;

       

        let params = `PageSize=${sizeOfPage}&CurrentPage=${AttachmentCurrentPage}&AccountEncodedKey=${this.depositEncodedKey}`;
        

        if(tempData){
            dispatch(depositActions.getAccountDepositAttachments(params, tempData));
            
        }else{
            dispatch(depositActions.getAccountDepositAttachments(params));
        }
    }

    setAttachmentRequestNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        

        let {AttachmentPageSize } = this.state;

       

        let params = `PageSize=${AttachmentPageSize}&CurrentPage=${nextPage}&AccountEncodedKey=${this.depositEncodedKey}`;

        

       
        if(tempData){
            dispatch(depositActions.getAccountDepositAttachments(params, tempData));
        }else{
            dispatch(depositActions.getAccountDepositAttachments(params));
        }
    }


    handleSetDepositClose = () => this.setState({showSetDeposit:false});
    
    handleSetDepositShow = () => this.setState({showSetDeposit:true});

    handleSetMaxWithdrawalClose = () => this.setState({showSetMaxWithdrawal:false});
    
    handleSetMaxWithdrawalShow = () => this.setState({showSetMaxWithdrawal:true});

    handleChangeAccountStateModalClose = () => this.setState({showChangeAccountState:false});
    
    handleChangeAccountStateModalShow = () => this.setState({showChangeAccountState:true});

    handleChangeHistoryClose = () => this.setState({showChangeHistory:false});
    
    handleChangeHistoryShow = () => this.setState({showChangeHistory:true});

    setDepositBox = ()=>{
        const {showSetDeposit} = this.state;
        return(
            <Modal show={showSetDeposit} onHide={this.handleSetDepositClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>Recommended Deposit Amount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Form.Label className="block-level">Recommended Deposit Amount (₦)</Form.Label>
                                {/* Search dropdown of staff list */}
                                <Form.Control type="text"  />
                            </Col>
                            <Col className="date-wrap">
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="debitLocation">
                            <Form.Label className="block-level">Notes</Form.Label>
                            <Form.Control as="textarea" rows="2" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="light" onClick={this.handleSetDepositClose}>
                        Cancel
                    </Button>
                    <Button variant="secondary">
                        Save Changes
                    </Button>
                
                </Modal.Footer>
            </Modal>
        )
    }

    setMaxWithdrawalBox = ()=>{
        const {showSetMaxWithdrawal} = this.state;
        return(
            <Modal show={showSetMaxWithdrawal} onHide={this.handleSetMaxWithdrawalClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>Maximum Withdrawal Amount</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Form.Label className="block-level">Maximum Withdrawal Amount (₦)</Form.Label>
                                {/* Search dropdown of staff list */}
                                <Form.Control type="text"  />
                            </Col>
                            <Col className="date-wrap">
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="debitLocation">
                            <Form.Label className="block-level">Notes</Form.Label>
                            <Form.Control as="textarea" rows="2" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="light" onClick={this.handleSetMaxWithdrawalClose}>
                        Cancel
                    </Button>
                    <Button variant="secondary">
                        Save Changes
                    </Button>
                
                </Modal.Footer>
            </Modal>
        )
    }

    changeAccountStateBox = ()=>{
        const {showChangeAccountState} = this.state;
        return(
            <Modal show={showChangeAccountState} onHide={this.handleChangeAccountStateModalClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>Changing Account State</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Row>
                            <Col>
                                <Form.Label className="block-level">Previous State</Form.Label>
                                <span className="form-text">Active</span>
                            </Col>
                            <Col>
                                <Form.Label className="block-level">New State</Form.Label>
                                {/* Display clicked state here closed or locked */}
                                <span className="form-text">Closed</span>
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="debitLocation">
                            <Form.Label className="block-level">Comments</Form.Label>
                            <Form.Control as="textarea" rows="2" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="light" onClick={this.handleChangeAccountStateModalClose}>
                        Cancel
                    </Button>
                    <Button variant="secondary">
                        Change Status
                    </Button>
                
                </Modal.Footer>
            </Modal>
        )
    }

    changeHistoryBox = ()=>{
        const {showChangeHistory} = this.state;
        return(
            <Modal show={showChangeHistory} onHide={this.handleChangeHistoryClose} size="lg" centered="true" dialogClassName="modal-45w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>History Change Log</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="select-wrap w-40">
                            <label>Changed Fields</label>
                            <select className="form-control form-control-sm w-20" name="" id="">
                                <option value="">All</option>
                            </select>
                        </div>
                        
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>Change</th>
                                    <th>Original Value</th>
                                    <th>New Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>Employer</p>
                                        <small>Daniel Ugheghe</small>
                                        <small>11-09-2019 15:20:24</small>
                                    </td>
                                    <td></td>
                                    <td>ADMINISTRATIVE STAFF COLLEGE OF NIGERIA</td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Employer Category</p>
                                        <small>API</small>
                                        <small>11-09-2019 15:20:24</small>
                                    </td>
                                    <td>-</td>
                                    <td>GENERAL</td>
                                </tr>
                            </tbody>
                        </TableComponent>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="light" onClick={this.handleChangeHistoryClose}>
                        Cancel
                    </Button>
                    <Button variant="secondary">
                        Save Changes
                    </Button>
                
                </Modal.Footer>
            </Modal>
        )
    }

    renderAccountState = (depositAccountData)=>{

        return(
            <div className="eachamount">
                <h6>Account State</h6>
                <div className="amounttext">{depositAccountData.accountStateDescription}</div>
            </div>
        )
    }
    renderDepositAccountActivities =()=>{
        let getADepositAccountActivitiesRequest = this.props.getADepositAccountActivitiesReducer;

        if(getADepositAccountActivitiesRequest.request_status===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_PENDING){
            return(
                <div className="loading-text">Please wait... </div>
            )
        }


        if(getADepositAccountActivitiesRequest.request_status===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_SUCCESS){
            let depositAccountActivitiesData = getADepositAccountActivitiesRequest.request_data.response.data;
            if(depositAccountActivitiesData.result.length>=1){
                return(
                    <div className="activities-wrap">
                        {
                            depositAccountActivitiesData.result.map((eachActivity,  index)=>{
                                return(
                                    <div className="each-activity">
                                        <span>
                                            <NavLink to='/customer/20/savingsaccount/77339322'>Payroll - Private 2073458499</NavLink>
                                        </span>
                                        <span className="activity-action">{eachActivity.action}</span>
                                        <div>
                                            <span className="action-date">{eachActivity.creationDate}</span>
                                            <span className="action-by"> <NavLink to='/customer/20/savingsaccount/77339322'>{eachActivity.affectedUserName}</NavLink></span>
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



        if(getADepositAccountActivitiesRequest.request_status===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getADepositAccountActivitiesRequest.request_data.error}</div>
            </div>
            )
        }
    }

    renderADepositCommunicatons=()=>{
        let getADepositAccountCommunicationsRequest =  this.props.getADepositAccountCommunicationsReducer;
        let saveRequestData= getADepositAccountCommunicationsRequest.request_data!==undefined?getADepositAccountCommunicationsRequest.request_data.tempData:null;
        if(getADepositAccountCommunicationsRequest.request_status===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_PENDING){
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

        if(getADepositAccountCommunicationsRequest.request_status===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_SUCCESS){
            let getADepositAccountCommunicationsInfo = getADepositAccountCommunicationsRequest.request_data.response.data;
            let getADepositAccountCommunicationsData = getADepositAccountCommunicationsRequest.request_data.response.data.result;

            if(getADepositAccountCommunicationsData.length>=1){


                return(
                    <div>
                        <div className="heading-with-cta ">
                            <Form className="one-liner"></Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    onChange={(e)=>this.setCommunicationsRequestPagesize(e, getADepositAccountCommunicationsData)}
                                    value={this.state.CommunicationsPageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={getADepositAccountCommunicationsInfo.totalPages}
                                    currPage={getADepositAccountCommunicationsInfo.currentPage}
                                    currRecordsCount={getADepositAccountCommunicationsInfo.length}
                                    totalRows={getADepositAccountCommunicationsInfo.totalRows}
                                    tempData={getADepositAccountCommunicationsData}
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
                                   getADepositAccountCommunicationsData.map((eachCommunication, index)=>{
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
                                    onChange={(e)=>this.setCommunicationsRequestPagesize(e, getADepositAccountCommunicationsData)}
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

        if(getADepositAccountCommunicationsRequest.request_status===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getADepositAccountCommunicationsRequest.request_data.error}</div>
            </div>
            )
        }
    }

    renderDepositTransaction = ()=>{
        let getDepositTransactionRequest =  this.props.getDepositTransactionReducer;
        let saveRequestData= getDepositTransactionRequest.request_data!==undefined?getDepositTransactionRequest.request_data.tempData:null;
        if(getDepositTransactionRequest.request_status===loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_PENDING){
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

        if(getDepositTransactionRequest.request_status===loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_SUCCESS){
            let getDepositTransactionInfo = getDepositTransactionRequest.request_data.response.data;
            let getDepositTransactionData = getDepositTransactionRequest.request_data.response.data.result;

            if(getDepositTransactionData.length>=1){
                return(
                    <div>
                        <div className="heading-with-cta ">
                            <div></div>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select 
                                    id="toshow" 
                                    className="countdropdown form-control form-control-sm"
                                    onChange={(e)=>this.setTransactionRequestPagesize(e, getDepositTransactionData)}
                                    value={this.state.depositTransactionPageSize}>
                                    
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={getDepositTransactionInfo.totalPages}
                                    currPage={getDepositTransactionInfo.currentPage}
                                    currRecordsCount={getDepositTransactionInfo.length}
                                    totalRows={getDepositTransactionInfo.totalRows}
                                    tempData={getDepositTransactionData}
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
                                    getDepositTransactionData.map((eachTxt, index)=>{
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
                                    onChange={(e)=>this.setTransactionRequestPagesize(e, getDepositTransactionData)}
                                    value={this.state.depositTransactionPageSize}>
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

    handleAddDepositComments = async (addDepositCommentsPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(depositActions.creatADepositComment(addDepositCommentsPayload));
    } 

    addNewCommentBox = ()=>{
        const {showAddComment} = this.state;
        let  createADepositCommentRequest = this.props.createADepositCommentReducer;
        let addDepositCommentsValidationSchema = Yup.object().shape({
                comment:  Yup.string()
                    .required('Required'),
            
           });
        return(
            <Modal show={showAddComment} onHide={this.handleCommentsBoxClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={false}>
                <Formik
                    initialValues={{
                        comment:""
                    }}

                    validationSchema={addDepositCommentsValidationSchema}
                    onSubmit={(values, { resetForm }) => {

                        let addCustomerCommentsPayload = {
                            comment:values.comment,
                            accountEncodedKey:this.depositEncodedKey
                        }




                        this.handleAddDepositComments(addCustomerCommentsPayload)
                            .then(
                                () => {

                                    if (this.props.createADepositCommentReducer.request_status === loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_SUCCESS) {
                                        resetForm();
                                        // value = {null}

                                        setTimeout(() => {
                                            this.props.dispatch(depositActions.creatADepositComment("CLEAR"))
                                            this.handleCommentsBoxClose();
                                            this.getADepositComments();
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
                                    <Modal.Title>Add Deposit comment</Modal.Title>
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
                                        disabled={createADepositCommentRequest.is_request_processing}
                                    >
                                        {createADepositCommentRequest.is_request_processing?"Please wait...":"Save Comment"}
                                        
                                    </Button>

                                </Modal.Footer>

                                {createADepositCommentRequest.request_status === loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_SUCCESS && 
                                    <Alert variant="success" className="w-65 mlr-auto">
                                        {createADepositCommentRequest.request_data.response.data.message}
                                    </Alert>
                                }
                                {createADepositCommentRequest.request_status === loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_FAILURE && 
                                    <Alert variant="danger" className="w-65 mlr-auto">
                                        {createADepositCommentRequest.request_data.error}
                                    </Alert>
                                }
                            </Form>
                        )}
                </Formik>

                
            </Modal>
        )
    }

    renderDepositAccountComments =()=>{
        let getAClientDepositAccountCommentsRequest =  this.props.getAClientDepositAccountCommentsReducer;

        let saveRequestData= getAClientDepositAccountCommentsRequest.request_data!==undefined?getAClientDepositAccountCommentsRequest.request_data.tempData:null;

        if(getAClientDepositAccountCommentsRequest.request_status===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_PENDING){
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

        if(getAClientDepositAccountCommentsRequest.request_status===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_SUCCESS){
            let getADepositAccountCommentsInfo = getAClientDepositAccountCommentsRequest.request_data.response.data;
            let getADepositAccountCommentsData = getAClientDepositAccountCommentsRequest.request_data.response.data.result;

            if(getADepositAccountCommentsData.length>=1){


                return(
                    <div>
                        {this.addNewCommentBox()}
                        <div className="heading-with-cta ">
                        <Form className="one-liner">

                        </Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    onChange={(e)=>this.setCommentsRequestPagesize(e, getADepositAccountCommentsData)}
                                    value={this.state.CommentsPageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={getADepositAccountCommentsInfo.totalPages}
                                    currPage={getADepositAccountCommentsInfo.currentPage}
                                    currRecordsCount={getADepositAccountCommentsInfo.length}
                                    totalRows={getADepositAccountCommentsInfo.totalRows}
                                    tempData={getADepositAccountCommentsData}
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
                                   getADepositAccountCommentsData.map((eachComments, index)=>{
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
                                    onChange={(e)=>this.setCommentsRequestPagesize(e, getADepositAccountCommentsData)}
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

        if(getAClientDepositAccountCommentsRequest.request_status===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getAClientDepositAccountCommentsRequest.request_data.error}</div>
            </div>
            )
        }
    }

    handleAttachmentBoxClose = () => this.setState({showAddAttachment:false});
    handleAttachmentBoxShow = () => this.setState({showAddAttachment:true});

    HandleFileUpLoad = (event) => {
        let filename = event.target.files[0].name,
            ext = event.target.files[0].type;
        

       
     
 
        this.setState({docuploaded: event.target.files[0], filename,isDocAdded:true});
    }

    handleAddAttachment = async (addAttachmentPayload)=>{
        const {dispatch} = this.props;
       
        await dispatch(depositActions.creatADepositAttachment(addAttachmentPayload));
    } 

    addNewAttachmentBox = ()=>{
        const {showAddAttachment, docuploaded,isDocAdded} = this.state;
        let  createADepositAttachmentRequest = this.props.createADepositAttachmentReducer;
        let addDepositAttachmentsValidationSchema = Yup.object().shape({
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

                    validationSchema={addDepositAttachmentsValidationSchema}
                    onSubmit={(values, { resetForm }) => {

                        // let addCustomerAttachmentPayload = {
                        //     comment:values.comment,
                        //     ClientEncodedKey:this.clientEncodedKey
                        // }

                        if(docuploaded!==''){
                            this.setState({isDocAdded:true});

                            const attachmentFormData = new FormData();
                            attachmentFormData.append('DocumentFile', this.state.docuploaded);
                            attachmentFormData.append('AccountEncodedKey', this.depositEncodedKey);
                            attachmentFormData.append('Description', values.Description);
                            attachmentFormData.append('Title', values.Title);


                            // return false;

                            this.handleAddAttachment(attachmentFormData)
                                .then(
                                    () => {

                                        if (this.props.createADepositAttachmentReducer.request_status === loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_SUCCESS) {
                                            resetForm();
                                            // value = {null}

                                            setTimeout(() => {
                                                this.props.dispatch(depositActions.creatADepositAttachment("CLEAR"))
                                                this.setState({docuploaded: '', filename:'', isDocAdded:false});
                                                this.handleAttachmentBoxClose();
                                                this.getACustomerDepositAttachments();;
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
                                        disabled={createADepositAttachmentRequest.is_request_processing}
                                    >
                                        {createADepositAttachmentRequest.is_request_processing?"Please wait...":"Upload attachment"}
                                        
                                    </Button>

                                </Modal.Footer>

                                {createADepositAttachmentRequest.request_status === loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_SUCCESS && 
                                    <Alert variant="success" className="w-65 mlr-auto">
                                        {createADepositAttachmentRequest.request_data.response.data.message}
                                    </Alert>
                                }
                                {createADepositAttachmentRequest.request_status === loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_FAILURE && 
                                    <Alert variant="danger" className="w-65 mlr-auto">
                                        {createADepositAttachmentRequest.request_data.error}
                                    </Alert>
                                }
                            </Form>
                        )}
                </Formik>

                
            </Modal>
        )
    }

    renderADepositAttachments=()=>{
        let getADepositAccountAttachmentsRequest =  this.props.getADepositAccountAttachmentsReducer;

        let saveRequestData= getADepositAccountAttachmentsRequest.request_data!==undefined?getADepositAccountAttachmentsRequest.request_data.tempData:null;
        if(getADepositAccountAttachmentsRequest.request_status===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_PENDING){
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

        if(getADepositAccountAttachmentsRequest.request_status===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_SUCCESS){
            let getADepositAttachmentsInfo = getADepositAccountAttachmentsRequest.request_data.response.data;
            let getADepositAttachmentsData = getADepositAccountAttachmentsRequest.request_data.response.data.result;

            if(getADepositAttachmentsData.length>=1){


                return(
                    <div>
                        <div className="heading-with-cta ">
                        <Form className="one-liner"></Form>
                            <div className="pagination-wrap">
                                <label htmlFor="toshow">Show</label>
                                <select id="toshow"
                                    onChange={(e)=>this.setAttachmentRequestPagesize(e, getADepositAttachmentsData)}
                                    value={this.state.AttachmentPageSize}
                                    className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={getADepositAttachmentsInfo.totalPages}
                                    currPage={getADepositAttachmentsInfo.currentPage}
                                    currRecordsCount={getADepositAttachmentsInfo.length}
                                    totalRows={getADepositAttachmentsInfo.totalRows}
                                    tempData={getADepositAttachmentsData}
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
                                   getADepositAttachmentsData.map((eachAttachment, index)=>{
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

        if(getADepositAccountAttachmentsRequest.request_status===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_FAILURE){

            return(
                <div className="loading-content errormsg"> 
                <div>{getADepositAccountAttachmentsRequest.request_data.error}</div>
            </div>
            )
        }
    }

    renderOverview = (depositAccountData)=>{

        return(
            <div className="overview-wrap">
                <div className="each-overview">
                    <h6>General</h6>
                    <TableComponent classnames="striped bordered hover">

                        <tbody>
                            <tr>
                                <td>Account ID</td>
                                <td>{depositAccountData.accountNumber}</td>
                            </tr>
                            <tr>
                                <td>Product Name</td>
                                <td>
                                    {depositAccountData.productName}
                                </td>
                            </tr>
                            <tr>
                                <td>Assigned to Branch</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Account State</td>
                                <td>{depositAccountData.accountStateDescription}</td>
                            </tr>
                            <tr>
                                <td>Account Officer name</td>
                                <td>{depositAccountData.accountOfficerName}</td>
                            </tr>
                            <tr>
                                <td>PND Status</td>
                                <td>{depositAccountData.isOnPND?"On PND":"Not on PND"}</td>
                            </tr>
                            <tr>
                                <td>Currency</td>
                                <td>₦ NGN</td>
                            </tr>
                            <tr>
                                <td>Activation Date</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Date Created</td>
                                <td>{depositAccountData.dateCreated}</td>
                            </tr>
                        </tbody>
                    </TableComponent>
                </div>
                <div className="each-overview">
                    <h6>Settlement Accounts</h6>
                    <TableComponent classnames="striped bordered hover">

                        <tbody>
                            <tr>
                                <td>Payroll - Private</td>
                                <td>2073458499</td>
                            </tr>
                        </tbody>
                    </TableComponent>
                </div>
            </div>
        )
    }

    renderPage=()=>{
        let getAClientRequest = this.props.getAClientReducer,
            getClientLoansRequest = this.props.getClientLoansReducer,
            getAClientDepositAccountRequest = this.props.getAClientDepositAccountReducer,
            getClientDepositsRequest = this.props.getClientDepositsReducer;


            if((getAClientRequest.request_status===clientsConstants.GET_A_CLIENT_SUCCESS
                &&  getClientLoansRequest.request_status ===loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS
                && getClientDepositsRequest.request_status ===loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS)
                &&
                getAClientDepositAccountRequest.request_status ===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_DETAILS_PENDING){
    
                return(
                    <div className="loading-text mt-30">Please wait... </div>
                )
            }

            if(getAClientDepositAccountRequest.request_status ===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_DETAILS_SUCCESS){
                return(
                    <div className="row">

                        <div className="col-sm-12">
                            <div className="middle-content">
                                <div className="heading-ctas">
                                    <ul className="nav">
                                        <li>
                                            <Button size="sm">Deposit</Button>
                                        </li>
                                        <li>
                                            <DropdownButton
                                                size="sm"
                                                title="Close"
                                                key="inActiveCurrency"
                                                className="customone"
                                                alignRight
                                            >
                                                <Dropdown.Item eventKey="1" onClick={this.handleChangeAccountStateModalShow} >Close</Dropdown.Item>

                                            </DropdownButton>
                                        </li>
                                        <li>
                                            <DropdownButton
                                                size="sm"
                                                title="More"
                                                key="inActiveCurrency"
                                                className="customone"
                                                alignRight
                                            >
                                                <Dropdown.Item eventKey="1">Apply Fee</Dropdown.Item>
                                                <Dropdown.Item eventKey="1">Add Field</Dropdown.Item>
                                                <NavLink className="dropdown-item" to='/editcustomer'>Edit Account</NavLink>
                                                <Dropdown.Item eventKey="1" onClick={this.handleSetDepositShow}>Set Recommended Deposit</Dropdown.Item>
                                                <Dropdown.Item eventKey="1" onClick={this.handleSetMaxWithdrawalShow}>Set Max Withdrawal Amount</Dropdown.Item>
                                                <Dropdown.Item eventKey="1" onClick={this.handleChangeHistoryShow}>View Change History</Dropdown.Item>
                                                <Dropdown.Item eventKey="1" onClick={this.handleChangeAccountStateModalShow}>Lock Deposit Account</Dropdown.Item>
                                            </DropdownButton>
                                        </li>
                                    </ul>
                                </div>
                                <div className="customerprofile-tabs">
                                    <Tab.Container defaultActiveKey="details">

                                        <Nav variant="pills" >
                                            <Nav.Item>
                                                <Nav.Link eventKey="details">Details</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="transactions">Transactions</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="activity">Activity</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="attachments">Attachments</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="comments">Comments</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="communications">Communications</Nav.Link>
                                            </Nav.Item>
                                        </Nav>

                                        <Tab.Content>
                                            <Tab.Pane eventKey="details">
                                                <div className="amounts-wrap w-40 centered">

                                                    {this.renderAccountState(getAClientDepositAccountRequest.request_data.response.data)}
                                                </div>
                                                {this.renderOverview(getAClientDepositAccountRequest.request_data.response.data)}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="transactions">
                                                <div className="pagination-wrap">
                                                    <label htmlFor="toshow">Show</label>
                                                    <select id="toshow" className="countdropdown form-control form-control-sm">
                                                        <option value="10">10</option>
                                                        <option value="25">25</option>
                                                        <option value="50">50</option>
                                                        <option value="200">200</option>
                                                    </select>

                                                </div>
                                                <TableComponent classnames="striped bordered hover">
                                                    <thead>
                                                        <tr>
                                                            <th>User</th>
                                                            <th>ID</th>
                                                            <th>Value Date (Entry Date)</th>
                                                            <th>Type</th>
                                                            <th>Amount</th>
                                                            <th>Principal Balance</th>
                                                            <th>Arrears Position</th>
                                                            <th>Total Balance</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Mayokun Malomo</td>
                                                            <td>1346858</td>
                                                            <td>25-03-2019 00:00:00</td>
                                                            <td>Disbursement</td>
                                                            <td>₦1,000,000.00</td>
                                                            <td>₦1,019,000.00</td>
                                                            <td>₦0.00</td>
                                                            <td>₦1,019,000.00</td>
                                                            <td>₦1,019,000.00</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Mayokun Malomo</td>
                                                            <td>1346858</td>
                                                            <td>25-03-2019 00:00:00</td>
                                                            <td>Interest Applied</td>
                                                            <td>₦1,000,000.00</td>
                                                            <td>₦1,019,000.00</td>
                                                            <td>₦-373,973.01</td>
                                                            <td>₦1,019,000.00</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Mayokun Malomo</td>
                                                            <td>1346858</td>
                                                            <td>25-03-2019 00:00:00</td>
                                                            <td>Interest Applied</td>
                                                            <td>₦1,000,000.00</td>
                                                            <td>₦1,019,000.00</td>
                                                            <td>₦-373,973.01</td>
                                                            <td>₦1,019,000.00</td>
                                                        </tr>
                                                    </tbody>
                                                </TableComponent>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="activity">
                                                {this.renderDepositAccountActivities()}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="attachments">
                                                {this.addNewAttachmentBox()}
                                                {this.renderADepositAttachments()}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="comments">
                                                {this.renderDepositAccountComments()}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="communications">
                                                {this.renderADepositCommunicatons()}
                                            </Tab.Pane>
                                        </Tab.Content>

                                    </Tab.Container>
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
                        {this.setDepositBox()}
                        {this.changeAccountStateBox()}
                        {this.setMaxWithdrawalBox()}
                        {this.changeHistoryBox()}
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
        getAClientReducer: state.clientsReducers.getAClientReducer,
        getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        getClientLoansReducer: state.loansReducers.getClientLoansReducer,
        getAClientDepositAccountReducer: state.depositsReducers.getAClientDepositAccountReducer,
        getADepositAccountActivitiesReducer: state.depositsReducers.getADepositAccountActivitiesReducer,
        getADepositAccountCommunicationsReducer: state.depositsReducers.getADepositAccountCommunicationsReducer,
        getDepositTransactionReducer: state.depositsReducers.getDepositTransactionReducer,
        getAClientDepositAccountCommentsReducer: state.depositsReducers.getAClientDepositAccountCommentsReducer,
        createADepositCommentReducer: state.depositsReducers.createADepositCommentReducer,
        getADepositAccountAttachmentsReducer: state.depositsReducers.getADepositAccountAttachmentsReducer,
        createADepositAttachmentReducer: state.depositsReducers.createADepositAttachmentReducer,
    };
}

export default connect(mapStateToProps) (ViewSavingsAccount);