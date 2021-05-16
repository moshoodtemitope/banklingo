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



export const ActivateUserModal =  ({ open, toggleHandler,proceedHandler,requestProcessor,activationAction,selectedUser }) => {
 

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
      {activationAction === 'activate' && (
        <Modal.Title>Activate {selectedUser}</Modal.Title>
      )}

      {activationAction === 'deactivate' && (
        <Modal.Title>Deactivate {selectedUser}</Modal.Title>
      )}
    </Modal.Header>
    <Modal.Body>

        {requestProcessor.request_status ===
          authConstants.ACTIVATE_DEACTIVATE_USER_RESET &&
          <div className='text-center '>
            Are you sure you want to proceed?
        </div>
        }
      {requestProcessor.request_status ===
        authConstants.ACTIVATE_DEACTIVATE_USER_FAILURE && (
        <div className='text-center errortxt'>
          {requestProcessor.request_data.error}
        </div>
      )}
      {requestProcessor.request_status ===
        authConstants.ACTIVATE_DEACTIVATE_USER_PENDING && (
        <div className='text-center '>
          {activationAction === 'activate' && (
            <div>Activating {selectedUser}</div>
          )}

          {activationAction === 'deactivate' && (
            <div>De-Activating {selectedUser}</div>
          )}
        </div>
      )}
      {requestProcessor.request_status ===
        authConstants.ACTIVATE_DEACTIVATE_USER_SUCCESS && (
        <div className='text-center'>
          {requestProcessor.request_data.response.data.message}
        </div>
      )}
    </Modal.Body>




     
      <Modal.Footer>

        <Button variant="light" onClick={toggleHandler}>
          
          {requestProcessor.request_status !== authConstants.ACTIVATE_DEACTIVATE_USER_SUCCESS && "Cancel"}
          {requestProcessor.request_status === authConstants.ACTIVATE_DEACTIVATE_USER_SUCCESS && "Okay"}
        </Button>
        {requestProcessor.request_status !== authConstants.ACTIVATE_DEACTIVATE_USER_SUCCESS &&
          <Button
            onClick={proceedHandler}
            variant="success"
            type="submit"
            disabled={requestProcessor.request_status === authConstants.ACTIVATE_DEACTIVATE_USER_SUCCESS ||
              requestProcessor.request_status ===
              authConstants.ACTIVATE_DEACTIVATE_USER_FAILURE}
          >
            {requestProcessor.request_status === authConstants.ACTIVATE_DEACTIVATE_USER_PENDING ? "Please wait..." : `Proceed`}

          </Button>
        }

      </Modal.Footer>




    
    {/* {(requestProcessor.request_status ===
      authConstants.ACTIVATE_DEACTIVATE_USER_SUCCESS ||
      requestProcessor.request_status ===
        authConstants.ACTIVATE_DEACTIVATE_USER_FAILURE) && (
      <Modal.Footer>

        <Button variant='success' type='button' onClick={this.toggleHandler} >
          Okay
        </Button>


        
      </Modal.Footer>
    )} */}
  </Modal>
    );
   }
  
 export default (ActivateUserModal);

