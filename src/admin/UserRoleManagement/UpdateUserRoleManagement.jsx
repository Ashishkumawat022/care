import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import axios from "axios";
import "./UserRoleManagement.css";
import Select from "react-select";
import { modules } from "../../constants/roles";

const UpdateUserRoleManagement = forwardRef((props, ref) => {
  console.log(props.updatedData, "UpdateUserRoleManagement");
  const updatedroles = props?.updatedData?.role[0]?.Modules;
  const [selectedOptiongroup, setselectedOptiongroup] = useState(updatedroles);
  const [data, setdata] = useState(modules);

  const [roleErrorStatus, setRoleErrorStatus] = useState(null);
  const [firstName, seteditfirstNames] = useState(props.updatedData?.firstName);
  const [lastName, seteditlastName] = useState(props.updatedData?.lastName);
  const [mobileNo, seteditmobileNo] = useState(props.updatedData?.mobileNo);
  useEffect(() => {
    updateStudentData(); //children function of update roles
  }, [props.refresh]);

  useEffect(() => {
    if (selectedOptiongroup.length > 0) {
      setRoleErrorStatus(false);
    }
  }, [selectedOptiongroup]);

  function updateStudentData() {
    // console.log(props, "props?.updatedData?.roles")
    if (props.refresh != 0) {
      // if (props?.updatedData?.roles.length <= 0 && selectedOptiongroup.length === 0) {
      //     setRoleErrorStatus(true)
      //     return;
      // }

      let roles = [
        {
          roleId: props?.updatedData?.role[0].roleId,
          Modules: selectedOptiongroup,
        },
      ];

      let data = JSON.stringify({
        email: props.updatedData?.email,
        firstName: firstName,
        lastName: lastName,
        mobileNo: mobileNo,
        userType: props.updatedData.userType,
        role: roles,
      });
      console.log(data);

      let config = {
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/editadmin?adminId=${props.updatedData?._id}&ownerId=${props.updatedData?.ownerId}`,
        headers: {
          Authorization: localStorage.getItem("care_admin_token"),
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          props.onEditDataFunction();
          props.handleClose();
          setRoleErrorStatus(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  const handlechange = (event) => {
    console.log(event, "handlechange");
    if (event.length > 0) {
      setRoleErrorStatus(false);
    } else {
      setRoleErrorStatus(true);
    }
    let array = [];
    // let arrayLabel = [];
    event.forEach((option) => {
      array.push(option.value);
    });
    // event.forEach((option) => {
    //     arrayLabel.push(option.label);
    // })
    setselectedOptiongroup(array);
    // setSelectedOptionGroupLabel(arrayLabel);
  };

  function customRolesChangeHandler(perStatus, subModuleName, moduleName) {
    console.log(
      perStatus,
      subModuleName,
      moduleName,
      selectedOptiongroup,
      "customRolesChangeHandler"
    );

    if (moduleName) {
      setselectedOptiongroup((prevState, index) => {
        console.log(prevState, "selectedOptiongroup ");
        let customedData = prevState.map((moduleRole) => {
          if (moduleName == moduleRole.moduleName) {
            if (moduleRole && moduleRole.children) {
              const subChildren = moduleRole.children.map((subModuleRole) => {
                if (subModuleName == subModuleRole.moduleName) {
                  subModuleRole["access"] = perStatus;
                }
                return subModuleRole;
              });
              moduleRole["children"] = subChildren;
            } else {
              moduleRole["access"] = perStatus;
            }
          }
          return moduleRole;
        });
        return customedData;
      });
    }
    // setselectedOptiongroup()
  }

  // console.log(selectedOptiongroup, "updated data");

  return (
    <>
      <div className="row">
        <div className="col-md-12 mb-3">
          <label className="form-label">First Name</label>
          <div className="position-relative">
            <input
              type="text"
              defaultValue={firstName}
              key={props.updatedData?.firstName}
              onChange={(e) => {
                seteditfirstNames(e.target.value);
              }}
              className="form-control"
            />
            <div className="hint_box" style={{ display: "block" }}></div>
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <label className="form-label">Last Name</label>
          <div className="position-relative">
            <input
              type="text"
              defaultValue={lastName}
              key={props.updatedData?.lastName}
              className="form-control"
              onChange={(e) => {
                seteditlastName(e.target.value);
              }}
            />
            <div className="hint_box" style={{ display: "block" }}></div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mb-3">
          <label className="form-label">Email Address</label>
          <div className="position-relative">
            <input
              disabled
              type="text"
              defaultValue={props.updatedData?.email}
              key={props.updatedData?.email}
              className="form-control"
            />
            <div className="hint_box" style={{ display: "block" }}></div>
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <label className="form-label">Contact Number</label>
          <div className="position-relative">
            <input
              type="number"
              defaultValue={mobileNo}
              key={props.updatedData?.mobileNo}
              onChange={(e) => {
                seteditmobileNo(e.target.value);
              }}
              className="form-control"
            />
            <div className="hint_box" style={{ display: "block" }}></div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mb-3">
          <label className="form-label">Custom Roles</label>
          <div className="position-relative category">
            {updatedroles.length > 0 &&
              updatedroles.map((customroles, customIndex) => {
                let submodule = "";
                if (customroles && customroles.children) {
                  submodule = customroles.children.map(
                    (subcroles, subcroleIndex) => {
                      return (
                        <div className="subcategorychild">
                          <div>{subcroles.moduleName}</div>
                          {"  "}
                          <div className="lableText">
                            {" "}
                            <label>full acess</label>{" "}
                            <input
                              name={subcroles.moduleName + customIndex}
                              type="radio"
                              value="full"
                              defaultChecked={subcroles.access === "full"}
                              onChange={(e) => {
                                customRolesChangeHandler(
                                  e.target.value,
                                  subcroles.moduleName,
                                  customroles.moduleName
                                );
                              }}
                            />
                            <label>view acess</label>{" "}
                            <input
                              name={subcroles.moduleName + customIndex}
                              type="radio"
                              value="view"
                              defaultChecked={subcroles.access === "view"}
                              onChange={(e) => {
                                customRolesChangeHandler(
                                  e.target.value,
                                  subcroles.moduleName,
                                  customroles.moduleName
                                );
                              }}
                            />
                            <label>no acess</label>{" "}
                            <input
                              name={subcroles.moduleName + customIndex}
                              type="radio"
                              value="no"
                              defaultChecked={subcroles.access === "no"}
                              onChange={(e) => {
                                customRolesChangeHandler(
                                  e.target.value,
                                  subcroles.moduleName,
                                  customroles.moduleName
                                );
                              }}
                            />
                          </div>
                        </div>
                      );
                    }
                  );
                } else {
                  submodule = (
                    <div className="subcategory">
                      <div className="lableText">
                        <label>full acess</label>
                        <input
                          name={customroles.moduleName + customIndex}
                          type="radio"
                          value="full"
                          defaultChecked={customroles.access === "full"}
                          onChange={(e) => {
                            customRolesChangeHandler(
                              e.target.value,
                              null,
                              customroles.moduleName
                            );
                          }}
                        />
                        <label>view acess</label>
                        <input
                          name={customroles.moduleName + customIndex}
                          type="radio"
                          value="view"
                          defaultChecked={customroles.access === "view"}
                          onChange={(e) => {
                            customRolesChangeHandler(
                              e.target.value,
                              null,
                              customroles.moduleName
                            );
                          }}
                        />
                        <label>no acess</label>
                        <input
                          name={customroles.moduleName + customIndex}
                          type="radio"
                          value="no"
                          defaultChecked={customroles.access === "no"}
                          onChange={(e) => {
                            customRolesChangeHandler(
                              e.target.value,
                              null,
                              customroles.moduleName
                            );
                          }}
                        />
                      </div>
                    </div>
                  );
                }
                return (
                  <>
                    <div className="parentchild">
                      <b>{customroles.moduleName}</b>
                      <br />
                      {submodule}
                    </div>
                  </>
                );
              })}
            {roleErrorStatus && <p className="error">This field is required</p>}
          </div>
        </div>
      </div>
    </>
  );
});

export default UpdateUserRoleManagement;
