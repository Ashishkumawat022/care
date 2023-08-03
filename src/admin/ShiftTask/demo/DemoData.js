import axios from "axios";
import React, { useEffect, useState } from "react";
import Scheduler from "./scheduler";

const DemoData = (props) => {
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  const [taskdata, setTaskdata] = useState([]);
  const [show, setShow] = useState();

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
        const resources = [];
        const events = [];
        CareTeamData?.forEach((element, index) => {
          element.shiftData.forEach((item, index) => {
            if (item.templateType === "") {
              const id = item?.clientId?._id;
              const name = item.forClient;
              const image = item?.clientId?.image;

              let bgColor = "";
              if (item.recurringShiftType === "open") {
                bgColor = "purple";
              } else if (item.recurringShiftType === "unassigned") {
                bgColor = "#007fff";
              } else if (item.status == "pending") {
                bgColor = "#898988";
              } else if (item.status == "in-process") {
                bgColor = "blue";
              } else if (item.status == "overdue") {
                bgColor = "red";
              } else if (item.status == "finished") {
                bgColor = "green";
              } else {
                bgColor = "#898988";
              }

              if (item.recurringShiftType === "assigned") {
                events.push({
                  shiftId: element._id,
                  ShiftData: item,
                  editShiftId: element._id,
                  evdata: item?.careTeamMember,
                  evImage: item?.careTeamId?.image,
                  id: item._id,
                  start: `${item.Date} ${item.startingTime}`,
                  taskList: item.Task,
                  end: `${item.Date} ${item.endingTime}`,
                  resourceId: id,
                  title: item?.careTeamMember,
                  bgColor: bgColor,
                });
              } else {
                events.push({
                  shiftId: element._id,
                  ShiftData: item,
                  evdata: item.recurringShiftType,
                  // evImage: item?.careTeamId?.image,
                  id: item._id,
                  start: `${item.Date} ${item.startingTime}`,
                  taskList: item.Task,
                  end: `${item.Date} ${item.endingTime}`,
                  resourceId: id,
                  title: item.recurringShiftType,
                  bgColor: bgColor,
                });
              }
              resources.push({ id: id, name: `${name}`, image: image });
            }
          });
        });
        // remove all duplicates from an (resources) array of objects
        const jsonObject = resources.map(JSON.stringify);
        const uniqueSet = new Set(jsonObject);
        const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
        setResources(uniqueArray);
        setEvents(events);
        setTaskdata(CareTeamData);

        setTimeout(() => {
          setShow(true);
        }, 800);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  return (
    <>
      {show && (
        <Scheduler
          SchedulerAccess={props.SchedulerAccess}
          resources={resources}
          events={events}
          taskdata={taskdata}
        />
      )}
    </>
  );
};
export default DemoData;
