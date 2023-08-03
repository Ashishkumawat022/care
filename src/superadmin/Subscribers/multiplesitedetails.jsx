import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import CareSiteDetails from "./caresitedetails";

const MultiplesiteDetails = () => {
  const param = useParams();
  const [plansData, setplansData] = useState([]);
  const [rowData, setrowData] = useState([]);

  useEffect(() => {
    getPlans();
    getOwnersById();
  }, []);

  const getPlans = () => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getPlans?country=uk`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
      },
    };

    axios(config)
      .then(function (response) {
        setplansData(response.data.plansData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function getOwnersById() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getOwners?ownerId=${param.id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("superadmin_token"),
      },
    };

    axios(config)
      .then(function (response) {
        setrowData(response.data.data[0].subscriptionPlanData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <div className="top_menubar">
                <ul
                  className="nav nav-tabs ract_tab_list border-0"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item active" role="presentation">
                    <button
                      className="nav-link"
                      id="tabD-2"
                      data-bs-toggle="tab"
                      data-bs-target="#tab_2"
                      type="button"
                      role="tab"
                      aria-controls="tab_2"
                      aria-selected="true"
                    >
                      Care Site Details
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
                      Plan's details
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="tabD-4"
                      data-bs-toggle="tab"
                      data-bs-target="#tab_4"
                      type="button"
                      role="tab"
                      aria-controls="tab_4"
                      aria-selected="false"
                    >
                      Care Site Plan's History
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="tabD-5"
                      data-bs-toggle="tab"
                      data-bs-target="#tab_5"
                      type="button"
                      role="tab"
                      aria-controls="tab_5"
                      aria-selected="false"
                    >
                      Emails
                    </button>
                  </li>
                </ul>
              </div>
              <div className="tab-content ract_tab_data" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="tab_2"
                  role="tabpanel"
                  aria-labelledby="tabD-2"
                >
                  <CareSiteDetails details={rowData} />
                </div>
                <div
                  className="tab-pane fade"
                  id="tab_3"
                  role="tabpanel"
                  aria-labelledby="tabD-3"
                >
                  {/* <AddEditComplianceDocs ComplianceDocsaccess={ComplianceDocsaccess.access != 'full' ? true : false} /> */}
                </div>
                <div
                  className="tab-pane fade"
                  id="tab_4"
                  role="tabpanel"
                  aria-labelledby="tabD-4"
                >
                  {/* <ClientCarePlans CareplanAccess={CareplanAccess.access != 'full' ? true : false} /> */}
                </div>
                <div
                  className="tab-pane fade"
                  id="tab_5"
                  role="tabpanel"
                  aria-labelledby="tabD-5"
                >
                  {/* <ClientNotes JournalAccess={JournalAccess.access != 'full' ? true : false} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiplesiteDetails;
