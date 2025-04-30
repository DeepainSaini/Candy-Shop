const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require('../util/db-connection');

const Products = sequelize.define('products',{

    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },

    name : {
        type : DataTypes.STRING,
        allowNull : false

    },

    description : {
        type : DataTypes.STRING,
        allowNull : false
    },

    price : {
        type : DataTypes.INTEGER,
        allowNull : false
    },

    quantity : {
        type : DataTypes.INTEGER,
        allowNull : false
    }
})

module.exports = Products;
