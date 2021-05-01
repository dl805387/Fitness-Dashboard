import React, { useState, useEffect } from "react";
import Panel from './Panel';
import Goals from './Goals';
const axios = require('axios').default;

function Dashboard(props) {

    const {
        handleLogout,
        user
    } = props;

    const [userID, setUserID] = useState(0);

    useEffect(() => {
        // when user sign in, this will get the userID
        if (user !== "") {
            axios.post('http://localhost:3001/getID', {
                username: user.email
            }).then((res) => {
                setUserID(res.data[0].userID);
            });
        }
    }, []);

    return (
        <div>
            <button onClick={()=> {handleLogout(); setUserID(0)}}>Logout</button>
            <p>Welcome, {user.email} </p>

            <div className="horzDisplay">
                {userID !== 0 && (<Panel userID = {userID} />)}
                <Goals userID = {userID} />
            </div>
        </div>
    );
}

export default Dashboard;