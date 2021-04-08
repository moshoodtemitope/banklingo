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

import AsyncSelect from 'react-select/async';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

// import DatePicker from '../../_helpers/datepickerfield'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { numberWithCommas, getDateFromISO, allowNumbersOnly } from '../../shared/utils';
import { platformActions } from '../../redux/actions/platform/platform.action';
import { platformConstants } from '../../redux/actiontypes/platform/platform.constants'

import { dashboardActions } from '../../redux/actions/dashboard/dashboard.action';
import { dashboardConstants } from '../../redux/actiontypes/dashboard/dashboard.constants'
import Alert from 'react-bootstrap/Alert'
// import "./clients.scss"; 

class ManageCompanyInfo extends React.Component {
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
            selectedCustomer: "",
            endDate: "",
            startDate: "",
            SearchText: ""
        }
        this.userPermissions = JSON.parse(localStorage.getItem("x-u-perm"));
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

        dispatch(platformActions.getAllCompanyInfo(paramters));
        dispatch(dashboardActions.searchForCustomer("CLEAR"));
    }

    clearAllData = () => {
        this.props.dispatch(platformActions.newCompanyInfo("CLEAR"));
        this.props.dispatch(platformActions.updateCompanyInfo("CLEAR"));
    }

    setPagesize = (PageSize, tempData) => {
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value,
            { CurrentPage, CurrentSelectedPage, ShowDeactivated } = this.state;

        this.setState({ PageSize: sizeOfPage });

        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&ShowDeactivated=${ShowDeactivated}`;
        // this.fetchAllRecords(params);

        if (tempData) {
            dispatch(platformActions.getAllCompanyInfo(params, tempData));
        } else {
            dispatch(platformActions.getAllCompanyInfo(params));
        }
    }

    setShowDeactivated = (ShowDeactivated, tempData) => {
        const { dispatch } = this.props;

        let showNonActive = ShowDeactivated.target.checked,
            { CurrentPage, CurrentSelectedPage, PageSize } = this.state;

        this.setState({ ShowDeactivated: showNonActive });

        let params = `ShowDeactivated=${showNonActive}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;

        if (tempData) {
            dispatch(platformActions.getAllCompanyInfo(params, tempData));
        } else {
            dispatch(platformActions.getAllCompanyInfo(params));
        }

    }

    


    loadNextPage = (nextPage, tempData) => {

        const { dispatch } = this.props;
        let { PageSize } = this.state;

        // this.setState({PageSize: sizeOfPage});

        let params = `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);


        if (tempData) {
            dispatch(platformActions.getAllCompanyInfo(params, tempData));
        } else {
            dispatch(platformActions.getAllCompanyInfo(params));
        }
    }

    handleCloseNewRecord = () => {
        if (this.props.newCompanyInfoReducer.is_request_processing === false) {
            this.setState({ showCreateNewRecord: false })
            this.props.dispatch(dashboardActions.searchForCustomer("CLEAR"));
        }
    }

    handleShowNewRecord = () => {
        this.clearAllData();
        this.setState({ showCreateNewRecord: true })
    };

    handleEditRecordClose = () => {
        if (this.props.updateCompanyInfoReducer.is_request_processing === false) {
            this.setState({ showEditRecord: false });
        }
    }

    handleEditRecordShow = (recordToUpdate, updateType) => {
        this.clearAllData()
        this.setState({ updateType, recordToUpdate, showEditRecord: true, });
    }

    //Search Customer
    handleSearchCustomerChange = (inputValue) => {
        const customerSearchText = inputValue.replace(/\W/g, '');

        this.setState({ customerSearchText })

    }

    loadSearchResults = (inputValue, callback) => {
        return this.getSearchedCustomerResults(inputValue)
            .then(() => {
                if (this.props.searchForCustomerReducer.request_status === dashboardConstants.SEARCH_FOR_CUSTOMER_SUCCESS) {
                    let searchResults = this.props.searchForCustomerReducer.request_data.response.data;
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

    handleSelectedCustomer = (inputValue) => {


        this.setState({ selectedCustomer: inputValue })

    }
    //****Search Ends */

    searchAllData = (e, tempData) => {
        e.preventDefault()
        const { dispatch } = this.props;
        let { PageSize, CurrentPage, SearchText, endDate, startDate, ShowDeactivated } = this.state;

        // this.setState({PageSize: sizeOfPage});

        // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);
        if (SearchText !== "" || endDate !== "" || startDate !== "") {
            if (endDate !== "") {
                endDate = endDate.toISOString()
            }
            if (startDate !== "") {
                startDate = startDate.toISOString()
            }
            let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}&ShowDeactivated=${ShowDeactivated}`;

            if (tempData) {
                dispatch(platformActions.getAllCompanyInfo(params, tempData));
            } else {
                dispatch(platformActions.getAllCompanyInfo(params));
            }
        }
    }

    exportData = () => {
        let { PageSize, CurrentPage, SearchText, endDate, startDate } = this.state;


        if (endDate !== "") {
            endDate = endDate.toISOString()
        }
        if (startDate !== "") {
            startDate = startDate.toISOString()
        }
        let paramters = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;




        const { dispatch } = this.props;

        // dispatch(platformActions.exportClients(paramters));
    }

    handleDateChangeRaw = (e) => {
        e.preventDefault();
    }
    handleStartDatePicker = (startDate) => {
        startDate.setHours(startDate.getHours() + 1);

        this.setState({ startDate }, () => {
            if (this.state.endDate !== "") {
                //this.getHistory();
            }
        });
    }

    handleEndDatePicker = (endDate) => {
        endDate.setHours(endDate.getHours() + 1);

        this.setState({ endDate }, () => {
            if (this.state.startDate !== "") {
                //this.getHistory();
            }
        });
    }


    createNewRecord = async (payload) => {
        const { dispatch } = this.props;



        await dispatch(platformActions.newCompanyInfo(payload));


    }

    updateARecord = async (payload, encodedKey) => {
        const { dispatch } = this.props;


        await dispatch(platformActions.updateCompanyInfo(payload, encodedKey));


    }


    createNewRecordPopUp = () => {


        let { showCreateNewRecord,
            selectedCustomer,
            defaultOptions } = this.state;
        let newCompanyInfoRequest = this.props.newCompanyInfoReducer;

        // let getAllCurrencies =  this.props.adminGetAllCurrencies;


        let checkValidationSchema = Yup.object().shape({
            companyCategory: Yup.string()
                .required('Required'),
            companyDomains: Yup.string()
                .required('Required'),
            companyName: Yup.string()
                .required('Required'),
            maximumLoanAmount: Yup.string()
                .required('Required'),
        });
        return (
            <Modal show={showCreateNewRecord} onHide={this.handleCloseNewRecord} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={true}>
                <Modal.Header>
                    <Modal.Title>Add New Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            companyCategory: '',
                            companyDomains: '',
                            companyName: '',
                            maximumLoanAmount: '',
                        }}
                        validationSchema={checkValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // same shape as initial values

                            let requestPayload = {
                                companyCategory: values.companyCategory,
                                companyDomains: values.companyDomains,
                                companyName: values.companyName,
                                maximumLoanAmount: parseFloat(values.maximumLoanAmount.replace(/,/g, '')),
                            };




                            this.createNewRecord(requestPayload)
                                .then(
                                    () => {
                                        if (this.props.newCompanyInfoReducer.request_status === platformConstants.ADD_A_COMPANY_INFO_SUCCESS) {
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
                                            <Form.Label className="block-level">Company name</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handleChange}
                                                value={values.companyName}
                                                className={errors.companyName && touched.companyName ? "is-invalid h-38px" : "h-38px"}
                                                name="companyName"
                                                required />

                                            {errors.companyName && touched.companyName ? (
                                                <span className="invalid-feedback">{errors.companyName}</span>
                                            ) : null}

                                            {errors.companyName && touched.companyName ? (
                                                <span className="invalid-feedback">{errors.companyName}</span>
                                            ) : null}
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">Company category</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handleChange}
                                                value={values.companyCategory}
                                                className={errors.companyCategory && touched.companyCategory ? "is-invalid h-38px" : "h-38px"}
                                                name="companyCategory"
                                                required />

                                            {errors.companyCategory && touched.companyCategory ? (
                                                <span className="invalid-feedback">{errors.companyCategory}</span>
                                            ) : null}

                                            {errors.companyCategory && touched.companyCategory ? (
                                                <span className="invalid-feedback">{errors.companyCategory}</span>
                                            ) : null}
                                        </Col>

                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">Company domains</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handleChange}
                                                value={values.companyDomains}
                                                className={errors.companyDomains && touched.companyDomains ? "is-invalid h-38px" : "h-38px"}
                                                name="companyDomains"
                                                required />

                                            {errors.companyDomains && touched.companyDomains ? (
                                                <span className="invalid-feedback">{errors.companyDomains}</span>
                                            ) : null}

                                            {errors.companyDomains && touched.companyDomains ? (
                                                <span className="invalid-feedback">{errors.companyDomains}</span>
                                            ) : null}
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">Maximum loan amount (₦)</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handleChange}
                                                value={numberWithCommas(values.maximumLoanAmount)}
                                                className={errors.maximumLoanAmount && touched.maximumLoanAmount ? "is-invalid h-38px" : "h-38px"}
                                                name="maximumLoanAmount"
                                                required />

                                            {errors.maximumLoanAmount && touched.maximumLoanAmount ? (
                                                <span className="invalid-feedback">{errors.maximumLoanAmount}</span>
                                            ) : null}
                                        </Col>



                                    </Form.Row>

                                    <div className="footer-with-cta toleft">
                                        <Button
                                            disabled={newCompanyInfoRequest.is_request_processing}
                                            variant="secondary" className="grayed-out" onClick={this.handleCloseNewRecord}>Cancel</Button>
                                        <Button
                                            type="submit"
                                            disabled={newCompanyInfoRequest.is_request_processing}>
                                            {newCompanyInfoRequest.is_request_processing ? "Please wait..." : "Create"}
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                    {newCompanyInfoRequest.request_status === platformConstants.ADD_A_COMPANY_INFO_SUCCESS &&
                        <Alert variant="success">
                            {newCompanyInfoRequest.request_data.response.data.message}
                        </Alert>
                    }
                    {newCompanyInfoRequest.request_status === platformConstants.ADD_A_COMPANY_INFO_FAILURE &&
                        <Alert variant="danger">
                            {newCompanyInfoRequest.request_data.error}
                        </Alert>
                    }
                </Modal.Body>
            </Modal>
        )
    }

    updateRecordPopUp = (updateType) => {


        let { showEditRecord,
            recordToUpdate,
        } = this.state;
        let updateCompanyInfoRequest = this.props.updateCompanyInfoReducer;

        // let getAllCurrencies =  this.props.adminGetAllCurrencies;


        let checkValidationSchema = Yup.object().shape({
            companyCategory: Yup.string()
                .required('Required'),
            companyDomains: Yup.string()
                .required('Required'),
            companyName: Yup.string()
                .required('Required'),
            maximumLoanAmount: Yup.string()
                .required('Required'),
        });

        return (
            <Modal show={showEditRecord} onHide={this.handleEditRecordClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={true}>
                <Modal.Header>
                    {this.state.updateType === "edit" && <Modal.Title>Edit Company Information</Modal.Title>}
                    {this.state.updateType === "activate" && <Modal.Title>Confirm Activation</Modal.Title>}
                    {this.state.updateType === "deactivate" && <Modal.Title>Confirm De-Activation</Modal.Title>}

                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            companyCategory: recordToUpdate.companyCategory,
                            companyDomains: recordToUpdate.companyDomains,
                            companyName: recordToUpdate.companyName,
                            maximumLoanAmount: recordToUpdate.maximumLoanAmount,
                        }}
                        validationSchema={checkValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // same shape as initial values

                            let requestPayload;
                            if (this.state.updateType === "edit") {
                                requestPayload = {
                                    companyCategory: values.companyCategory,
                                    companyDomains: values.companyDomains,
                                    companyName: values.companyName,
                                    maximumLoanAmount: parseFloat(values.maximumLoanAmount.toString().replace(/,/g, '')),
                                    companyStatus: recordToUpdate.companyStatus
                                };
                            }

                            if (this.state.updateType === "activate") {
                                requestPayload = {
                                    companyCategory: recordToUpdate.companyCategory,
                                    companyDomains: recordToUpdate.companyDomains,
                                    companyName: recordToUpdate.companyName,
                                    maximumLoanAmount: recordToUpdate.maximumLoanAmount,
                                    companyStatus: 1
                                };
                            }

                            if (this.state.updateType === "deactivate") {
                                requestPayload = {
                                    companyCategory: recordToUpdate.companyCategory,
                                    companyDomains: recordToUpdate.companyDomains,
                                    companyName: recordToUpdate.companyName,
                                    maximumLoanAmount: recordToUpdate.maximumLoanAmount,
                                    companyStatus: 0
                                };
                            }






                            this.updateARecord(requestPayload, recordToUpdate.encodedKey)
                                .then(
                                    () => {
                                        if (this.props.updateCompanyInfoReducer.request_status === platformConstants.UPDATE_A_COMPANY_INFO_SUCCESS) {

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
                                    {/* <Form.Row>

                                        <Col> */}
                                        <Form.Group>
                                            <Form.Label className="block-level">Company name</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handleChange}
                                                value={values.companyName}
                                                disabled={this.state.updateType !== "edit"}
                                                onChange={(e) => {
                                                    if (this.state.updateType !== "edit") {
                                                        setFieldValue("companyName", recordToUpdate.companyName)
                                                    } else {
                                                        setFieldValue("companyName", e.target.value)
                                                    }

                                                }}
                                                className={errors.companyName && touched.companyName ? "is-invalid h-38px" : "h-38px"}
                                                name="companyName"
                                                required />

                                            {errors.companyName && touched.companyName ? (
                                                <span className="invalid-feedback">{errors.companyName}</span>
                                            ) : null}
                                            </Form.Group>
                                           
                                        {/* </Col>
                                        <Col> */}
                                    <Form.Group>
                                        <Form.Label className="block-level">Company category</Form.Label>
                                        <Form.Control type="text"
                                            onChange={handleChange}
                                            value={values.companyCategory}
                                            disabled={this.state.updateType !== "edit"}
                                            onChange={(e) => {
                                                if (this.state.updateType !== "edit") {
                                                    setFieldValue("companyCategory", recordToUpdate.companyCategory)
                                                } else {
                                                    setFieldValue("companyCategory", e.target.value)
                                                }

                                            }}
                                            className={errors.companyCategory && touched.companyCategory ? "is-invalid h-38px" : "h-38px"}
                                            name="companyCategory"
                                            required />

                                        {errors.companyCategory && touched.companyCategory ? (
                                            <span className="invalid-feedback">{errors.companyCategory}</span>
                                        ) : null}
                                    </Form.Group>

                                        {/* </Col> */}

                                    {/* </Form.Row>
                                    <Form.Row>
                                        <Col> */}
                                    <Form.Group>
                                        <Form.Label className="block-level">Company domains</Form.Label>
                                        <Form.Control type="text"
                                            onChange={handleChange}
                                            value={values.companyDomains}
                                            disabled={this.state.updateType !== "edit"}
                                            onChange={(e) => {
                                                if (this.state.updateType !== "edit") {
                                                    setFieldValue("companyDomains", recordToUpdate.companyDomains)
                                                } else {
                                                    setFieldValue("companyDomains", e.target.value)
                                                }

                                            }}
                                            className={errors.companyDomains && touched.companyDomains ? "is-invalid h-38px" : "h-38px"}
                                            name="companyDomains"
                                            required />

                                        {errors.companyDomains && touched.companyDomains ? (
                                            <span className="invalid-feedback">{errors.companyDomains}</span>
                                        ) : null}
                                    </Form.Group>

                                        {/* </Col>

                                        <Col> */}
                                    <Form.Group>
                                        <Form.Label className="block-level">Maximum loan amount (₦)</Form.Label>
                                        <Form.Control type="text"
                                            onChange={handleChange}
                                            value={numberWithCommas(values.maximumLoanAmount)}
                                            disabled={this.state.updateType !== "edit"}
                                            onChange={(e) => {
                                                if (this.state.updateType !== "edit") {
                                                    setFieldValue("maximumLoanAmount", recordToUpdate.maximumLoanAmount)
                                                } else {
                                                    setFieldValue("maximumLoanAmount", e.target.value)
                                                }

                                            }}
                                            className={errors.maximumLoanAmount && touched.maximumLoanAmount ? "is-invalid h-38px" : "h-38px"}
                                            name="maximumLoanAmount"
                                            required />

                                        {errors.maximumLoanAmount && touched.maximumLoanAmount ? (
                                            <span className="invalid-feedback">{errors.maximumLoanAmount}</span>
                                        ) : null}
                                    </Form.Group>
                                        {/* </Col>



                                    </Form.Row> */}

                                    <div className="footer-with-cta toleft">
                                        <Button
                                            disabled={updateCompanyInfoRequest.is_request_processing}
                                            variant="secondary" className="grayed-out" onClick={this.handleEditRecordClose}>Cancel</Button>
                                        <Button
                                            type="submit"
                                            disabled={updateCompanyInfoRequest.is_request_processing}>
                                            {updateCompanyInfoRequest.is_request_processing && "Please wait..."}
                                            {(!updateCompanyInfoRequest.is_request_processing && this.state.updateType === "edit") && "Update"}
                                            {(!updateCompanyInfoRequest.is_request_processing && this.state.updateType === "activate") && "Activate"}
                                            {(!updateCompanyInfoRequest.is_request_processing && this.state.updateType === "deactivate") && "De-Activate"}
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                    {updateCompanyInfoRequest.request_status === platformConstants.UPDATE_A_COMPANY_INFO_SUCCESS &&
                        <Alert variant="success">
                            {updateCompanyInfoRequest.request_data.response.data.message}
                        </Alert>
                    }
                    {updateCompanyInfoRequest.request_status === platformConstants.UPDATE_A_COMPANY_INFO_FAILURE &&
                        <Alert variant="danger">
                            {updateCompanyInfoRequest.request_data.error}
                        </Alert>
                    }
                </Modal.Body>
            </Modal>
        )
    }

    renderContentWrap = () => {
        let getAllCompanyInfoRequest = this.props.getAllCompanyInfoReducer;

        let saveRequestData = getAllCompanyInfoRequest.request_data !== undefined ? getAllCompanyInfoRequest.request_data.tempData : null;

        switch (getAllCompanyInfoRequest.request_status) {
            case (platformConstants.GET_ALL_COMPANY_INFO_PENDING):

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
                                        <th>Company Name</th>
                                        <th>Company Domains</th>
                                        <th>Company Category</th>
                                        <th>Maximum Loan Amount</th>
                                        <th>Company Status</th>
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
                                        <th>Company Name</th>
                                        <th>Company Domains</th>
                                        <th>Company Category</th>
                                        <th>Maximum Loan Amount</th>
                                        <th>Company Status</th>
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
                                                        <td>{eachItem.companyName}</td>
                                                        <td>{eachItem.companyDomains}</td>
                                                        <td>{eachItem.companyCategory}</td>
                                                        <td>{numberWithCommas(eachItem.maximumLoanAmount, true)}</td>
                                                        <td>{eachItem.companyStatusDescription}</td>
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
                                                                {eachItem.companyStatus === 0 && <Dropdown.Item eventKey="1">Activate</Dropdown.Item>}
                                                                {eachItem.companyStatus === 1 && <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>}
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

            case (platformConstants.GET_ALL_COMPANY_INFO_SUCCESS):
                let allFetchedData = getAllCompanyInfoRequest.request_data.response.data;
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
                                            <th>Company Name</th>
                                            <th>Company Domains</th>
                                            <th>Company Category</th>
                                            <th>Maximum Loan Amount</th>
                                            <th>Company Status</th>
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
                                                            <td>{eachItem.companyName}</td>
                                                            <td>{eachItem.companyDomains}</td>
                                                            <td>{eachItem.companyCategory}</td>
                                                            <td>{numberWithCommas(eachItem.maximumLoanAmount, true)}</td>
                                                            <td>{eachItem.companyStatusDescription}</td>
                                                            <td>{getDateFromISO(eachItem.dateCreated)}</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    {/* <NavLink className="dropdown-item" to={`/administration/organization/editbranch/${eachBranch.encodedKey}`}>Edit</NavLink> */}
                                                                    {/* <Dropdown.Item eventKey="1" onClick={()=>{
                                                                            this.setState({updateType:"edit"})
                                                                            this.handleEditRecordShow(eachItem, "edit")}}>Edit</Dropdown.Item> */}
                                                                    <Dropdown.Item eventKey="1" onClick={() => this.handleEditRecordShow(eachItem, "edit")}>Edit</Dropdown.Item>
                                                                    {eachItem.companyStatus === 0 && <Dropdown.Item eventKey="1" onClick={() => this.handleEditRecordShow(eachItem, "activate")}>Activate</Dropdown.Item>}
                                                                    {eachItem.companyStatus === 1 && <Dropdown.Item eventKey="1" onClick={() => this.handleEditRecordShow(eachItem, "deactivate")}>Deactivate</Dropdown.Item>}
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
                                            <th>Company Name</th>
                                            <th>Company Domains</th>
                                            <th>Company Category</th>
                                            <th>Maximum Loan Amount</th>
                                            <th>Company Status</th>
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

            case (platformConstants.GET_ALL_COMPANY_INFO_FAILURE):
                return (
                    <div className="loading-content errormsg">
                        <div>{getAllCompanyInfoRequest.request_data.error}</div>
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
                                                <h2>Company Whitelist</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <ul className="nav">

                                        <li>
                                            <NavLink to={'/platform/company-info'}>Company Information</NavLink>
                                        </li>
                                        <li>
                                            <NavLink exact to={'/platform/customer-whitelist'}>Customer Whitelist</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/platform/payroll-info'}>Payroll Information</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/platform/bank-info'}>Bank Information</NavLink>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        {/* <div className="col-sm-3">
                                            <AccountsSidebar/>
                                        </div> */}
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                <div className="heading-with-cta">
                                                    {/* <h3 className="section-title">Journal Entries</h3> */}
                                                    {/* <Form className="one-liner">
                                                        <Form.Group className="table-filters">
                                                            <Form.Label>Account Officer</Form.Label>
                                                                <Form.Control type="text" size="sm" />
                                                        </Form.Group>
                                                        <Form.Group controlId="filterDropdown">
                                                        <Form.Label> </Form.Label>
                                                            <Form.Control as="select" size="sm">
                                                                <option>No Filter</option>
                                                                <option>Add New Filter</option>
                                                                <option>Custom Filter</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                        <Button variant="primary" type="submit">Filter</Button>
                                                    </Form> */}
                                                    {/* <Button>Edit Columns</Button> */}
                                                </div>
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
        getAllCompanyInfoReducer: state.platformReducers.getAllCompanyInfoReducer,
        getACompanyInfoReducer: state.platformReducers.getACompanyInfoReducer,
        newCompanyInfoReducer: state.platformReducers.newCompanyInfoReducer,
        updateCompanyInfoReducer: state.platformReducers.updateCompanyInfoReducer,
        searchForCustomerReducer: state.dashboardReducers.searchForCustomerReducer,
    };
}


export default connect(mapStateToProps)(ManageCompanyInfo);