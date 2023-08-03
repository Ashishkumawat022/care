import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import '../CareTeam/careteam.css';
import { BsFilterSquare } from "react-icons/bs";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Select from 'react-select'
import { MdKeyboardArrowRight } from 'react-icons/md';
import Header from "../Header/header";
import Sidebar from "../Sidebar/sidebar";
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import CareTeamTable from "./CareTeamTable";

// import Footer from "../Footer/footer";


const MoodRenderer = (props) => {
	return (
		<span className="profle_img_box"><img className="profile_img_table" alt="" src={props.data.image} /> <strong>{`${props.data.first_Name} ${props.data.last_Name}`}</strong></span>
	);
}

const ChildMessageRenderer = props => {
	const invokeParentMethod = () => {
		props.context.methodFromParent(`Row: ${props.node.rowIndex}, Col: ${props.colDef.field}`);
	};

	return <span><button onClick={invokeParentMethod} className="btn btn-sm btn_table btn-success">Active</button><NavLink className="table_arrow" to={`/admin/careteamdetails/${props.data._id}`} ><MdKeyboardArrowRight /></NavLink></span>;
};

const SrNoRenderer = props => {
	return <span><strong>{props.node.rowIndex + 1}</strong></span>;
};

function CareTeam() {
	const [rowData, setRowData] = useState([]);
	const [firstName, setFirstName] = useState("");
	const [lastName, setlastName] = useState("");
	const [qualification, setQualification] = useState("");
	const [DOB, setDOB] = useState("");
	const [location, setlocation] = useState("");
	const [ContactNumber, setContactNumber] = useState("");
	const [email, setEmail] = useState("");
	const [maritalStatus, setMaritalStatus] = useState("");
	const [religion, setReligion] = useState("");
	const [citizenship, setCitizenship] = useState("");
	const [language, setLanguages] = useState("");
	const [wagesPerhour, setwagesPerhour] = useState("");
	const [overtimeRatetrigger, setovertimeRatetrigger] = useState("");
	const [overtimeRate, setovertimeRate] = useState("");
	const [mobileNo, setmobileNo] = useState("");
	const [password, setpassword] = useState("");
	const [image, setimage] = useState('');
	const [lat, setlat] = useState("");
	const [long, setlong] = useState("");

	let _suggestionSelect = function (result, lat, lng, text) {
		setlat(lat);
		setlong(lng);
		setlocation(result);
	}

	const resetForm = () => {
		setlastName('');
		setFirstName('');
		setQualification('')
		setEmail('')
		setContactNumber('')
		setMaritalStatus('')
		setLanguages('')
		setovertimeRatetrigger('')
		setReligion('')
		setpassword('')
		setovertimeRate('')
		setCitizenship('')
		setwagesPerhour('')
		setmobileNo('')
		setDOB('');
		setlocation('')
		setimage('')
		setlat('')
		setlong('')
	}

	function createcareTeam() {
		let formData = new FormData();
		formData.append('DOB', DOB);
		formData.append('mobileNo', mobileNo);
		formData.append('email', email);
		formData.append('marital_Status', maritalStatus);
		formData.append('religion', religion);
		formData.append('citizenship', citizenship);
		formData.append('language', language);
		formData.append('wagesPerhour', wagesPerhour);
		formData.append('overtimeRatetrigger', overtimeRatetrigger);
		formData.append('overtimeRate', overtimeRate);
		formData.append('image', image);
		formData.append('first_Name', firstName);
		formData.append('last_Name', lastName);
		formData.append('qualification', qualification);
		formData.append('location', location);
		formData.append('careHomeId', localStorage.getItem('carehomeId'));
		formData.append('password', password);
		formData.append('lattitude', lat);
		formData.append('longitude', long);
		formData.append('generalAvaliablity', JSON.stringify([{ name: 'monday', value: mondaysFields },
		{ name: 'tuesday', value: tuesdaysFields },
		{ name: 'wednesday', value: wednesdaysFields },
		{ name: 'thrusday', value: thrusdaysFields },
		{ name: 'friday', value: fridaysFields },
		{ name: 'saturday', value: saturdaysFields },
		{ name: 'sunday', value: sundaysFields }]));
		var config = {
			method: 'post',
			url: `${process.env.REACT_APP_BASEURL}/createCareteamMember`,
			headers: {
				'Authorization': localStorage.getItem('care_admin_token'),
				'Content-Type': 'multipart/form-data'
			},
			data: formData
		};

		axios(config)
			.then(function (response) {
				resetForm();
				getCareTeamRowData();
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	useEffect(() => {
		getCareTeamRowData();
	}, []);
	const [options, setoptions] = useState([]);

	const [selectedname, setselectedname] = useState([]);
	const [selectedId, setselectedId] = useState({});
	const [groupName, setgroupName] = useState('');

	const handleChange = (e) => {
		selectedname.push(e);
		let lastElement = selectedname[selectedname.length - 1];
		setselectedId(lastElement)
	};


	const createCareGroup = () => {
		var careteamId = [];
		var careteamName = []

		selectedId.forEach((items, index) => {
			careteamId.push(items.value);
			careteamName.push(items.label);
		})
		var data = JSON.stringify({
			"groupName": groupName,
			"Name": careteamName,
			"careHomeId": localStorage.getItem('carehomeId'),
			"careTeamId": careteamId
		});

		var config = {
			method: 'post',
			url: `${process.env.REACT_APP_BASEURL}/createCareteamGroup`,
			headers: {
				'Authorization': localStorage.getItem('care_admin_token'),
				'Content-Type': 'application/json'
			},
			data: data
		};

		axios(config)
			.then(function (response) {
				window.location.reload(false);
			})
			.catch(function (error) {
				console.log(error);
			});

	};

	const getCareTeamRowData = () => {
		let urlID = JSON.parse(localStorage.getItem('userData'));
		let adminId = localStorage.getItem('adminId');
		axios({
			url: `${process.env.REACT_APP_BASEURL}/getCareteam?careHomeId=${localStorage.getItem('carehomeId')}&adminId=${adminId}`,
			method: 'GET',
			headers: { Authorization: localStorage.getItem("care_admin_token") },
		})
			.then((res) => {
				let CareTeamData = res.data.careteamListing;
				console.log(CareTeamData, 'CareTeamData')
				setRowData(CareTeamData);
				CareTeamData.forEach((element, index) => {
					options.push({ value: element._id, label: element.first_Name })
				})

			})
			.catch((error) => console.log(`Error: ${error}`));
	};

	const pagination = true;
	const paginationPageSize = 10;
	const rowHeight = 55

	let user = JSON.parse(localStorage.getItem("userData"));

	// --------- General Availability of Weeks from Care Team Members ---------- //
	const [generalAvaliablity, setGeneralAvaliablity] = useState([])
	// -------------- Monday shifts timing ----------------- //
	const [mondaysfield, setmondaysfiled] = useState('')
	const [mondaysendfield, setmondaysendfiled] = useState('')
	const [mondaysFields, setmondaysfields] = useState([])


	const handlemondaysChange = (starttime, endtime) => {
		setmondaysfields(prev => [...prev, { starttime, endtime }])
		setmondaysfiled('')
	}

	const mondaysRemoveChangeHandler = (removeIdx) => {
		const clonefield = mondaysFields.slice();
		const data = clonefield.splice(removeIdx, 1)
		setmondaysfields(clonefield)
	}

	// -------------- Tuesday shifts timing ----------------- //
	const [tuesdaysfield, settuesdaysfiled] = useState('')
	const [tuesdaysendfield, settuesdaysendfiled] = useState('')
	const [tuesdaysFields, settuesdaysfields] = useState([])


	const handletuesdaysChange = (starttime, endtime) => {
		settuesdaysfields(prev => [...prev, { starttime, endtime }])
		settuesdaysfiled('')
	}

	const tuesdaysRemoveChangeHandler = (removeIdx) => {
		const clonefield = tuesdaysFields.slice();
		const data = clonefield.splice(removeIdx, 1)
		settuesdaysfields(clonefield)
	}

	// -------------- Wednesday shifts timing ----------------- //
	const [wednesdaysfield, setwednesdaysfiled] = useState('')
	const [wednesdaysendfield, setwednesdaysendfiled] = useState('')
	const [wednesdaysFields, setwednesdaysfields] = useState([])


	const handlewednesdaysChange = (starttime, endtime) => {
		setwednesdaysfields(prev => [...prev, { starttime, endtime }])
		setwednesdaysfiled('')
	}

	const wednesdaysRemoveChangeHandler = (removeIdx) => {
		const clonefield = wednesdaysFields.slice();
		const data = clonefield.splice(removeIdx, 1)
		setwednesdaysfields(clonefield)
	}

	// -------------- Thursday shifts timing ----------------- //
	const [thrusdaysfield, setthrusdaysfiled] = useState('')
	const [thrusdaysendfield, setthrusdaysendfiled] = useState('')
	const [thrusdaysFields, setthrusdaysfields] = useState([])


	const handlethrusdaysChange = (starttime, endtime) => {
		setthrusdaysfields(prev => [...prev, { starttime, endtime }])
		setthrusdaysfiled('')
	}

	const thrusdaysRemoveChangeHandler = (removeIdx) => {
		const clonefield = thrusdaysFields.slice();
		const data = clonefield.splice(removeIdx, 1)
		setthrusdaysfields(clonefield)
	}

	// -------------- Friday shifts timing ----------------- //
	const [fridaysfield, setfridaysfiled] = useState('')
	const [fridaysendfield, setfridaysendfiled] = useState('')
	const [fridaysFields, setfridaysfields] = useState([])


	const handlefridaysChange = (starttime, endtime) => {
		setfridaysfields(prev => [...prev, { starttime, endtime }])
		setfridaysfiled('')
	}

	const fridaysRemoveChangeHandler = (removeIdx) => {
		const clonefield = fridaysFields.slice();
		const data = clonefield.splice(removeIdx, 1)
		setfridaysfields(clonefield)
	}

	// -------------- Saturday shifts timing ----------------- //
	const [saturdaysfield, setsaturdaysfiled] = useState('')
	const [saturdaysendfield, setsaturdaysendfiled] = useState('')
	const [saturdaysFields, setsaturdaysfields] = useState([])


	const handlesaturdaysChange = (starttime, endtime) => {
		setsaturdaysfields(prev => [...prev, { starttime, endtime }])
		setsaturdaysfiled('')
	}

	const saturdaysRemoveChangeHandler = (removeIdx) => {
		const clonefield = saturdaysFields.slice();
		const data = clonefield.splice(removeIdx, 1)
		setsaturdaysfields(clonefield)
	}

	// -------------- Sunday shifts timing ----------------- //
	const [sundaysfield, setsundaysfiled] = useState('')
	const [sundaysendfield, setsundaysendfiled] = useState('')
	const [sundaysFields, setsundaysfields] = useState([])


	const handlesundaysChange = (starttime, endtime) => {
		setsundaysfields(prev => [...prev, { starttime, endtime }])
		setsundaysfiled('')
	}

	const sundaysRemoveChangeHandler = (removeIdx) => {
		const clonefield = sundaysFields.slice();
		const data = clonefield.splice(removeIdx, 1)
		setsundaysfields(clonefield)
	}

	return (
		<>
			<Header />
			<Sidebar />
			<div className="page-wrapper">
				<div className="container-fluid min_height">
					{user.role.map((roletype, index) => {
						const creategroups = roletype.Modules[2].children[1];
						const createCareteam = roletype.Modules[2].children[0];
						return <div className="card">
							<div className="card-body">
								<h4 className="card-title">Care Team
									<div className="float-end btns_head">
										<button className="btn btn-theme btn-sm" data-bs-toggle="modal" data-bs-target="#createGroup" disabled={(creategroups.access != 'full' || user.ownerId?.SubscriptionPlan === 'baseplan' || user?.SubscriptionPlan === 'baseplan') ? true : false}>Create Groups</button>
										<button className="btn btn-theme btn-sm" data-bs-toggle="modal" data-bs-target="#add_team_member" disabled={createCareteam.access != 'full' ? true : false}>Add Team Member</button>
										<NavLink className="float-end filter_icon" to="/"><BsFilterSquare /></NavLink>
									</div>
								</h4>
								<div>
									<div className="modal fade" id="createGroup" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
										<div className="modal-dialog modal-dialog-scrollable">
											<div className="modal-content">
												<div className="modal-header">
													<h5 className="modal-title" id="exampleModalLabel">Create Group</h5>
													<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
												</div>
												<div className="modal-body" style={{ minHeight: "470px" }}>
													<div className="row">
														<div className="col-md-12 mb-3">
															<label className="form-label">Group Name</label>
															<input type="text" value={groupName} onChange={(e) => setgroupName(e.target.value)} className="form-control" />
														</div>
														<div className="col-md-12 mb-3">
															<label className="form-label">Member Name</label>

															<div className="position-relative">
																{/* <input value="" type="text" className="form-control" /> */}
																<div className="hint_box" style={{ display: "block" }}>
																	<Select options={options} isMulti onChange={handleChange} />

																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="modal-footer">
													<button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
													<button type="button" onClick={createCareGroup} className="btn btn-success">Create Group</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<CareTeamTable rows={rowData} />
							</div>
						</div>
					})}
				</div>

				<div className="modal fade" id="add_team_member" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog modal-dialog-scrollable">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="exampleModalLabel">Add Team Member</h5>
								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div className="modal-body">
								<div className="row">
									<div className="col-md-12 mb-3">
										<label className="form-label">First Name</label>
										<input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="form-control" />
									</div>
									<div className="col-md-12 mb-3">
										<label className="form-label">Last Name</label>
										<input value={lastName} onChange={(e) => setlastName(e.target.value)} type="text" className="form-control" />
									</div>

									<div className="col-md-12 mb-3">
										<label className="form-label">Qualification</label>
										<input value={qualification} onChange={(e) => setQualification(e.target.value)} type="text" className="form-control" />
									</div>
									<div className="col-md-12 mb-3">
										<label className="form-label">Date of Birth</label>
										<input value={DOB} onChange={(e) => setDOB(e.target.value)} type="date" className="form-control" />
									</div>
									<div className="col-md-12 mb-3">
										<label className="form-label">Location</label>
										{/* <input value={location} onChange={(e) => setlocation(e.target.value)} type="text" className="form-control" /> */}
										<MapboxAutocomplete publicKey='pk.eyJ1IjoiY2hhaXRhbnlhYXBwaWMxMjMiLCJhIjoiY2wwNmZ5M2tjMTU4ajNqcDM4dm5ka2FrbiJ9.JD36e92UBwLpFz163HJdEg'
											inputClass='form-control'
											onSuggestionSelect={_suggestionSelect}
											// onChange={(e) => { console.log(e, "MapboxAutocomplete") }}
											resetSearch={false} />
									</div>

									<div className="col-md-12 mb-3">
										<label className="form-label">Contact Number</label>
										<input value={ContactNumber} onChange={(e) => setContactNumber(e.target.value)} type="number" className="form-control" />
									</div>
									<div className="col-md-12 mb-3">
										<label className="form-label">Email</label>
										<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
									</div>
									<div className="col-md-12 mb-3">
										<label className="form-label">Marital Status</label>
										<input value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} type="text" className="form-control" />
									</div>
									<div className="col-md-12 mb-3">
										<label className="form-label">Religion</label>
										<input value={religion} onChange={(e) => setReligion(e.target.value)} type="text" className="form-control" />
									</div>
									<div className="col-md-12 mb-3">
										<label className="form-label">Citizenship</label>
										<input value={citizenship} onChange={(e) => setCitizenship(e.target.value)} type="text" className="form-control" />
									</div>
									<div className="col-md-12 mb-3">
										<label className="form-label">Laguages</label>
										<input value={language} onChange={(e) => setLanguages(e.target.value)} type="text" className="form-control" />
									</div>

									<div className="col-md-12 mb-3">
										<label className="form-label">wagesPerhour</label>
										<input value={wagesPerhour} onChange={(e) => setwagesPerhour(e.target.value)} type="number" className="form-control" />
									</div>
									<div className="col-md-12 mb-3">
										<label className="form-label">overtimeRatetrigger</label>
										<input value={overtimeRatetrigger} onChange={(e) => setovertimeRatetrigger(e.target.value)} type="number" className="form-control" />
									</div>
									<div className="col-md-12 mb-3">
										<label className="form-label">overtimeRate</label>
										<input value={overtimeRate} onChange={(e) => setovertimeRate(e.target.value)} type="number" className="form-control" />
									</div>
									<div className="col-md-12 mb-3">
										<label className="form-label">mobileNo</label>
										<input value={mobileNo} onChange={(e) => setmobileNo(e.target.value)} type="number" className="form-control" />
									</div>
									<div className="col-md-12 mb-3">
										<label className="form-label">password</label>
										<input value={password} onChange={(e) => setpassword(e.target.value)} type="password" className="form-control" />
									</div>
									<div className="col-md-12 mb-3">
										<label className="form-label">image</label>
										<input type="file" onChange={(e) => setimage(e.target.files[0])} className="form-control" />
									</div>
									{/* <div className="col-md-12 mb-3">
										<label className="form-label">General Availability</label>
										<div>
											<label>Monday</label>
											<input type="time" id="myTime" value="22:15:00" className="form-control" />
										</div>
									</div> */}
									<div className="col-md-12">
										<label className="form-label">General Availability</label>
										{/* Monday */}

										<div className="d-flex mb-3">
											<label className="form-label">Monday</label>
											<input
												className="form-control"
												placeholder=""
												type="time"
												value={mondaysfield}
												onChange={(e) => setmondaysfiled(e.target.value)}
											/>
											<input
												className="form-control"
												placeholder=""
												type="time"
												value={mondaysendfield}
												onChange={(e) => setmondaysendfiled(e.target.value)}
											/>
											<button className="btn theme_btn" onClick={() => { handlemondaysChange(mondaysfield, mondaysendfield) }}>Add</button>
										</div>

										{mondaysFields?.map((item, index) => {
											return <div key={index} className="pe-5 mb-3 position-relative">
												<input
													className="form-control"
													type="time"
													value={item.starttime}
													disabled
												/>
												<input
													className="form-control"
													type="time"
													value={item.endtime}
													disabled
												/>
												<button className="removeBtn" style={{ top: "3px" }} onClick={() => { mondaysRemoveChangeHandler(index) }}>
													-
												</button>
											</div>
										})}
										{/* Tuesday */}
										<div className="d-flex mb-3">
											<label className="form-label">Tuesday</label>
											<input
												className="form-control"
												placeholder=""
												type="time"
												value={tuesdaysfield}
												onChange={(e) => settuesdaysfiled(e.target.value)}
											/>
											<input
												className="form-control"
												placeholder=""
												type="time"
												value={tuesdaysendfield}
												onChange={(e) => settuesdaysendfiled(e.target.value)}
											/>
											<button className="btn theme_btn" onClick={() => { handletuesdaysChange(tuesdaysfield, tuesdaysendfield) }}>Add</button>
										</div>
										{tuesdaysFields?.map((item, index) => {
											return <div key={index} className="pe-5 mb-3 position-relative">
												<input
													className="form-control"
													type="time"
													value={item.starttime}
													disabled
												/>
												<input
													className="form-control"
													type="time"
													value={item.endtime}
													disabled
												/>
												<button className="removeBtn" style={{ top: "3px" }} onClick={() => { tuesdaysRemoveChangeHandler(index) }}>
													-
												</button>
											</div>
										})}
										{/* Wednesday */}
										<div className="d-flex mb-3">
											<label className="form-label">Wednesday</label>
											<input
												className="form-control"
												placeholder=""
												type="time"
												value={wednesdaysfield}
												onChange={(e) => setwednesdaysfiled(e.target.value)}
											/>
											<input
												className="form-control"
												placeholder=""
												type="time"
												value={wednesdaysendfield}
												onChange={(e) => setwednesdaysendfiled(e.target.value)}
											/>
											<button className="btn theme_btn" onClick={() => { handlewednesdaysChange(wednesdaysfield, wednesdaysendfield) }}>Add</button>
										</div>
										{wednesdaysFields?.map((item, index) => {
											return <div key={index} className="pe-5 mb-3 position-relative">
												<input
													className="form-control"
													type="time"
													value={item.starttime}
													disabled
												/>
												<input
													className="form-control"
													type="time"
													value={item.endtime}
													disabled
												/>
												<button className="removeBtn" style={{ top: "3px" }} onClick={() => { wednesdaysRemoveChangeHandler(index) }}>
													-
												</button>
											</div>
										})}
										{/* Thursday */}
										<div className="d-flex mb-3">
											<label className="form-label">Thursday</label>
											<input
												className="form-control"
												placeholder=""
												type="time"
												value={thrusdaysfield}
												onChange={(e) => setthrusdaysfiled(e.target.value)}
											/>
											<input
												className="form-control"
												placeholder=""
												type="time"
												value={thrusdaysendfield}
												onChange={(e) => setthrusdaysendfiled(e.target.value)}
											/>
											<button className="btn theme_btn" onClick={() => { handlethrusdaysChange(thrusdaysfield, thrusdaysendfield) }}>Add</button>
										</div>
										{thrusdaysFields?.map((item, index) => {
											return <div key={index} className="pe-5 mb-3 position-relative">
												<input
													className="form-control"
													type="time"
													value={item.starttime}
													disabled
												/>
												<input
													className="form-control"
													type="time"
													value={item.endtime}
													disabled
												/>
												<button className="removeBtn" style={{ top: "3px" }} onClick={() => { thrusdaysRemoveChangeHandler(index) }}>
													-
												</button>
											</div>
										})}
										{/* Friday */}
										<div className="d-flex mb-3">
											<label className="form-label">Friday</label>
											<input
												className="form-control"
												placeholder=""
												type="time"
												value={fridaysfield}
												onChange={(e) => setfridaysfiled(e.target.value)}
											/>
											<input
												className="form-control"
												placeholder=""
												type="time"
												value={fridaysendfield}
												onChange={(e) => setfridaysendfiled(e.target.value)}
											/>
											<button className="btn theme_btn" onClick={() => { handlefridaysChange(fridaysfield, fridaysendfield) }}>Add</button>
										</div>
										{fridaysFields?.map((item, index) => {
											return <div key={index} className="pe-5 mb-3 position-relative">
												<input
													className="form-control"
													type="time"
													value={item.starttime}
													disabled
												/>
												<input
													className="form-control"
													type="time"
													value={item.endtime}
													disabled
												/>
												<button className="removeBtn" style={{ top: "3px" }} onClick={() => { fridaysRemoveChangeHandler(index) }}>
													-
												</button>
											</div>
										})}
										{/* Saturday */}
										<div className="d-flex mb-3">
											<label className="form-label">Saturday</label>
											<input
												className="form-control"
												placeholder=""
												type="time"
												value={saturdaysfield}
												onChange={(e) => setsaturdaysfiled(e.target.value)}
											/>
											<input
												className="form-control"
												placeholder=""
												type="time"
												value={saturdaysendfield}
												onChange={(e) => setsaturdaysendfiled(e.target.value)}
											/>
											<button className="btn theme_btn" onClick={() => { handlesaturdaysChange(saturdaysfield, saturdaysendfield) }}>Add</button>
										</div>
										{saturdaysFields?.map((item, index) => {
											return <div key={index} className="pe-5 mb-3 position-relative">
												<input
													className="form-control"
													type="time"
													value={item.starttime}
													disabled
												/>
												<input
													className="form-control"
													type="time"
													value={item.endtime}
													disabled
												/>
												<button className="removeBtn" style={{ top: "3px" }} onClick={() => { saturdaysRemoveChangeHandler(index) }}>
													-
												</button>
											</div>
										})}
										{/* Sunday */}
										<div className="d-flex mb-3">
											<label className="form-label">Sunday</label>
											<input
												className="form-control"
												placeholder=""
												type="time"
												value={sundaysfield}
												onChange={(e) => setsundaysfiled(e.target.value)}
											/>
											<input
												className="form-control"
												placeholder=""
												type="time"
												value={sundaysendfield}
												onChange={(e) => setsundaysendfiled(e.target.value)}
											/>
											<button className="btn theme_btn" onClick={() => { handlesundaysChange(sundaysfield, sundaysendfield) }}>Add</button>
										</div>
										{sundaysFields?.map((item, index) => {
											return <div key={index} className="pe-5 mb-3 position-relative">
												<input
													className="form-control"
													type="time"
													value={item.starttime}
													disabled
												/>
												<input
													className="form-control"
													type="time"
													value={item.endtime}
													disabled
												/>
												<button className="removeBtn" style={{ top: "3px" }} onClick={() => { sundaysRemoveChangeHandler(index) }}>
													-
												</button>
											</div>
										})}

									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={resetForm}>Close</button>
								<button type="button" data-bs-dismiss="modal" onClick={createcareTeam} className="btn btn-success">Add Docs</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default CareTeam;