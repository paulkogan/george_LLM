import express from "express"
import charactersController from "../controllers/characters.js"
import moviesController from "../controllers/movies.js"
import actorsController from "../controllers/actors.js"
//import authController from "../controllers/auth.js"
//import {authorization} from "../services/be-auth-service.js"
const router = express.Router()



//router.get('/products', verifyToken, getUsers); # we started by sending token in the headers

router.get("/characters", charactersController.listCharacters)
router.post("/characters", charactersController.createNew)
router.post("/characters/find", charactersController.findCharacter)
router.get("/movies", moviesController.listMovies)
router.post("/movies", moviesController.createNew)
router.post("/movies/find", moviesController.findMovie)
router.get("/actors", actorsController.listActors)
router.post("/actors", actorsController.createNew)
router.post("/actors/find", actorsController.findActor)

export default router