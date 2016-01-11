var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

// NOTE: there is a bug in the Sequelize library where it doesn’t
// support absolute sqlite URIs, which is why it’s stored in the root directory
// @see: https://github.com/sequelize/sequelize/issues/4721
var sequelize = new Sequelize('sqlite:database.sqlite');

var Flag = sequelize.define('flag', {
  type: { type: Sequelize.STRING, allowNull: false },
  value: { type: Sequelize.STRING, allowNull: false },
});

var Concept = sequelize.define('concept', {
  id: { type: Sequelize.STRING, primaryKey: true },
  type: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
});

// this will add the attribute OriginId to Flag
var Origin = Flag.belongsTo(Concept, { as: 'Origin' });
// this will add the attribute TargetId to Flag
var Target = Flag.belongsTo(Concept, { as: 'Target' });

app.get('/flags.json', function (req, res) {
  Flag.findAll({
    include: [Origin, Target],
  }).then(function (rows) {
    res.json(rows);
  });
});

app.post('/flags', function (req, res) {
  var data = req.body;

  Concept
    .findOrCreate({
      where: { id: data.origin.id },
      defaults: data.origin,
    })
    .then(function () {
      return Concept.findOrCreate({
        where: { id: data.target.id },
        defaults: data.target,
      });
    })
    .then(function () {
      return Flag.create({
        type: data.type,
        value: data.value,
        OriginId: data.origin.id,
        TargetId: data.target.id,
      });
    })
    .then(function (flag) {
      return res.status(201).json(flag);
    });
});

// sequelize.sync({ force: true }).then(function () {
//
// });

app.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
