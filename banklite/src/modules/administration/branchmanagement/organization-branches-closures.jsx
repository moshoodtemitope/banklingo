import * as React from "react";
// import {Router} from "react-router";

import { Fragment } from "react";
import AdminNav from "../_menu";
import BranchClosureMenu from "../menus/_branch_closure_menu";
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";
import InnerPageContainer from "../../../shared/templates/authed-pagecontainer";
import Modal from "react-bootstrap/Modal";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import TableComponent from "../../../shared/elements/table";
import TablePagination from "../../../shared/elements/table/pagination";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import { Formik } from "formik";
import * as Yup from "yup";
// import DatePicker from 'react-datepicker';
import DatePicker from "../../../_helpers/datepickerfield";
import DatePickerFieldType from "../../../_helpers/DatePickerFieldType";
import {
  branchActions,
  branchConstants,
} from "../../../redux/actions/administration/branch-management.actions";
import Alert from "react-bootstrap/Alert";
// import  SidebarElement from '../../shared/elements/sidebar'
import "../administration.scss";
import { getDateFromISO } from "../../../shared/utils";
class OrganizationBranchesClosures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      PageSize: 25,
      FullDetails: false,
      CurrentPage: 1,
      CurrentSelectedPage: 1,
      BranchClosureStatus: 0,
      isAnyBranch: false,
      showUpdatePop: false,
    };
  }

  componentDidMount() {
    this.loadInitialData();
    this.getAllBranches();
  }

  loadInitialData = () => {
    let { PageSize, CurrentPage, BranchClosureStatus } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&BranchClosureStatus=${BranchClosureStatus}`;
    this.getClosures(params);
  };

  clearAllData = () => {
    this.props.dispatch(branchActions.openABranch("CLEAR"));
    this.props.dispatch(branchActions.closeABranch("CLEAR"));
  };

  getAllBranches = () => {
    const { dispatch } = this.props;

    dispatch(branchActions.getAllBranches(null, null, true));
  };

  getClosures = (paramters) => {
    const { dispatch } = this.props;

    dispatch(branchActions.getBranchesClosures(paramters));
  };

  setPagesize = (PageSize, tempData) => {
    const { dispatch } = this.props;
    let sizeOfPage = PageSize.target.value,
      {
        FullDetails,
        CurrentPage,
        CurrentSelectedPage,
        BranchClosureStatus,
      } = this.state;

    this.setState({ PageSize: sizeOfPage });

    let params = `FullDetails=${FullDetails}&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&BranchClosureStatus=${BranchClosureStatus}`;

    if (tempData) {
      dispatch(branchActions.getBranchesClosures(params, tempData));
    } else {
      dispatch(branchActions.getBranchesClosures(params));
    }
  };

  setClosureStatus = (closureStatus, tempData) => {
    const { dispatch } = this.props;
    let closure = parseInt(closureStatus.target.value),
      { PageSize, FullDetails, CurrentPage, CurrentSelectedPage } = this.state;

    this.setState({ BranchClosureStatus: closure });

    let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&BranchClosureStatus=${closure}`;

    if (tempData) {
      dispatch(branchActions.getBranchesClosures(params, tempData));
    } else {
      dispatch(branchActions.getBranchesClosures(params));
    }
  };

  loadNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;
    let { PageSize, BranchClosureStatus } = this.state;

    // this.setState({PageSize: sizeOfPage});

    let params = `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}&BranchClosureStatus=${BranchClosureStatus}`;
    // this.getTransactionChannels(params);

    if (tempData) {
      dispatch(branchActions.getBranchesClosures(params, tempData));
    } else {
      dispatch(branchActions.getBranchesClosures(params));
    }
  };

  setShowDetails = (FullDetails, tempData) => {
    const { dispatch } = this.props;

    let showDetails = FullDetails.target.checked,
      {
        CurrentPage,
        CurrentSelectedPage,
        PageSize,
        BranchClosureStatus,
      } = this.state;

    this.setState({ FullDetails: showDetails });

    let params = `FullDetails=${showDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&BranchClosureStatus=${BranchClosureStatus}`;

    if (tempData) {
      dispatch(branchActions.getBranchesClosures(params, tempData));
    } else {
      dispatch(branchActions.getBranchesClosures(params));
    }
  };

  renderAllBranches = () => {
    let getBranchClosuresRequest = this.props.getBranchClosuresReducer;
    let adminGetAllBranchesRequest = this.props.adminGetAllBranches;
    let { BranchClosureStatus } = this.state;
    let saveRequestData =
      getBranchClosuresRequest.request_data !== undefined
        ? getBranchClosuresRequest.request_data.tempData
        : null;

    switch (getBranchClosuresRequest.request_status) {
      case branchConstants.GET_BRANCH_CLOSURES_PENDING:
        if (
          saveRequestData === undefined ||
          (saveRequestData !== undefined && saveRequestData.length < 1)
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
                    <th>Branch Name</th>
                    <th>Branch Status</th>
                    <th>Date Opened</th>
                    <th></th>
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
              <div className="loading-text">Please wait... </div>
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
                    // onChange={this.setPagesize}
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
                    <th>Branch Name</th>
                    <th>Branch Status</th>
                    <th>Date Opened</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {saveRequestData.map((eachBranch, index) => {
                    return (
                      <Fragment key={index}>
                        <tr>
                          <td>{eachBranch.branchName}</td>
                          <td>{eachBranch.branchClosureStatusDescription}</td>
                          <td>{getDateFromISO(eachBranch.dateOpenedFor)}</td>
                          <td>
                            <DropdownButton
                              size="sm"
                              title="Actions"
                              key="activeCurrency"
                              className="customone"
                            >
                              <NavLink
                                className="dropdown-item"
                                to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}
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
            </div>
          );
        }

      case branchConstants.GET_BRANCH_CLOSURES_SUCCESS:
        let allBranchesData =
          getBranchClosuresRequest.request_data.response.data;

        if (allBranchesData !== undefined) {
          if (allBranchesData.result.length >= 1) {
            return (
              <div>
                <div className="heading-with-cta">
                  <Form className="one-liner">
                    <div className="pagination-wrap mr-20">
                      <label htmlFor="toshow">Show</label>
                      <select
                        id="toshow"
                        className="countdropdown form-control form-control-sm w-unset"
                        onChange={(e) =>
                          this.setClosureStatus(e, allBranchesData.result)
                        }
                        value={this.state.BranchClosureStatus}
                      >
                        <option value="0">All</option>
                        <option value="1">Open</option>
                        <option value="2">Closed</option>
                      </select>
                    </div>
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
                      onChange={(e) =>
                        this.setPagesize(e, allBranchesData.result)
                      }
                      value={this.state.PageSize}
                      className="countdropdown form-control form-control-sm"
                    >
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="200">200</option>
                    </select>
                    <TablePagination
                      totalPages={allBranchesData.totalPages}
                      currPage={allBranchesData.currentPage}
                      currRecordsCount={allBranchesData.result.length}
                      totalRows={allBranchesData.totalRows}
                      tempData={allBranchesData.result}
                      pagesCountToshow={4}
                      refreshFunc={this.loadNextPage}
                    />
                  </div>
                </div>
                {adminGetAllBranchesRequest.request_status ===
                  branchConstants.GET_ALL_BRANCHES_SUCCESS && (
                  <div className="heading-ctas pr-0 mb-20">
                    <ul className="nav">
                      <li>
                        <Button size="sm" onClick={this.showAnyOpenBranch}>
                          Open Branch
                        </Button>
                      </li>
                    </ul>
                  </div>
                )}

                <TableComponent classnames="striped bordered hover">
                  <thead>
                    <tr>
                      <th>Branch Name</th>
                      <th>Branch Status</th>
                      <th>Date Opened</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBranchesData.result.map((eachBranch, index) => {
                      return (
                        <Fragment key={index}>
                          <tr>
                            <td>{eachBranch.branchName}</td>
                            <td>{eachBranch.branchClosureStatusDescription}</td>
                            <td>{getDateFromISO(eachBranch.dateOpenedFor)}</td>
                            <td>
                              <DropdownButton
                                size="sm"
                                title="Actions"
                                key="activeCurrency"
                                className="customone"
                              >
                                {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                                {/* {/* <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item> */}
                                {BranchClosureStatus === 0 &&
                                  eachBranch.branchClosureStatus === 1 && (
                                    <Dropdown.Item
                                      eventKey="1"
                                      onClick={() => {
                                        this.handleShowUpdatePop(
                                          eachBranch,
                                          "Close"
                                        );
                                      }}
                                    >
                                      Close
                                    </Dropdown.Item>
                                  )}
                                {BranchClosureStatus === 0 &&
                                  eachBranch.branchClosureStatus === 2 && (
                                    <Dropdown.Item
                                      eventKey="1"
                                      onClick={() => {
                                        this.handleShowUpdatePop(
                                          eachBranch,
                                          "Open"
                                        );
                                      }}
                                    >
                                      Open
                                    </Dropdown.Item>
                                  )}
                                {BranchClosureStatus === 1 && (
                                  <Dropdown.Item
                                    eventKey="1"
                                    onClick={() => {
                                      this.handleShowUpdatePop(
                                        eachBranch,
                                        "Close"
                                      );
                                    }}
                                  >
                                    Close
                                  </Dropdown.Item>
                                )}
                                {BranchClosureStatus === 2 && (
                                  <Dropdown.Item
                                    eventKey="1"
                                    onClick={() => {
                                      this.handleShowUpdatePop(
                                        eachBranch,
                                        "Open"
                                      );
                                    }}
                                  >
                                    Open
                                  </Dropdown.Item>
                                )}
                              </DropdownButton>
                            </td>
                          </tr>
                        </Fragment>
                      );
                    })}
                  </tbody>
                </TableComponent>
              </div>
            );
          } else {
            return (
              <div className="no-records">
                <div className="heading-with-cta">
                  <Form className="one-liner">
                    <div className="pagination-wrap mr-20">
                      <label htmlFor="toshow">Show</label>
                      <select
                        id="toshow"
                        className="countdropdown form-control form-control-sm w-unset"
                        onChange={(e) => this.setClosureStatus(e)}
                        value={this.state.BranchClosureStatus}
                      >
                        <option value="0">All</option>
                        <option value="1">Open</option>
                        <option value="2">Closed</option>
                      </select>
                    </div>

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
                {adminGetAllBranchesRequest.request_status ===
                  branchConstants.GET_ALL_BRANCHES_SUCCESS && (
                  <div className="heading-ctas pr-0 mb-20">
                    <ul className="nav">
                      <li>
                        <Button size="sm" onClick={this.showAnyOpenBranch}>
                          Open Branch
                        </Button>
                      </li>
                    </ul>
                  </div>
                )}
                <TableComponent classnames="striped bordered hover">
                  <thead>
                    <tr>
                      <th>Branch Name</th>
                      <th>Branch Status</th>
                      <th>Date Opened</th>
                      {/* <th></th> */}
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
        } else {
          return null;
        }

      case branchConstants.GET_BRANCH_CLOSURES_FAILURE:
        return (
          <div className="loading-content errormsg">
            <div>{getBranchClosuresRequest.request_data.error}</div>
          </div>
        );
      default:
        return null;
    }
  };

  handleCloseUpdatePop = () => {
    if (this.props.openABranchReducer.is_request_processing === false) {
      this.setState({ showUpdatePop: false, branchToUpdate: null });
    }
  };

  handleShowUpdatePop = (branchToUpdate, status) => {
    this.clearAllData();
    this.setState({
      showUpdatePop: true,
      branchAction: status,
      branchToUpdate,
      isAnyBranch: false,
    });
  };

  updateABranchStatus = async (payload) => {
    const { dispatch } = this.props;
    let { branchAction } = this.state;
    await dispatch(branchActions.openABranch(payload, branchAction));
  };

  showAnyOpenBranch = (branchToUpdate) => {
    this.clearAllData();
    this.setState({
      showUpdatePop: true,
      branchAction: "Open",
      branchToUpdate,
      isAnyBranch: true,
    });
  };

  handleDateChange = (dateChosen) => {
    console.log("date is", dateChosen);
    dateChosen.setHours(dateChosen.getHours() + 1);

    this.setState({ dateChosen });
  };

  updateAnyBranchPopUp = () => {
    let {
      showUpdatePop,
      branchToUpdate,
      isAnyBranch,
      branchAction,
    } = this.state;
    let updateABranchRequest = this.props.openABranchReducer;

    let adminGetAllBranchesRequest = this.props.adminGetAllBranches,
      branchData = adminGetAllBranchesRequest.request_data.response.data,
      allBranchList = [];

    branchData.map((branch, id) => {
      allBranchList.push({
        label: branch.name,
        value: branch.branchEncodedKey,
      });
    });

    let checkValidationSchema;

    if (isAnyBranch) {
      checkValidationSchema = Yup.object().shape({
        closureDate: Yup.string().required("Required"),
        branchEncodedKey: Yup.string().required("Required"),
      });
    } else {
      checkValidationSchema = Yup.object().shape({
        closureDate: Yup.string().required("Required"),
      });
    }
    return (
      <Modal
        show={showUpdatePop}
        onHide={this.handleCloseUpdatePop}
        size="lg"
        centered="true"
        dialogClassName="modal-40w withcentered-heading"
        animation={true}
      >
        <Modal.Header>
          <Modal.Title>
            {branchAction} {branchToUpdate.branchName} branch
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              closureDate: "",
            }}
            // validationSchema={checkValidationSchema}
            onSubmit={(values, { resetForm }) => {
              // same shape as initial values
              let dateChosen = values.closureDate;

              dateChosen.setHours(dateChosen.getHours() + 1);

              let requestPayload = {
                branchEncodedKey: values.branchEncodedKey ? values.branchEncodedKey: branchToUpdate.branchEncodedKey,
                closureDate: dateChosen.toISOString(),
                note: values.note
              };

              this.updateABranchStatus(requestPayload).then(() => {
                if (
                  this.props.openABranchReducer.request_status ===
                  branchConstants.OPEN_A_BRANCH_SUCCESS
                ) {
                  resetForm();
                  this.loadInitialData();
                }
              });
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue,
              setFieldTouched,
              resetForm,
              values,
              touched,
              isValid,
              errors,
            }) => {
              return (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label className="block-level">Branch</Form.Label>
                    <div className="branch-name">
                      {branchToUpdate.branchName}{" "}
                    </div>
                    {isAnyBranch && (
                      <Select
                        options={allBranchList}
                        onChange={(selectedBranch) => {
                          this.setState({ selectedBranch });
                          // console.log("ahajdsd",selectedBranch);
                          setFieldValue(
                            "branchEncodedKey",
                            selectedBranch.value
                          );
                          errors.branchEncodedKey = null;
                          values.branchEncodedKey = selectedBranch.value;
                        }}
                        className={
                          errors.branchEncodedKey && touched.branchEncodedKey
                            ? "is-invalid"
                            : null
                        }
                        name="branchEncodedKey"
                        required
                      />
                    )}
                  </Form.Group>
                  <Form.Group
                    controlId="debitLocation"
                    className={
                      errors.closureDate && touched.closureDate
                        ? "has-invaliderror fullwidthdate"
                        : "fullwidthdate"
                    }
                  >
                    <Form.Label className="block-level">
                      Closure Date
                    </Form.Label>
                    <DatePicker
                      placeholderText="Choose date"
                      autoComplete="new-date"
                      dateFormat={window.dateformat}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      name="closureDate"
                      value={values.closureDate}
                      onChange={setFieldValue}
                      maxDate={new Date()}
                      className={
                        errors.closureDate && touched.closureDate
                          ? "is-invalid form-control form-control-sm h-38px"
                          : "form-control form-control-sm h-38px"
                      }
                      customInput={
                        <DatePickerFieldType placeHolder="Choose date" />
                      }
                    />
                    {errors.closureDate && touched.closureDate ? (
                      <span className="invalid-feedback">
                        {errors.closureDate}
                      </span>
                    ) : null}
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="block-level">Notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      onChange={handleChange}
                      name="notes"
                      value={values.notes}
                      className={
                        errors.notes && touched.notes
                          ? "is-invalid form-control form-control-sm"
                          : null
                      }
                    />

                    {errors.notes && touched.notes ? (
                      <span className="invalid-feedback">{errors.notes}</span>
                    ) : null}
                  </Form.Group>
                  <div className="footer-with-cta toleft">
                    <Button
                      disabled={updateABranchRequest.is_request_processing}
                      variant="secondary"
                      className="grayed-out"
                      onClick={this.handleCloseUpdatePop}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={updateABranchRequest.is_request_processing}
                    >
                      {updateABranchRequest.is_request_processing
                        ? "Please wait..."
                        : `${branchAction} Branch`}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          {updateABranchRequest.request_status ===
            branchConstants.OPEN_A_BRANCH_SUCCESS && (
            <Alert variant="success">
              {updateABranchRequest.request_data.response.data.message}
            </Alert>
          )}
          {updateABranchRequest.request_status ===
            branchConstants.OPEN_A_BRANCH_FAILURE && (
            <Alert variant="danger">
              {updateABranchRequest.request_data.error}
            </Alert>
          )}
        </Modal.Body>
      </Modal>
    );
  };

  render() {
    let { BranchClosureStatus, showUpdatePop } = this.state;
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
                        <h2>
                          Branch Closures
                          {BranchClosureStatus === 0 && <span>(All)</span>}
                          {BranchClosureStatus === 1 && <span>(Opened)</span>}
                          {BranchClosureStatus === 2 && <span>(Closed)</span>}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="module-submenu">
                <div className="content-container">
                  {/* <AdminNav /> */}
                  {/* <div className="lowerlevel-menu">
                                        <ul className="nav">
                                            <li>
                                                <NavLink exact to={'/administration/organization'}>Branches</NavLink>
                                            </li>
                                            <li>
                                                <NavLink exact to={'/administration/organization/branch-closures'}>Branch Closures</NavLink>
                                            </li>
                                        </ul>
                                    </div> */}
                  {/* <BranchClosureMenu /> */}
                </div>
              </div>
              <div className="module-content">
                <div className="content-container">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="middle-content">
                        {this.renderAllBranches()}
                        {showUpdatePop && this.updateAnyBranchPopUp()}
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
    getBranchClosuresReducer:
      state.administrationReducers.getBranchClosuresReducer,
    adminGetAllBranches:
      state.administrationReducers.adminGetAllBranchesReducer,
    openABranchReducer: state.administrationReducers.openABranchReducer,
    closeABranchReducer: state.administrationReducers.closeABranchReducer,
  };
}

export default connect(mapStateToProps)(OrganizationBranchesClosures);
