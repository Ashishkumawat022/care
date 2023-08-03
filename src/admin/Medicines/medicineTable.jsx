import React from "react";
import PropTypes from "prop-types";
// import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";

const headCells = [
  {
    id: "no",
    numeric: false,
    disablePadding: true,
    label: "No.",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "location",
    numeric: true,
    disablePadding: false,
    label: "Location",
  },
  {
    id: "advancedirective",
    numeric: true,
    disablePadding: false,
    label: "Advance Directive",
  },
  {
    id: "allergies",
    numeric: true,
    disablePadding: false,
    label: "Allergies",
  },
  {
    id: "conditions",
    numeric: true,
    disablePadding: false,
    label: "Conditions",
  },
  {
    id: "noofmedicines",
    numeric: true,
    disablePadding: false,
    label: "No. of Medicines",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
];

export default function MedicineTable(props) {
  function rowhandleChange(type, id) {
    props.medicinedetails(type, id);
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {headCells.map((head, index) => {
              return (
                <React.Fragment>
                  <TableCell key={head.id} align="right">
                    {head.label}
                  </TableCell>
                </React.Fragment>
              );
            })}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rowsData.map((row, index) => (
            <Row
              key={index}
              row={row}
              getClientRowData={props.getClientRowData}
              rowhandleChange={rowhandleChange}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Row(props) {
  const { row, rowhandleChange } = props;

  // const history = useHistory();

  function handleRowClick(id) {
    // history.push({
    //     pathname: `/admin/addmedicinesDetail/${id}`,
    //     state: { headCells: nestedHeadCells, rowdata: row?.medication, clientId: row.id }
    // });
    rowhandleChange(true, id);
  }

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset" } }}
        onClick={() => handleRowClick(row.id)}
      >
        <TableCell component="th" scope="row">
          {row.no + 1}
        </TableCell>
        <TableCell align="right">
          <span className="profle_img_box">
            <img alt="" className="profile_img_table" src={row.image} />{" "}
            {row.name}
          </span>
        </TableCell>
        <TableCell align="right">{row.location}</TableCell>
        <TableCell align="right">{row.advancedirective}</TableCell>
        <TableCell align="right">{row.allergies}</TableCell>
        <TableCell align="right">{row.conditions}</TableCell>
        <TableCell align="right">{row.noofmedicines}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            // onClick={() => setOpen(!open)}
          >
            {/* {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} */}
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    no: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};
