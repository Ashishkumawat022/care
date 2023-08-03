import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';



const EditCareTeam = (props) => {
    let [editFormData, setEditFormData] = useState({
        first_Name: "",
        isEditProduct: true,
    });
    let [changeBtn, setchangeBtn] = useState(true);
    let [first_Name, setFirstName] = useState("");
    let [last_Name, setlast_Name] = useState("");
    let [qualification, setQualification] = useState("");
    let [DOB, setDOB] = useState("");
    let [location, setlocation] = useState("");
    let [mobileNo, setmobileNo] = useState("");
    let [email, setEmail] = useState("");
    let [marital_Status, setmarital_Status] = useState("");
    let [religion, setreligion] = useState("");
    let [citizenship, setCitizenship] = useState("");
    let [language, setLanguages] = useState("");
    let [wagesPerhour, setwagesPerhour] = useState("");
    let [overtimeRatetrigger, setovertimeRatetrigger] = useState("");
    let [overtimeRate, setovertimeRate] = useState("");
    let [generalAvailability, setGeneralAvailability] = useState([]);
    function editCareteamMember() {

        var data = JSON.stringify({
            'DOB': DOB,
            'email': email,
            'marital_Status': marital_Status,
            'religion': religion,
            'citizenship': citizenship,
            'language': language,
            'wagesPerhour': wagesPerhour,
            'overtimeRatetrigger': overtimeRatetrigger,
            'overtimeRate': overtimeRate,
            'first_Name': first_Name,
            'last_Name': last_Name,
            'qualification': qualification,
            'location': location,
            'mobileNo': mobileNo,
            'generalAvaliablity': [{ name: 'monday', value: mondaysFields, edit: true },
            { name: 'tuesday', value: tuesdaysFields, edit: true },
            { name: 'wednesday', value: wednesdaysFields, edit: true },
            { name: 'thrusday', value: thrusdaysFields, edit: true },
            { name: 'friday', value: fridaysFields, edit: true },
            { name: 'saturday', value: saturdaysFields, edit: true },
            { name: 'sunday', value: sundaysFields, edit: true }]
        });
        console.log(data);
        console.log(params.id)
        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_BASEURL}/editCareteamMember/${params.id}`,
            headers: {
                'Authorization': localStorage.getItem('care_admin_token'),
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                getCareTeambyId();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        getCareTeambyId();
    }, []);

    let params = useParams();
    function toggle() {
        setchangeBtn(wasOpened => !wasOpened);
    }

    const getCareTeambyId = () => {
        axios({
            url: `${process.env.REACT_APP_BASEURL}/careTeambyId?careteamId=${params.id}`,
            method: 'GET',
            headers: { Authorization: localStorage.getItem("care_admin_token") },
        })
            .then((res) => {
                let CareTeamData = res.data.careteamData;
                let gnability;

                if (res.data.careteamData.generalAvaliablity && res.data.careteamData.generalAvaliablity[0].edit) {
                    gnability = res.data.careteamData.generalAvaliablity
                    setmondaysfields(gnability[0].value)
                    settuesdaysfields(gnability[1].value)
                    setwednesdaysfields(gnability[2].value)
                    setthrusdaysfields(gnability[3].value)
                    setfridaysfields(gnability[4].value)
                    setsaturdaysfields(gnability[5].value)
                    setsundaysfields(gnability[6].value)
                } else {
                    gnability = JSON.parse(res.data.careteamData.generalAvaliablity)
                    setmondaysfields(gnability[0].value)
                    settuesdaysfields(gnability[1].value)
                    setwednesdaysfields(gnability[2].value)
                    setthrusdaysfields(gnability[3].value)
                    setfridaysfields(gnability[4].value)
                    setsaturdaysfields(gnability[5].value)
                    setsundaysfields(gnability[6].value)
                }

                setGeneralAvailability(gnability)
                setFirstName(CareTeamData.first_Name);
                setlast_Name(CareTeamData.last_Name);
                setQualification(CareTeamData.qualification);
                setDOB(CareTeamData.DOB);
                setlocation(CareTeamData.location);
                setmobileNo(CareTeamData.mobileNo);
                setEmail(CareTeamData.email);
                setmarital_Status(CareTeamData.marital_Status);
                setreligion(CareTeamData.religion);
                setCitizenship(CareTeamData.citizenship);
                setwagesPerhour(CareTeamData.wagesPerhour);
                setovertimeRatetrigger(CareTeamData.overtimeRatetrigger);
                setovertimeRate(CareTeamData.overtimeRate);
                setLanguages(CareTeamData.language);
                setEditFormData(CareTeamData);
            })
            .catch((error) => console.log(`Error: ${error}`));
    };

    // --------- Edit General Availability of Weeks from Care Team Members ---------- //
    // const [generalAvaliablity, setGeneralAvaliablity] = useState([])
    // -------------- Monday shifts timing ----------------- //
    const [mondaysfield, setmondaysfiled] = useState('')
    const [mondaysendfield, setmondaysendfiled] = useState('')
    const [mondaysFields, setmondaysfields] = useState([])


    const handlemondaysChange = (starttime, endtime) => {
        setmondaysfields(prev => [...prev, { starttime, endtime }])
        setmondaysfiled('')
    }

    const mondaysRemoveChangeHandler = (removeIdx) => {
        const clonefield = mondaysFields.slice();
        const data = clonefield.splice(removeIdx, 1)
        setmondaysfields(clonefield)
    }

    // -------------- Tuesday shifts timing ----------------- //
    const [tuesdaysfield, settuesdaysfiled] = useState('')
    const [tuesdaysendfield, settuesdaysendfiled] = useState('')
    const [tuesdaysFields, settuesdaysfields] = useState([])


    const handletuesdaysChange = (starttime, endtime) => {
        settuesdaysfields(prev => [...prev, { starttime, endtime }])
        settuesdaysfiled('')
    }

    const tuesdaysRemoveChangeHandler = (removeIdx) => {
        const clonefield = tuesdaysFields.slice();
        const data = clonefield.splice(removeIdx, 1)
        settuesdaysfields(clonefield)
    }

    // -------------- Wednesday shifts timing ----------------- //
    const [wednesdaysfield, setwednesdaysfiled] = useState('')
    const [wednesdaysendfield, setwednesdaysendfiled] = useState('')
    const [wednesdaysFields, setwednesdaysfields] = useState([])


    const handlewednesdaysChange = (starttime, endtime) => {
        setwednesdaysfields(prev => [...prev, { starttime, endtime }])
        setwednesdaysfiled('')
    }

    const wednesdaysRemoveChangeHandler = (removeIdx) => {
        const clonefield = wednesdaysFields.slice();
        const data = clonefield.splice(removeIdx, 1)
        setwednesdaysfields(clonefield)
    }

    // -------------- Thursday shifts timing ----------------- //
    const [thrusdaysfield, setthrusdaysfiled] = useState('')
    const [thrusdaysendfield, setthrusdaysendfiled] = useState('')
    const [thrusdaysFields, setthrusdaysfields] = useState([])


    const handlethrusdaysChange = (starttime, endtime) => {
        setthrusdaysfields(prev => [...prev, { starttime, endtime }])
        setthrusdaysfiled('')
    }

    const thrusdaysRemoveChangeHandler = (removeIdx) => {
        const clonefield = thrusdaysFields.slice();
        const data = clonefield.splice(removeIdx, 1)
        setthrusdaysfields(clonefield)
    }

    // -------------- Friday shifts timing ----------------- //
    const [fridaysfield, setfridaysfiled] = useState('')
    const [fridaysendfield, setfridaysendfiled] = useState('')
    const [fridaysFields, setfridaysfields] = useState([])


    const handlefridaysChange = (starttime, endtime) => {
        setfridaysfields(prev => [...prev, { starttime, endtime }])
        setfridaysfiled('')
    }

    const fridaysRemoveChangeHandler = (removeIdx) => {
        const clonefield = fridaysFields.slice();
        const data = clonefield.splice(removeIdx, 1)
        setfridaysfields(clonefield)
    }

    // -------------- Saturday shifts timing ----------------- //
    const [saturdaysfield, setsaturdaysfiled] = useState('')
    const [saturdaysendfield, setsaturdaysendfiled] = useState('')
    const [saturdaysFields, setsaturdaysfields] = useState([])


    const handlesaturdaysChange = (starttime, endtime) => {
        setsaturdaysfields(prev => [...prev, { starttime, endtime }])
        setsaturdaysfiled('')
    }

    const saturdaysRemoveChangeHandler = (removeIdx) => {
        const clonefield = saturdaysFields.slice();
        const data = clonefield.splice(removeIdx, 1)
        setsaturdaysfields(clonefield)
    }

    // -------------- Sunday shifts timing ----------------- //
    const [sundaysfield, setsundaysfiled] = useState('')
    const [sundaysendfield, setsundaysendfiled] = useState('')
    const [sundaysFields, setsundaysfields] = useState([])


    const handlesundaysChange = (starttime, endtime) => {
        setsundaysfields(prev => [...prev, { starttime, endtime }])
        setsundaysfiled('')
    }

    const sundaysRemoveChangeHandler = (removeIdx) => {
        const clonefield = sundaysFields.slice();
        const data = clonefield.splice(removeIdx, 1)
        setsundaysfields(clonefield)
    }

    return (<>
        <div className="row">
            <div className="col-md-6 pe-3">
                <div className="card_inbox">
                    <div className="view_details">
                        <div className="float-end btns_head mb-3">
                            {changeBtn ?
                                <button className="btn btn-theme btn-sm" type="button" onClick={toggle} disabled={props.Profileaccess}>Edit</button>
                                : <button className="btn btn-theme btn-sm" type="button" onClick={editCareteamMember}>Save</button>
                            }
                        </div>
                        <table className="table table-striped table_half">
                            <tbody>
                                <tr>
                                    <td>First Name</td>
                                    {changeBtn ?
                                        <td>{editFormData.first_Name}</td>
                                        : <td><input type="text" defaultValue={editFormData.first_Name} onChange={(e) => setFirstName(e.target.value)} name="first_Name" className="form-control form-control-sm" /></td>}
                                </tr>
                                <tr>
                                    <td>Last Name</td>
                                    {changeBtn ?
                                        <td>{editFormData.last_Name}</td>
                                        : <td><input type="text" defaultValue={editFormData.last_Name} onChange={(e) => setlast_Name(e.target.value)} className="form-control form-control-sm" /></td>}
                                </tr>
                                <tr>
                                    <td>Qualification</td>
                                    {changeBtn ?
                                        <td>{editFormData.qualification}</td>
                                        : <td><input type="text" defaultValue={editFormData.qualification} onChange={(e) => setQualification(e.target.value)} className="form-control form-control-sm" /></td>}
                                </tr>
                                <tr>
                                    <td>Date of Birth</td>
                                    {changeBtn ?
                                        <td>{editFormData.DOB}</td>
                                        : <td><input type="date" defaultValue={editFormData.DOB} onChange={(e) => setDOB(e.target.value)} className="form-control form-control-sm" /></td>}
                                </tr>
                                <tr>
                                    <td>Location</td>
                                    {changeBtn ?
                                        <td>{editFormData.location}</td>
                                        : <td><input type="text" defaultValue={editFormData.location} onChange={(e) => setlocation(e.target.value)} className="form-control form-control-sm" /></td>}
                                </tr>
                                <tr>
                                    <td>Contact Number</td>
                                    {changeBtn ?
                                        <td>{editFormData.mobileNo}</td>
                                        : <td><input type="number" defaultValue={editFormData.mobileNo} onChange={(e) => setmobileNo(e.target.value)} className="form-control form-control-sm" /></td>}
                                </tr>
                                <tr>
                                    <td>Email </td>
                                    {changeBtn ?
                                        <td>{editFormData.email}</td>
                                        : <td><input type="email" defaultValue={editFormData.email} onChange={(e) => setEmail(e.target.value)} className="form-control form-control-sm" /></td>}
                                </tr>
                                <tr>
                                    <td>Marital Status</td>
                                    {changeBtn ?
                                        <td>{editFormData.marital_Status}</td>
                                        : <td><input type="text" defaultValue={editFormData.marital_Status} onChange={(e) => setmarital_Status(e.target.value)} className="form-control form-control-sm" /></td>}
                                </tr>
                                <tr>
                                    <td>religion</td>
                                    {changeBtn ?
                                        <td>{editFormData.religion}</td>
                                        : <td><input type="text" defaultValue={editFormData.religion} onChange={(e) => setreligion(e.target.value)} className="form-control form-control-sm" /></td>}
                                </tr>
                                <tr>
                                    <td>Citizenship</td>
                                    {changeBtn ?
                                        <td>{editFormData.citizenship}</td>
                                        : <td><input type="text" defaultValue={editFormData.citizenship} onChange={(e) => setCitizenship(e.target.value)} className="form-control form-control-sm" /></td>}
                                </tr>
                                <tr>
                                    <td>Laguages</td>
                                    {changeBtn ?
                                        <td>{editFormData.language}</td>
                                        : <td><input type="text" defaultValue={editFormData.language} onChange={(e) => setLanguages(e.target.value)} className="form-control form-control-sm" /></td>}
                                    {/* <select className="form-select form-select-sm">
                                                   <option>English</option>
                                                   <option>Hindi</option>
                                                </select> */}
                                </tr>
                            </tbody>
                        </table>

                        {props.userType && <><h5 className="tb_title">Wages</h5>
                            <table className="table table-striped table_half">
                                <tbody>
                                    <tr>
                                        <td>Per Hour </td>
                                        {changeBtn ?
                                            <td>{editFormData.wagesPerhour}</td>
                                            : <td><input type="number" value={editFormData.wagesPerhour} onChange={(e) => setwagesPerhour(e.target.value)} className="form-control form-control-sm" /></td>}
                                    </tr>
                                    <tr>
                                        <td>Overtime rate trigger</td>
                                        {changeBtn ?
                                            <td>{editFormData.overtimeRatetrigger}</td>
                                            : <td><input type="number" value={editFormData.overtimeRatetrigger} onChange={(e) => setovertimeRatetrigger(e.target.value)} className="form-control form-control-sm" /></td>}
                                    </tr>
                                    <tr>
                                        <td>Overtime rate </td>
                                        {changeBtn ?
                                            <td>{editFormData.overtimeRate} x Base Rate</td>
                                            : <td><input type="number" value={editFormData.overtimeRate} onChange={(e) => setovertimeRate(e.target.value)} className="form-control form-control-sm" /></td>}
                                    </tr>
                                </tbody>
                            </table></>}
                    </div>
                </div>
            </div>
            <div className="col-md-6 ps-3">
                {/* changes by jitender "card_inbox" this class and div new added - 12/1/2022 */}
                <div className="card_inbox">
                    <div className="mb-4 btns_head">
                        <h5 className="tb_general_title mt-0">General Availability  <button className="btn btn-theme btn-sm" type="button" data-bs-toggle="modal" data-bs-target="#edit_team_member">Edit</button></h5>
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Week days</th>
                                <th>Shift timing</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generalAvailability.map((item, index) => {
                                console.log(item, "generalAvailability")
                                return <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>  {item.value.map((time) => {
                                        return <div>{time.starttime} - {time.endtime}</div>
                                    })}
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="modal fade" id="edit_team_member" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"> Edit General Availability</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    {/* Monday */}
                                    <div className="d-flex mb-3">
                                        <label className="form-label">Monday</label>
                                        <input
                                            className="form-control"
                                            placeholder=""
                                            type="time"
                                            value={mondaysfield}
                                            onChange={(e) => setmondaysfiled(e.target.value)}
                                        />
                                        <input
                                            className="form-control"
                                            placeholder=""
                                            type="time"
                                            value={mondaysendfield}
                                            onChange={(e) => setmondaysendfiled(e.target.value)}
                                        />
                                        <button className="btn theme_btn" onClick={() => { handlemondaysChange(mondaysfield, mondaysendfield) }}>Add</button>
                                    </div>

                                    {mondaysFields?.map((item, index) => {
                                        return <div key={index} className="pe-5 mb-3 position-relative">
                                            <input
                                                className="form-control"
                                                type="time"
                                                value={item.starttime}
                                                disabled
                                            />
                                            <input
                                                className="form-control"
                                                type="time"
                                                value={item.endtime}
                                                disabled
                                            />
                                            <button className="removeBtn" style={{ top: "3px" }} onClick={() => { mondaysRemoveChangeHandler(index) }}>
                                                -
                                            </button>
                                        </div>
                                    })}
                                    {/* Tuesday */}
                                    <div className="d-flex mb-3">
                                        <label className="form-label">Tuesday</label>
                                        <input
                                            className="form-control"
                                            placeholder=""
                                            type="time"
                                            value={tuesdaysfield}
                                            onChange={(e) => settuesdaysfiled(e.target.value)}
                                        />
                                        <input
                                            className="form-control"
                                            placeholder=""
                                            type="time"
                                            value={tuesdaysendfield}
                                            onChange={(e) => settuesdaysendfiled(e.target.value)}
                                        />
                                        <button className="btn theme_btn" onClick={() => { handletuesdaysChange(tuesdaysfield, tuesdaysendfield) }}>Add</button>
                                    </div>
                                    {tuesdaysFields?.map((item, index) => {
                                        return <div key={index} className="pe-5 mb-3 position-relative">
                                            <input
                                                className="form-control"
                                                type="time"
                                                value={item.starttime}
                                                disabled
                                            />
                                            <input
                                                className="form-control"
                                                type="time"
                                                value={item.endtime}
                                                disabled
                                            />
                                            <button className="removeBtn" style={{ top: "3px" }} onClick={() => { tuesdaysRemoveChangeHandler(index) }}>
                                                -
                                            </button>
                                        </div>
                                    })}
                                    {/* Wednesday */}
                                    <div className="d-flex mb-3">
                                        <label className="form-label">Wednesday</label>
                                        <input
                                            className="form-control"
                                            placeholder=""
                                            type="time"
                                            value={wednesdaysfield}
                                            onChange={(e) => setwednesdaysfiled(e.target.value)}
                                        />
                                        <input
                                            className="form-control"
                                            placeholder=""
                                            type="time"
                                            value={wednesdaysendfield}
                                            onChange={(e) => setwednesdaysendfiled(e.target.value)}
                                        />
                                        <button className="btn theme_btn" onClick={() => { handlewednesdaysChange(wednesdaysfield, wednesdaysendfield) }}>Add</button>
                                    </div>
                                    {wednesdaysFields?.map((item, index) => {
                                        return <div key={index} className="pe-5 mb-3 position-relative">
                                            <input
                                                className="form-control"
                                                type="time"
                                                value={item.starttime}
                                                disabled
                                            />
                                            <input
                                                className="form-control"
                                                type="time"
                                                value={item.endtime}
                                                disabled
                                            />
                                            <button className="removeBtn" style={{ top: "3px" }} onClick={() => { wednesdaysRemoveChangeHandler(index) }}>
                                                -
                                            </button>
                                        </div>
                                    })}
                                    {/* Thursday */}
                                    <div className="d-flex mb-3">
                                        <label className="form-label">Thursday</label>
                                        <input
                                            className="form-control"
                                            placeholder=""
                                            type="time"
                                            value={thrusdaysfield}
                                            onChange={(e) => setthrusdaysfiled(e.target.value)}
                                        />
                                        <input
                                            className="form-control"
                                            placeholder=""
                                            type="time"
                                            value={thrusdaysendfield}
                                            onChange={(e) => setthrusdaysendfiled(e.target.value)}
                                        />
                                        <button className="btn theme_btn" onClick={() => { handlethrusdaysChange(thrusdaysfield, thrusdaysendfield) }}>Add</button>
                                    </div>
                                    {thrusdaysFields?.map((item, index) => {
                                        return <div key={index} className="pe-5 mb-3 position-relative">
                                            <input
                                                className="form-control"
                                                type="time"
                                                value={item.starttime}
                                                disabled
                                            />
                                            <input
                                                className="form-control"
                                                type="time"
                                                value={item.endtime}
                                                disabled
                                            />
                                            <button className="removeBtn" style={{ top: "3px" }} onClick={() => { thrusdaysRemoveChangeHandler(index) }}>
                                                -
                                            </button>
                                        </div>
                                    })}
                                    {/* Friday */}
                                    <div className="d-flex mb-3">
                                        <label className="form-label">Friday</label>
                                        <input
                                            className="form-control"
                                            placeholder=""
                                            type="time"
                                            value={fridaysfield}
                                            onChange={(e) => setfridaysfiled(e.target.value)}
                                        />
                                        <input
                                            className="form-control"
                                            placeholder=""
                                            type="time"
                                            value={fridaysendfield}
                                            onChange={(e) => setfridaysendfiled(e.target.value)}
                                        />
                                        <button className="btn theme_btn" onClick={() => { handlefridaysChange(fridaysfield, fridaysendfield) }}>Add</button>
                                    </div>
                                    {fridaysFields?.map((item, index) => {
                                        return <div key={index} className="pe-5 mb-3 position-relative">
                                            <input
                                                className="form-control"
                                                type="time"
                                                value={item.starttime}
                                                disabled
                                            />
                                            <input
                                                className="form-control"
                                                type="time"
                                                value={item.endtime}
                                                disabled
                                            />
                                            <button className="removeBtn" style={{ top: "3px" }} onClick={() => { fridaysRemoveChangeHandler(index) }}>
                                                -
                                            </button>
                                        </div>
                                    })}
                                    {/* Saturday */}
                                    <div className="d-flex mb-3">
                                        <label className="form-label">Saturday</label>
                                        <input
                                            className="form-control"
                                            placeholder=""
                                            type="time"
                                            value={saturdaysfield}
                                            onChange={(e) => setsaturdaysfiled(e.target.value)}
                                        />
                                        <input
                                            className="form-control"
                                            placeholder=""
                                            type="time"
                                            value={saturdaysendfield}
                                            onChange={(e) => setsaturdaysendfiled(e.target.value)}
                                        />
                                        <button className="btn theme_btn" onClick={() => { handlesaturdaysChange(saturdaysfield, saturdaysendfield) }}>Add</button>
                                    </div>
                                    {saturdaysFields?.map((item, index) => {
                                        return <div key={index} className="pe-5 mb-3 position-relative">
                                            <input
                                                className="form-control"
                                                type="time"
                                                value={item.starttime}
                                                disabled
                                            />
                                            <input
                                                className="form-control"
                                                type="time"
                                                value={item.endtime}
                                                disabled
                                            />
                                            <button className="removeBtn" style={{ top: "3px" }} onClick={() => { saturdaysRemoveChangeHandler(index) }}>
                                                -
                                            </button>
                                        </div>
                                    })}
                                    {/* Sunday */}
                                    <div className="d-flex mb-3">
                                        <label className="form-label">Sunday</label>
                                        <input
                                            className="form-control"
                                            placeholder=""
                                            type="time"
                                            value={sundaysfield}
                                            onChange={(e) => setsundaysfiled(e.target.value)}
                                        />
                                        <input
                                            className="form-control"
                                            placeholder=""
                                            type="time"
                                            value={sundaysendfield}
                                            onChange={(e) => setsundaysendfiled(e.target.value)}
                                        />
                                        <button className="btn theme_btn" onClick={() => { handlesundaysChange(sundaysfield, sundaysendfield) }}>Add</button>
                                    </div>
                                    {sundaysFields?.map((item, index) => {
                                        return <div key={index} className="pe-5 mb-3 position-relative">
                                            <input
                                                className="form-control"
                                                type="time"
                                                value={item.starttime}
                                                disabled
                                            />
                                            <input
                                                className="form-control"
                                                type="time"
                                                value={item.endtime}
                                                disabled
                                            />
                                            <button className="removeBtn" style={{ top: "3px" }} onClick={() => { sundaysRemoveChangeHandler(index) }}>
                                                -
                                            </button>
                                        </div>
                                    })}

                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => { getCareTeambyId() }}>Close</button>
                            <button type="submit" data-bs-dismiss="modal" onClick={editCareteamMember} className="btn btn-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </>);
}

export default EditCareTeam;