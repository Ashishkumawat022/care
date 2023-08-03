import React, { useState, Fragment } from "react";
import "./signup.css";
import useInput from "../../hooks/use-input";
import FormButton from "./FormNextButton";
import { useDispatch, useSelector } from "react-redux";
import {
  changeButton,
  currentStepNo,
  nextStepFuncThirdForm,
  adminDetails,
  nextStep3Api,
  ownerId,
  extraProDetails,
} from "../../redux-toolkit/reducer/accountCreationApiReducer";
import SnackBar from "../../components/SnackBar/SnackBar";
import { useEffect } from "react";

let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const isEmail = (value) => value.match(emailRegex);
const ismobileNumber = (value) => value.length == 10;
const isEmpty = (value) => value.trim() !== "";

export default function StepThreeAdminDetails() {
  const { stepNo, step } = useSelector(
    (state) => state.accountCreationApiReducer
  );

  const [inValid, setInvalid] = useState(false);
  const [status, setStatus] = useState("info");
  const [adminRadio, setAdminRadio] = useState("no");
  const [registerData, setRegisterData] = useState([]);
  const onRadioHandler = (event) => {
    // console.log(event.target.value);
    setAdminRadio(event.target.value);
  };

  const dispatch = useDispatch();
  
  useEffect(() => {
    let regstrData = JSON.parse(localStorage.getItem("registerData"));
    // console.log(regstrData,'register data3');
    setRegisterData(regstrData);
  }, []);

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


  const isFormValidCheck = () => {
    if (adminRadio === "no") {
      if (
        emailAdminIsValid &&
        firstNameAdminIsValid &&
        lastNameAdminIsValid &&
        mobileNumberAdminIsValid
      ) {
        // console.log(ownerId, "ownerId");
        let data = {
          email: emailAdminValue,
          firstName: firstNameAdminValue,
          lastName: lastNameAdminValue,
          mobileNo: mobileNumberAdminValue,
          userType: "admin",
          ownerId: ownerId,
        };
        setInvalid(false);
        dispatch(nextStepFuncThirdForm(data));
        dispatch(nextStep3Api(adminDetails));
        nextStepChangeHandler();
      } else {
        // console.log("clicked!!");
        setInvalid(true);
        setStatus("error");
        setTimeout(() => {
          setInvalid(false);
        }, 4000);
      }
    } else {
      setInvalid(false);
      nextStepChangeHandler();
    }
  };

  function nextStepChangeHandler() {
    dispatch(
      changeButton({
        currentNo: stepNo,
        buttonText: "Create Account",
        stepNo: stepNo + 1,
        nextNo: stepNo + 1,
      })
    );
  }
  const [state, setState] = React.useState({
    billing: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Fragment>
      <div
        className="col-md-4 form_box"
        style={{ display: `${step === "step3" ? "block" : "none"}` }}
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
                  <span className="input_error">
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
                  <span className="input_error">Please Enter First Name</span>
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
                  <span className="input_error">Please Enter last Name</span>
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
                  <span className="input_error">
                    Please Enter Mobile Number
                  </span>
                )}
              </div>
            )}
          </div>
          <FormButton isFormValidCheck={isFormValidCheck} />
        </form>
        <SnackBar isInvalid={inValid} status={status} />
      </div>
    </Fragment>
  );
}
