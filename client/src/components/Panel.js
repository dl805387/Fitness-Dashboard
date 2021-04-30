import React, { useState, useEffect } from "react";
import Routine from './Routine';
const axios = require('axios').default;

function Panel(props) {

    const {userID} = props;

    const [routines, setRoutines] = useState([]);
    const [routinePopup, setRoutinePopup] = useState(false);
    const [routineID, setRoutineID] = useState(0);

    // This is used to add workout routine to the panel when a routine is added to database
    const [routineList, setRoutineList] = useState([]);

    const [name, setName] = useState("");


    // add routine to database and set the routineID
    const addRoutine = () => {
        axios.post('http://localhost:3001/addRoutine', {
            userID: userID,
            name: name
        }).then((res) => {
            console.log("success");
            // When a workout routine is added, it also gets added to the user interface
            setRoutineList(routineList.concat(  
                <div key = {res.data.insertId} 
                onClick={e => {e.preventDefault(); setRoutineID(res.data.insertId); setRoutinePopup(true); }}
                >{name}</div>
            ));
            setName("");
        });
    }

    useEffect(() => {
        // get workouts from databse that has the same userID
        axios.post('http://localhost:3001/getRoutines', {
            userID: userID
        }).then((res) => {
            setRoutines(res.data);
        });
    }, []);

    // to do
    // cant submit empty input field


    return (
        <div>
            <div>Workout Routines</div>


            <div className="scroll">
                {routineList}
                {routines.map(x => {
                    return <div key = {x.routineID} onClick={e => {e.preventDefault(); setRoutineID(x.routineID); setRoutinePopup(true); }}>{x.name}</div>
                })}
            </div>


            <input value={name} onChange={e => {setName(e.target.value)}} ></input>
            <div className="labelPlusBtn">
                <label>Add Workout Routine</label>
                <button onClick={e => {e.preventDefault(); addRoutine(); }}>Plus</button>         
            </div>

            


            {routinePopup && <Routine routineID={routineID} setRoutinePopup={setRoutinePopup} />}
        </div>
    );
}

export default Panel;