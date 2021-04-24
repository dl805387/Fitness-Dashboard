import React, { useState, useEffect } from "react";
const axios = require('axios').default;

function Test(props) {

    const [name, setName] = useState("");

    const [myList, setMyList] = useState([]);

    const [exerciseName, setExerciseName] = useState("");
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);

    // might be able to use username to find id since username is unique

    // create
    const addToDB = () => {
        axios.post('http://localhost:3001/create', {
            name: name
        }).then(() => {
            console.log("success");
        });
    };

    // read
    const getList = () => {
        axios.get('http://localhost:3001/read').then((res) => {
            setMyList(res.data);
        });
    }

    // add routine
    // you need user id
    // this is just adding a routine with user id 1; this works
    // but you need to modify this by getting the user id
    // maybe find a way to put password into database and find id based on password
    const addRoutine = () => {
        axios.post('http://localhost:3001/routine', {
            user_id: 1
        }).then(() => {
            console.log("success");
        });
    };

    // add exercise
    // make sure to update this with user id
    const addExercise = () => {
        axios.post('http://localhost:3001/exercise', {
            routine_id: 1,
            name: exerciseName,
            sets: sets,
            reps: reps
        }).then(() => {
            console.log("success");
        });
    };

    // need to make one for update and delete

    // deletes exercise
    // this works but need to make this based on id instead of name if possible
    const deleteExercise = (exerciseName) => {
        axios.delete('http://localhost:3001/delete/' + exerciseName).then(() => {
            console.log("success");
        });
    };

    const updateExercise = () => {
        axios.put('http://localhost:3001/update', {
            name: exerciseName,
            sets: sets,
            reps: reps
        }).then(() => {
            console.log("success");
        });
    };

    return (
        <div className="App">
           <div className="form">
                <label>name</label>
                <input type="text" onChange={(e) => {setName(e.target.value)}}></input>

                <button onClick={()=> {console.log(name); addToDB()}}>submit</button>

                <br></br>
                <button onClick={()=> {getList()}}>show list</button>

                <br></br>
                {myList.map(x => {
                    return <p key={x.id}>{x.name}</p>
                })}
                <br></br>

                <button onClick={()=> {addRoutine()}}>click to add routine!</button>

                <br></br>
                <input type="text" onChange={(e) => {setExerciseName(e.target.value)}}></input>
                <input type="number" onChange={(e) => {setSets(e.target.value)}}></input>
                <input type="number" onChange={(e) => {setReps(e.target.value)}}></input>
                <button onClick={()=> {addExercise()}}>click to add exercise!</button>

                <br></br>
                <button onClick={()=> {deleteExercise(exerciseName)}}>delete!</button>

                <br></br>
                <button onClick={()=> {updateExercise()}}>update!</button>

                <br></br>
                <button onClick={()=> {props.handleLogout()}}>Logout</button>

            </div>
        </div>
    );
}

export default Test;