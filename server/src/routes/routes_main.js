import express from "express"
import charactersController from "../controllers/characters.js"
import moviesController from "../controllers/movies.js"
import actorsController from "../controllers/actors.js"
import searchController from "../controllers/search.js"
//import authController from "../controllers/auth.js"
//import {authorization} from "../services/be-auth-service.js"
const router = express.Router()



//router.get('/products', verifyToken, getUsers); # we started by sending token in the headers

router.get("/characters", charactersController.listCharacters)
router.post("/characters", charactersController.createNew)
router.get("/characters/:id", charactersController.getCharacterById)
router.post("/characters/find", charactersController.findCharacter)
router.get("/movies", moviesController.listMovies)
router.get("/movies/:id", moviesController.getMovieById)
router.post("/movies", moviesController.createNew)
router.post("/movies/find", moviesController.findMovie)
router.get("/actors", actorsController.listActors)
router.post("/actors", actorsController.createNew)
router.post("/actors/find", actorsController.findActor)
router.post("/search/raw", searchController.handleRawSQLQuery)


export default router