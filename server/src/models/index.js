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


models.Actor.hasMany(models.Role,
	{
		foreignKey: "actor_id",
		sourceKey: "id", 
		as: "actor-roles"
	})

models.Role.belongsTo(models.Actor,
	{
		foreignKey: "actor_id",
		sourceKey: "id", 
		as: "role-actor"
	})

models.Movie.hasMany(models.Role,
	{
		foreignKey: "movie_id",
		sourceKey: "id", 
		as: "movie-roles"
	})

models.Role.belongsTo(models.Movie,
	{
		foreignKey: "movie_id",
		sourceKey: "id", 
		as: "role-movie"
	})

models.Character.hasMany(models.Role,
	{
		foreignKey: "character_id",
		sourceKey: "id", 
		as: "character-roles"
	})

models.Role.belongsTo(models.Character,
	{
		foreignKey: "character_id",
		sourceKey: "id", 
		as: "role-character"
	})

// THROUGH relationships ============================	create unexpected constraints
// models.Movie.belongsToMany(models.Actor, { through: 'Role', as:"movie-actors",});	
// models.Actor.belongsToMany(models.Movie, { through: 'Role', as:"actor-movies" });
// models.Movie.belongsToMany(models.Character, { through: 'Role' });
// models.Character.belongsToMany(models.Movie, { through: 'Role' });

export {models, sequelize}

