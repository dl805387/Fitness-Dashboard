import React, { useState, useEffect } from "react";
const axios = require('axios').default;

function Routine(props) {

    const {
        routine_id,
        setRoutinePopup,
    } = props;


    return (
        <div className="popup">
            <div>
                {routine_id}
            </div>
        </div>
    );
}

export default Routine;