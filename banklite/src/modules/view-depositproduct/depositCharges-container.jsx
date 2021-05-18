import * as React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import InnerPageContainer from "../../shared/templates/authed-pagecontainer";
import TableComponent from "../../shared/elements/table";
import "./styles.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import TablePagination from "../../shared/elements/table/pagination";
import { numberWithCommas, getDateFromISO } from "../../shared/utils";
import { SetDepositFeeModal } from "./components/set-deposit-fee-component";
import { SetEditDepositFeeModal } from "./components/set-edit-deposit-fee-component";
import { SetDeleteDepositFeeModal } from "./components/set-delete-deposit-fee-component";
import { productActions } from "../../redux/actions/products/products.action";
import { acoountingActions } from "../../redux/actions/accounting/accounting.action";
import { accountingConstants } from "../../redux/actiontypes/accounting/accounting.constants";
import { productsConstants } from "../../redux/actiontypes/products/products.constants";
import "../administration/administration.scss";
class ViewDepositCharges extends React.Component {
  constructor(props) {
    super(props);
    this.productEncodedKey = this.props.match.params.productid;
    this.state = {
      user: JSON.parse(localStorage.getItem("lingoAuth")),
      PageSize: 25,
      CurrentPage: 1,
      FullDetails: false,
      showDepositFeeModal: false,
      showDepositEditFeeModal: false,
      showDepositDeleteFeeModal: false,
    };
  }

  componentDidMount() {
    this.loadInitialUserData();
  }

  loadInitialUserData = () => {
    let { PageSize, CurrentPage } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
    const { dispatch } = this.props;
    dispatch(productActions.getDepositFee(params, this.productEncodedKey));
  };

  setPagesize = (PageSize, tempData) => {
    const { dispatch } = this.props;

    let sizeOfPage = PageSize.target.value,
      { FullDetails, CurrentPage } = this.state;

    this.setState({ PageSize: sizeOfPage });

    let params = `FullDetails=${FullDetails}&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;

    if (tempData) {
      dispatch(
        productActions.getDepositFee(params, this.productEncodedKey, tempData)
      );
    } else {
      dispatch(productActions.getDepositFee(params, this.productEncodedKey));
    }
  };

  loadNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;
    let { PageSize } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${nextPage}`;
    if (tempData) {
      dispatch(
        productActions.getDepositFee(params, this.productEncodedKey, tempData)
      );
    } else {
      dispatch(productActions.getDepositFee(params, this.productEncodedKey));
    }
  };

  setShowDetails = (FullDetails, tempData) => {
    const { dispatch } = this.props;
    let showDetails = FullDetails.target.checked,
      { CurrentPage, PageSize } = this.state;
    this.setState({ FullDetails: showDetails });

    let params = `FullDetails=${showDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
    if (tempData) {
      dispatch(
        productActions.getDepositFee(params, this.productEncodedKey, tempData)
      );
    } else {
      dispatch(productActions.getDepositFee(params, this.productEncodedKey));
    }
  };

  handleNewDepositFee = async (
    depositFeePayload,
    newStateUpdate,
    productencodedKey
  ) => {
    const { dispatch } = this.props;
    await dispatch(
      productActions.createDepositFee(
        depositFeePayload,
        newStateUpdate,
        productencodedKey
      )
    );
  };

  handleEditDepositFee = async (
    depositFeePayload,
    newStateUpdate,
    productencodedKey
  ) => {
    const { dispatch } = this.props;
    await dispatch(
      productActions.updateDespositFee(
        depositFeePayload,
        newStateUpdate,
        productencodedKey
      )
    );
  };

  handleDeleteDepositFee = async (
    depositSavingFeeId,
    newStateUpdate,
    productencodedKey
  ) => {
    const { dispatch } = this.props;
    await dispatch(
      productActions.deleteDespositFee(
        depositSavingFeeId,
        newStateUpdate,
        productencodedKey
      )
    );
  };

  fetchForEmptyState = () => {
    //This function returns the biew for empty list
    let getDepositFeeRequest = this.props.getDepositFeeReducer;
    let saveRequestData =
      getDepositFeeRequest.request_data !== undefined
        ? getDepositFeeRequest.request_data.tempData
        : null;
    switch (getDepositFeeRequest.request_status) {
      case productsConstants.GET_A_DEPOSIT_FEE_PENDING:
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
            </tr>
          </tbody>
        );
      default:
        return null;
    }
  };

  fetchErrorState() {
    let getDepositFeeRequest = this.props.getDepositFeeReducer;
    switch (getDepositFeeRequest.request_status) {
      case productsConstants.GET_A_DEPOSIT_FEE_FAILURE:
        return (
          <div className="loading-content errormsg">
            <div>{getDepositFeeRequest.request_data.error}</div>
          </div>
        );
      default:
        return null;
    }
  }

  fetchForBusyState() {
    let getDepositFeeRequest = this.props.getDepositFeeReducer;
    switch (getDepositFeeRequest.request_status) {
      case productsConstants.GET_A_DEPOSIT_FEE_PENDING:
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
    let getDepositFeeRequest = this.props.getDepositFeeReducer;
    switch (getDepositFeeRequest.request_status) {
      case productsConstants.GET_A_DEPOSIT_FEE_SUCCESS:
        let allDepositFeeData =
          getDepositFeeRequest.request_data !== undefined
            ? getDepositFeeRequest?.request_data?.response?.data
            : null;
        return (
          <tbody>
            {allDepositFeeData.result.map((eachFee, index) => {
              return (
                <tr key={index}>
                  <td>{eachFee?.name}</td>
                  <td>{eachFee?.depositFeeTypeDescription}</td>
                  <td>{numberWithCommas(eachFee?.amount)}</td>
                  <td>{eachFee?.feePaymentDescription}</td>
                  <td>{eachFee?.feeIncome}</td>
                  <td>{eachFee?.feeApplyDateDescription}</td>
                  <td>
                    <DropdownButton
                      size="sm"
                      title="Actions"
                      key="DepositFee"
                      className="customone"
                    >
                      <Dropdown.Item
                        eventKey="1"
                        onClick={() =>
                          this.handleShowEditDepositFeeModal(eachFee)
                        }
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="2"
                        onClick={() =>
                          this.handleDeleteDepositFeeModal(eachFee?.id)
                        }
                      >
                        Delete
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        );

      default:
        return null;
    }
  };

  renderDepositAddFeeModal = () => {
    let createDepositFeeRequestData = this.props.createDepositFeeReducer;
    return (
      <SetDepositFeeModal
        {...this.props}
        showModal={this.state.showDepositFeeModal}
        handleHideModal={this.handleHideDepositFeeModal}
        handleNewDepositFee={this.handleNewDepositFee}
        accountEncodedKey={this.productEncodedKey}
        createDepositFeeRequest={createDepositFeeRequestData}
        loadInitialUserData={this.loadInitialUserData}
      />
    );
  };

  renderDepositEditFeeModal = () => {
    let updateDepositProductFeeRequestData = this.props
      .updateDepositProductFeeReducer;

    return (
      <SetEditDepositFeeModal
        {...this.props}
        showModal={this.state.showDepositEditFeeModal}
        handleHideModal={this.handleHideDepositEditFeeModal}
        handleEditDepositFee={this.handleEditDepositFee}
        accountEncodedKey={this.productEncodedKey}
        depositSavingFee={this.state.depositSavingFee}
        updateDepositProductFeeRequestData={updateDepositProductFeeRequestData}
        loadInitialUserData={this.loadInitialUserData}
      />
    );
  };

  renderDepositDeleteFeeModal = () => {
    let deleteDepositFeeRequestData = this.props.deleteDepositFeeReducer;

    return (
      <SetDeleteDepositFeeModal
        {...this.props}
        showModal={this.state.showDepositDeleteFeeModal}
        handleHideModal={this.handleHideDepositDeleteFeeModal}
        handleDeleteDepositFee={this.handleDeleteDepositFee}
        accountEncodedKey={this.productEncodedKey}
        depositSavingFeeId={this.state.depositSavingFeeId}
        deleteDepositFeeRequestData={deleteDepositFeeRequestData}
        loadInitialUserData={this.loadInitialUserData}
      />
    );
  };

  renderPage = () => {
    let getDepositFeeRequest = this.props.getDepositFeeReducer;
    let allDepositFeeData = getDepositFeeRequest.request_data?.response?.data;
    return (
      <>
        <div>
          <div className="heading-with-cta">
            <div className="table-helper mb-10">
              <input
                type="checkbox"
                name=""
                onChange={(e) =>
                  this.setShowDetails(e, allDepositFeeData.result)
                }
                checked={this.state.FullDetails}
                id="showFullDetails"
              />
              <label htmlFor="showFullDetails">Show full details</label>
            </div>

            <div className="pagination-wrap">
              <label htmlFor="toshow">Show</label>
              <select
                id="toshow"
                onChange={(e) => this.setPagesize(e, allDepositFeeData.result)}
                value={this.state.PageSize}
                className="countdropdown form-control form-control-sm"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="200">200</option>
              </select>
              <TablePagination
                totalPages={allDepositFeeData?.totalPages ?? 0}
                currPage={allDepositFeeData?.currentPage ?? 0}
                currRecordsCount={allDepositFeeData?.result?.length ?? 0}
                totalRows={allDepositFeeData?.totalRows ?? 0}
                tempData={allDepositFeeData?.result ?? 0}
                pagesCountToshow={4}
                refreshFunc={this.loadNextPage}
              />
            </div>
          </div>

          <TableComponent classnames="striped bordered hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type </th>
                <th>Amount</th>
                <th>Fee Payment</th>
                <th>Fee Income</th>
                <th>Fee Apply Date</th>
                <th></th>
              </tr>
            </thead>
            {this.fetchForEmptyState()}
            {this.fetchErrorState()}
            {this.fetchForDataState()}
          </TableComponent>
          {this.renderDepositAddFeeModal()}
          {this.renderDepositEditFeeModal()}
          {this.renderDepositDeleteFeeModal()}
          {this.fetchForBusyState()}
          <div className="footer-with-cta toleft">
            <Button
              onClick={() => {
                this.handleShowDepositFeeModal();
              }}
            >
              New Deposit Fee
            </Button>
          </div>
        </div>
      </>
    );
  };

  handleShowEditDepositFeeModal = (depositSavingFee) => {
    this.setState({ showDepositEditFeeModal: true, depositSavingFee });
  };

  handleHideDepositEditFeeModal = () => {
    this.setState({ showDepositEditFeeModal: false });
  };

  handleDeleteDepositFeeModal = (depositSavingFeeId) => {
    this.setState({ showDepositDeleteFeeModal: true, depositSavingFeeId });
  };

  handleHideDepositDeleteFeeModal = () => {
    this.setState({ showDepositDeleteFeeModal: false });
  };

  handleShowDepositFeeModal = () => {
    this.setState({ showDepositFeeModal: true });
  };

  handleHideDepositFeeModal = () => {
    this.setState({ showDepositFeeModal: false });
  };

  render() {
    return (
      <Fragment>
        <div className="content-wrapper">
          <div className="module-content">
            <div className="content-container">{this.renderPage()}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    getSingleDepositProductsReducer:
      state.productReducers.getSingleDepositProductsReducer,
    createDepositFeeReducer: state.productReducers.createDepositFeeReducer,
    updateDepositProductFeeReducer:
      state.productReducers.updateDepositProductFeeReducer,
    deleteDepositFeeReducer: state.productReducers.deleteDepositFeeReducer,
    getDepositFeeReducer: state.productReducers.getDepositFeeReducer,
    getAllGLAccountsReducer: state.accountingReducers.getAllGLAccountsReducer,
  };
}

export default connect(mapStateToProps)(ViewDepositCharges);
