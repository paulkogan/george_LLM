
import models from "../models/index.js"
const Actor = models.Actor
import { v4 as uuidv4 } from "uuid"



const findActorByName = async (name_target) => {

	const results = await Actor.findOne({
		where: {first_name: name_target},
	})

	if (!results) {
		console.log("No Actor found")
	}
  
	return results

} 


const createNewActor = async (ActorPayload) => {
	const new_char = {...ActorPayload, id: uuidv4()}
	console.log(`SERVICE - New  Actor is: ${JSON.stringify(new_char)}`)
    
	try {
		const createCharResponse = await Actor.create(new_char)
		const responseObject = {
			status: 201,
			message: `Success - New Actor ${userPayload.name} Created `,
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

const clearActorTable = async () => {
	Actor.destroy({
		where: {},
		truncate: true
	})
}


export {createNewActor, findActorByName, clearActorTable}







