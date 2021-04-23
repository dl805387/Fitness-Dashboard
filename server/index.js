const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

// database will only work if the server for this is running

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'w',
    database: 'exercises'
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const sets = req.body.sets;

    db.query('INSERT INTO exercises (name, sets) VALUES (?,?)', [name, sets], (err, result)=> {
        if (err) {
            console.log(err);
        } else {
            res.send("Values Inserted");
        }
    })
});

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
    db.query("SELECT * FROM exercises", (err, result) => {
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