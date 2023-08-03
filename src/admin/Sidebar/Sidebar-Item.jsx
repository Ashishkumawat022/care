import { useState } from "react";
import { NavLink } from "react-router-dom";

const SidebarItem = (props) => {
  let [plantype, setplantype] = useState("");

  setTimeout(() => {
    setplantype(
      JSON?.parse(localStorage?.getItem("userData"))?.SubscriptionPlan
    );
  }, 600);

  let style = {
    "pointer-events": "none",
    opacity: 0.6,
  };

  let user = JSON?.parse(localStorage?.getItem("userData"));

  if (
    (props.links == "/admin/salesfunnel" ||
      props.links == "/admin/addmedicines") &&
    (plantype == "baseplan" || plantype == "advanced")
  ) {
    return (
      <li className={`sidebar-item`} style={style}>
        <NavLink
          className="sidebar-link waves-effect waves-dark sidebar-link"
          to={props.links}
          aria-expanded="false"
        >
          <img alt={props.sidebarName} src={props.src} />
          <span className="hide-menu">{props.sidebarName}</span>
        </NavLink>
      </li>
    );
  }

  if (
    (props.links == "/admin/messaging" || props.links == "/admin/invoicing") &&
    plantype == "baseplan"
  ) {
    return (
      <li className={`sidebar-item`} style={style}>
        <NavLink
          className="sidebar-link waves-effect waves-dark sidebar-link"
          to={props.links}
          aria-expanded="false"
        >
          <img alt={props.sidebarName} src={props.src} />
          <span className="hide-menu">{props.sidebarName}</span>
        </NavLink>
      </li>
    );
  }

  if (props.links == "/admin/report") {
    return (
      <>
        {" "}
        {user.role.map((roletype, index) => {
          const ReportsAccess = roletype.Modules[4];
          return (
            <>
              {ReportsAccess.access == "no" ? (
                <li className={`sidebar-item`} style={style} key={index}>
                  <NavLink
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    to={props.links}
                    aria-expanded="false"
                  >
                    <img alt={props.sidebarName} src={props.src} />
                    <span className="hide-menu">{props.sidebarName}</span>
                  </NavLink>
                </li>
              ) : (
                <li className={`sidebar-item ${plantype}`} key={index}>
                  <NavLink
                    className="sidebar-link waves-effect waves-dark sidebar-link"
                    to={props.links}
                    aria-expanded="false"
                  >
                    <img alt={props.sidebarName} src={props.src} />
                    <span className="hide-menu">{props.sidebarName}</span>
                  </NavLink>
                </li>
              )}
            </>
          );
        })}
      </>
    );
  }

  return (
    <li className={`sidebar-item ${plantype}`}>
      <NavLink
        className="sidebar-link waves-effect waves-dark sidebar-link"
        to={props.links}
        aria-expanded="false"
      >
        <img alt={props.sidebarName} src={props.src} />
        <span className="hide-menu">{props.sidebarName}</span>
      </NavLink>
    </li>
  );
};
export default SidebarItem;
