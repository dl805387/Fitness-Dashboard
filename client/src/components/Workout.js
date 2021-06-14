import React, { useState } from "react";
import "./Fontawesomeicon.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Workout.css';
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

    // update workout description in database
    const updateWorkout = () => {
        axios.put('https://workout-journal-dl.herokuapp.com/updateWorkout', {
            workoutID: workoutID,
            description: editText,
            date: editDate
        }).then(() => {
            //console.log("success");
        });
    }

    // remove workout from database
    const deleteWorkout = () => {
        axios.post('https://workout-journal-dl.herokuapp.com/deleteWorkout', {
            workoutID: workoutID
        }).then(() => {
            //console.log("success");
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

    
    return (
        <div>
            {!isDeleted && 
                (<div>
                    {edit ? (
                        <div> 
                            <input className="inputDate" defaultValue={date} onChange={e => {setEditDate(e.target.value)}} ></input> 
                            <textarea className="inputLog" defaultValue={description} onChange={e => {setEditText(e.target.value)}} ></textarea>
                            <div className="editWDelete">
                                <button className="whiteBtn" onClick={e => {e.preventDefault(); updateWorkout(); setEdit(false);}}>save</button>
                                <FontAwesomeIcon icon="trash-alt" size="2x" className="icon trash" onClick={e => {e.preventDefault(); deleteWorkout(); setIsDeleted(true);}} />
                            </div>
                        </div>
                    ) : (
                        <div> 
                            <input className="inputDate" defaultValue={date} readOnly></input> 
                            <textarea className="inputLog" defaultValue={description} readOnly></textarea> 
                            <div className="editWDelete">
                                <FontAwesomeIcon icon="edit" size="2x" className="icon" onClick={e => {e.preventDefault(); toggleEdit();}} />
                                <FontAwesomeIcon icon="trash-alt" size="2x" className="icon trash" onClick={e => {e.preventDefault(); deleteWorkout(); setIsDeleted(true);}} />
                            </div>
                        </div>
                    )}
                </div>)
            }
        </div>
    );
}

export default Workout;