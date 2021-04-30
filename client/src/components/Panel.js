import React, { useState, useEffect } from "react";
import Form from './Form';
import Routine from './Routine';
const axios = require('axios').default;

function Panel(props) {

    const {user_id} = props;

    const [routines, setRoutines] = useState([]);
    const [formPopup, setFormPopup] = useState(false);
    const [routinePopup, setRoutinePopup] = useState(false);
    const [routine_id, setRoutine_id] = useState(0);


    useEffect(() => {
        // get workouts from databse that has the same user id
        axios.post('http://localhost:3001/getRoutines', {
            user_id: user_id
        }).then((res) => {
            setRoutines(res.data);
        });
    }, []);

    return (
        <div>
            <div>Workout Routines</div>

            <div className="scroll">
                {routines.map(x => {
                    return <div key = {x.routine_id} onClick={e => {e.preventDefault(); setRoutine_id(x.routine_id); setRoutinePopup(true); }}>{x.name}</div>
                })}
            </div>

            <div className="labelPlusBtn">
                <label>Add Workout Routine</label>
                <button onClick={e => {e.preventDefault(); setFormPopup(true); }}>Plus</button>
            </div>

            {formPopup && <Form user_id={user_id} setFormPopup={setFormPopup} />}

            {routinePopup && <Routine routine_id={routine_id} setRoutinePopup={setRoutinePopup} />}
        </div>
    );
}

export default Panel;