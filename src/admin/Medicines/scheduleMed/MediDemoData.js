import axios from "axios";
import React, { useEffect, useState } from "react";
import Scheduler from "./Medscheduler";

const MediDemoData = (props) => {
  const [resources, setResources] = useState([])
  const [events, setEvents] = useState([])
  const [show, setShow] = useState()
  const [taskdata, setTaskdata] = useState([])
  const [medicCountStatus, setMedicshiftCountStatus] = useState({})


  useEffect(() => {
    getMedicinesCarehomeWise();
  }, [])

  const getMedicinesCarehomeWise = () => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/getMedicinesCarehomeWise?careHomeId=${localStorage.getItem("carehomeId")}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let Assigned = [];
        const resources = [];
        const events = [];


        let medicshiftCountStatus = {
          assignedTotal: res.data.data.assignedTotal,
          medDataTotal: res.data.data.medDataTotal,
          noShift: res.data.data.notMatchedMedicinesLength,
          omittedTotal: res.data.data.omittedTotal,
          overdueTotal: res.data.data.overdueTotal,
          prnTotal: res.data.data.prnTotal
        }

        res.data.data.assigned?.forEach((element, index) => {
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
        res.data.data?.omitted?.forEach((element, index) => {
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
        res.data.data?.overdue?.forEach((element, index) => {
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
        res.data.data?.prn?.forEach((element, index) => {
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

        res.data.data.notMatchedMedicines?.forEach((element, index) => {
          // const shiftdata = element?.shiftData;
          const shiftTaskdata = element?.medicine;
          const id = element?.clientId[0]?._id;
          const name = `${element?.clientId[0]?.first_Name} ${element?.clientId[0]?.last_Name}`;
          const image = element?.clientId[0]?.image;
          const bgColor = "#007fff"
          events.push({
            shiftId: element._id,
            ShiftData: element,
            editShiftId: element._id,
            evdata: name ? name : '',
            evImage: image ? image : '',
            id: element._id,
            start: `${shiftTaskdata.startDate.split('T')[0]} ${shiftTaskdata.schedule.split(' - ')[0]}`,
            taskList: shiftTaskdata,
            end: `${shiftTaskdata.startDate.split('T')[0]} ${shiftTaskdata.schedule.split(' - ')[1]}`,
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
        setResources(uniqueArray);
        setEvents(events);
        setMedicshiftCountStatus(medicshiftCountStatus)
        // setTaskdata(res.data.data.notMatchedMedicines)

        setTimeout(() => {
          setShow(true)
        }, 800);

      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  function clientSpecificMedicineWeekSchedule() {
  }

  return (<>
    {show && <Scheduler count={medicCountStatus} SchedulerAccess={props.SchedulerAccess} resources={resources} events={events} taskdata={taskdata} clientSpecificMedicineWeekSchedule={clientSpecificMedicineWeekSchedule} />}
  </>);
}
export default MediDemoData;
