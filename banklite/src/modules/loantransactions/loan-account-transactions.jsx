import * as React from "react";
// import {Router} from "react-router";

import { Fragment } from "react";
import { connect } from 'react-redux';

import InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import TableComponent from '../../shared/elements/table'
import  TablePagination from '../../shared/elements/table/pagination'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { loanActions } from '../../redux/actions/loans/loans.action';
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants'
import "./loantransactions.scss";
class LoanAccountTransactions extends React.Component {
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

    ////////


    
    initializeState=()=>{
        this.state = {
            user: '',
            PageSize: '10',
            FullDetails: false,
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
      const {dispatch} = this.props;
      this.setState({CurrentPage: nextPage}, function() {
        this.retrieveFromApi(tempData);
      });
     
    }
    
    
    setShowDetails = (event,tempData)=>{
      const {dispatch} = this.props;
      let showDetails = event.target.checked;
      this.setState({FullDetails: showDetails}, function() {
        this.retrieveFromApi(tempData);
      });
    }
    
    retrieveFromApi = (tempData)=>{
    
        const {dispatch} = this.props;        
      //  let  {PageSize,FullDetails, CurrentPage, CurrentSelectedPage} = this.state;
        let {
          PageSize,
          CurrentPage,
          startDate,
          endDate,
          FullDetails,
          CurrentSelectedPage
        } = this.state;
        
        let params = `FullDetails=${FullDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&StartDate=${startDate}&endDate=${endDate}`;
        if(this.props.match.params.accountEncodedKey===undefined)
        {
            if (tempData) {
                dispatch(loanActions.getLoanTransactions(params, tempData));
              } else {
                dispatch(loanActions.getLoanTransactions(params));
              }
        }
        else{
        if(tempData){
            dispatch(loanActions.getAccountLoanTransaction(this.props.match.params.accountEncodedKey,params,tempData));
        }else{
            dispatch(loanActions.getAccountLoanTransaction(this.props.match.params.accountEncodedKey,params));
        }
    }
        
    }
    
    

    
fetchForEmptyState=()=>{
    //This function returns the biew for empty list                                                                                                                                   
     let getAccountLoanTransactionRequest = this.props.getAccountLoanTransactionRequest;

    switch (getAccountLoanTransactionRequest.request_status){
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
    let getAccountLoanTransactionRequest = this.props.getAccountLoanTransactionRequest;
    
    switch(getAccountLoanTransactionRequest.request_status){
        case ( loanAndDepositsConstants.GET_CLIENTS_FAILURE):
            return (
                <div className="loading-content errormsg"> 
                    <div>{getAccountLoanTransactionRequest.request_data.error}</div>
                </div>
            );
            default: return null;

    };
    
}


fetchForBusyState(){
   let getAccountLoanTransactionRequest = this.props.getAccountLoanTransactionRequest;
  switch (getAccountLoanTransactionRequest.request_status){
      case (loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_PENDING):

          return (  <div className="loading-content">
               <div className="loading-text">Please wait...</div></div>);
  default: return null;
  }
}

    fetchForDataState=()=> {
     let getAccountLoanTransactionRequest = this.props.getAccountLoanTransactionRequest;
   let allUSerPermissions = [];
   this.userPermissions.map((eachPermission) => {
     allUSerPermissions.push(eachPermission.permissionCode);
   });

    switch(getAccountLoanTransactionRequest.request_status){
    case(loanAndDepositsConstants.GET_ACCOUNTDEPOSIT_TRANSACTION_SUCCESS):

      let allLoanTransactions = getAccountLoanTransactionRequest.request_data.response.data;
        return (<tbody>{
                                            allLoanTransactions.result.map((eachTransactions, index) => {
                                                return (
                                                    <Fragment key={index}>
                                                        <tr>
                                                            <td>{eachTransactions.loanAccountNumber}</td>
                                                            <td>{eachTransactions.accountHolderName}</td>
                                                            <td>{eachTransactions.typeDescription}</td>
                                                            <td>{eachTransactions.transactionAmount}</td>
                                                            <td>{eachTransactions.userName}</td>
                                                            <td>{eachTransactions.transactionDate}</td>
                                                            <td>{eachTransactions.entryDate}</td>
                                                        </tr>
                                                    </Fragment>
                                                )
                                            })
                                        }
        </tbody>);

  
    default: return null;
}
}




fetchPageList() {
   
    let allUSerPermissions = [];
    this.userPermissions.map((eachPermission) => {
      allUSerPermissions.push(eachPermission.permissionCode);
    });

    let getAccountLoanTransactionRequest = this.props.getAccountLoanTransactionRequest;
    let allLoanTransactions = getAccountLoanTransactionRequest.request_data.response.data;

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
                                            onChange={(e)=>this.setPagesize(e, allLoanTransactions)}
                                            value={this.state.PageSize}
                                            className="countdropdown form-control form-control-sm">
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="200">200</option>
                                        </select>
                                        <TablePagination
                                            totalPages={allLoanTransactions.totalPages}
                                            currPage={allLoanTransactions.currentPage}
                                            currRecordsCount={allLoanTransactions.result.length}
                                            totalRows={allLoanTransactions.totalRows}
                                            tempData={allLoanTransactions.result}
                                            pagesCountToshow={4}
                                            refreshFunc={this.loadNextPage}
                                        />
                                    </div>
                                </div>
                                <div className="table-helper">
                                    <input type="checkbox" name=""
                                        onChange={(e)=>this.setShowDetails(e, allLoanTransactions)}
                                        checked={this.state.FullDetails}
                                        id="showFullDetails" />
                                    <label htmlFor="showFullDetails">Show full details</label>
                                </div>
                                

                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Loan Account Number</th>
                                            <th>Account Holder Name</th>
                                            <th>Transaction Type</th>
                                            <th>Transaction Amount</th>
                                            <th>Username</th>
                                            <th>Transaction Date</th>
                                            <th>Entry Date</th>
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

  
    ////////

    // componentDidMount() {
    //     this.loadInitialData();
    // }

    // loadInitialData = () => {
    //     let { PageSize, CurrentPage } = this.state;
    //     let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
    //     this.getAccountLoanTransaction(params);
    // }

    // getAccountLoanTransaction = (paramters) => {
    //     const { dispatch } = this.props;

    //     dispatch(loanActions.getAccountLoanTransaction(this.props.match.params.accountEncodedKey,paramters));
    // }

    // setPagesize = (PageSize,tempData) => {
    //     // console.log('----here', PageSize.target.value);
    //     const {dispatch} = this.props;
    //     let sizeOfPage = PageSize.target.value,
    //         { FullDetails, CurrentPage, CurrentSelectedPage, endDate, startDate } = this.state;

    //     this.setState({ PageSize: sizeOfPage });

    //     let params = `FullDetails=${FullDetails}&PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}&StartDate=${startDate}&endDate=${endDate}`;

    //     if(tempData){
            
    //         dispatch(loanActions.getAccountLoanTransaction(this.props.match.params.accountEncodedKey,params,tempData));
    //     }else{
    //         dispatch(loanActions.getAccountLoanTransaction(this.props.match.params.accountEncodedKey,params));
    //     }
    //     // this.getAccountLoanTransaction(this.props.match.params.accountEncodedKey,params);
    // }

    // setShowDetails = (FullDetails, tempData) => {
    //     const {dispatch} = this.props;
    //     let showDetails = FullDetails.target.checked,
    //         { CurrentPage, CurrentSelectedPage, PageSize, endDate, startDate } = this.state;

    //     this.setState({ FullDetails: showDetails });

    //     let params = `FullDetails=${showDetails}&PageSize=${PageSize}&CurrentPage=${CurrentPage}&CurrentSelectedPage=${CurrentSelectedPage}`;
        
    //     if(tempData){
            
    //         dispatch(loanActions.getAccountLoanTransaction(this.props.match.params.accountEncodedKey,params,tempData));
    //     }else{
    //         dispatch(loanActions.getAccountLoanTransaction(this.props.match.params.accountEncodedKey,params));
    //     }

    //     // this.getAccountLoanTransaction(params);
        
    // }

    // renderLoanAccountTransactions = () => {
    //     let getAccountLoanTransactionRequest = this.props.getAccountLoanTransactionRequest;

    //     let saveRequestData= getAccountLoanTransactionRequest.request_data!==undefined?getAccountLoanTransactionRequest.request_data.tempData:null;
    //     switch (getAccountLoanTransactionRequest.request_status) {
    //         case (loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_PENDING):
    //             if((saveRequestData===undefined) || (saveRequestData!==undefined && saveRequestData.length<1)){
    //                 return (
    //                     <div className="loading-content">
    //                         <div className="heading-with-cta">
    //                             <Form className="one-liner">

    //                                 <Form.Group controlId="filterDropdown" className="no-margins pr-10">
    //                                     <Form.Control as="select" size="sm">
    //                                         <option>No Filter</option>
    //                                         <option>Add New Filter</option>
    //                                         <option>Custom Filter</option>
    //                                     </Form.Control>
    //                                 </Form.Group>
    //                                 <Button className="no-margins" variant="primary" type="submit">Filter</Button>
    //                             </Form>

    //                             <div className="pagination-wrap">
    //                                 <label htmlFor="toshow">Show</label>
    //                                 <select id="toshow" className="countdropdown form-control form-control-sm">
    //                                     <option value="10">10</option>
    //                                     <option value="25">25</option>
    //                                     <option value="50">50</option>
    //                                     <option value="200">200</option>
    //                                 </select>
    //                             </div>
    //                         </div>
    //                         <TableComponent classnames="striped bordered hover">
    //                             <thead>
    //                                 <tr>
    //                                     <th>Loan Account Number</th>
    //                                     <th>Account Holder Name</th>
    //                                     <th>Transaction Type</th>
    //                                     <th>Transaction Amount</th>
    //                                     <th>Username</th>
    //                                     <th>Transaction Date</th>
    //                                     <th>Entry Date</th>
    //                                 </tr>
    //                             </thead>
    //                             <tbody>
    //                                 <tr>
    //                                     <td></td>
    //                                     <td></td>
    //                                     <td></td>
    //                                     <td></td>
    //                                     <td></td>
    //                                     <td></td>
    //                                     <td></td>
    //                                 </tr>
    //                             </tbody>
    //                         </TableComponent>
    //                         <div className="loading-text">Please wait... </div>
    //                     </div>
    //                 )
    //             }else{
    //                 return (
    //                     <div>
    //                         <div className="heading-with-cta">
    //                             <Form className="one-liner">

    //                                 <Form.Group controlId="filterDropdown" className="no-margins pr-10">
    //                                     <Form.Control as="select" size="sm">
    //                                         <option>No Filter</option>
    //                                         <option>Add New Filter</option>
    //                                         <option>Custom Filter</option>
    //                                     </Form.Control>
    //                                 </Form.Group>
    //                                 <Button className="no-margins" variant="primary" type="submit">Filter</Button>
    //                             </Form>

    //                             <div className="pagination-wrap">
    //                                 <label htmlFor="toshow">Show</label>
    //                                 <select id="toshow" 
                                        
    //                                     value={this.state.PageSize}
    //                                     className="countdropdown form-control form-control-sm">
    //                                     <option value="10">10</option>
    //                                     <option value="25">25</option>
    //                                     <option value="50">50</option>
    //                                     <option value="200">200</option>
    //                                 </select>
    //                             </div>
    //                         </div>
                            
                            

    //                         <TableComponent classnames="striped bordered hover">
    //                             <thead>
    //                                 <tr>
    //                                     <th>Loan Account Number</th>
    //                                     <th>Account Holder Name</th>
    //                                     <th>Transaction Type</th>
    //                                     <th>Transaction Amount</th>
    //                                     <th>Username</th>
    //                                     <th>Transaction Date</th>
    //                                     <th>Entry Date</th>
    //                                 </tr>
    //                             </thead>
    //                             <tbody>
    //                                 {
    //                                     saveRequestData.result.map((eachTransactions, index) => {
    //                                         return (
    //                                             <Fragment key={index}>
    //                                                 <tr>
    //                                                     <td>{eachTransactions.loanAccountNumber}</td>
    //                                                     <td>{eachTransactions.accountHolderName}</td>
    //                                                     <td>{eachTransactions.typeDescription}</td>
    //                                                     <td>{eachTransactions.transactionAmount}</td>
    //                                                     <td>{eachTransactions.userName}</td>
    //                                                     <td>{eachTransactions.transactionDate}</td>
    //                                                     <td>{eachTransactions.entryDate}</td>
    //                                                 </tr>
    //                                             </Fragment>
    //                                         )
    //                                     })
    //                                 }
    //                             </tbody>
    //                         </TableComponent>
    //                         {/* <div className="footer-with-cta toleft">
    //                             <NavLink to={'/administration/organization/newbranch'} className="btn btn-primary">New Branch</NavLink>
    //                         </div> */}
    //                     </div>
    //                 )
    //             }

    //         case (loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_SUCCESS):
    //             let allLoanTransactions = getAccountLoanTransactionRequest.request_data.response.data;
    //             if (allLoanTransactions !== undefined) {
    //                 if (allLoanTransactions.result.length >= 1) {
    //                     return (
    //                         <div>
    //                             <div className="heading-with-cta">
    //                                 <Form className="one-liner">

    //                                     <Form.Group controlId="filterDropdown" className="no-margins pr-10">
    //                                         <Form.Control as="select" size="sm">
    //                                             <option>No Filter</option>
    //                                             <option>Add New Filter</option>
    //                                             <option>Custom Filter</option>
    //                                         </Form.Control>
    //                                     </Form.Group>
    //                                     <Button className="no-margins" variant="primary" type="submit">Filter</Button>
    //                                 </Form>

    //                                 <div className="pagination-wrap">
    //                                     <label htmlFor="toshow">Show</label>
    //                                     <select id="toshow" 
    //                                         onChange={(e)=>this.setPagesize(e, allLoanTransactions)}
    //                                         value={this.state.PageSize}
    //                                         className="countdropdown form-control form-control-sm">
    //                                         <option value="10">10</option>
    //                                         <option value="25">25</option>
    //                                         <option value="50">50</option>
    //                                         <option value="200">200</option>
    //                                     </select>
    //                                     <TablePagination
    //                                         totalPages={allLoanTransactions.totalPages}
    //                                         currPage={allLoanTransactions.currentPage}
    //                                         currRecordsCount={allLoanTransactions.result.length}
    //                                         totalRows={allLoanTransactions.totalRows}
    //                                         tempData={allLoanTransactions.result}
    //                                         pagesCountToshow={4}
    //                                         refreshFunc={this.loadNextPage}
    //                                     />
    //                                 </div>
    //                             </div>
    //                             <div className="table-helper">
    //                                 <input type="checkbox" name=""
    //                                     onChange={(e)=>this.setShowDetails(e, allLoanTransactions)}
    //                                     checked={this.state.FullDetails}
    //                                     id="showFullDetails" />
    //                                 <label htmlFor="showFullDetails">Show full details</label>
    //                             </div>
                                

    //                             <TableComponent classnames="striped bordered hover">
    //                                 <thead>
    //                                     <tr>
    //                                         <th>Loan Account Number</th>
    //                                         <th>Account Holder Name</th>
    //                                         <th>Transaction Type</th>
    //                                         <th>Transaction Amount</th>
    //                                         <th>Username</th>
    //                                         <th>Transaction Date</th>
    //                                         <th>Entry Date</th>
    //                                     </tr>
    //                                 </thead>
    //                                 <tbody>
    //                                     {
    //                                         allLoanTransactions.result.map((eachTransactions, index) => {
    //                                             return (
    //                                                 <Fragment key={index}>
    //                                                     <tr>
    //                                                         <td>{eachTransactions.loanAccountNumber}</td>
    //                                                         <td>{eachTransactions.accountHolderName}</td>
    //                                                         <td>{eachTransactions.typeDescription}</td>
    //                                                         <td>{eachTransactions.transactionAmount}</td>
    //                                                         <td>{eachTransactions.userName}</td>
    //                                                         <td>{eachTransactions.transactionDate}</td>
    //                                                         <td>{eachTransactions.entryDate}</td>
    //                                                     </tr>
    //                                                 </Fragment>
    //                                             )
    //                                         })
    //                                     }
    //                                 </tbody>
    //                             </TableComponent>
    //                             {/* <div className="footer-with-cta toleft">
    //                                 <NavLink to={'/administration/organization/newbranch'} className="btn btn-primary">New Branch</NavLink>
    //                             </div> */}
    //                         </div>
    //                     )
    //                 }else{
    //                     return(
    //                         <div className="no-records">
    //                             <div className="heading-with-cta">
    //                                 <Form className="one-liner">

    //                                     <Form.Group controlId="filterDropdown" className="no-margins pr-10">
    //                                         <Form.Control as="select" size="sm">
    //                                             <option>No Filter</option>
    //                                             <option>Add New Filter</option>
    //                                             <option>Custom Filter</option>
    //                                         </Form.Control>
    //                                     </Form.Group>
    //                                     <Button className="no-margins" variant="primary" type="submit">Filter</Button>
    //                                 </Form>

    //                                 <div className="pagination-wrap">
    //                                     <label htmlFor="toshow">Show</label>
    //                                     <select id="toshow" className="countdropdown form-control form-control-sm">
    //                                         <option value="10">10</option>
    //                                         <option value="25">25</option>
    //                                         <option value="50">50</option>
    //                                         <option value="200">200</option>
    //                                     </select>
    //                                 </div>
    //                             </div>
    //                             <TableComponent classnames="striped bordered hover">
    //                                 <thead>
    //                                     <tr>
    //                                         <th>Loan Account Number</th>
    //                                         <th>Account Holder Name</th>
    //                                         <th>Transaction Type</th>
    //                                         <th>Transaction Amount</th>
    //                                         <th>Username</th>
    //                                         <th>Transaction Date</th>
    //                                         <th>Entry Date</th>
    //                                     </tr>
    //                                 </thead>
    //                                 <tbody>
    //                                     <tr>
    //                                         <td></td>
    //                                         <td></td>
    //                                         <td></td>
    //                                         <td></td>
    //                                         <td></td>
    //                                         <td></td>
    //                                         <td></td>
    //                                     </tr>
    //                                 </tbody>
    //                             </TableComponent>
    //                             {/* <div className="footer-with-cta centered">
    //                                 <NavLink to={'/administration/organization/newbranch'} className="btn btn-primary">New Branch</NavLink>
    //                             </div> */}
    //                         </div>
    //                     )
    //                 }
    //             } else {
    //                 return null;
    //             }
    //         case (loanAndDepositsConstants.GET_ACCOUNTLOAN_TRANSACTIONS_FAILURE):
    //             return (
    //                 <div className="loading-content errormsg">
    //                     <div>{getAccountLoanTransactionRequest.request_data.error}</div>
    //                 </div>
    //             )
    //         default:
    //             return null;
    //     }
    // }




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
                                                <h2>Loan Account Transactions</h2>
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
                                                {this.fetchForDataState()}
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
        getAccountLoanTransactionRequest: state.loansReducers.getAccountLoanTransactionReducer,
    };
}

export default connect(mapStateToProps)(LoanAccountTransactions);