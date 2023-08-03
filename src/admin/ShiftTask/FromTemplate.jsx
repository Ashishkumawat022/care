import React, {
  useEffect,
  useState,
} from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { MdModeEditOutline } from "react-icons/md";
import { AiFillDelete, AiOutlineDoubleRight } from "react-icons/ai";
import CreateShiftTask from "./CreateShiftTask";
import { Link } from "react-router-dom";
import EditCreateShiftTask from "./EditCreateShiftTask";
import GenericShiftcreation from "./GenericShiftcreation";
import ClientSideshift from "./ClientSideshift";

function FromTemplate({
  onClick,
  isDisplayed,
  hide,
  clear,
  toggle,
  close,
  genericTem,
  clientSide,
  clientTem
}) {
  const [searchedVal, setSearchedVal] = useState("");
  const [showModal, setShowModal] = useState(false);
  const hidden = () => {
    setShowModal(!showModal);
  };
  const [genericData, setGenericData] = useState({
    resources: [],
    events: [],
    taskdata: [],
    show: false,
  });
  const [clientSpecificData, setclientSpecificData] = useState({
    resources: [],
    events: [],
    taskdata: [],
    // show: false,
  });

  useEffect(() => {
    getClientShiftData();
    getGenericShiftData();
  }, []);

  function getClientShiftData() {
    axios({
      url: `${process.env.REACT_APP_BASEURL
        }/getShiftsandtask?careHomeId=${localStorage.getItem(
          "carehomeId"
        )}&type=client`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let CareTeamData = res.data.shiftData;
        console.log(CareTeamData, "title?.taskType");
        const resources = [];
        const events = [];
        CareTeamData?.forEach((element) => {
          element.shiftData.forEach((item, index) => {
            const id = item?.clientId?._id;
            const name = item.forClient;
            const image = item?.clientId?.image;

            let bgColor = "";
            if (item.status == "pending") {
              bgColor = "#898988";
            } else if (item.status == "in-process") {
              bgColor = "blue";
            } else if (item.status == "open") {
              bgColor = "purple";
            } else if (item.status == "un-assigned") {
              bgColor = "cyan";
            } else if (item.status == "overdue") {
              bgColor = "red";
            } else if (item.status == "finished") {
              bgColor = "green";
            } else {
              bgColor = "#898988";
            }

            if (item.recurringTask) {
              events.push({
                ShiftData: item,
                // evdata: item.careTeamMember,
                // evImage: item?.careTeamId?.image,
                id: item._id,
                shiftId: element._id,
                start: `${item.Date} ${item.startingTime}`,
                taskList: item.Task,
                editShiftId: element._id,
                end: `${item.Date} ${item.endingTime}`,
                resourceId: id,
                title: item.status,
                bgColor: bgColor,
              });
            } else {
              events.push({
                ShiftData: item,
                // evdata: item.careTeamMember,
                // evImage: item?.careTeamId?.image,
                id: item._id,
                shiftId: element._id,
                editShiftId: element._id,
                start: `${item.Date} ${item.startingTime}`,
                taskList: item.Task,
                end: `${item.Date} ${item.endingTime}`,
                resourceId: id,
                title: item.status,
                bgColor: bgColor,
              });
            }

            resources.push({
              id: id,
              name: `${name}`,
              image: image,
              shiftName: item.shiftName,
              resourceData: element,
            });
          });
        });

        // remove all duplicates from an (resources) array of objects
        const jsonObject = resources.map(JSON.stringify);
        console.log(jsonObject);
        const uniqueSet = new Set(jsonObject);
        const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
        console.log(uniqueArray, "uniqueArray");

        setclientSpecificData({
          resources: uniqueArray,
          events: events,
          taskdata: CareTeamData,
        });
      })
      .catch((error) => console.log(`Error: ${error}`));
  }

  function getGenericShiftData() {
    axios({
      url: `${process.env.REACT_APP_BASEURL
        }/getShiftsandtask?careHomeId=${localStorage.getItem(
          "carehomeId"
        )}&type=generic`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let CareTeamData = res.data.shiftData;
        console.log(CareTeamData, "title?.taskType");
        const resources = [];
        const events = [];
        CareTeamData?.forEach((element, index) => {
          element.shiftData.forEach((item, index) => {

            let bgColor = "";
            if (item.status == "pending") {
              bgColor = "#898988";
            } else if (item.status == "in-process") {
              bgColor = "blue";
            } else if (item.status == "open") {
              bgColor = "purple";
            } else if (item.status == "un-assigned") {
              bgColor = "cyan";
            } else if (item.status == "overdue") {
              bgColor = "red";
            } else if (item.status == "finished") {
              bgColor = "green";
            } else {
              bgColor = "#898988";
            }

            if (item.recurringTask) {
              events.push({
                ShiftData: item,
                shiftId: element._id,
                id: item._id,
                start: `${item.Date} ${item.startingTime}`,
                taskList: item.Task,
                end: `${item.Date} ${item.endingTime}`,
                // resourceId: id,
                title: item.status,
                bgColor: bgColor,
              });
            } else {
              events.push({
                ShiftData: item,
                shiftId: element._id,
                // evdata: item.careTeamMember,
                // evImage: item?.careTeamId?.image,
                id: item._id,
                start: `${item.Date} ${item.startingTime}`,
                taskList: item.Task,
                end: `${item.Date} ${item.endingTime}`,
                // resourceId: id,
                title: item.status,
                bgColor: bgColor,
              });
            }
            resources.push({
              id: element._id,
              shiftName: item.shiftName,
              resourceData: element,
            });
          });
        });

        // remove all duplicates from an (resources) array of objects
        const jsonObject = resources.map(JSON.stringify);
        console.log(jsonObject);
        const uniqueSet = new Set(jsonObject);
        const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
        console.log(uniqueArray, "uniqueArray");
        setGenericData({
          resources: uniqueArray,
          events: events,
          taskdata: CareTeamData,
        });
      })
      .catch((error) => console.log(`Error: ${error}`));
  }

  // console.log(genericData.resources, "genericData.resources");
  // console.log(genericData.events, "genericData.events");
  const [templatedata, settemplatedata] = useState();
  const [templateType, settemplateType] = useState();
  const [buttonType, setButtonType] = useState();
  const [titleName, settitleName] = useState();
  const [editShiftId, seteditShiftId] = useState();
  const datapassing = (data, type, buttonType, titleName) => {
    // console.log(data.resourceData, "templatedata");
    settitleName(titleName);
    setButtonType(buttonType);
    settemplatedata(data.resourceData.shiftData[0]);
    seteditShiftId(data.resourceData._id);
    settemplateType(type);


  };

  const deleteGenericOrSpecificClientTemplate = (mainshiftId, shiftId, deleteType, type) => {
    console.log(mainshiftId, shiftId, deleteType, "deleteGenericOrSpecificClientTemplate")
    let data = JSON.stringify({
      mainshiftId: mainshiftId,
      shiftId: shiftId,
      type: deleteType,
    });

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deleteshift`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        if (type === 'generic') {
          getGenericShiftData();
        } else {
          getClientShiftData();
        }
        // window.location.reload(false);
        // window.location.href = `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/admin/demo`;
        // window.location.reload(false);
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  return (
    <>
      <div className="">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h4>Generic Template</h4>
                <a className="btn add_task mt-3 mb-3" onClick={close}>
                  Add Template
                </a>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sr. no</th>
                      <th>Shift Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {genericData.resources.map((gdata, gindex) => {
                      console.log(gdata, "genericData");
                      return (
                        <tr key={gdata.id}>
                          <td>{gindex + 1}</td>
                          <td>{gdata.shiftName}</td>
                          <td>
                            <div className="actionTable">
                              <div className="edit">
                                <a
                                  onClick={() => (
                                    datapassing(
                                      gdata,
                                      "generic",
                                      "editGenericTemplate",
                                      "Generic Template"
                                    ),
                                    toggle()
                                  )}
                                >
                                  <MdModeEditOutline />
                                </a>
                              </div>

                              <div className="delete" onClick={() => { deleteGenericOrSpecificClientTemplate(gdata.id, gdata.id, 'mainshift', 'generic') }}>
                                <AiFillDelete />
                              </div>
                              <div className="delete">
                                <a
                                  onClick={() => (
                                    datapassing(
                                      gdata,
                                      "generic",
                                      "",
                                      "Shift Creation"
                                    ),
                                    toggle()
                                  )}
                                >
                                  <AiOutlineDoubleRight />
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div
            className={`modal modalHide2 ${isDisplayed ? "modalShow2" : ""}`}
          >
            <div>
              <div className="bg_popup"></div>
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <Link onClick={isDisplayed ? hide : hidden} to="/admin/demo">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-arrow-left-circle"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                        />
                      </svg>
                    </Link>
                    <h5
                      className="modal-title"
                      id="exampleModalLabel"
                      style={{ marginLeft: "10px" }}
                    >
                      {titleName}
                    </h5>
                    <Link
                      className="btn-close"
                      onClick={clear}
                      to="/admin/demo"
                    ></Link>
                  </div>
                  <div className="modal-body">
                    {isDisplayed && templateType == "generic" && (
                      <EditCreateShiftTask
                        editTaskData={templatedata}
                        typeshift="generic"
                        buttonType={buttonType}
                        addCreateShift="postShift"
                        titleName={titleName}
                        editShiftId={editShiftId}
                      />
                    )}
                    {templateType == "client" && (
                      <EditCreateShiftTask
                        shownEditShiftTaskUI={true}
                        editTaskData={templatedata}
                        typeshift="client"
                        addCreateShift="postShift"
                        buttonType={buttonType}
                        titleName={titleName}
                        editShiftId={editShiftId}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h4>Client Specific Template</h4>
                <div className="row">
                  <div className="col-md-4">
                    <a className="btn add_task mt-3 mb-3" onClick={clientTem}>
                      Add Template
                    </a>
                  </div>
                  <div className="col-md-8">
                    <div className="input-group mt-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-addon2"
                        style={{ height: "37px" }}
                        onChange={(e) => setSearchedVal(e.target.value)}
                      />
                      <span
                        className="input-group-text"
                        id="basic-addon2"
                        style={{
                          backgroundColor: "#9E61E7",
                          color: "white",
                        }}
                      >
                        <i className="fa fa-search"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sr. no</th>
                      <th>Client Name</th>
                      <th>Shift Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientSpecificData.resources
                      .slice()
                      .filter(
                        (row) =>
                          // note that I've incorporated the searchedVal length check here
                          !searchedVal.length ||
                          row.name
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase())
                      )
                      .map((cdata, cindex) => {
                        console.log(cdata, "clientdata")
                        return (
                          <tr key={cdata.id}>
                            <td>{cindex + 1}</td>
                            <td>
                              <img
                                src={cdata.image}
                                style={{
                                  borderRadius: "50%",
                                  width: "30px",
                                  height: "30px",
                                }}
                                alt="client_image"
                              />
                              {cdata.name}
                            </td>
                            <td>{cdata.shiftName}</td>
                            <td>
                              <div className="actionTable">
                                <div className="edit">
                                  <a
                                    onClick={() => (
                                      datapassing(
                                        cdata,
                                        "client",
                                        "editClientTemplate",
                                        "Client Specific Template"
                                      ),
                                      toggle()
                                    )}
                                  >
                                    <MdModeEditOutline />
                                  </a>
                                </div>
                                <div className="delete" onClick={() => { deleteGenericOrSpecificClientTemplate(cdata?.resourceData._id, cdata?.resourceData._id, 'mainshift', "client") }}>
                                  <AiFillDelete />
                                </div>
                                <div className="delete">
                                  <a
                                    onClick={() => (
                                      datapassing(
                                        cdata,
                                        "client",
                                        "",
                                        "Shift Creation"
                                      ),
                                      toggle()
                                    )}
                                  >
                                    <AiOutlineDoubleRight />
                                  </a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal m-5"
        style={{ display: genericTem ? "block" : "none", width: "90%" }}
      >
        <div className="bg_popup"></div>
        <div className="modal-dialog-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Generic Template Creation
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={close}
                to="/admin/demo"
              ></button>
            </div>
            <div className="modal-body">
              {genericTem && (
                <GenericShiftcreation genericTem={genericTem} close={close} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal m-5"
        style={{
          display: clientSide ? "block" : "none",
          width: "92%",
          height: "92%",
        }}
      >
        <div className="bg_popup"></div>
        <div className="modal-dialog-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Client Template Creation
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={clientTem}
                to="/admin/demo"
              ></button>
            </div>
            <div className="modal-body">
              {clientSide && (
                <ClientSideshift
                  clientSide={clientSide}
                  clientTem={clientTem}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FromTemplate;
