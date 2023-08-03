import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./careteam.css";
import axios from "axios";
import Moment from "react-moment";
import groupItems from "../../utils/utilsHandlerFunctions";
import { Fragment } from "react";
import CareTeamNotes from "./Notes";

const CareTeamJournalAsApp = () => {
  useEffect(() => {
    getJournalbyClientId();
  }, []);

  let params = useParams();
  // console.log(params);
  const [journalData, setJournalData] = useState([]);
  const [careteamJournal, setcareteamJournal] = useState({});

  const getJournalbyClientId = () => {
    console.log(" jakas jakas jakas");
    axios({
      // url: `${process.env.REACT_APP_BASEURL}/journal?clientId=${params.id}`,
      url: `http://192.168.1.22:8700/admin/CareMemberJournal?careTeamId=62c2bffde5dc361f5456fda8`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let ClientData = res?.data?.result;
        console.log(ClientData, "CareTeam Jounal");
        let careteamJournals = [];
        ClientData?.forEach((shift) => {
          const shiftdata = shift?.shiftData;
          console.log(shiftdata, "shift Jounal");
          careteamJournals.push({
            _shiftId: shift?._id,
            _id: shiftdata?._id,
            Date: shiftdata?.Date,
            endDate: shiftdata?.endDate,
            Task: shiftdata?.Task,
            notesData: shiftdata?.notesData,
            forClient: shiftdata?.forClient,
            startingTime: shiftdata?.startingTime,
            endingTime: shiftdata?.endingTime,
            careTeamId:
              "careTeamId" in shiftdata
                ? shiftdata?.careTeamId
                : shiftdata?.careTeamId,
            checkinDateTime: shiftdata?.checkinDateTime,
            checkoutDateTime: shiftdata?.checkoutDateTime,
            forClient: shiftdata?.forClient,
            clientId: shiftdata?.clientId,
            shiftApprovalstatus: shiftdata?.shiftApprovalstatus,
            shiftEndDatetime: shiftdata?.shiftEndDatetime,
            status: shiftdata?.status,
            templateType: shiftdata?.templateType,
            wellbeingAssessment:
              "wellbeingAssessment" in shiftdata
                ? shiftdata?.wellbeingAssessment
                : {},
          });
        });

        let groupdate = groupItems(careteamJournals, "Date");
        groupdate = Object.entries(groupdate).map(([k, v]) => ({ [k]: v }));

        console.log(groupdate, "groupItems");

        setJournalData(groupdate);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const calendarStrings = {
    lastDay: "[Yesterday ]",
    sameDay: "[Today ]",
    nextDay: "[Tomorrow ]",
    lastWeek: "[last] dddd []",
    nextWeek: "dddd []",
    sameElse: "L",
  };
  console.log(careteamJournal, "careteamJournal");
  return (
    <>
      <div className="row clientList">
        <div className="col-md-6">
          <ul className="menuList">
            {journalData?.map((journal, jIndex) => {
              const date = Object.keys(journal);
              const datewisejournal = Object.values(journal).flatMap(
                (num) => num
              );
              console.log(datewisejournal, "datewisejournal");
              return (
                <Fragment key={jIndex}>
                  <h5 className="titlen">
                    <strong>
                      <Moment calendar={calendarStrings}>{date}</Moment>
                    </strong>{" "}
                    <br />
                    <Moment format="Do MMM YYYY">{date}</Moment>
                  </h5>
                  {datewisejournal.map((item, index) => {
                    console.log(item, "datewisejournla specific item");
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          setcareteamJournal(item);
                        }}
                      >
                        <NavLink to="#">
                          <img alt="" src={item?.clientId[0]?.image} />
                          <div className="body">
                            <p>
                              {item?.startingTime} - {item?.endingTime}
                            </p>
                            <h5>{item?.notesData[0]?.notesData}</h5>
                          </div>
                        </NavLink>
                      </li>
                    );
                  })}
                </Fragment>
              );
            })}
          </ul>
        </div>
        {Object.keys(careteamJournal).length !== 0 && (
          <CareTeamNotes careteamJournal={careteamJournal} />
        )}
      </div>
    </>
  );
};

export default CareTeamJournalAsApp;
