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

import AsyncSelect from 'react-select/async';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  numberWithCommas,
  getDateFromISO,
  allowNumbersOnly,
} from '../../shared/utils';
import { platformActions } from '../../redux/actions/platform/platform.action';
import { platformConstants } from '../../redux/actiontypes/platform/platform.constants';

import { dashboardActions } from '../../redux/actions/dashboard/dashboard.action';
import { dashboardConstants } from '../../redux/actiontypes/dashboard/dashboard.constants';
import Alert from 'react-bootstrap/Alert';
import DatePickerFieldType from '../../_helpers/DatePickerFieldType';
// import "./clients.scss";

class ManageCustomerWhitelist extends React.Component {
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
    this.userPermissions = JSON.parse(localStorage.getItem('x-u-perm'));
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = () => {
    let { PageSize, CurrentPage, ShowDeactivated } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&ShowDeactivated=${ShowDeactivated}`;

    this.fetchAllCreditScoreByPass(params);
  };

  fetchAllCreditScoreByPass = (paramters) => {
    const { dispatch } = this.props;

    dispatch(platformActions.fetchAllCreditScoreByPass(paramters));
    dispatch(dashboardActions.searchForCustomer('CLEAR'));
  };

  clearAllData = () => {
    this.props.dispatch(platformActions.createCreditScoreByPass('CLEAR'));
    this.props.dispatch(platformActions.updateCreditScoreByPass('CLEAR'));
  };

  setPagesize = (PageSize, tempData) => {
    const { dispatch } = this.props;
    let sizeOfPage = PageSize.target.value,
      { CurrentPage, CurrentSelectedPage, ShowDeactivated } = this.state;

    this.setState({ PageSize: sizeOfPage });

    let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&ShowDeactivated=${ShowDeactivated}`;
    // this.fetchAllCreditScoreByPass(params);

    if (tempData) {
      dispatch(platformActions.fetchAllCreditScoreByPass(params, tempData));
    } else {
      dispatch(platformActions.fetchAllCreditScoreByPass(params));
    }
  };

  setShowDeactivated = (ShowDeactivated, tempData) => {
    const { dispatch } = this.props;

    let showNonActive = ShowDeactivated.target.checked,
      { CurrentPage, CurrentSelectedPage, PageSize } = this.state;

    this.setState({ ShowDeactivated: showNonActive });

    let params = `ShowDeactivated=${showNonActive}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;

    if (tempData) {
      dispatch(platformActions.fetchAllCreditScoreByPass(params, tempData));
    } else {
      dispatch(platformActions.fetchAllCreditScoreByPass(params));
    }
  };

  loadSearchResults = (inputValue, callback) => {
    return this.getSearchedCustomerResults(inputValue).then(() => {
      if (
        this.props.searchForCustomerReducer.request_status ===
        dashboardConstants.SEARCH_FOR_CUSTOMER_SUCCESS
      ) {
        let searchResults = this.props.searchForCustomerReducer.request_data
          .response.data;
        this.setState({ defaultOptions: searchResults });
        return searchResults;
      }
    });
  };

  getSearchedCustomerResults = async (inputValue) => {
    const { dispatch } = this.props;

    if (!inputValue || inputValue.length === 0) {
      return null;
    }

    await dispatch(dashboardActions.searchForCustomer(inputValue));
  };

  loadNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;
    let { PageSize } = this.state;

    // this.setState({PageSize: sizeOfPage});

    let params = `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
    // this.getTransactionChannels(params);

    if (tempData) {
      dispatch(platformActions.fetchAllCreditScoreByPass(params, tempData));
    } else {
      dispatch(platformActions.fetchAllCreditScoreByPass(params));
    }
  };

  handleCloseNewRecord = () => {
    if (
      this.props.createCreditScoreByPassReducer.is_request_processing === false
    ) {
      this.setState({ showCreateNewRecord: false });
      this.props.dispatch(dashboardActions.searchForCustomer('CLEAR'));
    }
  };

  handleShowNewRecord = () => {
    this.clearAllData();
    this.setState({ showCreateNewRecord: true });
  };

  handleEditRecordClose = () => {
    if (
      this.props.updateCreditScoreByPassReducer.is_request_processing === false
    ) {
      this.setState({ showEditRecord: false });
    }
  };

  handleEditRecordShow = (recordToUpdate, updateType) => {
    this.clearAllData();
    this.setState({ updateType, recordToUpdate, showEditRecord: true });
  };

  //Search Customer
  handleSearchCustomerChange = (inputValue) => {
    const customerSearchText = inputValue.replace(/\W/g, '');

    this.setState({ customerSearchText });
  };

  handleSelectedCustomer = (inputValue) => {
    this.setState({ selectedCustomer: inputValue });
  };

  searchTxtn = (e, tempData) => {
    e.preventDefault();
    const { dispatch } = this.props;
    let { PageSize, CurrentPage, SearchText, endDate, startDate } = this.state;

    // this.setState({PageSize: sizeOfPage});

    // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
    // this.getTransactionChannels(params);
    if (SearchText !== '' || endDate !== '' || startDate !== '') {
      if (endDate !== '') {
        endDate = endDate.toISOString();
      }
      if (startDate !== '') {
        startDate = startDate.toISOString();
      }
      let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;

      if (tempData) {
        dispatch(platformActions.fetchAllCreditScoreByPass(params, tempData));
      } else {
        dispatch(platformActions.fetchAllCreditScoreByPass(params));
      }
    }
  };

  exportRecord = () => {
    let { PageSize, CurrentPage, SearchText, endDate, startDate } = this.state;

    if (endDate !== '') {
      endDate = endDate.toISOString();
    }
    if (startDate !== '') {
      startDate = startDate.toISOString();
    }
    let paramters = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;

    const { dispatch } = this.props;

    // dispatch(platformActions.exportClients(paramters));
  };

  handleDateChangeRaw = (e) => {
    e.preventDefault();
  };
  handleStartDatePicker = (startDate) => {
    startDate.setHours(startDate.getHours() + 1);

    this.setState({ startDate }, () => {
      if (this.state.endDate !== '') {
        //this.getHistory();
      }
    });
  };

  handleEndDatePicker = (endDate) => {
    endDate.setHours(endDate.getHours() + 1);

    this.setState({ endDate }, () => {
      if (this.state.startDate !== '') {
        //this.getHistory();
      }
    });
  };

  createNewRecord = async (payload) => {
    const { dispatch } = this.props;

    await dispatch(platformActions.createCreditScoreByPass(payload));
  };
  updateARecord = async (payload, bypasstype) => {
    const { dispatch } = this.props;

    await dispatch(
      platformActions.updateCreditScoreByPass(payload, bypasstype)
    );
  };

  updateRecordPopUp = (updateType) => {
    let {
      showEditRecord,
      recordToUpdate,
      selectedCustomer,
      defaultOptions,
    } = this.state;
    let updateCreditScoreByPassRequest = this.props
      .updateCreditScoreByPassReducer;

    // let getAllCurrencies =  this.props.adminGetAllCurrencies;

    let checkValidationSchema = Yup.object().shape({
      creditScore: Yup.string().required('Required'),
      loanCreditScoreByPassStatus: Yup.string().required('Required'),
      amount: Yup.string().required('Required'),
      bvn: Yup.string().required('Required'),
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
          {/* {this.state.updateType === "edit" && <Modal.Title>Edit Customer Information</Modal.Title>} */}
          {this.state.updateType === 'whitelist' && (
            <Modal.Title>Confirm Whitelisting</Modal.Title>
          )}
          {this.state.updateType === 'blacklist' && (
            <Modal.Title>Confirm Blacklisting</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={
              {
                // amount: recordToUpdate.amount.toString(),
                // clientEncodedKey: recordToUpdate.clientEncodedKey,
                // creditScore: recordToUpdate.creditScore.toString(),
                // loanCreditScoreByPassStatus: recordToUpdate.loanCreditScoreByPassStatus,
                // bvn: recordToUpdate.bvn,
              }
            }
            // validationSchema={checkValidationSchema}
            onSubmit={(values, { resetForm }) => {
              // same shape as initial values

              let requestPayload;
              // if (this.state.updateType === "edit") {

              //     requestPayload = {
              //         amount: parseFloat(values.amount.replace(/,/g, '')),
              //         clientEncodedKey: recordToUpdate.clientEncodedKey,
              //         creditScore: parseFloat(values.creditScore.replace(/,/g, '')),
              //         loanCreditScoreByPassStatus: values.loanCreditScoreByPassStatus,
              //         bvn: values.bvn,
              //         // objectState: recordToUpdate.objectState
              //     };
              // }

              if (this.state.updateType === 'whitelist') {
                requestPayload = {
                  encodedKey: recordToUpdate.encodedKey,
                };
                // requestPayload = {
                //     amount: recordToUpdate.amount,
                //     clientEncodedKey: recordToUpdate.clientEncodedKey,
                //     creditScore: recordToUpdate.creditScore,
                //     loanCreditScoreByPassStatus: 0,
                //     bvn: recordToUpdate.bvn,
                //     // objectState: 0
                // };
              }

              if (this.state.updateType === 'blacklist') {
                requestPayload = {
                  encodedKey: recordToUpdate.encodedKey,
                };
                // requestPayload = {
                //     amount: recordToUpdate.amount,
                //     clientEncodedKey: recordToUpdate.clientEncodedKey,
                //     creditScore: recordToUpdate.creditScore,
                //     loanCreditScoreByPassStatus: 1,
                //     bvn: recordToUpdate.bvn,
                //     // objectState: 1
                // };
              }

              this.updateARecord(requestPayload, this.state.updateType)
                // this.updateARecord(requestPayload, recordToUpdate.encodedKey)
                .then(() => {
                  if (
                    this.props.updateCreditScoreByPassReducer.request_status ===
                    platformConstants.UPDATE_CREDIT_SCORE_BYPASS_SUCCESS
                  ) {
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
              // console.log("data is",values, errors);
              return (
                <Form noValidate onSubmit={handleSubmit}>
                  {updateCreditScoreByPassRequest.request_status !==
                    platformConstants.UPDATE_CREDIT_SCORE_BYPASS_SUCCESS && (
                    <div>
                      {this.state.updateType === 'whitelist' && (
                        <div className='confirmation-msg text-center'>
                          Please confirm you want to proceed with whitelisting
                        </div>
                      )}
                      {this.state.updateType === 'blacklist' && (
                        <div className='confirmation-msg text-center'>
                          Please confirm you want to proceed with blacklisting
                        </div>
                      )}
                    </div>
                  )}

                  {/* <Form.Row>

                                        <Col>
                                            <Form.Label className="block-level">Customer</Form.Label>
                                            <AsyncSelect
                                                cacheOptions
                                                value={selectedCustomer}
                                                getOptionLabel={e => e.clientName}
                                                getOptionValue={e => e.clientEncodedKey}
                                                loadOptions={this.loadSearchResults}
                                                defaultOptions={defaultOptions}
                                                name="clientEncodedKey"
                                                isDisabled={this.state.updateType !== "edit"}
                                                className={errors.clientEncodedKey && touched.clientEncodedKey ? "is-invalid" : null}
                                                // onChange={(e)=> {
                                                //     setFieldValue("clientEncodedKey", )
                                                //     this.handleSelectedCustomer(e.target.value)

                                                // }}
                                                onChange={this.handleSelectedCustomer}
                                                // onChange={(selectedCustomer) => {
                                                //     this.setState({ selectedCustomer });
                                                //     errors.clientEncodedKey = null
                                                //     values.clientEncodedKey = selectedCustomer.value
                                                //     setFieldValue('clientEncodedKey', selectedCustomer.value);
                                                // }}
                                                onInputChange={this.handleSearchCustomerChange}
                                            />

                                            {errors.clientEncodedKey && touched.clientEncodedKey ? (
                                                <span className="invalid-feedback">{errors.clientEncodedKey}</span>
                                            ) : null}
                                        </Col>

                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">Biometric ID</Form.Label>
                                            <Form.Control type="text"
                                                onChange={(e) => {
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("bvn", recordToUpdate.bvn)
                                                    } else {
                                                        setFieldValue("bvn", e.target.value)
                                                    }

                                                }}
                                                disabled={this.state.updateType !== "edit"}
                                                value={allowNumbersOnly(values.bvn, 11)}
                                                className={errors.bvn && touched.bvn ? "is-invalid h-38px" : "h-38px"}
                                                name="bvn"
                                                required/>

                                            {errors.bvn && touched.bvn ? (
                                                <span className="invalid-feedback">{errors.bvn}</span>
                                            ) : null}
                                        </Col>
                                        </Form.Row>
                                        <Form.Row>

                                        <Col>
                                            <Form.Label className="block-level">Amount ()</Form.Label>
                                            <Form.Control type="text"
                                                onChange={(e) => {
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("amount", recordToUpdate.amount)
                                                    } else {
                                                        setFieldValue("amount", e.target.value)
                                                    }

                                                }}
                                                disabled={this.state.updateType !== "edit"}
                                                value={numberWithCommas(values.amount)}
                                                className={errors.amount && touched.amount ? "is-invalid h-38px" : "h-38px"}
                                                name="amount"
                                                required />

                                            {errors.amount && touched.amount ? (
                                                <span className="invalid-feedback">{errors.amount}</span>
                                            ) : null}
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">Credit Score</Form.Label>
                                            <Form.Control type="text"
                                                onChange={(e) => {
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("creditScore", recordToUpdate.creditScore)
                                                    } else {
                                                        setFieldValue("creditScore", e.target.value)
                                                    }

                                                }}
                                                disabled={this.state.updateType !== "edit"}
                                                value={numberWithCommas(values.creditScore)}
                                                className={errors.creditScore && touched.creditScore ? "is-invalid h-38px" : "h-38px"}
                                                name="creditScore"
                                                required/>

                                            {errors.creditScore && touched.creditScore ? (
                                                <span className="invalid-feedback">{errors.creditScore}</span>
                                            ) : null}
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">Status</Form.Label>
                                            <select id="toshow"
                                                name="loanCreditScoreByPassStatus"
                                                onChange={(e) => {
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("loanCreditScoreByPassStatus", recordToUpdate.loanCreditScoreByPassStatus)
                                                    } else {
                                                        setFieldValue("loanCreditScoreByPassStatus", e.target.value)
                                                    }

                                                }}
                                                disabled={this.state.updateType !== "edit"}
                                                value={values.loanCreditScoreByPassStatus}
                                                className={errors.creditScore && touched.creditScore ? "form-control form-control-sm is-invalid h-38px" : "form-control form-control-sm h-38px"}
                                            >
                                                <option value="">Select</option>
                                                <option value="1">Active</option>
                                                <option value="2">Inactive</option>
                                            </select>

                                            {errors.loanCreditScoreByPassStatus && touched.loanCreditScoreByPassStatus ? (
                                                <span className="invalid-feedback">{errors.loanCreditScoreByPassStatus}</span>
                                            ) : null}
                                        </Col>



                                    </Form.Row> */}

                  {updateCreditScoreByPassRequest.request_status !==
                    platformConstants.UPDATE_CREDIT_SCORE_BYPASS_SUCCESS && (
                    <div className='footer-with-cta centered'>
                      <Button
                        disabled={
                          updateCreditScoreByPassRequest.is_request_processing
                        }
                        variant='secondary'
                        className='grayed-out'
                        onClick={this.handleEditRecordClose}
                      >
                        Cancel
                      </Button>
                      <Button
                        type='submit'
                        disabled={
                          updateCreditScoreByPassRequest.is_request_processing
                        }
                      >
                        {updateCreditScoreByPassRequest.is_request_processing &&
                          'Please wait...'}
                        {!updateCreditScoreByPassRequest.is_request_processing &&
                          this.state.updateType === 'edit' &&
                          'Update'}
                        {!updateCreditScoreByPassRequest.is_request_processing &&
                          this.state.updateType === 'whitelist' &&
                          'Whitelist'}
                        {!updateCreditScoreByPassRequest.is_request_processing &&
                          this.state.updateType === 'blacklist' &&
                          'Blacklist'}
                      </Button>
                    </div>
                  )}
                </Form>
              );
            }}
          </Formik>
          {updateCreditScoreByPassRequest.request_status ===
            platformConstants.UPDATE_CREDIT_SCORE_BYPASS_SUCCESS && (
            <Alert variant='success'>
              {
                updateCreditScoreByPassRequest.request_data.response.data
                  .message
              }
            </Alert>
          )}
          {updateCreditScoreByPassRequest.request_status ===
            platformConstants.UPDATE_CREDIT_SCORE_BYPASS_FAILURE && (
            <Alert variant='danger'>
              {updateCreditScoreByPassRequest.request_data.error}
            </Alert>
          )}
        </Modal.Body>
      </Modal>
    );
  };

  createNewRecordPopUp = () => {
    let { showCreateNewRecord, selectedCustomer, defaultOptions } = this.state;
    let createCreditScoreByPassRequest = this.props
      .createCreditScoreByPassReducer;

    // let getAllCurrencies =  this.props.adminGetAllCurrencies;

    let checkValidationSchema = Yup.object().shape({
      creditScore: Yup.string().required('Required'),
      loanCreditScoreByPassStatus: Yup.string().required('Required'),
      amount: Yup.string().required('Required'),
      whitelistOption: Yup.string().required('Required'),
      bvn: Yup.string().when('whitelistOption', {
        is: (value) => value === 'bvn',
        then: Yup.string().required('Required'),
      }),
      clientEncodedKey: Yup.string().when('whitelistOption', {
        is: (value) => value === 'customer',
        then: Yup.string(),
        // .required('Required')
      }),
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
          <Modal.Title>Add New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              amount: '',
              clientEncodedKey: '',
              creditScore: '',
              loanCreditScoreByPassStatus: '',
              bvn: '',
              whitelistOption: '',
            }}
            validationSchema={checkValidationSchema}
            onSubmit={(values, { resetForm }) => {
              // same shape as initial values

              let requestPayload = {};
              if (values.whitelistOption === 'customer') {
                requestPayload = {
                  amount: parseFloat(values.amount.replace(/,/g, '')),
                  clientEncodedKey: selectedCustomer.clientEncodedKey,
                  byPassType: 1,
                  creditScore: parseFloat(values.creditScore.replace(/,/g, '')),
                  loanCreditScoreByPassStatus: parseInt(
                    values.loanCreditScoreByPassStatus
                  ),
                  bvn: null,
                };
              }
              if (values.whitelistOption === 'bvn') {
                requestPayload = {
                  amount: parseFloat(values.amount.replace(/,/g, '')),
                  clientEncodedKey: null,
                  byPassType: 0,
                  creditScore: parseFloat(values.creditScore.replace(/,/g, '')),
                  loanCreditScoreByPassStatus: parseInt(
                    values.loanCreditScoreByPassStatus
                  ),
                  bvn: values.bvn,
                };
              }

              this.createNewRecord(requestPayload).then(() => {
                if (
                  this.props.createCreditScoreByPassReducer.request_status ===
                  platformConstants.CREATE_CREDIT_SCORE_BYPASS_SUCCESS
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
              // console.log("data is",values, errors);
              return (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Row>
                    <Col>
                      <Form.Label className='block-level'>
                        Whitelist Option
                      </Form.Label>
                      <select
                        id='toshow'
                        onChange={handleChange}
                        value={values.whitelistOption}
                        name='whitelistOption'
                        className={
                          errors.whitelistOption && touched.whitelistOption
                            ? 'is-invalid form-control'
                            : 'form-control'
                        }
                      >
                        <option value=''>Select</option>
                        <option value='bvn'>BVN</option>
                        <option value='customer'>Customer</option>
                      </select>
                      {errors.whitelistOption && touched.whitelistOption ? (
                        <span className='invalid-feedback'>
                          {errors.whitelistOption}
                        </span>
                      ) : null}
                    </Col>
                  </Form.Row>
                  {values.whitelistOption === 'customer' && (
                    <Form.Row>
                      <Col>
                        <Form.Label className='block-level'>
                          Customer
                        </Form.Label>
                        <AsyncSelect
                          cacheOptions
                          value={selectedCustomer}
                          getOptionLabel={(e) => e.clientName}
                          getOptionValue={(e) => e.clientEncodedKey}
                          loadOptions={this.loadSearchResults}
                          defaultOptions={defaultOptions}
                          name='clientEncodedKey'
                          placeholder='Search'
                          className={
                            errors.clientEncodedKey && touched.clientEncodedKey
                              ? 'is-invalid'
                              : null
                          }
                          // onChange={(e)=> {
                          //     setFieldValue("clientEncodedKey", )
                          //     this.handleSelectedCustomer(e.target.value)

                          // }}
                          onChange={this.handleSelectedCustomer}
                          // onChange={(selectedCustomer) => {
                          //     this.setState({ selectedCustomer });
                          //     errors.clientEncodedKey = null
                          //     values.clientEncodedKey = selectedCustomer.value
                          //     setFieldValue('clientEncodedKey', selectedCustomer.value);
                          // }}
                          onInputChange={this.handleSearchCustomerChange}
                        />

                        {errors.clientEncodedKey && touched.clientEncodedKey ? (
                          <span className='invalid-feedback'>
                            {errors.clientEncodedKey}
                          </span>
                        ) : null}
                      </Col>
                    </Form.Row>
                  )}
                  {values.whitelistOption === 'bvn' && (
                    <Form.Row>
                      <Col>
                        <Form.Label className='block-level'>BVN</Form.Label>
                        <Form.Control
                          type='text'
                          onChange={handleChange}
                          value={allowNumbersOnly(values.bvn, 11)}
                          className={
                            errors.bvn && touched.bvn
                              ? 'is-invalid h-38px'
                              : 'h-38px'
                          }
                          name='bvn'
                          required
                        />

                        {errors.bvn && touched.bvn ? (
                          <span className='invalid-feedback'>{errors.bvn}</span>
                        ) : null}
                      </Col>
                    </Form.Row>
                  )}
                  <Form.Row>
                    <Col>
                      <Form.Label className='block-level'>Status</Form.Label>
                      <select
                        id='toshow'
                        name='loanCreditScoreByPassStatus'
                        onChange={handleChange}
                        value={values.loanCreditScoreByPassStatus}
                        className={
                          errors.loanCreditScoreByPassStatus &&
                          touched.loanCreditScoreByPassStatus
                            ? 'form-control form-control-sm is-invalid h-38px'
                            : 'form-control form-control-sm h-38px'
                        }
                      >
                        <option value=''>Select</option>
                        <option value='1'>Whitelist</option>
                        <option value='2'>Blacklist</option>
                      </select>

                      {errors.loanCreditScoreByPassStatus &&
                      touched.loanCreditScoreByPassStatus ? (
                        <span className='invalid-feedback'>
                          {errors.loanCreditScoreByPassStatus}
                        </span>
                      ) : null}
                    </Col>
                  </Form.Row>
                  {values.loanCreditScoreByPassStatus === '1' &&
                    values.whitelistOption !== '' && (
                      <Form.Row>
                        <Col>
                          <Form.Label className='block-level'>
                            Amount ()
                          </Form.Label>
                          <Form.Control
                            type='text'
                            onChange={handleChange}
                            value={numberWithCommas(values.amount)}
                            className={
                              errors.amount && touched.amount
                                ? 'is-invalid h-38px'
                                : 'h-38px'
                            }
                            name='amount'
                            required
                          />

                          {errors.amount && touched.amount ? (
                            <span className='invalid-feedback'>
                              {errors.amount}
                            </span>
                          ) : null}
                        </Col>
                      </Form.Row>
                    )}
                  {values.loanCreditScoreByPassStatus === '1' &&
                    values.whitelistOption !== '' && (
                      <Form.Row>
                        <Col>
                          <Form.Label className='block-level'>
                            Credit Score
                          </Form.Label>
                          <Form.Control
                            type='text'
                            onChange={handleChange}
                            value={numberWithCommas(values.creditScore)}
                            className={
                              errors.creditScore && touched.creditScore
                                ? 'is-invalid h-38px'
                                : 'h-38px'
                            }
                            name='creditScore'
                            required
                          />

                          {errors.creditScore && touched.creditScore ? (
                            <span className='invalid-feedback'>
                              {errors.creditScore}
                            </span>
                          ) : null}
                        </Col>
                      </Form.Row>
                    )}

                  <div className='footer-with-cta toleft'>
                    <Button
                      disabled={
                        createCreditScoreByPassRequest.is_request_processing
                      }
                      variant='secondary'
                      className='grayed-out'
                      onClick={this.handleCloseNewRecord}
                    >
                      Cancel
                    </Button>
                    <Button
                      type='submit'
                      disabled={
                        createCreditScoreByPassRequest.is_request_processing
                      }
                    >
                      {createCreditScoreByPassRequest.is_request_processing
                        ? 'Please wait...'
                        : 'Create'}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          {createCreditScoreByPassRequest.request_status ===
            platformConstants.CREATE_CREDIT_SCORE_BYPASS_SUCCESS && (
            <Alert variant='success'>
              {
                createCreditScoreByPassRequest.request_data.response.data
                  .message
              }
            </Alert>
          )}
          {createCreditScoreByPassRequest.request_status ===
            platformConstants.CREATE_CREDIT_SCORE_BYPASS_FAILURE && (
            <Alert variant='danger'>
              {createCreditScoreByPassRequest.request_data.error}
            </Alert>
          )}
        </Modal.Body>
      </Modal>
    );
  };

  renderContentWrap = () => {
    let fetchAllCreditScoreByPassRequest = this.props
      .fetchAllCreditScoreByPassReducer;

    let saveRequestData =
      fetchAllCreditScoreByPassRequest.request_data !== undefined
        ? fetchAllCreditScoreByPassRequest.request_data.tempData
        : null;

    switch (fetchAllCreditScoreByPassRequest.request_status) {
      case platformConstants.FETCH_ALLCREDIT_SCORE_BYPASS_PENDING:
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
                    <th>Biometric ID</th>
                    <th>Amount</th>
                    <th>Customer name</th>
                    <th>Status</th>
                    <th>Credit Score</th>
                    <th>Whitelisted by</th>
                    <th>Date Whitelisted</th>
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
                    <th>Biometric ID</th>
                    <th>Amount</th>
                    <th>Customer name</th>
                    <th>Status</th>
                    <th>Credit Score</th>
                    <th>Whitelisted by</th>
                    <th>Date Whitelisted</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {saveRequestData.map((eachItem, index) => {
                    return (
                      <Fragment key={index}>
                        <tr>
                          <td>{eachItem.bvn}</td>
                          <td>{numberWithCommas(eachItem.amount, true)}</td>
                          <td>{eachItem.clientEncodedKey}</td>
                          <td>
                            {eachItem.loanCreditScoreByPassStatusDescription}
                          </td>
                          <td>{eachItem.creditScore}</td>
                          <td>{eachItem.whitelistedByUserName}</td>
                          <td>{getDateFromISO(eachItem.dateWhitelisted)}</td>
                          <td>
                            <DropdownButton
                              size='sm'
                              title='Actions'
                              key='activeCurrency'
                              className='customone'
                            >
                              {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                              <Dropdown.Item eventKey='1'>Edit</Dropdown.Item>
                              {eachItem.loanCreditScoreByPassStatus === 0 && (
                                <Dropdown.Item eventKey='1'>
                                  Whitelist
                                </Dropdown.Item>
                              )}
                              {eachItem.loanCreditScoreByPassStatus === 1 && (
                                <Dropdown.Item eventKey='1'>
                                  Blacklist
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
        }

      case platformConstants.FETCH_ALLCREDIT_SCORE_BYPASS_SUCCESS:
        let allFetchedData =
          fetchAllCreditScoreByPassRequest.request_data.response.data;
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
                  <Button
                    onClick={this.handleShowNewRecord}
                    className='no-margins'
                    variant='primary'
                    type='submit'
                  >
                    Create New
                  </Button>
                </div>
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
                      <th>Biometric ID</th>
                      <th>Amount</th>
                      <th>Customer name</th>
                      <th>Status</th>
                      <th>Credit Score</th>
                      <th>Whitelisted by</th>
                      <th>Date Whitelisted</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allFetchedData.result.map((eachItem, index) => {
                      return (
                        <Fragment key={index}>
                          <tr>
                            <td>{eachItem.bvn}</td>
                            <td>{numberWithCommas(eachItem.amount, true)}</td>
                            <td>{eachItem.customerName}</td>
                            <td>
                              {eachItem.loanCreditScoreByPassStatusDescription}
                            </td>
                            <td>{eachItem.creditScore}</td>
                            <td>{eachItem.whitelistedByUserName}</td>
                            <td>{getDateFromISO(eachItem.dateWhitelisted)}</td>
                            <td>
                              <DropdownButton
                                size='sm'
                                title='Actions'
                                key='activeCurrency'
                                className='customone'
                              >
                                {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                                {/* <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                                                                        { eachItem.loanCreditScoreByPassStatus===0 &&  <Dropdown.Item eventKey="1">Activate</Dropdown.Item>}
                                                                        { eachItem.loanCreditScoreByPassStatus===1 &&  <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>} */}

                                {/* <Dropdown.Item eventKey="1" onClick={() => this.handleEditRecordShow(eachItem, "edit")}>Edit</Dropdown.Item> */}
                                {eachItem.loanCreditScoreByPassStatus === 2 && (
                                  <Dropdown.Item
                                    eventKey='1'
                                    onClick={() =>
                                      this.handleEditRecordShow(
                                        eachItem,
                                        'whitelist'
                                      )
                                    }
                                  >
                                    Whitelist
                                  </Dropdown.Item>
                                )}
                                {eachItem.loanCreditScoreByPassStatus === 1 && (
                                  <Dropdown.Item
                                    eventKey='1'
                                    onClick={() =>
                                      this.handleEditRecordShow(
                                        eachItem,
                                        'blacklist'
                                      )
                                    }
                                  >
                                    Blacklist
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
              <div className='no-records'>
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
                <div className='table-helper mb-10 text-left'>
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
                <TableComponent classnames='striped bordered hover'>
                  <thead>
                    <tr>
                      <th>Biometric ID</th>
                      <th>Amount</th>
                      <th>Customer name</th>
                      <th>Status</th>
                      <th>Credit Score</th>
                      <th>Whitelisted by</th>
                      <th>Date Whitelisted</th>
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
              </div>
            );
          }
        } else {
          return null;
        }

      case platformConstants.FETCH_ALLCREDIT_SCORE_BYPASS_FAILURE:
        return (
          <div className='loading-content errormsg'>
            <div>{fetchAllCreditScoreByPassRequest.request_data.error}</div>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    let { showEditRecord } = this.state;
    return (
      <Fragment>
        <InnerPageContainer {...this.props}>
          {showEditRecord && this.updateRecordPopUp()}
          {this.createNewRecordPopUp()}
          <div className='content-wrapper'>
            <div className='module-heading'>
              <div className='module-title'>
                <div className='content-container'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className=''>
                        <h2>Customer Whitelist</h2>
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
                    {/* <div className="col-sm-3">
                                            <AccountsSidebar/>
                                        </div> */}
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
    fetchAllCreditScoreByPassReducer:
      state.platformReducers.fetchAllCreditScoreByPassReducer,
    fetchSingleCreditScoreByPassReducer:
      state.platformReducers.fetchSingleCreditScoreByPassReducer,
    createCreditScoreByPassReducer:
      state.platformReducers.createCreditScoreByPassReducer,
    updateCreditScoreByPassReducer:
      state.platformReducers.updateCreditScoreByPassReducer,
    searchForCustomerReducer: state.dashboardReducers.searchForCustomerReducer,
  };
}

export default connect(mapStateToProps)(ManageCustomerWhitelist);
