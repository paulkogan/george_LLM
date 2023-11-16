import { Sequelize, DataTypes, Model } from 'sequelize';
const Op = Sequelize.Op
import models from "../models/index.js"
const Character = models.Character
import { v4 as uuidv4 } from "uuid"



const findCharacterByName = async (name_target) => {

	const results = await Character.findOne({
		where: { name: { [Op.iLike]: `%${name_target}%` } },
	})
	
	if (!results) {
		console.log(`No character found ${name_target}`)
	}
	return results
} 


const createNewCharacter = async (characterPayload) => {
	const new_char = {...characterPayload, id: uuidv4()}
	console.log(`SERVICE - New  CHAR is: ${JSON.stringify(new_char)}`)
    
	try {
		const createCharResponse = await Character.create(new_char)
		const responseObject = {
			status: 201,
			message: `Success - New Character ${userPayload.name} Created `,
			data: createCharResponse
		}
		return responseObject  

	} catch (error) {
		const responseObject = {
			status: 400,
			message: error.message,
			data: null
		}
		return responseObject  

	}

}

const clearCharacterTable = async () => {
	Character.destroy({
		where: {},
		truncate: true
	})
}


export {createNewCharacter, findCharacterByName, clearCharacterTable}







