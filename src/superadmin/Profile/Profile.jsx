import React from "react";
import '../Profile/Profile.css';


function Profile() {
	return (
		<div className="page-wrapper">
			<div className="container-fluid min_height">
				<div className="card">
					<div className="card-body">

						<div className="top_menubar">
							<ul className="nav nav-tabs ract_tab_list border-0" id="myTab" role="tablist">
								<li className="nav-item" role="presentation">
									<button className="nav-link active" id="tabD-1" data-bs-toggle="tab" data-bs-target="#tab_1" type="button" role="tab" aria-controls="tab_1" aria-selected="true">Profile</button>
								</li>
								<li className="nav-item" role="presentation">
									<button className="nav-link" id="tabD-2" data-bs-toggle="tab" data-bs-target="#tab_2" type="button" role="tab" aria-controls="tab_2" aria-selected="false">Change Password</button>
								</li>
							</ul>
						</div>

						<div className="tab-content ract_tab_data" id="myTabContent">
							<div className="tab-pane fade show active" id="tab_1" role="tabpanel" aria-labelledby="tabD-1">

								<div className="row">
									<div className="col-md-6">
										<div className="mb-3">
											<div className="profile_img">
												<input type="file" />
												<img
													src={`${process.env.PUBLIC_URL}/images/profle.jpg`} alt="user" />
											</div>
										</div>
										<div className="mb-3">
											<label className="form-label">Name</label>
											<input type="text" className="form-control" value="Mark" />
										</div>
										<div className="mb-3">
											<label className="form-label">Email</label>
											<input type="email" className="form-control" value="mark@gmail.com" />
										</div>
										<div className="mb-3">
											<label className="form-label">Phone Number</label>
											<input type="text" className="form-control" value="+1 9871 98761" />
										</div>
										<div className="mb-3">
											<button className="btn submit_btn">Update Profile</button>
										</div>
									</div>
								</div>
							</div>


							<div className="tab-pane fade" id="tab_2" role="tabpanel" aria-labelledby="tabD-2">
								<div className="row">
									<div className="col-md-6 margin-auto">
										<div className="mb-3">
											<label className="form-label">Old Password</label>
											<input type="password" className="form-control" value="" />
										</div>
										<div className="mb-3">
											<label className="form-label">New Password</label>
											<input type="password" className="form-control" value="" />
										</div>
										<div className="mb-3">
											<label className="form-label">Confirm Password</label>
											<input type="password" className="form-control" value="" />
										</div>
										<div className="mb-3">
											<button className="btn submit_btn">Change Password</button>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;	