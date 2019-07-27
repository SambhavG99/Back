var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});
require('../models/admin');
var mongoose = require('mongoose');
var Admin = mongoose.model('admin');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
});

router.post('/alogin',(req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  console.log(email)
  Admin.findOne({
      email:email
  },(err,adm)=>{
      if(err){
          res.json(err);
      }
      else{
          console.log(adm);
          if(adm == null ){
            res.json({message:"Check your Credentials"});
          }
          else if (adm.password != password){
              res.json({message:"Check your password"});
          }
          else{
              res.json(adm);
          }
      }
  })
})


module.exports = router;
