import * as React from "react";
// import {Router} from "react-router";

import { Fragment } from "react";
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import InnerPageContainer from '../../shared/templates/authed-pagecontainer';

import { dashboardActions } from '../../redux/actions/dashboard/dashboard.action';

import ReverseTransaction from '../../shared/components/reverse-txt';
import ViewATransaction from '../../shared/components/view-txt';
import TableComponent from '../../shared/elements/table';
import TablePagination from '../../shared/elements/table/pagination';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { numberWithCommas, getDateFromISO } from '../../shared/utils';

import { loanActions } from '../../redux/actions/loans/loans.action';
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'
import "./loantransactions.scss";

import DatePickerFieldType from '../../_helpers/DatePickerFieldType';
class LoanTransactionsManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = this. initializeState();
        this.userPermissions = JSON.parse(localStorage.getItem('x-u-perm'));

    }

    ////////


    
    initializeState=()=>{
        this.state = {
            user: '',
            PageSize: '10',
            FullDetails: false,
            CurrentPage: 1,
            startDate:'',
            endDate:'',
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
          startDate,
          endDate,
          FullDetails,
          CurrentSelectedPage
        } = this.state;
        
        let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&StartDate=${startDate}&endDate=${endDate}`;
        if(this.props.match.params.accountEncodedKey===undefined)
        {
            if (tempData) {
                dispatch(loanActions.getLoanTransactions(params, tempData));
              } else {
                dispatch(loanActions.getLoanTransactions(params));
              }
        }
        else{
        if(tempData){
            dispatch(loanActions.getAccountLoanTransaction(this.props.match.params.accountEncodedKey,params,tempData));
        }else{
            dispatch(loanActions.getAccountLoanTransaction(this.props.match.params.accountEncodedKey,params));
        }
    }
        
    }
    
    

    
fetchForEmptyState=()=>{
    //This function returns the biew for empty list                                                                                                                                   
     let getLoanTransactionsRequest = this.props.getLoanTransactions;

    switch (getLoanTransactionsRequest.request_status){
        case (loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_PENDING):
            
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
    let getLoanTransactionsRequest = this.props.getLoanTransactions;
    
    switch(getLoanTransactionsRequest.request_status){
        case ( loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_FAILURE):
            return (
                <div className="loading-content errormsg"> 
                    <div>{getLoanTransactionsRequest.request_data.error}</div>
                </div>
            );
            default: return null;

    };
    
}

handleDateChangeRaw = (e) => {
    e.preventDefault();
  };
  handleStartDatePicker = (startDate) => {
    startDate.setHours(startDate.getHours() + 1);

    this.setState({ startDate, startDateText: startDate.toISOString() }, () => {
      if (this.state.endDate !== '') {
        //this.getHistory();
      }
    });
  };

  handleEndDatePicker = (endDate) => {
    endDate.setHours(endDate.getHours() + 1);

    this.setState({ endDate, endDateText: endDate.toISOString() }, () => {
      if (this.state.startDate !== '') {
        //this.getHistory();
      }
    });
  };


  
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


fetchForBusyState(){
   let getLoanTransactionsRequest = this.props.getLoanTransactions;
  switch (getLoanTransactionsRequest.request_status){
      case (loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_PENDING):

          return (  <div className="loading-content">
               <div className="loading-text">Please wait...</div></div>);
  default: return null;
  }
}

    fetchForDataState=()=> {
     let getLoanTransactionsRequest = this.props.getLoanTransactions;
   let allUSerPermissions = [];
   this.userPermissions.map((eachPermission) => {
     allUSerPermissions.push(eachPermission.permissionCode);
   });

    switch(getLoanTransactionsRequest.request_status){
    case(loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_SUCCESS):

      let allLoanTransactions = getLoanTransactionsRequest?.request_data?.response?.data;

        return (<tbody>
            {allLoanTransactions.result.map(
              (eachTransaction, index) => {
                return (
                  <Fragment key={index}>
                    <tr>
                      <td>
                        <NavLink
                          to={`/customer/${eachTransaction.accountHolderEncodedKey}`}
                        >
                          {eachTransaction.accountHolderName}
                        </NavLink>
                      </td>
                      <td>
                        <NavLink
                          to={`/customer/${eachTransaction.accountHolderEncodedKey}/loanaccount/${eachTransaction.loanAccountEncodedKey}`}
                        >
                          {eachTransaction.loanAccountNumber}
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
                      <td>{eachTransaction.transactionKey}</td>
                      <td>{eachTransaction.userName}</td>
                      <td>{eachTransaction.remarks}</td>
                      {/* <td></td> */}
                      <td>{eachTransaction.transactionDate}</td>
                      <td>
                        <DropdownButton
                          size='sm'
                          title='Actions'
                          key='activeCurrency'
                          className='customone'
                        >
                          {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                          {/* <Dropdown.Item eventKey="1">View</Dropdown.Item> */}
                          <Dropdown.Item
                            eventKey='1'
                            onClick={() =>
                              this.handleViewTxtnShow(
                                eachTransaction,
                                eachTransaction.typeDescription,
                                eachTransaction.transactionKey
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
                                eachTransaction.transactionKey
                              )
                            }
                          >
                            Reverse transaction
                          </Dropdown.Item>
                        </DropdownButton>
                      </td>
                    </tr>
                  </Fragment>
                );
              }
            )}
          </tbody>);

  
    default: return null;
}
}




fetchPageList() {
   
    let allUSerPermissions = [];
    this.userPermissions.map((eachPermission) => {
      allUSerPermissions.push(eachPermission.permissionCode);
    });

    let getLoanTransactionsRequest = this.props.getLoanTransactions;
    let allLoanTransactions = getLoanTransactionsRequest?.request_data?.response?.data;

    return(
        <div>
                <div className='heading-with-cta'>
                  <Form
                    className='one-liner'
                    onSubmit={(e) =>
                      this.searchTxtn(e, allLoanTransactions.result)
                    }
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
                        onClick={this.exportLoanTransactions}
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
                        this.setPagesize(e, allLoanTransactions.result)
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
                            totalPages={allLoanTransactions?.totalPages??0}
                            currPage={allLoanTransactions?.currentPage??0}
                            currRecordsCount={allLoanTransactions?.result.length??0}
                            totalRows={allLoanTransactions?.totalRows??0}
                            tempData={allLoanTransactions?.result??0}
                            pagesCountToshow={4}
                            refreshFunc={this.loadNextPage}
                        />


                  </div>
                </div>
                                

                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Loan Account Number</th>
                                            <th>Account Holder Name</th>
                                            <th>Transaction Type</th>
                                            <th>Transaction Amount</th>
                                            <th>Username</th>
                                            <th>Transaction Date</th>
                                            <th>Entry Date</th>
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
              transactionMode='Loan'
            />
            <ViewATransaction
              transactionKey={this.state.transactionKey}
              transactionType={this.state.transactionType}
              handleViewTxtnClose={this.handleViewTxtnClose}
              transactionDetails={this.state.transactionDetails}
              ViewTxtnBox={this.state.ViewTxtnBox}
              transactionMode='Loan'
            />
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Loan Transactions</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        {/* <div className="col-sm-3">
                                            <AccountsSidebar/>
                                        </div> */}
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
        getLoanTransactions: state.loansReducers.getLoanTransactionsReducer,
    };
}

export default connect(mapStateToProps)(LoanTransactionsManagement);