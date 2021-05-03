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

    const [name, setName] = useState("");
    const [calories, setCalories] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);

    const [hasSearch, setHasSearch] = useState(false);

    const getNutrition = async () => {
        var url = "https://api.edamam.com/api/nutrition-data?app_id=" + APP_ID + "&app_key=" + APP_KEY + "&ingr=" + "1%20" + quantity + "%20" + food;

        try {
            return await axios.get(url).then(res => {
                setCalories(res.data.calories);
                setCarbs(parseFloat(res.data.totalNutrients.CHOCDF.quantity.toFixed(2)));
                setProtein(parseFloat(res.data.totalNutrients.PROCNT.quantity.toFixed(2)));
                setFat(parseFloat(res.data.totalNutrients.FAT.quantity.toFixed(2)));
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


    const [showChart, setShowChart] = useState(false);
    const [chart, setChart] = useState([]);

    const getChart = async (tcal, tc, tp, tf) => {

        const carbCalories = parseFloat((tc * 4).toFixed(2));
        const proteinCalories = parseFloat((tp * 4).toFixed(2));
        const fatCalories = parseFloat((tf * 9).toFixed(2));

        const percentCarb = ((tc * 4 * 100)/totalCal).toFixed(2) + "%";
        const percentProtein = ((tp * 4 * 100)/totalCal).toFixed(2) + "%";
        const percentFat = ((tf * 9 * 100)/totalCal).toFixed(2) + "%";

        const myChart = new QuickChart();
        myChart
        .setConfig({
            type:'doughnut',data:{labels:['Carbs ' + percentCarb,'Protein ' + percentProtein,'Fat ' + percentFat],
            datasets:[{data:[carbCalories,proteinCalories,fatCalories]}]},
            options:{plugins:{doughnutlabel:{labels:[{text:tcal,font:{size:20}},{text:'Total Calories'}]}}}
        })
        .setWidth(800)
        .setHeight(400)
        .setBackgroundColor('transparent');

        //setChart(myChart.getUrl());
        //setShowChart(true);
        setChart(<img src={myChart.getUrl()}></img>);
    }

    useEffect(() => {
        //setShowChart(true);
        console.log(totalCal);
        getChart(totalCal, totalCarb, totalProtein, totalFat);
    }, []);

    // to do
    // implement autocomplete

    // can data into db
    // show total nutrition intake
    // refresh button

    // need to find a way to track total intake

    // change color on chart
    // above chart, say Source of Calories

    // error handling for when emamam search turns out no good
    // figure out what to do with chart if user has nothing yet
    // in useeffect, you could do if else
    // if everything is null, then make a chart displaying an imported picture
    // you can do this with setChart

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



            {hasSearch && (
                <div>
                    <p>{name}</p>
                    <p>Calories {calories}</p>
                    <p>Carbs {carbs}</p>
                    <p>Protein {protein}</p>
                    <p>Fat {fat}</p>
                    <button onClick={e => {e.preventDefault(); updateIntake(); }}>Track</button>
                </div>
            )}

           <button>reset</button>




           <button onClick={e => {e.preventDefault(); getChart(); }}>chart</button>
           <button onClick={e => {e.preventDefault(); console.log(totalCal) }}>logs</button>

            {chart}
           {showChart && <img src={chart}></img>}

        </div>
    );
}

export default Nutrition;