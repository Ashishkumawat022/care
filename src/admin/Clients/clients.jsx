import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "../Clients/clients.css";
// import {BsFilterSquare} from "react-icons/bs";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Select from "react-select";
import MapboxAutocomplete from "react-mapbox-autocomplete";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useEffect } from "react";
import ClientNewTable, { ClientOldTable } from "./ClientNewTable";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";

function Clients() {
  const {
    register,
    handleSubmit,
    unregister,
    reset,
    formState: { errors },
  } = useForm();

  let history = useHistory();
  let [plantype, setplantype] = useState("");
  setTimeout(() => {
    setplantype(JSON.parse(localStorage.getItem("userData")).SubscriptionPlan);
  }, 800);

  const [rowData, setRowData] = useState([]);
  const [options, setoptions] = useState([]);

  const [location, setlocation] = useState("");
  const [lat, setlat] = useState("");
  const [locErrorMsg, setlocErrorMsg] = useState(true);
  const [long, setlong] = useState("");

  let _suggestionSelect = function (result, lat, lng, text) {
    setlat(lat);
    setlong(lng);
    setlocation(result);
    setlocErrorMsg(false);
  };

  const resetForm = () => {
    setlocation("");
    setlocErrorMsg(false);
    setlat("");
    setlong("");
    setIsOpen(false);
  };

  function add_new_resident({
    lastName,
    firstName,
    ContractStartDate,
    DOB,
    uploadFile,
  }) {
    setIsOpen(false);

    let data = new FormData();
    data.append("last_Name", lastName);
    data.append("first_Name", firstName);
    data.append("location", location);
    data.append("contractStartdate", ContractStartDate);
    data.append("careHomeId", localStorage.getItem("carehomeId"));
    data.append("DOB", DOB);
    data.append("image", uploadFile[0]);
    data.append("lattitude", lat);
    data.append("longitude", long);
    let config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/create_client`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        resetForm();
        // getClientRowData();
        history.push(`/admin/clientsdetails/${response?.data?.data?._id}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getClientRowData();
  }, []);

  const getClientRowData = () => {
    let urlID = JSON.parse(localStorage.getItem("userData"));
    axios({
      url: `${
        process.env.REACT_APP_BASEURL
      }/getClient?careHomeId=${localStorage.getItem("carehomeId")}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let ClientData = res.data.clientListing;

        let arr = [];
        let clientListingData = [];
        ClientData.forEach((element, index) => {
          clientListingData.push({
            _id: element?._id,
            id: `${index + 1}.`,
            advance_Directive: element?.advance_Directive,
            brief: element?.brief,
            careHomeId: element?.careHomeId,
            citizenship: element?.citizenship,
            status: element?.clientStatus,
            contractStartdate: element?.contractStartdate,
            first_Name: element?.first_Name,
            image: element?.image,
            last_Name: element?.last_Name,
            location: element?.location,
            brief: element?.brief,
            hrs_of_service: element?.hrs_of_service
              ? element?.hrs_of_service
              : "",
            overdueTasks: element?.overdueTasks ? element?.overdueTasks : "",
            toDos: element?.toDos ? element?.toDos : "",
          });
          arr.push({ value: element._id, label: element.first_Name });
        });
        setRowData(clientListingData);
        setoptions(arr);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
  const [selectedname, setselectedname] = useState([]);
  const [selectedId, setselectedId] = useState({});
  const [groupName, setgroupName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    selectedname.push(e);
    let lastElement = selectedname[selectedname.length - 1];
    setselectedId(lastElement);
  };

  const createclientGroup = () => {
    let clientId = [];
    let clientName = [];

    selectedId.forEach((items, index) => {
      clientId.push(items.value);
      clientName.push(items.label);
    });
    let data = JSON.stringify({
      groupName: groupName,
      Name: clientName,
      careHomeId: localStorage.getItem("carehomeId"),
      clientId: clientId,
    });

    let config = {
      method: "post",
      url: "http://3.91.203.43:8700/admin/createGroupclient",
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let user = JSON.parse(localStorage.getItem("userData"));
  return (
    <>
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          {user.role.map((roletype, index) => {
            const creategroups = roletype.Modules[1].children[1];
            const createClient = roletype.Modules[1].children[0];
            return (
              <div className="card" key={index}>
                <div className="card-body">
                  <h4 className="card-title">
                    Clients
                    <div className="float-end btns_head">
                      <button
                        className="btn btn-theme btn-sm"
                        data-bs-toggle="modal"
                        data-bs-target="#createGroup"
                        disabled={
                          creategroups.access != "full" ||
                          user.ownerId?.SubscriptionPlan === "baseplan" ||
                          user?.SubscriptionPlan === "baseplan"
                            ? true
                            : false
                        }
                      >
                        Create Groups
                      </button>
                      <button
                        className="btn btn-theme btn-sm"
                        disabled={createClient.access != "full" ? true : false}
                        onClick={() => {
                          setIsOpen(true);
                        }}
                      >
                        Add New Resident
                      </button>
                    </div>
                  </h4>
                  <div>
                    <div
                      className="modal fade"
                      id="createGroup"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                              Create Group
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div
                            className="modal-body"
                            style={{ minHeight: "470px" }}
                          >
                            <div className="row">
                              <div className="col-md-12 mb-3">
                                <label className="form-label">Group Name</label>
                                <input
                                  type="text"
                                  value={groupName}
                                  onChange={(e) => setgroupName(e.target.value)}
                                  className="form-control"
                                />
                              </div>
                              <div className="col-md-12 mb-3">
                                <label className="form-label">
                                  Member Name
                                </label>
                                <ul className="selected_items">
                                  {/* {selectedname.map((item,index)=>{
                                                       return (<>
													   <li>{`${item}`}<span onClick={console.log(index)} className="close_icon">✖</span></li>
													   </>)
														})} */}
                                </ul>
                                <div className="position-relative">
                                  <div
                                    className="hint_box"
                                    style={{ display: "block" }}
                                  >
                                    <Select
                                      options={options}
                                      isMulti
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>
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
                              onClick={createclientGroup}
                            >
                              Create Group
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <ClientNewTable rows={rowData} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Modal show={isOpen} onHide>
          <Modal.Body>
            <div
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-scrollable">
                <form onSubmit={handleSubmit(add_new_resident)}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Add New Resident
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => {
                          reset();
                          resetForm();
                        }}
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label">First Name</label>
                          <input
                            // value={firstName}
                            // onChange={(e) => setFirstName(e.target.value)}
                            type="text"
                            className="form-control"
                            {...register("firstName", {
                              required: true,
                              pattern: /^[A-Za-z ]+$/i,
                              min: 1,
                            })}
                          />
                          {errors?.firstName?.type === "pattern" && (
                            <p className="error">Alphabet only</p>
                          )}
                          {errors?.firstName?.type === "required" && (
                            <p className="error">This field is required</p>
                          )}
                          {errors?.firstName?.type === "min" && (
                            <p className="error">This field is required</p>
                          )}
                        </div>
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Last Name</label>
                          <input
                            // value={lastName}
                            // onChange={(e) => setlastName(e.target.value)}
                            type="text"
                            className="form-control"
                            {...register("lastName", {
                              required: true,
                              pattern: /^[A-Za-z ]+$/i,
                              min: 1,
                            })}
                          />
                          {errors?.lastName?.type === "pattern" && (
                            <p className="error">Alphabet only</p>
                          )}
                          {errors?.lastName?.type === "required" && (
                            <p className="error">This field is required</p>
                          )}
                          {errors?.lastName?.type === "min" && (
                            <p className="error">This field is required</p>
                          )}
                        </div>
                        <div className="col-md-12 mb-3">
                          <label className="form-label">
                            ContractStartDate
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            {...register("ContractStartDate", {
                              required: true,
                            })}
                          />

                          {errors?.ContractStartDate?.type === "required" && (
                            <p className="error">This field is required</p>
                          )}
                        </div>
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Date of Birth</label>
                          <input
                            type="date"
                            className="form-control"
                            {...register("DOB", {
                              required: true,
                            })}
                          />
                          {errors?.DOB?.type === "required" && (
                            <p className="error">This field is required</p>
                          )}
                        </div>
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Location</label>
                          <MapboxAutocomplete
                            publicKey="pk.eyJ1IjoiY2hhaXRhbnlhYXBwaWMxMjMiLCJhIjoiY2wwNmZ5M2tjMTU4ajNqcDM4dm5ka2FrbiJ9.JD36e92UBwLpFz163HJdEg"
                            inputClass="form-control"
                            onSuggestionSelect={_suggestionSelect}
                            resetSearch={false}
                            {...register("location", {
                              required: locErrorMsg,
                            })}
                          />
                          {errors?.location?.type === "required" &&
                            locErrorMsg && (
                              <p className="error">This field is required</p>
                            )}
                        </div>
                        <div className="col-md-12 mb-3">
                          <label className="form-label">Image</label>
                          <input
                            type="file"
                            accept="image/*"
                            className="form-control"
                            {...register("uploadFile", {
                              required: true,
                            })}
                            onChange={(e) => {
                              unregister("uploadFile");
                            }}
                          />

                          {errors?.uploadFile?.type === "required" && (
                            <p className="error">This field is required</p>
                          )}
                        </div>
                        {/* <div className="col-md-12 mb-3">
									<label className="form-label">Contact Number</label>
									<input value={ContactNumber} onChange={(e) => setContactNumber(e.target.value)} type="number" className="form-control" />
								</div>
								<div className="col-md-12 mb-3">
									<label className="form-label">Email</label>
									<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
								</div>
								<div className="col-md-12 mb-3">
									<label className="form-label">Marital Status</label>
									<input value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} type="text" className="form-control" />
								</div>
								<div className="col-md-12 mb-3">
									<label className="form-label">Religion</label>
									<input value={religion} onChange={(e) => setReligion(e.target.value)} type="text" className="form-control" />
								</div>
								<div className="col-md-12 mb-3">
									<label className="form-label">Citizenship</label>
									<input value={citizenship} onChange={(e) => setCitizenship(e.target.value)} type="text" className="form-control" />
								</div>
								<div className="col-md-12 mb-3">
									<label className="form-label">Languages</label>
									<input value={Languages} onChange={(e) => setLanguages(e.target.value)} type="text" className="form-control" />
							</div> */}
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-danger"
                        // data-bs-dismiss="modal"
                        onClick={() => {
                          reset();
                          resetForm();
                        }}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success"
                        // data-bs-dismiss="modal"
                      >
                        Add Docs
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default Clients;
