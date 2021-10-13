import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import InnerPageContainer from '../../shared/templates/authed-pagecontainer';
import TableComponent from '../../shared/elements/table';
import TablePagination from '../../shared/elements/table/pagination';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { clientsActions,clientsConstants } from '../../redux/actions/clients/clients.action';

import { ClientStateConstants } from '../../redux/actions/clients/client-states-constants';
// import { clientsConstants } from '../../redux/actiontypes/clients/clients.constants';
import './clients.scss';
import DatePickerFieldType from '../../_helpers/DatePickerFieldType';
import { CLIENTS_MODULE_MENU_LINKS, GROUP_MODULE_MENU_LINKS } from '../../shared/config';
import SubMenu from '../../shared/components/SubMenu';

class GroupListDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.initializeState();
    this.userPermissions = JSON.parse(localStorage.getItem('x-u-perm'));

    this.clientType = "customer";
  }

  initializeState=()=>{
    this.state = {
      user: '',
      PageSize: '10',
      FullDetails: false,
      CurrentPage: 1,
      BranchId: JSON.parse(localStorage.getItem('lingoAuth')).BranchId,
      ClientState: this.props.clientState, 
      endDate: '',
      startDate: '',
      SearchText: '',
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

    const {dispatch} = this.props;        
  //  let  {PageSize,FullDetails, CurrentPage, CurrentSelectedPage} = this.state;

    let {
      PageSize,
      CurrentPage,
      BranchId,
      FullDetails,
    } = this.state;
    
    let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&BranchId=${BranchId}&ClientState=${this.props.clientState}`;

    //let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;
    
    if(tempData){
        dispatch(clientsActions.getClientGroups(params, tempData));
    }else{
        dispatch(clientsActions.getClientGroups(params, null));
    }
    
}


exportClients = () => {
  let {
    PageSize,
    CurrentPage,
    FullDetails,
    BranchId,
    ClientState,
    SearchText,
    endDate,
    startDate,
  } = this.state;

  if (endDate !== '') {
    endDate = endDate.toISOString();
  }
  if (startDate !== '') {
    startDate = startDate.toISOString();
  }
  let paramters = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&BranchId=${BranchId}&ClientState=${this.props.clientState}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;

  const { dispatch } = this.props;

  dispatch(clientsActions.exportClients(paramters));
};



  


  //Move the following to a central utility class
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


   getHeaderDescription=()=> {
     
    //this.retrieveFromApi();
    switch(this.props.clientState){
      case (ClientStateConstants.PENDING_APPROVAL): return  (<div>Customers (Pending Approval)</div>);
      case (ClientStateConstants.ACTIVE): return  (<div>Customers (Active)</div>);
      case (ClientStateConstants.INACTIVE): return  (<div>Customers (In-Active)</div>);
      case (ClientStateConstants.ALL_CLIENTS): 
      
          return  (<div>Groups (All)</div>);
        
      case (ClientStateConstants.EXITED): return  (<div>Customers (Exited)</div>);
      case (ClientStateConstants.BLACKLISTED): return  (<div>Customers (Blacklisted)</div>);
                 
        default:            
         
         
            return  (<div>Groups (All)</div>);
          
    }

  }


  fetchForEmptyState=()=>{
    //This function returns the biew for empty list                                                                                                                                   
    let getClientsRequest = this.props.getClientsReducer;
    let saveRequestData= getClientsRequest.request_data!==undefined? getClientsRequest.request_data.tempData: null;
    switch (getClientsRequest.request_status){
        case (clientsConstants.GET_CLIENTS_PENDING):
            
    return (<tbody>
      <tr>
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
    let getClientsRequest = this.props.getClientsReducer;
  //  let saveRequestData= getClientsRequest.request_data!==undefined? getClientsRequest.request_data.tempData: null;

    switch(getClientsRequest.request_status){
        case ( clientsConstants.GET_CLIENTS_FAILURE):
            return (
                <div className="loading-content errormsg"> 
                    <div>{getClientsRequest.request_data.error}</div>
                </div>
            );
            default: return null;

    };
    
}


fetchForBusyState(){
  let getClientsRequest = this.props.getClientsReducer;
  switch (getClientsRequest.request_status){
      case (clientsConstants.GET_CLIENTS_PENDING):

          return (  <div className="loading-content">
               <div className="loading-text">Please wait...</div></div>);
  default: return null;
  }
}

    fetchForDataState=()=> {
    let getClientsRequest = this.props.getClientsReducer;
   let allUSerPermissions = [];
   this.userPermissions.map((eachPermission) => {
     allUSerPermissions.push(eachPermission.permissionCode);
   });

    switch(getClientsRequest.request_status){
    case(clientsConstants.GET_CLIENTS_SUCCESS):
   
   
  //  let allClientsData = getClientsRequest?.request_data?.response?.data;
  //  let allClientsData= getClientsRequest.request_data!==undefined?getClientsRequest.request_data.tempData:null;

   let allClientsData= getClientsRequest.request_data!==undefined?getClientsRequest?.request_data?.response?.data:null;

        return (<tbody>{ allClientsData.result.map((eachClient, index) => {
          return (
            <Fragment key={index}>
              <tr>
                {!eachClient.groupName &&
                  <td>
                    <NavLink
                      to={`/customer/${eachClient.clientEncodedKey}`}
                    >
                      {eachClient.firstName} {eachClient.lastName}
                    </NavLink>
                  </td>
                }
                {eachClient.groupName &&
                  <td>
                    <NavLink
                      to={`/customer/${eachClient.clientEncodedKey}`}
                    >
                      {eachClient.groupName}
                    </NavLink>
                  </td>
                }
                <td>
                  <NavLink
                    to={`/customer/${eachClient.clientEncodedKey}`}
                  >
                    {eachClient.clientCode}
                  </NavLink>
                </td>
                <td>{eachClient?.clientStateDescription}</td>
                <td>{eachClient?.accountOfficer}</td>
                <td>{eachClient?.clientBranch}</td>
                <td>{eachClient?.clientType}</td>
                <td>{eachClient?.lastUpdated}</td>
                {allUSerPermissions.indexOf('bnk_edit_client') >
                  -1 && (
                  <td>
                    <DropdownButton
                      size='sm'
                      title='Actions'
                      key='activeCurrency'
                      className='customone'
                    >
                      <NavLink
                        className='dropdown-item'
                        to={`/group/edit/${eachClient.clientEncodedKey}`}
                      >
                        Edit
                      </NavLink>
                      <NavLink
                        className='dropdown-item'
                        to={`/customer/${eachClient.clientEncodedKey}`}
                      >
                        View
                      </NavLink>
                    </DropdownButton>
                  </td>
                )}
              </tr>
            </Fragment>
          );
        })}</tbody>);
  
    default: return null;
}
    }

  searchTxtn = (e, tempData) => {
    e.preventDefault();
    const { dispatch } = this.props;
    let {
      PageSize,
      CurrentPage,
      FullDetails,
      BranchId,
      ClientState,
      SearchText,
      endDate,
      startDate,
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
      let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&BranchId=${BranchId}&ClientState=${ClientState}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;

      if (tempData) {
        dispatch(clientsActions.getClientGroups(params, tempData));
      } else {
        dispatch(clientsActions.getClientGroups(params));
      }
    }
  };



  fetchPageList() {
    let getClientsRequest = this.props.getClientsReducer;

    let allUSerPermissions = [];
    this.userPermissions.map((eachPermission) => {
      allUSerPermissions.push(eachPermission.permissionCode);
    });


   // let allClientsData = getClientsRequest?.request_data?.response?.data;
    let allClientsData = getClientsRequest.request_data?.response?.data;

    return(
      <div>
      <div className='table-helper'>
        <input
          type='checkbox'
          name=''
          onChange={(e) =>
            this.setShowDetails(e, allClientsData.result)
          }
          checked={this.state.FullDetails}
          id='showFullDetails'
        />
        <label htmlFor='showFullDetails'>Show full details</label>
      </div>
      <div className='heading-with-cta '>
        <Form
          className='one-liner'
          onSubmit={(e) => this.searchTxtn(e, allClientsData.result)}
        >
          <Form.Group
            controlId='filterDropdown'
            className='no-margins pr-10'
          >
            <Form.Control
              as='select'
              size='sm'
              className='tableFilterInput'
            >
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
                this.setState({
                  SearchText: e.target.value.trim(),
                });
              }}
            />
            {/* {errors.startDate && touched.startDate ? (
<span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
          </Form.Group>

          <Button
            className='no-margins'
            variant='primary'
            type='submit'
          >
            Filter
          </Button>
          <div className='actions-wrap'>
            <Button
              onClick={this.exportClients}
              className='action-icon'
              variant='outline-secondary'
              type='button'
            >
              <img
                alt='download excel'
                src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg=='
                width='16'
                height='16'
              />
            </Button>
          </div>
        </Form>
        <div className='pagination-wrap'>
          <label htmlFor='toshow'>Show</label>
          <select
            id='toshow'
            onChange={(e) =>
              this.setPagesize(e, allClientsData.result)
            }
            value={this.state.PageSize}
            className='countdropdown form-control form-control-sm'
          >
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='50'>50</option>
            <option value='200'>200</option>
          </select>
        
<TablePagination
                            totalPages={allClientsData?.totalPages??0}
                            currPage={allClientsData?.currentPage??0}
                            currRecordsCount={allClientsData?.result.length??0}
                            totalRows={allClientsData?.totalRows??0}
                            tempData={allClientsData?.result??0}
                            pagesCountToshow={4}
                            refreshFunc={this.loadNextPage}
                        />
        </div>
      </div>
      <TableComponent classnames='striped bordered hover'>
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Group ID</th>
            <th>Group Status</th>
            <th>Account Officer</th>
            <th>Branch</th>
            <th>Group Type</th>
            <th>Date Created</th>
            {allUSerPermissions.indexOf('bnk_edit_client') > -1 && (
              <th>Actions</th>
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

  render() {
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
                        <h2>{this.getHeaderDescription()}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
             <SubMenu  links={GROUP_MODULE_MENU_LINKS} key={this.props.clientState}/> 
              
              <div className='module-content'>
                <div className='content-container'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='middle-content'>
                        {/* <div className='heading-with-cta'>
                        </div> */}
                        {this.fetchPageList()}
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
    getClientsReducer: state.clientsReducers.getClientsReducer,
    exportClientsReducer: state.clientsReducers.exportClientsReducer,
  };
}

export default connect(mapStateToProps)(GroupListDisplay);
