import React from "react";
import "./Featuredetailspages.css";

import { NavLink } from "react-router-dom";


function PayrollCalculator() {
  return (
  <>
    <section className="pagespace_section">
       <div className="container">
         <div className="title">
           <h3>Payroll Calculator</h3>
         </div>
         <div className=" d-flex text-align-left title" style={{marginBottom:"-40px"}}>
           <NavLink to="/features" className="text-light mt-4"> Feature</NavLink>
         </div>
        </div> 
    </section>

    <section className="care_facilities_section">
      <div className="container">
      <div className="col-md-9 offset-3 title">
         <h3>Streamlining Employee Wage Calculations</h3> 
        <p>Wage calculator is an effective tool for care service providers to calculate wages  for their employees. This software takes into account various factors such as hours worked, overtime, holiday pay, and deductions to provide wage calculations. Utilizing a wage calculator ensures that employees are paid correctly and on time, which is essential for maintaining employee satisfaction. By automating wage calculations, care service providers can streamline their payroll processes, reduce errors, and focus on delivering high-quality care services to their clients.</p>
          </div>

      <div className="row facilities_row"> 
           <div className="col-md-3 img_box">
           <img alt="" src={`${process.env.PUBLIC_URL}/images/payroll-calu.svg`}/>
            </div>
            <div className="col-md-9 content_box">
              <h3>Payroll Calculator</h3>
              <div className="bg_theme"></div>
              <ul>
                <li>Customizable employee profiles to input relevant information such as pay rates, hours worked, overtime, etc.</li>
                <li>Real-time tracking of employee hours worked, and pay rates for easy and accurate payroll processing.</li>
                <li>Generation of  reports required for compliance, such as t annual summaries.
View wages for specified periods. </li>
                <li>Advanced security features to ensure confidentiality and protect sensitive employee information.</li>
                <li>Automatic calculation of overtime, etc based on the company's policies and employee contracts.</li>
                <li>Easy access to historical payroll data and reports, making it easier to identify trends and patterns in payroll expenses and track employee performance over time.</li>
             </ul>
            </div>  
            <div className="col-md-3"></div>
            <div className="col-md-9 img_box_below">
           <img alt="" style={{width:"40%"}} src={`${process.env.PUBLIC_URL}/images/payroll-cal-2.svg`}/>
            </div> 
      </div>
      </div>
    </section>

    <section className="retirement_section">
      <div className="container">
      <div className="row facilities_row align-items-center"> 

      <div className="col-md-8 content_box">
              <h3>Maintain Employee Satisfaction with Accurate Wage Calculations</h3>
              <div className="bg_theme"></div>
              <ul>
                <li> <span> Automating Wage Calculations: </span> Automated payroll calculations ensure accurate payments and reduce the risk of errors.</li>
                <li> <span>Improved Financial Management: </span>Easily keep track of employee working hours, overtime, and other factors that impact pay.</li>
                <li> <span>Streamlined Operations:        </span>  Streamlined payroll process saves time and effort, allowing care service providers to focus on other critical aspects of running their business.</li>
                <li> <span>Reduction in Errors:           </span>   Reduce, Identify and prevent errors in wage calculations, reducing the risk of under-payments or over-payments.</li>
                <li> <span>Operational Oversight:         </span>   Provides real-time visibility of payroll data, enabling care service providers to make informed decisions based on accurate information.</li>
                <li> <span>Ensuring Employee Satisfaction:</span> Automated wage calculation processing, ensures timely and accurate payment of employees.</li>
             </ul>
            </div> 
           <div className="col-md-4 img_box">
           <img alt="" src={`${process.env.PUBLIC_URL}/images/main-calu.svg`}/>
            </div>
              
      </div>
      </div>
    </section>
   


  </>
  );
}
export default PayrollCalculator;