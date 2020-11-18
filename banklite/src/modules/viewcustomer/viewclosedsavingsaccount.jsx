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
import DatePicker from '../../_helpers/datepickerfield'
import {default as DatePickerFilter} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import Modal from 'react-bootstrap/Modal'
import { Formik } from 'formik';
import * as Yup from 'yup';

import Alert from 'react-bootstrap/Alert'

import { depositActions } from '../../redux/actions/deposits/deposits.action';

import { numberWithCommas, getDateFromISO, numberWithoutDecimals} from '../../shared/utils';
import { routes} from '../../services/urls';
import {clientsActions} from '../../redux/actions/clients/clients.action';
import {clientsConstants} from '../../redux/actiontypes/clients/clients.constants'



import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'

import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'
class ViewClosedSavingsAccount extends React.Component {
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
            endDate: "",
            startDate: "",

            typeOfTransfer:"currentcustomer",
            selectOtherCustomerAccount:"",
            isCustommerAccountsFetchedWithKey:"",
            selectOtherCustomer:"",
            defaultAccountOptions:"",

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
            NotificationType:0,

            changeDepositState: false,
            showDepositFundsForm: false,

            txtnEndDate: "",
            txtnStartDate: "",
        }

        this.userPermissions =  JSON.parse(localStorage.getItem("x-u-perm"));
        
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
        this.getTransactionChannels();
        // this.getADepositActivities();
        // this.getADepositCommunications();
        // this.getCustomerDepositTransactions();
        // this.getADepositComments();
        // this.getACustomerDepositAttachments();
    }

    getTransactionChannels = ()=>{
        const {dispatch} = this.props;
        let params = `PageSize=200&CurrentPage=1`;

        dispatch(administrationActions.getTransactionChannels(params));
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

    setActivitiesRequestNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        

        let {ActivitiesPageSize } = this.state;

        let params = `PageSize=${ActivitiesPageSize}&CurrentPage=${nextPage}`;

        

       
        if(tempData){
            dispatch(depositActions.getADepositAcountActivities(this.depositEncodedKey, params, tempData));
        }else{
            dispatch(depositActions.getADepositAcountActivities(this.depositEncodedKey, params));
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
            dispatch(depositActions.getADepositAcountActivities(this.depositEncodedKey,params, tempData));
            
        }else{
            dispatch(depositActions.getADepositAcountActivities(this.depositEncodedKey,params));
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

    handleTxtnDateChangeRaw = (e) => {
        e.preventDefault();
    }
    handleTxtnStartDatePicker = (txtnStartDate) => {
        txtnStartDate.setHours(txtnStartDate.getHours() + 1);
        
        this.setState({ txtnStartDate }, ()=>{
            if(this.state.txtnEndDate!==""){
                //this.getHistory();
            }
        });
    }

    handleTxtnEndDatePicker = (txtnEndDate) => {
        txtnEndDate.setHours(txtnEndDate.getHours() + 1);
       
        this.setState({ txtnEndDate }, ()=>{
                if(this.state.txtnStartDate!==""){
                    //this.getHistory();
                }
        });
    }

    renderAccountState = (depositAccountData)=>{
        //     public enum depositStateEnum
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
            <div className="amounts-wrap w-65">
                {depositAccountData.accountState!==5 &&
                    <div className="eachamount">
                        <h6>Account State</h6>
                        <div className="amounttext">{depositAccountData.accountStateDescription}</div>
                    </div>
                }
                
                    {depositAccountData.accountState===5 &&
                        <div className="eachamount">
                            <h6>Total Balance</h6>
                            <div className="amounttext"> &#8358;{numberWithCommas(depositAccountData.depositAvailableBalance, true)}</div>
                        </div>
                    }

                    
            </div>
        )
    }
    renderDepositAccountActivities =()=>{
        let getADepositAccountActivitiesRequest = this.props.getADepositAccountActivitiesReducer;
        let saveRequestData= getADepositAccountActivitiesRequest.request_data!==undefined?getADepositAccountActivitiesRequest.request_data.tempData:null;

        if(getADepositAccountActivitiesRequest.request_status===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_PENDING){
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
                                    <th>Affected Item Name</th>
                                    <th>Affected Item Id</th>
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


        if(getADepositAccountActivitiesRequest.request_status===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_SUCCESS){
            let depositAccountActivitiesData = getADepositAccountActivitiesRequest.request_data.response.data;
            if(depositAccountActivitiesData.result.length>=1){
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
                                        onChange={(e)=>this.setActivitiesRequestPagesize(e, depositAccountActivitiesData.result)}
                                        value={this.state.ActivitiesPageSize}
                                        className="countdropdown form-control form-control-sm">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="200">200</option>
                                </select>
                                <TablePagination
                                    totalPages={depositAccountActivitiesData.totalPages}
                                    currPage={depositAccountActivitiesData.currentPage}
                                    currRecordsCount={depositAccountActivitiesData.result.length}
                                    totalRows={depositAccountActivitiesData.totalRows}
                                    tempData={depositAccountActivitiesData.result}
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
                                    <th>Affected Item Name</th>
                                    <th>Affected Item Id</th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    depositAccountActivitiesData.result.map((eachActivity, index)=>{
                                        return(
                                            <Fragment key={index}>
                                                <tr>
                                                    {/* <td>{eachActivity.id}</td> */}
                                                    <td>{eachActivity.creationDate}</td>
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
                                        onChange={(e)=>this.setActivitiesRequestPagesize(e, depositAccountActivitiesData.result)}
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
                                </tr>
                            </tbody>
                        </TableComponent>
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
        let getDepositTransactionRequest =  this.props.getAccountDepositTransactionReducer;
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
                                    <th>Transaction ID</th>
                                    <th>Narration</th>
                                    <th>Entry Date</th>
                                    <th>Entry Type</th>
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
                                    <th>Transaction ID</th>
                                    <th>Narration</th>
                                    <th>Entry Date</th>
                                    <th>Entry Type</th>
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
                                                <td>{eachTxt.id}</td>
                                                <td>{eachTxt.narration}</td>
                                                <td>{getDateFromISO(eachTxt.entryDate, true)}</td>
                                                <td>{eachTxt.entryType}</td>
                                                <td>{eachTxt.typeDescription}</td>
                                                <td>{numberWithCommas(eachTxt.transactionAmount, true, true)}</td>
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
                            <Form className="one-liner">



                                <Form.Group className="table-filters">
                                    <DatePickerFilter
                                        onChangeRaw={this.handleTxtnDateChangeRaw}
                                        onChange={this.handleTxtnStartDatePicker}
                                        selected={this.state.txtnStartDate}
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
                                    <DatePickerFilter placeholderText="End  date"
                                        onChangeRaw={this.handleTxtnDateChangeRaw}
                                        onChange={this.handleTxtnEndDatePicker}
                                        selected={this.state.txtnEndDate}
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
                                    <th>Transaction Id</th>
                                    <th>Narration</th>
                                    <th>Entry Date</th>
                                    <th>Entry Type</th>
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
                                                <td>{eachTxt.id}</td>
                                                <td>{eachTxt.narration}</td>
                                                <td>{getDateFromISO(eachTxt.entryDate, true)}</td>
                                                <td>{eachTxt.entryType}</td>
                                                <td>{eachTxt.typeDescription}</td>
                                                <td>{numberWithCommas(eachTxt.transactionAmount, true, true)}</td>
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
                                    <th>Transaction Id</th>
                                    <th>Narration</th>
                                    <th>Entry Date</th>
                                    <th>Entry Type</th>
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
            let allUSerPermissions =[];
            this.userPermissions.map(eachPermission=>{
                allUSerPermissions.push(eachPermission.permissionCode)
            })
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
                                    <th>User</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </TableComponent>
                        {allUSerPermissions.indexOf("bnk_manage_deposit_comments") >-1 &&
                            <div className="footer-with-cta toright">
                                <Button onClick={this.handleCommentsBoxShow}>New Comment</Button>
                            </div>
                        }
                        
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
                                    <th>User</th>
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
                                                <td><NavLink to={`/user/${eachComments.userEncodedKey}`}>{eachComments.userName} </NavLink> </td>
                                            </tr>
                                        )
                                   }) 
                                }
                            </tbody>
                        </TableComponent>
                        {allUSerPermissions.indexOf("bnk_manage_deposit_comments") >-1 &&
                            <div className="footer-with-cta toright">
                                <Button onClick={this.handleCommentsBoxShow}>Add Comment</Button>
                            </div>
                        }
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
                                    <th>User</th>
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
                                                <td><NavLink to={`/user/${eachComments.userEncodedKey}`}>{eachComments.userName} </NavLink> </td>
                                            </tr>
                                        )
                                   }) 
                                }
                            </tbody>
                        </TableComponent>
                        {allUSerPermissions.indexOf("bnk_manage_deposit_comments") >-1 &&
                            <div className="footer-with-cta toright">
                                <Button onClick={this.handleCommentsBoxShow}>Add Comment</Button>
                            </div>
                        }
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
                                    <th>User</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </TableComponent>
                        {allUSerPermissions.indexOf("bnk_manage_deposit_comments") >-1 &&
                            <div className="footer-with-cta toright">
                                <Button onClick={this.handleCommentsBoxShow}>Add Comment</Button>
                            </div>
                        }
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

    getADownload = (filetype,identifier)=>{
        const {dispatch} = this.props;
        
        dispatch(clientsActions.getDownload(filetype,identifier))
    }

    renderADepositAttachments=()=>{
        let getADepositAccountAttachmentsRequest =  this.props.getADepositAccountAttachmentsReducer;
        let allUSerPermissions =[];
        this.userPermissions.map(eachPermission=>{
            allUSerPermissions.push(eachPermission.permissionCode)
        })
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
                        {allUSerPermissions.indexOf("bnk_manage_deposit_attachments") >-1 &&
                            <div className="footer-with-cta toright">
                                <Button onClick={this.handleAttachmentBoxShow}>Upload Document</Button>
                            </div>
                        }
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
                                    <th>Actions</th>
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
                                                <td><NavLink to={`/user/${eachAttachment.createdByUserEncodedKey}`}>{eachAttachment.createdByUserName}</NavLink> </td>
                                                <td>{getDateFromISO(eachAttachment.timeStamp)} </td>
                                                <td>
                                                    {(eachAttachment.linkIdentifier!=="" && eachAttachment.linkIdentifier!==null && eachAttachment.linkIdentifier!==undefined) &&
                                                        <DropdownButton
                                                            size="sm"
                                                            title="Actions"
                                                            key="editUser"
                                                            className="customone"
                                                        >
                                                            <a  className="dropdown-item" 
                                                                href={`${routes.GET_DOWNLOAD}FileType=DEPOSIT&EncodedKey=${this.depositEncodedKey}&Link=${eachAttachment.linkIdentifier}`}
                                                                // onClick={()=>this.getADownload('DEPOSIT',eachAttachment.linkIdentifier)}
                                                            >Download</a>
                                                                {/* <NavLink download className="dropdown-item" to={`${routes.GET_DOWNLOAD}filetype=DEPOSIT&identifier=${eachAttachment.linkIdentifier}&link=treble`}>Download</NavLink> */}
                                                            
                                                            
                                                        </DropdownButton>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                   }) 
                                }
                            </tbody>
                        </TableComponent>
                        {allUSerPermissions.indexOf("bnk_manage_deposit_attachments") >-1 &&
                            <div className="footer-with-cta toright">
                                <Button onClick={this.handleAttachmentBoxShow}>Upload Document</Button>
                            </div>
                        }
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
                                    <th>Actions</th>
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
                                                <td> <NavLink to={`/user/${eachAttachment.createdByUserEncodedKey}`}>{eachAttachment.createdByUserName}</NavLink> </td>
                                                <td>{getDateFromISO(eachAttachment.timeStamp)} </td>
                                                <td>
                                                    {(eachAttachment.linkIdentifier!=="" && eachAttachment.linkIdentifier!==null && eachAttachment.linkIdentifier!==undefined) &&
                                                        <DropdownButton
                                                            size="sm"
                                                            title="Actions"
                                                            key="editUser"
                                                            className="customone"
                                                        >
                                                            
                                                                <a  className="dropdown-item" 
                                                                    href={`${routes.GET_DOWNLOAD}FileType=DEPOSIT&EncodedKey=${this.depositEncodedKey}&Link=${eachAttachment.linkIdentifier}`}
                                                                    // onClick={()=>this.getADownload('DEPOSIT',eachAttachment.linkIdentifier)}
                                                                >Download</a>
                                                            
                                                            
                                                        </DropdownButton>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                   }) 
                                }
                            </tbody>
                        </TableComponent>
                        {allUSerPermissions.indexOf("bnk_manage_deposit_attachments") >-1 &&
                            <div className="footer-with-cta toright">
                                <Button onClick={this.handleAttachmentBoxShow}>Upload Document</Button>
                            </div>
                        }
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
                        {allUSerPermissions.indexOf("bnk_manage_deposit_attachments") >-1 &&
                            <div className="footer-with-cta toright">
                                <Button onClick={this.handleAttachmentBoxShow}>Upload Document</Button>
                            </div>
                        }
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
            <div>
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
                                    <td>Product Type</td>
                                    <td>
                                        {depositAccountData.productTypeDescription}
                                    </td>
                                </tr>
                                {/* <tr>
                                    <td>Assigned to Branch</td>
                                    <td></td>
                                </tr> */}
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
                                    <td>{depositAccountData.isOnPND ? "On PND" : "Not on PND"}</td>
                                </tr>
                                <tr>
                                    <td>Currency</td>
                                    <td>NGN </td>
                                </tr>
                                {/* <tr>
                                    <td>Activation Date</td>
                                    <td></td>
                                </tr> */}
                                <tr>
                                    <td>Date Created</td>
                                    <td>{depositAccountData.dateCreated}</td>
                                </tr>
                            </tbody>
                        </TableComponent>
                    </div>
                    <div className="each-overview">
                        <h6>Account Interest</h6>
                        <TableComponent classnames="striped bordered hover">

                            <tbody>
                                <tr>
                                    <td>Interest Accrued</td>
                                    <td>&#x20A6;{numberWithCommas(depositAccountData.interestAccrued, true, true)}</td>
                                </tr>
                                <tr>
                                    <td>Interest Earned</td>
                                    <td>
                                        &#x20A6;{numberWithCommas(depositAccountData.interestDue, true, true)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Interest Paid</td>
                                    <td>
                                        &#x20A6;{numberWithCommas(depositAccountData.interestPaid, true, true)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Blocked Amount</td>
                                    <td>&#x20A6;{numberWithCommas(depositAccountData.blockedAmount, true, true)}</td>
                                </tr>
                                
                            </tbody>
                        </TableComponent>
                    </div>
                </div>
                <div className="overview-wrap">
                    <div className="each-overview">
                        <h6>Settlement Accounts</h6>
                        <TableComponent classnames="striped bordered hover">

                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </TableComponent>
                    </div>
                </div>
            </div>
        )
    }

    handleDepositChangeStateClose = () => this.setState({changeDepositState:false, showDepositFundsForm:false});
    
    handleDepositChangeStateShow = () => this.setState({changeDepositState:true});

    handleNewDepositState = async (changeDepositStatePayload, newStateUpdate)=>{
        const {dispatch} = this.props;
       
        await dispatch(depositActions.changeDepositState(changeDepositStatePayload, newStateUpdate));
    }

    getSearchForAccountOptionValue = (option) => option.searchItemEncodedKey; // maps the result 'id' as the 'value'
    getSearchOptionForAccountLabel = (option) => `${option.searchText} -${option.searchKey}`; // maps the result 'name' as the 'label'
    noOptionsForAccountMessage(inputValue) {
        
        return ""
    }

    getSearchedAccountResults = async (inputValue)=> {
        const {dispatch} = this.props;

        if (!inputValue || inputValue.length===0) {
          return null;
        }
        

         await dispatch(depositActions.searchAccountNumbers(inputValue));

        
    }

    initiateAccountSearch =(inputValue)=>{
        this.setState({defaultAccountOptions:"", 
                        selectOtherCustomerAccount:"",
                        firstChosenTransferCriteria:"accounts",
                        isCustommerAccountsFetchedWithKey:""});
        
        let searchAccountNumberRequest = this.props.searchAccountNumbersReducer,
            searchResultsData,
            searchResultsList =[],
            getAClientDepositAccountRequest = this.props.getAClientDepositAccountReducer.request_data.response.data;
        this.props.dispatch(depositActions.searchAccountNumbers("CLEAR"));
        if(inputValue.length>=1){
            return this.getSearchedAccountResults(inputValue)
                    .then(
                        ()=>{
                        if (searchAccountNumberRequest.request_status === loanAndDepositsConstants.SEARCH_ACCOUNT_NUMBERS_SUCCESS) {
                            // console.log("serch rsulrs", globalSearchAnItemRequest.request_data.response.data);
                            searchResultsData = searchAccountNumberRequest.request_data.response.data;
                            
                            
                            searchResultsData = searchResultsData.filter(eachResult=>(
                                    (
                                        (eachResult.searchItemType===3 && (eachResult.state===3 || eachResult.state===5))
                                        ||
                                        (eachResult.searchItemType===2 && (eachResult.state===6 || eachResult.state===5))
                                    )
                                    && eachResult.searchKey !==getAClientDepositAccountRequest.accountNumber
                                    && eachResult.clientEncodedKey !==getAClientDepositAccountRequest.clientEncodedKey
                                    ))
                            
                            this.setState({isCustommerAccountsFetchedWithKey:false})
                                    
                            return searchResultsData;
                        }
                        
                    })
        }else{
            return null;
        }
           
        

                
    }

    handleSearchAccountInputChange = (selectedOption, {action})=> { 
        
        if (this.state.isCustommerAccountsFetchedWithKey!==true){
            this.setState({
                selectOtherCustomerAccount: selectedOption,
                firstChosenTransferCriteria:"accounts",
                selectACustomerAccount:""
            });
        }else{
            this.setState({
                selectOtherCustomerAccount: selectedOption,
                firstChosenTransferCriteria:"customer",
            });
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




    loadCustomerAccounts = (selectedClientEncodedKey)=>{
        let   searchForAccountsWithCustomerKeyRequest =  this.props.searchForAccountsWithCustomerKeyReducer;
        this.getAccountsOfSelectedCustomer(selectedClientEncodedKey)
            .then( 
                ()=>{
                    if(this.props.searchForAccountsWithCustomerKeyReducer.request_status === loanAndDepositsConstants.SEARCH_FOR_ACCOUNTS_WITH_CUSTOMERKEY_SUCCESS){
                        
                        let loadedCustomerAccounts = this.props.searchForAccountsWithCustomerKeyReducer.request_data.response.data,
                            customerAccounts =[];

                        if(loadedCustomerAccounts.length>=1){
                            loadedCustomerAccounts.map((eachAccount, index)=>{
                                if(
                                    (eachAccount.searchItemType===2 && (eachAccount.state===5 || eachAccount.state===6))
                                    ||
                                    (eachAccount.searchItemType===3 && (eachAccount.state===3 || eachAccount.state===5))
                                )
                                {
                                    customerAccounts.push({label:eachAccount.searchText, value:eachAccount.searchItemEncodedKey})
                                }
                            })
                            this.setState({defaultAccountOptions:loadedCustomerAccounts, isCustommerAccountsFetchedWithKey: true})
                        }
                    }
                }
            )
    }

    getAccountsOfSelectedCustomer = async (selectedClientEncodedKey)=>{
        const {dispatch} = this.props;
      return  await dispatch(depositActions.searchForAccountsWithCustomerKey(selectedClientEncodedKey));
    }

    getSearchForCustomerOptionValue = (option) => option.searchItemEncodedKey; // maps the result 'id' as the 'value'
    getSearchOptionForCustomerLabel = (option) => `${option.clientName} -${option.clientCode}`; // maps the result 'name' as the 'label'
    noOptionsForCustomerMessage(inputValue) {
        
        return ""
    }

    getSearchedCustomerResults = async (inputValue)=> {
        const {dispatch} = this.props;

        if (!inputValue || inputValue.length===0) {
          return null;
        }
        

         await dispatch(depositActions.searchCustomerAccount(inputValue));

        
    }

    initiateCustomerSearch =(inputValue)=>{
        this.setState({firstChosenTransferCriteria:"customer"})
        let searchCustomerAccountRequest = this.props.searchCustomerAccountReducer,
            searchResultsData,
            searchResultsList =[],
            getAClientDepositAccountRequest = this.props.getAClientDepositAccountReducer.request_data.response.data;
        this.props.dispatch(depositActions.searchCustomerAccount("CLEAR"));
        if(inputValue.length>=1){
            return this.getSearchedCustomerResults(inputValue)
                    .then(
                        ()=>{
                           
                        if (searchCustomerAccountRequest.request_status === loanAndDepositsConstants.SEARCH_CUSTOMER_ACCOUNT_SUCCESS) {
                            // console.log("serch rsulrs", globalSearchAnItemRequest.request_data.response.data);
                            searchResultsData = searchCustomerAccountRequest.request_data.response.data;
                            
                            // console.log("+++++", searchResultsData);
                            // searchResultsData = searchResultsData.filter(eachResult=>(
                            //         (
                            //             (eachResult.searchItemType===3 && (eachResult.state===3 || eachResult.state===5))
                            //             ||
                            //             (eachResult.searchItemType===2 && (eachResult.state===6 || eachResult.state===5))
                            //         )
                            //         && eachResult.searchKey !==getAClientDepositAccountRequest.accountNumber
                            //         ))

                                    
                            // return searchResultsData;

                            searchResultsData = searchResultsData.filter(eachResult=>(
                                    (eachResult.clientEncodedKey !==getAClientDepositAccountRequest.clientEncodedKey
                                        && eachResult.searchItemEncodedKey !==getAClientDepositAccountRequest.clientEncodedKey)
                                ))

                                
                                return searchResultsData;
                        }
                        
                    })
        }else{
            return null;
        }
           
        

                
    }

    handleSearchACustomerInputChange = (selectedOption, {action})=> { 
        this.loadCustomerAccounts(selectedOption.clientEncodedKey);
        this.setState({
            selectACustomerAccount: selectedOption,
            firstChosenTransferCriteria:"customer",
            selectOtherCustomerAccount:""
        });
       
    }

    // renderTransferToAccount = (TransferToControlToShow, errors, touched, setFieldTouched)=>{
    //     if(TransferToControlToShow ==="SameCustomerAcounts"){
    //         return (
    //             <Form.Row>
    //                 <Col>
    //                     <Form.Label className="block-level">Account to Transfer To</Form.Label>
    //                     <Select
    //                         options={allAccountOfCurrentCustomer}
                            
    //                         onChange={(selected) => {
    //                             setFieldValue('currentCustomerChosenAccount', selected.value)
    //                         }}
    //                         onBlur={()=> setFieldTouched('currentCustomerChosenAccount', true)}
    //                         className={errors.currentCustomerChosenAccount && touched.currentCustomerChosenAccount ? "is-invalid" : null}
    //                         name="currentCustomerChosenAccount"
    //                     />
    //                     {errors.currentCustomerChosenAccount && touched.currentCustomerChosenAccount ? (
    //                         <span className="invalid-feedback">{errors.currentCustomerChosenAccount}</span>
    //                     ) : null}
    //                 </Col>
    //             </Form.Row>
    //         )
    //     }
        
    //     if(TransferToControlToShow ==="SearchableLoanAndDepositAccounts"){
    //         return (
    //             <Form.Row>
    //                 <Col className="async-search-wrap">
    //                     <Form.Label className="block-level">Account to Transfer To</Form.Label>
    //                     <AsyncSelect
    //                         cacheOptions={false}
    //                         value={selectOtherCustomerAccount}
    //                         noOptionsMessage={this.noOptionsForAccountMessage}
    //                         getOptionValue={this.getSearchForAccountOptionValue}
    //                         getOptionLabel={this.getSearchOptionForAccountLabel}
    //                         // defaultOptions={defaultOptions}
    //                         loadOptions={this.initiateAccountSearch}
    //                         placeholder="Search Accounts"
    //                         onChange={this.handleSearchAccountInputChange}
    //                     />
    //                 </Col>
    //             </Form.Row>
    //         )
    //     }

    //     if(TransferToControlToShow ==="DropDownOfChosenCustomerAccounts"){

    //     }
    // }

    changeDepositStateBox = (depositDetails)=>{
        const {changeDepositState, 
                selectOtherCustomerAccount,
                isCustommerAccountsFetchedWithKey,
                selectOtherCustomer, 
                firstChosenTransferCriteria,
                typeOfTransfer, 
                newState,
                ctaText,
                newStateHeading, 
                newStateUpdate, 
                selectACustomerAccount,
                defaultAccountOptions,
                showDepositFundsForm} = this.state;
        let  changeDepositStateRequest = this.props.changeDepositStateReducer,
            getAClientDepositAccountRequest = this.props.getAClientDepositAccountReducer.request_data.response.data;

        let   customerLoanAccounts = this.props.getClientLoansReducer.request_data.response.data;
        let   customerDepositAccounts = this.props.getClientDepositsReducer.request_data.response.data;
        let   searchForAccountsWithCustomerKeyRequest =  this.props.searchForAccountsWithCustomerKeyReducer;
        let adminGetTransactionChannelsRequest = this.props.adminGetTransactionChannels,
            allChannels =[], 
            allAccountOfCurrentCustomer =[], 
            channelsList;
        
        let searchAccountNumberRequest = this.props.searchAccountNumbersReducer;
            if(customerLoanAccounts.result!==null){
                customerLoanAccounts.result.map((eachLoanAccount,  index)=>{
                    if(eachLoanAccount.loanState ===5 || eachLoanAccount.loanState ===6){
                        allAccountOfCurrentCustomer.push({label: `${eachLoanAccount.productName} - ${eachLoanAccount.accountNumber}`, value:eachLoanAccount.encodedKey});
                    }
                })  
            }

            if(customerDepositAccounts.result!==null){
                customerDepositAccounts.result.map((eachDepositAccount,  index)=>{
                    if((eachDepositAccount.accountState ===3 || eachDepositAccount.accountState ===5) && eachDepositAccount.accountNumber !==getAClientDepositAccountRequest.accountNumber ){
                        allAccountOfCurrentCustomer.push({label: `${eachDepositAccount.productName} - ${eachDepositAccount.accountNumber}`, value:eachDepositAccount.encodedKey});
                    }
                })
            }
        

        if(adminGetTransactionChannelsRequest.request_status=== administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS
            && adminGetTransactionChannelsRequest.request_data.response.data.result.length>=1){
                channelsList = adminGetTransactionChannelsRequest.request_data.response.data.result;

                channelsList.map((channel, id)=>{
                    allChannels.push({label: channel.name, value:channel.encodedKey});
                })
        }

        let changeDepositStateValidationSchema;
        if(showDepositFundsForm!==true){
            changeDepositStateValidationSchema = Yup.object().shape({
                comment:  Yup.string()
                    .min(2, 'Valid comments required'),
                notes:  Yup.string()
                    .min(2, 'Valid notes required'),
            
            });
        }

        if(newStateUpdate==="beginmaturity"){
            changeDepositStateValidationSchema = Yup.object().shape({
                notes:  Yup.string()
                    .min(2, 'Valid notes required'),
                maturityDate:  Yup.string()
                    .required('Required'),
            
            });
        }

        if(showDepositFundsForm===true){
            changeDepositStateValidationSchema = Yup.object().shape({
                    notes:  Yup.string()
                        .min(2, 'Valid notes required'),
                    depositChannelEncodedKey:  Yup.string()
                        .required('Required'),
                    amountToDeposit:  Yup.string()
                        .required('Required'),
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

        if(newStateUpdate === "makewithdrawal"){
            changeDepositStateValidationSchema = Yup.object().shape({
                    notes:  Yup.string()
                        .min(2, 'Valid notes required'),
                    depositChannelEncodedKey:  Yup.string()
                        .required('Required'),
                    amountToWithdraw:  Yup.string()
                        .required('Required'),
                    backDateChosen:  Yup.string()
                        .when('allowBackDate',{
                            is:(value)=>value===true,
                            then: Yup.string()
                                .required('Required')
                        }),
                
            });
        }

        if(newStateUpdate==="setmaximumwithdrawalamount" || newStateUpdate==="setrecommendeddepositamount"){
            changeDepositStateValidationSchema = Yup.object().shape({
                    notes:  Yup.string()
                        .min(2, 'Valid notes required'),
                    amountToDeposit:  Yup.string()
                        .required('Required'),
                
            });
        }

        if(newStateUpdate === "transfer"){
            if(typeOfTransfer ==="currentcustomer"){
                changeDepositStateValidationSchema = Yup.object().shape({
                        notes:  Yup.string()
                            .min(2, 'Valid notes required'),
                        currentCustomerChosenAccount:  Yup.string()
                            .required('Required'),
                        amountToTransfer:  Yup.string()
                            .required('Required'),
                    
                });
            }
            if(typeOfTransfer ==="anothercustomer"){
                changeDepositStateValidationSchema = Yup.object().shape({
                        notes:  Yup.string()
                            .min(2, 'Valid notes required'),
                        chosenAccountNum:  Yup.string()
                            .required('Required'),
                        // chosenCustomerEncodedKey:  Yup.string()
                        //     .required('Required'),
                        amountToTransfer:  Yup.string()
                            .required('Required'),
                    
                });
            }
        }

        return(
            <Modal show={changeDepositState} onHide={this.handleDepositChangeStateClose} size="lg" centered="true" dialogClassName={showDepositFundsForm!==true?"modal-40w withcentered-heading": "modal-50w withcentered-heading"}  animation={false}>
                <Formik
                    initialValues={{
                        comment:"",
                        allowBackDate:false,
                        showBookingDate:false,
                        depositChannelEncodedKey:"",
                        backDateChosen:"",
                        bookingDateChosen:"",
                        amountToWithdraw:"",
                        maturityDate:"",
                        notes:"",
                        amountToDeposit:"",
                        currentCustomerChosenAccount:"",
                        amountToTransfer:"",
                        chosenAccountNum:selectOtherCustomerAccount!==""?selectOtherCustomerAccount.searchItemEncodedKey:"",
                        chosenCustomerEncodedKey:selectOtherCustomerAccount!==""?selectOtherCustomerAccount.clientEncodedKey:""
                    }}

                    validationSchema={changeDepositStateValidationSchema}
                    onSubmit={(values, { resetForm }) => {

                        let changeDepositStatePayload;
                        if(showDepositFundsForm!==true){
                            changeDepositStatePayload = {
                                comment:values.comment,
                                accountEncodedKey:this.depositEncodedKey
                            }
                        }
                        if(newStateUpdate==="beginmaturity"){
                            changeDepositStatePayload = {
                                notes:values.notes,
                                accountEncodedKey:this.depositEncodedKey,
                                maturityDate: values.maturityDate.toISOString()
                            }
                        }

                        if(showDepositFundsForm===true){
                            changeDepositStatePayload = {
                                accountEncodedKey:this.depositEncodedKey,
                                notes:values.notes,
                                amount: parseFloat(values.amountToDeposit.replace(/,/g, '')),
                                channelEncodedKey:values.depositChannelEncodedKey,
                                isBackDated:values.allowBackDate,
                                backDateValueDate: values.backDateChosen!==""? values.backDateChosen.toISOString():null,
                                isBookingDate: values.showBookingDate,
                                bookingDate: values.bookingDateChosen!==""? values.bookingDateChosen.toISOString() : null,
                            }
                        }

                        if(newStateUpdate === "makewithdrawal"){
                            changeDepositStatePayload = {
                                accountEncodedKey:this.depositEncodedKey,
                                notes:values.notes,
                                amount: parseFloat(values.amountToWithdraw.replace(/,/g, '')),
                                channelEncodedKey:values.depositChannelEncodedKey,
                                isBackDated:values.allowBackDate,
                                backDateValueDate: values.backDateChosen!==""? values.backDateChosen.toISOString():null,
                            }
                        }

                        if(newStateUpdate==="setmaximumwithdrawalamount" || newStateUpdate==="setrecommendeddepositamount"){
                            changeDepositStatePayload ={
                                accountEncodedKey:this.depositEncodedKey,
                                notes:values.notes,
                                amount: parseFloat(values.amountToDeposit.replace(/,/g, '')),
                            }
                        }

                        if(newStateUpdate==="transfer"){
                            changeDepositStatePayload ={
                                accountEncodedKey:this.depositEncodedKey,
                                notes:values.notes,
                                amount: parseFloat(values.amountToTransfer.replace(/,/g, '')),
                            }

                            if(typeOfTransfer ==="currentcustomer"){
                                changeDepositStatePayload.destinationCustomerEncodedKey = getAClientDepositAccountRequest.clientEncodedKey
                                changeDepositStatePayload.destinationAccountEncodedKey = values.currentCustomerChosenAccount
                            }

                            if(typeOfTransfer ==="anothercustomer"  && selectOtherCustomerAccount!==""){
                                changeDepositStatePayload.destinationCustomerEncodedKey = selectOtherCustomerAccount.clientEncodedKey
                                changeDepositStatePayload.destinationAccountEncodedKey = selectOtherCustomerAccount.searchItemEncodedKey
                            }
                        }

                        // let changeDepositStatePayload = `Comment=${values.Comment}&ClientEncodedKey=${this.clientEncodedKey}`;

                        // console.log("Transfer Payload", changeDepositStatePayload);
                        
                        // return false;

                        this.handleNewDepositState(changeDepositStatePayload,newStateUpdate )
                            .then(
                                () => {

                                    if (this.props.changeDepositStateReducer.request_status === loanAndDepositsConstants.CHANGE_DEPOSITSTATE_SUCCESS) {
                                        resetForm();
                                        // value = {null}

                                        setTimeout(() => {
                                            this.props.dispatch(depositActions.changeDepositState("CLEAR"))
                                            this.handleDepositChangeStateClose();
                                            this.getCustomerDepositAccountDetails(this.depositEncodedKey);
                                        }, 3000);
                                    }

                                    if(this.props.changeDepositStateReducer.request_status === loanAndDepositsConstants.CHANGE_DEPOSITSTATE_FAILURE) {
                                        resetForm();
                                        // value = {null}

                                        setTimeout(() => {
                                            this.props.dispatch(depositActions.changeDepositState("CLEAR"))
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
                                    <Modal.Title>{newStateHeading}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    {(showDepositFundsForm!==true &&
                                        newStateUpdate!=="setmaximumwithdrawalamount" && newStateUpdate!=="setrecommendeddepositamount"
                                         && newStateUpdate!=="beginmaturity" && newStateUpdate!=="makewithdrawal"
                                         && newStateUpdate!=="transfer") &&
                                        <Form.Group>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Present State</Form.Label>
                                                    <span className="form-text">{depositDetails.accountStateDescription} </span>
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">New State</Form.Label>
                                                    <span className="form-text">{newState}</span>
                                                </Col>
                                            </Form.Row>
                                        </Form.Group>
                                    }

                                    {newStateUpdate==="beginmaturity" && 
                                        <Form.Row className="mb-10">
                                            <Col className="date-wrap">
                                                <Form.Label className="block-level">Maturity Date</Form.Label>
                                                <Form.Group className="mb-0 date-wrap">
                                                    <DatePicker placeholderText="Choose  date"
                                                        dateFormat="d MMMM, yyyy"
                                                        className="form-control form-control-sm"
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        name="maturityDate"
                                                        value={values.maturityDate}
                                                        onChange={setFieldValue}
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        minDate={new Date()}
                                                        className={errors.maturityDate && touched.maturityDate ? "is-invalid form-control form-control-sm h-38px" : "form-control h-38px form-control-sm"}
                                                    />
                                                    {errors.maturityDate && touched.maturityDate ? (
                                                        <span className="invalid-feedback">{errors.maturityDate}</span>
                                                    ) : null}
                                                </Form.Group>
                                                
                                            </Col>
                                        </Form.Row>
                                    }
                                    {(showDepositFundsForm!==true &&
                                        newStateUpdate!=="setmaximumwithdrawalamount" && newStateUpdate!=="setrecommendeddepositamount"
                                        && newStateUpdate!=="beginmaturity" && newStateUpdate!=="makewithdrawal"
                                         && newStateUpdate!=="transfer") &&
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

                                    {newStateUpdate === "makewithdrawal" &&
                                        <div>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Amount</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        autoComplete="off"
                                                        onChange={handleChange}
                                                        value={numberWithCommas(values.amountToWithdraw)}
                                                        className={errors.amountToWithdraw && touched.amountToWithdraw ? "is-invalid h-38px" : "h-38px"}
                                                        name="amountToWithdraw" required />
                                                    {errors.amountToWithdraw && touched.amountToWithdraw ? (
                                                        <span className="invalid-feedback">{errors.amountToWithdraw}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-0">
                                                        <Form.Label className="block-level">Transaction Channel</Form.Label>
                                                        {allChannels.length >= 1 &&
                                                            <div>
                                                                <Select
                                                                    options={allChannels}

                                                                    onChange={(selected) => {
                                                                        setFieldValue('depositChannelEncodedKey', selected.value)
                                                                    }}
                                                                    onBlur={() => setFieldTouched('depositChannelEncodedKey', true)}
                                                                    className={errors.depositChannelEncodedKey && touched.depositChannelEncodedKey ? "is-invalid" : null}
                                                                    name="depositChannelEncodedKey"
                                                                />
                                                                {errors.depositChannelEncodedKey || (errors.depositChannelEncodedKey && touched.depositChannelEncodedKey) ? (
                                                                    <span className="invalid-feedback">{errors.depositChannelEncodedKey}</span>
                                                                ) : null}
                                                            </div>
                                                        }
                                                        {adminGetTransactionChannelsRequest.request_status === administrationConstants.GET_TRANSACTION_CHANNELS_FAILURE &&
                                                            <div className="errormsg"> Unable to load Disbursment channels</div>
                                                        }


                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>
                                            <Form.Row className="mb-10">
                                                <Col className="date-wrap">
                                                    <Form.Group className="table-helper m-b-5">
                                                        <input type="checkbox"
                                                            name="allowBackDate"
                                                            onChange={handleChange}
                                                            checked={values.allowBackDate ? values.allowBackDate : null}
                                                            value={values.allowBackDate}
                                                            id="allowBackDate" />
                                                        <label htmlFor="allowBackDate">Backdate</label>
                                                    </Form.Group>
                                                    {values.allowBackDate === true &&
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
                                                                maxDate={new Date()}
                                                                className={errors.backDateChosen && touched.backDateChosen ? "is-invalid form-control form-control-sm h-38px" : "form-control h-38px form-control-sm"}
                                                            />
                                                            {errors.backDateChosen && touched.backDateChosen ? (
                                                                <span className="invalid-feedback">{errors.backDateChosen}</span>
                                                            ) : null}
                                                        </Form.Group>
                                                    }
                                                </Col>
                                            </Form.Row>
                                        </div>
                                    }

                                    {showDepositFundsForm===true &&
                                        <div>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Amount</Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        autoComplete="off"
                                                        onChange={handleChange}
                                                        value={numberWithCommas(values.amountToDeposit)}
                                                        className={errors.amountToDeposit && touched.amountToDeposit ? "is-invalid h-38px" : "h-38px"}
                                                        name="amountToDeposit" required />
                                                    {errors.amountToDeposit && touched.amountToDeposit ? (
                                                        <span className="invalid-feedback">{errors.amountToDeposit}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-0">
                                                        <Form.Label className="block-level">Transaction Channel</Form.Label>
                                                        {allChannels.length >=1 &&
                                                            <div>
                                                                <Select
                                                                    options={allChannels}
                                                                    
                                                                    onChange={(selected) => {
                                                                        setFieldValue('depositChannelEncodedKey', selected.value)
                                                                    }}
                                                                    onBlur={()=> setFieldTouched('depositChannelEncodedKey', true)}
                                                                    className={errors.depositChannelEncodedKey && touched.depositChannelEncodedKey ? "is-invalid" : null}
                                                                    name="depositChannelEncodedKey"
                                                                />
                                                                {errors.depositChannelEncodedKey || (errors.depositChannelEncodedKey && touched.depositChannelEncodedKey) ? (
                                                                    <span className="invalid-feedback">{errors.depositChannelEncodedKey}</span>
                                                                ) : null}
                                                            </div>
                                                        }
                                                        {adminGetTransactionChannelsRequest.request_status=== administrationConstants.GET_TRANSACTION_CHANNELS_FAILURE &&
                                                            <div className="errormsg"> Unable to load Disbursment channels</div>
                                                        }
                                                        
                                                        
                                                    </Form.Group>
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
                                                                maxDate={new Date()}
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
                                                                maxDate={new Date()}
                                                                className={errors.bookingDateChosen && touched.bookingDateChosen ? "is-invalid form-control form-control-sm h-38px" : "form-control form-control-sm h-38px"}
                                                            />
                                                            {errors.bookingDateChosen && touched.bookingDateChosen ? (
                                                                <span className="invalid-feedback">{errors.bookingDateChosen}</span>
                                                            ) : null}
                                                        </Form.Group>
                                                    }
                                                </Col>
                                            </Form.Row>
                                            
                                            
                                        </div>
                                    }
                                    {(newStateUpdate==="setmaximumwithdrawalamount" || newStateUpdate==="setrecommendeddepositamount") &&
                                        <div>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">{newStateHeading} (&#8358;) </Form.Label>
                                                    <Form.Control 
                                                        type="text"
                                                        autoComplete="off"
                                                        onChange={handleChange}
                                                        value={numberWithCommas(values.amountToDeposit)}
                                                        className={errors.amountToDeposit && touched.amountToDeposit ? "is-invalid h-38px" : "h-38px"}
                                                        name="amountToDeposit" required />
                                                    {errors.amountToDeposit && touched.amountToDeposit ? (
                                                        <span className="invalid-feedback">{errors.amountToDeposit}</span>
                                                    ) : null}
                                                </Col>
                                                <Col>
                                                </Col>
                                                
                                            </Form.Row>
                                            
                                        </div>
                                    }

                                    {(showDepositFundsForm===true || newStateUpdate === "setmaximumwithdrawalamount" || newStateUpdate === "setrecommendeddepositamount"
                                        || newStateUpdate==="beginmaturity" || newStateUpdate ==="makewithdrawal") &&

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
                                    }
                                    {
                                        newStateUpdate==="transfer" && 
                                            <div>
                                                <Form.Row>
                                                    <Col>
                                                        <Form.Label className="block-level">From</Form.Label>
                                                        <span className="form-text">{getAClientDepositAccountRequest.productName}-{getAClientDepositAccountRequest.accountNumber}</span>
                                                    </Col>
                                                    <Col>
                                                        <Form.Label className="block-level">To</Form.Label>
                                                        <select className="form-control form-control-sm"
                                                            value={typeOfTransfer}
                                                            name="typeOfTransferToInitiate"
                                                            onChange={(e)=>{
                                                                this.setState({typeOfTransfer: e.target.value,
                                                                    selectOtherCustomerAccount:"",
                                                                    defaultAccountOptions:"",
                                                                    selectACustomerAccount:""})
                                                            }}
                                                        >
                                                            <option value="currentcustomer">{getAClientDepositAccountRequest.accountHolderName}</option>
                                                            <option value="anothercustomer">Another Customer</option>
                                                        </select>
                                                    </Col>
                                                </Form.Row>
                                                {typeOfTransfer ==="currentcustomer" &&
                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Label className="block-level">Account to Transfer To</Form.Label>
                                                            <Select
                                                                options={allAccountOfCurrentCustomer}
                                                                
                                                                onChange={(selected) => {
                                                                    setFieldValue('currentCustomerChosenAccount', selected.value)
                                                                }}
                                                                onBlur={()=> setFieldTouched('currentCustomerChosenAccount', true)}
                                                                className={errors.currentCustomerChosenAccount && touched.currentCustomerChosenAccount ? "is-invalid" : null}
                                                                name="currentCustomerChosenAccount"
                                                            />
                                                            {errors.currentCustomerChosenAccount && touched.currentCustomerChosenAccount ? (
                                                                <span className="invalid-feedback">{errors.currentCustomerChosenAccount}</span>
                                                            ) : null}
                                                        </Col>
                                                    </Form.Row>
                                                }
                                                {typeOfTransfer ==="anothercustomer" &&
                                                    <Form.Row>
                                                        <Col className="async-search-wrap">
                                                            <Form.Label className="block-level">Account to Transfer To</Form.Label>
                                                            {   (
                                                                 searchForAccountsWithCustomerKeyRequest.request_status !== loanAndDepositsConstants.SEARCH_FOR_ACCOUNTS_WITH_CUSTOMERKEY_PENDING) 
                                                                &&
                                                                <div>
                                                                    <AsyncSelect
                                                                        cacheOptions= {false}
                                                                        value={selectOtherCustomerAccount}
                                                                        noOptionsMessage={this.noOptionsForAccountMessage}
                                                                        getOptionValue={this.getSearchForAccountOptionValue}
                                                                        getOptionLabel={this.getSearchOptionForAccountLabel}
                                                                        defaultOptions={defaultAccountOptions!==""?defaultAccountOptions:null}
                                                                        loadOptions={this.initiateAccountSearch}
                                                                        placeholder="Search Accounts"
                                                                        name="chosenAccountNum"
                                                                        className={errors.chosenAccountNum && touched.chosenAccountNum ? "is-invalid" : null}
                                                                        onChange={(selectedOption)=>{
                                                                            setFieldValue('chosenAccountNum', selectedOption.searchItemEncodedKey);
                                                                            
                                                                            if (this.state.isCustommerAccountsFetchedWithKey!==true){
                                                                                this.setState({
                                                                                    selectOtherCustomerAccount: selectedOption,
                                                                                    firstChosenTransferCriteria:"accounts",
                                                                                    selectACustomerAccount:""
                                                                                });
                                                                            }else{
                                                                                this.setState({
                                                                                    selectOtherCustomerAccount: selectedOption,
                                                                                    firstChosenTransferCriteria:"customer",
                                                                                });
                                                                            }
                                                                            
                                                                        }}
                                                                        onBlur={()=> setFieldTouched('chosenAccountNum', true)}
                                                                    />
                                                                    {errors.chosenAccountNum && touched.chosenAccountNum ? (
                                                                        <span className="invalid-feedback">{errors.chosenAccountNum}</span>
                                                                    ) : null}
                                                                </div>
                                                            }
                                                            {
                                                                (searchForAccountsWithCustomerKeyRequest.request_status 
                                                                && searchForAccountsWithCustomerKeyRequest.request_status === loanAndDepositsConstants.SEARCH_FOR_ACCOUNTS_WITH_CUSTOMERKEY_PENDING) 
                                                                &&
                                                                <span className="form-text">Loading all accounts of {selectACustomerAccount.clientName}... </span>
                                                            }

                                                            {
                                                                // ( selectOtherCustomerAccount!=="" && defaultAccountOptions==="") &&
                                                                (searchAccountNumberRequest.request_status === loanAndDepositsConstants.SEARCH_ACCOUNT_NUMBERS_SUCCESS && selectOtherCustomerAccount!=="" && defaultAccountOptions==="" ) &&
                                                                    <div className="mt-20">
                                                                        <Form.Label className="block-level">Customer to transfer To</Form.Label>
                                                                        <span className="form-text">{selectOtherCustomerAccount.clientName} 
                                                                            <em className="edit-link"
                                                                                onClick={()=>{
                                                                                    this.setState({selectOtherCustomerAccount:"", isCustommerAccountsFetchedWithKey:""})
                                                                                    this.props.dispatch(depositActions.searchAccountNumbers("CLEAR"));
                                                                                }}> change</em> 
                                                                        </span>
                                                                    </div>
                                                            }

                                                            {
                                                            // ((isCustommerAccountsFetchedWithKey==="" || isCustommerAccountsFetchedWithKey===true)
                                                            //     && selectOtherCustomerAccount==="")
                                                                // && (searchAccountNumberRequest.request_status !== loanAndDepositsConstants.SEARCH_ACCOUNT_NUMBERS_SUCCESS
                                                                //      || )) &&
                                                                (selectOtherCustomerAccount==="" || firstChosenTransferCriteria==="customer")    &&
                                                                <div className="mt-20">
                                                                    <Form.Label className="block-level">Customer to transfer To</Form.Label>
                                                                    <AsyncSelect
                                                                        cacheOptions= {false}
                                                                        value={selectACustomerAccount}
                                                                        noOptionsMessage={this.noOptionsForCustomerMessage}
                                                                        getOptionValue={this.getSearchForCustomerOptionValue}
                                                                        getOptionLabel={this.getSearchOptionForCustomerLabel}
                                                                        // defaultOptions={defaultOptions}
                                                                        loadOptions={this.initiateCustomerSearch}
                                                                        placeholder="Search Accounts"
                                                                        onChange={this.handleSearchACustomerInputChange}
                                                                    />
                                                                </div>
                                                            }
                                                            {/* <Select
                                                                options={allAccountOfCurrentCustomer}
                                                                
                                                                onChange={(selected) => {
                                                                    setFieldValue('chosenAccountNum', selected.value)
                                                                }}
                                                                onBlur={()=> setFieldTouched('chosenAccountNum', true)}
                                                                className={errors.chosenAccountNum && touched.chosenAccountNum ? "is-invalid" : null}
                                                                name="chosenAccountNum"
                                                            />
                                                            {errors.chosenAccountNum && touched.chosenAccountNum ? (
                                                                <span className="invalid-feedback">{errors.chosenAccountNum}</span>
                                                            ) : null} */}
                                                        </Col>
                                                    </Form.Row>
                                                    
                                                }
                                                <Form.Row>
                                                    <Col>
                                                        <Form.Label className="block-level">Amount (&#8358;)</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            autoComplete="off"
                                                            onChange={handleChange}
                                                            value={numberWithCommas(values.amountToTransfer)}
                                                            className={errors.amountToTransfer && touched.amountToTransfer ? "is-invalid h-38px" : "h-38px"}
                                                            name="amountToTransfer" required />
                                                        {errors.amountToTransfer && touched.amountToTransfer ? (
                                                            <span className="invalid-feedback">{errors.amountToTransfer}</span>
                                                        ) : null}
                                                    </Col>
                                                    <Col></Col>
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

                                    <Button variant="light" onClick={this.handleDepositChangeStateClose}>
                                        Cancel
                                    </Button>
                                    <Button 
                                        variant="success"
                                        type="submit"
                                        disabled={changeDepositStateRequest.is_request_processing}
                                    >
                                        {changeDepositStateRequest.is_request_processing?"Please wait...":`${ctaText}`}
                                        
                                    </Button>

                                </Modal.Footer>
                                <div className="footer-alert">
                                    {changeDepositStateRequest.request_status === loanAndDepositsConstants.CHANGE_DEPOSITSTATE_SUCCESS && 
                                        <Alert variant="success" className="w-65 mlr-auto">
                                            {changeDepositStateRequest.request_data.response.data.message}
                                        </Alert>
                                    }
                                    {(changeDepositStateRequest.request_status === loanAndDepositsConstants.CHANGE_DEPOSITSTATE_FAILURE && changeDepositStateRequest.request_data.error )&& 
                                        <Alert variant="danger" className="w-65 mlr-auto">
                                            {changeDepositStateRequest.request_data.error}
                                        </Alert>
                                    }
                                </div>
                            </Form>
                        )}
                </Formik>
            </Modal>
        )
    }

    renderDepositCtas =(depositDetails)=>{
        //     public enum depositStateEnum
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
        let allUSerPermissions =[];
        this.userPermissions.map(eachPermission=>{
            allUSerPermissions.push(eachPermission.permissionCode)
        })

            return(
                <div className="heading-ctas">
                    <ul className="nav">
                        {(depositDetails.accountState ===2 && allUSerPermissions.indexOf("bnk_approve_deposit_account") >-1) &&
                            <li>
                                <Button size="sm"
                                    onClick={()=>{
                                        this.setState({newState: "Approved", newStateUpdate: "approve", newStateHeading :"Change Deposit State", ctaText:"Approve Deposit"})
                                        this.handleDepositChangeStateShow()
                                    }}
                                >Approve</Button>
                            </li>
                        }
                        {(depositDetails.accountState ===2) &&
                            <li>
                                <Button size="sm" 
                                    onClick={()=>{
                                        this.setState({newState: "Set Incomplete", newStateHeading :"Change Deposit State", newStateUpdate: "settopartialapplication", ctaText:"Set Incomplete"})
                                        this.handleDepositChangeStateShow()
                                    }}
                                >Set Incomplete</Button>
                            </li>
                        }

                        {(depositDetails.accountState ===5 && depositDetails.isMaturityDateSet===false && depositDetails.productType===2) &&
                            <li>
                                <Button size="sm"
                                    onClick={()=>{
                                        this.setState({newState: "Begin Maturity Period", newStateHeading :"Begin Maturity Period", newStateUpdate: "beginmaturity", ctaText:"Begin Maturity"})
                                        this.handleDepositChangeStateShow()
                                    }}
                                >Begin Maturity</Button>
                            </li>
                        }

                        {(depositDetails.accountState ===5  &&  depositDetails.depositAvailableBalance >=1) &&
                            <li>
                                <Button size="sm"
                                    onClick={()=>{
                                        this.setState({newState: "Make Withdrawal", newStateHeading :"Make Withdrawal", newStateUpdate: "makewithdrawal", ctaText:"Make Withdrawal"})
                                        this.handleDepositChangeStateShow()
                                    }}
                                >Withdrawal</Button>
                            </li>
                        }

                        {((depositDetails.accountState ===5 || depositDetails.accountState ===3)  && (depositDetails.productType===2 || depositDetails.productType===1 || depositDetails.productType===4) && depositDetails.depositAvailableBalance >=1) &&
                            <li>
                                <Button size="sm"
                                    onClick={()=>{
                                        this.setState({typeOfTransfer: "currentcustomer",
                                                            selectOtherCustomerAccount:"",
                                                            selectACustomerAccount:"",
                                                            newState: "Make Transfer",
                                                            newStateHeading :"Make Transfer",
                                                            newStateUpdate: "transfer",
                                                            ctaText:"Make Transfer"})
                                        this.handleDepositChangeStateShow()
                                    }}
                                >Transfer</Button>
                            </li>
                        }

                        {/* {(depositDetails.accountState ===5) &&
                            <li>
                                <Button size="sm" >Enter Repayment</Button>
                            </li>
                        } */}

                        {(depositDetails.accountState ===1 && allUSerPermissions.indexOf("bnk_request_deposit_approval") >- 1) &&
                            <li>
                                <Button size="sm" 
                                    onClick={()=>{
                                        this.setState({newState: "Request Approval",newStateHeading :"Change Deposit State", newStateUpdate: "requestapproval", ctaText:"Request Approval"})
                                        this.handleDepositChangeStateShow()
                                    }}
                                >Request Approval</Button>
                            </li>
                        }
    
                        {(depositDetails.accountState ===3 || depositDetails.accountState ===5) &&
                            <li>
                                <Button size="sm"
                                     onClick={()=>{
                                        this.setState({newStateUpdate: "deposit",newStateHeading :"Change Deposit State", ctaText:"Make Deposit", showDepositFundsForm:true})
                                        this.handleDepositChangeStateShow()
                                    }}
                                >Make Deposit</Button>
                            </li>
                        }
                        {(depositDetails.accountState ===1 || depositDetails.accountState ===2 || depositDetails.accountState ===3) &&
                            <li>
                                <DropdownButton
                                    size="sm"
                                    title="Close"
                                    key="inActiveCurrency"
                                    className="customone"
                                    alignRight
                                >
                                    {((depositDetails.accountState ===1 || depositDetails.accountState ===2) && allUSerPermissions.indexOf("bnk_reject_deposit_account") >- 1) &&
                                        <Dropdown.Item eventKey="1"
                                            onClick={()=>{
                                                this.setState({newState: "Rejected", newStateUpdate: "reject", newStateHeading :"Change Deposit State", ctaText:"Reject"})
                                                this.handleDepositChangeStateShow()
                                            }}
                                        >Reject</Dropdown.Item>
                                    }
                                    {(depositDetails.accountState ===1 || depositDetails.accountState ===2 || depositDetails.accountState ===3) &&
                                        <Dropdown.Item eventKey="1"
                                            onClick={()=>{
                                                this.setState({newState: "Closed(Withdrawn)",newStateHeading :"Change Deposit State", newStateUpdate: "withdraw", ctaText:"Withdraw"})
                                                this.handleDepositChangeStateShow()
                                            }}
                                        >Withdraw</Dropdown.Item>
                                    }
                                    {(depositDetails.accountState ===5) &&
                                        <Dropdown.Item eventKey="1">Pay Off</Dropdown.Item>
                                    }
                                    {(depositDetails.accountState ===5) &&
                                        <Dropdown.Item eventKey="1">Write Off</Dropdown.Item>
                                    }
                                </DropdownButton>
                            </li>
                        }
                        <li>
                            <DropdownButton
                                size="sm"
                                title="More"
                                key="inActiveCurrency"
                                className="customone"
                                alignRight
                            >
                                <Dropdown.Item eventKey="1"
                                    onClick={()=>{
                                        this.setState({ newStateUpdate: "setmaximumwithdrawalamount", newStateHeading:"Maximum Withdrawal Amount", ctaText:"Update"})
                                        this.handleDepositChangeStateShow()
                                    }}
                                >Set Max Withdrawal Amount</Dropdown.Item>
                                <Dropdown.Item eventKey="1"
                                    onClick={()=>{
                                        this.setState({ newStateUpdate: "setrecommendeddepositamount", newStateHeading:"Recommended Deposit Amount", ctaText:"Update"})
                                        this.handleDepositChangeStateShow()
                                    }}
                                >Set Recommended Deposit</Dropdown.Item>
                                
                            </DropdownButton>
                        </li>
                       
                        
                    </ul>
                </div>
            )
        }

    renderPage=()=>{
        let getAClientRequest = this.props.getAClientReducer,
            getClientLoansRequest = this.props.getClientLoansReducer,
            getAClientDepositAccountRequest = this.props.getAClientDepositAccountReducer,
            getClientDepositsRequest = this.props.getClientDepositsReducer;

            let allUSerPermissions =[];
            this.userPermissions.map(eachPermission=>{
                allUSerPermissions.push(eachPermission.permissionCode)
            })

            if((getAClientRequest.request_status===clientsConstants.GET_A_CLIENT_SUCCESS
                &&  getClientLoansRequest.request_status ===loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS
                && getClientDepositsRequest.request_status ===loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS)
                &&
                getAClientDepositAccountRequest.request_status ===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_DETAILS_PENDING){
    
                return(
                    <div className="loading-text mt-30">Please wait... </div>
                )
            }

            if(getAClientDepositAccountRequest.request_status ===loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_DETAILS_SUCCESS
                &&  getClientLoansRequest.request_status ===loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS
            && getClientDepositsRequest.request_status ===loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS){
                return(
                    <div className="row">
                        {this.changeDepositStateBox(getAClientDepositAccountRequest.request_data.response.data)}
                        <div className="col-sm-12">
                            <div className="middle-content">
                                
                                <div className="customerprofile-tabs">
                                    <Tab.Container defaultActiveKey="details">

                                        <Nav variant="pills" >
                                            <Nav.Item>
                                                <Nav.Link eventKey="details">Details</Nav.Link>
                                            </Nav.Item>
                                            {allUSerPermissions.indexOf("bnk_view_deposit_transactions") >-1 &&
                                                <Nav.Item>
                                                    <Nav.Link eventKey="transactions" onSelect={this.getCustomerDepositTransactions}>Transactions</Nav.Link>
                                                </Nav.Item>
                                            }
                                            {allUSerPermissions.indexOf("bnk_view_deposit_activities") >-1 &&
                                                <Nav.Item>
                                                    <Nav.Link eventKey="activity" onSelect={this.getADepositActivities}>Activity</Nav.Link>
                                                </Nav.Item>
                                            }
                                            {allUSerPermissions.indexOf("bnk_view_deposit_attachments") >-1 &&
                                                <Nav.Item>
                                                    <Nav.Link eventKey="attachments" onSelect={this.getACustomerDepositAttachments}>Attachments</Nav.Link>
                                                </Nav.Item>
                                            }
                                            {allUSerPermissions.indexOf("bnk_view_deposit_comments") >-1 &&
                                                <Nav.Item>
                                                    <Nav.Link eventKey="comments" onSelect={this.getADepositComments}>Comments</Nav.Link>
                                                </Nav.Item>
                                            }
                                            {allUSerPermissions.indexOf("bnk_view_deposit_communications") >-1 &&
                                                <Nav.Item>
                                                    <Nav.Link eventKey="communications" onSelect={this.getADepositCommunications}>Communications</Nav.Link>
                                                </Nav.Item>
                                            }
                                        </Nav>
                                        {this.renderDepositCtas(getAClientDepositAccountRequest.request_data.response.data)}
                                        <Tab.Content>
                                            <Tab.Pane eventKey="details">
                                                <div className="amounts-wrap w-40 centered">

                                                    {this.renderAccountState(getAClientDepositAccountRequest.request_data.response.data)}
                                                </div>
                                                {this.renderOverview(getAClientDepositAccountRequest.request_data.response.data)}
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="transactions">
                                                {this.renderDepositTransaction()}
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
        adminGetTransactionChannels : state.administrationReducers.adminGetTransactionChannelsReducer,
        getAClientReducer: state.clientsReducers.getAClientReducer,
        getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        getClientLoansReducer: state.loansReducers.getClientLoansReducer,
        getAClientDepositAccountReducer: state.depositsReducers.getAClientDepositAccountReducer,
        getADepositAccountActivitiesReducer: state.depositsReducers.getADepositAccountActivitiesReducer,
        getADepositAccountCommunicationsReducer: state.depositsReducers.getADepositAccountCommunicationsReducer,
        getAccountDepositTransactionReducer: state.depositsReducers.getAccountDepositTransactionReducer,
        getAClientDepositAccountCommentsReducer: state.depositsReducers.getAClientDepositAccountCommentsReducer,
        createADepositCommentReducer: state.depositsReducers.createADepositCommentReducer,
        getADepositAccountAttachmentsReducer: state.depositsReducers.getADepositAccountAttachmentsReducer,
        createADepositAttachmentReducer: state.depositsReducers.createADepositAttachmentReducer,
        changeDepositStateReducer: state.depositsReducers.changeDepositStateReducer,
        searchAccountNumbersReducer: state.depositsReducers.searchAccountNumbersReducer,
        searchCustomerAccountReducer: state.depositsReducers.searchCustomerAccountReducer,
        searchForAccountsWithCustomerKeyReducer: state.depositsReducers.searchForAccountsWithCustomerKeyReducer,
    };
}

export default connect(mapStateToProps) (ViewClosedSavingsAccount);