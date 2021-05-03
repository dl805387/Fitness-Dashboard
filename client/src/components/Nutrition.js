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

    // Adds the nutrition intake to the db to get total
    const updateIntake = () => {

        // First gets the values of intake then updates the intake
        // axios.post('http://localhost:3001/getIntake', {
        //     userID: userID
        // }).then((res) => {
        //     axios.put('http://localhost:3001/updateIntake', {
        //         userID: userID,
        //         calIntake: calories + res.data[0].calIntake,
        //         carbIntake: carbs + res.data[0].carbIntake,
        //         proteinIntake: protein + res.data[0].proteinIntake,
        //         fatIntake: fat + res.data[0].fatIntake
        //     }).then(() => {
        //         console.log("success");
        //     });            
        // });

        axios.put('http://localhost:3001/updateIntake', {
            userID: userID,
            calIntake: calories + totalCalories,
            carbIntake: carbs + res.data[0].carbIntake,
            proteinIntake: protein + res.data[0].proteinIntake,
            fatIntake: fat + res.data[0].fatIntake
        }).then(() => {
            console.log("success");
        }); 
    }


    //
    const [showChart, setShowChart] = useState(false);
    const [chart, setChart] = useState("");
    const getChart = async () => {

        const myChart = new QuickChart();
        myChart
        .setConfig({
            type:'doughnut',data:{labels:['January','February','March','April','May'],datasets:[{data:[50,60,70,180,190]}]},
            options:{plugins:{doughnutlabel:{labels:[{text:'550',font:{size:20}},{text:'total'}]}}}
        })
        .setWidth(800)
        .setHeight(400)
        .setBackgroundColor('transparent');

        // Print the chart URL
        console.log(myChart.getUrl());

        setChart(myChart.getUrl());
        setShowChart(true);
        // setChart(
        //     chart.concat(  
        //         <img src={myChart.getUrl()}></img>
        //     )
        // );

        //setChart(true);
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
                    <p>Fat {fat}</p>
                    <button onClick={e => {e.preventDefault(); updateIntake(); }}>Track</button>
                </div>
            )}

           <button>reset</button>




           <button onClick={e => {e.preventDefault(); getChart(); }}>chart</button>

           {showChart && (<img src={chart}></img>)}
        </div>
    );
}

export default Nutrition;