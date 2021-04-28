import * as React from "react";
// import {Router} from "react-router";

import { Fragment } from "react";
import { connect } from 'react-redux';
import { NavLink} from 'react-router-dom';

import InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import TableComponent from '../../shared/elements/table';
import TablePagination from '../../shared/elements/table/pagination';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { numberWithCommas, getDateFromISO } from '../../shared/utils';
import ReverseTransaction from '../../shared/components/reverse-txt';
import ViewATransaction from '../../shared/components/view-txt';
import Button from 'react-bootstrap/Button'
import DatePicker from 'react-datepicker';
import DatePickerFieldType from '../../_helpers/DatePickerFieldType';
import { depositActions } from '../../redux/actions/deposits/deposits.action';
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'
import "./deposittransactions.scss";
import { dashboardActions } from "../../redux/actions/dashboard/dashboard.action";
class DepositTransactionsManagement extends React.Component {
    constructor(props) {
        super(props);
        this.initializeState();
        this.userPermissions = JSON.parse(localStorage.getItem('x-u-perm'));
    }

    ////////

    
  initializeState=()=>{
    this.state = {
        user: '',
        PageSize: '10',
        FullDetails: false,
        SearchText:'',
        startDate:'',
        endDate:'',
        CurrentPage: 1,
        CurrentSelectedPage: 1
    };
    return this.state;
  }

  componentDidMount(){
    this.retrieveFromApi();
}
// componentDidUpdate(prevProps) {
//   // Typical usage (don't forget to compare props):
//   if (this.props.clientState !== prevProps.clientState) {
//     this.setState(this.initializeState(), function() {
//       this.retrieveFromApi();
//     });
//   }
// }

setPagesize = (event, tempData)=>{
   
    this.setState({PageSize: event.target.value}, function() {
      this.retrieveFromApi(tempData);
    });
    
  
  }


  
loadNextPage = (nextPage, tempData)=>{
  //next Page and tempData are properties of the TablePagination

  this.setState({CurrentPage: nextPage}, function() {
    this.retrieveFromApi(tempData);
  });
 
}

handleShowReverseClose = () => {
  // if(this.props.writeOffALoanReducer.is_request_processing===false){
  // this.props.dispatch(loanActions.writeOffALoan("CLEAR"));
  this.setState({ showReverseBox: false });
  // }
};
handleShowReverseShow = (transactionDetails, txtxType, txtKey) => {
  this.props.dispatch(dashboardActions.reverseATransaction('CLEAR'));
  this.setState({
    showReverseBox: true,
    transactionDetails,
    transactionType: txtxType,
    transactionKey: txtKey,
  });
};

handleViewTxtnClose = () => {
  // if(this.props.writeOffALoanReducer.is_request_processing===false){
  // this.props.dispatch(loanActions.writeOffALoan("CLEAR"));
  this.setState({ ViewTxtnBox: false });
  // }
};


handleViewTxtnShow = (transactionDetails, txtxType, txtKey) => {
  this.props.dispatch(dashboardActions.reverseATransaction('CLEAR'));
  this.setState({
    ViewTxtnBox: true,
    transactionDetails,
    transactionType: txtxType,
    transactionKey: txtKey,
  });
};

// setShowDetails = (event,tempData)=>{

//   let showDetails = event.target.checked;
//   this.setState({FullDetails: showDetails}, function() {
//     this.retrieveFromApi(tempData);
//   });
// }

retrieveFromApi = (tempData)=>{

    const {dispatch} = this.props;        
  
    let {
      PageSize,
      CurrentPage,
      startDate,
      endDate,
      FullDetails,
      SearchText,
      CurrentSelectedPage
    } = this.state;
    
    let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
    
    if(this.props.match.params.accountEncodedKey===undefined)
    {
        if (tempData) {
            dispatch(depositActions.getDepositTransaction(params, tempData));
          } else {
            dispatch(depositActions.getDepositTransaction(params));
          }
    }
    else{
        if(tempData){
            dispatch(depositActions.getAccountDepositTransaction(this.props.match.params.accountEncodedKey,params,tempData));
        }else{
            dispatch(depositActions.getAccountDepositTransaction(this.props.match.params.accountEncodedKey,params));
        }
    }
   
}

exportDepositTransactions = () => {
    let {
        PageSize,
        CurrentPage,
        startDate,
        endDate,
        SearchText,
        FullDetails,
        CurrentSelectedPage
      } = this.state;

    if (endDate !== '') {
      endDate = endDate.toISOString();
    }
    if (startDate !== '') {
      startDate = startDate.toISOString();
    }
    let paramters = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
    const { dispatch } = this.props;

    dispatch(depositActions.exportDepositTransaction(paramters));
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
  
  searchTxtn = (e, tempData) => {
    e.preventDefault();
    const { dispatch } = this.props;
    let {
 
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
    
    }
   // this.setState({startDate: startDate,endDate:endDate,SearchText:SearchText });


    this.retrieveFromApi();
  };
fetchForEmptyState=()=>{
    //This function returns the biew for empty list                                                                                                                                   
     let getDepositTransactionRequest = this.props.getDepositTransactionRequest;

    switch (getDepositTransactionRequest.request_status){
        case (loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_PENDING):
            
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
    let getDepositTransactionRequest = this.props.getDepositTransactionRequest;
    
    switch(getDepositTransactionRequest.request_status){
        case ( loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_FAILURE):
            return (
                <div className="loading-content errormsg"> 
                    <div>{getDepositTransactionRequest.request_data.error}</div>
                </div>
            );
            default: return null;

    };
    
}


fetchForBusyState(){
   let getDepositTransactionRequest = this.props.getDepositTransactionRequest;
  switch (getDepositTransactionRequest.request_status){
      case (loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_PENDING):

          return (  <div className="loading-content">
               <div className="loading-text">Please wait...</div></div>);
  default: return null;
  }
}

    fetchForDataState=()=> {
     let getDepositTransactionRequest = this.props.getDepositTransactionRequest;
   let allUSerPermissions = [];
   this.userPermissions.map((eachPermission) => {
     allUSerPermissions.push(eachPermission.permissionCode);
   });

    switch(getDepositTransactionRequest.request_status){
    case(loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_SUCCESS):

      let allDepositTransactions = getDepositTransactionRequest?.request_data?.response?.data;
        return (<tbody>{

          allDepositTransactions.result.map((eachTransaction, index) => {
                return (
                  <Fragment key={index}>
                  <tr>
                    <td>
                      <NavLink
                        to={`/customer/${eachTransaction.accountHolderEncodedKey}`}
                      >
                        {eachTransaction.accountHolderName}
                      </NavLink>{' '}
                    </td>
                    <td>
                      <NavLink
                        to={`/customer/${eachTransaction.accountHolderEncodedKey}/savingsaccount/${eachTransaction.depositAccountEncodedKey}`}
                      >
                        {eachTransaction.depositAccountNumber}
                      </NavLink>{' '}
                    </td>
                    <td>{eachTransaction.typeDescription}</td>
                    <td>
                      {numberWithCommas(
                        eachTransaction.transactionAmount,
                        true,
                        true
                      )}
                    </td>
                    <td>{eachTransaction.key}</td>
                    <td width='300'>{eachTransaction.narration}</td>
                    <td>{eachTransaction.userName}</td>
                    {/* <td>{eachTransaction.entryDate}</td> */}
                    <td>{eachTransaction.dateCreated}</td>
                    <td>
                      <DropdownButton
                        size='sm'
                        title='Actions'
                        key='activeCurrency'
                        className='customone'
                      >
                        {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                        <Dropdown.Item
                          eventKey='1'
                          onClick={() =>
                            this.handleViewTxtnShow(
                              eachTransaction,
                              eachTransaction.typeDescription,
                              eachTransaction.key
                            )
                          }
                        >
                          View
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey='1'
                          onClick={() =>
                            this.handleShowReverseShow(
                              eachTransaction,
                              eachTransaction.typeDescription,
                              eachTransaction.key
                            )
                          }
                        >
                          Reverse transaction
                        </Dropdown.Item>
                      </DropdownButton>
                    </td>
                  </tr>
                </Fragment>
                )
            })
        }</tbody>);

  
    default: return null;
}
}



fetchPageList() {
   
    let allUSerPermissions = [];
    this.userPermissions.map((eachPermission) => {
      allUSerPermissions.push(eachPermission.permissionCode);
    });

    let getDepositTransactionRequest = this.props.getDepositTransactionRequest;
    let allDepositTransactions = getDepositTransactionRequest?.request_data?.response?.data;

    return(
        <div>
                <div className='heading-with-cta'>
                  <Form
                    className='one-liner'
                    onSubmit={(e) => this.searchTxtn(e, allDepositTransactions?.result)}
                   
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
                        onClick={this.exportDepositTransactions}
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
                        this.setPagesize(e, allDepositTransactions.result)
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
                            totalPages={allDepositTransactions?.totalPages??0}
                            currPage={allDepositTransactions?.currentPage??0}
                            currRecordsCount={allDepositTransactions?.result.length??0}
                            totalRows={allDepositTransactions?.totalRows??0}
                            tempData={allDepositTransactions?.result??0}
                            pagesCountToshow={4}
                            refreshFunc={this.loadNextPage}
                        />
            </div>
        </div>
        {/* <div className="table-helper">
            <input type="checkbox" name=""
                onChange={(e)=>this.setShowDetails(e, allDeposits)}
                checked={this.state.FullDetails}
                id="showFullDetails" />
            <label htmlFor="showFullDetails">Show full details</label>
        </div> */}
        

        <TableComponent classnames="striped bordered hover">
        <thead>
                  <tr>
                    <th>Account Holder</th>
                    <th>Deposit Account Number</th>
                    <th>Type</th>
                    <th>Transaction Amount</th>
                    <th>Transaction ID</th>
                    <th>Narration</th>
                    <th>User Name</th>
                    {/* <th>Entry Date</th> */}
                    <th>Date Created</th>
                  </tr>
                </thead>
       

          {this.fetchForEmptyState()}  
          {this.fetchErrorState()}
          {this.fetchForDataState()}
         

            
        </TableComponent>
        {this.fetchForBusyState()}
    </div>
);
    }

  



    render() {
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    <div className="content-wrapper">
                    <ReverseTransaction
              transactionKey={this.state.transactionKey}
              transactionType={this.state.transactionType}
              handleCloseReverse={this.handleShowReverseClose}
              transactionDetails={this.state.transactionDetails}
              showReverseTransaction={this.state.showReverseBox}
              transactionMode='Deposit'
            />
            <ViewATransaction
              transactionKey={this.state.transactionKey}
              transactionType={this.state.transactionType}
              handleViewTxtnClose={this.handleViewTxtnClose}
              transactionDetails={this.state.transactionDetails}
              ViewTxtnBox={this.state.ViewTxtnBox}
              transactionMode='Deposit'
            />
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Deposit Transactions</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="middle-content">
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
      getDepositTransactionRequest:
            state.depositsReducers.getDepositTransactionReducer,
    };
}

export default connect(mapStateToProps)(DepositTransactionsManagement);