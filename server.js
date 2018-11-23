const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const fs = require("fs");


const app = express();

const port = process.env.PORT || 4000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



var path = "app/src/images";



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

app.get('/getImage', (req, res) => {
    fs.readdir(path, function (err, items) {
        console.log("image send")
        res.send(items);
    });
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

app.get('/secret_santa', (req, res) => {
    let query = "select * from user"
    
    connection.query(query, (err, results) => {
        results.forEach(async (result) => {
            if (result.Target == null){
                let query_2 = "CALL setSecret(" + result.ID + ");"
                connection.query(query_2, (err_2, results_2) => {})
            }
        });
        connection.query(query, (err, results) => {
            results.forEach(result => {
                let query = "select * from user where id ="+ result.Target
                connection.query(query, (err_2, results_2) => { 
                    console.log(result.NAME + " will gift something to "+results_2[0].NAME+ ". email is send to "+result.Email)
                    const mailOptions = {
                        from: 'secret.santa.assign2018@gmail.com',
                        to: result.Email,
                        subject: "Open for your Secret Santa Assignment",
                        text: "Hello " + result.NAME + "! You will be gifting to " + results_2[0].NAME + ". The limit is $20. Happy Gifting!"
                    }
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log ('Email sent: ' + info.response)
                        }
                    })
                })
            });
        })
    })
});

const transporter = nodemailer.createTransport("smtps://secret.santa.assign2018@gmail.com:" + encodeURIComponent("secretsanta") + "@smtp.gmail.com:465")



app.listen(port, () => console.log(`Listening on port ${port}`));
