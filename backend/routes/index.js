var express = require('express');
var router = express.Router();
var models = require('../models');
const tokenauth = require('../middleware/tokenauth')

/* GET home page. */
router.get('/cats', tokenauth, function(req, res, next) {
  let query = '';
  let replacements = {};
  const queryKeys = Object.keys(req.query)

  if (queryKeys.length) {
    const validKeys = { 'id': true, 'name': true, 'username': true } // faster to check a hash
    if (!validateKeys(queryKeys, validKeys)) {
      return res.status(406).json('Invalid search parameters')
    }

    for (var key in req.query) {
      if (query.length) {
        query = query + ' AND'
      }
      if (key == 'id') {
        query = query + ' id=(:id)';
        replacements['id'] = req.query.id;
      } else {
        query = query + ' ' + key + ' LIKE (:' + key + ')';
        replacements[key] = '%' + req.query[key] + '%'
      }
    }
  }

  if (query.length) {
    query = 'WHERE ' + query
  }

  query = 'SELECT birthdate, breed, username, id, imageUrl, name FROM cats ' + query;

  models.sequelize.query(query, {
     replacements: replacements,
     type: models.sequelize.QueryTypes.SELECT
  }).then(function (data) {
    let result;
    if (!data.length) {
      result = "No cats found."
    } else {
      result = data
    }

    return res.status(200).json(result);
  })
  .catch(function(errors){
    console.log(errors);
    return res.status(500).json(errors);
  });
});

router.get('/cats/random', tokenauth, function(req, res, next) {
  models.sequelize.query("SELECT imageUrl, name, breed FROM cats ORDER BY rand() LIMIT 1", {
    type: models.sequelize.QueryTypes.SELECT
  }).then(function(data) {
    if (data.length) {
      return res.json(data[0]);
    } else {
      return res.json("No cats found");
    }
  })
});

function validateKeys(data, valid) {
  for (var i=0; i < data.length; i++) {
    if (!valid[data[i]]) {
      return false;
    }
  }
  return true;
}

module.exports = router;
