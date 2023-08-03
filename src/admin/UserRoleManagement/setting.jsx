import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./setting.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Image from "react-bootstrap/Image";
import UserRoleManagement from "./UserRoleManagement";
import React, { useState } from "react";

const SettingUser = () => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="setting_box">
            <h5>General</h5>
            <ul>
              <li>
                <span>
                  Time-Zone
                  <OverlayTrigger
                    placement="top"
                    overlay={renderTooltip}
                  >
                    <Button>
                      <AiOutlineInfoCircle />
                    </Button>
                  </OverlayTrigger>
                  <label className="onof">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </span>
                <span>Home Care Agency</span>
              </li>

              <li>
                <span>Time-Zone</span>
                <span>
                  <select className="form-select">
                    <option>Time Zone</option>
                  </select>
                </span>
              </li>
            </ul>

            <h5 className="mt-5">Shift</h5>
            <ul>
              <li>
                <span>Clock-In Grace period (+ - minutes)</span>
                <span>
                  <select className="form-select">
                    <option>07</option>
                  </select>
                </span>
              </li>
              <li>
                <span>Clock-Out Grace period ( + minutes)</span>
                <span>
                  <select className="form-select">
                    <option>07</option>
                  </select>
                </span>
              </li>
            </ul>

            <h5 className="mt-5">GeoLocation</h5>
            <ul>
              <li>
                <span>
                  Client location Clock-In/Clock-Out radius (meters)
                </span>
                <span>
                  <select className="form-select">
                    <option>50</option>
                  </select>
                </span>
              </li>
            </ul>

            <h5 className="mt-5">Care Team Performance</h5>
            <ul>
              <li>
                <span>
                  Include Ratings from Friends&Family App in
                  performance calculation
                </span>
                <span className="d-flex">
                  <label className="onof">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                  Yes
                </span>
              </li>
              <li>
                <span>Tasks Punctuality Rating weight</span>
                <span>
                  <select className="form-select">
                    <option>1.00</option>
                  </select>
                </span>
              </li>
              <li>
                <span>Friends&Family Rating weight</span>
                <span>
                  <select className="form-select">
                    <option>0.00</option>
                  </select>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-6">
          <div className="setting_box">
            <h5>Reminders</h5>
            <ul>
              <li>
                <span>Birthdays</span>
                <span className="d-flex">
                  <label className="onof">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                  Yes
                </span>
              </li>
              <li>
                <span>Birthdays</span>
                <span>
                  <select className="form-select">
                    <option>07</option>
                  </select>
                </span>
              </li>
              <li>
                <span>Shift Start Reminder </span>
                <span className="d-flex">
                  <label className="onof">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                  Yes
                </span>
              </li>
              <li>
                <span> (minutes prior to shift)</span>
                <span>
                  <select className="form-select">
                    <option>07</option>
                  </select>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingUser;
