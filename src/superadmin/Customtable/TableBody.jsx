import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Accordion, Dropdown } from "react-bootstrap";
import EnhancedTableHead from "./PlanTableHeader";
import axios from "axios";

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

export default function TableBody() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRowData] = React.useState([]);
  const [ffrows, setFFRowData] = React.useState([]);
  const [couponRows, setCoupontRowData] = React.useState([]);
  const [modalName, setModalName] = React.useState([]);

  // Which popup will open at which time will control this function
  function handleModals(text) {
    setModalName(text);
  }

  // ------------------------------- / ADD Plan Show and Hide Handler(Start) / -------------------------- //
  const [showAddPlan, setShowAddPlan] = React.useState(false);
  const handleAddPlanClose = () => setShowAddPlan(false);
  const handleAddPlanShow = () => setShowAddPlan(true);
  // ------------------------------------------- / End / ----------------------------------------------- //

  // ------------------------------- / ADD On Show and Hide Handler(Start) / --------------------------- //
  const [showAddOn, setShowAddOn] = React.useState(false);
  const handleAddOnClose = () => setShowAddOn(false);
  const handleAddOnShow = () => setShowAddOn(true);
  // ------------------------------------------ / End / ----------------------------------------------- //

  // ---------------------------- / ADD Coupons Show and Hide Handler(Start) / ------------------------ //
  const [showAddCoupons, setShowAddCoupons] = React.useState(false);
  const handleAddCouponsClose = () => setShowAddCoupons(false);
  const handleAddCouponsShow = () => setShowAddCoupons(true);
  // ------------------------------------------ / End / ---------------------------------------------- //

  // ------------------------------------- / Linked Plans / --------------------------------- //
  const [LinkedPlansOption, setLinkedPlansOption] = React.useState([]);

  // ------------------------------------- / Linked Add On / --------------------------------- //
  const [AddOnOption, setAddOnOption] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.planId);
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

  function datechangeHandler(date) {
    const localDate = new Date(date);
    const localDateString = localDate.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const localTimeString = localDate.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    let resultantstring = `${localDateString} ${localTimeString}` || "";

    return resultantstring;
  }

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // ------------------------------  / Plan Heaader Cells / ---------------------------------------- //
  React.useEffect(() => {
    getPlans();
    getFandFapp();
    getCoupon();
  }, []);

  const getPlans = () => {
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getPlans`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
    })
      .then((res) => {
        let plansMonthlyYearly = [];
        res.data.plansData.map((plan) => {
          const monthlyplanclone = Object.assign({}, plan);
          const yearlyplanclone = Object.assign({}, plan);

          if (monthlyplanclone.monthlyPlan) {
            delete monthlyplanclone.yearlyPlan;
            monthlyplanclone.__uniqueId = monthlyplanclone.monthlyPlan.planId;
            plansMonthlyYearly.push(monthlyplanclone);
          }

          if (yearlyplanclone.yearlyPlan) {
            delete yearlyplanclone.monthlyPlan;
            yearlyplanclone.__uniqueId = yearlyplanclone.yearlyPlan.planId;
            plansMonthlyYearly.push(yearlyplanclone);
          }
        });
        setLinkedPlansOption([
          { value: "All", label: "All" },
          ...res.data.plansData.map((item) => {
            return { label: item.planName, value: item.planName };
          }),
        ]);
        setRowData(plansMonthlyYearly);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const getFandFapp = () => {
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getFandFapp`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
    })
      .then((res) => {
        let getallffdata = [];
        res.data.data.map((item) => {
          getallffdata.push({ value: item.addOnId, label: item.addOnType });
        });
        setAddOnOption([{ value: "All", label: "All" }, ...getallffdata]);
        setFFRowData(res.data.data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const getCoupon = () => {
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getCoupon`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
    })
      .then((res) => {
        console.log(res.data.data);
        setCoupontRowData(res.data.data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  return (
    <React.Fragment>
      <div className="page-wrapper">
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Subscription Plans
                <div className="float-end btns_head d-flex">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Add
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          handleAddPlanShow();
                          handleModals("Subscription plans");
                        }}
                      >
                        Plan
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          handleAddOnShow();
                          handleModals("Plans Add on");
                        }}
                      >
                        Add-On
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          handleAddCouponsShow();
                          handleModals("add Coupons");
                        }}
                      >
                        Coupon
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Action
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item>Edit</Dropdown.Item>
                      <Dropdown.Item>Deleted</Dropdown.Item>
                      <Dropdown.Item>Make Inactive</Dropdown.Item>
                      <Dropdown.Item>Re-Activate</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </h4>

              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Plans</Accordion.Header>
                  <Accordion.Body>
                    <Box sx={{ width: "100%" }}>
                      <Paper sx={{ width: "100%", mb: 2 }}>
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
                              headCells={planHeadCells}
                            />
                            <TableBody>
                              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                              {stableSort(rows, getComparator(order, orderBy))
                                .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                  const isItemSelected = isSelected(row.name);
                                  const labelId = `enhanced-table-checkbox-${index}`;

                                  return (
                                    <TableRow
                                      key={index}
                                      hover
                                      onClick={(event) =>
                                        handleClick(event, row.name)
                                      }
                                      role="checkbox"
                                      aria-checked={isItemSelected}
                                      tabIndex={-1}
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
                                        {row.planName}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row.__uniqueId}
                                      </TableCell>
                                      <TableCell align="left">
                                        {datechangeHandler(
                                          row.planCreationDate
                                        )}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row.monthlyPlan &&
                                        row.monthlyPlan.billingFreq
                                          ? row.monthlyPlan.billingFreq
                                          : row.yearlyPlan.billingFreq}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row?.monthlyPlan &&
                                        row?.monthlyPlan?.unitPrice
                                          ? row.monthlyPlan?.unitPrice
                                          : row.yearlyPlan?.unitPrice}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row?.planStatus === "Active" ? (
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
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </Paper>
                    </Box>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Add-Ons</Accordion.Header>
                  <Accordion.Body>
                    <Box sx={{ width: "100%" }}>
                      <Paper sx={{ width: "100%", mb: 2 }}>
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
                              headCells={addOnHeadCells}
                            />
                            <TableBody>
                              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                              {stableSort(ffrows, getComparator(order, orderBy))
                                .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                  const isItemSelected = isSelected(row.name);
                                  const labelId = `enhanced-table-checkbox-${index}`;
                                  return (
                                    <TableRow
                                      hover
                                      onClick={(event) =>
                                        handleClick(event, row.name)
                                      }
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
                                        {row.addOnType}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row.addOnId}
                                      </TableCell>
                                      <TableCell align="left">
                                        {datechangeHandler(
                                          row.addOnCreationDate
                                        )}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row.linkedPlan}
                                      </TableCell>

                                      <TableCell align="left">
                                        {row?.addOnStatus === "Active" ? (
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
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </Paper>
                    </Box>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Coupons</Accordion.Header>
                  <Accordion.Body>
                    <Box sx={{ width: "100%" }}>
                      <Paper sx={{ width: "100%", mb: 2 }}>
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
                              headCells={CouponsCells}
                            />
                            <TableBody>
                              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
                              {stableSort(
                                couponRows,
                                getComparator(order, orderBy)
                              )
                                .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                  const isItemSelected = isSelected(row.name);
                                  const labelId = `enhanced-table-checkbox-${index}`;

                                  return (
                                    <TableRow
                                      hover
                                      onClick={(event) =>
                                        handleClick(event, row.couponType)
                                      }
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
                                        {row.couponType}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row.couponId}
                                      </TableCell>
                                      <TableCell align="left">
                                        {datechangeHandler(
                                          row.couponCreationDate
                                        )}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row.linkedPlan}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row?.linkedAddOn
                                          ? row?.linkedAddOn
                                          : ""}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row?.addOnStatus === "Active" ? (
                                          <button className="btn btn-success btn-sm">
                                            Active
                                          </button>
                                        ) : (
                                          <button className="btn btn-danger btn-sm">
                                            Deactive
                                          </button>
                                        )}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row.discountType}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row.discountValue}
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
                    </Box>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
