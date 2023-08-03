import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import CommonProfilepages from "../Profile/CommonProfilepages";
import Profile from "../Profile/Profile";

export default function ProfileRoutes() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  const history = useHistory();
  let { path, url } = useRouteMatch();
  console.log(path, url, "Profileroutes");

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="card-body">
          <div className="top_menubar">
            <h4>Profile Details</h4>
            <ul
              className="nav nav-tabs ract_tab_list border-0"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item active" role="presentation">
                <Link to={`${url}/subscription`} className="nav-link">
                  Subscription
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link to={`${url}`} className="nav-link">
                  Profile
                </Link>
              </li>

              <li className="nav-item" role="presentation">
                <Link to={`${url}/billing`} className="nav-link">
                  Billing
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <span
                  className="nav-link"
                  onClick={() => {
                    localStorage.removeItem("care_admin_token");
                    localStorage.removeItem("companyName");
                    localStorage.removeItem("carehomeId");
                    localStorage.removeItem("carehomeName");
                    localStorage.removeItem("userData");
                    localStorage.removeItem("carefacility");
                    history.push("/admin/login");
                  }}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>

          <Switch>
            <Route exact path={path}>
              <Profile />
            </Route>
            <Route path={`${path}/:topicId`}>
              <CommonProfilepages />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
