// import React from "react";
// import "./messaging.css";
// import { FiSearch } from "react-icons/fi";
// import { MdSend } from "react-icons/md";
// // import db from "../Firebase";
// // import firebase from "../Firebase";
// function Messaging() {
//   //   console.log(db, "firebase database");
//   // const ref = firebase.database().ref('users/');
//   return (
//     <div className="page-wrapper">
//       <div className="container-fluid min_height">
//         <div className="card">
//           <div className="card-body">
//             <h4 className="card-title">
//               Clients
//               <div className="float-end btns_head">
//                 {/* <button className="btn btn-theme btn-sm">Create Groups</button>
// 							<button className="btn btn-theme btn-sm">Add New Resident</button> */}
//               </div>
//             </h4>
//             <div>
//               <section className="chat_box_section">
//                 <div className="container-fluid">
//                   <div className="row">
//                     <div className="col-md-3 chat_users_box">
//                       <div className="input-group user_search_box">
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="search_user"
//                           placeholder="Search"
//                         />
//                         <div className="input-group-append">
//                           <span className="input-group-text">
//                             <FiSearch />
//                           </span>
//                         </div>
//                       </div>
//                       <div className="chatuser_list">
//                         <div className="user_box online active">
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                           <div className="user_box_body">
//                             <h4>User Name</h4>
//                             <small>
//                               <i className="fas fa-circle"></i> Online
//                             </small>
//                           </div>
//                         </div>
//                         <div className="user_box away">
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                           <div className="user_box_body">
//                             <h4>
//                               User Name{" "}
//                               <span className="float-right badge badge-secondary">
//                                 5
//                               </span>
//                             </h4>
//                             <small>
//                               <i className="fas fa-circle"></i> Away
//                             </small>
//                           </div>
//                         </div>
//                         <div className="user_box away">
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                           <div className="user_box_body">
//                             <h4>
//                               User Name
//                               <span className="float-right badge badge-secondary">
//                                 2
//                               </span>
//                             </h4>
//                             <small>
//                               <i className="fas fa-circle"></i> Away
//                             </small>
//                           </div>
//                         </div>
//                         <div className="user_box away">
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                           <div className="user_box_body">
//                             <h4>
//                               User Name
//                               <span className="float-right badge badge-secondary">
//                                 1
//                               </span>
//                             </h4>
//                             <small>
//                               <i className="fas fa-circle"></i> Away
//                             </small>
//                           </div>
//                         </div>
//                         <div className="user_box away">
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                           <div className="user_box_body">
//                             <h4>
//                               User Name
//                               <span className="float-right badge badge-secondary">
//                                 8
//                               </span>
//                             </h4>
//                             <small>
//                               <i className="fas fa-circle"></i> Away
//                             </small>
//                           </div>
//                         </div>
//                         <div className="user_box away">
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                           <div className="user_box_body">
//                             <h4>Users Name</h4>
//                             <small>
//                               <i className="fas fa-circle"></i> Away
//                             </small>
//                           </div>
//                         </div>
//                         <div className="user_box away">
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                           <div className="user_box_body">
//                             <h4>User Name</h4>
//                             <small>
//                               <i className="fas fa-circle"></i> Away
//                             </small>
//                           </div>
//                         </div>
//                         <div className="user_box away">
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                           <div className="user_box_body">
//                             <h4>User Name</h4>
//                             <small>
//                               <i className="fas fa-circle"></i> Away
//                             </small>
//                           </div>
//                         </div>
//                         <div className="user_box away">
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                           <div className="user_box_body">
//                             <h4>User Name</h4>
//                             <small>
//                               <i className="fas fa-circle"></i> Away
//                             </small>
//                           </div>
//                         </div>
//                         <div className="user_box away">
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                           <div className="user_box_body">
//                             <h4>User Name</h4>
//                             <small>
//                               <i className="fas fa-circle"></i> Away
//                             </small>
//                           </div>
//                         </div>
//                         <div className="user_box away">
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                           <div className="user_box_body">
//                             <h4>User Name</h4>
//                             <small>
//                               <i className="fas fa-circle"></i> Away
//                             </small>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-9 chat_front_user_box d-none">
//                       <div className="chat_front_user_main">
//                         <div className="chat_front_user_body">
//                           <h1 className="text-center mb-4">
//                             Welcome, User Name
//                           </h1>
//                           <div className="userprofile_box">
//                             <img
//                               alt=""
//                               src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                             />
//                             <small>
//                               <i className="fas fa-circle"></i>
//                             </small>
//                           </div>
//                         </div>
//                         <div className="chat_front_user_footer text-center">
//                           <p>You are signed in as testuser@gmail.com</p>
//                           <p>
//                             Try{" "}
//                             <a href="javascript:void(0);">switching accounts</a>{" "}
//                             if you do not see your contacts or conversation
//                             history. <br />
//                             <a
//                               href="javascript:void(0);"
//                               className="learn_more"
//                             >
//                               Learn More
//                             </a>
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-9 chat_content_box">
//                       <div className="mobile_back d-none">
//                         <button className="btn chatback_btn">
//                           <i className="fas fa-long-arrow-alt-left"></i>
//                         </button>
//                       </div>
//                       <div className="user_box online">
//                         <img
//                           alt=""
//                           src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                         />
//                         <div className="user_box_body">
//                           <h4>User Name</h4>
//                           <small>
//                             <i className="fas fa-circle"></i> Online
//                           </small>
//                         </div>
//                       </div>
//                       <div className="userchat_body">
//                         <div className="chat_message chat_left">
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                           <p>
//                             Lorem Ipsum is simply dummy text of the printing and
//                             typesetting industry.
//                             <time>8:40 am</time>
//                           </p>
//                         </div>
//                         <div className="chat_message chat_right">
//                           <p>
//                             Lorem Ipsum is simply dummy text of the printing
//                             <time>8:40 am</time>
//                           </p>
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                         </div>
//                         <div className="chat_message chat_left">
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                           <p>
//                             Lorem Ipsum is simply dummy text of the printing and
//                             typesetting industry.
//                             <time>8:40 am</time>
//                           </p>
//                         </div>
//                         <div className="chat_message chat_right">
//                           <p>
//                             Lorem Ipsum is simply dummy text of the printing
//                             <time>8:40 am</time>
//                           </p>
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                         </div>

//                         <div className="chat_old_messsage_date">
//                           <span>24 May 2019</span>
//                         </div>

//                         <div className="chat_message chat_left">
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                           <p>
//                             Lorem Ipsum is simply dummy text of the printing and
//                             typesetting industry.
//                             <time>8:40 am</time>
//                           </p>
//                         </div>
//                         <div className="chat_message chat_right">
//                           <p>
//                             Lorem Ipsum is simply dummy text of the printing
//                             <time>8:40 am</time>
//                           </p>
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                         </div>

//                         <div className="chat_old_messsage_date">
//                           <span>Tuesday</span>
//                         </div>

//                         <div className="chat_message chat_left">
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                           <p>
//                             Lorem Ipsum is simply dummy text of the printing and
//                             typesetting industry.
//                             <time>8:40 am</time>
//                           </p>
//                         </div>
//                         <div className="chat_message chat_right">
//                           <p>
//                             Lorem Ipsum is simply dummy text of the printing
//                             <time>8:40 am</time>
//                           </p>
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                         </div>

//                         <div className="chat_old_messsage_date">
//                           <span>Today</span>
//                         </div>

//                         <div className="chat_message chat_left">
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                           <p>
//                             Lorem Ipsum is simply dummy text of the printing and
//                             typesetting industry.
//                             <time>8:40 am</time>
//                           </p>
//                         </div>
//                         <div className="chat_message chat_right">
//                           <p>
//                             Lorem Ipsum is simply dummy text of the printing
//                             <time>8:40 am</time>
//                           </p>
//                           <img
//                             alt=""
//                             src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`}
//                           />
//                         </div>
//                       </div>
//                       <div className="chatfooter_submit">
//                         <div className="input-group user_submit_chat">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Type a message"
//                             value=""
//                           />
//                           <div className="input-group-append">
//                             <MdSend />
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </section>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Messaging;
