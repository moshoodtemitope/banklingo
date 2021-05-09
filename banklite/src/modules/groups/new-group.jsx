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
import AsyncSelect from 'react-select/async';

import { clientsActions } from '../../redux/actions/clients/clients.action';
import { clientsConstants } from '../../redux/actiontypes/clients/clients.constants';

import { allowNumbersOnly, numberWithCommas } from '../../shared/utils';

import { administrationActions } from '../../redux/actions/administration/administration.action';
import { administrationConstants } from '../../redux/actiontypes/administration/administration.constants';
import {customerTypeActions,customerTypeConstants} from '../../redux/actions/administration/customer-types-management.actions';

import { dashboardActions } from '../../redux/actions/dashboard/dashboard.action';
import { dashboardConstants } from '../../redux/actiontypes/dashboard/dashboard.constants'
import Alert from 'react-bootstrap/Alert';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './clients.scss';
import DatePickerFieldType from '../../_helpers/DatePickerFieldType';
class NewGroupClient extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      user: JSON.parse(localStorage.getItem('lingoAuth')),
      allMembersList:[],
      groupMembers:[],
      groupMembersData:[]
    };
    this.selectRef = null;
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    const { dispatch } = this.props;

    dispatch(administrationActions.getAllUsers(1));
  };

  handleCreateNewGroup = async (createNewCustomerpayload) => {
    const { dispatch } = this.props;

    await dispatch(clientsActions.createClient(createNewCustomerpayload, "group"));
  };


  loadSearchResults = (inputValue, callback) => {
    return this.getSearchedCustomerResults(inputValue)
      .then(() => {
        if (this.props.searchForCustomerReducer.request_status === dashboardConstants.SEARCH_FOR_CUSTOMER_SUCCESS) {
          let searchResults = this.props.searchForCustomerReducer.request_data.response.data;

            searchResults = searchResults.filter(eachResult=>(eachResult.searchItemType===0))
    
          // this.setState({isCustommerAccountsFetchedWithKey:false, defaultAccountOptions:searchResultsData })
    
          this.setState({ defaultOptions: searchResults })


          return searchResults;
        }
      })
  }




  getSearchedCustomerResults = async (inputValue) => {
    const { dispatch } = this.props;

    if (!inputValue || inputValue.length === 0) {
      return null;
    }


    await dispatch(dashboardActions.searchForCustomer(inputValue));


  }

  getSearchForCustomerOptionValue = (option) =>option? option.clientEncodedKey: ""; 
  getSearchOptionForCustomerLabel = (option) =>option? option.searchText : ""; 

  noOptionsForCustomerMessage(inputValue) {
        
    return "No Customers found"
  }

  //Search Customer
  handleSearchCustomerChange = (inputValue) => {
    const customerSearchText = inputValue.replace(/\W/g, '');

    this.setState({ customerSearchText })

  }

  //Handle Selected Customer
  handleSelectedCustomer = (inputValue) => {
    let { allMembersList, groupMembers, groupMembersData } = this.state;

    // console.log("customer is", inputValue);
    // this.loadCustomerAccounts(inputValue.clientEncodedKey, true);
    let allExistingMembers = allMembersList.filter(eachMember => eachMember.clientEncodedKey === inputValue.clientEncodedKey)

    if (allExistingMembers.length === 0) {
      allMembersList.push({ ...inputValue })
    }


    groupMembers = groupMembers.filter(eachMember => eachMember.clientEncodedKey !== inputValue.clientEncodedKey);

    groupMembers.push({
      clientEncodedKey: inputValue.clientEncodedKey,
      roleId: ""
    })
    groupMembersData.push({
      clientEncodedKey: inputValue.clientEncodedKey,
      roleId: null
    })
    this.setState({
      selectedCustomer: null,
      selectACustomerAccount: inputValue,
      // firstChosenTransferCriteria:"customer",
      selectOtherCustomerAccount: "",
      allMembersList,
      groupMembers,
      groupMembersData
    });

    // this.selectRef.select.select.clearValue()
    // this.getSearchForCustomerOptionValue(null)
    // this.getSearchOptionForCustomerLabel(null)

    // console.log("data is", this.selectRef.select.select.clearValue())

  }



  createCustomerValidationSchema = Yup.object().shape({
    groupName: Yup.string()
      .min(1, 'Valid Response required')
      .max(50, 'Max limit reached')
      .required('Required'),
    groupId: Yup.string()
      .min(1, 'Valid response required')
      .max(50, 'Max limit reached')
      .required('Required'),
    custType: Yup.string().required('Required'),
    clientBranchEncodedKey: Yup.string().required('Required'),
    accountOfficerEncodedKey: Yup.string().required('Required'),
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
    businessNumber: Yup.string()
    //   .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(8, 'Must be between 8 and 15 digits')
      .max(15, 'Must be between 8 and 15 digits'),
    contactMobile: Yup.string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(8, 'Must be between 8 and 15 digits')
      .max(15, 'Must be between 8 and 15 digits'),
    contactEmail: Yup.string()
      .min(8, 'Valid response required')
      .max(50, 'Max limit reached'),
    notes: Yup.string(),
  });

  renderAllMembersList = () =>{
    let {allMembersList}= this.state;
    return(
      <div className="all-items">
        {
          allMembersList.map((eachItem, index)=>{
            return(
              <div key={index} className="each-item-detail">
                <div className="item-detail">{eachItem.searchText}</div>
                <div className="remove-btn"onClick={()=>this.removeMember(eachItem)}>x</div>
              </div>
            )
          })
        }
      </div>
    )
  }

  renderAllMembersRoles = () =>{
    let {allMembersList}= this.state;
    const roleList = [
      {
        label: 'None',
        value: "none",
      },
    ];
    return(
      <div className="w-50 m-auto">
        {
          allMembersList.map((eachItem, index) => {
            return (
              <Form.Row key={index} className="each-role">
                <Col>
                  <div className="withasync">
                    <Form.Label className="block-level">{eachItem.searchText}</Form.Label>
                  </div>
                </Col>
                <Col>
                  {/* <Form.Row>
                    <Col> */}
                      {/* <Form.Label className='block-level'>Role</Form.Label> */}
                      <select 
                          id={`role-${index}`}
                          onChange={(e)=>{
                            e.stopPropagation()
                            this.updateMemberRoleList({...eachItem,roleData:e.target.value})
                          }}
                          name={`role-${index}`}
                          // value={values.roleId}
                          // defaultValue={currentRole? currentRole.roleId : ""}
                          className="form-control form-control-sm h-38px"
                          // className={errors.roleId && touched.roleId ? "is-invalid form-control form-control-sm h-38px" : "form-control form-control-sm h-38px"}
                      >
                          <option  value="">Select</option>
                          {
                              roleList.map((eachRole, index)=>{
                                  return(
                                      <option key={index} value={eachRole.value}>{eachRole.label}</option>
                                  )
                              })
                          }
                          
                      </select>
                      {/* <Select
                        options={roleList}
                        onChange={(selectedRole) => {
                          this.setState({ selectedRole });

                          errors.roleChosen = null
                          values.roleChosen = selectedRole.value
                        }}
                        className={errors.roleChosen && touched.roleChosen ? "is-invalid" : null}
                        name="roleChosen"
                        required
                      />
                      {errors.roleChosen && touched.roleChosen ? (
                        <span className="invalid-feedback">{errors.roleChosen}</span>
                      ) : null} */}
                    {/* </Col> */}
                    {/* <Col>
                    </Col> */}
                  {/* </Form.Row> */}
                </Col>
              </Form.Row>
            )
          })
        }
      </div>
    )
  }

  updateMemberRoleList = (member)=>{
    let {groupMembers, groupMembersData} = this.state;
      // console.log("existing list", groupMembers);

    groupMembers  = groupMembers.filter(eachMember=>eachMember.clientEncodedKey!==member.clientEncodedKey);
    groupMembersData  = groupMembersData.filter(eachMember=>eachMember.clientEncodedKey!==member.clientEncodedKey);

    groupMembers.push({
      clientEncodedKey:member.clientEncodedKey,
      roleId: member.roleData
    })

    groupMembersData.push({
      clientEncodedKey:member.clientEncodedKey,
      roleId: member.roleData!=="none"? member.roleData: null
    })

    this.setState({groupMembers})
    this.validateAllRoleEntries()
    this.props.dispatch(clientsActions.createClient('CLEAR'));
    // console.log("role data is ", groupMembersData)
  }

  validateAllRoleEntries =()=>{
    
    let {groupMembers} = this.state;
    let nonRolegroupMembers  = groupMembers.filter(eachMember=>eachMember.roleId==="");
    // console.log("unselected roles", nonRolegroupMembers);
    if(groupMembers.length>=1){
        if(nonRolegroupMembers.length>=1){
          return false
        }else{
          return true
        }
    }
    else{
      return true
    }
  }

  removeMember =(memberToRemove)=>{
    let {allMembersList}= this.state;
        // console.log("to be removed", memberToRemove, allMembersList);
        allMembersList = allMembersList.filter(eachItem=>eachItem.clientEncodedKey!==memberToRemove.clientEncodedKey)
        this.setState({allMembersList,groupMembers:allMembersList,groupMembersData:allMembersList })
        this.validateAllRoleEntries()
        // console.log("after  removal",  allMembersList);
  }

  renderCreateNewCustomer = () => {
    let createAClientRequest = this.props.createAClient,
      adminGetCustomerTypesRequest = this.props.adminGetCustomerTypes,
      getAllUsersRequest = this.props.getAllUsers,
      userAllowedBraches = this.state.user.AllowedBranches,
      selecBranchList = [],
      {  
        allMembersList,
        groupMembersData,
        selectedCustomer,
        defaultOptions} = this.state;

    userAllowedBraches.map((branch, id) => {
      selecBranchList.push({ label: branch.name, value: branch.encodedKey });
    });

    const roleList = [
      {
        label: 'None',
        value: null,
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
        allCustomerTypesList=[];

      
      let selectedCustype = allCustomerTypesData.filter(
        (CustType) => CustType.encodedKey === this.props.match?.params?.custTypeid
      )[0];

      allCustomerTypesData.map(((eachData=>{
        allCustomerTypesList.push({label:eachData.name, value: eachData.encodedKey})
      })))

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
            groupName:'',
            custType:'',
            groupId: '',
            businessNumber: '',
            addressLine1: '',
            addressLine2: '',
            addressCity: '',
            addressState: '',
            addressCountry: '',
            zipCode: '',
            contactMobile: '',
            contactEmail: '',
            notes: '',
            clientBranchEncodedKey: '',
            accountOfficerEncodedKey: '',
          }}
          validationSchema={this.createCustomerValidationSchema}
          onSubmit={(values, { resetForm }) => {
            let createNewCustomerPayload;
            if(this.validateAllRoleEntries()){
              createNewCustomerPayload = {
                // clientTypeId:values.custType,
                // clientTypeId:selectedCustype.id, 
                  clientTypeEncodedKey: values.custType,
                  // clientTypeEncodedKey: selectedCustype? selectedCustype.encodedKey : null,
                  groupName: values.groupName,
                  businessNumber: values.businessNumber,
                  clientCode: values.groupId,
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
                  notes: values.notes,
                  groupMembers: groupMembersData.length>=1?groupMembersData: null,
                  // groupMembers: allGroupMembers?allGroupMembers: null,
                  // groupMemberRoles: allGroupMemberRoles?allGroupMemberRoles: null,
                  clientBranchEncodedKey: values.clientBranchEncodedKey.toString(),
                  accountOfficerEncodedKey: values.accountOfficerEncodedKey,
              };

              this.handleCreateNewGroup(createNewCustomerPayload).then(() => {
                if (
                  this.props.createAClient.request_status ===
                  clientsConstants.CREATE_A_CLIENT_SUCCESS
                ) {
                  resetForm();
                  // value = {null}
                  setTimeout(() => {
                    this.props.dispatch(clientsActions.createClient('CLEAR'));
                  }, 3000);
                }

                
              });
            }
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
              
            {!selectedCustype &&
                <div className='form-heading'>
                    <h3>Create  Group</h3>
                </div>
            }
            {selectedCustype && (
            <div className='form-heading'>
                <h3>Create {selectedCustype.name} Group</h3>
            </div>
            )}
              
              <Form.Row>
                <Col>
                  <Form.Label className='block-level'>Group Name</Form.Label>
                  <Form.Control
                    type='text'
                    name='groupName'
                    onChange={handleChange}
                    value={values.groupName}
                    className={
                      errors.groupName && touched.groupName ? 'is-invalid' : null
                    }
                    required
                  />
                  {errors.groupName && touched.groupName ? (
                    <span className='invalid-feedback'>{errors.groupName}</span>
                  ) : null}
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label className='block-level'>ID</Form.Label>
                  <Form.Control
                    type='text'
                    name='groupId'
                    onChange={handleChange}
                    value={values.groupId}
                    className={
                      errors.groupId && touched.groupId
                        ? 'is-invalid h-38px'
                        : 'h-38px'
                    }
                    required
                  />
                  {errors.groupId && touched.groupId ? (
                    <span className='invalid-feedback'>{errors.groupId}</span>
                  ) : null}
                </Col>
                <Col>
                    <Form.Label className='block-level'>Group Type</Form.Label>
                    {/* {selectedCustype && (
                        <span className='form-text'>{selectedCustype.name} Group</span>
                    )} */}
                    {/* {!selectedCustype &&  */}
                    <Select

                        options={allCustomerTypesList}
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
                    {/* // } */}

                    {errors.custType && touched.custType ? (
                        <span className="invalid-feedback">{errors.custType}</span>
                    ) : null}
                </Col>
              </Form.Row>
              
              
              <Accordion defaultActiveKey='3'>
                <Accordion.Toggle
                  className='accordion-headingLink'
                  as={Button}
                  variant='link'
                  eventKey='3'
                >
                  Group Members
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='3'>
                  <div className='each-formsection'>
                      <Form.Group className="w-50 m-auto">
                        <div className="withasync">
                          <Form.Label className="block-level">Client</Form.Label>
                          <div>
                            <div>
                              <AsyncSelect
                                cacheOptions
                                ref={ref => {
                                    this.selectRef = ref;
                                }}
                                value={selectedCustomer}
                                // getOptionLabel={e => e.clientName}
                                getOptionLabel={this.getSearchOptionForCustomerLabel}
                                getOptionValue={this.getSearchForCustomerOptionValue}
                                // getOptionValue={e => e.clientEncodedKey}
                                noOptionsMessage={this.noOptionsForCustomerMessage}
                                loadOptions={this.loadSearchResults}
                                defaultOptions={defaultOptions}
                                name="clientEncodedKey"
                                placeholder="Search customer name"
                                className={errors.clientEncodedKey && touched.clientEncodedKey ? "is-invalid custom" : null}
                                onChange={(e) => {
                                  if(e){
                                    setFieldValue("clientEncodedKey", e.clientEncodedKey)
                                    this.handleSelectedCustomer(e)
                                  }

                                }}

                                onInputChange={this.handleSearchCustomerChange}
                              />


                              {errors.clientEncodedKey && touched.clientEncodedKey ? (
                                <span className="invalid-feedback">{errors.clientEncodedKey}</span>
                              ) : null}
                            </div>

                          </div>
                        </div>
                      </Form.Group>
                    {allMembersList.length>=1 &&
                      this.renderAllMembersList()
                    }
                  </div>
                </Accordion.Collapse>
              </Accordion>
              <Accordion defaultActiveKey='3'>
                <Accordion.Toggle
                  className='accordion-headingLink'
                  as={Button}
                  variant='link'
                  eventKey='3'
                >
                  Group Roles
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='3'>
                  <div className='each-formsection'>
                    {/* <Form.Row>
                      <Col>
                        <div className="withasync">
                          <Form.Label className="block-level">Client</Form.Label>
                        </div>
                      </Col>
                      <Col>
                        <Form.Row>
                          <Col>
                            <Form.Label className='block-level'>Role</Form.Label>
                            <Select
                              options={roleList}
                              onChange={(selectedRole) => {
                                this.setState({ selectedRole });

                                errors.roleChosen = null
                                values.roleChosen = selectedRole.value
                              }}
                              className={errors.roleChosen && touched.roleChosen ? "is-invalid" : null}
                              name="roleChosen"
                              required
                            />
                            {errors.roleChosen && touched.roleChosen ? (
                              <span className="invalid-feedback">{errors.roleChosen}</span>
                            ) : null}
                          </Col>
                          <Col></Col>
                        </Form.Row>
                      </Col>
                    </Form.Row> */}
                    {
                      (allMembersList.length>=1 && !this.validateAllRoleEntries()) &&
                      <div className="errormsg text-center mb-10">Please select role for all members</div>
                    }
                    {allMembersList.length>=1 &&
                      this.renderAllMembersRoles()
                    }
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
              <Accordion defaultActiveKey='3'>
                <Accordion.Toggle
                  className='accordion-headingLink'
                  as={Button}
                  variant='link'
                  eventKey='3'
                >
                  Association
                </Accordion.Toggle>
                <Accordion.Collapse eventKey='3'>
                  <div className='each-formsection'>
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
                    : 'Create Group'}
                </Button>
              </div>
              {
                (allMembersList.length>=1 && !this.validateAllRoleEntries()) &&
                <Alert variant='danger'>
                  Please select role for all members
                </Alert>
                
              }
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
    searchForCustomerReducer : state.dashboardReducers.searchForCustomerReducer,
  };
}

export default connect(mapStateToProps)(NewGroupClient);
