import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import InnerPageContainer from '../../shared/templates/authed-pagecontainer';
import TableComponent from '../../shared/elements/table';
import TablePagination from '../../shared/elements/table/pagination';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { numberWithCommas } from '../../shared/utils';

import { loanActions } from '../../redux/actions/loans/loans.action';
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants';

import './loanmanagement.scss';
import DatePickerFieldType from '../../_helpers/DatePickerFieldType';
import { LOAN_MODULE_MENU_LINKS } from '../../shared/config';
import SubMenu from '../../shared/components/SubMenu';
import { LoanStateConstants } from '../../redux/actions/clients/client-states-constants';


class LoanListDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      PageSize: 25,
      LoanState:this.props.loanState,
      FullDetails: false,
      CurrentPage: 1,
      CurrentSelectedPage: 1,
      endDate: '',
      startDate: '',
      SearchText: '',
    };

    this.userPermissions = JSON.parse(localStorage.getItem('x-u-perm'));
  }

  

  /////

  componentDidMount(){
    this.retrieveFromApi();
}
componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.loanState !== prevProps.loanState) {
    
    this.setState({LoanState: this.props.loanState});
    this.retrieveFromApi();
  }
}
// componentWillReceiveProps(nextProps) {
//   if (nextProps.location.pathname !== this.props.location.pathname) {
//     console.log("here");
//     this.retrieveFromApi();
//     //take action here
//   }
// }


loadNextPage = (nextPage, tempData)=>{
  //next Page and tempData are properties of the TablePagination
  this.setState({CurrentPage: nextPage});
  this.retrieveFromApi(tempData);
 
}



setShowDetails = (event,tempData)=>{
  const {dispatch} = this.props;
  let showDetails = event.target.checked;
  this.setState({FullDetails: showDetails});
     this.retrieveFromApi(tempData);

}




setPagesize = (event, tempData)=>{
    const {dispatch} = this.props;
   
    this.setState({PageSize: event.target.value});
    this.retrieveFromApi(tempData);
  
}

retrieveFromApi = (tempData)=>{

    const {dispatch} = this.props;        
  //  let  {PageSize,FullDetails, CurrentPage, CurrentSelectedPage} = this.state;

    let {
      PageSize,
      SearchText,
      CurrentPage,
      endDate,
      LoanState,
      startDate,
      FullDetails,
    } = this.state;
    let params = `FullDetails=${FullDetails}&SearchText=${SearchText}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&LoanState=${this.props.loanState}`;
     
    if(tempData){
        dispatch(loanActions.getApprovedLoans(params, tempData));
    }else{
        dispatch(loanActions.getApprovedLoans(params));
    }
    
}


getHeaderDescription=()=> {
     
  //this.retrieveFromApi();
  switch(this.props.loanState){
    case (LoanStateConstants.ALL_LOANS): return  (<div>Loan Accounts (All)</div>);
    case (LoanStateConstants.PENDING_APPROVAL): return  (<div>Loan Accounts (Pending Approval)</div>);
    case (LoanStateConstants.APPROVED): return  (<div>Loan Accounts (Approved)</div>);
    case (LoanStateConstants.REJECTED): return  (<div>Loan Accounts (Rejected)</div>);
   
    case (LoanStateConstants.ACTIVE): return  (<div>Loan Accounts (Active)</div>);
    case (LoanStateConstants.IN_ARREARS): return  (<div>Loan Accounts (Active -In Arrears)</div>);
    case (LoanStateConstants.CLOSED): return  (<div>Loan Accounts (Closed - All Obligations Met)</div>);
    case (LoanStateConstants.CLOSED_WITHDRAWN): return  (<div>Loan Accounts (Closed - Withdrawn)</div>);
    case (LoanStateConstants.CLOSED_WRITTEN_OFF): return  (<div>Loan Accounts (Closed - Wwritten Off)</div>);
default:             return  (<div>Loan Accounts (All)</div>);
  }

}

  /////


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

  searchTxtn = (e, tempData) => {
    e.preventDefault();
    //const { dispatch } = this.props;
    let {
     
      SearchText,
      endDate,
      startDate,
    } = this.state;

  
    if (SearchText !== '' || endDate !== '' || startDate !== '') {
      if (endDate !== '') {
        endDate = endDate.toISOString();
        
      }
      if (startDate !== '') {
        startDate = startDate.toISOString();
        
      }
      this.setState({SearchText:SearchText});
      this.setState({endDate: endDate});
      this.setState({startDate: startDate});
      this.retrieveFromApi();
     
    }
  };

  exportLoansAccounts = () => {
    const { dispatch } = this.props;
    // let { PageSize, CurrentPage } = this.state;

    let {
      PageSize,
      CurrentPage,
      FullDetails,
      BranchId,
      LoanState,
      SearchText,
      endDate,
      startDate,
    } = this.state;

    if (endDate !== '' || startDate !== '') {
      if (endDate !== '') {
        endDate = endDate.toISOString();
      }
      if (startDate !== '') {
        startDate = startDate.toISOString();
      }
      // let params= `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
    }
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}&LoanState=${LoanState}`;
    dispatch(loanActions.exportLoansAccounts(params));
  };





  fetchForEmptyState=()=>{
    //This function returns the biew for empty list                
    let getLoansRequest = this.props.getLoansRequest;

    // let saveRequestData= getLoansRequest.request_data!==undefined? getLoansRequest.request_data.tempData: null;
    switch (getLoansRequest.request_status){
        case (loanAndDepositsConstants.GET__APPROVED_LOANS_PENDING):
            
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
                      <td></td>
                    </tr>
    </tbody>);
    default: return  null;
    }
}





fetchForDataState=()=> {


  let getLoansRequest = this.props.getLoansRequest;


 let allUSerPermissions = [];
 this.userPermissions.map((eachPermission) => {
   allUSerPermissions.push(eachPermission.permissionCode);
 });

  switch(getLoansRequest.request_status){
  case(loanAndDepositsConstants.GET__APPROVED_LOANS_SUCCESS):
 
 let allLoans = getLoansRequest?.request_data?.response?.data;

 if(allLoans.result?.length>=0)
      return (<tbody>{allLoans.result.map((eachLoan, index) => {
                      return (
                        <Fragment key={index}>
                          <tr >
                            {(eachLoan.loanState === 4 ||
                              eachLoan.loanState === 7 ||
                              eachLoan.loanState === 8 ||
                              eachLoan.loanState === 9) && (
                              <td>
                                <NavLink
                                  to={`/customer/${eachLoan.clientKey}/closedaccounts/loan/${eachLoan.encodedKey}`}
                                >
                                  {' '}
                                  {eachLoan.accountNumber}
                                </NavLink>
                              </td>
                            )}
                            {eachLoan.loanState !== 4 &&
                              eachLoan.loanState !== 7 &&
                              eachLoan.loanState !== 8 &&
                              eachLoan.loanState !== 9 && (
                                <td>
                                  <NavLink
                                    to={`/customer/${eachLoan.clientKey}/loanaccount/${eachLoan.encodedKey}`}
                                  >
                                    {' '}
                                    {eachLoan.accountNumber}
                                  </NavLink>
                                </td>
                              )}
                            <td>
                              <NavLink to={`/customer/${eachLoan.clientKey}`}>
                                {eachLoan.clientName}
                              </NavLink>{' '}
                            </td>
                            <td>{eachLoan.productName}</td>
                            <td>{eachLoan.dateCreated}</td>
                            <td>
                              {numberWithCommas(
                                eachLoan.loanAmount,
                                true,
                                true
                              )}
                            </td>
                            <td>{eachLoan.currencyCode}</td>
                            <td>{eachLoan.loanStateDescription}</td>
                            <td>{eachLoan.loanSubStateDescription}</td>
                            <td>
                              {numberWithCommas(
                                eachLoan.principalDue,
                                true,
                                true
                              )}
                            </td>
                            <td>
                              {numberWithCommas(eachLoan.totalPaid, true, true)}
                            </td>
                            <td>
                              {numberWithCommas(eachLoan.totalDue, true, true)}
                            </td>
                          </tr>
                        </Fragment>
                      );
                    })}</tbody>);

  default: return null;
}
  }


fetchErrorState(){
    let getLoansRequest = this.props.getLoansRequest;

    switch(getLoansRequest.request_status){
        case ( loanAndDepositsConstants.GET__APPROVED_LOANS_FAILURE):
            return (
                <div className="loading-content errormsg"> 
                    <div>{getLoansRequest.request_data.error}</div>
                </div>
            );
            default: return null;

    };
    
}

fetchForBusyState(){
        

  let getLoansRequest = this.props.getLoansRequest;

  switch (getLoansRequest.request_status){
      case (loanAndDepositsConstants.GET__APPROVED_LOANS_PENDING):

          return (  <div className="loading-content">
               <div className="loading-text">Please wait...</div></div>);
  default: return null;
  }
}




fetchPageList() {
  //let getClientsRequest = this.props.getClientsReducer;

  let allUSerPermissions = [];
  this.userPermissions.map((eachPermission) => {
    allUSerPermissions.push(eachPermission.permissionCode);
  });
 
 
  let getLoansRequest = this.props.getLoansRequest;

  // let saveRequestData =
  //   getLoansRequest.request_data !== undefined
  //     ? getLoansRequest.request_data.tempData
  //     : null;

      let allLoans = getLoansRequest?.request_data?.response?.data;

  return(


    <div>
    <div className='heading-with-cta'>
      <Form
        className='one-liner'
        onSubmit={(e) => this.searchTxtn(e, allLoans.result)}
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


        <div className='actions-wrap'>
          <Button
            onClick={this.exportLoansAccounts}
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
          onChange={(e) => this.setPagesize(e, allLoans.result)}
          value={this.state.PageSize}
          className='countdropdown form-control form-control-sm'
        >
          <option value='10'>10</option>
          <option value='25'>25</option>
          <option value='50'>50</option>
          <option value='200'>200</option>
        </select>
      
 
<TablePagination
                            totalPages={allLoans?.totalPages??0}
                            currPage={allLoans?.currentPage??0}
                            currRecordsCount={allLoans?.result.length??0}
                            totalRows={allLoans?.totalRows??0}
                            tempData={allLoans?.result??0}
                            pagesCountToshow={4}
                            refreshFunc={this.loadNextPage}
                        />
      </div>
    </div>
    <div className='table-helper'>
      <input
        type='checkbox'
        name=''
        onChange={(e) => this.setShowDetails(e, allLoans.result)}
        checked={this.state.FullDetails}
        id='showFullDetails'
      />
      <label htmlFor='showFullDetails'>Show full details</label>
    </div>

    <TableComponent classnames='striped bordered hover'>
      <thead>
        <tr>
          <th>Account Number</th>
          <th>Client Name</th>
          <th>Product Name</th>
          <th>Date Created</th>
          <th>Loan Amount</th>
          <th>Currency</th>
          <th>Loan State</th>
          <th>Loan Sub-State</th>
          <th>Principal Due</th>
          <th>Total Paid</th>
          <th>Total Due</th>
        </tr>
      </thead>
      
       {this.fetchForEmptyState()}  
        {this.fetchErrorState()}
        {this.fetchForDataState()}
       

    </TableComponent>
    {this.fetchForBusyState()}
  </div>);

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
              <SubMenu links={LOAN_MODULE_MENU_LINKS} key={this.props.loanState}/>
              <div className='module-content'>
                <div className='content-container'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='middle-content'>{this.fetchPageList()}</div>
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
    getLoansRequest: state.loansReducers.getApprovedLoansReducer,
  };
}

export default connect(mapStateToProps)(LoanListDisplay);
