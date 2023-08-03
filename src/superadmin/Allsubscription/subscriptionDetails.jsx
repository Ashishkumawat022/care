import React, { useState, useEffect } from "react";
import SubDetailTable from "./subDetailTable";
import axios from "axios";
import cx from "./subscriptiondetails.module.css";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useHistory } from "react-router-dom";


const SubscriptionDetails = () => {

    const params = useParams();

    const history = useHistory()
    const [show2, setShow2] = useState(false);
    const [rowsData, setrowData] = useState([]);
    const [planData, setplanData] = useState([]);
    const [planStartDate, setplanStartDate] = useState('');
    const [trialExpDate, setTrialExpDate] = useState('');
    const [subExpDate, setSubExpDate] = useState('');
    const [changeTrExpDt, setChangeTrExpDt] = useState(false);
    const [adminId, setAdminId] = useState('');
    const [manualSwitch, setManualSwitch] = useState(false);
    const handleClose2 = () => {
        setShow2(false);
        setChangeTrExpDt(false)
    }
    const handleShow2 = (type) => {
        if (type === 'trial') {
            setChangeTrExpDt(true);
        }else{
            setChangeTrExpDt(false);
        }
        setShow2(true);
    } 
    
    const redirectToClient = () => {
      //Redirect to another route
      history.push(`/superadmin/clientdetails/${params.id}`) 
    }

    useEffect(() => {
        subsDetails();
    }, []);

    function handleSubmit(type) {
        if (type === 'trial') {
            let stDate = new Date(planStartDate);
            let expDate = new Date(trialExpDate);
            let stMilis = stDate.getTime();
            let expMilis = expDate.getTime();
            if (expMilis > 0) {
                changePlanDate(stMilis, expMilis, 0)
            }
        } else {
            if (subExpDate === 'Indefinite') {
                changePlanDate(0, 0, subExpDate)
            } else {
                let subDt = new Date(subExpDate);
                let subMilis = subDt.getTime();
                if (subMilis > 0) {
                    changePlanDate(0, 0, subMilis)
                }
            }
        }
        handleClose2();
    }
    
    function subsDetails() {
        var config = {
            method: "get",
            url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getCareSitewithCoupon?careSiteId=${params.subId}`, //63a99df1afc3d3918bc13600 ${careHomeId}
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("superadmin_token"),
            },
        };
        axios(config)
            .then(function (res) {
                let alldata = res.data.result[0];
                let expDt = new Date(alldata.subscriptionPlanData?.trialExpiry);
                let stDt = new Date(alldata.subscriptionPlanData?.planstartDate);
                let last = new Date(alldata.subscriptionPlanData?.lastBillingDate);
                let next = new Date(alldata.subscriptionPlanData?.nextBillingDate);
                let planstartDt = `${stDt.getDate()}-${(stDt.getMonth() + 1)}-${stDt.getFullYear()}`;
                let planExpDt = `${expDt.getDate()}-${(expDt.getMonth() + 1)}-${expDt.getFullYear()}`;
                let lastBilDate = `${last.getDate()}-${(last.getMonth() + 1)}-${last.getFullYear()}`;
                let nextBilDate = `${next.getDate()}-${(next.getMonth() + 1)}-${next.getFullYear()}`;
                let subExp = '';
                if (alldata.subscriptionPlanData?.planExpiryDate === 'Indefinite') {
                    subExp = 'Indefinite';
                } else {
                    let subDt = new Date(alldata.subscriptionPlanData?.planExpiryDate);
                    subExp = `${subDt.getDate()}-${(subDt.getMonth() + 1)}-${subDt.getFullYear()}`;
                }
                let rowdata = [];
                let chargdetail = alldata.subscriptionPlanData.chargesDetails;
                // let coupendetail = alldata.couponData;
                for (let i = 0; i < chargdetail.length; i++) {
                    for (let j = 0; j < alldata.couponData.length; j++) {
                        if (i === j) {
                            rowdata.push({
                                type: alldata.couponData[i]?.couponType,
                                productName: chargdetail[i]?.discription,
                                productID: alldata.couponData[i]?.couponId,
                                qty: chargdetail[i]?.qty,
                                unitPrice: chargdetail[i]?.rate,
                                tax: chargdetail[i]?.tax,
                                totalPrice: chargdetail[i]?.amount,
                                lastBillingDate: lastBilDate,
                                nextBillingDate: nextBilDate
                            });
                        }
                    }
                }
                setAdminId(alldata.subscriptionPlanData.adminId);
                setplanStartDate(planstartDt);
                setTrialExpDate(planExpDt);
                setSubExpDate(subExp);
                setrowData(rowdata);
                setplanData(alldata.subscriptionPlanData);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function changePlanDate(stMilis, expMilis, subMilis) {
        if (stMilis > 0 && expMilis > 0) {
            var data = JSON.stringify({
                "careSiteId": localStorage.getItem('carehomeId'),
                "adminId": adminId,//6319bee4690a9d8c518b1759
                "planstartDate": stMilis,
                "trialExpiryDate": expMilis
            });
        } else {
            var data = JSON.stringify({
                "careSiteId": localStorage.getItem('carehomeId'),
                "adminId": adminId,//6319bee4690a9d8c518b1759
                "subExpiryDate": subMilis,
            });
        }
        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editSubAndTrialExpiry`,
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("superadmin_token"),
            },
            data: data
        };
        axios(config)
            .then(function (response) {
                subsDetails();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleManualSwitch = (event) => {
        setManualSwitch(event.target.checked);
        (event.target.checked) ? setSubExpDate('Indefinite') : setSubExpDate('');
    };

    return <div className="page-wrapper">
        <div className="card">
            <div className="card-body">
                <div className="d-flex">
                    <h3>{planData?.companyName} </h3>
                    <a href="#" className="ms-3 mt-1" onClick={redirectToClient}>Client Details</a>
                </div>
                <h4>{planData?.careSiteName}</h4>
                <div className="row justify-content-between">
                    <div className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}>
                        <h5>
                            Subscription Details
                        </h5>
                        <ul>
                            <li>Subscription ID: {planData?.finalId}</li>
                            <li>Subscription Start Date: {planStartDate}</li>
                            <li>Subscription Activation Date: {trialExpDate}</li>
                            <li className='d-flex justify-content-between'>Subscription Expiry Date: {subExpDate} <a href="#" onClick={() => handleShow2('subscription')}>Change</a></li>
                            <li>Subscription Renewal Frequency: {planData?.monthyOrYearly}</li>
                            <li>Subscription Price Total: {planData?.planRate}</li>
                        </ul>
                    </div>
                    <div className={`col-12 col-md-5 col-lg-6 ${cx.cardBox}`}>
                        <h5>
                            Site Details
                        </h5>
                        <ul>
                            <div className='d-flex'>
                                <li className='w-50'>Site Name: {planData.careSiteName}</li>
                                <li className='w-50'><a>Site No: </a></li>
                            </div>
                            <li>Address: {planData.billingAddress}</li>
                        </ul>
                    </div>
                    <div className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}>
                        <h5>
                            Plan Details
                        </h5>
                        <ul>
                            <li>Plan Type: {planData.SubscriptionPlan}    <a>TRIAL</a></li>
                            <li>Plan ID: {planData.SubscriptionPlanId}</li>
                        </ul>
                    </div>
                    <div className={`col-12 col-md-5 col-lg-6 ${cx.cardBox}`}>
                        <h5>
                            Trial Details
                        </h5>
                        <ul>
                            <li>Trial Status: Active</li>
                            <div className='d-flex justify-content-between'>
                                <li>Trial Start Date: {planStartDate}</li>
                                <li><a>Total Trial Days: </a></li>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <li className='d-flex justify-content-between'>Trial Expiry Date: <span> {trialExpDate} </span> <a href="#" onClick={() => handleShow2('trial')}>Change</a></li>

                                {/* {changeTrExpDt ?
                                    <li className='d-flex'>Trial Expiry Date: <span> {trialExpDate} </span> <a className="me-0 ms-1" href="#" onClick={() => setChangeTrExpDt(false)}>Change</a></li> :
                                    <li className='d-flex'>Trial Expiry Date: <div className="times"> <input type="date" value={trialExpDate}
                                        onChange={(e) => { setTrialExpDate(e.target.value) }} /></div> <a className="me-0 ms-1" href="#" onClick={() => handleSubmit('trial')} >Submit</a></li>} */}

                                <li className="ms-2">Trial Days Left: {planData.trialDaysLeft}</li>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
            <SubDetailTable rowsData={rowsData} />
        </div>

        <Modal className="viewModal" show={show2} onHide={handleClose2}>
            <Modal.Header>
                <Modal.Title>
                    <span>Edit</span>
                    <div className="d-flex">
                        <button className="btn" onClick={handleClose2}>
                            Close
                        </button>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ padding: '10px 20px' }}>
                <form>
                    <div className="row">
                        {!changeTrExpDt && <FormControlLabel
                            control={<Switch checked={manualSwitch} onChange={handleManualSwitch} />}
                            label="Set Indefinite"
                            className="mb-2"
                        />}
                        {!manualSwitch && !changeTrExpDt &&
                            <div className="col-md-12 mb-3">
                                <label className="mb-1">Set Date</label>
                                <div className="d-flex">
                                    <input type="date" className="form-control" value={subExpDate}
                                        onChange={(e) => { setSubExpDate(e.target.value) }} />
                                </div>
                            </div>}
                        {manualSwitch &&!changeTrExpDt &&
                            <div className="col-md-12 mb-3">
                                <select className="form-select"  >
                                    <option value="Indefinite">Indefinite</option>
                                </select>
                            </div>}
                        {changeTrExpDt &&
                            <div className="col-md-12 mb-3">
                                <label className="mb-1">Set Date</label>
                                <div className="d-flex">
                                    <input type="date" className="form-control" value={trialExpDate}
                                        onChange={(e) => { setTrialExpDate(e.target.value) }} />
                                </div>
                            </div>}
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <div className="d-flex">
                    {changeTrExpDt ?
                        <button className="btn" type="button" onClick={() => handleSubmit('trial')} >Save</button> :
                        <button className="btn" type="button" onClick={() => handleSubmit('subscription')} >Save</button>}
                </div>
            </Modal.Footer>
        </Modal>
    </div>
}
export default SubscriptionDetails;