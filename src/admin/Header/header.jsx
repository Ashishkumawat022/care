import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "../../style.css";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import GlobalContext from "../store/global-context";
import useInput from "../../hooks/use-input";
import swal from "sweetalert";
import { AccessManagementDefaultRoles } from "../../constants/roles";
import { logoutAdmin } from "../../utils/logoutadmin";

function Header() {
  const [carehomeName, setCareHomeName] = useState("");
  const [carehomeLocation, setCareHomeLocation] = useState("");
  const [totalBeds, setTotalBeds] = useState("");
  const [loginId, setLoginID] = useState("");
  const [next1, setNext1] = useState(true);
  const [next2, setNext2] = useState(false);
  const [next3, setNext3] = useState(false);
  const [createnewsitevisible, setcreatenewsitevisible] = useState(true);
  const [password, setPassword] = useState("");
  const [title, settitle] = useState("");
  const [careFacility, setcareFacility] = useState("");
  const [carehometype, setcarehometype] = useState();
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const [addpack, setAddpack] = useState("");
  const [sliderValue, setSliderValue] = useState(20);
  const [adminRadio, setAdminRadio] = useState("no");
  const [err, setErr] = useState("");

  const globalCtx = useContext(GlobalContext);

  let userData = JSON.parse(localStorage.getItem("userData"));

  let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const iscompanyNameValidate = (value) => value.trim() !== "";
  const iscareSiteNameValidate = (value) => value.trim() !== "";
  const isbedsNumberValidate = (value) => value.trim() !== "";
  const isEmailAdmin = (value) => value.match(emailRegex);
  const isfirstNameAdminValidate = (value) => value.trim() !== "";
  const islastNameAdminValidate = (value) => value.trim() !== "";
  const ismobileNumberAdminValidate = (value) => value.length == 10;

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

  // useEffect(() => {
  //   if (adminRadio === "yes") {
  //     setFname(userData?.firstName);
  //     setLname(userData?.lastName);
  //     setEmailID(userData?.email);
  //     setConNum(userData?.mobileNo)
  //   } else {
  //     setFname("");
  //     setLname("");
  //     setEmailID("");
  //     setConNum("");
  //   }
  // }, [adminRadio])

  const {
    value: companyNameValue,
    isValid: companyNameIsValid,
    hasError: companyNameHasError,
    valueChangeHandler: companyNameChangeHandler,
    inputBlurHandler: companyNameBlurHandler,
    reset: resetcompanyName,
  } = useInput(iscompanyNameValidate);

  const {
    value: careSiteNameValue,
    isValid: careSiteNameIsValid,
    hasError: careSiteNameHasError,
    valueChangeHandler: careSiteNameChangeHandler,
    inputBlurHandler: careSiteNameBlurHandler,
    reset: resetcareSiteName,
  } = useInput(iscareSiteNameValidate);

  const {
    value: bedsNumberValue,
    isValid: bedsNumberIsValid,
    hasError: bedsNumberHasError,
    valueChangeHandler: bedsNumberChangeHandler,
    inputBlurHandler: bedsNumberBlurHandler,
    reset: resetbedsNumber,
  } = useInput(isbedsNumberValidate);

  const {
    value: emailAdminValue,
    isValid: emailAdminIsValid,
    hasError: emailAdminHasError,
    valueChangeHandler: emailAdminChangeHandler,
    inputBlurHandler: emailAdminBlurHandler,
    reset: resetEmailAdmin,
  } = useInput(isEmailAdmin);

  const {
    value: firstNameAdminValue,
    isValid: firstNameAdminIsValid,
    hasError: firstNameAdminHasError,
    valueChangeHandler: firstNameAdminChangeHandler,
    inputBlurHandler: firstNameAdminBlurHandler,
    reset: resetfirstNameAdmin,
  } = useInput(isfirstNameAdminValidate);

  const {
    value: lastNameAdminValue,
    isValid: lastNameAdminIsValid,
    hasError: lastNameAdminHasError,
    valueChangeHandler: lastNameAdminChangeHandler,
    inputBlurHandler: lastNameAdminBlurHandler,
    reset: resetlastNameAdmin,
  } = useInput(islastNameAdminValidate);

  const {
    value: mobileNumberAdminValue,
    isValid: mobileNumberAdminIsValid,
    hasError: mobileNumberAdminHasError,
    valueChangeHandler: mobileNumberAdminChangeHandler,
    inputBlurHandler: mobileNumberAdminBlurHandler,
    reset: resetmobileNumberAdmin,
  } = useInput(ismobileNumberAdminValidate);

  function newCareHome() {
    var data = JSON.stringify({
      companyName: companyNameValue,
      careSiteName: careSiteNameValue,
      carefacility: careFacility,
      title: title,
      userType: adminRadio === "yes" ? "owner" : "admin",
      careSitetype: carehometype,
      Subscriptiontype: subscriptionPlan,
      Addpack: addpack,
      range: sliderValue,
      email: emailAdminValue,
      firstName: firstNameAdminValue,
      lastName: lastNameAdminValue,
      contect: mobileNumberAdminValue,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/createnewsite`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response));
        console.log(JSON.stringify(response.data));
        getAllCareHomeID();
        setcreatenewsitevisible(true);
        setNext2(false);
        setNext3(false);
        setNext1(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function registerAdmin() {
    let data = JSON.stringify({
      userType: adminRadio === "yes" ? "owner" : "admin",
      ownerId: userData._id,
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
      url: `http://3.91.203.43:8700/admin/registeradmin`,
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
            setNext1(false);
            setNext2(false);
            setNext3(true);
          });
        } else {
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
      ownerId: userData._id,
      SubscriptionPlan: subscriptionPlan,
      Addpack: addpack,
      NoOfuser: sliderValue,
    });

    let config = {
      method: "POST",
      url: `http://3.91.203.43:8700/admin/selectplans`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        getAllCareHomeID();
        setcreatenewsitevisible(true);
        setNext2(false);
        setNext3(false);
        setNext1(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const [subscriptionPlanId, setSubscriptionPlanId] = useState("");

  function registerNewSite() {
    var future = new Date();
    future.setDate(future.getDate() + 30);
    let planenddate =
      subscriptionPlan == "base" ? Date.parse(new Date()) : Date.parse(future);
    let planstartdate = Date.parse(new Date());
    let data = JSON.stringify({
      ownerId: userData._id ? userData._id : userData.ownerId._id,
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
    });

    let config = {
      method: "POST",
      url: `http://3.91.203.43:8700/admin/registerNewSite?adminId=${
        userData._id ? userData._id : userData.ownerId._id
      }&SubscriptionPlan=${
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

  const onRadioHandler = (event) => {
    console.log(event.target.value);
    setAdminRadio(event.target.value);
  };

  const subscriptionPlanHandler = (event) => {
    setErr("");
    subPlansData(event.target.value);
    console.log(event.target.value);
    setSubscriptionPlan(event.target.value);
  };

  const addpackHandler = (event) => {
    console.log(event.target.value);
    setAddpack(event.target.value);
  };

  // --------------- Get SubscriptionPlan data based on type of plan ------------------ //
  // str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  function subPlansData(subscriptiontype) {
    let config = {
      method: "GET",
      url: `http://3.91.203.43:8700/admin/subPlansData?SubscriptionPlan=${
        subscriptiontype.charAt(0).toUpperCase() +
        subscriptiontype.slice(1).toLowerCase()
      }`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response, "subPlansData");
        setSubscriptionPlanId(response.data.data._id);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllCareHomeID();
  }, []);
  // const id = useParams();
  // console.log("======",typeof(localStorage.getItem("_id")))
  // if(localStorage.getItem("_id") == "undefined"){
  //   localStorage.setItem("_id",id._id);
  // }

  const getAllCareHomeID = () => {
    globalCtx.getAllAdminHomeID();
  };

  const history = useHistory();

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
    if (companyNameIsValid && careSiteNameIsValid && bedsNumberIsValid) {
      setNext2(true);
      setNext3(false);
      setNext1(false);
    } else {
      swal("All fields are required");
    }
  };

  const handleNexttwo = () => {
    if (adminRadio === "no") {
      if (
        emailAdminIsValid &&
        firstNameAdminIsValid &&
        lastNameAdminIsValid &&
        mobileNumberAdminIsValid
      ) {
        setNext1(false);
        setNext2(false);
        setNext3(true);
        registerAdmin();
      } else {
        swal("All fields are required");
      }
    } else {
      setNext1(false);
      setNext2(false);
      setNext3(true);
    }
  };

  return (
    <>
      <header className="topbar">
        <nav className="navbar top-navbar navbar-expand-md navbar-dark">
          <div className="navbar-header">
            <button className="nav-toggler waves-effect waves-light d-block d-md-none hemburger_menu">
              <GiHamburgerMenu />
            </button>
            <NavLink className="navbar-brand" to="">
              <b className="logo-icon">
                <img
                  alt=""
                  src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/logo.svg`}
                />
              </b>
            </NavLink>
            <NavLink
              className="topbartoggler d-block d-md-none waves-effect waves-light"
              to=""
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="ti-more"></i>
            </NavLink>
          </div>
          <div className="navbar-collapse collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto"></ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown create_list">
                <h5>Hello! {`${userData?.firstName}`}</h5>
                <NavLink
                  className="nav-link dropdown-toggle waves-effect waves-dark"
                  to="#"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {globalCtx?.selectedCountry
                    ? globalCtx?.data.map((item, index) => {
                        if (item?._id === globalCtx?.selectedCountry) {
                          return item?.careSiteName.toString();
                        }
                      })
                    : globalCtx?.data[0]?.careSiteName}

                  {/* {JSON.stringify(data[0].careSiteName)} */}
                </NavLink>
                <div className="dropdown-menu dropdown-menu-end user-dd animated flipInY">
                  <button
                    className="popupBtn"
                    onClick={() => {
                      setcreatenewsitevisible(false);
                    }}
                  >
                    Create New Site
                  </button>
                  {/* <NavLink
                    to="/create-new-site"
                    data-bs-toggle="modal"
                    data-bs-target="#create_new_site"
                  >
                    Create New Site
                  </NavLink> */}
                  <select onChange={globalCtx.countryChange}>
                    {globalCtx.data.map((item) => {
                      return (
                        <option key={item._id} value={item._id}>
                          {item.careSiteName}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </li>

              <li className="nav-item dropdown profile">
                <NavLink
                  className="nav-link dropdown-toggle waves-effect waves-dark"
                  to="#"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
                    alt=""
                    width="40"
                    className="profile-pic rounded-circle"
                  />
                </NavLink>
                <div className="dropdown-menu dropdown-menu-end user-dd animated flipInY">
                  <div className="d-flex no-block align-items-center p-3 bg-info text-white mb-2">
                    <div className="">
                      <img
                        src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
                        alt="user"
                        className="rounded-circle"
                        width="60"
                      />
                    </div>
                    <div className="ms-2">
                      <h4 className="mb-0 text-white">{`${userData?.firstName} ${userData?.lastName}`}</h4>
                      <p className=" mb-0">{userData?.email}</p>
                    </div>
                  </div>
                  <NavLink className="dropdown-item" to="/admin/profile">
                    Profile
                  </NavLink>
                  <div className="dropdown-divider"></div>
                  <div className="pl-4 p-2">
                    <button
                      type="button"
                      className="btn d-block w-100 btn-info rounded-pill"
                      onClick={() => {
                        logoutAdmin();
                        history.replace("/admin/login");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <div
        className="modal fade"
        id="create_new_site"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create New Site
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="form-label">Group or Care Home Name</label>
                  <input
                    type="text"
                    value={carehomeName}
                    onChange={(e) => setCareHomeName(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    value={carehomeLocation}
                    onChange={(e) => setCareHomeLocation(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">No. of Beds </label>
                  <input
                    type="number"
                    value={totalBeds}
                    onChange={(e) => setTotalBeds(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    value={loginId}
                    onChange={(e) => setLoginID(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                // onClick={newCareHome}
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal modal_ak"
        id="addNewPopup"
        style={{ display: `${!createnewsitevisible ? "block" : "none"}` }}
      >
        <div
          className="bg_popup"
          onClick={() => {
            setcreatenewsitevisible(true);
          }}
        ></div>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12 titleN">
                  <h3>New Site Creation</h3>
                  <button
                    type="button"
                    className="btn-close close_popup_btn"
                    onClick={() => {
                      setcreatenewsitevisible(true);
                    }}
                  ></button>
                </div>
              </div>

              <div
                className="step1"
                id="step1"
                style={{ display: `${!next1 ? "none" : "block"}` }}
              >
                <div className="row text-center">
                  {/* <div className="col-md-6 siteCreation">
                    <h2>Step 1 <BsArrowRightShort /> </h2>
                    <h4>Care Site Details</h4>
                  </div> */}
                  <div className="col-2"></div>
                  <div className="col-md-8 contentCreate">
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
                          <span style={{ color: "red" }}>
                            Please Enter Company Name
                          </span>
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
                          <span style={{ color: "red" }}>
                            Please Enter Care-Site Name
                          </span>
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
                          <span style={{ color: "red" }}>
                            Please Enter Number of Beds
                          </span>
                        )}
                      </div>
                    </form>{" "}
                  </div>
                </div>
              </div>

              <div
                className="step2"
                id="step2"
                style={{ display: `${!next2 ? "none" : "block"}` }}
              >
                <div className="row">
                  {/* <div className="col-md-6 siteCreation">
                    <h2>Step 2 <BsArrowRightShort /> </h2>
                    <h4>Care Site Details</h4>
                  </div> */}
                  <div className="col-2"></div>
                  <div className="col-md-8 contentCreate">
                    <form>
                      <h4> Care Site Admin Details</h4>
                      <div className="col-md-12 contentCreate">
                        <p>
                          Is the Account Owner also the Admin of this Care Site?
                        </p>
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
                              Create Admin of this Care Site by completing the
                              details below
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
                              <span style={{ color: "red" }}>
                                Please Enter First Name
                              </span>
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
                              <span style={{ color: "red" }}>
                                Please Enter last Name
                              </span>
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

                  <div className="col-md-12 links">
                    We follow GDPR security requirements. Please read and accept
                    our privacy policy before signup.{" "}
                    <NavLink to="/admin/dashboard">
                      Privacy Policy & Terms of Use
                    </NavLink>
                  </div>
                </div>
              </div>

              <div
                className="step3"
                id="step3"
                style={{ display: `${!next3 ? "none" : "block"}` }}
              >
                <div className="row">
                  {/* <div className="col-md-6 siteCreation">
                    <h2>Step 3 <BsArrowRightShort /> </h2>
                    <h4>Subscription Plan</h4>
                  </div> */}
                  <div className="col-2"></div>
                  <div className="col-md-8 contentCreate">
                    <form>
                      <h4> Subscription Plan </h4>
                      <div className="col-md-12 contentCreate">
                        <p>Choose Subscription Plan</p>
                        <label className="checkbox me-3">
                          <input
                            type="radio"
                            name="subscriptionPlan"
                            value="basePlan"
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
                        <NavLink to="/admin/dashboard" className="seeDetails">
                          See details.{" "}
                        </NavLink>
                        <div style={{ display: "flex" }}>
                          <p style={{ paddingRight: "15px" }}>
                            {" "}
                            Add Friends & Family App{" "}
                          </p>
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
                      </div>

                      <Typography gutterBottom>
                        No. of Users ({sliderValue})
                      </Typography>
                      <PrettoSlider
                        valueLabelDisplay="auto"
                        aria-label="pretto slider"
                        defaultValue={sliderValue}
                        onChange={(e) => setSliderValue(e.target.value)}
                      />
                      <br />
                    </form>
                  </div>

                  <div className="col-md-12 links">
                    We follow GDPR security requirements. Please read and accept
                    our privacy policy before signup.{" "}
                    <NavLink to="/admin/dashboard">
                      Privacy Policy & Terms of Use
                    </NavLink>
                  </div>
                </div>
              </div>

              <div className="col-md-12 submitBtn">
                <button
                  className="btn"
                  style={{ display: `${!next1 ? "none" : "inline-block"}` }}
                  onClick={() => {
                    handleNextone();
                  }}
                >
                  Next
                </button>
                <button
                  className="btn"
                  style={{ display: `${!next2 ? "none" : "inline-block"}` }}
                  onClick={() => {
                    handleNexttwo();
                  }}
                >
                  Next
                </button>
                <button
                  className="btn"
                  style={{ display: `${!next3 ? "none" : "inline-block"}` }}
                  onClick={() => {
                    if (subscriptionPlan) {
                      setErr("");
                      newCareHome();
                      registerPlan();
                      registerNewSite();
                    } else {
                      setErr("This field is required");
                    }
                  }}
                >
                  Create New Site
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
