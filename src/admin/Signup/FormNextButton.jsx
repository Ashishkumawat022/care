import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function FormButton(props) {
  let { isFormValidCheck } = props;
  const { buttonText } = useSelector(
    (state) => state.accountCreationApiReducer
  );

  return (
    <div className="col-md-12 submitBtn">
      <button
        type="button"
        className="form-control btn"
        style={{ display: "inline-block" }}
        onClick={() => {
          isFormValidCheck();
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}
