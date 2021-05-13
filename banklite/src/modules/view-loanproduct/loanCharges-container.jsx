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

class ViewLoanCharges extends React.Component {
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
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="middle-content">
            <div className="row">
              <div className="col-sm-12">
                <div className="main-details mt-20">
                  <div>
                    <div className="each-overview">
                      <h6>Charges</h6>
                      <TableComponent classnames="striped bordered hover">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Type (manual,Monthly,arbitrary) </th>
                            <th>Amount</th>
                            <th>Fee Payment(Flat|Percentage)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </TableComponent>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-sm-4">
                <div className="leftside-items"></div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
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

export default connect(mapStateToProps)(ViewLoanCharges);
