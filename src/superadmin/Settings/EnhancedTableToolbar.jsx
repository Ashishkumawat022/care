import React, { useState, Fragment, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export default function EnhancedTableToolbar(props) {
  const history = useHistory();
  const {
    numSelected,
    selected,
    tableName,
    tableforDeleteActInact,
    selectedFullObject,
    getSetting,
    settingId,
    clear,
  } = props;

  console.log(
    selected,
    numSelected,
    selectedFullObject,
    settingId,
    "EnhancedTableToolbarEnhancedTableToolbar"
  );

  useEffect(() => {
    getInvHeaders();
  }, []);

  const [show, setShow] = useState(false);
  const [popupStatus, setPopupStatus] = useState("");
  const [country, setCountry] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [currency, setCurrency] = useState("");
  const [symbol, setSymbol] = useState("");
  const [invoiceHeaderDetails, setInvoiceHeaderDetails] = useState({});
  const [templateName, setTemplateName] = React.useState("");

  const [gbpExchangeRate, setGbpExchangeRate] = useState("");
  const handleClose = () => {
    setShow(false);
    clear();
  };
  const handleShow = (text) => {
    setShow(true);
    setPopupStatus(text);
  };

  function actionHandler() {
    if (popupStatus === "Delete") {
      if (tableforDeleteActInact === "Template") deleteTemplate(selected);
      if (tableforDeleteActInact === "Currency") deleteCurrency(selected);
      if (tableforDeleteActInact === "Taxes") deleteTaxes(selected);
    }
    if (popupStatus === "Inactive") {
      if (tableforDeleteActInact === "Template")
        activeInactiveTemplate(selected, "Inactive");
      if (tableforDeleteActInact === "Currency")
        activeInactiveCurrency(selected, "Inactive");
      if (tableforDeleteActInact === "Taxes")
        activeInactiveTaxes(selected, "Inactive");
    }
    if (popupStatus === "Activate") {
      if (tableforDeleteActInact === "Template")
        activeInactiveTemplate(selected, "Active");
      if (tableforDeleteActInact === "Currency")
        activeInactiveCurrency(selected, "Active");
      if (tableforDeleteActInact === "Taxes")
        activeInactiveTaxes(selected, "Active");
    }
  }

  const deleteTemplate = (id) => {
    let data = {
      settingId: settingId,
      templateId: id,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/deleteTemplate`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getSetting();
        setPopupStatus("");
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const getInvHeaders = (id) => {
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getInvHeaders`,
      method: "get",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
    })
      .then((res) => {
        setInvoiceHeaderDetails(res.data.data);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const deleteCurrency = (id) => {
    let data = {
      settingId: settingId,
      currencyId: id,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/deleteCurrency`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getSetting();
        setPopupStatus("");
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const deleteTaxes = (id) => {
    let data = {
      settingId: settingId,
      taxId: id,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/deleteTaxes`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getSetting();
        setPopupStatus("");
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const activeInactiveTemplate = (id, status) => {
    let data = {
      settingId: settingId,
      templateId: id,
      status: status,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/markTemplate`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getSetting();
        setPopupStatus("");
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const activeInactiveCurrency = (id, status) => {
    let data = {
      settingId: settingId,
      currencyId: id,
      taxStatus: status,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/markCurrency`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        getSetting();
        setPopupStatus("");
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const activeInactiveTaxes = (id, status) => {
    let data = {
      settingId: settingId,
      taxId: id,
      taxStatus: status,
    };
    axios({
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/markTaxes`,
      method: "POST",
      headers: { Authorization: localStorage.getItem("superadmin_token") },
      data: data,
    })
      .then((res) => {
        setPopupStatus("");
        getSetting();
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  function editTaxes() {
    let data = {
      settingId: settingId,
      taxId: selectedFullObject[0]?._id,
      country: country ? country : selectedFullObject[0]?.country,
      taxRate: taxRate ? taxRate : selectedFullObject[0]?.taxRate,
    };
    let config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editTaxes`,
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
  function editCurrency() {
    let data = {
      settingId: settingId,
      currencyId: selectedFullObject[0]?._id,
      currency: currency ? currency : selectedFullObject[0]?.currency,
      symbol: symbol ? symbol : selectedFullObject[0]?.symbol,
      gbpExchangeRate: gbpExchangeRate
        ? gbpExchangeRate
        : selectedFullObject[0]?.gbpExchangeRate,
    };
    let config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editCurrency`,
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
  function editTemplate() {
    let data = {
      settingId: settingId,
      templateId: selectedFullObject[0]?._id,
      creationDate: new Date(),
      templateName: templateName
        ? templateName
        : selectedFullObject[0]?.templateName,
    };
    let config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/editTemplate`,
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
                  onClick={() => {
                    history.push(
                      "/superadmin/invoiceTemplate",
                      invoiceHeaderDetails
                    );
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

      {popupStatus === "Edit Taxes" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton2>
            <Modal.Title>
              <span>Edit Taxes</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label className="mb-1">country</label>
                  <input
                    onChange={(e) => setCountry(e.target.value)}
                    type="text"
                    defaultValue={selectedFullObject[0]?.country}
                    required
                    className="form-control"
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Tax Rate</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={selectedFullObject[0]?.taxRate}
                    required
                    onChange={(e) => setTaxRate(e.target.value)}
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
                  editTaxes();
                }}
              >
                Save
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {popupStatus === "Edit Currency" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton2>
            <Modal.Title>
              <span>Edit Currency</span>
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
                  <label className="mb-1">Currency</label>
                  <input
                    onChange={(e) => setCurrency(e.target.value)}
                    type="text"
                    required
                    defaultValue={selectedFullObject[0]?.currency}
                    className="form-control"
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">Symbol</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={selectedFullObject[0]?.symbol}
                    required
                    onChange={(e) => setSymbol(e.target.value)}
                  />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="mb-1">GBP Exchange Rate</label>
                  <input
                    type="text"
                    defaultValue={selectedFullObject[0]?.gbpExchangeRate}
                    className="form-control"
                    required
                    onChange={(e) => setGbpExchangeRate(e.target.value)}
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
                  editCurrency();
                }}
              >
                Save
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
      {popupStatus === "Edit Template" && (
        <Modal className="viewModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton2>
            <Modal.Title>
              <span>Add Tempalte</span>
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
                    defaultValue={selectedFullObject[0]?.templateName}
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
                  editTemplate();
                }}
              >
                Update
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
