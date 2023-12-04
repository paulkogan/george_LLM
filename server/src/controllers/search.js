
import { Sequelize, DataTypes, Model } from 'sequelize';
import {models} from "../models/index.js"


import {runSQLQuery} from "../domain/search.service.js"



const handleRawSQLQuery = async (req, res) => {
	const query = req.body.sqlquery
	const sqlQueryResponse = runSQLQuery(query)
	.then(data => {
		console.log(`SQL Query ${data.length}`)
		res.status(200).send({
			"data":data,
			"errors": null,
			"message": null
		})
	})
	.catch(err => {
		res.status(500).send({
			"data": null,
			"errors": `No resonse for ${query}`, 
			"message": `ERROR: for SQL query - ${err.message} ${query}`
		})
	})
}


export default {handleRawSQLQuery}
