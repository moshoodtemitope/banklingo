import * as React from "react";
// import {Router} from "react-router";


import { connect } from 'react-redux';

import "react-datepicker/dist/react-datepicker.css";

import  TableComponent from '../../../shared/elements/table'
import "../customerprofile.scss"; 

import { numberWithCommas, getDateFromISO} from '../../../shared/utils';

export class CustomerAccountSummarySection extends React.Component {
    constructor(props) {
        super(props);
       // this.clientEncodedKey = this.props.match.params.id;
        this.state={
           // showModal:false,
        }
        
    }



    componentDidMount() {
        // this.loadInitialCustomerData();
    }


   

  render (){
   let customerLoanAccounts=this.props.customerLoanAccounts;
   let customerDepositAccounts=this.props.customerDepositAccounts;
   
    return (<div className="main-details">
    <TableComponent classnames="striped bordered hover">
        <thead>
            <tr>
                <th>Account Name</th>
                <th>Date Created</th>
                <th>Product</th>
                <th>Type</th>
                <th>State</th>
                <th>Balance</th>
            </tr>
        </thead>
        <tbody>
        {customerLoanAccounts?.result!==null && (customerLoanAccounts.result.length===0) &&
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        }
            {customerLoanAccounts?.result!==null && (customerLoanAccounts.result.length>=1) &&
                customerLoanAccounts.result.map((eachAccount, index)=>{
                    if(eachAccount.loanState===5){
                        return(
                            <tr key={index}>
                                <td>{eachAccount.clientName}</td>
                                <td>{eachAccount.dateCreated}</td>
                                <td>
                                {(eachAccount.productName!==null && eachAccount.productName!=="")?
                                        `${eachAccount.productName} - `:""}
                                {eachAccount.accountNumber}
                                </td>
                                <td>Loan</td>
                                <td>{eachAccount.loanStateDescription}</td>
                                <td>{numberWithCommas(eachAccount.loanAmount, true, true)} {eachAccount.currencyCode} </td>
                            </tr>
                        )
                    }
                })
            }


            {customerDepositAccounts?.result!==null && (customerDepositAccounts?.result?.length>=1) &&
                customerDepositAccounts.result.map((eachAccount, index)=>{
                    if(eachAccount.accountState===5){
                        return(
                            <tr key={index}>
                                <td>{eachAccount.accountHolderName}</td>
                                <td>{eachAccount.dateCreated}</td>
                                <td>
                                {(eachAccount.productName!==null && eachAccount.productName!=="")?
                                        `${eachAccount.productName} - `:""}
                                {eachAccount.accountNumber}
                                </td>
                                <td>Deposit</td>
                                <td>{eachAccount.accountStateDescription}</td>
                                <td>{numberWithCommas(eachAccount.depositBalance, true, true)} {eachAccount.currencyCode}</td>
                            </tr>
                        )
                    }
                })
            }
            
        </tbody>
    </TableComponent>
</div>);
  }
 
}

// function mapStateToProps(state) {
//     return {
//         // getAClientReducer: state.clientsReducers.getAClientReducer,
//         // getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
//         // getClientLoansReducer: state.loansReducers.getClientLoansReducer,
//     };
// }

export default (CustomerAccountSummarySection);