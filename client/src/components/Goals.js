import React, { useState, useEffect } from "react";
import "./Fontawesomeicon.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Goals.css';
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
        if (editProtein) {
            setEditProtein(false);
        } else {
            setEditProtein(true);
        }
    }

    // maybe make bullseye bigger
    // also the icon like dumbbell bigger
    // placeholder for textarea

    return (
        <div>

            <div className="weightTraining goal">
                <div>
                    <p>Weight Training</p>
                    <div className="circle">
                        <FontAwesomeIcon icon="dumbbell" size="2x" className="icon" />
                    </div>
                </div>

                <div>
                    {editWt ? (
                        <div className="horzDisplay">       
                            <textarea className="textBox" onChange={e => {setWtGoal(e.target.value)}}></textarea>
                            <div>
                                <button onClick={e => {e.preventDefault(); updateWtGoal();}}>Update</button>
                            </div>
                        </div>
                    ) : (
                        <div className="horzDisplay">
                            <textarea className="textBox" defaultValue={wtGoal} readOnly></textarea> 
                            <div className="target">
                                <label className="white">Set Goal</label>
                                <FontAwesomeIcon icon="bullseye" size="2x" className="white" onClick={e => {e.preventDefault(); toggleEditWt();}} />
                            </div>
                        </div>
                    )}
                </div>
            </div>


            <div className="cardio goal">
                <div>
                    <p>Cardio</p>
                    <div className="circle">
                        <FontAwesomeIcon icon="heartbeat" size="2x"className="icon"  />
                    </div>
                </div>  

                <div>
                    {editCardio ? (
                        <div className="horzDisplay">
                            <textarea className="textBox" onChange={e => {setCardioGoal(e.target.value)}}></textarea>
                            <div>
                                <button onClick={e => {e.preventDefault(); updateCardioGoal();}}>Update</button>
                            </div>
                        </div>
                    ) : (
                        <div className="horzDisplay">
                            <textarea className="textBox" defaultValue={cardioGoal} readOnly></textarea> 
                            <div className="target">
                                <label className="white">Set Goal</label>
                                <FontAwesomeIcon icon="bullseye" size="2x" className="white" onClick={e => {e.preventDefault(); toggleEditCardio();}} />
                            </div>
                        </div>
                    )}
                </div>  
            </div>


            <div className="calories goal">
                <div>
                    <p>Calories</p>
                    <div className="circle">
                        <FontAwesomeIcon icon="hamburger" size="2x" className="icon" />
                    </div>
                </div>

                <div>
                    {editCal ? (
                        <div className="horzDisplay">
                            <textarea className="textBox" onChange={e => {setCalGoal(e.target.value)}}></textarea>
                            <div>
                                <button onClick={e => {e.preventDefault(); updateCalGoal();}}>Update</button>
                            </div>
                        </div>
                    ) : (
                        <div className="horzDisplay">
                            <textarea className="textBox" defaultValue={calGoal} readOnly></textarea> 
                            <div className="target">
                                <label className="white">Set Goal</label>
                                <FontAwesomeIcon icon="bullseye" size="2x" className="white" onClick={e => {e.preventDefault(); toggleEditCal();}} />
                            </div>
                        </div>
                    )}
                </div>
            </div>


            <div className="protein goal">
                <div>
                    <p>Protein</p>
                    <div className="circle">
                        <FontAwesomeIcon icon="drumstick-bite" size="2x" className="icon" />
                    </div>
                </div>  

                <div>
                    {editProtein ? (
                        <div className="horzDisplay">
                            <textarea className="textBox" onChange={e => {setProteinGoal(e.target.value)}}></textarea>
                            <div>
                                <button onClick={e => {e.preventDefault(); updateProteinGoal();}}>Update</button>
                            </div>
                        </div>
                    ) : (
                        <div className="horzDisplay">
                            <textarea className="textBox" defaultValue={proteinGoal} readOnly></textarea> 
                            <div className="target">
                                <label className="white">Set Goal</label>
                                <FontAwesomeIcon icon="bullseye" size="2x" className="white" onClick={e => {e.preventDefault(); toggleEditProtein();}} />
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

export default Goals;