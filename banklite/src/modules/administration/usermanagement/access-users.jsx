import * as React from 'react';
// import {Router} from "react-router";

import { Fragment } from 'react';
import AdminNav from '../_menu';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import InnerPageContainer from '../../../shared/templates/authed-pagecontainer';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import TableComponent from '../../../shared/elements/table';
import TablePagination from '../../../shared/elements/table/pagination';
import { administrationActions } from '../../../redux/actions/administration/administration.action';
import { administrationConstants } from '../../../redux/actiontypes/administration/administration.constants';
import Modal from 'react-bootstrap/Modal';
import AccessNav from '../menus/_access-menu';
import { authActions } from '../../../redux/actions/auth/auth.action';
import { authConstants } from '../../../redux/actiontypes/auth/auth.constants';

// import Alert from 'react-bootstrap/Alert'
// import  SidebarElement from '../../shared/elements/sidebar'
import '../administration.scss';
import DatePickerFieldType from '../../../_helpers/DatePickerFieldType';
import ActivateUserModal from './activate-user-modal';
 import PinResetModal from './pin-reset-modal';
import { PasswordResetModal } from './password-reset-modal';
class AccessUsers extends React.Component {
  constructor(props) {
    super(props);
    this.initializeState();
    this.userPermissions = JSON.parse(localStorage.getItem('x-u-perm'));
  }

  //////

  initializeState=()=>{
    this.state =  {
      user: '',
      PageSize: 25,
      CurrentPage: 1,
      CurrentSelectedPage: 1,
      refresh: false,
      showPINStatus: false,
      showResetPasswordStatus: false,
      showActivationStatus: false,
      ShowDeactivated: false,
      endDate: '',
      startDate: '',
      SearchText: '',
      // ShowDeactivated:false
    };
    return this.state;
  }

  componentDidMount(){
    this.retrieveFromApi();
}


componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.clientState !== prevProps.clientState) {
    this.setState(this.initializeState(), function() {
      this.retrieveFromApi();
    });
  }
}

setPagesize = (event, tempData)=>{
   
    this.setState({PageSize: event.target.value}, function() {
      this.retrieveFromApi(tempData);
    });
    
  
  }


  
loadNextPage = (nextPage, tempData)=>{
  //next Page and tempData are properties of the TablePagination
  const {dispatch} = this.props;
  this.setState({CurrentPage: nextPage}, function() {
    this.retrieveFromApi(tempData);
  });
 
}



setShowDetails = (event,tempData)=>{
  const {dispatch} = this.props;
  let showDetails = event.target.checked;
  this.setState({FullDetails: showDetails}, function() {
    this.retrieveFromApi(tempData);
  });
     

}

retrieveFromApi = (tempData)=>{
  this.props.dispatch(authActions.activateDeactivateUser(null, "CLEAR"))
    const {dispatch} = this.props;        
  //  let  {PageSize,FullDetails, CurrentPage, CurrentSelectedPage} = this.state;

    let {
      PageSize,
      CurrentPage,
      startDate,
      endDate,
      SearchText,
      ShowDeactivated
    } = this.state;
    
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}&ShowDeactivated=${ShowDeactivated}`;

      if (tempData) {
        dispatch(administrationActions.getUsers(params, tempData));
      } else {
        dispatch(administrationActions.getUsers(params));
      }
    
}

  submitPasswordResest = async () => {
  //  this.handleshowResetPasswordStatus();

  const { modalAccountEncodedKey } = this.state;
    const { dispatch } = this.props;

    await dispatch(authActions.ResetPassword({ encodedKey: modalAccountEncodedKey }));
  };

  
  submitResetPinRequest = async () => {
  
    
    const { dispatch } = this.props;
    const { modalAccountEncodedKey } = this.state;

    await dispatch(authActions.ResetPIN({ encodedKey: modalAccountEncodedKey }));
  };


  
  submitActivationRequest = async () => {
   
    const { modalAccountEncodedKey,activationAction } = this.state;
    
    const { dispatch } = this.props;
    await dispatch(
      authActions.activateDeactivateUser(activationAction, { encodedKey: modalAccountEncodedKey })
    );
  };



  handleDateChangeRaw = (e) => {
    e.preventDefault();
  };
  handleStartDatePicker = (startDate) => {
    startDate.setHours(startDate.getHours() + 1);

    this.setState({ startDate }, () => {
      if (this.state.endDate !== '') {
        //this.getHistory();
      }
    });
  };

  handleEndDatePicker = (endDate) => {
    endDate.setHours(endDate.getHours() + 1);

    this.setState({ endDate }, () => {
      if (this.state.startDate !== '') {
        //this.getHistory();
      }
    });
  };

  

  showAllDeactivatedUsers = (ShowDeactivated, allUsersData) => {
    // let {ShowDeactivated} =  this.state;
    this.setState({ ShowDeactivated: ShowDeactivated.target.checked }, () => {
   this.retrieveFromApi();
  
    });
  };

  
  

  searchAllData = (e, tempData) => {
    e.preventDefault();
    const { dispatch } = this.props;
    let {
      PageSize,
      CurrentPage,
      SearchText,
      endDate,
      startDate,
      ShowDeactivated,
    } = this.state;

    // this.setState({PageSize: sizeOfPage});

    // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
    // this.getTransactionChannels(params);
    if (SearchText !== '' || endDate !== '' || startDate !== '') {
      if (endDate !== '') {
        endDate = endDate.toISOString();
      }
      if (startDate !== '') {
        startDate = startDate.toISOString();
      }

      this.setState({ startDate: startDate,endDate:endDate,SearchText:SearchText }, () => {
        this.retrieveFromApi();
       
         });
    }
  };







  
  fetchForEmptyState=()=>{
    //This function returns the biew for empty list                                                                                                                                   
    let adminGetUsersRequest = this.props.adminGetUsers;
    switch (adminGetUsersRequest.request_status){
        case (administrationConstants.GET_USERS_PENDING):
            
    return (<tbody>
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
    </tbody>);
    default: return null;
    }
}

fetchErrorState(){
  let adminGetUsersRequest = this.props.adminGetUsers;
  //  let saveRequestData= getClientsRequest.request_data!==undefined? getClientsRequest.request_data.tempData: null;

    switch(adminGetUsersRequest.request_status){
        case (administrationConstants.GET_USERS_FAILURE):
            return (
                <div className="loading-content errormsg"> 
                    <div>{adminGetUsersRequest.request_data.error}</div>
                </div>
            );
            default: return null;

    };
    
}


fetchForBusyState(){
  let adminGetUsersRequest = this.props.adminGetUsers;
  switch (adminGetUsersRequest.request_status){
      case (administrationConstants.GET_USERS_PENDING):

          return (  <div className="loading-content">
               <div className="loading-text">Please wait...</div></div>);
  default: return null;
  }
}






fetchForDataState=()=> {
  let adminGetUsersRequest = this.props.adminGetUsers;


 let allUSerPermissions = [];

 if(this.userPermissions!=null){
  this.userPermissions.map((eachPermission) => {
    allUSerPermissions.push(eachPermission.permissionCode);
  });
 
 }

  switch(adminGetUsersRequest.request_status){
  case(administrationConstants.GET_USERS_SUCCESS):
 
 
//  let allClientsData = getClientsRequest?.request_data?.response?.data;
//  let allClientsData= getClientsRequest.request_data!==undefined?getClientsRequest.request_data.tempData:null;

 let allUsersData= adminGetUsersRequest?.request_data?.response?.data;

      return (<tbody>
        {allUsersData?.result?.map((eachUser, index) => {
          return (
            <Fragment key={index}>
              <tr>
                <td>
                  <NavLink to={`/user/${eachUser.encodedKey}`}>
                    {' '}
                    {eachUser.name}
                  </NavLink>
                </td>
                <td>
                  <NavLink to={`/user/${eachUser.encodedKey}`}>
                    {eachUser.userName}
                  </NavLink>
                </td>
                <td>{eachUser.title}</td>
                <td>{eachUser.emailAddress}</td>
                <td>{eachUser.role}</td>
                <td>{eachUser.branch}</td>
                <td>{eachUser.lastUpdated}</td>
                <td>{eachUser.objectStateDescription}</td>
                {eachUser.createdByUserEncodedKey !== '' &&
                  eachUser.createdByUserEncodedKey !== null && (
                    <td>
                      <NavLink
                        to={`/user/${eachUser.createdByUserEncodedKey}`}
                      >
                        {eachUser.createdBy !== '' &&
                        eachUser.createdBy !== null
                          ? eachUser.createdBy
                          : '-'}
                      </NavLink>
                    </td>
                  )}
                {(eachUser.createdByUserEncodedKey === '' ||
                  eachUser.createdByUserEncodedKey === null) && (
                  <td>
                    {eachUser.createdBy !== '' &&
                    eachUser.createdBy !== null
                      ? eachUser.createdBy
                      : '-'}
                  </td>
                )}

                {eachUser.encodedKey !== null &&
                  allUSerPermissions.indexOf('bnk_edit_user') >
                    -1 && (
                    <td>
                      <DropdownButton
                        size='sm'
                        title='Actions'
                        key='editUser'
                        className='customone'
                      >
                        <NavLink
                          className='dropdown-item'
                          to={`/administration/access/edit-user/${eachUser.encodedKey}`}
                        >
                          Edit
                        </NavLink>


                        <Dropdown.Item
                          eventKey='1'
                          onClick={() =>{
                          //  console.log('state changes');

                            // this.resetUserPIN(   { encodedKey: eachUser.encodedKey },
                            //   eachUser.name);

                            this.setState({showPINStatus:true,selectedUser:  eachUser.name,  modalAccountEncodedKey: eachUser.encodedKey });
                            
                          }
                          }
                        >
                          Reset PIN
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey='1'
                          onClick={() =>
                     
                          //Set state and update both encoded key and 
                          this.setState({showResetPasswordStatus:true,selectedUser:  eachUser.name,  modalAccountEncodedKey: eachUser.encodedKey })

                          
                          }
                        >
                          Reset Password
                        </Dropdown.Item>


                        {eachUser.objectState !== 1 && (
                          <Dropdown.Item
                            eventKey='1'
                            onClick={() =>{
                              // this.activateDeactivateUser(
                              //   { encodedKey: eachUser.encodedKey },
                              //   eachUser.name,
                              //   'activate'
                              // )
                                this.props.dispatch(authActions.activateDeactivateUser(null, "CLEAR"))
                            
                                this.setState({showActivationStatus:true, activationAction:'activate',selectedUser:  eachUser.name, modalAccountEncodedKey: eachUser.encodedKey })
                              }
                            }
                          >
                            Activate User
                          </Dropdown.Item>
                        )}
                        {eachUser.objectState === 1 && (
                          <Dropdown.Item
                            eventKey='1'
                            onClick={() =>{
                                this.setState({showActivationStatus:true, activationAction:'deactivate',selectedUser:  eachUser.name,  modalAccountEncodedKey: eachUser.encodedKey })
                                this.props.dispatch(authActions.activateDeactivateUser(null, "CLEAR"))
                              }
                              // this.activateDeactivateUser(
                              //   { encodedKey: eachUser.encodedKey },
                              //   eachUser.name,
                              //   'deactivate'
                              // )
                            }
                          >
                            De-Activate User
                          </Dropdown.Item>
                        )}
                        {/* <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
                                                                            <Dropdown.Item eventKey="1">Edit</Dropdown.Item> */}
                      </DropdownButton>
                    </td>
                  )}
              </tr>
            </Fragment>
          );
        })}
      </tbody>);

  default: return null;
}
}






fetchPageList() {
  let adminGetUsersRequest = this.props.adminGetUsers;

  let {
   
    ShowDeactivated,
  } = this.state;
  let allUSerPermissions = [];
  if(this.userPermissions!==null){
    this.userPermissions.map((eachPermission) => {
      allUSerPermissions.push(eachPermission.permissionCode);
    });
  }
 


  let allUsersData = adminGetUsersRequest.request_data?.response?.data;

  return(
    <div>
                <div className='heading-with-cta'>
                  <div>
                    <div className='eachitem ml-20'>
                      <input
                        checked={ShowDeactivated}
                        onChange={(e) =>
                          this.showAllDeactivatedUsers(e, allUsersData.result)
                        }
                        type='checkbox'
                        name=''
                        id='showdeactivated'
                      />
                      <label htmlFor='showdeactivated'>
                        Show De-activated Users
                      </label>
                    </div>
                  </div>
                  
                </div>

                <div className='heading-with-cta'>
                  <Form
                    className='one-liner'
                    onSubmit={(e) => this.searchAllData(e, allUsersData.result)}
                  >
                    <Form.Group
                      controlId='filterDropdown'
                      className='no-margins pr-10'
                    >
                      <Form.Control as='select' size='sm'>
                        <option>No Filter</option>
                        <option>Add New Filter</option>
                        <option>Custom Filter</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className='table-filters'>
                      <DatePicker
                        autoComplete='new-off'
                        onChangeRaw={this.handleDateChangeRaw}
                        onChange={this.handleStartDatePicker}
                        selected={this.state.startDate}
                        dateFormat={window.dateformat}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode='select'
                        placeholderText='Start date'
                        autoComplete='new-password'
                        maxDate={new Date()}
                        // className="form-control form-control-sm h-38px"
                        className='form-control form-control-sm '
                        customInput={
                          <DatePickerFieldType placeHolder='Start date' />
                        }
                      />
                      <DatePicker
                        autoComplete='new-off'
                        placeholderText='End  date'
                        onChangeRaw={this.handleDateChangeRaw}
                        onChange={this.handleEndDatePicker}
                        selected={this.state.endDate}
                        dateFormat={window.dateformat}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode='select'
                        maxDate={new Date()}
                        // className="form-control form-control-sm h-38px"
                        className='form-control form-control-sm'
                        customInput={
                          <DatePickerFieldType placeHolder='End date' />
                        }
                      />
                      <input
                        type='text'
                        className='form-control-sm search-table form-control'
                        placeholder='Search text'
                        value={this.state.SearchText}
                        onChange={(e) => {
                          this.setState({ SearchText: e.target.value.trim() });
                        }}
                      />
                    </Form.Group>
                    <Button
                      className='no-margins'
                      variant='primary'
                      type='submit'
                    >
                      Filter
                    </Button>

                    
                  {allUSerPermissions.indexOf('bnk_create_user') > -1 && (
                  
                      <NavLink
                        to={'/administration/access/new-user'}
                        className='btn btn-primary'
                      >
                        Create New User
                      </NavLink>
            
                  )}
                    {/* <div className="actions-wrap">
                                                    <Button onClick={this.exportClients} className="action-icon" variant="outline-secondary" type="button">
                                                        <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg==" width="16" height="16" />
                                                    </Button>
                                                </div> */}
                  </Form>

                  <div className='pagination-wrap'>
                    <label htmlFor='toshow'>Show</label>
                    <select
                      id='toshow'
                      onChange={(e) => this.setPagesize(e, allUsersData)}
                      value={this.state.PageSize}
                      className='countdropdown form-control form-control-sm'
                    >
                      <option value='10'>10</option>
                      <option value='25'>25</option>
                      <option value='50'>50</option>
                      <option value='200'>200</option>
                    </select>
                

<TablePagination
                            totalPages={allUsersData?.totalPages??0}
                            currPage={allUsersData?.currentPage??0}
                            currRecordsCount={allUsersData?.result.length??0}
                            totalRows={allUsersData?.totalRows??0}
                            tempData={allUsersData?.result??0}
                            pagesCountToshow={4}
                            refreshFunc={this.loadNextPage}
                        />
                  </div>
                </div>
                <TableComponent classnames='striped bordered hover'>
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
                      {allUSerPermissions.indexOf('bnk_edit_user') > -1 && (
                        <th></th>
                      )}
                    </tr>
                  </thead>
     

        {this.fetchForEmptyState()}  
        {this.fetchErrorState()}
        {this.fetchForDataState()}
       

          
      </TableComponent>
      {this.fetchForBusyState()}
      
      {/* <div className="footer-with-cta toleft">
          <NavLink to={'/administration/organization/newbranch'} className="btn btn-primary">New Branch</NavLink>
      </div> */}
  </div>
);
  }



  // handleClosePINStatus = () => {
  //   this.setState({ showPINStatus: false });
  //   this.props.dispatch(authActions.ResetPIN('CLEAR'));
  // };

  // handleshowPINStatus = () => this.setState({ showPINStatus: true });


  
  togglePINModal = () => {
    this.setState({ showPINStatus: !this.state.showPINStatus });
  };

  toggleShowPasswordModal = () => {
    this.setState({ showResetPasswordStatus: !this.state.showResetPasswordStatus });
  };


  toggleShowActivationModal = () => {
    this.setState({ showActivationStatus: !this.state.showActivationStatus });
  };

  render() {
    let {
      showPINStatus,
      showActivationStatus,
      showResetPasswordStatus,
      activationAction,
      selectedUser
    } = this.state;
    return (
      <Fragment>
        <InnerPageContainer {...this.props}>
          <div className='content-wrapper'>
            <div className='module-heading'>
              <div className='module-title'>
                <div className='content-container'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className=''>
                        <h2>Administration</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='module-submenu'>
                <div className='content-container'>
                  <AdminNav />
                  <AccessNav />
                
                </div>
              </div>
              <div className='module-content'>
                <div className='content-container'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='middle-content'>
                        {this.fetchPageList()}
                        {/* <activateUserModal showModal={showActivationStatus} /> */}
                        <PinResetModal open={showPINStatus} selectedUser={selectedUser} toggleHandler={this.togglePINModal} proceedHandler={this.submitResetPinRequest} requestProcessor={this.props.ResetPinReducer} />
                        <PasswordResetModal open={showResetPasswordStatus}  selectedUser={selectedUser} toggleHandler={this.toggleShowPasswordModal} proceedHandler={this.submitPasswordResest} requestProcessor={this.props.ResetPasswordReducer} />
                       
                        <ActivateUserModal open={showActivationStatus} selectedUser={selectedUser} activationAction={activationAction}  toggleHandler={this.toggleShowActivationModal} proceedHandler={this.submitActivationRequest} requestProcessor={this.props.ActivateDeactivateUserReducer} />
                       
                        {/* {showActivationStatus && this.ActivationActionStatus()} */}
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
    adminGetUsers: state.administrationReducers.adminGetUsersReducer,
    ResetPinReducer: state.authReducers.ResetPinReducer,
    ResetPasswordReducer: state.authReducers.ResetPasswordReducer,
    ActivateDeactivateUserReducer:
      state.authReducers.ActivateDeactivateUserReducer,
  };
}

export default connect(mapStateToProps)(AccessUsers);