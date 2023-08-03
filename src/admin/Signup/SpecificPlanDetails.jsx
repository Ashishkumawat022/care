import React, { Fragment } from "react";

export default function SpecificPlanDetails(props) {
  let { plan, SubscriptionType, planSelected } = props;

  return (
    <Fragment>
      <div className="row planSelect">
        <div className="col">
          <img
            alt=""
            className="me-2"
            width="40px"
            height={"50px"}
            src={plan?.image}
          />
        </div>
        <div className="col text-start">
          <h5>{plan?.planName}</h5>
        </div>
        <div className="col">
          <span>Features</span>
        </div>
        <div className="col">
          <h5>
            £{" "}
            {SubscriptionType ? plan?.unitPriceYearly : plan?.unitPriceMonthly}
          </h5>
        </div>
        <div className="col">
          <h5> {SubscriptionType ? "/year" : " /month"}</h5>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <input type="radio" name="subscriptionPlan" value={plan?._id} 
          onChange={(e) => planSelected(e.target.value)}/>
        </div>
      </div>
    </Fragment>
  );
}
