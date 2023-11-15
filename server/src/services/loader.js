// const {models} = require("../models/index.js")
// const Character = models.Character
import fs from "fs"
import { parse } from "csv-parse";
import {createNewCharacter, clearCharacterTable} from "../domain/character.service.js"
import {createNewMovie, clearMovieTable} from "../domain/movie.service.js"
import {createNewActor, clearActorTable} from "../domain/actor.service.js"
import chars_list from '../../seeders/character_seed_30.json' assert { type: "json" }

const load_chars = async () => {
    clearCharacterTable()
    for (let char of chars_list) {
        const createCharacterResponse = await createNewCharacter(char)
    }

}

const load_movies = async () => {  
    clearMovieTable()
    fs.createReadStream("./seeders/movies_seed_30.csv")
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        //console.log(row);
        let movie_payload = {
            "title": row[0],
            "global_box_office": row[1],
            "release_year": row[2],
            "synopsis": row[3]
        }
        // console.log(movie_payload);
        const createMovieResponse = createNewMovie(movie_payload)
        //console.log(`Response to ${movie_payload.title}:  ${createMovieResponse}`);
      })
      .on("end", function () {
        console.log("finished");
      })
      .on("error", function (error) {
        console.log(error.message);
      });
}


const load_actors = async () => {  
    clearActorTable()
    fs.createReadStream("./seeders/actors_seed_30.csv")
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        //console.log(row);
        let actor_payload = {
            "first_name": row[0],
            "last_name": row[1],
            "image_url": row[2],
        }

        const createActorResponse = createNewActor(actor_payload)
        //console.log(`Response to ${actor_payload.last_name}:  ${createActorResponse}`);
      })
      .on("end", function () {
        console.log("finished");
      })
      .on("error", function (error) {
        console.log(error.message);
      });
}


export {load_chars, load_movies, load_actors}