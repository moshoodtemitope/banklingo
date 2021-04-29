import * as React from "react";
// import {Router} from "react-router";


import { connect } from 'react-redux';

import "react-datepicker/dist/react-datepicker.css";

import  TableComponent from '../../../shared/elements/table'
import "../customerprofile.scss"; 


export class ContactInformationSection extends React.Component {
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
    <h6>Contact</h6>
    <TableComponent classnames="striped bordered hover">

        <tbody>
            <tr>
                <td>Mobile</td>
                <td>{customerDetails?.contact?.contactMobile}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>{customerDetails?.contact?.contactEmail}</td>
            </tr>
            <tr>
                <td>Address</td>
                <td>{customerDetails?.address?.addressLine1},{customerDetails?.address?.addressState},{customerDetails?.address?.addressCountry}</td>
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

export default (ContactInformationSection);