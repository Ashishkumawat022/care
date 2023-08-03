import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../CareTeam/careteam.css";
import Notes from "./Notes";
import EditCareTeam from "./EditCareTeam";
import AddEditCareTeamDocs from "./AddEditCareTeamDocs";
import AddEditCareTraining from "./AddEditCareTraining";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import CareTeamJournalAsApp from "./CareTeamJournalAsApp";

function CareteamDetails() {
  useEffect(() => {
    getCareTeambyId();
    getNotesbyCareteam();
  }, []);

  let params = useParams();
  console.log(params);
  const [getNotesData, setGetNotesData] = useState([]);
  const getNotesbyCareteam = () => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/getNotesbyCareteam?careTeamId=61cd3dd06cd95e38c3e48d4e`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        console.log(res);
        let CareTeamData = res.data.careteamData;
        console.log(CareTeamData);
        setGetNotesData(CareTeamData);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const getCareTeambyId = () => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/careTeambyId?careteamId=${params.id}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let CareTeamData = res.data.careteamData;
        console.log(CareTeamData);
        CareTeamData.careTeamDocs.forEach((element) => {
          console.log("000000000000000", element);
        });
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  let user = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            {user.role.map((roletype, index) => {
              const Profileaccess = roletype.Modules[2].children[2];
              const Docsaccess = roletype.Modules[2].children[3];
              const Trainingsaccess = roletype.Modules[2].children[4];
              const JournalAccess = roletype.Modules[2].children[5];
              return (
                <div className="card-body" key={index}>
                  <div className="top_menubar">
                    <ul
                      className="nav nav-tabs ract_tab_list border-0"
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="tabD-1"
                          data-bs-toggle="tab"
                          data-bs-target="#tab_1"
                          type="button"
                          role="tab"
                          aria-controls="tab_1"
                          aria-selected="true"
                        >
                          Profile
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="tabDhandleEdit-2"
                          data-bs-toggle="tab"
                          data-bs-target="#tab_2"
                          type="button"
                          role="tab"
                          aria-controls="tab_2"
                          onClick={getCareTeambyId}
                          aria-selected="false"
                        >
                          Docs
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="tabD-3"
                          data-bs-toggle="tab"
                          data-bs-target="#tab_3"
                          type="button"
                          role="tab"
                          aria-controls="tab_3"
                          aria-selected="false"
                        >
                          Trainings
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="tabD-4"
                          data-bs-toggle="tab"
                          data-bs-target="#tab_4"
                          type="button"
                          role="tab"
                          aria-controls="tab_4"
                          aria-selected="false"
                        >
                          Journal
                        </button>
                      </li>
                    </ul>
                    {/* <div className="float-end btns_head">
						<button className="btn btn-theme btn-sm">Emergency Info</button>
					</div> */}
                  </div>
                  <div className="tab-content ract_tab_data" id="myTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="tab_1"
                      role="tabpanel"
                      aria-labelledby="tabD-1"
                    >
                      <EditCareTeam
                        Profileaccess={
                          Profileaccess.access != "full" ? true : false
                        }
                        userType={
                          user.userType === "supervisor" ||
                          user.userType === "deputy_admin"
                            ? false
                            : true
                        }
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="tab_2"
                      role="tabpanel"
                      aria-labelledby="tabD-2"
                    >
                      <AddEditCareTeamDocs
                        Docsaccess={Docsaccess.access != "full" ? true : false}
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="tab_3"
                      role="tabpanel"
                      aria-labelledby="tabD-3"
                    >
                      <AddEditCareTraining
                        Trainingsaccess={
                          Trainingsaccess.access != "full" ? true : false
                        }
                      />
                    </div>

                    <div
                      className="tab-pane fade"
                      id="tab_4"
                      role="tabpanel"
                      aria-labelledby="tabD-4"
                    >
                      <CareTeamJournalAsApp
                        JournalAccess={
                          JournalAccess.access != "full" ? true : false
                        }
                        JournalAccessType={JournalAccess.access}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default CareteamDetails;
