import React, { forwardRef, useImperativeHandle, useState } from "react";
import { NavLink } from "react-router-dom";
import '../AccessRights/accessRights.css';
// import {BsFilterSquare} from "react-icons/bs";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


import { MdKeyboardArrowRight } from 'react-icons/md';


const MoodRenderer = forwardRef((props, ref) => {
	const imageForMood = mood => `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`;

	const [mood, setMood] = useState(imageForMood(props.value));

	useImperativeHandle(ref, () => {
		return {
			refresh(params) {
				setMood(imageForMood(params.value));
			}
		};
	});

	return (
		<span className="profle_img_box"><img alt="" className="profile_img_table" src={mood} /> <strong>Margaret, Platt</strong></span>
	);
});

const ChildMessageRenderer = props => {
	const invokeParentMethod = () => {
		props.context.methodFromParent(`Row: ${props.node.rowIndex}, Col: ${props.colDef.field}`);
	};

	return <span><button style={{}} onClick={invokeParentMethod} className="btn btn-sm btn_table btn-success">Active</button><NavLink className="table_arrow" to="/admin/clientsdetails"><MdKeyboardArrowRight /></NavLink></span>;
};


function AccessRights() {
	const rowData = [
		{ SrNo: "1", All: "", AllResidents: "1", AssignedResidents: "1", CarePlans: "1", Medicines: "1", ShiftsTasks: "", Invoicing: "", SalesFunnel: "", Messaging: "1" },
		{ SrNo: "2", All: "", AllResidents: "1", AssignedResidents: "1", CarePlans: "1", Medicines: "1", ShiftsTasks: "", Invoicing: "", SalesFunnel: "", Messaging: "1" },
		{ SrNo: "3", All: "", AllResidents: "1", AssignedResidents: "1", CarePlans: "1", Medicines: "1", ShiftsTasks: "", Invoicing: "", SalesFunnel: "", Messaging: "1" },
		{ SrNo: "4", All: "", AllResidents: "1", AssignedResidents: "1", CarePlans: "1", Medicines: "1", ShiftsTasks: "", Invoicing: "", SalesFunnel: "", Messaging: "1" },
		{ SrNo: "5", All: "", AllResidents: "1", AssignedResidents: "1", CarePlans: "1", Medicines: "1", ShiftsTasks: "", Invoicing: "", SalesFunnel: "", Messaging: "1" },
		{ SrNo: "6", All: "", AllResidents: "1", AssignedResidents: "1", CarePlans: "1", Medicines: "1", ShiftsTasks: "", Invoicing: "", SalesFunnel: "", Messaging: "1" },
		{ SrNo: "7", All: "", AllResidents: "1", AssignedResidents: "1", CarePlans: "1", Medicines: "1", ShiftsTasks: "", Invoicing: "", SalesFunnel: "", Messaging: "1" },
		{ SrNo: "8", All: "", AllResidents: "1", AssignedResidents: "1", CarePlans: "1", Medicines: "1", ShiftsTasks: "", Invoicing: "", SalesFunnel: "", Messaging: "1" },
		{ SrNo: "9", All: "", AllResidents: "1", AssignedResidents: "1", CarePlans: "1", Medicines: "1", ShiftsTasks: "", Invoicing: "", SalesFunnel: "", Messaging: "1" },
		{ SrNo: "10", All: "1", AllResidents: "", AssignedResidents: "", CarePlans: "", Medicines: "", ShiftsTasks: "", Invoicing: "", SalesFunnel: "", Messaging: "" },
	];
	const pagination = true;
	const paginationPageSize = 10;

	const rowHeight = 55;

	return (
		<div className="page-wrapper">
			<div className="container-fluid min_height">
				<div className="card">
					<div className="card-body">
						<h4 className="card-title">Clients
							<div className="float-end btns_head">
								{/* <button className="btn btn-theme btn-sm">Create Groups</button>
							<button className="btn btn-theme btn-sm">Add New Resident</button> */}
							</div>
						</h4>
						<div>

						</div>
						<div className="ag-theme-alpine cts_datatable" style={{ height: 667 }}>
							<AgGridReact rowHeight={rowHeight}
								pagination={pagination} paginationPageSize={paginationPageSize}
								rowData={rowData} components={{
								}} frameworkComponents={{
									childMessageRenderer: ChildMessageRenderer, moodRenderer: MoodRenderer,
								}}>
								{/* <AgGridColumn width={90} field="SrNo" sortable={false} filter={false}></AgGridColumn> */}
								<AgGridColumn width={200} cellRenderer="moodRenderer" field="Name" sortable={false} filter={false}></AgGridColumn>
								<AgGridColumn field="All" sortable={false} filter={false}></AgGridColumn>
								<AgGridColumn field="AllResidents" sortable={false} filter={false}></AgGridColumn>
								<AgGridColumn width={180} field="AssignedResidents" sortable={false} filter={false}></AgGridColumn>
								<AgGridColumn width={140} field="CarePlans" sortable={false} filter={false}></AgGridColumn>
								<AgGridColumn field="Medicines" sortable={false} filter={false}></AgGridColumn>
								<AgGridColumn field="ShiftsTasks" sortable={false} filter={false}></AgGridColumn>
								<AgGridColumn field="Invoicing" sortable={false} filter={false}></AgGridColumn>
								<AgGridColumn width={110} field="SalesFunnel" sortable={false} filter={false}></AgGridColumn>
								<AgGridColumn width={110} field="Messaging" sortable={false} filter={false}></AgGridColumn>
							</AgGridReact>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AccessRights;