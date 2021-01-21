const express = require('express');
const app = express();
const passport = require("passport");

// const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
// const port = process.env.PORT || 5000;
const DB_NAME = "mernassdb"

app.use(cors());
app.use(express.json());

// const uri = "mongodb://ssad12:ssad12@cluster0-shard-00-00.ixsmq.mongodb.net:27017,cluster0-shard-00-01.ixsmq.mongodb.net:27017,cluster0-shard-00-02.ixsmq.mongodb.net:27017/ssaddb?ssl=true&replicaSet=atlas-ft7omt-shard-0&authSource=admin&retryWrites=true&w=majority"
// DB Config
const uri = require("./config/keys").mongoURI;
try {
  mongoose.connect( uri, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
  console.log("connected"));    
  }catch (error) { 
  console.log("could not connect");    
}
const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
  })


// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

require('./models/user.model');

var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");

// Routes
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);

// app.get('/', function(req, res){
//   res.send('got /');
// });

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});