import * as React from 'react';
// import {Router} from "react-router";

import { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import InnerPageContainer from '../../shared/templates/authed-pagecontainer';

import ReverseTransaction from '../../shared/components/reverse-txt';
import ViewATransaction from '../../shared/components/view-txt';
import TableComponent from '../../shared/elements/table';
import TablePagination from '../../shared/elements/table/pagination';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PrintTransaction from '../../shared/components/print-txt'
import { numberWithCommas, getDateFromISO } from '../../shared/utils';
import { loanActions } from '../../redux/actions/loans/loans.action';
import { dashboardActions } from '../../redux/actions/dashboard/dashboard.action';
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants';


import './loantransactions.scss';
import DatePickerFieldType from '../../_helpers/DatePickerFieldType';
class LoanTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      PageSize: '10',
      CurrentPage: 1,
      CurrentSelectedPage: 1,
      endDate: '',
      startDate: '',
      endDateText: '',
      startDateText: '',
      SearchText: '',
    };
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = () => {
    let { PageSize, CurrentPage, SearchText, endDate, startDate } = this.state;
    if (endDate !== '') {
      endDate = endDate.toISOString();
    }
    if (startDate !== '') {
      startDate = startDate.toISOString();
    }
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
    this.getLoanTransactions(params);
  };

  getLoanTransactions = (paramters) => {
    const { dispatch } = this.props;

    dispatch(loanActions.getLoanTransactions(paramters));
  };

  exportLoanTransactions = () => {
    let { PageSize, CurrentPage, SearchText, endDate, startDate } = this.state;
    if (endDate !== '') {
      endDate = endDate.toISOString();
    }
    if (startDate !== '') {
      startDate = startDate.toISOString();
    }
    let paramters = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;

    const { dispatch } = this.props;

    dispatch(loanActions.exportLoanTransactions(paramters));
  };

  setPagesize = (PageSize, tempData) => {
    const { dispatch } = this.props;
    let sizeOfPage = PageSize.target.value,
      {
        CurrentPage,
        CurrentSelectedPage,
        SearchText,
        startDateText,
        endDateText,
      } = this.state;

    this.setState({ PageSize: sizeOfPage });

    let params = `&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&StartDate=${startDateText}&endDate=${endDateText}&SearchText=${SearchText}`;

    if (tempData) {
      dispatch(loanActions.getLoanTransactions(params, tempData));
    } else {
      dispatch(loanActions.getLoanTransactions(params));
    }
    // this.getLoanTransactions(params);
  };
  loadNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;
    let {
      PageSize,
      CurrentPage,
      SearchText,
      startDate,
      endDate,
      startDateText,
      endDateText,
    } = this.state;

    let params = `&PageSize=${PageSize}&CurrentPage=${nextPage}&CurrentSelectedPage=${nextPage}&StartDate=${startDateText}&endDate=${endDateText}&SearchText=${SearchText}`;

    if (tempData) {
      dispatch(loanActions.getLoanTransactions(params, tempData));
    } else {
      dispatch(loanActions.getLoanTransactions(params));
    }
  };
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

  exportReport = (TransactionId) => {
    let {reportType } = this.state;
    // this.setState({ExportFileType})

    
    
    let paramters = `TransactionId=${transactionKey}&ExportFileType=1`;
    const { dispatch } = this.props;

    dispatch(dashboardActions.getAReport(paramters, reportType, 1));
  };

  showPrint = (selectedToPrint) => {

    this.exportReport(selectedToPrint.transactionId)
    
    this.setState({ showPrintTxt: true, selectedToPrint })
    
  };

  closePrintTxt = () => {
       
    this.setState({ showPrintTxt: false })
  };

  searchTxtn = (e, tempData) => {
    e.preventDefault();
    const { dispatch } = this.props;
    let {
      PageSize,
      CurrentPage,
      BranchId,
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

      let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&BranchId=${BranchId}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
      this.setState({ endDateText: endDate, startDateText: startDate });
      if (tempData) {
        dispatch(loanActions.getLoanTransactions(params, tempData));
      } else {
        dispatch(loanActions.getLoanTransactions(params));
      }
    }
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

  renderLoanTransactions = () => {
    let getLoanTransactionsRequest = this.props.getLoanTransactions;
    let saveRequestData =
      getLoanTransactionsRequest.request_data !== undefined
        ? getLoanTransactionsRequest.request_data.tempData
        : null;
    switch (getLoanTransactionsRequest.request_status) {
      case loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_PENDING:
        if (
          saveRequestData === undefined ||
          (saveRequestData !== undefined && saveRequestData.length < 1)
        ) {
          return (
            <div className='loading-content'>
              <div className='heading-with-cta'>
                <Form className='one-liner'>
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
                  <Button
                    className='no-margins'
                    variant='primary'
                    type='submit'
                  >
                    Filter
                  </Button>
                </Form>

                <div className='pagination-wrap'>
                  <label htmlFor='toshow'>Show</label>
                  <select
                    id='toshow'
                    className='countdropdown form-control form-control-sm'
                  >
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='200'>200</option>
                  </select>
                </div>
              </div>
              <TableComponent classnames='striped bordered hover'>
                <thead>
                  <tr>
                    <th>Account Holder</th>
                    <th>Account Number</th>
                    <th>Type</th>
                    <th>Transaction Amount</th>
                    <th>Transaction ID</th>
                    <th>State</th>
                    <th>UserName</th>
                    <th>Narration</th>
                    <th>Transaction Date</th>
                    {/* <th>Entry Date</th> */}
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
              <div className='loading-text'>Please wait... </div>
            </div>
          );
        } else {
          return (
            <div>
              <div className='heading-with-cta'>
                <Form
                  className='one-liner'
                  onSubmit={(e) => this.searchTxtn(e, saveRequestData)}
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
                      className='form-control form-control-sm'
                      customInput={
                        <DatePickerFieldType placeHolder='Start date' />
                      }
                    />
                    <DatePicker
                      autoComplete='new-off'
                      placeholderText='End date'
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
                </Form>

                <div className='pagination-wrap'>
                  <label htmlFor='toshow'>Show</label>
                  <select
                    id='toshow'
                    // value={this.state.PageSize}
                    className='countdropdown form-control form-control-sm'
                  >
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='200'>200</option>
                  </select>
                </div>
              </div>
              <div className='loading-text'>Please wait... </div>
              <TableComponent classnames='striped bordered hover'>
                <thead>
                  <tr>
                    <th>Account Holder</th>
                    <th>Account Number</th>
                    <th>Type</th>
                    <th>Transaction Amount</th>
                    <th>Currency</th>
                    <th>Transaction ID</th>
                    <th>State</th>
                    <th>UserName</th>
                    <th>Narration</th>
                    <th>Transaction Date</th>
                    <th></th>
                    {/* <th>Entry Date</th> */}
                  </tr>
                </thead>
                <tbody>
                  {saveRequestData.map((eachTransaction, index) => {
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
                          <td>{eachTransaction.currencyCode}</td>
                          <td>{eachTransaction.userName}</td>
                          <td>{eachTransaction.transactionKey}</td>
                          <td>{eachTransaction.transactionStateDescription}</td>
                          <td>{eachTransaction.remarks}</td>
                          <td>{eachTransaction.transactionDate}</td>
                          <td>
                            <DropdownButton
                              size='sm'
                              title='Actions'
                              key='activeCurrency'
                              className='customone'
                            >
                              {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                              <Dropdown.Item eventKey='1'>View</Dropdown.Item>
                              <Dropdown.Item eventKey='1'>
                                Reverse transaction
                              </Dropdown.Item>
                              <Dropdown.Item eventKey="2"
                                    onClick={()=>this.showPrint(eachData)}
                                > Print Voucher </Dropdown.Item>
                            </DropdownButton>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </TableComponent>
              {/* <div className="footer-with-cta toleft">
                                <NavLink to={'/administration/organization/newbranch'} className="btn btn-primary">New Branch</NavLink>
                            </div> */}
            </div>
          );
        }

      case loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_SUCCESS:
        let allLoanTransactions =
          getLoanTransactionsRequest.request_data.response.data;
        if (allLoanTransactions !== undefined) {
          if (allLoanTransactions.result.length >= 1) {
            return (
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
                      totalPages={allLoanTransactions.totalPages}
                      currPage={allLoanTransactions.currentPage}
                      currRecordsCount={allLoanTransactions.result.length}
                      totalRows={allLoanTransactions.totalRows}
                      tempData={allLoanTransactions.result}
                      pagesCountToshow={4}
                      refreshFunc={this.loadNextPage}
                    />
                  </div>
                </div>

                <TableComponent classnames='striped bordered hover'>
                  <thead>
                    <tr>
                      <th>Account Holder</th>
                      <th>Account Number</th>
                      <th>Type</th>
                      <th>Transaction Amount</th>
                      <th>Transaction ID</th>
                      <th>State</th>
                      <th>UserName</th>
                      <th>Narration</th>
                      <th>Transaction Date</th>
                      <th></th>
                      {/* <th>Entry Date</th> */}
                    </tr>
                  </thead>
                  <tbody>
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
                              <td>{eachTransaction.transactionStateDescription}</td>
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
                                  <Dropdown.Item eventKey="2"
                                    onClick={()=>this.showPrint(eachData)}
                                > Print Voucher </Dropdown.Item>
                                </DropdownButton>
                              </td>
                            </tr>
                          </Fragment>
                        );
                      }
                    )}
                  </tbody>
                </TableComponent>
                {/* <div className="footer-with-cta toleft">
                                    <NavLink to={'/administration/organization/newbranch'} className="btn btn-primary">New Branch</NavLink>
                                </div> */}
              </div>
            );
          } else {
            return (
              <div className='no-records'>
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
                        placeholderText='End date'
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
                      className='countdropdown form-control form-control-sm'
                    >
                      <option value='10'>10</option>
                      <option value='25'>25</option>
                      <option value='50'>50</option>
                      <option value='200'>200</option>
                    </select>
                  </div>
                </div>
                <TableComponent classnames='striped bordered hover'>
                  <thead>
                    <tr>
                      <th>Account Holder</th>
                      <th>Account Number</th>
                      <th>Type</th>
                      <th>Transaction Amount</th>
                      <th>Transaction ID</th>
                      <th>State</th>
                      <th>UserName</th>
                      <th>Narration</th>
                      <th>Transaction Date</th>
                      {/* <th>Entry Date</th> */}
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
                {/* <div className="footer-with-cta centered">
                                    <NavLink to={'/administration/organization/newbranch'} className="btn btn-primary">New Branch</NavLink>
                                </div> */}
              </div>
            );
          }
        } else {
          return null;
        }
      case loanAndDepositsConstants.GET_LOAN_TRANSACTIONS_FAILURE:
        return (
          <div className='loading-content errormsg'>
            <div>{getLoanTransactionsRequest.request_data.error}</div>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    return (
      <Fragment>
        <InnerPageContainer {...this.props}>
          <div className='content-wrapper'>
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
            <PrintTransaction transactionDetails={this.state.selectedToPrint} closePrint = {this.closePrintTxt} showPrint = {this.state.showPrintTxt} />
            <div className='module-heading'>
              <div className='module-title'>
                <div className='content-container'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className=''>
                        <h2>Loan Transactions</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='module-content'>
                <div className='content-container'>
                  <div className='row'>
                    {/* <div className="col-sm-3">
                                            <AccountsSidebar/>
                                        </div> */}
                    <div className='col-sm-12'>
                      <div className='middle-content'>
                        {this.renderLoanTransactions()}
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

export default connect(mapStateToProps)(LoanTransactions);
