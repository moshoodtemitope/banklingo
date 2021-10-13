import * as React from "react";
// import {Router} from "react-router";

import { Fragment } from "react";

import { NavLink, Route } from "react-router-dom";
import { connect } from "react-redux";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";

import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import TableComponent from "../../shared/elements/table";
import "./styles.scss";
import InnerPageContainer from "../../shared/templates/authed-pagecontainer";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { Formik } from "formik";
import * as Yup from "yup";

import { productActions } from "../../redux/actions/products/products.action";
import { productsConstants } from "../../redux/actiontypes/products/products.constants";

import LoanProductContainer from "./loanproduct-container";

class LoanProductInfoContainer extends React.Component {
  constructor(props) {
    super(props);
    this.productEncodedKey = this.props.match.params.productid;
    this.state = {
      user: "",
      generatedRoutes: {
        product: `/loanproduct/${this.productEncodedKey}`,
        charges: `/loanproduct/${this.productEncodedKey}/charges`,
      },
    };
  }

  componentDidMount() {
    this.loadInitialCustomerData();
  }

  loadInitialCustomerData = () => {
    this.getProductInfo(this.productEncodedKey);
  };

  getProductInfo = (productEncodedKey) => {
    const { dispatch } = this.props;

    dispatch(productActions.getSingleLoanProduct(productEncodedKey, true));
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.productid !== this.props.match.params.productid
    ) {
      this.productEncodedKey = nextProps.match.params.productid;

      this.setState({
        generatedRoutes: {
          product: `/loanproduct/${this.productEncodedKey}`,
          charges: `/loanproduct/${this.productEncodedKey}/charges`,
        },
      });
      this.loadInitialCustomerData();
    }
  }

  renderSubMenu = () => {
    let { generatedRoutes } = this.state;
    return (
      <div className="module-submenu">
        <div className="content-container">
          {this.userEncodedKey && (
            <ul className="nav">
              <li>
                <NavLink exact to={generatedRoutes.product}>
                  Overview
                </NavLink>
              </li>
            </ul>
          )}
          {!this.userEncodedKey && (
            <ul className="nav">
              <li>
                <NavLink exact to={generatedRoutes.product}>
                  Overview
                </NavLink>
              </li>
              <li>
                <NavLink exact to={generatedRoutes.charges}>
                  Charges
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  };

  renderProductName = (productDetails) => {
    return (
      <div className="content-container">
        <div className="row">
          <div className="col-sm-12">
            <div className="">
              <h2>
                {productDetails.productName !== null &&
                productDetails.productName !== ""
                  ? productDetails.productName
                  : ""}
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderProductDetailsHeading = () => {
    let getSingleLoanProductsRequest = this.props.getSingleLoanProductsReducer;

    if (
      getSingleLoanProductsRequest.request_status ===
      productsConstants.GET_A_LOAN_PRODUCT_PENDING
    ) {
      return <div className="loading-text">Please wait... </div>;
    }

    if (
      getSingleLoanProductsRequest.request_status ===
      productsConstants.GET_A_LOAN_PRODUCT_SUCCESS
    ) {
      let productDetails =
        getSingleLoanProductsRequest.request_data.response.data;

      return (
        <div>
          <div className="module-heading">
            <div className="module-title">
              {this.renderProductName(productDetails)}
            </div>
            {this.renderSubMenu()}
          </div>
        </div>
      );
    }

    if (
      getSingleLoanProductsRequest.request_status ===
      productsConstants.GET_A_LOAN_PRODUCT_FAILURE
    ) {
      return (
        <div className="loading-text errormsg">
          {" "}
          {getSingleLoanProductsRequest.request_data.error}
        </div>
      );
    }
  };

  render() {
    return (
      <Fragment>
        <InnerPageContainer {...this.props}>
          <div className="content-wrapper">
            {this.renderProductDetailsHeading()}
            {this.props.children}
            <Route
              exact
              to="/loanproduct/:productid"
              component={LoanProductContainer}
            />
            {/* <Route
              exact
              to="/loanproduct/:productid/charges"
              component={LoanProductContainer}
            /> */}
          </div>
        </InnerPageContainer>
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

export default connect(mapStateToProps)(LoanProductInfoContainer);
