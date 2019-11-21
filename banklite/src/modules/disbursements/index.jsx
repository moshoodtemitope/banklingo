import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";
import { NavLink} from 'react-router-dom';

import  InnerPageContainer from '../../shared/templates/authed-pagecontainer';
// import  PanelElement from '../../shared/elements/panel';
import  SidebarElement from '../../shared/elements/sidebar';
import "./disbursements.scss"; 

class DisbursementManagement extends React.Component {
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
                                                <h2>Disbursements</h2>
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
                                                        <NavLink to={'/disbursements'}>Disbursements</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/disbursements/initiate'}>Initiate Disbursement</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/disbursements/pending-approval'}>Pending Approval</NavLink>
                                                    </li>
                                                    <li>
                                                        <NavLink to={'/disbursements/nip-requets'}>NIP Requests</NavLink>
                                                        <ul>
                                                            <li>
                                                                <NavLink to={'/disbursements/transfer-requests'}>Transfer Requests</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/disbursements/account-block'}>Account Block</NavLink>
                                                            </li>
                                                            <li>
                                                                <NavLink to={'/disbursements/amount-block'}>Amount Block</NavLink>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </SidebarElement>
                                        </div>
                                        {/* <div className="col-sm-3">
                                            <PanelElement panelTitle='General'>
                                            <ul>
                                                <li>
                                                    <NavLink to={'/dashboard'}>Disbursements</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/clients'}>Initiate Disbursement</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/clients'}>Pending Approval</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/clients'}>NIP Requests</NavLink>
                                                </li>
                                            </ul>
                                            </PanelElement>
                                        </div> */}
                                        {/* <div className="col-sm-3">
                                            <PanelElement panelTitle='General'>
                                            <ul>
                                                <li>
                                                    <NavLink to={'/dashboard'}>Disbursements</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/clients'}>Initiate Disbursement</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/clients'}>Pending Approval</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={'/clients'}>NIP Requests</NavLink>
                                                </li>
                                            </ul>
                                            </PanelElement>
                                        </div> */}
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

export default DisbursementManagement;