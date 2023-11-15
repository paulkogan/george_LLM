'use strict';

import Sequelize from "sequelize"
import process from 'process';
import db_config_options from "../../config/config_db.js"

import CharacterModel from "./character.js"
import ActorModel from "./actor.js"
import MovieModel from "./movie.js"
import RoleModel from "./role.js"

const env = process.env.NODE_ENV || "development"
const db_config = db_config_options[env]

//const db = {};

//console.log('DB config @ Index: ', db_config)

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
	Character : CharacterModel(sequelize, Sequelize.DataTypes),
	Movie : MovieModel(sequelize, Sequelize.DataTypes),
	Actor : ActorModel(sequelize, Sequelize.DataTypes),
	Role : RoleModel(sequelize, Sequelize.DataTypes)
}
// const db = {
// 	models, 
// 	sequelize,
// 	Sequelize 
// }

export default models
//module.exports = {models, sequelize}

