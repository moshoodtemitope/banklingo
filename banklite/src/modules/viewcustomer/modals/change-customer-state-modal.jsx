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


import { clientsActions } from '../../../redux/actions/clients/clients.action';
import { clientsConstants } from '../../../redux/actiontypes/clients/clients.constants';
import Alert from 'react-bootstrap/Alert';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'

class NewTaskModal extends React.Component {
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


    

//   toggleModal = () =>{
//     this.setState({ showModal: !this.state.showModal });
//   }
  
// {
//     newState: 'Approved',
//     newStateUpdate: 'approve',
//     ctaText: 'Approve Client',
//   }

    ///this is the new task modal
    render(){
        const {
            
          newState,
          ctaText,
          newStateUpdate,
        } = this.props.modalData;

        // {
        //     newState: 'Approved',
        //     newStateUpdate: 'approve',
        //     ctaText: 'Approve Client',
        //   }

        let changeClientStateRequest = this.props.changeClientStateReducer;
    
        let changeCustomerStateValidationSchema = Yup.object().shape({
          Comment: Yup.string().min(2, 'Valid comments required'),
        });
        return (
          <Modal
            show={this.props.showModal}
            onHide={this.toggleModal}
            size='lg'
            centered='true'
            dialogClassName='modal-40w withcentered-heading'
            animation={false}
          >
            <Formik
              initialValues={{
                Comment: '',
              }}
              validationSchema={changeCustomerStateValidationSchema}
              onSubmit={(values, { resetForm }) => {
                let changeCustomerStatePayload = {
                  comment: values.Comment,
                  clientEncodedKey: this.clientEncodedKey,
                };
    
                // let changeCustomerStatePayload = `Comment=${values.Comment}&ClientEncodedKey=${this.clientEncodedKey}`;
    
                this.props.handleSubmit(
                  changeCustomerStatePayload,
                  newStateUpdate
                );
              }}
            >
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                resetForm,
                values,
                setFieldValue,
                touched,
                isValid,
                errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit} className=''>
                  <Modal.Header>
                    <Modal.Title>Change Customer State</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group>
                      <Form.Label className='block-level'>Present State</Form.Label>
                      <span className='form-text'>
                        {this.state.customerDetails.clientStateDescription}{' '}
                      </span>
    
                      <Form.Label className='block-level mt-20'>
                        New State
                      </Form.Label>
                      <span className='form-text'>{newState}</span>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className='block-level'>Comments</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows='3'
                        onChange={handleChange}
                        name='Comment'
                        value={values.Comment}
                        className={
                          errors.Comment && touched.Comment
                            ? 'is-invalid form-control form-control-sm'
                            : null
                        }
                      />
                      {errors.Comment && touched.Comment ? (
                        <span className='invalid-feedback'>{errors.Comment}</span>
                      ) : null}
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='light' onClick={this.toggleModal}>
                      Cancel
                    </Button>
                    <Button
                      variant='success'
                      type='submit'
                      disabled={changeClientStateRequest.is_request_processing}
                    >
                      {changeClientStateRequest.is_request_processing
                        ? 'Please wait...'
                        : `${ctaText}`}
                    </Button>
                  </Modal.Footer>
                  <div className='footer-alert'>
                    {changeClientStateRequest.request_status ===
                      clientsConstants.CHANGE_CLIENT_STATE_SUCCESS && (
                      <Alert variant='success' className='w-65 mlr-auto'>
                        {
                          changeClientStateRequest.request_data.response.data
                            .message
                        }
                      </Alert>
                    )}
                    {changeClientStateRequest.request_status ===
                      clientsConstants.CHANGE_CLIENT_STATE_FAILURE && (
                      <Alert variant='danger' className='w-65 mlr-auto'>
                        {changeClientStateRequest.request_data.error}
                      </Alert>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
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

export default connect(mapStateToProps)(NewTaskModal);