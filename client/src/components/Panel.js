import React, { useState, useEffect } from "react";
import Workout from './Workout';
import "./Fontawesomeicon.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const axios = require('axios').default;

function Panel(props) {

    const {userID} = props;

    const [description, setDescription] = useState("")
    const [date, setDate] = useState("");

    const [workouts, setWorkouts] = useState([]);
    const [workoutList, setWorkoutList] = useState([]);

    const [error, setError] = useState(false);

    const addWorkout = () => {
        if (description === "" || date === "") {
            setError(true);
            return;
        }

        axios.post('http://localhost:3001/addWorkout', {
            userID: userID,
            description: description,
            date: date
        }).then((res) => {
            console.log("success");
            setWorkoutList(
                [].concat(  
                    <Workout workoutID={res.data.insertId} description={description} date={date} userID={userID} key = {res.data.insertId} />
                ).concat(workoutList)
            );
        });

        setDescription("");
        setError(false);
    }

    useEffect(() => {
        // get workouts
        axios.post('http://localhost:3001/getWorkouts', {
            userID: userID
        }).then((res) => {
            setWorkouts(res.data);
        });

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        setDate(today);
    }, []);

    // to do
    // make error message red

    // hide panel for mobile screen


    return (
        <div>
            <p>{"user id is " + userID}</p>

            <textarea value={description} onChange={e => {setDescription(e.target.value)}}></textarea>
            <input defaultValue={date} onChange={e => {setDate(e.target.value)}}></input>

            <div className="labelPlusBtn">
                <label>Log Workout</label>
                <FontAwesomeIcon icon="plus-square" size="2x" onClick={e => {e.preventDefault(); addWorkout();}} />
            </div>

            {error && <p>Need to fill out space</p>}



            <div className="scroll">
                {workoutList}
                {workouts.map(x=>{
                    return <Workout workoutID={x.workoutID} description={x.description} date={x.date} userID={userID} key = {x.workoutID} />
                })}             
            </div>

        </div>
    );
}

export default Panel;