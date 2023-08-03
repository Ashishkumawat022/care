import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
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
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/login`,
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
            localStorage.setItem("care_admin_token", response.data.token);
            localStorage.setItem(
              "userData",
              JSON.stringify(response.data.adminData)
            );
            history.push("/admin/dashboard");
          });
        } else {
          swal("failed", response.data.message, "error").then((value) => {
            history.push("/admin/signup");
          });
        }
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      signin();
    }
  };
  return (
    <section className="login_section">
      <div className="login_header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12 logo_box">
              <NavLink className="navbar-brand" to="/admin/dashboard">
                <b className="logo-icon">
                  <img
                    alt=""
                    src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/logo.svg`}
                  />
                </b>
              </NavLink>
            </div>
            <div className="col-md-9">
              <div className="login_title">
                <h1>Care Management Simplified!</h1>
                <p>
                  Welcome to your new experience of care management. Our
                  powerful, easy to use and intuitive care platform, enables you
                  to easily manage all you care tasks.
                </p>
              </div>
            </div>
            <div className="col-md-3 img_box">
              <img
                alt=""
                src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/login.svg`}
              />
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
            onKeyUp={(e) => {
              handleKeypress(e);
            }}
            type="email"
            className="form-control"
            placeholder="Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => {
              handleKeypress(e);
            }}
            type="password"
            className="form-control"
            placeholder="Password"
          />
          <NavLink to="/admin/forgotpassword" className="forgot">
            Forgot Password?
          </NavLink>
          <NavLink to="/admin/login">
            <input
              type="button"
              onClick={signin}
              className="form-control btn"
              value="Log in"
            />
          </NavLink>
        </form>
        <div className="option_box">
          {/* <div className="or"><span>OR</span></div>
                <ul>
                    <li><Link to="/" ><img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/facebook.png`} /></Link></li>
                    <li><NavLink to=""><img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/google.png`} /></NavLink></li>
                </ul> */}
          <p>
            Don’t have an account? <NavLink to="/admin/signup">Sign up</NavLink>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
