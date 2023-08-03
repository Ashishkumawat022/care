import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import "../../superadminstyle.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import cx from "./header.module.css";

function Header() {
  const history = useHistory();
  let roleAccess = JSON.parse(localStorage.getItem("__csadmin__d"));
  return (
    <>
      <header className={`topbar ${cx.superAdminHeader}`}>
        <nav className="navbar top-navbar navbar-expand-md navbar-dark">
          <div className="navbar-header">
            <button className="hemburger_menu">
              <GiHamburgerMenu />
            </button>
            <NavLink className="navbar-brand" to="/superadmin/dashboard">
              <b className="logo-icon">
                <img alt="" src={`${process.env.PUBLIC_URL}/images/logo.svg`} />
              </b>
            </NavLink>
            <NavLink
              className="topbartoggler d-block d-md-none waves-effect waves-light"
              to="/superadmin/dashboard"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="ti-more"></i>
            </NavLink>
          </div>
          <div className="navbar-collapse collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <h4>Hello! Mark</h4>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown create_list">
                {/* <h5>Hello! Mark</h5> */}
                <NavLink
                  className="nav-link waves-effect waves-dark"
                  to="#"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  SuperAdmin
                </NavLink>
              </li>

              <li className="nav-item dropdown profile">
                <NavLink
                  className="nav-link dropdown-toggle waves-effect waves-dark"
                  to="#"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/profle.jpg`}
                    alt=""
                    width="40"
                    className="profile-pic rounded-circle"
                  />
                </NavLink>
                <div className="dropdown-menu dropdown-menu-end user-dd animated flipInY">
                  <div className="d-flex no-block align-items-center p-3 bg-info text-white mb-2">
                    <div className="">
                      <img
                        src={`${process.env.PUBLIC_URL}/images/profle.jpg`}
                        alt="user"
                        className="rounded-circle"
                        width="60"
                      />
                    </div>
                    <div className="ms-2">
                      <h4 className="mb-0 text-white">
                        {roleAccess?.firstName} {roleAccess?.lastName}
                      </h4>
                      <p className=" mb-0">{roleAccess?.email}</p>
                    </div>
                  </div>
                  <NavLink className="dropdown-item" to="/superadmin/profile">
                    Profile
                  </NavLink>
                  <div className="dropdown-divider"></div>
                  <div className="pl-4 p-2">
                    <button
                      type="button"
                      className="btn d-block w-100 btn-info rounded-pill"
                      onClick={() => {
                        localStorage.removeItem("superadmin_token");
                        localStorage.removeItem("__csadmin__d");
                        history.replace("/superadmin/login");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}
export default Header;
