import React, { forwardRef, useImperativeHandle, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "../SalesFunnel/SalesFunnel.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import Footer from "../Footer/footer";

import { BsThreeDots } from "react-icons/bs";
import MoveInOutTable from "./MoveInOutTable";
import SalesOverview from "./SalesOverviewPage";

const MoodRenderer = forwardRef((props, ref) => {
  const imageForMood = (mood) =>
    `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`;

  const [mood, setMood] = useState(imageForMood(props.value));

  useImperativeHandle(ref, () => {
    return {
      refresh(params) {
        setMood(imageForMood(params.value));
      },
    };
  });

  return (
    <span className="profle_img_box">
      <img alt="" className="profile_img_table" src={mood} />{" "}
      <strong>Margaret, Platt</strong>
    </span>
  );
});

const ChildMessageRenderer = (props) => {
  const invokeParentMethod = () => {
    props.context.methodFromParent(
      `Row: ${props.node.rowIndex}, Col: ${props.colDef.field}`
    );
  };

  return (
    <span>
      <button
        style={{}}
        onClick={invokeParentMethod}
        className="btn btn-sm btn_table btn-success"
      >
        Active
      </button>
      <NavLink className="table_arrow" to="/admin/clientsdetails">
        <BsThreeDots />
      </NavLink>
    </span>
  );
};

const ChildMessageRendererLead = (props) => {
  const invokeParentMethodLead = () => {
    props.context.methodFromParent(
      `Row: ${props.node.rowIndex}, Col: ${props.colDef.field}`
    );
  };

  return (
    <span>
      <button
        style={{}}
        onClick={invokeParentMethodLead}
        className="btn btn-sm btn_table btn-success"
      >
        Active
      </button>
      <NavLink className="table_arrow" to="/admin/clientsdetails">
        <MdKeyboardArrowRight />
      </NavLink>
    </span>
  );
};

function SalesFunnel() {
  const rowData = [
    {
      SrNo: "1",
      Location: "Room1, Floor1",
      ContractStart: "5th Febraury 2015",
      ContractEnd: "CPR",
      InvoicesCleared: "-",
      ToDos: "2",
      Status: "Active",
    },
    {
      SrNo: "2",
      Location: "Room1, Floor1",
      ContractStart: "5th Febraury 2015",
      ContractEnd: "CPR",
      InvoicesCleared: "-",
      ToDos: "2",
      Status: "Active",
    },
    {
      SrNo: "3",
      Location: "Room1, Floor1",
      ContractStart: "5th Febraury 2015",
      ContractEnd: "CPR",
      InvoicesCleared: "-",
      ToDos: "2",
      Status: "Active",
    },
    {
      SrNo: "4",
      Location: "Room1, Floor1",
      ContractStart: "5th Febraury 2015",
      ContractEnd: "CPR",
      InvoicesCleared: "-",
      ToDos: "2",
      Status: "Active",
    },
    {
      SrNo: "5",
      Location: "Room1, Floor1",
      ContractStart: "5th Febraury 2015",
      ContractEnd: "CPR",
      InvoicesCleared: "-",
      ToDos: "2",
      Status: "Active",
    },
    {
      SrNo: "6",
      Location: "Room1, Floor1",
      ContractStart: "5th Febraury 2015",
      ContractEnd: "CPR",
      InvoicesCleared: "yes",
      ToDos: "2",
      Status: "Active",
    },
    {
      SrNo: "7",
      Location: "Room1, Floor1",
      ContractStart: "5th Febraury 2015",
      ContractEnd: "CPR",
      InvoicesCleared: "yes",
      ToDos: "2",
      Status: "Active",
    },
    {
      SrNo: "8",
      Location: "Room1, Floor1",
      ContractStart: "5th Febraury 2015",
      ContractEnd: "CPR",
      InvoicesCleared: "yes",
      ToDos: "2",
      Status: "Active",
    },
    {
      SrNo: "9",
      Location: "Room1, Floor1",
      ContractStart: "5th Febraury 2015",
      ContractEnd: "CPR",
      InvoicesCleared: "yes",
      ToDos: "2",
      Status: "Active",
    },
    {
      SrNo: "10",
      Location: "Room1, Floor1",
      ContractStart: "5th Febraury 2015",
      ContractEnd: "CPR",
      InvoicesCleared: "yes",
      ToDos: "2",
      Status: "Active",
    },
    {
      SrNo: "11",
      Location: "Room1, Floor1",
      ContractStart: "5th Febraury 2015",
      ContractEnd: "CPR",
      InvoicesCleared: "yes",
      ToDos: "2",
      Status: "Active",
    },
  ];
  const pagination = true;
  const paginationPageSize = 10;

  const rowHeight = 55;

  const rowDataLead = [
    {
      ProspectName: "Margaret, Platt",
      Referral: "Room1, Floor1",
      TypesOfPlan: "5th Febraury 2015",
      FeePeriod: "Weekly",
      RatePerWeek: "-",
      ContactName: "-",
      Tel: "-",
      Email: "-",
      Approved: "Yes",
      Status: "Active",
    },
    {
      ProspectName: "Margaret, Platt",
      Referral: "Room1, Floor1",
      TypesOfPlan: "5th Febraury 2015",
      FeePeriod: "Weekly",
      RatePerWeek: "-",
      ContactName: "-",
      Tel: "-",
      Email: "-",
      Approved: "Yes",
      Status: "Active",
    },
    {
      ProspectName: "Margaret, Platt",
      Referral: "Room1, Floor1",
      TypesOfPlan: "5th Febraury 2015",
      FeePeriod: "Weekly",
      RatePerWeek: "-",
      ContactName: "-",
      Tel: "-",
      Email: "-",
      Approved: "Yes",
      Status: "Active",
    },
    {
      ProspectName: "Margaret, Platt",
      Referral: "Room1, Floor1",
      TypesOfPlan: "5th Febraury 2015",
      FeePeriod: "Weekly",
      RatePerWeek: "-",
      ContactName: "-",
      Tel: "-",
      Email: "-",
      Approved: "Yes",
      Status: "Active",
    },
    {
      ProspectName: "Margaret, Platt",
      Referral: "Room1, Floor1",
      TypesOfPlan: "5th Febraury 2015",
      FeePeriod: "Weekly",
      RatePerWeek: "-",
      ContactName: "-",
      Tel: "-",
      Email: "-",
      Approved: "Yes",
      Status: "Active",
    },
    {
      ProspectName: "Margaret, Platt",
      Referral: "Room1, Floor1",
      TypesOfPlan: "5th Febraury 2015",
      FeePeriod: "Weekly",
      RatePerWeek: "-",
      ContactName: "-",
      Tel: "-",
      Email: "-",
      Approved: "Yes",
      Status: "Active",
    },
  ];
  const paginationLead = true;
  const paginationPageSizeLead = 10;

  const rowHeightLead = 55;

  return (
    <>
      <Header />
      <Sidebar />
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
                      Sales Overview
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
                      Move-Ins/Outs
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
                      Leads Management
                    </button>
                  </li>
                </ul>
                {/* <div className="float-end btns_head">
						<button className="btn btn-theme btn-sm">Emergency Info</button>
					</div> */}
              </div>
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="tab_1"
                  role="tabpanel"
                  aria-labelledby="tabD-1"
                >
                    <SalesOverview />
                </div>
                <div
                  className="tab-pane fade"
                  id="tab_2"
                  role="tabpanel"
                  aria-labelledby="tabD-2"
                >
                  <div className="card-body">
                    <h4 className="card-title">
                      <div className="float-end btns_head">
                        <button className="btn btn-theme btn-sm">
                          Create Groups
                        </button>
                        <button className="btn btn-theme btn-sm">
                          Add New Resident
                        </button>
                      </div>
                    </h4>
                    <div>
                      <MoveInOutTable rows={rowData} />
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="tab_3"
                  role="tabpanel"
                  aria-labelledby="tabD-3"
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="prospects_box_content">
                          <h5>Prospects Details</h5>
                          <ul>
                            <li>
                              <strong>Name: </strong>
                              <span></span>
                            </li>
                            <li>
                              <strong>Referral: </strong>
                              <span>No</span>
                            </li>
                            <li>
                              <strong>Type of Plan:</strong>
                              <span>Self Funded </span>
                            </li>
                            <li>
                              <strong>Rate per Week: </strong>
                              <span></span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="col-md-5">
                        <div className="prospects_box_content">
                          <h5>Key Contact</h5>
                          <ul>
                            <li>
                              <strong>Name: </strong>
                              <span></span>
                            </li>
                            <li>
                              <strong>Tel: </strong>
                              <span></span>
                            </li>
                            <li>
                              <strong>Email:</strong>
                              <span></span>
                            </li>
                            <li>
                              <strong>Address:</strong>
                              <span></span>
                            </li>
                            <li>
                              <strong>Relationship:</strong>
                              <span></span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="col-md-10 activity_box">
                        <h5>Activity</h5>
                        <div className="activity_main">
                          <div className="call_history">
                            <p>24th March 2021</p>
                            <span>10am</span>
                            <div className="d-flex history mt-2">
                              <img src="../../images/ds2.svg" />
                              <div className="body">
                                <h6>Phone Call</h6>
                                <p>Called Mike. </p>
                              </div>
                            </div>
                          </div>
                          <div className="activity_main_box">
                            <ul>
                              <li>
                                <NavLink to="#">
                                  <img src="../../images/ds1.svg" />
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="#">
                                  <img src="../../images/ds2.svg" />
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="#">
                                  <img src="../../images/ds3.svg" />
                                </NavLink>
                              </li>
                              <li>
                                <NavLink to="#">
                                  <img src="../../images/ds4.svg" />
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SalesFunnel;
