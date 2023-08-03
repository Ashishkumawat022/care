import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MapboxAutocomplete from "react-mapbox-autocomplete";

import axios from "axios";

const EditClients = (props) => {
  const [editClientProfileData, setEditClientProfileData] = useState([]);
  const [changeBtn, setchangeBtn] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [contractStartdate, setContractStartdate] = useState("");
  const [DOB, setDOB] = useState("");
  const [location, setlocation] = useState("");
  const [editlocation, seteditlocation] = useState("");
  const [advanceDirective, setAdvanceDirective] = useState("");
  const [profession, setProfession] = useState("");
  const [marital_Status, setMaritalStatus] = useState("");
  const [religion, setReligion] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [language, setLanguages] = useState("");
  const [height, setHeight] = useState("");
  const [eye_Color, setEyeColor] = useState("");
  const [hair_Color, setHairColor] = useState("");
  const [distinguishing_Mark, setDistinguishingMark] = useState("");
  const [brief, setBrief] = useState("");
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
  let _suggestionSelect = function (result, lat, lng, text) {
    // console.log(result, lat, lng, text)
    setlat(lat);
    setlong(lng);
    seteditlocation(result);
  };

  function editClient() {
    var data = JSON.stringify({
      first_Name: firstName,
      last_Name: lastName,
      contractStartdate: contractStartdate,
      location: editlocation,
      DOB: DOB,
      advance_Directive: advanceDirective,
      profession: profession,
      marital_Status: marital_Status,
      religion: religion,
      citizenship: citizenship,
      language: language,
      height: height,
      eye_Color: eye_Color,
      hair_Color: hair_Color,
      distinguishing_Mark: distinguishing_Mark,
      brief: brief,
      lattitude: lat,
      longitude: long,
    });
    // console.log(data);
    // console.log(params.id)
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/edit_client/${params.id}`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getClientbyId();
        // console.log(JSON.stringify(response));
        // console.log(JSON.stringify(response.data));
        // window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function medicdocEvent(docsData) {
    // console.log("=====", docsData)
    setnewMedicData(docsData);
    setmedic_id(docsData._id);
    setEditMedicName(docsData.name);
    setEditMedicType(docsData.type);
    setEditstart_Date(docsData.start_Date);
  }

  const [newMedicData, setnewMedicData] = useState([]);
  const [editMedicName, setEditMedicName] = useState("");
  const [medic_id, setmedic_id] = useState("");
  const [editstart_Date, setEditstart_Date] = useState("");
  const [editMedicType, setEditMedicType] = useState("");
  function editmediCondition() {
    var data = JSON.stringify({
      medic_id: medic_id,
      name: editMedicName,
      type: editMedicType,
      start_Date: editstart_Date,
    });
    // console.log(data)

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/editmediCondition/${params.id}`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response));
        // console.log(JSON.stringify(response.data));
        getClientbyId();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // getting Medical Condition Data
  const [getMediCond, setGetMedicond] = useState([]);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  function mediCondition() {
    var data = JSON.stringify({
      name: name,
      type: type,
      start_Date: startDate,
    });
    // console.log(data);
    // console.log(params.id)
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/mediCondition/${params.id}`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response));
        // console.log(JSON.stringify(response.data));
        getClientbyId();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getClientbyId();
  }, []);

  let params = useParams();
  // console.log(params);

  const getClientbyId = () => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/clientbyId?clientId=${
        params.id
      }&careHomeId=${localStorage.getItem("carehomeId")}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let ClientData = res.data.clientData;
        // Displaying Api Data
        setEditClientProfileData(ClientData);
        setGetMedicond(ClientData?.medical_Conditions);
        // Displaying Single Client data
        setFirstName(ClientData?.first_Name);
        setlastName(ClientData?.last_Name);
        setContractStartdate(ClientData?.contractStartdate);
        setDOB(ClientData?.DOB);
        setlocation(ClientData?.location);
        setAdvanceDirective(ClientData?.advance_Directive);
        setProfession(ClientData?.profession);
        setMaritalStatus(ClientData?.marital_Status);
        setReligion(ClientData?.religion);
        setCitizenship(ClientData?.citizenship);
        setLanguages(ClientData?.language);
        setHeight(ClientData?.height);
        setEyeColor(ClientData?.eye_Color);
        setHairColor(ClientData?.hair_Color);
        setDistinguishingMark(ClientData?.distinguishing_Mark);
        setBrief(ClientData?.brief);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  function toggle() {
    setchangeBtn((wasOpened) => !wasOpened);
  }
  return (
    <>
      <div className="row">
        <div className="col-md-6 pe-3">
          <div className="card_inbox">
            <div className="view_details">
              <div className="float-end btns_head mb-3">
                {changeBtn ? (
                  <button
                    className="btn btn-theme btn-sm"
                    type="button"
                    onClick={toggle}
                    disabled={props.Profileaccess}
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    className="btn btn-theme btn-sm"
                    type="button"
                    onClick={() => {
                      toggle();
                      editClient();
                    }}
                  >
                    Save
                  </button>
                )}
              </div>
              <table className="table table-striped table_half">
                <tbody>
                  <tr>
                    <td>First Name</td>
                    {changeBtn ? (
                      <td>{editClientProfileData?.first_Name}</td>
                    ) : (
                      <td>
                        <input
                          type="text"
                          defaultValue={editClientProfileData?.first_Name}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="form-control form-control-sm"
                        />
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    {changeBtn ? (
                      <td>{editClientProfileData?.last_Name}</td>
                    ) : (
                      <td>
                        <input
                          type="text"
                          defaultValue={editClientProfileData?.last_Name}
                          onChange={(e) => setlastName(e.target.value)}
                          className="form-control form-control-sm"
                        />
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Contract Start Date</td>
                    {changeBtn ? (
                      <td>{editClientProfileData?.contractStartdate}</td>
                    ) : (
                      <td>
                        <input
                          type="date"
                          defaultValue={
                            editClientProfileData?.contractStartdate
                          }
                          onChange={(e) => setContractStartdate(e.target.value)}
                          className="form-control form-control-sm"
                        />
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Location</td>
                    {changeBtn ? (
                      <td>{editClientProfileData?.location}</td>
                    ) : (
                      <td>
                        <MapboxAutocomplete
                          publicKey="pk.eyJ1IjoiY2hhaXRhbnlhYXBwaWMxMjMiLCJhIjoiY2wwNmZ5M2tjMTU4ajNqcDM4dm5ka2FrbiJ9.JD36e92UBwLpFz163HJdEg"
                          inputClass="form-control"
                          onSuggestionSelect={_suggestionSelect}
                          // onChange={(e) => { console.log(e, "MapboxAutocomplete") }}
                          resetSearch={false}
                        />
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Date of Birth</td>
                    {changeBtn ? (
                      <td>{editClientProfileData?.DOB}</td>
                    ) : (
                      <td>
                        <input
                          type="date"
                          defaultValue={editClientProfileData?.DOB}
                          onChange={(e) => setDOB(e.target.value)}
                          className="form-control form-control-sm"
                        />
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Advance Directive</td>
                    {changeBtn ? (
                      <td>{editClientProfileData?.advance_Directive}</td>
                    ) : (
                      <td>
                        <input
                          type="text"
                          defaultValue={
                            editClientProfileData?.advance_Directive
                          }
                          onChange={(e) => setAdvanceDirective(e.target.value)}
                          className="form-control form-control-sm"
                        />
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Profession</td>
                    {changeBtn ? (
                      <td>{editClientProfileData?.profession}</td>
                    ) : (
                      <td>
                        <input
                          type="text"
                          defaultValue={editClientProfileData?.profession}
                          onChange={(e) => setProfession(e.target.value)}
                          className="form-control form-control-sm"
                        />
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Marital Status</td>
                    {changeBtn ? (
                      <td>{editClientProfileData?.marital_Status}</td>
                    ) : (
                      <td>
                        <input
                          type="text"
                          defaultValue={editClientProfileData?.marital_Status}
                          onChange={(e) => setMaritalStatus(e.target.value)}
                          className="form-control form-control-sm"
                        />
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Religion</td>
                    {changeBtn ? (
                      <td>{editClientProfileData?.religion}</td>
                    ) : (
                      <td>
                        <input
                          type="text"
                          defaultValue={editClientProfileData?.religion}
                          onChange={(e) => setReligion(e.target.value)}
                          className="form-control form-control-sm"
                        />
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Citizenship</td>
                    {changeBtn ? (
                      <td>{editClientProfileData?.citizenship}</td>
                    ) : (
                      <td>
                        <input
                          type="text"
                          defaultValue={editClientProfileData?.citizenship}
                          onChange={(e) => setCitizenship(e.target.value)}
                          className="form-control form-control-sm"
                        />
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Language</td>
                    {changeBtn ? (
                      <td>{editClientProfileData?.language}</td>
                    ) : (
                      <td>
                        <input
                          type="text"
                          defaultValue={editClientProfileData?.language}
                          onChange={(e) => setLanguages(e.target.value)}
                          className="form-control form-control-sm"
                        />
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>

              <h5 className="tb_title">Phisical Appearance</h5>
              <table className="table table-striped table_half">
                <tbody>
                  <tr>
                    <td>Height </td>
                    {changeBtn ? (
                      <td>{editClientProfileData?.height}</td>
                    ) : (
                      <td>
                        <input
                          type="number"
                          defaultValue={editClientProfileData?.height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="form-control form-control-sm"
                        />
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Eye Color</td>
                    {changeBtn ? (
                      <td>{editClientProfileData?.eye_Color}</td>
                    ) : (
                      <td>
                        <input
                          type="text"
                          defaultValue={editClientProfileData?.eye_Color}
                          onChange={(e) => setEyeColor(e.target.value)}
                          className="form-control form-control-sm"
                        />
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Hair Color</td>
                    {changeBtn ? (
                      <td>{editClientProfileData?.hair_Color}</td>
                    ) : (
                      <td>
                        <input
                          type="text"
                          defaultValue={editClientProfileData?.hair_Color}
                          onChange={(e) => setHairColor(e.target.value)}
                          className="form-control form-control-sm"
                        />
                      </td>
                    )}
                  </tr>
                  <tr>
                    <td>Distinguishing Mark</td>
                    {changeBtn ? (
                      <td>{editClientProfileData?.distinguishing_Mark}</td>
                    ) : (
                      <td>
                        <input
                          type="text"
                          defaultValue={
                            editClientProfileData?.distinguishing_Mark
                          }
                          onChange={(e) =>
                            setDistinguishingMark(e.target.value)
                          }
                          className="form-control form-control-sm"
                        />
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>

              <h5 className="tb_title">Brief Background</h5>
              <table className="table table-striped">
                <tbody>
                  <tr>
                    {changeBtn ? (
                      <td>{editClientProfileData?.brief}</td>
                    ) : (
                      <td>
                        <input
                          type="text"
                          defaultValue={editClientProfileData?.brief}
                          onChange={(e) => setBrief(e.target.value)}
                          className="form-control form-control-sm"
                        />
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-6 ps-3">
          {/* changes by jitender "card_inbox" this class and div new added - 12/1/2022 */}
          <div className="card_inbox">
            <div className="mb-4 btns_head">
              <h5 className="tb_title mt-0">
                Medical Conditions{" "}
                <button
                  className="btn btn-theme btn-sm float-end"
                  data-bs-toggle="modal"
                  data-bs-target="#add_medicondition"
                >
                  Add
                </button>
              </h5>
            </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Start Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {getMediCond?.map(function (items, index) {
                  return (
                    <tr key={index}>
                      <td>{items.name}</td>
                      <td>{items.type}</td>
                      <td>{items.start_Date}</td>
                      <td>
                        {/* changes by jitender "action_table_btn" this class new added - 12/1/2022 */}
                        <button
                          className="action_table_btn"
                          data-bs-toggle="modal"
                          data-bs-target="#edit_medi_cond"
                          onClick={() => medicdocEvent(items)}
                        >
                          <img
                            alt=""
                            src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com//images/edit.svg`}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div
              className="modal fade"
              id="add_medicondition"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Add Medical Condition
                    </h5>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Type</label>
                        <input
                          type="text"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Start Date</label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                      onClick={mediCondition}
                    >
                      Add Docs
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal fade"
              id="edit_medi_cond"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Edit Medical Conditions
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <input
                          type="hidden"
                          defaultValue={newMedicData.medic_id}
                          onChange={(e) => setmedic_id(e.target.value)}
                          className="form-control"
                        />
                        <label className="form-label">Name</label>
                        <input
                          type="text"
                          defaultValue={newMedicData.name}
                          onChange={(e) => setEditMedicName(e.target.value)}
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Type</label>
                        <input
                          type="text"
                          defaultValue={newMedicData.type}
                          onChange={(e) => setEditMedicType(e.target.value)}
                          className="form-control"
                        />
                      </div>
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Start Date</label>
                        <input
                          type="date"
                          defaultValue={newMedicData.start_Date}
                          onChange={(e) => setEditstart_Date(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                      onClick={editmediCondition}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditClients;
