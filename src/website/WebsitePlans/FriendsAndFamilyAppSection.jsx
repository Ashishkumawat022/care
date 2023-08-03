import React, { Fragment } from "react";
import Checkbox from "@mui/material/Checkbox";
import InformationText from "./InformationText";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import { useState } from "react";

export default function FriendsAndFamilyAppSection(props) {
  let { planName, fandfselectHandler } = props;
  const [state, setState] = React.useState({
    [planName]: false,
  });
  const [valuetext, setValueText] = useState(25);
  function valueChangeHandler(event) {
    console.log(event, "valuechangehandler");
    setValueText(event);
    fandfselectHandler(planName, state[planName], event);
  }

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    fandfselectHandler(planName, event.target.checked, valuetext);
  };

  return (
    <Fragment>
      <div className="added_plans">
        <h5>
          <label className="checkbox">
            <Checkbox
              name={planName}
              checked={state[planName]}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            Friends & Family App Add-On{" "}
            <InformationText infoText="Friends & Family App Add-On" />
          </label>
        </h5>
        <div className="app_user">
          <div className="mb-1 mt-2" style={{ textAlign: "center" }}>
            No. of App Users{" "}
          </div>
          <div className="slidecontainer">
            <span className="me-1">0</span>{" "}
            <IOSSlider
              aria-label="ios slider"
              value={valuetext}
              valueLabelDisplay="on"
              onChange={(e) => {
                valueChangeHandler(e.target.value);
              }}
              max={45}
            />
            <span className="ms-1">45</span>
          </div>
          <p className="text-center mb-1">
            <span id="demo2"></span>
          </p>
        </div>
        <label className="checkbox">
          Paid by your Care Service per app user @ GBP x /month
        </label>
      </div>
    </Fragment>
  );
}

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#C4C4C4" : "#C4C4C4",
  height: 19,
  padding: "15px 0",

  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: 46,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
  },
  "& .MuiSlider-track": {
    border: "none",
    backgroundColor: "#C4C4C4",
  },
  "& .MuiSlider-thumb": {
    height: 18,
    width: 18,
    backgroundColor: "#9B51E0",
  },
  "& .MuiSlider-rail": {
    opacity: 1,
    backgroundColor: "#C4C4C4",
  },
}));
