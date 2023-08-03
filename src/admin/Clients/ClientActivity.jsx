import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';

const ClientActivity = () => {

    useEffect(() => {
        getNotesbyCareteam();
    }, []);

    let params = useParams();
    // console.log(params);
    const [getActivityData, setGetActivityData] = useState([]);


    const getNotesbyCareteam = () => {
        axios({
            // url: `${process.env.REACT_APP_BASEURL}/getActivityandwellbeingChart?clientId=61c995fb05c16185bdf196ed&type=client`,
            url: `${process.env.REACT_APP_BASEURL}/getActivityandwellbeingChart?clientId=${params.id}&type=client`,

            method: 'GET',
            headers: { Authorization: localStorage.getItem("care_admin_token") },
        }).then((res) => {
            // console.log(res, "getNotesbyCareteam")
            let activities = [];
            let CareTeamData = res.data.getActivityData?.forEach((activity) => {
                let activityArrForSingleShift = activity.shiftData.map((item, index) => {
                    return {
                        Date: item.Date,
                        careTeamId: { image: item.careTeamId.image },
                        careTeamMember: item?.careTeamMember,
                        startingTime: item?.startingTime,
                        endingTime: item?.endingTime,
                        wellbeingAssessment: item?.wellbeingAssessment,
                        Task: item?.Task,
                        forClient: item?.forClient
                    }
                });
                activities.push({ getAllActivityData: activityArrForSingleShift })
                // console.log("Client Activity Data", activityArrForSingleShift, activities);
            })

            // console.log("Client activities Data", activities);


            setGetActivityData(activities)
        }).catch((error) => console.log(`Error: ${error}`));
    }

    // const dateToFormat = '1976-04-19T12:59-0500';
    // const dateToFormat = new Date('1976-04-19T12:59-0500');
    // const start = moment().add(-7, 'm');
    // const date = new Date();
    const calendarStrings = {
        lastDay: '[Yesterday ]',
        sameDay: '[Today ]',
        nextDay: '[Tomorrow ]',
        lastWeek: '[last] dddd []',
        nextWeek: 'dddd []',
        sameElse: 'L'
    };
    const [data, setdata] = useState([
        {
            value: 1,
            Ctg: 'Personal Care',
            image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s1.svg`
        },
        {
            value: 2,
            Ctg: 'Health',
            image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s2.svg`
        },
        {
            value: 3,
            Ctg: 'Mobility',
            image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s3.svg`
        },
        {
            value: 4,
            Ctg: 'Diet',
            image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s4.svg`
        },
        {
            value: 5,
            Ctg: 'Companionship',
            image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s5.svg`
        },
        {
            value: 6,
            Ctg: 'PRN Meds',
            image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s6.svg`
        },
        {
            value: 7,
            Ctg: 'Housekeeping',
            image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s7.svg`
        },
        {
            value: 8,
            Ctg: 'Report Incident',
            image: `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s8.svg`
        },
    ]);

    return (
        <div className="card_inbox journal_card scroll_inside scroll-sidebar" style={{ maxHeight: "755px" }}>
            <h5>Activity</h5>
            {getActivityData.map((item, id) => {
                return <> {
                    item.getAllActivityData?.map((item, id) => {
                        // console.log(item, "+++==++++===+++")
                        return (<>
                            <div className="time_box">
                                <strong>  <Moment calendar={calendarStrings}>
                                    {item?.Date}
                                </Moment></strong> <br />
                                <Moment format="Do MMM YYYY">
                                    {item?.Date}
                                </Moment>
                            </div>
                            <ul>
                                <li className="align-items-center border-bottom">
                                    <img alt="" src={`${item?.careTeamId?.image == null ? `http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg` : item.careTeamId?.image}`} style={{ width: "40px", height: "40px" }} />
                                    <div className="body" style={{ width: "100%" }}>
                                        <h5 className="m-0">{item?.careTeamMember} <time>{item?.startingTime} - {item?.endingTime}</time></h5>
                                    </div>
                                </li>
                            </ul>
                            <ul className="activity_category">
                                {item?.wellbeingAssessment ? <li>
                                    <div className="left_activity">
                                        <h5>
                                            <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s9.svg`} />
                                            Wellbeing Assessment
                                        </h5>
                                        <p>Please complete at the end of each shift.</p>
                                    </div>
                                    <div className="right_activity">
                                        <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/reset.svg`} />
                                        <label className="checkbox">
                                            <input type="checkbox" checked={item?.wellbeingAssessment ? true : false} />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </li> : ''}

                                {item?.Task?.map((task, index) => {
                                    return (
                                        <li key={index}>
                                            <div className="left_activity">
                                                <h5>
                                                    {data?.map((images, i) => {

                                                        // console.log(images, index, "12345678909876532389")
                                                        if (images?.Ctg == task?.taskName?.trim()) {
                                                            // console.log(images?.image, "==========>>>>>>>>>>")
                                                            return <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s${images?.value}.svg`} />
                                                        }
                                                    })}
                                                    {/* <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s1.svg`} /> */}
                                                    {task?.taskName} <span>{task?.taskType}</span>
                                                </h5>
                                                <p>Please assist {item?.forClient} with the {task?.taskType === 'Bathing' ? 'Bath' : task?.taskType}.</p>
                                            </div>
                                            <div className="right_activity">
                                                <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/reset.svg`} />
                                                <label className="checkbox">
                                                    <input type="checkbox" checked={task?.status === true ? true : false} />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </div>
                                        </li>
                                    )
                                })}

                            </ul>
                        </>);
                    })
                }</>

            })}
        </div>
    )
}

export default ClientActivity;

{/* <li>
    <div className="left_activity">
        <h5>
            <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s3.svg`} />
            Mobility <span>Toileting Assist</span>
        </h5>
        <p>Please assist Margaret with Toileting. </p>
    </div>
    <div className="right_activity">
        <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/reset.svg`} />
        <label className="checkbox">
            <input type="checkbox" />
            <span className="checkmark"></span>
        </label>
    </div>
</li> 

<li>
    <div className="left_activity">
        <h5>
            <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/s10.svg`} />
            Medication Reminder
        </h5>
        <p>Margarets medication Azithromycin is due at 7am. Please pass her the meds.</p>
    </div>
    <div className="right_activity">
        <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/reset.svg`} />
        <label className="checkbox">
            <input type="checkbox" />
            <span className="checkmark"></span>
        </label>
    </div>
</li>  */}