import * as React from 'react';
// import {Router} from "react-router";

import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import InnerPageContainer from '../../shared/templates/authed-pagecontainer';
import TableComponent from '../../shared/elements/table';
import TablePagination from '../../shared/elements/table/pagination';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './disbursements.scss';

import { disbursementActions } from '../../redux/actions/disbursment/disbursment.action';
import { disbursmentConstants } from '../../redux/actiontypes/disbursment/disbursment.constants';
import DisbursementNav from './_menu';
import { numberWithCommas, getDateFromISO } from '../../shared/utils';
import DatePickerFieldType from '../../_helpers/DatePickerFieldType';
class NipOutwardsRequests extends React.Component {
  constructor(props) {
    super(props);
    let today = new Date();
    this.state = {
      user: '',
      PageSize: 25,
      CurrentPage: 1,
      isRefresh: false,
      endDate: new Date(),
      startDate: new Date(new Date().setDate(today.getDate() - 30)),
      // startDate : new Date (),
      searchText: '',
    };
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = () => {
    let { PageSize, CurrentPage, startDate, endDate, searchText } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate.toISOString()}&EndDate=${endDate.toISOString()}&SearchText=${searchText}`;
    this.getOutwardsNIPData(params);
  };

  getOutwardsNIPData = (paramters) => {
    const { dispatch } = this.props;

    dispatch(disbursementActions.getOutwardsNIP(paramters));
  };

  handleDateChangeRaw = (e) => {
    e.preventDefault();
  };
  handleStartDatePicker = (startDate) => {
    startDate.setHours(startDate.getHours() + 1);

    this.setState({ startDate }, () => {
      if (this.state.endDate !== '') {
        // this.loadInitialData();
      }
    });
  };

  handleEndDatePicker = (endDate) => {
    endDate.setHours(endDate.getHours() + 1);

    this.setState({ endDate }, () => {
      if (this.state.startDate !== '') {
        // this.getHistory();
      }
    });
  };
  setPagesize = (PageSize, tempData) => {
    // console.log('----here', PageSize.target.value);
    const { dispatch } = this.props;
    // let {CurrentPage}= this.state;

    let sizeOfPage = PageSize.target.value;

    this.setState({ PageSize: sizeOfPage, isRefresh: true });
    let { CurrentPage, startDate, endDate, searchText } = this.state;
    let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&StartDate=${startDate.toISOString()}&EndDate=${endDate.toISOString()}&SearchText=${searchText}`;
    // let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;

    if (tempData) {
      dispatch(disbursementActions.getOutwardsNIP(params, tempData));
    } else {
      dispatch(disbursementActions.getOutwardsNIP(params));
    }

    // dispatch(disbursementActions.getOutwardsNIP(params));
  };

  loadNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;
    // let {PageSize} = this.state;

    let { PageSize, CurrentPage, startDate, endDate, searchText } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${nextPage}&StartDate=${startDate.toISOString()}&EndDate=${endDate.toISOString()}&SearchText=${searchText}`;

    // let params = `PageSize=${PageSize}&CurrentPage=${nextPage}`;

    if (tempData) {
      dispatch(disbursementActions.getOutwardsNIP(params, tempData));
    } else {
      dispatch(disbursementActions.getOutwardsNIP(params));
    }
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

      if (tempData) {
        dispatch(disbursementActions.getOutwardsNIP(params, tempData));
      } else {
        dispatch(disbursementActions.getOutwardsNIP(params));
      }
    }
  };

  exportNipOutwards = () => {
    let {
      PageSize,
      CurrentPage,
      BranchId,
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
    let paramters = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&BranchId=${BranchId}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
    const { dispatch } = this.props;

    dispatch(disbursementActions.exportOutwardsNIP(paramters));
  };

  renderOutWardsRequest = () => {
    let getOutwardsNIPRequestData = this.props.getOutwardsNIPReducer,
      { isRefresh } = this.state;

    let saveRequestData =
      getOutwardsNIPRequestData.request_data !== undefined
        ? getOutwardsNIPRequestData.request_data.tempData
        : null;
    if (
      getOutwardsNIPRequestData.request_status ===
      disbursmentConstants.GET_NIP_OUTWARDS_PENDING
    ) {
      if (saveRequestData === undefined) {
        return (
          <div className='loading-content'>
            <div className='loading-text'>Please wait... </div>
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
                <Button className='no-margins' variant='primary' type='submit'>
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
                  <th>Transaction Date</th>
                  <th>Source Account Number</th>
                  <th>Source Account Name</th>
                  <th>Source Bank</th>
                  <th>Destination Account Number</th>
                  <th>Destination Account Name</th>
                  <th>Destination Bank</th>
                  <th>Amount</th>
                  <th>Fee</th>
                  <th>Narration</th>
                  <th>Status Code</th>
                  <th>Session ID</th>
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
                  <div>
                    <Form.Label>Start Date</Form.Label>
                    <DatePicker
                      onChangeRaw={this.handleDateChangeRaw}
                      onChange={this.handleStartDatePicker}
                      selected={this.state.startDate}
                      dateFormat={window.dateformat}
                      peekNextMonth showMonthDropdown showYearDropdown
                      dropdownMode="select" placeholderText="Start date"
                      autoComplete="new-password" maxDate={new Date()}
                    // className="form-control form-control-sm h-38px"
                    />
                    {/* className="form-control form-control-sm " /> */}
                  </div>
                  <div>
                    <Form.Label>End Date</Form.Label>
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
                  </div>
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
                <Button className='no-margins' variant='primary' type='submit'>
                  Filter
                </Button>
              </Form>

              <div className='pagination-wrap'>
                <label htmlFor='toshow'>Show</label>
                <select
                  id='toshow'
                  value={this.state.PageSize}
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
                  <th>Transaction Date</th>
                  <th>Source Account Number</th>
                  <th>Source Account Name</th>
                  <th>Source Bank</th>
                  <th>Destination Account Number</th>
                  <th>Destination Account Name</th>
                  <th>Destination Bank</th>
                  <th>Amount</th>
                  <th>Fee</th>
                  <th>Narration</th>
                  <th>Status Code</th>
                  <th>Session ID</th>
                </tr>
              </thead>
              <tbody>
                {saveRequestData.map((eachRequest, index) => {
                  return (
                    <Fragment key={index}>
                      <tr>
                        {/* <td>{eachActivity.id}</td> */}
                        <td>
                          {getDateFromISO(
                            eachRequest.transactionDate,
                            true,
                            true
                          )}
                        </td>
                        <td>{eachRequest.sourceAccountNumber}</td>
                        <td>{eachRequest.sourceAccountName}</td>
                        <td>{eachRequest.originInstitutionName}</td>
                        <td>{eachRequest.destinationAccountNumber}</td>
                        <td>{eachRequest.destinationAccountName}</td>
                        <td>{eachRequest.destinationInstitutionName}</td>
                        <td>
                          
                          {numberWithCommas(eachRequest.amount, true, true)}
                        </td>
                        <td>
                          
                          {numberWithCommas(eachRequest.fee, true, true)}
                        </td>
                        <td>{eachRequest.narration}</td>
                        <td>{eachRequest.statusCode}</td>
                        <td>{eachRequest.sessionId}</td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </TableComponent>
          </div>
        );
      }
    }

    if (
      getOutwardsNIPRequestData.request_status ===
      disbursmentConstants.GET_NIP_OUTWARDS_SUCCESS
    ) {
      let allNIPRequestData =
        getOutwardsNIPRequestData.request_data.response.data;

      if (allNIPRequestData.result !== undefined) {
        if (allNIPRequestData.result.length >= 1) {
          return (
            <div>
              <div className='heading-with-cta'>
                <Form
                  className='one-liner'
                  onSubmit={(e) => this.searchTxtn(e, allNIPRequestData.result)}
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
                    <div>
                      {/* <Form.Label>Start Date</Form.Label> */}
                      <DatePicker
                        onChangeRaw={this.handleDateChangeRaw}
                        onChange={this.handleStartDatePicker}
                        selected={this.state.startDate}
                        dateFormat={window.dateformat}
                        peekNextMonth showMonthDropdown showYearDropdown
                        dropdownMode="select" placeholderText="Start date"
                        autoComplete="new-password" maxDate={new Date()}
                      // className="form-control form-control-sm h-38px"
                      />
                      {/* className="form-control form-control-sm " /> */}
                    </div>
                    <div>
                      {/* <Form.Label>Start Date</Form.Label> */}
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
                    </div>
                    <div>
                      {/* <Form.Label></Form.Label> */}
                      <input
                        type='text'
                        className='form-control-sm search-table form-control'
                        placeholder='Search text'
                        value={this.state.SearchText}
                        onChange={(e) => {
                          this.setState({ SearchText: e.target.value.trim() });
                        }}
                      />
                    </div>
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
                      onClick={this.exportNipOutwards}
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
                      this.setPagesize(e, allNIPRequestData.result)
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
                    totalPages={allNIPRequestData.totalPages}
                    currPage={allNIPRequestData.currentPage}
                    currRecordsCount={allNIPRequestData.result.length}
                    totalRows={allNIPRequestData.totalRows}
                    tempData={allNIPRequestData.result}
                    pagesCountToshow={4}
                    refreshFunc={this.loadNextPage}
                  />
                </div>
              </div>
              <TableComponent classnames='striped bordered hover'>
                <thead>
                  <tr>
                    <th>Transaction Date</th>
                    <th>Source Account Number</th>
                    <th>Source Account Name</th>
                    <th>Source Bank</th>
                    <th>Destination Account Number</th>
                    <th>Destination Account Name</th>
                    <th>Destination Bank</th>
                    <th>Amount</th>
                    <th>Fee</th>
                    <th>Narration</th>
                    <th>Status Code</th>
                    <th>Session ID</th>
                  </tr>
                </thead>
                <tbody>
                  {allNIPRequestData.result.map((eachRequest, index) => {
                    return (
                      <Fragment key={index}>
                        <tr>
                          {/* <td>{eachActivity.id}</td> */}
                          <td>
                            {getDateFromISO(
                              eachRequest.transactionDate,
                              true,
                              true
                            )}
                          </td>
                          <td>{eachRequest.sourceAccountNumber}</td>
                          <td>{eachRequest.sourceAccountName}</td>
                          <td>{eachRequest.originInstitutionName}</td>
                          <td>{eachRequest.destinationAccountNumber}</td>
                          <td>{eachRequest.destinationAccountName}</td>
                          <td>{eachRequest.destinationInstitutionName}</td>
                          <td>
                            
                            {numberWithCommas(eachRequest.amount, true, true)}
                          </td>
                          <td>
                            
                            {numberWithCommas(eachRequest.fee, true, true)}
                          </td>
                          <td>{eachRequest.narration}</td>
                          <td>{eachRequest.statusCode}</td>
                          <td>{eachRequest.sessionId}</td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </TableComponent>
            </div>
          );
        } else {
          return (
            <div>
              <div className='heading-with-cta'>
                <Form
                  className='one-liner'
                  onSubmit={(e) => this.searchTxtn(e, allNIPRequestData.result)}
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
                </Form>

                <div className='pagination-wrap'>
                  <label htmlFor='toshow'>Show</label>
                  <select
                    id='toshow'
                    // onChange={this.setPagesize}
                    value={this.state.PageSize}
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
                    <th>Transaction Date</th>
                    <th>Source Account Number</th>
                    <th>Source Account Name</th>
                    <th>Source Bank</th>
                    <th>Destination Account Number</th>
                    <th>Destination Account Name</th>
                    <th>Destination Bank</th>
                    <th>Amount</th>
                    <th>Fee</th>
                    <th>Narration</th>
                    <th>Status Code</th>
                    <th>Session ID</th>
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
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </TableComponent>
            </div>
          );
        }
      } else {
        return null;
      }
    }

    if (
      getOutwardsNIPRequestData.request_status ===
      disbursmentConstants.GET_NIP_OUTWARDS_FAILURE
    ) {
      return (
        <div className='loading-content errormsg'>
          <div>{getOutwardsNIPRequestData.request_data.error}</div>
        </div>
      );
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
                        <h2>Nip Outwards Requests</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='module-submenu'>
                <div className='content-container'>
                  <DisbursementNav />
                  {/* <ul className="nav">
                                        <li>
                                            <NavLink exact to={'/disbursements'}>Disbursements</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/initiate'}>Initiate Disbursement</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/pending-review'}>Pending Review</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/pending-approval'}>Pending Approval</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/nip-requests'}>NIP Requests</NavLink>
                                           
                                        </li>
                                    </ul> */}
                </div>
              </div>
              <div className='module-submenu'>
                <div className='content-container'>
                  <div className='lowerlevel-menu'>
                    <ul className='nav'>
                      <li>
                        {/* <NavLink to={'/administration-generalorganization'}>Organization</NavLink> */}
                        <NavLink exact to={'/disbursements/nip-requests'}>
                          Inwards
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          exact
                          to={'/disbursements/nip-requests/outwards'}
                        >
                          Outwards
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className='module-content'>
                <div className='content-container'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='middle-content'>
                        {/* <div className="heading-with-cta">
                                                    <h3 className="section-title">Disbursement</h3>
                                                </div> */}
                        {this.renderOutWardsRequest()}
                        {/* <div className="heading-with-cta">
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
                                                            <th>GL Code</th>
                                                            <th>Account Name</th>
                                                            <th></th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td></td>
                                                            <td></td>
                                                            <td></td>

                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>some text</td>

                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>

                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>

                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>

                                                        </tr>
                                                    </tbody>
                                                </TableComponent> */}
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
    getOutwardsNIPReducer: state.disbursmentReducers.getOutwardsNIPReducer,
    exportOutwardsNIPReducer:
      state.disbursmentReducers.exportOutwardsNIPReducer,
  };
}

export default connect(mapStateToProps)(NipOutwardsRequests);
