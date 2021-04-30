import React, { useState, useEffect } from "react";
const axios = require('axios').default;

function Routine(props) {

    const {
        routineID,
        setRoutinePopup,
    } = props;


    return (
        <div className="popup">
            <div>
                {routineID}
            </div>
        </div>
    );
}

export default Routine;