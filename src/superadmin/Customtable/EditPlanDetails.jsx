import React, { useState, useEffect, Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "./Editplan.css";
import FeatureListTable from "./FeatureListTable";
import cx from "./sidecards.module.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { currencyList, planFeaturesList } from "../../constants/roles";
import datechangeHandler from "../../utils/datechangehandler";

export default function EditPlanDetails() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [feature, setFeature] = useState("");
  const [currency, setCurrency] = useState("");
  const [editsingleObject, setEditsingleObject] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [planName, setPlanName] = useState("");
  const [unitPrice, setUnitPrice] = useState(0);
  const handleClose = () => {
    setShow(false);
    setFeature("");
    setQuantity("");
    setPlanName("");
    setUnitPrice(0);
  };
  const [popupStatus, setPopupStatus] = useState("");
  const handleShow = (text) => {
    setShow(true);
    setPopupStatus(text);
  };

  const currencyOptions = currencyList.map(({ value, label }) => {
    return { value, label };
  });
  let localdata = location?.state?.selectedFullObject[0];
  let defaultBillingFreq =
    localdata?.billingFreq === "Monthly"
      ? localdata?.unitPriceMonthly
      : localdata?.unitPriceYearly;

  // ------------------------------------- /Sub feature list / --------------------------------- //
  let [selectedfeatureList, setselectedfeatureList] = useState("All");
  let [infoText, setInfoText] = useState("");
  let [featureDesc, setFeatureDesc] = useState("");

  const featureOptions = planFeaturesList.map((feature) => {
    return { value: feature.label, label: feature.label };
  });

  function featureListHandleChange(event) {
    let array = [];
    event.forEach((option) => {
      array.push(option.value);
    });
    setselectedfeatureList(array);
  }

  useEffect(() => {
    getPlansById();
  }, []);

  const getPlansById = () => {
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getPlans?planId=${location?.state?.selectedFullObject[0]?._id}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
    })
      .then((res) => {
        let plansData = res.data.plansData[0];
        setEditsingleObject(plansData);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const addFeatureList = () => {
    let data = {
      feature: {
        name: featureDesc,
        qty: quantity,
        status: "Active",
        subFeatures: selectedfeatureList,
        infoText: infoText,
      },
      planId: location?.state?.selectedFullObject[0]?._id,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/addFeatureList`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getPlansById();
        handleClose();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const editPlanDetails = () => {
    let data = {
      planName: planName,
      planId: location?.state?.selectedFullObject[0]?._id,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editPlan`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getPlansById();
        handleClose();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const editBillingDetails = () => {
    console.log(
      localdata?.billingFreq,
      unitPrice,
      editsingleObject?.unitPriceMonthly,
      editsingleObject?.unitPriceYearly,
      "prices issue"
    );
    let data = {
      currency: currency,
      [localdata?.billingFreq === "Monthly"
        ? "unitPriceMonthly"
        : "unitPriceYearly"]: unitPrice
        ? unitPrice
        : localdata?.billingFreq === "Monthly"
        ? editsingleObject?.unitPriceMonthly
        : editsingleObject?.unitPriceYearly,
      planId: location?.state?.selectedFullObject[0]?._id,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editPlan`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        console.log(res);
        getPlansById();
        handleClose();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  function currencyHandler(event) {
    setCurrency(event.label);
  }

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <div className="top_menubar">
                <div className="row">
                  <div className="col">
                    <h5>{editsingleObject?.planName} Plan</h5>
                  </div>
                </div>
              </div>

              <div className="">
                <div
                  className="row"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}>
                    <h5>
                      Plan Details
                      <span
                        className={`${cx.editIcon}`}
                        onClick={() => {
                          handleShow("Edit Plan Details");
                        }}
                      >
                        Edit
                      </span>
                    </h5>
                    <ul style={{ fontSize: "15px" }}>
                      <li>Plan Name: {editsingleObject?.planName}</li>
                      <li>Plan ID: {location?.state?.selected[0]} </li>
                      <li>
                        Plan Creation Date:{" "}
                        {datechangeHandler(editsingleObject?.createdAt)}{" "}
                      </li>
                      <li>Linked Plans: All</li>
                      <li>Plan Status: {editsingleObject?.planStatus}</li>
                    </ul>
                  </div>
                  <div className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}>
                    <h5>
                      Billing Details
                      <span
                        className={`${cx.editIcon}`}
                        onClick={() => {
                          handleShow("Edit Billing Details");
                        }}
                      >
                        Edit
                      </span>
                    </h5>
                    <ul style={{ fontSize: "15px" }}>
                      <li>Billing Frequency: {localdata?.billingFreq}</li>
                      <li>
                        Unit Price: {editsingleObject?.currency}{" "}
                        {localdata?.billingFreq === "Yearly"
                          ? editsingleObject?.unitPriceYearly
                          : editsingleObject?.unitPriceMonthly}{" "}
                      </li>
                      <li> </li>
                      <li> </li>
                      <li> </li>
                    </ul>
                  </div>
                </div>
                <h4 className="card-title"></h4>
              </div>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <div className={`col-12 col-md-12 col-lg-12 ${cx.cardBox}`}>
                  <h5>
                    Features List
                    <div className="float-end btns_head d-flex">
                      <button
                        className="btn btn-theme btn-sm"
                        onClick={() => handleShow("Add feature")}
                      >
                        Add
                      </button>
                    </div>
                  </h5>
                  <FeatureListTable
                    planId={location?.state?.selectedFullObject[0]?._id}
                    featureList={editsingleObject?.featureList}
                    getPlansById={getPlansById}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {popupStatus === "Add feature" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Add Features List</span>
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
                  <label className="mb-1">Feature Description</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={editsingleObject?.feature?.name}
                    onChange={(e) => {
                      setFeatureDesc(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Info Text</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={editsingleObject?.feature?.infoText}
                    onChange={(e) => {
                      setInfoText(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Sub Features</label>
                  <Select
                    isMulti
                    defaultInputValue={editsingleObject?.feature?.subFeatures}
                    options={featureOptions}
                    onChange={featureListHandleChange}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Qty</label>
                  <input
                    type="text"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
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
                  addFeatureList();
                }}
              >
                Save
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {popupStatus === "Edit Plan Details" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Edit Plan Details</span>
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
                  <label className="mb-1">Plan Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={editsingleObject?.planName}
                    onChange={(e) => {
                      setPlanName(e.target.value);
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
                  editPlanDetails();
                }}
              >
                Save
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {popupStatus === "Edit Billing Details" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Edit Billing Details</span>
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
                  <label className="mb-1">Currency</label>
                  <Select
                    defaultValue={{
                      value: editsingleObject.currency,
                      label: editsingleObject.currency,
                    }}
                    options={currencyOptions}
                    onChange={currencyHandler}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Unit Price</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      localdata?.billingFreq === "Yearly"
                        ? editsingleObject?.unitPriceYearly
                        : editsingleObject?.unitPriceMonthly
                    }
                    onChange={(e) => {
                      setUnitPrice(e.target.value);
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
                  editBillingDetails();
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
