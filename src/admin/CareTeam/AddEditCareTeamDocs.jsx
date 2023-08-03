import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const AddEditCareTeamDocs = (props) => {
  var [newData, setnewData] = useState("");

  function docEvent(docsData) {
    console.log("=====", docsData);
    setnewData(docsData);
    setTeamdocId(docsData._id);
    setEditDocName(docsData.docName);
    seteditType(docsData.type);
    setEditCreationDate(docsData.creationDate);
    setEditCreatedBy(docsData.createdBy);
    setEditReview(docsData.review);
  }
  const [docsTableData, setDocsTableData] = useState([]);
  const [docName, setDocName] = useState("");
  const [type, setType] = useState("");
  const [docsCreationDate, setdocsCreationDate] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [review, setReview] = useState("");
  function careTeamDocs() {
    var data = JSON.stringify({
      docName: docName,
      type: type,
      creationDate: docsCreationDate,
      createdBy: createdBy,
      review: review,
    });
    // console.log(data)

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/careTeamdocs/${params.id}`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response, "setDocsTableData");
        // console.log(JSON.stringify(response.data.docs));
        getCareTeambyId();
        setDocsTableData(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [teamdocId, setTeamdocId] = useState("");
  const [editDocName, setEditDocName] = useState("");
  const [editType, seteditType] = useState("");
  const [editCreationDate, setEditCreationDate] = useState("");
  const [editCreatedBy, setEditCreatedBy] = useState("");
  const [editReview, setEditReview] = useState("");
  function editCareTeamDoc() {
    var data = JSON.stringify({
      teamdocId: teamdocId,
      docName: editDocName,
      type: editType,
      creationDate: editCreationDate,
      createdBy: editCreatedBy,
      review: editReview,
    });
    // console.log(data)

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/editcareTeamdoc/${params.id}`,
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
        getCareTeambyId();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getCareTeambyId();
  }, []);

  let params = useParams();
  console.log(params);

  const getCareTeambyId = () => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/careTeambyId?careteamId=${params.id}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let CareTeamData = res.data.careteamData;
        console.log(CareTeamData);
        setDocsTableData(CareTeamData.careTeamDocs);

        // CareTeamData.careTeamDocs.forEach(element => {
        //     console.log("000000000000000", element)
        // })
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="btns_head">
            <h5 className="tb_title mt-0">
              {" "}
              <button
                className=" mb-4 btn btn-theme btn-sm float-end"
                data-bs-toggle="modal"
                data-bs-target="#add_docs"
                disabled={props.Docsaccess}
              >
                Add Doc
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
              {docsTableData?.map(function (docsData, index) {
                return (
                  <tr key={index}>
                    <td>{docsData.docName}</td>
                    <td>{docsData.type}</td>
                    <td>{docsData.creationDate}</td>
                    <td>{docsData.createdBy}</td>
                    <td>{docsData.review}</td>
                    <td>
                      <NavLink to="" className="action_edit">
                        <img
                          alt=""
                          src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/file.svg`}
                        />
                      </NavLink>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_docs"
                        onClick={() => docEvent(docsData)}
                        disabled={props.Docsaccess}
                      >
                        <img
                          alt=""
                          src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/edit.svg`}
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
            id="add_docs"
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
                      <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Creation Date</label>
                      <input
                        type="date"
                        value={docsCreationDate}
                        onChange={(e) => setdocsCreationDate(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Created By</label>
                      <input
                        type="text"
                        value="Admin"
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
                    {/* <div className="col-md-12 mb-3">
													<label className="form-label">File</label>
													<input type="file" onChange={(e) => setimage(e.target.files[0])} className="form-control" />
												</div> */}
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
                    onClick={careTeamDocs}
                  >
                    Add Docs
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="edit_docs"
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
                    <input
                      type="hidden"
                      value={newData._id}
                      onChange={(e) => setTeamdocId(e.target.value)}
                      className="form-control"
                    />
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Doc Name</label>
                      <input
                        type="text"
                        defaultValue={newData.docName}
                        onChange={(e) => setEditDocName(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Type</label>
                      <input
                        type="text"
                        defaultValue={newData.type}
                        onChange={(e) => seteditType(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Creation Date</label>
                      <input
                        type="text"
                        defaultValue={newData.creationDate}
                        onChange={(e) => setEditCreationDate(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Created By</label>
                      <input
                        type="text"
                        defaultValue={newData.createdBy}
                        onChange={(e) => setEditCreatedBy(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Next Review</label>
                      <input
                        type="text"
                        defaultValue={newData.review}
                        onChange={(e) => setEditReview(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">File</label>
                      <input type="file" className="form-control" />
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
                    onClick={editCareTeamDoc}
                  >
                    Edit Docs
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

export default AddEditCareTeamDocs;
