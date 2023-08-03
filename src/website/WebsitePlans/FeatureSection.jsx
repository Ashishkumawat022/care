import React, { Fragment } from "react";
import InformationText from "./InformationText";

export default function FeatureSection(props) {
  let { features } = props;
  console.log(features, "FeatureSection");
  return (
    <Fragment>
      <ul>
        {features?.length > 0 &&
          features?.map((feature, index) => {
            return (
              <Feature
                key={index}
                infoText={feature?.infoText}
                name={feature?.name}
              />
            );
          })}
      </ul>
    </Fragment>
  );
}

function Feature(props) {
  let { infoText, name } = props;
  return (
    <li>
      <img alt="check" src={`${process.env.PUBLIC_URL}/images/check.svg`} />
      {name}
      {infoText !== "" && <InformationText infoText={infoText} />}
    </li>
  );
}
