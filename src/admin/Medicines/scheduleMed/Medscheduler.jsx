import React, { Component, Fragment } from "react";
import Scheduler, { SchedulerData, ViewTypes } from "react-big-scheduler";
import WithDragDropContext from "./withDnDContext";
import "./scheduleMed.css";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import Button from "antd/lib/button";
import { Redirect } from 'react-router'
import "react-big-scheduler/lib/css/style.css";

class Basic extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props, "propspropsprops")
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
    schedulerData.setResources(props?.resources);
    schedulerData.setEvents(props?.events);
    // console.log(props.events, "props.events")

    // let EditShiftData = []
    this.state = {
      viewModel: schedulerData,
      shownShiftTaskUI: false,
      showEditShiftTaskUI: false,
      showGenericEditShiftTaskUI: false,
      showClientEditShiftTaskUI: false,
      formtemplate: false,
      isDisplayed: false,
      redirect: false,
      clientId: '',
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
    // console.log( schedulerData, this.state.EventsArr, "this.props.taskdata");
  }

  toggleShowHide = (events, type) => {
    // console.log(events.resourceData.shiftData[0], "toggleShowHide");
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
    // console.log(JSON.stringify(shiftId));

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
        // console.log(response);
        window.location.reload(false);
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  render() {
    const { viewModel, redirect, clientId } = this.state;

    if (redirect) {
      return <Redirect to={{
        pathname: "/admin/clientweekschedule",
        state: { referrer: true, clientId: clientId }
      }} />;
    }
    return (
      <Fragment>
        <div className="card-body">
          <Row className="align-items-center">
            <Col lg={8}>
              <Row>
                <Col className="sechudleCard" style={{ color: '#000' }}>
                  <p>Total</p>
                  <h5>{this.props.count.assignedTotal + this.props.count.noShift + this.props.count.omittedTotal + this.props.count.overdueTotal + this.props.count.prnTotal}</h5>
                </Col>
                <Col className="sechudleCard" style={{ color: '#F2994A' }}>
                  <p>No Shift</p>
                  <h5>{this.props.count.noShift}</h5>
                </Col>
                <Col className="sechudleCard" style={{ color: '#828282' }}>
                  <p>Assigned</p>
                  <h5>{this.props.count.assignedTotal}</h5>
                </Col>
                <Col className="sechudleCard" style={{ color: '#27AE60' }}>
                  <p>Omitted</p>
                  <h5>{this.props.count.omittedTotal}</h5>
                </Col>
                <Col className="sechudleCard" style={{ color: '#EB5757' }}>
                  <p>Overdue</p>
                  <h5>{this.props.count.overdueTotal}</h5>
                </Col>
                <Col lg={3} className="sechudleCard" style={{ color: '#2FBBE9' }}>
                  <p>PRNs Administered</p>
                  <h5>{this.props.count.prnTotal}</h5>
                </Col>
              </Row>
            </Col>

            <Col lg={4}>
              <Row className="completedcount" style={{ border: '1px solid #219653' }}>
                <Col className="sechudleCard" style={{ color: '#219653' }}>
                  <p>Completed</p>
                  <h5>03</h5>
                </Col>
                <Col className="sechudleCard" style={{ color: '#219653' }}>
                  <p>Self </p>
                  <h5>01</h5>
                </Col>
                <Col className="sechudleCard" style={{ color: '#219653' }}>
                  <p>Assisted</p>
                  <h5>02</h5>
                </Col>
              </Row>
            </Col>
          </Row>
          {(
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
        </div>
      </Fragment>
    );
  }

  moveEvent = (schedulerData, event, slotId, slotName, start, end) => {
    // console.log("moving event", event, slotName, slotId, start, start.split(" ")[0], end);
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

    // console.log(
    //   shiftType,
    //   event.ShiftData.Task,
    //   this.state.viewModel,
    //   startTime,
    //   endTime,
    //   taskName,
    //   taskType
    // );
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
        // console.log(response.data, "editshift")
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  eventItemPopoverTemplateResolver = (
    schedulerData,
    eventItem,
    title,
    start,
    end,
    statusColor
  ) => {
    // console.log(
    //   eventItem,
    //   start,
    //   eventItem.id,
    //   "eventItemPopoverTemplateResolver"
    // );
    console.log("eventClicked==>>eventItemPopoverTemplateResolver")
    return (
      <div style={{ width: "350px", height: "350px" }}>
        <Row type="flex" align="middle">
          <Col span={2}>
            <div
              className="status-dot"
              style={{ backgroundColor: '#898988' }}
            />
          </Col>
          <Col span={22} className="overflow-text">
            {/* <img
              style={{
                borderRadius: "50%",
                width: "34px",
                height: "34px",
                marginRight: "5px",
              }}
              src={eventItem?.evImage}
            /> */}
            <span className="header2-text" title="kjsdlk">
              {eventItem.taskList.medName}
            </span>
          </Col>
        </Row>
        <Row type="flex" align="middle">
          <Col span={100} style={{ 'line-height': '15px' }}>
            <p>Dose Amount: {eventItem.taskList.doseAmount}</p>
            <p>Course of duration: {eventItem.taskList.durationofCourse}</p>
            <p>Frequency: {eventItem.taskList.frequency}</p>
            <p>Medicine Type: {eventItem.taskList.medType}</p>
            <p>Prescriber: {eventItem.taskList.prescriber}</p>
            <p>Strength Dose: {eventItem.taskList.strengthDose}</p>
            <p>Strength Unit: {eventItem.taskList.strengthUnit}</p>
            <p>Units: {eventItem.taskList.units}</p>
            <p>Schedule: {eventItem.taskList.schedule}</p>
          </Col>
        </Row>
        <Row type="flex" align="middle">
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
                    // this.deleteShift(eventItem?.shiftId, eventItem?.id, "");
                  }}
                >
                  Delete this shift
                </a>
                {/* <a className="dropdown-item" href="#">From Template</a> */}
              </li>
              <li>
                <a
                  className="dropdown-item"
                // onClick={() => {
                //   this.deleteShift(
                //     eventItem.shiftId,
                //     eventItem.shiftId,
                //     "mainshift"
                //   );
                // }}
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
    // console.log(event, "delete");
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
    console.log("eventClicked==>>prevClick")
    return (
      <span className="text-left">
        <img className="profile_img_table" src={`${resourceData?.image}`} />{" "}
        <span>{slot.slotName}</span>
      </span>
    );
  }

  prevClick = (schedulerData) => {
    console.log("eventClicked==>>prevClick")

    schedulerData.prev();
    schedulerData.setEvents(this.state.EventsArr);
    this.setState({
      viewModel: schedulerData,
    });
  };

  nextClick = (schedulerData) => {
    console.log("eventClicked==>>nextClick")

    schedulerData.next();
    schedulerData.setEvents(this.state.EventsArr);
    this.setState({
      viewModel: schedulerData,
    });
  };

  onViewChange = (schedulerData, view) => {
    console.log("eventClicked==>>onViewChange")
    // console.log(view.viewType, schedulerData, "onViewChange");
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
    console.log("eventClicked==>>onSelectDate")

    schedulerData.setDate(date);
    schedulerData.setEvents(this.state.EventsArr);
    this.setState({
      viewModel: schedulerData,
    });
  };

  eventClicked = (schedulerData, event) => {
    console.log("eventClicked==>>eventClicked")
    schedulerData.setEvents(this.state.EventsArr);
    this.setState({
      viewModel: schedulerData,
    });
  };

  newEvent = (schedulerData, slotId, slotName, start, end, type, item) => {
    // console.log(schedulerData, slotId, slotName, start, end, type, item, "eventClicked==>>newEvent")
    this.setState({ redirect: true, clientId: slotId })

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
    console.log("eventClicked==>>toggleExpandFunc")

    schedulerData.toggleExpandStatus(slotId);
    this.setState({ viewModel: schedulerData });
  };
}

export default WithDragDropContext(Basic);
