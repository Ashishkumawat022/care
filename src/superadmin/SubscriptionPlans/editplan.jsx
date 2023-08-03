import React, { forwardRef, useImperativeHandle, useState } from "react";
import axios from "axios";



const Editplan = (popData) => {

    const [editplan, seteditplan] = useState("");
    const [editplanPricemonthly, seteditplanPricemonthly] = useState("");
    const [editplanPriceYear, seteditplanPriceYear] = useState("");
    const [editfriendAndRelationsMonthly, seteditfriendAndRelationsMonthly] = useState("");
    const [editfriendAndRelationsYearly, seteditfriendAndRelationsYearly] = useState("");
    const [editinputList, seteditinputList] = useState([{ features: "", featureinfo: "" }]);
    const [editimage, seteditimage] = useState("");


    const edithandleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...editinputList];
        list[index][name] = value;
        seteditinputList(list);
    };
    // handle click event of the Remove button

    const edithandleRemoveClick = (index) => {
        console.log(index)
        const list = [...editinputList];
        list.splice(index, 1);
        seteditinputList(list);
    };
    // handle click event of the Add button

    const edithandleAddClick = () => {
        seteditinputList([...editinputList, { features: "", featureinfo: "" }]);
    };
    return (<>
        <div className="modal-content">
            <div className="modal-header d-flex align-items-center">
                <h4 className="modal-title" id="exampleModalLabel1">Edit Plan</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body">
                <form>
                    <div className="row">
                        <div className="mb-3 col-md-12">
                            <div className="mb-3 col-md-6">
                                <div className="upload_img mb-3">
                                    <img alt="" src={popData?.image} className="fit_img" width="50px" height="50px" /><br />
                                    <input type="file" onChange={(e) => seteditimage(e.target.files[0])} className="mt-2" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3 col-md-6">
                            <label className="form-label">Plan Title</label>
                            <input defaultValue={popData?.planTitle} onChange={(e) => seteditplan(e.target.value)} type="text" required="required" className="form-control" />
                        </div>
                        <div className="mb-3 col-md-3">
                            <label className="form-label">Plan Price Monthly</label>
                            <input defaultValue={popData?.planPricemonthly} onChange={(e) => seteditplanPricemonthly(e.target.value)} type="number" required="required" className="form-control" />
                        </div>
                        <div className="mb-3 col-md-3">
                            <label className="form-label">Plan Price yearly</label>
                            <input defaultValue={popData?.planPriceYear} onChange={(e) => seteditplanPriceYear(e.target.value)} type="number" required="required" className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label className="form-label">Friends And Family User Monthly</label>
                            <input defaultValue={popData?.friendAndRelationsMonthly} onChange={(e) => seteditfriendAndRelationsMonthly(e.target.value)} type="number" required="required" className="form-control" />
                        </div>
                        <div className="mb-3 col-md-6">
                            <label className="form-label">Friends And Family User Yearly</label>
                            <input defaultValue={popData?.friendAndRelationsYearly} onChange={(e) => seteditfriendAndRelationsYearly(e.target.value)} type="number" required="required" className="form-control" />
                        </div>
                        <div className="col-md-12">
                            <h5 className="mt-2 mb-3">Add Featured</h5>

                            {editinputList?.map((x, i) => {

                                return (<>
                                    {popData.featureData?.map((element, index) => {
                                        console.log(element, index)
                                        return (<>
                                            <div className="featuredList">
                                                <div className="input-group mb-1">
                                                    <input type="text" required="required" name="features" value={element.features}
                                                        onChange={e => edithandleInputChange(e, i)} className="form-control" placeholder="Featured Name" />

                                                    {index > 0 ? <button type="button" className="btn plusBtn removeFeatured" onClick={() => edithandleRemoveClick(index)}>
                                                        -
                                                    </button>
                                                        : <button type="button" className="btn plusBtn" style={{ background: "#cf1818" }} onClick={edithandleAddClick}>
                                                            +
                                                        </button>
                                                    }
                                                </div>
                                                <div className="input-group mb-1">
                                                    <input name="featureinfo" value={element.featureinfo}
                                                        onChange={e => edithandleInputChange(e, i)} type="text" required="required" className="form-control" placeholder="Info Text" />
                                                </div>
                                            </div>
                                        </>)
                                    })}

                                </>)

                            })}

                            {/* <div className="featuredList">
                    <div className="input-group mb-1">
                        <input value="Unlimited Clients" type="text" required="required" className="form-control" placeholder="Featured Name" />
                        <button type="button" className="btn infoBtn">
                            <AiOutlineInfoCircle />
                        </button>
                        <button type="button" className="btn plusBtn">
                            +
                        </button>
                    </div>
                    <div className="input-group mb-1 d-none">
                        <input value="" type="text" required="required" className="form-control" placeholder="Info" />
                        <button type="button" className="btn plusBtn" style={{ background: "#cf1818" }}>
                            -
                        </button>
                    </div>
                </div>


                <div className="featuredList">
                    <div className="input-group mb-1">
                        <input value="Store Care Plan, Client & Care Team docs" type="text" required="required" className="form-control" placeholder="Featured Name" />
                        <button type="button" className="btn infoBtn">
                            <AiOutlineInfoCircle />
                        </button>
                        <button type="button" className="btn plusBtn" style={{ background: "#cf1818" }}>
                            -
                        </button>
                    </div>
                    <div className="input-group mb-1">
                        <input value="Store Care Plan, Client & Care Team docs Info" type="text" required="required" className="form-control" placeholder="Info" />
                        <button type="button" className="btn plusBtn">
                            -
                        </button>
                    </div>
                </div>


                <div className="featuredList">
                    <div className="input-group mb-1">
                        <input value="CareTeam App for iOS & Android" type="text" required="required" className="form-control" placeholder="Featured Name" />
                        <button type="button" className="btn infoBtn">
                            <AiOutlineInfoCircle />
                        </button>
                        <button type="button" className="btn plusBtn" style={{ background: "#cf1818" }}>
                            -
                        </button>
                    </div>
                    <div className="input-group mb-1 d-none">
                        <input value="" type="text" required="required" className="form-control" placeholder="Info" />
                        <button type="button" className="btn plusBtn">
                            -
                        </button>
                    </div>
                </div> */}

                        </div>
                    </div>
                </form>
            </div>

            <div className="modal-footer">
                <button type="button" className="btn submit_btn">Edit Plan</button>
            </div>
        </div>
    </>)
}
export default Editplan;