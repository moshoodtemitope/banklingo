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
import PlaformNav from './menus/_plaform-menu'
// import DatePicker from '../../_helpers/datepickerfield'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { numberWithCommas, getDateFromISO, allowNumbersOnly } from '../../shared/utils';
import { platformActions } from '../../redux/actions/platform/platform.action';
import { platformConstants } from '../../redux/actiontypes/platform/platform.constants'


import Alert from 'react-bootstrap/Alert'
// import "./clients.scss"; 

import "./administration.scss"; 
class PlatformCardProvider extends React.Component {
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

        dispatch(platformActions.fetchAllCardProvider(paramters));
        
    }

    clearAllData = () => {
        this.props.dispatch(platformActions.createACardProvider("CLEAR"));
        this.props.dispatch(platformActions.updateACardProvider("CLEAR"));
    }

    setPagesize = (PageSize, tempData) => {
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value,
            { CurrentPage, CurrentSelectedPage, ShowDeactivated } = this.state;

        this.setState({ PageSize: sizeOfPage });

        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&ShowDeactivated=${ShowDeactivated}`;
        // this.fetchAllRecords(params);

        if (tempData) {
            dispatch(platformActions.fetchAllCardProvider(params, tempData));
        } else {
            dispatch(platformActions.fetchAllCardProvider(params));
        }
    }

    setShowDeactivated = (ShowDeactivated, tempData) => {
        const { dispatch } = this.props;

        let showNonActive = ShowDeactivated.target.checked,
            { CurrentPage, CurrentSelectedPage, PageSize } = this.state;

        this.setState({ ShowDeactivated: showNonActive });

        let params = `ShowDeactivated=${showNonActive}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;

        if (tempData) {
            dispatch(platformActions.fetchAllCardProvider(params, tempData));
        } else {
            dispatch(platformActions.fetchAllCardProvider(params));
        }

    }

    


    loadNextPage = (nextPage, tempData) => {

        const { dispatch } = this.props;
        let { PageSize } = this.state;

        // this.setState({PageSize: sizeOfPage});

        let params = `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);


        if (tempData) {
            dispatch(platformActions.fetchAllCardProvider(params, tempData));
        } else {
            dispatch(platformActions.fetchAllCardProvider(params));
        }
    }

    handleCloseNewRecord = () => {
        if (this.props.createACardProvider.is_request_processing === false) {
            this.setState({ showCreateNewRecord: false })
            
        }
    }

    handleShowNewRecord = () => {
        this.clearAllData();
        this.setState({ showCreateNewRecord: true })
    };

    handleEditRecordClose = () => {
        if (this.props.updateACardProvider.is_request_processing === false) {
            this.setState({ showEditRecord: false });
        }
    }

    handleEditRecordShow = (recordToUpdate, updateType) => {
        this.clearAllData()
        this.setState({ updateType, recordToUpdate, showEditRecord: true, });
    }

    createNewRecordPopUp = () => {


        let { showCreateNewRecord} = this.state;
        let createACardProviderRequest = this.props.createACardProvider;

        // let getAllCurrencies =  this.props.adminGetAllCurrencies;


        let checkValidationSchema = Yup.object().shape({
            providerCode: Yup.string()
                .required('Required'),
            providerName: Yup.string()
                .required('Required'),
            description: Yup.string()
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
                            description: '',
                            providerCode: '',
                            providerName: '',
                        }}
                        validationSchema={checkValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // same shape as initial values

                            let requestPayload = {
                                description: values.description,
                                providerCode: values.providerCode,
                                providerName: values.providerName,
                            };




                            this.createNewRecord(requestPayload)
                                .then(
                                    () => {
                                        if (this.props.createACardProvider.request_status === platformConstants.ADD_A_CARDPROVIDER_SUCCESS) {
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
                            // console.log("data is",values, errors);
                            return (
                                <Form noValidate
                                    onSubmit={handleSubmit}>
                                    <Form.Row>

                                        <Col>
                                            <Form.Label className="block-level">Provider name</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handleChange}
                                                value={values.providerName}
                                                className={errors.providerName && touched.providerName ? "is-invalid h-38px" : "h-38px"}
                                                name="providerName"
                                                required />

                                            {errors.providerName && touched.providerName ? (
                                                <span className="invalid-feedback">{errors.providerName}</span>
                                            ) : null}

                                            {errors.providerName && touched.providerName ? (
                                                <span className="invalid-feedback">{errors.providerName}</span>
                                            ) : null}
                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Provider Code</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handleChange}
                                                value={values.providerCode}
                                                className={errors.providerCode && touched.providerCode ? "is-invalid h-38px" : "h-38px"}
                                                name="providerCode"
                                                required />

                                            {errors.providerCode && touched.providerCode ? (
                                                <span className="invalid-feedback">{errors.providerCode}</span>
                                            ) : null}

                                            {errors.providerCode && touched.providerCode ? (
                                                <span className="invalid-feedback">{errors.providerCode}</span>
                                            ) : null}
                                        </Col>

                                    </Form.Row>
                                    <Form.Group>
                                        <Form.Label className="block-level">Description</Form.Label>
                                        <Form.Control
                                            as="textarea" rows="3"
                                            onChange={handleChange}
                                            value={values.description}
                                            className={errors.description && touched.description ? "is-invalid" : null}
                                            name="description"
                                        />

                                        {errors.description && touched.description ? (
                                            <span className="invalid-feedback">{errors.description}</span>
                                        ) : null}
                                    </Form.Group>

                                    <div className="footer-with-cta toleft">
                                        <Button
                                            disabled={createACardProviderRequest.is_request_processing}
                                            variant="secondary" className="grayed-out" onClick={this.handleCloseNewRecord}>Cancel</Button>
                                        <Button
                                            type="submit"
                                            disabled={createACardProviderRequest.is_request_processing}>
                                            {createACardProviderRequest.is_request_processing ? "Please wait..." : "Create"}
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                    {createACardProviderRequest.request_status === platformConstants.ADD_A_CARDPROVIDER_SUCCESS &&
                        <Alert variant="success">
                            {createACardProviderRequest.request_data.response.data.message}
                        </Alert>
                    }
                    {createACardProviderRequest.request_status === platformConstants.ADD_A_CARDPROVIDER_FAILURE &&
                        <Alert variant="danger">
                            {createACardProviderRequest.request_data.error}
                        </Alert>
                    }
                </Modal.Body>
            </Modal>
        )
    }

    createNewRecord = async (payload) => {
        const { dispatch } = this.props;



        await dispatch(platformActions.createACardProvider(payload));


    }

    updateARecord = async (payload, encodedKey) => {
        const { dispatch } = this.props;


        await dispatch(platformActions.updateACardProvider(payload, encodedKey));


    }

    updateRecordPopUp = (updateType) => {


        let { showEditRecord,
            recordToUpdate,
        } = this.state;
        let updateACardProviderRequest = this.props.updateACardProvider;

        // let getAllCurrencies =  this.props.adminGetAllCurrencies;


        let checkValidationSchema = Yup.object().shape({
            providerCode: Yup.string()
                .required('Required'),
            providerName: Yup.string()
                .required('Required'),
            description: Yup.string()
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
                            description: recordToUpdate.description,
                            providerCode: recordToUpdate.providerCode,
                            providerName: recordToUpdate.providerName,
                        }}
                        validationSchema={checkValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // same shape as initial values

                            let requestPayload;
                            if (this.state.updateType === "edit") {
                                requestPayload = {
                                    description: values.description,
                                    providerCode: values.providerCode,
                                    providerName: values.providerName,
                                    objectState: recordToUpdate.objectState
                                };
                            }

                            if (this.state.updateType === "activate") {
                                requestPayload = {
                                    description: recordToUpdate.description,
                                    providerCode: recordToUpdate.providerCode,
                                    providerName: recordToUpdate.providerName,
                                    objectState: 0
                                };
                            }

                            if (this.state.updateType === "deactivate") {
                                requestPayload = {
                                    description: recordToUpdate.description,
                                    providerCode: recordToUpdate.providerCode,
                                    providerName: recordToUpdate.providerName,
                                    objectState: 1
                                };
                            }






                            this.updateARecord(requestPayload, recordToUpdate.encodedKey)
                                .then(
                                    () => {
                                        if (this.props.updateACardProvider.request_status === platformConstants.UPDATE_A_CARDPROVIDER_SUCCESS) {

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
                                            <Form.Label className="block-level">Provider name</Form.Label>
                                            <Form.Control type="text"
                                                onChange={(e) => {
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("providerName", recordToUpdate.providerName)
                                                    } else {
                                                        setFieldValue("providerName", e.target.value)
                                                    }

                                                }}
                                                value={values.providerName}
                                                disabled={this.state.updateType !== "edit"}
                                                className={errors.providerName && touched.providerName ? "is-invalid h-38px" : "h-38px"}
                                                name="providerName"
                                                required />

                                            {errors.providerName && touched.providerName ? (
                                                <span className="invalid-feedback">{errors.providerName}</span>
                                            ) : null}

                                            
                                        </Col>

                                        <Col>
                                            <Form.Label className="block-level">Provider Code</Form.Label>
                                            <Form.Control type="text"
                                                onChange={(e) => {
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("providerCode", recordToUpdate.providerCode)
                                                    } else {
                                                        setFieldValue("providerCode", e.target.value)
                                                    }

                                                }}
                                                value={values.providerCode}
                                                className={errors.providerCode && touched.providerCode ? "is-invalid h-38px" : "h-38px"}
                                                name="providerCode"
                                                disabled={this.state.updateType !== "edit"}
                                                required />

                                            {errors.providerCode && touched.providerCode ? (
                                                <span className="invalid-feedback">{errors.providerCode}</span>
                                            ) : null}

                                        </Col>  

                                    </Form.Row>
                                    
                                    <Form.Group>
                                        <Form.Label className="block-level">Description</Form.Label>
                                        <Form.Control
                                            as="textarea" rows="3"
                                            onChange={(e) => {
                                                if (this.state.updateType !== "edit") {
                                                    setFieldValue("description", recordToUpdate.description)
                                                } else {
                                                    setFieldValue("description", e.target.value)
                                                }

                                            }}
                                            value={values.description}
                                            disabled={this.state.updateType !== "edit"}
                                            className={errors.description && touched.description ? "is-invalid" : null}
                                            name="description"
                                        />

                                        {errors.description && touched.description ? (
                                            <span className="invalid-feedback">{errors.description}</span>
                                        ) : null}
                                    </Form.Group>

                                    <div className="footer-with-cta toleft">
                                        <Button
                                            disabled={updateACardProviderRequest.is_request_processing}
                                            variant="secondary" className="grayed-out" onClick={this.handleEditRecordClose}>Cancel</Button>
                                        <Button
                                            type="submit"
                                            disabled={updateACardProviderRequest.is_request_processing}>
                                            {updateACardProviderRequest.is_request_processing && "Please wait..."}
                                            {(!updateACardProviderRequest.is_request_processing && this.state.updateType === "edit") && "Update"}
                                            {(!updateACardProviderRequest.is_request_processing && this.state.updateType === "activate") && "Activate"}
                                            {(!updateACardProviderRequest.is_request_processing && this.state.updateType === "deactivate") && "De-Activate"}
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                    {updateACardProviderRequest.request_status === platformConstants.UPDATE_A_CARDPROVIDER_SUCCESS &&
                        <Alert variant="success">
                            {updateACardProviderRequest.request_data.response.data.message}
                        </Alert>
                    }
                    {updateACardProviderRequest.request_status === platformConstants.UPDATE_A_CARDPROVIDER_FAILURE &&
                        <Alert variant="danger">
                            {updateACardProviderRequest.request_data.error}
                        </Alert>
                    }
                </Modal.Body>
            </Modal>
        )
    }

    renderContentWrap = () => {
        let fetchAllCardProviderRequest = this.props.fetchAllCardProvider;

        let saveRequestData = fetchAllCardProviderRequest.request_data !== undefined ? fetchAllCardProviderRequest.request_data.tempData : null;

        switch (fetchAllCardProviderRequest.request_status) {
            case (platformConstants.GET_ALL_CARDPROVIDER_PENDING):

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
                                        <th>Provider Name</th>
                                        <th>Provider Code</th>
                                        <th>Description</th>
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
                                        <th>Provider Name</th>
                                        <th>Provider Code</th>
                                        <th>Description</th>
                                        <th>Status</th>
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
                                                        <td>{eachItem.providerName}</td>
                                                        <td>{eachItem.providerCode}</td>
                                                        <td>{eachItem.description}</td>
                                                        <td>{eachItem.objectStateDesc}</td>
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

            case (platformConstants.GET_ALL_CARDPROVIDER_SUCCESS):
                let allFetchedData = fetchAllCardProviderRequest.request_data.response.data;
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
                                            <th>Provider Name</th>
                                            <th>Provider Code</th>
                                            <th>Description</th>
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
                                                            <td>{eachItem.providerName}</td>
                                                            <td>{eachItem.providerCode}</td>
                                                            <td>{eachItem.description}</td>
                                                            <td>{eachItem.objectStateDesc}</td>
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
                                            <th>Provider Name</th>
                                            <th>Provider Code</th>
                                            <th>Description</th>
                                            <th>Status</th>
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

            case (platformConstants.GET_ALL_CARDPROVIDER_FAILURE):
                return (
                    <div className="loading-content errormsg">
                        <div>{fetchAllCardProviderRequest.request_data.error}</div>
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
                                    <PlaformNav />
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
        fetchAllCardProvider: state.platformReducers.fetchAllCardProvider,
        getACardProvider: state.platformReducers.getACardProvider,
        createACardProvider: state.platformReducers.createACardProvider,
        updateACardProvider: state.platformReducers.updateACardProvider,


    };
}

export default connect(mapStateToProps)(PlatformCardProvider);