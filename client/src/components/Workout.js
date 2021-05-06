import React, { useState, useEffect } from "react";
import "./Fontawesomeicon.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const axios = require('axios').default;

function Workout(props) {

    const {
        workoutID,
        description,
        date,
    } = props;

    const [edit, setEdit] = useState(false);
    const [editText, setEditText] = useState(description);
    const [editDate, setEditDate] = useState(date);

    const [isDeleted, setIsDeleted] = useState(false);

    const updateWorkout = () => {
        axios.put('http://localhost:3001/updateWorkout', {
            workoutID: workoutID,
            description: editText,
            date: editDate
        }).then(() => {
            console.log("success");
        });
    }

    const deleteWorkout = () => {
        axios.post('http://localhost:3001/deleteWorkout', {
            workoutID: workoutID
        }).then(() => {
            console.log("success");
        });
    }

    // toggles the edit button
    const toggleEdit = () => {
        if (edit) {
            setEdit(false);
        } else {
            setEdit(true);
        }
    }

    // to do
    // replace edit button with save if user clicks on edit
    // add delete

    return (
        <div>

            {!isDeleted && 
                (<div>

                    {edit ? (
                        <div> 
                            <input className="inputDate" defaultValue={date} onChange={e => {setEditDate(e.target.value)}} ></input> 
                        </div>
                    ) : (
                        <div> 
                            <input className="inputDate" defaultValue={date} readOnly></input> 
                        </div>
                    )}


                    {edit ? (
                        <div>
                            <textarea className="inputLog" defaultValue={description} onChange={e => {setEditText(e.target.value)}} ></textarea> 
                        </div>
                    ) : (
                        <div> 
                            <textarea className="inputLog" defaultValue={description} readOnly></textarea> 
                        </div>
                    )} 

                    
                    <FontAwesomeIcon icon="edit" size="2x" className="whiteIcon" onClick={e => {e.preventDefault(); toggleEdit();}} />
                    <button className="whiteBtn" onClick={e => {e.preventDefault(); updateWorkout(); setEdit(false);}}>save</button>

                    <button onClick={e => {e.preventDefault(); deleteWorkout(); setIsDeleted(true);}}>delete</button>

                </div>)
            }
        </div>
    );
}

export default Workout;