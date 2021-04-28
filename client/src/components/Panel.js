import React, { useState, useEffect } from "react";
const axios = require('axios').default;

function Panel(props) {

    const {user_id} = props;

    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        // get workouts from databse that has the same user id
        axios.post('http://localhost:3001/getWorkout', {
            user_id: user_id
        }).then((res) => {
            setWorkouts(res.data);
        });
    }, []);

    return (
        <div className="App">
            {/* A JSX comment */}
            {console.log(workouts)}
        </div>
    );
}

export default Panel;