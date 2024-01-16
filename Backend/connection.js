const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5000,
    password: "ronak",
    database: "assignment"
})

const startClient=new Client({
    host: "localhost",
    user: "postgres",
    port: 5000,
    password: "ronak",
    database: "LoginSignUp"
})

module.exports = {
    client: client,
    startClient: startClient
};
