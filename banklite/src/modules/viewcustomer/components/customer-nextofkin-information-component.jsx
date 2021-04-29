import * as React from "react";
// import {Router} from "react-router";


import { connect } from 'react-redux';

import "react-datepicker/dist/react-datepicker.css";

import  TableComponent from '../../../shared/elements/table'
import "../customerprofile.scss"; 


export class NextOfKinInfomationSection extends React.Component {
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
    <h6>Next of Kin</h6>
    <TableComponent classnames="striped bordered hover">

        <tbody>
            <tr>
                <td>Name</td>
                <td>{customerDetails.nextOfKin.nextOfKinFullName}</td>
            </tr>
            <tr>
                <td>Phone number</td>
                <td>{customerDetails.nextOfKin.nextOfKinMobileNumber}</td>
            </tr>
            <tr>
                <td>Relationship</td>
                <td>{customerDetails.nextOfKin.relationship}</td>
            </tr>
            <tr>
                <td>Home address</td>
                <td>{customerDetails.nextOfKin.nextofKinHomeAddress}</td>
            </tr>
        </tbody>
    </TableComponent>
</div>);
  }
 
}

function mapStateToProps(state) {
    return {
        // getAClientReducer: state.clientsReducers.getAClientReducer,
        // getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        // getClientLoansReducer: state.loansReducers.getClientLoansReducer,
    };
}

export default connect(mapStateToProps)(NextOfKinInfomationSection);