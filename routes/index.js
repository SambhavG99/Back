var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
require('../models/batch');
var mongoose = require('mongoose');
var Person = mongoose.model('persons');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
});

router.post('/add', function(req, res) {
  new Person({
    name : req.body.name, 
    email : req.body.email,
    password : req.body.password,
    weight :req.body.weight,
    height:req.body.height}
)
  .save(function(err, Person) {
    console.log(Person)   //terminal print
    res.json(Person);     //Print in Postman 
  });
});

router.get('/view', function(req,res){
  Person.find(function(err,Person){
    console.log(Person)
    res.json(Person);
  })
})
router.put('/update/:id', function(req, res) {
  var query = {"_id": req.params.id};
  var update = {name : req.body.name, 
    email : req.body.email,
    password : req.body.password,
    weight :req.body.weight,
    height :req.body.height}
  var options = {new: true};
  Person.findOneAndUpdate(query, update, options, function(err, Person){
    console.log(Person)
    res.json(Person);
  });
});
 
router.delete('/delete/:id', function(req, res) {
  var query = {"_id": req.params.id};
  Person.findOneAndRemove(query, function(err, Person){
    console.log(Person)
    res.json(Person);
  });
});


router.post('/login',(req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  console.log(email)
  Person.findOne({
      email:email
  },(err,user)=>{
      if(err){
          res.json(err);
      }
      else{
          console.log(user);
          if(user == null ){
            res.json({message:"Check your Credentials"});
          }
          else if (user.password != password){
              res.json({message:"Check your password"});
          }
          else{
              res.json(user);
          }
      }
  })
})


router.post('/alogin',(req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  console.log(email)
  Person.findOne({
      email:email
  },(err,user)=>{
      if(err){
          res.json(err);
      }
      else{
          console.log(user);
          if(user == null ){
            res.json({message:"Check your Credentials"});
          }
          else if (user.password != password){
              res.json({message:"Check your password"});
          }
          else{
              res.json(user);
          }
      }
  })
})


module.exports = router;
