import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAcctApi,
  extraProDetails,
  completeRedirctFlow,
  completeRedirctFlowApiData
} from "../../redux-toolkit/reducer/accountCreationApiReducer";
import { useHistory } from "react-router-dom";

export default function CardlessPaymentSuccess() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [startPaymentApiData, setStartPaymentApiData] = useState([]);
  const [selectedPlanData, setSelectedPlanData] = useState([]);
  const [cardlessData, setCardlessData] = useState([]);

  const { clearLsData, runAccountCreateApi } = useSelector(
    (state) => state.accountCreationApiReducer
  );

  let chargesData = [];
  let regstrApiData = [];
  let adminApiData = [];

  useEffect(() => {
    let strtPayApiData = JSON.parse(localStorage.getItem("startPayApiData"));
    let planData = JSON.parse(localStorage.getItem("selectedPlanData"));
    let goCardData = JSON.parse(localStorage.getItem("goCardlessData"));
    // console.log(strtPayApiData, planData, 'payment sucess page useeffect');
    setStartPaymentApiData(strtPayApiData);
    setSelectedPlanData(planData);
    setCardlessData(goCardData)
    if (strtPayApiData) {
      const billingRequestData = {
        redirectFlowId: strtPayApiData.data.id,
        session_token: strtPayApiData.data.session_token,
        amount: planData.unit_amount,
        currency: goCardData.currency,
        planName: planData.SubscriptionPlan,
        frequency: planData.monthyOrYearly.toLowerCase(),
        paymentStartDate: "2023-02-11"
      };
      dispatch(completeRedirctFlow(billingRequestData));
    }
  }, []);

  useEffect(() => {
    // console.log(completeRedirctFlowApiData, 'completeRedirctFlowApiData in success useeffect');
    if (completeRedirctFlowApiData) {
      chargesData = JSON.parse(localStorage.getItem("chargesDetails"));
      regstrApiData = JSON.parse(localStorage.getItem("registerData"));
      adminApiData = JSON.parse(localStorage.getItem("registerAdminData"));
      isFormValidCheck();
    }
  }, [runAccountCreateApi]);

  useEffect(() => {
    if (clearLsData > 0) {
      // console.log(clearLsData, "clearLsData");
      localStorage.removeItem("goCardlessData");
      localStorage.removeItem("selectedPlanData");
      localStorage.removeItem("startPayApiData");
      localStorage.removeItem("chargesDetails");
      localStorage.removeItem("registerData");
      localStorage.removeItem("registerAdminData");
      history.push("/admin/login");
    }
  }, [clearLsData]);

  const isFormValidCheck = () => {
    // console.log(cardlessData, selectedPlanData);
    let data = {
      adminId: adminApiData?._id ? adminApiData?._id : regstrApiData?._id,
      planId: selectedPlanData.planId,
      companyName: selectedPlanData?.companyName,
      billingAddress: cardlessData?.billingAddress,
      billingEmail: cardlessData?.billingEmail,
      billingContact: cardlessData?.billingContact,
      country: cardlessData?.country,
      careSiteName: cardlessData?.careSiteName,
      totalBeds: selectedPlanData?.totalBeds,
      carefacility: selectedPlanData?.carefacility,
      multiCareSite: false,
      planstartDate: Date.now(),
      SubscriptionPlan: selectedPlanData?.SubscriptionPlan,
      SubscriptionPlanId: selectedPlanData?.SubscriptionPlanId,
      trialExpiry: "",
      monthyOrYearly: selectedPlanData?.monthyOrYearly,
      planRate: selectedPlanData?.unit_amount,
      currency: cardlessData?.currency,
      paymentThrough: "gocardless",
      goCardLess_mandate_id: completeRedirctFlowApiData.data.links.mandate,
      goCardLess_customer_id: completeRedirctFlowApiData.data.links.customer,
      goCardLess_BankAccount_id: completeRedirctFlowApiData.data.links.customer_bank_account,
      goCardLess_subscription_id: completeRedirctFlowApiData.subscription.id,
      chargesDetails: chargesData,
      couponCode: extraProDetails.promoName
    };
    // console.log(data);
    let id = adminApiData?._id ? adminApiData?._id : regstrApiData?._id;
    dispatch(createAcctApi([data, id]));
  };

  return (
    <div className="col-md-6" style={{ paddingTop: "60px", margin: "auto" }}>
      <h2 className="themeColor d-flex justify-content-center">
        Payment Successfull !
      </h2>
      <div className="col-md-12 contentCreate  d-flex justify-content-center">
        <p>Your Payment is Successfull for payment of £ 300 </p>
      </div>
    </div>
  );
}
