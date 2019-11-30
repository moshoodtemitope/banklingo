import * as React from "react";
// import {Router} from "react-router";

import {Fragment} from "react";

import { NavLink} from 'react-router-dom';
import  InnerPageContainer from '../../shared/templates/authed-pagecontainer'

// import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import  TableComponent from '../../shared/elements/table'
// import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import  SidebarElement from '../../shared/elements/sidebar'
import "./administration.scss"; 
class GeneralCurrency extends React.Component {
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
                                                <NavLink exact to={'/administration/general'}>Organization</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={'/administration/general/currency'}>Currency</NavLink>
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
                                                <Accordion defaultActiveKey="0">
                                                    
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">Currencies In Use
                                                    </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div>
                                                            <TableComponent classnames="striped bordered hover">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Code</th>
                                                                        <th>Name</th>
                                                                        <th>Symbol</th>
                                                                        <th></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>NGN</td>
                                                                        <td>Nigerian naira</td>
                                                                        <td>&#8358;</td>
                                                                        <td>
                                                                            <DropdownButton
                                                                                size="sm"
                                                                                title="Actions"
                                                                                key="activeCurrency"
                                                                                className="customone"
                                                                            >
                                                                                <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                                                                            </DropdownButton>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>XOF</td>
                                                                        <td>CFA Franc BCEAO</td>
                                                                        <td>CFA</td>
                                                                        <td>
                                                                            <DropdownButton
                                                                                size="sm"
                                                                                title="Actions"
                                                                                key="inActiveCurrency"
                                                                                className="customone"
                                                                            >
                                                                                <Dropdown.Item eventKey="1">Edit</Dropdown.Item>
                                                                                <Dropdown.Item eventKey="1">Delete</Dropdown.Item>
                                                                            </DropdownButton>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </TableComponent>
                                                            <div className="footer-with-cta toleft">
                                                                <Button >Add Currency</Button>
                                                            </div>
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>

                                                <Accordion>
                                                    
                                                    <Accordion.Toggle className="accordion-headingLink" as={Button} variant="link" eventKey="0">
                                                        Exchange Rates - From Nigerian naira (NGN)
                                                    </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <div>
                                                        <TableComponent classnames="striped bordered hover">
                                                            <thead>
                                                                <tr>
                                                                    <th>Code</th>
                                                                    <th>Name</th>
                                                                    <th>Buy Rate</th>
                                                                    <th>Sell Rate</th>
                                                                    <th>Date Set</th>
                                                                    <th></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>XOF</td>
                                                                    <td>CFA Franc BCEAO</td>
                                                                    <td>Not Set</td>
                                                                    <td>Not Set</td>
                                                                    <td>Not Set</td>
                                                                    <td>
                                                                        <DropdownButton
                                                                            size="sm"
                                                                            title="Actions"
                                                                            key="activeCurrency"
                                                                            className="customone"
                                                                        >
                                                                            <Dropdown.Item eventKey="1">Set Rate</Dropdown.Item>
                                                                        </DropdownButton>
                                                                    </td>
                                                                </tr>
                                                                
                                                            </tbody>
                                                        </TableComponent>
                                                        
                                                        </div>
                                                    </Accordion.Collapse>
                                                </Accordion>
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

export default GeneralCurrency;