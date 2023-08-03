import React from "react";
import { NavLink } from "react-bootstrap";
import '../Features/features.css';



function Features() {
  return (
    <>
      <section className="pagespace_section">
        <div className="container">
          <div className="title">
            <h3>Features</h3>
          </div>
        </div>
      </section>
      <section className="care_facilities_section">
        <div className="container">
          <div className="col-md-9 offset-3 title">
            <h3>Making a difference in Care Management!</h3>
            <p>With an aging population in a large number of countries, there is excessive pressure on the Heath and Social Care services. Care service providers and care givers are overwhelmed these days as they have to meet high quality standards and compliances while also dealing with social care budget constraints. </p>

            <p>Deep understanding of these challenges and needs of the market, led us to create ‘CareMagnus’ to reduce the burden of care management and bring the focus back to the delivery of personalized care. Our highly modular, scalable and easy-to-use platform simplifies the care administration process and enables you, as the services provider, to streamline your operations towards better care delivery.</p>
          </div>

          <div className="row facilities_row align-items-center">
            <div className="col-md-4 img_box position-relative">
              <img alt="" className="empowering_img" src={`${process.env.PUBLIC_URL}/images/f8.svg`} />
            </div>
            <div className="col-md-8 content_box">
              <h3>Empowering You, the Service Provider.  </h3>
              <ul>
                <li>With our highly modular platform, you choose the features that you need today and add more modules as
                  your care service grows</li>
                <li>We understand the budget constraints on smaller care providers and our pricing reflects that. You can even
                  start experiencing our powerful platform for free by creating an account </li>
                <li>With care plans, activity monitoring, progress charts and more, you get a ‘360’ view of the client, enabling
                  you to align your care delivery better with the changing needs of the client</li>
                <li>We have designed our platform such that it is intuitive and easy-to-use so that you and your team can
                  quickly get started</li>
                <li>All this is done knowing that you can securely manage all your client data</li>

              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="supporting_section data_secure_section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-9 content_body">
              <h3>Keeping the Data Secure</h3>
              <p>We take data security very seriously hence use advanced encryptions on data-at-rest and data-in-transit. We follow GDPR security guidelines and other standards for user data privacy protection. You remain in full control of who your clients data is shared with including your care team and friends and family of the client.   </p>
            </div>
            <div className="col-md-3 img_box">
              <img alt="" className="featureImg" src={`${process.env.PUBLIC_URL}/images/f1.svg`} />
            </div>
          </div>
        </div>
      </section>

      <section className="care_facilities_section">
        <div className="container">
          <div className="col-md-9 offset-3 title">
            <h3>Powerful tools for operational success</h3>
            <p>Coming from a care services background ourselves, we have first hand experience of the challenges that care operators face on
              a day-to-day basis. With this in mind, we developed a powerful yet simple to use solution that not only automates a lot of care
              administration tasks but also provides valuable insights to the care service operators from their care delivery data. </p>
          </div>



          <div className="row facilities_row">
          <div className="col-md-3 img_box">
              <img alt="" src={`${process.env.PUBLIC_URL}/images/f3.svg`} className="featureImg" />
            </div>
            <div className="col-md-9 content_box">
              <h3>Rota  </h3>
              <div className="bg_theme"></div>
              <ul>
                <li>Schedule the client care shifts and assign them to the care team members</li>
                <li>See team schedules and availability for clear oversight</li>
                <li>Manage care team holidays and days off</li>
                <li>Optimize shifts for efficient operations</li>
              </ul>
              <NavLink to="/" className="btn">Explore More</NavLink>
            </div>
           
          </div>

          <div className="row facilities_row">
          
            <div className="col-md-9 content_box">
              <h3>Task Management</h3>
              <div className="bg_theme"></div>
              <ul>
                <li>Tasks categories to conveniently create care tasks. Visually distinguable for ease of performance and
                  monitoring</li>
                <li>Create, assign and monitor tasks for daily care </li>
                <li>Add files and photos within tasks to evidence the care delivered</li>
                <li>Care Team can easily update the task status as well as record the care notes</li></ul>
              <NavLink to="/" className="btn">Explore More</NavLink>
            </div>
            <div className="col-md-3 img_box">
              <img alt="" src={`${process.env.PUBLIC_URL}/images/f2.svg`} className="featureImg" />
            </div>
          </div>


       


          <div className="row facilities_row">
            <div className="col-md-3 img_box">
              <img alt="" src={`${process.env.PUBLIC_URL}/images/f4.svg`} className="featureImg" />
            </div>
            <div className="col-md-9 content_box">
              <h3>eMar (Electronic Medicine Administration Record)</h3>
              <div className="bg_theme"></div>
              <ul>
                <li>Register medicines prescribed to the client and maintain this record. Easily search the NHS database for the medicines</li>
                <li>Schedule the medicine administration as per the prescription and monitor adherence </li>
                <li>Check stock levels for reordering</li>
                <li>Receive alerts on any missed medication</li>
              </ul>
              <NavLink to="/" className="btn">Explore More</NavLink>
            </div>
          </div>


          <div className="row facilities_row">
            <div className="col-md-9 content_box">
              <h3>Care Plans  </h3>
              <div className="bg_theme"></div>
              <ul>
                <li>Select from a wide array of care plan templates</li>
                <li>Allows for the evaluation of risks associated with each client to tailor the care</li>
                <li>Review the plans periodically with changing client needs   </li>
              </ul>
              <NavLink to="/" className="btn">Explore More</NavLink>
            </div>
            <div className="col-md-3 img_box">
              <img alt="" src={`${process.env.PUBLIC_URL}/images/f5.svg`} className="featureImg" />
            </div>
          </div>


          <div className="row facilities_row">
            <div className="col-md-3 img_box">
              <img alt="" src={`${process.env.PUBLIC_URL}/images/f6.svg`} className="featureImg" />
            </div>
            <div className="col-md-9 content_box">
              <h3>Payroll Calculator </h3>
              <div className="bg_theme"></div>
              <ul>
                <li>Automatically calculates the wages of the care team member for a set period</li>
                <li>As wages are a significant part of the operational expences, the module equips the care service to monitor and
                  and control this cost better</li>
              </ul>
              <NavLink to="/" className="btn">Explore More</NavLink>
            </div>
          </div>


          <div className="row facilities_row">
            <div className="col-md-9 content_box">
              <h3>Sales Funnel</h3>
              <div className="bg_theme"></div>
              <ul>
                <li>Managing sales along with managing care is essential for any care services to maintain healthy top and bottom line. We understand this and therefore provide our sales funnel module to assist you in managing your sales prospects</li>
                <li>One platform for entire client lifecycle management from prospect to client to promoter. </li>
              </ul>
              <NavLink to="/" className="btn">Explore More</NavLink>
            </div>
            <div className="col-md-3 img_box">
              <img alt="" src={`${process.env.PUBLIC_URL}/images/f7.svg`} className="featureImg" />
            </div>
          </div>

        </div>
      </section>
      <section className="frame_section">
        <div className="container">

          <div className="col-md-9 margin_auto">
            <div className="col-md-8 offset-4 title"><h3>Energising your Care Ecosystem</h3></div>

            <div className="row frame_row_1">
              <div className="col-md-4 img_box">
                <img alt="" src={`${process.env.PUBLIC_URL}/images/CareTeamApp.svg`} />
              </div>
              <div className="col-md-8 content_box">
                <p>Equip you Care Team members with access to your Clients’ care plans and information on-the-go, and record and manage effectively all their tasks with our <b>CareTeam App</b> available for both iOS and Android. </p>
              </div>
            </div>


            <div className="row frame_row_2">
              <div className="col-md-8 content_box">
                <p>Enable the friends and family of your Clients to feel connected to and updated about your Clients’ ongoing care. Showcase the quality of your care service with our <b>Friends&Family App</b> for iOS and Android and attract more Clients. </p>
              </div>
              <div className="col-md-4 img_box">
                <img alt="" src={`${process.env.PUBLIC_URL}/images/Friends&FamilyApp.svg`} />
              </div>
            </div>
            <div className="col-md-12 text-center">
              {/* <NavLink to="/plans" className="btn get_btn">Get Started</NavLink>  */}
              <NavLink className="btn get_btn" to="/plans">Get Started</NavLink>
            </div>
          </div>
        </div>
      </section>
      <section className="supporting_section get_stared_section">
        <div className="container">

          <div className="row align-items-center">
            <div className="col-md-7 content_body">
              <p className="mb-4">We relate to the pressure care service providers find themselves in these days and empathize with your situation. We are on this mission together to provider better care. That is why we decided to support you by making our Base Plan <b>completely free.</b> </p>

              <p>Now you can start using our platform and experience its great features. Just when you thought it couldn’t get better, we also give you <b>unlimited clients and care team members</b> that you can create in your account for a single site. </p>
              <NavLink to="#" className="btn get_stared_btn">Get Started</NavLink>
            </div>
            <div className="col-md-5 img_box">
              <img alt="" src={`${process.env.PUBLIC_URL}/images/dm.svg`} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Features;