import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import '../CareTeam/careteam.css';
import Moment from "react-moment";
import { taskImages } from "../../constants/roles";
// import 'moment-timezone';
// import moment from 'moment';

const CareTeamActivity = () => {
  useEffect(() => {
    getNotesbyCareteam();
  }, []);

  let params = useParams();
  console.log(params);
  const [getActivityData, setGetActivityData] = useState([]);

  const getNotesbyCareteam = () => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/getActivityandwellbeingChart?careTeamId=61cbf82c85df7941ffed0b1d&type=careteam`,
      // url: `${process.env.REACT_APP_BASEURL}/getActivityandwellbeingChart?clientId=${params.id}&type=careteam||client`,

      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        console.log(res);
        let CareTeamData = res.data.getActivityData;
        console.log("Client Activity Data", CareTeamData);

        setGetActivityData(CareTeamData);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  // const dateToFormat = '1976-04-19T12:59-0500';
  // const dateToFormat = new Date('1976-04-19T12:59-0500');
  // const start = moment().add(-7, 'm');
  // const date = new Date();
  const calendarStrings = {
    lastDay: "[Yesterday ]",
    sameDay: "[Today ]",
    nextDay: "[Tomorrow ]",
    lastWeek: "[last] dddd []",
    nextWeek: "dddd []",
    sameElse: "L",
  };

  return (
    <div
      className="card_inbox journal_card scroll_inside scroll-sidebar"
      style={{ maxHeight: "500px" }}
    >
      <h5>Activity</h5>
      {getActivityData?.map((item, i) => {
        console.log(item, "1234567890-12369234567890");
        console.log(item.createdAt.split("T")[1], "+++==++++===+++");
        console.log(item.Task);
        return (
          <div key={i}>
            <div className="time_box">
              <strong>
                {" "}
                <Moment calendar={calendarStrings}>{item.Date}</Moment>
              </strong>{" "}
              <br />
              <Moment format="Do MMM YYYY">{item.Date}</Moment>
            </div>
            <ul>
              <li className="align-items-center border-bottom">
                <img
                  alt=""
                  src={`${
                    item.clientId?.image == null
                      ? `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`
                      : item.clientId?.image
                  }`}
                  style={{ width: "40px", height: "40px" }}
                />
                <div className="body" style={{ width: "100%" }}>
                  <h5 className="m-0">
                    {`${item.clientId.first_Name} ${item.clientId.last_Name}`}
                    <time>
                      {item?.startingTime} - {item?.endingTime}
                    </time>
                  </h5>
                </div>
              </li>
            </ul>
            <ul className="activity_category">
              {item?.wellbeingAssessment ? (
                <li>
                  <div className="left_activity">
                    <h5>
                      <img
                        alt=""
                        src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s9.svg`}
                      />
                      Wellbeing Assessment
                    </h5>
                    <p>Please complete at the end of each shift.</p>
                  </div>
                  <div className="right_activity">
                    <img
                      alt=""
                      src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/reset.svg`}
                    />
                    <label className="checkbox">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </li>
              ) : (
                ""
              )}
              {console.log(item?.Task[0])}
              {item.Task?.map((task, index) => {
                console.log(task.taskName, " ==========>>>>>>>>>>1111111");
                return (
                  <li key={index}>
                    <div className="left_activity">
                      <h5>
                        {taskImages?.map((images, imageIndex) => {
                          // console.log(images, index, "12345678909876532389")
                          if (images.Ctg == task.taskName.trim()) {
                            // console.log(images.image, "==========>>>>>>>>>>")
                            return (
                              <img
                                key={imageIndex}
                                alt=""
                                src={`${images.image}`}
                              />
                            );
                          }
                        })}
                        {/* <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s1.svg`} /> */}
                        {task.taskName} <span>{task.taskType}</span>
                      </h5>
                      <p>
                        Please assist {item.forClient} with the{" "}
                        {task.taskType === "Bathing" ? "Bath" : task.taskType}.
                      </p>
                    </div>
                    <div className="right_activity">
                      <img
                        alt=""
                        src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/reset.svg`}
                      />
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          defaultChecked={task.status === true ? true : false}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default CareTeamActivity;

// <li>
// <div className="left_activity">
//     <h5>
//         <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s3.svg`} />
//         Mobility <span>Toileting Assist</span>
//     </h5>
//     <p>Please assist Margaret with Toileting. </p>
// </div>
// <div className="right_activity">
//     <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/reset.svg`} />
//     <label className="checkbox">
//         <input type="checkbox" />
//         <span className="checkmark"></span>
//     </label>
// </div>
// </li>
// <li>
// <div className="left_activity">
//     <h5>
//         <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s10.svg`} />
//         Medication Reminder
//     </h5>
//     <p>Margarets medication Azithromycin is due at 7am. Please pass her the meds.</p>
// </div>
// <div className="right_activity">
//     <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/reset.svg`} />
//     <label className="checkbox">
//         <input type="checkbox" />
//         <span className="checkmark"></span>
//     </label>
// </div>
// </li>
