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

import { depositActions } from '../../redux/actions/deposits/deposits.action';
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'
import "./deposittransactions.scss";
class DepositTransactionAccount extends React.Component {
    constructor(props) {
        super(props);
        this.initializeState();
    }

    ////////

    
  initializeState=()=>{
    this.state = {
        user: '',
        PageSize: '10',
        FullDetails: false,
        SearchText:'',
        CurrentPage: 1,
        CurrentSelectedPage: 1
    };
    return this.state;
  }

  componentDidMount(){
    this.retrieveFromApi();
}
// componentDidUpdate(prevProps) {
//   // Typical usage (don't forget to compare props):
//   if (this.props.clientState !== prevProps.clientState) {
//     this.setState(this.initializeState(), function() {
//       this.retrieveFromApi();
//     });
//   }
// }

setPagesize = (event, tempData)=>{
   
    this.setState({PageSize: event.target.value}, function() {
      this.retrieveFromApi(tempData);
    });
    
  
  }


  
loadNextPage = (nextPage, tempData)=>{
  //next Page and tempData are properties of the TablePagination

  this.setState({CurrentPage: nextPage}, function() {
    this.retrieveFromApi(tempData);
  });
 
}


// setShowDetails = (event,tempData)=>{

//   let showDetails = event.target.checked;
//   this.setState({FullDetails: showDetails}, function() {
//     this.retrieveFromApi(tempData);
//   });
// }

retrieveFromApi = (tempData)=>{

    const {dispatch} = this.props;        
  
    let {
      PageSize,
      CurrentPage,
      startDate,
      endDate,
      FullDetails,
      SearchText,
      CurrentSelectedPage
    } = this.state;
    
    let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
    
    if(this.props.match.params.accountEncodedKey===undefined)
    {
        if (tempData) {
            dispatch(depositActions.getDepositTransaction(params, tempData));
          } else {
            dispatch(depositActions.getDepositTransaction(params));
          }
    }
    else{
        if(tempData){
            dispatch(depositActions.getAccountDepositTransaction(this.props.match.params.accountEncodedKey,params,tempData));
        }else{
            dispatch(depositActions.getAccountDepositTransaction(this.props.match.params.accountEncodedKey,params));
        }
    }
   
}

exportDepositTransactions = () => {
    let {
        PageSize,
        CurrentPage,
        startDate,
        endDate,
        SearchText,
        FullDetails,
        CurrentSelectedPage
      } = this.state;

    if (endDate !== '') {
      endDate = endDate.toISOString();
    }
    if (startDate !== '') {
      startDate = startDate.toISOString();
    }
    let paramters = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&StartDate=${startDate}&endDate=${endDate}&SearchText=${SearchText}`;
    const { dispatch } = this.props;

    dispatch(depositActions.exportDepositTransaction(paramters));
  };


fetchForEmptyState=()=>{
    //This function returns the biew for empty list                                                                                                                                   
     let getAccountDepositTransactionRequest = this.props.getAccountDepositTransactionRequest;

    switch (getAccountDepositTransactionRequest.request_status){
        case (loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_PENDING):
            
    return (<tbody>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </tbody>);
    default: return null;
    }
}

fetchErrorState(){
    let getAccountDepositTransactionRequest = this.props.getAccountDepositTransactionRequest;
    
    switch(getAccountDepositTransactionRequest.request_status){
        case ( loanAndDepositsConstants.GET_CLIENTS_FAILURE):
            return (
                <div className="loading-content errormsg"> 
                    <div>{getAccountDepositTransactionRequest.request_data.error}</div>
                </div>
            );
            default: return null;

    };
    
}


fetchForBusyState(){
   let getAccountDepositTransactionRequest = this.props.getAccountDepositTransactionRequest;
  switch (getAccountDepositTransactionRequest.request_status){
      case (loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_PENDING):

          return (  <div className="loading-content">
               <div className="loading-text">Please wait...</div></div>);
  default: return null;
  }
}

    fetchForDataState=()=> {
     let getAccountDepositTransactionRequest = this.props.getAccountDepositTransactionRequest;
   let allUSerPermissions = [];
   this.userPermissions.map((eachPermission) => {
     allUSerPermissions.push(eachPermission.permissionCode);
   });

    switch(getAccountDepositTransactionRequest.request_status){
    case(loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_SUCCESS):

      let allDeposits = getAccountDepositTransactionRequest.request_data.response.data;
        return (<tbody>{

            allDeposits.result.map((eachDeposit, index) => {
                return (
                    <Fragment key={index}>
                        <tr>
                            <td>{eachDeposit.accountNumber}</td>
                            <td>{eachDeposit.accountHolderName}</td>
                            <td>{eachDeposit.productName}</td>
                            <td>{eachDeposit.depositBalance}</td>
                            <td>{eachDeposit.accountStateDescription}</td>
                            <td>{eachDeposit.dateCreated}</td>
                            <td>{eachDeposit.depositAvailableBalance}</td>
                        </tr>
                    </Fragment>
                )
            })
        }</tbody>);

  
    default: return null;
}
}



fetchPageList() {
   
    let allUSerPermissions = [];
    this.userPermissions.map((eachPermission) => {
      allUSerPermissions.push(eachPermission.permissionCode);
    });

    let getAccountDepositTransactionRequest = this.props.getAccountDepositTransactionRequest;
    let allDeposits = getAccountDepositTransactionRequest.request_data.response.data;

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
            </Form>

            <div className="pagination-wrap">
                <label htmlFor="toshow">Show</label>
                <select id="toshow" 
                    onChange={(e)=>this.setPagesize(e, allDeposits)}
                    value={this.state.PageSize}
                    className="countdropdown form-control form-control-sm">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="200">200</option>
                </select>
               

<TablePagination
                            totalPages={allDeposits?.totalPages??0}
                            currPage={allDeposits?.currentPage??0}
                            currRecordsCount={allDeposits?.result.length??0}
                            totalRows={allDeposits?.totalRows??0}
                            tempData={allDeposits?.result??0}
                            pagesCountToshow={4}
                            refreshFunc={this.loadNextPage}
                        />
            </div>
        </div>
        {/* <div className="table-helper">
            <input type="checkbox" name=""
                onChange={(e)=>this.setShowDetails(e, allDeposits)}
                checked={this.state.FullDetails}
                id="showFullDetails" />
            <label htmlFor="showFullDetails">Show full details</label>
        </div> */}
        

        <TableComponent classnames="striped bordered hover">
            <thead>
                <tr>
                    <th>Account Number</th>
                    <th>Account Holder Name</th>
                    <th>Product</th>
                    <th>Deposit Balance</th>
                    <th>Account State</th>
                    <th>Date Created</th>
                    <th>Deposit Available Balance</th>
                </tr>
            </thead>
       

          {this.fetchForEmptyState()}  
          {this.fetchErrorState()}
          {this.fetchForDataState()}
         

            
        </TableComponent>
        {this.fetchForBusyState()}
    </div>
);
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
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {this.fetchPageList()}
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
        getAccountDepositTransactionRequest: state.depositsReducers.getAccountDepositTransactionReducer,
    };
}

export default connect(mapStateToProps)(DepositTransactionAccount);