import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import EnhancedTableHead from "./EnhancedTableHead";
import datechangeHandler from "../../utils/datechangehandler";
import { useHistory } from "react-router-dom";
import { fetchGet } from "../../Apis/commonApis";

const planHeadCells = [
  {
    id: "templateName",
    numeric: false,
    disablePadding: true,
    label: "Template Name ",
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

const rows = [
  {
    tempId: "invoice",
    templateName: "Invoice",
    creationDate: "--",
    status: "status",
  },
  {
    tempId: "ReceiptAuto-payment",
    templateName: "Receipt Auto-payment",
    creationDate: "--",
    status: "status",
  },
  {
    tempId: "ReceiptPayment",
    templateName: "Receipt Payment",
    creationDate: "--",
    status: "status",
  },
  {
    tempId: "CreditNote",
    templateName: "Credit Note",
    creationDate: "--",
    status: "status",
  },
  {
    tempId: "SubExpiryEmail",
    templateName: "Subscription Expiry Email",
    creationDate: "--",
    status: "status",
  },
  {
    tempId: "SubSetupFailureEmail",
    templateName: "Subscription Setup Failure Email",
    creationDate: "--",
    status: "status",
  },
  {
    tempId: "NewSubEmail",
    templateName: "New Subscription Email",
    creationDate: "--",
    status: "status",
  },
  {
    tempId: "SubDeactivationEmail",
    templateName: "Subscription Deactivation Email",
    creationDate: "--",
    status: "status",
  },
];

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

export default function TemplatesCustomTable() {
  const history = useHistory();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [fullObject, setSelectedFullObject] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const [rows, setRowData] = React.useState([]);
  const [templateName, setTemplateName] = React.useState("");
  const [settingId, setSettingId] = useState("");

  // ------------------------------- / ADD Plan Show and Hide Handler(Start) / -------------------------- //
  const [show, setShow] = React.useState(false);
  const [invoiceHeaderDetails, setInvoiceHeaderDetails] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelectedFullObject(rows);
      setSelected(newSelected);
      return;
    }
    setSelectedFullObject([]);
    setSelected([]);
  };

  const handleClick = (event, name, selectedrow) => {
    const selectedIndex = selected.indexOf(name);

    let newSelected = [];
    let fullSelectArrObj = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
      fullSelectArrObj = fullSelectArrObj.concat(fullObject, selectedrow);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      fullSelectArrObj = fullSelectArrObj.concat(fullObject.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      fullSelectArrObj = fullSelectArrObj.concat(fullObject.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      fullSelectArrObj = fullSelectArrObj.concat(
        fullObject.slice(0, selectedIndex),
        fullObject.slice(selectedIndex + 1)
      );
    }
    setSelectedFullObject(fullSelectArrObj);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // ------------------------------  / Plan Heaader Cells / ---------------------------------------- //
  React.useEffect(() => {
    getSetting();
    getInvHeaders();
  }, []);

  const getSetting = async () => {
    let result = await fetchGet("getSetting");
    // setRowData(result?.data?.templates);
    setSettingId(result?.data?._id);
  };

  function addTaxes() {
    let data = {
      settingId: settingId,
      templateDeails: {
        templateName: templateName,
        creationDate: new Date(),
        status: "Active",
      },
    };
    let config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/addTemplate`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getSetting();
        handleClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function clear() {
    setSelected([]);
  }

  function templateRedirect(tempType) {
    if (tempType === 'Invoice') {
      history.push(
        "/superadmin/invoiceTemplate",
        invoiceHeaderDetails
      );
    }else{
      history.push(`/superadmin/emailTemplates/${tempType}`);
    }
  }
  
  const getInvHeaders = async() => {
    let result = await fetchGet(`getInvHeaders`);
    setInvoiceHeaderDetails(result.data);
  };

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">
            <div className="float-end btns_head d-flex">
              <button className="btn btn-theme btn-sm" onClick={handleShow}>
                Add
              </button>
            </div>
          </h4>

          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              {/* <EnhancedTableToolbar
                numSelected={selected.length}
                tableName={"Edit Template"}
                tableforDeleteActInact={"Template"}
                selected={selected}
                selectedFullObject={fullObject}
                getSetting={getSetting}
                clear={clear}
                settingId={settingId}
              /> */}
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
                        const isItemSelected = isSelected(row._id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            key={index}
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                onClick={(event) => {
                                  handleClick(event, row.tempId, row);
                                }}
                                checked={isItemSelected}
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              onClick={(e) => {
                                templateRedirect(row.templateName);
                              }}
                              scope="row"
                              padding="none"
                            >
                              {row.templateName}
                            </TableCell>
                            <TableCell
                              align="left"
                              onClick={(e) => {
                                templateRedirect(row.templateName);
                              }}
                            >
                              {row.creationDate}
                              {/* {datechangeHandler(row.creationDate)} */}
                            </TableCell>
                            <TableCell
                              align="left"
                              onClick={(e) => {
                                templateRedirect(row.templateName);
                              }}
                            >
                              {row?.status === "status" ? (
                                <button className="btn btn-success btn-sm">
                                  Active
                                </button>
                              ) : (
                                <button className="btn btn-danger btn-sm">
                                  Not Active
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
        </div>
      </div>

      {/* Subscription plans */}

      <Modal className="viewModal" show={show} onHide={handleClose}>
        <Modal.Header closeButton2>
          <Modal.Title>
            <span>Add Taxes</span>
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
                <label className="mb-1">Template Name</label>
                <input
                  onChange={(e) => setTemplateName(e.target.value)}
                  type="text"
                  required
                  className="form-control"
                />
              </div>
              {/* <div className="col-md-12 mb-3">
                <label className="mb-1">Tax Rate</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setTaxRate(e.target.value)}
                />
              </div> */}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <button
              type="button"
              className="btn"
              onClick={() => {
                addTaxes();
              }}
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
