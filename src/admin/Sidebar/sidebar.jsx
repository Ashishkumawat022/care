import React from "react";
import SidebarFooter from "./Sidebar-footer";
import SidebarList from "./Sidebar-List";
import { modules } from "../../constants/roles";
import cx from "./sidebar.module.css";

function Sidebar() {
  return (
    <aside className={`left-sidebar col-md-4 ${cx.adminSidebar}`}>
      <SidebarList list={modules} />
      <SidebarFooter list={modules} />
    </aside>
  );
}

export default Sidebar;
