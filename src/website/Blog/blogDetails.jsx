// import React from "react";
// import { NavLink } from "react-router-dom";
// import '../Blog/blog.css';



// function BlogDetails() {
//   return (
//   <>
//     <section className="pagespace_section">
//        <div className="container">
//          <div className="title">
//            <h3>Blogs Details</h3>
//          </div>
//         </div> 
//     </section>
//     <section className="blogmain_section">
//         <img alt="" src={`${process.env.PUBLIC_URL}/images/b1.svg`}/>
//         <div className="blogmain_body">
//           <div className="container">
//           </div>
//         </div>
//     </section>

//     <section className="blog_section pt-0">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12">
//             <div className="blog_box">
//               <div className="blog_box_body">
//                 <h2>Heading </h2>
//                 <time>25th Jan 2021 </time>
//                 <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//     </>
//   );
// }
// export default BlogDetails;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
// import { NavLink } from "react-router-dom";
import '../Blog/blog.css';
const BlogDetails = () => {


  let param = useParams();
  console.log(param._id)

  useEffect(() => {
    getblogdata();
  }, []);

  const [rowData, setrowData] = useState([]);
  function getblogdata() {
    var config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASEURL}/getblogbyId/${param._id}`,
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    };

    axios(config)
      .then(function (response) {
        console.log("" + JSON.stringify(response.data.Blogdata));
        if (response)
          setrowData(response.data.Blogdata)
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
            <h3>Blogs Details</h3>
          </div>
        </div>
      </section>
      <section className="blogmain_section">
        <img alt="" src={`${process.env.PUBLIC_URL}/images/b1.svg`} />
        <div className="blogmain_body">
          <div className="container">
          </div>
        </div>
      </section>

      <section className="blog_section pt-0">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="blog_box">
                <div className="blog_box_body">
                  <h2>{rowData.blogTitle} </h2>
                  <time>{rowData.publishDate} </time>
                  <p>{rowData.blogDescription}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
export default BlogDetails;