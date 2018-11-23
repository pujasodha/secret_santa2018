const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'secret_santa',
    port: '8889'
})

    connection.connect(err => {
        if (err) {
            respond = err
        }
    })

app.get('/users', (req, res) => {
});


app.post('/createUser', (req, res) => {
    let addingUser = 'CALL addUser("' + req.body.name + '","' + req.body.email + '");'
    if (req.body.name == "" && req.body.email == "") {
        return;
    }

    connection.query(addingUser, (err, results) => {
        let respond = results
        if (err) {
            respond = err
        }
        res.send(respond)
    })
});

app.post('/secret_santa', (req, res) => {

});



app.listen(port, () => console.log(`Listening on port ${port}`));
