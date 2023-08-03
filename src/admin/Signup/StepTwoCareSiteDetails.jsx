import React, { useEffect, useState, Fragment } from "react";
import "./signup.css";
import Checkbox from "@mui/material/Checkbox";
import useInput from "../../hooks/use-input";
import FormButton from "./FormNextButton";
import { useDispatch, useSelector } from "react-redux";
import {
  changeButton,
  nextStepApi,
  nextStepFuncSecondForm,
  OwnerandCareSiteDetails,
} from "../../redux-toolkit/reducer/accountCreationApiReducer";
import SnackBar from "../../components/SnackBar/SnackBar";

const isPasswordValidate = (value) => value.length >= 6;
const isEmpty = (value) => value.trim() !== "";

export default function StepTwoCareSiteDetails() {

  const { stepNo, step, registerSuccess, errorMsg } = useSelector(
    (state) => state.accountCreationApiReducer
  );

  const [inValid, setInvalid] = useState(false);
  const [status, setStatus] = useState("info");
  const [carehometype, setcarehometype] = useState("agency");
  const [checkState, setCheckState] = React.useState({ billing: false });

  const dispatch = useDispatch();
  
  // useEffect(() => {
    // let regstrData = JSON.parse(localStorage.getItem("registerData"));
    // console.log(regstrData,'register data2');
  // },[])

  useEffect(() => {
    // console.log(registerSuccess,errorMsg,'in second step use effect');
    if (registerSuccess === 2) {
      nextStepChangeHandler(true);
    }else if(registerSuccess === 1){
      nextStepChangeHandler(false);
    }
  },[registerSuccess])

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

  const isFormValidCheck = () => {
    if (
      billingAddressIsValid &&
      billingCityIsValid &&
      billingCountryIsValid &&
      postalCodeIsValid &&
      companyNameIsValid &&
      careSiteNameIsValid &&
      bedsNumberIsValid
    ) {
      setInvalid(false);
      let data = {
        companyName: companyNameValue,
        careSiteName: careSiteNameValue,
        carefacility: carehometype,
        totalBeds: bedsNumberValue,
        billingAddress: `${billingAddressValue}, ${billingCityValue}, ${postalCodeValue}`,
      };
      dispatch(nextStepFuncSecondForm(data));
      dispatch(nextStepApi(OwnerandCareSiteDetails));
      // nextStepChangeHandler();
    } else {
      setInvalid(true);
      setStatus("error");
      setTimeout(() => {
        setInvalid(false);
      }, 4000);
    }
  };

  function nextStepChangeHandler(type) {
    if (type) {
      dispatch(
        changeButton({
          currentNo: stepNo,
          buttonText: "Next",
          stepNo: stepNo + 1,
          nextNo: stepNo + 1,
        })
      );
    }else{
      dispatch(
        changeButton({
          currentNo: 1,
          buttonText: "Next",
          stepNo: 1,
          nextNo: 1,
          registerSuccess: 0
        })
      );
    }
  }

  const handleChange = (event) => {
    setCheckState({
      ...checkState,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Fragment>
      <div
        className="col-md-4 form_box"
        style={{ display: `${step === "step2" ? "block" : "none"}` }}
      >
        <form>
          <h4>Care Site Details</h4>

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
            <span className="input_error">Please Enter Company Name</span>
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
            <span className="input_error">Please Enter Address</span>
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
            <span className="input_error">Please Enter City</span>
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
            <span className="input_error">Please Enter Country</span>
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
            <span className="input_error">Please Enter Postal Code</span>
          )}

          <div className="checkbox-wrapper">
            <Checkbox
              name="billing"
              checked={checkState["billing"]}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <span>Use as Billing Address</span>
          </div>

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
            <span className="input_error">Please Enter Care-Site Name</span>
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
            <span className="input_error">Please Enter Number of Beds</span>
          )}
          <FormButton isFormValidCheck={isFormValidCheck} />
        </form>
        <SnackBar
          isInvalid={inValid}
          status={status}
          hideDuration={4000}
          textmessage="All fields are required"
        />
      </div>
    </Fragment>
  );
}
