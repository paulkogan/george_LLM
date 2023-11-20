
const db_config_options = {
	"development": {
		"use_env_variable": false,
		"username": "postgres",
		"password": "abc",
		"database": "mcu",
		"host": "127.0.0.1",
		"dialect": "postgres",
	},
	"test": {
		"use_env_variable": false,
		"username": "postgres",
		"password": "abc",
		"database": "mcu_test",
		"host": "localhost",
		"dialect": "postgres", 
	},
	"production": {
		"username": "root",
		"password": null,
		"database": "mcu",
		"host": "127.0.0.1",
		"dialect": "mysql"
	}
}
export default db_config_options
//module.exports = db_config_options