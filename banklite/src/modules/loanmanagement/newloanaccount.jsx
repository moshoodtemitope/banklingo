import * as React from 'react';
// import {Router} from "react-router";

import { connect } from 'react-redux';
import { Fragment } from 'react';

import { NavLink } from 'react-router-dom';
import InnerPageContainer from '../../shared/templates/authed-pagecontainer';
// import Form from 'react-bootstrap/Form'
import DatePicker from '../../_helpers/datepickerfield';
// import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import TableComponent from '../../shared/elements/table';

import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Select from 'react-select';
import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  numberWithCommas,
  allowNumbersOnly,
  noWhiteSpaces,
  getDateFromISO,
} from '../../shared/utils';

import Alert from 'react-bootstrap/Alert';

import { clientsActions } from '../../redux/actions/clients/clients.action';
import { clientsConstants } from '../../redux/actiontypes/clients/clients.constants';

import { productActions } from '../../redux/actions/products/products.action';
import { productsConstants } from '../../redux/actiontypes/products/products.constants';

import { loanActions } from '../../redux/actions/loans/loans.action';
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants';

import { administrationActions } from '../../redux/actions/administration/administration.action';
import { administrationConstants } from '../../redux/actiontypes/administration/administration.constants';

import {branchActions,branchConstants} from '../../redux/actions/administration/branch-management.actions';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './loanmanagement.scss';
import DatePickerFieldType from '../../_helpers/DatePickerFieldType';
class NewLoanAccount extends React.Component {
  constructor(props) {
    super(props);
    this.loanParams = this.props.match.params;
    this.providedInstallments = '';
    this.state = {
      user: JSON.parse(localStorage.getItem('lingoAuth')),
      PageSize: 1000,
      CurrentPage: 1,
      scheduleErrorMsg: '',
      isscheduleError: '',
    };
    this.selectedLoanProductDetails = '';
    this.loanSchedulePayload = {
      loanAmount: '',
      interestRate: '',
      installments: '',
      firstRepaymentDate: null,
      interestRateTerms: '',
      interestBalanceCalculation: '',
      productEncodedKey: '',
    };
    this.loanSchedulePayloadError = {
      isError: true,
      errorMessage: '',
    };
  }

  componentDidMount() {
    this.loadInitialData();
   
  }

  loadInitialData = () => {
    let { PageSize, CurrentPage } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
    this.getAllLoanProducts(params);
    this.getFullLoanProducts();

    
    this.getAllClients(params);
    
    this.getTransactionChannels(params);
    this.getAllUsers();
    this.getAllBranches(params);

    if (Object.keys(this.loanParams).length >= 1) {
      this.getClientInfo(this.loanParams.clientId);
    }
  };

  getAllClients = (paramters) => {
    const { dispatch } = this.props;

    dispatch(clientsActions.getAllClients(paramters));
  };

  getClientInfo = (clientEncodedKey) => {
    const { dispatch } = this.props;

    dispatch(clientsActions.getAClient(clientEncodedKey));
  };

  componentWillReceiveProps(nextProps) {
    let { PageSize, CurrentPage } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;

    if (nextProps.match.params.clientId !== this.props.match.params.clientId) {
      this.loanParams.clientId = nextProps.match.params.clientId;

      if (this.loanParams.clientId !== undefined) {
        this.getClientInfo(this.loanParams.clientId);
      } else {
        this.getClientInfo('CLEAR');
        this.getAllClients(params);
      }
    }
  }

  getTransactionChannels = (params) => {
    const { dispatch } = this.props;
    // let payload ={
    //     PageSize:20,
    //     CurrentPage:1
    // }
    dispatch(administrationActions.getTransactionChannels(params));
  };

  getAllBranches = (paramters) => {
    const { dispatch } = this.props;

    dispatch(branchActions.getAllBranches(paramters));
  };

  getAllUsers = () => {
    const { dispatch } = this.props;

    dispatch(administrationActions.getAllUsers(1));
  };

  getAllLoanProducts = (paramters) => {
    const { dispatch } = this.props;

    dispatch(productActions.getAllLoanProducts(paramters, true));
  };

  getFullLoanProducts = () => {
    const { dispatch } = this.props;

    dispatch(productActions.getFullLoanProducts());
  };

  getSingleLoanProduct = async (encodedKey) => {
    const { dispatch } = this.props;

    await dispatch(productActions.getSingleLoanProduct(encodedKey));
  };

  getLoanSchedulePreview = async (params) => {
    const { dispatch } = this.props;

    // let {
    //     loanAmount,
    //     interestRate,
    //     installments,
    //     firstRepaymentDate,
    //     interestRateTerms,
    //     interestBalanceCalculation,
    //     productEncodedKey,
    //     pageSize,
    //     currentPage
    // } = params;
    // let paramsList = `?LoanAmount=${LoanAmount}&InterestRate=${InterestRate}&Installments=${Installments}&FirstRepaymentDate=${FirstRepaymentDate}&InterestRateTerms=${InterestRateTerms}&InterestBalanceCalculation=${InterestBalanceCalculation}&PageSize=${PageSize}&CurrentPage=${CurrentPage}`;

    await dispatch(loanActions.getLoanSchedulePreview(params));
  };

  getSchedulePreview = () => {
    // let {PageSize, CurrentPage}= this.state;

    this.loanSchedulePayload.interestRateTerms =
      this.selectedLoanProductDetails.loanProductInterestSetting !== null &&
      this.selectedLoanProductDetails.loanProductInterestSetting
        .interestRateTerms !== null
        ? this.selectedLoanProductDetails.loanProductInterestSetting
            .interestRateTerms
        : '';
    this.loanSchedulePayload.interestBalanceCalculation =
      this.selectedLoanProductDetails.repaymentReschedulingModel !== null &&
      this.selectedLoanProductDetails.repaymentReschedulingModel
        .interestBalanceCalculation !== null
        ? this.selectedLoanProductDetails.repaymentReschedulingModel
            .interestBalanceCalculation
        : 1;
    this.loanSchedulePayload.productEncodedKey = this.selectedLoanProductDetails.encodedKey;
    this.loanSchedulePayload.pageSize = 50;
    this.loanSchedulePayload.currentPage = 1;

    // if(this.selectedLoanProductDetails.repaymentReschedulingModel!==null){
    //     this.loanSchedulePayload.installments = (this.selectedLoanProductDetails.repaymentReschedulingModel!==null && this.selectedLoanProductDetails.repaymentReschedulingModel.installmentsDefault!==null) ? parseInt(this.selectedLoanProductDetails.repaymentReschedulingModel.installmentsDefault): '';
    //     // this.loanSchedulePayload.installments = parseInt(this.selectedLoanProductDetails.repaymentReschedulingModel.installmentsDefault);
    // }

    if (
      this.loanSchedulePayload.loanAmount === '' ||
      this.loanSchedulePayload.loanAmount < 1
    ) {
      this.loanSchedulePayloadError.errorMessage = 'Loan amount is required';
      this.loanSchedulePayloadError.isError = true;

      this.setState({
        scheduleErrorMsg: this.loanSchedulePayloadError.errorMessage,
        isscheduleError: this.loanSchedulePayloadError.isError,
      });

      return false;
    } else {
      this.loanSchedulePayloadError.errorMessage = '';
      this.loanSchedulePayloadError.isError = false;

      this.setState({
        scheduleErrorMsg: this.loanSchedulePayloadError.errorMessage,
        isscheduleError: this.loanSchedulePayloadError.isError,
      });
    }

    if (this.loanSchedulePayload.interestRate === '') {
      this.loanSchedulePayloadError.errorMessage = 'Interest rate is required';
      this.loanSchedulePayloadError.isError = true;

      this.setState({
        scheduleErrorMsg: this.loanSchedulePayloadError.errorMessage,
        isscheduleError: this.loanSchedulePayloadError.isError,
      });
      return false;
    } else {
      this.loanSchedulePayloadError.isError = false;
      this.loanSchedulePayloadError.errorMessage = '';
      this.setState({
        scheduleErrorMsg: this.loanSchedulePayloadError.errorMessage,
        isscheduleError: this.loanSchedulePayloadError.isError,
      });
    }

    if (
      this.loanSchedulePayload.installments === '' &&
      this.loanSchedulePayload.installments < 1
    ) {
      this.loanSchedulePayloadError.errorMessage =
        'Number of Installments is required';
      this.loanSchedulePayloadError.isError = true;

      this.setState({
        scheduleErrorMsg: this.loanSchedulePayloadError.errorMessage,
        isscheduleError: this.loanSchedulePayloadError.isError,
      });
      return false;
    } else {
      this.loanSchedulePayloadError.errorMessage = '';
      this.loanSchedulePayloadError.isError = false;

      this.setState({
        scheduleErrorMsg: this.loanSchedulePayloadError.errorMessage,
        isscheduleError: this.loanSchedulePayloadError.isError,
      });
    }

    // if( this.loanSchedulePayload.firstRepaymentDate===''){
    //     this.loanSchedulePayloadError.errorMessage =  "First repayment date is required";
    //     this.loanSchedulePayloadError.isError =  true;

    //     this.setState({scheduleErrorMsg:this.loanSchedulePayloadError.errorMessage,
    //         isscheduleError:this.loanSchedulePayloadError.isError})
    //     return false;
    // }else{
    //     this.loanSchedulePayloadError.errorMessage =  "";
    //     this.loanSchedulePayloadError.isError =  false;

    //     this.setState({scheduleErrorMsg:this.loanSchedulePayloadError.errorMessage,
    //         isscheduleError:this.loanSchedulePayloadError.isError})
    // }

    if (this.loanSchedulePayload.interestRateTerms === '') {
      this.loanSchedulePayloadError.errorMessage =
        'Interest rate terms is required';
      this.loanSchedulePayloadError.isError = true;

      this.setState({
        scheduleErrorMsg: this.loanSchedulePayloadError.errorMessage,
        isscheduleError: this.loanSchedulePayloadError.isError,
      });
      return false;
    } else {
      this.loanSchedulePayloadError.errorMessage = '';
      this.loanSchedulePayloadError.isError = false;

      this.setState({
        scheduleErrorMsg: this.loanSchedulePayloadError.errorMessage,
        isscheduleError: this.loanSchedulePayloadError.isError,
      });
    }

    if (this.loanSchedulePayload.InterestBalanceCalculation === '') {
      this.loanSchedulePayloadError.errorMessage =
        'Interest balance calculation is required';
      this.loanSchedulePayloadError.isError = true;

      this.setState({
        scheduleErrorMsg: this.loanSchedulePayloadError.errorMessage,
        isscheduleError: this.loanSchedulePayloadError.isError,
      });
      return false;
    } else {
      this.loanSchedulePayloadError.errorMessage = '';
      this.loanSchedulePayloadError.isError = false;

      this.setState({
        scheduleErrorMsg: this.loanSchedulePayloadError.errorMessage,
        isscheduleError: this.loanSchedulePayloadError.isError,
      });
    }

    if (this.loanSchedulePayloadError.isError === false) {
      this.getLoanSchedulePreview(this.loanSchedulePayload);
    }
  };

  getALoanProduct = (encodedKey) => {
    // const {dispatch} = this.props;

    //  dispatch(productActions.getSingleDepositProduct(encodedKey));
    this.getSingleLoanProduct(encodedKey).then((productDetails) => {
      this.selectedLoanProductDetails = this.props.getSingleLoanProductsReducer.request_data.response.data;
      this.setState({
        selectedLoanProductDetails: this.selectedLoanProductDetails,
        currencyCode: this.selectedLoanProductDetails.currencyCode,
      });
    });
  };

  createLoanAccount = async (accouuntPayload, accountType) => {
    const { dispatch } = this.props;

    await dispatch(loanActions.createLoanAccount(accouuntPayload, accountType));
  };

  renderSchedulePreview = (scheduleData) => {
    return (
      <div>
        <TableComponent classnames='striped bordered hover scheduletable'>
          <thead>
            <tr>
              <th>Order</th>
              <th>Installment Date</th>
              <th>Principal</th>
              <th>Interest</th>
              <th>Fees</th>
              <th>Payment Due</th>
              <th>Total Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>{numberWithCommas(scheduleData.loanAmount, true, true)}</td>
            </tr>
            {scheduleData.loanScheduleSampleModels.map((schedule, index) => {
              return (
                <tr key={index}>
                  <td>{schedule.installmentOrder}</td>
                  <td>{getDateFromISO(schedule.installmentDate)}</td>
                  <td>{numberWithCommas(schedule.principal, true, true)}</td>
                  <td>{numberWithCommas(schedule.interest, true, true)}</td>
                  <td>{numberWithCommas(schedule.fees, true, true)}</td>
                  {/* <td>{numberWithCommas(schedule.interestRate, true, true)}</td> */}
                  <td>{numberWithCommas(schedule.paymentDue, true, true)}</td>
                  <td>{numberWithCommas(schedule.totalBalance, true, true)}</td>
                </tr>
              );
            })}
            <tr>
              <td colSpan='2' className='bolden'>
                Totals
              </td>
              <td className='bolden'>
                {numberWithCommas(scheduleData.totalPrincipal, true, true)}
              </td>
              <td className='bolden'>
                {numberWithCommas(scheduleData.totalInterest, true, true)}
              </td>
              <td className='bolden'>
                {numberWithCommas(scheduleData.totalFees, true, true)}
              </td>
              {/* <td className="bolden">-</td> */}
              <td className='bolden'>
                {numberWithCommas(scheduleData.totalDue, true, true)}
              </td>
              <td className='bolden'>-</td>
            </tr>
          </tbody>
        </TableComponent>
      </div>
    );
  };

  renderCreateLoanAccount = () => {
    let getAllLoanProductsRequest = this.props.getAllLoanProductsReducer,
      createLoanAccountRequest = this.props.createLoanAccountReducer,
      getClientsRequest = this.props.getAllClientsReducer,
      getLoanSchedulePreviewRequest = this.props.getLoanSchedulePreviewReducer,
      getAllUsersRequest = this.props.getAllUsers,
      getAClientRequest = this.props.getAClientReducer,
      adminGetAllBranchesRequest = this.props.adminGetAllBranches,
      adminGetTransactionChannelsRequest = this.props
        .adminGetTransactionChannels,
      { selectedLoanProductDetails, currencyCode, selectedProduct } = this.state;

    if (
      getAllLoanProductsRequest.request_status ===
        productsConstants.GET_ALL_LOAN_PRODUCTS_PENDING ||
      getClientsRequest.request_status ===
        clientsConstants.GET_ALL_CLIENTS_PENDING ||
      adminGetTransactionChannelsRequest.request_status ===
        administrationConstants.GET_TRANSACTION_CHANNELS_PENDING ||
      adminGetAllBranchesRequest.request_status ===
        branchConstants.GET_ALL_BRANCHES_PENDING ||
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
      getAllLoanProductsRequest.request_status ===
        productsConstants.GET_ALL_LOAN_PRODUCTS_SUCCESS &&
      ((Object.keys(this.loanParams).length >= 1 &&
        getClientsRequest.request_status ===
          clientsConstants.GET_ALL_CLIENTS_SUCCESS &&
        getAClientRequest.request_status !==
          clientsConstants.GET_A_CLIENT_PENDING) ||
        (Object.keys(this.loanParams).length <= 1 &&
          getClientsRequest.request_status ===
            clientsConstants.GET_ALL_CLIENTS_SUCCESS)) &&
      getAllUsersRequest.request_status ===
        administrationConstants.GET_ALL_USERS_SUCCESS &&
      adminGetAllBranchesRequest.request_status ===
      branchConstants.GET_ALL_BRANCHES_SUCCESS &&
      adminGetTransactionChannelsRequest.request_status ===
        administrationConstants.GET_TRANSACTION_CHANNELS_SUCCESS
    ) {
      if (
        getAllLoanProductsRequest.request_data.response.data.result.length >= 0
      ) {
        if (
          adminGetAllBranchesRequest.request_data.response.data.result.length >=
          0
        ) {
          if (getAllUsersRequest.request_data.response.data.length >= 0) {
            if (
              adminGetTransactionChannelsRequest.request_data.response.data
                .result.length >= 0
            ) {
              
              if (getClientsRequest.request_data.response.data.length >= 0) {
                let allLoanProducts =
                    getAllLoanProductsRequest.request_data.response.data.result,
                  allCustomers = getClientsRequest.request_data.response.data,
                  allAccountOfficers =
                    getAllUsersRequest.request_data.response.data,
                  allChannels =
                    adminGetTransactionChannelsRequest.request_data.response
                      .data.result,
                  allBranches =
                    adminGetAllBranchesRequest.request_data.response.data
                      .result,
                  allCustomersList = [],
                  allBranchesList = [],
                  allLoanProductsList = [],
                  allAccountOfficersList = [],
                  allChannelsList = [];
                let { user } = this.state,
                  allowedBranches = user.AllowedBranches,
                  allowedBranchesList = [],
                  customerFetched = getAClientRequest,
                  customerFetchedData,
                  isInteretRateLimitSimilar = "",
                  isInstallmentLimitSimilar="";
                  

                allLoanProducts = allLoanProducts.filter(
                  (product) => product.loanProductType === 0
                );

                if (
                  Object.keys(customerFetched).length >= 1 &&
                  getAClientRequest.request_status ===
                    clientsConstants.GET_A_CLIENT_SUCCESS
                ) {
                  customerFetchedData =
                    getAClientRequest.request_data.response.data;
                }

                allCustomers.map((customer, id) => {
                  allCustomersList.push({
                    label: customer.clientName,
                    value: customer.clientEncodedKey,
                  });
                });

                allowedBranches.map((branch, id) => {
                  allowedBranchesList.push({
                    label: branch.name,
                    value: branch.encodedKey,
                  });
                });

                allLoanProducts.map((product, id) => {
                  allLoanProductsList.push({
                    label: product.productName,
                    currencyCode: product.currencyCode,
                    value: product.productEncodedKey,
                  });
                });

                allBranches.map((branch, id) => {
                  allBranchesList.push({
                    label: branch.name,
                    value: branch.encodedKey,
                  });
                });

                allAccountOfficers.map((officer, id) => {
                  allAccountOfficersList.push({
                    label: officer.name,
                    value: officer.key,
                  });
                });

                allChannels.map((channel, id) => {
                  allChannelsList.push({
                    label: channel.name,
                    value: channel.encodedKey,
                  });
                });
                let allProductTypes = [
                  { value: '0', label: 'Fixed Term Loan' },
                  { value: '1', label: 'Dynamic Term Loan' },
                  { value: '2', label: 'Interest Free Loan' },
                  { value: '3', label: 'Tranched Loan' },
                  { value: '4', label: 'Revolving Credit' },
                ];
                // defaultProduct = getAllLoanProductsRequest.request_data.response2 ? getAllLoanProductsRequest.request_data.response2.data:null;

                if (selectedLoanProductDetails === undefined) {
                  if (getAllLoanProductsRequest.request_data.response2) {
                    this.selectedLoanProductDetails =
                      getAllLoanProductsRequest.request_data.response2.data;
                  }
                } else {
                  this.selectedLoanProductDetails = selectedLoanProductDetails;
                }

                let loanProductType = this.selectedLoanProductDetails
                  ? allProductTypes.filter(
                      (eachType) =>
                        eachType.value ===
                        this.selectedLoanProductDetails.loanProductType.toString()
                    )[0]
                  : null;


                if (this.selectedLoanProductDetails.repaymentReschedulingModel !==null &&
                    this.selectedLoanProductDetails.repaymentReschedulingModel.installmentsMin !== null &&
                    this.selectedLoanProductDetails.repaymentReschedulingModel.installmentsMin !== '' && 
                    this.selectedLoanProductDetails.repaymentReschedulingModel !==null &&
                    this.selectedLoanProductDetails.repaymentReschedulingModel.installmentsMax !== null &&
                    this.selectedLoanProductDetails.repaymentReschedulingModel.installmentsMax !== '') {

                      if(this.selectedLoanProductDetails.repaymentReschedulingModel.installmentsMax === 
                        this.selectedLoanProductDetails.repaymentReschedulingModel.installmentsMin){
                          isInstallmentLimitSimilar =  true
                      }else{
                          isInstallmentLimitSimilar = false
                      }

                }

                if (this.selectedLoanProductDetails.loanProductInterestSetting !==null &&
                  this.selectedLoanProductDetails.loanProductInterestSetting.interestRateMin !== null &&
                  this.selectedLoanProductDetails.loanProductInterestSetting.interestRateMin !== '' && 
                  this.selectedLoanProductDetails.loanProductInterestSetting !==null &&
                  this.selectedLoanProductDetails.loanProductInterestSetting.interestRateMax !== null &&
                  this.selectedLoanProductDetails.loanProductInterestSetting.interestRateMax !== '') {

                    if(this.selectedLoanProductDetails.loanProductInterestSetting.interestRateMax === 
                      this.selectedLoanProductDetails.loanProductInterestSetting.interestRateMin){
                        isInteretRateLimitSimilar =  true
                    }else{
                        isInteretRateLimitSimilar = false
                    }

              }

                

                let loanAccountValidationSchema = Yup.object().shape({
                  clientEncodedKey: Yup.string()
                    .min(1, 'Response required')
                    .required('Required'),
                  productEncodedKey: Yup.string()
                    .min(2, 'Valid response required')
                    .required('Required'),
                  productDisplayName: Yup.string()
                    .min(1, 'Valid response required')
                    .required('Required'),
                  loanAmount: Yup.string()
                    .min(1, 'Enter valid amount')
                    .required('Required'),
                  // loanAmount:  Yup.number()
                  //             .min(this.selectedLoanProductDetails.loanAmountSetting.loanAmountMinimun, 'Amount is out of bounds'),
                  // .when(['loanAmountMin','loanAmountMax'], {
                  //     is: (loanAmountMin, loanAmountMax)=> loanAmountMin && loanAmountMax,
                  //     then: Yup.number()
                  //           .min('loanAmountMin', 'Amount is out of bounds')
                  //           .required('Required')
                  // }),
                  installmentsDefault: Yup.string()
                    .min(1, 'Enter valid installments')
                    .required('Required'),
                  interestRate: Yup.string()
                    .min(1, 'Enter valid interest rate')
                    .required('Required'),
                  // accountOfficerEncodedKey: Yup.string()
                  //   .min(1, 'Select account officer')
                  //   .required('Required'),
                  // accountOfficerBranchEncodedKey: Yup.string()
                  //   .min(1, 'Select account officer branch')
                  //   .required('Required'),
                  associatedBranchEncodedKey: Yup.string()
                    .min(1, 'Select associated branch')
                    .required('Required'),
                  notes: Yup.string().min(3, 'Valid response required'),
                });
                return (
                  <Formik
                    initialValues={{
                      clientEncodedKey:
                        customerFetchedData !== undefined &&
                        this.props.match.params.clientId !== undefined
                          ? customerFetchedData.encodedKey
                          : '',
                      // productEncodedKey : allLoanProductsList[0].value,
                      productEncodedKey: this.selectedLoanProductDetails
                        .encodedKey,
                      // productDisplayName:  allLoanProductsList[0].label,
                      productDisplayName: this.selectedLoanProductDetails
                        .productName,
                      notes: '',
                      loanAmount: '',
                      initialCurrency:  allLoanProductsList[0].currencyCode,
                      loanAmountMin: this.selectedLoanProductDetails
                        ? this.selectedLoanProductDetails.loanAmountSetting
                            .loanAmountMinimun !== null
                          ? this.selectedLoanProductDetails.loanAmountSetting
                              .loanAmountMinimun
                          : ''
                        : '',
                      loanAmountMax: this.selectedLoanProductDetails
                        ? this.selectedLoanProductDetails.loanAmountSetting
                            .interestRateMax !== null
                          ? this.selectedLoanProductDetails.loanAmountSetting
                              .interestRateMax
                          : ''
                        : '',
                      installments: '',
                      maximumWithdrawalAmount: '',
                      accountOfficerEncodedKey: '',
                      accountOfficerBranchEncodedKey: '',
                      associatedBranchEncodedKey: '',
                      repayedEvery: this.selectedLoanProductDetails
                        ? this.selectedLoanProductDetails
                            .repaymentReschedulingModel !== null &&
                          this.selectedLoanProductDetails
                            .repaymentReschedulingModel.repaymentEvery !== null
                          ? numberWithCommas(
                              this.selectedLoanProductDetails.repaymentReschedulingModel.repaymentEvery.toString()
                            )
                          : ''
                        : '',
                      repayPeriod: this.selectedLoanProductDetails
                        ? this.selectedLoanProductDetails
                            .repaymentReschedulingModel !== null &&
                          this.selectedLoanProductDetails
                            .repaymentReschedulingModel.repaymentPeriod !== null
                          ? numberWithCommas(
                              this.selectedLoanProductDetails.repaymentReschedulingModel.repaymentPeriod.toString()
                            )
                          : ''
                        : '',
                      repayPeriodText: this.selectedLoanProductDetails
                        ? this.selectedLoanProductDetails
                            .repaymentReschedulingModel !== null &&
                          this.selectedLoanProductDetails
                            .repaymentReschedulingModel
                            .repaymentPeriodDescription !== null
                          ? this.selectedLoanProductDetails
                              .repaymentReschedulingModel
                              .repaymentPeriodDescription
                          : ''
                        : '',
                      glAccountId: '',
                      installmentsDefault: this.selectedLoanProductDetails
                        ? this.selectedLoanProductDetails
                            .repaymentReschedulingModel !== null &&
                          this.selectedLoanProductDetails
                            .repaymentReschedulingModel.installmentsDefault !==
                            null
                          ? numberWithCommas(
                              this.selectedLoanProductDetails.repaymentReschedulingModel.installmentsDefault.toString()
                            )
                          : ''
                        : '',
                      // installmentsDefault:"",
                      installmentsMin: this.selectedLoanProductDetails
                        ? this.selectedLoanProductDetails
                            .repaymentReschedulingModel !== null &&
                          this.selectedLoanProductDetails
                            .repaymentReschedulingModel.installmentsMin !== null
                          ? this.selectedLoanProductDetails.repaymentReschedulingModel.installmentsMin.toString()
                          : ''
                        : '',
                      installmentsMax: this.selectedLoanProductDetails
                        ? this.selectedLoanProductDetails
                            .repaymentReschedulingModel !== null &&
                          this.selectedLoanProductDetails
                            .repaymentReschedulingModel.installmentsMax !== null
                          ? this.selectedLoanProductDetails.repaymentReschedulingModel.installmentsMax.toString()
                          : ''
                        : '',
                      interestRate: this.selectedLoanProductDetails
                        ? this.selectedLoanProductDetails
                            .loanProductInterestSetting !== null &&
                          this.selectedLoanProductDetails
                            .loanProductInterestSetting.interestRateDefault !==
                            null
                          ? numberWithCommas(
                              this.selectedLoanProductDetails.loanProductInterestSetting.interestRateDefault.toString(),
                              true
                            )
                          : ''
                        : '',
                      interestRateTermsText: this.selectedLoanProductDetails
                        ? this.selectedLoanProductDetails
                            .loanProductInterestSetting
                            .interestRateTermsDescription !== null
                          ? this.selectedLoanProductDetails
                              .loanProductInterestSetting
                              .interestRateTermsDescription
                          : ''
                        : '',
                      // interestRateCalcMethod:this.selectedLoanProductDetails.loanProductInterestSetting.interestBalanceCalculation!==null ? this.selectedLoanProductDetails.loanProductInterestSetting.interestBalanceCalculation : '',
                      interestCalcMethod: this.selectedLoanProductDetails
                        ? this.selectedLoanProductDetails
                            .repaymentReschedulingModel !== null &&
                          this.selectedLoanProductDetails
                            .repaymentReschedulingModel
                            .interestBalanceCalculation !== null
                          ? this.selectedLoanProductDetails.repaymentReschedulingModel.interestBalanceCalculation.toString()
                          : ''
                        : '',
                      interestCalcMethodText: this.selectedLoanProductDetails
                        ? this.selectedLoanProductDetails
                            .repaymentReschedulingModel !== null &&
                          this.selectedLoanProductDetails
                            .repaymentReschedulingModel
                            .interestBalanceCalculationDescription !== null
                          ? this.selectedLoanProductDetails.repaymentReschedulingModel.interestBalanceCalculationDescription.toString()
                          : ''
                        : '',
                        howIsInterestDeducted: this.selectedLoanProductDetails
                        ? this.selectedLoanProductDetails
                            .loanProductInterestSetting !== null &&
                          this.selectedLoanProductDetails
                            .loanProductInterestSetting
                            .howIsInterestDeductedDescription !== null
                          ? this.selectedLoanProductDetails.loanProductInterestSetting.howIsInterestDeductedDescription
                          : ''
                        : '',
                      arearsTolerancePeriodInDaysDefault: this
                        .selectedLoanProductDetails
                        ? this.selectedLoanProductDetails.arrearsSetting !==
                            null &&
                          this.selectedLoanProductDetails.arrearsSetting
                            .arearsTolerancePeriodInDaysDefault !== null
                          ? this.selectedLoanProductDetails.arrearsSetting.arearsTolerancePeriodInDaysDefault.toString()
                          : ''
                        : '',
                      arearsTolerancePeriodInDaysMin: this
                        .selectedLoanProductDetails
                        ? this.selectedLoanProductDetails.arrearsSetting !==
                            null &&
                          this.selectedLoanProductDetails.arrearsSetting
                            .arearsTolerancePeriodInDaysMin !== null
                          ? this.selectedLoanProductDetails.arrearsSetting.arearsTolerancePeriodInDaysMin.toString()
                          : ''
                        : '',
                      arearsTolerancePeriodInDaysMax: this
                        .selectedLoanProductDetails
                        ? this.selectedLoanProductDetails.arrearsSetting !==
                            null &&
                          this.selectedLoanProductDetails.arrearsSetting
                            .arearsTolerancePeriodInDaysMax !== null
                          ? this.selectedLoanProductDetails.arrearsSetting.arearsTolerancePeriodInDaysMax.toString()
                          : ''
                        : '',
                      disbursementChannelEncodedKey: '',
                      anticipatedDisbursmentDate: '',
                      firstRepaymentDate: '',
                    }}
                    enableReinitialize={true}
                    validationSchema={loanAccountValidationSchema}
                    onSubmit={(values, { resetForm }) => {
                      let loanAccountPayload;
                      let accountType;

                      loanAccountPayload = {
                        clientEncodedKey: values.clientEncodedKey,
                        productEncodedKey: values.productEncodedKey,
                        productDisplayName: values.productDisplayName,
                        notes: values.notes,
                        loanAmount: parseFloat(
                          values.loanAmount.replace(/,/g, '')
                        ),
                        installments: parseInt(values.installmentsDefault),
                        interestRate: parseFloat(
                          values.interestRate.replace(/,/g, '')
                        ),
                        maximumWithdrawalAmount:
                          values.maximumWithdrawalAmount !== ''
                            ? parseFloat(
                                values.maximumWithdrawalAmount.replace(/,/g, '')
                              )
                            : null,
                        accountOfficerDetailsModel: {
                          accountOfficerEncodedKey:
                            values.accountOfficerEncodedKey !== ''
                              ? values.accountOfficerEncodedKey
                              : null,
                              accountOfficerBranchEncodedKey: values.associatedBranchEncodedKey
                          // accountOfficerBranchEncodedKey:
                          //   values.accountOfficerBranchEncodedKey !== ''
                          //     ? values.accountOfficerBranchEncodedKey
                          //     : null,
                        },
                        accountOfficerDetailsModel:null,
                        loanDisbursmentDetails: {
                          disbursementChannelEncodedKey:
                            values.disbursementChannelEncodedKey !== ''
                              ? values.disbursementChannelEncodedKey
                              : '',
                          anticipatedDisbursmentDate:
                            values.anticipatedDisbursmentDate !== ''
                              ? values.anticipatedDisbursmentDate.toISOString()
                              : null,
                          firstRepaymentDate:
                            values.firstRepaymentDate !== ''
                              ? values.firstRepaymentDate.toISOString()
                              : null,
                        },
                        associatedBranchEncodedKey:
                          values.associatedBranchEncodedKey,
                      };

                      accountType = 'fixed';

                      // console.log("----", loanAccountPayload);
                      // return false;

                      this.createLoanAccount(
                        loanAccountPayload,
                        accountType
                      ).then(() => {
                        if (
                          this.props.createLoanAccountReducer.request_status ===
                          loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_SUCCESS
                        ) {
                          setTimeout(() => {
                         
                            //TODO: reset form and go to he account screen
                            this.props.dispatch(
                              loanActions.createLoanAccount('CLEAR')
                            );

                            resetForm();

                          }, 3000);
                        }

                        if (
                          this.props.createLoanAccountReducer.request_status ===
                          loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_FAILURE
                        ) {
                          setTimeout(() => {
                            // resetForm();
                            this.props.dispatch(
                              loanActions.createLoanAccount('CLEAR')
                            );
                          }, 8000);
                        }
                      });
                    }}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      handleBlur,
                      resetForm,
                      values,
                      touched,
                      setFieldValue,
                      setFieldTouched,
                      isValid,
                      errors,
                    }) => (
                      <Form
                        noValidate
                        onSubmit={handleSubmit}
                        className='form-content card'
                      >
                        <div className='form-heading'>
                          <h3>Creating A New Loan Account</h3>
                        </div>
                        <Form.Row>
                          {(customerFetchedData === undefined ||
                            this.props.match.params.clientId === undefined) && (
                            <Col>
                              <Form.Label className='block-level'>
                                Client Name
                              </Form.Label>
                              <Select
                                options={allCustomersList}
                                onChange={(selected) => {
                                  setFieldValue(
                                    'clientEncodedKey',
                                    selected.value
                                  );
                                }}
                                placeholder='Search Client'
                                onBlur={() =>
                                  setFieldTouched('clientEncodedKey', true)
                                }
                                className={
                                  errors.clientEncodedKey &&
                                  touched.clientEncodedKey
                                    ? 'is-invalid'
                                    : null
                                }
                                name='clientEncodedKey'
                                required
                              />
                              {errors.clientEncodedKey &&
                              touched.clientEncodedKey ? (
                                <span className='invalid-feedback'>
                                  {errors.clientEncodedKey}
                                </span>
                              ) : null}
                            </Col>
                          )}
                          {customerFetchedData !== undefined &&
                            this.props.match.params.clientId !== undefined && (
                              <Col>
                                <Form.Label className='block-level'>
                                  Client Name
                                </Form.Label>
                                {customerFetchedData.clientClassification===0 &&
                                  <h3>
                                    { customerFetchedData.lastName}{' '}
                                    {customerFetchedData.firstName}{' '}
                                    {customerFetchedData.middleName}{' '}
                                  </h3>
                                }
                                {customerFetchedData.clientClassification===1 &&
                                  <h3>
                                    { customerFetchedData.groupName}{' '}
                                  </h3>
                                }
                              </Col>
                            )}
                        </Form.Row>
                        <Form.Row>
                          <Col>
                            <Form.Label className='block-level'>
                              Product
                            </Form.Label>

                            <Select
                              options={allLoanProductsList}
                              defaultValue={{
                                label:
                                  allLoanProductsList !== null &&
                                  allLoanProductsList[0] !== undefined
                                    ? allLoanProductsList[0].label
                                    : '',
                                value:
                                  allLoanProductsList !== null &&
                                  allLoanProductsList[0] !== undefined
                                    ? allLoanProductsList[0].value
                                    : '',
                              }}
                              onChange={(selected) => {
                                values.productDisplayName = selected.label;
                                // resetForm({
                                //     loanAmount:""
                                // });
                                // setFieldValue('loanAmount', "")
                                this.setState({selectedProduct: selected})
                                setFieldValue(
                                  'productEncodedKey',
                                  selected.value
                                );
                                setFieldValue(
                                  'productDisplayName',
                                  selected.label
                                );
                                setFieldTouched('productEncodedKey', true);
                                this.getALoanProduct(selected.value);
                              }}
                              onBlur={() =>
                                setFieldTouched('productEncodedKey', true)
                              }
                              // onChange={(selectedLoanProduct) => {
                              //     this.setState({ selectedLoanProduct });
                              //     errors.productEncodedKey = null
                              //     values.productEncodedKey = selectedLoanProduct.value
                              // }}
                              className={
                                errors.productEncodedKey &&
                                touched.productEncodedKey
                                  ? 'is-invalid'
                                  : null
                              }
                              name='productEncodedKey'
                              required
                            />
                            {errors.productEncodedKey &&
                            touched.productEncodedKey ? (
                              <span className='invalid-feedback'>
                                {errors.productEncodedKey}
                              </span>
                            ) : null}
                          </Col>
                          <Col>
                            <Form.Label className='block-level'>
                              Display Name
                            </Form.Label>
                            {/* Display chosen loan Type text here */}
                            <Form.Control
                              type='text'
                              autoComplete='off'
                              onChange={handleChange}
                              value={values.productDisplayName}
                              className={
                                errors.productDisplayName &&
                                touched.productDisplayName
                                  ? 'is-invalid h-38px'
                                  : 'h-38px'
                              }
                              name='productDisplayName'
                              required
                            />
                            {errors.productDisplayName &&
                            touched.productDisplayName ? (
                              <span className='invalid-feedback'>
                                {errors.productDisplayName}
                              </span>
                            ) : null}
                            {/* Display chosen loan Type text here */}
                          </Col>
                        </Form.Row>
                        <Form.Row>
                          <Col>
                            <Form.Label className='block-level'>
                              Product Type
                            </Form.Label>
                            {loanProductType && (
                              <span className='form-text'>
                                {loanProductType.label}{' '}
                              </span>
                            )}
                          </Col>
                          <Col></Col>
                        </Form.Row>
                        {/* Help text based on selected loan type */}
                        {/* <div className="hint-text">
                                                                Loans granted to staff members of Zedcrest Capital Group for the purchase of Cars
                                                                                    </div> */}
                        {/* Help text based on selected loan type */}

                        <Accordion defaultActiveKey='0'>
                          <Accordion.Toggle
                            className='accordion-headingLink'
                            as={Button}
                            variant='link'
                            eventKey='0'
                          >
                            Account Terms
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey='0'>
                            <div className='each-formsection'>
                              <Form.Row>
                                <Col>
                                  <Form.Label className='block-level'>
                                    Loan Amount{' '}
                                    {currencyCode ? `(${currencyCode})` : `(${values.initialCurrency})`}
                                  </Form.Label>
                                  <Form.Control
                                    type='text'
                                    autoComplete='off'
                                    // onChange={handleChange}
                                    onChange={(e) => {
                                      this.loanSchedulePayload.loanAmount = parseFloat(
                                        e.target.value.replace(/,/g, '')
                                      );
                                      if (e.target.value !== '') {
                                        this.setState({
                                          isscheduleError: false,
                                        });
                                      }
                                      setFieldValue(
                                        'loanAmount',
                                        numberWithCommas(e.target.value)
                                      );
                                      // setFieldValue("loanAmount", parseFloat(numberWithCommas(e.target.value)));
                                      // if((this.selectedLoanProductDetails.loanAmountSetting.loanAmountMaximum!==null && this.selectedLoanProductDetails.loanAmountSetting.loanAmountMaximum!==""
                                      //     && parseFloat(e.target.value) > this.selectedLoanProductDetails.loanAmountSetting.loanAmountMaximum)
                                      //     ||
                                      //     this.selectedLoanProductDetails.loanAmountSetting.loanAmountMinimun!==null && this.selectedLoanProductDetails.loanAmountSetting.loanAmountMinimun!==""
                                      //     && parseFloat(e.target.value) < this.selectedLoanProductDetails.loanAmountSetting.loanAmountMinimun){

                                      //     console.log("------", parseFloat(e.target.value));
                                      //     touched.loanAmount = true
                                      //     errors.loanAmount = "Amount is out of bounds"
                                      // }else{
                                      //     errors.loanAmount =""
                                      // }
                                    }}
                                    onBlur={(e) => {
                                      // if((this.selectedLoanProductDetails.loanAmountSetting.loanAmountMaximum!==null && this.selectedLoanProductDetails.loanAmountSetting.loanAmountMaximum!==""
                                      //     && parseFloat(e.target.value.replace(/,/g, '')) > this.selectedLoanProductDetails.loanAmountSetting.loanAmountMaximum)
                                      //     ||
                                      //     this.selectedLoanProductDetails.loanAmountSetting.loanAmountMinimun!==null && this.selectedLoanProductDetails.loanAmountSetting.loanAmountMinimun!==""
                                      //     && parseFloat(e.target.value.replace(/,/g, '')) < this.selectedLoanProductDetails.loanAmountSetting.loanAmountMinimun){
                                      //     console.log("++++", parseFloat(e.target.value.replace(/,/g, '')));
                                      //     touched.loanAmount = true;
                                      //     errors.loanAmount = "Amount is out of bounds";
                                      // }else{
                                      //     console.log("=======");
                                      //     errors.loanAmount ="";
                                      //     touched.loanAmount =null;
                                      // }
                                    }}
                                    value={numberWithCommas(values.loanAmount)}
                                    className={
                                      errors.loanAmount && touched.loanAmount
                                        ? 'is-invalid'
                                        : null
                                    }
                                    name='loanAmount'
                                    required
                                  />
                                  {this.selectedLoanProductDetails !== null &&
                                    this.selectedLoanProductDetails
                                      .loanAmountSetting !== undefined && (
                                      <span className='input-helptext form-text'>
                                        {this.selectedLoanProductDetails
                                          .loanAmountSetting
                                          .loanAmountMinimun !== null && (
                                          <span>
                                            Min: {currencyCode ? `(${currencyCode})` : `(${values.initialCurrency})`}
                                            {numberWithCommas(
                                              this.selectedLoanProductDetails
                                                .loanAmountSetting
                                                .loanAmountMinimun
                                            )}
                                          </span>
                                        )}
                                        {this.selectedLoanProductDetails
                                          .loanAmountSetting
                                          .loanAmountMaximum !== null && (
                                          <span>
                                            {' '}
                                            Max: {currencyCode ? `(${currencyCode})` : `(${values.initialCurrency})`}
                                            {numberWithCommas(
                                              this.selectedLoanProductDetails
                                                .loanAmountSetting
                                                .loanAmountMaximum
                                            )}
                                          </span>
                                        )}

                                        {this.selectedLoanProductDetails
                                          .loanAmountSetting
                                          .loanAmountMinimun === null && (
                                          <span>Min: N/A</span>
                                        )}
                                        {this.selectedLoanProductDetails
                                          .loanAmountSetting
                                          .loanAmountMaximum === null && (
                                          <span> Max: N/A</span>
                                        )}
                                      </span>
                                    )}
                                  {errors.loanAmount && touched.loanAmount ? (
                                    <span className='invalid-feedback'>
                                      {errors.loanAmount}
                                    </span>
                                  ) : null}
                                </Col>
                                <Col>
                                  <Form.Label className='block-level'>
                                    Interest Rate 
                                    {values.interestRateTermsText !== ''
                                      ? `(${
                                          values.interestRateTermsText ===
                                          '% per x days'
                                            ? '% per day'
                                            : values.interestRateTermsText
                                        })`
                                      : ''}
                                  </Form.Label>
                                  <Form.Control
                                    type='text'
                                    autoComplete='off'
                                    // onChange={handleChange}
                                    readOnly={isInteretRateLimitSimilar}
                                    onChange={(e) => {
                                      this.loanSchedulePayload.interestRate = parseFloat(
                                        e.target.value.replace(/,/g, '')
                                      );

                                      if (e.target.value !== '') {
                                        this.setState({
                                          isscheduleError: false,
                                        });
                                      }
                                      setFieldValue(
                                        'interestRate',
                                        numberWithCommas(e.target.value)
                                      );
                                    }}
                                    value={numberWithCommas(
                                      values.interestRate
                                    )}
                                    className={
                                      errors.interestRate &&
                                      touched.interestRate
                                        ? 'is-invalid h-38px'
                                        : 'h-38px'
                                    }
                                    name='interestRate'
                                    required
                                  />
                                  {this.selectedLoanProductDetails !== null &&
                                    this.selectedLoanProductDetails
                                      .loanProductInterestSetting !==
                                      undefined && (
                                      <span className='input-helptext form-text'>
                                        {this.selectedLoanProductDetails
                                          .loanProductInterestSetting
                                          .interestRateMin !== null && (
                                          <span>
                                            Min:{' '}
                                            {numberWithCommas(
                                              this.selectedLoanProductDetails
                                                .loanProductInterestSetting
                                                .interestRateMin
                                            )}
                                            %
                                          </span>
                                        )}
                                        {this.selectedLoanProductDetails
                                          .loanProductInterestSetting
                                          .interestRateMax !== null && (
                                          <span>
                                            {' '}
                                            Max:{' '}
                                            {numberWithCommas(
                                              this.selectedLoanProductDetails
                                                .loanProductInterestSetting
                                                .interestRateMax
                                            )}
                                            %
                                          </span>
                                        )}

                                        {this.selectedLoanProductDetails
                                          .loanProductInterestSetting
                                          .interestRateMin === null && (
                                          <span>Min: N/A</span>
                                        )}
                                        {this.selectedLoanProductDetails
                                          .loanProductInterestSetting
                                          .interestRateMax === null && (
                                          <span> Max: N/A</span>
                                        )}
                                      </span>
                                    )}
                                  {errors.interestRate &&
                                  touched.interestRate ? (
                                    <span className='invalid-feedback'>
                                      {errors.interestRate}
                                    </span>
                                  ) : null}
                                </Col>
                              </Form.Row>
                              <Form.Row>
                                <Col>
                                  <Form.Label className='block-level'>
                                    Repaid Every
                                  </Form.Label>
                                  <Form.Control
                                    type='text'
                                    autoComplete='off'
                                    onChange={(e) => {
                                      setFieldValue(
                                        'repayedEvery',
                                        numberWithCommas(e.target.value)
                                      );
                                    }}
                                    value={values.repayedEvery}
                                    className={
                                      errors.repayedEvery &&
                                      touched.repayedEvery
                                        ? 'is-invalid'
                                        : null
                                    }
                                    name='repayedEvery'
                                    required
                                    disabled
                                  />
                                  {/* <span className="input-helptext">{values.repayPeriodText}</span> */}
                                  {this.selectedLoanProductDetails !== null &&
                                    this.selectedLoanProductDetails
                                      .repaymentReschedulingModel !==
                                      undefined && (
                                      <span className='input-helptext form-text'>
                                        {this.selectedLoanProductDetails
                                          .repaymentReschedulingModel
                                          .repaymentPeriodDescription !==
                                          null &&
                                          this.selectedLoanProductDetails
                                            .repaymentReschedulingModel
                                            .repaymentPeriodDescription !==
                                            '' && (
                                            <span>
                                              {' '}
                                              {
                                                this.selectedLoanProductDetails
                                                  .repaymentReschedulingModel
                                                  .repaymentPeriodDescription
                                              }
                                            </span>
                                          )}

                                        {(this.selectedLoanProductDetails
                                          .repaymentReschedulingModel
                                          .repaymentPeriodDescription ===
                                          null ||
                                          this.selectedLoanProductDetails
                                            .repaymentReschedulingModel
                                            .repaymentPeriodDescription ===
                                            '') && <span> N/A</span>}
                                      </span>
                                    )}
                                  {errors.repayedEvery &&
                                  touched.repayedEvery ? (
                                    <span className='invalid-feedback'>
                                      {errors.repayedEvery}
                                    </span>
                                  ) : null}
                                </Col>
                                <Col>
                                  <Form.Label className='block-level'>
                                     Installments/Tenor {`(${this.selectedLoanProductDetails
                                          .repaymentReschedulingModel
                                          .repaymentPeriodDescription})`}
                                  </Form.Label>
                                  <Form.Control
                                    type='text'
                                    autoComplete='off'
                                    // onChange={handleChange}
                                    onChange={(e) => {
                                      this.loanSchedulePayload.installments = parseInt(
                                        e.target.value.replace(/,/g, '')
                                      );

                                      if (e.target.value !== '') {
                                        this.setState({
                                          isscheduleError: false,
                                        });
                                      }
                                      setFieldValue(
                                        'installmentsDefault',
                                        numberWithCommas(e.target.value)
                                      );
                                    }}
                                    // value={(this.selectedLoanProductDetails.repaymentReschedulingModel!==null && this.selectedLoanProductDetails.repaymentReschedulingModel.installmentsDefault!==null)
                                    //          ? numberWithCommas(this.selectedLoanProductDetails.repaymentReschedulingModel.installmentsDefault.toString()) : ''}
                                    className={
                                      errors.installmentsDefault &&
                                      touched.installmentsDefault
                                        ? 'is-invalid'
                                        : null
                                    }
                                    value={values.installmentsDefault}
                                    name='installmentsDefault'
                                    readOnly={
                                        isInstallmentLimitSimilar}
                                    disabled={
                                      (
                                          (this.selectedLoanProductDetails !==
                                          null &&
                                        this.selectedLoanProductDetails
                                          .repaymentReschedulingModel !== null &&
                                        this.selectedLoanProductDetails
                                          .repaymentReschedulingModel !==
                                          undefined &&
                                        (this.selectedLoanProductDetails
                                          .repaymentReschedulingModel
                                          .installmentsMin === null ||
                                          this.selectedLoanProductDetails
                                            .repaymentReschedulingModel
                                            .installmentsMin === '' ||
                                          this.selectedLoanProductDetails
                                            .repaymentReschedulingModel
                                            .installmentsMax ||
                                          this.selectedLoanProductDetails
                                            .repaymentReschedulingModel
                                            .installmentsMax === '') ||
                                            isInstallmentLimitSimilar===false
                                        ))
                                        ? false
                                        : true
                                    }
                                  />
                                  {this.selectedLoanProductDetails !== null &&
                                    this.selectedLoanProductDetails
                                      .repaymentReschedulingModel !==
                                      undefined && (
                                      <span className='input-helptext form-text'>
                                        {/* Min: {values.installmentsMin}%
                                                                                        Max: {values.installmentsMax}% */}

                                        {this.selectedLoanProductDetails
                                          .repaymentReschedulingModel !==
                                          null &&
                                          this.selectedLoanProductDetails
                                            .repaymentReschedulingModel
                                            .installmentsMin !== null &&
                                          this.selectedLoanProductDetails
                                            .repaymentReschedulingModel
                                            .installmentsMin !== '' && (
                                            <span>
                                              Min:{' '}
                                              {numberWithCommas(
                                                this.selectedLoanProductDetails
                                                  .repaymentReschedulingModel
                                                  .installmentsMin
                                              )}
                                              {`(${this.selectedLoanProductDetails
                                                  .repaymentReschedulingModel
                                                  .repaymentPeriodDescription})`
                                              }
                                            </span>
                                          )}
                                        {this.selectedLoanProductDetails
                                          .repaymentReschedulingModel !==
                                          null &&
                                          this.selectedLoanProductDetails
                                            .repaymentReschedulingModel
                                            .installmentsMax !== null &&
                                          this.selectedLoanProductDetails
                                            .repaymentReschedulingModel
                                            .installmentsMax !== '' && (
                                            <span>
                                              {' '}
                                              Max:{' '}
                                              {numberWithCommas(
                                                this.selectedLoanProductDetails
                                                  .repaymentReschedulingModel
                                                  .installmentsMax
                                              )}
                                              {`(${this.selectedLoanProductDetails
                                                  .repaymentReschedulingModel
                                                  .repaymentPeriodDescription})`
                                              }
                                            </span>
                                          )}

                                        {(this.selectedLoanProductDetails
                                          .repaymentReschedulingModel ===
                                          null ||
                                          this.selectedLoanProductDetails
                                            .repaymentReschedulingModel
                                            .installmentsMin === null ||
                                          this.selectedLoanProductDetails
                                            .repaymentReschedulingModel
                                            .installmentsMin === '') && (
                                          <span>Min: N/A</span>
                                        )}
                                        {(this.selectedLoanProductDetails
                                          .repaymentReschedulingModel ===
                                          null ||
                                          this.selectedLoanProductDetails
                                            .repaymentReschedulingModel
                                            .installmentsMax === null ||
                                          this.selectedLoanProductDetails
                                            .repaymentReschedulingModel
                                            .installmentsMax === '') && (
                                          <span> Max: N/A</span>
                                        )}
                                      </span>
                                    )}
                                  {errors.installmentsDefault &&
                                  touched.installmentsDefault ? (
                                    <span className='invalid-feedback'>
                                      {errors.installmentsDefault}
                                    </span>
                                  ) : null}

                                  {/* <span className="input-helptext">Min: 1 Max: 48</span> */}
                                </Col>
                              </Form.Row>
                              <Form.Row>
                                <Col sm={6}>
                                  <Form.Label className='block-level'>
                                    Arrears Tolerance Period (days)
                                  </Form.Label>
                                  <Form.Control
                                    readOnly
                                    type='text'
                                    autoComplete='off'
                                    onChange={handleChange}
                                    value={numberWithCommas(
                                      values.arearsTolerancePeriodInDaysDefault
                                    )}
                                    className={
                                      errors.arearsTolerancePeriodInDaysDefault &&
                                      touched.arearsTolerancePeriodInDaysDefault
                                        ? 'is-invalid'
                                        : null
                                    }
                                    name='arearsTolerancePeriodInDaysDefault'
                                  />
                                  <span className='input-helptext form-text'>
                                    {/* Min: {values.installmentsMin}%
                                                                                    Max: {values.installmentsMax}% */}

                                    {values.arearsTolerancePeriodInDaysMin !==
                                      null &&
                                      values.arearsTolerancePeriodInDaysMin !==
                                        '' && (
                                        <span>
                                          Min:{' '}
                                          {numberWithCommas(
                                            values.arearsTolerancePeriodInDaysMin
                                          )}
                                        </span>
                                      )}
                                    {values.arearsTolerancePeriodInDaysMax !==
                                      null &&
                                      values.arearsTolerancePeriodInDaysMax !==
                                        '' && (
                                        <span>
                                          {' '}
                                          Max:{' '}
                                          {numberWithCommas(
                                            values.arearsTolerancePeriodInDaysMax
                                          )}
                                        </span>
                                      )}

                                    {(values.arearsTolerancePeriodInDaysMin ===
                                      null ||
                                      values.arearsTolerancePeriodInDaysMin ===
                                        '') && <span>Min: N/A</span>}
                                    {(values.arearsTolerancePeriodInDaysMax ===
                                      null ||
                                      values.arearsTolerancePeriodInDaysMax ===
                                        '') && <span> Max: N/A</span>}
                                  </span>
                                </Col>
                                <Col sm={6}>
                                  <Form.Label className='block-level'>
                                    Interest Calculation Method
                                  </Form.Label>
                                  <span className='form-text'>
                                    {values.interestCalcMethodText !== null &&
                                      values.interestCalcMethodText !== '' && (
                                        <span>
                                          {values.interestCalcMethodText}
                                        </span>
                                      )}

                                    {(values.interestCalcMethodText === null ||
                                      values.interestCalcMethodText === '') && (
                                      <span>N/A</span>
                                    )}
                                  </span>
                                </Col>
                              </Form.Row>
                              <Form.Row>
                                <Col sm={6}>
                                  <Form.Label className='block-level'>
                                    Maximum withdrawal amount {currencyCode ? `(${currencyCode})` : `(${values.initialCurrency})`}
                                  </Form.Label>
                                  <Form.Control
                                    type='text'
                                    autoComplete='off'
                                    onChange={handleChange}
                                    value={numberWithCommas(
                                      values.maximumWithdrawalAmount
                                    )}
                                    className={
                                      errors.maximumWithdrawalAmount &&
                                      touched.maximumWithdrawalAmount
                                        ? 'is-invalid'
                                        : null
                                    }
                                    name='maximumWithdrawalAmount'
                                    required
                                  />
                                </Col>
                                <Col sm={6}>
                                  <Form.Label className='block-level'>
                                  How is the Interest deducted?
                                  </Form.Label>
                                  <span className='form-text'>
                                    {values.howIsInterestDeducted !== null &&
                                      values.howIsInterestDeducted !== '' && (
                                        <span>
                                          {values.howIsInterestDeducted}
                                        </span>
                                      )}

                                    {(values.howIsInterestDeducted === null ||
                                      values.howIsInterestDeducted === '') && (
                                        <span>N/A</span>
                                      )}
                                  </span>
                                </Col>
                              </Form.Row>
                            </div>
                          </Accordion.Collapse>
                        </Accordion>

                        <Accordion>
                          <Accordion.Toggle
                            className='accordion-headingLink'
                            as={Button}
                            variant='link'
                            eventKey='0'
                          >
                            Disbursement Details
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey='0'>
                            <div className='each-formsection'>
                              <Form.Row>
                                <Col>
                                  <Form.Label className='block-level'>
                                    Channels
                                  </Form.Label>
                                  <Select
                                    options={allChannelsList}
                                    onChange={(selected) => {
                                      setFieldValue(
                                        'disbursementChannelEncodedKey',
                                        selected.value
                                      );
                                    }}
                                    onBlur={() =>
                                      setFieldTouched(
                                        'disbursementChannelEncodedKey',
                                        true
                                      )
                                    }
                                    // onChange={(selectedLoanProduct) => {
                                    //     this.setState({ selectedLoanProduct });
                                    //     errors.productEncodedKey = null
                                    //     values.productEncodedKey = selectedLoanProduct.value
                                    // }}
                                    className={
                                      errors.disbursementChannelEncodedKey &&
                                      touched.disbursementChannelEncodedKey
                                        ? 'is-invalid'
                                        : null
                                    }
                                    name='disbursementChannelEncodedKey'
                                    required
                                  />
                                </Col>
                              </Form.Row>
                              <Form.Row>
                                <Col className='date-wrap'>
                                  <Form.Label className='block-level'>
                                    Anticipated Disbursement
                                  </Form.Label>
                                  <DatePicker
                                    placeholderText='Choose  date'
                                    autoComplete='new-password'
                                    dateFormat={window.dateformat}
                                    className='form-control form-control-sm'
                                    peekNextMonth
                                    showMonthDropdown
                                    name='anticipatedDisbursmentDate'
                                    value={values.anticipatedDisbursmentDate}
                                    onChange={setFieldValue}
                                    showYearDropdown
                                    dropdownMode='select'
                                    minDate={new Date()}
                                    className={
                                      errors.anticipatedDisbursmentDate &&
                                      touched.anticipatedDisbursmentDate
                                        ? 'is-invalid form-control form-control-sm'
                                        : 'form-control form-control-sm'
                                    }
                                    customInput={
                                      <DatePickerFieldType placeHolder='Choose  date' />
                                    }
                                  />
                                  {errors.anticipatedDisbursmentDate &&
                                  touched.anticipatedDisbursmentDate ? (
                                    <span className='invalid-feedback'>
                                      {errors.anticipatedDisbursmentDate}
                                    </span>
                                  ) : null}
                                </Col>
                                <Col className='date-wrap'>
                                  <Form.Label className='block-level'>
                                    First Repayment Date
                                  </Form.Label>
                                  <DatePicker
                                    placeholderText='Choose  date'
                                    autoComplete='new-password'
                                    // onChangeRaw={this.handleDateChangeRaw}
                                    // onChange={this.handleStartDatePicker}
                                    // selected={this.state.startDate}
                                    // dateFormat={window.dateformat}
                                    // dateFormat={window.dateformat}
                                    className='form-control form-control-sm'
                                    peekNextMonth
                                    showMonthDropdown
                                    name='firstRepaymentDate'
                                    value={values.firstRepaymentDate}
                                    onChange={(e) => {
                                      this.loanSchedulePayload.firstRepaymentDate = e.target.value
                                        .toString()
                                        .toISOString();

                                      if (e.target.value !== '') {
                                        this.setState({
                                          isscheduleError: false,
                                        });
                                      }
                                      
                                      setFieldValue(
                                        'firstRepaymentDate',
                                        e.target.value
                                      );
                                    }}
                                    // onChange={setFieldValue}
                                    showYearDropdown
                                    dropdownMode='select'
                                    // minDate={new Date()}
                                    className={
                                      errors.firstRepaymentDate &&
                                      touched.firstRepaymentDate
                                        ? 'is-invalid form-control form-control-sm'
                                        : 'form-control form-control-sm'
                                    }
                                    customInput={
                                      <DatePickerFieldType placeHolder='Choose date' />
                                    }
                                  />
                                  {errors.firstRepaymentDate &&
                                  touched.firstRepaymentDate ? (
                                    <span className='invalid-feedback'>
                                      {errors.firstRepaymentDate}
                                    </span>
                                  ) : null}
                                </Col>
                              </Form.Row>
                            </div>
                          </Accordion.Collapse>
                        </Accordion>
                        <Accordion>
                          <Accordion.Toggle
                            className='accordion-headingLink'
                            as={Button}
                            variant='link'
                            eventKey='0'
                          >
                            Schedule Preview
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey='0'>
                            <div className='each-formsection'>
                              {getLoanSchedulePreviewRequest.request_status ===
                                loanAndDepositsConstants.PREVIEW_LOAN_SCHEDULE_SUCCESS &&
                                this.renderSchedulePreview(
                                  getLoanSchedulePreviewRequest.request_data
                                    .response.data.result
                                )}

                              <Button
                                size='sm'
                                variant='secondary'
                                className='grayed-out'
                                disabled={
                                  getLoanSchedulePreviewRequest.is_request_processing
                                }
                                onClick={() => {
                                  if (values.interestRate !== '') {
                                    this.loanSchedulePayload.interestRate = parseFloat(
                                      values.interestRate
                                        .toString()
                                        .replace(/,/g, '')
                                    );
                                  }

                                  if (values.firstRepaymentDate !== '') {
                                    this.loanSchedulePayload.firstRepaymentDate = values.firstRepaymentDate.toISOString();
                                  }

                                  if (values.installmentsDefault !== '') {
                                    this.loanSchedulePayload.installments = parseInt(
                                      values.installmentsDefault
                                        .toString()
                                        .replace(/,/g, '')
                                    );
                                  } else {
                                    this.loanSchedulePayload.installments =
                                      this.selectedLoanProductDetails
                                        .repaymentReschedulingModel !== null &&
                                      this.selectedLoanProductDetails
                                        .repaymentReschedulingModel
                                        .installmentsDefault !== null
                                        ? parseInt(
                                            this.selectedLoanProductDetails
                                              .repaymentReschedulingModel
                                              .installmentsDefault
                                          )
                                        : '';
                                  }

                                  this.getSchedulePreview();
                                }}
                              >
                                {getLoanSchedulePreviewRequest.is_request_processing
                                  ? 'Please wait...'
                                  : 'Preview Schedule'}
                              </Button>
                              {this.state.isscheduleError === true &&
                                this.state.scheduleErrorMsg !== '' && (
                                  <Alert className='mt-20' variant='danger'>
                                    {this.state.scheduleErrorMsg}{' '}
                                  </Alert>
                                )}

                              {getLoanSchedulePreviewRequest.request_status ===
                                loanAndDepositsConstants.PREVIEW_LOAN_SCHEDULE_FAILURE && (
                                <Alert className='mt-20' variant='danger'>
                                  {
                                    getLoanSchedulePreviewRequest.request_data
                                      .error
                                  }{' '}
                                </Alert>
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
                            Account Officer Details
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey='0'>
                            <div className='each-formsection'>
                              <Form.Row>
                                <Col>
                                  <Form.Label className='block-level'>
                                    Loan Officer
                                  </Form.Label>
                                  
                                  <Select
                                    options={allAccountOfficersList}
                                    onChange={(selected) => {
                                      setFieldValue(
                                        'accountOfficerEncodedKey',
                                        selected.value
                                      );
                                    }}
                                    onBlur={() =>
                                      setFieldTouched(
                                        'accountOfficerEncodedKey',
                                        true
                                      )
                                    }
                                    className={
                                      errors.accountOfficerEncodedKey &&
                                      touched.accountOfficerEncodedKey
                                        ? 'is-invalid'
                                        : null
                                    }
                                    name='accountOfficerEncodedKey'
                                    required
                                  />
                                  {errors.accountOfficerEncodedKey &&
                                  touched.accountOfficerEncodedKey ? (
                                    <span className='invalid-feedback'>
                                      {errors.accountOfficerEncodedKey}
                                    </span>
                                  ) : null}
                                </Col>
                                <Col>
                                  {/* <Form.Label className='block-level'>
                                    Loan Officer Branch
                                  </Form.Label>
                                  <Select
                                    options={allBranchesList}
                                    onChange={(selected) => {
                                      setFieldValue(
                                        'accountOfficerBranchEncodedKey',
                                        selected.value
                                      );
                                    }}
                                    onBlur={() =>
                                      setFieldTouched(
                                        'accountOfficerBranchEncodedKey',
                                        true
                                      )
                                    }
                                    
                                    className={
                                      errors.accountOfficerBranchEncodedKey &&
                                      touched.accountOfficerBranchEncodedKey
                                        ? 'is-invalid'
                                        : null
                                    }
                                    name='accountOfficerBranchEncodedKey'
                                    required
                                  />
                                  {errors.accountOfficerBranchEncodedKey &&
                                  touched.accountOfficerBranchEncodedKey ? (
                                    <span className='invalid-feedback'>
                                      {errors.accountOfficerBranchEncodedKey}
                                    </span>
                                  ) : null} */}
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
                            Association
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey='0'>
                            <div className='each-formsection'>
                              <Form.Row>
                                <Col>
                                  <Form.Label className='block-level'>
                                    Branch
                                  </Form.Label>

                                  <Select
                                    options={allBranchesList}
                                    onChange={(selected) => {
                                      setFieldValue(
                                        'associatedBranchEncodedKey',
                                        selected.value
                                      );
                                    }}
                                    onBlur={() =>
                                      setFieldTouched(
                                        'associatedBranchEncodedKey',
                                        true
                                      )
                                    }
                                    // onChange={(selectedLoanProduct) => {
                                    //     this.setState({ selectedLoanProduct });
                                    //     errors.productEncodedKey = null
                                    //     values.productEncodedKey = selectedLoanProduct.value
                                    // }}
                                    className={
                                      errors.associatedBranchEncodedKey &&
                                      touched.associatedBranchEncodedKey
                                        ? 'is-invalid'
                                        : null
                                    }
                                    name='associatedBranchEncodedKey'
                                    required
                                  />
                                  {errors.associatedBranchEncodedKey &&
                                  touched.associatedBranchEncodedKey ? (
                                    <span className='invalid-feedback'>
                                      {errors.associatedBranchEncodedKey}
                                    </span>
                                  ) : null}
                                </Col>
                                <Col></Col>
                              </Form.Row>
                            </div>
                          </Accordion.Collapse>
                        </Accordion>

                        <Accordion>
                          <Accordion.Toggle
                            className='accordion-headingLink'
                            as={Button}
                            variant='link'
                            eventKey='0'
                          >
                            Account Notes
                          </Accordion.Toggle>
                          <Accordion.Collapse eventKey='0'>
                            <div className='each-formsection'>
                              <Form.Group>
                                <Form.Control
                                  as='textarea'
                                  rows='3'
                                  onChange={handleChange}
                                  value={values.notes}
                                  className={
                                    errors.notes && touched.notes
                                      ? 'is-invalid'
                                      : null
                                  }
                                  name='notes'
                                  required
                                />
                                {errors.notes && touched.notes ? (
                                  <span className='invalid-feedback'>
                                    {errors.notes}
                                  </span>
                                ) : null}
                              </Form.Group>
                            </div>
                          </Accordion.Collapse>
                        </Accordion>

                        <div className='footer-with-cta toleft'>
                          {/* <div className="checkbox-wrap">
                                                                    <input type="checkbox" name="" id="create-another" />
                                                                    <label htmlFor="create-another">Create Another</label>
                                                                </div> */}
                          {/* <NavLink to={'/all-loans'} className="btn btn-secondary grayed-out">Cancel</NavLink> */}
                          <Button
                            variant='light'
                            className='btn btn-secondary grayed-out'
                            onClick={() => this.props.history.goBack()}
                          >
                            Cancel
                          </Button>
                          <Button
                            type='submit'
                            disabled={
                              createLoanAccountRequest.is_request_processing
                            }
                          >
                            {createLoanAccountRequest.is_request_processing
                              ? 'Please wait...'
                              : 'Create Loan Account'}
                          </Button>
                        </div>
                        {createLoanAccountRequest.request_status ===
                          loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_FAILURE && (
                          <Alert className='mt-20' variant='danger'>
                            {createLoanAccountRequest.request_data.error}{' '}
                          </Alert>
                        )}

                        {createLoanAccountRequest.request_status ===
                          loanAndDepositsConstants.CREATE_A_LOAN_ACCOUNT_SUCCESS && (
                          <Alert className='mt-20' variant='success'>
                            {
                              createLoanAccountRequest.request_data.response
                                .data.message
                            }{' '}
                          </Alert>
                        )}
                      </Form>
                    )}
                  </Formik>
                );
              } else {
                return (
                  <div className='loading-content card'>
                    <div className='loading-text'>No Customers Found</div>
                  </div>
                );
              }
            } else {
              return (
                <div className='loading-content card'>
                  <div className='loading-text'>No Channels Found</div>
                </div>
              );
            }
          } else {
            return (
              <div className='loading-content card'>
                <div className='loading-text'>No Account Officer Found</div>
              </div>
            );
          }
        } else {
          return (
            <div className='loading-content card'>
              <div className='loading-text'>No Branches Found</div>
            </div>
          );
        }
      } else {
        return (
          <div className='loading-content card'>
            <div className='loading-text'>No Loan Products Found</div>
          </div>
        );
      }
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
      getClientsRequest.request_status ===
      clientsConstants.GET_ALL_CLIENTS_FAILURE
    ) {
      return (
        <div className='loading-content card'>
          <div>{getClientsRequest.request_data.error}</div>
        </div>
      );
    }

    if (
      adminGetTransactionChannelsRequest.request_status ===
      administrationConstants.GET_TRANSACTION_CHANNELS_FAILURE
    ) {
      return (
        <div className='loading-content card'>
          <div>{adminGetTransactionChannelsRequest.request_data.error}</div>
        </div>
      );
    }

    if (
      getAllLoanProductsRequest.request_status ===
      productsConstants.GET_ALL_LOAN_PRODUCTS_FAILURE
    ) {
      return (
        <div className='loading-content card'>
          <div>{getAllLoanProductsRequest.request_data.error}</div>
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
                        {this.renderCreateLoanAccount()}
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
    getAllUsers: state.administrationReducers.adminGetAllUsersReducer,
    adminGetAllBranches:
      state.administrationReducers.adminGetAllBranchesReducer,
    adminGetTransactionChannels:
      state.administrationReducers.adminGetTransactionChannelsReducer,
    createLoanAccountReducer: state.loansReducers.createLoanAccountReducer,
    getAllLoanProductsReducer: state.productReducers.getAllLoanProductsReducer,
    getSingleLoanProductsReducer:
      state.productReducers.getSingleLoanProductsReducer,
    getFullLoanProductsReducer: state.loansReducers.getFullLoanProductsReducer,
    getAllClientsReducer: state.clientsReducers.getAllClientsReducer,
    getAClientReducer: state.clientsReducers.getAClientReducer,
    getLoanSchedulePreviewReducer:
      state.loansReducers.getLoanSchedulePreviewReducer,
  };
}

export default connect(mapStateToProps)(NewLoanAccount);
