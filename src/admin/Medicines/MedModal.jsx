import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Fragment } from 'react';
import Modal from "react-bootstrap/Modal";
import { fetch6 } from "../../Apis/commonApis";

function MedModal(props) {
    const { editHistDetail, editMedHist, clientId, oHistMedId, closeModal } = props;

    const initialState = {
        careHomeId: "",
        clientId: "",
        medicineId: "",
        prescribeName: "",
        prescribeAgencyName: "",
        pharmacyName: "",
        orderDate: "",
        receiveDate: "",
        productGTIN: "",
        qty: "",
        unitPrice: "",
        tax: ""
    }

    const [medDetail, setMedDetail] = useState(initialState);
    const [careHomeId, setCareHomeId] = useState('');

    useEffect(() => {
        let cId = localStorage.getItem('carehomeId');
        setCareHomeId(cId);
    }, []);

    useEffect(() => {
        if (editHistDetail) {
            setMedDetail({
                ...medDetail,
                careHomeId: careHomeId,
                clientId: clientId,
                medicineId: oHistMedId,
                orderHistoyId: editHistDetail._id,
                prescribeName: editHistDetail.prescribeName ? editHistDetail.prescribeName : '',
                prescribeAgencyName: editHistDetail.prescribeAgencyName ? editHistDetail.prescribeAgencyName : '',
                pharmacyName: editHistDetail.pharmacyName ? editHistDetail.pharmacyName : '',
                orderDate: editHistDetail.orderDate ? editHistDetail.orderDate : '',
                receiveDate: editHistDetail.receiveDate ? editHistDetail.receiveDate : '',
                productGTIN: editHistDetail.productGTIN ? editHistDetail.productGTIN : '',
                qty: editHistDetail.qty ? editHistDetail.qty : '',
                unitPrice: editHistDetail.unitPrice ? editHistDetail.unitPrice : '',
                tax: editHistDetail.tax ? editHistDetail.tax : ''
            });
        } else {
            setMedDetail({
                careHomeId: careHomeId,
                clientId: clientId,
                medicineId: oHistMedId,
                prescribeName: "",
                prescribeAgencyName: "",
                pharmacyName: "",
                orderDate: "",
                receiveDate: "",
                productGTIN: "",
                qty: "",
                unitPrice: "",
                tax: ""
            });
        }
    }, [editHistDetail, closeModal])

    function handleAddEdit() {
        if (editMedHist.selected && editHistDetail) {
            editMedicineHistory();
        } else {
            createMedHistory();
        }
        closeModal();
    }

    const editMedicineHistory = async () => {
        const result = await fetch6('editMedicineOrderHistory', medDetail);
        if (result) props.showTable();
    }

    const createMedHistory = async () => {
        const result = await fetch6('createMedicineOrderHistory', medDetail);
        if (result.status) props.showTable();
    }

    return (
        <Fragment>

            <Modal className="viewModal" show={props.showModal} onHide={closeModal}>
                <Modal.Header>
                    <Modal.Title>
                        <span>Edit</span>
                        <div className="d-flex">
                            <button className="btn" onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '10px 20px' }}>
                    <form>
                        <div className="row">
                            <div className="col-md-12 mb-3">
                                <label className="mb-1">Prerscriber</label>
                                <input type="text" className="form-control" value={medDetail.prescribeName}
                                    onChange={(e) => setMedDetail({ ...medDetail, prescribeName: e.target.value })} />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label className="mb-1">Agency</label>
                                <input type="text" className="form-control" value={medDetail.prescribeAgencyName}
                                    onChange={(e) => setMedDetail({ ...medDetail, prescribeAgencyName: e.target.value })} />
                            </div>
                            <div className="col-md-12 mb-3">
                                <label className="mb-1">Pharmacy Name</label>
                                <input type="text" className="form-control" value={medDetail.pharmacyName}
                                    onChange={(e) => setMedDetail({ ...medDetail, pharmacyName: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-md-12 mb-3">
                            <div className="d-flex justify-content-between">
                                <div className="col-6 mb-3">
                                    <label className="mb-1">Order Date</label>
                                    <input type="date" className="form-control" style={{ width: '94%' }} value={medDetail.orderDate}
                                        onChange={(e) => setMedDetail({ ...medDetail, orderDate: e.target.value })} />
                                </div>
                                <div className="col-6">
                                    <label className="mb-1"> Receive Date</label>
                                    <input type="date" className="form-control" value={medDetail.receiveDate}
                                        onChange={(e) => setMedDetail({ ...medDetail, receiveDate: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="col-6 mb-3">
                                <label className="mb-1">Unit Price</label>
                                <input type="number" className="form-control" style={{ width: '94%' }} value={medDetail.unitPrice}
                                    onChange={(e) => setMedDetail({ ...medDetail, unitPrice: e.target.value })} />
                            </div>
                            <div className="col-6">
                                <label className="mb-1">Quntity</label>
                                <input type="number" className="form-control" value={medDetail.qty}
                                    onChange={(e) => setMedDetail({ ...medDetail, qty: e.target.value })} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="col-6 mb-3">
                                <label className="mb-1">Product GTIN</label>
                                <input type="text" className="form-control" style={{ width: '94%' }} value={medDetail.productGTIN}
                                    onChange={(e) => setMedDetail({ ...medDetail, productGTIN: e.target.value })} />
                            </div>
                            <div className="col-6">
                                <label className="mb-1">Tax</label>
                                <input type="number" className="form-control" value={medDetail.tax}
                                    onChange={(e) => setMedDetail({ ...medDetail, tax: e.target.value })} />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="d-flex">
                        <button className="btn" type="button" onClick={() => handleAddEdit()}>Save Edit</button>

                    </div>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default MedModal
