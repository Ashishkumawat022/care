import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import "./login.css";
import swal from "sweetalert";

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function signin() {
    var data = JSON.stringify({
      email: email,
      password: password,
      // userType: "superadmin",
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/loginUserSuperadminPanel`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response));
        if (response.data.status === true) {
          swal("Success", response.data.message, "success").then((value) => {
            localStorage.setItem("superadmin_token", response.data.token);
            localStorage.setItem(
              "__csadmin__d",
              JSON.stringify(response.data.adminData)
            );
            history.push("/superadmin/dashboard");
          });
        } else {
          swal("failed", response.data.message, "error");
        }
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <section className="login_section">
      <div className="login_header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12 logo_box">
              <NavLink className="navbar-brand" to="/superadmin/">
                <b className="logo-icon">
                  <img
                    alt=""
                    src={`${process.env.PUBLIC_URL}/images/logo.svg`}
                  />
                </b>
              </NavLink>
            </div>
            <div className="col-md-9">
              <div className="login_title">
                <h1>Care Management Simplified!</h1>
                <p>SaaS Platform SuperAdmin Panel</p>
              </div>
            </div>
            <div className="col-md-3 img_box">
              <img alt="" src={`${process.env.PUBLIC_URL}/images/login.svg`} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 form_box">
        <form>
          <h4>Login</h4>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            placeholder="Password"
          />
          <NavLink to="/superadmin/forgotpassword" className="forgot">
            Forgot Password?
          </NavLink>
          <NavLink to="/superadmin/login">
            <input
              type="button"
              onClick={signin}
              className="form-control btn"
              value="Log in"
            />
          </NavLink>
        </form>
      </div>
    </section>
  );
}

export default Login;
