import * as React from "react";
// import {Router} from "react-router";

import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import "react-datepicker/dist/react-datepicker.css";

import  TableComponent from '../../../shared/elements/table'
import "../customerprofile.scss"; 

import { numberWithCommas, getDateFromISO} from '../../../shared/utils';

export class GroupMembersList extends React.Component {
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
   let groupMembers=this.props.groupMembers;
   
      if (groupMembers) {
          return (
              <div className="main-details">
                  <TableComponent classnames="striped bordered hover">
                      <thead>
                          <tr>
                              <th>Group Member</th>
                              <th>Account Number</th>
                              <th>Role</th>
                          </tr>
                      </thead>
                      <tbody>
                          
                          {
                              groupMembers.map((eachMember, index) => {
                                  
                                  return (
                                      <tr key={index}>
                                          <td>
                                                <Link
                                                    to={`/customer/${eachMember.clientEncodedKey}`}
                                                >
                                                    {eachMember.clientMember}
                                                </Link>
                                          </td>
                                          <td>{eachMember.clientCode}</td>
                                          <td>{eachMember.roleId}</td>
                                      </tr>
                                  )
                                  
                              })
                          }

                      </tbody>
                  </TableComponent>
              </div>
          );
      }
  }
 
}

// function mapStateToProps(state) {
//     return {
//         // getAClientReducer: state.clientsReducers.getAClientReducer,
//         // getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
//         // getClientLoansReducer: state.loansReducers.getClientLoansReducer,
//     };
// }

export default (GroupMembersList);