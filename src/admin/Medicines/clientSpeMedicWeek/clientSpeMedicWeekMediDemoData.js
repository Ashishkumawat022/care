import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Scheduler from "./clientSpeMedicWeekMedscheduler";

const ClientMedicinesWeekScheduleMediDemoData = (props) => {
  const [resources, setResources] = useState([])
  const [events, setEvents] = useState([])
  const [taskdata, setTaskdata] = useState([])
  const [show, setShow] = useState()
  const [medicCountStatus, setMedicshiftCountStatus] = useState({})
  const location = useLocation();
  // console.log(location.state, "ClientMedicinesWeekScheduleMediDemoData")
  useEffect(() => {
    if (location.state.referrer) {
      getMedicinesClientWise();
    }
  }, [])

  const getMedicinesClientWise = () => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/getMedicinesClientWise?careHomeId=${localStorage.getItem("carehomeId")}&clientId=${location.state.clientId}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        // console.log(res, "getMedicinesClientWise");
        let Assigned = [];
        const resources = [];
        const events = [];

        let medicshiftCountStatus = {
          assignedTotal: res.data.assignedTotal,
          medDataTotal: res.data.medDataTotal,
          noShift: res.data.notMatchedMedicinesTotal,
          omittedTotal: res.data.omittedTotal,
          overdueTotal: res.data.overdueTotal,
          prnTotal: res.data.prnTotal
        }

        res.data.assigned?.forEach((element, index) => {
          const shiftdata = element?.shiftData;
          const shiftTaskdata = element?.shiftData.Task;
          const id = element?.shiftData?.clientId[0]?._id;
          const name = `${element?.shiftData?.clientId[0]?.first_Name} ${element?.shiftData?.clientId[0]?.last_Name}`;
          const image = element?.shiftData?.clientId[0]?.image;
          const bgColor = '#898988'
          events.push({
            shiftId: element._id,
            ShiftData: element,
            editShiftId: element._id,
            evdata: element?.careTeamId ? element?.careTeamId : '',
            evImage: element?.careTeamId?.image ? element?.careTeamId?.image : '',
            id: element._id,
            start: `${shiftTaskdata.startDate.split('T')[0]} ${shiftTaskdata.schedule.split(' - ')[0]}`,
            taskList: shiftTaskdata,
            end: `${shiftTaskdata.startDate.split('T')[0]} ${shiftTaskdata.schedule.split(' - ')[1]}`,
            resourceId: id,
            title: element?.careTeamId ? element?.careTeamId : 'assigned',
            bgColor: bgColor,
          })
          resources.push({ id: id, name: `${name}`, image: image });
        })

        res.data?.notMatchedMedicines?.notMatched?.forEach((element, index) => {
          // const shiftdata = element?.shiftData;
          const reusedClientdata = res.data?.notMatchedMedicines?.clientDetail;
          const id = reusedClientdata?._id;
          const name = `${reusedClientdata?.first_Name} ${reusedClientdata?.last_Name}`;
          const image = reusedClientdata?.image;
          const bgColor = "#007fff"
          events.push({
            shiftId: element._id,
            ShiftData: element,
            editShiftId: element._id,
            evdata: name,
            evImage: image,
            id: element._id,
            start: `${element.startDate.split('T')[0]} ${element.schedule.split(' - ')[0]}`,
            taskList: element,
            end: `${element.startDate.split('T')[0]} ${element.schedule.split(' - ')[1]}`,
            resourceId: id,
            title: 'Unassigned',
            bgColor: bgColor,
          })
          resources.push({ id: id, name: `${name}`, image: image });
        })

        //   element.shiftData.forEach((item, index) => {
        //     if (item.templateType === "") {

        //       const id = item?.clientId?._id;
        //       const name = item.forClient;
        //       const image = item?.clientId?.image;

        //       let bgColor = '';
        //       if (item.recurringShiftType === "open") {
        //         bgColor = "purple";
        //       } else if (item.recurringShiftType === "unassigned") {
        //         bgColor = "#007fff";
        //       } else if (item.status == 'pending') {
        //         bgColor = '#898988'
        //       } else if (item.status == 'in-process') {
        //         bgColor = 'blue';
        //       } else if (item.status == "overdue") {
        //         bgColor = "red";
        //       } else if (item.status == "finished") {
        //         bgColor = "green";
        //       } else {
        //         bgColor = "#898988";
        //       }

        //       if (item.recurringShiftType === "assigned") {
        //         events.push({
        //           shiftId: element._id,
        //           ShiftData: item,
        //           editShiftId: element._id,
        //           evdata: item?.careTeamMember,
        //           evImage: item?.careTeamId?.image,
        //           id: item._id,
        //           start: `${item.Date} ${item.startingTime}`,
        //           taskList: item.Task,
        //           end: `${item.Date} ${item.endingTime}`,
        //           resourceId: id,
        //           title: item?.careTeamMember,
        //           bgColor: bgColor,
        //         });
        //       } else {
        //         events.push({
        //           shiftId: element._id,
        //           ShiftData: item,
        //           evdata: item.recurringShiftType,
        //           // evImage: item?.careTeamId?.image,
        //           id: item._id,
        //           start: `${item.Date} ${item.startingTime}`,
        //           taskList: item.Task,
        //           end: `${item.Date} ${item.endingTime}`,
        //           resourceId: id,
        //           title: item.recurringShiftType,
        //           bgColor: bgColor,
        //         });
        //       }
        //       resources.push({ id: id, name: `${name}`, image: image });
        //     }
        //   })
        // });


        // console.log(events, "events");
        // remove all duplicates from an (resources) array of objects
        const jsonObject = resources.map(JSON.stringify);
        const uniqueSet = new Set(jsonObject);
        const uniqueArray = Array.from(uniqueSet).map(JSON.parse);
        // console.log(uniqueArray, "resources");
        setResources(uniqueArray);
        setEvents(events);
        // setTaskdata(res.data.notMatchedMedicines)
        setMedicshiftCountStatus(medicshiftCountStatus)

        setTimeout(() => {
          setShow(true)
        }, 800);

      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  function clientSpecificMedicineWeekSchedule() {
    // console.log('clientSpecificMedicineWeekSchedule')
  }
  // console.log(resources, "resorces");
  // console.log(events, "events");

  return (<>
    {show && <Scheduler count={medicCountStatus} SchedulerAccess={props.SchedulerAccess} resources={resources} events={events} taskdata={taskdata} clientSpecificMedicineWeekSchedule={clientSpecificMedicineWeekSchedule} />}
  </>);
}
export default ClientMedicinesWeekScheduleMediDemoData;
