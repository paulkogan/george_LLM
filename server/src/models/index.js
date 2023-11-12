'use strict';

import Sequelize from "sequelize"
import process from 'process';
import db_config_options from "../../config/config_db.js"

import CharacterModel from "./character.js"

const env = process.env.NODE_ENV || "development"
const db_config = db_config_options[env]

//const db = {};

console.log('DB config @ Index: ', db_config)

const sequelize =  new Sequelize(
	db_config.database, 
	db_config.username, 
	db_config.password,  
	{
		host: db_config.host, 
		dialect: db_config.dialect,
		logging: false,
	}
)



const models = {
	Character : CharacterModel(sequelize, Sequelize.DataTypes)
}
// const db = {
// 	models, 
// 	sequelize,
// 	Sequelize 
// }

export default models
//module.exports = {models, sequelize}

