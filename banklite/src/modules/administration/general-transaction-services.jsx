import * as React from "react";
// import {Router} from "react-router";

import { Fragment } from "react";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import TableComponent from '../../shared/elements/table'
import TablePagination from '../../shared/elements/table/pagination'
import Form from 'react-bootstrap/Form'
import { Formik } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal'


import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import AdminNav from './_menu'
// import GeneralNav from './menus/_general-menu'
import Select from 'react-select';
// import DatePicker from '../../_helpers/datepickerfield'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDateFromISO, numberWithCommas } from '../../shared/utils';
import GeneralNav from './menus/_general-menu'

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'
import Alert from 'react-bootstrap/Alert'

// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class TransactionServices extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user: '',
            PageSize: 25,
            ShowDeactivated: true,
            CurrentPage: 1,
            CurrentSelectedPage: 1,
            showCreateNewRecord: false,
            showEditRecord: false,
            defaultOptions: null,
            selectedCustomer: "",
            endDate: "",
            startDate: "",
            SearchText: ""
        }

        
    }

    componentDidMount() {
        this.loadInitialData();
    }


    loadInitialData = () => {
        let { PageSize, CurrentPage, ShowDeactivated } = this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&ShowDeactivated=${ShowDeactivated}`;

        
        this.fetchAllRecords(params);
        // this.clearAllData()
    }






    fetchAllRecords = (paramters) => {
        const { dispatch } = this.props;

        
        dispatch(administrationActions.fetchAllChannelServices(paramters));
        
    }

    clearAllData = () => {
        this.props.dispatch(administrationActions.createAChannelServices("CLEAR"));
        this.props.dispatch(administrationActions.updateAChannelServices("CLEAR"));
    }

    setPagesize = (PageSize, tempData) => {
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value,
            { CurrentPage, CurrentSelectedPage, ShowDeactivated } = this.state;

        this.setState({ PageSize: sizeOfPage });

        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&ShowDeactivated=${ShowDeactivated}`;
        // this.fetchAllRecords(params);

        if (tempData) {
            dispatch(administrationActions.fetchAllChannelServices(params, tempData));
        } else {
            dispatch(administrationActions.fetchAllChannelServices(params));
        }
    }

    setShowDeactivated = (ShowDeactivated, tempData) => {
        const { dispatch } = this.props;

        let showNonActive = ShowDeactivated.target.checked,
            { CurrentPage, CurrentSelectedPage, PageSize } = this.state;

        this.setState({ ShowDeactivated: showNonActive });

        let params = `ShowDeactivated=${showNonActive}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;

        if (tempData) {
            dispatch(administrationActions.fetchAllChannelServices(params, tempData));
        } else {
            dispatch(administrationActions.fetchAllChannelServices(params));
        }

    }

    loadNextPage = (nextPage, tempData) => {

        const { dispatch } = this.props;
        let { PageSize } = this.state;

        // this.setState({PageSize: sizeOfPage});

        let params = `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);


        if (tempData) {
            dispatch(administrationActions.fetchAllChannelServices(params, tempData));
        } else {
            dispatch(administrationActions.fetchAllChannelServices(params));
        }
    }

    handleCloseNewRecord = () => {
        if (this.props.createAChannelServices.is_request_processing === false) {
            this.setState({ showCreateNewRecord: false })
            
        }
        if (this.props.createAChannelServices.request_status === administrationConstants.ADD_A_CHANNEL_SERVICE_SUCCESS) {
            
            this.loadInitialData();
        }
    }

    handleShowNewRecord = () => {
        this.clearAllData();
        this.setState({ showCreateNewRecord: true })
    };

    handleEditRecordClose = () => {
        if (this.props.updateAChannelServices.is_request_processing === false) {
            this.setState({ showEditRecord: false });
        }

        if (this.props.updateAChannelServices.request_status === administrationConstants.UPDATE_A_CHANNEL_SERVICE_SUCCESS) {
            
            this.loadInitialData();
        }
    }

    handleEditRecordShow = (recordToUpdate, updateType) => {
        this.clearAllData()
        this.setState({ updateType, recordToUpdate, showEditRecord: true, });
    }

    createNewRecordPopUp = () => {


        let { showCreateNewRecord} = this.state;
        let createAChannelServicesRequest = this.props.createAChannelServices;
        let fetchAllChannelServicesRequest = this.props.fetchAllChannelServicesReducer,
            allGlAccounts = fetchAllChannelServicesRequest.request_data.response2.data;
        
        // let getAllCurrencies =  this.props.adminGetAllCurrencies;
        let allAccountsList =[];
        allGlAccounts.map((eachAccount, index)=>{
            allAccountsList.push({value:eachAccount.id, label:eachAccount.accountDescription})
        })

        let checkValidationSchema = Yup.object().shape({
            name: Yup.string()
                .required('Required'),
            serviceCode: Yup.string()
                .required('Required'),
            serviceDescription: Yup.string(),
            maxServiceCommissionValue: Yup.string()
                .required('Required'),
            serviceCommisionCalculation: Yup.string()
                .required('Required'),
            serviceCommission: Yup.string()
                .required('Required'),
            serviceCommisionGLAcccountId: Yup.string()
                .required('Required'),
        });

        
        return (
            <Modal show={showCreateNewRecord} onHide={this.handleCloseNewRecord} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={true}>
                <Modal.Header>
                    <Modal.Title>Add New</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: '',
                            serviceCode: '',
                            serviceDescription: '',
                            maxServiceCommissionValue: '',
                            serviceCommisionCalculation: '',
                            serviceCommission: '',
                            serviceCommisionGLAcccountId: '',
                        }}
                        validationSchema={checkValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // same shape as initial values

                            let requestPayload = {
                                name: values.name,
                                serviceCode: values.serviceCode,
                                serviceDescription: values.serviceDescription,
                                maxServiceCommissionValue:  parseFloat(values.maxServiceCommissionValue.replace(/,/g, '')),
                                serviceCommisionCalculation: parseInt(values.serviceCommisionCalculation),
                                serviceCommission: parseFloat(values.serviceCommission.replace(/,/g, '')),
                                serviceCommisionGLAcccountId: parseInt(values.serviceCommisionGLAcccountId),
                            };




                            this.createNewRecord(requestPayload)
                                .then(
                                    () => {
                                        if (this.props.createAChannelServices.request_status === administrationConstants.ADD_A_CHANNEL_SERVICE_SUCCESS) {
                                            resetForm();
                                            // this.loadInitialData();
                                        }

                                    }
                                )




                        }}
                    >
                        {({ handleSubmit,
                            handleChange,
                            handleBlur,
                            setFieldValue,
                            setFieldTouched,
                            resetForm,
                            values,
                            touched,
                            isValid,
                            errors, }) => {
                            
                            return (
                                <Form noValidate
                                    onSubmit={handleSubmit}>
                                    <Form.Row>

                                        <Col>
                                            <Form.Label className="block-level">Service name</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handleChange}
                                                value={values.name}
                                                className={errors.name && touched.name ? "is-invalid h-38px" : "h-38px"}
                                                name="name"
                                                required />

                                            {errors.name && touched.name ? (
                                                <span className="invalid-feedback">{errors.name}</span>
                                            ) : null}

                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Service Code</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handleChange}
                                                value={values.serviceCode}
                                                className={errors.serviceCode && touched.serviceCode ? "is-invalid h-38px" : "h-38px"}
                                                name="serviceCode"
                                                required />

                                            {errors.serviceCode && touched.serviceCode ? (
                                                <span className="invalid-feedback">{errors.serviceCode}</span>
                                            ) : null}

                                        </Col>

                                    </Form.Row>
                                    <Form.Row>

                                        <Col>
                                            <Form.Label className="block-level">Max Service Commission</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handleChange}
                                                value={numberWithCommas(values.maxServiceCommissionValue)}
                                                className={errors.maxServiceCommissionValue && touched.maxServiceCommissionValue ? "is-invalid h-38px" : "h-38px"}
                                                name="maxServiceCommissionValue"
                                                required />

                                            {errors.maxServiceCommissionValue && touched.maxServiceCommissionValue ? (
                                                <span className="invalid-feedback">{errors.maxServiceCommissionValue}</span>
                                            ) : null}

                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Service Commision Calculation</Form.Label>
                                            <select id="toshow"
                                                name="serviceCommisionCalculation"
                                                onChange={handleChange}
                                                value={values.serviceCommisionCalculation}
                                                className={errors.serviceCommisionCalculation && touched.serviceCommisionCalculation ? "form-control form-control-sm is-invalid h-38px" : "form-control form-control-sm h-38px"}
                                            >
                                                <option value="">Select</option>
                                                <option value="1">Fixed Value</option>
                                                <option value="2">Percentage</option>
                                            </select>
                                            

                                            {errors.serviceCommisionCalculation && touched.serviceCommisionCalculation ? (
                                                <span className="invalid-feedback">{errors.serviceCommisionCalculation}</span>
                                            ) : null}

                                        </Col>

                                    </Form.Row>

                                    <Form.Row>

                                        <Col>
                                            <Form.Label className="block-level">Service Commission</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handleChange}
                                                value={numberWithCommas(values.serviceCommission)}
                                                className={errors.serviceCommission && touched.serviceCommission ? "is-invalid h-38px" : "h-38px"}
                                                name="serviceCommission"
                                                required />

                                            {errors.serviceCommission && touched.serviceCommission ? (
                                                <span className="invalid-feedback">{errors.serviceCommission}</span>
                                            ) : null}

                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Service Commision GL Account</Form.Label>
                                            <Select
                                                options={allAccountsList}
                                                onChange={(selectedAccount) => {
                                                    this.setState({ selectedAccount });
                                                    errors.serviceCommisionGLAcccountId = null
                                                    values.serviceCommisionGLAcccountId = selectedAccount.value
                                                }}
                                                className={errors.serviceCommisionGLAcccountId && touched.serviceCommisionGLAcccountId ? "is-invalid" : null}
                                                // value="serviceCommisionGLAcccountId"
                                                name="serviceCommisionGLAcccountId"
                                                // value={values.serviceCommisionGLAcccountId || ''}
                                                required
                                            />


                                            {errors.serviceCommisionGLAcccountId && touched.serviceCommisionGLAcccountId ? (
                                                <span className="invalid-feedback">{errors.serviceCommisionGLAcccountId}</span>
                                            ) : null}

                                        </Col>

                                    </Form.Row>
                                    
                                    
                                    <Form.Group>
                                        <Form.Label className="block-level">Service Description</Form.Label>
                                        <Form.Control
                                            as="textarea" rows="3"
                                            onChange={handleChange}
                                            value={values.serviceDescription}
                                            className={errors.serviceDescription && touched.serviceDescription ? "is-invalid" : null}
                                            name="serviceDescription"
                                        />

                                        {errors.serviceDescription && touched.serviceDescription ? (
                                            <span className="invalid-feedback">{errors.serviceDescription}</span>
                                        ) : null}
                                    </Form.Group>

                                    <div className="footer-with-cta toleft">
                                        <Button
                                            disabled={createAChannelServicesRequest.is_request_processing}
                                            variant="secondary" className="grayed-out" onClick={this.handleCloseNewRecord}>Cancel</Button>
                                        <Button
                                            type="submit"
                                            disabled={createAChannelServicesRequest.is_request_processing}>
                                            {createAChannelServicesRequest.is_request_processing ? "Please wait..." : "Create"}
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                    {createAChannelServicesRequest.request_status === administrationConstants.ADD_A_CHANNEL_SERVICE_SUCCESS &&
                        <Alert variant="success">
                            {createAChannelServicesRequest.request_data.response.data.message}
                        </Alert>
                    }
                    {createAChannelServicesRequest.request_status === administrationConstants.ADD_A_CHANNEL_SERVICE_FAILURE &&
                        <Alert variant="danger">
                            {createAChannelServicesRequest.request_data.error}
                        </Alert>
                    }
                </Modal.Body>
            </Modal>
        )
    }

    createNewRecord = async (payload) => {
        const { dispatch } = this.props;



        await dispatch(administrationActions.createAChannelServices(payload));


    }

    updateARecord = async (payload, encodedKey) => {
        const { dispatch } = this.props;


        await dispatch(administrationActions.updateAChannelServices(payload, encodedKey));


    }

    updateRecordPopUp = (updateType) => {


        let { showEditRecord,
            recordToUpdate,
        } = this.state;
        let updateAChannelServicesRequest = this.props.updateAChannelServices;
        
        let fetchAllChannelServicesRequest = this.props.fetchAllChannelServicesReducer,
            allGlAccounts = fetchAllChannelServicesRequest.request_data.response2.data;
        
        // let getAllCurrencies =  this.props.adminGetAllCurrencies;
        let allAccountsList =[],
            filteredData;
        allGlAccounts.map((eachAccount, index)=>{
            allAccountsList.push({value:eachAccount.id, label:eachAccount.accountDescription})
        })

        filteredData = allAccountsList.filter(eachData=>eachData.value=== recordToUpdate.serviceCommisionGLAcccountId)[0];
        // let getAllCurrencies =  this.props.adminGetAllCurrencies;


        let checkValidationSchema = Yup.object().shape({
            name: Yup.string()
                .required('Required'),
            serviceCode: Yup.string()
                .required('Required'),
            serviceDescription: Yup.string(),
            maxServiceCommissionValue: Yup.string()
                .required('Required'),
            serviceCommisionCalculation: Yup.string()
                .required('Required'),
            serviceCommission: Yup.string()
                .required('Required'),
            serviceCommisionGLAcccountId: Yup.string()
                .required('Required'),
        });

        return (
            <Modal show={showEditRecord} onHide={this.handleEditRecordClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={true}>
                <Modal.Header>
                    {this.state.updateType === "edit" && <Modal.Title>Edit</Modal.Title>}
                    {this.state.updateType === "activate" && <Modal.Title>Confirm Activation</Modal.Title>}
                    {this.state.updateType === "deactivate" && <Modal.Title>Confirm De-Activation</Modal.Title>}

                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: recordToUpdate.serviceName,
                            serviceCode: recordToUpdate.serviceCode,
                            serviceDescription: recordToUpdate.serviceDescription,
                            maxServiceCommissionValue: recordToUpdate.maxServiceCommissionValue,
                            serviceCommisionCalculation: recordToUpdate.serviceCommisionCalculation,
                            serviceCommission: recordToUpdate.serviceCommission,
                            serviceCommisionGLAcccountId: recordToUpdate.serviceCommisionGLAcccountId,
                        }}
                        validationSchema={checkValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // same shape as initial values

                            let requestPayload;
                            if (this.state.updateType === "edit") {
                                requestPayload = {
                                    name: values.name,
                                    serviceCode: values.serviceCode,
                                    serviceDescription: values.serviceDescription,
                                    maxServiceCommissionValue: parseFloat(values.maxServiceCommissionValue),
                                    serviceCommisionCalculation: parseInt(values.serviceCommisionCalculation),
                                    serviceCommission: parseFloat(values.serviceCommission),
                                    serviceCommisionGLAcccountId: values.serviceCommisionGLAcccountId,
                                    objectState: recordToUpdate.objectState
                                };
                            }

                            if (this.state.updateType === "activate") {
                                requestPayload = {
                                    name: recordToUpdate.serviceName,
                                    serviceCode: recordToUpdate.serviceCode,
                                    serviceDescription: recordToUpdate.serviceDescription,
                                    maxServiceCommissionValue: recordToUpdate.maxServiceCommissionValue,
                                    serviceCommisionCalculation: recordToUpdate.serviceCommisionCalculation,
                                    serviceCommission: recordToUpdate.serviceCommission,
                                    serviceCommisionGLAcccountId: recordToUpdate.serviceCommisionGLAcccountId,
                                    objectState: 0
                                };
                            }

                            if (this.state.updateType === "deactivate") {
                                requestPayload = {
                                    name: recordToUpdate.serviceName,
                                    serviceCode: recordToUpdate.serviceCode,
                                    serviceDescription: recordToUpdate.serviceDescription,
                                    maxServiceCommissionValue: recordToUpdate.maxServiceCommissionValue,
                                    serviceCommisionCalculation: recordToUpdate.serviceCommisionCalculation,
                                    serviceCommission: recordToUpdate.serviceCommission,
                                    serviceCommisionGLAcccountId: recordToUpdate.serviceCommisionGLAcccountId,
                                    objectState: 1
                                };
                            }






                            this.updateARecord(requestPayload, recordToUpdate.encodedKey)
                                .then(
                                    () => {
                                        if (this.props.updateAChannelServices.request_status === administrationConstants.UPDATE_A_CHANNEL_SERVICE_SUCCESS) {

                                            // this.loadInitialData();
                                        }

                                    }
                                )




                        }}
                    >
                        {({ handleSubmit,
                            handleChange,
                            handleBlur,
                            setFieldValue,
                            setFieldTouched,
                            resetForm,
                            values,
                            touched,
                            isValid,
                            errors, }) => {
                            // console.log("data is",values, errors);
                            return (
                                <Form noValidate
                                    onSubmit={handleSubmit}>
                                    
                                    <Form.Row>

                                        <Col>
                                            <Form.Label className="block-level">Service name</Form.Label>
                                            <Form.Control type="text"
                                                onChange={(e) => {
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("name", recordToUpdate.serviceName)
                                                    } else {
                                                        setFieldValue("name", e.target.value)
                                                    }

                                                }}
                                                disabled={this.state.updateType !== "edit"}
                                                value={values.name}
                                                className={errors.name && touched.name ? "is-invalid h-38px" : "h-38px"}
                                                name="name"
                                                required />

                                            {errors.name && touched.name ? (
                                                <span className="invalid-feedback">{errors.name}</span>
                                            ) : null}

                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Service Code</Form.Label>
                                            <Form.Control type="text"
                                                onChange={(e) => {
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("serviceCode", recordToUpdate.serviceCode)
                                                    } else {
                                                        setFieldValue("serviceCode", e.target.value)
                                                    }

                                                }}
                                                disabled={this.state.updateType !== "edit"}
                                                value={values.serviceCode}
                                                className={errors.serviceCode && touched.serviceCode ? "is-invalid h-38px" : "h-38px"}
                                                name="serviceCode"
                                                required />

                                            {errors.serviceCode && touched.serviceCode ? (
                                                <span className="invalid-feedback">{errors.serviceCode}</span>
                                            ) : null}

                                        </Col>

                                    </Form.Row>
                                    <Form.Row>

                                        <Col>
                                            <Form.Label className="block-level">Max Service Commission</Form.Label>
                                            <Form.Control type="text"
                                                onChange={(e) => {
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("maxServiceCommissionValue", recordToUpdate.maxServiceCommissionValue)
                                                    } else {
                                                        setFieldValue("maxServiceCommissionValue", e.target.value)
                                                    }

                                                }}
                                                disabled={this.state.updateType !== "edit"}
                                                value={numberWithCommas(values.maxServiceCommissionValue)}
                                                className={errors.maxServiceCommissionValue && touched.maxServiceCommissionValue ? "is-invalid h-38px" : "h-38px"}
                                                name="maxServiceCommissionValue"
                                                required />

                                            {errors.maxServiceCommissionValue && touched.maxServiceCommissionValue ? (
                                                <span className="invalid-feedback">{errors.maxServiceCommissionValue}</span>
                                            ) : null}

                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Service Commision Calculation</Form.Label>
                                            <select id="toshow"
                                                name="serviceCommisionCalculation"
                                                onChange={(e) => {
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("serviceCommisionCalculation", recordToUpdate.serviceCommisionCalculation)
                                                    } else {
                                                        setFieldValue("serviceCommisionCalculation", e.target.value)
                                                    }

                                                }}
                                                disabled={this.state.updateType !== "edit"}
                                                value={values.serviceCommisionCalculation}
                                                className={errors.serviceCommisionCalculation && touched.serviceCommisionCalculation ? "form-control form-control-sm is-invalid h-38px" : "form-control form-control-sm h-38px"}
                                            >
                                                <option value="">Select</option>
                                                <option value="1">Fixed Value</option>
                                                <option value="2">Percentage</option>
                                            </select>
                                            

                                            {errors.serviceCommisionCalculation && touched.serviceCommisionCalculation ? (
                                                <span className="invalid-feedback">{errors.serviceCommisionCalculation}</span>
                                            ) : null}

                                        </Col>

                                    </Form.Row>

                                    <Form.Row>

                                        <Col>
                                            <Form.Label className="block-level">Service Commission</Form.Label>
                                            <Form.Control type="text"
                                                onChange={(e) => {
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("serviceCommission", recordToUpdate.serviceCommission)
                                                    } else {
                                                        setFieldValue("serviceCommission", e.target.value)
                                                    }

                                                }}
                                                disabled={this.state.updateType !== "edit"}
                                                value={numberWithCommas(values.serviceCommission)}
                                                className={errors.serviceCommission && touched.serviceCommission ? "is-invalid h-38px" : "h-38px"}
                                                name="serviceCommission"
                                                required />

                                            {errors.serviceCommission && touched.serviceCommission ? (
                                                <span className="invalid-feedback">{errors.serviceCommission}</span>
                                            ) : null}

                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Service Commision GL Account</Form.Label>
                                            <Select
                                                options={allAccountsList}
                                                defaultValue ={{label:filteredData!==null?filteredData.label:null, 
                                                    value:filteredData!==null? filteredData.value:null}}
                                                onChange={(selectedAccount) => {
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("serviceCommisionGLAcccountId", recordToUpdate.serviceCommisionGLAcccountId)
                                                    } else {
                                                        this.setState({ selectedAccount });
                                                        errors.serviceCommisionGLAcccountId = null
                                                        values.serviceCommisionGLAcccountId = selectedAccount.value
                                                    }
                                                    
                                                }}
                                                isDisabled={this.state.updateType !== "edit"}
                                                className={errors.serviceCommisionGLAcccountId && touched.serviceCommisionGLAcccountId ? "is-invalid" : null}
                                                // value="serviceCommisionGLAcccountId"
                                                name="serviceCommisionGLAcccountId"
                                                // value={values.serviceCommisionGLAcccountId || ''}
                                                required
                                            />


                                            {errors.serviceCommisionGLAcccountId && touched.serviceCommisionGLAcccountId ? (
                                                <span className="invalid-feedback">{errors.serviceCommisionGLAcccountId}</span>
                                            ) : null}

                                        </Col>

                                    </Form.Row>
                                    
                                    
                                    <Form.Group>
                                        <Form.Label className="block-level">Service Description</Form.Label>
                                        <Form.Control
                                            as="textarea" rows="3"
                                            onChange={(e) => {
                                                if (this.state.updateType !== "edit") {
                                                    setFieldValue("serviceDescription", recordToUpdate.serviceDescription)
                                                } else {
                                                    setFieldValue("serviceDescription", e.target.value)
                                                }

                                            }}
                                            disabled={this.state.updateType !== "edit"}
                                            value={values.serviceDescription}
                                            className={errors.serviceDescription && touched.serviceDescription ? "is-invalid" : null}
                                            name="serviceDescription"
                                        />

                                        {errors.serviceDescription && touched.serviceDescription ? (
                                            <span className="invalid-feedback">{errors.serviceDescription}</span>
                                        ) : null}
                                    </Form.Group>



                                    <div className="footer-with-cta toleft">
                                        <Button
                                            disabled={updateAChannelServicesRequest.is_request_processing}
                                            variant="secondary" className="grayed-out" onClick={this.handleEditRecordClose}>Cancel</Button>
                                        <Button
                                            type="submit"
                                            disabled={updateAChannelServicesRequest.is_request_processing}>
                                            {updateAChannelServicesRequest.is_request_processing && "Please wait..."}
                                            {(!updateAChannelServicesRequest.is_request_processing && this.state.updateType === "edit") && "Update"}
                                            {(!updateAChannelServicesRequest.is_request_processing && this.state.updateType === "activate") && "Activate"}
                                            {(!updateAChannelServicesRequest.is_request_processing && this.state.updateType === "deactivate") && "De-Activate"}
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                    {updateAChannelServicesRequest.request_status === administrationConstants.UPDATE_A_CHANNEL_SERVICE_SUCCESS &&
                        <Alert variant="success">
                            {updateAChannelServicesRequest.request_data.response.data.message}
                        </Alert>
                    }
                    {updateAChannelServicesRequest.request_status === administrationConstants.UPDATE_A_CHANNEL_SERVICE_FAILURE &&
                        <Alert variant="danger">
                            {updateAChannelServicesRequest.request_data.error}
                        </Alert>
                    }
                </Modal.Body>
            </Modal>
        )
    }

    renderContentWrap = () => {
        let fetchAllChannelServicesRequest = this.props.fetchAllChannelServicesReducer;

       
        let saveRequestData = fetchAllChannelServicesRequest.request_data !== undefined ? fetchAllChannelServicesRequest.request_data.tempData : null;

        switch (fetchAllChannelServicesRequest.request_status) {
            case (administrationConstants.GET_ALL_CHANNEL_SERVICE_PENDING):

                if ((saveRequestData === undefined) || (saveRequestData !== undefined && saveRequestData.length < 1)) {
                    return (
                        <div className="loading-content">
                            <div className="heading-with-cta">
                                <Form className="one-liner">

                                    <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                        <Form.Control as="select" size="sm">
                                            <option>No Filter</option>
                                            <option>Add New Filter</option>
                                            <option>Custom Filter</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                </Form>

                                <div className="pagination-wrap">
                                    <label htmlFor="toshow">Show</label>
                                    <select id="toshow" className="countdropdown form-control form-control-sm">
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
                                        <th>Service Name</th>
                                        <th>Service Code</th>
                                        <th>Commision Calculation</th>
                                        <th>Service Commission</th>
                                        <th>Max Service Commission</th>
                                        <th>Service Description</th>
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
                                        <td></td>
                                    </tr>
                                </tbody>
                            </TableComponent>
                            <div className="loading-text">Please wait... </div>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <div className="heading-with-cta">
                                <Form className="one-liner">

                                    <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                        <Form.Control as="select" size="sm">
                                            <option>No Filter</option>
                                            <option>Add New Filter</option>
                                            <option>Custom Filter</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="table-filters">
                                                
             <DatePicker autoComplete="new-off"
                                        onChangeRaw={this.handleDateChangeRaw}
                                            onChange={this.handleStartDatePicker}
                                            selected={this.state.startDate}
                                            dateFormat={window.dateformat}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            placeholderText="Start date"
                                                            autoComplete="new-password"
                                            maxDate={new Date()}
                                            // className="form-control form-control-sm h-38px"
                                            className="form-control form-control-sm "

                                        />
                                         <DatePicker autoComplete="new-off" 

placeholderText="End  date"
                                            onChangeRaw={this.handleDateChangeRaw}
                                            onChange={this.handleEndDatePicker}
                                            selected={this.state.endDate}
                                            dateFormat={window.dateformat}
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                            maxDate={new Date()}
                                            // className="form-control form-control-sm h-38px"
                                            className="form-control form-control-sm"

                                        />
                                        <input type="text"
                                            className="form-control-sm search-table form-control"
                                            placeholder="Search text"
                                            value={this.state.SearchText}
                                            onChange={(e) => {
                                                this.setState({ SearchText: e.target.value.trim() })
                                            }}
                                        />
                                        {/* {errors.startDate && touched.startDate ? (
                                                <span className="invalid-feedback">{errors.startDate}</span>
                                            ) : null} */}
                                    </Form.Group>
                                    <Button className="no-margins" variant="primary" type="submit" >Filter</Button>
                                </Form>

                                <div className="pagination-wrap">
                                    <label htmlFor="toshow">Show</label>
                                    <select id="toshow"
                                        // onChange={this.setPagesize}
                                        value={this.state.PageSize}
                                        className="countdropdown form-control form-control-sm">
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
                                        <th>Service Name</th>
                                        <th>Service Code</th>
                                        <th>Commision Calculation</th>
                                        <th>Service Commission</th>
                                        <th>Max Service Commission</th>
                                        <th>Service Description</th>
                                        <th>Status</th>
                                        <th>Date Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        saveRequestData.map((eachItem, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <tr>
                                                        <td>{eachItem.serviceName}</td>
                                                        <td>{eachItem.serviceCode}</td>
                                                        <td>{eachItem.serviceCommisionCalculationDescription}</td>
                                                        <td>{numberWithCommas(eachItem.serviceCommission, true)}</td>
                                                        <td>{numberWithCommas(eachItem.maxServiceCommissionValue, true)}</td>
                                                        <td>{eachItem.serviceDescription}</td>
                                                        <td>{eachItem.objectStateDescription}</td>
                                                        <td>{getDateFromISO(eachItem.dateCreated)}</td>
                                                        <td>
                                                            <DropdownButton
                                                                size="sm"
                                                                title="Actions"
                                                                key="activeCurrency"
                                                                className="customone"
                                                            >
                                                                {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                                                                <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                                                                {eachItem.objectState === 0 && <Dropdown.Item eventKey="1">Activate</Dropdown.Item>}
                                                                {eachItem.objectState === 1 && <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>}
                                                            </DropdownButton>
                                                        </td>
                                                    </tr>
                                                </Fragment>
                                            )
                                        })
                                    }
                                </tbody>
                            </TableComponent>
                        </div>
                    )
                }

            case (administrationConstants.GET_ALL_CHANNEL_SERVICE_SUCCESS):
                
                let allFetchedData = fetchAllChannelServicesRequest.request_data.response.data;
                if (allFetchedData !== undefined) {
                    if (allFetchedData.result.length >= 1) {
                        return (
                            <div>
                                <div className="heading-with-cta ">
                                    <div>
                                        <input type="checkbox" name=""
                                            onChange={(e) => this.setShowDeactivated(e, allFetchedData.result)}

                                            checked={this.state.ShowDeactivated}
                                            id="showFullDetails" />
                                        <label htmlFor="showFullDetails">Show Deactivated</label>
                                    </div>
                                    <Button onClick={this.handleShowNewRecord} className="no-margins" variant="primary" type="submit">Create New</Button>
                                </div>
                                <div className="table-helper mb-10">
                                    {/* <input type="checkbox" name=""
                                        onChange={(e) => this.setShowDeactivated(e, allFetchedData.result)}

                                        checked={this.state.ShowDeactivated}
                                        id="showFullDetails" />
                                    <label htmlFor="showFullDetails">Show Deactivated</label> */}
                                </div>
                                <div className="heading-with-cta">
                                    <Form className="one-liner" onSubmit={(e) => this.searchAllData(e, allFetchedData.result)}>

                                        <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                            <Form.Control as="select" size="sm">
                                                <option>No Filter</option>
                                                <option>Add New Filter</option>
                                                <option>Custom Filter</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group className="table-filters">
                                                
             <DatePicker autoComplete="new-off"
                                        onChangeRaw={this.handleDateChangeRaw}
                                                onChange={this.handleStartDatePicker}
                                                selected={this.state.startDate}
                                                dateFormat={window.dateformat}
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                placeholderText="Start date"
                                                            autoComplete="new-password"
                                                maxDate={new Date()}
                                                // className="form-control form-control-sm h-38px"
                                                className="form-control form-control-sm "

                                            />
                                             <DatePicker autoComplete="new-off" 

placeholderText="End  date"
                                                onChangeRaw={this.handleDateChangeRaw}
                                                onChange={this.handleEndDatePicker}
                                                selected={this.state.endDate}
                                                dateFormat={window.dateformat}
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                maxDate={new Date()}
                                                // className="form-control form-control-sm h-38px"
                                                className="form-control form-control-sm"

                                            />
                                            <input type="text"
                                                className="form-control-sm search-table form-control"
                                                placeholder="Search text"
                                                value={this.state.SearchText}
                                                onChange={(e) => {
                                                    this.setState({ SearchText: e.target.value.trim() })
                                                }}
                                            />
                                            {/* {errors.startDate && touched.startDate ? (
    <span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
                                        </Form.Group>

                                        <Button className="no-margins" variant="primary" type="submit" >Filter</Button>
                                        <div className="actions-wrap">
                                            <Button onClick={this.exportClients} className="action-icon" variant="outline-secondary" type="button">
                                                <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg==" width="16" height="16" />
                                            </Button>
                                        </div>
                                    </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow"
                                            onChange={(e) => this.setPagesize(e, allFetchedData.result)}
                                            value={this.state.PageSize}
                                            className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
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
                                

                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Service Name</th>
                                            <th>Service Code</th>
                                            <th>Commision Calculation</th>
                                            <th>Service Commission (&#x20A6;)</th>
                                            <th>Max Service Commission (&#x20A6;)</th>
                                            <th>Service Description</th>
                                            <th>Status</th>
                                            <th>Date Created</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allFetchedData.result.map((eachItem, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <tr>
                                                            <td>{eachItem.serviceName}</td>
                                                            <td>{eachItem.serviceCode}</td>
                                                            <td>{eachItem.serviceCommisionCalculationDescription}</td>
                                                            <td>{numberWithCommas(eachItem.serviceCommission, true)}</td>
                                                            <td>{numberWithCommas(eachItem.maxServiceCommissionValue, true)}</td>
                                                            <td>{eachItem.serviceDescription}</td>
                                                            <td>{eachItem.objectStateDescription}</td>
                                                            <td>{getDateFromISO(eachItem.dateCreated)}</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <Dropdown.Item eventKey="1" onClick={() => this.handleEditRecordShow(eachItem, "edit")}>Edit</Dropdown.Item>
                                                                    {eachItem.objectState === 1 && <Dropdown.Item eventKey="1" onClick={() => this.handleEditRecordShow(eachItem, "activate")}>Activate</Dropdown.Item>}
                                                                    {eachItem.objectState === 0 && <Dropdown.Item eventKey="1" onClick={() => this.handleEditRecordShow(eachItem, "deactivate")}>Deactivate</Dropdown.Item>}
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </tbody>
                                </TableComponent>

                            </div>
                        )
                    } else {
                        return (
                            <div className="no-records">
                                <div className="heading-with-cta">
                                    <Form className="one-liner" onSubmit={(e) => this.searchAllData(e, allFetchedData.result)}>

                                       
                                        <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                            <Form.Control as="select" size="sm">
                                                <option>No Filter</option>
                                                <option>Add New Filter</option>
                                                <option>Custom Filter</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group className="table-filters">
                                                
             <DatePicker autoComplete="new-off"
                                        onChangeRaw={this.handleDateChangeRaw}
                                                onChange={this.handleStartDatePicker}
                                                selected={this.state.startDate}
                                                dateFormat={window.dateformat}
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                placeholderText="Start date"
                                                            autoComplete="new-password"
                                                maxDate={new Date()}
                                                // className="form-control form-control-sm h-38px"
                                                className="form-control form-control-sm "

                                            />
                                             <DatePicker autoComplete="new-off" 

placeholderText="End  date"
                                                onChangeRaw={this.handleDateChangeRaw}
                                                onChange={this.handleEndDatePicker}
                                                selected={this.state.endDate}
                                                dateFormat={window.dateformat}
                                                peekNextMonth
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                maxDate={new Date()}
                                                // className="form-control form-control-sm h-38px"
                                                className="form-control form-control-sm"

                                            />
                                            <input type="text"
                                                className="form-control-sm search-table form-control"
                                                placeholder="Search text"
                                                value={this.state.SearchText}
                                                onChange={(e) => {
                                                    this.setState({ SearchText: e.target.value.trim() })
                                                }}
                                            />
                                            {/* {errors.startDate && touched.startDate ? (
<span className="invalid-feedback">{errors.startDate}</span>
) : null} */}
                                        </Form.Group>

                                        <Button className="no-margins" variant="primary" type="submit" >Filter</Button>
                                        <div className="actions-wrap">
                                            <Button onClick={this.exportData} className="action-icon" variant="outline-secondary" type="button">
                                                <img alt="download excel" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg==" width="16" height="16" />
                                            </Button>
                                        </div>
                                    </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow" className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>

                                    </div>
                                </div>
                                <div className="table-helper mb-10 text-left">
                                    <div>
                                        <input type="checkbox" name=""
                                            onChange={(e) => this.setShowDeactivated(e, allFetchedData.result)}

                                            checked={this.state.ShowDeactivated}
                                            id="showFullDetails" />
                                        <label htmlFor="showFullDetails">Show Deactivated</label>
                                    </div>

                                </div>
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Service Name</th>
                                            <th>Service Code</th>
                                            <th>Commision Calculation</th>
                                            <th>Service Commission</th>
                                            <th>Max Service Commission</th>
                                            <th>Service Description</th>
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
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </TableComponent>

                                <div className="footer-with-cta toleft">
                                    <Button onClick={this.handleShowNewRecord} className="no-margins" variant="primary" type="submit">Create New</Button>
                                </div>
                            </div>
                        )
                    }
                } else {
                    return null;
                }

            case (administrationConstants.GET_ALL_CHANNEL_SERVICE_FAILURE):
                return (
                    <div className="loading-content errormsg">
                        <div>{fetchAllChannelServicesRequest.request_data.error}</div>
                    </div>
                )
            default:
                return null;
        }
    }


    render() {
        let { recordToUpdate, showCreateNewRecord, showEditRecord } = this.state;
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    {showCreateNewRecord && this.createNewRecordPopUp()}
                    {(recordToUpdate && showEditRecord) && this.updateRecordPopUp()}
                    <div className="content-wrapper">
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Administration</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
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
                                                <NavLink to={'/administration/general/customer-types'}>Customer Types</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/control'}>Internal Control</NavLink>
                                            </li>
                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="middle-content">
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
        fetchAllChannelServicesReducer: state.administrationReducers.fetchAllChannelServices,
        getAChannelServices: state.administrationReducers.getAChannelServices,
        createAChannelServices : state.administrationReducers.createAChannelServices,
        updateAChannelServices : state.administrationReducers.updateAChannelServices,
    };
}

export default connect(mapStateToProps)(TransactionServices);