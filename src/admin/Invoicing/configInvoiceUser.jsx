import React, { useState, useEffect, Fragment } from "react";
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
import { useForm } from "react-hook-form";
import Select from "react-select";
import { MdModeEditOutline } from "react-icons/md";

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
    id: "invoiceFor",
    numeric: false,
    disablePadding: true,
    label: "Invoice For",
  },
  {
    id: "start_date",
    numeric: true,
    disablePadding: false,
    label: "Start Date",
  },
  {
    id: "invoiceType",
    numeric: false,
    disablePadding: false,
    label: "Invoice Type",
  },
  {
    id: "frequency",
    numeric: true,
    disablePadding: false,
    label: "Frequency",
  },
  {
    id: "invoiceRate",
    numeric: true,
    disablePadding: false,
    label: "Rate",
  },
  {
    id: "keycontact",
    numeric: true,
    disablePadding: false,
    label: "Funding Source(s)",
  },
  {
    id: "keycontactemail",
    numeric: true,
    disablePadding: false,
    label: "Email(s)",
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
  const { numSelected, selected } = props;
  console.log(selected, "EnhancedTableToolbar");
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [invoiceType, setInvoiceType] = useState("Fixed Period");
  const [frequency, setFrequency] = useState("Fixed Period");
  const [invoiceRate, setInvoiceRate] = useState("");
  const [editkeyStatus, seteditkeyStatus] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState(
    selected?.contractStartdate || ""
  );
  let [invoiceoptions, setInvoiceoptions] = useState([
    { value: "Fixed Period", label: "Fixed Period" },
    { value: "PayAsYouGo", label: "Pay as you go" },
  ]);

  let [invoiceFundingoptions, setInvoiceFundingoptions] = useState([]);

  let [invoiceFreqoptions, setInvoiceFreqOptions] = useState([
    {
      value: "1",
      label: "Hourly",
      [selected?.invoiceType == "Fixed Period" ? "isDisabled" : ""]: true,
    },
    {
      value: "2",
      label: "Weekly",
      [selected?.invoiceType == "Pay as you go" ? "isDisabled" : ""]: true,
    },
    {
      value: "3",
      label: "Monthly",
      [selected?.invoiceType == "Pay as you go" ? "isDisabled" : ""]: true,
    },
  ]);

  // ----------------------------------------------- Edit Invoice Api ----------------------------------------- //

  function editClient() {
    var data = JSON.stringify({
      frequency: frequency,
      careHomeId: selected.careHomeId,
      contractStartdate: invoiceDate,
      invoiceRate: invoiceRate,
      invoiceType: invoiceType,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/edit_client/${selected?._id}`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response, "clientedit invoice data");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function invoiceTypehandleChange(event) {
    setInvoiceType(event.value);
    if (event.value === "Fixed Period") {
      setInvoiceFreqOptions((prev) => {
        console.log(prev);
        return prev.map((item) => {
          if (item.label == "Weekly" || item.label == "Monthly") {
            return { value: item.value, label: item.label };
          } else {
            return { value: item.value, label: item.label, isDisabled: true };
          }
        });
      });
    }

    if (event.value === "PayAsYouGo") {
      setInvoiceFreqOptions((prev) => {
        console.log(prev);
        return prev.map((item) => {
          if (item.label == "Hourly") {
            return { value: item.value, label: item.label };
          } else {
            return { value: item.value, label: item.label, isDisabled: true };
          }
        });
      });
    }
  }

  function invoiceFreqhandleChange(event) {
    setFrequency(event.label);
  }

  function fundingSourcesChangeHandler(event) {
    console.log(event, "fundingSourcesChangeHandler");
  }

  function handleRateChange(event) {
    setInvoiceRate(event.target.value);
  }

  // ---------------------------------- Get Care Home Invoice Details  ------------------------------- //

  useEffect(() => {
    if (selected) {
      getCareHomeInvoiceDetail();
    }
  }, [selected]);

  const getCareHomeInvoiceDetail = () => {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/getClientKeyContact?clientId=${selected?._id}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let clientKeyCont = res.data.clientListing[0].keycontact;
        let clientKeyContactsoptions = [];
        clientKeyCont?.map((item) => {
          clientKeyContactsoptions.push({ value: item._id, label: item.name });
        });
        setInvoiceFundingoptions(clientKeyContactsoptions);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

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

          <div className="float-end btns_head">
            {/* <button className="btn btn-theme btn-sm">Create Groups</button> */}
            <button className="btn btn-theme btn-sm" onClick={handleShow2}>
              Edit
            </button>
          </div>
        </Toolbar>
      )}
      <Modal className="viewModal" show={show2} onHide={handleClose2}>
        <Modal.Header closeButton2>
          <Modal.Title>
            <span>Edit Client Invoice Profile</span>
            <div className="d-flex">
              <button className="btn" onClick={handleClose2}>
                Close
              </button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="mb-1">Invoice Type</label>
                <Select
                  options={invoiceoptions}
                  onChange={invoiceTypehandleChange}
                />
              </div>
              {invoiceType === "Fixed Period" && (
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    defaultValue={selected?.contractStartdate}
                    onChange={(e) => {
                      setInvoiceDate(e.target.value);
                    }}
                  />
                </div>
              )}

              <div className="col-md-12 mb-3">
                <label className="mb-1">Invoice Frequency</label>
                <Select
                  options={invoiceFreqoptions}
                  onChange={invoiceFreqhandleChange}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label className="mb-1">Rate</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={selected?.invoiceRate}
                  onChange={handleRateChange}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="mb-1">Funding Source</label>{" "}
                <MdModeEditOutline
                  onClick={() => {
                    seteditkeyStatus(true);
                  }}
                />
                <>
                  <div style={{ display: "flex" }}>
                    <Select
                      options={invoiceFundingoptions}
                      onChange={fundingSourcesChangeHandler}
                    />
                    <input type="text" className="form-control" />
                  </div>
                </>
              </div>

              <div className="col-md-12 mb-3">
                <label className="mb-1">Email</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={selected?.keycontact
                    .map((item) => item.email)
                    .join(", ")}
                  disabled
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
                editClient();
                handleClose2();
              }}
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRowData] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
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

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  useEffect(() => {
    getClientRowData();
  }, []);

  const getClientRowData = () => {
    axios({
      url: `${
        process.env.REACT_APP_BASEURL
      }/getCarehomeInvocings?careHomeId=${localStorage.getItem("carehomeId")}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        let ClientData = res.data.clientListing;
        setRowData(ClientData);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const selectedclient = rows.find((item) => item._id === selected[0]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selectedclient}
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
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const fune = row.keycontact.filter((item) => {
                    return "InvContriPercentage" in item;
                  });

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
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
                        <img className="profile_img_table" src={row.image} />{" "}
                        {row.first_Name} {row.last_Name}
                      </TableCell>
                      <TableCell align="right">
                        {row.contractStartdate}
                      </TableCell>
                      <TableCell align="right">{row.invoiceType}</TableCell>
                      <TableCell align="right">{row.frequency}</TableCell>
                      <TableCell align="right">{row.invoiceRate}</TableCell>
                      <TableCell align="right">
                        {fune
                          .map(
                            (item) =>
                              `${item.name} (${item.InvContriPercentage})`
                          )
                          .join(", ")}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        {fune.map((item) => item.email).join(", ")}
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}
