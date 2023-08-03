import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Fragment } from "react";
import datechangeHandler from "../../utils/datechangehandler";

const TypesData = [
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

function DownloadCarePlan() {
  const param = useParams();

  // ------------------ Download Care Plan Details of specific Client -------------- //

  const [editClientProfileData, setEditClientProfileData] = useState([]);
  const [downlaodCarePlan, setDownlaodCarePlan] = useState([]);

  useEffect(() => {
    getClientbyId();
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
        let ClientData = res.data.clientData;
        console.log("============>>", ClientData);
        let displayAllCarePlans = [];
        ClientData?.carePlan?.forEach((element) => {
          element?.template.forEach((template) => {
            displayAllCarePlans.push({
              categoryType: element?.categoryType,
              riskProfileCategory: element?.riskProfileCategory,
              ...template,
              categoryId: element?._id,
            });
          });
        });
        setDownlaodCarePlan(displayAllCarePlans);

        // Displaying Api Data
        setEditClientProfileData(ClientData);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  return (
    <div id="pagetoDownload">
      <div className="row align-items-center mb-4">
        <div className="col-md-6">
          <img
            alt=""
            src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s3.svg`}
            style={{ height: "40px" }}
          />
        </div>
        <div className="col-md-6 text-end">
          <p>
            Care Plan <br />
            {localStorage?.getItem("carehomeName")}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 profile_img">
          <img src="http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg" />
        </div>
        <div className="col-md-12 mb-2">
          <h5>Client Details</h5>
        </div>
        <div className="col-md-6">
          <ul className="details_list">
            <li>
              <strong>First Name</strong>
              <span>{editClientProfileData?.first_Name?.trim()}</span>
            </li>
            <li>
              <strong>Last Name</strong>
              <span>{editClientProfileData?.last_Name?.trim()}</span>
            </li>
            <li>
              <strong>Contract Start Date</strong>
              <span>{editClientProfileData?.contractStartdate}</span>
            </li>
            <li>
              <strong>Location</strong>
              <span>{editClientProfileData?.location}</span>
            </li>
            <li>
              <strong>Date of Birth</strong>
              <span>{editClientProfileData?.DOB}</span>
            </li>
            <li>
              <strong>Profession</strong>
              <span>{editClientProfileData?.profession}</span>
            </li>
            <li>
              <strong>Marital Status</strong>
              <span>{editClientProfileData?.marital_Status}</span>
            </li>
            <li>
              <strong>Citizenship</strong>
              <span>{editClientProfileData?.citizenship}</span>
            </li>
          </ul>
        </div>
        <div className="col-md-6">
          <ul className="details_list">
            <li>
              <strong>Religion</strong>
              <span>{editClientProfileData?.religion}</span>
            </li>
            <li>
              <strong>Ethnicity</strong>
              <span>White</span>
            </li>
            <li>
              <strong>Languages</strong>
              <span>{editClientProfileData?.language}</span>
            </li>
            <li>
              <strong>Height</strong>
              <span>{editClientProfileData?.height}</span>
            </li>
            <li>
              <strong>Eye Color</strong>
              <span>{editClientProfileData?.eye_Color}</span>
            </li>
            <li>
              <strong>Hair Color</strong>
              <span>{editClientProfileData?.hair_Color}</span>
            </li>
            <li>
              <strong>Distinguishing Mark</strong>
              <span>{editClientProfileData?.distinguishing_Mark}</span>
            </li>
            <li>
              <strong>Blood Type</strong>
              <span>A+</span>
            </li>
          </ul>
        </div>

        <div className="col-md-12 mb-2 mt-4">
          <h5>Consent</h5>
        </div>
        <div className="col-md-6">
          <ul className="details_list">
            <li>
              <strong>Mental Capacity to Consent</strong>
              <span>No</span>
            </li>
            <li>
              <strong>Last Name</strong>
              <span>{editClientProfileData?.last_Name?.trim()}</span>
            </li>
            <li>
              <strong>Contract Start Date</strong>
              <span>{editClientProfileData?.contractStartdate}</span>
            </li>
            <li>
              <strong>Location</strong>
              <span>Room1, Floor 3</span>
            </li>
            <li>
              <strong>Date of Birth</strong>
              <span>{editClientProfileData?.DOB}</span>
            </li>
            <li>
              <strong>Profession</strong>
              <span>{editClientProfileData?.profession}</span>
            </li>
            <li>
              <strong>Marital Status</strong>
              <span>{editClientProfileData?.marital_Status}</span>
            </li>
            <li>
              <strong>Citizenship</strong>
              <span>{editClientProfileData?.citizenship}</span>
            </li>
          </ul>
        </div>

        {editClientProfileData?.keycontact?.length > 0 && (
          <Fragment>
            <div className="col-md-12 mb-2 mt-4">
              <h5>Key Contacts </h5>
            </div>
            <div className="col-md-12">
              <table className="popupTbleList table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Relation</th>
                    <th>Address</th>
                    <th>Tel</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {editClientProfileData?.keycontact?.map((contacts) => {
                    return (
                      <tr key={contacts?._id}>
                        <td>{contacts?.name}</td>
                        <td>{contacts?.relation}</td>
                        <td>{contacts?.address}</td>
                        <td>{contacts?.phone}</td>
                        <td>{contacts?.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Fragment>
        )}

        {editClientProfileData?.medical_Conditions?.length > 0 && (
          <Fragment>
            <div className="col-md-12 mb-2 mt-4">
              <h5>Medical Condition & Allergies</h5>
            </div>
            <div className="col-md-12">
              <table className="popupTbleList table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Start Date</th>
                    <th>Diagoned by</th>
                  </tr>
                </thead>
                <tbody>
                  {editClientProfileData?.medical_Conditions?.map(
                    (condition) => {
                      return (
                        <tr key={condition?._id}>
                          <td>{condition?.name}</td>
                          <td>{condition?.type}</td>
                          <td>{condition?.start_Date}</td>
                          <td>{condition?.phone}</td>
                          <td>{condition?.email}</td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          </Fragment>
        )}

        {editClientProfileData?.medication?.length > 0 && (
          <Fragment>
            <div className="col-md-12 mb-2 mt-4">
              <h5>Medicines</h5>
            </div>
            <div className="col-md-12">
              <table className="popupTbleList table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Start Date</th>
                    <th>Diagoned by</th>
                  </tr>
                </thead>
                <tbody>
                  {editClientProfileData?.medication?.map((medic) => {
                    return (
                      <tr key={medic?._id}>
                        <td>{medic?.name}</td>
                        <td>{medic?.type}</td>
                        <td>{medic?.start_Date}</td>
                        <td>{medic?.phone}</td>
                        <td>{medic?.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Fragment>
        )}
        <div className="col-md-12 mb-2 mt-4">
          <h5>Brief Background</h5>
        </div>
        <div className="col-md-12">
          <div className="row cont_list">
            <div className="col">
              <strong>{editClientProfileData?.brief}</strong>
            </div>
          </div>
        </div>
      </div>
      {downlaodCarePlan?.map((cplan) => {
        console.log(cplan, "care plan for specific client");
        let imageCategoryProfile = TypesData?.find(
          (item) => item.Ctg === cplan?.categoryType
        )?.image;
        return (
          <Fragment>
            <hr className="mt-5 mb-5" />
            <div className="row">
              <div className="col-md-12 mb-3">
                <h5 className="text-dark">
                  <img className="me-2" alt="" src={imageCategoryProfile} />
                  {cplan?.categoryType}
                  {cplan?.TemplateName}
                </h5>
              </div>
              <div className="col-md-12 left">
                <ul className="catList mb-3 justify-content-end">
                  <h6 className="mb-0">Category Risk Profile: </h6>
                  <li style={{ backgroundColor: "#BE0C0C" }}>
                    High <br /> Risk
                  </li>
                </ul>
                <h5> {cplan?.TemplateName}</h5>
                <p>Updated: {datechangeHandler(cplan?.last_update_date)}</p>
                <ul className="catList mb-3">
                  <h6 className="mb-0">Risk Profile: </h6>
                  <li style={{ backgroundColor: "#BE0C0C" }}>
                    {cplan?.risk_profile} <br /> Risk
                  </li>
                </ul>
              </div>

              <div className="col-md-4 left">
                <h5>Questions</h5>
                {cplan?.questions.map((quesAns) => {
                  return (
                    <div className="qty_box" key={quesAns?._id}>
                      <label>{quesAns?.que}</label>
                      <ul>
                        {quesAns?.ans.map((allAnswers, index) => {
                          return (
                            <li key={index}>
                              <label
                                className={`checkbox ${
                                  quesAns?.correctAnswer == index
                                    ? "active"
                                    : ""
                                }`}
                              >
                                <input type="checkbox" />
                                <span className="checkmark"></span>
                                {allAnswers}
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
                    {cplan?.obeservation_needs_comments?.map((comment) => {
                      return <p>{comment}</p>;
                    })}

                    <h5>Outcomes</h5>
                    {cplan?.outcomes?.map((outcome) => {
                      return <p>{outcome}</p>;
                    })}
                  </div>

                  <div className="col-md-6">
                    <h5>Risks</h5>
                    {cplan?.risk_interventions?.map((risks, index) => {
                      return <p key={index}>{risks.risk} </p>;
                    })}
                  </div>

                  <div className="col-md-6">
                    <h5>Interventions</h5>
                    {cplan?.risk_interventions?.map((interventions, index) => {
                      return <p key={index}>{interventions.interventions} </p>;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

export default DownloadCarePlan;
