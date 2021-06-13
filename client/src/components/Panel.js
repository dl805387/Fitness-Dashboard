import React, { useState, useEffect } from "react";
import Workout from './Workout';
import "./Fontawesomeicon.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Panel.css';
const axios = require('axios').default;

function Panel(props) {

    const {userID} = props;

    const [description, setDescription] = useState("")
    const [date, setDate] = useState("");

    const [workouts, setWorkouts] = useState([]);
    const [workoutList, setWorkoutList] = useState([]);

    const [error, setError] = useState(false);

    // add workout to database
    const addWorkout = () => {
        if (description === "" || date === "") {
            setError(true);
            return;
        }

        axios.post('https://workout-journal-dl.herokuapp.com/addWorkout', {
            userID: userID,
            description: description,
            date: date
        }).then((res) => {
            //console.log("success");
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
        // get workouts from database
        axios.post('https://workout-journal-dl.herokuapp.com/getWorkouts', {
            userID: userID
        }).then((res) => {
            setWorkouts(res.data);
        });

        // find today's date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        setDate(today);
    }, []);

    return (
        <div className="panel">
            <div className="topPanel">
                <input className="inputDate" defaultValue={date} onChange={e => {setDate(e.target.value)}}></input>
                <textarea className="inputLog" value={description} placeholder="Type in your workout and log it!" onChange={e => {setDescription(e.target.value)}}></textarea>

                {error && <p className="error">field is empty</p>}

                <div className="labelPlusBtn">
                    <label className="logLabel">Log Workout</label>
                    <FontAwesomeIcon icon="plus-square" size="2x" className="icon" onClick={e => {e.preventDefault(); addWorkout();}} />
                </div>
            </div>


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