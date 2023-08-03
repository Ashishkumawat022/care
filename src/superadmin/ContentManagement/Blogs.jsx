import React, { useState, useEffect } from 'react';
import BlogListTable from './BlogListTable';
import { fetchGet } from "../../Apis/commonApis";
import BlogModals from './BlogModals';

export default function Blogs() {
    
    const [blogsList, setBlogsList] = useState([]);
    const [popData, setPopData] = useState({});
    const [getLatestBlogCount, setGetLatestBlogCount] = useState(0);
    
    useEffect(() => {
        getBlogs();
        console.log('latest');
    }, [getLatestBlogCount])
    
    function getLatestBlogData(){
        setGetLatestBlogCount(getLatestBlogCount+1)
    }

    const getBlogs = async () => {
        const result = await fetchGet("websiteBlog?type=active");
        setBlogsList(result.Blogdata);
    };

    const viewModalDataHandler = (data) => {
        setPopData(data);
    };

    return (
        <>
            <div className="col-md-12 btns_head text-end mb-3">
                <button
                    className="btn btn-theme btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#addnewblog_modal"
                    data-bs-whatever="@mdo"
                >
                    Add New Blog
                </button>
            </div>
            <BlogListTable rows={blogsList} invokeParentMethod={viewModalDataHandler}/>
            <BlogModals popData={popData} getLatestBlogData={getLatestBlogData} />
        </>
    )
}
