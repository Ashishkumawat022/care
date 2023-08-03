import React, { useMemo, useState, useRef, useEffect } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./UserRoleManagement.css";
import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import Header from "../Header/header";
import Select from "react-select";
import Sidebar from "../Sidebar/sidebar";
import UpdateUserRoleManagement from "./UpdateUserRoleManagement";
import Footer from "../Footer/footer";
import { AiFillEye } from "react-icons/ai";
import Modal_Popup from "../../components/modal_renderer/Modal_Popup";
import { useForm } from "react-hook-form";
import { Modal, Button } from "react-bootstrap";
import { Roles, AccessManagementDefaultRoles } from "../../constants/roles";
import UserRoleTable from "./UserRoleTable";

function UserRoleManagement() {
  const [show, setShow] = useState(false);
  // const childRef = useRef();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [refresh, doRefresh] = useState(0);
  const [addButtonStatus, setAddButtonStatus] = useState(null);
  const [UpdateStudentData, setUpdateCategoriesData] = useState({});
  const [DeleteDeleteId, setDeleteDeleteId] = useState("");
  const [Viewuser, setViewuser] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [data, setdata] = useState(Roles);
  const [selectedOptiongroup, setselectedOptiongroup] = useState([]);
  const [userType, setUserType] = useState("");
  // const [selectedOptionGroupLabel, setSelectedOptionGroupLabel] = useState([]);
  const [pvisibility, setpvisibility] = useState(false);
  const [cpvisibility, setcpvisibility] = useState(false);
  const pagination = true;
  const paginationPageSize = 100;
  const rowHeight = 55;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({ mode: "onBlur" });

  const [isOpen, setIsOpen] = useState(false);
  const MoodRenderer = (props) => {
    return (
      <span className="profle_img_box">
        <stong>{props.data}</stong>
      </span>
    );
  };
  let urlID = JSON.parse(localStorage.getItem("userData"));
  useEffect(() => {
    if (urlID.userType === "owner") {
      setdata(Roles.slice(1));
    }

    if (urlID.userType === "admin") {
      setdata(Roles.slice(2));
    }

    if (urlID.userType === "deputy_admin") {
      setdata(Roles.slice(3));
    }

    if (urlID.userType === "supervisor") {
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

  const SrNoRenderer = (props) => {
    return (
      <>
        <span>{props.node.rowIndex + 1}</span>
      </>
    );
  };
  const NameRenderer = (props) => {
    return (
      <>
        <span>{props.data.firstName + " " + props.data.lastName}</span>
      </>
    );
  };

  const RolesRenderer = (props) => {
    return (
      <>
        {/* {props.data?.type === 'master admin' && props.data?.roles?.length === 0 && <span> Access of All Modules</span>} */}
        {props.data && props.data.userType && (
          <span> {props.data.userType}</span>
        )}
      </>
    );
  };
  const Multicaresite = (props) => {
    return (
      <>
        <span>Multicaresite</span>
      </>
    );
  };

  const srnoValueGetter = (params) => {
    return params.node.rowIndex + 1;
  };

  const ChildMessageRenderer = (props) => {
    return (
      <div className="iconActionList">
        <div
          className="editIcon"
          onClick={() => {
            handleShow();
            doRefresh(0);
            setUpdateCategoriesData(props.data);
          }}
        >
          <MdModeEditOutline className="ActionIcon viewicon" />
        </div>

        <div
          className="ViewIcon"
          onClick={() => {
            setViewuser(props.data);
          }}
          data-bs-toggle="modal"
          data-bs-target="#UserViewId"
        >
          <AiFillEye alt="" src="../../images/view.jpg" />
        </div>
      </div>
    );
  };

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
      ownerId: urlID.userType === "owner" ? urlID._id : urlID.ownerId._id,
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
      url: `http://3.91.203.43:8700/admin/registeradmin`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
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

  const OwnerId = JSON.parse(localStorage.getItem("userData"))._id;
  function getAdminsbyOwnerId() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getSubUsers`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
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
      url: `${process.env.REACT_APP_BASEURL}/changestatus`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
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
    const defaultRole = AccessManagementDefaultRoles.filter((roles) => {
      return roles.roleId === event.role;
    });
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
            Add User
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

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Admin Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateUserRoleManagement
            refresh={refresh}
            handleClose={handleClose}
            updatedData={UpdateStudentData}
            onEditDataFunction={editdataReloadFunc}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-danger CancelBtn" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="btn submitBtn"
            onClick={() => {
              doRefresh((prev) => prev + 1);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

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

      <UserRoleTable rows={rowData} />

      {/* <div
                style={{ width: "100%" }}
                className="ag-theme-alpine tableFix"
            >
                <AgGridReact
                    rowHeight={rowHeight}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    frameworkComponents={{
                        childMessageRenderer: ChildMessageRenderer,
                        moodRenderer: MoodRenderer,
                        srNoRenderer: SrNoRenderer,
                        nameRenderer: NameRenderer,
                        multicaresite: Multicaresite,
                        statusRenderer: StatusRenderer,
                        rolesRenderer: RolesRenderer,
                    }}
                >
                    <AgGridColumn
                        width={200}
                        field="Name"
                        cellRenderer="nameRenderer"
                        sortable={true}
                        filter={true}
                    ></AgGridColumn>
                    <AgGridColumn
                        width={200}
                        field="Roles"
                        cellRenderer="rolesRenderer"
                        sortable={true}
                        filter={true}
                    ></AgGridColumn>
                    <AgGridColumn
                        width={250}
                        field="email"
                        sortable={true}
                        filter={true}
                    ></AgGridColumn>
                    <AgGridColumn
                        cellRenderer="multicaresite"
                        field="Multi Care Site Status"
                        sortable={true}
                    ></AgGridColumn>
                    <AgGridColumn
                        width={100}
                        field="Action"
                        cellRenderer="childMessageRenderer"
                        colId="params"
                        sortable={false}
                        filter={false}
                    ></AgGridColumn>
                    <AgGridColumn
                        cellRenderer="statusRenderer"
                        field="status"
                        sortable={true}
                    ></AgGridColumn>
                </AgGridReact>
            </div> */}
    </>
  );
}

export default UserRoleManagement;
