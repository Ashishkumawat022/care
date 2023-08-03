import React from "react";
import { NavLink } from "react-router-dom";

import "./Featuredetailspages.css";



function Rota() {
  return (
  <>
    <section className="pagespace_section">
       <div className="container">
         <div className="title">
           <h3>Rota</h3>
         </div>
         <div className=" d-flex text-align-left title" style={{marginBottom:"-40px"}}>
           <NavLink to="/features" className="text-light mt-4"> Feature</NavLink>
         </div>
        </div> 
    </section>

    <section className="care_facilities_section">
      <div className="container">
      <div className="col-md-9 offset-3 title">
         <h3>Ensuring optimal coverage and improved productivity</h3> 
         <p>Rota management in care services is a critical aspect of providing quality care to patients. Care services require schedules for care workers to be carefully planned and organized to ensure that the right staff are available at the right time to provide care to patients. This may encompass scheduling staff for shifts, considering their needs and preferences, and taking into account the availability of resources such as equipment and facilities. Effective rota management helps to ensure that patients receive consistent, high-quality care and that staff are not overworked, which can lead to burnout and decreased job satisfaction. By using our platform, care providers can streamline the scheduling process, making it easier to manage staff schedules, respond to changes quickly, and ensure optimal staffing levels.    </p>
      </div>

      <div className="row facilities_row"> 
           <div className="col-md-3 img_box">
           {/* <img alt="" src={`${process.env.PUBLIC_URL}/images/care-n-4.svg`}/> */}
            </div>
            <div className="col-md-9 content_box">
              <h3>Our Rota Management module enables you to</h3>
              <div className="bg_theme"></div>
              <ul>
                <li>Create and monitor staff shifts all in one place.</li>
                <li>Manage staff availability by registering the time-offs based on their preferences.</li>
                <li>Get clear view of human resource availability for improved allocation.</li>
                <li>Be agile, with the ability to quickly and easily modify shift details as required. </li>
                <li>Have an oversight on staff performance to maintain the quality standards of the care provided.</li>
                </ul>
            </div>   
      </div>
      </div>
    </section>


    <section>
      <div className="col-md-12 static-img">
       <img alt="" src={`${process.env.PUBLIC_URL}/images/rota-static.svg`}/>

      </div>
    </section>

    <section className="retirement_section">
      <div className="container">
      <div className="row facilities_row align-items-center"> 

      <div className="col-md-8 content_box">
              <h3>Creating value for your care operations</h3>
              <div className="bg_theme"></div>
              <ul>
              <li><span> Optimal workforce utilization: </span> Our Rota management ensures that care staff are scheduled in a way that optimizes their utilization, reducing the need for additional hours and boosting productivity.</li>
                <li><span> Employee happiness:</span> A well-planned rota helps improve work-life balance for the care team and contributes to overall job satisfaction.</li>
                <li> <span>Improved client experience:</span> By making sure there are sufficient staffing levels, our rota management can reduce wait times and improve the quality of the care service.</li>
                <li> <span>Efficient planning:</span> A clear and organized rota system gives visibility into staffing levels, making it easier to plan future shifts and allocate resources effectively.</li>
                <li> <span>Financial benefits:</span> Efficient rota management can result in substantial cost savings for your care operations by reducing the need for overtime and maximizing workforce utilization.</li>
                
                
                </ul>
            </div> 
           <div className="col-md-4 img_box">
           <img alt="" src={`${process.env.PUBLIC_URL}/images/pana.svg`}/>
            </div>
              
      </div>
      </div>
    </section>



  </>
  );
}
export default Rota;