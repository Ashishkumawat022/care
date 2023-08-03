import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import InvoiceTable from "./InvoiceTable";
import { fetchGet } from "../../Apis/commonApis";
import InvoiceDetail from "./InvoiceDetail";

function Invoices() {
  let initialVals = {
    id: "",
    companyName: "",
    careSiteName: "",
    chargesDetails: [],
    SubscriptionPlan: "",
    type: "",
    generationType: "",
    fromName: "",
    fromAddress: "",
    fromEmail: "",
    toName: "",
    toAddress: "",
    templateFor: "",
    toEmail: "",
    toContactNo: "",
    invoiceNo: "",
    invoiceDate: "",
    invoicePeriod: "",
    total: 0,
  };
  const [invoiceData, setInvoiceData] = useState([]);
  const [invoiceDetail, setInvoiceDetail] = useState(initialVals);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [getLatestInvioceCount, setGetLatestInvioceCount] = useState(0);

  function getLatestInvioceData() {
    setGetLatestInvioceCount(getLatestInvioceCount + 1);
  }

  useEffect(() => {
    getInvoiceData();
  }, [getLatestInvioceCount]);

  const getInvoiceData = async () => {
    const result = await fetchGet("getInvoiceSuperAdmin");
    setInvoiceData(result.invoiceData);
  };

  const rowClickHandler = (id) => {
    invoiceData.forEach((elem) => {
      if (elem._id === id) {
        setInvoiceDetail({
          ...invoiceDetail,
          id: elem._id,
          companyName: elem.companyName,
          careSiteName: elem.careSiteName,
          chargesDetails: elem.chargesDetails,
          SubscriptionPlan: elem.SubscriptionPlan,
          type: elem.type,
          generationType: elem.generationType,
          fromName: elem.fromName,
          fromAddress: elem.fromAddress,
          fromEmail: elem.fromEmail,
          toName: elem.toName,
          toAddress: elem.toAddress,
          templateFor: elem.templateFor,
          toEmail: elem.toEmail,
          toContactNo: elem.toContactNo,
          invoiceNo: elem.invoiceNo,
          invoiceDate: elem.invoiceDate,
          invoicePeriod: elem.invoicePeriod,
          total: elem.total,
        });
      }
    });
    setShowInvoiceDetails(true);
  };

  let roleAccess = JSON.parse(localStorage.getItem("__csadmin__d"));

  return (
    <div className="page-wrapper">
      {roleAccess?.role?.map((roletype) => {
        const invoiceAccess = roletype.Modules[4];
        if (invoiceAccess.access !== "full")
          return <div className="clickOff"></div>;
      })}
      {!showInvoiceDetails && (
        <InvoiceTable
          rows={invoiceData}
          onRowClick={rowClickHandler}
          getLatestInvioceData={getLatestInvioceData}
        />
      )}
      {showInvoiceDetails && (
        <InvoiceDetail
          setShowInvoiceDetails={setShowInvoiceDetails}
          invoiceDetail={invoiceDetail}
        />
      )}
    </div>
  );
}

export default Invoices;
