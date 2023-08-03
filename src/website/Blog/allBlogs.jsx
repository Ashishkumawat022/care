import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import '../Blog/blog.css';
import axios from "axios";



function AllBlogs() {
  const [rowData, setrowData] = useState([]);


  //  const [image, setimage] = useState("");
  // const [blogTitle, setblogTitle] = useState("");
  // const [blogDescription, setblogDescription] = useState("");
  // const [publishDate, setpublishDate] = useState("");
  // console.log(image)
  useEffect(() => {
    getblogdata();
  }, []);
  function getblogdata() {
    var config = {
      method: 'get',
      url: `${process.env.REACT_APP_BASEURL}/websiteBlog?type=active`,
      headers: {
        'Authorization': localStorage.getItem('token')
      }
    };

    axios(config)
      .then(function (response) {
        console.log("" + JSON.stringify(response.data.Blogdata));
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
            <h3>Blogs</h3>
          </div>
        </div>
      </section>
      <section className="blogmain_section">
        <img alt="" src={`${process.env.PUBLIC_URL}/images/b1.svg`} />
        <div className="blogmain_body">
          <div className="container">
            <h3>Heading</h3>
            <p>Few lines summary </p>
            <NavLink to="/" className="btn">Read</NavLink>
          </div>
        </div>
      </section>

      <section className="blog_section">
        <div className="container">
          <div className="row">
            <div className="col-md-12 year_filter">
              <select>
                <option>2022</option>
              </select>
            </div>

            {rowData.map(function (data, index) {

              return (
                <>
                  <div className="col-md-4">
                    <div className="blog_box">
                      <div className="blog_box_img">
                        <img alt="" src={`${process.env.PUBLIC_URL}/images/b2.svg`} />
                      </div>
                      <div className="blog_box_body">
                        <h2 className="blog-title">{data.blogTitle}</h2>
                        <time>{data.publishDate}</time>
                        <p className="blog-para">{data.blogDescription}</p>
                        <NavLink to={`/blog-details/${data._id}`} className="btn">Read</NavLink>
                      </div>
                    </div>
                  </div>
                </>
              )
            }

            )}
            {/* <div className="blog_box_body">
                <h2>{rowData.map(rowData=>(rowData.blogTitle))}
                {console.log({ blogTitle})}</h2>
                <time>25th Jan 2021 </time>
                <p>Few lines summary </p>
                <NavLink to="/blog-details" className="btn">Read</NavLink>
              </div> */}

            {/* <div className="col-md-4">
            <div className="blog_box">
              <div className="blog_box_img">
                 <img alt="" src={`${process.env.PUBLIC_URL}/images/b3.svg`}/>
              </div>
              <div className="blog_box_body">
                <h2>Heading </h2>
                <time>25th Jan 2021 </time>
                <p>Few lines summary </p>
                <NavLink to="/blog-details" className="btn">Read</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="blog_box">
              <div className="blog_box_img">
                 <img alt="" src={`${process.env.PUBLIC_URL}/images/b3.svg`}/>
              </div>
              <div className="blog_box_body">
                <h2>Heading </h2>
                <time>25th Jan 2021 </time>
                <p>Few lines summary </p>
                <NavLink to="/blog-details" className="btn">Read</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="blog_box">
              <div className="blog_box_img">
                 <img alt="" src={`${process.env.PUBLIC_URL}/images/b2.svg`}/>
              </div>
              <div className="blog_box_body">
                <h2>Heading </h2>
                <time>25th Jan 2021 </time>
                <p>Few lines summary </p>
                <NavLink to="/blog-details" className="btn">Read</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="blog_box">
              <div className="blog_box_img">
                 <img alt="" src={`${process.env.PUBLIC_URL}/images/b3.svg`}/>
              </div>
              <div className="blog_box_body">
                <h2>Heading </h2>
                <time>25th Jan 2021 </time>
                <p>Few lines summary </p>
                <NavLink to="/blog-details" className="btn">Read</NavLink>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="blog_box">
              <div className="blog_box_img">
                 <img alt="" src={`${process.env.PUBLIC_URL}/images/b3.svg`}/>
              </div>
              <div className="blog_box_body">
                <h2>Heading </h2>
                <time>25th Jan 2021 </time>
                <p>Few lines summary </p>
                <NavLink to="/blog-details" className="btn">Read</NavLink>
              </div>
            </div>
          </div> */}
            {/* <div className="col-md-12 text-center">
              <NavLink to="/allBlogs" className="btn readmore" >Load More</NavLink>
               
            </div> */}

          </div>
        </div>
      </section>
    </>
  );
}
export default AllBlogs;