import React, { useState, useRef } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";

export default function PlanModals(props) {
  let {
    LinkedPlansOption,
    AddOnOption,
    getCoupon,
    getFandFapp,
    getPlans,
    handleAddCouponsClose,
    handleAddOnClose,
    handleAddPlanClose,
    showAddCoupons,
    showAddOn,
    showAddPlan,
  } = props;

  const plantypeRef = useRef(null);
  const unitPriceRef = useRef(null);
  const addOntypeRef = useRef(null);
  const coupontypeRef = useRef(null);
  const discountValueRef = useRef(null);
  const unitPriceAddOnRef = useRef(null);
  const [image, setimage] = useState("");
  // ------------------------------------- / currency / --------------------------------- //
  let [selectedCurrency, setselectedCurrency] = useState("");

  let [currency] = useState([
    { value: "GBP", label: "GBP" },
    { value: "CAD", label: "CAD" },
  ]);

  function currencyHandleChange(event) {
    setselectedCurrency(event.value);
  }

  // ------------------------------------- / Linked Plans / --------------------------------- //
  let [selectedLinkedPlans, setselectedLinkedPlans] = useState("All");
  //   const [LinkedPlansOption, setLinkedPlansOption] = React.useState([]);

  function linkedPlansHandleChange(event) {
    let array = [];
    event.forEach((option) => {
      array.push(option.value);
    });
    setselectedLinkedPlans(array);
  }

  // ------------------------------------- / Linked Add On / --------------------------------- //
  let [selectedAddOn, setselectedAddOn] = useState("All");
  //   const [AddOnOption, setAddOnOption] = React.useState([]);

  function addOnHandleChange(event) {
    let array = [];
    event.forEach((option) => {
      array.push(option.value);
    });
    setselectedAddOn(array);
  }

  // ------------------------------------- / Coupons Discount Type(couponDiscountType) / --------------------------------- //
  let [selectedcouponDiscountType, setselectedcouponDiscountType] =
    useState("");
  const [couponDiscountTypeOption] = React.useState([
    { value: "Fixed", label: "Fixed" },
    { value: "%", label: "%" },
  ]);

  function couponDiscountTypeHandleChange(event) {
    setselectedcouponDiscountType(event.value);
  }

  function Addplan() {
    let data = new FormData();
    data.append("featureList", "");
    data.append("planName", plantypeRef?.current?.value);
    data.append("unitPriceMonthly", unitPriceRef?.current?.value);
    data.append("currency", selectedCurrency);
    data.append("image", image);

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/createPlan`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getPlans();
        handleAddPlanClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function createFandFapp() {
    let data = JSON.stringify({
      addOnType: addOntypeRef?.current?.value,
      unitPrice: unitPriceAddOnRef?.current?.value,
      linkedPlan: selectedLinkedPlans.join(" "),
    });

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/createFandFapp`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getFandFapp();
        handleAddOnClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function createCoupon() {
    let data = {
      couponType: coupontypeRef?.current?.value,
      linkedPlan: selectedLinkedPlans.join(" "),
      linkedAddOn: selectedAddOn.join(" "),
      discountType: selectedcouponDiscountType,
      discountValue: discountValueRef?.current?.value,
    };
    console.log({ linkedAddOn: data });

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/createCoupon`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        getCoupon();
        handleAddCouponsClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <React.Fragment>
      {/* Subscription plans */}

      {modalName === "Subscription plans" && (
        <Modal
          className="viewModal"
          show={showAddPlan}
          onHide={handleAddPlanClose}
        >
          <Modal.Header closeButton2>
            <Modal.Title>
              <span>Add Subscription Plan</span>
              <div className="d-flex">
                <button className="btn" onClick={handleAddPlanClose}>
                  Close
                </button>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Image</label>
                  <input
                    onChange={(e) => setimage(e.target.files[0])}
                    type="file"
                    required="required"
                    className="form-control"
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Plan Type</label>
                  <input
                    type="text"
                    className="form-control"
                    ref={plantypeRef}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Currency</label>
                  <Select options={currency} onChange={currencyHandleChange} />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Unit Price</label>
                  <input
                    type="text"
                    className="form-control"
                    ref={unitPriceRef}
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
                  Addplan();
                }}
              >
                Save
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {/* add on in subscription plans */}
      {modalName === "Plans Add on" && (
        <Modal className="viewModal" show={showAddOn} onHide={handleAddOnClose}>
          <Modal.Header closeButton2>
            <Modal.Title>
              <span>Subscription Plan Add On</span>
              <div className="d-flex">
                <button className="btn" onClick={handleAddOnClose}>
                  Close
                </button>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Add-On Type</label>
                  <input
                    type="text"
                    className="form-control"
                    ref={addOntypeRef}
                  />
                </div>

                <div className="col-md-12 mb-3">
                  <label className="mb-1">Unit Price</label>
                  <input
                    type="number"
                    className="form-control"
                    ref={unitPriceAddOnRef}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Linked Plans</label>
                  <Select
                    isMulti
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
                  createFandFapp();
                }}
              >
                Save
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {/* add coupons in subscription plans */}

      {modalName === "add Coupons" && (
        <Modal
          className="viewModal"
          show={showAddCoupons}
          onHide={handleAddCouponsClose}
        >
          <Modal.Header closeButton2>
            <Modal.Title>
              <span>Add Coupon</span>
              <div className="d-flex">
                <button className="btn" onClick={handleAddCouponsClose}>
                  Close
                </button>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Coupon Type</label>
                  <input
                    type="text"
                    className="form-control"
                    ref={coupontypeRef}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Linked Plans</label>
                  <Select
                    isMulti
                    options={LinkedPlansOption}
                    onChange={linkedPlansHandleChange}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Linked Add-Ons</label>
                  <Select
                    isMulti
                    options={AddOnOption}
                    onChange={addOnHandleChange}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Discount Type</label>
                  <Select
                    options={couponDiscountTypeOption}
                    onChange={couponDiscountTypeHandleChange}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Discount Value</label>
                  <input
                    type="number"
                    className="form-control"
                    ref={discountValueRef}
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
                  createCoupon();
                }}
              >
                Save
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </React.Fragment>
  );
}
