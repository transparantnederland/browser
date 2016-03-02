var path = require('path');
var express = require('express');
var Sequelize = require('sequelize');
var bodyParser = require('body-parser');
var auth = require('http-auth');
var config = require('histograph-config');
var request = require('request');
var md5 = require('md5');

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
    include: [Origin, Target],
  }).then(function (rows) {
    res.send(rows.map(function (row) {
      var isWrongType = row.type === 'wrong-type';
      var from = isWrongType ? ('urn:hgid:z_corrections_/' + md5(row.createdAt)) : row.originId;
      var type = isWrongType ? 'tnl:same' : row.value;
      var to = isWrongType ? row.originId : row.targetId;

      return JSON.stringify({
        from: from,
        type: type,
        to: to,
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
        id: ('urn:hgid:z_corrections_/' + md5(row.createdAt)),
        type: row.value,
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
  var user = req.user;

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
        author: user,
        originId: origin.id,
        targetId: target.id,
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
        data = {
          id: row.originId,
          type: row.value,
          _correction_id: md5(row.createdAt),
        };
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
