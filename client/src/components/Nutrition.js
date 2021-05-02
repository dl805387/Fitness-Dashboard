import React, { useState, useEffect } from "react";
const axios = require('axios').default;

// url for testing purposes
// https://api.edamam.com/api/nutrition-data?app_id=cb858920&app_key=23e79631876defaed65d9e35dd579c67&ingr=1%20large%20bagel

function Nutrition(props) {

    const {userID} = props;

    const APP_ID = "cb858920";
    const APP_KEY = "23e79631876defaed65d9e35dd579c67";

    const [food, setFood] = useState("");
    const [quantity, setQuantity] = useState("");

    const [name, setName] = useState("");
    const [calories, setCalories] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [protein, setProtein] = useState(0);

    const [hasSearch, setHasSearch] = useState(false);

    const getNutrition = async () => {
        var url = "https://api.edamam.com/api/nutrition-data?app_id=" + APP_ID + "&app_key=" + APP_KEY + "&ingr=" + "1%20" + quantity + "%20" + food;

        try {
            return await axios.get(url).then(res => {
                setCalories(res.data.calories);
                setCarbs(parseFloat(res.data.totalNutrients.CHOCDF.quantity.toFixed(2)));
                setProtein(parseFloat(res.data.totalNutrients.PROCNT.quantity.toFixed(2)));
                setName(food);
                setHasSearch(true);
                clear();
            });
        } catch (error) {
            console.error(error);
            clear();
        }
    }

    const clear = () => {
        setFood("");
        setQuantity("");
    }

    // Adds the nutrition intake to the db to get total
    const updateIntake = () => {

        // First gets the values of intake then updates the intake
        axios.post('http://localhost:3001/getIntake', {
            userID: userID
        }).then((res) => {
            axios.put('http://localhost:3001/updateIntake', {
                userID: userID,
                calIntake: calories + res.data[0].calIntake,
                carbIntake: carbs + res.data[0].carbIntake,
                proteinIntake: protein + res.data[0].proteinIntake
            }).then(() => {
                console.log("success");
            });            
        });
    }



    // to do
    // implement autocomplete

    // can data into db
    // show total nutrition intake
    // refresh button

    // need to find a way to track total intake

    return (
        <div>
            <div className="horzDisplay">
                <div>
                    <label>Food</label>
                    <input value={food} placeholder="ex: apple" onChange={e => {setFood(e.target.value)}}></input>
                </div>
                
                <div>
                    <label>Quantity</label>
                    <input value={quantity} placeholder="ex: small, large, cup" onChange={e => {setQuantity(e.target.value)}}></input>
                </div>

                <button onClick={e => {e.preventDefault(); getNutrition()}}>Search w/logo</button>
            </div>



            {hasSearch && (
                <div>
                    <p>{name}</p>
                    <p>Calories {calories}</p>
                    <p>Carbs {carbs}</p>
                    <p>Protein {protein}</p>
                    <button onClick={e => {e.preventDefault(); updateIntake(); }}>Track</button>
                </div>
            )}

           <button>reset</button>
        </div>
    );
}

export default Nutrition;