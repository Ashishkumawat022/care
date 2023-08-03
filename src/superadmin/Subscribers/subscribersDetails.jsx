import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../Subscribers/subscribers.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { MdKeyboardArrowRight } from "react-icons/md";

const SrNoRenderer = (props) => {
  return (
    <span>
      <strong>{props.node.rowIndex + 1}</strong>
    </span>
  );
};

const CareSiteName = (props) => {
  return <span>{props.data.careSiteName}</span>;
};

const CareSiteType = (props) => {
  return <span>{props.data.carefacility}</span>;
};

const SiteCreationDate = (props) => {
  // const date = Date.parseExact(props.data.siteCreationDate, 'MM/dd/yyyy').toString('dd/MM/yyyy');

  return <span>{props.data.siteCreationDate}</span>;
};

const SubscriptionPlan = (props) => {
  return <span>{props.data.SubscriptionPlan}</span>;
};

const TrialPeriod = (props) => {
  return <span>{props.data.trialPeriod}</span>;
};

const PlanStartDate = (props) => {
  const timestamp = props.data.planstartDate
    ? props.data.planstartDate
    : 1662641365000;
  const date = new Date(timestamp);
  return <span>{date.toLocaleString("en-US")}</span>;
};

const PlanEndDate = (props) => {
  const timestamp = props.data.planendDate
    ? props.data.planendDate
    : 1662641365000;
  const date = new Date(timestamp);
  return <span>{date.toLocaleString("en-US")}</span>;
};

const FriendsAndFamilyUsers = (props) => {
  return <span>{props.data.NoOfuser}</span>;
};

const Totalnoofbeds = (props) => {
  return <span>{props.data.totalBeds}</span>;
};

function SubscribersDetails() {
  const param = useParams();
  const [rowData, setrowData] = useState([]);

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
          to={`/superadmin/multisite-details/${param.id}`}
        >
          <MdKeyboardArrowRight />
        </NavLink>
      </span>
    );
  };
  useEffect(() => {
    getOwnersById();
    // getlocal()
  }, []);

  function getOwnersById() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getOwners?ownerId=${param.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("superadmin_token"),
      },
    };

    axios(config)
      .then(function (response) {
        setrowData(response.data.data[0].subscriptionPlanData);
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
              <div className="top_menubar position-relative">
                <NavLink to="/superadmin/subscribers" className="back">
                  <IoIosArrowBack />
                  Back
                </NavLink>
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
                      Subscriber's Details
                    </button>
                  </li>
                </ul>
              </div>
            </h4>

            {/* Subscribers plan's listed care facilities & care agency  */}

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
                  careSiteType: CareSiteType,
                  careSiteName: CareSiteName,
                  siteCreationDate: SiteCreationDate,
                  trialPeriod: TrialPeriod,
                  planStartDate: PlanStartDate,
                  planEndDate: PlanEndDate,
                  friendsAndFamilyUsers: FriendsAndFamilyUsers,
                  totalnoofbeds: Totalnoofbeds,
                }}
              >
                {/* <AgGridColumn width={90} field="SrNo" cellRenderer="srNoRenderer" sortable={false} filter={false}></AgGridColumn> */}
                <AgGridColumn
                  width={200}
                  field="careSiteName"
                  cellRenderer="careSiteName"
                  sortable={false}
                  filter={false}
                ></AgGridColumn>
                <AgGridColumn
                  field="Care Site Type"
                  cellRenderer="careSiteType"
                  sortable={false}
                  filter={false}
                ></AgGridColumn>
                <AgGridColumn
                  field="Site Creation Date"
                  cellRenderer="siteCreationDate"
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
                <AgGridColumn
                  width={140}
                  field="TrialPeriod"
                  cellRenderer="trialPeriod"
                  sortable={false}
                  filter={false}
                ></AgGridColumn>
                <AgGridColumn
                  field="plan Start Date"
                  cellRenderer="planStartDate"
                  sortable={false}
                  filter={false}
                ></AgGridColumn>
                <AgGridColumn
                  width={200}
                  field="plan End Date"
                  cellRenderer="planEndDate"
                  sortable={false}
                  filter={false}
                ></AgGridColumn>
                <AgGridColumn
                  width={200}
                  field="friends&Family Users"
                  cellRenderer="friendsAndFamilyUsers"
                  sortable={false}
                  filter={false}
                ></AgGridColumn>
                <AgGridColumn
                  width={200}
                  field="totalNoofBeds"
                  cellRenderer="totalnoofbeds"
                  sortable={false}
                  filter={false}
                ></AgGridColumn>
                <AgGridColumn
                  field="Status"
                  cellRenderer="childMessageRenderer"
                  sortable={true}
                  filter={true}
                ></AgGridColumn>
              </AgGridReact>
            </div>
            <div className="details_body">
              <p>
                This section shows detailed information on the Subscriber and
                will also show all Client and Care Team members created by the
                Subscriber (including name, date of creation etc). Developer to
                suggest and implement the details and layout of this section.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscribersDetails;
