import * as React from "react";

import { Fragment } from "react";

import "../administration.scss";
import { NavLink } from "react-router-dom";

import { adminGeneralMenuList } from "../../../shared/elements/mainmenu/menu_structures/menu";
class GeneralNav extends React.Component {
  render() {
    let userPermissions = JSON.parse(localStorage.getItem("x-u-perm"));
    let allMenu = adminGeneralMenuList,
      allMenuGroups = [],
      allUSerPermissionNames = [],
      allQuickMenus = [],
      allUSerPermissions = [];

    allMenu.map((eachMenu) => {
      if (allMenuGroups.indexOf(eachMenu.permissionName) === -1) {
        allMenuGroups.push(eachMenu.permissionName);
      }
    });

    userPermissions.map((eachPermission) => {
      if (
        allUSerPermissionNames.indexOf(eachPermission.permissionName) === -1
      ) {
        allUSerPermissionNames.push(eachPermission.permissionName);
      }
      allUSerPermissions.push(eachPermission.permissionCode);
    });

    return (
      <div className="lowerlevel-menu">
        <ul className="nav">
          {allMenu.map((eachGroup, menuIdx) => {
            if (allUSerPermissionNames.indexOf(eachGroup.permissionName) > -1) {
              return (
                <li key={menuIdx}>
                  <NavLink exact to={eachGroup.menuRoute}>
                    {eachGroup.mainMenu}
                  </NavLink>
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  }
}
export default GeneralNav;
