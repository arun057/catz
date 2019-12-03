'use strict';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = (sequelize, DataTypes) => {
  const cat = sequelize.define('cat', {
    birthdate: DataTypes.STRING,
    breed: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 8,
          msg: "Password must be atleast 8 characters in length"
        }
      }
    },
    weight: DataTypes.FLOAT,
    authToken: DataTypes.STRING
  }, {
    instanceMethods: {
      //
    },
    hooks: {
      beforeCreate: async function(cat, options, callback) {
        const salt = await bcrypt.genSalt(8);
        cat.password = await bcrypt.hash(cat.password, salt);
      }
    }
  });

  cat.authenticatePassword = function (hash, pwd) {
    return bcrypt.compare(pwd, hash);
  }

  cat.generateAuthToken = function(cat) {
    const token = jwt.sign({ _id: cat.id }, process.env.JWT_KEY);
    return token;
  }

  cat.associate = function(models) {
    // associations can be defined here
  };

  return cat;
};
