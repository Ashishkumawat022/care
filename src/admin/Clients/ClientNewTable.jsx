import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "../Clients/clients.css";
import { useHistory } from "react-router-dom";

const StatusButton = (props) => {
  let { params } = props;
  return (
    <div>
      <button
        className={`btn btn-sm btn_table btn-${
          params?.row?.status === "active" ? "success" : "danger"
        }`}
      >
        {params?.row?.status === "active" ? "Active" : "Deactive"}
      </button>
    </div>
  );
};

const ProfileImgName = (props) => {
  let { params } = props;
  return (
    <span className="profle_img_box">
      <img alt="" className="profile_img_table" src={params.row.image} />{" "}
      <strong>{`${params.row.first_Name} ${params.row.last_Name}`}</strong>
    </span>
  );
};

const columns = [
  { field: "id", headerName: "No.", width: 30 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
    renderCell: (params) => <ProfileImgName params={params} />,
  },
  { field: "location", headerName: "Location", width: 150 },
  { field: "contractStartdate", headerName: "Contract Start Date", width: 150 },
  { field: "advance_Directive", headerName: "Advance Directive", width: 150 },
  { field: "hrs_of_service", headerName: "Hrs Of Service", width: 150 },
  { field: "overdueTasks", headerName: "Overdue Tasks", width: 150 },
  { field: "toDos", headerName: "To Dos", width: 150 },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => <StatusButton params={params} />,
  },
];

export default function ClientNewTable(props) {
  const history = useHistory();
  let { rows } = props;
  console.log(rows, "clientnewtableclientnewtable");

  const handleRowClick = (params) => {
    history.push(`/admin/clientsdetails/${params.row._id}`);
  };

  return (
    <div style={{ height: 250, width: "100%" }}>
      <DataGrid
        columns={columns}
        rows={rows}
        onRowClick={handleRowClick}
        autoHeight
      />
    </div>
  );
}
