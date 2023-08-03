import React, { Fragment, useState } from "react";
import PlanHeaderSection from "./PlanHeaderSection";
import FeatureSection from "./FeatureSection";
import FriendsAndFamilyAppSection from "./FriendsAndFamilyAppSection";
import RedirectionLinks from "./RedirectionLink";
import TrailPeriod from "./TrialPeriod";

export default function PlanSection(props) {
  const [fandfData, setfandfData] = useState({});
  let { planDetails, SubscriptionType } = props;
  console.log(planDetails, "PlanSection PlanSection");

  function fandfselectHandler(data, status, event) {
    setfandfData({ planName: data, fandfStatus: status, count: event });
  }

  return (
    <Fragment>
      <div className="col-md-3 plan_main">
        <div className="plan_box">
          {/* image section  */}
          <PlanHeaderSection
            plan={planDetails}
            SubscriptionType={SubscriptionType}
          />

          {/* feature section  */}
          <FeatureSection features={planDetails?.featureList} />

          {/* friends and family app  */}

          <FriendsAndFamilyAppSection
            planName={planDetails?.planName}
            data={planDetails}
            fandfselectHandler={fandfselectHandler}
          />
          {/* showing free trial or not */}

          <TrailPeriod planName={planDetails?.planName} />

          {/* get started button for redirection
           */}

          <RedirectionLinks
            fandfData={fandfData}
            planName={planDetails?.planName}
            planId={planDetails?._id}
            prize={+planDetails?.combined?.FandFappData[0]?.unitPrice}
          />
        </div>
      </div>
    </Fragment>
  );
}
