var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  Task = require('./api/models/userModel'), //created model loading here
  bodyParser = require('body-parser');
  
  var jwt = require('jsonwebtoken');
// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Userdb',{
    useNewUrlParser:true
}); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', function(req, res){
  res.send("Create a REST API server on NodeJS");
  })

// public route
const user = require('./api/routes/createUserRoutes');
app.use('/user', user);


app.listen(port);
console.log('RESTful API server started on: ' + port);
