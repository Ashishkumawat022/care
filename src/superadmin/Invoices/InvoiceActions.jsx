import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { fetch5, fetch2, fetchGet } from "../../Apis/commonApis";
import { Col, Row } from "react-bootstrap";
import styles from "./invoices.module.css";
import Select from "react-select";

export default function InvoiceActions(props) {
    const { selectedData, getLatestInvioceData } = props;

    let invoiceData = {
        careHomeId: "",
        toName: "",
        toAddress: "",
        toEmail: "",
        toContactNo: "",
        invoiceDate: "",
        invoiceDeadline: "",
        invoicePeriod: "",
        chargesDetails: [],
        total: "",
        status: "",
        type: "",
        paymentDate: "",
        image: "",
        templateFor: "superAdmin",
    };

    let chargeData = {
        discription: "",
        rate: 0,
        qty: 1,
        tax: 0,
        amount: 0,
    };

    const [addInvoiceData, setAddInvoiceData] = useState(invoiceData);
    const [planData, setPlanData] = useState(chargeData);
    const [fandFamData, setFandFamData] = useState(chargeData);
    const [couponData, setCouponData] = useState(chargeData);
    const [create, setCreate] = useState(false);
    const [allCopanyNames, setAllCompanyNames] = useState([]);
    const [careSiteNames, setCareSiteNames] = useState([]);

    useEffect(() => {
        let careData = JSON.parse(localStorage.getItem('__csadmin__d'));
        setAddInvoiceData((prevState) => {
            return { ...prevState, careHomeId: careData._id };
        });
        fetchCompanyNames();
    }, []);

    useEffect(() => {
        if (create) {
            createInvoice();
        }
    }, [create])

    function onClickHandler(type) {
        if (
            selectedData.length === 1 &&
            window.confirm("Are You sure!!") === true
        ) {
            if (type === "delete") {
                deleteInvoice();
            } else {
                invalidateInvoice();
            }
        } else {
            alert("Please select checkbox to proceed!!");
        }
    }

    const invalidateInvoice = async () => {
        let invoiceId = { invoiceId: selectedData[0] };
        const result = await fetch5(`markInvInvalid`, invoiceId);
        if (result.status) getLatestInvioceData();
    };

    const deleteInvoice = async () => {
        let invoiceId = { invoiceId: selectedData[0] };
        const result = await fetch5(`deleteInvoice`, invoiceId);
        if (result.status) getLatestInvioceData();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let finalCarges = [];
        finalCarges.push(planData, fandFamData, couponData);
        setAddInvoiceData((prevState) => {
            return { ...prevState, chargesDetails: finalCarges, total: totalAmount };
        });
        setCreate(true);
    }

    const createInvoice = async () => {
        const result = await fetch2(
            `${process.env.REACT_APP_SUPERADMIN_BASEURL}/createInvoice`,
            addInvoiceData
        );
        setCreate(false);
    };

    const fetchCompanyNames = async () => {
        let result = await fetchGet("getCareHomeAndItsSites");
        let names = [];
        result.data.forEach((elem) => {
            names.push({ value: elem.adminId, label: elem.companyName });
        });
        setAllCompanyNames(names);
    };

    const fetchCareSiteNames = async (id) => {
        let result = await fetchGet(`getCareHomeAndItsSites?adminId=${id}`);
        let names = [];
        result.data.forEach((elem) => {
            names.push({ value: elem._id, label: elem.careSiteName });
        });
        setCareSiteNames(names);
    };

    function handleCompanyNameSelect(e) {
        fetchCareSiteNames(e.value);
    }

    function handleCareSiteNameSelect(e) {
        setAddInvoiceData((prevState) => {
            return { ...prevState, careHomeId: e.value};
        });
    }

    const totalAmount = +planData.amount + +fandFamData.amount - +couponData.amount;

    return (
        <>
            <div className={`justify-content-between d-flex`}>
                <Dropdown className="me-2 default_color">
                    <Dropdown.Toggle className="default_btn_color" id="dropdown-basic">
                        Any
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => onClickHandler("delete")}>
                            Delete
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => onClickHandler("invalidate")}>
                            Invalidate{" "}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="me-4">
                    <Dropdown.Toggle className="default_btn_color" id="dropdown-basic">
                        Manual
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            data-bs-toggle="modal"
                            data-bs-target="#addnewblog_modal"
                            data-bs-whatever="@mdo"
                        >
                            Add
                        </Dropdown.Item>
                        <Dropdown.Item> Email to Client </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <select
                    id="event"
                    name="event"
                    className="border-0 default_color"
                    style={{ width: "50px" }}
                >
                    <option value="all">All</option>
                </select>
            </div>

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
                                Add Invoice
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

                                    <h6 className={`text-dark mb-2 mt-2`}>To</h6>
                                    <div className="mb-3 col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={addInvoiceData.toName}
                                            onChange={(e) => setAddInvoiceData({ ...addInvoiceData, toName: e.target.value })}
                                            placeholder="Recipent Name"
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={addInvoiceData.toEmail}
                                            onChange={(e) => setAddInvoiceData({ ...addInvoiceData, toEmail: e.target.value })}
                                            placeholder="Recipent Email"
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <textarea
                                            className="form-control"
                                            value={addInvoiceData.toAddress}
                                            onChange={(e) => setAddInvoiceData({ ...addInvoiceData, toAddress: e.target.value })}
                                            placeholder="Recipent Address"
                                        ></textarea>
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <input
                                            type="number"
                                            className="form-control"
                                            value={addInvoiceData.toContactNo}
                                            onChange={(e) => setAddInvoiceData({ ...addInvoiceData, toContactNo: e.target.value })}
                                            placeholder="Recipent Telephone"
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={addInvoiceData.invoiceDate}
                                            onChange={(e) => setAddInvoiceData({ ...addInvoiceData, invoiceDate: e.target.value })}
                                            placeholder="invoice Date"
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={addInvoiceData.invoiceDeadline}
                                            onChange={(e) => setAddInvoiceData({ ...addInvoiceData, invoiceDeadline: e.target.value })}
                                            placeholder="invoice Deadline"
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={addInvoiceData.invoicePeriod}
                                            onChange={(e) => setAddInvoiceData({ ...addInvoiceData, invoicePeriod: e.target.value })}
                                            placeholder="invoice Period"
                                        />
                                    </div>
                                </div>
                                <Row>
                                    <h6 className={`text-dark mb-2 mt-2`}>Charges Details</h6>
                                    <div className="col-md-6">
                                        <label className={`form-label ${styles.lable}`}>
                                            Plan Description{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            value={planData.discription}
                                            onChange={(e) => setPlanData({ ...planData, discription: e.target.value })}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className={`form-label ${styles.lable}`}>Rate</label>
                                        <input
                                            type="number"
                                            className={`form-control`}
                                            value={planData.rate}
                                            onChange={(e) => setPlanData({ ...planData, rate: e.target.value })}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className={`form-label ${styles.lable}`}>Tax </label>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            value={planData.tax}
                                            onChange={(e) => setPlanData({ ...planData, tax: e.target.value })}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className={`form-label ${styles.lable}`}>
                                            Amount{" "}
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control`}
                                            value={planData.amount}
                                            onChange={(e) => setPlanData({ ...planData, amount: e.target.value })}
                                            placeholder=""
                                        />
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col-md-6">
                                        <label className={`form-label ${styles.lable}`}>
                                            F&F App Description{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            value={fandFamData.discription}
                                            onChange={(e) => setFandFamData({ ...fandFamData, discription: e.target.value })}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className={`form-label ${styles.lable}`}>Rate</label>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            value={fandFamData.rate}
                                            onChange={(e) => setFandFamData({ ...fandFamData, rate: e.target.value })}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className={`form-label ${styles.lable}`}>Tax </label>
                                        <input
                                            type="text"
                                            className={`form-control`}
                                            value={fandFamData.tax}
                                            onChange={(e) => setFandFamData({ ...fandFamData, tax: e.target.value })}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className={`form-label ${styles.lable}`}>
                                            Amount{" "}
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control`}
                                            value={fandFamData.amount}
                                            onChange={(e) => setFandFamData({ ...fandFamData, amount: e.target.value })}
                                            placeholder=""
                                        />
                                    </div>
                                </Row>
                                <Row className="mt-3">
                                    <div className="col-md-6">
                                        <label className={`form-label ${styles.lable}`}>
                                            Coupon Description{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control mb-3`}
                                            value={couponData.discription}
                                            onChange={(e) => setCouponData({ ...couponData, discription: e.target.value })}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className={`form-label ${styles.lable}`}>Rate</label>
                                        <input
                                            type="number"
                                            className={`form-control mb-3`}
                                            value={couponData.rate}
                                            onChange={(e) => setCouponData({ ...couponData, rate: e.target.value })}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className={`form-label ${styles.lable}`}>Tax </label>
                                        <input
                                            type="text"
                                            className={`form-control mb-3`}
                                            value={couponData.tax}
                                            onChange={(e) => setCouponData({ ...couponData, tax: e.target.value })}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-md-2">
                                        <label className={`form-label ${styles.lable}`}>
                                            Amount{" "}
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control mb-3`}
                                            value={couponData.amount}
                                            onChange={(e) => setCouponData({ ...couponData, amount: e.target.value })}
                                            placeholder=""
                                        />
                                    </div>
                                </Row>
                                <Row>
                                    <div className="col-md-9"></div>
                                    <div className="col-md-3">
                                        <label className="form-label">Total </label>
                                        <input
                                            type="number"
                                            readOnly
                                            value={totalAmount}
                                            className={`form-control`}
                                            placeholder=""
                                        />
                                    </div>
                                </Row>
                                <div className="row mt-3">
                                    <div className="mb-3 col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={addInvoiceData.status}
                                            onChange={(e) => setAddInvoiceData({ ...addInvoiceData, status: e.target.value })}
                                            placeholder="Payment Status"
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={addInvoiceData.type}
                                            onChange={(e) => setAddInvoiceData({ ...addInvoiceData, type: e.target.value })}
                                            placeholder="Payment Type"
                                        />
                                    </div>
                                    <div className="mb-3 col-md-6">
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={addInvoiceData.paymentDate}
                                            onChange={(e) => setAddInvoiceData({ ...addInvoiceData, paymentDate: e.target.value })}
                                            placeholder="Payment Date"
                                        />
                                    </div>
                                </div>
                                <div className="blog_popup_details">
                                    <div className="mb-3 col-md-6">
                                        <label className="form-label">Image</label>
                                        <input
                                            type="file"
                                            accept="image/apng, image/avif, image/jpg, image/jpeg, image/png"
                                            value={addInvoiceData.image}
                                            onChange={(e) => setAddInvoiceData({ ...addInvoiceData, image: e.target.value })}
                                            required="required"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-primary submit_btn"
                                            data-bs-dismiss="modal"
                                            onClick={(e) => handleSubmit(e)}
                                        >
                                            Add Invoice
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
}
