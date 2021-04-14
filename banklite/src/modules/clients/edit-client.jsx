import * as React from 'react';
// import {Router} from "react-router";

import { Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import InnerPageContainer from '../../shared/templates/authed-pagecontainer';
// import Form from 'react-bootstrap/Form'
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
// import * as moment from 'moment';
// import 'moment/locale/pt-br';
import { Formik } from 'formik';
import * as Yup from 'yup';

import DatePicker from '../../_helpers/datepickerfield';
import 'react-datepicker/dist/react-datepicker.css';

import Select from 'react-select';

import {
  getDateFromISO,
  allowNumbersOnly,
  numberWithCommas,
} from '../../shared/utils';
import { clientsActions } from '../../redux/actions/clients/clients.action';
import { clientsConstants } from '../../redux/actiontypes/clients/clients.constants';

import { administrationActions } from '../../redux/actions/administration/administration.action';
import { administrationConstants } from '../../redux/actiontypes/administration/administration.constants';
import Alert from 'react-bootstrap/Alert';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './clients.scss';
import DatePickerFieldType from '../../_helpers/DatePickerFieldType';
class EditAClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('lingoAuth')),
    };


    }

  componentDidMount() {
    this.getAClient();
    this.getAllUsers();
    // console.log('------',moment(new Date));
  }

  getAClient = () => {
    const { dispatch } = this.props;

    dispatch(clientsActions.getAClient(this.props.match.params.encodedkey));
  };

  getAllUsers = () => {
    const { dispatch } = this.props;

    dispatch(administrationActions.getAllUsers(1));
  };

    getBranch =  (encodedKey)=>{
        const {dispatch} = this.props;


         dispatch(administrationActions.getABranch(encodedKey));
    };

    handleUpdateCustomer = async (updateCustomerpayload)=>{
        const {dispatch} = this.props;

        await dispatch(clientsActions.updateAClient(updateCustomerpayload));
    }
;

  updateCustomerValidationSchema = Yup.object().shape({
    FName: Yup.string()
      .min(1, 'Valid Response required')
      .max(50, 'Max limit reached')
      .required('Required'),
    LName: Yup.string()
      .min(1, 'Valid response required')
      .max(50, 'Max limit reached')
      .required('Required'),
    MName: Yup.string()
      .min(1, 'Valid response required')
      .max(50, 'Max limit reached'),
    custType: Yup.string().min(1, 'Valid response required'),
    clientBranchEncodedKey: Yup.string().required('Required'),
    accountOfficerEncodedKey: Yup.string().required('Required'),
    BVN: Yup.string().required('Required'),
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
    contactMobile: Yup.string()
      .min(8, 'Valid response required')
      .max(17, 'Max limit reached'),
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
      .min(11, 'Valid response required')
      .max(16, 'Max limit reached'),
    notes: Yup.string().min(3, 'Valid response required'),
  });

  renderUpdateCustomer = () => {
    let updateAClientRequest = this.props.updateAClient,
      getAClientRequest = this.props.getAClient,
      getAllUsersRequest = this.props.getAllUsers,
      userAllowedBraches = this.state.user.AllowedBranches,
      selecBranchList = [];

    let updateACustomerValidationSchema = Yup.object().shape({
      FName: Yup.string()
        .min(1, 'Valid Response required')
        .max(50, 'Max limit reached')
        .required('Required'),
      LName: Yup.string()
        .min(1, 'Valid response required')
        .max(50, 'Max limit reached')
        .required('Required'),
      MName: Yup.string()
        .min(1, 'Valid response required')
        .max(50, 'Max limit reached'),
      custType: Yup.string().min(1, 'Valid response required'),
      clientBranchEncodedKey: Yup.string().required('Required'),
      accountOfficerEncodedKey: Yup.string().required('Required'),
      BVN: Yup.string().required('Required'),
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
      contactMobile: Yup.string()
        .min(8, 'Valid response required')
        .max(17, 'Max limit reached'),
      contactEmail: Yup.string()
        .min(8, 'Valid response required')
        .max(50, 'Max limit reached'),
      nextOfKinFullName: Yup.string()
        .min(2, 'Valid response required')
        .max(50, 'Max limit reached'),
      nextOfKinAddress: Yup.string(),
      // .min(2, 'Valid response required')
      // .max(50, 'Max limit reached'),
      nextOfKinMobile: Yup.string()
        .min(11, 'Valid mobile number is required')
        .max(16, 'Max limit reached'),
      notes: Yup.string(),
    });

    userAllowedBraches.map((branch, id) => {
      selecBranchList.push({ label: branch.name, value: branch.encodedKey });
    });

    if (
      getAllUsersRequest.request_status ===
        administrationConstants.GET_ALL_USERS_PENDING ||
      getAClientRequest.request_status === clientsConstants.GET_A_CLIENT_PENDING
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
      getAClientRequest.request_status === clientsConstants.GET_A_CLIENT_SUCCESS
) {
                let allCustomerData = getAClientRequest.request_data.response.data;
                let
                    allUsersData = getAllUsersRequest.request_data.response.data,
                    allUserDataList=[],
                    allCustomerTypesList;
                let defaultAccountOfficer;

      if (allUsersData.length >= 1) {
        allUsersData.map((eachUser, id) => {
          allUserDataList.push({ label: eachUser.name, value: eachUser.key });
        });

        defaultAccountOfficer = allUserDataList.filter(
          (eachOfficer) =>
            eachOfficer.value === allCustomerData.accountOfficerEncodedKey
        )[0];
      }

      let daysWrap = [];
      for (var i = 1; i <= 31; i++) {
        daysWrap.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
                        }

                let custTypes = this.props.adminGetCustomerTypes.request_data.response,
                    selectedCustype  = custTypes.filter((type)=>type.id===allCustomerData.clientTypeId)[0];
                    if(Object.keys(allCustomerData).length>=1){

                        return (
                            <Formik
                                initialValues={{
                                    FName: allCustomerData.firstName,
                                    LName: allCustomerData.lastName,
                                    MName: allCustomerData.middleName?allCustomerData.middleName:'',
                                    BVN: allCustomerData.bvn?allCustomerData.bvn:'',
              addressLine1: allCustomerData.address.addressLine1
                ? allCustomerData.address.addressLine1
                : '',
              addressLine2: allCustomerData.address.addressLine2
                ? allCustomerData.address.addressLine2
                : '',
              addressCity: allCustomerData.address.addressCity
                ? allCustomerData.address.addressCity
                : '',
              addressState: allCustomerData.address.addressState
                ? allCustomerData.address.addressState
                : '',
              addressCountry: allCustomerData.address.addressCountry
                ? allCustomerData.address.addressCountry
                : '',
              zipCode: allCustomerData.address.zipCode
                ? allCustomerData.address.zipCode
                : '',
              contactMobile: allCustomerData.contact.contactMobile
                ? allCustomerData.contact.contactMobile
                : '',
              contactEmail: allCustomerData.contact.contactEmail
                ? allCustomerData.contact.contactEmail
                : '',
              nextOfKinFullName:
                allCustomerData.nextOfKin.nextOfKinFullName !== null
                  ? allCustomerData.nextOfKin.nextOfKinFullName
                  : '',
              nextOfKinAddress:
                allCustomerData.nextOfKin.nextofKinHomeAddress !== null
                  ? allCustomerData.nextOfKin.nextofKinHomeAddress
                  : '',
              nextOfKinMobile:
                allCustomerData.nextOfKin.nextOfKinMobileNumber !== null
                  ? allCustomerData.nextOfKin.nextOfKinMobileNumber
                  : '',
              nextOfKinRelationship:
                allCustomerData.nextOfKin.relationship !== null
                  ? allCustomerData.nextOfKin.relationship
                  : '',
                                    gender: allCustomerData.gender !== undefined &&
                allCustomerData.gender !== null &&
                allCustomerData.gender !== ''
                  ? allCustomerData.gender
                  : '',
                                    dateOfBirth: allCustomerData.dateOfBirth && allCustomerData.dateOfBirth !== '' ? new Date(allCustomerData.dateOfBirth) : null,
                                    custType: allCustomerData.clientTypeId,
                                    notes:allCustomerData.notes.notes?allCustomerData.notes.notes
                : '',
              clientBranchEncodedKey: allCustomerData.branchEncodedKey
                ? allCustomerData.branchEncodedKey
                : null,
              accountOfficerEncodedKey: allCustomerData.accountOfficerEncodedKey
                ? allCustomerData.accountOfficerEncodedKey
                : null,

              employerName:
                allCustomerData.employeeInfo.employerName !== null
                  ? allCustomerData.employeeInfo.employerName
                  : '',
              // employmentDate: allCustomerData.employeeInfo.employerName!==null?allCustomerData.employeeInfo.employerName:"",
              employmentDate: null,
              officialEmail:
                allCustomerData.employeeInfo.officialEmail !== null
                  ? allCustomerData.employeeInfo.officialEmail
                  : '',
              monthlySalary:
                allCustomerData.employeeInfo.monthlySalary !== null
                  ? numberWithCommas(
                      allCustomerData.employeeInfo.monthlySalary,
                      true
                    )
                  : '',
              employeeSector:
                allCustomerData.employeeInfo.employeeSector !== null
                  ? allCustomerData.employeeInfo.employeeSector
                  : '',
              employeeSubSector:
                allCustomerData.employeeInfo.employeeSubSector !== null
                  ? allCustomerData.employeeInfo.employeeSubSector
                  : '',
              payDay:
                allCustomerData.employeeInfo.payDay !== null
                  ? numberWithCommas(allCustomerData.employeeInfo.payDay, true)
                  : '',
              employerAddress:
                allCustomerData.employeeInfo.employerAddress !== null
                  ? allCustomerData.employeeInfo.employerAddress
                  : '',
              employerAddressState:
                allCustomerData.employeeInfo.employerAddressState !== null
                  ? allCustomerData.employeeInfo.employerAddressState
                  : '',
              employerAddressCity:
                allCustomerData.employeeInfo.employerAddressCity !== null
                  ? allCustomerData.employeeInfo.employerAddressCity
                  : '',
              workStatus:
                allCustomerData.employeeInfo.workStatus !== null
                  ? allCustomerData.employeeInfo.workStatus
                  : '',
}}
                                validationSchema={updateACustomerValidationSchema}
                                // validationSchema={this.updateCustomerValidationSchema}
                                onSubmit={(values, { resetForm }) => {

                                    let updateCustomerPayload = {
                                        clientTypeId:values.custType,
                                        // clientTypeId:values.custType,
                                        firstName:values.FName,
                                        middleName:values.MName,
                                        lastName:values.LName,
                                        address :{
                                            addressLine1: values.addressLine1,
                                            addressLine2: values.addressLine2,
                                            addressCity: values.addressCity,
                                            addressState: values.addressState,
                                            addressCountry: values.addressCountry,
                                            zipCode: values.zipCode,
                                        },
                                        contact: {
                                            contactMobile: values.contactMobile,
                                            contactEmail: values.contactEmail,
                },
                nexOfKin: {
                  nextOfKinFullName: values.nextOfKinFullName,
                  nextofKinHomeAddress: values.nextOfKinAddress,
                  nextOfKinMobileNumber: values.nextOfKinMobile,
                  relationship: values.nextOfKinRelationship,
                },
                bvn: values.BVN,
                gender: values.gender ? values.gender : '',
                dateOfBirth: allCustomerData.dateOfBirth && allCustomerData.dateOfBirth !== ''
                  ? new Date(allCustomerData.dateOfBirth)
                  : null,
                notes: values.notes || null,
                encodedKey: this.props.match.params.encodedkey,
                clientBranchEncodedKey: values.clientBranchEncodedKey,
                accountOfficerEncodedKey: values.accountOfficerEncodedKey,

};

                                    this.handleUpdateCustomer(updateCustomerPayload)
                                        .then(
                                            () => {

                                                // if (this.props.updateAClient.request_status === clientsConstants.UPDATE_A_CLIENT_SUCCESS) {
                                                //     resetForm();

// }
                                                // setTimeout(() => {
                                                //     this.props.dispatch(clientsActions.updateAClient("CLEAR"))
                                                // }, 3000);


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
                                    errors, }) => (
                                        <Form
                                            noValidate
                                            onSubmit={handleSubmit}
                                            className='form-content card'
              >
                <div className='form-heading'>
                  <h3>
                    Editing -{allCustomerData.firstName}{' '}
                    {allCustomerData.lastName}
                  </h3>
                </div>
                <Form.Row>
                  <Col>
                    <Form.Label className='block-level'>First Name</Form.Label>
                    <Form.Control
                      type='text'
                      name='FName'
                                                        onChange={handleChange}
                                                        value={values.FName}
                                                        className={errors.FName && touched.FName ? 'is-invalid' : null
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
                                                         className={errors.LName && touched.LName ? 'is-invalid' : null
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
                                                         className={errors.MName && touched.MName ? 'is-invalid h-38px'
                          : 'h-38px'
                      }
                      required
                    />
                    {errors.MName && touched.MName ? (
                      <span className='invalid-feedback'>{errors.MName}</span>
                    ) : null}
                  </Col>
                  <Col>
                    <Form.Label className='block-level'>
                      Customer Type
                    </Form.Label>
                    <span className='form-text'>{selectedCustype.name}</span>
                    {/* <Select
                                                            options={allCustomerTypes}
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
                                                        />
                                                        {errors.custType && touched.custType ? (
                                                                <span className="invalid-feedback">{errors.custType}</span>
                                                        ) : null} */}
                  </Col>
                </Form.Row>
                <Form.Row>
                  <Col>
                    <Form.Label className='block-level'>BVN</Form.Label>
                    <Form.Control
                      type='text'
                      name='BVN'
                      onChange={handleChange}
                      value={allowNumbersOnly(values.BVN, 11)}
                      className={
                        errors.BVN && touched.BVN ? 'is-invalid' : null
                      }
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
                    {/* <Form.Label className="block-level">Gender</Form.Label> */}
                    <Form.Label htmlFor='gender' className='block-level'>
                      Gender
                    </Form.Label>
                    <select
                      id='gender'
                      onChange={handleChange}
                      name='gender'
                      value={values.gender}
                      className='countdropdown form-control form-control-sm'
                    >
                      <option value='Female'>Female</option>
                      <option value='Male'>Male</option>
                    </select>

                    {/* <Form.Check type="radio"
                                                        name="gender"
                                                        onChange={handleChange}
                                                        label="Female"
                                                        id="choose-female"
                                                        value={values.gender}
                                                          />
                                                    <Form.Check type="radio"
                                                        name="gender"
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
                        placeholderText='Choose  date'
                        autoComplete='new-password'
                        // onChange={this.handleDatePicker}
                        // onChangeRaw={(e) => this.handleDateChange(e)}
                        // defaultValue={dateOfBirth}
                        dateFormat={window.dateformat}
                        className='form-control form-control-sm'
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
                        <span className='invalid-feedback'>{errors.dateOfBirth}</span>
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
                      defaultValue={{
                        label: allCustomerData.branchName,
                        value: allCustomerData.branchEncodedKey,
                      }}
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

                                                    {errors.clientBranchEncodedKey && touched.clientBranchEncodedKey ? (
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
                      defaultValue={{
                        label: defaultAccountOfficer
                          ? defaultAccountOfficer.label
                          : null,
                        value: defaultAccountOfficer
                          ? defaultAccountOfficer.key
                          : null,
                      }}
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
                                                                    className={errors.addressLine1 && touched.addressLine1 ? 'is-invalid'
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
                                                                    className={errors.addressLine2 && touched.addressLine2 ? 'is-invalid'
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
                                                                    className={errors.addressCity && touched.addressCity ? 'is-invalid'
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
                                                                     className={errors.addressState && touched.addressState ? 'is-invalid'
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
                                                                    className={errors.zipCode && touched.zipCode ? 'is-invalid'
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
                          <Form.Label className='block-level'>
                            Country
                          </Form.Label>
                          <Form.Control
                            type='text'
                                                                    name='addressCountry'
                                                                    onChange={handleChange}
                                                                    value={values.addressCountry}
                                                                    className={errors.addressCountry && touched.addressCountry ? 'is-invalid'
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
                          <Form.Label className='block-level'>Are you employed</Form.Label>
                                                                    <select
                                                                        onChange={handleChange}
                                                                        name='workStatus'
                            value={values.workStatus}
                            className='countdropdown form-control form-control-sm'
                          >
                            <option value=''>Select</option>
                            <option value='1'>Yes</option>
                            <option value='2'>No</option>
                          </select>
                          {errors.workStatus && touched.workStatus ? (
                            <span className='invalid-feedback'>
                              {errors.payDay}
                            </span>
                          ) : null}
                        </Col>
                        <Col></Col>
                      </Form.Row>
                      {(values.workStatus === '1' || values.workStatus===1) &&(
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
                                  errors.employmentDate &&
                                  touched.employmentDate
                                    ? 'has-invaliderror fullwidthdate'
                                    : 'fullwidthdate'
                                }
                              >
                                <Form.Label className='block-level'>
                                  Date of Birth
                                </Form.Label>
                                <DatePicker
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
                                Monthly Salary
                              </Form.Label>
                              <Form.Control
                                type='text'
                                name='monthlySalary'
                                onChange={handleChange}
                                value={numberWithCommas(
                                  values.monthlySalary,
                                  true
                                )}
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
                                  errors.employeeSector &&
                                  touched.employeeSector
                                    ? 'is-invalid'
                                    : null
                                }
                              />
                              {errors.employeeSector &&
                              touched.employeeSector ? (
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
                                Pay Day
                              </Form.Label>
                              <select
                                id='toshow'
                                onChange={handleChange}
                                name='payDay'
                                value={values.gender}
                                className='countdropdown form-control form-control-sm'
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
                            type='text'
                                                                    name='contactMobile'
                                                                    onChange={handleChange}
                                                                    value={values.contactMobile}
                                                                    className={errors.contactMobile && touched.contactMobile ? 'is-invalid'
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
                                                                    className={errors.contactEmail && touched.contactEmail ? 'is-invalid'
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
                                                                    className={errors.nextOfKinFullName && touched.nextOfKinFullName ? 'is-invalid'
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
                                                                    className={errors.nextOfKinAddress && touched.nextOfKinAddress ? 'is-invalid'
                                : null
                            }
                          />
                          {errors.nextOfKinAddress &&
                          touched.nextOfKinAddress ? (
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
                            type='text'
                                                                    name='nextOfKinMobile'
                                                                    onChange={handleChange}
                                                                    value={values.nextOfKinMobile}
                                                                    className={errors.nextOfKinMobile && touched.nextOfKinMobile ? 'is-invalid'
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
                                                                    className={errors.nextOfKinRelationship && touched.nextOfKinRelationship ? 'is-invalid'
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
                  <Button
                    variant='light'
                                                        className='btn btn-secondary grayed-out'
                                                        onClick={()=>this.props.history.goBack()}
                                                >
                                                    Cancel</Button>

                                                {/* <NavLink to={'/clients'} className="btn btn-secondary grayed-out">Cancel</NavLink> */}
                                                <Button variant='success'
                    type='submit'
                                                    disabled={updateAClientRequest.is_request_processing}
                                                    className='ml-20'
                                                    >
                                                        {updateAClientRequest.is_request_processing?'Please wait...'
                      : 'Update Customer'}
                                                </Button>


                                            </div>
                                            {updateAClientRequest.request_status === clientsConstants.UPDATE_A_CLIENT_SUCCESS &&(
                  <Alert variant='success'>
                    {updateAClientRequest.request_data.response.data.message}
                  </Alert>
                )}
                                            {updateAClientRequest.request_status === clientsConstants.UPDATE_A_CLIENT_FAILURE &&(
                  <Alert variant='danger'>
                                                    {updateAClientRequest.request_data.error}

                                                </Alert>
                                            )}
              </Form>
            )}
          </Formik>
        );
      } else {
        return (
          <div className='loading-content card'>
                                <div>The requsted Customer could not be found</div>
                            </div>
                        );
                    }
            }

            if (getAClientRequest.request_status===clientsConstants.GET_A_CLIENT_FAILURE
    ) {
      return (
        <div className='loading-content card'>
                        <div>{getAClientRequest.request_data.error}</div>
                    </div>
                )
            ;


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
                        {this.renderUpdateCustomer()}
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
    getAClient: state.clientsReducers.getAClientReducer,
    updateAClient: state.clientsReducers.updateAClientReducer,
    getAllUsers: state.administrationReducers.adminGetAllUsersReducer,
    adminGetABranch: state.administrationReducers.adminGetABranchReducer,
    adminGetCustomerTypes:
      state.administrationReducers.getAllCustomerTypesReducer,
  };
}

export default connect(mapStateToProps)(EditAClient);
