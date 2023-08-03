import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../../loader.js";
import { AiFillSetting } from "react-icons/ai";
import { AiOutlinePoweroff } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import SidebarItem from "./sidebarItem.jsx";
import { modules } from "../../constants/constants.js";

function Sidebar() {
  const history = useHistory();
  return (
    <aside className="left-sidebar col-md-4">
      <div className="scroll-sidebar">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            <h5>Subscription Hub</h5>
            {modules.slice(0, 6).map((item, index) => (
              <SidebarItem
                key={index}
                links={item.link}
                src={item.src}
                sidebarName={item.label}
              />
            ))}
            <h5 className="mt-5"></h5>
            {modules.slice(6, 9).map((item, index) => (
              <SidebarItem
                key={index}
                links={item.link}
                src={item.src}
                sidebarName={item.label}
              />
            ))}
          </ul>
        </nav>
      </div>
      <div className="sidebar-footer">
        <Link
          to="/superadmin/settings"
          className="link"
          style={{ color: "white" }}
          title="Setting"
        >
          <AiFillSetting />
        </Link>
        <NavLink to="#" className="link" title="Help Resources">
          <BiHelpCircle />
        </NavLink>
        <Link
          to="/superadmin/login"
          className="link"
          style={{ color: "white" }}
          title="Logout"
        >
          <AiOutlinePoweroff
            onClick={() => {
              localStorage.removeItem("superadmin_token");
              localStorage.removeItem("__csadmin__d");
              history.replace("/superadmin/login");
            }}
          />
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
