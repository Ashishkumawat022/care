import React from "react";
import { NavLink } from "react-router-dom";
import "../AllActivity/AllActivity.css";
import { BsFilterSquare } from "react-icons/bs";
import AllEvents from "./AllEvents";
import { fetchGet } from "../../Apis/commonApis";

function AllActivity() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    getStripeEvents();
  }, []);

  const getStripeEvents = async () => {
    const result = await fetchGet("listAllEvents");
    let eventData = result.data.data;
    let stripeRowData = [];
    eventData.forEach((elem, i) => {
      stripeRowData.push({
        id: elem.id,
        eventType: elem.type,
        time: elem.created,
        source: "Stripe",
        eventId: `10001SUB100${i + 1}`,
      });
    });
    getGoCardEvents(stripeRowData);
  };

  const getGoCardEvents = async (stripeRowData) => {
    const result = await fetchGet("gocardLessEvents");
    let goCardEvents = result.data.events;
    let rowData = [];
    goCardEvents.forEach((elem, i) => {
      rowData.push({
        id: elem.id,
        eventType: elem.action,
        time: elem.created_at,
        source: "GoCardless",
        eventId: `10001SUB100${i + stripeRowData.length + 1}`,
      });
    });
    let newArray = [];
    newArray = newArray.concat(stripeRowData, rowData);
    setRows(newArray);
  };
  let roleAccess = JSON.parse(localStorage.getItem("__csadmin__d"));

  return (
    <div className="page-wrapper">
      {roleAccess?.role?.map((roletype) => {
        const allEventsAccess = roletype.Modules[6];
        if (allEventsAccess.access !== "full")
          return <div className="clickOff"></div>;
      })}
      <div className="container-fluid min_height">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">
              <div className="top_menubar" style={{ width: "auto" }}>
                <ul
                  className="nav nav-tabs ract_tab_list border-0"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      style={{ fontSize: "16px" }}
                      id="tabD-1"
                    >
                      All Events
                    </button>
                  </li>
                </ul>
              </div>

              <div className="float-end btns_head">
                <NavLink className="float-end filter_icon mt-1" to="#">
                  <BsFilterSquare />
                </NavLink>
                <ul className="filter_box">
                  <NavLink exact activeClassName="active" to="#">
                    Day
                  </NavLink>
                  <NavLink activeClassName="" to="#">
                    Week
                  </NavLink>
                  <NavLink activeClassName="" to="#">
                    Month
                  </NavLink>
                </ul>
              </div>
            </h4>
            <AllEvents rows={rows} />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllActivity;
