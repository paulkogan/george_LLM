'use strict';

import Sequelize from "sequelize"
import process from 'process';
import db_config_options from "../config/config_sql.js"

import Character from ("./character.js")

const env = process.env.NODE_ENV || "development"
const db_config = db_config_options[env]

//const db = {};

console.log(db_config)

const sequelize =  new Sequelize(
	db_config.database, 
	db_config.username, 
	db_config.password,  
	{
		host: db_config.host, 
		dialect: "postgres",
		logging: false,
    models: [Character],
	}, 
  
  )







db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
