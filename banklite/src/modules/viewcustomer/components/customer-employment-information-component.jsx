import * as React from "react";
// import {Router} from "react-router";


import { connect } from 'react-redux';

import "react-datepicker/dist/react-datepicker.css";

import  TableComponent from '../../../shared/elements/table'
import "../customerprofile.scss"; 

import { numberWithCommas, getDateFromISO} from '../../../shared/utils';

export class EmploymentInformationSection extends React.Component {
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
   let customerDetails=this.props.customerDetails;

   
    return (<div className="each-overview">
    <h6>Employment Information</h6>
    <TableComponent classnames="striped bordered hover">

        <tbody>
            <tr>
                <td>Work Status</td>
                <td>{customerDetails?.employeeInfo?.workStatusDescription}</td>
            </tr>
            <tr>
                <td>Employer Name</td>
                <td>{customerDetails?.employeeInfo?.employerName}</td>
            </tr>
            <tr>
                <td>Employment Date</td>
                <td>{customerDetails?.employeeInfo?.employmentDate ? getDateFromISO(customerDetails?.employeeInfo?.employmentDate) : ""}</td>
            </tr>
            <tr>
                <td>Sector</td>
                <td>{customerDetails?.employeeInfo?.employeeSector}</td>
            </tr>
            <tr>
                <td>Monthly Salary</td>
                <td>{numberWithCommas(customerDetails?.employeeInfo?.monthlySalary, true)}</td>
            </tr>
            <tr>
                <td>Pay Day</td>
                <td>{customerDetails?.employeeInfo?.payDay}</td>
            </tr>
            <tr>
                <td>Official Email</td>
                <td>{customerDetails?.employeeInfo?.officialEmail}</td>
            </tr>
            <tr>
                <td>Employer Address</td>
                <td>{customerDetails?.employeeInfo?.employerAddress}</td>
            </tr>

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

export default (EmploymentInformationSection);