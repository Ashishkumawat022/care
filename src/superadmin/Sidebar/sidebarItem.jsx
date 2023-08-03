import React from "react";
import { Fragment } from "react";
import { NavLink } from "react-router-dom";

export default function SidebarItem(props) {
  let { src, links, sidebarName } = props;
  let roleAccess = JSON.parse(localStorage.getItem("__csadmin__d"));

  return (
    <Fragment>
      {roleAccess?.role?.map((roletype) => {
        const sidebarAccess = roletype.Modules;
        return sidebarAccess.map((modules, i) => {
          if (modules.moduleName === sidebarName && modules.access !== "no")
            return (
              <li key={i} className="sidebar-item">
                <NavLink
                  className="sidebar-link waves-effect waves-dark sidebar-link"
                  to={links}
                  aria-expanded="false"
                >
                  <i>
                    <img alt={sidebarName} src={src} />
                  </i>
                  <span className="hide-menu">{sidebarName}</span>
                </NavLink>
              </li>
            );
        });
      })}
    </Fragment>
  );
}
