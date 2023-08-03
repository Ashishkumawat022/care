import React from "react";
import { NavLink } from "react-router-dom";

export default function LoginRedirection() {
  return (
    <p style={{ display: "inline-block" }}>
      Already have an account?
      <NavLink to="/admin/login" className="seeDetails">
        Login{" "}
      </NavLink>{" "}
    </p>
  );
}
