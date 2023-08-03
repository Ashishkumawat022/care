import React from "react";
import { useState } from "react";
import GoCardlessPayment from "./GoCardlessPayment";
// import "./signup.css";
import StripePayment from "../Spayment/StripePayment";

export default function FinalStepPaymentRedirection() {

  const [selectedTab, setSelectedTab] = useState(true);

  function handleTabSelection(type) {
    // console.log(type);
    setSelectedTab(type === "cardless" ? true : false);
  }

  const tabStyle = {
    marginRight: "20px",
    cursor: "pointer",
    fontWeight: "600",
  };

  const styleNone = {
    marginRight: "20px",
    cursor: "pointer",
  };


  return (
    <>
      <div className="themeColor mt-5 promotionalCode d-flex justify-content-center">
        <h4
          style={selectedTab ? tabStyle : styleNone}
          onClick={() => handleTabSelection("cardless")}
        >
          Direct Debit
        </h4>
        <hr />
        <h4
          style={selectedTab ? styleNone : tabStyle}
          className="ms-3"
          onClick={() => handleTabSelection("stripe")}
        >
          Credit Card
        </h4>
        <hr />
      </div>
      {selectedTab &&
        <GoCardlessPayment />
      }
      {!selectedTab &&
        <StripePayment />
      }

    </>
  );
}
