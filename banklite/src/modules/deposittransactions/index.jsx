import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { depositActions } from '../../redux/actions/deposits/deposits.action';
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'
import "./deposittransactions.scss"; 
class DepositTransactions extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize: '30',
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
        this.getDepositTransaction(params);
    }

    getDepositTransaction = (paramters) => {
        const { dispatch } = this.props;

        dispatch(depositActions.getDepositTransaction(paramters));
    }

    setPagesize = (PageSize) => {
        // console.log('----here', PageSize.target.value);
        let sizeOfPage = PageSize.target.value,
            { FullDetails, CurrentPage, CurrentSelectedPage } = this.state;

        this.setState({ PageSize: sizeOfPage });

        let params = `FullDetails=${FullDetails}&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;
        this.getDepositTransaction(params);
    }

    setShowDetails = (FullDetails) => {
        // console.log('----here', PageSize.target.value);
        let showDetails = FullDetails.target.checked,
            { CurrentPage, CurrentSelectedPage, PageSize } = this.state;

        this.setState({ FullDetails: showDetails });

        let params = `FullDetails=${showDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;
        this.getDepositTransaction(params);
    }

    renderDepositTransactions = () => {
        let getDepositTransactionRequest = this.props.getDepositTransactionRequest;
        switch (getDepositTransactionRequest.request_status) {
            case (loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_PENDING):
                return (
                    <div className="loading-content">
                        <TableComponent classnames="striped bordered hover">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Deposit Account Number</th>
                                    <th>Type</th>
                                    <th>Transaction Amount</th>
                                    <th>User Name</th>
                                    <th>Entry Date</th>
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
                                    <td></td>
                                </tr>
                            </tbody>
                        </TableComponent>
                        <div className="loading-text">Please wait... </div>
                    </div>
                )

            case (loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_SUCCESS):
                let allDepositTransactions = getDepositTransactionRequest.request_data.response.data;
                if (allDepositTransactions !== undefined) {
                    if (allDepositTransactions.length >= 1) {
                        return (
                            <div>
                                <div className="table-helper">
                                    <input type="checkbox" name=""
                                        onChange={this.setShowDetails}
                                        checked={this.state.FullDetails}
                                        id="showFullDetails" />
                                    <label htmlFor="showFullDetails">Show full details</label>
                                </div>
                                <div className="heading-with-cta toleft">
                                    <div className="pagination-wrap">
                                        <label htmlFor="toshow">Show</label>
                                        <select id="toshow"
                                            onChange={this.setPagesize}
                                            value={this.state.PageSize}
                                            className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                        {/* <div className="move-page-actions">
                                            <div className="each-page-action">
                                                <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                                            </div>
                                            <div className="each-page-action">
                                                <img alt="go backward" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAAJ0lEQVR42mNgoBj09PT8xyqIIQETRJFAFoRLoAsS1oHXDryuQvcHAJqKQewTJHmSAAAAAElFTkSuQmCC" width="6" height="11" />
                                            </div>
                                            <div className="page-count">
                                                <span>1-{this.state.PageSize}</span>  of <span>{allDepositTransactions.totalRows}</span>
                                            </div>
                                            <div className="each-page-action">
                                                <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" />
                                            </div>
                                            <div className="each-page-action">
                                                <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                                            </div>
                                        </div> */}
                                    </div>
                                </div>

                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Deposit Account Number</th>
                                            <th>Type</th>
                                            <th>Transaction Amount</th>
                                            <th>User Name</th>
                                            <th>Entry Date</th>
                                            <th>Date Created</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            allDepositTransactions.map((eachTransaction, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <tr>
                                                            <td>{eachTransaction.user}</td>
                                                            <td><NavLink to={`/deposit-transactions/${eachTransaction.accountEncodedKey}`}>{eachTransaction.depositAccountNumber}</NavLink> </td>
                                                            <td>{eachTransaction.typeDescription}</td>
                                                            <td>{eachTransaction.transactionAmount}</td>
                                                            <td>{eachTransaction.userName}</td>
                                                            <td>{eachTransaction.entryDate}</td>
                                                            <td>{eachTransaction.dateCreated}</td>
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
                    }else{
                        return(
                            <div className="no-records">
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>User</th>
                                            <th>Deposit Account Number</th>
                                            <th>Type</th>
                                            <th>Transaction Amount</th>
                                            <th>User Name</th>
                                            <th>Entry Date</th>
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
            case (loanAndDepositsConstants.GET_DEPOSIT_TRANSACTION_FAILURE):
                return (
                    <div className="loading-content errormsg">
                        <div>{getDepositTransactionRequest.request_data.error}</div>
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
                                                <h2>Deposit Transactions</h2>
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
                                                {this.renderDepositTransactions()}
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
        getDepositTransactionRequest: state.depositsReducers.getDepositTransactionReducer,
    };
}
export default connect(mapStateToProps)(DepositTransactions);