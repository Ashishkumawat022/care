import React from "react";
import { useState, Fragment } from "react";
import FormButton from "./FormNextButton";
// import "./signup.css";
import useInput from "../../hooks/use-input";
import country from "./countries.json";
import {
  changeButton,
  OwnerandCareSiteDetails,
  createRedirctFlow,
  planDetails,
  extraProDetails,
  createRedirctFlowData,
  completeRedirctFlow,
  billRequestFlow,
  completeRedirctFlowApiData,
  billRequestFlowApiData,
} from "../../redux-toolkit/reducer/accountCreationApiReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import SnackBar from "../../components/SnackBar/SnackBar";

let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const isPasswordValidate = (value) => value.length >= 6;
const isEmail = (value) => value.match(emailRegex);
const ismobileNumber = (value) => value.length > 8;
const isEmpty = (value) => value.trim() !== "";

export default function GoCardlessPayment() {
  const [loading, setLoading] = useState(false);
  const [inValid, setInvalid] = useState(false);
  const [status, setStatus] = useState("info");
  const [countryData, setCountryData] = useState({
    name: "",
    currencyCode: "",
    countryCode: "",
  });

  const dispatch = useDispatch();

  const {
    runBillRequestApi,
    runAccountCreateApi,
    redirectToPaymentPage,
    paymentLoading,
  } = useSelector((state) => state.accountCreationApiReducer);

  useEffect(() => {
    console.log(createRedirctFlowData, "createRedirctFlowData");
    if (createRedirctFlowData) {
      window.location.replace(createRedirctFlowData.data.redirect_url);
    }
  }, [runBillRequestApi]);

  // useEffect(() => {
  //   // customerId: startPaymentApiData.data.goCardLess_customer_id,
  //   // customerBankAccountId:
  //   //   startPaymentApiData.data.goCardLess_BankAccount_id,
  //   // description: "testing billing request api",
  //   // amount: (planDetails.unit_amount * 100).toString(),
  //   // currency: countryData.currencyCode,
  //   // planId: extraProDetails.productId,
  //   if (startPaymentApiData) {
  //     const billingRequestData = {
  //       redirectFlowId: startPaymentApiData.data.id,
  //       session_token: startPaymentApiData.data.session_token,
  //       amount: "1500",
  //       currency: "GBP",
  //       planName: "Advaced",
  //       frequency: "monthly",
  //       paymentStartDate: "2023-02-11"
  //     };
  //     dispatch(createBillingRequest(billingRequestData));
  //   }
  // }, [runBillRequestApi]);

  // useEffect(() => {
  //   if (billRequestApiData) {
  //     const billReqFlow = {
  //       billingRequestId: billRequestApiData.data.id,
  //       redirect_uri: "http://localhost:3000/admin/multistepsignupform/paymentStatus",
  //       exit_uri: "http://localhost:3000/admin/multistepsignupform",
  //     };
  //     dispatch(billRequestFlow(billReqFlow));
  //   }
  // }, [runBillRequestFlowApi]);

  // useEffect(() => {
  //   if (billRequestFlowApiData) {
  //     // window.open(billRequestFlowApiData.data.authorisation_url);
  //     window.location.replace(billRequestFlowApiData.data.authorisation_url);
  //   }
  // }, [redirectToPaymentPage]);

  const {
    value: acctHolderNameValue,
    isValid: acctHolderNameIsValid,
    hasError: acctHolderNameHasError,
    valueChangeHandler: acctHolderChangeHandler,
    inputBlurHandler: acctHolderNameBlurHandler,
  } = useInput(isEmpty);

  const {
    value: acctNoValue,
    isValid: acctNoIsValid,
    hasError: acctNoHasError,
    valueChangeHandler: acctNoChangeHandler,
    inputBlurHandler: acctNoBlurHandler,
  } = useInput(isPasswordValidate);

  const {
    value: branchCodeValue,
    isValid: branchCodeIsValid,
    hasError: branchCodeHasError,
    valueChangeHandler: branchCodeChangeHandler,
    inputBlurHandler: branchCodeBlurHandler,
  } = useInput(isEmpty);

  const {
    value: billingAddressValue,
    isValid: billingAddresIsValid,
    hasError: billingAddresHasError,
    valueChangeHandler: billingAddressChangeHandler,
    inputBlurHandler: billingAddressBlurHandler,
  } = useInput(isEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail);

  const {
    value: mobileNumberValue,
    isValid: mobileNumberIsValid,
    hasError: mobileNumberHasError,
    valueChangeHandler: mobileNumberChangeHandler,
    inputBlurHandler: mobileNumberBlurHandler,
  } = useInput(ismobileNumber);

  const emailClasses = emailHasError ? "form-control invalid" : "form-control";
  const branchCodeClasses = branchCodeHasError
    ? "form-control invalid"
    : "form-control";
  const billingAddressClasses = billingAddresHasError
    ? "form-control invalid"
    : "form-control";
  const acctNoClasses = acctNoHasError
    ? "form-control invalid"
    : "form-control";
  const acctHolderNameClasses = acctHolderNameHasError
    ? "form-control invalid"
    : "form-control";
  const mobileNumberClasses = mobileNumberHasError
    ? "form-control invalid"
    : "form-control";

  const isFormValidCheck = () => {
    if (emailIsValid && mobileNumberIsValid && billingAddresIsValid) {
      let goCardData = {
        billingAddress: billingAddressValue,
        billingEmail: emailValue,
        billingContact: mobileNumberValue,
        careSiteName: OwnerandCareSiteDetails.careSiteName,
        currency: countryData.currencyCode,
        country: countryData.name,
        paymentThrough: "gocardless",
        interval: planDetails.monthyOrYearly === "Monthly" ? "Month" : "Year",
        unit_amount: planDetails.unit_amount,
        product_id: extraProDetails.productId,
        city: OwnerandCareSiteDetails.billingAddress.split(",")[1],
        postal_code: "E8 3GX", //change this on final check as OwnerandCareSiteDetails.billingAddress.split(',')[2]
        country_code: countryData.countryCode,
        companyLastName: "care",
      };
      let data = {
        billingAddress: billingAddressValue,
        billingEmail: emailValue,
        careSiteName: OwnerandCareSiteDetails.careSiteName,
        paymentThrough: "gocardless",
        city: OwnerandCareSiteDetails.billingAddress.split(",")[1],
        postal_code: "E8 3GX",
        companyLastName: "care",
        redirect_uri:
          "http://caremagnusbundled.s3-website.eu-west-2.amazonaws.com/admin/multistepsignupform/paymentStatus",
      };
      setInvalid(false);
      localStorage.setItem("goCardlessData", JSON.stringify(goCardData));
      // dispatch(nextStepFuncFourthForm(data));
      dispatch(createRedirctFlow(data));
    } else {
      setInvalid(true);
      setStatus("error");
      setTimeout(() => {
        setInvalid(false);
      }, 4000);
    }
  };

  const onSelectCountry = (name, currCode, contCode) => {
    // console.log(name, currCode, contCode);
    setCountryData({
      name: name,
      currencyCode: currCode,
      countryCode: contCode,
    });
  };

  return (
    <>
      <div className="stripeContainer container">
        {/* <div className="py-5 text-center">
        <h4>Stripe Integration - <a href="https://www.cluemediator.com/" target="_blank">Clue Mediator</a></h4>
      </div> */}

        <div className="row s-box">
          <React.Fragment>
            <div className="col-md-5 order-md-2 mb-4">{cart()}</div>
            <div className="col-md-7 order-md-1">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Payment Details</span>
              </h4>
              {/* <h4 className="fw-normal">Payment Details</h4> */}
              <div className="col-md-12 order-md-1">
                {/* <p className="d-flex justify-content-center">
                Fill the details to procced for payment of £{" "}
                {planDetails?.unit_amount}
              </p> */}
                <div className="col-md-12">
                  <form>
                    <div className="col-md-12">
                      {/* <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="cc-name">Account holder name</label>
                        <input
                          type="text"
                          id="companyName"
                          value={acctHolderNameValue}
                          onChange={acctHolderChangeHandler}
                          onBlur={acctHolderNameBlurHandler}
                          className={acctHolderNameClasses}
                          // placeholder="Account holder name"
                        />
                        {acctHolderNameHasError && (
                          <span style={{ color: "red" }}>
                            Please Enter Account holder name
                          </span>
                        )}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="cc-name">Account number</label>
                        <input
                          type="number"
                          id="postalCode"
                          value={acctNoValue}
                          onChange={acctNoChangeHandler}
                          onBlur={acctNoBlurHandler}
                          className={acctNoClasses}
                          // placeholder="Account number"
                        />
                        {acctNoHasError && (
                          <span style={{ color: "red" }}>
                            Please Enter account number
                          </span>
                        )}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="cc-name">Branch Code</label>
                        <input
                          type="text"
                          id="billingAddress"
                          value={branchCodeValue}
                          onChange={branchCodeChangeHandler}
                          onBlur={branchCodeBlurHandler}
                          className={branchCodeClasses}
                          // placeholder="Branch Code"
                        />
                        {branchCodeHasError && (
                          <span style={{ color: "red" }}>
                            Please Enter branch code
                          </span>
                        )}
                      </div>
                    </div> */}

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="cc-name">Mobile Number</label>
                          <input
                            type="number"
                            id="mobileNumber"
                            value={mobileNumberValue}
                            onChange={mobileNumberChangeHandler}
                            onBlur={mobileNumberBlurHandler}
                            className={mobileNumberClasses}
                            // placeholder="Mobile Number"
                          />
                          {mobileNumberHasError && (
                            <span style={{ color: "red" }}>
                              Please Enter Mobile Number
                            </span>
                          )}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="cc-name">Billing Email</label>
                          <input
                            type="email"
                            id="email"
                            value={emailValue}
                            onChange={emailChangeHandler}
                            onBlur={emailBlurHandler}
                            className={emailClasses}
                            // placeholder="Enter Email"
                          />
                          {emailHasError && (
                            <span style={{ color: "red" }}>
                              Please enter a valid email address.
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="cc-name">Billing Address</label>
                          <input
                            type="text"
                            id="billingAddress"
                            value={billingAddressValue}
                            onChange={billingAddressChangeHandler}
                            onBlur={billingAddressBlurHandler}
                            className={billingAddressClasses}
                            // placeholder="Billing Address"
                          />
                          {billingAddresHasError && (
                            <span style={{ color: "red" }}>
                              Please Enter address
                            </span>
                          )}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="cc-name">
                            Search and select country
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            style={{ marginBottom: "0" }}
                            value={countryData.name}
                            // placeholder="Search and select country"
                            onChange={(e) =>
                              setCountryData({
                                ...countryData,
                                name: e.target.value,
                              })
                            }
                          />
                          <div className="countryDropdown">
                            {country.countries
                              .filter((item) => {
                                const searchTerm =
                                  countryData.name.toLowerCase();
                                const fullName =
                                  item?.countryName.toLowerCase();
                                return (
                                  searchTerm &&
                                  fullName.startsWith(searchTerm) &&
                                  fullName !== searchTerm
                                );
                              })
                              .slice(0, 5)
                              .map((item) => (
                                <div
                                  onClick={() =>
                                    onSelectCountry(
                                      item.countryName,
                                      item.currencyCode,
                                      item.countryCode
                                    )
                                  }
                                  className="dropdownRow"
                                  key={item.countryCode}
                                >
                                  {item.countryName}
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        {/* <div className="col-md-6 mb-3">
                        <label htmlFor="cc-name">Name on card</label>
                        <input
                          type="text"
                          id="billingAddress"
                          value={billingAddressValue}
                          onChange={billingAddressChangeHandler}
                          onBlur={billingAddressBlurHandler}
                          className={billingAddressClasses}
                        // placeholder="Billing Address"
                        />
                        {billingAddresHasError && (
                          <span style={{ color: "red" }}>Please Enter address</span>
                        )}
                      </div> */}
                      </div>
                    </div>

                    <div className="col-md-12 submitBtn">
                      <button
                        type="button"
                        className="form-control btn"
                        style={{ display: "inline-block" }}
                        onClick={() => {
                          isFormValidCheck();
                        }}
                      >
                        Pay £ {planDetails?.unit_amount}
                      </button>
                    </div>

                    {/* <div className="d-flex justify-content-center">
                    <button className="btn card-btn w-50" type="submit" disabled={loading}>
                      {loading ? <div className="spinner-border spinner-border-sm text-light" onClick={(e) => isFormValidCheck(e)} role="status"></div> : `PAY ₹ 500`}
                    </button>
                  </div> */}

                    {/* <FormButton isFormValidCheck={isFormValidCheck} /> */}

                    {paymentLoading && (
                      <div className="loaderPage">
                        <CircularProgress className="spinnerLoader" />
                      </div>
                    )}
                  </form>
                  <SnackBar
                    isInvalid={inValid}
                    status={status}
                    hideDuration={4000}
                    textmessage="All fields are required"
                  />
                </div>
              </div>
            </div>
          </React.Fragment>
        </div>
      </div>
    </>
  );
}

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
