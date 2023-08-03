import React, { useState, useEffect } from "react";
import "../Analytics/analytics.css";
import Graphs from "./Graphs";
import { fetchGet } from "../../Apis/commonApis";
import { NavLink } from "react-router-dom";
import "../Analytics/analytics.css";
import DatePicker from "react-datepicker";

let today = new Date();
let helperArrDate = [];

function Analytics() {
  const [graphStaticData, setGraphStaticData] = useState({});
  const [filterType, setFilterType] = useState("today");
  const [weekDayNames, setWeekDayNames] = useState([]);
  const [customDates, setCustomDates] = useState([]);
  const [churnRate, setChurnRate] = useState('');
  const [dailyBasisVals, setDailyBasisVals] = useState({
    newSignUpsArr: [],
    activationsArr: [],
    cancellationsArr: [],
    MRR: [],
    MSCR: [],
    ARPU: [],
  });

  let monthAgoDate = new Date();
  let monthAgo = monthAgoDate.getMonth() - 1;
  monthAgoDate.setMonth(monthAgo);

  const [dateRange, setDateRange] = useState([monthAgoDate, new Date()]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    let mounted = true;
      if (mounted) {
        getDashboardDetails();
      }

    return () => mounted = false;
  }, []);

  useEffect(() => {
    if (Object.keys(graphStaticData).length !== 0) {
      graphsFilter();
      churnRateCalculation()
    }
  }, [filterType, graphStaticData]);

  const getDashboardDetails = async () => {
    const result = await fetchGet("getDashboardDetails");
    setGraphStaticData(result.data);
    // filterGraphs(result.data);
  };

  function graphsFilter() {
    let dailyBasedHz = [0, 4, 8, 12, 16, 20, 24];
    let dummyDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let weekDayNamesArr = [];
    let weekBasedHz = [];
    let first = today.getDate() - 6;
    for (let i = first; i < first + 7; i++) {
      let day = new Date(today.setDate(i)).toISOString();
      weekBasedHz.push(day);
    }

    for (let i = 0; i < weekBasedHz.length; i++) {
      let dayCount = new Date(weekBasedHz[i]).getDay();
      weekDayNamesArr.push(dummyDayNames[dayCount]);
    }
    setWeekDayNames(weekDayNamesArr);

    let signupCountArr = [];
    let activationCountArr = [];
    let cancellationsCountArr = [];
    let arpuCountArr = [];
    let mrrCountArr = [];
    let mscrCountArr = [];
    if (filterType === "today") {
      for (let i = 0; i < dailyBasedHz.length; i++) {
        let signUpLength = graphStaticData.newSignUps.filter(
          dailyCount(dailyBasedHz[i], "updatedAt")
        ).length;
        let activationsLength = graphStaticData.activations.filter(
          dailyCount(dailyBasedHz[i], "created_at")
        ).length;
        let cancellationsLength = graphStaticData.cancellations.filter(
          dailyCount(dailyBasedHz[i], "created_at")
        ).length;
        let freeClientUpgradLength = graphStaticData.userUpgradedPlans.filter(
          dailyCount(dailyBasedHz[i], "dateOfPlanupgrade")
        ).length;
        let freeClientLength = graphStaticData.freePlanUsers.filter(
          dailyCount(dailyBasedHz[i], "createdAt")
        ).length;
        let arpu = graphStaticData.ARPU.filter(
          dailyCountArpu(dailyBasedHz[i], "created_at")
        );
        let mscrLength = (freeClientUpgradLength / (freeClientLength ? freeClientLength : 1)) * 100
        signupCountArr.push(signUpLength);
        activationCountArr.push(activationsLength);
        cancellationsCountArr.push(cancellationsLength);
        mscrCountArr.push(mscrLength);
        let arpuCount = 0;
        // arpu.forEach((elem) => {
        //     arpuCount = arpuCount + elem.amount / (arpu.length ? arpu.length : 1);
        // });
        if (arpu.length > 0) {
          arpu.forEach((elem) => {
            arpuCount = arpuCount + elem.amount / arpu.length;
          });
        }
        let mrrCount = arpuCount * arpu.length;
        arpuCountArr.push(arpuCount.toFixed(2));
        mrrCountArr.push(mrrCount.toFixed(2));
      }
    } else if (filterType === "week") {
      for (let i = 0; i < weekBasedHz.length; i++) {
        let signUpLength = graphStaticData.newSignUps.filter(
          weeklyCount(weekBasedHz[i], "updatedAt")
        ).length;
        let activationsLength = graphStaticData.activations.filter(
          weeklyCount(weekBasedHz[i], "created_at")
        ).length;
        let cancellationsLength = graphStaticData.cancellations.filter(
          weeklyCount(weekBasedHz[i], "created_at")
        ).length;
        let freeClientUpgradLength = graphStaticData.userUpgradedPlans.filter(
          weeklyCount(weekBasedHz[i], "dateOfPlanupgrade")
        ).length;
        let freeClientLength = graphStaticData.freePlanUsers.filter(
          weeklyCount(weekBasedHz[i], "createdAt")
        ).length;
        let arpu = graphStaticData.ARPU.filter(
          weeklyCountArpu(weekBasedHz[i], "created_at")
        );
        let mscrLength = (freeClientUpgradLength / (freeClientLength ? freeClientLength : 1)) * 100
        signupCountArr.push(
          signupCountArr.length > 0
            ? signupCountArr[i - 1] + signUpLength
            : signUpLength
        );
        activationCountArr.push(
          activationCountArr.length > 0
            ? activationCountArr[i - 1] + activationsLength
            : activationsLength
        );
        cancellationsCountArr.push(
          cancellationsCountArr.length > 0
            ? cancellationsCountArr[i - 1] + cancellationsLength
            : cancellationsLength
        );
        mscrCountArr.push(
          mscrCountArr.length > 0
            ? mscrCountArr[i - 1] + mscrLength
            : mscrLength
        );
        let arpuCount = 0;
        if (arpu.length > 0) {
          arpu.forEach((elem) => {
            arpuCount = arpuCount + elem.amount / arpu.length;
          });
        }
        let mrrCount = arpuCount * arpu.length;

        let cummArpu = 0;
        let cummMrr = 0;
        if (arpuCountArr.length > 0) {
          cummArpu = +arpuCountArr[i - 1] + arpuCount;
          cummMrr = +mrrCountArr[i - 1] + mrrCount;
        }
        arpuCountArr.push(cummArpu);
        mrrCountArr.push(cummMrr);
      }
    } else if (filterType === "custom") {
      cutomizeHz();
      for (let i = 0; i < helperArrDate.length; i++) {
        let signUpLength = graphStaticData.newSignUps.filter(
          filterByDateRange(helperArrDate[i], "updatedAt")
        ).length;
        let activationsLength = graphStaticData.activations.filter(
          filterByDateRange(helperArrDate[i], "created_at")
        ).length;
        let cancellationsLength = graphStaticData.cancellations.filter(
          filterByDateRange(helperArrDate[i], "created_at")
        ).length;
        let freeClientUpgradLength = graphStaticData.userUpgradedPlans.filter(
          filterByDateRange(helperArrDate[i], "dateOfPlanupgrade")
        ).length;
        let freeClientLength = graphStaticData.freePlanUsers.filter(
          filterByDateRange(helperArrDate[i], "createdAt")
        ).length;
        let arpu = graphStaticData.ARPU.filter(
          filterByDateRangeArpu(helperArrDate[i], "created_at")
        );
        let mscrLength = (freeClientUpgradLength / (freeClientLength ? freeClientLength : 1)) * 100
        if (signupCountArr.length > 0) {
          signupCountArr.push(signupCountArr[i - 1] <= signUpLength ? signUpLength : signupCountArr[i - 1]);
          activationCountArr.push(activationCountArr[i - 1] <= activationsLength ? activationsLength : activationCountArr[i - 1]);
          cancellationsCountArr.push(cancellationsCountArr[i - 1] <= cancellationsLength ? cancellationsLength : cancellationsCountArr[i - 1]);
          mscrCountArr.push(mscrCountArr[i - 1] <= mscrLength ? mscrLength : mscrCountArr[i - 1]);
        } else {
          signupCountArr.push(signUpLength);
          activationCountArr.push(activationsLength);
          cancellationsCountArr.push(cancellationsLength);
          mscrCountArr.push(mscrLength);
        }
        let arpuCount = 0;
        if (arpu.length > 0) {
          arpu.forEach((elem) => {
            arpuCount = arpuCount + elem.amount / arpu.length;
          });
        }
        let mrrCount = arpuCount * arpu.length;
        if (arpuCountArr.length > 0) {
          arpuCountArr.push((arpuCountArr[i - 1] <= arpuCount.toFixed(2)) ? arpuCount.toFixed(2) : arpuCountArr[i - 1]);
          mrrCountArr.push((mrrCountArr[i - 1] <= mrrCount.toFixed(2)) ? mrrCount.toFixed(2) : mrrCountArr[i - 1]);
        } else {
          arpuCountArr.push(arpuCount.toFixed(2));
          mrrCountArr.push(mrrCount.toFixed(2));
        }
      }
    }
    // graphStaticData.newSignUps.forEach(elem => {
    //     console.log(elem.updatedAt);
    // });
    setDailyBasisVals({
      ...dailyBasisVals,
      newSignUpsArr: signupCountArr,
      activationsArr: activationCountArr,
      cancellationsArr: cancellationsCountArr,
      ARPU: arpuCountArr,
      MRR: mrrCountArr,
      MSCR: mscrCountArr
    });
  }

  function filterByDateRange(dateVal, dateKey) {
    return function (item) {
      let dataDate = new Date(item[dateKey]).getTime();
      let stDate = startDate.getTime();
      let hzDate = new Date(dateVal).getTime();
      return dataDate >= stDate && dataDate <= hzDate;
    };
  }
  function filterByDateRangeArpu(dateVal, dateKey) {
    return function (item) {
      let dataDate = new Date(
        item[dateKey] ? item[dateKey] : item["created"]
      ).getTime();
      let stDate = startDate.getTime();
      let hzDate = new Date(dateVal).getTime();
      return (
        dataDate >= stDate && dataDate <= hzDate && item.status === "active"
      );
    };
  }

  function cutomizeHz() {
    helperArrDate = [];
    let customBasedHz = [];
    const getDateDifference = (date1, date2) => {
      const diffTime = Math.abs(date2 - date1);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };
    let custumInterval = getDateDifference(startDate, endDate);
    custumInterval = Math.ceil(custumInterval / 7) + 1;
    for (let i = 0; i < 7; i++) {
      let finalDate = new Date(startDate);
      if (i > 0) {
        let dayByInterval = helperArrDate[0].getDate() + custumInterval * i;
        finalDate.setDate(dayByInterval);
      }
      helperArrDate.push(finalDate);
      let changeFormat = finalDate
        .toJSON()
        .slice(0, 10)
        .split("-")
        .reverse()
        .join("/");
      // let changeFormat = finalDate.toLocaleString('en-GB', { timeZone: 'UTC' }).slice(0,10);
      // console.log(changeFormat);
      customBasedHz.push(changeFormat);
    }
    setCustomDates(customBasedHz);
  }

  function weeklyCount(dateVal, dateKey) {
    return function (item) {
      return (
        new Date(dateVal).toDateString() ===
        new Date(item[dateKey]).toDateString()
      );
    };
  }

  function weeklyCountArpu(dateVal, dateKey) {
    return function (item) {
      return (
        item.status === "active" &&
        new Date(dateVal).toDateString() ===
        new Date(
          item[dateKey] ? item[dateKey] : item["created"]
        ).toDateString()
      );
    };
  }

  function dailyCount(hrsVal, dateKey) {
    return function (item) {
      if (
        new Date(today).toDateString() ===
        new Date(item[dateKey]).toDateString()
      ) {
        let hours = new Date(item[dateKey]).getHours();
        return hours <= hrsVal;
      }
    };
  }

  function dailyCountArpu(hrsVal, dateKey) {
    return function (item) {
      if (
        item.status === "active" &&
        new Date(today).toDateString() ===
        new Date(
          item[dateKey] ? item[dateKey] : item["created"]
        ).toDateString()
      ) {
        let hours = new Date(item[dateKey]).getHours();
        return hours <= hrsVal;
      }
    };
  }

  function churnRateCalculation() {
    let monthStartDate = new Date(today);
    monthStartDate.setDate(1);
    let cancellationsLength = graphStaticData.cancellations.filter((item) => {
      let dataDate = new Date(item.created_at ? item.created_at : item.created).getTime();
      return (
        dataDate >= monthStartDate.getTime()
      )
    }
    ).length;
    let activationsLength = graphStaticData.activations.filter((item) => {
      let dataDate = new Date(item.created_at ? item.created_at : item.created).getTime();
      return (
        dataDate <= monthStartDate && item.status === "active"
      );
    }
    ).length;
    let churnCount = (cancellationsLength * 100) / activationsLength;
    setChurnRate(churnCount);
  }

  useEffect(() => {
    if (startDate && endDate) {
      if (Object.keys(graphStaticData).length !== 0) {
        graphsFilter();
      }
    }
  }, [dateRange]);

  function customDateChangeHandler(update) {
    setDateRange(update);
  }
  let roleAccess = JSON.parse(localStorage.getItem("__csadmin__d"));

  return (
    <div className="page-wrapper">
      {roleAccess?.role?.map((roletype) => {
        const dashboardAccess = roletype.Modules[0];
        if (dashboardAccess.access !== "full")
          return <div className="clickOff"></div>;
      })}

      <div className="container-fluid min_height">
        <div className="row ms-3">
          <div className="col-md-12">
            <ul className="filter_box me-4">
              <NavLink
                exact
                activeClassName={filterType === "today" ? "active" : ""}
                to="#"
                onClick={() => setFilterType("today")}
              >
                Today
              </NavLink>
              <NavLink
                activeClassName={filterType === "week" ? "active mx-4" : "mx-4"}
                to="#"
                onClick={() => setFilterType("week")}
              >
                This Week
              </NavLink>
              <NavLink
                activeClassName={filterType === "custom" ? "active" : ""}
                to="#"
                onClick={() => setFilterType("custom")}
              >
                Custom
              </NavLink>
              {filterType === "custom" ? (
                <div>
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    maxDate={today}
                    onChange={(update) => {
                      customDateChangeHandler(update);
                    }}
                    isClearable={true}
                  />
                </div>
              ) : (
                <div className="container mb-1">&ensp;</div>
              )}
            </ul>
          </div>
        </div>
        <Graphs
          graphStaticData={graphStaticData}
          dailyBasisVals={dailyBasisVals}
          filterType={filterType}
          setFilterType={setFilterType}
          weekDayNames={weekDayNames}
          customDates={customDates}
          churnRate={churnRate}
        />
      </div>
    </div>
  );
}

export default Analytics;

//   ARPU (Average Revenue Per User-Subscription) = Total Active Subscriptions Revenue / Total Active Subscriptions
// MRR (Monthly Recurring Revenue) = ARPU  x  Total Active Subscriptions      This will only show data for monthly timeframe
// CLV (Customer Lifetime Value) =  Average Lifetime per subscription (calculated in total number of months) x ARPU       This will only show data for monthly timeframe
