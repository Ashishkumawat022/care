import React from "react";
import cx from "./email.module.css";
import { Row, Col } from "react-bootstrap";

import { NavLink, useParams } from "react-router-dom";

// import { GiHamburgerMenu } from "react-icons/gi";

export default function EmailTemplates() {

  const { templateType } = useParams();

  return (
    <div className="page-wrapper">
      <div className="container-fluid min_height">
        <div className="card">
          <h4 className="card-title ms-4">
            {templateType} Template
            <div style={{ textAlign: "center", color: "black" }}></div>
          </h4>
          <div className="card-body">
            {templateType === 'Receipt Auto-payment' && <Row>
              <Col md={8} className="m-auto">
                <div className={`${cx.templetemodel} row`}>
                  <div className={`${cx.leftmodule} col-md-4 col-4`}>
                    <div className="navbar-header p-4">
                      <NavLink
                        className="navbar-brand"
                        to="#"
                      >
                        <b className="logo-icon">
                          <img
                            alt=""
                            src={`/images/logo.svg`}
                          />
                        </b>
                      </NavLink>
                      <p>Auriga Magnus Care Limited</p>
                    </div>
                    <div className={`${cx.logoicon}`}>
                      <img src={`/images/templet-img.svg`} alt="" />
                    </div>
                    <div>
                      <p style={{ fontSize: "16px" }}>Email Receipt</p>
                    </div>
                  </div>
                  <div className={`${cx.rightmodule} p-4 col-md-8 col-8`}>
                    <div>
                      <p>Date :</p>
                      <h5 style={{ fontSize: "25px" }} className="m-0 p-0">
                        Your subscription auto-payment has been successful.
                        Thank you!
                      </h5>
                      <ul>
                        <li>Receipt No. :</li>
                        <li>Invoice No. :</li>
                        <li>Payment Date :</li>
                        <li>Client Name :</li>
                        <li>Site Name :</li>
                      </ul>


                    </div>
                    <div className="d-flex justify-content-between mt-4 align-items-center">
                      <div>
                        <p className="m-0">Description
                        </p>
                      </div>
                      <div className={`${cx.dessec}`}>
                        <ul>
                          <li>Rate</li>
                          <li>Tax</li>
                          <li>Amount</li>
                        </ul>

                      </div>

                    </div>
                    <div className={`${cx.bottomdec}`}>
                      <input type="text" />
                      <input type="text" />
                      <input type="text" />
                      <div className="d-flex justify-content-end">
                        <input type="text" placeholder="Total" style={{ width: "50%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>}

            {templateType === 'Receipt Payment' && <Row className="mt-5">
              <Col md={8} className="m-auto">
                <div className={`${cx.templetemodel} row`}>
                  <div className={`${cx.leftmodule} col-md-4 col-4`}>
                    <div className="navbar-header p-4">
                      <NavLink
                        className="navbar-brand"
                        to="#"
                      >
                        <b className="logo-icon">
                          <img
                            alt=""
                            src={`/images/logo.svg`}
                          />
                        </b>
                      </NavLink>
                      <p>Auriga Magnus Care Limited</p>
                    </div>
                    <div className={`${cx.logoicon}`}>
                      <img src={`/images/templet-img.svg`} alt="" />
                    </div>
                    <div>
                      <p style={{ fontSize: "16px" }}>Email Receipt</p>
                    </div>
                  </div>
                  <div className={`${cx.rightmodule} p-4 col-md-8 col-8`}>
                    <div>
                      <p>Date :</p>
                      <h5 style={{ fontSize: "25px" }} className="m-0 p-0">
                        Thank you for the payment!
                      </h5>
                      <ul>
                        <li>Receipt No. :</li>
                        <li>Invoice No. :</li>
                        <li>Payment Date :</li>
                        <li>Client Name :</li>
                        <li>Site Name :</li>
                      </ul>


                    </div>
                    <div className="d-flex justify-content-between mt-4 align-items-center">
                      <div>
                        <p className="m-0">Description
                        </p>
                      </div>
                      <div className={`${cx.dessec}`}>
                        <ul>
                          <li>Rate</li>
                          <li>Tax</li>
                          <li>Amount</li>
                        </ul>

                      </div>

                    </div>
                    <div className={`${cx.bottomdec}`}>
                      <input type="text" />
                      <input type="text" />
                      <input type="text" />
                      <div className="d-flex justify-content-end">
                        <input type="text" placeholder="Total" style={{ width: "50%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>}

            {templateType === 'Credit Note' && <Row className="mt-5">
              <Col md={8} className="m-auto">
                <div className={`${cx.templetemodel} row`}>
                  <div className={`${cx.leftmodule} col-md-4 col-4`}>
                    <div className="navbar-header p-4">
                      <NavLink
                        className="navbar-brand"
                        to="#"
                      >
                        <b className="logo-icon">
                          <img
                            alt=""
                            src={`/images/logo.svg`}
                          />
                        </b>
                      </NavLink>
                      <p>Auriga Magnus Care Limited</p>
                    </div>
                    <div className={`${cx.logoicon}`}>
                      <img src={`/images/templet-img.svg`} alt="" />
                    </div>
                    <div>
                      <p style={{ fontSize: "16px" }}>Email Receipt</p>
                    </div>
                  </div>
                  <div className={`${cx.rightmodule} p-4 col-md-8 col-8`}>
                    <div>
                      <p>Date :</p>
                      <h5 style={{ fontSize: "25px" }} className="m-0 p-0">
                        This is to confirm the below mentioned refund to your chosen payment method. Please allow some time for it to be reflected in your account.
                      </h5>
                      <ul>
                        <li>Credit Note No. :</li>
                        <li>Receipt No. :</li>
                        <li>Invoice Reference :</li>
                        <li>Client Name :</li>
                        <li>Site Name :</li>

                        <li>Refund Date :</li>
                      </ul>


                    </div>
                    <div className="d-flex justify-content-between mt-4 align-items-center">
                      <div>
                        <p className="m-0">Description
                        </p>
                      </div>
                      <div className={`${cx.dessec}`}>
                        <ul>
                          <li>Rate</li>
                          <li>Tax</li>
                          <li>Amount</li>
                        </ul>

                      </div>

                    </div>
                    <div className={`${cx.bottomdec}`}>
                      <input type="text" />
                      <input type="text" />
                      <input type="text" />
                      <div className="d-flex justify-content-end">
                        <input type="text" placeholder="Total" style={{ width: "50%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>}

            {templateType === 'Subscription Expiry Email' && <Row className="mt-5">
              <Col md={8} className="m-auto">
                <div className={`${cx.templetemodel} row`}>
                  <div className={`${cx.leftmodule} col-md-4 col-4`}>
                    <div className="navbar-header p-4">
                      <NavLink
                        className="navbar-brand"
                        to="#"
                      >
                        <b className="logo-icon">
                          <img
                            alt=""
                            src={`/images/logo.svg`}
                          />
                        </b>
                      </NavLink>
                      <p>Auriga Magnus Care Limited</p>
                    </div>
                    <div className={`${cx.logoicon}`}>
                      <img src={`/images/templet-img.svg`} alt="" />
                    </div>
                    <div>
                      <p style={{ fontSize: "16px" }}>Email Receipt</p>
                    </div>
                  </div>
                  <div className={`${cx.rightmodule} p-4 col-md-8 col-8`}>
                    <div>
                      <p>Date :</p>
                      <h5 style={{ fontSize: "25px" }} className="m-0 p-0">
                        Payment for your subscription renewal did not go
                        through on your chosen payment method. Please ensure payment details are correct or updated.
                      </h5>
                      <ul>
                        <li>Invoice No. :</li>
                        <li>Invoice Deadline  :</li>
                        <li>Client Name :</li>
                        <li>Site Name :</li>
                      </ul>


                    </div>
                    <div className="d-flex justify-content-between mt-4 align-items-center">
                      <div>
                        <p className="m-0">Description
                        </p>
                      </div>
                      <div className={`${cx.dessec}`}>
                        <ul>
                          <li>Rate</li>
                          <li>Tax</li>
                          <li>Amount</li>
                        </ul>

                      </div>

                    </div>
                    <div className={`${cx.bottomdec}`}>
                      <input type="text" />
                      <input type="text" />
                      <input type="text" />
                      <div className="d-flex justify-content-end">
                        <input type="text" placeholder="Total" style={{ width: "50%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>}

            {templateType === 'Subscription Setup Failure Email' && <Row className="mt-5">
              <Col md={8} className="m-auto">
                <div className={`${cx.templetemodel} row`}>
                  <div className={`${cx.leftmodule} col-md-4 col-4`}>
                    <div className="navbar-header p-4">
                      <NavLink
                        className="navbar-brand"
                        to="#"
                      >
                        <b className="logo-icon">
                          <img
                            alt=""
                            src={`/images/logo.svg`}
                          />
                        </b>
                      </NavLink>
                      <p>Auriga Magnus Care Limited</p>
                    </div>
                    <div className={`${cx.logoicon}`}>
                      <img src={`/images/templet-img.svg`} alt="" />
                    </div>
                    <div>
                      <p style={{ fontSize: "16px" }}>Email Receipt</p>
                    </div>
                  </div>
                  <div className={`${cx.rightmodule} p-4 col-md-8 col-8`}>
                    <div>
                      <p>Date :</p>
                      <h5 style={{ fontSize: "25px" }} className="m-0 p-0">
                        Payment for your subscription renewal did not go
                        through on your chosen payment method. Please ensure payment details are correct or updated.
                      </h5>
                      <ul>

                        <li>Client Name :</li>
                        <li>Site Name :</li>
                      </ul>


                    </div>
                    <div className="d-flex justify-content-between mt-4 align-items-center">
                      <div>
                        <p className="m-0">Description
                        </p>
                      </div>
                      <div className={`${cx.dessec}`}>
                        <ul>
                          <li>Rate</li>
                          <li>Tax</li>
                          <li>Amount</li>
                        </ul>

                      </div>

                    </div>
                    <div className={`${cx.bottomdec}`}>
                      <input type="text" />
                      <input type="text" />
                      <input type="text" />
                      <div className="d-flex justify-content-end">
                        <input type="text" placeholder="Total" style={{ width: "50%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>}

            {templateType === 'New Subscription Email' && <Row className="mt-5">
              <Col md={8} className="m-auto">
                <div className={`${cx.templetemodel} row`}>
                  <div className={`${cx.leftmodule} col-md-4 col-4`}>
                    <div className="navbar-header p-4">
                      <NavLink
                        className="navbar-brand"
                        to="#"
                      >
                        <b className="logo-icon">
                          <img
                            alt=""
                            src={`/images/logo.svg`}
                          />
                        </b>
                      </NavLink>
                      <p>Auriga Magnus Care Limited</p>
                    </div>
                    <div className={`${cx.logoicon}`}>
                      <img src={`/images/templet-img.svg`} alt="" />
                    </div>
                    <div>
                      <p style={{ fontSize: "16px" }}>Email Receipt</p>
                    </div>
                  </div>
                  <div className={`${cx.rightmodule} p-4 col-md-8 col-8`}>
                    <div>
                      <p>Date :</p>
                      <h5 style={{ fontSize: "25px" }} className="m-0 p-0">
                        Congrats, Your subscription is now active!  Welcome to your new experience of care management with our powerful and intuitive platform.
                      </h5>
                      <ul>

                        <li>Client Name :</li>
                        <li>Site Name :</li>
                        <li>
                          Subscription Start Date :</li>
                      </ul>


                    </div>
                    <div className="d-flex justify-content-between mt-4 align-items-center">
                      <div>
                        <p className="m-0">Description
                        </p>
                      </div>
                      <div className={`${cx.dessec}`}>
                        <ul>
                          <li>Rate</li>
                          <li>Tax</li>
                          <li>Amount</li>
                        </ul>

                      </div>

                    </div>
                    <div className={`${cx.bottomdec}`}>
                      <input type="text" />
                      <input type="text" />
                      <input type="text" />
                      <div className="d-flex justify-content-end">
                        <input type="text" placeholder="Total" style={{ width: "50%" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>}

            {templateType === 'Subscription Deactivation Email' && <Row className="mt-5">
              <Col md={8} className="m-auto">
                <div className={`${cx.templetemodel} row`}>
                  <div className={`${cx.leftmodule} col-md-4 col-4`}>
                    <div className="navbar-header p-4">
                      <NavLink
                        className="navbar-brand"
                        to="#"
                      >
                        <b className="logo-icon">
                          <img
                            alt=""
                            src={`/images/logo.svg`}
                          />
                        </b>
                      </NavLink>
                      <p>Auriga Magnus Care Limited</p>
                    </div>
                    <div className={`${cx.logoicon}`}>
                      <img src={`/images/templet-img.svg`} alt="" />
                    </div>
                    <div>
                      <p style={{ fontSize: "16px" }}>Email Receipt</p>
                    </div>
                  </div>
                  <div className={`${cx.rightmodule} p-4 col-md-8 col-8`}>
                    <div>
                      <p>Date :</p>
                      <h5 style={{ fontSize: "25px" }} className="m-0 p-0">
                        Your subscription has been deactivated 😢. You have deactivated your subscription so it will end after your current period is done. If there's anything we could have done to make your subscription better, or if there's anything else we can do to assist, please email us to let us know. </h5>
                      <ul>

                        <li>Client Name :</li>
                        <li>Site Name :</li>
                        <li>
                          Subscription Name :</li>
                        <li>
                          Subscription End Date :</li>
                      </ul>


                    </div>

                  </div>
                </div>
              </Col>
            </Row>}
          </div>
        </div>
      </div>
    </div>
  );
}
