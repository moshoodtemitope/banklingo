import * as React from "react";
// import {Router} from "react-router";


import { connect } from 'react-redux';

import "react-datepicker/dist/react-datepicker.css";

import  TableComponent from '../../../shared/elements/table'
import "../customerprofile.scss"; 
import { numberWithCommas, getDateFromISO} from '../../../shared/utils';

export class PersonalInformationSection extends React.Component {
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
    <h6>Personal Information</h6>
    <TableComponent classnames="striped bordered hover">

        <tbody>
            <tr>
                <td>Gender</td>
                <td>{customerDetails.gender}</td>
            </tr>
            <tr>
                <td>Date Of Birth</td>
                <td>{getDateFromISO(customerDetails.dateOfBirth)} </td>
            </tr>
            <tr>
                <td>BVN</td>
                <td>{customerDetails.bvn}</td>
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

export default connect(mapStateToProps)(PersonalInformationSection);