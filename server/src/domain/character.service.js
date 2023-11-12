
import models from "../models/index.js"
const Character = models.Character
import { v4 as uuidv4 } from "uuid"


const createNewCharacter = async (characterPayload) => {
	const new_char = {...characterPayload, id: uuidv4()}
	console.log(`SERVICE - New  CHAR is: ${JSON.stringify(new_char)}`)
    
	try {
		const createCharResponse = await Character.createNew(new_char)

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

export default createNewCharacter 







