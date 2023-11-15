
import { Sequelize, DataTypes, Model } from 'sequelize';
import models from "../models/index.js"
const Movie = models.Movie

const Op = Sequelize.Op

import createNewMovie from "../domain/movie.service.js"



const createNew = async (req, res) => {

	const createMovieResponse = await createNewMovie(req.body) 
	// console.log(`\n\nCREATE Movie RESPONSE IS  ${JSON.stringify(createUserResponse)}`)
	if (createMovieResponse.status) {
		res.status(createMovieResponse.status).send(createMovieResponse)
	} else {
		res.status(500).send({
			message:createMovieResponse.message
		})
	}
}


const listMovies = async (req, res) => {
	const target_title = req.query.title
	const condition = target_title ? { title: { [Op.like]: `%${target_title}%` } } : null

	Movie.findAll({ 
		where: condition,
		order: [
			["title", "ASC"],
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
				"errors": `Did not find users with ${target_title}`, 
				"message": `ERROR: for  List Users - ${err.message} `
			})
		})
}




const findMovie = async (req, res) => {
	const target_title = req.body.title
	console.log(`Movie target_title is ${target_title}`)

	Movie.findByTitle(target_title)
		.then(data => {
			if (data) {
				console.log(`Found movie ${JSON.stringify(data)}`)
				res.status(200).send({
					"data":data,
					"errors": null     
				})
			} else {
				console.log(`Did not find movie with  ${target_title}`)
				res.status(404).send({
					"data": null,
					"errors": `Did not find Movie with  ${target_title}`, 
					"message": `ERROR: Did not find Movie with ${target_title}`
				})
			}

		})
		.catch(err => {
			res.status(500).send({
				"data": null,
				"errors": `Did not find Movie with  ${target_title}`, 
				"message": `ERROR: for  ${target_title} - ${err.message} `
			})
		})

}

export default {listMovies, findMovie, createNew}