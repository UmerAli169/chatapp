const sequelize = require('../config/database'); 
const { DataTypes } = require('sequelize');
const UserModel = require('./user.model');  

const User = UserModel(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize: require('sequelize'),
  User, 
};

module.exports = db;
