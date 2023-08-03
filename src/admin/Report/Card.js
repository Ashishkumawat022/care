import { BsFilterSquare } from "react-icons/bs";
import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Card.css';
import { useContext } from "react";
import GlobalContext from "../store/global-context";

const Card = (props) => {
  const globalCtx = useContext(GlobalContext);
  const [searchdata, setsearchdata] = useState([])
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  let params = useParams();
  console.log(params);
  console.log(props.chartClientdata, "chartClientdata");
  console.log(props.chartCareTeamdata, "chartCareTeamdata");
  // const { clientSearch } = props.chartClientdata;
  // const [value, onChange] = useState([new Date(), new Date()]);

  let clientSearchList =
    props.chartClientdata.map((item) => {
      console.log(item, "item");
      return ({
        value: item.id,
        label: item.name
      });
    });

  let cSearchList = props.chartCareTeamdata.map((item) => {
    console.log(item, "item");
    return ({
      value: item.id,
      label: item.name,
    });
  });
  //  console.log(cSearchList);

  const handleChange = (event) => {
    console.log(event, "handleChange");
  };

  const type = [
    {
      value: 1,
      label: "Clients",
    },
    {
      value: 2,
      label: "Care Team Member",
    },
  ];

  const options = [
    {
      value: 1,
      label: "overallMood",
    },
    {
      value: 2,
      label: "sleep",
    },
    {
      value: 3,
      label: "partcipation",
    },
    {
      value: 4,
      label: "diet",
    },
    {
      value: 5,
      label: "bowels",
    },
    {
      value: 6,
      label: "activity",
    },
    {
      value: 7,
      label: "pain",
    },
  ];

  const careTeamOptions = [
    {
      value: 1,
      label: "Overdue tasks",
    },
    {
      value: 2,
      label: "Friends & Family Rating",
    },
    {
      value: 3,
      label: "Shift Punctuality Rating",
    },
    {
      value: 4,
      label: "Task Punctuality Rating",
    },
    {
      value: 5,
      label: "Performance (%) Formula",
    },
    {
      value: 6,
      label: "No. of total hours per week",
    },
  ];

  return (
    <>
      <div className="btns_head wellbeign_list">
        <h5 className="tb_title mt-0">
          <div className="row align-item-center">
            <div className="col-md-3">
              <div className="dropdown category_dropdown mb-3 category_dropdown_1">
                <Select
                  placeholder="Clients"
                  value={globalCtx.selectedType}
                  options={type}
                  onChange={globalCtx.handleType}
                  getTypeLabel={(e) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginLeft: 5 }}>{e.label}</span>
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="dropdown category_dropdown mb-3 category_dropdown_1">
                <Select
                  placeholder="Category"
                  value={globalCtx.selectedOption}
                  options={globalCtx.searchType === "Clients"
                  ? options
                  : careTeamOptions}
                  onChange={globalCtx.handleChange}
                  getOptionLabel={(e) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span style={{ marginLeft: 5 }}>{e.label}</span>
                    </div>
                  )}
                />
              </div>
            </div>
            {
              <div className="col-md-3">
                {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => {
                    setDateRange(update);
                  }}
                  isClearable={true}
                />
              </div>
            }
            <div className="col-md-3">
              <button className=" mb-4 btn btn-theme btn-sm float-end">
                Download
              </button>
              <button
                className=" mb-4 btn btn-theme btn-sm float-end"
                onClick={() => window.print()}
              >
                Print
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <Select
                isMulti
                value={globalCtx.searchFor}
                options={
                  globalCtx.searchType === "Clients"
                    ? clientSearchList
                    : cSearchList
                }
                onChange={globalCtx.handleSearch}
                className="basic-multi-select"
                classNamePrefix="select"
                getSearchLabel={(e) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginLeft: 5 }}>{e.label}</span>
                  </div>
                )}
              />
            </div>
          </div>
        </h5>
      </div>
    </>
  );
};

export default Card;
