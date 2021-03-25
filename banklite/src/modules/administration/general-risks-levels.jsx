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
class RiskLevels extends React.Component {
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

        dispatch(administrationActions.fetchAllRiskLevel(paramters));
        
    }

    clearAllData = () => {
        this.props.dispatch(administrationActions.createARiskLevel("CLEAR"));
        this.props.dispatch(administrationActions.updateARiskLevel("CLEAR"));
    }

    setPagesize = (PageSize, tempData) => {
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value,
            { CurrentPage, CurrentSelectedPage, ShowDeactivated } = this.state;

        this.setState({ PageSize: sizeOfPage });

        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&ShowDeactivated=${ShowDeactivated}`;
        // this.fetchAllRecords(params);

        if (tempData) {
            dispatch(administrationActions.fetchAllRiskLevel(params, tempData));
        } else {
            dispatch(administrationActions.fetchAllRiskLevel(params));
        }
    }

    setShowDeactivated = (ShowDeactivated, tempData) => {
        const { dispatch } = this.props;

        let showNonActive = ShowDeactivated.target.checked,
            { CurrentPage, CurrentSelectedPage, PageSize } = this.state;

        this.setState({ ShowDeactivated: showNonActive });

        let params = `ShowDeactivated=${showNonActive}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;

        if (tempData) {
            dispatch(administrationActions.fetchAllRiskLevel(params, tempData));
        } else {
            dispatch(administrationActions.fetchAllRiskLevel(params));
        }

    }

    


    loadNextPage = (nextPage, tempData) => {

        const { dispatch } = this.props;
        let { PageSize } = this.state;

        // this.setState({PageSize: sizeOfPage});

        let params = `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);


        if (tempData) {
            dispatch(administrationActions.fetchAllRiskLevel(params, tempData));
        } else {
            dispatch(administrationActions.fetchAllRiskLevel(params));
        }
    }

    handleCloseNewRecord = () => {
        if (this.props.createARiskLevel.is_request_processing === false) {
            this.setState({ showCreateNewRecord: false })
            
        }
    }

    handleShowNewRecord = () => {
        this.clearAllData();
        this.setState({ showCreateNewRecord: true })
    };

    handleEditRecordClose = () => {
        if (this.props.updateARiskLevel.is_request_processing === false) {
            this.setState({ showEditRecord: false });
        }
    }

    handleEditRecordShow = (recordToUpdate, updateType) => {
        this.clearAllData()
        this.setState({ updateType, recordToUpdate, showEditRecord: true, });
    }

    createNewRecordPopUp = () => {


        let { showCreateNewRecord} = this.state;
        let createARiskLevelRequest = this.props.createARiskLevel;

        // let getAllCurrencies =  this.props.adminGetAllCurrencies;


        let checkValidationSchema = Yup.object().shape({
            name: Yup.string()
                .required('Required'),
            fromDays: Yup.string()
                .required('Required'),
            toDays: Yup.string()
                .required('Required'),
            percentageProvision: Yup.string()
                .required('Required'),
        });
        return (
            <Modal show={showCreateNewRecord} onHide={this.handleCloseNewRecord} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={true}>
                <Modal.Header>
                    <Modal.Title>Add Risk Level</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            name: '',
                            fromDays: '',
                            toDays: '',
                            percentageProvision: '',
                        }}
                        validationSchema={checkValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // same shape as initial values

                            let requestPayload = {
                                name: values.name,
                                fromDays: parseInt(values.fromDays),
                                toDays: parseInt(values.toDays),
                                percentageProvision: parseFloat(values.percentageProvision.replace(/,/g, '')),
                            };

                            


                            
                            this.createNewRecord(requestPayload)
                                .then(
                                    () => {
                                        if (this.props.createARiskLevel.request_status === administrationConstants.ADD_A_RISK_LEVEL_SUCCESS) {
                                            resetForm();
                                            this.loadInitialData();
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
                                            <Form.Label className="block-level"> Name</Form.Label>
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

                                    </Form.Row>
                                    <Form.Row>

                                        <Col>
                                            <Form.Label className="block-level">From(days)</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handleChange}
                                                value={numberWithCommas(values.fromDays)}
                                                className={errors.fromDays && touched.fromDays ? "is-invalid h-38px" : "h-38px"}
                                                name="fromDays"
                                                required />

                                            {errors.fromDays && touched.fromDays ? (
                                                <span className="invalid-feedback">{errors.fromDays}</span>
                                            ) : null}

                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">To(days)</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handleChange}
                                                value={numberWithCommas(values.toDays)}
                                                className={errors.toDays && touched.toDays ? "is-invalid h-38px" : "h-38px"}
                                                name="toDays"
                                                required />

                                            {errors.toDays && touched.toDays ? (
                                                <span className="invalid-feedback">{errors.toDays}</span>
                                            ) : null}

                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Provision %</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handleChange}
                                                value={numberWithCommas(values.percentageProvision)}
                                                className={errors.percentageProvision && touched.percentageProvision ? "is-invalid h-38px" : "h-38px"}
                                                name="percentageProvision"
                                                required />

                                            {errors.percentageProvision && touched.percentageProvision ? (
                                                <span className="invalid-feedback">{errors.percentageProvision}</span>
                                            ) : null}

                                        </Col>
                                        

                                    </Form.Row>
                                    

                                    <div className="footer-with-cta toleft">
                                        <Button
                                            disabled={createARiskLevelRequest.is_request_processing}
                                            variant="secondary" className="grayed-out" onClick={this.handleCloseNewRecord}>Cancel</Button>
                                        <Button
                                            type="submit"
                                            disabled={createARiskLevelRequest.is_request_processing}>
                                            {createARiskLevelRequest.is_request_processing ? "Please wait..." : "Create"}
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                    {createARiskLevelRequest.request_status === administrationConstants.ADD_A_RISK_LEVEL_SUCCESS &&
                        <Alert variant="success">
                            {createARiskLevelRequest.request_data.response.data.message}
                        </Alert>
                    }
                    {createARiskLevelRequest.request_status === administrationConstants.ADD_A_RISK_LEVEL_FAILURE &&
                        <Alert variant="danger">
                            {createARiskLevelRequest.request_data.error}
                        </Alert>
                    }
                </Modal.Body>
            </Modal>
        )
    }

    createNewRecord = async (payload) => {
        const { dispatch } = this.props;



        await dispatch(administrationActions.createARiskLevel(payload));


    }

    updateARecord = async (payload, encodedKey) => {
        const { dispatch } = this.props;


        await dispatch(administrationActions.updateARiskLevel(payload, encodedKey));


    }

    updateRecordPopUp = (updateType) => {


        let { showEditRecord,
            recordToUpdate,
        } = this.state;
        let updateARiskLevelRequest = this.props.updateARiskLevel;

        // let getAllCurrencies =  this.props.adminGetAllCurrencies;


        let checkValidationSchema = Yup.object().shape({
            name: Yup.string()
                .required('Required'),
            fromDays: Yup.string()
                .required('Required'),
            toDays: Yup.string()
                .required('Required'),
            percentageProvision: Yup.string()
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
                            name: recordToUpdate.name||"",
                            fromDays: recordToUpdate.fromDays||"",
                            toDays: recordToUpdate.toDays||"",
                            percentageProvision: recordToUpdate.percentageProvision||"",
                        }}
                        validationSchema={checkValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // same shape as initial values

                            let requestPayload;
                            if (this.state.updateType === "edit") {
                                requestPayload = {
                                    name: values.name,
                                    fromDays: parseInt(values.fromDays),
                                    toDays: parseInt(values.toDays),
                                    percentageProvision: parseFloat(values.percentageProvision.replace(/,/g, '')),
                                    objectState: recordToUpdate.objectState
                                };
                            }

                            if (this.state.updateType === "activate") {
                                requestPayload = {
                                    name: recordToUpdate.name,
                                    fromDays: parseInt(recordToUpdate.fromDays),
                                    toDays: parseInt(recordToUpdate.toDays),
                                    percentageProvision: parseFloat(recordToUpdate.percentageProvision.replace(/,/g, '')),
                                    objectState: 0
                                };
                            }

                            if (this.state.updateType === "deactivate") {
                                requestPayload = {
                                    name: recordToUpdate.name,
                                    fromDays: parseInt(recordToUpdate.fromDays),
                                    toDays: parseInt(recordToUpdate.toDays),
                                    percentageProvision: parseFloat(recordToUpdate.percentageProvision.replace(/,/g, '')),
                                    objectState: 1
                                };
                            }






                            this.updateARecord(requestPayload, recordToUpdate.encodedKey)
                                .then(
                                    () => {
                                        if (this.props.updateARiskLevel.request_status === administrationConstants.UPDATE_A_RISK_LEVEL_SUCCESS) {

                                            this.loadInitialData();
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
                                            <Form.Label className="block-level">Name</Form.Label>
                                            <Form.Control type="text"
                                                onChange={(e) => {
                                                    console.log("dsdsdsdsd", this.state.updateType);
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("name", recordToUpdate.name)
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

                                    </Form.Row>
                                    <Form.Row>

                                        <Col>
                                            <Form.Label className="block-level">From (days) </Form.Label>
                                            <Form.Control type="text"
                                                onChange={(e) => {
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("fromDays", recordToUpdate.fromDays)
                                                    } else {
                                                        setFieldValue("fromDays", e.target.value)
                                                    }

                                                }}
                                                disabled={this.state.updateType !== "edit"}
                                                value={numberWithCommas(values.fromDays)}
                                                className={errors.fromDays && touched.fromDays ? "is-invalid h-38px" : "h-38px"}
                                                name="fromDays"
                                                required />

                                            {errors.fromDays && touched.fromDays ? (
                                                <span className="invalid-feedback">{errors.fromDays}</span>
                                            ) : null}

                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">To(days) </Form.Label>
                                            <Form.Control type="text"
                                                onChange={(e) => {
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("toDays", recordToUpdate.toDays)
                                                    } else {
                                                        setFieldValue("toDays", e.target.value)
                                                    }

                                                }}
                                                disabled={this.state.updateType !== "edit"}
                                                value={numberWithCommas(values.toDays)}
                                                className={errors.toDays && touched.toDays ? "is-invalid h-38px" : "h-38px"}
                                                name="toDays"
                                                required />

                                            {errors.toDays && touched.toDays ? (
                                                <span className="invalid-feedback">{errors.toDays}</span>
                                            ) : null}

                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Provision %</Form.Label>
                                            <Form.Control type="text"
                                                onChange={(e) => {
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("percentageProvision", recordToUpdate.percentageProvision)
                                                    } else {
                                                        setFieldValue("percentageProvision", e.target.value)
                                                    }

                                                }}
                                                disabled={this.state.updateType !== "edit"}
                                                value={numberWithCommas(values.percentageProvision)}
                                                className={errors.percentageProvision && touched.percentageProvision ? "is-invalid h-38px" : "h-38px"}
                                                name="percentageProvision"
                                                required />

                                            {errors.percentageProvision && touched.percentageProvision ? (
                                                <span className="invalid-feedback">{errors.percentageProvision}</span>
                                            ) : null}

                                        </Col>
                                        

                                    </Form.Row>
                                 

                                    <div className="footer-with-cta toleft">
                                        <Button
                                            disabled={updateARiskLevelRequest.is_request_processing}
                                            variant="secondary" className="grayed-out" onClick={this.handleEditRecordClose}>Cancel</Button>
                                        <Button
                                            type="submit"
                                            disabled={updateARiskLevelRequest.is_request_processing}>
                                            {updateARiskLevelRequest.is_request_processing && "Please wait..."}
                                            {(!updateARiskLevelRequest.is_request_processing && this.state.updateType === "edit") && "Update"}
                                            {(!updateARiskLevelRequest.is_request_processing && this.state.updateType === "activate") && "Activate"}
                                            {(!updateARiskLevelRequest.is_request_processing && this.state.updateType === "deactivate") && "De-Activate"}
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                    {updateARiskLevelRequest.request_status === administrationConstants.UPDATE_A_RISK_LEVEL_SUCCESS &&
                        <Alert variant="success">
                            {updateARiskLevelRequest.request_data.response.data.message}
                        </Alert>
                    }
                    {updateARiskLevelRequest.request_status === administrationConstants.UPDATE_A_RISK_LEVEL_FAILURE &&
                        <Alert variant="danger">
                            {updateARiskLevelRequest.request_data.error}
                        </Alert>
                    }
                </Modal.Body>
            </Modal>
        )
    }
    
    renderContentWrap = () => {
        let fetchAllRiskLevelRequest = this.props.fetchAllRiskLevel;
        
        let saveRequestData = fetchAllRiskLevelRequest.request_data !== undefined ? fetchAllRiskLevelRequest.request_data.tempData : null;

        switch (fetchAllRiskLevelRequest.request_status) {
            case (administrationConstants.GET_ALL_RISK_LEVEL_PENDING):

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
                                            <th>Name</th>
                                            <th>Days</th>
                                            <th>Provision(%) </th>
                                            {/* <th>Status</th> */}
                                            <th>Date Created</th>
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
                                            dateFormat="d MMMM, yyyy"
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
                                            dateFormat="d MMMM, yyyy"
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
                                        <th>Name</th>
                                        <th>Days</th>
                                        <th>Provision(%) </th>
                                        {/* <th>Status</th> */}
                                        <th>Date Created</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        saveRequestData.map((eachItem, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <tr>
                                                        <td>{eachItem.name}</td>
                                                        <td>{eachItem.fromDays} to {eachItem.toDays} days</td>
                                                        <td>{eachItem.percentageProvision}</td>
                                                        {/* <td>{eachItem.objectStateDescription}</td> */}
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

            case (administrationConstants.GET_ALL_RISK_LEVEL_SUCCESS):
                let allFetchedData = fetchAllRiskLevelRequest.request_data.response.data;
                if (allFetchedData !== undefined) {
                    if (allFetchedData.result.length >= 1) {
                        return (
                            <div>
                                
                                
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
                                                dateFormat="d MMMM, yyyy"
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
                                                dateFormat="d MMMM, yyyy"
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
                                <div className="heading-with-cta ">
                                    <div>
                                        {/* <input type="checkbox" name=""
                                        onChange={(e) => this.setShowDeactivated(e, allFetchedData.result)}

                                        checked={this.state.ShowDeactivated}
                                        id="showFullDetails" />
                                    <label htmlFor="showFullDetails">Show Deactivated</label> */}
                                    </div>
                                    <Button onClick={this.handleShowNewRecord} className="no-margins" variant="primary" type="submit">Create New</Button>
                                </div>
                                

                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Days</th>
                                            <th>Provision(%) </th>
                                            {/* <th>Status</th> */}
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
                                                            <td>{eachItem.name}</td>
                                                            <td>{eachItem.fromDays} to {eachItem.toDays} days</td>
                                                            <td>{eachItem.percentageProvision}</td>
                                                            {/* <td>{eachItem.objectStateDescription}</td> */}
                                                            <td>{getDateFromISO(eachItem.dateCreated)}</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                                                                    <Dropdown.Item eventKey="1" onClick={() => this.handleEditRecordShow(eachItem, "edit")}>Edit</Dropdown.Item>
                                                                    {/* {eachItem.objectState === 1 && <Dropdown.Item eventKey="1" onClick={() => this.handleEditRecordShow(eachItem, "activate")}>Activate</Dropdown.Item>}
                                                                    {eachItem.objectState === 0 && <Dropdown.Item eventKey="1" onClick={() => this.handleEditRecordShow(eachItem, "deactivate")}>Deactivate</Dropdown.Item>} */}
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
                                                dateFormat="d MMMM, yyyy"
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
                                                dateFormat="d MMMM, yyyy"
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
                                            <th>Name</th>
                                            <th>Days</th>
                                            <th>Provision(%) </th>
                                            {/* <th>Status</th> */}
                                            <th>Date Created</th>
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

                                <div className="footer-with-cta toleft">
                                    <Button onClick={this.handleShowNewRecord} className="no-margins" variant="primary" type="submit">Create New</Button>
                                </div>
                            </div>
                        )
                    }
                } else {
                    return null;
                }

            case (administrationConstants.GET_ALL_RISK_LEVEL_FAILURE):
                return (
                    <div className="loading-content errormsg">
                        <div>{fetchAllRiskLevelRequest.request_data.error}</div>
                    </div>
                )
            default:
                return null;
        }
    }

    render() {
        let { recordToUpdate } = this.state;
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    {this.createNewRecordPopUp()}
                    {recordToUpdate && this.updateRecordPopUp()}
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
        fetchAllRiskLevel: state.administrationReducers.fetchAllRiskLevel,
        getARiskLevel: state.administrationReducers.getARiskLevel,
        createARiskLevel: state.administrationReducers.createARiskLevel,
        updateARiskLevel: state.administrationReducers.updateARiskLevel,
    };
}

export default connect(mapStateToProps)(RiskLevels);