import * as React from "react";
// import {Router} from "react-router";


import { connect } from 'react-redux';
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Select from 'react-select';
import Dropdown from 'react-bootstrap/Dropdown'
import Modal from 'react-bootstrap/Modal'
import * as Yup from 'yup';
import "react-datepicker/dist/react-datepicker.css";
import Alert from 'react-bootstrap/Alert'
import { Formik } from 'formik';
// import  TableComponent from '../../../shared/elements/table'
import "../../customerprofile.scss"; 

import { numberWithCommas} from '../../../../shared/utils';
import { administrationConstants } from "../../../../redux/actiontypes/administration/administration.constants";
import { loanAndDepositsConstants } from "../../../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants";
import { loanActions } from "../../../../redux/actions/loans/loans.action";
import { depositActions } from "../../../../redux/actions/deposits/deposits.action";
import AsyncSelect from 'react-select/async';

export class MakeTransferModal extends React.Component {
    constructor(props) {
        super(props);
        // this.clientEncodedKey = this.props.match.params.id;
        this.state = {
            // showModal:false,
            typeOfTransfer: "currentcustomer"
        }

    }


    componentDidMount() {
        // this.loadInitialCustomerData();
    }

    loadCustomerAccounts = (selectedClientEncodedKey) => {
        let searchForAccountsWithCustomerKeyRequest = this.props
            .searchForAccountsWithCustomerKeyReducer;
        this.getAccountsOfSelectedCustomer(selectedClientEncodedKey).then(() => {
            if (
                this.props.searchForAccountsWithCustomerKeyReducer.request_status ===
                loanAndDepositsConstants.SEARCH_FOR_ACCOUNTS_WITH_CUSTOMERKEY_SUCCESS
            ) {
                let loadedCustomerAccounts = this.props
                    .searchForAccountsWithCustomerKeyReducer.request_data.response.data,
                    customerAccounts = [];

                if (loadedCustomerAccounts.length >= 1) {
                    loadedCustomerAccounts.map((eachAccount, index) => {
                        if (
                            (eachAccount.searchItemType === 2 &&
                                (eachAccount.state === 5 || eachAccount.state === 6)) ||
                            (eachAccount.searchItemType === 3 &&
                                (eachAccount.state === 3 || eachAccount.state === 5))
                        ) {
                            customerAccounts.push({
                                label: eachAccount.searchText,
                                value: eachAccount.searchItemEncodedKey,
                            });
                        }
                    });
                    this.setState({
                        defaultAccountOptions: loadedCustomerAccounts,
                        isCustommerAccountsFetchedWithKey: true,
                    });
                }
            }
        });
    };

    getAccountsOfSelectedCustomer = async (selectedClientEncodedKey) => {
        const { dispatch } = this.props;
        return await dispatch(
            depositActions.searchForAccountsWithCustomerKey(selectedClientEncodedKey)
        );
    };

    getSearchForCustomerOptionValue = (option) => {
        return option.searchItemEncodedKey;
    }; // maps the result 'id' as the 'value'
    getSearchOptionForCustomerLabel = (option) => {
        return `${option.clientName} -${option.clientCode}`;
    }; // maps the result 'name' as the 'label'
    noOptionsForCustomerMessage(inputValue) {
        return "";
    }

    getSearchedCustomerResults = async (inputValue) => {
        const { dispatch } = this.props;

        if (!inputValue || inputValue.length === 0) {
            return null;
        }

        await dispatch(depositActions.searchCustomerAccount(inputValue));
    };

    getSearchForAccountOptionValue = (option) => option.searchItemEncodedKey; // maps the result 'id' as the 'value'
    getSearchOptionForAccountLabel = (option) =>
        `${option.searchText} -${option.searchKey}`; // maps the result 'name' as the 'label'
    noOptionsForAccountMessage(inputValue) {
        return "";
    }

    getSearchedAccountResults = async (inputValue) => {
        const { dispatch } = this.props;

        if (!inputValue || inputValue.length === 0) {
            return null;
        }

        await dispatch(depositActions.searchAccountNumbers(inputValue));
    };

    initiateAccountSearch = (inputValue) => {
        this.setState({
            defaultAccountOptions: "",
            selectOtherCustomerAccount: "",
            firstChosenTransferCriteria: "accounts",
            isCustommerAccountsFetchedWithKey: "",
        });

        let searchAccountNumberRequest = this.props.searchAccountNumbersReducer,
            searchResultsData,
            searchResultsList = [],
            getAClientDepositAccountRequest = this.props
                .getAClientDepositAccountReducer.request_data.response.data;
        this.props.dispatch(depositActions.searchAccountNumbers("CLEAR"));
        if (inputValue.length >= 1) {
            return this.getSearchedAccountResults(inputValue).then(() => {
                if (
                    searchAccountNumberRequest.request_status ===
                    loanAndDepositsConstants.SEARCH_ACCOUNT_NUMBERS_SUCCESS
                ) {
                    searchResultsData =
                        searchAccountNumberRequest.request_data.response.data;

                    searchResultsData = searchResultsData.filter(
                        (eachResult) =>
                            ((eachResult.searchItemType === 3 &&
                                (eachResult.state === 3 || eachResult.state === 5)) ||
                                (eachResult.searchItemType === 2 &&
                                    (eachResult.state === 6 || eachResult.state === 5))) &&
                            eachResult.searchKey !==
                            getAClientDepositAccountRequest.accountNumber &&
                            eachResult.clientEncodedKey !==
                            getAClientDepositAccountRequest.clientEncodedKey
                    );

                    this.setState({ isCustommerAccountsFetchedWithKey: false });

                    return searchResultsData;
                }
            });
        } else {
            return null;
        }
    };

    handleSearchAccountInputChange = (selectedOption, { action }) => {
        if (this.state.isCustommerAccountsFetchedWithKey !== true) {
            this.setState({
                selectOtherCustomerAccount: selectedOption,
                firstChosenTransferCriteria: "accounts",
                selectACustomerAccount: "",
            });
        } else {
            this.setState({
                selectOtherCustomerAccount: selectedOption,
                firstChosenTransferCriteria: "customer",
            });
        }
    };

    handleSearchACustomerInputChange = (selectedOption) => {
        this.loadCustomerAccounts(selectedOption.clientEncodedKey);
        this.setState({
            selectACustomerAccount: selectedOption,
            firstChosenTransferCriteria: "customer",
            selectOtherCustomerAccount: "",
        });
    };

    initiateCustomerSearch = (inputValue) => {
        this.setState({ firstChosenTransferCriteria: "customer" });
        let searchCustomerAccountRequest = this.props.searchCustomerAccountReducer,
            searchResultsData,
            searchResultsList = [],
            getAClientDepositAccountRequest = this.props
                .getAClientDepositAccountReducer.request_data.response.data;
        this.props.dispatch(depositActions.searchCustomerAccount("CLEAR"));
        if (inputValue.length >= 1) {
            return this.getSearchedCustomerResults(inputValue).then(() => {
                if (
                    this.props.searchCustomerAccountReducer.request_status ===
                    loanAndDepositsConstants.SEARCH_CUSTOMER_ACCOUNT_SUCCESS
                ) {
                    // console.log("serch rsulrs", globalSearchAnItemRequest.request_data.response.data);
                    searchResultsData = this.props.searchCustomerAccountReducer
                        .request_data.response.data;

                    // searchResultsData = searchResultsData.filter(eachResult=>(
                    //         (
                    //             (eachResult.searchItemType===3 && (eachResult.state===3 || eachResult.state===5))
                    //             ||
                    //             (eachResult.searchItemType===2 && (eachResult.state===6 || eachResult.state===5))
                    //         )
                    //         && eachResult.searchKey !==getAClientDepositAccountRequest.accountNumber
                    //         ))

                    // return searchResultsData;

                    searchResultsData = searchResultsData.filter(
                        (eachResult) =>
                            eachResult.clientEncodedKey !==
                            getAClientDepositAccountRequest.clientEncodedKey &&
                            eachResult.searchItemEncodedKey !==
                            getAClientDepositAccountRequest.clientEncodedKey
                    );

                    return searchResultsData;
                }
            });
        } else {
            return null;
        }
    };


    render() {
        const { changeDepositState,
            selectOtherCustomerAccount,

            firstChosenTransferCriteria,
            typeOfTransfer,
            newState,
            ctaText,
            newStateHeading,
            newStateUpdate,
            selectACustomerAccount,
            defaultAccountOptions,
            showDepositFundsForm } = this.state;
        let changeDepositStateRequest = this.props.changeDepositStateReducer,
            getAClientDepositAccountRequest = this.props.getAClientDepositAccountReducer.request_data.response.data;

        let customerLoanAccounts = this.props.getClientLoansReducer.request_data.response.data;
        let customerDepositAccounts = this.props.getClientDepositsReducer.request_data.response.data;
        let searchForAccountsWithCustomerKeyRequest = this.props.searchForAccountsWithCustomerKeyReducer;
        let adminGetTransactionChannelsRequest = this.props.adminGetTransactionChannels,
            allChannels = [],
            allAccountOfCurrentCustomer = [],
            channelsList;

        let searchAccountNumberRequest = this.props.searchAccountNumbersReducer;
        if (customerLoanAccounts.result !== null) {
            customerLoanAccounts.result.map((eachLoanAccount, index) => {
                if (eachLoanAccount.loanState === 5 || eachLoanAccount.loanState === 6) {
                    allAccountOfCurrentCustomer.push({ label: `${eachLoanAccount.productName} - ${eachLoanAccount.accountNumber}`, value: eachLoanAccount.encodedKey });
                }
            })
        }

        if (customerDepositAccounts.result !== null) {
            customerDepositAccounts.result.map((eachDepositAccount, index) => {
                if ((eachDepositAccount.accountState === 3 || eachDepositAccount.accountState === 5) && eachDepositAccount.accountNumber !== getAClientDepositAccountRequest.accountNumber) {
                    allAccountOfCurrentCustomer.push({ label: `${eachDepositAccount.productName} - ${eachDepositAccount.accountNumber}`, value: eachDepositAccount.encodedKey });
                }
            })
        }


        if (adminGetTransactionChannelsRequest.request_status === administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS
            && adminGetTransactionChannelsRequest.request_data.response.data.result.length >= 1) {
            channelsList = adminGetTransactionChannelsRequest.request_data.response.data.result;

            channelsList.map((channel, id) => {
                allChannels.push({ label: channel.name, value: channel.encodedKey });
            })
        }

        // let changeDepositStateValidationSchema;
        // if(showDepositFundsForm!==true){
        // changeDepositStateValidationSchema = Yup.object().shape({
        //     comment:  Yup.string()
        //         .min(2, 'Valid comments required'),
        //     notes:  Yup.string()
        //         .min(2, 'Valid notes required'),

        // });
        // }

        // if(newStateUpdate==="beginmaturity"){
        //     changeDepositStateValidationSchema = Yup.object().shape({
        //         notes:  Yup.string()
        //             .min(2, 'Valid notes required'),
        //         maturityDate:  Yup.string()
        //             .required('Required'),

        //     });
        // }

        // if(showDepositFundsForm===true){
        //     changeDepositStateValidationSchema = Yup.object().shape({
        //             notes:  Yup.string()
        //                 .min(2, 'Valid notes required'),
        //             depositChannelEncodedKey:  Yup.string()
        //                 .required('Required'),
        //             amountToDeposit:  Yup.string()
        //                 .required('Required'),
        //             backDateChosen:  Yup.string()
        //                 .when('allowBackDate',{
        //                     is:(value)=>value===true,
        //                     then: Yup.string()
        //                         .required('Required')
        //                 }),
        //             bookingDateChosen:  Yup.string()
        //                 .when('showBookingDate',{
        //                     is:(value)=>value===true,
        //                     then: Yup.string()
        //                         .required('Required')
        //                 }),

        //     });
        // }

        // if(newStateUpdate === "makewithdrawal"){
        //   let  changeDepositStateValidationSchema = Yup.object().shape({
        //             notes:  Yup.string()
        //                 .min(2, 'Valid notes required'),
        //             depositChannelEncodedKey:  Yup.string()
        //                 .required('Required'),
        //             amountToWithdraw:  Yup.string()
        //                 .required('Required'),
        //             backDateChosen:  Yup.string()
        //                 .when('allowBackDate',{
        //                     is:(value)=>value===true,
        //                     then: Yup.string()
        //                         .required('Required')
        //                 }),

        //     });
        // }

        // if(newStateUpdate==="setmaximumwithdrawalamount" || newStateUpdate==="setrecommendeddepositamount"){
        //     changeDepositStateValidationSchema = Yup.object().shape({
        //             notes:  Yup.string()
        //                 .min(2, 'Valid notes required'),
        //             amountToDeposit:  Yup.string()
        //                 .required('Required'),

        //     });
        // }

        // if(newStateUpdate === "transfer"){
        let changeDepositStateValidationSchema;
        if (typeOfTransfer === "currentcustomer") {
            changeDepositStateValidationSchema = Yup.object().shape({
                notes: Yup.string()
                    .min(2, 'Valid notes required'),
                currentCustomerChosenAccount: Yup.string()
                    .required('Required'),
                amountToTransfer: Yup.string()
                    .required('Required'),

            });
        }

        if (typeOfTransfer === "anothercustomer") {
            changeDepositStateValidationSchema = Yup.object().shape({
                notes: Yup.string()
                    .min(2, 'Valid notes required'),
                chosenAccountNum: Yup.string()
                    .required('Required'),
                // chosenCustomerEncodedKey:  Yup.string()
                //     .required('Required'),
                amountToTransfer: Yup.string()
                    .required('Required'),

            });
        }
        // }

        return (
            <Modal backdrop="static" show={this.props.showModal} onHide={this.props.handleHideModal} size="lg" centered="true" dialogClassName={showDepositFundsForm !== true ? "modal-40w withcentered-heading" : "modal-50w withcentered-heading"} animation={false}>
                <Formik
                    initialValues={{
                        comment: "",
                        allowBackDate: false,
                        showBookingDate: false,
                        depositChannelEncodedKey: "",
                        backDateChosen: "",
                        bookingDateChosen: "",
                        amountToWithdraw: "",
                        maturityDate: "",
                        notes: "",
                        amountToDeposit: "",
                        currentCustomerChosenAccount: "",
                        amountToTransfer: "",

                    }}

                    validationSchema={changeDepositStateValidationSchema}
                    onSubmit={(values, { resetForm }) => {


                        let changeDepositStatePayload = {
                            accountEncodedKey: this.props.depositEncodedKey,
                            notes: values.notes,
                            amount: parseFloat(values.amountToTransfer.replace(/,/g, '')),
                        }

                        if (typeOfTransfer === "currentcustomer") {
                            changeDepositStatePayload.destinationCustomerEncodedKey = getAClientDepositAccountRequest.clientEncodedKey
                            changeDepositStatePayload.destinationAccountEncodedKey = values.currentCustomerChosenAccount
                        }

                        if (typeOfTransfer === "anothercustomer" && selectOtherCustomerAccount !== "") {
                            changeDepositStatePayload.destinationCustomerEncodedKey = selectOtherCustomerAccount.clientEncodedKey
                            changeDepositStatePayload.destinationAccountEncodedKey = selectOtherCustomerAccount.searchItemEncodedKey
                        }

                        this.props.handleNewDepositState(changeDepositStatePayload, "transfer")
                            .then(
                                () => {

                                    if (this.props.changeDepositStateReducer.request_status === loanAndDepositsConstants.CHANGE_DEPOSITSTATE_SUCCESS) {
                                        resetForm();
                                        // value = {null}

                                        setTimeout(() => {
                                            this.props.dispatch(depositActions.changeDepositState("CLEAR"))
                                            this.props.handleHideModal();
                                            this.props.getCustomerDepositAccountDetails(this.props.depositEncodedKey);
                                        }, 3000);
                                    }

                                    if (this.props.changeDepositStateReducer.request_status === loanAndDepositsConstants.CHANGE_DEPOSITSTATE_FAILURE) {
                                        resetForm();
                                        // value = {null}

                                        setTimeout(() => {
                                            this.props.dispatch(depositActions.changeDepositState("CLEAR"))
                                        }, 3000);
                                    }



                                }
                            )

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
                            noValidate
                            onSubmit={handleSubmit}
                            className="">

                            <Modal.Header>
                                <Modal.Title>{"Transfer Funds"}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <div>
                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">From</Form.Label>
                                            <span className="form-text">{getAClientDepositAccountRequest.productName}-{getAClientDepositAccountRequest.accountNumber}</span>
                                        </Col>
                                        <Col>
                                            <Form.Label className="block-level">To</Form.Label>
                                            <select className="form-control form-control-sm"
                                                value={typeOfTransfer}
                                                name="typeOfTransferToInitiate"
                                                onChange={(e) => {
                                                    console.log({
                                                        typeOfTransfer: e.target.value,
                                                        selectOtherCustomerAccount: "",
                                                        defaultAccountOptions: "",
                                                        selectACustomerAccount: ""
                                                    });
                                                    this.setState({
                                                        typeOfTransfer: e.target.value,
                                                        selectOtherCustomerAccount: "",
                                                        defaultAccountOptions: "",
                                                        selectACustomerAccount: ""
                                                    })
                                                }}
                                            >
                                                <option value="currentcustomer">{getAClientDepositAccountRequest.accountHolderName}</option>
                                                <option value="anothercustomer">Another Customer</option>
                                            </select>
                                        </Col>
                                    </Form.Row>
                                    {typeOfTransfer === "currentcustomer" &&
                                        <Form.Row>
                                            <Col>
                                                <Form.Label className="block-level">Account to Transfer To</Form.Label>
                                                <Select
                                                    options={allAccountOfCurrentCustomer}

                                                    onChange={(selected) => {
                                                        setFieldValue('currentCustomerChosenAccount', selected.value)
                                                    }}
                                                    onBlur={() => setFieldTouched('currentCustomerChosenAccount', true)}
                                                    className={errors.currentCustomerChosenAccount && touched.currentCustomerChosenAccount ? "is-invalid" : null}
                                                    name="currentCustomerChosenAccount"
                                                />
                                                {errors.currentCustomerChosenAccount && touched.currentCustomerChosenAccount ? (
                                                    <span className="invalid-feedback">{errors.currentCustomerChosenAccount}</span>
                                                ) : null}
                                            </Col>
                                        </Form.Row>
                                    }
                                    {typeOfTransfer === "anothercustomer" &&
                                        <Form.Row>
                                            <Col className="async-search-wrap">
                                                <Form.Label className="block-level">Account to Transfer To</Form.Label>
                                                {(
                                                    searchForAccountsWithCustomerKeyRequest.request_status !== loanAndDepositsConstants.SEARCH_FOR_ACCOUNTS_WITH_CUSTOMERKEY_PENDING)
                                                    &&
                                                    <div>
                                                        <AsyncSelect
                                                            cacheOptions={false}
                                                            value={selectOtherCustomerAccount}
                                                            noOptionsMessage={this.noOptionsForAccountMessage}
                                                            getOptionValue={this.getSearchForAccountOptionValue}
                                                            getOptionLabel={this.getSearchOptionForAccountLabel}
                                                            defaultOptions={defaultAccountOptions !== "" ? defaultAccountOptions : null}
                                                            loadOptions={this.initiateAccountSearch}
                                                            placeholder="Search Accounts"
                                                            name="chosenAccountNum"
                                                            className={errors.chosenAccountNum && touched.chosenAccountNum ? "is-invalid" : null}
                                                            onChange={(selectedOption) => {
                                                                setFieldValue('chosenAccountNum', selectedOption.searchItemEncodedKey);

                                                                if (this.state.isCustommerAccountsFetchedWithKey !== true) {
                                                                    
                                                                    this.setState({
                                                                        selectOtherCustomerAccount: selectedOption,
                                                                        firstChosenTransferCriteria: "accounts",
                                                                        selectACustomerAccount: ""
                                                                    });
                                                                } else {
                                                                    this.setState({
                                                                        selectOtherCustomerAccount: selectedOption,
                                                                        firstChosenTransferCriteria: "customer",
                                                                    });
                                                                }

                                                            }}
                                                            onBlur={() => setFieldTouched('chosenAccountNum', true)}
                                                        />
                                                        {errors.chosenAccountNum && touched.chosenAccountNum ? (
                                                            <span className="invalid-feedback">{errors.chosenAccountNum}</span>
                                                        ) : null}
                                                    </div>
                                                }
                                                {
                                                    (searchForAccountsWithCustomerKeyRequest.request_status
                                                        && searchForAccountsWithCustomerKeyRequest.request_status === loanAndDepositsConstants.SEARCH_FOR_ACCOUNTS_WITH_CUSTOMERKEY_PENDING)
                                                    &&
                                                    <span className="form-text">Loading all accounts of {selectACustomerAccount.clientName}... </span>
                                                }

                                                {
                                                    // ( selectOtherCustomerAccount!=="" && defaultAccountOptions==="") &&
                                                    (searchAccountNumberRequest.request_status === loanAndDepositsConstants.SEARCH_ACCOUNT_NUMBERS_SUCCESS && selectOtherCustomerAccount !== "" && defaultAccountOptions === "") &&
                                                    <div className="mt-20">
                                                        <Form.Label className="block-level">Customer to transfer To</Form.Label>
                                                        <span className="form-text">{selectOtherCustomerAccount.clientName}
                                                            <em className="edit-link"
                                                                onClick={() => {
                                                                    this.setState({ selectOtherCustomerAccount: "", isCustommerAccountsFetchedWithKey: "" })
                                                                    this.props.dispatch(depositActions.searchAccountNumbers("CLEAR"));
                                                                }}> change</em>
                                                        </span>
                                                    </div>
                                                }

                                                {
                                                    // ((isCustommerAccountsFetchedWithKey==="" || isCustommerAccountsFetchedWithKey===true)
                                                    //     && selectOtherCustomerAccount==="")
                                                    // && (searchAccountNumberRequest.request_status !== loanAndDepositsConstants.SEARCH_ACCOUNT_NUMBERS_SUCCESS
                                                    //      || )) &&
                                                    (selectOtherCustomerAccount === "" || firstChosenTransferCriteria === "customer") &&
                                                    <div className="mt-20">
                                                        <Form.Label className="block-level">Customer to transfer To</Form.Label>
                                                        <AsyncSelect
                                                            cacheOptions={false}
                                                            value={selectACustomerAccount}
                                                            noOptionsMessage={this.noOptionsForCustomerMessage}
                                                            getOptionValue={this.getSearchForCustomerOptionValue}
                                                            getOptionLabel={this.getSearchOptionForCustomerLabel}
                                                            // defaultOptions={defaultOptions}
                                                            loadOptions={this.initiateCustomerSearch}
                                                            placeholder="Search Accounts"
                                                            onChange={(selectedOption)=> {
                                                                
                                                                // setFieldValue('chosenAccountNum', selectedOption.searchItemEncodedKey);
                                                                this.handleSearchACustomerInputChange(selectedOption)
                                                            }}
                                                        />
                                                    </div>
                                                }
                                                {/* <Select
                                                            options={allAccountOfCurrentCustomer}

                                                            onChange={(selected) => {
                                                                setFieldValue('chosenAccountNum', selected.value)
                                                            }}
                                                            onBlur={()=> setFieldTouched('chosenAccountNum', true)}
                                                            className={errors.chosenAccountNum && touched.chosenAccountNum ? "is-invalid" : null}
                                                            name="chosenAccountNum"
                                                        />
                                                        {errors.chosenAccountNum && touched.chosenAccountNum ? (
                                                            <span className="invalid-feedback">{errors.chosenAccountNum}</span>
                                                        ) : null} */}
                                            </Col>
                                        </Form.Row>

                                    }
                                    <Form.Row>
                                        <Col>
                                            <Form.Label className="block-level">Amount {this.props.CurCode? `(${this.props.CurCode})`: ""}</Form.Label>
                                            <Form.Control
                                                type="text"
                                                autoComplete="off"
                                                onChange={handleChange}
                                                value={numberWithCommas(values.amountToTransfer)}
                                                className={errors.amountToTransfer && touched.amountToTransfer ? "is-invalid h-38px" : "h-38px"}
                                                name="amountToTransfer" required />
                                            {errors.amountToTransfer && touched.amountToTransfer ? (
                                                <span className="invalid-feedback">{errors.amountToTransfer}</span>
                                            ) : null}
                                        </Col>
                                        <Col></Col>
                                    </Form.Row>
                                    <Form.Group>
                                        <Form.Label className="block-level">Notes</Form.Label>
                                        <Form.Control as="textarea"
                                            rows="3"
                                            onChange={handleChange}
                                            name="notes"
                                            value={values.notes}
                                            className={errors.notes && touched.notes ? "is-invalid form-control form-control-sm" : null}
                                        />
                                        {errors.notes && touched.notes ? (
                                            <span className="invalid-feedback">{errors.notes}</span>
                                        ) : null}
                                    </Form.Group>
                                </div>
                                {/* } */}


                            </Modal.Body>
                            <Modal.Footer>

                                <Button variant="light" onClick={this.props.handleHideModal}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="success"
                                    type="submit"
                                    disabled={changeDepositStateRequest.is_request_processing}
                                >
                                    {changeDepositStateRequest.is_request_processing ? "Please wait..." : `Transfer`}

                                </Button>

                            </Modal.Footer>
                            <div className="footer-alert">
                                {changeDepositStateRequest.request_status === loanAndDepositsConstants.CHANGE_DEPOSITSTATE_SUCCESS &&
                                    <Alert variant="success" className="w-65 mlr-auto">
                                        {changeDepositStateRequest.request_data.response.data.message}
                                    </Alert>
                                }
                                {(changeDepositStateRequest.request_status === loanAndDepositsConstants.CHANGE_DEPOSITSTATE_FAILURE && changeDepositStateRequest.request_data.error) &&
                                    <Alert variant="danger" className="w-65 mlr-auto">
                                        {changeDepositStateRequest.request_data.error}
                                    </Alert>
                                }
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal>
        )
    }

}


function mapStateToProps(state) {
    return {
        // adminGetTransactionChannels : state.administrationReducers.adminGetTransactionChannelsReducer,
        // getAClientReducer: state.clientsReducers.getAClientReducer,
        getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        getClientLoansReducer: state.loansReducers.getClientLoansReducer,
        getAClientDepositAccountReducer: state.depositsReducers.getAClientDepositAccountReducer,
        // getADepositAccountActivitiesReducer: state.depositsReducers.getADepositAccountActivitiesReducer,
        // getADepositAccountCommunicationsReducer: state.depositsReducers.getADepositAccountCommunicationsReducer,
        // getAccountDepositTransactionReducer: state.depositsReducers.getAccountDepositTransactionReducer,
        // getAClientDepositAccountCommentsReducer: state.depositsReducers.getAClientDepositAccountCommentsReducer,
        // createADepositCommentReducer: state.depositsReducers.createADepositCommentReducer,
        getADepositAccountAttachmentsReducer: state.depositsReducers.getADepositAccountAttachmentsReducer,
        createADepositAttachmentReducer: state.depositsReducers.createADepositAttachmentReducer,
        changeDepositStateReducer: state.depositsReducers.changeDepositStateReducer,
        searchAccountNumbersReducer: state.depositsReducers.searchAccountNumbersReducer,
        searchCustomerAccountReducer: state.depositsReducers.searchCustomerAccountReducer,
        searchForAccountsWithCustomerKeyReducer: state.depositsReducers.searchForAccountsWithCustomerKeyReducer,
    };
}

export default connect(mapStateToProps)(MakeTransferModal);