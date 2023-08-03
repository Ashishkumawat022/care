import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
const CareSiteDetails = (props) => {
    const caresitedetails = props.details;
    return <>
        <div className="row">
            <div className="col-md-12 pe-3">
                <div className="card_inbox">
                    <div className="view_details">
                        <div className="float-end btns_head mb-3">
                        </div>
                        {caresitedetails.map((care, index) => {
                            return <><h5 className="tb_title">{index + 1}</h5>
                                <table className="table table-striped table_half">
                                    <tbody>
                                        <tr>
                                            <td>Company Name</td>
                                            <td>{care.companyName}</td>
                                        </tr>
                                        <tr>
                                            <td>Care Site Name</td>
                                            <td>{care.careSiteName}</td>
                                        </tr>
                                        <tr>
                                            <td>Care Site Type</td>
                                            <td>{care.carefacility}</td>
                                        </tr>
                                        <tr>
                                            <td>Add Pack</td>
                                            <td>{care.Addpack}</td>
                                        </tr>
                                        <tr>
                                            <td>No Of Users</td>
                                            <td>{care.NoOfuser}</td>
                                        </tr>
                                        <tr>
                                            <td>Current Subscription Plan</td>
                                            <td>{care.SubscriptionPlan}</td>
                                        </tr>
                                        <tr>
                                            <td>Total Beds</td>
                                            <td>{care.totalBeds}</td>
                                        </tr>
                                        <tr>
                                            <td>Trial Period</td>
                                            <td>{care.trialPeriod}</td>
                                        </tr>
                                    </tbody>
                                </table></>
                        })}

                    </div>
                </div>
            </div>
        </div>
    </>
}

export default CareSiteDetails;