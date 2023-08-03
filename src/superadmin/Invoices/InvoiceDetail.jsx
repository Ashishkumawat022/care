import React, {useState} from 'react';
import { NavLink } from "react-router-dom";
import cx from "./invoices.module.css";
import { Dropdown } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import styles from './invoices.module.css';
import { fetch5 } from "../../Apis/commonApis";

export default function InvoiceDetail(props) {
    const { setShowInvoiceDetails, invoiceDetail } = props;

    let editableData = {
        invoiceId: invoiceDetail.id,
        fromName: invoiceDetail.fromName,
        fromAddress: invoiceDetail.fromAddress,
        fromEmail: invoiceDetail.fromEmail,
        toName: invoiceDetail.toName,
        toAddress: invoiceDetail.toAddress,
        toEmail: invoiceDetail.toEmail,
        toContactNo: invoiceDetail.toContactNo
    }

    const [editMode, setEditMode] = useState(true);
    const [editDetails, setEditDetails] = useState(editableData);

    const saveEditDetailHandler = async() => {
        const result = await fetch5(`editInvoice`, editDetails);
        alert(result.message);
    }
    
    const sendInvoiceToClient = async() => {
        let invoiceId = {invoiceId: invoiceDetail.id}
        const result = await fetch5(`sendInvoice`, invoiceId);
        alert(result.message);
    }

    function editInvoiceHandler(){
        setEditMode(false);
    }

    return (
        <div className="container-fluid min_height">
            <div className="card">
                <h4 className="card-title ms-4">
                    Invoice Details
                    <div className={`float-end justify-content-between align-items-center d-flex just me-5`}>
                        <a href='#' className={styles.invoiceBack} onClick={() => setShowInvoiceDetails(false)}>go back</a>
                        <Dropdown >
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className={styles.btnHead}>
                                Action
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={editInvoiceHandler}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={saveEditDetailHandler}>Save </Dropdown.Item>
                                <Dropdown.Item onClick={sendInvoiceToClient}>Send to client</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </h4>
                <div className="card-body">
                    <Row>
                        <Col lg={10} className={`${cx.invoiceBody}`}>

                            <Row style={{ justifyContent: "space-between" }}>
                                <Col lg={6} md={6} className={`${cx.left}`}>
                                    <h6 className={`${cx.fweight} text-dark mb-4`}>Invoice Date: {invoiceDetail.invoiceDate.split('T')[0]}</h6>
                                    <input
                                        type="text"
                                        value={editDetails.fromName}
                                        readOnly={editMode}
                                        onChange={(e) => setEditDetails({...editDetails, fromName: e.target.value})}
                                        className="form-control"
                                        placeholder="Your Company Name"
                                    />
                                    <textarea
                                        className="form-control"
                                        value={editDetails.fromAddress}
                                        readOnly={editMode}
                                        onChange={(e) => setEditDetails({...editDetails, fromAddress: e.target.value})}
                                        placeholder="Your Company Address"
                                    ></textarea>
                                    <input
                                        type="email"
                                        value={editDetails.fromEmail}
                                        readOnly={editMode}
                                        onChange={(e) => setEditDetails({...editDetails, fromEmail: e.target.value})}
                                        className="form-control"
                                        placeholder="Your Company Email"
                                    />
                                </Col>

                                <Col lg={6} md={6} className={`${cx.right}`}>
                                    <h6 className={`d-flex justify-content-end${cx.fweight} text-dark mb-2 mt-2`}>To</h6>
                                    <input
                                        type="text"
                                        value={editDetails.toName}
                                        readOnly={editMode}
                                        onChange={(e) => setEditDetails({...editDetails, toName: e.target.value})}
                                        className="form-control"
                                        placeholder="Recipent Name"
                                    />
                                    <textarea
                                        className="form-control"
                                        value={editDetails.toAddress}
                                        readOnly={editMode}
                                        onChange={(e) => setEditDetails({...editDetails, toAddress: e.target.value})}
                                        placeholder="Recipent Address"
                                    ></textarea>
                                    <input
                                        type="email"
                                        value={editDetails.toEmail}
                                        readOnly={editMode}
                                        onChange={(e) => setEditDetails({...editDetails, toEmail: e.target.value})}
                                        className="form-control"
                                        placeholder="Recipent Email"
                                    />
                                    <input
                                        type="email"
                                        value={editDetails.toContactNo}
                                        readOnly={editMode}
                                        onChange={(e) => setEditDetails({...editDetails, toContactNo: e.target.value})}
                                        className="form-control"
                                        placeholder="Recipent Telephone"
                                    />
                                </Col>
                            </Row>
                            <Row className='justify-content-between'>
                                <Col lg={6} md={6} className={`${cx.left}`}>
                                    <ul>
                                        <li>
                                            <span className={`${cx.fweight} text-dark`}>Invoice Period</span>
                                        </li>
                                        <li>
                                            <span>{invoiceDetail.invoicePeriod}</span>
                                        </li>
                                    </ul>
                                </Col>
                                <Col lg={6} md={6} className={`${cx.right}`}>
                                    <ul>
                                        <li>
                                            <span className={`${cx.fweight} text-dark`}>Invoice No.</span>
                                            <span className={`${cx.fweight} text-dark`}>Invoice Date</span>
                                        </li>
                                        <li>
                                            <span>{invoiceDetail.invoiceNo}</span>
                                            <span>{invoiceDetail.invoiceDate.split('T')[0]}</span>
                                        </li>
                                        <li>
                                            <span></span>
                                            <span className={`${cx.fweight} text-dark`}>Invoice Deadline</span>
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
                                    <label className="text-dark mb-2">Description </label>
                                </div>
                                <div className="col-md-2">
                                    <label className="text-dark mb-2">Rate</label>
                                </div>
                                <div className="col-md-2">
                                    <label className="text-dark mb-2">Tax </label>
                                </div>
                                <div className="col-md-2">
                                    <label className="text-dark mb-2">Amount </label>
                                </div>
                            </Row>

                            {invoiceDetail.chargesDetails.map((item, index) => {
                                return (
                                    <Row key={index}>
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                value={item.discription}
                                                readOnly
                                                className={`form-control mb-3 ${cx.invoice_desc_border}`}
                                                placeholder="" />
                                        </div>
                                        <div className="col-md-2">
                                            <input
                                                type="text"
                                                value={item.rate}
                                                readOnly
                                                className={`form-control mb-3 ${cx.invoice_desc_border}`}
                                                placeholder="" />
                                        </div>
                                        <div className="col-md-2">
                                            <input
                                                type="text"
                                                value={item.tax}
                                                readOnly
                                                className={`form-control mb-3 ${cx.invoice_desc_border}`}
                                                placeholder="" />
                                        </div>
                                        <div className="col-md-2">
                                            <input
                                                type="text"
                                                value={item.amount}
                                                readOnly
                                                className={`form-control mb-3 ${cx.invoice_desc_border}`}
                                                placeholder="" />
                                        </div>
                                    </Row>
                                )
                            }
                            )}
                            <Row>
                                <div className="col-md-9"></div>
                                <div className="col-md-3 mt-1">
                                    <label className="text-dark">Total </label>
                                    <input
                                        type="text"
                                        value={invoiceDetail.total}
                                        readOnly
                                        className={`form-control ${cx.invoice_desc_border}`}
                                        placeholder=""
                                    />
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
