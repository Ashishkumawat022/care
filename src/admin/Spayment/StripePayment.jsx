import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./StripePayment.css";
import {
  extraProDetails,
  createAcctApi,
} from "../../redux-toolkit/reducer/accountCreationApiReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  `pk_test_51LPkZLSIumoTSKVr1dRDPoqQY5qUCZqXRxhq3jwPzDoq55Q98KF9qWAejbe23uuc6qCLuejE90ol23ZiF56JpyFV00nfNnohUt`
);
// const stripePromise = loadStripe(`pk_live_51KKC0gG5ZfZ1lNaoE8eew93c0TSWJhJi5YkZbkuRLJamw0A0LaI55tHVU3qGrm8CNQiPKyB9QCbt1dmyhcfVzD5H00I5zwxjsn`);
// console.log(`${process.env.STRIPE_PUBLISHABLE_KEY}`)

const successMessage = () => {
  return (
    <div className="success-msg">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        className="bi bi-check2"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
        />
      </svg>
      <div className="title">Payment Successful</div>
    </div>
  );
};

const cart = () => {
  return (
    <React.Fragment>
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted">Your cart</span>
        <span className="badge bg-secondary badge-pill">3</span>
      </h4>
      <ul className="list-group mb-3">
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">Subscription Plan</h6>
            <small className="text-muted">{extraProDetails.planName}</small>
          </div>
          <span className="text-muted">£{extraProDetails.planPrice}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">Friends & Family Add-On</h6>
            <small className="text-muted">
              Count {extraProDetails.licsCount}
            </small>
          </div>
          <span className="text-muted">
            £{extraProDetails.frndFamAmt * extraProDetails.licsCount}
          </span>
        </li>
        {/* <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 className="my-0">Third item</h6>
          <small className="text-muted">Brief description</small>
        </div>
        <span className="text-muted">₹500</span>
      </li> */}
        <li className="list-group-item d-flex justify-content-between bg-light">
          <div className="text-success">
            <h6 className="my-0">Promo code</h6>
            <small>{extraProDetails.promoName}</small>
          </div>
          <span className="text-success">- £{extraProDetails.amount_off}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Total (GBP)</span>
          <strong>£{extraProDetails.unit_amount}</strong>
        </li>
      </ul>
    </React.Fragment>
  );
};

function StripePayment() {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();
  const { clearLsData } = useSelector(
    (state) => state.accountCreationApiReducer
  );

  let selectedPlanData = [];
  let chargesData = [];
  let regstrApiData = [];
  let adminApiData = [];
  let stripePayData = [];

  useEffect(() => {
    if (paymentCompleted) {
      selectedPlanData = JSON.parse(localStorage.getItem("selectedPlanData"));
      chargesData = JSON.parse(localStorage.getItem("chargesDetails"));
      regstrApiData = JSON.parse(localStorage.getItem("registerData"));
      adminApiData = JSON.parse(localStorage.getItem("registerAdminData"));
      stripePayData = JSON.parse(localStorage.getItem("stripePayData"));
      // console.log(selectedPlanData, 'selectedPlanData');
      // console.log(chargesData, 'chargesData');
      // console.log(regstrApiData, 'regstrApiData');
      // console.log(adminApiData, 'adminApiData');
      // console.log(stripePayData, 'stripePayData');
      registerNewSite();
    }
  }, [paymentCompleted]);

  useEffect(() => {
    if (clearLsData > 0) {
      localStorage.removeItem("selectedPlanData");
      localStorage.removeItem("chargesDetails");
      localStorage.removeItem("registerData");
      localStorage.removeItem("registerAdminData");
      localStorage.removeItem("stripePayData");
      history.push("/admin/login");
    }
  }, [clearLsData]);

  const registerNewSite = () => {
    let data = {
      adminId: adminApiData?._id ? adminApiData?._id : regstrApiData?._id,
      planId: selectedPlanData.planId,
      companyName: regstrApiData.companyName,
      billingAddress: regstrApiData.billingAddress,
      billingEmail: regstrApiData.email,
      billingContact: regstrApiData.mobileNo,
      country: stripePayData.country,
      careSiteName: regstrApiData.careSiteName,
      totalBeds: selectedPlanData.totalBeds,
      carefacility: regstrApiData.carefacility,
      multiCareSite: false,
      planstartDate: Date.now(),
      SubscriptionPlan: selectedPlanData.SubscriptionPlan,
      SubscriptionPlanId: selectedPlanData.SubscriptionPlanId,
      trialExpiry: new Date(),
      monthyOrYearly: selectedPlanData.monthyOrYearly,
      planRate: selectedPlanData.unit_amount,
      currency: stripePayData.currency,
      paymentThrough: "stripe",
      stripe_customer_id: paymentDetails.customerId,
      stripe_Price_id: paymentDetails.priceId,
      couponCode: extraProDetails.promoName
    };
    let id = adminApiData?._id ? adminApiData?._id : regstrApiData?._id;
    dispatch(createAcctApi([data, id]));
    // console.log(data,'final');
  };

  return (
    <div className="stripeContainer container">
      {/* <div className="py-5 text-center">
        <h4>Stripe Integration - <a href="https://www.cluemediator.com/" target="_blank">Clue Mediator</a></h4>
      </div> */}

      <div className="row s-box">
        {paymentCompleted ? (
          successMessage()
        ) : (
          <React.Fragment>
            <div className="col-md-5 order-md-2 mb-4">{cart()}</div>
            <div className="col-md-7 order-md-1">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  amount={extraProDetails.unit_amount}
                  cartDetails={extraProDetails}
                  setPaymentCompleted={setPaymentCompleted}
                  setPaymentDetails={setPaymentDetails}
                />
              </Elements>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default StripePayment;
