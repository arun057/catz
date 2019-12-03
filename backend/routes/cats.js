var express = require('express');
var router = express.Router();
var validator = require('validator');
var models = require('../models');

router.post('/register', function(req, res, next) {
  models.cat
  .create(req.body)
  .then(function(cat) {
    res.status(201).json('successfully registered')
  })
  .catch(function(errors) {
    res.status(400).json(friendlyErrors(errors))
  })
});

function friendlyErrors(errors) {
  const messages = {};
  errors.errors.forEach((error) => {
    if (!error.validatorKey) {
      if (!messages['errors']) {
        messages['errors'] = [];
      }
      messages['errors'].push(error);
    } else {
      switch (error.validatorKey) {
        case 'is_null':
          if (!messages[error.path]) {
            messages[error.path] = []
          }
          messages[error.path].push(error.path + ' cannot be empty.')
          break;
        case 'not_unique':
          if (!messages[error.path]) {
            messages[error.path] = []
          }
          messages[error.path].push(error.path + ' is not available. Please choose a different ' + error.path)
          break;
        case 'len':
          if (!messages[error.path]) {
            messages[error.path] = []
          }
          messages[error.path].push(error.message)
          break;
      }
    }
  })
  return messages;
}

router.post('/login', function(req, res, next) {
  const { username, password } = req.body;
  console.log("LOGIN REQUEST",req.body, username, password);
  var invalid = false;

  if (!username || !password) {
    invalid = true;
  }

  if (!invalid && (validator.isEmpty(username) || validator.isEmpty(password))) {
    invalid = true;
  }

  if (!invalid && !validator.isLength(password, {min: 8})) {
    invalid = true;
  }


  if (invalid) {
    return res.status(401).json('Invalid Credentials')
  }

  // sanitized query
  models.sequelize.query('SELECT * FROM cats WHERE username=(:user) LIMIT 1', {
    replacements: {
      user: username
    },
    type: models.sequelize.QueryTypes.SELECT
  })
  .then(function(data) {
    if (!data.length) {
      return res.status(401).json('User does not exist.')
    } else {
      const cat = data[0]
      models.cat.authenticatePassword(cat.password, password).then(function(authResponse) {
        if (authResponse) {
          const token = models.cat.generateAuthToken(cat);
          models.sequelize.query('UPDATE cats SET authToken=(:auth_token), updatedAt=NOW() WHERE id=(:id)', {
            replacements: {
              auth_token: token,
              id: cat.id
            },
            type: models.sequelize.QueryTypes.UPDATE
          })
          .then(function(data) {
            console.log(data)
            return res.status(200).json(token)
          })
          .catch(function(errors){
            return res.status(401).json(errors);
          })
        } else {
          return res.status(401).json('Invalid password, please try again.')
        }
      })
    }
  });
})

module.exports = router;
