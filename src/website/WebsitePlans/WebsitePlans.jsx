import React, { Fragment, useEffect, useState } from "react";
import { alpha, styled } from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import SelectSmall from "./CurrencySelect";
import axios from "axios";
import PlanSection from "./PlanSection";
import "./plans.css";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: deepPurple[600],
    "&:hover": {
      backgroundColor: alpha(
        deepPurple[600],
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: deepPurple[600],
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

export default function WebsitePlan() {
  const [planData, setPlansData] = useState([]);
  const [state, setState] = React.useState({
    monthlyearly: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    getPlans();
  }, []);

  const getPlans = () => {
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getAllPlans`,
    };

    axios(config)
      .then(function (response) {
        setPlansData(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log(state.monthlyearly, "getAllPlans");
  return (
    <Fragment>
      <section className="pagespace_section">
        <div className="container">
          <div className="title">
            <h3>Plans</h3>
          </div>
        </div>
      </section>
      <section className="plan_section">
        <div className="container">
          <div className="title text-center">
            <h3>Choose your plan</h3>
            <div className="plan_select">
              <span className="p1">Monthly</span>
              <GreenSwitch
                {...label}
                checked={state.monthlyearly}
                onChange={handleChange}
                name="monthlyearly"
              />
              <span className="p1">Yearly</span>
              <span className="present">
                Save {planData[0]?.yearlyDiscount}%
              </span>
            </div>
          </div>

          <div className="title text-end mt-5">
            <div className="plan_select">
              <SelectSmall />
            </div>
          </div>

          <div className="row plan_row">
            {planData?.map((plan, index) => {
              return (
                <PlanSection
                  key={index}
                  planDetails={plan}
                  SubscriptionType={state.monthlyearly}
                />
              );
            })}

            <div className="col-md-12 note_box">
              <p>Note</p>
              <ul>
                <li>
                  All Plan licenses are based on a single site or 1 site license
                  only. For each additional site please subscriber for an
                  additional license. A site could be one Nursing Home or
                  Residential Care Home or Retirement Home or Assisted Living
                  Facility or Retirement Community or Home-Care Agency.{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
