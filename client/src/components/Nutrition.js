import React, { useState, useEffect } from "react";
const axios = require('axios').default;
const QuickChart = require('quickchart-js');

// url for testing purposes
// https://api.edamam.com/api/nutrition-data?app_id=cb858920&app_key=23e79631876defaed65d9e35dd579c67&ingr=1%20large%20bagel

// use edamam and quickchart api
// put this in the readme

function Nutrition(props) {

    const {
        userID,
        totalCal,
        totalCarb,
        totalProtein,
        totalFat,
        setTotalCal,
        setTotalCarb,
        setTotalProtein,
        setTotalFat
    } = props;

    const APP_ID = "cb858920";
    const APP_KEY = "23e79631876defaed65d9e35dd579c67";

    const [food, setFood] = useState("");
    const [quantity, setQuantity] = useState("");
    const [error, setError] = useState(false);
    const [badSearch, setBadSearch] = useState(false);

    const [name, setName] = useState("");
    const [calories, setCalories] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);

    const [hasSearch, setHasSearch] = useState(false);
    const [chart, setChart] = useState([]);

    const getNutrition = async () => {
        if (food === "" || quantity === "") {
            setError(true);
            setHasSearch(false);
            return;
        }

        var url = "https://api.edamam.com/api/nutrition-data?app_id=" + APP_ID + "&app_key=" + APP_KEY + "&ingr=" + "1%20" + quantity + "%20" + food;

        try {
            return await axios.get(url).then(res => {
                if (res.data.calories === 0 && res.data.totalWeight === 0) {
                    clear();
                    setError(false);
                    setBadSearch(true);
                    setHasSearch(false);
                    return;
                }
                setCalories(res.data.calories);
                setCarbs(parseFloat(res.data.totalNutrients.CHOCDF.quantity.toFixed(2)));
                setProtein(parseFloat(res.data.totalNutrients.PROCNT.quantity.toFixed(2)));
                setFat(parseFloat(res.data.totalNutrients.FAT.quantity.toFixed(2)));
                setName(food);
                setHasSearch(true);
                clear();
                setError(false);
                setBadSearch(false);
            });
        } catch (error) {
            console.error(error);
            clear();
            setBadSearch(true);
            setHasSearch(false);
        }
    }

    const clear = () => {
        setFood("");
        setQuantity("");
    }

    // Updates the nutrition intake in the db
    const updateIntake = () => {

        axios.put('http://localhost:3001/updateIntake', {
            userID: userID,
            calIntake: calories + totalCal,
            carbIntake: carbs + totalCarb,
            proteinIntake: protein + totalProtein,
            fatIntake: fat + totalFat
        }).then(() => {
            console.log("success");
            // updates the chart
            getChart(calories + totalCal, carbs + totalCarb, protein + totalProtein, fat + totalFat);
            setTotalCal(calories + totalCal);
            setTotalCarb(carbs + totalCarb);
            setTotalProtein(protein + totalProtein);
            setTotalFat(fat + totalFat);
        });
    }

    const getChart = async (tCal, tc, tp, tf) => {

        const carbCalories = parseFloat((tc * 4).toFixed(2));
        const proteinCalories = parseFloat((tp * 4).toFixed(2));
        const fatCalories = parseFloat((tf * 9).toFixed(2));

        let percentCarb = "";
        let percentProtein = "";
        let percentFat = "";

        // cant divide by 0
        if (tCal !== 0) {
            percentCarb = ((tc * 4 * 100)/tCal).toFixed(2) + "%";
            percentProtein = ((tp * 4 * 100)/tCal).toFixed(2) + "%";
            percentFat = ((tf * 9 * 100)/tCal).toFixed(2) + "%";
        }


        const myChart = new QuickChart();
        myChart
        .setConfig({
            type:'doughnut',data:{labels:['Carbs ' + percentCarb,'Protein ' + percentProtein,'Fat ' + percentFat],
            datasets:[{data:[carbCalories,proteinCalories,fatCalories]}]},
            options:{plugins:{doughnutlabel:{labels:[{text:tCal,font:{size:20}},{text:'Total Calories'}]}}}
        })
        .setWidth(400)
        .setHeight(400)
        .setBackgroundColor('transparent');

        
        setChart(<img src={myChart.getUrl()} style={{width: "400px", height:"400px"}}></img>);
    }

    // reset total intake to 0
    const resetIntake = () => {

        axios.put('http://localhost:3001/updateIntake', {
            userID: userID,
            calIntake: 0,
            carbIntake: 0,
            proteinIntake: 0,
            fatIntake: 0
        }).then(() => {
            console.log("success");
            // updates the chart
            getChart(0, 0, 0, 0);
            setTotalCal(0);
            setTotalCarb(0);
            setTotalProtein(0);
            setTotalFat(0);
        });
    }

    useEffect(() => {
        if (totalCal !== null) {
            getChart(totalCal, totalCarb, totalProtein, totalFat);
        } else {
            getChart(0, 0, 0, 0);
        }
    }, []);

    // to do
    // implement autocomplete


    // change color on chart; use brighter colors so text will show well


    // change size of chart



    // replace need to fill out space with a different message
    // do this in nutrition and panel component
    // make the error messages red



    return (
        <div>
            <div className="horzDisplay">
                <div>
                    <label>Food</label>
                    <input value={food} placeholder="ex: apple" onChange={e => {setFood(e.target.value)}}></input>
                </div>
                
                <div>
                    <label>Quantity</label>
                    <input value={quantity} placeholder="ex: large, cup, 100grams" onChange={e => {setQuantity(e.target.value)}}></input>
                </div>

                <button onClick={e => {e.preventDefault(); getNutrition()}}>Search w/logo</button>
            </div>


            {error && <p>Need to fill out space</p>}
            {badSearch && <p>Could not find nutrition data</p>}

            {hasSearch && (
                <div>
                    <p>{name}</p>
                    <p>Calories {calories}</p>
                    <p>Carbs {carbs}</p>
                    <p>Protein {protein}</p>
                    <p>Fat {fat}</p>
                    <button onClick={e => {e.preventDefault(); updateIntake();}}>Track</button>
                </div>
            )}

            <h1>Source of Calories</h1>
            {chart}
            <button onClick={e => {e.preventDefault(); resetIntake();}}>Reset</button>

        </div>
    );
}

export default Nutrition;