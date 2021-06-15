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

import { administrationActions } from '../../../redux/actions/administration/administration.action';
import { administrationConstants } from '../../../redux/actiontypes/administration/administration.constants';
import {dashboardConstants} from '../../../redux/actiontypes/dashboard/dashboard.constants'

import '@react-pdf-viewer/core/lib/styles/index.css';

import PrintReport from '../../../shared/components/print-report';
// Import styles
import '@react-pdf-viewer/print/lib/styles/index.css';

import '../styles.scss';
import DatePickerFieldType from '../../../_helpers/DatePickerFieldType';
import SubMenu from '../../../shared/components/SubMenu';
import { ACCOUNTING_REPORTS_MENU_LINKS, REPORTS_MENU_LINKS } from '../../../shared/config';
class TrialBalanceReports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      PageSize: '10',
      FullDetails: false,
      CurrentPage: 1,
      CurrentSelectedPage: 1,
      endDate: '',
      BalanceDate: '',
      reportType:"trialbalance",
      BranchId:JSON.parse(localStorage.getItem('lingoAuth')).BranchId,
    };
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = () => {
    const { dispatch } = this.props;

      
      dispatch(administrationActions.getAllCurrencies(null, true));
      
      
      
  };

 

  exportReport = (ExportFileType) => {
    let {  BranchId, reportType,endDate, BalanceDate,  CurrencyCode } = this.state;
    this.setState({ExportFileType})
    
    let paramters = `BranchId=${BranchId}&CurrencyCode=${CurrencyCode}&ExportFileType=${ExportFileType}&BalanceDate=${BalanceDate.toISOString()}`;
    const { dispatch } = this.props;

    dispatch(dashboardActions.getAReport(paramters, reportType, ExportFileType));
  };

 

 

  handleDateChangeRaw = (e) => {
    e.preventDefault();
  };
  handleStartDatePicker = (BalanceDate) => {
    BalanceDate.setHours(BalanceDate.getHours() + 1);

    this.setState({ BalanceDate });
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
    let getAReportRequest = this.props.getAReportReducer,
        getAllCurrenciesRequest =  this.props.getAllCurrencies.request_data.response.data;
        
    return (
      <>
      <div className='heading-with-cta'>
        <Form
          className='one-liner'
        >
         
            <Form.Group className=''>
              <label htmlFor='toshow' className="block-label">Balance Date</label>
              <DatePicker
                autoComplete='new-off'
                onChangeRaw={this.handleDateChangeRaw}
                onChange={this.handleStartDatePicker}
                selected={this.state.BalanceDate}
                dateFormat={window.dateformat}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode='select'
                placeholderText='Balance date'
                autoComplete='new-password'
                maxDate={new Date()}
                // className="form-control form-control-sm h-38px"
                className='form-control form-control-sm '
                customInput={
                  <DatePickerFieldType placeHolder='Balance date' />
                }
              />
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
                <option value=''>Select</option>
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
          
          
          
          <div className='actions-wrap'>
            <Button
              onClick={()=>this.exportReport(0)}
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
              onClick={()=>this.exportReport(1)}
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
    let getAReportRequest = this.props.getAReportReducer,
        getAllCurrenciesRequest =  this.props.getAllCurrencies;

        
    if(getAllCurrenciesRequest.request_status===administrationConstants.GET_ALLCURRENCIES_PENDING){
        
          return (
            <div className='loading-content'>
              <div className='loading-text'>Please wait... </div>
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


    if(getAllCurrenciesRequest.request_status===administrationConstants.GET_ALLCURRENCIES_SUCCESS){
        
        
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
                        <h2>Trial Balance</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <SubMenu links={REPORTS_MENU_LINKS} />
              <div className='secondLevelMenu'>
                <SubMenu links={ACCOUNTING_REPORTS_MENU_LINKS} />
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
    getRolesReducer: state.administrationReducers.adminGetAllRolesReducer,
    getAllBranchesReducer: state.administrationReducers.adminGetAllBranchesReducer,
    getAllCurrencies: state.administrationReducers.adminGetAllCurrenciesReducer,
    getAllLoanProductsReducer: state.productReducers.getAllLoanProductsReducer,
  };
}
export default connect(mapStateToProps)(TrialBalanceReports);
