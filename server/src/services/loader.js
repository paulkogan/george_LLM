// const {models} = require("../models/index.js")
// const Character = models.Character
import fs from "fs"
import { parse } from "csv-parse";
import {createNewCharacter, clearCharacterTable, findCharacterByName} from "../domain/character.service.js"
import {createNewMovie, clearMovieTable, findMovieByNameAndYear} from "../domain/movie.service.js"
import {createNewActor, clearActorTable, findActorByNames} from "../domain/actor.service.js"
import {clearRoleTable, createNewRole} from "../domain/role.service.js"
import chars_list from '../../seeders/character_seed_30.json' assert { type: "json" }

const loader_main = async () => {
  await clearCharacterTable()  
  await load_chars()
  await clearMovieTable()
  await load_movies()
  await clearActorTable()
  await load_actors()
  await clearRoleTable()
  await load_roles()


}

const load_chars = async () => {
    // chars_list.shift() //remove header row
    for (let char of chars_list) {
        const createCharacterResponse = await createNewCharacter(char)
    }

}

const load_movies = async () => {  
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
    let file_data = await fs.promises.readFile("./seeders/actors_seed_30.csv")
    const actor_array = file_data.toString().split("\n");
    actor_array.shift() //remove header row
    for await (const row of actor_array) {
      
        const [first, last, image_url] = row.split(",")
        let actor_payload = {
                  "first_name": first,
                  "last_name": last,
                  "image_url": image_url.slice(1,),  // remove lead "
        }
        await createNewActor(actor_payload)
    } 
    return 
}

const load_roles = async () => {  
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


      if (role_chracter && role_actor && role_movie) {
          let role_payload = {
            "actor_id": role_actor.id,
            "character_id": role_chracter.id,
            "movie_id": role_movie.id,
            "role_record": [actor_first + " " + actor_last, movie_title, character_name]
          }
          const createRoleResponse = await createNewRole(role_payload, )
          return 
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
         //console.log(match_mesage)
         return match_mesage
      }
    })
    .on("end", function () {
      console.log("finished roles");
    })
    .on("error", function (error) {
      console.log(error.message);
    });
}





export {loader_main, load_chars, load_movies, load_actors, load_roles}