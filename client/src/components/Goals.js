import React, { useState, useEffect } from "react";
const axios = require('axios').default;

function Goals(props) {

    const {userID} = props;

    const [wtText, setWtText] = useState("");
    const [cardioText, setCardioText] = useState("");
    const [calText, setCalText] = useState("");
    const [proteinText, setProteinText] = useState("");

    const updateWtGoal = () => {
        axios.put('http://localhost:3001/updateWtGoal', {
            userID: userID,
            wtText: wtText,
        }).then(() => {
            console.log("success");
        });
    }

    const updatecardioGoal = () => {
        axios.put('http://localhost:3001/updatecardioGoal', {
            userID: userID,
            cardioText: cardioText,
        }).then(() => {
            console.log("success");
        });
    }

    const updateCalGoal = () => {
        axios.put('http://localhost:3001/updateCalGoal', {
            userID: userID,
            calText: calText,
        }).then(() => {
            console.log("success");
        });
    }

    const updateProteinGoal = () => {
        axios.put('http://localhost:3001/updateProteinGoal', {
            userID: userID,
            proteinText: proteinText,
        }).then(() => {
            console.log("success");
        });
    }


    return (
        <div>
            <p>Weight Training</p>
            <p>logo</p>
            <textarea onChange={e => {setWtText(e.target.value)}}></textarea>
            <button onClick={e => {e.preventDefault(); updateWtGoal(); }}>Set Goal</button>

            <p>Cardio</p>
            <p>logo</p>
            <textarea onChange={e => {setCardioText(e.target.value)}}></textarea>
            <button onClick={e => {e.preventDefault(); updatecardioGoal(); }}>Set Goal</button>

            <p>Calories</p>
            <p>logo</p>
            <textarea onChange={e => {setCalText(e.target.value)}}></textarea>
            <button onClick={e => {e.preventDefault(); updateCalGoal(); }}>Set Goal</button>

            <p>Protein</p>
            <p>logo</p>
            <textarea onChange={e => {setProteinText(e.target.value)}}></textarea>
            <button onClick={e => {e.preventDefault(); updateProteinGoal(); }}>Set Goal</button>
        </div>
    );
}

export default Goals;