const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// database will only work if the server for this is running
// lets do a test
// it seems as if when you go to local host 3001 on browser, the database is connected
// if you dont go to localhost 3001, it dont
// just doing node index.js isnt enough
// next time try to see if database is working if you dont open 3001 in browser

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'w',
    database: 'fitnessDB'
});

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
    const reps = req.body.sets;

    db.query('INSERT INTO exercises (routine_id, name, sets, reps) VALUES (?,?,?,?)', [routine_id, name, sets, reps], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send("Values Inserted");
        }
    })
});

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

app.listen(3001, () => {
    console.log("testing");
});