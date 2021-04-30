import React, { useState, useEffect } from "react";
import Form from './Form';
const axios = require('axios').default;

function Panel(props) {

    const {user_id} = props;

    const [workouts, setWorkouts] = useState([]);
    const [popup, setPopup] = useState(false);

    // const addWorkout = () => {

    // }

    useEffect(() => {
        // get workouts from databse that has the same user id
        axios.post('http://localhost:3001/getWorkout', {
            user_id: user_id
        }).then((res) => {
            setWorkouts(res.data);
        });
    }, []);

    return (
        <div>
            <div>Workout Routines</div>
            <div className="scroll">
                {workouts.map(x => {
                    return <div key = {x.workout_id}>{x.name}</div>
                })}
            </div>
            <div className="labelPlusBtn">
                <label>Add Workout</label>
                <button onClick={e => {e.preventDefault(); setPopup(true)}}>Plus</button>
            </div>

            {popup && <Form user_id={user_id} />}
        </div>
    );
}

export default Panel;