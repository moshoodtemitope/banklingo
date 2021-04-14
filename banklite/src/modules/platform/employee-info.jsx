import * as React from 'react';
// import {Router} from "react-router";

import { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import InnerPageContainer from '../../shared/templates/authed-pagecontainer';
import TableComponent from '../../shared/elements/table';
import TablePagination from '../../shared/elements/table/pagination';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// import GeneralNav from './menus/_general-menu'
import Select from 'react-select';
import DatePickerEx from '../../_helpers/datepickerfield';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  accountNumber,
  getDateFromISO,
  numberWithCommas,
} from '../../shared/utils';

import { platformActions } from '../../redux/actions/platform/platform.action';
import { platformConstants } from '../../redux/actiontypes/platform/platform.constants';

import Alert from 'react-bootstrap/Alert';
import DatePickerFieldType from '../../_helpers/DatePickerFieldType';

class ManageEmployeeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      PageSize: 25,
      ShowDeactivated: true,
      CurrentPage: 1,
      CurrentSelectedPage: 1,
      showCreateNewRecord: false,
      showEditRecord: false,
      defaultOptions: null,
      selectedCustomer: '',
      endDate: '',
      startDate: '',
      SearchText: '',
    };
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = () => {
    let { PageSize, CurrentPage, ShowDeactivated } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&ShowDeactivated=${ShowDeactivated}`;

    this.fetchAllRecords(params);
    // this.clearAllData()
  };

  fetchAllRecords = (paramters) => {
    const { dispatch } = this.props;

    dispatch(platformActions.fetchAllEmployeeInfo(paramters));
  };

  clearAllData = () => {
    this.props.dispatch(platformActions.createEmployeeInfo('CLEAR'));
    this.props.dispatch(platformActions.updateEmployeeInfo('CLEAR'));
  };

  setPagesize = (PageSize, tempData) => {
    const { dispatch } = this.props;
    let sizeOfPage = PageSize.target.value,
      { CurrentPage, CurrentSelectedPage, ShowDeactivated } = this.state;

    this.setState({ PageSize: sizeOfPage });

    let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&ShowDeactivated=${ShowDeactivated}`;
    // this.fetchAllRecords(params);

    if (tempData) {
      dispatch(platformActions.fetchAllEmployeeInfo(params, tempData));
    } else {
      dispatch(platformActions.fetchAllEmployeeInfo(params));
    }
  };

  setShowDeactivated = (ShowDeactivated, tempData) => {
    const { dispatch } = this.props;

    let showNonActive = ShowDeactivated.target.checked,
      { CurrentPage, CurrentSelectedPage, PageSize } = this.state;

    this.setState({ ShowDeactivated: showNonActive });

    let params = `ShowDeactivated=${showNonActive}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;

    if (tempData) {
      dispatch(platformActions.fetchAllEmployeeInfo(params, tempData));
    } else {
      dispatch(platformActions.fetchAllEmployeeInfo(params));
    }
  };

  loadNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;
    let { PageSize } = this.state;

    // this.setState({PageSize: sizeOfPage});

    let params = `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
    // this.getTransactionChannels(params);

    if (tempData) {
      dispatch(platformActions.fetchAllEmployeeInfo(params, tempData));
    } else {
      dispatch(platformActions.fetchAllEmployeeInfo(params));
    }
  };

  handleCloseNewRecord = () => {
    if (this.props.createEmployeeInfo.is_request_processing === false) {
      this.setState({ showCreateNewRecord: false });
    }
    if (
      this.props.createEmployeeInfo.request_status ===
      platformConstants.ADD_A_PAYROLLINFO_SUCCESS
    ) {
      this.loadInitialData();
    }
  };

  handleShowNewRecord = () => {
    this.clearAllData();
    this.setState({ showCreateNewRecord: true });
  };

  handleEditRecordClose = () => {
    if (this.props.updateEmployeeInfo.is_request_processing === false) {
      this.setState({ showEditRecord: false });
    }

    if (
      this.props.updateEmployeeInfo.request_status ===
      platformConstants.UPDATE_A_PAYROLLINFO_SUCCESS
    ) {
      this.loadInitialData();
    }
  };

  handleEditRecordShow = (recordToUpdate, updateType) => {
    this.clearAllData();
    this.setState({ updateType, recordToUpdate, showEditRecord: true });
  };

  createNewRecordPopUp = () => {
    let { showCreateNewRecord } = this.state;
    let createEmployeeInfoRequest = this.props.createEmployeeInfo;
    let fetchAllEmployeeInfoRequest = this.props.fetchAllEmployeeInfo,
      allPayGroups =
        fetchAllEmployeeInfoRequest.request_data.response2.data.result;

    let allPayGroupList = [];
    allPayGroups.map((eachData, index) => {
      allPayGroupList.push({
        value: eachData.groupCode,
        label: eachData.groupName,
      });
    });

    let allBanksList = [],
      allbanks = fetchAllEmployeeInfoRequest.request_data.response3.data;

    if (allbanks.length >= 1) {
      allbanks.map((eachBank) => {
        allBanksList.push({
          label: eachBank.bankName,
          value: eachBank.bankCode,
        });
      });
    }

    let checkValidationSchema = Yup.object().shape({
      payrollGroupCode: Yup.string().required('Required'),
      accountNumber: Yup.string().required('Required'),
      bankName: Yup.string().required('Required'),
      department: Yup.string().required('Required'),
      employeeNumber: Yup.string().required('Required'),
      employmentDate: Yup.string().required('Required'),
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      // middleName: Yup.string(),
    });

    return (
      <Modal
        show={showCreateNewRecord}
        onHide={this.handleCloseNewRecord}
        size='lg'
        centered='true'
        dialogClassName='modal-40w withcentered-heading'
        animation={true}
      >
        <Modal.Header>
          <Modal.Title>Add New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              payrollGroupCode: '',
              accountNumber: '',
              bankName: '',
              department: '',
              employeeNumber: '',
              employmentDate: '',
              firstName: '',
              lastName: '',
              middleName: '',
            }}
            // validationSchema={checkValidationSchema}
            onSubmit={(values, { resetForm }) => {
              // same shape as initial values

              let requestPayload = {
                payrollGroupCode: values.payrollGroupCode,
                employeeInformation: {
                  accountNumber: values.accountNumber,
                  bankCode: values.bankName,
                  bankName: this.state.selectedBank.label,
                  department: values.department,
                  employeeNumber: values.employeeNumber,
                  employmentDate: values.employmentDate.toISOString(),
                  firstName: values.firstName,
                  lastName: values.lastName,
                  middleName: values.middleName,
                },
              };

              this.createNewRecord(requestPayload).then(() => {
                if (
                  this.props.createEmployeeInfo.request_status ===
                  platformConstants.ADD_A_PAYROLLINFO_SUCCESS
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
                  <Form.Row>
                    <Col>
                      <Form.Label className='block-level'>
                        Paygroup Code
                      </Form.Label>
                      <Select
                        options={allPayGroupList}
                        onChange={(selectedAccount) => {
                          this.setState({ selectedAccount });
                          errors.payrollGroupCode = null;
                          values.payrollGroupCode = selectedAccount.value;
                        }}
                        className={
                          errors.payrollGroupCode && touched.payrollGroupCode
                            ? 'is-invalid'
                            : null
                        }
                        // value="payrollGroupCode"
                        name='payrollGroupCode'
                        // value={values.payrollGroupCode || ''}
                        required
                      />

                      {errors.payrollGroupCode && touched.payrollGroupCode ? (
                        <span className='invalid-feedback'>
                          {errors.payrollGroupCode}
                        </span>
                      ) : null}
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Label className='block-level'>
                        First name
                      </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={handleChange}
                        value={values.firstName}
                        className={
                          errors.firstName && touched.firstName
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='firstName'
                        required
                      />

                      {errors.firstName && touched.firstName ? (
                        <span className='invalid-feedback'>
                          {errors.firstName}
                        </span>
                      ) : null}
                    </Col>
                    <Col>
                      <Form.Label className='block-level'>Last name</Form.Label>
                      <Form.Control
                        type='text'
                        onChange={handleChange}
                        value={values.lastName}
                        className={
                          errors.lastName && touched.lastName
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='lastName'
                        required
                      />

                      {errors.lastName && touched.lastName ? (
                        <span className='invalid-feedback'>
                          {errors.lastName}
                        </span>
                      ) : null}
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Label className='block-level'>
                        Midle name
                      </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={handleChange}
                        value={values.middleName}
                        className={
                          errors.middleName && touched.middleName
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='middleName'
                        required
                      />

                      {errors.middleName && touched.middleName ? (
                        <span className='invalid-feedback'>
                          {errors.middleName}
                        </span>
                      ) : null}
                    </Col>
                    <Col></Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Label className='block-level'>
                        Account number
                      </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={handleChange}
                        value={accountNumber(values.accountNumber, 10)}
                        className={
                          errors.accountNumber && touched.accountNumber
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='accountNumber'
                        required
                      />

                      {errors.accountNumber && touched.accountNumber ? (
                        <span className='invalid-feedback'>
                          {errors.accountNumber}
                        </span>
                      ) : null}
                    </Col>
                    <Col>
                      <Form.Label className='block-level'>Bank name</Form.Label>
                      <Select
                        options={allBanksList}
                        className={
                          errors.bankName && touched.bankName
                            ? 'is-invalid'
                            : null
                        }
                        onChange={(selectedBank) => {
                          setFieldValue('bankName', selectedBank.value);
                          this.setState({ selectedBank });
                        }}
                        onBlur={() => setFieldTouched('bankName', true)}
                        name='bankName'
                        required
                      />

                      {errors.bankName && touched.bankName ? (
                        <span className='invalid-feedback'>
                          {errors.bankName}
                        </span>
                      ) : null}
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Label className='block-level'>
                        Department
                      </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={handleChange}
                        value={values.department}
                        className={
                          errors.department && touched.department
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='department'
                        required
                      />

                      {errors.department && touched.department ? (
                        <span className='invalid-feedback'>
                          {errors.department}
                        </span>
                      ) : null}
                    </Col>
                    <Col>
                      <Form.Label className='block-level'>
                        Employee number
                      </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={handleChange}
                        value={values.employeeNumber}
                        className={
                          errors.employeeNumber && touched.employeeNumber
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='employeeNumber'
                        required
                      />

                      {errors.employeeNumber && touched.employeeNumber ? (
                        <span className='invalid-feedback'>
                          {errors.employeeNumber}
                        </span>
                      ) : null}
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Group
                        controlId='debitLocation'
                        className={
                          errors.employmentDate && touched.employmentDate
                            ? 'has-invaliderror fullwidthdate'
                            : 'fullwidthdate'
                        }
                      >
                        <Form.Label className='block-level'>
                          Employment Date
                        </Form.Label>
                        <DatePickerEx
                          placeholderText='Choose  date'
                          autoComplete='new-password'
                          autoComplete='new-password'
                          // onChange={this.handleDatePicker}
                          // onChangeRaw={(e) => this.handleDateChange(e)}
                          dateFormat={window.dateformat}
                          className='form-control form-control-sm'
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode='select'
                          name='employmentDate'
                          value={values.employmentDate}
                          onChange={setFieldValue}
                          maxDate={new Date()}
                          className={
                            errors.employmentDate && touched.employmentDate
                              ? 'is-invalid form-control form-control-sm h-38px'
                              : 'form-control form-control-sm h-38px'
                          }
                        />
                        {errors.employmentDate && touched.employmentDate ? (
                          <span className='invalid-feedback'>
                            {errors.employmentDate}
                          </span>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <div className='footer-with-cta toleft'>
                    <Button
                      disabled={createEmployeeInfoRequest.is_request_processing}
                      variant='secondary'
                      className='grayed-out'
                      onClick={this.handleCloseNewRecord}
                    >
                      Cancel
                    </Button>
                    <Button
                      type='submit'
                      disabled={createEmployeeInfoRequest.is_request_processing}
                    >
                      {createEmployeeInfoRequest.is_request_processing
                        ? 'Please wait...'
                        : 'Create'}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          {createEmployeeInfoRequest.request_status ===
            platformConstants.ADD_A_PAYROLLINFO_SUCCESS && (
            <Alert variant='success'>
              {createEmployeeInfoRequest.request_data.response.data.message}
            </Alert>
          )}
          {createEmployeeInfoRequest.request_status ===
            platformConstants.ADD_A_PAYROLLINFO_FAILURE && (
            <Alert variant='danger'>
              {createEmployeeInfoRequest.request_data.error}
            </Alert>
          )}
        </Modal.Body>
      </Modal>
    );
  };

  createNewRecord = async (payload) => {
    const { dispatch } = this.props;

    await dispatch(platformActions.createEmployeeInfo(payload));
  };

  updateARecord = async (payload, encodedKey) => {
    const { dispatch } = this.props;

    await dispatch(platformActions.updateEmployeeInfo(payload, encodedKey));
  };

  updateRecordPopUp = (updateType) => {
    let { showEditRecord, recordToUpdate } = this.state;
    let updateEmployeeInfoRequest = this.props.updateEmployeeInfo;
    let fetchAllEmployeeInfoRequest = this.props.fetchAllEmployeeInfo,
      allPayGroups =
        fetchAllEmployeeInfoRequest.request_data.response2.data.result;

    // let getAllCurrencies =  this.props.adminGetAllCurrencies;
    let allPayGroupList = [],
      filteredData;
    allPayGroups.map((eachAccount, index) => {
      allPayGroupList.push({
        value: eachAccount.id,
        label: eachAccount.accountDescription,
      });
    });

    filteredData = allPayGroupList.filter(
      (eachData) =>
        eachData.value === recordToUpdate.serviceCommisionGLAcccountId
    )[0];
    // let getAllCurrencies =  this.props.adminGetAllCurrencies;
    let allBanksList = [],
      allbanks = fetchAllEmployeeInfoRequest.request_data.response3.data;

    if (allbanks.length >= 1) {
      allbanks.map((eachBank) => {
        allBanksList.push({
          label: eachBank.bankName,
          value: eachBank.bankCode,
        });
      });
    }

    // console.log("lalaa", recordToUpdate);
    let checkValidationSchema = Yup.object().shape({
      name: Yup.string().required('Required'),
      serviceCode: Yup.string().required('Required'),
      serviceDescription: Yup.string(),
      maxServiceCommissionValue: Yup.string().required('Required'),
      serviceCommisionCalculation: Yup.string().required('Required'),
      serviceCommission: Yup.string().required('Required'),
      serviceCommisionGLAcccountId: Yup.string().required('Required'),
    });

    return (
      <Modal
        show={showEditRecord}
        onHide={this.handleEditRecordClose}
        size='lg'
        centered='true'
        dialogClassName='modal-40w withcentered-heading'
        animation={true}
      >
        <Modal.Header>
          {this.state.updateType === 'edit' && (
            <Modal.Title>
              Editing {recordToUpdate.firstName} {recordToUpdate.lastName}{' '}
            </Modal.Title>
          )}
          {/* {this.state.updateType === "activate" && <Modal.Title>Confirm Activation</Modal.Title>}
                    {this.state.updateType === "deactivate" && <Modal.Title>Confirm De-Activation</Modal.Title>} */}
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              payrollGroupCode: '',
              accountNumber: recordToUpdate.accountNumber,
              bankName: recordToUpdate.bankCode,
              department: recordToUpdate.department,
              employeeNumber: recordToUpdate.employeeNumber,
              employmentDate: '',
              firstName: recordToUpdate.firstName,
              lastName: recordToUpdate.lastName,
              middleName: recordToUpdate.middleName,
            }}
            // validationSchema={checkValidationSchema}
            onSubmit={(values, { resetForm }) => {
              // same shape as initial values

              let requestPayload;
              if (this.state.updateType === 'edit') {
                let requestPayload = {
                  payrollGroupCode: values.payrollGroupCode,
                  employeeInformation: {
                    accountNumber: values.accountNumber,
                    bankCode: values.bankName || recordToUpdate.bankCode,
                    bankName: this.state.selectedBank
                      ? this.state.selectedBank.label
                      : recordToUpdate.bankName,
                    department: values.department,
                    employeeNumber: values.employeeNumber,
                    employmentDate: values.employmentDate.toISOString(),
                    firstName: values.firstName,
                    lastName: values.lastName,
                    middleName: values.middleName,
                  },
                };
              }

              this.updateARecord(
                requestPayload,
                recordToUpdate.encodedKey
              ).then(() => {
                if (
                  this.props.updateEmployeeInfo.request_status ===
                  platformConstants.UPDATE_A_PAYROLLINFO_SUCCESS
                ) {
                  // this.loadInitialData();
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
              // console.log("data is",values, errors);
              return (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Row>
                    <Col>
                      <Form.Label className='block-level'>
                        Paygroup Code
                      </Form.Label>
                      <Select
                        options={allPayGroupList}
                        onChange={(selectedAccount) => {
                          this.setState({ selectedAccount });
                          errors.payrollGroupCode = null;
                          values.payrollGroupCode = selectedAccount.value;
                        }}
                        className={
                          errors.payrollGroupCode && touched.payrollGroupCode
                            ? 'is-invalid'
                            : null
                        }
                        // value="payrollGroupCode"
                        name='payrollGroupCode'
                        // value={values.payrollGroupCode || ''}
                        required
                      />

                      {errors.payrollGroupCode && touched.payrollGroupCode ? (
                        <span className='invalid-feedback'>
                          {errors.payrollGroupCode}
                        </span>
                      ) : null}
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Label className='block-level'>
                        First name
                      </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={handleChange}
                        value={values.firstName}
                        className={
                          errors.firstName && touched.firstName
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='firstName'
                        required
                      />

                      {errors.firstName && touched.firstName ? (
                        <span className='invalid-feedback'>
                          {errors.firstName}
                        </span>
                      ) : null}
                    </Col>
                    <Col>
                      <Form.Label className='block-level'>Last name</Form.Label>
                      <Form.Control
                        type='text'
                        onChange={handleChange}
                        value={values.lastName}
                        className={
                          errors.lastName && touched.lastName
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='lastName'
                        required
                      />

                      {errors.lastName && touched.lastName ? (
                        <span className='invalid-feedback'>
                          {errors.lastName}
                        </span>
                      ) : null}
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Label className='block-level'>
                        Midle name
                      </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={handleChange}
                        value={values.middleName}
                        className={
                          errors.middleName && touched.middleName
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='middleName'
                        required
                      />

                      {errors.middleName && touched.middleName ? (
                        <span className='invalid-feedback'>
                          {errors.middleName}
                        </span>
                      ) : null}
                    </Col>
                    <Col></Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Label className='block-level'>
                        Account number
                      </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={handleChange}
                        value={accountNumber(values.accountNumber, 10)}
                        className={
                          errors.accountNumber && touched.accountNumber
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='accountNumber'
                        required
                      />

                      {errors.accountNumber && touched.accountNumber ? (
                        <span className='invalid-feedback'>
                          {errors.accountNumber}
                        </span>
                      ) : null}
                    </Col>
                    <Col>
                      <Form.Label className='block-level'>Bank name</Form.Label>
                      <Select
                        options={allBanksList}
                        className={
                          errors.bankName && touched.bankName
                            ? 'is-invalid'
                            : null
                        }
                        defaultValue={{
                          label:
                            recordToUpdate !== null
                              ? recordToUpdate.bankName
                              : null,
                          value:
                            recordToUpdate !== null
                              ? recordToUpdate.bankCode
                              : null,
                        }}
                        onChange={(selectedBank) => {
                          setFieldValue('bankName', selectedBank.value);
                          this.setState({ selectedBank });
                        }}
                        onBlur={() => setFieldTouched('bankName', true)}
                        name='bankName'
                        required
                      />

                      {errors.bankName && touched.bankName ? (
                        <span className='invalid-feedback'>
                          {errors.bankName}
                        </span>
                      ) : null}
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Label className='block-level'>
                        Department
                      </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={handleChange}
                        value={values.department}
                        className={
                          errors.department && touched.department
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='department'
                        required
                      />

                      {errors.department && touched.department ? (
                        <span className='invalid-feedback'>
                          {errors.department}
                        </span>
                      ) : null}
                    </Col>
                    <Col>
                      <Form.Label className='block-level'>
                        Employee number
                      </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={handleChange}
                        value={values.employeeNumber}
                        className={
                          errors.employeeNumber && touched.employeeNumber
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='employeeNumber'
                        required
                      />

                      {errors.employeeNumber && touched.employeeNumber ? (
                        <span className='invalid-feedback'>
                          {errors.employeeNumber}
                        </span>
                      ) : null}
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Group
                        controlId='debitLocation'
                        className={
                          errors.employmentDate && touched.employmentDate
                            ? 'has-invaliderror fullwidthdate'
                            : 'fullwidthdate'
                        }
                      >
                        <Form.Label className='block-level'>
                          Employment Date
                        </Form.Label>
                        <DatePickerEx
                          placeholderText='Choose  date'
                          autoComplete='new-password'
                          autoComplete='new-password'
                          // onChange={this.handleDatePicker}
                          // onChangeRaw={(e) => this.handleDateChange(e)}
                          dateFormat={window.dateformat}
                          className='form-control form-control-sm'
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode='select'
                          name='employmentDate'
                          value={values.employmentDate}
                          onChange={setFieldValue}
                          maxDate={new Date()}
                          className={
                            errors.employmentDate && touched.employmentDate
                              ? 'is-invalid form-control form-control-sm h-38px'
                              : 'form-control form-control-sm h-38px'
                          }
                        />
                        {errors.employmentDate && touched.employmentDate ? (
                          <span className='invalid-feedback'>
                            {errors.employmentDate}
                          </span>
                        ) : null}
                      </Form.Group>
                    </Col>
                  </Form.Row>

                  <div className='footer-with-cta toleft'>
                    <Button
                      disabled={updateEmployeeInfoRequest.is_request_processing}
                      variant='secondary'
                      className='grayed-out'
                      onClick={this.handleEditRecordClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      type='submit'
                      disabled={updateEmployeeInfoRequest.is_request_processing}
                    >
                      {updateEmployeeInfoRequest.is_request_processing &&
                        'Please wait...'}
                      {!updateEmployeeInfoRequest.is_request_processing &&
                        this.state.updateType === 'edit' &&
                        'Update'}
                      {!updateEmployeeInfoRequest.is_request_processing &&
                        this.state.updateType === 'activate' &&
                        'Activate'}
                      {!updateEmployeeInfoRequest.is_request_processing &&
                        this.state.updateType === 'deactivate' &&
                        'De-Activate'}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          {updateEmployeeInfoRequest.request_status ===
            platformConstants.UPDATE_A_PAYROLLINFO_SUCCESS && (
            <Alert variant='success'>
              {updateEmployeeInfoRequest.request_data.response.data.message}
            </Alert>
          )}
          {updateEmployeeInfoRequest.request_status ===
            platformConstants.UPDATE_A_PAYROLLINFO_FAILURE && (
            <Alert variant='danger'>
              {updateEmployeeInfoRequest.request_data.error}
            </Alert>
          )}
        </Modal.Body>
      </Modal>
    );
  };

  renderContentWrap = () => {
    let fetchAllEmployeeInfoRequest = this.props.fetchAllEmployeeInfo;

    let saveRequestData =
      fetchAllEmployeeInfoRequest.request_data !== undefined
        ? fetchAllEmployeeInfoRequest.request_data.tempData
        : null;

    switch (fetchAllEmployeeInfoRequest.request_status) {
      case platformConstants.GET_ALL_PAYROLLINFO_PENDING:
        if (
          saveRequestData === undefined ||
          (saveRequestData !== undefined && saveRequestData.length < 1)
        ) {
          return (
            <div className='loading-content'>
              <div className='heading-with-cta'>
                <Form className='one-liner'>
                  <Form.Group
                    controlId='filterDropdown'
                    className='no-margins pr-10'
                  >
                    <Form.Control as='select' size='sm'>
                      <option>No Filter</option>
                      <option>Add New Filter</option>
                      <option>Custom Filter</option>
                    </Form.Control>
                  </Form.Group>
                  <Button
                    className='no-margins'
                    variant='primary'
                    type='submit'
                  >
                    Filter
                  </Button>
                </Form>

                <div className='pagination-wrap'>
                  <label htmlFor='toshow'>Show</label>
                  <select
                    id='toshow'
                    className='countdropdown form-control form-control-sm'
                  >
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='200'>200</option>
                  </select>
                </div>
              </div>
              <TableComponent classnames='striped bordered hover'>
                <thead>
                  <tr>
                    <th>Employee Full name</th>
                    <th>Employee number</th>
                    <th>Employment date</th>
                    <th>Department</th>
                    <th>Bank name</th>
                    <th>Account number</th>
                    <th>Date Created</th>
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
                    <td></td>
                  </tr>
                </tbody>
              </TableComponent>
              <div className='loading-text'>Please wait... </div>
            </div>
          );
        } else {
          return (
            <div>
              <div className='heading-with-cta'>
                <Form className='one-liner'>
                  <Form.Group
                    controlId='filterDropdown'
                    className='no-margins pr-10'
                  >
                    <Form.Control as='select' size='sm'>
                      <option>No Filter</option>
                      <option>Add New Filter</option>
                      <option>Custom Filter</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className='table-filters'>
                    <DatePicker
                      autoComplete='new-off'
                      onChangeRaw={this.handleDateChangeRaw}
                      onChange={this.handleStartDatePicker}
                      selected={this.state.startDate}
                      dateFormat={window.dateformat}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode='select'
                      placeholderText='Start date'
                      autoComplete='new-password'
                      maxDate={new Date()}
                      // className="form-control form-control-sm h-38px"
                      className='form-control form-control-sm '
                      customInput={
                        <DatePickerFieldType placeHolder='Start date' />
                      }
                    />
                    <DatePicker
                      autoComplete='new-off'
                      placeholderText='End  date'
                      onChangeRaw={this.handleDateChangeRaw}
                      onChange={this.handleEndDatePicker}
                      selected={this.state.endDate}
                      dateFormat={window.dateformat}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode='select'
                      maxDate={new Date()}
                      // className="form-control form-control-sm h-38px"
                      className='form-control form-control-sm'
                      customInput={
                        <DatePickerFieldType placeHolder='End date' />
                      }
                    />
                    <input
                      type='text'
                      className='form-control-sm search-table form-control'
                      placeholder='Search text'
                      value={this.state.SearchText}
                      onChange={(e) => {
                        this.setState({ SearchText: e.target.value.trim() });
                      }}
                    />
                    {/* {errors.startDate && touched.startDate ? (
                                                <span className="invalid-feedback">{errors.startDate}</span>
                                            ) : null} */}
                  </Form.Group>
                  <Button
                    className='no-margins'
                    variant='primary'
                    type='submit'
                  >
                    Filter
                  </Button>
                </Form>

                <div className='pagination-wrap'>
                  <label htmlFor='toshow'>Show</label>
                  <select
                    id='toshow'
                    // onChange={this.setPagesize}
                    value={this.state.PageSize}
                    className='countdropdown form-control form-control-sm'
                  >
                    <option value='10'>10</option>
                    <option value='25'>25</option>
                    <option value='50'>50</option>
                    <option value='200'>200</option>
                  </select>
                </div>
              </div>
              <div className='loading-text'>Please wait... </div>
              <TableComponent classnames='striped bordered hover'>
                <thead>
                  <tr>
                    <th>Employee Full name</th>
                    <th>Employee number</th>
                    <th>Employment date</th>
                    <th>Department</th>
                    <th>Bank name</th>
                    <th>Account number</th>
                    <th>Date Created</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {saveRequestData.map((eachItem, index) => {
                    return (
                      <Fragment key={index}>
                        <tr>
                          <td>
                            {eachItem.firstName} {eachItem.lastName}{' '}
                            {eachItem.middleName}
                          </td>
                          <td>{eachItem.employeeNumber}</td>
                          <td>{getDateFromISO(eachItem.employmentDate)}</td>
                          <td>{eachItem.department}</td>
                          <td>{eachItem.bankName}</td>
                          <td>{eachItem.accountNumber}</td>
                          <td>{getDateFromISO(eachItem.dateCreated)}</td>
                          <td>
                            <DropdownButton
                              size='sm'
                              title='Actions'
                              key='activeCurrency'
                              className='customone'
                            >
                              {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                              <Dropdown.Item eventKey='1'>Edit</Dropdown.Item>
                              {/* {eachItem.objectState === 0 && <Dropdown.Item eventKey="1">Activate</Dropdown.Item>}
                                                                {eachItem.objectState === 1 && <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>} */}
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

      case platformConstants.GET_ALL_PAYROLLINFO_SUCCESS:
        let allFetchedData =
            fetchAllEmployeeInfoRequest.request_data.response.data,
          allData = fetchAllEmployeeInfoRequest.request_data;

        if (allFetchedData !== undefined) {
          if (allFetchedData.result.length >= 1) {
            return (
              <div>
                <div className='heading-with-cta '>
                  <div>
                    <input
                      type='checkbox'
                      name=''
                      onChange={(e) =>
                        this.setShowDeactivated(e, allFetchedData.result)
                      }
                      checked={this.state.ShowDeactivated}
                      id='showFullDetails'
                    />
                    <label htmlFor='showFullDetails'>Show Deactivated</label>
                  </div>
                  {allData.response2 && (
                    <Button
                      onClick={this.handleShowNewRecord}
                      className='no-margins'
                      variant='primary'
                      type='submit'
                    >
                      Create New
                    </Button>
                  )}
                </div>
                <div className='table-helper mb-10'>
                  {/* <input type="checkbox" name=""
                                        onChange={(e) => this.setShowDeactivated(e, allFetchedData.result)}

                                        checked={this.state.ShowDeactivated}
                                        id="showFullDetails" />
                                    <label htmlFor="showFullDetails">Show Deactivated</label> */}
                </div>
                <div className='heading-with-cta'>
                  <Form
                    className='one-liner'
                    onSubmit={(e) =>
                      this.searchAllData(e, allFetchedData.result)
                    }
                  >
                    <Form.Group
                      controlId='filterDropdown'
                      className='no-margins pr-10'
                    >
                      <Form.Control as='select' size='sm'>
                        <option>No Filter</option>
                        <option>Add New Filter</option>
                        <option>Custom Filter</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group className='table-filters'>
                      <DatePicker
                        autoComplete='new-off'
                        onChangeRaw={this.handleDateChangeRaw}
                        onChange={this.handleStartDatePicker}
                        selected={this.state.startDate}
                        dateFormat={window.dateformat}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode='select'
                        placeholderText='Start date'
                        autoComplete='new-password'
                        maxDate={new Date()}
                        // className="form-control form-control-sm h-38px"
                        className='form-control form-control-sm '
                        customInput={
                          <DatePickerFieldType placeHolder='Start date' />
                        }
                      />
                      <DatePicker
                        autoComplete='new-off'
                        placeholderText='End  date'
                        onChangeRaw={this.handleDateChangeRaw}
                        onChange={this.handleEndDatePicker}
                        selected={this.state.endDate}
                        dateFormat={window.dateformat}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode='select'
                        maxDate={new Date()}
                        // className="form-control form-control-sm h-38px"
                        className='form-control form-control-sm'
                        customInput={
                          <DatePickerFieldType placeHolder='End date' />
                        }
                      />
                      <input
                        type='text'
                        className='form-control-sm search-table form-control'
                        placeholder='Search text'
                        value={this.state.SearchText}
                        onChange={(e) => {
                          this.setState({ SearchText: e.target.value.trim() });
                        }}
                      />
                      {/* {errors.startDate && touched.startDate ? (
    <span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
                    </Form.Group>

                    <Button
                      className='no-margins'
                      variant='primary'
                      type='submit'
                    >
                      Filter
                    </Button>
                    <div className='actions-wrap'>
                      <Button
                        onClick={this.exportClients}
                        className='action-icon'
                        variant='outline-secondary'
                        type='button'
                      >
                        <img
                          alt='download excel'
                          src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg=='
                          width='16'
                          height='16'
                        />
                      </Button>
                    </div>
                  </Form>

                  <div className='pagination-wrap'>
                    <label htmlFor='toshow'>Show</label>
                    <select
                      id='toshow'
                      onChange={(e) =>
                        this.setPagesize(e, allFetchedData.result)
                      }
                      value={this.state.PageSize}
                      className='countdropdown form-control form-control-sm'
                    >
                      <option value='10'>10</option>
                      <option value='25'>25</option>
                      <option value='50'>50</option>
                      <option value='200'>200</option>
                    </select>
                    <TablePagination
                      totalPages={allFetchedData.totalPages}
                      currPage={allFetchedData.currentPage}
                      currRecordsCount={allFetchedData.result.length}
                      totalRows={allFetchedData.totalRows}
                      tempData={allFetchedData.result}
                      pagesCountToshow={4}
                      refreshFunc={this.loadNextPage}
                    />
                  </div>
                </div>

                <TableComponent classnames='striped bordered hover'>
                  <thead>
                    <tr>
                      <th>Employee Full name</th>
                      <th>Employee number</th>
                      <th>Employment date</th>
                      <th>Department</th>
                      <th>Bank name</th>
                      <th>Account number</th>
                      <th>Date Created</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allFetchedData.result.map((eachItem, index) => {
                      return (
                        <Fragment key={index}>
                          <tr>
                            <td>
                              {eachItem.firstName} {eachItem.lastName}{' '}
                              {eachItem.middleName}
                            </td>
                            <td>{eachItem.employeeNumber}</td>
                            <td>{getDateFromISO(eachItem.employmentDate)}</td>
                            <td>{eachItem.department}</td>
                            <td>{eachItem.bankName}</td>
                            <td>{eachItem.accountNumber}</td>
                            <td>{getDateFromISO(eachItem.dateCreated)}</td>
                            <td>
                              <DropdownButton
                                size='sm'
                                title='Actions'
                                key='activeCurrency'
                                className='customone'
                              >
                                <Dropdown.Item
                                  eventKey='1'
                                  onClick={() =>
                                    this.handleEditRecordShow(eachItem, 'edit')
                                  }
                                >
                                  Edit
                                </Dropdown.Item>
                                {/* <Dropdown.Item eventKey="1">Edit</Dropdown.Item> */}
                                {/* {eachItem.objectState === 0 && <Dropdown.Item eventKey="1">Activate</Dropdown.Item>}
                                                                {eachItem.objectState === 1 && <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>} */}
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
              <div className='no-records'>
                <div className='heading-with-cta'>
                  <Form
                    className='one-liner'
                    onSubmit={(e) =>
                      this.searchAllData(e, allFetchedData.result)
                    }
                  >
                    <Form.Group
                      controlId='filterDropdown'
                      className='no-margins pr-10'
                    >
                      <Form.Control as='select' size='sm'>
                        <option>No Filter</option>
                        <option>Add New Filter</option>
                        <option>Custom Filter</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group className='table-filters'>
                      <DatePicker
                        autoComplete='new-off'
                        onChangeRaw={this.handleDateChangeRaw}
                        onChange={this.handleStartDatePicker}
                        selected={this.state.startDate}
                        dateFormat={window.dateformat}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode='select'
                        placeholderText='Start date'
                        autoComplete='new-password'
                        maxDate={new Date()}
                        // className="form-control form-control-sm h-38px"
                        className='form-control form-control-sm '
                        customInput={
                          <DatePickerFieldType placeHolder='Start date' />
                        }
                      />
                      <DatePicker
                        autoComplete='new-off'
                        placeholderText='End  date'
                        onChangeRaw={this.handleDateChangeRaw}
                        onChange={this.handleEndDatePicker}
                        selected={this.state.endDate}
                        dateFormat={window.dateformat}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode='select'
                        maxDate={new Date()}
                        // className="form-control form-control-sm h-38px"
                        className='form-control form-control-sm'
                        customInput={
                          <DatePickerFieldType placeHolder='End date' />
                        }
                      />
                      <input
                        type='text'
                        className='form-control-sm search-table form-control'
                        placeholder='Search text'
                        value={this.state.SearchText}
                        onChange={(e) => {
                          this.setState({ SearchText: e.target.value.trim() });
                        }}
                      />
                      {/* {errors.startDate && touched.startDate ? (
<span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
                    </Form.Group>

                    <Button
                      className='no-margins'
                      variant='primary'
                      type='submit'
                    >
                      Filter
                    </Button>
                    <div className='actions-wrap'>
                      <Button
                        onClick={this.exportData}
                        className='action-icon'
                        variant='outline-secondary'
                        type='button'
                      >
                        <img
                          alt='download excel'
                          src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg=='
                          width='16'
                          height='16'
                        />
                      </Button>
                    </div>
                  </Form>

                  <div className='pagination-wrap'>
                    <label htmlFor='toshow'>Show</label>
                    <select
                      id='toshow'
                      className='countdropdown form-control form-control-sm'
                    >
                      <option value='10'>10</option>
                      <option value='25'>25</option>
                      <option value='50'>50</option>
                      <option value='200'>200</option>
                    </select>
                  </div>
                </div>
                <div className='table-helper mb-10 text-left'>
                  <div>
                    <input
                      type='checkbox'
                      name=''
                      onChange={(e) =>
                        this.setShowDeactivated(e, allFetchedData.result)
                      }
                      checked={this.state.ShowDeactivated}
                      id='showFullDetails'
                    />
                    <label htmlFor='showFullDetails'>Show Deactivated</label>
                  </div>
                </div>
                <TableComponent classnames='striped bordered hover'>
                  <thead>
                    <tr>
                      <th>Employee Full name</th>
                      <th>Employee number</th>
                      <th>Employment date</th>
                      <th>Department</th>
                      <th>Bank name</th>
                      <th>Account number</th>
                      <th>Date Created</th>
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
                      <td></td>
                    </tr>
                  </tbody>
                </TableComponent>

                {allData.response2 && (
                  <div className='footer-with-cta toleft'>
                    <Button
                      onClick={this.handleShowNewRecord}
                      className='no-margins'
                      variant='primary'
                      type='submit'
                    >
                      Create New
                    </Button>
                  </div>
                )}
              </div>
            );
          }
        } else {
          return null;
        }

      case platformConstants.GET_ALL_PAYROLLINFO_FAILURE:
        return (
          <div className='loading-content errormsg'>
            <div>{fetchAllEmployeeInfoRequest.request_data.error}</div>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    let { recordToUpdate, showCreateNewRecord, showEditRecord } = this.state;
    return (
      <Fragment>
        <InnerPageContainer {...this.props}>
          {showCreateNewRecord && this.createNewRecordPopUp()}
          {recordToUpdate && showEditRecord && this.updateRecordPopUp()}
          <div className='content-wrapper'>
            <div className='module-heading'>
              <div className='module-title'>
                <div className='content-container'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className=''>
                        <h2>Employee Payroll</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='module-submenu'>
                <div className='content-container'>
                  <ul className='nav'>
                    <li>
                      <NavLink
                        to={'/platform/company-info'}
                        activeClassName='activeNavLink'
                      >
                        Company Information
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        exact
                        to={'/platform/customer-whitelist'}
                        activeClassName='activeNavLink'
                      >
                        Customer Whitelist
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={'/platform/payroll-info'}
                        activeClassName='activeNavLink'
                      >
                        Payroll Information
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={'/platform/bank-info'}
                        activeClassName='activeNavLink'
                      >
                        Bank Information
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className='module-content'>
                <div className='content-container'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='middle-content'>
                        {this.renderContentWrap()}
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
    fetchAllEmployeeInfo: state.platformReducers.fetchAllEmployeeInfo,
    fetchSingleEmployeeInfo: state.platformReducers.fetchSingleEmployeeInfo,
    createEmployeeInfo: state.platformReducers.createEmployeeInfo,
    updateEmployeeInfo: state.platformReducers.updateEmployeeInfo,

    fetchAllChannelServicesReducer:
      state.administrationReducers.fetchAllChannelServices,

    createAChannelServices: state.administrationReducers.createAChannelServices,
    updateAChannelServices: state.administrationReducers.updateAChannelServices,
  };
}

export default connect(mapStateToProps)(ManageEmployeeInfo);
