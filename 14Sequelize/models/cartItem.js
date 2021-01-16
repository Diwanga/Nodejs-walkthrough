const Sequlize = require('sequelize');
const sequlize = require('../util/database');


//creati model in sqlize
const CartItem = sequlize.define('cartItem',{
  id:{
      type: Sequlize.INTEGER,
      autoIncrement: true,
      allowNull : false,
      primaryKey: true
  },
  quantity:{
      type:Sequlize.INTEGER

  }
});

module.exports = CartItem
