import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import { NavLink} from 'react-router-dom';


import { dashboardActions } from '../../redux/actions/dashboard/dashboard.action';
import { dashboardConstants } from '../../redux/actiontypes/dashboard/dashboard.constants'
import "./dashboard.scss"; 
class DashboardLanding extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }

    componentDidMount() {
        this.loadInitialData();
    }

    loadInitialData = () => {
        this.getDashboardData();
    }

    getDashboardData = () => {
        const { dispatch } = this.props;

        dispatch(dashboardActions.getDashboardData());
    }

    renderDashboardStats(){
        let getDashboardStatsRequest = this.props.getDashboardStats;

        switch (getDashboardStatsRequest.request_status) {
            case (dashboardConstants.GET_DASHOBOARD_DATA_PENDING):
                return (
                    <div className="loading-content">
                        <div className="loading-text">Please wait... </div>
                        
                        
                    </div>
                )

            case (dashboardConstants.GET_DASHOBOARD_DATA_SUCCESS):
                let allDashboardStat = getDashboardStatsRequest.request_data.response.data;
                if(allDashboardStat !== undefined){
                    // console.log("-----",allDashboardStat);
                    return (
                        <div className="all-stats-wrap">
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{allDashboardStat.activeCustomers}</h4>
                                    <span className="stat-text">Active Customers</span>
                                </div>
                            </div>
                            {/* <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{allDashboardStat.activeCustomers}</h4>
                                    <span className="stat-text">Number Of Groups</span>
                                </div>
                            </div> */}
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{allDashboardStat.loansAwaitingApproval}</h4>
                                    <span className="stat-text">Loans Awaiting Approval</span>
                                </div>
                            </div>
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{allDashboardStat.totalDeposits}</h4>
                                    <span className="stat-text">Total Deposits</span>
                                </div>
                            </div>
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{allDashboardStat.activeSavings}</h4>
                                    <span className="stat-text">Active Savings</span>
                                </div>
                            </div>
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{allDashboardStat.users}</h4>
                                    <span className="stat-text">Users</span>
                                </div>
                            </div>
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">{allDashboardStat.totalLoanPortfolio}</h4>
                                    <span className="stat-text">Total Loan Portfolio</span>
                                </div>
                            </div>
                            {/* <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">0.00</h4>
                                    <span className="stat-text">Total Overdrafts</span>
                                </div>
                            </div>
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">1,475,235,576.64</h4>
                                    <span className="stat-text">Gross Loan Portfolio</span>
                                </div>
                            </div>
                            <div className="each-stat">
                                <div className="stat-data card">
                                    <h4 className="stat-value">99.89%</h4>
                                    <span className="stat-text">PAR > 30 Days</span>
                                </div>
                            </div> */}
                        </div>
                    )
                }else {
                    return null;
                }

            case (dashboardConstants.GET_DASHOBOARD_DATA_FAILURE):
                return (
                    <div className="loading-content errormsg">
                        <div>{getDashboardStatsRequest.request_data.error}</div>
                    </div>
                )
            default:
                return null;
        }
    }

    render() {
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
                                                <h2>Dashboard</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div className="module-content">
                            <div className="content-container">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="middle-content">
                                            <div className="row">
                                                <div className="col-sm-8">
                                                    <div className="dashboardstats">
                                                        <div className="all-stats-wrap">
                                                            {this.renderDashboardStats()}
                                                            {/* <div className="each-stat">
                                                                <div className="stat-data card">
                                                                    <h4 className="stat-value">6,669</h4>
                                                                    <span className="stat-text">Active Customers</span>
                                                                </div>
                                                            </div>
                                                            <div className="each-stat">
                                                                <div className="stat-data card">
                                                                    <h4 className="stat-value">0</h4>
                                                                    <span className="stat-text">Number Of Groups</span>
                                                                </div>
                                                            </div>
                                                            <div className="each-stat">
                                                                <div className="stat-data card">
                                                                    <h4 className="stat-value">185</h4>
                                                                    <span className="stat-text">Loans Awaiting Approval</span>
                                                                </div>
                                                            </div>
                                                            <div className="each-stat">
                                                                <div className="stat-data card">
                                                                    <h4 className="stat-value">16,888,554.31</h4>
                                                                    <span className="stat-text">Total Deposits</span>
                                                                </div>
                                                            </div>
                                                            <div className="each-stat">
                                                                <div className="stat-data card">
                                                                    <h4 className="stat-value">0.00</h4>
                                                                    <span className="stat-text">Total Overdrafts</span>
                                                                </div>
                                                            </div>
                                                            <div className="each-stat">
                                                                <div className="stat-data card">
                                                                    <h4 className="stat-value">1,475,235,576.64</h4>
                                                                    <span className="stat-text">Gross Loan Portfolio</span>
                                                                </div>
                                                            </div>
                                                            <div className="each-stat">
                                                                <div className="stat-data card">
                                                                    <h4 className="stat-value">99.89%</h4>
                                                                    <span className="stat-text">PAR > 30 Days</span>
                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="activities-items">
                                                        <h6>Latest Activity </h6>
                                                        {/* <div className="activities-wrap">
                                                            <div className="each-activity">
                                                                <span>
                                                                    <NavLink to='/customer/20/savingsaccount/77339322'>Payroll - Private 2073458499</NavLink>
                                                                </span>
                                                                <span className="activity-action">is now in arrears</span>
                                                                <div>
                                                                    <span className="action-date">29-04-2019</span>
                                                                    <span className="action-by"> <NavLink to='/customer/20/savingsaccount/77339322'>Mayokun Malomo</NavLink></span>
                                                                </div>
                                                            </div>
                                                            <div className="each-activity">
                                                                <span>
                                                                    <NavLink to='/customer/20/savingsaccount/77339322'>Payroll - Private 2073458499</NavLink>
                                                                </span>
                                                                <span className="activity-action">is now in arrears</span>
                                                                <div>
                                                                    <span className="action-date">29-04-2019</span>
                                                                    <span className="action-by"> <NavLink to='/customer/20/savingsaccount/77339322'>Mayokun Malomo</NavLink></span>
                                                                </div>
                                                            </div>
                                                            <div className="each-activity">
                                                                <span>
                                                                    <NavLink to='/customer/20/savingsaccount/77339322'>Payroll - Private 2073458499</NavLink>
                                                                </span>
                                                                <span className="activity-action">has been disbursed</span>
                                                                <div>
                                                                    <span className="action-date">29-04-2019</span>
                                                                    <span className="action-by"> <NavLink to='/customer/20/savingsaccount/77339322'>Mayokun Malomo</NavLink></span>
                                                                </div>
                                                            </div>
                                                            <div className="each-activity">
                                                                <span>
                                                                    <NavLink to='/customer/20/savingsaccount/77339322'>Payroll - Private 2073458499</NavLink>
                                                                </span>
                                                                <span className="activity-action">has been disbursed</span>
                                                                <div>
                                                                    <span className="action-date">29-04-2019</span>
                                                                    <span className="action-by"> <NavLink to='/customer/20/savingsaccount/77339322'>Mayokun Malomo</NavLink></span>
                                                                </div>
                                                            </div>
                                                            <div className="each-activity">
                                                                <span>
                                                                    <NavLink to='/customer/20/savingsaccount/77339322'>Payroll - Private 2073458499</NavLink>
                                                                </span>
                                                                <span className="activity-action">has been disbursed</span>
                                                                <div>
                                                                    <span className="action-date">29-04-2019</span>
                                                                    <span className="action-by"> <NavLink to='/customer/20/savingsaccount/77339322'>Mayokun Malomo</NavLink></span>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>
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
        getDashboardStats: state.dashboardReducers.getDashboardStatReducer,
    };
}

export default connect(mapStateToProps)(DashboardLanding);