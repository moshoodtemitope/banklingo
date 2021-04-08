import * as React from 'react';

import {Fragment} from "react";

import "../administration.scss"; 
import { NavLink} from 'react-router-dom';


import {adminPlatformMenuList} from '../../../shared/elements/mainmenu/menu'
class PlaformNav extends React.Component{
    
    render() {
        let userPermissions =  JSON.parse(localStorage.getItem("x-u-perm"));
        let allMenu = adminPlatformMenuList,
            allMenuGroups = [],
            allUSerPermissionNames = [],
            allQuickMenus=[],
            allUSerPermissions =[];

            allMenu.map(eachMenu=>{
                if(allMenuGroups.indexOf(eachMenu.permissionName)===-1){
                    allMenuGroups.push(eachMenu.permissionName)
                }
                
            })

            userPermissions.map(eachPermission=>{
                if(allUSerPermissionNames.indexOf(eachPermission.permissionName)===-1){
                    allUSerPermissionNames.push(eachPermission.permissionName)
                }
                allUSerPermissions.push(eachPermission.permissionCode)
            })

        return (
            <div className="lowerlevel-menu">
                <ul className="nav">
                    {
                        allMenu.map((eachGroup, menuIdx) =>{
                            if(allUSerPermissionNames.indexOf(eachGroup.permissionName)> -1 ){
                                return(
                                    <li key={menuIdx}>
                                        <NavLink exact to={eachGroup.menuRoute}>{eachGroup.mainMenu}</NavLink>
                                    </li>
                                )
                            }
                            

                        })
                    }
                    {/* <li>
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
                    </li> */}
                </ul>
            </div>
        );
    }
}

export default PlaformNav;