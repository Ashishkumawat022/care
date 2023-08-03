import { useEffect, useState } from "react";
import { fetchGet } from "../../Apis/commonApis";
import PaymentsTable from "./PaymentsTable";

const Payments = () => {

    const [paymentData, setPaymentData] = useState([]);
    const [getLatest, setGetLatest] = useState(0);
    

    useEffect(() => {
        getPaymentData();
    },[getLatest])

    

  const getPaymentData = async () => {
    const result = await fetchGet("getActiveSubscriptions");
    if (result.status) setPaymentData(result.data);
  };
  let roleAccess = JSON.parse(localStorage.getItem("__csadmin__d"));

  return (
    <div className="page-wrapper">
      {roleAccess?.role?.map((roletype) => {
        const invoiceAccess = roletype.Modules[5];
        if (invoiceAccess.access !== "full")
          return <div className="clickOff"></div>;
      })}
      <PaymentsTable rows={paymentData} setGetLatest={setGetLatest}/>
    </div>
  );
};

export default Payments;
