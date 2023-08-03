import React, { Fragment } from "react";

export default function TrailPeriod({ planName }) {
  return (
    <Fragment>
      {planName !== "Base" && <p className="trail">30 Days Free Trial</p>}
      {planName === "Base" && <p className="trail"></p>}
    </Fragment>
  );
}
