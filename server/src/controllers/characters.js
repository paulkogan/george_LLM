
import { Sequelize, DataTypes, Model } from 'sequelize';
import {models} from "../models/index.js"
import {createNewCharacter} from "../domain/character.service.js"
const Op = Sequelize.Op
const Character = models.Character

const createNew = async (req, res) => {

	const createCharacterResponse = await createNewCharacter(req.body) 
	if (createCharacterResponse.status) {
		res.status(createCharacterResponsestatus).send(createCharacterResponse)
	} else {
		res.status(500).send({
			message:createCharacterResponse.message
		})
	}
}

const getCharacterById = async (req, res) => {
	const target_id = req.params.id
	console.log(`Looking for Character UUID : ${target_id}`)
	const results = await Character.findOne({
		include: [
			{
				model: models.Role,
				as: "characterRoles",
				required: false, 
				attributes: ["id"],
				include: [
					{
						model: models.Movie,
						attributes: ["title","global_box_office","release_year","synopsis","id"],
						as: "roleMovie"
					},
					{
						model: models.Actor,
						attributes: ["first_name", "last_name", "image_url", "id"],
						as: "roleActor"
					},
	
				], 
	
			}
		],
		order: [  		
			[ { model: models.Role, as: 'characterRoles' }, 
				{ model: models.Movie, as: 'roleMovie' }, 'release_year', 'DESC'] 
		],  	
		where: {id: target_id},
	}).then(data => {
		console.log(`Find Character response: ${data.title}`)
		if (data) {
			res.status(200).send({
				"data":data,
				"errors": null,
				"message": null
			})
		} else {
			res.status(404).send({
				"data": null,
				"errors": `Did not find Character with ${target_id}`, 
				"message": `Did not find Character with ID: ${target_id} `
			})
		}

	})
	.catch(err => {
		res.status(404).send({
			"data": null,
			"errors": `Did not find Characters with ${target_id}`, 
			"message": `Could not find Character - ${err.message} `
		})
	})

}

const listCharacters = async (req, res) => {
	const target_name = req.query.name
	const condition = target_name ? { name: { [Op.iLike]: `%${target_name}%` } } : null

	Character.findAll({ 
		where: condition,
		include: [
			{
				model: models.Role,
				as: "characterRoles",
				required: false, 
				attributes: ["id"],
				include: [
					{
						model: models.Movie,
						attributes: ["title","global_box_office","release_year","synopsis","id"],
						as: "roleMovie"
					},
					{
						model: models.Actor,
						attributes: ["first_name", "last_name", "image_url", "id"],
						as: "roleActor"
					},
	
				]
			}
		],
		order: [
			["name", "ASC"],
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
				"errors": `Did not find users with ${target_name}`, 
				"message": `ERROR: for  List Users - ${err.message} `
			})
		})
}




const findCharacter = async (req, res) => {
	const target_name = req.body.name
	console.log(`Character target_name is ${target_name}`)

	Character.findByName(target_name)
		.then(data => {
			if (data) {
				console.log(`Found user ${JSON.stringify(data)}`)
				res.status(200).send({
					"data":data,
					"errors": null     
				})
			} else {
				console.log(`Did not find user ${target_name}`)
				res.status(404).send({
					"data": null,
					"errors": `Did not find character with  ${target_name}`, 
					"message": `ERROR: Did not find character with ${target_name}`
				})
			}

		})
		.catch(err => {
			res.status(500).send({
				"data": null,
				"errors": `Did not find character with  ${target_name}`, 
				"message": `ERROR: for  ${target_name} - ${err.message} `
			})
		})

}

export default {listCharacters, findCharacter, createNew, getCharacterById}