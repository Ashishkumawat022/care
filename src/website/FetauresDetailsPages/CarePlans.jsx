import React from "react";
import "./Featuredetailspages.css";

import { NavLink } from "react-router-dom";


function CarePlans() {
  return (
  <>
    <section className="pagespace_section">
       <div className="container">
         <div className="title">
           <h3>Care Plans</h3>
         </div>
         <div className=" d-flex text-align-left title" style={{marginBottom:"-40px"}}>
           <NavLink to="/features" className="text-light mt-4"> Feature</NavLink>
         </div>
        </div> 
    </section>

    <section className="care_facilities_section">
      <div className="container">
      <div className="col-md-9 offset-3 title">
         <h3>Personalized and Comprehensive Care</h3> 
        <p>Care plans are an important element of care services that help to ensure that each patient receives personalized and comprehensive care. A care plan outlines the goals, interventions, and outcomes for each patient, taking into account their unique needs, health conditions, and preferences.  and involve active participation and input from patients and their families. These plans are regularly reviewed and updated to reflect changes in the patient's health status and goals. The implementation of a robust care plan helps care services to provide consistent, high-quality care and ensures that each patient's needs are met in a coordinated and efficient manner. Care plans also play an important role in improving communication between care staff and improving patient outcomes.</p>
         </div>

      <div className="row facilities_row"> 
           <div className="col-md-3 care-plans-input">
          <div>
            <h5>Does Mary have trouble completing ADLs on their own? </h5>
            <ul>
                <li><input type="checkbox" /> Mary completely independent.</li>
                <li><input type="checkbox" /> Mary Needs minimal assistance.</li>
                <li><input type="checkbox" /> Mary needs moderate assistance.</li>
                <li><input type="checkbox" /> Mary is completely dependent on Caregivers for ADLs.</li>
            </ul>
            <h5>Does Mary tolerate ADLs or exercise without significant weakness or dyspnea? </h5>
            
            <ul>
                <li><input type="checkbox" />Yes</li>
                <li><input type="checkbox" />No</li>
            </ul>
          </div>
            </div>
            <div className="col-md-9 content_box">
              <h3>Care Plans</h3>
              <div className="bg_theme"></div>
              <ul>
               <li>Our software provides tools to the care providers to develop care plans created with the individual in mind, taking into account their specific needs and desires. This ensures that the care received is relevant, effective, and tailored to the individual's unique circumstances.</li>
                
                <li>Provides a comprehensive overview of an individual's care journey, ensuring continuity-of-care. This helps prevent any gaps in care and keeps everyone involved informed of the individual's evolving needs and treatments.</li>
                <li>Care plans incorporate regular monitoring and evaluation of the individual's progress, allowing for necessary adjustments to be made. This helps ensure that the care received is effective and meets the individual's changing needs.</li>
               <li>A large selection of care templates are available to set specific, measurable goals for the individual to work towards. This provides a clear direction for their care journey and motivates them to progress. Additionally, it ensures that the care received is focused on helping the individual achieve their desired outcomes.</li>
                </ul>
            </div>   
            <div className="col-md-3"></div>
            <div className="col-md-9 img_box_below">
           <img alt="" src={`${process.env.PUBLIC_URL}/images/care-plans.svg`}/>
            </div>
      </div>
      </div>
    </section>

    <section className="retirement_section">
      <div className="container">
      <div className="row facilities_row align-items-center"> 

      <div className="col-md-8 content_box">
              <h3>Optimizing client care through coordinated and personalized care plans </h3>
              <div className="bg_theme"></div>
              <ul>
                <li> <span> Streamlined Care Coordination: </span>Our detailed and comprehensive care plans generation tool serves as a comprehensive resource for healthcare providers involved in a patient's care, promoting collaboration and consistency in the delivery of treatment.</li>
                <li> <span> Reduction in Administrative Workload:</span> With our care plans generation tool, you as the care provider can easily create and review the plans. Using a multitude of care plan templates that are included in the tool to create the plans, significantly reduces your workload. </li>
                <li><span> Improved Client Outcomes:</span> Detailed care plans help to guide treatment, ensuring that all necessary interventions are taken and increasing the likelihood of positive patient outcomes.</li>
                <li><span> Empowered Care Receivers: </span> By including care receivers in the planning process, care plans provide them with a sense of control over their own care and encourage their active participation in the treatment process.</li>
                <li> <span> Enhanced Communication: </span> Well written care plans offer a clear and concise overview of a patient's medical history, status, and treatment goals, facilitating effective communication and collaboration among healthcare providers.</li>
              
              <li> <span> Cost-Effective Care:</span> By reducing duplicate procedures and avoiding adverse events, care plans can help to optimize the delivery of care and reduce healthcare costs, ultimately leading to better patient outcomes.</li>
               </ul>
            </div> 
           <div className="col-md-4 img_box">
           <img alt="" src={`${process.env.PUBLIC_URL}/images/opti-care-plan.svg`}/>
            </div>
              
      </div>
      </div>
    </section>
   


  </>
  );
}
export default CarePlans;