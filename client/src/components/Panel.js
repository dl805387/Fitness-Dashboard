import React, { useState, useEffect } from "react";
import Form from './Form';
import Routine from './Routine';
const axios = require('axios').default;

function Panel(props) {

    const {userID} = props;

    const [routines, setRoutines] = useState([]);
    const [formPopup, setFormPopup] = useState(false);
    const [routinePopup, setRoutinePopup] = useState(false);
    const [routineID, setRoutineID] = useState(0);


    useEffect(() => {
        // get workouts from databse that has the same userID
        axios.post('http://localhost:3001/getRoutines', {
            userID: userID
        }).then((res) => {
            setRoutines(res.data);
        });
    }, []);

    return (
        <div>
            <div>Workout Routines</div>

            <div className="scroll">
                {routines.map(x => {
                    return <div key = {x.routineID} onClick={e => {e.preventDefault(); setRoutineID(x.routineID); setRoutinePopup(true); }}>{x.name}</div>
                })}
            </div>

            <div className="labelPlusBtn">
                <label>Add Workout Routine</label>
                <button onClick={e => {e.preventDefault(); setFormPopup(true); }}>Plus</button>
            </div>

            {formPopup && <Form userID={userID} setFormPopup={setFormPopup} />}

            {routinePopup && <Routine routineID={routineID} setRoutinePopup={setRoutinePopup} />}
        </div>
    );
}

export default Panel;