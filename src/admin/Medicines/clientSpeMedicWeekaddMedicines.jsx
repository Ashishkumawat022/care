import React, { useState, useEffect } from "react";
import "../Medicines/medicines.css";
import axios from 'axios';
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import MedicineTable from "./medicineTable";
import MediDemoData from "./scheduleMed/MediDemoData";
import ClientMedicinesWeekScheduleMediDemoData from "./clientSpeMedicWeek/clientSpeMedicWeekMediDemoData";

const headCells = [
  {
    id: "no",
    numeric: false,
    disablePadding: true,
    label: "No.",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "location",
    numeric: true,
    disablePadding: false,
    label: "Location",
  },
  {
    id: "advancedirective",
    numeric: true,
    disablePadding: false,
    label: "Advance Directive",
  },
  {
    id: "allergies",
    numeric: true,
    disablePadding: false,
    label: "Allergies",
  },
  {
    id: "conditions",
    numeric: true,
    disablePadding: false,
    label: "Conditions",
  },
  {
    id: "noofmedicines",
    numeric: true,
    disablePadding: false,
    label: "No. of Medicines",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
];

function ClientMedicinesWeekSchedule() {
  // -------------- Sunday shifts timing ----------------- //
  // const [sundaysfield, setsundaysfiled] = useState('')
  // const [sundaysendfield, setsundaysendfiled] = useState('')
  // const [sundaysFields, setsundaysfields] = useState([])


  // const handlesundaysChange = (starttime, endtime) => {
  //   setsundaysfields(prev => [...prev, { starttime, endtime }])
  //   setsundaysfiled('')
  // }

  // const sundaysRemoveChangeHandler = (removeIdx) => {
  //   const clonefield = sundaysFields.slice();
  //   const data = clonefield.splice(removeIdx, 1)
  //   setsundaysfields(clonefield)
  // }

  let [rowsData, setrowData] = useState([]);

  useEffect(() => {
    getClientRowData()
  }, []);
  const getClientRowData = () => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/getClient?careHomeId=${localStorage.getItem('carehomeId')}`,
      method: 'GET',
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let ClientData = res.data.clientListing;
        console.log(res.data, "getClient");
        let ownersData = [];
        ClientData.forEach((element, index) => {
          console.log("ClientDataClientData");
          ownersData.push({
            no: index,
            id: element._id,
            image: element.image,
            name: `${element.first_Name?.trim()} ${element.last_Name?.trim()}`,
            location: element.location,
            advancedirective: element.advance_Directive,
            allergies: element.medical_Conditions.map((item) => item.name).join(','),
            conditions: element?.medical_Conditions.map((item) => item.type).join(','),
            medication: element?.medication,
            noofmedicines: 0,
            status: true,
            // redirectionLink: `/superadmin/clientdetails/${element._id}`,
          })
        });
        setrowData(ownersData);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
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
                      Schedule
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="tabD-2"
                      data-bs-toggle="tab"
                      data-bs-target="#tab_2"
                      type="button"
                      role="tab"
                      aria-controls="tab_2"
                      aria-selected="false"
                    >
                      Add Medicines
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
                  <ClientMedicinesWeekScheduleMediDemoData />
                </div>
                <div
                  className="tab-pane fade"
                  id="tab_2"
                  role="tabpanel"
                  aria-labelledby="tabD-2"
                >
                  <div className="card-body">
                    {/* <div className="float-end btns_head">
                      <button
                        className="btn btn-theme btn-sm"
                        onClick={handleShow2}
                      >
                        Add
                      </button>
                    </div> */}
                    <div>
                      <MedicineTable headCells={headCells} rows={rowsData} getClientRowData={getClientRowData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer fcolor="green" /> */}


    </>
  );
}

export default ClientMedicinesWeekSchedule;
