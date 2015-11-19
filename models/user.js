//import mongoose and bcrypt
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//need an alias for mongoose.Schema
var Schema = mongoos.Schema;

//define user schema
var UserSchema =
    new Schema({
                username: String,
                password: String,
                email: String,
                displayName: String,
                salt: String
            },{
                collection: 'userInfo'
            });

//Generated a Hash
UserSchema.methods.generateHash = function(password) {
    //return a salted password
    return bcrypt.hashSync(password, bcrypt.genSalt((8), null));
};

//check to see if the password is valid
UserSchema.methods.validPassword = function(password) {
    //compare the schema password and the hashed password
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);