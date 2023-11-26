
import { Sequelize, DataTypes, Model } from 'sequelize';
import {models} from "../models/index.js"
const Movie = models.Movie

const Op = Sequelize.Op

import {createNewMovie} from "../domain/movie.service.js"



const createNew = async (req, res) => {

	const createMovieResponse = await createNewMovie(req.body) 
	if (createMovieResponse.status) {
		res.status(createMovieResponse.status).send(createMovieResponse)
	} else {
		res.status(500).send({
			message:createMovieResponse.message
		})
	}
}

const getMovieById = async (req, res) => {
	const target_id = req.params.id
	// console.log(`Looking for Movie UUID : ${target_id}`)
	const results = await Movie.findOne({
		include: [
			{
				model: models.Role,
				as: "movieRoles",
				required: false, 
				attributes: ["id"],
				include: [
					{
						model: models.Character,
						attributes: ["name", "civilian", "powers", "character_type", "id"],
						as: "roleCharacter"
					},
					{
						model: models.Actor,
						attributes: ["first_name", "last_name", "image_url", "id"],
						as: "roleActor"
					},
	
				], 
				order: [  		
					[ { model: models.Role, as: 'movieRoles' }, 
						{ model: models.Actor, as: 'roleCharacter' }, 'last_name', 'ASC'] 
				],  		
			}
		],
		where: {id: target_id},
	}).then(data => {
		console.log(`Find Movie response: ${data.title}`)
		if (data) {
			res.status(200).send({
				"data":data,
				"errors": null,
				"message": null
			})
		} else {
			res.status(404).send({
				"data": null,
				"errors": `Did not find Movie with ${target_id}`, 
				"message": `Did not find Movie with ID: ${target_id} `
			})
		}

	})
	.catch(err => {
		res.status(404).send({
			"data": null,
			"errors": `Did not find Movies with ${target_id}`, 
			"message": `ERROR for  Get Movie - ${err.message} `
		})
	})

}



const listMovies = async (req, res) => {
	const target_title = req.query.title
	const condition = target_title ? { title: { [Op.iLike]: `%${target_title}%` } } : null

	Movie.findAll({ 
		include: [
		// {
		// 	model: models.Actor,
		// 	attributes: ["id","first_name", "last_name"],
		// 	as: "movie-actors"
		// },
		  {
			model: models.Role,
			as: "movieRoles",
			required: false, 
			attributes: ["id"],
			include: [
				{
					model: models.Character,
					attributes: ["name", "civilian", "powers", "character_type", "id"],
					as: "roleCharacter"
				},
				{
					model: models.Actor,
					attributes: ["first_name", "last_name", "image_url", "id"],
					as: "roleActor"
				},

			], 
			order: [  		
				[ { model: models.Role, as: 'movieRoles' }, 
					{ model: models.Actor, as: 'roleCharacter' }, 'last_name', 'DESC'] 
			],  		
		  }
		],
		where: condition,
		order: [
			["release_year", "ASC"],
		],
	})
		.then(data => {
			console.log(`List Movies ${data.length}`)
			res.status(200).send({
				"data":data,
				"errors": null,
				"message": null
			})
		})
		.catch(err => {
			res.status(500).send({
				"data": null,
				"errors": `Did not find Movies with ${target_title}`, 
				"message": `ERROR: for  List Movies - ${err.message} `
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

export default {listMovies, findMovie, createNew, getMovieById}