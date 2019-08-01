var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var Schema = mongoose.Schema;

var userSchema= new mongoose.Schema({
    userId :{
        type:Number,
        trim: true,
        required: true
    },
    name:{
        type:String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
       },
       password: {
        type: String,
        trim: true,
        required: true
       },
    address:{
        addressLine1:{ type:String,trim:true},
        addressLine2:{ type:String,trim:true},
        city:{ type:String,trim:true},
        state:{ type:String,trim:true},
        country:{ type:String,trim:true}
    }
    
})
userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
    });

module.exports = mongoose.model('users', userSchema);