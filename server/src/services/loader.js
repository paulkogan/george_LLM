// const {models} = require("../models/index.js")
// const Character = models.Character
import fs from "fs"
import { parse } from "csv-parse";
import {createNewCharacter, clearCharacterTable, findCharacterByName} from "../domain/character.service.js"
import {createNewMovie, clearMovieTable, findMovieByNameAndYear} from "../domain/movie.service.js"
import {createNewActor, clearActorTable, findActorByNames} from "../domain/actor.service.js"
import {clearRoleTable, createNewRole} from "../domain/role.service.js"
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
        console.log("finished movies");
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
        console.log("finished actors");
      })
      .on("error", function (error) {
        console.log(error.message);
      });
}

const load_roles = async () => {  
  clearRoleTable()
  fs.createReadStream("./seeders/roles_seed_30.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", async function (row) {
      //console.log(row);
      //Samuel,Jackson,The Marvels,2023,Nick Fury
      let actor_first = row[0].trim()
      let actor_last = row[1].trim()
      let movie_title = row[2].trim()
      let movie_year = row[3]
      let character_name = row[4].trim()
      const role_movie = await findMovieByNameAndYear(movie_title, movie_year)
      const role_actor = await findActorByNames(actor_first, actor_last)
      const role_chracter = await findCharacterByName(character_name)
      // if (role_movie ) {
      //   console.log(`ROLE MOVIE -- ${role_movie.title} ${role_movie.id}`);
      // }
      // if (role_actor ) {
      //   console.log(`ROLE ACTOR -- ${role_actor.last_name} ${role_actor.id}`);
      // }
      // if (role_chracter and  ) {
      //   console.log(`ROLE CHAR -- ${role_chracter.name} ${role_chracter.id}`);
      // }

      if (role_chracter && role_actor && role_movie) {
          let role_payload = {
            "actor_id": role_actor.id,
            "character_id": role_chracter.id,
            "movie_id": role_movie.id,
          }
          const createRoleResponse = createNewRole(role_payload)
          
      } else {
         let miss_tags = [movie_title, actor_first+actor_last, character_name] 
         let match_mesage = "Could not match: " 
         let role_results = [role_movie, role_actor, role_chracter]
         role_results.forEach((elem, idx) => {
                if (!elem) {
                  match_mesage += miss_tags[idx]+" "
                }   
         })
         match_mesage += "in "+row
         console.log(match_mesage)
  
      }
    })
    .on("end", function () {
      console.log("finished roles");
    })
    .on("error", function (error) {
      console.log(error.message);
    });
}





export {load_chars, load_movies, load_actors, load_roles}