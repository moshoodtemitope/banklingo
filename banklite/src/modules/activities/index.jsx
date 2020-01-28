import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { connect } from 'react-redux';

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  TableComponent from '../../shared/elements/table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { dashboardActions } from '../../redux/actions/dashboard/dashboard.action';
import { dashboardConstants } from '../../redux/actiontypes/dashboard/dashboard.constants'

import "./activities.scss"; 
class Activties extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            user:'',
            PageSize:25,
            CurrentPage:1,
        }
        
    }

    componentDidMount(){
        this.loadInitialData();
    }

    loadInitialData=()=>{
        let {PageSize, CurrentPage}= this.state;
        let params = `PageSize=${PageSize}&CurrentPage=${CurrentPage}`;
        this.getActivitiesData(params);
    }

    getActivitiesData = (paramters)=>{
        const {dispatch} = this.props;

        dispatch(dashboardActions.getActivitiesData(paramters));
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
                                                <h2>System Activities</h2>
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
                                                        <th>Creation Date</th>
                                                        <th>User</th>
                                                        <th>Action</th>
                                                        <th>Affected Item Name</th>
                                                        <th>Affected Item ID</th>
                                                        <th>Affected Customer Name</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>some text</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>Debit</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>Debit</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>
                                                            <td>30</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>Debit</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>
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

function mapStateToProps(state) {
    return {
        getDashboardStats: state.dashboardReducers.getDashboardStatReducer,
    };
}

export default connect(mapStateToProps)(Activties);