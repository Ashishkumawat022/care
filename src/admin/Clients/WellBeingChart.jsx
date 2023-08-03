import { BsFilterSquare } from "react-icons/bs";
import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const WellBeingChart = (props) => {
  useEffect(() => {
    getActivityandwellbeingChart();
  }, []);

  let params = useParams();
  // console.log(params);
  const [getActivityData, setGetActivityData] = useState([]);


  const getActivityandwellbeingChart = () => {
    axios({
      // url: `${process.env.REACT_APP_BASEURL}/getActivityandwellbeingChart?clientId=61c995fb05c16185bdf196ed&type=client`,
      url: `${process.env.REACT_APP_BASEURL}/getActivityandwellbeingChart?clientId=${params.id}&type=client`,

      method: 'GET',
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    }).then((res) => {
      // console.log(res)
      let CareTeamData = res.data.getActivityData;
      // console.log("Client Activity WEll Being Chart Data", CareTeamData);

      setGetActivityData(CareTeamData);
      const arrChatData = [];

      CareTeamData?.map((item, index) => {
        // console.log(item, index)
        if (item?.wellbeingAssessment) {
          const Day = item.Date;
          const overallMood = item.wellbeingAssessment.overallMood;
          const sleep = item.wellbeingAssessment.sleep;
          const partcipation = item.wellbeingAssessment.partcipation;
          const diet = item.wellbeingAssessment.diet;
          const bowels = item.wellbeingAssessment.bowels;
          const activity = item.wellbeingAssessment.activity;
          const pain = item.wellbeingAssessment.pain;
          arrChatData.push({ Day: Day, overallMood: overallMood, sleep: sleep, partcipation: partcipation, diet: diet, bowels: bowels, activity: activity, pain: pain })
          setdata(arrChatData);
        }
        // console.log(arrChatData, '=--==p--=-=-=-=');
      })
      // console.log(WellBeingChartData, "WellBeingChartData");
      // console.log(arrChatData, 'OUTside');

    }).catch((error) => console.log(`Error: ${error}`));
  }

  const [data, setdata] = useState([
    { Day: 1, overallMood: 0, sleep: 0, partcipation: 0, diet: 0, bowels: 0, activity: 0, pain: 0 },
  ]);

  const [searchInput, setSearchInput] = useState('');

  return (
    <>
      <div>
        <ResponsiveContainer width="100%" height={300} aspect={3}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDashoffset="3 3" />
            <XAxis dataKey="Day" />
            <YAxis />
            <Tooltip />
            <Legend />
            {props.searchInput === "" ? (
              <>
                <Line
                  type="monotone"
                  dataKey="overallMood"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="sleep"
                  stroke="#00FFFF"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="partcipation"
                  stroke="#008000"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="diet"
                  stroke="#0000FF"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="bowels"
                  stroke="#00FF00"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="activity"
                  stroke="#FF0000"
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="pain"
                  stroke="#FF00FF"
                  activeDot={{ r: 8 }}
                />
              </>
            ) : (
              ""
            )}
            {props.searchInput === "overallMood" ? (
              <Line
                type="monotone"
                dataKey="overallMood"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            ) : (
              ""
            )}
            {props.searchInput === "sleep" ? (
              <Line
                type="monotone"
                dataKey="sleep"
                stroke="#00FFFF"
                activeDot={{ r: 8 }}
              />
            ) : (
              ""
            )}
            {props.searchInput === "partcipation" ? (
              <Line
                type="monotone"
                dataKey="partcipation"
                stroke="#008000"
                activeDot={{ r: 8 }}
              />
            ) : (
              ""
            )}
            {props.searchInput === "diet" ? (
              <Line
                type="monotone"
                dataKey="diet"
                stroke="#0000FF"
                activeDot={{ r: 8 }}
              />
            ) : (
              ""
            )}
            {props.searchInput === "bowels" ? (
              <Line
                type="monotone"
                dataKey="bowels"
                stroke="#00FF00"
                activeDot={{ r: 8 }}
              />
            ) : (
              ""
            )}
            {props.searchInput === "activity" ? (
              <Line
                type="monotone"
                dataKey="activity"
                stroke="#FF0000"
                activeDot={{ r: 8 }}
              />
            ) : (
              ""
            )}
            {props.searchInput === "pain" ? (
              <Line
                type="monotone"
                dataKey="pain"
                stroke="#FF00FF"
                activeDot={{ r: 8 }}
              />
            ) : (
              ""
            )}
            {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default WellBeingChart;