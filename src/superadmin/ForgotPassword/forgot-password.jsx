import React from "react";
import { NavLink } from "react-router-dom";
import './forgot-password.css';

function Forgotpassword() {
    return (
        <section className="login_section">
            <div className="login_header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-12 logo_box">
                            <NavLink className="navbar-brand" to="/superadmin/">
                                <b className="logo-icon">
                                    <img alt="" src={`${process.env.PUBLIC_URL}/images/logo.svg`} />
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
                    <h4>Forgot Password</h4>
                    <input type="email" className="form-control" placeholder="Email" />
                    <input type="button" className="form-control btn" value="Forgot Password" />
                </form>
                <div className="option_box">
                    <p>Already have an account? <NavLink to="/superadmin/login" className="">Log in</NavLink></p>
                </div>
            </div>

        </section>
    );
}

export default Forgotpassword;