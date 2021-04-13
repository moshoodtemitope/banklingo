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
class LoanPAR extends React.Component {
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
      startDate,
      endDate,
      SearchText,
    } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&StartDate=${startDate}&EndDate=${endDate}&SearchText=${SearchText}`;
    this.getAllLoanPAR(params);
  };

  getAllLoanPAR = (paramters) => {
    const { dispatch } = this.props;

    dispatch(loanActions.getLoanPAR(paramters));
  };

  exportLoansPAR = () => {
    let { PageSize, CurrentPage, SearchText, endDate, startDate } = this.state;

    if (endDate !== '') {
      endDate = endDate.toISOString();
    }
    if (startDate !== '') {
      startDate = startDate.toISOString();
    }
    let paramters = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
    const { dispatch } = this.props;

    dispatch(loanActions.exportLoanPAR(paramters));
  };

  setPagesize = (PageSize, tempData) => {
    const { dispatch } = this.props;
    let sizeOfPage = PageSize.target.value,
      {
        FullDetails,
        CurrentPage,
        CurrentSelectedPage,
        endDate,
        startDate,
      } = this.state;

    this.setState({ PageSize: sizeOfPage });

    let params = `FullDetails=${FullDetails}&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&StartDate=${startDate}&endDate=${endDate}`;
    if (tempData) {
      dispatch(loanActions.getLoanPAR(params, tempData));
    } else {
      dispatch(loanActions.getLoanPAR(params));
    }
  };

  setShowDetails = (FullDetails, tempData) => {
    const { dispatch } = this.props;
    let showDetails = FullDetails.target.checked,
      {
        CurrentPage,
        CurrentSelectedPage,
        PageSize,
        endDate,
        startDate,
      } = this.state;

    this.setState({ FullDetails: showDetails });

    let params = `FullDetails=${showDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;
    if (tempData) {
      dispatch(loanActions.getLoanPAR(params, tempData));
    } else {
      dispatch(loanActions.getLoanPAR(params));
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

  setPARFilter = (filterState, filterItem) => {
    this.setState({ [filterItem]: filterState.target.checked });
  };

  loadNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;
    let { PageSize, CurrentPage, FullDetails, endDate, startDate } = this.state;

    // this.setState({PageSize: sizeOfPage});

    // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
    // this.getTransactionChannels(params);
    let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${nextPage}&CurrentSelectedPage=${nextPage}`;

    if (tempData) {
      dispatch(loanActions.getLoanPAR(params, tempData));
    } else {
      dispatch(loanActions.getLoanPAR(params));
    }
  };

  searchTxtn = (e, tempData) => {
    e.preventDefault();
    const { dispatch } = this.props;
    let { PageSize, CurrentPage, SearchText, endDate, startDate } = this.state;

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
      let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;

      if (tempData) {
        dispatch(loanActions.getLoanPAR(params, tempData));
      } else {
        dispatch(loanActions.getLoanPAR(params));
      }
    }
  };

  renderLoansPAR = () => {
    let getLoanPARRequest = this.props.getLoanPARRequest;

    // let saveRequestData= getLoanPARRequest.request_data!==undefined?getLoanPARRequest.request_data.tempData:null;
    let saveRequestData =
      getLoanPARRequest.request_data !== undefined
        ? getLoanPARRequest.request_data.tempData
        : null;

    switch (getLoanPARRequest.request_status) {
      case loanAndDepositsConstants.LOAN_PAR_PENDING:
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
                    <th>Maturity Date</th>
                    <th>DPD</th>
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
                    <th>Maturity Date</th>
                    <th>DPD</th>
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
                  </tr>
                </thead>
                <tbody>
                  {saveRequestData.map((eachData, index) => {
                    return (
                      <Fragment key={index}>
                        <tr key={index}>
                          <td>{index + 1}</td>
                          {/* <td>{eachData.id}</td> */}
                          <td>
                            <NavLink to={`/customer/${eachData.clientKey}`}>
                              {' '}
                              {eachData.clientName}
                            </NavLink>
                          </td>
                          <td>
                            <NavLink
                              to={`/customer/${eachData.clientKey}/loanaccount/${eachData.encodedKey}`}
                            >
                              {' '}
                              {eachData.accountNumber}
                            </NavLink>
                          </td>
                          <td>
                            {eachData.loanAmount !== null &&
                            eachData.loanAmount > 0
                              ? `${numberWithCommas(eachData.loanAmount, true)}`
                              : '-'}
                          </td>
                          <td>
                            {eachData.maturityDate !== null &&
                            eachData.maturityDate !== ''
                              ? eachData.maturityDate
                              : '-'}
                          </td>
                          <td>
                            {eachData.daysPassDue !== null
                              ? `${numberWithCommas(
                                  eachData.daysPassDue,
                                  false
                                )}`
                              : '-'}
                          </td>
                          {this.state.showAmountExpected === true && (
                            <td>
                              {eachData.principalExpected !== null &&
                              eachData.principalExpected > 0
                                ? `${numberWithCommas(
                                    eachData.principalExpected,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountExpected === true && (
                            <td>
                              {eachData.interestExpected !== null &&
                              eachData.interestExpected > 0
                                ? `${numberWithCommas(
                                    eachData.interestExpected,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountExpected === true && (
                            <td>
                              {eachData.feesExpected !== null &&
                              eachData.feesExpected > 0
                                ? `${numberWithCommas(
                                    eachData.feesExpected,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountExpected === true && (
                            <td className='borderdright'>
                              {eachData.penaltyExpected !== null &&
                              eachData.penaltyExpected > 0
                                ? `${numberWithCommas(
                                    eachData.penaltyExpected,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountExpected === true && (
                            <td className='borderdright'>
                              {eachData.totalExpected !== null &&
                              eachData.totalExpected > 0
                                ? `${numberWithCommas(
                                    eachData.totalExpected,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountPaid && (
                            <td>
                              {eachData.principalPaid !== null &&
                              eachData.principalPaid > 0
                                ? `${numberWithCommas(
                                    eachData.principalPaid,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountPaid && (
                            <td>
                              {eachData.feePaid !== null && eachData.feePaid > 0
                                ? `${numberWithCommas(eachData.feePaid, true)}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountPaid && (
                            <td>
                              {eachData.interestPaid !== null &&
                              eachData.interestPaid > 0
                                ? `${numberWithCommas(
                                    eachData.interestPaid,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountPaid && (
                            <td className='borderdright'>
                              {eachData.penaltyPaid !== null &&
                              eachData.penaltyPaid > 0
                                ? `${numberWithCommas(
                                    eachData.penaltyPaid,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {this.state.showAmountPaid && (
                            <td className='borderdright'>
                              {eachData.totalPaid !== null &&
                              eachData.totalPaid > 0
                                ? `${numberWithCommas(
                                    eachData.totalPaid,
                                    true
                                  )}`
                                : '-'}
                            </td>
                          )}
                          {/* {this.state.showAmountDue &&
                                                                <td>{(eachData.principalDue !== null && eachData.principalDue > 0) ? `${numberWithCommas(eachData.principalDue, true)}` : "-"}</td>
                                                            } */}

                          {/* {this.state.showAmountDue &&
                                                                <td>{(eachData.interestDue !== null && eachData.interestDue > 0) ? `${numberWithCommas(eachData.interestDue, true)}` : "-"}</td>
                                                            } */}
                          {/* {this.state.showAmountDue &&
                                                                <td>{(eachData.feeDue !== null && eachData.feeDue > 0) ? `${numberWithCommas(eachData.feeDue, true)}` : "-"}</td>
                                                            } */}
                          {/* {this.state.showAmountDue &&
                                                                <td>{(eachData.penaltyDue !== null && eachData.penaltyDue > 0) ? `${numberWithCommas(eachData.penaltyDue, true)}` : "-"}</td>
                                                            } */}
                          {this.state.showAmountDue && (
                            <td className='borderdright'>
                              {eachData.totalDue !== null &&
                              eachData.totalDue > 0
                                ? `${numberWithCommas(eachData.totalDue, true)}`
                                : '-'}
                            </td>
                          )}
                          {/* <td>{(eachData.totalBalance !==null && eachData.totalBalance>0) ? numberWithCommas(eachData.totalBalance, true) : "-"}</td> */}
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

      case loanAndDepositsConstants.LOAN_PAR_SUCCESS:
        let loansPAR = getLoanPARRequest.request_data.response.data;
        if (loansPAR !== undefined) {
          if (loansPAR.result.length >= 1) {
            return (
              <div>
                <div className='heading-with-cta'>
                  <Form
                    className='one-liner'
                    onSubmit={(e) => this.searchTxtn(e, loansPAR.result)}
                  >
                    <Form.Group
                      controlId='filterDropdown'
                      className='no-margins pr-10'
                    ></Form.Group>

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
                        onClick={this.exportLoansPAR}
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
                      onChange={(e) => this.setPagesize(e, loansPAR.result)}
                      value={this.state.PageSize}
                      className='countdropdown form-control form-control-sm'
                    >
                      <option value='10'>10</option>
                      <option value='25'>25</option>
                      <option value='50'>50</option>
                      <option value='200'>200</option>
                    </select>

                    <TablePagination
                      totalPages={loansPAR.totalPages}
                      currPage={loansPAR.currentPage}
                      currRecordsCount={loansPAR.result.length}
                      totalRows={loansPAR.totalRows}
                      tempData={loansPAR.result}
                      pagesCountToshow={4}
                      refreshFunc={this.loadNextPage}
                    />
                  </div>
                </div>
                {/* <div className="Table-helper">
                                    <input type="checkbox" name=""
                                        onChange={(e)=>this.setShowDetails(e, loansPAR.result)}
                                        checked={this.state.FullDetails}
                                        id="showFullDetails" />
                                    <label htmlFor="showFullDetails">Show full details</label>
                                </div> */}
                <div className='table-helper'>
                  <input
                    type='checkbox'
                    name=''
                    onChange={(e) => this.setPARFilter(e, 'showAmountExpected')}
                    checked={this.state.showAmountExpected}
                    id='showAmountExpected'
                  />
                  <label htmlFor='showAmountExpected'>Amount Expected</label>
                  <input
                    type='checkbox'
                    name=''
                    onChange={(e) => this.setPARFilter(e, 'showAmountPaid')}
                    checked={this.state.showAmountPaid}
                    id='showAmountPaid'
                  />
                  <label htmlFor='showAmountPaid'>Amount Paid</label>
                  <input
                    type='checkbox'
                    name=''
                    onChange={(e) => this.setPARFilter(e, 'showAmountDue')}
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
                      <th>Maturity Date</th>
                      <th>DPD</th>
                      {this.state.showAmountExpected === true && (
                        <th>Expected Principal</th>
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
                      {this.state.showAmountPaid && <th>Principal Paid</th>}
                      {this.state.showAmountPaid && <th>Fees Paid</th>}
                      {this.state.showAmountPaid && <th>Interest Paid</th>}
                      {this.state.showAmountPaid && (
                        <th className=''>Penalty Paid</th>
                      )}
                      {this.state.showAmountPaid && (
                        <th className='borderdright'>Total Paid</th>
                      )}
                      {/* {this.state.showAmountDue &&
                                                <th>Principal Due</th>
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
                    </tr>
                  </thead>
                  <tbody>
                    {loansPAR.result.map((eachData, index) => {
                      return (
                        <Fragment key={index}>
                          <tr key={index}>
                            <td>{index + 1}</td>
                            {/* <td>{eachData.id}</td> */}
                            <td>
                              <NavLink to={`/customer/${eachData.clientKey}`}>
                                {' '}
                                {eachData.clientName}
                              </NavLink>
                            </td>
                            <td>
                              <NavLink
                                to={`/customer/${eachData.clientKey}/loanaccount/${eachData.encodedKey}`}
                              >
                                {' '}
                                {eachData.accountNumber}
                              </NavLink>
                            </td>
                            <td>
                              {eachData.loanAmount !== null &&
                              eachData.loanAmount > 0
                                ? `${numberWithCommas(
                                    eachData.loanAmount,
                                    true
                                  )}`
                                : '-'}
                            </td>
                            <td>
                              {eachData.maturityDate !== null &&
                              eachData.maturityDate !== ''
                                ? eachData.maturityDate
                                : '-'}
                            </td>
                            {eachData.daysPassDue !== null &&
                              eachData.daysPassDue === 0 && (
                                <td className='amber-color'>0</td>
                              )}

                            {eachData.daysPassDue !== null &&
                              eachData.daysPassDue > 0 && (
                                <td className='red-color'>
                                  {numberWithCommas(
                                    eachData.daysPassDue,
                                    false
                                  )}
                                </td>
                              )}

                            {eachData.daysPassDue !== null &&
                              eachData.daysPassDue < 0 && (
                                <td className='green-color'>0</td>
                              )}

                            {eachData.daysPassDue === null && <td>-</td>}

                            {this.state.showAmountExpected === true && (
                              <td>
                                {eachData.principalExpected !== null &&
                                eachData.principalExpected > 0
                                  ? `${numberWithCommas(
                                      eachData.principalExpected,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountExpected === true && (
                              <td>
                                {eachData.interestExpected !== null &&
                                eachData.interestExpected > 0
                                  ? `${numberWithCommas(
                                      eachData.interestExpected,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountExpected === true && (
                              <td>
                                {eachData.feesExpected !== null &&
                                eachData.feesExpected > 0
                                  ? `${numberWithCommas(
                                      eachData.feesExpected,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountExpected === true && (
                              <td className='borderdright'>
                                {eachData.penaltyExpected !== null &&
                                eachData.penaltyExpected > 0
                                  ? `${numberWithCommas(
                                      eachData.penaltyExpected,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountExpected === true && (
                              <td className='borderdright'>
                                {eachData.totalExpected !== null &&
                                eachData.totalExpected > 0
                                  ? `${numberWithCommas(
                                      eachData.totalExpected,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountPaid && (
                              <td>
                                {eachData.principalPaid !== null &&
                                eachData.principalPaid > 0
                                  ? `${numberWithCommas(
                                      eachData.principalPaid,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountPaid && (
                              <td>
                                {eachData.feePaid !== null &&
                                eachData.feePaid > 0
                                  ? `${numberWithCommas(
                                      eachData.feePaid,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountPaid && (
                              <td>
                                {eachData.interestPaid !== null &&
                                eachData.interestPaid > 0
                                  ? `${numberWithCommas(
                                      eachData.interestPaid,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountPaid && (
                              <td className='borderdright'>
                                {eachData.penaltyPaid !== null &&
                                eachData.penaltyPaid > 0
                                  ? `${numberWithCommas(
                                      eachData.penaltyPaid,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {this.state.showAmountPaid && (
                              <td className='borderdright'>
                                {eachData.totalPaid !== null &&
                                eachData.totalPaid > 0
                                  ? `${numberWithCommas(
                                      eachData.totalPaid,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {/* {this.state.showAmountDue &&
                                                                <td>{(eachData.principalDue !== null && eachData.principalDue > 0) ? `${numberWithCommas(eachData.principalDue, true)}` : "-"}</td>
                                                            } */}

                            {/* {this.state.showAmountDue &&
                                                                <td>{(eachData.interestDue !== null && eachData.interestDue > 0) ? `${numberWithCommas(eachData.interestDue, true)}` : "-"}</td>
                                                            } */}
                            {/* {this.state.showAmountDue &&
                                                                <td>{(eachData.feeDue !== null && eachData.feeDue > 0) ? `${numberWithCommas(eachData.feeDue, true)}` : "-"}</td>
                                                            } */}
                            {/* {this.state.showAmountDue &&
                                                                <td>{(eachData.penaltyDue !== null && eachData.penaltyDue > 0) ? `${numberWithCommas(eachData.penaltyDue, true)}` : "-"}</td>
                                                            } */}
                            {this.state.showAmountDue && (
                              <td className='borderdright'>
                                {eachData.totalDue !== null &&
                                eachData.totalDue > 0
                                  ? `${numberWithCommas(
                                      eachData.totalDue,
                                      true
                                    )}`
                                  : '-'}
                              </td>
                            )}
                            {/* <td>{(eachData.totalBalance !==null && eachData.totalBalance>0) ? numberWithCommas(eachData.totalBalance, true) : "-"}</td> */}
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
                    onSubmit={(e) => this.searchTxtn(e, loansPAR.result)}
                  >
                    <Form.Group
                      controlId='filterDropdown'
                      className='no-margins pr-10'
                    ></Form.Group>

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
                      <th>Maturity Date</th>
                      <th>DPD</th>
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
      case loanAndDepositsConstants.LOAN_PAR_FAILURE:
        return (
          <div className='loading-content errormsg'>
            <div>{getLoanPARRequest.request_data.error}</div>
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
                        <h2>Loans PAR</h2>
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
                        {this.renderLoansPAR()}
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
    getLoanPARRequest: state.loansReducers.getLoanPARReducer,
  };
}
export default connect(mapStateToProps)(LoanPAR);
