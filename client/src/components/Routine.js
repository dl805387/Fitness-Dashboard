import React, { useState, useEffect } from "react";
const axios = require('axios').default;

function Routine(props) {

    const {
        routineID,
        setRoutinePopup,
    } = props;

    const [description, setDescription] = useState("")
    const [date, setDate] = useState("");
    const [workouts, setWorkouts] = useState([]);

    const addWorkout = () => {
        axios.post('http://localhost:3001/addWorkout', {
            routineID: routineID,
            description: description,
            date: date
        }).then(() => {
            console.log("success");
        });
    }

    const clear = () => {
        setDescription("");
        setDate("");
    }

    useEffect(() => {
        // get workouts
        axios.post('http://localhost:3001/getWorkouts', {
            routineID: routineID
        }).then((res) => {
            setWorkouts(res.data);
        });
    }, []);




    return (
        <div className="popup">
            <p>{routineID}</p>

            <textarea value={description} onChange={e => {setDescription(e.target.value)}}></textarea>
            <input value={date} onChange={e => {setDate(e.target.value)}}></input>

            <div className="labelPlusBtn">
                <label>Log Workout</label>
                <button onClick={e => {e.preventDefault(); addWorkout(); clear(); }}>Plus</button>
            </div>

            <button onClick={e => {e.preventDefault(); setRoutinePopup(false); }}>Cancel</button>

            {console.log(workouts)}



            <div className="scroll">
                <div className="ext-box">
                    <div className="int-box">
                    {workouts.map(x=>{
                        return <textarea key = {x.workoutID} defaultValue={x.description} ></textarea>
                    })}
                    </div>
                </div>
            </div>
            

        </div>
    );
}

export default Routine;