import React, { useEffect, useState } from "react";
import "./CreateShiftTask.css";
import { BsFillCameraFill } from "react-icons/bs";
import axios from "axios";
import AddTask from "./AddTask";
import { Link, useHistory } from "react-router-dom";
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
function ClientShiftcreation(props) {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  const history = useHistory()
  console.log(props.shownShiftTaskUI, "++_____++++++++___+");

  const [searchFor, setsearchFor] = useState("");
  const [searchForresponse, setresponseData] = useState([]);
  const [selectedData, setselectedData] = useState("");
  const [selectedidData, setselectedidData] = useState([]);
  const [displayData, setdisplayData] = useState(false);
  //assign To values
  const [searchasssignresponse, setasssignresponseData] = useState([]);
  const [assignselectedData, setassignselectedData] = useState("");
  const [assigndisplayData, setassigndisplayData] = useState(false);
  const [assignselectedidData, setassignselectedidData] = useState([]);
  const [APIData, setAPIData] = useState([])
  const [APIDataTeam, setAPIDataTeam] = useState([])
  const [searchInput, setSearchInput] = useState('');
  const [arrLength, setarrLength] = useState(0);
  const [searchInputTeam, setSearchInputTeam] = useState('');
  const [isAddTaskValid, setIsAddTaskValid] = useState(false);
  useEffect(() => {
    searchForApi();
  }, [])

  // careHomeId=${localStorage.getItem('carehomeId')}
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
        // console.log(response.data);
        setAPIData(response.data.clientData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const reverse = () => {
    setIsAddTaskValid(false);
  };

  const onarrTaskLengthHandler = (arrLength) => {
    console.log("==========>>>AAKASH>", arrLength);
    setarrLength(arrLength);
  };

  //post shift data
  const [date, setdate] = useState("");
  const [startTime, setstartTime] = useState("");
  const [shiftName, setshiftName] = useState("");
  const [endTime, setendTime] = useState("");
  const [recurringTask, setrecurringTask] = useState("");
  const [recurringTasktype, setrecurringTasktype] = useState("");
  const [instruction, setinstruction] = useState("");
  const [image, setimage] = useState("");
  const [endDate, setendDate] = useState("");
  const [displayList, setdisplayList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [filteredResultsTeam, setFilteredResultsTeam] = useState([]);

  console.log(selected, "selected selected selected")
  //task Data
  const handleChange = event => {
    const { checked, value } = event.currentTarget;
    console.log(event, checked, value, "handleChange");
    setSelected(
      prev => checked
        ? [...prev, value]
        : prev.filter(val => val !== value)
    );
  };


  const onSubmit = (data) => {
    console.log(data, data.recurringshift);
    console.log(arrLength, "arrLength")
    if (arrLength) {
      var ShifType = [];
      var start_time = [];
      var end_time = [];
      var mainTaskcat = [];
      var text = [];
      var comments = [];
      displayList.forEach((items, index) => {
        ShifType.push(items.ShifType);
        start_time.push(items.start_time ? items.start_time : ' ');
        end_time.push(items.end_time ? items.end_time : ' ');
        mainTaskcat.push(items.mainTaskcat);
        text.push(items.text);
        comments.push(items.comments);
      });

      let shiftdata = []

      if (data.recurringshift === '1') {
        shiftdata.push({
          careHomeId: localStorage.getItem("carehomeId"),
          Date: data.date,
          forClient: searchInput.split(' ').filter(s => s).join(' '),
          clientId: selectedidData,
          startingTime: data.startTime,
          endingTime: data.endTime,
          recurringTask: data.recurringshift === "1" ? true : false,
          recurringTasktype: data.weekdays ? data.weekdays.join(',') : '',
          instruction: data.instruction,
          // recurringShiftType: shiftType,
          endDate: data.endDate ? data.endDate : '',
          shift_type: ShifType,
          start_time: start_time,
          end_time: end_time,
          task_name: mainTaskcat,
          task_type: text,
          templateType: 'client',
          comments: comments,
          shiftName: data.shiftName
        })
      } else {
        shiftdata.push({
          careHomeId: localStorage.getItem("carehomeId"),
          Date: data.date,
          forClient: searchInput.split(' ').filter(s => s).join(' '),
          clientId: selectedidData,
          startingTime: data.startTime,
          endingTime: data.endTime,
          recurringTask: data.recurringshift === "1" ? true : false,
          recurringTasktype: data.weekdays ? data.weekdays.join(',') : '',
          instruction: data.instruction,
          // recurringShiftType: shiftType,
          endDate: '',
          shift_type: ShifType,
          start_time: start_time,
          end_time: end_time,
          task_name: mainTaskcat,
          task_type: text,
          comments: comments,
          templateType: 'client',
          shiftName: data.shiftName
        })
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
          //  window.location.href = `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/admin/demo`;

          window.location.reload(false);
          // console.log(response.data, "create_shift")
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      return;
    }
  };

  const onAddTaskHandler = (arrTask) => {
    console.log("==========>>>qqqwqwqw>", arrTask);
    const arrData = [...arrTask];
    console.log("==========>>>>", arrTask);
    setdisplayList(arrData);
    console.log(arrData);
  };
  const [status, setStatus] = useState(0); // 0: no show, 1: show yes, 2: show no.

  const radioHandler = (status) => {
    setStatus(status);
  };

  const searchItems = (searchValue) => {
    console.log(searchValue)
    setSearchInput(searchValue)
    if (searchInput !== '') {
      setdisplayData(true);
      const filteredData = APIData.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    }
    else {
      setFilteredResults(APIData)
    }

  }

  return (
    <>
      <div className="container-fluid min_height">
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
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
                          {...register("shiftName", { required: true })}
                        />
                        {errors.shiftName && (
                          <span style={{ color: "red" }}>
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row form_box align-items-center mb-3">
                    <label className="form-label col-md-4 mb-0">For:</label>
                    <div className="col-md-8">
                      <div className="position-relative">
                        {/* <input
                        type="hidden"
                        className="form-control"
                        value={selectedidData}
                      /> */}
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
                    <label className="form-label col-md-4 mb-0">
                      Date (Optional) :
                    </label>
                    <div className="col-md-8">
                      <input
                        type="date"
                        name="date"
                        // value={date}
                        // onChange={(e) => setdate(e.target.value)}
                        className="form-control"
                        {...register("date")}
                      />
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
                        className="form-control"
                        {...register("startTime", { required: true })}
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
                          onClick={(e) => radioHandler(1)}
                          // onChange={(e) =>
                          //   setrecurringTask(e.target.value)
                          // }
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
                          // onChange={(e) =>
                          //   setrecurringTask(e.target.value)
                          // }
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

                                  name="weekdays"
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
                          End Date (Optional) :
                        </label>
                        <div className="col-md-8">
                          <input
                            type="date"
                            className="form-control"
                            // value={endDate}
                            {...register("endDate")}
                          // onChange={(e) => setendDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  {status === 2 && <div></div>}
                </div>
                <div className="col-md-6">
                  <div className="instructions_box">
                    <textarea
                      placeholder="Instructions (Optional))"
                      // value={instruction}
                      // onChange={(e) => setinstruction(e.target.value)}
                      className="form-control"
                      {...register("instruction")}
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
                    // onClick={() => {
                    //   create_shift();
                    //   setshownShiftTaskUI(!props.shownShiftTaskUI);
                    // }}
                    onClick={() => setIsAddTaskValid(true)}
                  >
                    Create Template
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
export default ClientShiftcreation;
