import React, { useState, useEffect } from "react";
import Panel from './Panel';
import Goals from './Goals';
import Nutrition from './Nutrition';
import '../styles/Dashboard.css'
const axios = require('axios').default;

function Dashboard(props) {

    const {
        handleLogout,
        user
    } = props;

    const [userID, setUserID] = useState(0);
    const [wtGoal, setWtGoal] = useState("");
    const [cardioGoal, setCardioGoal] = useState("");
    const [calGoal, setCalGoal] = useState("");
    const [proteinGoal, setProteinGoal] = useState("");

    const [totalCal, setTotalCal] = useState(0);
    const [totalCarb, setTotalCarb] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalFat, setTotalFat] = useState(0);

    const [showNutri, setShowNutri] = useState(false);
    const [dogPic, setDogPic] = useState("");

    // Uses Dog CEO's dog API for user profile pic!
    const getDogPic = async () => {
        const res = await axios.get('https://dog.ceo/api/breeds/image/random');
        setDogPic(res.data.message);
    }

    useEffect(() => {
        // when user sign in, this will get the userID and other data
        if (user !== "") {
            axios.post('https://fitness-dashboard-dl.herokuapp.com/getUserInfo', {
                username: user.email
            }).then((res) => {
                setUserID(res.data[0].userID);

                if (res.data[0].wtGoal === null) {
                    setWtGoal("");
                } else {
                    setWtGoal(res.data[0].wtGoal);
                }
                
                if (res.data[0].cardioGoal === null) {
                    setCardioGoal("");
                } else {
                    setCardioGoal(res.data[0].cardioGoal);
                }

                if (res.data[0].calGoal === null) {
                    setCalGoal("");
                } else {
                    setCalGoal(res.data[0].calGoal);
                }
                
                if (res.data[0].proteinGoal === null) {
                    setProteinGoal("");
                } else {
                    setProteinGoal(res.data[0].proteinGoal);
                }
                
                setTotalCal(res.data[0].calIntake);
                setTotalCarb(res.data[0].carbIntake);
                setTotalProtein(res.data[0].proteinIntake);
                setTotalFat(res.data[0].fatIntake);
                setShowNutri(true);
                getDogPic();
            });
        }
    }, []);

    return (
        <div>

            <div className="horzDisplay">

                <div className="panelWGoal">
                    {userID !== 0 && (<Panel userID = {userID} />)}

                    <div className="goalSection">
                        <Goals 
                            userID = {userID} 
                            wtGoal = {wtGoal}
                            setWtGoal = {setWtGoal}
                            cardioGoal = {cardioGoal }
                            setCardioGoal = {setCardioGoal}
                            calGoal = {calGoal }
                            setCalGoal = {setCalGoal}
                            proteinGoal = {proteinGoal}
                            setProteinGoal = {setProteinGoal}
                        />
                    </div>
                </div>      

                <div className="nutritionWProfile">         
                    <div className="nutritionSection">
                        {showNutri && (<Nutrition 
                            userID = {userID} 
                            totalCal = {totalCal}
                            totalCarb = {totalCarb}
                            totalProtein = {totalProtein}
                            totalFat = {totalFat}
                            setTotalCal = {setTotalCal}
                            setTotalCarb = {setTotalCarb}
                            setTotalProtein = {setTotalProtein}
                            setTotalFat = {setTotalFat}
                        />)}
                    </div>

                    <div className="profile">
                        <div className="inner">
                            <p>Welcome, {user.email} </p>
                            <div>
                                {dogPic !== "" && (<img src={dogPic} alt="Profile Pic" className="profilePic"></img>)}
                            </div>
                            <button className="roundedBtn" onClick={()=> {handleLogout(); setUserID(0)}}>Logout</button>
                        </div>
                    </div>
                </div> 

            </div>

        </div>
    );
}

export default Dashboard;