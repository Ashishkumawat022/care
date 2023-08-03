import React, { useState, Fragment } from "react";
import "./signup.css";
import useInput from "../../hooks/use-input";
import FormButton from "./FormNextButton";
import { useDispatch, useSelector } from "react-redux";
import {
  changeButton,
  currentStepNo,
  nextStepFuncFirstForm,
  handleSteps,
} from "../../redux-toolkit/reducer/accountCreationApiReducer";
import PrivacyAndPolicy from "./PrivacyAndPolicy";
import SnackBar from "../../components/SnackBar/SnackBar";
import { useEffect } from "react";

let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const isPasswordValidate = (value) => value.length >= 6;
const isEmail = (value) => value.match(emailRegex);
const ismobileNumber = (value) => value.length == 10;
const isEmpty = (value) => value.trim() !== "";

export default function StepOneOwnerDetails() {
  const { stepNo, step } = useSelector(
    (state) => state.accountCreationApiReducer
  );

  // useEffect(() => {
  //   // let regstrData = JSON.parse(localStorage.getItem("registerData"));
  //   // console.log(regstrData,'register data1');
  // },[])

  const [inValid, setInvalid] = useState(false);
  const [valid, setValid] = useState(false);
  const [status, setStatus] = useState("info");

  const dispatch = useDispatch();
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

  const isFormValidCheck = () => {
    if (
      emailIsValid &&
      passwordIsValid &&
      firstNameIsValid &&
      lastNameIsValid &&
      mobileNumberIsValid
    ) {
      setInvalid(false);
      setValid(true);
      let data = {
        email: emailValue,
        password: passwordValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        mobileNo: mobileNumberValue,
      };
      dispatch(nextStepFuncFirstForm(data));
      nextStepChangeHandler();
    } else {
      setInvalid(true);
      setStatus("error");
      setTimeout(() => {
        setInvalid(false);
      }, 4000);
    }
  };

  function nextStepChangeHandler() {
    dispatch(
      changeButton({
        currentNo: stepNo,
        buttonText: "Next",
        stepNo: stepNo + 1,
        nextNo: stepNo + 1,
      })
    );
    dispatch(handleSteps({errorMsg: '', registerSuccess: 0}));
  }

  return (
    <Fragment>
      <div
        className="col-md-4 form_box"
        style={{ display: `${step === "step1" ? "block" : "none"}` }}
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
            <span className="input_error">
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
            <span className="input_error">Please enter at least 6 digits</span>
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
            <span className="input_error">Please Enter First Name</span>
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
            <span className="input_error">Please Enter last Name</span>
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
            <span className="input_error">Please Enter Mobile Number</span>
          )}
          <PrivacyAndPolicy />
          <FormButton isFormValidCheck={isFormValidCheck} />
          {/* <LoginRedirection /> */}
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
