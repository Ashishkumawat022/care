import React, { useEffect } from "react";
import "../Clients/clients.css";
import WellBeingChart from "../Clients/WellBeingChart";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import Footer from "../Footer/footer";
import Performance from "../CareTeam/Performance";
import Card from "./Card";
import GlobalContext from "../store/global-context";
import { useState, useContext } from "react";
import axios from "axios";

function Report() {

  const globalCtx = useContext(GlobalContext);
  const [searchData, setSearchData] = useState([]);
  const [DocsTableData, setDocsTableData] = useState([]);

  useEffect(() => {
    getClientRowData();
    getCareTeamRowData();
  }, []);

  const getClientRowData = () => {
    axios({
      url: `${process.env.REACT_APP_BASEURL
        }/getClient?careHomeId=${localStorage.getItem("carehomeId")}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let ClientData = res.data.clientListing;
        console.log(res.data, "getClientData");
        let data = ClientData.map((item) => {
          return (
            {
              id: item._id,
              name: `${item.first_Name.trim() + " " + item.last_Name.trim()}`,
            }
          );
        });
        setSearchData(data);
        console.log(data, "full")
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const getCareTeamRowData = () => {
    axios({
      url: `${process.env.REACT_APP_BASEURL
        }/getCareteam?careHomeId=${localStorage.getItem("carehomeId")}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let CareTeamData = res.data.careteamListing;
        let data = CareTeamData.map((item) => {
          return {
            id: item._id,
            name: `${item.first_Name.trim() + " " + item.last_Name.trim()}`,
          };
        });
        setDocsTableData(data);
        console.log(data, "gull")
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  // useEffect(() => {
  //   searchForApi();
  // }, [globalCtx.searchFor]);

  // function searchForApi() {
  //   let data = JSON.stringify({
  //     name: searchFor,
  //     careHomeId: localStorage.getItem("carehomeId"),
  //   });
  //   let config = {
  //     method: "post",
  //     url: `${process.env.REACT_APP_BASEURL}/filterFor`,
  //     headers: {
  //       Authorization: localStorage.getItem("care_admin_token"),
  //       "Content-Type": "application/json",
  //     },
  //     data: data,
  //   };
  //   // console.log(config);
  //   axios(config)
  //     .then(function (response) {
  //       // console.log(response.data);
  //       setAPIData(response.data.clientData);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  console.log(
    globalCtx.searchInput +
    "-" +
    globalCtx.searchType +
    "-" +
    globalCtx.startDate +
    "-" +
    globalCtx.endDate
  );
  return (
    <>
      <Header />
      <Sidebar />
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <div className="top_menubar">
                <Card
                  chartClientdata={searchData}
                  chartCareTeamdata={DocsTableData}
                />
              </div>
              {globalCtx.searchType === "Clients" && (
                <WellBeingChart searchInput={globalCtx.searchInput} />
              )}
              {globalCtx.searchType === "Care Team Member" && <Performance />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
