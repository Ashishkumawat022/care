import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { ComplianceDocsType } from "../../constants/constants";
import Select from "react-select";

const AddEditComplianceDocs = (props) => {
  function CompliancedocEvent(Compliancedata) {
    setnewComplianceData(Compliancedata);
    setEditcomplianceDocs_id(Compliancedata._id);
    setEditCompliancedocName(Compliancedata.docName);
    setEditComplianceDocsType(Compliancedata.type);
    setEditComplianceCreationDate(Compliancedata.creationDate);
    setEditComplianceCreatedBy(Compliancedata.createdBy);
    setEditComplianceReview(Compliancedata.review);
  }

  const [newComplianceData, setnewComplianceData] = useState([]);
  const [editcomplianceDocs_id, setEditcomplianceDocs_id] = useState("");
  const [editCompliancedocName, setEditCompliancedocName] = useState("");
  const [editComplianceDocsType, setEditComplianceDocsType] = useState("");
  const [editComplianceCreationDate, setEditComplianceCreationDate] =
    useState("");
  const [editComplianceCreatedBy, setEditComplianceCreatedBy] = useState("");
  const [editComplianceReview, setEditComplianceReview] = useState("");
  function editnewcomplianceDocs() {
    var data = JSON.stringify({
      complianceDocs_id: editcomplianceDocs_id,
      docName: editCompliancedocName,
      type: editComplianceDocsType,
      creationDate: editComplianceCreationDate,
      createdBy: editComplianceCreatedBy,
      review: editComplianceReview,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/editcomplianceDocs/${params.id}`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        getClientbyId();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // getting Compliance Docs Data
  const [editComplianceDocs, setEditComplianceDocs] = useState([]);
  const [docName, setDocName] = useState("");
  const [complianceDocsType, setComplianceDocsType] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [review, setReview] = useState("");
  const [image, setImage] = useState("");
  function complianceDocs() {
    let formdata = new FormData();
    formdata.append("docName", docName);
    formdata.append("type", complianceDocsType);
    formdata.append("creationDate", creationDate);
    formdata.append("createdBy", createdBy);
    formdata.append("review", review);
    formdata.append("image", image);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/complianceDocs/${params.id}`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        // "Content-Type": "multipart/formdata",
      },
      data: formdata,
    };

    axios(config)
      .then(function (response) {
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
        setEditComplianceDocs(ClientData?.complianceDocs);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const handleChange = (e) => {
    setComplianceDocsType(e.value);
  };
  const EdithandleChange = (e) => {
    setEditComplianceDocsType(e.value);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="btns_head">
            <h5 className="tb_title mt-0">
              <button
                className=" mb-4 btn btn-theme btn-sm float-end"
                data-bs-toggle="modal"
                data-bs-target="#add_complianceDocs"
                disabled={props.ComplianceDocsaccess}
              >
                Add Docs
              </button>
            </h5>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Doc Name</th>
                <th>Type</th>
                <th>Creation Date</th>
                <th>Created By</th>
                <th>Next Review</th>
                <th>File</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {editComplianceDocs?.map(function (items, index) {
                return (
                  <tr key={index}>
                    <td>{items.docName}</td>
                    <td>{items.type}</td>
                    <td>{items.creationDate}</td>
                    <td>{items.createdBy}</td>
                    <td>{items.review}</td>
                    <td>
                      <span
                        to=""
                        className="action_edit"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(
                            items?.image,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                      >
                        <img
                          alt=""
                          src={`http://caremagnusbundled.s3-website.eu-west-2.amazonaws.com/images/file.svg`}
                        />
                      </span>
                    </td>
                    <td>
                      <button
                        className="action_table_btn"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_complianceDocs"
                        onClick={() => CompliancedocEvent(items)}
                        disabled={props.ComplianceDocsaccess}
                      >
                        <img
                          alt=""
                          src={`http://caremagnusbundled.s3-website.eu-west-2.amazonaws.com/images/edit.svg`}
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
            id="add_complianceDocs"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Docs
                  </h5>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Doc Name</label>
                      <input
                        type="text"
                        value={docName}
                        onChange={(e) => setDocName(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Type</label>

                      <Select
                        defaultValue={{
                          label: complianceDocsType,
                          value: complianceDocsType,
                        }}
                        options={ComplianceDocsType}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Creation Date</label>
                      <input
                        type="date"
                        value={creationDate}
                        onChange={(e) => setCreationDate(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Created By</label>
                      <input
                        type="text"
                        value={createdBy}
                        onChange={(e) => setCreatedBy(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Next Review</label>
                      <input
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">File</label>
                      <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
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
                    onClick={complianceDocs}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="edit_complianceDocs"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Docs
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
                        defaultValue={newComplianceData._id}
                        onChange={(e) =>
                          setEditcomplianceDocs_id(e.target.value)
                        }
                        className="form-control"
                      />
                      <label className="form-label">Doc Name</label>
                      <input
                        type="text"
                        defaultValue={newComplianceData.docName}
                        onChange={(e) =>
                          setEditCompliancedocName(e.target.value)
                        }
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Type</label>
                      {/* <input
                        type="text"
                        defaultValue={newComplianceData.type}
                        onChange={(e) =>
                          setEditComplianceDocsType(e.target.value)
                        }
                        className="form-control"
                      /> */}
                      <Select
                        defaultValue={{
                          label: editComplianceDocsType,
                          value: editComplianceDocsType,
                        }}
                        options={ComplianceDocsType}
                        onChange={EdithandleChange}
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Creation Date</label>
                      <input
                        type="date"
                        defaultValue={newComplianceData.creationDate}
                        onChange={(e) =>
                          setEditComplianceCreationDate(e.target.value)
                        }
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Created By</label>
                      <input
                        type="text"
                        defaultValue={newComplianceData.createdBy}
                        onChange={(e) =>
                          setEditComplianceCreatedBy(e.target.value)
                        }
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Next Review</label>
                      <input
                        type="text"
                        defaultValue={newComplianceData.review}
                        onChange={(e) =>
                          setEditComplianceReview(e.target.value)
                        }
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
                    onClick={editnewcomplianceDocs}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEditComplianceDocs;
