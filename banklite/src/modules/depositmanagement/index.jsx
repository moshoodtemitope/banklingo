import * as React from "react";
// import {Router} from "react-router";

import { Fragment } from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DatePicker from "react-datepicker";
import { numberWithCommas, getDateFromISO} from '../../shared/utils';
import { depositActions } from '../../redux/actions/deposits/deposits.action';
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'
import "./depositmanagement.scss";
class DepositManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            PageSize: '10',
            FullDetails: false,
            CurrentPage: 1,
            CurrentSelectedPage: 1
        }


    }

    componentDidMount() {
        this.loadInitialData();
    }

    loadInitialData = () => {
        let { PageSize, CurrentPage } = this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
        this.getDeposits(params);
    }

    getDeposits = (paramters) => {
        const { dispatch } = this.props;

        dispatch(depositActions.getDeposits(paramters));
    }

    setPagesize = (PageSize, tempData) => {
        const {dispatch} = this.props;
        let sizeOfPage = PageSize.target.value,
            { FullDetails, CurrentPage, CurrentSelectedPage } = this.state;

        this.setState({ PageSize: sizeOfPage });

        
        
        let params = `FullDetails=${FullDetails}&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;

        if(tempData){
            dispatch(depositActions.getDeposits(params, tempData));
        }else{
            dispatch(depositActions.getDeposits(params));
        }
    }

    handleDateChangeRaw = (e) => {
        e.preventDefault();
    }
    handleStartDatePicker = (startDate) => {
        startDate.setHours(startDate.getHours() + 1);
        
        this.setState({ startDate }, ()=>{
            if(this.state.endDate!==""){
                this.getHistory();
            }
        });
    }

    handleEndDatePicker = (endDate) => {
        endDate.setHours(endDate.getHours() + 1);
       
        this.setState({ endDate }, ()=>{
                if(this.state.startDate!==""){
                    this.getHistory();
                }
        });
    }

    loadNextPage = (nextPage, tempData)=>{
        
        const {dispatch} = this.props;
        let {PageSize,CurrentPage,FullDetails} = this.state;

        // this.setState({PageSize: sizeOfPage});

        // let params= `PageSize=${this.state.PageSize}&CurrentPage=${nextPage}`;
        // this.getTransactionChannels(params);
        let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${nextPage}`;

        if(tempData){
            dispatch(depositActions.getDeposits(params, tempData));
        }else{
            dispatch(depositActions.getDeposits(params));
        }
    }

    setShowDetails = (FullDetails, tempData) => {
        const {dispatch} = this.props;
        let showDetails = FullDetails.target.checked,
            { CurrentPage, CurrentSelectedPage, PageSize } = this.state;

        this.setState({ FullDetails: showDetails });

        
        
        let params = `FullDetails=${showDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;

        if(tempData){
            dispatch(depositActions.getDeposits(params, tempData));
        }else{
            dispatch(depositActions.getDeposits(params));
        }
    }

    renderDeposits = () => {
        let getDepositsRequest = this.props.getDepositsRequest;

        let saveRequestData= getDepositsRequest.request_data!==undefined?getDepositsRequest.request_data.tempData:null;
        switch (getDepositsRequest.request_status) {
            case (loanAndDepositsConstants.GET_DEPOSITS_PENDING):
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
                                        <th>Account Number</th>
                                        <th>Account Holder Name</th>
                                        <th>Product</th>
                                        <th>Product Type</th>
                                        <th>Deposit Balance</th>
                                        <th>Account State</th>
                                        <th>Date Created</th>
                                        <th>Deposit Available Balance</th>
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
                                    <Button className="no-margins" variant="primary" type="submit">Filter</Button>
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
                                                    placeholder="Search"
                                            />
                                            {/* {errors.startDate && touched.startDate ? (
                                                <span className="invalid-feedback">{errors.startDate}</span>
                                            ) : null} */}
                                        </Form.Group>
                                </Form>

                                <div className="pagination-wrap">
                                    <label htmlFor="toshow">Show</label>
                                    <select id="toshow"
                                        className="countdropdown form-control form-control-sm"
                                        
                                        value={this.state.PageSize}>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="200">200</option>
                                    </select>
                                    
                                    />
                                </div>
                            </div>
                            <div className="table-helper">
                                <input type="checkbox" name=""
                                    
                                    checked={this.state.FullDetails}
                                    id="showFullDetails" />
                                <label htmlFor="showFullDetails">Show full details</label>
                            </div>
                            <div className="loading-text">Please wait... </div>

                            <TableComponent classnames="striped bordered hover">
                                <thead>
                                    <tr>
                                        <th>Account Number</th>
                                        <th>Account Holder Name</th>
                                        <th>Product</th>
                                        <th>Product Type</th>
                                        <th>Deposit Balance</th>
                                        <th>Account State</th>
                                        <th>Date Created</th>
                                        <th>Deposit Available Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        saveRequestData.map((eachDeposit, index) => {
                                            return (
                                                <Fragment key={index}>
                                                    <tr>
                                                        <td><NavLink to={`/customer/${eachDeposit.clientEncodedKey}/savingsaccount/${eachDeposit.encodedKey}`}> {eachDeposit.accountNumber} </NavLink> </td>
                                                        <td><NavLink to={`/customer/${eachDeposit.clientEncodedKey}`}>{eachDeposit.accountHolderName}</NavLink>  </td>
                                                        <td>{eachDeposit.productName}</td>
                                                        <td>{eachDeposit.productTypeDescription}</td>
                                                        <td>&#8358;{numberWithCommas(eachDeposit.depositBalance, true)}</td>
                                                        <td>{eachDeposit.accountStateDescription}</td>
                                                        <td>{eachDeposit.dateCreated}</td>
                                                        <td>&#8358;{numberWithCommas(eachDeposit.depositAvailableBalance, true)}</td>
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

            case (loanAndDepositsConstants.GET_DEPOSITS_SUCCESS):
                let allDeposits = getDepositsRequest.request_data.response.data;
                if (allDeposits !== undefined) {
                    if (allDeposits.result.length >= 1) {
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
                                        <Button className="no-margins" variant="primary" type="submit">Filter</Button>
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
                                                    placeholder="Search"
                                            />
                                            {/* {errors.startDate && touched.startDate ? (
                                                <span className="invalid-feedback">{errors.startDate}</span>
                                            ) : null} */}
                                        </Form.Group>
                                    </Form>

                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow" 
                                            className="countdropdown form-control form-control-sm"
                                            onChange={(e)=>this.setPagesize(e,allDeposits.result)}
                                            value={this.state.PageSize}>
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                        <TablePagination
                                            totalPages={allDeposits.totalPages}
                                            currPage={allDeposits.currentPage}
                                            currRecordsCount={allDeposits.result.length}
                                            totalRows={allDeposits.totalRows}
                                            tempData={allDeposits.result}
                                            pagesCountToshow={4}
                                            refreshFunc={this.loadNextPage}
                                        />
                                    </div>
                                </div>
                                <div className="table-helper">
                                    <input type="checkbox" name=""
                                        onChange={(e)=>this.setShowDetails(e, allDeposits.result)}
                                        checked={this.state.FullDetails}
                                        id="showFullDetails" />
                                    <label htmlFor="showFullDetails">Show full details</label>
                                </div>
                                

                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Account Number</th>
                                            <th>Account Holder Name</th>
                                            <th>Product</th>
                                            <th>Product Type</th>
                                            <th>Deposit Balance</th>
                                            <th>Account State</th>
                                            <th>Date Created</th>
                                            <th>Deposit Available Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allDeposits.result.map((eachDeposit, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <tr>
                                                            <td><NavLink to={`/customer/${eachDeposit.clientEncodedKey}/savingsaccount/${eachDeposit.encodedKey}`}> {eachDeposit.accountNumber} </NavLink></td>
                                                            <td><NavLink to={`/customer/${eachDeposit.clientEncodedKey}`}>{eachDeposit.accountHolderName}</NavLink>  </td>
                                                            <td>{eachDeposit.productName}</td>
                                                            <td>{eachDeposit.productTypeDescription}</td>
                                                            <td>&#8358;{numberWithCommas(eachDeposit.depositBalance, true)}</td>
                                                            <td>{eachDeposit.accountStateDescription}</td>
                                                            <td>{eachDeposit.dateCreated}</td>
                                                            <td>&#8358;{numberWithCommas(eachDeposit.depositAvailableBalance, true)}</td>
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
                                        <Button className="no-margins" variant="primary" type="submit">Filter</Button>
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
                                                    placeholder="Search"
                                            />
                                            {/* {errors.startDate && touched.startDate ? (
                                                <span className="invalid-feedback">{errors.startDate}</span>
                                            ) : null} */}
                                        </Form.Group>
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
                                            <th>Account Number</th>
                                            <th>Account Holder Name</th>
                                            <th>Product</th>
                                            <th>Product Type</th>
                                            <th>Deposit Balance</th>
                                            <th>Account State</th>
                                            <th>Date Created</th>
                                            <th>Deposit Available Balance</th>
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
            case (loanAndDepositsConstants.GET_DEPOSITS_FAILURE):
                return (
                    <div className="loading-content errormsg">
                        <div>{getDepositsRequest.request_data.error}</div>
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
                                                <h2>Deposit Accounts</h2>
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
                                                {this.renderDeposits()}
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
        getDepositsRequest: state.depositsReducers.getDepositsReducer,
    };
}

export default connect(mapStateToProps)(DepositManagement);