import { useRouteMatch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { fetch5, fetchGet } from "../../Apis/commonApis";
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './overviewPage.module.css'

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&:before": {
        display: "none",
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === "dark"
            ? "rgba(255, 255, 255, .05)"
            : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function Notes(props) {
    const { careSiteId } = props;

    let { path, url } = useRouteMatch();
    const params = useParams();

    const [expanded, setExpanded] = useState("");
    const [allNotes, setAllNotes] = useState([]);
    const [addNote, setAddNote] = useState({
        careHomeId: "",
        title: "",
        notesData: "",
    });

    useEffect(() => {
        if (careSiteId) {
            getNotes();
            setAddNote((prevState) => {
                return { ...prevState, careHomeId: careSiteId }
            })
        }
    }, [careSiteId])


    const getNotes = async () => {
        let result = await fetchGet(`getNotes?careHomeId=${careSiteId}`);
        setAllNotes(result.data);
    };

    const createNote = async () => {
        const result = await fetch5(`createNotes`, addNote);
        if (result.status) {
            getNotes();
            setAddNote({
                careHomeId: careSiteId,
                title: "",
                notesData: "",
            });
        }
    };

    const deleteNote = async (Id) => {
        let noteIdArr = [];
        noteIdArr.push(Id);
        let noteIdsObj = { notesId: noteIdArr }
        const result = await fetch5(`deleteNotes`, noteIdsObj);
        if (result.status) getNotes();
    };

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    function deleteHandler(_id) {
        let confirm = window.confirm('Are You Sure!!');
        if (confirm) deleteNote(_id);
    }

    return (
        <>
            <div className="mt-2 border">
                <div className="mx-3 my-3">
                    <div className="mb-3">
                        <label htmlFor="Input1" className="form-label">
                            Note Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            value={addNote.title}
                            onChange={(e) =>
                                setAddNote({ ...addNote, title: e.target.value })
                            }
                            id="noteTitle"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Textarea1" className="form-label">
                            Note Description
                        </label>
                        <textarea
                            className="form-control"
                            value={addNote.notesData}
                            onChange={(e) =>
                                setAddNote({ ...addNote, notesData: e.target.value })
                            }
                            id="noteDesc"
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="btns_head">
                        <button type="submit" onClick={createNote} className="btn btn-theme btn-sm">
                            Add
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <h4>All Notes</h4>
                {allNotes.length > 0 ? allNotes.map(item => {
                    return <div key={item._id} className={`${styles.accordion}`}>
                        <Accordion
                            expanded={expanded === `${item._id}`}
                            onChange={handleChange(`${item._id}`)}
                        >
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <Typography>{item.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {item.notesData}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <div className={`${styles.deletebtn}`}>
                            <DeleteIcon onClick={(e) => deleteHandler(item._id)} />
                        </div>
                    </div>
                }) : <p>No Data Found</p>}
            </div>
        </>
    );
}
