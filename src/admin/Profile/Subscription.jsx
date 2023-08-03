import { useRouteMatch } from "react-router-dom";
import cx from "./sidecards.module.css";
import "./Profile.css";
import { NavLink } from "react-router-dom";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

export default function Subscription() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();
  return (
    <div className="mt-3 subscriptionBox">
      <h5 className="themeColor">
        <img
          alt=""
          className="me-2"
          width="18"
          src={`${process.env.PUBLIC_URL}/images/asp1.svg`}
        />
        Advanced Plan
      </h5>
      <p className="mb-3">
        <span className="themeColor">Friends & Family App License:</span> 5
      </p>
      <p className="mb-1">
        <span className="themeColor">Subscription Start/Activation Date:</span>{" "}
        01.12.2021
      </p>
      <p>
        <span className="themeColor">Subscription Type & Validity:</span>{" "}
        Yearly, 07.12.2022
      </p>

      <p>
        <span className="themeColor">Days remaining in subscription:</span> 005
        Days
      </p>
      <div className="progress col-5">
        <div className="progress-bar" style={{ width: "70%" }}></div>
      </div>

      <div className="col-md-5">
        <div className="row promotionalC">
          <h5 className="themeColor mt-3">Promotional Coupons</h5>
          <div className="col-6">
            <ul>
              <li>
                <span className="themeColor">Active:</span> 02
              </li>
              <li>
                <span className="themeColor">Type:</span> Early Bird
              </li>
              <li>
                <span className="themeColor">Discount Value:</span> 10%
              </li>
              <li>
                <span className="themeColor">Start Date:</span> 07.12.2022
              </li>
              <li>
                <span className="themeColor">Valid Till:</span> 07.12.2022
              </li>
              <li>
                <span className="themeColor">Linked Plans:</span> Advanced
              </li>
              <li>
                <span className="themeColor">Linked Add-Ons:</span> None
              </li>
            </ul>
          </div>
          <div className="col-6 text-end">
            <ul>
              <li>
                <span className="themeColor">Active:</span> 02
              </li>
              <li>
                <span className="themeColor">Type:</span> Early Bird
              </li>
              <li>
                <span className="themeColor">Discount Value:</span> 10%
              </li>
              <li>
                <span className="themeColor">Start Date:</span> 07.12.2022
              </li>
              <li>
                <span className="themeColor">Valid Till:</span> 07.12.2022
              </li>
              <li>
                <span className="themeColor">Linked Plans:</span> Advanced
              </li>
              <li>
                <span className="themeColor">Linked Add-Ons:</span> None
              </li>
            </ul>
          </div>

          <h5 className="themeColor mt-3 mb-3">
            Total Subscription Fee: £ xxx /Year{" "}
          </h5>

          <NavLink style={{ color: "#2D9CDB" }} to="#">
            Update Plan
          </NavLink>
        </div>
      </div>

      <div className="col-md-5 mt-5">
        <div className="plan_select subscriptionPlan">
          <span className="p1">Monthly</span>
          <label className="onoff">
            <input type="checkbox" value="Yearly" />
            <span className="slider"></span>
          </label>
          <span className="p1">Yearly</span>
          <small className="present ms-4">Save 10% with the yearly plan</small>
        </div>

        <div className="row planSelect">
          <div className="col">
            <img
              alt=""
              className="me-2"
              width="18"
              src={`${process.env.PUBLIC_URL}/images/asp1.svg`}
            />
          </div>
          <div className="col text-start">
            <h5>Base</h5>
          </div>
          <div className="col">
            <span>Features</span>
          </div>
          <div className="col">
            <h5>£ x</h5>
          </div>
          <div className="col">
            <h5>/year</h5>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <input type="radio" name="planSelect" />
          </div>
        </div>

        <div className="row planSelect">
          <div className="col">
            <img
              alt=""
              className="me-2"
              width="18"
              src={`${process.env.PUBLIC_URL}/images/asp1.svg`}
            />
          </div>
          <div className="col text-start">
            <h5>Advanced</h5>
          </div>
          <div className="col">
            <span>Features</span>
          </div>
          <div className="col">
            <h5>£ x</h5>
          </div>
          <div className="col">
            <h5>/year</h5>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <input type="radio" name="planSelect" />
          </div>
        </div>

        <div className="row planSelect">
          <div className="col">
            <img
              alt=""
              className="me-2"
              width="18"
              src={`${process.env.PUBLIC_URL}/images/asp1.svg`}
            />
          </div>
          <div className="col text-start">
            <h5>Turbo</h5>
          </div>
          <div className="col">
            <span>Features</span>
          </div>
          <div className="col">
            <h5>£ x</h5>
          </div>
          <div className="col">
            <h5>/year</h5>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <input type="radio" name="planSelect" />
          </div>
        </div>

        <h4 className="themeColor mt-3">
          Friends & Family App Add-On <span className="ms-3">£ x</span>{" "}
          <span className="ms-3">/year</span>
        </h4>

        <p className="text-center ">No. of App User Licenses</p>

        <h3 className="text-center">
          {" "}
          <div className="slidecontainer">
            <span className="me-1">0</span>{" "}
            <IOSSlider
              aria-label="ios slider"
              defaultValue={25}
              valueLabelDisplay="on"
              max={45}
            />
            <span className="ms-1">45</span>
          </div>
        </h3>

        <p className="mt-3">
          Charged to your care service and included in your total subscription
          fee based on per app license @ £ x /year. For more than 100 licences,
          please <NavLink to="#">contact us</NavLink> for custom pricing.{" "}
        </p>
        <div className="row promotionalC">
          <h5 className="themeColor mt-3">Promotional Coupons</h5>
          <div className="col-6">
            <ul>
              <li>
                <span className="themeColor">Active:</span> 02
              </li>
              <li>
                <span className="themeColor">Type:</span> Early Bird
              </li>
              <li>
                <span className="themeColor">Discount Value:</span> 10%
              </li>
              <li>
                <span className="themeColor">Start Date:</span> 07.12.2022
              </li>
              <li>
                <span className="themeColor">Valid Till:</span> 07.12.2022
              </li>
              <li>
                <span className="themeColor">Linked Plans:</span> Advanced
              </li>
              <li>
                <span className="themeColor">Linked Add-Ons:</span> None
              </li>
            </ul>
          </div>
          <div className="col-6">
            <ul>
              <li>
                <span className="themeColor">Active:</span> 02
              </li>
              <li>
                <span className="themeColor">Type:</span> Early Bird
              </li>
              <li>
                <span className="themeColor">Discount Value:</span> 10%
              </li>
              <li>
                <span className="themeColor">Start Date:</span> 07.12.2022
              </li>
              <li>
                <span className="themeColor">Valid Till:</span> 07.12.2022
              </li>
              <li>
                <span className="themeColor">Linked Plans:</span> Advanced
              </li>
              <li>
                <span className="themeColor">Linked Add-Ons:</span> None
              </li>
            </ul>
          </div>
        </div>
        <p className="themeColor mt-3 promotionalCode">
          Enter Promotional Code
          <input type="text" />
        </p>

        <h4 className="themeColor">
          Total Subscription Fee: <span className="ms-3">£ x</span>{" "}
          <span className="ms-3">/year</span>
        </h4>
        <button className="btn updateBtn">Update</button>
      </div>
    </div>
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
