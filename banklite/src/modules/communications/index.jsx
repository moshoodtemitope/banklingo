import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import {administrationActions} from '../../redux/actions/administration/administration.action';
import {administrationConstants} from '../../redux/actiontypes/administration/administration.constants'

import "./communications.scss"; 
class CommunicationsManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            NotificationType:0,
            PageSize: 30,
            CurrentPage:1
        }
    }
        componentDidMount(){
            this.loadInitialData();
        }
    
        loadInitialData=()=>{
            let {PageSize, CurrentPage, NotificationType}= this.state;
            let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}&NotificationType=${NotificationType}`;
            this.getNotifications(params);
        }
    
        getNotifications = (paramters)=>{
            const {dispatch} = this.props;
    
            dispatch(administrationActions.getNotifications(paramters));
        }
    
        setPagesize = (PageSize)=>{
            // console.log('----here', PageSize.target.value);
            let sizeOfPage = PageSize.target.value,
                {CurrentPage, NotificationType} = this.state;
    
            this.setState({PageSize: sizeOfPage});
    
            let params= `PageSize=${sizeOfPage}&CurrentPage=${CurrentPage}&NotificationType=${NotificationType}`;
            this.getNotifications(params);
        }
    
        


        renderAllNotifications =()=>{
            let adminGetNotificationsRequest = this.props.adminGetNotifications;
                switch (adminGetNotificationsRequest.request_status){
                    case (administrationConstants.GET_NOTIFICATIONS_PENDING):
                        return (
                            <div className="loading-content"> 
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
                                                <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <TableComponent classnames="striped bordered hover">
                                    <thead>
                                        <tr>
                                            <th>Sent By</th>
                                            <th>Destination</th>
                                            <th>Message</th>
                                            <th>Type</th>
                                            <th>Status</th>
                                            <th>Date Sent</th>
                                            <th>Failure reason</th>
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
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </TableComponent>
                                <div className="loading-text">Please wait... </div>
                            </div>
                        )
                    
                    case(administrationConstants.GET_NOTIFICATIONS_SUCCESS):
                        let allNotificationsData = adminGetNotificationsRequest.request_data.response.data;
                        if(allNotificationsData!==undefined){
                            if(allNotificationsData.length>=1){
                                return(
                                    <div>
                                        <div className="table-helper">
                                            {/* <input type="checkbox" name="" 
                                                onChange={this.setShowDetails}
                                                checked={this.state.FullDetails}
                                                id="showFullDetails" /> */}
                                            {/* <label htmlFor="showFullDetails">Show full details</label> */}
                                            {/* <Form className="one-liner">
                                                        
                                                <Form.Group controlId="filterDropdown" className="no-margins pr-10">
                                                <Form.Label>Filter </Form.Label>
                                                    <Form.Control as="select" size="sm">
                                                        <option>No Filter</option>
                                                        <option>Add New Filter</option>
                                                        <option>Custom Filter</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Button className="no-margins" variant="primary" type="submit">Filter</Button>
                                            </Form> */}
                                        </div>
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
                                                <select id="toshow" 
                                                    onChange={this.setPagesize}
                                                    value={this.state.PageSize}
                                                    className="countdropdown form-control form-control-sm">
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
                                                        <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <TableComponent classnames="striped bordered hover">
                                            <thead>
                                                <tr>
                                                    <th>Sent By</th>
                                                    <th>Destination</th>
                                                    <th>Message</th>
                                                    <th>Type</th>
                                                    <th>Status</th>
                                                    <th>Date Sent</th>
                                                    <th>Failure reason</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    allNotificationsData.map((eachNotification, index)=>{
                                                        return(
                                                            <Fragment key={index}>
                                                                <tr>
                                                                    <td>{eachNotification.sentBy}</td>
                                                                    <td>{eachNotification.destination}</td>
                                                                    <td>{eachNotification.message}</td>
                                                                    <td>{eachNotification.communicationTypeDescription}</td>
                                                                    <td>{eachNotification.communicationStateDescription}</td>
                                                                    <td>{eachNotification.dateSent}</td>
                                                                    <td>{eachNotification.failureReason}</td>
                                                                </tr>
                                                            </Fragment>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </TableComponent>
                                    </div>
                                )
                            }else{
                                return(
                                    <div className="no-records">
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
                                                        <img alt="go to last page" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAALCAYAAABLcGxfAAAALElEQVR42mNgoBvo6en5j00MhhlwSZKsAVmSaA0wBSRpwGYA9WygXSgRYysAlRKJHRerQ3wAAAAASUVORK5CYII=" width="12" height="11" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <TableComponent classnames="striped bordered hover">
                                            <thead>
                                                <tr>
                                                    <th>Sent By</th>
                                                    <th>Destination</th>
                                                    <th>Message</th>
                                                    <th>Type</th>
                                                    <th>Status</th>
                                                    <th>Date Sent</th>
                                                    <th>Failure reason</th>
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
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </TableComponent>
                                    </div>
                                )
                            }
                        }else{
                            return null;
                        }
    
                    case (administrationConstants.GET_NOTIFICATIONS_FAILURE):
                        return (
                            <div className="loading-content errormsg"> 
                                <div>{adminGetNotificationsRequest.request_data.error}</div>
                            </div>
                        )
                    default :
                    return null;
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
                                                <h2>Communications</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <ul className="nav">
                                        <li>
                                            <NavLink exact to={'/communications'}>All</NavLink>
                                        </li>
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
                                                {this.renderAllNotifications()}
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

function mapStateToProps(state) {
    return {
        adminGetNotifications : state.administrationReducers.getNotificationsReducer,
    };
}
export default connect(mapStateToProps)(CommunicationsManagement);