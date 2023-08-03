import React, { useEffect } from "react";
import "../Plans/plans.css";
import axios from "axios";
import { useState } from "react";
import Switch from "react-switch";
import { BsFillInfoCircleFill } from "react-icons/bs";
import Subplans from "./subplans";

function Plans() {
  useEffect(() => {
    getPlans();
  }, []);
  const [plansData, setplansData] = useState([]);
  const [active, setactive] = useState(false);
  const [price, setprice] = useState(false);
  const [Countryprice, setCountryprice] = useState("GBP");
  const [isShown, setIsShown] = useState(false);
  const [indexVal, setIndexVal] = useState();
  const [basic, setbasic] = useState(false);

  const getPlans = () => {
    var config = {
      method: "get",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/getAllPlans`,
      // headers: {
      //   Authorization: localStorage.getItem("token"),
      // },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data, "getAllPlans");
        setplansData(response.data.plansData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  function handleChange(checked) {
    console.log(basic);
    setactive(checked);
  }
  function handlepriceChange(checked) {
    console.log(basic, checked, "handlepriceChange");
    setprice(checked);
    setCountryprice(checked ? "CAD" : "GBP");
  }
  return (
    <>
      <section className="pagespace_section">
        <div className="container">
          <div className="title">
            <h3>Plans</h3>
          </div>
        </div>
      </section>
      <section className="plan_section">
        <div className="container">
          <div className="title text-center">
            <h3>Choose your plan</h3>
            <div className="plan_select">
              <label></label>
              <span className="p1">Monthly</span>
              <Switch
                onChange={handleChange}
                checked={active}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                handleDiameter={30}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={20}
                width={48}
                className="react-switch"
                id="material-switch"
              />
              <span className="p1">Yearly</span>
              <span className="present">Save 30%</span>
              {/* <span className="p1">Monthly</span>
          <label className="onoff">
              <input type="checkbox"  value="Yearly" onChange={(e)=>{setactive(e.target.value),console.log("------------",e.target.value)}} />
              <span className="slider"></span>
            </label>
            <span className="p1">Yearly</span>
            <span className="present">Save 30%</span> */}
            </div>
          </div>
         
          <span className="p1">GBP</span>
        
          
         
          <Switch
            onChange={handlepriceChange}
            checked={price}
            onColor="#86d3ff"
            onHandleColor="#2693e6"
            handleDiameter={30}
            uncheckedIcon={false}
            checkedIcon={false}
            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={20}
            width={48}
            className="react-switch"
            id="material-switch"
          />
          <span className="p1">CAD</span>
          {/* <div className="title text-end mt-5">
          <div className="plan_select">
          <span className="p1">GBP</span>
          <label className="onoff">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            <span className="p1">CAD</span>
          </div>
        </div> */}
          {active == true ? (
            <div className="row plan_row">
              {plansData.slice(0, 4).map((elements, index) => {
                // const fandfprize = elements.friendAndRelationsMonthly.find((item) => item.friendAndRelationscountry === Countryprice)

                console.log(Countryprice, "plansData");
                return (
                  <>
                    <div className="col-md-4 plan_main">
                      <div className="plan_box">
                        <div className="plan_box_img">
                          <img alt="" src={elements.image} />
                          <h3>
                            <b>
                              {price ? "$" : "£"}{" "}
                              {elements.planPricemonthly[0].country ==
                              Countryprice
                                ? elements.planPricemonthly[0].price * 12 -
                                  (elements.planPricemonthly[0].price *
                                    12 *
                                    30) /
                                    100
                                : elements.planPricemonthly[1].price * 12 -
                                  (elements.planPricemonthly[1].price *
                                    12 *
                                    30) /
                                    100}
                            </b>
                            <br />
                            /Year
                          </h3>
                          <h2>{elements.planTitle}</h2>
                        </div>
                        <ul>
                          {elements.featureData?.map((element, index) => {
                            console.log("========", indexVal);
                            return (
                              <>
                                <li>
                                  <img
                                    alt=""
                                    src={`${process.env.PUBLIC_URL}/images/check.svg`}
                                  />
                                  {element.features}
                                  {element.featureinfo == "" ? (
                                    ""
                                  ) : (
                                    <div
                                      className="tooltip_box mt-0"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title={element.featureinfo}
                                    >
                                      <BsFillInfoCircleFill
                                        onMouseEnter={(e) => {
                                          setIsShown(true);
                                          setIndexVal(element._id);
                                        }}
                                        onMouseLeave={() => setIsShown(false)}
                                      />
                                    </div>
                                  )}{" "}
                                </li>

                                {/* <li><img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`} />{element.features}     {element.featureinfo == '' ? '' :
                              <BsFillInfoCircleFill onMouseEnter={(e) => { setIsShown(true); setIndexVal(element._id) }}
                                onMouseLeave={() => setIsShown(false)} />
                            } </li> */}
                              </>
                            );
                          })}
                        </ul>
                        <Subplans
                          planTitle={elements.planTitle}
                          checkType={active}
                        />
                        <div className="bottom_box">
                          <p
                            className="trail"
                            style={{
                              display:
                                `${elements.planTitle?.toLowerCase()}` == "base"
                                  ? "none"
                                  : "block",
                            }}
                          >
                            30 Days Free Trial
                          </p>
                          <a
                            className="btn"
                            href={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/signup/${elements.planTitle?.toLowerCase()}/${
                              elements._id
                            }/`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Get Started
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          ) : (
            <div className="row plan_row">
              {plansData.slice(0, 4).map((elements, index) => {
                const fandfprize = elements.friendAndRelationsMonthly.find(
                  (item) => item.friendAndRelationscountry === Countryprice
                );

                console.log(Countryprice, elements, "plansData");
                return (
                  <>
                    <div className="col-md-4 plan_main">
                      <div className="plan_box">
                        <div className="plan_box_img">
                          <img alt="" src={elements.image} />
                          <h3>
                            <b>
                              {price ? "$" : "£"}{" "}
                              {elements.planPricemonthly[0].country ==
                              Countryprice
                                ? elements.planPricemonthly[0].price
                                : elements.planPricemonthly[1].price}
                            </b>
                            <br />
                            /month
                          </h3>
                          <h2>{elements.planTitle}</h2>
                        </div>
                        <ul>
                          {elements.featureData?.map((element, index) => {
                            console.log("========", indexVal);
                            return (
                              <>
                                <li>
                                  <img
                                    alt=""
                                    src={`${process.env.PUBLIC_URL}/images/check.svg`}
                                  />
                                  {element.features}
                                  {element.featureinfo == "" ? (
                                    ""
                                  ) : (
                                    <div
                                      className="tooltip_box mt-0"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="top"
                                      title={element.featureinfo}
                                    >
                                      <BsFillInfoCircleFill
                                        onMouseEnter={(e) => {
                                          setIsShown(true);
                                          setIndexVal(element._id);
                                        }}
                                        onMouseLeave={() => setIsShown(false)}
                                      />
                                    </div>
                                  )}{" "}
                                </li>
                                {/* {indexVal === element._id && isShown && (
                            <div className="tooltip_box mt-0" data-bs-toggle="tooltip" data-bs-placement="top" title={element.featureinfo}>
                             <BsFillInfoCircleFill onMouseEnter={(e) => { setIsShown(true); setIndexVal(element._id) }}
                              onMouseLeave={() => setIsShown(false)} />
                            </div>
                          )} */}
                              </>
                            );
                          })}
                          {/* {elements.features.split(',').map((iteam, index) => {
                        return (<>
                          <li><img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`} /> {iteam}</li>
                        </>)
                      })} */}
                        </ul>

                        {/* <Subplans planTitle={elements.planTitle} checkType={active} /> */}
                        <div className="bottom_box">
                          <p
                            className="trail"
                            style={{
                              display:
                                `${elements.planTitle?.toLowerCase()}` == "base"
                                  ? "none"
                                  : "block",
                            }}
                          >
                            30 Days Free Trial
                          </p>
                          <a
                            className="btn"
                            href={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/signup/${elements.planTitle?.toLowerCase()}/${
                              elements._id
                            }/${fandfprize.friendAndRelationsprice}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Get Started
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          )}
          {/* <div className="col-md-3 plan_main">
                <div className="plan_box">
                  <div className="plan_box_img">
                  <img alt="" src={`${process.env.PUBLIC_URL}/images/plan-2.svg`}/>
                  <h3><b>£ x</b><br />/month</h3>
                  <h2>BasePlus</h2>
                  </div>
                  <ul>
                    <li><img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`}/>  All Base Plan features +</li>
                    
                    <li>
                      <img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`}/> 
                      Offline Mode support
                      <div className="tooltip_box" data-bs-toggle="tooltip" data-bs-placement="top" title="Offline Mode support">
                      <AiOutlineInfoCircle />
                      </div>
                    </li>
                    <li>
                      <img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`}/> 
                      Real-time Alerts & Reminders
                    </li>
                    <li>
                      <img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`}/> 
                      Open Shifts Care Team access
                    </li>
                    
                    <li>
                      <img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`}/> 
                      Instant Messaging 
                      <div className="tooltip_box" data-bs-toggle="tooltip" data-bs-placement="top" title="Instant Messaging ">
                      <AiOutlineInfoCircle />
                      </div>
                    </li>
                    <li>
                      <img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`}/> 
                      Create Client Groups
                    </li>
                    <li>
                      <img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`}/> 
                      Capture & attach photos in Tasks
                    </li>
                    <li>
                      <img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`}/> 
                      Access Care Team’s Shift notes
                    </li>
                  </ul>
                  <div className="added_plans">
                      <h5>
                      <label className="checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span> Friends & Family App ADD-ON
                      </label></h5>
                      <div className="app_user_list_n hidden">
                      <div className="app_user"> 
                      <div className="mb-1 mt-2">No. of App Users <div className="tooltip_box float-end mt-0 mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Store Care Plan, Client & Care Team docs">
                      <AiOutlineInfoCircle />
                      </div></div>
                      <div className="slidecontainer">
                       <span className="me-1">0</span> <input type="range" min="0" max="45" className="slider slider2" id="myRange2" /> <span className="ms-1">45</span>
                      </div>
                        <p className="text-center mb-1"><span id="demo2"></span></p>
                      </div>
                      <label className="checkbox">
                        <input type="radio" name="plan2" />
                        <span className="checkmark"></span> Paid by your Care Service Or
                      </label>
                      <label className="checkbox">
                        <input type="radio" name="plan2" />
                        <span className="checkmark"></span> Charged by us directly to Friends & Family User @ GBP x /month
                        <div className="tooltip_box mt-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Charged by us directly to Friends & Family User @ GBP x /month">
                      <AiOutlineInfoCircle />
                      </div>
                      </label>
                      </div>
                  </div>
                 <p className="trail">30 Days Free Trial</p>

                  <div className="bottom_box">
<a className="btn" href="http://careplatform-react.s3-website.ap-south-1.amazonaws.com/admin/signup" target="_blank" rel="noreferrer">Get Started</a>                     </div>

                </div>
              </div>  

              
              <div className="col-md-3 plan_main">
                <div className="plan_box">
                  <div className="plan_box_img">
                  <img alt="" src={`${process.env.PUBLIC_URL}/images/plan-3.svg`}/>
                  <h3><b>£ x</b><br />/month</h3>
                  <h2>Advanced</h2>
                  </div>
                  <ul>
                    <li><img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`}/> All BasePlus Plan features +</li>
                    <li>
                      <img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`}/> 
                      Care Plans
                    </li>
                    <li>
                      <img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`}/> 
                      Payroll calculator
                    </li>
                    <li>
                      <img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`}/> 
                      Sales Funnel
                    </li>
                    <li>
                      <img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`}/> 
                      Invoice Generation
                    </li>
                  </ul>
                  <div className="added_plans">
                      <h5>
                      <label className="checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span> Friends & Family App ADD-ON
                      </label></h5>
                      <div className="app_user_list_n hidden">
                      <div className="app_user"> 
                      <div className="mb-1 mt-2">No. of App Users <div className="tooltip_box float-end mt-0 mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Store Care Plan, Client & Care Team docs">
                      <AiOutlineInfoCircle />
                      </div></div>
                      <div className="slidecontainer">
                       <span className="me-1">0</span> <input type="range" min="0" max="45" className="slider slider3" id="myRange3" /> <span className="ms-1">45</span>
                      </div>
                        <p className="text-center mb-1"><span id="demo3"></span></p>
                      </div>
                      <label className="checkbox">
                        <input type="radio" name="plan3" />
                        <span className="checkmark"></span> Paid by your Care Service Or
                      </label>
                      <label className="checkbox">
                        <input type="radio" name="plan3" />
                        <span className="checkmark"></span> Charged by us directly to Friends & Family User @ GBP x /month
                        <div className="tooltip_box mt-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Charged by us directly to Friends & Family User @ GBP x /month">
                      <AiOutlineInfoCircle />
                      </div>
                      </label>
                      </div>
                  </div>
                 <p className="trail">30 Days Free Trial</p>

                  <div className="bottom_box">
<a className="btn" href="http://careplatform-react.s3-website.ap-south-1.amazonaws.com/admin/signup" target="_blank" rel="noreferrer">Get Started</a>                     </div>

                </div>
              </div>  
              <div className="col-md-3 plan_main">
                <div className="plan_box">
                  <div className="plan_box_img">
                  <img alt="" src={`${process.env.PUBLIC_URL}/images/plan-4.svg`}/>
                  <h3><b>£ x</b><br />/month</h3>
                  <h2>Turbo</h2>
                  </div>
                  <ul>
                    <li><img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`}/>  All Advanced Plan features +</li>
                    <li>
                      <img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`}/> 
                      eMAR (Electronic Medication
Administration Record)</li>
                    <li>
                      <img alt="" src={`${process.env.PUBLIC_URL}/images/check.svg`}/> 
                      Map directions support for 
Care Team App </li>
                    
                  </ul>
                  <div className="added_plans">
                      <h5>
                      <label className="checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span> Friends & Family App ADD-ON
                      </label></h5>
                      <div className="app_user_list_n hidden">
                      <div className="app_user"> 
                      <div className="mb-1 mt-2">No. of App Users <div className="tooltip_box float-end mt-0 mb-1" data-bs-toggle="tooltip" data-bs-placement="top" title="Store Care Plan, Client & Care Team docs">
                      <AiOutlineInfoCircle />
                      </div></div>
                      <div className="slidecontainer">
                       <span className="me-1">0</span> <input type="range" min="0" max="45" className="slider slider4" id="myRange4" /> <span className="ms-1">45</span>
                      </div>
                        <p className="text-center mb-1"><span id="demo4"></span></p>
                      </div>
                      <label className="checkbox">
                        <input type="radio" name="plan4" />
                        <span className="checkmark"></span> Paid by your Care Service Or
                      </label>
                      <label className="checkbox">
                        <input type="radio" name="plan4" />
                        <span className="checkmark"></span> Charged by us directly to Friends & Family User @ GBP x /month
                        <div className="tooltip_box mt-0" data-bs-toggle="tooltip" data-bs-placement="top" title="Charged by us directly to Friends & Family User @ GBP x /month">
                      <AiOutlineInfoCircle />
                      </div>
                      </label>
                      </div>
                  </div>
                 <p className="trail">30 Days Free Trial</p>

                  <div className="bottom_box">
<a className="btn" href="http://careplatform-react.s3-website.ap-south-1.amazonaws.com/admin/signup" target="_blank" rel="noreferrer">Get Started</a>                     </div>

                </div>
              </div>  

              <div className="col-md-12 note_box">
                  <p>Note</p>
                <ul>
                  <li>All Plan licenses are based on a single site or 1 site license only. For each additional site please subscriber for an additional license. A site could be one Nursing Home or Residential Care Home or Retirement Home or Assisted Living Facility or Retirement Community or Home-Care Agency. </li>
                </ul>
              </div> */}
        </div>
      </section>
    </>
  );
}
export default Plans;
