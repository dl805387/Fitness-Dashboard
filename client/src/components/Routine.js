import React, { useState, useEffect } from "react";
import Workout from './Workout';
const axios = require('axios').default;

function Routine(props) {

    const {
        routineID,
        setRoutinePopup,
    } = props;

    const [description, setDescription] = useState("")
    const [date, setDate] = useState("");
    const [workouts, setWorkouts] = useState([]);

    const [workoutList, setWorkoutList] = useState([]);

    const addWorkout = () => {
        axios.post('http://localhost:3001/addWorkout', {
            routineID: routineID,
            description: description,
            date: date
        }).then((res) => {
            console.log("success");
            // When a workout is added, it also gets added to the user interface
            setWorkoutList(workoutList.concat(  
                <Workout workoutID={res.data.insertId} description={description} date={date} routineID={routineID} key = {res.data.insertId} />
            ));
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




            <div className="scroll">
                {workoutList}
                {workouts.map(x=>{
                    return <Workout workoutID={x.workoutID} description={x.description} date={x.date} routineID={routineID} key = {x.workoutID} />
                })}             
            </div>
            

        </div>
    );
}

export default Routine;