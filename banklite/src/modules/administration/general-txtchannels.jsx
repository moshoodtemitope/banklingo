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
class GeneralTxtChannels extends React.Component {
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
                                                <NavLink exact to={'/administration/general'}>Organization</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/currency'}>Currency</NavLink>
                                                {/* <NavLink to={'/administration/administration-generalcurrency'}>Currency</NavLink> */}
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/txt-channels'}>Transaction Channels</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/customer-types'}>Customer Types</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/control'}>Internal Control</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/branding'}>Branding</NavLink>
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
                                                    <label htmlFor="showDeactivted">Show deactivated transaction channels</label>
                                                </div>
                                                
                                                <TableComponent classnames="striped bordered hover">
                                                    <thead>
                                                        <tr>
                                                            <th>Name</th>
                                                            <th>Created</th>
                                                            <th>Created by</th>
                                                            <th>Active</th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>2 ACCESS BANK SETTLEMENT ACCOUNT <span className="default-channel">DEFAULT</span> </td>
                                                            <td>29-11-2017</td>
                                                            <td>Admin</td>
                                                            <td>Activated</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <NavLink className="dropdown-item" to={'/administration/general/new-txt-channels'}>Edit</NavLink>
                                                                    {/* <Dropdown.Item href="/administration/general/new-txt-channels">Edit</Dropdown.Item> */}
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>INTERSWITCH DISBURSEMENT CHANNEL</td>
                                                            <td>29-11-2017</td>
                                                            <td>Bayonle Amzat</td>
                                                            <td>Activated</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <NavLink className="dropdown-item" to={'/administration/general/new-txt-channels'}>Edit</NavLink>
                                                                    <Dropdown.Item href="/administration/general/new-txt-channels">Deactivate</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="3">Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>INTERSWITCH DISBURSEMENT CHANNEL</td>
                                                            <td>29-11-2017</td>
                                                            <td>Bayonle Amzat</td>
                                                            <td>Activated</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                    <NavLink className="dropdown-item" to={'/administration/general/new-txt-channels'}>Edit</NavLink>
                                                                    <Dropdown.Item eventKey="2">Deactivate</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="3">Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>INTERSWITCH DISBURSEMENT CHANNEL</td>
                                                            <td>29-11-2017</td>
                                                            <td>Bayonle Amzat</td>
                                                            <td>Activated</td>
                                                            <td>
                                                                <DropdownButton
                                                                    size="sm"
                                                                    title="Actions"
                                                                    key="activeCurrency"
                                                                    className="customone"
                                                                >
                                                                   <NavLink className="dropdown-item" to={'/administration/general/new-txt-channels'}>Edit</NavLink>
                                                                    <Dropdown.Item eventKey="2">Deactivate</Dropdown.Item>
                                                                    <Dropdown.Item eventKey="3">Delete</Dropdown.Item>
                                                                </DropdownButton>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </TableComponent>
                                                <div className="footer-with-cta toleft">
                                                    <Button variant="secondary" className="grayed-out">Rearrange</Button>
                                                    <NavLink to={'/administration/general/new-txt-channels'} className="btn btn-primary">Add Channel</NavLink>
                                                    {/* <Button href="/administration/general/new-txt-channels">Add Channel</Button> */}
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

export default GeneralTxtChannels;