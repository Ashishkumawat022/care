import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetch2, fetch3, fetch4 } from "../../Apis/commonApis";
import { AccessManagementDefaultRoles } from "../../constants/roles";

export let accountListItems;
export let currentStepNo;
export let nextStepNo;
export let ownerId;
export let adminId;
export let createRedirctFlowData;
export let completeRedirctFlowApiData;
export let billRequestFlowApiData;

const initialState = {
  loading: false,
  accountListCount: 0,
  id: 1,
  step: "step1",
  textStep: "step",
  buttonText: "Next",
  data: {},
  stepNo: 1,
  isSubmit: false,
  isValid: false,
  errorMsg: '',
  runBillRequestApi: 0,
  runAccountCreateApi: 0,
  redirectToPaymentPage: 0,
  clearLsData: 0,
  paymentLoading: false,
  registerSuccess: 0,
  adminApi: 0,
};

export let OwnerandCareSiteDetails = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  mobileNo: "",
  companyName: "",
  careSiteName: "",
  carefacility: "",
  userType: "owner",
  role: AccessManagementDefaultRoles[0],
  totalBeds: 1,
  billingAddress: "",
};

export let adminDetails = {
  email: "",
  firstName: "",
  lastName: "",
  mobileNo: "",
  userType: "",
  ownerId: "",
  role: AccessManagementDefaultRoles[1],
};

export let extraProDetails = {
  productId: "",
  unit_amount: "",
  interval: "",
  frndFamAmt: "",
  licsCount: "",
  planName: "",
  planPrice: "",
  trialDays: 0,
  promoName: "Not Available",
  couponType: "amount_off",
  amount_off: "",
  redemCount: "5"
};

export let planDetails = {
  planId: "",
  companyName: "",
  country: "",
  careSiteName: "",
  totalBeds: 1,
  carefacility: "",
  multiCareSite: false,
  planstartDate: 0,
  SubscriptionPlan: "",
  SubscriptionPlanId: "",
  monthyOrYearly: "",
  planRate: "0",
  unit_amount: "0",
};


export const accountList = createAsyncThunk("accountList", async () => {
  const result = await fetch3(
    `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getPlans`,
    "get"
  );
  accountListItems = result.data;
  return result;
});

export const nextStepApi = createAsyncThunk("nextStepApi", async (body) => {
  const result = await fetch4(
    `${process.env.REACT_APP_BASEURL}/register`,
    body
  );
  // console.log(result, 'register api');
  ownerId = result?.registerData?._id;
  if (result.status)
    localStorage.setItem("registerData", JSON.stringify(result.registerData));
  return result;
});

export const nextStep3Api = createAsyncThunk("nextStep3Api", async (body) => {
  const result = await fetch4(
    `${process.env.REACT_APP_BASEURL}/registeradmin`,
    body
  );
  adminId = result?.adminData?._id;
  if (result.status)
    localStorage.setItem("registerAdminData", JSON.stringify(result.adminData));
  return result;
});

export const createAcctApi = createAsyncThunk("createAcctApi", async (body) => {
  // console.log(body,'body');
  const result = await fetch4(
    `${
      process.env.REACT_APP_BASEURL
    }/registerNewSite?adminId=${body[1]}`,
    body[0]
  );
  // console.log(result,'accoutn create response');
  return result;
});

export const createRedirctFlow = createAsyncThunk(
  "createRedirctFlow",
  async (body) => {
    const result = await fetch4(
      `${process.env.REACT_APP_BASEURL}/createRedirctFlow`,
      body
    );
    createRedirctFlowData = result;
    localStorage.setItem("startPayApiData", JSON.stringify(result));
    // console.log(result, "start payment api");
    return result;
  }
);

export const completeRedirctFlow = createAsyncThunk(
  "completeRedirctFlow",
  async (body) => {
    const result = await fetch4(
      `${process.env.REACT_APP_BASEURL}/completeRedirctFlow`,
      body
    );
    completeRedirctFlowApiData = result;
    return result;
  }
);

export const billRequestFlow = createAsyncThunk("billRequestFlow", async (body) => {
  const result = await fetch4(
    `${process.env.REACT_APP_BASEURL}/gocardLessCreateBillingRequestFlow`,
    body
  );
  billRequestFlowApiData = result;
  // console.log(result, 'flow');
  return result;
});

const manageAccountCreation = createSlice({
  name: "manageAccountCreation",
  initialState,
  reducers: {
    changeButton(state = initialState, action) {
      currentStepNo = action.payload.currentNo;
      state.buttonText = action.payload.buttonText;
      state.stepNo = action.payload.stepNo;
      nextStepNo = action.payload.nextNo;
      state.step = state.textStep + state.stepNo;
    },

    handleSteps(state = initialState, action) {
      state.errorMsg = action.payload.errorMsg;
      state.registerSuccess = action.payload.registerSuccess;
    },
    
    nextStepFuncFirstForm(state = initialState, action) {
      OwnerandCareSiteDetails.email = action.payload.email;
      OwnerandCareSiteDetails.password = action.payload.password;
      OwnerandCareSiteDetails.firstName = action.payload.firstName;
      OwnerandCareSiteDetails.lastName = action.payload.lastName;
      OwnerandCareSiteDetails.mobileNo = action.payload.mobileNo;
    },
    nextStepFuncSecondForm(state = initialState, action) {
      OwnerandCareSiteDetails.companyName = action.payload.companyName;
      OwnerandCareSiteDetails.careSiteName = action.payload.careSiteName;
      OwnerandCareSiteDetails.carefacility = action.payload.carefacility;
      OwnerandCareSiteDetails.totalBeds = action.payload.totalBeds;
      OwnerandCareSiteDetails.billingAddress = action.payload.billingAddress;
    },
    nextStepFuncThirdForm(state = initialState, action) {
      adminDetails.email = action.payload.email;
      adminDetails.firstName = action.payload.firstName;
      adminDetails.lastName = action.payload.lastName;
      adminDetails.mobileNo = action.payload.mobileNo;
      adminDetails.userType = action.payload.userType;
      adminDetails.ownerId = action.payload.ownerId;
    },
    nextStepFuncFourthForm(state = initialState, action) {
      planDetails.planId = action.payload.planId;
      planDetails.companyName = action.payload.companyName;
      planDetails.country = action.payload.country;
      planDetails.careSiteName = action.payload.careSiteName;
      planDetails.totalBeds = action.payload.totalBeds;
      planDetails.carefacility = action.payload.carefacility;
      planDetails.multiCareSite = action.payload.multiCareSite;
      planDetails.planstartDate = action.payload.planstartDate;
      planDetails.SubscriptionPlan = action.payload.SubscriptionPlan;
      planDetails.SubscriptionPlanId = action.payload.SubscriptionPlanId;
      planDetails.monthyOrYearly = action.payload.monthyOrYearly;
      planDetails.planRate = action.payload.planRate;
      planDetails.unit_amount = action.payload.unit_amount;
    },
    productExtraData(state = initialState, action) {
      extraProDetails.productId = action.payload.productId;
      extraProDetails.unit_amount = action.payload.unit_amount;
      extraProDetails.interval = action.payload.interval;
      extraProDetails.frndFamAmt = action.payload.frndFamAmt;
      extraProDetails.licsCount = action.payload.licsCount;
      extraProDetails.planName = action.payload.planName;
      extraProDetails.planPrice = action.payload.planPrice;
      extraProDetails.trialDays = action.payload.trialDays;
      extraProDetails.promoName = action.payload.promoName;
      extraProDetails.couponType = action.payload.couponType;
      extraProDetails.amount_off = action.payload.amount_off;
      extraProDetails.redemCount = action.payload.redemCount;
    },
  },
  extraReducers: {
    [accountList.fulfilled]: (state, { payload: { error, message } }) => {
      state.loading = false;
      state.accountListCount += 1;
    },
    [nextStepApi.fulfilled]: (state, { payload: { error, message, status } }) => {
      // console.log(message,status,error,'extra reducer');
      if (status) {
        state.registerSuccess = 2;
      } else {
        state.errorMsg = message;
        state.registerSuccess = 1;
      }
    },
    [nextStep3Api.fulfilled]: (state, { payload: { error, message } }) => {
      state.adminApi += 1;
    },
    [createAcctApi.fulfilled]: (state, { payload: { status, message } }) => {
      if (status) {
        state.clearLsData += 1;
      }
      state.paymentLoading = false;
    },
    [createRedirctFlow.fulfilled]: (state, payload) => {
      console.log(payload, 'payload of start payment');
      state.runBillRequestApi += 1;
      state.paymentLoading = true;
    },
    [completeRedirctFlow.fulfilled]: (state, { payload: { error, message } }) => {
      state.runAccountCreateApi += 1;
    },
    [billRequestFlow.fulfilled]: (state, { payload: { error, message } }) => {
      state.redirectToPaymentPage += 1;
      state.paymentLoading = false;
    },
  },
});

export const {
  changeButton,
  nextStepFuncFirstForm,
  nextStepFuncSecondForm,
  nextStepFuncThirdForm,
  nextStepFuncFourthForm,
  productExtraData,
  handleSteps
} = manageAccountCreation.actions;
export default manageAccountCreation.reducer;
