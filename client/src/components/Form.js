import React, { useState, useEffect } from "react";
const axios = require('axios').default;

function Form(props) {

    const {
        user_id,
        setFormPopup
    } = props;

    const [name, setName] = useState("");

    const addRoutine = () => {
        axios.post('http://localhost:3001/addRoutine', {
            user_id: user_id,
            name: name
        }).then(() => {
            console.log("success");
        });
    }

    useEffect(() => {
        //
    }, []);

    // to do
    // when you add workout, it doesnt change in the panel
   

    return (
        <div className="popup">
            
            <p> {"this is popup with id " + user_id} </p>

            <div className="labelPlusBtn">
                <input value={name} onChange={e => {setName(e.target.value)}}></input>
                <label>Log Workout</label>
                <button onClick={e => {e.preventDefault(); addRoutine(); setFormPopup(false); }}>Plus</button>
            </div>



            <button onClick={e => {e.preventDefault(); setFormPopup(false); }}>Cancel</button>
            
        </div>
    );
}

export default Form;