import { NavLink, useRouteMatch } from "react-router-dom";
import "./Profile.css";
import cx from "./sidecards.module.css";

export default function Billing() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();
  return (
<div className="mt-3 profileBox">
       <div className="col-md-5">
      <div className="row profileB">
        <div className="col-9">
          <ul>
            <li>
              <p><span className="themeColor">Billing Method:</span> Direct Debit</p>
              <p><NavLink to="#">Update</NavLink></p>
            </li>
            <li>
              <p><span className="themeColor">Billing Address:</span> 234 Glenfield Avenue, London HA2 0ES, UK</p>
              <p><NavLink to="#">Update</NavLink></p>
            </li>
          </ul>
          <h5 className="themeColor mt-3">Invoice History</h5>

          <ul>
            <li>
              <p>05.28.2022 — £ 120</p>
              <p><NavLink to="#">Invoice</NavLink></p>
            </li>
            <li>
              <p>05.28.2022 — £ 120</p>
              <p><NavLink to="#">Invoice</NavLink></p>
            </li>
            <li>
              <p>05.28.2022 — £ 120</p>
              <p><NavLink to="#">Invoice</NavLink></p>
            </li>
            <li>
              <p>05.28.2022 — £ 120</p>
              <p><NavLink to="#">Invoice</NavLink></p>
            </li>
            <li>
              <p>05.28.2022 — £ 120</p>
              <p><NavLink to="#">Invoice</NavLink></p>
            </li>
          </ul>

          <button className="btn">See More</button>

        </div>
      </div>
    </div>
    </div>
  );
}
