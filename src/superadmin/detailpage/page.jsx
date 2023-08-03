import * as React from "react";
import cx from "./page.module.css";
import { NavLink } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

export default function Page() {
  return (
    <div className="page-wrapper">
      <div className="container-fluid min_height">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Coupon</h4>

            <div className="row" style={{ justifyContent: "space-between" }}>
              <div
                className={`col-12 col-md-12 col-lg-12 mt-3 mb-3 ${cx.cardBox}`}
              >
                <h4 style={{ color: "#9B51E0" }}>Referral Discount</h4>
              </div>

              <div className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}>
                <h5>
                  Plan Details
                  <NavLink to="#" className={`${cx.editIcon}`}>
                    Edit
                  </NavLink>
                </h5>
                <ul>
                  <li>Coupon Type: Referral Discount</li>
                  <li>Coupon ID: CU01</li>
                  <li>Coupon Creation Date: 12-08-2022, 10:00</li>
                  <li>Linked Plans: All</li>
                  <li>Add-ON Status: Active</li>
                </ul>
              </div>

              <div className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}>
                <h5>
                  Plan Details
                  <NavLink to="#" className={`${cx.editIcon}`}>
                    Edit
                  </NavLink>
                </h5>
                <ul>
                  <li>Coupon Type: Referral Discount</li>
                  <li>Coupon ID: CU01</li>
                  <li>Coupon Creation Date: 12-08-2022, 10:00</li>
                  <li>Linked Plans: All</li>
                  <li>Add-ON Status: Active</li>
                </ul>
              </div>

              <div className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}>
                <h5>
                  Key Contacts
                  <NavLink to="#" className={`${cx.editIcon}`}>
                    Edit
                  </NavLink>
                </h5>
                <ul>
                  <li className={`${cx.contractList}`}>
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
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
