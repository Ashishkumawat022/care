import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import CommonSettingsPage from "../Settings/commonsettingspage";

export default function SettingsDetails() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();
  console.log(path, url, "SettingsDetails");
  let roleAccess = JSON.parse(localStorage.getItem("__csadmin__d"));

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="card-body">
          <div className="top_menubar">
            <h4>Settings</h4>
            <ul
              className="nav nav-tabs ract_tab_list border-0"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item active" role="presentation">
                <Link to={`${url}/company`} className="nav-link">
                  Company
                </Link>
              </li>
              {roleAccess?.userType !== "customer_support" && (
                <li className="nav-item" role="presentation">
                  <Link to={`${url}/access-roles`} className="nav-link">
                    Access Roles
                  </Link>
                </li>
              )}

              <li className="nav-item" role="presentation">
                <Link to={`${url}/taxes`} className="nav-link">
                  Taxes
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link to={`${url}/currencies`} className="nav-link">
                  Currencies
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link to={`${url}/templates`} className="nav-link">
                  Templates
                </Link>
              </li>
            </ul>
          </div>

          <Switch>
            <Route exact path={path}>
              {/* <h3>Please select a topic.</h3> */}
            </Route>
            <Route path={`${path}/:topicId`}>
              <CommonSettingsPage />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
