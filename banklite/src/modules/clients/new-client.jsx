import * as React from 'react';
// import {Router} from "react-router";

import { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import InnerPageContainer from '../../shared/templates/authed-pagecontainer';
// import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';

import { Formik } from 'formik';
import * as Yup from 'yup';

import DatePicker from '../../_helpers/datepickerfield';
import 'react-datepicker/dist/react-datepicker.css';

import Select from 'react-select';

import { clientsActions } from '../../redux/actions/clients/clients.action';
import { clientsConstants } from '../../redux/actiontypes/clients/clients.constants';

import { allowNumbersOnly, numberWithCommas } from '../../shared/utils';

import { administrationActions } from '../../redux/actions/administration/administration.action';
import { administrationConstants } from '../../redux/actiontypes/administration/administration.constants';
import {customerTypeActions,customerTypeConstants} from '../../redux/actions/administration/customer-types-management.actions';
import Alert from 'react-bootstrap/Alert';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './clients.scss';
import DatePickerFieldType from '../../_helpers/DatePickerFieldType';
class NewClient extends React.Component {
  constructor(props) {
    super(props);
    // console.log('Lopncsc');
    this.state = {
      user: JSON.parse(localStorage.getItem('lingoAuth')),
    };
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    const { dispatch } = this.props;

    dispatch(administrationActions.getAllUsers(1));
  };

  handleCreateNewCustomer = async (createNewCustomerpayload) => {
    const { dispatch } = this.props;

    await dispatch(clientsActions.createClient(createNewCustomerpayload, "individual"));
  };


  createCustomerValidationSchema = Yup.object().shape({
    FName: Yup.string()
      .min(1, 'Valid Response required')
      .max(50, 'Max limit reached')
      .required('Required'),
    LName: Yup.string()
      .min(1, 'Valid response required')
      .max(50, 'Max limit reached')
      .required('Required'),
    clientBranchEncodedKey: Yup.string().required('Required'),
    accountOfficerEncodedKey: Yup.string().required('Required'),
    BVN: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(11, 'Must be exactly 11 digits')
      .max(11, 'Must be exactly 11 digits'),
    gender: Yup.string().required('Required'),
    dateOfBirth: Yup.date().required('Required'),
    MName: Yup.string()
      .min(1, 'Valid response required')
      .max(50, 'Max limit reached'),
    // custType:  Yup.string()
    //     .min(1, 'Valid response required'),
    addressLine1: Yup.string()
      .min(2, 'Valid response required')
      .max(70, 'Max limit reached'),
    addressLine2: Yup.string()
      .min(2, 'Valid response required')
      .max(70, 'Max limit reached'),
    addressCity: Yup.string()
      .min(2, 'Valid response required')
      .max(40, 'Max limit reached'),
    addressState: Yup.string()
      .min(2, 'Valid response required')
      .max(40, 'Max limit reached'),
    addressCountry: Yup.string()
      .min(2, 'Valid response required')
      .max(35, 'Max limit reached'),
    zipCode: Yup.string()
      .min(2, 'Valid response required')
      .max(10, 'Max limit reached'),

    employerName: Yup.string()
      .when('workStatus', {
        is: '1',
        then: Yup.string().required('Required'),
      }),
    employmentDate: Yup.string()
      .when('workStatus', {
        is: '1',
        then: Yup.string().required("Required"),
      }),
    officialEmail: Yup.string()
      .when('workStatus', {
        is: '1',
        then: Yup.string().required('Required'),
      }),
    monthlySalary: Yup.string()
      .when('workStatus', {
        is: '1',
        then: Yup.string().required('Required'),
      }),
    employeeSector: Yup.string()
      .when('workStatus', {
        is: '1',
        then: Yup.string().required('Required'),
      }),
    employeeSubSector: Yup.string()
      .when('workStatus', {
        is: '1',
        then: Yup.string().required('Required'),
      }),
    payDay: Yup.number()
      .when('workStatus', {
        is: '1',
        then: Yup.number().required('Required'),
      }),
    employerAddress: Yup.string()
      .when('workStatus', {
        is: '1',
        then: Yup.string().required('Required'),
      }),
    employerAddressState: Yup.string()
      .when('workStatus', {
        is: '1',
        then: Yup.string().required('Required'),
      }),
    employerAddressCity: Yup.string()
      .when('workStatus', {
        is: '1',
        then: Yup.string().required('Required'),
      }),

    contactMobile: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(8, 'Must be between 8 and 11 digits')
      .max(15, 'Must be between 8 and 11 digits'),
    contactEmail: Yup.string()
      .min(8, 'Valid response required')
      .max(50, 'Max limit reached'),
    nextOfKinFullName: Yup.string()
      .min(2, 'Valid response required')
      .max(50, 'Max limit reached'),
    nextOfKinAddress: Yup.string()
      .min(2, 'Valid response required')
      .max(50, 'Max limit reached'),
    nextOfKinMobile: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(8, 'Must be between 8 and 11 digits')
      .max(15, 'Must be between 8 and 11 digits'),
    nextOfKinRelationship: Yup.string(),
    // .min(11, 'Valid response required')
    // .max(16, 'Max limit reached'),
    notes: Yup.string(),

    // .min(3, 'Valid response required'),
    // notes:  Yup.string()
    //     .min(3, 'Valid response required'),
  });

  renderCreateNewCustomer = () => {
    let createAClientRequest = this.props.createAClient,
      adminGetCustomerTypesRequest = this.props.adminGetCustomerTypes,
      getAllUsersRequest = this.props.getAllUsers,
      userAllowedBraches = this.state.user.AllowedBranches,
      selecBranchList = [];

    userAllowedBraches.map((branch, id) => {
      selecBranchList.push({ label: branch.name, value: branch.encodedKey });
    });

    const genderList = [
      {
        label: 'Male',
        value: 'Male',
      },
      {
        label: 'Female',
        value: 'Female',
      },
    ];

    if (
      getAllUsersRequest.request_status ===
        administrationConstants.GET_ALL_USERS_PENDING ||
      adminGetCustomerTypesRequest.request_status ===
        customerTypeConstants.GET_ALL_CUSTOMERTYPES_PENDING
    ) {
      return (
        <div className='loading-content card'>
          <div className='loading-text'>Please wait... </div>
        </div>
      );
    }

    if (
      getAllUsersRequest.request_status ===
        administrationConstants.GET_ALL_USERS_SUCCESS &&
      adminGetCustomerTypesRequest.request_status ===
      customerTypeConstants.GET_ALL_CUSTOMERTYPES_SUCCESS
    ) {
      let allCustomerTypesData =
          adminGetCustomerTypesRequest.request_data.response,
        allUsersData = getAllUsersRequest.request_data.response.data,
        allUserDataList = [],
        allCustomerTypesList;

      // console.log("+++++",allCustomerTypesData);
      let selectedCustype = allCustomerTypesData.filter(
        (CustType) => CustType.encodedKey === this.props.match?.params?.custTypeid
      )[0];

      let daysWrap = [];

      for (var i = 1; i <= 31; i++) {
        daysWrap.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }

      // if(allUsersData.length>=1){
      allUsersData.map((eachUser, id) => {
        allUserDataList.push({ label: eachUser.name, value: eachUser.key });
      });
      return (
        <Formik
          initialValues={{
            FName: '',
            LName: '',
            MName: '',
            BVN: '',
            addressLine1: '',
            addressLine2: '',
            addressCity: '',
            addressState: '',
            addressCountry: '',
            zipCode: '',
            contactMobile: '',
            contactEmail: '',
            nextOfKinFullName: '',
            nextOfKinAddress: '',
            nextOfKinMobile: '',
            nextOfKinRelationship: '',
            gender: '',
            dateOfBirth: '',
            notes: '',
            clientBranchEncodedKey: '',
            accountOfficerEncodedKey: '',
            employerName: '',
            employmentDate: '',
            officialEmail: '',
            monthlySalary: '',
            employeeSector: '',
            employeeSubSector: '',
            payDay: '',
            employerAddress: '',
            employerAddressState: '',
            employerAddressCity: '',
            workStatus: '',
          }}
          validationSchema={this.createCustomerValidationSchema}
          onSubmit={(values, { resetForm }) => {
            let createNewCustomerPayload = {
              // clientTypeId:values.custType,
              // clientTypeId:selectedCustype.id,
              clientTypeEncodedKey: selectedCustype.encodedKey,
              firstName: values.FName,
              middleName: values.MName,
              lastName: values.LName,
              address: {
                addressLine1: values.addressLine1,
                addressLine2: values.addressLine2,
                addressCity: values.addressCity,
                addressState: values.addressState,
                addressCountry: values.addressCountry,
                zipCode: values.zipCode,
              },
              contact: {
                contactMobile: values.contactMobile.toString(),
                contactEmail: values.contactEmail,
              },
              nextOfKin: {
                nextOfKinFullName: values.nextOfKinFullName,
                nextofKinHomeAddress: values.nextOfKinAddress,
                nextOfKinMobileNumber: values.nextOfKinMobile.toString(),
                relationship: values.nextOfKinRelationship,
              },
              employmentInformation: {
                workStatus: parseInt(values.workStatus),
                employerName: values.employerName,
                employmentDate:
                  values.employmentDate !== '' && values.workStatus === '1'
                    ? values.employmentDate.toISOString()
                    : null,
                officialEmail:
                  values.workStatus === '1' ? values.officialEmail : null,
                monthlySalary:
                  values.workStatus === '1'
                    ? parseFloat(values.monthlySalary.replace(/,/g, ''))
                    : null,
                employeeSector:
                  values.workStatus === '1' ? values.employeeSector : null,
                employeeSubSector:
                  values.workStatus === '1' ? values.employeeSubSector : null,
                payDay:
                  values.workStatus === '1' ? parseInt(values.payDay) : null,
                employerAddress:
                  values.workStatus === '1' ? values.employerAddress : null,
                employerAddressCity:
                  values.workStatus === '1' ? values.employerAddressCity : null,
                employerAddressState:
                  values.workStatus === '1'
                    ? values.employerAddressState
                    : null,
              },
              bvn: values.BVN.toString(),
              gender: values.gender,
              dateOfBirth:
                values.dateOfBirth !== ''
                  ? values.dateOfBirth.toISOString()
                  : null,
              notes: values.notes,
              clientBranchEncodedKey: values.clientBranchEncodedKey.toString(),
              accountOfficerEncodedKey: values.accountOfficerEncodedKey,
            };

            this.handleCreateNewCustomer(createNewCustomerPayload).then(() => {
              if (
                this.props.createAClient.request_status ===
                clientsConstants.CREATE_A_CLIENT_SUCCESS
              ) {
                resetForm();
                // value = {null}
              }

              setTimeout(() => {
                this.props.dispatch(clientsActions.createClient('CLEAR'));
              }, 3000);
            });
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            resetForm,
            values,
            setFieldValue,
            touched,
            isValid,
            errors,
          }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              className='form-content card'
            >
              {selectedCustype && (
                <div className='form-heading'>
                  <h3>Create {selectedCustype.name}</h3>
                </div>
              )}
              <Form.Row>
                <Col>
                  <Form.Label className='block-level'>First Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='FName'
                    onChange={handleChange}
                    value={values.FName}
                    className={
                      errors.FName && touched.FName ? 'is-invalid' : null
                    }
                    required
                  />
                  {errors.FName && touched.FName ? (
                    <span className='invalid-feedback'>{errors.FName}</span>
                  ) : null}
                </Col>
                <Col>
                  <Form.Label className='block-level'>Last Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='LName'
                    onChange={handleChange}
                    value={values.LName}
                    className={
                      errors.LName && touched.LName ? 'is-invalid' : null
                    }
                    required
                  />
                  {errors.LName && touched.LName ? (
                    <span className='invalid-feedback'>{errors.LName}</span>
                  ) : null}
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label className='block-level'>Middle Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='MName'
                    onChange={handleChange}
                    value={values.MName}
                    className={
                      errors.MName && touched.MName
                        ? 'is-invalid h-38px'
                        : 'h-38px'
                    }
                    required
                  />
                  {errors.MName && touched.MName ? (
                    <span className='invalid-feedback'>{errors.MName}</span>
                  ) : null}
                </Col>
                <Col>
                  <Form.Label className='block-level'>Customer Type</Form.Label>
                  {selectedCustype && (
                    <span className='form-text'>{selectedCustype.name}</span>
                  )}
                   {!selectedCustype && (<Select

                                                            options={allCustomerTypesData}
                                                            onChange={(selectedCustType) => {
                                                                this.setState({ selectedCustType });
                                                                errors.custType = null
                                                                values.custType = selectedCustType.value
                                                            }}
                                                            className={errors.custType && touched.custType ? "is-invalid" : null}
                                                            // value={values.accountUsage}
                                                            name="custType"
                                                            // value={values.currencyCode}
                                                            required
                                                        />)}
                                                    
                                                        {errors.custType && touched.custType ? (
                                                                <span className="invalid-feedback">{errors.custType}</span>
                                                        ) : null}
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label className='block-level'>Biometric ID</Form.Label>
                  <Form.Control
                    type='number'
                    name='BVN'
                    onChange={handleChange}
                    value={values.BVN}
                    className={errors.BVN && touched.BVN ? 'is-invalid' : null}
                    required
                  />
                  {errors.BVN && touched.BVN ? (
                    <span className='invalid-feedback'>{errors.BVN}</span>
                  ) : null}
                </Col>
                <Col></Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label htmlFor='gender' className='block-level'>
                    Gender
                  </Form.Label>
                  <Select
                    id='gender'
                    options={genderList}
                    onChange={(selectedGender) => {
                      this.setState({ selectedGender });
                      errors.gender = null;
                      values.gender = selectedGender.value;
                    }}
                    name='gender'
                    //value={values.gender}
                    //className="countdropdown form-control form-control-sm"
                    className={
                      errors.gender && touched.gender ? 'is-invalid' : null
                    }
                    required
                  />
                  {/*<option value="">Select</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Male">Male</option>
                                                  </Select>*/}
                  {/* <Form.Check type="radio"
                                                        name="radio"
                                                        onChange={handleChange}
                                                        label="Female"
                                                        id="choose-female"
                                                        value={values.gender}
                                                          />
                                                    <Form.Check type="radio"
                                                        name="radio"
                                                        onChange={handleChange}
                                                        label="Male"
                                                        id="choose-male"
                                                        value={values.gender}
                                                          /> */}
                  {errors.gender && touched.gender ? (
                    <span className='invalid-feedback'>{errors.gender}</span>
                  ) : null}
                </Col>
                <Col>
                  <Form.Group
                    controlId='debitLocation'
                    className={
                      errors.dateOfBirth && touched.dateOfBirth
                        ? 'has-invaliderror fullwidthdate'
                        : 'fullwidthdate'
                    }
                  >
                    <Form.Label className='block-level'>
                      Date of Birth
                    </Form.Label>
                    <DatePicker
                      placeholderText='Choose date'
                      autoComplete='new-password'
                      // onChange={this.handleDatePicker}
                      // onChangeRaw={(e) => this.handleDateChange(e)}
                      dateFormat={window.dateformat}
                      peekNextMonth
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode='select'
                      name='dateOfBirth'
                      value={values.dateOfBirth}
                      onChange={setFieldValue}
                      maxDate={new Date()}
                      className={
                        errors.dateOfBirth && touched.dateOfBirth
                          ? 'is-invalid form-control form-control-sm h-38px'
                          : 'form-control form-control-sm h-38px'
                      }
                      customInput={
                        <DatePickerFieldType placeHolder='Choose date' />
                      }
                    />
                    {errors.dateOfBirth && touched.dateOfBirth ? (
                      <span className='invalid-feedback'>
                        {errors.dateOfBirth}
                      </span>
                    ) : null}
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label className='block-level'>
                    Customer branch
                  </Form.Label>
                  <Select
                    options={selecBranchList}
                    onChange={(selectedBranch) => {
                      this.setState({ selectedBranch });
                      errors.clientBranchEncodedKey = null;
                      values.clientBranchEncodedKey = selectedBranch.value;
                    }}
                    className={
                      errors.clientBranchEncodedKey &&
                      touched.clientBranchEncodedKey
                        ? 'is-invalid'
                        : null
                    }
                    // value={values.accountUsage}
                    name='clientBranchEncodedKey'
                    // value={values.currencyCode}
                    required
                  />

                  {errors.clientBranchEncodedKey &&
                  touched.clientBranchEncodedKey ? (
                    <span className='invalid-feedback'>
                      {errors.clientBranchEncodedKey}
                    </span>
                  ) : null}
                </Col>
                <Col>
                  <Form.Label className='block-level'>
                    Account officer
                  </Form.Label>
                  <Select
                    options={allUserDataList}
                    onChange={(selectedOfficer) => {
                      this.setState({ selectedOfficer });
                      errors.accountOfficerEncodedKey = null;
                      values.accountOfficerEncodedKey = selectedOfficer.value;
                    }}
                    className={
                      errors.accountOfficerEncodedKey &&
                      touched.accountOfficerEncodedKey
                        ? 'is-invalid'
                        : null
                    }
                    // value={values.accountUsage}
                    name='accountOfficerEncodedKey'
                    // value={values.currencyCode}
                    required
                  />

                  {errors.accountOfficerEncodedKey &&
                  touched.accountOfficerEncodedKey ? (
                    <span className='invalid-feedback'>
                      {errors.accountOfficerEncodedKey}
                    </span>
                  ) : null}
                </Col>
              </Form.Row>
              <Accordion defaultActiveKey='0'>
                <Accordion.Toggle
                  className='accordion-headingLink'
                  as={Button}
                  variant='link'
                  eventKey='0'
                >
                  Address
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                  <div className='each-formsection'>
                    <Form.Row>
                      <Col>
                        <Form.Label className='block-level'>
                          Street Address - Line 1
                        </Form.Label>
                        <Form.Control
                          type='text'
                          name='addressLine1'
                          onChange={handleChange}
                          value={values.addressLine1}
                          className={
                            errors.addressLine1 && touched.addressLine1
                              ? 'is-invalid'
                              : null
                          }
                        />
                        {errors.addressLine1 && touched.addressLine1 ? (
                          <span className='invalid-feedback'>
                            {errors.addressLine1}
                          </span>
                        ) : null}
                      </Col>
                      <Col>
                        <Form.Label className='block-level'>
                          Street Address - Line 2
                        </Form.Label>
                        <Form.Control
                          type='text'
                          name='addressLine2'
                          onChange={handleChange}
                          value={values.addressLine2}
                          className={
                            errors.addressLine2 && touched.addressLine2
                              ? 'is-invalid'
                              : null
                          }
                        />
                        {errors.addressLine2 && touched.addressLine2 ? (
                          <span className='invalid-feedback'>
                            {errors.addressLine2}
                          </span>
                        ) : null}
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col>
                        <Form.Label className='block-level'>City</Form.Label>
                        <Form.Control
                          type='text'
                          name='addressCity'
                          onChange={handleChange}
                          value={values.addressCity}
                          className={
                            errors.addressCity && touched.addressCity
                              ? 'is-invalid'
                              : null
                          }
                        />
                        {errors.addressCity && touched.addressCity ? (
                          <span className='invalid-feedback'>
                            {errors.addressCity}
                          </span>
                        ) : null}
                      </Col>
                      <Col>
                        <Form.Label className='block-level'>
                          State/Province/Region
                        </Form.Label>
                        <Form.Control
                          type='text'
                          name='addressState'
                          onChange={handleChange}
                          value={values.addressState}
                          className={
                            errors.addressState && touched.addressState
                              ? 'is-invalid'
                              : null
                          }
                        />
                        {errors.addressState && touched.addressState ? (
                          <span className='invalid-feedback'>
                            {errors.addressState}
                          </span>
                        ) : null}
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col>
                        <Form.Label className='block-level'>
                          Zip Postal Code
                        </Form.Label>
                        <Form.Control
                          type='text'
                          name='zipCode'
                          onChange={handleChange}
                          value={values.zipCode}
                          className={
                            errors.zipCode && touched.zipCode
                              ? 'is-invalid'
                              : null
                          }
                        />
                        {errors.zipCode && touched.zipCode ? (
                          <span className='invalid-feedback'>
                            {errors.zipCode}
                          </span>
                        ) : null}
                      </Col>
                      <Col>
                        <Form.Label className='block-level'>Country</Form.Label>
                        <Form.Control
                          type='text'
                          name='addressCountry'
                          onChange={handleChange}
                          value={values.addressCountry}
                          className={
                            errors.addressCountry && touched.addressCountry
                              ? 'is-invalid'
                              : null
                          }
                        />
                        {errors.addressCountry && touched.addressCountry ? (
                          <span className='invalid-feedback'>
                            {errors.addressCountry}
                          </span>
                        ) : null}
                      </Col>
                    </Form.Row>
                  </div>
                </Accordion.Collapse>
              </Accordion>
              <Accordion defaultActiveKey='0'>
                <Accordion.Toggle
                  className='accordion-headingLink'
                  as={Button}
                  variant='link'
                  eventKey='0'
                >
                  Employment Information
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                  <div className='each-formsection'>
                    <Form.Row>
                      <Col>
                        <Form.Label className='block-level'>
                          Employed?
                        </Form.Label>
                        <select
                          onChange={handleChange}
                          name='workStatus'
                          value={values.workStatus}
                          className={
                            errors.workStatus && touched.workStatus
                              ? 'is-invalid countdropdown form-control form-control-sm'
                              : 'countdropdown form-control form-control-sm'
                          }
                        >
                          <option value=''>Select</option>
                          <option value='1'>Yes</option>
                          <option value='2'>No</option>
                        </select>
                        {errors.workStatus && touched.workStatus ? (
                          <span className='invalid-feedback'>
                            {errors.workStatus}
                          </span>
                        ) : null}
                      </Col>
                      <Col></Col>
                    </Form.Row>
                    {values.workStatus === '1' && (
                      <div>
                        <Form.Row>
                          <Col>
                            <Form.Label className='block-level'>
                              Employer name
                            </Form.Label>
                            <Form.Control
                              type='text'
                              name='employerName'
                              onChange={handleChange}
                              value={values.employerName}
                              className={
                                errors.employerName && touched.employerName
                                  ? 'is-invalid'
                                  : null
                              }
                            />
                            {errors.employerName && touched.employerName ? (
                              <span className='invalid-feedback'>
                                {errors.employerName}
                              </span>
                            ) : null}
                          </Col>
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
                              <DatePicker
                                placeholderText='Choose  date'
                                autoComplete='new-password'
                                // onChange={this.handleDatePicker}
                                // onChangeRaw={(e) => this.handleDateChange(e)}
                                dateFormat={window.dateformat}
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode='select'
                                name='employmentDate'
                                value={values.employmentDate}
                                onChange={setFieldValue}
                                maxDate={new Date()}
                                className={
                                  errors.employmentDate &&
                                  touched.employmentDate
                                    ? 'is-invalid form-control form-control-sm h-38px'
                                    : 'form-control form-control-sm h-38px'
                                }
                                customInput={
                                  <DatePickerFieldType placeHolder='Choose date' />
                                }
                              />
                              {errors.employmentDate &&
                              touched.employmentDate ? (
                                <span className='invalid-feedback'>
                                  {errors.employmentDate}
                                </span>
                              ) : null}
                            </Form.Group>
                          </Col>
                        </Form.Row>
                        <Form.Row>
                          <Col>
                            <Form.Label className='block-level'>
                              Pay Day
                            </Form.Label>
                            <select
                              id='toshow'
                              onChange={handleChange}
                              name='payDay'
                              value={values.payDay}
                              className={
                                errors.payDay &&
                                touched.payDay
                                  ? 'is-invalid form-control form-control-sm'
                                  : 'countdropdown form-control form-control-sm'
                              }
                            >
                              <option value=''>Select</option>
                              {daysWrap}
                            </select>
                            {errors.payDay && touched.payDay ? (
                              <span className='invalid-feedback'>
                                {errors.payDay}
                              </span>
                            ) : null}
                          </Col>
                          <Col>
                            <Form.Label className='block-level'>
                              Monthly Salary(Net Pay){' '}
                            </Form.Label>
                            <Form.Control
                              type='text'
                              name='monthlySalary'
                              onChange={handleChange}
                              value={numberWithCommas(values.monthlySalary)}
                              className={
                                errors.monthlySalary && touched.monthlySalary
                                  ? 'is-invalid'
                                  : null
                              }
                            />
                            {errors.monthlySalary && touched.monthlySalary ? (
                              <span className='invalid-feedback'>
                                {errors.monthlySalary}
                              </span>
                            ) : null}
                          </Col>
                        </Form.Row>
                        <Form.Row>
                          <Col>
                            <Form.Label className='block-level'>
                              Employee Sector
                            </Form.Label>
                            <Form.Control
                              type='text'
                              name='employeeSector'
                              onChange={handleChange}
                              value={values.employeeSector}
                              className={
                                errors.employeeSector && touched.employeeSector
                                  ? 'is-invalid'
                                  : null
                              }
                            />
                            {errors.employeeSector && touched.employeeSector ? (
                              <span className='invalid-feedback'>
                                {errors.employeeSector}
                              </span>
                            ) : null}
                          </Col>
                          <Col>
                            <Form.Label className='block-level'>
                              Employee SubSector
                            </Form.Label>
                            <Form.Control
                              type='text'
                              name='employeeSubSector'
                              onChange={handleChange}
                              value={values.employeeSubSector}
                              className={
                                errors.employeeSubSector &&
                                touched.employeeSubSector
                                  ? 'is-invalid'
                                  : null
                              }
                            />
                            {errors.employeeSubSector &&
                            touched.employeeSubSector ? (
                              <span className='invalid-feedback'>
                                {errors.employeeSubSector}
                              </span>
                            ) : null}
                          </Col>
                        </Form.Row>
                        <Form.Row>
                          <Col>
                            <Form.Label className='block-level'>
                              Official Email
                            </Form.Label>
                            <Form.Control
                              type='text'
                              name='officialEmail'
                              onChange={handleChange}
                              value={values.officialEmail}
                              className={
                                errors.officialEmail && touched.officialEmail
                                  ? 'is-invalid'
                                  : null
                              }
                            />
                            {errors.officialEmail && touched.officialEmail ? (
                              <span className='invalid-feedback'>
                                {errors.officialEmail}
                              </span>
                            ) : null}
                          </Col>
                          <Col>
                            <Form.Label className='block-level'>
                              Employer Address
                            </Form.Label>
                            <Form.Control
                              type='text'
                              name='employerAddress'
                              onChange={handleChange}
                              value={values.employerAddress}
                              className={
                                errors.employerAddress &&
                                touched.employerAddress
                                  ? 'is-invalid'
                                  : null
                              }
                            />
                            {errors.employerAddress &&
                            touched.employerAddress ? (
                              <span className='invalid-feedback'>
                                {errors.employerAddress}
                              </span>
                            ) : null}
                          </Col>
                        </Form.Row>
                        <Form.Row>
                          <Col>
                            <Form.Label className='block-level'>
                              Employer Address State
                            </Form.Label>
                            <Form.Control
                              type='text'
                              name='employerAddressState'
                              onChange={handleChange}
                              value={values.employerAddressState}
                              className={
                                errors.employerAddressState &&
                                touched.employerAddressState
                                  ? 'is-invalid'
                                  : null
                              }
                            />
                            {errors.employerAddressState &&
                            touched.employerAddressState ? (
                              <span className='invalid-feedback'>
                                {errors.employerAddressState}
                              </span>
                            ) : null}
                          </Col>
                          <Col>
                            <Form.Label className='block-level'>
                              Employer Address City
                            </Form.Label>
                            <Form.Control
                              type='text'
                              name='employerAddressCity'
                              onChange={handleChange}
                              value={values.employerAddressCity}
                              className={
                                errors.employerAddressCity &&
                                touched.employerAddressCity
                                  ? 'is-invalid'
                                  : null
                              }
                            />
                            {errors.employerAddressCity &&
                            touched.employerAddressCity ? (
                              <span className='invalid-feedback'>
                                {errors.employerAddressCity}
                              </span>
                            ) : null}
                          </Col>
                        </Form.Row>
                      </div>
                    )}
                  </div>
                </Accordion.Collapse>
              </Accordion>
              <Accordion defaultActiveKey='0'>
                <Accordion.Toggle
                  className='accordion-headingLink'
                  as={Button}
                  variant='link'
                  eventKey='0'
                >
                  Contact
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                  <div className='each-formsection'>
                    <Form.Row>
                      <Col>
                        <Form.Label className='block-level'>
                          Phone Number
                        </Form.Label>
                        <Form.Control
                          type='number'
                          name='contactMobile'
                          onChange={handleChange}
                          value={values.contactMobile}
                          className={
                            errors.contactMobile && touched.contactMobile
                              ? 'is-invalid'
                              : null
                          }
                        />
                        {errors.contactMobile && touched.contactMobile ? (
                          <span className='invalid-feedback'>
                            {errors.contactMobile}
                          </span>
                        ) : null}
                      </Col>
                      <Col>
                        <Form.Label className='block-level'>
                          Email Address
                        </Form.Label>
                        <Form.Control
                          type='text'
                          name='contactEmail'
                          onChange={handleChange}
                          value={values.contactEmail}
                          className={
                            errors.contactEmail && touched.contactEmail
                              ? 'is-invalid'
                              : null
                          }
                        />
                        {errors.contactEmail && touched.contactEmail ? (
                          <span className='invalid-feedback'>
                            {errors.contactEmail}
                          </span>
                        ) : null}
                      </Col>
                    </Form.Row>
                  </div>
                </Accordion.Collapse>
              </Accordion>
              <Accordion defaultActiveKey='0'>
                <Accordion.Toggle
                  className='accordion-headingLink'
                  as={Button}
                  variant='link'
                  eventKey='0'
                >
                  Next of Kin
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                  <div className='each-formsection'>
                    <Form.Row>
                      <Col>
                        <Form.Label className='block-level'>
                          Next of Kin Fullname
                        </Form.Label>
                        <Form.Control
                          type='text'
                          name='nextOfKinFullName'
                          onChange={handleChange}
                          value={values.nextOfKinFullName}
                          className={
                            errors.nextOfKinFullName &&
                            touched.nextOfKinFullName
                              ? 'is-invalid'
                              : null
                          }
                        />
                        {errors.nextOfKinFullName &&
                        touched.nextOfKinFullName ? (
                          <span className='invalid-feedback'>
                            {errors.nextOfKinFullName}
                          </span>
                        ) : null}
                      </Col>
                      <Col>
                        <Form.Label className='block-level'>
                          Next of Kin Home Address
                        </Form.Label>
                        <Form.Control
                          type='text'
                          name='nextOfKinAddress'
                          onChange={handleChange}
                          value={values.nextOfKinAddress}
                          className={
                            errors.nextOfKinAddress && touched.nextOfKinAddress
                              ? 'is-invalid'
                              : null
                          }
                        />
                        {errors.nextOfKinAddress && touched.nextOfKinAddress ? (
                          <span className='invalid-feedback'>
                            {errors.nextOfKinAddress}
                          </span>
                        ) : null}
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col>
                        <Form.Label className='block-level'>
                          Next of Kin Phone Number
                        </Form.Label>
                        <Form.Control
                          type='number'
                          name='nextOfKinMobile'
                          onChange={handleChange}
                          value={values.nextOfKinMobile}
                          className={
                            errors.nextOfKinMobile && touched.nextOfKinMobile
                              ? 'is-invalid'
                              : null
                          }
                        />
                        {errors.nextOfKinMobile && touched.nextOfKinMobile ? (
                          <span className='invalid-feedback'>
                            {errors.nextOfKinMobile}
                          </span>
                        ) : null}
                      </Col>
                      <Col>
                        <Form.Label className='block-level'>
                          Next of Kin Relationship
                        </Form.Label>
                        <Form.Control
                          type='text'
                          name='nextOfKinRelationship'
                          onChange={handleChange}
                          value={values.nextOfKinRelationship}
                          className={
                            errors.nextOfKinRelationship &&
                            touched.nextOfKinRelationship
                              ? 'is-invalid'
                              : null
                          }
                        />
                        {errors.nextOfKinRelationship &&
                        touched.nextOfKinRelationship ? (
                          <span className='invalid-feedback'>
                            {errors.nextOfKinRelationship}
                          </span>
                        ) : null}
                      </Col>
                    </Form.Row>
                  </div>
                </Accordion.Collapse>
              </Accordion>
              <Accordion defaultActiveKey='0'>
                <Accordion.Toggle
                  className='accordion-headingLink'
                  as={Button}
                  variant='link'
                  eventKey='0'
                >
                  Notes
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='0'>
                  <div className='each-formsection'>
                    <Form.Group>
                      <Form.Label className='block-level'>Notes</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows='3'
                        onChange={handleChange}
                        name='notes'
                        value={values.notes}
                        className={
                          errors.notes && touched.notes
                            ? 'is-invalid form-control form-control-sm'
                            : null
                        }
                      />

                      {errors.notes && touched.notes ? (
                        <span className='invalid-feedback'>{errors.notes}</span>
                      ) : null}
                    </Form.Group>
                  </div>
                </Accordion.Collapse>
              </Accordion>

              <div className='footer-with-cta toleft'>
                {/* <Button variant="light" className="btn btn-light">
                                                    Cancel</Button> */}
                {/* <NavLink to={'/clients'} className="btn btn-secondary grayed-out">Cancel</NavLink> */}
                <Button
                  variant='light'
                  className='btn btn-secondary grayed-out'
                  onClick={() => this.props.history.goBack()}
                >
                  Cancel
                </Button>
                <Button
                  variant='success'
                  type='submit'
                  disabled={createAClientRequest.is_request_processing}
                  className='ml-20'
                >
                  {createAClientRequest.is_request_processing
                    ? 'Please wait...'
                    : 'Create Client'}
                </Button>
              </div>
              {createAClientRequest.request_status ===
                clientsConstants.CREATE_A_CLIENT_SUCCESS && (
                <Alert variant='success'>
                  {createAClientRequest.request_data.response.data.message}
                </Alert>
              )}
              {createAClientRequest.request_status ===
                clientsConstants.CREATE_A_CLIENT_FAILURE && (
                <Alert variant='danger'>
                  {createAClientRequest.request_data.error}
                </Alert>
              )}
            </Form>
          )}
        </Formik>
      );
      // }else{
      //     return(
      //         <div className="loading-content card">
      //             <div>No Account Officer. Please contact Admin</div>
      //         </div>
      //     )
      // }
    }

    if (
      getAllUsersRequest.request_status ===
      administrationConstants.GET_ALL_USERS_FAILURE
    ) {
      return (
        <div className='loading-content card'>
          <div>{getAllUsersRequest.request_data.error}</div>
        </div>
      );
    }

    if (
      adminGetCustomerTypesRequest.request_status ===
      customerTypeConstants.GET_ALL_CUSTOMERTYPES_FAILURE
    ) {
      return (
        <div className='loading-content card'>
          <div>{adminGetCustomerTypesRequest.request_data.error}</div>
        </div>
      );
    }
  };

  render() {
    return (
      <Fragment>
        <InnerPageContainer {...this.props}>
          <div className='content-wrapper'>
            <div className='module-content'>
              <div className='content-container'>
                <div className='row'>
                  <div className='col-sm-12'>
                    <div className='middle-content'>
                      <div className='full-pageforms w-60'>
                        {/* <div className="footer-with-cta toleft">
                                                    <Button variant="secondary" className="grayed-out">Rearrange</Button>
                                                    <Button >Add Channel</Button>
                                                </div> */}
                        {this.renderCreateNewCustomer()}
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
    adminGetCustomerTypes:
      state.administrationReducers.getAllCustomerTypesReducer,
    getAllUsers: state.administrationReducers.adminGetAllUsersReducer,
    createAClient: state.clientsReducers.createAClientReducer,
  };
}

export default connect(mapStateToProps)(NewClient);
