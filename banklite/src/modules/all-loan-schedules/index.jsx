import * as React from 'react';
// import {Router} from "react-router";

import { Fragment } from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import InnerPageContainer from '../../shared/templates/authed-pagecontainer';
import TableComponent from '../../shared/elements/table';
import TablePagination from '../../shared/elements/table/pagination';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { numberWithCommas, getDateFromISO } from '../../shared/utils';
import { loanActions } from '../../redux/actions/loans/loans.action';
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants';
import './styles.scss';
import DatePickerFieldType from '../../_helpers/DatePickerFieldType';
class AllLoanSchedules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      PageSize: '10',
      FullDetails: false,
      CurrentPage: 1,
      CurrentSelectedPage: 1,
      endDate: '',
      startDate: '',
      SearchText: '',
      ScheduleState: -1,
      showAmountExpected: true,
      showAmountPaid: false,
      showAmountDue: true,
    };
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = () => {
    let {
      PageSize,
      CurrentPage,
      CurrentSelectedPage,
      ScheduleState,
    } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&ScheduleState=${ScheduleState}`;
    this.getAllLoanSchedules(params);
  };

  getAllLoanSchedules = (paramters) => {
    const { dispatch } = this.props;

    dispatch(loanActions.getAllLoanSchedules(paramters));
  };

  exportLoansSchedules = () => {
    let {
      PageSize,
      CurrentPage,
      SearchText,
      ScheduleState,
      endDate,
      startDate,
    } = this.state;

    if (endDate !== '') {
      endDate = endDate.toISOString();
    }
    if (startDate !== '') {
      startDate = startDate.toISOString();
    }
    let paramters = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}&ScheduleState=${ScheduleState}`;
    const { dispatch } = this.props;

    dispatch(loanActions.exportLoansSchedules(paramters));
  };

  setPagesize = (PageSize, tempData) => {
    const { dispatch } = this.props;
    let sizeOfPage = PageSize.target.value,
      {
        FullDetails,
        CurrentPage,
        CurrentSelectedPage,
        ScheduleState,
        SearchText,
        startDate,
        endDate,
      } = this.state;

    this.setState({ PageSize: sizeOfPage });

    let params = `FullDetails=${FullDetails}&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&ScheduleState=${ScheduleState}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
    if (tempData) {
      dispatch(loanActions.getAllLoanSchedules(params, tempData));
    } else {
      dispatch(loanActions.getAllLoanSchedules(params));
    }
  };

  setScheduleState = (stateChosen, tempData) => {
    const { dispatch } = this.props;
    let currentState = stateChosen.target.value,
      {
        FullDetails,
        CurrentPage,
        PageSize,
        CurrentSelectedPage,
        SearchText,
        startDate,
        endDate,
      } = this.state;

    this.setState({ ScheduleState: currentState });

    let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&ScheduleState=${currentState}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
    if (tempData) {
      dispatch(loanActions.getAllLoanSchedules(params, tempData));
    } else {
      dispatch(loanActions.getAllLoanSchedules(params));
    }
  };

  setShowDetails = (FullDetails, tempData) => {
    const { dispatch } = this.props;
    let showDetails = FullDetails.target.checked,
      {
        CurrentPage,
        CurrentSelectedPage,
        PageSize,
        ScheduleState,
        SearchText,
        startDate,
        endDate,
      } = this.state;

    this.setState({ FullDetails: showDetails });

    let params = `FullDetails=${showDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&ScheduleState=${ScheduleState}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
    if (tempData) {
      dispatch(loanActions.getAllLoanSchedules(params, tempData));
    } else {
      dispatch(loanActions.getAllLoanSchedules(params));
    }
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

  setScheduleFilter = (filterState, filterItem) => {
    this.setState({ [filterItem]: filterState.target.checked });
  };

  loadNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;
    let {
      PageSize,
      CurrentPage,
      FullDetails,
      ScheduleState,
      SearchText,
      startDate,
      endDate,
    } = this.state;

    // this.setState({PageSize: sizeOfPage});

    // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
    // this.getTransactionChannels(params);
    let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${nextPage}&CurrentSelectedPage=${nextPage}&ScheduleState=${ScheduleState}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;

    if (tempData) {
      dispatch(loanActions.getAllLoanSchedules(params, tempData));
    } else {
      dispatch(loanActions.getAllLoanSchedules(params));
    }
  };

  searchTxtn = (e, tempData) => {
    e.preventDefault();
    const { dispatch } = this.props;
    let {
      PageSize,
      CurrentPage,
      SearchText,
      endDate,
      startDate,
      ScheduleState,
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
      let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}&ScheduleState=${ScheduleState}`;

      if (tempData) {
        dispatch(loanActions.getAllLoanSchedules(params, tempData));
      } else {
        dispatch(loanActions.getAllLoanSchedules(params));
      }
    }
  };

  renderAllLoanSchedules = () => {
    let getAllLoanSchedulesRequest = this.props.getAllLoanSchedulesRequest;

    // let saveRequestData= getAllLoanSchedulesRequest.request_data!==undefined?getAllLoanSchedulesRequest.request_data.tempData:null;
    let saveRequestData =
      getAllLoanSchedulesRequest.request_data !== undefined
        ? getAllLoanSchedulesRequest.request_data.tempData
        : null;

    switch (getAllLoanSchedulesRequest.request_status) {
      case loanAndDepositsConstants.GET_ALL_LOAN_SCHEDULES_PENDING:
        if (
          saveRequestData === undefined ||
          (saveRequestData !== undefined && saveRequestData.length < 1)
        ) {
          return (
            <div className='loading-content'>
              <div className='loading-text'>Please wait... </div>

              <TableComponent classnames='striped bordered hover'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer Name</th>
                    <th>Account Number</th>
                    <th>Due Date</th>
                    {/* <th>Total Balance</th> */}
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
                    <td></td>
                  </tr>
                </tbody>
              </TableComponent>
            </div>
          );
        } else {
          return (
            <div className='loading-content'>
              <div className='loading-text'>Please wait... </div>

              <TableComponent classnames='striped bordered hover'>
                <thead>
                  <tr>
                    <th>#</th>
                    {/* <th>ID</th> */}
                    <th>Customer Name</th>
                    <th>Account Number</th>
                    <th>Loan Amount</th>
                    <th>Due Date</th>
                    {this.state.showAmountExpected === true && (
                      <th className='borderdleft'>Expected Principal</th>
                    )}
                    {this.state.showAmountExpected === true && (
                      <th>Expected Interest</th>
                    )}
                    {this.state.showAmountExpected === true && (
                      <th>Expected Fees</th>
                    )}
                    {this.state.showAmountExpected === true && (
                      <th className='borderdright'>Expected Penalty</th>
                    )}
                    {this.state.showAmountExpected === true && (
                      <th className='borderdright'>Total Expected</th>
                    )}
                    {this.state.showAmountPaid && (
                      <th className='borderdleft'>Principal Paid</th>
                    )}
                    {this.state.showAmountPaid && <th>Fees Paid</th>}
                    {this.state.showAmountPaid && <th>Interest Paid</th>}
                    {this.state.showAmountPaid && (
                      <th className=''>Penalty Paid</th>
                    )}
                    {this.state.showAmountPaid && (
                      <th className='borderdright'>Total Paid</th>
                    )}
                    {/* {this.state.showAmountDue &&
                                                <th className="borderdleft">Principal Due</th>
                                            } */}
                    {/* {this.state.showAmountDue &&
                                                <th>Interest Due</th>
                                            } */}
                    {/* {this.state.showAmountDue &&
                                                <th>Fee Due</th>
                                            }
                                            {this.state.showAmountDue &&
                                                <th>Penalty Due</th>
                                            } */}
                    {this.state.showAmountDue && (
                      <th className='borderdright'>Total Due</th>
                    )}
                    {/* <th>Total Balance</th> */}
                    <th>State</th>
                  </tr>
                </thead>
                <tbody>
                  {saveRequestData.map((eachSchedule, index) => {
                    return (
                      <Fragment key={index}>
                        <tr key={index}>
                          <td>{index + 1}</td>
                          {/* <td>{eachSchedule.id}</td> */}
                          <td>
                            <NavLink to={`/customer/${eachSchedule.clientKey}`}>
                              {' '}
                              {eachSchedule.clientName}
                            </NavLink>
                          </td>
                          <td>
                            <NavLink
                              to={`/customer/${eachSchedule.clientKey}/loanaccount/${eachSchedule.encodedKey}`}
                            >
                              {' '}
                              {eachSchedule.accountNumber}
                            </NavLink>
                          </td>
                          <td>
                            {eachSchedule.loanAmount !== null &&
                            eachSchedule.loanAmount > 0
                              ? `₦${numberWithCommas(
                                  eachSchedule.loanAmount,
                                  true
                                )}`
                              : '-'}
                          </td>
                          <td>
                            {eachSchedule.dueDate !== null &&
                            eachSchedule.dueDate !== ''
                              ? eachSchedule.dueDate
                              : '-'}
                          </td>
                          {this.state.showAmountExpected === true && (
                            <td className='borderdleft'>
                              {eachSchedule.principalExpected !== null &&
                              eachSchedule.principalExpected > 0
                                ? `₦${numberWithCommas(
                                    eachSchedule.principalExpected,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountExpected === true && (
                            <td>
                              {eachSchedule.interestExpected !== null &&
                              eachSchedule.interestExpected > 0
                                ? `₦${numberWithCommas(
                                    eachSchedule.interestExpected,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountExpected === true && (
                            <td>
                              {eachSchedule.feesExpected !== null &&
                              eachSchedule.feesExpected > 0
                                ? `₦${numberWithCommas(
                                    eachSchedule.feesExpected,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountExpected === true && (
                            <td className='borderdright'>
                              {eachSchedule.penaltyExpected !== null &&
                              eachSchedule.penaltyExpected > 0
                                ? `₦${numberWithCommas(
                                    eachSchedule.penaltyExpected,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountExpected === true && (
                            <td className='borderdright'>
                              {eachSchedule.totalExpected !== null &&
                              eachSchedule.totalExpected > 0
                                ? `₦${numberWithCommas(
                                    eachSchedule.totalExpected,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountPaid && (
                            <td className='borderdleft'>
                              {eachSchedule.principalPaid !== null &&
                              eachSchedule.principalPaid > 0
                                ? `₦${numberWithCommas(
                                    eachSchedule.principalPaid,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountPaid && (
                            <td>
                              {eachSchedule.feePaid !== null &&
                              eachSchedule.feePaid > 0
                                ? `₦${numberWithCommas(
                                    eachSchedule.feePaid,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountPaid && (
                            <td>
                              {eachSchedule.interestPaid !== null &&
                              eachSchedule.interestPaid > 0
                                ? `₦${numberWithCommas(
                                    eachSchedule.interestPaid,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountPaid && (
                            <td className='borderdright'>
                              {eachSchedule.penaltyPaid !== null &&
                              eachSchedule.penaltyPaid > 0
                                ? `₦${numberWithCommas(
                                    eachSchedule.penaltyPaid,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountPaid && (
                            <td className='borderdright'>
                              {eachSchedule.totalPaid !== null &&
                              eachSchedule.totalPaid > 0
                                ? `₦${numberWithCommas(
                                    eachSchedule.totalPaid,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {/* {this.state.showAmountDue &&
                                                                <td className="borderdleft">{(eachSchedule.principalDue !== null && eachSchedule.principalDue > 0) ? `₦${numberWithCommas(eachSchedule.principalDue, true)}` : "-"}</td>
                                                            } */}

                          {/* {this.state.showAmountDue &&
                                                                <td>{(eachSchedule.interestDue !== null && eachSchedule.interestDue > 0) ? `₦${numberWithCommas(eachSchedule.interestDue, true)}` : "-"}</td>
                                                            } */}
                          {/* {this.state.showAmountDue &&
                                                                <td>{(eachSchedule.feeDue !== null && eachSchedule.feeDue > 0) ? `₦${numberWithCommas(eachSchedule.feeDue, true)}` : "-"}</td>
                                                            } */}
                          {/* {this.state.showAmountDue &&
                                                                <td>{(eachSchedule.penaltyDue !== null && eachSchedule.penaltyDue > 0) ? `₦${numberWithCommas(eachSchedule.penaltyDue, true)}` : "-"}</td>
                                                            } */}
                          {this.state.showAmountDue && (
                            <td className='borderdright'>
                              {eachSchedule.totalDue !== null &&
                              eachSchedule.totalDue > 0
                                ? `₦${numberWithCommas(
                                    eachSchedule.totalDue,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {/* <td>{(eachSchedule.totalBalance !==null && eachSchedule.totalBalance>0) ? numberWithCommas(eachSchedule.totalBalance, true) : "-"}</td> */}
                          <td>
                            {eachSchedule.scheduleStateDescription !== null &&
                            eachSchedule.scheduleStateDescription !== undefined
                              ? eachSchedule.scheduleStateDescription
                              : '-'}
                          </td>
                        </tr>
                        {/* <tr>
                                                            <td><NavLink to={`/customer/${eachTransaction.accountHolderEncodedKey}`}>{eachTransaction.accountHolderName}</NavLink> </td>
                                                            <td><NavLink to={`/customer/${eachTransaction.accountHolderEncodedKey}/savingsaccount/${eachTransaction.depositAccountEncodedKey}`}>{eachTransaction.depositAccountNumber}</NavLink> </td>
                                                            <td>{eachTransaction.typeDescription}</td>
                                                            <td >{numberWithCommas(eachTransaction.transactionAmount, true, true)}</td>
                                                            <td width="300">{eachTransaction.narration}</td>
                                                            <td>{eachTransaction.userName}</td>
                                                            <td>{eachTransaction.dateCreated}</td>
                                                        </tr> */}
                      </Fragment>
                    );
                  })}
                </tbody>
              </TableComponent>
            </div>
          );
        }

      case loanAndDepositsConstants.GET_ALL_LOAN_SCHEDULES_SUCCESS:
        let allLoanSchedules =
          getAllLoanSchedulesRequest.request_data.response.data;
        if (allLoanSchedules !== undefined) {
          if (allLoanSchedules.result.length >= 1) {
            return (
              <div>
                <div className='heading-with-cta'>
                  <Form
                    className='one-liner'
                    onSubmit={(e) =>
                      this.searchTxtn(e, allLoanSchedules.result)
                    }
                  >
                    <Form.Group
                      controlId='filterDropdown'
                      className='no-margins pr-10'
                    >
                      <select
                        id='toshow'
                        onChange={(e) =>
                          this.setScheduleState(e, allLoanSchedules.result)
                        }
                        value={this.state.ScheduleState}
                        className='countdropdown form-control form-control-sm'
                      >
                        <option value='-1'>All</option>
                        {/* <option value="0">Not Disbursed</option> */}
                        <option value='1'>Pending</option>
                        {/* <option value="2">Late</option> */}
                        <option value='3'>Paid</option>
                        <option value='4'>Payment Due</option>
                      </select>
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
                        // maxDate={new Date()}
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
                        onClick={this.exportLoansSchedules}
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
                        this.setPagesize(e, allLoanSchedules.result)
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
                      totalPages={allLoanSchedules.totalPages}
                      currPage={allLoanSchedules.currentPage}
                      currRecordsCount={allLoanSchedules.result.length}
                      totalRows={allLoanSchedules.totalRows}
                      tempData={allLoanSchedules.result}
                      pagesCountToshow={4}
                      refreshFunc={this.loadNextPage}
                    />
                  </div>
                </div>
                {/* <div className="Table-helper">
                                    <input type="checkbox" name=""
                                        onChange={(e)=>this.setShowDetails(e, allLoanSchedules.result)}
                                        checked={this.state.FullDetails}
                                        id="showFullDetails" />
                                    <label htmlFor="showFullDetails">Show full details</label>
                                </div> */}
                <div className='table-helper'>
                  <input
                    type='checkbox'
                    name=''
                    onChange={(e) =>
                      this.setScheduleFilter(e, 'showAmountExpected')
                    }
                    checked={this.state.showAmountExpected}
                    id='showAmountExpected'
                  />
                  <label htmlFor='showAmountExpected'>Amount Expected</label>
                  <input
                    type='checkbox'
                    name=''
                    onChange={(e) =>
                      this.setScheduleFilter(e, 'showAmountPaid')
                    }
                    checked={this.state.showAmountPaid}
                    id='showAmountPaid'
                  />
                  <label htmlFor='showAmountPaid'>Amount Paid</label>
                  <input
                    type='checkbox'
                    name=''
                    onChange={(e) => this.setScheduleFilter(e, 'showAmountDue')}
                    checked={this.state.showAmountDue}
                    id='showAmountDue'
                  />
                  <label htmlFor='showAmountDue'>Amount Due</label>
                </div>

                <TableComponent classnames='striped bordered hover'>
                  <thead>
                    <tr>
                      <th>#</th>
                      {/* <th>ID</th> */}
                      <th>Customer Name</th>
                      <th>Account Number</th>
                      <th>Loan Amount</th>
                      <th>Due Date</th>
                      {this.state.showAmountExpected === true && (
                        <th className='borderdleft'>Expected Principal</th>
                      )}
                      {this.state.showAmountExpected === true && (
                        <th>Expected Interest</th>
                      )}
                      {this.state.showAmountExpected === true && (
                        <th>Expected Fees</th>
                      )}
                      {this.state.showAmountExpected === true && (
                        <th className='borderdright'>Expected Penalty</th>
                      )}
                      {this.state.showAmountExpected === true && (
                        <th className='borderdright'>Total Expected</th>
                      )}
                      {this.state.showAmountPaid && (
                        <th className='borderdleft'>Principal Paid</th>
                      )}
                      {this.state.showAmountPaid && <th>Fees Paid</th>}
                      {this.state.showAmountPaid && <th>Interest Paid</th>}
                      {this.state.showAmountPaid && (
                        <th className=''>Penalty Paid</th>
                      )}
                      {this.state.showAmountPaid && (
                        <th className='borderdright'>Total Paid</th>
                      )}
                      {/* {this.state.showAmountDue &&
                                                <th className="borderdleft">Principal Due</th>
                                            } */}
                      {/* {this.state.showAmountDue &&
                                                <th>Interest Due</th>
                                            } */}
                      {/* {this.state.showAmountDue &&
                                                <th>Fee Due</th>
                                            }
                                            {this.state.showAmountDue &&
                                                <th>Penalty Due</th>
                                            } */}
                      {this.state.showAmountDue && (
                        <th className='borderdright'>Total Due</th>
                      )}
                      {/* <th>Total Balance</th> */}
                      <th>State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allLoanSchedules.result.map((eachSchedule, index) => {
                      return (
                        <Fragment key={index}>
                          <tr key={index}>
                            <td>{index + 1}</td>
                            {/* <td>{eachSchedule.id}</td> */}
                            <td>
                              <NavLink
                                to={`/customer/${eachSchedule.clientKey}`}
                              >
                                {' '}
                                {eachSchedule.clientName}
                              </NavLink>
                            </td>
                            <td>
                              <NavLink
                                to={`/customer/${eachSchedule.clientKey}/loanaccount/${eachSchedule.encodedKey}`}
                              >
                                {' '}
                                {eachSchedule.accountNumber}
                              </NavLink>
                            </td>
                            <td>
                              {eachSchedule.loanAmount !== null &&
                              eachSchedule.loanAmount > 0
                                ? `₦${numberWithCommas(
                                    eachSchedule.loanAmount,
                                    true
                                  )}`
                                : '-'}
                            </td>
                            <td>
                              {eachSchedule.dueDate !== null &&
                              eachSchedule.dueDate !== ''
                                ? eachSchedule.dueDate
                                : '-'}
                            </td>
                            {this.state.showAmountExpected === true && (
                              <td className='borderdleft'>
                                {eachSchedule.principalExpected !== null &&
                                eachSchedule.principalExpected > 0
                                  ? `₦${numberWithCommas(
                                      eachSchedule.principalExpected,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountExpected === true && (
                              <td>
                                {eachSchedule.interestExpected !== null &&
                                eachSchedule.interestExpected > 0
                                  ? `₦${numberWithCommas(
                                      eachSchedule.interestExpected,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountExpected === true && (
                              <td>
                                {eachSchedule.feesExpected !== null &&
                                eachSchedule.feesExpected > 0
                                  ? `₦${numberWithCommas(
                                      eachSchedule.feesExpected,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountExpected === true && (
                              <td className='borderdright'>
                                {eachSchedule.penaltyExpected !== null &&
                                eachSchedule.penaltyExpected > 0
                                  ? `₦${numberWithCommas(
                                      eachSchedule.penaltyExpected,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountExpected === true && (
                              <td className='borderdright'>
                                {eachSchedule.totalExpected !== null &&
                                eachSchedule.totalExpected > 0
                                  ? `₦${numberWithCommas(
                                      eachSchedule.totalExpected,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountPaid && (
                              <td className='borderdleft'>
                                {eachSchedule.principalPaid !== null &&
                                eachSchedule.principalPaid > 0
                                  ? `₦${numberWithCommas(
                                      eachSchedule.principalPaid,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountPaid && (
                              <td>
                                {eachSchedule.feePaid !== null &&
                                eachSchedule.feePaid > 0
                                  ? `₦${numberWithCommas(
                                      eachSchedule.feePaid,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountPaid && (
                              <td>
                                {eachSchedule.interestPaid !== null &&
                                eachSchedule.interestPaid > 0
                                  ? `₦${numberWithCommas(
                                      eachSchedule.interestPaid,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountPaid && (
                              <td className='borderdright'>
                                {eachSchedule.penaltyPaid !== null &&
                                eachSchedule.penaltyPaid > 0
                                  ? `₦${numberWithCommas(
                                      eachSchedule.penaltyPaid,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountPaid && (
                              <td className='borderdright'>
                                {eachSchedule.totalPaid !== null &&
                                eachSchedule.totalPaid > 0
                                  ? `₦${numberWithCommas(
                                      eachSchedule.totalPaid,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {/* {this.state.showAmountDue &&
                                                                <td className="borderdleft">{(eachSchedule.principalDue !== null && eachSchedule.principalDue > 0) ? `₦${numberWithCommas(eachSchedule.principalDue, true)}` : "-"}</td>
                                                            } */}

                            {/* {this.state.showAmountDue &&
                                                                <td>{(eachSchedule.interestDue !== null && eachSchedule.interestDue > 0) ? `₦${numberWithCommas(eachSchedule.interestDue, true)}` : "-"}</td>
                                                            } */}
                            {/* {this.state.showAmountDue &&
                                                                <td>{(eachSchedule.feeDue !== null && eachSchedule.feeDue > 0) ? `₦${numberWithCommas(eachSchedule.feeDue, true)}` : "-"}</td>
                                                            } */}
                            {/* {this.state.showAmountDue &&
                                                                <td>{(eachSchedule.penaltyDue !== null && eachSchedule.penaltyDue > 0) ? `₦${numberWithCommas(eachSchedule.penaltyDue, true)}` : "-"}</td>
                                                            } */}
                            {this.state.showAmountDue && (
                              <td className='borderdright'>
                                {eachSchedule.totalDue !== null &&
                                eachSchedule.totalDue > 0
                                  ? `₦${numberWithCommas(
                                      eachSchedule.totalDue,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {/* <td>{(eachSchedule.totalBalance !==null && eachSchedule.totalBalance>0) ? numberWithCommas(eachSchedule.totalBalance, true) : "-"}</td> */}
                            <td>
                              {eachSchedule.scheduleStateDescription !== null &&
                              eachSchedule.scheduleStateDescription !==
                                undefined
                                ? eachSchedule.scheduleStateDescription
                                : '-'}
                            </td>
                          </tr>
                          {/* <tr>
                                                            <td><NavLink to={`/customer/${eachTransaction.accountHolderEncodedKey}`}>{eachTransaction.accountHolderName}</NavLink> </td>
                                                            <td><NavLink to={`/customer/${eachTransaction.accountHolderEncodedKey}/savingsaccount/${eachTransaction.depositAccountEncodedKey}`}>{eachTransaction.depositAccountNumber}</NavLink> </td>
                                                            <td>{eachTransaction.typeDescription}</td>
                                                            <td >{numberWithCommas(eachTransaction.transactionAmount, true, true)}</td>
                                                            <td width="300">{eachTransaction.narration}</td>
                                                            <td>{eachTransaction.userName}</td>
                                                            <td>{eachTransaction.dateCreated}</td>
                                                        </tr> */}
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
          } else {
            return (
              <div className='no-records'>
                <div className='heading-with-cta'>
                  <Form
                    className='one-liner'
                    onSubmit={(e) =>
                      this.searchTxtn(e, allLoanSchedules.result)
                    }
                  >
                    <Form.Group
                      controlId='filterDropdown'
                      className='no-margins pr-10'
                    >
                      <select
                        id='toshow'
                        onChange={(e) =>
                          this.setScheduleState(e, allLoanSchedules.result)
                        }
                        value={this.state.ScheduleState}
                        className='countdropdown form-control form-control-sm'
                      >
                        <option value='-1'>All</option>
                        {/* <option value="0">Not Disbursed</option> */}
                        <option value='1'>Pending</option>
                        {/* <option value="2">Late</option> */}
                        <option value='3'>Paid</option>
                        <option value='4'>Payment Due</option>
                      </select>
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
                      <th>#</th>
                      <th>Customer Name</th>
                      <th>Account Number</th>
                      <th>Due Date</th>
                      {/* <th>Total Balance</th> */}
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
      case loanAndDepositsConstants.GET_ALL_LOAN_SCHEDULES_FAILURE:
        return (
          <div className='loading-content errormsg'>
            <div>{getAllLoanSchedulesRequest.request_data.error}</div>
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
            <div className='module-heading'>
              <div className='module-title'>
                <div className='content-container'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className=''>
                        <h2>All Loan Schedules</h2>
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
                        {this.renderAllLoanSchedules()}
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
    getAllLoanSchedulesRequest: state.loansReducers.getAllLoanSchedulesReducer,
  };
}
export default connect(mapStateToProps)(AllLoanSchedules);
