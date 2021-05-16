import * as React from 'react';
// import {Router} from "react-router";

import { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import InnerPageContainer from '../../shared/templates/authed-pagecontainer';
import TableComponent from '../../shared/elements/table';
import TablePagination from '../../shared/elements/table/pagination';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton'
import { numberWithCommas, getDateFromISO } from '../../shared/utils';
import { depositActions } from "../../redux/actions/deposits/deposits.action";
import ViewACheque from '../../shared/components/view-cheque'
import { loanAndDepositsConstants } from "../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants";

import ChequeNav from './_menu';
import DatePickerFieldType from '../../_helpers/DatePickerFieldType';
class ChequeManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      PageSize: 25,
      CurrentPage: 1,
      
      endDate: '',
      startDate: '',
      SearchText: '',
    };
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = () => {
    let { PageSize, CurrentPage } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
    this.getCheques(params);
  };

  getCheques = (paramters) => {
    const { dispatch } = this.props;

    dispatch(depositActions.getAllCheques(paramters, "all"));
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

  setPagesize = (PageSize, tempData) => {
    // console.log('----here', PageSize.target.value);
    const { dispatch } = this.props;
    let sizeOfPage = PageSize.target.value,
      { CurrentPage, SearchText, startDate, endDate } = this.state;

    this.setState({ PageSize: sizeOfPage });

    let params = `&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
    

    if (tempData) {
      dispatch(depositActions.getAllCheques(params, "all", tempData));
    } else {
      dispatch(depositActions.getAllCheques(params, "all"));
    }
  };

  

 

  loadNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;
    let { PageSize, CurrentPage, SearchText, startDate, endDate } = this.state;

    // this.setState({PageSize: sizeOfPage});

    // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
    // this.getTransactionChannels(params);
    let params = `&PageSize=${PageSize}&CurrentPage=${nextPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;

    if (tempData) {
      dispatch(depositActions.getAllCheques(params, "all", tempData));
    } else {
      dispatch(depositActions.getAllCheques(params, "all"));
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
        dispatch(depositActions.getAllCheques(params, "all", tempData));
      } else {
        dispatch(depositActions.getAllCheques(params, "all"));
      }
    }
  };

  

  

  renderAllCheques = () => {
    let getChequesReducer = this.props.getChequesReducer;
    let saveRequestData =
      getChequesReducer.request_data !== undefined
        ? getChequesReducer.request_data.tempData
        : null;
    switch (getChequesReducer.request_status) {
      case loanAndDepositsConstants.GET_CHEQUES_PENDING:
        if (
          saveRequestData === undefined ||
          (saveRequestData !== undefined && saveRequestData.result.length < 1)
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
                    value={this.state.PageSize}
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
                    <th>Cheque No</th>
                    <th>Cheque Transaction</th>
                    <th>Cheque Amount </th>
                    <th>Cheque State </th>
                    <th>Request Date </th>
                    <th>Reference ID </th>
                    <th>Remarks </th>
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
                        <th>Cheque No</th>
                        <th>Cheque Transaction</th>
                        <th>Cheque Amount </th>
                        <th>Cheque State </th>
                        <th>Request Date </th>
                        <th>Reference ID </th>
                        <th>Remarks </th>
                    </tr>
                </thead>
                <tbody>
                  {saveRequestData.result.map((eachRequest, index) => {
                    return (
                      <Fragment key={index}>
                        <tr>
                            <td>{eachRequest.chequeNo} </td>
                            <td>{eachRequest.chequeClearingTransactionTypeDesc} </td>
                            <td>{numberWithCommas(eachRequest.chequeAmount, true, true)} {eachRequest.currencyCode} </td>
                            <td>{eachRequest.chequeClearingStateDesc} </td>
                            <td>{getDateFromISO(eachRequest.requestDate, true)} </td>
                            <td>{eachRequest.referenceId} </td>
                            <td>{eachRequest.remarks} </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </TableComponent>
            </div>
          );
        }
      case loanAndDepositsConstants.GET_CHEQUES_SUCCESS:
        let allCheques =
            getChequesReducer.request_data.response.data,
          currentItemState;

        if (allCheques !== undefined) {
          if (allCheques.result.length >= 1) {
            return (
              <div>
                <div className='heading-with-cta'>
                  <Form
                    className='one-liner'
                    onSubmit={(e) => this.searchTxtn(e, allCheques.result)}
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
                      onChange={(e) => this.setPagesize(e, allCheques)}
                      value={this.state.PageSize}
                      className='countdropdown form-control form-control-sm'
                    >
                      <option value='10'>10</option>
                      <option value='25'>25</option>
                      <option value='50'>50</option>
                      <option value='200'>200</option>
                    </select>
                    <TablePagination
                      totalPages={allCheques.totalPages}
                      currPage={allCheques.currentPage}
                      currRecordsCount={allCheques.result.length}
                      totalRows={allCheques.totalRows}
                      tempData={allCheques.result}
                      pagesCountToshow={4}
                      refreshFunc={this.loadNextPage}
                    />
                  </div>
                </div>
                <TableComponent classnames='striped bordered hover'>
                  <thead>
                    <tr>
                        <th>Cheque No</th>
                        <th>Cheque Transaction</th>
                        <th>Cheque Amount </th>
                        <th>Cheque State </th>
                        <th>Request Date </th>
                        <th>Reference ID </th>
                        <th>Remarks </th>
                        <th>Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {allCheques.result.map((eachRequest, index) => {
                      

                      return (
                        <Fragment key={index}>
                          <tr>
                                <td>{eachRequest.chequeNo} </td>
                                <td>{eachRequest.chequeClearingTransactionTypeDesc} </td>
                                <td>{numberWithCommas(eachRequest.chequeAmount, true, true)} {eachRequest.currencyCode} </td>
                                <td>{eachRequest.chequeClearingStateDesc} </td>
                                <td>{getDateFromISO(eachRequest.requestDate, true)} </td>
                                <td>{eachRequest.referenceId} </td>
                                <td>{eachRequest.remarks} </td>
                                <td>
                                  <DropdownButton
                                    size='sm'
                                    title='Actions'
                                    key='activeCurrency'
                                    className='customone'
                                  >
                                    
                                    <Dropdown.Item onClick={()=>this.handleShowCheque(eachRequest)} eventKey='1'>View</Dropdown.Item>
                                  </DropdownButton>
                                </td>
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
                    onSubmit={(e) => this.searchTxtn(e, allCheques.result)}
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
                  </Form>

                  <div className='pagination-wrap'>
                    <label htmlFor='toshow'>Show</label>
                    <select
                      id='toshow'
                      className='countdropdown form-control form-control-sm'
                      value={this.state.PageSize}
                    >
                      <option value='10'>10</option>
                      
                      <option value='50'>50</option>
                      <option value='200'>200</option>
                    </select>
                  </div>
                </div>
                <TableComponent classnames='striped bordered hover'>
                <thead>
                  <tr>
                    <th>Cheque No</th>
                    <th>Cheque Transaction</th>
                    <th>Cheque Amount </th>
                    <th>Cheque State </th>
                    <th>Request Date </th>
                    <th>Reference ID </th>
                    <th>Remarks </th>
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
                  </tr>
                </tbody>
                </TableComponent>
              </div>
            );
          }
        } else {
          return null;
        }

      case loanAndDepositsConstants.GET_CHEQUES_FAILURE:
        return (
          <div className='loading-content errormsg'>
            <div>{getChequesReducer.request_data.error}</div>
          </div>
        );
      default:
        return null;
    }
  };

  handleShowCheque = (chequeSelected) => {
    this.props.dispatch(depositActions.updateACheque("CLEAR"))
    this.setState({chequeSelected,  displayCheque: true })
  };
  handleCloseChequeView = () => {
    
    this.setState({ displayCheque: false })
  };

  render() {
    const {  transactionReference } = this.state;
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
                        <h2>All Cheques</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='module-submenu'>
                <div className='content-container'>
                  <ChequeNav />
                  <ViewACheque source="all" headingText="Cheque Details" chequeSelected={this.state.chequeSelected} closeViewCheque={this.handleCloseChequeView} displayCheque={this.state.displayCheque} />
                </div>
              </div>
              <div className='module-content'>
                <div className='content-container'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='middle-content'>
                        {this.renderAllCheques()}

                        
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
    getChequesReducer: state.depositsReducers.getChequesReducer,
  };
}

export default connect(mapStateToProps)(ChequeManagement);
