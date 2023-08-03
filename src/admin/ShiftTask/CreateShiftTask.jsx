import React, { useEffect, useState } from "react";
import "../ShiftTask/CreateShiftTask.css";
import { BsFillCameraFill } from "react-icons/bs";
import axios from "axios";
import AddTask from "./AddTask";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

const ITEMS = [
  { id: "Sun", name: "SUN" },
  { id: "Mon", name: "MON" },
  { id: "Tue", name: "TUE" },
  { id: "Wed", name: "WED" },
  { id: "Thu", name: "THU" },
  { id: "Fri", name: "FRI" },
  { id: "Sat", name: "SAT" },
];

const defaultwellbeingchart = {
  "overallMood": 0,
  "sleep": 0,
  "partcipation": 0,
  "pain": 0,
  "bowels": 0,
  "diet": 0,
  "activity": 0
}
function CreateShiftTask(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  console.log(props.shownShiftTaskUI, "++_____++++++++___+");
  const history = useHistory();
  const [searchFor, setsearchFor] = useState("");
  const [selectedidData, setselectedidData] = useState([]);
  const [displayData, setdisplayData] = useState(false);
  //assign To values
  const [assigndisplayData, setassigndisplayData] = useState(false);
  const [assignselectedidData, setassignselectedidData] = useState([]);
  const [APIData, setAPIData] = useState([]);
  const [APIDataTeam, setAPIDataTeam] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchInputTeam, setSearchInputTeam] = useState("");
  const [isAddTaskValid, setIsAddTaskValid] = useState(false);
  useEffect(() => {
    searchForApi();
    filterAssignto();
  }, []);

  // careHomeId=${localStorage.getItem('carehomeId')}
  function searchForApi() {
    let data = JSON.stringify({
      name: searchFor,
      careHomeId: localStorage.getItem("carehomeId"),
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
        console.log(response.data, "setAPIData");
        setAPIData(response.data.clientData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function filterAssignto() {
    let data = JSON.stringify({
      name: searchFor,
      careHomeId: localStorage.getItem("carehomeId"),
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
    // console.log(config);
    axios(config)
      .then(function (response) {
        // console.log(response.data);
        setAPIDataTeam(response.data.clientData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //post shift data
  const [shiftType, setShiftType] = useState("");
  const [image, setimage] = useState("");
  const [displayList, setdisplayList] = useState([]);
  const [arrLength, setarrLength] = useState('');
  const [selected, setSelected] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filteredResultsTeam, setFilteredResultsTeam] = useState([]);

  console.log(selected, "selected selected selected");
  //task Data
  const handleChange = (event) => {
    const { checked, value } = event.currentTarget;
    console.log(event, checked, value, "handleChange");
    setSelected((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };

  function create_shift(apiData) {
    console.log(arrLength, "arrLength")
    if (arrLength) {
      console.log(apiData, "apiData");
      var ShifType = [];
      var start_time = [];
      var end_time = [];
      var mainTaskcat = [];
      var text = [];
      var comments = [];
      displayList.forEach((items, index) => {
        ShifType.push(items.ShifType);
        start_time.push(items.start_time ? items.start_time : " ");
        end_time.push(items.end_time ? items.end_time : " ");
        mainTaskcat.push(items.mainTaskcat);
        text.push(items.text);
        comments.push(items.comments);
      });
      if (ShifType.length > 1) {
        var type = "array";
        // console.log("arr");
      } else {
        var type = "string";
        // console.log("string");
      }
      let shiftdata = []

      if (apiData.recurringshift === "1") {
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

          let weekdaysDate = getDaysArray(apiData.date, apiData.endDate);
          console.log(weekdaysDate, recurringWeekDays, "recurringWeekDays");
          console.log(ShifType, start_time, end_time, mainTaskcat, text);


          weekdaysDate.forEach((shiftStartDate, index) => {
            let date = shiftStartDate.toISOString().split("T")[0];
            shiftdata.push({
              wellbeingAssessment: {
                "overallMood": 0,
                "sleep": 0,
                "partcipation": 0,
                "pain": 0,
                "bowels": 0,
                "diet": 0,
                "activity": 0
              },
              careHomeId: localStorage.getItem("carehomeId"),
              clientId: selectedidData,
              forClient: searchInput
                .split(" ")
                .filter((s) => s)
                .join(" "),
              Date: date,
              startingTime: apiData.startTime,
              endingTime: apiData.endTime,
              recurringTask: apiData.recurringshift === "1" ? true : false,
              recurringTasktype: selected.join(","),
              instruction: apiData.instruction,
              recurringShiftType: shiftType,
              type: type,
              endDate: apiData.endDate,
              shift_type: ShifType,
              start_time: start_time,
              end_time: end_time,
              task_name: mainTaskcat,
              task_type: text,
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

          let weekdaysDate = getDaysArray(apiData.date, apiData.endDate);
          console.log(weekdaysDate, recurringWeekDays, "recurringWeekDays");
          console.log(ShifType, start_time, end_time, mainTaskcat, text);

          weekdaysDate.forEach((shiftStartDate, index) => {
            let date = shiftStartDate.toISOString().split("T")[0];
            shiftdata.push({
              wellbeingAssessment: {
                "overallMood": 0,
                "sleep": 0,
                "partcipation": 0,
                "pain": 0,
                "bowels": 0,
                "diet": 0,
                "activity": 0
              },
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
              startingTime: apiData.startTime,
              endingTime: apiData.endTime,
              recurringTask: apiData.recurringshift === "1" ? true : false,
              recurringTasktype: selected.join(","),
              instruction: apiData.instruction,
              recurringShiftType: shiftType,
              type: type,
              endDate: apiData.endDate,
              shift_type: ShifType,
              start_time: start_time,
              end_time: end_time,
              task_name: mainTaskcat,
              task_type: text,
              comments: comments,
              templateType: "",
            });
          });
        }
      } else {
        if (shiftType === "open" || shiftType === "unassigned") {
          shiftdata.push({
            wellbeingAssessment: {
              "overallMood": 0,
              "sleep": 0,
              "partcipation": 0,
              "pain": 0,
              "bowels": 0,
              "diet": 0,
              "activity": 0
            },
            careHomeId: localStorage.getItem("carehomeId"),
            clientId: selectedidData,
            forClient: searchInput
              .split(" ")
              .filter((s) => s)
              .join(" "),
            Date: apiData.date,
            startingTime: apiData.startTime,
            endingTime: apiData.endTime,
            recurringTask: apiData.recurringshift === "1" ? true : false,
            recurringTasktype: selected.join(","),
            instruction: apiData.instruction,
            recurringShiftType: shiftType,
            type: type,
            endDate: apiData.date,
            shift_type: ShifType,
            start_time: start_time,
            end_time: end_time,
            task_name: mainTaskcat,
            task_type: text,
            comments: comments,
            templateType: "",
          });
        } else {
          shiftdata.push({
            wellbeingAssessment: {
              "overallMood": 0,
              "sleep": 0,
              "partcipation": 0,
              "pain": 0,
              "bowels": 0,
              "diet": 0,
              "activity": 0
            },
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
            Date: apiData.date,
            startingTime: apiData.startTime,
            endingTime: apiData.endTime,
            recurringTask: apiData.recurringshift === "1" ? true : false,
            recurringTasktype: selected.join(","),
            instruction: apiData.instruction,
            recurringShiftType: shiftType,
            type: type,
            endDate: apiData.date,
            shift_type: ShifType,
            start_time: start_time,
            end_time: end_time,
            task_name: mainTaskcat,
            task_type: text,
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
      console.log(data, "12345678234567892345678");

      axios(config)
        .then(function (response) {
          window.location.reload(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      return;
    }
  }

  // const [checkStatus,setCheckStatus] = useState(false)
  const showField = (e) => {
    setShiftType(e)
    console.log(e, "showField");
  }

  const onAddTaskHandler = (arrTask) => {
    console.log("==========>>>qqqwqwqw>", arrTask, arrLength);
    const arrData = [...arrTask];

    console.log("==========>>>>", arrTask);
    setdisplayList(arrData);
    console.log(arrData);
  };

  const onarrTaskLengthHandler = (arrLength) => {
    console.log("==========>>>AAKASH>", arrLength);
    setarrLength(arrLength)
  };
  const [status, setStatus] = useState(0); // 0: no show, 1: show yes, 2: show no.

  const radioHandler = (status) => {
    setStatus(status);
  };
  const [showModal, setShowModal] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(props.isDisplayed);

  useEffect(() => {
    setShowModal(true)
  }, [])

  //   const hidden = () => {
  //     setShowModal(!showModal);
  //  }
  // const modalClose = () => {
  //   window.location.reload(false);
  // }

  const searchItems = (searchValue) => {
    console.log(searchValue);
    setSearchInput(searchValue);
    if (searchInput !== "") {
      setdisplayData(true);
      const filteredData = APIData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(APIData);

    }
  };
  const searchItemsTeam = (searchValue) => {
    console.log(searchValue);
    setSearchInputTeam(searchValue);
    if (searchInputTeam !== "") {
      setassigndisplayData(true);
      const filteredData = APIDataTeam.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInputTeam.toLowerCase());
      });
      setFilteredResultsTeam(filteredData);
    } else {
      setFilteredResultsTeam(APIDataTeam);
    }
  };

  const reverse = () => {
    setIsAddTaskValid(false);
  }
  return (
    <>
      <div className="min_height">
        <div className="card">
          <form onSubmit={handleSubmit(create_shift)}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
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
                            required: true,
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
                        {searchInput.length > 1 ? (
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
                                        items.first_Name + " " + items.last_Name
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
                                        items.first_Name + " " + items.last_Name
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

                  <div className="row form_box align-items-center mb-3">
                    <label className="form-label col-md-4 mb-0">Date:</label>
                    <div className="col-md-8">
                      <input
                        type="date"
                        name="date"
                        // value={date}
                        // onChange={(e) => setdate(e.target.value)}
                        className="form-control"
                        {...register("date", { required: true })}
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
                        // value={startTime}
                        step="1800"
                        // onChange={(e) => setstartTime(e.target.value)}
                        {...register("startTime", { required: true })}
                        className="form-control"
                      />
                      {errors.startTime && (
                        <span style={{ color: "red" }}>
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row form_box align-items-center mb-3">
                    <label className="form-label col-md-4 mb-0">
                      Ending Time:
                    </label>
                    <div className="col-md-8">
                      <input
                        type="time"
                        // value={endTime}
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
                          {...register("recurringshift", { required: true })}
                          onClick={(e) => radioHandler(1)}
                        // onChange={(e) => setrecurringTask(e.target.value)}
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
                          {...register("recurringshift", { required: true })}

                        // onChange={(e) => setrecurringTask(e.target.value)}
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
                              <label className="checkbox me-2" for={item.id}>
                                <input
                                  id={item.id}
                                  value={item.id}
                                  type="checkbox"
                                  {...register("weekdays", {
                                    required: getValues('recurringshift') === '1' ? true : false,
                                    onChange: (e) => {
                                      handleChange(e)
                                    }
                                  })}
                                  checked={selected.some(
                                    (val) => val === item.id
                                  )}
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
                          End Date:
                        </label>
                        <div className="col-md-8">
                          <input
                            type="date"
                            className="form-control"
                            // value={endDate}
                            // onChange={(e) => setendDate(e.target.value)}
                            {...register("endDate", { required: getValues('recurringshift') === '1' ? true : false })}
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
                        <label className="form-check-label" for="inlineRadio1">
                          Open
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          checked={shiftType === "unassigned"}
                          value="unassigned"
                          onClick={() => showField("unassigned")}
                          {...register("shiftType", { required: true })}
                        />
                        <label className="form-check-label" for="inlineRadio2">
                          Unassigned
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio3"
                          value="assigned"
                          checked={shiftType === "assigned"}
                          onClick={() => showField("assigned")}
                          {...register("shiftType", { required: true })}
                        />
                        <label className="form-check-label" for="inlineRadio3">
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
                    {/* <div className="col-md-2"></div> */}
                    {shiftType == "assigned" && (
                      <div className="col-md-8 mt-2">
                        <div className="position-relative">
                          <input
                            autoComplete="off"
                            type="text"
                            id="fornamevalue"
                            width="80px"
                            value={searchInputTeam}
                            // onChange={(e) => searchItemsTeam(e.target.value)}
                            className="form-control keytype"
                            name="assign_to"
                            {...register("assign_to", {
                              required:
                                getValues("shiftType") === "assigned"
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
                          {searchInputTeam.length > 1 ? (
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
                </div>
                {/* <div className="col-md-12 mb-3">
													<label className="form-label">File</label>
													<input type="file" onChange={(e) => setimage(e.target.files[0])} className="form-control" />
												</div> */}
                <div className="col-md-6">
                  <div className="instructions_box">
                    <textarea
                      placeholder="Instructions (Optional)"
                      // value={instruction}
                      // onChange={(e) => setinstruction(e.target.value)}
                      className="form-control"
                      {...register("instruction")}
                    ></textarea>
                    <div className="action_icon">
                      {/* <button className="btn audio">
                        <AiFillAudio />
                      </button> */}
                      {/* <button className="btn attachment">
                        <GrAttachment />
                        <input
                          type="file"
                          onChange={(e) => setimage(e.target.files[0])}
                        />
                      </button> */}
                      <button className="btn camera">
                        <BsFillCameraFill />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <hr />

              <AddTask
                onAddTask={onAddTaskHandler}
                arrTaskLength={onarrTaskLengthHandler}
                isAddTaskValid={isAddTaskValid}
                reverse={reverse}
              />

              <div className="row">
                <div className="col-md-12 text-center">
                  <button
                    className="btn submit_b"
                    type="submit"
                    onClick={() => setIsAddTaskValid(true)}
                  >
                    Create Shift
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
export default CreateShiftTask;
