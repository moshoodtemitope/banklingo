import * as React from 'react';
// import {Router} from "react-router";

import { Fragment } from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import InnerPageContainer from '../../../shared/templates/authed-pagecontainer';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { dashboardActions } from '../../../redux/actions/dashboard/dashboard.action';
import { productActions } from '../../../redux/actions/products/products.action';
import { productsConstants } from '../../../redux/actiontypes/products/products.constants';
import { administrationActions } from '../../../redux/actions/administration/administration.action';
import { administrationConstants } from '../../../redux/actiontypes/administration/administration.constants';
import {dashboardConstants} from '../../../redux/actiontypes/dashboard/dashboard.constants'
import '@react-pdf-viewer/core/lib/styles/index.css';

import PrintReport from '../../../shared/components/print-report';


import '../styles.scss';
import DatePickerFieldType from '../../../_helpers/DatePickerFieldType';
import SubMenu from '../../../shared/components/SubMenu';
import { LOAN_REPORTS_MENU_LINKS, REPORTS_MENU_LINKS } from '../../../shared/config';
class LoanBalancesReports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      PageSize: '10',
      FullDetails: false,
      CurrentPage: 1,
      CurrentSelectedPage: 1,
      endDate: '',
      startDate: '',
      
      CurrencyCode:'000',
      ProductEncodedKey:'000',
      LoanState:'0',
      reportType:"loanbalance",
      AccountOfficerEncodedKey:'000'
    };
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = () => {
    const { dispatch } = this.props;

      let params = `PageSize=3000&CurrentPage=1`;

      dispatch(administrationActions.getAllUsers(1));
      dispatch(administrationActions.getAllCurrencies(null, true));
      dispatch(productActions.getAllLoanProducts(params));
      this.exportReport("CLEAR")
  };

 

  exportReport = (ExportFileType) => {
    let { LoanState, reportType,endDate, startDate,  CurrencyCode, ProductEncodedKey, AccountOfficerEncodedKey} = this.state;
    this.setState({ExportFileType})

    if (endDate !== '') {
      endDate = endDate.toISOString();
    }
    if (startDate !== '') {
      startDate = startDate.toISOString();
    }
    
    let paramters = `CurrencyCode=${CurrencyCode}&ExportFileType=${ExportFileType}&AccountOfficerEncodedKey=${AccountOfficerEncodedKey}&LoanState=${LoanState}&ProductEncodedKey=${ProductEncodedKey}&StartDate=${startDate}&EndDate=${endDate}`;
    const { dispatch } = this.props;

    dispatch(dashboardActions.getAReport(paramters, reportType, ExportFileType));
  };

 

 

  handleDateChangeRaw = (e) => {
    e.preventDefault();
  };
  handleStartDatePicker = (startDate) => {
    startDate.setHours(startDate.getHours() + 1);

    this.setState({ startDate }, () => {
      if (this.state.endDate !== '') {
        //this.getHistory();
      }
    });
  };

  handleEndDatePicker = (endDate) => {
    endDate.setHours(endDate.getHours() + 1);

    this.setState({ endDate }, () => {
      if (this.state.startDate !== '') {
        //this.getHistory();
      }
    });
  };


  renderReportPrint = (url)=>{
    return(
      <PrintReport fileUrl={url} />
    )
  }


  renderReportsFilter = ()=>{
    let 
        getAccountOfficerRequest =  this.props.getAllUsersReducer.request_data.response.data,
        getAllCurrenciesRequest =  this.props.getAllCurrencies.request_data.response.data,
        productRequest =  this.props.getAllLoanProductsReducer.request_data.response.data;
        
    return (
      <>
        <div className='actions-wrap flexed-right'>
          <Button
            onClick={() => this.exportReport(0)}
            className='action-icon'
            variant='outline-secondary'
            disabled={this.props.getAReportReducer.is_request_processing}
            type='button'
          >
            <img
              alt='Download excel'
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVR42mNgwA4YteuNVPRqDEN0a43SGPABhXoHDp1qQxO9WuMU/TqjKXq1hkf0ao0+AfF/GMZrANCGZ8iKseHX7z82YMNv3n9KYCCkGYTfvP+IExNlwKR90/6vOLUWrAFEw9goBnj0+vwPnhIGZodMCf9/6MZh0gyImBb9/+WHV/9jZsb/v/vi3v+K1dWkGQDCIE0/f/38v/z4CtK9AMK92/v/P3/3/P+Fhxf/mzdZk2YAyOkgzc5dbv9XnVzzf+elXaQZ4Dsh8H/4tCgw27De9H/JinLSvUBRNJKdkChOyhRnJkLZWb/WMAOfQgAYYCIPufpLHwAAAABJRU5ErkJggg=='
              width='16'
              height='16'
            />
          </Button>
          <Button
            onClick={() => this.exportReport(1)}
            className='action-icon'
            variant='outline-secondary'
            disabled={this.props.getAReportReducer.is_request_processing}
            type='button'
          >
            <img
              alt=''
              title="Print"
              src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADZSURBVDiNxdK9SsMxFAXwXz9ABbHO4uJsxW7i2s0HcBZ38XFcfQBHn8GhLurQsVsXl1pLF8GvIflDiIl064FAcnJyc8+9l3WjVeF7aCfnb7yXhJ0Ct4lr/GAvrisc4WGVrLZwlnHHuMFGLm7nRAUvuC/p0xrs4AKvOBUspOjgOepuscgD7At+HytZHGCATzxhCt2C8BLLSpBtjFOiVIMFZgV+ptDKtI0fGAr+dzEROtI8PkE/Whjhi/ognQtFbO6b/V0uLFlo4RBzvMU1j9yfD1cdZf4Z5/XiF5T/Jkm8LA5TAAAAAElFTkSuQmCC'
              width='16'
              height='16'
            />
          </Button>
        </div>
      <div className='heading-with-cta'>
        <Form
          className='one-liner'
        >
          
          
            <Form.Group className=''>
              <label htmlFor='toshow' className="block-label">Start Date</label>
              <DatePicker
                autoComplete='new-off'
                onChangeRaw={this.handleDateChangeRaw}
                onChange={this.handleStartDatePicker}
                selected={this.state.startDate}
                dateFormat={window.dateformat}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
                placeholderText='Start date'
                autoComplete='new-password'
                maxDate={new Date()}
                // className="form-control form-control-sm h-38px"
                className='form-control form-control-sm '
                customInput={
                  <DatePickerFieldType placeHolder='Start date' />
                }
              />
            </Form.Group>
            <Form.Group className=''>
              <label htmlFor='toshow' className="block-label">End Date</label>
              <DatePicker
                autoComplete='new-off'
                placeholderText='End  date'
                onChangeRaw={this.handleDateChangeRaw}
                onChange={this.handleEndDatePicker}
                selected={this.state.endDate}
                dateFormat={window.dateformat}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
                maxDate={new Date()}
                // className="form-control form-control-sm h-38px"
                className='form-control form-control-sm'
                customInput={
                  <DatePickerFieldType placeHolder='End date' />
                }
              />
              
            </Form.Group>
            <Form.Group>
              <label htmlFor='toshow' className="mr-10">Account State</label>
              <select
                id='toshow'
                onChange={(e) =>
                  this.setState({ LoanState: e.target.value })
                }
                value={this.state.LoanState}
                className='countdropdown form-control form-control-sm'
              >
                
                <option value='0'>All</option>
                {/* <option value='1'>Partial Application</option> */}
                <option value='2'>Pending Approval</option>
                <option value='3'>Approved</option>
                {/* <option value='4'>Rejected</option> */}
                <option value='5'>Active</option>
                {/* <option value='6'>In Arears</option> */}
                <option value='7'>Closed</option>
                {/* <option value='8'>Closed Written Off</option> */}
                <option value='9'>Dormant</option>
                <option value='10'>Locked</option>
                <option value='11'>Matured</option>
                

              </select>


            </Form.Group>
            <Form.Group>
              <label htmlFor='toshow' className="mr-10">Loan Product</label>
              <select
                id='toshow'
                onChange={(e) =>
                  this.setState({ ProductEncodedKey: e.target.value })
                }
                value={this.state.ProductEncodedKey}
                className='countdropdown form-control form-control-sm'
              >
                
                <option value='000'>All</option>
                {
                  productRequest.map((eachData, index) => {
                    return (
                      <option key={index} value={eachData.loanProductEncodedKey}>{eachData.loanProductName}</option>
                    )
                  })
                }

              </select>


            </Form.Group>
            <Form.Group>
              <label htmlFor='toshow' className="mr-10">Account Officers</label>
              <select
                id='toshow'
                onChange={(e) =>
                  this.setState({ AccountOfficerEncodedKey: e.target.value })
                }
                value={this.state.AccountOfficerEncodedKey}
                className='countdropdown form-control form-control-sm'
              >
                
                <option value='000'>All</option>
                {
                  getAccountOfficerRequest.map((eachData, index) => {
                    return (
                      <option key={index} value={eachData.key}>{eachData.displayName} ({eachData.name})</option>
                    )
                  })
                }

              </select>


            </Form.Group>
            <Form.Group>
              <label htmlFor='toshow' className="mr-10">Currency</label>
              <select
                id='toshow'
                onChange={(e) =>
                  this.setState({ CurrencyCode: e.target.value })
                }
                value={this.state.CurrencyCode}
                className='countdropdown form-control form-control-sm'
              >
                
                <option value='000'>All</option>
                {
                  getAllCurrenciesRequest.map((eachData, index) => {
                    return (
                      <option key={index} value={eachData.code}>{eachData.name} ({eachData.code})</option>
                    )
                  })
                }

              </select>


            </Form.Group>
          
          
          
          
        </Form>
      </div>
      
        {this.props.getAReportReducer.request_status === dashboardConstants.GET_A_REPORT_FAILURE &&


          <div className='loading-content errormsg'>
            <div>{this.props.getAReportReducer.request_data.error}</div>
          </div>

        }
        {(this.props.getAReportReducer.request_status === dashboardConstants.GET_A_REPORT_SUCCESS
          && this.state.ExportFileType===1) &&
         this.renderReportPrint(this.props.getAReportReducer.request_data.url)
        }
        {this.props.getAReportReducer.request_status === dashboardConstants.GET_A_REPORT_PENDING &&
         <div className='loading-content'>
            <div className='loading-text'>Generating report... </div>
          </div>
        }
      </>
    )
  }

  renderReportsWrap = () => {
    let 
        getAllCurrenciesRequest =  this.props.getAllCurrencies,
        productRequest = this.props.getAllLoanProductsReducer,
        getAccountOfficersRequest =  this.props.getAllUsersReducer;

        
    if(getAllCurrenciesRequest.request_status===administrationConstants.GET_ALLCURRENCIES_PENDING
        || productRequest.request_status === productsConstants.GET_ALL_LOAN_PRODUCTS_PENDING
        || getAccountOfficersRequest.request_status===administrationConstants.GET_ALL_USERS_PENDING){
        
          return (
            <div className='loading-content'>
              <div className='loading-text'>Please wait... </div>
            </div>
          )
    }

    if(productRequest.request_status===productsConstants.GET_ALL_LOAN_PRODUCTS_FAILURE){
      
        return (
          <div className='loading-content errormsg'>
            <div>{productRequest.request_data.error}</div>
          </div>
        )
    }
    if(getAllCurrenciesRequest.request_status===administrationConstants.GET_ALLCURRENCIES_FAILURE){
      
      return (
        <div className='loading-content errormsg'>
          <div>{getAllCurrenciesRequest.request_data.error}</div>
        </div>
      )
  }

   

    if(getAllCurrenciesRequest.request_status===administrationConstants.GET_ALLCURRENCIES_SUCCESS
        && productRequest.request_status===productsConstants.GET_ALL_LOAN_PRODUCTS_SUCCESS
        && getAccountOfficersRequest.request_status===administrationConstants.GET_ALL_USERS_SUCCESS){
        
        
         return this.renderReportsFilter();
    }

    


    
  }

  render() {
    return (
      <Fragment>
        <InnerPageContainer {...this.props}>
          <div className='content-wrapper'>
            <div className='module-heading'>
              <div className='module-title'>
                <div className='content-container'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className=''>
                        <h2>Loan Balances</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <SubMenu links={REPORTS_MENU_LINKS} />
              <div className='secondLevelMenu'>
                <SubMenu links={LOAN_REPORTS_MENU_LINKS} />
              </div>
              <div className='module-content'>
                <div className='content-container'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='middle-content'>
                        {this.renderReportsWrap()}
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
    getAReportReducer: state.dashboardReducers.getAReportReducer,
    getAllCurrencies: state.administrationReducers.adminGetAllCurrenciesReducer,
    getAllUsersReducer: state.administrationReducers.adminGetAllUsersReducer,
    getAllLoanProductsReducer: state.productReducers.getAllLoanProductsReducer,
  };
}
export default connect(mapStateToProps)(LoanBalancesReports);
