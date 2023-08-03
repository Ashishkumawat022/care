import React from "react";
import { NavLink } from "react-router-dom";
import '../Login/login.css';
import { MdOutlineCheckBox } from 'react-icons/md';



function Home() {
  return (
    <>
      <section className="slider_section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-9">
              <div className="login_title">
                <h1>Care Management Simplified!</h1>
                <p>Welcome to your new experience of care management. Our powerful, easy-to-use and intuitive care platform, enables you to easily manage all your care tasks. </p>
                <button className="btn">Start your experience</button>
              </div>
            </div>
            <div className="col-md-3 img_box">
              <img src={`${process.env.PUBLIC_URL}/images/login.svg`} />
            </div>
          </div>
        </div>
      </section>
      <section className="content_section">
        <div className="container">
          <div className="row">
            <div className="col-md-3 img_box">
              <img src={`${process.env.PUBLIC_URL}/images/care-1.svg`} />
            </div>
            <div className="col-md-9 content_body">
              <h3>All-In-One Comprehensive Platform meeting all your care management needs</h3>
              <ul>
                <li>
                  <MdOutlineCheckBox /> Personalized Care Plans
                </li>
                <li>
                  <MdOutlineCheckBox /> Resource Scheduling
                </li>
                <li>
                  <MdOutlineCheckBox /> Task Management
                </li>
                <li>
                  <MdOutlineCheckBox /> Sales Planning
                </li>
                <li>
                  <MdOutlineCheckBox /> Medication Management
                </li>
                <li>
                  <MdOutlineCheckBox /> and much more...
                </li>
              </ul>
              <p>Automated, efficient and yet simple-to-use, empowering you to focus more on personalized care delivery and growing
                your care service, rather than spending countless hours on care administration.  </p>
            </div>
          </div>
        </div>
      </section>
      <section className="supporting_section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-9 content_body">
              <h3>One platform supporting multi-channel care</h3>
              <p>Our platform is highy modular, scalable and has been designed keeping in view the needs of care delivery through various channels.
                The service can be provisioned in Care Facilites (nursing homes, residential care homes, retirement homes and assisted-living) as well
                as for At-Home Care. This gives unmatched flexibility to care service provides.</p>
            </div>
            <div className="col-md-3 img_box">
              <img src={`${process.env.PUBLIC_URL}/images/care-2.svg`} />
            </div>
          </div>
          <div className="col-md-12 text-center">
            <button className="btn">Explore More</button>
          </div>
        </div>
      </section>

      <section className="delevring_section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-7 title offset-5 p-0">
              <div className="bg_theme"></div>
              <h3>Delivering tangible benefits across the care ecosystem</h3>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="delevring_box">
                <div className="delevring_box_img">
                  <img src={`${process.env.PUBLIC_URL}/images/care-n-1.svg`} />
                </div>
                <div className="delevring_box_body">
                  <h4>Care Managers</h4>
                  <ul>
                    <li>Dashboards for care activity oversight</li>
                    <li>Optimization of resource allocation</li>
                    <li>Efficient operations for meeting compliances</li>
                    <li>Ensuring high quality standards of care delivery</li>
                    <li>Securely and easily manage client data </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="delevring_box">
                <div className="delevring_box_img">
                  <img src={`${process.env.PUBLIC_URL}/images/care-n-2.svg`} />
                </div>
                <div className="delevring_box_body">
                  <h4>Care Team</h4>
                  <ul>
                    <li>Readily accessible information reduces response times</li>
                    <li>Personalized care plans improve quality of care delivered</li>
                    <li>360 view of the client helps continuity of personalized care</li>
                    <li>Ease of managing daily tasks and schedules</li>
                    <li>Convenience in communications and reporting</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="delevring_box">
                <div className="delevring_box_img">
                  <img src={`${process.env.PUBLIC_URL}/images/care-n-3.svg`} />
                </div>
                <div className="delevring_box_body">
                  <h4>Friends & Family</h4>
                  <ul>
                    <li>Ease-of-mind on the care delivered to loved one</li>
                    <li>Easily communicate preferences and consent</li>
                    <li>Up-to-date information on task performance</li>
                    <li>Add other members to the group</li>
                    <li>Ability to quickly provide feedback or escalate</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Home;