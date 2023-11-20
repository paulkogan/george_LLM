
import { Sequelize, DataTypes, Model } from 'sequelize';
const Op = Sequelize.Op
import {models} from "../models/index.js"
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
    return await Actor.create(new_actor)


}

const clearActorTable = async () => {
	Actor.destroy({
		where: {},
		truncate: true
	})
}


export {createNewActor, findActorByNames, clearActorTable}







