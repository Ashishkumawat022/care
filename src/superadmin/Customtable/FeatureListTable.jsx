import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Modal from "react-bootstrap/Modal";
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
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { planFeaturesList } from "../../constants/roles";
import Select from "react-select";

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

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
  {
    id: "featureDesc",
    numeric: false,
    disablePadding: true,
    label: "Feature Description",
  },
  {
    id: "subFeatures",
    numeric: false,
    disablePadding: true,
    label: "Sub Features",
  },
  {
    id: "qty",
    numeric: true,
    disablePadding: false,
    label: "Qty",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
];

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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const {
    numSelected,
    selected,
    planId,
    selectedfeature,
    getPlansById,
    clear,
  } = props;
  console.log(selectedfeature, "selectedfeature");
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(selectedfeature?.qty);

  const [feature, setFeature] = useState({
    value: selectedfeature?.name,
    label: selectedfeature?.name,
  });
  const [popupStatus, setPopupStatus] = useState("");
  const handleClose = () => {
    setShow(false);
    setPopupStatus("");
  };
  const handleShow = (text) => {
    setShow(true);
    setPopupStatus(text);
  };

  function actionHandler() {
    if (popupStatus === "Delete") {
      deleteFeatureList(selected);
    }
    if (popupStatus === "Inactive") {
      markFeatureList(selected, "Inactive");
    }
    if (popupStatus === "Activate") {
      markFeatureList(selected, "Active");
    }
    if (popupStatus === "Edit") {
      editFeatureList(selected);
    }
  }

  const deleteFeatureList = (id) => {
    let data = {
      featureId: id,
      planId: planId,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/deleteFeatureList`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getPlansById();
        clear();
        handleClose();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
  const editFeatureList = () => {
    let data = {
      planId: planId,
      featureId: selected[0],
      name: featureDesc ? featureDesc : selectedfeature?.name,
      qty: quantity ? quantity : selectedfeature?.qty,
      status: selectedfeature?.status,
      subFeatures: selectedfeatureList,
      infoText: infoText,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editFeatureList`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getPlansById();
        clear();
        handleClose();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const markFeatureList = (id, status) => {
    console.log(planId);
    let data = {
      featureId: id,
      status: status,
      planId: planId,
    };

    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/markFeatureList`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getPlansById();
        clear();
        handleClose();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  // ------------------------------------- /Sub feature list / --------------------------------- //
  let featureListTitle = `Feature${numSelected > 0 ? "s" : ""}`;
  let [selectedfeatureList, setselectedfeatureList] = useState([]);
  let [infoText, setInfoText] = useState(selectedfeature?.infoText);
  let [featureDesc, setFeatureDesc] = useState(selectedfeature?.name);

  const featureOptions = planFeaturesList.map((feature) => {
    return { value: feature.label, label: feature.label };
  });

  function featureListHandleChange(event) {
    let array = [];
    event.forEach((option) => {
      array.push(option.value);
    });
    setselectedfeatureList(array);
  }
  return (
    <Fragment>
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
          <div className="float-end btns_head d-flex">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Action
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  disabled={numSelected !== 1}
                  onClick={() => {
                    handleShow("Edit");
                  }}
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    handleShow("Delete");
                  }}
                >
                  Delete
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
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>Edit Feature List</span>
              <div className="d-flex">
                <button className="btn" onClick={handleClose}>
                  Close
                </button>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Feature Description</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={selectedfeature?.name}
                    onChange={(e) => {
                      setFeatureDesc(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Info Text</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={selectedfeature?.infoText}
                    onChange={(e) => {
                      setInfoText(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Sub Features</label>
                  <Select
                    isMulti
                    defaultValue={selectedfeature?.subFeatures.map((item) => {
                      return { value: item, label: item };
                    })}
                    options={featureOptions}
                    onChange={featureListHandleChange}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Qty</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={selectedfeature?.qty}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  editFeatureList();
                }}
              >
                Save
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {popupStatus === "Delete" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton2>
            <Modal.Title>
              <span>Delete {featureListTitle} </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <div className="">
                  <p>
                    Are you sure you want to delete this {featureListTitle} ?
                  </p>
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
                  actionHandler();
                }}
              >
                Yes
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {popupStatus === "Inactive" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton2>
            <Modal.Title>
              <span>Inactive {featureListTitle}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <div className="">
                  <p>
                    Are you sure you want to Inactive this {featureListTitle}?
                  </p>
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
                  actionHandler();
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
              <span>Activate {featureListTitle}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <div className="">
                  <p>
                    Are you sure you want to Activate this {featureListTitle} ?
                  </p>
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
                  actionHandler();
                }}
              >
                Yes
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </Fragment>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function FeatureListTable(props) {
  let { featureList, getPlansById, planId } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = featureList?.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
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

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected?.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - featureList?.length) : 0;

  const selectedfeature = featureList?.find((item) => item._id === selected[0]);
  function clear() {
    setSelected([]);
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected?.length}
          selected={selected}
          selectedfeature={selectedfeature}
          getPlansById={getPlansById}
          planId={planId}
          clear={clear}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected?.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={featureList?.length || 0}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(featureList, getComparator(order, orderBy))
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row?._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
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
                        {row?.name}
                      </TableCell>
                      <TableCell align="left">
                        {row?.subFeatures.join(", ")}
                      </TableCell>
                      <TableCell align="right">{row?.qty}</TableCell>
                      <TableCell align="left">
                        {" "}
                        {row?.status === "Active" ? (
                          <button className="btn btn-success btn-sm">
                            Active
                          </button>
                        ) : (
                          <button className="btn btn-danger btn-sm">
                            Deactive
                          </button>
                        )}
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
          count={featureList?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
