import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { NavLink } from "react-router-dom";
import "../Invoicing/invoicing.css";
// import {BsFilterSquare} from "react-icons/bs";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import Modal from "react-bootstrap/Modal";
import DataTable from "./configInvoiceUser";
import AutoGenerateInvoiceTable from "./autogenerateInvoice";
import cx from "./sidecards.module.css";
import Select from "react-select";
import Dropdown from "react-bootstrap/Dropdown";
import { BsSearch } from "react-icons/bs";
import Invoices from "../../components/invoiceTemplate/adminInvoicetemplate";

// import {MdKeyboardArrowRight} from 'react-icons/md';

function Invoicing() {
  const childRef = useRef(null);

  const [showinvoiceTemplate, setShowInvoiceTemplate] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ------------ Basic Care Home Invoice Details (Left Side) of Config (Show and Hide Handler) ------------- //
  const [showcarehomeDetailsModal, setshowcarehomeDetailsModal] =
    useState(false);
  const handleClosecarehomeDetailsModal = () =>
    setshowcarehomeDetailsModal(false);
  const handleshowcarehomeDetailsModal = () =>
    setshowcarehomeDetailsModal(true);

  // ----------------------------  Edit Basic Care Home Invoice Details Fields  ------------------------------ //

  const [invNumFormat, setinvNumFormat] = useState("");
  const [careHomeInvoiceDetail, setCareHomeInvoiceDetail] = useState([]);
  const [specificInvoiceId, setSpecificInvoiceId] = useState("");

  const [taxRate, taxRateChange] = useState("");

  // -----------  Care Home Invoice Emails Detail (Left Side) of Config (Show and Hide Handler) ------------ //

  const [showcarehomeEmailsDetailsModal, setshowcarehomeEmailsDetailsModal] =
    useState(false);
  const handleClosecarehomeEmailsDetailsModal = () =>
    setshowcarehomeEmailsDetailsModal(false);
  const handleshowcarehomeEmailsDetailsModal = () =>
    setshowcarehomeEmailsDetailsModal(true);

  // ----------------------------  Edit Care Home Invoice Emails Details Fields  ---------------------------- //
  const [invoiceSentFrom, setInvoiceSentFrom] = useState("");
  const [invoiceEmailCc, setInvoiceEmailCc] = useState("");
  const [invoiceEmailBcc, setInvoiceEmailBcc] = useState("");
  const [paymentReceiptEmailCc, setPaymentReceiptEmailCc] = useState("");
  const [paymentReceiptEmailBcc, setPaymentReceiptEmailBcc] = useState("");

  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  // ------------------------- Pay As You Go Tiggering Options and functions  ---------------------- //
  let [selectedpayasyougooptions, setSelectedPayasyougooptions] = useState("");

  let [payasyougooptions] = useState([
    { value: "UponShiftEnd", label: "Upon shift ending" },
    { value: "UponShiftCreation", label: "Upon shift Creation" },
    { value: "UponShiftAssign", label: "Upon shift assignment" },
  ]);

  function payAsYouGoHandleChange(event) {
    setSelectedPayasyougooptions(event.value);
  }

  // -------------------------  Payment Deadline  Options and functions  ---------------------- //
  let [selectedpaymentDeadline, setSelectedPaymentDeadline] = useState("");

  let [paymentDeadline] = useState([
    { value: "7", label: "1 Week" },
    { value: "14", label: "2 Weeks" },
    { value: "21", label: "3 Weeks" },
    { value: "28", label: "4 Weeks" },
  ]);

  function paymentDeadlineHandleChange(event) {
    setSelectedPaymentDeadline(event.value);
  }

  // ---------------------------------- Edit Care Home Invoice Details  ------------------------------- //

  function editCareHomeInvoiceDetails(type) {
    if (type === "emails") {
      var data = JSON.stringify({
        careHomeId: localStorage?.getItem("carehomeId"),
        emails: {
          invoiceSentFrom,
          invoiceEmailCc,
          invoiceEmailBcc,
          paymentReceiptEmailCc,
          paymentReceiptEmailBcc,
        },
      });
    }

    if (type === "basic") {
      var data = JSON.stringify({
        careHomeId: localStorage?.getItem("carehomeId"),
        paymentDeadline: selectedpaymentDeadline,
        taxRate: taxRate,
        invNumbFormat: invNumFormat,
        trigger: selectedpayasyougooptions,
      });
    }

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/editCarehome`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getCareHomeInvoiceDetail();
        handleClosecarehomeDetailsModal();
        handleClosecarehomeEmailsDetailsModal();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ---------------------------------- Get Care Home Invoice Details  ------------------------------- //

  useEffect(() => {
    getCareHomeInvoiceDetail();
  }, []);

  const getCareHomeInvoiceDetail = () => {
    axios({
      url: `${
        process.env.REACT_APP_BASEURL
      }/getCarehomeInvById?careHomeId=${localStorage.getItem("carehomeId")}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        setCareHomeInvoiceDetail(res.data.careHomeData[0]);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  function invoiceTemplateHandler(type, selected) {
    setSpecificInvoiceId(selected?._id);
    setShowInvoiceTemplate(type);
  }

  const handleClick = () => {
    childRef.current.editCharges();
  };

  const handleApprove = () => {
    childRef.current.approvalStatus();
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <div className="top_menubar">
                <div className="row">
                  <div className="col">
                    <h5>Invoicing</h5>
                    <ul
                      className="nav nav-tabs ract_tab_list border-0"
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="tabD-1"
                          data-bs-toggle="tab"
                          data-bs-target="#tab_1"
                          type="button"
                          role="tab"
                          aria-controls="tab_1"
                          aria-selected="true"
                        >
                          Invoices
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="tabD-2"
                          data-bs-toggle="tab"
                          data-bs-target="#tab_2"
                          type="button"
                          role="tab"
                          aria-controls="tab_2"
                          aria-selected="false"
                        >
                          Configure
                        </button>
                      </li>
                    </ul>
                  </div>
                  {showinvoiceTemplate === "edit" && (
                    <div className="col-md-3">
                      <div className="d-flex justify-content-end">
                        <Dropdown className="themeBtn">
                          <Dropdown.Toggle id="dropdown-basic">
                            Actions
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={handleClick}>
                              Save
                            </Dropdown.Item>
                            <Dropdown.Item onClick={handleApprove}>
                              Approve
                            </Dropdown.Item>
                            <Dropdown.Item>Download</Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  )}
                  {showinvoiceTemplate !== "edit" && (
                    <div className="col">
                      <div className="d-flex align-items-center justify-content-end">
                        <div className="searchForm">
                          <input type="text" className="form-control" />
                          <BsSearch className="icon" />
                        </div>
                        <div className="d-flex weekPlan">
                          <NavLink to="#">Day</NavLink>
                          <NavLink to="#">Week</NavLink>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* <div className="float-end btns_head">
						<button className="btn btn-theme btn-sm">Emergency Info</button>
					</div> */}
              </div>

              <div className="tab-content ract_tab_data" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="tab_1"
                  role="tabpanel"
                  aria-labelledby="tabD-1"
                >
                  <div className="">
                    {showinvoiceTemplate === "edit" && (
                      <Invoices invoiceId={specificInvoiceId} ref={childRef} />
                    )}
                    {showinvoiceTemplate !== "edit" && (
                      <AutoGenerateInvoiceTable
                        invoiceTemplateHandler={invoiceTemplateHandler}
                      />
                    )}
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="tab_2"
                  role="tabpanel"
                  aria-labelledby="tabD-2"
                >
                  <div className="">
                    <div
                      className="row"
                      style={{ justifyContent: "space-between" }}
                    >
                      <div className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}>
                        <h5>
                          Basic
                          <NavLink
                            to="#"
                            className={`${cx.editIcon}`}
                            onClick={handleshowcarehomeDetailsModal}
                          >
                            Edit
                          </NavLink>
                        </h5>
                        <ul style={{ fontSize: "15px" }}>
                          <li>
                            Payment Deadline:{" "}
                            {careHomeInvoiceDetail?.paymentDeadline &&
                              +careHomeInvoiceDetail?.paymentDeadline / 7}{" "}
                            week from the sent date
                          </li>
                          <li>
                            Invoice Numbering Format:{" "}
                            {careHomeInvoiceDetail?.invNumbFormat &&
                              careHomeInvoiceDetail?.invNumbFormat}
                          </li>
                          <li>
                            Tax Rate:{" "}
                            {careHomeInvoiceDetail?.taxRate &&
                              +careHomeInvoiceDetail?.taxRate}{" "}
                            %
                          </li>
                          <li>
                            Pay-As-You-Go Invoice Generation Trigger:{" "}
                            {careHomeInvoiceDetail?.trigger &&
                              careHomeInvoiceDetail?.trigger}
                          </li>
                          <li></li>
                        </ul>
                      </div>
                      <div className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}>
                        <h5>
                          Emails
                          <NavLink
                            to="#"
                            className={`${cx.editIcon}`}
                            onClick={handleshowcarehomeEmailsDetailsModal}
                          >
                            Edit
                          </NavLink>
                        </h5>
                        <ul style={{ fontSize: "15px" }}>
                          <li>
                            Invoice Sent From (Email):{" "}
                            {careHomeInvoiceDetail?.emails &&
                              careHomeInvoiceDetail?.emails?.invoiceSentFrom &&
                              careHomeInvoiceDetail?.emails?.invoiceSentFrom}
                          </li>
                          <li>
                            Invoice Email (Cc):{" "}
                            {careHomeInvoiceDetail?.emails &&
                              careHomeInvoiceDetail?.emails?.invoiceEmailCc &&
                              careHomeInvoiceDetail?.emails?.invoiceEmailCc}
                          </li>
                          <li>
                            Invoice Email (Bcc):{" "}
                            {careHomeInvoiceDetail?.emails &&
                              careHomeInvoiceDetail?.emails?.invoiceEmailBcc &&
                              careHomeInvoiceDetail?.emails?.invoiceEmailBcc}
                          </li>
                          <li>
                            Payment Receipt Email (Cc):{" "}
                            {careHomeInvoiceDetail?.emails &&
                              careHomeInvoiceDetail?.emails
                                ?.paymentReceiptEmailCc &&
                              careHomeInvoiceDetail?.emails
                                ?.paymentReceiptEmailCc}
                          </li>
                          <li>
                            Payment Receipt Email (Bcc):{" "}
                            {careHomeInvoiceDetail?.emails &&
                              careHomeInvoiceDetail?.emails
                                ?.paymentReceiptEmailBcc &&
                              careHomeInvoiceDetail?.emails
                                ?.paymentReceiptEmailBcc}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <h4 className="card-title"></h4>
                    <div>
                      <DataTable />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Baisc Care Home Invoicing Details Edit Popup */}

      <Modal
        className="viewModal"
        show={showcarehomeDetailsModal}
        onHide={handleClosecarehomeDetailsModal}
      >
        <Modal.Header closeButton2>
          <Modal.Title>
            <span>Edit Care Home Invoice Details</span>
            <div className="d-flex">
              <button className="btn" onClick={handleClosecarehomeDetailsModal}>
                Close
              </button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="mb-1">Payment Deadline</label>
                <Select
                  options={paymentDeadline}
                  onChange={paymentDeadlineHandleChange}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="mb-1">Invoice Numbering Format:</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setinvNumFormat(e.target.value);
                  }}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label className="mb-1">Tax Rate</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    taxRateChange(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="mb-1">
                  Pay-As-You-Go Invoice Generation Trigger
                </label>
                <Select
                  options={payasyougooptions}
                  onChange={payAsYouGoHandleChange}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <button
              type="button"
              className="btn"
              onClick={() => {
                editCareHomeInvoiceDetails("basic");
              }}
            >
              {" "}
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Care Home Invoicing Emails Details Edit Popup Starts*/}
      <Modal
        className="viewModal"
        show={showcarehomeEmailsDetailsModal}
        onHide={handleClosecarehomeEmailsDetailsModal}
      >
        <Modal.Header closeButton2>
          <Modal.Title>
            <span>Edit Care Home Invoice Details</span>
            <div className="d-flex">
              <button
                className="btn"
                onClick={handleClosecarehomeEmailsDetailsModal}
              >
                Close
              </button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="mb-1">Invoice Sent From (Email)</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setInvoiceSentFrom(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="mb-1">Invoice Email (Cc)</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setInvoiceEmailCc(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="mb-1">Invoice Email (Bcc)</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setInvoiceEmailBcc(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="mb-1">Payment Receipt Email (Cc)</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setPaymentReceiptEmailCc(e.target.value);
                  }}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="mb-1">Payment Receipt Email (Bcc)</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setPaymentReceiptEmailBcc(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <button
              type="button"
              className="btn"
              onClick={() => {
                editCareHomeInvoiceDetails("emails");
              }}
            >
              {" "}
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Care Home Invoicing Emails Details Edit Popup Ends */}
      <Modal className="viewModal" show={show} size="xl" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span>Invoice</span>
            <div className="d-flex">
              <button className="btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6 mb-3">
              <img src="../../images/icon_view.svg" art="" />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Your Company Name"
              />
              <textarea
                className="form-control mb-3"
                placeholder="Your Company Address"
              ></textarea>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Your Company Email"
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Your Company Telephone"
              />
              <label className="text-dark mb-2">Bank Details</label>
              <textarea
                className="form-control mb-3"
                placeholder="Your Bank Details"
              ></textarea>
            </div>
            <div className="col-md-4"></div>

            <div className="col-md-4">
              <h6 className="text-end">To</h6>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Recipent Name"
              />
              <textarea
                className="form-control mb-3"
                placeholder="Recipent Address"
              ></textarea>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Recipent Email"
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Recipent Telephone"
              />
              <ul className="invoice_list text-dark">
                <li>
                  <span>Invoice No.</span>
                  <span>Invoice Date</span>
                </li>
                <li>
                  <span></span>
                  <span>Invoice Deadline</span>
                </li>
              </ul>
            </div>
            <p className="mt-4"></p>
            <div className="col-md-6">
              <label className="text-dark mb-2">Description </label>
              <input type="text" className="form-control mb-3" placeholder="" />
            </div>

            <div className="col-md-2">
              <label className="text-dark mb-2">Period</label>
              <input type="text" className="form-control mb-3" placeholder="" />
            </div>

            <div className="col-md-2">
              <label className="text-dark mb-2">Rate </label>
              <input type="text" className="form-control mb-3" placeholder="" />
            </div>

            <div className="col-md-2">
              <label className="text-dark mb-2">Amount </label>
              <input type="text" className="form-control mb-3" placeholder="" />
            </div>
            <div className="col-md-9"></div>
            <div className="col-md-3 mt-5">
              <label className="text-dark mb-2">Total </label>
              <input type="text" className="form-control mb-3" placeholder="" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <button className="btn">Edit</button>
            <button className="btn">Save</button>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal className="viewModal" show={show3} onHide={handleClose3}>
        <Modal.Header closeButton3>
          <Modal.Title>
            <span>Edit Invoice Profile</span>
            <div className="d-flex">
              <button className="btn" onClick={handleClose3}>
                Close
              </button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12 mb-3">
              <label className="mb-1">Select Resident</label>
              <select className="form-select">
                <option>Select Resident</option>
              </select>
            </div>
            <div className="col-md-12 mb-3">
              <label className="mb-1">Invoice Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-12 mb-3">
              <label className="mb-1">Fee Period</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-12 mb-3">
              <label className="mb-1">Rate </label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-12 mb-3">
              <label className="mb-1">Funding Source</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-12 mb-3">
              <label className="mb-1">Invoice To</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-12 mb-3">
              <label className="mb-1">Email</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-12 mb-3">
              <label className="mb-1">Autogenerate Date</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-12 mb-3">
              <label className="mb-1">Invoice Frequency</label>
              <input type="text" className="form-control" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <button className="btn">Save</button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Invoicing;
