import React, {useState, useEffect} from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { fetch2 } from "../../Apis/commonApis";


function BlogModals(props) {
    const { popData, getLatestBlogData } = props;
    const [addBlogData, setAddBlogData] = useState({
        blogTitle: "",
        blogDescription: "",
        publishDate: "",
        image: "",
    });
    const [editBlogData, setEditBlogData] = useState({
        blogTitle: "",
        blogDescription: "",
        image: ""
    });

    useEffect(() => {
        setEditBlogData({
            ...editBlogData,
            blogDescription: popData.blogDescription ? popData.blogDescription : '',
            image: popData.image ? popData.image : '',
            blogTitle: popData.blogTitle ? popData.blogTitle : ''
        })
    },[popData])

    const [active, setactive] = useState(false);

    function handlevalidation() {
        if (addBlogData.blogTitle == "") {
            alert("Please enter Blog Title");
        } else if (addBlogData.blogDescription == "") {
            alert("Please enter blog description");
        } else if (addBlogData.publishDate == "") {
            alert("Plaese enter publishDate");
        } else if (addBlogData.image == "") {
            alert("Please submit image");
        }else{
            createBlog();
        }
    }

    const updateBlogHandler = async() => {
        const result = await fetch2(`${process.env.REACT_APP_SUPERADMIN_BASEURL}/editBlog/${popData._id}`, editBlogData);
        if(result.status) getLatestBlogData();
    }

    const createBlog = async() => {
        const result = await fetch2(`${process.env.REACT_APP_SUPERADMIN_BASEURL}/createBlog`, addBlogData);
        if(result.status) getLatestBlogData();
    }

    return (
        <>
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
                                                src={editBlogData?.image}
                                                className="fit_img"
                                                width="100px"
                                                height="100px"
                                            />
                                            <input
                                                type="file"
                                                onChange={(e) => setEditBlogData({...editBlogData, image: e.target.files[0]})}
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
                                            value={editBlogData?.blogTitle}
                                            onChange={(e) => setEditBlogData({...editBlogData, blogTitle: e.target.value})}
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
                                            value={editBlogData?.blogDescription}
                                            onChange={(e) => setEditBlogData({...editBlogData, blogDescription: e.target.value})}
                                            style={{ minHeight: "100px" }}
                                        ></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary submit_btn"
                                data-bs-dismiss="modal"
                                onClick={updateBlogHandler}
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
                                            value={addBlogData.blogTitle}
                                            onChange={(e) => setAddBlogData({ ...addBlogData, blogTitle: e.target.value })}
                                            type="text"
                                            required="required"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Image</label>
                                        <input
                                            onChange={(e) => setAddBlogData({ ...addBlogData, image: e.target.files[0] })}
                                            type="file"
                                            accept="image/apng, image/avif, image/jpg, image/jpeg, image/png"
                                            required="required"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Publish Date</label>
                                        <input
                                            value={addBlogData.publishDate}
                                            onChange={(e) => setAddBlogData({ ...addBlogData, publishDate: e.target.value })}
                                            type="Date"
                                            required="required"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Blog Description</label>
                                        <input
                                            required="required"
                                            value={addBlogData.blogDescription}
                                            onChange={(e) => setAddBlogData({ ...addBlogData, blogDescription: e.target.value })}
                                            type="text"
                                            className="form-control"
                                            style={{ minHeight: "100px" }}
                                        />
                                        {/* <textarea className="form-control" style={{ minHeight: "100px" }} ></textarea> */}
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-primary submit_btn"
                                            data-bs-dismiss="modal"
                                            onClick={handlevalidation}
                                        >
                                            Add Blog
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogModals;
