const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors())

const testData = {
    name: 'John Doe',
    age: '30',
    account_balance: '15.5'
  }

app.get('/', (req, res)=> {
    res.send(testData)
})

const db = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '$DOM07sql',
    database: 'nimsa',
    port: "3306"
});

app.post('/register', (req, res)=> {

    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const matric = req.body.matric;
    const medics = req.body.medicalcollege;
    const password = req.body.password;

    db.query("INSERT INTO login (id,name,email,matric,medicalcollege,password) VALUES(?,?,?,?,?,?)", [id, name, email, matric, medics, password], (err, result) => {
        if (err) {
            console.log(err)
            res.send({ err: err})
        }
        console.log('New User Created')
    })
})

// app.post('/signin', (req, response)=> {
//     const email = request.body.email;
//     const password = request.body.password;
//     if (id && password) {
//         db.query('SELECT * FROM login WHERE email = ? AND password = ?', [email, password], (error, results, fields)=> {
//             if (results.length > 0) {
//                 req.session.loggedin = true;
//                 req.session.username = username;
//                 response.redirect('/home')
//                 console.log('Login details correct')
//             } else {
//                 response.send('Incorrect ID and/or Password!')
//             }
//             response.end();
//         });
//     } else {
//         response.send('Please enter ID and Password!');
//         response.end()
//     }
// });

app.post("/login", (req, res) => {
    const id = req.body.email;
    const password = req.body.password
    console.log(req.body)
    db.query("SELECT * FROM login WHERE email = ? AND password = ?",
    [id, password], 
    (err, result) => {

        if (err) {
            res.send({ err: err})   
        } 
            if (result.length > 0) {
                res.send({...result[0],usertype:'employee'})
            } 
            else {
                            res.send({message: 'ID or Password is invalid'})
                     

            }
    }
    )
})



const PORT = 8001;

app.listen(process.env.PORT || PORT, ()=> {
    console.log(`API running on port ${PORT}`)
})

db.connect((err)=> {
    if (err) {
        throw err
    } else {
        console.log('Connected...')
    }
    // db.query("CREATE table login (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, matric VARCHAR(255) NOT NULL, medicalcollege VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, date DATETIME NOT NULL, PRIMARY KEY(id)) ENGINE=InnoDB DEFAULT CHARSET=utf8", (err, result)=> {
    //     if (err) throw err;
    //     console.log("Table created")
    // })
});
