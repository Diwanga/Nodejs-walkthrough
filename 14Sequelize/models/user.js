const Sequlize = require('sequelize');
const sequlize = require('../util/database');

//creati model in sqlize
const User = sequlize.define('user',{
    id :{
        type:Sequlize.INTEGER,
        primaryKey : true,
        allowNull:false,
        autoIncrement :true

    },
    name :{
        type : Sequlize.STRING,
        allowNull : false
    },
    email :{
        type : Sequlize.STRING
    }
});

module.exports = User;