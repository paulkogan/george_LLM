import express from "express"
import charactersController from "../controllers/characters.js"
//import authController from "../controllers/auth.js"
//import {authorization} from "../services/be-auth-service.js"
const router = express.Router()



//router.get('/products', verifyToken, getUsers); # we started by sending token in the headers

router.get("/characters", charactersController.listCharacters)
router.post("/characters", charactersController.createNew)
router.post("/characters/find", charactersController.findCharacter)


export default router