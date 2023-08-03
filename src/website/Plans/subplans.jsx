import React from "react";
import '../Plans/plans.css';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useState } from "react";

function Subplans(props) {
  const [checkboxmark1, setcheckbox1] = useState(false);
  const [checkboxmark2, setcheckbox2] = useState(false);
  const [checkboxmark4, setcheckbox4] = useState(false);
  const [item, setitem] = useState("");
  console.log(props, item, "================>>>>>>>>>>>>>>>");

  const checkbox = (e) => {
    console.log(e, "checkbox");
    const itemvalue = e.target.value;
    const isChecked = e.target.checked;
    setitem(itemvalue);

    if (itemvalue == "Base") {
      setcheckbox1(isChecked);
      setcheckbox2(false)
      setcheckbox4(false);
    } else if (itemvalue == "Advanced") {
      setcheckbox1(false);
      setcheckbox2(isChecked)
      setcheckbox4(false);
    } else {
      setcheckbox4(isChecked);
      setcheckbox1(false);
      setcheckbox2(false)
    }
  }
  console.log(checkboxmark1, checkboxmark2, checkboxmark4, "base,advance,turbo");

  if (item == "Base") {
    console.log(checkboxmark1)
    return (<>
      {checkboxmark1 ? <div className="added_plans">
        <h5>
          <label className="checkbox">
            {/* {console.log(elements.planTitle)} */}
            <input type="radio" name="plan" value={props?.planTitle} onClick={(e) => { checkbox(e) }} />
            <span className="checkmark"></span> Friends & Family App ADD-ON
          </label></h5>
        <div className={`app_user_list_n ${checkboxmark1 ? "" : "hidden"}
                           `}>
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
      </div> : <div className="added_plans">
        <h5>
          <label className="checkbox">
            {/* {console.log(elements.planTitle)} */}
            <input type="radio" name="plan" value={props?.planTitle} onClick={(e) => { checkbox(e) }} />
            <span className="checkmark"></span> Friends & Family App ADD-ON
          </label></h5>
        <div className={`app_user_list_n ${!checkboxmark1 && "hidden"}
                           `}>
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
      </div>}

    </>)
  } if (item == "Advanced") {
    return (<>
      {checkboxmark2 == true ? <div className="added_plans">
        <h5>
          <label className="checkbox">
            {/* {console.log(elements.planTitle)} */}
            <input type="radio" name="plan" value={props?.planTitle} onClick={(e) => { checkbox(e) }} />
            <span className="checkmark"></span> Friends & Family App ADD-ON
          </label></h5>
        <div className={`app_user_list_n 
                            `}>
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
      </div> : <div className="added_plans">
        <h5>
          <label className="checkbox">
            {/* {console.log(elements.planTitle)} */}
            <input type="radio" name="plan" value={props?.planTitle} onClick={(e) => { checkbox(e) }} />
            <span className="checkmark"></span> Friends & Family App ADD-ON
          </label></h5>
        <div className={`app_user_list_n hidden`}>
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
      </div>}
    </>)
  } if (item == 'Turbo') {
    return (<>
      {checkboxmark4 == true ? <div className="added_plans">
        <h5>
          <label className="checkbox">
            {/* {console.log(elements.planTitle)} */}
            <input type="radio" name="plan" value={props?.planTitle} onClick={(e) => { checkbox(e) }} />
            <span className="checkmark"></span> Friends & Family App ADD-ON
          </label></h5>
        <div className={`app_user_list_n 
                            `}>
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
      </div> : <div className="added_plans">
        <h5>
          <label className="checkbox">
            {/* {console.log(elements.planTitle)} */}
            <input type="radio" name="plan" value={props?.planTitle} onClick={(e) => { checkbox(e) }} />
            <span className="checkmark"></span> Friends & Family App ADD-ON
          </label></h5>
        <div className={`app_user_list_n hidden
                            `}>
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
      </div>}
    </>)
  }

  return (<>
    {props.checkType == true ? <div className="added_plans">
      <h5>
        <label className="checkbox">
          {/* {console.log(elements.planTitle)} */}
          <input type="radio" name="plan" value={props?.planTitle} onClick={(e) => { checkbox(e) }} />
          <span className="checkmark"></span> Friends & Family App ADD-ON
        </label></h5>
      <div className={`app_user_list_n ${props.checkType ? "hidden" : "hidden"}`}>
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
    </div> : <div className="added_plans">
      <h5>
        <label className="checkbox">
          {/* {console.log(elements.planTitle)} */}
          <input type="radio" name="plan" value={props?.planTitle} onClick={(e) => { checkbox(e) }} />
          <span className="checkmark"></span> Friends & Family App ADD-ON
        </label></h5>
      <div className={`app_user_list_n ${props.checkType ? "hidden" : "hidden"}
                       `}>
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
    </div>}

  </>)
}
export default Subplans;