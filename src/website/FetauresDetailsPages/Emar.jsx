import React from "react";
import "./Featuredetailspages.css";

import { NavLink } from "react-router-dom";


function Emar() {
  return (
  <>
    <section className="pagespace_section">
       <div className="container">
         <div className="title">
           <h3>eMAR</h3>
         </div>
         <div className=" d-flex text-align-left title" style={{marginBottom:"-40px"}}>
           <NavLink to="/features" className="text-light mt-4"> Feature</NavLink>
         </div>
        </div> 
    </section>

    <section className="care_facilities_section">
      <div className="container">
      <div className="col-md-9 offset-3 title">
         <h3>Revolutionizing Medication Management</h3> 
        <p>Electronic Medication Administration Records (eMAR) provide a modern solution for managing medications for patients. Our innovative technology helps to reduce the risk of medication errors and increase the accuracy of patient data. Additionally, it streamlines the medication management process. The eMAR system provides real-time information on the administration of medicines. This allows care services to maintain a complete record of a patient's medication history, including dosage, frequency, and any adverse reactions. By using eMAR, care services can ensure that patients receive the correct medication at the right time and in the right amount, ultimately leading to improved patient outcomes and higher quality care.</p>
         </div>

      <div className="row facilities_row"> 
           <div className="col-md-3 img_box">
           {/* <img alt="" src={`${process.env.PUBLIC_URL}/images/task-creation.svg`}/> */}
            </div>
            <div className="col-md-9 content_box">
              <h3>CareMagnus eMAR</h3>
              <div className="bg_theme"></div>
              <ul>
               <li>Allows care providers to enter medication information in real-time, providing up-to-date information to the care team.</li>
                <li>Up-to-date medicines database of all NHS approved medicines, enables the care team to see all relevant data on the medicines, select and assign to their clients with just a few clicks. 
</li>
<li>Tracks and records all medication administration, providing a clear and accurate record of all medications given to patients.</li>
         <li>Equips the care providers to monitor medication usage, identify trends, and make informed decisions to continuously improve the quality of care.</li>
                </ul>
            </div>   
      </div>
      </div>
    </section>


    <section>
      <div className="col-md-12 static-img">
       <img alt="" src={`${process.env.PUBLIC_URL}/images/emar-static.svg`}/>

      </div>
    </section>

    <section className="retirement_section">
      <div className="container">
      <div className="row facilities_row align-items-center"> 

      <div className="col-md-8 content_box">
              <h3>Maximizing patient care and safety</h3>
              <div className="bg_theme"></div>
              <ul>
            <li><span>Enhanced Accuracy, Reduced Medication Errors</span> Utilizing our electronic medication administration records (eMAR) reduces the risk of medication errors through instant access to up-to-date and accurate patient information, minimizing the possibility of incorrect dosages or missed medications.</li>
            <li><span>Increased Efficiency and Streamlined Processes: </span> By automating routine tasks, our eMAR minimizes the need for manual documentation, allowing care staff to dedicate more time to direct patient care.</li>
            <li><span>Improved Patient Safety and Care:</span> With real-time information about a patient's medication history and health, care providers are better equipped to make informed decisions about patient care. This also helps the care provider to meet regulatory compliance.</li>
            <li><span>Better Communication and Collaboration Among Care Team:</span> CareMagnus eMAR facilitates improved communication between the care team, enabling more efficient collaboration and coordination of care, leading to reduced medical errors and improved patient outcomes.</li>
             
             
             <li><span>Advanced Data Tracking and Analysis:</span> eMAR provides a centralized platform for all medication-related information, making it easier to track and analyze data for quality improvement initiatives, research, and audits.</li>  </ul>
            </div> 
           <div className="col-md-4 img_box">
           <img alt="" src={`${process.env.PUBLIC_URL}/images/care-safty.svg`}/>
            </div>
              
      </div>
      </div>
    </section>
   


  </>
  );
}
export default Emar;