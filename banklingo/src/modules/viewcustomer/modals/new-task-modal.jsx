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

import  DatePickerEx from "react-datepicker";
// import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'

// import { clientsActions } from '../../../redux/actions/clients/clients.action';
// import { clientsConstants } from '../../../redux/actiontypes/clients/clients.constants';
import Alert from 'react-bootstrap/Alert';
import { Formik } from 'formik';
import * as Yup from 'yup';
class ChangeCustomerStateModal extends React.Component {
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

     

    handleDateChangeRaw = (e) => {
        e.preventDefault();
      };
//   toggleModal = () =>{
//     this.setState({ showModal: !this.state.showModal });
//   }
  
    ///this is the new task modal
    render(){
        ///This should be an add task component
        const {showModal} = this.state;
        return(
            <Modal  
            show={this.props.showModal}
            onHide={this.props.toggleModal}
            
            
            size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>Creating Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label className="block-level">Summary</Form.Label>
                            <Form.Control type="text"  />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="block-level">Linked To</Form.Label>
                            {/* Search dropdown of staff list */}
                            <Form.Control type="text"  />
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Label className="block-level">Assigned To</Form.Label>
                                {/* Search dropdown of staff list */}
                                <Form.Control type="text"  />
                            </Col>
                            <Col className="date-wrap">
                                <Form.Label className="block-level">Due Date</Form.Label>
                                <DatePickerEx 
                                 placeholderText="Choose entry date" 
                                    onChange={this.handleDatePicker}
                                    onChangeRaw={this.handleDateChangeRaw}
                                    dateFormat={window.dateformat}
                                    className="form-control form-control-sm"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    value={values.dueDate}
                                    maxDate={new Date()}
                                    />
                                {/* /> */}
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="debitLocation">
                            <Form.Label className="block-level">Notes</Form.Label>
                            <Form.Control as="textarea" rows="4" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    
                    <Button variant="light" onClick={this.handleTaskClose}>
                        Cancel
                    </Button>
                    <Button variant="secondary">
                        Save Task
                    </Button>
                
                </Modal.Footer>
            </Modal>
        )
    }


    // render() {
        
    //     // let {generatedRoutes} = this.state;
    //     return (
    //         this.newTask()
    //     );
    // }
}

function mapStateToProps(state) {
    return {
        // getAClientReducer: state.clientsReducers.getAClientReducer,
        // getClientDepositsReducer: state.depositsReducers.getClientDepositsReducer,
        // getClientLoansReducer: state.loansReducers.getClientLoansReducer,
    };
}

export default connect(mapStateToProps)(ChangeCustomerStateModal);