import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import '../CareTeam/careteam.css';
import Moment from 'react-moment';
// import 'moment-timezone';
// import moment from 'moment';

const FriendsAndFamily = () => {
    useEffect(() => {
        getNotesbyCareteam();
    }, []);

    let params = useParams();
    // console.log(params);
    const [getFriendsAndFamilyNotes, setGetFriendsAndFamilyNotes] = useState([]);


    const getNotesbyCareteam = () => {
        axios({
            url: `${process.env.REACT_APP_BASEURL}/getActivityandwellbeingChart?clientId=${params.id}&type=client`,
            // url: `${process.env.REACT_APP_BASEURL}/getActivityandwellbeingChart?clientId=61c995fb05c16185bdf196ed&type=client`,

            method: 'GET',
            headers: { Authorization: localStorage.getItem("care_admin_token") },
        }).then((res) => {
            // console.log(res)
            let CareTeamData = res.data.getActivityData;
            // console.log("Client Friends and Family Notes Data", CareTeamData);

            setGetFriendsAndFamilyNotes(CareTeamData)
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

    return (
        <div className="card_inbox journal_card scroll_inside scroll-sidebar" style={{ maxHeight: "340px" }}>
            <h5>Friends & Family Notes</h5>
            {getFriendsAndFamilyNotes?.map((item, i) => {
                // console.log(item.createdAt.split('T')[1], "+++==++++===+++")

                return (<>
                    <div key={i.toString()}>
                        <div className="time_box">
                            <strong>    <Moment calendar={calendarStrings}>
                                {item.createdAt.split('T')[0]}
                            </Moment></strong> <br />
                            <Moment format="Do MMM YYYY">
                                {item.createdAt}
                            </Moment>
                        </div>
                        <ul >
                            <li key={i * 2}>
                                <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/profle.jpg`} />
                                <div className="body">
                                    <h5>{item.careTeamMember} <time><Moment date={item?.createdAt} trim format="LT" /></time></h5>
                                    <p>{item?.wellbeingAssessment?.notes}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </>);
            })}
        </div>
    )
}

export default FriendsAndFamily;