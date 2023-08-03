import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import datechangeHandler from "../../utils/datechangehandler";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import UpdateUserRoleManagement from "./UpdateUserRoleManagement";
import { Accordion, Dropdown } from "react-bootstrap";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "First Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "Roles",
    numeric: true,
    disablePadding: false,
    label: "Role",
  },
  {
    id: "creationDate",
    numeric: true,
    disablePadding: false,
    label: "Creation Date",
  },

  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
];

const StatusButton = ({ status }) => {
  return (
    <div>
      <button
        className={`btn btn-sm btn_table btn-${
          status === "activated" ? "success" : "danger"
        }`}
      >
        {status === "activated" ? "Active" : "Deactive"}
      </button>
    </div>
  );
};

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  refreshData: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  updatedata: PropTypes.object.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, updatedata, refreshData, doRefresh, refresh } = props;
  const [show, setShow] = React.useState(false);
  const [popupStatus, setPopupStatus] = React.useState("");
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (text) => {
    setShow(true);
    setPopupStatus(text);
  };

  function changeStudentStatus(status) {
    var data = JSON.stringify({
      adminId: updatedata?._id,
      status: status,
    });

    var config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/changestatus`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setPopupStatus("");
        doRefresh(0);
        refreshData();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <React.Fragment>
      {numSelected > 0 && (
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}
        >
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>

          <div className="float-end btns_head">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Action
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  disabled={numSelected !== 1}
                  // onClick={editPageRedirection}
                  onClick={() => {
                    handleShow("Edit");
                  }}
                >
                  Edit
                </Dropdown.Item>

                <Dropdown.Item
                  onClick={() => {
                    handleShow("Inactive");
                  }}
                >
                  Make Inactive
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    handleShow("Activate");
                  }}
                >
                  Re-Activate
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Toolbar>
      )}

      {popupStatus === "Edit" && (
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit Admin Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UpdateUserRoleManagement
              refresh={refresh}
              handleClose={handleClose}
              updatedData={updatedata}
              onEditDataFunction={refreshData}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-danger CancelBtn" onClick={handleClose}>
              Close
            </Button>
            <Button
              className="btn submitBtn"
              onClick={() => {
                doRefresh((prev) => prev + 1);
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {popupStatus === "Inactive" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton2>
            <Modal.Title>
              <span>Inactive Plan</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <div className="">
                  <p>Are you sure you want to Inactive this User ?</p>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <button className="btn submitBtn" onClick={handleClose}>
                No
              </button>
              <button
                className="btn submitBtn"
                onClick={() => {
                  changeStudentStatus("deactivated");
                }}
              >
                Yes
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {popupStatus === "Activate" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton2>
            <Modal.Title>
              <span>Activate Plan</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <div className="">
                  <p>Are you sure you want to Activate this User ?</p>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <button className="btn submitBtn" onClick={handleClose}>
                No
              </button>
              <button
                className="btn submitBtn"
                onClick={() => {
                  changeStudentStatus("activated");
                }}
              >
                Yes
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </React.Fragment>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function UserRoleTable(props) {
  const { rows, refreshData } = props;
  const [refresh, doRefresh] = React.useState(0);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [updatedata, setupdatedata] = React.useState({});
  const [fullObject, setSelectedFullObject] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      setSelectedFullObject(rows);
      return;
    }
    setSelected([]);
    setSelectedFullObject([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  function captureEditData(editData) {
    setupdatedata(editData);
  }

  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            updatedata={updatedata}
            refreshData={refreshData}
            refresh={refresh}
            doRefresh={doRefresh}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows?.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    let status =
                      row?.status !== "active" ? "deactivate" : "activate";
                    let message =
                      "Are you sure you want to " + status + " this user?";
                    return (
                      <TableRow
                        hover
                        onClick={(event) => {
                          handleClick(event, row._id);
                          captureEditData(row);
                        }}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.firstName}
                        </TableCell>
                        <TableCell align="right">{row.email}</TableCell>
                        <TableCell align="right">{row.userType}</TableCell>
                        <TableCell align="right">
                          {datechangeHandler(row.createdAt)}
                        </TableCell>
                        <TableCell align="right">
                          <StatusButton status={row.status} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </React.Fragment>
  );
}
