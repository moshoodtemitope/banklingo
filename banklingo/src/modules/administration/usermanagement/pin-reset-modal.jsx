import * as React from 'react';
// import {Router} from "react-router";

import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-bootstrap/Modal';
import { authActions } from '../../../redux/actions/auth/auth.action';
import { authConstants } from '../../../redux/actiontypes/auth/auth.constants';

import '../administration.scss';


export const PinResetModal =  ({ open, toggleHandler,proceedHandler,requestProcessor,selectedUser }) => {
 

  return (
      <Modal
        show={open}
        onHide={() => {}}
        size='lg'
        centered='true'
        dialogClassName='modal-40w withcentered-heading'
        animation={true}
      >
        <Modal.Header>
          <Modal.Title>PIN Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <div className='text-center '>
              Are you sure you want to reset the PIN for {selectedUser}?
        </div>


          {requestProcessor?.request_status ===
            authConstants.RESET_PIN_FAILURE && (
            <div className='text-center errortxt'>
              {requestProcessor?.request_data?.error}
            </div>
          )}
          {/* {requestProcessor.request_status ===
            authConstants.RESET_PIN_PENDING && (
            <div className='text-center '>
              Resetting PIN for {selectedUser}
            </div>
          )} */}
          {requestProcessor?.request_status ===
            authConstants.RESET_PIN_SUCCESS && (
            <div className='text-center'>
              {requestProcessor?.request_data.response.data.message}
              {/* PIN Reset was successful for {selectedUser} */}
            </div>
          )}
        </Modal.Body>


     
        <Modal.Footer>
            {/* <Button
              variant='success'
              type='button'
              onClick={this.closeModal}
            >
              Okay
            </Button> */}


            <Button variant="light" onClick={toggleHandler}>
                                    Cancel
                                </Button>
                               


                                    <Button
                                        variant="success"
                                        type="submit"
                                        onClick={proceedHandler}
                                        disabled={requestProcessor?.request_status === authConstants.RESET_PIN_SUCCESS ||
                                          requestProcessor?.request_status ===
                                            authConstants.RESET_PIN_FAILURE}
                                    >
                                        {requestProcessor?.request_status === authConstants.RESET_PIN_PENDING ? "Please wait..." : `Reset PIN`}

                                    </Button>
                                
          </Modal.Footer>

      
      </Modal>
    );
                                        }
  

                                        export default (PinResetModal);