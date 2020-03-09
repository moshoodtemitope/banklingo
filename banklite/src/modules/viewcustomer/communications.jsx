import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

// import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  CustomerHeading from './customerheader'
// // import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Dropdown from 'react-bootstrap/Dropdown'
// import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
// import  SidebarElement from '../../shared/elements/sidebar'
// import "./administration.scss"; 
class ViewCustomerCommunications extends React.Component {
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
                        <CustomerHeading {...this.props}/>
                        <div className="module-content">
                            <div className="content-container">
                                <div className="row">
                                    
                                    <div className="col-sm-12">
                                        <div className="middle-content">
                                            <div className="heading-with-cta toleft"><Button >Edit Columns</Button></div>
                                                
                                            <div className="pagination-wrap">
                                                <label htmlFor="toshow">Show</label>
                                                <select id="toshow" className="countdropdown form-control form-control-sm">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="200">200</option>
                                                </select>
                                                
                                            </div>
                                            <TableComponent classnames="striped bordered hover">
                                                <thead>
                                                    <tr>
                                                        <th>Type</th>
                                                        <th>Sent Date</th>
                                                        <th>Sent By</th>
                                                        <th>State</th>
                                                        <th>Destination</th>
                                                        <th>Message</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Email</td>
                                                        <td>25-03-2019</td>
                                                        <td>Mambu</td>
                                                        <td>Failed</td>
                                                        <td>text text text text</td>
                                                        <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,  dolore nulla natus tempora in delectus iure quis fugiat esse .</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Web Hook</td>
                                                        <td>25-03-2019</td>
                                                        <td>Mambu</td>
                                                        <td>Sent</td>
                                                        <td>text text text text</td>
                                                        <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,  dolore nulla natus tempora in delectus iure quis fugiat esse .</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Web Hook</td>
                                                        <td>25-03-2019</td>
                                                        <td>Mambu</td>
                                                        <td>Sent</td>
                                                        <td>text text text text</td>
                                                        <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,  dolore nulla natus tempora in delectus iure quis fugiat esse .</td>
                                                    </tr>
                                                    <tr>
                                                        <td>SMS</td>
                                                        <td>25-03-2019</td>
                                                        <td>Mambu</td>
                                                        <td>Sent</td>
                                                        <td>text text text text</td>
                                                        <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet,  dolore nulla natus tempora in delectus iure quis fugiat esse .</td>
                                                    </tr>
                                                </tbody>
                                            </TableComponent>
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

export default ViewCustomerCommunications;