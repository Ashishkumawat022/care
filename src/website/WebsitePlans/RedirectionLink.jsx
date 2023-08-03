import React from "react";
import { Fragment } from "react";

export default function RedirectionLinks(props) {
  let { planName, planId, prize, fandfData } = props;
  console.log(fandfData);
  return (
    <Fragment>
      <div className="bottom_box">
        <span
          className="btn"
          onClick={(e) => {
            e.preventDefault();
            window.open(
              `${
                process.env.REACT_APP_REDIRECTION_URL_PLAN
              }/signup/${fandfData?.planName?.toLowerCase()}/${planId}${
                fandfData?.fandfStatus ? "/" + fandfData?.count : ""
              }`,
              "_blank",
              "noopener,noreferrer"
            );
          }}
        >
          Get Started
        </span>
      </div>
    </Fragment>
  );
}
