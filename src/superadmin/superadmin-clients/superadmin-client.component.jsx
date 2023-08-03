import React, { useState, useEffect } from "react";
import CardTitle from "../../components/card-title/card-title.component";
import { Accordion } from "react-bootstrap";
import Customdatatable from "../../components/customtable/customtable";
import axios from "axios";
import CommonTable from "../../components/customtable/CommonTable";
import ClientsTable from "./ClientsTable";

export default function ClientsOfSuperadmin() {
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
        let planId = [];
        let ownersData = [];
        responseData.forEach((elem) => {
          elem.subscriptionPlanData?.forEach((item) => {
            if (item.goCardLess_customer_id) {
              planId.push(item.goCardLess_customer_id);
            }
            if (item.stripe_customer_id) {
              planId.push(item.stripe_customer_id);
            }
          });
        });
        responseData.forEach((element) => {
          ownersData.push({
            id: element._id,
            firstname: element.firstName?.trim(),
            email: element.email,
            companyName: element?.subscriptionPlanData[0]?.companyName,
            creationDate: element.createdAt,
            noofSites: element?.subscriptionPlanData.length,
            monthlyFees: 0,
            status: true,
            redirectionLink: `/superadmin/clientdetails/${element?.subscriptionPlanData[0]?.companyName}/${element._id}/overview`,
            state: planId,
          });
        });
        setrowData(ownersData);
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
          <CardTitle titleName="Clients" />
          <ClientsTable rows={rowsData} />
          {/* <Customdatatable rowsData={rowsData} headCells={headCells} /> */}
          {/* <CommonTable  rowsData={rowsData} headCells={headCells}/> */}
        </div>
      </div>
    </div>
  );
}
