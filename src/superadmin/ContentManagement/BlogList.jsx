import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { NavLink } from "react-router-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import { BsFillEyeFill } from "react-icons/bs";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Switch from "react-switch";

const MoodRenderer = forwardRef((props, ref) => {
  const imageForMood = (mood) => `${process.env.PUBLIC_URL}/images/profile.jpg`;

  const [mood, setMood] = useState(props.value);
  useImperativeHandle(ref, () => {
    return {
      refresh(params) {
        setMood(params.value);
      },
    };
  });

  return (
    <span className="profle_img_box">
      <img alt="" className="profile_img_table" src={mood} />{" "}
    </span>
  );
});

function BlogAdd() {
  const [rowData, setrowData] = useState([]);
  const [image, setimage] = useState("");
  const [blogTitle, setblogTitle] = useState("");
  const [blogDescription, setblogDescription] = useState("");
  const [publishDate, setpublishDate] = useState("");
  const [popData, setPop] = useState({});
  function handlevalidation() {
    if (blogTitle == "") {
      alert("Please enter Blog Title");
    } else if (blogDescription == "") {
      alert("Please enter blog description");
    } else if (publishDate == "") {
      alert("Plaese enter publishDate");
    } else if (image == "") {
      alert("Please submit image");
    } else {
      Add_New_Blogs();
    }
  }
  function Add_New_Blogs() {
    var data = new FormData();
    data.append("blogTitle", blogTitle);
    data.append("publishDate", publishDate);
    data.append("blogDescription", blogDescription);
    data.append("image", image);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/createBlog`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getBlog();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getBlog();
    // getlocal()
  }, []);

  function getBlog() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/websiteBlog?type=active`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
      },
    };

    axios(config)
      .then(function (response) {
        setrowData(response.data.Blogdata);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [editimage, seteditimage] = useState("");
  const [editblogTitle, seteditblogTitle] = useState("");
  const [editblogDescription, seteditblogDescription] = useState("");

  function editblogs() {
    var data = new FormData();
    data.append("blogTitle", editblogTitle);
    data.append("blogDescription", editblogDescription);
    data.append("image", editimage);

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editBlog/${popData._id}`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const [active, setactive] = useState(false);

  function handleChange(props) {
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/changeBlogStatus/${props}`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
      },
    };

    axios(config)
      .then(function (response) {
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const SrNumberRenderer = (props) => {
    return <span>{props.rowIndex + 1}</span>;
  };
  const ChildMessageRenderer = (props) => {
    const invokeParentMethod = () => {
      setPop(props.data);
    };

    return (
      <div>
        <span className="status">
          <Switch
            onChange={() => handleChange(props.data._id)}
            checked={props.data.status === "active" ? true : false}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
        </span>{" "}
        <NavLink
          className="ms-4"
          data-bs-toggle="modal"
          data-bs-target="#editblog_details_modal"
          data-bs-whatever="@mdo"
          onClick={() => invokeParentMethod()}
          to={`/superadmin/content-management/${props.data._id}`}
        >
          <img src={`${process.env.PUBLIC_URL}/images/edit.svg`} alt="user" />
        </NavLink>{" "}
        <NavLink
          className="ms-4 view_icon"
          data-bs-toggle="modal"
          data-bs-target="#blog_details_modal"
          data-bs-whatever="@mdo"
          to="#"
        >
          <BsFillEyeFill onClick={() => invokeParentMethod()} />
        </NavLink>
      </div>
    );
  };
  // const rowData = [
  //     {SrNo: "1", BlogTitle: "What is Lorem Ipsum?",BlogDescription:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.", PublishDate:"5th Febraury 2015", PlanType:"-",Value:"-",Status:"Active"},
  //     {SrNo: "2", BlogTitle: "What is Lorem Ipsum?",BlogDescription:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.", PublishDate:"5th Febraury 2015", PlanType:"-",Value:"-",Status:"Active"},
  //     {SrNo: "3", BlogTitle: "What is Lorem Ipsum?",BlogDescription:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.", PublishDate:"5th Febraury 2015", PlanType:"-",Value:"-",Status:"Active"},
  // ];
  const pagination = true;
  const paginationPageSize = 10;

  const rowHeight = 55;

  return (
    <>
      <div className="col-md-12 float-end btns_head text-end mb-3">
        <button
          className="btn btn-theme btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#addnewblog_modal"
          data-bs-whatever="@mdo"
        >
          Add New Blog
        </button>
      </div>
      <div className="ag-theme-alpine cts_datatable" style={{ height: 667 }}>
        <AgGridReact
          rowHeight={rowHeight}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          rowData={rowData}
          components={{}}
          frameworkComponents={{
            childMessageRenderer: ChildMessageRenderer,
            srNumberRenderer: SrNumberRenderer,
            moodRenderer: MoodRenderer,
          }}
        >
          {/* <AgGridColumn
            width={80}
            field="SrNo"
            cellRenderer="srNumberRenderer"
            sortable={false}
            filter={false}
          ></AgGridColumn> */}
          <AgGridColumn
            width={100}
            field="image"
            cellRenderer="moodRenderer"
            sortable={false}
            filter={false}
          ></AgGridColumn>
          <AgGridColumn
            width={240}
            field="blogTitle"
            sortable={false}
            filter={false}
          ></AgGridColumn>
          <AgGridColumn
            width={240}
            field="blogDescription"
            sortable={false}
            filter={false}
          ></AgGridColumn>
          <AgGridColumn
            width={200}
            field="publishDate"
            sortable={false}
            filter={false}
          ></AgGridColumn>
          <AgGridColumn
            width={230}
            field="status"
            cellRenderer="childMessageRenderer"
            colId="params"
            sortable={false}
            filter={false}
          ></AgGridColumn>
        </AgGridReact>
      </div>

      <div
        className="modal fade"
        id="blog_details_modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center">
              <h4 className="modal-title" id="exampleModalLabel1">
                Blog Details
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
                    <div className="upload_img">
                      <img
                        alt=""
                        src={popData?.image}
                        className="fit_img"
                        width="100px"
                        height="100px"
                      />
                    </div>
                  </div>
                </div>
                <div className="blog_popup_details">
                  <strong>Blog Title</strong>
                  <p>{popData?.blogTitle}</p>
                  <strong>Publish Date</strong>
                  <p>{popData?.publishDate}</p>
                  <strong>Description</strong>
                  <p>{popData?.blogDescription}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="editblog_details_modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center">
              <h4 className="modal-title" id="exampleModalLabel1">
                Edit Blog
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
                    <div className="upload_img mb-3">
                      <img
                        alt=""
                        src={popData?.image}
                        className="fit_img"
                        width="100px"
                        height="100px"
                      />
                      <input
                        type="file"
                        onChange={(e) => seteditimage(e.target.files[0])}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
                <div className="blog_popup_details">
                  <div className="mb-3">
                    <label className="form-label">Blog Title</label>
                    <input
                      type="text"
                      defaultValue={popData?.blogTitle}
                      onChange={(e) => seteditblogTitle(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  {/* <div className="mb-3">
									<label className="form-label">Publish Date</label>
									<input type="datetime-local" className="form-control" />
								</div> */}
                  <div className="mb-3">
                    <label className="form-label">Blog Description</label>
                    <textarea
                      className="form-control"
                      defaultValue={popData?.blogDescription}
                      onChange={(e) => seteditblogDescription(e.target.value)}
                      style={{ minHeight: "100px" }}
                    ></textarea>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                onClick={editblogs}
                className="btn submit_btn"
                data-bs-dismiss="modal"
              >
                Update Blog
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addnewblog_modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center">
              <h4 className="modal-title" id="exampleModalLabel1">
                Add New Blog
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
                    <div className="upload_img mb-3">
                      {/* <label className="form-label">Blog Title</label><br /> */}
                      {/* <input type="file" className="mt-2" /> */}
                    </div>
                  </div>
                </div>
                <div className="blog_popup_details">
                  <div className="mb-3">
                    <label className="form-label">Blog Title</label>
                    <input
                      value={blogTitle}
                      onChange={(e) => setblogTitle(e.target.value)}
                      type="text"
                      required="required"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                      onChange={(e) => setimage(e.target.files[0])}
                      type="file"
                      required="required"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Publish Date</label>
                    <input
                      value={publishDate}
                      onChange={(e) => setpublishDate(e.target.value)}
                      type="Date"
                      required="required"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Blog Description</label>
                    <input
                      required="required"
                      value={blogDescription}
                      onChange={(e) => setblogDescription(e.target.value)}
                      type="text"
                      className="form-control"
                      style={{ minHeight: "100px" }}
                    />
                    {/* <textarea className="form-control" style={{ minHeight: "100px" }} ></textarea> */}
                  </div>
                  <button
                    type="button"
                    onClick={Add_New_Blogs}
                    className="btn submit_btn"
                    data-bs-dismiss="modal"
                  >
                    Add Blog
                  </button>

                  <div></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogAdd;
