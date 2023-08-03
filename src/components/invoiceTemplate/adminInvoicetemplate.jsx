import React, { forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import cx from "./template.module.css";
import axios from "axios";

const Invoices = forwardRef((props, ref) => {
  let { invoiceId } = props;

  const [specificInvoice, setSpecificInvoice] = useState({});
  const [ansfield, setansfiled] = useState('')
  const [ansFields, setAnsfields] = useState([])
  const [charges, setCharges] = useState([]);
  const [detailsValue, setDetailsValue] = useState([])
  const [total, setTotal] = useState({
    i : 0,
    total: 0,
  })
  const [chargesTotal, setChargesTotal] = useState({
    i : 0,
    total: 0,
  })

  useEffect(() => {
    getSpecificInvoiceAdminById();
  }, []);

  function getSpecificInvoiceAdminById() {
    axios({
      url: `${process.env.REACT_APP_BASEURL}/getInvoiceAdminById?invoiceId=${invoiceId}`,
      method: "GET",
      headers: { Authorization: localStorage.getItem("care_admin_token") },
    })
      .then((res) => {
        setSpecificInvoice(res.data.invoiceData);
        setCharges(res.data.invoiceData?.chargesDetails)
      })
      .catch((error) => console.log(`Error: ${error}`));
  }
 
 

  useImperativeHandle(ref, () => ({
    editCharges(){
      let allArr = [];
      if(detailsValue.length > 0){
        let details = detailsValue[detailsValue.length-1];
        if(details?.Discription == '' && details?.Rate == 1 && details?.Qty == 1 && details?.Tax == 0 && details?.Amount == 0){
          detailsValue.splice(detailsValue.length-1, 1)
        }
      }
      if(charges.length > 0){
        charges.map((e,index)=>{
          if(e.Discription == '' && e.Rate == "" && e.Qty == "" && e.Tax == "" && e.Amount == 0){
            charges.splice(index, 1)
          }
        })
      }
      allArr = [...charges, ...detailsValue];
      let allChargesDetails = allArr.flat()
      let data = JSON.stringify({
       invoiceId: specificInvoice._id,
       chargesDetails: allChargesDetails
      });
  
      let config = {
        method: "POST",
        url: `${process.env.REACT_APP_BASEURL}/editInvoice`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("care_admin_token"),
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          getSpecificInvoiceAdminById();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    approvalStatus(){
      let data = JSON.stringify({
       invoiceId: specificInvoice._id,
       careHomeId: specificInvoice.careHomeId._id
      });
  
      let config = {
        method: "POST",
        url: `${process.env.REACT_APP_BASEURL}/approveInvoice`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("care_admin_token"),
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          getSpecificInvoiceAdminById();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }));

  const handleAnsChange = (ans) => {
    setAnsfields(prev => [...prev, ans])
    setDetailsValue(prev => [...prev, {  
        Discription: '', Rate: 1, Qty: 1, Tax: 0, Amount: 0
    }])
    setansfiled('')
  }

  const ansRemoveChangeHandler = (removeIdx) => {
    const clonefield = ansFields.slice();
    detailsValue.splice(removeIdx,1)
    const data = clonefield.splice(removeIdx, 1)
    setAnsfields(clonefield)
  }

  const specificInvoiceChangeHandler = (removeIdx) => {
    const clonefield = specificInvoice?.chargesDetails.slice();
    const data = clonefield.splice(removeIdx, 1)
    setCharges(clonefield)
  }
  return (
        <div className={`${cx.printSection}`}>
            <div className="col-md-10 m-auto">
              <div className="row">
                <div className="col-md-12 position-relative text-center p-5">
                  <span className={`${cx.logoBox}`}>Dove Care Homes</span>
                  <h3 style={{ color:'#222' }}>Invoice</h3>
                </div>
                <div className="col-md-12 text-end mb-3" style={{ color:'#222' }}>To</div>
                <div className="col-md-4">
                  <ul className={`${cx.formbox}`}>
                    <li>
                      <input type="text" value={specificInvoice?.careHomeId?.companyName} className="form-control" disabled />
                    </li>
                    <li>
                      <textarea className="form-control" value={specificInvoice?.careHomeId?.billingAddress} disabled>
                      </textarea>
                    </li>
                    <li>
                      <input type="text" value={specificInvoice?.careHomeId?.emails?.invoiceSentFrom} className="form-control" disabled />
                    </li>
                  </ul>
                </div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <ul className={`${cx.formbox}`}>
                    <li>
                      <input type="text" value={specificInvoice?.toName} className="form-control" disabled />
                    </li>
                    <li>
                      <textarea className="form-control" value={specificInvoice?.toAddress} disabled>
                      </textarea>
                    </li>
                    <li>
                      <input type="text" value={specificInvoice?.toEmail} className="form-control" disabled />
                    </li>
                    <li>
                      <input type="text" value={specificInvoice?.toContactNo} className="form-control" disabled />
                    </li>
                  </ul>

                  <ul className="mt-4">
                    <li className="d-flex mb-2 justify-content-between" style={{ color:'#222' }}>
                      <b>Invoice No.</b>
                      <b>Invoice Date</b>
                    </li>
                    <li className="d-flex mb-2 justify-content-between" style={{ color:'#222' }}>
                      <b>{specificInvoice?.invoiceNo}</b>
                      <b>{specificInvoice?.invoiceDate}</b>
                    </li>
                  </ul>
                </div>

                <div className="col-md-12">
                  <ul className="mb-4">
                    <li className="d-flex mt-3 justify-content-between" style={{ color:'#222' }}>
                      <b>Invoice Period</b>
                      <b>Invoice Deadline</b>
                    </li>
                    <li className="d-flex mt-3 justify-content-between" style={{ color:'#222' }}>
                      <b>{specificInvoice?.invoicePeriod}</b>
                      <b>{specificInvoice?.invoiceDeadline}</b>
                    </li>
                  </ul>
                </div>

                <div className="col-md-12">
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ color:'#222' }}><div style={{ width:'400px' }}>Description</div></th>
                        <th style={{ color:'#222' }}>Rate</th>
                        <th style={{ color:'#222' }}>Qty</th>
                        <th style={{ color:'#222' }}>Tax</th>
                        <th style={{ color:'#222' }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      specificInvoice?.chargesDetails?.length > 0 ?
                     ( 
                      <>
                      <tr>
                        <td>
                          <input type='text' defaultValue={specificInvoice?.chargesDetails[0]?.Discription} className="form-control" disabled/>
                        </td>
                        <td><input type='text' defaultValue={specificInvoice?.chargesDetails[0]?.Rate} className="form-control" disabled/></td>
                        <td><input type='text' defaultValue={specificInvoice?.chargesDetails[0]?.Qty} className="form-control" disabled/></td>
                        <td><input type='text' defaultValue={specificInvoice?.chargesDetails[0]?.Tax} className="form-control" disabled/></td>
                        <td><input type='text' defaultValue={specificInvoice?.chargesDetails[0]?.Amount} className="form-control" disabled/></td>
                        <button onClick={() => { 
                          if(detailsValue.length > 0){
                          let details = detailsValue[detailsValue.length-1];
                          if(details.Discription == '' && details.Rate == 1 && details.Qty == 1 && details.Tax == 0 && details.Amount == 0){
                            return ;
                          }else{
                            handleAnsChange(ansfield)
                          }
                          }else{
                            handleAnsChange(ansfield)
                          }
                       }}>
                    +
                  </button>
                      </tr>
                     
                  </>
                      ) : ""
                      
                      }
                     
                    {
                      charges?.map((e,index)=>{
                      return  index > 0 ? 
                       ( <tr>
                        <td>
                          <input type='text' onChange={(event)=>{
                               e.Discription = event.target.value
                          }} defaultValue={e?.Discription} className="form-control" />
                        </td>
                        <td><input type='number' onChange={(event)=>{
                               e.Rate = event.target.value
                               e.Amount = ((+e.Rate * +e.Qty) + +e.Tax)
                               setChargesTotal({i : index,total: e.Amount,})
                          }} defaultValue={e?.Rate} className="form-control" /></td>
                        <td><input type='number' onChange={(event)=>{
                               e.Qty = event.target.value
                               e.Amount = ((+e.Rate * +e.Qty) + +e.Tax)
                               setChargesTotal({i : index,total: e.Amount,})
                          }} defaultValue={e?.Qty} className="form-control" /></td>
                        <td><input type='number' onChange={(event)=>{
                               e.Tax = event.target.value
                               e.Amount = ((+e.Rate * +e.Qty) + +e.Tax)
                               setChargesTotal({i : index,total: e.Amount,})
                          }} defaultValue={e?.Tax} className="form-control" /></td>
                        <td><input type='number' value={
                             chargesTotal.i === index ?  chargesTotal.total : charges[index].Amount
                          } className="form-control" disabled/></td>
                        <button onClick={() => { specificInvoiceChangeHandler(index)
                        setChargesTotal({i : 0,total: 0,})
                         }}>
                      -
                    </button>
                      </tr>
                       ) : ""
                      })
                    }
                    {ansFields?.map((e, index) => {
                      return ( 
                        <>
                        <tr>
                        <td>
                          <input type='text' onChange={(event)=>{
                            detailsValue.map((value,num)=>{
                              if(index === num){
                               value.Discription = event.target.value
                               }
                             })
                          }} className="form-control" />
                        </td>
                        <td><input type='number' onChange={(event)=>{
                            detailsValue.map((value,num)=>{
                              if(index === num){
                               value.Rate = event.target.value
                               value.Amount = ((+value.Rate * +value.Qty) + +value.Tax)
                               setTotal({i : num,total: value.Amount,})
                               }
                             })
                          }} className="form-control" /></td>
                        <td><input type='number' onChange={(event)=>{
                            detailsValue.map((value,num)=>{
                              if(index === num){
                               value.Qty = event.target.value
                               value.Amount = ((+value.Rate * +value.Qty) + +value.Tax)
                               setTotal({i : num,total: value.Amount,})
                               }
                             })
                          }}  className="form-control" /></td>
                        <td><input type='number' onChange={(event)=>{
                            detailsValue.map((value,num)=>{
                              if(index === num){
                               value.Tax = event.target.value
                               value.Amount = ((+value.Rate * +value.Qty) + +value.Tax)
                               setTotal({i : num,total: value.Amount,})
                               }
                             })
                          }}  className="form-control" /></td>
                        <td><input type='number' value={
                             total.i === index ?  total.total : detailsValue[index].Amount
                          }
                              className="form-control" disabled/></td>
                      <button onClick={() => { ansRemoveChangeHandler(index) 
                      setTotal({i : 0,total: 0,})
                      }}>
                      -
                    </button>
                      </tr> 
                    </>
                      )
                })}
                     
                    </tbody>
                  </table>
                </div>

                <div className="col-md-8"></div>
                <div className="col-md-4">
                  <table className="table">
                    <thead>
                      <tr>
                        <th style={{ color:'#222' }}>Total</th>
                        <th style={{ color:'#222' }} className="text-end">£100</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
        </div>
  );
})

export default Invoices;
