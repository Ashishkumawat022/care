import React from "react";
import "./Featuredetailspages.css";

import { NavLink } from "react-router-dom";


function SalesFunnels() {
  return (
  <>
    <section className="pagespace_section">
       <div className="container">
         <div className="title">
           <h3>Sales Funnel</h3>
         </div>
         <div className=" d-flex text-align-left title" style={{marginBottom:"-40px"}}>
           <NavLink to="/features" className="text-light mt-4"> Feature</NavLink>
         </div>
        </div> 
    </section>

    <section className="care_facilities_section">
      <div className="container">
      <div className="col-md-9 offset-3 title">
         <h3>Driving Success through Effective Sales Management</h3> 
        <p>The role of sales management in care services involves overseeing the process of promoting and selling care services to potential clients. This requires a deep understanding of both the needs of clients and the offerings of the organization, as well as the ability to clearly articulate the value of these offerings to clients. As sales managers you are responsible for developing and executing sales strategies, supporting and mentoring the sales team, and using data analysis to make informed decisions. Building strong relationships with clients, maintaining high levels of customer satisfaction, and effectively managing the sales process from lead generation to closure are also critical components of success in this role. By utilizing our sales module as a compliment to their skill-sets, sales managers can play a key role in the growth and success of their organization, helping to increase revenue and establish a positive reputation in the industry.</p>
          </div>

      <div className="row facilities_row"> 
           <div className="col-md-3 img_box">
           <img alt="" src={`${process.env.PUBLIC_URL}/images/sales-funnel-1.svg`}/>
            </div>
            <div className="col-md-9 content_box">
              <h3>Sales Funnel</h3>
              <div className="bg_theme"></div>
              <ul>
                <li>Our Sales Funnel software simplifies the sales process by automating repetitive tasks, allowing sales teams to focus on higher-value activities.</li>
                <li>The software provides a central location to manage leads, enabling teams to monitor progress and allocate resources appropriately.</li>
                <li>The software collects and analyzes data throughout the sales process, giving organizations valuable insights into customer behavior and conversion rates.</li>
                <li>The software provides organizations with a clear view of the entire sales funnel, allowing them to identify bottlenecks and make data-driven decisions to improve performance.</li>
              </ul>
            </div>  
            <div className="col-md-3"></div>
            <div className="col-md-9 img_box_below">
           <img alt="" src={`${process.env.PUBLIC_URL}/images/sales-funnel.svg`}/>
            </div> 
      </div>
      </div>
    </section>

    <section className="retirement_section">
      <div className="container">
      <div className="row facilities_row align-items-center"> 

      <div className="col-md-8 content_box">
              <h3>Growing Care Services Revenue and Outreach</h3>
              <div className="bg_theme"></div>
              <ul>
                <li><span>Improved Collaboration:           </span>The software facilitates teamwork by enabling sales teams to share information and work together on deals.</li>
                <li><span>Personalized Customer Experience: </span>By providing real-time insights into customer interactions and preferences, the software helps organizations deliver a more personalized and seamless customer experience, strengthening relationships and increasing customer loyalty.</li>
                <li><span>Boosted Sales Performance:        </span> The software equips sales teams with the tools and information they need to excel in their roles, from lead generation to deal closure.</li>
                <li><span>Accurate Sales Forecasting:       </span>         With real-time sales performance data, organizations can more accurately forecast and set goals.</li>
                <li><span>Customer Segmentation:            </span> The software enables organizations to segment customers based on their needs and behaviors, allowing for more targeted and personalized care services.</li>
                <li><span>Enhanced ROI:                     </span> By simplifying processes, improving lead management, and delivering real-time sales performance data, the software helps care providers maximize their return on investment.</li>
             </ul>
            </div> 
           <div className="col-md-4 img_box">
           <img alt="" src={`${process.env.PUBLIC_URL}/images/growing.svg`}/>
            </div>
              
      </div>
      </div>
    </section>
   


  </>
  );
}
export default SalesFunnels;