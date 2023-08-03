import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import "./signup.css";
import swal from "sweetalert";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useInput from "../../hooks/use-input";
import { AccessManagementDefaultRoles } from "../../constants/roles";

let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const isPasswordValidate = (value) => value.length >= 6;
const isEmail = (value) => value.match(emailRegex);
const ismobileNumber = (value) => value.length == 10;
const isEmpty = (value) => value.trim() !== "";

function Signup() {
  const param = useParams();
  console.log(param.plan, "param");

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isPasswordValidate);

  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput(isEmpty);

  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput(isEmpty);

  const {
    value: mobileNumberValue,
    isValid: mobileNumberIsValid,
    hasError: mobileNumberHasError,
    valueChangeHandler: mobileNumberChangeHandler,
    inputBlurHandler: mobileNumberBlurHandler,
  } = useInput(ismobileNumber);

  const {
    value: billingAddressValue,
    isValid: billingAddressIsValid,
    hasError: billingAddressHasError,
    valueChangeHandler: billingAddressChangeHandler,
    inputBlurHandler: billingAddressBlurHandler,
  } = useInput(isEmpty);

  const {
    value: billingCityValue,
    isValid: billingCityIsValid,
    hasError: billingCityHasError,
    valueChangeHandler: billingCityChangeHandler,
    inputBlurHandler: billingCityBlurHandler,
  } = useInput(isEmpty);

  const {
    value: billingCountryValue,
    isValid: billingCountryIsValid,
    hasError: billingCountryHasError,
    valueChangeHandler: billingCountryChangeHandler,
    inputBlurHandler: billingCountryBlurHandler,
  } = useInput(isEmpty);

  const {
    value: postalCodeValue,
    isValid: postalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
  } = useInput(isPasswordValidate);

  const {
    value: companyNameValue,
    isValid: companyNameIsValid,
    hasError: companyNameHasError,
    valueChangeHandler: companyNameChangeHandler,
    inputBlurHandler: companyNameBlurHandler,
  } = useInput(isEmpty);

  const {
    value: careSiteNameValue,
    isValid: careSiteNameIsValid,
    hasError: careSiteNameHasError,
    valueChangeHandler: careSiteNameChangeHandler,
    inputBlurHandler: careSiteNameBlurHandler,
  } = useInput(isEmpty);

  const {
    value: bedsNumberValue,
    isValid: bedsNumberIsValid,
    hasError: bedsNumberHasError,
    valueChangeHandler: bedsNumberChangeHandler,
    inputBlurHandler: bedsNumberBlurHandler,
  } = useInput(isEmpty);

  const {
    value: emailAdminValue,
    isValid: emailAdminIsValid,
    hasError: emailAdminHasError,
    valueChangeHandler: emailAdminChangeHandler,
    inputBlurHandler: emailAdminBlurHandler,
  } = useInput(isEmail);

  const {
    value: firstNameAdminValue,
    isValid: firstNameAdminIsValid,
    hasError: firstNameAdminHasError,
    valueChangeHandler: firstNameAdminChangeHandler,
    inputBlurHandler: firstNameAdminBlurHandler,
  } = useInput(isEmpty);

  const {
    value: lastNameAdminValue,
    isValid: lastNameAdminIsValid,
    hasError: lastNameAdminHasError,
    valueChangeHandler: lastNameAdminChangeHandler,
    inputBlurHandler: lastNameAdminBlurHandler,
  } = useInput(isEmpty);

  const {
    value: mobileNumberAdminValue,
    isValid: mobileNumberAdminIsValid,
    hasError: mobileNumberAdminHasError,
    valueChangeHandler: mobileNumberAdminChangeHandler,
    inputBlurHandler: mobileNumberAdminBlurHandler,
  } = useInput(ismobileNumber);

  let history = useHistory();

  const [next0, setNext0] = useState(true);
  const [next1, setNext1] = useState(false);
  const [next2, setNext2] = useState(false);
  const [next3, setNext3] = useState(false);
  const [carehometype, setcarehometype] = useState();
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const [subscriptionPlanId, setSubscriptionPlanId] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [addpack, setAddpack] = useState("");
  const [sliderValue, setSliderValue] = useState(20);
  const [err, setErr] = useState("");

  // --------------- Get SubscriptionPlan data based on type of plan ------------------ //
  // str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  function subPlansData(subscriptiontype) {
    let config = {
      method: "GET",
      url: `${
        process.env.REACT_APP_BASEURL
      }/admin/subPlansData?SubscriptionPlan=${
        subscriptiontype.charAt(0).toUpperCase() +
        subscriptiontype.slice(1).toLowerCase()
      }`,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGl0LmFwcGljQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2IiwiYWRtaW5JZCI6IjYzMGM2YTBlNzMyZGVlMmU5YzU0NWIyYSIsImlhdCI6MTY2MjU1MDQzOH0.yNWWO31yYVIl05nnS8u94oQOANqf-g9qrZMe6TKX9Kw",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data.data, "subPlansData");
        setSubscriptionPlanId(response.data.data._id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    if (param.plan) {
      setSubscriptionPlan(param.plan);
      const timer = setTimeout(() => {
        subPlansData(param.plan);
      }, 500);
      setSubscriptionPlanId(param.planid);
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  const PrettoSlider = styled(Slider)({
    color: "#9E61E7",
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 24,
      width: 24,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#9E61E7",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
  });

  function registerOwner() {
    let data = JSON.stringify({
      email: emailValue,
      password: passwordValue,
      firstName: firstNameValue,
      lastName: lastNameValue,
      mobileNo: mobileNumberValue,
      companyName: companyNameValue,
      careSiteName: careSiteNameValue,
      carefacility: carehometype,
      userType: "owner",
      role: AccessManagementDefaultRoles[0],
      totalBeds: bedsNumberValue,
    });

    let config = {
      method: "POST",
      url: `${process.env.REACT_APP_BASEURL}/register`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response, "config");
        setOwnerId(response.data.registerData._id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function registerAdmin() {
    let data = JSON.stringify({
      userType: adminRadio === "yes" ? "owner" : "admin",
      ownerId: ownerId,
      email: emailAdminValue,
      firstName: firstNameAdminValue,
      lastName: lastNameAdminValue,
      mobile: mobileNumberAdminValue,
      role:
        adminRadio === "yes"
          ? AccessManagementDefaultRoles[0]
          : AccessManagementDefaultRoles[1],
    });

    let config = {
      method: "POST",
      url: `${process.env.REACT_APP_BASEURL}/registeradmin`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response, "config");
        if (response.status) {
          swal("Success", response.data.message, "success").then((value) => {
            setNext0(false);
            setNext1(false);
            setNext2(false);
            setNext3(true);
          });
        } else {
          setNext0(false);
          setNext1(false);
          setNext2(true);
          setNext3(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function registerPlan() {
    let data = JSON.stringify({
      ownerId: ownerId ? ownerId : "",
      SubscriptionPlan: subscriptionPlan,
      planId: subscriptionPlanId,
      Addpack: addpack,
      NoOfuser: sliderValue,
    });

    let config = {
      method: "POST",
      url: `${process.env.REACT_APP_BASEURL}/selectplans`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response, "config");
        if (response.data.status === true) {
          swal("Success", response.data.message, "success").then((value) => {
            history.push("/admin/dashboard");
          });
        } else {
          swal("failed", response.data.message, "failed").then((value) => {
            history.push("/admin/signup");
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // adding data inside subscriberplan in owner details

  function registerNewSite() {
    var future = new Date();
    future.setDate(future.getDate() + 30);
    let planenddate =
      subscriptionPlan == "base" ? Date.parse(new Date()) : Date.parse(future);
    let planstartdate = Date.parse(new Date());
    let data = JSON.stringify({
      ownerId: ownerId ? ownerId : "",
      SubscriptionPlan: subscriptionPlan,
      planId: subscriptionPlanId,
      planendDate: planenddate,
      planstartDate: planstartdate,
      siteCreationDate: new Date(),
      Addpack: addpack,
      NoOfuser: sliderValue,
      totalBeds: bedsNumberValue,
      companyName: companyNameValue,
      careSiteName: careSiteNameValue,
      carefacility: carehometype,
      chargesDetails: [
        {
          discription: "Advanced",
          rate: 500,
          qty: 1,
          tax: 100,
          amount: 600,
        },
        {
          discription: "Friends & Family App",
          rate: 200,
          qty: 1,
          tax: 40,
          amount: 240,
        },
        {
          discription: "Dicount Coupon",
          rate: 50,
          qty: 1,
          tax: 10,
          amount: 60,
        },
      ],
    });

    let config = {
      method: "POST",
      url: `${
        process.env.REACT_APP_BASEURL
      }/registerNewSite?adminId=${ownerId}&SubscriptionPlan=${
        subscriptionPlan.charAt(0).toUpperCase() +
        subscriptionPlan.slice(1).toLowerCase()
      }`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(response, "config");
        if (response.data.status === true) {
          swal("Success", response.data.message, "success").then((value) => {
            history.push("/admin/dashboard");
          });
        } else {
          swal("failed", response.data.message, "failed").then((value) => {
            history.push("/admin/signup");
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [adminRadio, setAdminRadio] = useState("no");
  const onRadioHandler = (event) => {
    console.log(event.target.value);
    setAdminRadio(event.target.value);
  };
  const addpackHandler = (event) => {
    console.log(event.target.value);
    setAddpack(event.target.value);
  };

  const subscriptionPlanHandler = (event) => {
    setErr("");
    subPlansData(event.target.value);
    console.log(event.target.value);
    setSubscriptionPlan(event.target.value);
  };

  const emailClasses = emailHasError ? "form-control invalid" : "form-control";
  const passwordClasses = passwordHasError
    ? "form-control invalid"
    : "form-control";
  const firstNameClasses = firstNameHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameClasses = lastNameHasError
    ? "form-control invalid"
    : "form-control";
  const mobileNumberClasses = mobileNumberHasError
    ? "form-control invalid"
    : "form-control";
  const billingAddressClasses = billingAddressHasError
    ? "form-control invalid"
    : "form-control";
  const billingCityClasses = billingCityHasError
    ? "form-control invalid"
    : "form-control";
  const billingCountryClasses = billingCountryHasError
    ? "form-control invalid"
    : "form-control";
  const postalCodeClasses = postalCodeHasError
    ? "form-control invalid"
    : "form-control";
  const companyNameClasses = companyNameHasError
    ? "form-control invalid"
    : "form-control";
  const careSiteNameClasses = careSiteNameHasError
    ? "form-control invalid"
    : "form-control";
  const bedsNumberClasses = bedsNumberHasError
    ? "form-control invalid"
    : "form-control";
  const emailAdminClasses = emailAdminHasError
    ? "form-control invalid"
    : "form-control";
  const firstNameAdminClasses = firstNameAdminHasError
    ? "form-control invalid"
    : "form-control";
  const lastNameAdminClasses = lastNameAdminHasError
    ? "form-control invalid"
    : "form-control";
  const mobileNumberAdminClasses = mobileNumberAdminHasError
    ? "form-control invalid"
    : "form-control";

  const handleNextone = () => {
    if (
      emailIsValid &&
      passwordIsValid &&
      firstNameIsValid &&
      lastNameIsValid &&
      mobileNumberIsValid &&
      billingAddressIsValid &&
      billingCityIsValid &&
      billingCountryIsValid &&
      postalCodeIsValid
    ) {
      setNext0(false);
      setNext1(true);
      setNext2(false);
      setNext3(false);
    } else {
      swal("All fields are required");
    }
  };

  const handleNexttwo = () => {
    if (companyNameIsValid && careSiteNameIsValid && bedsNumberIsValid) {
      setNext0(false);
      setNext1(false);
      setNext2(true);
      setNext3(false);
      registerOwner();
    } else {
      swal("All fields are required");
    }
  };

  const handleNextthree = () => {
    console.log(adminRadio, "handleNextthree");
    if (adminRadio === "no") {
      if (
        emailAdminIsValid &&
        firstNameAdminIsValid &&
        lastNameAdminIsValid &&
        mobileNumberAdminIsValid
      ) {
        registerAdmin();
      } else {
        swal("All fields are required");
      }
    } else {
      setNext0(false);
      setNext1(false);
      setNext2(false);
      setNext3(true);
    }
  };
  return (
    <section className="login_section">
      <div className="login_header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12 logo_box">
              <NavLink className="navbar-brand" to="">
                <b className="logo-icon">
                  <img
                    alt=""
                    src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/logo.svg`}
                  />
                </b>
              </NavLink>
            </div>
            <div className="col-md-9">
              <div className="login_title">
                <h1>Care Management Simplified!</h1>
                <p>
                  Welcome to your new experience of care management. Our
                  powerful, easy to use and intuitive care platform, enables you
                  to easily manage all you care tasks.
                </p>
              </div>
            </div>
            <div className="col-md-3 img_box">
              <img
                alt=""
                src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/login.svg`}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="col-md-4 form_box"
        style={{ display: `${!next0 ? "none" : "block"}` }}
      >
        <form>
          <h4>Create Account</h4>
          <input
            type="email"
            id="email"
            value={emailValue}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            className={emailClasses}
            placeholder="Email"
          />
          {emailHasError && (
            <span style={{ color: "red" }}>
              Please enter a valid email address.
            </span>
          )}
          <input
            type="password"
            id="password"
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            className={passwordClasses}
            placeholder="Password"
          />
          {passwordHasError && (
            <span style={{ color: "red" }}>Please enter at least 6 digits</span>
          )}
          <input
            type="text"
            id="firstName"
            value={firstNameValue}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
            className={firstNameClasses}
            placeholder="First Name"
          />
          {firstNameHasError && (
            <span style={{ color: "red" }}>Please Enter First Name</span>
          )}
          <input
            type="text"
            id="lastName"
            value={lastNameValue}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            className={lastNameClasses}
            placeholder="Last Name"
          />
          {lastNameHasError && (
            <span style={{ color: "red" }}>Please Enter last Name</span>
          )}
          <input
            type="number"
            id="mobileNumber"
            value={mobileNumberValue}
            onChange={mobileNumberChangeHandler}
            onBlur={mobileNumberBlurHandler}
            className={mobileNumberClasses}
            placeholder="Mobile Number"
          />
          {mobileNumberHasError && (
            <span style={{ color: "red" }}>Please Enter Mobile Number</span>
          )}
          <input
            type="text"
            id="billingAddress"
            value={billingAddressValue}
            onChange={billingAddressChangeHandler}
            onBlur={billingAddressBlurHandler}
            className={billingAddressClasses}
            placeholder="Address"
          />
          {billingAddressHasError && (
            <span style={{ color: "red" }}>Please Enter Address</span>
          )}
          <input
            type="text"
            id="billingCity"
            value={billingCityValue}
            onChange={billingCityChangeHandler}
            onBlur={billingCityBlurHandler}
            className={billingCityClasses}
            placeholder="City"
          />
          {billingCityHasError && (
            <span style={{ color: "red" }}>Please Enter City</span>
          )}
          <input
            type="text"
            id="billingCountry"
            value={billingCountryValue}
            onChange={billingCountryChangeHandler}
            onBlur={billingCountryBlurHandler}
            className={billingCountryClasses}
            placeholder="Country"
          />
          {billingCountryHasError && (
            <span style={{ color: "red" }}>Please Enter Country</span>
          )}
          <input
            type="number"
            id="postalCode"
            value={postalCodeValue}
            onChange={postalCodeChangeHandler}
            onBlur={postalCodeBlurHandler}
            className={postalCodeClasses}
            placeholder="Postal Code"
          />
          {postalCodeHasError && (
            <span style={{ color: "red" }}>Please Enter Postal Code</span>
          )}
          {/* <input
              type="text"
              value={companyName}
              onChange={(e) => setcompanyName(e.target.value)}
              className="form-control"
              placeholder="Company Name(Optional)"
            />
            <input
              type="text"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              className="form-control"
              placeholder="Title(Optional)"
            /> */}
          {/* <select
            className="form-select"
            id="inputGroupSelect01"
            onChange={(e) => setCareHomeType(e.target.value)}
          >
            <option selected value="agency">
              Care Agency
            </option>
            <option value="facalities">Care Facility</option>
          </select> */}
          {/* <label className="checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        We follow GDPR security requirements. Please read and accept our privacy policy before sign-up. <NavLink title="Privacy Policy" to="/admin/">Privacy Policy & Terms of Use.</NavLink>
                    </label> */}
          {/* <input
              type="button"
              onClick={register}
              className="form-control btn"
              value="Create Account"
            /> */}

          <input
            type="button"
            onClick={() => {
              handleNextone();
            }}
            // onClick={registe}
            className="form-control btn"
            value="Next 1"
          />
          <p style={{ display: `${!next0 ? "none" : "inline-block"}` }}>
            Already have an account?
            <NavLink to="/admin/login" className="seeDetails">
              Login{" "}
            </NavLink>{" "}
          </p>
        </form>
        {/* <div className="option_box">
            <p>
              Already have an account?{" "}
              <NavLink to="login" className="">
                Log in
              </NavLink>
            </p>
          </div> */}
      </div>

      <div
        className="col-md-4 form_box"
        style={{ display: `${!next1 ? "none" : "block"}` }}
      >
        <form>
          <h4>Care Site Details</h4>
          <div className="col-md-12 contentCreate">
            <input
              type="text"
              id="companyName"
              value={companyNameValue}
              onChange={companyNameChangeHandler}
              onBlur={companyNameBlurHandler}
              className={companyNameClasses}
              placeholder="company Name"
            />
            {companyNameHasError && (
              <span style={{ color: "red" }}>Please Enter Company Name</span>
            )}
            <input
              type="text"
              id="careSiteName"
              value={careSiteNameValue}
              onChange={careSiteNameChangeHandler}
              onBlur={careSiteNameBlurHandler}
              className={careSiteNameClasses}
              placeholder="careSite Name"
            />
            {careSiteNameHasError && (
              <span style={{ color: "red" }}>Please Enter Care-Site Name</span>
            )}
            <select
              className="form-control form-select"
              onChange={(e) => {
                setcarehometype(e.target.value);
              }}
            >
              <option value="agency">Care Agency</option>
              <option value="facalities">Care Facilities </option>
            </select>
            <input
              type="number"
              id="bedsNumber"
              value={bedsNumberValue}
              onChange={bedsNumberChangeHandler}
              onBlur={bedsNumberBlurHandler}
              className={bedsNumberClasses}
              placeholder="No. of Beds (if site is a care facility)"
            />
            {bedsNumberHasError && (
              <span style={{ color: "red" }}>Please Enter Number of Beds</span>
            )}
          </div>
        </form>
      </div>

      <div
        className="col-md-4 form_box"
        style={{ display: `${!next2 ? "none" : "block"}` }}
      >
        <form>
          <h4> Care Site Admin Details</h4>
          <div className="col-md-12 contentCreate">
            <p>Is the Account Owner also the Admin of this Care Site?</p>
            <label className="checkbox me-3">
              <input
                type="radio"
                name="adminType"
                value="yes"
                checked={adminRadio === "yes"}
                onChange={onRadioHandler}
              />
              <span className="checkmark"></span>
              Yes
            </label>
            <label className="checkbox me-3">
              <input
                type="radio"
                name="adminType"
                value="no"
                checked={adminRadio === "no"}
                onChange={onRadioHandler}
              />
              <span className="checkmark"></span>
              No
            </label>
            {adminRadio === "yes" && (
              <div className="col-md-12 contentCreate mt-2"></div>
            )}
            {adminRadio === "no" && (
              <div className="col-md-12 contentCreate mt-2">
                <p>
                  Create Admin of this Care Site by completing the details below
                </p>
                <input
                  type="email"
                  id="emailAdmin"
                  value={emailAdminValue}
                  onChange={emailAdminChangeHandler}
                  onBlur={emailAdminBlurHandler}
                  className={emailAdminClasses}
                  placeholder="Email"
                />
                {emailAdminHasError && (
                  <span style={{ color: "red" }}>
                    Please enter a valid email address.
                  </span>
                )}
                <input
                  type="text"
                  id="firstNameAdmin"
                  value={firstNameAdminValue}
                  onChange={firstNameAdminChangeHandler}
                  onBlur={firstNameAdminBlurHandler}
                  className={firstNameAdminClasses}
                  placeholder="First Name"
                />
                {firstNameAdminHasError && (
                  <span style={{ color: "red" }}>Please Enter First Name</span>
                )}
                <input
                  type="text"
                  id="lastName"
                  value={lastNameAdminValue}
                  onChange={lastNameAdminChangeHandler}
                  onBlur={lastNameAdminBlurHandler}
                  className={lastNameAdminClasses}
                  placeholder="Last Name"
                />
                {lastNameAdminHasError && (
                  <span style={{ color: "red" }}>Please Enter last Name</span>
                )}
                <input
                  type="number"
                  id="mobileNumber"
                  value={mobileNumberAdminValue}
                  onChange={mobileNumberAdminChangeHandler}
                  onBlur={mobileNumberAdminBlurHandler}
                  className={mobileNumberAdminClasses}
                  placeholder="Mobile Number"
                />
                {mobileNumberAdminHasError && (
                  <span style={{ color: "red" }}>
                    Please Enter Mobile Number
                  </span>
                )}
              </div>
            )}
          </div>
        </form>
      </div>

      <div
        className="col-md-4 form_box"
        style={{ display: `${!next3 ? "none" : "block"}` }}
      >
        <form>
          <h4> Subscription Plan </h4>
          <div className="col-md-12 contentCreate">
            <p>Choose Subscription Plan</p>
            <label className="checkbox me-3">
              <input
                type="radio"
                name="subscriptionPlan"
                required
                value="base"
                checked={subscriptionPlan === "base"}
                onChange={subscriptionPlanHandler}
              />
              <span className="checkmark"></span>
              Base Plan
            </label>
            <label className="checkbox me-3">
              <input
                type="radio"
                name="subscriptionPlan"
                required
                value="advanced"
                checked={subscriptionPlan === "advanced"}
                onChange={subscriptionPlanHandler}
              />
              <span className="checkmark"></span>
              Advanced
            </label>
            <label className="checkbox me-3">
              <input
                type="radio"
                name="subscriptionPlan"
                required
                value="turbo"
                checked={subscriptionPlan === "turbo"}
                onChange={subscriptionPlanHandler}
              />
              <span className="checkmark"></span>
              Turbo
            </label>
            <br />
            <span style={{ color: "red" }}>{err}</span>
            <br />
            <NavLink to="/admin/" className="seeDetails">
              See details.{" "}
            </NavLink>
            <p>Add Friends & Family App?</p>
            <label className="checkbox me-3">
              <input
                type="checkbox"
                value="friendsorfamily"
                onChange={addpackHandler}
              />
              <span className="checkmark"></span>
              Yes
            </label>
          </div>
          <Box sx={{ m: 3 }} />
          <Typography gutterBottom>No. of Users ({sliderValue})</Typography>
          <PrettoSlider
            valueLabelDisplay="auto"
            aria-label="pretto slider"
            defaultValue={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
          />
          <br />
          Prize: <span>{sliderValue * param.prize}</span>
          <br />
          <div className="col-md-12 links">
            We follow GDPR security requirements. Please read and accept our
            privacy policy before signup.{" "}
            <NavLink to="/admin/">Privacy Policy & Terms of Use</NavLink>
          </div>
        </form>
      </div>

      <div className="col-md-12 submitBtn">
        <button
          className="btn"
          style={{ display: `${!next1 ? "none" : "inline-block"}` }}
          onClick={() => {
            handleNexttwo();
          }}
        >
          Next 2
        </button>
        <button
          className="btn"
          style={{ display: `${!next2 ? "none" : "inline-block"}` }}
          onClick={() => {
            handleNextthree();
          }}
        >
          Next 3
        </button>
        <button
          className="btn"
          style={{ display: `${!next3 ? "none" : "inline-block"}` }}
          onClick={() => {
            if (subscriptionPlan) {
              setErr("");
              registerPlan();
              registerNewSite();
            } else {
              setErr("This field is required");
            }
          }}
        >
          Create Account
        </button>
      </div>
    </section>
  );
}

export default Signup;
