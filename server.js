const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

//INITIALIZE EXPRESS
const app = express();

//USE BODY PARSER MIDDELEWARE 
app.use(express.json());

//GET DB NAME
const db = config.get('mongoURI');

//CONNECT TO DB

mongoose.connect
(
    db,
     {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     }
)
     .then(()=> console.log("Database Connected"))
     .catch(err => console.log(err));

app.use("/api/users", require('./api/routes/users'));
app.use("/api/auth", require('./api/routes/auth'));


  //ITINITALIZE PORT

const port = process.env.PORT || 5000 ;

//Listen to this PORT
app.listen(port, () => console.log(`Serve Started on port ${port}`));
