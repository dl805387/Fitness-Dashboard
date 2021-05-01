const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// to use nodemon, type this in terminal: nodemon index.js
// when you save, nodemon will restart the server

// need to start mysql server first
// mysql.server start
// maybe find a way to add this to script in package.json

// update comments when done

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'w',
    database: 'fitnessDB'
});

//

app.post('/create', (req, res) => {
    const name = req.body.name;

    db.query('INSERT INTO users (name) VALUES (?)', [name], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send("Values Inserted");
        }
    })
});

// adding routine to db
app.post('/routine', (req, res) => {
    const user_id = req.body.user_id;

    db.query('INSERT INTO routines (user_id) VALUES (?)', [user_id], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send("Values Inserted");
        }
    })
});

// add exercise to db
app.post('/exercise', (req, res) => {
    const routine_id = req.body.routine_id;
    const name = req.body.name;
    const sets = req.body.sets;
    const reps = req.body.reps;

    db.query('INSERT INTO exercises (routine_id, name, sets, reps) VALUES (?,?,?,?)', [routine_id, name, sets, reps], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send("Values Inserted");
        }
    })
});

// deletes exercise based on exercise name
// we would want to update this based on exercise id in the future
// find a way to delete all the exercises associated with the routine
app.delete('/delete/:exerciseName', (req, res) => {
    const name = req.params.exerciseName;

    db.query('DELETE FROM exercises WHERE name = ?', [name], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send("Values Inserted");
        }
    })
});

// updates exercise by changing the sets and reps
// this finds the exercise by name
// change to exercise id later
app.put('/update', (req, res) => {
    const name = req.body.name;
    const sets = req.body.sets;
    const reps = req.body.reps;

    db.query('UPDATE exercises SET sets = ?, reps = ? WHERE name = ?', [sets, reps, name], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send("Values Inserted");
        }
    })
});

// we need a delete for routine
// need update for exercise (sets, reps) but not update for routine


// app.post('/create', (req, res) => {
//     const name = req.body.name;
//     const sets = req.body.sets;

//     db.query('INSERT INTO exercises (name, sets) VALUES (?,?)', [name, sets], (err, result)=> {
//         if (err) {
//             console.log(err);
//         } else {
//             res.send("Values Inserted");
//         }
//     })
// });

// I believe we are inserting things into the database by using req
// The req.body determines what we insert into db
// So creating another route is a good way to have different post methods




//!important
// you need to find a way to pass the user into this file
// user name or user id; need a way to know who is logged in
// Here is an idea: maybe in app.get, use req 
// this is because req is whats comming out of axios request
// this may not work, not sure

app.get('/read', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

// On the front end, you could prolly do axios get a different route
// so on here, maybe do app.get('/name) that does another query









// code above is for testing

// this is the real stuff
// SELECT user_id FROM fitnessDB.users WHERE name = 'danny';
// this is for read when trying to get user id
// we get id by saying where username = email



// this adds the user to the database with username
// user_id is generated automatically
// this code is good. dont need to change unless you want to add more column to user table
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
// this works!
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


app.listen(3001, () => {
    console.log("listening on localhost:3001");
});


// so far get routines is in reverse order
// decide if you want it to be in reverse order