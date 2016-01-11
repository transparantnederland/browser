var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var webpack = require('webpack');
var sqlite3 = require('sqlite3');
var config = require('./webpack.config.dev');

var db = new sqlite3.Database('database.sqlite');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(bodyParser.json());

app.get('/flags.json', function (req, res) {
  db.serialize(function () {
    db.all('SELECT * FROM flags', function (err, rows) {
      return res.json(rows.map(function (row) {
        row.concept = JSON.parse(row.concept);
        row.value = JSON.parse(row.value);
        return row;
      }));
    });
  });
});

app.get('/flags/relations.ndjson', function (req, res) {
  db.serialize(function () {
    db.all('SELECT * FROM flags', function (err, rows) {
      return res.send(rows.map(function (row) {
        var concept = JSON.parse(row.concept);
        var value = JSON.parse(row.value);

        return JSON.stringify({
          from: concept.id,
          type: value.type,
          to: value.concept.id,
        });
      }).join('\n'));
    });
  });
});

app.post('/flags', function (req, res) {
  var data = req.body;
  var concept = data.concept;
  var type = data.type;
  var value = data.value;

  if (!concept || !type || !value) {
    return res.status(400).send({
      invalid: true,
    });
  }

  db.serialize(function () {
    db.run('CREATE TABLE IF NOT EXISTS flags (concept TEXT, type TEXT, value TEXT)');
    db.run('INSERT INTO flags (concept, type, value) VALUES (?, ?, ?)', [
      JSON.stringify(concept),
      type,
      JSON.stringify(value),
    ]);
  });
  return res.status(201).send({
    done: true,
  });
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'app/index.html'));
});

app.listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
