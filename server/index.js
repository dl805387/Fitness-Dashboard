const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    user: 'b90ad4917e5b76',
    host: 'us-cdbr-east-03.cleardb.com',
    password: 'e15cf7df',
    database: 'heroku_4f8a34eb5672695'
});






// this adds the user to the database with username
// user_id is generated automatically
app.post('/addUser', (req, res) => {
    const username = req.body.username;

    db.query('INSERT INTO users (username) VALUES (?)', [username], (err, result)=> {
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

    db.query("SELECT * FROM users WHERE username = ?", [username], (err, result) => {
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

    db.query('INSERT INTO workouts (userID, description, date) VALUES (?,?,?)', [userID, description, date], (err, result)=> {
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

    db.query("SELECT * FROM workouts WHERE userID = ? ORDER BY workoutID DESC", [userID], (err, result) => {
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

    db.query('UPDATE workouts SET description = ?, date = ? WHERE workoutID = ?', [description, date, workoutID], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

// updates weight training goal
app.put('/updateWtGoal', (req, res) => {
    const userID = req.body.userID;
    const wtGoal = req.body.wtGoal;

    db.query('UPDATE users SET wtGoal = ? WHERE userID = ?', [wtGoal, userID], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

// updates cardio goal
app.put('/updatecardioGoal', (req, res) => {
    const userID = req.body.userID;
    const cardioGoal = req.body.cardioGoal;

    db.query('UPDATE users SET cardioGoal = ? WHERE userID = ?', [cardioGoal, userID], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

// updates calories goal
app.put('/updateCalGoal', (req, res) => {
    const userID = req.body.userID;
    const calGoal = req.body.calGoal;

    db.query('UPDATE users SET calGoal = ? WHERE userID = ?', [calGoal, userID], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

// updates protein goal
app.put('/updateProteinGoal', (req, res) => {
    const userID = req.body.userID;
    const proteinGoal = req.body.proteinGoal;

    db.query('UPDATE users SET proteinGoal = ? WHERE userID = ?', [proteinGoal, userID], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

// updates nutrition intake
app.put('/updateIntake', (req, res) => {
    const userID = req.body.userID;
    const calIntake = req.body.calIntake;
    const carbIntake = req.body.carbIntake;
    const proteinIntake = req.body.proteinIntake;
    const fatIntake = req.body.fatIntake;


    db.query('UPDATE users SET calIntake = ?, carbIntake = ?, proteinIntake = ?, fatIntake = ? WHERE userID = ?', [calIntake, carbIntake, proteinIntake, fatIntake, userID], (err, result)=> {
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

    db.query('DELETE FROM workouts WHERE workoutID = ?', [workoutID], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});