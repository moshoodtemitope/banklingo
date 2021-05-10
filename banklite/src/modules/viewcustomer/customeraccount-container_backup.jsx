import * as React from 'react';
// import {Router} from "react-router";

import { Fragment } from 'react';

import { NavLink, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';

import Col from 'react-bootstrap/Col';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import TableComponent from '../../shared/elements/table';
import './customerprofile.scss';
import InnerPageContainer from '../../shared/templates/authed-pagecontainer';

import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { clientsActions } from '../../redux/actions/clients/clients.action';
import { clientsConstants } from '../../redux/actiontypes/clients/clients.constants';

import { loanActions } from '../../redux/actions/loans/loans.action';
import { depositActions } from '../../redux/actions/deposits/deposits.action';
import { loanAndDepositsConstants } from '../../redux/actiontypes/LoanAndDeposits/loananddeposits.constants';

import AccountContainer from '../viewcustomer/account-container';
import DatePickerFieldType from '../../_helpers/DatePickerFieldType';
import ChangeCustomerStateModal from './modals/change-customer-state-modal';
import NewTaskModal from './modals/new-task-modal';
import NotificationHistoryModal from './modals/notification-history-modal';
import ChangeHistoryModal from './modals/change-history-modal';

class CustomerAccountContainer extends React.Component {
  constructor(props) {
    super(props);

    this.clientEncodedKey = this.props.match.params.id;

 
    this.state = {
      user: '',
      generatedRoutes: {
        customer: `/customer/${this.clientEncodedKey}`,
        attachments: `/customer/${this.clientEncodedKey}/attachments`,
        activities: `/customer/${this.clientEncodedKey}/activities`,
        tasks: `/customer/${this.clientEncodedKey}/tasks`,
        communications: `/customer/${this.clientEncodedKey}/communications`,
        comments: `/customer/${this.clientEncodedKey}/comments`,

        allclosedaccounts: `/customer/${this.clientEncodedKey}/closedaccounts`,
      },
      
      showNewTask: false,
      showSetNotification: false,
      showChangeHistory: false,
      showAddField: false,
      showChangeCustomerState: false, 
      newState:'',newStateUpdate:'',ctaText:'',

      FullDetails: true,
      PageSize: 100,
      CurrentPage: 1,
      
    };


    
    this.userPermissions = JSON.parse(localStorage.getItem('x-u-perm'));
  }

  componentDidMount() {
    this.loadInitialCustomerData();
  }

  loadInitialCustomerData = () => {
    let { PageSize, CurrentPage, FullDetails } = this.state;
    let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&FullDetails=${FullDetails}`;

    // console.log("djsdsds", this.clientEncodedKey);
    this.getCustomerDepositAccounts(this.clientEncodedKey, params);
    this.getCustomerLoanAccounts(this.clientEncodedKey, params);
    this.getClientInfo(this.clientEncodedKey);
  };

  getCustomerDepositAccounts = (clientEncodedKey, params) => {
    const { dispatch } = this.props;

    dispatch(depositActions.getClientDeposits(clientEncodedKey, params));
  };

  getCustomerLoanAccounts = (clientEncodedKey, params) => {
    const { dispatch } = this.props;

    dispatch(loanActions.getClientLoans(clientEncodedKey, params));
  };

  getClientInfo = (clientEncodedKey) => {
    const { dispatch } = this.props;

    dispatch(clientsActions.getAClient(clientEncodedKey));
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.clientEncodedKey = nextProps.match.params.id;

      this.setState({
        generatedRoutes: {
          customer: `/customer/${this.clientEncodedKey}`,
          attachments: `/customer/${this.clientEncodedKey}/attachments`,
          activities: `/customer/${this.clientEncodedKey}/activities`,
          tasks: `/customer/${this.clientEncodedKey}/tasks`,
          communications: `/customer/${this.clientEncodedKey}/communications`,
          comments: `/customer/${this.clientEncodedKey}/comments`,

          allclosedaccounts: `/customer/${this.clientEncodedKey}/closedaccounts`,
        },
      });
      this.loadInitialCustomerData();
    }
  }


  // ///This section hides and shows all the page modals
  toggleTaskModal = () => this.setState({ showNewTask: !this.state.showNewTask });


  toggleChangeStateModal = () => this.setState({ showChangeCustomerState: !this.state.showChangeCustomerState });


  toggleAddFieldModal = () => this.setState({ showAddField: !this.state.showAddField });


  toggleSetNotificationModal = () => this.setState({ showSetNotification: !this.state.showSetNotification });

  
  toggleChangeHistoryModal = () => this.setState({ showChangeHistory: !this.state.showSetNotification });



  // newTask = () => {
  //   const { showNewTask } = this.state;
  //   return (
  //     <Modal
  //       show={showNewTask}
  //       onHide={this.toggleTaskModal}
  //       size='lg'
  //       centered='true'
  //       dialogClassName='modal-40w withcentered-heading'
  //       animation={false}
  //     >
  //       <Modal.Header>
  //         <Modal.Title>Creating Task</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <Form>
  //           <Form.Group>
  //             <Form.Label className='block-level'>Summary</Form.Label>
  //             <Form.Control type='text' />
  //           </Form.Group>
  //           <Form.Group>
  //             <Form.Label className='block-level'>Linked To</Form.Label>
  //             {/* Search dropdown of staff list */}
  //             <Form.Control type='text' />
  //           </Form.Group>
  //           <Form.Row>
  //             <Col>
  //               <Form.Label className='block-level'>Assigned To</Form.Label>
  //               {/* Search dropdown of staff list */}
  //               <Form.Control type='text' />
  //             </Col>
  //             <Col className='date-wrap'>
  //               <Form.Label className='block-level'>Due Date</Form.Label>
  //               <DatePicker
  //                 placeholderText='Choose entry date'
  //                 selected={this.state.dob}
  //                 onChange={this.handleDatePicker}
  //                 onChangeRaw={(e) => this.handleChange(e)}
  //                 dateFormat={window.dateformat}
  //                 className='form-control form-control-sm'
  //                 peekNextMonth
  //                 showMonthDropdown
  //                 showYearDropdown
  //                 dropdownMode='select'
  //                 maxDate={new Date()}
  //                 customInput={
  //                   <DatePickerFieldType placeHolder='Choose entry date' />
  //                 }
  //               />
  //             </Col>
  //           </Form.Row>
  //           <Form.Group controlId='debitLocation'>
  //             <Form.Label className='block-level'>Notes</Form.Label>
  //             <Form.Control as='textarea' rows='4' />
  //           </Form.Group>
  //         </Form>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button variant='light' onClick={this.toggleTaskModal}>
  //           Cancel
  //         </Button>
  //         <Button variant='secondary'>Save Task</Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // };





  handleNewCustomerState = async (
    changeCustomerStatePayload,
    newStateUpdate
  ) => {
    const { dispatch } = this.props;

    await dispatch(
      clientsActions.changeClientState(
        changeCustomerStatePayload,
        newStateUpdate
      )
    );
  };

  // changeCustomerStateBox = (customerDetails) => {
  //   const {
  //     showChangeCustomerState,
  //     newState,
  //     ctaText,
  //     newStateUpdate,
  //   } = this.state;
  //   let changeClientStateRequest = this.props.changeClientStateReducer;

  //   let changeCustomerStateValidationSchema = Yup.object().shape({
  //     Comment: Yup.string().min(2, 'Valid comments required'),
  //   });
  //   return (
  //     <Modal
  //       show={showChangeCustomerState}
  //       onHide={this.toggleChangeStateModal}
  //       size='lg'
  //       centered='true'
  //       dialogClassName='modal-40w withcentered-heading'
  //       animation={false}
  //     >
  //       <Formik
  //         initialValues={{
  //           Comment: '',
  //         }}
  //         validationSchema={changeCustomerStateValidationSchema}
  //         onSubmit={(values, { resetForm }) => {
  //           let changeCustomerStatePayload = {
  //             comment: values.Comment,
  //             clientEncodedKey: this.clientEncodedKey,
  //           };

  //           // let changeCustomerStatePayload = `Comment=${values.Comment}&ClientEncodedKey=${this.clientEncodedKey}`;

  //           this.handleNewCustomerState(
  //             changeCustomerStatePayload,
  //             newStateUpdate
  //           ).then(() => {
  //             if (
  //               this.props.changeClientStateReducer.request_status ===
  //               clientsConstants.CHANGE_CLIENT_STATE_SUCCESS
  //             ) {
  //               resetForm();
  //               // value = {null}

  //               setTimeout(() => {
  //                 this.props.dispatch(
  //                   clientsActions.changeClientState('CLEAR')
  //                 );
  //                 this.toggleChangeStateModal();
  //                 this.loadInitialCustomerData();
  //               }, 3000);
  //             }
  //           });
  //         }}
  //       >
  //         {({
  //           handleSubmit,
  //           handleChange,
  //           handleBlur,
  //           resetForm,
  //           values,
  //           setFieldValue,
  //           touched,
  //           isValid,
  //           errors,
  //         }) => (
  //           <Form noValidate onSubmit={handleSubmit} className=''>
  //             <Modal.Header>
  //               <Modal.Title>Change Customer State</Modal.Title>
  //             </Modal.Header>
  //             <Modal.Body>
  //               <Form.Group>
  //                 <Form.Label className='block-level'>Present State</Form.Label>
  //                 <span className='form-text'>
  //                   {customerDetails.clientStateDescription}{' '}
  //                 </span>

  //                 <Form.Label className='block-level mt-20'>
  //                   New State
  //                 </Form.Label>
  //                 <span className='form-text'>{newState}</span>
  //               </Form.Group>
  //               <Form.Group>
  //                 <Form.Label className='block-level'>Comments</Form.Label>
  //                 <Form.Control
  //                   as='textarea'
  //                   rows='3'
  //                   onChange={handleChange}
  //                   name='Comment'
  //                   value={values.Comment}
  //                   className={
  //                     errors.Comment && touched.Comment
  //                       ? 'is-invalid form-control form-control-sm'
  //                       : null
  //                   }
  //                 />
  //                 {errors.Comment && touched.Comment ? (
  //                   <span className='invalid-feedback'>{errors.Comment}</span>
  //                 ) : null}
  //               </Form.Group>
  //             </Modal.Body>
  //             <Modal.Footer>
  //               <Button variant='light' onClick={this.toggleChangeStateModal}>
  //                 Cancel
  //               </Button>
  //               <Button
  //                 variant='success'
  //                 type='submit'
  //                 disabled={changeClientStateRequest.is_request_processing}
  //               >
  //                 {changeClientStateRequest.is_request_processing
  //                   ? 'Please wait...'
  //                   : `${ctaText}`}
  //               </Button>
  //             </Modal.Footer>
  //             <div className='footer-alert'>
  //               {changeClientStateRequest.request_status ===
  //                 clientsConstants.CHANGE_CLIENT_STATE_SUCCESS && (
  //                 <Alert variant='success' className='w-65 mlr-auto'>
  //                   {
  //                     changeClientStateRequest.request_data.response.data
  //                       .message
  //                   }
  //                 </Alert>
  //               )}
  //               {changeClientStateRequest.request_status ===
  //                 clientsConstants.CHANGE_CLIENT_STATE_FAILURE && (
  //                 <Alert variant='danger' className='w-65 mlr-auto'>
  //                   {changeClientStateRequest.request_data.error}
  //                 </Alert>
  //               )}
  //             </div>
  //           </Form>
  //         )}
  //       </Formik>
  //     </Modal>
  //   );
  // };

  // setNotificationBox = () => {
  //   const { showSetNotification } = this.state;
  //   return (
  //     <Modal
  //       show={showSetNotification}
  //       onHide={this.toggleSetNotificationModal}
  //       size='lg'
  //       centered='true'
  //       dialogClassName='modal-40w withcentered-heading'
  //       animation={false}
  //     >
  //       <Modal.Header>
  //         <Modal.Title>Notification Requests</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <Form>
  //           <div className='checkbox-wrap'>
  //             <input type='checkbox' name='' id='pick-2' disabled checked />
  //             <label htmlFor='pick-2'>Loan Account Rejection (Email)</label>
  //           </div>
  //           <div className='checkbox-wrap'>
  //             <input type='checkbox' name='' id='pick-3' disabled checked />
  //             <label htmlFor='pick-3'>Account In Arrears (SMS)</label>
  //           </div>
  //           <div className='checkbox-wrap'>
  //             <input type='checkbox' name='' id='pick-4' disabled checked />
  //             <label htmlFor='pick-4'>Loan Account Refinanced (Web Hook)</label>
  //           </div>
  //           <div className='checkbox-wrap'>
  //             <input type='checkbox' name='' id='pick-5' checked />
  //             <label htmlFor='pick-5'>Loan Disbursement (Web Hook)</label>
  //           </div>
  //           <div className='checkbox-wrap'>
  //             <input type='checkbox' name='' id='pick-6' checked />
  //             <label htmlFor='pick-6'>Loan Account Created (SMS)</label>
  //           </div>
  //           <div className='checkbox-wrap'>
  //             <input type='checkbox' name='' id='pick-7' checked disabled />
  //             <label htmlFor='pick-7'>Unpaid Repayment Due (Email)</label>
  //           </div>
  //         </Form>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button variant='light' onClick={this.toggleSetNotificationModal}>
  //           Cancel
  //         </Button>
  //         <Button variant='secondary'>Save Changes</Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // };

  // changeHistoryBox = () => {
  //   const { showChangeHistory } = this.state;
  //   return (
  //     <Modal
  //       show={showChangeHistory}
  //       onHide={this.toggleChangeHistoryModal}
  //       size='lg'
  //       centered='true'
  //       dialogClassName='modal-45w withcentered-heading'
  //       animation={false}
  //     >
  //       <Modal.Header>
  //         <Modal.Title>History Change Log</Modal.Title>
  //       </Modal.Header>
  //       <Modal.Body>
  //         <Form>
  //           <div className='select-wrap w-40'>
  //             <label>Changed Fields</label>
  //             <select
  //               className='form-control form-control-sm w-20'
  //               name=''
  //               id=''
  //             >
  //               <option value=''>All</option>
  //             </select>
  //           </div>

  //           <TableComponent classnames='striped bordered hover'>
  //             <thead>
  //               <tr>
  //                 <th>Change</th>
  //                 <th>Original Value</th>
  //                 <th>New Value</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               <tr>
  //                 <td>
  //                   <p>Employer</p>
  //                   <small>Daniel Ugheghe</small>
  //                   <small>11-09-2019 15:20:24</small>
  //                 </td>
  //                 <td></td>
  //                 <td>ADMINISTRATIVE STAFF COLLEGE OF NIGERIA</td>
  //               </tr>
  //               <tr>
  //                 <td>
  //                   <p>Employer Category</p>
  //                   <small>API</small>
  //                   <small>11-09-2019 15:20:24</small>
  //                 </td>
  //                 <td>-</td>
  //                 <td>GENERAL</td>
  //               </tr>
  //             </tbody>
  //           </TableComponent>
  //         </Form>
  //       </Modal.Body>
  //       <Modal.Footer>
  //         <Button variant='light' onClick={this.toggleChangeHistoryModal}>
  //           Cancel
  //         </Button>
  //         <Button variant='secondary'>Save Changes</Button>
  //       </Modal.Footer>
  //     </Modal>
  //   );
  // };

  renderHeadingCtas = (customerDetails) => {
    let allUSerPermissions = [];
    this.userPermissions.map((eachPermission) => {
      allUSerPermissions.push(eachPermission.permissionCode);
    });
    return (
      <div className='heading-ctas'>
        <ul className='nav'>

          {/* This section shows the task component */}
          {allUSerPermissions.indexOf('bnk_manage_clients_task') > -1 && (
            <li>
              <Button size='sm' onClick={this.toggleTaskModal()}>
                New Task
              </Button>
            </li>
          )}

          {/* This section is list buttons for creating ether a new loan or deposit accounts */}
          {(customerDetails.clientState === 4 ||
            customerDetails.clientState === 1) &&
            (allUSerPermissions.indexOf('bnk_create_loan') > -1 ||
              allUSerPermissions.indexOf('bnk_create_deposit') > -1) && (
              <li>
                <DropdownButton
                  size='sm'
                  title='New Account'
                  key='inActiveCurrency'
                  className='customone'
                  alignRight
                >
                  {allUSerPermissions.indexOf('bnk_create_loan') > -1 && (
                    <NavLink
                      className='dropdown-item'
                      to={`/all-loans/newloan-account/${customerDetails.clientEncodedKey}`}
                    >
                      New Loan Account
                    </NavLink>
                  )}
                  {allUSerPermissions.indexOf('bnk_create_deposit') > -1 && (
                    <NavLink
                      className='dropdown-item'
                      to={`/deposits/newaccount/${customerDetails.clientEncodedKey}`}
                    >
                      New Deposit Account
                    </NavLink>
                  )}
                  {/* <Dropdown.Item eventKey="1" onClick={this.handleShow}>New Deposit Account</Dropdown.Item> */}
                  {/* <Dropdown.Item eventKey="1">New Credit Arrangement</Dropdown.Item> */}
                </DropdownButton>
              </li>
            )}

            {/* This sectoion shows button for editing customer */}
          {allUSerPermissions.indexOf('bnk_edit_client') > -1 && (
            <li>
              <Button size='sm'>
                <NavLink
                  to={`/clients/edit/${customerDetails.clientEncodedKey}`}
                >
                  Edit
                </NavLink>
              </Button>
            </li>
          )}

            {/* This sectoion shows button for blaclisting customer */}
          {(customerDetails.clientState ===  4 ||
            customerDetails.clientState === 1) &&
            allUSerPermissions.indexOf('bnk_blacklist_customer') > -1 && (
              <li>
                <DropdownButton
                  size='sm'
                  title='More'
                  key='inActiveCurrency'
                  className='customone'
                  alignRight
                >
                  {/* <Dropdown.Item eventKey="1" onClick={this.toggleAddFieldModal}>Add Field</Dropdown.Item>
                                <Dropdown.Item eventKey="1" onClick={this.toggleSetNotificationModal}>Set Notifications</Dropdown.Item>
                                <Dropdown.Item eventKey="1" onClick={this.toggleChangeHistoryModal}>View Change History</Dropdown.Item> */}
                  <Dropdown.Item
                    eventKey='1'
                    onClick={() => {
                      this.setState({
                        newState: 'Blacklisted',
                        newStateUpdate: 'blacklist',
                        ctaText: 'Blacklist Client',
                      });
                      this.toggleChangeStateModal();//this is to blacklist
                    }}
                  >
                    Blacklist Customer
                  </Dropdown.Item>
                </DropdownButton>
              </li>
            )}


            {/* The following section shows if the customer is already blacklisted */}
          {customerDetails.clientState === 6 && allUSerPermissions.indexOf('bnk_blacklist_customer') > -1 && (
              <li>
                <DropdownButton
                  size='sm'
                  title='More'
                  key='inActiveCurrency'
                  className='customone'
                  alignRight
                >
                  <Dropdown.Item
                    eventKey='1'
                    onClick={() => {
                      //This is to undo blacklist
                      this.setState({
                        newState: 'Approved',
                        newStateUpdate: 'undoblacklist',
                        ctaText: 'Undo Blacklist Client',
                      });
                      this.toggleChangeStateModal();
                    }}
                  >
                    Undo Blacklist Customer
                  </Dropdown.Item>
                </DropdownButton>
              </li>
            )}


{/* This section shows buttons to approve, reject and blacklist customers */}
          {customerDetails.clientState === 3 &&
            (allUSerPermissions.indexOf('bnk_blacklist_customer') > -1 ||
              allUSerPermissions.indexOf('bnk_approve_client') > -1) && (
              <li>
                <DropdownButton
                  size='sm'
                  title='More'
                  key='inActiveCurrency'
                  className='customone'
                  alignRight
                >
                  {allUSerPermissions.indexOf('bnk_approve_client') > -1 && (
                    <Dropdown.Item
                      eventKey='1'
                      onClick={() => {

                        //this is to approve
                        this.setState({
                          newState: 'Approved',
                          newStateUpdate: 'approve',
                          ctaText: 'Approve Client',
                        });
                        this.toggleChangeStateModal();
                      }}
                    >
                      Approve
                    </Dropdown.Item>
                  )}


                  {allUSerPermissions.indexOf('bnk_approve_client') > -1 && (
                    <Dropdown.Item
                      eventKey='1'
                      onClick={() => {

                        //this is to reject customer
                        this.setState({
                          newState: 'Rejected',
                          newStateUpdate: 'rejectcustomer',
                          ctaText: 'Reject Client',
                        });
                        this.toggleChangeStateModal();
                      }}
                    >
                      Reject
                    </Dropdown.Item>
                  )}
                  {allUSerPermissions.indexOf('bnk_blacklist_customer') >
                    -1 && (
                    <Dropdown.Item
                      eventKey='1'
                      onClick={() => {
                        //this is to blacklist customer
                        this.setState({
                          newState: 'Blacklisted',
                          newStateUpdate: 'blacklist',
                          ctaText: 'Blacklist Client',
                        });
                        this.toggleChangeStateModal();
                      }}
                    >
                      Blacklist Customer
                    </Dropdown.Item>
                  )}
                </DropdownButton>
              </li>
            )}
        </ul>
      </div>
    );
  };
  renderLoanAccountsNav = (loanAccounts) => {
    return loanAccounts.map((eachLoanAccount, index) => {
      return (
        <li key={index}>
          <NavLink
            to={`/customer/${this.clientEncodedKey}/loanaccount/${eachLoanAccount.encodedKey}`}
          >
            {eachLoanAccount.productName !== null &&
            eachLoanAccount.productName !== ''
              ? `${eachLoanAccount.productName} - `
              : ''}
            {eachLoanAccount.accountNumber}

            {eachLoanAccount.loanState === 5 && (
              <span
                className={
                  eachLoanAccount.loanState === 5
                    ? 'stateindicator active-state'
                    : ''
                }
              ></span>
            )}
            {(eachLoanAccount.loanState === 4 ||
              eachLoanAccount.loanState === 7 ||
              eachLoanAccount.loanState === 8 ||
              eachLoanAccount.loanState === 9) && (
              <span className='stateindicator closed-state'></span>
            )}
          </NavLink>
        </li>
      );
    });
  };

  renderDepositAccountsNav = (savingsAccounts) => {
    // if(savingsAccounts.result!==null){
    return savingsAccounts.map((eachDepositAccount, index) => {
      if (
        eachDepositAccount.accountNumber !== '' &&
        eachDepositAccount.accountNumber !== null
      ) {
        return (
          <li key={index}>
            <NavLink
              to={`/customer/${this.clientEncodedKey}/savingsaccount/${eachDepositAccount.encodedKey}`}
            >
              {eachDepositAccount.productName !== null &&
              eachDepositAccount.productName !== ''
                ? `${eachDepositAccount.productName} - `
                : ''}
              {eachDepositAccount.accountNumber}

              {eachDepositAccount.accountStateDescription === 'Active' && (
                <span
                  className={
                    eachDepositAccount.accountStateDescription === 'Active'
                      ? 'stateindicator active-state'
                      : ''
                  }
                ></span>
              )}
              {eachDepositAccount.accountStateDescription === 'Approved' && (
                <span
                  className={
                    eachDepositAccount.accountStateDescription === 'Approved'
                      ? 'stateindicator mid-state'
                      : ''
                  }
                ></span>
              )}
              {(eachDepositAccount.accountStateDescription === 'Rejected' ||
                eachDepositAccount.accountStateDescription ===
                  'Closed Withdrawn' ||
                eachDepositAccount.accountStateDescription === 'Closed') && (
                <span className='stateindicator closed-state'></span>
              )}
            </NavLink>
          </li>
        );
      }
    });
    // }else{
    //     return null;
    // }
  };

  renderSubMenu = (loanAccounts, savingsAccounts) => {
    let { generatedRoutes } = this.state;
    let numberOfClosedLoans = 0;
    let numberOfClosedSavings = 0;

    let allUSerPermissions = [];
    this.userPermissions.map((eachPermission) => {
      allUSerPermissions.push(eachPermission.permissionCode);
    });
    //     numberOfClosedLoans = loanAccounts.result.filter((eachLoanAccount)=> eachLoanAccount.loanStateDescription==="Rejected" || eachLoanAccount.loanStateDescription==="Closed Withdrawn" || eachLoanAccount.loanStateDescription==="Closed").length;
    // let unClosedLoans = loanAccounts.result.filter((eachLoanAccount)=> eachLoanAccount.loanStateDescription!=="Rejected" && eachLoanAccount.loanStateDescription!=="Closed Withdrawn" && eachLoanAccount.loanStateDescription!=="Closed");

    numberOfClosedLoans = loanAccounts.result.filter(
      (eachLoanAccount) =>
        eachLoanAccount.loanState === 4 ||
        eachLoanAccount.loanState === 7 ||
        eachLoanAccount.loanState === 8 ||
        eachLoanAccount.loanState === 9
    ).length;

    let unClosedLoans = loanAccounts.result.filter(
      (eachLoanAccount) =>
        eachLoanAccount.loanState !== 4 &&
        eachLoanAccount.loanState !== 7 &&
        eachLoanAccount.loanState !== 8 &&
        eachLoanAccount.loanState !== 9
    );


    //
    numberOfClosedSavings = savingsAccounts.result.filter(
      (eachSavingsAccount) =>
        eachSavingsAccount.accountState === 4 ||
        eachSavingsAccount.accountState === 7 ||
        eachSavingsAccount.accountState === 8 ||
        eachSavingsAccount.accountState === 9
    ).length;


    let unClosedSavings = savingsAccounts.result.filter(
      (eachSavingsAccount) =>
        eachSavingsAccount.accountState !== 4 &&
        eachSavingsAccount.accountState !== 7 &&
        eachSavingsAccount.accountState !== 8 &&
        eachSavingsAccount.accountState !== 9
    );

    let totalClosed = numberOfClosedSavings + numberOfClosedLoans;

    // console.log("unClosedSavings", unClosedSavings);
    return (
      <div className='module-submenu'>
        <div className='content-container'>
          <ul className='nav'>
            <li>
              <NavLink exact to={generatedRoutes.customer}>
                Overview
              </NavLink>
            </li>


            {this.renderLoanAccountsNav(unClosedLoans)}
            {this.renderDepositAccountsNav(unClosedSavings)}
            {totalClosed >= 1 && (
              <li>
                <NavLink to={generatedRoutes.allclosedaccounts}>
                  Closed Accounts ({totalClosed})
                  <span className='stateindicator closed-state'></span>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to={generatedRoutes.activities}>Activities</NavLink>
            </li>

            {allUSerPermissions.indexOf('bnk_view_customer_documents') > -1 && (
              <li>
                <NavLink to={generatedRoutes.attachments}>Attachments</NavLink>
              </li>
            )}


            {allUSerPermissions.indexOf('bnk_manage_clients_task') > -1 && (
              <li>
                <NavLink to={generatedRoutes.tasks}>Tasks</NavLink>
              </li>
            )}


            {allUSerPermissions.indexOf('bnk_view_client_communications') >
              -1 && (
              <li>
                <NavLink to={generatedRoutes.communications}>
                  Communications
                </NavLink>
              </li>
            )}
            {allUSerPermissions.indexOf('bnk_view_customer_comments') > -1 && (
              <li>
                <NavLink to={generatedRoutes.comments}>Comments</NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  };

  renderCustomerName = (customerDetails) => {
    return (
      <div className='content-container'>
        <div className='row'>
          <div className='col-sm-12'>
            <div className=''>
              <h2>
                {customerDetails.firstName !== null &&
                customerDetails.firstName !== ''
                  ? customerDetails.firstName
                  : ''}
                &nbsp;
                {customerDetails.lastName !== null &&
                customerDetails.lastName !== ''
                  ? customerDetails.lastName
                  : ''}
                &nbsp;
                {customerDetails.middleName !== null &&
                customerDetails.middleName !== ''
                  ? customerDetails.middleName
                  : ''}
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderCustomerHeading = () => {
    let getAClientRequest = this.props.getAClientReducer,
      getClientLoansRequest = this.props.getClientLoansReducer,
      getClientDepositsRequest = this.props.getClientDepositsReducer;
      console.log('check...'+ getAClientRequest.request_status+'     '+getClientLoansRequest.request_status+'    '+getClientDepositsRequest.request_status);

    if (
      getAClientRequest.request_status ===
        clientsConstants.GET_A_CLIENT_PENDING ||
      getClientLoansRequest.request_status ===
        loanAndDepositsConstants.GET_CLIENTLOANS_PENDING ||
      getClientDepositsRequest.request_status ===
        loanAndDepositsConstants.GET_CLIENTDEPOSITS_PENDING
    ) {
      console.log('check 1...'+ getAClientRequest.request_status+'     '+getClientLoansRequest.request_status+'    '+getClientDepositsRequest.request_status);

      return <div className='loading-text'>Please wait... </div>;
    }

    if (
      getAClientRequest.request_status ===
        clientsConstants.GET_A_CLIENT_SUCCESS &&
      getClientLoansRequest.request_status ===
        loanAndDepositsConstants.GET_CLIENTLOANS_SUCCESS &&
      getClientDepositsRequest.request_status ===
        loanAndDepositsConstants.GET_CLIENTDEPOSITS_SUCCESS
    ) {

      console.log('check 2...'+ getAClientRequest.request_status+'     '+getClientLoansRequest.request_status+'    '+getClientDepositsRequest.request_status);
      let customerDetails = getAClientRequest.request_data.response.data;
      let customerLoanAccounts =
        getClientLoansRequest.request_data.response.data;
      let customerDepositAccounts =
        getClientDepositsRequest.request_data.response.data;

      //    console.log("dsdsdsdsd", getAClientRequest.request_data.response);
      return (
        <div>
          {/* Inject the modals here */}
          {/* {this.newTask()}

          {this.changeCustomerStateBox(customerDetails)}
          {this.setNotificationBox()}
          {this.changeHistoryBox()} */}

      
          <div className='module-heading'>
            <div className='module-title'>
              {this.renderHeadingCtas(customerDetails)}
              {this.renderCustomerName(customerDetails)}
            </div>
            {this.renderSubMenu(customerLoanAccounts, customerDepositAccounts)}
          </div>
        </div>
      );
    }
  };

  render() {
  // 
    return (
      <Fragment>
        <InnerPageContainer {...this.props}>
          <div className='content-wrapper'>
          <ChangeCustomerStateModal 
            show={changeCustomerState}
            onHide={this.handleChangeStateClose}
          
          showModal={this.state.showChangeCustomerState}  onHide={this.toggleChangeStateModal}  handleSubmit={this.handleNewCustomerState}  modalData={this.state.newState, this.state.newStateUpdate, this.state.ctaText } />
        {/* <NewTaskModal showModal={this.state.showNewTask}  onHide={this.toggleTaskModal}  handleSubmit={this.handleNewCustomerState} /> */}
        {/* <ChangeCustomerStateModal  showModal={this.state.showChangeCustomerState}  onHide={this.toggleChangeStateModal}  handleSubmit={this.handleNewCustomerState}  modalData={this.state.newState, this.state.newStateUpdate, this.state.ctaText }/>
        <NotificationHistoryModal   showModal={this.state.showChangeHistory}  onHide={this.toggleSetNotificationModal}  handleSubmit={this.handleNewCustomerState}/>
        <ChangeHistoryModal   showModal={this.state.showChangeHistory}  onHide={this.toggleChangeHistoryModal}  handleSubmit={this.handleNewCustomerState}/>
         */}

            {this.renderCustomerHeading()}

            {this.props.children}
            {/* This is the section that contains the account container */}
            <Route exact to='/customer/:id' component={AccountContainer} />
          </div>
        </InnerPageContainer>
      </Fragment>
    );
  }

}

function mapStateToProps(state) {
  return {
    changeClientStateReducer: state.clientsReducers.changeClientStateReducer,
    getAClientReducer: state.clientsReducers.getAClientReducer,
    getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
    getClientLoansReducer: state.loansReducers.getClientLoansReducer,
  };
}

export default connect(mapStateToProps)(CustomerAccountContainer);
