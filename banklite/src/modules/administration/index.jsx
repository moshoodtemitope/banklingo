import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class AdminManagement extends React.Component {
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
                                <div className="container">
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
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <SidebarElement>
                                                <ul>
                                                    <li>
                                                        <NavLink to={'/administration/general'}>General</NavLink>
                                                        <ul>
                                                            <li>
                                                                <NavLink to={'/administration/general/organization'}>Organization</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/administration/general/currency'}>Currency</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/administration/general/channels'}>Transaction Channels</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/administration/general/customer-types'}>Customer Types</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/administration/general/internal-control'}>Internal Control</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/administration/general/branding'}>Branding</NavLink>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/administration/organization'}>Organization</NavLink>
                                                        <ul>
                                                            <li>
                                                                <NavLink to={'/administration/organization/branches'}>Branches</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/administration/organization/centers'}>Centers</NavLink>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/administration/access'}>Access</NavLink>
                                                        <ul>
                                                            <li>
                                                                <NavLink to={'/administration/access/roles'}>Roles</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/administration/access/users'}>Users</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/administration/access/preferences'}>Preferences</NavLink>
                                                            </li>
                                                        </ul>
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
                                            </SidebarElement>
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

export default AdminManagement;