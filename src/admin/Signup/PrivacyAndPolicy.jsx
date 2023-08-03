import React from "react";
import { NavLink } from "react-router-dom";

export default function PrivacyAndPolicy() {
  return (
    <p style={{ display: "inline-block", color: "#8C00A4" }}>
      We follow GDPR security requirements. Please read and accept our privacy
      policy before sign-up.
      <NavLink to="#" className="seeDetails">
        Privacy Policy & Terms of Use{" "}
      </NavLink>{" "}
    </p>
  );
}
