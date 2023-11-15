
import models from "../models/index.js"
const Movie = models.Movie
import { v4 as uuidv4 } from "uuid"



const findMovieByName = async (name_target) => {

	const results = await Movie.findOne({
		where: {title: name_target},
	})

	if (!results) {
		console.log("No Movie found")
	}
  
	return results

} 


const createNewMovie = async (MoviePayload) => {
	const new_char = {...MoviePayload, id: uuidv4()}
	console.log(`SERVICE - New  MOVIE is: ${JSON.stringify(new_char)}`)
    
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
	Movie.destroy({
		where: {},
		truncate: true
	})
}


export {createNewMovie, findMovieByName, clearMovieTable}







