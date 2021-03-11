var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const sequelize = require("../config/initDb.js");
const paginate = require('../middleware/paginate.js');

var User = require("../models/User.js")(sequelize,Sequelize);
var Notes = require("../models/Notes.js")(sequelize,Sequelize);

User.hasMany(Notes, { as: "notes" });
Notes.belongsTo(User, {
  foreignKey: "userId",
  as: "users",
});



router.get('/', (req, res) => {

  let { page,pagesize } = req.body;
  sequelize.sync().then(function() {
    Notes.findAndCountAll({
      ...paginate( page, pagesize )
    })
    .then((note) => {
      let ResData= {
        totalPages:Math.round(note.count / pagesize),
        currentPage:page,
        contents:note.rows
      }
      
      res.status(200).json(ResData);
    })
    .catch((err) => {
      res.status(401).json({
        error: "Some error occurred while retrieving tutorials."
      });
    });
  });

});

router.post('/create', (req, res) => {

  let { note } = req.body;
  sequelize.sync().then(function() {
    Notes.create({
      note: note,
      userId: req.userId,
    })
    .then((note) => {
      res.status(200).json({
        note
      });
    })
    .catch((err) => {
      res.status(401).json({
        err
      });
    });
  });

});

router.put('/update', (req, res) => {
  let { note , noteId } = req.body;
  sequelize.sync().then(function() {
    Notes.update({
      note: note,
      userId: req.userId,
    },{where: {id: noteId}})
    .then((note) => {
      res.status(200).json({
        note
      });
    })
    .catch((err) => {
      res.status(401).json({
        err
      });
    });
  });
});


router.delete('/delete', (req, res) => {
  let { noteId } = req.body;
  sequelize.sync().then(function() {
    Notes.destroy({ where: {id: noteId} })
    .then((note) => {
      res.status(200).json({
        note
      });
    })
    .catch((err) => {
      res.status(401).json({
        err
      });
    });
  });
});


module.exports = router;