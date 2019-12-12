import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import "./clients.scss"; 

class InactiveClients extends React.Component {
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
                                                <h2>Inactive</h2>
                                            </div>
                                        </div>
                                    </div>
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
                                                        <Form.Group controlId="periodOptionChosen">
                                                            <Form.Label>Account Officer</Form.Label>
                                                                <Form.Control type="text" size="sm" />
                                                        </Form.Group>
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
                                                    <Button>Edit Columns</Button>
                                                </div>
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
                                                        <th>Full Name</th>
                                                        <th>ID</th>
                                                        <th>Customer State</th>
                                                        <th>Account Officer</th>
                                                        <th>Total Balance</th>
                                                        <th>Pending Loan Amount</th>
                                                        <th>Approved Loan Amount</th>
                                                        <th>Last modified</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <NavLink to={'/customer/20'}>Olugbenga Stephen</NavLink>
                                                            </td>
                                                            <td>
                                                                <NavLink to={'/customer/20'}>20</NavLink>
                                                            </td>
                                                            <td>Inactive</td>
                                                            <td>Moneypal Web</td>
                                                            <td>₦0.00</td>
                                                            <td>₦1,000,000.00</td>
                                                            <td>₦0.00</td>
                                                            <td>03-10-2019</td>
                                                            
                                                        </tr>
                                                        <tr>
                                                            <td><NavLink to={'/customer/65'}>Sam Karly</NavLink></td>
                                                            <td>
                                                                <NavLink to={'/customer/65'}>65</NavLink>
                                                            </td>
                                                            <td>Inactive</td>
                                                            <td>Moneypal Web</td>
                                                            <td>₦0.00</td>
                                                            <td>₦0.00</td>
                                                            <td>₦0.00</td>
                                                            <td>03-10-2019</td>
                                                            
                                                        </tr>
                                                        <tr>
                                                            <td><NavLink to={'/customer/434'}>Thompson Oliha</NavLink></td>
                                                            <td>
                                                                <NavLink to={'/customer/65'}>434</NavLink>
                                                            </td>
                                                            <td>Inactive</td>
                                                            <td>Moneypal Web</td>
                                                            <td>₦0.00</td>
                                                            <td>₦1,000.00</td>
                                                            <td>₦0.00</td>
                                                            <td>03-10-2019</td>
                                                        </tr>
                                                        <tr>
                                                            <td><NavLink to={'/customer/4393'}>Adekunle Olawale</NavLink></td>
                                                            <td>
                                                                <NavLink to={'/customer/4393'}>4393</NavLink>
                                                            </td>
                                                            <td>Inactive</td>
                                                            <td>Moneypal Web</td>
                                                            <td>₦0.00</td>
                                                            <td>₦0.00</td>
                                                            <td>₦0.00</td>
                                                            <td>03-10-2019</td>
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

export default InactiveClients;