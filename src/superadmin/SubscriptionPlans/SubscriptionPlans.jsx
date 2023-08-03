import React, { forwardRef, useImperativeHandle, useState } from "react";
import { NavLink } from "react-router-dom";
import "../SubscriptionPlans/SubscriptionPlans.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { BsFillEyeFill } from "react-icons/bs";

import { AiOutlineConsoleSql, AiOutlineInfoCircle } from "react-icons/ai";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import axios from "axios";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useEffect } from "react";
import Switch from "react-switch";
import _ from "lodash";
import Addplan from "./addplan";
import Editplan from "./editplan";

const MoodRenderer = forwardRef((props, ref) => {

  const imageForMood = (mood) => "../../images/profle.jpg";

  const [mood, setMood] = useState(imageForMood(props.value));

  useImperativeHandle(ref, () => {
    return {
      refresh(props) {
        setMood(imageForMood(props.value));
      },
    };
  });

  return (
    <span className="profle_img_box">
      <img alt="" src={props.data.image} style={{ height: "22px" }} />{" "}
      <stong className="m-0">{props.value}</stong>
    </span>
  );
});

function SubscriptionPlans() {
  const [rowData, setrowData] = useState([]);
  const [popData, setPop] = useState({});

  // console.log(editinputList)

  function getPlans() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getPlans?country=uk`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
      },
    };

    axios(config)
      .then(function (response) {
        setrowData(response.data.plansData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [isShown, setIsShown] = useState(false);
  const [indexVal, setIndexVal] = useState();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getPlans();
  }, []);

  const pagination = true;
  const paginationPageSize = 10;
  const rowHeight = 55;
  const [active, setactive] = useState(false);

  function handleChange(props) {

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/changeplanStatus/${props}`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const ChildMessageRenderer = (props) => {
    const invokeParentMethod = () => {
      setPop(props.data);
      // props.context.methodFromParent(`Row: ${props.node.rowIndex}, Col: ${props.colDef.field}`);
    };

    return (
      <span>
        <span className="status">
          <Switch
            onChange={() => handleChange(props.data._id)}
            checked={props.data.status}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={true}
            checkedIcon={true}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
        </span>
        <NavLink
          className="ms-4"
          data-bs-toggle="modal"
          data-bs-target="#editplan_details_modal"
          data-bs-whatever="@mdo"
          onClick={() => invokeParentMethod()}
          to="#"
        >
          <img src={`${process.env.PUBLIC_URL}/images/edit.svg`} alt="user" />
        </NavLink>
        <NavLink
          className="ms-4 view_icon"
          data-bs-toggle="modal"
          data-bs-target="#viewplan_details_modal"
          data-bs-whatever="@mdo"
          to="#"
        >
          <BsFillEyeFill onClick={() => invokeParentMethod()} />
        </NavLink>
      </span>
    );
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">
            <div className="top_menubar" style={{ width: "auto" }}>
              <ul
                className="nav nav-tabs ract_tab_list border-0"
                id="myTab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    style={{ fontSize: "16px" }}
                    id="tabD-1"
                  >
                    Subscription Plans
                  </button>
                </li>
              </ul>
            </div>
            <div className="float-end btns_head">
              <button
                className="btn btn-theme btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#addplan_modal"
                data-bs-whatever="@mdo"
              >
                Add New Plan
              </button>
            </div>
          </h4>
          <div></div>
          <div
            className="ag-theme-alpine cts_datatable"
            style={{ height: 667 }}
          >
            <AgGridReact
              rowHeight={rowHeight}
              pagination={pagination}
              paginationPageSize={paginationPageSize}
              rowData={rowData}
              components={{}}
              frameworkComponents={{
                childMessageRenderer: ChildMessageRenderer,
                moodRenderer: MoodRenderer,
              }}
            >
              {/* <AgGridColumn width={90} field="SrNo" sortable={false} filter={false}></AgGridColumn> */}
              <AgGridColumn
                width={200}
                cellRenderer="moodRenderer"
                field="planTitle"
                sortable={false}
                filter={false}
              ></AgGridColumn>
              {/* <AgGridColumn field="planPricemonthly" sortable={false} filter={false}></AgGridColumn>
								<AgGridColumn field="planPriceYear" sortable={false} filter={false}></AgGridColumn>
								<AgGridColumn width={300} field="friendAndRelationsMonthly" sortable={false} filter={false}></AgGridColumn>
								<AgGridColumn width={300} field="friendAndRelationsYearly" sortable={false} filter={false}></AgGridColumn> */}
              <AgGridColumn
                width={230}
                field="status"
                cellRenderer="childMessageRenderer"
                colId="params"
                sortable={true}
                filter={true}
              ></AgGridColumn>
            </AgGridReact>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addplan_modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
      >
        <div className="modal-dialog modal-lg">
          <Addplan />
        </div>
      </div>

      <div
        className="modal fade"
        id="editplan_details_modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
      >
        <div className="modal-dialog modal-lg">
          <Editplan editData={popData} />
        </div>
      </div>

      <div
        className="modal fade"
        id="viewplan_details_modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center">
              <h4 className="modal-title" id="exampleModalLabel1">
                Plan Details
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="mb-3 col-md-12">
                    <div className="mb-3 col-md-6">
                      <div className="upload_img mb-3">
                        <img
                          alt=""
                          src={popData?.image}
                          className="fit_img"
                          width="50px"
                          height="50px"
                        />
                        <br />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">Plan Title</label>
                    <h5>{popData?.planTitle}</h5>
                  </div>
                  {/* <div className="mb-3 col-md-3">
											<label className="form-label">Plan Price Monthly</label>
											<h5>{popData?.planPricemonthly}</h5>
										</div>
										<div className="mb-3 col-md-3">
											<label className="form-label">Plan Price yearly</label>
											<h5>{popData?.planPriceYear}</h5>
										</div>
										<div className="mb-3 col-md-6">
											<label className="form-label">Friends And Family User Monthly</label>
											<h5>{popData?.friendAndRelationsMonthly}</h5>
										</div>
										<div className="mb-3 col-md-6">
											<label className="form-label">Friends And Family User Yearly</label>
											<h5>{popData?.friendAndRelationsYearly}</h5>
										</div> */}
                  <div className="col-md-12">
                    <h5 className="mt-2 mb-3">Add Featured</h5>
                    <div className="featuredList">
                      <ul>
                        {
                          // console.log(popData.featureData)
                          popData.featureData?.map((element, index) => {
                            return (
                              <>
                                <li>
                                  {element.features}{" "}
                                  {element.featureinfo == "" ? (
                                    ""
                                  ) : (
                                    <BsFillInfoCircleFill
                                      onMouseEnter={(e) => {
                                        setIsShown(true);
                                        setIndexVal(index);
                                      }}
                                      onMouseLeave={() => setIsShown(false)}
                                    />
                                  )}{" "}
                                </li>
                                {indexVal == index && isShown && (
                                  <div>{element.featureinfo}</div>
                                )}
                              </>
                            );
                          })
                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <p>
        The Subscribers (Service Providers) data is captured from the Website1
        when they start the plan. Developer to suggest what other information
        should be included in the Table
      </p>
    </>
  );
}

export default SubscriptionPlans;
