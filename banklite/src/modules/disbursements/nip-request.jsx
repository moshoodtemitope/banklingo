import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { NavLink} from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer';
import  TableComponent from '../../shared/elements/table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./disbursements.scss"; 

class NipRequests extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:''
        }

        
    }

    render() {
        return (
            <Fragment>
                <InnerPageContainer {...this.props}>
                    <div className="content-wrapper">
                        <div className="module-heading">
                            <div className="module-title">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="">
                                                <h2>Nip Requests</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <ul className="nav">
                                        <li>
                                            <NavLink exact to={'/disbursements'}>Disbursements</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/initiate'}>Initiate Disbursement</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/pending-approval'}>Pending Approval</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/disbursements/nip-requests'}>NIP Requests</NavLink>
                                            {/* <ul>
                                                <li>
                                                    <NavLink to={'/disbursements/transfer-requests'}>Transfer Requests</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/disbursements/account-block'}>Account Block</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/disbursements/amount-block'}>Amount Block</NavLink>
                                                </li>
                                            </ul> */}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                {/* <div className="heading-with-cta">
                                                    <h3 className="section-title">Disbursement</h3>
                                                </div> */}
                                                   <div className="heading-with-cta">
                                                        <Form className="one-liner">

                                                            <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                                                <Form.Control as="select" size="sm">
                                                                    <option>No Filter</option>
                                                                    <option>Add New Filter</option>
                                                                    <option>Custom Filter</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                            <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                                        </Form>

                                                        <div className="pagination-wrap">
                                                            <label htmlFor="toshow">Show</label>
                                                            <select id="toshow" className="countdropdown form-control form-control-sm">
                                                                <option value="10">10</option>
                                                                <option value="25">25</option>
                                                                <option value="50">50</option>
                                                                <option value="200">200</option>
                                                            </select>
                                                            
                                                        </div>
                                                    </div>
                                                
                                                
                                                <TableComponent classnames="striped bordered hover">
                                                    <thead>
                                                        <tr>
                                                            <th>GL Code</th>
                                                            <th>Account Name</th>
                                                            <th></th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>some text</td>

                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>

                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>

                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>

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

export default NipRequests;