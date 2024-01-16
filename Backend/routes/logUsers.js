const express = require('express')
const router = express.Router();
const { client, startClient } = require('../connection.js')
const nodemailer = require('nodemailer');

const checkOTP = [];


router.get('/users/getclientLogin', (req, res) => {
    startClient.query(`Select * from users`, (err, result) => {
        if (!err) {
            res.send(result.rows);
        }
    });
    startClient.end;
})

router.post('/users/login', (req, res) => {
    const { email, password } = req.body;

    // Use parameterized query to prevent SQL injection
    startClient.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (err, result) => {
        // console.log(result);
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            const user = result.rows[0];
            // console.log(user);
            if (user) {
                // Store user information in the session
                req.session.user = user;
                req.session.save();
                res.send("Yes");
            } else {
                res.send('No');
            }
        }
    });
});

router.get('/users/logout', (req, res) => {
    req.session.destroy();
    res.send("User Logged Out");
})

function makeOTP(emailReceiver){
    checkOTP.push([mailVal, Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString()])
}

router.post('/users/generateOtp',(req,res)=>{
    const { emailReciever } = req.body;
    makeOTP(emailReciever);
    let devOtp = 0;
    checkOTP.map((ta) => {
        if (ta[0] === emailReciever) {
            devOtp = ta[1];
        }
    })

    const transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: 'xxxxx@outlook.com',
            pass: 'xxxxx'
        },
        tls: {
            rejectUnauthorized: false,
        }
    });
    const mailOptions = {
        from: 'xxxxx@outlook.com',
        to: emailReciever,
        subject: 'Verification from Metro',
        text: 'OTP is ' + devOtp
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error occurred:', error.message);
        } else {
            console.log('Email sent successfully!');
            console.log('Message ID:', info.messageId);
        }
    });
})

const verifyOtp=(emailReciever,otpReceived)=>{
    checkOTP.map((ta) => {
        if (ta[0] === emailReciever && ta[1] === otpReceived) {
            return true;
        }
    })
    return false;
}

router.put('/users/addUserDataSignUp', (req, res) => {
    if(verifyOtp(req.body.email,req.body.otp)){
        let idCount = 0;
        startClient.query(`SELECT * FROM users WHERE email = $1`,[req.body.email],(err,result)=>{
            if (err) {
                // console.error(err);
                res.status(500).send('Internal Server Error3');
                return;
            }
            if(result.rows.length > 0){
                res.send('Email already exists');
            }
            else{
                startClient.query(`SELECT * FROM users`, (err, result) => {
                    if (!err) {
                        const data = result.rows;
            
                        for (const item of data) {
                            if (item.id > idCount) {
                                idCount = item.id;
                            }
                        }
            
                        // Increment the idCount for a new user
                        idCount += 1;
            
                        const user = req.body;
                        // console.log(user);
            
                        let insertQuery = `INSERT INTO public.users(
                            id, name, email, password)
                            VALUES ('${idCount}','${user.name}', '${user.email}', '${user.password}')`;
            
                        startClient.query(insertQuery, (err, result) => {
                            if (!err) {
                                res.send('Insertion was successful')
                            } else {
                                // console.log(err);
                                res.send('Internal Server Error1');
                            }
                        });
                    } 
                    else{
                        // console.log(err);
                        res.send('Internal Server Error2');
                    }
                });
            }   
        })
    }
    else{
        res.send('Invalid Otp');
    }
});
module.exports = router;