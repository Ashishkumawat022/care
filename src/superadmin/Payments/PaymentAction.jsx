import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { fetch5, fetchGet } from "../../Apis/commonApis";
import Select from "react-select";

const PaymentAction = (props) => {
  let { paymentId, rowDetail, latestRowData } = props;

  const [allCopanyNames, setAllCompanyNames] = useState([]);
  const [careSiteNames, setCareSiteNames] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState({
    adminId: "",
    careHomeId: "",
    finalId: "",
    companyName: "",
    careSiteName: "",
    plan: "",
    created_at: "",
    amount: "",
    status: "received",
  });

  useEffect(() => {
    fetchCompanyNames();
  }, []);

  const clickHandler = () => {
    if (paymentId.length > 0 && window.confirm("Are You sure!!")) {
      RefundPayment();
    } else {
      alert("Please select checkbox to proceed!!");
    }
  };

  const RefundPayment = async () => {
    let refundDetail = {
      paymentThrough: rowDetail.hasOwnProperty("refunded")
        ? "stripe"
        : "gocardless",
      paymentRefId: paymentId[0],
      amount: rowDetail.amount,
    };
    const result = await fetch5(`makeRefund`, refundDetail);
    if(result.status) latestRowData();
  };

  const fetchCompanyNames = async () => {
    let result = await fetchGet("getCareHomeAndItsSites");
    let names = [];
    result.data.forEach((elem) => {
      names.push({ value: elem.adminId, label: elem.companyName});
    });
    setAllCompanyNames(names);
  };

  const fetchCareSiteNames = async (id) => {
    let result = await fetchGet(`getCareHomeAndItsSites?adminId=${id}`);
    let names = [];
    result.data.forEach((elem) => {
      names.push({ value: elem._id, label: elem.careSiteName, id: elem.finalId  });
    });
    setCareSiteNames(names);
  };

  const createPayment = async () => {
    let result = await fetch5("createPayment", paymentDetails);
    if(result.status) latestRowData();
  };

  function handleSubmit(e) {
    e.preventDefault();
    createPayment()
  }

  function handleCompanyNameSelect(e) {
    setPaymentDetails({ ...paymentDetails, companyName: e.label, adminId: e.value });
    fetchCareSiteNames(e.value);
  }

  function handleCareSiteNameSelect(e) {
    setPaymentDetails({ ...paymentDetails, careSiteName: e.label, careHomeId: e.value, finalId: e.id });
  }

  return (
    <>
      <h4 className="card-title default_color">
        Payments
        <div className="float-end btns_head d-flex">
          <button
            className="btn btn-theme btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#addnewblog_modal"
            data-bs-whatever="@mdo"
          >
            Add
          </button>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Action
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#" onClick={() => clickHandler()}>
                Refund
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <select
            id="event"
            name="event"
            className="border-0 default_color ms-3"
            style={{ width: "40px", fontSize: "15px" }}
          >
            <option value="all">All</option>
          </select>
        </div>
      </h4>
      <div
        className="modal fade"
        id="addnewblog_modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center">
              <h4 className="modal-title" id="exampleModalLabel1">
                Add Payment
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="row">
                  <label className="form-label mt-2">Select Company Name</label>
                  <Select
                    options={allCopanyNames}
                    onChange={handleCompanyNameSelect}
                  />

                  <label className="form-label mt-2">
                    Select Care Site Name
                  </label>
                  <Select
                    options={careSiteNames}
                    onChange={handleCareSiteNameSelect}
                  />

                  <div className="mb-3 mt-2 col-md-12">
                    <label className={`form-label`}>Plan Type</label>
                    <input type="text" className="form-control" onChange={(e) => setPaymentDetails({ ...paymentDetails, plan: e.target.value})} />
                  </div>
                  <div className="mb-2 col-md-12">
                    <label className={`form-label`}>Value Received</label>
                    <input type="text" className="form-control" onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: e.target.value})}/>
                  </div>
                  <div className="mb-2 col-md-12">
                    <label className={`form-label`}>Receipt Date</label>
                    <input type="date" className="form-control" onChange={(e) => setPaymentDetails({ ...paymentDetails, created_at: e.target.value})}/>
                  </div>
                </div>
                <div className="blog_popup_details">
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary submit_btn"
                      data-bs-dismiss="modal"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentAction;
