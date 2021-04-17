import './App.css';
import React, { useState, useEffect } from "react";
const axios = require('axios').default;

function App() {

    const [name, setName] = useState("");
    const [sets, setSets] = useState(0);

    const [myList, setMyList] = useState([]);

    // create
    const addToDB = () => {
        axios.post('http://localhost:3001/create', {
            name: name,
            sets: sets
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

    // need to make one for update and delete

    return (
        <div className="App">
            <div className="form">
                <label>name</label>
                <input type="text" onChange={(e) => {setName(e.target.value)}}></input>

                <label>sets</label>
                <input type="number" onChange={(e) => {setSets(e.target.value)}}></input>

                <button onClick={()=> {console.log(name); console.log(sets); addToDB()}}>submit</button>

                <br></br>
                <button onClick={()=> {getList()}}>submit</button>

                <br></br>
                {myList.map(x => {
                    return <p key={x.id}>{x.name}</p>
                })}
            </div>
        </div>
    ); 
}

export default App;
