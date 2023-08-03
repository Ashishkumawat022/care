// import React,{useState} from "react";
// import '../Contact/contact.css';
// import axios from "axios"

// function Contact() {
//   const [rowData, setrowData] = useState([]);
// 	const [firstName, setfirstName] = useState("");
// 	const [lastName, setlastName] = useState("");
// 	const [email, setemail] = useState("");
// 	const [mobileNo, setmobileNo] = useState("");
//   const [companyName, setcompanyName] = useState("");
//   // const [department, setdepartment] = useState("");
//   // const [refrence, setrefrence] = useState("");
//   const [subject, setsubject] = useState("");
//   const [message, setmessage] = useState("");
// 	// console.log(image)
//   function ContactUs(){
//     var data = JSON.stringify({
//       "firstName": firstName,
//       "lastName": lastName,
//       "email": email,
//       "mobileNo":mobileNo,
//       "companyName": companyName,
//       "department": "department",
//       "refrence": "refrence",
//       "subject": subject,
//       "message": message
//     });

//     var config = {
//       method: 'post',
//       url: 'http://3.91.203.43:8700/admin/createContactus',
//       headers: {
//         'Authorization': localStorage.getItem('token'),
//         'Content-Type': 'application/json'
//       },
//       data : data
//     };
//     console.log(data)
//     axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//       window.location.reload(false);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });

//   }
//   return (
//   <>
//      <section className="pagespace_section">
//        <div className="container">
//          <div className="title">
//            <h3>Contact Us</h3>
//          </div>
//         </div>
//     </section>

//     <section className="map_section">
//       <div className="container">
//          <div className="col-md-7 margin_auto">
//          {/* <iframe className="map" title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.3825634848!2d75.65047013538644!3d26.88544791745257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1640086471422!5m2!1sen!2sin" allowfullscreen="" loading="lazy"></iframe> */}

//            <div className="row">
//              <div className="col-md-6 add_box">
//                <h5>United Kingdom</h5>
//                <p>Wearfield, Enterprise Park East,
// Sunderland, Tyne and Wear,
// SR5 2TA.United Kingdom.
// </p>
//              </div>
//              <div className="col-md-6 add_box">
//                <h5>Canada</h5>
//                <p>5 Marine Parade Drive,
// Toronto, Ontario,
// M8V 4B4, Canada</p>
//              </div>
//            </div>

//          </div>
//       </div>
//     </section>

//     <section className="contact_section">
//       <div className="container">
//         <div className="contact_box col-md-10 margin_auto">
//             <div className="title">
//               <h3>Contact Us</h3>
//               {/* <p>info@aurigamagnuscare.com </p> */}
//             </div>
//             <hr />

//             <div className="row">
//                 <div className="col-md-6 form-group">
//                 <label className="form-label">First Name <span className="text-danger">*</span></label>
//                   <input value={firstName} onChange={(e) => setfirstName(e.target.value)} type="text" className="form-control" />
//                 </div>
//                 <div className="col-md-6 form-group">
//                 <label className="form-label">Last Name  <span className="text-danger">*</span></label>
//                   <input value={lastName} onChange={(e) => setlastName(e.target.value)} type="text" className="form-control" />
//                 </div>
//                 <div className="col-md-6 form-group">
//                 <label className="form-label">Email <span className="text-danger">*</span></label>
//                   <input value={email} onChange={(e) => setemail(e.target.value)} type="text" className="form-control" />
//                 </div>
//                 <div className="col-md-6 form-group">
//                 <label className="form-label">Phone <span className="text-danger">*</span></label>
//                   <input value={mobileNo} onChange={(e) => setmobileNo(e.target.value)} type="number" className="form-control" />
//                 </div>
//                 <div className="col-md-6 form-group">
//                 <label className="form-label">Company Name <span className="text-danger">*</span></label>
//                   <input value={companyName} onChange={(e) => setcompanyName(e.target.value)} type="text" className="form-control" />
//                 </div>
//                 {/* <div className="col-md-6 form-group">
//                   <label className="form-label">Please Select Department<span className="text-danger"></span></label>
//                   <select className="form-control form-select">
//                     <option>Mangager</option>
//                   </select>
//                 </div>
//                 <div className="col-md-6 form-group">
//                   <label className="form-label">How did you hear about us. Select from options <span className="text-danger">*</span></label>
//                   <input type="text" className="form-control" placeholder="How did you hear about us. Select from options" />
//                 </div> */}
//                 <div className="col-md-6 form-group">
//                 <label className="form-label">Message Subject <span className="text-danger">*</span></label>
//                   <input value={subject} onChange={(e) => setsubject(e.target.value)} type="text" className="form-control" />
//                 </div>
//                 <div className="col-md-12 form-group">
//                 <label className="form-label">Message <span className="text-danger">*</span></label>
//                   <textarea value={message} onChange={(e) => setmessage(e.target.value)} type="text" className="form-control" style={{height:"150px"}} placeholder="Message"></textarea>
//                 </div>
//                 <div className="col-md-12 text-center mt-3">
//                 <button className="btn submit_btn" onClick={ContactUs}>Send Message</button>
//                 </div>
//             </div>
//         </div>
//       </div>
//     </section>
//    </>
//   );
// }
// export default Contact;
import React, { useState } from "react";
import "../Contact/contact.css";
import axios from "axios";

function Contact() {
  // const [rowData, setrowData] = useState([]);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [mobileNo, setmobileNo] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [department, setdepartment] = useState("");
  const [refrence, setrefrence] = useState("");
  const [subject, setsubject] = useState("");
  const [message, setmessage] = useState("");

  function ContactUs() {
    var data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNo: mobileNo,
      companyName: companyName,
      department: department,
      refrence: refrence,
      subject: subject,
      message: message,
    };

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/createContactus`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log(data);

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      <section className="pagespace_section">
        <div className="container">
          <div className="title">
            <h3>Contact Us</h3>
          </div>
        </div>
      </section>

      <section className="map_section">
        <div className="container">
          <div className="col-md-7 margin_auto">
            {/* <iframe className="map" title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227748.3825634848!2d75.65047013538644!3d26.88544791745257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4adf4c57e281%3A0xce1c63a0cf22e09!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1640086471422!5m2!1sen!2sin" allowfullscreen="" loading="lazy"></iframe> */}

            <div className="row">
              <div className="col-md-6 add_box">
                <h5>United Kingdom</h5>
                <p>
                  Wearfield, Enterprise Park East, Sunderland, Tyne and Wear,
                  SR5 2TA.United Kingdom.
                </p>
              </div>
              <div className="col-md-6 add_box">
                <h5>Canada</h5>
                <p>5 Marine Parade Drive, Toronto, Ontario, M8V 4B4, Canada</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact_section">
        <div className="container">
          <div className="contact_box col-md-10 margin_auto">
            <div className="title">
              <h3>Contact Us</h3>
              {/* <p>info@aurigamagnuscare.com </p> */}
            </div>
            <hr />

            <div className="row">
              <div className="col-md-6 form-group">
                <label className="form-label">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">
                  Phone <span className="text-danger">*</span>
                </label>
                <input
                  value={mobileNo}
                  onChange={(e) => setmobileNo(e.target.value)}
                  type="number"
                  className="form-control"
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">
                  Company Name <span className="text-danger">*</span>
                </label>
                <input
                  value={companyName}
                  onChange={(e) => setcompanyName(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">
                  Please Select Department<span className="text-danger">*</span>
                </label>
                {/* <input value={department} onChange={(e) => setdepartment(e.target.value)} className="form-control" /> */}
                <select
                  className="form-control form-select"
                  onChange={(e) => setdepartment(e.target.value)}
                >
                  {/* <input value={department} onChange={(e) => setdepartment(e.target.value)} type="option" className="form-control" /> */}
                  <option></option>
                  <option>Sales</option>
                  <option>Customer Support</option>
                  <option> Technical Support</option>
                </select>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">
                  How did you hear about us. Select from options{" "}
                  <span className="text-danger">*</span>
                </label>
                {/* <input type="text" className="form-control" placeholder="How did you hear about us. Select from options" /> */}
                {/* <input value={refrence} onChange={(e) => setrefrence(e.target.value)} type="option" className="form-control" /> */}
                <select
                  className="form-control form-select"
                  onChange={(e) => setrefrence(e.target.value)}
                >
                  <option></option>
                  <option>Google</option>
                  <option>Yahoo</option>
                  <option> Referral</option>
                  <option> Social Media</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="col-md-6 form-group">
                <label className="form-label">
                  Message Subject <span className="text-danger">*</span>
                </label>
                <input
                  value={subject}
                  onChange={(e) => setsubject(e.target.value)}
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="col-md-12 form-group">
                <label className="form-label">
                  Message <span className="text-danger">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setmessage(e.target.value)}
                  type="text"
                  className="form-control"
                  style={{ height: "150px" }}
                  placeholder="Message"
                ></textarea>
              </div>
              <div className="col-md-12 text-center mt-3">
                <button className="btn submit_btn" onClick={ContactUs}>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Contact;
