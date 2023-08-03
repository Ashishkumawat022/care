import React from "react";
import "../ContentManagement/ContentManagement.css";
import Blogs from "./Blogs";
import ContactList from "./ContactList";

function ContentManagement() {
  let roleAccess = JSON.parse(localStorage.getItem("__csadmin__d"));

  return (
    <div className="page-wrapper">
      {roleAccess?.role?.map((roletype) => {
        const clientSectionAccess = roletype.Modules[6];
        if (clientSectionAccess.access !== "full")
          return <div className="clickOff"></div>;
      })}
      <div className="container-fluid min_height">
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
                    Blogs
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
                    Contact List
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
                <Blogs />
                {/* <BlogList /> */}
              </div>
              <div
                className="tab-pane fade"
                id="tab_2"
                role="tabpanel"
                aria-labelledby="tabD-2"
              >
                <ContactList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentManagement;
