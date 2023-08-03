import React, { useState, useEffect } from "react";

function PopupContactList(props) {
  const [data, setData] = useState([]);
  const apiData = props?.data[0];
  setData(apiData);
  console.log(apiData);
  useEffect(() => {
    props.data.map((value) => {
      console.log(value.firstName);
    });
  }, []);
  // setData(props.data)
  return (
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header d-flex align-items-center">
          <h4 className="modal-title" id="exampleModalLabel1">
            Contact Details
          </h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div className="modal-body">
          <form>
            <div className="mb-3 col-md-12">
              <div className="mb-3 col-md-6">
                {/* <div className="upload_img">
										<img alt="" src={`${process.env.PUBLIC_URL}/images/blog.jpg`} className="fit_img" width="100px" height="100px" />
									</div> */}
              </div>
            </div>
            <div className="blog_popup_details">
              <strong>first Name</strong>
              <p>{apiData.firstName}</p>
              <strong>last Name</strong>
              <p>
                {/* {data} */}
                {/* {localStorage.getItem('lastName')} */}
              </p>
              <strong>email</strong>
              <p>{localStorage.getItem("email")}</p>
              <strong>mobileNo</strong>
              <p>{localStorage.getItem("mobileNo")}</p>
              <strong>companyName</strong>
              <p>{localStorage.getItem("companyName")}</p>
              <strong>department</strong>
              <p>{localStorage.getItem("department")}</p>
              <strong>refrence</strong>
              <p>{localStorage.getItem("refrence")}</p>
              <strong>subject</strong>
              <p>{localStorage.getItem("subject")}</p>
              <strong>message</strong>
              <p>{localStorage.getItem("message")}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupContactList;
