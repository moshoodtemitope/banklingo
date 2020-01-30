import * as React from 'react';

import {Fragment} from "react";

import "./administration.scss"; 
import { NavLink} from 'react-router-dom';

import warning from '../../assets/img/alert.svg'
class AdminNav extends React.Component{
    
    render() {
        return (
            
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
                <li>
                    <NavLink to={'/administration/uploaddata'}>Upload Data</NavLink>
                </li>
            </ul>
        );
    }
}

export default AdminNav;
