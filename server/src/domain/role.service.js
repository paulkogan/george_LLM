
import models from "../models/index.js"
const Role = models.Role
import { v4 as uuidv4 } from "uuid"



const findRoleByName = async (name_target) => {

	const results = await Role.findOne({
		where: {title: name_target},
	})

	if (!results) {
		console.log("No Role found")
	}
  
	return results

} 


const createNewRole = async (RolePayload) => {
	const new_char = {...RolePayload, id: uuidv4()}
	console.log(`SERVICE - New  Role is: ${JSON.stringify(new_char)}`)
    
	try {
		const createCharResponse = await Role.create(new_char)
		const responseObject = {
			status: 201,
			message: `Success - New Role ${userPayload.name} Created `,
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

const clearRoleTable = async () => {
	Role.destroy({
		where: {},
		truncate: true
	})
}


export {createNewRole, findRoleByName, clearRoleTable}







