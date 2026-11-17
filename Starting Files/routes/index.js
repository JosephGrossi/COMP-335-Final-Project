
var express = require('express');
var router = express.Router();
var path = require('path');

// PostgreSQL connection
const Client = require('pg').Client;

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

client.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Madlibs form
router.get('/madlibs', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'madlibs.html'));
});


router.post('/madlibs', function(req, res) {
  console.log(req.body);

  res.json({
    clothing: req.body.clothing,
    female1: req.body.female1,
    female2: req.body.female2,
    male1: req.body.male1,
    male2: req.body.male2,
    plural: req.body.plural
  });
});


router.get('/car', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'public', 'car.html'));
});

router.get('/carOut', function(req, res, next) {
  client.query('SELECT * FROM car', function(err, result) {
    if (err) {
      return next(err);
    }

    res.json(result.rows);
    console.log(result.rows);
  });
});

module.exports = router;
