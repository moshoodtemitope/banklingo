import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
// import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 

class OrganizationCenters extends React.Component {
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
                                                <h2>Administration</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-submenu">
                                <div className="content-container">
                                    <ul className="nav">
                                        <li>
                                            {/* <NavLink to={'/administration-generalorganization'}>General</NavLink> */}
                                            <NavLink to={'/administration/general'}>General</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/organization'}>Organization</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/access'}>Access</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/products'}>Products</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/sms'}>SMS</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={'/administration/email'}>Email</NavLink>
                                        </li>
                                    </ul>
                                    <div className="lowerlevel-menu">
                                        <ul className="nav">
                                            <li>
                                                {/* <NavLink to={'/administration-generalorganization'}>Organization</NavLink> */}
                                                <NavLink exact to={'/administration/organization'}>Branches</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/organization/centers'}>Centers</NavLink>
                                                {/* <NavLink to={'/administration/administration-generalcurrency'}>Currency</NavLink> */}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="content-container">
                                    <div className="row">
                                        
                                        <div className="col-sm-12">
                                            <div className="middle-content">
                                                <div className="table-helper">
                                                    <input type="checkbox" name="" id="showDeactivted"/>
                                                    <label htmlFor="showDeactivted">Show deactivated centers</label>
                                                </div>
                                                <div className="heading-with-cta toleft">
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
                                                </div>
                                                
                                                <TableComponent classnames="striped bordered hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Center Name</th>
                                                            <th>ID</th>
                                                            <th>Center State</th>
                                                            <th>Address</th>
                                                            <th>Created</th>
                                                            <th>Last Modified</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Ikorodu</td>
                                                            <td>233</td>
                                                            <td>Active</td>
                                                            <td></td>
                                                            <td>29-11-2017</td>
                                                            <td>29-11-2017</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="1">Set Holidays</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Epe</td>
                                                            <td>232</td>
                                                            <td>Active</td>
                                                            <td></td>
                                                            <td>29-11-2017</td>
                                                            <td>29-11-2017</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="1">Set Holidays</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Agege</td>
                                                            <td>233</td>
                                                            <td>Deactivated</td>
                                                            <td></td>
                                                            <td>29-11-2017</td>
                                                            <td>29-11-2017</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="1">Deactivate</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="1">Set Holidays</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </TableComponent>
                                                <div className="footer-with-cta toleft">
                                                    <Button >New Centre</Button>
                                                </div>
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

export default OrganizationCenters;