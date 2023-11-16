import Sequelize from "sequelize"
import process from 'process';
import { app } from "./app.js"
import {load_chars, load_movies, load_actors, load_roles}  from "./services/loader.js"
import db_config_options from "../config/config_db.js"

const env = process.env.NODE_ENV || "development"

const port = (env == "test") ? 3003 : 3001
    
app.listen(port, () => console.log(`George Server 2 listening on port ${port}!`))


const db_config = db_config_options["development"]

// load seeds
// load_chars()
// load_movies()
//load_actors()
//load_roles()