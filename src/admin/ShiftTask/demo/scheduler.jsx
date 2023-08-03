import React, { Component } from "react";
import Scheduler, { SchedulerData, ViewTypes } from "react-big-scheduler";
import WithDragDropContext from "./withDnDContext";
import "./demo.css";
import axios from "axios";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Button from "antd/lib/button";
import { NavLink } from "react-router-dom";
import "react-big-scheduler/lib/css/style.css";
import CreateShiftTask from "../CreateShiftTask";
// import EditSingleTask from "../EditSingleTask";
import EditCreateShiftTask from "../EditCreateShiftTask";
import FromTemplate from "../FromTemplate";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import GenericShiftcreation from "../GenericShiftcreation";
import ClientSideshift from "../ClientSideshift";

class Basic extends Component {
  constructor(props) {
    super(props);
    //let schedulerData = new SchedulerData(new moment("2017-12-18").format(DATE_FORMAT), ViewTypes.Week);
    let schedulerData = new SchedulerData(
      new Date(),
      ViewTypes.Week,
      false,
      false,
      {
        schedulerWidth: "75%",
        besidesWidth: 0,
        defaultEventBgColor: "#808080",
        resourceName: "Name",
        movable: true,
        creatable: true,
        crossResourceMove: false,
        eventItemPopoverEnabled: true,
        calendarPopoverEnabled: true,
        dayResourceTableWidth: "17%",
        eventItemHeight: 35,
        eventItemLineHeight: 40,
        schedulerMaxHeight: "80%",
        selectedAreaColor: "#808080",
        recurringEventsEnabled: true,
        headerEnabled: true,
        displayWeekend: true,
        nonWorkingTimeHeadColor: "grey",
        nonWorkingTimeHeadBgColor: "white",
        nonWorkingTimeBodyBgColor: "white",

        groupOnlySlotColor: "#808080.",
        startResizable: true,
        customCellWidth: 80,
        dayCellWidth: "12%",
        endResizable: true,
        weekCellWidth: "12%",
        views: [
          {
            viewName: "Day",
            viewType: ViewTypes.Day,
            showAgenda: false,
            isEventPerspective: false,
          },
          {
            viewName: "Week",
            viewType: ViewTypes.Week,
            showAgenda: false,
            isEventPerspective: false,
          },
        ],
      }
    );

    schedulerData.localeMoment.locale("en");
    schedulerData.setResources(props.resources);
    schedulerData.setEvents(props.events);

    // let EditShiftData = []
    this.state = {
      viewModel: schedulerData,
      shownShiftTaskUI: false,
      showEditShiftTaskUI: false,
      showGenericEditShiftTaskUI: false,
      showClientEditShiftTaskUI: false,
      formtemplate: false,
      isDisplayed: false,
      genericTem: false,
      clientSide: false,
      Arr: props.resources,
      EventsArr: props.events,
      isviewdisabled: props.SchedulerAccess,
      loader: true,
      plantype: JSON.parse(localStorage.getItem('userData')).SubscriptionPlan,
      EditShiftData: [],
      EditGenericShiftData: [],
      EditclientShiftData: [],
    };
  }

  toggleShowHide = (events, type) => {
    // if (type == "generic") {
    //   console.log("generic");
    //   this.setState((state) => ({
    //     isDisplayed: !state.isDisplayed,
    //     showGenericEditShiftTaskUI: !state.showGenericEditShiftTaskUI,
    //     EditGenericShiftData: events.resourceData.shiftData[0],
    //   }));
    // } else if (type == "client") {
    //   console.log("client");
    //   this.setState((state) => ({
    //     isDisplayed: !state.isDisplayed,
    //     showClientEditShiftTaskUI: !state.showClientEditShiftTaskUI,
    //     EditclientShiftData: events.resourceData.shiftData[0],
    //   }));
    // } else {
    //   console.log("Alllllll");
    //   this.setState((state) => ({
    //     isDisplayed: !state.isDisplayed,
    //     shownShiftTaskUI: !state.showEditShiftTaskUI,
    //     // EditShiftData: events.resourceData.shiftData[0]
    //   }));
    // }

  };


  toggle = () => {
    this.setState((state) => ({
      isDisplayed: !state.isDisplayed,
      shownShiftTaskUI: state.showEditShiftTaskUI,
      // EditShiftData: events.resourceData.shiftData[0]
    }))
  }

  hide = () => {
    this.setState((state) => ({
      isDisplayed: !state.isDisplayed,
      shownShiftTaskUI: state.showEditShiftTaskUI,
    }));
  };

  clear = () => {
    this.setState((state) => ({
      isDisplayed: !state.isDisplayed,
      shownShiftTaskUI: state.shownShiftTaskUI,
      formtemplate: !state.formtemplate,
    }));
  };

  close = () => {
    this.setState((state) => ({
      genericTem: !state.genericTem,
    }));
  };

  clientTem = () => {
    this.setState((state) => ({
      clientSide: !state.clientSide,
    }));
  };

  deleteShift(mainshiftId, shiftId, deleteType) {

    let data = JSON.stringify({
      mainshiftId: mainshiftId,
      shiftId: shiftId,
      type: deleteType,
    });

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/deleteshift`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // window.location.reload(false);
        // window.location.href = `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/admin/demo`;
        window.location.reload(false);
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  render() {
    const { viewModel } = this.state;
    return (
      <>
        <div className="card-body">
          <h4 className="card-title">
            <div className="float-end btns_head">
              {/* <button className="btn btn-theme btn-md" onClick={() => {
                      this.setState(prevState => ({
                        shownShiftTaskUI: !prevState.shownShiftTaskUI,
                      }));
                    }}>Create Shift</button> */}
              <div className="dropdown multiDrop">
                <button
                  disabled={this.state.isviewdisabled}
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  Create
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={() => {
                        this.setState((prevState) => ({
                          shownShiftTaskUI: !prevState.shownShiftTaskUI,
                        }));
                      }}
                    >
                      New Shift
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item">
                      New Template <FaAngleRight />
                    </a>
                    <ul className="dropdown-menu dropdown-submenu">
                      <li>
                        <a
                          style={{ cursor: "pointer" }}
                          className="dropdown-item"
                          onClick={() => {
                            this.setState((prevState) => ({
                              genericTem: !prevState.genericTem,
                            }));
                          }}
                        >
                          Generic Template
                        </a>
                      </li>
                      <li>
                        <a
                          style={{ cursor: "pointer" }}
                          className="dropdown-item"
                          onClick={() => {
                            this.setState((prevState) => ({
                              clientSide: !prevState.clientSide,
                            }));
                          }}
                        >
                          Client Specific Template
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a
                      style={{ cursor: "pointer" }}
                      className="dropdown-item"
                      onClick={() => {
                        this.setState((prevState) => ({
                          formtemplate: !prevState.formtemplate,
                        }));
                        document.body.classList.add("modal-scroll");
                      }}
                    >
                      From Template
                    </a>
                    {/* <a className="dropdown-item" href="#">From Template</a> */}
                  </li>
                </ul>
              </div>
            </div>
          </h4>
          {!this.state.shownShiftTaskUI &&
            !this.state.showEditShiftTaskUI &&
            !this.state.formtemplate && (
              <Scheduler
                schedulerData={viewModel}
                prevClick={this.prevClick}
                nextClick={this.nextClick}
                onSelectDate={this.onSelectDate}
                onViewChange={this.onViewChange}
                eventItemClick={this.eventClicked}
                // updateEventStart={this.updateEventStart}
                // updateEventEnd={this.updateEventEnd}
                moveEvent={this.moveEvent}
                newEvent={this.newEvent}
                onScrollLeft={this.onScrollLeft}
                onScrollRight={this.onScrollRight}
                toggleExpandFunc={this.toggleExpandFunc}
                eventItemPopoverTemplateResolver={
                  this.eventItemPopoverTemplateResolver
                }
                eventItemTemplateResolver={this.eventItemTemplateResolver}
                slotItemTemplateResolver={this.slotItemTemplateResolver}
                movingEvent={this.movingEvent}
              />
            )}

          {/* Create Shift POPup */}
          <div
            className="modal"
            style={{
              display: this.state.shownShiftTaskUI ? "block" : "none",
            }}
          >
            <div>
              <div className="bg_popup"></div>
              <div className="modal-dialog modal-xl">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Shift Creation
                    </h5>
                    <Link
                      className="btn-close"
                      onClick={() => {
                        this.setState((prevState) => ({
                          shownShiftTaskUI: !prevState.shownShiftTaskUI,
                        }));
                      }}
                      to="#"
                    ></Link>
                    {/* <button type="button" className="btn-close"></button> */}
                  </div>
                  <div className="modal-body">
                    {this.state.shownShiftTaskUI && (
                      <CreateShiftTask
                        shownShiftTaskUI={this.state.shownShiftTaskUI}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal m-5"
            style={{
              display: this.state.genericTem ? "block" : "none",
              width: "90%",
            }}
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
                    onClick={this.close}
                    to="/admin/demo"
                  ></button>
                </div>
                <div className="modal-body">
                  {this.state.genericTem && (
                    <GenericShiftcreation
                      genericTem={this.state.genericTem}
                      close={this.close}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal m-5"
            style={{
              display: this.state.clientSide ? "block" : "none",
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
                    onClick={this.clientTem}
                    to="/admin/demo"
                  ></button>
                </div>
                <div className="modal-body">
                  {this.state.clientSide && (
                    <ClientSideshift
                      clientSide={this.state.clientSide}
                      clientTem={this.clientTem}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* // FormTemplate */}
          <div
            className={`modal ${this.state.isDisplayed ? "" : ""}`}
            id="formTemplate"
            style={{
              display: `${this.state.formtemplate ? "block" : "none"}`,
            }}
          >
            <div className="bg_popup"></div>
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Form Template</h4>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      this.setState((prevState) => ({
                        formtemplate: !prevState.formtemplate,
                      }));
                      document.body.classList.remove("modal-scroll");
                    }}
                  ></button>
                </div>

                <div className="modal-body">
                  {" "}
                  {this.state.formtemplate && (
                    <FromTemplate
                      fromtemplatestatus={this.state.formtemplate}
                      onClick={this.toggleShowHide}
                      isDisplayed={this.state.isDisplayed}
                      hide={this.hide}
                      clear={this.clear}
                      toggle={this.toggle}
                      genericTem={this.state.genericTem}
                      close={this.close}
                      clientSide={this.state.clientSide}
                      clientTem={this.clientTem}
                    />
                  )}
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      this.setState((prevState) => ({
                        formtemplate: !prevState.formtemplate,
                      }));
                      document.body.classList.remove("modal-scroll");
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal"
            style={{
              display: this.state.showEditShiftTaskUI ? "block" : "none",
            }}
          >
            <div className="bg_popup"></div>
            <div className="modal-dialog-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Shift Updation
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => {
                      this.setState((prevState) => ({
                        showEditShiftTaskUI:
                          !prevState.showEditShiftTaskUI,
                      }));
                      window.location.reload(false);
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  {this.state.showEditShiftTaskUI && (
                    <EditCreateShiftTask
                      shownEditShiftTaskUI={
                        this.state.showEditShiftTaskUI
                      }
                      titleName="Shift Creation"
                      buttonType="editShift"
                      addCreateShift="editshift"
                      typeshift=""
                      editTaskData={this.state.EditShiftData}
                      data={this.state}
                    />
                  )}

                  {this.state.showClientEditShiftTaskUI && (
                    <EditCreateShiftTask
                      shownEditShiftTaskUI={
                        this.state.showEditShiftTaskUI
                      }
                      editTaskData={this.state.EditclientShiftData}
                      data={this.state}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <ul className="statusBox text-center">
            <li>
              <span style={{ background: "red" }}></span>
              Overdue
            </li>
            <li>
              <span style={{ background: "blue" }}></span>
              In-process
            </li>
            <li>
              <span style={{ background: "grey" }}></span>
              Assigned
            </li>
            <li>
              <span style={{ background: "green" }}></span>
              Finished
            </li>
            <li>
              <span style={{ background: "purple" }}></span>
              Open
            </li>
            <li>
              <span style={{ background: "#007fff" }}></span>
              Unassigned
            </li>
          </ul>
        </div>
      </>
    );
  }

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {

    let date = start.split(" ")[0];

    schedulerData.moveEvent(event, slotId, slotName, start, end);
    this.setState({
      viewModel: schedulerData,
    });

    var shiftType = [];
    var startTime = [];
    var endTime = [];
    var taskName = [];
    var taskType = [];
    event.ShiftData.Task.forEach((items, index) => {
      shiftType.push(items.shiftType);
      startTime.push(items.startTime);
      endTime.push(items.endTime);
      taskName.push(items.taskName);
      taskType.push(items.taskType);
    });

    if (shiftType.length > 1) {
      var type = "array";
    } else {
      var type = "string";
    }

    var data = new FormData();
    data.append("careHomeId", event.ShiftData.careHomeId);
    data.append("careTeamId", event.ShiftData.careTeamId._id);
    data.append("shiftId", event.ShiftData._id);
    data.append("clientId", event.ShiftData.clientId._id);
    data.append(
      "forClient",
      event.ShiftData.forClient
        .split(" ")
        .filter((s) => s)
        .join(" ")
    );
    data.append(
      "careTeamMember",
      event.ShiftData.careTeamMember
        .split(" ")
        .filter((s) => s)
        .join(" ")
    );
    data.append("Date", date);
    data.append("startingTime", event.ShiftData.startingTime);
    data.append("endingTime", event.ShiftData.endingTime);
    data.append("recurringTask", event.ShiftData.recurringTask);
    data.append("recurringTasktype", event.ShiftData.recurringTasktype);
    data.append("instruction", event.ShiftData.instruction);
    data.append("recurringShiftType", event.ShiftData.recurringShiftType);
    data.append(
      "attachments",
      event.ShiftData.image ? event.ShiftData.image : ""
    );
    data.append("type", type);
    data.append("endDate", event.ShiftData.endDate);
    data.append("shift_type", shiftType);
    data.append("start_time", startTime);
    data.append("end_time", endTime);
    data.append("task_name", taskName);
    data.append("task_type", taskType);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/editShift`,
      headers: {
        Authorization: localStorage.getItem("token"),
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

  movingEvent = (
    schedulerData,
    slotId,
    slotName,
    newStart,
    newEnd,
    action,
    type,
    item
  ) => {
    // console.log('moving event', schedulerData, slotId, slotName, newStart, newEnd, action, type, item);
  };

  eventItemPopoverTemplateResolver = (
    schedulerData,
    eventItem,
    title,
    start,
    end,
    statusColor
  ) => {
    return (
      <div style={{ width: "350px", height: "250px" }}>
        <Row type="flex" align="middle">
          <Col span={2}>
            <div
              className="status-dot"
              style={{ backgroundColor: statusColor }}
            />
          </Col>
          <Col span={22} className="overflow-text">
            <img
              style={{
                borderRadius: "50%",
                width: "34px",
                height: "34px",
                marginRight: "5px",
              }}
              src={eventItem?.evImage}
            />
            <span className="header2-text" title={eventItem?.evdata}>
              {eventItem?.evdata}
            </span>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={2}>
            <div />
          </Col>
          <Col span={22} md={45}>
            <span className="header1-text">
              {start.format("HH:mm")} - {end.format("HH:mm")}
            </span>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={2}>
            <div />
          </Col>
          <Col span={55}>
            <span style={{ color: "red" }}>TaskList: </span>
            <ul>
              {eventItem?.taskList.map((item, index) => {
                if ('medName' in item) {
                  return <li key={index} style={{ textDecoration: "none" }}>
                    Medication Reminder (
                    {item.schedule}
                    )
                  </li>
                }
                return (
                  <li key={index} style={{ textDecoration: "none" }}>
                    {item.taskType} (
                    {item.shiftType === "within time"
                      ? start.format("HH:mm")
                      : item.startTime}{" "}
                    -{" "}
                    {item.shiftType === "within time"
                      ? end.format("HH:mm")
                      : item.endTime}
                    )
                  </li>
                );
              })}
            </ul>
          </Col>
        </Row>
        <Row type="flex" align="middle">


          <div>
            <Button
              className="mx-3 btn btn-primary"
              onClick={() => {
                this.EditButtonClicked(eventItem);
              }}
            >
              Edit
            </Button>
          </div>
          <div className="dropdown multiDrop">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Delete
            </button>
            <ul className="dropdown-menu">
              <li>
                <a
                  style={{ cursor: "pointer" }}
                  className="dropdown-item"
                  onClick={() => {
                    this.deleteShift(eventItem.shiftId, eventItem.id, "");
                  }}
                >
                  Delete this shift
                </a>
                {/* <a className="dropdown-item" href="#">From Template</a> */}
              </li>
              <li>
                <a
                  className="dropdown-item"
                  onClick={() => {
                    this.deleteShift(
                      eventItem.shiftId,
                      eventItem.shiftId,
                      "mainshift"
                    );
                  }}
                >
                  Delete All associated recurring shift
                </a>
              </li>
            </ul>
          </div>
          {/* <Button
              className="btn btn-primary"
              onClick={() => {
                this.deleteShift(eventItem.id);
              }}
            >
              Delete
            </Button> */}

        </Row>
      </div>
    );
  };

  EditButtonClicked = (event) => {
    this.setState((prevState) => ({
      showEditShiftTaskUI: !prevState.showEditShiftTaskUI,
      // EditTaskData: prevState.EventsArr.filter(task => task.id === event.id),
      EditShiftData: event,
    }));
  };

  deleteButtonClicked = (event) => {
    this.setState(
      (prevState) => {
        return prevState.viewModel.events.filter(
          (index) => index.id !== event.id
        );
      },
      () => this.state.viewModel
    );
    this.deleteShift(event.id);
  };

  slotItemTemplateResolver(
    schedulerData,
    slot,
    slotClickedFunc,
    width,
    clsName
  ) {
    let resourceData = schedulerData.getSlotById(slot.slotId);
    return (
      <span className="text-left">
        <img className="profile_img_table" src={`${resourceData?.image}`} />{" "}
        <span>{slot.slotName}</span>
      </span>
    );
  }

  prevClick = (schedulerData) => {
    schedulerData.prev();
    schedulerData.setEvents(this.state.EventsArr);
    this.setState({
      viewModel: schedulerData,
    });
  };

  nextClick = (schedulerData) => {
    schedulerData.next();
    schedulerData.setEvents(this.state.EventsArr);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onViewChange = (schedulerData, view) => {
    schedulerData.setViewType(
      view.viewType,
      view.showAgenda,
      view.isEventPerspective
    );
    schedulerData.setEvents(this.state.EventsArr);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onSelectDate = (schedulerData, date) => {
    schedulerData.setDate(date);
    schedulerData.setEvents(this.state.EventsArr);
    this.setState({
      viewModel: schedulerData,
    });
  };

  eventClicked = (schedulerData, event) => {
    // console.log("eventClicked==>>", this.state.showEditShiftTaskUI)
    schedulerData.setEvents(this.state.EventsArr);
    this.setState({
      viewModel: schedulerData,
    });
  };

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    this.setState({
      shownShiftTaskUI: !this.state.shownShiftTaskUI,
    });
  };

  updateEventStart = (schedulerData, event, newStart) => {
    schedulerData.updateEventStart(event, newStart);
    this.setState({
      viewModel: schedulerData,
    });
  };

  updateEventEnd = (schedulerData, event, newEnd) => {
    schedulerData.updateEventEnd(event, newEnd);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onScrollRight = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.next();
      schedulerData.setEvents(this.state.EventsArr);
      this.setState({
        viewModel: schedulerData,
      });
      schedulerContent.scrollLeft = maxScrollLeft - 10;
    }
  };

  onScrollLeft = (schedulerData, schedulerContent, maxScrollLeft) => {
    if (schedulerData.ViewTypes === ViewTypes.Day) {
      schedulerData.prev();
      schedulerData.setEvents(this.state.EventsArr);
      this.setState({
        viewModel: schedulerData,
      });
      schedulerContent.scrollLeft = 10;
    }
  };

  toggleExpandFunc = (schedulerData, slotId) => {
    schedulerData.toggleExpandStatus(slotId);
    this.setState({ viewModel: schedulerData });
  };
}

export default WithDragDropContext(Basic);
