const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/BytePurse");

// const dotenv = require('dotenv')
// dotenv.config()
// const mongoose = require("mongoose")
// mongoose.connect(process.env.MONGO)
// .then(()=>console.log("connected to database"))
// .catch(()=>console.log("error..!! failed to connect database"))

const noCache = require("./middleware/cache");
const localSession = require("./middleware/userSession");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;


//remove cache
app.use(noCache);
app.set("view engine", "ejs");
//session
const session = require("express-session");
app.use(session({ secret: "key", saveUninitialized: true, resave: false }));
app.use(localSession.commonNav);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const userRoute = require('./routes/userRoute');
app.use('/', userRoute);


const adminRoute = require('./routes/adminRoute')
app.use('/admin', adminRoute);

app.use('/userImages', express.static('userImages'));

//for static files
app.use(express.static(__dirname + "/public/userAssets"));
app.use(express.static(__dirname + "/public/adminAssets"));
app.use(express.static(__dirname + "/public"));
app.listen(3000, function () {
    console.log(`server is running http://localhost:${PORT} `)

});



