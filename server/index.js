const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const dbConfig = require("./config.js");
var connection = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

module.exports = connection;




// replace db with connection

// this adds the user to the database with username
// user_id is generated automatically
app.post('/addUser', (req, res) => {
    const username = req.body.username;

    connection.query('INSERT INTO users (username) VALUES (?)', [username], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

// gets the userID based on username
app.post('/getUserInfo', (req, res) => {
    const username = req.body.username;

    connection.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});



// add workout to db
app.post('/addWorkout', (req, res) => {
    const userID = req.body.userID;
    const description = req.body.description;
    const date = req.body.date;

    connection.query('INSERT INTO workouts (userID, description, date) VALUES (?,?,?)', [userID, description, date], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

// get workouts based on id
app.post('/getWorkouts', (req, res) => {
    const userID = req.body.userID;

    connection.query("SELECT * FROM workouts WHERE userID = ? ORDER BY workoutID DESC", [userID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// updates workout
app.put('/updateWorkout', (req, res) => {
    const workoutID = req.body.workoutID;
    const description = req.body.description;
    const date = req.body.date;

    connection.query('UPDATE workouts SET description = ?, date = ? WHERE workoutID = ?', [description, date, workoutID], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});






// delete workout
app.post('/deleteWorkout', (req, res) => {
    const workoutID = req.body.workoutID;

    connection.query('DELETE FROM workouts WHERE workoutID = ?', [workoutID], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});




app.get("/", (req, res) => {

    res.json({ message: "Welcome to Workout Journal!!" });

});



// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});