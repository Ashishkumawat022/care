import React, { useEffect, useState } from "react";
import "../ShiftTask/CreateShiftTask.css";
import { BsFillCameraFill } from "react-icons/bs";
import axios from "axios";
import EditTask from "./EditTask";
import { useHistory } from "react-router-dom";
// import TimePicker from 'react-bootstrap-time-picker';
import { useForm } from "react-hook-form";


const ITEMS = [
  { id: 'Sun', name: 'SUN' },
  { id: 'Mon', name: 'MON' },
  { id: 'Tue', name: 'TUE' },
  { id: 'Wed', name: 'WED' },
  { id: 'Thu', name: 'THU' },
  { id: 'Fri', name: 'FRI' },
  { id: 'Sat', name: 'SAT' },
]
function EditCreateShiftTask(props) {

  const history = useHistory()
  console.log(props.editTaskData, props.shownEditShiftTaskUI, props, "++_____++++++++___+");
  let updateData;
  if (props.typeshift == 'generic') {
    console.log('generic')
    updateData = props?.editTaskData;
  } else if (props.typeshift == 'client') {
    console.log('client')
    updateData = props?.editTaskData;
  } else {
    console.log('editshiftmain')
    updateData = props?.editTaskData?.ShiftData;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    dirtyFields,
  } = useForm({
    defaultValues: {
      shiftname: updateData?.shiftName,
      date: updateData?.Date,
      startTime: updateData?.startingTime,
      endTime: updateData?.endingTime,
      endDate: updateData?.endDate,
      recurringshift: updateData.recurringShiftType,
      weekdays: updateData?.recurringTasktype
        ? updateData?.recurringTasktype.split(",")
        : [],
      shiftType: updateData.recurringShiftType,
      assign_to: updateData?.careTeamMember,
    },
  });

  let buttonText
  if (props.buttonType === 'editGenericTemplate') {
    buttonText = 'Update Template'
  } else if (props.buttonType === 'editClientTemplate') {
    buttonText = 'Update Template'
  } else {
    buttonText = props.typeshift === '' ? 'Update Shift' : 'Create Shift';
  }



  console.log(updateData, 'updateData')
  // const [updateData, setUpdateData] = useState(props?.editTaskData?.ShiftData)
  const [shownShiftTaskUI, setshownShiftTaskUI] = useState(props?.shownEditShiftTaskUI);
  const [searchFor, setsearchFor] = useState("");
  const [searchForresponse, setresponseData] = useState([]);
  const [selectedData, setselectedData] = useState("");
  const [selectedidData, setselectedidData] = useState(updateData?.clientId?._id);
  const [displayData, setdisplayData] = useState(false);
  const [shiftName, setshiftName] = useState(updateData?.shiftName);

  //assign To values
  const [searchasssignresponse, setasssignresponseData] = useState([]);
  const [assignselectedData, setassignselectedData] = useState("");
  const [assigndisplayData, setassigndisplayData] = useState(false);
  const [assignselectedidData, setassignselectedidData] = useState(updateData?.careTeamId?._id);
  const [APIData, setAPIData] = useState([])
  const [APIDataTeam, setAPIDataTeam] = useState([])
  const [searchInput, setSearchInput] = useState(updateData?.forClient);
  const [searchInputTeam, setSearchInputTeam] = useState(updateData?.careTeamMember);
  const [arrLength, setarrLength] = useState(updateData?.Task.length);


  //post shift data
  const [date, setdate] = useState(updateData?.Date);
  const [startingTime, setstartTime] = useState(updateData?.startingTime);
  const [endingTime, setendTime] = useState(updateData?.endingTime);
  const [recurringTask, setrecurringTask] = useState("");
  const [recurringTasktype, setrecurringTasktype] = useState("");
  const [instruction, setinstruction] = useState(updateData?.instruction);
  const [image, setimage] = useState("");
  const [endDate, setendDate] = useState(updateData?.endDate ? updateData?.endDate : '');
  const [displayList, setdisplayList] = useState(updateData?.Task);
  const [selected, setSelected] = useState(updateData?.recurringTasktype ? updateData?.recurringTasktype.split(',') : []);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filteredResultsTeam, setFilteredResultsTeam] = useState([]);
  const [status, setStatus] = useState(updateData?.recurringTask ? 1 : 2); // 0: no show, 1: show yes, 2: show no.
  const [showModal, setShowModal] = useState(false);
  const [shiftType, setShiftType] = useState(updateData.recurringShiftType);
  const [isAddTaskValid, setIsAddTaskValid] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  useEffect(() => {
    searchForApi();
    filterAssignto();
  }, [])

  const showField = (e) => {
    setShiftType(e);
  };

  function searchForApi() {
    let data = JSON.stringify({
      name: searchFor,
      careHomeId: localStorage.getItem('carehomeId')
    });
    let config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/filterFor`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    // console.log(config);
    axios(config)
      .then(function (response) {
        setAPIData(response.data.clientData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function filterAssignto() {
    let data = JSON.stringify({
      name: searchFor,
      careHomeId: localStorage.getItem('carehomeId')
    });
    let config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/filterAssignto`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setAPIDataTeam(response.data.clientData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  console.log(selected, "selected selected selected")
  const handleChange = event => {
    const { checked, value } = event.currentTarget;
    console.log(event, checked, value, "handleChange");
    setSelected(
      prev => checked
        ? [...prev, value]
        : prev.filter(val => val !== value)
    );
  };

  function editTemplate(type, event) {
    console.log(type, event, "editTemplate");
    let ShiftType = [];
    let startTime = [];
    let endTime = [];
    let taskName = [];
    let taskType = [];
    let comments = [];
    displayList.forEach((items, index) => {
      ShiftType.push(items.shiftType);
      startTime.push(items.startTime);
      endTime.push(items.endTime);
      taskName.push(items.taskName);
      taskType.push(items.taskType);
      comments.push(items.comments);
    });

    let shiftdata = []

    if (type === 'client') {
      shiftdata.push({
        careHomeId: localStorage.getItem("carehomeId"),
        clientId: selectedidData,
        forClient: searchInput
          .split(" ")
          .filter((s) => s)
          .join(" "),
        Date: event.date,
        startingTime: event.startTime,
        endingTime: event.endTime,
        recurringTask: event.recurringshift === "1" ? true : false,
        recurringTasktype: selected ? selected.join(",") : [],
        instruction: instruction,
        // recurringShiftType: shiftType,
        endDate: event.endDate,
        shift_type: ShiftType, //
        start_time: startTime, //
        end_time: endTime, //
        task_name: taskName, //
        task_type: taskType, //
        shiftName: event.shiftname,
        comments: comments,
        templateType: "client",
      });
      console.log(JSON.stringify(shiftdata), props?.editShiftId, "create_shift");
      var data = new FormData();
      data.append("shiftId", props?.editShiftId);
      data.append("shiftdata", JSON.stringify(shiftdata));
      data.append("attachments", image);
      var config = {
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/editShift`,
        headers: {
          Authorization: localStorage.getItem("care_admin_token"),
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          //  window.location.href = `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/admin/demo`;
          // window.location.reload(false);
          // console.log(response.data, "create_shift")
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (type === 'generic') {
      shiftdata.push({
        careHomeId: localStorage.getItem("carehomeId"),
        Date: event.date,
        startingTime: event.startTime,
        endingTime: event.endTime,
        recurringTask: event.recurringshift === "1" ? true : false,
        recurringTasktype: selected ? selected.join(",") : [],
        instruction: instruction,
        // recurringShiftType: shiftType,
        endDate: event.endDate,
        shift_type: ShiftType, //
        start_time: startTime, //
        end_time: endTime, //
        shiftName: event.shiftname,
        task_name: taskName, //
        task_type: taskType, //
        comments: comments, //
        templateType: "generic",
      });
      console.log(shiftdata, updateData._id, props.editShiftId, "generic_shift");

      var data = new FormData();
      data.append("shiftId", props?.editShiftId);
      data.append("shiftdata", JSON.stringify(shiftdata));
      data.append("attachments", image);
      var config = {
        method: "post",
        url: `${process.env.REACT_APP_BASEURL}/editShift`,
        headers: {
          Authorization: localStorage.getItem("care_admin_token"),
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          //  window.location.href = `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/admin/demo`;
          // window.location.reload(false);
          // console.log(response.data, "create_shift")
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }


  function editshift(Apitype, event) {
    console.log(event, arrLength, "Apitype");
    if (arrLength) {
      let ShiftType = [];
      let startTime = [];
      let endTime = [];
      let taskName = [];
      let taskType = [];
      let comments = [];
      displayList.forEach((items, index) => {
        ShiftType.push(items.shiftType);
        startTime.push(items.startTime);
        endTime.push(items.endTime);
        taskName.push(items.taskName);
        taskType.push(items.taskType);
        comments.push(items.comments);
      });

      const shiftdata = [];



      if (Apitype === "postShift") {
        if (event.recurringshift === "1") {
          if (shiftType === "open" || shiftType === "unassigned") {
            let recurringWeekDays = [];

            let getDaysArray = function (startDate, endDate) {
              let dateArray = [];
              for (
                let daysName = new Date(startDate);
                daysName <= new Date(endDate);
                daysName.setDate(daysName.getDate() + 1)
              ) {
                selected.forEach((item, index) => {
                  if (item === daysName.toString().split(" ")[0]) {
                    recurringWeekDays.push(daysName.toString().split(" ")[0]);
                    dateArray.push(new Date(daysName));
                  }
                });
              }
              return dateArray;
            };

            let weekdaysDate = getDaysArray(event.date, event.endDate);
            // console.log(weekdaysDate, recurringWeekDays, "recurringWeekDays");
            // console.log(ShifType, start_time, end_time, mainTaskcat, text);


            weekdaysDate.forEach((shiftStartDate, index) => {
              let date = shiftStartDate.toISOString().split("T")[0];
              shiftdata.push({
                careHomeId: localStorage.getItem("carehomeId"),
                clientId: selectedidData,
                forClient: searchInput
                  .split(" ")
                  .filter((s) => s)
                  .join(" "),
                Date: date,
                startingTime: event.startTime,
                endingTime: event.endTime,
                recurringTask: event.recurringshift === "1" ? true : false,
                recurringTasktype: selected.join(","),
                instruction: event.instruction,
                recurringShiftType: shiftType,
                type: type,
                endDate: event.endDate,
                shift_type: ShiftType,
                start_time: startTime,
                end_time: endTime,
                task_name: taskName,
                task_type: taskType,
                comments: comments,
                templateType: "",
              });
            });
          } else {
            let recurringWeekDays = [];

            let getDaysArray = function (startDate, endDate) {
              let dateArray = [];
              for (
                let daysName = new Date(startDate);
                daysName <= new Date(endDate);
                daysName.setDate(daysName.getDate() + 1)
              ) {
                selected.forEach((item, index) => {
                  if (item === daysName.toString().split(" ")[0]) {
                    recurringWeekDays.push(daysName.toString().split(" ")[0]);
                    dateArray.push(new Date(daysName));
                  }
                });
              }
              return dateArray;
            };

            let weekdaysDate = getDaysArray(event.date, event.endDate);
            // console.log(weekdaysDate, recurringWeekDays, "recurringWeekDays");
            // console.log(ShifType, start_time, end_time, mainTaskcat, text);

            weekdaysDate.forEach((shiftStartDate, index) => {
              let date = shiftStartDate.toISOString().split("T")[0];
              shiftdata.push({
                careHomeId: localStorage.getItem("carehomeId"),
                clientId: selectedidData,
                careTeamId: assignselectedidData,
                forClient: searchInput
                  .split(" ")
                  .filter((s) => s)
                  .join(" "),
                careTeamMember: searchInputTeam
                  .split(" ")
                  .filter((s) => s)
                  .join(" "),
                Date: date,
                startingTime: event.startTime,
                endingTime: event.endTime,
                recurringTask: event.recurringshift === "1" ? true : false,
                recurringTasktype: selected.join(","),
                instruction: event.instruction,
                recurringShiftType: shiftType,
                type: type,
                endDate: event.endDate,
                shift_type: ShiftType,
                start_time: startTime,
                end_time: endTime,
                task_name: taskName,
                task_type: taskType,
                comments: comments,
                templateType: "",
              });
            });
          }
        } else {
          if (shiftType === "open" || shiftType === "unassigned") {
            shiftdata.push({
              careHomeId: localStorage.getItem("carehomeId"),
              clientId: selectedidData,
              forClient: searchInput
                .split(" ")
                .filter((s) => s)
                .join(" "),
              Date: event.date,
              startingTime: event.startTime,
              endingTime: event.endTime,
              recurringTask: event.recurringshift === "1" ? true : false,
              recurringTasktype: selected.join(","),
              instruction: event.instruction,
              recurringShiftType: shiftType,
              type: type,
              endDate: event.date,
              shift_type: ShiftType,
              start_time: startTime,
              end_time: endTime,
              task_name: taskName,
              task_type: taskType,
              comments: comments,
              templateType: "",
            });
          } else {
            shiftdata.push({
              careHomeId: localStorage.getItem("carehomeId"),
              clientId: selectedidData,
              careTeamId: assignselectedidData,
              forClient: searchInput
                .split(" ")
                .filter((s) => s)
                .join(" "),
              careTeamMember: searchInputTeam
                .split(" ")
                .filter((s) => s)
                .join(" "),
              Date: event.date,
              startingTime: event.startTime,
              endingTime: event.endTime,
              recurringTask: event.recurringshift === "1" ? true : false,
              recurringTasktype: selected.join(","),
              instruction: event.instruction,
              recurringShiftType: shiftType,
              type: type,
              endDate: event.date,
              shift_type: ShiftType,
              start_time: startTime,
              end_time: endTime,
              task_name: taskName,
              task_type: taskType,
              comments: comments,
              templateType: "",
            });
          }
        }
        var data = new FormData();
        data.append("shiftdata", JSON.stringify(shiftdata));
        data.append("attachments", image);
        var config = {
          method: "post",
          url: `${process.env.REACT_APP_BASEURL}/createShift`,
          headers: {
            Authorization: localStorage.getItem("care_admin_token"),
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
      } else if (Apitype === "editshift") {
        let ShiftType = [];
        let startTime = [];
        let endTime = [];
        let taskName = [];
        let taskType = [];
        let comments = [];
        displayList.forEach((items, index) => {
          ShiftType.push(items.shiftType);
          startTime.push(items.startTime);
          endTime.push(items.endTime);
          taskName.push(items.taskName);
          taskType.push(items.taskType);
          comments.push(items.comments);
        });
        if (shiftType.length > 1) {
          var type = "array";
        } else {
          var type = "string";
        }

        const shiftdata = [];


        console.log(updateData, "updateData");

        if (event.recurringshift === "1") {
          if (shiftType === "open" || shiftType === "unassigned") {
            let recurringWeekDays = [];

            let getDaysArray = function (startDate, endDate) {
              let dateArray = [];
              for (
                let daysName = new Date(startDate);
                daysName <= new Date(endDate);
                daysName.setDate(daysName.getDate() + 1)
              ) {
                selected.forEach((item, index) => {
                  if (item === daysName.toString().split(" ")[0]) {
                    recurringWeekDays.push(daysName.toString().split(" ")[0]);
                    dateArray.push(new Date(daysName));
                  }
                });
              }
              return dateArray;
            };

            let weekdaysDate = getDaysArray(event.date, event.endDate);
            // console.log(weekdaysDate, recurringWeekDays, "recurringWeekDays");
            // console.log(ShifType, start_time, end_time, mainTaskcat, text);


            weekdaysDate.forEach((shiftStartDate, index) => {
              let date = shiftStartDate.toISOString().split("T")[0];
              shiftdata.push({
                careHomeId: localStorage.getItem("carehomeId"),
                clientId: selectedidData,
                forClient: searchInput
                  .split(" ")
                  .filter((s) => s)
                  .join(" "),
                Date: date,
                startingTime: event.startTime,
                endingTime: event.endTime,
                recurringTask: event.recurringshift === "1" ? true : false,
                recurringTasktype: selected.join(","),
                instruction: event.instruction,
                recurringShiftType: shiftType,
                type: type,
                endDate: event.endDate,
                shift_type: ShiftType,
                start_time: startTime,
                end_time: endTime,
                task_name: taskName,
                task_type: taskType,
                comments: comments,
                templateType: "",
              });
            });
          } else {
            let recurringWeekDays = [];

            let getDaysArray = function (startDate, endDate) {
              let dateArray = [];
              for (
                let daysName = new Date(startDate);
                daysName <= new Date(endDate);
                daysName.setDate(daysName.getDate() + 1)
              ) {
                selected.forEach((item, index) => {
                  if (item === daysName.toString().split(" ")[0]) {
                    recurringWeekDays.push(daysName.toString().split(" ")[0]);
                    dateArray.push(new Date(daysName));
                  }
                });
              }
              return dateArray;
            };

            let weekdaysDate = getDaysArray(event.date, event.endDate);
            // console.log(weekdaysDate, recurringWeekDays, "recurringWeekDays");
            // console.log(ShifType, start_time, end_time, mainTaskcat, text);

            weekdaysDate.forEach((shiftStartDate, index) => {
              let date = shiftStartDate.toISOString().split("T")[0];
              shiftdata.push({
                careHomeId: localStorage.getItem("carehomeId"),
                clientId: selectedidData,
                careTeamId: assignselectedidData,
                forClient: searchInput
                  .split(" ")
                  .filter((s) => s)
                  .join(" "),
                careTeamMember: searchInputTeam
                  .split(" ")
                  .filter((s) => s)
                  .join(" "),
                Date: date,
                startingTime: event.startTime,
                endingTime: event.endTime,
                recurringTask: event.recurringshift === "1" ? true : false,
                recurringTasktype: selected.join(","),
                instruction: event.instruction,
                recurringShiftType: shiftType,
                type: type,
                endDate: event.endDate,
                shift_type: ShiftType,
                start_time: startTime,
                end_time: endTime,
                task_name: taskName,
                task_type: taskType,
                comments: comments,
                templateType: "",
              });
            });
          }
        } else {
          if (shiftType === "open" || shiftType === "unassigned") {
            shiftdata.push({
              careHomeId: localStorage.getItem("carehomeId"),
              clientId: selectedidData,
              forClient: searchInput
                .split(" ")
                .filter((s) => s)
                .join(" "),
              Date: event.date,
              startingTime: event.startTime,
              endingTime: event.endTime,
              recurringTask: event.recurringshift === "1" ? true : false,
              recurringTasktype: selected.join(","),
              instruction: event.instruction,
              recurringShiftType: shiftType,
              type: type,
              endDate: event.date,
              shift_type: ShiftType,
              start_time: startTime,
              end_time: endTime,
              task_name: taskName,
              task_type: taskType,
              comments: comments,
              templateType: "",
            });
          } else {
            shiftdata.push({
              careHomeId: localStorage.getItem("carehomeId"),
              clientId: selectedidData,
              careTeamId: assignselectedidData,
              forClient: searchInput
                .split(" ")
                .filter((s) => s)
                .join(" "),
              careTeamMember: searchInputTeam
                .split(" ")
                .filter((s) => s)
                .join(" "),
              Date: event.date,
              startingTime: event.startTime,
              endingTime: event.endTime,
              recurringTask: event.recurringshift === "1" ? true : false,
              recurringTasktype: selected.join(","),
              instruction: event.instruction,
              recurringShiftType: shiftType,
              type: type,
              endDate: event.date,
              shift_type: ShiftType,
              start_time: startTime,
              end_time: endTime,
              task_name: taskName,
              task_type: taskType,
              comments: comments,
              templateType: "",
            });
          }
        }

        console.log(JSON.stringify(shiftdata), "shiftttttttData");

        var data = new FormData();
        data.append("shiftId", props?.data?.EditShiftData?.shiftId);
        data.append("shiftdata", JSON.stringify(shiftdata));
        data.append("attachments", image);
        var config = {
          method: "post",
          url: `${process.env.REACT_APP_BASEURL}/editShift`,
          headers: {
            Authorization: localStorage.getItem("care_admin_token"),
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
      }

    } else {
      return;
    }
  }

  const onAddTaskHandler = (arrTask) => {
    console.log("==========>>>qqqwqwqw>", arrTask);
    const arrData = [...arrTask];
    console.log("==========>>>>", arrTask);
    setdisplayList(arrData);
    console.log(arrData);
  };

  const radioHandler = (status) => {
    setStatus(status);
  };


  const searchItems = (searchValue) => {
    console.log(searchValue)
    setSearchInput(searchValue)
    if (searchInput !== '') {
      setdisplayData(true);
      const filteredData = APIData.filter((item) => {
        return Object.values(item).join('')?.toLowerCase()?.includes(searchInput?.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(APIData)
    }

  }
  const searchItemsTeam = (searchValue) => {
    console.log(searchValue)
    setSearchInputTeam(searchValue)
    if (searchInputTeam !== '') {
      setassigndisplayData(true);
      const filteredData = APIDataTeam.filter((item) => {
        return Object.values(item).join('')?.toLowerCase()?.includes(searchInputTeam?.toLowerCase())
      })
      setFilteredResultsTeam(filteredData)
    }
    else {
      setFilteredResultsTeam(APIDataTeam)
    }
  }
  const reverse = () => {
    setIsAddTaskValid(false);
  };

  const onarrTaskLengthHandler = (arrLength) => {
    console.log("==========>>>AAKASH>", arrLength);
    setarrLength(arrLength)
  };

  return (
    <>
      <div className="container-fluid min_height">
        <div className="card">
          <form
            onSubmit={handleSubmit((event) => {
              if (props.buttonType === "editGenericTemplate") {
                editTemplate("generic", event);
              } else if (props.buttonType === "editClientTemplate") {
                editTemplate("client", event);
              } else {
                editshift(props.addCreateShift, event);
              }
              setshownShiftTaskUI(!props.shownEditShiftTaskUI);
            })}
          >
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  {props.titleName !== "Shift Creation" && (
                    <div className="row form_box align-items-center mb-3">
                      <label className="form-label col-md-4 mb-0">
                        Shift Name:
                      </label>
                      <div className="col-md-8">
                        <div className="position-relative">
                          <input
                            autoComplete="off"
                            type="text"
                            // value={shiftName}
                            // onChange={(e) => setshiftName(e.target.value)}
                            className="form-control keytype"
                            name="shiftname"
                            {...register("shiftname", {
                              required: props.titleName !== "Shift Creation" ? true : false,
                              // onChange: (e) => {
                              //   setshiftName(e.target.value);
                              // },
                            })}
                          />
                          {errors.shiftname && (
                            <span style={{ color: "red" }}>
                              This field is required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {props.buttonType !== "editGenericTemplate" && (
                    <div className="row form_box align-items-center mb-3">
                      <label className="form-label col-md-4 mb-0">For:</label>
                      <div className="col-md-8">
                        <div className="position-relative">
                          <input
                            autoComplete="off"
                            type="text"
                            id="fornamevalue"
                            value={searchInput}
                            // onChange={(e) => searchItems(e.target.value)}
                            className="form-control keytype"
                            name="for_name"
                            {...register("for", {
                              required: props.buttonType !== "editGenericTemplate" ? true : false,
                              onChange: (e) => {
                                searchItems(e.target.value);
                              },
                            })}
                          />
                          {errors.for && (
                            <span style={{ color: "red" }}>
                              This field is required
                            </span>
                          )}
                          {searchInput?.length > 1 ? (
                            <div
                              className="hint_box"
                              style={{
                                display: displayData ? "block" : "none",
                              }}
                            >
                              <ul>
                                {" "}
                                {filteredResults.map(function (items, index) {
                                  return (
                                    <li
                                      key={items._id}
                                      onClick={(e) => {
                                        setdisplayData(false);
                                        setSearchInput(
                                          items.first_Name +
                                          " " +
                                          items.last_Name
                                        );
                                        setselectedidData(items._id);
                                      }}
                                    >
                                      <img alt="" src={items.image} />{" "}
                                      {items.first_Name} {items.last_Name}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          ) : (
                            <div
                              className="hint_box"
                              style={{
                                display: displayData ? "block" : "none",
                              }}
                            >
                              <ul>
                                {APIData.map(function (items, index) {
                                  return (
                                    <li
                                      key={items._id}
                                      onClick={(e) => {
                                        setdisplayData(false);
                                        setSearchInput(
                                          items.first_Name +
                                          " " +
                                          items.last_Name
                                        );
                                        setselectedidData(items._id);
                                      }}
                                    >
                                      <img alt="" src={items.image} />{" "}
                                      {items.first_Name} {items.last_Name}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="row form_box align-items-center mb-3">
                    <label className="form-label col-md-4 mb-0">Date {props.titleName !== "Shift Creation" ? '(Optional)' : ''}:</label>
                    <div className="col-md-8">
                      <input
                        type="date"
                        name="date"
                        className="form-control"
                        {...register("date", { required: props.titleName !== "Shift Creation" ? true : false })}
                      />
                      {errors.date && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row form_box align-items-center mb-3">
                    <label className="form-label col-md-4 mb-0">
                      Starting Time:
                    </label>
                    <div className="col-md-8">
                      <input
                        type="time"
                        // value={startingTime}
                        step="1800"
                        // onChange={(e) => setstartTime(e.target.value)}
                        className="form-control"
                        {...register("startTime", { required: true })}
                      />
                      {errors.startTime && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )}
                      {console.log(startingTime)}
                    </div>
                  </div>
                  <div className="row form_box align-items-center mb-3">
                    <label className="form-label col-md-4 mb-0">
                      Ending Time:
                    </label>
                    <div className="col-md-8">
                      <input
                        type="time"
                        // value={endingTime}
                        // onChange={(e) => setendTime(e.target.value)}
                        className="form-control"
                        {...register("endTime", { required: true })}
                      />
                      {errors.endTime && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row form_box align-items-center mb-3">
                    <label className="form-label col-md-4 mb-0">
                      Recurring Shift:
                    </label>
                    <div className="col-md-8">
                      <label className="checkbox checkbox_shift">
                        <input
                          type="radio"
                          id="r1"
                          name="recurringshift"
                          value="1"
                          checked={status === 1}
                          onClick={(e) => radioHandler(1)}
                          // onChange={(e) => setrecurringTask(e.target.value)}
                          {...register("recurringshift", { required: true })}
                        />
                        <span className="checkmark">Yes</span>
                      </label>
                      <label className="checkbox checkbox_shift">
                        <input
                          type="radio"
                          id="r2"
                          name="recurringshift"
                          value="2"
                          checked={status === 2}
                          onClick={(e) => radioHandler(2)}
                          // onChange={(e) => setrecurringTask(e.target.value)}
                          {...register("recurringshift", { required: true })}
                        />
                        <span className="checkmark">No</span>
                      </label>
                      <br />
                      {errors.recurringshift && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  {status === 1 && (
                    <div className="desc" id="Cars1">
                      <div className="row form_box align-items-center mb-3">
                        <label className="form-label col-md-4 mb-0"></label>
                        <div className="col-md-8">
                          {ITEMS.map((item) => (
                            <>
                              <label
                                className="checkbox me-2"
                                htmlFor={item.id}
                              >
                                <input
                                  id={item.id}
                                  value={item.id}
                                  type="checkbox"
                                  checked={selected.some((val) => {
                                    return val === item.id;
                                  })}
                                  {...register("weekdays", {
                                    required: getValues("recurringshift") === "1"
                                      ? true
                                      : false,
                                    onChange: (e) => {
                                      handleChange(e);
                                    },
                                  })}
                                // onChange={handleChange}
                                />
                                <span className="checkmark"></span>
                                {item.name}
                              </label>
                            </>
                          ))}
                          {errors.weekdays && (
                            <div style={{ color: "red" }}>
                              This field is required
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="row form_box align-items-center mb-3">
                        <label className="form-label col-md-4 mb-0">
                          End Date {props.titleName !== "Shift Creation" ? '(Optional)' : ''}:
                        </label>
                        <div className="col-md-8">
                          <input
                            type="date"
                            className="form-control"
                            // value={endDate}
                            // onChange={(e) => setendDate(e.target.value)}
                            {...register("endDate", {
                              required: getValues("recurringshift") === "1"
                                ? true
                                : false,
                            })}
                          />
                          {errors.endDate && (
                            <span style={{ color: "red" }}>
                              This field is required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {status === 2 && <div></div>}

                  {props.titleName === "Shift Creation" && (
                    <div className="row form_box align-items-center mb-3 mt-2">
                      <label className="form-label col-md-4 mb-0">
                        Shift Assignment:
                      </label>
                      <div className="col-md-8">
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio1"
                            {...register("shiftType", { required: true })}
                            value="open"
                            checked={shiftType === "open"}
                            onClick={() => showField("open")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio1"
                            style={{ fontSize: "14px" }}
                          >
                            Open
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio2"
                            {...register("shiftType", { required: true })}
                            value="unassigned"
                            checked={shiftType === "unassigned"}
                            onClick={() => showField("unassigned")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio2"
                            style={{ fontSize: "15px" }}
                          >
                            Unassigned
                          </label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineRadio3"
                            {...register("shiftType", { required: true })}
                            value="assigned"
                            checked={shiftType === "assigned"}
                            onClick={() => showField("assigned")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="inlineRadio3"
                            style={{ fontSize: "15px" }}
                          >
                            Assigned To
                          </label>
                        </div>
                        {errors.shiftType && (
                          <span style={{ color: "red" }}>
                            This field is required
                          </span>
                        )}
                      </div>
                      <div className="col-md-4"></div>
                      {shiftType == "assigned" && (
                        <div className="col-md-8 mt-2">
                          <div className="position-relative">
                            <input
                              autoComplete="off"
                              type="text"
                              id="fornamevalue"
                              value={searchInputTeam}
                              // onChange={(e) => searchItemsTeam(e.target.value)}
                              className="form-control keytype"
                              name="assign_to"
                              {...register("assign_to", {
                                required: getValues("shiftType") === "assigned"
                                  ? true
                                  : false,
                                onChange: (e) => {
                                  searchItemsTeam(e.target.value);
                                },
                              })}
                            />
                            {errors.assign_to && (
                              <span style={{ color: "red" }}>
                                This field is required
                              </span>
                            )}
                            {searchInputTeam?.length > 1 ? (
                              <div
                                className="hint_box"
                                style={{
                                  display: assigndisplayData ? "block" : "none",
                                }}
                              >
                                <ul>
                                  {" "}
                                  {filteredResultsTeam.map(function (
                                    items,
                                    index
                                  ) {
                                    return (
                                      <li
                                        key={items._id}
                                        onClick={(e) => {
                                          setassigndisplayData(false);
                                          setSearchInputTeam(
                                            items.first_Name +
                                            " " +
                                            items.last_Name
                                          );
                                          setassignselectedidData(items._id);
                                        }}
                                      >
                                        <img alt="" src={items.image} />{" "}
                                        {items.first_Name} {items.last_Name}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            ) : (
                              <div
                                className="hint_box"
                                style={{
                                  display: assigndisplayData ? "block" : "none",
                                }}
                              >
                                <ul>
                                  {APIDataTeam.map(function (items, index) {
                                    return (
                                      <li
                                        key={items._id}
                                        onClick={(e) => {
                                          setassigndisplayData(false);
                                          setSearchInputTeam(
                                            items.first_Name +
                                            " " +
                                            items.last_Name
                                          );
                                          setassignselectedidData(items._id);
                                        }}
                                      >
                                        <img alt="" src={items.image} />{" "}
                                        {items.first_Name} {items.last_Name}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <div className="instructions_box">
                    <textarea
                      placeholder="Instructions (Optional)"
                      value={instruction}
                      onChange={(e) => setinstruction(e.target.value)}
                      className="form-control"
                    ></textarea>
                    <div className="action_icon">
                      <button className="btn camera">
                        <BsFillCameraFill />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <hr />

              <EditTask
                onAddTask={onAddTaskHandler}
                updateData={updateData}
                arrTaskLength={onarrTaskLengthHandler}
                isAddTaskValid={isAddTaskValid}
                reverse={reverse}
              />

              <div className="row">
                <div className="col-md-12 text-center">
                  <button
                    type="submit"
                    className="btn submit_b"
                    // onClick={}
                    onClick={() => setIsAddTaskValid(true)}
                  >
                    {buttonText}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default EditCreateShiftTask;
