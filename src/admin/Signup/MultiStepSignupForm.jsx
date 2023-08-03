import * as React from 'react';
import { useState, Fragment } from "react";
import FormLayout from "./FormLayout";
import StepOneOwnerDetails from "./StepOneOwnerDetails";
import { useSelector } from "react-redux";
import StepTwoCareSiteDetails from "./StepTwoCareSiteDetails";
import { useEffect } from "react";
import StepThreeAdminDetails from "./StepThreeAdminDetails";
import StepFourSubscriptionPlan from "./StepFourSubscriptionPlan";
import FinalStepPaymentRedirection from "./FinalStepPaymentRedirection";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MultiStepSignupForm() {

  const msignup = useSelector((state) => state.accountCreationApiReducer);

  const [currentStep, setCurrentStep] = useState("");
  const [open, setOpen] = useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setCurrentStep(msignup.step);
    setOpen(msignup.errorMsg === '' ? false : true);
  }, [msignup.step]);

  return (
    <Fragment>
      <FormLayout>
        {currentStep === "step1" && <StepOneOwnerDetails />}
        {currentStep === "step2" && <StepTwoCareSiteDetails />}
        {currentStep === "step3" && <StepThreeAdminDetails />}
        {currentStep === "step4" && <StepFourSubscriptionPlan />}
        {currentStep === "step5" && msignup.buttonText === "Next" && <FinalStepPaymentRedirection />}
      </FormLayout>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {msignup.errorMsg}
        </Alert>
      </Snackbar>
    </Fragment>
  );
}
