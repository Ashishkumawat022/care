import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../Analytics/analytics.css";
import DatePicker from "react-datepicker";
import LineChart from "./LineChart";

export default function Graphs(props) {
  const {
    graphStaticData,
    dailyBasisVals,
    filterType,
    setFilterType,
    weekDayNames,
    customDates,
    churnRate
  } = props;


  return (
    <>
        <div className="row ms-3">
          {/* <div className="col-md-12">
            <ul className="filter_box me-4">
              <NavLink
                exact
                activeClassName={filterType === "today" ? "active" : ""}
                to="#"
                onClick={() => filterChangeHandler("today")}
              >
                Today
              </NavLink>
              <NavLink
                activeClassName={filterType === "week" ? "active mx-4" : "mx-4"}
                to="#"
                onClick={() => filterChangeHandler("week")}
              >
                This Week
              </NavLink>
              <NavLink
                activeClassName={filterType === "custom" ? "active" : ""}
                to="#"
                onClick={() => filterChangeHandler("custom")}
              >
                Custom
              </NavLink>
              {filterType === "custom" ? (
                <div>
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                      dateRangeChangeHandler(update);
                      setDateRange(update);
                    }}
                    isClearable={true}
                  />
                </div>
              ) : (
                <div className="container mb-1">&ensp;</div>
              )}
            </ul>
          </div> */}
          <LineChart
            title="New Signups"
            filterType={filterType}
            dailyBasisVals={dailyBasisVals.newSignUpsArr}
            weekDayNames={weekDayNames}
            customDates={customDates}
            navigateLink="/superadmin/reports/Subscriptions/newSignUps"
          />
          <LineChart
            title="Activations"
            filterType={filterType}
            dailyBasisVals={dailyBasisVals.activationsArr}
            weekDayNames={weekDayNames}
            customDates={customDates}
            navigateLink="/superadmin/reports/Subscriptions/activations"
          />
          <LineChart
            title="Cancellations"
            filterType={filterType}
            dailyBasisVals={dailyBasisVals.cancellationsArr}
            weekDayNames={weekDayNames}
            customDates={customDates}
            navigateLink="/superadmin/reports/Subscriptions/cancellations"
          />
          <LineChart
            title="MRR"
            filterType={filterType}
            dailyBasisVals={dailyBasisVals.MRR}
            weekDayNames={weekDayNames}
            customDates={customDates}
            navigateLink="/superadmin/reports/Revenue/MRR"
          />
          <LineChart
            title="MSCR"
            filterType={filterType}
            dailyBasisVals={dailyBasisVals.MSCR}
            weekDayNames={weekDayNames}
            customDates={customDates}
            navigateLink="/superadmin/reports/Revenue/MSCR"
          />
          <LineChart
            title="ARPU"
            filterType={filterType}
            dailyBasisVals={dailyBasisVals.ARPU}
            weekDayNames={weekDayNames}
            customDates={customDates}
            navigateLink="/superadmin/reports/Revenue/ARPU"
          />
        </div>

        <div className="row border-bottom">
          <div className="card mb-0 col-md-2 justify-content-end">
            <h4 className="card-title ms-4 text-bottom"> Trials</h4>
          </div>
          <div className="col-3">
            <h4 className="card-title text-center">
              {" "}
              {graphStaticData.trialActive}
            </h4>
            <p className="text-center">Active</p>
          </div>
          <div className="col-3">
            <h4 className="card-title text-center">
              {" "}
              {graphStaticData.expiringIn1Week}
            </h4>
            <p className="text-center">Expiring in 1 Week</p>
          </div>
          <div className="col-3">
            <h4 className="card-title text-center">
              {" "}
              {graphStaticData.expiringIn2Week}
            </h4>
            <p className="text-center">Expiring in 2 Week</p>
          </div>
        </div>

        <div className="row mt-4 border-bottom">
          <div className="card mb-0 col-md-2 justify-content-end">
            <h4 className="card-title ms-4 text-bottom"> Clients</h4>
          </div>
          <div className="col-3">
            <h4 className="card-title text-center">
              {" "}
              {graphStaticData.clientActive}
            </h4>
            <p className="text-center">Active</p>
          </div>
          <div className="col-3">
            <h4 className="card-title text-center">
              {" "}
              {graphStaticData.subscriptionActive}
            </h4>
            <p className="text-center">Sites</p>
          </div>
          <div className="col-3">
            <h4 className="card-title text-center">
              {churnRate} %
            </h4>
            <p className="text-center">Churn Rate</p>
          </div>
        </div>

        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              Deeveloper to suggest and implement what other KPIs can be
              implemented here and also integrating <br />
              Google Analytics.
            </div>
          </div>
        </div>
      </>
  );
}
