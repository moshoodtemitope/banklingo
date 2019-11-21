import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import  SidebarElement from '../../shared/elements/sidebar'
import "./communications.scss"; 
class CommunicationsManagement extends React.Component {
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
                                                <h2>Communications Management</h2>
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
                                                        <NavLink to={'/communications/emails'}>Emails</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/communications/sms'}>SMS</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/communications/webhooks'}>Webhooks</NavLink>
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

export default CommunicationsManagement;