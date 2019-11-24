import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import Button from 'react-bootstrap/Button'

import "./communications.scss"; 
class SMSCommunications extends React.Component {
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
                                                <h2>SMS</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <ul className="nav">
                                    <li>
                                        <NavLink to={'/communications/emails'}>Emails</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/communications/sms'}>SMS</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={'/communications/webhooks'}>Webhooks</NavLink>
                                    </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                <div className="heading-with-cta">
                                                    <div></div>
                                                    <Button >Edit Column</Button>
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
                                                        <th>Sent Date</th>
                                                        <th>Sent By</th>
                                                        <th>Sent To(Customer)</th>
                                                        <th>Sent To(Group)</th>
                                                        <th>Sent To(User)</th>
                                                        <th>State</th>
                                                        <th>Failure Reason</th>
                                                        <th>Destination</th>
                                                        <th>Message</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>023839</td>
                                                            <td>Debit</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>023839</td>
                                                            <td>Debit</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>023839</td>
                                                            <td>Debit</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>023839</td>
                                                            <td>Debit</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                            <td>30</td>
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

export default SMSCommunications;