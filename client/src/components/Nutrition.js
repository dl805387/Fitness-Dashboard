import React, { useState, useEffect } from "react";
import "./Fontawesomeicon.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../styles/Nutrition.css'
import Autocomplete from "./Autocomplete.js";
const axios = require('axios').default;
const QuickChart = require('quickchart-js');

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

    const [chart, setChart] = useState([]);

    // Uses Edamam's api to get nutrition data
    const getNutrition = async () => {
        if (food === "" || quantity === "") {
            setBadSearch(false);
            setError(true);
            return;
        }

        var url = "https://api.edamam.com/api/nutrition-data?app_id=" + APP_ID + "&app_key=" + APP_KEY + "&ingr=" + "1%20" + quantity + "%20" + food;

        try {
            return await axios.get(url).then(res => {
                if (res.data.calories === 0 && res.data.totalWeight === 0) {
                    clear();
                    setError(false);
                    setBadSearch(true);
                    return;
                }
                setCalories(res.data.calories);
                setCarbs(parseFloat(res.data.totalNutrients.CHOCDF.quantity.toFixed(2)));
                setProtein(parseFloat(res.data.totalNutrients.PROCNT.quantity.toFixed(2)));
                setFat(parseFloat(res.data.totalNutrients.FAT.quantity.toFixed(2)));
                setName(food);
                clear();
                setError(false);
                setBadSearch(false);
            });
        } catch (error) {
            //console.error(error);
            clear();
            setBadSearch(true);
        }
    }

    const clear = () => {
        setFood("");
        setQuantity("");
    }

    // Updates the nutrition intake in the db
    const updateIntake = () => {


        axios.put('https://fitness-dashboard-dl.herokuapp.com/updateIntake', {
            userID: userID,
            calIntake: calories + totalCal,
            carbIntake: carbs + totalCarb,
            proteinIntake: protein + totalProtein,
            fatIntake: fat + totalFat
        }).then(() => {
            //console.log("success");
            // updates the chart
            getChart(calories + totalCal, carbs + totalCarb, protein + totalProtein, fat + totalFat);
            setTotalCal(calories + totalCal);
            setTotalCarb(carbs + totalCarb);
            setTotalProtein(protein + totalProtein);
            setTotalFat(fat + totalFat);
        });
    }

    // Uses quick chart api to get pie chart
    const getChart = async (tCal, tc, tp, tf) => {

        // This will be the default chart data if user has not tracked any nutrition intake
        let percentCarb = 33.3;
        let percentProtein = 33.3;
        let percentFat = 33.3;

        // cant divide by 0
        if (tCal !== 0) {
            percentCarb = ((tc * 4 * 100)/tCal).toFixed(2);
            percentProtein = ((tp * 4 * 100)/tCal).toFixed(2);
            percentFat = ((tf * 9 * 100)/tCal).toFixed(2);
        }

        
        const myChart = new QuickChart();
        myChart
        .setConfig(
            {
                type: 'doughnut',
                data: {
                datasets: [
                    {
                    data: [percentCarb, percentProtein, percentFat],
                    backgroundColor: ['rgb(255, 159, 64)', 'rgb(247, 126, 126)', 'rgb(255, 205, 86)'],
                    },
                ],
                labels: ['Carbs', 'Protein', 'Fat'],
                },
                options: {
                    plugins: {
                        datalabels: {
                            display: true,
                            font: {
                                weight: 'bold',
                                size: 16,
                            },
                            formatter: (value) => {
                                return value + '%';
                            }
                        },
                        doughnutlabel: {
                            labels: [{
                                text: tCal,
                                font: {
                                    size: 30,
                                    weight: 'bold'
                                }
                            }, {
                                text: 'Total Calories'
                            }]
                        }
                    }
                }
            }
        )
        .setWidth(300)
        .setHeight(300)
        .setBackgroundColor('transparent');
  
        setChart(<img src={myChart.getUrl()} alt="Chart" style={{width: "350px", height:"350px"}}></img>);
    }

    // reset total intake to 0
    const resetIntake = () => {

        axios.put('https://fitness-dashboard-dl.herokuapp.com/updateIntake', {
            userID: userID,
            calIntake: 0,
            carbIntake: 0,
            proteinIntake: 0,
            fatIntake: 0
        }).then(() => {
            //console.log("success");
            // updates the chart
            getChart(0, 0, 0, 0);
            setTotalCal(0);
            setTotalCarb(0);
            setTotalProtein(0);
            setTotalFat(0);
        });
    }

    const tableTitle = () => {
        if (name === "") {
            return "Item";
        } else {
            return name;
        }
    }

    useEffect(() => {
        // if nutrition intakes are null or zero, then the chart will be generated with 0 total calories
        if (totalCal === null || (totalCal === 0 && totalCarb === 0 && totalProtein === 0 && totalFat === 0)) {
            getChart(0, 0, 0, 0);
        } else {
            getChart(totalCal, totalCarb, totalProtein, totalFat);
        }
    }, []);

    return (
        <div>
            <div className="horz">
                <div className="apiForm">
                    <div>
                        <label>Food</label>
                        <input className="inputStyle" value={food} type="text" placeholder="ex: cheesecake" onChange={e => {setFood(e.target.value)}}></input>
                    </div>
                    
                    <div>
                        <label>Quantity</label>
                        <Autocomplete 
                            suggestions={["small", "medium", "large", "cup", "pint", "quart", "gallon", "teaspoon", "tablespoon", "liter"]} 
                            quantity={quantity} 
                            setQuantity={setQuantity}
                        />
                    </div>

                    {error && <p className="error">need to fill out both fields</p>}
                    {badSearch && <p className="error">could not find nutrition data</p>}

                    <div className="labelAndIcon">
                        <div className="searchLabel">
                            <label>Search</label>
                        </div>
                        <FontAwesomeIcon icon="search-plus" size="2x" className="searchIcon" onClick={e => {e.preventDefault(); getNutrition()}} />
                    </div>
                </div>

                <div>
                    <table>
                        <tbody>
                            <tr>
                                <th>{tableTitle()}</th>
                            </tr>
                            <tr>
                                <td>Calories:<label className="quantity">{calories}</label></td>
                            </tr>
                            <tr>
                                <td>Carbs:<label className="quantity">{carbs}</label></td>
                            </tr>
                            <tr>
                                <td>Protein:<label className="quantity">{protein}</label></td>
                            </tr>
                            <tr>
                                <td>Fat:<label className="quantity">{fat}</label></td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="track">
                    <button className="trackBtn" onClick={e => {e.preventDefault(); updateIntake();}}>Track Nutrition</button>
                    </div>
                </div>
            </div>

            
            <div className="titleAndReset">
                <div>
                    <h2 className="chartTitle">Source of Calories</h2>
                </div>
                <div>
                    <button className="roundedBtn" onClick={e => {e.preventDefault(); resetIntake();}}>Reset</button>
                </div>
            </div>

            {chart}

        </div>
    );
}

export default Nutrition;