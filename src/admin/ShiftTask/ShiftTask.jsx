import React, { forwardRef, useImperativeHandle, useState } from "react";
import { NavLink } from "react-router-dom";
import "../ShiftTask/ShiftTask.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { MdKeyboardArrowRight } from "react-icons/md";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";
import Moment from "react-moment";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import axios from "axios";
import { useEffect } from "react";
import DemoData from "./demo/DemoData";
import ShiftTasksTable from "./ShiftTasksTable";

const data = [
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

const ImagesRenderer = forwardRef((props, ref) => {
  const imageForMood = (images) =>
    `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`;

  const [images, setMood] = useState(imageForMood(props.value));

  useImperativeHandle(ref, () => {
    return {
      refresh(params) {
        setMood(imageForMood(params.value));
      },
    };
  });

  return (
    <span className="profle_img_box">
      <img alt="" className="profile_img_table" src={images} />
    </span>
  );
});

const ChildMessageRenderer = (props) => {
  const invokeParentMethod = () => {
    props.context.methodFromParent(
      `Row: ${props.node.rowIndex}, Col: ${props.colDef.field}`
    );
  };

  return (
    <span>
      <button
        onClick={invokeParentMethod}
        className="btn btn-sm btn_table btn-success"
      >
        Done
      </button>
      <NavLink className="table_arrow" to="/admin/dashboard">
        <MdKeyboardArrowRight />
      </NavLink>
    </span>
  );
};

function Shift() {
  let [plantype, setplantype] = useState("");
  setTimeout(() => {
    setplantype(JSON.parse(localStorage.getItem("userData")).SubscriptionPlan);
  }, 600);

  let style = {
    "pointer-events": "none",
    opacity: 0.6,
  };
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    getShiftsandtaskData();
  }, []);

  const getShiftsandtaskData = () => {
    let adminId = localStorage.getItem("adminId");
    axios({
      url: `${process.env.REACT_APP_BASEURL
        }/getShiftsandtask?careHomeId=${localStorage.getItem(
          "carehomeId"
        )}&adminId=${adminId}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let CareTeamData = res.data.shiftData;
        let arr = [];
        CareTeamData?.map((shiftItem, shiftIndex) => {
          shiftItem.shiftData.map((item, index) => {
            item.Task.map((task, taskIndex) => {
              const taskName = data.filter(
                (i) => i.Ctg === task.taskName?.trim()
              );
              arr.push({
                id: task._id,
                clientName: item.forClient,
                RiskProfile: "normal",
                TaskType: taskName[0]?.image,
                Task: task.taskType,
                careteamName: item.careTeamMember,
                notes: "notes",
                shiftPeriod: `${item.startingTime} - ${item.endingTime}`,
                timeDone: "9:00",
                status: 9,
              });
            });
          });
        });
        setRowData(arr);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const SrNoRenderer = (props) => {
    return (
      <span>
        <strong>{props.node.rowIndex + 1}</strong>
      </span>
    );
  };

  const NameRenderer = (props) => {
    return (
      <span className="profle_img_box">
        <strong>{props.data.clientName}</strong>
      </span>
    );
  };
  const CareTeamRenderer = (props) => {
    return (
      <span className="profle_img_box">
        <strong>{props.data.careteamName}</strong>
      </span>
    );
  };

  const TaskTypeRenderer = (props) => {
    return (
      <span className="">
        <img alt="" className="profile_img_table" src={props.data.TaskType} />
      </span>
    );
  };
  const RiskProfileRenderer = (props) => {
    return (
      <span className="">
        <img alt="" className="profile_img_table" src={props.data.TaskType} />
      </span>
    );
  };

  const pagination = true;
  const paginationPageSize = 10;
  const rowHeight = 55;
  const [value, onChange] = useState(new Date());
  const calendarStrings = {
    lastDay: "[Yesterday ]",
    sameDay: "[Today ]",
    nextDay: "[Tomorrow ]",
    lastWeek: "[last] dddd []",
    nextWeek: "dddd []",
    sameElse: "L",
  };

  let user = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          {user.role.map((roletype, index) => {
            const PayrollAccess = roletype.Modules[2].children[6];
            const ShiftTaskAccess = roletype.Modules[3].children[1];
            const SchedulerAccess = roletype.Modules[3].children[0];
            return (
              <div className="card">
                <div className="card-body">
                  <div className="top_menubar">
                    <ul
                      className="nav nav-tabs ract_tab_list border-0"
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="tabD-1"
                          data-bs-toggle="tab"
                          data-bs-target="#tab_1"
                          type="button"
                          role="tab"
                          aria-controls="tab_1"
                          aria-selected="true"
                        >
                          Task Status
                        </button>
                      </li>
                      {SchedulerAccess.access === "no" ? (
                        <li
                          className="nav-item"
                          role="presentation"
                          style={style}
                        >
                          <button
                            className="nav-link"
                            id="tabD-2"
                            data-bs-toggle="tab"
                            data-bs-target="#tab_2"
                            type="button"
                            role="tab"
                            aria-controls="tab_2"
                            aria-selected="false"
                          >
                            Schedule
                          </button>
                        </li>
                      ) : (
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="tabD-2"
                            data-bs-toggle="tab"
                            data-bs-target="#tab_2"
                            type="button"
                            role="tab"
                            aria-controls="tab_2"
                            aria-selected="false"
                          >
                            Schedule
                          </button>
                        </li>
                      )}

                      {plantype == "baseplan" ||
                        PayrollAccess.access == "no" &&
                        <li
                          className="nav-item"
                          role="presentation"
                          style={style}
                        >
                          <button
                            className="nav-link"
                            id="tabD-3"
                            data-bs-toggle="tab"
                            data-bs-target="#tab_3"
                            type="button"
                            role="tab"
                            aria-controls="tab_3"
                            aria-selected="false"
                          >
                            Payroll
                          </button>
                        </li>
                      }
                    </ul>
                  </div>

                  <div className="tab-content ract_tab_data" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="tab_1"
                      role="tabpanel"
                      aria-labelledby="tabD-1"
                    >
                      <div className="card-body">
                        <div style={{ display: "inline-flex" }}>
                          <h4 className="card-title">
                            <Moment calendar={calendarStrings}>{value}</Moment>
                          </h4>
                          <h5>
                            <DatePicker
                              className="clas1"
                              onChange={onChange}
                              clearAriaLabel="Clear value"
                              calendarAriaLabel="Toggle calendar"
                              value={value}
                              calendarIcon={null}
                              clearIcon={null}
                              closeCalendar={false}
                              dayAriaLabel="Day"
                              dayPlaceholder="dd"
                              format="dd-MM-yyyy"
                              isOpen={false}
                            />
                          </h5>
                        </div>
                        <div>
                          <div
                            className="ag-theme-alpine cts_datatable"
                            style={{ height: 550 }}
                          >
                            <ShiftTasksTable rows={rowData} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="tab_2"
                      role="tabpanel"
                      aria-labelledby="tabD-2"
                    >
                      <DemoData
                        SchedulerAccess={SchedulerAccess.access === "view"}
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="tab_3"
                      role="tabpanel"
                      aria-labelledby="tabD-3"
                    >
                    <DemoData
                      SchedulerAccess={PayrollAccess.access === "view"}
                    />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Shift;
