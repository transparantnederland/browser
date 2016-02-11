var path = require('path');
var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var auth = require('http-auth');
var config = require('histograph-config');
var request = require('request');

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
  synced: { type: Sequelize.BOOLEAN, defaultValue: false },
  author: { type: Sequelize.STRING, allowNull: false },
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
  var params = {
    synced: false,
  };

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
  var author = req.user;

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
        author: author,
      });
    })
    .then(function (flag) {
      return res.status(201).json(flag);
    });
});

app.put('/flags/:id/approve', auth.connect(basic), function (req, res) {
  Flag.find({
    where: {
      id: req.params.id,
    },
    include: [Origin, Target],
  }).then(function (row) {
    if (row) {
      var type = row.type === 'wrong-type' ? 'pits' : 'relations';
      var url = config.api.baseUrl + '/' + path.join('datasets', 'corrections', type);
      var data = {};

      if (type === 'pits') {
        data = row.origin;
        data.type = row.value;
      } else {
        data = {
          from: row.originId,
          type: row.value,
          to: row.targetId,
        };
      }

      request(url, {
        method: 'PUT',
        auth: {
          user: config.api.admin.name,
          pass: config.api.admin.password,
        },
        json: data,
      }, function (error, response, body) {
        if (error) {
          return res.status(500).send(error);
        }
        row.update({
          synced: true,
        }).then(function () {
          res.send(body);
        }).catch(function (err) {
          res.status(500).send(err);
        });
      });
    } else {
      res.status(404).send('Not found');
    }
  }).catch(function () {
    res.status(500).send('Error');
  });
});

module.exports = app;
