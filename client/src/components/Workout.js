import React, { useState, useEffect } from "react";
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

    const updateWorkout = () => {
        axios.put('http://localhost:3001/updateWorkout', {
            workoutID: workoutID,
            description: editText,
            date: editDate
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


    // textarea need to change size if the text is long
    // either that or add a scroll affect
    // i think changes size is best


    // useEffect(() => {

    // }, []);

    return (
        <div>
            
            {edit ? (<> <textarea defaultValue={description} onChange={e => {setEditText(e.target.value)}} ></textarea> </>) : (<> <textarea defaultValue={description} readOnly></textarea> </>)}
            
            {edit ? (<> <input defaultValue={date} onChange={e => {setEditDate(e.target.value)}} ></input> </>) : (<> <input defaultValue={date} readOnly></input> </>)}

            

            <button onClick={e => {e.preventDefault(); toggleEdit()}}>edit</button>
            <button onClick={e => {e.preventDefault(); updateWorkout(); setEdit(false)}}>submit</button>
    
        </div>
    );
}

export default Workout;