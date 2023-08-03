import React, { useState, useEffect } from "react";
import "../Medicines/medicines.css";
import axios from 'axios';
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import MedicineTable from "./medicineTable";
import MediDemoData from "./scheduleMed/MediDemoData";
import InsideMedicineTable from "./insideMedicineTable";


function AddMedicines() {
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

  const [rowsData, setrowData] = React.useState([]);
  const [rowDataDetail, setRowDataDetail] = React.useState([]);
  const [openMedTable, setOpenMedTable] = React.useState(false);
  const [openInsideMedTab, setOpenInsideMedTab] = React.useState(false);
  const [allMedicines, setAllMedicines] = React.useState([]);
  const [clientId, setClientId] = React.useState('');


  const getClientRowData = () => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/getClient?careHomeId=${localStorage.getItem('carehomeId')}`,
      method: 'GET',
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let ClientData = res.data.clientListing;
        let ownersData = [];
        ClientData.forEach((element, index) => {
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


  function medicinedetails(type, id) {
    setClientId(id);
    let rowDetails = [];
    if (id) {
      rowsData.forEach(element => {
          if (id === element.id) {
            rowDetails = element.medication;
          }
      });
      setRowDataDetail(rowDetails)
      setOpenInsideMedTab(type)
      setOpenMedTable(false);
    }
  }

  function showTable(){
    setOpenMedTable(true);
    setOpenInsideMedTab(false)
  }

  useEffect(() => {
    getClientRowData()
    getAllMedicines()
  }, []);

  
  const getAllMedicines = () => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/getAllDMDMedicines`,
      method: 'GET',
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let medicineAllData = res.data.data;
        // console.log(medicineAllData,'medicineAllData')
        let medicines = [];
        for (let i = 0; i < medicineAllData.length; i++) {
          medicines.push({
            label: medicineAllData[i].DESC._text,
            value: medicineAllData[i].APID._text
          })
        }

        setAllMedicines(medicines)
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
                      onClick={() => {setOpenMedTable(false); setOpenInsideMedTab(false)}}
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
                      onClick={() => {setOpenMedTable(true);}}
                    >
                      Add Medicines
                    </button>
                  </li>
                </ul>
                {/* <div className="float-end btns_head">
						<button className="btn btn-theme btn-sm">Emergency Info</button>
					</div> */}
              </div>
              <div className="tab-content ract_tab_data" id="myTabContent" style={{paddingTop: '20px'}}>
                <div
                  className="tab-pane fade show active"
                  id="tab_1"
                  role="tabpanel"
                  aria-labelledby="tabD-1"
                >
                  <MediDemoData />
                </div>
                <div
                  className="tab-pane fade"
                  id="tab_2"
                  role="tabpanel"
                  aria-labelledby="tabD-2"
                >
                  <div className="card-body" style={{padding: '0px'}}>
                    {/* <div className="float-end btns_head">
                      <button
                        className="btn btn-theme btn-sm"
                        onClick={
                        Add
                      </button>
                    </div> */}
                    <div>
                      {openMedTable && <MedicineTable rowsData={rowsData} getClientRowData={getClientRowData} medicinedetails={medicinedetails} />}
                      {openInsideMedTab && <InsideMedicineTable showTable={showTable} idClient={clientId} allMedicines={allMedicines} rowDataDetail={rowDataDetail} getClientRowData={getClientRowData}/>}
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

export default AddMedicines;
