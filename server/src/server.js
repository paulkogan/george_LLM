import Sequelize from "sequelize"
import process from 'process';
import { app } from "./app.js"
import db_config_options from "../config/config_sql.js"

const env = process.env.NODE_ENV || "development"

const port = (env == "test") ? 3003 : 3001
    
app.listen(port, () => console.log(`George Server 2 listening on port ${port}!`))


const db_config = db_config_options["development"]
console.log(db_config)

const sequelize =  new Sequelize(
	db_config.database, 
	db_config.username, 
	db_config.password,  
	{
		host: db_config.host, 
		dialect: "postgres",
		logging: false
	})

sequelize
    .authenticate()
    .then(() => {
      console.log('Connection to MCU has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the MCU database:', err);
    });