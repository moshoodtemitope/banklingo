import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import AdminNav from './_menu'
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Modal from 'react-bootstrap/Modal'
import AccessNav from './menus/_access-menu'
import {authActions} from '../../redux/actions/auth/auth.action';
import {authConstants} from '../../redux/actiontypes/auth/auth.constants'
// import Alert from 'react-bootstrap/Alert'
// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class AccessUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:25,
            CurrentPage:1,
            CurrentSelectedPage: 1,
            refresh: false,
            showPINStatus: false,
            showResetPasswordStatus: false,
            showActivationStatus: false,
            ShowDeactivated:false,
            endDate: "",
            startDate: "",
            SearchText: ""
            // ShowDeactivated:false
        }
        this.userPermissions =  JSON.parse(localStorage.getItem("x-u-perm"));

        
    }

    componentDidMount(){
        this.loadInitialData();
    }

    loadInitialData=()=>{
        let {PageSize, CurrentPage,ShowDeactivated}= this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&ShowDeactivated=${ShowDeactivated}`;
        this.getUsers(params);
    }

    handleResetPINUpdates = async (resetPINPayload) =>{
        this.handleshowPINStatus();
        
        const {dispatch} = this.props;
       
        await dispatch(authActions.ResetPIN(resetPINPayload));

        
    }

    handleUserStateUpdates = async (activationAction,userStatePayload) =>{
        this.handleshowActivationtatus();
        const {dispatch} = this.props;
       
        await dispatch(authActions.activateDeactivateUser(activationAction,userStatePayload));

        
    }

    resetUserPIN=(resetPINPayload, userToResetPInFor) =>{
        this.setState({userToResetPInFor})
        this.handleResetPINUpdates(resetPINPayload)
            .then(
                () => {
                    if(this.props.ResetPinReducer.request_status === authConstants.RESET_PIN_SUCCESS){
                      
                    //    this.handleClosePINStatus();
                        
                        
                    }
                    // else{
                    //     setTimeout(() => {
                    //         this.props.dispatch(acoountingActions.createGLAccount("CLEAR"))
                    //     }, 2000);
                    // }
                    
                    

                }
            )
            .catch()
    }

    handleResetPasswordUpdates = async (resetPasswordPayload) =>{
        this.handleshowResetPasswordStatus();
        
        const {dispatch} = this.props;
       
        await dispatch(authActions.ResetPassword(resetPasswordPayload));

        
    }

    handleDateChangeRaw = (e) => {
        e.preventDefault();
    }
    handleStartDatePicker = (startDate) => {
        startDate.setHours(startDate.getHours() + 1);

        this.setState({ startDate }, () => {
            if (this.state.endDate !== "") {
                //this.getHistory();
            }
        });
    }

    handleEndDatePicker = (endDate) => {
        endDate.setHours(endDate.getHours() + 1);

        this.setState({ endDate }, () => {
            if (this.state.startDate !== "") {
                //this.getHistory();
            }
        });
    }

    resetUserPassword=(resetPasswordPayload, userToResetPasswordFor) =>{
        this.setState({userToResetPasswordFor})
        this.handleResetPasswordUpdates(resetPasswordPayload)
            .then(
                () => {
                    if(this.props.ResetPasswordReducer.request_status === authConstants.RESET_PASSWORD_SUCCESS){
                      
                    //    this.handleClosePINStatus();
                        
                        
                    }
                    // else{
                    //     setTimeout(() => {
                    //         this.props.dispatch(acoountingActions.createGLAccount("CLEAR"))
                    //     }, 2000);
                    // }
                    
                    

                }
            )
            .catch()
    }

    showAllDeactivatedUsers = (ShowDeactivated, allUsersData)=>{
        // let {ShowDeactivated} =  this.state;
        this.setState({ShowDeactivated : ShowDeactivated.target.checked},()=>{
            // let allUsersData = this.props.adminGetUsers.request_data.response? this.props.adminGetUsers.request_data.response.data:undefined;

            const {dispatch} = this.props;
            let {PageSize, CurrentPage, ShowDeactivated} = this.state;

            let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&ShowDeactivated=${ShowDeactivated}`;
            // this.getTransactionChannels(params);


            if(allUsersData){
                dispatch(administrationActions.getUsers(params,allUsersData));
            }else{
                dispatch(administrationActions.getUsers(params));
            }
        })
    }

    activateDeactivateUser=(userActionPayload, userDetailsForAction, activationAction) =>{
        let allUsersData = this.props.adminGetUsers.request_data.response.data;
        this.setState({userDetailsForAction, activationAction})
        this.handleUserStateUpdates(activationAction,userActionPayload)
            .then(
                () => {
                    if(this.props.ActivateDeactivateUserReducer.request_status === authConstants.ACTIVATE_DEACTIVATE_USER_SUCCESS){
                      
                    //    this.handleClosePINStatus();
                        
                        setTimeout(() => {
                            const {dispatch} = this.props;
                            let {PageSize, CurrentPage, ShowDeactivated} = this.state;

                            let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&ShowDeactivated=${ShowDeactivated}`;
                            // this.getTransactionChannels(params);


                            if(allUsersData){
                                dispatch(administrationActions.getUsers(params,allUsersData));
                            }else{
                                dispatch(administrationActions.getUsers(params));
                            }
                        }, 500);
                    }
                    // else{
                    //     setTimeout(() => {
                    //         this.props.dispatch(acoountingActions.createGLAccount("CLEAR"))
                    //     }, 2000);
                    // }
                    
                    

                }
            )
            .catch()
    }

    setPagesize = (PageSize, tempData)=>{
        // console.log('----here', PageSize.target.value);
        const {dispatch} = this.props;
        let {CurrentPage,ShowDeactivated}= this.state;
        

        let sizeOfPage = PageSize.target.value;

        this.setState({PageSize: sizeOfPage, refresh: true});
        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&ShowDeactivated=${ShowDeactivated}`;

        if(tempData){
            
            dispatch(administrationActions.getUsers(params,tempData));
        }else{
            dispatch(administrationActions.getUsers(params));
        }
        
       
    }


    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize, CurrentPage, ShowDeactivated} = this.state;

        this.setState({CurrentPage: nextPage});

        let params = `PageSize=${PageSize}&CurrentPage=${nextPage}&ShowDeactivated=${ShowDeactivated}`;
        // this.getTransactionChannels(params);


        if(tempData){
            dispatch(administrationActions.getUsers(params,tempData));
        }else{
            dispatch(administrationActions.getUsers(params));
        }
    }

    getUsers = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(administrationActions.getUsers(paramters));
    }

    searchAllData = (e, tempData) => {
        e.preventDefault()
        const { dispatch } = this.props;
        let { PageSize, CurrentPage, SearchText, endDate, startDate,ShowDeactivated } = this.state;

        // this.setState({PageSize: sizeOfPage});

        // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);
        if (SearchText !== "" || endDate !== "" || startDate !== "") {
            if (endDate !== "") {
                endDate = endDate.toISOString()
            }
            if (startDate !== "") {
                startDate = startDate.toISOString()
            }
            let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}&ShowDeactivated=${ShowDeactivated}`;

            if (tempData) {
                dispatch(administrationActions.getUsers(params, tempData));
            } else {
                dispatch(administrationActions.getUsers(params));
            }
        }
    }

    renderAllUsers =()=>{
        let {showPINStatus,showResetPasswordStatus, showActivationStatus,ShowDeactivated} = this.state;
        let adminGetUsersRequest = this.props.adminGetUsers;
        let allUSerPermissions =[];
        this.userPermissions.map(eachPermission=>{
            allUSerPermissions.push(eachPermission.permissionCode)
        })
        let saveRequestData= adminGetUsersRequest.request_data!==undefined?adminGetUsersRequest.request_data.tempData:null;
            switch (adminGetUsersRequest.request_status){
                case (administrationConstants.GET_USERS_PENDING):
                    if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
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
                                            {/* <option value="10">10</option> */}
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                    </div>
                                </div>
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Fullname</th>
                                            <th>User Name</th>
                                            <th>Title</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Branch</th>
                                            <th>Last updated</th>
                                            <th>State</th>
                                            <th>Created by</th>
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
                                        <DatePicker autoComplete="new-off" 
                                                onChangeRaw={this.handleDateChangeRaw}
                                                onChange={this.handleStartDatePicker}
                                                selected={this.state.startDate}
                                                dateFormat="d MMMM, yyyy"
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                placeholderText="Start date"
                                                            autoComplete="new-password"
                                                maxDate={new Date()}
                                                // className="form-control form-control-sm h-38px"
                                                className="form-control form-control-sm "

                                            />
                                             <DatePicker autoComplete="new-off" 

placeholderText="End  date"
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
                                                value={this.state.SearchText}
                                                onChange={(e) => {
                                                    this.setState({ SearchText: e.target.value.trim() })
                                                }}
                                            />
                                            {/* {errors.startDate && touched.startDate ? (
                                                <span className="invalid-feedback">{errors.startDate}</span>
                                            ) : null} */}
                                        </Form.Group>
                                        <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                        {/* <div className="eachitem ml-20">
                                            <input checked={ShowDeactivated} onChange={this.showAllDeactivatedUsers} type="checkbox" name="" id="showdeactivatedusers" />
                                            <label htmlFor="showdeactivatedusers">Show De-activated Users</label>
                                        </div> */}
                                    </Form>

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
                                <div className="loading-text">Please wait... </div>
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Fullname</th>
                                            <th>User Name</th>
                                            <th>Title</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Branch</th>
                                            <th>Last updated</th>
                                            <th>State</th>
                                            <th>Created by</th>
                                            {allUSerPermissions.indexOf("bnk_edit_user") > -1 &&
                                                <th></th>
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            saveRequestData.map((eachUser, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <tr>
                                                            <td>
                                                                <NavLink to={`/user/${eachUser.encodedKey}`}> {eachUser.name}</NavLink>
                                                            </td>
                                                            <td>
                                                                <NavLink to={`/user/${eachUser.encodedKey}`}>{eachUser.userName}</NavLink>
                                                            </td>
                                                            <td>{eachUser.title}</td>
                                                            <td>{eachUser.emailAddress}</td>
                                                            <td>{eachUser.role}</td>
                                                            <td>{eachUser.branch}</td>
                                                            <td>{eachUser.lastUpdated}</td>
                                                            <td>{eachUser.objectStateDescription}</td>
                                                            <td>{(eachUser.createdBy !== "" && eachUser.createdBy !== null) ? eachUser.createdBy : "-"}</td>
                                                            {allUSerPermissions.indexOf("bnk_edit_user") > -1 &&

                                                                <td>
                                                                    {eachUser.encodedKey !== null &&
                                                                        <DropdownButton
                                                                            size="sm"
                                                                            title="Actions"
                                                                            key="editUser"
                                                                            className="customone"
                                                                        >
                                                                            <NavLink className="dropdown-item" to={`/administration/access/edit-user/${eachUser.encodedKey}`}>Edit</NavLink>
                                                                            <Dropdown.Item eventKey="1" onClick={() => this.resetUserPIN({ "encodedKey": eachUser.encodedKey }, eachUser.name)}>Reset PIN</Dropdown.Item>
                                                                            <Dropdown.Item eventKey="1" onClick={() => this.resetUserPassword({ "encodedKey": eachUser.encodedKey }, eachUser.name)}>Reset Password</Dropdown.Item>
                                                                            {eachUser.objectState !== 1 &&
                                                                                <Dropdown.Item eventKey="1" onClick={() => this.activateDeactivateUser({ "encodedKey": eachUser.encodedKey }, eachUser.name, "activate")}>Activate User</Dropdown.Item>
                                                                            }
                                                                            {eachUser.objectState === 1 &&
                                                                                <Dropdown.Item eventKey="1" onClick={() => this.activateDeactivateUser({ "encodedKey": eachUser.encodedKey }, eachUser.name, "deactivate")}>De-Activate User</Dropdown.Item>
                                                                            }
                                                                            {/*<Dropdown.Item eventKey="1">Edit</Dropdown.Item> */}
                                                                        </DropdownButton>
                                                                    }
                                                                </td>
                                                            }
                                                        </tr>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </tbody>

                                </TableComponent>
                                {allUSerPermissions.indexOf("bnk_create_user") >-1 &&
                                    <div className="footer-with-cta toleft">
                                        <NavLink to={'/administration/access/new-user'} className="btn btn-primary">Create New User</NavLink>
                                    </div>
                                }

                            </div>
                        )
                    }

                case(administrationConstants.GET_USERS_SUCCESS):
                    let allUsersData = adminGetUsersRequest.request_data.response.data;
                    
                        if(allUsersData!==undefined){
                            if(allUsersData.result.length>=1){
                                return(
                                    <div>
                                        
                                        <div className="heading-with-cta">
                                            <div>
                                                <div className="eachitem ml-20">
                                                    <input checked={ShowDeactivated} onChange={(e) => this.showAllDeactivatedUsers(e, allUsersData.result)} type="checkbox" name="" id="showdeactivated" />
                                                    <label htmlFor="showdeactivated">Show De-activated Users</label>
                                                </div>
                                            </div>
                                            {allUSerPermissions.indexOf("bnk_create_user") > -1 &&
                                                <div className="footer-with-cta toleft">
                                                    <NavLink to={'/administration/access/new-user'} className="btn btn-primary">Create New User</NavLink>
                                                </div>
                                            }
                                        </div>
                                        <div className="heading-with-cta">
                                            <Form className="one-liner" onSubmit={(e) => this.searchAllData(e, allUsersData.result)}>

                                                <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                                    <Form.Control as="select" size="sm">
                                                        <option>No Filter</option>
                                                        <option>Add New Filter</option>
                                                        <option>Custom Filter</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group className="table-filters">
                                                
             <DatePicker autoComplete="new-off"
                                        onChangeRaw={this.handleDateChangeRaw}
                                                        onChange={this.handleStartDatePicker}
                                                        selected={this.state.startDate}
                                                        dateFormat="d MMMM, yyyy"
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        placeholderText="Start date"
                                                            autoComplete="new-password"
                                                        maxDate={new Date()}
                                                        // className="form-control form-control-sm h-38px"
                                                        className="form-control form-control-sm "

                                                    />
                                                     <DatePicker autoComplete="new-off" 

placeholderText="End  date"
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
                                                        value={this.state.SearchText}
                                                        onChange={(e) => {
                                                            this.setState({ SearchText: e.target.value.trim() })
                                                        }}
                                                    />

                                                </Form.Group>
                                                <Button className="no-margins" variant="primary" type="submit" >Filter</Button>
                                                {/* <div className="actions-wrap">
                                                    <Button onClick={this.exportClients} className="action-icon" variant="outline-secondary" type="button">
                                                        <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg==" width="16" height="16" />
                                                    </Button>
                                                </div> */}

                                            </Form>
                                            

                                            <div className="pagination-wrap">
                                                <label htmlFor="toshow">Show</label>
                                                <select id="toshow" 
                                                    onChange={(e)=>this.setPagesize(e, allUsersData)}
                                                    value={this.state.PageSize}
                                                    className="countdropdown form-control form-control-sm">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="200">200</option>
                                                </select>
                                                <TablePagination
                                                    totalPages={allUsersData.totalPages}
                                                    currPage={allUsersData.currentPage}
                                                    currRecordsCount={allUsersData.result.length}
                                                    totalRows={allUsersData.totalRows}
                                                    tempData={allUsersData.result}
                                                    pagesCountToshow={4}
                                                    refreshFunc={this.loadNextPage}
                                                />
                                            </div>
                                        </div>
                                        <TableComponent classnames="striped bordered hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Fullname</th>
                                                            <th>User Name</th>
                                                            <th>Title</th>
                                                            <th>Email</th>
                                                            <th>Role</th>
                                                            <th>Branch</th>
                                                            <th>Last updated</th>
                                                            <th>State</th>
                                                            <th>Created by</th>
                                                            {allUSerPermissions.indexOf("bnk_edit_user") >-1 &&
                                                                <th></th>
                                                            }
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            allUsersData.result.map((eachUser, index)=>{
                                                                return(
                                                                    <Fragment key={index}>
                                                                        <tr>
                                                                            <td>
                                                                               <NavLink to={`/user/${eachUser.encodedKey}`}> {eachUser.name}</NavLink>
                                                                            </td>
                                                                            <td>
                                                                                <NavLink to={`/user/${eachUser.encodedKey}`}>{eachUser.userName}</NavLink>
                                                                            </td>
                                                                            <td>{eachUser.title}</td>
                                                                            <td>{eachUser.emailAddress}</td>
                                                                            <td>{eachUser.role}</td>
                                                                            <td>{eachUser.branch}</td>
                                                                            <td>{eachUser.lastUpdated}</td>
                                                                            <td>{eachUser.objectStateDescription}</td>
                                                                            {
                                                                                (eachUser.createdByUserEncodedKey!=="" && eachUser.createdByUserEncodedKey!==null) &&
                                                                                <td>
                                                                                    <NavLink to={`/user/${eachUser.createdByUserEncodedKey}`}>
                                                                                        {(eachUser.createdBy!=="" && eachUser.createdBy!==null)?eachUser.createdBy: "-"}
                                                                                    </NavLink>
                                                                                </td>
                                                                            }
                                                                             {
                                                                                (eachUser.createdByUserEncodedKey==="" || eachUser.createdByUserEncodedKey===null) &&
                                                                                <td>{(eachUser.createdBy!=="" && eachUser.createdBy!==null)?eachUser.createdBy: "-"}</td>
                                                                            }
                                                                            
                                                                            
                                                                            {(eachUser.encodedKey !== null && allUSerPermissions.indexOf("bnk_edit_user") > -1) &&
                                                                                <td>
                                                                                    <DropdownButton
                                                                                        size="sm"
                                                                                        title="Actions"
                                                                                        key="editUser"
                                                                                        className="customone"
                                                                                    >
                                                                                        <NavLink className="dropdown-item" to={`/administration/access/edit-user/${eachUser.encodedKey}`}>Edit</NavLink>
                                                                                        <Dropdown.Item eventKey="1" onClick={()=>this.resetUserPIN({"encodedKey":eachUser.encodedKey }, eachUser.name)}>Reset PIN</Dropdown.Item>
                                                                                        <Dropdown.Item eventKey="1" onClick={()=>this.resetUserPassword({"encodedKey":eachUser.encodedKey }, eachUser.name)}>Reset Password</Dropdown.Item>
                                                                                        {eachUser.objectState!==1 &&
                                                                                            <Dropdown.Item eventKey="1" onClick={()=>this.activateDeactivateUser({"encodedKey":eachUser.encodedKey }, eachUser.name, "activate")}>Activate User</Dropdown.Item>
                                                                                        }
                                                                                        {eachUser.objectState===1 &&
                                                                                            <Dropdown.Item eventKey="1" onClick={()=>this.activateDeactivateUser({"encodedKey":eachUser.encodedKey }, eachUser.name, "deactivate")}>De-Activate User</Dropdown.Item>
                                                                                        }
                                                                                        {/* <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
                                                                                        <Dropdown.Item eventKey="1">Edit</Dropdown.Item> */}
                                                                                    </DropdownButton>
                                                                                </td>
                                                                            }
                                                                            
                                                                        </tr>
                                                                    </Fragment>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                    
                                        </TableComponent>
                                        {allUSerPermissions.indexOf("bnk_create_user") >-1 &&
                                            <div className="footer-with-cta toleft">
                                                <NavLink to={'/administration/access/new-user'} className="btn btn-primary">Create New User</NavLink>
                                            </div>
                                        }

                                    </div>
                                )
                            }else{
                                return(
                                        <div className="no-records">
                                            <div className="heading-with-cta">
                                            <Form className="one-liner" onSubmit={(e) => this.searchAllData(e, allUsersData.result)}>


                                                <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                                    <Form.Control as="select" size="sm">
                                                        <option>No Filter</option>
                                                        <option>Add New Filter</option>
                                                        <option>Custom Filter</option>
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group className="table-filters">
                                                
             <DatePicker autoComplete="new-off"
                                        onChangeRaw={this.handleDateChangeRaw}
                                                        onChange={this.handleStartDatePicker}
                                                        selected={this.state.startDate}
                                                        dateFormat="d MMMM, yyyy"
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        placeholderText="Start date"
                                                            autoComplete="new-password"
                                                        maxDate={new Date()}
                                                        // className="form-control form-control-sm h-38px"
                                                        className="form-control form-control-sm "

                                                    />
                                                     <DatePicker autoComplete="new-off" 

placeholderText="End  date"
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
                                                        value={this.state.SearchText}
                                                        onChange={(e) => {
                                                            this.setState({ SearchText: e.target.value.trim() })
                                                        }}
                                                    />
                                                    {/* {errors.startDate && touched.startDate ? (
<span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
                                                </Form.Group>

                                                <Button className="no-margins" variant="primary" type="submit" >Filter</Button>
                                                <div className="actions-wrap">
                                                    <Button onClick={this.exportData} className="action-icon" variant="outline-secondary" type="button">
                                                        <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg==" width="16" height="16" />
                                                    </Button>
                                                </div>
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
                                                    <th>FullName</th>
                                                    <th>User Name</th>
                                                    <th>Title</th>
                                                    <th>Email</th>
                                                    <th>Role</th>
                                                    <th>Branch</th>
                                                    <th>Last updated</th>
                                                    <th>State</th>
                                                    <th>Created by</th>
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
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </TableComponent>
                                            {allUSerPermissions.indexOf("bnk_create_user") >-1 &&
                                                <div className="footer-with-cta toleft">
                                                    <NavLink to={'/administration/access/new-user'} className="btn btn-primary">Create New User</NavLink>
                                                </div>
                                            }
                                        </div>
                                    
                                )
                            }
                        }
                        else{
                            return null;
                        }

                case (administrationConstants.GET_USERS_FAILURE):
                    return (
                        <div className="loading-content errormsg"> 
                            <div>{adminGetUsersRequest.request_data.error}</div>
                        </div>
                    )
                default :
                return null;
            }
    }

    handleClosePINStatus = () => {
            this.setState({showPINStatus:false})
            this.props.dispatch(authActions.ResetPIN("CLEAR"))
    };
    
    handleshowPINStatus = () => this.setState({showPINStatus:true});

    handleCloseResetPasswordStatus = () => {
        this.setState({showResetPasswordStatus:false})
        this.props.dispatch(authActions.ResetPassword("CLEAR"))
    };

    handleshowResetPasswordStatus = () => this.setState({showResetPasswordStatus:true});

    

    handleCloseActivationStatus = () => {
        this.setState({showActivationStatus:false})
        this.props.dispatch(authActions.activateDeactivateUser(null, "CLEAR"))
            
    };

    handleshowActivationtatus = () => this.setState({showActivationStatus:true});

    PINResetStatus = () =>{
        let {showPINStatus, userToResetPInFor} = this.state;
        let ResetPinRequest = this.props.ResetPinReducer;
            
        
        return(
            <Modal show={showPINStatus} onHide={()=>{}}  size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={true}>
                <Modal.Header>
                    <Modal.Title>PIN Reset</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    {ResetPinRequest.request_status === authConstants.RESET_PIN_FAILURE && 
                        <div className="text-center errortxt">
                            {ResetPinRequest.request_data.error}
                        </div>
                    }
                    {ResetPinRequest.request_status === authConstants.RESET_PIN_PENDING && 
                        <div className="text-center ">
                            Resetting PIN for {userToResetPInFor}
                        </div>
                    }
                    {ResetPinRequest.request_status === authConstants.RESET_PIN_SUCCESS && 
                       <div className="text-center">
                           {ResetPinRequest.request_data.response.data.message}
                             {/* PIN Reset was successful for {userToResetPInFor} */}
                        </div>
                    }
                </Modal.Body>
                {(ResetPinRequest.request_status === authConstants.RESET_PIN_SUCCESS 
                    || ResetPinRequest.request_status === authConstants.RESET_PIN_FAILURE ) && 
                <Modal.Footer>

                    
                    <Button 
                        variant="success"
                        type="button"
                        onClick={this.handleClosePINStatus}
                    >
                        Okay
                        
                        
                    </Button>

                </Modal.Footer>
                }
            </Modal>
        )
    }

    PasswordesetStatus = () =>{
        let {showResetPasswordStatus, userToResetPasswordFor} = this.state;
        let ResetPasswordRequest = this.props.ResetPasswordReducer;
            
        
        return(
            <Modal show={showResetPasswordStatus} onHide={()=>{}}  size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={true}>
                <Modal.Header>
                    <Modal.Title>Password Reset</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    {ResetPasswordRequest.request_status === authConstants.RESET_PASSWORD_FAILURE && 
                        <div className="text-center errortxt">
                            {ResetPasswordRequest.request_data.error}
                        </div>
                    }
                    {ResetPasswordRequest.request_status === authConstants.RESET_PASSWORD_PENDING && 
                        <div className="text-center ">
                            Resetting Password for {userToResetPasswordFor}
                        </div>
                    }
                    {ResetPasswordRequest.request_status === authConstants.RESET_PASSWORD_SUCCESS && 
                       <div className="text-center">
                           {ResetPasswordRequest.request_data.response.data.message}
                             {/* PIN Reset was successful for {userToResetPasswordFor} */}
                        </div>
                    }
                </Modal.Body>
                {(ResetPasswordRequest.request_status === authConstants.RESET_PASSWORD_SUCCESS 
                    || ResetPasswordRequest.request_status === authConstants.RESET_PASSWORD_FAILURE ) && 
                <Modal.Footer>

                    
                    <Button 
                        variant="success"
                        type="button"
                        onClick={this.handleCloseResetPasswordStatus}
                    >
                        Okay
                        
                        
                    </Button>

                </Modal.Footer>
                }
            </Modal>
        )
    }

    ActivationActionStatus = () =>{
        let {showActivationStatus, userDetailsForAction, activationAction} = this.state;
        let ActivateDeactivateUserRequest = this.props.ActivateDeactivateUserReducer;
            
        
        return(
            <Modal show={showActivationStatus} onHide={()=>{}}  size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={true}>
                <Modal.Header>
                    {
                        activationAction ==="activate" &&
                        <Modal.Title>Activate User</Modal.Title>
                    }

                    {
                        activationAction ==="deactivate" &&
                        <Modal.Title>Deactivate User</Modal.Title>
                    }
                   
                </Modal.Header>
                <Modal.Body>
                    
                    {ActivateDeactivateUserRequest.request_status === authConstants.ACTIVATE_DEACTIVATE_USER_FAILURE && 
                        <div className="text-center errortxt">
                            {ActivateDeactivateUserRequest.request_data.error}
                        </div>
                    }
                    {ActivateDeactivateUserRequest.request_status === authConstants.ACTIVATE_DEACTIVATE_USER_PENDING && 
                        <div className="text-center ">
                            {
                                activationAction ==="activate" &&
                                <div>Activating {userDetailsForAction}</div>
                            }

                            {
                                activationAction ==="deactivate" &&
                                <div>De-Activating {userDetailsForAction}</div>
                            }
                            
                        </div>
                    }
                    {ActivateDeactivateUserRequest.request_status === authConstants.ACTIVATE_DEACTIVATE_USER_SUCCESS && 
                       <div className="text-center">
                           {ActivateDeactivateUserRequest.request_data.response.data.message}
                             
                        </div>
                    }
                </Modal.Body>
                {(ActivateDeactivateUserRequest.request_status === authConstants.ACTIVATE_DEACTIVATE_USER_SUCCESS 
                    || ActivateDeactivateUserRequest.request_status === authConstants.ACTIVATE_DEACTIVATE_USER_FAILURE ) && 
                <Modal.Footer>

                    
                    <Button 
                        variant="success"
                        type="button"
                        onClick={this.handleCloseActivationStatus}
                    >
                        Okay
                        
                        
                    </Button>

                </Modal.Footer>
                }
            </Modal>
        )
    }


    render() {
        let {showPINStatus, showActivationStatus, showResetPasswordStatus} = this.state;
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
                                                <h2>Administration</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    
                                    <AdminNav />
                                    <AccessNav />
                                    {/* <div className="lowerlevel-menu">
                                        <ul className="nav">
                                            <li>
                                                <NavLink exact to={'/administration/access'}>Roles</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/access/users'}>Users</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/access/preferences'}>Preferences</NavLink>
                                            </li>
                                            
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {this.renderAllUsers()}
                                                {showPINStatus && this.PINResetStatus()}
                                                {showResetPasswordStatus && this.PasswordesetStatus()}
                                                {showActivationStatus && this.ActivationActionStatus()}
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
        adminGetUsers : state.administrationReducers.adminGetUsersReducer,
        ResetPinReducer : state.authReducers.ResetPinReducer,
        ResetPasswordReducer : state.authReducers.ResetPasswordReducer,
        ActivateDeactivateUserReducer : state.authReducers.ActivateDeactivateUserReducer,
    };
}

export default connect(mapStateToProps) (AccessUsers);