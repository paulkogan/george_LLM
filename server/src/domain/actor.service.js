
import { Sequelize, DataTypes, Model } from 'sequelize';
const Op = Sequelize.Op
import models from "../models/index.js"
const Actor = models.Actor
import { v4 as uuidv4 } from "uuid"



const findActorByNames = async (first_target, last_target) => {

	const results = await Actor.findOne({
			where: {
				[Op.and]: [
				{ first_name: { [Op.iLike]: `%${first_target}%` } },
				{ last_name: { [Op.iLike]: `%${last_target}%` } },
				]
			}	
	})

	if (!results) {
		console.log(`No Actor found ${first_target}.${last_target}`)
	}
  
	return results

} 


const createNewActor = async (actorPayload) => {
	const new_actor = {...actorPayload, id: uuidv4()}
	//console.log(`SERVICE - New  Actor is: ${JSON.stringify(new_actor)}`)
    
	try {
		const createActorResponse = await Actor.create(new_actor)
		const responseObject = {
			status: 201,
			message: `Success - New Actor ${new_actor.last_name} Created `,
			data: createActorResponse 
		}
		console.log(`SUCCESS ${new_actor.last_name}`)
		return responseObject  

	} catch (error) {
		const responseObject = {
			status: 400,
			message: error.message,
			data: null
		}
		console.log(`ERROR ${error.message}`)
		return responseObject  

	}

}

const clearActorTable = async () => {
	Actor.destroy({
		where: {},
		truncate: true
	})
}


export {createNewActor, findActorByNames, clearActorTable}







