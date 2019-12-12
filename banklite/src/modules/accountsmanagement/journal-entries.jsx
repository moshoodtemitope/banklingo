import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';

import Modal from 'react-bootstrap/Modal'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./accountsmanagement.scss"; 

class JournalEntries extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            show:false
        }

        

        
    }



    handleClose = () => this.setState({show:false});
    
    handleShow = () => this.setState({show:true});

    addNewJournal = ()=>{
        const {show} = this.state;
        return(
            <Modal show={show} onHide={this.handleClose} size="lg" centered="true" dialogClassName="modal-60w withcentered-heading"  animation={false}>
                <Modal.Header>
                    <Modal.Title>New Journal Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <h6>Debit</h6>
                        <div className="one-liner space-between">
                            <Form.Group controlId="debitAmount" className="with-prefix">
                                <div className="modal-inputprefix">&#8358;</div>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group controlId="whereToDebit">
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group controlId="debitLocation">
                                <Form.Control type="text" />
                            </Form.Group>
                        </div>
                        <h6>Credit</h6>
                        <div className="one-liner space-between">
                                <Form.Group controlId="debitAmount" className="with-prefix">
                                    <div className="modal-inputprefix">&#8358;</div>
                                    <Form.Control type="text" />
                                </Form.Group>
                            
                            <Form.Group controlId="whereToDebit">
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group controlId="debitLocation">
                                <Form.Control type="text" />
                            </Form.Group>
                        </div>
                        <Form.Group controlId="debitLocation">
                            <Form.Label className="block-level">Booking Date (Entry Date)</Form.Label>
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
                        </Form.Group>
                        <Form.Group controlId="debitLocation">
                            <Form.Label className="block-level">Notes</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Save
                    </Button>
                    <Button variant="light" onClick={this.handleClose}>
                        Cancel
                    </Button>
                
                </Modal.Footer>
            </Modal>
        )
    }

    render() {
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                {this.addNewJournal()}
                    <div className="content-wrapper">
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Accounting</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="module-submenu">
                                <div className="content-container">
                                    <ul className="nav">
                                        <li>
                                            <NavLink to={'/balancesheet'}>Balance Sheet</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/profit-loss'}>Profit & Loss</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/trial-balance'}>Trial Balance</NavLink>
                                        </li>
                                        <li>
                                            {/* <NavLink to={'/accounts/journal'}>Journal Entries</NavLink> */}
                                            <NavLink to={'/journals'}>Journal Entries</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/accounts'}>Charts of Accounts</NavLink>
                                            {/* <ul>
                                                <li>
                                                    <NavLink to={'/accounts/charts/all'}>All</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/accounts/charts/liabilities'}>Liabilities</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/accounts/charts/equity'}>Equity</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/accounts/charts/income'}>Income</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/accounts/charts/expenses'}>Expenses</NavLink>
                                                </li>
                                            </ul> */}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        {/* <div className="col-sm-3">
                                            <AccountsSidebar/>
                                        </div> */}
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                <div className="heading-with-cta">
                                                    {/* <h3 className="section-title">Journal Entries</h3> */}
                                                    <Form className="one-liner">
                                                        
                                                        <Form.Group controlId="filterDropdown">
                                                        <Form.Label> </Form.Label>
                                                            <Form.Control as="select" size="sm">
                                                                <option>No Filter</option>
                                                                <option>Add New Filter</option>
                                                                <option>Custom Filter</option>
                                                            </Form.Control>
                                                        </Form.Group>
                                                        <Button variant="primary" type="submit">Filter</Button>
                                                    </Form>
                                                    <Button
                                                        onClick={this.state.show===false ? this.handleShow : null}
                                                    >New Journal Entry</Button>
                                                </div>
                                                <div className="heading-with-cta toleft"><Button >Edit Columns</Button></div>
                                                
                                                <div className="pagination-wrap">
                                                    <label htmlFor="toshow">Show</label>
                                                    <select id="toshow" className="countdropdown form-control form-control-sm">
                                                        <option value="10">10</option>
                                                        <option value="25">25</option>
                                                        <option value="50">50</option>
                                                        <option value="200">200</option>
                                                    </select>
                                                    <div className="move-page-actions">
                                                        <div className="each-page-action">
                                                            <img alt="from beginning" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAAL0lEQVR42mNgoBvo6en5D8PY5IjWgMsQrBrw2YohicwnqAEbpq4NZPmBrFDCFg8AaBGJHSqYGgAAAAAASUVORK5CYII=" width="12" height="11" />
                                                        </div>
                                                        <div className="each-page-action">
                                                            <img alt="go backward" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAAJ0lEQVR42mNgoBj09PT8xyqIIQETRJFAFoRLoAsS1oHXDryuQvcHAJqKQewTJHmSAAAAAElFTkSuQmCC" width="6" height="11" />
                                                        </div>
                                                        <div className="page-count">
                                                            <span>1-20</span>  of <span>20000</span>
                                                        </div>
                                                        <div className="each-page-action">
                                                            <img alt="from next page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAALCAYAAABcUvyWAAAALElEQVR42mNgIAv09PT8xymBVRImgSGJLIEiiS4BlyRKB4odvb29uF2FLgYAOVFB7xSm6sAAAAAASUVORK5CYII=" width="12" height="11" />
                                                        </div>
                                                        <div className="each-page-action">
                                                            <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11"  />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <TableComponent classnames="striped bordered hover">
                                                    <thead>
                                                        <tr>
                                                        <th>Entry Id</th>
                                                        <th>Booking Date (Entry Date)</th>
                                                        <th>Transaction ID</th>
                                                        <th>GL Account Name</th>
                                                        <th>Debit Amount</th>
                                                        <th>Credit Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>some text</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>
                                                            <td>30</td>
                                                        </tr>
                                                    </tbody>
                                                </TableComponent>
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

export default JournalEntries;