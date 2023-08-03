import React, { useEffect, useState } from "react";
import "../ShiftTask/CreateShiftTask.css";
import { BsFillCameraFill } from "react-icons/bs";
import axios from "axios";
import AddTask from "./AddTask";
import { useHistory } from "react-router-dom";
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
function GenericShiftcreation(props) {
  const { register, handleSubmit, formState: { errors }, getValues
  } = useForm();

  const history = useHistory()
  console.log(props.shownShiftTaskUI, "++_____++++++++___+");

  //post shift data
  const [image, setimage] = useState("");
  const [displayList, setdisplayList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [arrLength, setarrLength] = useState("");
  const [isAddTaskValid, setIsAddTaskValid] = useState(false);

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

  const onarrTaskLengthHandler = (arrLength) => {
    console.log("==========>>>AAKASH>", arrLength);
    setarrLength(arrLength);
  };

  const reverse = () => {
    setIsAddTaskValid(false);
  };

  const onSubmit = (data) => {
    console.log(data, data.recurringshift);
    console.log(arrLength, "arrLength")
    if (arrLength) {
      let recurringTaskvalue;

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
          startingTime: data.startTime,
          endingTime: data.endTime,
          recurringTask: data.recurringshift === '1' ? true : false,
          recurringTasktype: data?.weekdays ? data.weekdays.join(',') : '',
          instruction: data.instruction,
          endDate: data.endDate ? data.endDate : '',
          shift_type: ShifType,
          start_time: start_time,
          end_time: end_time,
          task_name: mainTaskcat,
          task_type: text,
          templateType: 'generic',
          comments: comments,
          shiftName: data.shiftName
        })
      } else {
        shiftdata.push({
          careHomeId: localStorage.getItem("carehomeId"),
          Date: data.date,
          startingTime: data.startTime,
          endingTime: data.endTime,
          recurringTask: data.recurringshift === '1' ? true : false,
          recurringTasktype: data.weekdays ? data.weekdays.join(',') : '',
          instruction: data.instruction,
          endDate: '',
          shift_type: ShifType,
          start_time: start_time,
          end_time: end_time,
          task_name: mainTaskcat,
          task_type: text,
          templateType: 'generic',
          comments: comments,
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
          // window.location.reload(false);
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
                    <label className="form-label col-md-4 mb-0">
                      Date (Optional) :
                    </label>
                    <div className="col-md-8">
                      <input
                        type="date"
                        name="date"
                        // value={date}
                        {...register("date")}
                        // onChange={(e) => setdate(e.target.value)}
                        className="form-control"
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
                                  {...register("weekdays", {
                                    required: getValues('recurringshift') === '1' ? true : false,
                                    onChange: (e) => {
                                      handleChange(e)
                                    }
                                  })}
                                  name="weekdays"
                                  value={item.id}
                                  type="checkbox"
                                  checked={selected.some(
                                    (val) => val === item.id
                                  )}

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
                      placeholder="Instructions (Optional)"
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
export default GenericShiftcreation;
