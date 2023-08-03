import React, { useState, Fragment, useEffect } from "react";
import "./signup.css";
import FormButton from "./FormNextButton";
import { useDispatch, useSelector } from "react-redux";
import {
  changeButton,
  currentStepNo,
  createAcctApi,
  planDetails,
  nextStepFuncFourthForm,
  adminId,
  OwnerandCareSiteDetails,
  productExtraData,
} from "../../redux-toolkit/reducer/accountCreationApiReducer";
import axios from "axios";
import SnackBar from "../../components/SnackBar/SnackBar";
import { NavLink, useParams, useHistory } from "react-router-dom";
import Slider from "@mui/material/Slider";
import { alpha, styled } from "@mui/material/styles";
import { deepPurple } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import StepsPlanSection from "./StepsPlanSection";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: deepPurple[600],
    "&:hover": {
      backgroundColor: alpha(
        deepPurple[600],
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: deepPurple[600],
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

export default function StepFourSubscriptionPlan() {
  const { stepNo, step, adminApi } = useSelector(
    (state) => state.accountCreationApiReducer
  );
  const param = useParams();
  const history = useHistory();

  const [inValid, setInvalid] = useState(false);
  const [status, setStatus] = useState("info");
  const [statusMsg, setStatusMsg] = useState("Please Select Plan");
  const [subscriptionPlan, setSubscriptionPlan] = useState("");
  const [subscriptionPlanId, setSubscriptionPlanId] = useState("");
  const [planData, setPlansData] = useState([]);
  const [state, setState] = React.useState({
    monthlyearly: false,
  });
  const [addpack, setAddpack] = useState("");
  const [err, setErr] = useState("");
  const [fandsFam, setFandsFam] = useState("");
  const [noOfLics, setNoOfLics] = useState(0);
  const [planPrice, setPlanPrice] = useState(0);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  const [selectedPlanData, setSelectedPlanData] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState({
    disType: "",
    disVal: "0",
  });
  const [addOnStatus, setAddOnStatus] = useState({ fandFamily: false });
  const [adminApiData, setAdminApiData] = useState([]);
  const [regApiData, setregApiData] = useState([]);

  const dispatch = useDispatch();

  let totalPayment =
    fandsFam * 12 * noOfLics +
    planPrice -
    (promoDiscount.disType === "Fixed"
      ? promoDiscount.disVal
      : ((fandsFam * 12 * noOfLics + planPrice) / 100) * promoDiscount.disVal);
  console.log(totalPayment, fandsFam * 12 * noOfLics + planPrice);

  useEffect(() => {
    let adminData = JSON.parse(localStorage.getItem("registerAdminData"));
    let regstrData = JSON.parse(localStorage.getItem("registerData"));
    console.log(adminData, regstrData, "fourth step");
    setregApiData(regstrData, regstrData);
    setAdminApiData(adminData);
    getPlans();
  }, [adminApi]);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    setPromoCode("");
    setPromoDiscount({ disType: "", disVal: "0" });
    if (selectedPlanId !== "") {
      planData.forEach((elem) => {
        if (elem._id === selectedPlanId) {
          setPlanPrice(
            event.target.checked ? elem.unitPriceYearly : elem.unitPriceMonthly
          );
        }
      });
    }
  };

  const isFormValidCheck = () => {
    if (selectedPlanId !== "") {
      let totalAmount = 0;
      let fandsFamAmt = 0;
      let discountAmt = 0;

      if (state.monthlyearly) {
        discountAmt =
          promoDiscount.disType === "Fixed"
            ? promoDiscount.disVal
            : ((fandsFam * 12 * noOfLics + planPrice) / 100) *
              promoDiscount.disVal;
        totalAmount = `${fandsFam * 12 * noOfLics + planPrice - discountAmt}`;
        fandsFamAmt = fandsFam * 12;
      } else {
        discountAmt =
          promoDiscount.disType === "Fixed"
            ? promoDiscount.disVal
            : ((fandsFam * noOfLics + planPrice) / 100) * promoDiscount.disVal;
        totalAmount = `${fandsFam * noOfLics + planPrice - discountAmt}`;
        fandsFamAmt = fandsFam;
      }

      let cartDetails = {
        productId: selectedPlanData.product_id,
        unit_amount: totalAmount,
        interval: state.monthlyearly ? "year" : "month",
        frndFamAmt: fandsFamAmt,
        licsCount: noOfLics,
        planName: selectedPlanData.planName,
        planPrice: planPrice,
        trialDays: 30,
        promoName: promoCode.toUpperCase(),
        couponType: "amount_off",
        amount_off: discountAmt,
        redemCount: "6",
      };

      const chargesDetails = [
        {
          discription: selectedPlanData.planName,
          rate: planPrice,
          qty: 1,
        },
        {
          discription: "Friends & Family App",
          rate: fandsFamAmt,
          qty: noOfLics,
        },
        {
          discription: "Dicount Coupon",
          rate: discountAmt,
          qty: 1,
        },
      ];
      // console.log(chargesDetails,'chargesDetails');
      let data = {
        planId: selectedPlanId,
        companyName: OwnerandCareSiteDetails.companyName,
        country: "India",
        careSiteName: OwnerandCareSiteDetails.careSiteName,
        totalBeds: OwnerandCareSiteDetails.totalBeds,
        carefacility: OwnerandCareSiteDetails.carefacility,
        multiCareSite: false,
        planstartDate: Date.now(),
        SubscriptionPlan: selectedPlanData.planName,
        SubscriptionPlanId: state.monthlyearly
          ? selectedPlanData.yearlyPlan.planId
          : selectedPlanData.monthlyPlan.planId,
        monthyOrYearly: state.monthlyearly ? "Yearly" : "Monthly",
        planRate: planPrice.toString(),
        unit_amount: totalAmount,
      };
      // console.log(totalAmount, data);
      dispatch(productExtraData(cartDetails));
      dispatch(nextStepFuncFourthForm(data));
      if (totalAmount !== "0") {
        localStorage.setItem("chargesDetails", JSON.stringify(chargesDetails));
        localStorage.setItem("selectedPlanData", JSON.stringify(data));
        nextStepChangeHandler("Next");
      } else {
        let id = adminApiData?._id ? adminApiData?._id : regApiData?._id;
        // console.log(adminApiData, regApiData, [planDetails,id]);
        dispatch(createAcctApi([planDetails, id]));
        nextStepChangeHandler("Create");
      }
      setInvalid(false);
      setErr("");
      // registerPlan();
      // registerNewSite();
    } else {
      // console.log("clicked!!");
      setInvalid(true);
      setStatus("error");
      setTimeout(() => {
        setInvalid(false);
      }, 5000);
    }
  };

  function nextStepChangeHandler(step) {
    // console.log(step)
    // console.log(currentStepNo, "clicked!");
    if (step === "Create") {
      dispatch(
        changeButton({
          currentNo: stepNo,
          buttonText: "Next",
          stepNo: 1,
          nextNo: stepNo + 1,
        })
      );
      history.push("/admin/login");
    } else {
      dispatch(
        changeButton({
          currentNo: stepNo,
          buttonText: "Next",
          stepNo: stepNo + 1,
          nextNo: stepNo + 1,
        })
      );
    }
  }

  const getPlans = () => {
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getAllPlans`,
    };
    axios(config)
      .then(function (res) {
        // console.log(res.data.result, 'plandata')
        setFandsFam(res.data.result[0].combined.FandFappData[0].unitPrice);
        setPlansData(res.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function selectedPlan(id) {
    setSelectedPlanId(id);
    planData.forEach((elem) => {
      if (elem._id === id) {
        // console.log(elem);
        let price = state.monthlyearly
          ? elem.unitPriceYearly
          : elem.unitPriceMonthly;
        setPlanPrice(price);
        setSelectedPlanData(elem);
        handleCreateAcc(price !== 0 ? true : false);
      }
    });
  }

  function applyPromo(e) {
    e.preventDefault();
    if (promoCode.trim() !== "") {
      if (selectedPlanId !== "") {
        planData.forEach((elem) => {
          if (elem._id === selectedPlanId) {
            elem.combined.couponData.forEach((item) => {
              if (item.couponCode.toLowerCase() === promoCode.toLowerCase()) {
                setPromoDiscount({
                  disType: item.discountType,
                  disVal: item.discountValue,
                });
                // console.log(item.discountValue, 'couponCode applied');
              }
            });
          }
        });
      }
    }
  }

  function handleAddOn(event) {
    setAddOnStatus({
      ...addOnStatus,
      [event.target.name]: event.target.checked,
    });
    setNoOfLics(event.target.checked ? 1 : 0);
    handleCreateAcc(event.target.checked);
    // console.log(event.target.checked, 'addon');
  }

  function handleCreateAcc(type) {
    // console.log(type)
    if (type) {
      dispatch(
        changeButton({
          buttonText: "Next",
          stepNo: 4,
        })
      );
    } else {
      dispatch(
        changeButton({
          buttonText: "Create Account",
          stepNo: 4,
        })
      );
    }
  }

  return (
    <Fragment>
      <div
        className="col-md-8 form_box"
        style={{ display: `${step === "step4" ? "block" : "none"}` }}
      >
        <form>
          <h4> Subscription Plan </h4>
          <div className="mt-3 subscriptionBox">
            <div className="plan_select subscriptionPlan">
              <span className="p1">Monthly</span>
              <GreenSwitch
                {...label}
                checked={state.monthlyearly}
                onChange={handleChange}
                name="monthlyearly"
              />
              <span className="p1">Yearly</span>
              <small className="present ms-4">
                Save {planData[0]?.yearlyDiscount}% with the yearly plan
              </small>
            </div>

            {planData?.map((plan, index) => {
              return (
                <StepsPlanSection
                  key={index}
                  planDetails={plan}
                  SubscriptionType={state.monthlyearly}
                  selectedPlan={selectedPlan}
                />
              );
            })}

            <h5 className="mt-3">
              <GreenSwitch
                {...label}
                checked={addOnStatus.fandFamily}
                onChange={handleAddOn}
                name="fandFamily"
              />
              <span className="p1">Friends & Family App Add-On</span>
            </h5>
            {addOnStatus.fandFamily && (
              <>
                <h4 className="themeColor mt-3">
                  Friends & Family App Add-On{" "}
                  <span className="ms-3">
                    £{" "}
                    {state.monthlyearly
                      ? `${fandsFam * 12 * noOfLics} /year`
                      : `${fandsFam * noOfLics} /month`}
                  </span>
                </h4>
                <p className="text-center ">No. of App User Licenses</p>
                <h3 className="text-center">
                  {" "}
                  <div className="slidecontainer align-items-center">
                    <span className="me-2">0</span>{" "}
                    <IOSSlider
                      aria-label="ios slider"
                      defaultValue={1}
                      valueLabelDisplay="on"
                      min={1}
                      max={100}
                      onChange={(e) => setNoOfLics(e.target.value)}
                    />
                    <span className="ms-1">100</span>
                  </div>
                </h3>
              </>
            )}

            <p className="mt-3">
              Charged to your care service and included in your total
              subscription fee based on per app license @ £{" "}
              {state.monthlyearly
                ? `${fandsFam * 12 * noOfLics} /year`
                : `${fandsFam * noOfLics} /month`}{" "}
              . For more than 100 licences, please{" "}
              <NavLink to="#">contact us</NavLink> for custom pricing.{" "}
            </p>

            {(planPrice > 0 || addOnStatus.fandFamily) && (
              <p className="themeColor mt-3 promotionalCode d-flex justify-content-center">
                Enter Promotional Code
                <input
                  type="text"
                  value={promoCode.toUpperCase()}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                  className="btn btn-sm ms-2 coupen_btn"
                  onClick={(e) => applyPromo(e)}
                  maxLength="10"
                >
                  Apply
                </button>
              </p>
            )}

            {selectedPlanId === "" && (
              <div
                className="alert alert-danger d-flex justify-content-center"
                role="alert"
              >
                <h5>Please Select Plan</h5>
              </div>
            )}

            {selectedPlanId !== "" && (
              <h4 className="themeColor">
                Total Subscription Fee:
                <span className="ms-3">
                  £{" "}
                  {state.monthlyearly
                    ? `${
                        fandsFam * 12 * noOfLics +
                        planPrice -
                        (promoDiscount.disType === "Fixed"
                          ? promoDiscount.disVal
                          : ((fandsFam * 12 * noOfLics + planPrice) / 100) *
                            promoDiscount.disVal)
                      } /year`
                    : `${
                        fandsFam * noOfLics +
                        planPrice -
                        (promoDiscount.disType === "Fixed"
                          ? promoDiscount.disVal
                          : ((fandsFam * noOfLics + planPrice) / 100) *
                            promoDiscount.disVal)
                      } /month`}
                </span>
              </h4>
            )}
            {/* <button className="btn updateBtn">Update</button> */}
          </div>
          {/* <NewSubscriptionDesign setNoOfLicences/> */}
          <FormButton isFormValidCheck={isFormValidCheck} />
        </form>
        <SnackBar isInvalid={inValid} status={status} textmessage={statusMsg} />
      </div>
    </Fragment>
  );
}

const IOSSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.mode === "dark" ? "#C4C4C4" : "#C4C4C4",
  height: 19,
  padding: "15px 0",

  "& .MuiSlider-valueLabel": {
    fontSize: 12,
    fontWeight: "normal",
    top: 46,
    backgroundColor: "unset",
    color: theme.palette.text.primary,
  },
  "& .MuiSlider-track": {
    border: "none",
    backgroundColor: "#C4C4C4",
  },
  "& .MuiSlider-thumb": {
    height: 18,
    width: 18,
    backgroundColor: "#9B51E0",
  },
  "& .MuiSlider-rail": {
    opacity: 1,
    backgroundColor: "#C4C4C4",
  },
}));
