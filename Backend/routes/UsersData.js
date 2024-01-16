const express = require('express')
const router = express.Router();
const {client,startClient}=require('../connection.js')


router.get('/users/getclient', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

router.get('/users/getclient/:id', (req, res)=>{
    // console.log(req.params.id);
    client.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.post('/users/addUserData', (req, res) => {
    let idCount = 0;

    client.query(`SELECT * FROM users`, (err, result) => {
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
            console.log(user);

            let insertQuery = `INSERT INTO public.users(
                name, price, domain, program, registrations, description, placement, image, universityname, facultyprofile, "learningHours", certificate, eligibility, id)
                VALUES ('${user.name}', ${user.price}, '${user.domain}', '${user.program}', '${user.registrations}', '${user.description}','${user.placement}','${user.image}','${user.universityname}', '${user.facultyprofile}', '${user.learningHours}','${user.certificate}', '${user.eligibility}', ${idCount});`;

            client.query(insertQuery, (err, result) => {
                if (!err) {
                    res.send('Insertion was successful')
                } else {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
            });
        } else {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
    });
});


router.put('/users/updateclient/:id', (req, res) => {
    let user = req.body;
    let updateQuery = `UPDATE users
                       SET name='${user.name}', 
                           price=${user.price},
                           domain='${user.domain}',
                           program='${user.program}',
                           registrations='${user.registrations}',
                           description='${user.description}',
                           placement='${user.placement}',
                           image='${user.image}',
                           universityname='${user.universityname}',
                           facultyprofile='${user.facultyprofile}',
                           "learningHours"='${user.learningHours}',
                           certificate='${user.certificate}',
                           eligibility='${user.eligibility}'
                       WHERE id = ${user.id};`
  
    client.query(updateQuery, (err, result) => {
      if (!err) {
        res.json({ message: 'Update was successful' }); // Send a JSON response
      } else {
        console.log(err.message);
        res.status(500).json({ error: 'Internal Server Error' }); // Send a JSON error response
      }
    });
  });
  

router.delete('/users/deleteclient/:id', (req, res)=> {
    let insertQuery = `delete from users where id=${req.params.id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Deletion was successful')
        }
        else{ console.log("No Deletion") }
    })
    client.end;
})


module.exports = router;