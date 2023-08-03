import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AddEditContact = (props) => {
  const [editKeyContact, setEditKeyContact] = useState([]);
  const [keyName, setKeyName] = useState("");
  const [relation, setRelation] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  function keyContact() {
    var data = JSON.stringify({
      name: keyName,
      relation: relation,
      address: address,
      phone: phone,
      email: email,
    });
    // console.log(data);
    // console.log(params.id)
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/keyContact/${params.id}`,
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

  //editKeycontact

  function keyContactdocEvent(keyContactData) {
    // console.log("=====", keyContactData)
    setnewKeyContact(keyContactData);
    setkeycontact_id(keyContactData._id);
    seteditkeyName(keyContactData.name);
    seteditrelation(keyContactData.relation);
    seteditaddress(keyContactData.address);
    seteditphone(keyContactData.phone);
    seteditemail(keyContactData.email);
  }
  const [newKeyContact, setnewKeyContact] = useState([]);
  const [keycontact_id, setkeycontact_id] = useState("");
  const [editkeyName, seteditkeyName] = useState("");
  const [editrelation, seteditrelation] = useState("");
  const [editaddress, seteditaddress] = useState("");
  const [editphone, seteditphone] = useState("");
  const [editemail, seteditemail] = useState("");
  const [editInvContriPercentage, seteditInvContriPercentage] = useState("");
  function editnewkeyContact() {
    var data = JSON.stringify({
      keycontact_id: keycontact_id,
      name: editkeyName,
      relation: editrelation,
      address: editaddress,
      phone: editphone,
      email: editemail,
      InvContriPercentage: editInvContriPercentage,
    });
    // console.log(data);
    // console.log(params.id)
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/editKeycontact/${params.id}`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getClientbyId();
        seteditInvContriPercentage("");
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
        // console.log("============>>" + JSON.stringify(ClientData));
        setEditKeyContact(ClientData?.keycontact);
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
                data-bs-target="#add_keyContacts"
                disabled={props.Contactaccess}
              >
                Add Contact
              </button>
            </h5>
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Relation</th>
                <th>Address</th>
                <th>Tel</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {editKeyContact?.map(function (items, index) {
                return (
                  <tr key={index}>
                    <td>{items.name}</td>
                    <td>{items.relation}</td>
                    <td>{items.address}</td>
                    <td>{items.phone}</td>
                    <td>{items.email}</td>
                    <td>
                      {" "}
                      {/* changes by jitender "action_table_btn" this class new added - 12/1/2022 */}
                      <button
                        className="action_table_btn"
                        data-bs-toggle="modal"
                        data-bs-target="#edit_keyContacts"
                        onClick={() => keyContactdocEvent(items)}
                        disabled={props.Contactaccess}
                      >
                        <img
                          alt="jkdjk"
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
            id="add_keyContacts"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Key Contacts
                  </h5>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        value={keyName}
                        onChange={(e) => setKeyName(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Relation</label>
                      <input
                        type="text"
                        value={relation}
                        onChange={(e) => setRelation(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-12 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    onClick={keyContact}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="edit_keyContacts"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Key Contacts
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
                        defaultValue={newKeyContact._id}
                        onChange={(e) => setkeycontact_id(e.target.value)}
                        className="form-control"
                      />
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        defaultValue={newKeyContact.name}
                        onChange={(e) => seteditkeyName(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Relation</label>
                      <input
                        type="text"
                        defaultValue={newKeyContact.relation}
                        onChange={(e) => seteditrelation(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        defaultValue={newKeyContact.address}
                        onChange={(e) => seteditaddress(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Tel</label>
                      <input
                        type="number"
                        defaultValue={newKeyContact.phone}
                        onChange={(e) => seteditphone(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        defaultValue={newKeyContact.email}
                        onChange={(e) => seteditemail(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Funding Source</label>
                      <input
                        type="number"
                        defaultValue={newKeyContact.InvContriPercentage}
                        onChange={(e) =>
                          seteditInvContriPercentage(e.target.value)
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
                    onClick={editnewkeyContact}
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

export default AddEditContact;
