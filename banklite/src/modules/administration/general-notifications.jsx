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
import AdminNav from './_menu';
// import GeneralNav from './menus/_general-menu'

// import DatePicker from '../../_helpers/datepickerfield'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getDateFromISO } from '../../shared/utils';
import GeneralNav from './menus/_general-menu';

import { administrationActions } from '../../redux/actions/administration/administration.action';
import { administrationConstants } from '../../redux/actiontypes/administration/administration.constants';
import Alert from 'react-bootstrap/Alert';

// import  SidebarElement from '../../shared/elements/sidebar'
import './administration.scss';
import DatePickerFieldType from '../../_helpers/DatePickerFieldType';
class Notifications extends React.Component {
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

    dispatch(administrationActions.fetchAllNotificationTemplate(paramters));
  };

  clearAllData = () => {
    this.props.dispatch(
      administrationActions.createANotificationTemplate('CLEAR')
    );
    this.props.dispatch(
      administrationActions.updateANotificationTemplate('CLEAR')
    );
  };

  setPagesize = (PageSize, tempData) => {
    const { dispatch } = this.props;
    let sizeOfPage = PageSize.target.value,
      { CurrentPage, CurrentSelectedPage, ShowDeactivated } = this.state;

    this.setState({ PageSize: sizeOfPage });

    let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&ShowDeactivated=${ShowDeactivated}`;
    // this.fetchAllRecords(params);

    if (tempData) {
      dispatch(
        administrationActions.fetchAllNotificationTemplate(params, tempData)
      );
    } else {
      dispatch(administrationActions.fetchAllNotificationTemplate(params));
    }
  };

  setShowDeactivated = (ShowDeactivated, tempData) => {
    const { dispatch } = this.props;

    let showNonActive = ShowDeactivated.target.checked,
      { CurrentPage, CurrentSelectedPage, PageSize } = this.state;

    this.setState({ ShowDeactivated: showNonActive });

    let params = `ShowDeactivated=${showNonActive}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;

    if (tempData) {
      dispatch(
        administrationActions.fetchAllNotificationTemplate(params, tempData)
      );
    } else {
      dispatch(administrationActions.fetchAllNotificationTemplate(params));
    }
  };

  loadNextPage = (nextPage, tempData) => {
    const { dispatch } = this.props;
    let { PageSize } = this.state;

    // this.setState({PageSize: sizeOfPage});

    let params = `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
    // this.getTransactionChannels(params);

    if (tempData) {
      dispatch(
        administrationActions.fetchAllNotificationTemplate(params, tempData)
      );
    } else {
      dispatch(administrationActions.fetchAllNotificationTemplate(params));
    }
  };

  handleCloseNewRecord = () => {
    if (
      this.props.createANotificationTemplate.is_request_processing === false
    ) {
      this.setState({ showCreateNewRecord: false });
    }
  };

  handleShowNewRecord = () => {
    this.clearAllData();
    this.setState({ showCreateNewRecord: true });
  };

  handleEditRecordClose = () => {
    if (
      this.props.updateANotificationTemplate.is_request_processing === false
    ) {
      this.setState({ showEditRecord: false });
    }
  };

  handleEditRecordShow = (recordToUpdate, updateType) => {
    this.clearAllData();
    this.setState({ updateType, recordToUpdate, showEditRecord: true });
  };

  createNewRecordPopUp = () => {
    let { showCreateNewRecord } = this.state;
    let createANotificationTemplateRequest = this.props
      .createANotificationTemplate;

    // let getAllCurrencies =  this.props.adminGetAllCurrencies;

    let checkValidationSchema = Yup.object().shape({
      name: Yup.string().required('Required'),
      key: Yup.string().required('Required'),
      communicationType: Yup.string().required('Required'),
      messageTemplate: Yup.string().required('Required'),
      notificationTemplatesSource: Yup.string().required('Required'),
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
          <Modal.Title>Add new template</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: '',
              key: '',
              communicationType: '',
              messageTemplate: '',
              notificationTemplatesSource: '',
            }}
            validationSchema={checkValidationSchema}
            onSubmit={(values, { resetForm }) => {
              // same shape as initial values

              let requestPayload = {
                name: values.name,
                key: values.key,
                communicationType: parseInt(values.communicationType),
                messageTemplate: values.messageTemplate,
                notificationTemplatesSource: values.notificationTemplatesSource,
              };

              this.createNewRecord(requestPayload).then(() => {
                if (
                  this.props.createANotificationTemplate.request_status ===
                  administrationConstants.ADD_A_NOTIFICATION_TEMPLATE_SUCCESS
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
                        Template name
                      </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={handleChange}
                        value={values.name}
                        className={
                          errors.name && touched.name
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='name'
                        required
                      />

                      {errors.name && touched.name ? (
                        <span className='invalid-feedback'>{errors.name}</span>
                      ) : null}
                    </Col>
                    <Col>
                      <Form.Label className='block-level'>
                        Template Key
                      </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={handleChange}
                        value={values.key}
                        className={
                          errors.key && touched.key
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='key'
                        required
                      />

                      {errors.key && touched.key ? (
                        <span className='invalid-feedback'>{errors.key}</span>
                      ) : null}
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Label className='block-level'>
                        Template Source
                      </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={handleChange}
                        value={values.notificationTemplatesSource}
                        className={
                          errors.notificationTemplatesSource &&
                          touched.notificationTemplatesSource
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='notificationTemplatesSource'
                        required
                      />

                      {errors.notificationTemplatesSource &&
                      touched.notificationTemplatesSource ? (
                        <span className='invalid-feedback'>
                          {errors.notificationTemplatesSource}
                        </span>
                      ) : null}
                    </Col>
                    <Col>
                      <Form.Label className='block-level'>
                        Communication Type
                      </Form.Label>
                      <select
                        id='toshow'
                        name='communicationType'
                        onChange={handleChange}
                        value={values.communicationType}
                        className={
                          errors.communicationType && touched.communicationType
                            ? 'form-control form-control-sm is-invalid h-38px'
                            : 'form-control form-control-sm h-38px'
                        }
                      >
                        <option value=''>Select</option>
                        <option value='1'>Email</option>
                        <option value='2'>SMS</option>
                        <option value='3'>WebHook</option>
                      </select>

                      {errors.communicationType && touched.communicationType ? (
                        <span className='invalid-feedback'>
                          {errors.communicationType}
                        </span>
                      ) : null}
                    </Col>
                  </Form.Row>
                  <Form.Group>
                    <Form.Label className='block-level'>
                      Message Template
                    </Form.Label>
                    <Form.Control
                      as='textarea'
                      rows='3'
                      onChange={handleChange}
                      value={values.messageTemplate}
                      className={
                        errors.messageTemplate && touched.messageTemplate
                          ? 'is-invalid'
                          : null
                      }
                      name='messageTemplate'
                    />

                    {errors.messageTemplate && touched.messageTemplate ? (
                      <span className='invalid-feedback'>
                        {errors.messageTemplate}
                      </span>
                    ) : null}
                  </Form.Group>

                  <div className='footer-with-cta toleft'>
                    <Button
                      disabled={
                        createANotificationTemplateRequest.is_request_processing
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
                        createANotificationTemplateRequest.is_request_processing
                      }
                    >
                      {createANotificationTemplateRequest.is_request_processing
                        ? 'Please wait...'
                        : 'Create'}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          {createANotificationTemplateRequest.request_status ===
            administrationConstants.ADD_A_NOTIFICATION_TEMPLATE_SUCCESS && (
            <Alert variant='success'>
              {
                createANotificationTemplateRequest.request_data.response.data
                  .message
              }
            </Alert>
          )}
          {createANotificationTemplateRequest.request_status ===
            administrationConstants.ADD_A_NOTIFICATION_TEMPLATE_FAILURE && (
            <Alert variant='danger'>
              {createANotificationTemplateRequest.request_data.error}
            </Alert>
          )}
        </Modal.Body>
      </Modal>
    );
  };

  createNewRecord = async (payload) => {
    const { dispatch } = this.props;

    await dispatch(administrationActions.createANotificationTemplate(payload));
  };

  updateARecord = async (payload, encodedKey) => {
    const { dispatch } = this.props;

    await dispatch(
      administrationActions.updateANotificationTemplate(payload, encodedKey)
    );
  };

  updateRecordPopUp = (updateType) => {
    let { showEditRecord, recordToUpdate } = this.state;
    let updateANotificationTemplateRequest = this.props
      .updateANotificationTemplate;

    // let getAllCurrencies =  this.props.adminGetAllCurrencies;

    let checkValidationSchema;
    if (this.state.updateType !== 'edit') {
      checkValidationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        key: Yup.string().required('Required'),
        communicationType: Yup.string().required('Required'),
        messageTemplate: Yup.string().required('Required'),
        notificationTemplatesSource: Yup.string().required('Required'),
      });
    }
    if (this.state.updateType === 'edit') {
      checkValidationSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        key: Yup.string().required('Required'),
        communicationType: Yup.string().required('Required'),
        messageTemplate: Yup.string().required('Required'),
        status: Yup.string().required('Required'),
        notificationTemplatesSource: Yup.string().required('Required'),
      });
    }

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
            <Modal.Title>Edit {recordToUpdate.name} </Modal.Title>
          )}
          {this.state.updateType === 'activate' && (
            <Modal.Title>Confirm Activation</Modal.Title>
          )}
          {this.state.updateType === 'deactivate' && (
            <Modal.Title>Confirm De-Activation</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              name: recordToUpdate.name,
              key: recordToUpdate.key,
              status: recordToUpdate.objectState.toString(),
              communicationType: recordToUpdate.communicationType,
              messageTemplate: recordToUpdate.messageTemplate,
              notificationTemplatesSource:
                recordToUpdate.notificationTemplatesSource,
            }}
            validationSchema={checkValidationSchema}
            onSubmit={(values, { resetForm }) => {
              // same shape as initial values

              let requestPayload;
              if (this.state.updateType === 'edit') {
                requestPayload = {
                  name: values.name,
                  key: values.key,
                  communicationType: parseInt(values.communicationType),
                  messageTemplate: values.messageTemplate,
                  notificationTemplatesSource:
                    values.notificationTemplatesSource,
                  objectState: parseInt(values.status),
                };
              }

              if (this.state.updateType === 'activate') {
                requestPayload = {
                  name: recordToUpdate.name,
                  key: recordToUpdate.key,
                  communicationType: recordToUpdate.communicationType,
                  messageTemplate: recordToUpdate.messageTemplate,
                  notificationTemplatesSource:
                    recordToUpdate.notificationTemplatesSource,
                  objectState: 0,
                  // objectState:  parseInt(values.status)
                };
              }

              if (this.state.updateType === 'deactivate') {
                requestPayload = {
                  name: recordToUpdate.name,
                  key: recordToUpdate.key,
                  communicationType: recordToUpdate.communicationType,
                  messageTemplate: recordToUpdate.messageTemplate,
                  notificationTemplatesSource:
                    recordToUpdate.notificationTemplatesSource,
                  objectState: 1,
                  // objectState:  parseInt(values.status)
                };
              }

              this.updateARecord(
                requestPayload,
                recordToUpdate.encodedKey
              ).then(() => {
                if (
                  this.props.updateANotificationTemplate.request_status ===
                  administrationConstants.UPDATE_A_NOTIFICATION_TEMPLATE_SUCCESS
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
                  <Form.Row>
                    <Col>
                      <Form.Label className='block-level'>
                        Template name
                      </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={(e) => {
                          setFieldValue('name', recordToUpdate.name);
                        }}
                        disabled={true}
                        value={values.name}
                        className={
                          errors.name && touched.name
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='name'
                        required
                      />

                      {errors.name && touched.name ? (
                        <span className='invalid-feedback'>{errors.name}</span>
                      ) : null}
                    </Col>
                    <Col>
                      <Form.Label className='block-level'>
                        Template Key
                      </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={(e) => {
                          if (this.state.updateType !== 'edit') {
                            setFieldValue('key', recordToUpdate.key);
                          } else {
                            setFieldValue('key', e.target.value);
                          }
                        }}
                        disabled={this.state.updateType !== 'edit'}
                        value={values.key}
                        className={
                          errors.key && touched.key
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='key'
                        required
                      />

                      {errors.key && touched.key ? (
                        <span className='invalid-feedback'>{errors.key}</span>
                      ) : null}
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Label className='block-level'>
                        Communication Type
                      </Form.Label>
                      <Form.Control
                        type='text'
                        onChange={(e) => {
                          if (this.state.updateType !== 'edit') {
                            setFieldValue(
                              'notificationTemplatesSource',
                              recordToUpdate.notificationTemplatesSource
                            );
                          } else {
                            setFieldValue(
                              'notificationTemplatesSource',
                              e.target.value
                            );
                          }
                        }}
                        disabled={this.state.updateType !== 'edit'}
                        value={values.notificationTemplatesSource}
                        className={
                          errors.notificationTemplatesSource &&
                          touched.notificationTemplatesSource
                            ? 'is-invalid h-38px'
                            : 'h-38px'
                        }
                        name='notificationTemplatesSource'
                        required
                      />

                      {errors.notificationTemplatesSource &&
                      touched.notificationTemplatesSource ? (
                        <span className='invalid-feedback'>
                          {errors.notificationTemplatesSource}
                        </span>
                      ) : null}
                    </Col>
                    <Col>
                      <Form.Label className='block-level'>
                        Communication Type
                      </Form.Label>
                      <select
                        id='toshow'
                        name='communicationType'
                        onChange={(e) => {
                          if (this.state.updateType !== 'edit') {
                            setFieldValue(
                              'communicationType',
                              recordToUpdate.communicationType
                            );
                          } else {
                            setFieldValue('communicationType', e.target.value);
                          }
                        }}
                        disabled={this.state.updateType !== 'edit'}
                        value={values.communicationType}
                        className={
                          errors.communicationType && touched.communicationType
                            ? 'form-control form-control-sm is-invalid h-38px'
                            : 'form-control form-control-sm h-38px'
                        }
                      >
                        <option value=''>Select</option>
                        <option value='1'>Email</option>
                        <option value='2'>SMS</option>
                        <option value='3'>WebHook</option>
                      </select>

                      {errors.communicationType && touched.communicationType ? (
                        <span className='invalid-feedback'>
                          {errors.communicationType}
                        </span>
                      ) : null}
                    </Col>
                  </Form.Row>
                  {this.state.updateType === 'edit' && (
                    <Form.Row>
                      <Col>
                        <Form.Label className='block-level'>Status</Form.Label>
                        <select
                          id='toshow'
                          name='status'
                          onChange={handleChange}
                          value={values.status}
                          className={
                            errors.status && touched.status
                              ? 'form-control form-control-sm is-invalid h-38px'
                              : 'form-control form-control-sm h-38px'
                          }
                        >
                          <option value=''>Select</option>
                          <option value='0'>Active</option>
                          <option value='1'>InActive</option>
                        </select>

                        {errors.status && touched.status ? (
                          <span className='invalid-feedback'>
                            {errors.status}
                          </span>
                        ) : null}
                      </Col>
                      <Col></Col>
                    </Form.Row>
                  )}
                  <Form.Group>
                    <Form.Label className='block-level'>
                      Message Template
                    </Form.Label>
                    <Form.Control
                      as='textarea'
                      rows='3'
                      onChange={(e) => {
                        if (this.state.updateType !== 'edit') {
                          setFieldValue(
                            'messageTemplate',
                            recordToUpdate.messageTemplate
                          );
                        } else {
                          setFieldValue('messageTemplate', e.target.value);
                        }
                      }}
                      disabled={this.state.updateType !== 'edit'}
                      value={values.messageTemplate}
                      className={
                        errors.messageTemplate && touched.messageTemplate
                          ? 'is-invalid'
                          : null
                      }
                      name='messageTemplate'
                    />

                    {errors.messageTemplate && touched.messageTemplate ? (
                      <span className='invalid-feedback'>
                        {errors.messageTemplate}
                      </span>
                    ) : null}
                  </Form.Group>

                  <div className='footer-with-cta toleft'>
                    <Button
                      disabled={
                        updateANotificationTemplateRequest.is_request_processing
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
                        updateANotificationTemplateRequest.is_request_processing
                      }
                    >
                      {updateANotificationTemplateRequest.is_request_processing &&
                        'Please wait...'}
                      {!updateANotificationTemplateRequest.is_request_processing &&
                        this.state.updateType === 'edit' &&
                        'Update'}
                      {!updateANotificationTemplateRequest.is_request_processing &&
                        this.state.updateType === 'activate' &&
                        'Activate'}
                      {!updateANotificationTemplateRequest.is_request_processing &&
                        this.state.updateType === 'deactivate' &&
                        'De-Activate'}
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          {updateANotificationTemplateRequest.request_status ===
            administrationConstants.UPDATE_A_NOTIFICATION_TEMPLATE_SUCCESS && (
            <Alert variant='success'>
              {
                updateANotificationTemplateRequest.request_data.response.data
                  .message
              }
            </Alert>
          )}
          {updateANotificationTemplateRequest.request_status ===
            administrationConstants.UPDATE_A_NOTIFICATION_TEMPLATE_FAILURE && (
            <Alert variant='danger'>
              {updateANotificationTemplateRequest.request_data.error}
            </Alert>
          )}
        </Modal.Body>
      </Modal>
    );
  };
  renderContentWrap = () => {
    let fetchAllNotificationTemplateRequest = this.props
      .fetchAllNotificationTemplate;

    let saveRequestData =
      fetchAllNotificationTemplateRequest.request_data !== undefined
        ? fetchAllNotificationTemplateRequest.request_data.tempData
        : null;

    switch (fetchAllNotificationTemplateRequest.request_status) {
      case administrationConstants.GET_ALL_NOTIFICATION_TEMPLATE_PENDING:
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
                    <th>Name</th>
                    <th>Key</th>
                    <th>Communication Type</th>
                    <th>Template Source</th>
                    <th>Message Template</th>
                    <th>Status</th>
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
                        this.setState({
                          SearchText: e.target.value.trim(),
                        });
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
                    <th>Name</th>
                    <th>Key</th>
                    <th>Communication Type</th>
                    <th>Template Source</th>
                    <th>Message Template</th>
                    <th>Status</th>
                    <th>Date Created</th>
                  </tr>
                </thead>
                <tbody>
                  {saveRequestData.map((eachItem, index) => {
                    return (
                      <Fragment key={index}>
                        <tr>
                          <td>{eachItem.name}</td>
                          <td>{eachItem.key}</td>
                          <td>{eachItem.communicationType}</td>
                          <td>{eachItem.notificationTemplatesSource}</td>
                          <td>{eachItem.messageTemplate}</td>
                          <td>{eachItem.objectStateDescription}</td>
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
                              {eachItem.objectState === 0 && (
                                <Dropdown.Item eventKey='1'>
                                  Activate
                                </Dropdown.Item>
                              )}
                              {eachItem.objectState === 1 && (
                                <Dropdown.Item eventKey='1'>
                                  Deactivate
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

      case administrationConstants.GET_ALL_NOTIFICATION_TEMPLATE_SUCCESS:
        let allFetchedData =
          fetchAllNotificationTemplateRequest.request_data.response.data;
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
                      <th>Name</th>
                      <th>Key</th>
                      <th>Communication Type</th>
                      <th>Template Source</th>
                      <th>Message Template</th>
                      <th>Status</th>
                      <th>Date Created</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allFetchedData.result.map((eachItem, index) => {
                      return (
                        <Fragment key={index}>
                          <tr>
                            <td>{eachItem.name}</td>
                            <td>{eachItem.key}</td>
                            <td>{eachItem.communicationTypeDescription}</td>
                            <td>{eachItem.notificationTemplatesSource}</td>
                            <td>{eachItem.messageTemplate}</td>
                            <td>{eachItem.objectStateDescription}</td>
                            <td>{getDateFromISO(eachItem.dateCreated)}</td>
                            <td>
                              <DropdownButton
                                size='sm'
                                title='Actions'
                                key='activeCurrency'
                                className='customone'
                              >
                                {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                                <Dropdown.Item
                                  eventKey='1'
                                  onClick={() =>
                                    this.handleEditRecordShow(eachItem, 'edit')
                                  }
                                >
                                  Edit
                                </Dropdown.Item>
                                {eachItem.objectState === 1 && (
                                  <Dropdown.Item
                                    eventKey='1'
                                    onClick={() =>
                                      this.handleEditRecordShow(
                                        eachItem,
                                        'activate'
                                      )
                                    }
                                  >
                                    Activate
                                  </Dropdown.Item>
                                )}
                                {eachItem.objectState === 0 && (
                                  <Dropdown.Item
                                    eventKey='1'
                                    onClick={() =>
                                      this.handleEditRecordShow(
                                        eachItem,
                                        'deactivate'
                                      )
                                    }
                                  >
                                    Deactivate
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
                      <th>Name</th>
                      <th>Key</th>
                      <th>Communication Type</th>
                      <th>Template Source</th>
                      <th>Message Template</th>
                      <th>Status</th>
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

      case administrationConstants.GET_ALL_NOTIFICATION_TEMPLATE_FAILURE:
        return (
          <div className='loading-content errormsg'>
            <div>{fetchAllNotificationTemplateRequest.request_data.error}</div>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    let { recordToUpdate } = this.state;
    return (
      <Fragment>
        <InnerPageContainer {...this.props}>
          {this.createNewRecordPopUp()}
          {recordToUpdate && this.updateRecordPopUp()}
          <div className='content-wrapper'>
            <div className='module-heading'>
              <div className='module-title'>
                <div className='content-container'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className=''>
                        <h2>Administration</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='module-submenu'>
                <div className='content-container'>
                  <AdminNav />
                  <GeneralNav />
                  {/* <div className="lowerlevel-menu">
                                        <ul className="nav">
                                            <li>
                                                <NavLink to={'/administration/general'}>Organization</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/currency'}>Currency</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/txt-channels'}>Transaction Channels</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/customer-types'}>Client Types</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/control'}>Internal Control</NavLink>
                                            </li>
                                        </ul>
                                    </div> */}
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
    fetchAllNotificationTemplate:
      state.administrationReducers.fetchAllNotificationTemplate,
    getANotificationTemplate:
      state.administrationReducers.getANotificationTemplate,
    createANotificationTemplate:
      state.administrationReducers.createANotificationTemplate,
    updateANotificationTemplate:
      state.administrationReducers.updateANotificationTemplate,
  };
}

export default connect(mapStateToProps)(Notifications);
