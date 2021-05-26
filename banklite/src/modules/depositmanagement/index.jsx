import * as React from "react";
// import {Router} from "react-router";

import { Fragment } from "react";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import InnerPageContainer from "../../shared/templates/authed-pagecontainer";
import TableComponent from "../../shared/elements/table";
import TablePagination from "../../shared/elements/table/pagination";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import DatePicker from "react-datepicker";
import { numberWithCommas, getDateFromISO } from "../../shared/utils";
import { depositActions } from "../../redux/actions/deposits/deposits.action";
import { loanAndDepositsConstants } from "../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants";
import "./depositmanagement.scss";
import DatePickerFieldType from "../../_helpers/DatePickerFieldType";
import SubMenu from "../../shared/components/SubMenu";

import { DEPOSIT_MODULE_MENU_LINKS } from "../../shared/config";

class DepositManagement extends React.Component {
  constructor(props) {
    super(props);
    this.initializeState();

    this.userPermissions = JSON.parse(localStorage.getItem("x-u-perm"));
  }

  initializeState = () => {
    this.state = {
      user: "",
      PageSize: "10",
      FullDetails: false,
      CurrentPage: 1,
      CurrentSelectedPage: 1,
      endDate: "",
      startDate: "",
      SearchText: "",
    };
    return this.state;
  };

  componentDidMount() {
    this.retrieveFromApi();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.depositState !== prevProps.depositState) {
      this.setState(this.initializeState(), function () {
        this.retrieveFromApi();
      });
    }
  }

  setPagesize = (event, tempData) => {
    this.setState({ PageSize: event.target.value }, function () {
      this.retrieveFromApi(tempData);
    });
  };

  loadNextPage = (nextPage, tempData) => {
    //next Page and tempData are properties of the TablePagination

    this.setState({ CurrentPage: nextPage }, function () {
      this.retrieveFromApi(tempData);
    });
  };

  setShowDetails = (event, tempData) => {
    const { dispatch } = this.props;
    let showDetails = event.target.checked;
    this.setState({ FullDetails: showDetails }, function () {
      this.retrieveFromApi(tempData);
    });
  };

  retrieveFromApi = (tempData) => {
    const { dispatch } = this.props;
    //  let  {PageSize,FullDetails, CurrentPage, CurrentSelectedPage} = this.state;

    let {
      PageSize,
      SearchText,
      CurrentPage,
      endDate,
      DepositState,
      startDate,
      FullDetails,
    } = this.state;

    let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&DepositState=${this.props.depositState}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;

    if (tempData) {
      dispatch(depositActions.getDeposits(params, tempData));
    } else {
      dispatch(depositActions.getDeposits(params));
    }
  };

  // getHeaderDescription=()=> {

  //   //this.retrieveFromApi();
  //   switch(this.props.loanState){
  //     case (LoanStateConstants.ALL_LOANS): return  (<div>Loan Accounts (All)</div>);
  //     case (LoanStateConstants.PENDING_APPROVAL): return  (<div>Loan Accounts (Pending Approval)</div>);
  //     case (LoanStateConstants.APPROVED): return  (<div>Loan Accounts (Approved)</div>);
  //     case (LoanStateConstants.REJECTED): return  (<div>Loan Accounts (Rejected)</div>);

  //     case (LoanStateConstants.ACTIVE): return  (<div>Loan Accounts (Active)</div>);
  //     case (LoanStateConstants.IN_ARREARS): return  (<div>Loan Accounts (Active -In Arrears)</div>);
  //     case (LoanStateConstants.CLOSED): return  (<div>Loan Accounts (Closed - All Obligations Met)</div>);
  //     case (LoanStateConstants.CLOSED_WITHDRAWN): return  (<div>Loan Accounts (Closed - Withdrawn)</div>);
  //     case (LoanStateConstants.CLOSED_WRITTEN_OFF): return  (<div>Loan Accounts (Closed - Wwritten Off)</div>);
  // default:             return  (<div>Loan Accounts (All)</div>);
  //   }

  // }

  ///

  // loadInitialData = () => {
  //   let { PageSize, CurrentPage } = this.state;
  //   let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
  //   this.getDeposits(params);
  // };

  // getDeposits = (paramters) => {
  //   const { dispatch } = this.props;

  //   dispatch(depositActions.getDeposits(paramters));
  // };

  exportAllDeposits = () => {
    let {
      PageSize,
      CurrentPage,
      FullDetails,
      BranchId,
      SearchText,
      endDate,
      startDate,
    } = this.state;

    if (endDate !== "") {
      endDate = endDate.toISOString();
    }
    if (startDate !== "") {
      startDate = startDate.toISOString();
    }

    let paramters = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&BranchId=${BranchId}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
    const { dispatch } = this.props;

    dispatch(depositActions.exportDeposits(paramters));
  };

  // setPagesize = (PageSize, tempData) => {
  //   const { dispatch } = this.props;
  //   let sizeOfPage = PageSize.target.value;
  //   this.setState({ PageSize: sizeOfPage });

  //   let {
  //     CurrentPage,
  //     FullDetails,
  //     BranchId,
  //     SearchText,
  //     endDate,
  //     startDate,
  //   } = this.state;

  //   if (endDate !== '') {
  //     endDate = endDate.toISOString();
  //   }
  //   if (startDate !== '') {
  //     startDate = startDate.toISOString();
  //   }

  //   let paramters = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&BranchId=${BranchId}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;

  //   if (tempData) {
  //     dispatch(depositActions.getDeposits(paramters, tempData));
  //   } else {
  //     dispatch(depositActions.getDeposits(paramters));
  //   }
  // };

  handleDateChangeRaw = (e) => {
    e.preventDefault();
  };
  handleStartDatePicker = (startDate) => {
    startDate.setHours(startDate.getHours() + 1);

    this.setState({ startDate }, () => {
      if (this.state.endDate !== "") {
        //this.getHistory();
      }
    });
  };

  handleEndDatePicker = (endDate) => {
    endDate.setHours(endDate.getHours() + 1);

    this.setState({ endDate }, () => {
      if (this.state.startDate !== "") {
        //this.getHistory();
      }
    });
  };
  searchTxtn = (e, tempData) => {
    e.preventDefault();
    const { dispatch } = this.props;
    let {
      PageSize,
      CurrentPage,
      FullDetails,
      BranchId,
      SearchText,
      endDate,
      startDate,
    } = this.state;

    // this.setState({PageSize: sizeOfPage});

    // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
    // this.getTransactionChannels(params);
    if (SearchText !== "" || endDate !== "" || startDate !== "") {
      if (endDate !== "") {
        endDate = endDate.toISOString();
      }
      if (startDate !== "") {
        startDate = startDate.toISOString();
      }
      let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&BranchId=${BranchId}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;

      if (tempData) {
        dispatch(depositActions.getDeposits(params, tempData));
      } else {
        dispatch(depositActions.getDeposits(params));
      }
    }
  };

  fetchForEmptyState = () => {
    //This function returns the biew for empty list
    let getDepositsRequest = this.props.getDepositsRequest;

    // let saveRequestData= getDepositsRequest.request_data!==undefined? getDepositsRequest.request_data.tempData: null;
    switch (getDepositsRequest.request_status) {
      case loanAndDepositsConstants.GET_DEPOSITS_PENDING:
        return (
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
            </tr>
          </tbody>
        );
      default:
        return null;
    }
  };

  fetchErrorState() {
    let getDepositsRequest = this.props.getDepositsRequest;

    switch (getDepositsRequest.request_status) {
      case loanAndDepositsConstants.GET_DEPOSITS_FAILURE:
        return (
          <div className="loading-content errormsg">
            <div>{getDepositsRequest.request_data.error}</div>
          </div>
        );
      default:
        return null;
    }
  }

  fetchForBusyState() {
    let getDepositsRequest = this.props.getDepositsRequest;

    switch (getDepositsRequest.request_status) {
      case loanAndDepositsConstants.GET_DEPOSITS_PENDING:
        return (
          <div className="loading-content">
            <div className="loading-text">Please wait...</div>
          </div>
        );
      default:
        return null;
    }
  }

  fetchForDataState = () => {
    let getDepositsRequest = this.props.getDepositsRequest;

    let allUSerPermissions = [];
    this.userPermissions.map((eachPermission) => {
      allUSerPermissions.push(eachPermission.permissionCode);
    });

    switch (getDepositsRequest.request_status) {
      case loanAndDepositsConstants.GET_DEPOSITS_SUCCESS:
        let allDeposits = getDepositsRequest.request_data.response.data;

        if (allDeposits.result?.length >= 0)
          return (
            <tbody>
              {allDeposits.result.map((eachDeposit, index) => {
                return (
                  <Fragment key={index}>
                    <tr>
                      {/* <td><NavLink to={`/customer/${eachDeposit.clientEncodedKey}/savingsaccount/${eachDeposit.encodedKey}`}> {eachDeposit.accountNumber} </NavLink></td> */}

                      {(eachDeposit.accountState === 4 ||
                        eachDeposit.accountState === 7 ||
                        eachDeposit.accountState === 8 ||
                        eachDeposit.accountState === 9) && (
                        <td>
                          <NavLink
                            to={`/customer/${eachDeposit.clientEncodedKey}/closedaccounts/savings/${eachDeposit.encodedKey}`}
                          >
                            {" "}
                            {eachDeposit.accountNumber}
                          </NavLink>
                        </td>
                      )}
                      {eachDeposit.accountState !== 4 &&
                        eachDeposit.accountState !== 7 &&
                        eachDeposit.accountState !== 8 &&
                        eachDeposit.accountState !== 9 && (
                          <td>
                            <NavLink
                              to={`/customer/${eachDeposit.clientEncodedKey}/savingsaccount/${eachDeposit.encodedKey}`}
                            >
                              {" "}
                              {eachDeposit.accountNumber}
                            </NavLink>
                          </td>
                        )}
                      <td>
                        <NavLink
                          to={`/customer/${eachDeposit.clientEncodedKey}`}
                        >
                          {eachDeposit.accountHolderName}
                        </NavLink>{" "}
                      </td>
                      <td>{eachDeposit.productName}</td>
                      <td>{eachDeposit.productTypeDescription}</td>
                      <td>{eachDeposit.currencyCode}</td>
                      <td>
                        {numberWithCommas(
                          eachDeposit.depositBalance,
                          true,
                          true
                        )}
                      </td>
                      <td>{eachDeposit.accountStateDescription}</td>
                      <td>{eachDeposit.branchName}</td>
                      <td>{eachDeposit.dateCreated}</td>
                      <td>
                        {numberWithCommas(
                          eachDeposit.depositAvailableBalance,
                          true,
                          true
                        )}
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          );

      default:
        return null;
    }
  };

  fetchPageList() {
    //let getClientsRequest = this.props.getClientsReducer;

    let allUSerPermissions = [];
    this.userPermissions.map((eachPermission) => {
      allUSerPermissions.push(eachPermission.permissionCode);
    });

    let getDepositsRequest = this.props.getDepositsRequest;

    let allDeposits = getDepositsRequest?.request_data?.response?.data;

    return (
      <div>
        <div className="heading-with-cta">
          <Form
            className="one-liner"
            onSubmit={(e) => this.searchTxtn(e, allDeposits.result)}
          >
            <Form.Group controlId="filterDropdown" className="no-margins pr-10">
              <Form.Control as="select" size="sm">
                <option>No Filter</option>
                <option>Add New Filter</option>
                <option>Custom Filter</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="table-filters">
              <DatePicker
                autoComplete="new-off"
                onChangeRaw={this.handleDateChangeRaw}
                onChange={this.handleStartDatePicker}
                selected={this.state.startDate}
                dateFormat={window.dateformat}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="Start date"
                autoComplete="new-password"
                maxDate={new Date()}
                // className="form-control form-control-sm h-38px"
                className="form-control form-control-sm "
                customInput={<DatePickerFieldType placeHolder="Start date" />}
              />
              <DatePicker
                autoComplete="new-off"
                placeholderText="End  date"
                onChangeRaw={this.handleDateChangeRaw}
                onChange={this.handleEndDatePicker}
                selected={this.state.endDate}
                dateFormat={window.dateformat}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                maxDate={new Date()}
                // className="form-control form-control-sm h-38px"
                className="form-control form-control-sm"
                customInput={<DatePickerFieldType placeHolder="End date" />}
              />
              <input
                type="text"
                className="form-control-sm search-table form-control"
                placeholder="Search text"
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
            <Button className="no-margins" variant="primary" type="submit">
              Filter
            </Button>
            <div className="actions-wrap">
              <Button
                onClick={this.exportAllDeposits}
                className="action-icon"
                variant="outline-secondary"
                type="button"
              >
                <img
                  alt="download excel"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg=="
                  width="16"
                  height="16"
                />
              </Button>
            </div>
          </Form>

          <div className="pagination-wrap">
            <label htmlFor="toshow">Show</label>
            <select
              id="toshow"
              className="countdropdown form-control form-control-sm"
              onChange={(e) => this.setPagesize(e, allDeposits.result)}
              value={this.state.PageSize}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="200">200</option>
            </select>

            <TablePagination
              totalPages={allDeposits?.totalPages ?? 0}
              currPage={allDeposits?.currentPage ?? 0}
              currRecordsCount={allDeposits?.result.length ?? 0}
              totalRows={allDeposits?.totalRows ?? 0}
              tempData={allDeposits?.result ?? 0}
              pagesCountToshow={4}
              refreshFunc={this.loadNextPage}
            />
          </div>
        </div>
        {/* <div className='table-helper'>
        <input
          type='checkbox'
          name=''
          onChange={(e) => this.setShowDetails(e, allDeposits.result)}
          checked={this.state.FullDetails}
          id='showFullDetails'
        />
        <label htmlFor='showFullDetails'>Show full details</label>
      </div> */}

        <TableComponent classnames="striped bordered hover">
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Account Holder Name</th>
              <th>Product</th>
              <th>Product Type</th>
              <th>Currency</th>
              <th>Deposit Balance</th>
              <th>Account State</th>
              <th>Branch</th>
              <th>Date Created</th>
              <th>Available Balance</th>
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
            <div className="module-heading">
              <div className="module-title">
                <div className="content-container">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="">
                        <h2>Deposit Accounts</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <SubMenu links={DEPOSIT_MODULE_MENU_LINKS} />
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
    getDepositsRequest: state.depositsReducers.getDepositsReducer,
    exportDepositsReducer: state.depositsReducers.exportDepositsReducer,
  };
}

export default connect(mapStateToProps)(DepositManagement);
