import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import  TableComponent from '../../../shared/elements/table'
import "../customerprofile.scss"; 


// import { clientsActions } from '../../../redux/actions/clients/clients.action';
// import { clientsConstants } from '../../redux/actiontypes/clients/clients.constants';
import Alert from 'react-bootstrap/Alert';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'

class ChangeNotificationModal extends React.Component {
    constructor(props) {
        super(props);
       // this.clientEncodedKey = this.props.match.params.id;
        this.state={
            showModal:false,
        }
        
    }



    componentDidMount() {
        // this.loadInitialCustomerData();
    }


   
  toggleModal = () =>{
    this.setState({ showModal: !this.state.showModal });
  }  

  render (){
    const { showModal } = this.state;


    return (
      <Modal
      
      
      show={this.props.showModal}
      onHide={this.toggleModal}
        size='lg'
        centered='true'
        dialogClassName='modal-40w withcentered-heading'
        animation={false}
      >
        <Modal.Header>
          <Modal.Title>Notification Requests</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className='checkbox-wrap'>
              <input type='checkbox' name='' id='pick-2' disabled checked />
              <label htmlFor='pick-2'>Loan Account Rejection (Email)</label>
            </div>
            <div className='checkbox-wrap'>
              <input type='checkbox' name='' id='pick-3' disabled checked />
              <label htmlFor='pick-3'>Account In Arrears (SMS)</label>
            </div>
            <div className='checkbox-wrap'>
              <input type='checkbox' name='' id='pick-4' disabled checked />
              <label htmlFor='pick-4'>Loan Account Refinanced (Web Hook)</label>
            </div>
            <div className='checkbox-wrap'>
              <input type='checkbox' name='' id='pick-5' checked />
              <label htmlFor='pick-5'>Loan Disbursement (Web Hook)</label>
            </div>
            <div className='checkbox-wrap'>
              <input type='checkbox' name='' id='pick-6' checked />
              <label htmlFor='pick-6'>Loan Account Created (SMS)</label>
            </div>
            <div className='checkbox-wrap'>
              <input type='checkbox' name='' id='pick-7' checked disabled />
              <label htmlFor='pick-7'>Unpaid Repayment Due (Email)</label>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='light' onClick={this.toggleSetNotificationModal}>
            Cancel
          </Button>
          <Button variant='secondary'>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    );
  }
 
}

function mapStateToProps(state) {
    return {
        // getAClientReducer: state.clientsReducers.getAClientReducer,
        // getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        // getClientLoansReducer: state.loansReducers.getClientLoansReducer,
    };
}

export default connect(mapStateToProps)(ChangeNotificationModal);