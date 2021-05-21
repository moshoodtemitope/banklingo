import * as React from "react";
// import {Router} from "react-router";


import { connect } from 'react-redux';

import "react-datepicker/dist/react-datepicker.css";

import  TableComponent from '../../../shared/elements/table'
import "../customerprofile.scss"; 
import { ClientClassificationConstants } from "../../../redux/actions/clients/client-states-constants";


export class GeneralInfomationSection extends React.Component {
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

   let customerTypeVal = this.props.customerTypeVal;
   //this.state.user.custTypes.filter(eachType=>eachType.id===customerDetails.clientTypeId)[0];
                   
    return (<div className="each-overview">
    <h6>General Information</h6>
    <TableComponent classnames="striped hover">

        <tbody>
            {customerDetails.clientCode &&
                <tr>
                    <td>Customer ID</td>
                    <td>{customerDetails?.clientCode}</td>
                </tr>
            }
            {customerDetails.branchName &&
                <tr>
                    <td>Assigned Branch</td>
                    <td>{customerDetails?.branchName}</td>
                </tr>
            }
            {customerDetails.accountOfficer &&
                <tr>
                    <td>Assigned Account Officer</td>
                    <td>{customerDetails?.accountOfficer}</td>
                </tr>
            }
            {customerTypeVal && customerTypeVal.name &&
                <tr>
                    <td>Customer Type</td>
                    <td>{customerTypeVal?.name}</td>
                </tr>
            }
            {customerDetails.createdDate &&
                <tr>
                    <td>Created</td>
                    <td>{customerDetails?.createdDate}</td>
                </tr>
            }
            {customerDetails.lastUpdated &&
                <tr>
                    <td>Last modified</td>
                    <td>{customerDetails?.lastUpdated}</td>
                </tr>
            }
            {customerDetails.clientStateDescription &&
                <tr>
                    <td>Customer State</td>
                    <td>{customerDetails?.clientStateDescription}</td>
                </tr>
            }

{(customerDetails.clientClassification===ClientClassificationConstants.GROUP) &&
                <tr>
                    <td>Registration Number</td>
                    <td>{customerDetails?.businessNumber??"Not Specified"}</td>
                </tr>
            }

            
{(customerDetails.clientClassification===ClientClassificationConstants.GROUP) &&
                <tr>
                    <td>Tax Id</td>
                    <td>{customerDetails?.taxId??"Not Specified"}</td>
                </tr>
            }

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

export default connect(mapStateToProps)(GeneralInfomationSection);