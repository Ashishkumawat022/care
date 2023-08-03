import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import axios from "axios";
import './signup.css';
import swal from "sweetalert";
// import SweetAlert from "sweetalert-react/lib/SweetAlert";

function SignupAdmin() {
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [mobileNo, setmobileNo] = useState("");
    // const [userType, setuserType] = useState("admin");
    const [companyName, setcompanyName] = useState("");
    const [title, settitle] = useState("");
    function register() {
        var data = JSON.stringify({
            'ownerId': localStorage.getItem("ownerId"),
            "email": email,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "mobileNo": mobileNo,
            "companyName": companyName,
            "title": title,
            'userType': 'admin'
        });

        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_BASEURL}/register`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data)
                if (response.data.status === true) {
                    swal("Success", response.data.message, "success").then((value) => {
                        history.push('/admin/');
                    });
                } else {
                    swal("failed", response.data.message, "failed").then((value) => {
                        history.push('/admin/signup');
                    });
                }
                console.log("=================>>>", JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
        console.warn(email, password, firstName, lastName, companyName, title)
    }
    return (
        <section className="login_section">
            <div className="login_header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-12 logo_box">
                            <NavLink className="navbar-brand" to="/admin/">
                                <b className="logo-icon">
                                    <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/logo.svg`} />
                                </b>
                            </NavLink>
                        </div>
                        <div className="col-md-9">
                            <div className="login_title">
                                <h1>Care Management Simplified!</h1>
                                <p>Welcome to your new experience of care management. Our powerful, easy to use
                                    and intuitive care platform, enables you to easily manage all you care tasks.</p>
                            </div>
                        </div>
                        <div className="col-md-3 img_box">
                            <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/login.svg`} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-4 form_box">
                <form>
                    <h4>Create Account</h4>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" />
                    <input type="text" value={firstName} onChange={(e) => setfirstName(e.target.value)} className="form-control" placeholder="First Name" />
                    <input type="text" value={lastName} onChange={(e) => setlastName(e.target.value)} className="form-control" placeholder="Last Name(Optional)" />
                    <input type="number" value={mobileNo} onChange={(e) => setmobileNo(e.target.value)} className="form-control" placeholder="Mobile Number" />
                    <input type="text" value={companyName} onChange={(e) => setcompanyName(e.target.value)} className="form-control" placeholder="Company Name(Optional)" />
                    <input type="text" value={title} onChange={(e) => settitle(e.target.value)} className="form-control" placeholder="Title(Optional)" />
                    {/* <label className="checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                        We follow GDPR security requirements. Please read and accept our privacy policy before sign-up. <NavLink title="Privacy Policy" to="/">Privacy Policy & Terms of Use.</NavLink>
                    </label> */}
                    <input type="button" onClick={register} className="form-control btn" value="Create Account" />
                </form>
                <div className="option_box">
                    <p>Already have an account? <NavLink to="/admin/login" className="">Log in</NavLink></p>
                </div>
            </div>
        </section>
    );
}

export default SignupAdmin;