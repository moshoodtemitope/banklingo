import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { numberWithCommas} from '../../shared/utils';

import { loanActions } from '../../redux/actions/loans/loans.action';
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'

import "./loanmanagement.scss"; 
class LoansInArrears extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize: 25,
            FullDetails: false,
            CurrentPage: 1,
            CurrentSelectedPage: 1,
            endDate: "",
            startDate: "",
            LoanState:6
        }

        
    }

    componentDidMount() {
        this.loadInitialData();
    }

    loadInitialData = () => {
        let { PageSize, CurrentPage } = this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
        this.getLoans(params);
    }

    getLoans = (paramters) => {
        const { dispatch } = this.props;

        dispatch(loanActions.getLoansInArrears(paramters));
    }

    handleDateChangeRaw = (e) => {
        e.preventDefault();
    }
    handleStartDatePicker = (startDate) => {
        startDate.setHours(startDate.getHours() + 1);
        
        this.setState({ startDate }, ()=>{
            if(this.state.endDate!==""){
                //this.getHistory();
            }
        });
    }

    handleEndDatePicker = (endDate) => {
        endDate.setHours(endDate.getHours() + 1);
       
        this.setState({ endDate }, ()=>{
                if(this.state.startDate!==""){
                    //this.getHistory();
                }
        });
    }

    setPagesize = (PageSize, tempData) => {
        // console.log('----here', PageSize.target.value);
        const { dispatch } = this.props;
        let sizeOfPage = PageSize.target.value,
            { FullDetails, CurrentPage, CurrentSelectedPage } = this.state;

        this.setState({ PageSize: sizeOfPage });

        let params = `FullDetails=${FullDetails}&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;
        // this.getLoans(params);

        if(tempData){
            dispatch(loanActions.getLoansInArrears(params,tempData));
        }else{
            dispatch(loanActions.getLoansInArrears(params));
        }
    }

    setShowDetails = (FullDetails, tempData) => {
        // console.log('----here', PageSize.target.value);
        const { dispatch } = this.props;
        let showDetails = FullDetails.target.checked,
            { CurrentPage, CurrentSelectedPage, PageSize } = this.state;

        this.setState({ FullDetails: showDetails });

        let params = `FullDetails=${showDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;
        // this.getLoans(params);

        if(tempData){
            dispatch(loanActions.getLoansInArrears(params,tempData));
        }else{
            dispatch(loanActions.getLoansInArrears(params));
        }
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize,CurrentPage,FullDetails} = this.state;

        // this.setState({PageSize: sizeOfPage});

        // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);
        // let params= `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&BranchId=${BranchId}&ClientState=${ClientState}`;

        let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${nextPage}`;
        if(tempData){
            dispatch(loanActions.getLoansInArrears(params,tempData));
        }else{
            dispatch(loanActions.getLoansInArrears(params));
        }
    }

    renderLoans = () => {
        let getLoansRequest = this.props.getLoansRequest;

        let saveRequestData= getLoansRequest.request_data!==undefined?getLoansRequest.request_data.tempData:null;
        switch (getLoansRequest.request_status) {
            case (loanAndDepositsConstants.GET__ARREARS_LOANS_PENDING):
                if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
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
                                    <select id="toshow" 
                                        
                                        className="countdropdown form-control form-control-sm">
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
                                        <th>Account Number</th>
                                        <th>Client Name</th>
                                        <th>Product Name</th>
                                        <th>Loan Amount</th>
                                        <th>Loan State</th>
                                        <th>Principal Due</th>
                                        <th>Total Paid</th>
                                        <th>Total Due</th>
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
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </TableComponent>
                            <div className="loading-text">Please wait... </div>
                        </div>
                    )
                }else{
                    return(
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
                                                <DatePicker
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleStartDatePicker}
                                                    selected={this.state.startDate}
                                                    dateFormat="d MMMM, yyyy"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    placeholderText="Start date"
                                                    maxDate={new Date()}
                                                    // className="form-control form-control-sm h-38px"
                                                    className="form-control form-control-sm "

                                                />
                                                <DatePicker placeholderText="End  date"
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleEndDatePicker}
                                                    selected={this.state.endDate}
                                                    dateFormat="d MMMM, yyyy"
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
                                                />
                                                {/* {errors.startDate && touched.startDate ? (
                                                <span className="invalid-feedback">{errors.startDate}</span>
                                            ) : null} */}
                                            </Form.Group>
                                            <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                        </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow" 
                                            
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
                                            <th>Account Number</th>
                                            <th>Client Name</th>
                                            <th>Product Name</th>
                                            <th>Date Created</th>
                                            <th>Loan Amount</th>
                                            <th>Loan State</th>
                                            <th>Principal Due</th>
                                            <th>Total Paid</th>
                                            <th>Total Due</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            saveRequestData.map((eachLoan, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <tr>
                                                            {(eachLoan.loanStateDescription==="Rejected" || eachLoan.loanStateDescription==="Closed Withdrawn" || eachLoan.loanStateDescription==="Closed") && 
                                                                <td><NavLink to={`/customer/${eachLoan.clientKey}/closedaccounts/${eachLoan.encodedKey}`}> {eachLoan.accountNumber}</NavLink></td>
                                                            } 
                                                            {(eachLoan.loanStateDescription!=="Rejected" && eachLoan.loanStateDescription!=="Closed Withdrawn" && eachLoan.loanStateDescription!=="Closed") &&   
                                                                <td><NavLink to={`/customer/${eachLoan.clientKey}/loanaccount/${eachLoan.encodedKey}`}> {eachLoan.accountNumber}</NavLink></td>            
                                                            }
                                                            <td><NavLink to={`/customer/${eachLoan.clientKey}`}>{eachLoan.clientName}</NavLink>  </td>
                                                            <td>{eachLoan.productName}</td>
                                                            <td>{eachLoan.dateCreated}</td>
                                                            <td>&#8358;{numberWithCommas(eachLoan.loanAmount, true)}</td>
                                                            <td>{eachLoan.loanStateDescription}</td>
                                                            <td>&#8358;{numberWithCommas(eachLoan.principalDue, true)}</td>
                                                            <td>&#8358;{numberWithCommas(eachLoan.totalPaid, true)}</td>
                                                            <td>&#8358;{numberWithCommas(eachLoan.totalDue, true)}</td>
                                                        </tr>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </tbody>
                                </TableComponent>
                                {/* <div className="footer-with-cta toleft">
                                    <NavLink to={'/administration/organization/newbranch'} className="btn btn-primary">New Branch</NavLink>
                                </div> */}
                            </div>
                    )
                }

            case (loanAndDepositsConstants.GET__ARREARS_LOANS_SUCCESS):
                let allLoans = getLoansRequest.request_data.response.data;
                if (allLoans !== undefined) {
                    if (allLoans.result.length >= 1) {
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
                                                <DatePicker
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleStartDatePicker}
                                                    selected={this.state.startDate}
                                                    dateFormat="d MMMM, yyyy"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    placeholderText="Start date"
                                                    maxDate={new Date()}
                                                    // className="form-control form-control-sm h-38px"
                                                    className="form-control form-control-sm "

                                                />
                                                <DatePicker placeholderText="End  date"
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleEndDatePicker}
                                                    selected={this.state.endDate}
                                                    dateFormat="d MMMM, yyyy"
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
                                                />
                                                {/* {errors.startDate && touched.startDate ? (
                                                <span className="invalid-feedback">{errors.startDate}</span>
                                            ) : null} */}
                                            </Form.Group>
                                            <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                        </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow" 
                                            onChange={(e)=>this.setPagesize(e, allLoans.result)}
                                            value={this.state.PageSize}
                                            className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                        <TablePagination
                                            totalPages={allLoans.totalPages}
                                            currPage={allLoans.currentPage}
                                            currRecordsCount={allLoans.result.length}
                                            totalRows={allLoans.totalRows}
                                            tempData={allLoans.result}
                                            pagesCountToshow={4}
                                            refreshFunc={this.loadNextPage}
                                        />
                                    </div>
                                </div>
                                <div className="table-helper">
                                    <input type="checkbox" name=""
                                        onChange={(e)=>this.setShowDetails(e, allLoans.result)}
                                        checked={this.state.FullDetails}
                                        id="showFullDetails" />
                                    <label htmlFor="showFullDetails">Show full details</label>
                                </div>
                                

                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Account Number</th>
                                            <th>Client Name</th>
                                            <th>Product Name</th>
                                            <th>Date Created</th>
                                            <th>Loan Amount</th>
                                            <th>Loan State</th>
                                            <th>Principal Due</th>
                                            <th>Total Paid</th>
                                            <th>Total Due</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allLoans.result.map((eachLoan, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <tr>
                                                            {(eachLoan.loanStateDescription==="Rejected" || eachLoan.loanStateDescription==="Closed Withdrawn" || eachLoan.loanStateDescription==="Closed") && 
                                                                <td><NavLink to={`/customer/${eachLoan.clientKey}/closedaccounts/${eachLoan.encodedKey}`}> {eachLoan.accountNumber}</NavLink></td>
                                                            } 
                                                            {(eachLoan.loanStateDescription!=="Rejected" && eachLoan.loanStateDescription!=="Closed Withdrawn" && eachLoan.loanStateDescription!=="Closed") &&   
                                                                <td><NavLink to={`/customer/${eachLoan.clientKey}/loanaccount/${eachLoan.encodedKey}`}> {eachLoan.accountNumber}</NavLink></td>            
                                                            }
                                                            <td><NavLink to={`/customer/${eachLoan.clientKey}`}>{eachLoan.clientName}</NavLink>  </td>
                                                            <td>{eachLoan.productName}</td>
                                                            <td>{eachLoan.dateCreated}</td>
                                                            <td>&#8358;{numberWithCommas(eachLoan.loanAmount, true)}</td>
                                                            <td>{eachLoan.loanStateDescription}</td>
                                                            <td>&#8358;{numberWithCommas(eachLoan.principalDue, true)}</td>
                                                            <td>&#8358;{numberWithCommas(eachLoan.totalPaid, true)}</td>
                                                            <td>&#8358;{numberWithCommas(eachLoan.totalDue, true)}</td>
                                                        </tr>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                    </tbody>
                                </TableComponent>
                                
                            </div>
                        )
                    }else{
                        return(
                            <div className="no-records">
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
                                                <DatePicker
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleStartDatePicker}
                                                    selected={this.state.startDate}
                                                    dateFormat="d MMMM, yyyy"
                                                    peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    placeholderText="Start date"
                                                    maxDate={new Date()}
                                                    // className="form-control form-control-sm h-38px"
                                                    className="form-control form-control-sm "

                                                />
                                                <DatePicker placeholderText="End  date"
                                                    onChangeRaw={this.handleDateChangeRaw}
                                                    onChange={this.handleEndDatePicker}
                                                    selected={this.state.endDate}
                                                    dateFormat="d MMMM, yyyy"
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
                                                />
                                                {/* {errors.startDate && touched.startDate ? (
                                                <span className="invalid-feedback">{errors.startDate}</span>
                                            ) : null} */}
                                            </Form.Group>
                                            <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                        </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow"
                                            value={this.state.PageSize}
                                             className="countdropdown form-control form-control-sm">
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
                                            <th>Account Number</th>
                                            <th>Client Name</th>
                                            <th>Product Name</th>
                                            <th>Loan Amount</th>
                                            <th>Loan State</th>
                                            <th>Principal Due</th>
                                            <th>Total Paid</th>
                                            <th>Total Due</th>
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
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </TableComponent>
                                {/* <div className="footer-with-cta centered">
                                    <NavLink to={'/administration/organization/newbranch'} className="btn btn-primary">New Branch</NavLink>
                                </div> */}
                            </div>
                        )
                    }
                } else {
                    return null;
                }
            case (loanAndDepositsConstants.GET__ARREARS_LOANS_FAILURE):
                return (
                    <div className="loading-content errormsg">
                        <div>{getLoansRequest.request_data.error}</div>
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
                                                <h2>Loans in Arrears</h2>
                                            </div>
                                        </div>
                                    </div>
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
                                                {this.renderLoans()}
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
        getLoansRequest: state.loansReducers.getLoansInArrearsReducer,
    };
}

export default connect(mapStateToProps)(LoansInArrears);