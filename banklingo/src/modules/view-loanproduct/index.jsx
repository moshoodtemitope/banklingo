import * as React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import InnerPageContainer from "../../shared/templates/authed-pagecontainer";
import TableComponent from "../../shared/elements/table";
import "./styles.scss";
import { numberWithCommas, getDateFromISO } from "../../shared/utils";
import { productActions } from "../../redux/actions/products/products.action";
import { productsConstants } from "../../redux/actiontypes/products/products.constants";

class ViewLoanProduct extends React.Component {
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
    let getSingleLoanProductsRequest = this.props.getSingleLoanProductsReducer;

    if (
      getSingleLoanProductsRequest.request_status ===
      productsConstants.GET_A_LOAN_PRODUCT_SUCCESS
    ) {
      let getSingleLoanProductData =
        getSingleLoanProductsRequest.request_data.response.data;

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
                                <td>{getSingleLoanProductData.description}</td>
                              </tr>
                              <tr>
                                <td>Currency</td>
                                <td>{getSingleLoanProductData.currencyCode}</td>
                              </tr>
                              <tr>
                                <td>Product Name</td>
                                <td>{getSingleLoanProductData.productName}</td>
                              </tr>
                              <tr>
                                <td>Product Key</td>
                                <td>{getSingleLoanProductData.key}</td>
                              </tr>
                              <tr>
                                <td>State</td>
                                <td>
                                  {getSingleLoanProductData.isActive === true
                                    ? "Active"
                                    : "Inactive"}
                                </td>
                              </tr>
                              <tr>
                                <td>Product Type</td>
                                <td>
                                  {
                                    getSingleLoanProductData.loanProductTypeDescription
                                  }
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
                          <h6>Repayment Scheduling</h6>
                          <TableComponent classnames="striped bordered hover">
                            <tbody>
                              <tr>
                                <td>Repayment Are Made Every</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .repaymentReschedulingModel.repaymentEvery
                                  }{" "}
                                  Days
                                </td>
                              </tr>
                              <tr>
                                <td>Repayment Period</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .repaymentReschedulingModel
                                      .repaymentPeriod
                                  }{" "}
                                  Days
                                </td>
                              </tr>
                              <tr>
                                <td>Default first Due Date Offset</td>
                                <td>
                                  {getSingleLoanProductData
                                    .repaymentReschedulingModel
                                    .firstDueDateOffsetConstraintDefault ===
                                  null
                                    ? "Nil"
                                    : `${getSingleLoanProductData.repaymentReschedulingModel.firstDueDateOffsetConstraintDefault} Days`}
                                </td>
                              </tr>
                              <tr>
                                <td>Maximum first Due Date Offset</td>
                                <td>
                                  {getSingleLoanProductData
                                    .repaymentReschedulingModel
                                    .firstDueDateOffsetConstraintMax === null
                                    ? "Nil"
                                    : `${getSingleLoanProductData.repaymentReschedulingModel.firstDueDateOffsetConstraintMax}Days`}
                                </td>
                              </tr>
                              <tr>
                                <td>Minimum first Due Date Offset</td>
                                <td>
                                  {getSingleLoanProductData
                                    .repaymentReschedulingModel
                                    .firstDueDateOffsetConstraintMin === null
                                    ? "Nil"
                                    : `${getSingleLoanProductData.repaymentReschedulingModel.firstDueDateOffsetConstraintMin}Days`}
                                </td>
                              </tr>
                              <tr>
                                <td>Default Installments</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .repaymentReschedulingModel
                                      .installmentsDefault
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Minimum Installments</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .repaymentReschedulingModel
                                      .installmentsMin
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Maximum Installments</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .repaymentReschedulingModel
                                      .installmentsMax
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Collect Principal Every</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .repaymentReschedulingModel
                                      .collectPrincipalEveryRepayments
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
          <div className="row">
            <div className="col-sm-12">
              <div className="middle-content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="main-details mt-20">
                      <div style={{ width: "600px" }}>
                        <div className="each-overview">
                          <h6>Arrears Settings</h6>
                          <TableComponent classnames="striped bordered hover">
                            <tbody>
                              <tr>
                                <td>Default Arrears Tolerance Period (Days)</td>
                                <td>
                                  {getSingleLoanProductData.arrearsSetting
                                    .arearsTolerancePeriodInDaysDefault === null
                                    ? "Not set"
                                    : getSingleLoanProductData.arrearsSetting
                                        .arearsTolerancePeriodInDaysDefault}
                                </td>
                              </tr>
                              <tr>
                                <td>Minimun Arrears Tolerance Period (Days)</td>
                                <td>
                                  {getSingleLoanProductData.arrearsSetting
                                    .arearsTolerancePeriodInDaysMin === null
                                    ? "Not Set"
                                    : getSingleLoanProductData.arrearsSetting
                                        .arearsTolerancePeriodInDaysMin}
                                </td>
                              </tr>
                              <tr>
                                <td>Maximum Arrears Tolerance Period (Days)</td>
                                <td>
                                  {getSingleLoanProductData.arrearsSetting
                                    .arearsTolerancePeriodInDaysMax === null
                                    ? "Not set"
                                    : getSingleLoanProductData.arrearsSetting
                                        .arearsTolerancePeriodInDaysMax}
                                </td>
                              </tr>
                              <tr>
                                <td>Arrear Days Calculated</td>
                                <td>
                                  {
                                    getSingleLoanProductData.arrearsSetting
                                      .arrearsDaysCalculatedFrom
                                  }
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
                          <h6>Loan Amount Settings</h6>
                          <TableComponent classnames="striped bordered hover">
                            <tbody>
                              <tr>
                                <td>Default Loan Amount</td>
                                <td>
                                  {numberWithCommas(
                                    getSingleLoanProductData.loanAmountSetting
                                      .loanAmountDefault
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Maximum Loan Amount</td>
                                <td>
                                  {numberWithCommas(
                                    getSingleLoanProductData.loanAmountSetting
                                      .loanAmountMaximum
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Minimum Loan Amount</td>
                                <td>
                                  {numberWithCommas(
                                    getSingleLoanProductData.loanAmountSetting
                                      .loanAmountMinimun
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
                          <h6>Interest Rate</h6>
                          <TableComponent classnames="striped bordered hover">
                            <tbody>
                              <tr>
                                <td>Default Interest Rate</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .loanProductInterestSetting
                                      .interestRateDefault
                                  }
                                  %
                                </td>
                              </tr>
                              <tr>
                                <td>Minimun Interest Rate</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .loanProductInterestSetting
                                      .interestRateMin
                                  }
                                  %
                                </td>
                              </tr>
                              <tr>
                                <td>Maximum Interest Rate</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .loanProductInterestSetting
                                      .interestRateMax
                                  }
                                  %
                                </td>
                              </tr>
                              <tr>
                                <td>Interest Rate Description</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .loanProductInterestSetting
                                      .interestRateTermsDescription
                                  }
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
                          <h6>Product Links</h6>
                          <TableComponent classnames="striped bordered hover">
                            <tbody>
                              <tr>
                                <td>Link Deposit Product</td>
                                <td>
                                  {getSingleLoanProductData.loanProductLinkModel
                                    .depositProductEncodedKey === null
                                    ? "Nil"
                                    : getSingleLoanProductData
                                        .loanProductLinkModel
                                        .depositProductEncodedKey}
                                </td>
                              </tr>
                              <tr>
                                <td>Auto Set Settlement Account</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .loanProductLinkModel
                                      .autoSetSettlementAccountOnCreation
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Auto Create Settlement Account</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .loanProductLinkModel
                                      .autoCreateSettlementAccount
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Settlement Option</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .loanProductLinkModel
                                      .settlementOptionsDescription
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
          <div className="row">
            <div className="col-sm-12">
              <div className="middle-content">
                <div className="row">
                  <div className="col-md-6">
                    <div className="main-details mt-20">
                      <div style={{ width: "600px" }}>
                        <div className="each-overview">
                          <h6>Loan Product Rules</h6>
                          <TableComponent classnames="striped bordered hover">
                            <tbody>
                              <tr>
                                <td>Methodology</td>
                                <td>
                                  {
                                    getSingleLoanProductData.methodologyDescription
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Fees Income Account Id</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .loanProductAccountingRuleModel
                                      .feeIncomeAccountId
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Fees Receivable Account Id</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .loanProductAccountingRuleModel
                                      .feeReceivableAccountId
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Interest Income Account Id</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .loanProductAccountingRuleModel
                                      .interestIncomeAccountId
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Interest Receivable Account Id</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .loanProductAccountingRuleModel
                                      .interestReceivableAccountId
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Penalty Income Account Id</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .loanProductAccountingRuleModel
                                      .penaltyIncomeAccountId
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Penalty Receivable Account Id</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .loanProductAccountingRuleModel
                                      .penaltyReceivableAccountId
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Portfolio Control Account Id</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .loanProductAccountingRuleModel
                                      .portfolioControlAccountId
                                  }
                                </td>
                              </tr>
                              <tr>
                                <td>Transaction Source Account Id</td>
                                <td>
                                  {
                                    getSingleLoanProductData
                                      .loanProductAccountingRuleModel
                                      .transactionSourceAccountId
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
            <div className="content-container">{this.renderPage()}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    getSingleLoanProductsReducer:
      state.productReducers.getSingleLoanProductsReducer,
  };
}

export default connect(mapStateToProps)(ViewLoanProduct);
