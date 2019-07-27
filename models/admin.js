var mongoose = require('mongoose');
var Schema = mongoose.Schema; //Schema here is method

var Admin = new Schema(    //Person is object 
      {email: String , password: String}  //name here is property and string is value
 
);

mongoose.model('admin',Admin);      //to make a collection we use mongoose.model('<collectionName>',Object)