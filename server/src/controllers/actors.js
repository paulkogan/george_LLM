
import { Sequelize, DataTypes, Model } from 'sequelize';
import models from "../models/index.js"
const Actor = models.Actor

const Op = Sequelize.Op

import {createNewActor} from "../domain/actor.service.js"



const createNew = async (req, res) => {

	const createActorResponse = await createNewActor(req.body) 
	if (createActorResponse.status) {
		res.status(createActorResponse.status).send(createActorResponse)
	} else {
		res.status(500).send({
			message:createActorResponse.message
		})
	}
}


const listActors = async (req, res) => {
	const target_name = req.query.name
	const condition = target_name ? { 
		[Op.or]: [
			{first_name: { [Op.iLike]: `%${target_name}%` }},
			{last_name: { [Op.iLike]: `%${target_name}%` }}
		]
	} : null

	Actor.findAll({ 
		where: condition,
		include: [
			{
				model: models.Role,
				as: "character-roles",
				required: false, 
				attributes: ["id"],
				include: [
					{
						model: models.Movie,
						attributes: ["title","global_box_office","release_year","synopsis","id"],
						as: "role-movie"
					},
					{
						model: models.Character,
						attributes: ["name", "civilian", "powers", "character_type", "id"],
						as: "role-character"
					},
	
				]
			}
		],
		order: [
			["last_name", "ASC"],
		],
	})
		.then(data => {
			res.status(200).send({
				"data":data,
				"errors": null,
				"message": null
			})
		})
		.catch(err => {
			res.status(500).send({
				"data": null,
				"errors": `Did not find actors with ${target_name}`, 
				"message": `ERROR: for  List Actors - ${err.message} `
			})
		})
}




const findActor = async (req, res) => {
	const target_name = req.body.name
	console.log(`Actor target_name is ${target_name}`)

	Actor.findByName(target_name)
		.then(data => {
			if (data) {
				console.log(`Found Actor ${JSON.stringify(data)}`)
				res.status(200).send({
					"data":data,
					"errors": null     
				})
			} else {
				console.log(`Did not find Actor with  ${target_name}`)
				res.status(404).send({
					"data": null,
					"errors": `Did not find Actor with  ${target_name}`, 
					"message": `ERROR: Did not find Actor with ${target_name}`
				})
			}

		})
		.catch(err => {
			res.status(500).send({
				"data": null,
				"errors": `Did not find Actor with  ${target_name}`, 
				"message": `ERROR: for  ${target_name} - ${err.message} `
			})
		})

}

export default {listActors, findActor, createNew}