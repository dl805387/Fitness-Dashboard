import React, { useState, useEffect } from "react";
const axios = require('axios').default;

function Goals(props) {

    const {
        userID,
        wtGoal,
        setWtGoal,
        cardioGoal,
        setCardioGoal,
        calGoal,
        setCalGoal,
        proteinGoal,
        setProteinGoal
    } = props;

    // These states tells if the user has clicked on set goal button to edit
    const [editWt, setEditWt] = useState(false);
    const [editCardio, setEditCardio] = useState(false);
    const [editCal, setEditCal] = useState(false);
    const [editProtein, setEditProtein] = useState(false);

    const updateWtGoal = () => {
        axios.put('http://localhost:3001/updateWtGoal', {
            userID: userID,
            wtGoal: wtGoal,
        }).then(() => {
            console.log("success");
            toggleEditWt()
        });
    }

    const updateCardioGoal = () => {
        axios.put('http://localhost:3001/updatecardioGoal', {
            userID: userID,
            cardioGoal: cardioGoal,
        }).then(() => {
            console.log("success");
            toggleEditCardio()
        });
    }

    const updateCalGoal = () => {
        axios.put('http://localhost:3001/updateCalGoal', {
            userID: userID,
            calGoal: calGoal,
        }).then(() => {
            console.log("success");
            toggleEditCal()
        });
    }

    const updateProteinGoal = () => {
        axios.put('http://localhost:3001/updateProteinGoal', {
            userID: userID,
            proteinGoal: proteinGoal,
        }).then(() => {
            console.log("success");
            toggleEditProtein()
        });
    }

    // toggles the edit button
    const toggleEditWt = () => {
        if (editWt) {
            setEditWt(false);
        } else {
            setEditWt(true);
        }
    }

    const toggleEditCardio = () => {
        if (editCardio) {
            setEditCardio(false);
        } else {
            setEditCardio(true);
        }
    }

    const toggleEditCal = () => {
        if (editCal) {
            setEditCal(false);
        } else {
            setEditCal(true);
        }
    }

    const toggleEditProtein = () => {
        if (editCardio) {
            setEditProtein(false);
        } else {
            setEditProtein(true);
        }
    }


    return (
        <div>
            <div>
                <p>Weight Training</p>
                <p>logo</p>
                
                {editWt ? (
                    <textarea onChange={e => {setWtGoal(e.target.value)}}></textarea>
                ) : (
                    <textarea defaultValue={wtGoal} readOnly></textarea> 
                )}
                
                {editWt ? (
                    <button onClick={e => {e.preventDefault(); updateWtGoal(); }}>Update</button>
                ) : (
                    <button onClick={e => {e.preventDefault(); toggleEditWt()}}>Set Goal</button>
                )}
            </div>

            <div>
                <p>Cardio</p>
                <p>logo</p>
                
                {editCardio ? (
                    <textarea onChange={e => {setCardioGoal(e.target.value)}}></textarea>
                ) : (
                    <textarea defaultValue={cardioGoal} readOnly></textarea> 
                )}
                
                {editCardio ? (
                    <button onClick={e => {e.preventDefault(); updateCardioGoal(); }}>Update</button>
                ) : (
                    <button onClick={e => {e.preventDefault(); toggleEditCardio()}}>Set Goal</button>
                )}
            </div>

            <div>
                <p>Calories</p>
                <p>logo</p>
                
                {editCal ? (
                    <textarea onChange={e => {setCalGoal(e.target.value)}}></textarea>
                ) : (
                    <textarea defaultValue={calGoal} readOnly></textarea> 
                )}
                
                {editCal ? (
                    <button onClick={e => {e.preventDefault(); updateCalGoal(); }}>Update</button>
                ) : (
                    <button onClick={e => {e.preventDefault(); toggleEditCal()}}>Set Goal</button>
                )}
            </div>

            <div>
                <p>Protein</p>
                <p>logo</p>
                
                {editProtein ? (
                    <textarea onChange={e => {setProteinGoal(e.target.value)}}></textarea>
                ) : (
                    <textarea defaultValue={proteinGoal} readOnly></textarea> 
                )}
                
                {editProtein ? (
                    <button onClick={e => {e.preventDefault(); updateProteinGoal(); }}>Update</button>
                ) : (
                    <button onClick={e => {e.preventDefault(); toggleEditProtein()}}>Set Goal</button>
                )}
            </div>

        </div>
    );
}

export default Goals;