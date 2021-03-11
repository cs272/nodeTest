var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const sequelize = require("../config/initDb.js");
const jwt = require('jsonwebtoken');
const accessTokenSecret = process.env.TOKEN_SECRET;

const bcrypt = require('bcrypt');
const saltRounds = 10;


var User = require("../models/User.js")(sequelize,Sequelize);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', (req, res) => {
  let { name, email, password } = req.body;
  bcrypt.hash(password, saltRounds, function(err, hash) {
    console.log('hash',hash)
    sequelize.sync().then(function() {
      return User.create({
        name: name,
        email:email,
        password:hash,
      });
    })
    res.send('User successfully created');
  });
});

router.post('/login', (req, res) => {

  let { email, password } = req.body;

  User.findOne({ where: {email: email} }).then(function(user) {
    if(user){
      bcrypt.compare(password, user.password).then(function(result) {
        console.log(result)
        if(result){
          const token = jwt.sign({ userId: user.id,  iat: Date.now() }, accessTokenSecret);
          res.status(200).json({
            token
          });
        }else{
          res.status(401).json({
            error:"Wrong Password"
          });
        }
      });
    }else{
      res.status(401).json({
        error:"Wrong Email"
      });
    }
    
    
  })

});


module.exports = router;