import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

// import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'
import AccountsSidebar from './accountssidebar'
import  TableComponent from '../../shared/elements/table'
import Button from 'react-bootstrap/Button'
import "./accountsmanagement.scss"; 

class JournalEntries extends React.Component {
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
                                                <h2>Account Management</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="module-content">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <AccountsSidebar/>
                                        </div>
                                        <div className="col-sm-9">
                                            <div className="middle-content">
                                                <div className="heading-with-cta">
                                                    <h3 className="section-title">Journal Entries</h3>
                                                    <Button>New Journal Entry</Button>
                                                </div>
                                                
                                                <TableComponent classnames="striped bordered hover">
                                                    <thead>
                                                        <tr>
                                                        <th>Entry Id</th>
                                                        <th>Booking Date (Entry Date)</th>
                                                        <th>Transaction ID</th>
                                                        <th>GL Account Name</th>
                                                        <th>Debit Amount</th>
                                                        <th>Credit Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>some text</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>
                                                            <td>30</td>
                                                        </tr>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>023839</td>
                                                            <td>Debit</td>
                                                            <td>text text</td>
                                                            <td>Yes</td>
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

export default JournalEntries;