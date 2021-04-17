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

app.get('/read', (req, res) => {
    db.query("SELECT * FROM exercises", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log("testing");
});