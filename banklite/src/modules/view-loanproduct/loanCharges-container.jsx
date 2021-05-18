import * as React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import InnerPageContainer from "../../shared/templates/authed-pagecontainer";
import TableComponent from "../../shared/elements/table";
import "./styles.scss";
import { numberWithCommas, getDateFromISO } from "../../shared/utils";
import TablePagination from "../../shared/elements/table/pagination";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import { productActions } from "../../redux/actions/products/products.action";
import { productsConstants } from "../../redux/actiontypes/products/products.constants";
import { SetLoanFeeModal } from "./components/set-loan-fee-component";
import { SetEditLoanFeeModal } from "./components/set-edit-loan-fee-component";
import { SetDeleteLoanFeeModal } from "./components/set-delete-loan-fee-component";

class ViewLoanCharges extends React.Component {
  constructor(props) {
    super(props);
    this.productEncodedKey = this.props.match.params.productid;
    this.state = {
      user: JSON.parse(localStorage.getItem("lingoAuth")),
      PageSize: 25,
      CurrentPage: 1,
      FullDetails: false,
      showLoanFeeModal: false,
      showLoanDeleteFeeModal: false,
      showLoanEditFeeModal: false,
    };
  }
  componentDidMount() {
    this.loadInitialUserData();
  }

  loadInitialUserData = () => {
    let { PageSize, CurrentPage } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
    const { dispatch } = this.props;
    dispatch(productActions.getLoanFee(params, this.productEncodedKey));
  };

  setPagesize = (PageSize, tempData) => {
    const { dispatch } = this.props;

    let sizeOfPage = PageSize.target.value,
      { FullDetails, CurrentPage } = this.state;

    this.setState({ PageSize: sizeOfPage });

    let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;

    if (tempData) {
      dispatch(
        productActions.getLoanFee(params, this.productEncodedKey, tempData)
      );
    } else {
      dispatch(productActions.getLoanFee(params, this.productEncodedKey));
    }
  };

  loadNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;
    let { PageSize } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${nextPage}`;
    if (tempData) {
      dispatch(
        productActions.getLoanFee(params, this.productEncodedKey, tempData)
      );
    } else {
      dispatch(productActions.getLoanFee(params, this.productEncodedKey));
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
        productActions.getLoanFee(params, this.productEncodedKey, tempData)
      );
    } else {
      dispatch(productActions.getLoanFee(params, this.productEncodedKey));
    }
  };

  handleNewLoanFee = async (
    depositFeePayload,
    newStateUpdate,
    productencodedKey
  ) => {
    const { dispatch } = this.props;
    await dispatch(
      productActions.createLoanFee(
        depositFeePayload,
        newStateUpdate,
        productencodedKey
      )
    );
  };

  handleEditLoanFee = async (
    depositFeePayload,
    newStateUpdate,
    productencodedKey
  ) => {
    const { dispatch } = this.props;
    await dispatch(
      productActions.updateLoanFee(
        depositFeePayload,
        newStateUpdate,
        productencodedKey
      )
    );
  };

  handleDeleteLoanFee = async (
    depositFeePayload,
    newStateUpdate,
    productencodedKey
  ) => {
    const { dispatch } = this.props;
    await dispatch(
      productActions.deleteLoanFee(
        depositFeePayload,
        newStateUpdate,
        productencodedKey
      )
    );
  };

  fetchForEmptyState = () => {
    //This function returns the biew for empty list
    let getSingleLoanFeeRequest = this.props.getSingleLoanFeeReducer;
    let saveRequestData =
      getSingleLoanFeeRequest.request_data !== undefined
        ? getSingleLoanFeeRequest.request_data.tempData
        : null;
    switch (getSingleLoanFeeRequest.request_status) {
      case productsConstants.GET_A_LOAN_FEE_PENDING:
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
    let getSingleLoanFeeRequest = this.props.getSingleLoanFeeReducer;
    switch (getSingleLoanFeeRequest.request_status) {
      case productsConstants.GET_A_LOAN_FEE_FAILURE:
        return (
          <div className="loading-content errormsg">
            <div>{getSingleLoanFeeRequest.request_data.error}</div>
          </div>
        );
      default:
        return null;
    }
  }

  fetchForBusyState() {
    let getSingleLoanFeeRequest = this.props.getSingleLoanFeeReducer;
    switch (getSingleLoanFeeRequest.request_status) {
      case productsConstants.GET_A_LOAN_FEE_PENDING:
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
    let getSingleLoanFeeRequest = this.props.getSingleLoanFeeReducer;
    switch (getSingleLoanFeeRequest.request_status) {
      case productsConstants.GET_A_LOAN_FEE_SUCCESS:
        let allLoanFeeData =
          getSingleLoanFeeRequest.request_data !== undefined
            ? getSingleLoanFeeRequest?.request_data?.response?.data
            : null;
        return (
          <tbody>
            {allLoanFeeData.result.map((eachFee, index) => {
              return (
                <tr key={index}>
                  <td>{eachFee?.name}</td>
                  <td>{eachFee?.loanFeeTypeDescription}</td>
                  <td>{numberWithCommas(eachFee?.amount)}</td>
                  <td>{eachFee?.feePaymentDescription}</td>
                  <td>{eachFee?.feeIncome}</td>
                  <td>
                    <DropdownButton
                      size="sm"
                      title="Actions"
                      key="LoanFee"
                      className="customone"
                    >
                      <Dropdown.Item
                        eventKey="1"
                        onClick={() => this.handleShowEditLoanFeeModal(eachFee)}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        eventKey="2"
                        onClick={() =>
                          this.handleDeleteLoanFeeModal(eachFee?.id)
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

  renderLoanAddFeeModal = () => {
    let createLoanFeeRequestData = this.props.createLoanFeeReducer;
    return (
      <SetLoanFeeModal
        {...this.props}
        showModal={this.state.showLoanFeeModal}
        handleHideModal={this.handleHideLoanFeeModal}
        handleNewLoanFee={this.handleNewLoanFee}
        accountEncodedKey={this.productEncodedKey}
        createLoanFeeRequest={createLoanFeeRequestData}
        loadInitialUserData={this.loadInitialUserData}
      />
    );
  };

  renderLoanEditFeeModal = () => {
    let updateLoanFeeRequestData = this.props.updateLoanFeeReducer;
    return (
      <SetEditLoanFeeModal
        {...this.props}
        showModal={this.state.showLoanEditFeeModal}
        handleHideModal={this.handleHideLoanEditFeeModal}
        handleEditLoanFee={this.handleEditLoanFee}
        accountEncodedKey={this.productEncodedKey}
        loanSavingFee={this.state.loanSavingFee}
        updateLoanFeeRequestData={updateLoanFeeRequestData}
        loadInltialUserData={this.loadInitialUserData}
      />
    );
  };

  renderLoanDeleteFeeModal = () => {
    let deleteLoanFeeRequestData = this.props.deleteLoanFeeReducer;

    return (
      <SetDeleteLoanFeeModal
        {...this.props}
        showModal={this.state.showLoanDeleteFeeModal}
        handleHideModal={this.handleHideLoanDeleteFeeModal}
        handleDeleteLoanFee={this.handleDeleteLoanFee}
        accountEncodedKey={this.productEncodedKey}
        loanSavingFeeId={this.state.loanSavingFeeId}
        deleteLoanFeeRequestData={deleteLoanFeeRequestData}
        loadInitialUserData={this.loadInitialUserData}
      />
    );
  };

  renderPage = () => {
    let getSingleLoanFeeRequest = this.props.createLoanFeeReducer;
    let allLoanFeeData = getSingleLoanFeeRequest.request_data?.response?.data;
    return (
      <>
        <div>
          <div className="heading-with-cta">
            <div className="table-helper mb-10">
              <input
                type="checkbox"
                name=""
                onChange={(e) => this.setShowDetails(e, allLoanFeeData?.result)}
                checked={this.state.FullDetails}
                id="showFullDetails"
              />
              <label htmlFor="showFullDetails">Show full details</label>
            </div>

            <div className="pagination-wrap">
              <label htmlFor="toshow">Show</label>
              <select
                id="toshow"
                onChange={(e) => this.setPagesize(e, allLoanFeeData?.result)}
                value={this.state.PageSize}
                className="countdropdown form-control form-control-sm"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="200">200</option>
              </select>
              <TablePagination
                totalPages={allLoanFeeData?.totalPages ?? 0}
                currPage={allLoanFeeData?.currentPage ?? 0}
                currRecordsCount={allLoanFeeData?.result?.length ?? 0}
                totalRows={allLoanFeeData?.totalRows ?? 0}
                tempData={allLoanFeeData?.result ?? 0}
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
                <th></th>
              </tr>
            </thead>
            {this.fetchForEmptyState()}
            {this.fetchErrorState()}
            {this.fetchForDataState()}
          </TableComponent>
          {this.renderLoanAddFeeModal()}
          {this.renderLoanEditFeeModal()}
          {this.renderLoanDeleteFeeModal()}
          {this.fetchForBusyState()}
          <div className="footer-with-cta toleft">
            <Button
              onClick={() => {
                this.handleShowLoanFeeModal();
              }}
            >
              New Loan Fee
            </Button>
          </div>
        </div>
      </>
    );
  };

  handleShowEditLoanFeeModal = (loanSavingFee) => {
    this.setState({ showLoanEditFeeModal: true, loanSavingFee });
  };

  handleHideLoanEditFeeModal = () => {
    this.setState({ showLoanEditFeeModal: false });
  };

  handleDeleteLoanFeeModal = (loanSavingFeeId) => {
    this.setState({ showLoanDeleteFeeModal: true, loanSavingFeeId });
  };

  handleHideLoanDeleteFeeModal = () => {
    this.setState({ showLoanDeleteFeeModal: false });
  };

  handleShowLoanFeeModal = () => {
    this.setState({ showLoanFeeModal: true });
  };

  handleHideLoanFeeModal = () => {
    this.setState({ showLoanFeeModal: false });
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
    getSingleLoanFeeReducer: state.productReducers.getSingleLoanFeeReducer,
    createLoanFeeReducer: state.productReducers.createLoanFeeReducer,
    updateLoanFeeReducer: state.productReducers.updateLoanFeeReducer,
    deleteLoanFeeReducer: state.productReducers.deleteLoanFeeReducer,
    getAllGLAccountsReducer: state.accountingReducers.getAllGLAccountsReducer,
  };
}

export default connect(mapStateToProps)(ViewLoanCharges);
