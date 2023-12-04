
import {models} from "../models/index.js"
const Role = models.Role
import { v4 as uuidv4 } from "uuid"




const createNewRole = async (RolePayload) => {
	const new_role = {...RolePayload, id: uuidv4()}
	// console.log(`SERVICE - New  Role is: ${JSON.stringify(new_role)}`)
    
	try {
		const createRoleResponse = await Role.create(new_role)
		const responseObject = {
			status: 201,
			message: `Success - New Role Created `,
			data: createRoleResponse
		}
		// console.log(`SUCCESS creating role for ${JSON.stringify(new_role, null,4)}  `)
		return responseObject  

	} catch (error) {
		const responseObject = {
			status: 400,
			message: error.message,
			data: null
		}
		// console.log(`ERROR creating role for ${JSON.stringify(new_role, null,4)} ${error} `)
		return responseObject  

	}

}

const clearRoleTable = async () => {
	Role.destroy({
		where: {},
		truncate: true
	})
}


export {createNewRole, clearRoleTable}







