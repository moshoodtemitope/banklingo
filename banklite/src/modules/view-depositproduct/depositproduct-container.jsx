import * as React from "react";
import { Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";
import ViewDepositProduct from ".";
import ViewDepositCharges from "./depositCharges-container";
class DepositProductContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { generatedRoutes } = this.state;
    return (
      <Fragment>
        <div className="content-wrapper">
          {this.props.children}
          <Route
            exact
            path="/depositproduct/:productid"
            component={ViewDepositProduct}
          />
          <Route
            exact
            path="/depositproduct/:productid/charges"
            component={ViewDepositCharges}
          />
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(DepositProductContainer);
