import React, { useState, useEffect, Fragment } from "react";
import cx from "./medicinedetails.module.css";
import { Accordion } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import Typography from "@mui/material/Typography";
import OrderHistoryTable from "./orderHistoryTable";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import MedModal from "./MedModal";
import { fetch6 } from "../../Apis/commonApis";

export default function InsideMedicineTable(props) {
  const { idClient, allMedicines, rowDataDetail } = props;
  const [show2, setShow2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [add, setAdd] = useState(false);
  const [editItem, setEditItem] = useState({
    e1: false,
    e2: false,
    e3: false,
    e4: false,
    e5: false,
  });
  const handleClose2 = () => {
    clearFormFields();
    setEditItem({ e1: false, e2: false, e3: false, e4: false, e5: false });
    setAdd(false);
    setShow2(false);
  };

  const handleShow2 = () => {
    setAdd(true);
    setShow2(true);
  };

  const [medSource, setmedSource] = useState("dmd");
  const [medName, setMedName] = useState("");
  const [prescriber, setPrescriber] = useState("");
  const [description, setDescription] = useState("");
  const [medType, setmedType] = useState("");
  const [units, setunits] = useState("");
  const [strengthUnit, setstrengthUnit] = useState("");
  const [strengthDose, setstrengthDose] = useState("");
  const [doseAmount, setdoseAmount] = useState("");
  const [startDate, setstartDate] = useState("");
  const [durationofCourse, setdurationofCourse] = useState({
    inputVal: "1",
    selectType: "Days",
  });
  const [frequency, setfrequency] = useState("Daily");
  const [adminRoute, setadminRoute] = useState("Orally");
  const [schedulestarttime, setschedulestarttime] = useState("");
  const [scheduleendtime, setscheduleendtime] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [supplierName, setsupplierName] = useState("");
  const [licAuth, setlicAuth] = useState("");
  const [strengthVals, setstrengthVals] = useState({
    StrValNmrtr: "",
    StrValNmrtrUnit: "mg",
    StrValDmrtr: "",
    StrValDmrtrUnit: "ml",
  });
  const [doseDetails, setdoseDetails] = useState({
    doseForm: "",
    doseRoute: "",
    unitDoseSize: "",
    unitDoseUnit: "",
    unitDoseUnitMeasure: "",
  });
  const [exclusions, setExclusions] = useState({
    sugarFree: "No",
    gluFree: "No",
    presFree: "No",
    cfcFree: "No",
  });
  const [manualSwitch, setManualSwitch] = useState(false);
  const [manualMedNames, setManualMedNames] = useState([]);
  const [custumMedId, setCustumMedId] = useState("");
  const [editMedId, setEditMedId] = useState("");
  const [careHomeId, setcareHomeId] = useState("");
  const [careAdminToken, setcareAdminToken] = useState("");
  const [oHistMedId, setOHistMedId] = useState("");
  const [editMedHist, setEditMedHist] = useState({ selected: false, id: "" });
  const [editHistDetail, setEditHistDetail] = useState(null);

  // const [medId, setMedId] = useState('');setManualSwitch

  useEffect(() => {
    // setMedId(rowDataDetail[0]._id)
    let homeId = localStorage.getItem("carehomeId");
    let adminToken = localStorage.getItem("care_admin_token");
    setcareHomeId(homeId);
    setcareAdminToken(adminToken);
    // getOrderHistory(adminToken);
    getManulyCreatedMeds(adminToken);
  }, []);

  const addMedicine = async () => {
    var finalDuration = "";
    if (durationofCourse.selectType === "Days") {
      finalDuration = durationofCourse.inputVal;
    } else if (durationofCourse.selectType === "Weeks") {
      finalDuration = durationofCourse.inputVal * 7;
    } else if (durationofCourse.selectType === "Months") {
      finalDuration = durationofCourse.inputVal * 30;
    }
    var data = {
      careHomeId: careHomeId,
      clientId: idClient,
      SOURCE: medSource,
      medName: medName,
      prescriber: prescriber,
      medType: medType,
      units: units,
      strengthUnit: strengthUnit,
      strengthDose: strengthDose,
      doseAmount: doseAmount,
      startDate: startDate,
      durationofCourse: finalDuration,
      frequency: frequency,
      adminRoute: adminRoute,
      schedule: `${schedulestarttime} - ${scheduleendtime}`,
      NM: medName,
      DESC: description,
      BNF_CODE: "",
      SUPPCD: supplierName,
      LIC_AUTHCD: licAuth,
      ONT_FORMCD: `${doseDetails.doseForm}.${doseDetails.doseForm}`,
      ISID: ingredient,
      UDFS: doseDetails.unitDoseSize,
      UDFS_UOMCD: doseDetails.unitDoseUnit,
      UNIT_DOSE_UOMCD: doseDetails.unitDoseUnitMeasure,
      STRNT_NMRTR_VAL: strengthVals.StrValNmrtr,
      STRNT_NMRTR_UOMCD: strengthVals.StrValNmrtrUnit,
      STRNT_DNMTR_VAL: strengthVals.StrValDmrtr,
      STRNT_DNMTR_UOMCD: strengthVals.StrValDmrtrUnit,
      SUG_F: exclusions.sugarFree,
      GLU_F: exclusions.gluFree,
      PRES_F: exclusions.presFree,
      CFC_F: exclusions.cfcFree,
    };

    const result = await fetch6("createMedicines", data);
    if (result.status) {
      props.showTable();
      props.getClientRowData();
    }
  };

  function handleEditMed() {
    rowDataDetail.map((item) => {
      if (item._id === editMedId) {
        if (
          item.startDate.split("T")[0] !== startDate ||
          item.durationofCourse !== durationofCourse.inputVal ||
          durationofCourse.selectType !== "Days" ||
          item.frequency !== frequency ||
          item.schedule !== schedulestarttime + "-" + scheduleendtime
        ) {
          deleteMedicine();
        } else {
          editMedicine();
        }
      }
    });
  }

  function deleteMedicine() {
    var axios = require("axios");
    var data = JSON.stringify({
      careHomeId: careHomeId,
      clientId: idClient,
      customMedicineId: custumMedId,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deleteMedicines`,
      headers: {
        Authorization: careAdminToken,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (res) {
        if (res.data.status) {
          addMedicine();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function editMedicine() {
    var finalDuration = "";
    if (durationofCourse.selectType === "Days") {
      finalDuration = durationofCourse.inputVal;
    } else if (durationofCourse.selectType === "Weeks") {
      finalDuration = durationofCourse.inputVal * 7;
    } else if (durationofCourse.selectType === "Months") {
      finalDuration = durationofCourse.inputVal * 30;
    }
    var data = JSON.stringify({
      clientId: idClient,
      customMedicineId: custumMedId,
      medName: medName,
      prescriber: prescriber,
      medType: medType,
      units: units,
      strengthUnit: strengthUnit,
      strengthDose: strengthDose,
      doseAmount: doseAmount,
      startDate: startDate,
      durationofCourse: finalDuration,
      frequency: frequency,
      adminRoute: adminRoute,
      schedule: `${schedulestarttime} - ${scheduleendtime}`,
      NM: medName,
      DESC: description,
      BNF_CODE: "",
      SUPPCD: supplierName,
      LIC_AUTHCD: licAuth,
      ONT_FORMCD: `${doseDetails.doseForm}.${doseDetails.doseForm}`,
      ISID: ingredient,
      UDFS: doseDetails.unitDoseSize,
      UDFS_UOMCD: doseDetails.unitDoseUnit,
      UNIT_DOSE_UOMCD: doseDetails.unitDoseUnitMeasure,
      STRNT_NMRTR_VAL: strengthVals.StrValNmrtr,
      STRNT_NMRTR_UOMCD: strengthVals.StrValNmrtrUnit,
      STRNT_DNMTR_VAL: strengthVals.StrValDmrtr,
      STRNT_DNMTR_UOMCD: strengthVals.StrValDmrtrUnit,
      SUG_F: exclusions.sugarFree,
      GLU_F: exclusions.gluFree,
      PRES_F: exclusions.presFree,
      CFC_F: exclusions.cfcFree,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/editMedicines`,
      headers: {
        Authorization: careAdminToken,
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (res) {
        props.showTable();
        props.getClientRowData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getSpicificDmdDetails = (dmdId) => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/getSpecificDmdMedicineDetail?APID=${dmdId}`,
      method: "GET",
      headers: { Authorization: careAdminToken },
    })
      .then((res) => {
        let specific = res.data;
        setDescription(specific?.ampData[0]?.DESC?._text);
        setsupplierName(specific?.SUPPCD[0]?.SUPPLIER?.INFO?.DESC?._text);
        setlicAuth(
          specific?.LIC_AUTHCD[0]?.LICENSING_AUTHORITY?.INFO?.DESC?._text
        );
        setIngredient(specific?.ISID[0]?.NM?._text);
        setmedType(specific?.UDFS_UOMCD[0]?.UNIT_OF_MEASURE?.INFO?.DESC?._text);
        setExclusions({
          sugarFree:
            specific?.vmpData[0]?.SUG_F?._text?.length > 0 ? "Yes" : "No",
          gluFree:
            specific?.vmpData[0]?.GLU_F?._text?.length > 0 ? "Yes" : "No",
          presFree:
            specific?.vmpData[0]?.PRES_F?._text?.length > 0 ? "Yes" : "No",
          cfcFree:
            specific?.vmpData[0]?.CFC_F?._text?.length > 0 ? "Yes" : "No",
        });
        setstrengthVals({
          StrValNmrtr: specific?.STRNT_NMRTR_VAL?._text,
          StrValNmrtrUnit:
            specific?.STRNT_NMRTR_UOMCD[0]?.UNIT_OF_MEASURE?.INFO?.DESC?._text,
          StrValDmrtr: specific?.STRNT_DNMTR_VAL,
          StrValDmrtrUnit: specific?.STRNT_DNMTR_UOMCD,
        });
        setdoseDetails({
          doseForm:
            specific?.ONT_FORMCD[0]?.ONT_FORM_ROUTE?.INFO?.DESC?._text?.split(
              "."
            )[0],
          doseRoute:
            specific?.ONT_FORMCD[0]?.ONT_FORM_ROUTE?.INFO?.DESC?._text?.split(
              "."
            )[1],
          unitDoseSize: specific?.UDFS + "." + "000",
          unitDoseUnit:
            specific?.UDFS_UOMCD[0]?.UNIT_OF_MEASURE?.INFO?.DESC?._text,
          unitDoseUnitMeasure:
            specific?.UNIT_DOSE_UOMCD[0]?.UNIT_OF_MEASURE?.INFO?.DESC?._text,
        });
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const handleManualSwitch = (event) => {
    clearFormFields();
    setmedSource(event.target.checked ? "manual" : "dmd");
    setManualSwitch(event.target.checked);
  };

  function clearFormFields() {
    setmedSource("dmd");
    setMedName("");
    setDescription("");
    setsupplierName("");
    setlicAuth("");
    setIngredient("");
    setmedType("");
    setPrescriber("");
    setunits("");
    setstrengthUnit("");
    setstrengthDose("");
    setdoseAmount("");
    setstartDate("");
    setfrequency("Daily");
    setadminRoute("Orally");
    setschedulestarttime("");
    setscheduleendtime("");
    setstrengthVals({
      StrValNmrtr: "",
      StrValNmrtrUnit: "mg",
      StrValDmrtr: "",
      StrValDmrtrUnit: "ml",
    });
    setdoseDetails({
      doseForm: "",
      doseRoute: "",
      unitDoseSize: "",
      unitDoseUnit: "",
      unitDoseUnitMeasure: "",
    });
    setdurationofCourse({ inputVal: "1", selectType: "Days" });
    setExclusions({
      sugarFree: "No",
      gluFree: "No",
      presFree: "No",
      cfcFree: "No",
    });
    setEditMedId("");
    setCustumMedId("");
  }

  const getManulyCreatedMeds = (adminToken) => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/getDmdManual?careHomeId=${careHomeId}`,
      method: "GET",
      headers: { Authorization: adminToken },
    })
      .then((res) => {
        let details = res.data.data;
        let manualMeds = [];
        for (let i = 0; i < details?.length; i++) {
          manualMeds.push({
            label: details[i]?.medicine?.NM,
            value: details[i]?.medicine?._id,
          });
        }
        setManualMedNames(manualMeds);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const getManualMedDetails = (medId) => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/getSpecificDmdManual?careHomeId=${careHomeId}&medicineId=${medId}`,
      method: "GET",
      headers: { Authorization: careAdminToken },
    })
      .then((res) => {
        let specific = res.data.data[0].medicine;
        setDescription(specific?.DESC);
        setsupplierName(specific?.SUPPCD);
        setlicAuth(specific?.LIC_AUTHCD);
        setIngredient(specific?.ISID);
        setmedType(specific?.medType);
        setExclusions({
          sugarFree: specific?.SUG_F,
          gluFree: specific?.GLU_F,
          presFree: specific?.PRES_F,
          cfcFree: specific?.CFC_F,
        });
        setstrengthVals({
          StrValNmrtr: specific?.STRNT_NMRTR_VAL,
          StrValNmrtrUnit: specific?.STRNT_NMRTR_UOMCD,
          StrValDmrtr: specific?.STRNT_DNMTR_VAL,
          StrValDmrtrUnit: specific?.STRNT_DNMTR_UOMCD,
        });
        setdoseDetails({
          doseForm: specific?.ONT_FORMCD?.split(".")[0],
          doseRoute: specific?.ONT_FORMCD?.split(".")[1],
          unitDoseSize: specific?.UDFS,
          unitDoseUnit: specific?.UDFS_UOMCD,
          unitDoseUnitMeasure: specific?.UNIT_DOSE_UOMCD,
        });
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const medIconColor = {
    filter:
      "invert(9%) sepia(99%) saturate(5630%) hue-rotate(246deg) brightness(111%) contrast(148%)",
  };

  const handleManualName = (event) => {
    setMedName(event.target.value);
  };

  const onSelectManualMed = (name, value) => {
    setMedName(name);
    getManualMedDetails(value);
  };
  const onSelectDmdMed = (name, value) => {
    getSpicificDmdDetails(value);
    setMedName(name);
  };

  const editMedDetails = (edit, medid, customId) => {
    setCustumMedId(customId);
    setEditMedId(medid);
    rowDataDetail.map((item) => {
      if (item._id === medid) {
        setmedSource(item.SOURCE);
        setMedName(item.medName);
        setPrescriber(item.prescriber);
        setDescription(item.DESC);
        setsupplierName(item.SUPPCD);
        setlicAuth(item.LIC_AUTHCD);
        setmedType(item.medType);
        setunits(item.units);
        setstrengthUnit(item.strengthUnit);
        setstrengthDose(item.strengthDose);
        setdoseAmount(item.doseAmount);
        setstartDate(item.startDate.split("T")[0]);
        setdurationofCourse({
          inputVal: item.durationofCourse,
          selectType: "Days",
        });
        setfrequency(item.frequency);
        setadminRoute(item.adminRoute);
        setschedulestarttime(item.schedule.split("-")[0]);
        setscheduleendtime(item.schedule.split("-")[1]);
        setIngredient(item.ISID);
        setstrengthVals({
          StrValNmrtr: item.STRNT_NMRTR_VAL,
          StrValNmrtrUnit: item.STRNT_NMRTR_UOMCD,
          StrValDmrtr: item.STRNT_DNMTR_VAL,
          StrValDmrtrUnit: item.STRNT_DNMTR_UOMCD,
        });
        setExclusions({
          sugarFree: item.SUG_F,
          gluFree: item.GLU_F,
          presFree: item.PRES_F,
          cfcFree: item.CFC_F,
        });
        setdoseDetails({
          doseForm: item.ONT_FORMCD?.split(".")[0],
          doseRoute: item.ONT_FORMCD?.split(".")[1],
          unitDoseSize: item.UDFS,
          unitDoseUnit: item.UDFS_UOMCD,
          unitDoseUnitMeasure: item.UNIT_DOSE_UOMCD,
        });
      }
    });
    setShow2(true);
    if (edit === "productDetails") {
      setEditItem({ e1: true, e2: false, e3: false, e4: false, e5: false });
    } else if (edit === "productIngredients") {
      setEditItem({ e1: false, e2: true, e3: false, e4: false, e5: false });
    } else if (edit === "doseDetails") {
      setEditItem({ e1: false, e2: false, e3: true, e4: false, e5: false });
    } else if (edit === "productExclusions") {
      setEditItem({ e1: false, e2: false, e3: false, e4: true, e5: false });
    } else if (edit === "requirement_inventory") {
      setEditItem({ e1: false, e2: false, e3: false, e4: false, e5: true });
    }
  };

  const showHistoryModal = (medId, detail, type) => {
    setOHistMedId(medId);
    if (type === "add") {
      setShowModal(true);
    } else {
      if (editMedHist.selected) {
        setShowModal(true);
        detail.forEach((elem) => {
          if (elem._id === editMedHist.id) {
            setEditHistDetail(elem);
          }
        });
      }
    }
  };

  const closeHistoryModal = () => {
    setEditHistDetail(null);
    setShowModal(false);
  };

  return (
    <>
      <div className="float-end btns_head">
        <button className="btn btn-theme btn-sm" onClick={handleShow2}>
          Add
        </button>
      </div>
      <a
        style={{ cursor: "pointer", color: "#0d6efd" }}
        onClick={() => props.showTable()}
      >
        go back
      </a>
      <Fragment>
        {rowDataDetail.map((item, index) => {
          return (
            <div
              key={index}
              className="page-wrapper"
              style={{ margin: "14px 0px 0px 0px", paddingTop: "8px" }}
            >
              <div className="container-fluid">
                <div className="card">
                  <div className="card-body" style={{ padding: "0px" }}>
                    <Accordion defaultActiveKey="1">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>{item.medName}</Accordion.Header>
                        <Accordion.Body>
                          <div
                            className="row"
                            style={{ justifyContent: "space-between" }}
                          >
                            <div
                              className={`col-12 col-md-5 col-lg-6 ${cx.cardBox}`}
                            >
                              <h5>
                                Product Details
                                {item.SOURCE !== "dmd" && (
                                  <a
                                    className={`${cx.editIcon}`}
                                    onClick={() =>
                                      editMedDetails(
                                        "productDetails",
                                        item._id,
                                        item.customMedicineId
                                      )
                                    }
                                  >
                                    Edit
                                  </a>
                                )}
                              </h5>
                              <ul>
                                <li>Name: {item.medName}</li>
                                <li>Description: {item.DESC}</li>
                                <li>Supplier Name: {item.SUPPCD}</li>
                                <li>Medicine Code: {item.BNF_CODE}</li>
                                <li>
                                  Current Licencing Authority: {item.LIC_AUTHCD}
                                </li>
                              </ul>
                            </div>
                            <div
                              className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}
                            >
                              <h5>
                                Product Ingredients
                                {item.SOURCE !== "dmd" && (
                                  <a
                                    className={`${cx.editIcon}`}
                                    onClick={() =>
                                      editMedDetails(
                                        "productIngredients",
                                        item._id,
                                        item.customMedicineId
                                      )
                                    }
                                  >
                                    Edit
                                  </a>
                                )}
                              </h5>
                              <ul>
                                <li>Ingredient: {item.ISID}</li>
                                <li>
                                  Strength value numerator:{" "}
                                  {item.STRNT_NMRTR_VAL}
                                </li>
                                <li>
                                  Strength value numerator unit:{" "}
                                  {item.STRNT_NMRTR_UOMCD}
                                </li>
                                <li>
                                  Strength value denominator:{" "}
                                  {item.STRNT_DNMTR_VAL}
                                </li>
                                <li>
                                  Strength value denominator unit:{" "}
                                  {item.STRNT_DNMTR_UOMCD}
                                </li>
                              </ul>
                            </div>
                            <div
                              className={`col-12 col-md-5 col-lg-6 ${cx.cardBox}`}
                            >
                              <h5>
                                Product Dose Details
                                {item.SOURCE !== "dmd" && (
                                  <a
                                    className={`${cx.editIcon}`}
                                    onClick={() =>
                                      editMedDetails(
                                        "doseDetails",
                                        item._id,
                                        item.customMedicineId
                                      )
                                    }
                                  >
                                    Edit
                                  </a>
                                )}
                              </h5>
                              <ul>
                                <li>
                                  Dose Form: {item.ONT_FORMCD.split(".")[0]}
                                </li>
                                <li>
                                  Dose Route: {item.ONT_FORMCD.split(".")[1]}
                                </li>
                                <li>
                                  Unit dose form size:{" "}
                                  {item.UDFS ? item.UDFS : "0"}
                                </li>
                                <li>Unit dose form units: {item.UDFS_UOMCD}</li>
                                <li>
                                  Unit dose unit of measure:{" "}
                                  {item.UNIT_DOSE_UOMCD}
                                </li>
                              </ul>
                            </div>
                            <div
                              className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}
                            >
                              <h5>
                                Product Exclusions
                                {item.SOURCE !== "dmd" && (
                                  <a
                                    className={`${cx.editIcon}`}
                                    onClick={() =>
                                      editMedDetails(
                                        "productExclusions",
                                        item._id,
                                        item.customMedicineId
                                      )
                                    }
                                  >
                                    Edit
                                  </a>
                                )}
                              </h5>
                              <ul>
                                <li>Sugar Free: {item.SUG_F}</li>
                                <li>Gluten Free: {item.GLU_F}</li>
                                <li>Preservative Free: {item.PRES_F}</li>
                                <li>CFC Free: {item.CFC_F}</li>
                              </ul>
                            </div>
                            <div
                              className={`col-12 col-md-5 col-lg-6 ${cx.cardBox}`}
                            >
                              <h5>
                                Margaret Dosage Requirements
                                <a
                                  className={`${cx.editIcon}`}
                                  onClick={() =>
                                    editMedDetails(
                                      "requirement_inventory",
                                      item._id,
                                      item.customMedicineId
                                    )
                                  }
                                >
                                  Edit
                                </a>
                              </h5>
                              <ul>
                                <div className="d-flex">
                                  <li className="w-50">PRN: No</li>
                                  <li className="w-50">
                                    Duration of Course: {item.durationofCourse}{" "}
                                    Days
                                  </li>
                                </div>
                                <div className="d-flex">
                                  <li className="w-50">
                                    Dose form size: {item.doseAmount}
                                  </li>
                                  <li className="w-50">
                                    Frequency: {item.frequency}{" "}
                                  </li>
                                </div>
                                <div className="d-flex">
                                  <li className="w-50">Dose form units: ml</li>
                                  <li className="w-50">
                                    Time: {item.schedule}
                                  </li>
                                </div>
                                <div className="d-flex">
                                  <li className="w-50">
                                    Start Date: {item.startDate.split("T")[0]}
                                  </li>
                                  <li className="w-50">
                                    Meal considerations: After Meal
                                  </li>
                                </div>
                              </ul>
                            </div>
                            <div
                              className={`col-12 col-md-5 col-lg-5 ${cx.cardBox}`}
                            >
                              <h5>
                                Inventory
                                <a
                                  className={`${cx.editIcon}`}
                                  onClick={() =>
                                    editMedDetails(
                                      "requirement_inventory",
                                      item._id,
                                      item.customMedicineId
                                    )
                                  }
                                >
                                  Edit
                                </a>
                              </h5>
                              <ul>
                                <li>Last Ordered Qty: 50</li>
                                <li>Total Quantity Ordered (till date): 150</li>
                                <li>Remaining Quantity: 20</li>
                                <li>Reorder Alert Trigger: 10</li>
                              </ul>
                            </div>
                          </div>
                          <div className=" btns_head d-flex pt-2 pb-2 border-top">
                            <Typography
                              sx={{ flex: "1 1 100%" }}
                              variant="h6"
                              id="tableTitle"
                              component="div"
                            >
                              Order History
                            </Typography>
                            <button
                              className="btn btn-theme btn-sm"
                              onClick={() =>
                                showHistoryModal(
                                  item._id,
                                  item.orderHistory,
                                  "add"
                                )
                              }
                            >
                              Add
                            </button>
                            <div
                              className="mx-3 link-primary mt-2"
                              role="button"
                              onClick={() =>
                                showHistoryModal(
                                  item?._id,
                                  item?.orderHistory,
                                  "edit"
                                )
                              }
                            >
                              {editMedHist.selected
                                ? "Edit"
                                : `${"\xa0\xa0\xa0\xa0\xa0\xa0\xa0"}`}
                            </div>
                          </div>
                          <OrderHistoryTable
                            orderHistory={item?.orderHistory}
                            setEditMedHist={setEditMedHist}
                          />
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <MedModal
          showModal={showModal}
          showTable={props.showTable}
          closeModal={closeHistoryModal}
          clientId={idClient}
          oHistMedId={oHistMedId}
          editHistDetail={editHistDetail}
          editMedHist={editMedHist}
        />

        <Modal className="viewModal" show={show2} onHide={handleClose2}>
          <Modal.Header>
            <Modal.Title>
              {editItem.e1 ||
              editItem.e2 ||
              editItem.e3 ||
              editItem.e4 ||
              editItem.e5 ? (
                <span>Edit</span>
              ) : (
                <span>Add Medicine</span>
              )}
              <div className="d-flex">
                <button className="btn" onClick={handleClose2}>
                  Close
                </button>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: "10px 20px" }}>
            <form>
              <div className="row">
                {!(
                  editItem.e1 ||
                  editItem.e2 ||
                  editItem.e3 ||
                  editItem.e4 ||
                  editItem.e5
                ) && (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={manualSwitch}
                        onChange={handleManualSwitch}
                      />
                    }
                    label="Add Medicine Menually"
                    className="mb-2"
                  />
                )}
                {!manualSwitch &&
                  !(
                    editItem.e1 ||
                    editItem.e2 ||
                    editItem.e3 ||
                    editItem.e4 ||
                    editItem.e5
                  ) && (
                    <div className="col-md-12 mb-3">
                      {/* <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={allMedicines}
                                        sx={{ width: 'auto' }}
                                        renderInput={(params) => <TextField {...params} label="Name" />}
                                    /> */}
                      <label className="mb-1">Select Medicine Name</label>
                      {/* <Select options={allMedicines} onChange={handleChange} value={selectedOption} /> */}
                      <input
                        type="text"
                        className="form-control"
                        value={medName}
                        placeholder="Search for medicine"
                        onChange={handleManualName}
                      />
                      <div className={` ${cx.dropdown}`}>
                        {allMedicines
                          .filter((item) => {
                            const searchTerm = medName.toLowerCase();
                            const fullName = item?.label.toLowerCase();
                            return (
                              searchTerm &&
                              fullName.startsWith(searchTerm) &&
                              fullName !== searchTerm
                            );
                          })
                          .slice(0, 20)
                          .map((item) => (
                            <div
                              onClick={() =>
                                onSelectDmdMed(item.label, item.value)
                              }
                              className={`${cx.dropdownRow}`}
                              key={item.value}
                            >
                              {item.label}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                {(manualSwitch || editItem.e1) && (
                  <div className="col-md-12 mb-3">
                    <label className="mb-1">Add Medicine Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={medName}
                      onChange={handleManualName}
                    />
                    <div className={` ${cx.dropdown}`}>
                      {manualMedNames
                        .filter((item) => {
                          const searchTerm = medName.toLowerCase();
                          const fullName = item?.label.toLowerCase();
                          return (
                            searchTerm &&
                            fullName.startsWith(searchTerm) &&
                            fullName !== searchTerm
                          );
                        })
                        .slice(0, 20)
                        .map((item) => (
                          <div
                            onClick={() =>
                              onSelectManualMed(item.label, item.value)
                            }
                            className={`${cx.dropdownRow}`}
                            key={item.value}
                          >
                            {item.label}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                {(editItem.e1 || add) && (
                  <>
                    <div className="col-md-12 mb-3">
                      <label className="mb-1">Prerscriber</label>
                      <input
                        type="text"
                        className="form-control"
                        value={prescriber}
                        onChange={(e) => setPrescriber(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="mb-1">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="mb-1">Supplier Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={supplierName}
                        onChange={(e) => setsupplierName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="mb-1">
                        Current Licencing Authority
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={licAuth}
                        onChange={(e) => setlicAuth(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {(editItem.e2 || add) && (
                  <>
                    <div className="col-md-12 mb-3">
                      <label className="mb-1">Ingredient</label>
                      <input
                        type="text"
                        className="form-control"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                      />
                    </div>
                    <div className="d-flex">
                      <div className="col-md-6 mb-3">
                        <label className="mb-1">Strength value numerator</label>
                        <input
                          type="text"
                          className="form-control"
                          value={strengthVals.StrValNmrtr}
                          style={{ width: "94%" }}
                          onChange={(e) =>
                            setstrengthVals({
                              ...strengthVals,
                              StrValNmrtr: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="mb-1"> Unit</label>
                        <select
                          className="form-select"
                          defaultValue={strengthVals.StrValNmrtrUnit}
                          onChange={(e) =>
                            setstrengthVals({
                              ...strengthVals,
                              StrValNmrtrUnit: e.target.value,
                            })
                          }
                        >
                          <option
                            selected={
                              strengthVals.StrValNmrtrUnit === "ml"
                                ? true
                                : false
                            }
                            value="ml"
                          >
                            Mls
                          </option>
                          <option
                            selected={
                              strengthVals.StrValNmrtrUnit === "mg"
                                ? true
                                : false
                            }
                            value="mg"
                          >
                            Mgs
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="col-md-6 mb-3">
                        <label className="mb-1">
                          Strength value denominator
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={strengthVals.StrValDmrtr}
                          style={{ width: "94%" }}
                          onChange={(e) =>
                            setstrengthVals({
                              ...strengthVals,
                              StrValDmrtr: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="mb-1"> Unit</label>
                        <select
                          className="form-select"
                          defaultValue={strengthVals.StrValDmrtrUnit}
                          onChange={(e) =>
                            setstrengthVals({
                              ...strengthVals,
                              StrValDmrtrUnit: e.target.value,
                            })
                          }
                        >
                          <option
                            selected={
                              strengthVals.StrValDmrtrUnit === "ml"
                                ? true
                                : false
                            }
                            value="ml"
                          >
                            Mls
                          </option>
                          <option
                            selected={
                              strengthVals.StrValDmrtrUnit === "mg"
                                ? true
                                : false
                            }
                            value="mg"
                          >
                            Mgs
                          </option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
                {(editItem.e3 || add) && (
                  <>
                    <div className="d-flex">
                      <div className="col-md-6 mb-3">
                        <label className="mb-1">Dose Form</label>
                        <input
                          type="text"
                          className="form-control"
                          value={doseDetails.doseForm}
                          style={{ width: "94%" }}
                          onChange={(e) =>
                            setdoseDetails({
                              ...doseDetails,
                              doseForm: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="mb-1"> Dose Route</label>
                        <input
                          type="text"
                          className="form-control"
                          value={doseDetails.doseRoute}
                          onChange={(e) =>
                            setdoseDetails({
                              ...doseDetails,
                              doseRoute: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="col-md-6 mb-3">
                        <label className="mb-1">Unit dose form size</label>
                        <input
                          type="number"
                          className="form-control"
                          value={doseDetails.unitDoseSize}
                          style={{ width: "94%" }}
                          onChange={(e) =>
                            setdoseDetails({
                              ...doseDetails,
                              unitDoseSize: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="mb-1">Unit dose form units</label>
                        <input
                          type="text"
                          className="form-control"
                          value={doseDetails.unitDoseUnit}
                          onChange={(e) =>
                            setdoseDetails({
                              ...doseDetails,
                              unitDoseUnit: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="mb-1">Unit dose unit of measure</label>
                      <input
                        type="text"
                        className="form-control"
                        value={doseDetails.unitDoseUnitMeasure}
                        onChange={(e) =>
                          setdoseDetails({
                            ...doseDetails,
                            unitDoseUnitMeasure: e.target.value,
                          })
                        }
                      />
                    </div>
                  </>
                )}
                {(editItem.e4 || add) && (
                  <>
                    <div className="d-flex">
                      <div className="col-md-6 mb-3">
                        <label className="mb-1">Sugar Free</label>
                        <select
                          className="form-select"
                          onChange={(e) =>
                            setExclusions({
                              ...exclusions,
                              sugarFree: e.target.value,
                            })
                          }
                          style={{ width: "94%" }}
                        >
                          <option
                            selected={exclusions.sugarFree === "No"}
                            value="No"
                          >
                            No
                          </option>
                          <option
                            selected={exclusions.sugarFree === "Yes"}
                            value="Yes"
                          >
                            Yes
                          </option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="mb-1">Gluten Free</label>
                        <select
                          className="form-select"
                          onChange={(e) =>
                            setExclusions({
                              ...exclusions,
                              gluFree: e.target.value,
                            })
                          }
                        >
                          <option
                            selected={exclusions.gluFree === "No"}
                            value="No"
                          >
                            No
                          </option>
                          <option
                            selected={exclusions.gluFree === "Yes"}
                            value="Yes"
                          >
                            Yes
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="col-md-6 mb-3">
                        <label className="mb-1">Preservative Free</label>
                        <select
                          className="form-select"
                          onChange={(e) =>
                            setExclusions({
                              ...exclusions,
                              presFree: e.target.value,
                            })
                          }
                          style={{ width: "94%" }}
                        >
                          <option
                            selected={exclusions.presFree === "No"}
                            value="No"
                          >
                            No
                          </option>
                          <option
                            selected={exclusions.presFree === "Yes"}
                            value="Yes"
                          >
                            Yes
                          </option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="mb-1">CFC Free</label>
                        <select
                          className="form-select"
                          onChange={(e) =>
                            setExclusions({
                              ...exclusions,
                              cfcFree: e.target.value,
                            })
                          }
                        >
                          <option
                            selected={exclusions.cfcFree === "No"}
                            value="No"
                          >
                            No
                          </option>
                          <option
                            selected={exclusions.cfcFree === "Yes"}
                            value="Yes"
                          >
                            Yes
                          </option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
                {(editItem.e5 || add) && (
                  <>
                    <div className="col-md-12 mb-3">
                      <label className="mb-1">Medicine Type</label>
                      <div className="d-flex">
                        <ul className="type_icon">
                          <li
                            onClick={() => {
                              setmedType("tablet");
                            }}
                          >
                            <img
                              style={
                                medType === "tablet"
                                  ? medIconColor
                                  : { filter: "none" }
                              }
                              src="../../../images/sdf1.svg"
                            />
                          </li>
                          <li
                            onClick={() => {
                              setmedType("capsule");
                            }}
                          >
                            <img
                              style={
                                medType === "capsule"
                                  ? medIconColor
                                  : { filter: "none" }
                              }
                              src="../../../images/sdf2.svg"
                            />
                          </li>
                          <li
                            onClick={() => {
                              setmedType("liquid");
                            }}
                          >
                            <img
                              style={
                                medType === "liquid" || medType === "ml"
                                  ? medIconColor
                                  : { filter: "none" }
                              }
                              src="../../../images/sdf3.svg"
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="mb-1">Units (In-Stock)</label>
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control me-2"
                          value={units}
                          onChange={(e) => setunits(e.target.value)}
                        />
                        <select className="form-select ms-2">
                          <option>Mls</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="mb-1">Strength/Unit</label>
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control me-2"
                          value={strengthUnit}
                          onChange={(e) => setstrengthUnit(e.target.value)}
                        />
                        <select className="form-select ms-2">
                          <option>Mls</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="mb-1">Strength/Dose</label>
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control me-2"
                          value={strengthDose}
                          onChange={(e) => setstrengthDose(e.target.value)}
                        />
                        <select className="form-select ms-2">
                          <option>Mls</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-12 mb-3">
                      <label className="mb-1">Dose Amount</label>
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control me-2"
                          value={doseAmount}
                          onChange={(e) => setdoseAmount(e.target.value)}
                        />
                        <select className="form-select ms-2">
                          <option>Mls</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="mb-1">Start Date</label>
                      <div className="d-flex">
                        <input
                          type="date"
                          className="form-control"
                          value={startDate}
                          onChange={(e) => {
                            setstartDate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="mb-1">Duration of Course</label>
                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control"
                          value={durationofCourse.inputVal}
                          onChange={(e) =>
                            setdurationofCourse({
                              ...durationofCourse,
                              inputVal: e.target.value,
                            })
                          }
                        />
                        <select
                          className="form-select ms-2"
                          onChange={(e) =>
                            setdurationofCourse({
                              ...durationofCourse,
                              selectType: e.target.value,
                            })
                          }
                        >
                          <option value="Days">Days</option>
                          <option value="Weeks">Weeks</option>
                          <option value="Months">Months</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="mb-1">Frequency</label>
                      <div className="d-flex">
                        <select
                          className="form-select"
                          onChange={(e) => setfrequency(e.target.value)}
                        >
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                        </select>
                      </div>
                    </div>
                    {/* Sunday */}
                    <div className="col-md-12 mb-3">
                      <label className="mb-1">Schedule</label>
                      <div className="d-flex">
                        <div className="col-md-6 mb-3">
                          <label className="mb-1">Start Time</label>
                          <input
                            className="form-control"
                            placeholder="start time"
                            type="time"
                            value={schedulestarttime}
                            onChange={(e) =>
                              setschedulestarttime(e.target.value)
                            }
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="mb-1">End Time</label>
                          <input
                            className="form-control"
                            placeholder="end time"
                            type="time"
                            value={scheduleendtime}
                            onChange={(e) => setscheduleendtime(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="mb-1">Adminstration Route</label>
                      <div className="d-flex">
                        <select
                          className="form-select"
                          onChange={(e) => setadminRoute(e.target.value)}
                        >
                          <option value="Orally">Orally</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              {editItem.e1 ||
              editItem.e2 ||
              editItem.e3 ||
              editItem.e4 ||
              editItem.e5 ? (
                <button
                  className="btn"
                  type="button"
                  onClick={() => {
                    handleEditMed();
                    setShow2(false);
                  }}
                >
                  Save Edit
                </button>
              ) : (
                <button
                  className="btn"
                  type="button"
                  onClick={() => {
                    addMedicine();
                    setShow2(false);
                  }}
                >
                  Save
                </button>
              )}
            </div>
          </Modal.Footer>
        </Modal>
      </Fragment>
    </>
  );
}
