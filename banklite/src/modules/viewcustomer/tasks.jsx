import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
// import "./administration.scss"; 
class ViewCustomerTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            showNewTask:false
        }

       
    }

    handleTaskClose = () => this.setState({showNewTask:false});
    
    handleTaskShow = () => this.setState({showNewTask:true});

    newTask = ()=>{
        const {showNewTask} = this.state;
        return(
            <Modal show={showNewTask} onHide={this.handleTaskClose} size="lg" centered="true" dialogClassName="modal-40w withcentered-heading"  animation={false}>
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
                                <DatePicker placeholderText="Choose entry date" selected={this.state.dob} 
                                    onChange={this.handleDatePicker}
                                    onChangeRaw={(e)=>this.handleChange(e)}
                                    dateFormat="d MMMM, yyyy"
                                    className="form-control form-control-sm"
                                    peekNextMonth
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                    maxDate={new Date()}
                                />
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

    render() {
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    {this.newTask()}
                    <div className="content-wrapper">
                        <CustomerHeading {...this.props}/>
                        <div className="module-content">
                            <div className="content-container">
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="middle-content">
                                            <TableComponent classnames="striped bordered hover">
                                                <thead>
                                                    <tr>
                                                        <th>Summary</th>
                                                        <th>Assigned To</th>
                                                        <th>Due Date</th>
                                                        <th>Created</th>
                                                        <th>Created By</th>
                                                        <th>Notes</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </TableComponent>
                                            <div className="footer-with-cta toright">
                                                <Button onClick={this.handleTaskShow}>New Task</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </InnerPageContainer>
            </Fragment>
        );
    }
}

export default ViewCustomerTasks;