import { NavLink } from "react-router-dom";

export default function FormLayout({ children }) {
  return (
    <section className="login_section">
      <div className="login_header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12 logo_box">
              <NavLink className="navbar-brand" to="">
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
      {children}
    </section>
  );
}
