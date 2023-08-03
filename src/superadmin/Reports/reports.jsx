import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import styles from "./reports.module.css";
import ReportsGraph from "./ReportsGraph";
import { fetchGet } from "../../Apis/commonApis";
import { useParams, useHistory } from "react-router-dom";
let roleAccess = JSON.parse(localStorage.getItem("__csadmin__d"));

let categories = [
  {
    value: 1,
    label: "Revenue",
    [roleAccess?.role?.some(
      (roletype) => roletype?.Modules[8]?.children[0]?.access === "no"
    )
      ? "isDisabled"
      : ""]: true,
  },
  { value: 2, label: "Subscriptions" },
  { value: 3, label: "Clients" },
  {
    value: 4,
    label: "Payments",
    [roleAccess?.role?.some(
      (roletype) => roletype?.Modules[8]?.children[3]?.access === "no"
    )
      ? "isDisabled"
      : ""]: true,
  },
];

let RevenueSubCat = [
  { value: "TotalRevenue", label: "Total Revenue" },
  { value: "CountryWise", label: "Country wise Revenue" },
  { value: "MRR", label: "MRR" },
  { value: "ARPU", label: "ARPU" },
  { value: "MSCR", label: "MSCR" },
  { value: "RevenueByClient", label: "Revenue by  Client" },
  { value: "SalesPerson", label: "Revenue by Sales Person" },
  { value: 0, label: "Revenue by Plan" },
  { value: 1, label: "Revenue by Add-ON" },
  { value: 2, label: "Discount by Coupon" },
];
let SubscriptionSubCat = [
  { value: "newSignUps", label: "Signups" },
  { value: "activations", label: "Activations" },
  { value: "cancellations", label: "Cancellations" },
  { value: "TrialsInProgress", label: "Trials In-Progress" },
  { value: "DeadTrials", label: "Dead Trials" },
  { value: "ChurnRate", label: "Churn Rate" },
  // { value: 7, label: "Churned Subscriptions" },
];
let ClientsSubCat = [
  { value: "clientActiveArray", label: "Active Clients" },
  { value: "clientInactiveArray", label: "In-Active Clients" },
];
let PaymentsSubCat = [
  { value: "paymentFailure", label: "Payment Failure" },
  { value: "DaysToPayment", label: "Days to payment" },
  { value: "Refunds", label: "Refunds" },
];
// 'Clients' (Active Clients, In-Active Clients); 'Payments' (Payment Failure, Days to payment, Refunds)
const Reports = () => {
  let history = useHistory();

  const { dashboardCategory, dashboardSubCategory } = useParams();

  let monthAgoDate = new Date();
  let monthAgo = monthAgoDate.getMonth() - 1;
  monthAgoDate.setMonth(monthAgo);

  const [subCats, setSubCats] = useState();
  const [graphStaticData, setGraphStaticData] = useState({});
  const [dateRange, setDateRange] = useState([monthAgoDate, new Date()]);
  const [startDate, endDate] = dateRange;
  const [selectedCat, setSelectedCat] = useState("Subscriptions");
  const [selectedSubCat, setSelectedSubCat] = useState("newSignUps");
  const [selectedLabel, setSelectedLabel] = useState("Signups");
  const [names, setNames] = useState({
    allCopanyNames: [],
    allCountryNames: [],
    allSalesNames: [],
  });
  const [selectionNames, setSelectionNames] = useState([]);
  const [showNameField, setShowNameField] = useState(false);
  const [nameFieldPlacehold, setNameFieldPlacehold] = useState(false);
  const [selectedNameData, setSelectedNameData] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDashboardDetails();
      fetchCompanyNames();
    }
    if (dashboardCategory && dashboardSubCategory) {
      setSelectedCat(dashboardCategory);
      setSelectedSubCat(dashboardSubCategory);
      setSelectedLabel(dashboardSubCategory);
    }

    return () => (mounted = false);
  }, []);

  const getDashboardDetails = async () => {
    const result = await fetchGet("getDashboardDetails");
    // console.log(result);
    if (result.status) {
      setGraphStaticData(result.data);
      countryAndSalesPerson(result.data.newSignUps);
    }
    // filterGraphs(result.data);
  };

  function countryAndSalesPerson(valueArr) {
    let counries = [];
    let salesPerson = [];
    valueArr.forEach((elem) => {
      if (elem.country) {
        counries.push({ value: elem.country, label: elem.country });
      }
      if (elem.salesPerson) {
        salesPerson.push({ value: elem.salesPerson, label: elem.salesPerson });
      }
    });
    let uniqueContries = counries.filter(
      (obj, index, self) =>
        index === self.findIndex((o) => o.value === obj.value)
    );
    let uniqueSalesPerson = salesPerson.filter(
      (obj, index, self) =>
        index === self.findIndex((o) => o.value === obj.value)
    );
    // let uniqueContries = [...new Set(counries)];
    // let uniqueSalesPerson = [...new Set(salesPerson)];
    // counries = [];
    // salesPerson = []
    // uniqueContries.forEach(item => {
    //     counries.push({ value: item, label: item });
    // })
    // uniqueSalesPerson.forEach(item => {
    //     salesPerson.push({ value: item, label: item });
    // })
    setNames((prevState) => {
      return {
        ...prevState,
        allCountryNames: uniqueContries,
        allSalesNames: uniqueSalesPerson,
      };
    });
  }

  const fetchCompanyNames = async () => {
    let result = await fetchGet("getCareHomeAndItsSites");
    let companies = [];
    result.data.forEach((elem) => {
      companies.push({ value: elem.adminId, label: elem.companyName });
    });
    let uniqueData = companies.filter(
      (obj, index, self) =>
        index === self.findIndex((o) => o.value === obj.value)
    );

    setNames((prevState) => {
      return {
        ...prevState,
        allCopanyNames: uniqueData,
      };
    });
  };

  function handleCategoryChange(e) {
    setSelectedCat(e.label);
    if (e.value === 1) {
      setSubCats(RevenueSubCat);
    } else if (e.value === 2) {
      setSubCats(SubscriptionSubCat);
    } else if (e.value === 3) {
      setSubCats(ClientsSubCat);
    } else if (e.value === 4) {
      setSubCats(PaymentsSubCat);
    }
    if (dashboardCategory && e.label !== dashboardCategory) {
      history.push("/superadmin/reports");
    }
  }

  function handleSubCatChange(e) {
    setSelectedSubCat(e.value);
    setSelectedLabel(e.label);
    setSelectedNameData(null);
    if (e.value === "CountryWise") {
      setNameFieldPlacehold("Country");
      setSelectionNames(names.allCountryNames);
      setShowNameField(true);
    } else if (e.value === "RevenueByClient") {
      setNameFieldPlacehold("Company Name");
      setSelectionNames(names.allCopanyNames);
      setShowNameField(true);
    } else if (e.value === "SalesPerson") {
      setNameFieldPlacehold("Sales Person Name");
      setSelectionNames(names.allSalesNames);
      setShowNameField(true);
    } else {
      setShowNameField(false);
    }
    if (dashboardSubCategory && e.value !== dashboardSubCategory) {
      history.push("/superadmin/reports");
    }
  }

  function handleNameSelect(e) {
    setSelectedNameData(e);
  }

  function customDateChangeHandler(update) {
    setDateRange(update);
  }

  return (
    <div className="page-wrapper">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Reports</h4>
          <div className={`btns_head wellbeign_list ${styles.divMargin}`}>
            <div className="row align-item-center">
              <div className="col-md-3">
                <div className="dropdown category_dropdown mb-3 category_dropdown_1">
                  <Select
                    className={styles.dropdowns}
                    defaultValue={
                      dashboardCategory
                        ? {
                            label: dashboardCategory,
                            value: dashboardCategory,
                          }
                        : {
                            label: selectedCat,
                            value: selectedCat,
                          }
                    }
                    options={categories}
                    placeholder="Select Category"
                    onChange={handleCategoryChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="dropdown category_dropdown mb-3 category_dropdown_1">
                  <Select
                    className={styles.dropdowns}
                    defaultValue={
                      dashboardSubCategory
                        ? {
                            label: dashboardSubCategory,
                            value: dashboardSubCategory,
                          }
                        : {
                            label: selectedSubCat,
                            value: selectedSubCat,
                          }
                    }
                    placeholder="Select Sub-Category"
                    options={subCats}
                    onChange={handleSubCatChange}
                  />
                </div>
              </div>
              {
                <div className="col-md-4">
                  {/* <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> */}
                  <DatePicker
                    className={styles.datePicker}
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    maxDate={new Date()}
                    onChange={(update) => {
                      customDateChangeHandler(update);
                    }}
                    isClearable={true}
                  />
                </div>
              }
              <div className="col-md-2">
                {/* <button
                  className={` ${styles.btncolor} mb-4 btn btn-sm float-end`}
                  style={{ backgroundColor: "#BB6BD9 !important" }}
                >
                  Download
                </button> */}
                <button
                  className=" mb-4 btn btn-sm float-end"
                  onClick={() => window.print()}
                >
                  Print
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                {/* isMulti */}
                {showNameField && (
                  <Select
                    className={`basic-multi-select ${styles.nameDropdown}`}
                    // classNamePrefix="select"
                    placeholder={`Please Select ${nameFieldPlacehold}`}
                    value={selectedNameData}
                    options={selectionNames}
                    onChange={handleNameSelect}
                  />
                )}
              </div>
            </div>
            <ReportsGraph
              dateRange={dateRange}
              graphStaticData={graphStaticData}
              selectedCat={selectedCat}
              selectedSubCat={selectedSubCat}
              selectedLabel={selectedLabel}
              selectedNameData={selectedNameData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
