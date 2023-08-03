import React, { useState, useEffect, Fragment } from "react";
import { NavLink, useParams } from "react-router-dom";
import Moment from "react-moment";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Accordion from "react-bootstrap/Accordion";
import { FaAngleDown } from "react-icons/fa";
import { taskImages } from "../../constants/roles";

const ClientNotes = (props) => {
  let { clientJournal } = props;
  console.log(clientJournal, "clientJournal");
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
    <>
      <div className="col-md-6 tabbingMenu">
        {clientJournal?.careTeamId.length > 0 && (
          <ul className="menuList">
            <li>
              <NavLink to="#">
                <img
                  alt="careteam-profile"
                  src={clientJournal?.careTeamId[0]?.image}
                />
                <div className="body">
                  <h5>{clientJournal?.careTeamId[0]?.first_Name}</h5>
                  <p>
                    {clientJournal?.startingTime} - {clientJournal?.endingTime}{" "}
                    <span className="ms-3">
                      <Moment format="Do MMM YYYY">
                        {clientJournal?.Date}
                      </Moment>
                    </span>
                  </p>
                </div>
              </NavLink>
            </li>
          </ul>
        )}

        <Tab.Container id="left-tabs-example" defaultActiveKey="taB1">
          <Nav variant="pills">
            <Nav.Item>
              <Nav.Link eventKey="taB1">Tasks</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="taB2">Care Notes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="taB3">Family Notes</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="taB1">
              <ul className="TasksList">
                {"wellbeingAssessment" in clientJournal && (
                  <Fragment>
                    <li>
                      <div className="listRow">
                        <img src="http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s9.svg" />
                        Wellbeing Assessment
                        <input
                          readOnly
                          type="checkbox"
                          checked={
                            clientJournal?.wellbeingAssessment?.status ===
                            "true"
                          }
                        />
                      </div>
                      {/* <p>Please assist Margaret with the bathing. </p> */}
                    </li>
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <FaAngleDown />
                        </Accordion.Header>
                        <Accordion.Body>
                          <ul>
                            {Object.entries(
                              clientJournal?.wellbeingAssessment
                            ).map((item, index) => {
                              let [wcategory, rating] = item;
                              let ratingCount = [1, 2, 3, 4, 5, 6];
                              let displayCategory = "";
                              if (wcategory === "overallMood") {
                                displayCategory = "Overall Mood";
                              } else if (wcategory === "sleep") {
                                displayCategory = "Sleep";
                              } else if (wcategory === "pain") {
                                displayCategory = "Pain";
                              } else if (wcategory === "diet") {
                                displayCategory = "Diet";
                              } else if (wcategory === "partcipation") {
                                displayCategory = "Partcipation";
                              } else if (wcategory === "bowels") {
                                displayCategory = "Bowels";
                              } else if (wcategory === "activity") {
                                displayCategory = "Activity";
                              }
                              if (index === 7) return;

                              return (
                                <li>
                                  <label>{displayCategory}</label>
                                  <div>
                                    {ratingCount.map((count) => (
                                      <button>
                                        <img
                                          className={
                                            rating !== 0 && rating <= 6
                                              ? "wellbineColor"
                                              : ""
                                          }
                                          src={`../../images/is${count}.svg`}
                                        />
                                      </button>
                                    ))}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Fragment>
                )}
                {clientJournal?.Task?.map((task, index) => {
                  console.log(
                    task,

                    "clientJournalTask"
                  );
                  if (
                    "schedule" in task &&
                    "medType" in task &&
                    "medName" in task
                  ) {
                    return (
                      <li key={index}>
                        <div className="listRow">
                          <img
                            alt=""
                            src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s10.svg`}
                          />
                          Medication Reminder{`    `}{" "}
                          {task?.schedule.split(" - ")[0]}
                          <input
                            readOnly
                            type="checkbox"
                            checked={task?.status === "done"}
                          />
                        </div>
                        <p>
                          {clientJournal?.forClient} medication {task?.medName}{" "}
                          is due at{" "}
                          <Moment format="LT">
                            {`${clientJournal?.Date} ${
                              task?.schedule.split(" - ")[0]
                            }:00`}
                          </Moment>
                          . Please pass her the meds.
                        </p>
                      </li>
                    );
                  }
                  return (
                    <li key={index}>
                      <div className="listRow">
                        {taskImages?.map((images, i) => {
                          if (images?.Ctg == task?.taskName?.trim()) {
                            return (
                              <img
                                alt=""
                                src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s${images?.value}.svg`}
                              />
                            );
                          }
                        })}
                        {/* <img src="http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s1.svg" /> */}
                        {task?.taskName}
                        <input
                          readOnly
                          type="checkbox"
                          checked={task?.status === "true"}
                        />
                      </div>
                      <p>
                        Please assist {clientJournal?.forClient} with the{" "}
                        {task?.taskType === "Bathing" ? "Bath" : task?.taskType}
                        .
                      </p>

                      {/* <p>Please assist Margaret with the bathing. </p> */}
                    </li>
                  );
                })}
              </ul>
            </Tab.Pane>
            <Tab.Pane eventKey="taB2">
              {clientJournal?.notesData.length > 0 &&
                clientJournal?.notesData?.map(({ notesData, _id }) => (
                  <p key={_id}>{notesData}</p>
                ))}
            </Tab.Pane>
            <Tab.Pane eventKey="taB3">
              <img
                style={{ width: "300px" }}
                src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
              />

              <p>Margaret had a great time at her Birthday today. </p>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </>
  );
};

export default ClientNotes;
