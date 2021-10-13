import * as React from 'react';
// import {Router} from "react-router";

import { Fragment } from 'react';
import AdminNav from '../_menu';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import InnerPageContainer from '../../../shared/templates/authed-pagecontainer';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import TableComponent from '../../../shared/elements/table';
import TablePagination from '../../../shared/elements/table/pagination';
import { administrationActions } from '../../../redux/actions/administration/administration.action';
import { administrationConstants } from '../../../redux/actiontypes/administration/administration.constants';
import Modal from 'react-bootstrap/Modal';
import AccessNav from '../menus/_access-menu';
import { authActions } from '../../../redux/actions/auth/auth.action';
import { authConstants } from '../../../redux/actiontypes/auth/auth.constants';

// import Alert from 'react-bootstrap/Alert'
// import  SidebarElement from '../../shared/elements/sidebar'
import '../administration.scss';
import DatePickerFieldType from '../../../_helpers/DatePickerFieldType';



export const PasswordResetModal =  ({ open, toggleHandler,proceedHandler,requestProcessor,selectedUser }) => {
 

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
          <Modal.Title>Password Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <div className='text-center '>
              Are you sure you want to reset  PASSWORD for {selectedUser}?
        </div>


          {requestProcessor.request_status ===
            authConstants.RESET_PASSWORD_FAILURE && (
            <div className='text-center errortxt'>
              {requestProcessor.request_data.error}
            </div>
          )}
          {/* {requestProcessor.request_status ===
            authConstants.RESET_PIN_PENDING && (
            <div className='text-center '>
              Resetting PIN for {selectedUser}
            </div>
          )} */}
          {requestProcessor.request_status ===
            authConstants.RESET_PASSWORD_SUCCESS && (
            <div className='text-center'>
              {requestProcessor.request_data.response.data.message}
              {/* PIN Reset was successful for {selectedUser} */}
            </div>
          )}
        </Modal.Body>


     
        <Modal.Footer>
       
            <Button variant="light" onClick={toggleHandler}>
                                    Cancel
                                </Button>
                               


                                    <Button
                                    onClick={proceedHandler}
                                        variant="success"
                                        type="submit"
                                        disabled={requestProcessor.request_status === authConstants.RESET_PASSWORD_SUCCESS ||
                                          requestProcessor.request_status ===
                                            authConstants.RESET_PASSWORD_FAILURE}
                                    >
                                        {requestProcessor.request_status === authConstants.RESET_PASSWORD_PENDING ? "Please wait..." : `Reset PASSWORD`}

                                    </Button>
                                
          </Modal.Footer>

      
      </Modal>
    );
                                        }
  

                                        export default (PasswordResetModal);


