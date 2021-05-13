import * as React from "react";
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

import { administrationActions } from "../../redux/actions/administration/administration.action";
import { administrationConstants } from "../../redux/actiontypes/administration/administration.constants";

import AccountContainer from "../viewuser/account-container";

class UserAccountContainer extends React.Component {
  constructor(props) {
    super(props);

    this.userEncodedKey =
      this.props.match.params.userid !== undefined
        ? this.props.match.params.userid
        : null;
    this.state = {
      user: "",
      PageSize: 5,
      CurrentPage: 1,
      generatedRoutes: {
        user: `/user/${this.userEncodedKey}`,
        tasks: `/user/${this.userEncodedKey}/tasks`,
        PageSize: 100,
        CurrentPage: 1,
      },
    };
  }

  componentDidMount() {
    this.loadInitialCustomerData();
  }

  loadInitialCustomerData = () => {
    let { PageSize, CurrentPage } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
    const { dispatch } = this.props;
    if (this.userEncodedKey) {
      this.getUserInfo(this.userEncodedKey);
    } else {
      this.getUserInfo(this.userEncodedKey).then(() => {
        if (
          this.props.adminGetAUserReducer.request_status ===
          administrationConstants.GET_A_USER_SUCCESS
        ) {
          let adminGetAUserRequest = this.props.adminGetAUserReducer;
          dispatch(
            administrationActions.getAUserActivities(
              adminGetAUserRequest.request_data.response.data.encodedKey,
              params
            )
          );
        }
      });
    }
  };

  getUserInfo = async (userEncodedKey) => {
    const { dispatch } = this.props;

    await dispatch(administrationActions.getAUser(userEncodedKey, true));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.userid !== this.props.match.params.userid) {
      this.userEncodedKey = nextProps.match.params.userid;

      this.setState({
        generatedRoutes: {
          user: `/user/${this.userEncodedKey}`,
          tasks: `/user/${this.userEncodedKey}/tasks`,
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
                <NavLink exact to={generatedRoutes.user}>
                  Overview
                </NavLink>
              </li>
            </ul>
          )}
          {!this.userEncodedKey && (
            <ul className="nav">
              <li>
                <NavLink exact to="/my-profile">
                  Overview
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/my-profile/tasks">
                  My Tasks
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  };

  renderUserName = (userDetails) => {
    return (
      <div className="content-container">
        <div className="row">
          <div className="col-sm-12">
            <div className="">
              <h2>
                {userDetails.firstName !== null && userDetails.firstName !== ""
                  ? userDetails.firstName
                  : ""}
                &nbsp;
                {userDetails.lastName !== null && userDetails.lastName !== ""
                  ? userDetails.lastName
                  : ""}
                &nbsp;
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderUserDetailsHeading = () => {
    let adminGetAUserRequest = this.props.adminGetAUserReducer;

    if (
      adminGetAUserRequest.request_status ===
      administrationConstants.GET_A_USER_PENDING
    ) {
      return <div className="loading-text">Please wait... </div>;
    }

    if (
      adminGetAUserRequest.request_status ===
      administrationConstants.GET_A_USER_SUCCESS
    ) {
      // console.log("dsdsdsdsd", adminGetAUserRequest);
      let userDetails = adminGetAUserRequest.request_data.response.data;

      return (
        <div>
          <div className="module-heading">
            <div className="module-title">
              {this.renderUserName(userDetails)}
            </div>
            {this.renderSubMenu()}
          </div>
        </div>
      );
    }
    if (
      adminGetAUserRequest.request_status ===
      administrationConstants.GET_A_USER_FAILURE
    ) {
      return (
        <div className="loading-text errormsg">
          {" "}
          {adminGetAUserRequest.request_data.error}
        </div>
      );
    }
  };

  render() {
    return (
      <Fragment>
        <InnerPageContainer {...this.props}>
          <div className="content-wrapper">
            {this.renderUserDetailsHeading()}

            {this.props.children}
            <Route exact to="/user/:id" component={AccountContainer} />
          </div>
        </InnerPageContainer>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    adminGetAUserReducer: state.administrationReducers.adminGetAUserReducer,
  };
}

export default connect(mapStateToProps)(UserAccountContainer);
