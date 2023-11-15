import Sequelize from "sequelize"
import process from 'process';
import { app } from "./app.js"

import db_config_options from "../config/config_db.js"

const env = process.env.NODE_ENV || "development"

const port = (env == "test") ? 3003 : 3001
    
app.listen(port, () => console.log(`George Server 2 listening on port ${port}!`))


const db_config = db_config_options["development"]

// load seeds
// import load_chars from "./services/loader.js"
// import chars_list from '../seeders/character_seed.json' assert { type: "json" }
// load_chars(chars_list)
