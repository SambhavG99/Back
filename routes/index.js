var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
require('../models/batch');
var mongoose = require('mongoose');
var Person = mongoose.model('persons');

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

module.exports = router;
