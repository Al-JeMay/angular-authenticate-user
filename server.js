/*
===========================================================
 Title:  Authenticate User & Dashbord - al-JeMay Angular App
 Author: Al JeMay
 Date:   3 October 2019
===========================================================
*/

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

const app = express();

//// User route
const users = require('./routes/users');
const dashboard = require('./routes/dashboard');

//// Port number
const port = process.env.PORT || 3000;

//// CORS Middleware
app.use(cors());

//// Set static folder
app.use(express.static(path.join(__dirname,'public')));
// app.use(express.static('./dist/jemay-angular-app'));

//// Body Parser Middelware
app.use(bodyParser.json());

//// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//// User's routes
app.use('/api/account', users);
//// Dashboard routes
app.use('/api/dashboard', dashboard);

// Index Route
// app.get('/', (req, res)=>{
//     res.send('Invalid Endpoint!')
// })

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname))
    // res.sendFile(path.join(__dirname,'/dist/jemay-angular-app/index.html'));
})

//// Start server
app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})
