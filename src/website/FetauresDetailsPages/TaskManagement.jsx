import React from "react";
import "./Featuredetailspages.css";

import { NavLink } from "react-router-dom";


function TaskManagement() {
  return (
  <>
    <section className="pagespace_section">
       <div className="container">
         <div className="title">
           <h3>Task Management</h3>
         </div>
         <div className=" d-flex text-align-left title" style={{marginBottom:"-40px"}}>
           <NavLink to="/features" className="text-light mt-4"> Feature</NavLink>
         </div>
        </div> 
    </section>

    <section className="care_facilities_section">
      <div className="container">
      <div className="col-md-9 offset-3 title">
         <h3>Tasks Life-Cycle Management made simple</h3> 
         <p>In care services, task creation, performance evaluation, and monitoring are crucial components. The process of task creation involves determining the needs of clients, establishing goals and objectives, and then constructing a comprehensive list of tasks for the care team to perform. To ensure the tasks are being completed effectively and efficiently, performance monitoring is necessary. This includes regularly monitoring the progress of clients, evaluating the work of care staff, and making necessary adjustments to the task list. Monitoring is also critical for ensuring adherence to industry standards, health and safety regulations, and maintaining the delivery of high-quality care services. Utilizing our task management functionaliy, care providers can fulfill their ultimate goal to provide their clients with exceptional care and to support care staff in their roles.</p>
         </div>

      <div className="row facilities_row"> 
           <div className="col-md-3 img_box">
           <img alt="" src={`${process.env.PUBLIC_URL}/images/task-creation.svg`}/>
            </div>
            <div className="col-md-9 content_box">
              <h3>Task Creation</h3>
              <div className="bg_theme"></div>
              <ul>
                <li>Conveniently create and assign tasks to the care team.
                </li>
                <li>Plethora of task categories to choose from, to cover all care activities .</li>
                <li>Distinguishable color coded task categories.</li>
                <li>Tailor the care tasks to the personalized needs of the care receiver.</li>
                <li>Ability to include clear instructions for task success.</li>
                </ul>
            </div>   
      </div>
      </div>
    </section>

    <section className="retirement_section">
      <div className="container">
      <div className="row facilities_row align-items-center"> 

      <div className="col-md-8 content_box">
              <h3>Performance</h3>
              <div className="bg_theme"></div>
              <ul>
              <li>Out task management functionality, makes it easier for care staff to better organize their work and prioritize tasks to ensure that all essential duties are completed in a timely manner.</li>
                <li>The care team can record their task activities on-the-go which provides real-time information on the tasks status.</li>
                <li>Allows the care team with time management, spend less time in completing administrative work and focus their efforts more on caring for the clients. </li>
                </ul>
            </div> 
           <div className="col-md-4 img_box">
           <img alt="" src={`${process.env.PUBLIC_URL}/images/performance.svg`}/>
            </div>
              
      </div>
      </div>
    </section>
    
    <section className="care_facilities_section">
      <div className="container">
    
      <div className="row facilities_row"> 
           <div className="col-md-3 img_box">
           {/* <img alt="" src={`${process.env.PUBLIC_URL}/images/task-creation.svg`}/> */}
            </div>
            <div className="col-md-9 content_box">
              <h3>Monitoring</h3>
              <div className="bg_theme"></div>
              <ul>
               <li>Our task management system allows care providers to assign and monitor tasks, helping to ensure accountability and reducing the risk of overlooked or forgotten tasks.</li>
               <li>It enables care providers to gather, store, and analyze data on their work processes, assisting in identifying areas for enhancement and driving continuous quality improvement.</li>
                </ul>
            </div>   
      </div>
      </div>
    </section>

    
    <section>
      <div className="col-md-12 static-img">
       <img alt="" src={`${process.env.PUBLIC_URL}/images/task-static.svg`}/>

      </div>
    </section>


    <section className="retirement_section">
      <div className="container">
      <div className="row facilities_row align-items-center"> 

      <div className="col-md-8 content_box">
              <h3>Enhancing the care service through efficient task management </h3>
              <div className="bg_theme"></div>
              <ul>
                <li> <span> Boosted efficiency: </span>By utilizing task management, care providers can simplify their processes and reduce the amount of time spent on administrative tasks, freeing up more time to concentrate on direct patient care.</li>
                <li> <span >Improved communication: </span>CareMagnus task management tool enhances communication among care team, allowing them to work together effectively and share information and updates in real-time.</li>
                <li> <span>Elevated patient satisfaction: </span>By ensuring that all tasks are completed in a timely and efficient manner, care providers can enhance the quality of care they provide and increase patient satisfaction.</li>
                <li> <span>Enhanced safety:</span> Task management enables care providers to identify and address potential safety hazards, reducing the risk of accidents and incidents in the care environment.</li>
                <li><span> Optimal resource utilization:</span> Task management can help care providers to optimize resource utilization, reducing waste and improving cost-effectiveness.</li>
                <li><span> Better time management:</span> Task management enables care providers to prioritize tasks, reducing the risks overlooked in multitasking and improving time management.</li>
                <li> <span>Advanced reporting and analysis:</span> The system provides in-depth reports, allowing care providers to make informed decisions and continuously enhance the quality of care they provide.</li>
                </ul>
            </div> 
           <div className="col-md-4 img_box">
           <img alt="" src={`${process.env.PUBLIC_URL}/images/efficent-task.svg`}/>
            </div>
              
      </div>
      </div>
    </section>



  </>
  );
}
export default TaskManagement;