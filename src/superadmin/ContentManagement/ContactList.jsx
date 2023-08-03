import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { NavLink, useParams } from "react-router-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import axios from "axios";
import { BsFillEyeFill } from "react-icons/bs";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import ContactListTable from "./ContactListTable";
import { fetchGet } from "../../Apis/commonApis";

export function ContactList() {

  const [rowData, setrowData] = useState([]);
  const [popData, setPopData] = useState({});

  useEffect(() => {
    getContactList();
  }, []);

  const getContactList = async () => {
    const result = await fetchGet("getContactusData");
    setrowData(result.contactusData);
  };

  function onViewContact(data){
    setPopData(data);
  }

  return (
    <>
      <ContactListTable rows={rowData} contactDetailHandler={onViewContact}/>
      <ContactModal popData={popData}/>
    </>
  )
}

function ContactModal(props) {
  const {popData} = props;

  return (
    <>
      <div
        className="modal fade"
        id="contactlist_details_modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
      >
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

                  <p>
                    {popData?.firstName}
                  </p>
                  <strong>last Name</strong>
                  <p>
                    {/* {data} */}
                    {popData?.lastName}
                  </p>
                  <strong>email</strong>
                  <p>{popData?.email}</p>
                  <strong>mobileNo</strong>
                  <p>{popData?.mobileNo}</p>
                  <strong>companyName</strong>
                  <p>{popData?.companyName}</p>
                  <strong>department</strong>
                  <p>{popData?.department}</p>
                  <strong>refrence</strong>
                  <p>{popData?.refrence}</p>
                  <strong>subject</strong>
                  <p>{popData?.subject}</p>
                  <strong>message</strong>
                  <p>{popData?.message}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



function Contacts() {
  const [rowData, setrowData] = useState([]);
  const [popData, setPop] = useState({});
  useEffect(() => {
    getContactList();
  }, []);

  function getContactList() {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getContactusData`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
      },
    };

    axios(config)
      .then(function (response) {
        setrowData(response.data.contactusData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const ChildMessageRenderer = (props) => {
    const invokeParentMethod = () => {
      setPop(props.data);
    };

    return (
      <span>
        {" "}
        <NavLink
          to={`/superadmin/content-management/${props.data._id}`}
          className="ms-4 view_icon"
          data-bs-toggle="modal"
          data-bs-target="#contactlist_details_modal"
          data-bs-whatever="@mdo"
        >
          <BsFillEyeFill onClick={() => invokeParentMethod()} />
        </NavLink>
      </span>
    );
  };

  const pagination = true;
  const paginationPageSize = 10;
  const rowHeight = 55;

  return (
    <>
      {/* <div className="col-md-12 float-end btns_head text-end mb-3">
		<button className="btn btn-theme btn-sm"  data-bs-toggle="modal" data-bs-target="#addnewblog_modal" data-bs-whatever="@mdo" to="#">Add New Blog</button>
	</div> */}
      <div className="ag-theme-alpine cts_datatable" style={{ height: 667 }}>
        <AgGridReact
          rowHeight={rowHeight}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          rowData={rowData}
          components={{}}
          frameworkComponents={{
            childMessageRenderer: ChildMessageRenderer,
          }}
        >
          {/* <AgGridColumn
            width={80}
            field="SrNo"
            sortable={false}
            filter={false}
          ></AgGridColumn> */}
          <AgGridColumn
            width={200}
            field="firstName"
            sortable={false}
            filter={false}
          ></AgGridColumn>
          <AgGridColumn
            width={240}
            field="lastName"
            sortable={false}
            filter={false}
          ></AgGridColumn>
          <AgGridColumn
            width={300}
            field="email"
            sortable={false}
            filter={false}
          ></AgGridColumn>
          <AgGridColumn
            width={200}
            field="mobileNo"
            sortable={false}
            filter={false}
          ></AgGridColumn>
          <AgGridColumn
            width={200}
            field="companyName"
            sortable={false}
            filter={false}
          ></AgGridColumn>
          <AgGridColumn
            width={200}
            field="department"
            sortable={false}
            filter={false}
          ></AgGridColumn>
          <AgGridColumn
            width={200}
            field="refrence"
            sortable={false}
            filter={false}
          ></AgGridColumn>
          <AgGridColumn
            width={200}
            field="subject"
            sortable={false}
            filter={false}
          ></AgGridColumn>
          <AgGridColumn
            width={200}
            field="message"
            sortable={false}
            filter={false}
          ></AgGridColumn>
          <AgGridColumn
            field="Status"
            cellRenderer="childMessageRenderer"
            colId="params"
            sortable={false}
            filter={false}
          ></AgGridColumn>
        </AgGridReact>
      </div>

      <div
        className="modal fade"
        id="contactlist_details_modal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel1"
      >
        {/* <PopupContactList data={rowData} /> */}
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

                  <p>
                    {/* {apiData.firstName} */}
                    {popData?.firstName}
                  </p>
                  <strong>last Name</strong>
                  <p>
                    {/* {data} */}
                    {popData?.lastName}
                  </p>
                  <strong>email</strong>
                  <p>{popData?.email}</p>
                  <strong>mobileNo</strong>
                  <p>{popData?.mobileNo}</p>
                  <strong>companyName</strong>
                  <p>{popData?.companyName}</p>
                  <strong>department</strong>
                  <p>{popData?.department}</p>
                  <strong>refrence</strong>
                  <p>{popData?.refrence}</p>
                  <strong>subject</strong>
                  <p>{popData?.subject}</p>
                  <strong>message</strong>
                  <p>{popData?.message}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="modal fade" id="editblog_details_modal" tabIndex="-1" aria-labelledby="exampleModalLabel2">
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header d-flex align-items-center">
						<h4 className="modal-title" id="exampleModalLabel2">Edit Blog</h4>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>

					<div className="modal-body">
						<form>
							<div className="mb-3 col-md-12">
								<div className="mb-3 col-md-6">
									<div className="upload_img mb-3">
										<img alt="" src={`${process.env.PUBLIC_URL}/images/blog.jpg`} className="fit_img" width="100px" height="100px" />
										<input type="file" className="mt-2" />
									</div>
								</div>
							</div>
							<div className="blog_popup_details">
								<div className="mb-3">
									<label className="form-label">Blog Title</label>
									<input type="text" className="form-control" value="What is Lorem Ipsum?" />
								</div>
								<div className="mb-3">
									<label className="form-label">Publish Date</label>
									<input type="datetime-local" className="form-control" />
								</div>
								<div className="mb-3">
									<label className="form-label">Blog Description</label>
									<textarea className="form-control" style={{ minHeight: "100px" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</textarea>
								</div></div>
						</form>
					</div>

					<div className="modal-footer">
						<button type="button" className="btn submit_btn" data-bs-dismiss="modal">Update Blog</button>
					</div>
				</div>
			</div>
		</div> */}

      {/* <div className="modal fade" id="addnewblog_modal" tabIndex="-1" aria-labelledby="exampleModalLabel3">
			<div className="modal-dialog modal-lg">
				<div className="modal-content">
					<div className="modal-header d-flex align-items-center">
						<h4 className="modal-title" id="exampleModalLabel3">Add New Blog</h4>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>

					<div className="modal-body">
						<form>
							<div className="mb-3 col-md-12">
								<div className="mb-3 col-md-6">
									<div className="upload_img mb-3">

										<label className="form-label">Blog Title</label><br />
										<input type="file" className="mt-2" />
									</div>
								</div>
							</div>
							<div className="blog_popup_details">
								<div className="mb-3">
									<label className="form-label">Blog Title</label>
									<input type="text" className="form-control" value="" />
								</div>
								<div className="mb-3">
									<label className="form-label">Publish Date</label>
									<input type="datetime-local" className="form-control" />
								</div>
								<div className="mb-3">
									<label className="form-label">Blog Description</label>
									<textarea className="form-control" style={{ minHeight: "100px" }}></textarea>
								</div></div>
						</form>
					</div>

					<div className="modal-footer">
						<button type="button" className="btn submit_btn" data-bs-dismiss="modal">Add Blog</button>
					</div>
				</div>
			</div>
		</div> */}
    </>
  );
}
export default ContactList;
