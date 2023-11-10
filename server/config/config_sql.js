
const db_config = {
	"development": {
		"use_env_variable": false,
		"username": "postgres",
		"password": "abc",
		"database": "msu",
		"host": "127.0.0.1",
		"dialect": "postgres",
	},
	"test": {
		"use_env_variable": false,
		"username": "postgres",
		"password": "abc",
		"database": "msu",
		"host": "localhost",
		"dialect": "postgres", 
	},
	"production": {
		"username": "root",
		"password": null,
		"database": "database_production",
		"host": "127.0.0.1",
		"dialect": "mysql"
	}
}
export default db_config