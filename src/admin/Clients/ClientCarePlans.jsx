import { NavLink } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useParams } from "react-router-dom";
import DownloadCarePlan from "./DownloadCarePlan";

const data = [
  {
    value: 1,
    Ctg: "Personal Care",
    image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s1.svg`,
  },
  {
    value: 2,
    Ctg: "Health",
    image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s2.svg`,
  },
  {
    value: 3,
    Ctg: "Mobility",
    image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s3.svg`,
  },
  {
    value: 4,
    Ctg: "Diet",
    image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s4.svg`,
  },
  {
    value: 5,
    Ctg: "Companionship",
    image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s5.svg`,
  },
  {
    value: 6,
    Ctg: "PRN Meds",
    image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s6.svg`,
  },
  {
    value: 7,
    Ctg: "Housekeeping",
    image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s7.svg`,
  },
  {
    value: 8,
    Ctg: "Report Incident",
    image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s8.svg`,
  },
];

const ClientCarePlans = () => {
  // --------------------------  LOCAL STORAGE DATA  --------------------------- //
  let urlID = JSON.parse(localStorage.getItem("userData"));
  let carehomeId = localStorage.getItem("carehomeId");
  const [globalCarePlanTemplate, setGlobalCarePlanTemplate] = useState([]);
  const [
    globalClientSpecificCarePlanTemplate,
    setGlobalClientSpecificCarePlanTemplate,
  ] = useState([]);
  const param = useParams();

  const [fullscreen, setFullscreen] = useState(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [fullscreen2, setFullscreen2] = useState(true);
  const [whentoshowwhatincareplanModal, setWhentoshowwhatincareplanModal] =
    useState("");
  const [carePlantemplete, setcarePlantemplete] = useState(false);

  const closecreateCareplanTemplate = () => setcarePlantemplete(false);

  const showcreateCarePlanTemplate = (type) => {
    setWhentoshowwhatincareplanModal(type);
    setcarePlantemplete(true);
  };
  const [fullscreen3, setFullscreen3] = useState(true);

  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const [fullscreen4, setFullscreen4] = useState(true);

  // --------------------  TEMPLATE STATUS STATES  ------------------------- //
  const [savebuttonstatus, setSaveButtonStatus] = useState("");
  const [updatedBy, setUpdatedBy] = useState("");
  const [lastupdate, setLastUpdated] = useState("");
  const [activeriskClass, setActiveriskClass] = useState("");
  const [activeclassOnClick, setActiveclassOnClick] = useState(false);
  const [activetemplateriskClass, setActivetemplateriskClass] = useState("");
  const [riskProfileCategory, setRiskProfileCategory] = useState("");
  const [specificTemplateDataCategory, setSpecificTemplateDataCategory] =
    useState({});

  function selectSpecificClientTemplate() {
    if (activeclassOnClick) setActiveclassOnClick(false);
    else setActiveclassOnClick(true);
  }

  function selectCategory(risk) {
    console.log(risk, "selectCategory");
    // setActiveriskClass(risk.risktype);
    data.forEach((elem) => {
      if (elem.value === risk.clientCarePlan.value) {
        elem["riskProfile"] = risk.risktype;
      }
    });
    if (risk.id) {
      UpdateCategoryRiskClientSpecific(risk.id, risk.risktype);
    }
  }
  // console.log(data, "after changing the values of the data property")

  function selectemplateriskCategory(risk) {
    setActivetemplateriskClass(risk.risktype);
  }

  function selectedriskProfileCategory(Category) {
    setRiskProfileCategory(Category);
  }

  const [templateName, setTemplateName] = useState("");
  // ----------------------------- Question & Answer Area ------------------------------- //
  const [ansfield, setansfiled] = useState("");
  const [quesfield, setquesfiled] = useState("");
  const [ansFields, setAnsfields] = useState([]);
  const [quesansFields, setQuesAnsFields] = useState([]); // Question and answer api sending array value

  const handleQuesAnsFormChange = (ques, ans) => {
    setQuesAnsFields((prev) => [
      ...prev,
      { que: ques, ans: ans, correctAnswer: "" },
    ]);
    setAnsfields([]);
    setquesfiled("");
    setansfiled("");
  };

  const handleAnsChange = (ans) => {
    setAnsfields((prev) => [...prev, ans]);
    setansfiled("");
  };
  const quesAnsRemoveChangeHandler = (removeIdx) => {
    const clonefield = quesansFields.slice();
    const data = clonefield.splice(removeIdx, 1);
    setQuesAnsFields(clonefield);
  };
  const ansRemoveChangeHandler = (removeIdx) => {
    const clonefield = ansFields.slice();
    const data = clonefield.splice(removeIdx, 1);
    setAnsfields(clonefield);
  };

  // ----------------------------- Oberservations, Needs and CommentsArea ------------------------------- //

  const [oberservationsfield, setOberservationsfiled] = useState("");
  const [oberservationsFields, setOberservationsfields] = useState([]); // Question and answer api sending array value

  const handleOberservationsChange = (ans) => {
    setOberservationsfields((prev) => [...prev, ans]);
    setOberservationsfiled("");
  };

  const oberservationsRemoveChangeHandler = (removeIdx) => {
    const clonefield = oberservationsFields.slice();
    const data = clonefield.splice(removeIdx, 1);
    setOberservationsfields(clonefield);
  };

  // -----------------------------  Outcomes Area ------------------------------- //

  const [outcomesfield, setOutcomesfiled] = useState("");
  const [outcomesFields, setOutcomesfields] = useState([]); // Question and answer api sending array value

  const handleOutcomesChange = (ans) => {
    setOutcomesfields((prev) => [...prev, ans]);
    setOutcomesfiled("");
  };

  const outcomesRemoveChangeHandler = (removeIdx) => {
    const clonefield = outcomesFields.slice();
    const data = clonefield.splice(removeIdx, 1);
    setOutcomesfields(clonefield);
  };

  // -----------------------------  Risks & Interventions Area ------------------------------- //

  const [risksfield, setRisksfiled] = useState("");
  const [risksFields, setRisksfields] = useState([]);
  const [interventionsfield, setInterventionsfiled] = useState("");
  const [interventionsFields, setInterventionsfields] = useState([]);
  const [risksinterventionsFields, setRisksInterventionsfields] = useState([]);

  const handleRisksInterventionsChange = (risk, intervations) => {
    setRisksfields((prev) => [...prev, risk]);
    setRisksfiled("");
    setInterventionsfields((prev) => [...prev, intervations]);
    setInterventionsfiled("");
    setRisksInterventionsfields((prev) => [
      ...prev,
      { risk: risk, interventions: intervations },
    ]);
  };

  const risksinterventionsRemoveChangeHandler = (removeIdx) => {
    const interventionclonefield = interventionsFields.slice();
    const intervationdata = interventionclonefield.splice(removeIdx, 1);
    setInterventionsfields(interventionclonefield);

    const clonefield = risksFields.slice();
    const data = clonefield.splice(removeIdx, 1);
    setRisksfields(clonefield);
  };

  function addclientcareplanhandler() {
    return {
      careHomeId: carehomeId,
      updated_by: `${urlID.firstName?.trim()} ${urlID?.lastName}`,
      riskProfileCategory: activeriskClass,
      categoryType: riskProfileCategory,
    };
  }

  // ---------------- Create Care plan Templates based on CarehomeId -------------------//

  function createCarePlanTemplate() {
    let { careHomeId, updated_by, riskProfileCategory, categoryType } =
      addclientcareplanhandler();
    let data = JSON.stringify({
      careHomeId: careHomeId,
      categoryType: categoryType,
      riskProfileCategory: riskProfileCategory,
      risk_profile: activetemplateriskClass,
      updated_by: updated_by,
      TemplateName: templateName,
      questions: quesansFields,
      obeservation_needs_comments: oberservationsFields,
      outcomes: outcomesFields,
      risk_interventions: risksinterventionsFields,
    });

    let config = {
      method: "POST",
      url: `${process.env.REACT_APP_BASEURL}/createCarePlanTemplate`,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("care_admin_token"),
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        closecreateCareplanTemplate();
        getClientSpecificByCategoryCarePlan();
        getCarePlanTemplate();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ---------------- Add Care plan Templates on Specific Client based on Category -------------------//
  function addCarePlanTemplateToClientSpecificCategory(type) {
    if (type === "add") {
      let data = JSON.stringify({
        careHomeId: specificTemplateDataCategory.carehomeId,
        categoryType: specificTemplateDataCategory.categoryType,
        riskProfileCategory: specificTemplateDataCategory.riskProfileCategory
          ? specificTemplateDataCategory.riskProfileCategory
          : "medium",
        risk_profile: specificTemplateDataCategory.templatedata.risk_profile
          ? specificTemplateDataCategory.templatedata.risk_profile
          : "high",
        updated_by: specificTemplateDataCategory.templatedata.updated_by,
        TemplateName: specificTemplateDataCategory.templatedata.TemplateName,
        questions: specificTemplateDataCategory.templatedata.questions,
        obeservation_needs_comments:
          specificTemplateDataCategory.templatedata.obeservation_needs_comments,
        outcomes: specificTemplateDataCategory.templatedata.outcomes,
        risk_interventions:
          specificTemplateDataCategory.templatedata.risk_interventions,
      });

      let config = {
        method: "POST",
        url: `${process.env.REACT_APP_BASEURL}/createClientCarePlan?careHomeId=${specificTemplateDataCategory.carehomeId}&clientId=${specificTemplateDataCategory.clientId}&templateId=${specificTemplateDataCategory.UniversalTempObjectId}&UniversalTempObjectId=${specificTemplateDataCategory.templatedata._id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("care_admin_token"),
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          closecreateCareplanTemplate();
          getClientSpecificByCategoryCarePlan();
          getCarePlanTemplate();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      let data = JSON.stringify({
        risk_profile: activetemplateriskClass,
        updated_by: updatedBy,
        questions: quesansFields,
        obeservation_needs_comments: oberservationsFields,
        outcomes: outcomesFields,
        risk_interventions: risksinterventionsFields,
      });

      let config = {
        method: "POST",
        url: `${process.env.REACT_APP_BASEURL}/updateClientCarePlan?careHomeId=${carehomeId}&clientId=${param.id}&objectId=${specificTemplateDataCategory.templatedata._id}&careplanObjId=${specificTemplateDataCategory.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("care_admin_token"),
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          closecreateCareplanTemplate();
          getClientSpecificByCategoryCarePlan();
          getCarePlanTemplate();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  // ---------------- Update Category Risk Profile Status on Specific Client -------------------//
  function UpdateCategoryRiskClientSpecific(id, risktype) {
    if (id) {
      let data = JSON.stringify({
        riskProfileCategory: risktype,
      });

      let config = {
        method: "POST",
        url: `${process.env.REACT_APP_BASEURL}/updateClientCarePlanRiskProfileCategory?careHomeId=${carehomeId}&clientId=${param.id}&careplanObjId=${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("care_admin_token"),
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          console.log(response, "getClientSpecificByCategoryCarePlan");
          getClientSpecificByCategoryCarePlan();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  // ---------------- Delete From Client Specific Template -------------------//
  function DeleteFromClientSpecificTemplate(objectId, parentObjectId) {
    let config = {
      method: "POST",
      url: `${process.env.REACT_APP_BASEURL}/deleteClientCarePlan?objectId=${objectId}&careHomeId=${carehomeId}&clientId=${param.id}&careplanObjId=${parentObjectId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("care_admin_token"),
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        closecreateCareplanTemplate();
        getClientSpecificByCategoryCarePlan();
        // getCarePlanTemplate();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ---------------- Delete Template From Templates Listing -------------------//
  function DeleteTemplateFromListing() {
    let config = {
      method: "POST",
      url: `${process.env.REACT_APP_BASEURL}/deleteCarePlanTemplate?objectId=${specificTemplateDataCategory.templatedata._id}&careHomeId=${carehomeId}&mainId=${specificTemplateDataCategory.UniversalTempObjectId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("care_admin_token"),
      },
    };
    axios(config)
      .then(function (response) {
        closecreateCareplanTemplate();
        getClientSpecificByCategoryCarePlan();
        getCarePlanTemplate();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // -----------------  Get Care plan Template details based on CarehomeId  -------------//

  function getCarePlanTemplate() {
    let config = {
      method: "GET",
      url: `${process.env.REACT_APP_BASEURL}/getCarePlanTemplate?careHomeId=${carehomeId}`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
      },
    };
    axios(config)
      .then(function (response) {
        console.log("getCarePlanTemplate", "response", response);
        // console.log(response.data.data, "getCarePlanTemplate")
        setGlobalCarePlanTemplate(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // -----------------  Get Care plan Template details based on Specific Client Category  -------------//

  function getClientSpecificByCategoryCarePlan() {
    let config = {
      method: "GET",
      url: `${process.env.REACT_APP_BASEURL}/getClientCarePlan?clientId=${param.id}`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
      },
    };
    axios(config)
      .then(function (response) {
        console.log(
          "getClientSpecificByCategoryCarePlan",
          "response",
          response
        );
        setGlobalClientSpecificCarePlanTemplate(response.data.data[0].carePlan);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getClientbyId();
    getCarePlanTemplate();
    getClientSpecificByCategoryCarePlan();
  }, []);

  const getClientbyId = () => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/clientbyId?clientId=${
        param.id
      }&careHomeId=${localStorage.getItem("carehomeId")}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        // console.log("============>>", res);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const downloadFileDocument = () => {
    const filename = document.getElementById("pagetoDownload");
    html2canvas(filename)
      .then((canvas) => {
        const imgWidth = 278;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        heightLeft -= pageHeight;
        const doc = new jsPDF("p", "mm", "a3");
        doc.addImage(
          canvas,
          "JPEG",
          10,
          position,
          imgWidth,
          imgHeight,
          "",
          "FAST"
        );
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(
            canvas,
            "JPEG",
            10,
            position,
            imgWidth,
            imgHeight,
            "",
            "FAST"
          );
          heightLeft -= pageHeight;
        }
        doc.save("Downld.pdf");
      })
      .catch((error) => console.log(error));
  };

  const [saveToDownloadsButtonStatus, setSaveToDownloadButtonStatus] =
    useState("");

  function saveToDownloads() {
    const filename = document.getElementById("pagetoDownload");
    html2canvas(filename)
      .then((canvas) => {
        const imgWidth = 278;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        heightLeft -= pageHeight;
        const doc = new jsPDF("p", "mm", "a3");
        doc.addImage(
          canvas,
          "JPEG",
          10,
          position,
          imgWidth,
          imgHeight,
          "",
          "FAST"
        );
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(
            canvas,
            "JPEG",
            10,
            position,
            imgWidth,
            imgHeight,
            "",
            "FAST"
          );
          heightLeft -= pageHeight;
        }

        const savepdftobase64format = new Blob([doc.output("blob")], {
          type: "application/pdf",
        });
        complianceDocs(savepdftobase64format);
      })
      .catch((error) => console.log(error));
  }

  function complianceDocs(blob) {
    let formdata = new FormData();
    formdata.append("docName", "Compliance Docs");
    formdata.append("type", "Compliance");
    formdata.append("creationDate", new Date().toDateString());
    formdata.append(
      "createdBy",
      `${urlID.firstName?.trim()} ${urlID?.lastName?.trim()}`
    );
    formdata.append("review", "review");
    formdata.append("image", blob, "document.pdf");

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/complianceDocs/${param.id}`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
      },
      data: formdata,
    };

    axios(config)
      .then(function (response) {
        getClientbyId();
        setSaveToDownloadButtonStatus("");
        setShow4(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <div className="btns_head">
        <h5 className="tb_title mt-0">
          {/* <DownloadPage rootElementById={"pagetoDownload"} downloadFileName={"testPage"} buttonName="Download" /> */}
          <button
            className=" mb-2 btn btn-theme btn-sm"
            onClick={() => {
              setShow4(true);
              setSaveToDownloadButtonStatus("toSave");
            }}
          >
            Save To Docs
          </button>
          <button
            className=" mb-2 btn btn-theme btn-sm"
            onClick={() => {
              setShow4(true);
              setSaveToDownloadButtonStatus("toDownload");
            }}
          >
            Download
          </button>
          <button className=" mb-2 btn btn-theme btn-sm" onClick={handleShow4}>
            Print
          </button>
          <div className="col-md-12 mt-2">
            <NavLink to="#" style={{ color: "#0C67BB" }}>
              Downloaded Care Plans
            </NavLink>
          </div>
        </h5>
      </div>
      <div className="accordion care_plan_list" id="accordionExample">
        {data.map((clientCarePlan) => {
          const resultantCarePlan = globalCarePlanTemplate.find(
            (careplan) => careplan.categoryType === clientCarePlan.Ctg
          );
          const resultantClientSpecificCarePlanTemplate =
            globalClientSpecificCarePlanTemplate.find(
              (careplan) => careplan.categoryType === clientCarePlan.Ctg
            );
          return (
            <div className="accordion-item">
              <h2
                className="accordion-header"
                id={`careplan_${clientCarePlan.value}`}
              >
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse_careplan_${clientCarePlan.value}`}
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <img alt="" src={clientCarePlan.image} /> {clientCarePlan.Ctg}
                </button>
              </h2>
              <div
                id={`collapse_careplan_${clientCarePlan.value}`}
                className="accordion-collapse collapse"
                aria-labelledby={`careplan_${clientCarePlan.value}`}
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <div className="row">
                    <div className="col-md-12">
                      <ul className="catList">
                        <h6>Select Category Risk Profile: </h6>
                        <li
                          className={
                            resultantClientSpecificCarePlanTemplate?.riskProfileCategory ===
                              "high" || clientCarePlan.riskProfile === "high"
                              ? "high"
                              : ""
                          }
                          style={{ backgroundColor: "#BE0C0C" }}
                          onClick={(e) =>
                            selectCategory({
                              risktype: "high",
                              clientCarePlan,
                              id: resultantCarePlan?._id,
                            })
                          }
                        >
                          High <br /> Risk
                        </li>
                        <li
                          className={
                            resultantClientSpecificCarePlanTemplate?.riskProfileCategory ===
                              "medium" ||
                            clientCarePlan.riskProfile === "medium"
                              ? "medium"
                              : ""
                          }
                          style={{ backgroundColor: "#D96A07" }}
                          onClick={(e) =>
                            selectCategory({
                              risktype: "medium",
                              clientCarePlan,
                              id: resultantCarePlan?._id,
                            })
                          }
                        >
                          Medium <br /> Risk
                        </li>
                        <li
                          className={
                            resultantClientSpecificCarePlanTemplate?.riskProfileCategory ===
                              "low" || clientCarePlan.riskProfile === "low"
                              ? "low"
                              : ""
                          }
                          style={{ backgroundColor: "#7D7D7D" }}
                          onClick={(e) =>
                            selectCategory({
                              risktype: "low",
                              clientCarePlan,
                              id: resultantCarePlan?._id,
                            })
                          }
                        >
                          Low <br /> Risk
                        </li>
                      </ul>
                    </div>
                    {resultantClientSpecificCarePlanTemplate?.template.map(
                      (cstemplate) => {
                        const updateddate = new Date(
                          cstemplate?.last_update_date
                        ).toDateString();
                        return (
                          <div className="col-md-3">
                            <div
                              className="living_box"
                              onClick={() => {
                                showcreateCarePlanTemplate("viewTemplate");
                                setActivetemplateriskClass(
                                  cstemplate.risk_profile
                                );
                                const updateddate = new Date(
                                  cstemplate.last_update_date
                                ).toDateString();
                                setTemplateName(cstemplate.TemplateName);
                                setUpdatedBy(cstemplate.updated_by);
                                setLastUpdated(updateddate);
                                setSpecificTemplateDataCategory({
                                  templatedata: cstemplate,
                                  riskProfileCategory:
                                    resultantClientSpecificCarePlanTemplate.riskProfileCategory,
                                  categoryType:
                                    resultantClientSpecificCarePlanTemplate.categoryType,
                                  id: resultantClientSpecificCarePlanTemplate._id,
                                });
                                // setQuesAnsFields()
                              }}
                            >
                              <h5>{cstemplate.TemplateName}</h5>
                              <p>{updateddate}</p>
                              {cstemplate.risk_profile === "high" && (
                                <div
                                  className="fAction"
                                  style={{ backgroundColor: "#BE0C0C" }}
                                >
                                  High
                                  <br />
                                  Risk
                                </div>
                              )}
                              {cstemplate.risk_profile === "medium" && (
                                <div
                                  className="fAction"
                                  style={{ backgroundColor: "#d96a07" }}
                                >
                                  Medium
                                  <br />
                                  Risk
                                </div>
                              )}
                              {cstemplate.risk_profile === "low" && (
                                <div
                                  className="fAction"
                                  style={{ backgroundColor: "#7d7d7d" }}
                                >
                                  Low
                                  <br />
                                  Risk
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      }
                    )}

                    <div className="col-md-3">
                      <Dropdown className="addPlus">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          <FaPlus
                            onClick={() => {
                              selectedriskProfileCategory(clientCarePlan.Ctg);
                            }}
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <div className="actionBtns">
                            <button
                              className="btn"
                              onClick={() => {
                                DeleteTemplateFromListing();
                              }}
                            >
                              Delete
                            </button>
                            <Dropdown className="createTemplate">
                              <Dropdown.Toggle
                                variant="success"
                                id="dropdown-basic"
                              >
                                Create New Template
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <div className="actionBtns">
                                  <button
                                    className="btn"
                                    onClick={() => {
                                      showcreateCarePlanTemplate("newTemplate");
                                      setSaveButtonStatus("add");
                                    }}
                                  >
                                    Create
                                  </button>
                                  <button className="btn">Close</button>
                                </div>
                                <div className="row mt-3 align-items-center">
                                  <div className="col-md-4">
                                    <label>Template Name</label>
                                  </div>
                                  <div className="col-md-8">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={templateName}
                                      onChange={(e) => {
                                        setTemplateName(e.target.value);
                                      }}
                                    />
                                  </div>
                                </div>
                              </Dropdown.Menu>
                            </Dropdown>

                            {/* <button className="btn">Add to Plan</button> */}
                            <button
                              className="btn"
                              onClick={() => {
                                addCarePlanTemplateToClientSpecificCategory(
                                  "add"
                                );
                              }}
                            >
                              Add to Plan
                            </button>
                          </div>
                          <div className="row">
                            <div className="col-md-12 mt-3">
                              <h6>ChooseTemplate</h6>
                            </div>

                            {resultantCarePlan?.template.map((template) => {
                              // console.log(template, resultantCarePlan, "resultantCarePlan")
                              const updateddate = new Date(
                                template?.last_update_date
                              ).toDateString();
                              return (
                                <div
                                  className="col-md-6"
                                  onClick={() => {
                                    selectSpecificClientTemplate();
                                    setSpecificTemplateDataCategory({
                                      templatedata: template,
                                      UniversalTempObjectId:
                                        resultantCarePlan._id,
                                      carehomeId,
                                      clientId: param.id,
                                      categoryType:
                                        resultantCarePlan.categoryType,
                                      riskProfileCategory:
                                        resultantCarePlan.riskProfileCategory,
                                    });
                                  }}
                                >
                                  {/* <div className={`living_box ${activeclassOnClick ? 'active' : ''}`}> */}
                                  <div
                                    className={`living_box ${
                                      activeclassOnClick ? "active" : ""
                                    }`}
                                  >
                                    <h5>{template.TemplateName}</h5>
                                    <p>{updateddate}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Modal
        className="viewModal"
        show={carePlantemplete}
        size="xl"
        onHide={closecreateCareplanTemplate}
      >
        {whentoshowwhatincareplanModal === "newTemplate" && (
          <Modal.Header closeButton>
            <Modal.Title>
              <span>{templateName}</span>
              <div className="d-flex">
                {savebuttonstatus === "add" && (
                  <button
                    className="btn"
                    onClick={() => {
                      createCarePlanTemplate();
                    }}
                  >
                    Save
                  </button>
                )}
                {savebuttonstatus === "edit" && (
                  <button
                    className="btn"
                    onClick={() => {
                      addCarePlanTemplateToClientSpecificCategory("edit");
                    }}
                  >
                    Save
                  </button>
                )}

                <button className="btn" onClick={closecreateCareplanTemplate}>
                  Close
                </button>
              </div>
            </Modal.Title>
          </Modal.Header>
        )}

        {whentoshowwhatincareplanModal === "viewTemplate" && (
          <Modal.Header closeButton>
            <Modal.Title>
              <span>
                {specificTemplateDataCategory.templatedata?.TemplateName}
              </span>
              <div className="d-flex">
                <button
                  className="btn"
                  onClick={() => {
                    DeleteFromClientSpecificTemplate(
                      specificTemplateDataCategory.templatedata._id,
                      specificTemplateDataCategory.id
                    );
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn"
                  onClick={() => {
                    showcreateCarePlanTemplate("newTemplate");
                    const updateddate = new Date(
                      specificTemplateDataCategory.templatedata.last_update_date
                    ).toDateString();
                    setSaveButtonStatus("edit");
                    setTemplateName(
                      specificTemplateDataCategory.templatedata.TemplateName
                    );
                    setUpdatedBy(
                      specificTemplateDataCategory.templatedata.updated_by
                    );
                    setLastUpdated(updateddate);
                    setQuesAnsFields(
                      specificTemplateDataCategory.templatedata.questions
                    );
                    setOberservationsfields(
                      specificTemplateDataCategory.templatedata
                        .obeservation_needs_comments
                    );
                    setOutcomesfields(
                      specificTemplateDataCategory.templatedata.outcomes
                    );
                    setRisksInterventionsfields(
                      specificTemplateDataCategory.templatedata
                        .risk_interventions
                    );
                    setRisksfields(
                      specificTemplateDataCategory.templatedata.risk_interventions.map(
                        (item) => item.risk
                      )
                    );
                    setInterventionsfields(
                      specificTemplateDataCategory.templatedata.risk_interventions.map(
                        (item) => item.interventions
                      )
                    );
                  }}
                >
                  Edit
                </button>
                <button className="btn" onClick={closecreateCareplanTemplate}>
                  Close
                </button>
              </div>
            </Modal.Title>
          </Modal.Header>
        )}

        <Modal.Body>
          <div className="row">
            <div className="col-md-12 left">
              <ul className="catList">
                <h6 className="mb-0">Select Risk Profile: </h6>
                <li
                  className={activetemplateriskClass === "high" ? "high" : ""}
                  style={{ backgroundColor: "#BE0C0C" }}
                  onClick={(e) =>
                    selectemplateriskCategory({ risktype: "high" })
                  }
                >
                  High <br /> Risk
                </li>
                <li
                  className={
                    activetemplateriskClass === "medium" ? "medium" : ""
                  }
                  style={{ backgroundColor: "#D96A07" }}
                  onClick={(e) =>
                    selectemplateriskCategory({ risktype: "medium" })
                  }
                >
                  Medium <br /> Risk
                </li>
                <li
                  className={activetemplateriskClass === "low" ? "low" : ""}
                  style={{ backgroundColor: "#7D7D7D" }}
                  onClick={(e) =>
                    selectemplateriskCategory({ risktype: "low" })
                  }
                >
                  Low <br /> Risk
                </li>
              </ul>
              <h6>Last Update Date: {lastupdate}</h6>
              <h6>Updated By: {updatedBy}</h6>
            </div>

            {/* Questions and Answers Dynamic Form  */}
            {whentoshowwhatincareplanModal === "viewTemplate" && (
              <>
                {" "}
                <div className="col-md-4 left">
                  <h5>Questions</h5>
                  {specificTemplateDataCategory.templatedata.questions.map(
                    (viewQues) => {
                      return (
                        <div className="qty_box">
                          <label>
                            {viewQues.que}
                            {!viewQues.que.includes("?") && "?"}{" "}
                          </label>
                          <ul>
                            {viewQues.ans.map((answer) => {
                              return (
                                <li>
                                  <label className="checkbox">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    {answer}
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    }
                  )}
                </div>
                <div className="col-md-8 right">
                  <div className="row">
                    <div className="col-md-12">
                      <h5>Oberservations, Needs and Comments</h5>
                      {specificTemplateDataCategory.templatedata.obeservation_needs_comments.map(
                        (observation) => {
                          return <p>{observation}</p>;
                        }
                      )}

                      <h5>Outcomes</h5>
                      {specificTemplateDataCategory.templatedata.outcomes.map(
                        (outcome) => {
                          return <p>{outcome}</p>;
                        }
                      )}
                    </div>

                    <div className="col-md-6">
                      <h5>Risks</h5>
                      {specificTemplateDataCategory.templatedata.risk_interventions.map(
                        (risk) => {
                          return <p>{risk.risk}</p>;
                        }
                      )}
                    </div>

                    <div className="col-md-6">
                      <h5>Interventions</h5>
                      {specificTemplateDataCategory.templatedata.risk_interventions.map(
                        (interventions) => {
                          return <p>{interventions.interventions}</p>;
                        }
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {whentoshowwhatincareplanModal === "newTemplate" && (
              <>
                <div className="col-md-4 left">
                  <h5>Questions</h5>
                  <div>
                    <div className="d-flex">
                      <textarea
                        className="form-control"
                        onChange={(e) => setquesfiled(e.target.value)}
                      ></textarea>
                      <button
                        className="btn theme_btn"
                        onClick={() => {
                          handleQuesAnsFormChange(quesfield, ansFields);
                        }}
                      >
                        Add
                      </button>
                    </div>
                    <div className="pe-5 mt-2 position-relative">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Option"
                        value={ansfield}
                        onChange={(e) => setansfiled(e.target.value)}
                      />
                      <button
                        className="removeBtn"
                        style={{ top: "3px" }}
                        onClick={() => {
                          handleAnsChange(ansfield);
                        }}
                      >
                        +
                      </button>
                    </div>
                    {ansFields?.map((ans, index) => {
                      return (
                        <div
                          className="pe-5 mt-2 position-relative"
                          key={index}
                        >
                          <span className="form-control">{ans}</span>
                          <button
                            className="removeBtn"
                            style={{ top: "3px" }}
                            onClick={() => {
                              ansRemoveChangeHandler(index);
                            }}
                          >
                            -
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {quesansFields.length > 0 &&
                    quesansFields.map((queAns, index) => {
                      return (
                        <div className="qty_box mt-3">
                          <label className="pe-5 position-relative">
                            {queAns.que}?{" "}
                            <button
                              className="removeBtn"
                              onClick={() => {
                                quesAnsRemoveChangeHandler(index);
                              }}
                            >
                              -
                            </button>
                          </label>
                          <ul>
                            {queAns.ans.map((ansOption, index) => {
                              return (
                                <li key={index}>
                                  <label className="checkbox">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    {ansOption}
                                  </label>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                </div>

                <div className="col-md-8 right">
                  <div className="row">
                    <div className="col-md-12">
                      <h5>Oberservations, Needs and Comments</h5>

                      <div className="d-flex mb-3">
                        <textarea
                          className="form-control"
                          placeholder=""
                          value={oberservationsfield}
                          onChange={(e) =>
                            setOberservationsfiled(e.target.value)
                          }
                        ></textarea>
                        <button
                          className="btn theme_btn"
                          onClick={() => {
                            handleOberservationsChange(oberservationsfield);
                          }}
                        >
                          Add
                        </button>
                      </div>

                      {oberservationsFields?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="pe-5 mb-3 position-relative"
                          >
                            <span className="form-control">{item}</span>
                            <button
                              className="removeBtn"
                              style={{ top: "3px" }}
                              onClick={() => {
                                oberservationsRemoveChangeHandler(index);
                              }}
                            >
                              -
                            </button>
                          </div>
                        );
                      })}

                      <h5>Outcomes</h5>

                      <div className="d-flex mb-3">
                        <textarea
                          className="form-control"
                          placeholder=""
                          value={outcomesfield}
                          onChange={(e) => setOutcomesfiled(e.target.value)}
                        ></textarea>
                        <button
                          className="btn theme_btn"
                          onClick={() => {
                            handleOutcomesChange(outcomesfield);
                          }}
                        >
                          Add
                        </button>
                      </div>
                      {outcomesFields?.map((item, index) => {
                        return (
                          <div className="pe-5 mb-3 position-relative">
                            <span className="form-control">{item}</span>
                            <button
                              className="removeBtn"
                              style={{ top: "3px" }}
                              onClick={() => {
                                outcomesRemoveChangeHandler(index);
                              }}
                            >
                              -
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <div className="col-md-6">
                      <h5>Risks</h5>
                      <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Add Risk"
                        value={risksfield}
                        onChange={(e) => setRisksfiled(e.target.value)}
                      />
                      {risksFields?.map((item, index) => {
                        return (
                          <span
                            key={index}
                            className="form-control"
                            placeholder=""
                          >
                            {item}
                          </span>
                        );
                      })}
                    </div>

                    <div className="col-md-6">
                      <h5>Interventions</h5>
                      <div className="position-relative pe-5">
                        <input
                          type="text"
                          className="form-control mb-3"
                          placeholder=""
                          value={interventionsfield}
                          onChange={(e) =>
                            setInterventionsfiled(e.target.value)
                          }
                        />
                        <button
                          className="removeBtn"
                          style={{ top: "3px" }}
                          onClick={() => {
                            handleRisksInterventionsChange(
                              risksfield,
                              interventionsfield
                            );
                          }}
                        >
                          +
                        </button>
                      </div>
                      {interventionsFields?.map((item, index) => {
                        return (
                          <div className="position-relative pe-5">
                            <span className="form-control">{item}</span>
                            <button
                              className="removeBtn"
                              style={{ top: "3px" }}
                              onClick={() => {
                                risksinterventionsRemoveChangeHandler(index);
                              }}
                            >
                              -
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>

      <Modal className="viewModal" show={show4} size="xl" onHide={handleClose4}>
        <Modal.Header closeButton4>
          <Modal.Title>
            <span></span>
            <div className="d-flex">
              <button
                className="btn"
                onClick={() => {
                  if (saveToDownloadsButtonStatus === "toDownload") {
                    downloadFileDocument();
                  }
                  if (saveToDownloadsButtonStatus === "toSave") {
                    saveToDownloads();
                  }
                }}
              >
                {saveToDownloadsButtonStatus === "toDownload" && "Download"}
                {saveToDownloadsButtonStatus === "toSave" && "Save To Docs"}
              </button>
              <button className="btn" onClick={handleClose4}>
                Close
              </button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DownloadCarePlan />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ClientCarePlans;
