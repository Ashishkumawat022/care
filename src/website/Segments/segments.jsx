import React from "react";
import '../Segments/segments.css';



function Home() {
  return (
  <>
    <section className="pagespace_section">
       <div className="container">
         <div className="title">
           <h3>segments</h3>
         </div>
        </div> 
    </section>

    <section className="care_facilities_section">
      <div className="container">
      <div className="col-md-9 offset-3 title">
         <h3>Care Facilities</h3> 
         <p>Managers of care facilities have to ensure 24x7 continuity of care to all their clients while ensuring high quality standards to 
meet compliances. For this they have to fulfill the dual role of not only ensuring delivery of care but also manage the care 
operations. With this dual mandate it is imperative for the managers to be equipped with the right tools for smooth operations.     </p>
      </div>

      <div className="row facilities_row"> 
           <div className="col-md-3 img_box">
           <img alt="" src={`${process.env.PUBLIC_URL}/images/care-n-4.svg`}/>
            </div>
            <div className="col-md-9 content_box">
              <h3>Nursing Homes</h3>
              <div className="bg_theme"></div>
              <ul>
                <li>Easily tailor the care to meet the 24x7 long-term care needs of Ruth and George</li>
<li>Create, assign and monitor tasks for daily personal care </li>
<li>Smooth handover between care shifts </li>
<li>Medication management and doctor visits</li>
<li>Record and track progress  </li>
<li>Keep their loved ones informed with the Friends&Family App. </li>
                </ul>
            </div>   
      </div>


      <div className="row facilities_row"> 
            <div className="col-md-9 content_box">
              <h3>Residential Care Homes  </h3>
              <div className="bg_theme"></div>
              <ul>
              <li>Provide personalized service to Bob who requires mobility assistance and perfoming most ADLs (Activities of daily 
living) and Peter who is more independent but requires assistance with medication administration and some ADLs</li>
<li>Creating tasks and recreational activities for care team to keep both Bob and Peter engaged and lead a fuller life  </li>
<li>Monitor well-being and change care plans according to evolving care needs, while keeping friends and family updated</li>
<li>Easily generate invoices</li>
                </ul>
            </div>   
            
           <div className="col-md-3 img_box">
           <img alt="" src={`${process.env.PUBLIC_URL}/images/care-n-5.svg`}/>
            </div>
      </div>

      </div>
    </section>

    <section className="retirement_section">
      <div className="container">
      <div className="row facilities_row"> 
           <div className="col-md-3 img_box">
           <img alt="" src={`${process.env.PUBLIC_URL}/images/care-n-6.svg`}/>
            </div>
            <div className="col-md-9 content_box">
              <h3>Retirement Homes -  Assisted Living - Care Communities </h3>
              <div className="bg_theme"></div>
              <ul>
              <li>Effectively manage care and related activties of individuals in retirement homes and assisted living facilities including
Margaret who lives in a care community </li>
<li>Keep the ‘Circle-of-Care’ including Friends&Family updated about Margarets activities</li>
<li>Activities and tasks enable better community engagement for Margaret</li>
<li>Margaret can engage services as and when required, while maintaining her independence with ADLs</li>
                </ul>
            </div>   
      </div>
      </div>
    </section>


    <section className="care_facilities_section">
      <div className="container">
      <div className="col-md-9 title">
         <h3>At-Home Care</h3> 
         <p>Care Agencies have to respond quickly to changing market dynamics and demand. They have to rapidly deploy
care team to deliver At-Home care whilst maintaining quality standards. To achieve this they have to ensure that
the rotating care team members have readily available client information and care plans, and that care records
maintain continuity of care to the client. </p>
      </div>

      <div className="row facilities_row"> 
            <div className="col-md-9 content_box">
              <h3>Home-Care Agencies</h3>
              <div className="bg_theme"></div>
              <ul>
              <li>Ease of creating and managing Deborah’s profile and care plans</li>
<li>Schedule care visits according to her needs including companionship</li>
<li>CareTeam App lets the team member to locate and deliver care where it is required</li>
<li>Categories to clearly define the tasks to be performed during the shift and monitor the performance</li>
<li>Care records to maintain continuity of care delivered as per Deborah’s personalized care needs</li>
<li>Sales tools to engage new clients</li>
<li>Share updates with Deborah’s ‘Circle-of-Care’. </li>
                </ul>
            </div>  
           <div className="col-md-3 img_box">
           <img alt="" src={`${process.env.PUBLIC_URL}/images/care-n-7.svg`}/>
            </div> 
      </div>

      </div>
    </section>


  </>
  );
}
export default Home;