import React, { useMemo, useState, useRef, useEffect } from "react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./UserRoleManagement.css";
import Select from "react-select";
import Modal_Popup from "../../components/modal_renderer/Modal_Popup";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import UserRoleTable from "./UserRoleTable";
import {
  Roles,
  SuperAdminAccessManagementDefaultRoles,
} from "../../constants/constants";

function UserRoleManagement() {
  const [show, setShow] = useState(false);

  const [addButtonStatus, setAddButtonStatus] = useState(null);
  const [Viewuser, setViewuser] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [data, setdata] = useState(Roles);
  const [selectedOptiongroup, setselectedOptiongroup] = useState([]);
  const [userType, setUserType] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  const [isOpen, setIsOpen] = useState(false);

  let urlID = JSON.parse(localStorage.getItem("__csadmin__d"));
  useEffect(() => {
    if (urlID.userType === "superadmin") {
      setdata(Roles.slice(1));
    }

    if (urlID.userType === "admin") {
      setdata(Roles.slice(2));
    }

    if (urlID.userType === "deputy_admin") {
      setdata(Roles.slice(3));
    }

    if (urlID.userType === "customer_support") {
      setdata([]);
    }
  }, []);

  function somefun() {
    setAddButtonStatus(false);
    setRoleErrorStatus(false);
    setIsEmailExist(false);
    setIsOpen(false);
    cancelForm();
  }

  function fun() {
    setAddButtonStatus(false);
    setRoleErrorStatus(false);
    setIsEmailExist(false);
    setIsOpen(false);
    cross();
  }

  function cancelForm() {
    reset();
  }

  function cross() {
    reset();
  }

  const editdataReloadFunc = () => {
    getAdminsbyOwnerId();
  };

  // ------Post API-------//
  const [roleErrorStatus, setRoleErrorStatus] = useState(null);
  const [isEmailExist, setIsEmailExist] = useState(null);
  const [roleErrorMessage, setRoleErrorMessage] = useState(null);

  function addNewRole(postdata) {
    if (selectedOptiongroup.length === 0) {
      setAddButtonStatus(true);
      setRoleErrorStatus(true);
      return;
    }
    setRoleErrorStatus(false);

    var data = JSON.stringify({
      userType: userType,
      superAdminId: urlID.userType === "superadmin" ? urlID._id : null,
      adminId: urlID.userType === "admin" ? urlID._id : null,
      deputyAdminId: urlID.userType === "deputy_admin" ? urlID._id : null,
      email: postdata.email,
      firstName: postdata.firstName,
      lastName: postdata.lastName,
      mobile: postdata.tel,
      role: selectedOptiongroup,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/registerUserSuperadminPanel`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        if (response.data.status) {
          reset();
          setIsEmailExist(false);
          setIsOpen(false);
          getAdminsbyOwnerId();
        } else {
          setIsOpen(true);
          setIsEmailExist(true);
          setRoleErrorMessage(response.data.message);
        }
      })
      .catch(function (error) {
        setAddButtonStatus(false);
        setIsOpen(true);
        setIsEmailExist(true);
        setRoleErrorMessage(error.response.data.message);
      })
      .finally(function () {
        setAddButtonStatus(false);
      });
    // setAddButtonStatus(false)
  }

  useEffect(() => {
    getAdminsbyOwnerId();
  }, []);

  useEffect(() => {
    if (selectedOptiongroup.length > 0) {
      setRoleErrorStatus(false);
    }
  }, [selectedOptiongroup]);

  const roleId = JSON.parse(localStorage.getItem("__csadmin__d"))._id;
  function getAdminsbyOwnerId() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getSubUsers`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "rowdata");
        setRowData(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ------ Delete API -------//

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      sortingoder: "desc",
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);

  const StatusRenderer = (props) => {
    let status = props?.data?.status ? "deactivate" : "activate";
    let message = "Are you sure you want to " + status + " this user?";
    return (
      <>
        <Modal_Popup
          status={props?.data?.status}
          onClick={() => {
            changeStudentStatus(props?.data?._id);
          }}
          message={message}
          isDisabled={props.data.type === "master admin" ? true : false}
        />
      </>
    );
  };

  function changeStudentStatus(adminId) {
    var data = JSON.stringify({
      adminId: adminId,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/changestatus`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getAdminsbyOwnerId();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const customLowerCaseComparator = (valueA, valueB) => {
    if (typeof valueA === "string") {
      return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
    }

    return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
  };

  const handlechange = (event) => {
    let array = [event];
    if (array.length > 0) {
      setAddButtonStatus(false);
    }
    const defaultRole = SuperAdminAccessManagementDefaultRoles.filter(
      (roles) => {
        return roles.roleId === event.role;
      }
    );
    setUserType(event.role);
    setselectedOptiongroup(defaultRole);

    // setSelectedOptionGroupLabel(arrayLabel);
  };

  return (
    <>
      <h4 className="card-title">
        <div className="float-end btns_head">
          <button
            className="btn btn-theme btn-sm"
            onClick={() => {
              setIsOpen(true);
              setAddButtonStatus(false);
            }}
          >
            Add
          </button>
        </div>
      </h4>

      <div>
        <Modal show={isOpen} onHide>
          <Modal.Body>
            <form onSubmit={handleSubmit(addNewRole)}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Add User
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={() => fun()}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">First Name</label>
                        <div className="position-relative">
                          <input
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
                          <div
                            className="hint_box"
                            style={{ display: "block" }}
                          ></div>
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Last Name</label>
                        <div className="position-relative">
                          <input
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
                      </div>
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Email</label>
                        <div className="position-relative">
                          <input
                            className="form-control"
                            {...register("email", {
                              required: true,
                              pattern:
                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            })}
                          />
                          {errors?.email?.type === "pattern" && (
                            <p className="error">Invalid email address</p>
                          )}
                          {errors?.email?.type === "required" && (
                            <p className="error">This field is required</p>
                          )}
                          {isEmailExist && (
                            <p style={{ color: "red" }}>{roleErrorMessage}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Contact Number</label>
                        <div className="position-relative">
                          <input
                            className="form-control"
                            {...register("tel", {
                              required: "This field is required",
                              minLength: {
                                value: 6,
                                message: "Please enter minimum 6 characters",
                              },
                            })}
                          />
                          {errors.tel && (
                            <p role="alert" className="error">
                              {errors.tel.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12 mb-3">
                        <label className="form-label">Role</label>
                        <Select
                          options={data}
                          key={data}
                          onChange={(e) => handlechange(e)}
                        />
                        {roleErrorStatus && (
                          <p className="error">This field is required</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      onClick={() => somefun()}
                      type="button"
                      className="btn btn-danger CancelBtn"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      // disabled={addButtonStatus}
                      type="submit"
                      className="btn submitBtn"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
            {/* </div> */}
          </Modal.Body>
        </Modal>
      </div>

      <div
        className="modal fade"
        id="UserViewId"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Admin Details{" "}
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
                <div className="col-12">
                  <div className="card">
                    <div className="card-body border">
                      <div className="profile_box">
                        <div className="profile_box_body">
                          <div>
                            <h6> Name : {Viewuser.username}</h6>
                          </div>
                          <div>
                            <h6> Email : {Viewuser.email}</h6>
                          </div>
                          <div>
                            {Viewuser?.type === "master admin" &&
                              Viewuser?.roles?.length === 0 && (
                                <h6> Roles : Access of All Modules</h6>
                              )}
                            {Viewuser?.roles?.length > 0 && (
                              <h6>
                                {" "}
                                Roles :{" "}
                                {Viewuser?.roles
                                  .map((item) => {
                                    if (item.includes("_")) {
                                      const newItem = item.split("_").join(" ");
                                      return newItem;
                                    }
                                    return item;
                                  })
                                  .join(", ")}
                              </h6>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger CancelBtn"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserRoleTable rows={rowData} refreshData={editdataReloadFunc} />
    </>
  );
}

export default UserRoleManagement;
