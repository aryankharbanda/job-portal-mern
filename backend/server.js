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

// require('./models/user.model');

var testAPIRouter = require("./routes/testAPI");
var usersRouter = require('./routes/users');
var profileRouter = require("./routes/profile");
var jobsRouter = require("./routes/jobs");

// Routes
app.use("/testAPI", testAPIRouter);
app.use('/users', usersRouter);
app.use("/profile", profileRouter);
app.use("/jobs", jobsRouter);

// app.get('/', function(req, res){
//   res.send('got /');
// });

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});