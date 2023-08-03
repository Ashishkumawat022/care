// import { useRouteMatch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Customdatatable from "../../components/customtable/customtable";
import axios from "axios";

const headCells = [
  {
    id: "companyname",
    numeric: false,
    disablePadding: true,
    label: "Company Name",
  },
  {
    id: "sitename",
    numeric: false,
    disablePadding: true,
    label: "Site Name",
  },
  {
    id: "subscriptionid",
    numeric: true,
    disablePadding: false,
    label: "Subscription ID",
  },
  {
    id: "plantype",
    numeric: true,
    disablePadding: false,
    label: "Plan Type",
  },
  // {
  //     id: "planid",
  //     numeric: true,
  //     disablePadding: false,
  //     label: "Plan ID",
  // },
  {
    id: "startdate",
    numeric: true,
    disablePadding: false,
    label: "Start Date",
  },
  {
    id: "activationdate",
    numeric: true,
    disablePadding: false,
    label: "Activation Date",
  },
  {
    id: "trialdaysleft",
    numeric: true,
    disablePadding: false,
    label: "Trial Days Left",
  },
  {
    id: "monthlyfees",
    numeric: true,
    disablePadding: false,
    label: "Monthly Fees",
  },
  {
    id: "nextbillingdate",
    numeric: true,
    disablePadding: false,
    label: "Next Billing Date",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
];

export default function Subscription() {
  let [rowsData, setrowData] = useState([]);

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
        const responseData = response.data.data;
        let subscriptiondata = [];
        responseData.forEach((element) => {
          if (element?.subscriptionPlanData.length > 0) {
            element?.subscriptionPlanData.forEach((subelement, index) => {
              const createdAt = subelement.createdAt
                ? subelement.createdAt
                : 1662641365000;
              const date = new Date(createdAt);
              subscriptiondata.push({
                id: subelement._id,
                clientId: element._id,
                companyname: subelement?.companyName,
                sitename: subelement.careSiteName,
                subscriptionid: `100000001SUB0${index + 1}`,
                plantype: subelement.SubscriptionPlan,
                planid: subelement.planId,
                startdate: date.toLocaleString("en-US"),
                trialdaysleft: subelement.trialPeriod,
                activationdate: "-",
                monthlyfees: "-",
                nextbillingdate: "-",
                status: subelement?.isActive,
                redirectionLink: `/superadmin/clientdetails/${element._id}/subscription/${subelement._id}`,
                // firstname: element.firstName?.trim(),
                // email: element.email,
                // creationDate: element.createdAt,
                // noofSites: element?.subscriptionPlanData.length,
              });
            });
          }
        });
        setrowData(subscriptiondata);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  let roleAccess = JSON.parse(localStorage.getItem("__csadmin__d"));

  return (
    <div className="page-wrapper">
      {roleAccess?.role?.map((roletype) => {
        const clientSectionAccess = roletype.Modules[2];
        if (clientSectionAccess.access !== "full")
          return <div className="clickOff"></div>;
      })}
      <div className="card">
        <div className="card-body">
          <Customdatatable rowsData={rowsData} headCells={headCells} />
        </div>
      </div>
    </div>
  );
}
