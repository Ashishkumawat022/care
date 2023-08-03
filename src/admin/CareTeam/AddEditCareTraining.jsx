import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

const AddEditCareTraining = (props) => {

    function trainingEvent(items) {
        console.log(items)
        setEditTraining(items)
        setTeamtraningId(items._id);
        setEdittrainingName(items.trainingName);
        seteditTrainingType(items.type);
        setEditTraniningCreationDate(items.creationDate);
        setEdittrainingDate(items.trainingDate);
        setEditattendence(items.attendence)
    }
    const [editTraining, setEditTraining] = useState([]);
    const [edittrainingid, setTeamtraningId] = useState("");
    const [edittrainingName, setEdittrainingName] = useState("");
    const [edittrainingType, seteditTrainingType] = useState("");
    const [editcreationDate, setEditTraniningCreationDate] = useState("");
    const [edittrainingDate, setEdittrainingDate] = useState("");
    const [editattendance, setEditattendence] = useState("");
    function editTrainingapi() {
        var data = JSON.stringify({
            'training_id': edittrainingid,
            'trainingName': edittrainingName,
            'type': edittrainingType,
            'creationDate': editcreationDate,
            'trainingDate': edittrainingDate,
            'attendence': editattendance
        });
        console.log(data)
        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_BASEURL}/editTraining/${params.id}`,
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


    const [editTrainingData, setEditTrainingData] = useState([]);
    const [trainingName, setTrainingName] = useState("");
    const [trainingType, setTrainingType] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [trainingDate, setTrainingDate] = useState("");
    const [attendance, setAttendance] = useState("");
    function createTraining() {
        var data = JSON.stringify({
            'trainingName': trainingName,
            'type': trainingType,
            'creationDate': creationDate,
            'trainingDate': trainingDate,
            'attendence': attendance
        });

        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_BASEURL}/createTraining/${params.id}`,
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
    console.log(params);


    const getCareTeambyId = () => {
        axios({
            url: `${process.env.REACT_APP_BASEURL}/careTeambyId?careteamId=${params.id}`,
            method: 'GET',
            headers: { Authorization: localStorage.getItem("care_admin_token") },
        })
            .then((res) => {
                let CareTeamData = res.data.careteamData;
                console.log(CareTeamData);
                setEditTrainingData(CareTeamData.Tranining);
            })
            .catch((error) => console.log(`Error: ${error}`));
    };

    return (<>
        <div className="row">
            <div className="col-md-12">
                <div className="btns_head">
                    <h5 className="tb_title mt-0"> <button className=" mb-4 btn btn-theme btn-sm float-end" data-bs-toggle="modal" data-bs-target="#add_training" disabled={props.Trainingsaccess}>Add Training</button></h5>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Training Name</th>
                            <th>Type</th>
                            <th>Creation Date</th>
                            <th>Training Date</th>
                            <th>Attendance</th>
                            <th>File</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {editTrainingData?.map(function (items, index) {
                            console.log(items, index);
                            return <tr key={index}>
                                <td>{items.trainingName}</td>
                                <td>{items.type}</td>
                                <td>{items.creationDate}</td>
                                <td>{items.trainingDate}</td>
                                <td>{items.attendence}</td>
                                <td>
                                    <NavLink to="" className="action_edit">
                                        <img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/file.svg`} />
                                    </NavLink>
                                </td>
                                <td>
                                    <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit_training" disabled={props.Trainingsaccess} onClick={() => trainingEvent(items)}><img alt="" src={`http://careplatform-react.s3-website.ap-south-1.amazonaws.com/images/edit.svg`} /></button>
                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>

                <div className="modal fade" id="add_training" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Training</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Training Name</label>
                                        <input type="text" value={trainingName} onChange={(e) => setTrainingName(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Type</label>
                                        <input type="text" value={trainingType} onChange={(e) => setTrainingType(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Creation Date</label>
                                        <input type="date" value={creationDate} onChange={(e) => setCreationDate(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Training Date</label>
                                        <input type="date" value={trainingDate} onChange={(e) => setTrainingDate(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Attendance</label>
                                        <select value={attendance} onChange={(e) => setAttendance(e.target.value)} className="form-select">
                                            <option defaultValue>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={createTraining}>Add Training</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="modal fade" id="edit_training" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Training</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <input type="hidden" value={editTraining._id} onChange={(e) => setTeamtraningId(e.target.value)} className="form-control" />
                                        <label className="form-label">Training Name</label>
                                        <input type="text" defaultValue={editTraining.trainingName} onChange={(e) => setEdittrainingName(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Type</label>
                                        <input type="text" defaultValue={editTraining.type} onChange={(e) => seteditTrainingType(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Creation Date</label>
                                        <input type="date" defaultValue={editTraining.creationDate} onChange={(e) => setEditTraniningCreationDate(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Training Date</label>
                                        <input type="date" defaultValue={editTraining.trainingDate} onChange={(e) => setEdittrainingDate(e.target.value)} className="form-control" />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label className="form-label">Attendance</label>
                                        <select defaultValue={editTraining.attendence} onChange={(e) => setEditattendence(e.target.value)} className="form-select">
                                            <option defaultValue>Yes</option>
                                            <option>No</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={editTrainingapi}>Edit Training</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default AddEditCareTraining;