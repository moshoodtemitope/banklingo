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
import Select from 'react-select';
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

class ManageBankInfo extends React.Component {
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
        const {dispatch} = this.props;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&ShowDeactivated=${ShowDeactivated}`;

        this.fetchAllRecords(params);
        dispatch(dashboardActions.searchForCustomer("CLEAR"));
        // this.clearAllData()
    }






    fetchAllRecords = (paramters) => {
        const { dispatch } = this.props;

        dispatch(platformActions.fetchAllBankInfo(paramters));
        dispatch(dashboardActions.searchForCustomer("CLEAR"));
    }

    clearAllData = () => {
        this.props.dispatch(platformActions.createBankInfo("CLEAR"));
        this.props.dispatch(platformActions.updateBankInfo("CLEAR"));
    }

    setPagesize = (PageSize, tempData) => {
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value,
            { CurrentPage, CurrentSelectedPage, ShowDeactivated } = this.state;

        this.setState({ PageSize: sizeOfPage });

        let params = `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&ShowDeactivated=${ShowDeactivated}`;
        // this.fetchAllRecords(params);

        if (tempData) {
            dispatch(platformActions.fetchAllBankInfo(params, tempData));
        } else {
            dispatch(platformActions.fetchAllBankInfo(params));
        }
    }

    setShowDeactivated = (ShowDeactivated, tempData) => {
        const { dispatch } = this.props;

        let showNonActive = ShowDeactivated.target.checked,
            { CurrentPage, CurrentSelectedPage, PageSize } = this.state;

        this.setState({ ShowDeactivated: showNonActive });

        let params = `ShowDeactivated=${showNonActive}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;

        if (tempData) {
            dispatch(platformActions.fetchAllBankInfo(params, tempData));
        } else {
            dispatch(platformActions.fetchAllBankInfo(params));
        }

    }




    loadNextPage = (nextPage, tempData) => {

        const { dispatch } = this.props;
        let { PageSize } = this.state;

        // this.setState({PageSize: sizeOfPage});

        let params = `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);


        if (tempData) {
            dispatch(platformActions.fetchAllBankInfo(params, tempData));
        } else {
            dispatch(platformActions.fetchAllBankInfo(params));
        }
    }

    handleCloseNewRecord = () => {
        if (this.props.createBankInfoReducer.is_request_processing === false) {
            this.setState({ showCreateNewRecord: false })
            this.props.dispatch(dashboardActions.searchForCustomer("CLEAR"));
        }
    }

    handleShowNewRecord = () => {
        this.clearAllData();
        this.setState({ showCreateNewRecord: true })
    };

    handleEditRecordClose = () => {
        if (this.props.updateBankInfoReducer.is_request_processing === false) {
            this.setState({ showEditRecord: false });
        }
    }

    handleEditRecordShow = (recordToUpdate, updateType) => {
        this.clearAllData()
        this.setState({ updateType, recordToUpdate, showEditRecord: true, });
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
                dispatch(platformActions.fetchAllBankInfo(params, tempData));
            } else {
                dispatch(platformActions.fetchAllBankInfo(params));
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

            }
        });
    }

    handleEndDatePicker = (endDate) => {
        endDate.setHours(endDate.getHours() + 1);

        this.setState({ endDate }, () => {
            if (this.state.startDate !== "") {

            }
        });
    }


    createNewRecord = async (payload) => {
        const { dispatch } = this.props;



        await dispatch(platformActions.createBankInfo(payload));


    }

    updateARecord = async (payload, encodedKey) => {
        const { dispatch } = this.props;


        await dispatch(platformActions.updateBankInfo(payload, encodedKey));


    }

    //Search Customer
    loadSearchResults = (inputValue, callback) => {
        return this.getSearchedCustomerResults(inputValue)
                .then(()=>{
                    if(this.props.searchForCustomerReducer.request_status===dashboardConstants.SEARCH_FOR_CUSTOMER_SUCCESS){
                        let searchResults = this.props.searchForCustomerReducer.request_data.response.data;
                        this.setState({defaultOptions:searchResults })
                        return searchResults;
                    }
                })
    }




    getSearchedCustomerResults = async (inputValue)=> {
        const {dispatch} = this.props;

        if (!inputValue || inputValue.length===0) {
          return null;
        }


         await dispatch(dashboardActions.searchForCustomer(inputValue));


    }
    handleSearchCustomerChange =(inputValue)=>{
        const customerSearchText = inputValue.replace(/\W/g, '');

        this.setState({customerSearchText})

    }

    handleSelectedCustomer =(inputValue)=>{


        this.setState({selectedCustomer: inputValue})

    }

    createNewRecordPopUp = () => {


        let { showCreateNewRecord,
            selectedCustomer,
            defaultOptions } = this.state;
        let createBankInfoRequest = this.props.createBankInfoReducer;
        let fetchAllBankInfoRequest = this.props.fetchAllBankInfoReducer;
        let allBanksList = [],
        allbanks = fetchAllBankInfoRequest.request_data.response2.data;

        if (allbanks.length >= 1) {
            allbanks.map(eachBank => {
                allBanksList.push({ label: eachBank.bankName, value: eachBank.bankCode })
            })
        }
        // let getAllCurrencies =  this.props.adminGetAllCurrencies;


        let checkValidationSchema = Yup.object().shape({
            accountName: Yup.string()
                .required('Required'),
            accountNumber: Yup.string()
                .required('Required'),
            bankCode: Yup.string()
                .required('Required'),
            clientEncodedKey: Yup.string()
        });
        return (
            <Modal show={showCreateNewRecord} onHide={this.handleCloseNewRecord} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={true}>
                <Modal.Header>
                    <Modal.Title>Add New</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            accountName: '',
                            accountNumber: '',
                            bankCode: '',
                            clientEncodedKey: '',
                        }}
                        validationSchema={checkValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            // same shape as initial values

                            if(selectedCustomer !==""){
                                let requestPayload = {
                                    accountName: values.accountName,
                                    accountNumber: values.accountNumber,
                                    bankCode: values.bankCode,
                                    clientEncodedKey: selectedCustomer.clientEncodedKey,
                                };
                                this.createNewRecord(requestPayload)
                                .then(
                                    () => {
                                        if (this.props.createBankInfoReducer.request_status === platformConstants.ADD_A_BANKINFO_SUCCESS) {
                                            resetForm();
                                            this.loadInitialData();
                                        }

                                    }
                                )
                            }









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
                                            <Form.Label className="block-level">Customer</Form.Label>
                                            <AsyncSelect
                                                cacheOptions
                                                value={selectedCustomer}
                                                getOptionLabel={e => e.clientName}
                                                getOptionValue={e => e.clientEncodedKey}
                                                loadOptions={this.loadSearchResults}
                                                defaultOptions={defaultOptions}
                                                name="clientEncodedKey"
                                                placeholder="Search"
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
                                            <Form.Label className="block-level">Account Number</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handleChange}
                                                value={values.accountNumber}
                                                className={errors.accountNumber && touched.accountNumber ? "is-invalid h-38px" : "h-38px"}
                                                name="accountNumber"
                                                required />

                                            {errors.accountNumber && touched.accountNumber ? (
                                                <span className="invalid-feedback">{errors.accountNumber}</span>
                                            ) : null}

                                            {errors.accountNumber && touched.accountNumber ? (
                                                <span className="invalid-feedback">{errors.accountNumber}</span>
                                            ) : null}
                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Bank name</Form.Label>
                                            <Select
                                                options={allBanksList}
                                                className={errors.bankCode && touched.bankCode ? "is-invalid" : null}
                                                onChange={(selectedBank) => {
                                                    setFieldValue('bankCode', selectedBank.value);
                                                    this.setState({selectedBank})
                                                }}
                                                onBlur={() => setFieldTouched('bankCode', true)}
                                                name="bankCode"
                                                required
                                            />


                                            {errors.bankCode && touched.bankCode ? (
                                                <span className="invalid-feedback">{errors.bankCode}</span>
                                            ) : null}
                                        </Col>

                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">Account Name</Form.Label>
                                            <Form.Control type="text"
                                                onChange={handleChange}
                                                value={values.accountName}
                                                className={errors.accountName && touched.accountName ? "is-invalid h-38px" : "h-38px"}
                                                name="accountName"
                                                required />

                                            {errors.accountName && touched.accountName ? (
                                                <span className="invalid-feedback">{errors.accountName}</span>
                                            ) : null}

                                            {errors.accountName && touched.accountName ? (
                                                <span className="invalid-feedback">{errors.accountName}</span>
                                            ) : null}
                                        </Col>





                                    </Form.Row>

                                    <div className="footer-with-cta toleft">
                                        <Button
                                            disabled={createBankInfoRequest.is_request_processing}
                                            variant="secondary" className="grayed-out" onClick={this.handleCloseNewRecord}>Cancel</Button>
                                        <Button
                                            type="submit"
                                            disabled={createBankInfoRequest.is_request_processing}>
                                            {createBankInfoRequest.is_request_processing ? "Please wait..." : "Create"}
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                    {createBankInfoRequest.request_status === platformConstants.ADD_A_BANKINFO_SUCCESS &&
                        <Alert variant="success">
                            {createBankInfoRequest.request_data.response.data.message}
                        </Alert>
                    }
                    {createBankInfoRequest.request_status === platformConstants.ADD_A_BANKINFO_FAILURE &&
                        <Alert variant="danger">
                            {createBankInfoRequest.request_data.error}
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
        let updateBankInfoRequest = this.props.updateBankInfoReducer;

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
                    {this.state.updateType === "edit" && <Modal.Title>Edit</Modal.Title>}
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
                                        if (this.props.updateBankInfoReducer.request_status === platformConstants.UPDATE_A_BANKINFO_SUCCESS) {

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


                                        </Col>
                                        <Col>
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

                                        </Col>

                                    </Form.Row>
                                    <Form.Row>
                                        <Col>
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

                                        </Col>

                                        <Col>
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
                                        </Col>



                                    </Form.Row>

                                    <div className="footer-with-cta toleft">
                                        <Button
                                            disabled={updateBankInfoRequest.is_request_processing}
                                            variant="secondary" className="grayed-out" onClick={this.handleEditRecordClose}>Cancel</Button>
                                        <Button
                                            type="submit"
                                            disabled={updateBankInfoRequest.is_request_processing}>
                                            {updateBankInfoRequest.is_request_processing && "Please wait..."}
                                            {(!updateBankInfoRequest.is_request_processing && this.state.updateType === "edit") && "Update"}
                                            {(!updateBankInfoRequest.is_request_processing && this.state.updateType === "activate") && "Activate"}
                                            {(!updateBankInfoRequest.is_request_processing && this.state.updateType === "deactivate") && "De-Activate"}
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                    {updateBankInfoRequest.request_status === platformConstants.UPDATE_A_BANKINFO_SUCCESS &&
                        <Alert variant="success">
                            {updateBankInfoRequest.request_data.response.data.message}
                        </Alert>
                    }
                    {updateBankInfoRequest.request_status === platformConstants.UPDATE_A_BANKINFO_FAILURE &&
                        <Alert variant="danger">
                            {updateBankInfoRequest.request_data.error}
                        </Alert>
                    }
                </Modal.Body>
            </Modal>
        )
    }

    renderContentWrap = () => {
        let fetchAllBankInfoRequest = this.props.fetchAllBankInfoReducer;

        let saveRequestData = fetchAllBankInfoRequest.request_data !== undefined ? fetchAllBankInfoRequest.request_data.tempData : null;

        switch (fetchAllBankInfoRequest.request_status) {
            case (platformConstants.GET_ALL_BANKINFO_PENDING):

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
                                        <th>Account Name</th>
                                        <th>Account Number</th>
                                        <th>Bank Code</th>
                                        <th>Verification Status</th>
                                        <th>Current State</th>
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
                                        <th>Account Name</th>
                                        <th>Account Number</th>
                                        <th>Bank Code</th>
                                        <th>Verification Status</th>
                                        <th>Current State</th>
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
                                                        <td>{eachItem.accountName}</td>
                                                        <td>{eachItem.accountNumber}</td>
                                                        <td>{eachItem.bankCode}</td>
                                                        <td>{eachItem.verificationStatusDesc}</td>
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

            case (platformConstants.GET_ALL_BANKINFO_SUCCESS):
                let allFetchedData = fetchAllBankInfoRequest.request_data.response.data;
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
                                            <th>Account Name</th>
                                            <th>Account Number</th>
                                            <th>Bank Code</th>
                                            <th>Verification Status</th>
                                            <th>Current State</th>
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
                                                            <td>{eachItem.accountName}</td>
                                                            <td>{eachItem.accountNumber}</td>
                                                            <td>{eachItem.bankCode}</td>
                                                            <td>{eachItem.verificationStatusDesc}</td>
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
                                            <th>Account Name</th>
                                            <th>Account Number</th>
                                            <th>Bank Code</th>
                                            <th>Verification Status</th>
                                            <th>Current State</th>
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

            case (platformConstants.GET_ALL_BANKINFO_FAILURE):
                return (
                    <div className="loading-content errormsg">
                        <div>{fetchAllBankInfoRequest.request_data.error}</div>
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
                    {this.props.fetchAllBankInfoReducer.request_status ===platformConstants.GET_ALL_BANKINFO_SUCCESS && this.createNewRecordPopUp()}
                    {recordToUpdate && this.updateRecordPopUp()}
                    <div className="content-wrapper">
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Employee Bank Information</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <ul className="nav">
                                        <li>
                                            <NavLink to={'/platform/company-info'} activeClassName="activeNavLink">Company Information</NavLink>
                                        </li>
                                        <li>
                                            <NavLink exact to={'/platform/customer-whitelist'} activeClassName="activeNavLink">Customer Whitelist</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/platform/payroll-info'} activeClassName="activeNavLink">Payroll Information</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/platform/bank-info'} activeClassName="activeNavLink">Bank Information</NavLink>
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
                                                        <Form.Group className="Table-filters">
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

        fetchAllBankInfoReducer: state.platformReducers.fetchAllBankInfoReducer,
        fetchSingleBankInfoReducer: state.platformReducers.fetchSingleBankInfoReducer,
        createBankInfoReducer: state.platformReducers.createBankInfoReducer,
        updateBankInfoReducer: state.platformReducers.updateBankInfoReducer,
        searchForCustomerReducer: state.dashboardReducers.searchForCustomerReducer,
    };
}


export default connect(mapStateToProps)(ManageBankInfo);
