import * as React from 'react';
// import {Router} from "react-router";

import { Fragment } from 'react';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';
import InnerPageContainer from '../../../shared/templates/authed-pagecontainer';
import TableComponent from '../../../shared/elements/table';
import TablePagination from '../../../shared/elements/table/pagination';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { dashboardActions } from '../../../redux/actions/dashboard/dashboard.action';
import { administrationActions } from '../../../redux/actions/administration/administration.action';
import { administrationConstants } from '../../../redux/actiontypes/administration/administration.constants';
import {dashboardConstants} from '../../../redux/actiontypes/dashboard/dashboard.constants'
import { branchActions, branchConstants } from '../../../redux/actions/administration/branch-management.actions';
import '@react-pdf-viewer/core/lib/styles/index.css';

import PrintReport from '../../../shared/components/print-report';
// Import styles
import '@react-pdf-viewer/print/lib/styles/index.css';

import '../styles.scss';
import DatePickerFieldType from '../../../_helpers/DatePickerFieldType';
import SubMenu from '../../../shared/components/SubMenu';
import { USERS_REPORTS_MENU_LINKS, REPORTS_MENU_LINKS } from '../../../shared/config';
class TellerReports extends React.Component {
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
      SearchText: '',

      showAmountExpected: true,
      showAmountPaid: false,
      showAmountDue: true,
      reportType:"users",
    };
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = () => {
    const { dispatch } = this.props;

      dispatch(administrationActions.getAllRoles());
      dispatch(branchActions.getAllBranches(null,null, null, true));
  };

  exportReport = (ExportFileType) => {
    let { UserRoleId, BranchId, reportType } = this.state;

    this.setState({ExportFileType})
    let paramters = `UserRoleId=${UserRoleId}&BranchId=${BranchId}&ExportFileType=${ExportFileType}`;
    const { dispatch } = this.props;

    dispatch(dashboardActions.getAReport(paramters, reportType, ExportFileType));
  };

 

  renderReportPrint = (url)=>{
    return(
      <PrintReport fileUrl={url} />
    )
  }

  renderReportsFilter = ()=>{
    let getAReportRequest = this.props.getAReportReducer,
        getRolesRequest =  this.props.getRolesReducer.request_data.response.data,
        getAllBranchesRequest = this.props.getAllBranchesReducer.request_data.response.data;
        
    return (
      <>
      <div className='heading-with-cta'>
        <Form
          className='one-liner'
        >
          

          <Form.Group className='table-filters'>
            <label htmlFor='toshow' className="mr-10">Branch</label>
            <select
              id='toshow'
              onChange={(e) =>
                this.setState({BranchId: e.target.value})
              }
              value={this.state.BranchId}
              className='countdropdown form-control form-control-sm'
            >
              <option value=''>Select</option>
              <option value='-30'>All</option>
              {
                getAllBranchesRequest.map((eachData, index)=>{
                  return(
                    <option key={index} value={eachData.id}>{eachData.name}</option>
                  )
                })
              }
              
              {/* <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='200'>200</option> */}
            </select>


          </Form.Group>
          <Form.Group className='table-filters'>
            <label htmlFor='toshow' className="mr-10">Role</label>
            <select
              id='toshow'
              onChange={(e) =>
                this.setState({UserRoleId: e.target.value})
              }
              value={this.state.UserRoleId}
              className='countdropdown form-control form-control-sm'
            >
              <option value=''>Select</option>
              <option value='-30'>All</option>
              {
                getRolesRequest.map((eachData, index)=>{
                  return(
                    <option key={index} value={eachData.roleId}>{eachData.name}</option>
                  )
                })
              }
              
              {/* <option value='25'>25</option>
              <option value='50'>50</option>
              <option value='200'>200</option> */}
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
        getRolesRequest =  this.props.getRolesReducer,
        getAllBranchesRequest = this.props.getAllBranchesReducer;

    if(getRolesRequest.request_status===administrationConstants.GET_ALL_ROLES_PENDING
        || getAllBranchesRequest.request_status===branchConstants.GET_ALL_BRANCHES_PENDING){
        
          return (
            <div className='loading-content'>
              <div className='loading-text'>Please wait... </div>
            </div>
          )
    }

    if(getRolesRequest.request_status===administrationConstants.GET_ALL_ROLES_FAILURE){
      
        return (
          <div className='loading-content errormsg'>
            <div>{getRolesRequest.request_data.error}</div>
          </div>
        )
    }

    if(getAllBranchesRequest.request_status===branchConstants.GET_ALL_BRANCHES_FAILURE){
      
      return (
        <div className='loading-content errormsg'>
          <div>{getAllBranchesRequest.request_data.error}</div>
        </div>
      )
    }

    if(getRolesRequest.request_status===administrationConstants.GET_ALL_ROLES_SUCCESS
      && getAllBranchesRequest.request_status===branchConstants.GET_ALL_BRANCHES_SUCCESS){
        
        
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
                        <h2>Tellers</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <SubMenu links={REPORTS_MENU_LINKS} />
              <div className='secondLevelMenu'>
                <SubMenu links={USERS_REPORTS_MENU_LINKS} />
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
  };
}
export default connect(mapStateToProps)(TellerReports);
