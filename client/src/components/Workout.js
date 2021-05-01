import React, { useState, useEffect } from "react";
const axios = require('axios').default;

function Workout(props) {

    const {
        workoutID,
        description,
        date,
        routineID
    } = props;

    useEffect(() => {

    }, []);

    return (
        <div>
            
            <textarea defaultValue={description} ></textarea>
    
        </div>
    );
}

export default Workout;