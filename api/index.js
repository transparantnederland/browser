var path = require('path');
var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var auth = require('http-auth');

var app = express();
app.use(bodyParser.json());

var basic = auth.basic({
  realm: 'Flags',
  file: __dirname + '/.htpasswd',
});

var sequelize = new Sequelize('sqlite://database', {
  logging: false,
  storage: path.join(__dirname, 'database.sqlite'),
});

var Flag = sequelize.define('flag', {
  type: { type: Sequelize.STRING, allowNull: false },
  value: { type: Sequelize.STRING, allowNull: false },
});

var Concept = sequelize.define('concept', {
  id: { type: Sequelize.STRING, primaryKey: true },
  type: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
  datasets: { type: Sequelize.STRING },
}, {
  setterMethods: {
    datasets: function (value) {
      this.setDataValue('datasets', value.join(','));
    },
  },
  getterMethods: {
    datasets: function () {
      return (this.getDataValue('datasets') || '').split(',');
    },
  },
});

var Origin = Flag.belongsTo(Concept, { as: 'origin' });
var Target = Flag.belongsTo(Concept, { as: 'target' });

sequelize.sync({ force: false }).then(function () {});

app.get('/flags', function (req, res) {
  var query = req.query;
  var params = {};

  if (query.concept) {
    params.$or = [
      { originId: decodeURIComponent(query.concept) },
      { targetId: decodeURIComponent(query.concept) },
    ];
  }

  Flag.findAll({
    where: params,
    include: [Origin, Target],
    order: [['createdAt', 'DESC']],
  }).then(function (rows) {
    res.json(rows);
  });
});

app.delete('/flags', auth.connect(basic), function (req, res) {
  var query = req.query;
  var params = {};

  if (query.id) {
    params.id = query.id.split(',');
  }

  Flag.destroy({
    where: params,
  }).then(function () {
    res.status(204).send();
  });
});

app.get('/flags/relations.ndjson', auth.connect(basic), function (req, res) {
  Flag.findAll({
    where: {
      $or: [{ type: 'duplicate' }, { type: 'missing-relation' }],
    },
    include: [Origin, Target],
  }).then(function (rows) {
    res.send(rows.map(function (row) {
      return JSON.stringify({
        from: row.originId,
        type: row.value,
        to: row.targetId,
      });
    }).join('\n'));
  });
});

app.get('/flags/pits.ndjson', auth.connect(basic), function (req, res) {
  Flag.findAll({
    where: {
      $or: [{ type: 'wrong-type' }],
    },
    include: [Origin, Target],
  }).then(function (rows) {
    res.send(rows.map(function (row) {
      return JSON.stringify({
        id: row.origin.id,
        type: row.value,
        name: row.origin.name,
        dataset: row.origin.datasets.shift(),
      });
    }).join('\n'));
  });
});

app.post('/flags', auth.connect(basic), function (req, res) {
  var data = req.body;
  var origin = data.concept;
  var type = data.type;
  var value = data.value.type;
  var target = data.value.concept;

  Concept
    .findOrCreate({
      where: { id: origin.id },
      defaults: origin,
    })
    .then(function () {
      return Concept.findOrCreate({
        where: { id: target.id },
        defaults: target,
      });
    })
    .then(function () {
      return Flag.create({
        type: type,
        value: value,
        originId: origin.id,
        targetId: target.id,
      });
    })
    .then(function (flag) {
      return res.status(201).json(flag);
    });
});

module.exports = app;
