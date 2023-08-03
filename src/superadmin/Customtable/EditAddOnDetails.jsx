import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import "./Editplan.css";
import cx from "./sidecards.module.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { billFrequencyList, currencyList } from "../../constants/roles";
import datechangeHandler from "../../utils/datechangehandler";

export default function EditAddOnDetails() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [planName, setPlanName] = useState(""); // in case if owner want to change the plan name
  const [editsingleObject, setEditsingleObject] = useState([]);

  const [unitPrice, setUnitPrice] = useState(0);
  const handleClose = () => {
    setShow(false);
    setUnitPrice(0);
  };
  const [popupStatus, setPopupStatus] = useState("");
  const handleShow = (text) => {
    setShow(true);
    setPopupStatus(text);
  };
  // ------------------------------------- / currency List Selection / --------------------------------- //

  const [currency, setCurrency] = useState("");
  const currencyOptions = currencyList.map(({ value, label }) => {
    return { value, label };
  });

  function currencyHandler(event) {
    setCurrency(event.label);
  }

  // ------------------------------------- / Bill Frequency List Selection / --------------------------------- //

  const [billFrequency, setbillFrequency] = useState("");
  const billFrequencyOptions = billFrequencyList.map(({ value, label }) => {
    return { value, label };
  });
  function billFrequencyHandler(event) {
    setbillFrequency(event.label);
  }

  // ------------------------------------- / Linked Plans / --------------------------------- //
  let [selectedLinkedPlans, setselectedLinkedPlans] = useState("All");
  const [LinkedPlansOption, setLinkedPlansOption] = React.useState([]);

  function linkedPlansHandleChange(event) {
    let array = [];
    event.forEach((option) => {
      array.push(option.value);
    });
    setselectedLinkedPlans(array);
  }

  useEffect(() => {
    getFandFappById();
    getLinkedPlans();
  }, []);

  const getLinkedPlans = () => {
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getPlans`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
    })
      .then((res) => {
        setLinkedPlansOption([
          { value: "All", label: "All" },
          ...res.data.plansData.map((item) => {
            return { label: item.planName, value: item.planName };
          }),
        ]);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const getFandFappById = () => {
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getFandFapp?FandFId=${location?.state?.selectedFullObject[0]?._id}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
    })
      .then((res) => {
        let plansData = res.data.data[0];
        setEditsingleObject(plansData);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const editPlanDetails = () => {
    let data = {
      linkedPlan: selectedLinkedPlans,
      addOnType: planName,
      FandFappId: location?.state?.selectedFullObject[0]?._id,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editFandFapp`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getFandFappById();
        handleClose();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const editBillingDetails = () => {
    let data = {
      currency: currency,
      billFrequency: billFrequency,
      unitPrice: unitPrice,
      FandFappId: location?.state?.selectedFullObject[0]?._id,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editFandFapp`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getFandFappById();
        handleClose();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  return (
    <Fragment>
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <div className="top_menubar">
                <div className="row">
                  <div className="col">
                    <h4>Add-ON</h4>
                  </div>
                </div>
                <div className="col">
                  <h5>{editsingleObject?.addOnType}</h5>
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
                          handleShow("Edit AddOn Details");
                        }}
                      >
                        Edit
                      </span>
                    </h5>
                    <ul style={{ fontSize: "15px" }}>
                      <li>Add-ON Type: {editsingleObject?.addOnType}</li>
                      <li>Add-ON ID: {editsingleObject?.addOnId} </li>
                      <li>
                        Add-ON Creation{" "}
                        {datechangeHandler(editsingleObject?.createdAt)}
                      </li>
                      <li>Linked Plans: {editsingleObject?.linkedPlan}</li>
                      <li>Add-ON Status: {editsingleObject?.addOnStatus}</li>
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
                      <li>
                        Billing Frequency: {editsingleObject?.billFrequency}
                      </li>
                      <li>
                        Unit Price: {editsingleObject?.currency}{" "}
                        {editsingleObject?.unitPrice}
                      </li>
                      <li> </li>
                      <li> </li>
                      <li> </li>
                    </ul>
                  </div>
                </div>
                <h4 className="card-title"></h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {popupStatus === "Edit AddOn Details" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Edit AddOn Details</span>
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
                    defaultValue={editsingleObject?.addOnType}
                    onChange={(e) => {
                      setPlanName(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Linked Plans</label>
                  <Select
                    isMulti
                    defaultValue={[
                      {
                        value: editsingleObject.linkedPlan,
                        label: editsingleObject.linkedPlan,
                      },
                    ]}
                    options={LinkedPlansOption}
                    onChange={linkedPlansHandleChange}
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
                  <label className="mb-1">Bill Frequency</label>
                  <Select
                    options={billFrequencyOptions}
                    onChange={billFrequencyHandler}
                  />
                </div>
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
                    defaultValue={editsingleObject?.unitPrice}
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
