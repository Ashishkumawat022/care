import React, { Fragment, useState, forwardRef } from "react";
import MuiAlert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { useEffect } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import {
//   changeButton,
//   currentStepNo,
//   nextStepNo,
// } from "../../redux-toolkit/reducer/accountCreationApiReducer";

export default function SnackBar(props) {
  let { isInvalid, status, textmessage, hideDuration } = props;
  const [open, setOpen] = useState(isInvalid);

  useEffect(() => {
    setOpen(isInvalid);
    // console.log("open", isInvalid, open);
  }, [props]);
  return (
    <Fragment>
      <Snackbar open={open} autoHideDuration={hideDuration}>
        <Alert severity={status} sx={{ width: "100%" }}>
          {textmessage}
        </Alert>
      </Snackbar>
    </Fragment>
  );
}

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
