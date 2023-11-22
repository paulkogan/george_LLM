
import { Sequelize, DataTypes, Model } from 'sequelize';
const Op = Sequelize.Op
import {models} from "../models/index.js"
const Movie = models.Movie

import { v4 as uuidv4 } from "uuid"



const findMovieByName = async (target_title) => {

	const results = await Movie.findOne({
		where: {title: target_title},
	})

	if (!results) {
		console.log("No Movie found")
	}
  
	return results

} 

const findMovieByNameAndYear = async (target_title, target_year) => {

	const results = await Movie.findOne({
		where: {
			[Op.and]: [
			{ title: { [Op.iLike]: `%${target_title}%` } },
			{release_year: target_year}
			]
		}	
	})


	if (!results) {
		console.log(`Not found movie: ${target_title} ${target_year}`)
	}
  
	return results

} 



const createNewMovie = async (MoviePayload) => {
	const new_char = {...MoviePayload, id: uuidv4()}
	// console.log(`SERVICE - New  MOVIE is: ${JSON.stringify(new_char)}`)
    
	try {
		const createCharResponse = await Movie.create(new_char)
		const responseObject = {
			status: 201,
			message: `Success - New Movie ${userPayload.name} Created `,
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

const clearMovieTable = async () => {
	// Movie.destroy({
	// 	where: {},
	// 	truncate: true
	// })
	await Movie.truncate();
}


export {createNewMovie, findMovieByName, clearMovieTable, findMovieByNameAndYear}







