import axios from "axios";

import React, { forwardRef, useImperativeHandle, useState } from "react";

const Addplan = () => {
  const [inputList, setInputList] = useState([
    { features: "", featureinfo: "" },
  ]);
  const [inputPlanPrice, setinputPlanPrice] = useState([
    { countryCurrency: "", price: "" },
  ]);
  const [planTitle, setplanTitle] = useState("");
  const [planPricemonthly, setplanPricemonthly] = useState("");
  const [planPriceYear, setplanPriceYear] = useState("");
  const [friendAndRelationsMonthly, setfriendAndRelationsMonthly] =
    useState("");
  const [friendAndRelationsYearly, setfriendAndRelationsYearly] = useState("");
  const [features, setfeatures] = useState({});
  const [featureinfo, setfeatureinfo] = useState({});
  const [image, setimage] = useState("");
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handlePlanPriceAddClick = () => {
    setinputPlanPrice([...inputPlanPrice, { countryCurrency: "", price: "" }]);
  };
  const handleAddClick = () => {
    setInputList([...inputList, { features: "", featureinfo: "" }]);
  };
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  function addPlans() {
    var features = [];
    var featureinfo = [];
    inputList.forEach((items, index) => {
      console.log(items);
      features.push(items.features);
      featureinfo.push(items.featureinfo);
    });
    var data = new FormData();
    data.append("planTitle", planTitle);
    data.append("planPricemonthly", planPricemonthly);
    data.append("planPriceYear", planPriceYear);
    data.append("friendAndRelationsMonthly", friendAndRelationsMonthly);
    data.append("friendAndRelationsYearly", friendAndRelationsYearly);
    data.append("features", features);
    data.append("featureinfo", featureinfo);
    data.append("country", "uk");
    data.append("image", image);

    // data.append('image', fs.createReadStream('/C:/Users/chait/Downloads/plan-4.svg'));
    console.log(inputList);
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_SUPERADMIN_BASEURL}/createPlan`,
      headers: {
        Authorization: localStorage.getItem("superadmin_token"),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <>
      <div className="modal-content">
        <div className="modal-header d-flex align-items-center">
          <h4 className="modal-title" id="exampleModalLabel1">
            Add Plan
          </h4>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div className="modal-body">
          <form>
            <div className="row">
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  onChange={(e) => setimage(e.target.files[0])}
                  type="file"
                  required="required"
                  className="form-control"
                />
              </div>
              <div className="mb-3 col-md-12">
                <label className="form-label">Plan Title</label>
                <input
                  type="text"
                  value={planTitle}
                  onChange={(e) => setplanTitle(e.target.value)}
                  required="required"
                  className="form-control"
                />
              </div>
              <div className="mb-3 col-md-12">
                <label className="form-label">Plan Price Monthly</label>
                {inputPlanPrice.map((x, i) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <input
                        type="number"
                        placeholder="Currency"
                        value={planPricemonthly}
                        onChange={(e) => setplanPricemonthly(e.target.value)}
                        required="required"
                        className="form-control"
                      />
                      <input
                        type="number"
                        placeholder="price"
                        value={planPricemonthly}
                        onChange={(e) => setplanPricemonthly(e.target.value)}
                        required="required"
                        className="form-control"
                      />
                      <button
                        type="button"
                        className="btn plusBtn"
                        style={{ background: "#cf1818" }}
                        onClick={handlePlanPriceAddClick}
                      >
                        +
                      </button>
                    </div>
                  );
                })}
              </div>
              {/* <div className="mb-3 col-md-3">
											<label className="form-label">Plan Price yearly</label>
											<input type="number" value={planPriceYear} onChange={(e) => setplanPriceYear(e.target.value)} required="required" className="form-control" />
										</div> */}
              <div className="mb-3 col-md-12">
                <label className="form-label">
                  Friends And Family User Monthly
                </label>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <input
                    type="number"
                    placeholder="currency"
                    value={friendAndRelationsMonthly}
                    onChange={(e) =>
                      setfriendAndRelationsMonthly(e.target.value)
                    }
                    required="required"
                    className="form-control"
                  />
                  <input
                    type="number"
                    placeholder="price"
                    value={friendAndRelationsMonthly}
                    onChange={(e) =>
                      setfriendAndRelationsMonthly(e.target.value)
                    }
                    required="required"
                    className="form-control"
                  />
                  <button
                    type="button"
                    className="btn plusBtn"
                    style={{ background: "#cf1818" }}
                    onClick={handleAddClick}
                  >
                    +
                  </button>
                </div>
              </div>
              {/* <div className="mb-3 col-md-6">
							<label className="form-label">Friends And Family User Yearly</label>
							<input type="number" value={friendAndRelationsYearly} onChange={(e) => setfriendAndRelationsYearly(e.target.value)} required="required" className="form-control" />
						</div> */}
              <div className="col-md-12">
                <h5 className="mt-2 mb-3">Add Featured</h5>

                {inputList.map((x, i) => {
                  return (
                    <>
                      <div className="featuredList">
                        <div className="input-group mb-1">
                          <input
                            type="text"
                            required="required"
                            name="features"
                            value={x.features}
                            onChange={(e) => handleInputChange(e, i)}
                            className="form-control"
                            placeholder="Featured Name"
                          />

                          {i > 0 ? (
                            <button
                              type="button"
                              className="btn plusBtn removeFeatured"
                              onClick={() => handleRemoveClick(i)}
                            >
                              -
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn plusBtn"
                              style={{ background: "#cf1818" }}
                              onClick={handleAddClick}
                            >
                              +
                            </button>
                          )}
                        </div>
                        <div className="input-group mb-1">
                          <input
                            name="featureinfo"
                            value={x.featureinfo}
                            onChange={(e) => handleInputChange(e, i)}
                            type="text"
                            required="required"
                            className="form-control"
                            placeholder="Info Text"
                          />
                        </div>
                      </div>
                    </>
                  );
                })}

                {/* {inputList.map((x, i) => {
      return (
        <div className="box">
          <input
            name="firstName"
 placeholder="Enter First Name"
            value={x.firstName}
            onChange={e => handleInputChange(e, i)}
          />
          <input
            className="ml10"
            name="lastName"
 placeholder="Enter Last Name"
            value={x.lastName}
            onChange={e => handleInputChange(e, i)}
          />
          <div className="btn-box">
            {inputList.length !== 1 && <button
              className="mr10"
              onClick={() => handleRemoveClick(i)}>Remove</button>}
            {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
          </div>
        </div>
      );
    })}
    <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
                {/* <div className="featuredList">
												<div className="input-group mb-1">
													<input type="text" required="required" value={features?.['features0']} onChange={(e) => {handleFeature("features0",e.target.value)}} className="form-control" placeholder="Featured Name" />

													<button type="button" className="btn plusBtn" style={{ background: "#cf1818" }} onClick={handleClick}>
														+
													</button>
												</div>
												<div className="input-group mb-1">
													<input value={featureinfo?.['featuresinfo0']} onChange={(e) => {handleFeatureinfo("featuresinfo0",e.target.value)}} type="text" required="required" className="form-control" placeholder="Info Text" />
												</div>
											</div>
											{Array.from(Array(counter)).map((c, index) => {
												console.log(index)
												return <div className="featuredList">
													<div className="input-group mb-1">
														<input type="text" required="required" value={features?.[`features${index+1}`]} onChange={(e) => {handleFeature(`features${index+1}`,e.target.value)}} className="form-control" placeholder="Featured Name" />

														<button type="button" className="btn plusBtn removeFeatured" onClick={(e) => {removehandleClick(index)}}>
															-
														</button>
													</div>
													<div className="input-group mb-1">
														<input value={featureinfo?.[`featuresinfo${index+1}`]} onChange={(e) => {handleFeatureinfo(`featuresinfo${index+1}`,e.target.value)}} type="text" required="required" className="form-control" placeholder="Info Text" />
													</div>
												</div>
											})} */}
                {/* <div className="appendFeatured"></div> */}
              </div>
            </div>
          </form>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn submit_btn" onClick={addPlans}>
            Add Plan
          </button>
        </div>
      </div>
    </>
  );
};

export default Addplan;
