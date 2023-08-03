import React, { Fragment, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import cx from "./sidecards.module.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";

export default function Company() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();
  const superAdminId = JSON.parse(localStorage.getItem("__csadmin__d"))?._id;
  //   console.log(superAdminId);
  const [rows, setRowData] = React.useState({});
  const [show, setShow] = useState(false);
  const [popupStatus, setPopupStatus] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [industry, setIndustry] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [vatNumber, setVATNumber] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [settingId, setSettingId] = useState("");
  const [dmdPassEdit, setdmdPasswordEdit] = useState("");
  const [dmdDetails, setdmddetails] = useState({});
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const handleShow = (text) => {
    setShow(true);
    setPopupStatus(text);
  };
  const handleClose = () => {
    setShow(false);
    setPopupStatus("");
  };

  // ------------------------------  / Plan Heaader Cells / ---------------------------------------- //
  React.useEffect(() => {
    getSetting();
  }, []);

  const getSetting = () => {
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getSetting`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
    })
      .then((res) => {
        console.log(res, "getSetting");
        setRowData(res?.data?.data?.company);
        setSettingId(res?.data?.data?._id);
        setdmddetails(res?.data?.data?.dmdSetting);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const editCompanyInfo = () => {
    let data = new FormData();
    data.append("companySectionId", rows?._id);
    data.append("settingId", settingId);
    data.append("superAdminId", superAdminId);
    data.append("companyName", companyName);
    data.append("email", email);
    data.append("image", companyLogo);
    data.append("industry", industry);
    data.append("timeZone", timeZone);
    data.append("vatNo", vatNumber);
    data.append("regNo", regNumber);

    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editCompanyInfo`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getSetting();
        handleClose();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const editAddressDetails = () => {
    let data = new FormData();
    data.append("companySectionId", rows?._id);
    data.append("settingId", settingId);
    data.append("address", address);
    data.append("city", city);
    data.append("postcode", postalCode);
    data.append("state", state);
    data.append("country", country);

    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editCompanyInfo`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getSetting();
        handleClose();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const editDmd = () => {
    let data = JSON.stringify({
      settingId: settingId,
      dmdObjId: dmdDetails?._id,
      apiKey: dmdPassEdit,
      itemNumber: Number(dmdDetails?.itemNumber) + 1,
    });

    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editCompanyInfo`,
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        getSetting();
        handleClose();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  return (
    <Fragment>
      <div className="">
        <div
          className="row"
          style={{ justifyContent: "space-between", marginTop: "30px" }}
        >
          <div className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}>
            <h5>
              Subscription Details
              <span
                className={`${cx.editIcon}`}
                onClick={() => {
                  handleShow("Edit Subscription Details");
                }}
              >
                Edit
              </span>
            </h5>
            <ul style={{ fontSize: "15px" }}>
              <li>Compay Name: {rows.companyName}</li>
              <li>
                Company Logo:
                <img width={50} height={50} src={rows?.companyLogo} />
              </li>
              <li>Email: {rows.email}</li>
              <li>Industry: {rows.industry}</li>
              <li>Time Zone: {rows.timeZone}</li>
              <li>VAT Number: {rows.vatNo}</li>
              <li>Registration Number: {rows.regNo} </li>
            </ul>
          </div>
          <div className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}>
            <h5>
              Address
              <span
                className={`${cx.editIcon}`}
                onClick={() => {
                  handleShow("Edit Address");
                }}
              >
                Edit
              </span>
            </h5>
            <ul style={{ fontSize: "15px" }}>
              {/* <li>xxxxx</li> */}
              <li>{rows.address}</li>
              <li>City: {rows.city}</li>
              <li>Province/State: {rows.state}</li>
              <li>Post Code: {rows.postcode}</li>
              <li>Country: {rows.country}</li>
            </ul>
          </div>
          <div className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}>
            <h5>
              dmd Password
              <span
                className={`${cx.editIcon}`}
                onClick={() => {
                  handleShow("Edit dmdApiKey");
                }}
              >
                Edit
              </span>
            </h5>
            <ul style={{ fontSize: "15px" }}>
              {/* <li>xxxxx</li> */}
              <li>password: *************</li>
            </ul>
          </div>
        </div>
      </div>

      {popupStatus === "Edit Subscription Details" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Edit Subscription Details</span>
              <div className="d-flex">
                <button className="btn" onClick={handleClose}>
                  Close
                </button>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Compay Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={rows.companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                    }}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label className="mb-1">Company Logo</label>
                  <input
                    type="file"
                    className="form-control"
                    // defaultValue={editsingleObject?.companyLogo}
                    onChange={(e) => {
                      setCompanyLogo(e.target.files[0]);
                    }}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Compay Email:</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={rows.email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Industry</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={rows?.industry}
                    onChange={(e) => {
                      setIndustry(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Time Zone</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={rows?.timeZone}
                    onChange={(e) => {
                      setTimeZone(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">VAT Number</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={rows?.vatNo}
                    onChange={(e) => {
                      setVATNumber(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Registration Number</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={rows?.regNo}
                    onChange={(e) => {
                      setRegNumber(e.target.value);
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
                  editCompanyInfo();
                }}
              >
                Save
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {popupStatus === "Edit Address" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Edit Address</span>
              <div className="d-flex">
                <button className="btn" onClick={handleClose}>
                  Close
                </button>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Address</label>
                  <input
                    type="text"
                    defaultValue={rows?.address}
                    className="form-control"
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">City</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={rows?.city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">State</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={rows?.state}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">PostalCode</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={rows?.postcode}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={rows?.country}
                    onChange={(e) => {
                      setCountry(e.target.value);
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
                  editAddressDetails();
                }}
              >
                Save
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {popupStatus === "Edit dmdApiKey" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Edit Address</span>
              <div className="d-flex">
                <button className="btn" onClick={handleClose}>
                  Close
                </button>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => {
                      setdmdPasswordEdit(e.target.value);
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
                  editDmd();
                }}
              >
                Save
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </Fragment>
  );
}
