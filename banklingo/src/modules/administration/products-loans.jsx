import * as React from "react";
// import {Router} from "react-router";

import { Fragment } from "react";
import { connect } from "react-redux";
import AdminNav from "./_menu";

import { NavLink } from "react-router-dom";
import InnerPageContainer from "../../shared/templates/authed-pagecontainer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import TableComponent from "../../shared/elements/table";
import TablePagination from "../../shared/elements/table/pagination";
// import  SidebarElement from '../../shared/elements/sidebar'
import { productActions } from "../../redux/actions/products/products.action";
import { productsConstants } from "../../redux/actiontypes/products/products.constants";

import "./administration.scss";
class ProductLoans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      PageSize: 25,
      FullDetails: false,
      CurrentPage: 1,
      isRefresh: false,
    };
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = () => {
    let { PageSize, CurrentPage } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
    this.getLoanProducts(params);
  };

  getLoanProducts = (paramters) => {
    const { dispatch } = this.props;

    dispatch(productActions.getLoanProducts(paramters));
  };

  setPagesize = (PageSize, tempData) => {
    const { dispatch } = this.props;

    let sizeOfPage = PageSize.target.value,
      { FullDetails, CurrentPage } = this.state;

    this.setState({ PageSize: sizeOfPage, isRefresh: true });

    let params = `FullDetails=${FullDetails}&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}`;

    if (tempData) {
      dispatch(productActions.getLoanProducts(params, tempData));
    } else {
      dispatch(productActions.getLoanProducts(params));
    }

    // dispatch(productActions.getLoanProducts(params));
  };

  loadNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;
    let { PageSize } = this.state;

    // this.setState({PageSize: sizeOfPage});

    let params = `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
    // this.getTransactionChannels(params);

    if (tempData) {
      dispatch(productActions.getLoanProducts(params, tempData));
    } else {
      dispatch(productActions.getLoanProducts(params));
    }
  };

  setShowDetails = (FullDetails, tempData) => {
    // console.log('----here', PageSize.target.value);
    const { dispatch } = this.props;
    let showDetails = FullDetails.target.checked,
      { CurrentPage, PageSize } = this.state;

    this.setState({ FullDetails: showDetails });

    let params = `FullDetails=${showDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
    // this.getLoanProducts(params);

    if (tempData) {
      dispatch(productActions.getLoanProducts(params, tempData));
    } else {
      dispatch(productActions.getLoanProducts(params));
    }
  };

  renderLoanProducts = () => {
    let getAllLoanProductsRequestData = this.props.getLoanProductsRequest,
      { isRefresh } = this.state;

    let saveRequestData =
      getAllLoanProductsRequestData.request_data !== undefined
        ? getAllLoanProductsRequestData.request_data.tempData
        : null;

    if (
      getAllLoanProductsRequestData.request_status ===
      productsConstants.GET_LOAN_PRODUCTS_PENDING
    ) {
      if (
        saveRequestData === undefined ||
        (saveRequestData !== undefined &&
          saveRequestData.result !== undefined &&
          saveRequestData.result.length < 1)
      ) {
        return (
          <div className="loading-content">
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
            </div>

            <TableComponent classnames="striped bordered hover">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <td>Currency</td>
                  <th>Product Code</th>
                  <th>Product Type</th>
                  <th>Last Modified</th>
                  <th>Active</th>
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
            <div className="loading-text">Please wait... </div>
            {/* <div className="footer-with-cta toleft">
                                <NavLink to={'/administration/products/newloan-product'} className="btn btn-primary">New Loan Product</NavLink>

                            </div> */}
          </div>
        );
      } else {
        saveRequestData =
          saveRequestData.result !== undefined
            ? saveRequestData.result
            : saveRequestData;
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
            <div className="loading-text">Please wait... </div>
            <TableComponent classnames="striped bordered hover">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <td>Currency</td>
                  <th>Product Code</th>
                  <th>Product Type</th>
                  <th>Modified</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {saveRequestData.map((eachLoanProduct, index) => {
                  return (
                    <Fragment key={index}>
                      <tr>
                        <td>
                          <NavLink
                            className="dropdown-item"
                            to={`/administration/products/loans/edit/${eachLoanProduct.productEncodedKey}`}
                          >
                            {eachLoanProduct.productName}
                          </NavLink>
                        </td>
                        <td>{eachLoanProduct.currencyCode}</td>
                        <td>{eachLoanProduct.productCode}</td>
                        <td>{eachLoanProduct.loanProductTypeDescription}</td>
                        <td>{eachLoanProduct.lastModified}</td>
                        <td>
                          {eachLoanProduct.isActive.toString() === "true"
                            ? "Active"
                            : "Not Active"}
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </TableComponent>
            <div className="footer-with-cta toleft">
              <NavLink
                to={"/administration/products/newloan-product"}
                className="btn btn-primary"
              >
                New Loan Product
              </NavLink>
            </div>
          </div>
        );
      }
    }

    if (
      getAllLoanProductsRequestData.request_status ===
      productsConstants.GET_LOAN_PRODUCTS_SUCCESS
    ) {
      let allLoanProductsData =
        getAllLoanProductsRequestData.request_data.response.data;
      if (allLoanProductsData !== undefined) {
        if (allLoanProductsData.result.length >= 1) {
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
                  <Button
                    className="no-margins"
                    variant="primary"
                    type="submit"
                  >
                    Filter
                  </Button>
                </Form>

                <div className="pagination-wrap">
                  <label htmlFor="toshow">Show</label>
                  <select
                    id="toshow"
                    onChange={(e) => this.setPagesize(e, allLoanProductsData)}
                    value={this.state.PageSize}
                    className="countdropdown form-control form-control-sm"
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="200">200</option>
                  </select>
                  <TablePagination
                    totalPages={allLoanProductsData.totalPages}
                    currPage={allLoanProductsData.currentPage}
                    currRecordsCount={allLoanProductsData.result.length}
                    totalRows={allLoanProductsData.totalRows}
                    tempData={allLoanProductsData.result}
                    pagesCountToshow={4}
                    refreshFunc={this.loadNextPage}
                  />
                </div>
              </div>
              <div className="table-helper mb-10">
                <input
                  type="checkbox"
                  name=""
                  onChange={(e) => this.setShowDetails(e, allLoanProductsData)}
                  checked={this.state.FullDetails}
                  id="showFullDetails"
                />
                <label htmlFor="showFullDetails">Show full details</label>
              </div>

              <TableComponent classnames="striped bordered hover">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <td>Currency</td>
                    <th>Product Code</th>
                    <th>Product Type</th>
                    <th>Last Modified</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allLoanProductsData.result.map((eachLoanProduct, index) => {
                    return (
                      <Fragment key={index}>
                        <tr>
                          <td>
                            <NavLink
                              to={`/loanproduct/${eachLoanProduct.productEncodedKey}`}
                            >
                              {eachLoanProduct.productName}
                            </NavLink>
                          </td>
                          <td>{eachLoanProduct.currencyCode}</td>
                          <td>{eachLoanProduct.productCode}</td>
                          <td>{eachLoanProduct.loanProductTypeDescription}</td>
                          <td>{eachLoanProduct.lastModified}</td>
                          <td>
                            {eachLoanProduct.isActive.toString() === "true"
                              ? "Active"
                              : "Not Active"}
                          </td>
                          <td>
                            <DropdownButton
                              size="sm"
                              title="Actions"
                              key="editRole"
                              className="customone"
                            >
                              <NavLink
                                className="dropdown-item"
                                to={`/administration/products/loans/edit/${eachLoanProduct.productEncodedKey}`}
                              >
                                Edit
                              </NavLink>
                              {/* <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="1">Edit</Dropdown.Item> */}
                            </DropdownButton>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </TableComponent>
              <div className="footer-with-cta toleft">
                <NavLink
                  to={"/administration/products/newloan-product"}
                  className="btn btn-primary"
                >
                  New Loan Product
                </NavLink>
              </div>
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
                  <Button
                    className="no-margins"
                    variant="primary"
                    type="submit"
                  >
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
                    <th>Product Name</th>
                    <td>Currency</td>
                    <th>Product Code</th>
                    <th>Product Type</th>
                    <th>Modified</th>
                    <th>Active</th>
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
              <div className="footer-with-cta toleft">
                <NavLink
                  to={"/administration/products/newloan-product"}
                  className="btn btn-primary"
                >
                  New Loan Product
                </NavLink>
              </div>
            </div>
          );
        }
      } else {
        return null;
      }
    }

    if (
      getAllLoanProductsRequestData.request_status ===
      productsConstants.GET_LOAN_PRODUCTS_FAILURE
    ) {
      return (
        <div className="loading-content errormsg">
          <div>{getAllLoanProductsRequestData.request_data.error}</div>
        </div>
      );
    }
  };

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
                        <h2>Administration</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="module-submenu">
                <div className="content-container">
                  <AdminNav />
                  <div className="lowerlevel-menu">
                    <ul className="nav">
                      <li>
                        {/* <NavLink to={'/administration-generalorganization'}>Organization</NavLink> */}
                        <NavLink exact to={"/administration/products"}>
                          Loans
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to={"/administration/products/deposits"}>
                          Deposits
                        </NavLink>
                        {/* <NavLink to={'/administration/administration-generalcurrency'}>Currency</NavLink> */}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="module-content">
                <div className="content-container">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="middle-content">
                        {this.renderLoanProducts()}
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
    getAllLoanProductsRequest: state.productReducers.getAllLoanProductsReducer,
    getLoanProductsRequest: state.productReducers.getLoanProductsReducer,
  };
}

export default connect(mapStateToProps)(ProductLoans);
