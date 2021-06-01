import * as React from "react";
// import {Router} from "react-router";

import { Fragment } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import InnerPageContainer from '../../shared/templates/authed-pagecontainer';
import TableComponent from '../../shared/elements/table'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import "./disbursements.scss";
import XLSX from "xlsx";
import OutTable from "../../shared/elements/outputTable";
import { Formik } from 'formik';
import Modal from 'react-bootstrap/Modal'
import * as Yup from 'yup';
import Alert from 'react-bootstrap/Alert'
import { numberWithCommas, accountNumber } from '../../shared/utils';
import Accordion from 'react-bootstrap/Accordion'
import Select from 'react-select';
import { disbursementActions } from '../../redux/actions/disbursment/disbursment.action';
import { disbursmentConstants } from '../../redux/actiontypes/disbursment/disbursment.constants'
import { banksList } from '../../shared/banks'

import DisbursementNav from './_menu'
class InitiateDisbursement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            disburmentOption: null,
            showPostData:false
        }


    }
    componentDidMount() {
        if (this.props.postDisbursementReducer.request_status !== undefined && this.props.postDisbursementReducer.request_status === disbursmentConstants.POST_DISBURSMENT_EDIT) {
            this.props.dispatch(disbursementActions.postDisbursement("EDIT"))
        } else {
            this.props.dispatch(disbursementActions.postDisbursement("CLEAR"))
        }
        // this.props.dispatch(disbursementActions.postDisbursement("CLEAR"))
        this.getDisbursementBanks();
    }

    getDisbursementBanks = () => {
        const { dispatch } = this.props;
        dispatch(disbursementActions.postNewDisbursementBatch("CLEAR"));
        dispatch(disbursementActions.getDisbursementBanks());
    }


    initiateDisburmentRequest = async (inititationPayload) => {
        const { dispatch } = this.props;

        await dispatch(disbursementActions.postDisbursement(inititationPayload));
    }
    confirmPostDisbursement = async (confirmationPayload) => {
        const { dispatch } = this.props;

        await dispatch(disbursementActions.confirmPostDisbursement(confirmationPayload));
    }

    postNewDisbursement = async (newBatch) => {
        const { dispatch } = this.props;

        await dispatch(disbursementActions.postNewDisbursementBatch(newBatch));
    }

    handleBackToEdit = () => {
        let postDisbursementRequest = this.props.postDisbursementReducer;
        this.props.dispatch(disbursementActions.postDisbursement("EDIT", postDisbursementRequest.request_data.postPayload));
    }

    renderDisbursmentOptions = () => {
        let getDisbursementBanksRequest = this.props.getDisbursementBanksReducer;
        if (getDisbursementBanksRequest.request_status === disbursmentConstants.GET_DISBURSMENTS_BANKS_PENDING) {
            return (
                <div className="loading-content">
                    <div className="loading-text">Please wait... </div>
                </div>
            )
        }

        if (getDisbursementBanksRequest.request_status === disbursmentConstants.GET_DISBURSMENTS_BANKS_SUCCESS) {
            let allbanks = getDisbursementBanksRequest.request_data.response.data;

            if (allbanks !== undefined) {
                if (allbanks.length >= 1) {
                    return (
                        <div className="disbursment-options-wrap">
                            <div className="each-option">
                                <h3> Single Disbursement</h3>
                                <div className="option-msg">
                                    Disburse fund to a single account number.
                                </div>
                                <Button
                                    variant="success"
                                    onClick={() => this.setState({ disburmentOption: "single" })}
                                >
                                    Initiate single disbursment
                                </Button>
                            </div>
                            <div className="each-option">
                                <h3> Batch Disbursement</h3>
                                <div className="option-msg">
                                    Disburse funds to multiple account numbers using an excel templates. All accounts in the list must be valid before the disbursement can be initiated
                                </div>
                                <label className="btn btn-success" htmlFor="upload-batch">Upload new batch</label>
                                <input type="file" id="upload-batch" onChange={this.handleFileUpload} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                                {/* <Button
                                    variant="success"
                                    onClick={() => this.setState({ disburmentOption: "batch" })}
                                >
                                    Initiate batch disbursment
                                </Button> */}
                            </div>
                            <div className="each-option">
                                <h3> Download disbursement template.</h3>
                                <div className="option-msg">
                                    Please use the following excel sheet template to disburse funds to multiple accounts.
                                </div>
                                <Button
                                    variant="success"
                                >
                                    <Link to="/files/lingo-batch-disburse.xlsx" target="_blank" download>Download Template</Link>
                                   {/* <a href="/assets/lingo-batch-disburse.xlsx" download>Download Template</a> */}
                                </Button>
                            </div>
                        </div>
                    )
                } return (
                    <div className="no-records">
                        Unable to get Destination Banks
                    </div>
                )
            } else {
                return null;
            }

        }

        if (getDisbursementBanksRequest.request_status === disbursmentConstants.GET_DISBURSMENTS_BANKS_FAILURE) {
            return (
                <div className="loading-content errormsg">
                    <div>{getDisbursementBanksRequest.request_data.error}</div>
                </div>
            )
        }

    }

    make_cols = (refstr) => {
        let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
        for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
        return o;
    };



    handleFileUpload = (file/*:File*/) => {
        /* Boilerplate to set up FileReader */
        this.setState({ batchDataFromFile: undefined, disburmentOption: null })
        const files = file.target.files;
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            /* Update state */
            this.setState({ batchDataFromFile: data, renderUploaded: true, disburmentOption: "", batchDataCols: this.make_cols(ws['!ref']), docuploaded: files[0] });
        };
        if (rABS) reader.readAsBinaryString(files[0]); else reader.readAsArrayBuffer(files[0]);

        // var refreshIntervalId = setInterval(fname, 10000);

        /* later */
        // clearInterval(refreshIntervalId);

        let checkIfLoaded = setInterval(() => {
            if (document.querySelector('.Table-wrap')) {
                window.scrollTo({
                    top: document.querySelector('.Table-wrap').offsetTop,
                    behavior: 'smooth'
                });
                clearInterval(checkIfLoaded)
            }
        }, 300);
    };

    removeEntry = (entry) => {
        let { batchDataFromFile } = this.state;

        let newBatch = batchDataFromFile.splice(entry, 1);

        this.setState({ batchDataFromFile })
    }

    handleClose = () => {
        this.setState({ showAddEntry: false })
    }

    handleshowPostData = () => {
        const { dispatch } = this.props;

        // dispatch(disbursementActions.postNewDisbursementBatch("CLEAR"));

        this.setState({ showPostData: true })
    }

    handleClosePostData = () => {
        this.setState({ showPostData: false })
    }

    addNewEntry = () => {
        let { showAddEntry } = this.state;
        let processDisburmentValidationSchema = Yup.object().shape({
            bankCode: Yup.string()
                .required('required'),
            narration: Yup.string()
                .required('required'),
            amount: Yup.string()
                .required('required'),
            destinationAccount: Yup.string()
                .required('required'),
        }),
            getDisbursementBanksRequest = this.props.getDisbursementBanksReducer,
            allBanksList = [],
            allbanks = getDisbursementBanksRequest.request_data.response.data;

        if (allbanks.length >= 1) {
            allbanks.map(eachBank => {
                allBanksList.push({ label: eachBank.bankName, value: eachBank.bankCode })
            })
        }
        return (
            <Modal show={showAddEntry} onHide={this.handleClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={true}>
                <Modal.Header>
                    <Modal.Title>Add new Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            bankCode: '',
                            narration: '',
                            amount: '',
                            destinationAccount: ''
                        }}
                        validationSchema={processDisburmentValidationSchema}
                        onSubmit={(values, { resetForm }) => {
                            let { batchDataFromFile } = this.state,
                                batchFileTemp = [...batchDataFromFile];
                            let newEntry = [values.bankCode, values.destinationAccount, parseFloat(values.amount.replace(/,/g, '')), values.narration];

                            batchFileTemp.push(newEntry);

                            this.setState({ batchDataFromFile: batchFileTemp, showAddEntry: false });
                            resetForm()



                        }}
                    >
                        {({ handleSubmit,
                            handleChange,
                            handleBlur,
                            resetForm,
                            values,
                            setFieldValue,
                            setFieldTouched,
                            touched,
                            isValid,
                            errors, }) => (
                                <Form noValidate
                                    onSubmit={handleSubmit}>

                                    <Form.Row>
                                        <Col>
                                            <Form.Group controlId="bankCode">
                                                <Form.Label className="block-level">Destination Bank</Form.Label>
                                                <Select
                                                    options={allBanksList}
                                                    className={errors.bankCode && touched.bankCode ? "is-invalid" : ""}
                                                    onChange={(selected) => setFieldValue('bankCode', selected.value)}
                                                    onBlur={() => setFieldTouched('bankCode', true)}
                                                    name="bankCode"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="destinationAccount">
                                                <Form.Label className="block-level">Destination Account </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="destinationAccount"
                                                    onBlur={handleBlur}
                                                    // maxLength="10"
                                                    onChange={handleChange}
                                                    // onChange={(value) => setFieldValue('destinationAccount', value)}
                                                    // onBlur={()=> setFieldTouched('destinationAccount', true)}
                                                    value={accountNumber(values.destinationAccount, 10)}
                                                    className={errors.destinationAccount && touched.destinationAccount ? "is-invalid withcustom" : "withcustom"} />

                                                {errors.destinationAccount && touched.destinationAccount ? (
                                                    <span className="invalid-feedback">{errors.destinationAccount}</span>
                                                ) : null}
                                            </Form.Group></Col>
                                    </Form.Row>

                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">Amount</Form.Label>
                                            <Form.Control
                                                type="text"
                                                maxLength="9"
                                                name="amount"
                                                onChange={handleChange}
                                                // pattern="\d+((\.|,)\d+)?"
                                                value={numberWithCommas(values.amount)}
                                                className={errors.amount && touched.amount ? "is-invalid" : ""} />

                                            {errors.amount && touched.amount ? (
                                                <span className="invalid-feedback">{errors.amount}</span>
                                            ) : null}
                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Narration</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows="2"
                                                name="narration"
                                                onChange={handleChange}
                                                value={values.narration}
                                                className={errors.narration && touched.narration ? "is-invalid" : ""} />

                                            {errors.narration && touched.narration ? (
                                                <span className="invalid-feedback">{errors.narration}</span>
                                            ) : null}
                                        </Col>
                                    </Form.Row>





                                    <div className="footer-with-cta toleft">
                                        {/* <Button variant="secondary" className="grayed-out" onClick={this.handleCloseEdit}>Cancel</Button> */}
                                        <Button
                                            variant="secondary"
                                            type="button"
                                            onClick={() => this.setState({ showAddEntry: false })}
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            type="submit">
                                            Add Entry
                                        </Button>
                                    </div>

                                </Form>
                            )}
                    </Formik>

                </Modal.Body>
            </Modal>
        )
    }

    renderPostABatch = () => {
        let { showPostData, batchDataFromFile } = this.state;
            let postDisbursementRequest = this.props.postNewDisbursementBatchReducer;
        let processDisburmentValidationSchema = Yup.object().shape({
                transactionSource: Yup.string()
                    .required('required'),
                sourceAccount: Yup.string()
                    .required('required'),
                batchDescription: Yup.string()
                    .required('required'),
            }),

            transactionSourceList = [
                { label: "BankOne", value: 1 },
                { label: "BankLingo", value: 2 }
            ],

            allBatchData = [];
            // batchDataFromFile.splice(0,1);

            batchDataFromFile.map((eachRow, rowIndex)=>{
                let dataTemp = {}
                if(rowIndex >=1 ){
                    eachRow.map((eachData, dataIndex)=>{
                        console.log("row is", eachData)
                        if(dataIndex===0){
                            dataTemp.bankCode = eachData
                        }
                        if (dataIndex === 1) {
                            dataTemp.destinationAccount = eachData.toString()
                        }
                        if (dataIndex === 2) {
                            dataTemp.amount = eachData
                        }
                        if (dataIndex === 3) {
                            dataTemp.narration = eachData
                        }

                    })
                    allBatchData.push(dataTemp)
                }



            })





        return (
            <Modal show={showPostData} onHide={this.handleClosePostData} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading" animation={true}>
                <Modal.Header>
                    <Modal.Title>Post Batch</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            transactionSource: '',
                            sourceAccount: '',
                            batchDescription: '',
                        }}
                        validationSchema={processDisburmentValidationSchema}
                        onSubmit={(values, { resetForm }) => {

                            let batchPayload = {
                                batchDescription: values.batchDescription,
                                disbursementItemModels:allBatchData,
                                transactionSource: values.transactionSource,
                                sourceAccount:values.sourceAccount
                            }

                            this.postNewDisbursement(batchPayload)
                                .then(()=>{

                                    if(this.props.postNewDisbursementBatchReducer.request_status === disbursmentConstants.NEW_DISBURSMENT_BATCH_SUCCESS){
                                        // console.log("data gotten", this.props.postNewDisbursementBatchReducer.request_data);
                                        setTimeout(() => {
                                            this.setState({batchDataFromFile:"",showPostData:false, renderUploaded:false, disburmentOption:null})
                                        }, 4000);

                                    }
                                })


                            // resetForm()



                        }}
                    >
                        {({ handleSubmit,
                            handleChange,
                            handleBlur,
                            resetForm,
                            values,
                            setFieldValue,
                            setFieldTouched,
                            touched,
                            isValid,
                            errors, }) => (
                                <Form noValidate
                                    onSubmit={handleSubmit}>

                                    <Form.Row>
                                        <Col>
                                            <Form.Group controlId="bankCode">
                                                <Form.Label className="block-level">Transaction Source</Form.Label>
                                                <Select
                                                    options={transactionSourceList}
                                                    className={errors.transactionSource && touched.transactionSource ? "is-invalid" : ""}
                                                    onChange={(selected) => setFieldValue('transactionSource', selected.value)}
                                                    onBlur={() => setFieldTouched('transactionSource', true)}
                                                    name="transactionSource"
                                                    required
                                                />
                                                {errors.transactionSource && touched.transactionSource ? (
                                                    <span className="invalid-feedback">{errors.transactionSource}</span>
                                                ) : null}
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">Source Account</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="sourceAccount"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={accountNumber(values.sourceAccount, 10)}
                                                className={errors.sourceAccount && touched.sourceAccount ? "is-invalid withcustom" : "withcustom"} />

                                            {errors.sourceAccount && touched.sourceAccount ? (
                                                <span className="invalid-feedback">{errors.sourceAccount}</span>
                                            ) : null}
                                        </Col>
                                    </Form.Row>

                                    <Form.Group>


                                            <Form.Label className="block-level">Batch Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows="2"
                                                name="batchDescription"
                                                onChange={handleChange}
                                                value={values.batchDescription}
                                                className={errors.batchDescription && touched.batchDescription ? "is-invalid" : ""} />

                                            {errors.batchDescription && touched.batchDescription ? (
                                                <span className="invalid-feedback">{errors.batchDescription}</span>
                                            ) : null}

                                    </Form.Group>




                                    {postDisbursementRequest.request_status !== disbursmentConstants.NEW_DISBURSMENT_BATCH_SUCCESS &&
                                    <div className="footer-with-cta toleft">

                                        <Button
                                            type="submit"
                                            onClick={handleSubmit}
                                            disabled={postDisbursementRequest.is_request_processing}
                                            >
                                            {postDisbursementRequest.is_request_processing? "Please wait...": "Initiate Disbursment"}

                                        </Button>
                                    </div>
                                    }
                                    {postDisbursementRequest.request_status === disbursmentConstants.NEW_DISBURSMENT_BATCH_FAILURE &&
                                        <Alert variant="danger">
                                            {postDisbursementRequest.request_data.error}
                                        </Alert>
                                    }
                                    {postDisbursementRequest.request_status === disbursmentConstants.NEW_DISBURSMENT_BATCH_SUCCESS &&
                                        <Alert variant="success">
                                            <div>
                                                 Total amount in batch : {this.props.postNewDisbursementBatchReducer.request_data.response.data.totalAmount}
                                            </div>
                                            <div>
                                                Total Fee : {this.props.postNewDisbursementBatchReducer.request_data.response.data.totalFees}
                                                {/* Total Fee : {postDisbursementRequest.request_data.response.data.totalFees} */}
                                            </div>


                                        </Alert>
                                    }

                                </Form>
                            )}
                    </Formik>

                </Modal.Body>
            </Modal>
        )
    }

    renderBatchDisbursment = () => {
        let { batchDataFromFile, batchDataCols } = this.state;
        return (
            <div className="batch-data-wrap">
                {(batchDataFromFile !== undefined && batchDataCols !== undefined) &&
                    <div className="">
                        <div className="batch-actions">
                            <Button
                                variant="light"
                                onClick={() => this.setState({ showAddEntry: true })}
                            >
                                Add New Entry
                            </Button>
                            {/* <label htmlFor="upload-newbatch" className="btn btn-secondary">Upload New Batch</label>
                            <input type="file" id="upload-newbatch" onChange={this.handleFileUpload} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" /> */}
                            <Button
                                variant="success"
                                onClick={this.handleshowPostData}
                                className="batch-cta"
                            >
                                Submit batch
                            </Button>

                        </div>
                        {/* <OutTable amountIndex={4} addRowAction={false} rowActionText="Remove entry" data={batchDataFromFile} cols={batchDataCols} /> */}
                        <OutTable amountIndex={4} addRowAction={true} rowAction={this.removeEntry} rowActionText="Remove entry" data={batchDataFromFile} cols={batchDataCols} />
                    </div>
                }

            </div>
        )
    }

    renderUploadBatch = () => {

        return (
            <div className="upload-a-batch">
                <label htmlFor="upload-batch">Upload a batch</label>
                <input type="file" id="upload-batch" onChange={this.handleFileUpload} accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
            </div>
        )
    }




    renderInitiateDisburment = () => {
        let postDisbursementRequest = this.props.postNewDisbursementBatchReducer,
            getDisbursementBanksRequest = this.props.getDisbursementBanksReducer,
            initiateDisburmentValidationSchema = Yup.object().shape({
                bankCode: Yup.string()
                    .min(1, 'Please select a Bank')
                    .required('Please select a Bank'),
                destinationAccount: Yup.string()
                    .min(1, 'Please provide account number')
                    .max(10, 'Max Limit reached')
                    .required('Account number is required'),
                amount: Yup.string()
                    .min(1, 'Please provide amount')
                    // .max(9, 'Max limit reached')
                    .required('Amount is required'),
                transactionSource: Yup.string()
                    .min(1, 'Please select source')
                    .required('Transaction source is required'),
                narration: Yup.string()
                    .min(1, 'Please provide narration')
                    .required('Narration is required'),
                sourceAccount: Yup.string()
                    .min(1, 'Please provide a valid source account')
                    .max(10, 'Max Limit reached')
                    .required('Source account is required'),
            }),
            allBanksList = [],
            transactionSourceList = [
                { label: "BankOne", value: 1 },
                { label: "BankLingo", value: 2 }
            ],
            dataToEdit = null,
            destinationBankToEdit = null,
            txtSourceToEdit = null;



        if (postDisbursementRequest.request_status === disbursmentConstants.POST_DISBURSMENT_EDIT) {

            dataToEdit = postDisbursementRequest.request_data.dataToEdit;
            destinationBankToEdit = getDisbursementBanksRequest.request_data.response.data.filter(bank => bank.bankCode === dataToEdit.bankCode)[0];
            txtSourceToEdit = transactionSourceList.filter(source => source.value === dataToEdit.transactionSource)[0];
        }


        switch (getDisbursementBanksRequest.request_status) {
            case (disbursmentConstants.GET_DISBURSMENTS_BANKS_PENDING):
                return (
                    <div className="loading-content">
                        <div className="loading-text">Please wait... </div>
                    </div>
                )
            case (disbursmentConstants.GET_DISBURSMENTS_BANKS_SUCCESS):
                let allbanks = getDisbursementBanksRequest.request_data.response.data;
                const { selectedBank, selectedTxtSource } = this.state;
                if (allbanks !== undefined) {
                    if (allbanks.length >= 1) {
                        allbanks.map(eachBank => {
                            allBanksList.push({ label: eachBank.bankName, value: eachBank.bankCode })
                        })
                        return (
                            <div>
                                <Formik
                                    initialValues={{
                                        bankCode: dataToEdit !== null ? destinationBankToEdit.bankCode : '',
                                        destinationAccount: dataToEdit !== null ? dataToEdit.destinationAccount : '',
                                        amount: dataToEdit !== null ? numberWithCommas(dataToEdit.amount, true) : '',
                                        transactionSource: dataToEdit !== null ? parseInt(txtSourceToEdit.value) : '',
                                        narration: dataToEdit !== null ? dataToEdit.narration : '',
                                        sourceAccount: dataToEdit !== null ? dataToEdit.sourceAccount : '',
                                    }}
                                    validationSchema={initiateDisburmentValidationSchema}
                                    onSubmit={(values, { resetForm }) => {
                                    

                                        let initiationPayload = {
                                            batchDescription: values.narration,
                                            disbursementItemModels:[{
                                                bankCode: values.bankCode,
                                                destinationAccount: values.destinationAccount,
                                                amount: parseFloat(values.amount.replace(/,/g, '')),
                                                narration: values.narration,
                                            }],
                                            transactionSource: parseInt(values.transactionSource),
                                            sourceAccount: values.sourceAccount,
                                        };


                                        this.postNewDisbursement(initiationPayload)
                                            .then(()=>{

                                                if(this.props.postNewDisbursementBatchReducer.request_status === disbursmentConstants.NEW_DISBURSMENT_BATCH_SUCCESS){
                                                    // console.log("data gotten", this.props.postNewDisbursementBatchReducer.request_data);
                                                    setTimeout(() => {
                                                        this.setState({batchDataFromFile:"",showPostData:false, renderUploaded:false, disburmentOption:null})
                                                    }, 4000);

                                                }
                                            })



                                    }}
                                >
                                    {({ handleSubmit,
                                        handleChange,
                                        handleBlur,
                                        resetForm,
                                        values,
                                        setFieldValue,
                                        setFieldTouched,
                                        touched,
                                        isValid,
                                        errors, }) => (
                                            <Form
                                                className="form-content w-60 card"
                                                noValidate
                                                onSubmit={handleSubmit}
                                            >
                                                <Accordion defaultActiveKey="0">
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        Sender Details
                                                            </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div>
                                                            <Form.Row>

                                                                <Col>
                                                                    <Form.Label className="block-level">Transaction Source</Form.Label>
                                                                    {/* <Form.Control
                                                                                type="text"
                                                                                name="transactionSource"
                                                                                onChange={handleChange}
                                                                                value={values.transactionSource}
                                                                                className={errors.transactionSource && touched.transactionSource ? "is-invalid" : ""} /> */}
                                                                    {dataToEdit !== null &&
                                                                        <Select
                                                                            options={transactionSourceList}
                                                                            className={errors.transactionSource && touched.transactionSource ? "is-invalid" : ""}
                                                                            // onBlur={handleBlur}
                                                                            defaultValue={{ label: txtSourceToEdit.label, value: txtSourceToEdit.value }}
                                                                            // onChange={(selectedTxtSource) => {
                                                                            //     this.setState({ selectedTxtSource });
                                                                            //     errors.transactionSource = null
                                                                            //     touched.transactionSource = true
                                                                            //     values.transactionSource = selectedTxtSource.value
                                                                            // }}

                                                                            onChange={(selected) => setFieldValue('transactionSource', selected.value)}
                                                                            onBlur={() => setFieldTouched('transactionSource', true)}
                                                                            name="transactionSource"
                                                                            required
                                                                        />
                                                                    }

                                                                    {dataToEdit === null &&
                                                                        <Select
                                                                            options={transactionSourceList}
                                                                            className={errors.transactionSource && touched.transactionSource ? "is-invalid" : ""}
                                                                            // onBlur={handleBlur}
                                                                            // onChange={(selectedTxtSource) => {
                                                                            //     this.setState({ selectedTxtSource });
                                                                            //     errors.transactionSource = null
                                                                            //     touched.transactionSource = true
                                                                            //     values.transactionSource = selectedTxtSource.value
                                                                            // }}
                                                                            onChange={(selected) => setFieldValue('transactionSource', selected.value)}
                                                                            onBlur={() => setFieldTouched('transactionSource', true)}
                                                                            name="transactionSource"
                                                                            required
                                                                        />
                                                                    }
                                                                   
                                                                    {errors.transactionSource && touched.transactionSource ? (
                                                                        <span className="invalid-feedback">{errors.transactionSource}</span>
                                                                    ) : null}
                                                                </Col>
                                                                <Col>
                                                                    <Form.Label className="block-level">Source Account</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        name="sourceAccount"
                                                                        onBlur={handleBlur}
                                                                        onChange={handleChange}
                                                                            value={accountNumber(values.sourceAccount, 10)}
                                                                        className={errors.sourceAccount && touched.sourceAccount ? "is-invalid withcustom" : "withcustom"} />

                                                                    {errors.sourceAccount && touched.sourceAccount ? (
                                                                        <span className="invalid-feedback">{errors.sourceAccount}</span>
                                                                    ) : null}
                                                                </Col>
                                                            </Form.Row>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>

                                                <Accordion defaultActiveKey="0">
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        Recipient Details
                                                            </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div>
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Group controlId="bankCode">
                                                                        <Form.Label className="block-level">Destination Bank</Form.Label>

                                                                        {dataToEdit !== null &&
                                                                            <Select
                                                                                options={allBanksList}
                                                                                className={errors.bankCode && touched.bankCode ? "is-invalid" : ""}
                                                                                defaultValue={{ label: destinationBankToEdit.bankName, value: destinationBankToEdit.bankCode }}
                                                                       
                                                                                onChange={(selected) => setFieldValue('bankCode', selected.value)}
                                                                                onBlur={() => setFieldTouched('bankCode', true)}
                                                                                name="bankCode"
                                                                                required
                                                                            />
                                                                        }

                                                                        {dataToEdit === null &&
                                                                            <Select
                                                                                options={allBanksList}
                                                                                className={errors.bankCode && touched.bankCode ? "is-invalid" : ""}
                                                                              
                                                                                onChange={(selected) => setFieldValue('bankCode', selected.value)}
                                                                                onBlur={() => setFieldTouched('bankCode', true)}
                                                                                name="bankCode"
                                                                                required
                                                                            />
                                                                        }

                                                                        {errors.bankCode && touched.bankCode ? (
                                                                            <span className="invalid-feedback">{errors.bankCode}</span>
                                                                        ) : null}
                                                                    </Form.Group>
                                                                </Col>
                                                                <Col>
                                                                    <Form.Group controlId="destinationAccount">
                                                                        <Form.Label className="block-level">Destination Account </Form.Label>
                                                                        <Form.Control
                                                                            type="text"
                                                                            name="destinationAccount"
                                                                            onBlur={handleBlur}
                                                                            // maxLength="10"
                                                                            onChange={handleChange}
                                                                            // onChange={(value) => setFieldValue('destinationAccount', value)}
                                                                            // onBlur={()=> setFieldTouched('destinationAccount', true)}
                                                                            value={accountNumber(values.destinationAccount, 10)}
                                                                            className={errors.destinationAccount && touched.destinationAccount ? "is-invalid withcustom" : "withcustom"} />

                                                                        {errors.destinationAccount && touched.destinationAccount ? (
                                                                            <span className="invalid-feedback">{errors.destinationAccount}</span>
                                                                        ) : null}
                                                                    </Form.Group>
                                                                </Col>
                                                            </Form.Row>
                                                            <Form.Row>
                                                                <Col>
                                                                    <Form.Label className="block-level">Amount</Form.Label>
                                                                    <Form.Control
                                                                        type="text"
                                                                        // maxLength="9"
                                                                        name="amount"
                                                                        // onChange={
                                                                        //     (e)=>{
                                                                        //         if(!Number(e.target.value))
                                                                        //         console.log("tttttt", e.target.value)
                                                                        //     }
                                                                        // }
                                                                        onChange={handleChange}
                                                                        // pattern="\d+((\.|,)\d+)?"
                                                                        value={numberWithCommas(values.amount)}
                                                                        className={errors.amount && touched.amount ? "is-invalid" : ""} />

                                                                    {errors.amount && touched.amount ? (
                                                                        <span className="invalid-feedback">{errors.amount}</span>
                                                                    ) : null}
                                                                </Col>
                                                                <Col>
                                                                    <Form.Label className="block-level">Narration</Form.Label>
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        rows="2"
                                                                        name="narration"
                                                                        onChange={handleChange}
                                                                        value={values.narration}
                                                                        className={errors.narration && touched.narration ? "is-invalid" : ""} />

                                                                    {errors.narration && touched.narration ? (
                                                                        <span className="invalid-feedback">{errors.narration}</span>
                                                                    ) : null}
                                                                </Col>

                                                            </Form.Row>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>



                                                <div className="form-ctas horizontal">
                                                    <Button variant="success"

                                                        type="submit"
                                                        onClick={handleSubmit}
                                                        disabled={postDisbursementRequest.is_request_processing}>
                                                        {postDisbursementRequest.is_request_processing ? "Please wait..." : "Inititate Disburment"}
                                                    </Button>
                                                    {/* <Button variant="light" type="button"> Cancel</Button> */}
                                                </div>

                                                {/* {postDisbursementRequest.request_status === disbursmentConstants.POST_DISBURSMENT_FAILURE &&
                                                    <Alert variant="danger">
                                                        {postDisbursementRequest.request_data.error}
                                                    </Alert>
                                                } */}

                                                {postDisbursementRequest.request_status === disbursmentConstants.NEW_DISBURSMENT_BATCH_FAILURE &&
                                                    <Alert variant="danger">
                                                        {postDisbursementRequest.request_data.error}
                                                    </Alert>
                                                }
                                                {postDisbursementRequest.request_status === disbursmentConstants.NEW_DISBURSMENT_BATCH_SUCCESS &&
                                                    <Alert variant="success">
                                                        <div>
                                                            Total amount in batch : {this.props.postNewDisbursementBatchReducer.request_data.response.data.totalAmount}
                                                        </div>
                                                        <div>
                                                            Total Fee : {this.props.postNewDisbursementBatchReducer.request_data.response.data.totalFees}
                                                            {/* Total Fee : {postDisbursementRequest.request_data.response.data.totalFees} */}
                                                        </div>


                                                    </Alert>
                                                }
                                            </Form>

                                        )}
                                </Formik>
                            </div>
                        )
                    } return (
                        <div className="no-records">
                            Unable to get Destination Banks
                        </div>
                    )

                } else {
                    return null;
                }

            case (disbursmentConstants.GET_DISBURSMENTS_BANKS_FAILURE):
                return (
                    <div className="loading-content errormsg">
                        <div>{getDisbursementBanksRequest.request_data.error}</div>
                    </div>
                )
            default:
                return null;
        }

    }

    renderConfirmDisburment = () => {
        let confirmPostDisbursementReducer = this.props.confirmPostDisbursementReducer,
            postDisbursementResponse = this.props.postDisbursementReducer.request_data.response.data,
            getDisbursementBanksRequest = this.props.getDisbursementBanksReducer,
            postDisbursementpayload = this.props.postDisbursementReducer.request_data.postPayload,
            confirmDisburmentValidationSchema = Yup.object().shape({
                securityCode: Yup.string()
                    .min(1, 'Valid response required')
                    .required('Please provide security sent to you')
            }),
            allbanks = getDisbursementBanksRequest.request_data.response.data,
            allBanksList = [],
            selectedTxtSourceCode = postDisbursementpayload.transactionSource,
            selectedDestinationBankCode = postDisbursementpayload.bankCode,
            transactionSourceList = [
                { label: "BankOne", value: 1 },
                { label: "BankLingo", value: 2 }
            ],
            selectedTxtSourceText = transactionSourceList.filter(source => source.value == selectedTxtSourceCode)[0].label;

        allbanks.map(eachBank => {
            allBanksList.push({ label: eachBank.bankName, value: eachBank.bankCode })
        })

        let selectedDestinationBankText = allBanksList.filter(bank => bank.value === selectedDestinationBankCode)[0].label;



        return (
            <div>
                <Formik
                    initialValues={{
                        securityCode: '',
                    }}
                    // validationSchema={confirmDisburmentValidationSchema}
                    onSubmit={(values, { resetForm }) => {
                        let confirmPayload = {
                            securityCode: values.securityCode,
                            transactionReference: postDisbursementResponse.transactionReference
                        };



                        this.confirmPostDisbursement(confirmPayload)
                            .then(
                                () => {
                                    // resetForm();
                                    setTimeout(() => {
                                        if (this.props.confirmPostDisbursementReducer.request_status === disbursmentConstants.CONFIRM_DISBURSMENT_SUCCESS) {
                                            this.props.dispatch(disbursementActions.postDisbursement("CLEAR"))
                                            this.props.dispatch(disbursementActions.confirmPostDisbursement("CLEAR"))
                                        }

                                    }, 3000);

                                }
                            )

                    }}
                >
                    {({ handleSubmit,
                        handleChange,
                        handleBlur,
                        resetForm,
                        values,
                        touched,
                        isValid,
                        errors, }) => (
                            <Form
                                className="form-content w-60 card"
                                // noValidate
                                onSubmit={handleSubmit}
                            >
                                <div className="form-heading">
                                    <h3>Confirm Disbursment</h3>
                                </div>
                                <div className="back-cta centered" onClick={this.handleBackToEdit}>
                                    <span className="back-link">Edit</span>
                                </div>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Sender Details
                                                            </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Sender Name</Form.Label>
                                                    <span className="form-text disabled-field">{postDisbursementResponse.senderName}</span>
                                                </Col>
                                                <Col></Col>
                                            </Form.Row>
                                            <Form.Row>

                                                <Col>
                                                    <Form.Label className="block-level">Transaction Source</Form.Label>


                                                    <span className="form-text disabled-field">{selectedTxtSourceText}</span>
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Source Account</Form.Label>
                                                    <span className="form-text disabled-field">{postDisbursementpayload.sourceAccount}</span>
                                                </Col>
                                            </Form.Row>
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>

                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Recipient Details
                                                            </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Recipient Name</Form.Label>
                                                    <span className="form-text disabled-field">{postDisbursementResponse.recipientName}</span>
                                                </Col>
                                                <Col></Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Group controlId="bankCode">
                                                        <Form.Label className="block-level">Destination Bank</Form.Label>
                                                        <span className="form-text disabled-field">{selectedDestinationBankText}</span>
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group controlId="destinationAccount">
                                                        <Form.Label className="block-level">Destination Account </Form.Label>
                                                        <span className="form-text disabled-field">{postDisbursementpayload.destinationAccount}</span>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>
                                            <Form.Row>
                                                <Col>
                                                    <Form.Label className="block-level">Amount</Form.Label>
                                                    <span className="form-text disabled-field">{numberWithCommas(postDisbursementpayload.amount, true)}</span>
                                                </Col>
                                                <Col>
                                                    <Form.Label className="block-level">Narration</Form.Label>
                                                    <span className="form-text disabled-field">{postDisbursementpayload.narration}</span>
                                                </Col>

                                            </Form.Row>

                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                        Provide Confirmation details
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            <Form.Row>

                                                <Col>
                                                    <Form.Group controlId="destinationAccount">
                                                        <Form.Label className="block-level">Security Code</Form.Label>
                                                        <Form.Control type="password"
                                                            name="securityCode"
                                                            onChange={handleChange}
                                                            placeholder="Enter the security code sent to you"
                                                            value={values.securityCode}
                                                            className={errors.securityCode && touched.securityCode ? "is-invalid" : ""}
                                                            required />
                                                        {errors.securityCode && touched.securityCode ? (
                                                            <span className="invalid-feedback">{errors.securityCode}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                </Col>
                                                <Col></Col>
                                            </Form.Row>

                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>


                                {this.props.confirmPostDisbursementReducer.request_status !== disbursmentConstants.CONFIRM_DISBURSMENT_SUCCESS &&
                                    <div className="form-ctas horizontal">
                                        <Button variant="success"
                                            className="mr-20px"
                                            type="submit"
                                            onClick={handleSubmit}
                                            disabled={confirmPostDisbursementReducer.is_request_processing}>
                                            {confirmPostDisbursementReducer.is_request_processing ? "Please wait..." : "Confirm Disburment"}
                                        </Button>
                                        <Button variant="light" className="btn btn-light" onClick={this.handleBackToEdit}> Edit</Button>
                                        {/* <Button variant="light" type="button"> Cancel</Button> */}
                                    </div>
                                }
                                {/* <div className="back-cta centered" onClick={this.handleBackToEdit}>
                                    <span className="back-link">Edit</span>
                                </div> */}
                                {confirmPostDisbursementReducer.request_status === disbursmentConstants.CONFIRM_DISBURSMENT_SUCCESS &&
                                    <Alert variant="success">
                                        {confirmPostDisbursementReducer.request_data.response.data.message}
                                    </Alert>
                                }
                                {confirmPostDisbursementReducer.request_status === disbursmentConstants.CONFIRM_DISBURSMENT_FAILURE &&
                                    <Alert variant="danger">
                                        {confirmPostDisbursementReducer.request_data.error}
                                    </Alert>
                                }
                            </Form>

                        )}
                </Formik>
            </div>
        )
    }

    render() {
        let { disburmentOption, renderUploaded, showAddEntry, showPostData } = this.state;
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    <div className="content-wrapper">
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Initiate Disbursements</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <DisbursementNav />
                                    {/* <ul className="nav">
                                        <li>
                                            <NavLink exact to={'/disbursements'}>Disbursements</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/initiate'}>Initiate Disbursement</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/pending-review'}>Pending Review</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/pending-approval'}>Pending Approval</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/nip-requests'}>NIP Requests</NavLink>

                                        </li>
                                    </ul> */}
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {/* <div className="heading-with-cta">
                                                    <h3 className="section-title">Disbursement</h3>
                                                </div> */}
                                                {disburmentOption === null &&
                                                    this.renderDisbursmentOptions()
                                                }
                                                {(this.props.postDisbursementReducer.request_status !== disbursmentConstants.POST_DISBURSMENT_SUCCESS && disburmentOption === "single") &&
                                                    this.renderInitiateDisburment()
                                                }

                                                {(this.props.postDisbursementReducer.request_status !== disbursmentConstants.POST_DISBURSMENT_SUCCESS && disburmentOption === "batch") &&
                                                    this.renderUploadBatch()
                                                }
                                                {showAddEntry &&
                                                    this.addNewEntry()
                                                }
                                                {showPostData &&
                                                    this.renderPostABatch()
                                                }

                                                {
                                                    renderUploaded &&
                                                    this.renderBatchDisbursment()
                                                }

                                                {this.props.postDisbursementReducer.request_status === disbursmentConstants.POST_DISBURSMENT_SUCCESS &&
                                                    this.renderConfirmDisburment()
                                                }
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
        postDisbursementReducer: state.disbursmentReducers.postDisbursementReducer,
        confirmPostDisbursementReducer: state.disbursmentReducers.confirmPostDisbursementReducer,
        getDisbursementBanksReducer: state.disbursmentReducers.getDisbursementBanksReducer,
        postNewDisbursementBatchReducer: state.disbursmentReducers.postNewDisbursementBatchReducer,
    };
}

export default connect(mapStateToProps)(InitiateDisbursement);
