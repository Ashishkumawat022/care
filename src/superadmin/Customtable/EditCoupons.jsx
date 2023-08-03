import React, { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import "./Editplan.css";
import cx from "./sidecards.module.css";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import {
  billFrequencyList,
  currencyList,
  discountList,
  redemptionListDetails,
} from "../../constants/roles";
import datechangeHandler from "../../utils/datechangehandler";

export default function EditCoupons() {
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [planName, setPlanName] = useState(""); // in case if owner want to change the plan name
  const [editsingleObject, setEditsingleObject] = useState([]);

  const [discountValue, setdiscountValue] = useState(0);
  const handleClose = () => {
    setShow(false);
    setdiscountValue(0);
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

  // ------------------------------------- / Discount Type Selection / --------------------------------- //

  const [discount, setdiscount] = useState("");
  const discountOptions = discountList.map(({ value, label }) => {
    return { value, label };
  });

  function discountHandler(event) {
    setdiscount(event.label);
  }

  // ------------------------------------- / billFrequencyList List Selection / --------------------------------- //

  const [billFrequency, setbillFrequency] = useState("");
  const billFrequencyOptions = billFrequencyList.map(({ value, label }) => {
    return { value, label };
  });
  function billFrequencyHandler(event) {
    setbillFrequency(event.label);
  }

  // ------------------------------------- / Redemption List Selection / --------------------------------- //

  const [redemption, setredemption] = useState("1");
  const [redemptionInput, setredemptionInput] = useState(false);
  const redemptionOptions = redemptionListDetails.map(({ value, label }) => {
    return { value, label };
  });
  function redemptionHandler(event) {
    if (event.value === "fewno") {
      setredemptionInput(true);
    }
    if (event.value === "one_time") {
      setredemptionInput(false);
      setredemption("1");
    }
    if (event.value === "indefinite") {
      setredemptionInput(false);
      setredemption("0");
    }
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

  // ------------------------------------- / Linked Add-Ons / --------------------------------- //
  let [selectedLinkedAddOns, setselectedLinkedAddOns] = useState("All");
  const [LinkedAddOnsOption, setLinkedAddOnsOption] = React.useState([]);

  function linkedAddOnsHandleChange(event) {
    let array = [];
    event.forEach((option) => {
      array.push(option.value);
    });
    setselectedLinkedAddOns(array);
  }
  // ------------------------------------- / Linked Accounts / --------------------------------- //
  const [specificAccountsOptions, setSpecificAccountsOptions] = useState([]);
  const [linkedSpecificAccount, setLinkedSpecificAccount] = useState("");
  const [linkedAccount, setLinkedAccount] = useState("");

  function linkedAccountChangeHandler(name) {
    setLinkedAccount(name);
    // if (name === "specific") {
    //   adminlisting();
    //   return;
    // }
  }

  function linkedSpecificAccountChangeHandler(options) {
    setLinkedSpecificAccount(options.map((item) => item.value));
  }

  // ------------------------------------- / Linked Sites / --------------------------------- //
  let [selectedLinkedSites, setselectedLinkedSites] = useState("All");
  const [LinkedSitesOption, setLinkedSitesOption] = React.useState([]);

  function linkedSitesHandleChange(event) {
    let array = [];
    event.forEach((option) => {
      array.push(option.value);
    });
    setselectedLinkedSites(array);
  }

  function resetCoupon() {
    setselectedLinkedSites([]);
    setLinkedSpecificAccount([]);
    setLinkedAccount("");
    setselectedLinkedAddOns([]);
    setselectedLinkedPlans([]);
  }

  useEffect(() => {
    getCouponById();
    getLinkedPlans();
    getFandFapp();
    adminlisting();
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

  const getCouponById = () => {
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getCoupon?couponId=${location?.state?.selectedFullObject[0]?._id}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
    })
      .then((res) => {
        let couponData = res.data.data[0];
        console.log(couponData, "couponsid");
        setEditsingleObject(couponData);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const getFandFapp = () => {
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getFandFapp`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
    })
      .then((res) => {
        let getallffdata = [];
        res.data.data.map((item) => {
          getallffdata.push({ value: item.addOnId, label: item.addOnId });
        });
        setLinkedAddOnsOption([
          { value: "All", label: "All" },
          ...getallffdata,
        ]);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

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
        let ownersData = [];
        let subscriptiondata = [];
        responseData.forEach((element) => {
          ownersData.push({
            value: element?.subscriptionPlanData[0]?.companyName,
            label: element?.subscriptionPlanData[0]?.companyName,
          });
          if (element?.subscriptionPlanData.length > 0) {
            element?.subscriptionPlanData.forEach((subelement, index) => {
              subscriptiondata.push({
                label: subelement.careSiteName,
                value: subelement.careSiteName,
              });
            });
          }
        });
        console.log(ownersData, subscriptiondata, "getOwners");
        setSpecificAccountsOptions(ownersData);
        setLinkedSitesOption([
          { value: "All", label: "All" },
          ...subscriptiondata,
        ]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const editPlanDetails = () => {
    let data = {
      linkedPlan: selectedLinkedPlans.join(" "),
      couponType: planName ? planName : editsingleObject?.couponType,
      id: location?.state?.selectedFullObject[0]?._id,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editCoupon`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getCouponById();
        handleClose();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const editBillingDetails = () => {
    let data = {
      billFrequency: billFrequency
        ? billFrequency
        : editsingleObject?.billFrequency,
      discountValue: discountValue
        ? discountValue
        : editsingleObject?.discountValue,
      currency: currency ? currency : editsingleObject?.currency,
      discountType: discount ? discount : editsingleObject?.discountType,
      id: location?.state?.selectedFullObject[0]?._id,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editCoupon`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getCouponById();
        handleClose();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const editRedemptionDetails = () => {
    let data = {
      redemptionType: redemption,
      id: location?.state?.selectedFullObject[0]?._id,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editCoupon`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getCouponById();
        handleClose();
        setredemption("");
        if (redemption < 2) setredemptionInput(false);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const editLinksDetails = () => {
    let data = {
      linkedAccount:
        linkedAccount === "specific" ? linkedSpecificAccount : linkedAccount,
      linkedAddOn: selectedLinkedAddOns,
      linkedPlan: selectedLinkedPlans,
      linkedSites: selectedLinkedSites,
      id: location?.state?.selectedFullObject[0]?._id,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editCoupon`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getCouponById();
        handleClose();
        resetCoupon();
        if (redemption < 2) setredemptionInput(false);
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
                    <h5>{editsingleObject?.couponType}</h5>
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
                          handleShow("Edit Coupon Details");
                        }}
                      >
                        Edit
                      </span>
                    </h5>
                    <ul style={{ fontSize: "15px" }}>
                      <li>Coupon Type: {editsingleObject?.couponType}</li>
                      <li>Coupon ID: {editsingleObject?.couponId}</li>
                      <li>
                        Coupon Creation Date:{" "}
                        {datechangeHandler(
                          editsingleObject?.couponCreationDate
                        )}
                      </li>

                      {/* <li>Linked Add-ONs: {editsingleObject?.linkedAddOn}</li> */}
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
                      <li>Discount Type: {editsingleObject?.discountType}</li>
                      <li>
                        Discount Value: {editsingleObject?.currency}{" "}
                        {editsingleObject?.discountValue}
                      </li>
                      <li> </li>
                      <li> </li>
                    </ul>
                  </div>
                </div>
                {/* Breaking Point here */}
                <div
                  className="row"
                  style={{ justifyContent: "space-between" }}
                >
                  <div className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}>
                    <h5>
                      Redemption Details
                      <span
                        className={`${cx.editIcon}`}
                        onClick={() => {
                          handleShow("Edit Redemption Details");
                        }}
                      >
                        Edit
                      </span>
                    </h5>
                    <ul style={{ fontSize: "15px" }}>
                      <li>
                        Type:{" "}
                        {editsingleObject?.redemptionType === "0"
                          ? "Indefinite"
                          : editsingleObject?.redemptionType === "1"
                          ? "One Time"
                          : +editsingleObject?.redemptionType >= +"2"
                          ? "Few No. of Times (Applied at each time an invoice is issued)"
                          : ""}
                      </li>
                      <li> </li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText("RFD010");
                      }}
                    >
                      Coupon Code: <strong>RFD010</strong>
                    </div>
                  </div>
                  <div className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}>
                    <h5>
                      Links
                      <span
                        className={`${cx.editIcon}`}
                        onClick={() => {
                          handleShow("Edit Links");
                        }}
                      >
                        Edit
                      </span>
                    </h5>
                    <ul style={{ fontSize: "15px" }}>
                      <li>
                        Linked Site:
                        {typeof editsingleObject?.linkedSites === "string"
                          ? editsingleObject?.linkedSites
                          : editsingleObject?.linkedSites?.join(", ")}
                      </li>
                      <li>
                        Linked Plans:{" "}
                        {typeof editsingleObject.linkedPlan === "string"
                          ? editsingleObject?.linkedPlan
                          : editsingleObject?.linkedPlan?.join(", ")}
                      </li>
                      <li>
                        Linked Add-Ons:
                        {typeof editsingleObject?.linkedAddOn === "string"
                          ? editsingleObject?.linkedAddOn
                          : editsingleObject?.linkedAddOn?.join(", ")}
                      </li>
                      <li>
                        Linked Account:
                        {typeof editsingleObject?.linkedAccount === "string"
                          ? editsingleObject?.linkedAccount
                          : editsingleObject?.linkedAccount?.join(", ")}
                      </li>
                      <li></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {popupStatus === "Edit Coupon Details" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Edit Coupon Details</span>
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
                  <label className="mb-1">Coupon Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={editsingleObject?.couponType}
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
                  <label className="mb-1">Bill Frequency</label>
                  <Select
                    options={billFrequencyOptions}
                    onChange={billFrequencyHandler}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Discount Type</label>
                  <Select
                    defaultValue={{
                      value: editsingleObject.discountType,
                      label: editsingleObject.discountType,
                    }}
                    options={discountOptions}
                    onChange={discountHandler}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Discount Value</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={editsingleObject?.discountValue}
                    onChange={(e) => {
                      setdiscountValue(e.target.value);
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

      {popupStatus === "Edit Redemption Details" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Edit Redemption Details</span>
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
                  <label className="mb-1">Redemption Type</label>
                  {/* we can also do the redemption part with objects like {name:"type",value:'0,1,2....'} */}
                  <Select
                    defaultValue={
                      editsingleObject?.redemptionType === "0"
                        ? { value: "indefinite", label: "Indefinite" }
                        : editsingleObject?.redemptionType === "1"
                        ? { value: "one_time", label: "One Time" }
                        : +editsingleObject?.redemptionType >= +"2"
                        ? {
                            value: "fewno",
                            label:
                              "Few No. of Times (Applied at each time an invoice is issued)",
                          }
                        : {
                            value: "",
                            label: "",
                          }
                    }
                    options={redemptionOptions}
                    onChange={redemptionHandler}
                  />
                </div>
                {redemptionInput && (
                  <div className="col-md-12 mb-3">
                    <label className="mb-1">No. of Redemption</label>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={editsingleObject?.redemptionType}
                      onChange={(e) => {
                        setredemption(e.target.value);
                      }}
                    />
                  </div>
                )}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  editRedemptionDetails();
                }}
              >
                Save
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {popupStatus === "Edit Links" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Edit Links</span>
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
                  <label className="mb-1">Linked Plans</label>
                  <Select
                    isMulti
                    defaultValue={
                      typeof editsingleObject.linkedPlan === "string"
                        ? editsingleObject.linkedPlan.split(" ").map((item) => {
                            return { value: item, label: item };
                          })
                        : editsingleObject.linkedPlan.map((item) => {
                            return { value: item, label: item };
                          })
                    }
                    options={LinkedPlansOption}
                    onChange={linkedPlansHandleChange}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Linked Add-Ons</label>
                  <Select
                    isMulti
                    defaultValue={
                      typeof editsingleObject.linkedAddOn === "string"
                        ? editsingleObject.linkedAddOn
                            .split(" ")
                            .map((item) => {
                              return { value: item, label: item };
                            })
                        : editsingleObject.linkedAddOn.map((item) => {
                            return { value: item, label: item };
                          })
                    }
                    options={LinkedAddOnsOption}
                    onChange={linkedAddOnsHandleChange}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Linked Account</label>
                  <div>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="specific"
                      onChange={() => {
                        linkedAccountChangeHandler("specific");
                      }}
                    />
                    <label className="form-check-label" htmlFor="specific">
                      Specific Users
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="existingUsers"
                      defaultChecked={
                        editsingleObject.linkedAccount !== "existingUsers"
                      }
                      onChange={() => {
                        linkedAccountChangeHandler("existingUsers");
                      }}
                    />
                    <label className="form-check-label" htmlFor="existingUsers">
                      Existing Users
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="newUsers"
                      defaultChecked={
                        editsingleObject.linkedAccount !== "newUsers"
                      }
                      onChange={() => {
                        linkedAccountChangeHandler("newUsers");
                      }}
                    />
                    <label className="form-check-label" htmlFor="newUsers">
                      New Users
                    </label>
                    <input
                      className="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="All"
                      defaultChecked={editsingleObject.linkedAccount !== "All"}
                      onChange={() => {
                        linkedAccountChangeHandler("All");
                      }}
                    />
                    <label className="form-check-label" htmlFor="All">
                      All Users
                    </label>
                  </div>
                  {linkedAccount === "specific" && (
                    <Select
                      isMulti
                      defaultValue={[
                        typeof editsingleObject.linkedAccount === "string" &&
                        editsingleObject.linkedAccount !== "specific"
                          ? editsingleObject.linkedAccount
                              .split(" ")
                              .map((item) => {
                                return { value: item, label: item };
                              })
                          : editsingleObject.linkedAccount.map((item) => {
                              return { value: item, label: item };
                            }),
                      ]}
                      options={specificAccountsOptions}
                      onChange={linkedSpecificAccountChangeHandler}
                    />
                  )}
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Linked Site</label>
                  <Select
                    isMulti
                    defaultValue={
                      typeof editsingleObject.linkedSites === "string"
                        ? editsingleObject.linkedSites
                            .split(" ")
                            .map((item) => {
                              return { value: item, label: item };
                            })
                        : editsingleObject.linkedSites.map((item) => {
                            return { value: item, label: item };
                          })
                    }
                    options={LinkedSitesOption}
                    onChange={linkedSitesHandleChange}
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
                  editLinksDetails();
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
