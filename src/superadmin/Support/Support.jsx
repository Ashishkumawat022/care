import React from "react";
import "../Support/Support.css";
import Donut1 from "./tasks-graph1";
import Donut2 from "./tasks-graph2";
import Donut3 from "./tasks-graph3";
import Donut4 from "./tasks-graph4";

function Support() {
  return (
    <div className="page-wrapper">
      <div className="container-fluid min_height">
        <div className="row">
          <div className="col-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
            <div className="card">
              <div className="card-body">
                <h4
                  className="card-title text-center"
                  style={{ color: "#9B51E0" }}
                >
                  All Tickets
                </h4>
                <div className="support_box">
                  <div className="graph_box_in">
                    <Donut1 />{" "}
                    <span className="count">
                      06 <br />
                      100%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
            <div className="card">
              <div className="card-body">
                <h4
                  className="card-title text-center"
                  style={{ color: "#34A853" }}
                >
                  Closed{" "}
                </h4>
                <div className="support_box">
                  <div className="graph_box_in">
                    <Donut2 />{" "}
                    <span className="count">
                      06 <br />
                      100%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
            <div className="card">
              <div className="card-body">
                <h4
                  className="card-title text-center"
                  style={{ color: "#828282" }}
                >
                  Open
                </h4>
                <div className="support_box">
                  <div className="graph_box_in">
                    <Donut3 />{" "}
                    <span className="count">
                      06 <br />
                      100%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-12 col-lg-6 col-xl-3 col-xxl-3">
            <div className="card">
              <div className="card-body">
                <h4
                  className="card-title text-center"
                  style={{ color: "#EB4335" }}
                >
                  Overdue
                </h4>
                <div className="support_box">
                  <div className="graph_box_in">
                    <Donut4 />{" "}
                    <span className="count">
                      06 <br />
                      100%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body"></div>
        </div>
        <p>
          When SuperAdmin clicks the View, they see all the details of the
          ticket including the correspondence with Subscriber. They are able to
          send messages from this also . Developer to suggest and implement
          design for this view pop-up.{" "}
        </p>
      </div>
    </div>
  );
}

export default Support;
