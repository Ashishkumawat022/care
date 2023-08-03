import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsFilterSquare } from "react-icons/bs";
import Donut from "../Dashboard/tasks-graph";
import ReactApexChart from 'react-apexcharts';
import DonutSales from "./DonutSales";


function SalesOverview() {

  let monthAgoDate = new Date();
  let monthAgo = monthAgoDate.getMonth() - 1;
  monthAgoDate = monthAgoDate.setMonth(monthAgo);

  const [filterType, setFilterType] = useState('today');
  const [dateRange, setDateRange] = useState([monthAgoDate, new Date()]);
  const [startDate, endDate] = dateRange;

  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'Product Trends by Month',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['', '4AM', '8AM', '12AM', '4PM', '8PM', '12PM'],
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: '#585858'
        },
      },
    ],
  });
  const [series, setSeries] = useState([{
    name: 'Revenue',
    data: [0, 41, 35, 51, 49, 62, 73]
  }]);
  return (
    <div className="row">
      <div className="col-md-12">
        <ul className="filter_box">
          <NavLink exact activeClassName="active" to="#">
            Today
          </NavLink>
          <NavLink activeClassName="" to="#">
            This Week
          </NavLink>
          <NavLink activeClassName="" to="#">
            Custom
          </NavLink>
        </ul>
      </div>
      {/* <ReactHookForm /> */}
      {/* <LocationSearchInput /> */}

      <div className="col-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
        <div className="card dashboard_card card_border">
          <div className="card-body">
            <h4 className="card-title">Occupancy</h4>
            <div className="graph_box" style={{ minHeight: '365px' }}>
              <ul>
                <li>
                  Capacity :{" "}
                  <strong style={{ color: "#c580d1" }}>10</strong>
                </li>
                <li>
                  Active Clients :{" "}
                  <strong style={{ color: "#219653" }}>04</strong>
                </li>
              </ul>
              <div className="graph_box_in">
                <DonutSales colors={["#c580d1", "#219653"]} series={[10, 4]} />{" "}
                <span className="count">
                  {4/10*100}% <br />
                  Occupied
                </span>
              </div>
            </div>
            <NavLink to="" className="link">
              See All
            </NavLink>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
        <div className="card dashboard_card card_border">
          <div className="card-body">
            <h4 className="card-title">Occupancy Rates</h4>
            <div className="graph_box">
              <div id="chart">
                <ReactApexChart options={options} series={series} type="line" height={350} />
              </div>
            </div>
            <NavLink to="/superadmin/dashboard" className="link">Sell All</NavLink>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4">
        <div className="card dashboard_card card_border">
          <div className="card-body">
            <h4 className="card-title">Leads in Funnel</h4>
            <div className="graph_box" style={{ minHeight: '365px' }}>
              <ul>
                <li>
                  Total Leads: :{" "}
                  <strong style={{ color: "#818181" }}>10</strong>
                </li>
                <li>
                  Early Stage: :{" "}
                  <strong style={{ color: "#c580d1" }}>04</strong>
                </li>
                <li>
                  Case Closed: :{" "}
                  <strong style={{ color: "#eb5757" }}>01</strong>
                </li>
                <li>
                  Qualified (Q): :{" "}
                  <strong style={{ color: "#2f80ed" }}>01</strong>
                </li>
                <li>
                  Success: :{" "}
                  <strong style={{ color: "#219653" }}>02</strong>
                </li>
              </ul>
              <div className="graph_box_in">
                <DonutSales colors={["#818181", "#c580d1", "#eb5757", "#2f80ed", "#219653"]} series={[10, 10, 30, 20, 30]} />{" "}
                <span className="count">
                  40% <br />
                  Done
                </span>
              </div>
            </div>
            <NavLink to="" className="link">
              See All
            </NavLink>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
        <div className="card dashboard_card card_border">
          <div className="card-body">
            <h4 className="card-title">Revenue</h4>
            <div className="graph_box">
              <div id="chart">
                <ReactApexChart options={options} series={series} type="line" height={350} />
              </div>
            </div>
            <NavLink to="/superadmin/dashboard" className="link">Sell All</NavLink>
          </div>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
        <div className="card dashboard_card card_border">
          <div className="card-body">
            <h4 className="card-title">Wage Costs</h4>
            <div className="graph_box">
              <div id="chart">
                <ReactApexChart options={options} series={series} type="line" height={350} />
              </div>
            </div>
            <NavLink to="/superadmin/dashboard" className="link">Sell All</NavLink>
          </div>
        </div>
      </div>

    </div>
  );
}

export default SalesOverview;
