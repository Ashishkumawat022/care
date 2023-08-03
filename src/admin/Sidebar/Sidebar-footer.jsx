import { NavLink } from "react-router-dom";
import { AiOutlinePoweroff } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { logoutAdmin } from "../../utils/logoutadmin";

const SidebarFooter = (props) => {
  console.log(props.list.slice(9, 10), "SidebarFooter");
  return (
    <div className="sidebar-footer">
      {/* {props.list.slice(9, 10).map((item, index) =>)} */}
      <NavLink to="/admin/settings" className="link" title="Settings">
        <AiFillSetting />
      </NavLink>
      <NavLink to="/admin/" className="link" title="Help Resources">
        <BiHelpCircle />
      </NavLink>
      <NavLink
        onClick={logoutAdmin}
        to="/admin/login"
        className="link"
        title="Logout"
      >
        <AiOutlinePoweroff />
      </NavLink>
    </div>
  );
};

export default SidebarFooter;
