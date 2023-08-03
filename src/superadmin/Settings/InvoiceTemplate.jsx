import React, { useState } from "react";
import cx from "./invoices.module.css";
import { Col, Row } from "react-bootstrap";
import { fetch5 } from "../../Apis/commonApis";
import { useHistory, useLocation } from "react-router-dom";

export default function InvoiceTemplate() {
  const history = useHistory();
  const location = useLocation();
  let {
    amountHeader,
    discriptionHeader,
    _id: invoiceHeadersId,
    fromHeader,
    headerFor,
    invoiceDateHeader,
    invoiceDeadlineHeader,
    invoiceHeader,
    invoiceNoHeader,
    invoicePeriodHeader,
    qtyHeader,
    rateHeader,
    taxHeader,
    toHeader,
    totalHeader,
  } = location?.state;

  let editableData = {
    invoiceHeadersId: invoiceHeadersId,
    invoiceHeader: invoiceHeader,
    fromHeader: fromHeader,
    toHeader: toHeader,
    invoiceNoHeader: invoiceNoHeader,
    invoiceDateHeader: invoiceDateHeader,
    invoicePeriodHeader: invoicePeriodHeader,
    invoiceDeadlineHeader: invoiceDeadlineHeader,
    discriptionHeader: discriptionHeader,
    rateHeader: rateHeader,
    qtyHeader: qtyHeader,
    taxHeader: taxHeader,
    amountHeader: amountHeader,
    totalHeader: totalHeader,
  };

  const [editDetails, setEditDetails] = useState(editableData);
  const saveEditDetailHandler = async () => {
    const result = await fetch5(`createInvHeaders`, editDetails);
    if (result.status) {
      history.push("/superadmin/settings");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container-fluid min_height">
        <div className="card">
          <h4 className="card-title ms-4">
            Invoice Details
            <div
              style={{ textAlign: "center", color: "black" }}
              onBlur={(e) => {
                setEditDetails({
                  ...editDetails,
                  invoiceHeader: e.currentTarget.textContent?.trim(),
                });
              }}
              contentEditable
              suppressContentEditableWarning={true}
            >
              {editDetails?.invoiceHeader}
            </div>
            <div>
              <button type="button" onClick={saveEditDetailHandler}>
                {" "}
                Save{" "}
              </button>
            </div>
          </h4>

          <div className="card-body">
            <Row>
              <Col lg={10} className={`${cx.invoiceBody}`}>
                <Row style={{ justifyContent: "space-between" }}>
                  <Col lg={6} md={6} className={`${cx.left}`}>
                    <h6
                      className={`${cx.fweight} text-dark mb-4`}
                      onBlur={(e) => {
                        setEditDetails({
                          ...editDetails,
                          fromHeader: e.currentTarget.textContent?.trim(),
                        });
                      }}
                      contentEditable
                      suppressContentEditableWarning={true}
                    >
                      {editDetails?.fromHeader}
                    </h6>
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      placeholder="Your Company Name"
                    />
                    <textarea
                      className="form-control"
                      disabled
                      placeholder="Your Company Address"
                    ></textarea>
                    <input
                      type="email"
                      disabled
                      className="form-control"
                      placeholder="Your Company Email"
                    />
                  </Col>

                  <Col lg={6} md={6} className={`${cx.right}`}>
                    <h6
                      className={`d-flex justify-content-end${cx.fweight} text-dark mb-2 mt-2`}
                      onBlur={(e) => {
                        setEditDetails({
                          ...editDetails,
                          toHeader: e.currentTarget.textContent?.trim(),
                        });
                      }}
                      contentEditable
                      suppressContentEditableWarning={true}
                    >
                      {editDetails?.toHeader}
                    </h6>
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      placeholder="Recipent Name"
                    />
                    <textarea
                      className="form-control"
                      disabled
                      placeholder="Recipent Address"
                    ></textarea>
                    <input
                      type="email"
                      disabled
                      className="form-control"
                      placeholder="Recipent Email"
                    />
                    <input
                      type="email"
                      disabled
                      className="form-control"
                      placeholder="Recipent Telephone"
                    />
                  </Col>
                </Row>
                <Row className="justify-content-between">
                  <Col lg={6} md={6} className={`${cx.left}`}>
                    <ul>
                      <li
                        onBlur={(e) => {
                          setEditDetails({
                            ...editDetails,
                            invoicePeriodHeader:
                              e.currentTarget.textContent?.trim(),
                          });
                        }}
                        contentEditable
                        suppressContentEditableWarning={true}
                      >
                        <span className={`${cx.fweight} text-dark`}>
                          {editDetails?.invoicePeriodHeader}
                        </span>
                      </li>
                      <li>
                        {/* <span>{invoiceDetail.invoicePeriod}</span> */}
                      </li>
                    </ul>
                  </Col>
                  <Col lg={6} md={6} className={`${cx.right}`}>
                    <ul>
                      <li>
                        <span
                          className={`${cx.fweight} text-dark`}
                          onBlur={(e) => {
                            setEditDetails({
                              ...editDetails,
                              invoiceNoHeader:
                                e.currentTarget.textContent?.trim(),
                            });
                          }}
                          contentEditable
                          suppressContentEditableWarning={true}
                        >
                          {editDetails?.invoiceNoHeader}
                        </span>
                        <span
                          className={`${cx.fweight} text-dark`}
                          onBlur={(e) => {
                            setEditDetails({
                              ...editDetails,
                              invoiceDateHeader:
                                e.currentTarget.textContent?.trim(),
                            });
                          }}
                          contentEditable
                          suppressContentEditableWarning={true}
                        >
                          {editDetails?.invoiceDateHeader}
                        </span>
                      </li>
                      <li>
                        {/* <span>{invoiceDetail.invoiceNo}</span> */}
                        {/* <span>{invoiceDetail.invoiceDate.split("T")[0]}</span> */}
                      </li>
                      <li
                        onBlur={(e) => {
                          setEditDetails({
                            ...editDetails,
                            invoiceDeadlineHeader:
                              e.currentTarget.textContent?.trim(),
                          });
                        }}
                        contentEditable
                        suppressContentEditableWarning={true}
                      >
                        <span></span>
                        <span className={`${cx.fweight} text-dark`}>
                          {editDetails?.invoiceDeadlineHeader}
                        </span>
                      </li>
                      <li>
                        <span></span>
                        <span></span>
                      </li>
                    </ul>
                  </Col>
                </Row>
                <Row className="mt-5">
                  <div className="col-md-6">
                    <label
                      className="text-dark mb-2"
                      onBlur={(e) => {
                        setEditDetails({
                          ...editDetails,
                          discriptionHeader:
                            e.currentTarget.textContent?.trim(),
                        });
                      }}
                      contentEditable
                      suppressContentEditableWarning={true}
                    >
                      {editDetails?.discriptionHeader}
                    </label>
                  </div>
                  <div className="col-md-2">
                    <label
                      className="text-dark mb-2"
                      onBlur={(e) => {
                        setEditDetails({
                          ...editDetails,
                          rateHeader: e.currentTarget.textContent?.trim(),
                        });
                      }}
                      contentEditable
                      suppressContentEditableWarning={true}
                    >
                      {editDetails?.rateHeader}
                    </label>
                  </div>
                  <div className="col-md-2">
                    <label
                      className="text-dark mb-2"
                      onBlur={(e) => {
                        setEditDetails({
                          ...editDetails,
                          taxHeader: e.currentTarget.textContent?.trim(),
                        });
                      }}
                      contentEditable
                      suppressContentEditableWarning={true}
                    >
                      {editDetails?.taxHeader}
                    </label>
                  </div>
                  <div className="col-md-2">
                    <label
                      className="text-dark mb-2"
                      onBlur={(e) => {
                        setEditDetails({
                          ...editDetails,
                          amountHeader: e.currentTarget.textContent?.trim(),
                        });
                      }}
                      contentEditable
                      suppressContentEditableWarning={true}
                    >
                      {editDetails?.amountHeader}
                    </label>
                  </div>
                </Row>

                <Row>
                  <div className="col-md-6">
                    <input
                      type="text"
                      disabled
                      className={`form-control mb-3`}
                      placeholder=""
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      type="text"
                      disabled
                      className={`form-control mb-3`}
                      placeholder=""
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      type="text"
                      disabled
                      className={`form-control mb-3`}
                      placeholder=""
                    />
                  </div>
                  <div className="col-md-2">
                    <input
                      type="text"
                      disabled
                      className={`form-control mb-3`}
                      placeholder=""
                    />
                  </div>
                </Row>

                <Row>
                  <div className="col-md-9"></div>
                  <div className="col-md-3 mt-1">
                    <label
                      className="text-dark"
                      onBlur={(e) => {
                        setEditDetails({
                          ...editDetails,
                          totalHeader: e.currentTarget.textContent?.trim(),
                        });
                      }}
                      contentEditable
                      suppressContentEditableWarning={true}
                    >
                      {editDetails?.totalHeader}
                    </label>
                    <input
                      type="text"
                      disabled
                      className={`form-control`}
                      placeholder=""
                    />
                  </div>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
