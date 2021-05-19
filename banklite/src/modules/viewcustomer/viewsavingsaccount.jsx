import * as React from "react";
// import {Router} from "react-router";

import { Fragment } from "react";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import InnerPageContainer from "../../shared/templates/authed-pagecontainer";
import CustomerHeading from "./customerheader";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import TableComponent from "../../shared/elements/table";
import TablePagination from "../../shared/elements/table/pagination";
import DatePicker from "../../_helpers/datepickerfield";
import { default as DatePickerFilter } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReverseTransaction from "../../shared/components/reverse-txt";
import ViewATransaction from "../../shared/components/view-txt";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import * as Yup from "yup";

import Alert from "react-bootstrap/Alert";

import { depositActions } from "../../redux/actions/deposits/deposits.action";

import {
  numberWithCommas,
  getDateFromISO,
  numberWithoutDecimals,
} from "../../shared/utils";
import { routes } from "../../services/urls";
import { clientsActions } from "../../redux/actions/clients/clients.action";
import { clientsConstants } from "../../redux/actiontypes/clients/clients.constants";

import { administrationActions } from "../../redux/actions/administration/administration.action";
import { dashboardActions } from "../../redux/actions/dashboard/dashboard.action";
import { administrationConstants } from "../../redux/actiontypes/administration/administration.constants";

import { loanAndDepositsConstants } from "../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants";
import { BeginMaturityModal } from "./components/deposits/begin-maturity-component";
import { MakeAccountDepositModal } from "./components/deposits/deposit-fund-component";
import { MakeAccountWithdrawalModal } from "./components/deposits/make-withdrawal-component";
import { SetMaximumWithdrawalModal } from "./components/deposits/set-maximum-withdrawal-amount-component";
import { SetRecommendedAmountModal } from "./components/deposits/set-recommended-amount-component";
import { SetLockAccountModal } from "./components/deposits/set-lock-account-component";
import { SetUnlockAccountModal } from "./components/deposits/set-unlock-account-component";
import { SetLockAmountModal } from "./components/deposits/set-lock-amount-component";
import { SetUnlockAmountModal } from "./components/deposits/set-unlock-amount-component";
import { SiezeAmountModal } from "./components/deposits/set-seize-amount-component";
import { MakeTransferModal } from "./components/deposits/transfer-component";
import { ChangeDepositStateModal } from "./components/deposits/change-deposit-state-component";
import {
  DepositStateConstants,
  LockAmountStateConstants,
} from "../../redux/actions/clients/client-states-constants";
class ViewSavingsAccount extends React.Component {
  constructor(props) {
    super(props);
    this.depositEncodedKey = this.props.match.params.accountid;
    this.state = {
      user: "",
      showSetDeposit: false,
      showSetMaxWithdrawal: false,
      showChangeAccountState: false,
      showChangeHistory: false,
      FullDetails: true,
      PageSize: 100,
      CurrentPage: 1,
      endDate: "",
      startDate: "",

      typeOfTransfer: "currentcustomer",
      selectOtherCustomerAccount: "",
      isCustommerAccountsFetchedWithKey: "",
      selectOtherCustomer: "",
      defaultAccountOptions: "",

      depositTransactionPageSize: 100,
      depositTransactionCurrentPage: 1,

      showAmountExpected: false,
      showAmountPaid: false,
      showAmountDue: false,

      CommentsPageSize: 100,
      CommentsCurrentPage: 1,
      showAddComment: false,

      ActivitiesPageSize: 100,
      ActivitiesCurrentPage: 1,

      AttachmentPageSize: 100,
      AttachmentCurrentPage: 1,

      showAddAttachment: false,
      isDocAdded: null,
      filename: null,
      docuploaded: "",

      CommunicationsPageSize: 100,
      CommunicationsCurrentPage: 1,
      NotificationType: 0,

      LockAmountPageSize: 100,
      LockAmountCurrentPage: 1,

      SettlementAccountPageSize: 100,
      SettlementAccountCurrentPage: 1,

      changeDepositState: false,
      showDepositFundsForm: false,

      txtnEndDate: "",
      txtnStartDate: "",
      //the following boolean fields toggle all the modal component for the page
      showBeginMaturityModal: false,
      showDepositFundModal: false,
      showMakeWithdrawalModal: false,
      showSetMaximumWithdrawalAmountModal: false,
      showRecommendedAmountModal: false,
      showLockAccountModal: false,
      showUnlockAccountModal: false,
      showTransferFundModal: false,
      showLockAmountModal: false,
      showUnlockAmountModal: false,
      showSeizeAmountModal: false,
    };
    //  {showBeginMaturityModal:false,showDepositFundModal:false,showMakeWithdrawalModal:false,showSetMaximumWithdrawalAmountModal:false,showRecommendedAmountModal:false,showTransferFundModal:false}

    this.setState({
      showApprove: false,
      showIncomplete: false,
      showRequestApproval: false,
      showbeginMaturity: false,
      showMakeWithdrawal: false,
      showTransfer: false,
      showMakeDeposit: false,
      showReject: false,
      showClosedWithdraw: false,
    });
    this.userPermissions = JSON.parse(localStorage.getItem("x-u-perm"));
    this.enforcePermissions();
  }

  componentDidMount() {
    this.loadInitialCustomerData();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.accountid !== this.props.match.params.accountid
    ) {
      this.depositEncodedKey = nextProps.match.params.accountid;
      this.loadInitialCustomerData();
    }
  }

  loadInitialCustomerData = () => {
    this.getCustomerDepositAccountDetails(this.depositEncodedKey);
    this.getTransactionChannels();
    this.getSettlementAccount();
    // this.getADepositActivities();
    // this.getADepositCommunications();
    // this.getLockedAmount();
    // this.getCustomerDepositTransactions();
    // this.getADepositComments();
    // this.getACustomerDepositAttachments();
  };

  getTransactionChannels = () => {
    const { dispatch } = this.props;
    let params = `PageSize=200&CurrentPage=1`;

    dispatch(administrationActions.getTransactionChannels(params));
  };

  getCustomerDepositAccountDetails = (clientEncodedKey) => {
    const { dispatch } = this.props;

    dispatch(depositActions.getAClientDepositAccount(clientEncodedKey));
  };

  getADepositActivities = () => {
    const { dispatch } = this.props;

    let { ActivitiesPageSize, ActivitiesCurrentPage } = this.state;

    let params = `PageSize=${ActivitiesPageSize}&CurrentPage=${ActivitiesCurrentPage}`;

    dispatch(
      depositActions.getADepositAcountActivities(this.depositEncodedKey, params)
    );
  };

  getLockedAmount = () => {
    const { dispatch } = this.props;

    let { LockAmountPageSize, LockAmountCurrentPage } = this.state;
    const accountNumber = this.props.getAClientDepositAccountReducer
      .request_data.response.data.accountNumber;

    let params = `AccountNumber=${accountNumber}&PageSize=${LockAmountPageSize}&CurrentPage=${LockAmountCurrentPage}`;
    dispatch(depositActions.getLockedAmount(params));
  };

  getSettlementAccount = () => {
    const { dispatch } = this.props;

    let {
      SettlementAccountPageSize,
      SettlementAccountCurrentPage,
    } = this.state;
    const DepositAccountNumber = this.depositEncodedKey;

    let params = `DepositAccountNumber=${DepositAccountNumber}&PageSize=${SettlementAccountPageSize}&CurrentPage=${SettlementAccountCurrentPage}`;
    dispatch(depositActions.getSettlementAccount(params));
  };
  getADepositCommunications = () => {
    const { dispatch } = this.props;

    let {
      CommunicationsPageSize,
      CommunicationsCurrentPage,
      NotificationType,
    } = this.state;

    let params = `PageSize=${CommunicationsPageSize}&CurrentPage=${CommunicationsCurrentPage}&NotificationType=${NotificationType}`;
    dispatch(
      depositActions.getADepositAccountCommunications(
        this.depositEncodedKey,
        params
      )
    );
  };
  setCommunicationsRequestPagesize = (PageSize, tempData) => {
    const { dispatch } = this.props;
    let sizeOfPage = PageSize.target.value;

    this.setState({ CommunicationsPageSize: sizeOfPage });

    let { CommunicationsCurrentPage, NotificationType } = this.state;

    let params = `PageSize=${sizeOfPage}&CurrentPage=${CommunicationsCurrentPage}&NotificationType=${NotificationType}`;

    if (tempData) {
      dispatch(
        depositActions.getADepositAccountCommunications(
          this.depositEncodedKey,
          params,
          tempData
        )
      );
    } else {
      dispatch(
        depositActions.getADepositAccountCommunications(
          this.depositEncodedKey,
          params
        )
      );
    }
  };

  setCommunicationsRequestNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;

    let { CommunicationsPageSize, NotificationType } = this.state;

    let params = `PageSize=${CommunicationsPageSize}&CurrentPage=${nextPage}&NotificationType=${NotificationType}`;

    if (tempData) {
      dispatch(
        depositActions.getADepositAccountCommunications(
          this.depositEncodedKey,
          params,
          tempData
        )
      );
    } else {
      dispatch(
        depositActions.getADepositAccountCommunications(
          this.depositEncodedKey,
          params
        )
      );
    }
  };

  getCustomerDepositTransactions = () => {
    const { dispatch } = this.props;
    let {
      depositTransactionPageSize,
      depositTransactionCurrentPage,
    } = this.state;

    let params = `PageSize=${depositTransactionPageSize}&CurrentPage=${depositTransactionCurrentPage}`;

    dispatch(
      depositActions.getAccountDepositTransaction(
        this.depositEncodedKey,
        params
      )
    );
  };

  setTransactionRequestPagesize = (PageSize, tempData) => {
    const { dispatch } = this.props;

    let sizeOfPage = PageSize.target.value;

    this.setState({ depositTransactionPageSize: sizeOfPage });

    let { depositTransactionCurrentPage } = this.state;

    let params = `PageSize=${sizeOfPage}&CurrentPage=${depositTransactionCurrentPage}&accountEncodedKey=${this.depositEncodedKey}`;

    if (tempData) {
      dispatch(
        depositActions.getAccountDepositTransaction(
          this.depositEncodedKey,
          params,
          tempData
        )
      );
    } else {
      dispatch(
        depositActions.getAccountDepositTransaction(
          this.depositEncodedKey,
          params
        )
      );
    }
  };

  setTransactionRequestNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;

    let { depositTransactionPageSize } = this.state;

    let params = `PageSize=${depositTransactionPageSize}&CurrentPage=${nextPage}&accountEncodedKey=${this.depositEncodedKey}`;
    if (tempData) {
      dispatch(
        depositActions.getAccountDepositTransaction(
          this.depositEncodedKey,
          params,
          tempData
        )
      );
    } else {
      dispatch(
        depositActions.getAccountDepositTransaction(
          this.depositEncodedKey,
          params
        )
      );
    }
  };

  handleCommentsBoxClose = () => this.setState({ showAddComment: false });
  handleCommentsBoxShow = () => this.setState({ showAddComment: true });

  getADepositComments = () => {
    const { dispatch } = this.props;
    let { CommentsPageSize, CommentsCurrentPage } = this.state;

    let params = `PageSize=${CommentsPageSize}&CurrentPage=${CommentsCurrentPage}&AccountEncodedKey=${this.depositEncodedKey}`;
    dispatch(depositActions.getDepositAccountComments(params));
  };

  setCommentsRequestPagesize = (PageSize, tempData) => {
    const { dispatch } = this.props;
    let sizeOfPage = PageSize.target.value;

    this.setState({ CommentsPageSize: sizeOfPage });

    let { CommentsCurrentPage } = this.state;

    let params = `PageSize=${sizeOfPage}&CurrentPage=${CommentsCurrentPage}&AccountEncodedKey=${this.depositEncodedKey}`;

    if (tempData) {
      dispatch(depositActions.getDepositAccountComments(params, tempData));
    } else {
      dispatch(depositActions.getDepositAccountComments(params));
    }
  };

  setCommentsRequestNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;

    let { CommentsPageSize } = this.state;

    let params = `PageSize=${CommentsPageSize}&CurrentPage=${nextPage}&AccountEncodedKey=${this.depositEncodedKey}`;

    if (tempData) {
      dispatch(depositActions.getDepositAccountComments(params, tempData));
    } else {
      dispatch(depositActions.getDepositAccountComments(params));
    }
  };

  getACustomerDepositAttachments = () => {
    const { dispatch } = this.props;

    let { AttachmentPageSize, AttachmentCurrentPage } = this.state;
    let params = `PageSize=${AttachmentPageSize}&CurrentPage=${AttachmentCurrentPage}&AccountEncodedKey=${this.depositEncodedKey}`;
    dispatch(depositActions.getAccountDepositAttachments(params));
  };

  setAttachmentRequestPagesize = (PageSize, tempData) => {
    const { dispatch } = this.props;
    let sizeOfPage = PageSize.target.value;

    this.setState({ AttachmentPageSize: sizeOfPage });

    let { AttachmentCurrentPage } = this.state;

    let params = `PageSize=${sizeOfPage}&CurrentPage=${AttachmentCurrentPage}&AccountEncodedKey=${this.depositEncodedKey}`;

    if (tempData) {
      dispatch(depositActions.getAccountDepositAttachments(params, tempData));
    } else {
      dispatch(depositActions.getAccountDepositAttachments(params));
    }
  };

  setAttachmentRequestNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;

    let { AttachmentPageSize } = this.state;

    let params = `PageSize=${AttachmentPageSize}&CurrentPage=${nextPage}&AccountEncodedKey=${this.depositEncodedKey}`;

    if (tempData) {
      dispatch(depositActions.getAccountDepositAttachments(params, tempData));
    } else {
      dispatch(depositActions.getAccountDepositAttachments(params));
    }
  };

  setActivitiesRequestNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;

    let { ActivitiesPageSize } = this.state;

    let params = `PageSize=${ActivitiesPageSize}&CurrentPage=${nextPage}`;

    if (tempData) {
      dispatch(
        depositActions.getADepositAcountActivities(
          this.depositEncodedKey,
          params,
          tempData
        )
      );
    } else {
      dispatch(
        depositActions.getADepositAcountActivities(
          this.depositEncodedKey,
          params
        )
      );
    }
  };

  setActivitiesRequestPagesize = (PageSize, tempData) => {
    const { dispatch } = this.props;
    let sizeOfPage = PageSize.target.value;

    this.setState({ ActivitiesPageSize: sizeOfPage });

    let { ActivitiesCurrentPage } = this.state;

    let params = `PageSize=${sizeOfPage}&CurrentPage=${ActivitiesCurrentPage}`;

    if (tempData) {
      dispatch(
        depositActions.getADepositAcountActivities(
          this.depositEncodedKey,
          params,
          tempData
        )
      );
    } else {
      dispatch(
        depositActions.getADepositAcountActivities(
          this.depositEncodedKey,
          params
        )
      );
    }
  };

  handleSetDepositClose = () => this.setState({ showSetDeposit: false });

  handleSetDepositShow = () => this.setState({ showSetDeposit: true });

  handleSetMaxWithdrawalClose = () =>
    this.setState({ showSetMaxWithdrawal: false });

  handleSetMaxWithdrawalShow = () =>
    this.setState({ showSetMaxWithdrawal: true });

  handleChangeAccountStateModalClose = () =>
    this.setState({ showChangeAccountState: false });

  handleChangeAccountStateModalShow = () =>
    this.setState({ showChangeAccountState: true });

  handleChangeHistoryClose = () => this.setState({ showChangeHistory: false });

  handleChangeHistoryShow = () => this.setState({ showChangeHistory: true });

  handleTxtnDateChangeRaw = (e) => {
    e.preventDefault();
  };
  handleTxtnStartDatePicker = (txtnStartDate) => {
    txtnStartDate.setHours(txtnStartDate.getHours() + 1);

    this.setState({ txtnStartDate }, () => {
      if (this.state.txtnEndDate !== "") {
        //this.getHistory();
      }
    });
  };

  handleTxtnEndDatePicker = (txtnEndDate) => {
    txtnEndDate.setHours(txtnEndDate.getHours() + 1);

    this.setState({ txtnEndDate }, () => {
      if (this.state.txtnStartDate !== "") {
        //this.getHistory();
      }
    });
  };

  renderAccountState = (depositAccountData) => {
    return (
      <div className="amounts-wrap w-65">
        {depositAccountData.accountState !== 5 && (
          <div className="eachamount">
            <h6>Account State</h6>
            <div className="amounttext">
              {depositAccountData.accountStateDescription}
            </div>
          </div>
        )}

        {depositAccountData.accountState === 5 && (
          <div className="eachamount">
            <h6>Total Balance</h6>
            <div className="amounttext">
              {" "}
              {depositAccountData.currencyCode ?? "" + " "}
              {numberWithCommas(
                depositAccountData.depositAvailableBalance,
                true
              )}
            </div>
          </div>
        )}
      </div>
    );
  };
  renderDepositAccountActivities = () => {
    let getADepositAccountActivitiesRequest = this.props
      .getADepositAccountActivitiesReducer;
    let saveRequestData =
      getADepositAccountActivitiesRequest.request_data !== undefined
        ? getADepositAccountActivitiesRequest.request_data.tempData
        : null;

    if (
      getADepositAccountActivitiesRequest.request_status ===
      loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_PENDING
    ) {
      if (saveRequestData === undefined) {
        return (
          <div className="loading-content">
            <div className="loading-text">Please wait... </div>
            <div className="heading-with-cta">
              <Form className="one-liner">
                <Form.Group
                  controlId="filterDropdown"
                  className="no-margins pr-10"
                >
                  <Form.Control as="select" size="sm">
                    <option>No Filter</option>
                    <option>Add New Filter</option>
                    <option>Custom Filter</option>
                  </Form.Control>
                </Form.Group>
                <Button className="no-margins" variant="primary" type="submit">
                  Filter
                </Button>
              </Form>

              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  className="countdropdown form-control form-control-sm"
                >
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
                  <th>Activity Description</th>
                  <th>Date Created</th>
                  <th>Username</th>
                  <th>Action</th>
                  <th>Affected Client</th>
                  <th>Affected Item Name</th>
                  <th>Affected Item Id</th>
                  {/* <th></th> */}
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
      } else {
        return (
          <div className="loading-content">
            <div className="loading-text">Please wait... </div>
            <div className="heading-with-cta">
              <Form className="one-liner">
                <Form.Group
                  controlId="filterDropdown"
                  className="no-margins pr-10"
                >
                  <Form.Control as="select" size="sm">
                    <option>No Filter</option>
                    <option>Add New Filter</option>
                    <option>Custom Filter</option>
                  </Form.Control>
                </Form.Group>
                <Button className="no-margins" variant="primary" type="submit">
                  Filter
                </Button>
              </Form>

              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  value={this.state.ActivitiesPageSize}
                  className="countdropdown form-control form-control-sm"
                >
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
                  <th>Activity Description</th>
                  <th>Date Created</th>
                  <th>Username</th>
                  <th>Action</th>
                  <th>Affected Client</th>
                  <th>Affected Item Name</th>
                  <th>Affected Item Id</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody>
                {saveRequestData.map((eachActivity, index) => {
                  return (
                    <Fragment key={index}>
                      <tr>
                        <td>{eachActivity.activityDescription}</td>
                        <td>
                          {getDateFromISO(eachActivity.creationDate, true)}
                        </td>
                        <td>{eachActivity.userName}</td>
                        <td>{eachActivity.action}</td>
                        <td>{eachActivity.affectedCustomerName}</td>
                        <td>{eachActivity.affectedItemName}</td>
                        <td>{eachActivity.affectedItemId}</td>
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
      getADepositAccountActivitiesRequest.request_status ===
      loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_SUCCESS
    ) {
      let depositAccountActivitiesData =
        getADepositAccountActivitiesRequest.request_data.response.data;
      if (depositAccountActivitiesData.result.length >= 1) {
        return (
          <div>
            <div className="heading-with-cta">
              <Form className="one-liner">
                <Form.Group
                  controlId="filterDropdown"
                  className="no-margins pr-10"
                >
                  <Form.Control as="select" size="sm">
                    <option>No Filter</option>
                    <option>Add New Filter</option>
                    <option>Custom Filter</option>
                  </Form.Control>
                </Form.Group>
                <Button className="no-margins" variant="primary" type="submit">
                  Filter
                </Button>
              </Form>

              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  onChange={(e) =>
                    this.setActivitiesRequestPagesize(
                      e,
                      depositAccountActivitiesData.result
                    )
                  }
                  value={this.state.ActivitiesPageSize}
                  className="countdropdown form-control form-control-sm"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="200">200</option>
                </select>
                <TablePagination
                  totalPages={depositAccountActivitiesData.totalPages}
                  currPage={depositAccountActivitiesData.currentPage}
                  currRecordsCount={depositAccountActivitiesData.result.length}
                  totalRows={depositAccountActivitiesData.totalRows}
                  tempData={depositAccountActivitiesData.result}
                  pagesCountToshow={4}
                  refreshFunc={this.setActivitiesRequestNextPage}
                />
              </div>
            </div>
            <TableComponent classnames="striped bordered hover">
              <thead>
                <tr>
                  <th>Activity Description</th>
                  <th>Date Created</th>
                  <th>Username</th>
                  <th>Action</th>
                  <th>Affected Client</th>
                  <th>Affected Item Name</th>
                  <th>Affected Item Id</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody>
                {depositAccountActivitiesData.result.map(
                  (eachActivity, index) => {
                    return (
                      <Fragment key={index}>
                        <tr>
                          <td>{eachActivity.activityDescription}</td>
                          <td>
                            {getDateFromISO(eachActivity.creationDate, true)}
                          </td>
                          <td>{eachActivity.userName}</td>
                          <td>{eachActivity.action}</td>
                          <td>{eachActivity.affectedCustomerName}</td>
                          <td>{eachActivity.affectedItemName}</td>
                          <td>{eachActivity.affectedItemId}</td>
                        </tr>
                      </Fragment>
                    );
                  }
                )}
              </tbody>
            </TableComponent>
          </div>
        );
      } else {
        return (
          <div>
            <div className="heading-with-cta">
              <Form className="one-liner">
                <Form.Group
                  controlId="filterDropdown"
                  className="no-margins pr-10"
                >
                  <Form.Control as="select" size="sm">
                    <option>No Filter</option>
                    <option>Add New Filter</option>
                    <option>Custom Filter</option>
                  </Form.Control>
                </Form.Group>
                <Button className="no-margins" variant="primary" type="submit">
                  Filter
                </Button>
              </Form>

              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  onChange={(e) =>
                    this.setActivitiesRequestPagesize(
                      e,
                      depositAccountActivitiesData.result
                    )
                  }
                  value={this.state.ActivitiesPageSize}
                  className="countdropdown form-control form-control-sm"
                >
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
                  <th>Activity Description</th>
                  <th>Date Created</th>
                  <th>Username</th>
                  <th>Action</th>
                  <th>Affected Client</th>
                  <th>Affected Item Name</th>
                  <th>Affected Item Id</th>
                  {/* <th></th> */}
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
    }

    if (
      getADepositAccountActivitiesRequest.request_status ===
      loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ACTIVITIES_FAILURE
    ) {
      return (
        <div className="loading-content errormsg">
          <div>{getADepositAccountActivitiesRequest.request_data.error}</div>
        </div>
      );
    }
  };

  renderALockedAmount = () => {
    let getLockAmountReducer = this.props.getLockAmountReducer;
    let saveRequestData =
      getLockAmountReducer.request_data !== undefined
        ? getLockAmountReducer.request_data
        : null;

    if (
      getLockAmountReducer.request_status ===
      loanAndDepositsConstants.GET_LOCK_AMOUNT_PENDING
    ) {
      if (
        saveRequestData === undefined ||
        (saveRequestData !== undefined && saveRequestData.length < 1)
      ) {
        return (
          <div className="loading-content">
            <div className="loading-text">Please wait... </div>
            <div className="heading-with-cta ">
              <Form className="one-liner"></Form>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  onChange={this.setPagesize}
                  value={this.state.PageSize}
                  className="countdropdown form-control form-control-sm"
                >
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
                  <th>Block Reference</th>
                  <th>Transaction Id</th>
                  <th>User</th>
                  <th>Reason</th>
                  <th>Entry Date</th>
                  <th>Amount</th>
                  <th>Status</th>
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
          <div>
            <div className="loading-text">Please wait... </div>
            <div className="heading-with-cta ">
              <Form className="one-liner"></Form>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  className="countdropdown form-control form-control-sm"
                >
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
                  <th>Block Reference</th>
                  <th>Transaction Id</th>
                  <th>User</th>
                  <th>Reason</th>
                  <th>Entry Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              {/* <tbody>
                {saveRequestData.map((lockedDetail, index) => {
                  return (
                    <tr key={index}>
                      <td>{lockedDetail.id} </td>
                      <td>{lockedDetail.user} </td>
                      <td>{lockedDetail.lockedAmount}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody> */}
            </TableComponent>
          </div>
        );
      }
    }

    if (
      getLockAmountReducer.request_status ===
      loanAndDepositsConstants.GET_LOCK_AMOUNT_SUCCESS
    ) {
      let getLockAmountInfo = getLockAmountReducer.request_data.response.data;
      let getLockAmountReducerData =
        getLockAmountReducer.request_data.response.data.result;
      if (getLockAmountReducerData.length >= 1) {
        return (
          <div>
            <div className="heading-with-cta ">
              <Form className="one-liner"></Form>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  onChange={(e) =>
                    this.setCommunicationsRequestPagesize(
                      e,
                      getLockAmountReducerData
                    )
                  }
                  value={this.state.CommunicationsPageSize}
                  className="countdropdown form-control form-control-sm"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="200">200</option>
                </select>
                <TablePagination
                  totalPages={getLockAmountInfo.totalPages}
                  currPage={getLockAmountInfo.currentPage}
                  currRecordsCount={getLockAmountInfo.length}
                  totalRows={getLockAmountInfo.totalRows}
                  tempData={getLockAmountReducerData}
                  pagesCountToshow={4}
                  refreshFunc={this.setCommunicationsRequestNextPage}
                />
              </div>
            </div>
            <TableComponent classnames="striped bordered hover">
              <thead>
                <tr>
                  <th>Block Reference</th>
                  <th>Transaction Id</th>
                  <th>User</th>
                  <th>Reason</th>
                  <th>Entry Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {getLockAmountReducerData.map((lockedDetail, index) => {
                  return (
                    <tr key={index}>
                      <td>{lockedDetail.blockReference} </td>
                      <td>{lockedDetail.transactionId}</td>
                      <td>{lockedDetail.userName}</td>
                      <td>{lockedDetail.lockReason}</td>
                      <td>{getDateFromISO(lockedDetail.lockedDate)} </td>
                      <td>{numberWithCommas(lockedDetail.lockAmount)}</td>
                      <td>
                        {lockedDetail.amountLockTransactionStateDescription}
                      </td>
                      {lockedDetail.amountLockTransactionState ===
                        LockAmountStateConstants.LOCKED && (
                        <td>
                          <DropdownButton
                            size="sm"
                            title="Actions"
                            key="unlockAmount"
                            className="customone"
                          >
                            <Dropdown.Item
                              eventKey="1"
                              onClick={() =>
                                this.handleShowUnlockAmountModal(
                                  lockedDetail.blockReference
                                )
                              }
                            >
                              Unlock Amount
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="1"
                              onClick={() =>
                                this.handleShowSeizeAmountModal(
                                  lockedDetail.blockReference,
                                  lockedDetail.lockAmount
                                )
                              }
                            >
                              Seize
                            </Dropdown.Item>
                          </DropdownButton>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>
          </div>
        );
      } else {
        return (
          <div className="no-records">
            <div className="heading-with-cta ">
              <Form className="one-liner"></Form>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  onChange={(e) =>
                    this.setCommunicationsRequestPagesize(
                      e,
                      getLockAmountReducerData
                    )
                  }
                  value={this.state.CommunicationsPageSize}
                  className="countdropdown form-control form-control-sm"
                >
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
                  <th>Block Reference</th>
                  <th>Transaction Id</th>
                  <th>User</th>
                  <th>Reason</th>
                  <th>Entry Date</th>
                  <th>Amount</th>
                  <th>Status</th>
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
    }
    if (
      getLockAmountReducer.request_status ===
      loanAndDepositsConstants.GET_LOCK_AMOUNT_FAILURE
    ) {
      return (
        <div className="loading-content errormsg">
          <div>{getLockAmountReducer.request_data.error}</div>
        </div>
      );
    }
  };
  renderADepositCommunicatons = () => {
    let getADepositAccountCommunicationsRequest = this.props
      .getADepositAccountCommunicationsReducer;
    let saveRequestData =
      getADepositAccountCommunicationsRequest.request_data !== undefined
        ? getADepositAccountCommunicationsRequest.request_data.tempData
        : null;
    if (
      getADepositAccountCommunicationsRequest.request_status ===
      loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_PENDING
    ) {
      if (
        saveRequestData === undefined ||
        (saveRequestData !== undefined && saveRequestData.length < 1)
      ) {
        return (
          <div className="loading-content">
            <div className="loading-text">Please wait... </div>
            <div className="heading-with-cta ">
              {/* <Form className="one-liner"></Form> */}
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  // onChange={this.setPagesize}
                  // value={this.state.PageSize}
                  className="countdropdown form-control form-control-sm"
                >
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
                  <th>Sent By</th>
                  <th>Destination</th>
                  <th>Message</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date Sent</th>
                  <th>Failure reason</th>
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
      } else {
        return (
          <div>
            <div className="loading-text">Please wait... </div>
            <div className="heading-with-cta ">
              <Form className="one-liner"></Form>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  value={this.state.PageSize}
                  className="countdropdown form-control form-control-sm"
                >
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
                  <th>ID</th>
                  <th>Sent By</th>
                  <th>Destination</th>
                  <th>Message</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date Sent</th>
                  <th>Failure reason</th>
                </tr>
              </thead>
              <tbody>
                {saveRequestData.map((eachCommunication, index) => {
                  return (
                    <tr key={index}>
                      <td>{eachCommunication.id} </td>
                      <td>{eachCommunication.sentBy} </td>
                      <td>{eachCommunication.destination} </td>
                      <td>{eachCommunication.message} </td>
                      <td>{eachCommunication.communicationTypeDescription} </td>
                      <td>
                        {eachCommunication.communicationStateDescription}{" "}
                      </td>
                      <td>{eachCommunication.dateSent} </td>
                      <td>{eachCommunication.failureReason} </td>
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>
          </div>
        );
      }
    }

    if (
      getADepositAccountCommunicationsRequest.request_status ===
      loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_SUCCESS
    ) {
      let getADepositAccountCommunicationsInfo =
        getADepositAccountCommunicationsRequest.request_data.response.data;
      let getADepositAccountCommunicationsData =
        getADepositAccountCommunicationsRequest.request_data.response.data
          .result;

      if (getADepositAccountCommunicationsData.length >= 1) {
        return (
          <div>
            <div className="heading-with-cta ">
              <Form className="one-liner"></Form>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  onChange={(e) =>
                    this.setCommunicationsRequestPagesize(
                      e,
                      getADepositAccountCommunicationsData
                    )
                  }
                  value={this.state.CommunicationsPageSize}
                  className="countdropdown form-control form-control-sm"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="200">200</option>
                </select>
                <TablePagination
                  totalPages={getADepositAccountCommunicationsInfo.totalPages}
                  currPage={getADepositAccountCommunicationsInfo.currentPage}
                  currRecordsCount={getADepositAccountCommunicationsInfo.length}
                  totalRows={getADepositAccountCommunicationsInfo.totalRows}
                  tempData={getADepositAccountCommunicationsData}
                  pagesCountToshow={4}
                  refreshFunc={this.setCommunicationsRequestNextPage}
                />
              </div>
            </div>
            <TableComponent classnames="striped bordered hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Sent By</th>
                  <th>Destination</th>
                  <th>Message</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date Sent</th>
                  <th>Failure reason</th>
                </tr>
              </thead>
              <tbody>
                {getADepositAccountCommunicationsData.map(
                  (eachCommunication, index) => {
                    return (
                      <tr key={index}>
                        <td>{eachCommunication.id} </td>
                        <td>{eachCommunication.sentBy} </td>
                        <td>{eachCommunication.destination} </td>
                        <td>{eachCommunication.message} </td>
                        <td>
                          {eachCommunication.communicationTypeDescription}{" "}
                        </td>
                        <td>
                          {eachCommunication.communicationStateDescription}{" "}
                        </td>
                        <td>{eachCommunication.dateSent} </td>
                        <td>{eachCommunication.failureReason} </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </TableComponent>
          </div>
        );
      } else {
        return (
          <div className="no-records">
            <div className="heading-with-cta ">
              <Form className="one-liner"></Form>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  onChange={(e) =>
                    this.setCommunicationsRequestPagesize(
                      e,
                      getADepositAccountCommunicationsData
                    )
                  }
                  value={this.state.CommunicationsPageSize}
                  className="countdropdown form-control form-control-sm"
                >
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
                  <th>Sent By</th>
                  <th>Destination</th>
                  <th>Message</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date Sent</th>
                  <th>Failure reason</th>
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
    }

    if (
      getADepositAccountCommunicationsRequest.request_status ===
      loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMUNICATIONS_FAILURE
    ) {
      return (
        <div className="loading-content errormsg">
          <div>
            {getADepositAccountCommunicationsRequest.request_data.error}
          </div>
        </div>
      );
    }
  };
  handleShowReverseClose = () => {
    // if(this.props.writeOffALoanReducer.is_request_processing===false){
    // this.props.dispatch(loanActions.writeOffALoan("CLEAR"));
    this.setState({ showReverseBox: false });
    // }
  };
  handleShowReverseShow = (transactionDetails, txtxType, txtKey) => {
    this.props.dispatch(dashboardActions.reverseATransaction("CLEAR"));
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
    this.props.dispatch(dashboardActions.reverseATransaction("CLEAR"));
    this.setState({
      ViewTxtnBox: true,
      transactionDetails,
      transactionType: txtxType,
      transactionKey: txtKey,
    });
  };
  renderDepositTransaction = () => {
    let getDepositTransactionRequest = this.props
      .getAccountDepositTransactionReducer;
    let saveRequestData =
      getDepositTransactionRequest.request_data !== undefined
        ? getDepositTransactionRequest.request_data.tempData
        : null;
    if (
      getDepositTransactionRequest.request_status ===
      loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_PENDING
    ) {
      if (
        saveRequestData === undefined ||
        (saveRequestData !== undefined && saveRequestData.length < 1)
      ) {
        return (
          <div>
            <div className="loading-text">Please wait... </div>
            <div className="heading-with-cta ">
              <div></div>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  className="countdropdown form-control form-control-sm"
                >
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
                  <th>Client Name</th>
                  <th>Transaction ID</th>
                  <th>Narration</th>
                  <th>Entry Date</th>
                  <th>Entry Type</th>
                  <th>Type</th>
                  <th>Transaction Amount</th>
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
      } else {
        return (
          <div>
            <div className="loading-text">Please wait... </div>
            <div className="heading-with-cta ">
              <div></div>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  className="countdropdown form-control form-control-sm"
                >
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
                  <th>Client Name</th>
                  <th>Transaction ID</th>
                  <th>Narration</th>
                  <th>Entry Date</th>
                  <th>Entry Type</th>
                  <th>Type</th>
                  <th>Transaction Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {saveRequestData.map((eachTxt, index) => {
                  return (
                    <tr key={index}>
                      <td>{eachTxt.accountHolderName} </td>
                      <td>{eachTxt.key}</td>
                      <td>{eachTxt.narration}</td>
                      <td>{getDateFromISO(eachTxt.entryDate, true)}</td>
                      <td>{eachTxt.entryType}</td>
                      <td>{eachTxt.typeDescription}</td>
                      <td>
                        {numberWithCommas(
                          eachTxt.transactionAmount,
                          true,
                          true
                        )}
                      </td>
                      <td>
                        <DropdownButton
                          size="sm"
                          title="Actions"
                          key="activeCurrency"
                          className="customone"
                        >
                          {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                          <Dropdown.Item eventKey="1">View</Dropdown.Item>
                          <Dropdown.Item eventKey="1">
                            Reverse transaction
                          </Dropdown.Item>
                        </DropdownButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>
          </div>
        );
      }
    }

    if (
      getDepositTransactionRequest.request_status ===
      loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_SUCCESS
    ) {
      let getDepositTransactionInfo =
        getDepositTransactionRequest.request_data.response.data;
      let getDepositTransactionData =
        getDepositTransactionRequest.request_data.response.data.result;

      if (getDepositTransactionData.length >= 1) {
        return (
          <div>
            <div className="heading-with-cta ">
              <Form className="one-liner">
                <Form.Group className="table-filters">
                  <DatePickerFilter
                    onChangeRaw={this.handleTxtnDateChangeRaw}
                    onChange={this.handleTxtnStartDatePicker}
                    selected={this.state.txtnStartDate}
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
                  />
                  <DatePickerFilter
                    placeholderText="End  date"
                    onChangeRaw={this.handleTxtnDateChangeRaw}
                    onChange={this.handleTxtnEndDatePicker}
                    selected={this.state.txtnEndDate}
                    dateFormat={window.dateformat}
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    maxDate={new Date()}
                    // className="form-control form-control-sm h-38px"
                    className="form-control form-control-sm"
                  />
                  <input
                    type="text"
                    className="form-control-sm search-table form-control"
                    placeholder="Search text"
                  />
                  {/* {errors.startDate && touched.startDate ? (
    <span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
                </Form.Group>
                <Button className="no-margins" variant="primary" type="submit">
                  Filter
                </Button>
              </Form>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  className="countdropdown form-control form-control-sm"
                  onChange={(e) =>
                    this.setTransactionRequestPagesize(
                      e,
                      getDepositTransactionData
                    )
                  }
                  value={this.state.depositTransactionPageSize}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="200">200</option>
                </select>
                <TablePagination
                  totalPages={getDepositTransactionInfo.totalPages}
                  currPage={getDepositTransactionInfo.currentPage}
                  currRecordsCount={getDepositTransactionInfo.length}
                  totalRows={getDepositTransactionInfo.totalRows}
                  tempData={getDepositTransactionData}
                  pagesCountToshow={4}
                  refreshFunc={this.setTransactionRequestNextPage}
                />
              </div>
            </div>
            <TableComponent classnames="striped bordered hover">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Transaction Id</th>
                  <th>Narration</th>
                  <th>Entry Date</th>
                  <th>Entry Type</th>
                  <th>Type</th>
                  <th>Transaction Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {getDepositTransactionData.map((eachTxt, index) => {
                  return (
                    <tr key={index}>
                      <td>{eachTxt.accountHolderName} </td>
                      <td>{eachTxt.key}</td>
                      <td>{eachTxt.narration}</td>
                      <td>{getDateFromISO(eachTxt.entryDate, true)}</td>
                      <td>{eachTxt.entryType}</td>
                      <td>{eachTxt.typeDescription}</td>
                      <td>
                        {numberWithCommas(
                          eachTxt.transactionAmount,
                          true,
                          true
                        )}
                      </td>
                      <td>
                        <DropdownButton
                          size="sm"
                          title="Actions"
                          key="activeCurrency"
                          className="customone"
                        >
                          {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                          <Dropdown.Item
                            eventKey="1"
                            onClick={() =>
                              this.handleViewTxtnShow(
                                eachTxt,
                                eachTxt.typeDescription,
                                eachTxt.key
                              )
                            }
                          >
                            View
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="1"
                            onClick={() =>
                              this.handleShowReverseShow(
                                eachTxt,
                                eachTxt.typeDescription,
                                eachTxt.key
                              )
                            }
                          >
                            Reverse transaction
                          </Dropdown.Item>
                        </DropdownButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>
          </div>
        );
      } else {
        return (
          <div>
            <div className="heading-with-cta ">
              <div></div>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  className="countdropdown form-control form-control-sm"
                  onChange={(e) =>
                    this.setTransactionRequestPagesize(
                      e,
                      getDepositTransactionData
                    )
                  }
                  value={this.state.depositTransactionPageSize}
                >
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
                  <th>Client Name</th>
                  <th>Transaction Id</th>
                  <th>Narration</th>
                  <th>Entry Date</th>
                  <th>Entry Type</th>
                  <th>Type</th>
                  <th>Transaction Amount</th>
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
    }
  };

  handleAddDepositComments = async (addDepositCommentsPayload) => {
    const { dispatch } = this.props;

    await dispatch(
      depositActions.creatADepositComment(addDepositCommentsPayload)
    );
  };

  addNewCommentBox = () => {
    const { showAddComment } = this.state;
    let createADepositCommentRequest = this.props.createADepositCommentReducer;
    let addDepositCommentsValidationSchema = Yup.object().shape({
      comment: Yup.string().required("Required"),
    });
    return (
      <Modal
        show={showAddComment}
        onHide={this.handleCommentsBoxClose}
        size="lg"
        centered="true"
        dialogClassName="modal-40w withcentered-heading"
        animation={false}
      >
        <Formik
          initialValues={{
            comment: "",
          }}
          validationSchema={addDepositCommentsValidationSchema}
          onSubmit={(values, { resetForm }) => {
            let addCustomerCommentsPayload = {
              comment: values.comment,
              accountEncodedKey: this.depositEncodedKey,
            };

            this.handleAddDepositComments(addCustomerCommentsPayload).then(
              () => {
                if (
                  this.props.createADepositCommentReducer.request_status ===
                  loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_SUCCESS
                ) {
                  resetForm();
                  // value = {null}

                  setTimeout(() => {
                    this.props.dispatch(
                      depositActions.creatADepositComment("CLEAR")
                    );
                    this.handleCommentsBoxClose();
                    this.getADepositComments();
                  }, 3000);
                }
              }
            );
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            resetForm,
            values,
            setFieldValue,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit} className="">
              <Modal.Header>
                <Modal.Title>Add Deposit comment</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <Form.Label className="block-level">Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    onChange={handleChange}
                    name="comment"
                    value={values.comment}
                    className={
                      errors.comment && touched.comment
                        ? "is-invalid form-control form-control-sm"
                        : null
                    }
                  />

                  {errors.comment && touched.comment ? (
                    <span className="invalid-feedback">{errors.comment}</span>
                  ) : null}
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="light" onClick={this.handleCommentsBoxClose}>
                  Cancel
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  disabled={createADepositCommentRequest.is_request_processing}
                >
                  {createADepositCommentRequest.is_request_processing
                    ? "Please wait..."
                    : "Save Comment"}
                </Button>
              </Modal.Footer>

              {createADepositCommentRequest.request_status ===
                loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_SUCCESS && (
                <Alert variant="success" className="w-65 mlr-auto">
                  {
                    createADepositCommentRequest.request_data.response.data
                      .message
                  }
                </Alert>
              )}
              {createADepositCommentRequest.request_status ===
                loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_COMMENT_FAILURE && (
                <Alert variant="danger" className="w-65 mlr-auto">
                  {createADepositCommentRequest.request_data.error}
                </Alert>
              )}
            </Form>
          )}
        </Formik>
      </Modal>
    );
  };

  renderDepositAccountComments = () => {
    let getAClientDepositAccountCommentsRequest = this.props
      .getAClientDepositAccountCommentsReducer;

    let saveRequestData =
      getAClientDepositAccountCommentsRequest.request_data !== undefined
        ? getAClientDepositAccountCommentsRequest.request_data.tempData
        : null;
    let allUSerPermissions = [];
    this.userPermissions.map((eachPermission) => {
      allUSerPermissions.push(eachPermission.permissionCode);
    });
    if (
      getAClientDepositAccountCommentsRequest.request_status ===
      loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_PENDING
    ) {
      if (
        saveRequestData === undefined ||
        (saveRequestData !== undefined && saveRequestData.length < 1)
      ) {
        return (
          <div className="loading-content">
            {this.addNewCommentBox()}
            <div className="loading-text">Please wait... </div>
            <div className="heading-with-cta ">
              <Form className="one-liner"></Form>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  className="countdropdown form-control form-control-sm"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="200">200</option>
                </select>
              </div>
            </div>
            <TableComponent classnames="striped bordered hover ">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Comment</th>
                  <th>Date</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </TableComponent>
            {allUSerPermissions.indexOf("bnk_manage_deposit_comments") > -1 && (
              <div className="footer-with-cta toright">
                <Button onClick={this.handleCommentsBoxShow}>
                  New Comment
                </Button>
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div>
            {this.addNewCommentBox()}
            <div className="loading-text">Please wait... </div>
            <div className="heading-with-cta ">
              <Form className="one-liner"></Form>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  value={this.state.PageSize}
                  className="countdropdown form-control form-control-sm"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="200">200</option>
                </select>
              </div>
            </div>
            <TableComponent classnames="striped bordered hover ">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Comment</th>
                  <th>Date</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {saveRequestData.map((eachComments, index) => {
                  return (
                    <tr key={index}>
                      {/* <td>{eachComments.id} </td> */}
                      <td>{eachComments.comment} </td>
                      <td>{getDateFromISO(eachComments.timeStamp)} </td>
                      <td>
                        <NavLink to={`/user/${eachComments.userEncodedKey}`}>
                          {eachComments.userName}{" "}
                        </NavLink>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>
            {allUSerPermissions.indexOf("bnk_manage_deposit_comments") > -1 && (
              <div className="footer-with-cta toright">
                <Button onClick={this.handleCommentsBoxShow}>
                  Add Comment
                </Button>
              </div>
            )}
          </div>
        );
      }
    }

    if (
      getAClientDepositAccountCommentsRequest.request_status ===
      loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_SUCCESS
    ) {
      let getADepositAccountCommentsInfo =
        getAClientDepositAccountCommentsRequest.request_data.response.data;
      let getADepositAccountCommentsData =
        getAClientDepositAccountCommentsRequest.request_data.response.data
          .result;

      if (getADepositAccountCommentsData.length >= 1) {
        return (
          <div>
            {this.addNewCommentBox()}
            <div className="heading-with-cta ">
              <Form className="one-liner"></Form>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  onChange={(e) =>
                    this.setCommentsRequestPagesize(
                      e,
                      getADepositAccountCommentsData
                    )
                  }
                  value={this.state.CommentsPageSize}
                  className="countdropdown form-control form-control-sm"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="200">200</option>
                </select>
                <TablePagination
                  totalPages={getADepositAccountCommentsInfo.totalPages}
                  currPage={getADepositAccountCommentsInfo.currentPage}
                  currRecordsCount={getADepositAccountCommentsInfo.length}
                  totalRows={getADepositAccountCommentsInfo.totalRows}
                  tempData={getADepositAccountCommentsData}
                  pagesCountToshow={4}
                  refreshFunc={this.setCommentsRequestNextPage}
                />
              </div>
            </div>
            <TableComponent classnames="striped bordered hover ">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Comment</th>
                  <th>Date</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {getADepositAccountCommentsData.map((eachComments, index) => {
                  return (
                    <tr key={index}>
                      {/* <td>{eachComments.id} </td> */}
                      <td>{eachComments.comment} </td>
                      <td>{getDateFromISO(eachComments.timeStamp)} </td>
                      <td>
                        <NavLink to={`/user/${eachComments.userEncodedKey}`}>
                          {eachComments.userName}{" "}
                        </NavLink>{" "}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>
            {allUSerPermissions.indexOf("bnk_manage_deposit_comments") > -1 && (
              <div className="footer-with-cta toright">
                <Button onClick={this.handleCommentsBoxShow}>
                  Add Comment
                </Button>
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div className="no-records">
            {this.addNewCommentBox()}
            <div className="heading-with-cta ">
              <Form className="one-liner"></Form>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  onChange={(e) =>
                    this.setCommentsRequestPagesize(
                      e,
                      getADepositAccountCommentsData
                    )
                  }
                  value={this.state.CommentsPageSize}
                  className="countdropdown form-control form-control-sm"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="200">200</option>
                </select>
              </div>
            </div>
            <TableComponent classnames="striped bordered hover ">
              <thead>
                <tr>
                  {/* <th>ID</th> */}
                  <th>Comment</th>
                  <th>Date</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </TableComponent>
            {allUSerPermissions.indexOf("bnk_manage_deposit_comments") > -1 && (
              <div className="footer-with-cta toright">
                <Button onClick={this.handleCommentsBoxShow}>
                  Add Comment
                </Button>
              </div>
            )}
          </div>
        );
      }
    }

    if (
      getAClientDepositAccountCommentsRequest.request_status ===
      loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_COMMENTS_FAILURE
    ) {
      return (
        <div className="loading-content errormsg">
          <div>
            {getAClientDepositAccountCommentsRequest.request_data.error}
          </div>
        </div>
      );
    }
  };

  handleAttachmentBoxClose = () => this.setState({ showAddAttachment: false });
  handleAttachmentBoxShow = () => this.setState({ showAddAttachment: true });

  HandleFileUpLoad = (event) => {
    let filename = event.target.files[0].name,
      ext = event.target.files[0].type;

    this.setState({
      docuploaded: event.target.files[0],
      filename,
      isDocAdded: true,
    });
  };

  handleAddAttachment = async (addAttachmentPayload) => {
    const { dispatch } = this.props;

    await dispatch(
      depositActions.creatADepositAttachment(addAttachmentPayload)
    );
  };

  addNewAttachmentBox = () => {
    const { showAddAttachment, docuploaded, isDocAdded } = this.state;
    let createADepositAttachmentRequest = this.props
      .createADepositAttachmentReducer;
    let addDepositAttachmentsValidationSchema = Yup.object().shape({
      Title: Yup.string()
        .min(2, "Valid response required")
        .required("Required"),
      Description: Yup.string()
        .required("Required")
        .min(3, "Valid response required"),
    });
    return (
      <Modal
        show={showAddAttachment}
        onHide={this.handleAttachmentBoxClose}
        size="lg"
        centered="true"
        dialogClassName="modal-40w withcentered-heading"
        animation={false}
      >
        <Formik
          initialValues={{
            Description: "",
            Title: "",
          }}
          validationSchema={addDepositAttachmentsValidationSchema}
          onSubmit={(values, { resetForm }) => {
            // let addCustomerAttachmentPayload = {
            //     comment:values.comment,
            //     ClientEncodedKey:this.clientEncodedKey
            // }

            if (docuploaded !== "") {
              this.setState({ isDocAdded: true });

              const attachmentFormData = new FormData();
              attachmentFormData.append("DocumentFile", this.state.docuploaded);
              attachmentFormData.append(
                "AccountEncodedKey",
                this.depositEncodedKey
              );
              attachmentFormData.append("Description", values.Description);
              attachmentFormData.append("Title", values.Title);

              // return false;

              this.handleAddAttachment(attachmentFormData).then(() => {
                if (
                  this.props.createADepositAttachmentReducer.request_status ===
                  loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_SUCCESS
                ) {
                  resetForm();
                  // value = {null}

                  setTimeout(() => {
                    this.props.dispatch(
                      depositActions.creatADepositAttachment("CLEAR")
                    );
                    this.setState({
                      docuploaded: "",
                      filename: "",
                      isDocAdded: false,
                    });
                    this.handleAttachmentBoxClose();
                    this.getACustomerDepositAttachments();
                  }, 3000);
                }
              });
            } else {
              this.setState({ isDocAdded: false });
            }
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            resetForm,
            values,
            setFieldValue,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit} className="">
              <Modal.Header>
                <Modal.Title>Upload Document</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group>
                  <Form.Label className="block-level">Title</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="Title"
                    value={values.Title}
                    className={
                      errors.Title && touched.Title
                        ? "is-invalid form-control form-control-sm"
                        : null
                    }
                  />

                  {errors.Title && touched.Title ? (
                    <span className="invalid-feedback">{errors.Title}</span>
                  ) : null}
                </Form.Group>
                <Form.Group>
                  <Form.Label className="block-level">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    onChange={handleChange}
                    name="Description"
                    value={values.Description}
                    className={
                      errors.Description && touched.Description
                        ? "is-invalid form-control form-control-sm"
                        : null
                    }
                  />

                  {errors.Description && touched.Description ? (
                    <span className="invalid-feedback">
                      {errors.Description}
                    </span>
                  ) : null}
                  <div className="footer-with-cta">
                    <label htmlFor="file-upload3" className="btn btn-primary">
                      Choose file
                    </label>
                    <input
                      name="docuploaded"
                      type="file"
                      id="file-upload3"
                      onChange={this.HandleFileUpLoad}
                    />
                  </div>

                  {this.state.filename !== null && (
                    <div className="filename">
                      File: <span>{this.state.filename}</span>
                    </div>
                  )}
                </Form.Group>
                {isDocAdded === false && (
                  <Alert variant="danger" className="w-65 mlr-auto">
                    Please upload document
                  </Alert>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="light" onClick={this.handleAttachmentBoxClose}>
                  Cancel
                </Button>
                <Button
                  variant="success"
                  type="submit"
                  disabled={
                    createADepositAttachmentRequest.is_request_processing
                  }
                >
                  {createADepositAttachmentRequest.is_request_processing
                    ? "Please wait..."
                    : "Upload attachment"}
                </Button>
              </Modal.Footer>

              {createADepositAttachmentRequest.request_status ===
                loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_SUCCESS && (
                <Alert variant="success" className="w-65 mlr-auto">
                  {
                    createADepositAttachmentRequest.request_data.response.data
                      .message
                  }
                </Alert>
              )}
              {createADepositAttachmentRequest.request_status ===
                loanAndDepositsConstants.CREATE_A_DEPOSIT_ACCOUNT_ATTACHMENT_FAILURE && (
                <Alert variant="danger" className="w-65 mlr-auto">
                  {createADepositAttachmentRequest.request_data.error}
                </Alert>
              )}
            </Form>
          )}
        </Formik>
      </Modal>
    );
  };

  getADownload = (filetype, identifier) => {
    const { dispatch } = this.props;

    dispatch(clientsActions.getDownload(filetype, identifier));
  };

  renderADepositAttachments = () => {
    let getADepositAccountAttachmentsRequest = this.props
      .getADepositAccountAttachmentsReducer;
    let allUSerPermissions = [];
    this.userPermissions.map((eachPermission) => {
      allUSerPermissions.push(eachPermission.permissionCode);
    });
    let saveRequestData =
      getADepositAccountAttachmentsRequest.request_data !== undefined
        ? getADepositAccountAttachmentsRequest.request_data.tempData
        : null;
    if (
      getADepositAccountAttachmentsRequest.request_status ===
      loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_PENDING
    ) {
      if (
        saveRequestData === undefined ||
        (saveRequestData !== undefined && saveRequestData.length < 1)
      ) {
        return (
          <div className="loading-content">
            <div className="loading-text">Please wait... </div>
            <div className="heading-with-cta ">
              <Form className="one-liner"></Form>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  className="countdropdown form-control form-control-sm"
                >
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
                  <th>Title</th>
                  <th>Filename</th>
                  <th>Description</th>
                  <th>Created by</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </TableComponent>
            {allUSerPermissions.indexOf("bnk_manage_deposit_attachments") >
              -1 && (
              <div className="footer-with-cta toright">
                <Button onClick={this.handleAttachmentBoxShow}>
                  Upload Document
                </Button>
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div>
            <div className="loading-text">Please wait... </div>
            <div className="heading-with-cta ">
              <Form className="one-liner"></Form>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  value={this.state.AttachmentPageSize}
                  className="countdropdown form-control form-control-sm"
                >
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
                  <th>Title</th>
                  <th>Filename</th>
                  <th>Description</th>
                  <th>Created by</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {saveRequestData.map((eachAttachment, index) => {
                  return (
                    <tr key={index}>
                      <td>{eachAttachment.title} </td>
                      <td>{eachAttachment.fileName} </td>
                      <td>{eachAttachment.description} </td>
                      <td>
                        <NavLink
                          to={`/user/${eachAttachment.createdByUserEncodedKey}`}
                        >
                          {eachAttachment.createdByUserName}
                        </NavLink>{" "}
                      </td>
                      <td>{getDateFromISO(eachAttachment.timeStamp)} </td>
                      <td>
                        {eachAttachment.linkIdentifier !== "" &&
                          eachAttachment.linkIdentifier !== null &&
                          eachAttachment.linkIdentifier !== undefined && (
                            <DropdownButton
                              size="sm"
                              title="Actions"
                              key="editUser"
                              className="customone"
                            >
                              <a
                                className="dropdown-item"
                                href={`${routes.GET_DOWNLOAD}FileType=DEPOSIT&EncodedKey=${this.depositEncodedKey}&Link=${eachAttachment.linkIdentifier}`}
                                // onClick={()=>this.getADownload('DEPOSIT',eachAttachment.linkIdentifier)}
                              >
                                Download
                              </a>
                              {/* <NavLink download className="dropdown-item" to={`${routes.GET_DOWNLOAD}filetype=DEPOSIT&identifier=${eachAttachment.linkIdentifier}&link=treble`}>Download</NavLink> */}
                            </DropdownButton>
                          )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>
            {allUSerPermissions.indexOf("bnk_manage_deposit_attachments") >
              -1 && (
              <div className="footer-with-cta toright">
                <Button onClick={this.handleAttachmentBoxShow}>
                  Upload Document
                </Button>
              </div>
            )}
          </div>
        );
      }
    }

    if (
      getADepositAccountAttachmentsRequest.request_status ===
      loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_SUCCESS
    ) {
      let getADepositAttachmentsInfo =
        getADepositAccountAttachmentsRequest.request_data.response.data;
      let getADepositAttachmentsData =
        getADepositAccountAttachmentsRequest.request_data.response.data.result;

      if (getADepositAttachmentsData.length >= 1) {
        return (
          <div>
            <div className="heading-with-cta ">
              <Form className="one-liner"></Form>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  onChange={(e) =>
                    this.setAttachmentRequestPagesize(
                      e,
                      getADepositAttachmentsData
                    )
                  }
                  value={this.state.AttachmentPageSize}
                  className="countdropdown form-control form-control-sm"
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="200">200</option>
                </select>
                <TablePagination
                  totalPages={getADepositAttachmentsInfo.totalPages}
                  currPage={getADepositAttachmentsInfo.currentPage}
                  currRecordsCount={getADepositAttachmentsInfo.length}
                  totalRows={getADepositAttachmentsInfo.totalRows}
                  tempData={getADepositAttachmentsData}
                  pagesCountToshow={4}
                  refreshFunc={this.setAttachmentRequestNextPage}
                />
              </div>
            </div>
            <TableComponent classnames="striped bordered hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Filename</th>
                  <th>Description</th>
                  <th>Created by</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getADepositAttachmentsData.map((eachAttachment, index) => {
                  return (
                    <tr key={index}>
                      <td>{eachAttachment.title} </td>
                      <td>{eachAttachment.fileName} </td>
                      <td>{eachAttachment.description} </td>
                      <td>
                        {" "}
                        <NavLink
                          to={`/user/${eachAttachment.createdByUserEncodedKey}`}
                        >
                          {eachAttachment.createdByUserName}
                        </NavLink>{" "}
                      </td>
                      <td>{getDateFromISO(eachAttachment.timeStamp)} </td>
                      <td>
                        {eachAttachment.linkIdentifier !== "" &&
                          eachAttachment.linkIdentifier !== null &&
                          eachAttachment.linkIdentifier !== undefined && (
                            <DropdownButton
                              size="sm"
                              title="Actions"
                              key="editUser"
                              className="customone"
                            >
                              <a
                                className="dropdown-item"
                                href={`${routes.GET_DOWNLOAD}FileType=DEPOSIT&EncodedKey=${this.depositEncodedKey}&Link=${eachAttachment.linkIdentifier}`}
                                // onClick={()=>this.getADownload('DEPOSIT',eachAttachment.linkIdentifier)}
                              >
                                Download
                              </a>
                            </DropdownButton>
                          )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </TableComponent>
            {allUSerPermissions.indexOf("bnk_manage_deposit_attachments") >
              -1 && (
              <div className="footer-with-cta toright">
                <Button onClick={this.handleAttachmentBoxShow}>
                  Upload Document
                </Button>
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div className="no-records">
            <div className="heading-with-cta ">
              <Form className="one-liner"></Form>
              <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select
                  id="toshow"
                  value={this.state.PageSize}
                  className="countdropdown form-control form-control-sm"
                >
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
                  <th>Title</th>
                  <th>Filename</th>
                  <th>Description</th>
                  <th>Created by</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </TableComponent>
            {allUSerPermissions.indexOf("bnk_manage_deposit_attachments") >
              -1 && (
              <div className="footer-with-cta toright">
                <Button onClick={this.handleAttachmentBoxShow}>
                  Upload Document
                </Button>
              </div>
            )}
          </div>
        );
      }
    }

    if (
      getADepositAccountAttachmentsRequest.request_status ===
      loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_ATTACHMENTS_FAILURE
    ) {
      return (
        <div className="loading-content errormsg">
          <div>{getADepositAccountAttachmentsRequest.request_data.error}</div>
        </div>
      );
    }
  };

  renderOverview = (depositAccountData) => {
    return (
      <div>
        <div className="overview-wrap">
          <div className="each-overview">
            <h6>General</h6>
            <TableComponent classnames="striped bordered hover">
              <tbody>
                <tr>
                  <td>Account ID</td>
                  <td>{depositAccountData.accountNumber}</td>
                </tr>
                <tr>
                  <td>Product Name</td>
                  <td>{depositAccountData.productName}</td>
                </tr>
                <tr>
                  <td>Product Type</td>
                  <td>{depositAccountData.productTypeDescription}</td>
                </tr>
                {depositAccountData.isMaturityDateSet === true && (
                  <tr>
                    <td>Maturity Date</td>
                    <td>{getDateFromISO(depositAccountData.maturityDate)}</td>
                  </tr>
                )}
                <tr>
                  <td>Account State</td>
                  <td>{depositAccountData.accountStateDescription}</td>
                </tr>
                <tr>
                  <td>Account Officer name</td>
                  <td>{depositAccountData.accountOfficerName}</td>
                </tr>
                <tr>
                  <td>PND Status</td>
                  <td>
                    {depositAccountData.isOnPND ? "On PND" : "Not on PND"}
                  </td>
                </tr>
                <tr>
                  <td>Currency</td>
                  <td>{depositAccountData?.currencyCode ?? "" + " "} </td>
                </tr>
                <tr>
                  <td>Date Created</td>
                  <td>{depositAccountData.dateCreated}</td>
                </tr>
              </tbody>
            </TableComponent>
          </div>
          <div className="each-overview">
            <h6>Other details</h6>
            <TableComponent classnames="striped bordered hover">
              <tbody>
                <tr>
                  <td>Interest Accrued</td>
                  <td>
                    {numberWithCommas(
                      depositAccountData.interestAccrued,
                      true,
                      true
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Interest Earned</td>
                  <td>
                    {numberWithCommas(
                      depositAccountData.interestDue,
                      true,
                      true
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Interest Paid</td>
                  <td>
                    {numberWithCommas(
                      depositAccountData.interestPaid,
                      true,
                      true
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Blocked Amount</td>
                  <td>
                    {numberWithCommas(
                      depositAccountData.blockedAmount,
                      true,
                      true
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Withdrawal Limit</td>
                  {depositAccountData.withdrawalLimit && (
                    <td>
                      {" "}
                      {numberWithCommas(
                        depositAccountData.withdrawalLimit,
                        true,
                        true
                      )}
                    </td>
                  )}
                  {!depositAccountData.withdrawalLimit && <td></td>}
                </tr>
              </tbody>
            </TableComponent>
          </div>
        </div>
      </div>
    );
  };


  

  renderSettlementAccountData = (settlementAccountData) => {
    let saveRequestData =
      settlementAccountData.request_data !== undefined
        ? settlementAccountData.request_data.tempData
        : null;
    if (
      settlementAccountData.request_status ===
      loanAndDepositsConstants.GET_SETTLEMENT_ACCOUNT_PENDING
    ) {
      if (
        saveRequestData === undefined ||
        (saveRequestData !== undefined && saveRequestData.length < 1)
      ) {
        return (
          <div className="each-overview">
            <h6> Settlement Account </h6>
            <div className="loading-text">Please wait... </div>
            <TableComponent classnames="striped bordered hover">
              <thead>
                <tr>
                  <th>Loan Account</th>
                  <th>Name</th>
                  <th>Loan Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
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
          <div className="each-overview">
            <h6> Settlement Account </h6>
            <div className="loading-text">Please wait... </div>

            <TableComponent classnames="striped bordered hover">
              <thead>
                <tr>
                  <th>Loan Account</th>
                  <th>Name</th>
                  <th>Loan Amount</th>
                  <th></th>
                </tr>
              </thead>
              <tbody></tbody>
            </TableComponent>
          </div>
        );
      }
    }

    if (
      settlementAccountData.request_status ===
      loanAndDepositsConstants.GET_SETTLEMENT_ACCOUNT_SUCCESS
    ) {
      let getSettlementAccountData =
        settlementAccountData.request_data.response.data.result;

      if (getSettlementAccountData.length >= 1) {
        return (
          <div className="each-overview">
            <h6> Settlement Account </h6>
            <TableComponent classnames="striped bordered hover">
              <thead>
                <tr>
                  <th>Loan Account</th>
                  <th>Name</th>
                  <th>Loan Amount</th>
                </tr>
              </thead>
              <tbody>
                {getSettlementAccountData
                  .slice(0, 5)
                  .map((settlement, index) => {
                    return (
                      <tr key={index}>
                        <td>{settlement.accountNumber}</td>
                        <td>{settlement.loanStateDescription}</td>
                        <td>{numberWithCommas(settlement.loanAmount)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </TableComponent>
          </div>
        );
      } else {
        return (
          <div className="each-overview">
            <div> Settlement Account </div>
            <TableComponent classnames="striped bordered hover">
              <thead>
                <tr>
                  <th>Loan Amount</th>
                  <th>Name</th>
                  <th>Loan Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </TableComponent>
          </div>
        );
      }
    }
  };

  handleShowBeginMaturityModal = () =>
    this.setState({ showBeginMaturityModal: true });
  handleShowDepositFundModal = () =>
    this.setState({ showDepositFundModal: true });
  handleShowMakeWithdrawalModal = () =>
    this.setState({ showMakeWithdrawalModal: true });
  handleShowSetMaximumWithdrawalAmountModal = () =>
    this.setState({ showSetMaximumWithdrawalAmountModal: true });
  handleShowRecommendedAmountModal = () =>
    this.setState({ showRecommendedAmountModal: true });
  handleShowLockAccountModal = () =>
    this.setState({ showLockAccountModal: true });
  handleShowUnlockAccountModal = () =>
    this.setState({ showUnlockAccountModal: true });
  handleShowLockAmountModal = () =>
    this.setState({ showLockAmountModal: true });
  handleShowUnlockAmountModal = (blockReference) =>
    this.setState({ showUnlockAmountModal: true, blockReference });
  handleShowSeizeAmountModal = (blockReference, amount) =>
    this.setState({ showSeizeAmountModal: true, blockReference, amount });
  handleShowTransferFundModal = () =>
    this.setState({ showTransferFundModal: true });

  handleHideBeginMaturityModal = () =>
    this.setState({ showBeginMaturityModal: false });
  handleHideDepositFundModal = () =>
    this.setState({ showDepositFundModal: false });
  handleHideMakeWithdrawalModal = () =>
    this.setState({ showMakeWithdrawalModal: false });
  handleHideSetMaximumWithdrawalAmountModal = () =>
    this.setState({ showSetMaximumWithdrawalAmountModal: false });
  handleHideRecommendedAmountModal = () =>
    this.setState({ showRecommendedAmountModal: false });
  handleHideLockAccountModal = () =>
    this.setState({ showLockAccountModal: false });
  handleHideUnlockAccountModal = () =>
    this.setState({ showUnlockAccountModal: false });
  handleHideLockAmountModal = () =>
    this.setState({ showLockAmountModal: false });
  handleHideUnlockAmountModal = () =>
    this.setState({ showUnlockAmountModal: false });
  handleHideSeizeAmountModal = () =>
    this.setState({ showSeizeAmountModal: false });
  handleHideTransferFundModal = () =>
    this.setState({ showTransferFundModal: false });

  handleDepositChangeStateClose = () =>
    this.setState({ showChangeStateModal: false });
  handleDepositChangeStateShow = () =>
    this.setState({ showChangeStateModal: true });

  handleNewDepositState = async (changeDepositStatePayload, newStateUpdate) => {
    const { dispatch } = this.props;

    await dispatch(
      depositActions.changeDepositState(
        changeDepositStatePayload,
        newStateUpdate
      )
    );
  };

  handleLockAmountState = async (lockAmountPayload, newStateUpdate) => {
    const { dispatch } = this.props;

    await dispatch(
      depositActions.lockAmountState(lockAmountPayload, newStateUpdate)
    );
  };

  getSearchForAccountOptionValue = (option) => option.searchItemEncodedKey; // maps the result 'id' as the 'value'
  getSearchOptionForAccountLabel = (option) =>
    `${option.searchText} -${option.searchKey}`; // maps the result 'name' as the 'label'
  noOptionsForAccountMessage(inputValue) {
    return "";
  }

  getSearchedAccountResults = async (inputValue) => {
    const { dispatch } = this.props;

    if (!inputValue || inputValue.length === 0) {
      return null;
    }

    await dispatch(depositActions.searchAccountNumbers(inputValue));
  };

  initiateAccountSearch = (inputValue) => {
    this.setState({
      defaultAccountOptions: "",
      selectOtherCustomerAccount: "",
      firstChosenTransferCriteria: "accounts",
      isCustommerAccountsFetchedWithKey: "",
    });

    let searchAccountNumberRequest = this.props.searchAccountNumbersReducer,
      searchResultsData,
      searchResultsList = [],
      getAClientDepositAccountRequest = this.props
        .getAClientDepositAccountReducer.request_data.response.data;
    this.props.dispatch(depositActions.searchAccountNumbers("CLEAR"));
    if (inputValue.length >= 1) {
      return this.getSearchedAccountResults(inputValue).then(() => {
        if (
          this.props.searchAccountNumbersReducer.request_status ===
          loanAndDepositsConstants.SEARCH_ACCOUNT_NUMBERS_SUCCESS
        ) {
          searchResultsData = this.props.searchAccountNumbersReducer
            .request_data.response.data;

          searchResultsData = searchResultsData.filter(
            (eachResult) =>
              ((eachResult.searchItemType === 3 &&
                (eachResult.state === 3 || eachResult.state === 5)) ||
                (eachResult.searchItemType === 2 &&
                  (eachResult.state === 6 || eachResult.state === 5))) &&
              eachResult.searchKey !==
                getAClientDepositAccountRequest.accountNumber &&
              eachResult.clientEncodedKey !==
                getAClientDepositAccountRequest.clientEncodedKey
          );

          //   searchResultsList.push({
          //     label: `${eachAccount.searchText} - ${eachAccount.searchKey}`,
          //     // value: eachAccount.clientEncodedKey,
          //     ...eachAccount,
          //     value: eachAccount.searchItemEncodedKey,
          // });

          this.setState({
            isCustommerAccountsFetchedWithKey: false,
            // defaultAccountOptions: searchResultsList,
          });

          return searchResultsData;
        }
      });
    } else {
      return null;
    }
  };

  handleSearchAccountInputChange = (selectedOption, { action }) => {
    if (this.state.isCustommerAccountsFetchedWithKey !== true) {
      this.setState({
        selectOtherCustomerAccount: selectedOption,
        firstChosenTransferCriteria: "accounts",
        selectACustomerAccount: "",
      });
    } else {
      this.setState({
        selectOtherCustomerAccount: selectedOption,
        firstChosenTransferCriteria: "customer",
      });
    }
  };

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

  loadCustomerAccounts = (selectedClientEncodedKey) => {
    let searchForAccountsWithCustomerKeyRequest = this.props
      .searchForAccountsWithCustomerKeyReducer;
    this.getAccountsOfSelectedCustomer(selectedClientEncodedKey).then(() => {
      if (
        this.props.searchForAccountsWithCustomerKeyReducer.request_status ===
        loanAndDepositsConstants.SEARCH_FOR_ACCOUNTS_WITH_CUSTOMERKEY_SUCCESS
      ) {
        let loadedCustomerAccounts = this.props
            .searchForAccountsWithCustomerKeyReducer.request_data.response.data,
          customerAccounts = [];

        if (loadedCustomerAccounts.length >= 1) {
          loadedCustomerAccounts.map((eachAccount, index) => {
            if (
              (eachAccount.searchItemType === 2 &&
                (eachAccount.state === 5 || eachAccount.state === 6)) ||
              (eachAccount.searchItemType === 3 &&
                (eachAccount.state === 3 || eachAccount.state === 5))
            ) {
              customerAccounts.push({
                label: eachAccount.searchText,
                value: eachAccount.searchItemEncodedKey,
              });
            }
          });
          this.setState({
            defaultAccountOptions: loadedCustomerAccounts,
            isCustommerAccountsFetchedWithKey: true,
          });
        }
      }
    });
  };

  getAccountsOfSelectedCustomer = async (selectedClientEncodedKey) => {
    const { dispatch } = this.props;
    return await dispatch(
      depositActions.searchForAccountsWithCustomerKey(selectedClientEncodedKey)
    );
  };

  getSearchForCustomerOptionValue = (option) => {
    return option.searchItemEncodedKey;
  }; // maps the result 'id' as the 'value'
  getSearchOptionForCustomerLabel = (option) => {
    return `${option.clientName} -${option.clientCode}`;
  }; // maps the result 'name' as the 'label'
  noOptionsForCustomerMessage(inputValue) {
    return "";
  }

  getSearchedCustomerResults = async (inputValue) => {
    const { dispatch } = this.props;

    if (!inputValue || inputValue.length === 0) {
      return null;
    }

    await dispatch(depositActions.searchCustomerAccount(inputValue));
  };

  initiateCustomerSearch = (inputValue) => {
    this.setState({ firstChosenTransferCriteria: "customer" });
    let searchCustomerAccountRequest = this.props.searchCustomerAccountReducer,
      searchResultsData,
      searchResultsList = [],
      getAClientDepositAccountRequest = this.props
        .getAClientDepositAccountReducer.request_data.response.data;
    this.props.dispatch(depositActions.searchCustomerAccount("CLEAR"));
    if (inputValue.length >= 1) {
      return this.getSearchedCustomerResults(inputValue).then(() => {
        if (
          this.props.searchCustomerAccountReducer.request_status ===
          loanAndDepositsConstants.SEARCH_CUSTOMER_ACCOUNT_SUCCESS
        ) {
          searchResultsData = this.props.searchCustomerAccountReducer
            .request_data.response.data;

          // searchResultsData = searchResultsData.filter(eachResult=>(
          //         (
          //             (eachResult.searchItemType===3 && (eachResult.state===3 || eachResult.state===5))
          //             ||
          //             (eachResult.searchItemType===2 && (eachResult.state===6 || eachResult.state===5))
          //         )
          //         && eachResult.searchKey !==getAClientDepositAccountRequest.accountNumber
          //         ))

          // return searchResultsData;

          searchResultsData = searchResultsData.filter(
            (eachResult) =>
              eachResult.clientEncodedKey !==
                getAClientDepositAccountRequest.clientEncodedKey &&
              eachResult.searchItemEncodedKey !==
                getAClientDepositAccountRequest.clientEncodedKey
          );

          return searchResultsData;
        }
      });
    } else {
      return null;
    }
  };

  handleSearchACustomerInputChange = (selectedOption, { action }) => {
    this.loadCustomerAccounts(selectedOption.clientEncodedKey);
    this.setState({
      selectACustomerAccount: selectedOption,
      firstChosenTransferCriteria: "customer",
      selectOtherCustomerAccount: "",
    });
  };

  enforcePermissions = () => {
    let allUSerPermissions = [];
    this.userPermissions.map((eachPermission) => {
      allUSerPermissions.push(eachPermission.permissionCode);
    });

    let allowApproveDeposit =
      allUSerPermissions.indexOf("bnk_approve_deposit_account") > -1;
    let allowRequestDepositApproval =
      allUSerPermissions.indexOf("bnk_request_deposit_approval") > -1;
    let allowRejectDepositApproval =
      allUSerPermissions.indexOf("bnk_reject_deposit_account") > -1;

    this.permissions = {
      allowApproveDeposit: allowApproveDeposit,
      allowRequestDepositApproval: allowRequestDepositApproval,
      allowRejectDepositApproval: allowRejectDepositApproval,
    };
    return this.permissions;
  };

  enforceVisibility = (depositDetails) => {
    //  ALL:0, Partial_Application:1,Pending_Approval:2,  Approved:3,REJECTED:4, ACTIVE:5,IN_ARREARS:6,CLOSED:7,CLOSED_WRITTEN_OFF:8,DORMANT:9,LOCKED:10,MARTURED:11,
    if (depositDetails == null) return;
    let showApprove =
      depositDetails.accountState === DepositStateConstants.Pending_Approval;

    let showIncomplete =
      depositDetails.accountState === DepositStateConstants.Pending_Approval;
    let showRequestApproval = depositDetails.accountState === 1;
    let showbeginMaturity =
      depositDetails.accountState === DepositStateConstants.ACTIVE &&
      depositDetails.isMaturityDateSet === false &&
      depositDetails.productType === 2;
    let showMakeWithdrawal =
      depositDetails.accountState === DepositStateConstants.ACTIVE;

    let showTransfer =
      depositDetails.accountState === DepositStateConstants.ACTIVE ||
      depositDetails.accountState === DepositStateConstants.Approved;
    //    &&
    // (depositDetails.productType === 2 ||
    //   depositDetails.productType === 1 ||
    //   depositDetails.productType === 4)
    let showMakeDeposit =
      depositDetails.accountState === DepositStateConstants.ACTIVE ||
      depositDetails.accountState === DepositStateConstants.Approved;
    let showReject =
      depositDetails.accountState ===
        DepositStateConstants.Partial_Application ||
      depositDetails.accountState === DepositStateConstants.Pending_Approval;
    let showClosedWithdraw =
      depositDetails.accountState ===
        DepositStateConstants.Partial_Application ||
      depositDetails.accountState === DepositStateConstants.Pending_Approval ||
      depositDetails.accountState === DepositStateConstants.Approved;

    this.visibility = {
      showApprove: showApprove,
      showIncomplete: showIncomplete,
      showRequestApproval: showRequestApproval,
      showbeginMaturity: showbeginMaturity,
      showMakeWithdrawal: showMakeWithdrawal,
      showTransfer: showTransfer,
      showMakeDeposit: showMakeDeposit,
      showReject: showReject,
      showClosedWithdraw: showClosedWithdraw,
    };

    return this.visibility;
  };

  renderDepositCtas = (depositDetails) => {
    // let allUSerPermissions = [];
    // this.userPermissions.map((eachPermission) => {
    //   allUSerPermissions.push(eachPermission.permissionCode);
    // });

    let visibility = this.enforceVisibility(depositDetails);
    //this.enforcePermissions();
    return (
      <div className="heading-ctas">
        <ul className="nav">
          {visibility.showApprove && this.permissions.allowApproveDeposit && (
            <li>
              <Button
                size="sm"
                onClick={() => {
                  this.setState({
                    newState: "Approved",
                    newStateUpdate: "approve",
                    newStateHeading: "Change Deposit State",
                    ctaText: "Approve Deposit",
                  });
                  this.handleDepositChangeStateShow();
                }}
              >
                Approve
              </Button>
            </li>
          )}
          {visibility.showIncomplete && (
            <li>
              <Button
                size="sm"
                onClick={() => {
                  this.setState({
                    newState: "Set Incomplete",
                    newStateHeading: "Change Deposit State",
                    newStateUpdate: "settopartialapplication",
                    ctaText: "Set Incomplete",
                  });
                  this.handleDepositChangeStateShow();
                }}
              >
                Set Incomplete
              </Button>
            </li>
          )}

          {visibility.showbeginMaturity && (
            <li>
              <Button
                size="sm"
                onClick={() => {
                  this.setState({
                    newState: "Begin Maturity Period",
                    newStateHeading: "Begin Maturity Period",
                    newStateUpdate: "beginmaturity",
                    ctaText: "Begin Maturity",
                  });
                  this.handleShowBeginMaturityModal();
                }}
              >
                Begin Maturity
              </Button>
            </li>
          )}

          {visibility.showMakeWithdrawal && (
            <li>
              <Button
                size="sm"
                onClick={() => {
                  this.setState({
                    newState: "Make Withdrawal",
                    newStateHeading: "Make Withdrawal",
                    newStateUpdate: "makewithdrawal",
                    ctaText: "Make Withdrawal",
                  });
                  this.handleShowMakeWithdrawalModal();
                }}
              >
                Make Withdrawal
              </Button>
            </li>
          )}

          {visibility.showTransfer && (
            <li>
              <Button
                size="sm"
                onClick={() => {
                  this.setState({
                    typeOfTransfer: "currentcustomer",
                    selectOtherCustomerAccount: "",
                    selectACustomerAccount: "",
                    newState: "Make Transfer",
                    newStateHeading: "Make Transfer",
                    newStateUpdate: "transfer",
                    ctaText: "Make Transfer",
                  });
                  this.handleShowTransferFundModal();
                }}
              >
                Transfer
              </Button>
            </li>
          )}

          {/* {(depositDetails.accountState ===5) &&
                            <li>
                                <Button size="sm" >Enter Repayment</Button>
                            </li>
                        } */}

          {visibility.showRequestApproval &&
            this.permissions.allowRequestDepositApproval && (
              <li>
                <Button
                  size="sm"
                  onClick={() => {
                    this.setState({
                      newState: "Request Approval",
                      newStateHeading: "Change Deposit State",
                      newStateUpdate: "requestapproval",
                      ctaText: "Request Approval",
                    });
                    this.handleDepositChangeStateShow();
                  }}
                >
                  Request Approval
                </Button>
              </li>
            )}

          {visibility.showMakeDeposit && (
            <li>
              <Button
                size="sm"
                onClick={() => {
                  this.setState({
                    newStateUpdate: "deposit",
                    newStateHeading: "Deposit Transaction",
                    ctaText: "Make Deposit",
                    showDepositFundsForm: true,
                  });
                  this.handleShowDepositFundModal();
                }}
              >
                Make Deposit
              </Button>
            </li>
          )}
          {(depositDetails.accountState === 1 ||
            depositDetails.accountState === 2 ||
            depositDetails.accountState === 3) && (
            <li>
              <DropdownButton
                size="sm"
                title="Close"
                key="inActiveCurrency"
                className="customone"
                alignRight
              >
                {visibility.showReject &&
                  this.permissions.allowRejectDepositApproval && (
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() => {
                        this.setState({
                          newState: "Rejected",
                          newStateUpdate: "reject",
                          newStateHeading: "Change Deposit State",
                          ctaText: "Reject",
                        });
                        this.handleDepositChangeStateShow();
                      }}
                    >
                      Reject
                    </Dropdown.Item>
                  )}
                {visibility.showClosedWithdraw && (
                  <Dropdown.Item
                    eventKey="2"
                    onClick={() => {
                      this.setState({
                        newState: "Closed(Withdrawn)",
                        newStateHeading: "Change Deposit State",
                        newStateUpdate: "withdraw",
                        ctaText: "Withdraw",
                      });
                      this.handleDepositChangeStateShow();
                    }}
                  >
                    Withdraw
                  </Dropdown.Item>
                )}
              </DropdownButton>
            </li>
          )}
          <li>
            <DropdownButton
              size="sm"
              title="More"
              key="inActiveCurrency"
              className="customone"
              alignRight
            >
              <Dropdown.Item
                eventKey="5"
                onClick={() => {
                  this.setState({
                    newStateUpdate: "setmaximumwithdrawalamount",
                    newStateHeading: "Maximum Withdrawal Amount",
                    ctaText: "Update",
                  });
                  this.handleShowSetMaximumWithdrawalAmountModal();
                }}
              >
                Set Max Withdrawal Amount
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="6"
                onClick={() => {
                  this.setState({
                    newStateUpdate: "setrecommendeddepositamount",
                    newStateHeading: "Recommended Deposit Amount",
                    ctaText: "Update",
                  });
                  this.handleShowRecommendedAmountModal();
                }}
              >
                Set Recommended Deposit
              </Dropdown.Item>
              {depositDetails.accountStateDescription !== "Locked" ? (
                <Dropdown.Item
                  eventKey="7"
                  onClick={() => {
                    this.setState({
                      newStateUpdate: "lockAccount",
                      newStateHeading: "Lock Account",
                      ctaText: "Lock",
                    });
                    this.handleShowLockAccountModal();
                  }}
                >
                  Lock Account
                </Dropdown.Item>
              ) : (
                <Dropdown.Item
                  eventKey="8"
                  onClick={() => {
                    this.setState({
                      newStateUpdate: "unlockAccount",
                      newStateHeading: "UnLock Account",
                      ctaText: "Unlock",
                    });
                    this.handleShowUnlockAccountModal();
                  }}
                >
                  Unlock Account
                </Dropdown.Item>
              )}
              {depositDetails.accountStateDescription === "Active" && (
                <Dropdown.Item
                  eventKey="9"
                  onClick={() => {
                    this.setState({
                      newStateUpdate: "lockAmount",
                      newStateHeading: "Lock Amount",
                      ctaText: "lockAmount",
                    });
                    this.handleShowLockAmountModal();
                  }}
                >
                  Lock Amount
                </Dropdown.Item>
              )}
            </DropdownButton>
          </li>
        </ul>
      </div>
    );
  };

  renderPage = () => {
    let getAClientRequest = this.props.getAClientReducer,
      getClientLoansRequest = this.props.getClientLoansReducer,
      getAClientDepositAccountRequest = this.props
        .getAClientDepositAccountReducer,
      getClientDepositsRequest = this.props.getClientDepositsReducer;
    let allUSerPermissions = [];
    this.userPermissions.map((eachPermission) => {});

    if (
      getAClientRequest.request_status ===
        clientsConstants.GET_A_CLIENT_SUCCESS &&
      getClientLoansRequest.request_status ===
        loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS &&
      getClientDepositsRequest.request_status ===
        loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS &&
      getAClientDepositAccountRequest.request_status ===
        loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_DETAILS_PENDING
    ) {
      return <div className="loading-text mt-30">Please wait... </div>;
    }

    if (
      getAClientDepositAccountRequest.request_status ===
        loanAndDepositsConstants.GET_A_DEPOSIT_ACCOUNT_DETAILS_SUCCESS &&
      getClientLoansRequest.request_status ===
        loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS &&
      getClientDepositsRequest.request_status ===
        loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS
    ) {
      return (
        <div className="row">
          <BeginMaturityModal
            {...this.props}
            newStateUpdate={this.state.newStateUpdate}
            newStateHeading={this.state.newStateHeading}
            newState={this.state.newState}
            depositEncodedKey={this.depositEncodedKey}
            showModal={this.state.showBeginMaturityModal}
            CurCode={
              getAClientDepositAccountRequest.request_data.response.data
                .currencyCode
            }
            handleHideModal={this.handleHideBeginMaturityModal}
            handleNewDepositState={this.handleNewDepositState}
            getCustomerDepositAccountDetails={
              this.getCustomerDepositAccountDetails
            }
          />
          <ChangeDepositStateModal
            {...this.props}
            depositEncodedKey={this.depositEncodedKey}
            oldState={
              getAClientDepositAccountRequest.request_data?.response.data
                ?.accountStateDescription
            }
            newStateUpdate={this.state.newStateUpdate}
            newStateHeading={this.state.newStateHeading}
            newState={this.state.newState}
            ctaText={this.state.ctaText}
            CurCode={
              getAClientDepositAccountRequest.request_data.response.data
                .currencyCode
            }
            showModal={this.state.showChangeStateModal}
            handleHideModal={this.handleDepositChangeStateClose}
            handleNewDepositState={this.handleNewDepositState}
            getCustomerDepositAccountDetails={
              this.getCustomerDepositAccountDetails
            }
          />

          <MakeAccountDepositModal
            {...this.props}
            newStateUpdate={this.state.newStateUpdate}
            newStateHeading={this.state.newStateHeading}
            newState={this.state.newState}
            depositEncodedKey={this.depositEncodedKey}
            showModal={this.state.showDepositFundModal}
            CurCode={
              getAClientDepositAccountRequest.request_data.response.data
                .currencyCode
            }
            handleHideModal={this.handleHideDepositFundModal}
            handleNewDepositState={this.handleNewDepositState}
            getCustomerDepositAccountDetails={
              this.getCustomerDepositAccountDetails
            }
          />
          <MakeAccountWithdrawalModal
            {...this.props}
            newStateUpdate={this.state.newStateUpdate}
            newStateHeading={this.state.newStateHeading}
            newState={this.state.newState}
            depositEncodedKey={this.depositEncodedKey}
            showModal={this.state.showMakeWithdrawalModal}
            CurCode={
              getAClientDepositAccountRequest.request_data.response.data
                .currencyCode
            }
            handleHideModal={this.handleHideMakeWithdrawalModal}
            handleNewDepositState={this.handleNewDepositState}
            getCustomerDepositAccountDetails={
              this.getCustomerDepositAccountDetails
            }
          />
          <SetMaximumWithdrawalModal
            {...this.props}
            newStateUpdate={this.state.newStateUpdate}
            newStateHeading={this.state.newStateHeading}
            newState={this.state.newState}
            depositEncodedKey={this.depositEncodedKey}
            CurCode={
              getAClientDepositAccountRequest.request_data.response.data
                .currencyCode
            }
            showModal={this.state.showSetMaximumWithdrawalAmountModal}
            handleHideModal={this.handleHideSetMaximumWithdrawalAmountModal}
            handleNewDepositState={this.handleNewDepositState}
            getCustomerDepositAccountDetails={
              this.getCustomerDepositAccountDetails
            }
          />
          <SetRecommendedAmountModal
            {...this.props}
            newStateUpdate={this.state.newStateUpdate}
            newStateHeading={this.state.newStateHeading}
            newState={this.state.newState}
            depositEncodedKey={this.depositEncodedKey}
            CurCode={
              getAClientDepositAccountRequest.request_data.response.data
                .currencyCode
            }
            showModal={this.state.showRecommendedAmountModal}
            handleHideModal={this.handleHideRecommendedAmountModal}
            handleNewDepositState={this.handleNewDepositState}
            getCustomerDepositAccountDetails={
              this.getCustomerDepositAccountDetails
            }
          />
          <SetLockAccountModal
            {...this.props}
            newStateUpdate={this.state.newStateUpdate}
            newStateHeading={this.state.newStateHeading}
            newState={this.state.newState}
            oldState={
              getAClientDepositAccountRequest.request_data?.response.data
                ?.accountStateDescription
            }
            newState={this.state.newState}
            depositEncodedKey={this.depositEncodedKey}
            CurCode={
              getAClientDepositAccountRequest.request_data.response.data
                .currencyCode
            }
            showModal={this.state.showLockAccountModal}
            handleHideModal={this.handleHideLockAccountModal}
            handleNewDepositState={this.handleNewDepositState}
            getCustomerDepositAccountDetails={
              this.getCustomerDepositAccountDetails
            }
          />
          <SetUnlockAccountModal
            {...this.props}
            newStateUpdate={this.state.newStateUpdate}
            newStateHeading={this.state.newStateHeading}
            newState={this.state.newState}
            depositEncodedKey={this.depositEncodedKey}
            oldState={
              getAClientDepositAccountRequest.request_data?.response.data
                ?.accountStateDescription
            }
            showModal={this.state.showUnlockAccountModal}
            handleHideModal={this.handleHideUnlockAccountModal}
            handleNewDepositState={this.handleNewDepositState}
            getCustomerDepositAccountDetails={
              this.getCustomerDepositAccountDetails
            }
          />
          <SetLockAmountModal
            {...this.props}
            oldState={
              getAClientDepositAccountRequest.request_data?.response.data
                ?.accountStateDescription
            }
            depositEncodedKey={this.depositEncodedKey}
            showModal={this.state.showLockAmountModal}
            handleHideModal={this.handleHideLockAmountModal}
            handleLockAmountState={this.handleLockAmountState}
            getCustomerDepositAccountDetails={
              this.getCustomerDepositAccountDetails
            }
          />
          <SiezeAmountModal
            {...this.props}
            newStateUpdate={this.state.newStateUpdate}
            newStateHeading={this.state.newStateHeading}
            newState={this.state.newState}
            depositEncodedKey={this.depositEncodedKey}
            amount={this.state.amount}
            CurCode={
              getAClientDepositAccountRequest.request_data.response.data
                .currencyCode
            }
            blockReference={this.state.blockReference}
            showModal={this.state.showSeizeAmountModal}
            handleHideModal={this.handleHideSeizeAmountModal}
            handleLockAmountState={this.handleLockAmountState}
            getCustomerDepositAccountDetails={
              this.getCustomerDepositAccountDetails
            }
          />
          <SetUnlockAmountModal
            {...this.props}
            oldState={
              getAClientDepositAccountRequest.request_data?.response.data
                ?.accountStateDescription
            }
            depositEncodedKey={this.depositEncodedKey}
            blockReference={this.state.blockReference}
            showModal={this.state.showUnlockAmountModal}
            handleHideModal={this.handleHideUnlockAmountModal}
            handleLockAmountState={this.handleLockAmountState}
            getCustomerDepositAccountDetails={
              this.getCustomerDepositAccountDetails
            }
          />
          <MakeTransferModal
            {...this.props}
            newStateUpdate={this.state.newStateUpdate}
            newStateHeading={this.state.newStateHeading}
            newState={this.state.newState}
            depositEncodedKey={this.depositEncodedKey}
            CurCode={
              getAClientDepositAccountRequest.request_data.response.data
                .currencyCode
            }
            showModal={this.state.showTransferFundModal}
            handleHideModal={this.handleHideTransferFundModal}
            handleNewDepositState={this.handleNewDepositState}
            getCustomerDepositAccountDetails={
              this.getCustomerDepositAccountDetails
            }
          />

          {/* {this.changeDepositStateBox(getAClientDepositAccountRequest.request_data.response.data)} */}
          <div className="col-sm-12">
            <div className="middle-content">
              <div className="customerprofile-tabs">
                <Tab.Container defaultActiveKey="details">
                  <Nav variant="pills">
                    <Nav.Item>
                      <Nav.Link
                        bsPrefix="disable"
                        className="navLink"
                        eventKey="details"
                      >
                        Details
                      </Nav.Link>
                    </Nav.Item>
                    {allUSerPermissions.indexOf(
                      "bnk_view_deposit_transactions"
                    ) > -1 && (
                      <Nav.Item>
                        <Nav.Link
                          bsPrefix="disable"
                          className="navLink"
                          eventKey="transactions"
                          onSelect={this.getCustomerDepositTransactions}
                        >
                          Transactions
                        </Nav.Link>
                      </Nav.Item>
                    )}

                    {allUSerPermissions.indexOf("bnk_view_deposit_activities") >
                      -1 && (
                      <Nav.Item>
                        <Nav.Link
                          bsPrefix="disable"
                          className="navLink"
                          eventKey="activity"
                          onSelect={this.getADepositActivities}
                        >
                          Activity
                        </Nav.Link>
                      </Nav.Item>
                    )}
                    {allUSerPermissions.indexOf(
                      "bnk_view_deposit_attachments"
                    ) > -1 && (
                      <Nav.Item>
                        <Nav.Link
                          bsPrefix="disable"
                          className="navLink"
                          eventKey="attachments"
                          onSelect={this.getACustomerDepositAttachments}
                        >
                          Attachments
                        </Nav.Link>
                      </Nav.Item>
                    )}
                    {allUSerPermissions.indexOf("bnk_view_deposit_comments") >
                      -1 && (
                      <Nav.Item>
                        <Nav.Link
                          bsPrefix="disable"
                          className="navLink"
                          eventKey="comments"
                          onSelect={this.getADepositComments}
                        >
                          Comments
                        </Nav.Link>
                      </Nav.Item>
                    )}
                    {allUSerPermissions.indexOf(
                      "bnk_view_deposit_communications"
                    ) > -1 && (
                      <Nav.Item>
                        <Nav.Link
                          bsPrefix="disable"
                          className="navLink"
                          eventKey="communications"
                          onSelect={this.getADepositCommunications}
                        >
                          Communications
                        </Nav.Link>
                      </Nav.Item>
                    )}
                    <Nav.Item>
                      <Nav.Link
                        bsPrefix="disable"
                        className="navLink"
                        eventKey="lockAmount"
                        onSelect={this.getLockedAmount}
                      >
                        Authorization Holds
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  {this.renderDepositCtas(
                    getAClientDepositAccountRequest.request_data.response.data
                  )}
                  <Tab.Content>
                    <Tab.Pane eventKey="details">
                      <div className="amounts-wrap w-40 centered">
                        {this.renderAccountState(
                          getAClientDepositAccountRequest.request_data.response
                            .data
                        )}
                      </div>
                      {this.renderOverview(
                        getAClientDepositAccountRequest.request_data.response
                          .data
                      )}
                      {this.renderSettlementAccountData(
                        this.props.getSettlementReducer
                      )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="transactions">
                      <ReverseTransaction
                        transactionKey={this.state.transactionKey}
                        transactionType={this.state.transactionType}
                        handleCloseReverse={this.handleShowReverseClose}
                        transactionDetails={this.state.transactionDetails}
                        showReverseTransaction={this.state.showReverseBox}
                        CurCode={
                          getAClientDepositAccountRequest.request_data.response
                            .data.currencyCode
                        }
                        transactionMode="Deposit"
                      />
                      <ViewATransaction
                        transactionKey={this.state.transactionKey}
                        transactionType={this.state.transactionType}
                        handleViewTxtnClose={this.handleViewTxtnClose}
                        transactionDetails={this.state.transactionDetails}
                        CurCode={
                          getAClientDepositAccountRequest.request_data.response
                            .data.currencyCode
                        }
                        ViewTxtnBox={this.state.ViewTxtnBox}
                        transactionMode="Deposit"
                      />
                      {this.renderDepositTransaction()}
                    </Tab.Pane>
                    <Tab.Pane eventKey="activity">
                      {this.renderDepositAccountActivities()}
                    </Tab.Pane>
                    <Tab.Pane eventKey="attachments">
                      {this.addNewAttachmentBox()}
                      {this.renderADepositAttachments()}
                    </Tab.Pane>
                    <Tab.Pane eventKey="comments">
                      {this.renderDepositAccountComments()}
                    </Tab.Pane>
                    <Tab.Pane eventKey="communications">
                      {this.renderADepositCommunicatons()}
                    </Tab.Pane>
                    <Tab.Pane eventKey="lockAmount">
                      {this.renderALockedAmount()}
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <Fragment>
        {/* <InnerPageContainer {...this.props}> */}
        <div className="content-wrapper">
          {/* {this.setDepositBox()}
                        {this.changeAccountStateBox()}
                        {this.setMaxWithdrawalBox()}
                        {this.changeHistoryBox()} */}
          {/* <CustomerHeading {...this.props}/> */}
          <div className="module-content">
            <div className="content-container">{this.renderPage()}</div>
          </div>
        </div>
        {/* </InnerPageContainer> */}
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    adminGetTransactionChannels:
      state.administrationReducers.adminGetTransactionChannelsReducer,
    getAClientReducer: state.clientsReducers.getAClientReducer,
    getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
    getClientLoansReducer: state.loansReducers.getClientLoansReducer,
    getAClientDepositAccountReducer:
      state.depositsReducers.getAClientDepositAccountReducer,
    getADepositAccountActivitiesReducer:
      state.depositsReducers.getADepositAccountActivitiesReducer,
    getADepositAccountCommunicationsReducer:
      state.depositsReducers.getADepositAccountCommunicationsReducer,
    getAccountDepositTransactionReducer:
      state.depositsReducers.getAccountDepositTransactionReducer,
    getAClientDepositAccountCommentsReducer:
      state.depositsReducers.getAClientDepositAccountCommentsReducer,
    createADepositCommentReducer:
      state.depositsReducers.createADepositCommentReducer,
    getADepositAccountAttachmentsReducer:
      state.depositsReducers.getADepositAccountAttachmentsReducer,
    createADepositAttachmentReducer:
      state.depositsReducers.createADepositAttachmentReducer,
    changeDepositStateReducer: state.depositsReducers.changeDepositStateReducer,
    searchAccountNumbersReducer:
      state.depositsReducers.searchAccountNumbersReducer,
    searchCustomerAccountReducer:
      state.depositsReducers.searchCustomerAccountReducer,
    searchForAccountsWithCustomerKeyReducer:
      state.depositsReducers.searchForAccountsWithCustomerKeyReducer,
    getLockAmountReducer: state.depositsReducers.getLockAmountReducer,
    LockAmountReducer: state.depositsReducers.LockAmountReducer,
    getSettlementReducer: state.depositsReducers.getSettlementReducer,
  };
}

export default connect(mapStateToProps)(ViewSavingsAccount);
