const userModel = require('../models/userModel');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/config').SECRET_KEY;
var token;
//req.app.get('secretKey')
module.exports = {
    create: function(req, res, next) {
        userModel.create({ userId:req.body.userId,
                           name :req.body.name,
                           email: req.body.email, 
                           password: req.body.password,
                           address:{
                                    addressLine1:req.body.addressLine1,
                                    addressLine2:req.body.addressLine2,
                                    city:req.body.city,
                                    state:req.body.state,
                                    country:req.body.country,
                                    
                                }
                         }, 
        function (err, result) {
         if (err) 
          next(err);
         else{
          res.json({status: "success", message: "User added successfully!!!", data: {user:result}});
         console.log("User added successfully!!!")}
       });
    },
   authenticate: function(req, res, next) {
    userModel.findOne({email:req.body.email}, function(err, userInfo){
        if (err) {
         next(err);
        } else {
   if(bcrypt.compareSync(req.body.password, userInfo.password)) {
   this. token = jwt.sign({id: userInfo._id},SECRET_KEY , { expiresIn: '1h' });
   res.json({status:"success", message: "user found!!!", data:{user: userInfo, token:this.token}});
   }else{
   res.json({status:"error", message: "Invalid email/password!!!", data:null});
   }
        }
       });
    },
    getAll: function(req, res, next) {
        let usersList = [];
        userModel.find({}, function(err, users){
         if (err){
          next(err);
         } else{
          for (let user of users) {
            usersList.push({
                id: user.userId, 
                name: user.name, 
                email: user.email,
                address:user.address
            });
          }
          res.json({status:"success", message: "Users list found!!!", data:{users: usersList}});
             
         }
      });
       }

   }