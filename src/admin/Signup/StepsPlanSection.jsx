import React, { Fragment } from "react";
import SpecificPlanDetails from "./SpecificPlanDetails";

export default function StepsPlanSection(props) {
  let { planDetails, SubscriptionType, selectedPlan } = props;
  function planSelected(id){
    selectedPlan(id);
  }
  return (
    <Fragment>
      <SpecificPlanDetails
        plan={planDetails}
        SubscriptionType={SubscriptionType}
        planSelected={planSelected}
      />
    </Fragment>
  );
}
