import * as React from 'react';
// import { NavLink} from 'react-router-dom';
import {Fragment} from "react";
import {NavLink} from 'react-router-dom';
import "./mainmenu.scss"; 

import {menuList} from './menu_structures/menu'
class MainMenu extends React.Component{
    constructor(props) {
        super(props);
        
        this.state={
            user:''
        }

        this.userPermissions =  JSON.parse(localStorage.getItem("x-u-perm"))

        
       
    }


    renderMainNav(){
        let allMenu = menuList,
            allMenuGroups = [],
            allUSerPermissionGroups = [],
            allUSerPermissions =[];
            
            allMenu.map(eachMenu=>{
                if(allMenuGroups.indexOf(eachMenu.menuGroup)===-1){
                    allMenuGroups.push(eachMenu.menuGroup)
                }
                
            })

            this.userPermissions.map(eachPermission=>{
                if(allUSerPermissionGroups.indexOf(eachPermission.groupName)===-1){
                    allUSerPermissionGroups.push(eachPermission.groupName)
                }
                allUSerPermissions.push(eachPermission.permissionCode)
            })

            // console.log("All menu groups", allMenuGroups);
            // console.log("All Permission groups", allUSerPermissionGroups);
            // console.log("All user Permissions", allUSerPermissions);
        return(
            <div className="mainmenu-wrap">
                <ul className="nav">
                    {/* <li className="nav-item">
                        <NavLink to={eachSubMenu.subMenuRoute}>{eachSubMenu.subMenuLabel}</NavLink>
                    </li> */}
                    {
                        allMenu.map((eachGroup, menuIdx) =>{
                           
                            // if(allUSerPermissionGroups.indexOf(eachGroup.menuGroup)> -1 ){
                                if(eachGroup.hasSubMenu && eachGroup.permissionCode!==undefined && (allUSerPermissions.indexOf(eachGroup.permissionCode) > -1 && eachGroup.allowedPermissions ===undefined)){
                                    return (
                                        <li key={menuIdx} className="nav-item">
                                            <span>{eachGroup.mainMenu}</span>
                                            <ul>
                                                {
                                                    eachGroup.subMenus.map((eachSubMenu, submenuIdx)=>{
                                                        if(eachSubMenu.permissionCode!==undefined && allUSerPermissions.indexOf(eachSubMenu.permissionCode) > -1){
                                                            return(
                                                                <li key={submenuIdx}>
                                                                    <NavLink to={eachSubMenu.subMenuRoute}>{eachSubMenu.subMenuLabel}</NavLink>
                                                                </li>
                                                            )
                                                        }

                                                        if(eachSubMenu.permissionCode ===undefined){
                                                            return(
                                                                <li key={submenuIdx}>
                                                                    <NavLink to={eachSubMenu.subMenuRoute}>{eachSubMenu.subMenuLabel}</NavLink>
                                                                </li>
                                                            )
                                                        }
                                                    })
                                                }

                                            </ul>
                                        </li>
                                        
                                    )
                                }

                                if(eachGroup.hasSubMenu  && eachGroup.allowedPermissions !==undefined){
                                    let permissionsAllowed = [];
                                    
                                    permissionsAllowed = allUSerPermissions.filter(function(n) {
                                            return eachGroup.allowedPermissions.indexOf(n) !== -1;
                                        })
                                    
                                    
                                    if(permissionsAllowed.length>=1){
                                    //    console.log("kakakaka dhsdhhiisd", permissionsAllowed);
                                        return (
                                            <li key={menuIdx} className="nav-item">
                                                <span>{eachGroup.mainMenu}</span>
                                                <ul>
                                                    {
                                                        eachGroup.subMenus.map((eachSubMenu, submenuIdx)=>{
                                                            if(eachSubMenu.permissionCode!==undefined && allUSerPermissions.indexOf(eachSubMenu.permissionCode) > -1){
                                                                return(
                                                                    <li key={submenuIdx}>
                                                                        <NavLink exact to={eachSubMenu.subMenuRoute}>{eachSubMenu.subMenuLabel}</NavLink>
                                                                    </li>
                                                                )
                                                            }

                                                            if(eachSubMenu.permissionCode ===undefined){
                                                                return(
                                                                    <li key={submenuIdx}>
                                                                        <NavLink exact to={eachSubMenu.subMenuRoute}>{eachSubMenu.subMenuLabel}</NavLink>
                                                                    </li>
                                                                )
                                                            }
                                                        })
                                                    }

                                                </ul>
                                            </li>
                                            
                                        )
                                    }
                                }

                                if(!eachGroup.hasSubMenu && eachGroup.permissionCode!==undefined){
                                    if(allUSerPermissions.indexOf(eachGroup.permissionCode) > -1 || eachGroup.permissionCode==="universal"){
                                        return (
                                            <li key={menuIdx} className="nav-item">
                                                <NavLink to={eachGroup.menuRoute}>{eachGroup.mainMenu}</NavLink>
                                            </li>
                                            
                                        )
                                    }
                                }
                            // }else{
                            //     return null
                            // }

                        })
                    }
                    {/* <li className="nav-item">
                        <NavLink to={'/dashboard'}>Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <span>Clients</span>
                        <ul>
                            <li>
                                <NavLink to="/active-clients">Active</NavLink>
                            </li>
                            <li>
                                <NavLink to="/inactive-clients">Inactive</NavLink>
                            </li>
                            <li>
                                <NavLink to="/clients-pending-approval">Pending approval</NavLink>
                            </li>
                            <li>
                                <NavLink to="/clients-exited">Exited</NavLink>
                            </li>
                            <li>
                                <NavLink to="/clients-blacklisted">Blacklisted</NavLink>
                            </li>
                            <li>
                                <NavLink to="/clients">All customers</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <span>Loans</span>
                       
                        <ul>
                            <li>
                                <NavLink exact to="/all-loans/pending">Pending Approval</NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/all-loans/approved">Approved</NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/all-loans/rejected">Rejected</NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/all-loans/active">Active</NavLink>
                            </li>
                            
                            <li>
                                <NavLink exact to="/all-loans/arrears">In Arears</NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/all-loans/closed">Closed</NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/all-loans/closed-off">Closed Written Off</NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/all-loans/closed-withdrawn">Closed Withdrawn</NavLink>
                            </li>
                            <li>
                                <NavLink exact to="/all-loans">All Loans</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <span>Deposits</span>
                        <ul>
                            <li>
                                <NavLink to="/deposits">All Deposits</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <span>Disbursement</span>
                        <ul>
                            <li>
                                <NavLink exact to="/disbursements">All Disbursements</NavLink>
                                <NavLink exact to="/disbursements/initiate">Initiate Disbursements</NavLink>
                                <NavLink exact to="/disbursements/pending-review">Pending Review</NavLink>
                                <NavLink exact to="/disbursements/pending-approval">Pending Approval</NavLink>
                                <NavLink exact to="/disbursements/nip-requests">NIP Request</NavLink>
                            </li>
                        </ul>

                    </li>
                    <li className="nav-item">
                        <span>Loan Transactions</span>
                        <ul>
                            <li>
                                <NavLink to="/loan-transactions">All Loan Transactions</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <span>Deposit Transactions</span>
                        <ul>
                            <li>
                                <NavLink to="/deposit-transactions">All Deposit Transactions</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <span>Activities</span>
                        <ul>
                            <li>
                                <NavLink to="/activities">All Activities</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <span>Branches</span>
                        <ul>
                            <li>
                                <NavLink to="/branches">All Branches</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <span>Users</span>
                        <ul>
                            <li>
                                <NavLink to="/user-management">All Users</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <span>Communications</span>
                        <ul>
                            <li>
                                <NavLink exact to="/communications">All Communications</NavLink>
                                <NavLink to="/communications/emails">Email</NavLink>
                                <NavLink to="/communications/sms">SMS</NavLink>
                                <NavLink to="/communications/webhooks">Web Hooks</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/accounts'}>Accounting</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/administration/general'}>Administration</NavLink>
                    </li> */}
                </ul>
                
            </div>
        )
        

    }

  
    componentDidMount() {
    }


    render() {
        
        
        return (
            <Fragment>
                
                <div className="menu-container">
                    <div className="content-container">
                        <div className="row">
                            {this.renderMainNav()}

                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}




export default MainMenu;
