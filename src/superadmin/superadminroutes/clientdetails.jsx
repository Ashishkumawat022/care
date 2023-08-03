import { useEffect, useState } from "react";
import { Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";
import CommonClientPage from "../superadmin-clients/commonclientpage";
import { fetchGet } from "../../Apis/commonApis";

export default function ClientDetails() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url, ...res } = useRouteMatch();
  const params = useParams();

  const [careSiteNames, setCareSiteNames] = useState([]);
  const [careSiteId, setCareSiteId] = useState(null);

  useEffect(() => {
    fetchCareSiteNames();
  }, [])

  const fetchCareSiteNames = async () => {
    let result = await fetchGet(`getCareHomeAndItsSites?adminId=${params.id}`);
    let names = [];
    setCareSiteId(result?.data[0]?._id);
    result.data.forEach((elem) => {
      names.push({ value: elem._id, label: elem.careSiteName });
    });
    setCareSiteNames(names);
  };

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="card-body">
          <div className="top_menubar">
            <div className="d-flex">
              <h2>{params.copanyName}</h2>
              <select
                id="event"
                name="event"
                className="border-0 default_color ms-3"
                onChange={(e) => setCareSiteId(e.target.value)}
              >
                {careSiteNames.map(item => {
                  return <option key={item.value} value={item.value}>{item.label}</option>
                })
                }
              </select>
            </div>
            <ul
              className="nav nav-tabs ract_tab_list border-0"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item active" role="presentation">
                <Link to={`${url}/overview`} className="nav-link">
                  Overview
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link to={`${url}/events`} className="nav-link">
                  Events
                </Link>
              </li>

              <li className="nav-item" role="presentation">
                <Link to={`${url}/emails`} className="nav-link">
                  Emails
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link to={`${url}/ff`} className="nav-link">
                  F&F
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link to={`${url}/notes`} className="nav-link">
                  Notes
                </Link>
              </li>
            </ul>
          </div>

          <Switch>
            <Route exact path={path}>
              {/* <h3>Please select a topic.</h3> */}
            </Route>
            <Route path={`${path}/:topicId`}>
              <CommonClientPage careSiteId={careSiteId}/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
