import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./setting.css";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Image from "react-bootstrap/Image";
import UserRoleManagement from "./UserRoleManagement";
import SettingUser from "./setting";
import TempateDataTable from "./templates";

const SettingAceessModule = () => {
  return (
    <div className="page-wrapper">
      <div className="container-fluid ">
        <div className="card">
          <div className="card-body">
            <div className="top_menubar">
              <ul
                className="nav nav-tabs ract_tab_list border-0"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="tabD-1"
                    data-bs-toggle="tab"
                    data-bs-target="#tab_1"
                    type="button"
                    role="tab"
                    aria-controls="tab_1"
                    aria-selected="true"
                  >
                    Settings
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="tabD-2"
                    data-bs-toggle="tab"
                    data-bs-target="#tab_2"
                    type="button"
                    role="tab"
                    aria-controls="tab_2"
                    aria-selected="false"
                  >
                    Access Rights
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="tabD-3"
                    data-bs-toggle="tab"
                    data-bs-target="#tab_3"
                    type="button"
                    role="tab"
                    aria-controls="tab_3"
                    aria-selected="false"
                  >
                    Templates
                  </button>
                </li>
              </ul>
            </div>

            <div className="tab-content ract_tab_data" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="tab_1"
                role="tabpanel"
                aria-labelledby="tabD-1"
              >
                <SettingUser />
              </div>

              <div
                className="tab-pane fade"
                id="tab_2"
                role="tabpanel"
                aria-labelledby="tabD-2"
              >
                <UserRoleManagement />
              </div>
              <div
                className="tab-pane fade"
                id="tab_3"
                role="tabpanel"
                aria-labelledby="tabD-3"
              >
                <TempateDataTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingAceessModule;
