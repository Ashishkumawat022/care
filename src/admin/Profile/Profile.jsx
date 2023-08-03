import { NavLink, useRouteMatch } from "react-router-dom";
import "./Profile.css";
import cx from "./sidecards.module.css";

export default function Profile() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  return (
    <div className="mt-3 profileBox">
      <div className="col-md-5">
        <div className="row profileB">
          <div className="col-9">
            <ul>
              <li>
                <p>
                  <span className="themeColor">Email:</span> michelle@gmail.com
                </p>
              </li>
              <li>
                <p>
                  <span className="themeColor">Password:</span> **********
                </p>
                <p>
                  <NavLink to="#">Change</NavLink>
                </p>
              </li>
              <li>
                <p>
                  <span className="themeColor">Tel:</span> +445657738
                </p>
                <p>
                  <NavLink to="#">Update</NavLink>
                </p>
              </li>
              <li>
                <p>
                  <span className="themeColor">Company Name:</span> Dove Care
                  Homes
                </p>
                <p>
                  <NavLink to="#">Update</NavLink>
                </p>
              </li>
              <li>
                <p>
                  <span className="themeColor">Company Address:</span> 234
                  Glenfield Avenue, London HA2 0ES, UK
                </p>
                <p>
                  <NavLink to="#">Update</NavLink>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
