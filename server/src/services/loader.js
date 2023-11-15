// const {models} = require("../models/index.js")
// const Character = models.Character

import {createNewCharacter, clearCharacterTable} from "../domain/character.service.js"


const load_chars = async (chars_list) => {
    clearCharacterTable()
    for (let char of chars_list) {
        const createCharacterResponse = await createNewCharacter(char)
    }
    

}

export default load_chars