import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { NavLink } from "react-router-dom";
import "../Subscribers/subscribers.css";

import { BsFilterSquare } from "react-icons/bs";

import "ag-grid-community/dist/styles/ag-grid.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { MdKeyboardArrowRight } from "react-icons/md";
import axios from "axios";

const ChildMessageRenderer = (props) => {
  const invokeParentMethod = () => {
    props.context.methodFromParent(
      `Row: ${props.node.rowIndex}, Col: ${props.colDef.field}`
    );
  };

  return (
    <span>
      <button
        style={{}}
        onClick={invokeParentMethod}
        className="btn btn-sm btn_table btn-success"
      >
        Active
      </button>
      <NavLink
        className="table_arrow"
        to={`/superadmin/subscribers-details/${props.data._id}`}
      >
        <MdKeyboardArrowRight />
      </NavLink>
    </span>
  );
};

const SrNoRenderer = (props) => {
  return (
    <span>
      <strong>{props.node.rowIndex + 1}</strong>
    </span>
  );
};

const SubscriptionPlan = (props) => {
  return <span>{props.data.SubscriptionPlan}</span>;
};

function Subscribers() {
  const [rowData, setrowData] = useState([]);
  useEffect(() => {
    adminlisting();
    // getlocal()
  }, []);

  function adminlisting() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getOwners`,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("superadmin_token"),
      },
    };

    axios(config)
      .then(function (response) {
        setrowData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const pagination = true;
  const paginationPageSize = 10;

  const rowHeight = 55;

  return (
    <div className="page-wrapper">
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
                      Subscribers
                    </button>
                  </li>
                </ul>
              </div>
              <div className="float-end btns_head">
                <button className="btn btn-theme btn-sm">Add New Client</button>
                <NavLink className="float-end filter_icon" to="#">
                  <BsFilterSquare />
                </NavLink>
              </div>
            </h4>
            <div></div>
            <div
              className="ag-theme-alpine cts_datatable"
              style={{ height: 667 }}
            >
              <AgGridReact
                rowHeight={rowHeight}
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                rowData={rowData}
                components={{}}
                frameworkComponents={{
                  childMessageRenderer: ChildMessageRenderer,
                  srNoRenderer: SrNoRenderer,
                  subscriptionPlan: SubscriptionPlan,
                }}
              >
                {/* <AgGridColumn width={90} field="SrNo" cellRenderer="srNoRenderer" sortable={false} filter={false}></AgGridColumn> */}
                <AgGridColumn
                  width={200}
                  field="firstName"
                  sortable={false}
                  filter={false}
                ></AgGridColumn>
                <AgGridColumn
                  field="email"
                  sortable={false}
                  filter={false}
                ></AgGridColumn>
                <AgGridColumn
                  width={180}
                  field="PlanType"
                  cellRenderer="subscriptionPlan"
                  sortable={false}
                  filter={false}
                ></AgGridColumn>
                {/* <AgGridColumn width={140} field="TrialDaysLeft" sortable={false} filter={false}></AgGridColumn> */}
                {/* <AgGridColumn field="MonthlyFee" sortable={false} filter={false}></AgGridColumn> */}
                {/* <AgGridColumn width={200} field="TotalRevenue" sortable={false} filter={false}></AgGridColumn> */}
                <AgGridColumn
                  field="Status"
                  cellRenderer="childMessageRenderer"
                  colId="params"
                  sortable={true}
                  filter={true}
                ></AgGridColumn>
              </AgGridReact>
            </div>
          </div>
        </div>
        <p>
          The Subscribers (Service Providers) data is captured from the Website1
          when they start the plan. Developer to suggest what other information
          should be included in the Table
        </p>
      </div>
    </div>
  );
}

export default Subscribers;
