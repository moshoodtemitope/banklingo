import * as React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import InnerPageContainer from "../../shared/templates/authed-pagecontainer";
import TableComponent from "../../shared/elements/table";
import "./styles.scss";
import { numberWithCommas, getDateFromISO } from "../../shared/utils";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { productActions } from "../../redux/actions/products/products.action";
import { productsConstants } from "../../redux/actiontypes/products/products.constants";
import "../administration/administration.scss";
class ViewDepositProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("lingoAuth")),
      PageSize: 100,
      CurrentPage: 1,
    };
  }
  loadInitialUserData = () => {
    let { PageSize, CurrentPage } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
  };
  renderPage = () => {
    let getSingleDepositProductRequest = this.props
      .getSingleDepositProductsReducer;
    if (
      getSingleDepositProductRequest.request_status ===
      productsConstants.GET_A_DEPOSIT_PRODUCT_SUCCESS
    ) {
      let getSingleDepositProductData =
        getSingleDepositProductRequest.request_data.response.data;
      return (
        <>
          <div className="row">
            <div className="col-sm-12">
              <div className="middle-content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="main-details mt-20">
                      <div style={{ width: "600px" }}>
                        <div className="each-overview">
                          <h6>General Information</h6>
                          <TableComponent classnames="striped bordered hover">
                            <tbody>
                              <tr>
                                <td>Description</td>
                                <td>
                                  {getSingleDepositProductData.description}
                                </td>
                              </tr>
                              <tr>
                                <td>Currency</td>
                                <td>
                                  {getSingleDepositProductData.currencyCode}
                                </td>
                              </tr>
                              <tr>
                                <td>Product Name</td>
                                <td>
                                  {getSingleDepositProductData.productName}
                                </td>
                              </tr>
                              <tr>
                                <td>Product Key</td>
                                <td>{getSingleDepositProductData.key}</td>
                              </tr>
                              <tr>
                                <td>State</td>
                                <td>
                                  {getSingleDepositProductData.isActive === true
                                    ? "Active"
                                    : "Inactive"}
                                </td>
                              </tr>
                              <tr>
                                <td>Product Type</td>
                                <td>
                                  {
                                    getSingleDepositProductData.depositAccountType
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Internal Control</td>
                                <td>
                                  {getSingleDepositProductData.dormancyAfterXDays ===
                                  0
                                    ? "Not Dormant"
                                    : `Dormant for ${getSingleDepositProductData.dormancyAfterXDays} days`}
                                </td>
                              </tr>
                            </tbody>
                          </TableComponent>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="main-details mt-20">
                      <div style={{ width: "600px" }}>
                        <div className="each-overview">
                          <h6>Opening Balance</h6>
                          <TableComponent classnames="striped bordered hover">
                            <tbody>
                              <tr>
                                <td>Default Opening Balance</td>
                                <td>
                                  {numberWithCommas(
                                    getSingleDepositProductData
                                      .depositFixedSettingModel
                                      .defaultOpeningBalance
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Maximum Opening Balance</td>
                                <td>
                                  {numberWithCommas(
                                    getSingleDepositProductData
                                      .depositFixedSettingModel
                                      .maxmimumOpeningBalance
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Minimum Opening Balance</td>
                                <td>
                                  {numberWithCommas(
                                    getSingleDepositProductData
                                      .depositFixedSettingModel
                                      .minimumOpeningBalance
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </TableComponent>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="middle-content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="leftside-items">
                      <div className="main-details mt-20">
                        <div style={{ width: "600px" }}>
                          <div className="each-overview">
                            <h6>Interest Rate</h6>
                            <TableComponent classnames="striped bordered hover">
                              <tbody>
                                <tr>
                                  <td>Per Rate Charge</td>
                                  <td>
                                    {
                                      getSingleDepositProductData
                                        .depositProductInterestSettingModel
                                        .interestRateTermsDescription
                                    }
                                  </td>
                                </tr>
                                <tr>
                                  <td>Interest Balance</td>
                                  <td>
                                    {
                                      getSingleDepositProductData
                                        .depositProductInterestSettingModel
                                        .interestBalanceCalculation
                                    }
                                    %
                                  </td>
                                </tr>
                                <tr>
                                  <td>Interest Balance Desc</td>
                                  <td>
                                    {
                                      getSingleDepositProductData
                                        .depositProductInterestSettingModel
                                        .interestBalanceCalculationDescription
                                    }
                                  </td>
                                </tr>
                                <tr>
                                  <td>Default Rate</td>
                                  <td>
                                    {
                                      getSingleDepositProductData
                                        .depositProductInterestSettingModel
                                        .interestBalanceCalculation
                                    }
                                    %
                                  </td>
                                </tr>
                                <tr>
                                  <td>Interest Rate Minimum</td>
                                  <td>
                                    {
                                      getSingleDepositProductData
                                        .depositProductInterestSettingModel
                                        .interestRateMin
                                    }{" "}
                                    %
                                  </td>
                                </tr>
                                <tr>
                                  <td>Interest Rate Maximum</td>
                                  <td>
                                    {
                                      getSingleDepositProductData
                                        .depositProductInterestSettingModel
                                        .interestRateMax
                                    }{" "}
                                    %
                                  </td>
                                </tr>
                                <tr>
                                  <td>When is Interest Paid</td>
                                  <td>
                                    {
                                      getSingleDepositProductData
                                        .depositProductInterestSettingModel
                                        .whenInterestIsPaidDescription
                                    }
                                  </td>
                                </tr>
                              </tbody>
                            </TableComponent>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="main-details mt-20">
                      <div style={{ width: "600px" }}>
                        <div className="each-overview">
                          <h6>Deposit And Withdrawal</h6>
                          <TableComponent classnames="striped bordered hover">
                            <tbody>
                              <tr>
                                <td>Default Opening Balance</td>
                                <td>
                                  {numberWithCommas(
                                    getSingleDepositProductData
                                      .depositSavingsSettingModel
                                      .maximumWithdrawalAmount
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Maximum Opening Balance</td>
                                <td>
                                  {numberWithCommas(
                                    getSingleDepositProductData
                                      .depositSavingsSettingModel
                                      .recommendedDepositAmount
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </TableComponent>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="middle-content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="main-details mt-20">
                      <div style={{ width: "600px" }}>
                        <div className="each-overview">
                          <h6>Accounting Rules</h6>
                          <TableComponent classnames="striped bordered hover">
                            <tbody>
                              <tr>
                                <td>Methodology</td>
                                <td>
                                  {
                                    getSingleDepositProductData.methodologyDescription
                                  }
                                </td>
                              </tr>
                            </tbody>
                          </TableComponent>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  render() {
    return (
      <Fragment>
        <div className="content-wrapper">
          <div className="module-content">
            <div className="content-container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="middle-content">
                    <div className="content-container">{this.renderPage()}</div>
                  </div>
                </div>
              </div>
            </div>
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
  };
}
export default connect(mapStateToProps)(ViewDepositProduct);
