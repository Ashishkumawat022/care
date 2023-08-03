import React, { useState } from "react";
import "../Clients/clients.css";
import EditClients from "./EditClients";
import AddEditContact from "./AddEditContact";
import AddEditComplianceDocs from "./AddEditComplianceDocs";
import ClientCarePlans from "./ClientCarePlans";
import ClientJournalAsApp from "./ClientJournalAsApp";
import ClientNotes from "./ClientNotes";
import ClientActivity from "./ClientActivity";

function ClientsDetails() {
  let [plantype, setplantype] = useState("");
  setTimeout(() => {
    setplantype(JSON.parse(localStorage.getItem("userData")).SubscriptionPlan);
  }, 600);

  let style = {
    "pointer-events": "none",
    opacity: 0.6,
  };

  let user = JSON.parse(localStorage.getItem("userData"));

  return (
    <>
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            {user.role.map((roletype) => {
              const Profileaccess = roletype.Modules[1].children[2];
              const Contactaccess = roletype.Modules[1].children[3];
              const ComplianceDocsaccess = roletype.Modules[1].children[4];
              const CareplanAccess = roletype.Modules[1].children[5];
              const JournalAccess = roletype.Modules[1].children[6];
              return (
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
                          Profile
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
                          Contacts
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
                          Docs
                        </button>
                      </li>
                      {/* {plantype == 'baseplan' ? <li className="nav-item" role="presentation" style={style}>
										<button className="nav-link" id="tabD-4" data-bs-toggle="tab" data-bs-target="#tab_4" type="button" role="tab" aria-controls="tab_4" aria-selected="false">Care Plan</button>
									</li> : <li className="nav-item" role="presentation">
										<button className="nav-link" id="tabD-4" data-bs-toggle="tab" data-bs-target="#tab_4" type="button" role="tab" aria-controls="tab_4" aria-selected="false">Care Plan</button>
									</li>} */}
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
                          Care Plan
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
                          Journal
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
                      <EditClients
                        Profileaccess={
                          Profileaccess.access != "full" ? true : false
                        }
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="tab_2"
                      role="tabpanel"
                      aria-labelledby="tabD-2"
                    >
                      <AddEditContact
                        Contactaccess={
                          Contactaccess.access != "full" ? true : false
                        }
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="tab_3"
                      role="tabpanel"
                      aria-labelledby="tabD-3"
                    >
                      <AddEditComplianceDocs
                        ComplianceDocsaccess={
                          ComplianceDocsaccess.access != "full" ? true : false
                        }
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="tab_4"
                      role="tabpanel"
                      aria-labelledby="tabD-4"
                    >
                      <ClientCarePlans
                        CareplanAccess={
                          CareplanAccess.access != "full" ? true : false
                        }
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="tab_5"
                      role="tabpanel"
                      aria-labelledby="tabD-5"
                    >
                      <ClientJournalAsApp
                        JournalAccess={
                          JournalAccess.access != "full" ? true : false
                        }
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ClientsDetails;
