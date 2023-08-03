import React, { useState, useRef, Fragment } from "react";
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
import EnhancedTableHead from "./CustomTableHeader";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Select from "react-select";
import { useHistory } from "react-router-dom";

const planHeadCells = [
  {
    id: "planName",
    numeric: false,
    disablePadding: true,
    label: "Plan Type",
  },
  {
    id: "planId",
    numeric: true,
    disablePadding: false,
    label: "Plan ID",
  },
  {
    id: "planCreationDate",
    numeric: true,
    disablePadding: false,
    label: "Creation Date",
  },
  {
    id: "billingFreq",
    numeric: true,
    disablePadding: false,
    label: "Billing Frquency",
  },
  {
    id: "unitPrice",
    numeric: true,
    disablePadding: false,
    label: "Unit Price",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
];

const addOnHeadCells = [
  {
    id: "addOnType",
    numeric: false,
    disablePadding: true,
    label: "Add-On Type",
  },
  {
    id: "addOnId",
    numeric: true,
    disablePadding: false,
    label: "Add-ON ID",
  },
  {
    id: "addOnCreationDate",
    numeric: true,
    disablePadding: false,
    label: "Creation Date",
  },
  {
    id: "unitPrice",
    numeric: true,
    disablePadding: false,
    label: "Unit Price",
  },
  {
    id: "addOnStatus",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
];

const CouponsCells = [
  {
    id: "couponType",
    numeric: false,
    disablePadding: true,
    label: "Coupon Type",
  },
  {
    id: "couponId",
    numeric: true,
    disablePadding: false,
    label: "Coupon ID",
  },
  {
    id: "couponCreationDate",
    numeric: true,
    disablePadding: false,
    label: "Creation Date",
  },
  {
    id: "discountType",
    numeric: true,
    disablePadding: false,
    label: "Discount Type",
  },
  {
    id: "discountValue",
    numeric: true,
    disablePadding: false,
    label: "Discount Value",
  },
  {
    id: "linkedPlan",
    numeric: true,
    disablePadding: false,
    label: "Linked Plan",
  },
  {
    id: "linkedAddOn",
    numeric: true,
    disablePadding: false,
    label: "Linked Add-On",
  },
  {
    id: "linkedAccount",
    numeric: true,
    disablePadding: false,
    label: "Linked Account",
  },
  {
    id: "linkedSite",
    numeric: true,
    disablePadding: false,
    label: "Linked Site",
  },
  {
    id: "addOnStatus",
    numeric: true,
    disablePadding: false,
    label: "Status",
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

function EnhancedTableToolbar(props) {
  const history = useHistory();
  const {
    numSelected,
    selected,
    tableName,
    selectedFullObject,
    getPlans,
    getFandFapp,
    getCoupon,
  } = props;

  const [show, setShow] = useState(false);
  const [popupStatus, setPopupStatus] = useState("");
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (text) => {
    setShow(true);
    setPopupStatus(text);
  };

  function actionHandler() {
    if (popupStatus === "Delete") {
      if (tableName === "Plan") deletePlan(selected);
      if (tableName === "Add-On") deleteFandFapp(selected);
      if (tableName === "Coupons") deleteCoupon(selected);
    }
    if (popupStatus === "Inactive") {
      if (tableName === "Plan") activeInactivePlan(selected, "Inactive");
      if (tableName === "Add-On") activeInactiveFandFapp(selected, "Inactive");
      if (tableName === "Coupons") activeInactiveCoupon(selected, "Inactive");
    }
    if (popupStatus === "Activate") {
      if (tableName === "Plan") activeInactivePlan(selected, "Active");
      if (tableName === "Add-On") activeInactiveFandFapp(selected, "Active");
      if (tableName === "Coupons") activeInactiveCoupon(selected, "Active");
    }
  }

  const deletePlan = (id) => {
    let data = {
      id: selectedFullObject[0]?._id,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/deletePlan`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        setPopupStatus("");
        getPlans();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const deleteFandFapp = (id) => {
    let data = {
      id,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/deleteFandFapp`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        setPopupStatus("");
        getFandFapp();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const deleteCoupon = (id) => {
    let data = {
      id,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/deleteCoupon`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        setPopupStatus("");
        getCoupon();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const activeInactivePlan = (id, status) => {
    let data = {
      planId: id,
      planStatus: status,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/markPlan`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        setPopupStatus("");
        getPlans();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const activeInactiveFandFapp = (id, status) => {
    let data = {
      FandFId: id,
      addOnStatus: status,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/markFandFapp`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        setPopupStatus("");
        getFandFapp();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const activeInactiveCoupon = (id, status) => {
    let data = {
      couponId: id,
      addOnStatus: status,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/markCoupon`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        setPopupStatus("");
        getCoupon();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  function editPageRedirection() {
    history.push(`/superadmin/edit${tableName}`, {
      tableName,
      selected,
      selectedFullObject,
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

          <div className="float-end btns_head">
            {/* <button className="btn btn-theme btn-sm">Create Groups</button> */}
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Action
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  disabled={numSelected !== 1}
                  onClick={editPageRedirection}
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

      {popupStatus === "Delete" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton2>
            <Modal.Title>
              <span>Delete Invoice</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <div className="">
                  <p>Are you sure you want to delete this {tableName} ?</p>
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
              <span>Inactive Plan</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <div className="">
                  <p>Are you sure you want to Inactive this {tableName} ?</p>
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
              <span>Activate Plan</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <div className="">
                  <p>Are you sure you want to Activate this {tableName} ?</p>
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
  selected: PropTypes.array,
  selectedOptions: PropTypes.array,
  tableName: PropTypes.string.isRequired,
  selectedFullObject: PropTypes.array,
};

export default function Customtable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [fullObject, setSelectedFullObject] = React.useState([]);
  const [fffullObject, setFFfullObject] = React.useState([]);
  const [selectedff, setSelectedFF] = React.useState([]);
  const [couponfullObject, setcouponfullObject] = React.useState([]);

  const [selectedcoupon, setSelectedCoupon] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRowData] = React.useState([]);
  const [ffrows, setFFRowData] = React.useState([]);
  const [couponRows, setCoupontRowData] = React.useState([]);

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

  const plantypeRef = useRef(null);
  const unitPriceRef = useRef(null);
  const addOntypeRef = useRef(null);
  const coupontypeRef = useRef(null);
  const discountValueRef = useRef(null);
  const unitPriceAddOnRef = useRef(null);
  const [image, setimage] = useState("");
  // ------------------------------------- / currency / --------------------------------- //
  let [selectedCurrency, setselectedCurrency] = useState("");

  let [currency] = useState([
    { value: "GBP", label: "GBP" },
    { value: "CAD", label: "CAD" },
  ]);

  function currencyHandleChange(event) {
    setselectedCurrency(event.value);
  }

  // ------------------------------------- / Linked Plans / --------------------------------- //
  let [selectedLinkedPlans, setselectedLinkedPlans] = useState("All");
  const [LinkedPlansOption, setLinkedPlansOption] = React.useState([]);

  function linkedPlansHandleChange(event) {
    let array = [];
    event.forEach((option) => {
      array.push(option.value);
    });
    setselectedLinkedPlans(array);
  }

  // ------------------------------------- / Linked Add On / --------------------------------- //
  let [selectedAddOn, setselectedAddOn] = useState("All");
  const [AddOnOption, setAddOnOption] = React.useState([]);

  function addOnHandleChange(event) {
    let array = [];
    event.forEach((option) => {
      array.push(option.value);
    });
    setselectedAddOn(array);
  }

  // ------------------------------------- / Coupons Discount Type(couponDiscountType) / --------------------------------- //
  let [selectedcouponDiscountType, setselectedcouponDiscountType] =
    useState("");

  const [couponDiscountTypeOption] = React.useState([
    { value: "Fixed", label: "Fixed" },
    { value: "%", label: "%" },
  ]);

  function couponDiscountTypeHandleChange(event) {
    setselectedcouponDiscountType(event.value);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.__uniqueId);
      setSelectedFullObject(rows);
      setSelected(newSelected);
      return;
    }
    setSelectedFullObject([]);
    setSelected([]);
  };

  const handleffSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = ffrows.map((n) => n._id);
      setFFfullObject(ffrows);
      setSelectedFF(newSelected);
      return;
    }
    setFFfullObject([]);
    setSelectedFF([]);
  };

  const handleCouponSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = couponRows.map((n) => n._id);
      setSelectedCoupon(newSelected);
      setcouponfullObject(couponRows);
      return;
    }
    setSelectedCoupon([]);
    setcouponfullObject([]);
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

  const handleffClick = (event, name, selectedrow) => {
    const selectedffIndex = selectedff.indexOf(name);
    let newSelected = [];
    let fullSelectArrObjFF = [];

    if (selectedffIndex === -1) {
      newSelected = newSelected.concat(selectedff, name);
      fullSelectArrObjFF = fullSelectArrObjFF.concat(fffullObject, selectedrow);
    } else if (selectedffIndex === 0) {
      newSelected = newSelected.concat(selectedff.slice(1));
      fullSelectArrObjFF = fullSelectArrObjFF.concat(fffullObject.slice(1));
    } else if (selectedffIndex === selectedff.length - 1) {
      newSelected = newSelected.concat(selectedff.slice(0, -1));
      fullSelectArrObjFF = fullSelectArrObjFF.concat(fffullObject.slice(0, -1));
    } else if (selectedffIndex > 0) {
      newSelected = newSelected.concat(
        selectedff.slice(0, selectedffIndex),
        selectedff.slice(selectedffIndex + 1)
      );
      fullSelectArrObjFF = fullSelectArrObjFF.concat(
        fffullObject.slice(0, selectedffIndex),
        fffullObject.slice(selectedffIndex + 1)
      );
    }
    setFFfullObject(fullSelectArrObjFF);
    setSelectedFF(newSelected);
  };

  const handleCouponClick = (event, name, selectedrow) => {
    const selectedcouponIndex = selectedcoupon.indexOf(name);
    let newSelected = [];
    let fullSelectArrObjCoupon = [];

    if (selectedcouponIndex === -1) {
      newSelected = newSelected.concat(selectedcoupon, name);
      fullSelectArrObjCoupon = fullSelectArrObjCoupon.concat(
        couponfullObject,
        selectedrow
      );
    } else if (selectedcouponIndex === 0) {
      newSelected = newSelected.concat(selectedcoupon.slice(1));
      fullSelectArrObjCoupon = fullSelectArrObjCoupon.concat(
        couponfullObject.slice(1)
      );
    } else if (selectedcouponIndex === selectedcoupon.length - 1) {
      newSelected = newSelected.concat(selectedcoupon.slice(0, -1));
      fullSelectArrObjCoupon = fullSelectArrObjCoupon.concat(
        couponfullObject.slice(0, -1)
      );
    } else if (selectedcouponIndex > 0) {
      newSelected = newSelected.concat(
        selectedcoupon.slice(0, selectedcouponIndex),
        selectedcoupon.slice(selectedcouponIndex + 1)
      );
      fullSelectArrObjCoupon = fullSelectArrObjCoupon.concat(
        couponfullObject.slice(0, selectedcouponIndex),
        couponfullObject.slice(selectedcouponIndex + 1)
      );
    }

    setSelectedCoupon(newSelected);
    setcouponfullObject(fullSelectArrObjCoupon);
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
  const isffSelected = (name) => selectedff.indexOf(name) !== -1;
  const iscouponSelected = (name) => selectedcoupon.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const ffemptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ffrows.length) : 0;
  const couponemptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - couponRows.length) : 0;

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
            monthlyplanclone.billingFreq =
              monthlyplanclone.monthlyPlan.billingFreq;
            plansMonthlyYearly.push(monthlyplanclone);
          }

          if (yearlyplanclone.yearlyPlan) {
            delete yearlyplanclone.monthlyPlan;
            yearlyplanclone.__uniqueId = yearlyplanclone.yearlyPlan.planId;
            yearlyplanclone.billingFreq =
              yearlyplanclone.yearlyPlan.billingFreq;
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
        setCoupontRowData(res.data.data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  function Addplan() {
    let data = new FormData();
    data.append("featureList", "");
    data.append("planName", plantypeRef?.current?.value);
    data.append("unitPriceMonthly", unitPriceRef?.current?.value);
    data.append("currency", selectedCurrency);
    data.append("image", image);

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/createPlan`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getPlans();
        handleAddPlanClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function createFandFapp() {
    let data = JSON.stringify({
      addOnType: addOntypeRef?.current?.value,
      unitPrice: unitPriceAddOnRef?.current?.value,
      linkedPlan: selectedLinkedPlans.join(" "),
    });

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/createFandFapp`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getFandFapp();
        handleAddOnClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function createCoupon() {
    let data = {
      couponType: coupontypeRef?.current?.value,
      linkedPlan: selectedLinkedPlans.join(" "),
      linkedAddOn: selectedAddOn.join(" "),
      discountType: selectedcouponDiscountType,
      discountValue: discountValueRef?.current?.value,
    };

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/createCoupon`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        getCoupon();
        handleAddCouponsClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  let roleAccess = JSON.parse(localStorage.getItem("__csadmin__d"));

  return (
    <React.Fragment>
      <div className="page-wrapper">
        {roleAccess?.role?.map((roletype) => {
          const productPlans = roletype.Modules[1].children[0];
          const productAddOns = roletype.Modules[1].children[1];
          const productCoupons = roletype.Modules[1].children[2];
          if (
            productPlans.access !== "full" ||
            productAddOns.access !== "full" ||
            productCoupons.access !== "full"
          )
            return <div className="clickOff"></div>;
        })}
        <div className="container-fluid min_height">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">
                Products{" "}
                <div className="float-end btns_head d-flex">
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Add
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleAddPlanShow}>
                        Plan
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleAddOnShow}>
                        Add-On
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleAddCouponsShow}>
                        Coupon
                      </Dropdown.Item>
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
                        <EnhancedTableToolbar
                          numSelected={selected.length}
                          tableName={"Plan"}
                          selected={selected}
                          selectedFullObject={fullObject}
                          getPlans={getPlans}
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
                                  const isItemSelected = isSelected(
                                    row.__uniqueId
                                  );
                                  const labelId = `enhanced-table-checkbox-${index}`;
                                  const billingFreq =
                                    row.monthlyPlan &&
                                    row.monthlyPlan.billingFreq
                                      ? row.monthlyPlan.billingFreq
                                      : row.yearlyPlan.billingFreq;
                                  return (
                                    <TableRow
                                      key={index}
                                      hover
                                      onClick={(event) => {
                                        handleClick(event, row.__uniqueId, row);
                                      }}
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
                                        {datechangeHandler(row.createdAt)}
                                      </TableCell>
                                      <TableCell align="left">
                                        {billingFreq}
                                      </TableCell>

                                      <TableCell align="left">
                                        {row?.monthlyPlan &&
                                        row.monthlyPlan.billingFreq ===
                                          "Monthly"
                                          ? row.unitPriceMonthly
                                          : row.unitPriceYearly}
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
                        <EnhancedTableToolbar
                          numSelected={selectedff.length}
                          selected={selectedff}
                          selectedFullObject={fffullObject}
                          tableName={"Add-On"}
                          getFandFapp={getFandFapp}
                        />
                        <TableContainer>
                          <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? "small" : "medium"}
                          >
                            <EnhancedTableHead
                              numSelected={selectedff.length}
                              order={order}
                              orderBy={orderBy}
                              onSelectAllClick={handleffSelectAllClick}
                              onRequestSort={handleRequestSort}
                              rowCount={ffrows.length}
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
                                  const isItemSelected = isffSelected(row._id);
                                  const labelId = `enhanced-table-checkbox-${index}`;
                                  return (
                                    <TableRow
                                      hover
                                      onClick={(event) =>
                                        handleffClick(event, row._id, row)
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
                                        {datechangeHandler(row.createdAt)}
                                      </TableCell>
                                      <TableCell align="left">
                                        {row.unitPrice}
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
                              {ffemptyRows > 0 && (
                                <TableRow
                                  style={{
                                    height: (dense ? 33 : 53) * ffemptyRows,
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
                          count={ffrows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                      </Paper>
                    </Box>
                  </Accordion.Body>
                </Accordion.Item>
                {roleAccess?.role?.map((roletype) => {
                  const productCoupons = roletype.Modules[1].children[2];
                  if (productCoupons.access !== "no")
                    return (
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>Coupons</Accordion.Header>
                        <Accordion.Body>
                          <Box sx={{ width: "100%" }}>
                            <Paper sx={{ width: "100%", mb: 2 }}>
                              <EnhancedTableToolbar
                                numSelected={selectedcoupon.length}
                                selected={selectedcoupon}
                                selectedFullObject={couponfullObject}
                                tableName={"Coupons"}
                                getCoupon={getCoupon}
                              />
                              <TableContainer>
                                <Table
                                  sx={{ minWidth: 750 }}
                                  aria-labelledby="tableTitle"
                                  size={dense ? "small" : "medium"}
                                >
                                  <EnhancedTableHead
                                    numSelected={selectedcoupon.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={
                                      handleCouponSelectAllClick
                                    }
                                    onRequestSort={handleRequestSort}
                                    rowCount={couponRows.length}
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
                                        const isItemSelected = iscouponSelected(
                                          row._id
                                        );
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                          <TableRow
                                            hover
                                            onClick={(event) =>
                                              handleCouponClick(
                                                event,
                                                row._id,
                                                row
                                              )
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
                                              {datechangeHandler(row.createdAt)}
                                            </TableCell>
                                            <TableCell align="left">
                                              {row.discountType}
                                            </TableCell>
                                            <TableCell align="left">
                                              {row.discountValue}
                                            </TableCell>
                                            <TableCell align="left">
                                              {typeof row.linkedPlan ===
                                              "string"
                                                ? row.linkedPlan
                                                : row.linkedPlan?.join(", ")}
                                            </TableCell>
                                            <TableCell align="left">
                                              {typeof row.linkedAddOn ===
                                              "string"
                                                ? row.linkedAddOn
                                                : row.linkedAddOn?.join(", ")}
                                            </TableCell>
                                            <TableCell align="left">
                                              {typeof row.linkedAccount ===
                                              "string"
                                                ? row.linkedAccount
                                                : row.linkedAccount?.join(", ")}
                                            </TableCell>
                                            <TableCell align="left">
                                              {typeof row.linkedSites ===
                                              "string"
                                                ? row.linkedSites
                                                : row.linkedSites?.join(", ")}
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
                                    {couponemptyRows > 0 && (
                                      <TableRow
                                        style={{
                                          height:
                                            (dense ? 33 : 53) * couponemptyRows,
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
                                count={couponRows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                              />
                            </Paper>
                          </Box>
                        </Accordion.Body>
                      </Accordion.Item>
                    );
                })}
              </Accordion>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription plans */}

      <Modal
        className="viewModal"
        show={showAddPlan}
        onHide={handleAddPlanClose}
      >
        <Modal.Header closeButton2>
          <Modal.Title>
            <span>Add Subscription Plan</span>
            <div className="d-flex">
              <button className="btn" onClick={handleAddPlanClose}>
                Close
              </button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="mb-1">Image</label>
                <input
                  onChange={(e) => setimage(e.target.files[0])}
                  type="file"
                  required="required"
                  className="form-control"
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="mb-1">Plan Type</label>
                <input type="text" className="form-control" ref={plantypeRef} />
              </div>
              <div className="col-md-12 mb-3">
                <label className="mb-1">Currency</label>
                <Select options={currency} onChange={currencyHandleChange} />
              </div>
              <div className="col-md-12 mb-3">
                <label className="mb-1">Unit Price</label>
                <input
                  type="text"
                  className="form-control"
                  ref={unitPriceRef}
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
                Addplan();
              }}
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* add on in subscription plans */}

      <Modal className="viewModal" show={showAddOn} onHide={handleAddOnClose}>
        <Modal.Header closeButton2>
          <Modal.Title>
            <span>Subscription Plan Add On</span>
            <div className="d-flex">
              <button className="btn" onClick={handleAddOnClose}>
                Close
              </button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="mb-1">Add-On Type</label>
                <input
                  type="text"
                  className="form-control"
                  ref={addOntypeRef}
                />
              </div>

              <div className="col-md-12 mb-3">
                <label className="mb-1">Unit Price</label>
                <input
                  type="number"
                  className="form-control"
                  ref={unitPriceAddOnRef}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="mb-1">Linked Plans</label>
                <Select
                  isMulti
                  options={LinkedPlansOption}
                  onChange={linkedPlansHandleChange}
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
                createFandFapp();
              }}
            >
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* add coupons in subscription plans */}

      <Modal
        className="viewModal"
        show={showAddCoupons}
        onHide={handleAddCouponsClose}
      >
        <Modal.Header closeButton2>
          <Modal.Title>
            <span>Add Coupon</span>
            <div className="d-flex">
              <button className="btn" onClick={handleAddCouponsClose}>
                Close
              </button>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label className="mb-1">Coupon Type</label>
                <input
                  type="text"
                  className="form-control"
                  ref={coupontypeRef}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="mb-1">Linked Plans</label>
                <Select
                  isMulti
                  options={LinkedPlansOption}
                  onChange={linkedPlansHandleChange}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="mb-1">Linked Add-Ons</label>
                <Select
                  isMulti
                  options={AddOnOption}
                  onChange={addOnHandleChange}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="mb-1">Discount Type</label>
                <Select
                  options={couponDiscountTypeOption}
                  onChange={couponDiscountTypeHandleChange}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label className="mb-1">Discount Value</label>
                <input
                  type="number"
                  className="form-control"
                  ref={discountValueRef}
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
                createCoupon();
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
