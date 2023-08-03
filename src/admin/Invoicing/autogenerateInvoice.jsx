import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
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
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from "@mui/utils";
import axios from "axios";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Dropdown from "react-bootstrap/Dropdown";

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
    id: "invoice_for",
    numeric: false,
    disablePadding: true,
    label: "Invoice For",
  },
  {
    id: "invoiceNo",
    numeric: true,
    disablePadding: false,
    label: "Invoice No.",
  },
  {
    id: "creationDate",
    numeric: false,
    disablePadding: false,
    label: "Creation Date",
  },
  {
    id: "invoiceTo",
    numeric: true,
    disablePadding: false,
    label: "Invoice To",
  },
  {
    id: "value",
    numeric: true,
    disablePadding: false,
    label: "Value",
  },
  {
    id: "approval",
    numeric: true,
    disablePadding: false,
    label: "Approval",
  },
  {
    id: "sent",
    numeric: true,
    disablePadding: false,
    label: "Sent",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "paymentDate",
    numeric: true,
    disablePadding: false,
    label: "Payment Date",
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
  console.log(props, "EnhancedTableHead");

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
  const { numSelected, selected, invoiceTemplateHandler } = props;
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  console.log(selected, "EnhancedTableToolbar invoiceTemplateHandler");
  // -----------  Payment Popup (Show and Hide Handler) ------------ //

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // -----------  Approval Status Popup (Show and Hide Handler) Starts ------------ //

  const [showApprovalPopup, setShowApprovalPopup] = useState(false);
  const handleCloseApprovalPopup = () => setShowApprovalPopup(false);
  const handleShowApprovalPopup = () => setShowApprovalPopup(true);

  // ----------- (Lifting State Up)  Edit Invoice data sending to parent Component (invoicing.jsx) (Show and Hide Handler) Ends  ------------ //

  function editAdminInvoices(type) {
    invoiceTemplateHandler(type, selected);
  }

  // -------------------------------------- Approve Invoice Api (Yes /No) -------------------------------------------- //

  function approveInvoiceStatus() {
    var data = JSON.stringify({
      careHomeId: selected?.careHomeId,
      invoiceId: selected?._id,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/approveInvoice`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        handleCloseApprovalPopup();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // -------------------------------------- Payment Status (Paid) Invoice Api -------------------------------------------- //

  function markPaymentStatus() {
    var data = JSON.stringify({
      invoiceId: selected?._id,
      paymentTimestamp: date,
    });
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_BASEURL}/markPaymentStatus`,
      headers: {
        Authorization: localStorage.getItem("care_admin_token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(response, "markPaymentStatus data");
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
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

          {/* <div className="float-end btns_head">
            <button className="btn btn-theme btn-sm">Create Groups</button>
            <button className="btn btn-theme btn-sm" onClick={handleShow2}>
              Edit
            </button>
          </div> */}
          <div className="col-md-3">
            <div className="d-flex justify-content-end">
              <Dropdown className="themeBtn">
                <Dropdown.Toggle id="dropdown-basic">Actions</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      editAdminInvoices("edit");
                    }}
                  >
                    Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handleShowApprovalPopup();
                    }}
                  >
                    Approve
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      handleShow();
                    }}
                  >
                    Status
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </Toolbar>
      )}

      {/*  -------------------------------------------- Approve status Popup (Yes/No) -------------------------------------- */}

      <Modal
        className="viewModal"
        show={showApprovalPopup}
        onHide={handleCloseApprovalPopup}
      >
        <Modal.Header closeButton2>
          <Modal.Title>
            <span>Approve Invoice</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <div className="">
                <p>Are you sure you want to approve this Invoice ?</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <button
              className="btn submitBtn"
              onClick={handleCloseApprovalPopup}
            >
              No
            </button>
            <button
              className="btn submitBtn"
              onClick={() => {
                approveInvoiceStatus();
              }}
            >
              Yes
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      {/*  -------------------------------------------- Payment status Popup (paid/unpaid/overdue)  -------------------------------------- */}

      <Modal className="viewModal" show={show} onHide={handleClose}>
        <Modal.Header closeButton2>
          <Modal.Title>
            <span>Payment Invoice Status</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <label className="mb-1">Payment Date</label>
              <input
                type="date"
                className="form-control"
                defaultValue={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
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
                markPaymentStatus();
              }}
            >
              Yes
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

export default function EnhancedTable(props) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("creationDate");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRowData] = useState([]);
  const [overdueCount, setoverdueCount] = useState(0);
  const [paidCount, setpaidCount] = useState(0);
  const [totalCount, settotalCount] = useState(0);
  const [unpaidCount, setunpaidCount] = useState(0);
  const [overdueAmount, setoverdueAmount] = useState(0);
  const [paidAmount, setpaidAmount] = useState(0);
  const [totalAmount, settotalAmount] = useState(0);
  const [unpaidAmount, setunpaidAmount] = useState(0);

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
      }/getInvoiceAdmin?careHomeId=${localStorage.getItem("carehomeId")}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        console.log(res.data, "getInvoiceAdmin");
        let ClientData = res.data.invoiceData.data;
        setRowData(ClientData);
        setoverdueCount(res.data.invoiceData?.overdueCount);
        setpaidCount(res.data.invoiceData?.paidCount);
        settotalCount(res.data.invoiceData?.totalCount);
        setunpaidCount(res.data.invoiceData?.unpaidCount);
        setoverdueAmount(res.data.invoiceData?.overdueAmount);
        setpaidAmount(res.data.invoiceData?.paidAmount);
        settotalAmount(res.data.invoiceData?.totalAmount);
        setunpaidAmount(res.data.invoiceData?.unpaidAmount);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };
  console.log(selected, isSelected, "selected");
  const selectedclient = rows?.find((item) => item?._id === selected?.[0]);

  function invoiceTemplateHandler(type, selected) {
    console.log(type, selected, "invoiceTemplateHandler");
    props.invoiceTemplateHandler(type, selected);
  }

  return (
    <>
      <div className="row align-items-center">
        <div className="col-md-3"></div>

        <div className="col-md-6 m-auto mt-2 mb-5">
          <div className="row">
            <div className="col statusCount" style={{ color: "#000" }}>
              <h6>Total</h6>
              <h5>{totalCount?.toString()}</h5>
              <p>£ {totalAmount?.toString()}</p>
            </div>
            <div className="col statusCount" style={{ color: "#219653" }}>
              <h6>Paid</h6>
              <h5>{paidCount?.toString()}</h5>
              <p>£ {paidAmount?.toString()}</p>
            </div>
            <div className="col statusCount" style={{ color: "#F2994A" }}>
              <h6>Unpaid</h6>
              <h5>{unpaidCount?.toString()}</h5>
              <p>£{unpaidAmount?.toString()}</p>
            </div>
            <div className="col statusCount" style={{ color: "#EB5757" }}>
              <h6>Overdue</h6>
              <h5>{overdueCount?.toString()}</h5>
              <p>£ {overdueAmount?.toString()}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="d-flex justify-content-end">
            <Dropdown className="themeBtn2">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                All
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Action</Dropdown.Item>
                <Dropdown.Item>Another action</Dropdown.Item>
                <Dropdown.Item>Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            selected={selectedclient}
            invoiceTemplateHandler={invoiceTemplateHandler}
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
                    const creationDate = new Date(row?.invoiceDate);
                    const paymentDate = new Date(row?.paymentTimestamp);
                    const approvalDate = new Date(row?.approvalTimestamp);
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row?._id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row?._id}
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
                          <img
                            className="profile_img_table"
                            src={row?.clientId?.image}
                          />{" "}
                          {row?.clientId?.first_Name} {row?.clientId?.last_Name}
                        </TableCell>
                        <TableCell align="right">{row?.invoiceNo}</TableCell>
                        <TableCell align="right">
                          {creationDate?.toDateString()}
                        </TableCell>
                        <TableCell align="right">{row?.toEmail}</TableCell>
                        <TableCell align="right">
                          £{" "}
                          {row?.chargesDetails &&
                            row?.chargesDetails?.map((rate) => rate.rate)}
                        </TableCell>
                        <TableCell align="right">
                          {row?.approval ? (
                            <Button
                              variant="contained"
                              size="small"
                              color="success"
                            >
                              Yes
                            </Button>
                          ) : (
                            <Button variant="contained" size="small" disabled>
                              No
                            </Button>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {approvalDate?.toDateString()}
                        </TableCell>
                        <TableCell align="right">
                          {row?.status === "paid" && (
                            <Button
                              variant="contained"
                              size="small"
                              color="success"
                            >
                              Paid
                            </Button>
                          )}
                          {row?.status === "unpaid" && (
                            <Button
                              variant="contained"
                              size="small"
                              color="warning"
                            >
                              unpaid
                            </Button>
                          )}
                          {row?.status === "overdue" && (
                            <Button
                              variant="contained"
                              size="small"
                              color="error"
                            >
                              overdue
                            </Button>
                          )}

                          {/* <button style={{ color: "orange" }}>unpaid</button>
                        <button style={{ color: "red" }}>overdue</button> */}
                        </TableCell>
                        <TableCell align="right">
                          {paymentDate?.toDateString()}
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
    </>
  );
}
