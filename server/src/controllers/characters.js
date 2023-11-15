
import { Sequelize, DataTypes, Model } from 'sequelize';
import models from "../models/index.js"
const Character = models.Character

const Op = Sequelize.Op

import {createNewCharacter} from "../domain/character.service.js"



const createNew = async (req, res) => {

	const createCharacterResponse = await createNewCharacter(req.body) 
	// console.log(`\n\nCREATE User RESPONSE IS  ${JSON.stringify(createUserResponse)}`)
	if (createCharacterResponse.status) {
		res.status(createCharacterResponsestatus).send(createCharacterResponse)
	} else {
		res.status(500).send({
			message:createCharacterResponse.message
		})
	}
}


const listCharacters = async (req, res) => {
	const name = req.query.name
	const condition = name ? { name: { [Op.like]: `%${name}%` } } : null

	Character.findAll({ 
		where: condition,
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
				"errors": `Did not find users with ${name}`, 
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

export default {listCharacters, findCharacter, createNew}