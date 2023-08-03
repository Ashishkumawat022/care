import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
// import { MdDelete } from "react-icons/md";

const EditTask = (props) => {
  console.log(props, "EditTasEditTaskk");

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

  let editdatawithImage = [];
  props.updateData.Task.map((el, index) => {
    let selectedImage = "";
    data.map((item, itemIndex) => {
      console.log(item, "itemData");

      if (item.Ctg == el.taskName) {
        selectedImage = JSON.parse(item.value);
        console.log(selectedImage, "selectedImage");
        editdatawithImage.push({
          shiftType: el.shiftType,
          startTime: el.startTime,
          endTime: el.endTime,
          taskName: el.taskName,
          taskType: el.taskType,
          selectedImage: selectedImage,
          comments: el.comments,
        });
        console.log(editdatawithImage, "editdatawithImage");
      }
      return editdatawithImage;
    });
  });
  console.log(props, "editdatawithImageeditdatawithImage");

  console.log(editdatawithImage, "getTaskdata == EditTask");
  let getTaskdata = editdatawithImage;
  useEffect(() => {
    getTaskapi();
  }, []);
  // get task data
  const [getTask, setgetTask] = useState({});
  const [SubcatTask, setSubcatTask] = useState([]);
  const [mainTaskcat, setmainTaskcat] = useState("Please select a category");
  const [active, setactive] = useState();
  const [text, settext] = useState("Please select sub category");
  const [showTask, setshowTask] = useState(true);
  const [showCate, setshowCate] = useState(true);
  const [showSubCate, setshowSubCate] = useState(false);

  console.log(mainTaskcat);
  function getSubcatData() {
    if (mainTaskcat === "Personal Care") {
      setSubcatTask(getTask.personalCare);
    } else if (mainTaskcat === "Health") {
      setSubcatTask(getTask.medical);
    } else if (mainTaskcat === "Mobility") {
      setSubcatTask(getTask.mobility);
    } else if (mainTaskcat === "Diet") {
      setSubcatTask(getTask.diet);
    } else if (mainTaskcat === "Companionship") {
      setSubcatTask(getTask.companionship);
    } else if (mainTaskcat === "PRN Meds") {
      setSubcatTask(getTask.PRNMeds);
    } else if (mainTaskcat === "Housekeeping") {
      setSubcatTask(getTask.houseKeeping);
    } else if (mainTaskcat === "Report Incident") {
      setSubcatTask(getTask.reportIncident);
    }
  }

  //assign To FOR
  function getTaskapi() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_BASEURL}/getTask`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setgetTask(response.data.taskData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const [comments, setcomments] = useState("");
  const [shift_type, setshift_type] = useState("");
  const [start_time, setstart_time] = useState("");
  const [end_time, setend_time] = useState("");
  const [arrayTask, setarrayTask] = useState([]);
  const [arrayTaskWithImage, setarrayTaskWithImage] = useState([]);
  // const [arr, setArr] = useState(getTaskdata)
  const [arrImage, setArrImage] = useState(getTaskdata);
  const [displayList, setDisplayList] = useState(getTaskdata);
  const [displayListWithImage, setDisplayListWithImage] = useState(getTaskdata);
  console.log(
    arrImage,
    displayList,
    displayListWithImage,
    "jhgdjhagsjh==========="
  );
  const [shift_TypeValue, setshift_TypeValue] = useState("1");
  const onCreatedTask = function (
    ShiftType = "1",
    startTime,
    endTime,
    taskName,
    taskType,
    selectedImage,
    comments
  ) {
    if (arrImage.length > 0) {
      const shiftType = ShiftType === "1" ? "within time" : "specific time";
      arrImage.push({
        shiftType,
        startTime,
        endTime,
        taskName,
        taskType,
        selectedImage,
        comments,
      });
      setarrayTaskWithImage(arrImage);
      console.log(
        arrImage,
        arrayTask,
        arrayTaskWithImage,
        "arrayTaskWithImage==========="
      );
    } else {
      console.log("jhgdjhagsjh====+++++++++++=======");
      const shiftType = ShiftType === "1" ? "within time" : "specific time";
      arrImage.push({
        shiftType,
        startTime,
        endTime,
        taskName,
        taskType,
        selectedImage,
        comments,
      });
      setarrayTaskWithImage(arrImage);
      console.log(
        arrImage,
        arrayTask,
        arrayTaskWithImage,
        "arrayTaskWithImage===========22"
      );
    }
    setDisplayListWithImage(arrImage);
    console.log("==============", arrImage);
    props.onAddTask(arrImage);
    props.arrTaskLength(arrImage.length);
    console.log("-----------------------", displayListWithImage);
    setstart_time("");
    setend_time("");
    // setmainTaskcat('Please select a category')
    settext("Please select sub category");
  };

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  // handle onChange event of the dropdown
  const handleChange = (e) => {
    console.log(e);
    setmainTaskcat(e.Ctg);
    setSelectedImage(e.value - 1);
    setSelectedOption(e);
  };
  console.log("selectedImage", selectedImage);
  console.log(mainTaskcat);

  const propseditDataDelete = () => {
    props.onAddTask(displayListWithImage);
  };

  const handleDelete = (index) => {
    console.log("hjhkjhj", index);
    displayListWithImage.splice(index, 1);
    console.log(displayListWithImage, "1234567890");
    setDisplayListWithImage(displayListWithImage);
    propseditDataDelete();
  };
  return (
    <>
      <div className="row">
        <div
          className={`col-md-6 d-${showTask === true ? "none" : "block"}`}
        ></div>
        <div className={`col-md-6 d-${showTask === true ? "block" : "none"}`}>
          <div
            className="row form_box align-items-center mb-3"
            style={{ position: "relative", top: "-3px" }}
          >
            <div className="col-md-12">
              <label className="checkbox checkbox_shift">
                <input
                  type="radio"
                  onChange={(e) => {
                    setshowSubCate(false);
                    setshift_type(e.target.name);
                    setshift_TypeValue(e.target.value);
                  }}
                  name="ShiftTime"
                  value="1"
                  checked={!showSubCate}
                />
                <span className="checkmark">Within Shift Time</span>
              </label>
              <label className="checkbox checkbox_shift">
                <input
                  type="radio"
                  onChange={(e) => {
                    setshowSubCate(true);
                    setshift_type(e.target.name);
                    setshift_TypeValue(e.target.value);
                  }}
                  checked={showSubCate}
                  name="ShiftTime"
                  value="2"
                />
                <span className="checkmark">Specific Time</span>
              </label>
            </div>

            <div
              className="mt-3 desc2"
              id="ShiftTime2"
              style={{
                display: `${showSubCate === true ? "block" : "none"}`,
              }}
            >
              <div className="row form_box align-items-center mb-3">
                <label className="form-label col-md-4 mb-0">
                  Starting Time:
                </label>
                <div className="col-md-8">
                  <input
                    type="time"
                    value={start_time}
                    onChange={(e) => setstart_time(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row form_box align-items-center mb-3">
                <label className="form-label col-md-4 mb-0">Ending Time:</label>
                <div className="col-md-8">
                  <input
                    type="time"
                    value={end_time}
                    onChange={(e) => setend_time(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="dropdown category_dropdown mb-3 category_dropdown_1">
              <Select
                placeholder="Please Select a Category"
                value={selectedOption}
                options={data}
                onChange={handleChange}
                getOptionLabel={(e) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img alt="" id="cateimg" src={e.image} />{" "}
                    <span style={{ marginLeft: 5 }}>{e.Ctg}</span>
                  </div>
                )}
              />
            </div>
            <div className="dropdown category_dropdown category_dropdown_2">
              <button
                className="btn dropdown-toggle"
                onClick={() => {
                  getSubcatData();
                }}
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span id="textname2">{text}</span>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {SubcatTask.map(function (items, index) {
                  return (
                    <li
                      key={index}
                      data-name={items}
                      className={active === index ? "active" : ""}
                      onClick={() => {
                        setactive(index);
                        settext(items);
                      }}
                    >
                      {items}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="row form_box align-items-center mb-3 mt-3">
              <label className="form-label col-md-4 mb-0"> Comments:</label>
              <div className="col-md-8">
                <div className="position-relative">
                  <input
                    autoComplete="off"
                    type="text"
                    value={comments}
                    onChange={(e) => setcomments(e.target.value)}
                    className="form-control keytype"
                    name="comments"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-8 mt-4 text-end">
              <button
                type="button"
                className="btn add_task"
                onClick={() => {
                  onCreatedTask(
                    shift_TypeValue,
                    start_time,
                    end_time,
                    mainTaskcat,
                    text,
                    selectedImage,
                    comments
                  );
                  setshowCate(true);
                }}
              >
                Update Task
              </button>
              <br />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row form_box align-items-center mb-3">
            <div className="col-md-8">
              <button
                type="button"
                className="btn add_task"
                onClick={() => {
                  setshowTask(true);
                  props.reverse();
                }}
              >
                Add Task
              </button>
              <br />
              {props.isAddTaskValid && displayListWithImage.length === 0 && (
                <span style={{ color: "red" }}>
                  At least one task should be added
                </span>
              )}
            </div>
            <label className="form-label col-md-4 mb-0">
              <b>Task List</b>
            </label>
          </div>
          {displayListWithImage.map((arr, i) => {
            console.log("%%%%%", arr, i);
            return (
              <div
                key={i}
                className="row form_box addedTaskList align-items-center mb-2 "
              >
                <div className="added_task">
                  <div
                    className={`category d-${
                      showCate === true ? "block" : "none"
                    } `}
                  >
                    <img
                      alt=""
                      id="cateimgresult"
                      src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s${
                        arr.selectedImage + 1
                      }.svg`}
                    />
                    <span id="catenameresult">{arr.taskName}</span>
                  </div>
                  <div
                    className={`category d-${
                      showCate === true ? "block" : "none"
                    } `}
                  >
                    <button className="btn" id="textnameresult">
                      {arr.taskType}
                    </button>
                    <button
                      className="closeBtn"
                      onClick={() => {
                        handleDelete(i);
                      }}
                    >
                      ✖
                    </button>
                  </div>
                </div>
                <div className="timeBox">
                  {arr.shiftType == "within time" || "" ? (
                    <div></div>
                  ) : (
                    <div
                      className={`category d-${
                        showCate === true ? "block" : "none"
                      } `}
                    >
                      <div className="timeCt">Start Time : {arr.startTime}</div>{" "}
                      <div className="timeCt">End Time : {arr.endTime}</div>
                    </div>
                  )}
                </div>
                <div className="timeCt">comments : {arr.comments}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EditTask;
