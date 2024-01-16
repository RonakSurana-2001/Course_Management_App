const {client,startClient} = require('./connection.js')
const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.local || 3300

// Use express-session middleware
app.use(session({
    secret: 'yourSecretKey', // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to true if using HTTPS
  }));  

app.use(express.json());
var cors = require('cors')
app.use(cors())
app.use('/auth', require('./routes/UsersData'));
app.use('/log',require('./routes/logUsers'))


app.listen(port, ()=>{
    console.log("Sever is now listening at port 3300");
})

/* Registration Part Start Here */

startClient.connect();
client.connect();
// module.exports = app;