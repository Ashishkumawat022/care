import React, { Fragment } from "react";

export default function PlanHeaderSection(props) {
  let { plan, SubscriptionType } = props;
  return (
    <Fragment>
      <div className="plan_box_img">
        <img alt="" src={plan?.image} width="40px" height={"50px"} />
        <h3>
          <b>
            £{" "}
            {SubscriptionType ? plan?.unitPriceYearly : plan?.unitPriceMonthly}
          </b>
          <br />
          {SubscriptionType ? "/year" : " /month"}
        </h3>
        <h2>{plan?.planName}</h2>
      </div>
    </Fragment>
  );
}
