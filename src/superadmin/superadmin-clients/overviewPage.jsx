import { useRouteMatch } from "react-router-dom";
import React, { useMemo, useState, useRef, useEffect } from "react";
import CardTitle from "../../components/card-title/card-title.component";
import Customdatatable from "../../components/customtable/customtable";
import { Accordion } from "react-bootstrap";
import { Fragment } from "react";
import cx from "./overviewPage.module.css";
import { NavLink } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom";

const headCells = [
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
  {
    id: "planid",
    numeric: true,
    disablePadding: false,
    label: "Plan ID",
  },
  {
    id: "startdate",
    numeric: true,
    disablePadding: false,
    label: "Start Date",
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
// const rowsData = [{
//     id: 1,
//     sitename: 'Orchard1',
//     subscriptionid: '100000001SUB03',
//     plantype: 'Advanced',
//     planid: 'SUB02',
//     startdate: '5th Febraury 2015',
//     trialdaysleft: 20,
//     monthlyfees: '-',
//     nextbillingdate: '-',
//     status: true,
//     redirectionLink: '/superadmin/clientsubplansdetails',
// }]

export default function OverviewPage() {
  const params = useParams();
  const [rowData, setRowData] = useState([]);

  const [rowsData, setRowsData] = useState([]);
  useEffect(() => {
    getAdminsbyOwnerId();
  }, []);
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.

  function getAdminsbyOwnerId() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getAdminsbyOwnerIdNoToken?ownerId=${params.id}`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        let subscriptionData = [];
        response.data.result[0]?.subscriptionPlanData?.map(
          (subscription, index) => {
            const createdAt = subscription.createdAt
              ? subscription.createdAt
              : 1662641365000;
            const date = new Date(createdAt);
            subscriptionData.push({
              id: subscription._id,
              sitename: subscription.careSiteName,
              subscriptionid: `100000001SUB0${index + 1}`,
              plantype: subscription.SubscriptionPlan,
              planid: subscription.planId,
              startdate: date.toLocaleString("en-US"),
              trialdaysleft: subscription.trialPeriod,
              monthlyfees: "-",
              nextbillingdate: "-",
              status: true,
              redirectionLink: `/superadmin/clientdetails/${response.data.result[0]._id}/subscription/${subscription._id}`,
            });
          }
        );
        setRowsData(subscriptionData);
        setRowData(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Fragment>
      <CardTitle titleName="" />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>key Contacts</Accordion.Header>
          <Accordion.Body>
            <div className={`col-12 col-md-12 col-lg-12 ${cx.cardBox}`}>
              <Row>
                {rowData.map((rowData, index) => {
                  return (
                    <Col lg={6} className={`${cx.cltDetails}`}>
                      <div key={index} className={`${cx.contractList}`}>
                        <img
                          src={`${process.env.PUBLIC_URL}/images/blog.jpg`}
                        />
                        <div className={`${cx.contentBody}`}>
                          <Row>
                            <Col lg={7}>
                              <h6>{`${rowData?.firstName?.trim()} ${rowData?.lastName?.trim()}`}</h6>
                              <p>{rowData.email}</p>
                            </Col>
                            <Col lg={5}>
                              <button className="btn">
                                {rowData.userType}
                              </button>
                              <p>{rowData?.mobileNo}</p>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Col>
                  );
                })}

                {/* <li className={`${cx.contractList}`}>
                                    <img src={`${process.env.PUBLIC_URL}/images/blog.jpg`} />
                                    <div className={`${cx.contentBody}`}>
                                        <Row>
                                            <Col lg={6}>
                                                <h6>John Ghrisham</h6>
                                                <p>john@orchard.com</p>
                                            </Col>
                                            <Col lg={6}>
                                                <button className="btn">Owner</button>
                                                <p>john@orchard.com</p>
                                            </Col>
                                        </Row>
                                    </div>
                                </li> */}
              </Row>
            </div>
            <div className="row" style={{ justifyContent: "space-between" }}>
              <div className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}>
                <h5>
                  Billing Address
                  <NavLink to="#" className={`${cx.editIcon}`}>
                    Edit
                  </NavLink>
                </h5>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <div className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}>
                <h5>
                  Billing Information
                  <NavLink to="#" className={`${cx.editIcon}`}>
                    Edit
                  </NavLink>
                </h5>
                <ul>
                  <li>Currency: GBP</li>
                  <li>Billng Method: Bank Direct Debit</li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Subscriptions</Accordion.Header>
          <Accordion.Body>
            <Customdatatable rowsData={rowsData} headCells={headCells} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Fragment>
  );
}
